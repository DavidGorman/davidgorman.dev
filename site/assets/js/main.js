// davidgorman.dev
// Reveals the contact email only on click, so the full address never
// appears in the HTML source for scrapers to harvest.
(function () {
  "use strict";

  var USER = "contact";
  var DOMAIN = "davidgorman.dev";

  document.querySelectorAll("[data-reveal-email]").forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var address = [USER, DOMAIN].join("@");
      var link = document.createElement("a");
      link.className = "email-link";
      link.href = "mailto:" + address;
      link.textContent = address;
      btn.replaceWith(link);
      link.focus();
    });
  });

  // Light / dark toggle. theme.js has already set the starting theme.
  var root = document.documentElement;
  var toggles = document.querySelectorAll("[data-theme-toggle]");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggles.forEach(function (btn) {
      var dark = theme === "dark";
      btn.setAttribute("aria-pressed", String(dark));
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  toggles.forEach(function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });

  // Follow system changes, unless the visitor has picked a theme themselves.
  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem("theme"); } catch (err) {}
      if (!saved) applyTheme(e.matches ? "dark" : "light");
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
  }

  // Keep the footer year current.
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
