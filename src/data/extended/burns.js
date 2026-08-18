// Extended ("full") protocol for Burns, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE
//   NSW Ambulance PROTOCOL T12 (Burns), read at clinical level Paramedic. The
//   treatment pathway, the significant-burn criteria, the assessment box, the
//   cooling and care options and the Rule of 9's chart are published only as
//   graphics on that page, so they were read from the rendered images rather
//   than the text layer - the same discipline the v6.2 content pipeline uses.
//   NSW Ambulance PROTOCOL T14 (Electric Shock) was read as well, because the
//   Hatzolah protocol names electrical injury in its definition of a burn and
//   then says nothing further about it. T14's flowchart is also a graphic.
//   NSW Ambulance PROTOCOL T25 (Inhalation Injuries), for the same reason: the
//   Hatzolah protocol treats "airway burns" as one thing, and T25 separates
//   thermal airway injury from inhalation injury, which behave differently.
//   St John NZ CPG EAS 4.4 (Burns), version 1.0.5 (28/10/2024).
//
// WHY THIS PROTOCOL IS WORTH EXTENDING
// The Hatzolah protocol is a good action list - safety, airway burns, oxygen,
// cool for 20 minutes, warm, cover, escalate. What it does not give is any
// method for the two assessments it asks for ("Burns surface area", "Partial
// thickness OR Full thickness"), anything about chemical decontamination,
// anything about electrical injury beyond naming it, and no explanation of why
// a shocked burns patient is a warning sign. All of that is pathway material a
// first responder can act on, and all of it is what this tier adds.
//
// SCOPE EXCLUSIONS - deliberately left out, and why:
//   1. Burns fluid resuscitation. Both services give intravenous fluid by burn
//      area with their own volumes and triggers, and NSW's agent (compound
//      sodium lactate) is not in the Hatzolah formulary at all. Normal saline
//      is - but the burns resuscitation regimen and its numbers are not, and
//      the Hatzolah protocol has no fluid step to attach them to. The topical
//      use of saline to irrigate and cool a burn is kept, because that is a
//      dressing action and carries no dose.
//   2. Rapid sequence intubation and advanced airway management for airway
//      burns. Where the external pathway reaches it, the text here says only
//      that airway control escalates to paramedic level - which is a reason to
//      move, not a technique to attempt.
//   3. Nebulised adrenaline for stridor. Hatzolah carries adrenaline by
//      intramuscular injection and Epi-Pen only; there is no nebulised route.
//   4. Every analgesic in NSW's Pain Management (A6) pathway. The Hatzolah
//      protocol already routes analgesia to its own Pain Relief (Non Cardiac)
//      protocol, and that is where the drugs and doses belong.
//   5. St John NZ's instruction not to give magnesium or steroids for
//      post-inhalation bronchospasm. Hatzolah holds neither, so the
//      instruction has nothing to attach to - it is not a difference, it is
//      simply absent.
//   6. Critical Care Paramedic backup, helicopter response and transport
//      criteria, named burn centres and major trauma hospitals, the NSW Burns
//      Patient Transport Cascade and the Sydney Matrix. Service geography and
//      resources Hatzolah does not dispatch. The clinically transferable half -
//      which burns need specialist burn care, and which do not need it urgently -
//      is kept.
//   7. Cardiac dysrhythmia management and 12-lead ECG interpretation after
//      electric shock. Acquiring an ECG is in scope for an accredited
//      responder; reading it and treating the rhythm is not.
//   8. NSW's A10 disposition process and P5 referral paperwork.
//
// JUDGEMENT CALLS
// - The Rule of 9's percentages are carried. They are an assessment method, not
//   a dose, the Hatzolah protocol asks for burn surface area without saying how
//   to measure it, and both services publish the same hand-print rule alongside
//   it. The infant column is given separately because the adult chart does not
//   apply to a small child.
// - NSW's airway mnemonic HISSCA is carried even though Hatzolah lists its own
//   airway-burn signs, because the two lists agree and a mnemonic is easier to
//   recall under load. Hatzolah's list stays authoritative; HISSCA is a way to
//   hold it.
// - Electrical injury and inhalation injury are given their own sections rather
//   than folded into the burn. The Hatzolah protocol names both as causes of a
//   burn but manages neither, and both can kill through a mechanism that has
//   nothing to do with the skin.
export const burns = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T12 — Burns',
      note: 'Viewed at clinical level: Paramedic. Treatment pathway, significant-burn criteria, assessment box and Rule of 9’s read from the published flowchart graphics.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/burns',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T14 — Electric Shock',
      note: 'Viewed at clinical level: Paramedic. Potential-injuries table read from the published flowchart graphic.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/electric-shock',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T25 — Inhalation Injuries',
      note: 'Viewed at clinical level: Paramedic. Key diagnostic factors and exclusion criteria read from the published flowchart graphic.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/inhalation-injuries',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.4 — Burns',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/page/burns-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'How long to cool the burn',
      hatzolah:
        'Cool with clean running water for 20 minutes — including any cooling done before Hatzolah arrived. Do NOT continue cooling after 20 minutes. Stop early if the temperature drops below 35°C.',
      external:
        'Cool for AT LEAST 20 minutes, and there is still benefit in cooling a burn up to three hours after the injury. Cooling is shortened only where it threatens the patient — it is acceptable to cut it short for burns over 40% if that risks clinically significant hypothermia.',
      note: 'Follow Hatzolah. Twenty minutes and stop is the Hatzolah rule, and the Hatzolah protocol also counts cooling already done by bystanders towards it. The external position is useful only as reassurance that cooling started late is not wasted — not as licence to keep going past the Hatzolah limit.',
    },
    {
      field: 'Who gets oxygen',
      hatzolah: 'Oxygen by non-rebreather at 10–15 L, regardless of SpO2, for every burns patient.',
      external:
        'Oxygen is given selectively — for suspected carbon monoxide poisoning after clinically significant smoke inhalation, and at high concentration for suspected inhalation injury, aiming for the maximal achievable SpO2. There is no routine oxygen step for a burn without airway or inhalation involvement.',
      note: 'Follow Hatzolah. The Hatzolah rule is broader and simpler, and it is the one a Hatzolah responder is authorised to apply.',
    },
    {
      field: 'Which burns must be escalated',
      hatzolah:
        'Any partial thickness OR full thickness burn — of any size — gets a SitRep to Hatzolah dispatch and an ambulance. Any airway burn is Time Critical.',
      external:
        'Significant burn criteria are set at TBSA over 10% in children and over 20% in adults, plus special areas, inhalation injury, trauma, circumferential burns, pregnancy in the 2nd or 3rd trimester, electrical or chemical burns, and the very young or very old. Specialist burn-centre transport is triggered above 10% in adults and 5% in children.',
      note: 'Follow Hatzolah. Those percentages decide which burns need a specialist burn service — they do NOT decide whether an ambulance is needed. A 3% partial thickness burn sits below every external threshold and still gets an ambulance under the Hatzolah protocol.',
    },
  ],

  content: {
    scope: [
      'Covers burns caused by heat, cold, electricity, gases, chemicals, friction and radiation.',
      'The aim of treatment is to stop the burning process, cool the burn, dress it, manage pain, and manage the other injuries and conditions the same event has caused. The burn is often not the thing that kills the patient.',
    ],

    sceneSafety: [
      'After an electrical injury, do not approach the patient until the electricity supply has been turned off and you are certain it is safe. Where the supply cannot be confirmed off, the electrical authority is contacted through the control centre before anyone approaches.',
      'Remove all clothing and decontaminate the patient where the burn is due to chemical exposure — the chemical goes on burning while it is in contact with skin or fabric.',
      'The method of decontamination or irrigation must avoid cross-contaminating an uninjured part of the patient, another patient, or yourself.',
    ],

    airwayInvolvement: [
      'NSW carries the signs of airway involvement as HISSCA, which is the same list the Hatzolah protocol gives, in a form that is easier to hold under load:',
      [
        'Hoarse voice',
        'Inspiratory stridor',
        'See-saw breathing',
        'Singed facial or nasal hair',
        'Carbonaceous material around the mouth, nose or in the sputum',
        'Anterior burns to the neck',
      ],
      'St John NZ adds two more: a burn involving the inside of the mouth or nose, and loss of nasal hair.',
      'True airway burns are direct thermal injury to the airway. They require the patient to have been enclosed in a small space — a car, for example — or exposed for a significant period, such as being trapped in a house fire. That is why the enclosed-space question in the Hatzolah protocol matters as much as the visible signs.',
      'Superficial flash burns to the face — from lighting a barbecue, or lighting a fire with an accelerant — are common, look clinically alarming, and are usually NOT associated with airway burns. Patients in this setting rarely need advanced airway intervention.',
      'Where signs of airway involvement are present the external pathway does not wait: transport urgently and continue treatment and cooling en route. Do not stay on scene to complete a 20-minute cool on a patient whose airway is closing.',
      'Where there are immediate concerns for the airway, airway control escalates to paramedic-level advanced airway management. Both services say to have a low threshold for seeking clinical advice rather than working it out alone on scene.',
    ],

    inhalationInjury: [
      'Inhalation injury is not the same thing as an airway burn. It is damage to the respiratory tract or lung tissue from heat, smoke or chemical irritants carried into the airway on inspiration, and it occurs when lung tissue is affected by the chemicals within smoke.',
      'It works through four mechanisms, which is why one patient can have several problems at once:',
      [
        'Direct thermal injury — dry air holds little heat, so the heat is dissipated in the upper airway and causes swelling there. Steam is different: its high residual heat cannot be dissipated by the upper airway, so steam can injure the lower airway as well.',
        'Asphyxiation — high concentrations of inert gases displace oxygen. Absorbed tissue asphyxiants such as carbon monoxide and hydrogen cyanide go further and disrupt cellular oxygen transport, with prolonged metabolic effects.',
        'Systemic toxic effects — many absorbed gases cause systemic toxicity and inflammation.',
        'Direct injury to the airway lining — gases and particulate matter kill airway cells, causing bronchoconstriction, swelling, sloughing, reduced airway clearance and obstruction.',
      ],
      'Signs of inhalation injury include hypoxia, respiratory distress, bronchospasm and black sputum. Other common findings are cough, dyspnoea, hoarseness, headache, dizziness, tachypnoea, facial burns, upper airway oedema, stridor, wheeze, crackles, tachycardia, hypotension and seizures.',
      'Two things make it more likely: any known inhalation exposure, regardless of how intense or how brief; and the same symptoms appearing in other people who were at the site.',
      'A single event usually means several toxic inhalations at once. Take a detailed history of what happened, including the duration and the intensity of the exposure.',
      'Some effects are delayed by several hours — non-cardiogenic pulmonary oedema is the example given. A patient who looks well now is not therefore safe, and every patient with suspected inhalation injury needs hospital assessment, treatment and monitoring.',
      'Give oxygen where carbon monoxide poisoning is suspected after clinically significant smoke inhalation, and monitor the airway continuously for developing compromise.',
      'Bronchospasm following inhalation injury is usually NOT responsive to bronchodilators. They may still be given on the Hatzolah asthma pathway, but expect a poor response — and treat that poor response as evidence of the severity of the injury, not as a reason to keep repeating doses on scene.',
      'Findings that close off any non-transport option and mandate an emergency department:',
      [
        'A history of closed-space entrapment, or prolonged exposure',
        'A history of syncope',
        'Any HISSCA sign',
        'Bronchospasm or wheeze',
        'Facial thermal or chemical burns',
      ],
      'Altered level of consciousness, hypoventilation or hyperventilation make the transport urgent.',
    ],

    assessingBurnDepth: [
      'Estimate burn depth only AFTER cooling is complete. A burn assessed while it is still hot will be judged wrongly.',
      'Superficial — also called epidermal, of which severe sunburn is the example. No blisters; red and painful.',
      'Partial thickness — also called dermal. Blisters, weeping fluid, painful.',
      'Full thickness — charred, white, leathery, and usually painless. Painlessness is a sign of depth, not of a minor injury.',
    ],

    estimatingBurnSize: [
      'Estimate burn size only AFTER cooling is complete.',
      'Do NOT include superficial or epidermal burns, or simple erythema, in the estimate. Counting them is the commonest way a burn is over-reported.',
      'The preferred method is the patient’s own hand: a piece of paper cut to the size of their hand INCLUDING the fingers represents 1% of total body surface area. Because the measure is the patient’s own hand, it scales to a child without any correction.',
      'The Rule of 9’s is the alternative chart. For an adult, front and back are counted separately:',
      [
        'Head — 4.5% front, 4.5% back',
        'Chest 9%, abdomen 9%; upper back 9%, lower back 9%',
        'Each arm — 4.5% front, 4.5% back',
        'Each leg — 9% front, 9% back',
        'Genitalia — 1%',
      ],
      'An infant is not a small adult and the adult chart does not apply: head 18%, torso 18% front and 18% back, each arm 9%, each leg 14%.',
      'It is very easy to overestimate burn size. Where the estimate is driving a decision, measure it with the hand method rather than eyeballing it.',
    ],

    cooling: [
      'Cool with cool — not ice-cold — running water. Never use ice, ice water or ice packs on a burn.',
      'Cool at the scene, unless there is an immediately life-threatening problem found in the primary survey. Cooling loses to the airway, and to nothing else.',
      'Cooling still has benefit up to three hours after the injury, so cooling that starts late is not wasted. This does not extend the Hatzolah 20-minute limit — see the differences above.',
      'Where running water is not available, the alternatives are:',
      [
        'Submerge the burn in clean water, or use a soaked burns dressing, refreshing the water in the dressing every 2–3 minutes',
        'Irrigate the burn area directly with sterile normal saline',
        'A spray bottle, or moist towels, as the Hatzolah protocol already allows',
      ],
      'A hydrogel burn dressing is a substitute only when water is not available, and only for burns of 20% or less in adults and 10% or less in children. It is not applied routinely once effective cooling has been achieved, unless the indication persists.',
      'Burn gels do provide some analgesia, but they are NOT a substitute for 20 minutes of cool running water. Where a gel is used for pain, it goes on after cooling is complete.',
      'Cool the burn but keep the PATIENT warm. Watch for hypothermia during cooling, particularly in a small child or with a large burn — this is the same trap the Hatzolah temperature rule guards against.',
    ],

    chemicalBurnsAndDecontamination: [
      'Brush or remove dry chemical off the skin BEFORE any water goes near it. Water on a dry chemical can start the reaction.',
      'Chemical burns, particularly from liquid-based acids, may need significantly longer irrigation than a thermal burn.',
      'The most appropriate decontamination is a shower of about three minutes — an ordinary domestic shower is acceptable and is usually the fastest thing available.',
      'Where heat has not been involved, the burn does not need cooling, and the shower water should preferably be WARM.',
      'Do not decontaminate a patient with burns using a high-pressure shower — the pressure can worsen the burn.',
      'Avoid decontamination with a fire service hose, even on low pressure, unless it is the only option: it is likely to make the patient hypothermic. A fire service low-pressure decontamination unit is acceptable if one is immediately available, but decontamination must not be delayed waiting for it to arrive.',
      'Chemical burns of the eye are potentially vision-threatening. Irrigate for at least 30 minutes.',
      'A chemical eye burn is NOT time critical for transport. It is the irrigation that changes the outcome, so irrigation should happen at the scene wherever that is feasible rather than being cut short to travel.',
      'Irrigate in a way that cannot wash contaminant into the uninjured eye.',
      'Do NOT apply clear plastic film or cling wrap to a chemical burn.',
    ],

    burnAreaCare: [
      'Remove jewellery and burnt, tight or wet clothing — unless it is stuck to the skin, in which case leave it. Get rings off before swelling makes that impossible.',
      'Elevate the burnt area to reduce swelling.',
      'Dressing a burn is not a priority, but it does make the burn less painful.',
      'Apply clear plastic film longitudinally over the burn, once cooling is complete. Apply it in a manner that will NOT restrict swelling of the burn surface and the surrounding tissue — loosely, and never circumferentially tight.',
      'Keep the patient warm and do not let them shiver.',
    ],

    electricalInjury: [
      'The Hatzolah protocol names electrical injury as a cause of a burn and then leaves it. It behaves very differently from a thermal burn, and the external guidelines explain why.',
      'The severity of an electrical injury is set by three things: the amount and type of current (alternating or direct), how long the patient was in contact with it, and which tissues the current travelled through.',
      'Most domestic supply in Australia is alternating current at 220–240 volts. Direct current is found on industrial sites, in vehicle electrical systems and batteries, and in lightning strikes. The distinction matters: direct current causes a single violent contraction that throws the patient clear of the source, while alternating current causes tetany that clamps the patient onto it and prolongs the exposure.',
      'There are three separate presentations, and a patient can have all three: direct injury from the current itself; thermal injury as electrical energy converts to heat passing through the body; and mechanical injury from violent muscle contraction — sprains, strains, tears, fractures — and from the fall.',
      'A patient may have significant muscle and nerve damage along the path of the current even when the external burn looks small. Do not size the injury by the skin.',
      'What to look for, by system:',
      [
        'Cardiac — dysrhythmias and cardiac arrest (direct current usually asystole, alternating current usually VF), sinus bradycardia, high-degree AV block, direct cardiac injury, ischaemia and hypotension',
        'Respiratory — respiratory arrest from diaphragm paralysis, tetanic contraction, or central nervous system inhibition',
        'Burns — entrance and exit wounds, arc and flame burns, and in lightning injury the fern-like Lichtenberg figures on the skin',
        'Neurological — altered level of consciousness, memory problems, generalised weakness, autonomic dysfunction, respiratory depression, hypoxic encephalopathy, intracerebral haemorrhage, cerebral infarction, and hearing loss from ruptured ear drums',
        'Renal — kidney failure from myoglobin released by damaged muscle, and from generalised hypotension',
        'Musculoskeletal — fractures and dislocations from falls and forceful tetany, and muscle oedema and tissue necrosis leading to compartment syndrome and rhabdomyolysis',
      ],
      'Continuous cardiac monitoring is required after an electrical injury because a dysrhythmia may develop later. Any patient with a reduced level of consciousness after exposure must be monitored continuously. Acquire a 12-lead ECG if accredited to do so.',
      'An abnormal ECG, or trauma such as entry and exit wounds or burns, rules the patient out of any non-transport pathway entirely.',
      'A patient with a burn following an electrical injury needs a major trauma hospital even if the burn area is small.',
      'Treat the other injuries the shock caused — spinal, limb, chest, wounds — on their own protocols. The burn is often the least of them.',
    ],

    significantBurnCriteria: [
      'Any one of the following makes the burn significant:',
      [
        'Inhalation injury, other trauma, or a circumferential burn',
        'Total burn surface area over 10% in children, or over 20% in adults',
        'Burns to special areas — face, hands, feet, genitalia, perineum, anus, and major joints',
        'A woman in the 2nd or 3rd trimester of pregnancy',
        'An electrical or chemical burn',
        'Burns in the very young or the very old',
      ],
      'All infants and children with burns should be transported for further assessment, whatever the burn looks like.',
    ],

    fluidLossAndShock: [
      'Shock from fluid loss following a burn takes SEVERAL HOURS to develop.',
      'If a patient with burns is shocked in front of you, that shock is almost certainly not from the burn. Look for another cause — bleeding, another injury from the same event, a medical cause. This is one of the most useful single facts in the burns literature and the Hatzolah protocol does not state it.',
    ],

    disposition: [
      'Airway involvement — transport urgently, treat and cool en route.',
      'Suspected inhalation injury — hospital assessment for everyone, because the effects can be delayed by hours.',
      'Electrical injury with a burn — major trauma level care even for a small burn.',
      'Burns over 10% of TBSA in an adult, or over 5% in a child, need specialist burn-centre care.',
      'Burns to the face, hands or genitals may also need specialist burn care — but where the burn is under 10% in an adult or under 5% in a child, that care is NOT usually time sensitive. Those patients can be assessed at the most appropriate hospital first and transferred later if required.',
      'A chemical burn to the eye is not time critical for transport; the irrigation is the treatment.',
      'A burn patient who also meets major trauma criteria goes to major trauma care, not to a burns service — the trauma takes precedence.',
      'None of this alters the Hatzolah rule that any partial or full thickness burn gets an ambulance.',
    ],

    monitoring: [
      'Repeat and document ABCD examination and physiological observations regularly, so that trends, clinical deterioration and response to treatment are visible rather than guessed at from a single set.',
      'The airway is the observation that matters most and the one most likely to change: swelling after a thermal airway injury develops over time, so a normal voice now is not a guarantee.',
    ],
  },
};
