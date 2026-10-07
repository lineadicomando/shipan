import { BRANCHES, type Branch } from '../ganzhi.js';
import type { SolarTermId } from '../solar-terms.js';
import type { Element } from '../types.js';

/**
 * A palace of the nine (九宮).
 *
 * The Luoshu number is the identity, not the position in any array. It is
 * what the tradition counts with — a chart is "yang dun, ju nine" — and it is
 * what the flying orders step through.
 */
export interface Palace {
  /** Luoshu number, 1 to 9. The centre is 5. */
  number: number;
  /** Toneless pinyin of the trigram. */
  id: PalaceId;
  /** The trigram, e.g. `坎`. */
  hanzi: string;
  /** The trigram said aloud, e.g. `kǎn`. */
  pinyin: string;
  /**
   * The trigram drawn: ☵ beside 坎.
   *
   * The same fact as `hanzi` in the other of the two ways the tradition writes
   * it, and the reason it is worth carrying is what it does for a reader with
   * no Chinese: 坎 is a shape to be looked up, ☵ is a shape that *shows* — one
   * broken line, one whole, one broken — and the eight of them are a set at a
   * glance rather than eight more characters.
   *
   * **Absent for the centre, and that absence is half the field's worth.** 中
   * is the name of a seat and not a trigram; it has no lines to draw. Written
   * in hanzi it stands in a row with 坎 and 離 and reads as the ninth of a set
   * of eight, which it is not.
   *
   * Written out rather than derived from `id`, because deriving it from the
   * Unicode order would bake in the belief that is being checked: the order is
   * asserted in `test/palaces.test.ts` instead, where a wrong symbol fails.
   */
  symbol?: string;
  element: Element;
  /** Compass direction, `null` for the centre, which has none. */
  direction: Direction | null;
}

export type PalaceId = 'kan' | 'kun' | 'zhen' | 'xun' | 'zhong' | 'qian' | 'dui' | 'gen' | 'li';

export type Direction = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

