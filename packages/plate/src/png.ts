import { Resvg } from '@resvg/resvg-js';
import {
  CJK_FAMILIES,
  FONT_STACK,
  PALETTES,
  SYMBOL_FAMILIES,
  type Scheme,
} from './palette.js';
import { DEFAULT_SIZE, renderChartSvg } from './svg.js';
import type { PlateChart, PlateOptions } from './types.js';

/**
 * PNG rendering, behind its own entry point.
 *
 * `@resvg/resvg-js` is a native module. Importing it from the package index
 * would drag it into every bundle that so much as wanted an SVG, including
 * the browser's, where it cannot run at all. Anything that needs a raster
 * imports `@shipan/plate/png` and knows it is asking for a native
 * dependency.
 */

export interface PngOptions extends Omit<PlateOptions, 'scheme'> {
  /**
   * A raster cannot ask the page what it prefers, so it has to be told. There
   * is no `auto` here for that reason.
   */
  scheme?: Scheme;
  /**
   * Width in pixels. The height follows from it.
   *
   * Square, unless the drawing was asked for a list of configurations — that
   * band is written on paper the square grew downward, so the taller the list
   * the taller the raster. See `Foot`.
   */
  width?: number;
}

/**
 * Draws a chart as a PNG.
 *
 * **The glyphs are the drawing.** resvg rasterises with the fonts it finds on
 * the machine, and a machine with no Chinese font draws an empty grid: a
 * picture that looks like a chart and says nothing. Nothing about that
 * failure is visible from the calling code — the buffer is a valid PNG of the
 * right size — so it is checked for here rather than discovered by whoever
 * opens the file.
 */
export function renderChartPng(chart: PlateChart, options: PngOptions = {}): Buffer {
  assertGlyphsRender(options.captions?.readings !== undefined);
  const scheme = options.scheme ?? 'light';
  const svg = renderChartSvg(undrawn(chart), {
    ...options,
    // The stylesheet resolves to one scheme: custom properties survive
    // rasterisation, media queries do not.
    scheme,
  });

  const renderer = new Resvg(familiesByScript(inlineColours(svg, scheme)), {
    fitTo: { mode: 'width', value: options.width ?? options.size ?? DEFAULT_SIZE },
    font: { loadSystemFonts: true },
  });

  return Buffer.from(renderer.render().asPng());
}

/**
 * The chart with the trigram symbols dropped where no font can draw them.
 *
 * **The third failure of this kind is the one that must not throw.** A palace
 * with no hanzi is an empty palace and a band with no tone marks is half a
 * drawing, so those two stop the render and name the package to install. ☴ is
 * the name 巽 in the other hand and 巽 is still there: losing it costs a
 * reader a mnemonic and no information, and refusing to draw the chart at all
 * over it would be the graver answer to the smaller fault.
 *
 * Nor is it the silent failure the probes exist to prevent, which is a picture
 * that still looks like a chart with a register gone from it. Nothing goes:
 * the palace reads as it read before the symbols existed.
 *
 * `fonts-noto-cjk` alone does **not** cover U+2630 — the deployed image adds
 * `fonts-dejavu-core` for it — so this is the ordinary case on a small image
 * and not a corner of one.
 */
function undrawn(chart: PlateChart): PlateChart {
  if (symbolsRender()) return chart;
  return {
    ...chart,
    palaces: chart.palaces.map((one) => {
      const { symbol: _drop, ...palace } = one.palace;
      return { ...one, palace };
    }),
  };
}

let glyphsChecked: boolean | undefined;
let symbolsDrawn: boolean | undefined;
let readingsChecked: boolean | undefined;

/**
 * Refuses to draw where the glyphs would not appear.
 *
 * There is no way to ask resvg which fonts it loaded, so the question is put
 * to it directly: the same tiny image is rasterised twice, holding two
 * different characters of one script. If the two come out identical, neither
 * drew as itself — both are nothing, or both are the box a font puts where it
 * has no glyph — and every chart from this process would say as little.
 *
 * **The probe is a line the drawing writes, and not a character alone.** A
 * hanzi by itself draws on any machine that holds one CJK face, whatever
 * resvg resolved the family to; what failed was the hanzi sharing a line with
 * a reading, which is how the band sets every one of them. So each question
 * is asked of a name beside its pinyin and a word, set as `familiesByScript`
 * sets it. See that function for why the company matters.
 *
 * **A second question, asked only where the readings were.** The macron and
 * the caron of ā ǎ ǖ live in Latin Extended-A and B, which the faces of the
 * stack cover unevenly. A band of readings rasterised as a row of boxes — or
 * as nothing — is the silent failure the first probe exists to prevent, one
 * step further on: the picture still looks like a chart, and the half of it
 * that exists for the reader with no Chinese is gone.
 *
 * Checked once per process — fonts do not appear while a program runs — and
 * each message names the fix rather than the symptom.
 */
/** One short line rasterised alone, so two of them can be compared. */
function probeLine(content: string): Buffer {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 32" width="160" height="32">` +
    `<g font-family="${FONT_STACK}"><text x="4" y="26" font-size="24">${content}</text></g></svg>`;
  return Buffer.from(
    new Resvg(familiesByScript(svg), { font: { loadSystemFonts: true } }).render().asPng(),
  );
}

/** Whether two lines came out as one picture, which is neither drawn as itself. */
function alike(one: string, other: string): boolean {
  return probeLine(one).equals(probeLine(other));
}

