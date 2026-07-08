/**
 * AcronymsView — searchable acronyms & abbreviations list (Info → topic).
 * Drill-down view with its own header (TopBar hidden while open).
 */
import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { acronymsContent } from '../data/extensions/infoContent';

export function AcronymsView({ onBack }) {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const filtered = needle
    ? acronymsContent.filter(
        (a) => a.term.toLowerCase().includes(needle) || a.meaning.toLowerCase().includes(needle)
      )
    : acronymsContent;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-200 flex items-center space-x-3">
        <button onClick={onBack} className="text-gray-500 hover:text-blue-600 p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">Acronyms & Abbreviations</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search acronyms…"
            className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {filtered.length === 0 && (
            <p className="px-4 py-4 text-sm text-gray-400 italic">No matches for “{q}”.</p>
          )}
          {filtered.map((a) => (
            <div key={a.term} className="px-4 py-2.5 flex items-baseline gap-3">
              <span className="font-bold text-gray-900 text-sm w-16 flex-shrink-0">{a.term}</span>
              <span className="text-sm text-gray-600">{a.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
