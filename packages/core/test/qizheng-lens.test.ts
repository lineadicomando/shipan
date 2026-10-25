import { beforeAll, describe, expect, it } from 'vitest';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { BRANCHES, type Branch } from '../src/ganzhi.js';
import { DEFAULT_QIZHENG_OPTIONS, QIZHENG_BODIES, qizhengBoard, type QizhengOptions } from '../src/qizheng.js';
import { QIZHENG_LAYERS, QIZHENG_LENS_LAYERS, qizhengLens } from '../src/qizheng-lens.js';
import { resolveTime } from '../src/time.js';
import type { Element } from '../src/types.js';

let context: EphemerisContext;

beforeAll(() => {
  context = initEphemeris();
});

const branch = (hanzi: string): Branch => BRANCHES.find((b) => b.hanzi === hanzi) as Branch;

const lay = (date: string, hour: string, options: Partial<QizhengOptions> = {}) =>
  qizhengBoard(
    { julianDay: resolveTime({ date, time: '12:00', timezone: 'Asia/Shanghai' }).time.julianDayUT, hour: branch(hour) },
    { ...DEFAULT_QIZHENG_OPTIONS, ...options },
    context,
  );

const phaseOf = (id: string): Element | undefined => QIZHENG_BODIES.find((body) => body.id === id)?.element;

describe('the relations a lens may show on a 七政四餘 board', () => {
  it('describes the board as the drawing marks it, the bodies alone with a phase', () => {
    const lens = qizhengLens(lay('2024-06-15', '午'));
    expect(lens.board).toBe('qizheng');
    expect(lens.layers).toEqual(QIZHENG_LAYERS);
    expect(lens.phased).toEqual(QIZHENG_LENS_LAYERS);
    // A palace may hold several bodies: a name is told apart by its body.
    expect(lens.crowded).toEqual(QIZHENG_LENS_LAYERS);
    expect(lens.pairSeats).toEqual(BRANCHES.map((one) => one.id));
    expect(lens.linkIds).toEqual([]);
  });

  it('gives each remainder the phase of its planet, as 四餘所屬 does', () => {
    // 「紫炁為木之餘。月孛為水之餘。羅睺為火之餘。計都為土之餘」
    expect(phaseOf('ziqi')).toBe('mu');
    expect(phaseOf('yuebei')).toBe('shui');
    expect(phaseOf('luohou')).toBe('huo');
    expect(phaseOf('jidu')).toBe('tu');
    // The Sun and the Moon stand outside the five.
    expect(phaseOf('taiyang')).toBeUndefined();
    expect(phaseOf('taiyin')).toBeUndefined();
  });

  it('lists every body with a phase where it stands on the ring, and the Sun and the Moon never', () => {
    for (const [date, hour, options] of [
      ['2024-06-15', '午', {}],
      ['1990-01-20', '子', { ziqi: 'off' }],
    ] as const) {
      const board = lay(date, hour, options);
      const { things } = qizhengLens(board);
      const placed = [...board.governors, ...board.remainders].filter((one) => one.body.element);
      expect(things).toHaveLength(placed.length);
      for (const one of placed) {
        expect(things).toContainEqual({
          seat: one.palace.id,
          layer: board.remainders.includes(one) ? 'remainder' : 'governor',
          id: one.body.id,
          element: one.body.element,
        });
      }
      expect(things.some((thing) => thing.id === 'taiyang' || thing.id === 'taiyin')).toBe(false);
    }
  });

  it('reads between two bodies the relation 論恩難仇用 reads between them', () => {
    // 《御定五星精義》 論恩難仇用, each planet's four with its remainder beside
    // it: 恩 generates it, 難 controls it, it controls 仇, it generates 用.
    const ENNAN: Record<string, readonly [string[], string[], string[], string[]]> = {
      muxing: [['shuixing', 'yuebei'], ['jinxing'], ['tuxing', 'jidu'], ['huoxing', 'luohou']],
      huoxing: [['muxing', 'ziqi'], ['shuixing', 'yuebei'], ['jinxing'], ['tuxing', 'jidu']],
      tuxing: [['huoxing', 'luohou'], ['muxing', 'ziqi'], ['shuixing', 'yuebei'], ['jinxing']],
      jinxing: [['tuxing', 'jidu'], ['huoxing', 'luohou'], ['muxing', 'ziqi'], ['shuixing', 'yuebei']],
      shuixing: [['jinxing'], ['tuxing', 'jidu'], ['huoxing', 'luohou'], ['muxing', 'ziqi']],
    };
    const { phases } = qizhengLens(lay('2024-06-15', '午'));
    const RELATIONS = ['shengwo', 'kewo', 'woke', 'wosheng'] as const;
    for (const [planet, rows] of Object.entries(ENNAN)) {
      rows.forEach((others, index) => {
        for (const other of others) {
          expect(phases[phaseOf(planet) as Element][phaseOf(other) as Element], `${planet} ${other}`).toBe(
            RELATIONS[index],
          );
        }
      });
    }
  });
});
