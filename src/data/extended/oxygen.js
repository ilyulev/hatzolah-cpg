// Extended ("full") protocol for Oxygen, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply.
//
// WHERE THE SOURCES LIVE
// NSW carries Oxygen in its medicines list (Pharmacology 221). St John NZ does NOT
// list oxygen as a medicine — it is a General Treatment Principles guideline,
// "Oxygen Administration" (CPG EAS 1.16), and that is the page used here. Both are
// the same substance, so nothing has been substituted.
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
// SATURATION FIGURES
// The two services set different thresholds and targets. The 92% threshold and the
// 92 – 96% target used in the body are the ones that agree with the Hatzolah CPG;
// the other service's 94 / 94 – 98 figures are held in `differences` so they never
// read as the numbers to work to. The 88 – 92% target for patients at risk of
// hypercarbia is common to Hatzolah and both services, so it stands in the body.
//
// CONTRAINDICATION vs CAUTION
// The Hatzolah CPG lists no contraindications or cautions for oxygen, so there is
// nothing for it to override. Items are placed where the external guidelines place
// them: paraquat and concurrent methoxyflurane are contraindications; hypercarbia
// risk, bleomycin, confined spaces and smoke inhalation are cautions. No item is
// repeated across the two lists.
//
// OMITTED SECTIONS
// There is no `onsetAndDuration` — the NSW pharmacology table records onset, peak
// and duration for oxygen as not applicable, and NZ gives no figures, so there is
// nothing to state. There is no `interactions` section either: the only drug
// interactions either service describes (methoxyflurane, paraquat, bleomycin) are
// already stated as contraindications or cautions, and repeating them would be
// padding.
export const oxygen = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'Pharmacology 221',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/oxygen',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 1.16',
      note: 'Version 1.1.0.1 (16/06/2026). Held as a General Treatment Principles guideline, not a medicines entry.',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/general-treatment-principles-eas/page/oxygen-administration-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Threshold for giving oxygen, and target saturation',
      hatzolah:
        'Give oxygen if SpO2 is below 92%, titrating to 92% or above. In the high-acuity group, start on a non-rebreather at 10 – 15 L/min and titrate to 92 – 96% once haemodynamically stable.',
      external:
        'One service sets the threshold at an SpO2 of 94 or below on room air and a target of 94 – 98 for respiratory distress, hypoxia and acute coronary syndrome. The other matches Hatzolah — oxygen below 92% on air, titrated to 92 – 96%.',
      note: 'Follow Hatzolah. The services disagree with each other here, and the higher threshold is the outlier.',
    },
    {
      field: 'Routine oxygen for severe shortness of breath',
      hatzolah: 'Apply oxygen to all patients presenting with severe shortness of breath.',
      external:
        'Oxygen is framed as a treatment for hypoxia rather than for breathlessness itself, and is restricted to patients with a low saturation, airway obstruction, or a specific listed indication — on the grounds that above-normal blood oxygen vasoconstricts small arteries and increases inflammation.',
      note: 'Follow Hatzolah. Recorded because the external position is deliberately more restrictive than a blanket rule.',
    },
    {
      field: 'Age scope',
      hatzolah: 'The Hatzolah oxygen guideline states it is intended for patients aged 16 and older.',
      external:
        'The external guidance covers all ages, and includes device, flow and PEEP advice specific to children and neonates.',
      note: 'The paediatric and neonatal material below is reference only and sits outside the stated scope of the Hatzolah guideline.',
    },
  ],

  content: {
    indications: [
      'Hypoxia. Oxygen is a treatment for hypoxia, not a general treatment for a patient who is ill or injured — give it to patients who have an indication to receive it.',
      'A low oxygen saturation on room air: usually below 92% on air, unless a presentation sets its own threshold.',
      'Airway obstruction.',
      'Acute coronary syndrome, dyspnoea, and acute exacerbation of COPD — each with its own saturation target.',
      'Presentations requiring 100% oxygen:',
      [
        'Cardiac or respiratory arrest.',
        'Diving and decompression emergencies.',
        'Carbon monoxide poisoning.',
        'Cyanide poisoning.',
        'Prolapsed umbilical cord.',
      ],
      'Cardiogenic pulmonary oedema — 100% oxygen delivered by IPPV.',
      'As the drive gas for nebulised medicines.',
    ],

    contraindications: [
      'Paraquat poisoning where the SpO2 is above 90% on room air.',
      'Concurrent use with methoxyflurane, other than oxygen given by nasal prongs — oxygen must not be run through the inhaler.',
    ],

    cautions: [
      'Patients at risk of hypercarbia — COPD, morbid obesity, those on home oxygen, and those on home CPAP or BiPAP. Oxygen alters carbon dioxide clearance in these patients and excess oxygen may cause hypercarbia. Titrate to the patient’s own known normal saturation if it is known, otherwise to 88 – 92%.',
      'A rising carbon dioxide level usually shows as confusion, drowsiness, agitation and a falling level of consciousness. Do not stop oxygen abruptly — reduce it to a lower flow rate targeting 88 – 92% and reassess.',
      'Previous bleomycin chemotherapy. Oxygen can cause severe lung inflammation in these patients, and the sensitivity is lifelong; usually give only enough to maintain an SpO2 of 88 – 92%.',
      'Confined spaces such as a tank, pipe or silo. An increase in the oxygen concentration of the ambient air to as little as 24% may significantly increase the risk of fire or explosion. Only give oxygen in a confined space if the clinical indication is very strong and fire service personnel are present and monitoring the oxygen concentration in the space.',
      'Smoke inhalation does not routinely require oxygen — reserve it for patients with suspected carbon monoxide poisoning.',
      'Neonatal resuscitation. Routine oxygen appears to make outcomes worse, so it is reserved for deterioration despite initial ventilation.',
      'A manual ventilation bag and mask held against the face of a small child who is breathing spontaneously needs a high degree of vigilance: a small child with respiratory exhaustion may not generate enough pressure to open the valves inside the bag, and this can cause asphyxiation.',
      'PEEP reduces cardiac output and should be used with caution in a patient showing signs of shock.',
    ],

    administration: [
      'Use the simplest device and the lowest flow rate that achieves the target saturation — 92 – 96%, or 88 – 92% if the patient is at risk of hypercarbia — unless a specific device or flow rate is set out for that presentation.',
      'Flow rates in ordinary use:',
      [
        'Nasal prongs 1 – 4 L/min.',
        'Simple mask 6 L/min.',
        'Nebuliser mask 8 L/min.',
        'Reservoir mask 10 L/min.',
        'Manual ventilation bag 10 L/min.',
      ],
      'Nasal prongs or a simple mask is enough for most patients.',
      'Reserve a reservoir mask for patients needing a high inspired oxygen concentration. 10 L/min is usually sufficient — the flow is adequate as long as the reservoir bag is not completely deflating.',
      'Reserve a manual ventilation bag for patients needing assistance with breathing or needing PEEP. Again 10 L/min is usually sufficient, judged the same way by the reservoir bag.',
      'If pulse oximetry is unavailable or unreliable, give oxygen as appropriate to the patient’s clinical condition.',
      'In patients at risk of hypercarbia, nebulise bronchodilators with air where possible:',
      [
        'Run the nebuliser on air at 8 L/min and give oxygen by nasal prongs alongside it, adjusting the flow to hold an SpO2 of 88 – 92%.',
        'If oxygen must be the drive gas, alternate five minutes with the mask on and five minutes off — but only if the saturation climbs above 92% during delivery. This limits oxygen exposure while still delivering most of the nebulised drug.',
      ],
      'PEEP settings when ventilating with a manual ventilation bag:',
      [
        'Adult or child — do not attach PEEP during cardiac arrest; apply 5 cmH2O for all other conditions.',
        'Neonate — apply 5 cmH2O, including during cardiac arrest.',
        'After return of spontaneous circulation it is appropriate to apply PEEP, but it is not an immediate priority.',
      ],
      'Supplied in white cylinders with white markings on the shoulders, holding 490 L or 1500 L of 100% medical oxygen.',
    ],

    adverseEffects: [
      'Increased risk of fire and explosion.',
      'Blood oxygen levels higher than normal cause vasoconstriction, particularly of the small arteries, which can lower blood flow to tissues and organs.',
      'Higher than normal oxygen levels increase inflammation and may worsen inflammatory states.',
    ],

    mechanismAndPharmacokinetics: [
      'A naturally occurring colourless, odourless gas.',
      'An essential element for aerobic metabolism and for sustaining life.',
    ],

    furtherNotes: [
      'Few guidelines carry specific instructions on oxygen administration, so clinical judgement is required.',
      'A pulse oximetry reading does not tell you how well a patient is breathing. That is judged by clinical examination and, where available, end tidal carbon dioxide.',
      'Pulse oximetry can be unreliable in a patient who is very vasoconstricted, shaking or moving, who has very dirty fingers, or who has been exposed to toxins such as carbon monoxide or nitrites. Do not spend long periods trying to obtain a reading — severe vasoconstriction is a common reason one cannot be got.',
      'A low reading may be invalid if the SpO2 waveform is damped, flat or irregular. A wide, regular waveform is a sign the reading is likely to be valid.',
      'A patient can be significantly hypoxic without being cyanosed — cyanosis is usually only detectable below an SpO2 of 80%, and is much harder to detect in a patient who is anaemic, has a darker skin tone, or has been exposed to carbon monoxide.',
      'Central cyanosis, for example of the mouth and lips, usually means severe hypoxia. Peripheral cyanosis of the extremities without central cyanosis is usually vasoconstriction.',
      'PEEP improves oxygenation and reduces work of breathing: the expiratory pressure reduces lung collapse and increases functional residual capacity, so from that more expanded resting position less work is needed for inspiration; the positive pressure also reduces venous return and blood flow through the lung vessels, reducing the amount of fluid entering the lungs.',
      'PEEP is withheld from adults and children during CPR because it reduces the blood flow achieved by compressions. It is applied to neonates during CPR because the cause of arrest is usually respiratory failure and the balance of risk favours improving ventilation.',
    ],
  },
};
