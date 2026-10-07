import { LODGES, type LodgeId } from './almanac.js';

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
 * **It is the check and not the input.** `xiudu: shoushi` lays its frame by
 * the work's own method — `shoushiBoundaries` — from the equatorial widths
 * below, and at the epoch that method has to give this table back. A test
 * holds it to that, lodge by lodge.
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
 * 授時曆's 赤道宿次 — the width of each lodge along the equator.
 *
 * The same 卷二, leaves 十三 to 十四: all twenty-eight printed, 參 among them,
 * with a running sum beside each and its distance past the last of the four
 * 正. The four quadrants are 七十九度二十分, 九十三度八十分七十五秒, 八十三度
 * 八十五分 and, by what is left of the circle, 一百〇八度四十分.
 */
export const SHOUSHI_EQUATOR: Record<LodgeId, number> = {
  jiao: 12.1, kang: 9.2, di: 16.3, fang: 5.6, xin: 6.5, wei3: 19.1, ji: 10.4,
  dou: 25.2, niu: 7.2, nv: 11.35, xu: 8.9575, wei1: 15.4, shi: 17.1, bi13: 8.6,
  kui: 16.6, lou: 11.8, wei4: 15.6, mao: 11.3, bi18: 17.4, zi: 0.05, shen: 11.1,
  jing: 33.3, gui: 2.2, liu: 13.3, xing: 6.3, zhang: 17.25, yi: 18.75, zhen: 17.3,
};

/**
 * The constants the method is worked with, each as the text prints it.
 *
 * - 周天 365.2575 and 歲周 365.2425 at the epoch, whose difference is the
 *   歲差, 一分五十秒 a year: 「積六十六年有奇而日退一度」.
 * - 「上下消長」: for every hundred years from the epoch the 歲周 gives up one
 *   秒 and the 周天 takes it, so the 歲差 grows by two — the work finds
 *   一分五十六秒 three hundred and sixty-seven years on — and 「凡上下消長皆從
 *   虛度」, the change is put on 虛.
 * - The diameter 121.75 and the 黃赤道大股 56.0268, read off the worked step
 *   of 卷三: 「置半徑內減矢四度八四八二，餘五十六度〇二六八」 at 二十四度.
 * - At the solstice before 至元辛巳 the Sun stands at 箕十度 of the equator,
 *   四十分 short of the end of that lodge.
 */
const ZHOUTIAN = 365.2575;
const SUIZHOU = 365.2425;
const DIAMETER = 121.75;
const RADIUS = DIAMETER / 2;
const DAGU = 56.0268;
const JI_LEFT_AT_EPOCH = 0.4;

/**
 * The winter solstice before 至元辛巳, as the sky has it: 14 December 1280 by
 * the Julian calendar. The 曆 reckons its own instant from its 氣應; what is
 * wanted here is only how many years a chart stands from the epoch, and a few
 * hours either way move the frame by nothing that can be printed.
 */
const EPOCH_JULIAN_DAY = 2188925.2465;

/**
 * 弧矢割圓 — the equatorial arc that answers an ecliptic arc counted from a
 * solstice, by the 推經度黃赤道率術 of 卷三.
 *
 * 「置周天半徑減黃道矢，餘為黃赤道小弦；以黃赤道大股乘黃赤道小弦，用黃赤道大弦
 * 而一，為黃赤道小股。置黃道矢自之，以周徑而一，所得為黃道背弦差，去減黃道半弧
 * 背，餘為黃道半弧弦。置黃道半弧弦自之，黃赤道小股自之，相併，以平方開之，得赤
 * 道小弦。置黃道半弧弦，以半徑乘之為實，以赤道小弦而一，為赤道…半弧弦」, and
 * the arc is taken back from its half-chord the way the half-chord was taken
 * from the arc.
 *
 * It is the text's geometry and not the sphere's: an arc is its chord plus
 * the square of its sagitta over the diameter, on a circle three diameters
 * round. It gives 一度〇八六五 for the first degree where trigonometry gives
 * 1.0909, and the text's figure is the one a 授時 frame is made of.
 */
function equatorialArc(ecliptic: number): number {
  if (ecliptic <= 0) return 0;
  // The sagitta of an arc, by bisection on the text's own relation between
  // the two: 半弧背 = 半弧弦 + 矢² ⁄ 徑, with 半弧弦² = 矢 × (徑 − 矢).
  let low = 0;
  let high = RADIUS;
  for (let step = 0; step < 80; step += 1) {
    const sagitta = (low + high) / 2;
    const arc = Math.sqrt(sagitta * (DIAMETER - sagitta)) + (sagitta * sagitta) / DIAMETER;
    if (arc < ecliptic) low = sagitta;
    else high = sagitta;
  }
  const sagitta = (low + high) / 2;
  const halfChord = Math.sqrt(sagitta * (DIAMETER - sagitta));
  const smallLeg = ((RADIUS - sagitta) * DAGU) / RADIUS;
  const equatorHalfChord = (halfChord * RADIUS) / Math.hypot(halfChord, smallLeg);
  const equatorSagitta = RADIUS - Math.sqrt(RADIUS * RADIUS - equatorHalfChord ** 2);
  return equatorHalfChord + equatorSagitta ** 2 / DIAMETER;
}

/**
 * 黃赤道率 — the equatorial 積度 under each whole ecliptic degree from a
 * solstice, which is the table the text converts through: 一度〇八六五 under
 * the first, 二度一七二八 under the second, 二十四度七二二二 under the
 * twenty-third. Built once, by the method above, and it agrees with every
 * figure the text prints to the fourth place or one unit of it.
 */
