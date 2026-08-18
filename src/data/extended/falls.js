// Extended ("full") protocol for Falls, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE
// NSW holds the falls pathway itself as PROTOCOL T19, "Falls in the Elderly".
// Its prose is three paragraphs; the pathway is published only as a flowchart
// image (assets/images/info/T19.jpg), which was rendered and read rather than
// scraped from the text layer. T19 leans on three other NSW pages, all read:
// PROTOCOL P5 (Referral Decision) for the criteria that rule a patient out of a
// non-transport referral, PROTOCOL SE1 (Elder at Risk) for the falls-risk
// screens T19 sends every non-transported older patient through, and PROTOCOL
// SE2 (Elder Abuse), which T19's own chart flags in a standing footer.
// PROTOCOL T4 (Head Injuries) supplies the head-strike material - its flowchart
// image carries the head-injury referral exclusions, which the page text does
// not. St John NZ holds the pathway as CPG EAS 13.3 "Falls", and explicitly
// hands the unexplained fall to CPG EAS 13.8 "Transient Loss of Consciousness"
// and the head strike to CPG EAS 4.9 "Concussion and Minor Head Injury"; both
// were read, and both are cited.
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice, with no inline "(NSW)" /
// "(NZ)" tags. Provenance lives on the source chips and in `sources` below.
// Nothing here is invented: every statement traces to a guideline actually read,
// and anything that disagrees with the Hatzolah CPG is kept out of the body and
// recorded in `differences` instead.
//
// SCOPE EXCLUSIONS - what was left out and why
//
//   1. NSW T4's head-injury treatment arm: a fluid Hatzolah does not carry,
//      titrated to systolic BP targets by age band, plus oxygen saturation
//      targets. A drug outside the formulary, and numbers that belong to
//      Hatzolah's own oxygen protocol. Not named, not carried.
//
//   2. The 12-lead ECG features of concern that the transient-loss-of-
//      consciousness guideline lists - ST changes, bundle branch and AV block,
//      QT intervals, pre-excitation, paced rhythms. Hatzolah ACQUIRES a 12-lead
//      and forwards it; it does not interpret one. A list of findings to read
//      off a trace is exactly the step that is not Hatzolah's to take. The
//      history-taking around syncope, which is the transferable part, IS here.
//
//   3. Major trauma triage and destination decisions, and urgent-transport
//      protocols. Hatzolah calls Ambulance Victoria; it does not choose a
//      trauma centre.
//
//   4. Each service's referral plumbing - NSW's written P5 referral form, its
//      geriatric referral pathways, St John NZ's ePRF referral codes and its
//      national telephone advice number. Administrative to those services.
//      The advice-line step is kept in generic form because the ACT of giving
//      worsening advice is the clinically load-bearing part, not the number.
//
// ONE DELIBERATE NUMERIC OMISSION
// Neither service's red/amber observation thresholds are reproduced. The
// Hatzolah falls protocol prints its own two-tier vital-signs table, down to the
// individual figure, and putting a second service's numbers on the same screen
// is the same failure mode as repeating another service's drug doses. Where the
// externals say "abnormal vital signs", that is what is written here.
//
// A JUDGEMENT CALL
// The falls-risk and elder-at-risk SCREENS are carried in full, including the
// grading bands. They are questionnaires and an observed walk - nothing in them
// is outside a first responder's hands - and they are the material that gives
// substance to the Hatzolah protocol's own closing step, the social worker
// referral. The score bands are not clinical thresholds for treatment, so the
// no-numbers rule that governs doses does not apply to them.
export const falls = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T19 — Falls in the Elderly',
      note: 'Viewed at clinical level: Paramedic. Pathway published as a flowchart image.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/falls-in-the-elderly',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 13.3 — Falls',
      note: 'Version 1.0.5.3 (09/06/2025)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/miscellaneous-eas/page/falls-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 13.8 — Transient Loss of Consciousness',
      note: 'No version history published on the page. Used for the unexplained fall.',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/miscellaneous-eas/page/transient-loss-of-consciousness-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 4.9 — Concussion and Minor Head Injury',
      note: 'Version 1.1.0.1 (16/06/2026). Used for the head strike and the elderly brain.',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/trauma-eas/page/concussion-and-minor-head-injury-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL T4 — Head Injuries',
      note: 'Viewed at clinical level: Paramedic. Referral exclusions read off the flowchart image.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/trauma/page/head-injuries',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL P5 — Referral Decision',
      note: 'Viewed at clinical level: Paramedic. Source of the generic referral exclusions.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/patient-disposition/page/referral-decision',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL SE1 — EAR (Elder at Risk)',
      note: 'Viewed at clinical level: Paramedic. Source of the elder-at-risk and falls-risk screens.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/specialised-care/page/ear-elder-at-risk',
      retrieved: '2026-08-18',
    },
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL SE2 — Elder Abuse',
      note: 'Viewed at clinical level: Paramedic. Used only for the forms of abuse and the safety escalation.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/specialised-care/page/elder-abuse',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'A head strike with a brief loss of consciousness',
      hatzolah: 'Loss of consciousness under 5 minutes is a Virtual ED disposition; 5 minutes or longer is hospital transport. GCS under 15 is Virtual ED, GCS under 13 is hospital transport.',
      external: 'Any loss of consciousness at any time, or a GCS below 15, is a red flag on its own and rules the patient out of every non-transport referral pathway. The reason given is that further assessment is needed in case intracranial bleeding develops later.',
      note: 'Follow the Hatzolah thresholds. But note the external reasoning: a patient who looks well now is being sent for the bleed that has not declared itself yet. If anything about the presentation is borderline, escalate.',
    },
    {
      field: 'Amnesia after the fall',
      hatzolah: 'Amnesia lasting under 30 minutes is a Virtual ED disposition; 30 minutes or longer is hospital transport.',
      external: 'Amnesia of any duration rules the patient out of a non-transport referral after a head strike.',
      note: 'Hatzolah governs. Be aware the external pathway sets no duration at all here.',
    },
    {
      field: 'Anticoagulants and dual antiplatelet therapy after a head strike',
      hatzolah: 'Anticoagulants, and antiplatelets other than aspirin, are moderate risk factors — a Virtual ED disposition.',
      external: 'A head strike in a patient on an anticoagulant, on dual antiplatelet therapy, or with a known bleeding disorder is a red flag for an emergency department, even with no loss of consciousness, because many will need a CT scan. A narrow exception is allowed only if the strike was clearly trivial, there are no external signs of head trauma, there are no signs or symptoms of concussion, and this is their only red flag.',
      note: 'Hatzolah governs the disposition. The external threshold is markedly lower, so treat this as a strong prompt to escalate rather than a routine Virtual ED case.',
    },
    {
      field: 'The window for concern about another fall',
      hatzolah: 'Hospital transport if the patient is likely to fall again within 24 hours.',
      external: 'A concern about another fall within 24 to 48 hours sends the patient to an emergency department — and so does any identified falls risk that could not be reconciled, regardless of a time window.',
      note: 'Use Hatzolah’s 24-hour window. The "unreconciled risk" test is an addition, not a conflict: a risk you found and could not fix is a reason to escalate even inside 24 hours.',
    },
  ],

  content: {
    scope: [
      'Covers the assessment and disposition of a patient who has fallen: whether they need an emergency department, follow-up in primary care, or can safely stay where they are with advice.',
      'The Hatzolah protocol is written for an adult who has fallen less than a metre and is alert on arrival. The external guidance puts its raised-suspicion threshold in the same place — a fall of more than one metre, or more than five stairs in an adult, warrants a higher index of suspicion for injury than the routine pathway assumes.',
      'If the patient is suspected to have fallen because they lost consciousness, the fall is the consequence rather than the problem. Work the loss-of-consciousness questions below as well as the injury assessment.',
    ],

    generalPrinciples: [
      'Falls are among the most common reasons an ambulance is called. Between a quarter and a third of older people report at least one fall a year and many fall more than once, and fall-related injury is a leading cause of hospitalisation and of loss of independence in this group.',
      'Falls are often caused by an undiagnosed medical problem — syncope, cardiac ischaemia, a dysrhythmia and infection are the usual culprits. It is the medical assessment that rules these out, not the fact that the patient fell.',
      'A patient who has fallen without a clear mechanical cause such as a trip or a slip needs a thorough history and clinical examination to look for a cause of collapse.',
      'A patient who has fallen always needs an assessment for injury, even when they appear uninjured.',
      'Falling is not a natural part of ageing. A fall in an older person is a signal, not a background fact about being old.',
      'Raise your index of suspicion for injury if the patient fell a significant height — more than a metre, or more than five stairs — or is taking an anticoagulant or dual antiplatelet therapy, or has a known bleeding disorder.',
      'Always weigh the patient’s comorbidities and their social circumstances alongside the physical findings.',
      'Do not describe the job as a "lift assist". That term belongs to one crew helping another crew lift a patient, and applying it to a patient who has fallen hides the assessment they were owed.',
    ],

    assessment: [
      'Take a comprehensive history and perform a thorough primary and secondary survey, so that a head, chest, pelvic or hip injury — or the illness behind the fall — is not missed.',
      'Assessing the patient’s ability to mobilise and to meet the activities of daily living is a key element of the assessment, not an afterthought once injury has been excluded.',
      'Complete the assessment with at least two sets of physiological observations before recommending anything other than transport, and repeat and document examination and observations so that a trend is visible. A patient who is deteriorating is identified by the second set, not the first.',
    ],

    theUnexplainedFall: [
      'When the patient lost consciousness, most of the diagnostic value is in the history rather than the examination. A witness account matters; if the witness has left, phone them.',
      'Work through the event in order:',
      [
        'What posture was the patient in beforehand? A prolonged period of standing commonly precedes a benign faint.',
        'Was there a provoking factor — a procedure such as an injection, or a circumstance such as the sight of blood?',
        'Were there prodromal symptoms? Feeling hot or sweaty beforehand is typical of a benign faint.',
        'What did the patient look like during the event? Marked pallor is usual, and reflects the low cardiac output.',
        'Were abnormal movements seen? Brief twitching can occur in a faint, but rhythmic jerking, or movements that go on for more than a moment, suggest a seizure.',
        'How long were they unconscious, and were they confused afterwards? Most recover fully within a few minutes. A very brief disorientation can occur; confusion persisting beyond a few minutes suggests a neurological cause.',
      ],
      'Tongue biting or urinary incontinence suggests a seizure rather than a faint.',
      'A benign faint is a brief fall in cardiac output, usually with a slow heart rate, in a patient without important disease. They should regain a normal level of consciousness within a few minutes of lying down. If they do not, stop assuming a faint and look for another explanation.',
      'Transient loss of consciousness is common and usually benign, but it is also how important heart disease presents. Features that point towards an emergency department include a suspected cardiac cause, a pacemaker or implanted defibrillator, new or unexplained chest pain or shortness of breath, a moderate to severe headache, onset during exertion, onset while lying down, pregnancy, and failure to recover to normal for that patient.',
      'Features that point towards review in primary care within a couple of days include age over 65, a history of heart disease, postural hypotension, and a family history of a dysrhythmia or of sudden cardiac death.',
      'Postural hypotension means a drop of more than 20 mmHg systolic, or more than 10 mmHg diastolic, on standing.',
    ],

    headStrike: [
      'Use a head-strike assessment for any patient who can obey commands and whose mechanism is consistent with a strike or blow to the head.',
      'Alongside the assessment for physical injury, assess:',
      [
        'Conscious level.',
        'Mental status — orientation, attention and memory.',
        'Symptoms of concussion such as headache and nausea.',
        'Signs of concussion such as vomiting, disorientation or reduced attention.',
        'Coordination and balance — watch the patient walk, and perform the finger-nose test.',
      ],
      'Presume traumatic brain injury or concussion if any of these are abnormal, or if there is any abnormality of memory, coordination or balance.',
      'The finger-nose test: ask the patient to put the tip of their index finger on their nose. Hold your own finger about 30 cm away and ask them to touch it, then their nose, then your finger again, moving your finger slowly between attempts. Normal coordination touches accurately; abnormal coordination misses or overshoots.',
      'Concussion is a brain injury where nothing shows on a CT scan but brain function is altered. It can occur with no loss of consciousness at all, its symptoms are often significant, and they can impair brain function for many months. Repeated concussion has long-term effects, which is why medical assessment is needed before returning to anything that risks another impact.',
      'Being stunned for several seconds after a head strike is common, and bystanders often report it as the patient being knocked out. That is not loss of consciousness unless there is a clear history of the patient being unconscious for longer than a few seconds. This judgement matters, because it changes the disposition.',
      'Keep a high index of suspicion for a significant head injury where there is:',
      [
        'Loss of consciousness, or an altered conscious level on your assessment.',
        'Nausea or vomiting.',
        'Significant injury above the clavicles.',
        'A suspicious mechanism of injury.',
        'Amnesia for events before or after the impact.',
        'Age 65 or over.',
      ],
      'Lower your threshold for recommending an emergency department if the patient has taken alcohol or drugs.',
      'The concussion assessment can be used for a child, provided they are old enough to cooperate with a history and an examination.',
    ],

    theElderlyBrain: [
      'Older people are at increased risk of bleeding inside the skull after a minor head injury, particularly subdural bleeding. Cerebral atrophy widens the subdural space and stretches the bridging veins across it, so they tear with an injury as small as a fall in which the patient appears unhurt.',
      'Subdural bleeding can develop slowly over many days, and may declare itself only as something subtle — a slight reduction in cognitive function. Older patients may not recognise it, may not seek help in time, and are at increased risk of falling again once the brain is injured.',
      'There is no age at which a patient becomes "elderly"; it is a judgement. The risk of subdural haemorrhage rises above 65 and rises further with frailty.',
      'A patient on an anticoagulant, on more than one antiplatelet medicine together, or with a known bleeding disorder has an increased risk of intracranial bleeding after a head strike even with no loss of consciousness, and many will need a CT scan. Minor trauma in these patients can produce significant haemorrhage.',
    ],

    redFlags: [
      'Any of the following means the patient should be seen in an emergency department, usually arriving by ambulance:',
      [
        'Clinically significant injury.',
        'Clinically significant pain.',
        'Abnormal vital signs.',
        'Signs of stroke.',
        'Headache with features of concern.',
        'New onset of visual disturbance.',
        'Unable to mobilise when normally able to do so.',
        'An unstable medical condition that contributed to the fall.',
      ],
      'Deciding that a headache has features of concern takes judgement. Examples: a headache that is new since the fall, especially if it is worsening or comes with nausea or vomiting; a headache in a patient on an anticoagulant or dual antiplatelet therapy; or any of the red flags from the headache guidance.',
      'Examples of an unstable medical condition contributing to a fall are diabetes with poor glucose control and poorly controlled Parkinson’s disease. Whether that needs an emergency department or a primary-care review is a judgement.',
      'A patient with a concerning history must be transported for further medical assessment and treatment.',
    ],

    whatRulesOutAReferralPathway: [
      'Even where an alternative to emergency transport exists, these rule a patient out of it:',
      [
        'Observations in the red zone, or amber observations that have not been adequately explained.',
        'The patient does not demonstrate competency and capacity — including acute confusion — and no responsible person is present.',
        'Multiple comorbidities that have not been reconciled and are likely to complicate treatment, or a presenting condition that has not responded to treatment.',
        'Suspected alcohol, drug or medication effect that alters clotting, together with signs of trauma such as facial swelling or bruising after the fall.',
        'A recent syncope that has not been explained.',
        'A doctor has asked for the patient to be taken to an emergency department by ambulance.',
        'A recent operation, hospital admission or ambulance attendance related to the same problem, or a problem that needs a hospital intervention.',
      ],
      'Specific to falls:',
      [
        'Major trauma criteria met.',
        'A suspected medical cause for the fall — sepsis, delirium, a cardiac cause.',
        'An injury requiring assessment or treatment in an emergency department.',
      ],
      'Specific to a head strike:',
      [
        'Any suspicion of brain injury.',
        'Any loss of consciousness at any time, or a GCS below 15.',
        'Amnesia.',
        'Suspicion of a skull fracture.',
        'A suspicious mechanism of injury.',
        'Nausea or vomiting.',
        'Suspected influence of alcohol or drugs.',
        'Anticoagulant or antiplatelet medication, or a known coagulopathy.',
        'Known or suspected pre-existing cerebral pathology or neurological impairment.',
        'No responsible carer available.',
      ],
    ],

    orangeFlags: [
      'A middle tier sits below the red flags: the patient does not need an emergency department now, but should be followed up in primary care — the external guidance sets that within 48 hours.',
      [
        'More than one fall in the last week.',
        'Postural hypotension.',
        'A recent change in medication.',
        'A minor injury requiring non-urgent treatment.',
        'A new reduction in mobility, but still able to weight bear.',
      ],
      'After a head strike, mild or moderate signs or symptoms of concussion, or a recent previous concussion, sit at this level too.',
    ],

    disposition: [
      'With one or more red flags, the patient must be given a clear recommendation to be assessed by a doctor within two hours, and should usually be given a clear recommendation to travel to an emergency department, usually by ambulance.',
      'If a patient with a red flag is instead going to primary care, all three of the following must hold:',
      [
        'Their anticipated clinical needs can be safely met in primary care, and',
        'A clinician in primary care has been contacted directly and has agreed to accept them, and',
        'Safe transport is available where it is needed.',
      ],
      'With orange flags and no red flags, give a clear recommendation to be followed up in primary care.',
      'With no red and no orange flags, the patient is usually suitable to be given a clear recommendation to remain in the community with self-care, plus worsening advice.',
      'Separately from the injury question: assess the reasons for the fall and attempt to reconcile each falls risk you identify. A concern that the patient will fall again within the next day or two, or any risk you could not reconcile, is itself a reason for an emergency department.',
      'After a minor head strike where an emergency department is recommended, it does not necessarily have to be by ambulance, provided the patient has a GCS of 15, is asymptomatic, is accompanied by a competent adult, and suitable private transport is available within an hour or two.',
      'Additional judgement applies where the patient is already in hospital-level care or has dementia. It may be appropriate for them to remain where they are, but only after liaising with an appropriate registered health professional attached to the facility, and giving worsening advice.',
    ],

    fallsRiskScreening: [
      'A patient aged 65 or over who has fallen, is living independently, and is not being taken to an emergency department should have a falls risk assessment before you leave. NSW sets the same threshold at 50 for Aboriginal and Torres Strait Islander people.',
      'This is not required for a patient living in an aged residential care facility, because the facility carries that duty. A patient in an independent unit or villa within the same complex as such a facility counts as living independently.',
      'Three screening questions:',
      [
        'Have you slipped, tripped or fallen in the last year?',
        'Do you need to use your hands to get out of a chair?',
        'Are there any activities you have stopped doing because you are afraid of falling?',
      ],
      'Refer on if the answer to any of them is yes, or if you judge the patient to be at risk of falling regardless of how they answered.',
      'A fuller screen grades three domains: how many falls in the last twelve months; how much help the patient needs with instrumental activities of daily living such as medications, toileting, cooking, housework and laundry; and their balance, judged by watching them stand, walk a few metres, turn and sit. Observe with their walking aid if they use one, never grade on self-report, take the most unsteady rating where it fluctuates, and score at the worst level if injury prevents them walking at all. A low total still prompts referral where balance or daily-living function is impaired at all; a high total prompts a multifactorial risk assessment.',
      'A longer elder-at-risk questionnaire asks whether the patient lives alone or is a carer for someone; whether they have difficulty walking or have fallen in the last twelve months; whether they have difficulty managing their day-to-day needs; whether they have been in an emergency department in the past month; whether they have significant difficulty with memory; whether they have lost weight in the last three months; whether they have difficulty swallowing food or fluids; and whether they take four or more medicines daily. A yes to any one of them is a risk to be reconciled before deciding where the patient goes.',
      'Examine the environment while you are in it. Rugs, mats, cords and poor footwear are the common hazards, and they can be eliminated on the spot with the patient’s permission.',
      'Early referral of an older patient who has fallen reduces the risk of another fall and another injury, and identifying them early puts support in place before a crisis. It can also prevent an unnecessary transport of a patient who is clinically well.',
      'What a falls prevention service offers is worth being able to describe when you make the referral: strength and balance programmes, mobility aids, vision testing and a medication review.',
      'Give the referral as much detail as you can — how the patient answered the screening questions, whether they use a mobility aid, whether they need help with activities such as showering, whether they can leave the house unassisted, and any obvious falls hazards in the home.',
    ],

    elderAbuse: [
      'A fall brings you inside someone’s home, and the falls pathway carries a standing reminder to be alert to abuse of an older person: a single or repeated act, or a failure to act, within a relationship where there is an expectation of trust, that causes harm or distress.',
      'It takes several forms and they often occur together — financial, psychological, physical and sexual abuse, and neglect, meaning a responsible person failing to provide the necessities of life such as adequate food, shelter, clothing, or medical or dental care. Self-neglect and self-harm are not part of this definition.',
      'Respect the patient’s privacy and confidentiality, but do not promise complete confidentiality to anyone who raises a concern, including the patient. Seek consent before reporting, except where police involvement is necessary.',
      'Request police attendance where the situation has caused serious injury to the older person, where a weapon is present or being threatened, where there is an immediate serious risk to anyone’s safety, or where you are threatened.',
      'Hatzolah’s protocol carries its own social work referral step. Escalate a concern of this kind through that, not through another service’s reporting mechanics.',
    ],

    safetyNetting: [
      'Every patient who is not transported, and their family or carers, must be given worsening advice — preferably in writing.',
      'It has two limbs:',
      [
        'If symptoms recur but the patient quickly returns to their normal self, be seen in primary care or ring a telephone health advice service.',
        'If symptoms recur and the patient does not quickly return to their normal self, call an ambulance.',
      ],
      'After a head strike where transport is not recommended, the patient should be seen in primary care within 48 hours, should remain with a competent adult until then, and should be given a head injury advice sheet together with an explanation of the advice in it — the sheet handed over without the explanation is not the same thing.',
      'If there are any signs or symptoms of concussion, clearly recommend the patient immediately stops any activity or sport that might produce another head impact, until they have been assessed. Where there is doubt, recommend they stop: the onset of concussion symptoms can be delayed, so an apparently clear assessment at the scene is not a clearance.',
      'The stand-down period before returning to an activity is set by a health professional in primary care, not by the responder at the scene.',
    ],
  },
};
