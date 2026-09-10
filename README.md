# MMBU Challenge

Exact copy of the [MMBU Challenge site](https://akiranishii.github.io/mmbu-challenge/). The website lives in `site/`.

QR codes stay valid on both existing hosts:

- Cloudflare: **https://spec-challenge.rdcunha.workers.dev** (root URL, no path prefix)
- GitHub Pages: **https://dcunhrya.github.io/SPeC/**

## Run locally

```sh
cd site
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3005
```

Open the local URL printed in the terminal (normally http://127.0.0.1:3005). Keep the terminal running while using the website. If the port is occupied, the development server chooses the next available port.

## Build

```sh
cd site
npm run build
```

## GitHub Pages

The published tree is `docs/` on `main`, with base path `/SPeC`, so **https://dcunhrya.github.io/SPeC/** stays valid. GitHub Pages must use branch `main` and folder `/docs`. `docs/.nojekyll` is required so GitHub does not ignore the `_next` assets.

Rebuild that folder after site changes:

```sh
npm run build:docs
```

To verify the export from `site/`:

```sh
NEXT_PUBLIC_SITE_URL=https://dcunhrya.github.io/SPeC \
NEXT_PUBLIC_BASE_PATH=/SPeC npm run build:pages

NEXT_PUBLIC_SITE_URL=https://dcunhrya.github.io/SPeC \
NEXT_PUBLIC_BASE_PATH=/SPeC node scripts/verify-pages.mjs
```

Local development continues to use URLs rooted at `/`.

## Cloudflare

The Worker name stays `spec-challenge`, so **https://spec-challenge.rdcunha.workers.dev** does not change. Cloudflare builds with an empty base path.

```sh
npm run build
npx wrangler deploy
```

Requires Node 22 (`NODE_VERSION=22`). Production branch: `main`.

## Content and assets

- `site/lib/content.json`: original overview, tracks, sponsors, and FAQ wording.
- `site/lib/original-source.html`: snapshot of the supplied MMBU website, retrieved September 8, 2026.
- `site/public/Challenge.pdf`: original challenge brief.
- `site/public/assets/figure-2.jpg`: original task figure.
- `site/public/assets/mmbu-logo-updated.png`: supplied `logo_updated.png`, unchanged.
- `site/public/assets/sponsors/`: all five supplied sponsor logos, unchanged. Their display frames omit empty image margins with CSS.

The hero displays the 2380 × 2380 `logo_updated.png` across the entire banner behind the title and application buttons. CSS `object-fit: cover` preserves the image's proportions while cropping its edges to fill the banner. A gradual green overlay fades the artwork behind the text and along the bottom, with a stronger overlay on mobile for readability.

The original application email, paper, MARVL, contact, and brief links are preserved.
