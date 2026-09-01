# SPeC — end-to-end build plan and Cursor prompt (v2, Cloudflare)

Supersedes v1. Same design system and content decisions; retargeted from GitHub Pages to Cloudflare, and extended to cover the participant portal.

- **Repo:** `github.com/dcunhrya/SPeC` — the existing scaffold is replaced, not extended.
- **Host:** Cloudflare Pages (+ Pages Functions, D1, R2, KV).
- **Reference for structure only:** `DIAGNijmegen/rse-grand-challenge` (Apache-2.0, Django/DRF/Docker). Read it for challenge lifecycle and page structure. Do not port code — it executes participant containers on AWS GPUs and cannot run on Cloudflare.

---

# Part 0 — Scope, in two phases

**Phase 1 — public site.** Static, no accounts. Ships first, on its own. This is v1's spec, retargeted.

**Phase 2 — participant portal.** Accounts, teams, submission disclosures, gated rules, compute credits. Built behind a flag, launched when registration opens.

Build Phase 1 completely and deploy it before starting Phase 2. Do not scaffold portal UI into the public pages.

**Why the portal is small here.** Participants submit a Hugging Face model reference or API credentials; organizers run the official SPeC harness offline on their own compute. The portal never runs untrusted code, never has GPUs, and never stores the hidden evaluation set. It is CRUD plus auth plus file gating.

**Hard boundary — repeat this in the code as a comment.** The hidden MMBU evaluation set, its labels, and its derivatives never exist in this repo, in R2, in D1, or on any host reachable from the web application. Only organizers hold that data, on separate infrastructure. Nothing in Phase 2 may weaken this.

---

# Part 1 — Stack and infrastructure

| Concern | Service | Notes |
|---|---|---|
| Framework | **Astro 5** | Static output for public pages, `output: 'server'` only on portal routes via `@astrojs/cloudflare`. Components stop nav/footer duplication across pages. |
| Hosting | **Cloudflare Pages** | Free tier. Git-connected: push to `main` deploys, PRs get preview URLs. |
| Server code | **Pages Functions** | `functions/` directory or Astro SSR endpoints. Free tier: 100k requests/day. |
| Database | **Cloudflare D1** | SQLite. Users, teams, submissions, credit grants, audit log. |
| File storage | **Cloudflare R2** | Gated PDFs, sponsor logos, headshots. No egress fees. |
| Sessions | **Workers KV** | Session tokens keyed to user id, short TTL. |
| Bot protection | **Turnstile** | On signup and all public forms. |
| Transactional email | **Resend** or **MailChannels** | Verification, password reset, clarification broadcasts. |
| Domain | **`spec-challenge.pages.dev`** | The free Cloudflare Pages subdomain. Use it as the canonical URL everywhere — canonical tag, OG `url`, sitemap, BibTeX. A custom domain can be attached later in the Pages dashboard with no code change, so do not hardcode the host anywhere outside `site.baseUrl`. |

Do not add: a UI component library, a CSS framework, an ORM, or an auth SaaS. The design system below is hand-written, and the data model is small enough for hand-written SQL.

## Repo migration

The existing repo is a three-file scaffold (`index.html`, `css/styles.css`, `js/main.js`) with placeholder content. Replace it.

1. Tag the current state first: `git tag scaffold-v0 && git push --tags`. Nothing is lost.
2. Work on `rebuild/astro`, merge to `main` when Phase 1 is deployable.
3. Delete `index.html`, `css/styles.css`, `js/main.js` outright. Do not migrate them file by file — the content is placeholder and the CSS has a `.section` / `.cta-section` specificity collision. The only thing carried forward is the cardinal `#8C1515` anchor.
4. Turn off GitHub Pages in repo settings once Cloudflare serves the domain. Publish a single `index.html` on a `gh-pages` branch containing a `<meta http-equiv="refresh">` and a visible link to the new domain — the old URL may already be circulating.
5. Add `wrangler.toml`, `.dev.vars.example`, and a `README.md` covering local dev, D1 migrations, and deploy.

Target structure:

