// Extended ("full") protocol for Ipratropium Bromide, merged from the NSW
// Ambulance and St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply. Both external services carry this
// exact drug (NSW as "Ipratropium Bromide", NZ as "Ipratropium"), so nothing here
// is borrowed from a different anticholinergic. Hatzolah holds it at SR level for
// accredited responders only, and only after a salbutamol trial; both external
// services hold it at their entry clinical levels and give it alongside
// salbutamol from the outset.
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
// CONTRAINDICATION vs CAUTION
// The two services flatly disagree about glaucoma - one lists it as an absolute
// contraindication, the other states explicitly that it is not a caution for a
// single dose. The Hatzolah CPG decides: it holds glaucoma as a PRECAUTION, so
// the glaucoma material sits in `cautions` only, and the external disagreement is
// recorded in `differences`. Hatzolah's own contraindication (hypersensitivity to
// atropine and its derivatives) is not contradicted by either service; the body
// records the allergy contraindication in the words both services use.
//
// ONSET AND DURATION
// Onset is quoted as 2-5 minutes by one service and 3-5 minutes by the other -
// the same quantity measured slightly differently, so it is given as 2-5 minutes.
// Duration is quoted as 2-4 hours and as 6 hours; that is a wider spread, but it
// is the same quantity (how long one nebulised dose keeps working), so it is
// given as the combined range 2-6 hours. The Hatzolah entry quotes no onset or
// duration figures, so nothing here contradicts it.
export const ipratropium = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'Pharmacology 223',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/ipratropium-bromide',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.22',
      note: 'Version 1.0.1 (22/11/2022)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/ipratropium-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Trigger for giving it',
      hatzolah: 'Given only where there has been no improvement after 20 minutes of salbutamol.',
      external:
        'Given from the outset in moderate to severe or life-threatening asthma and in symptomatic COPD, mixed into the same nebuliser as the salbutamol rather than held back for a trial period.',
      note: 'Follow Hatzolah. The 20-minute salbutamol trial is a Hatzolah restriction; externally the two drugs are nebulised together from the first dose.',
    },
    {
      field: 'Dose by age',
      hatzolah: '500 mcg (2 nebules) at ≥ 11 years; 250 mcg (1 nebule) under 12 years. No lower age limit is stated.',
      external:
        'Age bands of 500 mcg from 6 years, 250 mcg from 2 years to under 6 years and 125 mcg from 6 months to under 2 years, with the drug contraindicated under 6 months. The other service gives a flat 0.5 mg to adults and children alike.',
      note: 'Follow Hatzolah. Note that the full adult dose starts much earlier externally (6 years rather than 11), and that the youngest external band is a quarter dose Hatzolah does not carry.',
    },
    {
      field: 'Repeat and maximum total dose',
      hatzolah: 'No repeat — the initial 500 mcg (or 250 mcg) is the maximum total dose.',
      external:
        'The dose may be repeated once, giving a maximum total of 1 mg from 6 years, 500 mcg from 2 to under 6 years and 250 mcg from 6 months to under 2 years. The other service gives it once only, which matches Hatzolah.',
      note: 'Follow Hatzolah — one dose, no repeat. The services do not agree with each other on this point.',
    },
    {
      field: 'Glaucoma',
      hatzolah: 'A precaution; avoid contact with the eyes.',
      external:
        'One service lists glaucoma as an absolute contraindication. The other states that glaucoma is not a caution for a single dose, because worsening has only been reported with frequent nebulised doses reaching the eyes in a patient whose glaucoma is poorly controlled.',
      note: 'Follow Hatzolah and treat it as a precaution. The two services contradict each other here, so the glaucoma material is kept in cautions rather than contraindications.',
    },
  ],

  content: {
    indications: [
      'Bronchospasm secondary to asthma or COPD — moderate to severe or life-threatening asthma, and symptomatic patients with an exacerbation of COPD.',
      'Prominent bronchospasm secondary to airway burns, smoke inhalation or chest infection.',
    ],

    contraindications: [
      'Known severe allergy, or allergy or hypersensitivity to ipratropium bromide.',
      'Children under 6 months of age.',
    ],

    cautions: [
      'Glaucoma — worsening has been reported, but only with frequent nebulised doses where the drug contacts the eyes and the glaucoma is poorly controlled.',
      'Safety in pregnancy has not been demonstrated, but ipratropium should still be given when it is indicated.',
      'It may be given to a patient who is breastfeeding; advise the patient to stop breastfeeding and to seek further advice from their lead maternity carer or GP.',
    ],

    administration: [
      'Give nebulised and undiluted, mixed in the same nebuliser as salbutamol — 5 mg of salbutamol alongside it.',
      'Choose the driving gas by the underlying condition:',
      [
        'Air for COPD.',
        'Oxygen for asthma.',
      ],
      'Two nebule strengths are stocked — 500 mcg in 1 mL and 250 mcg in 1 mL. Read the label carefully and cross-check before administration.',
      'It is also presented as an ampoule containing 0.5 mg in 2 mL.',
    ],

    onsetAndDuration: [
      'Onset 2 – 5 minutes.',
      'Duration of effect 2 – 6 hours.',
      'No peak time is quoted for the nebulised route.',
    ],

    adverseEffects: [
      'Tachycardia.',
      'Dry mouth.',
      'Blurred vision — usually only after repeated doses.',
      'Mild anticholinergic effects generally, for example urinary retention.',
    ],

    interactions: [
      'No common interactions are listed.',
    ],

    mechanismAndPharmacokinetics: [
      'An anticholinergic bronchodilator with predominantly antimuscarinic activity. It antagonises acetylcholine receptors, blocking the vagal reflexes that mediate bronchoconstriction, and the airway smooth muscle relaxes.',
      'It is synergistic with salbutamol, which is why the two are nebulised together rather than in sequence.',
      'Only a small part of a nebulised dose is actually absorbed — most of the dose is nebulised to the atmosphere. What is inhaled is absorbed through the lungs, and some is swallowed.',
      'Excretion is predominantly via the urine. Clearance is prolonged where kidney function is significantly impaired, but that does not change the initial dose.',
    ],

    furtherNotes: [
      'Ipratropium has no significant role in bronchospasm caused by smoke or toxic gas inhalation or by chest infection. It is given in those settings only where the bronchospasm is prominent.',
      'Both services hold ipratropium at their general ambulance clinical levels rather than reserving it for advanced practice — one authorises it for EMTs, paramedics, intensive care and critical care paramedics, the other from trainee level upwards.',
    ],
  },
};