const JIDU: readonly number[] = Array.from({ length: 94 }, (_, degree) => equatorialArc(degree));

/**
 * An equatorial distance past a solstice, as ecliptic: 「以其赤道積度減之，餘以
 * 黃道率乘之，如赤道率而一，所得以加黃道積度」.
 */
function afterSolstice(equator: number): number {
  let degree = 0;
  while (degree < 92 && (JIDU[degree + 1] as number) <= equator) degree += 1;
  const rate = (JIDU[degree + 1] as number) - (JIDU[degree] as number);
  return degree + (equator - (JIDU[degree] as number)) / rate;
}

/**
 * The same past an equinox, where the two circles change places: 「每正初日則
 * 黃赤道同度」, and from there it is the ecliptic that runs ahead.
 */
function afterEquinox(equator: number): number {
  const degree = Math.floor(equator);
  const rate = (JIDU[degree + 1] as number) - (JIDU[degree] as number);
  return (JIDU[degree] as number) + (equator - degree) * rate;
}

/** Where 授時's reckoning stands at an instant: the circle, the year, and how far the solstice has fallen back. */
function reckoningAt(julianDayUT: number): { circle: number; year: number; retreat: number } {
  const years = (julianDayUT - EPOCH_JULIAN_DAY) / SUIZHOU;
  const forward = years >= 0;
  const span = Math.abs(years);
  const centuries = Math.floor(span / 100);
  const sign = forward ? 1 : -1;

  // 歲差 a year in each century from the epoch, and what it has come to.
  let retreat = 0;
  for (let century = 0; century <= centuries; century += 1) {
    const yearsIn = century < centuries ? 100 : span - centuries * 100;
    retreat += yearsIn * (ZHOUTIAN - SUIZHOU + sign * 0.0002 * century);
  }

  return {
    circle: ZHOUTIAN + sign * 0.0001 * centuries,
    year: SUIZHOU - sign * 0.0001 * centuries,
    retreat: sign * retreat,
  };
}

/**
 * How far past the winter solstice each lodge ends, along the ecliptic, in 度
 * — the 黃道積度 the text builds its table from.
 *
 * 「置四正赤道宿全度，以所推四正赤道日度及分減之，餘為距後度，以赤道宿度累加之，
 * 各得四正後赤道宿積度」: the solstice's distance from the end of its lodge,
 * then the equatorial widths added one by one, each sum taken from whichever
 * of the four 正 it has passed and turned into ecliptic there.
 */
function eclipticEnds(julianDayUT: number): {
  ends: Map<LodgeId, number>;
  douOpens: number;
  year: number;
} {
  const { circle, year, retreat } = reckoningAt(julianDayUT);
  const quadrant = year / 4;
  const order = [...LODGES.slice(7), ...LODGES.slice(0, 7)].map((lodge) => lodge.id);

  // From 斗, the lodge after the one the solstice stood in at the epoch.
  let equator = (((JI_LEFT_AT_EPOCH + retreat) % circle) + circle) % circle;
  // Counted on past the next solstice where it has to be: 箕 closes the circle
  // 「冬至後初度四一五」 into the following year, a 歲差 further than it opened.
  const toEcliptic = (distance: number): number => {
    const passed = Math.floor(distance / quadrant);
    const past = distance - passed * quadrant;
    return passed * quadrant + (passed % 2 === 0 ? afterSolstice(past) : afterEquinox(past));
  };

  const douOpens = toEcliptic(equator);
  const ends = new Map<LodgeId, number>();
  for (const id of order) {
    // 「凡上下消長皆從虛度」: what the circle has gained or lost is 虛's.
    const width = SHOUSHI_EQUATOR[id] + (id === 'xu' ? circle - ZHOUTIAN : 0);
    equator += width;
    ends.set(id, toEcliptic(equator));
  }
  return { ends, douOpens, year };
}

/**
 * 授時's 黃道宿次 at an instant, recomputed by its method: 「各得當時宿度」.
 *
 * At the epoch this is the table the text prints, to the 分. Away from it the
 * widths move a little, which is what the text says they do.
 */
export function shoushiWidths(julianDayUT: number = EPOCH_JULIAN_DAY): Record<LodgeId, number> {
  const { ends, douOpens } = eclipticEnds(julianDayUT);
  const widths = {} as Record<LodgeId, number>;
  LODGES.forEach((lodge, index) => {
    const previous = LODGES[(index + 27) % 28] as (typeof LODGES)[number];
    const opens = lodge.id === 'dou' ? douOpens : (ends.get(previous.id) as number);
    widths[lodge.id] = (ends.get(lodge.id) as number) - opens;
  });
  return widths;
}

/**
 * The longitude at which each 宿 begins under `xiudu: shoushi`, aligned with
 * `LODGES`, in the degrees every other longitude here is in.
 *
 * The 曆 counts from the winter solstice in 度 of which a year of the Sun
 * holds 歲周, so a 度 past the solstice is 360 ⁄ 歲周 of a degree past 270°.
 * A lodge begins where the one before it ends.
 */
export function shoushiBoundaries(julianDayUT: number): readonly number[] {
  const { ends, douOpens, year } = eclipticEnds(julianDayUT);
  return LODGES.map((lodge, index) => {
    const previous = LODGES[(index + 27) % 28] as (typeof LODGES)[number];
    const past = lodge.id === 'dou' ? douOpens : (ends.get(previous.id) as number);
    return (((270 + (past * 360) / year) % 360) + 360) % 360;
  });
}

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
