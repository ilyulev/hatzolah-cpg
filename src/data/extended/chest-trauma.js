// Extended ("full") protocol for Chest Trauma, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE
// NSW Ambulance PROTOCOL T6 (Chest Injuries), read at clinical level Paramedic.
// T6 is a page of prose plus a Treatment flowchart drawn as a graphic; the
// flowchart was read from the rendered image (assets/images/info/T6.png), not
// from the page text, because the page text carries only the prose preamble.
// The same was done for PROTOCOL T8 (Penetrating Trauma), which is a flowchart
// and nothing else, and PROTOCOL T1 (Prehospital Management of Major Trauma) was
// read for its chest-specific triage criteria.
// St John NZ has NO chest-injury guideline. Its material on the subject is split
// across three EAS guidelines - Tension Pneumothorax (4.18), Bleeding following
// Trauma (4.23), which is where its open-chest-wound rule actually lives, and
// Major Trauma Triage and Transport (4.2). All three were read at EAS level to
// match the emergency-response setting and the NSW Paramedic level.
//
// WHY THIS PROTOCOL IS WORTH EXTENDING
// The Hatzolah protocol for chest trauma is five lines: position, oxygen,
// analgesia, don't cover open chest wounds, don't splint. It is correct and it is
// fast, but it says nothing about WHAT a responder is looking at. It does not
// name flail chest, open pneumothorax or tension pneumothorax; it does not say
// why a rib fracture is dangerous rather than merely painful; and it gives no
// reason for either of its two prohibitions. Both external services explain all
// of that, and none of the explanation needs a drug or a procedure outside
// first-responder practice. That reasoning is the whole value of this entry.
//
// SCOPE EXCLUSIONS - what was deliberately left out
//
//   1. Chest decompression in every form. Needle thoracostomy, finger
//      thoracostomy, dedicated decompression devices, insertion sites, and the
//      placement of an endotracheal tube into a thoracostomy wound. This is the
//      single largest block of content in both services' guidelines and none of
//      it is a Hatzolah procedure. What IS carried is RECOGNITION of tension
//      pneumothorax, because recognising it and naming it at handover is exactly
//      what a responder contributes; the pathway is then described only as
//      escalating to the attending paramedic service.
//
//   2. Every drug the external pathways reach for. Dissociative-dose ketamine
//      before thoracostomy, IV cefazolin after it, tranexamic acid, metaraminol
//      infusions, prehospital blood. None of these is in the Hatzolah formulary.
//      Analgesia is discussed only as a principle - that pain relief in rib
//      fracture is a breathing intervention, not a comfort measure - with no drug
//      named and no dose anywhere in this file. Hatzolah's own analgesia
//      protocols carry the drugs and the numbers.
//
//   3. Airway and ventilation beyond BVM - RSI, intubation, and the rule that
//      decompression should precede IPPV. The fact that positive-pressure
//      ventilation is when tension pneumothorax typically appears IS carried,
//      because a responder bagging a chest-injured patient needs to know it.
//
//   4. IV fluid resuscitation volumes and endpoints. Normal saline is in Hatzolah
//      scope at Senior Responder level, but every volume figure in the external
//      guidelines belongs to that service's fluid protocol. Carried only as the
//      principle that large crystalloid volumes worsen bleeding.
//
//   5. Helicopter tasking, staging at non-trauma facilities, critical haemorrhage
//      code activation, and both services' named hospital lists and permitted
//      transport times. These are jurisdictional dispatch decisions, not clinical
//      ones, and Melbourne's destinations are neither service's. The general
//      principle - a major-trauma patient goes to a designated trauma service
//      rather than the nearest hospital - is carried; the geography is not.
//
//   6. NSW's numeric major-trauma triage thresholds (respiratory rate, oxygen
//      saturation, heart rate, blood pressure, GCS) and its age cut-offs for the
//      high-risk groups. Hatzolah's Time Critical Guidelines already publish its
//      own table and the two do not agree on every figure - systolic blood
//      pressure and the elderly age boundary in particular. Printing a second set
//      of numbers beside Hatzolah's is the precise failure mode this tier exists
//      to avoid, so only the chest-specific QUALITATIVE criteria are carried.
//
//   7. The NSW target oxygen saturation for chest injury. The oxygen entry in
//      this tier has already settled the saturation question, holding one
//      service's target in its own differences[] so it cannot be mistaken for the
//      number to work to. A third figure introduced here would undo that, so the
//      target is named as a concept and the reader is sent to the Hatzolah
//      numbers.
//
// JUDGEMENT CALL - the open chest wound
// This is the one place the three services genuinely conflict, and the conflict
// is recorded in differences[] rather than smoothed over. The body of this file
// carries only the reasoning the three share: that any seal over an open chest
// wound can convert it into a tension pneumothorax. That reasoning supports the
// Hatzolah rule, and the Hatzolah rule governs.
export const chestTrauma = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T6 — Chest Injuries',
      note: 'Viewed at clinical level: Paramedic. Treatment flowchart read from the rendered protocol graphic.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/chest-injuries',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T8 — Penetrating Trauma',
      note: 'Viewed at clinical level: Paramedic. The protocol is a flowchart graphic only.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/penetrating-trauma',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T1 — Prehospital Management of Major Trauma',
      note: 'Viewed at clinical level: Paramedic. Read for the chest criteria in the Trauma Triage Tool.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/prehospital-management-of-major-trauma',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.18 — Tension Pneumothorax',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/tension-pneumothorax-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.23 — Bleeding following Trauma',
      note: 'Version 1.0.5 (28/10/2024). Carries the open-chest-wound rule.',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/bleeding-following-trauma-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.2 — Major Trauma Triage and Transport',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/major-trauma-triage-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Covering an open ("sucking") chest wound',
      hatzolah:
        'Do NOT cover open chest wounds, unless there is a life-threatening bleed',
      external:
        'Both services cover the wound, and they disagree with each other about how. One directs that the wound be covered and taped on three of its four sides, with the cover removed to let air escape if signs of tension pneumothorax then develop. The other directs a purpose-made chest seal device, or a plain dressing if no seal is available, and states explicitly that an improvised three-sided valve dressing must not be attempted because it is rarely effective — and that a wound must never be sealed with anything not designed for the job, such as a defibrillation pad, because that risks a tension pneumothorax.',
      note: 'A real conflict, and the two external services do not agree with each other either. The Hatzolah rule governs: leave the wound open unless the bleeding itself is life-threatening. What all three agree on is the danger — a seal over an open chest wound can turn it into a tension pneumothorax, and any covering that has been applied must come straight off if the patient starts to deteriorate.',
    },
  ],

  content: {
    scope: [
      'Covers blunt and penetrating injury to the chest wall and the structures beneath it, and the two in combination.',
      'Injuries to the chest wall are significant contributors to death from major trauma. Life-threatening injuries may not be apparent when you first look, so the mechanism of injury has to guide how hard you go looking for them.',
      'The most common problem in severe chest injury is hypoxia — either because ventilation is impaired, or secondary to blood loss.',
    ],

    recognition: [
      'Four injury patterns account for most of what a responder will meet, and each behaves differently:',
      [
        'Tension pneumothorax — a pneumothorax under enough pressure to obstruct the return of blood to the heart. See the section below; this is the one that kills fastest.',
        'Open ("sucking") chest wound — a chest wall wound that is drawing air or visibly bubbling, with evidence of an underlying pneumothorax.',
        'Rib fractures — extremely painful, and the pain makes the patient reduce their own respiratory effort to compensate. Fractures may be the result of significant force, so they also flag possible damage to the lungs, heart, liver, kidneys or spleen underneath.',
        'Flail chest — two or more rib fractures in two or more places. The sign is a chest segment moving independently of the rest of the chest during breathing (paradoxical movement).',
      ],
      'Rib fracture pain suppressing respiratory effort is especially relevant in elderly patients.',
      'Chest findings that mark a patient as major trauma: suspicion of multiple rib fractures, severe pain, a restraint abrasion or contusion, or any evidence of blunt impact. Crepitus of the chest wall and subcutaneous emphysema count as well.',
      'Patients may be combative or anxious because they are hypoxic and showing early signs of shock. Correcting the underlying condition takes priority over managing the behaviour.',
    ],

    tensionPneumothorax: [
      'Suspect it in any patient with chest injury whose respiratory or cardiovascular function is deteriorating rapidly.',
      'Signs to look for:',
      [
        'Progressively worsening shock — the defining feature. If the patient does not have progressively worsening shock, they do not have a tension pneumothorax.',
        'Progressively worsening breathlessness, escalating to extreme respiratory distress',
        'Absent or decreased breath sounds, on one side or on both',
        'Hypotension',
        'Difficulty ventilating the patient, or inability to ventilate them at all',
        'A significant fall in oxygen saturation',
        'Subcutaneous emphysema',
        'Distended neck veins — a direct consequence of blood being unable to return to the right heart',
        'Tracheal deviation away from the affected side',
      ],
      'Two of those signs are unreliable and must not be waited for. Tracheal deviation is an extremely late sign, requiring very high pressure inside the chest, and is rarely seen. Distended neck veins are not always evident where there are tension pneumothoraces on both sides, or where the patient is also severely hypovolaemic.',
      'Recognising it and naming it — on the radio and at handover — is the responder contribution here. Decompression is a procedure of the attending paramedic service and is outside first-responder practice.',
    ],

    whyTensionDevelops: [
      'Air enters the pleural space with each breath and cannot get out again, because the tear in the pleura acts as a one-way valve. Pressure inside the chest climbs with every breath until it exceeds the venous pressure in the vena cavae. Blood return to the right heart then falls progressively, and cardiac arrest follows if it is not relieved. It is a cause of obstructive shock, not of blood loss — which is why the shock worsens steadily rather than in step with any bleeding you can see.',
      'Tension pneumothorax is uncommon. It develops in only a small subset of patients who have a pneumothorax, and usually in those receiving positive pressure ventilation — so a chest-injured patient being ventilated with a BVM is precisely the patient in whom to watch for it.',
      'A pneumothorax without tension is common after trauma and does not usually require any intervention before hospital.',
    ],

    openChestWounds: [
      'Any seal placed over an open chest wound can convert it into a tension pneumothorax, because air entering the pleural space then has no route out.',
      'If a dressing has been applied — by a bystander, by another service, or because bleeding demanded it — and the patient begins to show signs of tension pneumothorax, remove the cover immediately and let the air escape.',
      'Improvised valve dressings taped on three sides are rarely effective, and materials not designed for the purpose, such as a defibrillation pad, must never be used to seal a chest wound.',
      'Hatzolah’s own rule stands: do not cover an open chest wound unless the bleeding itself is life-threatening.',
    ],

    flailChest: [
      'Flail segments should not be immobilised — the external guidance agrees with the Hatzolah prohibition on splinting a chest injury.',
      'The priority is maintaining ventilation, supported by analgesia to reduce the pain that is suppressing it.',
      'Flail chest is a criterion for transport to a major trauma service in its own right.',
    ],

    painAndBreathing: [
      'In chest injury, analgesia is a breathing intervention, not a comfort measure. Relieving the pain lets the patient take deeper breaths, which improves ventilation and oxygenation and reduces the risk of hypoxia.',
      'Doses and drug choice come from the Hatzolah analgesia protocols. Nothing here changes them.',
    ],

    oxygenAndMonitoring: [
      'Monitor oxygen saturation and assess actively for signs of hypoxia; do not rely on the number alone.',
      'The external pathway gives high-flow supplemental oxygen titrated to a target saturation. Use the Hatzolah figures — the non-rebreather flow rate in this protocol, and the saturation target in the Hatzolah oxygen guidance — not another service’s.',
      'Repeat and document the ABCD examination and the observations regularly — not once. The purpose is to identify trends, clinical deterioration, and any response to treatment. A single set of normal observations after a significant chest impact proves nothing.',
      'An abnormal respiratory rate or oxygen saturation, cyanosis or respiratory difficulty, a raised heart rate or a low blood pressure at any point, a reduced GCS, and any worsening trend across ABCD are all major-trauma criteria in their own right. The trend counts as much as the single value.',
    ],

    penetratingInjury: [
      'Minimise time on scene and provide treatment en route. For penetrating chest trauma this is not a preference — treatment happens en route, not on scene.',
      'Do not remove an impaled object. Transport the patient with the object in situ. Occasionally the protruding end has to be carefully cut down to allow the patient to be moved.',
      'Penetrating injury to the neck or torso is a criterion for transport to a major trauma service.',
      'Urgent transport is essential for patients with penetrating injuries and for those in respiratory distress.',
    ],

    bleeding: [
      'Control life-threatening external bleeding immediately with manual external pressure. An arterial tourniquet is a limb device — the guidelines reach for it only where life-threatening bleeding from a limb is not easily controlled by pressure.',
      'Bleeding inside the chest cannot be compressed, splinted or dressed. For penetrating truncal trauma with signs of severe shock, expediting transport IS the treatment, and it matters most when the transport time is short.',
      'Keep the patient warm and provide active external warming wherever it is feasible. Hypothermia worsens bleeding by contributing to coagulopathy — and a trauma patient exposed for examination gets cold fast.',
      'Large volumes of intravenous crystalloid can also worsen bleeding by contributing to coagulopathy, which is why fluid volumes are minimised and titrated to perfusion rather than run in freely.',
    ],

    disposition: [
      'Every one of these is a criterion for transport to a designated major trauma service rather than the nearest hospital: respiratory distress, shock, flail chest, penetrating injury to the neck or torso, a manageable airway obstruction, or major injuries to more than one body region.',
      'Consider a major trauma destination even where the patient does not clearly meet criteria, if there are significant additional risk factors — severe pain, a high-risk mechanism such as ejection from a vehicle, or a patient factor such as pregnancy.',
      'Mechanism alone triages poorly, but the force involved still has to be weighed. Mechanism combined with a high-risk group is a far stronger indicator of major trauma than either on its own.',
      'High-risk groups: the very young and the elderly, pregnant patients, anyone on anticoagulant or antiplatelet medication or with a clotting disorder, patients with significant co-morbidities, and patients who are difficult to assess — including where language is a barrier.',
      'Older patients respond differently to trauma. Their observations may sit outside the usual parameters, or may fail to reflect how badly they are injured because of medication, a history of hypertension or co-morbidity. Low-impact mechanisms such as a ground-level fall can still produce severe injury.',
      'Do not delay transport waiting for a higher clinical level to arrive — rendezvous en route instead.',
      'Notify the receiving hospital early, preferably before leaving the scene.',
      'The numeric criteria for time-critical status are Hatzolah’s own — use the Time Critical Guidelines, not another service’s table.',
    ],
  },
};
