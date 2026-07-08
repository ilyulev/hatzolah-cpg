/**
 * TopBar — slim persistent bar: app title + practice-level chip.
 * Tapping the chip opens the level switcher (Settings rendered as an overlay).
 */
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PRACTICE_LEVELS } from '../data/contentData';

export function TopBar({ userLevel, onLevelChipTap }) {
  const cfg = PRACTICE_LEVELS[userLevel];
  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
      <div>
        <h1 className="text-base font-bold text-gray-900 leading-tight">Hatzolah CPG</h1>
        <p className="text-[10px] text-gray-400">v6.2</p>
      </div>
      <button
        onClick={onLevelChipTap}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: cfg?.bg, color: cfg?.color }}
        title="Change practice level"
      >
        {userLevel}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
