export const scoring = {
  why: [
    'As shown by shortcut learning, models can arrive at a correct downstream answer without comprehending the foundational visual elements of the image. Overcoming this perception bottleneck requires models to ground analysis in modality, biological scale, and anatomical context.',
    'Enforcing intrinsic context understanding is also required for real-world generalization, where explicit metadata may be corrupted or absent.',
  ],
  settings: [
    {
      title: 'Clinical workflow automation',
      text: 'Radiologists must visually verify and document specific anatomical regions, views, and modalities during report generation, particularly when DICOM headers are incomplete.',
    },
    {
      title: 'Data interoperability',
      text: 'Aggregating cross-hospital or cross-institutional datasets routinely results in the stripping or loss of standardized metadata due to privacy scrubbing (for example de-identification) or incompatible storage systems.',
    },
    {
      title: 'Scientific discovery',
      text: 'Mining multimodal biomedical literature for novel insights requires models to intrinsically deduce the experimental context, assay type, and biological scale directly from figures where accompanying text may be sparse.',
    },
  ],
  judge:
    'An LLM judge determines semantic equivalence between the predicted and reference answers and evaluates the structured metadata fields returned by the model. Different judges were evaluated for this purpose and replicated the same performance; no bias was introduced by the choice of judge. Sonnet-5 is the chosen LLM judge for challenge scoring. Organizers retain the right to switch to a Gemma 4 or Qwen3.5 judge.',
  taskScore: {
    prose:
      'For each example i, the judge assigns an answer score a_i in [0, 1] based on whether the predicted answer is semantically equivalent to the reference answer. The overall Task Score T is the average answer score across all N examples.',
    formula: String.raw`T = \frac{1}{N} \sum_{i=1}^{N} a_i`,
    detection:
      'For object detection, the VLM must output a bounding box formatted [x, y, width, height] (specified in the prompt) and obtain an IoU of at least 0.5 to be counted as correct. Missing, refused, malformed, or unparsable predictions receive no credit for the affected example (Rule 8).',
  },
  contextScore: {
    prose:
      'Each example may contain a subset of six metadata fields: modality, submodality, specimen, body part, stain, and medical domain. Per-example scores are normalized by the number of annotated fields on that example, so examples with more metadata do not receive greater weight simply because they contain more annotations.',
    z: String.raw`z_{ik} =
\begin{cases}
  1, & \text{if metadata field } k \text{ is annotated for example } i, \\
  0, & \text{otherwise.}
\end{cases}`,
    ci: String.raw`c_i = \frac{\sum_{k} z_{ik} m_{ik}}{\sum_{k} z_{ik}}`,
    c: String.raw`C = \frac{1}{N} \sum_{i=1}^{N} c_i`,
  },
  frontier: {
    prose:
      'The Frontier score is the weighted arithmetic mean of task performance and biomedical context understanding. Task performance receives the majority of the weight, while the context score rewards models that correctly recognize the biomedical setting underlying their predictions. The arithmetic mean also prevents very poor performance on either component from being fully compensated for by strong performance on the other.',
    formula: String.raw`S_{\mathrm{Frontier}} = 0.8\,T + 0.2\,C`,
  },
  adapt: {
    prose:
      'The medically adapted score is the same weighted mean, scaled by the performance improvement of the adapted model compared to its base counterpart. This emphasizes the efficacy of domain-specific medical fine-tuning rather than ranking a strong base architecture alone. In order to receive a high score in this track, the medically adapted model must exceed base model performance. Base model performance will be benchmarked by SPeC organizers, not self-reported by teams.',
    formula: String.raw`S_{\mathrm{Adapt}} = (0.8\,T + 0.2\,C) \times (\mathrm{Acc}_{\mathrm{med}} - \mathrm{Acc}_{\mathrm{base}})`,
  },
  efficient: {
    prose:
      'The Efficient track score additionally rewards strong performance from smaller models. P is the submitted model’s active parameter count, P_max is the maximum parameter count permitted in the Efficient track (4B active parameters), and alpha controls the strength of the efficiency bonus. Alpha’s value will be fixed and announced before the development phase so that model quality remains the dominant factor while still providing a meaningful advantage to models that achieve comparable performance with fewer parameters.',
    formula: String.raw`S_{\mathrm{Efficient}} = (0.8\,T + 0.2\,C)\left(\frac{P_{\max}}{P}\right)^{\alpha}`,
  },
  benchmark: {
    prose:
      'The Massive Multimodal Biomedical Understanding (MMBU) benchmark serves as the evaluation framework. Tasks are posed in both open and closed VQA formats across four task types. Models are asked to evaluate metadata at different levels of perception and to return the final answer with a rationale in JSON. The evaluation prompt requests a JSON-schema-formatted answer. Models are run at BF16 or FP16 precision (Rule 7). The public development set has open- and closed-ended VQA; the hidden evaluation set is open-ended only.',
    tasks: [
      {
        term: 'Ungrounded classification',
        definition:
          'Identifying broad pathologies, clinical conditions, or broad information from the global image context. The LLM judge evaluates semantic equivalence between the predicted answer and the ground truth.',
      },
      {
        term: 'Fine-grained classification from segmentation',
        definition:
          'Classifying specific abnormalities or anatomical features using segmentation masks for precise visual grounding. The LLM judge evaluates semantic equivalence.',
      },
      {
        term: 'Fine-grained classification from detection',
        definition:
          'Categorizing localized clinical findings derived from object-detection bounding boxes. The LLM judge evaluates semantic equivalence.',
      },
      {
        term: 'Object detection',
        definition:
          'Localizing key anatomical structures and clinical anomalies. For the final answer, the VLM must output a bounding box formatted [x, y, width, height] and obtain an IoU of at least 0.5 to be counted as correct.',
      },
    ],
  },
};
