/**
 * Hatzolah Clinical Practice Guidelines - Content Data
 * Extracted from CPG v6.2
 *
 * PRACTICE LEVELS:
 *   CB  = Code Blue  (Level 1) - Basic first aid scope
 *   FR  = First Responder      - Standard paramedic scope (includes all CB protocols)
 *   SR  = Senior Responder     - Accredited advanced scope (includes all FR protocols + SR-only)
 *
 * VISIBILITY RULES:
 *   CB user  → sees CB protocols only
 *   FR user  → performs FR protocols; sees CB protocols as reference
 *   SR user  → performs SR + FR protocols; sees CB protocols as reference
 *
 * PROTOCOL VERSIONING:
 *   Some protocols exist at multiple levels (e.g. Anaphylaxis CB vs FR).
 *   Each version is stored separately with a unique key and `level` field.
 *   The CB version is simpler; the FR version has full clinical detail.
 */

// ─────────────────────────────────────────────
// ASSESSMENTS
// ─────────────────────────────────────────────

export const assessmentsContent = {

  'vital-signs': {
    title: 'Vital Sign Values',
    level: 'ALL',
    universal: true, // foundational assessment (p5, not L1) — in-scope for every practice level
    category: 'primary',
    summary: 'Age-based acceptable vital sign ranges',
    content: {
      notes: [
        'ANY deviation from normal VSS is a concern and should NOT be discounted',
        'For clinical care, a child is defined as aged under 16 years',
        'Patients with ANY vital signs persistently outside ranges must be escalated to Ambulance Victoria',
      ],
      table: {
        headers: ['Age', 'Category', 'Weight', 'AVPU/GCS', 'RR', 'SpO2', 'HR', 'BP sys'],
        rows: [
          ['≤ 24 hours', 'Newborn', '3.5 kg', 'A / 15', '25–60', '≥95%', '110–170', '≥60'],
          ['≤ 3 months', 'Small Infant', '6 kg', 'A / 15', '25–60', '≥95%', '110–170', '≥60'],
          ['3–12 months', 'Large Infant', '8 kg', 'A / 15', '25–55', '≥95%', '105–165', '≥65'],
          ['1 year', 'Small Child', '10 kg', 'A / 15', '20–40', '≥95%', '85–150', '≥70'],
          ['2 years', 'Small Child', '12 kg', 'A / 15', '20–40', '≥95%', '85–150', '≥70'],
          ['3 years', 'Small Child', '16 kg', 'A / 15', '20–40', '≥95%', '85–150', '≥70'],
          ['4 years', 'Small Child', '18 kg', 'A / 15', '20–40', '≥95%', '85–150', '≥70'],
          ['5 years', 'Medium Child', '20 kg', 'A / 15', '16–34', '≥95%', '70–135', '≥80'],
          ['6 years', 'Medium Child', '22 kg', 'A / 15', '16–34', '≥95%', '70–135', '≥80'],
          ['7 years', 'Medium Child', '24 kg', 'A / 15', '16–34', '≥95%', '70–135', '≥80'],
          ['8 years', 'Medium Child', '26 kg', 'A / 15', '16–34', '≥95%', '70–135', '≥80'],
          ['9 years', 'Medium Child', '28 kg', 'A / 15', '16–34', '≥95%', '70–135', '≥80'],
          ['10 years', 'Medium Child', '33 kg', 'A / 15', '16–34', '≥95%', '70–135', '≥80'],
          ['11 years', 'Medium Child', '36 kg', 'A / 15', '16–34', '≥95%', '70–135', '≥80'],
          ['12 years', 'Adolescent', 'Estimate', 'A / 15', '14–26', '≥95%', '60–120', '≥90'],
          ['13 years', 'Adolescent', 'Estimate', 'A / 15', '14–26', '≥95%', '60–120', '≥90'],
          ['14 years', 'Adolescent', 'Estimate', 'A / 15', '14–26', '≥95%', '60–120', '≥90'],
          ['15 years', 'Adolescent', 'Estimate', 'A / 15', '14–26', '≥95%', '60–120', '≥90'],
          ['≥15 years', 'Adult', 'Estimate', '13–15', '12–30', '≥92%', '60–100', '≥100'],
        ],
      },
    },
  },

  'clinical-flags': {
    title: 'Clinical Flags',
    level: 'ALL',
    universal: true, // foundational assessment (p7, not L1) — in-scope for every practice level
    category: 'primary',
    summary: 'Red and yellow flag criteria for escalation',
    content: {
      definition: {
        red: 'Patients meeting ANY red flag criteria MUST be transported to hospital by ambulance.',
        yellow: 'For yellow flag criteria, responder MUST contact Ambulance Victoria, VVED, Clinician, or GP.',
      },
      redFlags: {
        adultsAndPaediatrics: [
          'ANY vital sign outside Acceptable Vital Sign Values',
          'Stridor',
          'First presentation seizure',
          'Anaphylaxis (including resolved)',
          'Burns — partial/full thickness or >9% superficial',
          'Altered conscious state (not corrected by treatment)',
          'Respiratory distress not relieved by treatment',
          'Suspected spinal injury',
          'Suspected cardiac chest pain',
          'Suspected stroke',
          'Suspected sepsis',
          'Active significant bleeding not controlled',
          'Traumatic cardiac arrest',
          'Penetrating trauma to head, chest or abdomen',
          'Suspected fracture of femur or pelvis',
        ],
        paediatricsOnly: [
          'Any age <3 months with fever ≥38°C',
          'Non-blanching rash',
          'Unexplained pain',
          'Second presentation within 48 hours for related complaint',
          'Testicular pain',
          'Ingestion / inhalation of toxic substance',
          'Inhalation of foreign body',
          'Bulging fontanelle',
          'Prolonged capillary refill >2 seconds',
          'Suspected non-accidental injury',
        ],
      },
      yellowFlags: [
        'Patient declining recommended care',
        'Isolated systolic BP 90–100 mmHg (adult)',
        'Vomiting not controlled with treatment',
        'Pain not controlled with treatment',
        'Significant mechanism of injury without obvious injury',
        'Isolated SpO2 88–92% (known COPD)',
        'Immunocompromised patient',
        'Pregnancy >20 weeks with any complication',
      ],
    },
  },

  'clinical-approach-cb': {
    title: 'Clinical Approach (L1)',
    level: 'CB',
    category: 'primary',
    summary: 'Primary survey and structured approach for Level 1 responders',
    content: {
      steps: [
        { label: 'STOP — D', detail: 'Dangers & Safety: Ensure scene is safe' },
        { label: 'Rapid Assessment', detail: 'Does the patient appear WELL or UNWELL?' },
        { label: 'UNWELL → Primary Survey', detail: 'Proceed immediately to primary survey' },
        { label: 'WELL → Assess', detail: 'Proceed to structured assessment' },
        { label: 'ASSESS — Ask About', detail: 'Situation/Symptoms, Allergies, Medications, Past medical history, Last well (onset time), Extra information' },
        { label: 'ASSESS — Tools', detail: 'Perfusion, Respiratory, AVPU, Trauma 2° survey (head to toe)' },
        { label: 'PAUSE & PLAN', detail: 'Call 000 for all patients outside Hatzolah clinical scope. Identify clinical problems verbally. Confirm treatment plan with patient + team.' },
        { label: 'TREATMENT', detail: 'Manage as per appropriate CPG. If unsure, seek immediate clinical advice.' },
      ],
      criticalNote: 'All Level 1 incidents must be escalated with Ambulance or a Level 3 FR and higher for further investigation and management.',
    },
  },

  'clinical-approach-fr': {
    title: 'Clinical Approach',
    level: 'FR',
    category: 'primary',
    summary: 'Full structured clinical approach for First Responders',
    content: {
      primarySurvey: [
        { step: 'D', label: 'Dangers', action: 'Scene safety — do NOT enter unsafe scene' },
        { step: 'R', label: 'Response', action: 'Response to voice / pain?' },
        { step: 'S', label: 'Send for help', action: 'Call for Ambulance / 000, request backup' },
        { step: 'A', label: 'Airway', action: 'C-spine injury? Patency? Align in neutral position' },
        { step: 'B', label: 'Breathing', action: 'Breathing effectively?' },
        { step: 'C', label: 'Circulation', action: 'Pulse? Major bleeding? Apply direct pressure' },
      ],
      sampleHistory: [
        'S — Situation or Symptoms',
        'A — Allergies',
        'M — Medications',
        'P — Past medical history',
        'L — Last well (onset time)',
        'E — Extra information',
      ],
      assessmentTools: ['Perfusion Status Assessment', 'Respiratory Status Assessment', 'AVPU / GCS', 'Trauma 2° survey (head to toe)', 'Pain assessment (DOLORS)', 'BGL where indicated'],
    },
  },

  'conscious-status-cb': {
    title: 'Conscious Status Assessments (L1)',
    level: 'CB',
    category: 'neuro',
    summary: 'AVPU scale for Level 1 responders',
    content: {
      definition: 'Conscious state refers to the level of awareness someone has of their self and their surroundings. There is a spectrum ranging from fully alert to completely unconscious.',
      avpu: [
        { letter: 'A', meaning: 'Alert' },
        { letter: 'V', meaning: 'Responding to Voice' },
        { letter: 'P', meaning: 'Responding to Pain' },
        { letter: 'U', meaning: 'Unresponsive' },
      ],
      note: 'A child cannot have a conscious state assessment done while asleep. They must be woken first.',
    },
  },

  'conscious-status-fr': {
    title: 'Conscious Status Assessments',
    level: 'FR',
    category: 'neuro',
    summary: 'AVPU and GCS for First Responders',
    content: {
      avpu: [
        { letter: 'A', meaning: 'Alert' },
        { letter: 'V', meaning: 'Responding to Voice' },
        { letter: 'P', meaning: 'Responding to Pain' },
        { letter: 'U', meaning: 'Unresponsive' },
      ],
      gcs: {
        description: 'Glasgow Coma Scale — scores 3 to 15',
        eyeOpening: [
          { score: 4, response: 'Spontaneous' },
          { score: 3, response: 'To voice' },
          { score: 2, response: 'To pain' },
          { score: 1, response: 'None' },
        ],
        verbalResponse: [
          { score: 5, response: 'Orientated' },
          { score: 4, response: 'Confused' },
          { score: 3, response: 'Words only' },
          { score: 2, response: 'Sounds only' },
          { score: 1, response: 'None' },
        ],
        motorResponse: [
          { score: 6, response: 'Obeys commands' },
          { score: 5, response: 'Localises pain' },
          { score: 4, response: 'Withdraws from pain' },
          { score: 3, response: 'Flexion to pain' },
          { score: 2, response: 'Extension to pain' },
          { score: 1, response: 'None' },
        ],
      },
    },
  },

  'respiratory-assessment-cb': {
    title: 'Respiratory Status Assessment (L1)',
    level: 'CB',
    category: 'respiratory',
    summary: 'Basic respiratory assessment for Level 1 responders',
    content: {
      table: {
        headers: ['Category', 'Normal', 'Mild', 'Moderate', 'Severe'],
        rows: [
          ['Speech', 'Clear, full sentences', 'Short sentences', 'Words only', 'None'],
          ['Skin', 'Normal', 'Normal', 'Pale, sweaty', 'Pale, sweaty ± cyanosis'],
          ['Work of Breathing', 'Normal', 'Slight increase', 'Marked increase', 'Marked increase, tripod position'],
          ['Appearance', 'Calm, quiet', 'Calm or anxious', 'Distressed or anxious', 'Exhausted or fighting to breathe'],
          ['Sounds', 'Quiet', 'Cough, mild wheeze', 'Cough, insp/exp wheeze', 'No cough, wheeze, stridor'],
        ],
      },
      paediatricDistressSigns: [
        'Fast breathing',
        'Chest wall retraction (between ribs)',
        'Use of accessory wall muscles',
        'Tracheal tugging (neck)',
      ],
      paediatricLowO2Signs: {
        infants: ['Lethargy', 'Floppy', 'Confusion'],
        children: ['Restlessness', 'Fast breathing', 'Cyanosis (blue skin)'],
      },
    },
  },

  'respiratory-assessment-fr': {
    title: 'Respiratory Status Assessment',
    level: 'FR',
    category: 'respiratory',
    summary: 'Full respiratory assessment with SpO2 targets',
    content: {
      table: {
        headers: ['Category', 'Normal', 'Mild', 'Moderate', 'Severe'],
        rows: [
          ['Speech', 'Clear, full sentences', 'Short sentences', 'Words only', 'None'],
          ['Skin', 'Normal', 'Normal', 'Pale, sweaty', 'Pale, sweaty ± cyanosis'],
          ['Work of Breathing', 'Normal', 'Slight increase', 'Marked increase', 'Marked increase, tripod position'],
          ['Appearance', 'Calm, quiet', 'Calm or anxious', 'Distressed or anxious', 'Exhausted or fighting to breathe'],
          ['Sounds', 'Quiet', 'Cough, mild wheeze', 'Cough, insp/exp wheeze', 'No cough, wheeze, stridor'],
        ],
      },
      spo2Targets: [
        { condition: 'Default (no COPD)', target: '92–96%' },
        { condition: 'COPD / chronic hypoxic', target: '88–92%' },
        { condition: 'Major trauma / shock / severe sepsis / anaphylaxis', target: 'NRB 10–15 L/min initially, then titrate to 92–96%' },
        { condition: 'Toxic inhalation / cluster headache / postpartum haemorrhage', target: 'ALWAYS NRB 10–15 L/min' },
      ],
    },
  },

  'perfusion-assessment-cb': {
    title: 'Perfusion Status Assessment (L1)',
    level: 'CB',
    category: 'cardiac',
    summary: 'Basic perfusion assessment for Level 1 responders',
    content: {
      definition: 'Perfusion refers to the cardiovascular system\'s capacity to provide the body\'s tissues with sufficient oxygen and nutrients.',
      table: {
        headers: ['', 'Skin', 'Conscious State'],
        rows: [
          ['Adequate', 'Warm, Pink, Dry', 'Alert & Orientated'],
          ['↓ Adequate', 'Cool, Pale, Clammy', 'Alert OR Altered, Dizzy, Lightheaded'],
          ['No Perfusion', 'Cool, Pale, Clammy', 'Unconscious'],
        ],
      },
      management: 'If ↓ Adequate perfusion: Avoid standing the patient. Position flat. Call ambulance.',
    },
  },

  'perfusion-assessment-fr': {
    title: 'Perfusion Status Assessment',
    level: 'FR',
    category: 'cardiac',
    summary: 'Full perfusion assessment with BP and pulse criteria',
    content: {
      table: {
        headers: ['', 'Skin', 'Pulse', 'sBP', 'Conscious State'],
        rows: [
          ['Adequate', 'Warm, Pink, Dry', '60–100', '≥100', 'Alert & Orientated'],
          ['↓ Adequate', 'Cool, Pale, Clammy', '<50 or >100', '<100', 'Alert OR Altered, Dizzy, Lightheaded'],
          ['No Perfusion', 'Cool, Pale, Clammy', 'Absent', 'Unrecordable', 'Unconscious'],
        ],
      },
    },
  },

  'pain-assessment': {
    title: 'Pain Assessments',
    level: 'FR',
    category: 'primary',
    summary: 'DOLORS pain assessment framework',
    content: {
      dolors: [
        { letter: 'D', meaning: 'Description of the pain' },
        { letter: 'O', meaning: 'Onset time of the pain' },
        { letter: 'L', meaning: 'Location of the pain' },
        { letter: 'O', meaning: 'Other symptoms associated with the pain' },
        { letter: 'R', meaning: 'Relief from the pain (e.g. positional relief, home medications)' },
        { letter: 'S', meaning: 'Severity / pain score (0–10)' },
      ],
      wongBaker: {
        description: 'For patients aged 3–7 years or any patient who cannot communicate verbally.',
        warning: 'Do NOT use in adults with intact verbal communication — DOLORS preferred.',
      },
    },
  },

  'weight-calculations': {
    title: 'Weight Calculations',
    level: 'FR',
    category: 'paediatric',
    summary: 'Paediatric weight estimation formulas',
    content: {
      table: {
        headers: ['Age', 'Formula', 'Example'],
        rows: [
          ['≤12 months', 'Weight (kg) = (Age in months + 9) / 2', '6 months = 7.5 kg'],
          ['1–5 years', 'Weight (kg) = (Age × 2) + 8', '3 years = 14 kg'],
          ['6–12 years', 'Weight (kg) = (Age × 3) + 7', '8 years = 31 kg'],
        ],
      },
    },
  },

  'ventilation-rates': {
    title: 'Ventilation Rates',
    level: 'FR',
    category: 'respiratory',
    summary: 'BVM ventilation rates by age',
    content: {
      table: {
        headers: ['Age', 'Rate', 'Interval'],
        rows: [
          ['≥16 years', '12x per minute', 'Every 5 seconds'],
          ['12–15 years', '14–26x per minute', 'Every 3–4 seconds'],
          ['5–11 years', '16–34x per minute', 'Every 2–3 seconds'],
          ['1–4 years', '20–40x per minute', 'Every 2–3 seconds'],
          ['<1 year', '25–55x per minute', 'Every 2 seconds'],
        ],
      },
    },
  },

  'paediatric-assessment-triangle': {
    title: 'Paediatric Assessment Triangle',
    level: 'FR',
    category: 'paediatric',
    summary: 'Rapid paediatric assessment tool',
    content: {
      components: [
        { name: 'Appearance', details: 'Tone, Interactiveness, Consolability, Look/Gaze, Speech/Cry' },
        { name: 'Work of Breathing', details: 'Abnormal sounds, abnormal positioning, retractions, flaring' },
        { name: 'Circulation to Skin', details: 'Pallor, mottling, cyanosis' },
      ],
    },
  },
};

