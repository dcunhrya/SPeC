# SPeC — Stanford Biomedical Perception Challenge

Public site for **SPeC**, a research competition organized by [Stanford MARVL](https://marvl.stanford.edu/) under Dr. Serena Yeung-Levy, evaluated on the [MMBU benchmark](https://arxiv.org/abs/2606.06696).

The previous GitHub Pages URL (`https://dcunhrya.github.io/SPeC/`) remains up until Cloudflare is verified. After that cutover, those paths redirect here.

Canonical host: **https://spec-challenge.pages.dev** (set once in `src/content/site.ts` as `site.baseUrl`).

## Local development

Requires Node 22 (see `.nvmrc`). Cloudflare Pages should set `NODE_VERSION=22`.

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

Content lives in `src/content/*.ts`. Pages map over those objects.

## Deploy

Phase 1 is a static Astro build. Cloudflare uploads `dist` as Worker assets (`wrangler.toml`).

1. Create a project named `spec-challenge`, connected to this repo.
2. Build command: `npm run build`
3. Deploy command: leave the default (`npx wrangler deploy`)
4. Environment: `NODE_VERSION=22`
5. Production branch: `main`

`.dev.vars.example` is a stub for Phase 2 secrets. There is no adapter, D1, or Functions in this phase.

## Notes

- The hidden MMBU evaluation set never belongs in this repo or on Cloudflare.
- `site.pdfUrl` is null until a public challenge document exists; the download control stays hidden.
- Collaborators are text only. Do not add logos.
- Sponsor logos sit in `public/logos/`. If a file is missing at runtime, the name is shown instead.
- Hero tiles in `public/tiles/` are placeholders. Replace `tile-live.svg` first, then `tile-01.svg`–`tile-16.svg`, with licensed imagery.
