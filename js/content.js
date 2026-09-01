/**
 * SPeC site content — single source of truth.
 *
 * Organizers: edit this file to update dates, TBD links, rules text,
 * FAQ, announcements, and the registration endpoint. Pages read from
 * window.SPEC; you should not need to hunt through HTML for rule copy.
 */
window.SPEC = {
  name: "SPeC",
  fullName: "Stanford Biomedical Perception Challenge",
  year: 2026,
  arxiv: "https://arxiv.org/abs/2606.06696",
  marvl: "https://marvl.stanford.edu/",
  contactEmail: "spec-challenge@stanford.edu",

  /**
   * Logistics not finalized in the rules draft. Marked TBD on the site.
   * Replace string values when dates/links are announced.
   */
  tbd: {
    registrationOpens: "TBD",
    registrationCloses: "TBD",
    devSetRelease: "TBD",
    submissionDeadline: "TBD",
    hiddenSetScores: "TBD",
    disputeWindow: "TBD",
    resultsAnnouncement: "TBD",
    officeHoursUrl: "",
    hardwareLimits: "TBD",
    formEndpoint: ""
  },

  announcements: [
    {
      date: "Draft",
      title: "Challenge website launched",
      body: "Tracks, scoring, and rules are posted from the current SPeC draft. Timeline dates will be announced here and emailed to registered teams."
    }
  ],

  tracks: [
    {
      id: "track-1",
      n: 1,
      short: "Track 1",
      name: "Open Frontier Performance Track",
      objective: "Best Overall Performance",
      maxSize: "None",
      keyRestriction: "Same organization must pretrain, mid-train, and post-train the model",
      description:
        "Participants are invited to push the frontier of biomedical perception by submitting their best-performing model. There are no restrictions on model size; however, models with more than 27B active parameters must be made available for evaluation through an API key.",
      sizeNotes: [
        "Maximum model size: none.",
        "Models with more than 27B active parameters must be made available for evaluation through an API key."
      ],
      restrictions: [
        "The model must be pretrained, mid-trained, and post-trained by the same organization."
      ],
      eligibility: [
        "Models below 27B active parameters must be publicly available on Hugging Face and downloadable without gating or access restrictions (Rule 1).",
        "Unless previously disclosed and agreed upon by SPeC organizers, teams must report total and active parameters and be willing to upload to Hugging Face (Rule 1).",
        "A given model checkpoint may enter only one track (Rule 2)."
      ]
    },
    {
      id: "track-2",
      n: 2,
      short: "Track 2",
      name: "Medical Domain Adaptation Track",
      objective: "Delta-based Adaptation Score",
      maxSize: "None",
      keyRestriction: "Base model not previously medically adapted by another entity",
      description:
        "Participants are invited to push the frontier of biomedical perception by submitting their best-performing model specifically adapted towards the medical domain through mid-training or post-training. There are no restrictions on model size; however, models with more than 27B active parameters must be made available for evaluation through an API key.",
      sizeNotes: [
        "Maximum model size: none.",
        "API access must be provided for models with more than 27B active parameters."
      ],
      restrictions: [
        "The base model must not have been previously adapted for medical or biomedical applications by a different entity than team members.",
        "The base model must be readily available on Hugging Face or via API under the same availability rules as Rule 1."
      ],
      eligibility: [
        "Base model performance is benchmarked independently by SPeC organizers, not self-reported by teams.",
        "In order to receive a high score in this track, the medically adapted model must exceed base model performance.",
        "A given model checkpoint may enter only one track (Rule 2)."
      ],
      callout:
        "Base model performance is benchmarked independently by SPeC organizers. Teams do not self-report Acc_base."
    },
    {
      id: "track-3",
      n: 3,
      short: "Track 3",
      name: "Domain Adaptation and Efficient Inference Track",
      objective: "Maximum perception with minimal computation",
      maxSize: "≤4B active / ≤12B total",
      keyRestriction: "Disclose active parameter count; base model not previously medically adapted by another entity",
      description:
        "Participants are invited to either pre-train or adapt a small biomedical M-LLM with ≤ 4B active parameters. This track focuses on developing parameter-efficient models that maintain strong biomedical perception performance while minimizing computational and model-size requirements. To qualify for an award in this track, participants must disclose the number of active parameters in their model.",
      sizeNotes: [
        "Maximum model size: ≤ 4B total active parameters and ≤ 12B total parameters (e.g., for MoE).",
        "Active parameter count must be disclosed to qualify for an award."
      ],
      restrictions: [
        "The model must be adapted from a base model, which must be disclosed.",
        "The base model must not have been previously adapted for medical or biomedical applications by a different entity than team members."
      ],
      eligibility: [
        "Models must be publicly available on Hugging Face and downloadable without gating or access restrictions (Rule 1).",
        "Parameter counts include all active components used at inference, including vision, language, multi-modal projection, and adapter modules (Rule 1).",
        "A given model checkpoint may enter only one track (Rule 2)."
      ]
    }
  ],

  benefits: [
    {
      id: "broad-experimentation",
      title: "Broad Experimentation",
      text: "Teams have full freedom to explore innovative training recipes, architectural designs, and optimization techniques."
    },
    {
      id: "development-set",
      title: "Development Set",
      text: "Teams will receive a portion of MMBU released publicly with answers to understand benchmark design and for local evaluation."
    },
    {
      id: "dedicated-support",
      title: "Dedicated Support",
      text: "Organizers hold 30-minute weekly office hours to answer questions, resolve ambiguities, and provide official clarifications."
    },
    {
      id: "recognition",
      title: "Recognition and Publication",
      text: "The top-performing team in each track will be invited to contribute to the SPeC technical report."
    }
  ],

  rulesIntro:
    "Our goal is to make SPeC easy to participate in and difficult to game. Participants are encouraged to experiment broadly with training data, architectures, and optimization strategies unless explicitly prohibited below. The restrictions primarily apply to hidden-test access, external information at evaluation time, model orchestration, and non-reproducible evaluation procedures. If a rule is ambiguous, teams are encouraged to ask during office hours. Clarifications affecting competition will be shared with all teams.",

  rules: [
    {
      n: 1,
      title: "Model Availability and Track Eligibility",
      text: "For the Domain Adaptation and Efficient Inference Track and all models from other tracks below 27B, models must be publicly available on Hugging Face and downloadable without gating or access restrictions. Models must satisfy the parameter limit for their selected track. Parameter counts include all active components used at inference, including vision, language, multi-modal projection, and adapter modules. For all models, unless previously disclosed and agreed upon by SPeC organizers, teams must report total and active parameters and be willing to upload to Hugging Face. For Medical Domain Adaptation Track, base model must be readily available on Hugging Face or API rules following the same rules previously specified."
    },
    {
      n: 2,
      title: "One Model per Track",
      text: "A model checkpoint may be entered into only one track. However, teams may compete in multiple tracks using distinct eligible checkpoints if registration is approved."
    },
    {
      n: 3,
      title: "Single End-to-End VLM",
      text: "The end goal of this challenge is to improve native perception capabilities of VLMs. Submissions must use a single end-to-end VLM. Ensembles, cascades, auxiliary models, external OCR, retrieval systems, learned preprocessing/postprocessing modules, or other model orchestration are prohibited."
    },
    {
      n: 4,
      title: "External Tools",
      text: "Models may not access web search, external APIs, databases, retrieval systems, calculators, code execution environments, or other external information sources during evaluation. Predictions must rely only on the submitted model and benchmark input."
    },
    {
      n: 5,
      title: "Inference Procedure",
      text: "All models will be evaluated using the official SPeC evaluation harness and organizer-specified inference settings. Each example may be processed only once. Repeated sampling, self-consistency, generation ensembling, iterative prompting, test-time adaptation, and weight modification during evaluation are prohibited."
    },
    {
      n: 6,
      title: "Training Data Disclosure and Contamination Restrictions",
      text: "Teams must disclose, to the best of their knowledge, major pretraining, continued-pretraining, fine-tuning, and synthetic-data sources, including any known overlap with datasets contributing to MMBU. Teams are strictly prohibited from intentionally training, fine-tuning, selecting checkpoints, or otherwise optimizing using SPeC/MMBU evaluation examples, labels, annotations, or derivatives. Unknown overlap inherited from third-party pretraining will be reviewed at the organizers' discretion."
    },
    {
      n: 7,
      title: "Development and Final Evaluation",
      text: "A development set will be released on Hugging Face for local evaluation. Final rankings will use a separate hidden evaluation set and metrics described below. Our evaluation prompt will ask for a json schema formatted answer with our criteria. Models will be run with BF16 or FP16 precision. Before the submission deadline, each team must designate and upload one frozen final model per track; failure to do so will result in no final score. Hidden-set scores will be released only after final submissions close."
    },
    {
      n: 8,
      title: "Scoring and Compute",
      text: "Final rankings will use the official SPeC metric for each track. Missing, refused, malformed, or unparsable predictions receive no credit for the affected example. Submissions must also satisfy organizer-specified hardware, memory, runtime, and inference constraints."
    },
    {
      n: 9,
      title: "Failures and Reproducibility",
      text: "Organizer-side infrastructure failures may be rerun at the organizers' discretion. Participant-side failures, including incompatible code, model-loading errors, out-of-memory errors, malformed outputs, or compute-limit violations, do not automatically qualify for reruns. Top-performing teams may be required to provide model revisions, inference code, prompts/templates, dependencies, and hardware requirements sufficient to reproduce their results. Non-reproducible submissions may be removed from the final ranking."
    },
    {
      n: 10,
      title: "Tie Breaking",
      text: "In the case of a tie in a given track, the model with the highest final answer performance, T, will be the winner."
    },
    {
      n: 11,
      title: "Team Eligibility",
      text: "Teams must apply and be accepted before participating. Each participant may belong to only one competing team unless approved by the organizers. Team membership must be finalized by the registration deadline. Individuals with access to hidden evaluation labels or other non-public information providing a competitive advantage are ineligible for official ranking or awards."
    },
    {
      n: 12,
      title: "Official Communications and Rule Changes",
      text: "Official clarifications and material rule changes will be communicated to all registered teams. The organizers may amend rules when necessary to address ambiguity, evaluation errors, security concerns, or unforeseen circumstances."
    },
    {
      n: 13,
      title: "Evaluation Integrity",
      callout: true,
      text: "Participants must not attempt to infer, extract, reconstruct, or otherwise exploit information about the hidden test set or evaluation procedure. Prohibited activities include, but are not limited to, test-set discovery, prompt injection, evaluator exploitation, and metric exploitation. Any such attempt by an individual participant or member of a team will result in the automatic disqualification of the entire team and all of its submissions."
    },
    {
      n: 14,
      title: "Anti-Collusion",
      callout: true,
      text: "Participants must not share non-public information relevant to the challenge, including dev-set analysis beyond public leaderboard results or coordinated submission timing or strategy, with members of another registered team."
    }
  ],

  rulesClosing:
    "The organizers reserve the right to verify submissions and disqualify teams that violate these rules, exploit evaluation-set leakage, LLM judging, misrepresent their system, exceed challenge restrictions, or submit results that cannot be reproduced.",

  timeline: [
    {
      id: "reg-opens",
      title: "Registration opens",
      dateKey: "registrationOpens",
      note: "Teams apply via the Register page. Acceptance is required before participating (Rule 11)."
    },
    {
      id: "dev-set",
      title: "Development set release",
      dateKey: "devSetRelease",
      note: "A development set will be released on Hugging Face for local evaluation (Rule 7)."
    },
    {
      id: "reg-closes",
      title: "Registration closes",
      dateKey: "registrationCloses",
      note: "Team membership must be finalized by the registration deadline (Rule 11)."
    },
    {
      id: "submission",
      title: "Submission deadline",
      dateKey: "submissionDeadline",
      note: "Each team must designate and upload one frozen final model per track; failure to do so will result in no final score (Rule 7)."
    },
    {
      id: "hidden-scores",
      title: "Hidden-set scores released",
      dateKey: "hiddenSetScores",
      note: "Hidden-set scores will be released only after final submissions close (Rule 7)."
    },
    {
      id: "dispute",
      title: "Dispute window",
      dateKey: "disputeWindow",
      note: "If organizers add a dispute window, it will be announced here and emailed to registered teams."
    },
    {
      id: "results",
      title: "Results and awards announced",
      dateKey: "resultsAnnouncement",
      note: "Top-performing teams in each track will be invited to contribute to the SPeC technical report."
    }
  ],

  faq: [
    {
      id: "dev-set-train",
      q: "Can I use the public development set to train?",
      a: "The public development set is released so teams can understand benchmark design and run local evaluation. Rule 6 prohibits intentionally training, fine-tuning, selecting checkpoints, or otherwise optimizing using SPeC/MMBU evaluation examples, labels, annotations, or derivatives. If you are unsure whether a use is allowed, ask during office hours; clarifications affecting competition will be shared with all teams."
    },
    {
      id: "malformed",
      q: "What happens if my model output is malformed?",
      a: "Missing, refused, malformed, or unparsable predictions receive no credit for the affected example (Rule 8). Participant-side failures — including incompatible code, model-loading errors, out-of-memory errors, malformed outputs, or compute-limit violations — do not automatically qualify for reruns (Rule 9)."
    },
    {
      id: "track2-base",
      q: "How is the base model evaluated in Track 2?",
      a: "Base model performance is benchmarked by SPeC organizers, not self-reported by teams. The Medical Domain Adaptation Score multiplies the weighted task/context score by (Acc_med − Acc_base). To receive a high score, the medically adapted model must exceed base model performance. The base model must not have been previously adapted for medical or biomedical applications by a different entity than team members, and must be available on Hugging Face or via API under Rule 1."
    },
    {
      id: "orchestration",
      q: "What counts as model orchestration?",
      a: "Rule 3 requires a single end-to-end VLM. Ensembles, cascades, auxiliary models, external OCR, retrieval systems, learned preprocessing/postprocessing modules, or other model orchestration are prohibited. Rule 4 separately bars web search, external APIs, databases, retrieval systems, calculators, code execution, and other external information sources at evaluation time."
    },
    {
      id: "one-track",
      q: "Can a team enter more than one track?",
      a: "Yes, using distinct eligible checkpoints. A given model checkpoint may be entered into only one track (Rule 2). Register the track(s) you intend to enter; checkpoints are assigned at submission time under the one-checkpoint-per-track rule."
    },
    {
      id: "one-team",
      q: "Can I be on more than one team?",
      a: "Each participant may belong to only one competing team unless approved by the organizers. Team membership must be finalized by the registration deadline (Rule 11)."
    },
    {
      id: "params",
      q: "What is included in the parameter count?",
      a: "Parameter counts include all active components used at inference, including vision, language, multi-modal projection, and adapter modules (Rule 1). Track 3 additionally requires ≤ 4B active parameters and ≤ 12B total parameters (e.g., MoE), and disclosure of active parameter count to qualify for an award."
    },
    {
      id: "office-hours",
      q: "How do office hours work?",
      a: "Organizers hold 30-minute weekly office hours to answer questions, resolve ambiguities, and provide official clarifications. If a rule is ambiguous, ask there. Clarifications affecting competition will be shared with all teams. A calendar or signup link will be posted here when available."
    },
    {
      id: "leaderboard",
      q: "When will the leaderboard go live?",
      a: "There is no live leaderboard during development. Hidden-set scores will be released only after final submissions close (Rule 7). A public leaderboard will be added to this site after that evaluation period."
    },
    {
      id: "conflicts",
      q: "Who is ineligible because of non-public information?",
      a: "Individuals with access to hidden evaluation labels or other non-public information providing a competitive advantage are ineligible for official ranking or awards (Rule 11). Disclose any such access on the registration form. Only organizers have access to the held-out private MMBU set."
    }
  ],

  sponsors: [
    {
      id: "anthropic",
      name: "Anthropic",
      url: "https://www.anthropic.com/",
      logo: "assets/logos/anthropic.svg",
      logoClass: "logo-mark",
      blurb: "Monetary sponsor. Formally recognized in the SPeC technical report; sponsors may co-author and may attend office hours."
    },
    {
      id: "gxl",
      name: "GXL",
      url: "https://gxl.ai/",
      logo: "assets/logos/gxl.svg",
      logoClass: "logo-wordmark",
      blurb: "Monetary sponsor. Generative Expert Labs (Palo Alto). Formally recognized in the SPeC technical report; sponsors may co-author and may attend office hours."
    },
    {
      id: "aws",
      name: "AWS",
      url: "https://aws.amazon.com/",
      logo: "assets/logos/aws.svg",
      logoClass: "logo-wide",
      blurb: "Monetary sponsor. Formally recognized in the SPeC technical report; sponsors may co-author and may attend office hours."
    },
    {
      id: "biohub",
      name: "Biohub",
      url: "https://www.czbiohub.org/",
      logo: "assets/logos/biohub.svg",
      logoClass: "logo-wide",
      blurb: "Monetary sponsor. Formally recognized in the SPeC technical report; sponsors may co-author and may attend office hours."
    },
    {
      id: "highlanders",
      name: "Highlanders",
      url: "",
      logo: "assets/logos/highlanders.svg",
      logoClass: "logo-wordmark",
      blurb: "Monetary sponsor. Formally recognized in the SPeC technical report; sponsors may co-author and may attend office hours."
    }
  ],

  collaborators: {
    academic: [
      "Stanford University",
      "University of Cambridge",
      "University of Washington",
      "University of Texas MD Anderson Cancer Center"
    ],
    industry: ["Microsoft AI", "Google DeepMind", "OpenAI"]
  },

  organizers: {
    lab: "Stanford Medical AI and Computer Vision Lab (Stanford MARVL)",
    pi: "Dr. Serena Yeung-Levy",
    piRole:
      "Assistant Professor of Biomedical Data Science and, by courtesy, of Computer Science and of Electrical Engineering at Stanford University",
    primary: ["Ryan D'Cunha", "Alejandro Lozano", "Akira Nishii", "Maximilian Rokuss"],
    authors: [
      { name: "Ryan D'Cunha", aff: "Stanford University; GXL" },
      { name: "Alejandro Lozano", aff: "Stanford University" },
      { name: "Akira Nishii", aff: "Stanford University; GXL" },
      { name: "Darshan Kalola", aff: "Anthropic" },
      { name: "Min Woo Sun", aff: "Stanford University; Google DeepMind" },
      { name: "Jeya Maria Jose V.", aff: "Microsoft AI" },
      { name: "MingYu Lu", aff: "University of Washington" },
      { name: "Cliff Wong", aff: "Microsoft AI" },
      { name: "Xiaoxiao Sun", aff: "Stanford University" },
      { name: "Ryan Poplin", aff: "Apple" },
      { name: "Josiah Aklilu", aff: "Google DeepMind" },
      { name: "Maximilian Rokuss", aff: "University of Heidelberg" },
      { name: "Anas Zafar", aff: "The University of Texas MD Anderson Cancer Center" },
      { name: "Yuhui Zhang", aff: "Stanford University" },
      { name: "Paola Avila Robayo", aff: "Stanford University" },
      { name: "Fiona Cai", aff: "Stanford University" },
      { name: "Serena Yeung-Levy", aff: "Stanford University" }
    ]
  },

  fig1: {
    n: 500,
    caption:
      "Fig. 1: Frontier models exhibit shortcut learning on biomedical VQA. Analysis of a 500-question subset of MMBU reveals that, while models in the GPT-5.6 family frequently arrive at the correct answer, they fail to identify foundational image metadata (e.g., modality, submodality, and body part). This high rate of “shortcut learning” (Meta ×, Ans ✓) suggests a reliance on language priors or spurious correlations rather than robust visual perception.",
    models: [
      { name: "Opus-5", robust: 21, shortcut: 30, reasoning: 23, fail: 26 },
      { name: "Sonnet-5", robust: 14, shortcut: 26, reasoning: 24, fail: 35 },
      { name: "GPT-5.6-Terra", robust: 21, shortcut: 58, reasoning: 7, fail: 14 },
      { name: "GPT-5.6-Sol", robust: 20, shortcut: 59, reasoning: 5, fail: 16 }
    ],
    example: {
      model: "GPT-5.6-Sol",
      predicted: {
        domain: "radiology",
        modality: "ultrasound",
        submodality: "B-mode ultrasound",
        bodyPart: "liver",
        answer: "B) normal"
      },
      correct: {
        domain: "Ophthalmology",
        modality: "optical imaging",
        submodality: "Optical Coherence Tomography Angiography",
        bodyPart: "eye",
        answer: "B) normal"
      }
    }
  }
};
