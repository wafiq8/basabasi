/* ============================================================
   Basa Basi Trip — PONDASI BERSAMA (navbar + footer + perilaku)
   Satu sumber untuk SEMUA halaman.
   Cara pakai di tiap halaman HTML:
     1. <link rel="stylesheet" href="/style.css"> di <head>
     2. <div id="site-header"></div> tepat setelah <body>
     3. <div id="site-footer"></div> sebelum </body>
     4. <script src="/script.js" defer></script> sebelum </body>
   Navbar, sidebar, tombol WA, dan footer akan disuntik otomatis.
   Bahasa (ID/EN) & menu aktif dideteksi otomatis dari URL.
   ============================================================ */

/* ====== CONFIG — EDIT DI SINI SAJA ====== */
var BBT = {
  // Dua admin / dua nomor WhatsApp (tanpa tanda + atau spasi, awali 62)
  waBajo:    "62895634157789",     // Admin Labuan Bajo
  waBajoText:"+62 895-6341-57789",
  waKarimun: "6285713541147",      // Admin Karimunjawa
  waKarimunText:"+62 857-1354-1147",
  // Tombol WA mengambang (boleh linktree)
  floatLink: "https://linktr.ee/basabasitrip",
  email:     "basabasitrip@gmail.com",
  lokasi:    "Semarang, Indonesia",
  social: {
    instagram: "https://www.instagram.com/basabasitrip",
    tiktok:    "https://www.tiktok.com/@basabasitrip",
    facebook:  "https://www.facebook.com/basabasitrip",
    threads:   "https://www.threads.com/@basabasitrip"
  },
  tahun: 2026
};