```
src/
  components/    Header, Footer, SpecimenWall, TrackRow, TimelineRail,
                 SponsorWall, CollaboratorGrid, Chip, Disclosure
  layouts/       Base.astro, Portal.astro
  pages/         index.astro, register.astro, 404.astro
                 policies/rules.astro
                 portal/…            (Phase 2, SSR)
  content/       site.ts, organizers.ts, sponsors.ts, collaborators.ts,
                 timeline.ts, tracks.ts, faq.ts
  styles/        tokens.css, base.css
functions/api/   Phase 2 endpoints
migrations/      D1 SQL
public/          docs/, logos/, tiles/, og-image.png
```

All content lives in `src/content/*.ts` as typed objects. Pages map over them. Updating a sponsor or a date is a one-line edit in one file, never a hunt through markup.

---

# Part 2 — Public site (Phase 1)

## Voice

Readers are ML researchers deciding whether to spend two months of compute on this. Plain, active sentences. Constraints as numbers. No marketing adjectives, no exclamation points.

- Sentence case for all headings, buttons, labels. **No all-caps eyebrow labels.**
- No `→` on link or button text. No middle-dot meta strings (`A · B · C`).
- Buttons name the outcome: "Register a team," "Download the challenge document."
- Never accent one word inside a headline with color or italic.

## Tokens — `src/styles/tokens.css`

```css
:root {
  --cardinal:      #8C1515;  /* primary: links, CTAs, active nav, rules */
  --cardinal-deep: #63100F;
  --ink:           #171514;
  --ink-muted:     #57514C;
  --paper:         #FBFAF8;
  --slide:         #ECE9E4;  /* alt ground — an unstained slide margin */
  --graphite:      #232120;  /* hero and footer ground */
  --scope:         #1F5F5B;  /* clinical teal: eligibility chips, metric values */
  --border:        #DCD6D0;
}
```

No gradient washes as decoration. The one permitted gradient is a vignette over the hero tiles so white text stays legible.

**Type.** Newsreader (600, 400 italic) for headings and the hero. Instrument Sans (400/500/600) for body and UI. IBM Plex Mono (400/500) **for real data only** — parameter counts, scoring formulas, dates, score values, BibTeX, JSON. Mono is a data face here, not a styling device; keep it off section labels and captions.

| Role | Size | Face |
|---|---|---|
| Hero h1 | `clamp(2.6rem, 5.5vw, 4.25rem)`, lh 1.05, `text-wrap: balance` | Newsreader 600 |
| h2 | `clamp(1.9rem, 3vw, 2.6rem)`, lh 1.15 | Newsreader 600 |
| h3 | `1.35rem` | Newsreader 600 |
| Body | `1.0625rem`, lh 1.65, `max-width: 68ch` | Instrument Sans 400 |
| Lead | `1.2rem`, lh 1.55, `max-width: 60ch` | Instrument Sans 400 |
| Caption | `0.9rem`, `--ink-muted` | Instrument Sans 400 |
| Data | `0.95rem`, tabular numerals | IBM Plex Mono 500 |

**Layout.** Container `width: min(100% - 2.5rem, 1180px)`. 12-column grid on desktop, single column below 900px. **Content is left-aligned throughout** — only the sponsor wall and footer center. Section padding `clamp(4rem, 9vw, 7rem)` set once on the section component and never overridden by a child. Grounds alternate `--paper` → `--slide` → `--paper` so boundaries read without decorative dividers. Two radii only: `4px` chips/inputs/buttons, `10px` image tiles and callouts. Do not put one radius and one grey shadow on every block.

**Motion.** One orchestrated moment: the hero load sequence. Everything else responds to user action. No fade-and-slide-up reveal per section. All non-essential motion disabled under `prefers-reduced-motion`, including the hero — render its final state immediately.

## Navigation

Sticky header: SPeC wordmark left; **About · Tracks · Timeline · Organizers · Get involved**; then a filled cardinal **Register** button at the far right, visually separated from the text links.

`IntersectionObserver` sets `aria-current="true"` on the in-view section's link, rendered as a 2px cardinal underline. Mobile hamburger traps focus, closes on `Escape` and on link click.

## Section 1 — Hero, the specimen wall

This is the signature element. Spend the design budget here. Full viewport minus header, on `--graphite`.

