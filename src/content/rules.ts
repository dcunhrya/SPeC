export type Rule = {
  n: number;
  title: string;
  text: string;
  callout?: boolean;
};

export const rulesMeta = {
  version: 'v1.0',
  lastAmended: '31 August 2026',
  intro:
    'Our goal is to make SPeC easy to participate in and difficult to game. Participants are encouraged to experiment broadly with training data, architectures, and optimization strategies unless explicitly prohibited below. The restrictions primarily apply to hidden-test access, external information at evaluation time, model orchestration, and non-reproducible evaluation procedures. If a rule is ambiguous, teams are encouraged to ask during office hours. Clarifications affecting competition will be shared with all teams.',
  closing:
    'The organizers reserve the right to verify submissions and disqualify teams that violate these rules, exploit evaluation-set leakage, LLM judging, misrepresent their system, exceed challenge restrictions, or submit results that cannot be reproduced.',
};

export const rules: Rule[] = [
  {
    n: 1,
    title: 'Model availability and track eligibility',
    text: 'For the Domain Adaptation and Efficient Inference Track and all models from other tracks below 27B, models must be publicly available on Hugging Face and downloadable without gating or access restrictions. Models must satisfy the parameter limit for their selected track. Parameter counts include all active components used at inference, including vision, language, multi-modal projection, and adapter modules. For all models, unless previously disclosed and agreed upon by SPeC organizers, teams must report total and active parameters and be willing to upload to Hugging Face. For Medical Domain Adaptation Track, base model must be readily available on Hugging Face or API rules following the same rules previously specified.',
  },
  {
    n: 2,
    title: 'One model per track',
    text: 'A model checkpoint may be entered into only one track. However, teams may compete in multiple tracks using distinct eligible checkpoints if registration is approved.',
  },
  {
    n: 3,
    title: 'Single end-to-end VLM',
    text: 'The end goal of this challenge is to improve native perception capabilities of VLMs. Submissions must use a single end-to-end VLM. Ensembles, cascades, auxiliary models, external OCR, retrieval systems, learned preprocessing/postprocessing modules, or other model orchestration are prohibited.',
  },
  {
    n: 4,
    title: 'External tools',
    text: 'Models may not access web search, external APIs, databases, retrieval systems, calculators, code execution environments, or other external information sources during evaluation. Predictions must rely only on the submitted model and benchmark input.',
  },
  {
    n: 5,
    title: 'Inference procedure',
    text: 'All models will be evaluated using the official SPeC evaluation harness and organizer-specified inference settings. Each example may be processed only once. Repeated sampling, self-consistency, generation ensembling, iterative prompting, test-time adaptation, and weight modification during evaluation are prohibited.',
  },
  {
    n: 6,
    title: 'Training data disclosure and contamination restrictions',
    text: 'Teams must disclose, to the best of their knowledge, major pretraining, continued-pretraining, fine-tuning, and synthetic-data sources, including any known overlap with datasets contributing to MMBU. Teams are strictly prohibited from intentionally training, fine-tuning, selecting checkpoints, or otherwise optimizing using SPeC/MMBU evaluation examples, labels, annotations, or derivatives. Unknown overlap inherited from third-party pretraining will be reviewed at the organizers\' discretion.',
  },
  {
    n: 7,
    title: 'Development and final evaluation',
    text: 'A development set will be released on Hugging Face for local evaluation. Final rankings will use a separate hidden evaluation set and metrics described below. Our evaluation prompt will ask for a json schema formatted answer with our criteria. Models will be run with BF16 or FP16 precision. Before the submission deadline, each team must designate and upload one frozen final model per track; failure to do so will result in no final score. Hidden-set scores will be released only after final submissions close.',
  },
  {
    n: 8,
    title: 'Scoring and compute',
    text: 'Final rankings will use the official SPeC metric for each track. Missing, refused, malformed, or unparsable predictions receive no credit for the affected example. Submissions must also satisfy organizer-specified hardware, memory, runtime, and inference constraints.',
  },
  {
    n: 9,
    title: 'Failures and reproducibility',
    text: 'Organizer-side infrastructure failures may be rerun at the organizers\' discretion. Participant-side failures, including incompatible code, model-loading errors, out-of-memory errors, malformed outputs, or compute-limit violations, do not automatically qualify for reruns. Top-performing teams may be required to provide model revisions, inference code, prompts/templates, dependencies, and hardware requirements sufficient to reproduce their results. Non-reproducible submissions may be removed from the final ranking.',
  },
  {
    n: 10,
    title: 'Tie breaking',
    text: 'In the case of a tie in a given track, the model with the highest final answer performance, T, will be the winner.',
  },
  {
    n: 11,
    title: 'Team eligibility',
    text: 'Teams must apply and be accepted before participating. Each participant may belong to only one competing team unless approved by the organizers. Team membership must be finalized by the registration deadline. Individuals with access to hidden evaluation labels or other non-public information providing a competitive advantage are ineligible for official ranking or awards.',
  },
  {
    n: 12,
    title: 'Official communications and rule changes',
    text: 'Official clarifications and material rule changes will be communicated to all registered teams. The organizers may amend rules when necessary to address ambiguity, evaluation errors, security concerns, or unforeseen circumstances.',
  },
  {
    n: 13,
    title: 'Evaluation integrity',
    callout: true,
    text: 'Participants must not attempt to infer, extract, reconstruct, or otherwise exploit information about the hidden test set or evaluation procedure. Prohibited activities include, but are not limited to, test-set discovery, prompt injection, evaluator exploitation, and metric exploitation. Any such attempt by an individual participant or member of a team will result in the automatic disqualification of the entire team and all of its submissions.',
  },
  {
    n: 14,
    title: 'Anti-collusion',
    callout: true,
    text: 'Participants must not share non-public information relevant to the challenge, including dev-set analysis beyond public leaderboard results or coordinated submission timing or strategy, with members of another registered team.',
  },
];