(function () {
  var path = location.pathname.replace(/index\.html$/, "");
  if (path.length > 1 && path.slice(-1) !== "/") { /* file .html */ }
  var isEN = path.indexOf("/en/") === 0 || path === "/en";
  var P = isEN ? "/en" : "";           // prefix bahasa
  var L = {
    home:  isEN ? "Home"        : "Home",
    dest:  isEN ? "Destinations": "Destinasi",
    art:   isEN ? "Articles"    : "Artikel",
    menu:  isEN ? "Menu"        : "Menu",
    kontak:isEN ? "Contact"     : "Kontak",
    tooltip:isEN ? "Anything we can help with? 👋" : "Ada yang bisa kami bantu? 👋",
    brand: isEN
      ? "Marine travel agency based in Labuan Bajo, Flores. Open trips to Labuan Bajo & Karimunjawa since 2019."
      : "Agen perjalanan wisata bahari berbasis di Labuan Bajo, Flores. Open trip Labuan Bajo & Karimunjawa sejak 2019.",
    terms: isEN ? "Terms & Conditions" : "Syarat & Ketentuan",
    privacy: isEN ? "Privacy Policy" : "Kebijakan Privasi"
  };

  // Link bersama (selalu absolut dari root -> konsisten di semua kedalaman folder)
  var nav = {
    home: P + "/",
    dest: P + "/#destinasi",
    art:  P + "/artikel.html",
    bajo: P + "/labuan-bajo/",
    kari: P + "/karimunjawa/",
    terms: isEN ? "/en/syarat-ketentuan.html" : "/syarat-ketentuan.html",
    privacy: isEN ? "/en/kebijakan-privasi.html" : "/kebijakan-privasi.html"
  };

  // Tautan tombol bahasa: ambil dari <link rel="alternate" hreflang> di <head>
  function altHref(lang, fallback) {
    var el = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
    return (el && el.getAttribute("href")) || fallback;
  }
  var idHref = altHref("id", "/");
  var enHref = altHref("en", "/en/");

  // Menu aktif (cocokkan path sekarang dgn link menu)
  function norm(u){ try { return new URL(u, location.origin).pathname.replace(/index\.html$/,""); } catch(e){ return u; } }
  var here = norm(location.href);
  function act(href){ return norm(href) === here ? " active" : ""; }

  var waIcon = '<svg viewBox="0 0 32 32"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.7.9 5.2 2.4 7.2L4 28l6-2.3C11.8 27 13.8 27.6 16 27.6 22.6 27.6 28 22.2 28 15.6 28 8.4 22.6 3 16 3zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10c-1.9 0-3.7-.5-5.2-1.5l-.4-.2-3.6 1.4 1.3-3.4-.3-.5C7.5 19 7 17.1 7 15 7 9.5 11.5 5 16 5zm-3.3 5c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.1 2 3.1 4.9 4.2 2.4.9 2.8.7 3.3.7s1.6-.6 1.9-1.3c.2-.6.2-1.1.1-1.3-.1-.1-.3-.2-.6-.3s-1.9-.9-2.2-1-1.5-.2-1.8.4c-.3.6-.5.8-.8 1l-.4.2c-.3 0-1.1-.4-2.2-1.5-1.3-1.3-1.7-2.3-1.9-2.7 0-.2 0-.3.2-.4l.4-.5c.2-.2.3-.4.4-.7s0-.5-.1-.7-.9-2.2-1.2-3c-.3-.7-.7-.7-.9-.7z"/></svg>';
  var waSocialIcon = '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.943-5.359 11.945-11.893a11.821 11.821 0 00-3.418-8.452z"/></svg>';
  var phoneIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.8" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.73 9.77 19.79 19.79 0 01.67 1.14 2 2 0 012.66 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.64a16 16 0 006.29 6.29l1-1c.59-.59 1.4-.83 2.11-.45.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>';
  var mailIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.8" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';
  var pinIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.8" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  var igIcon = '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
  var ttIcon = '<svg width="16" height="18" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.56V6.8a4.85 4.85 0 0 1-1.07-.11z"/></svg>';
  var fbIcon = '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
  var thIcon = '<svg width="18" height="18" viewBox="0 0 192 192"><path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.23c8.249.053 14.474 2.452 18.502 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.372-39.134 15.265-38.105 34.569.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.452-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.741C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.206 17.11 97.015 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.105 0h-.26C68.777.195 47.219 9.65 32.204 28.121 18.874 44.568 11.986 67.862 11.768 96.006l-.002.232.002.232c.218 28.144 7.106 51.438 20.436 67.884 15.015 18.471 36.573 27.926 64.089 28.121h.26c24.472-.168 41.744-6.59 55.822-20.655 18.646-18.616 18.016-42.062 11.861-56.442-4.425-10.316-12.982-18.672-23.701-23.38z"/></svg>';

  /* Menu tambahan khusus halaman (mis. Paket, Spesial Trip) lewat
     atribut: <div id="site-header" data-extra-nav="Paket:#paket|Spesial Trip:#spesial-trip"> */
  var extraMenu = "", extraSidebar = "";
  var hostEl = document.getElementById("site-header");
  var extraRaw = hostEl ? hostEl.getAttribute("data-extra-nav") : null;
  if (extraRaw) {
    extraRaw.split("|").forEach(function (pair) {
      var i = pair.indexOf(":");
      if (i < 0) return;
      var label = pair.slice(0, i).trim();
      var href = pair.slice(i + 1).trim();
      if (!label || !href) return;
      extraMenu += '<li><a href="' + href + '">' + label + '</a></li>';
      extraSidebar += '<li><a href="' + href + '">' + label + '</a></li>';
    });
  }

  /* ---------- HEADER (navbar + sidebar + WA float) ---------- */
  var headerHTML =
    '<a href="' + BBT.floatLink + '" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">' +
      '<span class="wa-tooltip">' + L.tooltip + '</span>' +
      '<div class="wa-btn">' + waIcon + '</div>' +
    '</a>' +
    '<nav class="navbar" id="navbar">' +
      '<div class="logo"><a href="' + nav.home + '"><img src="/images/logo.png" alt="Basa Basi Trip" width="120" height="36"></a></div>' +
      '<div class="nav-right">' +
        '<ul class="menu">' +
          '<li><a href="' + nav.home + '" class="' + act(nav.home).trim() + '">' + L.home + '</a></li>' +
          '<li><a href="' + nav.dest + '">' + L.dest + '</a></li>' +
          extraMenu +
          '<li><a href="' + nav.art + '" class="' + act(nav.art).trim() + '">' + L.art + '</a></li>' +
        '</ul>' +
        '<div class="lang-switch">' +
          '<a href="' + idHref + '" class="lang-btn' + (isEN ? '' : ' active') + '">ID</a>' +
          '<a href="' + enHref + '" class="lang-btn' + (isEN ? ' active' : '') + '">EN</a>' +
        '</div>' +
      '</div>' +
      '<button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '</nav>' +
    '<div class="sidebar-overlay" id="sidebarOverlay"></div>' +
    '<div class="sidebar" id="sidebar">' +
      '<button class="sidebar-close" id="sidebarClose" aria-label="Tutup">✕</button>' +
      '<ul>' +
        '<li><a href="' + nav.home + '">' + L.home + '</a></li>' +
        '<li><a href="' + nav.dest + '">' + L.dest + '</a></li>' +
        extraSidebar +
        '<li><a href="' + nav.art + '">' + L.art + '</a></li>' +
      '</ul>' +
      '<div class="sidebar-lang">' +
        '<a href="' + idHref + '" class="lang-btn' + (isEN ? '' : ' active') + '">ID</a>' +
        '<a href="' + enHref + '" class="lang-btn' + (isEN ? ' active' : '') + '">EN</a>' +
      '</div>' +
    '</div>';

  /* ---------- FOOTER ---------- */
  function waBtn(label, num, text) {
    return '<a class="footer-wa-btn" href="https://wa.me/' + num + '" target="_blank" rel="noopener">' +
      '<span class="ic">' + waIcon + '</span>' +
      '<span class="txt"><span class="lbl">' + label + '</span><span class="num">' + text + '</span></span>' +
    '</a>';
  }
  var kontakBlok =
    waBtn("Admin Labuan Bajo", BBT.waBajo, BBT.waBajoText) +
    waBtn("Admin Karimunjawa", BBT.waKarimun, BBT.waKarimunText) +
    '<div class="footer-contact-item">' + mailIcon + '<a href="mailto:' + BBT.email + '">' + BBT.email + '</a></div>' +
    '<div class="footer-contact-item">' + pinIcon + '<span>' + BBT.lokasi + '</span></div>';

  var footerHTML =
    '<div class="footer-grid">' +
      '<div class="footer-brand">' +
        '<img src="/images/logo.png" alt="Basa Basi Trip" loading="lazy" width="120" height="32">' +
        '<p>' + L.brand + '</p>' +
        '<div class="footer-socials">' +
          '<a href="' + BBT.floatLink + '" target="_blank" rel="noopener" class="footer-social" aria-label="WhatsApp">' + waSocialIcon + '</a>' +
          '<a href="' + BBT.social.instagram + '" target="_blank" rel="noopener" class="footer-social" aria-label="Instagram">' + igIcon + '</a>' +
          '<a href="' + BBT.social.tiktok + '" target="_blank" rel="noopener" class="footer-social" aria-label="TikTok">' + ttIcon + '</a>' +
          '<a href="' + BBT.social.facebook + '" target="_blank" rel="noopener" class="footer-social" aria-label="Facebook">' + fbIcon + '</a>' +
          '<a href="' + BBT.social.threads + '" target="_blank" rel="noopener" class="footer-social" aria-label="Threads">' + thIcon + '</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-col"><h4>' + L.menu + '</h4><ul>' +
        '<li><a href="' + nav.home + '">' + L.home + '</a></li>' +
        '<li><a href="' + nav.dest + '">' + L.dest + '</a></li>' +
        '<li><a href="' + nav.art + '">' + L.art + '</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><h4>' + L.dest + '</h4><ul>' +
        '<li><a href="' + nav.bajo + '">Labuan Bajo</a></li>' +
        '<li><a href="' + nav.kari + '">Karimunjawa</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><h4>' + L.kontak + '</h4>' + kontakBlok + '</div>' +
    '</div>' +
    '<div class="footer-mobile-cols">' +
      '<div class="footer-mobile-col"><h4>' + L.menu + '</h4><ul>' +
        '<li><a href="' + nav.home + '">' + L.home + '</a></li>' +
        '<li><a href="' + nav.dest + '">' + L.dest + '</a></li>' +
        '<li><a href="' + nav.art + '">' + L.art + '</a></li>' +
      '</ul></div>' +
      '<div class="footer-mobile-col"><h4>' + L.dest + '</h4><ul>' +
        '<li><a href="' + nav.bajo + '">Labuan Bajo</a></li>' +
        '<li><a href="' + nav.kari + '">Karimunjawa</a></li>' +
      '</ul></div>' +
    '</div>' +
    '<div class="footer-mobile-kontak"><h4 style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#aaa;margin-bottom:14px;">' + L.kontak + '</h4>' + kontakBlok + '</div>' +
    '<div class="footer-bottom">' +
      '<span>© ' + BBT.tahun + ' Basa Basi Trip · All Rights Reserved</span>' +
      '<span><a href="' + nav.terms + '">' + L.terms + '</a> &nbsp;·&nbsp; <a href="' + nav.privacy + '">' + L.privacy + '</a></span>' +
    '</div>';

  /* ---------- SUNTIK ---------- */
  function inject() {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = headerHTML;
    if (f) f.innerHTML = "<footer>" + footerHTML + "</footer>";
    wire();
  }

  /* ---------- PERILAKU ---------- */
  function wire() {
    var navbar = document.getElementById("navbar");
    if (navbar) {
      window.addEventListener("scroll", function () {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
      });
    }
    var hamburger = document.getElementById("hamburger");
    var sidebar = document.getElementById("sidebar");
    var overlay = document.getElementById("sidebarOverlay");
    var closeBtn = document.getElementById("sidebarClose");
    function open() { sidebar.classList.add("open"); overlay.classList.add("open"); hamburger.classList.add("is-active"); document.body.style.overflow = "hidden"; }
    function close() { sidebar.classList.remove("open"); overlay.classList.remove("open"); hamburger.classList.remove("is-active"); document.body.style.overflow = ""; }
    if (hamburger) hamburger.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (overlay) overlay.addEventListener("click", close);
    document.querySelectorAll(".sidebar a").forEach(function (a) { a.addEventListener("click", close); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