```
┌───────────────────────────────────────────────────────────┐
│ SPeC   About  Tracks  Timeline  Organizers  Get involved  [Register] │
├──────────────────────────────┬────────────────────────────┤
│                              │  ▨ ▨ ▨ ▨                   │
│  The Stanford Biomedical     │  ▨ ▨ ▨ ▨   ← wall bleeds   │
│  Perception Challenge        │  ▨ ▨ ▨ ▨      off-edge     │
│                              │  ▨ ▨ ▨ ▨                   │
│  Frontier models answer      │  ┌──────────────────────┐  │
│  biomedical questions        │  │ Opus-5 answered:     │  │
│  correctly while             │  │ modality:  CT        │  │
│  misidentifying what they    │  │ domain:    radiology │  │
│  are looking at. SPeC        │  │ Ground truth:        │  │
│  targets that gap.           │  │ modality:  light     │  │
│                              │  │            microscopy│  │
│  [Register a team]           │  │ domain:    biology   │  │
│  [Read the tracks]           │  └──────────────────────┘  │
│                              │                            │
│  3 tracks   1 benchmark   4 task types                     │
└───────────────────────────────────────────────────────────┘
```

Headline block on columns 1–6, left-aligned. Specimen wall on columns 7–12, bleeding off the right edge.

**The wall:** a 4×4 grid of square biomedical image tiles, ~10px gap — histology, chest CT, fundus photograph, electron micrograph, blood smear, chest radiograph, MRI slice, immunofluorescence. Tiles at ~55% opacity, slightly desaturated, so the headline dominates. Sourced from `site.heroTiles`, pointing at `public/tiles/`.

**Placeholder tiles for now.** Do not block on real imagery. Generate sixteen abstract greyscale SVG tiles procedurally — soft noise, radial and banded gradients at varying scale, no attempt to imitate a real scan — commit them to `public/tiles/`, and name them so the swap is obvious (`tile-01.svg` … `tile-16.svg`). Add a comment listing exactly which files to replace with licensed biomedical imagery later. The **live tile is the exception**: it needs a plausible micrograph-like image because the metadata card refers to it, so give it its own placeholder and flag it separately in the comment. Render a `--slide` block if any file is missing rather than a broken image.

**The live tile:** one tile at full opacity with a thin cardinal border, beside a metadata card in IBM Plex Mono showing the model's answer against ground truth — mismatched fields in cardinal, correct fields in `--scope`. This is the Fig. 1 shortcut-learning result and it *is* the argument for the challenge. Do not reduce it to a generic stat block.

**Load sequence:** tiles fade in over ~600ms in a staggered diagonal; the live tile brightens; its card types out the model's answer, pauses ~700ms, then reveals ground truth. Runs once, does not loop, skipped entirely under reduced motion. No hover animation on the other tiles.

**Copy.** Headline: "The Stanford Biomedical Perception Challenge." Lead (≤40 words): frontier multimodal models often reach the right answer while failing to identify the modality, scale, or anatomy in front of them; SPeC measures and closes that perception gap.

**Buttons.** Primary "Register a team" → `site.registerUrl`. Secondary, outlined white on graphite, "Read the tracks" → `#tracks`.

**Stat strip.** One line: 3 tracks, 1 shared benchmark (MMBU), 4 task types. Generous spacing and a hairline rule — **not** three bordered cards, **not** middle-dot separated. Values in mono, labels in Instrument Sans.

**Countdown.** If `site.registrationDeadline` is set, show "Registration closes in N days" in the strip. If null, render nothing — no "TBD" state.

## Section 2 — About

Prose on columns 1–7, bordered callout on 9–12.

Three short paragraphs, written fresh:
1. Scale. Roughly 700 million imaging exams and an estimated 6.4 billion pathology slides annually; electron microscopy and spatial imaging push into petabytes. Most of it is stored and never analyzed.
2. Perception vs. cognition. Models need both — accurate visual recognition, and reasoning over it with prior knowledge. Recent work has pushed reasoning; the evidence says perception is now the binding constraint.
3. What SPeC does. Evaluates and advances perception across modalities, biological scales, anatomical regions, and clinical contexts, on a shared benchmark with a public dev set and a hidden evaluation set.

