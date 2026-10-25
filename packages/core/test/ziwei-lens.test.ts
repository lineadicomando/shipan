import { describe, expect, it } from 'vitest';
import { initEphemeris } from '../src/ephemeris.js';
import { BRANCHES } from '../src/ganzhi.js';
import { resolveMoment } from '../src/pillars.js';
import { DEFAULT_OPTIONS, type ChartOptions, type Place } from '../src/types.js';
import { DEFAULT_ZIWEI_OPTIONS, ZIWEI_STARS, computeZiwei, type ZiweiBoard } from '../src/ziwei/index.js';
import { ZIWEI_LAYERS, ZIWEI_LENS_LAYERS, ziweiLens } from '../src/ziwei/lens.js';

const context = initEphemeris();
const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
const CLOCK: ChartOptions = { ...DEFAULT_OPTIONS, trueSolarTime: false, dayBoundary: 'midnight' };

const board = (date: string, time: string): ZiweiBoard =>
  computeZiwei(
    resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, CLOCK, context),
    { ...DEFAULT_ZIWEI_OPTIONS, gender: 'female' },
  );

describe('the relations a lens may show on a 紫微斗數 board', () => {
  it('describes the board as the drawing marks it, the stars alone with a phase', () => {
    const lens = ziweiLens(board('1990-06-01', '08:00'));
    expect(lens.board).toBe('ziwei');
    expect(lens.layers).toEqual(ZIWEI_LAYERS);
    expect(lens.phased).toEqual(ZIWEI_LENS_LAYERS);
    expect(lens.crowded).toEqual(ZIWEI_LENS_LAYERS);
    expect(lens.pairSeats).toEqual(BRANCHES.map((branch) => branch.id));
    expect(lens.linkIds).toEqual(['sanfang', 'duigong']);
  });

  it('lists every star with one phase where it stands, and none with two or none', () => {
    // The three the book gives two phases, and so a lens none.
    const doubled = ZIWEI_STARS.filter((star) => star.elements.length === 2).map((star) => star.id);
    expect(doubled.sort()).toEqual(['qisha', 'tanlang', 'tiantong']);

    for (const [date, time] of [
      ['1990-06-01', '08:00'],
      ['1984-02-02', '23:30'],
      ['2001-11-11', '13:00'],
    ] as const) {
      const laid = board(date, time);
      const { things } = ziweiLens(laid);
      for (const palace of laid.palaces) {
        for (const { star } of palace.stars) {
          const listed = things.find((thing) => thing.id === star.id);
          if (star.elements.length !== 1) {
            expect(listed, star.id).toBeUndefined();
            continue;
          }
          expect(listed).toEqual({
            seat: palace.branch.id,
            layer: star.starClass === 'main' ? 'star' : 'minor',
            id: star.id,
            element: star.elements[0],
          });
        }
      }
      // A star stands in one palace, so its identifier names one thing.
      expect(new Set(things.map((thing) => thing.id)).size).toBe(things.length);
    }
  });
});

describe('三方 and 對宮 on a 紫微斗數 board', () => {
  const ids = BRANCHES.map((branch) => branch.id);
  const lens = ziweiLens(board('1990-06-01', '08:00'));
  const across = (relation: string, seat: string) =>
    lens.links
      .filter((link) => link.relation === relation && (link.a.seat === seat || link.b.seat === seat))
      .map((link) => (link.a.seat === seat ? link.b.seat : link.a.seat))
      .sort();

  it('links each palace to the two of its triad and to the one facing it, each pair once', () => {
    expect(lens.links.filter((link) => link.relation === 'sanfang')).toHaveLength(12);
    expect(lens.links.filter((link) => link.relation === 'duigong')).toHaveLength(6);
    for (const [index, seat] of ids.entries()) {
      expect(across('sanfang', seat)).toEqual([ids[(index + 4) % 12], ids[(index + 8) % 12]].sort());
      expect(across('duigong', seat)).toEqual([ids[(index + 6) % 12]]);
    }
    expect(lens.links.every((link) => link.between === 'seats' && link.a.layer === 'house')).toBe(true);
  });

  it("makes 卯, 未 and 巳 the 三方四正 of 亥, as 卷三's worked case calls them", () => {
    // 「小限又行在亥…擎羊又在卯宮，却是三方四正俱見擎羊、流羊、流陀」, the 流羊 in
    // 未 and the 流陀 in 巳 on a 己丑 year.
    expect([...across('sanfang', 'hai'), ...across('duigong', 'hai')].sort()).toEqual(['mao', 'si', 'wei']);
  });

  it('makes 財帛, 官祿 and 遷移 the 三方四正 of the life palace, as 譚星要論 names them', () => {
    const laid = board('1990-06-01', '08:00');
    const seatOf = (house: string) => laid.palaces.find((palace) => palace.house.id === house)?.branch.id as string;
    const life = seatOf('ming');
    expect(across('sanfang', life)).toEqual([seatOf('caibo'), seatOf('guanlu')].sort());
    expect(across('duigong', life)).toEqual([seatOf('qianyi')]);
    // 「以福德對財帛宮也」
    expect(across('duigong', seatOf('fude'))).toEqual([seatOf('caibo')]);
  });
});
