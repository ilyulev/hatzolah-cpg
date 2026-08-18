// Extended ("full") protocol for Acute Altered Consciousness, merged from the
// NSW Ambulance and St John NZ clinical practice guidelines.
//
// PROVENANCE
// Neither service publishes a single "acute altered conscious state" guideline.
// The Hatzolah protocol is a trunk with three named limbs — head injury, overdose
// and seizure — so the external material was assembled the same way, from the
// guidelines that actually own each limb:
//   NSW Ambulance PROTOCOL DT1 (General Approach to the Poisoned Patient),
//   PROTOCOL T4 (Head Injuries), CPG BD1 (Behavioural Disturbance) and
//   PROTOCOL R46 (Delirium), all read at clinical level Paramedic.
//   St John NZ CPG EAS 5.5 (Poisoning from Medicines), CPG EAS 5.6 (Poisoning
//   from Recreational Drugs), CPG EAS 4.10 (Severe Traumatic Brain Injury) and
//   CPG EAS 5.8 (Seizures).
// Every statement below traces to one or more of those pages. Nothing is filled
// in from general medical knowledge.
//
// DELIBERATELY THIN ON SEIZURES
// Seizure has its own extended entry, built from the same NZ guideline and from
// NSW PROTOCOL M9. Reproducing that pathway here would put two copies of the same
// disposition rules in the app, which is how they drift apart. The seizure limb
// below is cut back to the part that bears on THIS protocol — reading a conscious
// state that a seizure may explain, and the trap of a patient who looks postictal
// but is still fitting.
//
// SCOPE EXCLUSIONS — left out rather than softened
//   1. Naloxone. Both services carry it for suspected opiate poisoning and both
//      write at length about titrating it. Hatzolah carries no opioid antagonist,
//      so it is not named, dosed or described. The clinically transferable half —
//      that an altered conscious state after poisoning is usually sedative, and
//      that supportive care is the treatment — is kept.
//   2. Levetiracetam, sodium bicarbonate, hypertonic saline, metaraminol,
//      adrenaline infusions, cefazolin, intravenous glucose, ketamine and
//      droperidol. None are in the Hatzolah formulary at any level.
//   3. Every dose figure, including for midazolam, oxygen and normal saline,
//      which Hatzolah does carry. Doses live in the main Hatzolah protocols;
//      printing another service’s numbers beside them is how the wrong number
//      gets given. Oxygen flow rates and mask types are covered by the same rule,
//      which is why the head-injury oxygen point below carries the reasoning and
//      not the litres.
//   4. Procedures out of reach of a first responder: rapid sequence intubation,
//      capnography targets for a ventilated patient, infusion devices, and
//      12-lead ECG interpretation.
//   5. Chemical and physical restraint, and the NSW legal framework for treating
//      a behaviourally disturbed patient without consent (Guardianship Act,
//      Mental Health Act, Care and Protection Act). That is another service’s
//      jurisdiction and another service’s authority, not clinical background.
//   6. Critical Care Paramedic backup tiers, helicopter tasking, and destination
//      policy for neurosurgical hospitals.
//   7. Hospital-only toxicology management — gut decontamination, chelation and
//      antidote therapy.
//
// JUDGEMENT CALLS
// - The two services differ in emphasis on how fast to reach for an anticonvulsant:
//   one stresses controlling the seizure without delay, the other says there is no
//   immediate urgency while position protects the airway. Both agree that a seizure
//   gets harder to stop the longer it runs. Only the shared ground is written here;
//   when the drug step applies is a Hatzolah decision and is in the main protocol.
// - Transient loss of consciousness — the patient who has collapsed and already
//   recovered — was read and left out. St John NZ files it as a separate pathway
//   with its own red flags built largely on 12-lead ECG findings, and the Hatzolah
//   protocol here is explicitly about a state that is still present.
export const alteredConsciousnessFr = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL DT1 — General Approach to the Poisoned Patient',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/toxicology/page/general-approach-to-the-poisoned-patient',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T4 — Head Injuries',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/head-injuries',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'CPG BD1 — Behavioural Disturbance',
      note: 'Viewed at clinical level: Paramedic. Read only for the medical causes of agitation.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/behavioural-disturbance/page/behavioural-disturbance',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL R46 — Delirium',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/reference/page/delirium',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 5.5 — Poisoning from Medicines',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/metabolic-poisoning-eas/page/poisoning-from-medicines-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 5.6 — Poisoning from Recreational Drugs',
      note: 'Version 1.0.4 (11/09/2023)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/metabolic-poisoning-eas/page/poisoning-from-recreational-drugs-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.10 — Severe Traumatic Brain Injury',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/severe-traumatic-brain-injury-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 5.8 — Seizures',
      note: 'Version 1.1.0.1 (16/06/2026). Read only for the postictal state.',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/neurological-eas/page/seizures-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Whether an ambulance is required',
      hatzolah: 'SitRep to Hatzolah dispatch and call an ambulance, for every acute altered conscious patient.',
      external:
        'Both services define pathways in which an altered conscious patient is NOT transported: a patient who has recovered from recreational drug use and can mobilise safely may be recommended to stay in the community, and a minor head injury producing only a haematoma or contusion may be referred to a general practitioner.',
      note: 'Follow Hatzolah. Those are disposition decisions belonging to services that can also assess, observe and follow the patient up themselves. The criteria are carried below only because they are the clearest published statement of which patients must NOT be left.',
    },
    {
      field: 'Oxygen once a head injury is suspected',
      hatzolah:
        'An altered conscious patient who is ventilating adequately receives oxygen by non-rebreather mask; the flow is set by the Hatzolah protocol.',
      external:
        'Oxygen is given routinely in severe traumatic brain injury even when the oxygen saturation is already normal, but the choice of device and flow is treated as a pragmatic one and a simple mask is considered adequate for most such patients.',
      note: 'Follow Hatzolah for the device and the flow. What transfers is the reasoning: hypoxia is one of the causes of secondary brain injury, so oxygen is not withheld from a head-injured patient because the saturation reading looks acceptable.',
    },
  ],

  content: {
    scope: [
      'Covers a new reduction in a patient’s level of consciousness that is still present — the patient who cannot obey commands, and the patient who can but is drowsy, confused, agitated or amnesic.',
      'Both services hinge their decisions on one question: can the patient obey commands? It decides whether a head-injured patient is treated as a severe brain injury, when backup is escalated, and whether a poisoned patient has recovered enough to be left. Establish it early and re-check it.',
      'Treatment of poisoning is rarely agent-specific. It is supportive — airway, breathing and circulation, and making sure the patient gets the assessment and follow-up they need.',
    ],

    sceneSafety: [
      'In any poisoning or overdose the responder’s own safety is the first priority. Assess the scene before committing to it, request additional resources where they are needed, and use personal protective equipment to reduce your own exposure.',
      'Drugs and poisons may be swallowed, inhaled, injected or absorbed through the skin, and the exposure may be accidental or deliberate — either changes what you are standing in.',
      'Police assistance is not routinely required, but should be requested if any of the following apply:',
      [
        'There is significant risk of injury to the patient, to you or to bystanders',
        'Agitation is causing a severe or immediately life-threatening risk to safety',
        'More than minimal restraint would be needed to treat the patient',
      ],
    ],

    agitationIsAMedicalSignFirst: [
      'Critical illness causes agitation. It must not be discounted before the patient has been examined thoroughly — the aim of the first look is not a diagnosis but a differential good enough to make the patient safe to assess properly.',
      'Medical causes of agitation and acute behavioural disturbance to work through:',
      [
        'Acute delirium',
        'Head trauma',
        'Encephalitis, meningitis or other infection',
        'Encephalopathy, particularly from liver or kidney failure',
        'Metabolic derangement, including hypoglycaemia',
        'Hypoxia',
        'The postictal phase of a seizure',
        'The behavioural and psychological symptoms of dementia',
        'Physical injury and pain',
        'Intoxication with, or withdrawal from, alcohol, hallucinogens, stimulants, cannabis, synthetics, opioids or benzodiazepines',
      ],
      'In an older patient, consider delirium and dementia specifically.',
      'Stimulants can produce extreme agitation, fear or aggression that presents as extreme strength. The accompanying disruption of autonomic function causes hyperthermia, severe hypertension and a rise in oxygen demand, which puts the patient at high risk of cardiovascular collapse — the agitation is the visible part of a physiological emergency.',
      'Information from family, carers and other services already involved with the patient helps build the differential and the risk assessment, and is worth gathering wherever it is available.',
    ],

    assessment: [
      'After the initial resuscitation, a structured risk assessment is the most important step in a suspected poisoning. It usually reassures you that good supportive care is all that is needed, which prevents unnecessary intervention; where it does not, it warns you early that severe toxicity is possible.',
      'Risk assessment is built from:',
      [
        'The agent — what it is, and how toxic it is in itself',
        'The dose, the route of exposure, and the time since exposure',
        'Patient-specific vulnerabilities — age, sex, other illnesses, and anything taken alongside',
        'What the patient has done since the exposure',
        'The clinical effects and the observations in front of you',
      ],
      'Take a good history from the patient and corroborate it — from relatives, from witnesses, from anyone who saw the onset. Recreational drugs are often adulterated, so the stated dose and composition may be unreliable, and they are commonly taken in combination, with alcohol in particular, producing uncertain and compounding effects.',
      'Measure the blood glucose in every altered conscious patient and treat it accordingly. Hypoglycaemia mimics a severe brain injury.',
      'Do not take drugs or vomit to hospital in the hope of identifying the agent.',
      'Where questions remain about an agent, specialist advice is available from the Poisons Information Centre.',
    ],

    airwayPositioningAndVentilation: [
      'Position is treatment. While the patient and their airway are protected by position, there is no urgency to reach for anything else.',
      'After a seizure, put the patient on their side, maintain airway and breathing, monitor the oxygen saturation and give oxygen if it is needed.',
      'In a suspected severe traumatic brain injury, give oxygen routinely to prevent hypoxia, even when the saturation is already normal.',
      'The possibility of a basal skull fracture does not contraindicate a nasopharyngeal airway if that is what is needed to keep the airway open — for example where the jaw is clenched.',
    ],

    whyAnUnconsciousPatientDeteriorates: [
      'An unconscious patient, from any cause, is at increased risk of aspiration pneumonitis, rhabdomyolysis and compartment syndrome. The longer they lie there, the more of that risk accrues.',
      'A prolonged seizure is life-threatening in its own right, because of what comes with it — hypoxia, carbon dioxide retention, metabolic acidosis from vigorous muscle activity, hyperthermia from the same, and aspiration. A seizure also becomes harder to stop the longer it runs.',
      'If an overdose patient arrests, prolonged CPR is essential. Unlike an arrest caused by cardiovascular disease, most of these patients were healthy beforehand and the cause may be reversible.',
    ],

    ifPoisoningIsSuspected: [
      'An altered conscious state after poisoning from medicines is usually caused by benzodiazepines, antidepressants, antipsychotics, opiates, sedatives, or a combination of them.',
      'What the common recreational agents do to conscious state:',
      [
        'GHB may leave the patient deeply unconscious with a poor airway, poor breathing and intermittent apnoea. Assisted ventilation is commonly needed and the patient often improves rapidly after twenty to thirty minutes — longer if another sedative such as alcohol was also taken.',
        'MDMA may cause an altered conscious state, seizures and hyperthermia.',
        'Ketamine may cause hallucinations or an altered conscious state.',
        'Amphetamines and methamphetamine may cause severe hypertension, tachycardia and disturbed behaviour, sometimes severe and associated with violence or attempted suicide.',
        'Cathinones behave like amphetamines, adding hallucinations, paranoia and panic.',
        'Synthetics — mixtures of synthetic chemicals added to dried plant material — may cause an altered conscious state, seizures, agitation and cardiac arrest.',
        'Cannabis and cannabinoids may cause mental dissociation, anxiety, tachycardia, palpitations, chest pain, nausea and vomiting.',
        'Cocaine may cause severe hypertension, tachycardia, intracranial haemorrhage, coronary artery spasm and myocardial ischaemia.',
        'Alcohol impairs gluconeogenesis and may itself cause hypoglycaemia, particularly in children and adolescents.',
      ],
      'Two agents look well and are not:',
      [
        'Significant paracetamol poisoning is commonly asymptomatic for the first six to twelve hours, then produces nausea, vomiting and non-specific abdominal pain. It causes acute liver failure that is treatable only if treatment starts early, and needs a hospital blood level even in a patient with no symptoms.',
        'Iron is in many multivitamins and is potentially lethal. It produces early gastrointestinal effects, then a delayed collapse with shock, acidosis and liver and kidney failure — with an apparent recovery in between.',
      ],
      'Serotonin toxicity can follow any combination of medicines or substances that raise brain serotonin. It presents with tachycardia, tachypnoea, hypertension, sweating, hyperthermia, tremor, rigidity, confusion, agitation and seizures, and in its severe form with unconsciousness and severe shock. Uncover the patient and measure the temperature repeatedly. Ondansetron must not be used for the nausea and vomiting, as it may make serotonin toxicity worse.',
      'Poisoning in children has a shape: unintentional poisoning is commonest between one and six years and peaks at two; it is uncommon between six and ten, though the medicines used for attention deficit hyperactivity disorder have changed that; and over ten years old, an overdose is usually deliberate.',
    ],

    ifThePatientHasHadASeizure: [
      'The seizure pathway itself — types, red flags and disposition — is covered in full by the Seizure protocol. What follows is only what bears on reading the conscious state.',
      'After a seizure it is normal for the patient to be drowsy, confused, agitated or amnesic. This postictal state usually lasts between five and sixty minutes.',
      'A patient who appears postictal may still be seizing. Suspect this if there are rhythmic eye movements, dilated pupils, persistent tachycardia, or simply a failure to improve.',
      'During the postictal state the patient does not usually have capacity to make decisions, and it is common for them to refuse assessment or transport. Weigh the balance of risks: forcing the issue may not be in the patient’s interest, and clinical advice is worth seeking where it cannot be resolved.',
      'A partial seizure may run with no obvious convulsion at all. The patient may obey commands and interact with you while showing habitual repetitive movements, visual or auditory hallucinations, emotional outbursts, unusual feelings such as being outside their own body, or a blank gaze.',
      'Seizures after recreational drug use are common, particularly with synthetics, and are usually self-limiting.',
    ],

    ifAHeadInjuryIsSuspected: [
      'Secondary brain injury is the damage that happens after the first blow, and it is the part you can change. Its common causes are hypoxia, hypoventilation, hypotension and hyperventilation — which is why airway, oxygenation, ventilation and perfusion are the treatment for a head injury.',
      'Keep a high index of suspicion for a significant head injury where there is:',
      [
        'A history of loss of consciousness, or an altered conscious state on your assessment',
        'Nausea or vomiting',
        'Significant injury above the clavicles, especially in an unconscious patient',
        'A suspicious mechanism of injury',
        'Amnesia for events before or after the injury',
        'Age 65 years or over',
      ],
      'A patient who is intoxicated and cannot obey commands after trauma is presumed to have a severe brain injury until proven otherwise — however convincing the intoxication is as an explanation.',
      'Signs pointing to raised intracranial pressure: lateralising neurological signs such as one dilated pupil, posturing, severe hypertension with either bradycardia or tachycardia, and irregular respirations.',
      'The presence or absence of a skull fracture does not correlate with the severity of the brain injury. Most cannot be diagnosed without imaging, a fracture can exist without brain injury and severe brain injury without a fracture — so do not spend significant time looking for one.',
      'A patient with a suspected significant head injury must be transported for assessment and observation.',
    ],

    delirium: [
      'Delirium is an acute change in mental function. Its onset is always sudden. It usually lasts a few days but can persist longer, and if it is not resolved quickly it leads to falls, pressure injuries, longer hospital stays and death.',
      'It is common, it affects any age group but especially older people, and in older people it is often overlooked or misdiagnosed. The responder is frequently the patient’s first contact with the health system, so the index of suspicion has to be yours.',
      'The value you add is naming it. Identify a potential cause where you can, and hand over the specific signs and symptoms you found on assessment rather than a general impression of confusion.',
    ],

    disposition: [
      'Disposition after a poisoning follows the risk assessment, not the name of the drug.',
      'The following make an emergency department assessment necessary after drug or alcohol poisoning:',
      [
        'Signs or symptoms consistent with a traumatic brain injury',
        'The patient tolerates an airway adjunct',
        'Hypoglycaemia that does not respond to treatment',
        'Very abnormal physiology — a poor airway, poor breathing, signs of shock, or moderate to severe hypothermia',
        'Significantly abnormal vital signs of any kind',
      ],
      'A patient who has deliberately self-poisoned needs their psychiatric state assessed before any discharge. That applies to recreational drug use too, because deliberate self-harm is common in that group. In a young child, the social situation and the reason for the poisoning matter as much as the agent.',
      'Suspected paracetamol or iron poisoning goes to hospital even when the patient looks completely well.',
      'A patient with a suspected significant head injury goes for assessment and observation.',
    ],

    safetyNetting: [
      'A patient with a reduced conscious state needs regular observation, not a single set of numbers — in general half-hourly respiratory rate, oxygen saturation, heart rate and conscious level.',
      'Where a patient is left with family or friends, tell them plainly to supervise until the patient has fully recovered, and say what recovered looks like.',
      'The threshold for seeking clinical advice should be low wherever the situation is difficult to resolve or the patient is a long way from definitive care.',
    ],
  },
};
