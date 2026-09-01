# SPeC — Stanford Biomedical Perception Challenge

Public website for **SPeC**, a research competition organized by [Stanford MARVL](https://marvl.stanford.edu/) under Dr. Serena Yeung-Levy, built on the [MMBU benchmark](https://arxiv.org/abs/2606.06696).

Live (GitHub Pages): **https://dcunhrya.github.io/SPeC/**

## Local development

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Where to edit content

Almost all challenge copy, dates, FAQ, and the registration endpoint live in **`js/content.js`**.

| What | Where |
| --- | --- |
| TBD dates, office-hours URL, form endpoint | `window.SPEC.tbd` |
| 14 rules (verbatim) | `window.SPEC.rules` |
| Tracks | `window.SPEC.tracks` |
| FAQ | `window.SPEC.faq` |
| Announcements | `window.SPEC.announcements` |
| Sponsors / authors | `window.SPEC.sponsors`, `organizers` |
| Scoring formulas | `scoring.html` (KaTeX) |

Replace any `"TBD"` string or empty `formEndpoint` / `officeHoursUrl` when those are known. Do not invent dates in HTML.

## Registration backend

The Register page is a real form (team, lead, members, tracks, conflicts, rule agreements). Until `SPEC.tbd.formEndpoint` is set, submissions are stored in the browser (`localStorage`) and offered as a JSON download. Set `formEndpoint` to a POST URL (Formspree, a serverless function, etc.) when you are ready to collect responses.

## Structure

- `index.html` — overview, motivation, Fig. 1, track cards
- `tracks.html` — comparison table + three tracks
- `scoring.html` — T, C, per-track formulas, MMBU tasks
- `rules.html` — participation notes + Rules 1–14 (`#rule-1` … `#rule-14`)
- `timeline.html` — TBD dates
- `register.html` — team sign-up
- `faq.html`
- `sponsors.html` — sponsors (logos) vs industry collaborators (text only)

## Notes

- The internal rules PDF is gitignored and is not part of the public site.
- Industry collaborator logos are omitted by design (Microsoft AI, Google DeepMind, OpenAI).
- Fig. 1 is an accessible stacked-bar reconstruction of the source figure percentages (n = 500).
