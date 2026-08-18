// Extended ("full") protocol for Head Trauma, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE
//   NSW Ambulance   PROTOCOL T4 Head Injuries, read at clinical level
//                   "Paramedic", including the T4 treatment algorithm image
//                   (assets/images/info/T4.jpg) — the page text alone carries
//                   none of the disposition or positioning detail, all of which
//                   lives in that graphic. PROTOCOL P5 Referral Decision was
//                   read for the generic non-transport exclusions that T4's
//                   referral branch depends on.
//   St John NZ      CPG EAS 4.9 Concussion and Minor Head Injury (v1.1.0.1,
//                   16/06/2026), CPG EAS 4.10 Severe Traumatic Brain Injury
//                   (v1.0.5, 28/10/2024), and FCR 3.2 Traumatic Brain Injury —
//                   the First Care Responder tier, which is the closest thing
//                   either service publishes to a Hatzolah-level guideline and
//                   is the source of the positioning and oxygen steps here.
//
// WHAT IS DELIBERATELY LEFT OUT
//
//   1. The whole drug half of the severe TBI pathway: metaraminol (bolus and
//      infusion), levetiracetam, cefazolin for a compound skull fracture,
//      8.4% sodium bicarbonate and hypertonic saline for raised intracranial
//      pressure, and ketamine for sedation. None of it is in the Hatzolah
//      formulary. The analgesia ladder attached to T4 adds morphine, fentanyl
//      and ketamine and is left out for the same reason — Hatzolah's own pain
//      relief protocol governs, and no dose figure appears anywhere here.
//
//   2. Rapid sequence intubation, endotracheal ventilation, capnography and the
//      ETCO2 target that goes with it. A responder cannot do any of it, and the
//      ventilation target only means anything once the patient is tubed.
//
//   3. IV fluid volumes and the age-banded systolic blood pressure targets they
//      are titrated against. Hypotension is carried as the thing to avoid,
//      because that is the half that is actionable at this level; the numbers
//      are omitted because printing fluid-titration endpoints next to a
//      protocol that has no fluid step invites a decision nobody here makes.
//
//   4. Destination triage in all its forms — the New Zealand neurosurgical
//      hospital list, major trauma hospital selection, CCP backup criteria, and
//      the helicopter response and transport thresholds. Hatzolah does not
//      transport and does not choose the hospital.
//
//   5. CT imaging decisions, and the referral paperwork each service requires.
//
// JUDGEMENT CALL — the skull fracture section cuts against the Hatzolah
// protocol's emphasis and is carried anyway, with the Hatzolah criteria stated
// alongside it. A responder who reads "skull fracture does not correlate with
// the severity of brain injury" and quietly downgrades a time-critical trigger
// would be reading it exactly backwards: the external point is that the ABSENCE
// of fracture signs is not reassurance, not that their presence can be ignored.
//
// JUDGEMENT CALL — oxygen flow rates and saturation targets ARE carried. They
// are device settings and titration endpoints for a gas Hatzolah holds, the
// extended Oxygen entry in this same tier already carries both, and the
// divergence from Hatzolah's usual 92 – 96% target is recorded as a difference
// rather than buried.
export const headTrauma = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T4 — Head Injuries',
      note: 'Viewed at clinical level: Paramedic, including the T4 treatment algorithm image',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/head-injuries',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL P5 — Referral Decision',
      note: 'Viewed at clinical level: Paramedic — read for the generic non-transport exclusions',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/patient-disposition/page/referral-decision',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.9 — Concussion and Minor Head Injury',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/concussion-and-minor-head-injury-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.10 — Severe Traumatic Brain Injury',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/severe-traumatic-brain-injury-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'FCR 3.2 — Traumatic Brain Injury',
      note: 'First Care Responder tier — the first-responder level guideline; no version shown on the page',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-fcr/page/traumatic-brain-injury-fcr',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Oxygen target in a head-injured patient',
      hatzolah:
        'The Head Trauma protocol says nothing about oxygen; the Hatzolah Oxygen protocol gives oxygen for an SpO2 below 92% on room air and titrates to 92 – 96%',
      external:
        'Both services aim higher once the brain is injured. One titrates oxygen to hold a saturation of 95 – 98%. The other administers oxygen routinely to a patient with severe traumatic brain injury even when the saturation is already 92% or above, and treats a normal reading as no evidence that the injured brain is getting enough oxygen.',
      note: 'Hatzolah governs — the Hatzolah oxygen thresholds stand. Carried because it explains why the head-injured patient is the last one to be relaxed about oxygenation.',
    },
    {
      field: 'Cervical spine immobilisation in an unresponsive head-injured patient',
      hatzolah:
        'Spinal Trauma applies the spinal immobilisation criteria and fits a cervical collar when any is met; Major Trauma keeps the head in neutral alignment and avoids neck flexion and extension',
      external:
        'The two services do not agree with each other. The first-responder guideline states plainly that cervical spine immobilisation is not a priority, and that a patient who is unresponsive or responding only to pain should be placed on their side to protect the airway regardless of a suspected spinal injury, moving them as little as possible. The other requires spinal precautions to be maintained while the patient is positioned head-up on a stretcher.',
      note: 'Hatzolah governs — follow the Hatzolah Spinal Trauma criteria. What transfers is the ordering: an unprotected airway kills faster than an unsupported neck, and a supported side-lying position with the spine held straight serves both at once.',
    },
    {
      field: 'How much amnesia matters',
      hatzolah: 'Amnesia ≥ 29 minutes is a criterion for transport to hospital',
      external:
        'One service sets no duration at all. Retrograde or anterograde amnesia of any length raises the index of suspicion for a significant head injury, and amnesia is listed outright as a finding that rules the patient out of the low-acuity referral pathway.',
      note: 'Hatzolah governs. Where the external guidance is the more cautious of the two it costs nothing to follow it — short-lived amnesia is a reason to look harder, never a reason to relax.',
    },
  ],

  content: {
    scope: [
      'Covers blunt or penetrating injury to the head, whether it is an isolated injury or one part of multi-system trauma.',
      'The external guidelines split head injury into two populations, and the split is made on one question: can the patient obey commands?',
      [
        'A patient who can obey commands is worked up down the concussion and minor head injury pathway — assessment, flags, and a disposition decision.',
        'A patient who cannot obey commands after a mechanism consistent with head injury is treated as a severe traumatic brain injury from the outset.',
      ],
      'Almost all of the severe pathway is hospital and intensive-care treatment and is not reproduced here. What carries across at responder level is the recognition, the positioning, and the reasoning behind both.',
    ],

    secondaryBrainInjury: [
      'The damage done at the moment of impact is the primary injury, and nothing a responder does can undo it. Secondary brain injury is the further damage that happens afterwards — and that one is preventable. It raises mortality and worsens neurological recovery in those who survive.',
      'The common causes of secondary brain injury are:',
      ['Hypoxia', 'Hypoventilation', 'Hyperventilation', 'Hypotension'],
      'Every one of those is an airway, breathing or circulation problem, not a head problem. This is why the care of a serious head injury is almost entirely airway management, oxygenation, adequate ventilation and keeping the blood pressure up — and why time spent examining the head itself is time badly spent.',
      'Hypoglycaemia mimics severe brain injury. Measure a blood glucose in any head-injured patient with an altered level of consciousness before concluding the head injury explains it.',
    ],

    recognition: [
      'Hold a high index of suspicion for a significant head injury in a patient with any of:',
      [
        'A history of loss of consciousness, or an altered level of consciousness on assessment — responding to voice, to pain, or unresponsive',
        'Nausea or vomiting',
        'Significant injury above the clavicles, especially if the patient is unconscious',
        'A suspicious mechanism of injury',
        'Retrograde or anterograde amnesia',
        'Age 65 years or older',
      ],
      'Symptoms that commonly accompany a head injury: headache, confusion, irritability, memory loss, vomiting, seizures.',
      'Findings on examination that should prompt concern:',
      [
        'A GCS below 14',
        'Any reduced level of consciousness with a history of trauma at any point',
        'Visible deformity of the skull or face',
        'Bruising around the eyes or the ears',
        'Cerebrospinal fluid present at the ears or nose',
        'Reduced pupil reactions',
        'A low systolic blood pressure',
      ],
      'Ask specifically about the mechanism, and about anticoagulants, antiplatelets and clotting disorders — particularly in a patient 65 or over.',
    ],

    assessment: [
      'In a patient who can obey commands, assess for brain injury alongside the assessment for physical injury, in this order:',
      [
        'GCS',
        'Mental status',
        'Symptoms of concussion, such as headache and nausea',
        'Signs of concussion, such as vomiting, disorientation or reduced attention',
        'Coordination and balance — watch the patient walk, and perform the finger-nose test',
      ],
      'Presume traumatic brain injury or concussion if any sign or symptom is abnormal, or if there is any abnormality of memory, coordination or balance.',
      'The concussion assessment can be used for a child, provided the child is old enough to cooperate with having a history taken and being examined.',
    ],

    fingerNoseTest: [
      'Ask the patient to put the tip of their index finger on their nose.',
      'Hold your own finger about 30 cm away and ask them to touch it.',
      'Move your finger slowly, asking them to alternate — their nose, then your finger, then their nose, and so on.',
      'A patient with normal coordination does this cleanly. A patient with abnormal coordination misses or overshoots.',
    ],

    whatCountsAsLossOfConsciousness: [
      'Judgement is required whenever the history of loss of consciousness comes from bystanders. It is common for a patient to be stunned for a few seconds after a strike to the head, and bystanders routinely report this as having been knocked out.',
      'That is not loss of consciousness. It counts only where there is a clear history of the patient being unconscious for a period well in excess of a few seconds.',
      'The reverse trap matters just as much: concussion occurs with no loss of consciousness at all, so a confident "no, they never went out" does not clear the patient.',
    ],

    redFlags: [
      'Any one of these means the patient should be seen in an emergency department, usually by ambulance:',
      [
        'Loss of consciousness at any time',
        'An abnormal GCS',
        'Abnormal mentation',
        'A seizure following the injury',
        'Taking an anticoagulant or dual antiplatelet therapy, or a known bleeding disorder',
        'Severe signs or symptoms of concussion',
        'A focal neurological deficit',
        'More than one episode of vomiting',
      ],
      'The reason for an emergency department now rather than review later is intracranial bleeding, which may not have declared itself at the time you are standing in front of the patient.',
    ],

    orangeFlags: [
      'These patients should be assessed in primary care within 48 hours:',
      ['Mild or moderate signs or symptoms of concussion', 'A recent previous concussion episode'],
    ],

    management: [
      'Perform a primary survey and pass a situation report to dispatch.',
      'Ensure an open airway and adequate ventilation. The most important parts of treating a brain-injured patient are an adequate airway, adequate breathing, and oxygen where it is indicated — in that order, ahead of anything done to the head itself.',
      'Give oxygen. At first-responder level the external guidance for a patient who is unresponsive or responding only to pain is a reservoir mask at 10 L/min.',
      'A suspected base-of-skull fracture does not rule out a nasopharyngeal airway. If an NPA is what is needed to keep the airway open — for example where the jaw is clenched — the theoretical risk does not outweigh the airway.',
      'Treat the associated injuries on their own protocols: haemorrhage control by direct pressure, wound care, facial and neck injuries, eye injuries, spinal injury, and nausea and vomiting.',
      'Repeat and document the physical examination and the observations regularly. One set of numbers describes a moment; a series of them shows a trend, and the trend is what identifies deterioration and response to treatment.',
    ],

    positioning: [
      'If the patient is unresponsive or responds only to pain, place them on their side, supported, with the spine held in neutral alignment, and ensure the airway is open.',
      'If the patient is alert or responds to voice, let them find the position they prefer.',
      'A patient carried on a stretcher should be positioned with the head raised about 30 degrees where this is possible, with spinal precautions maintained.',
      'Move the patient as little as possible in every case.',
    ],

    intoxication: [
      'Any patient with an altered level of consciousness after trauma is treated as having a brain injury, even where alcohol or drugs are strongly suspected to be the cause. Intoxication is the explanation of last resort here, and getting the order wrong is fatal.',
      'Intoxication lowers the threshold for recommending an emergency department. It never raises it.',
      'Suspected intoxication together with any sign of trauma — facial swelling or bruising after a fall or an assault, for instance — rules the patient out of a low-acuity referral pathway outright.',
    ],

    concussion: [
      'Concussion is a form of brain injury in which no injury is detectable on CT imaging, but the patient has signs or symptoms of altered brain function.',
      'It can occur without any loss of consciousness.',
      'The symptoms are often significant and may impair brain function for many months.',
      'It is most often thought of alongside contact sport, but occurs just as commonly after assaults, falls and minor road crashes.',
      'Repeated concussion has long-term effects. That is the entire reason medical assessment is required before returning to any activity that risks another one.',
    ],

    anticoagulantsAndBleedingDisorders: [
      'A patient taking an anticoagulant, taking dual antiplatelet therapy, or with a bleeding disorder is at increased risk of intracranial bleeding after a head strike even where there has been no loss of consciousness, and many will need a CT scan of the brain.',
      'Dual antiplatelet therapy means more than one antiplatelet medicine — aspirin together with a second agent, for example.',
      'One service allows a narrow exception, applied with clinical judgement, where ALL of the following hold:',
      [
        'The head strike was clearly trivial — bumping the head on an open window, for example',
        'There are no external signs of head trauma at all: no bruising, no wound, no tenderness',
        'There are no signs or symptoms of concussion',
        'This is the patient’s only red flag',
      ],
      'Even then the patient must be given worsening advice, a recommendation to be seen in primary care within 48 hours, and told to remain with a competent adult until they are.',
      'Hatzolah’s protocol routes an anticoagulated or antiplatelet patient to Virtual ED, and that decision stays with the Hatzolah protocol. What the external guidance adds is the reasoning, and the advice that has to travel with the patient either way.',
    ],

    theElderly: [
      'The elderly are at increased risk of intracranial bleeding after a minor head injury, subdural bleeding above all.',
      'The mechanism is worth knowing: the brain shrinks with age, which widens the subdural space and stretches the cerebral bridging veins crossing it. A minor injury — a fall from which the patient appears to walk away unhurt — is enough to tear one.',
      'Subdural bleeding may develop slowly over many days. The presentation can be nothing more than a slight decline in thinking or memory.',
      'Older patients may not recognise the signs of a brain injury, may not seek help in time, and are at increased risk of falling again once one has occurred.',
      'There is no age at which a patient becomes "elderly" and judgement is required. The risk of subdural haemorrhage rises above about 65 years, and rises further where the patient is frail.',
    ],

    skullFractures: [
      'The presence or absence of a skull fracture does not track the severity of the brain injury. A skull fracture can be present with no brain injury, and a severe brain injury can be present with no fracture.',
      'Most skull fractures cannot be diagnosed at the patient’s side and require imaging. Significant time should not be spent searching for one.',
      'Hatzolah’s protocol treats blood or cerebrospinal fluid leaking from the ear or nose, Battle sign, raccoon eyes and any other obvious sign of skull fracture as time-critical criteria, and that stands unchanged. What the external guidance adds is the other half of the statement: their absence is not reassurance.',
    ],

    disposition: [
      'A patient with a suspected significant head injury must be transported for assessment and observation.',
      'A minor head injury that has produced no more than a haematoma or a contusion, in a patient with no exclusion criteria, may be referred for review by a general practitioner within a reasonable timeframe.',
      'Where a red flag is present the recommendation is an emergency department — though transport by ambulance is not always required to get there. One service permits private transport provided the patient has a GCS of 15, is asymptomatic, is accompanied by a competent adult, and suitable transport is available within an hour or two.',
      'Extra judgement applies to a patient already in hospital-level care, or living with dementia. It may be appropriate for them to remain where they are — but only after speaking directly to a registered health professional attached to the facility, and leaving worsening advice with them.',
    ],

    exclusionsFromReferral: [
      'Any one of the following rules a head-injured patient out of a low-acuity referral pathway and back into transport:',
      [
        'Suspicion of a potential brain injury',
        'Absence of a responsible carer',
        'Amnesia',
        'Any loss of consciousness at any time, or a GCS below 15',
        'Suspicion of a skull fracture',
        'A suspicious mechanism of injury',
        'Nausea or vomiting',
        'Suspected to be under the influence of alcohol or drugs',
        'Anticoagulant or antiplatelet medication, or a known coagulopathy',
        'Known or suspected pre-existing cerebral pathology or neurological impairment',
      ],
      'Separately from anything head-specific, referral is also off the table where the patient does not demonstrate competence and capacity — acute confusion included — and there is no responsible person present, where observations are abnormal and unexplained, where there is a recent unexplained faint, or where a child has no adult supervision and no parent or carer can be reached.',
    ],

    safetyNetting: [
      'Give the patient, their carers and any accompanying adult a written head injury advice sheet where one is available — and explain what is in it rather than simply handing it over.',
      'Leave clear worsening advice, and a clear instruction to remain with a competent adult until the patient is seen.',
      'Where an orange flag is present, tell the patient plainly to stop immediately any activity or sport that could produce another blow to the head, and to be assessed in primary care within 48 hours.',
      'Document that the advice was given and that the patient received the advice sheet.',
    ],

    returnToSportAndActivity: [
      'Being asked to clear an injured player to carry on is a common request at sporting events, and it should be answered on its merits rather than on convenience.',
      'Repeated minor brain injuries can predispose a patient to very serious consequences, including permanent cognitive and neurological deficits.',
      'A patient may be told to continue only where there are clearly no signs or symptoms of concussion at all — and even then judgement is required, because the onset of concussion symptoms can be delayed. Any doubt at all means a clear instruction to stop until they can be assessed in primary care.',
      'Some sporting codes run their own clearance and documentation processes. Where these are formally structured they may be followed, but where a code’s process contradicts the clinical guideline, the guideline wins.',
      'The minimum safe interval between minor brain injuries is not established. The stand-down period for a patient who is not cleared belongs to a health professional in primary care, not to the responder at the side of the field.',
    ],
  },
};
