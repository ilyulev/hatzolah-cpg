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
    universal: true,
    category: 'primary',
    summary: 'Age-based acceptable vital sign ranges',
    content: {
      acceptableVitalSignValues: {
        ageCategoryWeightAndConsciousState: {
          headers: ['Age', 'Category', 'Weight', 'AVPU/GCS'],
          rows: [
            ['< 24 hours', 'Newborn', '3.5 kg', 'A / 15'],
            ['< 3 months', 'Small Infant', '6 kg', 'A / 15'],
            ['3 - 12 months', 'Large Infant', '8 kg', 'A / 15'],
            ['1 year', 'Small Child', '10 kg', 'A / 15'],
            ['2 years', 'Small Child', '12 kg', 'A / 15'],
            ['3 years', 'Small Child', '16 kg', 'A / 15'],
            ['4 years', 'Small Child', '18 kg', 'A / 15'],
            ['5 years', 'Medium Child', '20 kg', 'A / 15'],
            ['6 years', 'Medium Child', '22 kg', 'A / 15'],
            ['7 years', 'Medium Child', '24 kg', 'A / 15'],
            ['8 years', 'Medium Child', '26 kg', 'A / 15'],
            ['9 years', 'Medium Child', '28 kg', 'A / 15'],
            ['10 years', 'Medium Child', '33 kg', 'A / 15'],
            ['11 years', 'Medium Child', '36 kg', 'A / 15'],
            ['12 years', 'Adolescent', 'Estimate', 'A / 15'],
            ['13 years', 'Adolescent', 'Estimate', 'A / 15'],
            ['14 years', 'Adolescent', 'Estimate', 'A / 15'],
            ['15 years', 'Adolescent', 'Estimate', 'A / 15'],
            ['> 15 years', 'Adult', 'Estimate', '15'],
          ],
        },
        respiratoryAndCirculatoryValues: {
          headers: ['Age', 'RR', 'SPO2', 'HR', 'BP'],
          rows: [
            ['< 24 hours', '25 - 60', '≥ 95%', '110 - 170', '≥ 60'],
            ['< 3 months', '25 - 60', '≥ 95%', '110 - 170', '≥ 60'],
            ['3 - 12 months', '25 - 55', '≥ 95%', '105 - 165', '≥ 65'],
            ['1 year', '20 - 40', '≥ 95%', '85 - 150', '≥ 70'],
            ['2 years', '20 - 40', '≥ 95%', '85 - 150', '≥ 70'],
            ['3 years', '20 - 40', '≥ 95%', '85 - 150', '≥ 70'],
            ['4 years', '20 - 40', '≥ 95%', '85 - 150', '≥ 70'],
            ['5 years', '16 - 34', '≥ 95%', '70 - 135', '≥ 80'],
            ['6 years', '16 - 34', '≥ 95%', '70 - 135', '≥ 80'],
            ['7 years', '16 - 34', '≥ 95%', '70 - 135', '≥ 80'],
            ['8 years', '16 - 34', '≥ 95%', '70 - 135', '≥ 80'],
            ['9 years', '16 - 34', '≥ 95%', '70 - 135', '≥ 80'],
            ['10 years', '16 - 34', '≥ 95%', '70 - 135', '≥ 80'],
            ['11 years', '16 - 34', '≥ 95%', '70 - 135', '≥ 80'],
            ['12 years', '14 - 26', '≥ 95%', '60 - 120', '≥ 90'],
            ['13 years', '14 - 26', '≥ 95%', '60 - 120', '≥ 90'],
            ['14 years', '14 - 26', '≥ 95%', '60 - 120', '≥ 90'],
            ['15 years', '14 - 26', '≥ 95%', '60 - 120', '≥ 90'],
            ['> 15 years', '12 - 30', '≥ 92%', '60 - 100', '≥ 100'],
          ],
        },
      },
      immediateAction: [
        'ANY deviation from normal VSS is a concern and should NOT be discounted',
        'Patients with ANY vital signs that are persistently borderline / close to being outside of the above ranges must be put through to VVED as a minimum',
      ],
      furtherNotes: [
        'For the purposes of the clinical care protocols, a child is defined as being aged under 16 years. The rationale for this relates to the physiological parameters and medication doses of older children being equal to adults. This principle does NOT relate to emotional care, mental health, OR legal obligations of caring for a person under the age of 18.',
      ],
    },
  },
  'clinical-flags': {
    title: 'Clinical Flags',
    level: 'ALL',
    universal: true,
    category: 'primary',
    summary: 'Red and yellow flag criteria for escalation',
    content: {
      definition: {
        red: 'Patients meeting ANY red flag criteria MUST be transported to hospital by ambulance. The clinician MUST be contacted in instances where patients meeting red flag criteria refuse transport.',
        yellow: 'For patients meeting ANY of the yellow flag criteria the responder MUST immediately contact Ambulance Victoria, VVED, Clinician, Refcom or the patients GP for further advice.',
      },
      redFlagVitalSignThresholds: {
        consciousStateAndBreathing: {
          headers: ['Age', 'AVPU/GCS', 'RR', 'SPO2'],
          rows: [
            ['< 24 hours', '< A / < 15', '< 25 / ≥ 60', '< 95%'],
            ['< 3 months', '< A / < 15', '< 25 / ≥ 60', '< 95%'],
            ['3 - 12 months', '< A / < 15', '< 25 / ≥ 55', '< 95%'],
            ['1 year', '< A / < 15', '< 20 / ≥ 40', '< 95%'],
            ['2 years', '< A / < 15', '< 20 / ≥ 40', '< 95%'],
            ['3 years', '< A / < 15', '< 20 / ≥ 40', '< 95%'],
            ['4 years', '< A / < 15', '< 20 / ≥ 40', '< 95%'],
            ['5 years', '< A / < 15', '< 16 / ≥ 34', '< 95%'],
            ['6 years', '< A / < 15', '< 16 / ≥ 34', '< 95%'],
            ['7 years', '< A / < 15', '< 16 / ≥ 34', '< 95%'],
            ['8 years', '< A / < 15', '< 16 / ≥ 34', '< 95%'],
            ['9 years', '< A / < 15', '< 16 / ≥ 34', '< 95%'],
            ['10 years', '< A / < 15', '< 16 / ≥ 34', '< 95%'],
            ['11 years', '< A / < 15', '< 16 / ≥ 34', '< 95%'],
            ['12 years', '< A / < 15', '< 14 / ≥ 26', '< 95%'],
            ['13 years', '< A / < 15', '< 14 / ≥ 26', '< 95%'],
            ['14 years', '< A / < 15', '< 14 / ≥ 26', '< 95%'],
            ['15 years', '< A / < 15', '< 14 / ≥ 26', '< 95%'],
            ['> 15 years', '< 13', '< 12 / ≥ 30', '< 92%'],
          ],
        },
        circulation: {
          headers: ['Age', 'HR', 'BP'],
          rows: [
            ['< 24 hours', '< 110 / ≥ 170', '< 60'],
            ['< 3 months', '< 110 / ≥ 170', '< 60'],
            ['3 - 12 months', '< 105 / ≥ 165', '< 65'],
            ['1 year', '< 85 / ≥ 150', '< 70'],
            ['2 years', '< 85 / ≥ 150', '< 70'],
            ['3 years', '< 85 / ≥ 150', '< 70'],
            ['4 years', '< 85 / ≥ 150', '< 70'],
            ['5 years', '< 70 / ≥ 135', '< 80'],
            ['6 years', '< 70 / ≥ 135', '< 80'],
            ['7 years', '< 70 / ≥ 135', '< 80'],
            ['8 years', '< 70 / ≥ 135', '< 80'],
            ['9 years', '< 70 / ≥ 135', '< 80'],
            ['10 years', '< 70 / ≥ 135', '< 80'],
            ['11 years', '< 70 / ≥ 135', '< 80'],
            ['12 years', '< 60 / ≥ 120', '< 90'],
            ['13 years', '< 60 / ≥ 120', '< 90'],
            ['14 years', '< 60 / ≥ 120', '< 90'],
            ['15 years', '< 60 / ≥ 120', '< 90'],
            ['> 15 years', '< 50 / ≥ 120', '< 90'],
          ],
        },
      },
      immediateAction: [
        'Patients with ANY vital signs that are persistently outside of the above ranges must be Escalated to Ambulance Victoria – Consult clinician in cases where patients refuse',
      ],
      redFlags: {
        adultsAndPaediatrics: [
          'ANY vital sign outside of the Acceptable Vital Sign Values',
          'Stridor',
          'First presentation seizure',
          'Anaphylaxis — including resolved anaphylaxis, possible anaphylaxis or the post-adrenaline patient',
          'Acute coronary syndrome — even if resolved',
          'Ectopic pregnancy',
          'Primary obstetric issue',
          'Stroke / TIA',
          'Sudden onset headache',
          'Unable to walk (when usually able to walk)',
          'Post-tonsillectomy bleeding (of any amount) of up to 14 days post-operation',
          'Patients at risk (E.G. domestic violence, elder abuse, child abuse)',
        ],
        paediatricsOnly: [
          'Unexplained pain',
          'Second presentation within 48 hours for related complaint',
          'Febrile ≥ 38°C in small infants (I.E. up to 3 months old)',
          'Testicular pain',
          'Ingestion / inhalation of toxic substance',
          'Inhalation of foreign body',
          'Non blanching rash',
          'All medical complaints for children must be escalated or referred on for assessment (VVED, AV, Refcomm, GP, Primary care centre, ED).',
        ],
      },
      yellowFlags: {
        adultsAndPaediatrics: [
          'Ongoing patient or carer concern',
          'Infection not responding to community-based care (e.g. oral antibiotics)',
          'Immunocompromised with suspected infection — attend hospital with relevant history when appropriate',
          'Surgical procedure within past 14 days',
          'Significant unexplained pain (e.g. ≥ 5)',
          'Syncope (asymptomatic, normal vital signs, normal ECG)',
          'Abdominal pain',
          'Mental health',
          'Hypertension with systolic blood pressure ≥ 180',
          'Skill mix: All cases must have at least a Hatzolah First Responder (Level 3) or above present and they must not be under supervision.',
        ],
        paediatricsOnly: [
          'Ingestion of a dangerous foreign body — asymptomatic / normal VSS (including button batteries and magnets)',
        ],
      },
    },
  },
  'clinical-approach-cb': {
    title: 'Clinical Approach (L1)',
    level: 'CB',
    category: 'primary',
    summary: 'Structured clinical approach for Level 1 responders',
    content: {
      stop: [
        {
          trigger: 'D — Dangers & Safety',
          actions: [],
        },
        {
          trigger: 'Rapid assessment — Does the patient appear WELL or UNWELL?',
          actions: [],
        },
      ],
      rapidAssessment: [
        { if: 'Patient appears UNWELL', then: 'Primary Survey' },
        { if: 'Patient appears WELL', then: 'Proceed to assessment' },
      ],
      responderAction: [
        'IF patient deteriorates at ANY stage — Return to Primary Survey',
        'Rapport, reassurance, position',
      ],
      assess: {
        askAbout: [
          { letter: 'S', meaning: 'Situation or Symptoms' },
          { letter: 'A', meaning: 'Allergies' },
          { letter: 'M', meaning: 'Medications' },
          { letter: 'P', meaning: 'Past medical history' },
          { letter: 'L', meaning: 'Last well (onset time)' },
          { letter: 'E', meaning: 'Extra information' },
        ],
        assessmentTools: ['Perfusion', 'Respiratory', 'AVPU', 'Trauma 2° survey (Head to toe)'],
      },
      pauseAndPlan: ['Clinical problems — Identify verbally', 'Treatment plan — Confirm with patient + team'],
      immediateAction: ['Call 000 for ALL patients outside of Hatzolah’s clinical scope, requiring hospital care'],
      treatment: ['Manage as per appropriate CPG', 'Handover / IMISTAMBO'],
      advice: ['IF unsure, seek immediate clinical advice'],
      escalation: {
        trigger: 'All Level 1 incidents must be escalated with Ambulance or a Level 3 FR and higher for further investigation and management.',
        actions: ['IF Further clinical advice required — Call clinical operations manager'],
      },
    },
  },
  'clinical-approach-fr': {
    title: 'Clinical Approach',
    level: 'FR',
    category: 'primary',
    summary: 'Full structured clinical approach for First Responders',
    content: {
      _flowchart: 'clinicalApproach',
      definition: 'A framework that provides a structured and comprehensive assessment for every patient',
      stop: [
        {
          trigger: 'D — Dangers & Safety',
          actions: ['PPE / Standard precautions', 'Dynamic risk assessment / Awareness of personal safety'],
        },
        {
          trigger: 'Rapid assessment / PAT — Does the patient appear WELL or UNWELL?',
          actions: ['E.G. Major haemorrhage, altered conscious, obvious SOB, pale / sweaty, etc'],
        },
      ],
      rapidAssessment: {
        question: 'Rapid assessment / PAT — does the patient appear WELL or UNWELL?',
        branches: [
          { condition: 'UNWELL', goTo: 'primarySurvey', label: 'Primary Survey' },
          { condition: 'WELL', goTo: 'responderAction', label: 'Responder Action' },
        ],
      },
      primarySurvey: [
        { letter: 'R', meaning: 'Response — Yes / No?' },
        {
          letter: 'S',
          meaning: 'Send for help — SitRep: Hatzolah. Call ambulance + request backup',
        },
        { letter: 'A', meaning: 'Airway — C-spine concerns?' },
        { letter: 'B', meaning: 'Breathing — Adequate?' },
        { letter: 'C', meaning: 'Circulation — + Major bleeding?' },
        { letter: 'D', meaning: 'Disability — AVPU' },
        { letter: 'E', meaning: 'Exposure — Environment?' },
        {
          letter: 'IF',
          meaning: 'Required to direct treatment — Perform other specific assessments',
        },
      ],
      responderAction: [
        'IF patient deteriorates at ANY stage — Return to Primary Survey',
        'Rapport, reassurance + rest',
        'Position appropriately',
        'IF required — Oxygen',
        'Establish: If refusal',
        'Establish: If limitation of treatment — E.G. Not For Resuscitation - NFR',
      ],
      assess: {
        note: 'Use clinical judgement to determine which of the below are appropriate and the order of their relevance for each patient',
        askAbout: [
          { letter: 'S', meaning: 'Situation, signs + symptoms' },
          { letter: 'A', meaning: 'Allergies' },
          { letter: 'M', meaning: 'Medications' },
          { letter: 'P', meaning: 'Past medical history' },
          { letter: 'L', meaning: 'Last well (onset time)' },
          { letter: 'E', meaning: 'Extra information' },
        ],
        assessmentTools: [
          'PSA',
          'RSA',
          'GCS',
          'Medical time critical',
          'Trauma time critical',
          'Trauma 2° survey',
          'DOLOR / AEIOUTIPS',
          'Other assessments',
        ],
        assessmentEquipment: ['SpO2', 'Temperature', 'BGL', 'Other VSS'],
      },
      immediateAction: [
        'Call 000 for ALL patients outside of Hatzolah’s clinical scope, requiring hospital care OR as directed by Hatzolah CPG',
        'IF further clinical advice required — Call clinical operations manager via mobile phone',
      ],
      pauseAndPlan: [
        'Clinical problems — Identify verbally',
        'Risk factors & frailty status',
        'Treatment plan — Confirm with patient + team',
        'Support options — Consider - E.G. AV, GP, VVED',
      ],
      disposition: {
        branches: [
          { goTo: 'treatmentAndAvAttendance', label: 'Treatment & AV Attendance' },
          { goTo: 'treatAndRefer', label: 'Treat & Refer' },
        ],
      },
      treatmentAndAvAttendance: [
        'Manage as per appropriate CPG',
        'Transport — IF appropriate consider alternate Tx',
        'Reassess: 15 minutely while in Hatzolah care — UNLESS clinical rationale provided',
      ],
      treatAndRefer: [
        'Ensure low acuity',
        'AND Isolated simple problem',
        'AND Covered by a Treat & Refer care plan',
        'Ensure patient consents to plan including VED, NEPT, private Tx (with Clinician consult)',
      ],
    },
  },
  'conscious-status-cb': {
    title: 'Conscious Status Assessments (L1)',
    level: 'CB',
    category: 'neuro',
    summary: 'AVPU scale for Level 1 responders',
    content: {
      definition: 'Conscious state refers to the level of awareness someone has of their self and their surroundings. There is a spectrum of consciousness, ranging from being fully alert to completely unconscious.',
      avpu: {
        notes: [
          'AVPU is quick and simple to apply and is appropriate for determining conscious state whilst the initial assessment (E.G. Primary Survey) is conducted',
          'A child cannot have a conscious state assessment done while asleep. They must be woken first. If the child wakes and remains awake and alert, record this as an “A” for AVPU. If the child wakes but remains drowsy and appears inattentive, record this as a “V”.',
        ],
        whenAssessedIsThePatient: [
          { letter: 'A', meaning: 'Alert' },
          { letter: 'V', meaning: 'Responding to voice' },
          { letter: 'P', meaning: 'Responding to pain' },
          { letter: 'U', meaning: 'Unresponsive' },
        ],
      },
    },
  },
  'conscious-status-fr': {
    title: 'Conscious Status Assessments',
    level: 'FR',
    category: 'neuro',
    summary: 'AVPU and GCS for First Responders',
    content: {
      definition: 'Conscious state refers to the level of awareness someone has of their self and their surroundings. There is a spectrum of consciousness, ranging from being fully alert to completely unconscious. Hatzolah advises the use of two different conscious state assessments: AVPU and GCS (Glasgow Coma Scale)',
      avpu: {
        notes: [
          'AVPU is quick and simple to apply and is appropriate for determining conscious state whilst the initial assessment (E.G. Primary Survey) is conducted',
          'AVPU is also the preferred tool for assessing conscious state in children where adapting the GCS can be problematic. It is widely used and consistent with practice at the Royal Children\'s Hospital.',
          'A child cannot have a conscious state assessment done while asleep. They must be woken first. If the child wakes and remains awake and alert, record this as an "A" for AVPU. If the child wakes but remains drowsy and appears inattentive, record this as a "V".',
          'If a patient has clinical or social issues such as aphasia / dysphasia, facial injuries or language barriers then AVPU is an appropriate tool to assess consciousness',
        ],
        whenAssessedIsThePatient: [
          { letter: 'A', meaning: 'Alert' },
          { letter: 'V', meaning: 'Responding to voice' },
          { letter: 'P', meaning: 'Responding to pain' },
          { letter: 'U', meaning: 'Unresponsive' },
        ],
      },
      gcs: {
        notes: [
          'A formal GCS should be undertaken in more complex patient presentations',
          'The GCS is an objective measure of consciousness. The score should NOT be estimated.',
          'The maximum GCS score is 15 and represents a patient that is fully alert and orientated to person, place and time. The minimum GCS score is 3 and represents a patient that is completely unresponsive to stimuli.',
        ],
        eyeOpening: {
          headers: ['Score "E"', '≥ 4 Years Old', '< 5 Years Old'],
          rows: [
            ['4', 'Spontaneous + tracking', 'Spontaneous'],
            ['3', 'To voice', 'Reacts to speech'],
            ['2', 'To painful stimuli', 'Reacts to pain'],
            ['1', 'None', 'None'],
          ],
        },
        verbalResponse: {
          headers: ['Score "V"', '≥ 4 Years Old', '< 5 Years Old'],
          rows: [
            ['5', 'Orientated (person, place, time)', 'Appropriate words / smile'],
            ['4', 'Confused', 'Cries but consolable'],
            ['3', 'Inappropriate words', 'Persistently irritable'],
            ['2', 'Incomprehensible sounds', 'Moans to pain'],
            ['1', 'None', 'None'],
          ],
        },
        motorResponse: {
          headers: ['Score "M"', '≥ 4 Years Old', '< 5 Years Old'],
          rows: [
            ['6', 'Obeys commands', 'Spontaneous'],
            ['5', 'Localises to pain', 'Localises to pain'],
            ['4', 'Withdraws from pain', 'Withdraws to pain'],
            ['3', 'Flexion to pain', 'Flexion response'],
            ['2', 'Extension to pain', 'Extension response'],
            ['1', 'None', 'None'],
          ],
        },
        total: '= "E" + "V" + "M"',
      },
      furtherNotes: [
        'Painful stimuli should be performed in a professional manner as part of a clinical assessment',
        'Painful stimuli should NOT be repeatedly applied to a patient if the expected response is not elicited',
      ],
    },
  },
  'respiratory-assessment-cb': {
    title: 'Respiratory Status Assessment (L1)',
    level: 'CB',
    category: 'respiratory',
    summary: 'Basic respiratory assessment for Level 1 responders',
    content: {
      recognition: {
        headers: ['Category', 'Normal', 'Mild', 'Moderate', 'Severe'],
        rows: [
          ['Speech', 'Clear, Steady', 'Full Sentences', 'Short Sentences', 'Words OR None'],
          ['Skin', 'Normal', 'Normal', 'Pale, Sweaty', 'Pale, Sweaty +/- Cyanosis (blue)'],
          [
            'Work of Breathing',
            'Normal',
            'Slight',
            'Marked',
            'Marked increase, fast breathing, Tripod position',
          ],
          [
            'Appearance',
            'Calm, Quiet',
            'Calm OR Anxious',
            'Distressed OR Anxious',
            'Exhausted OR Fighting to breathe',
          ],
          [
            'Sounds',
            'Quiet',
            'Cough, Mild Wheeze',
            'Cough, Insp/Exp Wheeze',
            'NO Cough, Wheeze, Stridor',
          ],
        ],
      },
      signsOfRespiratoryDistressInChildren: [
        'Fast breathing',
        'Chest wall retraction (Between ribs)',
        'Use of accessory wall muscles',
        'Tracheal tugging (Neck)',
      ],
      signsOfLowOxygenInChildren: {
        headers: ['Infants (0 - 12 months)', 'Children (1 - 15 years)'],
        rows: [
          ['Lethargy', 'Restlessness'],
          ['Floppy', 'Fast breathing'],
          ['Confusion', 'Cyanosis (Blue skin)'],
        ],
      },
    },
  },
  'respiratory-assessment-fr': {
    title: 'Respiratory Status Assessment',
    level: 'FR',
    category: 'respiratory',
    summary: 'Graded respiratory status - normal to severe - with SpO2, rate and pulse thresholds',
    content: {
      recognition: {
        headers: ['Category', 'Normal', 'Mild', 'Moderate', 'Severe'],
        rows: [
          ['C — Conscious State', 'Alert', 'Alert', 'Alert OR Altered', 'Altered OR Unconscious'],
          ['R — Respiratory Rate', '12 - 16', '16 - 20', '≥ 20', '≥ 20 OR < 8'],
          ['O — Oxygen (SpO2)', '≥ 95%', '≥ 95%', '< 95%', '< 90%'],
          ['S — Speech', 'Clear, Steady', 'Full Sentences', 'Short Sentences', 'Words OR None'],
          ['S — Skin', 'Normal', 'Normal', 'Pale, Sweaty', 'Pale, Sweaty +/- Cyanosis'],
          ['W — Work of Breathing', 'Normal', 'Slight', 'Marked', 'Marked'],
          [
            'R — Respiratory Rhythm',
            'Regular',
            'Prolonged Expiratory Phase',
            'Prolonged Expiratory Phase',
            'Prolonged Expiratory Phase',
          ],
          [
            'A — Appearance',
            'Calm, Quiet',
            'Calm OR Anxious',
            'Distressed OR Anxious',
            'Exhausted OR Fighting to breathe',
          ],
          ['P — Pulse Rate', '60 - 100', '60 - 100', '100 - 120', '≥ 120 OR < 60 (late sign)'],
          [
            'S — Sounds',
            'Quiet',
            'Cough, Mild Wheeze OR Basal Crackles',
            'Cough, Insp/Exp Wheeze OR Mid-zone crackles',
            'NO Cough, Insp/Exp Wheeze, Full field crackles, Stridor OR No breath sounds',
          ],
        ],
      },
      ageScope: 'Respiratory Rates and Pulse Rates in this table specifically refer to ≥ 15 year olds only',
      signsOfRespiratoryDistressInChildren: [
        'Tachypnoea',
        'Chest wall retraction',
        'Use of accessory wall muscles',
        'Tracheal tugging',
        'Abdominal protrusion',
      ],
      signsOfHypoxiaInChildren: {
        headers: ['Infants (0 - 12 months)', 'Children (1 - 15 years)'],
        rows: [
          ['Lethargy', 'Restlessness'],
          ['Bradycardia', 'Tachycardia'],
          ['Hypotension', 'Tachypnoea'],
          ['Apnoea', 'Cyanosis'],
          ['Pallor', 'Bradycardia'],
        ],
      },
    },
  },
  'perfusion-assessment-cb': {
    title: 'Perfusion Status Assessment (L1)',
    level: 'CB',
    category: 'cardiac',
    summary: 'Basic perfusion assessment for Level 1 responders',
    content: {
      definition: [
        'Perfusion refers to the cardiovascular system\'s capacity to provide the bodies tissues with sufficient oxygen and nutrients to meet current requirements to sustain life - while also removing carbon dioxide and other waste products',
        'The Perfusion Status Assessment gives insight about a patient\'s current cardiovascular system function and perfusion status',
      ],
      recognition: 'The patient is considered to have less than adequate (< Adequate) perfusion IF 1 or more of the below criteria are outside of the Adequate criteria',
      criteria: {
        headers: ['', 'Skin', 'Conscious State'],
        rows: [
          ['Adequate', 'Warm, Pink, Dry', 'Alert & Orientated'],
          ['< Adequate', 'Cool, Pale, Clammy', 'Alert OR Altered, Dizzy, Lightheaded'],
          ['No Perfusion', 'Cool, Pale, Clammy', 'Unconscious'],
        ],
      },
      management: [
        { if: '< Adequate perfusion', then: 'Avoid: Standing / walking patient' },
        { if: '< Adequate perfusion', then: 'Position: Supine / legs raised' },
        { if: '< Adequate perfusion', then: 'SitRep: Hatzolah dispatch + call ambulance' },
      ],
    },
  },
  'perfusion-assessment-fr': {
    title: 'Perfusion Status Assessment',
    level: 'FR',
    category: 'cardiac',
    summary: 'Full perfusion assessment with BP and pulse criteria',
    content: {
      definition: [
        'Perfusion refers to the cardiovascular system\'s capacity to provide the bodies tissues with sufficient oxygen and nutrients to meet current requirements to sustain life - while also removing carbon dioxide and other waste products',
        'The Perfusion Status Assessment involves evaluating four vital signs that collectively give an insight about a patient\'s current cardiovascular system function and perfusion status',
      ],
      recognition: 'The patient is considered to have less than adequate (< Adequate) perfusion IF 2 or more of the below criteria are outside of the Adequate criteria',
      criteria: {
        headers: ['', 'Skin', 'Pulse', 'sBP', 'Conscious State'],
        rows: [
          ['Adequate', 'Warm, Pink, Dry', '60 to 100', '≥ 100 sBP', 'Alert & Orientated'],
          ['< Adequate', 'Cool, Pale, Clammy', '< 50 OR ≥ 100', '< 100 sBP', 'Alert OR Altered'],
          ['No Perfusion', 'Cool, Pale, Clammy', 'No pulse', 'Unable to record', 'Unconscious'],
        ],
      },
      ageScope: 'Pulse and sBP in this table specifically refer to ≥ 15 year olds only',
      management: [
        { if: '< Adequate perfusion', then: 'Avoid: Standing / walking patient' },
        { if: '< Adequate perfusion', then: 'Position: Supine / legs raised' },
        { if: '< Adequate perfusion', then: 'SitRep: Hatzolah dispatch + call ambulance' },
      ],
      furtherNotes: [
        'Always assume abnormal vital signs are due to illness in any patient that appears unwell',
        'An isolated pulse between 50 and 60 BPM may be normal for some adult patients — particularly if they are very fit (E.G. marathon runner)',
        'An isolated systolic BP below 100 mmHg may be normal for some adult patients — particularly if they are very small or have paraplegia / quadriplegia',
      ],
    },
  },
  'pain-assessment': {
    title: 'Pain Assessments',
    level: 'FR',
    category: 'primary',
    summary: 'Wong-Baker FACES scale for patients who cannot use the 0-10 point pain rating system',
    content: {
      overview: [
        'Certain patient groups (E.G. small children) may be unable to understand the 0-10 point pain rating system. In such circumstances consider using the Wong-Baker FACES Pain Rating Scale.',
        'The Wong-Baker FACES Pain Rating Scale was originally created with children for children to help them communicate their pain to healthcare workers. It is intended for use in patients who are 3 years or older that are able to understand the tool and choose a face that best illustrates the physical pain that they are experiencing.',
      ],
      wongBakerFacesPainRatingScale: [
        { score: '0', face: '😀', label: 'No Hurt' },
        { score: '2', face: '🙂', label: 'Hurts Little Bit' },
        { score: '4', face: '😐', label: 'Hurts Little More' },
        { score: '6', face: '😟', label: 'Hurts Even More' },
        { score: '8', face: '😣', label: 'Hurts Whole Lot' },
        { score: '10', face: '😭', label: 'Hurts Worst' },
      ],
      notes: [
        'The Wong-Baker FACES Pain Rating Scale is NOT intended to be used by a third person to assess a patient\'s pain on their behalf.',
      ],
    },
  },
  'weight-calculations': {
    title: 'Weight Calculations',
    level: 'FR',
    category: 'paediatric',
    summary: 'Paediatric weight estimation formulas',
    content: {
      definition: [
        'For children various treatments are based on body weight, such as drug doses, defibrillation joules and fluid volume. It is acceptable to ask a parent the patient\'s weight.',
        'However IF weight is unknown it can be estimated using the following calculations:',
      ],
      paediatricWeightCalculations: {
        headers: ['Age', 'Estimated Weight'],
        rows: [
          ['< 24 hours', '3.5 kg'],
          ['3 months', '6 kg'],
          ['6 months', '8 kg'],
          ['1 - 9 years', 'Age x 2 + 8 kg'],
          ['10 - 11 years', 'Age x 3.3 kg'],
          ['≥ 11 years', 'Estimate based on Pt size'],
        ],
      },
    },
  },
  'ventilation-rates': {
    title: 'Ventilation Rates',
    level: 'FR',
    category: 'respiratory',
    summary: 'Ventilation rates by age — ineffective breathing, and asthma unresponsive with a pulse',
    content: {
      ineffectiveBreathing: {
        headers: ['Age', 'Ventilate once every', 'OR'],
        rows: [
          ['≥ 15 years', '5 seconds', '12x per minute'],
          ['12 - 15 years', '3 - 4 seconds', '14 - 26x per minute'],
          ['5 - 11 years', '2 - 3 seconds', '16 - 34x per minute'],
          ['1 - 4 years', '2 - 3 seconds', '20 - 40x per minute'],
          ['< 1 year', '2 seconds', '25 - 55x per minute'],
        ],
      },
      asthmaUnresponsiveWithPulse: {
        headers: ['Age', 'Ventilate once every', 'OR'],
        rows: [
          ['≥ 11 years', '8 - 12 seconds', '5 - 8x per minute'],
          ['5 - 11 years', '5 - 6 seconds', '10 - 14x per minute'],
          ['2 - 4 years', '4 - 5 seconds', '12 - 15x per minute'],
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
      definition: [
        'The PAT (Paediatric Assessment Triangle) consists of three headings / components…',
        'Appearance',
        'Work of breathing',
        'Circulation',
        '…which collectively form a rapid first impression as to whether a child is well or unwell',
      ],
      assessmentTriangle: [
        {
          side: 'Appearance',
          signs: ['Tone', 'Interactivity', 'Consolability', 'Look (Gaze)', 'Speech (Cry)'],
        },
        {
          side: 'Work of Breathing',
          signs: ['Grunting', 'Nasal flaring', 'Stridor', 'Accessory muscle use'],
        },
        {
          side: 'Circulation',
          signs: ['Pallor', 'Mottling', 'Cyanosis', 'Bleeding'],
        },
      ],
      furtherNotes: [
        'Visually evaluate level of alertness, muscle tone, body position, chest movement, work of breathing and skin colour while also looking for obvious injuries',
        'This assessment should not take more than a few seconds',
        'If the child appears well with no signs of serious trauma, approach with a calm demeanour whilst explaining your actions to the parents and the child',
        'If a well-appearing patient has experienced a high-risk mechanism of injury, consider the patient potentially unstable due to the risk of serious internal injuries',
      ],
      immediateAction: 'For children with a poor appearance OR evidence of significant injury, proceed immediately to the primary survey including any lifesaving interventions as appropriate.',
    },
  },
  'time-critical': {
    title: 'Time Critical Guidelines',
    level: 'ALL',
    category: 'primary',
    summary: 'Actual, emergent and potentially time critical criteria, and the transport actions each requires',
    universal: true,
    content: {
      immediateAction: [
        'Any patient meeting ANY Time Critical Criteria MUST be advised hospital transport',
        'Hatzolah crew MUST consult either the Ambulance Victoria Clinician OR Hatzolah Clinical Operations Manager for patients meeting ANY Time Critical Criteria that are refusing hospital transport',
        'ANY patient NOT being referred to Ambulance Victoria OR transported by Hatzolah should be advised to allow crew to remain on scene and facilitate a review with VVED',
      ],
      principles: [
        'A patient meeting any of the following criteria has, or potentially has a clinical problem of major significance and therefore is Time Critical.',
        'Provide an immediate situation report to dispatch for any patient meeting ANY of the time critical criteria.',
        'With time critical trauma patients, triage and aim for transport to the highest level of trauma care available within 60 minutes. This may include contacting the AV Clinician.',
        'Medical time critical patients require triage to the nearest appropriate facility.',
        'Scene information may be used in planning for secondary transfer to an appropriate facility as required.',
        'Patients < 16 or ≥ 55 years, or those who have a pre-existing medical condition or who are pregnant may be at greater risk. Using “pay-off”, manage as potentially time critical even if they don’t fully meet the time critical criteria.',
        'Any Responder who has a “gut feel” that the patient may be Time Critical even though does Not meet stated parameters should request appropriate and timely support.',
      ],
      definition: {
        actual: 'At the time the VSS were taken the patient was in actual physiological distress. I.E. Altered conscious state, inadequate perfusion or respiratory distress',
        emergent: 'At the time the VSS were taken the patient was not physiologically distressed, but does have a “pattern of actual injury/illness” which is known to have a high probability of deteriorating to Actual physiological distress.',
        potential: 'At the time the VSS were taken the patient was not physiologically distressed, and there was No significant “pattern of actual injury/illness”, but there is a “mechanism of injury/illness” known to have the potential to deteriorate to actual physiological distress.',
      },
      actualTimeCriticalVss: {
        headers: ['Age', 'SpO2', 'Respiratory Rate', 'Heart Rate', 'BP', 'GCS'],
        rows: [
          ['Adult', '< 90%', '< 10 / ≥ 30', '< 60 / ≥ 120', '< 90', '< 13'],
          ['12 - 15 years', '< 96%', '< 14 / ≥ 26', '< 60 / ≥ 120', '< 90', '< 15'],
          ['5 - 11 years', '< 96%', '< 16 / ≥ 34', '< 70 / ≥ 135', '< 80', '< 15'],
          ['1 - 4 years', '< 96%', '< 20 / ≥ 40', '< 85 / ≥ 150', '< 70', '< 15'],
          ['3 - 12 months', '< 96%', '< 25 / ≥ 55', '< 105 / ≥ 165', '< 65', '< 15'],
          ['< 3 months', '< 96%', '< 25 / ≥ 60', '< 110 / ≥ 170', '< 60', '< 15'],
          ['< 24 hours', '< 96%', '< 25 / ≥ 60', '< 110 / ≥ 170', '< 60', '< 15'],
        ],
      },
      actualTimeCriticalAction: [
        { if: 'ANY of the above criteria', then: 'SitRep: Hatzolah dispatch + call ambulance' },
        { if: 'ANY of the above criteria', then: 'Expedite transport' },
        { if: 'Trauma', then: 'Highest trauma service within 60 mins' },
        { if: 'Medical', then: 'Closest appropriate hospital' },
        { if: 'Possible', then: 'Rendezvous with paramedics' },
      ],
      emergentTimeCriticalPatternOfInjury: {
        penetratingTrauma: ['Any penetrating injury (except isolated superficial limb injury)'],
        bluntTrauma: [
          'Serious injury to a single body region such that specialised care or intervention may be Required or such that life, limb or long-term quality of life may be at risk',
          'Significant injuries involving more than one body region',
        ],
        specificInjuries: [
          'Limb amputation OR limb threatening injury',
          'Suspected spinal cord injury OR spinal fracture',
          'Burns: ≥ 10% TBSA (paediatrics), ≥ 20% TBSA (adults), OR suspected respiratory tract burns, OR high voltage (≥ 1000 volts) burn injury',
          'Serious crush injury',
          'Major compound fracture OR open dislocation',
          'Fracture to two or more of femur / tibia / humerus',
          'Fractured pelvis',
        ],
      },
      emergentPatternOfInjuryAction: [
        { if: 'ANY of the above criteria', then: 'SitRep: Hatzolah dispatch + call ambulance' },
        { if: 'ANY of the above criteria', then: 'Expedite transport' },
        { if: 'ANY of the above criteria', then: 'Highest trauma service within 60 mins' },
        { if: 'Possible', then: 'Rendezvous with paramedics' },
      ],
      emergentTimeCriticalPatternOfIllness: {
        medicalSymptomsConditions: [
          'Chest pain of cardiac nature',
          'Respiratory distress',
          'Altered consciousness',
          'Anaphylaxis',
          'Stroke',
          'Suspected meningococcal disease',
          'Suspected aortic aneurysm',
          'Undiagnosed severe pain',
          'Acute decompression illness',
          'Hypothermia',
          'Heat stress',
          'Poisoning',
          'Obstetric emergency',
        ],
      },
      emergentPatternOfIllnessAction: [
        { if: 'ANY of the above criteria', then: 'SitRep: Hatzolah dispatch + call ambulance' },
        { if: 'ANY of the above criteria', then: 'Expedite transport' },
        { if: 'ANY of the above criteria', then: 'Closest appropriate hospital' },
        { if: 'Possible', then: 'Rendezvous with paramedics' },
      ],
      potentiallyTimeCritical: {
        atLeast_1_MechanismOfInjury: [
          'Motor cyclist / cyclist impact ≥ 30 km/hr',
          'High speed MCA ≥ 60 km/hr',
          'Pedestrian impact',
          'Ejection from vehicle',
          'Prolonged extrication',
          'Fall from height ≥ 3 m',
          'Struck on head by object falling ≥ 3 m',
          'Explosion',
        ],
        andAtLeast_1_Vulnerability: [
          'Age ≥ 55 years old',
          'Age < 16 years old',
          'Pregnant',
          'Poorly controlled high blood pressure',
          'Obesity',
          'Congestive heart failure',
          'Symptomatic lung disease',
          'Ischemic heart disease',
          'Chronic kidney disease',
          'Chronic liver disease',
          'Other significant underlying medical condition',
        ],
      },
      potentiallyTimeCriticalAction: [
        {
          if: 'At least 1 mechanism of injury AND At least 1 vulnerability',
          then: 'SitRep: Hatzolah dispatch + call ambulance',
        },
        {
          if: 'At least 1 mechanism of injury AND At least 1 vulnerability',
          then: 'Expedite transport',
        },
        {
          if: 'At least 1 mechanism of injury AND At least 1 vulnerability',
          then: 'Nearest trauma service',
        },
        { if: 'Possible', then: 'Rendezvous with paramedics' },
      ],
    },
  },
  'safety-netting': {
    title: 'Safety Netting',
    level: 'ALL',
    category: 'primary',
    summary: 'Advice, contingency plan and services to leave with a patient who is not transported',
    universal: true,
    content: {
      definition: [
        'In the prehospital context safety netting refers to providing patients and caregivers with advice and instructions for self-care as well providing an adequate contingency plan in case of unexpected deterioration.',
        'This is particularly important when leaving patients at home OR referring them to further care via non Hatzolah / Ambulance Victoria transport.',
        'Safety netting is also important for patients that refuse management and / or hospital transport despite Hatzolah advice.',
      ],
      management: [
        'Ensure minimum of 2x VSS covering a span of at least 15 minutes',
        'Discuss results of assessment with patient and the implication of those results',
        'IF ANY abnormal findings found → Discuss them with patient',
        'Advise limitations of prehospital assessment and the risks associated with such limitations',
        'Discuss the likely course of the illness',
        'IF Advised transport & Patient refusing → Consult clinician/COM',
        'Explain care pathway options including risks and benefits',
        'Provide a recommended course of action if appropriate',
        'Ensure patient agrees and consents with this plan — their consent MUST be voluntary, informed AND relevant',
        'Share this plan between Hatzolah staff, patient and family / carers (if relevant)',
        'Ensure the plan is implementable (E.G. patient has adequate healthcare literacy)',
        'Confirm patient / carers understand care plan',
        'Explain safety netting / contingency plan in case of deterioration',
        'Confirm patient / carers understand safety netting / contingency plan in case of deterioration',
        'Ask about and address if patient / carer have any further questions or concerns',
        'Have patient sign PCR',
        'Document advice given',
      ],
      stop: {
        trigger: 'IF Concerns, further advice required, patient refusing against advice or an Ambulance / VVED pathway is not being used',
        actions: ['Contact the Clinical Operations Manager via mobile phone'],
      },
      immediateAction: [
        'ALL Paediatric medical complaints must be escalated beyond a Hatzolah First Responder for further assessment and management. This may include a VVED consult, Liaise with on call Clinician, AV Referral service, GP, ED, Primary Care Centre.',
        'ANY patients NOT being attended by Ambulance Victoria should consider a VVED consult and Educate the patient on it\'s use.',
      ],
      furtherNotes: [
        'Ideally initial VSS should be thorough and include GCS, RR, SpO2, BP, HR, Temperature, BGL and pupils. Subsequent VSS should include GCS, RR, SpO2, BP and HR. However Temperature, BGL and pupils should be rechecked if Hatzolah crew deems it relevant.',
        'Consider leaving a copy of the following document with the patient alongside verbal advice on how and when to access the 3 services',
      ],
      whenToAccessServices: {
        question: 'Level of concern → service to access',
        options: [
          {
            label: 'Medical Emergency — Ambulance Victoria',
            criteria: [
              'Unconsciousness',
              'Difficulty breathing',
              'Chest pain or chest tightness',
              'Sudden numbness or paralysis of the face, arm or leg',
              'Extreme pain',
              'Severe bleeding',
              'Serious accidents or trauma',
              'Large burns',
            ],
            action: 'Call 000',
          },
          {
            label: 'Medical Urgency — Victorian Virtual Emergency Department',
            criteria: [
              'Mild breathing problems',
              'Pain (e.g. abdominal, limb, back or headache)',
              'Nausea, vomiting, diarrhoea or constipation',
              'Heart palpitations or high blood pressure',
              'Mild head injury',
              'Dizziness',
              'Non-critical injury (e.g. non-complex fracture)',
              'Fever or urinary tract infections',
              'Mild rash, insect stings or spider bites',
              'Epistaxis (nose bleeds)',
              'Falls or mobility concerns',
              'Menstrual issues or early mastitis',
            ],
            action: 'www.VVED.org.au — you will need a device with a camera to access VVED. VVED is free, has translator services and is available 24/7. Wait times are typically less than 30 minutes, however this may fluctuate.',
          },
          {
            label: 'Medical Uncertainty — Nurse-On-Call',
            criteria: [
              'You\'re not sure if you should seek medical help',
              'You or someone you\'re caring for is feeling unwell',
              'You want general advice on how to care for yourself at home',
              'You\'re far from home or a long way from medical help',
              'You want advice or information about health services in your area',
            ],
            action: 'Call 1300 60 60 24 — Nurse-On-Call is free and is available 24/7. If you need translator services call 131 450 and ask to be transferred to Nurse-On-Call.',
          },
        ],
      },
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
  // Birth & Newborn Resuscitation (CPG p60-65) has no other home.
  obstetric:   { bg: '#ffe4e6', icon: '#be123c', label: 'Obstetric' },
  endocrine:   { bg: '#fef9c3', icon: '#ca8a04', label: 'Endocrine' },
  analgesia:   { bg: '#f0fdf4', icon: '#059669', label: 'Analgesia' },
  fluids:      { bg: '#e0f2fe', icon: '#0284c7', label: 'Fluids' },
  gastro:      { bg: '#fdf4ff', icon: '#a21caf', label: 'Gastro' },
  allergy:     { bg: '#fff7ed', icon: '#c2410c', label: 'Allergy' },
  emergency:   { bg: '#fee2e2', icon: '#b91c1c', label: 'Emergency' },
};
