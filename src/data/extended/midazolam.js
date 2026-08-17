// Extended ("full") protocol for Midazolam, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply. Hatzolah carries midazolam for status
// epilepticus only, intramuscular only, accredited responders only; both external
// services carry it far more widely. That gap is recorded in `differences` rather
// than hidden, because a reader who meets an unfamiliar indication here must not
// read it as scope.
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice rather than quoted per
// service, and carry no inline "(NSW)" / "(NZ)" tags. Where both services make the
// same point in different words it is written once; where they cover different
// ground the points are combined. Provenance lives on the source chips at the top
// of the view and in `sources` below. Nothing here is invented: every statement
// traces to one or both guidelines, and anything that disagrees with the Hatzolah
// CPG is left out of the body and recorded in `differences` instead.
//
// CONTRAINDICATION vs CAUTION
// The Hatzolah CPG holds only benzodiazepine hypersensitivity as a contraindication
// and puts everything else - elderly or frail, under 60 kg, chronic renal failure,
// CCF, shock, COPD, myasthenia gravis, concurrent CNS depressants - under
// precautions. Both external services agree on that split (NSW files its material
// under "Precautions/Warnings", NZ under "Cautions"), so no item had to be moved.
// NZ's one extra contraindication, under 12 years for the analgesia indication, is
// kept as a contraindication: Hatzolah is silent on it and does not hold it
// elsewhere.
//
// JUDGEMENTS MADE
// - Dosing is deliberately absent from the body. The Hatzolah dosing table governs,
//   the NZ medicine page carries no doses at all (it defers to its individual
//   guidelines), and the NSW doses are per-protocol; the seizure figures that
//   actually conflict with Hatzolah are recorded in `differences`.
// - Duration of effect: the services quote the same figure intramuscularly
//   (30 - 60 minutes) but differ intravenously, where NSW quotes 1.5 - 2 hours
//   against NZ's 30 - 60 minutes. Written as one combined statement rather than a
//   column per service.
// - Hepatic impairment: the two services genuinely disagree (NZ says a single acute
//   dose is not significantly affected, NSW says clearance falls and the dose may
//   need reducing). The more cautious NSW position is the one carried, since
//   Hatzolah is silent and the conservative reading is the safe one here.
// - Pregnancy: NZ says give it when indicated despite unproven safety, NSW says
//   avoid unless there is no safer alternative. Merged into a single statement that
//   keeps both halves - avoid where a safer option exists, give it when clearly
//   indicated - since Hatzolah says nothing either way.
export const midazolam = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'P-219',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/midazolam',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.31',
      note: 'Version 1.0.5.3 (09/06/2025)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/midazolam-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Indications',
      hatzolah:
        'Seizures only — ongoing tonic clonic activity with altered consciousness lasting 5 minutes or more, or repeated seizures without full recovery of consciousness in between. Accredited responders only.',
      external:
        'Also carried for acute behavioural disturbance and agitation, procedural sedation and difficult extrication, pain with severe muscle spasm or severe anxiety, distress after transcutaneous pacing or after ketamine, cardiac arrest and post-ROSC sedation, and end-of-life care.',
      note: 'Follow Hatzolah. The wider indications are listed in this reference view as background only and are outside Hatzolah scope.',
    },
    {
      field: 'Route',
      hatzolah: 'Intramuscular only.',
      external:
        'Intramuscular, subcutaneous, intravenous or intraosseous, and intranasal, with the authorised route varying by indication and by clinical level.',
      note: 'Follow Hatzolah. The intravenous dilution described under Administration is reference only and is not a Hatzolah route.',
    },
    {
      field: 'Adult IM dose for seizures',
      hatzolah:
        '10 mg initially, repeated once at 10 minutes if required, maximum total 20 mg; 5 mg initially repeated at 5 minutes to a maximum total of 10 mg if elderly, frail or under 60 kg.',
      external: '5 mg initially, repeatable at 5 minutes, to a maximum total dose of 15 mg.',
      note: 'Follow Hatzolah. Noted because the external regimen starts lower, titrates more often and caps lower for a well adult.',
    },
    {
      field: 'Minimum age',
      hatzolah: 'Dosing is published for 15 years and over only.',
      external:
        'Paediatric seizure dosing exists — 0.15 mg/kg IM (maximum 5 mg per dose, 0.45 mg/kg total) or 0.3 mg/kg intranasally — and the only age-based restriction is under 12 years for the analgesia indication.',
      note: 'Follow Hatzolah. Midazolam is not a Hatzolah option below 15 years.',
    },
  ],

  content: {
    indications: [
      'Generalised seizures continuing for more than five minutes, or recurrent seizures.',
      'Seizures complicating a hypertensive disorder of pregnancy.',
      'Acute behavioural disturbance causing a mild to moderate risk to safety, where droperidol is unavailable or has not worked.',
      'Agitation in the trauma or critically ill patient.',
      'Sedation for a procedure — joint relocation, limb realignment or a difficult extrication — after analgesia has been given.',
      'Pain with severe muscle spasm, or severe anxiety, where an opiate alone is not achieving adequate analgesia and ketamine is not appropriate.',
      'Severe anxiety associated with COPD.',
      'Distress or pain once transcutaneous pacing is started, and distressing psychological reactions following ketamine.',
      'Consciousness interfering with CPR during cardiac arrest, and sedation after return of spontaneous circulation.',
      'Anxiety or breathlessness in the last days of life that has not responded to an opiate.',
    ],

    contraindications: [
      'Known allergy or hypersensitivity to benzodiazepines.',
      'Under 12 years of age where the indication is analgesia.',
    ],

    cautions: [
      'Elderly or frail patients, particularly from 75 years — the effect is stronger and longer, with a raised risk of oversedation, ataxia, confusion, falls, respiratory depression and short-term memory impairment. Reduce the dose and monitor closely. Falls and fractures have been reported in benzodiazepine users, and the risk rises where other sedatives, including alcohol, are also on board.',
      'Low body weight — reduce the dose.',
      'Respiratory disease or anything else that raises the risk of respiratory depression — severe COPD, morbid obesity, sleep apnoea, a patient on home BiPAP. Respiratory depression may be increased or prolonged, and can be severe.',
      'Myasthenia gravis, muscular dystrophies and myotonias — again, respiratory depression may be increased or prolonged.',
      'An already altered level of consciousness, or coma — midazolam will reduce it further.',
      'Signs of shock — midazolam may make shock worse.',
      'Severe renal impairment — adverse drug reactions are more likely.',
      'Hepatic impairment — clearance falls and the terminal half-life lengthens, so the effect may be stronger and more prolonged. Reduce the dose and monitor vital signs properly.',
      'Critical illness, cardiac insufficiency and obesity — elimination is slower and the effect outlasts the usual figures.',
      'Acute alcohol intoxication.',
      'Opiates or ketamine already given — the effects are increased and prolonged; use a dose at the lower end of any range.',
      'Pregnancy — safety has not been demonstrated and it is classified pregnancy Category C. Avoid it where a safer alternative exists, but give it where it is clearly indicated. Midazolam crosses the placenta; given in the last weeks of pregnancy or at high doses during labour it has caused neonatal CNS depression, foetal heart rate irregularity, hypothermia, hypotonia, poor sucking and moderate respiratory depression.',
      'Breastfeeding — midazolam is excreted in breast milk and its effect on the newborn is not known. If it is given, advise the patient to stop breastfeeding and to seek further advice from her lead maternity carer or GP.',
    ],

    administration: [
      'Midazolam is supplied at 5 mg/mL, as a 5 mg in 1 mL ampoule or a 15 mg in 3 mL ampoule.',
      'Intramuscular: draw the dose up undiluted. The lateral thigh is the preferred site because absorption there is best; use the lateral upper arm if the thigh is unsuitable.',
      'Intravenous: dilute to 1 mg/mL with 0.9% sodium chloride and give as a bolus.',
      [
        '1 mL (5 mg) made up to 5 mL total.',
        '2 mL of a 15 mg/3 mL ampoule made up to 10 mL total.',
      ],
      'The dose depends on the indication and on the route. Where a dose range is given, use a dose at the lower end of it if any caution is present.',
      'When midazolam is given as an adjunct to analgesia or to sedation, the patient must remain rousable at all times.',
    ],

    onsetAndDuration: [
      'Onset 1 – 3 minutes intravenously or intranasally, and 3 – 10 minutes intramuscularly.',
      'A dose lasts roughly 30 – 60 minutes intramuscularly and about 20 minutes intranasally; after an intravenous dose the effect may persist for up to 2 hours.',
      'The sedative effect may outlast the rest, particularly in the elderly.',
      'Elimination half-life 1.5 – 2 hours. It may be up to four times longer in adults over 60, and is also prolonged in hepatic impairment, critical illness, cardiac insufficiency and obesity.',
    ],

    adverseEffects: [
      'Common: sedation, respiratory depression, hypotension, amnesia, hiccup, cough.',
      'Infrequent: pain on injection, erythema at the injection site, rash, laryngospasm, bronchospasm, nausea, vomiting, headache, confusion, restlessness.',
      'Rare: arrhythmias, cardiorespiratory arrest, anaphylactic or anaphylactoid reactions.',
    ],

    interactions: [
      'Other sedatives and pain-relieving medicines — other benzodiazepines, opiates, ketamine, alcohol — increase and prolong its effects.',
      'Barbiturates, alcohol and other central nervous system depressants raise the risk of underventilation or apnoea and of cardiovascular depression, and can make the effect profound or prolonged enough to result in coma or death.',
    ],

    mechanismAndPharmacokinetics: [
      'A short-acting benzodiazepine. It enhances the activity of gamma-aminobutyric acid (GABA) at GABA receptors throughout the central nervous system, potentiating inhibition and producing anticonvulsant, sedative, hypnotic, anxiolytic, anterograde amnesic and muscle-relaxant effects.',
      'The effect on the central nervous system depends on the dose given, the route used, and whether other medicines are already on board.',
      'Metabolised by the liver and the kidneys, with 60 – 80% of the metabolites excreted in the urine.',
    ],

    furtherNotes: [
      'Warn the patient that they may not remember events occurring while the drug is working, and that this amnesia can last longer than the sedation itself. Anyone looking after them should know that instructions may not be carried out even when the patient appears to acknowledge them.',
      'Warn the patient not to drive or operate machinery until the effects, drowsiness included, have completely worn off, and to take extra care as a pedestrian. Too little sleep, or alcohol, makes impaired alertness more likely.',
      'A patient who is not transported needs a responsible person available to look after them, and should not drink alcohol during that period — up to 12 hours.',
    ],
  },
};
