// Extended ("full") protocol for Nausea / Vomiting, merged from the NSW Ambulance
// and St John NZ clinical practice guidelines.
//
// PROVENANCE
// St John NZ CPG EAS 12.5 is ordinary page text and was read from the published
// guideline. NSW PROTOCOL M6 is one short paragraph plus a treatment FLOWCHART
// DRAWN AS A GRAPHIC (assets/images/info/M6.png) — none of its clinical content
// exists in the page text at all. The flowchart was downloaded and read as an
// image, the same discipline the v6.2 pipeline applies to the Hatzolah PDF. The
// disposition rules, the red-flag list and the whole History: Key Findings block
// below come from that graphic and would have been invisible to a text scrape.
//
// THIS ENTRY CARRIES NO DRUG MATERIAL — DELIBERATELY
// The drug already has its own extended entry (extended/ondansetron.js), which
// records the route difference: Hatzolah gives an orally disintegrating tablet,
// both external services give it IV or IM. Repeating any of that here would put
// another service's route and numbers next to the Hatzolah dosing table on the
// same screen. This entry stays on the PATHWAY — recognition, red flags,
// disposition, safety-netting — and states no dose, no route and no drug name
// except where naming ondansetron is unavoidable to say what it does not do.
//
// OUT-OF-SCOPE STEPS, said in general terms rather than shown
// Both pathways escalate to a second-line antiemetic that Hatzolah does not
// carry — droperidol in NZ, metoclopramide in NSW — for vomiting that persists,
// for motion sickness, and for cannabinoid hyperemesis. Naming or dosing either
// drug would be handing a responder something they do not hold, so the body says
// only that the pathway escalates at paramedic level. Hatzolah's own step there
// is to consult or escalate care, which is what the responder actually does.
// Also omitted: the IV-access branches of the NZ flowchart, and the NSW P5
// referral-decision machinery (written referral forms, service-specific
// observation charts, virtual-service referrals) — administration, not medicine.
//
// TWO JUDGEMENT CALLS
//   1. The alcohol swab. St John NZ opens its pathway with it, before any drug.
//      It is not a medicine and needs nothing a responder does not already carry,
//      so it is kept. It is presented as a measure to consider, not as a step
//      that displaces anything in the Hatzolah protocol.
//   2. NZ's worsening advice names Healthline and the 111 emergency number.
//      Both are New Zealand infrastructure and would be wrong here, so the advice
//      is carried with the substance intact and the phone numbers generalised.
export const nauseaVomiting = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M6 — Nausea and Vomiting',
      note: 'Page text plus the M6 treatment flowchart graphic; listed for all clinical levels, including Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/nausea-and-vomiting',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 12.5 — Nausea and/or Vomiting',
      note: 'Version 1.0.5.3 (09/06/2025)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/miscellaneous-eas/page/nausea-and-or-vomiting-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Prophylactic use of an antiemetic',
      hatzolah:
        'The guideline is used prophylactically for spinally immobilised patients — one of the two criteria for entering it.',
      external:
        'Prophylactic administration is not routinely required. It is considered only where the nature of the injuries, the transport position, or the mode of transport are such that vomiting would be particularly problematic.',
      note: 'Not a conflict. Spinal immobilisation is precisely the transport position the external wording has in mind; Hatzolah simply makes the standing case explicit rather than leaving it to judgement. Follow Hatzolah.',
    },
    {
      field: 'Deciding the patient does not need transport',
      hatzolah:
        'Every patient who receives ondansetron must have a VVED consult attended as a minimum if they are not being transported by ambulance to hospital.',
      external:
        'The attending crew may make the recommendation themselves, without any consult, once the patient appears to have a minor clinical problem, has no other significant symptoms, and has normal vital signs.',
      note: 'Follow Hatzolah. The external criteria are a useful check on the decision, but they do not replace the mandatory VVED consult.',
    },
  ],

  content: {
    scope: [
      'Covers the patient whose nausea or vomiting is clinically significant — severe, actively vomiting, or not being tolerated.',
      'Nausea and vomiting are symptoms, not a diagnosis. Both are extremely common and may be caused by a vast array of medical conditions. The presentation can be acute or chronic, and can range from mildly annoying, through something that impairs quality of life, to the marker of a life-threatening disease. Treating the symptom does not remove the obligation to work out what is causing it.',
    ],

    historyKeyFindings: [
      'The history is usually where the cause shows itself. Ask about:',
      [
        'The quality, timing and radiation of any associated pain. Cramping pain preceding the onset of nausea and vomiting may be due to gastrointestinal tract obstruction. Achy, cramping epigastric or right upper quadrant pain may be due to gastric or duodenal ulcers. Flank pain with dysuria suggests renal stones.',
        'The characteristics of the vomit. Gastric fluid suggests gastric outlet obstruction, bile stained material suggests small bowel obstruction, and feculent material suggests colonic obstruction.',
        'Whether symptoms develop or worsen after meals, which may relate to peptic ulcers.',
        'What accompanies the nausea and vomiting. Unexplained weight loss or anorexia may relate to malignancy; diarrhoea to gastroenteritis or food poisoning; neurological symptoms to migraine, a cerebrovascular event or meningitis.',
        'Related family, medical or surgical history, and any medication or drug use.',
        'In female patients of child bearing age, the last menstrual cycle and current pregnancy status.',
      ],
    ],

    redFlags: [
      'Nausea and vomiting are often the presenting symptom of something serious elsewhere. Consider a red flag diagnosis:',
      [
        'CNS disease — for example raised intracranial pressure, or meningitis.',
        'Sepsis or other infection — for example urinary tract infection.',
        'Cardiovascular disease — for example acute coronary syndrome.',
        'Endocrine — for example adrenal insufficiency, or a diabetic emergency.',
        'Gastrointestinal — for example obstruction, or infection.',
        'Mental health or drug related — for example eating disorders, or cannabis.',
        'Renal — for example uraemia.',
      ],
    ],

    highRiskPatients: [
      'Treat the following as high risk, whatever the working impression:',
      [
        'Acute cardiac or neurological signs and symptoms alongside the nausea and vomiting.',
        'Age 65 years or over, particularly with atherosclerotic disease.',
        'Children and infants.',
        'Known or suspected adrenal insufficiency.',
        'Altered or frank blood in the stools.',
      ],
    ],

    assessment: [
      'Repeat and document ABCD physical examinations and physiological observations regularly, so that trends, clinical deterioration and any response to treatment become visible rather than inferred.',
      'Look for and treat the condition underlying the symptom. Gastroenteritis, dehydration, and medical hypoperfusion or hypovolaemia are the common ones.',
      'Any recommendation that the patient does not need transport follows a thorough assessment including a minimum of two sets of physiological observations.',
    ],

    nonDrugMeasures: [
      'Consider placing an alcohol swab under the patient’s nose and advising them to inhale the vapour through their nose for several minutes. If it is effective, it may be repeated as required.',
    ],

    prophylacticUse: [
      'Prophylactic administration of an antiemetic is not routinely required.',
      'Consider it where the nature of the patient’s injuries, the transport position, or the mode of transport — a helicopter, for example — are such that vomiting would be particularly problematic.',
    ],

    limitsOfAntiemetics: [
      'An antiemetic should not usually be given for vomiting associated with an altered level of consciousness. It is rarely effective in that setting, and it can affect the neurological assessment of the patient. Position the patient laterally instead.',
      'Ondansetron is usually ineffective at preventing or treating motion sickness. Where motion sickness is a component of the symptoms, the external pathways turn to a different antiemetic at paramedic level.',
      'Where vomiting persists after the first antiemetic, both external pathways add a second-line antiemetic that Hatzolah does not carry. Under Hatzolah the step at that point is to consult or escalate care.',
    ],

    cannabinoidHyperemesis: [
      'Cannabinoid hyperemesis syndrome is episodes of nausea and vomiting caused by chronic or frequent high-dose cannabis use.',
      'Hot showers or bathing may reduce the symptoms. They usually improve if cannabis use is tapered off or stopped.',
      'The external pathways treat this presentation with a second-line antiemetic at paramedic level.',
    ],

    disposition: [
      'Transport to an emergency department where any of the following is present:',
      [
        'The patient is high risk.',
        'A paediatric patient with bilious — yellow or green — vomiting.',
        'Any potential red flag diagnosis.',
      ],
      'Where none of those is present, an alternative disposition may be considered. A patient may be given an antiemetic and a clear recommendation that immediate referral to a medical facility is not required, provided the patient appears to have a minor clinical problem, has no other significant symptoms, and has normal vital signs.',
    ],

    safetyNetting: [
      'Every patient who is not immediately referred or transported to a medical facility, and their family or carers, must be given worsening advice — preferably in writing.',
      'Advise them to be seen in primary care, or to phone a health advice line, if the symptoms are not improving within 24 hours.',
      'Advise them to call an ambulance if they develop:',
      [
        'Severe abdominal pain.',
        'Vomiting of blood.',
        'Inability to mobilise independently.',
      ],
    ],
  },
};
