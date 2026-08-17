// Extended ("full") protocol for Aspirin, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply. Both services carry aspirin under its
// own name, so nothing here is borrowed from a different antiplatelet: NSW
// Ambulance Pharmacology 218 and St John NZ CPG EAS 14.6. St John NZ also
// publishes an Extended Care Paramedic aspirin guideline (CPG ECP 11.5); the
// emergency ambulance (EAS) guideline is the one used here, to match the
// emergency-response setting and the NSW Paramedic clinical level.
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice rather than quoted per
// service, and carry no inline "(NSW)" / "(NZ)" tags. Where both services make the
// same point in different words it is written once; where they cover different
// ground the points are combined into a single readable statement. Provenance
// lives on the source chips at the top of the view and in `sources` below.
// Nothing here is invented: every statement traces to one or both guidelines, and
// anything that disagrees with the Hatzolah CPG is left out of the body and
// recorded in `differences` instead.
//
// CONTRAINDICATION vs CAUTION
// The services classify bleeding differently: one holds any active, suspected or
// known bleeding tendency as a contraindication, the other holds a known bleeding
// disorder and clinically significant bleeding as cautions where the balance of
// risk usually favours giving aspirin anyway. The Hatzolah CPG decides: it holds
// bleeding disorders and actively bleeding peptic ulcers as CONTRAINDICATIONS, so
// the bleeding material sits there only and the balance-of-risk wording is
// recorded in `differences` rather than in the body.
//
// ONSET AND DURATION
// The two figures for duration are two different quantities and are given as such:
// one guideline states the duration of the drug's direct effects (3 - 6 hours), the
// other the duration of the antiplatelet effect (3 - 5 days, because platelets are
// impaired for their whole lifespan). The onset figures genuinely differ - 2 - 10
// minutes against 30 - 60 minutes - so both are carried, with the 30 - 60 minutes
// identified as the point at which the antiplatelet effect is established, which is
// what that guideline states. The Hatzolah CPG gives no onset or duration figures.
export const aspirin = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'Pharmacology 218',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/aspirin',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.6',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/aspirin-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Minimum age',
      hatzolah: '300 mg orally from 11 years of age',
      external: 'Aspirin is contraindicated under 16 years, and the 300 mg dose applies from 16 years',
      note: 'Follow Hatzolah. Noted because the external limit is the more restrictive one for adolescents; the other guideline sets no lower age limit at all.',
    },
    {
      field: 'Bleeding disorders',
      hatzolah: 'Bleeding disorders and actively bleeding peptic ulcers are contraindications',
      external: 'A known bleeding disorder or clinically significant bleeding is treated as a caution, on the basis that aspirin increases the risk of bleeding but the balance of risk usually still favours giving it',
      note: 'Follow Hatzolah — do not give it. The two external guidelines disagree with each other here; the other also holds any active, suspected or known bleeding tendency as a contraindication.',
    },
    {
      field: 'Further dose when the patient has already taken aspirin',
      hatzolah: 'No repeat. Maximum total dose 300 mg.',
      external: 'A further 300 mg of dispersible aspirin is given if the patient swallowed enteric-coated aspirin without chewing it, or if it is unclear what they took',
      note: 'Follow Hatzolah — the total stays at 300 mg.',
    },
  ],

  content: {
    indications: [
      'Acute coronary syndrome — myocardial ischaemia, including STEMI.',
    ],

    contraindications: [
      'Known severe allergy or hypersensitivity to aspirin.',
      'Active, suspected or known bleeding tendency.',
      'Third trimester of pregnancy.',
      'Patients meeting major trauma triage criteria.',
    ],

    cautions: [
      'Known worsening of bronchospasm with NSAIDs. Some patients with asthma or COPD react this way to NSAIDs, aspirin included; weigh the balance of risk, and withhold aspirin where there is a clear history of significant bronchospasm with NSAIDs.',
      'Pregnancy. Aspirin may cause harm, and clinically important myocardial ischaemia is so unlikely in a pregnant woman that the balance of risk usually favours withholding it.',
      'Breastfeeding. Aspirin may be given, but advise the patient to stop breastfeeding and to seek further advice from their lead maternity carer or GP.',
    ],

    administration: [
      'Give 300 mg orally. The usual preparation is a 300 mg dispersible tablet, which may be chewed and swallowed with a small amount of water, or dissolved in water.',
      'Establish what the patient has already taken — many people have enteric-coated aspirin at home rather than dispersible tablets.',
      [
        'Enteric-coated aspirin is not destroyed by chewing and is absorbed, though it is quite unpleasant to chew and swallow.',
        'If the patient has already chewed and swallowed 300 mg, enteric-coated tablets included, no further aspirin is needed.',
        'Swallowing enteric-coated tablets whole, without chewing, delays absorption.',
        'If tablets are still in the patient’s mouth, ask them to spit them out.',
      ],
    ],

    onsetAndDuration: [
      'Onset after an oral dose is reported at 2 – 10 minutes, with the antiplatelet effect usually established by 30 – 60 minutes.',
      'The drug’s direct effects last about 3 – 6 hours.',
      'The antiplatelet effect lasts 3 – 5 days. Platelets exposed to aspirin are impaired for their whole 7 – 10 day life, and only about 10% of platelets are replaced each day.',
    ],

    adverseEffects: [
      'Increased bleeding — any existing bleeding tendency is aggravated and bleeding takes longer to stop.',
      'Allergic reactions, ranging from urticaria, rhinitis and asthma to angioneurotic oedema, laryngeal oedema and shock. Always check for a history of a previous reaction before giving it.',
      'Gastric irritation. Indigestion, gastrointestinal ulceration and gastrointestinal bleeding are commonly listed as adverse effects, but they are associated with long-term use and are unlikely to be significant after a single tablet.',
    ],

    interactions: [
      'Aspirin displaces warfarin from its binding sites and increases warfarin’s activity. The effect is most prominent with chronic administration, and aspirin is still indicated for a patient taking warfarin who has clinically significant myocardial ischaemia.',
    ],

    mechanismAndPharmacokinetics: [
      'Aspirin (acetylsalicylic acid) has antiplatelet, antipyretic, anti-inflammatory and analgesic effects. Out of hospital it is given only for its antiplatelet activity.',
      'It inhibits the enzyme cyclooxygenase, reducing the formation of prostaglandins and thromboxane. This inhibits platelet aggregation and so limits thrombus enlargement in acute coronary syndrome; the fall in prostaglandin production is also what relieves pain and fever.',
      'Absorption occurs in the stomach and small intestine. Food in the stomach delays absorption, but not usually to a clinically significant degree.',
      'Metabolism is predominantly hepatic, and liver impairment has no significant effect on a single acute dose.',
    ],

    furtherNotes: [
      'Regular daily use of aspirin, warfarin, or both is not in itself a reason to withhold the dose.',
      'Renal failure is not a contraindication, although the urea of renal failure also impairs platelet function.',
      'Emergency call takers routinely instruct callers with suspected myocardial ischaemia to take aspirin before the crew arrives, so some patients who turn out not to be ischaemic will already have taken a dose. The risk to those patients is extremely low, against the benefit to those who are ischaemic.',
    ],
  },
};
