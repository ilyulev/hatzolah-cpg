// Extended ("full") protocol for Pain Relief (Non-Cardiac), merged from the NSW
// Ambulance and St John NZ clinical practice guidelines.
//
// PROVENANCE
//   NSW Ambulance   CPG OT1 Analgesia, read at clinical level "Paramedic",
//                   including the OT1 "Clinical Management" algorithm graphic,
//                   which carries the stepwise ladder the page text only
//                   alludes to.
//   St John NZ      CPG EAS 1.18 Analgesia for Acute Pain and CPG EAS 1.19
//                   Acute Exacerbations of Chronic Pain, both version 1.1.0.1
//                   (16/06/2026).
//
// WHY THIS ENTRY IS MOSTLY NOT ABOUT DRUGS
// The Hatzolah pain protocol is a two-rung ladder: paracetamol from a pain score
// of zero, methoxyflurane from three, consult if it is still uncontrolled. Both
// external services run the same ladder with four or five more rungs on top, and
// every one of those rungs is a drug Hatzolah does not hold. What transfers is
// therefore the surrounding pathway - how pain is assessed in a patient who
// cannot report it, what the goal of analgesia actually is, when a patient can
// safely be left, and why an exacerbation of chronic pain is a different problem
// from acute pain.
//
// WHAT IS DELIBERATELY LEFT OUT
//
//   1. Every drug outside the Hatzolah formulary, named or dosed: the opiates
//      (fentanyl and morphine, and the clinical-judgement rules for choosing
//      between them and between their routes), ketamine, tramadol, ibuprofen and
//      droperidol. Where the external ladder reaches them it is described only
//      as escalation to advanced analgesia at paramedic level.
//
//   2. Midazolam as an analgesic adjunct. Hatzolah DOES carry midazolam - but
//      only as an anticonvulsant. Both services use it here for severe pain with
//      muscle spasm or anxiety, and only after a full opiate load has already
//      been given. That is a different indication, resting on a step a Hatzolah
//      responder cannot take, so it is omitted rather than shown as a difference.
//
//   3. The regional and intraosseous techniques: fascia iliaca block, digital
//      ring blocks, and intraosseous lignocaine - all of which presuppose IO
//      access or nerve blockade that no Hatzolah responder performs.
//
//   4. Every dose figure, including the ones for paracetamol and methoxyflurane.
//      The external numbers differ from Hatzolah's, and this tier sits directly
//      behind the Hatzolah dosing cards. The doses in the main protocol are the
//      only doses.
//
//   5. Limb realignment and joint relocation as procedures, helicopter tasking
//      criteria, practice-level rules for who accompanies a patient in an
//      ambulance, and the NSW-specific Clinical Advice Line and patient
//      self-management web resources.
//
// JUDGEMENT CALL - the age threshold. NSW says to consider reduced doses over
// 65 years and in patients with limited physiological reserve. The reasoning is
// carried; the number is not. Hatzolah's own protocol already bands at 60 years,
// and a second, later threshold sitting next to it would only create ambiguity
// about which one applies.
//
// JUDGEMENT CALL - chronic pain. Hatzolah has one pain protocol with no chronic
// branch. St John NZ splits it out into a separate guideline whose whole point is
// that acute-on-chronic pain is a physiologically different problem treated a
// different way. That material is carried, because a responder who does not know
// the distinction will manage these patients as though the two-rung ladder were
// the answer, and it is the one place where the external guidance actively
// contradicts a Hatzolah authorisation.
export const painRelief = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'CPG OT1 — Analgesia',
      note: 'Viewed at clinical level: Paramedic. Stepwise ladder read from the published Clinical Management graphic.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/other/page/analgesia',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 1.18 — Analgesia for Acute Pain',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/general-treatment-principles-eas/page/analgesia-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 1.19 — Acute Exacerbations of Chronic Pain',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/general-treatment-principles-eas/page/acute-exacerbations-of-chronic-pain-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Methoxyflurane in an acute exacerbation of chronic pain',
      hatzolah:
        'Methoxyflurane is indicated at a pain score of 3 or more, with no exception made for chronic pain.',
      external:
        'In an acute exacerbation of chronic pain, methoxyflurane is not to be administered at all. The pathway relies on the patient’s own prescribed oral analgesia, oral simple analgesia, and non-drug strategies.',
      note: 'Follow Hatzolah — the Hatzolah indication stands. But this is the clearest published statement that acute-on-chronic pain is a different problem, and it is a strong reason to consult a clinician before reaching for the whistle in a patient whose pain is long-standing.',
    },
    {
      field: 'When inhaled analgesia is reached for',
      hatzolah:
        'Methoxyflurane is the second rung of the ladder, indicated once the pain score reaches 3.',
      external:
        'Methoxyflurane is held in reserve, to be used only where an opiate cannot be given because of a contraindication or caution, where an opiate would be significantly delayed, or where pain will worsen severely during a procedure or extrication.',
      note: 'Follow Hatzolah. The reservation exists because those services would otherwise give an opiate. No Hatzolah responder can, so the first of those conditions is satisfied at every Hatzolah job by definition, and the Hatzolah ladder is the correct one.',
    },
  ],

  content: {
    scope: [
      'Covers acute pain of any cause other than cardiac chest pain, at any age.',
      'Before starting down this pathway, check whether a condition-specific guideline applies instead — an exacerbation of chronic pain, care in the last days of life, or a presentation such as headache with its own management.',
    ],

    understandingPain: [
      'Pain is an unpleasant sensory and emotional experience tied to actual or potential tissue damage, or described in those terms. It is subjective: how much a patient feels is shaped by their culture, their previous experience of pain, their beliefs, their mood and their ability to cope.',
      'Because it is subjective, assessment must include the patient’s own rating. Self-reported measures are sensitive and consistent when taken properly, though mood, disturbed sleep and medication can all shift them.',
      'The absence of pain does not mean the absence of injury.',
      'An inability to speak does not mean an absence of pain. Infancy, dementia and any other barrier to verbal communication leave the patient in just as much need of analgesia; pain may be perceived from 28 weeks of gestation.',
      'The goal is relative comfort, not zero. Pain that is present but tolerable is an acceptable endpoint — chasing profound analgesia exposes the patient to significant adverse effects for little gain.',
    ],

    recognition: [
      'The patient states, describes, or physically indicates pain.',
      'There is a history of an injury or a condition that would be expected to hurt.',
      'Signs and symptoms specific to the underlying cause are present.',
      'Behavioural and autonomic signs of pain are present — see below.',
      'Vital signs may change, but they are an unreliable indicator of pain and should never be used in place of the patient’s own report.',
    ],

    behaviouralAndAutonomicSigns: {
      note: 'These matter most in the patient who cannot tell you — the very young, the cognitively impaired, the non-English-speaking, the unconscious.',
      facialExpression: [
        'Frowning, or a sad or frightened face',
        'Grimacing, wincing, tightening or closing the eyes',
        'Distorted expressions — brow raising or lowering, cheek raising, nose wrinkling, pulling at the corner of the mouth',
        'Rapid blinking',
      ],
      vocalisation: [
        'Sighing, groaning, moaning',
        'Grunting, screaming, calling out',
        'Aggressive or offensive speech',
        'Noisy breathing',
        'Asking for assistance',
      ],
      bodyMovement: [
        'Tense posture, guarding, rigidity',
        'Fidgeting',
        'Pacing, rocking, or repetitive movements',
        'Reduced or restricted movement',
        'Altered gait',
      ],
      socialInteraction: [
        'Aggressive or disruptive behaviour',
        'Socially inappropriate behaviour',
        'Decreased social interaction, or withdrawal',
      ],
      activityAndMentalState: [
        'Appetite change, refusing food',
        'More rest periods; altered sleep or rest pattern',
        'Cognitive decline or increased confusion',
        'Crying, irritability, distress',
      ],
      autonomicSigns: [
        'Pallor',
        'Sweating',
        'Rapid or otherwise altered breathing',
        'Tachycardia',
        'Hypertension',
        'Autonomic signs appear only during a severe acute episode. They can help identify pain in a patient who cannot report it, but they must be used carefully — their absence does not mean the patient is not in pain.',
      ],
    },

    painScales: [
      'Use a validated scale, and pick the one that fits the patient rather than defaulting to the number line:',
      [
        'Numerical Rating Score — adults, and children over about 6 to 8 years',
        'Faces (Wong-Baker) scale — young children from about 4 years, and any older patient who finds a picture easier, including where language or disability is the barrier',
        'Verbal Descriptor Scale — elderly patients, including those with mild to moderate cognitive impairment',
        'FLACC behavioural scale — children from about 2 months to 7 years, and anyone unable to communicate verbally',
        'Neonatal/Infant Pain Scale — neonates and infants',
        'Abbey Pain Scale — people with dementia who cannot verbalise',
      ],
      'Record a severity assessment, preferably the patient’s own score, before any analgesia is given, and again before the patient is handed over or left.',
      'Severe pain means a score of ≥ 7, significant distress, or both.',
    ],

    redFlags: [
      'A child at risk of significant harm, or a suspected non-accidental injury',
      'An infant < 6 months',
      'A patient who needs repeated doses of analgesia',
      'A patient with multiple or concerning co-morbidities',
      'A recent or repeated presentation to ambulance for the same problem',
    ],

    principlesOfManagement: [
      'Work in steps, and escalate in proportion to the pain: non-drug measures first, then oral or inhaled analgesia, then — beyond Hatzolah scope — the parenteral options a paramedic can add.',
      'Analgesia works best as a package. Physical measures, psychological measures and medicines together relieve pain better than any of them alone, and combining agents that act by different mechanisms beats pushing a single agent to a high dose, which is where the adverse effects come from.',
      'Simple oral analgesia is not the first priority in moderate or severe pain, but giving it early still reduces the need for anything further and improves the quality of the relief that follows.',
      'Where the cause of the pain can be addressed at the same time, address it. Doing so can drastically cut the amount of analgesia needed.',
      'Stay alert for an atypical, adverse or unexpected response — to the pain itself, or to the analgesia given.',
      'Where a patient has an advance care plan, a pain management plan, or complicating psychosocial circumstances, the plan and the patient’s own services shape the treatment. Be prepared to involve them.',
      'Discuss the options with the patient, and with the person responsible for them where that applies.',
    ],

    nonPharmacological: [
      'Immobilise and splint injured limbs or body parts.',
      'Position the patient for comfort.',
      'Ice and elevation; heat packs where available and appropriate.',
      'Explain what is causing the pain and what is likely to happen next — anxiety amplifies pain, and reassurance is treatment.',
      'Keep the environment as calm as possible.',
      'Use distraction and other psychological techniques.',
    ],

    reassessment: [
      'Reassess and document the pain after treatment, both to judge the effect and to catch adverse effects.',
      'Every 5 to 15 minutes while the pain is severe.',
      'Every 30 to 60 minutes once it is less severe.',
      'Monitor the patient for response whenever any medicine has been given.',
    ],

    olderAndFrailPatients: [
      'Older patients, frail patients and those with limited physiological reserve are more susceptible both to the adverse effects of analgesia and to acute deterioration. Analgesia in this group is deliberately more cautious — the Hatzolah dosing bands already reflect this, and they are the ones to follow.',
    ],

    chronicPainExacerbation: [
      'Chronic pain is ongoing unpleasant sensation that does not track the severity of any underlying pathology. Around one person in five lives with some degree of it.',
      'An acute exacerbation of chronic pain is physiologically a different problem from acute pain, and standard analgesics are often not the most effective treatment. Medicines usually shift the patient’s perception only moderately.',
      'The goal shifts with it: aim to change the experience enough that the patient can function again, rather than to drive the score down to a target. Say so — managing the patient’s and the family’s expectations towards improved function, or a modest reduction, is part of the treatment.',
      'First, consider whether this is actually something new. A patient with chronic pain can develop unrelated acute pathology — appendicitis on a background of chronic lower abdominal pain, for instance — and the chronic history must not become the explanation by default.',
      'Find and follow any care plan or pain management plan the patient has, and seek advice from a clinician involved in their usual care where that is possible.',
      'Prefer the patient’s own prescribed oral analgesia over anything a responder would give.',
      'Non-drug measures differ from the acute pathway: encourage movement even during an acute episode, consider heat or cold for localised pain, and encourage relaxation techniques.',
      'Empathy, reassurance and shared decision-making with the patient and their family matter for every patient, and matter more here than almost anywhere else.',
      'If a patient is calling frequently and has no care or management plan, pass their details on so one can be put in place.',
    ],

    dispositionAndReferral: [
      'Where pain has been controlled with oral analgesia alone, for a minor condition, transport by ambulance is not automatically required.',
      'After a single dose of inhaled analgesia, both services allow the same conclusion — but only if ALL of the following hold:',
      [
        'The patient’s condition does not itself require transport to an emergency department',
        'GCS is 15 and the patient can mobilise safely',
        'Adequate pain control has been achieved',
        'They are advised to be reviewed in primary care if needed',
        'They are in the care of a competent adult for the next six hours',
        'They are advised not to drive or operate machinery for at least 24 hours',
      ],
      'A patient being treated for severe pain should be transported to an emergency department. Departing from that needs a clearly documented reason, and the safeguards above still have to be covered.',
      'In an exacerbation of chronic pain the aim is the opposite — avoid an emergency department where the pain can be reduced, and where transport is needed, transport to a clinician already involved in the patient’s care if that is possible.',
      'Consider whom else to involve: the patient’s GP, their care plan provider, or a clinician for advice where the pain is not coming under control.',
      'Hatzolah governs the disposition decision itself. These criteria are carried because they are the clearest published statement of which patients in pain must not simply be left.',
    ],

    safetyNetting: [
      'A patient left at home after inhaled analgesia must not drive or operate machinery for at least 24 hours, and must have a competent adult with them for the next six.',
      'Tell the patient and their family what to expect, what would mean the problem is getting worse, and where to be reviewed.',
      'Escalate rather than repeat: a patient who needs repeated doses of analgesia is a red flag, not a dosing problem.',
    ],
  },
};
