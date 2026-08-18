// Extended ("full") protocol for Dehydration, merged from the NSW Ambulance and
// St John New Zealand clinical practice guidelines.
//
// PROVENANCE
// NSW Ambulance publishes a direct match - PROTOCOL M8, Dehydration - read at
// clinical level Paramedic. Its severity grading, its red-flag high-risk groups
// and its three-branch pathway are the backbone of this entry. NSW M20
// (Gastroenteritis) and M25 (Medical Hypoperfusion/Hypovolaemia) supply the
// infection-control material and the mechanism.
//
// St John NZ publishes NO guideline called "Dehydration". Its emergency-ambulance
// equivalent is CPG EAS 12.13, Hypovolaemia from Fluid Loss, which is short and
// almost entirely about the fluid. The rich recognition and disposition material -
// including the paediatric dehydration assessment table - sits in its EXTENDED
// CARE PARAMEDIC guidelines (ECP 5.5, 5.6 and 6.7).
//
// THE JUDGEMENT CALL
// ECP is a scope far beyond Hatzolah - those clinicians prescribe, dipstick urine,
// run point-of-care bloods and discharge patients at home. The call made here is
// that the RECOGNITION and RISK material transfers cleanly (a sunken fontanelle
// looks the same whoever is looking at it) while the ECP DISPOSITION POWERS do
// not, and are left out. Where an ECP referral threshold is carried it is carried
// as a way to recognise the patient who needs an emergency department urgently,
// never as permission to leave anyone at home.
//
// SCOPE EXCLUSIONS - none of these appear in the body:
//   * Compound sodium lactate. NSW's crystalloid is not Hatzolah's fluid. Wherever
//     the NSW pathway names it, this entry says "intravenous fluid" and leaves the
//     drug, the volume and the practice level to the Hatzolah Normal Saline
//     protocol.
//   * Every fluid volume, oral and intravenous - the mL/kg oral rehydration
//     figures, the litre boluses, and the homemade oral-rehydration recipe. Doses
//     live in the main Hatzolah protocol and nowhere else.
//   * Loperamide, codeine, hyoscine butylbromide and antibiotics - not on the
//     Hatzolah formulary. The guidelines' point that anti-diarrhoeals and
//     antibiotics have no routine role IS kept, worded without naming a drug.
//   * Ondansetron IS on the Hatzolah formulary, so the pathway step that reaches
//     for an antiemetic is described - but with no dose, pointing instead at
//     Hatzolah's own Ondansetron protocol.
//   * Urinalysis, stool and faecal sampling, creatinine and eGFR, blood tests and
//     the whole acute-kidney-injury risk score. A responder cannot perform any of
//     them. The REASON they matter - that sustained fluid loss injures kidneys,
//     and that some patients are far more vulnerable - is kept.
//   * Community management, non-transport and scheduled phone follow-up.
//     Hatzolah's own rule governs: less than adequate perfusion from dehydration
//     means calling an ambulance.
export const dehydration = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M8 — Dehydration',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/dehydration',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M20 — Gastroenteritis',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/gastroenteritis',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M25 — Medical Hypoperfusion/Hypovolaemia',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/medical-hypoperfusion-hypovolaemia',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 12.13 — Hypovolaemia from Fluid Loss',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/miscellaneous-eas/page/hypovolaemia-from-fluid-loss-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG ECP 5.5 — Gastroenteritis in Adults',
      note: 'Extended Care Paramedic guideline — Version 1.0.4.4 (25/06/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/abdominal-ecp/page/gastroenteritis-ecp',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG ECP 5.6 — Gastroenteritis in Children',
      note: 'Extended Care Paramedic guideline — the page publishes no version stamp',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/abdominal-ecp/page/gastroenteritis-in-children-ecp',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG ECP 6.7 — AKI (Acute Kidney Injury)',
      note: 'Extended Care Paramedic guideline — Version 1.0.4.4 (25/06/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/genitourinary-ecp/page/aki-ecp',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Threshold for intravenous fluid',
      hatzolah:
        'Intravenous Normal Saline only where perfusion is less than adequate because of dehydration AND the patient cannot tolerate oral fluids.',
      external:
        'Fluid is given on clinical signs of dehydration or hypovolaemia alone. Moderate dehydration earns a bolus where the patient cannot tolerate oral fluid or is not responding to it; severe dehydration earns one outright, with time on scene minimised.',
      note: 'Follow Hatzolah. The external services set a lower threshold, and both the fluid they use and the volumes they give are their own.',
    },
    {
      field: 'What the patient should be given to drink',
      hatzolah: 'Encourage the patient to drink water.',
      external:
        'An electrolyte-containing oral rehydration solution is the preferred fluid, offered in small volumes very frequently. Highly sugared drinks, undiluted fruit juice and carbonated drinks are to be avoided, because excess sugar increases fluid loss.',
      note: 'Follow Hatzolah. Hatzolah carries no oral rehydration solution; the preference is recorded here so it is not read as a Hatzolah instruction.',
    },
    {
      field: 'Children',
      hatzolah:
        'The perfusion criteria are stated for ≥ 15 year olds only and the Normal Saline dosing has no paediatric row — there is no paediatric dehydration pathway.',
      external:
        'Children are graded on a dedicated paediatric dehydration assessment table, rehydrated orally in preference, and given weight-based intravenous fluid where oral rehydration fails.',
      note: 'Follow Hatzolah. The paediatric table below is carried for RECOGNITION only and carries no Hatzolah treatment.',
    },
  ],

  content: {
    scope: [
      'Dehydration is the loss of the water and salts the body needs to work normally, and happens whenever the body loses more fluid than it takes in.',
      'It is graded mild, moderate or severe on clinical signs, and that grade drives everything that follows — how fast the patient has to move, and whether fluid by mouth will be enough.',
      'Severe dehydration is a hypoperfusion state, and is treated as one.',
    ],

    whyItMatters: [
      'Most non-traumatic hypoperfusion comes from a volume deficit that is either absolute or relative. Absolute means fluid has actually left the body — the plasma fraction lost through vomiting, diarrhoea, diuresis and sweating, or whole blood lost from the gut. Relative means the vascular bed has widened without any fluid being lost, as in sepsis, anaphylaxis or a drug effect. Dehydration is the commonest absolute cause.',
      'Timely fluid replacement in a hypoperfused patient is one of the few interventions with a measurable effect on mortality, which is why grading the severity properly is worth the minute it takes.',
      'Sustained fluid loss injures the kidneys. Acute kidney injury is the main concern once diarrhoea has gone on, and much more so where kidney function is already impaired.',
    ],

    causes: [
      'Illness, acute or chronic — gastroenteritis and sepsis being the common ones.',
      'A change of climate, or prolonged exposure to sun and high temperatures.',
      'Prolonged exercise.',
      'Simply not drinking enough. Patients who depend on someone else for their fluid — the cognitively impaired, the frail — are a recognised risk group precisely because their intake is out of their own hands.',
      'Overuse of diuretics, and other medicines, drugs or substances that increase urination.',
    ],

    gradingSeverity: [
      'Mild:',
      [
        'Reduced urine output',
        'Thirst',
        'Dry mucous membranes',
        'Mild tachycardia',
      ],
      'Moderate — the mild signs plus:',
      [
        'Reduced skin turgor',
        'Abnormal respiratory pattern',
        'Lethargy',
        'Sunken eyes or fontanelle',
      ],
      'Severe — the mild and moderate signs plus:',
      [
        'Poor perfusion: mottled, cool limbs, slow capillary refill, altered level of consciousness',
        'Shock: thready peripheral pulses',
        'Marked tachycardia',
      ],
      'The grades are cumulative, so the severe patient still shows the thirst and the dry mucous membranes. What separates severe from the rest is that perfusion has failed.',
    ],

    paediatricDehydrationAssessment: {
      headers: ['Sign', 'None to mild', 'Moderate', 'Severe'],
      rows: [
        ['Activity', 'Alert, restless', 'Irritable, lethargic', 'Drowsy, decreased conscious state'],
        ['Urine output', 'Normal', 'Decreased', 'Minimal or none'],
        ['Extremity temperature', 'Warm', 'Warm', 'Cool'],
        ['Skin colour', 'Normal', 'Normal', 'Pale, mottled'],
        ['Eyes', 'Normal', 'Sunken', 'Sunken'],
        ['Fontanelle', 'Normal', 'Sunken', 'Sunken'],
        ['Oral mucosa', 'Moist', 'Dry', 'Dry'],
        ['Tears', 'Normal', 'Absent', 'Absent'],
        ['Heart rate', 'Normal', 'Mild tachycardia', 'Significant tachycardia'],
        ['Respiratory rate', 'Normal', 'Tachypnoea', 'Significant tachypnoea'],
        ['Ketosis', 'None', 'None', 'Signs of ketosis'],
        ['Peripheral pulses', 'Normal', 'Normal', 'Poor'],
        ['Capillary refill', 'Normal', 'Normal', 'Delayed'],
        ['Skin turgor', 'Normal', 'Reduced', 'Reduced'],
        ['Blood pressure', 'Normal', 'Normal', 'Reduced'],
      ],
    },

    readingThePaediatricTable: [
      'Blood pressure, capillary refill and peripheral pulses do not move out of the normal column until the severe column. A normal blood pressure in a dehydrated child is therefore not reassurance — it is the expected finding right up to the point of collapse.',
      'The signs that do move early are the soft ones: the eyes, the fontanelle, the mouth, the tears and the child\'s behaviour.',
      'Assess the oral mucosa before offering any fluid. Once the child has had a drink that sign is gone for the rest of the job.',
      'A child is at risk of dehydration if any one of the following is present:',
      [
        'Aged under one year, and especially under six months',
        'High ongoing fluid losses',
        'Any limitation on normal fluid intake, such as reduced breastfeeding or bottle feeds',
        'Any limitation on supplementary fluids',
      ],
    ],

    highRiskGroups: [
      'Infants and children.',
      'Patients ≥ 65 years of age.',
      'Diabetes, renal failure, heart failure, sepsis, undiagnosed abdominal pain, and potential intracranial causes.',
      'A prolonged duration of symptoms, or significant co-morbidities.',
      'Recent overseas travel — it raises the chance of an organism that will not behave like ordinary viral gastroenteritis, including drug-resistant ones.',
      'Patients already on medicines that stress the kidneys, and particularly anyone taking several of them together, because dehydration and those medicines injure the kidney by the same route.',
    ],

    assessment: [
      'Take a history and perform a physical examination, then grade the severity.',
      'History worth having: how much urine the patient is passing, what the bowel habit and the diarrhoea actually look like, how long the symptoms have run, recent overseas travel, recent antibiotics or a hospital admission in the last few months, and a medicines list — diuretics especially, and anything else that increases urine output.',
      'Obtain sitting and standing blood pressures where the patient can manage them; a postural change is part of the physical examination in these guidelines.',
      'Repeat and document the ABCD examination and the observations regularly, so trends, deterioration and the response to treatment are visible rather than guessed at.',
      'Treat whatever is causing the fluid loss under its own protocol as well. Dehydration is rarely the whole picture — nausea and vomiting, hypoglycaemia, hyperglycaemia, sepsis and hypoperfusion all sit alongside it.',
    ],

    oralRehydration: [
      'Where the patient can tolerate fluid by mouth, oral rehydration is the preferred treatment, in adults and children alike.',
      'Vomiting is not a reason to stop offering fluid. It often settles when small volumes are given very frequently rather than as a large drink, and once it has settled the volumes can go up and the frequency down.',
      'Avoid highly sugared drinks, undiluted fruit juice and carbonated drinks, especially in anyone already at risk — excess sugar makes fluid loss worse.',
      'In children, never stop breastfeeding, and give formula at its normal strength. Anyone on concentrated formula should be back to standard strength until they are well. Children fed through the illness lose less weight and recover faster, so food goes back in once the first few hours of rehydration are past, guided by whether they want it.',
      'A child will take fluid by whatever route appeals — cup, bottle, syringe, spoon, medicine cup or ice-block.',
      'A child who is not badly dehydrated may refuse an electrolyte drink because of the salty taste. That is not treatment failure, provided they are still taking a maintenance volume of something.',
      'Where ongoing vomiting is what is stopping the patient keeping fluid down, both pathways reach for an antiemetic before escalating. Hatzolah carries ondansetron; the indication, the age bands and the dose are in the Hatzolah Ondansetron protocol and are not repeated here.',
    ],

    intravenousFluid: [
      'Where oral fluid is not tolerated, or the patient is not responding to it, the pathway moves to an intravenous fluid bolus. For Hatzolah that is Normal Saline, at Senior Responder level — and the fluid, the volume and the age limits are set by the Hatzolah protocol, not by these guidelines.',
      'Titrate to the signs of intravascular volume and perfusion rather than running a fixed volume in and then looking.',
      'Rapid administration is not required unless shock is severe. Otherwise the bolus goes in over 30 – 60 minutes.',
      'Keep encouraging the patient to drink alongside the fluid, where that is appropriate.',
      'Reassess afterwards. A patient who responds to neither oral fluid nor a bolus is a hypoperfusion problem and is escalated as one.',
    ],

    whenAnEmergencyDepartmentIsNeeded: [
      'Severe dehydration, or shock — minimise time on scene.',
      'Any patient who cannot keep oral fluid down, or who is not responding to treatment.',
      'In an adult, the features that call for an emergency department without delay:',
      [
        'Diarrhoea with frank blood',
        'Temperature > 39 °C',
        'Severe abdominal pain, or peritonism',
      ],
      'And the features that call for an emergency department, though not necessarily at speed:',
      [
        'Persistent isolated vomiting',
        'Vomiting for > 3 days, or bile-stained vomit',
        'Persistent diarrhoea for > 10 days',
        'Diabetes',
        'Immunocompromise',
      ],
      'In a child, the features that call for an emergency department without delay:',
      [
        'Aged ≤ 6 months',
        'Severe dehydration, or shock',
        'Moderate dehydration that does not respond to oral rehydration',
        'Mild dehydration in a young child with ongoing vomiting that is not settling',
        'Blood in the diarrhoea',
        'Vomiting for > 3 days, vomiting not settled by a single dose of an antiemetic, or bile-stained vomit',
        'Temperature > 38 °C in a baby aged ≤ 6 months, or > 39 °C above that age',
        'Persistent isolated vomiting',
      ],
      'Vomiting with no diarrhoea is the pattern that most often turns out to be something other than gastroenteritis — in a small child, an unrecognised urinary tract infection or sepsis.',
      'These are the external services\' own referral thresholds, and they belong to services that can also choose to leave a patient at home. Hatzolah\'s rule governs: less than adequate perfusion from dehydration means calling an ambulance.',
    ],

    gastroenteritisAsACause: [
      'Gastroenteritis is a common gut infection producing diarrhoea and vomiting, usually viral — norovirus at any age, rotavirus in children. It is typically self-limiting and lasts under two weeks; the diarrhoea usually runs for up to a week and is only of concern once it passes about ten days.',
      'It is highly contagious. Symptoms appear between 15 and 48 hours after exposure, and contact precautions — gloves, gown, P2 mask and eyewear — are to be worn.',
      'The main symptoms are watery diarrhoea and vomiting, which can be violent and profuse, with nausea, stomach cramps, fever, headache and muscle aches. Cough, coryza and neurological symptoms can come with it.',
      'Features suggesting this is NOT simple gastroenteritis and an alternative diagnosis is in play:',
      [
        'Abdominal distension',
        'Bile-stained vomiting',
        'Fever > 39 °C',
        'Blood in the vomit or the stool',
        'Severe abdominal pain',
        'Vomiting in the absence of diarrhoea',
        'Headache',
      ],
      'Not every acute diarrhoea is infective. Irritable bowel syndrome, ulcerative colitis, coeliac disease, a food-sensitive enteropathy such as lactose intolerance, laxative misuse, and endocrine causes such as diabetes or an overactive thyroid all produce it.',
      'Medicines have no routine part in treating gastroenteritis in children — neither anti-diarrhoeal nor antibiotic treatment — and over-the-counter, herbal and traditional remedies should be discouraged.',
    ],

    safetyNetting: [
      'Keep drinking. Return to a normal diet when able, guided by appetite, with small, light, bland meals, and steer clear of sugary and carbonated drinks.',
      'Wash hands thoroughly with soap and running water after using the toilet, after changing nappies, and before preparing or eating food. Do not share towels.',
      'Stay away from work and other institutional settings for at least 48 hours after the last episode of diarrhoea or vomiting — particularly anyone working in healthcare, caregiving or hospitality.',
      'Seek medical attention if the symptoms have not improved within 72 hours, if they get worse, if there is frank blood in the stools, or if the patient cannot pass a normal volume of urine.',
      'These are the external services\' patient-advice sheets. What a Hatzolah responder actually leaves the patient with is governed by the Hatzolah safety-netting and escalation rules.',
    ],
  },
};
