import type { LodgeId } from './almanac.js';

/**
 * 授時曆's 黃道宿次 — the width of each lodge along the ecliptic, as of 至元辛巳.
 *
 * Transcribed from 《授時曆故》, 黃宗羲, 卷二, leaves 十五 and 十六, read on the
 * plate. In 度 of a circle of 365.2575, written as the text writes them: the
 * whole 度, then 分 in hundredths, then 秒 in ten-thousandths, so 虛's
 * 「九　七十五秒」 is 9.0075.
 *
 * **Twenty-seven of the twenty-eight are printed and one is not.** This copy
 * gives the western seven a sum for seven lodges, 八十三度九十五分, and lists
 * six: 參 is not between 觜 and the sum, nor after it. Its width here is what
 * the sum leaves, 83.95 less the six printed, and it is marked as derived
 * wherever it is used. The cost is stated with it: a quadrant whose seventh
 * entry is supplied by its sum can no longer be checked by that sum.
 *
 * **It is data for a value this engine declares and refuses**, `xiudu:
 * shoushi`. A table of widths is not yet a frame: the text makes these
 * numbers a function of a moment — 「依赤道及冬至歲差所在算定…各得當時宿度」 —
 * and gives the place of the solstice at its epoch and the yearly 歲差, and how
 * the table is carried from that epoch to a chart's instant is not settled.
 * See `docs/sources.md` § "The frame, which is twenty-eight stars and not a
 * table".
 */
export const SHOUSHI_XIUDU: Record<LodgeId, number> = {
  // 東方七宿, 七十八度一十二分.
  jiao: 12.87, kang: 9.56, di: 16.4, fang: 5.48, xin: 6.27, wei3: 17.95, ji: 9.59,
  // 北方七宿, 九十四度一十分七十五秒.
  dou: 23.47, niu: 6.9, nv: 11.12, xu: 9.0075, wei1: 15.95, shi: 18.32, bi13: 9.34,
  // 西方七宿, 八十三度九十五分 — 參 from the sum.
  kui: 17.87, lou: 12.36, wei4: 15.81, mao: 11.08, bi18: 16.5, zi: 0.05, shen: 10.28,
  // 南方七宿, 一百〇九度八分.
  jing: 31.03, gui: 2.11, liu: 13, xing: 6.31, zhang: 17.79, yi: 20.09, zhen: 18.75,
};

/** The lodge whose width the print does not carry and its quadrant's sum supplies. */
export const SHOUSHI_DERIVED: readonly LodgeId[] = ['shen'];

/** The four sums the text prints, each over its seven lodges. */
export const SHOUSHI_QUADRANTS: readonly { lodges: readonly LodgeId[]; sum: number }[] = [
  { lodges: ['jiao', 'kang', 'di', 'fang', 'xin', 'wei3', 'ji'], sum: 78.12 },
  { lodges: ['dou', 'niu', 'nv', 'xu', 'wei1', 'shi', 'bi13'], sum: 94.1075 },
  { lodges: ['kui', 'lou', 'wei4', 'mao', 'bi18', 'zi', 'shen'], sum: 83.95 },
  { lodges: ['jing', 'gui', 'liu', 'xing', 'zhang', 'yi', 'zhen'], sum: 109.08 },
];

/** 周天分: the circle the 授時曆 is built on, in its own 度. */
export const SHOUSHI_CIRCLE = 365.2575;

/**
 * What the same leaves say of the moment the table belongs to.
 *
 * The epoch is 至元辛巳, the winter solstice before it. The 箕 lodge ends, and
 * 斗 begins, 三十六分八十一秒 of ecliptic past that solstice: 「即為冬至後黃道
 * 積度三六八一」, from which the text takes 斗's own width, 「餘為斗二十三度
 * 四六五五」. And the solstice falls back against the lodges by 一分五十秒 a
 * year, 「積六十六年有奇而日退一度」, counted on the equator.
 */
export const SHOUSHI_EPOCH = {
  /** 冬至後黃道積度 of the boundary between 箕 and 斗, in 度. */
  douFromSolstice: 0.3681,
  /** 歲差, in 度 of the equator a year. */
  precession: 0.015,
} as const;
