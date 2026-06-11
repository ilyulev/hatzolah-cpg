/**
 * HomeScreen — color-coded tile navigation grid
 * Shows protocols grouped by category with level badge
 */
import React from 'react';
import { PRACTICE_LEVELS, CAN_PERFORM, REFERENCE_ONLY, CATEGORY_COLORS } from '../data/contentData';

// Map of category → display info
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

export function HomeScreen({ userLevel, allProtocols, onProtocolSelect, onCategorySelect }) {
  const canPerformLevels = CAN_PERFORM[userLevel] || [];
  const referenceLevels  = REFERENCE_ONLY[userLevel] || [];
  const levelConfig      = PRACTICE_LEVELS[userLevel];

  // Group all visible protocols by category
  const grouped = {};
  allProtocols.forEach(([key, proto]) => {
    // `universal` protocols (foundational assessments, e.g. Vital Signs) are in-scope for every level
    const isPerform   = proto.universal === true || canPerformLevels.includes(proto.level);
    const isReference = !proto.universal && referenceLevels.includes(proto.level);
    if (!isPerform && !isReference) return;

    const cat = proto.category || 'medical';
    if (!grouped[cat]) grouped[cat] = { perform: [], reference: [] };
    if (isPerform)   grouped[cat].perform.push({ key, ...proto });
    else             grouped[cat].reference.push({ key, ...proto });
  });

  const categories = Object.entries(grouped);

  return (
    <div>
      {/* Level badge strip */}
      <div
        className="px-4 py-3 flex items-center space-x-3"
        style={{ background: levelConfig.headerGradient }}
      >
        <div>
          <p className="text-white font-bold text-base">{levelConfig.label}</p>
          <p className="text-white text-xs opacity-80">{levelConfig.description}</p>
        </div>
      </div>

      {/* Tile grid */}
      <div className="p-3 grid grid-cols-2 gap-3">
        {categories.map(([cat, { perform, reference }]) => {
          const meta   = CATEGORY_META[cat] || { emoji: '📋', label: cat };
          const colors = CATEGORY_COLORS[cat] || CATEGORY_COLORS.medical;
          const total  = perform.length + reference.length;

          return (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat, perform, reference)}
              className="rounded-2xl shadow-sm text-left overflow-hidden hover:shadow-md active:scale-95 transition-all duration-150"
              style={{ background: colors.bg }}
            >
              <div className="p-3">
                {/* Icon + count */}
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{meta.emoji}</span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: colors.icon }}
                  >
                    {total}
                  </span>
                </div>
                {/* Title */}
                <p className="font-bold text-gray-800 text-sm leading-tight">{meta.label}</p>
                {/* Protocol list preview */}
                <div className="mt-1 space-y-0.5">
                  {perform.slice(0, 3).map(p => (
                    <p key={p.key} className="text-xs text-gray-600 truncate">{p.title}</p>
                  ))}
                  {reference.length > 0 && perform.length === 0 && (
                    <p className="text-xs text-gray-400 italic">Reference only</p>
                  )}
                  {total > 3 && (
                    <p className="text-xs font-medium" style={{ color: colors.icon }}>
                      +{total - Math.min(3, perform.length)} more…
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
