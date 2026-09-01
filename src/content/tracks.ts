export type Chip = {
  label: string;
  value: string;
};

export type Track = {
  n: number;
  title: string;
  objective: string;
  description: string;
  chips: Chip[];
  formula: string;
  formulaNote?: string;
};

export const tracks: Track[] = [
  {
    n: 1,
    title: 'Open frontier performance',
    objective: 'Best overall performance',
    description:
      'Submit your best-performing model. There is no size limit. Models with more than 27B active parameters must be reachable through an API key. The same organization must pretrain, mid-train, and post-train the model.',
    chips: [
      { label: 'Max size', value: 'none' },
      { label: 'Same org', value: 'pretrain to post-train' },
      { label: 'Above 27B active', value: 'API key required' },
    ],
    formula: String.raw`S_{\mathrm{Frontier}} = 0.8\,T + 0.2\,C`,
  },
  {
    n: 2,
    title: 'Medical domain adaptation',
    objective: 'Delta-based adaptation score',
    description:
      'Submit a model adapted toward the medical domain from a disclosed base model. There is no size limit; API access is required above 27B active parameters. The base model must not have been previously adapted for medical or biomedical applications by a different entity than the team. Base-model performance is benchmarked by SPeC organizers, not self-reported.',
    chips: [
      { label: 'Max size', value: 'none' },
      { label: 'Above 27B active', value: 'API key required' },
      { label: 'Base model', value: 'disclosed; not previously medically adapted by another entity' },
    ],
    formula: String.raw`S_{\mathrm{Adapt}} = (0.8\,T + 0.2\,C) \times (\mathrm{Acc}_{\mathrm{med}} - \mathrm{Acc}_{\mathrm{base}})`,
  },
  {
    n: 3,
    title: 'Domain adaptation and efficient inference',
    objective: 'Maximum perception at minimum compute',
    description:
      'Submit a model with at most 4B active parameters and 12B total parameters (for example MoE), adapted from a disclosed base model. The base model must not have been previously adapted for medical or biomedical applications by a different entity than the team. Active parameter count must be disclosed to qualify for an award.',
    chips: [
      { label: 'Max size', value: '4B active / 12B total' },
      { label: 'Base model', value: 'disclosed; not previously medically adapted by another entity' },
      { label: 'Award eligibility', value: 'disclose active parameter count' },
    ],
    formula: String.raw`S_{\mathrm{Efficient}} = (0.8\,T + 0.2\,C)\left(\frac{P_{\max}}{P}\right)^{\alpha}`,
    formulaNote:
      'The Efficient track formula uses the same weighted task and context scores, then scales by an efficiency term. P is the submitted model’s active parameter count. P_max is the maximum active parameter count permitted in this track (4B). Alpha controls the strength of the efficiency bonus. Its value will be fixed and announced before the development phase.',
  },
];

export const scoringBlurb = {
  t: 'T is the mean judge-assigned answer score.',
  c: 'C is mean per-example metadata accuracy, normalized within each example so examples with more annotated fields do not carry more weight. Fields are modality, submodality, specimen, body part, stain, and medical domain.',
  judge:
    'Sonnet-5 is the judge. Organizers reserve the right to switch to Gemma 4 or Qwen3.5.',
  rulesHref: '/policies/rules#scoring',
};
