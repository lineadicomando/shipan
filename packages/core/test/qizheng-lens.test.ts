import { beforeAll, describe, expect, it } from 'vitest';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { BRANCHES, type Branch } from '../src/ganzhi.js';
import { DEFAULT_QIZHENG_OPTIONS, QIZHENG_BODIES, qizhengBoard, type QizhengOptions } from '../src/qizheng.js';
import { GUIYUAN, MOON_LENS_PHASE, QIZHENG_LAYERS, QIZHENG_LENS_LAYERS, qizhengLens } from '../src/qizheng-lens.js';
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
    expect(lens.linkIds).toEqual(['guiyuan']);
  });

  it('gives each remainder the phase of its planet, as 四餘所屬 does', () => {
    // 「紫炁為木之餘。月孛為水之餘。羅睺為火之餘。計都為土之餘」
    expect(phaseOf('ziqi')).toBe('mu');
    expect(phaseOf('yuebei')).toBe('shui');
    expect(phaseOf('luohou')).toBe('huo');
    expect(phaseOf('jidu')).toBe('tu');
    // The Sun and the Moon stand outside the five, in the engine.
    expect(phaseOf('taiyang')).toBeUndefined();
    expect(phaseOf('taiyin')).toBeUndefined();
  });

  it('lists every body with a phase where it stands on the ring, the Moon as water and the Sun never', () => {
    for (const [date, hour, options] of [
      ['2024-06-15', '午', {}],
      ['1990-01-20', '子', { ziqi: 'off' }],
    ] as const) {
      const board = lay(date, hour, options);
      const { things } = qizhengLens(board);
      const placed = [...board.governors, ...board.remainders].filter((one) => one.body.element);
      expect(things).toHaveLength(placed.length + 1);
      for (const one of placed) {
        expect(things).toContainEqual({
          seat: one.palace.id,
          layer: board.remainders.includes(one) ? 'remainder' : 'governor',
          id: one.body.id,
          element: one.body.element,
        });
      }
      const moon = board.governors.find((one) => one.body.id === 'taiyin');
      expect(things).toContainEqual({ seat: moon?.palace.id, layer: 'governor', id: 'taiyin', element: MOON_LENS_PHASE });
      expect(things.some((thing) => thing.id === 'taiyang')).toBe(false);
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

describe('歸垣 on a 七政四餘 board', () => {
  it('gives each governor the palaces 十二宮所屬 gives its phase, and the Sun and the Moon theirs', () => {
    // 十二宮所屬, the same page as 七政歸垣: 子丑 土, 寅亥 木, 卯戌 火, 辰酉 金,
    // 巳申 水, 午 the Sun's, 未 the Moon's. The two tables of one work agree.
    const OWNED: Record<string, string> = {
      zi: 'tu', chou: 'tu', yin: 'mu', hai: 'mu', mao: 'huo', xu: 'huo',
      chen: 'jin', you: 'jin', si: 'shui', shen: 'shui', wu: 'taiyang', wei: 'taiyin',
    };
    const homes = Object.entries(GUIYUAN).flatMap(([body, palaces]) => palaces.map((palace) => [body, palace] as const));
    expect(homes).toHaveLength(12);
    for (const [body, palace] of homes) {
      expect(OWNED[palace], `${body} ${palace}`).toBe(phaseOf(body) ?? body);
    }
  });

  it('links each governor with a phase to its home palaces, wherever it stands', () => {
    const board = lay('2024-06-15', '午');
    const lens = qizhengLens(board);
    const governors = lens.things.filter((thing) => thing.layer === 'governor');
    expect(lens.links).toHaveLength(governors.reduce((n, thing) => n + (GUIYUAN[thing.id as keyof typeof GUIYUAN]?.length ?? 0), 0));
    for (const link of lens.links) {
      expect(link.relation).toBe('guiyuan');
      expect(link.between).toBe('things');
      expect(link.b.layer).toBe('palace');
      expect(GUIYUAN[link.a.id as keyof typeof GUIYUAN]).toContain(link.b.seat);
    }
    // No remainder has a 垣, and the Sun cannot be started from.
    expect(lens.links.some((link) => link.a.layer === 'remainder' || link.a.id === 'taiyang')).toBe(false);
  });
});
