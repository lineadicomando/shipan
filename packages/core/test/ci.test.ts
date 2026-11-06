import { beforeAll, describe, expect, it } from 'vitest';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { BRANCHES, type Branch } from '../src/ganzhi.js';
import {
  ciEntries,
  DEFAULT_QIZHENG_OPTIONS,
  lodgeBoundaries,
  qizhengBoard,
  standingOf,
  type QizhengOptions,
} from '../src/qizheng.js';
import { SHOUSHI_CI_ENTRY, SHOUSHI_CIRCLE, shoushiBoundaries } from '../src/shoushi.js';
import { LODGES, type LodgeId } from '../src/almanac.js';
import { resolveTime } from '../src/time.js';

// `gong: ci`, the palaces cut in 宿度 by the 授時 table that 《星學大成》卷一 and
// 《張果星宗》卷567 both print. See `docs/sources.md` § "《星學大成》卷三
// 起大限's figures, and the 張果星宗's tables of the limits and the 量天尺".

let context: EphemerisContext;
beforeAll(() => {
  context = initEphemeris();
});

/** 至元辛巳's solstice, the moment the table is drawn for. */
const EPOCH = 2188925.2465;
const toDegrees = (du: number) => (du * 360) / SHOUSHI_CIRCLE;
const branch = (hanzi: string): Branch => BRANCHES.find((b) => b.hanzi === hanzi) as Branch;
const lodgeIndex = (id: LodgeId) => LODGES.findIndex((one) => one.id === id);

/** A point given as a lodge and a 度 past its star, in the 授時 frame at the epoch. */
const point = (lodge: LodgeId, du: number) => {
  const boundaries = shoushiBoundaries(EPOCH);
  return (boundaries[lodgeIndex(lodge)] as number) + toDegrees(du);
};
const palaceAt = (lodge: LodgeId, du: number) => {
  const boundaries = shoushiBoundaries(EPOCH);
  return standingOf(point(lodge, du), boundaries, ciEntries(boundaries)).palace.hanzi;
};

describe('the 次 at the table’s own epoch', () => {
  it('gives facing palaces equal widths, as palaces equal on the equator must', () => {
    const entries = ciEntries(shoushiBoundaries(EPOCH));
    // A palace runs from its own entry to the entry of the branch before it.
    const width = (index: number) =>
      (((entries[(index + 11) % 12] as number) - (entries[index] as number)) % 360 + 360) % 360;
    for (let index = 0; index < 6; index += 1) {
      expect(Math.abs(width(index) - width(index + 6))).toBeLessThan(0.02);
    }
    const total = BRANCHES.reduce((sum, _, index) => sum + width(index), 0);
    expect(total).toBeCloseTo(360, 6);
  });

  it('opens each palace at the lodge and degree the table prints', () => {
    const boundaries = shoushiBoundaries(EPOCH);
    const entries = ciEntries(boundaries);
    SHOUSHI_CI_ENTRY.forEach(({ lodge, du }, index) => {
      const just = standingOf((entries[index] as number) + 1e-6, boundaries, entries);
      expect(just.palace.index).toBe(index);
      expect(just.lodge.id).toBe(lodge);
      expect(just.lodgeDegree).toBeCloseTo(toDegrees(du), 4);
      expect(just.palaceDegree).toBeLessThan(1e-4);
    });
  });

  // 起大限: 「如立命在子，女二女三女四共三度起十一歲」 — 子 counted from 女二.
  it('opens 子 at 女二, as 起大限 counts it', () => {
    expect(palaceAt('nv', 2.5)).toBe('子');
    expect(palaceAt('nv', 1.5)).toBe('丑');
  });

  // 定限度法: 星五 is in 午's fifth row, 張十一 to 十三 in its tenth — so all of
  // them in 午. The first copy's 張十四度三十六分 would have put 張十四度半 in 巳.
  it('keeps 星五 and 張十一 to 十三 in 午, as 定限度法 casts the limits', () => {
    expect(palaceAt('xing', 5)).toBe('午');
    for (const du of [11, 12, 13, 14.5]) expect(palaceAt('zhang', du)).toBe('午');
    expect(palaceAt('zhang', 15.5)).toBe('巳');
  });
});

describe('a board laid with gong: ci', () => {
  const julianDay = resolveTime({ date: '2026-08-15', time: '12:00', timezone: 'Asia/Shanghai' })
    .time.julianDayUT;
  const laid = (options: Partial<QizhengOptions>) =>
    qizhengBoard(
      { julianDay, hour: branch('午') },
      { ...DEFAULT_QIZHENG_OPTIONS, ...options },
      context,
    );

  it.each(['juxing', 'shoushi'] as const)(
    'stands every body in the palace whose entry is nearest behind it, under xiudu: %s',
    (xiudu) => {
      const board = laid({ gong: 'ci', xiudu });
      const boundaries =
        xiudu === 'shoushi' ? shoushiBoundaries(julianDay) : lodgeBoundaries(julianDay, context);
      const entries = ciEntries(boundaries);
      for (const one of [...board.governors, ...board.remainders]) {
        if (one.resolution !== 'degree') continue;
        const entry = entries[one.palace.index] as number;
        expect((((one.longitude - entry) % 360) + 360) % 360).toBeCloseTo(one.palaceDegree, 9);
        expect(one.palaceDegree).toBeLessThan(34);
      }
    },
  );

  it('moves the palaces and nothing else', () => {
    const zhongqi = laid({});
    const ci = laid({ gong: 'ci' });
    zhongqi.governors.forEach((one, index) => {
      const other = ci.governors[index];
      expect(other?.longitude).toBe(one.longitude);
      expect(other?.lodge.id).toBe(one.lodge.id);
    });
    // The 命宮 follows the Sun's palace under either cut.
    expect(ci.minggong.palace.index).toBe(
      (ci.governors[0]!.palace.index + 3 - branch('午').index + 12) % 12,
    );
    // 紫氣 is a palace counted from a palace, and the cut does not move it.
    const ziqi = (board: typeof ci) => board.remainders.find((one) => one.body.id === 'ziqi');
    expect(ziqi(ci)?.palace.index).toBe(ziqi(zhongqi)?.palace.index);
    expect(ci.options.gong).toBe('ci');
  });
});
