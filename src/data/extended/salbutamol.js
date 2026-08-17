// Extended ("full") protocol for Salbutamol, merged from the NSW Ambulance and
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
// lives on the source chips at the top of the view and in `sources` below, which
// is the level at which it is useful - a responder wants the information, not a
// citation on every line. Nothing here is invented: every statement traces to one
// or both guidelines, and anything that disagrees with the Hatzolah CPG is left
// out of the body and recorded in `differences` instead.
//
// CONTRAINDICATION vs CAUTION
// Neither service lists a caution for salbutamol - one states "Cautions: None" and
// the other lists none at all - so there is no `cautions` section here rather than
// a padded one. The practical warnings the external guidance does carry (checking
// the strength on the label, not waiting on scene in a life-threatening case) are
// operational and sit under `administration`.
//
// DOSE
// The Hatzolah dosing table and the external tables diverge on the nebulised
// loading dose, the age bands, the repeat interval and the inhaler regimen. Rather
// than merge conflicting numbers into the body - where a responder could read them
// as authorisation - the divergent figures are recorded in `differences`, which
// states plainly that Hatzolah governs. The body carries only route logistics and
// the indications Hatzolah does not cover (crush-injury release syndrome,
// hyperkalaemia), which are additions and not conflicts.
export const salbutamol = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'P-216',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/salbutamol',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.42',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/salbutamol-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Contraindications',
      hatzolah: 'Nil.',
      external:
        'One service also records nil; the other holds known severe allergy to salbutamol as a contraindication.',
      note: 'Follow Hatzolah. Noted because the external position is the more restrictive one.',
    },
    {
      field: 'Nebulised dose and age bands',
      hatzolah:
        '≥ 15 years: 10 mg (2 ampoules) initially, then 5 mg every 5 minutes. 7 – 15 years: 5 mg initially, then 5 mg every 20 minutes. 2 – 5 years: 2.5 mg initially, then 2.5 mg every 20 minutes.',
      external:
        'A flat 5 mg from 5 years of age and 2.5 mg under 5 years; the other service gives 5 mg to adults and children alike. There is no loading dose and no fixed repeat interval — repeat while the patient remains symptomatic, with no maximum total dose.',
      note: 'Follow Hatzolah. Hatzolah gives a larger initial adult dose and a faster repeat in severe asthma, and puts a 5-year-old in the 2.5 mg band where the external table would give 5 mg.',
    },
    {
      field: 'Driving gas for nebulisation',
      hatzolah: 'Nebulise with 8 L oxygen.',
      external:
        'Nebulise undiluted, using air as the driving gas in COPD and oxygen for every other indication.',
      note: 'Follow Hatzolah. Hatzolah does not distinguish COPD when choosing the driving gas.',
    },
    {
      field: 'Metered dose inhaler regimen',
      hatzolah:
        '4 – 12 puffs from 5 years, 2 – 6 puffs for a 2 – 5 year old, 4 breaths per puff via a spacer, repeated at 20 minutes.',
      external:
        'One service gives a fixed 6 puffs at 6 breaths per puff. The other gives 4 – 12 puffs from 5 years and 2 – 6 puffs under 5 for mild to moderate severity, rising to a fixed 12 puffs (6 under 5) when the presentation is severe or life-threatening, repeated while indicated with no maximum.',
      note: 'Follow Hatzolah. Hatzolah does not raise the puff count for severe asthma — it moves to a nebuliser instead.',
    },
  ],

  content: {
    indications: [
      'Bronchospasm from asthma or an exacerbation of COPD.',
      'Bronchospasm accompanying anaphylaxis or an allergic reaction.',
      'Prominent bronchospasm following airway burns, smoke inhalation or chest infection.',
      'Release syndrome following a crush injury.',
      'Known or suspected hyperkalaemia with ECG changes.',
      'Dyspnoea or tachypnoea in palliative care.',
    ],

    contraindications: [
      'Known severe allergy.',
    ],

    administration: [
      'Nebulise undiluted.',
      'For bronchospasm the first nebulised dose is combined with 0.5 mg ipratropium; later doses are salbutamol alone.',
      'For release syndrome after a crush injury, or known or suspected hyperkalaemia with ECG changes, nebulise 5 mg for adults and children alike and repeat as required.',
      'By metered dose inhaler, give one puff at a time into a spacer and have the patient breathe from the spacer after each puff before the next is fired.',
      'Several strengths are carried — 5 mg in 2.5 mL and 2.5 mg in 2.5 mL nebules, and an inhaler delivering 100 micrograms per actuation. Read the label and cross-check the strength before giving it.',
      'If the patient is severe or life threatening, do not wait on scene for salbutamol to take effect.',
    ],

    onsetAndDuration: [
      'Onset 2 – 5 minutes.',
      'Duration of effect 1 – 2 hours.',
      'No distinct peak effect is quoted.',
    ],

    adverseEffects: [
      'Tremor and shakes.',
      'Tachycardia.',
      'Dysrhythmias in large doses.',
    ],

    interactions: [
      'Beta-blockers make salbutamol less effective. The loss of effect is most pronounced with a non-selective beta-blocker such as propranolol.',
    ],

    mechanismAndPharmacokinetics: [
      'A sympathomimetic bronchodilator. It stimulates beta-2 receptors in bronchial smooth muscle, producing bronchodilation.',
      'Only a small part of a nebulised dose is actually absorbed — most of it is nebulised away to the atmosphere. What is inhaled is absorbed through the lungs, and some is swallowed.',
      'Metabolised in the liver and excreted in the urine. Liver or kidney impairment has no significant effect on a single acute administration.',
    ],

    furtherNotes: [
      'Safe in pregnancy and while breastfeeding, and may be given whenever it is indicated.',
      'Salbutamol has no significant role in treating bronchospasm caused by smoke or toxic gas inhalation, airway burns or chest infection — but it may still be given where the bronchospasm is prominent.',
    ],
  },
};
