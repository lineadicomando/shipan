import { escape, fitted, round } from './fit.js';

/**
 * The lines under a board saying which schools laid it.
 *
 * **Written whole by the caller, like every other word on a drawing.** This
 * package holds no catalog and cannot know what a school is: what reaches it
 * is a list of finished lines — «The ju is determined: by thirds of the term
 * 拆補 chāibǔ» — and all this decides is where they go. The board it is handed
 * does not carry them either, and deliberately: `types.ts` redeclares what is
 * *drawn*, and how a board was cast is not on it.
 *
 * **The picture is the half that travels alone.** A transcript says which
 * school laid the board under its pillars; a PNG shared out of a page has no
 * pillars, no table and no address, so a drawing that said nothing would be
 * the one copy of a board that reads as *the* board of its instant. See
 * `docs/parameters.md` § "A declared default is not a hidden school".
 *
 * One to a line rather than columned: there are two of these on most boards
 * and four at the most, and a list of four set in columns is a table with one
 * row in it.
 */

/** How much paper the block takes, or zero where there is nothing to say. */
export function schoolDepth(lines: readonly string[], step: number, air: number): number {
  return lines.length ? air + step * lines.length : 0;
}

export interface SchoolBlock {
  /** Left edge, which is the drawing's own margin. */
  x: number;
  /** Baseline of the first line. */
  first: number;
  step: number;
  size: number;
  /** Beyond this a line is shrunk rather than allowed to run over. */
  maxWidth: number;
}

export function drawSchools(lines: readonly string[], block: SchoolBlock): string[] {
  return lines.map((line, index) => {
    const size = fitted(line, block.size, block.maxWidth);
    return (
      `<text x="${round(block.x)}" y="${round(block.first + block.step * index)}" ` +
      `font-size="${round(size)}" class="word">${escape(line)}</text>`
    );
  });
}
