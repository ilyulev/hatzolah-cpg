// Extended ("full") protocol for Asthma / Wheeze, merged from the NSW Ambulance
// and St John NZ clinical practice guidelines.
//
// PROVENANCE
// NSW Ambulance PROTOCOL M4 (Asthma), read at clinical level Paramedic. NSW
// publishes the M4 treatment algorithm as a GRAPHIC, so the algorithm content
// below was read off the rendered flowchart image, not the text layer - the text
// layer of that page carries only the severity table and the peak-flow tables.
// The flowchart branches to "P5 protocol specific exclusions", so NSW PROTOCOL P5
// (Referral Decision) was read as well and supplies those exclusion criteria.
// St John NZ CPG EAS 2.1 (Exacerbation of Asthma) supplies the severity grading,
// the red flags, the referral and observation criteria, and nearly all of the
// explanatory material.
//
// SCOPE EXCLUSIONS - what was deliberately left out
// Both pathways run far past a first responder. Everything below the Hatzolah
// formulary line is omitted rather than softened: oral steroids (including the
// take-home course and its written instructions), IV hydrocortisone, IV
// magnesium, IV adrenaline boluses and adrenaline infusions, and ketamine for
// the severely agitated patient. So are the procedures: non-invasive
// ventilation, RSI, needle chest decompression and finger thoracostomy,
// prehospital ultrasound, and helicopter response and transport criteria.
// St John NZ also states that a patient’s own combination preventer-and-reliever
// inhaler works as well as a salbutamol puffer during an exacerbation; that is a
// drug outside the Hatzolah formulary, so it is left out rather than presented as
// an option.
//
// NO DOSES, AND NO NEBULISATION REGIMEN
// Not one dose figure appears here, including for salbutamol, ipratropium and
// adrenaline, which Hatzolah does carry. Nebulisation regimens - loading dose,
// repeat interval, continuous nebulisation - are likewise left to the Hatzolah
// dosing table. Repeating another service’s numbers alongside Hatzolah’s is
// exactly how the wrong number gets given.
//
// PEAK EXPIRATORY FLOW
// NSW grades severity partly on PEFR and publishes two pages of predicted values.
// Hatzolah does not carry a peak flow meter, so the PEFR bands and tables are out.
// Where an NSW criterion is expressed only in PEFR terms it is carried in its
// symptomatic form ("no improvement after treatment") or not at all.
//
// THUNDERSTORM ASTHMA
// Neither guideline read here names thunderstorm asthma. Hatzolah’s adrenaline
// trigger is therefore not merely stricter than the external ones - it keys off a
// presentation the external guidelines do not describe. That is recorded in
// `differences` rather than blurred into the body.
export const asthmaFr = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M4 — Asthma',
      note: 'Viewed at clinical level: Paramedic. Treatment algorithm read from the published flowchart graphic.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/asthma',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL P5 — Referral Decision',
      note: 'Viewed at clinical level: Paramedic. Supplies the exclusion criteria M4 refers to.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/patient-disposition/page/referral-decision',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 2.1 — Exacerbation of Asthma',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/respiratory-eas/page/exacerbation-of-asthma-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Where the line between moderate and severe sits',
      hatzolah:
        'Severity comes from the Hatzolah Respiratory Status Assessment — SpO2 under 95% is moderate and under 90% is severe; a pulse of 100 – 120 is moderate and 120 or above is severe.',
      external:
        'One service grades asthma on its own bands, in which an SpO2 of 90 – 94% and a pulse of 100 – 120 already place the patient in the SEVERE column, with life-threatening beginning below 90%.',
      note: 'Follow Hatzolah. Note which way the disagreement runs: the external bands escalate a patient to severe one grade sooner than Hatzolah does, so a patient Hatzolah calls moderate would be treated as severe elsewhere.',
    },
    {
      field: 'When ipratropium joins the salbutamol',
      hatzolah:
        'Ipratropium is given only in severe asthma, or where there has been no improvement after 20 minutes of salbutamol — and at Senior Responder level only.',
      external:
        'Both services nebulise ipratropium together with the very first dose of salbutamol, in mild-to-moderate asthma as well as severe, rather than holding it back for a trial of salbutamol alone.',
      note: 'Follow Hatzolah. The salbutamol trial period and the SR restriction are Hatzolah decisions.',
    },
    {
      field: 'What triggers IM adrenaline',
      hatzolah:
        'Adrenaline IM is reserved for SUSPECTED THUNDERSTORM ASTHMA with no improvement despite salbutamol and ipratropium, and only where a clinician is unavailable.',
      external:
        'One service gives adrenaline IM for any severe asthma that is not improving on nebulised bronchodilators; the other reserves adrenaline for life-threatening asthma. Neither guideline names thunderstorm asthma at all.',
      note: 'Follow Hatzolah. Hatzolah’s trigger is narrower and keys off a presentation the external guidelines do not describe.',
    },
    {
      field: 'Authority to repeat IM adrenaline',
      hatzolah: 'Any repeat dose requires consultation.',
      external:
        'The responder may repeat IM adrenaline at a fixed interval on their own authority while the patient continues to deteriorate.',
      note: 'Follow Hatzolah — consult before any repeat.',
    },
    {
      field: 'Whether a spacer is required',
      hatzolah: 'Salbutamol by pMDI is given through a spacer, with a set number of breaths per puff.',
      external:
        'A spacer should be considered but is not always required; the stated priority is to use whichever technique the patient is already familiar with, and the patient’s own inhaler is preferred over the service’s.',
      note: 'Follow Hatzolah and use the spacer. The point about the patient’s own device and familiar technique is still worth knowing where a spacer is refused or unavailable.',
    },
    {
      field: 'Ventilation rate when ventilating life-threatening asthma',
      hatzolah:
        'Bag-valve-mask ventilation follows the Hatzolah age-banded rates, which are faster for children than for adults.',
      external:
        'A single, markedly slow rate is mandated for every age when positive-pressure ventilation is applied in immediately life-threatening asthma, to give the lungs time to empty.',
      note: 'Follow Hatzolah’s rates. Carry the reasoning across, though — the risk being managed is gas trapping, and over-ventilating an asthmatic makes the patient worse, not better.',
    },
  ],

  content: {
    scope: [
      'Applies to a patient aged two years and over with a provisional diagnosis of an exacerbation of asthma. The external guideline sets the same lower age limit as Hatzolah does, and handles wheeze in younger children under a separate bronchiolitis pathway.',
      'Wheeze is not the same thing as asthma. Before committing to this pathway, satisfy yourself that this is reversible bronchospasm and not one of the conditions that mimics it.',
    ],

    generalPrinciples: [
      'Asthma is reversible bronchospasm driven by an inflammatory state in the lungs, producing recurrent attacks of breathlessness and wheezing. Mucus plugging of the airways is often part of it, which is why a patient can be moving very little air.',
      'Brittle or precipitous asthma means a patient who goes from well to seriously unwell within one to two hours. It is a named risk factor in its own right and changes the disposition, not just the urgency.',
      'Asthma is time sensitive to treatment but rarely time dependent to hospital, provided the right skill is at the patient’s side. Treatment early beats travel fast.',
      'If the patient has an asthma action plan, follow it.',
    ],

    gradingSeverity: [
      'Both services grade severity from the whole picture rather than a single number, and neither expects every feature to be present. The direction of travel across the three grades is what matters:',
      [
        'Speech — full sentences, then a few words per breath, then unable to speak at all.',
        'Wheeze — usually loud, then only quiet, then possibly absent. A quiet or silent chest in a struggling patient is a worse sign than a loud wheeze, not a better one.',
        'Work of breathing — no significant indrawing, then significant indrawing with tripod positioning and accessory muscle use, tracheal tug or abdominal breathing, then marked indrawing unless the patient is too exhausted to produce it.',
        'Oxygen saturation — normal, then falling but usually still holding, then falling rapidly.',
        'Agitation — usually absent, then present, then severe.',
        'Level of consciousness — normal, then confused, then falling. Reduced consciousness or collapse belongs to the life-threatening column.',
      ],
      'Cyanosis, exhaustion, poor respiratory effort and soft or absent breath sounds all sit in the life-threatening column. So does bradycardia — in an asthmatic a slowing pulse is a late sign that respiratory arrest is imminent, not a sign of settling.',
    ],

    assessment: [
      'Assess two things at once: how severe this episode is, and whether it is asthma at all.',
      'Actively look for anaphylaxis and for pneumothorax or tension pneumothorax alongside the asthma assessment, and treat under the specific protocol if either is present.',
      'Ask what has already been taken. Whether the patient has access to their own reliever, and whether it has helped, changes both the treatment and the disposition.',
      'History that raises the stakes regardless of how the patient looks now: a previous intubation or ICU admission for asthma, and brittle or precipitous asthma.',
      'In young children, weigh IV access carefully. It causes distress and can worsen the work of breathing, but it will be needed if the exacerbation is severe or immediately life-threatening.',
    ],

    differentialDiagnosis: [
      'The conditions most often mistaken for an asthma exacerbation, and what usually separates them:',
      [
        'COPD — an established diagnosis, a smoking history, and the patient is not usually symptom free between exacerbations.',
        'Cardiogenic pulmonary oedema — onset after lying flat, hypertensive, clammy and peripherally shut down, with crackles and wheeze loudest in the lower zones.',
        'Pneumonia — signs of sepsis, a productive cough, and wheeze or crackles that are one-sided or confined to one area.',
        'Anaphylaxis — onset over minutes, systemic signs of shock, and a rash.',
        'Vocal cord dysfunction — stridor rather than wheeze.',
      ],
      'This is the reasoning behind the Hatzolah caution about a wheezing patient with a history of heart failure and no history of asthma or COPD: that patient is more likely in pulmonary oedema, and does not belong on this pathway.',
      'Bronchodilators have no significant role in bronchospasm caused by smoke inhalation, toxic gas inhalation or chest infection, although they may still be given where the bronchospasm is prominent.',
    ],

    inhalerTechnique: [
      'For a mild or moderate exacerbation the preferred starting point is a bronchodilator by inhaler rather than a nebuliser.',
      'Use the patient’s own inhaler in preference to one from the kit where possible.',
      'Fire one puff at a time into the spacer and have the patient breathe from the spacer before the next puff.',
      'A dry powder inhaler must never be used with a spacer.',
      'An inhaler or spacer from the kit is single-patient equipment. It may be left with the patient afterwards, but it must not be used on anyone else.',
    ],

    reassessmentAndEscalation: [
      'Reassess deliberately and on a clock, looking for the trend rather than a single reading: roughly every fifteen minutes in severe asthma, and every five minutes once the presentation is life-threatening.',
      'If there is no improvement after the first nebulised dose, treat the patient as severe.',
      'Severe and life-threatening asthma is time critical. Minimise time on scene, request advanced-level backup early, and expect most treatment to be given while moving rather than before setting off.',
      'Repeat and document ABCD examination and observations regularly — the value is in the trend, which is what shows deterioration or a response to treatment.',
      'A patient can improve on treatment and then deteriorate rapidly, so improvement is not a reason to stop watching. A rising SpO2 in particular is not proof that the patient is getting better.',
    ],

    ventilationAndGasTrapping: [
      'Dynamic hyperinflation — gas trapping — happens when air enters the lungs more easily than it leaves them, so gas accumulates with each breath. It is why an asthmatic can be over-ventilated into harm.',
      'Its usual consequence is not a pneumothorax but a fall in venous return, because the pressure inside the chest keeps rising. The patient looks shocked.',
      'It occurs in spontaneously breathing patients with severe asthma, but the patients most at risk are those receiving positive-pressure ventilation. Ventilating slowly, so the chest has time to empty, is the whole point of the ventilation rates.',
      'If a ventilated asthmatic deteriorates with signs of shock, gas trapping is a far more likely cause than a tension pneumothorax. Tension pneumothorax from asthma alone is very rare, and is genuinely hard to distinguish because reduced breath sounds, distended neck veins, a hyperresonant chest and a falling cardiac output are all already explained by the asthma.',
    ],

    redFlags: [
      'Any of the following means the patient should be seen in an emergency department, and normally arrive there by ambulance:',
      [
        'Severe or immediately life-threatening asthma.',
        'More than one dose of nebulised bronchodilator has been needed — an inhaler does not count.',
        'Significantly abnormal vital signs.',
        'SpO2 below 92% breathing air.',
        'Unable to talk in full sentences.',
        'Unable to mobilise normally.',
        'Precipitous or brittle asthma.',
      ],
    ],

    notSuitableForTreatAndRefer: [
      'Asthma-specific reasons a patient must not be left at home even though the episode looks settled:',
      [
        'The presentation was severe or life-threatening at first contact.',
        'A previous intubation or ICU admission for asthma.',
        'Pregnancy.',
        'No access to a reliever the patient can use themselves.',
        'Any suspicion of anaphylaxis.',
        'A concurrent respiratory illness.',
        'A history of COPD or heart failure.',
        'Crepitations in both lung fields on auscultation.',
        'No improvement in symptoms after treatment.',
      ],
      'General reasons that apply to any non-transport decision, not only asthma:',
      [
        'Abnormal observations that have not been accounted for.',
        'The patient lacks capacity, including through acute confusion, and there is no responsible person present.',
        'Multiple co-morbidities that are likely to complicate treatment, or a presenting condition that has not responded to treatment.',
        'Recent unexplained syncope.',
        'A doctor has asked for transport to an emergency department.',
        'Recent surgery, or a hospital admission or ambulance attendance for the same problem.',
        'In a child — observations outside the expected range, parental concern, or a patient under 16 with no adult supervision and no contactable parent or carer.',
      ],
      'A non-transport decision is made on a thorough assessment that includes at least two sets of observations, not one.',
    ],

    disposition: [
      'A patient with severe or life-threatening asthma must be given a clear recommendation to go to an emergency department by ambulance.',
      'A patient with mild to moderate asthma who has clearly improved may be advised that transport is not required, provided ALL of the following hold:',
      [
        'No red flags are present.',
        'The patient has been observed for at least 20 minutes after the LAST bronchodilator was completed — timed from the end of treatment, not from arrival.',
        'Written information is left with the patient and its contents are explained, not merely handed over.',
        'The patient is advised to be seen by an appropriate healthcare professional within two days.',
      ],
      'Transport becoming unnecessary is a realistic outcome where the patient improves rapidly on an inhaler or after a single nebulised dose — but it is a judgement made after the observation period, not at the moment of improvement.',
    ],

    safetyNetting: [
      'Explain the written advice rather than leaving it behind. The follow-up only happens if the patient understands why it matters.',
      'Review in primary care within two days is the baseline, so that the underlying treatment can be reconsidered — an exacerbation that needed an ambulance is itself evidence that the maintenance plan is not holding.',
      'If there are signs of a chest infection, such as fever or purulent sputum, the patient should be seen sooner — within 12 hours, and usually in a primary care facility.',
      'The inhaler and spacer used on scene may be left with the patient, which also leaves them able to treat a recurrence before help arrives.',
    ],
  },
};
