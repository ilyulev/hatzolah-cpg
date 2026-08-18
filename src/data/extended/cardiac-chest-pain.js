// Extended ("full") protocol for Cardiac Chest Pain / Discomfort, merged from the
// NSW Ambulance and St John NZ clinical practice guidelines.
//
// PROVENANCE
// NSW Ambulance PROTOCOL C1 (Acute Coronary Syndrome), read at clinical level
// Paramedic. The body of C1 is a flowchart graphic with a "Clinical Notes" panel
// beneath it; both were read from the rendered protocol image, not from the page
// text, because the page text carries only the two-paragraph preamble.
// St John NZ CPG EAS 3.2 (Myocardial Ischaemia), the emergency-ambulance
// guideline rather than an Extended Care Paramedic one, to match the
// emergency-response setting and the NSW Paramedic level.
//
// WHY THIS PROTOCOL IS WORTH EXTENDING
// The Hatzolah CPG tells a responder what to look for and what to give. What it
// does not say is why chest pain is so hard to localise, why a normal ECG proves
// nothing, which patients have a heart attack without any chest pain at all, and
// which other diagnoses kill patients who present the same way. Both external
// guidelines explain all of that, and none of it requires a drug or a procedure
// outside Hatzolah scope. That reasoning is the whole value of this entry.
//
// SCOPE EXCLUSIONS - what was deliberately left out
//
//   1. The entire STEMI branch. Both services divert a confirmed STEMI onto a
//      reperfusion pathway - primary angioplasty or prehospital thrombolysis.
//      Neither the diagnosis nor the treatment is within first-responder
//      practice, so the branch is named only as "the attending service takes
//      over here" and is not described.
//
//   2. ECG interpretation of every kind. That includes acquiring extra right-
//      sided (V4R) and posterior (V7-V9) lead sets, which one service triggers on
//      a suspected infarct territory - a judgement a responder is not making. It
//      also includes the ST-segment and T-wave signs used to confirm silent
//      ischaemia, and the rule that repeat GTN in a silent presentation must be
//      justified by improvement on the ECG. What IS carried is ECG ACQUISITION:
//      when to take one, how often to repeat it, and what a normal one does not
//      mean. Acquisition is in Hatzolah scope for an accredited responder.
//
//   3. IV opiate analgesia for pain persisting despite GTN. Recorded here only as
//      the pathway escalating to a higher clinical level, with no drug named.
//
//   4. Advanced management of the dysrhythmias and shock that can accompany ACS -
//      cardioversion, pacing, antiarrhythmics, vasoactive infusions. The
//      RECOGNITION of those states is kept, because it is what triggers a
//      responder to escalate, and recognising an abnormally slow or fast pulse
//      and signs of shock needs no monitor and no drug.
//
//   5. Helicopter tasking and inter-hospital transfer criteria - not a Hatzolah
//      decision.
//
//   6. Every external dose figure. Both services state their own aspirin and GTN
//      numbers and both differ from Hatzolah's in preparation or amount. Those
//      belong to the main protocol and to the aspirin / GTN entries in this tier,
//      not here. Nothing in the body of this file carries a drug dose.
//
// JUDGEMENT CALL - the aortic dissection differential
// One guideline lists aortic dissection among the life-threatening non-cardiac
// causes of chest pain, and the Hatzolah CPG separately withholds aspirin where
// there is associated back pain. The two facts sit well together, but no source
// read here draws that link, so it is not drawn here either. The differential
// list is carried as the guideline states it and the Hatzolah STOP stands on its
// own in the main protocol.
export const cardiacChestPain = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL C1 — Acute Coronary Syndrome',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/cardiac-cardiovascular/page/acute-coronary-syndrome',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 3.2 — Myocardial Ischaemia',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/cardiac-eas/page/myocardial-ischaemia-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Oxygen threshold in acute coronary syndrome',
      hatzolah: 'Give oxygen as needed when SpO2 falls below 92%',
      external:
        'One service states plainly that routine oxygen is not indicated in acute coronary syndrome, then starts titrated oxygen below an SpO2 of 94% and holds the saturation at 94% or above.',
      note: 'Follow Hatzolah for the number. The principle behind both is identical — in this patient oxygen treats hypoxia, not the chest pain, and is never run wide open by default.',
    },
    {
      field: 'What justifies a repeat dose of GTN',
      hatzolah: 'Repeat while the pain score stays at or above 2 and systolic blood pressure stays at or above 100, with no fixed maximum',
      external:
        'Repeat doses only while the GTN is clearly relieving the symptoms; a dose that is not working is not repeated.',
      note: 'Follow Hatzolah. The external rule adds a judgement Hatzolah does not make — whether the drug is actually helping — on top of the pain score and blood pressure gate.',
    },
  ],

  content: {
    scope: [
      'Covers the adult with suspected myocardial ischaemia. Acute coronary syndrome is a spectrum running from unstable angina through to acute myocardial infarction.',
      'It is usually caused by rupture of an atherosclerotic plaque, clot forming on the rupture, and partial or complete blockage of the artery feeding that part of the heart muscle.',
      'Where a 12 lead ECG confirms a STEMI, both services divert the patient onto a separate reperfusion pathway. That decision rests on ECG interpretation and the treatment that follows it is outside first-responder practice — it belongs to the attending ambulance service.',
    ],

    recognition: [
      'Chest pain or discomfort in an adult, and shortness of breath with no obvious non-cardiac cause, must be treated as possible myocardial ischaemia until proven otherwise.',
      'The pain is often nowhere near the heart, and there is an anatomical reason for it. The autonomic nerve supply to the organs of the chest and upper abdomen is arranged such that pain from myocardial ischaemia can mimic pain from many other causes — in where it sits, in how it feels, and in where it radiates.',
      'Be alert for high-risk presentations that do not look typical. They are more common in some groups:',
      [
        'Women',
        'Patients with diabetes',
        'Patients with renal failure',
        'Indigenous patients',
        'The elderly',
      ],
    ],

    atypicalAndSilentPresentations: [
      'Atypical pain or discomfort may appear in any combination of the face, jaw, neck, arm or upper abdomen. If you suspect those symptoms are ischaemic, treat them as ischaemia.',
      'Some patients have myocardial ischaemia with no pain or discomfort at all. The elderly and patients with diabetes are particularly at risk, because autonomic neuropathy blunts the pain signal that would otherwise warn them.',
      'Where pain is absent the symptoms may instead be shortness of breath, fatigue, weakness, non-specific malaise, or feeling light-headed.',
      'Confirming a silent presentation rests on changes seen on the 12 lead ECG, which is an interpretation task for the attending ambulance service. The transferable point for a responder is simpler: the absence of chest pain does not rule ischaemia out.',
      'Myocardial ischaemia is possible in young patients. The cause is usually not atherosclerosis of the coronary arteries but something else — spasm of a coronary artery, dissection of a coronary artery, or aortic dissection. A young patient with symptoms suggesting ischaemia must still be given a clear recommendation to go to a medical facility by ambulance.',
    ],

    otherLifeThreateningCauses: [
      'Even where myocardial ischaemia looks unlikely, a patient with chest pain or discomfort will usually still need assessment in an emergency department, because of the other potentially life-threatening causes that present the same way:',
      [
        'Pulmonary embolism',
        'Myocarditis',
        'Oesophageal tear or rupture',
        'Aortic dissection',
        'Pneumothorax',
      ],
      'The threshold for clearly recommending ambulance transport to an emergency department must therefore be very low — both for chest pain or discomfort, and for shortness of breath with no obvious cause.',
    ],

    assessment: [
      'Minimise time on scene.',
      'Where 12 lead capability is available, acquire a 12 lead ECG within ten minutes of reaching the patient.',
      'Acquire one in every patient with symptoms, typical or atypical. A normal 12 lead ECG does not rule out myocardial ischaemia — up to half of patients having an acute myocardial infarction have an ECG that is normal when it is first taken.',
      'Where no clear diagnosis has emerged, repeat the 12 lead ECG every 15 to 30 minutes. The value is in the comparison: changes that evolve across successive tracings are what a single tracing cannot show.',
    ],

    monitoringAndReassessment: [
      'Keep the patient on continuous cardiac monitoring, with physiological observations repeated at least every fifteen minutes, until clinical handover is complete.',
      'Repeat and document the ABCD physical examination and the observations regularly, so that trends, clinical deterioration and response to treatment can be identified rather than guessed at.',
    ],

    oxygen: [
      'Routine oxygen is not indicated in acute coronary syndrome. It is given for hypoxia, and it is titrated to a saturation target rather than run wide open.',
      'The Hatzolah threshold and target govern — see the Differences note below.',
    ],

    aspirinTakenBeforeYouArrive: [
      'The patient may already have taken aspirin. Ambulance control centres routinely instruct the caller to self-administer it as part of the call-taking procedure, before any crew arrives.',
      'Where aspirin has been taken before you arrive, confirm which medicine it was, how much was taken, and by what route. Use that to make a clinical decision on whether any further aspirin is warranted or should be withheld.',
    ],

    escalation: [
      'Where significant pain persists despite GTN, the pathway escalates to a higher clinical level for further analgesia.',
      'Escalate to the highest clinical level available where the patient has any of the following, each of which points to a complication beyond first-responder management:',
      [
        'An abnormally slow heart rhythm',
        'An abnormally fast heart rhythm',
        'Signs of shock',
      ],
    ],

    disposition: [
      'Every patient with suspected myocardial ischaemia should receive a clear recommendation to be transported to a medical facility by ambulance.',
      'Transport is usually to an emergency department. A primary care facility is acceptable only where it is specifically equipped to investigate suspected myocardial ischaemia.',
      'A patient with myocardial ischaemia that is not a STEMI is usually transported by road.',
      'Give a comprehensive, structured clinical handover — IMIST-AMBO — and include the ECGs in the order they were taken, so the receiving team can see how the picture changed rather than only how it ended.',
    ],
  },
};
