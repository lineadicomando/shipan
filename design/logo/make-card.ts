/**
 * Cuts the card a link to this site is shown as, when somebody pastes the
 * address somewhere.
 *
 *     npm run card
 *
 * **One card and not one per vernacular, and that is the i18n rule rather
 * than a saving.** A card with a sentence on it would be a sentence living
 * outside the catalogs — the thing `docs/i18n.md` forbids outright, and the
 * reason the manifest is served from a route instead of shipped as a file.
 * What is on this one is a mark, a name, a reading, and the names of the six
 * arts. Every one of those is a *name*: 奇門遁甲 is 奇門遁甲 to an English
 * reader and to an Italian one, so nothing here has a second version waiting
 * to be written, and a third vernacular costs this file nothing at all.
 *
 * It is also the honest card. A social preview is read in a second by
 * somebody deciding whether to follow a link, and six names they can look up
 * says more about what is behind it than a line of prose that had to be short
 * enough to fit.
 *
 * **System fonts, unlike `make-icons.ts`.** That script refuses them because
 * an icon is an outline and asking for a font would make the output depend on
 * the machine. This has text on it and cannot; `@shipan/plate` has the same
 * need and answers it the same way, and the Dockerfile installs
 * `fonts-noto-cjk` for exactly this. The output is committed, so the
 * dependency is on whoever cuts a new card and never on a build.
 */
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const STATIC = fileURLToPath(new URL('../../apps/web/static/', import.meta.url));

/**
 * 1200×630 — the size every consumer of these agrees on, and the aspect ratio
 * a `summary_large_image` card is cropped to. Anything else is cropped by
 * somebody, and the crop is never the same twice.
 */
const WIDTH = 1200;
const HEIGHT = 630;

/** The site's own light ground and ink. Same values as `app.css`. */
const GROUND = '#fdfcfa';
const INK = '#1a1a1a';
const FAINT = '#5a564c';
const CINNABAR = '#B4322B';

/**
 * The six arts, in the order the consultation offers them — which is the span
 * of what each board is about, and the order the nav and `INSTRUMENTS` are
 * already in. A card that dealt them out differently would be a third
 * arrangement of one list.
 */
const ARTS = [
  { hanzi: '奇門遁甲', reading: 'qímén dùnjiǎ' },
  { hanzi: '大六壬', reading: 'dà liùrén' },
  { hanzi: '太乙神數', reading: 'tàiyǐ shénshù' },
  { hanzi: '七政四餘', reading: 'qīzhèng sìyú' },
  { hanzi: '紫微斗數', reading: 'zǐwēi dǒushù' },
  { hanzi: '八字', reading: 'bāzì' },
];

/**
 * The seal, lifted out of its own file rather than copied into this one.
 *
 * `seal.svg` is a complete document with its own `viewBox`; what is wanted
 * here is its contents, placed. Nesting an `<svg>` inside another is what
 * that is for, and it keeps this file with no copy of a glyph outline in it —
 * a copy that would go stale the day the mark is recut.
 */
function seal(x: number, y: number, size: number): string {
  const inner = readFileSync(HERE + 'seal.svg', 'utf8')
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '');

  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 256 256">${inner}</svg>`;
}

/** A row of names, each over its reading. */
function arts(y: number): string {
  // Laid on a grid rather than measured: six cells across the width the seal
  // leaves, which puts the gaps where the eye expects them without this
  // script having to know how wide a glyph is in a font it did not choose.
  const left = 96;
  const span = (WIDTH - left * 2) / ARTS.length;

  return ARTS.map(({ hanzi, reading }, index) => {
    const centre = left + span * index + span / 2;
    return [
      // Traditional forms first in the stack: 七政四餘 and 紫微斗數 are set
      // that way in every table and on every plate here, and a card that fell
      // through to the simplified font would be the one surface spelling two
      // of the six differently.
      `<text x="${centre}" y="${y}" text-anchor="middle" font-family="Noto Serif CJK TC, Noto Serif CJK SC, serif" font-size="34" fill="${INK}">${hanzi}</text>`,
      `<text x="${centre}" y="${y + 30}" text-anchor="middle" font-family="Noto Serif CJK TC, Georgia, serif" font-size="19" fill="${FAINT}">${reading}</text>`,
    ].join('\n  ');
  }).join('\n  ');
}

const card = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${GROUND}"/>

  ${seal(96, 118, 200)}

  <text x="336" y="212" font-family="Noto Serif CJK TC, Georgia, serif" font-size="96" fill="${INK}">shipan</text>
  <text x="340" y="272" font-family="Noto Serif CJK TC, Georgia, serif" font-size="40" fill="${FAINT}">式盤 · shìpán</text>

  <rect x="96" y="392" width="${WIDTH - 192}" height="1" fill="${CINNABAR}" opacity="0.45"/>

  ${arts(462)}
</svg>
`;

const renderer = new Resvg(card, {
  fitTo: { mode: 'width', value: WIDTH },
  // Text, so unlike the icons this needs the fonts on the machine. See above.
  font: { loadSystemFonts: true },
});

writeFileSync(STATIC + 'og.png', renderer.render().asPng());
console.log(`og.png  ${WIDTH}×${HEIGHT}`);
