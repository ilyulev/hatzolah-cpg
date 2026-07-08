/**
 * Medications — sourced section (Hatzolah CPG pharmacology).
 * Flat list of medications with category chips, split My Scope / Reference Only,
 * using the same level rules as HomeScreen. Tapping opens ProtocolView (parent).
 */
import React from 'react';
import { Info } from 'lucide-react';
import { medicationsContent, CAN_PERFORM, REFERENCE_ONLY, CATEGORY_COLORS } from '../data/contentData';

function MedRow({ proto, greyed, onSelect }) {
  const colors = CATEGORY_COLORS[proto.category] || CATEGORY_COLORS.medical;
  return (
    <button
      onClick={() => onSelect(proto)}
      className={`w-full text-left rounded-xl p-4 transition-all active:scale-95 ${
        greyed
          ? 'border border-gray-200 bg-gray-50 opacity-70 hover:border-gray-300'
          : 'shadow-sm border border-gray-100 bg-white hover:border-blue-300 hover:bg-blue-50'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2">
          <p className={`font-semibold ${greyed ? 'text-gray-500' : 'text-gray-900'}`}>{proto.title}</p>
          {proto.summary && (
            <p className={`text-sm mt-0.5 ${greyed ? 'text-gray-400' : 'text-gray-500'}`}>{proto.summary}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${greyed ? 'bg-gray-300 text-gray-600' : 'text-white'}`}
            style={greyed ? undefined : { background: colors.icon }}
          >
            {proto.level}
          </span>
          <span className="text-[10px] text-gray-400 uppercase">{proto.category}</span>
        </div>
      </div>
    </button>
  );
}

export function MedicationsSection({ userLevel, onProtocolSelect }) {
  const canPerform = CAN_PERFORM[userLevel] || [];
  const reference = REFERENCE_ONLY[userLevel] || [];

  const perform = [];
  const ref = [];
  Object.entries(medicationsContent).forEach(([key, proto]) => {
    const p = { key, ...proto };
    if (proto.universal === true || canPerform.includes(proto.level)) perform.push(p);
    else if (reference.includes(proto.level)) ref.push(p);
  });

  return (
    <div className="p-3 space-y-2">
      {perform.length > 0 && (
        <>
          <p className="text-xs font-semibold text-gray-500 uppercase px-1">My Scope</p>
          {perform.map((p) => (
            <MedRow key={p.key} proto={p} greyed={false} onSelect={onProtocolSelect} />
          ))}
        </>
      )}
      {ref.length > 0 && (
        <>
          <div className="flex items-center space-x-2 mt-4 px-1">
            <p className="text-xs font-semibold text-gray-400 uppercase">Reference Only</p>
            <Info className="w-3 h-3 text-gray-400" />
          </div>
          {ref.map((p) => (
            <MedRow key={p.key} proto={p} greyed onSelect={onProtocolSelect} />
          ))}
        </>
      )}
    </div>
  );
}
