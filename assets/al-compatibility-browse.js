(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var roots = document.querySelectorAll('[data-al-compat-browse]');
    roots.forEach(function (root) {
      var input = root.querySelector('[data-al-compat-search]');
      var articles = root.querySelectorAll('[data-al-compat-make]');
      var empty = root.querySelector('[data-al-compat-empty]');
      if (!input || !articles.length) return;

      function applyFilter() {
        var q = (input.value || '').trim().toLowerCase();
        var visible = 0;
        articles.forEach(function (art) {
          var hay = (art.getAttribute('data-search-text') || '').toLowerCase();
          var show = !q || hay.indexOf(q) !== -1;
          art.classList.toggle('is-hidden', !show);
          if (show) visible++;
        });
        if (empty) {
          empty.classList.toggle('is-visible', visible === 0 && q.length > 0);
        }
      }

      var t;
      input.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(applyFilter, 120);
      });
      input.addEventListener('search', applyFilter);
    });
  });
})();
