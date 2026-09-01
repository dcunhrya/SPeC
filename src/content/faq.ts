export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    id: 'dev-set-train',
    q: 'Can I use the public development set to train?',
    a: 'The public development set is released so teams can understand benchmark design and run local evaluation. Rule 6 prohibits intentionally training, fine-tuning, selecting checkpoints, or otherwise optimizing using SPeC/MMBU evaluation examples, labels, annotations, or derivatives. If you are unsure whether a use is allowed, ask during office hours; clarifications affecting competition will be shared with all teams.',
  },
  {
    id: 'malformed',
    q: 'What happens if my model output is malformed?',
    a: 'Missing, refused, malformed, or unparsable predictions receive no credit for the affected example (Rule 8). Participant-side failures — including incompatible code, model-loading errors, out-of-memory errors, malformed outputs, or compute-limit violations — do not automatically qualify for reruns (Rule 9).',
  },
  {
    id: 'track2-base',
    q: 'How is the base model evaluated in Track 2?',
    a: 'Base model performance is benchmarked by SPeC organizers, not self-reported by teams. The Medical Domain Adaptation Score multiplies the weighted task/context score by (Acc_med − Acc_base). To receive a high score, the medically adapted model must exceed base model performance. The base model must not have been previously adapted for medical or biomedical applications by a different entity than team members, and must be available on Hugging Face or via API under Rule 1.',
  },
  {
    id: 'orchestration',
    q: 'What counts as model orchestration?',
    a: 'Rule 3 requires a single end-to-end VLM. Ensembles, cascades, auxiliary models, external OCR, retrieval systems, learned preprocessing/postprocessing modules, or other model orchestration are prohibited. Rule 4 separately bars web search, external APIs, databases, retrieval systems, calculators, code execution, and other external information sources at evaluation time.',
  },
  {
    id: 'one-track',
    q: 'Can a team enter more than one track?',
    a: 'Yes, using distinct eligible checkpoints. A given model checkpoint may be entered into only one track (Rule 2). Register the track(s) you intend to enter; checkpoints are assigned at submission time under the one-checkpoint-per-track rule.',
  },
  {
    id: 'one-team',
    q: 'Can I be on more than one team?',
    a: 'Each participant may belong to only one competing team unless approved by the organizers. Team membership must be finalized by the registration deadline (Rule 11).',
  },
  {
    id: 'params',
    q: 'What is included in the parameter count?',
    a: 'Parameter counts include all active components used at inference, including vision, language, multi-modal projection, and adapter modules (Rule 1). Track 3 additionally requires at most 4B active parameters and 12B total parameters (for example MoE), and disclosure of active parameter count to qualify for an award.',
  },
  {
    id: 'office-hours',
    q: 'How do office hours work?',
    a: 'Organizers hold 30-minute weekly office hours to answer questions, resolve ambiguities, and provide official clarifications. If a rule is ambiguous, ask there. Clarifications affecting competition will be shared with all teams. A calendar or signup link will be posted here when available.',
  },
  {
    id: 'leaderboard',
    q: 'When will the leaderboard go live?',
    a: 'There is no live leaderboard during development. Hidden-set scores will be released only after final submissions close (Rule 7). A public leaderboard will be added to this site after that evaluation period.',
  },
  {
    id: 'conflicts',
    q: 'Who is ineligible because of non-public information?',
    a: 'Individuals with access to hidden evaluation labels or other non-public information providing a competitive advantage are ineligible for official ranking or awards (Rule 11). Disclose any such access when you register. Only organizers have access to the held-out private MMBU set.',
  },
];
