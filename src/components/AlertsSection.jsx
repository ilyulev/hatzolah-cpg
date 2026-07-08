/**
 * Alerts — differential reasoning aid (app extension).
 * Expandable finding cards: "what could it be + what to check next".
 * Non-mandatory; banner links conceptually to Clinical Flags (Home).
 */
import React, { useState } from 'react';
import { ChevronDown, TriangleAlert } from 'lucide-react';
import { alertsContent, ALERTS_BANNER } from '../data/extensions/alertsContent';

function FindingCard({ entry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex items-center justify-between"
      >
        <span className="font-semibold text-gray-900">{entry.finding}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase mt-3 mb-2">Could be…</p>
          <ul className="space-y-2">
            {entry.considerations.map((c, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium text-gray-800">{c.cause}</span>
                {c.hint && <span className="text-gray-500"> — {c.hint}</span>}
              </li>
            ))}
          </ul>
          {entry.checkNext?.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-4 mb-2">Don’t forget to check</p>
              <div className="flex flex-wrap gap-1.5">
                {entry.checkNext.map((c, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function AlertsSection() {
  return (
    <div className="p-3 space-y-2">
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 flex items-start gap-2">
        <TriangleAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-amber-800 text-xs font-medium">{ALERTS_BANNER}</p>
      </div>
      {alertsContent.map((entry, i) => (
        <FindingCard key={i} entry={entry} />
      ))}
    </div>
  );
}
