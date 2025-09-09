import React, { useState, useEffect, useMemo } from 'react';
import { Search, FileText, AlertTriangle, Heart, Stethoscope, User, Clock, Book } from 'lucide-react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Simple string similarity calculation
  const calculateSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const getEditDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // Parse the document content into structured sections
  const documentSections = useMemo(() => {
    const sections = [
      {
        id: 'assessments',
        title: 'Assessments',
        icon: <Stethoscope className="w-5 h-5" />,
        content: {
          'Vital Signs': `Age Category Weight AVPU/GCS RR SPO2 HR BP
          🡫 24 hours Newborn 3.5 kg A / 15 25 - 60 🡩 95% 110 - 170 🡩 60
          🡫 3 months Small Infant 6 kg A / 15 25 - 60 🡩 95% 110 - 170 🡩 60
          3 - 12 months Large Infant 8 kg A / 15 25 - 55 🡩 95% 105 - 165 🡩 65
          1 year Small Child 10 kg A / 15 20 - 40 🡩 95% 85 - 150 🡩 70
          Adult 🡩 15 years Estimate 13 - 15 12 - 30 🡩 92% 50 - 120 🡩 90`,
          'Clinical Flags': `Red Flag Criteria:
          • ANY vital sign outside of the Acceptable Vital Sign Values
          • Stridor
          • First presentation seizure
          • Anaphylaxis
          • Acute coronary syndrome
          • Stroke / TIA
          • Unable to walk (when usually able to walk)`,
          'PAT Assessment': `Paediatric Assessment Triangle consists of:
          • Appearance - level of alertness, muscle tone, body position
          • Work of breathing - chest movement evaluation
          • Circulation - skin colour assessment
          Should not take more than a few seconds to complete.`,
          'Conscious State': `AVPU Assessment:
          Alert = A
          Responding to voice = V
          Responding to pain = P
          Unresponsive = U
          
          Glasgow Coma Scale ranges from 3 (completely unresponsive) to 15 (fully alert)`,
          'Pain Assessment': `Wong-Baker FACES Pain Rating Scale for children 3+ years
          0-10 pain scale for adults
          DOLOR assessment: Description, Onset, Location, Other symptoms, Relief, Severity`
        }
      },
      {
        id: 'emergencies',
        title: 'Medical Emergencies',
        icon: <AlertTriangle className="w-5 h-5" />,
        content: {
          'Anaphylaxis': `Recognition: R.A.S.H criteria
          R - Respiratory (SOB, wheeze, cough, stridor)
          A - Abdominal (nausea, vomiting, cramps, diarrhoea)
          S - Skin/Mucosal (hives, welts, flushing, angioedema)
          H - Hypotension (sBP 🡫 90)
          
          Management:
          • Adrenaline IM (Epi-Pen): 0.3mg for >20kg, 0.15mg for <20kg
          • Remove antigen if possible
          • Position: supine if hypotensive, sitting if dyspnoea
          • Salbutamol if wheezing
          • Hospital transport required regardless of improvement`,
          'Cardiac Arrest': `Recognition: No response + ineffective breathing + no pulse
          
          Management:
          • CPR 100-120 compressions per minute
          • Apply defibrillator, follow AED instructions
          • Compression:ventilation ratios:
            - Adults: 30:2 (single rescuer), 30:2 (multiple rescuers)
            - Paediatric <12 years: 30:2 (single), 15:2 (multiple)
          • Continue until ROSC or paramedics arrive`,
          'Stroke': `Recognition: F.A.S.T
          F - Facial droop
          A - Arm/limb weakness
          S - Speech deficit
          T - Time critical (<24 hours onset)
          
          Management:
          • Time critical - call ambulance immediately
          • Check BGL (manage if <4 mmol/L)
          • Support all limbs
          • Oxygen only if SpO2 <92%`,
          'Hypoglycaemia': `Recognition: BGL <4 mmol/L
          
          Management:
          • If responding and can swallow: Glucose paste 15g oral
          • If not responding or can't swallow: Glucagon IM
            - >8 years: 1mg
            - <8 years: 0.5mg
          • Recheck BGL after 5 minutes
          • Advise to eat long-lasting carbs within 20 minutes`,
          'Seizure': `Management:
          • Protect from injury, pad head if needed
          • Do NOT restrain patient
          • Suction airway if soiled
          • Oxygen: BVM if breathing ineffectively, NRB if adequate
          • Midazolam IM for Generalised Convulsive Status Epilepticus (>5 mins)
            - Adult >60kg: 10mg IM, repeat 10mg at 10 mins if needed
            - Adult <60kg/elderly: 5mg IM, repeat 5mg at 5 mins if needed`
        }
      },
      {
        id: 'asthma',
        title: 'Asthma',
        icon: <Heart className="w-5 h-5" />,
        content: {
          'Adult Asthma (16+ years)': `Management:
          • Position: sitting/comfort position
          • Oxygen if SpO2 <92%
          • Salbutamol pMDI: 4-12 puffs via spacer, 4 breaths per puff
          • If severe: Salbutamol nebulised 10mg (2 ampules) with 8L O2
          • Ipratropium 500mcg (2 nebules) if severe
          • If unresponsive and has pulse: ventilate 5-8x per minute`,
          'Paediatric Asthma': `12-15 years:
          • Oxygen if SpO2 <96%
          • Salbutamol pMDI: 4-12 puffs or nebulised 5mg
          • Ipratropium 500mcg if severe
          
          6-11 years:
          • Same as above but Ipratropium 250mcg
          
          2-5 years:
          • Salbutamol pMDI: 2-6 puffs or nebulised 2.5mg
          • Ipratropium 250mcg if severe`,
          'Thunderstorm Asthma': `If suspected and no improvement despite Salbutamol + Ipratropium:
          • Adrenaline IM (Epi-Pen)
          • 0.3mg if >20kg
          • 0.15mg if <20kg
          • Call for ambulance immediately`
        }
      },
      {
        id: 'trauma',
        title: 'Trauma',
        icon: <User className="w-5 h-5" />,
        content: {
          'General Trauma': `Principles:
          • Maintain head in neutral position
          • Control major haemorrhage first
          • Hypothermia prevention is critical
          • Systematic head-to-toe assessment
          
          Haemorrhage Control:
          • Apply pad and pressure
          • Combat Application Tourniquet if uncontrollable
          • Quickclot trauma pad/gauze for wounds
          • Pelvic splint for obvious pelvic fractures`,
          'Head Trauma': `Time Critical Criteria:
          • GCS <13
          • Penetrating head injury
          • >5 minutes loss of consciousness
          • Skull fracture
          • Blood/CSF from ears/nose
          • Battle sign or raccoon eyes
          • Multiple vomits
          • Seizure activity
          • Worsening symptoms`,
          'Spinal Trauma': `Spinal Immobilisation Criteria:
          • Major blunt trauma to head/trunk
          • New motor/sensory deficits
          • Midline spinal tenderness
          • Cannot rotate neck 45° left/right
          • Altered consciousness
          • Intoxication
          • Significant distracting injury
          • Age >65 years
          
          Apply cervical collar and spinal immobilisation if criteria met`,
          'Burns': `Time Critical if airway burns (facial swelling, sooty spit, enclosed space)
          
          Management:
          • Cool with clean running water for 20 minutes
          • Stop if temperature <35°C
          • Warm patient, avoid shivering
          • Remove jewellery/clothing unless stuck
          • Cover with longitudinal clingwrap
          • Pain relief as needed`
        }
      },
      {
        id: 'medications',
        title: 'Medications',
        icon: <Book className="w-5 h-5" />,
        content: {
          'Adrenaline': `Indications: Anaphylaxis, Thunderstorm asthma
          Dosing:
          • >5 years and >20kg: 0.3mg IM (Epi-Pen)
          • <6 years or <20kg: 0.15mg IM (Epi-Pen Jr)
          
          Adverse Effects: Arrhythmias, hypertension, anxiety, palpitations`,
          'Salbutamol': `Indications: Difficulty breathing with wheeze/asthma
          
          pMDI Dosing:
          • >5 years: 4-12 puffs, 4 breaths per puff via spacer
          • 2-5 years: 2-6 puffs, 4 breaths per puff via spacer
          
          Nebulised Dosing:
          • >15 years: 10mg initial, 5mg repeat at 5 mins
          • 7-15 years: 5mg initial, 5mg repeat at 20 mins
          • 2-5 years: 2.5mg initial, 2.5mg repeat at 20 mins`,
          'Paracetamol': `Indications: Pain score >0
          
          Adult Dosing:
          • 16-60 years >60kg: 1000mg (2 tablets), repeat at 4 hours
          • >60 years or <60kg or frail: 500mg (1 tablet), repeat at 4 hours
          • 12-15 years: 500mg (1 tablet), repeat at 4 hours
          
          Paediatric: 15mg/kg, repeat at 4 hours (max 4 doses/24 hours)`,
          'Midazolam': `Indications: GCSE >5 minutes or multiple seizures without recovery
          Only for accredited responders
          
          Adult Dosing:
          • >15 years >60kg: 10mg IM, repeat 10mg at 10 mins if needed
          • >15 years <60kg/elderly: 5mg IM, repeat 5mg at 5 mins if needed
          
          Monitor for respiratory depression`,
          'Ondansetron': `Indications: Non-tolerated nausea/vomiting, spinal immobilisation prophylaxis
          
          Dosing:
          • >11 years: 4mg ODT, repeat 4mg at 20 mins if needed (max 8mg)
          • 5-11 years: 4mg ODT (max 4mg)
          • <5 years: 2mg ODT (max 2mg)`
        }
      },
      {
        id: 'timecritical',
        title: 'Time Critical',
        icon: <Clock className="w-5 h-5" />,
        content: {
          'Actual Time Critical': `Vital Signs Outside Normal Range:
          Adult: SpO2 <90%, RR <10 or >30, HR <60 or >120, BP <90, GCS <13
          12-15 years: SpO2 <96%, RR <14 or >26, HR <60 or >120, BP <90, GCS <15
          5-11 years: SpO2 <96%, RR <16 or >34, HR <70 or >135, BP <80, GCS <15
          1-4 years: SpO2 <96%, RR <20 or >40, HR <85 or >150, BP <70, GCS <15
          
          Management: Immediate SitRep, call ambulance, expedite transport`,
          'Emergent Pattern of Injury': `Penetrating trauma (except superficial limb)
          Serious single body region injury
          Significant multi-region injuries
          Limb amputation/threatening injury
          Suspected spinal cord injury
          Burns >10% TBSA (paeds) or >20% TBSA (adult)
          Major compound fracture
          Fractured pelvis`,
          'Emergent Pattern of Illness': `Chest pain of cardiac nature
          Respiratory distress
          Altered consciousness
          Anaphylaxis
          Stroke
          Suspected meningococcal disease
          Undiagnosed severe pain
          Poisoning
          Obstetric emergency`,
          'Potentially Time Critical': `Mechanism + Vulnerability:
          Mechanisms: MCA >60km/hr, motorcycle/cyclist >30km/hr, pedestrian impact, ejection, fall >3m
          Vulnerabilities: Age >55 or <16, pregnancy, poorly controlled HTN, CHF, lung disease, IHD
          
          Need both mechanism AND vulnerability to qualify`
        }
      }
    ];
    
    return sections;
  }, []);

  // Simple fuzzy search implementation
  const performSearch = useMemo(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    documentSections.forEach(section => {
      Object.entries(section.content).forEach(([subTitle, content]) => {
        const searchText = `${section.title} ${subTitle} ${content}`.toLowerCase();
        
        // Simple fuzzy matching - check for partial matches, word proximity
        const words = query.split(' ').filter(word => word.length > 2);
        let score = 0;
        
        words.forEach(word => {
          if (searchText.includes(word)) {
            score += 1;
          } else {
            // Check for partial matches (typo tolerance)
            for (let i = 0; i < searchText.length - word.length + 1; i++) {
              const substring = searchText.substr(i, word.length);
              const similarity = calculateSimilarity(word, substring);
              if (similarity > 0.7) {
                score += similarity * 0.5;
                break;
              }
            }
          }
        });

        if (score > 0) {
          results.push({
            section: section.title,
            subsection: subTitle,
            content: content,
            score: score,
            sectionId: section.id,
            icon: section.icon
          });
        }
      });
    });

    // Sort by relevance score
    results.sort((a, b) => b.score - a.score);
    setSearchResults(results);
  }, [searchQuery, documentSections]);