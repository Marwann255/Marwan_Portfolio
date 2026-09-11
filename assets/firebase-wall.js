import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyA6dmRrCcRVRNO3a6uSHJra707IGf6_Q6U",
    authDomain: "marwan-portfolio-1be2a.firebaseapp.com",
    projectId: "marwan-portfolio-1be2a",
    storageBucket: "marwan-portfolio-1be2a.firebasestorage.app",
    messagingSenderId: "785435653814",
    appId: "1:785435653814:web:50de6142c242a9220a1817"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wallRef = collection(db, "wall");

document.addEventListener("DOMContentLoaded", function () {
  var wallContainer = document.getElementById("wall-notes-container");
  var form = document.getElementById("wall-note-form");
  var notes = [];

  // reuse app.js's existing helpers (they're globals since app.js is a classic script)
  var escapeHtml = window.escapeHtml;
  var initSpotlightEffect = window.initSpotlightEffect;

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
    if (initSpotlightEffect) initSpotlightEffect();
  }

  function formatDate(timestamp) {
    if (!timestamp) return "Just now";
    var d = timestamp.toDate();
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  // Live sync from Firestore
  var q = query(wallRef, orderBy("createdAt", "desc"), limit(50));
  onSnapshot(q, function (snapshot) {
    notes = snapshot.docs.map(function (doc) {
      var data = doc.data();
      return {
        name: data.name,
        role: data.role,
        emoji: data.emoji,
        text: data.message,
        date: formatDate(data.createdAt)
      };
    });
    renderNotes();
  });

  // Submit a new pin
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      var honeypot = document.getElementById("wall-honeypot");
      if (honeypot && honeypot.value) return; // bot filled hidden field

      var name = document.getElementById("wall-name").value.trim();
      var role = document.getElementById("wall-role").value.trim();
      var emoji = document.getElementById("wall-emoji").value;
      var message = document.getElementById("wall-message").value.trim();

      if (!name || !message) return;

      var submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Pinning...";

      try {
        await addDoc(wallRef, {
          name: name.slice(0, 50),
          role: role.slice(0, 60),
          emoji: emoji,
          message: message.slice(0, 300),
          createdAt: serverTimestamp()
        });
        form.reset();
        if (window.showToast) window.showToast('🎉 Note pinned to the wall successfully!');
      } catch (err) {
        console.error("Error pinning message:", err);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Pin to The Wall";
      }
    });
  }
});