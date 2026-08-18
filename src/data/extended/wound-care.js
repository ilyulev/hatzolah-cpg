// Extended ("full") protocol for Wound Care, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE
// NSW PROTOCOL T18 carries almost all of its content as a flowchart graphic
// rather than text, so the exclusion list, the assessment and treatment block
// and the cautions were read off the rendered image, not the text layer. NSW
// PROTOCOL R34 was pulled in as well because T18 assesses every skin tear with
// the STAR classification and simply names it; the Hatzolah protocol manages
// skin tears without a grading system, so R34 is the substantive addition here.
//
// SCOPE EXCLUSIONS - what was deliberately left on the other side of the fence:
//
//   1. No wound closure. Both services close wounds on scene - NSW via an
//      Extended Care Paramedic, St John NZ via ECP backup that can be requested
//      to the scene, with a photo sent ahead to help the decision. Suturing,
//      stapling and gluing are not Hatzolah procedures. Closure therefore
//      appears in this file only as something to refer FOR, never to do.
//
//   2. No antibiotic. St John NZ gives an IV antibiotic for a large
//      contaminated wound. Hatzolah holds no antibiotic, so the step is not a
//      different dose - it is a drug the responder does not carry. Omitted
//      whole, not shown as a difference, because Hatzolah has no position on it.
//
//   3. No tetanus vaccine administration. Both services can arrange or give
//      prophylaxis; Hatzolah refers for it. The referral trigger and the
//      24-hour window are carried, the injection is not.
//
//   4. Irrigation fluids trimmed to what Hatzolah holds. NSW also permits
//      compound sodium lactate; only clean running water and sodium chloride
//      0.9% are carried through.
//
// JUDGEMENT CALL - bites. NSW makes a mammal or human bite an automatic ED
// transport; St John NZ routes it to primary care instead. The two externals
// disagree with each other, so rather than tag them separately this file takes
// the conservative reading, which is also the one closest to Hatzolah - a bite
// needs to be seen. The destination and the 2-hour window stay with the main
// Hatzolah protocol.
export const woundCare = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T18 — Wound Care',
      note: 'Viewed at clinical level: Paramedic. Treatment block and exclusions read from the protocol flowchart graphic.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/wound-care',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL R34 — STAR Classification',
      note: 'Viewed at clinical level: Paramedic. The skin tear grading system T18 assesses against.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/reference/page/star-classification',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.21 — Wounds',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/wounds-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Adhesive strips and tapes on a wound',
      hatzolah: 'Adhesive wound tape (Steri-Strips, 6 × 100 mm) is one of the three dressings supplied',
      external: 'NSW instructs that adhesive dressings — Opsite, Steri-Strips and the like — are not to be applied to any wound. St John NZ says wound tape or strips should usually be avoided on a skin tear, and considered only when the skin edges are otherwise difficult to hold in place.',
      note: 'Hatzolah governs — the strips are carried and the Hatzolah protocol stands. Read the external caution as a reason to prefer realignment plus a non-stick dressing wherever that alone will hold the edges, rather than as a ban.',
    },
    {
      field: 'Time window for wound closure',
      hatzolah: 'A clean wound requiring closure (sutures or glue) should be reviewed within 8 hours at a PPCC or ED; a wound is "fresh" up to 8 hours after injury',
      external: 'Both services set the window at 6 hours — NSW says wounds less than 6 hours old may be suitable for primary closure, and St John NZ says wounds requiring closure should usually be closed within six hours of injury.',
      note: 'Hatzolah governs at 8 hours. The practical effect of the shorter external window is that the sooner the referral happens, the more likely closure is still to be offered — so do not treat 8 hours as time in hand.',
    },
    {
      field: 'Covering an abrasion or puncture',
      hatzolah: 'Abrasions — keep dry and leave open to air unless actively bleeding or deep. Punctures — keep dry, leave open or apply a dry dressing.',
      external: 'St John NZ states as a dressing principle that covered wounds heal faster than uncovered wounds, and that wounds which are moist (but not wet) heal faster than dry wounds, including advice to keep a large graze moist during healing.',
      note: 'Hatzolah governs the on-scene decision. The external principle is about healing over days and is worth knowing when giving aftercare advice, but it does not change what the Hatzolah protocol tells you to leave the patient with.',
    },
    {
      field: 'Which wounds count as tetanus-prone',
      hatzolah: 'Any wound other than a clean, minor cut is treated as tetanus prone',
      external: 'St John NZ defines a tetanus-prone wound more narrowly — contaminated, or caused by a dirty or rusty object.',
      note: 'Hatzolah governs, and its trigger is the broader of the two. Do not use the narrower external definition to talk yourself out of a tetanus referral.',
    },
  ],

  content: {
    scope: [
      'Covers minor wounds — lacerations, abrasions and skin tears. Many minor wounds and simple lacerations can be managed safely outside an emergency department, provided the risk factors below have been excluded.',
      'Does not cover a wound that is more than minor, one associated with a compound fracture, or severe bleeding. Those follow the trauma and haemorrhage pathways instead.',
      'A chronic wound needing only a dressing change or further assessment can go to a community wound care service where one exists, provided managing the patient outside the ED is clinically appropriate.',
    ],

    assessment: [
      'Compress external bleeding first.',
      'Assess sensation, movement and blood supply in the area of the wound and distal to it.',
      'Clean or irrigate the wound thoroughly to remove foreign material, so that the wound can actually be assessed. Copious amounts of fluid may be required.',
      'Irrigate whenever the wound is visibly contaminated or was caused by a dirty object, and make sure all visible foreign material is removed.',
      'On irrigation technique:',
      [
        'Several minutes of irrigation is usually required.',
        'The volume of irrigating fluid matters more than what the fluid is, provided it is clean.',
        'Clean running water or sodium chloride 0.9% may both be used.',
      ],
      'Assess a skin tear against the STAR classification below.',
      'Have a low threshold for recommending a medical facility if the wound cannot be adequately decontaminated.',
    ],

    transportToEd: [
      'Any one of the following takes the patient out of the manage-and-refer pathway and into an emergency department:',
      [
        'Penetrating wound, or a wound of unknown depth',
        'Potential involvement of deep structures, including nerves and tendons',
        'Loss of function or sensation, at the wound or distal to it',
        'Signs of distal ischaemia, or acute peripheral ischaemia from vascular damage',
        'Significant tissue loss, tissue damage or crush injury',
        'Foreign material that cannot be removed, or contamination that cannot be cleared',
        'Signs of infection — local, or with systemic involvement',
        'Involvement of the eyes or mucosal surfaces',
        'Cosmetic or functional implications — face, hands, or wounds over joints',
        'Pre-tibial laceration',
        'Scalp wound in a patient on an anticoagulant or antiplatelet',
        'Bite — mammal, including human',
        'History of complicated wound healing, from diabetes or immunosuppression',
        'Acute wound involving more than one body region',
        'A child under two years old whose wound requires closure',
        'Suspicion of non-accidental injury',
      ],
    ],

    referralWhereEdIsNotRequired: [
      'Where none of the above applies, the outcome is a referral rather than a transport — a GP, an urgent or primary care service, or an area wound care service where one exists.',
      'Recommend assessment in primary care if any of the following are present:',
      [
        'The wound requires closure that cannot be achieved on scene',
        'Signs of infection without systemic involvement',
        'Tetanus prophylaxis is required',
        'A skin tear whose edges cannot be aligned — as soon as possible',
      ],
      'Have a low threshold for recommending the patient is seen at a medical facility if they have significant comorbidities or are immunosuppressed. Advanced years and immunosuppression both make a patient susceptible to infection and to complications from delayed wound healing.',
    ],

    closure: [
      'Closure is not a first responder procedure. Where a wound needs closing, the job is to control bleeding, clean and dress it, and get the patient to someone who can close it.',
      'Wounds requiring closure — sutures, staples or glue — should usually be closed within six hours of injury.',
      'Wounds to the face, hands, feet, genitals, or over joints may require specialist treatment. Seek clinical advice if you are unsure which facility the patient should be assessed at.',
    ],

    dressing: [
      'There is no evidence that any one form of dressing is better than another, but these principles are useful:',
      [
        'Covered wounds heal faster than uncovered wounds.',
        'Wounds that are moist, but not wet, heal faster than dry wounds.',
        'The wound should be clean before it is dressed.',
        'The skin edges should be dry and aligned before they are dressed.',
        'Wherever possible the part of the dressing sitting directly over the wound should be non-stick. If gauze is being used because nothing non-stick is available, it must be moistened before it goes on.',
      ],
      'Build the dressing in two layers:',
      [
        'Primary dressing — non-adhesive, directly against the wound.',
        'Secondary dressing — padding and protection over the top, bandaged firmly. Then confirm that distal perfusion remains intact.',
      ],
      'Large grazes are difficult to dress. Advise the patient to keep the graze moist during healing where possible.',
    ],

    skinTears: [
      'A skin tear is a traumatic wound caused by shearing force separating the layers of skin, occurring principally on the extremities of older adults. They are an important cause of morbidity in the elderly.',
      'Partial thickness separates the epidermis from the dermis. Full thickness separates both the epidermis and the dermis from the underlying structures.',
      'A linear skin tear is a split in a straight line. A flap skin tear is a segment of skin, or skin and underlying tissue, separated from the structures beneath.',
      'Attempt realignment as soon as possible, using a clean technique — replace the flap into its normal anatomical position without undue stretching. Sterile forceps help where available.',
      'Dress it so the flap survives:',
      [
        'The dressing immediately over the involved skin must be non-stick.',
        'Add a second dressing that holds the non-stick layer and the underlying skin gently — but not tightly — in place. A bandage over a non-stick dressing does this.',
        'Draw an arrow on the dressing showing the direction of the skin flap, so that whoever removes it knows which way to take it off without tearing the flap again.',
      ],
      'If the skin edges cannot be aligned, the patient needs to be seen — preferably in primary care — as soon as possible.',
    ],

    starClassification: [
      'Grade a skin tear on two things: whether the edges can be put back where they belong, and the colour of the skin or flap.',
      [
        '1a — edges can be realigned to the normal anatomical position without undue stretching; skin or flap is not pale, dusky or darkened',
        '1b — edges can be realigned without undue stretching; skin or flap IS pale, dusky or darkened',
        '2a — edges cannot be realigned to the normal anatomical position; skin or flap is not pale, dusky or darkened',
        '2b — edges cannot be realigned; skin or flap IS pale, dusky or darkened',
        '3 — the skin flap is completely absent',
      ],
      'Pale, dusky or darkened is judged against the patient’s own surrounding skin. It may indicate ischaemia — inadequate tissue perfusion — or a haematoma collecting under the flap, either of which threatens whether the flap will survive.',
      'That is why colour is graded separately from alignment: a flap you can lay back perfectly is still in trouble if it has lost its blood supply.',
    ],

    tetanus: [
      'Tetanus is a life-threatening disease caused by an exotoxin released by the bacterium Clostridium tetani, which is commonly found in soil. That is why contamination and dirty or rusty objects are what make a wound tetanus-prone.',
      'Clearly recommend that a patient with a tetanus-prone wound is seen at a medical facility for tetanus prophylaxis within 24 hours if their immunisation status is unknown, or their last tetanus immunisation was more than five years ago.',
    ],

    cautions: [
      'Do not apply chlorhexidine directly to any wound.',
      'Regularly repeat and document ABCD physical examination and physiological observations, to identify trends, clinical deterioration, or response to treatment.',
    ],

    safetyNetting: [
      'Advise the patient and any caregivers to keep the area dry.',
      'Advise follow-up in primary care.',
      'If wound tape or strips have been used, instruct the patient not to attempt to remove them.',
      'If a dressing becomes stuck around a skin tear, the arrow drawn on it tells the next person which direction to remove it in — say so, rather than leaving them to find it.',
    ],
  },
};
