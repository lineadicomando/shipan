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
import type { LiurenBoard, QimenChart } from '@shipan/core';

export function taiyiKeyOf(board: PlateTaiyi, t: Translator): Said[][] {
  const god = Object.fromEntries(
    board.gods.map((one) => [one.id, t(`label.taiyishen.${one.id}` as MessageKey)]),
  );
  return taiyiKey(board, { god });
}

type Name = { id: string; hanzi: string; pinyin?: string | undefined };

/**
 * Each name once, in the order the board meets it, with its word.
 *
 * `prefix` is the catalog the word is in (`label.<prefix>.<id>`), the one the
 * page's tables gloss the same name from, so the key and the table say it
 * alike.
 */
function once(t: Translator, prefix: string, names: readonly (Name | undefined)[]): Said[] {
  const seen = new Map<string, Said>();
  for (const name of names) {
    if (!name || seen.has(name.hanzi)) continue;
    const word = t(`label.${prefix}.${name.id}` as MessageKey);
    seen.set(name.hanzi, { hanzi: name.hanzi, pinyin: name.pinyin ?? '', word });
  }
  return [...seen.values()];
}

/** The twelve branches in their order, for the frame of a 奇門 board. */
const BRANCH_IDS = ['zi', 'chou', 'yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai'];

/**
 * Every name on a 奇門 board, with its word and its reading, a group to a kind.
 *
 * The drawing carried this as a band under the grid, and the pages ask for the
 * board bare: said in type it is text a reader can select, search and have
 * read out, which a picture's is not. The order is the order a palace is read
 * in — what it was dealt, then what came to stand over it — and the branches
 * of the frame close it. Nothing is numbered: the board names each thing in
 * full, so this says what a name means and how it sounds, not which one it is.
 */
export function qimenKeyOf(chart: QimenChart, t: Translator): Said[][] {
  return [
    once(t, 'palace', chart.palaces.map((cell) => cell.palace)),
    once(t, 'stem', chart.palaces.flatMap((cell) => [cell.earth, cell.heaven])),
    once(t, 'star', chart.palaces.map((cell) => cell.star)),
    once(t, 'gate', chart.palaces.map((cell) => cell.gate)),
    once(t, 'spirit', chart.palaces.map((cell) => cell.spirit)),
    COMPASS_READINGS.map((one, index) => ({
      ...one,
      word: t(`label.branch.${BRANCH_IDS[index]}` as MessageKey),
    })),
  ].filter((group) => group.length > 0);
}

/**
 * The 六壬 key the endpoint hands over, with the word for each name.
 *
 * The endpoint is told no language — its answer is the same board in every
 * one — so the words are supplied here, from the catalog the page already
 * holds, by finding each name on the board: a branch, a general, or a stem
 * standing under a lesson or a transmission.
 */
export function liurenKeyOf(
  groups: readonly (readonly Said[])[],
  board: LiurenBoard,
  t: Translator,
): Said[][] {
  const words = new Map<string, string>();
  const put = (prefix: string, name: { id: string; hanzi: string } | undefined) => {
    if (name && !words.has(name.hanzi)) words.set(name.hanzi, t(`label.${prefix}.${name.id}` as MessageKey));
  };
  for (const branch of board.heaven) put('branch', branch);
  for (const general of board.generals) put('general', general);
  for (const course of board.courses) put(course.lowerIsStem ? 'stem' : 'branch', course.lower);
  for (const transmission of board.transmissions) put('stem', transmission.hiddenStem);
  return groups.map((group) =>
    group.map((one) => {
      const word = words.get(one.hanzi);
      return word ? { ...one, word } : { ...one };
    }),
  );
}
