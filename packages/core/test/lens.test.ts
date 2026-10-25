import { beforeAll, describe, expect, it } from 'vitest';
import { computeQimenChart, type QimenChart } from '../src/dunjia/index.js';
import { palace } from '../src/dunjia/palaces.js';
import { DAY_LAYERS, DAY_LENS_LAYERS, LENS_LAYERS, LINKS, QIMEN_LAYERS, dayLens, qimenLens, wuhePartner } from '../src/dunjia/lens.js';
import { computeDayChart, type DayChart } from '../src/dunjia/rijia.js';
import { RELATION_IDS, relationOf } from '../src/dunjia/relation.js';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { STEMS } from '../src/ganzhi.js';
import { resolveMoment } from '../src/pillars.js';
import { DEFAULT_OPTIONS, type ChartOptions, type Element, type Place } from '../src/types.js';

let context: EphemerisContext;

beforeAll(() => {
  context = initEphemeris();
});

const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
const CLOCK: ChartOptions = { ...DEFAULT_OPTIONS, trueSolarTime: false, dayBoundary: 'midnight' };
const ELEMENTS: Element[] = ['mu', 'huo', 'tu', 'jin', 'shui'];

function cast(date: string, time: string): QimenChart {
  return computeQimenChart(
    resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, CLOCK, context),
    CLOCK,
  );
}

