/**
 * Hard boundary: the hidden MMBU evaluation set, its labels, and its
 * derivatives never exist in this repo, in R2, in D1, or on any host
 * reachable from the web application. Only organizers hold that data,
 * on separate infrastructure. Nothing in Phase 2 may weaken this.
 *
 * Hero tiles in public/tiles/:
 *   Replace tile-01.svg … tile-16.svg with licensed biomedical imagery.
 *   Replace tile-live.svg FIRST — it is the live metadata tile. Do not
 *   fabricate a micrograph; use licensed imagery. The file is abstract
 *   cell-like structure on purpose so the metadata card does not claim
 *   a specific scan that is not in the image.
 */

export const site = {
  name: 'SPeC',
  fullName: 'The Stanford Biomedical Perception Challenge',
  year: 2026,
  baseUrl: 'https://spec-challenge.rdcunha.workers.dev',
  contactEmail: 'rdcunha@stanford.edu',
  registerUrl: '/register',
  pdfUrl: null as string | null,
  mmbuUrl: 'https://arxiv.org/abs/2606.06696',
  mmbuArxiv: '2606.06696',
  marvlUrl: 'https://marvl.stanford.edu/',
  registrationDeadline: null as string | null,
  hardwareLimits: null as string | null,
  description:
    'SPeC measures biomedical visual perception in multimodal models on a shared MMBU benchmark: three tracks, a public development set, and a hidden evaluation set.',
  features: {
    portal: false,
  },
  heroTiles: [
    '/tiles/tile-01.svg',
    '/tiles/tile-02.svg',
    '/tiles/tile-03.svg',
    '/tiles/tile-04.svg',
    '/tiles/tile-05.svg',
    '/tiles/tile-06.svg',
    '/tiles/tile-07.svg',
    '/tiles/tile-08.svg',
    '/tiles/tile-09.svg',
    '/tiles/tile-10.svg',
    '/tiles/tile-11.svg',
    '/tiles/tile-12.svg',
    '/tiles/tile-13.svg',
    '/tiles/tile-14.svg',
    '/tiles/tile-15.svg',
    '/tiles/tile-16.svg',
  ],
  liveTile: '/tiles/tile-live.svg',
  liveExample: {
    predicted: {
      modality: 'CT',
      domain: 'radiology',
    },
    truth: {
      modality: 'light microscopy',
      domain: 'biology',
    },
  },
} as const;

export type Site = typeof site;
