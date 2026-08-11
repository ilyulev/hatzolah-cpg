// Aggregate the page-audit workflow result into a prioritised markdown report.
import fs from 'fs';

const OUT = process.argv[2];
const raw = JSON.parse(fs.readFileSync(OUT, 'utf8'));
const res = raw.result || raw;
const units = res.units || [];

const sevRank = { critical: 0, high: 1, medium: 2, low: 3 };
let totC = 0, totO = 0, gfx = 0;
const byType = {};
const missingProtos = [];

for (const u of units) {
  totC += (u.confirmed || []).length;
  totO += (u.otherFindings || []).length;
  gfx += (u.graphicsMissing || []).length;
  for (const f of [...(u.confirmed || []), ...(u.otherFindings || [])]) {
    byType[f.type] = (byType[f.type] || 0) + 1;
  }
  if (u.coverage === 'missing') missingProtos.push(u);
}

const L = [];
L.push('# Hatzolah CPG v6.2 — Page-by-Page Visual Audit', '');
L.push(`Every content page (5–163) rendered as an image and compared against the app's stored`);
L.push(`content. Confirmed findings survived an independent skeptic prompted to refute them.`, '');
L.push(`- units audited: **${units.length}**`);
L.push(`- confirmed critical/high findings: **${totC}**`);
L.push(`- medium/low findings (not independently verified): **${totO}**`);
L.push(`- CPG graphics with no representation in the app: **${gfx}**`);
L.push(`- protocols entirely absent: **${missingProtos.length}**`, '');
L.push('finding types: ' + Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} (${v})`).join(', '), '');

// ranked unit table
L.push('## Units ranked by confirmed severity', '');
L.push('| unit | pages | coverage | confirmed | graphics missing |');
L.push('|---|---|---|---|---|');
const ranked = [...units].sort((a, b) => {
  const s = (u) => Math.min(...[...(u.confirmed || []).map((f) => sevRank[f.severity] ?? 9), 9]);
  const d = s(a) - s(b);
  return d !== 0 ? d : (b.confirmed || []).length - (a.confirmed || []).length;
});
for (const u of ranked) {
  const worst = (u.confirmed || []).map((f) => f.severity);
  const nC = worst.filter((x) => x === 'critical').length;
  const nH = worst.filter((x) => x === 'high').length;
  L.push(`| \`${u.unit}\` | ${u.pages} | ${u.coverage} | ${nC ? `**${nC} critical**` : ''}${nC && nH ? ', ' : ''}${nH ? `${nH} high` : ''}${!nC && !nH ? '—' : ''} | ${(u.graphicsMissing || []).length || '—'} |`);
}
L.push('');

for (const u of ranked) {
  const conf = u.confirmed || [];
  const other = u.otherFindings || [];
  const gm = u.graphicsMissing || [];
  if (!conf.length && !other.length && !gm.length) continue;
  L.push(`\n## \`${u.unit}\` — ${u.pages} · coverage: ${u.coverage}`);
  if (u.hasProposedContent) L.push('_Full replacement content was extracted by the audit agent._');
  if (gm.length) {
    L.push('', '**Graphics not represented in the app:**');
    for (const g of gm) L.push(`- ${g}`);
  }
  if (conf.length) {
    L.push('', '**Confirmed (verified) findings:**');
    for (const f of conf) {
      L.push(`\n### [${f.severity}] ${f.type}${f.page ? ` · p${f.page}` : ''} — ${f.summary}`);
      L.push(`- **CPG:** ${f.cpgSays}`);
      L.push(`- **App:** ${f.appHas}`);
      L.push(`- **Fix:** ${f.fix}`);
    }
  }
  if (other.length) {
    L.push('', '**Medium/low (unverified):**');
    for (const f of other) L.push(`- [${f.severity}] ${f.type}${f.page ? ` p${f.page}` : ''} — ${f.summary}  \n  _fix:_ ${f.fix}`);
  }
}

fs.writeFileSync('scripts/output/v6.2-page-audit.md', L.join('\n'));

// compact console digest
console.log(`units=${units.length} confirmed=${totC} other=${totO} graphicsMissing=${gfx} missingProtocols=${missingProtos.length}`);
console.log('\ntypes:', Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}=${v}`).join(' '));
console.log('\n== CRITICAL (confirmed) ==');
for (const u of units) for (const f of (u.confirmed || [])) if (f.severity === 'critical') {
  console.log(`  [${u.unit} ${f.page ? 'p' + f.page : u.pages}] ${f.summary}`);
}
console.log('\n== units with confirmed HIGH ==');
for (const u of units) {
  const n = (u.confirmed || []).filter((f) => f.severity === 'high').length;
  if (n) console.log(`  ${u.unit} (${u.pages}): ${n}`);
}
console.log('\n== missing protocols ==');
for (const u of missingProtos) console.log(`  ${u.unit} ${u.pages} proposedContent=${u.hasProposedContent}`);
console.log('\n== units with graphics missing ==');
for (const u of units) if ((u.graphicsMissing || []).length) console.log(`  ${u.unit} (${u.pages}): ${u.graphicsMissing.length}`);
