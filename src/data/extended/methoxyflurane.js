// Extended ("full") protocol for Methoxyflurane, merged from the NSW Ambulance
// and St John NZ clinical practice guidelines.
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
// lives on the source chips at the top of the view and in `sources` below, which
// is the level at which it is useful - a responder wants the information, not a
// citation on every line. Nothing here is invented: every statement traces to one
// or both guidelines, and anything that disagrees with the Hatzolah CPG is left
// out of the body and recorded in `differences` instead.
//
// CONTRAINDICATION vs CAUTION
// The services classify renal impairment differently (contraindication for NZ, a
// precaution for NSW). The Hatzolah CPG decides: it holds pre-existing renal
// disease as a CONTRAINDICATION, so the renal material sits there only.
export const methoxyflurane = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'P-220',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/methoxyflurane',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.29',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/methoxyflurane-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Maximum dose in children',
      hatzolah: '6 mL in 24 hours, stated for all ages',
      external: 'A child under 12 is capped at 3 mL (one dose); 6 mL applies from 12 years',
      note: 'Follow Hatzolah. Noted because the external limit is the more restrictive one for children.',
    },
    {
      field: 'Contraindications',
      hatzolah: 'Malignant hyperthermia (personal or family history); pre-existing renal disease',
      external: 'Head injury or loss of consciousness, patients under 1 year, known severe allergy, and 15 mL (5 doses) within the past week are also treated as contraindications.',
      note: 'These are extra restrictions rather than a conflict - the Hatzolah CPG does not mention them either way.',
    },
    {
      field: 'Pregnancy and breastfeeding',
      hatzolah: 'Safe for use in pregnancy. Safe for use while breastfeeding.',
      external: 'Safety in pregnancy has not been formally demonstrated, though it may still be given; discuss with the lead maternity carer where there are signs of foetal distress. Classified pregnancy Category C, with caution advised in lactation.',
      note: 'Follow Hatzolah. The external wording is more hedged.',
    },
  ],

  content: {
    indications: [
      'Acute moderate to severe pain, particularly where an opiate cannot be given because of a contraindication or caution, where opiate administration would be significantly delayed, or where pain will worsen severely during a procedure or extrication.',
    ],

    contraindications: [
      'Malignant hyperthermia — personal or family history.',
      'Renal impairment. Methoxyflurane impairs renal function in a dose-related way through the fluoride released as it is metabolised, and can cause polyuric or oliguric renal failure.',
      'Known severe allergy.',
      '15 mL (5 doses) already given within the past week — frequent administration raises the risk of renal impairment.',
      'Head injury or loss of consciousness.',
      'Children under 1 year.',
    ],

    cautions: [
      'Age 75 or over, particularly if frail — watch for a fall in blood pressure or heart rate.',
      'Give the lowest effective dose in children, the elderly and obese patients.',
      'Pre-eclampsia — renal impairment is likely, and methoxyflurane may worsen it.',
      'Liver damage, especially after previous methoxyflurane or halothane anaesthesia.',
      'Diabetes — a higher chance of nephropathy where renal function is impaired, the patient is polyuric or obese, or control is poor.',
      'Acute flare of chronic pain.',
      'Confined spaces.',
    ],

    administration: [
      'Have the patient self-administer wherever possible.',
      'Give one 3 mL dose at a time and always fit the charcoal filter — it absorbs exhaled vapour and limits exposure to you and the crew. Never put more than 3 mL in the inhaler at once, which raises the risk of droplet inhalation.',
      'Instruct the patient to breathe out through the inhaler.',
      'Do not run oxygen through the inhaler — it drives evaporative loss. Oxygen can be given by nasal prongs alongside it.',
      'If the dose is not finished, seal the inhaler in a plastic bag; the same patient may use it again.',
      'Do not leave methoxyflurane with a patient who is not being transported by ambulance.',
      'Warn the patient not to drive or use machinery until the drowsiness has fully worn off, and to take extra care as a pedestrian.',
      'Store below 30°C.',
    ],

    onsetAndDuration: [
      'Onset 1 – 3 minutes.',
      'Analgesia wears off 2 – 5 minutes after administration stops.',
      'A 3 mL bottle lasts roughly 25 – 30 minutes of continuous use.',
    ],

    adverseEffects: [
      'Common: dizziness, drowsiness, light-headedness, sedation, headache.',
      'Rare: malignant hyperthermia, hepatotoxicity.',
      'Blood pressure may fall, sometimes with bradycardia and reduced cardiac output.',
    ],

    interactions: [
      'Other analgesics and sedatives — opioids, benzodiazepines, alcohol — increase its effects. Observe the patient closely if opioids are given alongside it.',
      'Tetracycline has been reported to cause fatal renal toxicity in combination with methoxyflurane, and other nephrotoxic drugs such as gentamicin, kanamycin, colistin, polymyxin B, cephaloridine and amphotericin B may have their renal effects amplified.',
      'Enzyme inducers — barbiturates, alcohol, isoniazid, phenobarbital, rifampicin — speed its metabolism and may increase toxicity; avoid giving them together.',
      'Use intravenous adrenaline or noradrenaline cautiously during administration.',
      'Beta-blockers increase the risk of hypotension.',
    ],

    occupationalExposure: [
      'An ambulance is not a confined space, but maximise ventilation anyway — run the fans.',
      'Think twice about giving it in an ambulance if the patient cannot manage breathing out through the inhaler.',
      'One service limits each clinician to administering it twice per shift.',
      'Anyone regularly exposed to patients using these inhalers should know their local occupational health guidance for inhalational agents.',
    ],

    mechanismAndPharmacokinetics: [
      'An inhalational analgesic and central nervous system depressant; the precise mechanism is not established.',
      'Around 20% is exhaled and the rest is metabolised by the liver, producing free fluoride along with oxalic acid and related metabolites.',
      'High fluoride concentrations are what link the drug to renal impairment, and are the reason both for the contraindication and for the maximum dose.',
    ],

    furtherNotes: [
      'Malignant hyperthermia is a rare inherited disorder of muscle metabolism in which exposure can trigger a life-threatening hypermetabolic state with severe hyperthermia. Patients affected, or with a family history, usually know about it.',
      'Renal failure already on dialysis is neither a contraindication nor a caution — further renal impairment makes no clinical difference once a patient is dialysed.',
      'Kidney stones and renal colic are neither a contraindication nor a caution; they are rarely associated with renal impairment.',
    ],
  },
};
