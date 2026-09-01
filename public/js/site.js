(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.querySelector('#primary-nav');
  if (
    header instanceof HTMLElement &&
    toggle instanceof HTMLButtonElement &&
    panel instanceof HTMLElement
  ) {
    const focusable = function () {
      return Array.prototype.slice
        .call(panel.querySelectorAll('a, button'))
        .filter(function (el) {
          return !el.hasAttribute('disabled') && el.tabIndex !== -1;
        });
    };

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      header.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-locked', open);
      if (open) {
        const first = focusable()[0];
        if (first) first.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const sectionLinks = Array.prototype.slice.call(
      document.querySelectorAll('[data-section]'),
    );
    const observed = sectionLinks
      .map(function (link) {
        return document.getElementById(link.getAttribute('data-section') || '');
      })
      .filter(Boolean);

    if (observed.length) {
      const io = new IntersectionObserver(
        function (entries) {
          const visible = entries
            .filter(function (e) {
              return e.isIntersecting;
            })
            .sort(function (a, b) {
              return b.intersectionRatio - a.intersectionRatio;
            })[0];
          if (!visible || !visible.target.id) return;
          sectionLinks.forEach(function (link) {
            if (link.getAttribute('data-section') === visible.target.id) {
              link.setAttribute('aria-current', 'true');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5, 1] },
      );
      observed.forEach(function (el) {
        io.observe(el);
      });
    }
  }

  document.querySelectorAll('.wall-cell img').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.parentElement) img.parentElement.classList.add('is-missing');
    });
  });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiles = Array.prototype.slice.call(document.querySelectorAll('[data-tile]'));
  const live = document.querySelector('.wall-cell.is-live');
  const typed = Array.prototype.slice.call(document.querySelectorAll('[data-type]'));
  const gt = document.querySelector('[data-gt]');

  function typeText(el, text) {
    return new Promise(function (resolve) {
      el.textContent = '';
      let i = 0;
      const tick = function () {
        el.textContent = text.slice(0, i);
        i += 1;
        if (i > text.length) resolve();
        else window.setTimeout(tick, 38);
      };
      tick();
    });
  }

  if (!reduce && live && gt) {
    tiles.forEach(function (tile) {
      tile.classList.add('is-pending');
    });
    live.classList.add('is-dim');
    gt.hidden = true;
    typed.forEach(function (el) {
      el.setAttribute('data-full', el.getAttribute('data-type') || '');
      el.textContent = '';
    });

    tiles.forEach(function (tile, i) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      window.setTimeout(function () {
        tile.classList.remove('is-pending');
      }, (row + col) * 70);
    });

    window.setTimeout(function () {
      live.classList.remove('is-dim');
      typed
        .reduce(function (chain, el) {
          return chain.then(function () {
            return typeText(el, el.getAttribute('data-full') || '');
          });
        }, Promise.resolve())
        .then(function () {
          return new Promise(function (r) {
            window.setTimeout(r, 700);
          });
        })
        .then(function () {
          gt.hidden = false;
          gt.classList.add('is-shown');
        });
    }, 650);
  }

  document.querySelectorAll('.copy-cite').forEach(function (button) {
    button.addEventListener('click', function () {
      const text = button.getAttribute('data-cite') || '';
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(function () {
        const original = button.textContent;
        button.textContent = 'Copied';
        window.setTimeout(function () {
          button.textContent = original;
        }, 2000);
      });
    });
  });
})();
