// Build a ground-truth page map for every page of the v6.2 CPG.
// Each content page carries a footer "SECTION TITLE, <pagenum>" and a large
// title at the top; both are more reliable than the TOC. Also records a rough
// body-text word count and the largest vertical gap between text lines (a big
// gap means a graphic occupies that space — the failure mode that corrupted
// the Paediatric Assessment Triangle).
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse-fork');

const PDF = './source/Compiled_v6_2.pdf';
const OUT = process.argv[2] || './scripts/output/pagemap.json';
const GLYPHS = { '': '↑', '': '↓' };
const clean = (s) => s.replace(/[]/g, (m) => GLYPHS[m]);

const pages = {};
let n = 0;
await pdf(fs.readFileSync(PDF), {
  pagerender: (pd) => {
    n += 1; const me = n;
    return pd.getTextContent().then((tc) => {
      const items = tc.items.map((it) => ({
        s: clean(it.str),
        x: Math.round(it.transform[4]),
        y: Math.round(it.transform[5]),
        size: +Math.hypot(it.transform[2], it.transform[3]).toFixed(1),
      })).filter((it) => it.s.trim() !== '');

      // lines, top -> bottom
      const byY = {};
      for (const it of items) { const k = Math.round(it.y / 3) * 3; (byY[k] = byY[k] || []).push(it); }
      const lines = Object.entries(byY)
        .map(([y, its]) => ({
          y: +y,
          text: its.sort((a, b) => a.x - b.x).map((i) => i.s).join(' ').replace(/\s+/g, ' ').trim(),
          size: Math.max(...its.map((i) => i.size)),
        }))
        .sort((a, b) => b.y - a.y);

      const footer = lines.find((l) => l.y < 55)?.text || '';
      const m = footer.match(/^(.*),\s*(\d+)\s*$/);
      const title = lines.find((l) => l.size >= 17 && l.y > 600)?.text || '';

      // biggest vertical gap between consecutive body lines (excl. footer)
      const body = lines.filter((l) => l.y >= 55);
      let maxGap = 0, gapAt = null;
      for (let i = 0; i < body.length - 1; i++) {
        const g = body[i].y - body[i + 1].y;
        if (g > maxGap) { maxGap = g; gapAt = [body[i + 1].y, body[i].y]; }
      }

      pages[me] = {
        page: me,
        footerTitle: m ? m[1].trim() : null,
        footerPageNum: m ? +m[2] : null,
        title,
        words: body.map((l) => l.text).join(' ').split(/\s+/).filter(Boolean).length,
        maxTextGap: maxGap,
        gapAt,
      };
      return '';
    });
  },
});

fs.mkdirSync('./scripts/output', { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(pages, null, 2));

// group consecutive pages by footer title
const groups = [];
for (let p = 1; p <= n; p++) {
  const t = pages[p].footerTitle;
  const last = groups[groups.length - 1];
  if (last && last.title === t) last.end = p;
  else groups.push({ title: t, start: p, end: p });
}
console.log(`pages: ${n}   -> ${OUT}\n`);
console.log('page-range  | maxGap | words | footer title');
for (const g of groups) {
  const range = g.start === g.end ? `${g.start}` : `${g.start}-${g.end}`;
  const gaps = [];
  for (let p = g.start; p <= g.end; p++) if (pages[p].maxTextGap > 90) gaps.push(`p${p}:${Math.round(pages[p].maxTextGap)}`);
  const words = [];
  for (let p = g.start; p <= g.end; p++) words.push(pages[p].words);
  console.log(`${range.padStart(10)} | ${(gaps.join(' ') || '-').padEnd(22)} | ${words.join(',').padEnd(18)} | ${g.title}`);
}