describe('the relations a lens may show on a 奇門 board', () => {
  it('lays out the five relations for every pair of phases, from the first', () => {
    const { phases } = qimenLens(cast('2024-06-15', '14:00'));
    for (const mine of ELEMENTS) {
      for (const other of ELEMENTS) {
        expect(phases[mine][other]).toBe(relationOf(mine, other).id);
      }
    }
    // Spelled out, so that a table read the wrong way round fails here: metal
    // cuts wood, wood is cut by metal, water feeds wood.
    expect(phases.jin.mu).toBe('woke');
    expect(phases.mu.jin).toBe('kewo');
    expect(phases.shui.mu).toBe('wosheng');
    expect(phases.mu.shui).toBe('shengwo');
    expect(phases.tu.tu).toBe('bihe');
  });

  it('describes the board as the drawing marks it: nine seats, six layers, five with a phase', () => {
    const lens = qimenLens(cast('2024-06-15', '14:00'));
    expect(lens.board).toBe('qimen');
    expect(lens.seats).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    expect(lens.layers).toEqual(QIMEN_LAYERS);
    expect(lens.phased).toEqual(LENS_LAYERS);
    expect(lens.linkIds).toEqual(['duigong', 'wuhe']);
  });

  it('links each of the eight outer palaces to the one facing it, once, and the centre to none', () => {
    const { links } = qimenLens(cast('2024-06-15', '14:00'));
    const facing = links.filter((link) => link.relation === 'duigong');
    expect(facing.every((link) => link.between === 'seats')).toBe(true);
    expect(facing.map((link) => [link.a, link.b])).toEqual(
      [
        ['1', '9'],
        ['2', '8'],
        ['3', '7'],
        ['4', '6'],
      ].map(([a, b]) => [
        { seat: a, layer: 'palace' },
        { seat: b, layer: 'palace' },
      ]),
    );
  });

  it('pairs the stems 甲己 · 乙庚 · 丙辛 · 丁壬 · 戊癸, each both ways', () => {
    const pairs = [
      ['jia', 'ji'],
      ['yi', 'geng'],
      ['bing', 'xin'],
      ['ding', 'ren'],
      ['wu', 'gui'],
    ] as const;
    for (const [a, b] of pairs) {
      expect(wuhePartner(a)).toBe(b);
      expect(wuhePartner(b)).toBe(a);
    }
    expect(new Set(STEMS.map((stem) => wuhePartner(stem.id))).size).toBe(STEMS.length);
  });

  it('links every two stems of the plates that are each other\'s 五合, and no others', () => {
    for (const [date, time] of [
      ['2024-06-15', '14:00'],
      ['2024-12-21', '03:30'],
    ] as const) {
      const { links, things } = qimenLens(cast(date, time));
      const stems = things.filter((thing) => thing.layer === 'heaven' || thing.layer === 'earth');
      const expected = new Set<string>();
      stems.forEach((one, i) =>
        stems.forEach((other, j) => {
          if (i < j && wuhePartner(one.id as never) === other.id) {
            expected.add(`${one.seat}:${one.layer}-${other.seat}:${other.layer}`);
          }
        }),
      );
      const found = links
        .filter((link) => link.relation === 'wuhe')
        .map((link) => `${link.a.seat}:${link.a.layer}-${link.b.seat}:${link.b.layer}`);
      expect(found.length).toBe(expected.size);
      expect(new Set(found)).toEqual(expected);
      expect(expected.size).toBeGreaterThan(0);
    }
  });

  it('lists every thing that has a phase, as the chart places it, and no spirit', () => {
    for (const [date, time] of [
      ['2024-06-15', '14:00'],
      ['2024-12-21', '03:30'],
      ['2025-03-05', '23:10'],
    ] as const) {
      const chart = cast(date, time);
      const { things } = qimenLens(chart);
      expect(new Set(things.map((thing) => thing.layer))).toEqual(new Set(LENS_LAYERS));

      for (const contents of chart.palaces) {
        const seat = String(contents.palace.number);
        const here = things.filter((thing) => thing.seat === seat);
        const at = (layer: string) => here.find((thing) => thing.layer === layer);
        expect(at('heaven')).toEqual({ seat, layer: 'heaven', id: contents.heaven.id, element: contents.heaven.element });
        expect(at('earth')).toEqual({ seat, layer: 'earth', id: contents.earth.id, element: contents.earth.element });
        expect(at('palace')).toEqual({ seat, layer: 'palace', id: contents.palace.id, element: contents.palace.element });
        expect(at('star')).toEqual({ seat, layer: 'star', id: contents.star.id, element: palace(contents.star.home).element });
        // The centre has no gate, and nothing is invented for it.
        expect(at('gate')?.id).toBe(contents.gate?.id);
      }
    }
  });

  it('agrees with 門宮 and 星宮 where the two things share a palace', () => {
    // The lens reads the same relation between any two things that the chart
    // already reports between a gate or star and its own palace. Were the two
    // to part, the board and its lens would say different things about one
    // pair.
    const chart = cast('2024-06-15', '14:00');
    const { phases, things } = qimenLens(chart);
    for (const contents of chart.palaces) {
      const ground = contents.palace.element;
      const element = (layer: string) =>
        things.find((thing) => thing.seat === String(contents.palace.number) && thing.layer === layer)?.element;
      expect(phases[element('star') as Element][ground]).toBe(contents.starRelation.id);
      if (contents.gateRelation) {
        expect(phases[element('gate') as Element][ground]).toBe(contents.gateRelation.id);
      }
    }
  });

  it('names every relation it can show, and every phase, with its reading', () => {
    expect(RELATION_IDS).toHaveLength(5);
    const { names } = qimenLens(cast('2024-06-15', '14:00'));
    expect(names.relations.woke).toEqual({ hanzi: '我剋', pinyin: 'wǒkè' });
    expect(names.relations.duigong).toEqual({ hanzi: '對宮', pinyin: 'duìgōng' });
    expect(names.elements.shui).toEqual({ hanzi: '水', pinyin: 'shuǐ' });
    expect(Object.keys(names.relations)).toHaveLength(7);
    for (const link of Object.values(LINKS)) {
      expect(link.hanzi).toMatch(/^\p{Script=Han}+$/u);
      expect(link.pinyin).toMatch(/^[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+$/);
    }
  });
});

describe('the relations a lens may show on a board of the day', () => {
  const DAY: ChartOptions = { ...CLOCK, system: 'rijia' };
  const lay = (date: string, options: Partial<ChartOptions> = {}): DayChart =>
    computeDayChart(
      resolveMoment({ date, time: '12:00', timezone: 'Asia/Shanghai' }, BEIJING, { ...DAY, ...options }, context),
      { ...DAY, ...options },
    );

  it('describes the board as the drawing marks it: a palace, a star and a gate, two with a phase', () => {
    const lens = dayLens(lay('2024-01-01'));
    expect(lens.board).toBe('qimen');
    expect(lens.layers).toEqual(DAY_LAYERS);
    expect(lens.phased).toEqual(DAY_LENS_LAYERS);
    // Every layer the day board draws is one the hour board's drawing knows.
    for (const layer of DAY_LAYERS) expect(QIMEN_LAYERS).toContain(layer);
    // No plate of stems, so no 五合.
    expect(lens.linkIds).toEqual(['duigong']);
    expect(Object.keys(lens.names.relations)).toHaveLength(6);
  });

  it('lists the palaces and the gates as the board places them, a gate by its home, and no star', () => {
    for (const [date, options] of [
      ['2024-01-01', {}],
      ['2024-08-28', { dayGates: 'zhuan' }],
      ['2024-08-28', { dayGates: 'shun', dayDun: 'yang' }],
    ] as const) {
      const day = lay(date, options);
      const { things } = dayLens(day);
      expect(things.some((thing) => thing.layer === 'star')).toBe(false);
      for (const contents of day.palaces) {
        const seat = String(contents.palace.number);
        const here = things.filter((thing) => thing.seat === seat);
        expect(here.find((thing) => thing.layer === 'palace')).toEqual({
          seat,
          layer: 'palace',
          id: contents.palace.id,
          element: contents.palace.element,
        });
        const gate = here.find((thing) => thing.layer === 'gate');
        // The centre has no gate on a day board either.
        expect(gate?.id).toBe(contents.gate?.id);
        if (contents.gate) expect(gate?.element).toBe(palace(contents.gate.home).element);
      }
    }
  });

  it('gives a gate the phase it has on the board of an hour', () => {
    // The same eight gates: a gate on the day board stands to a palace as it
    // would on the hour board, whatever palace it has come to.
    const hour = qimenLens(cast('2024-06-15', '14:00'));
    const day = dayLens(lay('2024-06-15'));
    for (const gate of day.things.filter((thing) => thing.layer === 'gate')) {
      expect(hour.things.find((thing) => thing.layer === 'gate' && thing.id === gate.id)?.element).toBe(gate.element);
    }
  });

  it('links the palaces facing each other as the hour board does', () => {
    const day = dayLens(lay('2024-01-01'));
    const hour = qimenLens(cast('2024-06-15', '14:00'));
    expect(day.links).toEqual(hour.links.filter((link) => link.relation === 'duigong'));
  });
});