// ─────────────────────────────────────────────
// CLINICAL CONDITIONS (General Management)
// ─────────────────────────────────────────────

export const conditionsContent = {

  'altered-consciousness-cb': {
    title: 'Acute Altered Consciousness (L1)',
    level: 'CB',
    category: 'neuro',
    summary: 'Management of altered consciousness for Level 1 responders',
    content: {
      definition: 'Any instance of NEW onset decreased responsiveness.',
      management: [
        'Primary survey',
        'If unconscious and no pulse → Manage as Cardiac Arrest',
        'If breathing effectively → Recovery position',
        'If neck injury possible → Recovery position (support head in neutral position)',
        'SitRep: Hatzolah dispatch + call ambulance',
      ],
      critical: 'Consider risk of needlestick injuries when drug overdose is suspected.',
    },
  },

  'altered-consciousness-fr': {
    title: 'Acute Altered Consciousness',
    level: 'FR',
    category: 'neuro',
    summary: 'Full management of altered consciousness',
    content: {
      definition: 'Any instance of NEW onset decreased responsiveness.',
      aeioutips: [
        { letter: 'A', meaning: 'Alcohol intoxication / Arrhythmia' },
        { letter: 'E', meaning: 'Epilepsy / Encephalitis (hepatic)' },
        { letter: 'I', meaning: 'Insulin (hypoglycaemia or hyperglycaemia)' },
        { letter: 'O', meaning: 'Overdose / Oxygen (hypoxia)' },
        { letter: 'U', meaning: 'Underdose (missed medication)' },
        { letter: 'T', meaning: 'Trauma / Temperature' },
        { letter: 'I', meaning: 'Infection / Intussusception' },
        { letter: 'P', meaning: 'Poisoning / Psychiatric' },
        { letter: 'S', meaning: 'Stroke / Shock / Space-occupying lesion' },
      ],
      management: [
        'Primary survey',
        'If unconscious and no pulse → Cardiac Arrest protocol',
        'If inadequate ventilations and has pulse → Suction airway, BVM oxygen',
        'If breathing effectively → Recovery position',
        'SitRep + call ambulance',
        'Assess BGL',
        'Consider head injury, overdose as differentials',
      ],
    },
  },

  'airway-obstruction-cb': {
    title: 'Airway Obstruction (L1)',
    level: 'CB',
    category: 'respiratory',
    summary: 'Basic airway obstruction management for Level 1',
    content: {
      critical: 'This guideline is NOT to be used on newborns.',
      flowchart: [
        { condition: 'Unconscious + ineffective breathing', action: 'Manage as Cardiac Arrest' },
        { condition: 'Conscious + ineffective cough (Box A)', action: '5 back blows, then 5 chest thrusts. Repeat until clear. Use gravity for paediatric patients if safe.' },
        { condition: 'Conscious + effective cough (Box B)', action: 'Encourage coughing. Monitor for clearance/deterioration.' },
      ],
      escalation: 'Immediate escalation of care. SitRep: Hatzolah + call ambulance.',
    },
  },

  'airway-obstruction-fr': {
    title: 'Airway Obstruction',
    level: 'FR',
    category: 'respiratory',
    summary: 'Full airway obstruction management',
    content: {
      critical: 'This guideline is NOT to be used on newborns.',
      flowchart: [
        { condition: 'Unconscious + no pulse', action: 'Manage as Cardiac Arrest' },
        { condition: 'Unconscious + has pulse (Box A)', action: 'If accredited: laryngoscopy + Magill forceps. If not/fails: external chest compressions x5. Assess for clearance.' },
        { condition: 'Conscious + ineffective cough (Box B)', action: '5 back blows, then 5 abdominal thrusts (Heimlich). Repeat. Paediatric: gravity assist if safe.' },
        { condition: 'Conscious + effective cough (Box C)', action: 'Encourage coughing. Monitor.' },
      ],
    },
  },

  'anaphylaxis-cb': {
    title: 'Anaphylaxis (L1)',
    level: 'CB',
    category: 'medical',
    summary: 'Anaphylaxis recognition and management for Level 1',
    content: {
      definition: 'A severe, potentially life-threatening, systemic hypersensitivity reaction.',
      recognition: {
        rule: 'Sudden onset of symptoms (usually within 30 min, up to 4 hours)',
        rash: {
          R: 'Respiratory — breathing difficulty, wheeze, cough, stridor',
          A: 'Abdominal — nausea, vomiting, abdo cramps, diarrhoea',
          S: 'Skin/Mucosal — hives, welts, flushing, facial swelling',
          H: 'Hypotension — altered conscious state, floppy (child), dizzy/lightheaded',
        },
        trigger: '≥2 categories from R.A.S.H. — REGARDLESS of allergen exposure\nOR: Isolated hypotension + known allergen\nOR: Signs of isolated hypotension + known allergen',
      },
      management: [
        'Avoid standing/walking patient',
        'If altered conscious or hypotensive → Position: Flat',
        'If breathing difficulties → Position: Sitting/tripoding',
        'If safe/possible → Remove allergen (e.g. bee stinger)',
        '💊 Adrenaline IM (Epi-Pen) — see dosing',
        'Repeat initial dose ONCE only if worsens or no change at 5 mins. Then consult.',
        'If wheezing → Salbutamol puffer via spacer',
        '🚑 Escalate to ambulance regardless of severity/improvement',
      ],
      dosing: [
        { demo: '↑6 years AND ↑20 kg', drug: 'Adrenaline 0.3 mg Epi-Pen IM', repeat: 'Once only at 5 min. Consult for further.' },
        { demo: '↓6 years OR ↓20 kg', drug: 'Adrenaline 0.15 mg Epi-Pen Jr IM', repeat: 'Once only at 5 min. Consult for further.' },
      ],
    },
  },

  'anaphylaxis-fr': {
    title: 'Anaphylaxis',
    level: 'FR',
    category: 'medical',
    summary: 'Full anaphylaxis management protocol',
    content: {
      definition: 'A severe, potentially life-threatening, systemic hypersensitivity reaction. Typically caused by an excessive immune system response to an antigen.',
      recognition: {
        rash: {
          R: 'Respiratory — SOB, wheeze, cough, stridor',
          A: 'Abdominal — nausea, vomiting, abdo cramps, diarrhoea',
          S: 'Skin/Mucosal — hives, welts, flushing, angioedema',
          H: 'Hypotension — sBP <90',
        },
        trigger: '≥2 R.A.S.H. categories (regardless of known antigen)\nOR: Isolated hypotension (sBP <90) + known antigen\nOR: Isolated respiratory distress + known antigen',
        examples: 'Insects: bees, wasps, ants. Foods: peanuts, nuts, fish, dairy, soy, sesame, wheat. Medications: antibiotics, anaesthetic drugs, contrast media.',
      },
      management: [
        'If unconscious + ventilating inadequately → Position supine, BVM O2, call ambulance',
        'Avoid standing/walking patient',
        'If altered conscious or hypotensive → Position: Supine',
        'If breathing difficulties → Position: Sitting/tripoding',
        'Remove antigen if safe',
        '💊 Adrenaline IM (Epi-Pen) — see dosing',
        'Repeat once only. Consult clinician for further doses.',
        '💊 Oxygen NRB 10–15 L/min. Once stable, titrate to 92–96%.',
        '💊 If wheezing → Salbutamol nebulised 8L O2',
        '🚑 Transport to hospital regardless of severity/improvement',
      ],
      dosing: [
        { demo: '↑6 years AND ↑20 kg', drug: 'Adrenaline 0.3 mg Epi-Pen IM', repeat: 'Once only at 5 min. Consult for further.' },
        { demo: '↓6 years OR ↓20 kg', drug: 'Adrenaline 0.15 mg Epi-Pen Jr IM', repeat: 'Once only at 5 min. Consult for further.' },
      ],
      notes: [
        'Anaphylaxis can be difficult to identify — rash/itch is common but NOT mandatory',
        'Adrenaline saves lives! NEVER delay in favour of other medications',
        'Advise patient of adrenaline side effects: palpitations, anxiety, heart racing',
        'Hospital-based observations required for minimum 4 hours',
      ],
    },
  },

  'asthma-cb': {
    title: 'Asthma / Wheeze (L1)',
    level: 'CB',
    category: 'respiratory',
    summary: 'Basic asthma management for Level 1 responders',
    content: {
      recognition: [
        'Difficulty breathing AND wheezing',
        'Difficulty breathing AND asthma history',
      ],
      management: [
        'Minimise patient exertion',
        'If conscious → Position: Sitting/position of comfort',
        'If altered conscious → Position: Supine',
        '💊 If puffer available → Salbutamol puffer via spacer: 4 doses, 4 breaths each',
        'Repeat at 4 minutes if difficult breathing not relieved',
        'If mild and responds → VVED minimum',
        '🚩 THUNDERSTORM ASTHMA: If declared by Clinical Ops Manager AND no improvement:',
        '💊 Adrenaline IM Epi-Pen (0.3 mg if ≥20 kg; 0.15 mg if <20 kg)',
        '🚑 If moderate/severe/thunderstorm → Call ambulance/000',
      ],
      salbutamolDosing: [
        { demo: '↑2 years', route: 'pMDI (puffer)', dose: '4 puffs, 4 breaths per puff via spacer', repeat: '4 puffs @ 4 min via spacer', max: 'Nil' },
      ],
      notes: [
        'If 000 NOT called and ambulance NOT attending for mild asthma — VVED minimum',
        'Asthmatic patients can show initial improvement then rapidly deteriorate — ensure ongoing monitoring',
        'This guideline is only for patients ≥2 years old',
      ],
    },
  },

  'asthma-fr': {
    title: 'Asthma History / Wheeze',
    level: 'FR',
    category: 'respiratory',
    summary: 'Full asthma management with nebulisation',
    content: {
      recognition: [
        'Difficulty breathing AND wheezing',
        'Difficulty breathing AND asthma history',
      ],
      ageGroups: [
        {
          age: 'Adult / ≥16 years',
          mild_moderate: 'Salbutamol puffer 4–12 puffs via spacer, repeat @ 20 min',
          severe: 'Salbutamol nebulised 10 mg (2 ampules) 8L O2; repeat 5 mg @ 5 min',
          ipratropium: 'If no improvement after 20 min Salbutamol → Ipratropium Bromide 500 mcg nebulised',
        },
        {
          age: '12–15 years',
          mild_moderate: 'Salbutamol puffer 4–12 puffs via spacer, repeat @ 20 min',
          severe: 'Salbutamol nebulised 5 mg (1 ampule) 8L O2; repeat 5 mg @ 20 min',
          ipratropium: 'Ipratropium Bromide 250 mcg nebulised if no improvement',
        },
        {
          age: '6–11 years',
          mild_moderate: 'Salbutamol puffer 4–12 puffs via spacer, repeat @ 20 min',
          severe: 'Salbutamol nebulised 5 mg 8L O2; repeat 5 mg @ 20 min',
          ipratropium: 'Ipratropium Bromide 250 mcg nebulised if no improvement',
        },
        {
          age: '2–5 years',
          mild_moderate: 'Salbutamol puffer 2–6 puffs via spacer, repeat @ 20 min',
          severe: 'Salbutamol nebulised 2.5 mg (½ ampule) 8L O2; repeat 2.5 mg @ 20 min',
          ipratropium: 'Ipratropium Bromide 250 mcg nebulised if no improvement',
        },
      ],
    },
  },

  'cardiac-arrest-cb': {
    title: 'Cardiac Arrest (L1)',
    level: 'CB',
    category: 'cardiac',
    summary: 'Basic cardiac arrest management for Level 1 responders',
    content: {
      recognition: 'Unconscious AND ineffective breathing → manage as cardiac arrest.',
      primarySurvey: [
        { step: 'D', action: 'Dangers — do NOT enter unsafe scene' },
        { step: 'R', action: 'Response to voice/pain?' },
        { step: 'S', action: 'Call ambulance/000, request backup' },
        { step: 'A', action: 'Airway patency?' },
        { step: 'B', action: 'Breathing effectively? If not → CPR' },
        { step: 'C', action: 'Major bleeding? → Direct pressure/CAT tourniquet' },
      ],
      cprRatios: [
        { condition: 'Adult (≥15 years)', ratio: '30:2', rate: '100–120/min' },
        { condition: 'Child — single operator', ratio: '30:2', rate: '100–120/min' },
        { condition: 'Child — two operators', ratio: '15:2', rate: '100–120/min' },
      ],
      aed: 'Apply AED. Follow AED instructions. Ensure no one touching patient during shock.',
      rosc: [
        'Stop CPR if breathing normally / other signs of life',
        'Continuously monitor for re-arrest',
        'Place in recovery position',
      ],
      note: 'First Responders do NOT certify or verify death. If withholding CPR, contact on-call Clinician immediately.',
    },
  },

  'cardiac-arrest-fr': {
    title: 'Cardiac Arrest',
    level: 'FR',
    category: 'cardiac',
    summary: 'Full advanced cardiac arrest management',
    content: {
      recognition: 'No response + no/ineffective breathing + no pulse.',
      primarySurvey: [
        { step: 'D', action: 'Scene safety — do NOT enter unsafe scene' },
        { step: 'R', action: 'Response to voice/pain?' },
        { step: 'S', action: 'Call ambulance/000, request backup' },
        { step: 'A', action: 'C-spine injury? Patency? Align in neutral position.' },
        { step: 'B', action: 'Breathing effectively?' },
        { step: 'C', action: 'Pulse? Major bleeding? Direct pressure on major bleed.' },
      ],
      traumaticArrest: [
        'Pelvic fracture → Pelvic splint',
        'If required → Haemostatic dressing',
        'If required → CAT tourniquet',
      ],
      cpr: [
        '≥4 years old → 2-hand technique',
        '<5 years old → 1-hand technique',
        'Rate: 100–120 per minute',
        '≥16 years OR single officer → 30:2 with BVM 15L O2, consider LMA',
        '<16 years + multiple officers → 15:2 with BVM 15L O2, consider LMA',
      ],
      paediatricTable: {
        headers: ['Age', 'Category', 'Rescuers', 'Rate', 'Technique', 'Ratio'],
        rows: [
          ['≤24 hours', 'Newborn', '1', '100–120', '2 fingers', '3:1'],
          ['≤24 hours', 'Newborn', '2', '100–120', '2 thumbs', '3:1'],
          ['≤3 months', 'Small Infant', '1', '100–120', '2 fingers', '30:2'],
          ['≤3 months', 'Small Infant', '2', '100–120', '2 thumbs', '15:2'],
          ['3–12 months', 'Large Infant', '1', '100–120', '2 fingers', '30:2'],
          ['3–12 months', 'Large Infant', '2', '100–120', '2 thumbs', '15:2'],
          ['1 year', 'Small Child', '1/2', '100–120', '1 hand', '30:2 / 15:2'],
          ['2–4 years', 'Small Child', '1/2', '100–120', '1 hand', '30:2 / 15:2'],
          ['5–11 years', 'Medium Child', '1/2', '100–120', '2 hands', '30:2 / 15:2'],
        ],
      },
      rosc: [
        'Stop CPR when pulse returns',
        'If breathing ineffectively → BVM O2 at ventilation rates',
        'If accredited → 12-lead ECG',
        '🚑 Expedite transport',
      ],
    },
  },

  'cardiac-chest-pain': {
    title: 'Cardiac Chest Pain / Discomfort',
    level: 'FR',
    category: 'cardiac',
    summary: 'Acute coronary syndrome assessment and management',
    content: {
      definition: 'Cardiac chest pain from the heart or surrounding structures, often associated with ACS (Acute Coronary Syndrome) — a sudden blockage of coronary arteries.',
      management: [
        '🚑 SitRep: Hatzolah dispatch + call ambulance — treat as TIME CRITICAL',
        'If accredited → 12-lead ECG',
        '💊 If SpO2 <92% → Oxygen PRN',
        '💊 If suspected cardiac chest pain → Aspirin 300 mg oral',
        '💊 If pain ≥2 → GTN 300 mcg sublingual',
        'If pain ≥2 AND sBP ≥100 → Repeat GTN @ 5 min intervals',
        'Reassess BP and side effects after each dose',
        '💊 If pain ≥3 → Methoxyflurane inhaled',
      ],
      gtnContraindications: [
        'sBP <100 mmHg',
        'HR >150 BPM or HR <60 BPM',
        'Ventricular tachycardia',
        'PDE5 inhibitors (Viagra <24h, Cialis <48h, Levitra <24h, Stendra <12h)',
        'Riociguat (Adempas)',
        'Bleeding during pregnancy',
      ],
    },
  },

  'general-trauma-cb': {
    title: 'General Trauma Approach (L1)',
    level: 'CB',
    category: 'trauma',
    summary: 'Basic trauma management for Level 1 responders',
    content: {
      definition: 'Bodily injury from sudden significant force — blunt or penetrating.',
      principles: [
        'In traumatic cardiac arrest — managing correctable causes is priority (haemorrhage control)',
        'If possible C-spine injury — maintain neutral spinal alignment',
      ],
      management: [
        'Primary survey',
        'Control major haemorrhage',
        'If spinal injury suspected → apply cervical collar',
        'Call ambulance',
      ],
    },
  },

  'general-trauma-fr': {
    title: 'General Trauma Approach',
    level: 'FR',
    category: 'trauma',
    summary: 'Full trauma management protocol',
    content: {
      airway: [
        'Triple airway manoeuvre/positioning if required',
        'Suction if required (vomit/blood in airway)',
        'NPA if airway not patent',
        'OPA only if NPA unsuccessful',
      ],
      breathing: [
        'If breathing ineffectively → BVM O2 at ventilation rates',
        'If breathing effectively → NRB O2 10–15 L/min',
        'Titrate to SpO2 92–96% once stable',
      ],
      circulation: [
        'Control major haemorrhage — direct pressure',
        'CAT tourniquet for limb bleeding not controlled by direct pressure',
        'Haemostatic dressing for junctional wounds',
        'Pelvic binder if suspected pelvic fracture',
      ],
    },
  },

  'head-trauma': {
    title: 'Head Trauma',
    level: 'FR',
    category: 'trauma',
    summary: 'Head injury assessment and management',
    content: {
      timeCritical: [
        'GCS <13',
        'Penetrating head injury',
        '>5 min loss of consciousness',
        'Skull fracture',
        'Blood leaking from ear',
        'CSF leaking from ears or nose',
        'Battle sign (bruising behind earlobes)',
        'Racoon eyes (bruising under eyes)',
        'Vomiting more than once',
        'Neurological deficit',
      ],
      management: [
        'Maintain neutral spine alignment',
        'Control life-threatening bleeding + dress wound',
        'Suction airway if necessary (avoid stimulating gag reflex)',
        'Airway adjunct only if necessary for ventilation',
      ],
    },
  },

  'spinal-trauma': {
    title: 'Spinal Trauma',
    level: 'FR',
    category: 'trauma',
    summary: 'Spinal injury assessment and immobilisation',
    content: {
      immobilisationCriteria: [
        'Major trauma following blunt trauma to head or trunk',
        'Any new motor deficits/weakness',
        'Any new sensory deficits',
        'History of vertebral disease/abnormalities',
        'Age ≥65 years',
      ],
      management: [
        'Apply cervical collar if ANY immobilisation criteria met',
        'Consider self-extrication if conscious, co-operative, not intoxicated, not prevented by injury, no neurological deficit',
        'Otherwise: extricate on board/AV',
        '💊 Pain relief PRN',
      ],
    },
  },

  'burns': {
    title: 'Burns',
    level: 'FR',
    category: 'trauma',
    summary: 'Burn assessment and management',
    content: {
      types: ['Thermal (heat/fire)', 'Electrical (lightning, electrical grid)', 'Chemical (acids, industrial chemicals)', 'Radiation (industrial accidents)'],
      timeCritical: 'Airway burns → immediate time critical management',
      management: [
        'Safety: Do NOT inhale smoke/substances. Oxygen is flammable near flames.',
        '💊 Oxygen NRB 10–15 L/min regardless of SpO2',
        'Elevate burn if location allows',
        'Cool burn with CLEAN running water for 20 minutes (including any prior cooling)',
        'Stop cooling if temperature drops <35°C',
        'Do NOT use ice, iced water, or butter',
        'Do NOT burst blisters',
        'Dress burn with non-adherent dressing',
      ],
    },
  },

  'wound-care': {
    title: 'Wound Care',
    level: 'FR',
    category: 'trauma',
    summary: 'Open wound assessment and management',
    content: {
      types: {
        abrasion: ['Clean with 0.9% sodium chloride', 'Keep dry', 'Leave open air unless actively bleeding or deep', 'Refer to GP within 24 hours'],
        mammalBite: ['Clean with 0.9% sodium chloride', 'Leave open air unless actively bleeding', 'Refer to ED/VVED/PPCC within 2 hours (antibiotics + tetanus may be required)'],
        avulsion: ['Clean with 0.9% sodium chloride', 'Apply Melolin and bandage', 'Refer to ED'],
        puncture: ['If soiled: clean with 0.9% sodium chloride', 'Keep dry', 'Leave open or apply dry dressing', 'Refer to GP within 4 hours'],
        skinTear: ['Clean with 0.9% sodium chloride', 'Carefully realign skin flap', 'Apply Melolin plus silicone dressing', 'Refer to GP/PPCC/ED within 12 hours'],
      },
      referToED: [
        'Age <6 or >60', 'Immunocompromised', 'Diabetic', 'Bleeding disorder',
        'Unable to re-align wound edges', 'Soiled/foreign body in wound',
        'Wound to head, neck, face, hands or genitals', 'Deep wound',
        'Signs of infection', 'Pain not controlled',
      ],
    },
  },

  'alcohol-intoxication': {
    title: 'Alcohol Intoxication',
    level: 'FR',
    category: 'medical',
    summary: 'Assessment and management of alcohol intoxication',
    content: {
      recognition: [
        'Recent ingestion of ethanol',
        'Differentials excluded',
        'No other acute medical conditions',
        'Patient is low risk: has capacity, able to ambulate, competent sober adult carer available, no red flags',
      ],
      management: [
        'Remain with sober adult',
        'If necessary → manage as Altered Conscious State (Acute)',
        'If necessary → manage as Nausea/Vomiting',
        'Safety netting: advise no more alcohol, sleep on side, keep warm, maintain hydration',
        'Call ambulance if conscious state deteriorates, airway compromise, severe pain',
      ],
    },
  },

  'allergy-mild': {
    title: 'Allergy (Mild)',
    level: 'FR',
    category: 'medical',
    summary: 'Mild allergic reaction management (skin symptoms only)',
    content: {
      definition: 'Allergic symptoms confined to skin only (single body system). If multiple body systems → treat as Anaphylaxis.',
      recognition: ['Hives or welts', 'Itchy or swollen eyes', 'Itchy skin', 'Mild swelling'],
      management: [
        'If meets RASH criteria → Anaphylaxis protocol + call ambulance',
        '💊 If appropriate → Cetirizine 10 mg oral',
        'Monitor for 30 min for deterioration or improvement',
        'Consider VVED',
        'Safety netting: leave in care of responsible adult with advice to seek help if worsening',
      ],
    },
  },

  'hypoglycaemia': {
    title: 'Hypoglycaemia',
    level: 'FR',
    category: 'medical',
    summary: 'Low blood glucose level management',
    content: {
      definition: 'BGL <4 mmol/L',
      symptoms: ['Altered conscious state/confusion', 'Sweaty/pale skin', 'Slurred speech', 'Shakiness/tremors', 'Irritability/abnormal behaviour', 'Nausea/vomiting', 'Headache/blurred vision', 'Seizures'],
      management: [
        'If NOT responding → call ambulance/000',
        '💊 If responding AND can swallow → Glucose Paste 15 g oral',
        '💊 If NOT responding OR cannot swallow → Glucagon IM (accredited only)',
        'Recheck BGL after 5 minutes',
        'Once can swallow safely → advise to eat long-lasting carbohydrates within 20 min',
      ],
      referToGP: [
        'GCS fully returned to baseline',
        'Patient declining ambulance',
        'Known pre-existing diabetes',
        'Only oral glucose required',
        'Known cause of episode',
        'No injury or seizure',
        'Patient willing/able to eat carbohydrates',
        'Not pregnant',
        'No risks for prolonged/recurrent hypoglycaemia',
        'Can be monitored by responsible adult for ≥4 hours',
      ],
    },
  },

  'infection-sepsis': {
    title: 'Infection / Sepsis',
    level: 'FR',
    category: 'medical',
    summary: 'Infection recognition and sepsis management',
    content: {
      sirsCriteria: {
        description: 'Suspect infection AND ≥2 of the following:',
        criteria: ['RR >20 BPM', 'HR ≥90 BPM', 'sBP <100 mmHg', 'Temp >38°C', 'Temp <36°C'],
      },
      management: [
        'If meeting red flag vital signs → call ambulance/000',
        'If meeting SIRS criteria → VVED minimum',
        'If immunocompromised → VVED minimum',
      ],
      infectionControl: {
        standard: ['Hand hygiene', 'Respiratory hygiene', 'Safe sharps disposal', 'Clean reusable equipment', 'Environmental cleaning'],
        dropletAirborne: ['P2/N95 mask for staff', 'Patient must wear mask', 'Staff immunisations'],
      },
    },
  },

  'nausea-vomiting': {
    title: 'Nausea / Vomiting',
    level: 'FR',
    category: 'medical',
    summary: 'Anti-emetic management',
    content: {
      recognition: ['Non-tolerated nausea/vomiting', 'Prophylaxis for spinally immobilised patients'],
      management: [
        'If altered conscious → Recovery position/lateral',
        '💊 If alert → Ondansetron ODT',
        'If vomiting persists → consult/escalate',
      ],
    },
  },

  'pain-relief': {
    title: 'Pain Relief (Non-Cardiac)',
    level: 'FR',
    category: 'medical',
    summary: 'Non-cardiac pain assessment and management',
    content: {
      recognition: 'Pain score ≥0 out of 10',
      management: [
        'Non-pharmacological: positioning, splinting, ice pack',
        'Assess medication allergies',
        '💊 If pain ≥0 → Paracetamol oral',
        '💊 If pain ≥3 → Methoxyflurane inhaled',
      ],
    },
  },

  'seizure': {
    title: 'Seizure',
    level: 'FR',
    category: 'neuro',
    summary: 'Seizure management including GCSE',
    content: {
      definition: 'Sudden, uncontrolled electrical disturbance in the brain.',
      midazolamIndication: 'GCSE: ongoing generalised tonic-clonic movements + altered conscious state lasting ≥5 min OR multiple seizures without full recovery between episodes. ACCREDITED ONLY.',
      management: [
        'If soiled airways → suction',
        '💊 If breathing ineffectively → Oxygen BVM 8–15 L/min',
        '💊 If breathing adequately → Oxygen NRB 10–15 L/min (titrate to 92–96% if adequate perfusion)',
        'SitRep: Hatzolah + call ambulance',
        'Protect patient from injury / pad head if at risk',
        'Do NOT forcibly restrict convulsions',
        'If prescribed → assist carer to administer seizure plan',
        '💊 If meeting GCSE criteria → Midazolam IM (accredited only)',
        'Monitor respiratory status carefully',
      ],
    },
  },

  'stroke': {
    title: 'Stroke (Acute)',
    level: 'FR',
    category: 'neuro',
    summary: 'Acute stroke recognition and emergency management',
    content: {
      definition: 'Blockage to brain blood supply OR blood vessel rupture causing brain cell death.',
      fast: [
        { letter: 'F', meaning: 'Facial droop — ask patient to smile or show teeth' },
        { letter: 'A', meaning: 'Arm/Limb weakness — hold arms straight for 10s, squeeze your fingers' },
        { letter: 'S', meaning: 'Speech deficit — ask to repeat "you can\'t teach an old dog new tricks"' },
      ],
      recognition: 'FAST symptoms lasting <24 hours AND BGL ≥4 mmol/L',
      history: [
        'What time were stroke symptoms first noticed?',
        'When was patient last known/seen to be well?',
        'Have these symptoms occurred previously?',
        'Previous stroke history?',
        'Drug or alcohol affected?',
      ],
      management: [
        'If unconscious → manage as unconscious patient guideline',
        '🚑 TREAT AS TIME CRITICAL',
        '💊 Only if SpO2 <92% → Oxygen PRN',
        'Assess BGL — if <4 → manage hypoglycaemia then re-evaluate for stroke',
        'Support all limbs',
        '🚑 SitRep: Hatzolah dispatch + call ambulance regardless of severity',
      ],
    },
  },

  'dehydration': {
    title: 'Dehydration',
    level: 'FR',
    category: 'medical',
    summary: 'Dehydration assessment and fluid management',
    content: {
      recognition: 'Less than adequate perfusion as per Perfusion Status Assessment.',
      management: [
        'If able to tolerate oral fluids → encourage to drink water',
        'If ↓Adequate PSA due to dehydration → call ambulance/000',
        '💊 If ↓Adequate PSA AND unable to tolerate oral → IV access + Normal Saline (accredited only)',
      ],
    },
  },

  'falls': {
    title: 'Falls',
    level: 'FR',
    category: 'trauma',
    summary: 'Falls assessment for adults from <1 metre',
    content: {
      recognition: 'Adult patient, fall of <1 metre, alert on Hatzolah arrival.',
      assessment: [
        'Assess cause of fall (AEIOUTIPS)',
        'Assess mechanism: when, from what position, height, surface',
        'Assess for head injury: LOC, CSF from ear/nose, bruising, vomiting, seizure, amnesia',
        'Assess for spinal injury if uncontrolled fall',
        'Assess for neck of femur: leg shortening/rotation, hip pain on ambulation',
        'Assess for syncope: cardiac history, ECG findings',
        'Assess risk of falling again',
      ],
      hospitalTransport: [
        'GCS <13', 'Penetrating head injury', '>5 min LOC', 'Skull fracture signs',
        'Vomiting >once', 'Abdominal pain', 'Blood in urine/vomit/stools',
        'Leg shortening or rotation', 'Hip pain on ambulation',
        'Suspected STEMI/arrhythmia', 'Epilepsy/seizure', 'Deliberate OD',
        'Severe pain, fracture, or dislocation', 'Likely to re-fall within 24 hours',
      ],
    },
  },
};

