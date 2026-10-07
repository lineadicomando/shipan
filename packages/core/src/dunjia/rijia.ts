import { PALACES, palace, type ByPalace } from './palaces.js';
import { GATES, type Gate } from './plates.js';

/**
 * The day family, 日家奇門: what a day lays, and it is two motions.
 *
 * Eight gates, three days to a palace and never through the centre; nine
 * stars of their own, one palace a day and through it. Neither is the hour
 * board reground — there is no earth plate here, no 儀 and no 值符 — so this
 * is a calculation beside `computeQimenChart` and not a branch inside it.
 *
 * Both are counted from the day's place in the sixty and from the half of the
 * year, and from nothing else. → `docs/sources.md` § "The 日家 is two boards
 * and not one"
 */

/** One of the nine stars the day family lays, which are not the hour board's. */
export interface DayStar {
  id: DayStarId;
  hanzi: string;
  pinyin: string;
}

export type DayStarId =
  | 'taiyi' | 'sheti' | 'xuanyuan' | 'zhaoyao' | 'tianfu'
  | 'qinglong' | 'xianchi' | 'taiyin' | 'tianyi';

/**
 * In the order the 訣 recites them, which is the order they are laid in:
 * 「甲子艮宮加太乙，攝提軒轅招搖遊，天符青龍咸池繼，太陰天乙順行流」.
 */
export const DAY_STARS: readonly DayStar[] = [
  { id: 'taiyi', hanzi: '太乙', pinyin: 'tàiyǐ' },
  { id: 'sheti', hanzi: '攝提', pinyin: 'shètí' },
  { id: 'xuanyuan', hanzi: '軒轅', pinyin: 'xuānyuán' },
  { id: 'zhaoyao', hanzi: '招搖', pinyin: 'zhāoyáo' },
  { id: 'tianfu', hanzi: '天符', pinyin: 'tiānfú' },
  { id: 'qinglong', hanzi: '青龍', pinyin: 'qīnglóng' },
  { id: 'xianchi', hanzi: '咸池', pinyin: 'xiánchí' },
  { id: 'taiyin', hanzi: '太陰', pinyin: 'tàiyīn' },
  { id: 'tianyi', hanzi: '天乙', pinyin: 'tiānyǐ' },
];

/** The eight palaces a gate can stand in, in the order of their numbers. */
const OUTER: readonly number[] = [1, 2, 3, 4, 6, 7, 8, 9];

/** The eight round the board as the sun goes, from 坎: the order of `GATES`. */
const ROUND: readonly number[] = GATES.map((gate) => gate.home);

const wrap = (value: number, modulus: number): number => ((value % modulus) + modulus) % modulus;

/**
 * The palace 休門 stands in on a day.
 *
 * 「一卦管三日…依九宮次序，三日一換局，去中五不用」: 甲子, 乙丑 and 丙寅 at 坎,
 * the next three at 坤, and on through the eight in the order of their
 * numbers. Twenty groups of three do not close on eight palaces, and the count
 * is taken up again from the first at every 甲子 rather than carried over.
 * Under yin it begins at 離 and runs back.
 */
export function restPalace(dayIndex: number, yang: boolean): number {
  const group = Math.floor(wrap(dayIndex, 60) / 3) % OUTER.length;
  return OUTER[yang ? group : OUTER.length - 1 - group] as number;
}

/**
 * The eight gates of a day.
 *
 * 休門 is set by `restPalace` and the other seven follow it round the eight in
 * their own order — with the sun on the day of a yang stem, against it on the
 * day of a yin one, which is every other day whatever the half of the year.
 */
export function dayGates(dayIndex: number, yang: boolean): ByPalace<Gate> {
  const start = ROUND.indexOf(restPalace(dayIndex, yang));
  const forward = wrap(dayIndex, 2) === 0;
  const gates: Record<number, Gate> = {};
  GATES.forEach((gate, offset) => {
    gates[ROUND[wrap(start + (forward ? offset : -offset), ROUND.length)] as number] = gate;
  });
  return gates;
}

/**
 * The palace 太乙 stands in on a day.
 *
 * 「冬至艮宮夏坤地，命起甲子順逆行」: 艮 on 甲子 and one palace on with every
 * day under yang, 坤 on 甲子 and one palace back under yin, the centre a
 * palace like the rest. Sixty days are not a multiple of nine, and this count
 * too is taken up again at every 甲子.
 */
export function taiyiPalace(dayIndex: number, yang: boolean): number {
  const day = wrap(dayIndex, 60);
  return wrap((yang ? 8 + day : 2 - day) - 1, PALACES.length) + 1;
}

/** The nine stars of a day, laid from 太乙 the way 太乙 itself is moving. */
export function dayStars(dayIndex: number, yang: boolean): ByPalace<DayStar> {
  const start = taiyiPalace(dayIndex, yang);
  const stars: Record<number, DayStar> = {};
  DAY_STARS.forEach((star, offset) => {
    const number = wrap(start - 1 + (yang ? offset : -offset), PALACES.length) + 1;
    stars[palace(number).number] = star;
  });
  return stars;
}
