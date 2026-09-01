(function () {
  function run() {
    if (typeof katex === "undefined") return;
    document.querySelectorAll(".math").forEach(function (el) {
      try {
        katex.render(el.textContent, el, { throwOnError: false });
      } catch (err) { /* leave source text */ }
    });
    if (typeof renderMathInElement === "function") {
      renderMathInElement(document.body, {
        delimiters: [
          { left: "\\[", right: "\\]", display: true },
          { left: "$$", right: "$$", display: true }
        ],
        throwOnError: false
      });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(run, 0);
    });
  } else {
    setTimeout(run, 0);
  }
  window.addEventListener("load", run);
})();
