// Marwan Gamal Portfolio JavaScript Interactivity

document.addEventListener('DOMContentLoaded', function() {
  initClockAndGreeting();
  initUserTimezoneAndClocks();
  initEarthGlobe();
  initSpotlightEffect();
  initNavScroll();
  initProjectFilters();
  initVisitorWall();
  initContactForm();
  initMobileMenu();
  initPageByPageScroll();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// 1. Live Dynamic Greeting (Based on User's local hour)
function initClockAndGreeting() {
  var greetingEl = document.getElementById('live-greeting');
  var mobileGreetingEl = document.getElementById('mobile-live-greeting');

  function updateGreeting() {
    var now = new Date();
    var hour = now.getHours();

    var greeting = 'Good Evening';
    var icon = '🌙';

    if (hour >= 5 && hour < 12) {
      greeting = 'Good Morning';
      icon = '☀️';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good Afternoon';
      icon = '🌤️';
    } else if (hour >= 17 && hour < 22) {
      greeting = 'Good Evening';
      icon = '🌆';
    } else {
      greeting = 'Good Night';
      icon = '✨';
    }

    if (greetingEl) {
      greetingEl.innerHTML = '<span class="text-base">' + icon + '</span><span class="text-xs font-medium text-slate-200">' + greeting + '</span>';
    }
    if (mobileGreetingEl) {
      mobileGreetingEl.innerHTML = '<span class="text-base">' + icon + '</span><span class="text-xs font-medium text-slate-200">' + greeting + '</span>';
    }
  }

  updateGreeting();
  setInterval(updateGreeting, 10000);
}

// Smooth scroll for all nav links (desktop + mobile), offset for floating nav
const NAV_OFFSET = 100; // match scroll-margin-top above

function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;

  const targetY = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

  window.scrollTo({
    top: targetY,
    behavior: 'smooth'
  });
}

document.querySelectorAll('a.nav-link, a.mobile-nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);

      // close mobile drawer if open
      const drawer = document.getElementById('mobile-drawer');
      if (drawer && !drawer.classList.contains('hidden')) {
        drawer.classList.add('hidden');
      }
    }
  });
});

