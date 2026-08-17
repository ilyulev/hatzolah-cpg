// Extended ("full") protocol for Normal Saline (sodium chloride 0.9%), built from
// the St John New Zealand clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply.
//
// NSW AMBULANCE DOES NOT CARRY THIS DRUG
// The NSW Ambulance authorised medicines list (checked at clinical level Paramedic,
// and again against the app's full medicine index across every clinical level) has
// no sodium chloride 0.9% and no normal saline monograph. Its crystalloid is
// Compound Sodium Lactate (Pharmacology 211), described there as a solution of
// sodium chloride, calcium, potassium and lactate — a DIFFERENT fluid with
// different doses. Nothing from that monograph has been used here. There are
// therefore no NSW figures in this entry.
//
// WHERE THE NZ MATERIAL COMES FROM
// St John NZ carries 0.9% sodium chloride but publishes no numbered medicine
// monograph for it — it is absent from the CPG EAS 14.x medicines list. Its
// guidance is instead spread across the condition guidelines and the EAS Medicine
// Calculator, which holds 31 dose rows for the fluid. This entry is assembled from
// the guidelines that speak about the fluid itself: Hypovolaemia from Fluid Loss
// (the closest match to the Hatzolah indication), Bleeding following Trauma (which
// carries a dedicated "Administration of 0.9% sodium chloride" section), and
// Cardiogenic Shock (which carries the pulmonary oedema rule).
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice and carry no inline service
// tags; provenance lives on the source chips. Nothing here is invented: every
// statement traces to a guideline actually read, and anything that disagrees with
// the Hatzolah CPG is left out of the body and recorded in `differences` instead.
//
// CONTRAINDICATION vs CAUTION
// The Hatzolah CPG holds bilateral fine crackles suggestive of APO as a
// CONTRAINDICATION, so all the pulmonary oedema material sits there and is not
// repeated under cautions, even though St John words it as "administer with
// caution".
//
// SECTIONS DELIBERATELY OMITTED
// No onset, peak or duration figures, no interactions and no pharmacokinetics: St
// John publishes none for this fluid, and it would have to be invented to fill the
// headings.
export const normalSaline = {
  sources: [
    {
      service: 'St John NZ',
      ref: 'CPG EAS 12.13',
      note: 'Hypovolaemia from Fluid Loss — Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/miscellaneous-eas/page/hypovolaemia-from-fluid-loss-eas',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.23',
      note: 'Bleeding following Trauma — Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/bleeding-following-trauma-eas',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 3.13',
      note: 'Cardiogenic Shock — Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/cardiac-eas/page/cardiogenic-shock-eas',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'EAS Medicine Calculator',
      note: 'Dose rows for 0.9% sodium chloride, scoped to Paramedic and above',
      url: 'https://cpg.stjohn.org.nz/tabs/tools/page/eas-medicine-calculator-medicines',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Repeat and maximum volume',
      hatzolah:
        'A single bolus — 500 mL or 1000 mL depending on the patient — with no repeat, and that bolus is the maximum.',
      external:
        'The bolus is repeated as required and titrated to perfusion. In hypovolaemia from fluid loss the adult figure is 1 litre repeated as needed; where bleeding is the cause it should be uncommon to exceed 1 litre and rare to exceed 2 litres.',
      note: 'Follow Hatzolah — one bolus, no repeat.',
    },
    {
      field: 'Age',
      hatzolah: 'Dosing is given for ≥ 15 years only; there is no paediatric row.',
      external:
        'Children are dosed by weight — 20 mL/kg for hypovolaemia from fluid loss, 10 mL/kg where the cause is bleeding.',
      note: 'Follow Hatzolah. Recorded because the external guideline doses children and the Hatzolah table stops at 15 years.',
    },
    {
      field: 'Volume for the elderly and for renal or heart failure',
      hatzolah: '500 mL rather than 1000 mL for these patients.',
      external:
        'One litre is the standard adult volume, with a general instruction to consider a reduced dose in the frail elderly rather than a specific smaller figure.',
      note: 'Follow Hatzolah — it sets an explicit reduced volume where the external guidance leaves it to judgement.',
    },
  ],

  content: {
    indications: [
      'Volume replacement where the patient has signs of hypovolaemia. The commonest cause is fluid loss — gastroenteritis and similar — but the same fluid is used for hypovolaemia accompanying bleeding, burns, sepsis, crush injury and anaphylaxis.',
      'Rehydration where significant nausea and vomiting, or clear signs of dehydration, accompany another presentation such as vertigo or a primary headache.',
      'Dilution and preparation of other intravenous medicines — for example diluting ropivacaine before a fascia iliaca block, diluting adrenaline to 1:10,000 to soak a dressing for a bleeding wound, or making a 1:1,000,000 adrenaline infusion by placing 1 mg into a 1 litre bag.',
    ],

    contraindications: [
      'Signs or symptoms of pulmonary oedema. Fluid is given only when there are none, and is stopped if pulmonary oedema develops during administration.',
      'Cardiogenic shock caused by poor left ventricular function is commonly accompanied by pulmonary oedema. Fluid is unlikely to help there and may make the oedema worse.',
    ],

    cautions: [
      'End-stage renal failure.',
      'The elderly, particularly the frail. A lower percentage of body mass is water, so the volume of distribution is smaller and the same dose has a greater effect. Consider a reduced dose and titrate intravenous treatment to effect.',
      'Severe or uncontrolled bleeding — keep the total volume as low as possible, because large volumes of crystalloid contribute to coagulopathy.',
    ],

    administration: [
      'Titrate to clinical signs of intravascular volume and perfusion rather than running a fixed volume in.',
      'Rapid administration is not required unless shock is severe. Otherwise give the bolus over 30 – 60 minutes.',
      'For hypovolaemia from fluid loss the adult volume is 1 litre, or 20 mL/kg for a child, repeated as required.',
      'Where the cause is bleeding the bolus is smaller — 500 mL for an adult, 10 mL/kg for a child — repeated as required while minimising the total volume. Judgement decides the total, but it should be uncommon to exceed 1 litre in an adult or 20 mL/kg in a child, and rare to exceed 2 litres or 40 mL/kg.',
      'Warm the fluid with a dedicated warming device where one is available. Never warm a bag in a microwave — the temperature it reaches is unreliable and the bag may be damaged.',
      'Stop the infusion if signs or symptoms of pulmonary oedema appear.',
      'Encourage the patient to drink where it is appropriate to do so.',
    ],

    adverseEffects: [
      'Fluid overload and worsening pulmonary oedema.',
      'Large volumes contribute to a dilutional coagulopathy and can make bleeding worse.',
      'Fluid given at ambient temperature can cause hypothermia, which itself worsens bleeding by contributing to coagulopathy.',
    ],

    furtherNotes: [
      'Cardiogenic shock from poor right ventricular function — commonly after an acute inferior myocardial infarction — is more likely to respond to fluid than shock from poor left ventricular function.',
      'In trauma, tranexamic acid is not a priority in itself and is usually given alongside the first dose of fluid.',
      'Once fluid has been given for hypovolaemia from fluid loss, the patient should usually be recommended for ambulance transport to an emergency department. Staying in the community is only considered where no more than one litre (or 20 mL/kg in a child) was needed and the underlying condition is clearly minor and improving.',
    ],
  },
};
