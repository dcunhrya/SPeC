# Answers to your follow-ups

Two things before the list.

**The remote repo contains only the three-file scaffold.** The multi-page site you're describing (`content.js`, `scoring.html`, `register.html`, `assets/logos/`) is uncommitted local work. Before deleting anything: push the `scaffold-v0` tag, then commit the multi-page work to a branch `scaffold-multipage` and push that too. Nothing gets deleted until both are on the remote.

**Sponsors have changed.** Biohub is no longer a sponsor — remove it everywhere. The sponsor list is now **Anthropic, GXL, AWS, Highlanders**, four logos. Collaborators are unchanged.

---

## A — Architecture

**A1.** Follow the plan. Four routes: `/`, `/register`, `/policies/rules`, `404`. Scoring detail and the FAQ become sections of the rules page. No `/tracks`, no `/scoring`, no `/faq`.

**A2.** Delete the registration form. `/register` is a stub page: "Registration opens soon," the organizer email, nothing else. Do not collect names or emails into localStorage — no backend means no deletion path, no access-request path, and no privacy policy covering it.

**A3.** `site.registerUrl = '/register'`. The button is visible and points at the stub.

**A4.** npm. Node 22, pinned with `.nvmrc` and `NODE_VERSION=22` in the Pages project settings.

**A5.** No adapter. Plain static Astro. Add `@astrojs/cloudflare` in Phase 2 when there is SSR to adapt.

**A6.** The Pages project name is `spec-challenge`, so the host is known: put `https://spec-challenge.pages.dev` in `site.baseUrl` now. Do not hardcode the host anywhere else.

## B — Content

**B1.** Correct split — `content.js` and `scoring.html` are canonical for rules, constraints, formulas, FAQ, and MMBU task text; the plan is canonical for layout, tokens, type, specimen wall, and Get involved. Where `content.js` and the challenge PDF disagree on a fact, the PDF wins.

**B2.** Keep all ten FAQ entries. As a section on `/policies/rules`, not a separate route.

**B3.** Full scoring depth on the rules page; the short disclosure on the homepage. **α is not final — do not print a number.** Say that α controls the strength of the efficiency bonus and that its value will be fixed and announced before the development phase. Same rule anywhere else α appears.

**B4.** Drop the stacked-bar chart. The live tile carries the argument; two versions of it on one page is redundant, and it reconstructs a figure from an unpublished paper.

**B5.** **Do not name any model.** The hero metadata card reads "A frontier model answered:" against "Ground truth:". Keep the plan's content pairing (predicted CT / radiology; ground truth light microscopy / biology). No model names anywhere on the public site — not in the hero, not in About, not in the FAQ.

**B6.** Drop the four-card benefits block. Fold the technical-report invitation for top teams into About as one line. Office hours are already on the timeline.

**B7.** Drop the announcements grid for Phase 1. An empty grid is worse than none. It returns in Phase 2 backed by the announcements table.

**B8.** Four nodes on the rail — seven blank nodes will not fit horizontally and communicate nothing. Put registration close, hidden-set score release, and the dispute window as a short line beneath the rail.

**B9.** Preserve `#rule-1` … `#rule-14` anchors. Version the page `v1.0` with a "last amended" line set to the date of first publication.

**B10.** Omit the hardware/memory/runtime sentence entirely until `site.hardwareLimits` is set. No TBD.

## C — People and sponsors

**C1.** Four organizers only, names and affiliations, no photographs: Ryan D'Cunha (Stanford University; GXL), Alejandro Lozano (Stanford University), Akira Nishii (Stanford University; GXL), Maximilian Rokuss (University of Heidelberg). Serena Yeung-Levy appears in the intro line only. The 17-person author list does not go on the site.

**C2.** Yes — Apple joins the collaborator grid, text only like every other collaborator.

**C3.** Flat grid. Drop the academic/industry split; it labels who is industry and serves no reader.

