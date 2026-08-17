// Extended ("full") protocol for Paracetamol, merged from the NSW Ambulance and
// St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply. Both services carry paracetamol under
// its own name, so nothing here is borrowed from a different drug.
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice rather than quoted per
// service, and carry no inline "(NSW)" / "(NZ)" tags. Where both services make the
// same point in different words it is written once; where they cover different
// ground the points are combined into a single readable statement. Provenance
// lives on the source chips at the top of the view and in `sources` below, which
// is the level at which it is useful - a responder wants the information, not a
// citation on every line. Nothing here is invented: every statement traces to one
// or both guidelines, and anything that disagrees with the Hatzolah CPG is left
// out of the body and recorded in `differences` instead.
//
// CONTRAINDICATION vs CAUTION
// The services are markedly stricter than Hatzolah about where paracetamol limits
// belong. One treats a dose within the previous 4 hours, the 24-hour maxima and
// liver failure as outright CONTRAINDICATIONS; the other treats the 4-hour rule
// and severe liver disease as cautions. The Hatzolah CPG decides: it holds all of
// them as PRECAUTIONS, so the prior-dose limits, the 24-hour maxima and the whole
// liver picture sit under `cautions` here and are not repeated as
// contraindications. Only known allergy - which Hatzolah does not mention at all,
// and which both services hold as a contraindication - is listed there.
//
// JUDGEMENTS MADE
// - The external blanket contraindication below 7 years contradicts the Hatzolah
//   oral-liquid dosing that starts in infancy, so it is recorded in `differences`
//   rather than stated in the body.
// - One service authorises any personnel, including those without an authority to
//   practise, to hand paracetamol to a patient for self-administration, and allows
//   a patient treated for a minor condition to be advised that immediate referral
//   is not required. Both are that service's own scope and disposition rules, not
//   clinical facts about the drug, and would misrepresent Hatzolah practice levels,
//   so both are omitted. The other service's plain safety instruction - do not
//   leave paracetamol tablets with the patient - is kept.
// - The NZ page is not level-gated: its content was compared at Emergency Medical
//   Technician and at Paramedic and is identical.
export const paracetamol = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'P-222',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/paracetamol',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.37',
      note: 'Version 1.0.1 (22/11/2022)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/paracetamol-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Paediatric age limit',
      hatzolah:
        'Contraindicated in any form under 1 month. Tablets are contraindicated under 7 years, but oral liquid at 15 mg/kg is dosed for children under 12, down to about 6 kg / 3 months.',
      external:
        'Paracetamol is contraindicated outright in patients under 7 years, in any form.',
      note: 'Follow Hatzolah. Noted because the external restriction is the broader one — it rules out the oral liquid that Hatzolah permits in young children.',
    },
    {
      field: 'Adult dose',
      hatzolah:
        '1000 mg (2 tablets) for 16 to 60 year olds who are ≥ 60 kg and not frail; 500 mg for patients ≥ 60 years, under 60 kg, frail, or aged 12 to 15. Repeat at 4 hours, 4 doses in 24 hours.',
      external:
        'An adult over 80 kg is given 1.5 g orally and an adult of 80 kg or less 1 g, banded on weight alone; that guideline states plainly that its doses are higher than most references recommend but are safe provided they are not repeated. The other guideline gives 500 mg – 1 g from 12 years.',
      note: 'Follow Hatzolah. The 1.5 g dose exceeds the Hatzolah maximum single dose, and Hatzolah bands the dose by age and frailty as well as by weight.',
    },
    {
      field: 'Liver failure',
      hatzolah:
        'Impaired liver function and liver disease are precautions — circumstances that increase the risk of liver toxicity.',
      external:
        'Liver failure is an absolute contraindication, and paracetamol should usually be withheld in known severe liver disease.',
      note: 'Follow Hatzolah on classification — the liver material is kept under cautions here to match it. Noted because the external position is the stricter one.',
    },
    {
      field: 'Paediatric 24-hour maximum',
      hatzolah: 'Total paracetamol within 24 hours must not exceed 60 mg/kg in children.',
      external: 'A flat cap of 2 g in 24 hours for patients aged 7 to 12 years.',
      note: 'Follow Hatzolah. The flat cap is the more restrictive of the two for a child over roughly 33 kg.',
    },
  ],

  content: {
    indications: [
      'Mild to moderate pain.',
      'Moderate to severe pain, given in addition to other analgesics rather than on its own.',
    ],

    contraindications: [
      'Known allergy or hypersensitivity to paracetamol.',
    ],

    cautions: [
      'Paracetamol taken within the previous 4 hours. It is hidden in many products — cold and flu tablets and drinks, cough mixtures, combination pain relievers, migraine tablets — so ask specifically. A further dose may be given only where it is clear the 4-hour total will stay within the guideline dose. Withhold if there is any doubt.',
      'Do not give alongside any other paracetamol-containing product; the combination easily produces an overdose.',
      'Do not exceed the 24-hour total: 4 g (8 tablets) in patients 12 years and over, or 2 g (4 tablets) in patients 7 to 12 years.',
      'Overdose may cause liver failure, which can require a liver transplant or be fatal.',
      'Impaired liver function or underlying liver disease raises the risk of paracetamol-related liver damage. Clearance is only altered once liver disease is severe, but the balance of risk is such that paracetamol is usually withheld in that setting.',
      'Impaired kidney function — moderate to severe renal impairment may allow paracetamol conjugates to accumulate.',
      'Abdominal pain, particularly where the patient is very unwell or vomiting. Clinical judgement is needed, but significant intra-abdominal pathology may be present and oral medicines are usually withheld.',
    ],

    administration: [
      'Give orally.',
      'Supplied as 500 mg tablets, and as a syrup containing 50 mg/mL.',
      'A child who cannot swallow tablets can be given the syrup, or tablets crushed and mixed into a soft food such as jam or honey.',
      'Before giving a dose, check specifically for paracetamol given in the previous 4 hours and for the total taken over the previous 24 hours.',
      'Do not leave paracetamol tablets with the patient.',
    ],

    onsetAndDuration: [
      'Onset 10 – 60 minutes, usually 30 – 60 minutes.',
      'Duration of effect 4 – 6 hours.',
      'Half-life about 2 hours.',
    ],

    adverseEffects: [
      'There are no common adverse effects; those below are rare, under 0.1%.',
      'Hypersensitivity reactions — rash, fixed drug eruption, and rarely toxic epidermal necrolysis or Stevens-Johnson syndrome.',
      'Haematological reactions — neutropenia, thrombocytopenia, pancytopenia.',
      'Acute hepatitis.',
      'Hypotension, reported with intravenous administration.',
    ],

    interactions: [
      'No common interactions.',
      'Absorption is increased by anything that speeds gastric emptying, such as metoclopramide.',
      'Absorption is decreased by anything that slows gastric emptying, such as narcotic analgesics and antidepressants with anticholinergic properties.',
    ],

    mechanismAndPharmacokinetics: [
      'Inhibits prostaglandin production, reducing both pain and fever. The analgesic mechanism is not fully determined, but is thought to include inhibition of central prostaglandin synthesis and modulation of inhibitory descending serotonergic pathways.',
      'The antipyretic effect is most likely due to reduced prostaglandin production in the hypothalamus.',
      'Anti-inflammatory activity is negligible.',
      'Metabolised by the hepatic microsomal enzyme system and excreted in the urine.',
      'Severe liver impairment significantly delays clearance, but does not affect the initial (loading) dose.',
    ],

    furtherNotes: [
      'For severe pain, paracetamol is worth adding to the other analgesics given, particularly where transport time is long. It is not a priority, but it reduces the need for repeat analgesia and improves the quality of pain relief.',
      'Not indicated for pain associated with myocardial ischaemia.',
      'Fever is not in itself an indication, because fever may confer some benefit where the patient has an infection. Paracetamol may be given where the temperature is above 39°C and the fever is causing discomfort. One service does list fever as an indication outside its own guidelines.',
    ],
  },
};
