// Extended ("full") protocol for Anaphylaxis (FR), merged from the NSW Ambulance
// and St John NZ clinical practice guidelines.
//
// PROVENANCE
// NSW PROTOCOL M16 was read as the rendered protocol page plus its treatment
// flowchart graphic (assets/images/info/M16.png) - the flowchart carries the
// handling rules, the on-scene time pressure and the referral exclusion, none of
// which appear in the page's text layer. St John NZ CPG EAS 12.12 was read in
// full from the Guideline view. The NSW flowchart cites "P5 Protocol Specific
// Exclusions"; P5 was identified from the NSW Patient Disposition index as
// "Referral Decision", which is what makes that exclusion meaningful here.
//
// SCOPE DISCIPLINE - what was deliberately left out
// Hatzolah is a first-responder service. Both external guidelines are written for
// an ambulance service with a far wider formulary, and the anaphylaxis pathway is
// where that gap is widest. Omitted entirely:
//
//   * Every dose figure, for every drug, including adrenaline and salbutamol
//     which Hatzolah does carry. Hatzolah gives adrenaline from a fixed-dose
//     auto-injector; both services draw an ampoule and dose adult and paediatric
//     patients by different rules. Printing their numbers beside Hatzolah's is
//     exactly how the wrong dose gets given. The paediatric drug dose tables and
//     the NZ allowance to reduce an adult dose for a small, frail or ischaemic
//     patient go with them - neither is possible from an Epi-Pen.
//   * IV adrenaline - boluses, pump infusions and the 1:1,000,000 bag recipes
//     titrated by drops per second. Not a Hatzolah route.
//   * Nebulised adrenaline for airway oedema or persisting upper airway
//     obstruction. Hatzolah nebulises salbutamol and ipratropium, not adrenaline.
//   * Glucagon for hypovolaemia that persists in a beta-blocked patient, and
//     hydrocortisone for wheeze that persists after a bronchodilator. Hatzolah
//     carries glucagon, but only IM for hypoglycaemia - this is a different drug
//     use, not a different dose. Hatzolah carries no steroid at all.
//   * Fexofenadine and loratadine. Hatzolah carries cetirizine; these are
//     different antihistamines and are not substitutes, the same call made for
//     the Allergy (Mild) entry.
//   * Compound sodium lactate. NZ's fluid for hypovolaemia is 0.9% sodium
//     chloride, which IS Hatzolah's normal saline, so the two are merged as "an
//     intravenous crystalloid" with no volume attached and no implication that
//     the Hatzolah anaphylaxis protocol contains a fluid step - it does not.
//   * ICP/CCP-level escalation and helicopter tasking criteria. The transferable
//     part of the aeromedical rules - which patients are and are not time
//     critical - is kept; the aircraft is not.
//
// Where a pathway reaches one of these, the step is described in general terms
// ("the pathway adds a further drug at paramedic level") so the responder can see
// that the pathway continues past what they can do, without being told what to
// give.
//
// JUDGEMENT CALL - the angioedema section
// NZ's angioedema guidance says systemic adrenaline should not be given for
// isolated swelling of the mouth or face without systemic signs. That could be
// misread as licence to withhold adrenaline, so it is written strictly as
// recognition, tied to the absence of systemic involvement, and closed with the
// point both services make - if there is any doubt, treat as anaphylaxis. It does
// not conflict with Hatzolah: isolated angioedema is one R.A.S.H. category, and
// Hatzolah's own criteria would not call that anaphylaxis either.
export const anaphylaxisFr = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'PROTOCOL M16 — Anaphylaxis and Allergic Reactions',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/guidelines/medical-surgical/page/anaphylaxis-and-allergic-reactions',
      retrieved: '2026-08-18',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 12.12 — Anaphylaxis',
      note: 'Version 1.0.5 (28/10/2024)',
      url: 'https://cpg.stjohn.org.nz/tabs/guidelines/page/anaphylaxis-eas',
      retrieved: '2026-08-18',
    },
  ],

  differences: [
    {
      field: 'Threshold for calling it anaphylaxis',
      hatzolah:
        'Sudden onset plus symptoms from TWO or more R.A.S.H. categories, regardless of exposure to a known antigen — or isolated hypotension, or isolated respiratory distress, where a KNOWN antigen was involved.',
      external:
        'One service treats any ONE or more of its anaphylaxis sign list as indicating anaphylaxis, with no second system and no known allergen required. The other requires systemic involvement — skin features alone are never enough — but counts a single involved system alongside them, and warns that a small number of patients have no obvious skin features early on, particularly when onset is sudden and severe.',
      note: 'Follow Hatzolah’s criteria. Both external services set a lower bar to call it anaphylaxis than Hatzolah does, and both say plainly that if you are in doubt you should treat as anaphylaxis — so doubt, not a category count, is what should move you.',
    },
    {
      field: 'How often adrenaline may be repeated',
      hatzolah:
        'The initial dose may be repeated ONCE only, at 5 minutes. Any further dose requires consult with a clinician.',
      external:
        'Neither service caps the number of intramuscular doses. One repeats every ten minutes while the patient is not improving, and every five minutes if the patient is deteriorating. The other treats four intramuscular doses without response as the trigger to escalate to a higher clinical level, not as a ceiling.',
      note: 'Follow Hatzolah — one repeat, then consult. Note why the external services are so permissive: both identify under-recognised need for repeat adrenaline as a cause of death. Make the consult call early rather than waiting to see.',
    },
    {
      field: 'Where the patient is transported',
      hatzolah:
        'Transport to hospital REGARDLESS of severity or improvement, with hospital-based observation for a minimum of 4 hours.',
      external:
        'Every patient treated for anaphylaxis must be given a clear recommendation to travel to a medical facility by ambulance, and that is usually an emergency department. One service allows a primary care facility instead, but only where the patient has had anaphylaxis before, AND has improved rapidly after a single intramuscular dose, AND the facility can observe them for several hours.',
      note: 'Follow Hatzolah — hospital, every time, and the 4-hour observation figure is Hatzolah’s. The external carve-out still requires ambulance transport and several hours of observation, so it is a narrower exception than it first reads.',
    },
  ],

  content: {
    scope: [
      'Allergic reactions run from mild urticaria at one end to anaphylaxis with major pulmonary or cardiovascular compromise at the other. This pathway is the severe end of that spectrum.',
      'Anaphylaxis is an acute, life-threatening reaction characterised by a rapidly deteriorating airway, breathing or circulation — a rapid-onset, multiple-organ, generalised hypersensitivity syndrome.',
    ],

    generalPrinciples: [
      'Exposure to an allergen releases inflammatory mediators from mast cells and basophils, and those mediators produce the signs and symptoms. Histamine is the most widely recognised of them, but it is not the only one — which is why an antihistamine is never the treatment for anaphylaxis.',
      'Almost anything can trigger it. The commonest triggers are venom, particularly wasps and bees; food, particularly eggs, peanuts and shellfish; and medications.',
      'The single most important priority is early adrenaline. The risk of death rises where the need for adrenaline — or for repeat adrenaline — goes under-recognised.',
    ],

    recognition: [
      'Anaphylaxis is usually characterised by skin features of systemic mediator release — urticaria, itch or flush, swollen lips or tongue — PLUS involvement of one or more of the following systems:',
      [
        'Respiratory — dyspnoea, chest or throat tightness, wheeze, stridor',
        'Cardiovascular — hypotension, poor perfusion, fainting, collapse, altered level of consciousness',
        'Gastrointestinal — severe nausea, vomiting, abdominal pain, diarrhoea',
      ],
      'There must be signs of SYSTEMIC involvement. Skin features on their own are not anaphylaxis.',
      'The converse also holds: a very small proportion of patients have no obvious skin features initially, particularly where onset is sudden and severe. Waiting for a rash is a way of arriving late.',
      'Consider anaphylaxis in any patient with sudden onset of unexplained bronchospasm, shock or respiratory distress, whether or not an allergen is known.',
      'Signs that point to anaphylaxis:',
      [
        'Difficult or noisy breathing',
        'Swelling or tightness in the throat',
        'Wheeze or persistent cough',
        'Difficulty talking, or a hoarse voice',
        'Swelling of the tongue',
        'Persistent dizziness or collapse',
        'Pale and floppy, in a young child',
        'Persistent abdominal pain and vomiting after exposure to a likely allergen',
      ],
      'Signs of a mild to moderate reaction — swelling of the lips, face or eyes; hives or welts; tingling mouth; vomiting, whether transient, resolving or active; abdominal pain.',
      'The mild to moderate signs are NOT always present in anaphylaxis. Their absence is not reassurance, and their presence is not a reason to stay in the mild pathway.',
      'Abdominal pain and vomiting are specific signs of anaphylaxis where the trigger was an injected medicine, an insect bite or a sting.',
      'If in doubt, treat as anaphylaxis.',
    ],

    angioedemaAndMimics: [
      'A sting that has produced only localised swelling, redness or pain is not anaphylaxis.',
      'Isolated swelling — particularly of the mouth or face — with no systemic involvement is usually angioedema rather than anaphylaxis. Angioedema causes intermittent, unpredictable, isolated swelling of the mouth or face; it often occurs in patients taking aspirin or an ACE inhibitor, and can follow fibrinolytic (clot-dissolving) therapy.',
      'Systemic adrenaline is not the answer to isolated angioedema — it rarely responds, and the adverse effects usually outweigh any benefit. The external pathway treats it with an airway-directed route Hatzolah does not carry.',
      'This applies only while there is NO systemic involvement. Any respiratory, cardiovascular or gastrointestinal feature, or any real doubt about which you are looking at, puts the patient back on the anaphylaxis pathway.',
    ],

    assessment: [
      'Perform a full PRIMARY SURVEY on any patient suspected of an anaphylactic or allergic reaction, to detect life-threatening features. Some patients need immediate intervention to prevent deterioration.',
      'Obtain the history of exposure to known allergens — medications, food, insect bite or sting. Symptoms in the context of a known allergen make allergy more likely; the absence of a known allergen does not exclude allergy or anaphylaxis.',
      'Repeat and document ABCD physical examination and physiological observations regularly. The point is the trend: it is what identifies clinical deterioration, and what shows whether the treatment is working.',
      'Monitor frequently for response to treatment and for deterioration. Anaphylaxis moves quickly in both directions.',
    ],

    criticalHandlingRules: [
      'A patient with signs of anaphylaxis, or who has had adrenaline at any point — from you or from anyone before you — must NOT be allowed to stand or walk at any time. Fatality can occur within seconds if such a patient suddenly stands or sits up.',
      'Position the patient supine, to improve venous return to the heart.',
      'If breathing difficulties are present the patient may sit with their legs outstretched, and must then be watched for signs of hypotension.',
      'Move the patient by stretcher, and transport by stretcher.',
      'Minimise time on scene.',
    ],

    treatmentPriorities: [
      'Intramuscular adrenaline is the front-line treatment for ALL patients with anaphylaxis. Every patient with anaphylaxis is to receive it.',
      'Do NOT delay intramuscular adrenaline in favour of any other treatment. Nothing else in the pathway substitutes for it.',
      'Keep the threshold low — for giving adrenaline where anaphylaxis is suspected even if it is not yet immediately life-threatening, and for repeating it where the patient is not improving.',
      'Anything else is an addition, not an alternative, and belongs after adrenaline has been given and only while the systemic signs are improving:',
      [
        'Bronchospasm is treated with a nebulised bronchodilator. Where wheeze persists after it, the external pathway adds a further drug at paramedic level.',
        'Signs of hypovolaemia are treated with an intravenous crystalloid, repeated as required, alongside adrenaline and never instead of it. The Hatzolah anaphylaxis protocol contains no fluid step — this is what the external pathway does, not an instruction.',
        'Itch or rash is treated with an oral antihistamine only once the systemic signs are settling. The external services carry different antihistamines from Hatzolah.',
      ],
      'If the patient arrests, move to the cardiac arrest protocol.',
    ],

    adrenalineAlreadyGiven: [
      'A patient who was given adrenaline before you arrived — by themselves, a family member, a school or a workplace — is on this pathway, not the mild allergy pathway, no matter how well they now look.',
      'Continually re-assess them even where the signs and symptoms have resolved after that adrenaline. Their condition may deteriorate.',
      'They fall under the same handling rules: no standing, no walking, stretcher.',
      'Having received adrenaline is also a specific exclusion from the external service’s referral-decision protocol. A patient who has had adrenaline cannot be referred and left — they are transported.',
    ],

    escalation: [
      'Most patients improve 5 to 10 minutes after intramuscular adrenaline, and most need only one dose. That is the expected course, and it is the benchmark against which you judge the ones who do not follow it.',
      'A patient who is peri-arrest, or who is not improving 5 to 10 minutes after the first dose, needs a higher level of clinical help requested urgently. In the external services that means an intensive care or critical care paramedic; for Hatzolah it means ambulance backup and the consult call.',
      'Where hypovolaemia persists in a patient taking a beta-blocker, the external pathway adds a further drug at paramedic level.',
      'Where signs of upper airway obstruction continue after intramuscular adrenaline, the pathway adds an airway-directed route at paramedic level.',
      'Beyond that the pathway escalates to intravenous adrenaline and to an adrenaline infusion, at clinical levels above first response.',
    ],

    disposition: [
      'Every patient treated for anaphylaxis must be given a clear recommendation to be transported to a medical facility by ambulance.',
      'Transport is to an emergency department.',
      'A patient who has improved significantly after a single intramuscular dose is usually not time critical, and is appropriate for ordinary road transport.',
      'The patients who warrant the fastest response and transport available are those with significant airway compromise, those known to need multiple doses of adrenaline, and those not improving with treatment.',
      'Transport urgently any patient who is unresponsive to treatment.',
    ],

    furtherNotes: [
      'A patient who does not have anaphylaxis, and does not have a clinical likelihood of allergy at all, should be assessed for other causes and treated under the protocol that fits.',
      'The external pathway holds the mild to moderate reaction and anaphylaxis in a single protocol precisely because a patient can cross from one to the other while you are with them. Re-assess against the anaphylaxis criteria, not against the impression you formed on arrival.',
    ],
  },
};
