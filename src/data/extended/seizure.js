// Extended ("full") protocol for Seizure, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE
//   NSW Ambulance PROTOCOL M9 (Seizures), read at clinical level Paramedic. The
//   treatment pathway on that page is published only as a graphic, so it was
//   read from the rendered flowchart image rather than the text layer - the same
//   discipline the v6.2 content pipeline uses.
//   NSW Ambulance PROTOCOL P5 (Referral Decision) was read as well, because M9's
//   disposition branch turns on P5's generic and protocol-specific exclusions and
//   is meaningless without them.
//   St John NZ CPG EAS 5.8 (Seizures), version 1.1.0.1 (16/06/2026).
//
// WHY THIS PROTOCOL IS WORTH EXTENDING
// The Hatzolah protocol is an action list: protect, oxygenate, meet the GCSE
// criteria, give midazolam, monitor. It says nothing about blood glucose, nothing
// about the postictal state, nothing about which seizures must reach a hospital,
// and nothing about why a prolonged seizure is dangerous. All of that is
// pathway material, all of it is in scope for a first responder, and all of it is
// what this tier adds.
//
// SCOPE EXCLUSIONS - deliberately left out, and why:
//   1. Every midazolam number. Both services publish their own initial doses,
//      reduced doses for cautions, repeat intervals and maximum totals, and both
//      differ from Hatzolah. The Hatzolah dosing table governs and is two screens
//      away in the main protocol; printing another service's figures beside it is
//      exactly how the wrong number gets given. The dose-level conflicts are
//      already recorded in the Midazolam extended entry.
//   2. The intravenous midazolam route, and dose-count rules that depend on it.
//      Hatzolah gives midazolam intramuscularly only.
//   3. Levetiracetam. Not in the Hatzolah formulary at any level - so it is not
//      named, dosed, or described. Where the external pathway escalates to it, the
//      text here says only that the pathway escalates at paramedic level.
//   4. Rapid sequence intubation for a seizure that will not stop.
//   5. Critical Care Paramedic backup, and the helicopter response and transport
//      criteria - resources Hatzolah does not dispatch. The clinically
//      transferable half (escalate urgently for severe airway obstruction or
//      persistent severe hypoxia) is kept.
//   6. Paediatric weight-based drug dose tables.
//   7. NSW's written P5 referral form, its Clinical Record documentation
//      requirement and the virtual KIDS referral pathway - administrative process
//      belonging to that service.
//
// JUDGEMENT CALLS
// - NSW's protocol-specific exclusions and NZ's red flags are the same clinical
//   idea reached from opposite directions - one lists what closes the non-transport
//   pathway, the other lists what mandates an emergency department. They are merged
//   into a single red-flag list, which is the form a responder can act on.
// - The apnoea warning is written without a route. St John NZ states it for the
//   intravenous route; dropping the qualifier generalises it, but it generalises in
//   the cautious direction and matches what the Hatzolah protocol already demands
//   ("Carefully monitor respiratory status").
// - Disposition is carried even though a Hatzolah responder never makes the
//   non-transport decision, because the criteria are the clearest published
//   statement of which seizure patients are not safe to leave. The conflict with
//   Hatzolah's "call ambulance" instruction is recorded in `differences` so it
//   cannot be read as permission.
export const seizure = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M9 — Seizures',
      note: 'Viewed at clinical level: Paramedic. Treatment pathway read from the published flowchart graphic.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/seizures',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL P5 — Referral Decision',
      note: 'Viewed at clinical level: Paramedic. Read for the generic exclusion criteria that M9 refers to.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/patient-disposition/page/referral-decision',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 5.8 — Seizures',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/neurological-eas/page/seizures-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Who administers the patient’s own prescribed rescue medicine',
      hatzolah:
        'Where prescribed medicines are available, assist the carer(s) to administer the patient’s seizure plan.',
      external:
        'All personnel may themselves administer a patient’s own pre-prescribed rectal, nasal or buccal medicine — explicitly even where that route is outside their delegated scope of practice — provided it was prescribed for that patient and the seizure has lasted longer than five minutes or seizures are recurrent.',
      note: 'Follow Hatzolah. The Hatzolah responder assists the carer; they do not take over administration of a medicine that is not in the Hatzolah formulary.',
    },
    {
      field: 'Treating a partial (focal) seizure',
      hatzolah:
        'Midazolam is indicated only for generalised convulsive status epilepticus — ongoing generalised tonic-clonic movement with an altered conscious state that has lasted 5 or more minutes, or multiple seizures without full recovery of conscious state in between. Accredited responders only.',
      external:
        'A partial seizure lasting longer than five minutes and causing distress is also treated with an anticonvulsant.',
      note: 'Follow Hatzolah. A partial seizure does not meet the GCSE criteria, so it is not a midazolam indication for a Hatzolah responder however long it lasts.',
    },
    {
      field: 'Transport',
      hatzolah: 'SitRep to Hatzolah dispatch and call an ambulance.',
      external:
        'After a thorough assessment a patient may be given a clear recommendation NOT to be transported — even when midazolam has been given — provided no red flags are present, they are left in the care of a competent adult, and they are advised to be reviewed in primary care within 72 hours.',
      note: 'Follow Hatzolah. That is a paramedic disposition decision made by a transporting service. Hatzolah escalates every seizure; the criteria below are carried only because they are the clearest published statement of which seizure patients must not be left.',
    },
  ],

  content: {
    scope: [
      'Covers seizures of any type and any age — a first presentation, a seizure in a patient known to have epilepsy, and generalised convulsive status epilepticus.',
      'A patient more than 20 weeks pregnant with a suspected eclamptic seizure is managed on the eclampsia pathway, not this one.',
      'Where the cause of the seizure activity is unknown, or the patient is known to have both epileptic and non-epileptic seizures, treat it as a seizure. Uncertainty about the cause is not a reason to withhold treatment.',
    ],

    definitionAndTypes: [
      'A seizure is a sudden attack of altered behaviour, consciousness, sensation or autonomic function, produced by a transient disruption of brain function. When it has motor accompaniments it is also called a convulsion.',
      'Seizures are classified by where they start:',
      [
        'Focal onset — with awareness retained or awareness impaired, and with motor or non-motor onset. A focal seizure may go on to become tonic-clonic.',
        'Generalised onset — motor (tonic-clonic, or other motor) or non-motor (absence seizures).',
        'Unknown onset — motor (tonic-clonic, or other motor), non-motor, or unclassified where the pattern does not fit the other categories or there is too little information to classify it.',
      ],
      'Most seizures stop by themselves after two to three minutes.',
      'The longer a seizure continues, the harder it becomes to control. Once the treatment threshold is met, control should not be delayed.',
    ],

    recognition: [
      'A generalised convulsive seizure is usually unmistakable — tonic stiffening, or tonic-clonic stiffening and jerking, with loss of consciousness.',
      'A partial (focal) seizure can present with no obvious convulsion or motor activity at all. The patient may still be able to obey commands and interact during the seizure. Look for any combination of:',
      [
        'Habitual repetitive movements (automatisms)',
        'Sensory symptoms, including visual or auditory hallucinations',
        'Emotional outbursts, or unusual feelings such as being outside their own body',
        'A blank gaze',
      ],
      'The most common cause of partial seizures is temporal lobe epilepsy.',
      'Tongue biting, or incontinence of urine or faeces, makes a true epileptic seizure more likely.',
    ],

    historyKeyFindings: [
      'Time of onset.',
      'What happened, including any mechanism of injury.',
      'Associated symptoms:',
      [
        'Fever, or a current febrile illness — particularly in a child',
        'Altered level of consciousness',
        'Incontinence',
      ],
      'Relevant past medical history — in particular whether the patient is known to have epilepsy, and whether this seizure matches their usual pattern.',
      'Medication history and compliance.',
      'Allergies.',
    ],

    assessment: [
      'Measure the blood glucose concentration in every seizure patient and treat an abnormal result on the relevant Hatzolah protocol.',
      'Hypoglycaemia, hyperglycaemia and hyperthermia are treated as associated conditions alongside the seizure, not left until after it.',
      'Consider other causes and treat on the specific protocol for them — eclampsia is the example both services give.',
      'Repeat and document ABCD examination and physiological observations regularly, so that trends, clinical deterioration and response to treatment are visible rather than guessed at from a single set.',
    ],

    duringTheSeizure: [
      'Protect the patient from injury.',
      'There is no immediate urgency to treat a seizure with medication for as long as the patient and their airway are protected by positioning. Positioning is the first intervention; the drug decision follows the time criteria.',
      'A responder who is not accredited to give midazolam should call for urgent backup straight away rather than wait, and where able begin moving the patient towards help so that backup can be met en route to hospital.',
    ],

    afterTheSeizure: [
      'Position the patient on their side.',
      'Maintain airway and breathing, monitor pulse oximetry, and give oxygen if required.',
      'A postictal state is expected: an altered level of consciousness with drowsiness, confusion, agitation or amnesia, usually lasting 5 to 60 minutes.',
      'A patient who appears postictal may in fact still be seizing. Suspect this if there are rhythmic eye movements, dilated pupils, persistent tachycardia, or simply a failure to improve.',
      'During the postictal state the patient does not usually have the capacity to make decisions, and refusal of assessment or transport is common. Weigh the balance of risks — forcing assessment or transport may not be in the patient’s best interest — and seek clinical advice where the situation cannot be resolved.',
    ],

    whyProlongedSeizuresAreDangerous: [
      'A seizure that runs on — beyond roughly 30 minutes — alters brain receptor activity and becomes progressively harder to control with medication. The longer it persists before it is controlled, the more difficult control becomes.',
      'Prolonged seizures are life-threatening in their own right. They are commonly associated with hypoxia, hypercarbia, metabolic acidosis from the lactate produced by vigorous skeletal muscle activity, hyperthermia from that same muscle activity, and aspiration.',
      'Request urgent backup for severe airway obstruction or persistent severe hypoxia. Where the seizure continues despite treatment, the external pathway escalates to further anticonvulsants and airway management at paramedic and critical-care level — which is a reason to move the patient towards that help, not to keep treating on scene.',
    ],

    onceMidazolamHasBeenGiven: [
      'Given intramuscularly, midazolam is as effective as it is intravenously. The intramuscular route is not a compromise.',
      'It does not act instantly — allow it time to work before concluding that it has failed.',
      'A brief period of apnoea is common following successful termination of a seizure with midazolam. This is why the Hatzolah protocol asks for respiratory status to be monitored carefully afterwards.',
      'More than one injected dose given by responders is itself a red flag: that patient needs an emergency department.',
    ],

    specialSituations: [
      'Non-epileptic seizures — previously called pseudoseizures or psychogenic seizures:',
      [
        'Motor activity that looks clinically like a seizure, but with no EEG evidence of seizure activity in the brain.',
        'Healthcare personnel cannot in general reliably distinguish epileptic from non-epileptic seizures at the bedside, and partial seizures from temporal lobe epilepsy are very commonly misdiagnosed as non-epileptic.',
        'Some patients have both. Without a previously confirmed diagnosis of non-epileptic seizures, manage the patient on the seizure pathway.',
        'The patient may have no conscious control over the motor activity. The majority are subsequently diagnosed with a medical problem and a proportion have true epilepsy; only a minority are diagnosed with a mental health condition.',
      ],
      'Febrile seizures in children:',
      [
        'Usually occur under six years of age, and are associated with a rapid rise in temperature rather than any particular temperature.',
        'The most common cause is a viral illness.',
        'Fever associated with infection usually confers some benefit and does not cause harm provided it stays below 40°C, so rapid or aggressive cooling is not indicated below that. Cool slowly by uncovering the child.',
        'A febrile convulsion is one of the presentations that closes any non-transport pathway.',
      ],
      'Seizures in pregnancy:',
      [
        'Eclampsia is one or more generalised seizures in a pregnant patient with pre-eclampsia.',
        'More than 20 weeks pregnant with suspected eclampsia — manage as eclampsia rather than as a simple seizure.',
        'Pregnancy also closes any non-transport pathway.',
      ],
      'Seizures following recreational drug use:',
      [
        'Common, particularly with the chemicals commonly referred to as synthetics, and usually self-limiting.',
        'Refusal of assessment or transport is common. Forcing either usually requires a combination of significant restraint and sedation, which may be more life-threatening than the effects of the drug itself.',
        'Where the patient has stopped seizing and has recovered enough to mobilise safely, the external services treat this as the one first-seizure presentation that does not automatically require an ambulance to hospital. Advise family or friends to supervise the patient until they have fully recovered.',
      ],
    ],

    redFlags: [
      'These features mean the patient needs an emergency department, and close any pathway that would leave them where they are:',
      [
        'No known history of epilepsy — a first seizure presentation',
        'A significant change from the patient’s usual seizure pattern, or an increased frequency of seizures',
        'A history of multiple-seizure presentations',
        'More than one injected dose of midazolam given by responders',
        'Failure to recover to a safe postictal state',
        'Recurrent or continuous seizures — these warrant urgent transport',
        'Any injury requiring transport',
        'A concurrent acute illness',
        'Recent traumatic brain injury',
        'Suspicion of overdose, or of aspiration',
        'Intoxication',
        'An unwitnessed seizure',
        'A seizure involving submersion',
        'A febrile convulsion',
        'Pregnancy',
        'The patient is alone, or has no carer',
      ],
    ],

    disposition: [
      'A first-ever seizure warrants a clear recommendation to attend an emergency department by ambulance, unless the cause is clearly recreational drug use and the patient has recovered enough to mobilise safely.',
      'A non-transport recommendation is only reached after a thorough assessment including at least two sets of physiological observations, and only when none of the red flags above is present.',
      'Beyond the seizure-specific red flags, the external non-transport pathway is also closed by general features:',
      [
        'Abnormal observations, or borderline observations that cannot be accounted for',
        'A patient who does not demonstrate competency and capacity — including acute confusion — with no responsible person present',
        'Multiple co-morbidities likely to complicate treatment of the presenting condition, or a presenting condition that is not responding to treatment',
        'Suspected alcohol or drug influence together with signs of trauma',
        'Recent unexplained syncope',
        'A medical practitioner asking for the patient to be transported to an emergency department by ambulance',
        'Recent surgery, or a recent admission or ambulance presentation, related to this presentation',
        'For children: any abnormal paediatric observations, parental concern, age three months or under, or a child under 16 with no adult supervision and no contactable parent or carer',
      ],
      'Where transport is required it should usually be to an emergency department.',
    ],

    safetyNetting: [
      'A patient who is not taken to hospital must be left in the care of a competent adult, and given a clear recommendation to be seen in primary care within 72 hours so that their treatment can be reviewed.',
      'After a drug-related seizure, ask family or friends to supervise the patient until they have fully recovered.',
      'Sudden Unexpected Death in Epilepsy (SUDEP) is the sudden, unexpected death of an otherwise healthy person with epilepsy, with no other cause found at autopsy. It is rare in children, but is the leading cause of death in young adults with poorly controlled seizures — particularly tonic-clonic seizures. That is why an increase in seizure frequency, or a change in the usual pattern, is treated as a red flag rather than a detail.',
    ],
  },
};