**Callout** (`--slide`, 10px radius, thin cardinal left border) — "Why metadata is scored." Three tight bullets: incomplete DICOM headers during report generation; metadata stripped by de-identification when datasets pool across sites; literature figure mining where accompanying text is sparse. Then "Download the challenge document (PDF)" → `site.pdfUrl`, file size in mono beside it.

**Benchmark strip**, full width: a short paragraph on MMBU as the evaluation foundation, then the four task types as a definition list (term in Newsreader, one-sentence definition in Instrument Sans) — ungrounded classification, fine-grained classification from segmentation, fine-grained classification from detection, object detection. One line noting the public dev set has open- and closed-ended VQA while the hidden set is open-ended only. Link MMBU to `site.mmbuUrl`.

## Section 3 — Tracks

**Not three identical cards.** Each track is a horizontal spec-sheet row: a 2px cardinal rule above, then a 12-column grid.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Track 1                    │ Objective: best overall performance
Open frontier performance  │
                           │ Submit your best-performing model. No size
                           │ limit; models above 27B active parameters
                           │ must be reachable through an API key.
                           │
                           │ [Max size: none] [Same org: pretrain → post-train]
                           │
                           │  S_frontier = 0.8·T + 0.2·C
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Cols 1–4: track number (Newsreader, `--ink-muted`) and title. Cols 5–12: objective, 2–3 sentences, eligibility chips, formula.

| # | Title | Objective | Constraints |
|---|---|---|---|
| 1 | Open frontier performance | Best overall performance | No max size. Models > 27B active params must be available via API key. Pretrained, mid-trained, and post-trained by the same organization. |
| 2 | Medical domain adaptation | Delta-based adaptation score | No max size; API access required above 27B active params. Adapted from a disclosed base model. |
| 3 | Domain adaptation and efficient inference | Maximum perception at minimum compute | ≤ 4B active parameters, ≤ 12B total (e.g. MoE). Adapted from a disclosed base model. Active parameter count disclosed to qualify for an award. |

**Chips:** `4px` pills, `--scope` text on a 10%-tint `--scope` ground, values in mono. One per constraint. These encode real eligibility — no decorative chips.

**Formulas:** KaTeX from CDN, with the render call guarded so the page degrades to plain mono text if the CDN fails.

- `S_{\mathrm{Frontier}} = 0.8\,T + 0.2\,C`
- `S_{\mathrm{Frontier}} = (0.8\,T + 0.2\,C) \times (\mathrm{Acc}_{\mathrm{med}} - \mathrm{Acc}_{\mathrm{base}})`
- `S_{\mathrm{Efficient}} = (0.8\,T + 0.2\,C)\left(\frac{P_{\max}}{P}\right)^{\alpha}`

Then a **"How scoring works"** disclosure (`<details>`, closed, styled, no default marker): `T` is the mean judge-assigned answer score; `C` is mean per-example metadata accuracy, normalized within each example so examples with more annotated fields do not carry more weight. Fields are modality, submodality, specimen, body part, stain, medical domain. Sonnet-5 is the judge, with organizers reserving the right to switch. Close with a link to the full rules.

## Section 4 — Timeline

Simple. Horizontal rail on desktop (nodes on a hairline), vertical on mobile. Each entry: date in mono, short Newsreader title, one line of detail.

Status per `timeline[].status`: `done` = filled cardinal dot; `current` = cardinal ring with `--scope` fill, label in `--ink`; `upcoming` = hollow `--border` ring, muted text. Numbered markers belong here because this is genuinely a sequence — and nowhere else on the site.

Four phases, all with `date: null` for now: registration opens · development phase and dev-set release · final submission deadline · results and technical report.

When `date` is null, render the date slot **blank** — reserve its space so the rail does not reflow when dates are filled in, but print nothing there. No "TBD", no "Coming soon", no placeholder glyph. All four nodes take `status: 'upcoming'` until dates exist.

Include one line: organizers hold 30-minute weekly office hours during the development phase, and clarifications affecting the competition go to all registered teams.

## Section 5 — Organizers

Three sub-blocks under one `h2`, separated by hairline rules. **The tiers mean different things and must not look interchangeable.**

**5a. Organizing committee.** Intro line: SPeC is organized by the Stanford Medical AI and Computer Vision Lab (MARVL) under Dr. Serena Yeung-Levy, Assistant Professor of Biomedical Data Science and, by courtesy, of Computer Science and of Electrical Engineering. Then **exactly four people, names and affiliations only — no photographs**:

