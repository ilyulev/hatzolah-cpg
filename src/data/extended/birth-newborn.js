// Extended ("full") protocol for Birth & Newborn Resuscitation, merged from the
// NSW Ambulance and St John NZ clinical practice guidelines.
//
// PROVENANCE
//   NSW Ambulance, Maternal Emergencies section — PROTOCOL OA1 (Maternal
//   Emergencies Overview), OL1 (Assessment of Labour), OL2 (Normal Birth),
//   OL5 (Nuchal Cord in Emergency Delivery), OL7 (Third Stage of Labour),
//   OP1 (Maternal Postpartum Care), OP3 (Newborn Care and Assessment) and
//   OP4 (Newborn Resuscitation). All are listed for every clinical level
//   including Paramedic.
//   Almost the whole clinical pathway on those pages is published ONLY as a
//   protocol GRAPHIC (assets/images/info/OL1.jpg, OL2-1.png, OL2-2.png, OL5.png,
//   OL7.png, OP1.png, OP3.png, OP4.png). The page text layer carries just the
//   surrounding background prose — the decisions, the branches and the red-boxed
//   warnings exist nowhere but the images. They were downloaded and read as
//   images, the same discipline the v6.2 pipeline applies to the Hatzolah PDF.
//   A text scrape of these pages would have returned almost nothing.
//
//   St John NZ — CPG EAS 7.3 (Newborn Resuscitation), 8.6 (Normal Birth),
//   8.7 (Birth Emergency Action Lists), 8.3 (General Principles in Pregnancy)
//   and 8.2 (Postpartum Haemorrhage), plus the First Responder Field Guide
//   FR FG 6.1 (Birth), 6.2 (Newborn Resuscitation) and 6.3 (Birth Emergencies).
//   Read from St John's own published combined PDFs at
//   cpg.stjohn.org.nz/assets/pdf/EAS.pdf and /assets/pdf/FR.pdf.
//
//   Transcription note: NSW's OL1 complications list prints "Should Dystocia".
//   Transcribed as Shoulder Dystocia, which is plainly what it means.
//
// WHY THIS PROTOCOL IS WORTH EXTENDING
// The Hatzolah protocol is a superb action list — HUBCAPS, the preparation kit,
// the head/shoulders sequence, the heart-rate branches, CLUB. What it does not
// carry is the reasoning and the boundaries: why the cord is left alone, why
// oxygen is held back, why a premature baby is handled the opposite way round,
// what may and may not be done with your hands, how often to reassess the
// mother, and how badly blood loss is judged by eye. All of that is pathway
// material, all of it is inside a first responder's scope, and all of it is what
// this tier adds.
//
// SCOPE EXCLUSIONS — deliberately left out, and why:
//   1. Every drug the external pathways use here that Hatzolah does not hold:
//      the injected medicine both services give routinely at the third stage and
//      again for postpartum haemorrhage, the antifibrinolytic given IV for
//      obstetric bleeding, the newborn's gestation-banded IV resuscitation drugs,
//      IV crystalloid other than what the Hatzolah formulary already covers, IV
//      glucose, blood products, vasopressor support, and dissociation for
//      internal uterine compression. None is named, dosed or described.
//   2. Every advanced procedure: supraglottic airway and endotracheal intubation
//      in the newborn, IV/IO access in the newborn, umbilical vessel cannulation,
//      PEEP-set ventilation, bimanual compression of the uterus, removal of the
//      posterior shoulder, controlled cord traction, and the head-flexion and
//      shoulder-traction delivery of a stuck breech. Where a pathway reaches one
//      of these, the text says only that it escalates at paramedic level.
//   3. Every dose figure, and every flow rate. Both services print an oxygen flow
//      for newborn ventilation and they do not print the same one; Hatzolah's
//      figure is two screens away in the main protocol. The principle is carried,
//      the numbers are not.
//   4. Service infrastructure: NSW's Tier 6 hospital and NETS contacts, St John's
//      Clinical Desk, lead-maternity-carer transport checklist, hospital lists,
//      ICP/CCP backup tiers and helicopter tasking criteria. Hatzolah's own
//      escalation is dispatch, ambulance, Clinician and PIPER.
//   5. The separate stillbirth and major-newborn-abnormality pathways, and
//      pregnancy trauma — different protocols, not this one.
//
// JUDGEMENT CALLS
//   1. St John NZ publishes this material twice: the paramedic-level EAS and a
//      First Responder Field Guide written for exactly the scope Hatzolah works
//      in. Where the two differ, the FR wording is used. Shoulder dystocia is the
//      clearest case: the EAS says "apply traction to the baby's head" and the FR
//      guide says "support the baby's head". Support is what is carried.
//   2. No cord-clamping delay in minutes. The three guidelines set three
//      different delays. The principle — waiting is deliberate and improves the
//      baby's outcome — is what transfers; a number would not.
//   3. No newborn blood-glucose threshold. The two services use different
//      cut-offs, and both are far below the threshold used for an older child.
//      That fact is the clinically useful part and is carried without a figure.
//   4. NSW's cultural and religious section is a general framework of questions
//      to ask; St John's is specific to Māori whānau and to New Zealand. The
//      framework is carried, the New Zealand specifics are not. It is presented
//      as questions to ask a woman, never as an assumption about any community.
export const birthNewborn = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL OA1, OL1, OL2, OL5, OL7, OP1, OP3, OP4 — Maternal Emergencies',
      note: 'Listed for all clinical levels including Paramedic. The clinical pathways are published only as protocol graphics and were read as images; the background prose was read from the page text.',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/maternal-emergencies/page/normal-birth',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 7.3 — Newborn Resuscitation',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/paediatrics-eas/page/newborn-resuscitation-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 8.6, 8.7, 8.3, 8.2 — Normal Birth, Birth Emergency Action Lists, General Principles in Pregnancy, Postpartum Haemorrhage',
      note: 'All version 1.0.5.3 (09/06/2025)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/pregnancy-and-birth-eas/page/normal-birth-eas',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'FR FG 6.1, 6.2, 6.3 — Birth, Newborn Resuscitation, Birth Emergencies (First Responder Field Guide)',
      note: 'All version 1.1.0.1 (16/06/2026). Written for first-responder scope, and preferred over the paramedic-level wording wherever the two differ.',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/pregnancy-and-birth-fr/page/birth-fr',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'A nuchal cord that will not slip over the head',
      hatzolah:
        'If the cord is tight, or wrapped more than once, clamp and cut it — first clamp 10 cm from the baby, second at 15 cm, cut between the clamps.',
      external:
        'Neither service cuts it. If the loop will not slip over the head, the birth is allowed to continue through the loop; for a tight cord the next attempt is to slip it over the baby’s shoulders and birth through it. Only if the baby still cannot be born is urgent clinical advice sought. Both warn that handling the cord at all makes the cord vessels spasm, so it is touched only when necessary and for as short a time as possible.',
      note: 'Follow Hatzolah. The external position is worth knowing because it explains the caution: both services delay cutting the cord because delaying improves the baby’s outcome, and both reserve cutting for when it is genuinely required to treat the baby or the mother.',
    },
    {
      field: 'Drying and stimulating a very premature newborn',
      hatzolah: 'All newborns — stimulate by drying with a towel for 30 seconds.',
      external:
        'A markedly premature baby must NOT be dried. The torso and limbs go straight into plastic — a bag with the head left out — and are wrapped warmly, and stimulation is given by drying the head and by rubbing through the bag from the outside. NSW sets the switch at a stated gestation; St John NZ describes it for a premature baby requiring resuscitation without naming a week, so no cut-off is printed here.',
      note: 'Hatzolah’s own STOP already sends any gestation under 37 weeks to Clinician and PIPER. That is where this belongs — raise it on the consult rather than deciding it at the cot side.',
    },
    {
      field: 'Helping the placenta out',
      hatzolah:
        'Position the mother squatting so gravity assists, advise her to give a little push, then use two hands to support and remove the placenta with a twisting see-saw motion, easing the membranes slowly out.',
      external:
        'Neither service assists at this level. The placenta is allowed to deliver spontaneously with no traction applied at all. If it has not delivered within 60 minutes it is a retained placenta, and the pathway becomes escalation and transport rather than any further attempt to deliver it.',
      note: 'Follow Hatzolah — and note that both agree absolutely on the one thing that causes harm: never pull on the umbilical cord. The 60-minute retained-placenta rule is something Hatzolah does not state, and it is carried in the body below.',
    },
  ],

  content: {
    scope: [
      'Covers the woman in labour, the birth itself, care of the newborn in its first minutes, and care of the mother once the baby and the placenta are born.',
      'Most pregnancies and births run without incident, but either can turn life-threatening. What out-of-hospital care contributes is prompt targeted assessment, the right handling, and timely transport to the right destination.',
      'Pregnancy and its complications must be considered in any woman of childbearing age. Abdominal pain and vaginal bleeding can be early-pregnancy complications in a woman whose pregnancy has never been confirmed.',
    ],

    threeRulesForEveryMaternalEmergency: [
      'The mother comes first. Her wellbeing is what keeps the baby alive, so resuscitating the woman is always the priority.',
      'After about 20 weeks the pregnant uterus compresses the inferior vena cava and cuts venous return, which can drop cardiac output sharply. Position for that deliberately, and avoid lying her flat on her back.',
      'Signs of shock appear very late in pregnancy and hypotension is an extremely late sign. Any sign of hypovolaemia in a pregnant woman means significant blood loss has already happened, and must be treated as such.',
    ],

    whoIsInCharge: [
      'Clarify and document who is directing care. If a midwife or other maternity carer is present they usually lead, and they keep that role unless it is formally handed over.',
      'Consent still applies. View the woman with her permission, and say what you are doing as you do it. In a true emergency, or where her conscious state is altered, it is appropriate to begin what is needed while explaining it.',
    ],

    assessmentOfLabour: [
      'Labour normally begins from the completion of the 37th week, though it can start earlier. It is regular painful contractions that thin (efface) and then open (dilate) the cervix.',
      'In a first labour the cervix must efface before it can dilate, which is why a first labour can run up to about 18 hours. A woman who has given birth before effaces and dilates at the same time, so her labour is quicker — sometimes much quicker.',
      'Labour has four stages:',
      [
        'First — from the onset of regular painful contractions until the cervix is fully dilated. The longest stage.',
        'Second — from full dilation to the birth of the baby. Out of hospital you recognise it by the woman’s urge to push and/or the presenting part becoming visible.',
        'Third — from the birth of the baby to the delivery of the placenta and membranes.',
        'Fourth — the first hour after the placenta is delivered. Postpartum haemorrhage happens in this window.',
      ],
      'Check the antenatal record the woman carries for gestational age and for any known or potential birthing complication.',
      'Complications worth identifying before the birth starts:',
      [
        'Pre-term labour',
        'Multiple births',
        'Breech presentation',
        'Shoulder dystocia',
        'Nuchal cord',
        'A vaginal birth after a previous caesarean section',
        'Female genital mutilation or cutting',
      ],
      'Where a complication is known, ask whether a birth plan has been made and discuss it with her.',
      'If birth is not imminent, minimise time on scene and move.',
    ],

    examinationLimits: [
      'View the perineum, with consent, looking for the presenting part of the baby, a prolapsed cord, or bleeding. The inspection is visual and hands-off.',
      'Do not insert anything into the vagina. The narrow exceptions in the external guidelines — internal manoeuvres for severe postpartum haemorrhage, shoulder dystocia or breech — are ambulance-level procedures and are not a Hatzolah responder’s to perform.',
    ],

    positioningAndMoving: [
      'Position of comfort, with left lateral preferred. Semi-recumbent or sitting up is acceptable. Avoid positioning her supine.',
      'To prevent supine hypotension after 20 weeks, tilt her 30 degrees or more to her left by placing a rolled towel or pillow under her right hip. If that cannot be achieved, manually displace the uterus to the left.',
      'A woman in labour who is not haemodynamically compromised may walk a short distance to the stretcher, which makes extrication easier. If she is compromised, get help to move her rather than have her walk.',
      'Take blood pressures from the same arm throughout the episode of care; the right arm is the recommended default.',
    ],

    painInLabour: [
      'Pain relief is offered if she asks for it, and worked through in steps rather than jumped to.',
      'Start with what costs nothing and can be done immediately: deep breathing, changes of position, and heat packs if available.',
      'Then the analgesia the responder carries, given under the Hatzolah analgesia protocol. Both external services reach for methoxyflurane and paracetamol at this point — the doses live in the Hatzolah protocol and are not repeated here.',
      'Beyond that the external pathways escalate to opioid analgesia at paramedic level, which is outside Hatzolah scope.',
    ],

    beforeBirthIsImminent: [
      'Pre-labour rupture of membranes is the waters breaking before labour has started. Look first for a prolapsed cord — if the cord is present she needs immediate transport.',
      'Under 37 weeks, she needs assessment at a hospital with obstetric facilities. At or beyond 37 weeks, the external guidance has her contact her own maternity carer, or take telephone advice from an obstetric unit if she has no carer.',
      'Pre-term labour is labour starting after 20 weeks and before 37. Transport to a hospital with obstetric facilities, prepare for the possibility of a rapid birth, and be ready to resuscitate the newborn.',
    ],

    theBirthItself: [
      'Support the woman in the position she chooses.',
      'Support the baby’s head and shoulders as they appear, and then the body as it appears, without applying traction.',
      'Note the time the head is born and the time the baby is born.',
      'Once the head is born, look for a nuchal cord before the shoulders follow.',
      'Handle the umbilical cord only when you have to, and for as short a time as possible — handling it makes the cord vessels spasm.',
    ],

    nuchalCord: [
      'A nuchal cord is the umbilical cord wrapped a full turn — once or twice — around the baby’s neck, holding the birth up. It is common, and it is not in itself an emergency.',
      'If the loop is loose and slips easily over the head, slip it over and carry on.',
      'If it will not slip easily over the head, both services let the birth continue through the loop rather than cut it. For a tight cord that is stopping the birth, the next attempt is to slip the loop over the baby’s shoulders and birth through it.',
      'If the baby still cannot be born, that is the point at which they seek urgent clinical advice, extricate, and prepare for newborn resuscitation.',
    ],

    shoulderDystocia: [
      'Shoulder dystocia is when the head is born but the birth does not follow with the next two contractions. The head may appear and then draw back against the perineum. The usual cause is the baby’s front shoulder caught behind the mother’s pubic bone. It is potentially life-threatening for the baby.',
      'The first-responder sequence is positional, and each step gets one contraction with the mother pushing before you move on:',
      [
        'Call for urgent help and backup, and get clinical advice on the phone.',
        'Legs up — help the mother pull her knees as high as she can towards her armpits. Support the baby’s head.',
        'Hands and knees — help her roll over onto her hands and knees. Support the baby’s head.',
        'Back again, legs up, and suprapubic pressure — an assistant places their hands directly above the mother’s pubic bone in a CPR-like position and pushes firmly and continuously straight back, ideally standing on the side the baby is facing away from.',
      ],
      'If the baby is still not born, the external pathways move to internal manoeuvres and urgent transport at paramedic level. Prepare for newborn resuscitation.',
    ],

    breechOrProlapsedCord: [
      'Breech is the baby coming feet or buttocks first. A prolapsed cord is the cord appearing in the vagina ahead of the baby. Both are potentially life-threatening for the baby.',
      'The first-responder actions are the same for both:',
      [
        'Call for urgent help and backup, and get clinical advice.',
        'Tell the woman not to push.',
        'Help her onto her hands and knees with her pelvis positioned higher than her head.',
        'Prepare for newborn resuscitation.',
      ],
      'If birth becomes imminent anyway, let it happen — support her in the position she prefers rather than trying to hold the birth back.',
      'The manoeuvres the ambulance services use to deliver a stuck breech are paramedic-level and are not carried here.',
    ],

    firstMinutesAfterBirth: [
      'Place the baby on the mother’s chest or abdomen, skin to skin, with as little tension on the cord as possible. Note the time of birth.',
      'A crying and/or active baby needs no specific intervention. Dry it, keep it warm, keep it on the mother, and watch.',
      'A baby that does not need resuscitation can lie lateral or prone on the mother, which lets fluid drain from the mouth.',
      'Assess on activity, breathing, heart rate and colour. NSW treats the newborn "rapid assessment" as positive if ANY of these is present: a heart rate below 100 a minute; absent or gasping respirations; or hypotonia — the baby is floppy. Tone is the one the Hatzolah trigger does not name.',
      'NSW also scores APGAR — colour, pulse, reflex response, tone and respirations — at one minute and again at five, with the same clinician doing both so the two scores can be compared.',
    ],

    keepingTheBabyWarm: [
      'Preventing heat loss is not a comfort measure. Hypothermia makes outcomes worse.',
      'Dry the baby, put a hat on it if one is available, cover mother and baby together with a warm blanket, keep them skin to skin, and make the space hot — including the inside of the ambulance.',
      'A markedly premature baby is handled the other way round: not dried, wrapped straight into plastic with the head left out, and stimulated through the wrap. See the difference recorded above before acting on it.',
      'Warmth stays a priority after resuscitation, not only during it.',
    ],

    airwayAndSuction: [
      'Suction is an exception, not a step. Both services suction only where there are obvious signs of obstruction.',
      'Suctioning the mouth and nose before the body is born is not required, even when meconium is present.',
      'If the baby needs ventilation, ventilation comes first — ahead of suctioning meconium — unless meconium is clearly occluding the airway.',
      'Place the baby supine with the head in a neutral position to open the airway.',
    ],

    newbornResuscitation: [
      'Newborn resuscitation supports the transition from intrauterine to extrauterine life, and it is overwhelmingly about ventilation. NSW prints it in red on the protocol: ventilation is the key intervention.',
      'Start on room air. Routine oxygen during newborn resuscitation appears to make outcomes worse, which is exactly why oxygen is held back for the baby who is not improving despite effective ventilation.',
      'Compressions are given at three to each breath. The ratio matters because a newborn has a higher oxygen demand than an older patient, so compressions must not crowd out ventilation.',
      'Two compression techniques are approved: the two-finger method, and the two-hand encircling technique.',
      'Reassess at the end of each short cycle and move between the heart-rate branches as the rate changes.',
      'Clamp and cut the cord at this point only if it is physically in the way of ventilation or CPR.',
      'Resuscitate where you are. The quality of resuscitation drops during transport, so it usually happens at the scene while the ambulance is brought to you, rather than en route.',
      'Always start. A resuscitation attempt is begun unless a midwife or doctor present directs otherwise. Stopping is a clinical-advice decision; the marker the external guidance uses is asystole persisting beyond about ten minutes.',
    ],

    monitoringTheNewborn: [
      'Put the oximeter probe on the RIGHT hand. A patent ductus arteriosus can produce falsely low readings from the left hand and from the feet. If the probe is too large for one digit, place it across several.',
      'A newborn’s oxygen saturation is low straight after birth and climbs over the first ten minutes or so. A low reading in the first minutes is expected, and is not by itself a reason to reach for oxygen.',
      'Blue hands and feet are normal for several hours after birth.',
      'A newborn’s normal blood glucose is lower than an older child’s, and a newborn is not hypoglycaemic at the threshold you would use for anyone else. Both services set a much lower cut-off and they do not use the same one, so no figure is printed here.',
      'Measuring the glucose is not a priority while resuscitation is required. Where glucose is needed, spreading glucose gel on the gums, tongue and inside of the cheeks is usually an effective treatment.',
    ],

    theUmbilicalCord: [
      'There is no urgency to clamp and cut, provided neither the baby nor the mother requires resuscitation.',
      'Delaying the clamp for the first few minutes appears to improve the baby’s outcome. The three published pathways each set a slightly different delay, so no figure is given here — the point is that the wait is deliberate.',
      'Leave enough cord on the baby’s side. The stump is the route for cannulation later in hospital, and cutting short takes that away.',
      'Cut early only to enable treatment the baby or the mother actually needs.',
    ],

    thirdStageAndThePlacenta: [
      'Let the placenta deliver on its own, and never pull on the cord.',
      'It usually arrives within about 30 minutes and may take up to an hour.',
      'Place it in a suitable container and keep it with the mother. It travels to hospital with her.',
      'A placenta not delivered within 60 minutes is a retained placenta. Both services escalate at that point: call for help, transport, and watch closely for postpartum haemorrhage.',
      'Both external services give an injected medicine at this stage to prevent postpartum haemorrhage and to shorten the third stage. It is not in the Hatzolah formulary, so it is not named or dosed here; the Hatzolah responder’s equivalent step is the escalation the main protocol already sets out.',
    ],

    theMotherAfterBirth: [
      'View the perineum after the placenta is born. Place direct pressure on any compressible site of bleeding — a tear or laceration — and place a pad.',
      'Check the fundus and massage it if it is not firm. Uterine massage is firm and sustained; the external guidance runs it for around ten minutes. It is not a priority if there are not enough people present to do it, and not a priority during extrication and transport — moving her matters more.',
      'Take a full set of observations every 15 minutes for the first hour after birth, including a fundal check and a running estimate of cumulative blood loss. On a long transport, keep going past the hour and adjust the interval to her risk factors and condition.',
      'Blood loss is very hard to estimate. It spreads across the bed, the floor and the toilet, mixes with amniotic fluid, and can be concealed inside the uterus or the abdomen. Do not be reassured by what you can see.',
      'Pregnancy expands blood volume. Particularly after about 28 weeks, more than a litre can be lost before shock is obvious — so if a woman who has just given birth looks shocked, the shock is severe.',
      'Keep her warm. Hypothermia worsens bleeding by contributing to coagulopathy.',
      'Encourage breastfeeding if she wants to, and keep her skin to skin with the baby.',
      'Treat her pain. Adequate treatment of maternal pain improves breastfeeding outcomes, and simple oral analgesia such as paracetamol is as effective as — or more effective than — opioids for it.',
    ],

    transportAndDestination: [
      'Mother and baby travel in the same vehicle whenever that is feasible and safe.',
      'A woman at or beyond 20 weeks, in labour, with no known or suspected complication may be taken directly to a maternity unit, with the receiving unit told first. Everyone else goes to the emergency department of a hospital with obstetric facilities.',
      'A direct handover to a maternity unit happens only after a phone call in which the unit has accepted her. Pre-notify en route whichever destination is chosen, and pass on any change — a birth starting en route, for example — as it happens.',
      'How the baby travels is a clinical judgement balancing warmth, monitoring, treatment and safety:',
      [
        'On the stretcher, restrained in a weight- and size-appropriate device, if the baby needs active treatment or continuous monitoring.',
        'In a baby capsule, only if the baby has never required any form of intervention and has normal activity and breathing.',
        'Skin to skin on the mother’s chest with a blanket over both and the stretcher belts over the blanket — often the best option when warmth is the priority, such as a premature or small-for-gestation baby who is not being actively treated.',
      ],
      'Everyone in the vehicle must be properly restrained. That is the responder’s responsibility, not the family’s.',
    ],

    culturalAndReligiousConsiderations: [
      'Culture and religion shape how a woman experiences and prepares for birth. Some hold closely to traditional birthing practices and some do not. You are not expected to know the practices of every community — you are expected to ask, listen, and respect the answer.',
      'It will not always be possible to accommodate her wishes in an emergency, but knowing they exist makes the conversation, and the care, easier.',
      'Questions the NSW guideline suggests asking:',
      [
        'Are you comfortable with both male and female responders? A mixed crew may need to swap treating and non-treating roles.',
        'Are there any cultural or religious practices we need to be aware of in caring for you?',
        'Do fathers usually attend births in your community, or is there someone else here you want with you? Would you like us to speak to them about your care?',
        'Are there beliefs or customs about physical activity during birth and afterwards that you plan to observe?',
        'What is an acceptable way for you to express pain during childbirth?',
        'Are there any precautions we should take with the care of the baby?',
        'What is an appropriate way to give bad news?',
      ],
      'The placenta itself carries meaning in some communities, including how it is handled and what it is placed in. Ask before reaching for a plastic bag, and allow the family time after the birth for whatever they need to do.',
      'A woman who has had female genital cutting is at higher risk of a prolonged second stage, of perineal tearing, and of haemorrhage. It may only become apparent during her care. Treat it as a clinical risk factor to plan around, not as a conversation to open.',
    ],
  },
};
