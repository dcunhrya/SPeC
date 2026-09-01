(function () {
  const form = document.getElementById("register-form");
  const confirmEl = document.getElementById("register-confirm");
  if (!form) return;

  const MAX_MEMBERS = 8;
  const list = document.getElementById("member-list");
  const addBtn = document.getElementById("add-member");
  const conflictBox = document.getElementById("has-conflict");
  const conflictText = document.getElementById("conflict-text");

  function memberRow() {
    const row = document.createElement("div");
    row.className = "member-row";
    row.innerHTML = `
      <div>
        <label>Name <input type="text" name="member_name" autocomplete="name"></label>
      </div>
      <div>
        <label>Email <input type="email" name="member_email" autocomplete="email"></label>
      </div>
      <button type="button" class="btn btn-ghost remove-member" aria-label="Remove member">Remove</button>
    `;
    row.querySelector(".remove-member").addEventListener("click", () => {
      row.remove();
      syncAdd();
    });
    return row;
  }

  function syncAdd() {
    const n = list.querySelectorAll(".member-row").length;
    addBtn.disabled = n >= MAX_MEMBERS;
    addBtn.textContent = n >= MAX_MEMBERS ? "Member limit reached" : "Add team member";
  }

  addBtn.addEventListener("click", () => {
    if (list.querySelectorAll(".member-row").length >= MAX_MEMBERS) return;
    list.appendChild(memberRow());
    syncAdd();
  });

  conflictBox.addEventListener("change", () => {
    conflictText.required = conflictBox.checked;
    conflictText.closest("div").hidden = !conflictBox.checked;
  });
  conflictText.closest("div").hidden = true;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const tracks = data.getAll("tracks");
    if (!tracks.length) {
      form.querySelector("[name='tracks']").focus();
      alert("Select at least one track.");
      return;
    }
    if (!form.querySelector("[name='agree-rules']").checked || !form.querySelector("[name='agree-eligibility']").checked) {
      alert("Both agreement checkboxes are required.");
      return;
    }

    const names = data.getAll("member_name");
    const emails = data.getAll("member_email");
    const members = names
      .map((name, i) => ({ name: name.trim(), email: String(emails[i] || "").trim() }))
      .filter((m) => m.name || m.email);

    const payload = {
      submittedAt: new Date().toISOString(),
      teamName: data.get("team_name"),
      lead: {
        name: data.get("lead_name"),
        email: data.get("lead_email"),
        affiliation: data.get("lead_affiliation")
      },
      members,
      tracks,
      affiliations: data.get("affiliations"),
      conflictAccess: conflictBox.checked,
      conflictStatement: conflictBox.checked ? data.get("conflict_text") : "",
      agreedRules: true,
      agreedEligibility: true,
      note: "Client-side registration only. No server endpoint is configured yet (SPEC.tbd.formEndpoint)."
    };

    try {
      const prev = JSON.parse(localStorage.getItem("spec-registrations") || "[]");
      prev.push(payload);
      localStorage.setItem("spec-registrations", JSON.stringify(prev));
    } catch (err) {
      /* storage may be unavailable */
    }

    const endpoint = window.SPEC && window.SPEC.tbd && window.SPEC.tbd.formEndpoint;
    if (endpoint) {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(function () { /* endpoint optional until organizers set it */ });
    }

    form.hidden = true;
    confirmEl.hidden = false;
    confirmEl.innerHTML = `
      <div class="confirm">
        <h2>Registration recorded locally</h2>
        <p>Thank you. A server-side endpoint and email confirmation are not connected yet. This browser has stored a copy of your submission. Download it for your records; organizers will enable collection via <code>SPEC.tbd.formEndpoint</code> in <code>js/content.js</code>.</p>
        <p><strong>Team:</strong> ${payload.teamName}<br>
           <strong>Lead:</strong> ${payload.lead.name} &lt;${payload.lead.email}&gt;<br>
           <strong>Tracks:</strong> ${payload.tracks.join(", ")}</p>
        <pre id="payload-json">${JSON.stringify(payload, null, 2)}</pre>
        <p>
          <button type="button" class="btn btn-primary" id="download-json">Download JSON</button>
          <button type="button" class="btn btn-secondary" id="register-another">Register another team</button>
        </p>
      </div>`;

    document.getElementById("download-json").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `spec-registration-${payload.teamName.replace(/\s+/g, "-").toLowerCase()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
    document.getElementById("register-another").addEventListener("click", () => {
      form.reset();
      form.hidden = false;
      confirmEl.hidden = true;
      conflictText.closest("div").hidden = true;
      window.scrollTo({ top: form.offsetTop - 80, behavior: "smooth" });
    });
  });

  syncAdd();
})();