| Name | Affiliation |
|---|---|
| Ryan D'Cunha | Stanford University; GXL |
| Alejandro Lozano | Stanford University |
| Akira Nishii | Stanford University; GXL |
| Maximilian Rokuss | University of Heidelberg |

Set them as a four-column grid on desktop, two on tablet, one on mobile. Name in Newsreader, affiliation beneath in Instrument Sans `--ink-muted`, separated by a hairline rule above each entry. Because there are no portraits, the type is the whole treatment — give each entry generous vertical space and do not wrap it in a bordered card to compensate for the missing image. Serena Yeung-Levy is named in the intro line and does not appear in the grid. Do not add names. Below the grid, one line: only organizers have access to the held-out MMBU set, which is what allows sponsors and collaborators to compete.

**5b. Sponsors.** Lead with the disclosure in body text, not fine print: *All sponsors have committed monetary support to SPeC and are formally recognized in the technical report. Sponsors may also participate as co-authors and may attend office hours.* Then a logo wall: centered, evenly spaced, grayscale at rest and full color on hover/focus, uniform **optical** height (~40px) rather than uniform box height, each linked to the sponsor site with the sponsor name as `alt`. Sponsors: **Anthropic, GXL, AWS, Biohub, Highlanders.**

**5c. Collaborators.** Lead with the disclosure: *Collaborators provide no monetary support and are distinct from sponsors. They contribute feedback on rules, metrics, track design, and experimental design, and support outreach.* Then a plain text grid of institution names — 3 columns desktop, 2 tablet, 1 mobile — Instrument Sans at body size, hairline rule between rows. Collaborators: **Stanford University, University of Cambridge, University of Washington, University of Texas MD Anderson Cancer Center, Microsoft AI, Google DeepMind, OpenAI, Apple.**

> **Hard constraint — do not violate.** Collaborators are text only. No logos, wordmarks, favicons, brand colors, or logo wall, in this section or anywhere on the site. This is a commitment made to industry collaborators covering all public-facing materials. If you are tempted to improve this section by adding logos, do not.

Put that rule in an HTML comment above the block so it survives future edits.

## Section 6 — Get involved

Two columns, each a distinct path, on `--slide` grounds at 10px radius.

- **Sponsor SPeC.** Monetary support. Recognition in the technical report, optional co-authorship, logo placement on this site and at the award ceremony, optional office-hour attendance for direct participant feedback on sponsor tooling.
- **Collaborate.** No monetary support. Feedback on rules, metrics, and track design; dataset contributions; outreach. Recognition in the technical report as authors or in acknowledgments, based on contribution.

Each ends with a mailto button to `rdcunha@stanford.edu` carrying a prefilled subject (`?subject=SPeC%20sponsorship%20inquiry` / `...collaboration%20inquiry`). One line below both for general questions, same address. Store it once as `site.contactEmail` and reference it from here and the footer — never hardcode it twice.

## Section 7 — Footer

`--graphite`. Left: wordmark, one-line description, copyright. Right: nav links, contact email, policy links, and a **"Cite this challenge"** disclosure with a BibTeX block in mono and a copy button that swaps its label to "Copied" for 2 seconds — a state change, not an animation.

## Policy pages

One static page for now: `/policies/rules` — the full numbered rules from the challenge document, canonical and versioned with a "last amended" date. Linked from the footer and from the "How scoring works" disclosure.

Terms of use and a privacy policy are deliberately out of scope while the site collects no personal data. They return as blockers the moment Phase 2 opens signup, since that means storing names, emails, and affiliations from participants in the EU and UK. Leave the footer's policy list structured so two more entries slot in without a redesign.

## Quality floor

