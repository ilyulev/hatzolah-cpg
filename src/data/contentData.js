/**
 * Hatzolah Clinical Practice Guidelines - Content Data
 * This file contains all medical content separated from the UI layer
 * Update this file when guidelines change - no need to touch the React components
 */

export const assessmentsContent = {
  'acceptable-vital-signs': {
    title: 'Acceptable Vital Sign Values',
    content: {
      description: 'Age-based vital sign ranges for clinical assessment',
      tables: [
        {
          headers: ['Age', 'Heart Rate (bpm)', 'Respiratory Rate (bpm)', 'Systolic BP (mmHg)'],
          rows: [
            ['Neonate (0-28 days)', '100-160', '30-60', '60-90'],
            ['Infant (1-12 months)', '100-160', '30-60', '70-100'],
            ['Toddler (1-2 years)', '90-150', '24-40', '80-100'],
            ['Preschool (3-5 years)', '80-140', '22-34', '80-110'],
            ['School age (6-12 years)', '70-120', '18-30', '90-120'],
            ['Adolescent (13-18 years)', '60-100', '12-20', '100-120'],
            ['Adult (>18 years)', '60-100', '12-20', '100-140']
          ]
        }
      ],
      notes: [
        'These are guideline ranges - individual variation exists',
        'Consider patient baseline and clinical context',
        'Trending vital signs more important than single values'
      ]
    }
  },
  
  'altered-consciousness': {
    title: 'Altered Consciousness',
    content: {
      recognition: {
        description: 'AEIOUTIPS - Differential diagnoses for altered consciousness',
        pneumonic: [
          { letter: 'A', meaning: 'Alcohol, Abuse' },
          { letter: 'E', meaning: 'Epilepsy, Encephalopathy, Electrolytes' },
          { letter: 'I', meaning: 'Insulin (hypo/hyperglycemia), Infection' },
          { letter: 'O', meaning: 'Overdose, Oxygen (hypoxia)' },
          { letter: 'U', meaning: 'Uremia' },
          { letter: 'T', meaning: 'Trauma, Temperature' },
          { letter: 'I', meaning: 'Infection' },
          { letter: 'P', meaning: 'Psychiatric, Poison' },
          { letter: 'S', meaning: 'Stroke, Seizure, Shock' }
        ]
      },
      ventilationRates: {
        description: 'Ventilation rates for unconscious patients',
        table: {
          headers: ['Age Group', 'Ventilation Rate', 'Technique'],
          rows: [
            ['Adult', '10-12 breaths/min', 'BVM with oxygen'],
            ['Child', '12-20 breaths/min', 'BVM with oxygen'],
            ['Infant', '12-20 breaths/min', 'BVM with oxygen']
          ]
        }
      },
      management: [
        'Ensure scene safety',
        'Check responsiveness (AVPU)',
        'Open airway, check breathing',
        'If not breathing normally: CPR',
        'If breathing: Recovery position',
        'Check blood glucose if available',
        'Maintain C-spine if trauma suspected',
        'Call for advanced care'
      ]
    }
  },

  'airway-obstruction': {
    title: 'Airway Obstruction',
    content: {
      assessment: {
        description: 'Rapid assessment of airway obstruction severity',
        decisionTable: {
          headers: ['Status', 'Can Speak/Cry', 'Cough', 'Management'],
          rows: [
            ['Mild obstruction', 'Yes', 'Effective cough', 'Box A: Encourage coughing'],
            ['Severe obstruction (Conscious)', 'No', 'Ineffective/silent', 'Box B: Back blows + chest thrusts'],
            ['Severe obstruction (Unconscious)', 'No', 'None', 'Box C: CPR protocol']
          ]
        }
      },
      protocols: {
        boxA: {
          title: 'Box A - Mild Obstruction',
          steps: [
            'Encourage patient to cough',
            'Monitor continuously',
            'Do NOT perform back blows',
            'Be prepared for deterioration'
          ]
        },
        boxB: {
          title: 'Box B - Severe Obstruction (Conscious)',
          adult: [
            'Give up to 5 back blows (between shoulder blades)',
            'Check mouth after each blow',
            'If unsuccessful: 5 chest thrusts',
            'Alternate back blows and chest thrusts',
            'If becomes unconscious: go to Box C'
          ],
          child: [
            'Give up to 5 back blows',
            'If unsuccessful: 5 chest thrusts (child) or abdominal thrusts (child >1 year)',
            'If becomes unconscious: go to Box C'
          ]
        },
        boxC: {
          title: 'Box C - Unconscious',
          steps: [
            'Start CPR immediately',
            'Check mouth before each rescue breath',
            'Remove visible obstruction',
            'Continue CPR until obstruction cleared or help arrives'
          ]
        }
      }
    }
  },

  'anaphylaxis': {
    title: 'Anaphylaxis',
    content: {
      recognition: {
        description: 'R.A.S.H Criteria - Requires 2 or more systems involved',
        criteria: {
          headers: ['System', 'Signs/Symptoms'],
          rows: [
            ['Respiratory', 'Wheeze, stridor, difficulty breathing, throat/tongue swelling'],
            ['Cardiovascular (Shock)', 'Pale, clammy, hypotension, tachycardia, reduced consciousness'],
            ['Skin', 'Urticaria (hives), angioedema, flushing, itching'],
            ['History', 'Known allergen exposure (food, drug, insect sting)']
          ]
        },
        note: 'Anaphylaxis can occur without skin signs - don\'t wait for rash if respiratory or cardiovascular compromise present'
      },
      adrenalineDosing: {
        description: 'Adrenaline 1:1000 IM (anterolateral thigh)',
        table: {
          headers: ['Weight (kg)', 'Age Approximation', 'Dose (mL)', 'Dose (mg)'],
          rows: [
            ['<7.5 kg', '<6 months', '0.05 mL', '0.05 mg'],
            ['7.5-10 kg', '6-12 months', '0.1 mL', '0.1 mg'],
            ['10-15 kg', '1-3 years', '0.15 mL', '0.15 mg'],
            ['15-25 kg', '3-7 years', '0.25 mL', '0.25 mg'],
            ['25-50 kg', '7-12 years', '0.3 mL', '0.3 mg'],
            ['50+ kg', '12+ years/adult', '0.5 mL', '0.5 mg']
          ]
        },
        notes: [
          'Repeat every 5 minutes if no improvement',
          'IM injection preferred over subcutaneous',
          'Anterolateral thigh is the preferred site',
          'Do not delay for IV access'
        ]
      },
      management: [
        'Remove allergen if still present',
        'Give adrenaline IM immediately',
        'Lay patient flat (or sitting if breathing difficulty)',
        'Elevate legs if hypotensive',
        'Give oxygen if available',
        'Call for ambulance',
        'Monitor and repeat adrenaline every 5 min if needed',
        'Be prepared for CPR'
      ]
    }
  },

  'clinical-flags': {
    title: 'Clinical Flags',
    content: {
      redFlags: {
        title: 'RED FLAG CRITERIA',
        adultsAndPaediatrics: {
          description: 'Adults & Paediatrics',
          flags: [
            'ANY vital sign outside of Acceptable Vital Sign Values',
            'Stridor',
            'First presentation seizure',
            'Anaphylaxis (including resolved anaphylaxis)',
            'Acute coronary syndrome (even if resolved)',
            'Ectopic pregnancy',
            'Primary obstetric issue',
            'Stroke / TIA',
            'Sudden onset headache',
            'Unable to walk (when usually able to walk)',
            'Post-tonsillectomy bleeding (up to 14 days post-operation)'
          ]
        },
        paediatricsOnly: {
          description: 'Paediatrics Only',
          flags: [
            'Unexplained pain',
            'Second presentation within 48 hours to AV or Dr for related complaint',
            'Febrile >=38°C in small infants (up to 3 months old)',
            'Testicular pain',
            'Ingestion/inhalation of toxic substance',
            'Inhalation of foreign body',
            'Non blanching rash'
          ]
        }
      },
      yellowFlags: {
        title: 'YELLOW FLAG CRITERIA',
        flags: [
          'Ongoing patient or carer concern',
          'Infection not responding to community based care',
          'Immunocompromised with suspected infection',
          'Surgical procedure within past 14 days',
          'Significant unexplained pain (>=5)',
          'Syncope (asymptomatic, normal vital signs, normal ECG)',
          'Abdominal pain',
          'Mental health'
        ]
      }
    }
  },

  'perfusion-assessment': {
    title: 'Perfusion Assessment',
    content: {
      recognition: {
        description: 'Patient has less than adequate perfusion IF 2 or more criteria are outside adequate range',
        table: {
          headers: ['Parameter', 'Adequate Perfusion', '<= Adequate Perfusion', 'No Perfusion'],
          rows: [
            ['Skin', 'Warm, Pink, Dry', 'Cool, Pale, Clammy', 'Cool, Pale, Clammy'],
            ['Pulse', '60 to 100', '<=50 OR >=100', 'No pulse'],
            ['sBP', '>=100 sBP', '<=100 sBP', 'Unable to record'],
            ['Conscious State', 'Alert & Orientated', 'Alert OR Altered', 'Unconscious']
          ]
        }
      },
      management: {
        title: 'MANAGEMENT',
        whenLessAdequate: {
          condition: 'IF <= Adequate perfusion:',
          actions: [
            'Avoid standing/walking patient',
            'Position: Supine/legs raised',
            'SitRep: Hatzolah dispatch + call ambulance'
          ]
        }
      }
    }
  },

  'pain-assessment': {
    title: 'Pain Assessments',
    content: {
      wongBaker: {
        title: 'WONG-BAKER FACES PAIN RATING SCALE',
        description: 'For patients 3 years or older who are able to understand the tool and choose a face that best illustrates their physical pain.',
        warning: 'NOT intended to be used by a third person to assess patient\'s pain on their behalf.'
      },
      dolor: {
        title: 'DOLOR Assessment',
        pneumonic: [
          { letter: 'D', meaning: 'Description of the pain?' },
          { letter: 'O', meaning: 'Onset time of the pain?' },
          { letter: 'L', meaning: 'Location of the pain?' },
          { letter: 'O', meaning: 'Other symptoms associated with the pain?' },
          { letter: 'R', meaning: 'Relief from the pain? (positional relief, home medications tried)' },
          { letter: 'S', meaning: 'Severity / Pain score?' }
        ],
        notes: [
          'Use 0-10 pain scale for adults and older children',
          'Use Wong-Baker FACES for children 3+ years who cannot understand numerical scale'
        ]
      }
    }
  },

  'weight-calculations': {
    title: 'Weight Calculations',
    content: {
      description: 'PAEDIATRIC WEIGHT CALCULATIONS',
      formulas: {
        table: {
          headers: ['Age', 'Weight Calculation'],
          rows: [
            ['<= 24 hours', '3.5 kg'],
            ['3 months', '6 kg'],
            ['6 months', '8 kg'],
            ['1-9 years', 'Age x 2 + 8 kg'],
            ['10-11 years', 'Age x 3.3 kg'],
            ['>= 11 years', 'Estimate based on patient size']
          ]
        }
      },
      notes: [
        'For children, various treatments are based on body weight such as drug doses, defibrillation joules and fluid volume.',
        'It is acceptable to ask a parent the patient\'s weight.'
      ]
    }
  }
};

