// Extended ("full") protocol for Adrenaline, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply. Hatzolah carries adrenaline as an IM
// auto-injector for anaphylaxis and thunderstorm asthma only; both external
// services carry it as an ampoule across a far wider set of indications and
// routes, most of which sit with clinical levels above the one this project uses.
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
// Neither external service lists any absolute contraindication to adrenaline -
// one records "nil", the other "none". The Hatzolah CPG does hold one
// (hypovolaemic shock without adequate fluid replacement), so that is a genuine
// conflict and sits in `differences`, not in the body. The two clinical cautions
// below (myocardial ischaemia, tachydysrhythmias) are external additions that
// Hatzolah does not mention either way, so they stay in `cautions`.
//
// ONSET AND DURATION
// The services quote different figures for the same routes - IM onset given as
// 3-90 seconds by one and 2-5 minutes by the other, IV as 30 seconds and 5-10
// seconds. These are the same quantity measured differently rather than a real
// disagreement, so they are given as a combined range. Bolus duration is likewise
// combined (5-10 minutes and 5-15 minutes). The Hatzolah entry quotes no onset or
// duration figures, so nothing here contradicts it.
//
// DOSING
// The NZ medicine page defers all dosing to the individual condition guidelines
// ("the dose is dependent on the indication and the route"), so the external
// anaphylaxis doses recorded in `differences` come from the NSW dose table alone.
// The two services also prepare an adrenaline infusion differently; that
// divergence is described as a divergence rather than merged into one recipe.
export const adrenaline = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'Pharmacology 201',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/adrenaline',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.3',
      note: 'Version 1.0.1 (22/11/2022)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/adrenaline-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Contraindications',
      hatzolah: 'Hypovolaemic shock without adequate fluid replacement.',
      external: 'Neither service lists any absolute contraindication to adrenaline.',
      note: 'Follow Hatzolah. Its restriction is the more cautious position, and nothing external contradicts the reasoning behind it.',
    },
    {
      field: 'IM dose and device in anaphylaxis',
      hatzolah: 'Epi-Pen auto-injector — 0.3 mg for a patient ≥ 6 years and ≥ 20 kg (yellow device), 0.15 mg Epi-Pen Jr for < 6 years or < 20 kg (green device).',
      external: '500 mcg of 1:1,000 drawn from an ampoule for patients ≥ 16 years, and 10 mcg/kg to a maximum of 500 mcg under 16 years, injected into the lateral aspect of the thigh.',
      note: 'Follow Hatzolah. Hatzolah carries fixed-dose auto-injectors, so the weight-based figures cannot be delivered; note that the external adult dose is larger than an adult Epi-Pen, and the age band sits at 16 years rather than 6.',
    },
    {
      field: 'Repeat interval and maximum dose',
      hatzolah: 'The initial dose may be repeated ONCE only at 5 minutes. Anything beyond that requires consult.',
      external: 'IM adrenaline may be repeated every 5 minutes with no stated maximum; an infusion is considered once a patient has had at least four IM injections without response.',
      note: 'Follow Hatzolah — one repeat, then consult. The 5-minute interval itself is the same in both.',
    },
  ],

  content: {
    indications: [
      'Cardiac arrest, and blood pressure support after return of spontaneous circulation.',
      'Anaphylaxis.',
      'Severe or life-threatening asthma, and imminent respiratory arrest from COPD.',
      'Croup, and stridor causing moderate or severe respiratory distress.',
      'Bradycardia with moderate or severe cardiovascular compromise.',
      'Cardiogenic, septic and neurogenic shock that has not responded to fluid and to metaraminol, and blood pressure support generally where metaraminol has not worked.',
      'Newborn resuscitation where the pulse rate stays below 60/min despite effective CPR.',
      'Intranasally for clinically significant epistaxis, and topically for clinically significant bleeding from a wound.',
    ],

    contraindications: [
      'Neither service lists any absolute contraindication to adrenaline.',
    ],

    cautions: [
      'Myocardial ischaemia — adrenaline increases myocardial oxygen consumption.',
      'Tachydysrhythmias — adrenaline will usually make them worse.',
      'Safe in pregnancy and while breastfeeding; give it when it is indicated.',
    ],

    administration: [
      'Two concentrations are stocked — 1 mg in 1 mL (1:1,000) and 1 mg in 10 mL (1:10,000). Read the label carefully and cross-check before administration.',
      'IM — give undiluted. The preferred site is the lateral aspect of the thigh; use the lateral upper arm if the thigh is not suitable.',
      'Nebulised — give undiluted.',
      'Intranasal — dilute each 1 mg to a total of 10 mL with 0.9% sodium chloride, giving a 1:10,000 solution of 0.1 mg/mL. Administer into each bleeding nostril through a mucosal atomising device, in addition to direct pressure.',
      'Topical — use the same 1:10,000 dilution and apply to the bleeding point in addition to direct pressure.',
      'IV in cardiac arrest:',
      [
        'Adults, and children whose weight rounds to 50 kg or more — give undiluted as an IV bolus.',
        'Children whose weight rounds to 40 kg or less — dilute 1 mg to a total of 10 mL with 0.9% sodium chloride (1:10,000, 0.1 mg/mL) and draw the dose from that solution.',
      ],
      'IV outside cardiac arrest, and IV infusions, sit with the higher clinical levels and the two services prepare them differently — one dilutes 1 mg into a 1 litre bag of 0.9% sodium chloride (1:1,000,000, 0.001 mg/mL) and titrates by drops per second, the other dilutes 1 mg of 1:10,000 into 90 mL of compound sodium lactate through a burette with a micro drip and starts at 5 mcg/min (30 drops per minute). Titrate to the patient and record an estimate of the total dose given.',
      'Where the litre-bag dilution is used, 2 drops/second through a standard giving set delivers roughly 0.4 mg/hour; an adult infusion starts at 2 drops/second and a child aged 5 – 14 years at 1 drop/second.',
      'Existing IO access may be used during inter-hospital transport where IV access cannot be obtained.',
      'The endotracheal route is only for use when IV or IO access is unavailable, and a dose for a patient under 1 year must be diluted to a total volume of 1 mL with sodium chloride first.',
    ],

    onsetAndDuration: [
      'IM — onset within seconds to a few minutes, peaking at 4 – 10 minutes.',
      'IV — onset 5 – 30 seconds, peaking at 3 – 5 minutes.',
      'Nebulised, intranasal and topical — effect begins on contact with the target site, within roughly 1 – 5 minutes for the nebulised route, which then lasts up to 20 minutes.',
      'The cardiovascular effects of a bolus last about 5 – 15 minutes.',
      'The effect on mast cell membranes may persist for several hours.',
    ],

    adverseEffects: [
      'Tachycardia.',
      'Tachydysrhythmias, ventricular ectopy, and dysrhythmias up to ventricular fibrillation.',
      'Myocardial ischaemia.',
      'Hypertension.',
      'Nausea and vomiting.',
      'Tremor, anxiety and sweating.',
      'Hyperglycaemia.',
      'Pupillary dilation.',
    ],

    interactions: [
      'A patient taking a beta-blocker or a calcium channel blocker may need larger doses. The effect is particularly pronounced in poisoning, where a large dose of either has been taken.',
    ],

    mechanismAndPharmacokinetics: [
      'A sympathomimetic that stimulates the alpha and beta receptors of the sympathetic nervous system to produce the "fight or flight" response, acting predominantly at alpha 1, beta 1 and beta 2.',
      'Alpha 1 stimulation contracts smooth muscle and constricts blood vessels — raising perfusion pressure to vital organs during cardiac arrest, and in anaphylaxis reducing capillary permeability and raising blood pressure — and drives glycogenolysis and gluconeogenesis.',
      'Beta 1 stimulation raises myocardial excitability, contractility, heart rate and the speed of electrical conduction through the heart.',
      'Beta 2 stimulation relaxes smooth muscle, producing bronchodilation and skeletal muscle vasodilation, and stabilises mast cell membranes so less histamine is released.',
      'Metabolised by the liver and taken up by sympathetic nerve endings. Liver impairment has no significant effect on a single acute dose.',
      'Usually presented as an ampoule containing 1 mg in 1 mL.',
    ],

    furtherNotes: [
      'Authority over adrenaline is tiered by route: the basic clinical tier holds the nebulised, IM, intranasal and topical routes; the paramedic tier adds IV adrenaline for cardiac arrest; the intensive care and critical care tiers hold all indications and all routes.',
      'In severe or life-threatening anaphylaxis that has not responded to a minimum of four IM injections, an adrenaline infusion is indicated for patients 16 years and over at the higher clinical levels.',
      'Where signs of upper airway obstruction continue after IM adrenaline in anaphylaxis, nebulised adrenaline is added — 5 mg of 1:1,000 for a patient 16 years and over, or 500 mcg/kg to a maximum of 5 mg under 16, repeatable at 30 minutes.',
      'In life-threatening asthma, IV adrenaline is reserved for patients who remain unresponsive after four IM adrenaline injections, and only authorised paramedics may give it.',
    ],
  },
};
