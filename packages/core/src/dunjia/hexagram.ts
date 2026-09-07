import { PALACES, palace, type PalaceId } from './palaces.js';

/**
 * The hexagram a gate makes standing over a palace.
 *
 * 《奇門探索錄》卷十一 八門三合 reads the board this way: the gate's own
 * trigram above, the palace's below, and the sixty-four names fall out with
 * nothing left over — eight gates over eight palaces, the centre having no
 * gate and no trigram. Eight of its cells were read on the plate and all eight
 * obey the rule; `test/hexagram.test.ts` asserts them.
 *
 * **The name is all that travels.** What that chapter attaches to each name —
 * the 《象》, whether the hour favours 主 or 客, the 類神 and the 克應 — is the
 * 用神 chosen, the palace ranked and the outcome dated, and each of those has
 * its own entry in `docs/refusals.md`. Naming a configuration and declining
 * what a school reads in it is what this engine does with 門迫 and with every
 * 格 it carries; this is that and not an exception to it.
 */
export interface Hexagram {
  /**
   * The King Wen number, 1 to 64, **which is the identifier**.
   *
   * The house convention is toneless pinyin, tone-numbered where two names
   * would collide. The sixty-four are the first named set here that convention
   * cannot separate: 履 and 旅 are both lǚ, in the same tone, and no number
   * appended to the syllable tells them apart. The tradition's own answer is
   * the ordinal — every edition prints it, every commentary cites by it — so
   * the ordinal is what a catalog key is built on. → `docs/i18n.md`
   */
  number: number;
  hanzi: string;
  pinyin: string;
  /** The figure, six lines: U+4DC0 is the first, so the number gives it. */
  symbol: string;
  /** The trigram above, which is the gate's. */
  upper: Trigram;
  /** The trigram below, which is the palace's. */
  lower: Trigram;
}

/**
 * One of the eight, named and drawn.
 *
 * Not a `Palace`: a palace is a seat on this board and carries a number, an
 * element and a bearing, none of which is true of the trigram *as a component
 * of a hexagram*. What travels here is the name, the reading and the figure,
 * taken from `PALACES` so that the two can never drift.
 */
export interface Trigram {
  id: PalaceId;
  hanzi: string;
  pinyin: string;
  /** The figure, three lines. */
  symbol: string;
}

function trigram(id: PalaceId): Trigram | undefined {
  const found = PALACES.find((one) => one.id === id);
  if (!found?.symbol) return undefined;
  return { id: found.id, hanzi: found.hanzi, pinyin: found.pinyin, symbol: found.symbol };
}

/**
 * The eight in the order the received table is set out, which is the 先天 one
 * and the order Unicode encodes at U+2630.
 */
const ORDER: readonly PalaceId[] = ['qian', 'dui', 'li', 'zhen', 'xun', 'kan', 'gen', 'kun'];

/**
 * The received ordering, rows the upper trigram and columns the lower, both in
 * `ORDER`. Not a fact about 奇門: it is the 周易's own arrangement, which this
 * chapter borrows entire.
 */
const KING_WEN: Record<string, readonly number[]> = {
  qian: [1, 10, 13, 25, 44, 6, 33, 12],
  dui: [43, 58, 49, 17, 28, 47, 31, 45],
  li: [14, 38, 30, 21, 50, 64, 56, 35],
  zhen: [34, 54, 55, 51, 32, 40, 62, 16],
  xun: [9, 61, 37, 42, 57, 59, 53, 20],
  kan: [5, 60, 63, 3, 48, 29, 39, 8],
  gen: [26, 41, 22, 27, 18, 4, 52, 23],
  kun: [11, 19, 36, 24, 46, 7, 15, 2],
};

/** Name and reading, by the number. Written out, and asserted in the test. */
const NAMES: readonly (readonly [string, string])[] = [
  ['乾', 'qián'], ['坤', 'kūn'], ['屯', 'zhūn'], ['蒙', 'méng'],
  ['需', 'xū'], ['訟', 'sòng'], ['師', 'shī'], ['比', 'bǐ'],
  ['小畜', 'xiǎoxù'], ['履', 'lǚ'], ['泰', 'tài'], ['否', 'pǐ'],
  ['同人', 'tóngrén'], ['大有', 'dàyǒu'], ['謙', 'qiān'], ['豫', 'yù'],
  ['隨', 'suí'], ['蠱', 'gǔ'], ['臨', 'lín'], ['觀', 'guān'],
  ['噬嗑', 'shìkè'], ['賁', 'bì'], ['剝', 'bō'], ['復', 'fù'],
  ['無妄', 'wúwàng'], ['大畜', 'dàxù'], ['頤', 'yí'], ['大過', 'dàguò'],
  ['坎', 'kǎn'], ['離', 'lí'], ['咸', 'xián'], ['恆', 'héng'],
  ['遯', 'dùn'], ['大壯', 'dàzhuàng'], ['晉', 'jìn'], ['明夷', 'míngyí'],
  ['家人', 'jiārén'], ['睽', 'kuí'], ['蹇', 'jiǎn'], ['解', 'xiè'],
  ['損', 'sǔn'], ['益', 'yì'], ['夬', 'guài'], ['姤', 'gòu'],
  ['萃', 'cuì'], ['升', 'shēng'], ['困', 'kùn'], ['井', 'jǐng'],
  ['革', 'gé'], ['鼎', 'dǐng'], ['震', 'zhèn'], ['艮', 'gèn'],
  ['漸', 'jiàn'], ['歸妹', 'guīmèi'], ['豐', 'fēng'], ['旅', 'lǚ'],
  ['巽', 'xùn'], ['兌', 'duì'], ['渙', 'huàn'], ['節', 'jié'],
  ['中孚', 'zhōngfú'], ['小過', 'xiǎoguò'], ['既濟', 'jìjì'], ['未濟', 'wèijì'],
];

/**
 * The hexagram of a gate standing over a palace, by the palaces the two are of.
 *
 * `undefined` where either is the centre, which is a seat and not a trigram —
 * so the fifth palace has none, and neither would a gate that had no home.
 */
export function hexagramOf(upper: PalaceId, lower: PalaceId): Hexagram | undefined {
  const row = KING_WEN[upper];
  const column = ORDER.indexOf(lower);
  const above = trigram(upper);
  const below = trigram(lower);
  if (!row || column === -1 || !above || !below) return undefined;

  const number = row[column] as number;
  const [hanzi, pinyin] = NAMES[number - 1] as readonly [string, string];
  return {
    number,
    hanzi,
    pinyin,
    symbol: String.fromCodePoint(0x4dbf + number),
    upper: above,
    lower: below,
  };
}

/** The same, from the palace a gate is of and the palace it stands on. */
export function hexagramOfSeats(gateHome: number, standingOn: number): Hexagram | undefined {
  return hexagramOf(palace(gateHome).id, palace(standingOn).id);
}
