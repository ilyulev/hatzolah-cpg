import React, { useState, useEffect, useMemo } from 'react';
import { Search, FileText, Stethoscope, Pill, AlertTriangle, Book, Info, Home, ArrowLeft } from 'lucide-react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

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
            matrix[i][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  const documentSections = useMemo(() => {
    const sections = [
      {
        id: 'home',
        title: 'Home',
        icon: <Home className="w-5 h-5" />,
        subsections: [
          {
            id: 'altered-consciousness',
            title: 'Altered Consciousness (Acute)',
            content: `DEFINITION:
This guideline refers to any instance of NEW onset decreased responsiveness.

RECOGNITION - AEIOUTIPS pneumonic for possible differentials:
A - Alcohol intoxication, Arrhythmia
E - Epilepsy (seizure activity or postictal phase), Encephalitis (Hepatic)
I - Insulin (hypoglycaemia or hyperglycaemia)
O - Overdose (GHB, opiates, etc), Oxygen (hypoxia)
U - Underdose (missed medications or withdrawal), Urinary Tract Infection
T - Temperature (hypothermia or hyperthermia), Thirst (extreme dehydration), Trauma
I - Infection (sepsis, meningitis, etc)
P - Pain (severe pain), Perfusion (marked hypotension/bradycardia), Poisoning, Psychiatric condition
S - Stroke/TIA, Syncope (fainting)

MANAGEMENT:
IF patient becomes unresponsive & no pulse: Manage as Cardiac Arrest!

IF inadequate ventilations & has pulse:
• Position: Supine
• IF necessary: Suction airway (don't insert anything past teeth if biting)
• IF breathing ineffectively: Oxygen BVM (8-15L O2)
  - >=15 years: ventilate every 5 seconds (12x per minute)
  - 12-15 years: ventilate every 3-4 seconds (14-26x per minute)
  - 5-11 years: ventilate every 2-3 seconds (16-34x per minute)
  - 1-4 years: ventilate every 2-3 seconds (20-40x per minute)
  - <=1 year: ventilate every 2 seconds (25-55x per minute)

IF adequate ventilations:
• IF NO c-spine concerns: Position lateral
• IF YES c-spine concerns: Position supine
• IF necessary: Suction airway
• Oxygen NRB (10-15L O2)
• SitRep: Hatzolah dispatch + call ambulance
• Thorough VSS including SpO2, BGL, temperature, pupils
• Consider possible causes (AEIOUTIPS) + manage appropriately`
          },
          {
            id: 'airway-obstruction',
            title: 'Airway Obstruction',
            content: `STOP: This guideline is NOT to be used on newborns

IF unconscious & NO pulse: Manage as Cardiac Arrest!
IF unconscious & YES pulse: Manage as per Box A  
IF conscious & ineffective cough: Manage as per Box B  
IF conscious & effective cough: Manage as per Box C

BOX A - IF unconscious & YES pulse:
• Position: Supine
• External chest compressions x5
• Assess for clearance of obstruction
• Reassess for palpable pulse
• IF nil improved & pulse present: Oxygen BVM (8-15L O2), x2 ventilations
• AS required IF pulse present: Repeat 5x compressions + x2 ventilations
• IF necessary: Suction airway

BOX B - IF conscious & ineffective cough:
• IF paediatric patient & safe to do so: Use gravity to assist
• Back blows, up to 5
• IF still obstructed: Chest thrusts, up to 5
• Monitor for clearance/deterioration
• Oxygen NRB (10-15L)
• IF still obstructed: Repeat back blows + chest thrusts

BOX C - IF conscious & effective cough:
• Encourage coughing
• Monitor for clearance/deterioration

ESCALATION: IF no immediate improvement - SitRep + call ambulance`
          },
          {
            id: 'alcohol-intoxication',
            title: 'Alcohol Intoxication',
            content: `DEFINITION:
A disturbance in behaviour or mental function during or after alcohol consumption. Alcohol is a depressant affecting CNS, may lead to inhibition of behaviours, slurred speech, reduction in conscious state, HR and RR.

RECOGNITION (Low Risk Criteria):
• Recent ingestion of ethanol (alcohol)
• Differentials excluded
• No other acute medical conditions
• Has capacity to make own decisions
• Able to ambulate
• Competent sober adult able to care for patient in safe place
• NO red flag criteria met
• Patient is normothermic
• Exclusion of other differentials (AEIOUTIPS)

MANAGEMENT:
• Remain with sober adult
• IF necessary: Manage as per Altered Conscious State (Acute)
• IF necessary: Manage as per Nausea/Vomiting
• Safety Netting:
  - Advise not to drink more alcohol until recovered
  - Sleep on side, keep warm, low stimulus environment
  - Avoid mobilising
  - Maintain hydration and nutrition
  - Take paracetamol for mild pain as required
  - Have sober adult stay with patient
  - Call ambulance if conscious state deteriorates, vomits when supine and doesn't clear airway, severe pain, no improvement over 2-4 hours

NOTE: This CPG is for 16 years and over. Patients not fitting low-risk criteria will be escalated to Ambulance Victoria.`
          },
          {
            id: 'anaphylaxis',
            title: 'Anaphylaxis',
            content: `DEFINITION:
A severe, potentially life-threatening, systemic hypersensitivity reaction. Typically caused by excessive immune system response to an antigen normally harmless to humans.

RECOGNITION - R.A.S.H criteria:
IF sudden onset symptoms (usually within 30 minutes, may be up to 4 hours)
& symptoms from 2 or more of following categories:

R - Respiratory: SOB, wheeze, cough, stridor
A - Abdominal: Nausea, vomiting, abdominal cramps, diarrhoea  
S - Skin/Mucosal: Hives, welts, flushing, angioedema
H - Hypotension: sBP <=90

OR isolated hypotension (sBP <=90) & exposure to KNOWN antigen
OR isolated respiratory distress & exposure to KNOWN antigen

Example antigens: Insect stings (bees, wasps), foods (peanuts, shellfish, dairy), medications (antibiotics, anaesthetics), exercise-induced, idiopathic

MANAGEMENT:
IF patient becomes unresponsive & ventilating inadequately:
• Position: Supine
• Ventilate: Oxygen BVM (8-15L O2) - age-appropriate rates
• SitRep: Hatzolah dispatch + call ambulance

General Management:
• Avoid standing/walking patient
• IF altered conscious OR hypotensive: Position supine
• ELSE IF breathing difficulties: Position sitting/tripoding
• IF safe/possible: Remove antigen (e.g. bee stinger)
• Adrenaline IM (Epi-Pen): 0.3mg if >=20kg, 0.15mg if <=20kg
• IF worsens OR no change at 5 mins: Consult clinician for repeat
• IF conscious & dyspnoea: Oxygen NRB (10-15L O2)
• IF wheezing: Salbutamol nebulised (8L O2)
• REGARDLESS of severity/improvement: Transport to hospital

NOTE: Adrenaline saves lives! NEVER delay adrenaline for other medications. Hospital observation required minimum 4 hours.`
          },
          {
            id: 'asthma-adult',
            title: 'Asthma - Adult (16+ years)',
            content: `DEFINITION:
Chronic respiratory condition characterized by acute episodes of airway swelling, constriction and hyper mucus secretion. Can lead to wheezing, difficulty breathing, chest tightness, coughing and in extreme cases respiratory arrest and death.

Triggers: Allergens (pollens, fur), exercise, respiratory infections, weather (thunderstorm asthma), medications (NSAIDs), irritants (pollution, fumes)

RECOGNITION:
IF difficulty breathing & wheezing
IF difficulty breathing & asthma history

MANAGEMENT:
IF patient becomes unresponsive & no pulse: Manage as Cardiac Arrest!
IF patient becomes unresponsive & has pulse:
• Position: Supine
• Ventilate once every 8-12 seconds (5-8x per minute): Oxygen BVM (8-15L O2)

General Management:
• Minimise patient exertion
• IF conscious: Position sitting/position of comfort
• IF altered conscious: Position supine
• IF conscious & SpO2 <=92%: Oxygen face mask (8L O2)

Mild/Moderate Treatment:
• IF pMDI available: Salbutamol pMDI via spacer
  - 4 to 12 doses, 4 breaths for each dose
  - UNTIL difficult breathing relieved, repeat at 20 mins
• IF mild & responds to treatment: Use VVED as minimum

Severe Treatment:
• IF no pMDI OR severe: Salbutamol nebulised (8L O2)
  - 10mg (2 nebs), repeat 5mg (1 neb) at 5 mins until breathing relieved
• IF severe: Ipratropium nebulised (8L O2) - 500mcg (2 nebules)
• IF severe respiratory distress despite Salbutamol: Consider anaphylaxis

THUNDERSTORM ASTHMA:
IF suspected & nil improvement despite Salbutamol + Ipratropium & clinician unavailable:
• Adrenaline IM (Epi-Pen): 0.3mg if >=20kg, 0.15mg if <=20kg

ESCALATION: IF moderate, severe OR thunderstorm - Call Ambulance/000`
          },
          {
            id: 'cardiac-arrest',
            title: 'Cardiac Arrest',
            content: `DEFINITION:
Heart's sudden inability to pump blood effectively around the body. Without immediate intervention leads to death typically within minutes.

RECOGNITION:
Three signs of cardiac arrest discovered during primary survey:
• No response
• No/ineffective breathing (e.g. agonal)  
• No pulse

PRIMARY SURVEY & MANAGEMENT:
D - Dangers: Scene safety? Do NOT enter unsafe scene
R - Response: Response to voice/pain?
S - Send for help: Call Ambulance/000, request backup
A - Airway: C-spine injury? Patency? Align in neutral position
B - Breathing: Breathing effectively?
C - Circulation: Pulse? Major bleeding? Direct pressure major bleed

IF possible: Gain 360° access to patient

IF TRAUMATIC ARREST:
• IF pelvic fracture: Pelvic splint
• IF required: Haemostatic dressing
• IF required: CAT tourniquet

CPR & DEFIBRILLATION:
• Apply defibrillator: Age appropriate pads
• Follow AED/defibrillator instructions
• IF shock advised: Ensure NO ONE touching patient, press shock
• CPR compressions 100-120 per minute
  - IF >=4 years old: 2 hands technique
  - IF <=5 years old: 1 hand technique

VENTILATION RATIOS:
• IF >=15 years old OR single officer: BVM 15L O2 at 30:2, consider LMA
• IF <=16 years old & multiple officers: BVM 15L O2 at 15:2, consider LMA

• Repeat EVERY 2 minutes from defibrillation + CPR
• IF multiple officers: Alternate CPR responder every 2 minutes
• WHILE AED analysing rhythm: Check for pulse (<=10 seconds)

RETURN OF SPONTANEOUS CIRCULATION (ROSC):
IF pulse returns:
• Stop CPR/resuscitation
• IF breathing ineffectively: Oxygen BVM (15L O2) - age appropriate rates
• Continuously monitor for re-arrest
• IF accredited: 12 Lead ECG
• Expedite transport

NOTE: In traumatic cardiac arrest, managing correctable causes is priority: haemorrhage control, airway & breathing management, pelvic splinting. Keep interruptions to compressions at absolute minimum.`
          },
          {
            id: 'cardiac-chest-pain',
            title: 'Cardiac Chest Pain / Discomfort',
            content: `DEFINITION:
Chest pain originating from heart or surrounding structures. Often associated with Acute Coronary Syndrome (ACS) - spectrum of conditions associated with sudden blockage of coronary arteries and reduced blood flow to heart muscle. Time critical and life-threatening.

RECOGNITION:
Cardiac chest pain characteristics increasing suspicion:
• History of similar pain during previous cardiac events
• Pain radiating to shoulder, arm, jaw, neck, upper abdomen or back
• Pain worse on exertion (walking, climbing stairs)
• Pain constant at rest (not worse when coughing)
• Pain associated with active vomiting
• Pain associated with sweating

Risk factors increasing likelihood of cardiac origin:
• Age >=40
• Obesity/poor diet/poor exercise
• Smoking
• History of hypertension/high cholesterol
• History of diabetes
• Family/genetic history of cardiac events

When in doubt, "payoff principle" - treat as if cardiac.

MANAGEMENT:
• SitRep: Hatzolah dispatch + call ambulance (treat as time critical)
• IF SpO2 <=92%: Oxygen PRN
• IF suspecting cardiac chest pain: Aspirin 300mg oral
• IF pain >=2: GTN 300mcg sublingual/buccal
  - IF pain >=2 & sBP >=100: Repeat at 5 min intervals
  - Maximum: No maximum within reason
  - Reassess BP and side effects after each dose
  - IF sBP <=100 OR side effects: Remove tablet + rinse mouth
• IF pain remains >=3: Methoxyflurane 3mL whistle
  - IF required: Repeat at 25 mins (continuous use)
  - Maximum: 6mL (2 vials) in 24 hour period if no side effects`
          },
          {
            id: 'dehydration',
            title: 'Dehydration',
            content: `DEFINITION:
Detrimental reduction of amount of water in the body.

RECOGNITION:
Less than adequate perfusion as per Perfusion Status Assessment.
Patient has less than adequate perfusion IF 2 or more criteria outside adequate range:

Adequate: Warm/pink/dry skin, pulse 60-100, sBP >=100, alert & orientated
<=Adequate: Cool/pale/clammy skin, pulse <=50 or >=100, sBP <=100, alert or altered
No Perfusion: Cool/pale/clammy skin, no pulse, unable to record BP, unconscious

Symptoms may include:
• Poor skin turgor, poor fluid intake vs fluid loss
• Postural tachycardia & hypotension, decreased urination
• Altered conscious state/fatigue, dry mouth & tongue
• Postural dizziness, decreased sweating

Causes may include:
• Hot weather, significant vomiting/sweating
• Hyperglycaemia, psychostimulant overdose
• Self-neglect, insufficient social support

MANAGEMENT:
• IF able to tolerate oral fluids: Encourage patient to drink water
• IF <=adequate PSA due to dehydration: Call Ambulance/000
• IF <=adequate PSA due to dehydration & unable to tolerate oral fluids:
  - Gain IV access: Normal Saline IV (only accredited responders)
  - Administer lower doses to elderly or patients with renal/heart failure

DOSING:
>=15 years old & elderly OR renal OR heart failure: 500mL IV (titrate to response)
>=15 years old & NOT elderly/NO renal OR heart failure: 1000mL IV (titrate to response)
Maximum: 500mL or 1000mL respectively`
          },
          {
            id: 'hypoglycaemia',
            title: 'Hypoglycaemia',
            content: `DEFINITION:
Condition characterised by low blood sugar levels.

Causes include:
• Insulin/oral hypoglycaemic medication overdose
• Skipped meals/fasting/starvation
• Excessive physical activity
• Excessive alcohol consumption
• Certain illnesses (e.g. sepsis)

Symptoms may include:
• Altered conscious state/confusion, irritability/abnormal behaviour
• Sweaty/pale skin, nausea/vomiting
• Slurred speech/difficulty speaking, headache/blurred vision
• Shakiness/tremors, seizures

RECOGNITION:
Use this guideline IF Blood Glucose Level (BGL) <=4 mmol/L

MANAGEMENT:
• IF not responding: Call Ambulance/000
• IF responding & can swallow: Glucose Paste 15G oral
  (Never administer oral medications to patients in altered conscious state!)
• IF NOT responding OR can't swallow: Glucagon IM
  (Only accredited responders may administer Glucagon!)
• Recheck BGL after 5 minutes
• IF symptoms continue & BGL >=4: Consider other causes (AEIOUTIPS)
• ONCE can swallow safely: Advise eat long lasting carbohydrates within 20 minutes (sandwich, fruit, glass of milk)

GLUCAGON DOSING:
>=8 years old: 1MG IM
<=8 years old: 0.5MG IM

ESCALATION: IF no improvement - Call Ambulance/000

REFER TO GP if ALL following criteria met:
• GCS fully returned to patient's normal baseline
• Patient declining ambulance
• Known pre-existing diagnosis of diabetes
• Only oral glucose required to correct BGL
• Known cause of hypoglycaemia episode
• No injury or seizure occurred
• Patient willing/able to eat long lasting carbohydrates
• Patient NOT pregnant
• NONE of following risks: Unwitnessed onset, on oral hypoglycaemic medication, medication overdose, suspected cause requires investigation
• Patient able to be monitored by responsible adult for at least 4 hours

WARNING: Severe hypoglycaemia may cause aggressive behaviour - consider scene safety!`
          },
          {
            id: 'seizure',
            title: 'Seizure',
            content: `DEFINITION:
Sudden, uncontrolled electrical disturbance in brain causing changes in behaviour, movements, feelings and consciousness.

RECOGNITION:
Seizures can present due to wide variety of causes and symptoms. Differentiating types and causes in pre-hospital environment can be difficult. When in doubt, err on side of caution.

Midazolam may ONLY be administered by accredited responders when one of two criteria met:
1. Ongoing generalised tonic-clonic movements & altered conscious state lasting 5 or more minutes
2. Multiple seizures without full recovery of conscious state in between

MANAGEMENT:
• IF soiled airways: Suction airways
• IF breathing ineffectively: Oxygen BVM (8-15L O2) - age appropriate rates
• IF breathing adequately: Oxygen NRB (10-15L O2)
  - ONLY IF adequate perfusion: Titrate down to SpO2 92-96%

SEIZURE MANAGEMENT:
• SitRep: Hatzolah dispatch + call ambulance
• Protect patient from injury
• IF risk of injury: Pillow/pad head
• Do NOT forcibly restrict patient's body from convulsing
• IF available (prescribed medications): Assist carers to administer seizure plan
• IF meeting GCSE criteria: Midazolam IM (accredited responders only)
• Carefully monitor respiratory status

MIDAZOLAM DOSING (GCSE >=5 mins OR multiple GCSE):
>=15 years old & elderly/frail OR <=60 kgs: 5mg IM, repeat 5mg at 5 mins if required (max 10mg)
>=15 years old & NOT elderly/frail & >=60 kgs: 10mg IM, repeat 10mg at 10 mins if required (max 20mg)

Multiple GCSE = multiple tonic clonic seizures occurring WITHOUT full recovery to patient's normal baseline between seizures.

NOTE: Most seizures will self-terminate. Monitor for respiratory depression with Midazolam.`
          },
          {
            id: 'stroke-acute',
            title: 'Stroke (Acute)',
            content: `DEFINITION:
Stroke occurs when there is blockage to blood supply of part of brain OR when blood vessel in brain bursts. Brain cells deprived of oxygen and nutrients rapidly leading to potentially irreversible brain damage or death.

RECOGNITION - F.A.S.T:
Acute stroke suspected when ANY of following signs/symptoms occur:
F - Facial droop: One side of face doesn't move as well as other
    (Assess by asking patient to smile or show teeth)
A - Arm/Limb weakness: One sided limb weakness or arm drift
    (Assess by asking patient to hold arms straight for 10s & squeeze fingers)
S - Speech deficit: Slurs words, says incorrect words or unable to speak
    (Assess by asking patient to repeat "you can't teach an old dog new tricks")

& these signs/symptoms existed for <=24 hours
& Blood Glucose Level (BGL) is normal (>=4 mmol/L)

STROKE HISTORY:
• What time were stroke symptoms first noticed? (as precisely as possible)
• When was patient last known/seen to be well? (stroke symptom free)
• Have any symptoms occurred previously? If yes - what caused them?
• Have they had stroke before?
• Are they currently drug or alcohol affected?

MANAGEMENT:
• IF unconscious: Manage per unconscious patient guideline
• Treat as time critical!
• ONLY IF SpO2 <=92%: Oxygen PRN
• Assess BGL
• IF BGL <=4: Manage hypoglycaemia then re-evaluate for stroke
• Support all limbs
• SitRep: Hatzolah dispatch + call ambulance
• REGARDLESS of severity/improvement: SitRep + call ambulance

Additional symptoms that may be caused by strokes:
• Headache (severe/sudden onset), impaired gait (sudden onset)
• Vertigo (dizziness, nausea, vomiting), altered conscious state
• Hypertension (severe/sudden onset)

Possible stroke mimics:
• Drug/alcohol intoxication, brain tumour
• Seizure/postictal phase, migraine
• Middle ear disorder/vertigo, syncope

NOTE: In cases where patient wakes up with stroke symptoms, time of onset taken from when patient last seen well, NOT from time of awakening. Stroke symptoms can fluctuate/be intermittent - transport ALL potential stroke patients regardless of improvement or resolution.`
          }
        ]
      },
      {
        id: 'assessments',
        title: 'Assessments',
        icon: <Stethoscope className="w-5 h-5" />,
        subsections: [
          {
            id: 'vital-signs',
            title: 'Acceptable Vital Sign Values',
            content: `AGE CATEGORY | WEIGHT | AVPU/GCS | RR | SpO2 | HR | BP
<=24 hours Newborn | 3.5 kg | A / 15 | 25-60 | >=95% | 110-170 | >=60
<=3 months Small Infant | 6 kg | A / 15 | 25-60 | >=95% | 110-170 | >=60
3-12 months Large Infant | 8 kg | A / 15 | 25-55 | >=95% | 105-165 | >=65
1 year Small Child | 10 kg | A / 15 | 20-40 | >=95% | 85-150 | >=70
2 years Small Child | 12 kg | A / 15 | 20-40 | >=95% | 85-150 | >=70
3-4 years Small Child | 16-18 kg | A / 15 | 20-40 | >=95% | 85-150 | >=70
5-11 years Medium Child | 20-36 kg | A / 15 | 16-34 | >=95% | 70-135 | >=80
12-15 years Adolescent | Estimate | A / 15 | 14-26 | >=95% | 60-120 | >=90
>=15 years Adult | Estimate | 13-15 | 12-30 | >=92% | 50-120 | >=90

IMPORTANT:
• ANY deviation from normal VSS is a concern and should NOT be discounted
• Patients with ANY vital signs persistently outside ranges must be escalated to Ambulance Victoria
• Patients with borderline vital signs must use VVED as minimum`
          },
          {
            id: 'clinical-flags',
            title: 'Clinical Flags',
            content: `RED FLAG CRITERIA - ADULTS & PAEDIATRICS:
• ANY vital sign outside of Acceptable Vital Sign Values
• Stridor
• First presentation seizure
• Anaphylaxis (including resolved anaphylaxis)
• Acute coronary syndrome (even if resolved)
• Ectopic pregnancy
• Primary obstetric issue
• Stroke / TIA
• Sudden onset headache
• Unable to walk (when usually able to walk)
• Post-tonsillectomy bleeding (up to 14 days post-operation)

RED FLAG CRITERIA - PAEDIATRICS ONLY:
• Unexplained pain
• Second presentation within 48 hours to AV or Dr for related complaint
• Febrile >=38°c in small infants (up to 3 months old)
• Testicular pain
• Ingestion/inhalation of toxic substance
• Inhalation of foreign body
• Non blanching rash

YELLOW FLAG CRITERIA:
• Ongoing patient or carer concern
• Infection not responding to community based care
• Immunocompromised with suspected infection
• Surgical procedure within past 14 days
• Significant unexplained pain (>=5)
• Syncope (asymptomatic, normal vital signs, normal ECG)
• Abdominal pain
• Mental health`
          },
          {
            id: 'clinical-approach',
            title: 'Clinical Approach',
            content: `STOP - Dangers & Safety:
• PPE / Standard precautions
• Dynamic risk assessment / Awareness of personal safety

Rapid assessment / PAT: Does the patient appear WELL or UNWELL?

PRIMARY SURVEY:
-R- Response: Yes / No?
-S- Send for help: SitRep Hatzolah, Call ambulance + request backup
-A- Airway: C-spine concerns?
-B- Breathing: Adequate?
-C- Circulation + Major bleeding?
-D- Disability: AVPU
-E- Exposure: Environment?

ASSESS:
• Ask About: Situation, signs + symptoms, allergies, medications, past medical history
• Assessment Tools: PSA, RSA, GCS, Medical time critical, Trauma time critical
• Assessment Equipment: SpO2, Temperature, BGL, Other VSS

PAUSE & PLAN:
Call 000 for ALL patients outside of Hatzolah's clinical scope, requiring hospital care OR as directed by Hatzolah CPG.`
          },
          {
            id: 'pat-assessment',
            title: 'Paediatric Assessment Triangle',
            content: `The PAT consists of three components:
• Appearance - level of alertness, muscle tone, body position
• Work of breathing - chest movement evaluation  
• Circulation - skin colour assessment

This assessment should not take more than a few seconds.

If the child appears well with no signs of serious trauma, approach with a calm demeanour whilst explaining your actions to the parents and child.

If a well-appearing patient has experienced a high-risk mechanism of injury, consider the patient potentially unstable due to risk of serious internal injuries.

For children with poor appearance OR evidence of significant injury, proceed immediately to primary survey including any lifesaving interventions.`
          },
          {
            id: 'conscious-state',
            title: 'Conscious Status Assessments',
            content: `AVPU Assessment:
• Alert = A
• Responding to voice = V  
• Responding to pain = P
• Unresponsive = U

AVPU is quick and simple, appropriate for determining conscious state during initial assessment. Preferred tool for assessing conscious state in children.

Glasgow Coma Scale (GCS):
• Maximum score: 15 (fully alert and orientated)
• Minimum score: 3 (completely unresponsive)

Eye Opening (E): Spontaneous(4), To voice(3), To pain(2), None(1)
Verbal Response (V): Orientated(5), Confused(4), Inappropriate words(3), Incomprehensible sounds(2), None(1)  
Motor Response (M): Obeys commands(6), Localises to pain(5), Withdraws from pain(4), Flexion to pain(3), Extension to pain(2), None(1)

Total = E + V + M`
          },
          {
            id: 'respiratory-assessment',
            title: 'Respiratory Status Assessment',
            content: `RECOGNITION Categories: Normal, Mild, Moderate, Severe

Conscious State: Alert -> Alert -> Alert/Altered -> Altered/Unconscious
Respiratory Rate: 12-16 -> 16-20 -> >=20 -> >=20 or <=8
Oxygen (SpO2): >=95% -> >=95% -> <=95% -> <=90%
Speech: Clear, Full Sentences -> Short Sentences -> Words -> None
Skin: Normal -> Normal -> Pale, Sweaty -> Pale, Sweaty +/- Cyanosis
Work of Breathing: Normal -> Slight -> Marked -> Marked
Appearance: Calm, Quiet -> Calm/Anxious -> Distressed/Anxious -> Exhausted/Fighting to breathe

SIGNS OF RESPIRATORY DISTRESS IN CHILDREN:
• Tachypnoea
• Chest wall retraction
• Use of accessory wall muscles
• Tracheal tugging
• Abdominal protrusion

SIGNS OF HYPOXIA IN CHILDREN:
Infants (0-12 months): Lethargy, Bradycardia, Hypotension, Apnoea, Pallor
Children (1-15 years): Restlessness, Tachycardia, Tachypnoea, Cyanosis, Bradycardia`
          },
          {
            id: 'perfusion-assessment',
            title: 'Perfusion Status Assessment',
            content: `Perfusion refers to the cardiovascular system's capacity to provide tissues with sufficient oxygen and nutrients while removing carbon dioxide and waste products.

RECOGNITION:
Patient has less than adequate perfusion IF 2 or more criteria are outside adequate range:

Adequate Perfusion:
• Skin: Warm, Pink, Dry
• Pulse: 60 to 100
• sBP: >=100 sBP
• Conscious State: Alert & Orientated

<= Adequate Perfusion:
• Skin: Cool, Pale, Clammy
• Pulse: <=50 OR >=100
• sBP: <=100 sBP
• Conscious State: Alert OR Altered

No Perfusion:
• Skin: Cool, Pale, Clammy
• Pulse: No pulse
• sBP: Unable to record
• Conscious State: Unconscious

MANAGEMENT:
IF <= Adequate perfusion:
• Avoid standing/walking patient
• Position: Supine/legs raised
• SitRep: Hatzolah dispatch + call ambulance`
          },
          {
            id: 'pain-assessment',
            title: 'Pain Assessments',
            content: `WONG-BAKER FACES PAIN RATING SCALE:
For patients 3 years or older who are able to understand the tool and choose a face that best illustrates their physical pain.

NOT intended to be used by a third person to assess patient's pain on their behalf.

DOLOR Assessment:
• D - Description of the pain?
• O - Onset time of the pain?
• L - Location of the pain?
• O - Other symptoms associated with the pain?
• R - Relief from the pain? (positional relief, home medications tried)
• S - Severity / Pain score?

Use 0-10 pain scale for adults and older children.
Use Wong-Baker FACES for children 3+ years who cannot understand numerical scale.`
          },
          {
            id: 'weight-calculations',
            title: 'Weight Calculations',
            content: `PAEDIATRIC WEIGHT CALCULATIONS:

<= 24 hours: 3.5 kg
3 months: 6 kg
6 months: 8 kg
1-9 years: Age x 2 + 8 kg
10-11 years: Age x 3.3 kg
>= 11 years: Estimate based on patient size

For children, various treatments are based on body weight such as drug doses, defibrillation joules and fluid volume. It is acceptable to ask a parent the patient's weight.

However, if weight is unknown, it can be estimated using the above calculations.`
          },
          {
            id: 'time-critical',
            title: 'Time Critical Guidelines',
            content: `PRINCIPLES:
• Any patient meeting ANY Time Critical Criteria MUST be advised hospital transport
• Hatzolah crew MUST consult either AV Clinician OR Hatzolah Clinical Operations Manager for patients meeting ANY Time Critical Criteria refusing hospital transport
• Provide immediate situation report to dispatch for any patient meeting ANY time critical criteria

TIME CRITICAL DEFINITIONS:

ACTUAL: Patient was in actual physiological distress (altered conscious state, inadequate perfusion or respiratory distress)

EMERGENT: Patient not physiologically distressed, but has "pattern of actual injury/illness" with high probability of deteriorating to actual physiological distress

POTENTIAL: Patient not physiologically distressed, no significant pattern of injury/illness, but has "mechanism of injury/illness" with potential to deteriorate

ACTUAL TIME CRITICAL - VSS:
Adult: SpO2 <=90%, RR <=10 or >=30, HR <=60 or >=120, BP <=90, GCS <=13
12-15 years: SpO2 <=96%, RR <=14 or >=26, HR <=60 or >=120, BP <=90, GCS <=15
5-11 years: SpO2 <=96%, RR <=16 or >=34, HR <=70 or >=135, BP <=80, GCS <=15
1-4 years: SpO2 <=96%, RR <=20 or >=40, HR <=85 or >=150, BP <=70, GCS <=15

EMERGENT TIME CRITICAL - PATTERN OF INJURY:
• Penetrating trauma (except isolated superficial limb injury)
• Serious injury to single body region requiring specialised care
• Significant injuries involving more than one body region
• Limb amputation OR limb threatening injury
• Suspected spinal cord injury OR spinal fracture
• Burns: >=10% TBSA (paediatrics), >=20% TBSA (adults)
• Major compound fracture OR open dislocation
• Fractured pelvis

EMERGENT TIME CRITICAL - PATTERN OF ILLNESS:
• Chest pain of cardiac nature
• Respiratory distress
• Altered consciousness
• Anaphylaxis
• Stroke
• Suspected meningococcal disease
• Undiagnosed severe pain
• Poisoning
• Obstetric emergency

POTENTIALLY TIME CRITICAL:
Requires BOTH mechanism of injury AND vulnerability:
Mechanisms: MCA >=60km/hr, motorcycle/cyclist >=30km/hr, pedestrian impact, fall >=3m
Vulnerabilities: Age >=55 or <=16, pregnancy, poorly controlled HTN, CHF, lung disease`
          },
          {
            id: 'safety-netting',
            title: 'Safety Netting',
            content: `Safety netting refers to providing patients and caregivers with advice and instructions for self-care as well as providing adequate contingency plan in case of unexpected deterioration.

MANAGEMENT:
• Ensure minimum of 2x VSS covering span of at least 15 minutes
• Discuss results of assessment with patient and implications
• IF ANY abnormal findings found: Discuss them with patient
• Advise limitations of prehospital assessment and associated risks
• Discuss likely course of illness
• IF advised transport & patient refusing: Consult clinician
• Explain care pathway options including risks and benefits
• Provide recommended course of action if appropriate
• Ensure patient agrees and consents with plan (voluntary, informed AND relevant)
• Share plan between Hatzolah staff, patient and family/carers
• Ensure plan is implementable (patient has adequate healthcare literacy)
• Confirm patient/carers understand care plan
• Explain safety netting/contingency plan in case of deterioration
• Ask about and address any further questions or concerns
• Have patient sign PCR
• Document advice given

ESCALATION OF CARE:
IF concerns, further advice required, patient refusing against advice or Ambulance/VVED pathway not being used: Contact Clinical Operations Manager via mobile phone

ANY patients NOT being attended by Ambulance Victoria should at least have a VVED consult attended.`
          },
          {
            id: 'ventilation-rates',
            title: 'Ventilation Rates',
            content: `INEFFECTIVE BREATHING:
• IF >=15 years: ventilate once every 5 seconds OR 12x per minute
• IF 12-15 years: ventilate once every 3-4 seconds OR 14-26x per minute  
• IF 5-11 years: ventilate once every 2-3 seconds OR 16-34x per minute
• IF 1-4 years: ventilate once every 2-3 seconds OR 20-40x per minute
• IF <=1 year: ventilate once every 2 seconds OR 25-55x per minute

ASTHMA - UNRESPONSIVE WITH PULSE:
• IF >=11 years: ventilate once every 8-12 seconds OR 5-8x per minute
• IF 5-11 years: ventilate once every 5-6 seconds OR 10-14x per minute
• IF 2-4 years: ventilate once every 4-5 seconds OR 12-15x per minute`
          }
        ]
      },
      {
        id: 'medications',
        title: 'Medications',
        icon: <Pill className="w-5 h-5" />,
        subsections: [
          {
            id: 'adrenaline',
            title: 'Adrenaline',
            content: `INDICATIONS:
• Anaphylaxis
• Thunderstorm asthma

CONTRAINDICATIONS:
• Hypovolaemic shock without adequate fluid replacement

PRECAUTIONS:
• Do NOT delay immediate adrenaline administration in patients experiencing anaphylaxis
• Consider consulting for reduced doses for: Elderly/frail patients, Cardiovascular disease PHx, MAOIs current/recent use
• Consider consulting for increased doses for: Beta blockers current/recent use

ADVERSE EFFECTS:
• Arrhythmias (sinus tachycardia, SVT, VT)
• Myocardial infarction exacerbation
• Hypertension
• Anxiety
• Palpitations
• Pupillary dilatation

DOSING:
>=5 years old & >=20 kgs: 0.3 mg IM (Epi-Pen)
<=6 years old OR <=20 kgs: 0.15 mg IM (Epi-Pen Jr)
Route: Intramuscular (IM) Epi-Pen
Repeat Dose(s): Consult
Maximum: Consult`
          }
        ]
      },
      {
        id: 'alerts',
        title: 'Alerts',
        icon: <AlertTriangle className="w-5 h-5" />,
        subsections: [
          {
            id: 'medical-emergencies',
            title: 'Medical Emergencies',
            content: `This section contains critical emergency protocols and time-sensitive procedures. Content will be structured to provide immediate access to life-saving information.`
          }
        ]
      },
      {
        id: 'halakha',
        title: 'Halakha',
        icon: <Book className="w-5 h-5" />,
        subsections: [
          {
            id: 'halachic-guidelines',
            title: 'Halachic Guidelines',
            content: `This section will contain halachic references for Hatzolah operations and emergency medical decisions according to Jewish law.`
          }
        ]
      },
      {
        id: 'info',
        title: 'Info',
        icon: <Info className="w-5 h-5" />,
        subsections: [
          {
            id: 'acronyms',
            title: 'Acronyms & Abbreviations',
            content: `This section will contain a comprehensive list of medical acronyms and abbreviations used in emergency medicine.`
          },
          {
            id: 'cpr-metronome',
            title: 'CPR Metronome',
            content: `This section will contain a metronome tool for maintaining proper CPR compression rates (100-120 BPM).`
          },
          {
            id: 'pcr-guidelines',
            title: 'PCR Writing Guidelines',
            content: `This section will contain guidelines and templates for writing Patient Care Records (PCRs).`
          }
        ]
      }
    ];
    
    return sections;
  }, []);

  const performSearch = useMemo(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    documentSections.forEach(section => {
      section.subsections?.forEach(subsection => {
        const searchText = `${section.title} ${subsection.title} ${subsection.content}`.toLowerCase();
        
        const words = query.split(' ').filter(word => word.length > 2);
        let score = 0;
        
        words.forEach(word => {
          if (searchText.includes(word)) {
            score += 1;
          } else {
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
            subsection: subsection.title,
            content: subsection.content,
            score: score,
            sectionId: section.id,
            subsectionId: subsection.id,
            icon: section.icon
          });
        }
      });
    });

    results.sort((a, b) => b.score - a.score);
    setSearchResults(results);
  }, [searchQuery, documentSections, calculateSimilarity]);

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const words = query.toLowerCase().split(' ').filter(word => word.length > 2);
    let highlightedText = text;
    
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    return highlightedText;
  };

  useEffect(() => {
    performSearch;
  }, [performSearch]);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedSubsection(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSubsectionSelect = (subsection) => {
    setSelectedSubsection(subsection);
  };

  const handleSearchResultClick = (result) => {
    const section = documentSections.find(s => s.id === result.sectionId);
    const subsection = section?.subsections?.find(sub => sub.id === result.subsectionId);
    setSelectedSection(section);
    setSelectedSubsection(subsection);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hatzolah Clinical Practice Guidelines</h1>
              <p className="text-sm text-gray-600">Version 4.9 - Emergency Medical Reference</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 pb-20">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search guidelines..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-2">
              Found {searchResults.length} results for "{searchQuery}"
            </p>
          )}
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-3 mb-3">
                  {result.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900">{result.section}</h3>
                    <button 
                      onClick={() => handleSearchResultClick(result)}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                    >
                      {result.subsection}
                    </button>
                  </div>
                </div>
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(result.content, searchQuery) 
                  }}
                />
              </div>
            ))}
          </div>
        ) : selectedSubsection ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <button 
                  onClick={() => setSelectedSubsection(null)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back</span>
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <button 
                    onClick={() => handleSectionSelect(selectedSection)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {selectedSection.title}
                  </button>
                  <span>/</span>
                  <span className="text-gray-900">{selectedSubsection.title}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                {selectedSection.icon}
                <h2 className="text-2xl font-bold text-gray-900">{selectedSubsection.title}</h2>
              </div>
              
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedSubsection.content}
              </div>
            </div>
          </div>
        ) : selectedSection ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <button 
                  onClick={() => setSelectedSection(null)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Home</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                {selectedSection.icon}
                <h2 className="text-2xl font-bold text-gray-900">{selectedSection.title}</h2>
              </div>
              
              <div className="grid gap-4">
                {selectedSection.subsections?.map((subsection) => (
                  <button
                    key={subsection.id}
                    onClick={() => handleSubsectionSelect(subsection)}
                    className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{subsection.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {subsection.content.substring(0, 120)}...
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Clinical Practice Guidelines
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Access comprehensive medical guidelines, medication dosing, and emergency protocols. 
              Use the search bar above or navigate through sections using the bottom menu.
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-2">
          <nav className="flex justify-center overflow-x-auto">
            {documentSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionSelect(section)}
                className={`flex flex-col items-center px-3 py-3 text-center transition-colors min-w-0 flex-shrink-0 ${
                  selectedSection?.id === section.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="w-6 h-6 mb-1">
                  {section.icon}
                </div>
                <span className="text-xs font-medium leading-tight">
                  {section.title}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default App;