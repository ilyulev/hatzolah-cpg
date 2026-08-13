// Extended ("full") protocols — the second tier behind the 📖 toggle.
//
// The Hatzolah CPG is the authority for what a responder may do. This tier adds
// background from other ambulance services' published guidelines, for protocols
// where that background is useful. It is REFERENCE ONLY and must never read as
// though it grants scope.
//
// Each entry carries:
//   sources[]      which service, which guideline reference, URL, when retrieved
//   differences[]  points where the external guidance disagrees with Hatzolah;
//                  Hatzolah governs and the difference is shown, not hidden
//   content        the same section vocabulary the main protocols use, so it
//                  renders through the existing renderValue dispatch
//
// A protocol with no entry here simply has no extended view, and the 📖 button
// keeps its previous behaviour of expanding the Hatzolah content.
import { methoxyflurane } from './methoxyflurane.js';

export const extendedContent = {
  methoxyflurane,
};

export const hasExtended = (key) => Boolean(key && extendedContent[key]);