- Responsive at 375 / 768 / 1024 / 1440. Hero stacks below 900px; the wall becomes a 3×2 strip beneath the headline; the live metadata tile stays visible at every width.
- Visible focus rings on every interactive element (2px `--cardinal`, 2px offset; white on `--graphite`). Working skip link. Nav closes on `Escape`.
- One `h1`; `<section aria-labelledby>`; `<nav aria-label="Primary">`; real `<button>` elements.
- WCAG AA on every text/background pair. Check `--ink-muted` on `--slide` and white on `--graphite` specifically.
- Explicit `width`/`height` on images, `loading="lazy"` below the fold, WebP, descriptive `alt`. Decorative tiles get `alt=""` and `aria-hidden`; the live tile gets a real description.
- Subset the three families, `preconnect` to the font host. No library beyond KaTeX. LCP under 2s on a mid-range phone.
- Title, description, canonical, Open Graph and Twitter tags, `public/og-image.png` at 1200×630.
- `public/_headers` with CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS. `public/_redirects` for legacy paths.

---

# Part 3 — Participant portal (Phase 2)

Ship behind `site.features.portal`. Routes under `/portal/`, SSR via `@astrojs/cloudflare`. Reuses the same tokens and components; the portal is the same site with a session, not a separate visual product.

## What it must do

Derived from the challenge rules — each item below maps to a numbered rule in the challenge document.

| Capability | Rule it enforces |
|---|---|
| Account signup, email verification, password reset | Team eligibility |
| Team creation and invitation; one team per person unless organizers approve | Rule 11 |
| Membership frozen at the registration deadline | Rule 11 |
| Organizer review and approval of team applications | Rule 11 |
| One designated frozen checkpoint per track, per team | Rules 2, 7 |
| Submission form: HF repo + revision, total and active parameter counts, base model, API endpoint if > 27B | Rules 1, 2 |
| Training-data and contamination disclosure, free text plus structured sources | Rule 6 |
| Gated documents: full rules, evaluation harness, dev-set instructions | — |
| Compute credit codes, issued once per team, audited | — |
| Clarification broadcasts to all registered teams | Rule 12 |
| Office-hours schedule and signup | — |
| Leaderboard, publishable by organizers after final scoring | Rule 8 |

## Pages

`/portal/login`, `/portal/signup`, `/portal/verify`, `/portal/reset` · `/portal` (dashboard: team status, track, deadlines, announcements) · `/portal/team` (members, invitations, join requests) · `/portal/submit` (per-track submission and disclosure form, editable until the deadline, frozen after) · `/portal/rules` (gated full rules and clarification log) · `/portal/credits` (issued codes and redemption instructions) · `/portal/admin/*` (organizers only: approve teams, review disclosures, issue credits, broadcast clarifications, publish leaderboard).

## D1 schema sketch

```sql
users(id, email, email_verified_at, password_hash, name, affiliation,
      country, created_at, is_organizer)
teams(id, name, slug, status, applied_at, approved_at, approved_by, frozen_at)
team_members(team_id, user_id, role, joined_at)          -- one team per user
invitations(id, team_id, email, token_hash, expires_at, accepted_at)
submissions(id, team_id, track, hf_repo, hf_revision,
            params_total, params_active, base_model, api_endpoint_ref,
            data_disclosure, status, submitted_at, frozen_at)
credit_grants(id, team_id, sponsor, code_ref, issued_at, issued_by, redeemed_at)
announcements(id, title, body_md, published_at, published_by)
audit_log(id, actor_user_id, action, subject_type, subject_id, meta_json, at)
```

Unique index on `team_members(user_id)` enforces one team per person at the database level, not in application logic. Everything an organizer does that affects eligibility writes to `audit_log` — you will be asked to justify a disqualification eventually, and rules 13 and 14 make that likely.

## Security invariants

- Argon2id or scrypt for passwords. Session tokens in KV, `HttpOnly; Secure; SameSite=Lax`, short TTL, rotated on privilege change.
- Never store sponsor API keys or raw credit codes in plaintext. Store a reference or a hash; deliver the secret once and record only that delivery happened.
- Turnstile on signup, invitation acceptance, and password reset.
- Rate-limit auth endpoints per IP and per account.
- Server-side validation of every rule constraint. Parameter limits, one-team-per-person, and deadline freezes are enforced in Functions, never in client JS.
- After `frozen_at`, submissions are immutable. Enforce in SQL, not only in UI state.
- The hidden set and its labels never enter this system. See Part 0.

---

# Part 4 — Build order

