/**
 * What every drawing owes the paper it declares: nothing set below its foot.
 *
 * The lines naming the schools are folded where they run long, and a sheet
 * measured before the fold came out too short for them. Lines long enough to
 * fold several times over, so that the margin under the block cannot absorb
 * the difference between a count of entries and a count of lines.
 */
const CLAUSE = 'and a clause after it that a board of this package has room for on no line it draws';

export const LONG_SCHOOLS = [
  `The first school line, ${CLAUSE}, ${CLAUSE}, ${CLAUSE}`,
  'The second, shorter',
  `The third school line, ${CLAUSE}, ${CLAUSE}, ${CLAUSE}, ${CLAUSE}`,
  `The fourth, which closes the block as the sentence about the combination does, ${CLAUSE}`,
];

/** The declared height of the sheet. */
export function sheetHeight(svg: string): number {
  return Number(/<svg [^>]*height="([\d.]+)"/.exec(svg)?.[1]);
}

/** Every baseline set on the sheet, with the size it is set at. */
export function baselines(svg: string): { y: number; size: number }[] {
  return [...svg.matchAll(/<text [^>]*y="([\d.]+)" font-size="([\d.]+)"/g)].map((m) => ({
    y: Number(m[1]),
    size: Number(m[2]),
  }));
}

/** Whether the lowest line of text, descenders included, sits on the sheet. */
export function fitsItsSheet(svg: string): boolean {
  const height = sheetHeight(svg);
  return baselines(svg).every(({ y, size }) => y + size * 0.3 <= height);
}
