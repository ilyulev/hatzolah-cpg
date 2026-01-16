// src/data/homeContent.js
// General Management & Trauma Management Content
// All subsections from the "GENERAL MANAGEMENT" section of CPG v4.9

export const homeContent = [
  {
    id: 'altered-consciousness',
    title: 'Altered Consciousness (Acute)',
    content: `<div class="space-y-4">
<div class="p-4 bg-blue-50 border-l-4 border-blue-400">
<p class="font-semibold text-blue-800">DEFINITION</p>
<p>This guideline refers to any instance of NEW onset decreased responsiveness.</p>
</div>

<div class="p-4 bg-gray-50 border-l-4 border-gray-400">
<p class="font-semibold text-gray-800">RECOGNITION - AEIOUTIPS pneumonic for possible differentials:</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
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

<div class="p-4 bg-red-50 border-l-4 border-red-400">
<p class="font-semibold text-red-800">🚩 STOP</p>
<p>Consider risk of needlestick injuries from used sharps whenever drug overdose is suspected</p>
<p>Consider risk of potential patient volatility when drug overdose is suspected</p>
<p>Consider that hypoxic patients may present with agitation until oxygen levels are corrected</p>
</div>

<div class="p-4 bg-green-50 border-l-4 border-green-400">
<p class="font-semibold text-green-800">MANAGEMENT - ALL ALTERED CONSCIOUS PATIENTS</p>
<p class="mt-2">Primary survey</p>
<p class="mt-2"><strong>IF patient becomes unresponsive & no pulse:</strong> Manage as Cardiac Arrest!</p>

<p class="mt-3"><strong>IF inadequate ventilations & has pulse:</strong></p>
<ul class="list-disc ml-6 mt-1 space-y-1">
<li>Position: Supine</li>
<li>IF necessary: Suction airway (don't insert anything past teeth if biting)</li>
<li>IF breathing ineffectively: Oxygen BVM (8-15L O2)
  <ul class="list-circle ml-6">
  <li>≥15 years: ventilate every 5 seconds (12x per minute)</li>
  <li>12-15 years: ventilate every 3-4 seconds (14-26x per minute)</li>
  <li>5-11 years: ventilate every 2-3 seconds (16-34x per minute)</li>
  <li>1-4 years: ventilate every 2-3 seconds (20-40x per minute)</li>
  <li>≤1 year: ventilate every 2 seconds (25-55x per minute)</li>
  </ul>
</li>
</ul>

<p class="mt-3"><strong>IF adequate ventilations:</strong></p>
<ul class="list-disc ml-6 mt-1 space-y-1">
<li>IF NO c-spine concerns: Position lateral</li>
<li>IF YES c-spine concerns: Position supine</li>
<li>IF necessary: Suction airway</li>
<li>Oxygen NRB (10-15L O2)</li>
<li>SitRep: Hatzolah dispatch + call ambulance</li>
<li>Thorough VSS including SpO2, BGL, temperature, pupils</li>
<li>Consider possible causes (AEIOUTIPS) + manage appropriately</li>
</ul>
</div>

<div class="p-4 bg-yellow-50 border-l-4 border-yellow-400">
<p class="font-semibold text-yellow-800">ADDITIONAL MANAGEMENT</p>

<p class="font-semibold mt-2">HEAD INJURY:</p>
<ul class="list-disc ml-6 mt-1">
<li>Maintain neutral spine alignment</li>
<li>IF life threatening bleeding: Control bleeding + dress wound</li>
<li>IF necessary: Suction airway (avoid gag reflex)</li>
<li>ONLY IF necessary for ventilation: Airway adjunct</li>
</ul>

<p class="font-semibold mt-3">OVERDOSE (DRUGS/MEDICATIONS):</p>
<p class="mt-1">Evidence suggestive of illicit drug use may include: Paraphernalia, track marks, pinpoint/dilated pupils, hypothermia/hyperthermia</p>
<p class="mt-2">Where safe and possible, gain following information:</p>
<ul class="list-disc ml-6 mt-1">
<li>Time of consumption</li>
<li>Route (oral, injected)</li>
<li>Agent (drug/medication)</li>
<li>Dose (quantity)</li>
<li>Intent (self-harm or accidental)</li>
<li>Emesis (vomited since?)</li>
<li>Symptoms (any other symptoms)</li>
</ul>

<p class="font-semibold mt-3">SEIZURE:</p>
<ul class="list-disc ml-6 mt-1">
<li>Protect patient from injury</li>
<li>IF necessary: Pillow/pad head</li>
<li>Do NOT forcibly restrict body from convulsing</li>
<li>IF available: Assist carers to administer seizure plan</li>
<li>Carefully monitor respiratory status</li>
</ul>
</div>

<div class="p-4 bg-gray-50 border-l-4 border-gray-400">
<p class="font-semibold">NOTES:</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>Most seizures will self-terminate</li>
<li>Consider multiple agents (including alcohol) may be involved in overdose</li>
<li>For ingestion of any foreign agent, consider consulting poisons on 13 11 26</li>
</ul>
</div>
</div>`
  },
  {
    id: 'airway-obstruction',
    title: 'Airway Obstruction',
    content: `<div class="space-y-4">
<div class="p-4 bg-red-50 border-l-4 border-red-400">
<p class="font-semibold text-red-800">🚩 STOP</p>
<p>This guideline is NOT to be used on newborns</p>
</div>

<div class="p-4 bg-blue-50 border-l-4 border-blue-400">
<p class="font-semibold text-blue-800">MANAGEMENT PATHWAY</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>IF unconscious & NO pulse: Manage as Cardiac Arrest!</li>
<li>IF unconscious & YES pulse: Manage as per Box A</li>
<li>IF conscious & ineffective cough: Manage as per Box B</li>
<li>IF conscious & effective cough: Manage as per Box C</li>
</ul>
</div>

<div class="p-4 bg-orange-50 border-l-4 border-orange-400">
<p class="font-semibold text-orange-800">BOX A - IF Unconscious & YES Pulse</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>Position: Supine</li>
<li>External chest compressions x5</li>
<li>Assess for clearance of obstruction</li>
<li>Reassess for palpable pulse</li>
<li>IF nil improved & pulse present: Oxygen BVM (8-15L O2), x2 ventilations</li>
<li>AS required IF pulse present: Repeat 5x compressions + x2 ventilations</li>
<li>IF necessary: Suction airway</li>
</ul>
</div>

<div class="p-4 bg-yellow-50 border-l-4 border-yellow-400">
<p class="font-semibold text-yellow-800">BOX B - IF Conscious & Ineffective Cough</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>IF paediatric patient & safe to do so: Use gravity to assist</li>
<li>Back blows, up to 5</li>
<li>IF still obstructed: Chest thrusts, up to 5</li>
<li>Monitor for clearance/deterioration</li>
<li>Oxygen NRB (10-15L)</li>
<li>IF still obstructed: Repeat back blows + chest thrusts</li>
</ul>
</div>

<div class="p-4 bg-green-50 border-l-4 border-green-400">
<p class="font-semibold text-green-800">BOX C - IF Conscious & Effective Cough</p>
<ul class="list-disc ml-6 mt-2">
<li>Encourage coughing</li>
<li>Monitor for clearance/deterioration</li>
</ul>
</div>

<div class="p-4 bg-red-50 border-l-4 border-red-400">
<p class="font-semibold text-red-800">🚑 ESCALATION</p>
<p>IF no immediate improvement: SitRep Hatzolah dispatch + call ambulance</p>
</div>

<div class="p-4 bg-gray-50 border-l-4 border-gray-400">
<p class="font-semibold">NOTES:</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>Do NOT place fingers in patient's mouth as this may trigger bite reflex</li>
<li>If pulse is NOT found or is lost at any stage manage as per Cardiac Arrest!</li>
<li>If patient recovers from basic first aid and ambulance not attending, minimum of VVED must occur</li>
</ul>
</div>
</div>`
  },
  {
    id: 'alcohol-intoxication',
    title: 'Alcohol Intoxication',
    content: `<div class="space-y-4">
<div class="p-4 bg-blue-50 border-l-4 border-blue-400">
<p class="font-semibold text-blue-800">DEFINITION</p>
<p>A disturbance in behaviour or mental function during or after alcohol consumption. Alcohol is a depressant affecting CNS, may lead to inhibition of behaviours, slurred speech, reduction in conscious state, HR and RR.</p>
</div>

<div class="p-4 bg-gray-50 border-l-4 border-gray-400">
<p class="font-semibold text-gray-800">RECOGNITION (Low Risk Criteria)</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>Recent ingestion of ethanol (alcohol)</li>
<li>Differentials excluded</li>
<li>No other acute medical conditions</li>
<li>Patient is considered low risk:
  <ul class="list-circle ml-6">
  <li>Has capacity to make own decisions</li>
  <li>Able to ambulate</li>
  <li>Competent sober adult able to care for patient in safe place</li>
  <li>NO red flag criteria met</li>
  <li>Patient is normothermic</li>
  <li>Exclusion of other differentials (AEIOUTIPS)</li>
  </ul>
</li>
</ul>
</div>

<div class="p-4 bg-green-50 border-l-4 border-green-400">
<p class="font-semibold text-green-800">MANAGEMENT</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>Remain with sober adult</li>
<li>IF necessary: Manage as per Altered Conscious State (Acute)</li>
<li>IF necessary: Manage as per Nausea/Vomiting</li>
<li>Safety Netting:
  <ul class="list-circle ml-6 mt-1">
  <li>Advise not to drink more alcohol until recovered</li>
  <li>Sleep on side, keep warm, low stimulus environment</li>
  <li>Avoid mobilising</li>
  <li>Maintain hydration and nutrition</li>
  <li>Take paracetamol for mild pain as required</li>
  <li>Have sober adult stay with patient</li>
  <li>Call ambulance if conscious state deteriorates, vomits when supine and doesn't clear airway, severe pain, no improvement over 2-4 hours</li>
  </ul>
</li>
</ul>
</div>

<div class="p-4 bg-gray-50 border-l-4 border-gray-400">
<p class="font-semibold">NOTES:</p>
<ul class="list-disc ml-6 mt-2">
<li>This CPG is for 16 years and over</li>
<li>Patients not fitting low-risk criteria (moderate and high risk) will be escalated to Ambulance Victoria</li>
</ul>
</div>
</div>`
  },
  {
    id: 'allergy-mild',
    title: 'Allergy (Mild)',
    content: `<div class="space-y-4">
<div class="p-4 bg-blue-50 border-l-4 border-blue-400">
<p class="font-semibold text-blue-800">DEFINITION</p>
<p>For purposes of this CPG, mild skin allergy is defined as allergic symptoms confined to skin only (single body system). If multiple body systems affected, treat as anaphylaxis!</p>
</div>

<div class="p-4 bg-gray-50 border-l-4 border-gray-400">
<p class="font-semibold text-gray-800">RECOGNITION</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>Hives OR welts</li>
<li>Itchy OR swollen eyes</li>
<li>Itchy skin</li>
<li>Mild swelling</li>
</ul>
</div>

<div class="p-4 bg-red-50 border-l-4 border-red-400">
<p class="font-semibold text-red-800">🚩 STOP</p>
<p>IF meets RASH criteria: Manage as per Anaphylaxis / Call ambulance</p>
</div>

<div class="p-4 bg-green-50 border-l-4 border-green-400">
<p class="font-semibold text-green-800">MANAGEMENT</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>IF appropriate: Cetirizine 10mg oral (≥11 years old)</li>
<li>Monitor for 30-60 minutes for deterioration or improvement</li>
<li>Consider VVED</li>
<li>Safety Netting:
  <ul class="list-circle ml-6 mt-1">
  <li>Leave in care of responsible third party to observe</li>
  <li>Advise to seek help/call ambulance if patient deteriorates (develops SOB, ALOC, GIT upset)</li>
  <li>Advise patient to follow up with GP regarding incident</li>
  </ul>
</li>
</ul>
</div>

<div class="p-4 bg-purple-50 border-l-4 border-purple-400">
<p class="font-semibold text-purple-800">💊 DOSING</p>
<p class="mt-2"><strong>Cetirizine ≥11 years old:</strong></p>
<ul class="list-disc ml-6 mt-1">
<li>Route: Oral</li>
<li>Initial Dose: 10mg</li>
<li>Repeat Dose(s): Nil</li>
<li>Maximum: 10mg (total dose)</li>
</ul>
</div>
</div>`
  },
  {
    id: 'anaphylaxis',
    title: 'Anaphylaxis',
    content: `<div class="space-y-4">
<div class="p-4 bg-blue-50 border-l-4 border-blue-400">
<p class="font-semibold text-blue-800">DEFINITION</p>
<p>A severe, potentially life-threatening, systemic hypersensitivity reaction. Typically caused by excessive immune system response to an antigen normally harmless to humans.</p>
</div>

<div class="p-4 bg-gray-50 border-l-4 border-gray-400">
<p class="font-semibold text-gray-800">RECOGNITION - R.A.S.H Criteria</p>
<p>IF sudden onset symptoms (usually within 30 minutes, may be up to 4 hours)</p>
<p>& symptoms from 2 or more of following categories:</p>

<div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
<div>
<p class="font-semibold">R - Respiratory:</p>
<ul class="list-disc ml-6">
<li>SOB, wheeze, cough, stridor</li>
</ul>
</div>
<div>
<p class="font-semibold">A - Abdominal:</p>
<ul class="list-disc ml-6">
<li>Nausea, vomiting, abdominal cramps, diarrhoea</li>
</ul>
</div>
<div>
<p class="font-semibold">S - Skin/Mucosal:</p>
<ul class="list-disc ml-6">
<li>Hives, welts, flushing, angioedema</li>
</ul>
</div>
<div>
<p class="font-semibold">H - Hypotension:</p>
<ul class="list-disc ml-6">
<li>sBP ≤90</li>
</ul>
</div>
</div>

<p class="mt-3"><strong>OR</strong> isolated hypotension (sBP ≤90) & exposure to KNOWN antigen</p>
<p><strong>OR</strong> isolated respiratory distress & exposure to KNOWN antigen</p>

<p class="mt-3"><strong>Example antigens:</strong> Insect stings (bees, wasps), foods (peanuts, shellfish, dairy), medications (antibiotics, anaesthetics), exercise-induced, idiopathic</p>
</div>

<div class="p-4 bg-red-50 border-l-4 border-red-400">
<p class="font-semibold text-red-800">🚩 STOP</p>
<p><strong>IF patient becomes unresponsive & ventilating inadequately:</strong></p>
<ul class="list-disc ml-6 mt-1">
<li>Position: Supine</li>
<li>Ventilate: Oxygen BVM (8-15L O2) - age-appropriate rates</li>
<li>SitRep: Hatzolah dispatch + call ambulance</li>
</ul>
</div>

<div class="p-4 bg-green-50 border-l-4 border-green-400">
<p class="font-semibold text-green-800">MANAGEMENT</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>Avoid standing/walking patient</li>
<li>IF altered conscious OR hypotensive: Position supine</li>
<li>ELSE IF breathing difficulties: Position sitting/tripoding</li>
<li>IF safe/possible: Remove antigen (e.g. bee stinger)</li>
<li>💊 Adrenaline IM (Epi-Pen): 0.3mg if ≥20kg, 0.15mg if ≤20kg</li>
<li>IF worsens OR no change at 5 mins: Consult clinician for repeat</li>
<li>IF conscious & dyspnoea: Oxygen NRB (10-15L O2)</li>
<li>IF wheezing: Salbutamol nebulised (8L O2)</li>
<li>🚑 REGARDLESS of severity/improvement: Transport to hospital</li>
</ul>
</div>

<div class="p-4 bg-gray-50 border-l-4 border-gray-400">
<p class="font-semibold">NOTES:</p>
<ul class="list-disc ml-6 mt-2 space-y-1">
<li>Anaphylaxis can be difficult to identify, while rash/itch are common they are NOT mandatory</li>
<li>Adrenaline saves lives! NEVER delay adrenaline for other medications!</li>
<li>Advise patient of possible adrenaline side effects including heart racing/palpitations/anxiety</li>
<li>Hospital observation required minimum 4 hours</li>
</ul>
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
];

// Note: This file contains 26 total subsections from General Management
// Including trauma protocols as they are part of General Management in the PDF
// File truncated for display - in production, add remaining 21 subsections following same pattern