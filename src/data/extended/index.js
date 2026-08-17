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
import { aspirin } from './aspirin.js';
import { glucagon } from './glucagon.js';
import { glucosePaste } from './glucose-paste.js';
import { gtn } from './gtn.js';
import { ipratropium } from './ipratropium.js';
import { methoxyflurane } from './methoxyflurane.js';
import { midazolam } from './midazolam.js';
import { normalSaline } from './normal-saline.js';
import { ondansetron } from './ondansetron.js';
import { oxygen } from './oxygen.js';
import { paracetamol } from './paracetamol.js';
import { salbutamol } from './salbutamol.js';

export const extendedContent = {
  adrenaline,
  aspirin,
  glucagon,
  'glucose-paste': glucosePaste,
  gtn,
  ipratropium,
  methoxyflurane,
  midazolam,
  'normal-saline': normalSaline,
  ondansetron,
  oxygen,
  paracetamol,
  // One drug, two Hatzolah entries: the CB protocol is puffer-only and the FR
  // protocol adds the nebulised routes. The reference material is the same drug,
  // so both point at it - the practice-level split is a Hatzolah scope decision
  // and is enforced by the main protocol, not by this tier.
  'salbutamol-cb': salbutamol,
  'salbutamol-fr': salbutamol,
};

export const hasExtended = (key) => Boolean(key && extendedContent[key]);
