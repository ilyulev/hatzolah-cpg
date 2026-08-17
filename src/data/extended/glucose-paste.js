// Extended ("full") protocol for Glucose Paste / Glucose Gel, merged from the NSW
// Ambulance and St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply.
//
// DRUG IDENTITY
// Both services carry this exact drug, each under the name "Glucose Gel": oral
// glucose monohydrate gel, presented as a 40% tube or a sachet. Both services also
// carry Glucagon, and one carries Glucose 10% for intravenous use — different drugs
// or different preparations that play the same clinical role. Nothing from those
// pages is used here.
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice rather than quoted per
// service, and carry no inline "(NSW)" / "(NZ)" tags. Where both services make the
// same point in different words it is written once; where they cover different
// ground the points are combined into a single readable statement. Provenance
// lives on the source chips at the top of the view and in `sources` below, which
// is the level at which it is useful - a responder wants the information, not a
// citation on every line. Nothing here is invented: every statement traces to one
// or both guidelines, and anything that disagrees with the Hatzolah CPG is left
// out of the body and recorded in `differences` instead.
//
// CONTRAINDICATION vs CAUTION
// The services classify the swallowing requirement differently: one records no
// contraindications at all and folds "conscious enough to swallow safely" into its
// indication, while the other holds a reduced level of consciousness or an altered
// gag reflex as a contraindication. The Hatzolah CPG decides: it holds the
// inability to swallow safely as a CONTRAINDICATION, so the material sits there
// only. Neither service records a caution.
//
// ONSET AND DURATION
// The two services state onset as "5 - 10 minutes" and "within 15 minutes". That is
// the same quantity described with different precision, so it is given as one
// combined range rather than a figure per service. Only one service states a
// duration of effect; the other records it as not applicable.
//
// ADVERSE EFFECTS
// One service records no common adverse effects and the other names Wernicke's
// encephalopathy in thiamine-deficient patients. These are not in conflict - the
// first speaks to COMMON effects and the second to a rare precipitant in one
// population - so both are kept in the body rather than treated as a difference.
export const glucosePaste = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'Pharmacology 205',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/glucose-gel',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.16',
      note: 'Emergency Ambulance Service medicine. The page carries no version or revision date.',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/glucose-gel-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Repeat dose and maximum',
      hatzolah: '15 g by mouth, no repeat — 15 g is the total dose.',
      external:
        'A second 15 g dose may be given after 15 minutes, to a maximum of 30 g; alternatively a 10 – 20 g sachet is repeated every ten minutes for as long as hypoglycaemia persists or recurs.',
      note: 'Follow Hatzolah. The external services allow repeat dosing that the Hatzolah CPG does not.',
    },
    {
      field: 'Blood glucose threshold in the newborn',
      hatzolah: 'BGL < 4 mmol/L, stated for all ages.',
      external:
        'Under 28 days of age the threshold is < 2.6 mmol/L; < 4 mmol/L applies from 28 days onwards.',
      note: 'Follow Hatzolah. Noted because the external threshold is the more restrictive one in the first four weeks of life.',
    },
  ],

  content: {
    indications: [
      'Hypoglycaemia — a blood glucose level below 4 mmol/L — in an adult or child who is conscious enough to swallow safely.',
      'Hypoglycaemia in a neonate.',
    ],

    contraindications: [
      'A reduced level of consciousness, or an altered or absent gag reflex — the patient must be awake enough to swallow safely.',
    ],

    cautions: ['None recorded.'],

    administration: [
      'Give by mouth. Presentations differ between brands: a 37.5 g tube of 40% glucose gel contains 15 g of glucose, and a sachet typically contains 10 – 20 g.',
      'In a baby or small child the gel can be spread on the gums, the tongue and the inside of the cheeks, delivered in small aliquots from a gloved finger, with the patient watched closely for a response.',
      'Record the approximate number of grams of glucose given.',
    ],

    onsetAndDuration: ['Onset 5 – 15 minutes.', 'Effect lasts 30 – 60 minutes.'],

    adverseEffects: [
      'No common adverse effects.',
      'A glucose load may precipitate Wernicke’s encephalopathy in a patient with chronic alcohol use and thiamine deficiency.',
    ],

    interactions: ['None.'],

    mechanismAndPharmacokinetics: [
      'Glucose monohydrate presented as a hypertonic sugar gel for oral use. Glucose is the principal energy source for the body’s cells, and especially for the brain; the gel supplies it in a form that is easily swallowed and rapidly absorbed.',
      'Absorbed from the stomach and the small intestine, then rapidly metabolised by cells.',
    ],

    furtherNotes: [
      'Safe in pregnancy and while breastfeeding, and should be given if indicated.',
      'Glucose gel needs no additional authorisation to administer — it is available to all personnel at the base practice level.',
    ],
  },
};