// 2. User Timezone Detection & Dual Live Clocks (User Local + Egypt)
function initUserTimezoneAndClocks() {
  var userClockEl = document.getElementById('user-local-clock');
  var userTzNameEl = document.getElementById('user-tz-name');
  var userTzOffsetEl = document.getElementById('user-tz-offset');
  var egyptClockEl = document.getElementById('egypt-local-clock');
  var tzDiffEl = document.getElementById('tz-difference-badge');

  // Detect user's timezone
  var userTz = 'UTC';
  try {
    userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch (e) {
    userTz = 'Local';
  }

  // Format nice timezone name
  var displayTzName = userTz.replace(/_/g, ' ');
  if (displayTzName.indexOf('/') !== -1) {
    var parts = displayTzName.split('/');
    displayTzName = parts[parts.length - 1]; // e.g. "Cairo", "New York", "London"
  }
  if (userTzNameEl) {
    userTzNameEl.textContent = displayTzName;
  }

  function updateClocks() {
    var now = new Date();

    // 1. User Local Time
    var userTimeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    if (userClockEl) {
      userClockEl.textContent = userTimeStr;
    }

    // 2. User Timezone Offset (e.g. UTC+2, UTC-5)
    var offsetMinutes = -now.getTimezoneOffset();
    var offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    var offsetRemMin = Math.abs(offsetMinutes) % 60;
    var sign = offsetMinutes >= 0 ? '+' : '-';
    var formattedOffset = 'UTC' + sign + offsetHours + (offsetRemMin > 0 ? ':' + (offsetRemMin < 10 ? '0' : '') + offsetRemMin : '');
    if (userTzOffsetEl) {
      userTzOffsetEl.textContent = formattedOffset + ' · Your Location';
    }

    // 3. Egypt (Africa/Cairo) Time
    var egyptTimeStr = now.toLocaleTimeString('en-US', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    if (egyptClockEl) {
      egyptClockEl.textContent = egyptTimeStr;
    }

    // 4. Time difference between User & Egypt
    if (tzDiffEl) {
      try {
        var egyptNow = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
        var userNow = new Date(now.toLocaleString('en-US'));
        var diffHours = Math.round((egyptNow.getTime() - userNow.getTime()) / (1000 * 60 * 60));

        if (diffHours === 0) {
          tzDiffEl.textContent = '✨ Same timezone';
        } else if (diffHours > 0) {
          tzDiffEl.textContent = '🇪🇬 Egypt is ' + diffHours + 'h ahead of you';
        } else {
          tzDiffEl.textContent = '🇪🇬 Egypt is ' + Math.abs(diffHours) + 'h behind you';
        }
      } catch (err) {
        tzDiffEl.textContent = 'Available for remote work';
      }
    }
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

// 3. Animated Moving 3D Earth Globe Object (Canvas 3D Engine)
function initEarthGlobe() {
  var canvas = document.getElementById('earth-globe-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var width = 0;
  var height = 0;
  var dpr = window.devicePixelRatio || 1;

  function resize() {
    var rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  // Globe Parameters
  var radius = Math.min(width, height) * 0.42;
  if (radius < 50) radius = 65;

  var rotationY = 0.8;
  var tiltX = 0.38; // Axial tilt ~22 deg
  var autoSpeed = 0.007;
  var isDragging = false;
  var lastMouseX = 0;
  var lastMouseY = 0;
  var beaconPulse = 0;

  // Generate World Landmass & Graticule Point Cloud
  var points = [];

  // 1. Graticule / Latitude & Longitude Wireframe Rings
  for (var lat = -75; lat <= 75; lat += 25) {
    var phi = (lat * Math.PI) / 180;
    var step = lat === 0 ? 8 : 12;
    for (var lon = -180; lon < 180; lon += step) {
      var theta = (lon * Math.PI) / 180;
      points.push({
        lat: phi,
        lon: theta,
        type: 'grid'
      });
    }
  }

  // 2. Continents & Landmass Clusters (Africa, Europe, Americas, Asia, Middle East)
  var landmasses = [
    // Africa & Middle East
    { minLat: -35, maxLat: 37, minLon: -17, maxLon: 51, density: 4 },
    // Europe
    { minLat: 36, maxLat: 70, minLon: -10, maxLon: 45, density: 5 },
    // Asia
    { minLat: 5, maxLat: 75, minLon: 45, maxLon: 145, density: 4 },
    // North America
    { minLat: 15, maxLat: 72, minLon: -168, maxLon: -55, density: 4 },
    // South America
    { minLat: -55, maxLat: 12, minLon: -82, maxLon: -34, density: 4 },
    // Australia
    { minLat: -42, maxLat: -11, minLon: 112, maxLon: 154, density: 5 }
  ];

  landmasses.forEach(function(region) {
    for (var lat = region.minLat; lat <= region.maxLat; lat += region.density) {
      for (var lon = region.minLon; lon <= region.maxLon; lon += region.density * 1.5) {
        // Random organic jitter
        var jLat = lat + (Math.random() - 0.5) * region.density * 0.7;
        var jLon = lon + (Math.random() - 0.5) * region.density * 1.2;
        points.push({
          lat: (jLat * Math.PI) / 180,
          lon: (jLon * Math.PI) / 180,
          type: 'land'
        });
      }
    }
  });

  // Egypt Coordinates (Giza: 30°N, 31.2°E)
  var egyptLat = (30.0 * Math.PI) / 180;
  var egyptLon = (31.2 * Math.PI) / 180;

  // Interactive Dragging
  canvas.addEventListener('pointerdown', function(e) {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });

  window.addEventListener('pointermove', function(e) {
    if (!isDragging) return;
    var dx = e.clientX - lastMouseX;
    var dy = e.clientY - lastMouseY;
    rotationY += dx * 0.008;
    tiltX = Math.max(-0.8, Math.min(0.8, tiltX + dy * 0.006));
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('pointerup', function() {
    isDragging = false;
  });

  // Render Loop
  function render() {
    if (!isDragging) {
      rotationY += autoSpeed;
    }
    beaconPulse += 0.04;

    ctx.clearRect(0, 0, width, height);

    var cx = width / 2;
    var cy = height / 2 + 5;
    radius = Math.min(width, height) * 0.42;
    if (radius < 50) radius = 65;

    // 1. Outer Atmosphere Glow
    var glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.35);
    glowGrad.addColorStop(0, 'rgba(244, 63, 94, 0.12)');
    glowGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
    ctx.fill();

    // 2. Earth Sphere Base Silhouette
    var sphereGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
    sphereGrad.addColorStop(0, 'rgba(26, 31, 48, 0.95)');
    sphereGrad.addColorStop(0.7, 'rgba(14, 17, 27, 0.95)');
    sphereGrad.addColorStop(1, 'rgba(7, 8, 12, 0.98)');

    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // 3. Globe Rim Border Ring
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 4. Project and Sort 3D Points
    var projected = [];

    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      var lonRot = p.lon + rotationY;

      // 3D Cartesian coords on unit sphere
      var x = Math.cos(p.lat) * Math.sin(lonRot);
      var y = -Math.sin(p.lat);
      var z = Math.cos(p.lat) * Math.cos(lonRot);

      // Apply Pitch / Axial Tilt X
      var yTilt = y * Math.cos(tiltX) - z * Math.sin(tiltX);
      var zTilt = y * Math.sin(tiltX) + z * Math.cos(tiltX);
      var xTilt = x;

      projected.push({
        px: cx + xTilt * radius,
        py: cy + yTilt * radius,
        z: zTilt,
        type: p.type
      });
    }

    // Sort by Z depth (back to front)
    projected.sort(function(a, b) {
      return a.z - b.z;
    });

    // Render Points
    for (var j = 0; j < projected.length; j++) {
      var pt = projected[j];
      var zNorm = (pt.z + 1) / 2; // 0 (back) to 1 (front)

      if (pt.z <= -0.15) {
        // Back of earth: very subtle faint depth
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(pt.px, pt.py, 0.8, 0.8);
      } else {
        // Front of earth
        var size = (pt.type === 'land' ? 1.5 : 1.0) * (0.8 + zNorm * 0.7);
        var alpha = (0.2 + zNorm * 0.75);

        if (pt.type === 'land') {
          ctx.fillStyle = 'rgba(251, 113, 133, ' + alpha + ')'; // Rose glow for continents
        } else {
          ctx.fillStyle = 'rgba(168, 85, 247, ' + (alpha * 0.5) + ')'; // Purple for grid
        }

        ctx.beginPath();
        ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 5. Egypt Location Beacon (Giza 🇪🇬)
    var egLonRot = egyptLon + rotationY;
    var egX = Math.cos(egyptLat) * Math.sin(egLonRot);
    var egY = -Math.sin(egyptLat);
    var egZ = Math.cos(egyptLat) * Math.cos(egLonRot);

    var egYTilt = egY * Math.cos(tiltX) - egZ * Math.sin(tiltX);
    var egZTilt = egY * Math.sin(tiltX) + egZ * Math.cos(tiltX);
    var egXTilt = egX;

    if (egZTilt > 0) { // Only when facing front
      var egPx = cx + egXTilt * radius;
      var egPy = cy + egYTilt * radius;

      // Pulsing Radar Rings
      var ringRadius1 = 4 + (Math.sin(beaconPulse) * 0.5 + 0.5) * 12;
      var ringRadius2 = 4 + (Math.sin(beaconPulse + Math.PI / 2) * 0.5 + 0.5) * 16;

      ctx.strokeStyle = 'rgba(16, 185, 129, ' + (0.7 - ringRadius1 / 20) + ')';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(egPx, egPy, ringRadius1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(244, 63, 94, ' + (0.6 - ringRadius2 / 24) + ')';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(egPx, egPy, ringRadius2, 0, Math.PI * 2);
      ctx.stroke();

      // Solid Glowing Center Dot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(egPx, egPy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Location Pin Label Tag
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.lineWidth = 1;
      var tagWidth = 60;
      var tagHeight = 18;
      var tagX = egPx + 8;
      var tagY = egPy - 18;

      if (tagX + tagWidth > width - 5) tagX = egPx - tagWidth - 8;

      ctx.beginPath();
      ctx.roundRect(tagX, tagY, tagWidth, tagHeight, 5);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.fillText('📍 Giza 🇪🇬', tagX + 6, tagY + 12);
    }

    requestAnimationFrame(render);
  }

  render();
}

// 4. Mouse Spotlight Card Follower
function initSpotlightEffect() {
  var cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
}

// 5. Navigation Active State & Smooth Scroll
function initNavScroll() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    var current = '';
    var scrollY = window.pageYOffset;

    sections.forEach(function(section) {
      var sectionHeight = section.offsetHeight;
      var sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('active', 'text-white', 'bg-white/10');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === '#' + current || (current === '' && link.getAttribute('href') === '#home')) {
        link.classList.add('active', 'text-white', 'bg-white/10');
        link.classList.remove('text-slate-400');
      }
    });
  });
}

// 6. Project Category Filtering & Modal
var projectData = {
  evently: {
    title: 'Evently — Event Discovery & Gathering Platform',
    category: 'Full-Stack Mobile App',
    timeline: 'Q3 2026',
    description: 'A comprehensive, multi-theme event planning, booking, and social gathering mobile application engineered with Flutter, Dart, and Firebase backend. Provides end-to-end event discovery, real-time RSVP updates, interactive Google Maps venue integration, category filters, and bilingual localization (English & Arabic).',
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Provider', 'Google Maps API', 'Localization (EN/AR)'],
    github: 'https://github.com/Marwann255/evently-c19',
    features: [
      'Bilingual Support (Arabic & English) with dynamic RTL/LTR layout transitions.',
      'Custom Dark & Light Theme system with high-contrast event cards.',
      'Category-based event discovery: Book Clubs, Exhibitions, Birthdays, Meetings, and Sports.',
      'Real-time Firestore synchronization for instant event creation and attendee updates.',
      'Integrated map location picker with radius calculations.'
    ],
    images:["assets/images/evently/Screenshot_20260901_230325.png","assets/images/evently/Screenshot_20260901_230343.png","assets/images/evently/Screenshot_20260901_230349.png","assets/images/evently/Screenshot_20260901_230419.png","assets/images/evently/Screenshot_20260901_230426.png","assets/images/evently/Screenshot_20260901_230453.png"]
  },
  space: {
    title: 'Space App — Solar System Planetary Explorer',
    category: 'Astrophysics Mobile Application',
    timeline: 'Q2 2026',
    description: 'An interactive astronomical mobile application built around the NASA Space Apps Challenge domain. Features a physics-calibrated swipeable 3D planet carousel, synchronized orbital telemetry (gravity, mass, distance from sun, orbital period), named-route transitions, and customized native Android/iOS splash branding.',
    stack: ['Flutter', 'Dart', 'Custom Animations', 'NASA Space Data', 'Named Routing', 'Vector UI'],
    github: 'https://github.com/Marwann255/Space-App',
    features: [
      'Interactive swipeable planetary carousel with synchronized data telemetry.',
      'Live metrics for each of the 9 celestial bodies (gravity, distance, density, orbital velocity).',
      'Smooth named-route transitions to rich cinematic exploration views.',
      'Full native branding with customized splash screens and app icons for iOS & Android.'
    ],
    images: ["assets/images/space_app/Screenshot_20260705_005739.png","assets/images/space_app/Screenshot_20260705_005759.png","assets/images/space_app/Screenshot_20260705_005828.png","assets/images/space_app/Screenshot_20260705_005848.png","assets/images/space_app/Screenshot_20260705_005924.png"]
  },
  news: {
    title: 'News C19 — High-Performance News Aggregator',
    category: 'Media & News Application',
    timeline: 'Q1 2026',
    description: 'A production-grade mobile news reader consuming live RESTful news feeds. Built with Clean Architecture, custom caching layers, dynamic category switching, instant search, and adaptive layouts.',
    stack: ['Flutter', 'Dart', 'RESTful APIs', 'Dio / Http', 'Clean Architecture', 'State Management'],
    github: 'https://github.com/Marwann255/news_c19',
    features: [
      'Real-time news feeds across Business, Tech, Science, Sports, Health, and Entertainment.',
      'Instant keyword search with debounced network calls.',
      'Article bookmarking and offline reading capabilities.',
      'Clean Architecture with separation of domain, data, and presentation layers.'
    ],
    images: ["assets/images/news/Screenshot_20260909_005835.png","assets/images/news/Screenshot_20260909_010039.png","assets/images/news/Screenshot_20260909_010100.png","assets/images/news/Screenshot_20260909_010158.png"]
  },
  jacked: {
    title: 'Jacked — Workout Routine & Fitness Tracker',
    category: 'Fitness & Health Application',
    timeline: 'Q4 2025',
    description: 'A dedicated bodybuilding and fitness tracking application designed for workout routine creation, muscle group targeted logs, set & rep tracking, and historical performance charts.',
    stack: ['Flutter', 'Dart', 'Hive Local DB', 'Custom Charts', 'Responsive UI'],
    github: 'https://github.com/Marwann255',
    features: [
      'Custom workout split and routine builder for strength and bodybuilding.',
      'Per-set weight & rep logging with automated rest timers.',
      'Historical volume tracking and 1RM progression charts.',
      'Completely offline-first with fast local database queries.'
    ]
  }
};

function initProjectFilters() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) {
        b.classList.remove('active', 'bg-rose-500/20', 'border-rose-500/40', 'text-white');
        b.classList.add('text-slate-400', 'border-white/10');
      });
      btn.classList.add('active', 'bg-rose-500/20', 'border-rose-500/40', 'text-white');
      btn.classList.remove('text-slate-400', 'border-white/10');

      var filter = btn.getAttribute('data-filter');

      projectCards.forEach(function(card) {
        var category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.indexOf(filter) !== -1) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

window._projectGallery = { images: [], index: 0 };

window.openProjectModal = function(key) {
  var p = projectData[key];
  if (!p) return;

  var modal = document.getElementById('project-modal');
  var modalContent = document.getElementById('project-modal-content');

  var images = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : []);
  window._projectGallery = { images: images, index: 0 };

  var featuresHtml = '';
  p.features.forEach(function(f) {
    featuresHtml += '<li class="flex items-start gap-2.5 text-sm text-slate-300"><span class="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span><span>' + f + '</span></li>';
  });

  var stackHtml = '';
  p.stack.forEach(function(s) {
    stackHtml += '<span class="px-3 py-1 text-xs font-medium rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">' + s + '</span>';
  });

  // Build phone-frame gallery
    // Build gallery: mobile-sized frames, 3 visible at a time, sliding horizontally
    var galleryHtml = '';
  if (images.length) {
    var slidesHtml = '';
    images.forEach(function(src) {
      slidesHtml += 
        '<div class="shrink-0 snap-start" style="width: calc((100% - 2 * 1rem) / 3);">' +
          '<div class="w-full aspect-[9/19.5] rounded-xl overflow-hidden border border-white/10 bg-black/20">' +
            '<img src="' + src + '" class="w-full h-full object-cover" />' +
          '</div>' +
        '</div>';
    });

    var dotsHtml = '';
    images.forEach(function(_, i) {
      dotsHtml += '<button onclick="goToProjectImage(' + i + ')" data-dot-index="' + i + '" class="w-1.5 h-1.5 rounded-full transition-all ' + (i === 0 ? 'bg-rose-400 w-4' : 'bg-white/30 hover:bg-white/50') + '"></button>';
    });

    galleryHtml =
  '<div class="mb-6">' +
    '<div id="project-gallery-track" class="flex gap-4 overflow-x-auto no-scrollbar">' +
      slidesHtml +
    '</div>' +
    (images.length > 3 ?
      '<div class="flex items-center justify-center gap-1.5 mt-4">' + dotsHtml + '</div>'
      : '') +
  '</div>';
  }

  modalContent.innerHTML = 
    '<div class="flex items-start justify-between gap-4 mb-4 border-b border-white/10 pb-4">' +
      '<div>' +
        '<span class="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">' + p.category + ' · ' + p.timeline + '</span>' +
        '<h3 class="text-2xl font-bold text-white mt-1">' + p.title + '</h3>' +
      '</div>' +
      '<button onclick="closeProjectModal()" class="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer">' +
        '<i data-lucide="x" class="w-5 h-5"></i>' +
      '</button>' +
    '</div>' +
    '<p class="text-slate-300 text-sm md:text-base leading-relaxed mb-6">' + p.description + '</p>' +
    galleryHtml +
    '<div class="mb-6">' +
      '<h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">' +
        '<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i> Key Architectural Highlights' +
      '</h4>' +
      '<ul class="space-y-2.5">' + featuresHtml + '</ul>' +
    '</div>' +
    '<div class="mb-6">' +
      '<h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-3">Tech Stack & Tools</h4>' +
      '<div class="flex flex-wrap gap-2">' + stackHtml + '</div>' +
    '</div>' +
    '<div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">' +
      '<button onclick="closeProjectModal()" class="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors cursor-pointer">Close</button>' +
      '<a href="' + p.github + '" target="_blank" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-sm font-semibold shadow-lg shadow-rose-500/25 transition-all">' +
        '<i data-lucide="github" class="w-4 h-4"></i> View Source Repository' +
      '</a>' +
    '</div>';

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (window.lucide) lucide.createIcons();
  // Convert mouse-wheel vertical scroll into horizontal scroll on the gallery track
  var track = document.getElementById('project-gallery-track');
  if (track) {
    track.addEventListener('wheel', function(e) {
      e.preventDefault();
      e.stopPropagation(); // stop it from also triggering page-by-page section scroll
      track.scrollLeft += e.deltaY;
    }, { passive: false });

    track.addEventListener('scroll', function() {
      var firstSlide = track.children[0];
      if (!firstSlide) return;
      var slideWidth = firstSlide.getBoundingClientRect().width + 16;
      var newIndex = Math.round(track.scrollLeft / slideWidth);
      if (newIndex !== window._projectGallery.index) {
        window._projectGallery.index = newIndex;
        updateProjectGalleryDots();
      }
    });
  }
};

window.goToProjectImage = function(index) {
  var gallery = window._projectGallery;
  if (!gallery.images.length) return;
  gallery.index = index;
  scrollToCurrentImage();
  updateProjectGalleryDots();
};

function scrollToCurrentImage() {
  var gallery = window._projectGallery;
  var track = document.getElementById('project-gallery-track');
  if (!track) return;
  var firstSlide = track.children[0];
  if (!firstSlide) return;
  var slideWidth = firstSlide.getBoundingClientRect().width + 16; // +gap-4 (1rem = 16px)
  track.scrollTo({ left: slideWidth * gallery.index, behavior: 'smooth' });
}

function updateProjectGalleryDots() {
  var gallery = window._projectGallery;
  var dots = document.querySelectorAll('[data-dot-index]');
  dots.forEach(function(dot) {
    var i = parseInt(dot.getAttribute('data-dot-index'), 10);
    if (i === gallery.index) {
      dot.classList.add('bg-rose-400', 'w-4');
      dot.classList.remove('bg-white/30');
    } else {
      dot.classList.remove('bg-rose-400', 'w-4');
      dot.classList.add('bg-white/30');
    }
  });
}

window.goToProjectImage = function(index) {
  var gallery = window._projectGallery;
  if (!gallery.images.length) return;
  gallery.index = index;
  updateProjectGalleryUI();
};

window.nextProjectImage = function() {
  var gallery = window._projectGallery;
  if (!gallery.images.length) return;
  gallery.index = (gallery.index + 1) % gallery.images.length;
  updateProjectGalleryUI();
};

window.prevProjectImage = function() {
  var gallery = window._projectGallery;
  if (!gallery.images.length) return;
  gallery.index = (gallery.index - 1 + gallery.images.length) % gallery.images.length;
  updateProjectGalleryUI();
};

function updateProjectGalleryUI() {
  var gallery = window._projectGallery;
  var img = document.getElementById('project-gallery-img');
  if (img) img.src = gallery.images[gallery.index];

  var dots = document.querySelectorAll('[data-dot-index]');
  dots.forEach(function(dot) {
    var i = parseInt(dot.getAttribute('data-dot-index'), 10);
    if (i === gallery.index) {
      dot.classList.add('bg-rose-400', 'w-4');
      dot.classList.remove('bg-white/30');
    } else {
      dot.classList.remove('bg-rose-400', 'w-4');
      dot.classList.add('bg-white/30');
    }
  });
}

window.closeProjectModal = function() {
  var modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// 7. Interactive Visitor Wall
var defaultWallNotes = [
  // {
  //   name: 'Ahmed Nabil',
  //   role: 'Senior Flutter Engineer',
  //   emoji: '🚀',
  //   text: 'Marwan is an exceptionally dedicated Flutter developer! His clean architecture and state management in Evently were top notch.',
  //   date: 'Aug 2026'
  // },
  {
    name: 'Marwan Gamal',
    role: '',
    emoji: '⭐',
    text: 'Leave something good',
    date: 'Aug 2026'
  },
  // {
  //   name: 'Mohamed Osama',
  //   role: 'Full-Stack Developer',
  //   emoji: '🔥',
  //   text: 'Loved collaborating on mobile modules. Solid Git workflow and reliable team player!',
  //   date: 'Jul 2026'
  // }
];

function initVisitorWall() {
  var wallContainer = document.getElementById('wall-notes-container');
  var form = document.getElementById('wall-note-form');

  var notes = [];
  try {
    var saved = localStorage.getItem('marwan_wall_notes');
    if (saved) {
      notes = JSON.parse(saved);
    } else {
      notes = defaultWallNotes;
      localStorage.setItem('marwan_wall_notes', JSON.stringify(notes));
    }
  } catch (e) {
    notes = defaultWallNotes;
  }

  function renderNotes() {
    if (!wallContainer) return;
    var html = '';
    notes.forEach(function(n) {
      html += 
        '<div class="spotlight-card p-5 rounded-2xl flex flex-col justify-between hover:border-rose-500/30 transition-all">' +
          '<div class="flex items-start justify-between gap-3 mb-3">' +
            '<div class="flex items-center gap-2.5">' +
              '<div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">' +
                (n.emoji || '💬') +
              '</div>' +
              '<div>' +
                '<h5 class="text-sm font-bold text-white">' + escapeHtml(n.name) + '</h5>' +
                '<p class="text-[11px] text-slate-400">' + escapeHtml(n.role || 'Visitor') + '</p>' +
              '</div>' +
            '</div>' +
            '<span class="text-[10px] font-mono text-slate-500">' + (n.date || 'Recent') + '</span>' +
          '</div>' +
          '<p class="text-sm text-slate-300 leading-relaxed italic">“' + escapeHtml(n.text) + '”</p>' +
        '</div>';
    });
    wallContainer.innerHTML = html;
    initSpotlightEffect();
  }

  renderNotes();

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('wall-name').value.trim();
      var role = document.getElementById('wall-role').value.trim();
      var text = document.getElementById('wall-message').value.trim();
      var emoji = document.getElementById('wall-emoji').value || '💬';

      if (!name || !text) return;

      var newNote = {
        name: name,
        role: role || 'Tech Visitor',
        text: text,
        emoji: emoji,
        date: 'Just now'
      };

      notes.unshift(newNote);
      try {
        localStorage.setItem('marwan_wall_notes', JSON.stringify(notes));
      } catch (err) {}

      renderNotes();
      form.reset();
      showToast('🎉 Note pinned to the wall successfully!');
    });
  }
}

// 8. Contact Form & Clipboard helpers
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('contact-name').value.trim();
      var email = document.getElementById('contact-email').value.trim();
      var subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry';
      var message = document.getElementById('contact-message').value.trim();

      var mailtoUrl = 'mailto:marwangamal931@gmail.com?subject=' + encodeURIComponent(subject + ' - ' + name) + '&body=' + encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message);
      window.location.href = mailtoUrl;

      showToast('📬 Email client opened! Looking forward to connecting with you.');
      form.reset();
    });
  }
}

