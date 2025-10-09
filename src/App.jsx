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
    for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
    for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
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
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>This guideline refers to any instance of NEW onset decreased responsiveness.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION - AEIOUTIPS Mnemonic</h3>
<ul class="space-y-1 ml-4">
<li><strong>A</strong> - Alcohol intoxication, Arrhythmia</li>
<li><strong>E</strong> - Epilepsy (seizure activity or postictal phase), Encephalitis (Hepatic)</li>
<li><strong>I</strong> - Insulin (hypoglycaemia or hyperglycaemia)</li>
<li><strong>O</strong> - Overdose (GHB, opiates, etc), Oxygen (hypoxia)</li>
<li><strong>U</strong> - Underdose (missed medications or withdrawal), Urinary Tract Infection</li>
<li><strong>T</strong> - Temperature (hypothermia or hyperthermia), Thirst (extreme dehydration), Trauma</li>
<li><strong>I</strong> - Infection (sepsis, meningitis, etc)</li>
<li><strong>P</strong> - Pain (severe pain), Perfusion (marked hypotension/bradycardia), Poisoning, Psychiatric condition</li>
<li><strong>S</strong> - Stroke/TIA, Syncope (fainting)</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2 text-red-700">⚠️ MANAGEMENT</h3>
<p class="font-semibold mb-3 text-red-600">IF patient becomes unresponsive & no pulse: Manage as Cardiac Arrest!</p>

