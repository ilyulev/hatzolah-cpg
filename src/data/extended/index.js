// Extended ("full") protocols — the second tier behind the 📖 button.
//
// The Hatzolah CPG is the authority for what a responder may do. This tier adds
// background from other ambulance services' published guidelines. It is
// REFERENCE ONLY and must never read as though it grants scope.
//
// Each entry carries:
//   sources[]      which service, which guideline reference, URL, when retrieved
//   differences[]  points where the external guidance CONTRADICTS Hatzolah;
//                  Hatzolah governs and the difference is shown, not hidden.
//                  Something the externals cover and Hatzolah simply does not
//                  mention is an addition, and lives in the body instead.
//   content        the same section vocabulary the main protocols use, so it
//                  renders through the existing renderValue dispatch
//
// A protocol with no entry here simply has no extended view and the 📖 button
// keeps its previous behaviour of expanding the Hatzolah content.
//
// NOT COVERED, deliberately:
//   cetirizine    Neither service carries it. NSW stocks Fexofenadine and
//                 St John NZ stocks Loratadine - different antihistamines, not
//                 substitutes. Publishing another drug's doses under Cetirizine
//                 would be exactly the kind of defect the v6.2 audit found, so
//                 this protocol has no extended tier at all.
import { adrenaline } from './adrenaline.js';
import { airwayObstructionFr } from './airway-obstruction-fr.js';
import { allergyMild } from './allergy-mild.js';
import { alteredConsciousnessFr } from './altered-consciousness-fr.js';
import { anaphylaxisFr } from './anaphylaxis-fr.js';
import { aspirin } from './aspirin.js';
import { asthmaFr } from './asthma-fr.js';
import { birthNewborn } from './birth-newborn.js';
import { burns } from './burns.js';
import { cardiacChestPain } from './cardiac-chest-pain.js';
import { chestTrauma } from './chest-trauma.js';
import { dehydration } from './dehydration.js';
import { falls } from './falls.js';
import { glucagon } from './glucagon.js';
import { glucosePaste } from './glucose-paste.js';
import { gtn } from './gtn.js';
import { headTrauma } from './head-trauma.js';
import { hypoglycaemia } from './hypoglycaemia.js';
import { infectionSepsis } from './infection-sepsis.js';
import { ipratropium } from './ipratropium.js';
import { methoxyflurane } from './methoxyflurane.js';
import { midazolam } from './midazolam.js';
import { nauseaVomiting } from './nausea-vomiting.js';
import { normalSaline } from './normal-saline.js';
import { ondansetron } from './ondansetron.js';
import { oxygen } from './oxygen.js';
import { painRelief } from './pain-relief.js';
import { paracetamol } from './paracetamol.js';
import { salbutamol } from './salbutamol.js';
import { seizure } from './seizure.js';
import { spinalTrauma } from './spinal-trauma.js';
import { stroke } from './stroke.js';
import { woundCare } from './wound-care.js';

export const extendedContent = {
  adrenaline,
  'airway-obstruction-fr': airwayObstructionFr,
  'allergy-mild': allergyMild,
  'altered-consciousness-fr': alteredConsciousnessFr,
  'anaphylaxis-fr': anaphylaxisFr,
  aspirin,
  'asthma-fr': asthmaFr,
  'birth-newborn': birthNewborn,
  burns,
  'cardiac-chest-pain': cardiacChestPain,
  'chest-trauma': chestTrauma,
  dehydration,
  falls,
  glucagon,
  'glucose-paste': glucosePaste,
  gtn,
  'head-trauma': headTrauma,
  hypoglycaemia,
  'infection-sepsis': infectionSepsis,
  ipratropium,
  methoxyflurane,
  midazolam,
  'nausea-vomiting': nauseaVomiting,
  'normal-saline': normalSaline,
  ondansetron,
  oxygen,
  'pain-relief': painRelief,
  paracetamol,
  seizure,
  'spinal-trauma': spinalTrauma,
  stroke,
  'wound-care': woundCare,
  // One drug, two Hatzolah entries: the CB protocol is puffer-only and the FR
  // protocol adds nebulised routes. The reference material is the same drug, so
  // both point at it; the practice-level split is enforced by the main protocol.
  'salbutamol-cb': salbutamol,
  'salbutamol-fr': salbutamol,
};

export const hasExtended = (key) => Boolean(key && extendedContent[key]);