window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(function() {
    showToast('📋 Copied ' + label + ' to clipboard!');
  }).catch(function() {
    showToast('Selected: ' + text);
  });
};

function showToast(msg) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('opacity-0', 'translate-y-5', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(function() {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-5', 'pointer-events-none');
  }, 3500);
}

// 9. Mobile Drawer
function initMobileMenu() {
  var toggleBtn = document.getElementById('mobile-menu-btn');
  var closeBtn = document.getElementById('mobile-menu-close');
  var drawer = document.getElementById('mobile-drawer');
  var links = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', function() {
      drawer.classList.remove('hidden');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', function() {
      drawer.classList.add('hidden');
    });
  }

  links.forEach(function(l) {
    l.addEventListener('click', function() {
      if (drawer) drawer.classList.add('hidden');
    });
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, function(tag) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    };
    return map[tag] || tag;
  });
}

// 10. Page-by-Page Smart Section Scrolling (Wheel & Keyboard Navigation)
function initPageByPageScroll() {
  var sections = Array.from(document.querySelectorAll('section[id]'));
  if (sections.length === 0) return;

  var isAnimating = false;
  var scrollCooldownTimer = null;

  function getCurrentSectionIndex() {
    var scrollY = window.pageYOffset + 140;
    var currentIndex = 0;
    for (var i = 0; i < sections.length; i++) {
      if (scrollY >= sections[i].offsetTop) {
        currentIndex = i;
      }
    }
    return currentIndex;
  }

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isAnimating = true;

    var targetTop = sections[index].offsetTop;
    if (index === 0) targetTop = 0;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });

    clearTimeout(scrollCooldownTimer);
    scrollCooldownTimer = setTimeout(function() {
      isAnimating = false;
    }, 750);
  }

  // Intercept Mouse Wheel for smooth page-by-page stepping
  window.addEventListener('wheel', function(e) {
    // Disable if modal is open
    var modal = document.getElementById('project-modal');
    if (modal && !modal.classList.contains('hidden')) return;

    var delta = e.deltaY;
    if (Math.abs(delta) < 20) return; // ignore subtle trackpad jitter

    var currentIndex = getCurrentSectionIndex();
    var currentSection = sections[currentIndex];
    var rect = currentSection.getBoundingClientRect();
    var vh = window.innerHeight;

    if (isAnimating) {
      e.preventDefault();
      return;
    }

    // Scrolling DOWN
    if (delta > 0) {
      // If bottom of current section is still below viewport, let natural scroll finish section first
      if (rect.bottom > vh + 60) {
        return;
      }
      if (currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentIndex + 1);
      }
    }
    // Scrolling UP
    else {
      // If top of current section is still above viewport, let natural scroll move to top
      if (rect.top < -60) {
        return;
      }
      if (currentIndex > 0) {
        e.preventDefault();
        scrollToSection(currentIndex - 1);
      }
    }
  }, { passive: false });

  // Keyboard navigation support (Arrow keys, Page Up/Down)
  window.addEventListener('keydown', function(e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(document.activeElement.tagName) !== -1) return;
    var modal = document.getElementById('project-modal');
    if (modal && !modal.classList.contains('hidden')) return;

    var currentIndex = getCurrentSectionIndex();
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      if (currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentIndex + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (currentIndex > 0) {
        e.preventDefault();
        scrollToSection(currentIndex - 1);
      }
    }
  });
}
