/**
 * ProtocolView — fixed header with 📖 button + scrollable quick view
 * The header does NOT scroll; the 📖 button is always accessible.
 */
import React, { useState } from 'react';
// NB: lucide-react 0.263 uses the older icon names (AlertOctagon, not OctagonAlert).
import { ArrowLeft, BookOpen, X, AlertOctagon, ArrowRight } from 'lucide-react';
import { PRACTICE_LEVELS, CATEGORY_COLORS } from '../data/contentData';

// ─── Quick View content renderers ─────────────────────────────────────────────

// `bodyClassName` lets a section tint its body (e.g. Notes uses a light red
// wash so safety caveats catch the eye rather than reading as filler).
function QuickSection({ title, color, children, bodyClassName = 'bg-white border border-gray-100', bodyStyle, id }) {
  return (
    <div id={id} className="rounded-xl overflow-hidden mb-3 scroll-mt-2">
      <div className="px-4 py-2 font-semibold text-sm" style={{ background: color + '33', color }}>
        {title}
      </div>
      <div className={`px-4 py-3 ${bodyClassName}`} style={bodyStyle}>{children}</div>
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
  // Wide reference tables scroll horizontally on phones; cells never wrap and the
  // first column stays pinned so the row label (e.g. Age) remains visible.
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="min-w-full text-xs border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className={`px-2 py-1.5 text-left font-semibold text-white border border-green-700 whitespace-nowrap bg-green-700 ${
                  i === 0 ? 'sticky left-0 z-10' : ''
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            // CPG-style green table: white / light-green alternating rows
            const stripe = ri % 2 === 0 ? 'bg-white' : 'bg-green-50';
            return (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-2 py-1.5 border border-green-200 text-gray-800 whitespace-nowrap ${stripe} ${
                      ci === 0 ? 'sticky left-0 z-10 font-medium' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
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
  return k
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Palette sampled from the v6.2 CPG PDF (fill colours + tints on the Clinical
// Approach pages): navy for structure, red for the urgent assessment phase,
// green for the framework intro. Tints are the file's own light fills.
const CPG = {
  navy: '#2d368f', navyBorder: '#2d368f2b', navyTint: '#eef0f9', rowTint: '#e6e8f4',
  red: '#eb1f27', redTint: '#fdece6', green: '#00a64f', greenTint: '#e9f4ea',
  // CPG yellow flags are #ffc000; use a darker amber for readable title text.
  amber: '#b45309', amberTint: '#fdf3d9', amberBorder: '#ffc00055',
};

// Per-section colours matching the CPG's own colour-coding. Keys are content
// section names; anything not listed uses the navy default.
const SECTION_COLORS = {
  definition: { title: CPG.green, bg: CPG.greenTint, border: '#00a64f33' },
  dangersAndSafety: { title: CPG.red, bg: CPG.redTint, border: '#eb1f2733' },
  rapidAssessment: { title: CPG.red, bg: CPG.redTint, border: '#eb1f2733' },
  primarySurvey: { title: CPG.red, bg: CPG.redTint, border: '#eb1f2733' },
  redFlags: { title: CPG.red, bg: CPG.redTint, border: '#eb1f2733' },
  yellowFlags: { title: CPG.amber, bg: CPG.amberTint, border: CPG.amberBorder },
  // p12 draws the triangle inside the green Definition block; its closing
  // "proceed immediately to the primary survey" note is highlighted red.
  assessmentTriangle: { title: CPG.green, bg: CPG.greenTint, border: '#00a64f33' },
  immediateAction: { title: CPG.red, bg: CPG.redTint, border: '#eb1f2733' },
  // The CPG's recurring red deterioration block; StopBlock already draws its own
  // red frame, so the section wrapper stays white to avoid a red-on-red muddle.
  stop: { title: CPG.red, bg: '#ffffff', border: '#eb1f2733' },
  recognition: { title: CPG.green, bg: CPG.greenTint, border: '#00a64f33' },
};
const sectionColor = (key) => SECTION_COLORS[key] || { title: CPG.navy, bg: '#ffffff', border: CPG.navyBorder };

// An array of same-shaped objects with scalar values (e.g. the DRSABC primary
// survey: {step, label, action}) reads as a table, not a repeated key/value dump.
function isUniformObjectArray(arr) {
  if (!Array.isArray(arr) || arr.length < 2) return false;
  const first = arr[0];
  if (!first || typeof first !== 'object' || Array.isArray(first)) return false;
  const keys = Object.keys(first);
  if (keys.length < 2 || keys.length > 6) return false;
  const sig = keys.join('|');
  const uniformScalar = arr.every(
    (o) =>
      o && typeof o === 'object' && !Array.isArray(o) &&
      Object.keys(o).join('|') === sig &&
      keys.every((k) => o[k] == null || typeof o[k] !== 'object')
  );
  if (!uniformScalar) return false;
  // A table only fits if at most ONE column holds long text (which wraps).
  // Two+ long columns (e.g. asthma ageGroups: mild/severe/ipratropium plans)
  // overflow badly on mobile — caller renders those as stacked record cards.
  const longCols = keys.filter((k) => arr.some((o) => String(o[k] ?? '').length > 22)).length;
  return longCols <= 1;
}

// A string array of short-key mnemonics ("S — Situation…", "A — Allergies") is a
// two-column table, same as the object-backed mnemonics (avpu/dolors/fast). The
// key must be short (≤5 non-space chars) so prose with em-dashes isn't captured.
const MNEMONIC_RE = /^(\S{1,5})\s*[—–:]\s+(.+)$/;
function asMnemonicPairs(arr) {
  if (!Array.isArray(arr) || arr.length < 2 || !arr.every((s) => typeof s === 'string')) return null;
  const pairs = arr.map((s) => s.match(MNEMONIC_RE));
  if (pairs.some((p) => !p)) return null;
  return pairs.map((p) => [p[1], p[2]]);
}

function MnemonicTable({ pairs }) {
  return (
    <div className="overflow-x-auto rounded-lg my-1" style={{ border: `1px solid ${CPG.navyBorder}` }}>
      <table className="min-w-full text-xs border-collapse">
        <tbody>
          {pairs.map(([k, v], i) => (
            <tr key={i} style={{ background: i % 2 ? CPG.rowTint : '#ffffff' }}>
              <td
                className="px-2.5 py-1.5 font-bold whitespace-nowrap align-top"
                style={{ color: CPG.navy, borderTop: `1px solid ${CPG.navyBorder}` }}
              >
                {k}
              </td>
              <td className="px-2.5 py-1.5 text-gray-800 align-top" style={{ borderTop: `1px solid ${CPG.navyBorder}` }}>
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// CPG-styled table for a uniform object array: navy header, striped rows,
// bordered container with a background so it reads as a table on any screen.
function ObjectTable({ rows }) {
  const cols = Object.keys(rows[0]);
  return (
    <div className="overflow-x-auto rounded-lg my-1" style={{ border: `1px solid ${CPG.navyBorder}` }}>
      <table className="min-w-full text-xs border-collapse">
        <thead>
          <tr>
            {cols.map((c) => (
              <th
                key={c}
                className="text-left font-semibold text-white px-2.5 py-1.5 whitespace-nowrap"
                style={{ background: CPG.navy }}
              >
                {humanizeKey(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} style={{ background: ri % 2 ? CPG.rowTint : '#ffffff' }}>
              {cols.map((c) => (
                <td key={c} className="px-2.5 py-1.5 align-top text-gray-800" style={{ borderTop: `1px solid ${CPG.navyBorder}` }}>
                  {r[c] == null ? '' : String(r[c])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Wong-Baker FACES pain scale: a horizontal 0→10 row of faces, colour-graded
// no-hurt (green) → hurts-worst (red), so it reads as a scale rather than a table.
const WB_COLORS = ['#16a34a', '#84cc16', '#eab308', '#f97316', '#ef4444', '#b91c1c'];
function WongBakerScale({ items }) {
  return (
    <div className="overflow-x-auto -mx-1 pb-1">
      <div className="flex gap-1.5 min-w-max px-1">
        {items.map((it, i) => {
          const c = WB_COLORS[Math.min(i, WB_COLORS.length - 1)];
          return (
            <div key={i} className="flex flex-col items-center rounded-lg px-2 py-2" style={{ background: `${c}1f`, width: 78 }}>
              <span className="text-3xl leading-none" aria-hidden>{it.face}</span>
              <span className="font-extrabold text-base mt-1" style={{ color: c }}>{it.score}</span>
              <span className="text-[10px] text-gray-600 text-center leading-tight mt-0.5">{it.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Paediatric Assessment Triangle (CPG p12). The CPG draws the three components
// as labels along the sides of a red triangle, with each side's signs listed
// beside it. Rotated edge labels stay, but the sign lists move to cards below —
// on a phone the CPG's around-the-triangle layout is unreadable.
function PaediatricTriangle({ sides }) {
  // Edge midpoints, nudged outward along each edge normal so the labels clear
  // the 9px stroke. Angles are atan2 of the edge vectors.
  const edgeLabel = (text, x, y, rot) => (
    <text
      x={x} y={y}
      transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}
      textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="0.6" fill={CPG.red}
    >
      {text}
    </text>
  );
  return (
    <div>
      <svg
        viewBox="0 0 320 232" className="w-full max-w-[20rem] mx-auto block" role="img"
        aria-label="Paediatric Assessment Triangle: Appearance, Work of Breathing, Circulation"
      >
        <polygon
          points="160,20 278,196 42,196"
          fill="none" stroke={CPG.red} strokeWidth="9" strokeLinejoin="round"
        />
        {edgeLabel('APPEARANCE', 91, 101, -56.2)}
        {edgeLabel('WORK OF BREATHING', 229, 101, 56.2)}
        {edgeLabel('CIRCULATION', 160, 217, 0)}
      </svg>
      <div className="mt-3 space-y-2">
        {sides.map((s) => (
          <div
            key={s.side}
            className="rounded-lg border px-3 py-2 bg-white"
            style={{ borderColor: '#eb1f2733' }}
          >
            <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: CPG.red }}>
              {s.side}
            </p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {s.signs.map((sign) => (
                <span
                  key={sign}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ color: CPG.navy, background: CPG.navyTint }}
                >
                  {sign}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Recurring CPG structures ────────────────────────────────────────────────
// The CPG repeats four shapes across dozens of protocols. Rendering them as
// plain bullet lists loses the thing that makes them work in the field: a STOP
// block reads as urgent, a rule reads as IF→THEN, a disposition reads as a
// choice between outcomes.

// Red STOP block — the CPG's deterioration safety-net.
// { trigger, actions[] }, or an array of them.
function StopBlock({ blocks }) {
  const list = Array.isArray(blocks) ? blocks : [blocks];
  return (
    <div className="space-y-2">
      {list.map((b, i) => (
        <div key={i} className="rounded-lg border-2 px-3 py-2.5" style={{ borderColor: CPG.red, background: CPG.redTint }}>
          <div className="flex items-center gap-1.5 mb-1">
            <AlertOctagon className="w-4 h-4 flex-shrink-0" style={{ color: CPG.red }} />
            <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: CPG.red }}>Stop</span>
          </div>
          {b.trigger && <p className="text-sm font-bold text-gray-900 mb-1.5">{b.trigger}</p>}
          {Array.isArray(b.actions) && (
            <ul className="space-y-1">
              {b.actions.map((a, j) => (
                <li key={j} className="flex items-start text-sm text-gray-800">
                  <span className="mr-2 flex-shrink-0 font-bold" style={{ color: CPG.red }}>›</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

// IF → THEN rule rows. The CPG uses these for conditional actions; a flat
// bullet loses which half is the condition.
function RuleRows({ rules }) {
  return (
    <div className="space-y-1.5">
      {rules.map((r, i) => (
        <div key={i} className="rounded-lg px-3 py-2" style={{ background: CPG.navyTint }}>
          <div className="flex items-start gap-1.5">
            <span className="text-[10px] font-extrabold uppercase mt-0.5 flex-shrink-0" style={{ color: CPG.navy }}>If</span>
            <span className="text-sm font-semibold text-gray-900">{r.if}</span>
          </div>
          <div className="flex items-start gap-1.5 mt-1">
            <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: CPG.green }} />
            <span className="text-sm text-gray-800">{r.then}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Disposition — a choice between mutually exclusive outcomes (e.g. Falls:
// hospital transport / Virtual ED / home care). Each outcome is its own card so
// the responder can see which arm they are in.
function DispositionCards({ node }) {
  return (
    <div className="space-y-2">
      {node.question && <p className="text-sm font-semibold text-gray-900">{node.question}</p>}
      {(node.options || []).map((o, i) => (
        <div key={i} className="rounded-lg border px-3 py-2 bg-white" style={{ borderColor: CPG.navyBorder }}>
          <p className="text-sm font-extrabold" style={{ color: CPG.navy }}>{o.label}</p>
          {Array.isArray(o.criteria) && o.criteria.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {o.criteria.map((c, j) => (
                <li key={j} className="flex items-start text-sm text-gray-700">
                  <span className="text-gray-400 mr-2 flex-shrink-0">•</span>{c}
                </li>
              ))}
            </ul>
          )}
          {o.action && (
            <p className="mt-1.5 text-sm font-semibold rounded px-2 py-1" style={{ background: CPG.greenTint, color: '#065f46' }}>
              {o.action}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Age-band protocols (Asthma has four). Showing every band at once buries the
// one in use, so bands become tabs and only the selected band renders.
function AgeBandTabs({ bands }) {
  const [active, setActive] = useState(0);
  const band = bands[active] || {};
  const { label, ...rest } = band;
  return (
    <div>
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
        {bands.map((b, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`text-xs font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              i === active ? 'text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
            style={i === active ? { background: CPG.navy } : undefined}
          >
            {b.label || `Band ${i + 1}`}
          </button>
        ))}
      </div>
      <div className="mt-2 space-y-2">
        {Object.entries(rest).map(([k, v]) => (
          <div key={k}>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{humanizeKey(k)}</p>
            {renderValue(v, 1)}
          </div>
        ))}
      </div>
    </div>
  );
}

// Stable DOM id for a top-level content section, so workflow branch chips can
// jump to it. Only one protocol renders at a time, so the key alone is unique.
const sectionAnchor = (key) => `sec-${key}`;
function scrollToSection(key, e) {
  const id = sectionAnchor(key);
  // The quick view and the detailed overlay both carry these anchors, so scope
  // the lookup to the scroll container the click came from (not getElementById,
  // which would grab the hidden quick view underneath the overlay).
  const src = e && (e.target || e.currentTarget);
  const scope = (src && src.closest && src.closest('.overflow-y-auto')) || document;
  const el = scope.querySelector(`[id="${id}"]`) || document.getElementById(id);
  if (!el) return;
  // Prefer a native smooth scroll, but some containers/reduced-motion settings
  // ignore it — so also nudge the container directly as a reliable fallback.
  el.scrollIntoView({ block: 'start' });
  const box = el.closest('.overflow-y-auto');
  if (box) box.scrollTop = el.offsetTop - box.offsetTop - 8;
  el.style.transition = 'box-shadow .3s';
  el.style.boxShadow = `0 0 0 2px ${CPG.navy}`;
  setTimeout(() => { el.style.boxShadow = ''; }, 1400);
}

// A decision point: { question, branches:[{condition, goTo, label}] } → tappable
// chips that scroll to the target section (the "workflow arrows", as anchor links).
function BranchChips({ node }) {
  return (
    <div>
      {node.question && <p className="text-sm text-gray-700 mb-2">{node.question}</p>}
      <div className="flex flex-wrap gap-2">
        {node.branches.map((b, i) => {
          const sameLabel = !b.condition || b.condition.toLowerCase() === b.label.toLowerCase();
          return (
            <button
              key={i}
              onClick={(e) => scrollToSection(b.goTo, e)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white active:scale-95 transition-transform"
              style={{ background: CPG.navy }}
            >
              {!sameLabel && <span className="uppercase tracking-wide">{b.condition}</span>}
              <span aria-hidden>→</span>
              <span>{b.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
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
    // Dosing arrays get the readable DosingCards (as in the quick view) rather
    // than a cramped 6-column generic table.
    if (val.length && val.every((o) => o && typeof o === 'object' && !Array.isArray(o) && 'route' in o && ('initial' in o || 'dose' in o))) {
      return <DosingCards dosingArray={val} />;
    }
    // Faces pain scale (Wong-Baker): objects with score + face → visual scale
    if (val.length && val.every((o) => o && typeof o === 'object' && 'score' in o && 'face' in o)) {
      return <WongBakerScale items={val} />;
    }
    // Paediatric Assessment Triangle: objects with side + signs → triangle diagram
    if (val.length && val.every((o) => o && typeof o === 'object' && 'side' in o && Array.isArray(o.signs))) {
      return <PaediatricTriangle sides={val} />;
    }
    // IF → THEN rule rows
    if (val.length && val.every((o) => o && typeof o === 'object' && 'if' in o && 'then' in o)) {
      return <RuleRows rules={val} />;
    }
    // Several STOP blocks in one section
    if (val.length && val.every((o) => o && typeof o === 'object' && 'trigger' in o && Array.isArray(o.actions))) {
      return <StopBlock blocks={val} />;
    }
    // Age bands / sub-protocols: every entry labelled, with its own sections
    if (val.length > 1 && val.every((o) => o && typeof o === 'object' && !Array.isArray(o)
        && typeof o.label === 'string' && Object.keys(o).length > 1)) {
      return <AgeBandTabs bands={val} />;
    }
    if (isUniformObjectArray(val)) return <ObjectTable rows={val} />;
    const mnemonic = asMnemonicPairs(val);
    if (mnemonic) return <MnemonicTable pairs={mnemonic} />;
    // Array of objects that isn't a clean table (long text, nested, or mixed
    // shapes) → one tinted record card each, so age-band plans etc. stay legible.
    if (val.length && val.every((o) => o && typeof o === 'object' && !Array.isArray(o))) {
      return (
        <div className="space-y-2">
          {val.map((o, i) => (
            <div key={i} className="rounded-lg px-3 py-2" style={{ background: CPG.rowTint }}>
              {renderValue(o, depth + 1)}
            </div>
          ))}
        </div>
      );
    }
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
    // Decision point with workflow branches → jump-link chips
    if (Array.isArray(val.branches)) {
      return <BranchChips node={val} />;
    }
    // Single red STOP block
    if ('trigger' in val && Array.isArray(val.actions)) {
      return <StopBlock blocks={val} />;
    }
    // Disposition: a choice between mutually exclusive outcomes
    if (Array.isArray(val.options) && val.options.some((o) => o && typeof o === 'object' && 'label' in o)) {
      return <DispositionCards node={val} />;
    }
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
          <QuickSection title="Notes" color="#dc2626" bodyClassName="bg-red-50 border border-red-200">
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
          <QuickSection title="🔴 Red Flags" color={CPG.red} bodyStyle={{ background: CPG.redTint }}>
            {c.definition?.red && <p className="text-sm text-gray-700 mb-2">{c.definition.red}</p>}
            {renderFlagGroup(c.redFlags)}
          </QuickSection>
        )}
        {c.yellowFlags && (
          <QuickSection title="🟡 Yellow Flags" color={CPG.amber} bodyStyle={{ background: CPG.amberTint }}>
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
          <QuickSection title="Notes" color="#dc2626" bodyClassName="bg-red-50 border border-red-200">
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
  // '_'-prefixed keys are metadata (e.g. _flowchart), not visible sections.
  const sections = Object.entries(c).filter(([k]) => !k.startsWith('_'));
  if (sections.length === 0) {
    return (
      <QuickSection title="Content" color="#6b7280">
        <p className="text-xs text-gray-500 italic">No quick-view content for this protocol.</p>
      </QuickSection>
    );
  }
  return (
    <>
      {sections.map(([section, value]) => {
        const col = sectionColor(section);
        return (
          <QuickSection
            key={section}
            id={sectionAnchor(section)}
            title={humanizeKey(section)}
            color={col.title}
            bodyStyle={{ background: col.bg }}
          >
            {renderValue(value)}
          </QuickSection>
        );
      })}
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

// ─── Workflow flowcharts (SVG) ────────────────────────────────────────────────
// Clickable box with wrapped text (foreignObject handles wrapping cleanly).
function FBox({ x, y, w, h, label, sub, fill, stroke, textColor = '#ffffff', onClick }) {
  return (
    <g onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke || fill} strokeWidth="1.5" />
      <foreignObject x={x} y={y} width={w} height={h}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{ width: `${w}px`, height: `${h}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: textColor, fontSize: '11px', fontWeight: 700, textAlign: 'center', lineHeight: 1.12, padding: '2px 5px', fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box' }}
        >
          <span>{label}</span>
          {sub && <span style={{ fontSize: '9px', fontWeight: 400, opacity: 0.85, marginTop: '1px' }}>{sub}</span>}
        </div>
      </foreignObject>
    </g>
  );
}

// The Clinical Approach workflow. Process/destination boxes are tappable and
// scroll the detail view to that section via onNavigate.
function ClinicalApproachFlowchart({ onNavigate }) {
  const go = (k) => (e) => onNavigate && onNavigate(k, e);
  const line = (x1, y1, x2, y2) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ca-arrow)" />
  );
  return (
    <svg viewBox="0 0 340 445" width="100%" style={{ maxWidth: 360, display: 'block', margin: '0 auto' }} role="img" aria-label="Clinical Approach workflow">
      <defs>
        <marker id="ca-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      {line(170, 46, 170, 63)}
      {line(140, 110, 92, 148)}
      {line(200, 110, 250, 148)}
      {line(87, 192, 160, 228)}
      {line(252, 192, 180, 228)}
      {line(170, 270, 170, 287)}
      {line(140, 328, 88, 366)}
      {line(200, 328, 252, 366)}

      <text x="112" y="132" fontSize="9" fontWeight="700" fill={CPG.red}>UNWELL</text>
      <text x="214" y="132" fontSize="9" fontWeight="700" fill={CPG.navy}>WELL</text>

      <FBox x={95} y={8} w={150} h={38} label="Dangers & Safety" sub="PPE · risk · PAT" fill={CPG.red} />
      <FBox x={60} y={63} w={220} h={47} label="Rapid Assessment (PAT)" sub="WELL or UNWELL?" fill="#ffffff" stroke={CPG.navy} textColor={CPG.navy} />
      <FBox x={15} y={150} w={145} h={42} label="Primary Survey" sub="R S A B C D E" fill={CPG.navy} onClick={go('primarySurvey')} />
      <FBox x={180} y={150} w={145} h={42} label="Responder Action" fill={CPG.navy} onClick={go('responderAction')} />
      <FBox x={95} y={230} w={150} h={40} label="Assess" sub="SAMPLE · tools · equip" fill={CPG.navy} onClick={go('assess')} />
      <FBox x={95} y={287} w={150} h={40} label="Pause & Plan" fill={CPG.navy} onClick={go('pauseAndPlan')} />
      <FBox x={10} y={367} w={152} h={50} label="Treatment & AV Attendance" fill="#0f766e" onClick={go('treatmentAndAvAttendance')} />
      <FBox x={178} y={367} w={152} h={50} label="Treat & Refer" fill="#0f766e" onClick={go('treatAndRefer')} />
    </svg>
  );
}

const FLOWCHARTS = { clinicalApproach: ClinicalApproachFlowchart };

// Caveat sections always render last, matching the quick view's order — the raw
// data order varies (e.g. vital-signs stores notes before its table).
const TRAILING_KEYS = new Set(['notes', 'note']);

function DetailedViewOverlay({ proto, onClose }) {
  const [showFlow, setShowFlow] = useState(false);
  const c = proto.content || {};
  const Flowchart = c._flowchart ? FLOWCHARTS[c._flowchart] : null;
  const sections = Object.entries(c)
    .filter(([k]) => !k.startsWith('_')) // metadata keys (e.g. _flowchart) aren't sections
    .sort((a, b) => (TRAILING_KEYS.has(a[0]) ? 1 : 0) - (TRAILING_KEYS.has(b[0]) ? 1 : 0));

  // z-40 (below BottomNav's z-50) so the tab bar stays visible and usable here.
  return (
    <div className="fixed inset-0 bg-white z-40 flex flex-col">
      {/* Detailed header */}
      <div className="flex-shrink-0 bg-gray-900 px-4 py-3 flex items-center space-x-3">
        <button onClick={onClose} className="text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-base truncate">{proto.title}</h2>
          <p className="text-gray-400 text-xs">Full protocol detail</p>
        </div>
        {/* Same position as the opener in ProtocolView's header — the 📖 button
            toggles the detailed view both ways (users tap where they opened it). */}
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-2 transition-all"
          title="Back to quick view"
        >
          <BookOpen className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Detailed scrollable content — pb clears the BottomNav overlaying us */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 bg-gray-50 space-y-4">
        {Flowchart && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <button
              onClick={() => setShowFlow((v) => !v)}
              className="w-full flex items-center justify-between font-bold text-sm uppercase tracking-wide"
              style={{ color: CPG.navy }}
            >
              <span>Workflow diagram</span>
              <span className="text-xs font-medium normal-case" style={{ color: CPG.navy }}>
                {showFlow ? 'Hide ▲' : 'Show ▼'}
              </span>
            </button>
            {showFlow && (
              <div className="mt-3 overflow-x-auto">
                <Flowchart onNavigate={scrollToSection} />
              </div>
            )}
          </div>
        )}
        {sections.map(([section, value]) => {
          const col = sectionColor(section);
          return (
            <div
              key={section}
              id={sectionAnchor(section)}
              className="rounded-xl shadow-sm p-4 scroll-mt-2"
              style={{ background: col.bg, border: `1px solid ${col.border}` }}
            >
              <h3
                className="font-bold text-sm uppercase tracking-wide mb-3 pb-2 border-b"
                style={{ color: col.title, borderColor: col.border }}
              >
                {humanizeKey(section)}
              </h3>
              {renderValue(value)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
