// Extended ("full") protocol for Glucagon, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply. Both services carry glucagon itself —
// the same drug, not a substitute — so both sheets were read and merged.
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
// Hatzolah records no precautions ("Nil"), and neither external guideline lists a
// caution either — one states "None" outright and the other has no precautions
// section at all. There is therefore no `cautions` section; it is omitted rather
// than padded. Hatzolah's single contraindication is an authorisation gate (the
// responder must be accredited to give IM glucagon) rather than a clinical one, so
// it is not restated here; the one clinical contraindication either service
// records — known severe allergy — sits under contraindications.
//
// JUDGEMENTS MADE
// - Anaphylaxis. One service also uses glucagon for anaphylaxis with hypovolaemia
//   persisting after fluid, by a different route and dose at a higher practice
//   level. Hatzolah does not mention this use at all, so it is an addition rather
//   than a conflict and stays in the body — flagged plainly as an intravenous
//   advanced-practice use so it can never be read as the IM hypoglycaemia dose.
// - Onset and duration. The two services quote different figures for the same
//   quantities (onset 4-7 vs 5-10 minutes; duration 11-30 vs 15-60 minutes). These
//   are the same measurements with different spreads, so they are given as one
//   combined range per route rather than a column per service.
// - The paediatric weight-banded dose table in the NZ medicine calculator was not
//   transcribed: its own medicine sheet states the dose by age, and mixing an
//   age rule with a weight rule would invite a boundary error.
export const glucagon = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'Pharmacology 208',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/glucagon',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.15',
      note: 'App content version 1.1.0.7 (03/08/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/glucagon-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Age threshold between the 1 mg and the 0.5 mg dose',
      hatzolah: '1 mg IM from 8 years; 0.5 mg IM under 8 years',
      external:
        'The same 1 mg / 0.5 mg split is used, but one service draws the boundary at 5 years and the other at 16 years.',
      note: 'Follow Hatzolah. Noted because a child between 5 and 16 falls in a different band under each guideline.',
    },
    {
      field: 'When glucagon is used',
      hatzolah: 'BGL < 4 mmol/L and the patient is not responding, or cannot swallow safely',
      external:
        'Both services also require that intravenous access could not be obtained — glucagon is the fallback when the patient cannot be cannulated for IV glucose, not an equal alternative to it.',
      note: 'Follow Hatzolah. Recorded because the external guidelines place glucagon second-line behind IV glucose.',
    },
  ],

  content: {
    indications: [
      'Hypoglycaemia — a blood glucose below 4 mmol/L with a reduced level of consciousness, where the patient cannot safely swallow glucose or food and intravenous access cannot be obtained.',
      'Anaphylaxis where hypovolaemia persists after a fluid load has been given. This is a separate intravenous use, not the intramuscular hypoglycaemia dose:',
      [
        '2 mg IV as a single dose in a patient aged 16 or over, with no repeat.',
        'Restricted to specified paramedic practice levels above the one that covers the intramuscular hypoglycaemia dose.',
      ],
    ],

    contraindications: ['Known severe allergy to glucagon.'],

    administration: [
      'Supplied as a 1 mg vial of powder with a syringe containing 1 mL of sterile water.',
      'Reconstitute immediately before use — add the entire contents of the syringe to the vial and dissolve the powder fully. The solution must be made up immediately prior to administration, not in advance.',
      'Give as a single intramuscular injection. The preferred site is the lateral thigh, which absorbs best; if that site is unsuitable use the lateral upper arm.',
      'The subcutaneous route is an accepted alternative at the same dose.',
      'One dose only — there is no repeat dose.',
      'Once the patient has recovered enough to swallow safely, give food. The dose consumes the glycogen stores it acted on, and those stores need refilling.',
    ],

    onsetAndDuration: [
      'Intramuscular or subcutaneous — onset 4 – 10 minutes, peak effect at 8 – 10 minutes, effect lasting roughly 11 – 60 minutes.',
      'Intravenous — onset about 1 minute, peak at 5 minutes, effect lasting 22 – 25 minutes.',
    ],

    adverseEffects: [
      'Nausea and vomiting.',
      'Allergic reactions, which occur rarely.',
    ],

    interactions: ['No common interactions are recorded.'],

    mechanismAndPharmacokinetics: [
      'A pancreatic hormone. It raises the blood glucose by driving glycogenolysis — the breakdown of stored glycogen into glucose — predominantly in the liver.',
      'It can only mobilise glycogen that is actually there, so it may be ineffective where stores are already depleted, for example by starvation or chronic liver disease.',
      'Excreted predominantly unchanged into bile and urine. A single acute dose is not significantly affected by liver or kidney impairment.',
    ],

    furtherNotes: [
      'Expect a poor or absent response wherever glycogen stores are likely to be empty:',
      [
        'The patient is not diabetic.',
        'Sepsis.',
        'A young child.',
        'After strenuous exercise.',
        'No food for more than 12 hours.',
        'Adrenal insufficiency.',
        'Chronic hypoglycaemia.',
        'Alcohol-induced hypoglycaemia.',
      ],
      'Glucagon also reduces the tone and motility of gastrointestinal smooth muscle, but it is not recommended for oesophageal obstruction.',
      'It is sometimes suggested for the bradycardia of beta-blocker poisoning, because it stimulates cardiac cells by a pathway that does not use the beta receptor. In practice it has almost no place out of hospital: it rarely adds a sustained rise in heart rate on top of adrenaline, and the doses required are far larger than those carried on an ambulance.',
    ],
  },
};
