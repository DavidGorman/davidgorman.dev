// davidgorman.dev
// Runs in <head> before the page paints, so there's no flash of the wrong theme.
// Uses the visitor's saved choice, otherwise their system setting.
(function () {
  "use strict";
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  var theme = (saved === "light" || saved === "dark")
    ? saved
    : (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();
