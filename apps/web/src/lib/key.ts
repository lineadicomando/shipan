/**
 * The keys to the boards whose endpoint does not hand one over, worked out in
 * the page.
 *
 * The key to a 太乙 board's numerals, first.
 *
 * The other boards whose numerals are keyed beside them — 七政四餘, 紫微斗數 —
 * have the key handed over by their endpoint, which is told the reader's
 * language already. 太乙's endpoint is not, on purpose: its answer is a year
 * and identical in every language, and it is cached publicly for a week, so a
 * key in the reader's language would split that cache into a copy per locale
 * of the same board. So the page numbers the board itself, with the drawing's
 * own function, and supplies the words from the catalog it already holds.
 *
 * The words are the ones `taiyiLabels` in the engine gives the drawing —
 * `label.taiyishen.<id>` — and a test holds the two to each other, so the
 * numeral beside a god and the word in the key cannot part.
 */
import { COMPASS_READINGS, taiyiKey, type PlateTaiyi, type Said } from '@shipan/plate';
import type { MessageKey, Translator } from '@shipan/i18n';
import type { QimenChart } from '@shipan/core';

export function taiyiKeyOf(board: PlateTaiyi, t: Translator): Said[][] {
  const god = Object.fromEntries(
    board.gods.map((one) => [one.id, t(`label.taiyishen.${one.id}` as MessageKey)]),
  );
  return taiyiKey(board, { god });
}

type Name = { hanzi: string; pinyin?: string | undefined };

/** Each name once, in the order the board meets it. */
function once(names: readonly (Name | undefined)[]): Said[] {
  const seen = new Map<string, Said>();
  for (const name of names) {
    if (name && !seen.has(name.hanzi)) seen.set(name.hanzi, { hanzi: name.hanzi, pinyin: name.pinyin ?? '' });
  }
  return [...seen.values()];
}

/**
 * How every name on a 奇門 board is said, a group to a kind.
 *
 * The drawing carried this as a band under the grid, and the pages ask for the
 * board bare: said in type it is text a reader can select, search and have
 * read out, which a picture's is not. The order is the order a palace is read
 * in — what it was dealt, then what came to stand over it — and the branches
 * of the frame close it. Nothing is numbered: the board names each thing in
 * full, so this says how a name sounds and not which one it is.
 */
export function qimenKeyOf(chart: QimenChart): Said[][] {
  return [
    once(chart.palaces.map((cell) => cell.palace)),
    once(chart.palaces.flatMap((cell) => [cell.earth, cell.heaven])),
    once(chart.palaces.map((cell) => cell.star)),
    once(chart.palaces.map((cell) => cell.gate)),
    once(chart.palaces.map((cell) => cell.spirit)),
    [...COMPASS_READINGS],
  ].filter((group) => group.length > 0);
}
