// Extended ("full") protocol for Ondansetron, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply.
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice rather than quoted per
// service, and carry no inline "(NSW)" / "(NZ)" tags. Where both services make the
// same point in different words it is written once; where they cover different
// ground the points are combined into a single readable statement. Provenance
// lives on the source chips at the top of the view and in `sources` below.
// Nothing here is invented: every statement traces to one or both guidelines, and
// anything that disagrees with the Hatzolah CPG is left out of the body and
// recorded in `differences` instead.
//
// ROUTE - THE MAIN JUDGEMENT MADE HERE
// Hatzolah gives ondansetron as an orally disintegrating tablet (ODT). Both
// external services give it intravenously or intramuscularly and carry no oral
// form. Their doses, age bands and onset figures therefore describe a different
// route and must not be read across to the wafer; they are recorded in
// `differences` rather than in the body, and the onset figures below are labelled
// by route.
//
// CONTRAINDICATION vs CAUTION
// The Hatzolah CPG decides placement. It holds concurrent apomorphine as a
// CONTRAINDICATION, so that sits there. It holds congenital long QT syndrome as a
// PRECAUTION, so the QT material sits under cautions even though one service words
// it as "avoid". Suspected serotonin syndrome is a hard contraindication in one
// guideline and Hatzolah is silent on it, so it is listed as a contraindication;
// the separate point about co-administering serotonergic drugs is a drug
// interaction and sits under interactions, not repeated as a caution.
export const ondansetron = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'Pharmacology 234',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/ondansetron',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.35',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/ondansetron-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Route, dose and age bands',
      hatzolah:
        'Orally disintegrating tablet only. 4 mg from 11 years, repeated once at 20 minutes if required, to a maximum of 8 mg; 4 mg with no repeat from 5 to 11 years; 2 mg with no repeat under 5 years.',
      external:
        'Given intravenously or intramuscularly, IV preferred. An adult receives 8 mg IV, or 4 mg IM repeatable once after 20 minutes where IV access cannot be obtained, and an IV dose may follow an IM dose to a total of 12 mg. Elsewhere the adult and paediatric dose is 4 mg IV/IM from 8 years and 2 mg from 2 to 7 years, with no repeat.',
      note: 'Follow Hatzolah. Different route, so neither the doses, the age bands nor the onset figures transfer to the wafer.',
    },
    {
      field: 'First trimester of pregnancy',
      hatzolah: 'May be given after consulting the receiving hospital.',
      external:
        'Ondansetron should not be used in the first trimester — it is suspected of causing orofacial malformations, and is classified pregnancy Category B1. The less restrictive position is that safety in pregnancy has not been demonstrated but it may be given if nausea or vomiting is severe.',
      note: 'Follow Hatzolah. Noted because the external position is the more restrictive one.',
    },
    {
      field: 'Breastfeeding',
      hatzolah: 'Safe for use while breastfeeding.',
      external:
        'Breastfeeding is advised against after administration — either withheld entirely, or stopped with the patient advised to seek further advice from her lead maternity carer or GP.',
      note: 'Follow Hatzolah. The external guidance is more cautious in both of its forms.',
    },
    {
      field: 'Minimum age',
      hatzolah: 'No lower age limit stated; children under 5 years receive 2 mg.',
      external: 'Contraindicated below 1 to 2 years of age.',
      note: 'Follow Hatzolah. Noted because the external limit is the more restrictive one for infants.',
    },
    {
      field: 'Severe liver disease',
      hatzolah: 'Do not exceed 8 mg total dose per day.',
      external:
        'Liver impairment has no significant effect on a single acute administration, and no reduced ceiling is specified.',
      note: 'Follow Hatzolah, which is the more cautious position.',
    },
  ],

  content: {
    indications: [
      'Clinically significant nausea or vomiting — severe nausea, or active vomiting.',
      'Prophylaxis where the nature of the injuries or the transport position would make vomiting particularly problematic, for example a suspected penetrating eye injury. Routine prophylactic administration is not required.',
      'Nausea and vomiting in end of life and palliative care management.',
    ],

    contraindications: [
      'Concurrent apomorphine administration.',
      'Known allergy or hypersensitivity to ondansetron.',
      'Very young children — ondansetron is not given below 1 to 2 years of age.',
      'Suspected serotonin syndrome. Nausea or vomiting in that setting must not be treated with ondansetron, as it may worsen the syndrome.',
    ],

    cautions: [
      'Congenital long QT syndrome. Ondansetron prolongs the QT interval in a dose-dependent way, and torsades de pointes has been reported after marketing. The prolongation has generally involved repeated or high doses, and one or two doses is regarded as safe even in a patient known to have prolonged QT syndrome.',
      'Signs of subacute intestinal obstruction — ondansetron increases large bowel transit time, so monitor the patient after giving it.',
      'The effect of ondansetron on the ability to drive or use machinery was not assessed at registration.',
    ],

    administration: [
      'Slow intravenous administration is the preferred route. Give it undiluted.',
      'Use the intramuscular route only when IV access cannot be obtained. Give it undiluted, into the lateral thigh, which absorbs best; use the lateral upper arm if the thigh is unsuitable.',
      'An intravenous dose may be given in addition to an intramuscular dose if clinically significant nausea or vomiting persists and IV access is obtained afterwards.',
      'Supplied as ampoules of 4 mg in 2 mL and 8 mg in 4 mL.',
    ],

    onsetAndDuration: [
      'Intravenous — onset 2 – 5 minutes.',
      'Intramuscular — onset 5 – 15 minutes.',
      'Duration of effect: published figures vary widely, from 1 – 2 hours up to 4 – 8 hours.',
    ],

    adverseEffects: [
      'Common — over 1 in 100:',
      [
        'Headache and dizziness.',
        'Constipation.',
        'Flushing.',
        'Transient visual disturbance such as blurred vision, particularly after rapid intravenous administration.',
        'Extrapyramidal side effects and seizures.',
        'A transient rise in hepatic aminotransferases.',
      ],
      'Rare — under 1 in 1,000:',
      [
        'Hypersensitivity reactions, including anaphylaxis.',
        'ECG changes.',
      ],
    ],

    interactions: [
      'Other medicines that prolong the QT interval, such as erythromycin — the risk of QT prolongation rises when high doses are given alongside them, though one or two doses in this setting is regarded as safe.',
      'Serotonergic drugs, including SSRIs and SNRIs — serotonin syndrome, with altered mental status, autonomic instability and neuromuscular abnormalities, has been described following concurrent use. Where giving them together is clinically warranted, observe the patient appropriately.',
    ],

    mechanismAndPharmacokinetics: [
      'An antiemetic and 5-HT3 antagonist. It blocks serotonin released from intestinal enterochromaffin cells from binding to 5-HT3 receptors on adjacent vagal afferent nerves, acting both centrally in the brain and peripherally in the gastrointestinal tract, which reduces vagal signalling and the subsequent release of serotonin in the brainstem.',
      'Serotonin signalling is not the only mechanism by which nausea and vomiting are triggered, so ondansetron cannot be expected to treat every cause.',
      'Predominantly metabolised by the liver, with substantial first-pass metabolism carried out by several enzymes. About 10% of a dose is excreted unchanged in the urine, and a further 34 – 43% as metabolites within 24 hours.',
    ],

    furtherNotes: [
      'Ondansetron is rarely effective for vomiting associated with an altered level of consciousness and should not be given for it.',
    ],
  },
};
