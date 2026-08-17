// Extended ("full") protocol for Allergy (Mild), merged from the NSW Ambulance
// and St John NZ clinical practice guidelines.
//
// FIRST CONDITION PROTOCOL IN THIS TIER
// Everything else here is pharmacology. This one is a PATHWAY: the transferable
// value is in the steps and the disposition criteria, not in a drug.
//
// TWO DELIBERATE EXCLUSIONS - both would be actively unsafe to carry:
//
//   1. No antihistamine doses. Neither service stocks cetirizine: NSW carries
//      fexofenadine (180 mg) and St John NZ carries loratadine (20 mg adult,
//      10 mg for 1-11 years). Three different drugs, three different numbers.
//      Hatzolah's cetirizine dose stands alone and is in the main protocol.
//
//   2. No steroid step. St John NZ adds prednisone or prednisolone alongside the
//      antihistamine when itch comes with a rash. Hatzolah carries NO steroids
//      at all, so that step is not merely a different dose - it is a drug the
//      responder does not hold and is not authorised to give. Omitted entirely
//      rather than shown as a difference, because there is no Hatzolah position
//      for it to differ from.
//
// What IS carried is the pathway material Hatzolah's protocol does not state:
// St John NZ's four criteria for when immediate referral is not required, and
// NSW's positioning and transport rules once adrenaline has been given.
export const allergyMild = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M16 — Anaphylaxis and Allergic Reactions',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/anaphylaxis-and-allergic-reactions',
      retrieved: '2026-08-17',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 12.4 — Minor Allergy',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/page/minor-allergy-eas',
      retrieved: '2026-08-17',
    },
  ],

  differences: [
    {
      field: 'When immediate referral is not required',
      hatzolah: 'Monitor for 30 minutes for deterioration or improvement, consider VVED, and leave the patient with a responsible third party plus GP follow-up advice',
      external: 'Four conditions must ALL hold before advising that immediate referral is not required: no signs of systemic involvement, no signs of spreading inflammation, no intraoral swelling of concern, and no adrenaline given — including self-administration.',
      note: 'Not a conflict. The Hatzolah CPG sets the observation period and the safety-netting; it does not state criteria for the decision itself, and these are compatible with it.',
    },
    {
      field: 'A patient who has already used their own adrenaline',
      hatzolah: 'Not addressed in the mild allergy protocol',
      external: 'Any adrenaline given, including by the patient before you arrived, rules the patient out of the minor allergy pathway. Such patients must not stand or walk, must be kept supine, and must be transported by stretcher.',
      note: 'Treat as anaphylaxis and follow the Hatzolah Anaphylaxis protocol.',
    },
  ],

  content: {
    scope: [
      'Covers minor allergic reactions confined to skin involvement, including reactions to bites and stings.',
      'Allergic reactions run from mild urticaria through to anaphylaxis with major respiratory or cardiovascular compromise. The mild pathway applies only while involvement stays confined to the skin.',
    ],

    recognition: [
      'Mild to moderate reaction — swelling of the lips, face or eyes; hives or welts; tingling mouth; vomiting; abdominal pain.',
      'Any one or more of the following point to anaphylaxis instead, and the mild pathway no longer applies:',
      [
        'Difficult or noisy breathing',
        'Swelling or tightness in the throat',
        'Wheeze or persistent cough',
        'Difficulty talking, or a hoarse voice',
        'Swelling of the tongue',
        'Persistent dizziness or collapse',
        'Pale and floppy, in a young child',
        'Persistent abdominal pain and vomiting after exposure to a likely allergen',
      ],
      'The signs of a mild to moderate reaction are not always present in anaphylaxis — their absence does not reassure.',
      'Abdominal pain and vomiting are specific signs of anaphylaxis where the trigger was an injected medicine, an insect bite or a sting.',
    ],

    assessment: [
      'Perform a full primary survey on any patient with a suspected allergic reaction, to catch life-threatening features early. Some patients need immediate intervention to stop deterioration.',
      'Take a history of exposure to known allergens — medicines, food, insect bite or sting. Symptoms in the context of a known allergen make allergy more likely, but the absence of a known allergen does not exclude allergy or anaphylaxis.',
      'If in doubt, treat as anaphylaxis.',
    ],

    disposition: [
      'A patient may be treated and advised that immediate referral to a medical facility is not required, provided ALL of the following hold:',
      [
        'No signs of systemic involvement',
        'No signs of spreading inflammation',
        'No intraoral swelling of concern',
        'No adrenaline has been given, including any the patient self-administered',
      ],
    ],

    ifAdrenalineHasBeenGiven: [
      'A patient showing signs of anaphylaxis, or who has had adrenaline at any point — whether given by a responder or self-administered before arrival — must not be allowed to stand or walk at any time. Fatality can occur within seconds if such a patient suddenly stands or sits up.',
      'Position the patient supine to improve venous return. If breathing is difficult they may sit with their legs outstretched, and must then be watched for signs of hypotension.',
      'Transport to hospital by stretcher.',
    ],
  },
};
