/**
 * Info — reference material (app extension): menu of reference topics.
 * Topics open as drill-down views (a lot of content is expected here over
 * time — acronyms, drug classes, more). Also hosts the About block.
 */
import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { acronymsContent, INFO_BANNER } from '../data/extensions/infoContent';

const TOPICS = [
  {
    id: 'acronyms',
    title: 'Acronyms & Abbreviations',
    desc: `${acronymsContent.length} common ambulance / CPG terms`,
    Icon: BookOpen,
  },
  // future: patient medication classes (anticoagulants, beta-blockers…), etc.
];

export function InfoSection({ onTopicSelect }) {
  return (
    <div className="p-3 space-y-3">
      <p className="text-xs text-gray-400 px-1">{INFO_BANNER}</p>

      <div className="space-y-2">
        {TOPICS.map(({ id, title, desc, Icon }) => (
          <button
            key={id}
            onClick={() => onTopicSelect(id)}
            className="w-full text-left bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-3 hover:border-blue-300 hover:bg-blue-50 active:scale-95 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 italic px-1">More reference topics coming soon.</p>

      {/* About (moved from Settings) */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">About</p>
        <p className="text-sm text-gray-600">Hatzolah CPG v6.2 (14 Aug 2024)</p>
        <p className="text-xs text-gray-400 mt-1">For clinical use by Hatzolah Melbourne members only.</p>
      </div>
    </div>
  );
}
