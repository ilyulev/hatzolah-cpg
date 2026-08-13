// Extended ("full") protocol for Methoxyflurane, merged from the NSW Ambulance
// and St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply; this layer exists to give background
// the Hatzolah CPG does not carry. Where the two services state the same thing it
// is stated once; where only one says it, the statement is attributed inline.
//
// SECTION ORDER
// Administration leads, because that is the part of the external guidance with the
// most practical value at the patient's side. Differences from the Hatzolah CPG
// are rendered last by ProtocolView, after the reference content.
//
// CONTRAINDICATION vs CAUTION
// The two services classify the same item differently - renal impairment is a
// contraindication for St John NZ and a precaution for NSW. The Hatzolah CPG
// decides which list an item belongs to: it holds pre-existing renal disease as a
// CONTRAINDICATION, so the renal material sits there only and is deliberately not
// repeated under cautions.
//
// ONSET AND DURATION
// Merged into a single set of figures rather than one column per service. The
// apparent conflict is not one: NSW's "up to 30 minutes" is how long a bottle
// lasts in use, while NZ's "2-5 minutes" is how quickly the effect wears off after
// stopping - different quantities. Onset differs only trivially (NSW 2-3 min, NZ
// 1-2 min) and is given as the combined range. The bottle-duration figure agrees
// with the Hatzolah CPG's own "3 mL typically lasts for 25 minutes continuous use".
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
      external: 'St John NZ caps a child under 12 years at 3 mL (one dose); 6 mL (two doses) applies from 12 years',
      note: 'Follow Hatzolah. Noted because the external limit is the more restrictive one for children.',
    },
    {
      field: 'Contraindications',
      hatzolah: 'Malignant hyperthermia (personal or family history); pre-existing renal disease',
      external: 'NSW additionally contraindicates head injury or loss of consciousness, and patients under 1 year of age. St John NZ additionally contraindicates known severe allergy, and 15 mL (5 doses) administered within the past week.',
      note: 'These are extra restrictions rather than a conflict - the Hatzolah CPG does not mention them either way.',
    },
    {
      field: 'Pregnancy and breastfeeding',
      hatzolah: 'Safe for use in pregnancy. Safe for use while breastfeeding.',
      external: 'St John NZ states safety has not been formally demonstrated in pregnancy, though it may be administered, and advises discussing administration with the lead maternity carer where there are signs of foetal distress. NSW classifies it pregnancy Category C and advises caution in lactation.',
      note: 'Follow Hatzolah. The external wording is more hedged.',
    },
  ],

  content: {
    administration: [
      'Wherever possible, have the patient self-administer. (NZ)',
      'Administer 3 mL (one dose) at a time and always use the charcoal filter — this absorbs exhaled methoxyflurane and limits exposure to personnel. (NZ)',
      'Do not put more than 3 mL in the inhaler at any one time; more increases the risk of droplet inhalation. (NSW)',
      'Instruct the patient to breathe out through the inhaler. (NZ)',
      'Do not give supplementary oxygen through the inhaler — it significantly increases the amount lost to evaporation. Oxygen may be given by nasal prongs alongside methoxyflurane. (NSW, NZ)',
      'If the dose is not fully used, place the inhaler in a closed plastic bag; it may be reused by the same patient. (NZ)',
      'Do not leave methoxyflurane with a patient who is not being transported to a medical facility by ambulance. (NZ)',
      'Warn the patient not to drive or operate machinery until fully recovered from drowsiness, and to take extra care as a pedestrian. (NSW)',
      'Store below 30°C. (NSW)',
    ],

    onsetAndDuration: [
      'Onset: 1 – 3 minutes.',
      'Analgesia wears off 2 – 5 minutes after administration stops.',
      'One 3 mL bottle lasts approximately 25 – 30 minutes of continuous use.',
      'Presentation: a 3 mL bottle with an inhaler.',
    ],

    indications: [
      'Acute moderate to severe pain, where any of the following apply (NZ):',
      [
        'An opiate cannot be administered because of a contraindication or caution',
        'Opiate administration will be significantly delayed',
        'There will be severe worsening of pain during a procedure or extrication',
      ],
      'Analgesia, per the NSW pain management guideline (CPG OT1). (NSW)',
    ],

    contraindications: [
      'Malignant hyperthermia — personal or family history. (NSW, NZ)',
      'Renal impairment. Methoxyflurane impairs renal function in a dose-related manner through the fluoride released during metabolism, and may cause polyuric or oliguric renal failure. (NSW, NZ)',
      'Known severe allergy. (NZ)',
      '15 mL of methoxyflurane (5 doses) administered within the last week — frequent administration increases the risk of renal impairment. (NZ)',
      'Head injury or loss of consciousness. (NSW)',
      'Patients under 1 year of age. (NSW)',
    ],

    cautions: [
      'Age 75 years or over, particularly if frail. (NZ)',
      'Pre-eclampsia — renal impairment is likely in this setting and methoxyflurane may worsen it. (NZ)',
      'Administration within a confined space. (NZ)',
      'Acute exacerbation of chronic pain. (NZ)',
      'Hepatic impairment — avoid where there are signs of liver damage, especially after previous methoxyflurane or halothane anaesthesia. (NSW)',
      'Diabetic patients — increased likelihood of nephropathy if renal function is impaired, polyuric, obese, or not optimally controlled. (NSW)',
      'Elderly patients — possible reduction in blood pressure or heart rate. (NSW)',
      'Paediatric use — give the minimum effective dose to produce analgesia. (NSW)',
      'Obese patients — give the lowest effective dose. (NSW)',
    ],

    adverseEffects: [
      'Common (over 1%): dizziness, drowsiness, headache, feeling light-headed, sedation. (NSW, NZ)',
      'Rare (under 0.1%): malignant hyperthermia, hepatotoxicity. (NSW)',
      'In light planes of anaesthesia blood pressure may fall, sometimes with bradycardia, reduced cardiac contractile force and reduced cardiac output. (NSW)',
    ],

    interactions: [
      'Effects are increased by other analgesics and sedatives — opioids, benzodiazepines, alcohol. Observe closely if opioids are given concurrently. (NSW, NZ)',
      'Tetracycline with methoxyflurane has been reported to cause fatal renal toxicity. (NSW)',
      'May enhance the adverse renal effects of other nephrotoxic drugs — gentamicin, kanamycin, colistin, polymyxin B, cephaloridine, amphotericin B. (NSW)',
      'Enzyme inducers (barbiturates, alcohol, isoniazid, phenobarbital, rifampicin) may increase toxicity and should be avoided concurrently. (NSW)',
      'Use intravenous adrenaline or noradrenaline cautiously during administration. (NSW)',
      'Beta-blockers — increased risk of hypotension. (NSW)',
    ],

    occupationalExposure: [
      'An ambulance is not considered a confined space. Maximise ventilation, for example by running ventilation fans. (NZ)',
      'Consider not administering in an ambulance if the patient cannot cooperate with breathing out through the inhaler. (NZ)',
      'NSW limits administration to twice in any one shift per paramedic. (NSW)',
      'Personnel regularly exposed to patients using inhalers should be aware of the relevant occupational health and safety guidance for inhalational agents. (NSW)',
    ],

    mechanismAndPharmacokinetics: [
      'An inhalational analgesic and central nervous system depressant. The mechanism of action is not clear. (NSW, NZ)',
      'Approximately 20% is exhaled; the remainder is metabolised in the liver. (NSW, NZ)',
      'Bio-transformation produces free fluoride, oxalic acid, difluoromethoxyacetic acid and dichloroacetic acid; 50–70% of the absorbed dose is metabolised. (NSW)',
      'High concentrations of fluoride ions are associated with renal impairment — the reason renal impairment is a contraindication and why a maximum dose exists. (NZ)',
    ],

    furtherNotes: [
      'Malignant hyperthermia is a rare inherited disorder of muscle metabolism; exposure can produce a life-threatening hypermetabolic state with severe hyperthermia. Affected patients, or those with a family history, usually know about it. (NZ)',
      'Renal failure already on dialysis is neither a contraindication nor a caution — further renal impairment is of no clinical consequence once a patient is dialysed. (NZ)',
      'Kidney stones and renal colic are neither a contraindication nor a caution; they are rarely associated with renal impairment. (NZ)',
    ],
  },
};