function assertGlyphsRender(readings: boolean): void {
  if (glyphsChecked && (readingsChecked || !readings)) return;

  if (!glyphsChecked) {
    // `fi` is on the line because a ligature is one of the two things found to
    // lose the hanzi beside it, and ǐ because it is the other.
    if (alike('休 jǐ fi', '癸 jǐ fi')) {
      throw new Error(
        'No font on this system can draw Chinese characters, so every palace of the chart would come out empty. ' +
          'Install one — on Debian and Ubuntu, `fonts-noto-cjk`; on Alpine, `font-noto-cjk`; on macOS one is present already. ' +
          'SVG output is unaffected: it names the fonts and lets whoever displays it resolve them.',
      );
    }
    glyphsChecked = true;
  }

  if (readings && !readingsChecked) {
    // Two marks over one letter: where neither is drawn the lines are one
    // picture, whether the mark went missing or the whole letter boxed.
    if (alike('癸 ǎ fi', '癸 ā fi') || alike('癸 ǐ fi', '癸 ī fi')) {
      throw new Error(
        'No font on this system can draw the tone marks of the pinyin, so the band of readings would come out empty or boxed. ' +
          'Install a face with Latin Extended-A and B — on Debian and Ubuntu, `fonts-dejavu` beside the CJK one; on macOS one is present already — ' +
          'or draw the chart without asking for `captions.readings`. SVG output is unaffected.',
      );
    }
    readingsChecked = true;
  }
}

/**
 * Whether a font here draws the eight trigram symbols.
 *
 * Asked with ☰ and ☷, the two ends of the block, beside the name each stands
 * ahead of in a palace, and answered once. Unlike the two assertions above
 * this reports rather than throws — see `undrawn`.
 */
function symbolsRender(): boolean {
  if (symbolsDrawn !== undefined) return symbolsDrawn;
  symbolsDrawn = !alike('☰ 乾', '☷ 乾');
  return symbolsDrawn;
}

const HANZI = '⺀-鿿＀-｠';
const TRIGRAMS = '☰-☷';
const BY_SCRIPT = new RegExp(`([${HANZI}]+|[${TRIGRAMS}]+)`);
const CJK_STACK = [...CJK_FAMILIES, 'serif'].join(', ');
const SYMBOL_STACK = [...SYMBOL_FAMILIES, FONT_STACK].join(', ');

/**
 * Sets each script of a line in a family of its own.
 *
 * **A stack is resolved a character at a time by a browser and not by resvg.**
 * resvg shapes a whole line in the first family it finds and, where that face
 * lacks a character, shapes the line again in another and copies the missing
 * glyphs across by position. The copy is abandoned when the two faces set the
 * line in a different number of glyphs — a ligature in one, a letter composed
 * from two pieces in the other — and then every hanzi on the line is a box.
 * Which lines that takes depends on the faces the machine holds: 癸 guǐ under
 * one, anything beside an `fi` under another.
 *
 * So nothing is left to that copy. The drawing as a whole is given the CJK
 * families, and every stretch that is not hanzi is wrapped in the stack entire
 * — Latin first, as `palette.ts` argues it. A line is still shaped once for
 * each family on it, but each keeps only its own stretch, which is the part it
 * was chosen for.
 *
 * **Every line is told to keep its spaces**, because the wrapping moves them:
 * a space that led a stretch now leads an element, and one that stood between
 * two names is now an element by itself, and the default handling drops both.
 */
export function familiesByScript(svg: string): string {
  return svg
    .replaceAll(FONT_STACK, CJK_STACK)
    .replace(/(<text\b[^>]*>)([\s\S]*?)(<\/text>)/g, (_whole, open: string, body: string, close: string) => {
      const set = body
        .split(/(<[^>]+>)/)
        .map((piece, index) => (index % 2 === 1 ? piece : stretches(piece)))
        .join('');
      return `${open.replace(/^<text/, '<text xml:space="preserve"')}${set}${close}`;
    });
}

/** The text between two tags, with every stretch that is not hanzi wrapped. */
function stretches(text: string): string {
  return text
    .split(BY_SCRIPT)
    .map((stretch, index) => {
      if (!stretch) return '';
      if (index % 2 === 0) return `<tspan font-family="${FONT_STACK}">${stretch}</tspan>`;
      return new RegExp(`^[${TRIGRAMS}]`).test(stretch)
        ? `<tspan font-family="${SYMBOL_STACK}">${stretch}</tspan>`
        : stretch;
    })
    .join('');
}

/**
 * Replaces the custom properties with their values.
 *
 * resvg does not resolve `var()`, so a drawing handed to it unchanged comes
 * out with every fill missing. Substituting here keeps one stylesheet for
 * both outputs instead of two that drift apart.
 *
 * Exported for the test that checks nothing was left behind. A property added
 * to the palette and forgotten here does not throw and does not look wrong in
 * the browser — it goes missing only in the raster, which is the one output
 * nobody looks at twice.
 */
export function inlineColours(svg: string, scheme: Scheme): string {
  const palette = PALETTES[scheme];
  const values: Record<string, string> = {
    '--qmdj-ink': palette.ink,
    '--qmdj-faint': palette.faint,
    '--qmdj-word': palette.word,
    '--qmdj-rule': palette.rule,
    '--qmdj-ground': palette.ground,
    '--qmdj-mark': palette.mark,
  };
  for (const [element, colour] of Object.entries(palette.element)) {
    values[`--qmdj-element-${element}`] = colour;
  }
  for (const [element, colour] of Object.entries(palette.elementInk)) {
    values[`--qmdj-ink-${element}`] = colour;
  }

  return svg.replace(/var\((--qmdj-[a-z-]+)\)/g, (whole, name: string) => values[name] ?? whole);
}
