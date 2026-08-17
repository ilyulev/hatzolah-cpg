// Extended ("full") protocol for Glyceryl Trinitrate (GTN), merged from the NSW
// Ambulance and St John NZ clinical practice guidelines.
//
// PROVENANCE AND STATUS
// This is REFERENCE material, not Hatzolah scope. The Hatzolah CPG governs what a
// responder may do and which numbers apply.
//
// WHICH EXTERNAL GUIDELINE
// Both services carry glyceryl trinitrate itself, so no substitution was needed.
// St John NZ publishes two separate GTN guidelines - a sublingual spray (EAS 14.17)
// and an IV infusion (EAS 14.50). Only the sublingual spray is merged here, because
// the Hatzolah route is sublingual; the IV guideline covers a different preparation
// and is deliberately left out. The two services also stock different sublingual
// preparations - a 300 mcg tablet and a 400 mcg metered-dose spray - so the
// preparation is described rather than assumed.
//
// WRITING STYLE
// Statements are merged and paraphrased into one voice rather than quoted per
// service, and carry no inline "(NSW)" / "(NZ)" tags. Where both services make the
// same point in different words it is written once; where they cover different
// ground the points are combined into a single readable statement. Provenance lives
// on the source chips at the top of the view and in `sources` below. Nothing here is
// invented: every statement traces to one or both guidelines, and anything that
// disagrees with the Hatzolah CPG is left out of the body and recorded in
// `differences` instead. That is why the contraindication bullets for blood
// pressure, heart rate, minimum age and the PDE5 washout windows name the condition
// but not a threshold - the external thresholds all differ from Hatzolah's and are
// tabulated in `differences`.
//
// CONTRAINDICATION vs CAUTION
// The services split on phosphodiesterase-5 inhibitors: one contraindicates recent
// use outright, the other treats it as a caution to be worked around. The Hatzolah
// CPG decides, and it holds recent PDE5 use as a CONTRAINDICATION, so that material
// sits there only and is absent from `cautions`. The pharmacological detail of the
// interaction still appears under `interactions`, which is a different question from
// whether the drug may be given.
export const gtn = {
  sources: [
    {
      service: 'NSW Ambulance',
      ref: 'Pharmacology 209',
      note: 'Viewed at clinical level: Paramedic',
      url: 'https://cpg.ambulance.nsw.gov.au/tabs/medicines/page/glyceryl-trinitrate',
      retrieved: '2026-08-13',
    },
    {
      service: 'St John NZ',
      ref: 'CPG EAS 14.17',
      note: 'Version 1.1.0.1 (16/06/2026)',
      url: 'https://cpg.stjohn.org.nz/tabs/medicines/page/gtn-glyceryl-trinitrate-spray-eas',
      retrieved: '2026-08-13',
    },
  ],

  differences: [
    {
      field: 'Systolic blood pressure floor',
      hatzolah: 'Contraindicated below 100 mmHg systolic',
      external: 'One service withholds below 90 mmHg, the other below 110 mmHg.',
      note: 'Follow Hatzolah. The external figures sit either side of it, so neither is uniformly safer.',
    },
    {
      field: 'Heart rate limits',
      hatzolah: 'Contraindicated at a heart rate below 60 or at or above 150 bpm',
      external: 'The upper bound is the same at above 150; the lower bound is set at below 50 by one service and below 40 by the other.',
      note: 'Follow Hatzolah — its lower bound is the more conservative of the three.',
    },
    {
      field: 'Minimum age',
      hatzolah: 'Dosing is stated from 15 years of age',
      external: 'Contraindicated in patients under 16 years of age.',
      note: 'Follow Hatzolah. A 15-year-old is in scope for Hatzolah and out of scope externally.',
    },
    {
      field: 'Sublingual dose for cardiac chest pain',
      hatzolah: '300 mcg initially, repeated 300 mcg every 5 minutes, no stated maximum',
      external: '600 mcg initially, repeated every 5 minutes to a maximum total of 1.8 mg, dropping to a 300 mcg starting dose where physiological reserve is limited; the metered spray gives 400 mcg every 5 minutes, stretched to every 10 minutes if a caution applies.',
      note: 'Follow Hatzolah. Both external regimens start higher than Hatzolah and both cap the total, which Hatzolah does not.',
    },
    {
      field: 'Phosphodiesterase-5 inhibitors',
      hatzolah: 'Absolute contraindication — avanafil within 12 hours, sildenafil within 24 hours, tadalafil within 48 hours, vardenafil within 24 hours',
      external: 'One service contraindicates sildenafil or vardenafil within 24 hours and tadalafil within 96 hours; the other treats any phosphodiesterase inhibitor within the past 24 hours as a caution rather than a bar, to be managed by laying the patient flat, obtaining IV access and lengthening the dosing interval.',
      note: 'Follow Hatzolah. Note the much longer tadalafil washout used externally, and that one service does not treat this as an absolute bar at all.',
    },
    {
      field: 'Pregnancy and breastfeeding',
      hatzolah: 'Safe for use in pregnancy; monitoring required if breastfeeding, using the lowest effective dose and observing the infant afterwards',
      external: 'Safety has not been demonstrated. A pregnant or breastfeeding patient is very unlikely to need GTN, but it should still be given if indicated.',
      note: 'Follow Hatzolah. The external wording is more hedged but reaches the same practical answer.',
    },
  ],

  content: {
    indications: [
      'Myocardial ischaemia — cardiac chest pain or discomfort.',
      'Cardiogenic pulmonary oedema.',
      'Control of hypertension associated with autonomic dysreflexia.',
      'Control of hypertension, usually alongside labetalol, before fibrinolytic treatment for STEMI or during inter-hospital transfer for STEMI.',
    ],

    contraindications: [
      'Known severe allergy.',
      'Hypotension. GTN cuts preload and blood pressure further, so it is withheld below the accepted systolic threshold.',
      'Bradycardia, and marked tachycardia — GTN is withheld outside the accepted heart rate window.',
      'Ventricular tachycardia. GTN is not given for chest pain associated with VT because the risk of precipitating cardiac arrest outweighs the benefit.',
      'Recent use of a phosphodiesterase-5 inhibitor. These are long-acting vasodilators, prescribed for erectile dysfunction and for pulmonary hypertension, and GTN on top of one of them can cause severe or prolonged hypotension.',
      'Patients below the stated minimum age for GTN.',
    ],

    cautions: [
      'STEMI, and particularly STEMI involving the right ventricle. GTN may cause a significant fall in cardiac output; withhold it if there are signs of low cardiac output. It has a real role in symptomatic myocardial ischaemia but not usually a significant one in STEMI itself.',
      'Signs of shock — an already reduced cardiac output may fall further with GTN.',
      'Dysrhythmia, for the same reason: cardiac output may already be reduced and may fall further.',
      'The frail patient.',
      'Known aortic or mitral stenosis. Cardiac output is already limited by the narrowed valve, and a fall in preload can reduce it further.',
    ],

    administration: [
      'Give sublingually. Spray under the tongue; if that cannot be achieved, spraying into the mouth is acceptable.',
      'Tablets are dissolved under the tongue and must not be cut in half. Where two tablets are given, let the first dissolve completely before giving the second.',
      'Monitor blood pressure closely throughout administration.',
      'Where a caution applies, work around it rather than simply proceeding: lay the patient flat, obtain IV access wherever possible, stretch the dosing interval out to ten minutes, and be ready to give 0.9% sodium chloride IV if cardiac output or blood pressure falls significantly.',
      'Start a patient with limited physiological reserve on the lower dose and titrate later doses to response.',
      'In cardiogenic pulmonary oedema, increase the dose and the frequency if the patient is not improving.',
      'A treatment regimen for acute coronary syndrome or cardiogenic pulmonary oedema may be repeated 30 minutes after the last administration.',
      'Preparations differ: a metered-dose bottle delivering 400 mcg per spray, and a 300 mcg sublingual tablet. Once opened, a bottle may be used until the expiry date printed on it.',
    ],

    onsetAndDuration: [
      'Onset 1 – 2 minutes.',
      'Effect lasts 15 – 30 minutes.',
    ],

    adverseEffects: [
      'Common: hypotension, headache, flushing, tachycardia, light-headedness.',
    ],

    interactions: [
      'Phosphodiesterase inhibitors — sildenafil in particular — are long-acting vasodilators, and GTN adds further vasodilation on top of them. Severe or prolonged hypotension may result if one has been taken within the past 24 hours.',
      'Antihypertensive medicines increase the effect of GTN.',
    ],

    mechanismAndPharmacokinetics: [
      'A vasodilator acting on vascular smooth muscle, dilating both veins and arteries, with the predominant effect on veins. The precise mechanism is not clear, but it appears to act through the formation of nitric oxide.',
      'Reduced venous return lowers preload, which reduces ventricular filling and cardiac output and so lowers myocardial oxygen demand.',
      'Arterial dilation lowers peripheral resistance (afterload), reducing the force the left ventricle must overcome to eject blood — again lowering myocardial oxygen demand.',
      'It also dilates the coronary arteries, which may increase coronary blood supply, though this is not usually clinically significant.',
      'Absorbed rapidly from the oral mucosa and reaching the circulation without first passing through the liver. It is then metabolised predominantly by the liver, and liver impairment has no significant effect on a single acute dose.',
    ],

    furtherNotes: [
      'Right ventricular involvement in STEMI warrants particular caution and a low threshold for withholding GTN. A significantly impaired right ventricle may contribute little to cardiac output, with blood flowing passively down a pressure gradient from the vena cavae to the left atrium; filling of the left side of the heart then depends on venous pressure. GTN can drop venous pressure sharply, and preload and cardiac output with it.',
      'The reason VT is an absolute bar rather than a caution: in VT the atria and ventricles contract independently, so ventricular filling is already reduced by the loss of the atrial kick. Combined with abnormal ventricular contraction this can cause a substantial fall in cardiac output, and GTN reduces venous return on top of it — risking severe hypotension or cardiac arrest.',
      'Supply note: Nitrostat 0.3 mg tablets are a temporary preparation supplied under the TGA 19A category, replacing the discontinued Anginine tablets.',
    ],
  },
};
