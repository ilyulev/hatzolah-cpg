/**
 * BottomNav — fixed 5-tab navigation (Home / Meds / Alerts / Info / Halakha).
 * Pure presentational: parent owns the active section state.
 */
import React from 'react';
import { Home, Pill, AlertTriangle, Info, Star } from 'lucide-react';

export const SECTIONS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'medications', label: 'Meds', Icon: Pill },
  { id: 'alerts', label: 'Alerts', Icon: AlertTriangle },
  { id: 'info', label: 'Info', Icon: Info },
  { id: 'halakha', label: 'Halakha', Icon: Star },
];

export function BottomNav({ active, onSelect }) {
  return (
    <nav className="flex-shrink-0 bg-white border-t border-gray-200 flex pb-[env(safe-area-inset-bottom)]">
      {SECTIONS.map(({ id, label, Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
              isActive ? 'text-blue-700' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
