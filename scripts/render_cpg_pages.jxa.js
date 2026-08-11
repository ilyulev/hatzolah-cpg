// Render every page of the CPG PDF to PNG, so pages can be checked VISUALLY.
//
// Why this exists: the CPG draws flowcharts, diagrams and scales as graphics.
// pdf.js text extraction silently drops them, leaving a blank gap - which is how
// the Paediatric Assessment Triangle and the Wong-Baker scale ended up missing
// (and, worse, back-filled with wrong wording). Reading the rendered page is the
// only reliable way to audit those.
//
// Uses macOS PDFKit through JXA, so it needs no dependency (poppler/pdftoppm is
// not installed here). Not Node - run it with osascript:
//   pnpm render-pages
//   osascript -l JavaScript scripts/render_cpg_pages.jxa.js <pdf> <outDir> <scale>
// Output (gitignored, ~29 MB): scripts/output/pages/pNNN.png
ObjC.import('Foundation'); ObjC.import('AppKit'); ObjC.import('Quartz');
function run(argv) {
  const [pdfPath, outDir, scaleStr] = argv;
  const scale = parseFloat(scaleStr || '2');
  const doc = $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath($(pdfPath)));
  if (!doc.js) throw new Error('could not open PDF: ' + pdfPath);
  const count = doc.pageCount;
  $.NSFileManager.defaultManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError($(outDir), true, $(), null);
  const box = $.kPDFDisplayBoxMediaBox;
  for (let i = 0; i < count; i++) {
    const page = doc.pageAtIndex(i);
    const b = page.boundsForBox(box);
    const img = page.thumbnailOfSizeForBox($.NSMakeSize(Math.round(b.size.width*scale), Math.round(b.size.height*scale)), box);
    const rep = $.NSBitmapImageRep.imageRepWithData(img.TIFFRepresentation);
    const png = rep.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $.NSDictionary.dictionary);
    png.writeToFileAtomically($(`${outDir}/p${String(i+1).padStart(3,'0')}.png`), true);
  }
  return `rendered ${count} pages to ${outDir}`;
}