1. Astro scaffold, tokens, `Base.astro`, header and footer. Deploy to Cloudflare Pages on a preview URL immediately, so every later step is verified on the real host.
2. Content modules in `src/content/`, typed.
3. `index.astro` sections in order: about, tracks, timeline, organizers, get involved.
4. Specimen wall and load sequence.
5. `register.astro`, `404.astro`, three policy pages.
6. Accessibility and performance pass. Screenshot at 375px and 1440px. Name anything that reads as a generic default and fix it.
7. Domain, DNS, `_headers`, OG image. **Ship Phase 1.**
8. Phase 2, in order: D1 migrations → auth → teams → submissions → gated docs → admin → credits → leaderboard.

## What not to do

- No warm-cream ground with a terracotta accent.
- No chopping sections into identical rounded cards with the same grey shadow.
- No all-caps eyebrows, no `→` on buttons, no middle-dot meta strings.
- No fade-and-slide-up on every section.
- No `01 / 02 / 03` markers outside the timeline.
- No collaborator logos, ever.
- No leaderboard section or "results coming soon" table until organizers publish real scores.
- No subdomain per track. ORena's `frame.` / `segment.` / `procedure.` split is an artifact of the Grand Challenge platform, not a design decision. Your three tracks are sections on one page.
- No invented dates, prizes, logos, or headshots. Where a value is missing, render the visible placeholder and leave the TODO in config.

---

# Part 4.5 — Scope of this build run

Build **Phase 1 only**. Part 3 is specification for later; do not create `/portal/` routes, D1 migrations, or auth code in this run. Configure `@astrojs/cloudflare` and leave every page statically rendered.

Two steps happen outside the editor and cannot be automated: creating the Pages project and connecting it to the repo in the Cloudflare dashboard, and running the `git tag scaffold-v0` step before the scaffold files are deleted. Everything else in Parts 0–2 is executable as written.

# Part 5 — What is still needed

## Blocking Phase 1

1. **A public build of the challenge document.** The current PDF is stamped "INTERNAL DOCUMENT, DO NOT REDISTRIBUTE" on every even page and still carries the MMBU running head. Until it exists, point `site.pdfUrl` at null and hide the download button rather than linking a missing file.
2. **Sponsor logo files.** Place them at `public/logos/` as SVG where available, named by slug: `anthropic.svg`, `gxl.svg`, `aws.svg`, `biohub.svg`, `highlanders.svg`. `sponsors.ts` references those paths. If a file is absent at build time, render the sponsor's name set in Newsreader at the same optical height as the logos — never a broken image, never an empty slot.
3. **Sponsor URLs** for each logo link.

## Resolved — build against these

- **Timeline dates:** none yet. All four phases ship with blank date slots, per Part 2.
- **Organizer presentation:** names and affiliations only, no photographs. Four people, listed in Part 2.
- **Hero tiles:** procedurally generated greyscale placeholders committed to `public/tiles/`, swapped later.
- **Contact:** `rdcunha@stanford.edu` throughout — `site.contactEmail`, the two mailto buttons in "Get involved," and the footer.
- **Sponsors:** confirmed for public listing at this tier with the monetary-support disclosure as worded.
- **Apple:** confirmed as a collaborator. Text only, like every other collaborator.
- **Policies:** challenge rules page only. Terms and privacy deferred until Phase 2 signup.
- **Compute credits:** out of scope for now. Leave the credits page out of Phase 2's first pass.

## Blocking Phase 2

5. **Registration mechanism.** Determines whether Phase 1's Register button points at an external form or waits for the portal.
6. **Terms of use and privacy policy**, reviewed at Stanford. These become blockers the moment signup opens and you begin storing names, emails, and affiliations from EU and UK participants.
7. **Whether the technical-report co-authorship offer to sponsors** needs to appear in the public terms, since it is a stated benefit tied to money.

## Worth resolving early

8. **Talk to Maximilian Rokuss.** ORena is a self-hosted Grand Challenge instance run by DKFZ, where he sits. Before building auth, teams, and submissions from scratch, find out what that deployment cost DKFZ in engineering time and whether SPeC could run on it. You may be about to rebuild something one of your four organizers already has access to.
9. **Name spelling.** The challenge document's author list reads "Maximilian Rokuss" while the sponsorship section reads "Maximillian." The site uses the author-list spelling. Confirm which is right and fix the PDF to match.
