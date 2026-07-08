/**
 * Info — reference material (app extension): searchable acronyms list.
 * Also hosts the About block (moved from Settings).
 */
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { acronymsContent, INFO_BANNER } from '../data/extensions/infoContent';

export function InfoSection() {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const filtered = needle
    ? acronymsContent.filter(
        (a) => a.term.toLowerCase().includes(needle) || a.meaning.toLowerCase().includes(needle)
      )
    : acronymsContent;

  return (
    <div className="p-3 space-y-3">
      <p className="text-xs text-gray-400 px-1">{INFO_BANNER}</p>

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
        <p className="text-xs font-semibold text-gray-500 uppercase px-4 pt-3 pb-1">
          Acronyms & Abbreviations
        </p>
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

      {/* About (moved from Settings) */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">About</p>
        <p className="text-sm text-gray-600">Hatzolah CPG v6.2 (14 Aug 2024)</p>
        <p className="text-xs text-gray-400 mt-1">For clinical use by Hatzolah Melbourne members only.</p>
      </div>
    </div>
  );
}
