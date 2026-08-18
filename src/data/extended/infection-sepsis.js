// Extended ("full") protocol for Infection / Sepsis, merged from the NSW Ambulance
// and St John New Zealand clinical practice guidelines.
//
// PROVENANCE
// Both services publish a direct match. NSW Ambulance PROTOCOL M23 (Sepsis), read
// at clinical level Paramedic, is almost entirely a graphic: its risk-factor boxes
// and its flowchart were read from the rendered protocol image, not from the page
// text, because the text layer carries only the three-line introduction.
// St John NZ CPG EAS 6.2 (Bacterial Sepsis) supplies the two-tier severity split
// and the referral rules that are the most useful thing in this entry.
//
// Four supporting guidelines fill gaps the Hatzolah protocol leaves open:
//   NSW M13 and NZ 6.3   meningococcal disease - the one infection where minutes
//                        change the outcome, and the rash that is not a rash
//   NZ 6.10 (Fever)      the paediatric and adult flag tables, and the reasoning
//                        that maps where a febrile patient hurts to what they have
//   NZ 6.9               PPE level by identified disease
//   NSW R17              the five moments of hand hygiene
//
// SCOPE EXCLUSIONS - none of these appear in the body:
//   * Every antibiotic (cefazolin, ceftriaxone, benzyl penicillin) and the whole
//     "assess whether antibiotics are indicated" limb of both pathways, including
//     drawing blood cultures beforehand. Hatzolah carries no antibiotic. NZ\'s list
//     of "clinical features indicating antibiotics" IS carried - but only for what
//     it also does, which is mandate ambulance transport to an emergency department.
//   * Metaraminol and adrenaline infusions for hypotension, and the ICP/CCP backup
//     and helicopter tasking criteria that surround them. The pathway escalates to
//     vasopressor support at intensive-care-paramedic level; that is as much as is
//     said here.
//   * All fluid volumes. Hatzolah does carry normal saline at Senior Responder
//     level, so the pathway step is named in general terms, but no figure from
//     another service sits anywhere near it.
//   * Antipyretic administration. St John NZ gives paracetamol for a temperature
//     over 39 degrees causing discomfort, and advises ibuprofen. Hatzolah carries
//     no ibuprofen, and Hatzolah\'s paracetamol is indicated for PAIN, not fever -
//     so this is a drug used for an indication the responder is not authorised to
//     use it for, and it is left out entirely rather than shown as a difference.
//     The observation that an apparent improvement after an antipyretic may only
//     be masking is kept, because it is a warning, not an instruction to give one.
//   * Ambulance vehicle cleaning and disinfection levels, and the palliative-care
//     antibiotic decision. Neither belongs to a first responder.
//   * The numeric NSW Adult and Paediatric Observation Range Guide zone tables.
//     They are a NSW-internal escalation instrument; reproducing their thresholds
//     beside Hatzolah\'s own SIRS numbers would create two competing sets of
//     figures for one decision. The STRUCTURE of the NSW trigger is described.
//
// JUDGEMENT CALL
// St John NZ lists ethnicity-specific age thresholds for sepsis susceptibility
// (45 years for Maori, 40 for Pacific Peoples, against 65 for the general
// population). That is New Zealand population epidemiology and does not transfer
// to a Melbourne community, so only the general threshold is carried.
export const infectionSepsis = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M23 — Sepsis',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/sepsis',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M13 — Meningococcal Disease',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/meningococcal-disease',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL R17 — Hand Hygiene',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/reference/page/hand-hygiene',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 6.2 — Bacterial Sepsis',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/infection-eas/page/bacterial-sepsis-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 6.3 — Meningococcal Septicaemia',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/infection-eas/page/meningococcal-septicaemia-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 6.10 — Fever',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/infection-eas/page/fever-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 6.9 — Infectious Disease Precautions',
      note: 'No version history published on the guideline page',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/infection-eas/page/infectious-disease-precautions-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'How many abnormal vital signs it takes to act',
      hatzolah:
        'SIRS criteria are met when you suspect an infection AND the patient has two or more abnormal vital signs from the list.',
      external:
        'Neither service requires two. NSW triggers its sepsis pathway on a single observation in the red zone of its observation range guide — or two in the yellow zone — combined with a sepsis risk factor and signs of a new infection; in a child, ANY observation outside the paediatric range plus a risk factor is enough. St John NZ states plainly that there are no criteria that can tightly define the presence or absence of sepsis, and that sepsis must always be considered in a patient who is unwell without an obvious cause or who has unexplained abnormal vital signs.',
      note: 'Hatzolah governs — the SIRS count is the Hatzolah trigger. Read it as a floor and not as a ceiling: one grossly abnormal observation in a patient with an infection and a risk factor still warrants escalation, and Hatzolah\'s own red-flag STOP applies whatever the count.',
    },
    {
      field: 'Where the immunocompromised patient goes',
      hatzolah:
        'A patient who is immunocompromised, or who meets SIRS criteria, is referred to VVED as a minimum.',
      external:
        'Both services put known neutropenia — and chemotherapy within the last four weeks — in their highest tier, which is a clear recommendation for transport to an emergency department by ambulance rather than a virtual or primary-care review.',
      note: 'Not a conflict, because Hatzolah sets VVED as a MINIMUM and permits escalation above it. The point worth carrying is that neutropenia is not simply one more immunocompromised patient — it is the subgroup both external services single out for the emergency department.',
    },
  ],

  content: {
    scope: [
      'Covers the recognition, risk stratification and disposition of a patient with a suspected infection, and the pathway for the patient in whom that infection has become sepsis.',
      'Sepsis is present when a microorganism invades a normally sterile part of the body and the immune response to it produces systemic signs and symptoms. The organism is usually a bacterium, but may be a virus, a fungus or a parasite.',
      'The infection is usually isolated to one organ — the skin, the urinary tract, the lungs — but the immune response it provokes affects every organ in the body. That is why a urinary tract infection can present as confusion and a low blood pressure.',
      'Sepsis carries a significant mortality rate and can present in any patient, in any clinical setting. Early recognition with early treatment improves outcomes; delay is associated with high mortality and significant morbidity.',
      'The out-of-hospital task has three parts: RECOGNISE the risk factors, signs and symptoms; RESUSCITATE within your scope; TRANSPORT to an emergency department, naming the sepsis risk at handover.',
    ],

    whySepsisIsMissed: [
      'There are no criteria that tightly define the presence or absence of sepsis. No score rules it in, and none rules it out.',
      'Always consider sepsis in a patient who is unwell without an obvious cause, or who has unexplained abnormal vital signs.',
      'The signs may be non-specific or very subtle — a new onset of altered mental status, or passing urine less often than usual.',
      'Early meningococcal septicaemia commonly presents with non-specific influenza-like symptoms, which is precisely why it is missed.',
    ],

    riskFactors: [
      'A sepsis risk factor is not the source of the infection — it is what makes this patient more likely to be harmed by it. The Hatzolah SUNWARD prompt finds the source; this list finds the vulnerability, and it is worth asking about explicitly.',
      'Ongoing medical contact and breaches of the body\'s barriers:',
      [
        'Re-presentation within 48 hours of medical care, or help sought from a healthcare provider more than once within 24 hours',
        'Surgery, an invasive procedure or a wound within the last four to six weeks',
        'An indwelling medical device — a central or peripheral venous line, a urinary catheter',
        'Any breach of skin integrity, including wounds and blisters',
        'Birth, termination of pregnancy or miscarriage within the last four weeks',
      ],
      'Reduced ability to fight an infection:',
      [
        'Immunocompromise from illness or from drugs, including oral steroids',
        'Known neutropenia, or chemotherapy within the last four weeks',
        'Cancer',
        'Diabetes',
        'Chronic lung, heart, liver or kidney disease',
        'Morbid obesity',
      ],
      'Age and circumstance:',
      [
        'Age 65 years or over',
        'Frailty or disability',
        'A recent fall',
        'Drug or alcohol addiction',
        'Complex social circumstances, or difficulty with health literacy',
      ],
      'In a child, the listed factors are: age three months or younger, immunocompromise, a central line or other invasive device, recent surgery or a wound, deterioration despite treatment, and a high level of parental concern.',
      'High parental concern is a risk factor in its own right. A parent who is frightened by a child who looks well to you is giving you information.',
    ],

    signsOfNewInfection: [
      'A risk factor on its own is not sepsis. What turns risk into suspicion is abnormal observations together with signs of a NEW infection.',
      'In an adult:',
      [
        'Fever or rigors',
        'Cough, sputum or breathlessness',
        'Abdominal pain, distension or peritonism',
        'Dysuria or urinary frequency',
        'Redness, swelling or pain around a line or device',
        'Altered cognition',
      ],
      'In a child:',
      [
        'Signs of toxicity — decreased alertness, arousal or activity; pale or mottled colour; cool peripheries; weak cry; grunting; fever; rigors; bounding pulses; wide pulse pressure',
        'Persistent tachycardia',
        'A non-blanching rash',
        'Redness, swelling or pain around a line',
        'A known high or low white blood cell count',
      ],
    ],

    featuresRequiringEmergencyDepartment: [
      'These features mark the severe end. A patient with one or more of them must be given a clear recommendation to be transported to an emergency department by ambulance.',
      'Objective evidence of a new onset of altered mental status',
      'Known neutropenia',
      'A new need for oxygen by reservoir mask to hold SpO2 above 92% — or above 88% in known COPD',
      'Systolic blood pressure 90 mmHg or below, or more than 40 mmHg below the patient\'s known normal',
      'Heart rate above 130/minute',
      'A mottled or ashen appearance',
      'Petechiae or purpura',
    ],

    featuresOfConcern: [
      'These sit one band below. A patient with one or more must be assessed by a doctor within two hours, and should usually also be given a clear recommendation for ambulance transport to an emergency department.',
      'A history from family or carers of a new onset of altered mental status',
      'A history of acute deterioration in what the patient can do for themselves',
      'An impaired immune system, from illness or from drugs including oral steroids',
      'Trauma, surgery or an invasive procedure within the last six weeks',
      'Tachypnoea',
      'Systolic blood pressure 91–100 mmHg',
      'Heart rate 91–130/minute, or a new onset dysrhythmia',
      'Reduced urinary output',
      'Temperature below 36 °C',
      'Signs of potential infection at a surgical site — redness, swelling, discharge, or breakdown of a wound',
    ],

    interpretingVitalSigns: [
      'Temperature. The presence or absence of a fever is not diagnostic. A FALL in temperature is a very important sign and is the one often associated with sepsis in the elderly; in severe septic shock fever may be absent altogether with hypothermia in its place.',
      'Rigors — true shaking chills — indicate that bacteria are likely to be present in the blood.',
      'Heart rhythm. A new onset tachydysrhythmia, particularly atrial fibrillation, is common in the elderly with sepsis.',
      'Blood pressure. A patient with pre-existing hypertension can suffer a significant fall in blood pressure without ever becoming hypotensive by the numbers. Compare against what is normal for that patient.',
      'Mental status. Changes are often subtle, so a history of an acute change from family or carers carries more weight than your own single snapshot. In young children, and in people with pre-existing intellectual impairment, the change may show as irritability, altered behaviour or agitation rather than drowsiness.',
      'Skin. Cold or cyanotic hands and feet, with pale, mottled or blue skin, in the presence of fever are key signs that septic shock is beginning.',
      'Blood glucose. Measure it. Hypoglycaemia is common in septicaemia — particularly meningococcal — and there should be a low threshold for re-measuring if the level of consciousness is falling or the journey is long.',
    ],

    localisingSigns: [
      'Where a febrile patient hurts often points at which infection you are dealing with, and several of these need an emergency department rather than a general practitioner.',
      'Pain or tenderness in the flank or back — consider pyelonephritis.',
      'Abdominal pain with tenderness on palpation — often requires a surgical review.',
      'Pain in a single joint — consider septic arthritis.',
      'Tenderness in a single muscle area — consider myositis or fasciitis.',
      'Severe or worsening headache, neck stiffness, drowsiness — consider meningitis. Neck stiffness does not usually occur below the age of one year.',
      'Petechiae or purpura — commonly meningococcal septicaemia.',
      'Severe pleuritic chest pain in a febrile patient is a red flag in its own right.',
    ],

    meningococcalSepticaemia: [
      'Meningococcal septicaemia is uncommon and has a high mortality rate. It is time critical, and it is the infection where minutes of delay change the outcome.',
      'Suspect it before the rash appears. Early cases look like influenza — fever, nausea, vomiting, malaise, lethargy — and are hard to tell from a mild self-limiting illness.',
      'The rash comes from disseminated intravascular coagulation: bleeding and clotting inside small vessels throughout the body. It is not really a rash and it does not blanch when pressed.',
      [
        'Petechiae are small spots about the size of the tip of a pen, from bleeding in skin capillaries. They can appear anywhere, so examine the patient fully.',
        'Purpura are larger spots that look like small bruises, and are usually very obvious.',
        'Petechiae develop over time. If the diagnosis is being considered, re-examine the skin every 10 to 15 minutes for new spots.',
      ],
      'Most patients develop a rash, but it may begin as a blanching pink rash before turning purpuric, and it may be scant or entirely absent. No rash does not mean no meningococcal disease.',
      'On suspicion: step back from the patient, wash your hands and don droplet-level protection — eye protection, a P2 / N95 mask and gloves, and consider a gown — before continuing.',
      'Transport urgently, and notify the receiving hospital while still en route rather than on arrival.',
      'Meningitis is a different disease from meningococcal septicaemia. It is more common, most often viral, and has a low mortality rate. It usually presents with headache and signs of infection, and may include nausea, a stiff neck and photophobia. Neck stiffness is a more useful sign in children over three years, and the absence of Kernig\'s and Brudzinski\'s signs does not exclude meningitis.',
    ],

    afterExposure: [
      'Meningococcal bacteria are carried in the nose and throat of roughly one person in ten and spread by respiratory droplets. They cannot survive outside the human body. Incubation is one to seven days.',
      'For a responder who has treated or transported a patient with meningococcal disease, the risk of subsequent infection is low and no different from the rest of the population — unless there was close contact.',
      'Close contact means droplets actually reached you: mouth-to-mouth ventilation, or the patient coughing or sneezing directly into the face of someone not wearing a mask.',
      'Without close contact, no antibiotic prophylaxis is required.',
      'With close contact, report it through the service\'s usual process and notify public health, who will make contact to discuss prophylaxis. Prophylaxis is not time critical and can be started several days after the exposure.',
    ],

    feverInChildren: [
      'The most common cause of fever in a child is a viral infection, but bacterial infection must always be considered.',
      'Fever itself raises the heart rate and the respiratory rate, so judgement is needed before calling a child\'s observations significantly abnormal.',
      'Tympanic thermometers may be unreliable in small children; an axillary measurement is preferred under six months of age.',
      'An apparent improvement after an antipyretic may be nothing more than masked symptoms, and does not rule out a serious infection.',
      'Assess the child using the paediatric assessment triangle. Features that call for an emergency department, usually by ambulance:',
      [
        'Any child under 12 months of age with a fever',
        'Pale, mottled or cyanosed appearance; petechiae or purpura',
        'An abnormal or weak cry; no response to social cues; difficult to rouse, or does not stay awake when roused',
        'Grunting; respiratory rate above 50/minute; moderate or severe increased work of breathing; SpO2 below 94% on air',
        'Severe tachycardia or bradycardia; peripheral capillary refill longer than 3 seconds; moderate to severe dehydration',
        'No urine passed and no wet nappy in the past 18 hours',
        'Known neutropenia, or chemotherapy within the last four weeks',
        'Rigors; neck stiffness; focal neurological signs',
        'Pain in a single joint or a single muscle area',
        'Any concern about neglect or non-accidental injury',
      ],
      'Features that call for review within about six hours rather than immediately:',
      [
        'Pallor reported by the caregiver but not seen by you',
        'Not responding to social cues normally; decreased activity; poor feeding',
        'Mild increased work of breathing; respiratory rate 40–50/minute; crackles on auscultation',
        'Mild dehydration; capillary refill 2–3 seconds; reduced urinary output or frequency',
        'Illness lasting longer than five days; not weight-bearing or not mobilising normally',
        'Immunocompromise, or help sought from a healthcare provider more than once within 24 hours',
      ],
      'The threshold for an emergency department must be lowered in a child with a coexisting chronic disease, and lowered again if help has already been sought more than once in 24 hours.',
      'Parents are often very concerned even when the child appears well. Their concern is part of the assessment. If they want their child transported despite advice to the contrary, transport should occur where no other reasonable option exists.',
    ],

    disposition: [
      'Once sepsis is suspected, minimise time on scene and transport to an emergency department, continuing treatment on the way where that is possible.',
      'A patient with any of the severe features must be given a clear recommendation to travel to an emergency department by ambulance.',
      'A patient with features of concern must be assessed by a doctor within two hours, and in most cases should also be recommended for ambulance transport — particularly a patient who is living independently.',
      'Being seen in primary care may be the better option for a patient in residential aged care, a very frail patient, or a patient with dementia.',
      'Lower the threshold for recommending transport whenever the trajectory of the illness is one of deterioration, or the patient carries the susceptibility factors above. A single set of observations is a snapshot; the direction of change matters more.',
      'Treat the treatable alongside, through the relevant Hatzolah protocol — hypoglycaemia, poor perfusion, seizure, vomiting. Where the external pathway continues past that point it escalates to antibiotics and vasopressor support at paramedic and intensive-care-paramedic level, which is outside Hatzolah scope.',
      'Repeat and document the ABCD examination and the observations regularly rather than once, so that a trend, a deterioration or a response to treatment can be identified.',
    ],

    handover: [
      'Say explicitly, at handover, that the patient has sepsis risk factors. Both services make this a required element of the handover rather than an optional extra — it is what triggers the receiving department\'s own sepsis pathway.',
      'Give a full structured handover: identification, history, observations, treatment given, and the sepsis concern named.',
      'For suspected meningococcal disease, notify the receiving hospital en route.',
    ],

    safetyNetting: [
      'For a patient who is not being transported, the advice they are left with is the safety net:',
      [
        'Keep well hydrated and take fluids by mouth as tolerated',
        'Contact their usual healthcare provider, or a telephone health line, if there is no improvement',
        'Call an ambulance immediately if there is any sudden deterioration',
      ],
      'Encourage oral fluids in any patient who appears dehydrated and can safely drink.',
    ],

    infectionPreventionAndControl: [
      'Hand hygiene has five moments, and they are the ones skipped under pressure: before touching a patient; before a procedure; after a procedure or a body-fluid exposure risk; after touching a patient; and after touching the patient\'s surroundings.',
      'Precaution level can also be set by the identified disease, not only by the symptom in front of you. Where the disease is known, the external guidance assigns:',
      [
        'Standard precautions only — hepatitis B, hepatitis C, HIV, pneumonia of unspecified type, meningitis of unspecified type',
        'Contact precautions — Clostridium difficile diarrhoea, gastroenteritis of unspecified type, hepatitis A, rotavirus, MRSA and other multi-resistant organisms, VRE, ESBL-producing organisms, norovirus without vomiting',
        'Droplet precautions — meningococcal disease, mumps, whooping cough',
        'Airborne precautions — chickenpox, measles, rubella, tuberculosis, viral respiratory illness, norovirus with vomiting',
      ],
      'Hatzolah\'s own trigger is broader: any patient who is coughing, sneezing or vomiting receives droplet and airborne precautions whether or not a disease has been named. Use the disease list to escalate, never to step down from the Hatzolah rule.',
      'Extra cleaning of equipment and of the environment after the patient, and communication of the patient\'s infectious status to the next provider, are part of the precaution rather than an afterthought.',
    ],
  },
};
