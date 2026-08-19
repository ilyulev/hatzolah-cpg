// One shared answer to "what does Back do right now?"
//
// Routing is a view state machine in App.jsx, so there is no router to ask.
// Instead every view that can be backed out of registers a *layer* while it is
// open, and the innermost live layer wins. Three things then pop that layer:
// the left-edge swipe, the OS back button/gesture, and the browser back arrow.
//
// The manifest is display:standalone, so once the app is installed there is no
// browser chrome at all - Android's back button is the only system affordance,
// and until now it dropped straight out of the app from a protocol page.
//
// The layer list is mirrored into real history entries (pushState with no URL,
// so the address never changes and the PWA scope stays intact). Every back
// action is routed through history.back(), and the popstate handler is the only
// place a layer is actually popped. One code path, so the two can't drift.
import React, { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';

// Two contexts on purpose. Layers key their registration effect off the API, so
// the API object must keep a stable identity for the life of the provider: if it
// changed per render, every layer would unregister and re-register together, and
// because React runs child effects before parent ones they would come back in
// the wrong order - an overlay would end up ranked *below* the page it covers.
// Depth changes constantly, so it travels separately.
const BackApiContext = createContext(null);
const BackDepthContext = createContext(0);

export function BackProvider({ children }) {
  // Layers live in a ref, not state: they are read by event handlers, and
  // re-registering on every parent render would loop. `depth` is the render-
  // visible mirror, used only to enable/disable the swipe.
  const layersRef = useRef([]);
  const [depth, setDepth] = useState(0);
  // History entries this provider pushed, and popstate events it caused itself
  // and must therefore ignore.
  const ownedRef = useRef(0);
  const swallowRef = useRef(0);
  const scheduledRef = useRef(false);

  const applySync = useCallback(() => {
    const want = layersRef.current.length;
    setDepth(want);
    const have = ownedRef.current;
    if (want > have) {
      for (let i = have; i < want; i++) window.history.pushState({ cpgBack: i + 1 }, '');
      ownedRef.current = want;
    } else if (want < have) {
      // Layers went away without a back press - switching tabs, or changing
      // practice level, which resets every drill-down. Give the entries back or
      // the next real back press would burn one doing nothing.
      ownedRef.current = want;
      swallowRef.current += 1; // a multi-step go() still fires one popstate
      window.history.go(want - have);
    }
  }, []);

  // Coalesce to a microtask: several layers can deactivate in one commit, and
  // firing a history.go() per layer would queue redundant traversals.
  const sync = useCallback(() => {
    if (scheduledRef.current) return;
    scheduledRef.current = true;
    queueMicrotask(() => {
      scheduledRef.current = false;
      applySync();
    });
  }, [applySync]);

  const push = useCallback((id, handlerRef) => {
    layersRef.current = [...layersRef.current, { id, handlerRef }];
    sync();
  }, [sync]);

  const remove = useCallback((id) => {
    layersRef.current = layersRef.current.filter((l) => l.id !== id);
    sync();
  }, [sync]);

  useEffect(() => {
    const onPop = () => {
      if (swallowRef.current > 0) {
        swallowRef.current -= 1;
        return;
      }
      const top = layersRef.current[layersRef.current.length - 1];
      if (!top) return; // nothing of ours is open; the browser has left the app
      // Drop the layer here rather than waiting for the owner's effect cleanup,
      // so the sync that cleanup triggers sees the counts already agreeing and
      // does not traverse history a second time.
      ownedRef.current = Math.max(0, ownedRef.current - 1);
      layersRef.current = layersRef.current.slice(0, -1);
      setDepth(layersRef.current.length);
      top.handlerRef.current();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Deliberately goes through history rather than calling the handler: popstate
  // is the single place a layer is popped, so history depth can never drift
  // from layer depth.
  const goBack = useCallback(() => {
    if (layersRef.current.length) window.history.back();
  }, []);

  const api = useMemo(() => ({ push, remove, goBack }), [push, remove, goBack]);
  return (
    <BackApiContext.Provider value={api}>
      <BackDepthContext.Provider value={depth}>{children}</BackDepthContext.Provider>
    </BackApiContext.Provider>
  );
}

/**
 * Declare "while this is open, Back closes it".
 *
 * `handler` may be a fresh closure each render - it is held in a ref, so only
 * `active` flipping causes a re-registration.
 */
export function useBackLayer(active, handler) {
  const api = useContext(BackApiContext);
  const id = useId();
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!api || !active) return undefined;
    api.push(id, handlerRef);
    return () => api.remove(id);
  }, [active, api, id]);
}

export function useBack() {
  const api = useContext(BackApiContext);
  const depth = useContext(BackDepthContext);
  return { goBack: api?.goBack ?? (() => {}), canGoBack: depth > 0 };
}
