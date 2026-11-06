import { beforeAll, describe, expect, it } from 'vitest';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { BRANCHES, type Branch } from '../src/ganzhi.js';
import {
  DEFAULT_QIZHENG_OPTIONS,
  LIMIT_YEARS,
  qizhengBoard,
  type QizhengOptions,
} from '../src/qizheng.js';
import { resolveTime } from '../src/time.js';

// The 命度 and the 大限 of a 七政四餘 board. See `docs/sources.md` § "《星學大成》
// 卷三 起大限's figures, and the 張果星宗's tables of the limits and the 量天尺".

let context: EphemerisContext;
beforeAll(() => {
  context = initEphemeris();
});

const branch = (hanzi: string): Branch => BRANCHES.find((b) => b.hanzi === hanzi) as Branch;
const at = (date: string, time: string) =>
  resolveTime({ date, time, timezone: 'Asia/Shanghai' }).time.julianDayUT;
const laid = (julianDay: number, hour: string, options: Partial<QizhengOptions> = {}) =>
  qizhengBoard(
    { julianDay, hour: branch(hour) },
    { ...DEFAULT_QIZHENG_OPTIONS, ...options },
    context,
  );

/** The Gregorian year a Julian Day falls in. */
const yearOf = (julianDay: number) => {
  const date = new Date((julianDay - 2440587.5) * 86400000);
  return date.getUTCFullYear();
};

// 《星度指南》 第七篇: 「男造光緒丙戌年十月十一日寅時生，立命辰宮，躔軫水四度」 —
// 1886-11-06 at Beijing. 「計歷十三日四時，折為四歲尚多一百六十日…又加起限十歲」;
// 「十六歲（辛丑）…起巳限」, 「二十六歲（辛亥），轉午限」, 「三十七歲（壬戌），轉未限」,
// 「五十二歲（丁丑），轉申限」. Its ages are counted with the year of the birth as one.
describe('《星度指南》’s 丙戌 case', () => {
  const julianDay = at('1886-11-06', '04:00');

  it('puts the 命 in 辰 and the 命度 at 軫四', () => {
    const board = laid(julianDay, '寅');
    expect(board.minggong.palace.hanzi).toBe('辰');
    expect(board.mingdu?.palace.hanzi).toBe('辰');
    expect(board.mingdu?.lodge.hanzi).toBe('軫');
    expect(Math.floor(board.mingdu?.lodgeDegree ?? -1)).toBe(4);
    // The 命度 is as far into the 命宮 as the Sun is into its own palace.
    expect(board.mingdu?.palaceDegree).toBeCloseTo(board.governors[0]!.palaceDegree, 9);
  });

  it('counts thirteen days and four 時 back to 霜降 under qixian: ri', () => {
    const board = laid(julianDay, '寅', { qixian: 'ri' });
    const days = ((board.limitStart as number) - 10) * 3;
    // 十三日四時: thirteen days and a third to a half of the fourteenth.
    expect(days).toBeGreaterThan(13 + 4 / 12);
    expect(days).toBeLessThan(13 + 5 / 12);
  });

  it('enters 巳, 午, 未 and 申 in the years the book gives', () => {
    const board = laid(julianDay, '寅', { qixian: 'ri' });
    const entry = (palace: string) => {
      const seat = board.houses.find((one) => one.palace.hanzi === palace);
      const from = seat?.limit?.from as number;
      return yearOf(julianDay + from * 365.2422) - 1886 + 1;
    };
    expect(board.houses.find((one) => one.palace.hanzi === '巳')?.house.id).toBe('xiangmao');
    expect([entry('巳'), entry('午'), entry('未'), entry('申')]).toEqual([16, 26, 37, 52]);
  });
});

describe('the count by degrees', () => {
  // 起大限法: 「隔三度以內為十一歲出限。隔六度以內為十二歲出限。隔三十度以內則為
  // 二十歲出限」. The Sun crosses 冬至 around 12-22 and is a few degrees on by
  // 12-25, and some twenty-eight degrees on by 01-18.
  it('opens at eleven just past a palace’s edge and at twenty near its end', () => {
    const early = laid(at('2025-12-24', '12:00'), '午');
    const late = laid(at('2026-01-18', '12:00'), '午');
    expect(early.governors[0]!.palaceDegree).toBeLessThan(3);
    expect(early.limitStart).toBe(11);
    expect(late.governors[0]!.palaceDegree).toBeGreaterThan(27);
    expect(late.limitStart).toBe(20);
  });

  it('gives the six palaces from 相貌 their years and leaves the rest open', () => {
    const board = laid(at('2026-08-15', '12:00'), '午');
    const start = board.limitStart as number;
    const ming = board.houses.find((seat) => seat.house.id === 'ming');
    expect(ming?.limit).toEqual({ from: 0, to: start });
    let from = start;
    for (const { house, years } of LIMIT_YEARS) {
      expect(board.houses.find((seat) => seat.house.id === house)?.limit).toEqual({
        from,
        to: from + years,
      });
      from += years;
    }
    expect(board.houses.filter((seat) => seat.limit === null).map((seat) => seat.house.id))
      .toEqual(['caibo', 'xiongdi', 'tianzhai', 'nannv', 'nupu']);
  });

  it('lays no 命度 and no limit under gong: ci', () => {
    const board = laid(at('2026-08-15', '12:00'), '午', { gong: 'ci' });
    expect(board.mingdu).toBeNull();
    expect(board.limitStart).toBeNull();
    expect(board.houses.every((seat) => seat.limit === null)).toBe(true);
  });
});