// ─────────────────────────────────────────────
// PHARMACOLOGY (MEDICATIONS)
// ─────────────────────────────────────────────

export const medicationsContent = {

  'adrenaline': {
    title: 'Adrenaline',
    level: 'ALL',
    universal: true, // Epi-Pen — administered by every practice level
    category: 'emergency',
    summary: 'Anaphylaxis and thunderstorm asthma — IM Epi-Pen',
    content: {
      indications: ['Anaphylaxis', 'Thunderstorm asthma'],
      contraindications: ['Hypovolaemic shock without adequate fluid replacement'],
      precautions: [
        'Do NOT delay immediate adrenaline in anaphylaxis',
        'Consider reduced doses for: elderly/frail, cardiovascular disease, MAOIs',
        'Consider increased doses for: beta blockers (current/recent use)',
      ],
      adverseEffects: ['Sinus tachycardia', 'SVT', 'Ventricular tachycardia', 'MI exacerbation', 'Hypertension', 'Anxiety', 'Palpitations', 'Pupillary dilatation'],
      dosing: [
        {
          indication: 'Anaphylaxis OR Thunderstorm Asthma',
          demographic: '↑6 years old AND ↑20 kg',
          route: 'IM Epi-Pen',
          initial: '0.3 mg',
          repeat: 'Once only at 5 min',
          max: 'Consult',
        },
        {
          indication: 'Anaphylaxis OR Thunderstorm Asthma',
          demographic: '↓6 years old OR ↓20 kg',
          route: 'IM Epi-Pen Jr',
          initial: '0.15 mg',
          repeat: 'Once only at 5 min',
          max: 'Consult',
        },
      ],
    },
  },

  'aspirin': {
    title: 'Aspirin',
    level: 'FR',
    category: 'cardiac',
    summary: 'Cardiac chest pain / suspected ACS',
    content: {
      indications: ['Cardiac chest pain or discomfort', 'Suspected ACS'],
      contraindications: [
        'Chest pain associated with psychostimulant OD where sBP >160 mmHg',
        'Hypersensitivity to aspirin/salicylates',
        'Actively bleeding peptic ulcers',
        'Bleeding disorders',
        'Suspected dissecting aortic aneurysm',
      ],
      precautions: ['Peptic ulcer (not actively bleeding)', 'Asthma', 'Anticoagulants'],
      adverseEffects: ['Heartburn', 'Nausea', 'Gastrointestinal bleeding', 'Increased bleeding time', 'Hypersensitivity reactions'],
      dosing: [
        {
          indication: 'Cardiac chest pain / Discomfort',
          demographic: '↑11 years old',
          route: 'Oral',
          initial: '300 mg',
          repeat: 'Nil',
          max: '300 mg (total dose)',
        },
      ],
    },
  },

  'cetirizine': {
    title: 'Cetirizine',
    level: 'FR',
    category: 'allergy',
    summary: 'Mild allergic reaction — skin symptoms only',
    content: {
      indications: ['Mild allergy — skin symptoms only (hives, welts, itchiness)'],
      contraindications: ['Known hypersensitivity to cetirizine or hydroxyzine'],
      precautions: ['Avoid alongside alcohol or other CNS depressants — may cause sedation'],
      adverseEffects: ['Drowsiness', 'Sore throat', 'Dizziness', 'Dry mouth', 'Headache'],
      dosing: [
        {
          indication: 'Mild allergy',
          demographic: '↑11 years old',
          route: 'Oral',
          initial: '10 mg',
          repeat: 'Nil',
          max: '10 mg (total dose)',
        },
      ],
    },
  },

  'glucagon': {
    title: 'Glucagon',
    level: 'SR',       // SR — accredited only
    category: 'endocrine',
    summary: 'Hypoglycaemia — not responding or cannot swallow. Accredited only.',
    content: {
      indications: ['BGL <4 mmol/L AND not responding OR cannot swallow safely'],
      contraindications: ['Must be accredited to administer IM Glucagon'],
      precautions: ['Nil'],
      adverseEffects: ['Nausea/vomiting'],
      dosing: [
        {
          indication: 'BGL <4, not responding or cannot swallow',
          demographic: '↑8 years old',
          route: 'IM',
          initial: '1 mg',
          repeat: 'Nil',
          max: '1 mg (total dose)',
        },
        {
          indication: 'BGL <4, not responding or cannot swallow',
          demographic: '↓8 years old',
          route: 'IM',
          initial: '0.5 mg',
          repeat: 'Nil',
          max: '0.5 mg (total dose)',
        },
      ],
    },
  },

  'glucose-paste': {
    title: 'Glucose Paste',
    level: 'ALL',
    universal: true, // no clinical skill required — every practice level
    category: 'endocrine',
    summary: 'Hypoglycaemia — conscious and can swallow safely',
    content: {
      indications: ['BGL <4 mmol/L AND responding AND can swallow safely'],
      contraindications: ['Must be able to swallow safely — do NOT administer if altered conscious or at risk of choking'],
      precautions: ['Nil'],
      adverseEffects: ['Nil'],
      dosing: [
        {
          indication: 'BGL <4, responding, can swallow',
          demographic: 'All ages',
          route: 'Oral',
          initial: '15 g',
          repeat: 'Nil',
          max: '15 g (total dose)',
        },
      ],
    },
  },

  'gtn': {
    title: 'Glyceryl Trinitrate (GTN)',
    level: 'FR',
    category: 'cardiac',
    summary: 'Cardiac chest pain / discomfort — sublingual',
    content: {
      indications: ['Cardiac chest pain/discomfort'],
      contraindications: [
        'sBP <100 mmHg',
        'HR >150 BPM',
        'HR <60 BPM',
        'Ventricular tachycardia — perform ECG prior to administration when accredited to do so',
        'PDE5 inhibitors — Avanafil <12h, Sildenafil <24h, Tadalafil <48h, Vardenafil <24h',
        'Riociguat (Adempas) — current/recent use',
        'Bleeding during pregnancy',
      ],
      precautions: [
        'Right/inferior MI with sBP <160 mmHg — risk of severe hypotension',
        'Higher risk: age >60, no previous GTN history, recent MI',
        'Preterm labour with concurrent tocolytics',
      ],
      adverseEffects: ['Hypotension', 'Tachycardia', 'Bradycardia', 'Headache', 'Dizziness', 'Syncope', 'Skin flushing'],
      pregnancy: 'Safe in pregnancy. Monitoring required if breastfeeding.',
      dosing: [
        {
          indication: 'Cardiac chest pain/discomfort',
          demographic: '↑15 years old',
          route: 'Sublingual',
          initial: '300 mcg',
          repeat: '300 mcg @ 5 min',
          max: 'Nil (within reason)',
        },
      ],
    },
  },

  'ipratropium': {
    title: 'Ipratropium Bromide',
    level: 'SR',       // SR — accredited, nebulised
    category: 'respiratory',
    summary: 'Asthma/wheeze — no improvement after 20 min Salbutamol. Accredited only.',
    content: {
      indications: ['Difficulty breathing AND wheezing', 'Difficulty breathing AND asthma history', 'No improvement after 20 min Salbutamol'],
      contraindications: ['Atropine hypersensitivity (including derivatives)'],
      precautions: ['Glaucoma', 'Avoid contact with eyes'],
      adverseEffects: ['Palpitations', 'Tachycardia', 'Headache', 'Acute angle closure glaucoma (rare, eye contact)', 'Nausea', 'Dry mouth', 'Skin rash'],
      dosing: [
        {
          indication: 'No improvement after 20 min Salbutamol',
          demographic: '↑11 years old',
          route: 'Nebulised',
          initial: '500 mcg (2 nebules)',
          repeat: 'Nil',
          max: '500 mcg (total dose)',
        },
        {
          indication: 'No improvement after 20 min Salbutamol',
          demographic: '↓12 years old',
          route: 'Nebulised',
          initial: '250 mcg (1 nebule)',
          repeat: 'Nil',
          max: '250 mcg (total dose)',
        },
      ],
    },
  },

  'methoxyflurane': {
    title: 'Methoxyflurane',
    level: 'FR',
    category: 'analgesia',
    summary: 'Pain score ≥3 — inhaled analgesia (Penthrox)',
    content: {
      indications: ['Pain score ≥3', 'Moderate or severe pain'],
      contraindications: ['Malignant hyperthermia (known or family history)', 'Pre-existing renal disease'],
      precautions: [
        'Do NOT exceed 6 mL in 24 hours — risk of kidney damage',
        'Do NOT administer in confined space',
        'Ensure adequate ventilation',
        'Place used inhalers in closed bag when not in use',
      ],
      adverseEffects: ['Dizziness', 'Drowsiness', 'Hypotension', 'Nausea/vomiting'],
      pregnancy: 'Safe in pregnancy and while breastfeeding.',
      dosing: [
        {
          indication: 'Pain score ≥3',
          demographic: 'All ages',
          route: 'Inhaled whistle',
          initial: '3 mL',
          repeat: '3 mL PRN (lasts ~25 min continuous)',
          max: '6 mL in 24 hours',
        },
      ],
    },
  },

  'midazolam': {
    title: 'Midazolam',
    level: 'SR',       // SR — accredited only
    category: 'neuro',
    summary: 'GCSE ≥5 min or multiple seizures. Accredited only.',
    content: {
      indications: [
        'Ongoing tonic-clonic activity with altered consciousness lasting ≥5 min (GCSE)',
        'Multiple ongoing GCSE episodes without full recovery between seizures',
      ],
      contraindications: ['Only accredited responders may administer', 'Known hypersensitivity to benzodiazepines'],
      precautions: [
        'Reduce doses for: elderly/frail, <60 kg, chronic renal failure/CCF/shock',
        'CNS depressant effects enhanced with narcotics, tranquilisers, alcohol',
        'Can cause severe respiratory depression in COPD patients',
        'Patients with myasthenia gravis',
      ],
      adverseEffects: ['Depressed level of consciousness', 'Respiratory depression', 'Loss of airway control', 'Hypotension'],
      dosing: [
        {
          indication: 'GCSE ≥5 min or multiple GCSE',
          demographic: '↑15 years old AND (elderly/frail OR ↓60 kg)',
          route: 'IM',
          initial: '5 mg',
          repeat: '5 mg @ 5 min if required',
          max: '10 mg (total dose)',
        },
        {
          indication: 'GCSE ≥5 min or multiple GCSE',
          demographic: '↑15 years old AND NOT elderly/frail AND ↑60 kg',
          route: 'IM',
          initial: '10 mg',
          repeat: '10 mg @ 10 min if required',
          max: '20 mg (total dose)',
        },
      ],
    },
  },

  'normal-saline': {
    title: 'Normal Saline',
    level: 'SR',       // SR — accredited IV access
    category: 'fluids',
    summary: 'IV fluid replacement for dehydration. Accredited only.',
    content: {
      indications: ['Fluid replacement for volume-depleted patients (dehydration)', 'Diluent for IV medications if required'],
      contraindications: ['Bilateral fine crackles on chest auscultation (APO)'],
      precautions: ['Reduce doses for: elderly/frail, heart failure, renal failure'],
      adverseEffects: ['Fluid overload risk with high-risk patients or large volumes'],
      dosing: [
        {
          indication: '↓Adequate PSA due to dehydration',
          demographic: '↑15 years AND (elderly OR renal/heart failure)',
          route: 'IV',
          initial: '500 mL (titrate to response)',
          repeat: 'Nil',
          max: '500 mL',
        },
        {
          indication: '↓Adequate PSA due to dehydration',
          demographic: '↑15 years AND NOT elderly AND NO renal/heart failure',
          route: 'IV',
          initial: '1000 mL (titrate to response)',
          repeat: 'Nil',
          max: '1000 mL',
        },
      ],
    },
  },

  'ondansetron': {
    title: 'Ondansetron',
    level: 'FR',
    category: 'gastro',
    summary: 'Non-tolerated nausea/vomiting or spinal immobilisation prophylaxis',
    content: {
      indications: ['Non-tolerated nausea/vomiting', 'Prophylaxis for spinal immobilisation'],
      contraindications: ['Apomorphine (Parkinson\'s medication)'],
      precautions: [
        'First trimester pregnancy (0–12 weeks) — consult receiving hospital first',
        'Congenital Long QT syndrome / QTc ≥500 ms',
        'Severe liver disease — do not exceed 8 mg/day',
        'Phenylketonuria (PKU) history',
      ],
      adverseEffects: ['Headache/dizziness', 'QT prolongation', 'Constipation', 'Visual disturbances'],
      pregnancy: '1st trimester: consult. 2nd/3rd trimester: only if vomiting very severe. Safe while breastfeeding.',
      dosing: [
        {
          indication: 'Non-tolerated nausea/vomiting',
          demographic: '↑11 years old',
          route: 'ODT (dissolving tablet)',
          initial: '4 mg',
          repeat: '4 mg @ 20 min if required',
          max: '8 mg (total dose)',
        },
        {
          indication: 'Non-tolerated nausea/vomiting',
          demographic: '5–11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: 'Nil',
          max: '4 mg (total dose)',
        },
        {
          indication: 'Non-tolerated nausea/vomiting',
          demographic: '↓5 years old',
          route: 'ODT',
          initial: '2 mg',
          repeat: 'Nil',
          max: '2 mg (total dose)',
        },
        {
          indication: 'Prophylaxis for spinal immobilisation',
          demographic: '↑11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: '4 mg @ 20 min if required',
          max: '8 mg (total dose)',
        },
        {
          indication: 'Prophylaxis for spinal immobilisation',
          demographic: '5–11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: 'Nil',
          max: '4 mg (total dose)',
        },
        {
          indication: 'Prophylaxis for spinal immobilisation',
          demographic: '↓5 years old',
          route: 'ODT',
          initial: '2 mg',
          repeat: 'Nil',
          max: '2 mg (total dose)',
        },
      ],
    },
  },

  'oxygen': {
    title: 'Oxygen',
    level: 'FR',
    category: 'respiratory',
    summary: 'Oxygen therapy — titrated to condition',
    content: {
      note: 'This CPG intended for patients ≥16 years. High-concentration O2 may be harmful in patients at risk of hypercapnic respiratory failure.',
      copdSuspect: ['Chronic cough/sputum', 'Age >40', 'Past history of smoking', 'Dyspnoea on exertion'],
      indications: [
        { condition: 'Severe shortness of breath (default)', target: 'Apply oxygen; titrate SpO2 ≥92%' },
        { condition: 'SpO2 <92%', target: 'Titrate to SpO2 92%+' },
        { condition: 'COPD / neuromuscular / cystic fibrosis / bronchiectasis / kyphoscoliosis / obesity', target: 'Titrate SpO2 88–92%' },
        { condition: 'SpO2 <85% / major trauma / head injury / shock / severe sepsis / anaphylaxis / seizure', target: 'Initial NRB 10–15 L/min; then titrate 92–96% once haemodynamically stable' },
        { condition: 'Toxic inhalation / decompression illness / cord prolapse / cluster headache / postpartum haemorrhage', target: 'ALWAYS NRB 10–15 L/min' },
      ],
    },
  },

  'paracetamol': {
    title: 'Paracetamol',
    level: 'FR',
    category: 'analgesia',
    summary: 'Mild to moderate pain — oral analgesia',
    content: {
      indications: ['Mild pain', 'Moderate/severe pain in combination with other analgesics'],
      contraindications: [
        'Any paracetamol in children <1 month old',
        'Paracetamol tablets in children <7 years old',
      ],
      precautions: [
        'Do NOT administer if paracetamol given within past 4 hours',
        'Do NOT administer if total paracetamol exceeds 4 g/24h (adults) or 60 mg/kg/24h (children)',
        'Liver toxicity risk in: liver disease, elderly/frail, malnourishment',
      ],
      adverseEffects: ['Rashes/hypersensitivity reactions', 'Haematological reactions', 'Hypotension (IV infusion)'],
      pregnancy: 'Safe in pregnancy and while breastfeeding.',
      dosing: [
        {
          demographic: '↑60 years OR ↓60 kg OR frail',
          route: 'Oral tablet',
          initial: '500 mg (1 tablet)',
          repeat: '500 mg @ 4 hours if required',
          max: '4 doses in 24 hours',
        },
        {
          demographic: '16–60 years AND ↑60 kg AND NOT frail',
          route: 'Oral tablet',
          initial: '1000 mg (2 tablets)',
          repeat: '1000 mg @ 4 hours if required',
          max: '4 doses in 24 hours',
        },
        {
          demographic: '12–15 years',
          route: 'Oral tablet',
          initial: '500 mg (1 tablet)',
          repeat: '500 mg @ 4 hours if required',
          max: '4 doses in 24 hours',
        },
        {
          demographic: '↓12 years',
          route: 'Oral liquid',
          initial: '15 mg/kg',
          repeat: '15 mg/kg @ 4 hours if required',
          max: '4 doses in 24 hours',
          weightTable: [
            { weight: '36 kg', age: '11 years (approx)', dose: '540 mg', volume: '23 mL' },
            { weight: '33 kg', age: '10 years (approx)', dose: '495 mg', volume: '21 mL' },
            { weight: '26 kg', age: '9 years (approx)', dose: '390 mg', volume: '16 mL' },
            { weight: '24 kg', age: '8 years (approx)', dose: '360 mg', volume: '15 mL' },
            { weight: '22 kg', age: '7 years (approx)', dose: '330 mg', volume: '14 mL' },
            { weight: '20 kg', age: '6 years (approx)', dose: '300 mg', volume: '13 mL' },
            { weight: '18 kg', age: '5 years (approx)', dose: '270 mg', volume: '11 mL' },
            { weight: '16 kg', age: '4 years (approx)', dose: '240 mg', volume: '10 mL' },
            { weight: '14 kg', age: '3 years (approx)', dose: '210 mg', volume: '9 mL' },
            { weight: '12 kg', age: '2 years (approx)', dose: '180 mg', volume: '8 mL' },
            { weight: '10 kg', age: '1 year (approx)', dose: '150 mg', volume: '6 mL' },
            { weight: '8 kg', age: '6 months (approx)', dose: '120 mg', volume: '5 mL' },
            { weight: '6 kg', age: '3 months (approx)', dose: '90 mg', volume: '4 mL' },
          ],
        },
      ],
    },
  },

  // Dual-level entries (like anaphylaxis-cb/-fr): the CB version carries the
  // puffer route only — nebulised salbutamol is an FR/SR skill, so a single
  // universal entry would show out-of-scope dosing to Code Blue responders.
  'salbutamol-cb': {
    title: 'Salbutamol (L1)',
    level: 'CB',
    category: 'respiratory',
    summary: 'Asthma/wheeze — puffer via spacer',
    content: {
      indications: ['Difficulty breathing AND wheezing', 'Difficulty breathing AND asthma history'],
      contraindications: ['Nil'],
      precautions: ['Large doses may cause intracellular metabolic acidosis'],
      adverseEffects: ['Tachycardia', 'Tremors'],
      dosing: [
        {
          indication: 'Mild/moderate asthma — puffer',
          demographic: '↑5 years old',
          route: 'pMDI (puffer) via spacer',
          initial: '4–12 puffs, 4 breaths per puff',
          repeat: '4–12 puffs @ 20 min',
          max: 'Nil',
        },
        {
          indication: 'Mild/moderate asthma — puffer',
          demographic: '2–5 years old',
          route: 'pMDI (puffer) via spacer',
          initial: '2–6 puffs, 4 breaths per puff',
          repeat: '2–6 puffs @ 20 min',
          max: 'Nil',
        },
      ],
    },
  },

  'salbutamol-fr': {
    title: 'Salbutamol',
    level: 'FR',
    category: 'respiratory',
    summary: 'Asthma/wheeze — puffer or nebulised',
    content: {
      indications: ['Difficulty breathing AND wheezing', 'Difficulty breathing AND asthma history'],
      contraindications: ['Nil'],
      precautions: ['Large doses may cause intracellular metabolic acidosis'],
      adverseEffects: ['Tachycardia', 'Tremors'],
      dosing: [
        {
          indication: 'Mild/moderate asthma — puffer',
          demographic: '↑5 years old',
          route: 'pMDI (puffer) via spacer',
          initial: '4–12 puffs, 4 breaths per puff',
          repeat: '4–12 puffs @ 20 min',
          max: 'Nil',
        },
        {
          indication: 'Mild/moderate asthma — puffer',
          demographic: '2–5 years old',
          route: 'pMDI (puffer) via spacer',
          initial: '2–6 puffs, 4 breaths per puff',
          repeat: '2–6 puffs @ 20 min',
          max: 'Nil',
        },
        {
          indication: 'Severe asthma or nil improvement — nebulised (FR)',
          demographic: '↑15 years old',
          route: 'Nebulised 8L O2',
          initial: '10 mg (2 ampules)',
          repeat: '5 mg @ 5 min (1 ampule)',
          max: 'Nil',
        },
        {
          indication: 'Severe asthma or nil improvement — nebulised (FR)',
          demographic: '7–15 years old',
          route: 'Nebulised 8L O2',
          initial: '5 mg (1 ampule)',
          repeat: '5 mg @ 20 min',
          max: 'Nil',
        },
        {
          indication: 'Severe asthma or nil improvement — nebulised (FR)',
          demographic: '2–5 years old',
          route: 'Nebulised 8L O2',
          initial: '2.5 mg (½ ampule)',
          repeat: '2.5 mg @ 20 min',
          max: 'Nil',
        },
        {
          indication: 'Anaphylaxis + wheezing — nebulised (FR)',
          demographic: '↑16 years old',
          route: 'Nebulised 8L O2',
          initial: '10 mg (2 ampules)',
          repeat: '5 mg @ 5 min',
          max: 'Nil',
        },
        {
          indication: 'Anaphylaxis + wheezing — nebulised (FR)',
          demographic: '6–15 years old',
          route: 'Nebulised 8L O2',
          initial: '5 mg (1 ampule)',
          repeat: '5 mg @ 20 min',
          max: 'Nil',
        },
        {
          indication: 'Anaphylaxis + wheezing — nebulised (FR)',
          demographic: '2–5 years old',
          route: 'Nebulised 8L O2',
          initial: '2.5 mg (½ ampule)',
          repeat: '2.5 mg @ 20 min',
          max: 'Nil',
        },
      ],
    },
  },
};

