import { describe, expect, it } from 'vitest';
import { LODGES } from '../src/almanac.js';
import {
  SHOUSHI_CIRCLE,
  SHOUSHI_DERIVED,
  SHOUSHI_QUADRANTS,
  SHOUSHI_XIUDU,
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
