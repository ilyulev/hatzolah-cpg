/**
 * useUserLevel — persists the selected practice level in localStorage
 */
import { useState, useEffect } from 'react';
import { PRACTICE_LEVELS } from '../data/contentData';

const STORAGE_KEY = 'hatzolah_cpg_level';

export function useUserLevel() {
  const [userLevel, setUserLevel] = useState(null); // null = not yet selected
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && PRACTICE_LEVELS[stored]) {
        setUserLevel(stored);
      }
    } catch {
      // localStorage unavailable (private mode etc)
    }
    setLoaded(true);
  }, []);

  const selectLevel = (level) => {
    if (!PRACTICE_LEVELS[level]) return;
    setUserLevel(level);
    try {
      localStorage.setItem(STORAGE_KEY, level);
    } catch {
      // ignore
    }
  };

  const clearLevel = () => {
    setUserLevel(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return { userLevel, loaded, selectLevel, clearLevel };
}