export const medicationsContent = {
  'adrenaline': {
    title: 'Adrenaline (Epinephrine)',
    indications: ['Anaphylaxis', 'Cardiac arrest'],
    preparations: [
      { name: '1:1000 (1mg/mL)', use: 'IM for anaphylaxis' },
      { name: '1:10,000 (0.1mg/mL)', use: 'IV for cardiac arrest' }
    ],
    dosing: {
      anaphylaxis: {
        route: 'IM (anterolateral thigh)',
        doses: [
          { weight: '<7.5 kg', age: '<6 months', dose: '0.05 mL (0.05 mg)' },
          { weight: '7.5-10 kg', age: '6-12 months', dose: '0.1 mL (0.1 mg)' },
          { weight: '10-15 kg', age: '1-3 years', dose: '0.15 mL (0.15 mg)' },
          { weight: '15-25 kg', age: '3-7 years', dose: '0.25 mL (0.25 mg)' },
          { weight: '25-50 kg', age: '7-12 years', dose: '0.3 mL (0.3 mg)' },
          { weight: '50+ kg', age: '12+ years/adult', dose: '0.5 mL (0.5 mg)' }
        ],
        repeat: 'Every 5 minutes if no improvement'
      },
      cardiacArrest: {
        route: 'IV/IO',
        adultDose: '1 mg (10 mL of 1:10,000)',
        paediatricDose: '0.01 mg/kg (0.1 mL/kg of 1:10,000)',
        repeat: 'Every 3-5 minutes during CPR'
      }
    },
    contraindications: ['None in life-threatening situations'],
    notes: [
      'IM route preferred over subcutaneous for anaphylaxis',
      'Anterolateral thigh is preferred injection site',
      'Can be given through clothing if necessary',
      'Do not delay for IV access in anaphylaxis'
    ]
  },

  'aspirin': {
    title: 'Aspirin',
    indications: ['Suspected acute coronary syndrome', 'Chest pain of cardiac origin'],
    dosing: {
      adult: {
        dose: '300 mg',
        route: 'Oral (chewed or dispersed)',
        notes: 'Single dose only'
      },
      paediatric: 'Not routinely given to children'
    },
    contraindications: [
      'Known aspirin allergy',
      'Active bleeding',
      'Severe asthma (relative contraindication)',
      'Already taken aspirin for current episode'
    ],
    notes: [
      'Chewing is preferred over swallowing whole',
      'Can be dispersed in small amount of water',
      'Best given as early as possible in suspected MI',
      'Document time given'
    ]
  },

  'gtn': {
    title: 'GTN (Glyceryl Trinitrate)',
    indications: ['Chest pain', 'Acute coronary syndrome', 'Pulmonary oedema'],
    dosing: {
      spray: {
        dose: '1-2 sprays (400-800 mcg)',
        route: 'Sublingual',
        repeat: 'Can repeat every 5 minutes up to 3 doses'
      },
      tablet: {
        dose: '300-600 mcg',
        route: 'Sublingual',
        repeat: 'Can repeat every 5 minutes up to 3 doses'
      }
    },
    contraindications: [
      'Systolic BP <100 mmHg',
      'Severe aortic stenosis',
      'Recent sildenafil (Viagra) use (within 24 hours)',
      'Right ventricular infarction',
      'Head injury'
    ],
    sideEffects: ['Headache', 'Dizziness', 'Flushing', 'Hypotension'],
    notes: [
      'Check BP before each dose',
      'Patient should be sitting or lying down',
      'Warn patient about possible headache',
      'Do not give if already taken 3 doses'
    ]
  },

  'salbutamol': {
    title: 'Salbutamol',
    indications: ['Asthma', 'Wheeze', 'Bronchospasm', 'COPD exacerbation'],
    dosing: {
      mdi: {
        name: 'Metered Dose Inhaler (MDI)',
        adult: '4-8 puffs via spacer',
        paediatric: '4-6 puffs via spacer',
        repeat: 'Every 20 minutes as needed'
      },
      nebulizer: {
        name: 'Nebulizer',
        adult: '5 mg',
        paediatric: '2.5-5 mg',
        repeat: 'Can repeat continuously if severe'
      }
    },
    administration: [
      'Always use spacer with MDI',
      'One puff at a time, 4 breaths per puff',
      'Driven by oxygen (8L/min) if using nebulizer'
    ],
    sideEffects: ['Tremor', 'Tachycardia', 'Anxiety'],
    notes: [
      'No maximum dose in severe asthma',
      'Continuous nebulization acceptable in life-threatening asthma',
      'Monitor heart rate',
      'Can be given with ipratropium'
    ]
  }
};