// ─────────────────────────────────────────────
// LEVEL CONFIG — Practice Level Definitions
// ─────────────────────────────────────────────

export const PRACTICE_LEVELS = {
  CB: {
    id: 'CB',
    label: 'Code Blue',
    description: 'Basic first aid level — limited medication scope',
    color: '#1e40af',
    bg: '#dbeafe',
    headerGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  },
  FR: {
    id: 'FR',
    label: 'First Responder',
    description: 'Standard paramedic protocols',
    color: '#166534',
    bg: '#dcfce7',
    headerGradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  },
  SR: {
    id: 'SR',
    label: 'Senior Responder',
    description: 'All FR protocols + accredited advanced procedures',
    color: '#92400e',
    bg: '#fef3c7',
    headerGradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
  },
  // Display config for `universal: true` protocols (foundational content shown to every level).
  // Not a selectable practice level — never used as a userLevel, only as a protocol's level badge.
  ALL: {
    id: 'ALL',
    label: 'All Levels',
    description: 'Foundational reference — available to every practice level',
    color: '#334155',
    bg: '#e2e8f0',
    headerGradient: 'linear-gradient(135deg, #334155 0%, #64748b 100%)',
  },
};

// The practice levels a user can actually select (excludes the 'ALL' display
// pseudo-level above). Used by LevelSelection and Settings.
export const SELECTABLE_LEVELS = ['CB', 'FR', 'SR'];

