import { describe, expect, it } from 'vitest';
import { hexagramOf, hexagramOfSeats } from '../src/dunjia/hexagram.js';
import { GATES } from '../src/dunjia/plates.js';
import { PALACES } from '../src/dunjia/palaces.js';

/**
 * The gate over the palace, named.
 *
 * The rule is 《奇門探索錄》卷十一 八門三合's — the gate's trigram above, the
 * palace's below — and the arrangement of the sixty-four is the 周易's, which
 * this engine borrows entire and does not derive. So there are two things to
 * assert and they are different in kind: that the table *is* the received one,
 * which is a closed arithmetic, and that the orientation is the chapter's,
 * which is a reading and stands on eight cells taken off the plate.
 */
describe('the hexagram of a gate over a palace', () => {
  const TRIGRAMS = ['qian', 'dui', 'li', 'zhen', 'xun', 'kan', 'gen', 'kun'] as const;

  it('is the received table, complete and without repetition', () => {
    const all = TRIGRAMS.flatMap((upper) =>
      TRIGRAMS.map((lower) => hexagramOf(upper, lower)?.number),
    );
    expect(new Set(all).size).toBe(64);
    expect([...all].sort((a, b) => (a as number) - (b as number))).toEqual(
      Array.from({ length: 64 }, (_, index) => index + 1),
    );
  });

  it('doubles each trigram onto its own hexagram', () => {
    // 乾 over 乾 is 乾, 坤 over 坤 is 坤, and the six between them likewise:
    // eight cells of the diagonal whose answer nobody disputes.
    const doubled = [1, 58, 30, 51, 57, 29, 52, 2];
    for (const [index, trigram] of TRIGRAMS.entries()) {
      expect(hexagramOf(trigram, trigram)?.number, trigram).toBe(doubled[index]);
    }
  });

  it('draws each one with the figure the number gives', () => {
    // U+4DC0 is the first, so the sixty-four run to U+4DFF with none left.
    for (const upper of TRIGRAMS) {
      for (const lower of TRIGRAMS) {
        const found = hexagramOf(upper, lower);
        expect(found?.symbol).toBe(String.fromCodePoint(0x4dbf + (found?.number as number)));
      }
    }
  });

  /**
   * The eight read on the plate: 《奇門探索錄》卷十一, 《秘傳奇門十種》,
   * 華齡出版社 2012, sheets 189 to 215. They are what fixes the orientation —
   * which trigram goes above — and nothing else here can.
   */
  it('puts the gate above and the palace below, as the eight read cells have it', () => {
    const plate: [string, number, string][] = [
      ['dumen', 1, '渙'],
      ['dumen', 2, '觀'],
      ['jing3men', 2, '晉'],
      ['simen', 4, '升'],
      ['simen', 1, '師'],
      ['simen', 7, '臨'],
      ['simen', 6, '泰'],
      ['kaimen', 4, '姤'],
    ];
    for (const [gateId, standingOn, hanzi] of plate) {
      const gate = GATES.find((one) => one.id === gateId);
      expect(gate, gateId).toBeDefined();
      expect(hexagramOfSeats((gate as { home: number }).home, standingOn)?.hanzi).toBe(hanzi);
    }
  });

  it('gives the centre none, having neither gate nor trigram', () => {
    expect(hexagramOf('zhong', 'kan')).toBeUndefined();
    expect(hexagramOf('kan', 'zhong')).toBeUndefined();
    expect(hexagramOfSeats(1, 5)).toBeUndefined();
  });

  it('names one for every gate on every outer palace, and no more', () => {
    const outer = PALACES.filter((one) => one.number !== 5);
    const named = GATES.flatMap((gate) =>
      outer.map((one) => hexagramOfSeats(gate.home, one.number)?.number),
    );
    expect(named.filter((one) => one !== undefined)).toHaveLength(64);
    expect(new Set(named).size).toBe(64);
  });
});
