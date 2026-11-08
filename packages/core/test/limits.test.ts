import { beforeAll, describe, expect, it } from 'vitest';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { BRANCHES, type Branch } from '../src/ganzhi.js';
import {
  ciEntries,
  DEFAULT_QIZHENG_OPTIONS,
  LIMIT_YEARS,
  qizhengBoard,
  type QizhengOptions,
} from '../src/qizheng.js';
import { SHOUSHI_CIRCLE, shoushiBoundaries } from '../src/shoushi.js';
import { LODGES } from '../src/almanac.js';
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

});

// The 量天尺 under `gong: ci`: 《張果星宗》 卷569 授時過宮度, 集成 第468冊 djvu
// p. 45, transcribed 2026-11-08 (`docs/sources.md` § "The 量天尺 of the 張果星宗,
// transcribed"). A row is a palace walked from its far end, column 1 the
// degree furthest from the next branch and column 30 the one it is entered
// from; a lodge is named where it changes, and · is a cell not read. One
// copy, 授時過宮度's, with the other copy's reading where this one is blank.
const RULER: Record<string, string> = {
  子: '危11 10 9 8 7 6 5 4 3 2 1 虛· 8 7 6 5 4 3 2 1 0 女10 9 8 7 6 5 4 3 2',
  丑: '女1 0 牛6 5 4 3 2 1 0 斗23 22 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3',
  寅: '斗1 1 0 箕10 9 8 7 6 5 4 3 2 1 0 尾18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3',
  卯: '尾1 1 心6 5 4 3 2 1 房5 4 3 2 1 0 氐16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1',
  辰: '氐0 亢9 8 7 6 5 4 3 2 1 角12 11 10 9 8 7 6 5 4 3 2 1 軫17 16 15 14 13 12 11 10',
  巳: '軫9 8 7 6 5 4 3 2 1 翼19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 張16 15',
  午: '張14 13 12 11 10 9 8 7 6 5 4 3 2 1 星· 5 4 3 2 1 柳13 12 11 10 9 8 7 6 5 4',
  未: '柳2 2 1 0 鬼1 1 0 井30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 9 8',
  申: '井7 6 5 4 3 2 1 0 參· 9 8 7 6 5 4 3 2 1 觜0 畢16 15 14 13 12 11 10 9 8 7 6',
  酉: '畢5 4 3 2 1 0 昴10 9 8 7 6 5 4 3 2 1 0 胃15 14 13 12 11 10 9 8 7 6 5 4 3',
  戌: '胃1 1 婁12 11 10 9 8 7 6 5 4 3 2 1 奎16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1',
  亥: '奎0 壁8 7 6 5 4 3 2 1 室17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 危15 14 13 12',
};

/** 至元辛巳's solstice, the moment the 授時 table is drawn for. */
const EPOCH = 2188925.2465;
const DU = 360 / SHOUSHI_CIRCLE;

/** The thirtieth `column` stands for, as longitudes, in a palace from its entry. */
const thirtieth = (entries: readonly number[], index: number, column: number) => {
  const entry = entries[index] as number;
  const width = ((((entries[(index + 11) % 12] as number) - entry) % 360) + 360) % 360;
  return { from: entry + ((30 - column) * width) / 30, to: entry + ((31 - column) * width) / 30 };
};

describe('the 量天尺 under gong: ci', () => {
  const boundaries = shoushiBoundaries(EPOCH);
  const entries = ciEntries(boundaries);

  it('prints each whole degree within a degree of the thirtieth of the palace it stands for', () => {
    let read = 0;
    let overlapping = 0;
    BRANCHES.forEach((palace, index) => {
      const cells = (RULER[palace.hanzi] as string).split(' ');
      expect(cells).toHaveLength(30);
      let lodge = '';
      cells.forEach((cell, at) => {
        const named = /^\D/.test(cell) && cell !== '·' ? cell[0]! : '';
        if (named) lodge = named;
        const digits = named ? cell.slice(1) : cell;
        if (digits === '·') return;
        const start = boundaries[LODGES.findIndex((one) => one.hanzi === lodge)] as number;
        // The whole degree, as longitudes, brought next to the palace.
        let from = start + Number(digits) * DU;
        const { from: lo, to: hi } = thirtieth(entries, index, at + 1);
        from += Math.round((lo - from) / 360) * 360;
        const to = from + DU;
        const apart = Math.max(0, lo - to, from - hi);
        expect(apart / DU).toBeLessThan(0.9);
        read += 1;
        if (apart === 0) overlapping += 1;
      });
    });
    expect(read).toBe(357);
    expect(overlapping / read).toBeGreaterThan(0.9);
  });

  // The nine rows under it: 相貌 from twenty in columns 1–3 to eleven in 28–30.
  it.each([0, 9, 17, 26])('lays the 命度 on the Sun’s column and opens 相貌 at its age, %i days on', (days) => {
    for (const hour of BRANCHES) {
      const board = laid(EPOCH + days, hour.hanzi, { gong: 'ci', xiudu: 'shoushi' });
      const sun = board.governors[0]!;
      const today = ciEntries(shoushiBoundaries(EPOCH + days));
      const share = (palace: Branch, degree: number) => {
        const { from, to } = thirtieth(today, palace.index, 30);
        return degree / ((to - from) * 30);
      };
      const column = 30 - Math.floor(share(sun.palace, sun.palaceDegree) * 30);
      expect(board.mingdu.palace.index).toBe(board.minggong.palace.index);
      expect(share(board.mingdu.palace, board.mingdu.palaceDegree)).toBeCloseTo(
        share(sun.palace, sun.palaceDegree),
        6,
      );
      expect(board.limitStart).toBe(20 - Math.floor((column - 1) / 3));
    }
  });

  it('lays the 命度 and no limit under qixian: ri, which no text counts across the 次', () => {
    const board = laid(at('2026-08-15', '12:00'), '午', { gong: 'ci', qixian: 'ri' });
    expect(board.mingdu.palace.index).toBe(board.minggong.palace.index);
    expect(board.limitStart).toBeNull();
    expect(board.houses.every((seat) => seat.limit === null)).toBe(true);
  });
});
