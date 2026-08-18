// Extended ("full") protocol for Hypoglycaemia, merged from the NSW Ambulance
// and St John NZ clinical practice guidelines.
//
// PROVENANCE
// NSW: PROTOCOL M21 and its treatment flowchart (the flowchart is a graphic, so
// it was read from the rendered image, not from the page text). St John NZ:
// CPG EAS 5.3, whose "additional information" section carries most of the
// teaching material here. The NSW page was read directly at its own URL; no
// clinical level was selected, so `note` on that source says so rather than
// claiming a level that was never chosen.
//
// SCOPE EXCLUSIONS - what was deliberately left out
//
//   1. The intravenous glucose preparation. Both services treat the unconscious
//      or unable-to-swallow patient with intravenous glucose FIRST, and reach
//      for intramuscular glucagon only when a cannula cannot be placed. That
//      preparation is not in the Hatzolah formulary and the branch is not a
//      Hatzolah pathway, so it is described in general terms under
//      `ifThePatientCannotSwallow` and carries no drug detail and no numbers.
//
//   2. Every dose figure. No gram or milligram figures appear anywhere here,
//      including for glucose gel and glucagon, which Hatzolah does carry. The
//      Hatzolah dosing table is the only place those numbers belong. The one
//      exception in spirit is the list of everyday food equivalents under
//      `treatingWithOralGlucose` - those are descriptions of food, not a dose of
//      a formulary medicine, and they are what makes the advice usable when no
//      gel is to hand.
//
//   3. The glucagon paediatric age boundary. Both services draw it in a
//      different place from Hatzolah. That belongs to the drug, not the pathway,
//      and is already recorded in the extended Glucagon entry; repeating it here
//      next to the condition protocol's own table would invite a boundary error.
//
//   4. Helicopter response and transport tasking (NZ), and NSW's service-wide
//      disposition guideline and its "generic exclusions" - a transport-decision
//      framework for an ambulance service, not a hypoglycaemia pathway.
//
//   5. The in-hospital replacement therapy NSW names alongside its Wernicke's
//      warning. What is carried is the handover action a responder can actually
//      take; the treatment itself is a hospital decision.
//
// JUDGEMENT CALL
// The adrenergic / neuroglycopaenic split under `recognition` is NSW's own
// grouping of the same symptoms the Hatzolah protocol lists flat. It is kept
// because it explains WHY the picture looks the way it does - the sweating and
// shaking are the body reacting, the confusion and behaviour change are the
// brain running out of fuel - and that is exactly the kind of understanding this
// tier exists to add.
export const hypoglycaemia = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M21 — Hypoglycaemia',
      note: 'Protocol page and its treatment flowchart, read at the site default with no clinical level selected.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/hypoglycaemia',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 5.3 — Hypoglycaemia',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/page/hypoglycaemia-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'The blood glucose level that opens the pathway',
      hatzolah: 'BGL < 4 mmol/L, stated for all ages, with no requirement that the patient be symptomatic.',
      external:
        'One service treats at or below 4 mmol/L and requires the patient to be symptomatic as well; the other sets the threshold lower still, below 3.5 mmol/L. In the first four weeks of life one service drops the threshold to 2.6 mmol/L and the other sends the patient to its newborn pathway altogether.',
      note: 'Follow Hatzolah. Recorded because a reading between 3.5 and 4, and any reading in a newborn, falls on a different side of the line under each guideline.',
    },
    {
      field: 'The first oral step in a patient who can swallow',
      hatzolah: 'Responding and able to swallow — give Glucose Paste by mouth.',
      external:
        'Both services assist the patient to eat and drink first where food and drink are available, and use glucose gel only when they are not. In a baby the equivalent first step is a feed, with gel used only if breast milk or formula is unavailable.',
      note: 'Follow Hatzolah. Noted because the external pathway puts ordinary food ahead of the gel rather than after it.',
    },
    {
      field: 'How soon the blood glucose is rechecked',
      hatzolah: 'Recheck the BGL after 5 minutes.',
      external:
        'One service monitors for 15 minutes before retesting; the other repeats the measurement every ten minutes until the level is consistently above its threshold.',
      note: 'Follow Hatzolah. Recorded because a 5-minute recheck will often read low on both external timetables and should not be taken as treatment failure.',
    },
    {
      field: 'Repeating the oral glucose',
      hatzolah: 'Glucose Paste is a single dose — no repeat.',
      external:
        'Both services repeat the glucose step where the response is inadequate or absent, and go on giving glucose until the level holds. Neither repeats the intramuscular glucagon.',
      note: 'Follow Hatzolah. Where a Hatzolah patient has not come up after the single dose, the answer is escalation, not a second dose.',
    },
  ],

  content: {
    scope: [
      'Covers the patient whose blood glucose is low enough to be causing symptoms. A newborn baby goes to the neonatal pathway instead, on a lower threshold.',
      'Hypoglycaemia is usually a complication of the treatment of diabetes. Both services expect it to be found and corrected before other explanations for the presentation are chased.',
    ],

    whyItMatters: [
      'Hypoglycaemia is a common complication of the management of type 1 diabetes, and its frequency in type 2 diabetes is underestimated.',
      'It is not benign, and least of all in the elderly. It leads to falls, fractures, injuries and arrhythmias, and in severe cases to death.',
      'Its symptoms are easily missed, or mistaken for something else — a transient ischaemic attack, a stroke, or intoxication. Measuring the blood glucose is what settles the question, which is why it is measured rather than guessed at.',
    ],

    causes: [
      'Most episodes occur in a patient taking insulin or an oral hypoglycaemic medicine.',
      'Less common causes:',
      [
        'Severe sepsis, particularly in young children',
        'Poisoning with medicines that lower blood glucose',
        'Liver failure',
      ],
      'Some oral hypoglycaemic medicines are cleared mainly by the kidneys. In a patient taking one, hypoglycaemia with no obvious cause may be the first sign that kidney function has quietly deteriorated.',
    ],

    recognition: [
      'The symptoms fall into two groups, and separating them explains what is being seen.',
      'Adrenergic — the body reacting to the falling glucose:',
      [
        'Trembling or shaking',
        'Diaphoresis',
        'Hunger',
        'Lightheadedness',
        'Numbness around the lips and fingers',
      ],
      'Neuroglycopaenic — the brain running short of fuel:',
      [
        'Lack of concentration',
        'Weakness',
        'Behavioural change',
        'Irritability',
        'Tearfulness or crying',
        'Headache',
        'Dizziness',
        'A falling level of consciousness',
      ],
      'The external services treat on the combination of a low reading and symptoms, rather than on the number by itself.',
    ],

    measuringBloodGlucose: [
      'Do not measure using the patient’s own glucose meter — the result may be inaccurate.',
      'Use capillary blood. Glucose meters are calibrated for capillary blood, and a sample drawn from anywhere else may read wrongly.',
      'Check the history stored in the patient’s meter wherever you can. It is the quickest way to find out whether this episode is one of a run rather than an isolated event — and recurrent hypoglycaemia changes the disposition.',
    ],

    treatingWithOralGlucose: [
      'Oral glucose works best as a simple carbohydrate that is absorbed quickly: glucose tablets or gel, sugar dissolved in water, a non-diet jam or similar glucose-containing spread, or a non-diet soft drink.',
      'Everyday equivalents of the amount the external services give, for when no gel is to hand — roughly half a cup of non-diet fruit juice or soft drink, a tablespoon of sugar, a tablespoon of honey, or six squares of chocolate.',
      'Most oral glucose gels can be given at any age.',
      'In a baby or small child, gel can be spread on the gums, the tongue and the inside of the cheeks.',
      'Record what was actually given — the approximate number of grams of glucose, or a description of the food eaten.',
    ],

    ifThePatientCannotSwallow: [
      'Where the level of consciousness is significantly altered, or the patient cannot swallow safely, the external pathway gives an intravenous glucose preparation that Hatzolah does not carry, at paramedic level.',
      'Intramuscular glucagon sits behind that step in both services — it is the fallback used when intravenous access cannot be obtained, not an equal alternative to it.',
      'The glucagon step is not repeated. Where the glucose is still low afterwards, it is more glucose that is given, not more glucagon.',
    ],

    whenGlucagonWillNotWork: [
      'Glucagon raises the blood glucose by mobilising stored glycogen. Where those stores are already empty it cannot work — it does no harm, but the effort has to go into glucose instead.',
      'Expect little or no response where:',
      [
        'The patient does not have diabetes',
        'The patient is a young child',
        'There is sepsis',
        'The patient has not eaten for more than 12 hours',
      ],
    ],

    childrenUnderFive: [
      'In a child under five, hypoglycaemia is most often caused by:',
      [
        'An illness combined with no food intake and depleted glycogen stores',
        'Severe sepsis',
        'Poisoning with oral hypoglycaemic medicines',
      ],
      'A child under five who is not known to have diabetes is usually malnourished or glycogen depleted for some other reason, so glucagon is unlikely to be effective and glucose is what is needed.',
      'Metabolic disorders can cause hypoglycaemia in young children, but they are rare. Do not delay treatment while waiting for diagnostic tests — beyond the capillary glucose measurement itself, treatment comes first.',
    ],

    monitoring: [
      'Repeat and document the physical examination and the observations regularly, so that a trend, a deterioration or a response to treatment is visible rather than assumed.',
      'Keep rechecking the blood glucose after treatment until it is consistently above the threshold and staying there.',
    ],

    redFlags: [
      'Any of these makes the patient one who should be seen in an emergency department, normally by ambulance:',
      [
        'Overdose of insulin or an oral hypoglycaemic medicine, accidental or otherwise',
        'No known history of diabetes',
        'The episode is not an isolated one',
        'The patient takes an oral hypoglycaemic medicine and has become hypoglycaemic with no obvious cause',
        'The patient does not recover fully',
        'The patient cannot mobilise normally',
        'The blood glucose cannot be brought up and held there, ten minutes or more after the last glucose or glucagon given',
        'The patient is alone, with no carer',
        'The patient is unable or unwilling to eat',
        'The patient is pregnant, suspected or confirmed',
        'The patient is unresponsive, or the response to treatment is inadequate',
      ],
    ],

    disposition: [
      'A patient may be treated for hypoglycaemia and given a clear recommendation for treatment without transport, provided ALL of the following hold:',
      [
        'No red flag is present',
        'A competent adult can stay with the patient for the next four hours',
        'The patient eats a meal, preferably one containing complex carbohydrate',
        'The patient is given written hypoglycaemia information, explained to both the patient and the adult who will be staying',
        'The patient is given a clear recommendation to have their treatment reviewed — by a general practitioner, another appropriate health professional, or diabetes service personnel',
      ],
      'Where the patient is 18 or under, or has been recently diagnosed with diabetes, that review should happen within 24 hours if at all feasible.',
    ],

    safetyNetting: [
      'Hypoglycaemia can return several hours later as the glucose given is metabolised. That is why the meal matters, and why the written information has to be explained rather than simply handed over.',
      'The meal should preferably contain a complex carbohydrate — brown rice, wholegrain bread, porridge or beans — rather than more fast sugar.',
      'The care plan, the referral and the red flags are all meant to be talked through with the patient and with whoever is staying with them, not just recorded.',
    ],

    furtherNotes: [
      'In a patient with known or suspected alcohol dependence, a large glucose load may precipitate Wernicke’s encephalopathy where there is thiamine deficiency. Flag at handover that glucose was given, so that replacement can be considered in hospital.',
    ],
  },
};