**C4.** `rdcunha@stanford.edu` everywhere, sourced once from `site.contactEmail`.

**C5.** Highlanders stays. Logo will be at `public/logos/highlanders.svg`. Name-only with no link until a URL is supplied — render the name in Newsreader at the same optical height as the logos.

**C6.** Biohub is removed from sponsors entirely. Delete the entry, the logo, and the URL.

**C7.** GXL stays; logo present.

**C8.** **Change the logo treatment.** Do not desaturate. Most brand guidelines forbid altering logo color, and grayscale-to-color is an alteration. Display logos in approved full color at rest, with a subtle opacity or scale shift on hover and focus. Uniform optical height (~40px), not uniform box height.

## D — Design and assets

**D1.** Self-host woff2 subsets under `public/fonts/`. No Google Fonts request.

**D2.** Bundle KaTeX from npm. That removes the CDN fallback path — delete it.

**D3.** Generate the OG card: wordmark and headline on `--graphite`, 1200×630, at `public/og-image.png`. Do not ship with empty sharing tags.

**D4.** Carry forward the existing `favicon.svg`.

**D5.** Abstract SVG with more cell-like structure, named `tile-live.svg`. Do not fabricate a plausible micrograph — the metadata card makes a claim about it. Comment that this is the first tile to replace with licensed imagery.

**D6.** Text "SPeC" in Newsreader. No Stanford wordmark, shield, or logo anywhere. The headline uses the challenge's own name, which is fine.

**D7.** Hide the SPeC citation. Label the footer block "Cite the benchmark" with the MMBU entry (arXiv:2606.06696), and note in a comment that it is superseded when the technical report exists.

**D8.** `site.pdfUrl` is null; hide the download button. Keep prose that references the challenge document, but render no link to it.

## E — Repo, redirects, deploy

**E1.** Push `scaffold-v0` as it stands, then commit the uncommitted multi-page site to `scaffold-multipage` and push. Both on the remote before any deletion.

**E2.** Implement on `rebuild/astro`. Merge to `main` when Phase 1 is deployable.

**E3.** Add `public/_redirects` only. Leave GitHub Pages running. Turning it off and adding the `gh-pages` refresh page happens after Cloudflare is live and verified — not in this run.

**E4.** Map confirmed, with three additions:

```
/index.html      → /
/tracks.html     → /#tracks
/timeline.html   → /#timeline
/sponsors.html   → /#organizers
/rules.html      → /policies/rules
/rules.html#rule-N → /policies/rules#rule-N
/scoring.html    → /policies/rules#scoring
/faq.html        → /policies/rules#faq
/register.html   → /register
```

**E5.** Self-hosting fonts and KaTeX makes this moot. `script-src 'self'`; allow `'unsafe-inline'` for `style-src` only.

**E6.** Replace the README with Astro, Wrangler, and Pages instructions. Keep a short note that the old GitHub Pages URL redirects here.

## F — Copy

**F1.** "The Stanford Biomedical Perception Challenge," with the article.
**F2.** "Read the tracks" → `#tracks`.
**F3.** Correct. Header carries About, Tracks, Timeline, Organizers, Get involved, plus Register. Footer carries Rules and the citation block.
**F4.** Public title is "Domain adaptation and efficient inference." Use "Efficient track" once inside the scoring text where the formula is introduced.
**F5.** Yes. Acronyms keep their capitalization: MMBU, SPeC, VQA, MoE, API, IoU, BF16, FP16.
**F6.** Keep the office-hours line. No calendar URL yet.
**F7.** Name them. Sonnet-5 is the judge, with organizers reserving the right to switch to Gemma 4 or Qwen3.5. Judge substitution affects scoring, so participants should see it. This is the one place model names are correct — it is a scoring disclosure, not a performance claim, so it does not conflict with B5.

## G — Out of editor

Confirmed, all four are mine to handle. Do not block on them. Stanford naming has been checked and the site is fine as specified.
