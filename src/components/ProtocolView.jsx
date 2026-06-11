/**
 * ProtocolView — fixed header with 📖 button + scrollable quick view
 * The header does NOT scroll; the 📖 button is always accessible.
 */
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, X } from 'lucide-react';
import { PRACTICE_LEVELS, CATEGORY_COLORS } from '../data/contentData';

// ─── Quick View content renderers ─────────────────────────────────────────────

function QuickSection({ title, color, children }) {
  return (
    <div className="rounded-xl overflow-hidden mb-3">
      <div className="px-4 py-2 font-semibold text-sm" style={{ background: color + '33', color }}>
        {title}
      </div>
      <div className="px-4 py-3 bg-white border border-gray-100">{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-700 flex items-start">
          <span className="text-gray-400 mr-2 mt-0.5 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SimpleTable({ headers, rows }) {
  if (!headers || !rows) return null;
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="min-w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((h, i) => (
              <th key={i} className="px-2 py-1.5 text-left font-semibold text-gray-700 border border-gray-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-2 py-1.5 border border-gray-200 text-gray-700">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DosingCards({ dosingArray }) {
  if (!dosingArray?.length) return null;
  return (
    <div className="space-y-2">
      {dosingArray.map((d, i) => (
        <div key={i} className="bg-white border border-green-200 rounded-lg p-3">
          {d.indication && <p className="text-xs font-bold text-green-800 uppercase mb-1">{d.indication}</p>}
          {d.demographic && <p className="text-xs text-gray-500 mb-2">👥 {d.demographic}</p>}
          <div className="grid grid-cols-2 gap-1 text-sm">
            {d.route && <div><span className="text-gray-500 text-xs">Route: </span><span className="font-medium">{d.route}</span></div>}
            {d.initial && <div><span className="text-gray-500 text-xs">Initial: </span><span className="font-bold text-green-800">{d.initial}</span></div>}
            {d.repeat && <div><span className="text-gray-500 text-xs">Repeat: </span><span className="font-medium">{d.repeat}</span></div>}
            {d.max && <div><span className="text-gray-500 text-xs">Max: </span><span className="font-medium">{d.max}</span></div>}
          </div>
          {d.weightTable && (
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-600 mb-1">Paediatric Doses (15 mg/kg):</p>
              <div className="overflow-x-auto">
                <table className="text-xs border-collapse min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-2 py-1 border border-gray-200 text-left">Weight</th>
                      <th className="px-2 py-1 border border-gray-200 text-left">Age</th>
                      <th className="px-2 py-1 border border-gray-200 text-left">Dose</th>
                      <th className="px-2 py-1 border border-gray-200 text-left">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.weightTable.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-2 py-1 border border-gray-200">{row.weight}</td>
                        <td className="px-2 py-1 border border-gray-200">{row.age}</td>
                        <td className="px-2 py-1 border border-gray-200 font-medium">{row.dose}</td>
                        <td className="px-2 py-1 border border-gray-200">{row.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Humanise a camelCase content key, e.g. "primarySurvey" → "Primary Survey".
// Whole-key clinical acronyms are upper-cased ("cpr" → "CPR", "rosc" → "ROSC").
const KEY_ACRONYMS = new Set(['cpr', 'rosc', 'aed', 'gcs', 'avpu', 'dolors', 'copd', 'bgl', 'gtn', 'ed']);
function humanizeKey(k) {
  if (KEY_ACRONYMS.has(k.toLowerCase())) return k.toUpperCase();
  return k.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();
}

// Generic recursive renderer for arbitrary content values. Shared by the quick-view
// fallback and the detailed-view overlay so every content shape renders real content
// instead of an empty placeholder.
function renderValue(val, depth = 0) {
  if (val === null || val === undefined) return null;
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
    return <span className="text-sm text-gray-700">{String(val)}</span>;
  }
  if (Array.isArray(val)) {
    return (
      <ul className="space-y-1 ml-2">
        {val.map((item, i) => (
          <li key={i} className="flex items-start text-sm text-gray-700">
            <span className="text-gray-400 mr-2 flex-shrink-0">•</span>
            {item && typeof item === 'object' ? renderValue(item, depth + 1) : String(item)}
          </li>
        ))}
      </ul>
    );
  }
  if (typeof val === 'object') {
    // Render { headers, rows } shapes as a real table
    if (Array.isArray(val.headers) && Array.isArray(val.rows)) {
      return <SimpleTable headers={val.headers} rows={val.rows} />;
    }
    return (
      <div className={`space-y-2 ${depth > 0 ? 'ml-3 pl-3 border-l-2 border-gray-200' : ''}`}>
        {Object.entries(val).map(([k, v]) => (
          <div key={k}>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{humanizeKey(k)}</p>
            {renderValue(v, depth + 1)}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// Renders quick view for a generic protocol
function QuickProtocolContent({ proto }) {
  const c = proto.content || {};

  // Medication protocol
  if (c.indications && c.dosing) {
    return (
      <>
        {c.adverseEffects?.length > 0 && (
          <QuickSection title="⚠️ Adverse Effects / Warnings" color="#dc2626">
            <BulletList items={c.adverseEffects} />
          </QuickSection>
        )}
        <QuickSection title="Indications" color="#2563eb">
          <BulletList items={c.indications} />
        </QuickSection>
        {c.contraindications?.length > 0 && (
          <QuickSection title="Contraindications" color="#dc2626">
            <BulletList items={c.contraindications} />
          </QuickSection>
        )}
        <QuickSection title="Dosing" color="#16a34a">
          <DosingCards dosingArray={c.dosing} />
        </QuickSection>
        {c.precautions?.length > 0 && (
          <QuickSection title="Precautions" color="#d97706">
            <BulletList items={c.precautions} />
          </QuickSection>
        )}
        {c.pregnancy && (
          <QuickSection title="Pregnancy / Postpartum" color="#db2777">
            <p className="text-sm text-gray-700">{c.pregnancy}</p>
          </QuickSection>
        )}
      </>
    );
  }

  // Condition with management steps
  if (c.management) {
    const mgmtItems = Array.isArray(c.management) ? c.management : Object.values(c.management).flat();
    return (
      <>
        {c.recognition && (
          <QuickSection title="Recognition" color="#7c3aed">
            {c.rash ? (
              <div className="space-y-1">
                {Object.entries(c.rash).map(([k, v]) => (
                  <p key={k} className="text-sm"><span className="font-bold">{k}:</span> {v}</p>
                ))}
              </div>
            ) : Array.isArray(c.recognition) ? (
              <BulletList items={c.recognition} />
            ) : (
              <p className="text-sm text-gray-700">{c.recognition}</p>
            )}
          </QuickSection>
        )}
        <QuickSection title="Management" color="#16a34a">
          <BulletList items={mgmtItems} />
        </QuickSection>
        {c.dosing && (
          <QuickSection title="Dosing" color="#2563eb">
            <DosingCards dosingArray={c.dosing} />
          </QuickSection>
        )}
        {c.notes && (
          <QuickSection title="Notes" color="#6b7280">
            <BulletList items={Array.isArray(c.notes) ? c.notes : [c.notes]} />
          </QuickSection>
        )}
      </>
    );
  }

  // Clinical flags (red / yellow escalation criteria)
  if (c.redFlags || c.yellowFlags) {
    const renderFlagGroup = (flags) =>
      Array.isArray(flags) ? (
        <BulletList items={flags} />
      ) : (
        <div className="space-y-2">
          {Object.entries(flags).map(([k, v]) => (
            <div key={k}>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                {k.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <BulletList items={v} />
            </div>
          ))}
        </div>
      );
    return (
      <>
        {c.redFlags && (
          <QuickSection title="🔴 Red Flags" color="#dc2626">
            {c.definition?.red && <p className="text-sm text-gray-700 mb-2">{c.definition.red}</p>}
            {renderFlagGroup(c.redFlags)}
          </QuickSection>
        )}
        {c.yellowFlags && (
          <QuickSection title="🟡 Yellow Flags" color="#d97706">
            {c.definition?.yellow && <p className="text-sm text-gray-700 mb-2">{c.definition.yellow}</p>}
            {renderFlagGroup(c.yellowFlags)}
          </QuickSection>
        )}
      </>
    );
  }

  // Assessment with table
  if (c.table) {
    return (
      <>
        {c.definition && (
          <QuickSection title="Definition" color="#7c3aed">
            <p className="text-sm text-gray-700">{c.definition}</p>
          </QuickSection>
        )}
        <QuickSection title="Reference Values" color="#2563eb">
          <SimpleTable headers={c.table.headers} rows={c.table.rows} />
        </QuickSection>
        {c.notes && (
          <QuickSection title="Notes" color="#6b7280">
            <BulletList items={c.notes} />
          </QuickSection>
        )}
      </>
    );
  }

  // Steps-based (clinical approach)
  if (c.steps) {
    return (
      <QuickSection title="Steps" color="#2563eb">
        <div className="space-y-2">
          {c.steps.map((step, i) => (
            <div key={i} className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{step.label}</p>
                {step.detail && <p className="text-xs text-gray-500">{step.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </QuickSection>
    );
  }

  // Fallback: render every content section generically so no protocol shows an
  // empty card. (Covers bespoke shapes like primarySurvey, flowchart, ageGroups, …)
  const sections = Object.entries(c);
  if (sections.length === 0) {
    return (
      <QuickSection title="Content" color="#6b7280">
        <p className="text-xs text-gray-500 italic">No quick-view content for this protocol.</p>
      </QuickSection>
    );
  }
  return (
    <>
      {sections.map(([section, value]) => (
        <QuickSection key={section} title={humanizeKey(section)} color="#6b7280">
          {renderValue(value)}
        </QuickSection>
      ))}
    </>
  );
}

// ─── Main ProtocolView component ──────────────────────────────────────────────

export function ProtocolView({ proto, userLevel, onBack }) {
  const [showDetailed, setShowDetailed] = useState(false);

  const levelConfig = PRACTICE_LEVELS[proto.level] || PRACTICE_LEVELS.FR;
  const isReference = !proto.universal && (
    !['CB', 'FR', 'SR'].includes(proto.level) ||
    (userLevel === 'CB' && proto.level !== 'CB') ||
    (userLevel === 'FR' && proto.level === 'SR'));

  return (
    <div className="flex flex-col h-full">
      {/* FIXED HEADER — does not scroll */}
      <div
        className="flex-shrink-0 px-4 py-3 flex items-center justify-between"
        style={{ background: levelConfig.headerGradient }}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <button
            onClick={onBack}
            className="text-white opacity-90 hover:opacity-100 flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-white font-bold text-base leading-tight truncate">{proto.title}</h2>
            <p className="text-white text-xs opacity-75">Level: {proto.level}</p>
          </div>
        </div>
        {/* 📖 Detailed view button — ALWAYS VISIBLE IN HEADER */}
        <button
          onClick={() => setShowDetailed(true)}
          className="ml-3 flex-shrink-0 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-2 transition-all"
          title="Open detailed view"
        >
          <BookOpen className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Reference banner */}
      {isReference && (
        <div className="flex-shrink-0 bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center space-x-2">
          <span className="text-amber-600 text-sm">ℹ️</span>
          <p className="text-amber-700 text-xs font-medium">Reference Only — not in your direct scope</p>
        </div>
      )}

      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-3">
        {proto.summary && (
          <p className="text-sm text-gray-500 italic mb-3 px-1">{proto.summary}</p>
        )}
        <QuickProtocolContent proto={proto} />
      </div>

      {/* DETAILED VIEW OVERLAY */}
      {showDetailed && (
        <DetailedViewOverlay proto={proto} onClose={() => setShowDetailed(false)} />
      )}
    </div>
  );
}

// ─── Detailed View Overlay ────────────────────────────────────────────────────

function DetailedViewOverlay({ proto, onClose }) {
  const c = proto.content || {};

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Detailed header */}
      <div className="flex-shrink-0 bg-gray-900 px-4 py-3 flex items-center space-x-3">
        <button onClick={onClose} className="text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-base truncate">{proto.title}</h2>
          <p className="text-gray-400 text-xs">Full protocol detail</p>
        </div>
        <BookOpen className="w-5 h-5 text-gray-300 flex-shrink-0" />
      </div>

      {/* Detailed scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {Object.entries(c).map(([section, value]) => (
          <div key={section} className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
              {humanizeKey(section)}
            </h3>
            {renderValue(value)}
          </div>
        ))}
      </div>
    </div>
  );
}
