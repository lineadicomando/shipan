import { escape, folded, round } from './fit.js';

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
 *
 * **A line that will not fit is folded and not shrunk.** Two of these run to a
 * dozen words — the pair of spirits a yin board renames, the palace the centre
 * lodges in — and shrinking them to one line each is what put the two most
 * consequential sentences on the sheet at a size nobody reads. `folded` is the
 * same estimate applied to breaking instead, and the block simply grows by the
 * lines it takes.
 */

/** One line as it will be set, and whether it opens an entry or continues one. */
export interface SchoolLine {
  text: string;
  /** False on a fold, which is what earns the line its indent. */
  opens: boolean;
}

/**
 * The lines as they will be set: one entry may become two or three.
 *
 * Asked before the layout is settled and again when it is drawn, because the
 * depth of the block is what the fold decides. `ems` is the room in multiples
 * of the font size, which is how `fit.ts` measures throughout.
 */
export function schoolLines(lines: readonly string[], ems: number): SchoolLine[] {
  return lines.flatMap((line) =>
    folded(line, ems).map((text, index) => ({ text, opens: index === 0 })),
  );
}

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
  /** Beyond this a line is folded onto the next rather than allowed to run over. */
  maxWidth: number;
}

export function drawSchools(lines: readonly string[], block: SchoolBlock): string[] {
  // Folded here and counted by the caller, which had to fold to know how deep
  // the block is. Nothing shrinks: every line is set at the one size.
  return schoolLines(lines, block.maxWidth / block.size).map((line, index) => {
    // A continuation is indented, so that the eye finds where an entry begins
    // in a block whose entries are no longer one line each. A hanging indent
    // and not a hyphen or a bullet: the entries were never marked when they
    // fitted, and marking them now would be a list where there was a stack.
    const indent = line.opens ? 0 : block.size;
    return (
      `<text x="${round(block.x + indent)}" y="${round(block.first + block.step * index)}" ` +
      `font-size="${round(block.size)}" class="word">${escape(line.text)}</text>`
    );
  });
}