export const alertsContent = {
  'general-alerts': {
    title: 'General Safety Alerts',
    alerts: [
      {
        title: 'Scene Safety',
        priority: 'CRITICAL',
        content: 'Always ensure scene is safe before approaching patient. If unsafe, wait for police/fire.'
      },
      {
        title: 'PPE Requirements',
        priority: 'HIGH',
        content: 'Use appropriate PPE for all patient contacts. Minimum: gloves. Add mask/eye protection for respiratory symptoms or bodily fluids.'
      },
      {
        title: 'Infection Control',
        priority: 'HIGH',
        content: 'Hand hygiene before and after every patient contact. Proper disposal of sharps and contaminated materials.'
      }
    ]
  },

  'equipment-alerts': {
    title: 'Equipment Alerts',
    alerts: [
      {
        title: 'Defibrillator Safety',
        priority: 'CRITICAL',
        content: 'Ensure no one touching patient during shock delivery. Clear wet surfaces. Remove medication patches from chest.'
      },
      {
        title: 'Oxygen Safety',
        priority: 'HIGH',
        content: 'No smoking or flames near oxygen. Secure cylinders. Check pressure before use.'
      }
    ]
  }
};

export const halakhaContent = {
  // Empty for now - will be populated later
  placeholder: {
    title: 'Halakha Section',
    content: 'This section will contain halachic references for Hatzolah operations. Content to be added.'
  }
};

export const infoContent = {
  // Empty for now - will be populated later
  placeholder: {
    title: 'Information & Resources',
    content: 'This section will include acronyms, CPR metronome, PCR writing guidelines, and other reference materials. Content to be added.'
  }
};