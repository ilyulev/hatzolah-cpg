// Extended ("full") protocol for Airway Obstruction (FR), merged from the NSW
// Ambulance and St John NZ clinical practice guidelines.
//
// PROVENANCE
// NSW holds this as PROTOCOL M2, "FBAO (Foreign Body Airway Obstruction)" - the
// treatment itself is published only as a flowchart image, so the pathway below
// was read off the rendered M2 chart, not off the page text. St John NZ holds it
// as CPG EAS 2.3, "Foreign Body Airway Obstruction". A third page, NSW PROTOCOL
// M30 "Foreign Body Ingestion", supplies the ingestion red flags in the last
// section; St John NZ carries that same material inside its FBAO guideline, which
// is why it belongs here rather than on a page of its own.
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice, with no inline "(NSW)" /
// "(NZ)" tags. Provenance lives on the source chips and in `sources` below.
// Nothing here is invented: every statement traces to a guideline actually read,
// and anything that disagrees with the Hatzolah CPG is kept out of the body and
// recorded in `differences` instead.
//
// SCOPE EXCLUSIONS - what was left out and why
//
//   1. Endotracheal intubation, including the trick of advancing the tube as far
//      as it will go and then withdrawing it, so the foreign body is pushed down
//      one bronchus and the other lung can still be ventilated. Interesting, and
//      completely outside Hatzolah scope.
//
//   2. Cricothyroidotomy - the last step of the external unconscious pathway.
//      Omitted entirely rather than described.
//
//   3. Named backup tiers (ICP / CCP). Generalised to "a higher clinical level",
//      because the Hatzolah escalation is SitRep to dispatch plus an ambulance.
//
//   4. The external guidance states there is no role for a particular drug in
//      oesophageal obstruction. That is written here as "there is no drug
//      treatment" without naming it. Naming a drug Hatzolah does carry, in a
//      section about a condition it is not for, invites exactly the wrong read.
//
// TWO JUDGEMENT CALLS
//
//   - Laryngoscopy and Magill forceps ARE named, once, in `theUnconsciousPatient`.
//     They are not an external-only technique: the Hatzolah FR protocol already
//     authorises them for an accredited responder, and the value of the external
//     pathway is that it confirms the ORDER Hatzolah uses (removal attempt, then
//     compressions, then ventilation).
//
//   - Small sips of fluid for a swallowed object are carried, with the external
//     guideline's precondition welded into the same sentence: the airway and
//     breathing must be normal. It is labelled as not being a Hatzolah step.
//
// NO safetyNetting SECTION
// Neither service gives discharge advice for FBAO. What they give is a set of
// disposition criteria, which is in `disposition`. Writing a safety-netting
// section would have meant inventing one, so there is not one.
export const airwayObstructionFr = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M2 — FBAO (Foreign Body Airway Obstruction)',
      note: 'Viewed at clinical level: Paramedic. Treatment published as a flowchart image.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/fbao-foreign-body-airway-obstruction',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 2.3 — Foreign Body Airway Obstruction',
      note: 'Version 1.0.1 (22/11/2022)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/respiratory-eas/page/foreign-body-airway-obstruction-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M30 — Foreign Body Ingestion',
      note: 'Viewed at clinical level: Paramedic. Used only for the swallowed-object red flags.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/foreign-body-ingestion',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Finger sweep of the mouth',
      hatzolah:
        'Do NOT place fingers in the patient\'s mouth, as this may trigger a bite reflex.',
      external:
        'One service opens the pathway for the unconscious, inadequately ventilating patient with an attempt to remove the foreign body under direct vision by finger sweep, before any instrument is reached for.',
      note: 'Follow Hatzolah. The Hatzolah rule carries no exception for the unconscious patient.',
    },
    {
      field: 'The unconscious patient who is still ventilating',
      hatzolah:
        'Unconscious with a pulse goes to Box A — supine, removal under direct vision if accredited, five chest compressions, reassess, then BVM ventilations.',
      external:
        'One service branches on the adequacy of ventilation rather than on the pulse. An unconscious patient who is ventilating adequately is placed on their side and watched, ready for intervention if they deteriorate — no compressions, no removal attempt.',
      note: 'Follow Hatzolah. Recorded because the two pathways ask a different question of the unconscious patient, and the Hatzolah answer is the more interventional one.',
    },
  ],

  content: {
    scope: [
      'Covers a foreign body lodged in the airway, from a partial obstruction the patient can still cough against through to a complete obstruction moving no air at all.',
      'Foreign body airway obstruction is a medical emergency. Severity is judged on how effectively the patient can cough, not on what was swallowed or how frightening it looks.',
      'It occurs most commonly in young children, the elderly, the intoxicated and the intellectually impaired.',
    ],

    recognition: [
      'History prompts:',
      [
        'The universal choking sign — clutching the neck between thumb and fingers — which is seen from older children through to adults',
        'Sudden onset of respiratory distress',
        'Paradoxical chest movement',
        'Sudden onset of coughing, gagging or stridor',
      ],
      'Prompts that the obstruction is severe:',
      [
        'An ineffective cough with increasing dyspnoea',
        'Inability to vocalise',
        'Inability to establish a patent airway',
        'Apnoea',
        'Loss of consciousness',
      ],
    ],

    judgingTheCough: [
      'The whole pathway turns on whether the cough is effective, so judge it deliberately rather than by impression.',
      'Effective cough — the patient is able to speak, cough and breathe. This is mild obstruction, and the patient is already doing the most useful thing available.',
      'Ineffective cough — the patient cannot speak, cannot breathe effectively, or has wheezy or noisy breathing. Attempts at coughing may be silent or move almost no air. This is severe obstruction.',
      'A patient who is conscious and ventilating adequately does not need immediate intervention. Stay with them and be ready to intervene the moment they deteriorate.',
    ],

    managementPrinciples: [
      'Check for signs that the obstruction has been relieved between every intervention, not only at the end of a cycle.',
      'When giving back blows, position the patient with the head below the shoulders wherever that is feasible, so gravity works with you.',
      'Alternate cycles of back blows and chest thrusts, and keep alternating until the obstruction clears or the patient becomes unconscious.',
      'Consider oxygen if indicated — in mild obstruction as well as severe.',
      'Repeat and document an ABCD examination and a full set of observations regularly. It is the trend across sets, not any single set, that shows deterioration or a response to treatment.',
      'Once it is clear the obstruction is not clearing, minimise time on scene and continue treatment on the way: alternating back blows and chest thrusts in severe obstruction, and continuing to encourage coughing in mild.',
    ],

    whyNotAbdominalThrusts: [
      'Abdominal thrusts — the Heimlich manoeuvre — are no longer recommended. They carry a risk of intra-abdominal injury, and are not associated with any higher chance of clearing the obstruction than chest thrusts.',
    ],

    theUnconsciousPatient: [
      'Both external pathways put removal under direct vision first for the unconscious patient, using a laryngoscope and Magill forceps — the same step, in the same position in the sequence, that the Hatzolah protocol allows an accredited responder.',
      'If that does not clear it, the sequence is chest compressions, then a recheck of the airway, then attempts to ventilate with a bag and mask — rechecking after each step rather than pressing on through the whole list.',
      'Beyond that point the external pathways escalate to airway procedures that are outside Hatzolah scope.',
      'Where the foreign body cannot be removed, the pathway commits to CPR and urgent transport rather than continuing to work the airway on scene.',
    ],

    escalationOfCare: [
      'Request backup from a higher clinical level on the signs of a persisting obstruction after the initial interventions — not after everything available has already failed.',
    ],

    disposition: [
      'Transport to an emergency department is mandatory if the obstruction could not be removed, or if the patient has been unconscious at any point.',
      'Transport is indicated where the obstruction was removed but symptoms persist:',
      [
        'Shortness of breath',
        'Coughing',
        'Chest pain',
        'Stridor',
        'A persisting sensation of a foreign body',
      ],
      'A clear recommendation that transport is not required may be made only where the obstruction was removed and no symptom persists.',
      'Treat any associated condition the episode caused or revealed, and use urgent transport for severe obstruction or for a reduced level of consciousness.',
    ],

    swallowedObjectWithoutAirwayObstruction: [
      'Most swallowed objects lodge at the top of the oesophagus and not in the airway. The patient is often in real distress and unable to swallow their own saliva, but the airway is patent and breathing is normal — this is not the choking pathway.',
      'Provided the airway and breathing are genuinely normal, encouraging the patient to take small sips of fluid, carbonated if available, may dislodge the obstruction. This is not a Hatzolah protocol step; it is recorded because it is what the external pathway does.',
      'There is no drug treatment for oesophageal obstruction in these pathways.',
      'If the obstruction persists the patient needs a hospital with surgical facilities, because removal usually requires anaesthesia and endoscopy.',
      'Take a proper history: what was swallowed, when, how large it was and how many. Some ingestions warrant transport for assessment on the history alone, even with no symptoms at all:',
      [
        'A button or cylindrical battery',
        'A magnet',
        'An object over roughly 2 – 2.5 cm across, or over roughly 5 cm long',
      ],
      'Those most at risk of swallowing a foreign body are children, the elderly, people with an intellectual disability or psychiatric illness, people with an existing narrowing of the gastrointestinal tract, and people who have recently had instrumentation or surgery.',
    ],
  },
};
