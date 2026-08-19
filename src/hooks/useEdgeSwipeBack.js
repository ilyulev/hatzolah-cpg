// Drag right from the left edge to go back, the way iOS and Android do it.
//
// Why the edge and not the whole screen: ProtocolView has seven horizontally
// scrollable regions - dose tables, age-band tab strips, branch chips. A
// full-width horizontal gesture would fight them, so trying to scroll a wide
// dosing table sideways would throw you out to the category list instead. None
// of those regions touch the screen edge, so an edge-anchored gesture can never
// be confused with scrolling one.
import { useEffect, useRef } from 'react';

const EDGE_PX = 28;            // how close to the left edge a drag must start
const SLOP_PX = 12;            // movement before committing to an axis
const COMPLETE_FRACTION = 0.3; // drag this far across and release = back
const FLING_PX_PER_MS = 0.4;   // ...or flick this fast, however short
const ANIM_MS = 180;

export function useEdgeSwipeBack(ref, enabled, onBack) {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;

    let tracking = false;   // gesture started at the edge, axis not yet decided
    let dragging = false;   // committed: we own this gesture
    let x0 = 0, y0 = 0, t0 = 0, dx = 0;
    let timer = 0;

    // Always clear the transform rather than leaving translateX(0): a transform
    // makes the element a containing block for its `fixed` descendants, which
    // would quietly re-anchor the 📖 detail overlay to <main> instead of the
    // viewport.
    const clear = () => {
      el.style.transition = '';
      el.style.transform = '';
    };

    const settle = (toPx, after) => {
      el.style.transition = `transform ${ANIM_MS}ms ease-out`;
      el.style.transform = `translateX(${toPx}px)`;
      timer = window.setTimeout(() => {
        clear();
        if (after) after();
      }, ANIM_MS);
    };

    const onStart = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      if (t.clientX > EDGE_PX) return;
      window.clearTimeout(timer);
      tracking = true;
      dragging = false;
      x0 = t.clientX;
      y0 = t.clientY;
      t0 = e.timeStamp;
      dx = 0;
    };

    const onMove = (e) => {
      if (!tracking) return;
      const t = e.touches[0];
      dx = Math.max(0, t.clientX - x0);
      const dy = Math.abs(t.clientY - y0);

      if (!dragging) {
        // Vertical wins ties, so scrolling a page that happens to start under
        // the thumb near the edge still works.
        if (dy > dx && dy > SLOP_PX) { tracking = false; return; }
        if (dx <= SLOP_PX) return;
        dragging = true;
      }
      e.preventDefault(); // registered passive:false only because of this line
      el.style.transition = '';
      el.style.transform = `translateX(${dx}px)`;
    };

    const onEnd = (e) => {
      if (!tracking) return;
      const committed = dragging;
      tracking = false;
      dragging = false;
      if (!committed) return;

      const width = el.clientWidth || window.innerWidth;
      const velocity = dx / Math.max(1, e.timeStamp - t0);
      if (dx > width * COMPLETE_FRACTION || velocity > FLING_PX_PER_MS) {
        settle(width, () => onBackRef.current());
      } else {
        settle(0);
      }
    };

    const onCancel = () => {
      if (!tracking) return;
      const committed = dragging;
      tracking = false;
      dragging = false;
      if (committed) settle(0);
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd, { passive: true });
    el.addEventListener('touchcancel', onCancel, { passive: true });
    return () => {
      window.clearTimeout(timer);
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onCancel);
      clear();
    };
  }, [ref, enabled]);
}
