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
    summary: 'Pain history mnemonics, and the Wong-Baker FACES scale for patients who cannot use the 0–10 score',
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
      painHistoryMnemonics: {
        note: 'Not from the Hatzolah CPG. Included as a field aide-memoire for taking a pain history.',
        dolors: [
          'D — Description of the pain',
          'O — Onset time of the pain',
          'L — Location of the pain',
          'O — Other symptoms associated with the pain',
          'R — Relief from the pain (E.G. positional relief, home medications)',
          'S — Severity / pain score (0–10)',
        ],
        opqrst: [
          'O — Onset: what the patient was doing when it began, and whether it started suddenly or gradually',
          'P — Provocation / Palliation: what makes it worse, and what makes it better',
          'Q — Quality: how the patient describes it (E.G. sharp, dull, crushing, burning)',
          'R — Region / Radiation: where the pain is, and whether it travels anywhere',
          'S — Severity: pain score out of 10, now and at its worst',
          'T — Time: how long it has lasted, and whether it is constant or comes and goes',
        ],
      },
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
          ['> 11 years', 'Estimate based on Pt size'],
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
          ['> 15 years', '5 seconds', '12x per minute'],
          ['12 - 15 years', '3 - 4 seconds', '14 - 26x per minute'],
          ['5 - 11 years', '2 - 3 seconds', '16 - 34x per minute'],
          ['1 - 4 years', '2 - 3 seconds', '20 - 40x per minute'],
          ['< 1 year', '2 seconds', '25 - 55x per minute'],
        ],
      },
      asthmaUnresponsiveWithPulse: {
        headers: ['Age', 'Ventilate once every', 'OR'],
        rows: [
          ['> 11 years', '8 - 12 seconds', '5 - 8x per minute'],
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
      definition: 'This guideline refers to any instance of NEW onset decreased responsiveness',
      recognition: 'Utilise the conscious state assessment – AVPU.',
      stop: {
        trigger: '',
        actions: [
          'Consider risk of needlestick injuries from used sharps whenever drug overdose is suspected',
          'Consider risk of potential patient volatility when drug overdose is suspected',
          'Consider that low oxygen may present with agitation until oxygen levels are corrected',
        ],
      },
      immediateAction: [
        'Primary survey',
        {
          if: 'Patient becomes unresponsive & Ineffective breathing',
          then: 'Manage as Cardiac Arrest',
        },
        { if: 'Breathing effectively', then: 'Recovery position' },
        {
          if: 'Breathing effectively & Neck injury possible',
          then: 'Recovery position (Support head in neutral position)',
        },
        'SitRep: Hatzolah dispatch + call ambulance',
        'Assess patient, monitor breathing closely, AVPU',
      ],
      headInjuryAdditionalManagement: [
        'Maintain neutral spine alignment',
        { if: 'Life threatening bleeding', then: 'Control bleeding + dress wound' },
      ],
      seizureAdditionalManagement: [
        'Protect patient from injury — Do NOT forcibly restrict the patient from convulsing',
        { if: 'Necessary', then: 'Pillow / pad head' },
      ],
    },
  },
  'altered-consciousness-fr': {
    title: 'Acute Altered Consciousness',
    level: 'FR',
    category: 'neuro',
    summary: 'Full management of altered consciousness',
    content: {
      definition: 'This guideline refers to any instance of NEW onset decreased responsiveness',
      recognition: {
        differentials: 'Cause(s) of acute altered conscious state may not always be obvious – in such cases use the following AEIOUTIPS mnemonic to consider some possible differentials',
        aeioutips: {
          headers: ['', 'Possible cause', 'Example'],
          rows: [
            ['A', 'Alcohol intoxication', ''],
            ['A', 'Arrhythmia', ''],
            ['E', 'Epilepsy', 'E.G. Seizure activity OR postictal phase'],
            ['E', 'Encephalitis (Hepatic)', 'Think jaundice + liver failure / alcohol abuse'],
            ['I', 'Insulin', 'I.E. Hypoglycaemia OR hyperglycaemia'],
            ['O', 'Overdose', 'E.G. GHB, opiates, etc.'],
            ['O', 'Oxygen', 'I.E. Hypoxia'],
            ['U', 'Underdose', 'E.G. Missed medications OR withdrawal'],
            ['T', 'Temperature', 'I.E. Hypothermia OR hyperthermia'],
            ['T', 'Thirst', 'I.E. Extreme dehydration'],
            ['T', 'Trauma', 'E.G. Head injury, exsanguination, etc.'],
            ['I', 'Infection', 'E.G. Sepsis, meningitis, UTI etc.'],
            ['P', 'Pain', 'I.E. Severe pain'],
            ['P', 'Perfusion', 'I.E. Marked hypotension and/or bradycardia'],
            ['P', 'Poisoning', 'E.G. Carbon monoxide'],
            ['P', 'Psychiatric condition', 'E.G. Panic attack, psychosis, etc.'],
            ['S', 'Stroke / TIA', ''],
            ['S', 'Syncope', 'I.E. Fainting'],
          ],
        },
      },
      stop: {
        trigger: '',
        actions: [
          'Consider risk of needlestick injuries from used sharps whenever drug overdose is suspected',
          'Consider risk of potential patient volatility when drug overdose is suspected',
          'Consider that hypoxic patients may present with agitation until oxygen levels are corrected',
        ],
      },
      immediateAction: {
        primarySurvey: 'Primary survey',
        unresponsiveNoPulse: [
          { if: 'Patient becomes unresponsive & No pulse', then: 'Manage as Cardiac Arrest!' },
        ],
        inadequateVentilations: {
          condition: 'IF Inadequate ventilations & Has pulse',
          position: 'Position: Supine',
          airway: [
            { if: 'Necessary', then: 'Suction airway' },
            { if: 'Patient is biting', then: 'DON’T insert anything past teeth' },
          ],
          oxygen: [
            { if: 'Breathing ineffectively', then: 'Oxygen, BVM (8-15L O2)' },
          ],
          ventilationRates: {
            headers: ['Age', 'Ventilate every', 'OR'],
            rows: [
              ['> 15 years', '5 seconds', '12x per minute'],
              ['12 - 15 years', '3 - 4 seconds', '14 - 26x per minute'],
              ['5 - 11 years', '2 - 3 seconds', '16 - 34x per minute'],
              ['1 - 4 years', '2 - 3 seconds', '20 - 40x per minute'],
              ['< 1 year', '2 seconds', '25 - 55x per minute'],
            ],
          },
        },
        adequateVentilations: {
          condition: 'IF Adequate ventilations',
          position: [
            { if: 'NO c-spine concerns', then: 'Position: Lateral' },
            { if: 'YES C-spine concerns', then: 'Position: Supine' },
          ],
          airway: [
            { if: 'Necessary', then: 'Suction: Airway' },
            { if: 'Patient is biting', then: 'DON’T insert anything past teeth' },
          ],
          oxygen: 'Oxygen, NRB (10-15L O2)',
        },
        allPatients: [
          'SitRep: Hatzolah dispatch + call ambulance',
          'Thorough VSS — Including SpO2, BGL, temperature, pupils, etc.',
          'Consider possible causes (AEIOUTIPS) + manage appropriately where possible',
        ],
      },
      headInjuryAdditionalManagement: [
        'Maintain neutral spine alignment',
        'IF Life threatening bleeding — Control bleeding + dress wound',
        'IF Necessary — Suction airway',
        'Avoid: Stimulating gag reflex',
        'ONLY IF Necessary for ventilation — Airway adjunct',
      ],
      overdoseDrugsMedicationsAdditionalManagement: {
        evidenceSuggestiveOfIllicitDrugUseMayInclude: [
          'Paraphernalia — E.G. Used needles, empty packets, etc.',
          'Track marks',
          'Pinpoint pupils OR dilated pupils',
          'Hypothermia OR hyperthermia',
        ],
        whereSafeAndPossibleToDoSoGainTheFollowingInformation: {
          headers: ['TRADIES', 'Information to gain'],
          rows: [
            ['Time', 'Time of consumption'],
            ['Route', 'Method of consumption (E.G. oral, injected)'],
            ['Agent', 'Drug(s) and / or medication(s) consumed'],
            ['Dose', 'Quantity consumed'],
            ['Intent', 'Intended self-harm OR accidental overdose'],
            ['Emesis', 'Have they vomited since consumption'],
            ['Symptoms', 'Any other symptoms since consumption'],
          ],
        },
      },
      seizureAdditionalManagement: [
        'Protect patient from injury',
        'IF Necessary — Pillow / pad head',
        'Do NOT forcibly restrict the patient’s body from convulsing',
        'IF Available (E.G. prescribed medications) — Assist carer(s) to administer seizure plan',
        'Carefully monitor respiratory status',
      ],
      furtherNotes: [
        'A thorough and systematic primary survey should be performed on any altered conscious patient. This includes any patient who deteriorates and becomes altered conscious while in Hatzolah care.',
        'Most seizures will self-terminate',
        'Consider that multiple agents (including alcohol) may be simultaneously involved in overdose',
        'For the ingestion of any foreign agent, consider consulting poisons on 13 11 26',
      ],
    },
  },
  'airway-obstruction-cb': {
    title: 'Airway Obstruction (L1)',
    level: 'CB',
    category: 'respiratory',
    summary: 'Basic airway obstruction management for Level 1',
    content: {
      stop: [
        {
          trigger: 'Newborn',
          actions: ['This guideline is NOT to be used on newborns'],
        },
        {
          trigger: 'IF Unconscious & Ineffective breathing',
          actions: ['Manage as Cardiac Arrest!'],
        },
        {
          trigger: 'IF Conscious & Ineffective cough',
          actions: ['Manage as per Box A'],
        },
        {
          trigger: 'IF Conscious & Effective cough',
          actions: ['Manage as per Box B'],
        },
      ],
      boxA: {
        criteria: 'IF Conscious & Ineffective Cough',
        management: [
          'Back blows, up to 5',
          { if: 'Still obstructed', then: 'Chest thrusts, up to 5' },
          'Monitor for clearance / deterioration',
          { if: 'Still obstructed', then: 'Repeat back blows + chest thrusts, as above' },
          { if: 'Paediatric & Safe to do so', then: 'Use gravity to assist with manoeuvres' },
        ],
      },
      boxB: {
        criteria: 'IF Conscious & Effective Cough',
        management: ['Encourage coughing', 'Monitor for clearance / deterioration'],
      },
      escalationOfCare: {
        trigger: 'Immediate escalation of care',
        actions: ['SitRep: Hatzolah + call ambulance'],
      },
      furtherNotes: [
        'Do NOT place fingers in patient\'s mouth as this may trigger a bite reflex',
        'If the patient recovers from basic first aid and ambulance is not attending, a minimum of a VVED must occur',
      ],
    },
  },
  'airway-obstruction-fr': {
    title: 'Airway Obstruction',
    level: 'FR',
    category: 'respiratory',
    summary: 'Full airway obstruction management',
    content: {
      stop: [
        {
          trigger: 'Newborn',
          actions: ['This guideline is NOT to be used on newborns'],
        },
        {
          trigger: 'IF Unconscious & NO pulse',
          actions: ['Manage as Cardiac Arrest!'],
        },
        {
          trigger: 'IF Unconscious & YES pulse',
          actions: ['Manage as per Box A'],
        },
        {
          trigger: 'IF Conscious & Ineffective cough',
          actions: ['Manage as per Box B'],
        },
        {
          trigger: 'IF Conscious & Effective cough',
          actions: ['Manage as per Box C'],
        },
      ],
      boxA: {
        criteria: 'IF Unconscious & YES Pulse',
        management: [
          'Position: Supine',
          'IF Accredited: Perform Laryngoscopy and use Magill forceps to remove foreign body',
          'IF Not accredited OR obstruction remains: External chest compressions, x5',
          'Assess: For clearance of obstruction',
          'Reassess: For palpable pulse',
          'IF Nil improvement & Pulse present: Oxygen, BVM (8-15L O2), x2 Ventilations',
          'AS Required, IF Pulse present: Repeat: 5x compressions + x2 ventilations',
          'IF Necessary: Suction airway',
        ],
      },
      boxB: {
        criteria: 'IF Conscious & Ineffective Cough',
        management: [
          'IF Paediatric & Safe to do so: Use gravity to assist with manoeuvres',
          'Back blows, up to 5',
          'IF Still obstructed: Chest thrusts, up to 5',
          'Monitor for clearance / deterioration',
          'IF Still obstructed: Repeat back blows + chest thrusts, as above',
        ],
      },
      boxC: {
        criteria: 'IF Conscious & Effective Cough',
        management: ['Encourage coughing', 'Monitor for clearance / deterioration'],
      },
      escalationOfCare: {
        trigger: 'No immediate improvement',
        actions: ['SitRep: Hatzolah dispatch + call ambulance'],
      },
      furtherNotes: [
        'Do NOT place fingers in patient\'s mouth as this may trigger a bite reflex',
        'If pulse is NOT found or is lost at any stage manage as per Cardiac Arrest',
        'If the patient recovers from basic first aid and ambulance is not attending, a minimum of a VVED must occur',
      ],
    },
  },
  'anaphylaxis-cb': {
    title: 'Anaphylaxis (L1)',
    level: 'CB',
    category: 'medical',
    summary: 'Anaphylaxis recognition and management for Level 1',
    content: {
      definition: 'A severe, potentially life-threatening, systemic hypersensitivity reaction. Typically caused by an excessive immune system response to an allergen that is normally harmless to humans.',
      recognition: [
        'IF Sudden onset of symptoms (usually within 30 minutes but may be up to 4 hours) & Symptoms from 2 or more of the following R.A.S.H categories — REGARDLESS whether or not there has been exposure to a known allergen',
        'OR Signs of isolated hypotension & Exposure to a KNOWN allergen',
        'OR Isolated breathing difficulty & Exposure to a KNOWN allergen',
      ],
      rashCategories: [
        { letter: 'R', meaning: 'Respiratory — Breathing difficulty, Wheeze, Cough, Stridor' },
        { letter: 'A', meaning: 'Abdominal — Nausea, Vomiting, Abdo. cramps, Diarrhoea' },
        { letter: 'S', meaning: 'Skin / Mucosal — Hives, Welts, Flushing, Facial swelling' },
        {
          letter: 'H',
          meaning: 'Hypotension — Altered conscious state, Floppy (Child), Dizzy or Lightheaded',
        },
      ],
      exampleAntigens: [
        'Insect stings: Bees, wasps, jumping jacks ants',
        'Foods: Peanuts / tree nuts, fish / shellfish, dairy products, soy, sesame seeds, wheat',
        'Medications: Antibiotics, anaesthetic drugs, contrast media',
        'Exercise-induced (typically affecting young adults - rare)',
        'Idiopathic (I.E. no known trigger - rare)',
      ],
      stop: {
        trigger: 'IF Patient becomes unconscious & Breathing ineffectively',
        actions: ['Manage as per cardiac arrest', 'SitRep: Hatzolah + call ambulance'],
      },
      management: [
        { if: 'All patients', then: 'Avoid: Standing / walking patient' },
        { if: 'Altered conscious OR Signs of hypotension', then: 'Position: Flat' },
        { if: 'Breathing difficulties', then: 'Position: Sitting / tripoding' },
        { if: 'Safe / possible to do so', then: 'Remove allergen (E.G. bee stinger)' },
        { if: 'All patients', then: 'Adrenaline, IM (Epi-Pen) — see Dosing' },
        {
          if: 'Worsens OR no change @ 5 mins',
          then: 'Repeat original dose once only. Consult for further doses.',
        },
        { if: 'Wheezing', then: 'Manage as per ASTHMA HISTORY/WHEEZE (L1)' },
        {
          if: 'REGARDLESS of severity / improvement',
          then: 'Escalation to ambulance for transport',
        },
      ],
      dosing: [
        {
          drug: 'Adrenaline',
          indication: 'Anaphylaxis',
          demographic: '≥ 6 years old & ≥ 20 kgs',
          route: 'Intramuscular (IM) — Epi-Pen — yellow device',
          initial: '0.3 mg (Epi-Pen)',
          repeat: 'Can repeat initial dose ONCE only at 5/60',
          max: 'Consult',
        },
        {
          drug: 'Adrenaline',
          indication: 'Anaphylaxis',
          demographic: '< 6 years old OR < 20 kgs',
          route: 'Intramuscular (IM) — Epi-Pen — green device',
          initial: '0.15 mg (Epi-Pen Jr)',
          repeat: 'Can repeat initial dose ONCE only at 5/60',
          max: 'Consult',
        },
      ],
      furtherNotes: [
        'Anaphylaxis can be difficult to identify, while rash / itch is common they are NOT mandatory',
        'For the purposes of this guideline a \'known allergen\' refers to any substance that has previously caused an anaphylactic reaction in this patient',
        'Adrenaline saves lives in anaphylaxis. NEVER delay adrenaline in favour of other medications',
        'Advise patient of possible adrenaline side effects including heart racing / palpitations / anxiety',
        'Hospital based observations are required for a minimum of 4 hours',
        'Hypotension is an abnormally low blood pressure. Symptoms may include feeling dizzy, lightheaded or being in an altered conscious state.',
      ],
    },
  },
  'anaphylaxis-fr': {
    title: 'Anaphylaxis',
    level: 'FR',
    category: 'medical',
    summary: 'Full anaphylaxis management protocol',
    content: {
      definition: 'A severe, potentially life-threatening, systemic hypersensitivity reaction. Typically caused by an excessive immune system response to an antigen that is normally harmless.',
      recognition: [
        'IF Sudden onset of symptoms (usually within 30 minutes but may be up to 4 hours) & Symptoms from 2 or more of the following R.A.S.H categories — REGARDLESS whether or not there has been exposure to a known antigen',
        'OR Isolated hypotension (sBP < 90) & Exposure to a KNOWN antigen',
        'OR Isolated respiratory distress & Exposure to a KNOWN antigen',
      ],
      rashCategories: [
        { letter: 'R', meaning: 'Respiratory — SOB, Wheeze, Cough, Stridor' },
        { letter: 'A', meaning: 'Abdominal — Nausea, Vomiting, Abdo. cramps, Diarrhoea' },
        { letter: 'S', meaning: 'Skin / Mucosal — Hives, Welts, Flushing, Angioedema' },
        { letter: 'H', meaning: 'Hypotension — sBP < 90' },
      ],
      exampleAntigens: [
        'Insect stings: Bees, wasps, jumping jacks ants',
        'Foods: Peanuts / tree nuts, fish / shellfish, dairy products, soy, sesame seeds, wheat',
        'Medications: Antibiotics, anaesthetic drugs, contrast media',
        'Exercise-induced (typically affecting young adults - rare)',
        'Idiopathic (I.E. no known trigger - rare)',
      ],
      stop: {
        trigger: 'IF Patient becomes unresponsive & Ventilating inadequately',
        actions: [
          'Position: Supine',
          'Ventilate — Oxygen, BVM (8-15L O2) — see Ventilation Rates',
          'SitRep: Hatzolah dispatch + call ambulance',
        ],
      },
      ventilationRates: {
        headers: ['Age', 'Ventilate every', 'OR'],
        rows: [
          ['> 15 years', '5 seconds', '12x per minute'],
          ['12 - 15 years', '3 - 4 seconds', '14 - 26x per minute'],
          ['5 - 11 years', '2 - 3 seconds', '16 - 34x per minute'],
          ['1 - 4 years', '2 - 3 seconds', '20 - 40x per minute'],
          ['< 1 year', '2 seconds', '25 - 55x per minute'],
        ],
      },
      management: [
        { if: 'All patients', then: 'Avoid: Standing / walking patient' },
        { if: 'Altered conscious OR Hypotensive', then: 'Position: Supine' },
        { if: 'ELSE Breathing difficulties', then: 'Position: Sitting / tripoding' },
        { if: 'Safe / possible to do so', then: 'Remove antigen (E.G. bee stinger)' },
        { if: 'All patients', then: 'Adrenaline, IM (Epi-Pen) — see Dosing' },
        {
          if: 'Worsens OR no change @ 5 mins',
          then: 'Can repeat initial dose ONCE only. Consult clinician regarding further doses',
        },
        {
          if: 'All patients',
          then: 'Apply oxygen. Once stable titrate to 92-96% — Oxygen, NRB (10-15L O2)',
        },
        { if: 'Wheezing', then: 'Salbutamol, Nebulised (8L O2) — see Dosing' },
        { if: 'REGARDLESS of severity / improvement', then: 'Transport to hospital' },
      ],
      dosing: [
        {
          drug: 'Adrenaline',
          indication: 'Anaphylaxis',
          demographic: '≥ 6 years old & ≥ 20 kgs',
          route: 'Intramuscular (IM) — Epi-Pen — yellow device',
          initial: '0.3 mg (Epi-Pen)',
          repeat: 'Can repeat initial dose ONCE only at 5/60',
          max: 'Consult',
        },
        {
          drug: 'Adrenaline',
          indication: 'Anaphylaxis',
          demographic: '< 6 years old OR < 20 kgs',
          route: 'Intramuscular (IM) — Epi-Pen — green device',
          initial: '0.15 mg (Epi-Pen Jr)',
          repeat: 'Can repeat initial dose ONCE only at 5/60',
          max: 'Consult',
        },
        {
          drug: 'Salbutamol',
          indication: 'Anaphylaxis & Wheezing',
          demographic: '≥ 16 years old',
          route: 'Nebulised',
          initial: '10 mg (2 ampules) with 8L O2',
          repeat: '5 mg @ 5 min (1 ampule) with 8L O2',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'Anaphylaxis & Wheezing',
          demographic: '6 - 15 years old',
          route: 'Nebulised',
          initial: '5 mg (1 ampule) with 8L O2',
          repeat: '5 mg @ 20 min (1 ampule) with 8L O2',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'Anaphylaxis & Wheezing',
          demographic: '2 - 5 years old',
          route: 'Nebulised',
          initial: '2.5 mg (1/2 ampule) with 8L O2',
          repeat: '2.5 mg @ 20 min (1/2 ampule) with 8L O2',
          max: 'Nil',
        },
      ],
      furtherNotes: [
        'Anaphylaxis can be difficult to identify, while rash / itch is common they are NOT mandatory',
        'For the purposes of this guideline a \'known antigen\' refers to any substance that has previously caused an anaphylactic reaction in this patient',
        'Adrenaline saves lives in anaphylaxis! NEVER delay adrenaline in favour of other medications',
        'Advise patient of possible adrenaline side effects including heart racing / palpitations / anxiety',
        'Hospital based observations are required for a minimum of 4 hours',
      ],
    },
  },
  'asthma-cb': {
    title: 'Asthma / Wheeze (L1)',
    level: 'CB',
    category: 'respiratory',
    summary: 'Basic asthma management for Level 1 responders',
    content: {
      definition: {
        description: 'Asthma is a chronic respiratory condition characterized by acute episodes of airway swelling, constriction and hyper mucus secretion. This can lead to wheezing, difficulty breathing, chest tightness, coughing and – in extreme cases – respiratory arrest and death.',
        exacerbationTriggers: [
          'Allergens (E.G. pollens, fur)',
          'Exercise',
          'Respiratory infections',
          'Weather (E.G. thunderstorm asthma)',
          'Medications (E.G. NSAIDs)',
          'Irritants (E.G. pollution, fumes)',
        ],
      },
      recognition: ['Difficulty breathing & Wheezing', 'Difficulty breathing & Asthma history'],
      ageBands: [
        {
          label: '2 years old to adult',
          stop: [
            {
              trigger: 'Patient becomes unresponsive & Ineffective breathing',
              actions: ['Manage as Cardiac Arrest!'],
            },
          ],
          management: [
            { if: 'All patients', then: 'Minimise patient exertion' },
            { if: 'Conscious', then: 'Position: Sitting / Position of comfort' },
            { if: 'Altered conscious', then: 'Position: Supine' },
            {
              if: 'Puffer available',
              then: 'Salbutamol, Puffer via Spacer — 4 doses, 4 breaths for each dose. UNTIL difficult breathing relieved. Repeat: @ 4 mins',
            },
            { if: 'Mild & Responds to Mx', then: 'Use VVED as minimum' },
          ],
          thunderstormAsthma: {
            trigger: 'Thunderstorm asthma declared by Hatzolah Clinical Operations Manager & Nil improvement despite Salbutamol',
            actions: [
              'Adrenaline, IM (Epi-Pen)',
              '0.3 mg (Epi-Pen) IF ≥ 20 kgs',
              '0.15 mg (Epi-Pen Jr) IF < 20 kgs',
            ],
          },
          escalationOfCare: {
            trigger: 'Moderate, severe OR thunderstorm',
            actions: ['Call for Ambulance / 000'],
          },
        },
      ],
      dosing: [
        {
          drug: 'Salbutamol',
          indication: 'Salbutamol — Mild / moderate asthma',
          demographic: '≥ 2 years old',
          route: 'pMDI (I.E. Puffer)',
          initial: '4 puffs, 4x breaths per puff, via spacer',
          repeat: '4 puffs @ 4 min, 4x breaths per puff, via spacer',
          max: 'Nil',
        },
        {
          drug: 'Adrenaline',
          indication: 'Adrenaline — Thunderstorm Asthma',
          demographic: '≥ 6 years old & ≥ 20 kgs',
          route: 'Intramuscular (IM), Epi-Pen — yellow device',
          initial: '0.3 mg, Epi-Pen, IF Thunderstorm asthma declared by Hatzolah',
          repeat: 'Consult',
          max: 'Consult',
        },
        {
          drug: 'Adrenaline',
          indication: 'Adrenaline — Thunderstorm Asthma',
          demographic: '< 6 years old OR < 20 kgs',
          route: 'Intramuscular (IM), Epi-Pen — green device',
          initial: '0.15 mg, Epi-Pen Jr, IF Thunderstorm asthma declared by Hatzolah',
          repeat: 'Consult',
          max: 'Consult',
        },
      ],
      furtherNotes: [
        'If 000 had NOT been called OR ambulance is NOT attending for mild asthma the VVED must be used as a minimum. All instances of Asthma must be escalated.',
        'Asthmatic patients can show initial improvement with treatment prior to rapid deterioration - ensure ongoing monitoring',
        'This guideline is only designed for patients that are 2 years old and over',
      ],
    },
  },
  'asthma-fr': {
    title: 'Asthma History / Wheeze',
    level: 'FR',
    category: 'respiratory',
    summary: 'Full asthma management with nebulisation',
    content: {
      definition: {
        description: 'Asthma is a chronic respiratory condition characterized by acute episodes of airway swelling, constriction and hyper mucus secretion. This can lead to wheezing, difficulty breathing, chest tightness, coughing and – in extreme cases – respiratory arrest and death.',
        exacerbationTriggers: [
          'Allergens (E.G. pollens, fur)',
          'Exercise',
          'Respiratory infections',
          'Weather (E.G. thunderstorm asthma)',
          'Medications (E.G. NSAIDs)',
          'Irritants (E.G. pollution, fumes)',
        ],
      },
      recognition: ['Difficulty breathing & Wheezing', 'Difficulty breathing & Asthma history'],
      ageBands: [
        {
          label: 'Adult / 16+ years old',
          stop: [
            {
              trigger: 'Patient becomes unresponsive & No pulse',
              actions: ['Manage as Cardiac Arrest!'],
            },
            {
              trigger: 'Patient becomes unresponsive & Has pulse',
              actions: [
                'Position: Supine',
                'Oxygen, BVM (8-15L O2) — ventilate once every 8 - 12 seconds (5 - 8x p/min)',
              ],
            },
          ],
          management: [
            { if: 'All patients', then: 'Minimise patient exertion' },
            { if: 'Conscious', then: 'Position: Sitting / Position of comfort' },
            { if: 'Altered conscious', then: 'Position: Supine' },
            { if: 'Conscious & SpO2 < 92%', then: 'Oxygen, Face Mask (8L O2)' },
            {
              if: 'pMDI available & Mild / Moderate',
              then: 'Salbutamol, pMDI via Spacer — 4 to 12 doses, 4 breaths for each dose. UNTIL difficult breathing relieved. Repeat: @ 20 mins',
            },
            { if: 'Mild & Responds to Mx', then: 'Use VVED as minimum' },
            {
              if: 'No pMDI OR Severe',
              then: 'Salbutamol, Nebulised (8L O2) — 10 mg (2 nebs). UNTIL difficult breathing relieved. Repeat: 5 mg (1 neb) @ 5 mins',
            },
            { if: 'Severe', then: 'Atrovent, Nebulised (8L O2) — 500 mcg (2 nebules)' },
            { if: 'Severe resp. distress despite Salbutamol', then: 'Consider if Anaphylaxis' },
          ],
          thunderstormAsthma: {
            trigger: 'Suspected thunderstorm asthma & Nil improvement despite Salbutamol + Atrovent & Clinician unavailable',
            actions: [
              'Adrenaline, IM (Epi-Pen)',
              '0.3 mg (Epi-Pen) IF ≥ 20 kgs',
              '0.15 mg (Epi-Pen Jr) IF < 20 kgs',
            ],
          },
          escalationOfCare: {
            trigger: 'Moderate, severe OR thunderstorm',
            actions: ['Call for Ambulance / 000'],
          },
        },
        {
          label: '12 to 15 years old',
          stop: [
            {
              trigger: 'Patient becomes unresponsive & No pulse',
              actions: ['Manage as Cardiac Arrest!'],
            },
            {
              trigger: 'Patient becomes unresponsive & Has pulse',
              actions: [
                'Position: Supine',
                'Oxygen, BVM (8-15L O2) — ventilate once every 8 - 12 seconds (5 - 8x p/min)',
              ],
            },
          ],
          management: [
            { if: 'All patients', then: 'Minimise patient exertion' },
            { if: 'Conscious', then: 'Position: Sitting / Position of comfort' },
            { if: 'Altered conscious', then: 'Position: Supine' },
            { if: 'Conscious & SpO2 < 96%', then: 'Oxygen, Face Mask (8L O2)' },
            {
              if: 'pMDI available & Mild / Moderate',
              then: 'Salbutamol, pMDI via Spacer — 4 to 12 doses, 4 breaths for each dose. UNTIL difficult breathing relieved. Repeat: @ 20 mins',
            },
            { if: 'Mild & Responds to Mx', then: 'Use VVED as minimum' },
            {
              if: 'No pMDI OR Severe',
              then: 'Salbutamol, Nebulised (8L O2) — 5 mg (1 neb). UNTIL difficult breathing relieved. Repeat: 20 mins',
            },
            { if: 'Severe', then: 'Atrovent, Nebulised (8L O2) — 500 mcg (2 nebules)' },
            { if: 'Severe resp. distress despite Salbutamol', then: 'Consider if Anaphylaxis' },
          ],
          thunderstormAsthma: {
            trigger: 'Suspected thunderstorm asthma & Nil improvement despite Salbutamol + Atrovent & Clinician unavailable',
            actions: [
              'Adrenaline, IM (Epi-Pen)',
              '0.3 mg (Epi-Pen) IF ≥ 20 kgs',
              '0.15 mg (Epi-Pen Jr) IF < 20 kgs',
            ],
          },
          escalationOfCare: {
            trigger: 'Moderate, severe OR thunderstorm',
            actions: ['Call for Ambulance / 000'],
          },
        },
        {
          label: '6 to 11 years old',
          stop: [
            {
              trigger: 'Patient becomes unresponsive & No pulse',
              actions: ['Manage as Cardiac Arrest!'],
            },
            {
              trigger: 'Patient becomes unresponsive & Has pulse',
              actions: [
                'Position: Supine',
                'Oxygen, BVM (8-15L O2) — ventilate once every 5 - 6 seconds (10 - 14x p/min)',
              ],
            },
          ],
          management: [
            { if: 'All patients', then: 'Minimise patient exertion' },
            { if: 'Conscious', then: 'Position: Sitting / Position of comfort' },
            { if: 'Altered conscious', then: 'Position: Supine' },
            { if: 'Conscious & SpO2 < 96%', then: 'Oxygen, Face Mask (8L O2)' },
            {
              if: 'pMDI available & Mild / Moderate',
              then: 'Salbutamol, pMDI via Spacer — 4 to 12 doses, 4 breaths for each dose. UNTIL difficult breathing relieved. Repeat: @ 20 mins',
            },
            { if: 'Mild & Responds to Mx', then: 'Use VVED as minimum' },
            {
              if: 'No pMDI OR Severe',
              then: 'Salbutamol, Nebulised (8L O2) — 5 mg (1 neb). UNTIL difficult breathing relieved. Repeat: @ 20 mins',
            },
            { if: 'Severe', then: 'Atrovent, Nebulised (8L O2) — 250 mcg (1 nebule)' },
            { if: 'Severe resp. distress despite Salbutamol', then: 'Consider if Anaphylaxis' },
          ],
          thunderstormAsthma: {
            trigger: 'Suspected thunderstorm asthma & Nil improvement despite Salbutamol + Atrovent & Clinician unavailable',
            actions: [
              'Adrenaline, IM (Epi-Pen)',
              '0.3 mg (Epi-Pen) IF ≥ 20 kgs',
              '0.15 mg (Epi-Pen Jr) IF < 20 kgs',
            ],
          },
          escalationOfCare: {
            trigger: 'Moderate, severe OR thunderstorm',
            actions: ['Call for Ambulance / 000'],
          },
        },
        {
          label: '2 to 5 years old',
          stop: [
            {
              trigger: 'Patient becomes unresponsive & No pulse',
              actions: ['Manage as Cardiac Arrest!'],
            },
            {
              trigger: 'Patient becomes unresponsive & Has pulse',
              actions: [
                'Position: Supine',
                'Oxygen, BVM (8-15L O2) — ventilate once every:',
                '5 - 6 seconds (10 - 14x p/min) IF 5 years old',
                '4 - 5 seconds (12 - 15x p/min) IF 2 - 4 years old',
              ],
            },
          ],
          management: [
            { if: 'All patients', then: 'Minimise patient exertion' },
            { if: 'Conscious', then: 'Position: Sitting / Position of comfort' },
            { if: 'Altered conscious', then: 'Position: Supine' },
            { if: 'Conscious & SpO2 < 96%', then: 'Oxygen, Face Mask (8L O2)' },
            {
              if: 'pMDI available & Mild / Moderate',
              then: 'Salbutamol, pMDI via Spacer — 2 to 6 doses, 4 breaths for each dose. UNTIL difficult breathing relieved. Repeat: @ 20 mins',
            },
            { if: 'Mild & Responds to Mx', then: 'Use VVED as minimum' },
            {
              if: 'No pMDI OR Severe',
              then: 'Salbutamol, Nebulised (8L O2) — 2.5 mg (½ neb). UNTIL difficult breathing relieved. Repeat: @ 20 mins',
            },
            { if: 'Severe', then: 'Atrovent, Nebulised (8L O2) — 250 mcg (1 nebule)' },
            { if: 'Severe resp. distress despite Salbutamol', then: 'Consider if Anaphylaxis' },
          ],
          thunderstormAsthma: {
            trigger: 'Suspected thunderstorm asthma & Nil improvement despite Salbutamol + Atrovent & Clinician unavailable',
            actions: [
              'Adrenaline, IM (Epi-Pen)',
              '0.3 mg (Epi-Pen) IF ≥ 20 kgs',
              '0.15 mg (Epi-Pen Jr) IF < 20 kgs',
            ],
          },
          escalationOfCare: {
            trigger: 'Moderate, severe OR thunderstorm',
            actions: ['Call for Ambulance / 000'],
          },
        },
      ],
      dosing: [
        {
          drug: 'Salbutamol',
          indication: 'Salbutamol — Mild / moderate asthma',
          demographic: '≥ 6 years old',
          route: 'pMDI (I.E. Puffer)',
          initial: '4 – 12 puffs, 4x breaths per puff, via spacer',
          repeat: '4 – 12 puffs @ 20 min, 4x breaths per puff, via spacer',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'Salbutamol — Mild / moderate asthma',
          demographic: '2 - 5 years old',
          route: 'pMDI (I.E. Puffer)',
          initial: '2 – 6 puffs, 4x breaths per puff, via spacer',
          repeat: '2 – 6 puffs @ 20 min, 4x breaths per puff, via spacer',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'Salbutamol — Severe asthma OR Nil improvement',
          demographic: '≥ 16 years old',
          route: 'Nebulised',
          initial: '10 mg, 2 ampules, with 8L O2',
          repeat: '5 mg @ 5 min, 1 ampule, with 8L O2',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'Salbutamol — Severe asthma OR Nil improvement',
          demographic: '6 - 15 years old',
          route: 'Nebulised',
          initial: '5 mg, 1 ampule, with 8L O2',
          repeat: '5 mg @ 20 min, 1 ampule, with 8L O2',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'Salbutamol — Severe asthma OR Nil improvement',
          demographic: '2 - 5 years old',
          route: 'Nebulised',
          initial: '2.5 mg, 1/2 ampule, with 8L O2',
          repeat: '2.5 mg @ 20 min, 1/2 ampule, with 8L O2',
          max: 'Nil',
        },
        {
          drug: 'Ipratropium Bromide',
          indication: 'Ipratropium Bromide (Atrovent) — No improvement after 20 mins Salbutamol',
          demographic: '≥ 12 years old',
          route: 'Nebulised',
          initial: '500 mcg (2 nebules)',
          repeat: 'Nil',
          max: '500 mcg (total dose)',
        },
        {
          drug: 'Ipratropium Bromide',
          indication: 'Ipratropium Bromide (Atrovent) — No improvement after 20 mins Salbutamol',
          demographic: '< 12 years old',
          route: 'Nebulised',
          initial: '250 mcg (1 nebule)',
          repeat: 'Nil',
          max: '250 mcg (total dose)',
        },
        {
          drug: 'Adrenaline',
          indication: 'Adrenaline — Thunderstorm Asthma',
          demographic: '≥ 6 years old & ≥ 20 kgs',
          route: 'Intramuscular (IM), Epi-Pen — yellow device',
          initial: '0.3 mg, Epi-Pen',
          repeat: 'Consult',
          max: 'Consult',
        },
        {
          drug: 'Adrenaline',
          indication: 'Adrenaline — Thunderstorm Asthma',
          demographic: '< 6 years old OR < 20 kgs',
          route: 'Intramuscular (IM), Epi-Pen — green device',
          initial: '0.15 mg, Epi-Pen Jr',
          repeat: 'Consult',
          max: 'Consult',
        },
      ],
      furtherNotes: [
        'If 000 had NOT been called OR ambulance is NOT attending for mild asthma the VVED must be used as a minimum',
        'Asthmatic patients can show initial improvement with treatment prior to rapid deterioration - ensure ongoing monitoring',
        'Improving SpO2 may NOT necessarily be a sign of improvement in clinical condition',
        'Beware of patient presenting with wheeze & history of heart failure but NO history of asthma / COPD - they do NOT meet this guideline',
        'Over ventilation of the asthmatic patient may result in worse patient outcomes',
        'Management is primarily targeted at relieving difficult breathing - AVOID administering large doses of Salbutamol when wheeze is the only ongoing concern',
        'This guideline is only designed for patients that are 2 years old and over',
      ],
    },
  },
  'cardiac-arrest-cb': {
    title: 'Cardiac Arrest (L1)',
    level: 'CB',
    category: 'cardiac',
    summary: 'Basic cardiac arrest management for Level 1 responders',
    content: {
      definition: 'Cardiac arrest refers to the heart\'s sudden inability to pump blood effectively around the body. Without immediate intervention this will lead to death - typically within minutes.',
      recognition: 'IF unconscious and ineffectively breathing, manage as cardiac arrest.',
      primarySurvey: {
        headers: ['Primary Survey', 'Assess', 'Manage'],
        rows: [
          ['D — Dangers', 'Scene safety?', 'Do NOT enter unsafe scene'],
          ['R — Response', 'Response to voice / pain?', ''],
          ['S — Send for help', 'Call for Ambulance / 000', 'Request backup'],
          ['A — Airway', 'Patency?', ''],
          ['B — Breathing', 'Breathing effectively?', 'IF ineffective – CPR'],
          ['C — Circulation', 'Major bleeding?', 'Direct pressure / CAT tourniquet'],
        ],
      },
      ifPossible: 'Gain 360° access to patient',
      responders: [
        'RESPONDER 1 — Apply: AED Defibrillator',
        'RESPONDER 2 (IF MULTIPLE CREW) — CPR compressions, 100-120 per minute',
      ],
      defibrillatorAndCpr: {
        followInstructions: 'From AED / defibrillator (If under 8 select child)',
        ifShockAdvised: {
          trigger: 'IF Shock advised',
          actions: [
            'Ensure NO ONE touching patient prior / during shock (includes stopping compressions)',
            'Press: Shock',
          ],
        },
        cprCompressions: '100-120 per minute',
        cprRatio: [
          { if: 'Adult (>15)', then: 'CPR 30 : 2' },
          { if: 'Child & Single operator', then: 'CPR 30 : 2' },
          { if: 'Child & Two operators', then: 'CPR 15 : 2' },
        ],
        repeat: 'EVERY 2 minutes — From top of this box (I.E. DEFIBRILLATOR + CPR)',
        ifMultipleOfficers: 'Alternate: CPR responder 2 minutely',
        ifNoShockAdvised: 'Check for signs of life/normal breathing (<5 seconds)',
      },
      stop: [
        {
          trigger: 'RETURN OF SIGNS OF LIFE — Breathing normally / Other signs of life',
          actions: [
            'Stop CPR / resuscitation',
            'Continuously monitor for re-arrest / effective breathing',
            'Place in recovery position',
          ],
        },
        {
          trigger: 'First Responders do not certify or verify death.',
          actions: ['IF CPR is being withheld, contact the on-call Clinician immediately for approval.'],
        },
      ],
      furtherNotes: [
        'Appropriate defibrillation and continuous CPR save lives. Keep all interruptions to compressions to an absolute minimum.',
        'Hands should be positioned in the middle of the chest (lower half of the sternum)',
        'CPR depth should be 1/3 depth of the chest',
        'If single responder and unable to effectively complete ventilations, perform compressions only until further resources arrive',
        'Effective ventilation is guided by rise and fall of the chest with a minimum pause in CPR',
      ],
    },
  },
  'cardiac-arrest-fr': {
    title: 'Cardiac Arrest',
    level: 'FR',
    category: 'cardiac',
    summary: 'Full advanced cardiac arrest management',
    content: {
      definition: 'Cardiac arrest refers to the hearts sudden inability to pump blood effectively around the body. Without immediate intervention this will lead to death - typically within minutes.',
      recognition: {
        signs: 'The 3 signs that a patient is in cardiac arrest are no response, ineffective breathing + no pulse. These should be discovered during the primary survey as follows',
        primarySurveyFindings: [
          { letter: 'D', meaning: 'Dangers' },
          { letter: 'R', meaning: 'Response — No response' },
          { letter: 'A', meaning: 'Airway' },
          { letter: 'B', meaning: 'Breathing — No / ineffective breathing (E.G. Agonal)' },
          { letter: 'C', meaning: 'Circulation — No pulse' },
        ],
      },
      primarySurvey: {
        headers: ['Primary Survey', 'Assess', 'Manage'],
        rows: [
          ['D — Dangers', 'Scene safety?', 'Do NOT enter unsafe scene'],
          ['R — Response', 'Response to voice / pain?', ''],
          ['S — Send for help', 'Call for Ambulance / 000', 'Request backup'],
          ['A — Airway', 'C-spine injury? Patency?', 'Align in neutral position'],
          ['B — Breathing', 'Breathing effectively?', ''],
          ['C — Circulation', 'Pulse? Major bleeding?', 'Direct pressure major bleed'],
        ],
      },
      ifPossible: 'Gain 360° access to patient',
      ifTraumaticArrest: [
        { if: 'Pelvic #', then: 'Pelvic splint' },
        { if: 'Required', then: 'Haemostatic dressing' },
        { if: 'Required', then: 'CAT tourniquet' },
      ],
      responders: [
        'RESPONDER 1 — Apply: Defibrillator, Age appropriate pads',
        'RESPONDER 2 (IF MULTIPLE CREW) — CPR compressions, 100-120 per minute',
      ],
      defibrillatorAndCpr: {
        followInstructions: 'From AED / defibrillator',
        ifShockAdvised: {
          trigger: 'IF Shock advised',
          actions: [
            'Ensure NO ONE touching patient prior / during shock (includes stopping compressions)',
            'Press: Shock',
          ],
        },
        cprCompressions: [
          '100-120 per minute',
          'IF ≥ 4 years old — 2 hands technique',
          'IF < 5 years old — 1 hand technique',
        ],
        ventilation: [
          {
            if: '≥ 15 years old OR Single officer',
            then: 'Ventilate via BVM 15L O2 @ 30 : 2, consider LMA',
          },
          {
            if: '< 16 years old & Multiple officers',
            then: 'Ventilate via BVM 15L O2 @ 15 : 2, consider LMA',
          },
        ],
        repeat: [
          'EVERY 2 minutes — From top of this box (I.E. DEFIBRILLATOR + CPR)',
          'IF Multiple officers — Alternate: CPR responder 2 minutely',
          'IF No shock advised — Check for pulse (in < 10 seconds)',
        ],
      },
      rosc: {
        ifPulseReturns: {
          trigger: 'IF Pulse returns',
          actions: ['Stop CPR / resuscitation'],
        },
        ifBreathingIneffectively: {
          manage: 'Oxygen, BVM (15L O2)',
          ventilateEvery: {
            headers: ['Age', 'Ventilate every', 'OR'],
            rows: [
              ['> 15 years', '5 seconds', '12x per minute'],
              ['12 - 15 years', '3 - 4 seconds', '14 - 26x per minute'],
              ['5 - 11 years', '2 - 3 seconds', '16 - 34x per minute'],
              ['1 - 4 years', '2 - 3 seconds', '20 - 40x per minute'],
              ['< 1 year', '2 seconds', '25 - 55x per minute'],
            ],
          },
        },
        ongoingCare: [
          'Continuously monitor for re-arrest',
          'IF Accredited to do so — 12 Lead ECG',
          'Expedite transport',
        ],
      },
      paediatricCardiacArrestRates: [
        {
          label: '0 to 11 Years',
          oneRescuer: {
            headers: ['Age', 'Category', 'Rate', 'Technique', 'Ratio'],
            rows: [
              ['< 24 hours', 'Newborn', '100 - 120', '2 fingers', '3 : 1'],
              ['< 3 months', 'Small Infant', '100 - 120', '2 fingers', '30 : 2'],
              ['3 - 12 months', 'Large Infant', '100 - 120', '2 fingers', '30 : 2'],
              ['1 year', 'Small Child', '100 - 120', '1 hand', '30 : 2'],
              ['2 years', 'Small Child', '100 - 120', '1 hand', '30 : 2'],
              ['3 years', 'Small Child', '100 - 120', '1 hand', '30 : 2'],
              ['4 years', 'Small Child', '100 - 120', '1 hand', '30 : 2'],
              ['5 years', 'Medium Child', '100 - 120', '2 hands', '30 : 2'],
              ['6 years', 'Medium Child', '100 - 120', '2 hands', '30 : 2'],
              ['7 years', 'Medium Child', '100 - 120', '2 hands', '30 : 2'],
              ['8 years', 'Medium Child', '100 - 120', '2 hands', '30 : 2'],
              ['9 years', 'Medium Child', '100 - 120', '2 hands', '30 : 2'],
              ['10 years', 'Medium Child', '100 - 120', '2 hands', '30 : 2'],
              ['11 years', 'Medium Child', '100 - 120', '2 hands', '30 : 2'],
            ],
          },
          twoRescuers: {
            headers: ['Age', 'Category', 'Rate', 'Technique', 'Ratio'],
            rows: [
              ['< 24 hours', 'Newborn', '100 - 120', '2 thumbs', '3 : 1'],
              ['< 3 months', 'Small Infant', '100 - 120', '2 thumbs', '15 : 2'],
              ['3 - 12 months', 'Large Infant', '100 - 120', '2 thumbs', '15 : 2'],
              ['1 year', 'Small Child', '100 - 120', '1 hand', '15 : 2'],
              ['2 years', 'Small Child', '100 - 120', '1 hand', '15 : 2'],
              ['3 years', 'Small Child', '100 - 120', '1 hand', '15 : 2'],
              ['4 years', 'Small Child', '100 - 120', '1 hand', '15 : 2'],
              ['5 years', 'Medium Child', '100 - 120', '2 hands', '15 : 2'],
              ['6 years', 'Medium Child', '100 - 120', '2 hands', '15 : 2'],
              ['7 years', 'Medium Child', '100 - 120', '2 hands', '15 : 2'],
              ['8 years', 'Medium Child', '100 - 120', '2 hands', '15 : 2'],
              ['9 years', 'Medium Child', '100 - 120', '2 hands', '15 : 2'],
              ['10 years', 'Medium Child', '100 - 120', '2 hands', '15 : 2'],
              ['11 years', 'Medium Child', '100 - 120', '2 hands', '15 : 2'],
            ],
          },
        },
        {
          label: '12+ Years',
          oneRescuer: {
            headers: ['Age', 'Category', 'Rate', 'Technique', 'Ratio'],
            rows: [
              ['12 years', 'Adolescent', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
              ['13 years', 'Adolescent', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
              ['14 years', 'Adolescent', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
              ['15 years', 'Adolescent', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
              ['16+ years', 'Adult', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
            ],
          },
          twoRescuers: {
            headers: ['Age', 'Category', 'Rate', 'Technique', 'Ratio'],
            rows: [
              ['12 years', 'Adolescent', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
              ['13 years', 'Adolescent', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
              ['14 years', 'Adolescent', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
              ['15 years', 'Adolescent', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
              ['16+ years', 'Adult', '100 - 120', '2 hands', '30 : 2 / LMA, 15 : 2 NO pause'],
            ],
          },
        },
      ],
      immediateAction: [
        'DO pause for ventilations if NO LMA being used',
        'Do NOT pause for ventilations if LMA is being used',
      ],
      stop: {
        trigger: 'First Responders do not certify or verify death.',
        actions: ['IF CPR is being withheld, contact the on-call Clinician immediately for approval.'],
      },
      furtherNotes: [
        'CPR may be withheld where there is an Advanced Care Directive to NOT commence resuscitation.',
        'CPR may be withheld where death is obvious. This includes injuries where survival is impossible, rigor mortis, postmortem lividity, putrefaction/decomposition or where death has been declared by a medical doctor. A consult must still occur in these scenarios.',
        'In cases of Traumatic Cardiac Arrest, managing correctable causes is priority including Haemorrhage control, Airway & Breathing Management, and Pelvic Splinting',
        'Appropriate defibrillation and continuous CPR saves lives',
        'Keep all interruptions to compressions to an absolute minimum.',
        'Hands should be positioned in the middle of the chest (lower half of the sternum) for effective CPR',
        'CPR depth should be 1/3 depth of the chest',
        'Effective ventilation is guided by rise and fall of the chest with a minimum pause in CPR',
      ],
    },
  },
  'cardiac-chest-pain': {
    title: 'Cardiac Chest Pain / Discomfort',
    level: 'FR',
    category: 'cardiac',
    summary: 'Acute coronary syndrome assessment and management',
    content: {
      definition: 'Cardiac chest pain specifically refers to chest pain that originates from the heart or its surrounding structures. It is often associated with Acute Coronary Syndrome (ACS). ACS refers to a spectrum of conditions that are primarily associated with a sudden blockage of the coronary arteries and subsequent reduction in blood flow to the heart muscle. This represents a time critical and life-threatening complication.',
      recognition: [
        'Cardiac chest pain can be notoriously difficult to differentiate from non-cardiac chest pain - when in doubt, the "payoff principle" advised is to treat as if it were cardiac',
        'Chest pain associated with ANY of the following characteristics or symptoms should markedly increase suspicion that it may be of a cardiac nature:',
        'History of experiencing similar pain during previous cardiac events',
        'Pain that radiates to the shoulder, arm, jaw, neck, upper abdomen OR back',
        'Pain that is worse on exertion (E.G. walking, climbing stairs)',
        'Pain that is constant at rest (E.G. not significantly worse when coughing)',
        'Pain associated with active vomiting',
        'Pain associated with sweating',
        'The following risk factors also increase the likelihood of chest pain having a cardiac origin:',
        'Age ≥ 40',
        'Obesity / poor diet / poor exercise',
        'Smoking',
        'History of hypertension / high cholesterol',
        'History of diabetes',
        'Family / genetic history of cardiac events',
      ],
      management: {
        initial: ['SitRep: Hatzolah dispatch + call ambulance', 'Treat as time critical'],
        treatment: [
          { if: 'Accredited to do so', then: '12 Lead ECG' },
          { if: 'SpO2 < 92%', then: 'Oxygen, PRN' },
          { if: 'Suspecting Cardiac Chest Pain', then: 'Aspirin, Oral — 300 mg' },
          { if: 'Pain ≥ 2', then: 'GTN, Sublingual / Buccal — 300 mcg' },
          { if: 'Pain remains ≥ 3', then: 'Methoxyflurane, Whistle — 3 mL (1 vial)' },
        ],
        gtn: [
          'IF Pain ≥ 2 & sBP ≥ 100 — Repeat: @ 5 min intervals',
          'IF No side effects — Maximum: No maximum - within reason',
          'Reassess: BP after each dose',
          'Reassess: Side effects after each dose',
        ],
        methoxyflurane: [
          'IF Required — Repeat: @ 25 mins (continuous use)',
          'IF No side effects — Maximum: 6 mL (2 vials) in 24 hour period',
        ],
      },
      stop: [
        {
          trigger: 'Aspirin — IF Associated back pain',
          actions: ['Do NOT give Aspirin'],
        },
        {
          trigger: 'GTN — IF sBP < 100 OR Side effects',
          actions: ['Remove tablet + rinse mouth'],
        },
      ],
      dosing: [
        {
          indication: 'Aspirin — IF Cardiac chest pain / Discomfort',
          demographic: '≥ 11 years old',
          route: 'Oral',
          initial: '300 mg',
          repeat: 'Nil',
          max: '300 mg (total dose)',
        },
        {
          indication: 'Glyceryl Trinitrate (GTN) — IF Cardiac Chest Pain / Discomfort',
          demographic: '≥ 15 years old',
          route: 'Sublingual',
          initial: '300 mcg',
          repeat: '300 mcg @ 5 mins',
          max: 'Nil',
        },
        {
          indication: 'Methoxyflurane — IF Pain score ≥ 3',
          demographic: 'All ages',
          route: 'Inhaled whistle',
          initial: '3 mL',
          repeat: '3 mL PRN — 3 mL typically lasts for 25 minutes continuous use',
          max: '6 mL in 24 hours',
        },
      ],
    },
  },
  'general-trauma-cb': {
    title: 'General Trauma Approach (L1)',
    level: 'CB',
    category: 'trauma',
    summary: 'Basic trauma management for Level 1 responders',
    content: {
      definition: [
        'Trauma refers to bodily injury caused by a sudden application of significant force (E.G. Fall). Such force may be blunt (E.G. Head strike against concrete) OR penetrating (E.G. Punctured by a knife). In either case it results in damage to tissue and organs, ranging from minor cuts to life threatening injuries.',
        'Trauma may also be localised and occur to a specific body region (E.G. Heavy object falling on a foot) OR it may be undifferentiated (E.G. Car crash, falls, etc). Undifferentiated trauma requires a systematic head to toe assessment to ensure no injuries are missed.',
      ],
      principlesOfMajorTrauma: [
        'In cases of Traumatic Cardiac Arrest, managing correctable causes is priority including Haemorrhage control.',
        'If possible C-spine injury, maintain the patients head in a neutral position avoiding neck flexion/extension',
        'Hypothermia is a significant concern leading to increased mortality. Warming the patient is important and where appropriate should NOT be delayed',
        'The Mechanism of injury is a significant risk factor. Thorough History taking is important to identify such mechanisms and subsequent care/priority.',
      ],
      immediateAction: {
        majorHaemorrhageControl: [
          { if: 'Life threatening bleed', then: 'Apply pad and pressure' },
          { if: 'Uncontrollable life-threatening bleed', then: 'Combat Application Tourniquet' },
        ],
        breathingManagement: [
          { if: 'Breathing ineffectively & unconscious', then: 'Manage as per cardiac arrest' },
        ],
      },
    },
  },
  'general-trauma-fr': {
    title: 'General Trauma Approach',
    level: 'FR',
    category: 'trauma',
    summary: 'Full trauma management protocol',
    content: {
      definition: [
        'Trauma refers to bodily injury caused by a sudden application of significant force (E.G. Fall). Such force may be blunt (E.G. Head strike against concrete) OR penetrating (E.G. Punctured by a knife). In either case it results in damage to tissue and organs, ranging from minor cuts to life threatening injuries.',
        'Trauma may also be localised and occur to a specific body region (E.G. Heavy object falling on a foot) OR it may be undifferentiated (E.G. Car crash, falls, etc). Undifferentiated trauma requires a systematic head to toe assessment to ensure no injuries are missed.',
      ],
      principlesOfMajorTrauma: [
        'In cases of Traumatic Cardiac Arrest, managing correctable causes is priority including Haemorrhage control, Airway & Breathing Management, and Pelvic Splinting',
        'If possible C-spine injury, maintain the patients head in a neutral position avoiding neck flexion/extension',
        'ONLY utilise airway adjuncts (OP, NP) if airway not patent and ventilation required',
        'Hypothermia is a significant concern leading to increased mortality. Warming the patient is important and where appropriate should NOT be delayed!',
        'The Mechanism of injury is a significant risk factor. Thorough History taking is important to identify such mechanisms and subsequent care/priority.',
      ],
      immediateAction: {
        majorHaemorrhageControl: [
          { if: 'Life threatening bleed', then: 'Apply pad and pressure' },
          { if: 'Uncontrollable life threatening bleed', then: 'Combat Application Tourniquet' },
          { if: 'Uncontrollable life threatening wound', then: 'Quickclot trauma pad' },
          { if: 'Uncontrollable life threatening wound', then: 'Quickclot rolled gauze' },
          { if: 'Obvious significant pelvic fracture', then: 'Pelvic splint' },
        ],
        airwayManagement: [
          { if: 'Required', then: 'Triple airway manoeuvre / positioning' },
          { if: 'Required (E.G. vomit/blood in airways)', then: 'Suction' },
          { if: 'ONLY IF Airway is NOT patent', then: 'NPA' },
          { if: 'ONLY IF NPA attempt is UNSUCCESSFUL', then: 'OPA' },
        ],
        airwayDoNot: ['AVOID causing patient to gag or vomit'],
        breathingIneffectively: {
          condition: 'IF Breathing ineffectively',
          oxygen: 'Oxygen, BVM (8-15L O2)',
          ventilationRates: {
            headers: ['Age', 'Ventilate once every', 'OR'],
            rows: [
              ['> 15 years old', '5 seconds', '12x p/min'],
              ['12 - 15 years old', '3 - 4 seconds', '14 - 26x p/min'],
              ['5 - 11 years old', '2 - 3 seconds', '16 - 34x p/min'],
              ['1 - 4 years old', '2 - 3 seconds', '20 - 40x p/min'],
              ['< 1 year old', '2 seconds', '25 - 55x p/min'],
            ],
          },
        },
        breathingAdequately: {
          condition: 'IF Breathing adequately',
          oxygen: 'Oxygen, NRB (10 - 15L O2)',
          titration: [
            { if: 'ONLY IF Adequate perfusion', then: 'Titrate down to SpO2 92 - 96%' },
          ],
        },
      },
      headToToeAssessment: {
        headers: ['Assess', 'IF Required'],
        rows: [
          ['Head injury', 'Manage as per Head Injury guideline'],
          ['Spinal injury', 'Manage as per Spinal Injury guideline'],
          ['Chest injury', 'Manage as per Chest Injury guideline'],
          ['Abdominal injury', '—'],
          ['Pelvic injury', 'Apply pelvic splint'],
          ['Limb injury', '—'],
        ],
      },
    },
  },
  'head-trauma': {
    title: 'Head Trauma',
    level: 'FR',
    category: 'trauma',
    summary: 'Management of head injury: time critical, hospital transport and Virtual ED criteria',
    content: {
      immediateAction: {
        rule: [
          { if: 'Meeting ANY of the following criteria', then: 'Treat as time critical' },
        ],
        action: 'SitRep: Hatzolah dispatch + call ambulance',
        criteria: [
          'GCS < 13',
          'Penetrating head injury',
          '≥ 5 mins loss of consciousness',
          {
            skullFracture: [
              'Blood leaking from ear',
              'Cerebral Spinal Fluid (CSF) leaking from the ears OR nose',
              'Battle sign (bruising on the skull behind the earlobes)',
              'Raccoon eyes (bruising under the eyes)',
              'Other obvious sign of skull fracture',
            ],
          },
          'Vomiting more than once',
          'Neurological deficit',
          'Seizure',
          'Worsening signs and symptoms',
        ],
      },
      transportToHospital: {
        rule: [
          { if: 'Meeting ANY of the following criteria', then: 'Transport to hospital' },
        ],
        criteria: [
          'Altered mental status (from baseline)',
          'Dangerous mechanism of injury',
          'Amnesia ≥ 29 minutes',
          'Intoxication',
        ],
      },
      virtualEd: {
        rule: [
          { if: 'Meeting ANY of the following criteria', then: 'Virtual ED' },
        ],
        criteria: ['Age ≥ 64', 'Anticoagulant OR antiplatelet (not including aspirin)', 'Coagulopathy'],
      },
      painRelief: [
        { if: 'Required', then: 'Pain Relief, PRN' },
      ],
    },
  },
  'spinal-trauma': {
    title: 'Spinal Trauma',
    level: 'FR',
    category: 'trauma',
    summary: 'Spinal injury assessment and immobilisation',
    content: {
      immediateAction: {
        rule: [
          { if: 'Meeting time critical criteria', then: 'Treat as time critical' },
        ],
        action: 'SitRep: Hatzolah dispatch + call ambulance',
      },
      painRelief: [
        { if: 'Required', then: 'Pain Relief, PRN' },
      ],
      considerSpinalImmobilizationCriteria: {
        rule: [
          { if: 'ANY spinal immobilization criteria met', then: 'Apply cervical collar' },
        ],
        criteria: [
          'Major trauma following blunt trauma to the head or trunk',
          'ANY new motor deficits / weakness when asked to…',
          { arms: 'Grasp / pull / push', legs: 'Push / plantar flex, pull / dorsiflex, leg raise' },
          'ANY new sensory deficits / reduced sensation when applying light touch to the following',
          {
            arms: 'Light touch across the palm and back of hand',
            legs: 'Light touch to lateral side of calcaneus',
            questioning: 'The patient should be questioned regarding numbness, tingling, burning or any other altered sensation, anywhere in the body',
          },
          'NOTE: The left and right sides should be tested simultaneously to compare strength between each side of the body',
          'Midline pain / tenderness on palpation',
          'Inability to rotate neck 45° left and right',
          {
            doNot: ['Do NOT turn the patient\'s head for them'],
            instructions: [
              'Ask the patient to turn their head slowly left and right, approximately 45 degrees each direction, advised them to stop if they feel ANY pain OR resistance',
            ],
          },
          'Altered conscious state',
          'Intoxication',
          'Significant distracting injury',
          'History of vertebral disease / abnormalities',
          'Age ≥ 65 years old',
          { consider: 'Virtual ED IF age is the ONLY concerning feature post injury (E.G. fall)' },
        ],
      },
      cervicalCollar: [
        { if: 'ANY spinal immobilization criteria met', then: 'Apply cervical collar' },
      ],
      selfExtrication: {
        rule: [
          { if: 'Patient meeting ALL following criteria', then: 'Consider self-extrication' },
        ],
        criteria: [
          'Conscious AND co-operative',
          'NOT intoxicated',
          'NOT prevented by injury',
          'NO neurological deficit OR changes',
        ],
        else: 'Extricate on board/AV',
      },
      spinalImmobilisation: {
        rule: [
          { if: 'ANY spinal immobilization criteria met', then: 'Spinal immobilisation' },
        ],
        doNot: ['NEVER independently restrain the patient\'s head to the stretcher'],
      },
      ondansetron: [
        { if: 'ANY spinal immobilization criteria met', then: 'Ondansetron, ODT' },
      ],
      dosing: [
        {
          drug: 'Ondansetron',
          indication: 'Ondansetron — ALL Prophylaxis for Spinal Immobilisation',
          demographic: '≥ 11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: '4 mg @ 20 mins — IF Required',
          max: '8 mg (total dose)',
        },
        {
          drug: 'Ondansetron',
          indication: 'Ondansetron — ALL Prophylaxis for Spinal Immobilisation',
          demographic: '5 to 11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: 'Nil',
          max: '4 mg (total dose)',
        },
        {
          drug: 'Ondansetron',
          indication: 'Ondansetron — ALL Prophylaxis for Spinal Immobilisation',
          demographic: '< 5 years old',
          route: 'ODT',
          initial: '2 mg',
          repeat: 'Nil',
          max: '2 mg (total dose)',
        },
      ],
    },
  },
  burns: {
    title: 'Burns',
    level: 'FR',
    category: 'trauma',
    summary: 'Burn assessment and management',
    content: {
      definition: [
        'A burn refers to damage to skin or other tissue primarily due to',
        'Thermal injury — E.G. heat / fire',
        'Electrical injury — E.G. lightning strikes, electrical grid injury',
        'Chemical injury — E.G. acids, industrial chemicals',
        'Radiation injury — E.G. industrial accidents',
      ],
      stop: {
        trigger: 'Safety',
        actions: [
          'Caution NOT to inhale smoke / substances present at scene',
          'Beware of injury from burnt clothing / chemical contamination',
          'Oxygen is flammable. Do NOT use oxygen near flames / sources of ignition',
        ],
      },
      recognition: {
        suspectAirwayBurnsIfAnyOfTheFollowing: [
          'Respiratory distress',
          'Sooty spit',
          'Facial / airway swelling',
          'Hypoxia (E.G. irritable, cyanotic)',
          'Burns to upper torso, neck or face',
          'Incident occurred in an enclosed space',
          'Singed facial hair (E.G. eyebrows / lashes, beard)',
        ],
        airwayBurns: 'Any airway burns MUST be treated as Time Critical, SitRep: Hatzolah dispatch + call ambulance',
        assess: ['Burns surface area'],
      },
      management: {
        airwayBurns: {
          rule: [
            { if: 'Airway burns', then: 'Time Critical' },
          ],
          actions: [
            'SitRep: Hatzolah dispatch — Call ambulance + confirm airway burns',
            'Treat as time critical',
          ],
        },
        oxygen: [
          { if: 'REGARDLESS of SpO2', then: 'Oxygen, NRB (10-15L O2)' },
        ],
        escalation: [
          {
            if: 'Partial thickness OR Full thickness',
            then: 'SitRep: Hatzolah dispatch + Call ambulance',
          },
        ],
        positioning: [
          { if: 'Burn location allows (E.G. hand)', then: 'Position: Elevate burn' },
        ],
        cooling: {
          action: 'Cool burn with CLEAN running water',
          duration: 'For 20 minutes — including any cooling prior to Hatzolah arrival',
          rule: [
            { if: 'Temperature drops < 35°C', then: 'Stop cooling early' },
          ],
          doNot: ['Do NOT use ice water / dam water', 'Do NOT continue cooling after 20 mins'],
        },
        warming: {
          action: 'Warm the patient',
          asRequired: ['Blanket patient', 'Warm environment (E.G. heaters)'],
          avoid: ['Patient shivering'],
        },
        analgesia: [
          { if: 'AS Required', then: 'Analgesia – As per Pain Relief (Non Cardiac)' },
        ],
        jewelleryAndClothing: [
          { if: 'UNLESS Stuck to skin', then: 'Remove jewellery / clothing from burn' },
        ],
        covering: {
          action: 'Cover burns with longitudinal clingwrap',
          detail: 'Apply loosely to allow for swelling',
        },
        hydration: [
          {
            if: 'Conscious + alert & Delay to hospital',
            then: 'Encourage patient to maintain hydration',
          },
        ],
      },
      furtherNotes: [
        'If running water is not available, cooling may be achieved by immersing the injury in CLEAN still water, using a spray bottle or applying moist towels',
        'AVOID dirty water (E.G. dam water) as using it increases risk of infection',
        'Aim to remove jewellery prior to swelling occurring (E.G. rings may become stuck)',
        'Advise all patients not being attended by Ambulance Victoria or VVED with minor superficial burns to see their GP',
      ],
    },
  },
  'wound-care': {
    title: 'Wound Care',
    level: 'FR',
    category: 'trauma',
    summary: 'Open wound assessment and management',
    content: {
      definition: [
        'A wound refers to a break in the continuity of the body',
        'Wounds may be closed or open, where the skin has been broken',
        'An open wound exposes the patient to risk of contamination and infection – This guideline is intended for the management of open wounds',
      ],
      stop: [
        {
          trigger: 'Safety',
          actions: ['Ensure PPE is worn and perform 5 moments of hand hygiene'],
        },
        {
          trigger: 'Uncontrolled haemorrhage',
          actions: ['Manage as per General Trauma Approach'],
        },
      ],
      recognition: {
        assessWoundFor: [
          'Type',
          'Dimensions',
          'Mechanism',
          'Contamination',
          'Patient risk factors',
          'Range of movement / sensation',
          'Time of injury',
          'Bleeding',
        ],
        suspectInfectionIfAnyOfTheFollowing: ['Pain', 'Swelling', 'Heat', 'Redness', 'Pus', 'Odour', 'Fever'],
      },
      woundTypeManagement: [
        {
          label: 'Abrasion',
          management: [
            'Gently clean with 0.9% sodium chloride',
            'Keep dry',
            'Leave open air unless actively bleeding OR deep',
            'Refer to GP for review within 24 hours',
          ],
        },
        {
          label: 'Mammal bites (including human bites)',
          management: [
            'Gently clean with 0.9% sodium chloride',
            'Leave open air unless actively bleeding',
            'Refer to ED / VVED / PPCC within 2 hours',
            'Antibiotics + Tetanus injections may be required',
          ],
        },
        {
          label: 'Avulsion',
          management: [
            'Gently clean with 0.9% sodium chloride',
            'Apply Melolin and bandage',
            'Refer to ED / VVED for further review',
          ],
        },
        {
          label: 'Cut / laceration (minor)',
          management: [
            'Gently clean with 0.9% sodium chloride',
            'Cover with low-absorbent dressing to prevent further trauma and absorb exudate',
            'E.G. Dry island dressing',
            'Refer to GP for review within 24 hours',
          ],
        },
        {
          label: 'Incision',
          management: [
            'IF contaminated: gently clean with 0.9% sodium chloride',
            'Cover with NAD plus dressing OR island dressing',
            'IF closure is required: refer to GP / PPCC / ED for review within 8 hours',
          ],
        },
        {
          label: 'Puncture',
          management: [
            'IF soiled: gently clean with 0.9% sodium chloride',
            'Keep dry',
            'Leave open OR apply dry dressing',
            'Refer to GP for review within 4 hours',
          ],
        },
        {
          label: 'Skin tear',
          management: [
            'Gently clean with 0.9% sodium chloride',
            'Carefully realign the skin flap (where possible) close to its original position',
            'Use supplied tweezers and / or gauze moistened with saline',
            'Apply Melolin plus bandage OR silicone dressing',
            'Refer to GP / PPCC / ED for review within 12 hours',
          ],
        },
      ],
      tetanusProneWounds: [
        { if: 'ANY wound other than a clean, minor cut', then: 'Treat as a tetanus prone wound' },
        {
          if: 'Tetanus status unknown OR ≥ 5 years',
          then: 'Tetanus injection is required within 24 hours',
        },
      ],
      disposition: {
        options: [
          {
            label: 'Refer to VVED / ED',
            criteria: [
              'Age < 6 OR ≥ 60',
              'Immunocompromised patient',
              'Diabetic',
              'Bleeding disorder',
              'Unable to re-align wound edges',
              'Soiled / foreign body in wound',
              'Vascular disease',
              'Wound to head, neck, face, hands OR genitals',
              'Chronic wound',
              'Deep wound',
              'Crush injury',
              'Injuries occurred while submerged or in marine environment',
              'Pain is unable to be controlled',
              'Potential nerve damage has occurred',
              'Signs of infection',
            ],
            action: 'Refer to VVED / ED if ANY of the following',
          },
        ],
      },
      suppliedDressings: {
        headers: ['Dressing', 'Product', 'Size'],
        rows: [
          ['Silicone foam', 'Biatain', '7.5 × 7.5 cm and 12.5 × 12.5 cm'],
          ['Adhesive wound tape', 'Steri-Strips', '6 × 100 mm strips'],
          ['Non adherent dressing', 'Melolin', '10 × 10 cm'],
        ],
      },
      furtherNotes: {
        woundHealing: 'Wound healing is optimised when the wound is cleansed to remove debris and devitalised tissue, kept moist, infection is prevented, and the wound has adequate blood supply.',
        primaryClosure: 'For a clean wound that requires closure (sutures/glue) review within 8 hours is recommended at a PPCC/ED',
        facialWounds: 'Wounds to the face may cause unwanted scarring - for cosmetic reasons refer to definitive care',
        woundAge: ['Fresh wound: Up to 8 hours since injury', 'Old wound: More than 8 hours since injury'],
        woundDepth: [
          'Superficial: Only the epidermis and upper dermis is involved',
          'Partial thickness: Skin loss has occurred down to the dermis',
          'Full thickness: Skin and subcutaneous tissue is involved',
          'Deep / complicated: Penetration has occurred into the natural cavities, an organ or tissue',
        ],
        woundType: [
          'Incision: Clean-edged wound from a sharp item e.g. a knife',
          'Laceration: Commonly jagged-edged wound caused by shearing forces such as impact with a blunt object',
          'Avulsion: Tearing away of skin from surfaces below',
          'Abrasion: Surface layer of skin has been rubbed off by friction',
          'Puncture: A narrow aperture wound which extends some distance into the tissues',
        ],
      },
    },
  },
  'alcohol-intoxication': {
    title: 'Alcohol Intoxication',
    level: 'FR',
    category: 'medical',
    summary: 'Assessment and management of alcohol intoxication',
    content: {
      definition: 'A disturbance in behaviour or mental function during or after alcohol consumption. Alcohol is a depressant that affects the CNS. Intoxication may lead to inhibition of behaviours, slurred speech, reduction in conscious state, HR and RR.',
      recognition: [
        'Recent ingestion of ethanol (alcohol)',
        'Differentials excluded',
        'No other acute medical conditions',
        'Patient is considered low risk (as per following criteria)',
      ],
      lowRiskCriteria: [
        'Has capacity to make their own decisions',
        'Able to ambulate',
        'Competent sober adult able to care for patient in a safe place',
        'NO red flag criteria met',
        'Patient is normothermic',
        'Exclusion of other differentials (AEIOUTIPS)',
      ],
      management: {
        steps: ['Remain with sober adult'],
        ifNecessary: [
          { if: 'Necessary', then: 'Manage as per Altered Conscious State (Acute)' },
          { if: 'Necessary', then: 'Manage as per Nausea / Vomiting' },
        ],
      },
      safetyNetting: [
        'Advise not to drink any more alcohol until recovered from symptoms',
        'Sleep on side, keep warm and remain in a low stimulus environment',
        'Avoid mobilising',
        'Maintain hydration and nutrition',
        'Take paracetamol for mild pain as required',
        'Have sober adult stay with the patient',
        'Call for ambulance if conscious state deteriorates, patient vomits when laying supine and does not clear their own airway, severe pain occurs, there is no improvement in conscious state over the next 2 to 4 hours',
      ],
      furtherNotes: [
        'This CPG is for 16 years and over',
        'Patients who do not fit the low-risk criteria (i.e. moderate and high Risk) will be escalated to Ambulance Victoria',
      ],
    },
  },
  'allergy-mild': {
    title: 'Allergy (Mild)',
    level: 'FR',
    category: 'medical',
    summary: 'Mild allergic reaction management (skin symptoms only)',
    content: {
      definition: 'For the purposes of this CPG a mild skin allergy is defined as allergic symptoms confined to the skin only (single body system). If multiple body systems are affected, then treat as per anaphylaxis',
      recognition: ['Hives OR welts', 'Itchy OR swollen eyes', 'Itchy skin', 'Mild swelling'],
      stop: {
        trigger: 'IF Meets RASH criteria',
        actions: ['Mx as per Anaphylaxis / Call ambulance'],
      },
      management: {
        medication: [
          { if: 'Appropriate', then: 'Cetirizine, Oral' },
        ],
        steps: ['Monitor for 30/60 for deterioration or improvement', 'Consider VVED'],
        safetyNetting: [
          'Leave in care of a responsible third party to observe with advice to seek help/call ambulance if patient deteriorates (e.g. develops SOB, ALOC, GIT upset)',
          'Advise patient to follow up with their GP regarding incident',
        ],
      },
      dosing: [
        {
          indication: 'Cetirizine — ALL Mild allergy',
          demographic: '≥ 11 years old',
          route: 'Oral',
          initial: '10 mg',
          repeat: 'Nil',
          max: '10 mg (total dose)',
        },
      ],
    },
  },
  hypoglycaemia: {
    title: 'Hypoglycaemia',
    level: 'FR',
    category: 'medical',
    summary: 'Low blood glucose level management',
    content: {
      definition: {
        overview: 'Hypoglycaemia is a condition characterised by low blood sugar levels',
        someCausesInclude: [
          'Insulin / oral hypoglycaemic meds overdose',
          'Skipped meals / fasting / starvation',
          'Excessive physical activity',
          'Excessive alcohol consumption',
          'Certain illnesses (E.G. sepsis)',
        ],
        someSymptomsMayInclude: [
          'Altered conscious state / confusion',
          'Irritability / abnormal behaviour',
          'Sweaty / pale skin',
          'Nausea / vomiting',
          'Slurred speech / difficulty speaking',
          'Headache / blurred vision',
          'Shakiness / tremors',
          'Seizures',
        ],
      },
      recognition: 'Use this guideline IF Blood Glucose Level (BGL) < 4 mmol/L',
      immediateAction: [
        { if: 'Not responding', then: 'Call for Ambulance / 000' },
      ],
      management: {
        medication: [
          { if: 'Responding & Can swallow', then: 'Glucose Paste, Oral' },
          { if: 'NOT responding OR Can\'t swallow', then: 'Glucagon, IM' },
        ],
        doNot: [
          'Never administer oral medications to patients that are in an altered conscious state',
          'Only accredited responders may administer Glucagon',
        ],
        recheckBgl: {
          timing: 'Recheck BGL: After 5 minutes',
          rules: [
            { if: 'Symptoms continue & BGL ≥ 4', then: 'Consider other causes (AEIOUTIPS)' },
          ],
        },
        oralCarbohydrates: {
          rules: [
            { if: 'Can swallow safely', then: 'Advise: Eat long lasting carbohydrates' },
          ],
          notes: ['Within 20 minutes – E.G. Sandwich, fruit, glass of milk'],
        },
      },
      stop: {
        trigger: 'Escalation of care — IF No improvement',
        actions: ['Call for Ambulance / 000'],
      },
      referToGp: {
        referPatientToGpIfAllOfTheFollowingCriteriaAreMet: [
          'GCS has fully returned to the patient\'s normal baseline',
          'Patient declining ambulance',
          'Patient has a known pre-existing diagnosis of diabetes',
          'Only oral glucose was required to correct BGLs',
          'There was a known cause of this episode of hypoglycaemia (e.g. forgot to eat dinner)',
          'No injury or seizure has occurred',
          'Patient willing and able to eat long lasting carbohydrates',
          'Patient is NOT pregnant',
          'There are NONE of the following risks for prolonged or recurrent hypoglycaemia:',
          'The patient can be monitored by a responsible adult for at least 4 hours',
        ],
        risksForProlongedOrRecurrentHypoglycaemia: [
          'Unwitnessed onset / prolonged episode',
          'Patient on oral hypoglycaemic medication',
          'Overdose on medication (either accidental or intentional)',
          'Suspected cause of hypoglycaemia requires further investigation (e.g. infection)',
        ],
      },
      dosing: [
        {
          drug: 'Glucose Paste',
          indication: 'Glucose Paste — IF BGL < 4',
          demographic: 'All ages & Responding & Can swallow safely',
          route: 'Oral',
          initial: '15 g',
          repeat: 'Nil',
          max: '15 g (total dose)',
        },
        {
          drug: 'Glucagon',
          indication: 'Glucagon — IF BGL < 4',
          demographic: '≥ 8 years old & NOT responding OR CAN\'T swallow safely',
          route: 'IM',
          initial: '1 mg',
          repeat: 'Nil',
          max: '1 mg (total dose)',
        },
        {
          drug: 'Glucagon',
          indication: 'Glucagon — IF BGL < 4',
          demographic: '< 8 years old & NOT responding OR CAN\'T swallow safely',
          route: 'IM',
          initial: '0.5 mg',
          repeat: 'Nil',
          max: '0.5 mg (total dose)',
        },
      ],
      furtherNotes: {
        sceneSafety: 'Severe hypoglycaemia may cause some patients to act aggressively, consider scene safety',
        bglShouldBeMeasuredInPatientsWithAnyOfTheFollowing: ['Altered consciousness', 'History of diabetes', 'Undifferentiated acute medical illness'],
        notes: ['The patient may become hypoglycaemic once more if the underlying cause is not addressed'],
      },
    },
  },
  'infection-sepsis': {
    title: 'Infection / Sepsis',
    level: 'FR',
    category: 'medical',
    summary: 'Infection recognition and sepsis management',
    content: {
      definition: [
        'Infection refers to the body becoming invaded by harmful microorganisms. These microorganisms multiply, cause damage to the body tissue and trigger an immune response which itself may become detrimental to the body.',
        'Sepsis is a life-threatening condition that occurs when the body\'s own response to an infection injures its own tissues and organs. Sepsis can lead to shock, multiple organ failure and death.',
        'In some circumstances – if managed incorrectly – infections may spread between people. For this reason, certain precautions and Personal Protective Equipment (PPE) must be maintained by Hatzolah staff to ensure patient and staff safety.',
      ],
      recognition: [
        'Fever — E.G. Temperature ≥ 37.5°C',
        'Hot and cold flushes',
        'Myalgia — E.G. Generalised muscle pain',
        'Malaise — I.E. General feeling of being unwell',
        'Fatigue',
      ],
      commonSourcesOfInfections: [
        {
          letter: 'S',
          meaning: 'Surgery / Hospital acquired — E.G. Recent surgery / stay in hospital',
        },
        { letter: 'U', meaning: 'Urinary — E.G. Painful / discoloured / malodorous urination' },
        { letter: 'N', meaning: 'Neurological — E.G. Headache, neck stiffness, photophobia' },
        { letter: 'W', meaning: 'Wounds — E.G. Lacerations, pressure ulcers, cellulitis' },
        {
          letter: 'A',
          meaning: 'Abdominal (I.E. Gastrointestinal) — E.G. Nausea, vomiting, diarrhoea, abdo. cramping',
        },
        {
          letter: 'R',
          meaning: 'Respiratory — E.G. SOB, coughing, sneezing, sore throat, rhinitis',
        },
        { letter: 'D', meaning: 'Device — E.G. Pacemakers, insulin pumps, urinary catheters' },
      ],
      sirsCriteria: {
        meetsCriteriaIf: [
          'You suspect they may have an infection',
          'AND they have 2 or more of the following abnormal vital signs',
        ],
        abnormalVitalSigns: [
          'Respiratory rate 20 BPM',
          'Heart rate ≥ 90 BPM',
          'Systolic blood pressure < 100 mm Hg',
          'Temperature ≥ 38°C',
          'Temperature < 36°C',
        ],
      },
      stop: {
        trigger: 'IF Meeting Red Flag vital signs',
        actions: ['Call for Ambulance / 000'],
      },
      management: [
        { if: 'Meeting SIRS criteria', then: 'Use VVED as minimum' },
        { if: 'Immunocompromised', then: 'Use VVED as minimum' },
        { if: 'None of the above', then: 'Refer to GP as minimum' },
      ],
      infectionPreventionAndControl: {
        standardPrecautions: {
          whenToUse: 'Must be used with all patients',
          includes: [
            'Hand hygiene',
            'Respiratory hygiene (I.E. covering mouth when sneezing and cleaning hands afterwards)',
            'Safe use and disposal of sharps (E.G. needles)',
            'Appropriate cleaning of reusable equipment between patients',
            'Routine environmental cleaning (E.G. cleaning / disinfecting stretchers, etc)',
            'Appropriate handling of linen',
            'Appropriate waste management',
          ],
        },
        contactPrecautions: {
          whenToUse: 'Must be used in addition to standard precautions whenever there is a risk of direct or indirect contact transmission of pathogenic microorganisms (E.G. possible contact with body fluid OR patients with known / possible contact transmissible disease)',
          includes: [
            'Gloves',
            'Gown / apron – if splash is likely',
            'Eye protection (I.E. safety goggles) – if splash is likely',
            'Fluid resistant mask – if splash is likely',
            'Appropriate distancing to avoid splash contamination',
            'Ensure infected areas of the patient\'s body are appropriately contained and covered',
            'Communication of patient\'s infectious status to other health providers',
          ],
        },
        dropletAndAirbornePrecautions: {
          whenToUse: 'Must be used in addition to standard precautions with all patients meeting ANY of the following criteria',
          criteria: [
            'Sneezing / coughing',
            'Vomiting',
            'Known / suspected to have a droplet OR airborne transmissible disease regardless of their current symptoms (as such diseases can be spread simply by talking or breathing)',
          ],
          includes: [
            'Staff immunisations',
            'P2 / N95 facemask / filtering respiratory',
            'Patient must wear a mask covering both their mouth and nose – and leave it on',
            'Patient to practice respiratory hygiene (I.E. covering mouth when sneezing and cleaning hands afterwards)',
            'Eye protection (I.E. safety goggles)',
            'Appropriate distancing from other patients',
            'Appropriate distancing from medical providers whenever possible',
            'Extra cleaning of equipment and environment after patient use',
          ],
        },
      },
    },
  },
  'nausea-vomiting': {
    title: 'Nausea / Vomiting',
    level: 'FR',
    category: 'medical',
    summary: 'Anti-emetic management',
    content: {
      recognition: [
        'Use this guideline for patients meeting either of the following criteria',
        'Nausea / vomiting that is NOT being tolerated',
        'OR Prophylactically for spinally immobilised patients',
      ],
      stop: {
        trigger: 'IF Altered conscious',
        actions: ['Position: Recovery position / laterally'],
      },
      management: [
        { if: 'Alert', then: 'Ondansetron, ODT' },
        { if: 'Vomiting persists', then: 'Consult/Escalate care' },
      ],
      dosing: [
        {
          drug: 'Ondansetron',
          indication: 'Ondansetron — ALL Non-tolerated Nausea / Vomiting',
          demographic: '↑ 11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: 'IF Required — 4 mg @ 20 mins',
          max: '8 mg (total dose)',
        },
        {
          drug: 'Ondansetron',
          indication: 'Ondansetron — ALL Non-tolerated Nausea / Vomiting',
          demographic: '5 to 11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: 'Nil',
          max: '4 mg (total dose)',
        },
        {
          drug: 'Ondansetron',
          indication: 'Ondansetron — ALL Non-tolerated Nausea / Vomiting',
          demographic: '↓ 5 years old',
          route: 'ODT',
          initial: '2 mg',
          repeat: 'Nil',
          max: '2 mg (total dose)',
        },
      ],
      furtherNotes: [
        'Maintain spinal immobilisation when placing potential spinal patients in lateral position',
        'ALL patients receiving ondansetron must have a VVED consult attended as a minimum if not being transported by ambulance to hospital.',
      ],
    },
  },
  'pain-relief': {
    title: 'Pain Relief (Non-Cardiac)',
    level: 'FR',
    category: 'medical',
    summary: 'Non-cardiac pain assessment and management',
    content: {
      recognition: {
        painScore: 'Pain score ≥ 0 out of 10',
        dolors: [
          { letter: 'D', meaning: 'Description of the pain?' },
          { letter: 'O', meaning: 'Onset time of the pain?' },
          { letter: 'L', meaning: 'Location of the pain?' },
          { letter: 'O', meaning: 'Other symptoms associated with the pain?' },
          {
            letter: 'R',
            meaning: 'Relief from the pain? (E.G. Positional relief, home medications already tried)',
          },
          { letter: 'S', meaning: 'Severity / Pain score?' },
        ],
      },
      management: {
        nonPharmacological: {
          rules: [
            { if: 'Appropriate', then: 'Non-pharmacological management' },
          ],
          measures: ['Positioning', 'Splinting', 'Ice pack'],
        },
        assess: ['Medication allergies'],
        medication: [
          { if: 'Pain score ≥ 0', then: 'Paracetamol, Oral' },
          { if: 'Pain score ≥ 3', then: 'Methoxyflurane, Inhaled' },
        ],
        escalation: [
          { if: 'Pain uncontrolled', then: 'Consult: Clinician' },
        ],
      },
      dosing: [
        {
          drug: 'Paracetamol',
          indication: 'Paracetamol — IF Non-tolerated Pain score ≥ 0',
          demographic: '≥ 60 years old OR < 60 kgs OR Frail',
          route: 'Oral tablet',
          initial: '500 mg (1 tablet)',
          repeat: 'IF Required — 500 mg @ 4 hours',
          max: '4 doses in 24 hours',
        },
        {
          drug: 'Paracetamol',
          indication: 'Paracetamol — IF Non-tolerated Pain score ≥ 0',
          demographic: '16 to 60 years old & ≥ 60 kgs & NOT frail',
          route: 'Oral tablet',
          initial: '1000 mg (2 tablets)',
          repeat: 'IF Required — 1000 mg @ 4 hours',
          max: '4 doses in 24 hours',
        },
        {
          drug: 'Paracetamol',
          indication: 'Paracetamol — IF Non-tolerated Pain score ≥ 0',
          demographic: '12 to 15 years old',
          route: 'Oral tablet',
          initial: '500 mg (1 tablet)',
          repeat: 'IF Required — 500 mg @ 4 hours',
          max: '4 doses in 24 hours',
        },
        {
          drug: 'Paracetamol',
          indication: 'Paracetamol — IF Non-tolerated Pain score ≥ 0',
          demographic: '< 12 years old',
          route: 'Oral liquid',
          initial: '15 mg x kg',
          confirm: 'Confirm the following doses with the label on the bottle prior to administration!',
          repeat: 'IF Required — 15 mg x kg @ 4 hours',
          max: '4 doses in 24 hours',
          weightTable: [
            { weight: '36 kg', age: '11 years old (approx.)', dose: '540 mg', volume: '23 mL' },
            { weight: '33 kg', age: '10 years old (approx.)', dose: '495 mg', volume: '21 mL' },
            { weight: '26 kg', age: '9 years old (approx.)', dose: '390 mg', volume: '16 mL' },
            { weight: '24 kg', age: '8 years old (approx.)', dose: '360 mg', volume: '15 mL' },
            { weight: '22 kg', age: '7 years old (approx.)', dose: '330 mg', volume: '14 mL' },
            { weight: '20 kg', age: '6 years old (approx.)', dose: '300 mg', volume: '13 mL' },
            { weight: '18 kg', age: '5 years old (approx.)', dose: '270 mg', volume: '11 mL' },
            { weight: '16 kg', age: '4 years old (approx.)', dose: '240 mg', volume: '10 mL' },
            { weight: '14 kg', age: '3 years old (approx.)', dose: '210 mg', volume: '9 mL' },
            { weight: '12 kg', age: '2 years old (approx.)', dose: '180 mg', volume: '8 mL' },
            { weight: '10 kg', age: '1 year old (approx.)', dose: '150 mg', volume: '6 mL' },
            { weight: '8 kg', age: '6 months old (approx.)', dose: '120 mg', volume: '5 mL' },
            { weight: '6 kg', age: '3 months old (approx.)', dose: '90 mg', volume: '4 mL' },
          ],
        },
        {
          drug: 'Methoxyflurane',
          indication: 'Methoxyflurane — IF Pain score ≥ 3',
          demographic: 'All ages',
          route: 'Inhaled whistle',
          initial: '3 mL',
          repeat: '3 mL PRN — 3 mL typically lasts for 25 minutes continuous use',
          max: '6 mL in 24 hours',
        },
      ],
      notes: [
        'Paracetamol, oral liquid (< 12 years old) — Confirm the following doses with the label on the bottle prior to administration!',
      ],
    },
  },
  seizure: {
    title: 'Seizure',
    level: 'FR',
    category: 'neuro',
    summary: 'Seizure management including GCSE',
    content: {
      definition: 'Sudden, uncontrolled electrical disturbance in the brain which can cause changes in behaviour, movements, feelings and consciousness',
      recognition: {
        overview: 'Seizures can present due to a wide variety of causes and with a wide variety of symptoms. Differentiating between types and causes of seizures in the pre-hospital environment can be difficult. When in doubt it is prudent to err on the side of caution and treat likely seizure activity with this guideline.',
        midazolamMayOnlyBeAdministeredByAccreditedRespondersWhenOneOfTheTwoFollowingCriteriaAreMet: 'Midazolam is indicated for patients with Generalised Convulsive Status Epilepticus (GCSE) characterised by ongoing generalized tonic-clonic movements & altered conscious state that has either:',
        criteria: [
          'Lasted 5 or more minutes',
          'OR presented as multiple seizures without full recovery of conscious state in between',
        ],
      },
      immediateAction: {
        airway: [
          { if: 'Soiled airways', then: 'Suction airways' },
        ],
        breathingIneffectively: {
          condition: 'IF Breathing ineffectively',
          oxygen: 'Oxygen, BVM (8-15L O2)',
          ventilationRates: {
            headers: ['Age', 'Ventilate once every', 'OR'],
            rows: [
              ['> 15 years old', '5 seconds', '12x p/min'],
              ['12 - 15 years old', '3 - 4 seconds', '14 - 26x p/min'],
              ['5 - 11 years old', '2 - 3 seconds', '16 - 34x p/min'],
              ['1 - 4 years old', '2 - 3 seconds', '20 - 40x p/min'],
              ['< 1 year old', '2 seconds', '25 - 55x p/min'],
            ],
          },
        },
        breathingAdequately: {
          condition: 'IF Breathing adequately',
          oxygen: 'Oxygen, NRB (10 - 15L O2)',
          titration: [
            { if: 'ONLY IF Adequate perfusion', then: 'Titrate down to SpO2 92 - 96%' },
          ],
        },
      },
      management: [
        'SitRep: Hatzolah dispatch + call ambulance',
        'Protect patient from injury',
        'IF Risk of injury — Pillow / pad head',
        'Do NOT forcibly restrict the patient’s body from convulsing',
        'IF Available (E.G. prescribed medications) — Assist carer(s) to administer seizure plan',
        'IF Meeting GCSE criteria * — Midazolam, IM',
        'Only accredited responders may administer Midazolam',
        'Carefully monitor respiratory status',
      ],
      dosing: [
        {
          indication: 'Midazolam — IF GCSE ≥ 5 mins OR Multiple GCSE *',
          demographic: '≥ 15 years old & (Elderly / Frail OR < 60 kgs)',
          route: 'IM',
          initial: '5 mg',
          repeat: '5 mg @ 5 mins IF required',
          max: '10 mg (total dose)',
        },
        {
          indication: 'Midazolam — IF GCSE ≥ 5 mins OR Multiple GCSE *',
          demographic: '≥ 15 years old & NOT Elderly / Frail & ≥ 60 kgs',
          route: 'IM',
          initial: '10 mg',
          repeat: '10 mg @ 10 mins IF required',
          max: '20 mg (total dose)',
        },
      ],
      furtherNotes: [
        '* Multiple GCSE refers to multiple tonic clonic seizures occurring WITHOUT full recovery to the patient’s normal baseline in between seizures',
      ],
    },
  },
  stroke: {
    title: 'Stroke (Acute)',
    level: 'FR',
    category: 'neuro',
    summary: 'Acute stroke recognition and emergency management',
    content: {
      definition: 'A stroke occurs when there is either a blockage to the blood supply of part of the brain OR when a blood vessel in the brain bursts. In either case brain cells are deprived of oxygen and nutrients rapidly leading to potentially irreversible brain damage or death.',
      recognition: {
        whenToSuspect: 'An acute stroke should be suspected when ANY of the following signs and symptoms occur',
        signsAndSymptoms: [
          {
            letter: 'F',
            meaning: 'Facial droop — E.G. One side of the face doesn\'t move as well as the other — Assess by asking patient to smile or show their teeth',
          },
          {
            letter: 'A',
            meaning: 'Arm / Limb weakness — E.G. One sided limb weakness OR arm drift — Assess by asking patient to hold their arms straight for 10s & squeeze your fingers',
          },
          {
            letter: 'S',
            meaning: 'Speech deficit — E.G. Slurs words, says incorrect words OR is unable to speak — Assess by asking patient to repeat "you can\'t teach an old dog new tricks"',
          },
        ],
        andBothOfTheFollowing: [
          'These signs and symptoms have existed for < 24 hours',
          'Blood Glucose Level (BGL) is normal (I.E. ≥ 4 mmol/L)',
        ],
      },
      strokeHistory: [
        'What time were these stroke symptoms first noticed? (As precisely as possible)',
        'When was the patient last known / seen to be well? (I.E. stroke symptom free)',
        'Have any of these symptoms occurred previously in the past? If yes - What caused them?',
        'Have they had a stroke before?',
        'Are they currently drug or alcohol affected?',
      ],
      stop: {
        trigger: 'IF Unconscious',
        actions: ['Manage per unconscious patient guideline'],
      },
      management: {
        initial: ['Treat as time critical'],
        oxygen: [
          { if: 'ONLY IF SpO2 < 92%', then: 'Oxygen, PRN' },
        ],
        bloodGlucose: ['Assess: BGL'],
        hypoglycaemia: [
          { if: 'BGL < 4', then: 'Manage hypoglycaemia then revaluate for stroke' },
        ],
        ongoing: [
          'Support all limbs',
          'SitRep: Hatzolah dispatch + call ambulance',
          'REGARDLESS Of severity / improvement — SitRep: Hatzolah dispatch + call ambulance',
        ],
      },
      furtherNotes: {
        symptomsThatMayBeCausedByStrokeAndShouldPromptAStrokeAssessment: [
          'Headache (severe / sudden onset)',
          'Vertigo (I.E. dizziness, nausea, vomiting)',
          'Hypertension (severe / sudden onset)',
          'Impaired gait (sudden onset)',
          'Altered conscious state',
        ],
        somePossibleStrokeMimics: [
          'Drug / alcohol intoxication',
          'Seizure / Postictal phase (post seizure)',
          'Middle ear disorder / Vertigo',
          'Brain tumour',
          'Migraine',
          'Syncope (I.E. fainting)',
        ],
        notes: [
          'In cases where a patient wakes up with stroke symptoms the time of onset is taken from when the patient was last seen well and NOT from the time of awakening',
          'Stroke symptoms can sometimes fluctuate / be intermittent – for this reason all potential stroke patients should be transported to hospital regardless of symptom improvement OR resolution',
        ],
      },
    },
  },
  dehydration: {
    title: 'Dehydration',
    level: 'FR',
    category: 'medical',
    summary: 'Dehydration assessment and fluid management',
    content: {
      definition: 'Dehydration refers to a detrimental reduction of the amount of water in the body',
      recognition: [
        'Less than adequate perfusion as per the Perfusion Status Assessment.',
        'The patient is considered to have less than adequate (< Adequate) perfusion IF 2 or more of the below criteria are outside of the Adequate criteria',
      ],
      criteria: {
        headers: ['', 'Skin', 'Pulse', 'sBP', 'Conscious State'],
        rows: [
          ['Adequate', 'Warm, Pink, Dry', '60 to 100', '≥ 100 sBP', 'Alert & Orientated'],
          ['< Adequate', 'Cool, Pale, Clammy', '< 50 OR ≥ 100', '< 100 sBP', 'Alert OR Altered'],
          ['No Perfusion', 'Cool, Pale, Clammy', 'No pulse', 'Unable to record', 'Unconscious'],
        ],
      },
      ageScope: 'Pulse and sBP in this table specifically refer to ≥ 15 year olds only',
      symptoms: [
        { letter: 'S', meaning: 'Poor Skin turgor' },
        { letter: 'T', meaning: 'Postural Tachycardia & hypotension' },
        { letter: 'A', meaning: 'Altered conscious state / fatigue' },
        { letter: 'D', meaning: 'Postural Dizziness' },
        { letter: 'I', meaning: 'Poor fluid Intake of fluid vs fluid loss' },
        { letter: 'U', meaning: 'Decreased Urination' },
        { letter: 'M', meaning: 'Dry Mouth & tongue' },
        { letter: 'S', meaning: 'Decreased Sweating' },
      ],
      causes: [
        'Hot weather',
        'Hyperglycaemia',
        'Self-neglect',
        'Significant vomiting / sweating',
        'Psychostimulant overdose',
        'Insufficient social support',
      ],
      management: [
        { if: 'Able to tolerate oral fluids', then: 'Encourage patient to drink water' },
        { if: '< Adequate PSA due to dehydration', then: 'Call for Ambulance / 000' },
        {
          if: '< Adequate PSA due to dehydration & Unable to tolerate oral fluids',
          then: 'Gain IV access — Normal Saline, IV',
        },
      ],
      dosing: [
        {
          drug: 'Normal Saline',
          indication: '< Adequate PSA due to Dehydration',
          demographic: '≥ 15 years old & Elderly OR Renal OR Heart failure',
          route: 'IV',
          initial: '500 mL (titrate to response)',
          repeat: 'Nil',
          max: '500 mL',
        },
        {
          drug: 'Normal Saline',
          indication: '< Adequate PSA due to Dehydration',
          demographic: '≥ 15 years old & NOT elderly / NO renal OR heart failure',
          route: 'IV',
          initial: '1000 mL (titrate to response)',
          repeat: 'Nil',
          max: '1000 mL',
        },
      ],
      notes: [
        'IV access and IV therapy may only be performed by accredited responders',
        'Administer lower doses to patients that are elderly OR have renal OR heart failure',
      ],
    },
  },
  falls: {
    title: 'Falls',
    level: 'FR',
    category: 'trauma',
    summary: 'Adult who has fallen < 1 meter and is alert on Hatzolah arrival',
    content: {
      recognition: 'This guideline is intended for any ADULT patient that has a fall of < 1 meter & is alert on Hatzolah arrival',
      assessment: {
        causeOfFall: {
          headers: ['Ask', 'Detail'],
          rows: [
            ['Did anyone witness / overhear the fall?', ''],
            ['Does the patient recall the fall?', ''],
            ['Why did the patient fall?', 'E.G. Trip, fainted, chronic weakness, unknown'],
            [
              'Were there symptoms prior to falling?',
              'E.G. Chest pain, stroke, breathing difficulties',
            ],
          ],
        },
        mechanismOfFall: {
          headers: ['Ask', 'Detail'],
          rows: [
            ['When did they fall?', ''],
            ['Position they fell from?', 'E.G. Standing, seated, leaning against a wall'],
            ['Any attempt to control the fall?', 'E.G. Outstretched hands, lowered down by family'],
            ['What surface did they fall onto?', 'E.G. Carpet, tiles, concrete, bed'],
            ['Objects struck during fall?', 'E.G. Chest strike on corner of coffee table'],
            ['Was there a head strike?', 'If yes – against what?'],
            ['Was there a loss of consciousness?', 'If so – how long for?'],
          ],
        },
        ecg: [
          { if: 'Accredited to do so', then: '12 Lead ECG' },
        ],
      },
      headInjury: {
        rule: [
          { if: 'Potential head strike', then: 'Assess: Head injury' },
        ],
        signs: {
          headers: ['IF ANY of the following signs', 'Disposition'],
          rows: [
            ['GCS < 13', 'Hospital transport'],
            ['Penetrating head injury', 'Hospital transport'],
            ['LOC ≥ 5 minutes', 'Hospital transport'],
            ['Skull fracture', 'Hospital transport'],
            ['Bleeding from ear / nose', 'Hospital transport'],
            ['CSF from ear / nose', 'Hospital transport'],
            ['Bruising around eye', 'Hospital transport'],
            ['Bruising to head behind the ear', 'Hospital transport'],
            ['Multiple vomits since injury', 'Hospital transport'],
            ['Seizure activity', 'Hospital transport'],
            ['Amnesia lasting ≥ 30 minutes', 'Hospital transport'],
            ['Worsening signs and symptoms', 'Hospital transport'],
            ['LOC < 5 minutes', 'Virtual ED'],
            ['Amnesia lasting < 30 minutes', 'Virtual ED'],
          ],
        },
      },
      immediateAction: [
        { if: 'Required (Refer to spinal trauma)', then: 'Spinal immobilisation' },
      ],
      spinalInjury: {
        rule: [
          { if: 'Uncontrolled fall', then: 'Assess: Spinal injury' },
          { if: 'ANY signs of spinal injury', then: 'Hospital transport' },
        ],
        signs: {
          headers: ['Sign', 'How to assess'],
          rows: [
            ['Sensory deficits: General', 'Ask: Any numb, tingle, burn OR altered sensation'],
            ['Sensory deficits: Arms', 'Assess: Light touch across palm & back of hand'],
            ['Sensory deficits: Legs', 'Assess: Light touch lateral side of calcaneus'],
            ['Motor deficits: Arms', 'Assess: Ability to grasp, pull & push'],
            ['Motor deficits: Legs', 'Assess: Ability to plantar flex, dorsiflex & leg raise'],
            ['Midline tenderness on palpation', 'Assess: Full length of spine'],
            ['Can’t rotate neck 45° left & right', 'E.G. Causes pain'],
            ['History of spinal abnormality', 'E.G. Disease, surgery, known weakness OR injury'],
          ],
        },
      },
      chestInjury: {
        rule: [
          { if: 'ANY of the following signs', then: 'Hospital transport' },
        ],
        signs: [
          'Difficult OR painful breathing',
          'Unequal rise and fall of chest',
          'Unequal breath sounds',
        ],
      },
      abdominalInjury: {
        rule: [
          { if: 'ANY of the following signs', then: 'Hospital transport' },
        ],
        signs: ['Abdominal pain', 'Blood in urine / vomit / stools'],
      },
      neckOfFemurInjury: {
        rule: [
          { if: 'ANY of the following signs', then: 'Hospital transport' },
        ],
        signs: ['Leg shortening OR rotation', 'Hip pain on ambulation'],
      },
      otherInjury: {
        woundCare: {
          rule: [
            { if: 'ANY injury requiring wound care', then: 'Hospital OR Private transport to PPCC' },
          ],
          signs: ['Stitches', 'Staples', 'Glue', 'Advanced dressings', 'Tetanus vaccine'],
        },
        significantInjury: {
          rule: [
            { if: 'ANY signs of significant injury', then: 'Hospital transport' },
          ],
          signs: ['Severe pain', 'Fracture', 'Dislocation'],
        },
      },
      abnormalVitalSigns: {
        headers: ['IF ANY of the following signs', 'Qualifier', 'Disposition'],
        rows: [
          ['GCS < 13', 'UNLESS Normal for patient', 'Hospital transport'],
          ['sBP < 90', '', 'Hospital transport'],
          ['HR ≥ 120', '', 'Hospital transport'],
          ['HR < 50', '', 'Hospital transport'],
          ['SpO2 < 90%', 'UNLESS Chronic hypoxaemia', 'Hospital transport'],
          ['RR ≥ 30', '', 'Hospital transport'],
          ['BGL < 4 despite management', '', 'Hospital transport'],
          ['GCS < 15', 'REGARDLESS whether or not normal for patient', 'Virtual ED'],
          ['sBP < 100', '', 'Virtual ED'],
          ['HR ≥ 100 at rest', '', 'Virtual ED'],
          ['SpO2 < 92%', '', 'Virtual ED'],
          ['RR ≥ 22 at rest', '', 'Virtual ED'],
          ['Temperature ≥ 38°C', '', 'Virtual ED'],
        ],
      },
      confirmCauseOfFall: {
        headers: ['AEIOU TIPS', 'Cause', 'Disposition'],
        rows: [
          ['A', 'Arrhythmia / Cardiac (E.G. STEMI)', 'Hospital transport'],
          ['E', 'Epilepsy / Seizure', 'Hospital transport'],
          ['I', 'Insulin (I.E. corrected low BGL)', 'Virtual ED'],
          ['I', 'Intoxication inhibiting assessment', 'Hospital transport'],
          ['O', 'Overdose (E.G. deliberate OD)', 'Hospital transport'],
          ['U', 'Underdose', 'Virtual ED'],
          ['U', 'Urinary Tract Infection (UTI)', 'Virtual ED'],
          ['T', 'Trip / Mechanical fall', 'Home care'],
          ['I', 'Infection', 'Virtual ED'],
          ['P', 'Pharmacological (Accidental OD)', 'Virtual ED'],
          ['P', 'Postural changes', 'Virtual ED'],
          ['S', 'Stroke / TIA', 'Hospital transport'],
        ],
      },
      highRiskSyncopeOrFaint: {
        rule: [
          { if: 'Fall was caused by syncope / faint', then: 'Assess: High risk syncope / faint' },
          { if: 'ANY high risk syncope symptoms', then: 'Hospital transport' },
        ],
        signs: {
          headers: ['Symptom', 'Disposition'],
          rows: [
            ['Nil symptoms prior to fall', 'Hospital transport'],
            ['Associated with palpitations', 'Hospital transport'],
            ['Cardiac device (E.G. Pacemaker)', 'Hospital transport'],
            ['Chest pain', 'Hospital transport'],
            ['Exertional onset', 'Hospital transport'],
            ['Occurred while seated / supine', 'Hospital transport'],
            ['Family history of young sudden cardiac death (< 50 years)', 'Hospital transport'],
            ['Ischemic OR structural heart disease', 'Hospital transport'],
            ['Known 2nd° / 3rd° AV block', 'Hospital transport'],
            ['Known SVT / paroxysmal AF', 'Hospital transport'],
            ['Known pre-excited QRS’s', 'Hospital transport'],
            ['ANY other syncope / faint', 'Virtual ED + forward 12 Lead ECG (if available)'],
          ],
        },
      },
      riskOfFallingAgain: {
        rule: [
          { if: 'Pt likely to re-fall within 24 hours', then: 'Hospital transport' },
        ],
        factors: {
          headers: ['Factor', 'Detail'],
          rows: [
            ['History of frequent falls', ''],
            ['Poor balance', ''],
            ['Postural changes', 'E.G. Dizziness / difficulty breathing on standing'],
            ['Significant trip hazards', ''],
          ],
        },
      },
      abilityToMeetCareNeeds: {
        rule: [
          { if: 'Unable to be cared for at home', then: 'Hospital transport' },
        ],
        questions: ['Can they access the toilet?', 'Can they access food / water?', 'Can they call for help?'],
      },
      highRiskFactors: {
        rule: [
          { if: 'ANY high-risk factors', then: 'Hospital transport' },
        ],
        factors: {
          headers: ['Factor', 'Qualifier'],
          rows: [
            ['No / poor recollection of event', 'UNLESS Normal for patient (E.G. dementia)'],
            ['Intoxication', 'Preventing assessment'],
            ['Blood in stools OR blood in vomit', ''],
            ['Acute decline in mobility', ''],
            ['Pregnancy', ''],
            ['Unable to walk (usually able to)', ''],
            ['Associated with chest pain', ''],
            ['Associated with abdominal pain', ''],
          ],
        },
      },
      moderateRiskFactors: {
        rule: [
          { if: 'ANY moderate risk factors', then: 'Virtual ED' },
        ],
        factors: {
          headers: ['Factor', 'Qualifier'],
          rows: [
            ['Poor recollection', 'BUT Normal for patient (E.G. dementia)'],
            ['65 years or older OR frailty', ''],
            ['Anticoagulants', 'E.G. Apixaban, dabigatran, rivaroxaban, warfarin'],
            ['Antiplatelets (other than aspirin)', 'E.G. Clopidogrel, ticagrelor, prasugrel'],
            ['History of coagulopathy', ''],
            ['Recent medication change', ''],
          ],
        },
      },
      referral: 'Refer patient to Hatzolah social worker',
      disposition: {
        options: [
          {
            label: 'Hospital transport',
            criteria: [
              'Recommend hospital transport IF patient meets ANY “Hospital Transport” criteria',
              'Call Ambulance Victoria if hospital transport is required',
            ],
          },
          {
            label: 'Virtual ED',
            criteria: [
              'Recommend Virtual ED IF patient meets ANY “Virtual ED” criteria & NO “Hospital Transport” criteria',
            ],
          },
          {
            label: 'Hospital OR Private transport to PPCC',
            criteria: [
              'ANY injury requiring wound care — stitches, staples, glue, advanced dressings, tetanus vaccine',
            ],
          },
          {
            label: 'Home care',
            criteria: [
              'Trip / Mechanical fall (AEIOU TIPS)',
              'All patients who are not attended to by ambulance or VVED must be advised to see their GP to discuss the fall and have a medical review',
            ],
          },
        ],
      },
      furtherNotes: [
        'Recommend hospital transport IF patient meets ANY “Hospital Transport” criteria',
        'Recommend Virtual ED IF patient meets ANY “Virtual ED” criteria & NO “Hospital Transport” criteria',
        'Call Ambulance Victoria if hospital transport is required',
        'An “uncontrolled fall” is one where the patients descent was NOT slowed (E.G. by being caught by a bystander who then gently lowered them to the floor)',
        'Hatzolah members are advised to escalate care if they have any further concerns',
        'A patient is considered intoxicated when they are inebriated to a point where they are unable to be accurate historians – in most cases this does not refer to the patient who has had a glass of wine with dinner',
        'All patients who are not attended to by ambulance or VVED, must be advised to see their GP to discuss the fall and have a medical review. Ensure the patient can mobilise as per their normal, is left with another person, has access to a phone, has access to the bathroom, food, water, and advised to call for help should they deteriorate or become concerned.',
      ],
    },
  },
  'birth-newborn': {
    title: 'Birth & Newborn Resuscitation',
    level: 'FR',
    category: 'obstetric',
    summary: 'Imminent birth, and resuscitation of the newborn',
    content: {
      stop: [
        {
          trigger: 'For ALL birthing emergencies',
          actions: ['SitRep: Hatzolah dispatch + call ambulance'],
        },
        {
          trigger: 'IF ANY of the following → Consult: Clinician + PIPER',
          actions: [
            'Presenting part of baby is anything other than their head (E.G. foot, buttocks, etc)',
            'Gestation < 37 weeks',
            'Significant complications during pregnancy',
            'History of previous complicated births',
            'PIPER phone number: 1300 137 650',
          ],
        },
      ],
      recognition: {
        signsOfImminentBirthMayInclude: [
          { letter: 'H', meaning: 'Huge uncontrollable urge to push' },
          {
            letter: 'U',
            meaning: 'Urination / defecation (from mother) or Urge to use bowels / bladder',
          },
          { letter: 'B', meaning: 'Baby partly in view (E.G. head, foot, buttocks, etc)' },
          {
            letter: 'C',
            meaning: 'Contractions becoming continuous / feeling like they’re running into each other',
          },
          { letter: 'A', meaning: 'Anal pouting' },
          { letter: 'P', meaning: 'Perineal bulging' },
          {
            letter: 'S',
            meaning: 'Stating: “The baby is coming!” / “I am going to have the baby!” (stated by mother)',
          },
        ],
      },
      preparation: [
        'Double glove',
        'Clean + warm environment (consider turning heaters on)',
        'Towels + blankets',
        'Obstetrics kit (including clamps + scissors)',
        'Stethoscope (within arm’s reach)',
        'Newborn BVM (connect tubing to oxygen tank but leave oxygen turned off to start with)',
        'Suction (ensure working and within arm’s reach)',
      ],
      obstetricHistoryImminentBirth: {
        currentPregnancy: [
          'Have you had any antenatal care? (E.G. midwife / doctor / ultrasound appointments etc.)',
          'Number of weeks gestation? (37+ weeks considered full term, 22+ weeks considered viable)',
          'Number of babies expected? (E.G. singleton, twins, triplets, etc)',
          'When did the contractions start? — How frequent are they? How long do they last?',
          'Have your membranes ruptured? What time? What colour? What quantity? Any strange smell?',
          'Any vaginal bleeding?',
          'Do you know what position your baby is in? (E.G. cephalic, breached)',
          'Has the baby been moving normally?',
          'Any complications with the pregnancy (E.G. gestational diabetes, pre-eclampsia, etc)',
        ],
        previousPregnancies: [
          'Number of times you have been pregnant? Number of children?',
          'Any complications with previous pregnancies or births? (E.G. c-section)',
          'Length of previous labours?',
        ],
      },
      birthHead: {
        steps: ['Gently place fingers on baby’s head', 'Assess: Strength of babies descent'],
        rules: [
          { if: 'Baby advancing slowly / steadily', then: 'Advise mother: PUSH with contractions' },
          { if: 'Baby advancing extremely quickly', then: 'Advise mother: PANT with contractions' },
          { if: 'Baby advancing extremely quickly', then: 'Apply gentle downward pressure on baby' },
        ],
        doNot: ['Do NOT hold baby back forcibly'],
        note: 'Note: Time of head birth',
      },
      umbilicalCordCheck: {
        doNot: ['Do NOT cut cord routinely - ONLY cut cord if advised below'],
        assess: 'Assess: If cord wrapped around baby’s neck',
        rules: [
          { if: 'Cord loose & Wrapped once', then: 'Slip cord over baby’s head' },
          { if: 'Cord tight OR Multiple wraps', then: 'Clamp and cut cord' },
        ],
        ifClampingAndCutting: [
          'Place 1st clamp 10cm from baby + 2nd clamp 15cm from baby (5cm from first clamp)',
          'Cut cord between the 2 clamps',
        ],
      },
      birthHeadRotation: [
        'With next contraction the baby’s head will turn to face one of the mother’s thighs (restitution)',
        'This indicates internal rotation of shoulders in preparation for birth of body',
      ],
      birthShouldersAndBody: {
        steps: [
          'May be passive or guided birth',
          'Hold babies head between hands',
          'Apply gentle downwards pressure to deliver top shoulder',
          'Apply gentle upwards pressure to deliver bottom shoulder',
          'Support the baby',
        ],
        note: 'Note: Time of baby birth',
        rules: [
          {
            if: 'Nil birth of body within 1 min of head',
            then: 'Consult: Clinician and immediately escalate care',
          },
        ],
      },
      newbornManagement: {
        allNewborns: ['Stimulate by drying with towel (30 seconds)', 'Maintain warmth (consider the following)'],
        maintainWarmth: ['Blankets / towels / bubble wrap', 'Skin to skin with parent', 'Hat', 'Heaters'],
        rules: [
          { if: 'Airway obstruction suspected (ONLY IF)', then: 'Suction: Mouth then Nose' },
        ],
        assess: [
          'Auscultate: Heart Rate — Normal is roughly 2 or more beats every 1 second',
          'Assess: Breathing',
        ],
      },
      immediateAction: {
        newbornResuscitation: 'IF HR < 100 OR Apnoea / Gasping',
        ventilate: [
          '💊 Room Air, Newborn BVM — Ventilate once every…',
          '1 - 1.5 seconds (40 - 60x p/min)',
          'Do NOT over inflate the lungs',
        ],
        reAssess: ['Re-Assess: Heart Rate every 30 seconds', 'And each time manage below as appropriate'],
      },
      disposition: {
        question: 'Re-Assess: Heart Rate every 30 seconds — and each time manage as appropriate',
        options: [
          {
            label: 'IF HR < 60',
            criteria: [
              'Call PIPER: 1300 137 650',
              '💊 O2, Newborn BVM (5L O2)',
              'Clamp + cut umbilical cord — Clamp 1 @ 10cm, Clamp 2 @ 15cm, Cut between clamps',
              'CPR @ 3:1 — 120 events p/min, 3 : 1 ratio',
            ],
          },
          {
            label: 'IF HR 60 - 100',
            criteria: [
              'Call PIPER: 1300 137 650',
              '💊 O2, Newborn BVM (5L O2)',
              'Ventilate once every 1 - 1.5 seconds',
              '40 - 60x p/min',
            ],
          },
          {
            label: 'IF HR ≥ 100',
            criteria: ['No resuscitation required'],
          },
        ],
      },
      motherManagementPartOne: {
        assess: 'Assess: Maternal blood loss',
        rules: [
          { if: 'Major bleeding from visible lacerations', then: 'Place pad + direct pressure' },
        ],
      },
      birthPlacenta: {
        doNot: ['Do NOT pull on umbilical cord!'],
        rules: [
          { if: 'Appropriate', then: 'Encourage breast feeding (assists birth of placenta)' },
        ],
        placentaSeparatesWithoutIntervention: 'May take 15-60 minutes - signs include:',
        signsOfSeparation: [
          { letter: 'C', meaning: 'Cramping / contractions returning' },
          { letter: 'L', meaning: 'Lengthening of umbilical cord' },
          { letter: 'U', meaning: 'Uterus: Rounder / firmer / smaller' },
          { letter: 'B', meaning: 'Bleeding from vagina (trickle / gush)' },
        ],
        delivery: [
          'Position: Mother squatting — To allow for gravity to assist expulsion',
          'Placenta birthed by maternal effort',
          'Advise mother: “To give a little push” to help birth placenta',
          'Use 2 hands to support + remove placenta using a twisting “see saw” motion',
          'Ease membranes slowly out of the vagina',
          'Note: Time of placenta delivery',
        ],
        afterDelivery: [
          'Place placenta + blood clots in container',
          'Inspect placenta for completeness',
          '🚑 Transport placenta + membranes to hospital',
        ],
      },
      motherManagementPartTwo: {
        assess: 'Assess: Maternal Blood loss',
        rules: [
          { if: 'Major bleeding from visible lacerations', then: 'Place pad + direct pressure' },
          { if: 'Fundus NOT firm OR ≥ 500mL bleed', then: 'Fundal massage' },
          { if: 'Appropriate', then: 'Encourage breast feeding' },
          { if: '≥ 500mL bleed', then: 'Consult: Clinician' },
        ],
      },
      furtherNotes: [
        'Newborn refers to first few minutes of life to 24 hours post birth',
        'Stimulation can be applied by gently rubbing the (very fragile) skin and tapping of the feet',
        'Maintaining newborn warmth is absolutely essential – Do NOT base warming decisions on whether or not you feel cold yourself',
        'If suctioning, then ALWAYS suction the Mouth before the Nose – You can remember this important order as “M” comes before “N” alphabetically',
        'Cord cutting is only mandatory to enable effective resuscitation – There is NO requirement to cut the cord of the vigorous newborn',
      ],
    },
  },
  'chest-trauma': {
    title: 'Chest Trauma',
    level: 'FR',
    category: 'trauma',
    summary: 'Management of chest injury',
    content: {
      management: ['SitRep: Hatzolah dispatch + call ambulance'],
      positioning: [
        {
          if: 'Spinal precaution OR Poor perfusion',
          then: 'Position: Supine with slight head elevation',
        },
        { if: 'Awake / spontaneously ventilating', then: 'Position: Sitting upright' },
      ],
      oxygen: ['Oxygen, NRB (10-15L O2)'],
      painRelief: [
        { if: 'Required', then: 'Pain Relief, PRN' },
      ],
      doNot: [
        'UNLESS Life threatening bleed → Do NOT cover open chest wounds',
        'Do NOT splint chest injury',
      ],
    },
  },
};

// ─────────────────────────────────────────────
// PHARMACOLOGY (MEDICATIONS)
// ─────────────────────────────────────────────

export const medicationsContent = {
  adrenaline: {
    title: 'Adrenaline',
    level: 'ALL',
    universal: true,
    category: 'emergency',
    summary: 'Anaphylaxis and thunderstorm asthma — IM Epi-Pen',
    content: {
      indications: ['Anaphylaxis', 'Thunderstorm asthma'],
      contraindications: ['Hypovolaemic shock without adequate fluid replacement'],
      precautions: [
        'Do NOT delay immediate adrenaline administration in patients experiencing anaphylaxis',
        'Consider consulting for reduced doses for: Elderly / frail patients; Cardiovascular disease PHx; Monoamine Oxidase Inhibitors (MAOIs) – Current / recent use',
        'Consider consulting for increased doses for: Beta blockers – Current / recent use',
      ],
      dosing: [
        {
          drug: 'Adrenaline',
          indication: 'IF Anaphylaxis OR Thunderstorm Asthma',
          demographic: '≥ 6 years old AND ≥ 20 kgs',
          route: 'Intramuscular (IM) — Epi-Pen — yellow device',
          initial: '0.3 mg (Epi-Pen)',
          repeat: 'Can repeat initial dose ONCE only at 5/60',
          max: 'Consult',
        },
        {
          drug: 'Adrenaline',
          indication: 'IF Anaphylaxis OR Thunderstorm Asthma',
          demographic: '< 6 years old OR < 20 kgs',
          route: 'Intramuscular (IM) — Epi-Pen — green device',
          initial: '0.15 mg (Epi-Pen Jr)',
          repeat: 'Can repeat initial dose ONCE only at 5/60',
          max: 'Consult',
        },
      ],
      adverseEffects: [
        'Arrhythmias: Sinus tachycardia; Supraventricular tachycardia (SVT); Ventricular tachycardia (VT)',
        'Myocardial infarction exacerbation',
        'Hypertension',
        'Anxiety',
        'Palpitations',
        'Pupillary dilatation',
      ],
    },
  },
  aspirin: {
    title: 'Aspirin',
    level: 'FR',
    category: 'cardiac',
    summary: 'Cardiac chest pain / suspected ACS',
    content: {
      indications: ['Cardiac chest pain or discomfort', 'Suspected ACS'],
      contraindications: [
        'Chest pain associated with psychostimulant overdose where sBP is ≥ 160 mmHg',
        'Hypersensitivity to aspirin / salicylates',
        'Actively bleeding peptic ulcers (E.G. blood in stool)',
        'Bleeding disorders',
        'Suspected dissecting aortic aneurysm',
      ],
      precautions: ['Peptic ulcer (not actively bleeding)', 'Asthma', 'Anticoagulants'],
      adverseEffects: [
        'Heartburn',
        'Nausea',
        'Gastrointestinal bleeding',
        'Increased bleeding time',
        'Hypersensitivity reactions',
      ],
      dosing: [
        {
          drug: 'Aspirin',
          indication: 'IF Cardiac chest pain / Discomfort',
          demographic: '≥ 11 years old',
          route: 'Oral',
          initial: '300 mg',
          repeat: 'Nil',
          max: '300 mg (total dose)',
        },
      ],
    },
  },
  cetirizine: {
    title: 'Cetirizine',
    level: 'FR',
    category: 'allergy',
    summary: 'Mild allergic reaction — skin symptoms only',
    content: {
      indications: ['Mild allergy associated with skin symptoms only (E.G. Hives, welt, itchiness etc)'],
      contraindications: ['Known hypersensitivity to cetirizine or hydroxyzine'],
      precautions: ['Avoid using alongside alcohol or other CNS depressants as this may cause sedation'],
      adverseEffects: ['Drowsiness (somnolence)', 'Sore throat (pharyngitis)', 'Dizziness', 'Dry mouth', 'Headache'],
      dosing: [
        {
          drug: 'Cetirizine',
          indication: 'ALL Mild allergy',
          demographic: '≥ 11 years old',
          route: 'Oral',
          initial: '10 mg',
          repeat: 'Nil',
          max: '10 mg (total dose)',
        },
      ],
    },
  },
  glucagon: {
    title: 'Glucagon',
    level: 'SR',
    category: 'endocrine',
    summary: 'Hypoglycaemia — not responding or cannot swallow. Accredited only.',
    content: {
      indications: ['BGL < 4 mmol/L AND NOT responding OR CAN\'T swallow safely'],
      contraindications: ['MUST be accredited to administer IM Glucagon'],
      precautions: ['Nil'],
      adverseEffects: ['Nausea / Vomiting'],
      dosing: [
        {
          drug: 'Glucagon',
          indication: 'IF BGL < 4',
          demographic: '≥ 8 years old AND NOT responding OR CAN\'T swallow safely',
          route: 'IM',
          initial: '1 mg',
          repeat: 'Nil',
          max: '1 mg (total dose)',
        },
        {
          drug: 'Glucagon',
          indication: 'IF BGL < 4',
          demographic: '< 8 years old AND NOT responding OR CAN\'T swallow safely',
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
    universal: true,
    category: 'endocrine',
    summary: 'Hypoglycaemia — conscious and can swallow safely',
    content: {
      indications: ['BGL < 4 mmol/L AND Responding AND Can swallow safely'],
      contraindications: [
        'MUST be able to swallow safely — do NOT administer if altered conscious OR at reasonable risk of choking',
      ],
      precautions: ['Nil'],
      adverseEffects: ['Nil'],
      dosing: [
        {
          drug: 'Glucose Paste',
          indication: 'IF BGL < 4',
          demographic: 'All ages AND Responding AND Can swallow safely',
          route: 'Oral',
          initial: '15 G',
          repeat: 'Nil',
          max: '15 G (total dose)',
        },
      ],
    },
  },
  gtn: {
    title: 'Glyceryl Trinitrate (GTN)',
    level: 'FR',
    category: 'cardiac',
    summary: 'Cardiac chest pain / discomfort — sublingual',
    content: {
      indications: ['Cardiac Chest Pain / Discomfort'],
      contraindications: [
        'sBP < 100 mmHg',
        'HR ≥ 150 BPM',
        'HR < 60 BPM',
        'Ventricular Tachycardia — Perform ECG prior to administration when accredited to do so',
        'PDE5 inhibitors - Current / recent use',
        'Avanafil (Stendra) <12 hours',
        'Sildenafil (Viagra) <24 hours',
        'Tadalafil (Cialis) <48 hours',
        'Vardenafil (Levitra, Staxyn) <24 hours',
        'Riociguat (Adempas) - Current / recent use',
        'Bleeding during pregnancy',
      ],
      precautions: [
        'Right ventricular myocardial infarction OR inferior myocardial infarction with sBP < 160 mmHg',
        'Risk of causing severe hypotension',
        'The following demographics are at higher risk of adverse effects',
        'Age ≥ 60',
        'No previous history of Glyceryl Trinitrate use',
        'Recent Myocardial Infarction',
        'Preterm labour – Concurrent use with other tocolytics',
      ],
      adverseEffects: [
        'Hypotension',
        'Tachycardia',
        'Bradycardia',
        'Headache',
        'Dizziness',
        'Syncope / faint',
        'Skin flushing',
      ],
      pregnancy: 'Safe for use in pregnancy. Monitoring required if breastfeeding. Use lowest effective dose and observe infant for adverse effects such as flushing or discomfort after breast feeding.',
      dosing: [
        {
          drug: 'Glyceryl Trinitrate (GTN)',
          indication: 'IF Cardiac Chest Pain / Discomfort',
          demographic: '≥ 15 years old',
          route: 'Sublingual',
          initial: '300 mcg',
          repeat: '300 mcg @ 5 mins',
          max: 'Nil',
        },
      ],
    },
  },
  ipratropium: {
    title: 'Ipratropium Bromide',
    level: 'SR',
    category: 'respiratory',
    summary: 'Asthma/wheeze — no improvement after 20 mins Salbutamol. Accredited only.',
    content: {
      indications: ['Difficulty breathing & Wheezing', 'Difficulty breathing & Asthma history'],
      contraindications: ['Atropine hypersensitivity (including hypersensitivity to Atropines derivatives)'],
      precautions: ['Glaucoma', 'Avoid contact with eyes'],
      adverseEffects: [
        'Palpitations',
        'Tachycardia',
        'Headache',
        'Acute angle closure glaucoma secondary to direct eye contact (rare)',
        'Nausea',
        'Dry mouth',
        'Skin rash',
      ],
      dosing: [
        {
          drug: 'Ipratropium Bromide',
          indication: 'IF No improvement after 20 mins Salbutamol',
          demographic: '≥ 11 years old',
          route: 'Nebulised',
          initial: '500 mcg (2 nebules)',
          repeat: 'Nil',
          max: '500 mcg (total dose)',
        },
        {
          drug: 'Ipratropium Bromide',
          indication: 'IF No improvement after 20 mins Salbutamol',
          demographic: '< 12 years old',
          route: 'Nebulised',
          initial: '250 mcg (1 nebules)',
          repeat: 'Nil',
          max: '250 mcg (total dose)',
        },
      ],
    },
  },
  methoxyflurane: {
    title: 'Methoxyflurane',
    level: 'FR',
    category: 'analgesia',
    summary: 'Pain score ≥3 — inhaled analgesia (Penthrox)',
    content: {
      indications: ['Pain score ≥ 3', 'Moderate OR severe pain'],
      contraindications: [
        'Malignant hyperthermia (known history or family history of)',
        'Renal disease (pre-existing)',
      ],
      precautions: [
        'Patients should not be administered ≥ 6 mL of methoxyflurane in a 24 hour period, due to increased risk of kidney damage',
        'Limit occupational exposure',
        'Do NOT administer in a confined space',
        'Ensure adequate ventilation in ambulance',
        'Place used Penthrox inhalers in closed bag when not in use',
      ],
      adverseEffects: ['Dizziness', 'Drowsiness', 'Hypotension', 'Nausea / Vomiting'],
      pregnancy: 'Safe for use in pregnancy. Safe for use while breastfeeding.',
      dosing: [
        {
          drug: 'Methoxyflurane',
          indication: 'IF Pain score ≥ 3',
          demographic: 'All ages',
          route: 'Inhaled whistle',
          initial: '3 mL',
          repeat: '3 mL PRN — 3 mL typically lasts for 25 minutes continuous use',
          max: '6 mL in 24 hours',
        },
      ],
    },
  },
  midazolam: {
    title: 'Midazolam',
    level: 'SR',
    category: 'neuro',
    summary: 'GCSE ≥ 5 mins or multiple GCSE. Accredited only.',
    content: {
      indications: [
        'Ongoing tonic clonic activity associated with altered consciousness AND lasting 5 or more minutes',
        'Multiple ongoing episodes of tonic clonic activity without full recovery of consciousness in-between seizures',
      ],
      contraindications: [
        'Midazolam may ONLY be administered by accredited responders',
        'Known hypersensitivity to benzodiazepines',
      ],
      precautions: [
        'Reduce doses for patients that are:',
        '- Elderly / frail',
        '- Weigh less than 60 kgs',
        '- Have chronic renal failure, CCF or shock',
        'The CNS depressant effects of benzodiazepines are enhanced in the presence of narcotics and other tranquilisers including alcohol',
        'Can cause severe respiratory depression in patients with COPD',
        'Patients with myasthenia gravis',
      ],
      adverseEffects: [
        'Depressed level of consciousness',
        'Respiratory depression',
        'Loss of airway control',
        'Hypotension',
      ],
      dosing: [
        {
          drug: 'Midazolam',
          indication: 'IF GCSE ≥ 5 mins OR Multiple GCSE *',
          demographic: '≥ 15 years old AND (Elderly / Frail OR < 60 kgs)',
          route: 'IM',
          initial: '5 mg',
          repeat: '5 mg @ 5 mins IF Required',
          max: '10 mg (total dose)',
        },
        {
          drug: 'Midazolam',
          indication: 'IF GCSE ≥ 5 mins OR Multiple GCSE *',
          demographic: '≥ 15 years old AND NOT Elderly/Frail AND ≥ 60 kgs',
          route: 'IM',
          initial: '10 mg',
          repeat: '10 mg @ 10 mins IF Required',
          max: '20 mg (total dose)',
        },
      ],
      notes: [
        '* Multiple GCSE refers to multiple tonic clonic seizures occurring WITHOUT full recovery to the patients normal baseline in between seizures',
      ],
    },
  },
  'normal-saline': {
    title: 'Normal Saline',
    level: 'SR',
    category: 'fluids',
    summary: 'IV fluid replacement for dehydration. Accredited only.',
    content: {
      indications: [
        'Fluid replacement for volume depleted patients in the context of dehydration',
        'Fluid for the dilution or preparation of other IV medications if required',
      ],
      contraindications: ['Bilateral fine crackles on chest auscultation suggestive of APO'],
      precautions: [
        'Reduce doses for patients that are:',
        '– Elderly / frail',
        '– Heart failure',
        '– Renal failure',
      ],
      adverseEffects: ['Potential for fluid overload with high risk patients or large volumes'],
      dosing: [
        {
          drug: 'Normal Saline',
          indication: 'IF < Adequate PSA due to Dehydration',
          demographic: '≥ 15 years old & Elderly OR Renal OR Heart failure',
          route: 'IV',
          initial: '500 mL — titrate to response',
          repeat: 'Nil',
          max: '500 mL',
        },
        {
          drug: 'Normal Saline',
          indication: 'IF < Adequate PSA due to Dehydration',
          demographic: '≥ 15 years old & NOT elderly / NO renal OR heart failure',
          route: 'IV',
          initial: '1000 mL — titrate to response',
          repeat: 'Nil',
          max: '1000 mL',
        },
      ],
    },
  },
  ondansetron: {
    title: 'Ondansetron',
    level: 'FR',
    category: 'gastro',
    summary: 'Non-tolerated nausea/vomiting or spinal immobilisation prophylaxis',
    content: {
      indications: ['Non-tolerated nausea / vomiting', 'Prophylaxis for spinal immobilisation'],
      contraindications: ['Apomorphine (medication typically used to treat Parkinson\'s disease)'],
      precautions: [
        'First trimester pregnancy (0 to 12 weeks) without first consulting with receiving hospital',
        'Congenital Long QT syndrome — QTc ≥ 500 ms',
        'Severe liver disease (E.G. cirrhosis) — Do not exceed 8 mg total dose per day',
        'Phenylketonuria (PKU) history',
      ],
      adverseEffects: [
        'Headache / dizziness',
        'QT prolongation',
        'Constipation',
        'Visual disturbances (rarely associated with transient loss of vision)',
      ],
      pregnancy: '1st trimester — Consult with receiving hospital. 2nd + 3rd trimester — Administer only if vomiting is very severe. Safe for use while breastfeeding.',
      dosing: [
        {
          drug: 'Ondansetron',
          indication: 'ALL Non-tolerated Nausea / Vomiting',
          demographic: '≥ 11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: 'IF Required — 4 mg @ 20 mins',
          max: '8 mg (total dose)',
        },
        {
          drug: 'Ondansetron',
          indication: 'ALL Non-tolerated Nausea / Vomiting',
          demographic: '5 to 11 years old',
          route: 'ODT',
          initial: '4 mg',
          repeat: 'Nil',
          max: '4 mg (total dose)',
        },
        {
          drug: 'Ondansetron',
          indication: 'ALL Non-tolerated Nausea / Vomiting',
          demographic: '< 5 years old',
          route: 'ODT',
          initial: '2 mg',
          repeat: 'Nil',
          max: '2 mg (total dose)',
        },
      ],
    },
  },
  oxygen: {
    title: 'Oxygen',
    level: 'FR',
    category: 'respiratory',
    summary: 'Oxygen therapy — titrated to condition',
    content: {
      definition: 'Hypoxia occurs when there is inadequate oxygen in the tissues to maintain homeostasis. It may lead to symptoms such as an altered conscious state, dyspnea, tachycardia, tachypnea, diaphoresis, anxiety and cyanosis.',
      indications: {
        question: 'Apply oxygen to all patients presenting with severe shortness of breath',
        options: [
          { label: 'IF SpO2 < 92%', action: 'Oxygen: titrate SpO2 92% or above' },
          {
            label: 'IF ANY of the below conditions',
            criteria: [
              'COPD',
              'Neuromuscular disorder',
              'Cystic fibrosis',
              'Bronchiectasis',
              'Severe kyphoscoliosis',
              'Obesity',
            ],
            action: 'Oxygen: titrate SpO2 88 - 92%',
          },
          {
            label: 'IF ANY of the below conditions',
            criteria: [
              'SpO2 < 85%',
              'Major trauma',
              'Head injury',
              'Shock',
              'Severe sepsis',
              'Anaphylaxis',
              'Seizure',
            ],
            action: 'Oxygen: Initial Mx NRB 10-15 L/min → ONCE Hemodynamically stable: Titrate oxygen to SpO2 92 - 96%',
          },
          {
            label: 'IF ANY of the below conditions',
            criteria: [
              'Toxic inhalation exposure',
              'Decompression illness',
              'Cord prolapse',
              'Cluster headache',
              'Postpartum haemorrhage',
            ],
            action: 'Oxygen: ALWAYS Administer NRB 10-15 L/min',
          },
        ],
      },
      furtherNotes: [
        'This CPG is intended for patients aged 16 and older',
        'High concentration oxygen may be harmful for patients at risk of hypercapnic respiratory failure',
        'Suspect COPD if patient has/is:',
      ],
      copd: [
        { letter: 'C', meaning: 'Chronic cough / sputum production' },
        { letter: 'O', meaning: 'Older than 40' },
        { letter: 'P', meaning: 'Past history of smoking (including current + ex-smokers)' },
        { letter: 'D', meaning: 'Dyspnoea on exertion' },
      ],
    },
  },
  paracetamol: {
    title: 'Paracetamol',
    level: 'FR',
    category: 'analgesia',
    summary: 'Mild pain; moderate / severe pain in combination with other analgesics',
    content: {
      indications: ['Mild pain', 'Moderate / severe pain when used in combination with other analgesics'],
      contraindications: [
        'Any form of paracetamol in children < 1 month old',
        'Paracetamol tablets in children < 7 years old',
      ],
      precautions: [
        'Liver toxicity may occur in paracetamol overdose',
        'Do NOT administer if paracetamol has already been given within past 4 hours',
        'Do NOT administer if total paracetamol within 24 hours exceeds 4 g in adults',
        'Do NOT administer if total paracetamol within 24 hours exceeds 60 mg/kg in children',
        'Risk of liver toxicity increases in the following circumstances',
        'Impaired liver function / liver disease',
        'Elderly / frail patients',
        'Malnourishment',
      ],
      adverseEffects: [
        'Rashes or other hypersensitivity reactions',
        'Haematological reactions',
        'Hypotension (associated with IV infusion, particularly in critically ill patients)',
      ],
      pregnancy: 'Safe for use in pregnancy. Safe for use while breastfeeding.',
      dosing: [
        {
          drug: 'Paracetamol',
          indication: 'IF Non-tolerated Pain score ≥ 0',
          demographic: '≥ 60 years old OR < 60 kgs OR Frail',
          route: 'Oral tablet',
          initial: '500 mg (1 tablet)',
          repeat: 'IF Required — 500 mg @ 4 hours',
          max: '4 doses in 24 hours',
        },
        {
          drug: 'Paracetamol',
          indication: 'IF Non-tolerated Pain score ≥ 0',
          demographic: '16 to 60 years old & ≥ 60 kgs & NOT frail',
          route: 'Oral tablet',
          initial: '1000 mg (2 tablets)',
          repeat: 'IF Required — 1000 mg @ 4 hours',
          max: '4 doses in 24 hours',
        },
        {
          drug: 'Paracetamol',
          indication: 'IF Non-tolerated Pain score ≥ 0',
          demographic: '12 to 15 years old',
          route: 'Oral tablet',
          initial: '500 mg (1 tablet)',
          repeat: 'IF Required — 500 mg @ 4 hours',
          max: '4 doses in 24 hours',
        },
        {
          drug: 'Paracetamol',
          indication: 'IF Non-tolerated Pain score ≥ 0',
          demographic: '< 12 years old',
          route: 'Oral liquid',
          initial: '15 mg x kg',
          confirm: 'Confirm the following doses with the label on the bottle prior to administration!',
          repeat: 'IF Required — 15 mg x kg @ 4 hours',
          max: '4 doses in 24 hours',
          weightTable: [
            { weight: '36 kg', age: '11 years old (approx.)', dose: '540 mg', volume: '23 mL' },
            { weight: '33 kg', age: '10 years old (approx.)', dose: '495 mg', volume: '21 mL' },
            { weight: '26 kg', age: '9 years old (approx.)', dose: '390 mg', volume: '16 mL' },
            { weight: '24 kg', age: '8 years old (approx.)', dose: '360 mg', volume: '15 mL' },
            { weight: '22 kg', age: '7 years old (approx.)', dose: '330 mg', volume: '14 mL' },
            { weight: '20 kg', age: '6 years old (approx.)', dose: '300 mg', volume: '13 mL' },
            { weight: '18 kg', age: '5 years old (approx.)', dose: '270 mg', volume: '11 mL' },
            { weight: '16 kg', age: '4 years old (approx.)', dose: '240 mg', volume: '10 mL' },
            { weight: '14 kg', age: '3 years old (approx.)', dose: '210 mg', volume: '9 mL' },
            { weight: '12 kg', age: '2 years old (approx.)', dose: '180 mg', volume: '8 mL' },
            { weight: '10 kg', age: '1 year old (approx.)', dose: '150 mg', volume: '6 mL' },
            { weight: '8 kg', age: '6 months old (approx.)', dose: '120 mg', volume: '5 mL' },
            { weight: '6 kg', age: '3 months old (approx.)', dose: '90 mg', volume: '4 mL' },
          ],
        },
      ],
      notes: [
        'Oral liquid (< 12 years old) — Confirm the following doses with the label on the bottle prior to administration!',
      ],
    },
  },
  'salbutamol-cb': {
    title: 'Salbutamol (L1)',
    level: 'CB',
    category: 'respiratory',
    summary: 'Asthma/wheeze — puffer via spacer',
    content: {
      indications: ['Difficulty breathing & Wheezing', 'Difficulty breathing & Asthma history'],
      contraindications: ['Nil'],
      precautions: ['Large doses may cause intracellular metabolic acidosis'],
      adverseEffects: ['Tachycardia', 'Tremors'],
      dosing: [
        {
          drug: 'Salbutamol',
          indication: 'IF Mild / moderate asthma',
          demographic: '≥ 5 years old',
          route: 'pMDI (I.E. Puffer)',
          initial: '4 – 12 puffs, 4x breaths per puff, via spacer',
          repeat: '4 – 12 puffs @ 20 min, 4x breaths per puff, via spacer',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'IF Mild / moderate asthma',
          demographic: '2 – 5 years old',
          route: 'pMDI (I.E. Puffer)',
          initial: '2 – 6 puffs, 4x breaths per puff, via spacer',
          repeat: '2 – 6 puffs @ 20 min, 4x breaths per puff, via spacer',
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
      indications: ['Difficulty breathing & Wheezing', 'Difficulty breathing & Asthma history'],
      contraindications: ['Nil'],
      precautions: ['Large doses may cause intracellular metabolic acidosis'],
      adverseEffects: ['Tachycardia', 'Tremors'],
      dosing: [
        {
          drug: 'Salbutamol',
          indication: 'IF Mild / moderate asthma',
          demographic: '≥ 5 years old',
          route: 'pMDI (I.E. Puffer)',
          initial: '4 – 12 puffs, 4x breaths per puff, via spacer',
          repeat: '4 – 12 puffs @ 20 min, 4x breaths per puff, via spacer',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'IF Mild / moderate asthma',
          demographic: '2 – 5 years old',
          route: 'pMDI (I.E. Puffer)',
          initial: '2 – 6 puffs, 4x breaths per puff, via spacer',
          repeat: '2 – 6 puffs @ 20 min, 4x breaths per puff, via spacer',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'IF Severe asthma OR Nil improvement',
          demographic: '≥ 15 years old',
          route: 'Nebulised',
          initial: '10 mg, 2 ampules, with 8L O2',
          repeat: '5 mg @ 5 min, 1 ampule, with 8L O2',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'IF Severe asthma OR Nil improvement',
          demographic: '7 – 15 years old',
          route: 'Nebulised',
          initial: '5 mg, 1 ampule, with 8L O2',
          repeat: '5 mg @ 20 min, 1 ampule, with 8L O2',
          max: 'Nil',
        },
        {
          drug: 'Salbutamol',
          indication: 'IF Severe asthma OR Nil improvement',
          demographic: '2 – 5 years old',
          route: 'Nebulised',
          initial: '2.5 mg, 1/2 ampule, with 8L O2',
          repeat: '2.5 mg @ 20 min, 1/2 ampule, with 8L O2',
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
// Tile emoji + display name per category. Single source of truth: this used to be
// duplicated in HomeScreen and CategoryView, so adding a category to one and not
// the other silently fell back to a generic icon and a lowercase label.
// Every key in CATEGORY_COLORS below must have an entry here.
export const CATEGORY_META = {
  primary:     { emoji: '🔍', label: 'Primary Assessment' },
  cardiac:     { emoji: '🫀', label: 'Cardiac' },
  respiratory: { emoji: '🫁', label: 'Respiratory' },
  neuro:       { emoji: '🧠', label: 'Neurological' },
  trauma:      { emoji: '🩸', label: 'Trauma' },
  medical:     { emoji: '💊', label: 'Medical' },
  paediatric:  { emoji: '👶', label: 'Paediatric' },
  obstetric:   { emoji: '🤰', label: 'Obstetric' },
  endocrine:   { emoji: '🌡️', label: 'Endocrine' },
  analgesia:   { emoji: '💉', label: 'Analgesia' },
  fluids:      { emoji: '💧', label: 'Fluids' },
  gastro:      { emoji: '🫄', label: 'Gastro' },
  allergy:     { emoji: '🌿', label: 'Allergy' },
  emergency:   { emoji: '🚨', label: 'Emergency' },
};

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
