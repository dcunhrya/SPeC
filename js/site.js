(function () {
  const page = document.body.getAttribute("data-page") || "";

  const NAV = [
    { href: "index.html", id: "overview", label: "Overview" },
    { href: "tracks.html", id: "tracks", label: "Tracks" },
    { href: "scoring.html", id: "scoring", label: "Scoring" },
    { href: "rules.html", id: "rules", label: "Rules" },
    { href: "timeline.html", id: "timeline", label: "Timeline" },
    { href: "register.html", id: "register", label: "Register", cta: true },
    { href: "faq.html", id: "faq", label: "FAQ" },
    { href: "sponsors.html", id: "sponsors", label: "Sponsors" }
  ];

  function tbd(value) {
    if (!value || value === "TBD") return '<span class="tbd">TBD</span>';
    return value;
  }

  function injectChrome() {
    const headerHost = document.getElementById("site-header");
    const footerHost = document.getElementById("site-footer");
    if (headerHost) {
      headerHost.innerHTML = `
        <header class="site-header">
          <nav class="nav container" aria-label="Primary">
            <a class="logo" href="index.html">
              <span class="logo-mark">SPeC</span>
              <span class="logo-sub">Stanford</span>
            </a>
            <button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
              ${NAV.map((item) => {
                const current = item.id === page ? ' aria-current="page"' : "";
                const cls = item.cta ? ' class="nav-cta"' : "";
                return `<li><a href="${item.href}"${cls}${current}>${item.label}</a></li>`;
              }).join("")}
            </ul>
          </nav>
        </header>`;
    }
    if (footerHost) {
      const year = (window.SPEC && window.SPEC.year) || new Date().getFullYear();
      footerHost.innerHTML = `
        <footer class="site-footer">
          <div class="container footer-inner">
            <p>&copy; ${year} ${window.SPEC ? window.SPEC.fullName : "SPeC"} · Stanford MARVL</p>
            <nav class="footer-nav" aria-label="Footer">
              <a href="rules.html">Rules</a>
              <a href="scoring.html">Scoring</a>
              <a href="register.html">Register</a>
              <a href="faq.html">FAQ</a>
            </nav>
          </div>
        </footer>`;
    }

    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      links.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function renderAnnouncements() {
    const el = document.querySelector("[data-bind='announcements']");
    if (!el || !window.SPEC) return;
    const items = window.SPEC.announcements || [];
    if (!items.length) {
      el.innerHTML = "<p>No announcements yet.</p>";
      return;
    }
    el.innerHTML = items
      .map(
        (a) => `
        <article class="card">
          <span class="card-kicker">${a.date}</span>
          <h3>${a.title}</h3>
          <p>${a.body}</p>
        </article>`
      )
      .join("");
  }

  function renderTrackCards() {
    const el = document.querySelector("[data-bind='track-cards']");
    if (!el || !window.SPEC) return;
    el.innerHTML = window.SPEC.tracks
      .map(
        (t) => `
        <a class="card" href="tracks.html#${t.id}">
          <span class="card-kicker">${t.short}</span>
          <h3>${t.name}</h3>
          <p>${t.objective}</p>
        </a>`
      )
      .join("");
  }

  function renderTrackTable() {
    const el = document.querySelector("[data-bind='track-table']");
    if (!el || !window.SPEC) return;
    el.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Track</th>
              <th>Objective</th>
              <th>Max size</th>
              <th>Key restriction</th>
            </tr>
          </thead>
          <tbody>
            ${window.SPEC.tracks
              .map(
                (t) => `
              <tr>
                <td><a href="#${t.id}">${t.short} — ${t.name}</a></td>
                <td>${t.objective}</td>
                <td>${t.maxSize}</td>
                <td>${t.keyRestriction}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>`;
  }

  function renderTracks() {
    const el = document.querySelector("[data-bind='tracks']");
    if (!el || !window.SPEC) return;
    el.innerHTML = window.SPEC.tracks
      .map((t) => {
        const callout = t.callout
          ? `<div class="callout" role="note"><strong>Independent baseline.</strong> ${t.callout}</div>`
          : "";
        return `
        <article class="rule" id="${t.id}">
          <span class="rule-num">${t.short}</span>
          <h2>${t.name}</h2>
          <dl class="dl-track">
            <dt>Objective function</dt>
            <dd>${t.objective}</dd>
            <dt>Model size limit</dt>
            <dd>${t.sizeNotes.join(" ")}</dd>
            <dt>Model restrictions</dt>
            <dd><ul>${t.restrictions.map((r) => `<li>${r}</li>`).join("")}</ul></dd>
            <dt>Eligibility notes</dt>
            <dd><ul>${t.eligibility.map((r) => `<li>${r}</li>`).join("")}</ul></dd>
          </dl>
          <h3>Description</h3>
          <p>${t.description}</p>
          ${callout}
        </article>`;
      })
      .join("");
  }

  function tocHtml(items, mobile) {
    const links = `<ol>${items
      .map((i) => `<li><a href="#${i.id}">${i.label}</a></li>`)
      .join("")}</ol>`;
    if (mobile) {
      return `<nav class="toc toc-mobile" aria-label="On this page"><details><summary>On this page</summary>${links}</details></nav>`;
    }
    return `<nav class="toc toc-desktop" aria-label="On this page"><p class="toc-title">On this page</p>${links}</nav>`;
  }

  function renderRules() {
    const el = document.querySelector("[data-bind='rules']");
    if (!el || !window.SPEC) return;
    const benefits = window.SPEC.benefits
      .map(
        (b) => `
        <article class="card" id="${b.id}">
          <h3>${b.title}</h3>
          <p>${b.text}</p>
        </article>`
      )
      .join("");
    const rules = window.SPEC.rules
      .map((r) => {
        const cls = r.callout ? "rule rule-callout" : "rule";
        return `
        <article class="${cls}" id="rule-${r.n}">
          <span class="rule-num">Rule ${r.n}</span>
          <h2>${r.title}</h2>
          <p>${r.text}</p>
        </article>`;
      })
      .join("");
    el.innerHTML = `
      <section id="participation">
        <h2>Participation, encouragements, and benefits</h2>
        <p>${window.SPEC.rulesIntro}</p>
        <div class="benefit-grid">${benefits}</div>
      </section>
      ${rules}
      <p id="verification">${window.SPEC.rulesClosing}</p>`;
  }

  function renderRulesToc() {
    const el = document.querySelector("[data-bind='rules-toc']");
    if (!el || !window.SPEC) return;
    const items = [
      { id: "participation", label: "Participation" },
      ...window.SPEC.benefits.map((b) => ({ id: b.id, label: b.title })),
      ...window.SPEC.rules.map((r) => ({ id: `rule-${r.n}`, label: `${r.n}. ${r.title}` })),
      { id: "verification", label: "Verification" }
    ];
    el.innerHTML = tocHtml(items, false) + tocHtml(items, true);
  }

  function renderTimeline() {
    const el = document.querySelector("[data-bind='timeline']");
    if (!el || !window.SPEC) return;
    el.innerHTML = window.SPEC.timeline
      .map((item) => {
        const date = window.SPEC.tbd[item.dateKey];
        return `
        <li id="${item.id}">
          <span class="timeline-date">${tbd(date)}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.note}</p>
          </div>
        </li>`;
      })
      .join("");
  }

  function renderFaq() {
    const el = document.querySelector("[data-bind='faq']");
    if (!el || !window.SPEC) return;
    const hours = window.SPEC.tbd.officeHoursUrl;
    el.innerHTML = window.SPEC.faq
      .map((item) => {
        let extra = "";
        if (item.id === "office-hours") {
          extra = hours
            ? `<p><a href="${hours}">Office hours calendar / signup</a></p>`
            : `<p>Office hours calendar / signup: <span class="tbd">TBD</span></p>`;
        }
        return `
        <details id="${item.id}">
          <summary>${item.q}</summary>
          <p>${item.a}</p>
          ${extra}
        </details>`;
      })
      .join("");
  }

  function renderSponsors() {
    const el = document.querySelector("[data-bind='sponsors']");
    if (!el || !window.SPEC) return;
    el.innerHTML = window.SPEC.sponsors
      .map((s) => {
        const img = s.logo
          ? `<img src="${s.logo}" alt="${s.name} logo" class="${s.logoClass || ""}">`
          : "";
        const heading = s.url
          ? `<h3><a href="${s.url}">${s.name}</a></h3>`
          : `<h3>${s.name}</h3>`;
        return `<article class="sponsor-card">${img}${heading}<p>${s.blurb}</p></article>`;
      })
      .join("");
  }

  function renderCollaborators() {
    const el = document.querySelector("[data-bind='collaborators']");
    if (!el || !window.SPEC) return;
    const c = window.SPEC.collaborators;
    el.innerHTML = `
      <div class="collab-list">
        <div>
          <h3>Academic</h3>
          <ul>${c.academic.map((n) => `<li>${n}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Industry</h3>
          <p class="industry-note">Industry collaborator names are listed in text only; logos are omitted from public-facing materials.</p>
          <ul>${c.industry.map((n) => `<li>${n}</li>`).join("")}</ul>
        </div>
      </div>`;
  }

  function renderOrganizers() {
    const el = document.querySelector("[data-bind='organizers']");
    if (!el || !window.SPEC) return;
    const o = window.SPEC.organizers;
    el.innerHTML = `
      <p><strong>${o.lab}</strong> under ${o.pi}, ${o.piRole}.</p>
      <p>Primary challenge organizers: ${o.primary.join(", ")}.</p>
      <p>Only the organizers have access to the held-out private MMBU set, allowing sponsors and collaborators to participate in the challenge.</p>
      <details>
        <summary>Full author list</summary>
        <ul class="author-list">
          ${o.authors.map((a) => `<li><strong>${a.name}</strong><span class="aff">${a.aff}</span></li>`).join("")}
        </ul>
      </details>`;
  }

  function renderTbdNote() {
    document.querySelectorAll("[data-bind='tbd-note']").forEach((el) => {
      el.innerHTML = `Final dates will be announced here and emailed to registered teams. Update values in <code>js/content.js</code> → <code>tbd</code>.`;
    });
  }

  function setupTocSpy() {
    const links = document.querySelectorAll(".toc a");
    if (!links.length) return;
    const map = [...links].map((a) => {
      const id = decodeURIComponent(a.getAttribute("href").slice(1));
      return { a, el: document.getElementById(id) };
    }).filter((x) => x.el);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) => l.removeAttribute("aria-current"));
          map.filter((m) => m.el === entry.target).forEach((m) => m.a.setAttribute("aria-current", "true"));
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    map.forEach((m) => io.observe(m.el));
  }

  function renderAll() {
    injectChrome();
    renderAnnouncements();
    renderTrackCards();
    renderTrackTable();
    renderTracks();
    renderRulesToc();
    renderRules();
    renderTimeline();
    renderFaq();
    renderSponsors();
    renderCollaborators();
    renderOrganizers();
    renderTbdNote();
    setupTocSpy();
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll);
  } else {
    renderAll();
  }

  window.SPEC_UI = { tbd };
})();
