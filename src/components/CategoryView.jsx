/**
 * CategoryView — list of protocols within a category
 * Shows "Can Perform" protocols first, then Reference Only (greyed)
 */
import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { CATEGORY_COLORS } from '../data/contentData';

const CATEGORY_META = {
  primary:     { emoji: '🔍', label: 'Primary Assessment' },
  cardiac:     { emoji: '🫀', label: 'Cardiac' },
  respiratory: { emoji: '🫁', label: 'Respiratory' },
  neuro:       { emoji: '🧠', label: 'Neurological' },
  trauma:      { emoji: '🩸', label: 'Trauma' },
  medical:     { emoji: '💊', label: 'Medical' },
  paediatric:  { emoji: '👶', label: 'Paediatric' },
  endocrine:   { emoji: '🌡️', label: 'Endocrine' },
  analgesia:   { emoji: '💉', label: 'Analgesia' },
  fluids:      { emoji: '💧', label: 'Fluids' },
  gastro:      { emoji: '🫄', label: 'Gastro' },
  allergy:     { emoji: '🌿', label: 'Allergy' },
  emergency:   { emoji: '🚨', label: 'Emergency' },
};

export function CategoryView({ category, performProtocols, referenceProtocols, onBack, onProtocolSelect }) {
  const meta   = CATEGORY_META[category] || { emoji: '📋', label: category };
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.medical;

  return (
    <div>
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center space-x-3">
        <button onClick={onBack} className="text-gray-500 hover:text-blue-600 p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-2xl">{meta.emoji}</span>
        <h2 className="text-lg font-bold text-gray-900">{meta.label}</h2>
      </div>

      <div className="p-3 space-y-2">
        {/* Can Perform */}
        {performProtocols.length > 0 && (
          <>
            <p className="text-xs font-semibold text-gray-500 uppercase px-1">My Scope</p>
            {performProtocols.map((proto) => (
              <button
                key={proto.key}
                onClick={() => onProtocolSelect(proto)}
                className="w-full text-left rounded-xl shadow-sm border border-gray-100 bg-white p-4 hover:border-blue-300 hover:bg-blue-50 active:scale-95 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <p className="font-semibold text-gray-900">{proto.title}</p>
                    {proto.summary && (
                      <p className="text-sm text-gray-500 mt-0.5">{proto.summary}</p>
                    )}
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0 mt-0.5"
                    style={{ background: colors.icon }}
                  >
                    {proto.level}
                  </span>
                </div>
              </button>
            ))}
          </>
        )}

        {/* Reference Only */}
        {referenceProtocols.length > 0 && (
          <>
            <div className="flex items-center space-x-2 mt-4 px-1">
              <p className="text-xs font-semibold text-gray-400 uppercase">Reference Only</p>
              <Info className="w-3 h-3 text-gray-400" />
            </div>
            {referenceProtocols.map((proto) => (
              <button
                key={proto.key}
                onClick={() => onProtocolSelect(proto)}
                className="w-full text-left rounded-xl border border-gray-200 bg-gray-50 p-4 hover:border-gray-300 active:scale-95 transition-all opacity-70"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <p className="font-semibold text-gray-500">{proto.title}</p>
                    {proto.summary && (
                      <p className="text-sm text-gray-400 mt-0.5">{proto.summary}</p>
                    )}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-300 text-gray-600 flex-shrink-0 mt-0.5">
                    {proto.level}
                  </span>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
