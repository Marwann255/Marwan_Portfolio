# Marwan Gamal — Portfolio Website 🚀

<div align="center">

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
  <img src="https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white" alt="Dart" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />

  <p align="center">
    <strong>Personal developer portfolio showcasing cross-platform mobile apps, architectural patterns, and production engineering.</strong>
  </p>

  <p align="center">
    <a href="https://github.com/Marwann255">GitHub Profile</a> •
    <a href="https://www.linkedin.com/in/marwan-gamal-43b8792a9/">LinkedIn</a> •
    <a href="mailto:marwangamal931@gmail.com">Contact Me</a>
  </p>

</div>

---

## 🌟 Overview

This repository contains the source code for the personal developer portfolio of **Marwan Gamal**, a Mobile Application Developer and Flutter Engineer based in Giza, Egypt. 

The site is designed with a modern, dark-mode aesthetic inspired by cutting-edge developer platforms. It features smooth kinetic laser animations, an interactive Bento Grid, live timezone calculation with 3D canvas rendering, responsive project modal galleries with phone mockups, and dynamic project filtering.

---

## ✨ Key Features

- **🎨 Modern Dark Aesthetic & Glassmorphism**: Tailored color palette with custom rose/crimson accents, subtle radial laser glow, glassmorphic cards, and mouse-following spotlight gradients.
- **🧭 Floating Capsule Navigation**: Responsive floating navbar with active section indicators, dynamic user greeting (morning, afternoon, evening), quick resume download CTA, and full mobile drawer.
- **🍱 Interactive Bento Grid ("About Me")**:
  - Bio, philosophy, and clean architecture highlights.
  - Interactive education card (Misr University for Science & Technology - MUST).
  - Live statistics matrix (6+ Apps, 100% Cross-Platform UI, 15+ Core Tech Stack Skills).
  - "Available for Work & Freelance" status banner.
- **📱 Featured Projects Showcase with Interactive Modals**:
  - Filter by tags: **All**, **Mobile**, **Full-Stack**, and **Space / AI**.
  - Detailed project modal popups featuring phone-frame image carousel galleries, complete architectural descriptions, core feature lists, and direct GitHub links.
- **📬 Working Contact Form & Direct Actions**:
  - Integrated with **EmailJS** for instant email forwarding without requiring an active backend server.
  - One-click copy for email address with dynamic toast feedback.
  - Quick links to LinkedIn and GitHub.
- **⚡ Performance & Accessibility**: Lightweight vanilla JavaScript, CDN-powered Tailwind CSS and Lucide icons, smooth scrolling with page snapping, and optimized typography using Google Fonts (*Plus Jakarta Sans*, *Syne*, *Playfair Display*, and *JetBrains Mono*).

---

## 📱 Featured Projects Highlighted