/** The eight, going round from the north. The centre is not one of them. */
export const DIRECTIONS: readonly Direction[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

// 乾 is qián, the trigram — not the gān that means dry. The identifier had
// already made the choice; the transliteration only makes it visible.
export const PALACES: readonly Palace[] = [
  { number: 1, id: 'kan', hanzi: '坎', pinyin: 'kǎn', symbol: '☵', element: 'shui', direction: 'n' },
  { number: 2, id: 'kun', hanzi: '坤', pinyin: 'kūn', symbol: '☷', element: 'tu', direction: 'sw' },
  { number: 3, id: 'zhen', hanzi: '震', pinyin: 'zhèn', symbol: '☳', element: 'mu', direction: 'e' },
  { number: 4, id: 'xun', hanzi: '巽', pinyin: 'xùn', symbol: '☴', element: 'mu', direction: 'se' },
  { number: 5, id: 'zhong', hanzi: '中', pinyin: 'zhōng', element: 'tu', direction: null },
  { number: 6, id: 'qian', hanzi: '乾', pinyin: 'qián', symbol: '☰', element: 'jin', direction: 'nw' },
  { number: 7, id: 'dui', hanzi: '兌', pinyin: 'duì', symbol: '☱', element: 'jin', direction: 'w' },
  { number: 8, id: 'gen', hanzi: '艮', pinyin: 'gèn', symbol: '☶', element: 'tu', direction: 'ne' },
  { number: 9, id: 'li', hanzi: '離', pinyin: 'lí', symbol: '☲', element: 'huo', direction: 's' },
];

export function palace(number: number): Palace {
  const found = PALACES.find((candidate) => candidate.number === number);
  if (!found) throw new Error(`no palace numbered ${number}`);
  return found;
}

/**
 * The palace a branch belongs to.
 *
 * Twelve branches over eight outer palaces: the four that hold two are the
 * corners, which is why 艮 takes both 丑 and 寅. The centre holds none — it
 * has no direction, and a branch is a direction before it is anything else.
 *
 * A fact about the board and not about any one reading of it, which is why it
 * lives here: the void palaces of a decade, the post horse and the frame of
 * branches drawn around the grid all ask the same question of it.
 */
const BRANCH_PALACE: Record<number, number> = {
  0: 1, //  子 — 坎
  1: 8, //  丑 — 艮
  2: 8, //  寅 — 艮
  3: 3, //  卯 — 震
  4: 4, //  辰 — 巽
  5: 4, //  巳 — 巽
  6: 9, //  午 — 離
  7: 2, //  未 — 坤
  8: 2, //  申 — 坤
  9: 7, //  酉 — 兌
  10: 6, // 戌 — 乾
  11: 6, // 亥 — 乾
};

export function palaceOfBranch(branch: Branch): number {
  return BRANCH_PALACE[branch.index] as number;
}

/** The branches a palace holds — two at a corner, one on an axis, none in the centre. */
export function branchesOf(number: number): Branch[] {
  return BRANCHES.filter((branch) => BRANCH_PALACE[branch.index] === number);
}

/**
 * The palace the centre lodges in (寄宮).
 *
 * The centre has no direction, no gate and no spirit, so whatever the chart
 * puts there has to be read somewhere else. This project follows the common
 * choice of the palace of Kun.
 */
export const CENTRE_HOST = 2;

/**
 * Sends the centre to its host, and leaves every other palace alone.
 *
 * The host is 坤 unless a caller says otherwise, which a chart does: where
 * the centre lodges is `centreLodging`, and `centreHost` reads it.
 */
export function lodge(number: number, host: number = CENTRE_HOST): number {
  return number === 5 ? host : number;
}

/** 八節, three terms to each, and the palace of the trigram that governs them. */
const HOST_BY_JIE: Record<SolarTermId, number> = {
  dongzhi: 1, xiaohan: 1, dahan: 1,
  lichun: 8, yushui: 8, jingzhe: 8,
  chunfen: 3, qingming: 3, guyu: 3,
  lixia: 4, xiaoman: 4, mangzhong: 4,
  xiazhi: 9, xiaoshu: 9, dashu: 9,
  liqiu: 2, chushu: 2, bailu: 2,
  qiufen: 7, hanlu: 7, shuangjiang: 7,
  lidong: 6, xiaoxue: 6, daxue: 6,
};

/** The four seasons, six terms to each, and the corner earth is 旺 in. */
const HOST_BY_SEASON: Record<SolarTermId, number> = {
  lichun: 4, yushui: 4, jingzhe: 4, chunfen: 4, qingming: 4, guyu: 4,
  lixia: 2, xiaoman: 2, mangzhong: 2, xiazhi: 2, xiaoshu: 2, dashu: 2,
  liqiu: 6, chushu: 6, bailu: 6, qiufen: 6, hanlu: 6, shuangjiang: 6,
  lidong: 8, xiaoxue: 8, daxue: 8, dongzhi: 8, xiaohan: 8, dahan: 8,
};

/**
 * The palace the centre lodges in, under each reading of `centreLodging`.
 *
 * - `kun` — 坤 always: 「中宮，寄坤宮也」, 《奇門遁甲統宗》.
 * - `dun` — 坤 under yang, 艮 under yin: 「陽局中五寄於二，陰局中五合於八」,
 *   which 《御定奇門寶鑑》 reports of a variant copy.
 * - `dunni` — 艮 under yang, 坤 under yin: 「元經又謂陽遁寄艮，陰遁寄坤」, as
 *   the commentary 《奇門遁甲折衷》 opens its chapter with reports it.
 * - `bajie` — the palace of the 節 in force: 「冬至三氣皆寄坎，立春三氣皆寄艮，
 *   春分三氣皆寄震，立夏三氣皆寄巽，夏至三氣皆寄離，立秋三氣皆寄坤，秋分三氣
 *   皆寄兌，立冬三氣皆寄乾」, which the 折衷 holds.
 * - `siyu` — the corner of the season: spring 巽, summer 坤, autumn 乾, winter
 *   艮, each where that season's earth is 旺; 《三才發秘》 as the 折衷 quotes it.
 *
 * The term is the one the ju was taken from, so that the lodging and the ju
 * are read off the same 氣.
 */
export function centreHost(
  lodging: 'kun' | 'dun' | 'dunni' | 'bajie' | 'siyu',
  yang: boolean,
  term: SolarTermId,
): number {
  switch (lodging) {
    case 'kun':
      return CENTRE_HOST;
    case 'dun':
      return yang ? 2 : 8;
    case 'dunni':
      return yang ? 8 : 2;
    case 'bajie':
      return HOST_BY_JIE[term];
    case 'siyu':
      return HOST_BY_SEASON[term];
  }
}

/**
 * The ring of eight, clockwise (順), starting from Xun.
 *
 * The centre is not on it. The heaven plate and the nine stars turn along
 * this ring, which is the geometry of the board rather than the arithmetic of
 * the Luoshu — neighbours here are neighbours on the page.
 */
export const RING_CLOCKWISE: readonly number[] = [4, 9, 2, 7, 6, 1, 8, 3];

/** The same ring the other way, which the spirits of a yin chart follow. */
export const RING_COUNTERCLOCKWISE: readonly number[] = [4, 3, 8, 1, 6, 7, 2, 9];

/**
 * The order the gates fly in (飛), which is not the ring.
 *
 * Flying counts through the Luoshu numbers themselves — one, two, three — and
 * so passes through the centre, where the ring never goes. Ascending in a
 * yang chart, descending in a yin one.
 */
export const FLIGHT_ASCENDING: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const FLIGHT_DESCENDING: readonly number[] = [1, 9, 8, 7, 6, 5, 4, 3, 2];

/** The order starting at `from` and continuing round the cycle. */
export function orbitFrom(order: readonly number[], from: number): number[] {
  const start = order.indexOf(from);
  if (start === -1) throw new Error(`palace ${from} is not on this order`);
  return [...order.slice(start), ...order.slice(0, start)];
}

/** Steps `count` places along an order, wrapping. */
export function step(order: readonly number[], from: number, count: number): number {
  const start = order.indexOf(from);
  if (start === -1) throw new Error(`palace ${from} is not on this order`);
  return order[(start + count) % order.length] as number;
}

/**
 * A value in each palace, keyed by Luoshu number.
 *
 * A plain object rather than an array, because the palaces are numbered from
 * one and an array would invite reading them from zero.
 */
export type ByPalace<T> = Record<number, T>;

export function emptyByPalace<T>(): ByPalace<T> {
  return {} as ByPalace<T>;
}
