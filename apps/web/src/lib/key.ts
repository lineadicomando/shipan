/**
 * The key to a 太乙 board's numerals, worked out in the page.
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
import { taiyiKey, type PlateTaiyi, type Said } from '@shipan/plate';
import type { MessageKey, Translator } from '@shipan/i18n';

export function taiyiKeyOf(board: PlateTaiyi, t: Translator): Said[][] {
  const god = Object.fromEntries(
    board.gods.map((one) => [one.id, t(`label.taiyishen.${one.id}` as MessageKey)]),
  );
  return taiyiKey(board, { god });
}