// What each level can PERFORM
export const CAN_PERFORM = {
  CB: ['CB'],
  FR: ['FR'],
  SR: ['SR', 'FR'],
};

// What each level sees as REFERENCE (read-only, greyed out)
export const REFERENCE_ONLY = {
  CB: [],
  FR: ['CB'],
  SR: ['CB'],
};

// Category tile colours for Assessment home screen
export const CATEGORY_COLORS = {
  primary:     { bg: '#e0e7ff', icon: '#4338ca', label: 'Primary' },
  cardiac:     { bg: '#fee2e2', icon: '#dc2626', label: 'Cardiac' },
  respiratory: { bg: '#bfdbfe', icon: '#2563eb', label: 'Respiratory' },
  neuro:       { bg: '#ede9fe', icon: '#7c3aed', label: 'Neurological' },
  trauma:      { bg: '#ffedd5', icon: '#ea580c', label: 'Trauma' },
  medical:     { bg: '#dcfce7', icon: '#16a34a', label: 'Medical' },
  paediatric:  { bg: '#fce7f3', icon: '#db2777', label: 'Paediatric' },
  endocrine:   { bg: '#fef9c3', icon: '#ca8a04', label: 'Endocrine' },
  analgesia:   { bg: '#f0fdf4', icon: '#059669', label: 'Analgesia' },
  fluids:      { bg: '#e0f2fe', icon: '#0284c7', label: 'Fluids' },
  gastro:      { bg: '#fdf4ff', icon: '#a21caf', label: 'Gastro' },
  allergy:     { bg: '#fff7ed', icon: '#c2410c', label: 'Allergy' },
  emergency:   { bg: '#fee2e2', icon: '#b91c1c', label: 'Emergency' },
};
