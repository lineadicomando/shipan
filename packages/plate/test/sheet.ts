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

/** Every numeral ringed in a drawing, in the order it is drawn. */
function ringedNumerals(svg: string): number[] {
  return [...svg.matchAll(/class="ring"\/><text [^>]*>(\d+)<\/text>/g)].map((match) => Number(match[1]));
}

/**
 * What a board drawn with `band: false` owes the page that keys it.
 *
 * The band and its depth are gone; the numerals stay in the board, every one
 * of them in the key the page sets beside it; the key counts from one without
 * a gap, as the band did; and the band, when it is drawn, lists exactly the
 * key's numerals and the board's. Returns a list of what failed, empty when
 * nothing did, so a test can say which.
 */
export function keyFaults(
  full: string,
  bare: string,
  key: readonly (readonly { index?: number | undefined }[])[],
  heading: string,
): string[] {
  const faults: string[] = [];
  if (!full.includes(heading)) faults.push('the full board has no band');
  if (bare.includes(heading)) faults.push('the bare board still has its band');
  if (!(sheetHeight(bare) < sheetHeight(full))) faults.push('the bare board is no shorter');
  const inBoard = ringedNumerals(bare);
  if (inBoard.length === 0) faults.push('the bare board lost its numerals');
  const indices = key.flat().map((one) => one.index);
  for (const numeral of inBoard) if (!indices.includes(numeral)) faults.push(`numeral ${numeral} is not in the key`);
  if (indices.some((index, at) => index !== at + 1)) faults.push('the key does not count from one without a gap');
  const drawn = new Set(ringedNumerals(full));
  const expected = new Set([...inBoard, ...(indices as number[])]);
  if (drawn.size !== expected.size || [...drawn].some((one) => !expected.has(one))) {
    faults.push('the band lists other numerals than the key');
  }
  return faults;
}
