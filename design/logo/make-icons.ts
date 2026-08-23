/**
 * Rasterises the marks into the icons an installed copy is drawn with.
 *
 *     npm run icons
 *
 * The marks themselves are cut by `make-marks.py`, which needs a font that is
 * not in this repository. This does not: `mark.svg` and `mark-maskable.svg`
 * carry the glyph as an embedded outline, so rasterising them asks nothing of
 * the machine but a renderer — the one `@shipan/plate` already draws boards
 * with, which is why no dependency is added for this.
 *
 * **Two shapes, and the difference is the mask.** A launcher may cut an icon
 * to a circle, a squircle or a rounded square, and what it guarantees to keep
 * is only the circle 80% of the width across. `mark.svg` has a border at
 * 8/256 and a glyph that all but fills the field: masked, it loses its border
 * on every side and its strokes at the corners. `mark-maskable.svg` is the
 * same outline at the same uniform scale with the field bled to the edge and
 * the glyph brought inside that circle, so the mask cuts ground and never
 * character. Both are declared in the manifest, each with the `purpose` it is
 * for, because a maskable icon shown unmasked is a small glyph in a large
 * field and the plain one is what a browser tab and a bookmark want.
 *
 * `apple-touch-icon.png` is the plain mark: iOS applies no mask and puts its
 * own rounded rectangle over whatever it is given.
 */
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const STATIC = fileURLToPath(new URL('../../apps/web/static/', import.meta.url));

/** Each icon: the mark it is cut from, the file it lands in, and its size. */
const ICONS = [
  { mark: 'mark.svg', file: 'icon-192.png', width: 192 },
  { mark: 'mark.svg', file: 'icon-512.png', width: 512 },
  // 180 is what iOS asks for, and it is the only size it asks for.
  { mark: 'mark.svg', file: 'apple-touch-icon.png', width: 180 },
  { mark: 'mark-maskable.svg', file: 'icon-maskable-512.png', width: 512 },
] as const;

for (const { mark, file, width } of ICONS) {
  const svg = readFileSync(HERE + mark, 'utf8');
  // No system fonts: the glyph is an outline, and asking for them would make
  // the output depend on the machine it was cut on.
  const renderer = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: false },
  });
  writeFileSync(STATIC + file, renderer.render().asPng());
  console.log(`${file}  ${width}×${width}  from ${mark}`);
}
