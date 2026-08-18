// Extended ("full") protocol for Spinal Trauma, merged from the NSW Ambulance
// and St John NZ clinical practice guidelines.
//
// PROVENANCE
//   NSW Ambulance   CPG TR5 Spinal Injuries, read at clinical level "Paramedic",
//                   including its "Clinical Management" algorithm image (T5),
//                   which carries the NEXUS / Red Flag / SPEED structure the
//                   page text only partly repeats. Supplemented by PROTOCOL R4
//                   (Spinal Cord, Sensory & Motor Examination), Reference Card
//                   0055 (the SPEED assessment) and the Spinal Immobilisation
//                   Checklist from the Checklists tab.
//   St John NZ      CPG EAS 4.17 Cervical Spine Immobilisation and CPG EAS 4.16
//                   Spinal Cord Injury, both version 1.0.5 (28/10/2024),
//                   including the EAS 4.17 decision flowchart image. FCR 3.5
//                   (Spinal Injury, First Co-Responder level) is also cited: it
//                   is written for co-responders who arrive before an ambulance
//                   and carry no ambulance equipment, which is the closest
//                   published analogue to a Hatzolah responder's position.
//
// WHAT IS DELIBERATELY LEFT OUT
//
//   1. The whole vasopressor arm of the neurogenic-shock pathway. The external
//      guideline escalates through metaraminol and then adrenaline infusions,
//      titrated on an infusion pump, to hold a blood-pressure target. None of
//      those drugs, that route or that equipment exist at Hatzolah. The reason
//      blood pressure matters at all — spinal cord perfusion pressure — is
//      carried, because it is the part a responder can act on by not letting
//      the patient get cold, shocked or roughly handled. No target figure and no
//      fluid volume is reproduced.
//
//   2. All dose figures, including for drugs Hatzolah does carry. The main
//      Hatzolah protocol holds the ondansetron doses and the pain-relief
//      pathway; the external services' analgesia arm is opioid- and
//      ketamine-based and is named here only as "advanced analgesia at paramedic
//      level", with no agent.
//
//   3. Airway devices. The NZ flowchart branches on whether an endotracheal tube
//      or laryngeal mask has been placed. That branch is dropped entirely rather
//      than paraphrased, because every option under it presumes an airway a
//      Hatzolah responder does not place.
//
//   4. Destination and transport decisions: the NZ spinal cord impairment centre
//      catchments and their hospital-by-hospital geography, the NSW trauma
//      triage and bypass rules, and the helicopter tasking criteria. Hatzolah
//      does not transport and does not choose the hospital. What IS carried is
//      the clinical reason those rules exist — the patient needs imaging, and
//      an un-cleared spine is not an "assess and leave" patient.
//
//   5. Urinary catheterisation on long transfers, which is a procedure outside
//      Hatzolah scope on a journey Hatzolah does not make.
//
// JUDGEMENT CALL — the "lanyard". St John NZ physically places a lanyard around
// the neck of any patient whose cervical spine has not been cleared but who is
// not in a collar, so that everyone downstream can see the status at a glance.
// Hatzolah carries no such item. The transferable content is the principle, not
// the hardware, so it appears here as a handover requirement — say out loud, and
// hand over explicitly, that the spine has not been cleared — rather than as an
// instruction to place something the responder does not have.
//
// JUDGEMENT CALL — the myotome examination from PROTOCOL R4 is carried in full.
// It is an examination, not an intervention: nothing in it needs a drug, a
// device or an authorisation Hatzolah lacks, and it turns "there is a deficit"
// into "the deficit begins at about this level", which is worth saying at
// handover. It sits alongside, not instead of, the Hatzolah motor and sensory
// checks in the main protocol.
export const spinalTrauma = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'CPG TR5 — Spinal Injuries',
      note: 'Viewed at clinical level: Paramedic, including the Clinical Management algorithm image',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/spinal-injuries',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL R4 — Spinal Cord, Sensory & Motor Examination',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/reference/page/spinal-cord-s-sensory-and-motor-examination',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'Reference Card 0055 — Spinal Emergency Evaluation of Deficits (SPEED) Assessment',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/reference/page/speed-assessment',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'Spinal Immobilisation Checklist',
      note: 'Checklists tab, viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/checklists/page/spinal-immobilisation-checklist',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.17 — Cervical Spine Immobilisation',
      note: 'Version 1.0.5 (28/10/2024), including the decision flowchart',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/cervical-spine-immobilisation-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.16 — Spinal Cord Injury',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/spinal-cord-injury-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'FCR 3.5 — Spinal Injury',
      note: 'First Co-Responder level — the closest published analogue to a first responder arriving before an ambulance',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/first-co-response-fcr/page/spinal-injury-fcr',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Antiemetic before immobilising',
      hatzolah:
        'Ondansetron ODT is given to every patient who meets any spinal immobilisation criterion, as prophylaxis for the immobilisation itself',
      external:
        'Prophylactic antiemetics are not routinely required for a patient with an immobilised spine. An antiemetic is considered only where the patient is already nauseated, where the nature of the injuries or the position the patient is being held in would make vomiting particularly dangerous, or where transport will be prolonged.',
      note: 'Hatzolah governs — give the ondansetron per the main protocol. The external reasoning is still worth carrying, because it names what the drug is actually protecting against: a patient held flat who cannot turn their own head is in real danger if they vomit.',
    },
    {
      field: 'Whether a collar goes on every immobilised patient',
      hatzolah:
        'Apply a cervical collar if ANY spinal immobilisation criterion is met',
      external:
        'One service does not place a firm collar routinely, even when the cervical spine cannot be cleared. It reserves the collar for significant posterior midline tenderness or for signs and symptoms of spinal cord injury, and otherwise restricts movement with head blocks, rolled towels or manual stabilisation. Its stated reasoning is that a collar limits neck movement but has no good evidence of reducing secondary cord injury, while it can worsen neck pain, promote pressure areas, make airway management harder and raise intracranial pressure.',
      note: 'Hatzolah governs — when the criteria are met, the collar goes on. Carry the harms forward as reasons to size and fit it properly, to keep the time in it as short as the job allows, and to keep looking at the airway and the skin underneath.',
    },
    {
      field: 'The patient with vertebral disease or abnormal spinal anatomy',
      hatzolah:
        'A history of vertebral disease or abnormality is itself a spinal immobilisation criterion, and meeting any criterion means applying a cervical collar',
      external:
        'Both services treat fixed spinal deformity as an exception rather than an indication. Where ankylosing spondylitis, rheumatoid arthritis, kyphosis, previous fusion or pain means the patient’s own resting alignment is not the supine neutral position, forcing a collar or forcing them flat can itself displace the spine. They support the patient in a position of comfort in their own anatomical alignment — which may mean sitting up with extra pillows — apply precautions as tolerated, and document the variation.',
      note: 'Hatzolah governs on WHETHER to immobilise: these patients are exactly the ones who sustain unstable injuries from small forces, and they still need precautions. The external guidance changes HOW. If the collar cannot be fitted without pulling the patient out of their own alignment, support the position of comfort, restrict movement by other means, and say so explicitly at handover.',
    },
  ],

  content: {
    scope: [
      'The aim of spinal injury care is to protect and support the integrity of the spinal column wherever spinal cord injury is suspected, or an unstable vertebral injury cannot be excluded.',
      'This applies to the whole spinal column — cervical, thoracic and lumbar — not just the neck. A collar addresses one segment of it.',
      'The decision is not "is the spine injured?" but "can I be confident it is not?". Everything below is a way of answering the second question.',
    ],

    whyItMatters: [
      'Outcomes after spinal cord injury are best when the cord is decompressed early in hospital, so the clock starts at the scene. Nothing a responder does fixes the injury; what a responder does is avoid making it worse and avoid delay.',
      'A reduction in blood flow to the cord causes further ischaemic damage on top of the mechanical injury. Shock, hypoxia and cold all work against the cord, which is why the primary survey outranks the collar.',
      'Maintaining an adequate airway and adequate breathing is far more important than spinal immobilisation. If the two conflict, the airway wins.',
      'Even where the spine is injured, gentle controlled movement will not cause further injury. Fear of moving a patient is not a reason to leave them face down, obstructed or in danger.',
    ],

    riskFactors: [
      'Mechanisms that raise the risk of spinal injury:',
      [
        'Axial loading — for example diving headfirst into shallow water',
        'Hyperflexion, hyperextension, lateral flexion or hyperrotation — for example a collapsed rugby scrum',
        'Road crash involving rollover or ejection',
        'A fall from significant height — more than about a metre, or more than five stairs in an adult, and particularly headfirst',
      ],
      'Patient factors that raise the risk:',
      [
        'Age — assess every patient aged 65 or over who has fallen, including a standing-height fall. The threshold is lowered to 50 years for Aboriginal and Torres Strait Islander patients, reflecting a higher burden of injury at a younger age',
        'Frailty',
        'Pre-existing cervical spine abnormality — ankylosing spondylitis, rheumatoid arthritis, spinal stenosis, cervical myelopathy, previous spinal fusion, previous cervical spine injury',
        'Any bone- or muscle-weakening disease',
      ],
      'These patients can sustain an unstable cervical injury from far less force than you would expect — a standing-height fall is enough. They warrant a high index of suspicion after trauma of any kind.',
    ],

    recognition: [
      'Signs and symptoms of spinal CORD injury:',
      [
        'Extreme pain or pressure in the neck, head or back',
        'Numbness, tingling, burning, or loss of or change in sensation in the hands or feet',
        'Weakness, or inability to move any part of the body',
        'Paralysis, which may be immediate or may develop over time as swelling and bleeding affect the cord',
        'Breathing difficulty',
        'Loss of bladder or bowel control',
        'Change in muscle tone — either flaccid or stiff',
        'Priapism',
        'Abnormal posturing',
        'Hypotension with a poor response to fluid, pronounced bradycardia, and temperature dysregulation — the picture of neurogenic shock',
      ],
      'Signs of spinal VERTEBRAL injury without cord involvement: pain or tenderness over or adjacent to the spinal vertebrae, with no neurological symptoms. This patient still has a potentially unstable spine.',
      'If you do not think about spinal cord injury, you will miss it.',
    ],

    clearingTheSpine: [
      'The cervical spine can be treated as clinically clear only if ALL of the following hold:',
      [
        'A normal level of alertness, and',
        'No complaint of pain in the midline of the cervical spine, and',
        'No tenderness to palpation at the posterior midline of the cervical spine, and',
        'No signs or symptoms of spinal cord injury, and',
        'No pain or other factor that might distract the patient from the pain of a cervical spine injury',
      ],
      'These criteria may be used in a child, provided the child is old enough to co-operate with a history and an examination.',
      'Immobilisation is also indicated — regardless of the examination — where the patient complains of spinal pain or discomfort at any point, or where communication is difficult (no English, a disability, a young child) and the mechanism makes spinal injury possible. A patient you cannot properly assess has not been cleared.',
      'Deciding whether pain is "distracting" is a clinical judgement. To count, the pain must be severe enough to stop the patient noticing that their neck is sore.',
      'Where alteration in conscious state is the question, one service sets the bar at GCS 14 or less.',
    ],

    assessment: [
      'Palpate the posterior cervical spine in the midline, from the base of the skull down to the prominence of the first thoracic vertebra. Tenderness in the lateral neck muscles is NOT a sign of cervical spine injury — only midline tenderness counts.',
      'Test sensation to light touch in all four limbs, and test movement in all four limbs.',
      'Use the patient’s own forehead as the reference for what normal sensation feels like to them, then compare.',
      'Test the left and right sides simultaneously, so you are comparing the two sides against each other rather than against your expectation.',
      'Weakness, or inability to perform a test, caused by a pre-existing injury or by anatomy is not a neurological deficit. In those patients, assess sensation and movement against that patient’s own normal ability.',
      'The external structured version of this examination tests four things, any abnormal finding counting as a neurological deficit:',
      [
        'Motor — ankle or toe movement, each side. Abnormal: none, or only slight movement',
        'Sensory — light touch to the heel, each side. Abnormal: none, or altered',
        'Confirmation of cervical cord injury — hand grip strength, each side. Abnormal: none, or altered',
        'Exclusion of high cervical injury — light touch at the suprasternal notch. Abnormal: none, or altered',
      ],
      'The suprasternal notch check is the one most easily forgotten and the one that matters most: a sensory level at the top of the sternum points to a high cervical injury, and that is the patient whose breathing is about to become the problem.',
      'Repeat the neurological examination AFTER applying spinal precautions, not only before. The collar and the packaging are themselves a handling event, and a deficit that appears afterwards is the finding that changes everything.',
      'Repeat it once more immediately before handover, so the receiving clinician gets a current result and a trend rather than a single old number.',
    ],

    neurologicalExamination: [
      'Both a sensory and a motor examination must be done. A patient can have motor damage without sensory damage and the reverse, so one normal examination does not excuse the other.',
      'Examine both sides, upper and lower limbs, hands and feet, using light touch and response to pain.',
      'The level at which weakness or absent movement is first noted is the level of the injury. Asking the patient to:',
      [
        'Shrug the shoulders — C4',
        'Abduct the shoulder — C5',
        'Bend the elbow, and extend the wrist — C6',
        'Straighten the elbow and the fingers — C7',
        'Spread the fingers apart — T1',
        'Flex the hip — L2 (L1/L2)',
        'Straighten the knee — L3',
        'Pull the foot up towards them — L4',
        'Lift the great toe — L5',
        'Push the foot down — S1',
      ],
      'For the thoracic and abdominal segments, look instead for activity of the intercostal and abdominal muscles.',
    ],

    unconsciousPatient: [
      'The examination above depends on a co-operative patient. In an unconscious patient, spinal cord injury is inferred from signs:',
      [
        'Paradoxical respiration — a patient who has lost intercostal function is relying on the diaphragm alone to breathe',
        'Flaccid limbs',
        'Loss of response to painful stimuli below the level of the lesion',
        'Loss of reflexes below the level of the lesion',
        'Penile erection in an unconscious male',
        'A low systolic blood pressure with a normal or slow pulse rather than the expected tachycardia',
      ],
      'An unconscious trauma patient who cannot be examined has not been cleared, and should be treated as though the spine is injured.',
      'If the patient is responding only to pain or is unresponsive, the airway takes priority: place them on their side with support, keep the airway open, keep the spine in neutral alignment with manual stabilisation of the head and neck, and give oxygen.',
      'If the patient is responding only to voice or is uncooperative, restrict spinal movement by instructing them to stay still and by manual stabilisation — but stop trying to hold the head if the attempt is making the agitation worse. A patient fighting your hands moves their neck more, not less.',
    ],

    immobilisationPrinciples: [
      'Position the patient with the spine in neutral alignment. If the spine is not aligned — a visibly angulated neck or back — align it immediately; a spine left bent is the position that keeps doing damage.',
      'Neutral alignment is not the same as flat. For most supine adults it needs roughly 3–4 cm of flat pillow, or one to two folded towels, behind the head; a patient with pre-existing kyphosis may need considerably more.',
      'A small child is the opposite case. Their head is relatively large, so lying flat pushes the neck into flexion — they may need padding under the thoracic spine instead of under the head.',
      'A firm collar can be replaced or supplemented by head blocks, rolled towels or a folded sheet either side of the head, or by manual stabilisation. Where a collar cannot physically be fitted — severe obesity, for instance — these are the alternatives, not nothing.',
      'Sitting the patient up to about 15 degrees for comfort is compatible with spinal precautions and is preferable to a patient who will not stay still lying flat.',
      'Patients with vertebral disease, kyphosis, pain, congestive cardiac failure, or injuries that prevent the supine neutral position should be supported in a position of comfort, with spinal precautions applied as tolerated and the variation recorded.',
      'Monitor for and actively prevent hypothermia. A patient with spinal cord injury may have lost autonomic control of their own temperature and will cool faster than you expect, and cold works against the injured cord.',
      'Do not place tape across the head or chin once the patient is on a stretcher. It does nothing useful for immobilisation and risks acting as a fulcrum that worsens the injury. Brief taping during extrication on a scoop or combi-carrier is a different matter and is acceptable.',
    ],

    whenImmobilisationIsNotRequired: [
      'Penetrating injury to the neck — cervical spine immobilisation is not required. A collar on a penetrating neck wound hides the wound, obstructs the airway assessment, and treats a mechanism that does not destabilise the column.',
      'Hanging — cervical spine immobilisation is not routinely required. Clinically significant cervical injury after hanging is extremely rare, and should only be considered where the patient fell a height at least equal to their own body height.',
      'A collar or other restriction is not required at all once the cervical spine has been cleared clinically.',
      'If the spinal criteria are all negative, spinal immobilisation is not indicated — treat the patient under whichever protocol their actual injury falls under.',
    ],

    handlingAndMovement: [
      'A patient who is co-operative, ambulant, not restricted by injury and has no neurological symptoms may self-extricate a short distance — a few steps — instructed to keep the head and neck as still as possible.',
      'Brief the self-extricating patient before they move: if any numbness, tingling, weakness, or new or worsening spinal pain develops, they are to stop, and another method will be used instead. The patient is the monitor here, so they need to know what they are monitoring for.',
      'Consider manual stabilisation during extrication from a vehicle, but it is not required for a co-operative patient who can extricate themselves and has been told to keep the head and neck still.',
      'Once the patient is on the stretcher, that is where they stay. Do not then ask them to walk, or to sit in a chair.',
      'When transferring from stretcher to bed, keeping the patient supine and using a slide or lifting device is preferred, particularly once a collar is on. A co-operative patient may move themselves across to an immediately adjacent bed if instructed to keep the head and neck still.',
      'Rigid boards, scoop stretchers and combi-carriers are extrication and moving devices. They do not themselves provide spinal immobilisation, and should not be relied on as though they do.',
      'Any of those devices will start causing pressure injury if the patient is left on one beyond about 30 minutes. If that is likely, get the patient off the device before transport begins where it is safe to do so, and make sure it comes out as soon as possible after arrival.',
      'A collar fitted by someone else before you arrived — a bystander, a first aider, another clinician — is not automatically correct. If the spine can be cleared, it should come off. If it cannot, follow the immobilisation pathway, which may mean replacing it. Explain the change collegially to whoever placed it and make clear to the patient that it is not a criticism of the care they have already had. If the conversation turns into a conflict, do not force it — leave the collar, get moving, and reassess en route.',
    ],

    neurogenicShockAndPerfusion: [
      'Loss of sympathetic outflow below the level of a cord injury leaves the patient vasodilated below that level. That is neurogenic shock, and it looks different from blood loss.',
      'The sympathetic nerve supply to the heart leaves the cord in the mid-thoracic region. An injury above that level can therefore block the heart’s ability to speed up — so the patient is shocked with a normal or slow pulse, and the reassuring tachycardia never appears.',
      'Blood flow to the injured cord depends on perfusion pressure, in exactly the way cerebral blood flow depends on cerebral perfusion pressure after head injury. Pressure around the cord is commonly raised after injury, so a fall in blood pressure translates directly into cord ischaemia and a worse outcome.',
      'Beyond the Hatzolah protocol, the external pathway supports blood pressure with intravenous fluid and then escalates to vasopressor drugs at paramedic level. Nothing in that arm is available to a Hatzolah responder. What is available is everything that stops the pressure falling further: control external bleeding, keep the patient warm and flat, handle them gently, give oxygen, and get the ambulance moving.',
      'Do not assume a shocked spinal patient is only in neurogenic shock. If they are deteriorating and blood loss is possible, that is the more urgent problem and it changes the destination.',
      'Inadequate breathing is uncommon after spinal cord injury and usually only occurs with a high cervical injury. Diaphragmatic breathing that is adequately oxygenated and not deteriorating is watched, not panicked over — but it is watched closely, because a rising injury level takes the diaphragm next.',
    ],

    cervicalCordNeuropraxia: [
      'Also called spinal shock or cervical cord concussion: a temporary loss of motor and/or sensory function that recovers over a few minutes to a few hours. It is caused by bruising or stretching of the cervical cord, and is often associated with hyperflexion or hyperextension of the neck.',
      'The patient usually has immediate symptoms in some combination of burning pain, numbness, tingling, weakness or paralysis. All four limbs are usually involved, but it may affect only some.',
      'Commonly there is no cervical fracture, and the patient may be completely symptom-free after recovering.',
      'There is a strong association with pre-existing cervical stenosis — narrowing of the canal the cord runs through — which often needs urgent surgery in its own right.',
      'This is the trap: the symptoms may have completely resolved before you arrive.',
      [
        'Record the history and pass it on. What the patient felt at the time is likely to change how they are investigated in hospital.',
        'Do NOT clear the cervical spine clinically, even though the patient now has no symptoms.',
        'The patient is transported to a hospital with CT scanning available.',
      ],
    ],

    disposition: [
      'A patient whose cervical spine has not been cleared clinically goes to an emergency department, by ambulance. This is not an assess-and-leave patient.',
      'Most patients with a possible cervical spine injury will need imaging and many will need a CT, so the receiving hospital should be one with CT available — particularly once a firm collar has been applied.',
      'Where the age of the patient after a simple fall is the ONLY concerning feature and nothing else is positive, the Hatzolah protocol’s Virtual ED route remains the pathway; the external guidance does not contradict it, it simply does not have an equivalent.',
      'Perform the neurological examination again immediately before handover, and hand over the result together with the earlier ones.',
      'State explicitly at handover that the spine has not been cleared. One service marks these patients physically so that the status cannot be lost between crews; the point that transfers is that "not cleared" must be said, not assumed.',
      'Where a collar could not be applied, or precautions had to be modified for the patient’s anatomy or comfort, hand over what was done and why.',
    ],

    safetyNetting: [
      'A deficit that appears after packaging is a change, not a baseline. If the patient reports new numbness, tingling, weakness or worsening spinal pain at any point, stop what you are doing and reassess.',
      'Paralysis after spinal injury can develop over time, as swelling and bleeding progress. A normal examination on scene does not rule out a cord injury an hour later, and is not a reason to relax the precautions.',
      'A patient who tolerated the position five minutes ago may not now. Keep checking the airway, the breathing, the skin under the collar and the patient’s temperature for as long as they are immobilised.',
    ],
  },
};
