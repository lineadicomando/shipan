import { describe, expect, it } from 'vitest';
import { LODGES } from '../src/almanac.js';
import {
  SHOUSHI_CIRCLE,
  SHOUSHI_DERIVED,
  SHOUSHI_EQUATOR,
  SHOUSHI_QUADRANTS,
  SHOUSHI_XIUDU,
  shoushiBoundaries,
  shoushiWidths,
} from '../src/shoushi.js';

/**
 * The 授時 table checking itself.
 *
 * 《授時曆故》卷二 prints a sum under each quadrant, and the four sums are the
 * 曆's own 周天分. A transcription that closes on all five was read right, and
 * that is the whole of what stands behind these numbers: one text, checking
 * itself — which is what found 虛's 「九　七十五秒」 in the first place.
 */
describe('授時曆 黃道宿次', () => {
  const total = (lodges: readonly string[]) =>
    lodges.reduce((sum, id) => sum + SHOUSHI_XIUDU[id as keyof typeof SHOUSHI_XIUDU], 0);

  it('gives a width to every lodge', () => {
    expect(Object.keys(SHOUSHI_XIUDU).sort()).toEqual(LODGES.map((lodge) => lodge.id).sort());
  });

  it.each(SHOUSHI_QUADRANTS)('closes a quadrant on the sum the text prints: $sum', (quadrant) => {
    expect(quadrant.lodges).toHaveLength(7);
    expect(total(quadrant.lodges)).toBeCloseTo(quadrant.sum, 4);
  });

  it('closes the four sums on the 周天分', () => {
    expect(SHOUSHI_QUADRANTS.reduce((sum, quadrant) => sum + quadrant.sum, 0)).toBeCloseTo(
      SHOUSHI_CIRCLE,
      4,
    );
    expect(total(Object.keys(SHOUSHI_XIUDU))).toBeCloseTo(SHOUSHI_CIRCLE, 4);
  });

  it('marks the one width the print does not carry', () => {
    // 參 is what the western sum leaves once the six printed are taken off,
    // so that quadrant closes by construction and proves nothing about it.
    expect(SHOUSHI_DERIVED).toEqual(['shen']);
    const printed = SHOUSHI_QUADRANTS[2]!.lodges.filter((id) => id !== 'shen');
    expect(total(printed)).toBeCloseTo(73.67, 4);
    expect(SHOUSHI_XIUDU.shen).toBeCloseTo(83.95 - 73.67, 4);
  });

  it('opens 斗 where the worked step puts it', () => {
    // 「共得二十三度八三三六，以前宿黃道積度箕宿三六八一減之，餘為斗二十三度
    // 四六五五」 — the table prints it rounded to the 分.
    expect(23.8336 - 0.3681).toBeCloseTo(23.4655, 4);
    expect(SHOUSHI_XIUDU.dou).toBeCloseTo(23.4655, 2);
  });
});

/**
 * The frame laid by the work's own method.
 *
 * 《授時曆故》 does not ask to be believed about its ecliptic table: it prints
 * the equatorial widths, the method that turns them into ecliptic ones, and
 * the result. So the method is implemented and held to the result — which is
 * the strongest check a single text can give of itself, and the only one this
 * value has.
 */
describe('授時曆 黃道宿次, recomputed from the equator', () => {
  /** The winter solstice before 至元辛巳. */
  const EPOCH = 2188925.2465;

  it('closes the equatorial widths on the same circle', () => {
    const quadrant = (ids: readonly string[]) =>
      ids.reduce((sum, id) => sum + SHOUSHI_EQUATOR[id as keyof typeof SHOUSHI_EQUATOR], 0);
    // 「右東方七宿七十九度二十分」, 「右北方七宿九十三度八十分七十五秒」,
    // 「右西方七宿八十三度八十五分」; the south is what is left.
    expect(quadrant(SHOUSHI_QUADRANTS[0]!.lodges)).toBeCloseTo(79.2, 4);
    expect(quadrant(SHOUSHI_QUADRANTS[1]!.lodges)).toBeCloseTo(93.8075, 4);
    expect(quadrant(SHOUSHI_QUADRANTS[2]!.lodges)).toBeCloseTo(83.85, 4);
    expect(quadrant(Object.keys(SHOUSHI_EQUATOR))).toBeCloseTo(SHOUSHI_CIRCLE, 4);
  });

  it('gives the printed table back at the epoch, every lodge within a 分', () => {
    const computed = shoushiWidths(EPOCH);
    for (const lodge of LODGES) {
      expect(
        Math.abs(computed[lodge.id] - SHOUSHI_XIUDU[lodge.id]),
        `${lodge.hanzi}: ${computed[lodge.id].toFixed(4)} against ${SHOUSHI_XIUDU[lodge.id]}`,
      ).toBeLessThan(0.01);
    }
  });

  it('gives 參 by the method what the western sum left for it', () => {
    // The one width this copy does not print: 10.28 by subtraction, and the
    // method reaches it from the equatorial 參十一度一十分 on its own.
    expect(shoushiWidths(EPOCH).shen).toBeCloseTo(10.28, 2);
  });

  it('opens 斗 三十六分八十一秒 past the solstice', () => {
    // 「即為冬至後黃道積度三六八一」. In degrees: 270° and that much of a year.
    const dou = LODGES.findIndex((lodge) => lodge.id === 'dou');
    expect(shoushiBoundaries(EPOCH)[dou]).toBeCloseTo(270 + (0.3681 * 360) / 365.2425, 3);
  });

  it('lets the solstice fall back a 度 in sixty-six years and some', () => {
    // 「積六十六年有奇而日退一度」: the lodges move forward against the
    // solstice by that much, here read at 斗.
    const dou = LODGES.findIndex((lodge) => lodge.id === 'dou');
    const later = shoushiBoundaries(EPOCH + 66.67 * 365.2425)[dou] as number;
    const moved = ((later - (shoushiBoundaries(EPOCH)[dou] as number)) * 365.2425) / 360;
    // A 度 of equator is a little less of ecliptic this close to a solstice.
    expect(moved).toBeGreaterThan(0.9);
    expect(moved).toBeLessThan(1.0);
  });

  it('keeps twenty-eight lodges in order round the whole circle, at any date', () => {
    for (const julianDay of [EPOCH - 400 * 365.2425, EPOCH, 2460310.5]) {
      const starts = shoushiBoundaries(julianDay);
      const steps = starts.map((start, index) => {
        const next = starts[(index + 1) % 28] as number;
        return (((next - start) % 360) + 360) % 360;
      });
      expect(steps.every((step) => step > 0 && step < 35)).toBe(true);
      expect(steps.reduce((sum, step) => sum + step, 0)).toBeCloseTo(360, 6);
    }
  });
});

