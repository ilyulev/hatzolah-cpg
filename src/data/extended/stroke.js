// Extended ("full") protocol for Stroke / TIA, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE
//   NSW Ambulance   CPG CA11 Acute Stroke, read at clinical level "Paramedic",
//                   including the four "Clinical Procedure" algorithm images
//                   (CA11-1/2/3 and the Hunter reference card RC0042), which
//                   carry management detail the page text does not.
//   St John NZ      CPG EAS 12.6 Stroke and CPG EAS 12.7 TIA, both version
//                   1.0.5.3 (09/06/2025), plus the PASTA tool image.
//
// WHAT IS DELIBERATELY LEFT OUT
//
//   1. Reperfusion itself. Clot-dissolving therapy and endovascular clot
//      retrieval are the reason the whole pathway is a race, but both are
//      hospital treatments. They are named here only as the reason time matters
//      — never as something a responder does, and with no agent and no dose.
//
//   2. Every destination-triage scoring tool: the Hunter 8 Stroke Score, the
//      pre-morbid modified Rankin Scale, and the PASTA tool with its Los Angeles
//      Motor Scale. These exist to decide WHICH hospital an ambulance drives to
//      and whether it may bypass a closer one. Hatzolah does not transport and
//      does not make that decision; carrying the scores would invite a responder
//      to score a patient for a judgement that is not theirs to make.
//
//   3. The hospital lists, bypass rules and direct-to-neurologist phone pathways
//      that go with them, and the helicopter tasking criteria.
//
//   4. Blood-pressure lowering. It appears here only as a "do not" — which is
//      the clinically important half, and needs no drug named.
//
// JUDGEMENT CALL — the two services disagree with each other about children.
// One writes its guideline for adults and tells the clinician to seek advice for
// a child; the other states plainly that stroke occurs at any age and should be
// considered in paediatric patients. Both are recorded in one sentence rather
// than resolved, because Hatzolah's protocol sets no age limit and neither
// external position overrides it.
//
// JUDGEMENT CALL — the oxygen saturation targets ARE carried. They are titration
// endpoints for a gas Hatzolah holds, the threshold (< 92% on room air) is the
// same number the Hatzolah protocol already uses, and the extended Oxygen entry
// in this same tier already carries them. No drug dose figure appears anywhere.
export const stroke = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'CPG CA11 — Acute Stroke',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/cardiac-cardiovascular/page/acute-stroke',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 12.6 — Stroke',
      note: 'Version 1.0.5.3 (09/06/2025)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/neurological-eas/page/stroke-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 12.7 — TIA (Transient Ischaemic Attack)',
      note: 'Version 1.0.5.3 (09/06/2025)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/neurological-eas/page/tia-transient-ischaemic-attack-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'A patient whose stroke symptoms have completely resolved (TIA)',
      hatzolah:
        'All potential stroke patients are transported to hospital regardless of symptom improvement or resolution, and an ambulance is called regardless of severity',
      external:
        'Once every sign and symptom has completely resolved, transport by ambulance may not be required. The patient may travel by private transport provided they are not the one driving, and may be seen in primary care the same day instead of an emergency department — but only if ambulance personnel have spoken to the practice themselves and confirmed an appointment for that day.',
      note: 'Hatzolah governs. Call the ambulance. Symptoms that have resolved can return, and the Hatzolah protocol makes transport unconditional for exactly that reason.',
    },
    {
      field: 'A patient who was hypoglycaemic',
      hatzolah: 'Manage the hypoglycaemia, then re-evaluate the patient for stroke',
      external:
        'A patient who is hypoglycaemic, or who has just been treated for hypoglycaemia, is taken off the stroke pathway altogether and managed on the hypoglycaemia pathway — even when stroke signs are present — because the mimicry can persist for many hours after the glucose has been corrected.',
      note: 'Hatzolah governs: correct the glucose and reassess. What the external position adds is the reason for caution — persisting signs after a corrected BGL are not proof of stroke. Hand over the hypoglycaemia and its treatment so the receiving clinicians can weigh it.',
    },
  ],

  content: {
    scope: [
      'Covers the patient with new neurological signs suggesting an acute stroke, and the patient whose stroke signs have completely resolved — a transient ischaemic attack.',
      'A stroke is either an artery blocked by a clot or a bleed into the brain. The two present in much the same way and cannot be told apart without a CT scan, so the same pre-hospital pathway is followed either way, including when a bleed is strongly suspected.',
      'The external guidelines are written for adults and one of them directs the clinician to seek advice when the patient is a child, while the other states that stroke occurs at any age and should be considered in paediatric patients presenting with matching signs.',
    ],

    recognition: [
      'A patient with any new abnormality on the FAST assessment is having a stroke until proven otherwise.',
      'How each element is actually tested:',
      [
        'Face — look for new unilateral facial weakness. Ask the patient to smile and show their teeth and gums. New asymmetry is positive.',
        'Arm — ask the patient to raise both arms to 90° from the body with the palms facing upward, then close their eyes and hold. Inability to raise one arm, or one arm drifting downward, is positive.',
        'Speech — ask the patient to repeat a sentence and listen for slurring, then ask them to name several common objects shown to them and note any difficulty or inability. New abnormal speech is positive.',
        'Time — if any element is positive, determine and record the last known well time.',
      ],
      'Signs follow whichever part of the brain has lost its blood supply. Most commonly this is some combination of unilateral face weakness, unilateral arm weakness, unilateral leg weakness, speech disturbance and visual disturbance.',
      'Other features that may be present: difficulty swallowing, ataxia, and loss of consciousness that is either transient or persistent.',
      'A bleed more often announces itself with severe headache, nausea and vomiting, or an altered level of consciousness.',
    ],

    whatFastCanMiss: [
      'The FAST assessment detects approximately 85% of ischaemic strokes. A negative FAST does not exclude a stroke.',
      'Where the FAST criteria are not met but clinical suspicion of stroke is high, manage the patient as though FAST were positive.',
      'FAST is blind to strokes in the back of the brain, which may instead present with abrupt onset of double vision, loss of part of the visual field, abnormal coordination, or abnormal balance out of proportion to any vertigo that is present. A confidently suspected stroke of this kind is treated as a stroke.',
    ],

    beforeCommittingToThisPathway: [
      'Identify and manage any alternate diagnosis that could explain the presentation — hypoglycaemia above all — before settling on stroke.',
      'Hypoglycaemia mimics stroke closely, and the mimicry can persist for many hours after the glucose has been corrected.',
      'A seizure mimics stroke through the postictal phase, and again the signs can persist for many hours afterwards. The external pathways manage such a patient on the seizure guideline rather than the stroke guideline, even when stroke signs are present.',
    ],

    timeOfOnset: [
      'Record the time of symptom onset, or the time the patient was last seen or known to be free of symptoms, on the clinical record. This single number drives every hospital decision that follows.',
      'For a patient who wakes with symptoms, record BOTH times: the last known well time — usually the time they went to sleep — and the time of waking.',
      'Where the last known well time genuinely cannot be established, say so rather than guessing. The receiving service handles an unknown onset time differently from a late one.',
    ],

    riskFactors: [
      'Patients at higher risk include those with a history of previous stroke or TIA, atrial fibrillation, hyperlipidaemia, hypertension or obesity, those who smoke or drink alcohol heavily, and people of Aboriginal or Torres Strait Islander background.',
    ],

    management: [
      'Nothing done in the pre-hospital phase changes the stroke itself. The entire value of the response is speed to a hospital that can image and treat, so every step is judged by whether it delays that.',
      'Give oxygen only for hypoxia — an SpO2 below 92% on room air — and titrate to 92 – 96%, or to 88 – 92% in a patient at risk of hypercapnic respiratory failure.',
      'Do not delay transport to gain IV access, and do not delay transport to obtain an ECG.',
      'Where IV access is within scope, take it only if it is easy to achieve. A large-bore cannula — 18 gauge is preferred — in the antecubital fossa is the target, because that is what allows contrast to be given during CT imaging.',
      'Do not make repeated attempts at cannulation. Every failed attempt leaves a bleeding site, and the hospital may go on to give clot-dissolving treatment.',
      'Keep the time on scene short.',
    ],

    bloodPressure: [
      'Blood pressure is often high in acute stroke, sometimes strikingly so.',
      'Bringing it down, even when it is severely raised, may be associated with a worse outcome. Blood pressure is therefore not treated pre-hospital without specialist direction.',
    ],

    whyTimeMatters: [
      'Two hospital treatments can restore blood flow after an ischaemic stroke: a clot-dissolving drug, available at designated stroke hospitals, and a procedure in which the blocked artery is entered and the clot physically removed, available at a small number of centres. Neither is a pre-hospital treatment.',
      'The earlier that flow is restored, the more likely the patient is to make a good recovery. Delay worsens outcomes, which is why recognition, a documented onset time, a short scene time and early notification are the responder’s real contribution.',
      'The arrival-time windows each service sets for a designated stroke hospital have widened as the evidence has grown. A patient outside a window may still turn out to be a candidate for treatment, so no patient is moved less urgently on that basis.',
    ],

    handover: [
      'Early notification of the receiving hospital is what reduces the time to treatment — it is not a courtesy.',
      'The handover must include the time of symptom onset or last seen well, and which FAST criteria were positive.',
      'Notification goes to the emergency department. A stroke physician is not contacted directly.',
    ],

    familyAndHistory: [
      'The patient may not be able to give a history. Send a relative with the patient whenever it is feasible and safe — a relative is usually needed to supply the onset time and to take part in treatment discussions at hospital.',
      'If the patient travels unaccompanied, obtain the name and phone number of a relative or carer and pass it on.',
    ],

    transientIschaemicAttack: [
      'A TIA is a stroke whose signs and symptoms have COMPLETELY resolved. If any sign or symptom persists at all, it is a stroke and the stroke pathway applies.',
      'A patient who has had a TIA is at increased risk of going on to have a stroke, and that is why they must be assessed by a doctor the same day.',
      'That assessment normally requires imaging and a series of other investigations, which is why an emergency department is the usual place for it.',
    ],

    disposition: [
      'Every patient with a suspected stroke goes to hospital, including the patient whose symptoms have improved or resolved — stroke symptoms fluctuate.',
      'Transport is without delay, and the destination is chosen for its ability to image and treat stroke rather than for being nearest. Which hospital that is, and whether a closer one may be passed, is a decision for the transporting ambulance service.',
    ],
  },
};