<div class="mb-4 p-3 bg-white rounded">
<h4 class="font-semibold mb-2">IF inadequate ventilations & has pulse:</h4>
<ul class="space-y-1 ml-4">
<li>• Position: Supine</li>
<li>• IF necessary: Suction airway (don't insert anything past teeth if biting)</li>
<li>• IF breathing ineffectively: Oxygen BVM (8-15L O2)
  <ul class="ml-6 mt-1 text-sm space-y-0.5">
  <li>- ≥15 years: ventilate every 5 seconds (12x per minute)</li>
  <li>- 12-15 years: ventilate every 3-4 seconds (14-26x per minute)</li>
  <li>- 5-11 years: ventilate every 2-3 seconds (16-34x per minute)</li>
  <li>- 1-4 years: ventilate every 2-3 seconds (20-40x per minute)</li>
  <li>- ≤1 year: ventilate every 2 seconds (25-55x per minute)</li>
  </ul>
</li>
</ul>
</div>

<div class="p-3 bg-white rounded">
<h4 class="font-semibold mb-2">IF adequate ventilations:</h4>
<ul class="space-y-1 ml-4">
<li>• IF NO c-spine concerns: Position lateral</li>
<li>• IF YES c-spine concerns: Position supine</li>
<li>• IF necessary: Suction airway</li>
<li>• Oxygen NRB (10-15L O2)</li>
<li>• SitRep: Hatzolah dispatch + call ambulance</li>
<li>• Thorough VSS including SpO2, BGL, temperature, pupils</li>
<li>• Consider possible causes (AEIOUTIPS) + manage appropriately</li>
</ul>
</div>
</div>
</div>`
          },
          {
            id: 'airway-obstruction',
            title: 'Airway Obstruction',
            content: `<div class="space-y-4">
<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<p class="font-bold text-red-700 mb-2">⛔ STOP: This guideline is NOT to be used on newborns</p>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DECISION TREE</h3>
<ul class="space-y-1 ml-4">
<li>• IF unconscious & NO pulse: <strong>Manage as Cardiac Arrest!</strong></li>
<li>• IF unconscious & YES pulse: <strong>Manage as per Box A</strong></li>
<li>• IF conscious & ineffective cough: <strong>Manage as per Box B</strong></li>
<li>• IF conscious & effective cough: <strong>Manage as per Box C</strong></li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">BOX A - IF unconscious & YES pulse:</h3>
<ul class="space-y-1 ml-4">
<li>• Position: Supine</li>
<li>• External chest compressions x5</li>
<li>• Assess for clearance of obstruction</li>
<li>• Reassess for palpable pulse</li>
<li>• IF nil improved & pulse present: Oxygen BVM (8-15L O2), x2 ventilations</li>
<li>• AS required IF pulse present: Repeat 5x compressions + x2 ventilations</li>
<li>• IF necessary: Suction airway</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">BOX B - IF conscious & ineffective cough:</h3>
<ul class="space-y-1 ml-4">
<li>• IF paediatric patient & safe to do so: Use gravity to assist</li>
<li>• Back blows, up to 5</li>
<li>• IF still obstructed: Chest thrusts, up to 5</li>
<li>• Monitor for clearance/deterioration</li>
<li>• Oxygen NRB (10-15L)</li>
<li>• IF still obstructed: Repeat back blows + chest thrusts</li>
</ul>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">BOX C - IF conscious & effective cough:</h3>
<ul class="space-y-1 ml-4">
<li>• Encourage coughing</li>
<li>• Monitor for clearance/deterioration</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<p class="font-semibold">ESCALATION: IF no immediate improvement - SitRep + call ambulance</p>
</div>
</div>`
          },
          {
            id: 'alcohol-intoxication',
            title: 'Alcohol Intoxication',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>A disturbance in behaviour or mental function during or after alcohol consumption. Alcohol is a depressant affecting CNS, may lead to inhibition of behaviours, slurred speech, reduction in conscious state, HR and RR.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION (Low Risk Criteria)</h3>
<ul class="space-y-1 ml-4">
<li>• Recent ingestion of ethanol (alcohol)</li>
<li>• Differentials excluded</li>
<li>• No other acute medical conditions</li>
<li>• Has capacity to make own decisions</li>
<li>• Able to ambulate</li>
<li>• Competent sober adult able to care for patient in safe place</li>
<li>• NO red flag criteria met</li>
<li>• Patient is normothermic</li>
<li>• Exclusion of other differentials (AEIOUTIPS)</li>
</ul>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">MANAGEMENT</h3>
<ul class="space-y-1 ml-4">
<li>• Remain with sober adult</li>
<li>• IF necessary: Manage as per Altered Conscious State (Acute)</li>
<li>• IF necessary: Manage as per Nausea/Vomiting</li>
</ul>

<h4 class="font-semibold mt-3 mb-2">Safety Netting:</h4>
<ul class="space-y-1 ml-4 text-sm">
<li>- Advise not to drink more alcohol until recovered</li>
<li>- Sleep on side, keep warm, low stimulus environment</li>
<li>- Avoid mobilising</li>
<li>- Maintain hydration and nutrition</li>
<li>- Take paracetamol for mild pain as required</li>
<li>- Have sober adult stay with patient</li>
<li>- Call ambulance if conscious state deteriorates, vomits when supine and doesn't clear airway, severe pain, no improvement over 2-4 hours</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<p class="text-sm"><strong>NOTE:</strong> This CPG is for 16 years and over. Patients not fitting low-risk criteria will be escalated to Ambulance Victoria.</p>
</div>
</div>`
          },
          {
            id: 'anaphylaxis',
            title: 'Anaphylaxis',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>A severe, potentially life-threatening, systemic hypersensitivity reaction. Typically caused by excessive immune system response to an antigen normally harmless to humans.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION - R.A.S.H Criteria</h3>
<p class="mb-2">IF sudden onset symptoms (usually within 30 minutes, may be up to 4 hours) & symptoms from 2 or more of following categories:</p>
<ul class="space-y-1 ml-4">
<li><strong>R</strong> - Respiratory: SOB, wheeze, cough, stridor</li>
<li><strong>A</strong> - Abdominal: Nausea, vomiting, abdominal cramps, diarrhoea</li>
<li><strong>S</strong> - Skin/Mucosal: Hives, welts, flushing, angioedema</li>
<li><strong>H</strong> - Hypotension: sBP ≤90</li>
</ul>
<p class="mt-3 font-semibold">OR isolated hypotension (sBP ≤90) & exposure to KNOWN antigen</p>
<p class="font-semibold">OR isolated respiratory distress & exposure to KNOWN antigen</p>
<p class="text-sm mt-2">Example antigens: Insect stings (bees, wasps), foods (peanuts, shellfish, dairy), medications (antibiotics, anaesthetics), exercise-induced, idiopathic</p>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">⚠️ MANAGEMENT</h3>

<div class="mb-4 p-3 bg-white rounded">
<p class="font-semibold mb-2">IF patient becomes unresponsive & ventilating inadequately:</p>
<ul class="ml-4 space-y-1">
<li>• Position: Supine</li>
<li>• Ventilate: Oxygen BVM (8-15L O2) - age-appropriate rates</li>
<li>• SitRep: Hatzolah dispatch + call ambulance</li>
</ul>
</div>

<div class="p-3 bg-white rounded">
<h4 class="font-semibold mb-2">General Management:</h4>
<ul class="ml-4 space-y-1">
<li>• Avoid standing/walking patient</li>
<li>• IF altered conscious OR hypotensive: Position supine</li>
<li>• ELSE IF breathing difficulties: Position sitting/tripoding</li>
<li>• IF safe/possible: Remove antigen (e.g. bee stinger)</li>
<li class="font-bold text-red-600">• Adrenaline IM (Epi-Pen): 0.3mg if ≥20kg, 0.15mg if ≤20kg</li>
<li>• IF worsens OR no change at 5 mins: Consult clinician for repeat</li>
<li>• IF conscious & dyspnoea: Oxygen NRB (10-15L O2)</li>
<li>• IF wheezing: Salbutamol nebulised (8L O2)</li>
<li class="font-semibold">• REGARDLESS of severity/improvement: Transport to hospital</li>
</ul>
</div>

<p class="mt-3 text-center font-bold text-red-700">⚡ Adrenaline saves lives! NEVER delay adrenaline for other medications.</p>
<p class="text-center text-sm mt-1">Hospital observation required minimum 4 hours.</p>
</div>
</div>`
          },
          {
            id: 'asthma-adult',
            title: 'Asthma - Adult (16+ years)',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p class="mb-2">Chronic respiratory condition characterized by acute episodes of airway swelling, constriction and hyper mucus secretion. Can lead to wheezing, difficulty breathing, chest tightness, coughing and in extreme cases respiratory arrest and death.</p>
<p class="text-sm"><strong>Triggers:</strong> Allergens (pollens, fur), exercise, respiratory infections, weather (thunderstorm asthma), medications (NSAIDs), irritants (pollution, fumes)</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION</h3>
<ul class="ml-4 space-y-1">
<li>• IF difficulty breathing & wheezing</li>
<li>• IF difficulty breathing & asthma history</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">⚠️ MANAGEMENT</h3>

<p class="font-semibold mb-2">IF patient becomes unresponsive & no pulse: Manage as Cardiac Arrest!</p>
<p class="font-semibold mb-3">IF patient becomes unresponsive & has pulse:</p>
<ul class="ml-4 space-y-1 mb-4">
<li>• Position: Supine</li>
<li>• Ventilate once every 8-12 seconds (5-8x per minute): Oxygen BVM (8-15L O2)</li>
</ul>

<div class="p-3 bg-white rounded mb-3">
<h4 class="font-semibold mb-2">General Management:</h4>
<ul class="ml-4 space-y-1">
<li>• Minimise patient exertion</li>
<li>• IF conscious: Position sitting/position of comfort</li>
<li>• IF altered conscious: Position supine</li>
<li>• IF conscious & SpO2 ≤92%: Oxygen face mask (8L O2)</li>
</ul>
</div>

<div class="p-3 bg-white rounded mb-3">
<h4 class="font-semibold mb-2">Mild/Moderate Treatment:</h4>
<ul class="ml-4 space-y-1">
<li>• IF pMDI available: Salbutamol pMDI via spacer
  <ul class="ml-6 mt-1 text-sm">
  <li>- 4 to 12 doses, 4 breaths for each dose</li>
  <li>- UNTIL difficult breathing relieved, repeat at 20 mins</li>
  </ul>
</li>
<li>• IF mild & responds to treatment: Use VVED as minimum</li>
</ul>
</div>

<div class="p-3 bg-white rounded mb-3">
<h4 class="font-semibold mb-2">Severe Treatment:</h4>
<ul class="ml-4 space-y-1">
<li>• IF no pMDI OR severe: Salbutamol nebulised (8L O2)
  <ul class="ml-6 mt-1 text-sm">
  <li>- 10mg (2 nebs), repeat 5mg (1 neb) at 5 mins until breathing relieved</li>
  </ul>
</li>
<li>• IF severe: Ipratropium nebulised (8L O2) - 500mcg (2 nebules)</li>
<li>• IF severe respiratory distress despite Salbutamol: Consider anaphylaxis</li>
</ul>
</div>

<div class="p-3 bg-purple-50 rounded border border-purple-400">
<h4 class="font-semibold mb-2">THUNDERSTORM ASTHMA:</h4>
<p class="mb-2">IF suspected & nil improvement despite Salbutamol + Ipratropium & clinician unavailable:</p>
<ul class="ml-4">
<li>• Adrenaline IM (Epi-Pen): 0.3mg if ≥20kg, 0.15mg if ≤20kg</li>
</ul>
</div>

<p class="mt-3 font-semibold">ESCALATION: IF moderate, severe OR thunderstorm - Call Ambulance/000</p>
</div>
</div>`
          },
          {
            id: 'cardiac-arrest',
            title: 'Cardiac Arrest',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Heart's sudden inability to pump blood effectively around the body. Without immediate intervention leads to death typically within minutes.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION</h3>
<p class="mb-2">Three signs of cardiac arrest discovered during primary survey:</p>
<ul class="ml-4 space-y-1">
<li>• No response</li>
<li>• No/ineffective breathing (e.g. agonal)</li>
<li>• No pulse</li>
</ul>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRIMARY SURVEY & MANAGEMENT</h3>
<ul class="space-y-1">
<li><strong>D</strong> - Dangers: Scene safety? Do NOT enter unsafe scene</li>
<li><strong>R</strong> - Response: Response to voice/pain?</li>
<li><strong>S</strong> - Send for help: Call Ambulance/000, request backup</li>
<li><strong>A</strong> - Airway: C-spine injury? Patency? Align in neutral position</li>
<li><strong>B</strong> - Breathing: Breathing effectively?</li>
<li><strong>C</strong> - Circulation: Pulse? Major bleeding? Direct pressure major bleed</li>
</ul>
<p class="mt-2 font-semibold">IF possible: Gain 360° access to patient</p>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">IF TRAUMATIC ARREST:</h3>
<ul class="ml-4 space-y-1">
<li>• IF pelvic fracture: Pelvic splint</li>
<li>• IF required: Haemostatic dressing</li>
<li>• IF required: CAT tourniquet</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">⚠️ CPR & DEFIBRILLATION</h3>

<ul class="ml-4 space-y-2">
<li>• Apply defibrillator: Age appropriate pads</li>
<li>• Follow AED/defibrillator instructions</li>
<li>• IF shock advised: Ensure NO ONE touching patient, press shock</li>
<li>• CPR compressions 100-120 per minute
  <ul class="ml-6 mt-1 text-sm">
  <li>- IF ≥4 years old: 2 hands technique</li>
  <li>- IF ≤5 years old: 1 hand technique</li>
  </ul>
</li>
</ul>

<h4 class="font-semibold mt-3 mb-2">VENTILATION RATIOS:</h4>
<ul class="ml-4 space-y-1">
<li>• IF ≥15 years old OR single officer: BVM 15L O2 at 30:2, consider LMA</li>
<li>• IF ≤16 years old & multiple officers: BVM 15L O2 at 15:2, consider LMA</li>
</ul>

<ul class="ml-4 space-y-1 mt-3">
<li>• Repeat EVERY 2 minutes from defibrillation + CPR</li>
<li>• IF multiple officers: Alternate CPR responder every 2 minutes</li>
<li>• WHILE AED analysing rhythm: Check for pulse (≤10 seconds)</li>
</ul>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2 text-green-700">RETURN OF SPONTANEOUS CIRCULATION (ROSC)</h3>
<p class="font-semibold mb-2">IF pulse returns:</p>
<ul class="ml-4 space-y-1">
<li>• Stop CPR/resuscitation</li>
<li>• IF breathing ineffectively: Oxygen BVM (15L O2) - age appropriate rates</li>
<li>• Continuously monitor for re-arrest</li>
<li>• IF accredited: 12 Lead ECG</li>
<li>• Expedite transport</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<p class="text-sm"><strong>NOTE:</strong> In traumatic cardiac arrest, managing correctable causes is priority: haemorrhage control, airway & breathing management, pelvic splinting. Keep interruptions to compressions at absolute minimum.</p>
</div>
</div>`
          },
          {
            id: 'cardiac-chest-pain',
            title: 'Cardiac Chest Pain / Discomfort',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Chest pain originating from heart or surrounding structures. Often associated with Acute Coronary Syndrome (ACS) - spectrum of conditions associated with sudden blockage of coronary arteries and reduced blood flow to heart muscle. Time critical and life-threatening.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION</h3>
<p class="mb-2 font-semibold">Cardiac chest pain characteristics increasing suspicion:</p>
<ul class="ml-4 space-y-1">
<li>• History of similar pain during previous cardiac events</li>
<li>• Pain radiating to shoulder, arm, jaw, neck, upper abdomen or back</li>
<li>• Pain worse on exertion (walking, climbing stairs)</li>
<li>• Pain constant at rest (not worse when coughing)</li>
<li>• Pain associated with active vomiting</li>
<li>• Pain associated with sweating</li>
</ul>

<p class="mt-3 mb-2 font-semibold">Risk factors increasing likelihood of cardiac origin:</p>
<ul class="ml-4 space-y-1">
<li>• Age ≥40</li>
<li>• Obesity/poor diet/poor exercise</li>
<li>• Smoking</li>
<li>• History of hypertension/high cholesterol</li>
<li>• History of diabetes</li>
<li>• Family/genetic history of cardiac events</li>
</ul>

<p class="mt-3 font-semibold text-center">When in doubt, "payoff principle" - treat as if cardiac.</p>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">⚠️ MANAGEMENT</h3>
<ul class="ml-4 space-y-2">
<li>• SitRep: Hatzolah dispatch + call ambulance (treat as time critical)</li>
<li>• IF SpO2 ≤92%: Oxygen PRN</li>
<li>• IF suspecting cardiac chest pain: Aspirin 300mg oral</li>
<li>• IF pain ≥2: GTN 300mcg sublingual/buccal
  <ul class="ml-6 mt-1 text-sm">
  <li>- IF pain ≥2 & sBP ≥100: Repeat at 5 min intervals</li>
  <li>- Maximum: No maximum within reason</li>
  <li>- Reassess BP and side effects after each dose</li>
  <li>- IF sBP ≤100 OR side effects: Remove tablet + rinse mouth</li>
  </ul>
</li>
<li>• IF pain remains ≥3: Methoxyflurane 3mL whistle
  <ul class="ml-6 mt-1 text-sm">
  <li>- IF required: Repeat at 25 mins (continuous use)</li>
  <li>- Maximum: 6mL (2 vials) in 24 hour period if no side effects</li>
  </ul>
</li>
</ul>
</div>
</div>`
          },
          {
            id: 'dehydration',
            title: 'Dehydration',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Detrimental reduction of amount of water in the body.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION</h3>
<p class="mb-2">Less than adequate perfusion as per Perfusion Status Assessment. Patient has less than adequate perfusion IF 2 or more criteria outside adequate range:</p>

<table class="w-full border-collapse border border-gray-300 text-sm mb-3">
<tr>
<td class="border border-gray-300 px-2 py-1 font-semibold">Adequate</td>
<td class="border border-gray-300 px-2 py-1">Warm/pink/dry skin, pulse 60-100, sBP ≥100, alert & orientated</td>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1 font-semibold">≤Adequate</td>
<td class="border border-gray-300 px-2 py-1">Cool/pale/clammy skin, pulse ≤50 or ≥100, sBP ≤100, alert or altered</td>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1 font-semibold">No Perfusion</td>
<td class="border border-gray-300 px-2 py-1">Cool/pale/clammy skin, no pulse, unable to record BP, unconscious</td>
</tr>
</table>

<p class="font-semibold mb-1">Symptoms may include:</p>
<ul class="ml-4 space-y-1">
<li>• Poor skin turgor, poor fluid intake vs fluid loss</li>
<li>• Postural tachycardia & hypotension, decreased urination</li>
<li>• Altered conscious state/fatigue, dry mouth & tongue</li>
<li>• Postural dizziness, decreased sweating</li>
</ul>

<p class="font-semibold mt-2 mb-1">Causes may include:</p>
<ul class="ml-4 space-y-1">
<li>• Hot weather, significant vomiting/sweating</li>
<li>• Hyperglycaemia, psychostimulant overdose</li>
<li>• Self-neglect, insufficient social support</li>
</ul>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">MANAGEMENT</h3>
<ul class="ml-4 space-y-1">
<li>• IF able to tolerate oral fluids: Encourage patient to drink water</li>
<li>• IF ≤adequate PSA due to dehydration: Call Ambulance/000</li>
<li>• IF ≤adequate PSA due to dehydration & unable to tolerate oral fluids:
  <ul class="ml-6 mt-1 text-sm">
  <li>- Gain IV access: Normal Saline IV (only accredited responders)</li>
  <li>- Administer lower doses to elderly or patients with renal/heart failure</li>
  </ul>
</li>
</ul>

<h4 class="font-semibold mt-3 mb-2">DOSING:</h4>
<table class="w-full border-collapse border border-gray-300 text-sm">
<tr>
<td class="border border-gray-300 px-2 py-1">≥15 years & elderly OR renal OR heart failure</td>
<td class="border border-gray-300 px-2 py-1 font-semibold">500mL IV (titrate to response)</td>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1">≥15 years & NOT elderly/NO renal OR heart failure</td>
<td class="border border-gray-300 px-2 py-1 font-semibold">1000mL IV (titrate to response)</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'hypoglycaemia',
            title: 'Hypoglycaemia',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Condition characterised by low blood sugar levels.</p>

<p class="mt-2 font-semibold mb-1">Causes include:</p>
<ul class="ml-4 space-y-1">
<li>• Insulin/oral hypoglycaemic medication overdose</li>
<li>• Skipped meals/fasting/starvation</li>
<li>• Excessive physical activity</li>
<li>• Excessive alcohol consumption</li>
<li>• Certain illnesses (e.g. sepsis)</li>
</ul>

<p class="mt-2 font-semibold mb-1">Symptoms may include:</p>
<ul class="ml-4 space-y-1">
<li>• Altered conscious state/confusion, irritability/abnormal behaviour</li>
<li>• Sweaty/pale skin, nausea/vomiting</li>
<li>• Slurred speech/difficulty speaking, headache/blurred vision</li>
<li>• Shakiness/tremors, seizures</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION</h3>
<p>Use this guideline IF Blood Glucose Level (BGL) ≤4 mmol/L</p>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">⚠️ MANAGEMENT</h3>
<ul class="ml-4 space-y-1">
<li>• IF not responding: Call Ambulance/000</li>
<li>• IF responding & can swallow: Glucose Paste 15G oral<br/>
<span class="text-sm italic">(Never administer oral medications to patients in altered conscious state!)</span></li>
<li>• IF NOT responding OR can't swallow: Glucagon IM<br/>
<span class="text-sm italic">(Only accredited responders may administer Glucagon!)</span></li>
<li>• Recheck BGL after 5 minutes</li>
<li>• IF symptoms continue & BGL ≥4: Consider other causes (AEIOUTIPS)</li>
<li>• ONCE can swallow safely: Advise eat long lasting carbohydrates within 20 minutes (sandwich, fruit, glass of milk)</li>
</ul>

<h4 class="font-semibold mt-3 mb-2">GLUCAGON DOSING:</h4>
<table class="w-full border-collapse border border-gray-300 text-sm">
<tr>
<td class="border border-gray-300 px-2 py-1">≥8 years old</td>
<td class="border border-gray-300 px-2 py-1 font-semibold">1MG IM</td>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1">≤8 years old</td>
<td class="border border-gray-300 px-2 py-1 font-semibold">0.5MG IM</td>
</tr>
</table>

<p class="mt-3 font-semibold">ESCALATION: IF no improvement - Call Ambulance/000</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">REFER TO GP if ALL following criteria met:</h3>
<ul class="ml-4 space-y-1 text-sm">
<li>• GCS fully returned to patient's normal baseline</li>
<li>• Patient declining ambulance</li>
<li>• Known pre-existing diagnosis of diabetes</li>
<li>• Only oral glucose required to correct BGL</li>
<li>• Known cause of hypoglycaemia episode</li>
<li>• No injury or seizure occurred</li>
<li>• Patient willing/able to eat long lasting carbohydrates</li>
<li>• Patient NOT pregnant</li>
<li>• NONE of following risks: Unwitnessed onset, on oral hypoglycaemic medication, medication overdose, suspected cause requires investigation</li>
<li>• Patient able to be monitored by responsible adult for at least 4 hours</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<p class="font-semibold text-red-700">⚠️ WARNING: Severe hypoglycaemia may cause aggressive behaviour - consider scene safety!</p>
</div>
</div>`
          },
          {
            id: 'seizure',
            title: 'Seizure',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Sudden, uncontrolled electrical disturbance in brain causing changes in behaviour, movements, feelings and consciousness.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION</h3>
<p class="mb-2">Seizures can present due to wide variety of causes and symptoms. Differentiating types and causes in pre-hospital environment can be difficult. When in doubt, err on side of caution.</p>

<p class="font-semibold">Midazolam may ONLY be administered by accredited responders when one of two criteria met:</p>
<ol class="ml-6 space-y-1 list-decimal">
<li>Ongoing generalised tonic-clonic movements & altered conscious state lasting 5 or more minutes</li>
<li>Multiple seizures without full recovery of conscious state in between</li>
</ol>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">⚠️ MANAGEMENT</h3>

<ul class="ml-4 space-y-1 mb-4">
<li>• IF soiled airways: Suction airways</li>
<li>• IF breathing ineffectively: Oxygen BVM (8-15L O2) - age appropriate rates</li>
<li>• IF breathing adequately: Oxygen NRB (10-15L O2)
  <ul class="ml-6 mt-1 text-sm">
  <li>- ONLY IF adequate perfusion: Titrate down to SpO2 92-96%</li>
  </ul>
</li>
</ul>

<div class="p-3 bg-white rounded">
<h4 class="font-semibold mb-2">SEIZURE MANAGEMENT:</h4>
<ul class="ml-4 space-y-1">
<li>• SitRep: Hatzolah dispatch + call ambulance</li>
<li>• Protect patient from injury</li>
<li>• IF risk of injury: Pillow/pad head</li>
<li>• Do NOT forcibly restrict patient's body from convulsing</li>
<li>• IF available (prescribed medications): Assist carers to administer seizure plan</li>
<li>• IF meeting GCSE criteria: Midazolam IM (accredited responders only)</li>
<li>• Carefully monitor respiratory status</li>
</ul>
</div>

<h4 class="font-semibold mt-3 mb-2">MIDAZOLAM DOSING (GCSE ≥5 mins OR multiple GCSE):</h4>
<table class="w-full border-collapse border border-gray-300 text-sm">
<tr>
<td class="border border-gray-300 px-2 py-1">≥15 years & elderly/frail OR ≤60 kgs</td>
<td class="border border-gray-300 px-2 py-1 font-semibold">5mg IM, repeat 5mg at 5 mins if required (max 10mg)</td>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1">≥15 years & NOT elderly/frail & ≥60 kgs</td>
<td class="border border-gray-300 px-2 py-1 font-semibold">10mg IM, repeat 10mg at 10 mins if required (max 20mg)</td>
</tr>
</table>

<p class="text-sm mt-3">Multiple GCSE = multiple tonic clonic seizures occurring WITHOUT full recovery to patient's normal baseline between seizures.</p>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<p class="text-sm"><strong>NOTE:</strong> Most seizures will self-terminate. Monitor for respiratory depression with Midazolam.</p>
</div>
</div>`
          },
          {
            id: 'stroke-acute',
            title: 'Stroke (Acute)',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Stroke occurs when there is blockage to blood supply of part of brain OR when blood vessel in brain bursts. Brain cells deprived of oxygen and nutrients rapidly leading to potentially irreversible brain damage or death.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION - F.A.S.T</h3>
<p class="mb-2">Acute stroke suspected when ANY of following signs/symptoms occur:</p>
<ul class="ml-4 space-y-2">
<li><strong>F</strong> - Facial droop: One side of face doesn't move as well as other<br/>
<span class="text-sm italic">(Assess by asking patient to smile or show teeth)</span></li>
<li><strong>A</strong> - Arm/Limb weakness: One sided limb weakness or arm drift<br/>
<span class="text-sm italic">(Assess by asking patient to hold arms straight for 10s & squeeze fingers)</span></li>
<li><strong>S</strong> - Speech deficit: Slurs words, says incorrect words or unable to speak<br/>
<span class="text-sm italic">(Assess by asking patient to repeat "you can't teach an old dog new tricks")</span></li>
</ul>

<p class="mt-3 font-semibold">& these signs/symptoms existed for ≤24 hours<br/>
& Blood Glucose Level (BGL) is normal (≥4 mmol/L)</p>

<h4 class="font-semibold mt-3 mb-2">STROKE HISTORY:</h4>
<ul class="ml-4 space-y-1 text-sm">
<li>• What time were stroke symptoms first noticed? (as precisely as possible)</li>
<li>• When was patient last known/seen to be well? (stroke symptom free)</li>
<li>• Have any symptoms occurred previously? If yes - what caused them?</li>
<li>• Have they had stroke before?</li>
<li>• Are they currently drug or alcohol affected?</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">⚠️ MANAGEMENT</h3>
<ul class="ml-4 space-y-1">
<li>• IF unconscious: Manage per unconscious patient guideline</li>
<li>• Treat as time critical!</li>
<li>• ONLY IF SpO2 ≤92%: Oxygen PRN</li>
<li>• Assess BGL</li>
<li>• IF BGL ≤4: Manage hypoglycaemia then re-evaluate for stroke</li>
<li>• Support all limbs</li>
<li>• SitRep: Hatzolah dispatch + call ambulance</li>
<li class="font-semibold">• REGARDLESS of severity/improvement: SitRep + call ambulance</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h4 class="font-semibold mb-2">Additional symptoms that may be caused by strokes:</h4>
<ul class="ml-4 space-y-1">
<li>• Headache (severe/sudden onset), impaired gait (sudden onset)</li>
<li>• Vertigo (dizziness, nausea, vomiting), altered conscious state</li>
<li>• Hypertension (severe/sudden onset)</li>
</ul>

<h4 class="font-semibold mt-3 mb-2">Possible stroke mimics:</h4>
<ul class="ml-4 space-y-1">
<li>• Drug/alcohol intoxication, brain tumour</li>
<li>• Seizure/postictal phase, migraine</li>
<li>• Middle ear disorder/vertigo, syncope</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<p class="text-sm"><strong>NOTE:</strong> In cases where patient wakes up with stroke symptoms, time of onset taken from when patient last seen well, NOT from time of awakening. Stroke symptoms can fluctuate/be intermittent - transport ALL potential stroke patients regardless of improvement or resolution.</p>
</div>
</div>`
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
            content: `<div class="overflow-x-auto">
<table class="min-w-full border-collapse border border-gray-300">
<thead>
<tr class="bg-blue-100">
<th class="border border-gray-300 px-3 py-2 text-left font-semibold">Age Category</th>
<th class="border border-gray-300 px-3 py-2 text-left font-semibold">Weight</th>
<th class="border border-gray-300 px-3 py-2 text-left font-semibold">AVPU/GCS</th>
<th class="border border-gray-300 px-3 py-2 text-left font-semibold">RR</th>
<th class="border border-gray-300 px-3 py-2 text-left font-semibold">SpO2</th>
<th class="border border-gray-300 px-3 py-2 text-left font-semibold">HR</th>
<th class="border border-gray-300 px-3 py-2 text-left font-semibold">BP</th>
</tr>
</thead>
<tbody>
<tr class="bg-green-50">
<td class="border border-gray-300 px-3 py-2">≤24 hours Newborn</td>
<td class="border border-gray-300 px-3 py-2">3.5 kg</td>
<td class="border border-gray-300 px-3 py-2">A / 15</td>
<td class="border border-gray-300 px-3 py-2">25 - 60</td>
<td class="border border-gray-300 px-3 py-2">≥95%</td>
<td class="border border-gray-300 px-3 py-2">110 - 170</td>
<td class="border border-gray-300 px-3 py-2">≥60</td>
</tr>
<tr class="bg-green-50">
<td class="border border-gray-300 px-3 py-2">≤3 months Small Infant</td>
<td class="border border-gray-300 px-3 py-2">6 kg</td>
<td class="border border-gray-300 px-3 py-2">A / 15</td>
<td class="border border-gray-300 px-3 py-2">25 - 60</td>
<td class="border border-gray-300 px-3 py-2">≥95%</td>
<td class="border border-gray-300 px-3 py-2">110 - 170</td>
<td class="border border-gray-300 px-3 py-2">≥60</td>
</tr>
<tr class="bg-yellow-50">
<td class="border border-gray-300 px-3 py-2">3-12 months Large Infant</td>
<td class="border border-gray-300 px-3 py-2">8 kg</td>
<td class="border border-gray-300 px-3 py-2">A / 15</td>
<td class="border border-gray-300 px-3 py-2">25 - 55</td>
<td class="border border-gray-300 px-3 py-2">≥95%</td>
<td class="border border-gray-300 px-3 py-2">105 - 165</td>
<td class="border border-gray-300 px-3 py-2">≥65</td>
</tr>
<tr class="bg-orange-50">
<td class="border border-gray-300 px-3 py-2">1 year Small Child</td>
<td class="border border-gray-300 px-3 py-2">10 kg</td>
<td class="border border-gray-300 px-3 py-2">A / 15</td>
<td class="border border-gray-300 px-3 py-2">20 - 40</td>
<td class="border border-gray-300 px-3 py-2">≥95%</td>
<td class="border border-gray-300 px-3 py-2">85 - 150</td>
<td class="border border-gray-300 px-3 py-2">≥70</td>
</tr>
<tr class="bg-orange-50">
<td class="border border-gray-300 px-3 py-2">2 years Small Child</td>
<td class="border border-gray-300 px-3 py-2">12 kg</td>
<td class="border border-gray-300 px-3 py-2">A / 15</td>
<td class="border border-gray-300 px-3 py-2">20 - 40</td>
<td class="border border-gray-300 px-3 py-2">≥95%</td>
<td class="border border-gray-300 px-3 py-2">85 - 150</td>
<td class="border border-gray-300 px-3 py-2">≥70</td>
</tr>
<tr class="bg-orange-50">
<td class="border border-gray-300 px-3 py-2">3-4 years Small Child</td>
<td class="border border-gray-300 px-3 py-2">16-18 kg</td>
<td class="border border-gray-300 px-3 py-2">A / 15</td>
<td class="border border-gray-300 px-3 py-2">20 - 40</td>
<td class="border border-gray-300 px-3 py-2">≥95%</td>
<td class="border border-gray-300 px-3 py-2">85 - 150</td>
<td class="border border-gray-300 px-3 py-2">≥70</td>
</tr>
<tr class="bg-blue-50">
<td class="border border-gray-300 px-3 py-2">5-11 years Medium Child</td>
<td class="border border-gray-300 px-3 py-2">20-36 kg</td>
<td class="border border-gray-300 px-3 py-2">A / 15</td>
<td class="border border-gray-300 px-3 py-2">16 - 34</td>
<td class="border border-gray-300 px-3 py-2">≥95%</td>
<td class="border border-gray-300 px-3 py-2">70 - 135</td>
<td class="border border-gray-300 px-3 py-2">≥80</td>
</tr>
<tr class="bg-purple-50">
<td class="border border-gray-300 px-3 py-2">12-15 years Adolescent</td>
<td class="border border-gray-300 px-3 py-2">Estimate</td>
<td class="border border-gray-300 px-3 py-2">A / 15</td>
<td class="border border-gray-300 px-3 py-2">14 - 26</td>
<td class="border border-gray-300 px-3 py-2">≥95%</td>
<td class="border border-gray-300 px-3 py-2">60 - 120</td>
<td class="border border-gray-300 px-3 py-2">≥90</td>
</tr>
<tr class="bg-gray-50">
<td class="border border-gray-300 px-3 py-2">≥15 years Adult</td>
<td class="border border-gray-300 px-3 py-2">Estimate</td>
<td class="border border-gray-300 px-3 py-2">13 - 15</td>
<td class="border border-gray-300 px-3 py-2">12 - 30</td>
<td class="border border-gray-300 px-3 py-2">≥92%</td>
<td class="border border-gray-300 px-3 py-2">50 - 120</td>
<td class="border border-gray-300 px-3 py-2">≥90</td>
</tr>
</tbody>
</table>
</div>

<div class="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
<p class="font-semibold text-red-800">⚠️ IMPORTANT:</p>
<p class="text-red-700">ANY deviation from normal VSS is a concern and should NOT be discounted.</p>
<p class="text-red-700 mt-2">🚑 Patients with ANY vital signs persistently outside ranges must be escalated to Ambulance Victoria.</p>
<p class="text-red-700">Patients with borderline vital signs must use VVED as minimum.</p>
</div>`
          },
          {
            id: 'clinical-flags',
            title: 'Clinical Flags',
            content: `<div class="space-y-4">
<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">🚨 RED FLAG CRITERIA – ADULTS & PAEDIATRICS</h3>
<ul class="space-y-1 ml-4">
<li>• ANY vital sign outside of Acceptable Vital Sign Values</li>
<li>• Stridor</li>
<li>• First presentation seizure</li>
<li>• Anaphylaxis (including resolved anaphylaxis)</li>
<li>• Acute coronary syndrome (even if resolved)</li>
<li>• Ectopic pregnancy</li>
<li>• Primary obstetric issue</li>
<li>• Stroke / TIA</li>
<li>• Sudden onset headache</li>
<li>• Unable to walk (when usually able to walk)</li>
<li>• Post-tonsillectomy bleeding (up to 14 days post-operation)</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3 text-red-700">🚨 RED FLAG CRITERIA – PAEDIATRICS ONLY</h3>
<ul class="space-y-1 ml-4">
<li>• Unexplained pain</li>
<li>• Second presentation within 48 hours to AV or Dr for related complaint</li>
<li>• Febrile ≥38°c in small infants (up to 3 months old)</li>
<li>• Testicular pain</li>
<li>• Ingestion/inhalation of toxic substance</li>
<li>• Inhalation of foreign body</li>
<li>• Non blanching rash</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3">⚠️ YELLOW FLAG CRITERIA</h3>
<ul class="space-y-1 ml-4">
<li>• Ongoing patient or carer concern</li>
<li>• Infection not responding to community based care</li>
<li>• Immunocompromised with suspected infection</li>
<li>• Surgical procedure within past 14 days</li>
<li>• Significant unexplained pain (≥5)</li>
<li>• Syncope (asymptomatic, normal vital signs, normal ECG)</li>
<li>• Abdominal pain</li>
<li>• Mental health</li>
</ul>
</div>
</div>`
          },
          {
            id: 'clinical-approach',
            title: 'Clinical Approach',
            content: `<div class="space-y-4">
<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">STOP - Dangers & Safety</h3>
<ul class="ml-4 space-y-1">
<li>• PPE / Standard precautions</li>
<li>• Dynamic risk assessment / Awareness of personal safety</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<p class="font-semibold mb-2">Rapid assessment / PAT: Does the patient appear WELL or UNWELL?</p>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRIMARY SURVEY</h3>
<ul class="space-y-1">
<li><strong>-R-</strong> Response: Yes / No?</li>
<li><strong>-S-</strong> Send for help: SitRep Hatzolah, Call ambulance + request backup</li>
<li><strong>-A-</strong> Airway: C-spine concerns?</li>
<li><strong>-B-</strong> Breathing: Adequate?</li>
<li><strong>-C-</strong> Circulation + Major bleeding?</li>
<li><strong>-D-</strong> Disability: AVPU</li>
<li><strong>-E-</strong> Exposure: Environment?</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ASSESS</h3>
<ul class="ml-4 space-y-1">
<li>• <strong>Ask About:</strong> Situation, signs + symptoms, allergies, medications, past medical history</li>
<li>• <strong>Assessment Tools:</strong> PSA, RSA, GCS, Medical time critical, Trauma time critical</li>
<li>• <strong>Assessment Equipment:</strong> SpO2, Temperature, BGL, Other VSS</li>
</ul>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PAUSE & PLAN</h3>
<p>Call 000 for ALL patients outside of Hatzolah's clinical scope, requiring hospital care OR as directed by Hatzolah CPG.</p>
</div>
</div>`
          },
          {
            id: 'pat-assessment',
            title: 'Paediatric Assessment Triangle',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">The PAT consists of three components:</h3>
<ul class="ml-4 space-y-1">
<li>• <strong>Appearance</strong> - level of alertness, muscle tone, body position</li>
<li>• <strong>Work of breathing</strong> - chest movement evaluation</li>
<li>• <strong>Circulation</strong> - skin colour assessment</li>
</ul>
<p class="mt-3 font-semibold">This assessment should not take more than a few seconds.</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<p class="mb-2">If the child appears well with no signs of serious trauma, approach with a calm demeanour whilst explaining your actions to the parents and child.</p>
<p class="mb-2">If a well-appearing patient has experienced a high-risk mechanism of injury, consider the patient potentially unstable due to risk of serious internal injuries.</p>
<p>For children with poor appearance OR evidence of significant injury, proceed immediately to primary survey including any lifesaving interventions.</p>
</div>
</div>`
          },
          {
            id: 'conscious-state',
            title: 'Conscious Status Assessments',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">AVPU Assessment</h3>
<ul class="ml-4 space-y-1">
<li>• <strong>Alert</strong> = A</li>
<li>• <strong>Responding to voice</strong> = V</li>
<li>• <strong>Responding to pain</strong> = P</li>
<li>• <strong>Unresponsive</strong> = U</li>
</ul>
<p class="mt-3 text-sm">AVPU is quick and simple, appropriate for determining conscious state during initial assessment. Preferred tool for assessing conscious state in children.</p>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">Glasgow Coma Scale (GCS)</h3>
<ul class="ml-4 space-y-1 mb-3">
<li>• Maximum score: 15 (fully alert and orientated)</li>
<li>• Minimum score: 3 (completely unresponsive)</li>
</ul>

<table class="w-full border-collapse border border-gray-300 text-sm">
<tr class="bg-gray-100">
<td class="border border-gray-300 px-3 py-2 font-semibold" colspan="2">Eye Opening (E)</td>
</tr>
<tr><td class="border border-gray-300 px-3 py-2">Spontaneous</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">4</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">To voice</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">3</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">To pain</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">2</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">None</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">1</td></tr>

<tr class="bg-gray-100">
<td class="border border-gray-300 px-3 py-2 font-semibold" colspan="2">Verbal Response (V)</td>
</tr>
<tr><td class="border border-gray-300 px-3 py-2">Orientated</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">5</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">Confused</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">4</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">Inappropriate words</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">3</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">Incomprehensible sounds</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">2</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">None</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">1</td></tr>

<tr class="bg-gray-100">
<td class="border border-gray-300 px-3 py-2 font-semibold" colspan="2">Motor Response (M)</td>
</tr>
<tr><td class="border border-gray-300 px-3 py-2">Obeys commands</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">6</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">Localises to pain</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">5</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">Withdraws from pain</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">4</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">Flexion to pain</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">3</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">Extension to pain</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">2</td></tr>
<tr><td class="border border-gray-300 px-3 py-2">None</td><td class="border border-gray-300 px-3 py-2 text-center font-bold">1</td></tr>
</table>

<p class="mt-3 text-center font-semibold">Total = E + V + M</p>
</div>
</div>`
          },
          {
            id: 'respiratory-assessment',
            title: 'Respiratory Status Assessment',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION Categories: Normal, Mild, Moderate, Severe</h3>
</div>

<div class="overflow-x-auto">
<table class="w-full border-collapse border border-gray-300 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-3 py-2 text-left font-semibold">Criteria</th>
<th class="border border-gray-300 px-3 py-2 text-center font-semibold bg-green-50">Normal</th>
<th class="border border-gray-300 px-3 py-2 text-center font-semibold bg-yellow-50">Mild</th>
<th class="border border-gray-300 px-3 py-2 text-center font-semibold bg-orange-50">Moderate</th>
<th class="border border-gray-300 px-3 py-2 text-center font-semibold bg-red-50">Severe</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Conscious State</td>
<td class="border border-gray-300 px-3 py-2 text-center">Alert</td>
<td class="border border-gray-300 px-3 py-2 text-center">Alert</td>
<td class="border border-gray-300 px-3 py-2 text-center">Alert/Altered</td>
<td class="border border-gray-300 px-3 py-2 text-center">Altered/Unconscious</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Respiratory Rate</td>
<td class="border border-gray-300 px-3 py-2 text-center">12-16</td>
<td class="border border-gray-300 px-3 py-2 text-center">16-20</td>
<td class="border border-gray-300 px-3 py-2 text-center">>20</td>
<td class="border border-gray-300 px-3 py-2 text-center">>20 or <8</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Oxygen (SpO2)</td>
<td class="border border-gray-300 px-3 py-2 text-center">>95%</td>
<td class="border border-gray-300 px-3 py-2 text-center">>95%</td>
<td class="border border-gray-300 px-3 py-2 text-center"><95%</td>
<td class="border border-gray-300 px-3 py-2 text-center"><90%</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Speech</td>
<td class="border border-gray-300 px-3 py-2 text-center">Clear, Full Sentences</td>
<td class="border border-gray-300 px-3 py-2 text-center">Short Sentences</td>
<td class="border border-gray-300 px-3 py-2 text-center">Words</td>
<td class="border border-gray-300 px-3 py-2 text-center">None</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Skin</td>
<td class="border border-gray-300 px-3 py-2 text-center">Normal</td>
<td class="border border-gray-300 px-3 py-2 text-center">Normal</td>
<td class="border border-gray-300 px-3 py-2 text-center">Pale, Sweaty</td>
<td class="border border-gray-300 px-3 py-2 text-center">Pale, Sweaty +/- Cyanosis</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Work of Breathing</td>
<td class="border border-gray-300 px-3 py-2 text-center">Normal</td>
<td class="border border-gray-300 px-3 py-2 text-center">Slight</td>
<td class="border border-gray-300 px-3 py-2 text-center">Marked</td>
<td class="border border-gray-300 px-3 py-2 text-center">Marked</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Appearance</td>
<td class="border border-gray-300 px-3 py-2 text-center">Calm, Quiet</td>
<td class="border border-gray-300 px-3 py-2 text-center">Calm/Anxious</td>
<td class="border border-gray-300 px-3 py-2 text-center">Distressed/Anxious</td>
<td class="border border-gray-300 px-3 py-2 text-center">Exhausted/Fighting to breathe</td>
</tr>
</tbody>
</table>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">SIGNS OF RESPIRATORY DISTRESS IN CHILDREN</h3>
<ul class="ml-4 space-y-1">
<li>• Tachypnoea</li>
<li>• Chest wall retraction</li>
<li>• Use of accessory wall muscles</li>
<li>• Tracheal tugging</li>
<li>• Abdominal protrusion</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">SIGNS OF HYPOXIA IN CHILDREN</h3>
<p class="font-semibold mb-1">Infants (0-12 months):</p>
<p class="ml-4">Lethargy, Bradycardia, Hypotension, Apnoea, Pallor</p>
<p class="font-semibold mt-2 mb-1">Children (1-15 years):</p>
<p class="ml-4">Restlessness, Tachycardia, Tachypnoea, Cyanosis, Bradycardia</p>
</div>
</div>`
          },
          {
            id: 'perfusion-assessment',
            title: 'Perfusion Status Assessment',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Perfusion refers to the cardiovascular system's capacity to provide tissues with sufficient oxygen and nutrients while removing carbon dioxide and waste products.</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">RECOGNITION</h3>
<p class="mb-3">Patient has <strong>less than adequate perfusion</strong> IF 2 or more criteria outside adequate range:</p>

<table class="w-full border-collapse border border-gray-300 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-3 py-2">Criteria</th>
<th class="border border-gray-300 px-3 py-2 bg-green-50">Adequate Perfusion</th>
<th class="border border-gray-300 px-3 py-2 bg-yellow-50">≤ Adequate Perfusion</th>
<th class="border border-gray-300 px-3 py-2 bg-red-50">No Perfusion</th>
</tr>
</thead>
<tbody>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Skin</td>
<td class="border border-gray-300 px-3 py-2">Warm, Pink, Dry</td>
<td class="border border-gray-300 px-3 py-2">Cool, Pale, Clammy</td>
<td class="border border-gray-300 px-3 py-2">Cool, Pale, Clammy</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Pulse</td>
<td class="border border-gray-300 px-3 py-2">60 to 100</td>
<td class="border border-gray-300 px-3 py-2">≤50 OR ≥100</td>
<td class="border border-gray-300 px-3 py-2">No pulse</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">sBP</td>
<td class="border border-gray-300 px-3 py-2">≥100 sBP</td>
<td class="border border-gray-300 px-3 py-2">≤100 sBP</td>
<td class="border border-gray-300 px-3 py-2">Unable to record</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Conscious State</td>
<td class="border border-gray-300 px-3 py-2">Alert & Orientated</td>
<td class="border border-gray-300 px-3 py-2">Alert OR Altered</td>
<td class="border border-gray-300 px-3 py-2">Unconscious</td>
</tr>
</tbody>
</table>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2 text-red-700">MANAGEMENT</h3>
<p class="font-semibold mb-2">IF ≤ Adequate perfusion:</p>
<ul class="space-y-1 ml-4">
<li>• Avoid standing/walking patient</li>
<li>• Position: Supine/legs raised</li>
<li>• SitRep: Hatzolah dispatch + call ambulance</li>
</ul>
</div>
</div>`
          },
          {
            id: 'pain-assessment',
            title: 'Pain Assessments',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">WONG-BAKER FACES PAIN RATING SCALE</h3>
<p class="mb-2">For patients 3 years or older who are able to understand the tool and choose a face that best illustrates their physical pain.</p>
<p class="text-sm font-semibold">NOT intended to be used by a third person to assess patient's pain on their behalf.</p>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOLOR Assessment</h3>
<ul class="ml-4 space-y-1">
<li>• <strong>D</strong> - Description of the pain?</li>
<li>• <strong>O</strong> - Onset time of the pain?</li>
<li>• <strong>L</strong> - Location of the pain?</li>
<li>• <strong>O</strong> - Other symptoms associated with the pain?</li>
<li>• <strong>R</strong> - Relief from the pain? (positional relief, home medications tried)</li>
<li>• <strong>S</strong> - Severity / Pain score?</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<p>Use 0-10 pain scale for adults and older children.</p>
<p class="mt-1">Use Wong-Baker FACES for children 3+ years who cannot understand numerical scale.</p>
</div>
</div>`
          },
          {
            id: 'weight-calculations',
            title: 'Weight Calculations',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PAEDIATRIC WEIGHT CALCULATIONS</h3>

<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≤24 hours</td>
<td class="border border-gray-300 px-3 py-2">3.5 kg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">3 months</td>
<td class="border border-gray-300 px-3 py-2">6 kg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">6 months</td>
<td class="border border-gray-300 px-3 py-2">8 kg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">1-9 years</td>
<td class="border border-gray-300 px-3 py-2">Age x 2 + 8 kg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">10-11 years</td>
<td class="border border-gray-300 px-3 py-2">Age x 3.3 kg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥11 years</td>
<td class="border border-gray-300 px-3 py-2">Estimate based on patient size</td>
</tr>
</table>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<p>For children, various treatments are based on body weight such as drug doses, defibrillation joules and fluid volume. It is acceptable to ask a parent the patient's weight.</p>
<p class="mt-2">However, if weight is unknown, it can be estimated using the above calculations.</p>
</div>
</div>`
          },
          {
            id: 'time-critical',
            title: 'Time Critical Guidelines',
            content: `<div class="space-y-4">
<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2 text-red-700">PRINCIPLES</h3>
<ul class="ml-4 space-y-1">
<li>• Any patient meeting ANY Time Critical Criteria MUST be advised hospital transport</li>
<li>• Hatzolah crew MUST consult either AV Clinician OR Hatzolah Clinical Operations Manager for patients meeting ANY Time Critical Criteria refusing hospital transport</li>
<li>• Provide immediate situation report to dispatch for any patient meeting ANY time critical criteria</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">TIME CRITICAL DEFINITIONS</h3>

<p class="mb-2"><strong>ACTUAL:</strong> Patient was in actual physiological distress (altered conscious state, inadequate perfusion or respiratory distress)</p>

<p class="mb-2"><strong>EMERGENT:</strong> Patient not physiologically distressed, but has "pattern of actual injury/illness" with high probability of deteriorating to actual physiological distress</p>

<p><strong>POTENTIAL:</strong> Patient not physiologically distressed, no significant pattern of injury/illness, but has "mechanism of injury/illness" with potential to deteriorate</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ACTUAL TIME CRITICAL - VSS</h3>

<table class="w-full border-collapse border border-gray-300 text-sm">
<tr class="bg-gray-100">
<th class="border border-gray-300 px-2 py-1">Age</th>
<th class="border border-gray-300 px-2 py-1">SpO2</th>
<th class="border border-gray-300 px-2 py-1">RR</th>
<th class="border border-gray-300 px-2 py-1">HR</th>
<th class="border border-gray-300 px-2 py-1">BP</th>
<th class="border border-gray-300 px-2 py-1">GCS</th>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1 font-semibold">Adult</td>
<td class="border border-gray-300 px-2 py-1"><90%</td>
<td class="border border-gray-300 px-2 py-1"><10 or >30</td>
<td class="border border-gray-300 px-2 py-1"><60 or >120</td>
<td class="border border-gray-300 px-2 py-1"><90</td>
<td class="border border-gray-300 px-2 py-1"><13</td>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1 font-semibold">12-15 years</td>
<td class="border border-gray-300 px-2 py-1"><96%</td>
<td class="border border-gray-300 px-2 py-1"><14 or >26</td>
<td class="border border-gray-300 px-2 py-1"><60 or >120</td>
<td class="border border-gray-300 px-2 py-1"><90</td>
<td class="border border-gray-300 px-2 py-1"><15</td>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1 font-semibold">5-11 years</td>
<td class="border border-gray-300 px-2 py-1"><96%</td>
<td class="border border-gray-300 px-2 py-1"><16 or >34</td>
<td class="border border-gray-300 px-2 py-1"><70 or >135</td>
<td class="border border-gray-300 px-2 py-1"><80</td>
<td class="border border-gray-300 px-2 py-1"><15</td>
</tr>
<tr>
<td class="border border-gray-300 px-2 py-1 font-semibold">1-4 years</td>
<td class="border border-gray-300 px-2 py-1"><96%</td>
<td class="border border-gray-300 px-2 py-1"><20 or >40</td>
<td class="border border-gray-300 px-2 py-1"><85 or >150</td>
<td class="border border-gray-300 px-2 py-1"><70</td>
<td class="border border-gray-300 px-2 py-1"><15</td>
</tr>
</table>
</div>

<div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">EMERGENT TIME CRITICAL - PATTERN OF INJURY</h3>
<ul class="ml-4 space-y-1">
<li>• Penetrating trauma (except isolated superficial limb injury)</li>
<li>• Serious injury to single body region requiring specialised care</li>
<li>• Significant injuries involving more than one body region</li>
<li>• Limb amputation OR limb threatening injury</li>
<li>• Suspected spinal cord injury OR spinal fracture</li>
<li>• Burns: >10% TBSA (paediatrics), >20% TBSA (adults)</li>
<li>• Major compound fracture OR open dislocation</li>
<li>• Fractured pelvis</li>
</ul>
</div>

<div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">EMERGENT TIME CRITICAL - PATTERN OF ILLNESS</h3>
<ul class="ml-4 space-y-1">
<li>• Chest pain of cardiac nature</li>
<li>• Respiratory distress</li>
<li>• Altered consciousness</li>
<li>• Anaphylaxis</li>
<li>• Stroke</li>
<li>• Suspected meningococcal disease</li>
<li>• Undiagnosed severe pain</li>
<li>• Poisoning</li>
<li>• Obstetric emergency</li>
</ul>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">POTENTIALLY TIME CRITICAL</h3>
<p class="mb-2">Requires BOTH mechanism of injury AND vulnerability:</p>
<p class="font-semibold mb-1">Mechanisms:</p>
<p class="ml-4 mb-2">MCA >60km/hr, motorcycle/cyclist >30km/hr, pedestrian impact, fall >3m</p>
<p class="font-semibold mb-1">Vulnerabilities:</p>
<p class="ml-4">Age >55 or <16, pregnancy, poorly controlled HTN, CHF, lung disease</p>
</div>
</div>`
          },
          {
            id: 'safety-netting',
            title: 'Safety Netting',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Safety netting refers to providing patients and caregivers with advice and instructions for self-care as well as providing adequate contingency plan in case of unexpected deterioration.</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">MANAGEMENT</h3>
<ul class="ml-4 space-y-1">
<li>• Ensure minimum of 2x VSS covering span of at least 15 minutes</li>
<li>• Discuss results of assessment with patient and implications</li>
<li>• IF ANY abnormal findings found: Discuss them with patient</li>
<li>• Advise limitations of prehospital assessment and associated risks</li>
<li>• Discuss likely course of illness</li>
<li>• IF advised transport & patient refusing: Consult clinician</li>
<li>• Explain care pathway options including risks and benefits</li>
<li>• Provide recommended course of action if appropriate</li>
<li>• Ensure patient agrees and consents with plan (voluntary, informed AND relevant)</li>
<li>• Share plan between Hatzolah staff, patient and family/carers</li>
<li>• Ensure plan is implementable (patient has adequate healthcare literacy)</li>
<li>• Confirm patient/carers understand care plan</li>
<li>• Explain safety netting/contingency plan in case of deterioration</li>
<li>• Ask about and address any further questions or concerns</li>
<li>• Have patient sign PCR</li>
<li>• Document advice given</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ESCALATION OF CARE</h3>
<p class="mb-2">IF concerns, further advice required, patient refusing against advice or Ambulance/VVED pathway not being used: Contact Clinical Operations Manager via mobile phone</p>
<p class="font-semibold">ANY patients NOT being attended by Ambulance Victoria should at least have a VVED consult attended.</p>
</div>
</div>`
          },
          {
            id: 'ventilation-rates',
            title: 'Ventilation Rates',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INEFFECTIVE BREATHING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥15 years</td>
<td class="border border-gray-300 px-3 py-2">ventilate once every 5 seconds OR 12x per minute</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">12-15 years</td>
<td class="border border-gray-300 px-3 py-2">ventilate once every 3-4 seconds OR 14-26x per minute</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">5-11 years</td>
<td class="border border-gray-300 px-3 py-2">ventilate once every 2-3 seconds OR 16-34x per minute</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">1-4 years</td>
<td class="border border-gray-300 px-3 py-2">ventilate once every 2-3 seconds OR 20-40x per minute</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≤1 year</td>
<td class="border border-gray-300 px-3 py-2">ventilate once every 2 seconds OR 25-55x per minute</td>
</tr>
</table>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ASTHMA - UNRESPONSIVE WITH PULSE</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥11 years</td>
<td class="border border-gray-300 px-3 py-2">ventilate once every 8-12 seconds OR 5-8x per minute</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">5-11 years</td>
<td class="border border-gray-300 px-3 py-2">ventilate once every 5-6 seconds OR 10-14x per minute</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">2-4 years</td>
<td class="border border-gray-300 px-3 py-2">ventilate once every 4-5 seconds OR 12-15x per minute</td>
</tr>
</table>
</div>
</div>`
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
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Anaphylaxis</li>
<li>• Thunderstorm asthma</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Hypovolaemic shock without adequate fluid replacement</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Do NOT delay immediate adrenaline administration in patients experiencing anaphylaxis</li>
<li>• Consider consulting for reduced doses for: Elderly/frail patients, Cardiovascular disease PHx, MAOIs current/recent use</li>
<li>• Consider consulting for increased doses for: Beta blockers current/recent use</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Arrhythmias (sinus tachycardia, SVT, VT)</li>
<li>• Myocardial infarction exacerbation</li>
<li>• Hypertension</li>
<li>• Anxiety</li>
<li>• Palpitations</li>
<li>• Pupillary dilatation</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥5 years & ≥20 kgs</td>
<td class="border border-gray-300 px-3 py-2">0.3 mg IM (Epi-Pen)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≤6 years OR ≤20 kgs</td>
<td class="border border-gray-300 px-3 py-2">0.15 mg IM (Epi-Pen Jr)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">Intramuscular (IM) Epi-Pen</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">Consult</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">Consult</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'aspirin',
            title: 'Aspirin',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Cardiac chest pain or discomfort</li>
<li>• Suspected ACS</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Chest pain associated with psychostimulant overdose where sBP ≥160 mmHg</li>
<li>• Hypersensitivity to aspirin/salicylates</li>
<li>• Actively bleeding peptic ulcers (blood in stool)</li>
<li>• Bleeding disorders</li>
<li>• Suspected dissecting aortic aneurysm</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Peptic ulcer (not actively bleeding)</li>
<li>• Asthma</li>
<li>• Anticoagulants</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Heartburn</li>
<li>• Nausea</li>
<li>• Gastrointestinal bleeding</li>
<li>• Increased bleeding time</li>
<li>• Hypersensitivity reactions</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Age</td>
<td class="border border-gray-300 px-3 py-2">≥11 years old</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Dose</td>
<td class="border border-gray-300 px-3 py-2">300 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">Oral</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Initial Dose</td>
<td class="border border-gray-300 px-3 py-2">300 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">300 mg (total dose)</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'cetirizine',
            title: 'Cetirizine',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Mild allergy associated with skin symptoms only (hives, welts, itchiness etc)</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Known hypersensitivity to cetirizine or hydroxyzine</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Avoid using alongside alcohol or other CNS depressants as this may cause sedation</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Drowsiness (somnolence)</li>
<li>• Sore throat (pharyngitis)</li>
<li>• Dizziness</li>
<li>• Dry mouth</li>
<li>• Headache</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Age</td>
<td class="border border-gray-300 px-3 py-2">≥11 years old</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Dose</td>
<td class="border border-gray-300 px-3 py-2">10 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">Oral</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Initial Dose</td>
<td class="border border-gray-300 px-3 py-2">10 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">10 mg (total dose)</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'glucagon',
            title: 'Glucagon',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• BGL ≤4 mmol/L & NOT responding OR CAN'T swallow safely</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• MUST be accredited to administer IM Glucagon</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<p class="ml-4">Nil</p>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Nausea / Vomiting</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥8 years old & NOT responding OR CAN'T swallow safely</td>
<td class="border border-gray-300 px-3 py-2">1 MG</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≤8 years old & NOT responding OR CAN'T swallow safely</td>
<td class="border border-gray-300 px-3 py-2">0.5 MG</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">IM</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">1 MG or 0.5 MG (total dose)</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'glucose-paste',
            title: 'Glucose Paste',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• BGL ≤4 mmol/L & Responding & Can swallow safely</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• MUST be able to swallow safely - do NOT administer if altered conscious OR at reasonable risk of choking</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<p class="ml-4">Nil</p>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<p class="ml-4">Nil</p>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">All ages & Responding & Can swallow safely</td>
<td class="border border-gray-300 px-3 py-2">15 G</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">Oral</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Initial Dose</td>
<td class="border border-gray-300 px-3 py-2">15 G</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">15 G (total dose)</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'glyceryl-trinitrate',
            title: 'Glyceryl Trinitrate (GTN)',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Cardiac Chest Pain / Discomfort</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• sBP ≤100 mmHg</li>
<li>• HR ≥150 BPM</li>
<li>• HR ≤50 BPM</li>
<li>• Ventricular Tachycardia (perform ECG prior to administration when accredited)</li>
<li>• PDE5 inhibitors - current/recent use (Avanafil, Sildenafil, Tadalafil, Vardenafil)</li>
<li>• Riociguat (Adempas) - current/recent use</li>
<li>• Bleeding during pregnancy</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Right ventricular MI OR inferior MI with sBP ≤160 mmHg - risk of severe hypotension</li>
<li>• Higher risk demographics: Age ≥60, No previous GTN use, Recent MI</li>
<li>• Preterm labour - concurrent use with other tocolytics</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Hypotension</li>
<li>• Tachycardia/Bradycardia</li>
<li>• Headache</li>
<li>• Dizziness</li>
<li>• Syncope/faint</li>
<li>• Skin flushing</li>
</ul>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PREGNANCY/POSTPARTUM</h3>
<ul class="ml-4 space-y-1">
<li>• Safe for use in pregnancy</li>
<li>• Monitoring required if breastfeeding</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Age</td>
<td class="border border-gray-300 px-3 py-2">≥15 years old</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Dose</td>
<td class="border border-gray-300 px-3 py-2">300 mcg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">Sublingual</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Initial Dose</td>
<td class="border border-gray-300 px-3 py-2">300 mcg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">300 mcg @ 5 mins</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'ipratropium-bromide',
            title: 'Ipratropium Bromide',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Difficulty breathing & Wheezing</li>
<li>• Difficulty breathing & Asthma history</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Atropine hypersensitivity (including hypersensitivity to Atropine derivatives)</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Glaucoma</li>
<li>• Avoid contact with eyes</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Palpitations</li>
<li>• Tachycardia</li>
<li>• Headache</li>
<li>• Acute angle closure glaucoma secondary to direct eye contact (rare)</li>
<li>• Nausea</li>
<li>• Dry mouth</li>
<li>• Skin rash</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥11 years old</td>
<td class="border border-gray-300 px-3 py-2">500 mcg (2 nebules)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≤12 years old</td>
<td class="border border-gray-300 px-3 py-2">250 mcg (1 nebule)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">Nebulised</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">500 mcg or 250 mcg (total dose)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Use</td>
<td class="border border-gray-300 px-3 py-2">IF no improvement after 20 mins Salbutamol</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'methoxyflurane',
            title: 'Methoxyflurane',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Pain score ≥3</li>
<li>• Moderate OR severe pain</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Malignant hyperthermia (known history or family history)</li>
<li>• Renal disease (pre-existing)</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Patients should not be administered ≥6 mL methoxyflurane in 24 hour period due to increased risk of kidney damage</li>
<li>• Limit occupational exposure:
  <ul class="ml-6 mt-1 text-sm">
  <li>- Do NOT administer in confined space</li>
  <li>- Ensure adequate ventilation in ambulance</li>
  <li>- Place used Penthrox inhalers in closed bag when not in use</li>
  </ul>
</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Dizziness</li>
<li>• Drowsiness</li>
<li>• Hypotension</li>
<li>• Nausea / Vomiting</li>
</ul>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PREGNANCY/POSTPARTUM</h3>
<ul class="ml-4 space-y-1">
<li>• Safe for use in pregnancy</li>
<li>• Safe for use while breastfeeding</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">All ages</td>
<td class="border border-gray-300 px-3 py-2">3 mL</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">Inhaled whistle</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Initial Dose</td>
<td class="border border-gray-300 px-3 py-2">3 mL</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">3 mL PRN (3 mL typically lasts for 25 minutes continuous use)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">6 mL in 24 hours</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'midazolam',
            title: 'Midazolam',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Ongoing tonic clonic activity associated with altered consciousness AND lasting 5 or more minutes</li>
<li>• Multiple ongoing episodes of tonic clonic activity without full recovery of consciousness in-between seizures</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Midazolam may ONLY be administered by accredited responders</li>
<li>• Known hypersensitivity to benzodiazepines</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Reduce doses for patients that are: Elderly/frail, Weigh less than 60 kgs, Have chronic renal failure/CCF/shock</li>
<li>• CNS depressant effects enhanced in presence of narcotics and other tranquilizers including alcohol</li>
<li>• Can cause severe respiratory depression in patients with COPD</li>
<li>• Patients with myasthenia gravis</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Depressed level of consciousness</li>
<li>• Respiratory depression</li>
<li>• Loss of airway control</li>
<li>• Hypotension</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥15 years & Elderly/Frail OR ≤60 kgs</td>
<td class="border border-gray-300 px-3 py-2">5 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥15 years & NOT Elderly/Frail & ≥60 kgs</td>
<td class="border border-gray-300 px-3 py-2">10 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">IM</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">5 mg @ 5 mins IF required (elderly/frail) OR 10 mg @ 10 mins IF required</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">10 mg or 20 mg (total dose)</td>
</tr>
</table>

<p class="mt-3 text-sm">Multiple GCSE refers to multiple tonic clonic seizures occurring WITHOUT full recovery to patient's normal baseline in between seizures.</p>
</div>
</div>`
          },
          {
            id: 'normal-saline',
            title: 'Normal Saline',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Fluid replacement for volume depleted patients in context of dehydration</li>
<li>• Fluid for dilution or preparation of other IV medications if required</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Bilateral fine crackles on chest auscultation suggestive of APO</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Reduce doses for patients that are: Elderly/frail, Heart failure, Renal failure</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Potential for fluid overload with high risk patients or large volumes</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥15 years & Elderly OR Renal OR Heart failure</td>
<td class="border border-gray-300 px-3 py-2">500 mL</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥15 years & NOT elderly / NO renal OR heart failure</td>
<td class="border border-gray-300 px-3 py-2">1000 mL</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">IV</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Initial Dose</td>
<td class="border border-gray-300 px-3 py-2">500 mL or 1000 mL (titrate to response)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">500 mL or 1000 mL</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Use</td>
<td class="border border-gray-300 px-3 py-2">IF ≤ Adequate PSA due to Dehydration</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'ondansetron',
            title: 'Ondansetron',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Non-tolerated nausea / vomiting</li>
<li>• Prophylaxis for spinal immobilisation</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Apomorphine (medication typically used to treat Parkinson's disease)</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• First trimester pregnancy (0 to 12 weeks) without first consulting with receiving hospital</li>
<li>• Congenital Long QT syndrome - QTC ≥500 ms</li>
<li>• Severe liver disease (cirrhosis) – Do not exceed 8 mg total dose per day</li>
<li>• Phenylketonuria (PKU) history</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Headache / dizziness</li>
<li>• QT prolongation</li>
<li>• Constipation</li>
<li>• Visual disturbances (rarely associated with transient loss of vision)</li>
</ul>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PREGNANCY/POSTPARTUM</h3>
<ul class="ml-4 space-y-1">
<li>• 1st trimester – Consult with receiving hospital</li>
<li>• 2nd + 3rd trimester – Administer only if vomiting is very severe</li>
<li>• Safe for use while breastfeeding</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥11 years old</td>
<td class="border border-gray-300 px-3 py-2">4 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">5 to 11 years old</td>
<td class="border border-gray-300 px-3 py-2">4 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≤5 years old</td>
<td class="border border-gray-300 px-3 py-2">2 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">ODT</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Initial Dose</td>
<td class="border border-gray-300 px-3 py-2">4 mg or 2 mg</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">IF required 4 mg @ 20 mins (≥11 years only)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">8 mg, 4 mg, or 2 mg (total dose)</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'oxygen',
            title: 'Oxygen',
            content: `<div class="space-y-4">
<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DEFINITION</h3>
<p>Hypoxia occurs when there is inadequate oxygen in tissues to maintain homeostasis. May lead to altered conscious state, dyspnea, tachycardia, tachypnea, diaphoresis, anxiety and cyanosis.</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Apply oxygen to all patients presenting with severe shortness of breath</li>
<li>• IF SpO2 ≤92%: Oxygen titrate SpO2 92% or above</li>
<li>• IF COPD/Neuromuscular disorder/Cystic fibrosis/Bronchiectasis/Severe kyphoscoliosis/Obesity: Oxygen titrate SpO2 88-92%</li>
<li>• IF SpO2 ≤85%/Cardiac arrest/Major trauma/Head injury/Shock/Severe sepsis/Anaphylaxis/Seizure: Initial Mx NRB 10-15 L/min, ONCE hemodynamically stable titrate oxygen to SpO2 92-96%</li>
<li>• IF Toxic inhalation exposure/Decompression illness/Cord prolapse/Cluster headache/Postpartum haemorrhage: ALWAYS administer NRB 10-15 L/min</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">FURTHER NOTES</h3>
<ul class="ml-4 space-y-1">
<li>• This CPG is intended for patients aged 16 and older</li>
<li>• High concentration oxygen may be harmful for patients at risk of hypercapnic respiratory failure</li>
<li>• Suspect COPD if patient: Chronic cough/sputum production, Older than 40, Past history of smoking, Dyspnoea on exertion</li>
</ul>
</div>
</div>`
          },
          {
            id: 'paracetamol',
            title: 'Paracetamol',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Mild pain</li>
<li>• Moderate / severe pain when used in combination with other analgesics</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Any form of paracetamol in children ≤1 month old</li>
<li>• Paracetamol tablets in children ≤7 years old</li>
</ul>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<p class="font-semibold mb-1">Liver toxicity may occur in paracetamol overdose:</p>
<ul class="ml-4 space-y-1">
<li>• Do NOT administer if paracetamol given within past 4 hours</li>
<li>• Do NOT administer if total paracetamol within 24 hours exceeds 4G in adults</li>
<li>• Do NOT administer if total paracetamol within 24 hours exceeds 60 mg/kg in children</li>
</ul>
<p class="font-semibold mt-2 mb-1">Risk of liver toxicity increases with:</p>
<ul class="ml-4 space-y-1">
<li>• Impaired liver function/liver disease</li>
<li>• Elderly/frail patients</li>
<li>• Malnourishment</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Rashes or other hypersensitivity reactions</li>
<li>• Haematological reactions</li>
<li>• Hypotension (associated with IV infusion, particularly in critically ill patients)</li>
</ul>
</div>

<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PREGNANCY/POSTPARTUM</h3>
<ul class="ml-4 space-y-1">
<li>• Safe for use in pregnancy</li>
<li>• Safe for use while breastfeeding</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">DOSING</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥60 years old OR ≤60 kgs OR Frail</td>
<td class="border border-gray-300 px-3 py-2">500 mg (1 tablet)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">16 to 60 years old & ≥60 kgs & NOT frail</td>
<td class="border border-gray-300 px-3 py-2">1000 mg (2 tablets)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">12 to 15 years old</td>
<td class="border border-gray-300 px-3 py-2">500 mg (1 tablet)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≤12 years old</td>
<td class="border border-gray-300 px-3 py-2">15 mg x kg (oral liquid)</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Route</td>
<td class="border border-gray-300 px-3 py-2">Oral tablet or liquid</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">IF required same dose @ 4 hours</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">4 doses in 24 hours</td>
</tr>
</table>
</div>
</div>`
          },
          {
            id: 'salbutamol',
            title: 'Salbutamol',
            content: `<div class="space-y-4">
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">INDICATIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Difficulty breathing & Wheezing</li>
<li>• Difficulty breathing & Asthma history</li>
</ul>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">CONTRAINDICATIONS</h3>
<p class="ml-4">Nil</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">PRECAUTIONS</h3>
<ul class="ml-4 space-y-1">
<li>• Large doses may cause intracellular metabolic acidosis</li>
</ul>
</div>

<div class="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ADVERSE EFFECTS</h3>
<ul class="ml-4 space-y-1">
<li>• Tachycardia</li>
<li>• Tremors</li>
</ul>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-3">DOSING - pMDI (Mild/Moderate Asthma)</h3>
<table class="w-full border-collapse border border-gray-300 mb-4">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥5 years old</td>
<td class="border border-gray-300 px-3 py-2">4-12 puffs, 4x breaths per puff via spacer</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">2-5 years old</td>
<td class="border border-gray-300 px-3 py-2">2-6 puffs, 4x breaths per puff via spacer</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">Same dose @ 20 min</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
</table>

<h3 class="font-bold text-lg mb-3">DOSING - Nebulised (Severe Asthma OR Nil Improvement)</h3>
<table class="w-full border-collapse border border-gray-300">
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">≥15 years old</td>
<td class="border border-gray-300 px-3 py-2">10 mg (2 ampules) with 8L O2</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">7-15 years old</td>
<td class="border border-gray-300 px-3 py-2">5 mg (1 ampule) with 8L O2</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">2-5 years old</td>
<td class="border border-gray-300 px-3 py-2">2.5 mg (1/2 ampule) with 8L O2</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Repeat Dose(s)</td>
<td class="border border-gray-300 px-3 py-2">≥15 years: 5 mg @ 5 min | Others: same dose @ 20 min</td>
</tr>
<tr>
<td class="border border-gray-300 px-3 py-2 font-semibold">Maximum</td>
<td class="border border-gray-300 px-3 py-2">Nil</td>
</tr>
</table>
</div>
</div>`
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
            content: `<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">⚠️ COMING SOON</h3>
<p>This section will contain critical emergency protocols and time-sensitive procedures for immediate access to life-saving information.</p>
</div>`
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
            content: `<div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">📖 COMING SOON</h3>
<p>This section will contain halachic references for Hatzolah operations and emergency medical decisions according to Jewish law.</p>
</div>`
          }
        ]
      },
      {
        id: 'info',
        title: 'Info',
        icon: <Info className="w-5 h-5" />,
        subsections: [
          {
            id: 'resources',
            title: 'Resources & Tools',
            content: `<div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
<h3 class="font-bold text-lg mb-2">ℹ️ COMING SOON</h3>
<p class="mb-3">This section will contain:</p>
<ul class="ml-4 space-y-1">
<li>• Medical acronyms and abbreviations</li>
<li>• CPR metronome tool</li>
<li>• PCR writing guidelines</li>
<li>• Reference materials</li>
</ul>
</div>`
          }
        ]
      }
    ];
    
    return sections;
  }, []);

  const performSearch = () => {
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
  };

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
    performSearch();
  }, [searchQuery]);

  useEffect(() => {
    if (!selectedSection) {
      const homeSection = documentSections.find(s => s.id === 'home');
      setSelectedSection(homeSection);
    }
  }, [documentSections, selectedSection]);

  const handleBackClick = () => {
    if (selectedSubsection) {
      setSelectedSubsection(null);
    }
  };

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
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {selectedSubsection ? (
              <button 
                onClick={handleBackClick}
                className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-10"></div>
            )}
            
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hatzolah CPG</h1>
                <p className="text-sm text-gray-600">Version 4.9</p>
              </div>
            </div>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">
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
                  className="text-gray-700 leading-relaxed"
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
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <button 
                  onClick={() => handleSectionSelect(selectedSection)}
                  className="hover:text-blue-600 transition-colors"
                >
                  {selectedSection.title}
                </button>
                <span>/</span>
                <span className="text-gray-900">{selectedSubsection.title}</span>
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                {selectedSection.icon}
                <h2 className="text-2xl font-bold text-gray-900">{selectedSubsection.title}</h2>
              </div>
              
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: selectedSubsection.content 
                }}
              />
            </div>
          </div>
        ) : selectedSection ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                      {subsection.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
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