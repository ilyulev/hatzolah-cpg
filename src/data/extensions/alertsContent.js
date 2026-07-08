/**
 * Alerts — differential reasoning aid (APP EXTENSION, not part of Hatzolah CPG).
 * "I see an abnormal finding — what could it be, what shouldn't I forget to check?"
 * Non-mandatory prompts to think about. Mandatory escalation lives in the
 * Clinical Flags protocol (Home section).
 */
export const ALERTS_BANNER =
  'Supplementary aid — not a substitute for the CPG. For mandatory escalation criteria see Clinical Flags.';

export const alertsContent = [
  {
    finding: 'Low BP (sBP <90)',
    considerations: [
      { cause: 'Anaphylaxis / severe allergy', hint: 'Rash, hives, airway swelling, known antigen?' },
      { cause: 'Internal bleeding', hint: 'Trauma, abdo pain/rigidity, melaena, recent falls?' },
      { cause: 'Sepsis', hint: 'Fever/infection history, mottled skin, altered consciousness?' },
      { cause: 'Cardiogenic (MI, arrhythmia)', hint: 'Chest pain, irregular pulse, cardiac history?' },
      { cause: 'Dehydration / hypovolaemia', hint: 'Vomiting/diarrhoea, poor intake, dry mucosa?' },
      { cause: 'Medication-related', hint: 'Antihypertensives, GTN, recent dose change?' },
    ],
    checkNext: ['Skin (rash/hives)', 'Temperature', 'HR trend', 'Abdomen', 'Medication history'],
  },
  {
    finding: 'High HR (tachycardia)',
    considerations: [
      { cause: 'Pain / anxiety', hint: 'Often sinus and settles with reassurance' },
      { cause: 'Hypovolaemia / bleeding', hint: 'Early compensation — BP may still be normal' },
      { cause: 'Sepsis / fever', hint: 'Temperature, infection source?' },
      { cause: 'Arrhythmia (SVT, AF, VT)', hint: 'Irregular? Very fast (>150)? Palpitations?' },
      { cause: 'Hypoglycaemia', hint: 'Check BGL' },
      { cause: 'Stimulants / medications', hint: 'Salbutamol, caffeine, illicit drugs' },
    ],
    checkNext: ['BP', 'BGL', 'Temperature', 'Pulse regularity', 'Pain score'],
  },
  {
    finding: 'Low HR (bradycardia)',
    considerations: [
      { cause: 'Physiological (fit adult, sleep)', hint: 'Asymptomatic athlete?' },
      { cause: 'Heart block / cardiac', hint: 'Syncope, dizziness, cardiac history?' },
      { cause: 'Medication-related', hint: 'Beta-blockers, digoxin' },
      { cause: 'Hypoxia (esp. paediatric)', hint: 'Bradycardia in a child is pre-arrest until proven otherwise' },
      { cause: 'Raised intracranial pressure', hint: 'Head injury + bradycardia + hypertension (Cushing’s)?' },
    ],
    checkNext: ['SpO2', 'GCS/AVPU', 'Medication history', 'BP'],
  },
  {
    finding: 'Low SpO2 (<92%)',
    considerations: [
      { cause: 'Asthma / bronchospasm', hint: 'Wheeze, asthma history, thunderstorm?' },
      { cause: 'Airway obstruction', hint: 'Stridor, choking history, drooling?' },
      { cause: 'Anaphylaxis', hint: 'Rash + respiratory distress' },
      { cause: 'COPD (chronic baseline)', hint: 'Known COPD — target 88–92%' },
      { cause: 'Pneumonia / infection', hint: 'Fever, productive cough, focal crackles' },
      { cause: 'Poor reading', hint: 'Cold fingers, nail polish, poor perfusion — check waveform' },
    ],
    checkNext: ['RR + work of breathing', 'Auscultation', 'Temperature', 'Probe placement'],
  },
  {
    finding: 'Altered consciousness',
    considerations: [
      { cause: 'Hypoglycaemia', hint: 'ALWAYS check BGL first — rapidly reversible' },
      { cause: 'Stroke', hint: 'FAST assessment, sudden onset, one-sided?' },
      { cause: 'Post-ictal (after seizure)', hint: 'Witnessed shaking, incontinence, tongue bite?' },
      { cause: 'Overdose / intoxication', hint: 'Pinpoint pupils, drug paraphernalia, alcohol smell' },
      { cause: 'Head injury', hint: 'Trauma history, scalp wounds, anticoagulants?' },
      { cause: 'Hypoxia / hypotension', hint: 'Check SpO2 and BP — brain perfusion' },
      { cause: 'Sepsis (esp. elderly)', hint: 'Confusion may be the only sign in the elderly' },
    ],
    checkNext: ['BGL', 'SpO2', 'BP', 'Pupils', 'FAST', 'Temperature'],
  },
  {
    finding: 'High temperature (fever)',
    considerations: [
      { cause: 'Sepsis', hint: 'Fever + any red flag vital = treat as sepsis' },
      { cause: 'Simple infection (URTI, UTI)', hint: 'Localising symptoms?' },
      { cause: 'Meningitis', hint: 'Neck stiffness, photophobia, non-blanching rash' },
      { cause: 'Heat stroke', hint: 'Exertion/environment, hot dry skin, altered LOC' },
      { cause: 'Paediatric <3 months', hint: 'Fever ≥38°C in <3 months = RED FLAG, hospital always' },
    ],
    checkNext: ['Rash (non-blanching?)', 'Neck stiffness', 'HR + BP (compensation)', 'Hydration'],
  },
  {
    finding: 'Low BGL (<4 mmol/L)',
    considerations: [
      { cause: 'Diabetic — insulin/medication excess', hint: 'Missed meal, exercise, dose error?' },
      { cause: 'Alcohol-related', hint: 'Alcohol blocks glucose release — can drop hours later' },
      { cause: 'Sepsis / critical illness', hint: 'Hypoglycaemia without diabetes is ominous' },
      { cause: 'Paediatric illness', hint: 'Children deplete glycogen fast when unwell' },
    ],
    checkNext: ['Conscious state + swallow safety (Glucose Paste vs Glucagon)', 'Temperature', 'Recheck BGL after Tx'],
  },
  {
    finding: 'Fast breathing (tachypnoea)',
    considerations: [
      { cause: 'Respiratory (asthma, infection)', hint: 'Wheeze/crackles, SpO2?' },
      { cause: 'Metabolic compensation (DKA)', hint: 'Diabetic, deep sighing breaths, sweet breath' },
      { cause: 'Sepsis', hint: 'RR is the earliest sepsis vital sign change' },
      { cause: 'Pain / anxiety (hyperventilation)', hint: 'Carpopedal spasm, tingling — diagnosis of exclusion' },
      { cause: 'PE (pulmonary embolism)', hint: 'Sudden onset, pleuritic pain, recent surgery/immobility' },
    ],
    checkNext: ['SpO2', 'BGL', 'Temperature', 'Auscultation', 'Calf swelling'],
  },
];
