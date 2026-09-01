(function () {
  const host = document.querySelector("[data-bind='fig1']");
  if (!host || !window.SPEC || !window.SPEC.fig1) return;

  const fig = window.SPEC.fig1;
  const cats = [
    { key: "robust", cls: "robust", label: "Robust success (Meta ✓, Ans ✓)" },
    { key: "shortcut", cls: "shortcut", label: "Shortcut learning (Meta ×, Ans ✓)" },
    { key: "reasoning", cls: "reasoning", label: "Reasoning failure (Meta ✓, Ans ×)" },
    { key: "fail", cls: "fail", label: "Complete failure (Meta ×, Ans ×)" }
  ];

  const bars = fig.models
    .map((m) => {
      const segs = cats
        .map((c) => {
          const pct = m[c.key];
          return `<div class="bar-seg ${c.cls}" style="flex: ${pct} 0 0" title="${c.label}: ${pct}%">${pct}%</div>`;
        })
        .join("");
      return `<div class="bar-col">
        <div class="bar-stack" role="img" aria-label="${m.name}: robust ${m.robust}%, shortcut ${m.shortcut}%, reasoning failure ${m.reasoning}%, complete failure ${m.fail}%">${segs}</div>
        <div class="bar-label">${m.name}</div>
      </div>`;
    })
    .join("");

  const tableRows = fig.models
    .map(
      (m) =>
        `<tr><th scope="row">${m.name}</th><td>${m.robust}%</td><td>${m.shortcut}%</td><td>${m.reasoning}%</td><td>${m.fail}%</td></tr>`
    )
    .join("");

  const ex = fig.example;
  host.innerHTML = `
    <div class="fig-block">
      <div class="fig-chart">
        <div class="fig-legend" aria-hidden="true">
          ${cats
            .map(
              (c) =>
                `<span><i class="swatch swatch-${c.cls === "fail" ? "fail" : c.cls}"></i>${c.label}</span>`
            )
            .join("")}
        </div>
        <p class="sr-only">Stacked bar chart of a 500-question MMBU subset. Categories are robust success, shortcut learning, reasoning failure, and complete failure.</p>
        <div class="bar-chart">${bars}</div>
        <table class="sr-only">
          <caption>Category percentages shown on Fig. 1 (n = ${fig.n})</caption>
          <thead><tr><th>Model</th><th>Robust</th><th>Shortcut</th><th>Reasoning fail</th><th>Complete fail</th></tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
      <aside class="fig-example">
        <h3>Shortcut-learning example (${ex.model})</h3>
        <p>The model answers the downstream item correctly while misidentifying foundational image metadata.</p>
        <p><strong>Predicted metadata</strong></p>
        <div class="meta-row"><span>Domain</span><span class="wrong">${ex.predicted.domain}</span></div>
        <div class="meta-row"><span>Modality</span><span class="wrong">${ex.predicted.modality}</span></div>
        <div class="meta-row"><span>Submodality</span><span class="wrong">${ex.predicted.submodality}</span></div>
        <div class="meta-row"><span>Body part</span><span class="wrong">${ex.predicted.bodyPart}</span></div>
        <div class="meta-row"><span>Answer</span><span class="right">${ex.predicted.answer}</span></div>
        <p style="margin-top:0.8rem"><strong>Reference metadata</strong></p>
        <div class="meta-row"><span>Domain</span><span class="right">${ex.correct.domain}</span></div>
        <div class="meta-row"><span>Modality</span><span class="right">${ex.correct.modality}</span></div>
        <div class="meta-row"><span>Submodality</span><span class="right">${ex.correct.submodality}</span></div>
        <div class="meta-row"><span>Body part</span><span class="right">${ex.correct.bodyPart}</span></div>
        <div class="meta-row"><span>Answer</span><span class="right">${ex.correct.answer}</span></div>
      </aside>
    </div>
    <p class="fig-caption">${fig.caption} Percentages are those labeled on the source figure (n = ${fig.n}).</p>
  `;
})();