| Project | Domain / Type | Tech Stack | Highlights |
| :--- | :--- | :--- | :--- |
| **[Evently](https://github.com/Marwann255/Evently)** | Full-Stack Event Platform | Flutter, Firebase, Provider, SharedPreferences | Bilingual (AR/EN) with RTL/LTR support, Google Maps integration, theme switcher, real-time Firestore sync. |
| **[Islami](https://github.com/Marwann255/islami)** | Quran & Lifestyle Companion | Flutter, SharedPreferences, REST APIs, SVG | Offline surah/hadith reader, audio radio player API, prayer times calculation, Azkar, and digital Sebha. |
| **[News App](https://github.com/Marwann255/news)** | News Aggregator | Flutter, Bloc/Cubit, REST APIs, Dio, Hive DB | Clean Architecture (Domain/Data/Presentation), debounced live search, category feeds, offline bookmarks. |
| **[Jacked](https://github.com/Marwann255/jacked)** | Fitness & Workout Tracker | Flutter, Hive DB, Custom Charts | Routine split builder, set & rep logger, rest timers, 1RM progression charts, offline-first storage. |
| **[Space App](https://github.com/Marwann255/Space-App)** | Astrophysics & Planetary Guide | Flutter, Custom Animations, NASA Telemetry | Swipeable 3D planet carousel, live physics metrics (gravity, orbital period, mass), cinematic route transitions. |
| **Movies App** | Entertainment & Media | Flutter, TMDB API, Local Storage | Movie browsing by trending/genre, trailer viewer, favorite list persistence, responsive UI layout. |

---

## 🛠️ Tech Stack & Tools

### **Frontend & UI**
- **Semantic HTML5** & **Modern CSS3** (Custom glassmorphism, keyframe beam animations, custom scrollbars)
- **Tailwind CSS (CDN)** (Custom utility extensions, colors, and responsive typography)
- **Vanilla JavaScript (ES6+)** (DOM manipulation, canvas rendering, modal carousel state machine)
- **Lucide Icons** & **SVG Vector Graphics**

### **Libraries & Integrations**
- **[EmailJS](https://www.emailjs.com/)** (`@emailjs/browser` v4) for serverless client-side email delivery
- **HTML5 Canvas 2D Context** for the 3D rotating wireframe earth globe and pulsing coordinate beacon

### **Developer Profile Skills**
- **Mobile Development**: Flutter, Dart, Android SDK, Responsive Material & Cupertino UI
- **State Management & Patterns**: BLoC / Cubit, Provider, Riverpod, Clean Architecture, MVVM, Repository Pattern
- **Backend & Cloud**: Firebase Authentication, Cloud Firestore, Cloud Storage, RESTful APIs, Python FastAPI
- **Local Storage**: Hive Local DB, SharedPreferences, SQLite

---

## 📂 Project Structure

```text
marwan-portfolio/
├── assets/
│   ├── images/
│   │   ├── evently/              # Screenshots & project covers for Evently
│   │   ├── islami/               # Screenshots & covers for Islami app
│   │   ├── jacked/               # Covers & assets for Jacked workout tracker
│   │   ├── movies/               # Screenshots & covers for Movies app
│   │   ├── news/                 # Screenshots & covers for News app
│   │   └── space_app/            # Screenshots & covers for Space App
│   ├── app.js                    # Core interactivity, modal logic, carousel, clock & canvas globe
│   ├── firebase-wall.js          # Interactive visitor wall integration
│   ├── style.css                 # Custom CSS animations, tokens, scrollbar & layout styling
│   ├── Marwan1.jpeg              # Profile photo
│   ├── Marwan_Gamal_Resume.pdf   # Downloadable curriculum vitae (CV)
│   └── logo_mg_transparent.png   # Transparent monogram logo
├── index.html                    # Main single-page application structure & semantic layout
├── Marwan_no_background.png      # Hero & Bento section portrait image
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started Locally

No complex build steps or Node.js toolchains are strictly required—the portfolio runs cleanly as a static site.

### Prerequisites
- A modern web browser (Google Chrome, Firefox, Safari, Microsoft Edge)
- Optional: A lightweight HTTP server or VS Code extension like *Live Server*

### Step 1: Clone the repository
```bash
git clone https://github.com/Marwann255/my_porfolio.git
cd my_porfolio
```

### Step 2: Serve the website
You can open `index.html` directly in your browser or run a simple local web server:

**Using Python 3:**
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

**Using Node (`npx serve`):**
```bash
npx serve .
```

**Using VS Code:**
- Install the **Live Server** extension.
- Right click on `index.html` and choose **"Open with Live Server"**.

---

## ⚙️ Configuration & Customization

### 1. Contact Form (EmailJS)
To connect your own email service via EmailJS:
1. Register an account at [emailjs.com](https://www.emailjs.com/).
2. Create a service and email template.
3. Open `assets/app.js` and locate the `initContactForm()` function.
4. Replace the `service_id`, `template_id`, and `public_key` with your credentials:
   ```javascript
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_PUBLIC_KEY")
   ```

### 2. Adding / Updating Projects
- Project metadata and image carousel listings are declared in `assets/app.js` under `projectData`:
  ```javascript
  var projectData = {
    my_project: {
      title: 'Project Title',
      category: 'Category Name',
      timeline: '2026',
      description: '...',
      stack: ['Flutter', 'Dart', '...'],
      github: 'https://github.com/...',
      features: ['Feature 1', 'Feature 2'],
      images: ['assets/images/...']
    }
  };
  ```
- Corresponding card markup is rendered in `index.html` inside the `#projects` grid.

### 3. Adding / Updating Certificates
- Certificate metadata, credential IDs, and skills are declared in `assets/app.js` under `certificateData`:
  ```javascript
  var certificateData = {
    my_certificate: {
      title: 'Certificate or Diploma Title',
      issuer: 'Issuing Organization / Academy',
      category: 'Mobile & Flutter', // or 'Backend & Cloud', 'Computer Science'
      issueDate: 'Month Year',
      credentialId: 'CERT-ID-12345',
      verifyUrl: 'https://...', // optional online verification URL
      image: 'assets/images/certificates/my_cert.png', // optional scan or leave '' for digital plaque
      description: 'Overview of the qualification and achievements...',
      skills: ['Flutter', 'Dart', '...'],
      status: 'Verified Credential'
    }
  };
  ```
- Corresponding card markup is placed inside `<section id="certificates">` in `index.html`.

---

## 👤 Author

**Marwan Gamal**
- **Role:** Mobile Application Developer & Flutter Engineer
- **Location:** Giza, Egypt 🇪🇬
- **GitHub:** [@Marwann255](https://github.com/Marwann255)
- **LinkedIn:** [Marwan Gamal](https://www.linkedin.com/in/marwan-gamal-43b8792a9/)
- **Email:** [marwangamal931@gmail.com](mailto:marwangamal931@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE). Feel free to explore, learn from the structure, or customize it for your own portfolio.
