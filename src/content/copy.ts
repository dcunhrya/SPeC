export const about = {
  paragraphs: [
    'Healthcare imaging already runs at a scale that no human workforce can read end to end: roughly 700 million imaging exams and an estimated 6.4 billion pathology slides each year. Electron microscopy and spatial imaging push further into petabytes. Most of that data is stored and never analyzed.',
    'Models need two things: accurate visual recognition, and reasoning over that recognition with prior knowledge. Recent work has pushed reasoning. The evidence says perception is now the binding constraint.',
    'SPeC evaluates and advances perception across modalities, biological scales, anatomical regions, and clinical contexts, on a shared benchmark with a public development set and a hidden evaluation set. The top-performing team in each track will be invited to contribute to the SPeC technical report.',
  ],
  metadataWhy: {
    title: 'Why metadata is scored',
    bullets: [
      'Incomplete DICOM headers during report generation.',
      'Metadata stripped by de-identification when datasets pool across sites.',
      'Literature figure mining where accompanying text is sparse.',
    ],
  },
};

export const involved = {
  sponsor: {
    title: 'Sponsor SPeC',
    body: 'Monetary support. Recognition in the technical report, optional co-authorship, logo placement on this site and at the award ceremony, optional office-hour attendance for direct participant feedback on sponsor tooling.',
    subject: 'SPeC sponsorship inquiry',
    cta: 'Email about sponsorship',
  },
  collaborate: {
    title: 'Collaborate',
    body: 'No monetary support. Feedback on rules, metrics, and track design; dataset contributions; outreach. Recognition in the technical report as authors or in acknowledgments, based on contribution.',
    subject: 'SPeC collaboration inquiry',
    cta: 'Email about collaboration',
  },
};
