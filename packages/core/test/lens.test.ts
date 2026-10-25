import { beforeAll, describe, expect, it } from 'vitest';
import { computeQimenChart, type QimenChart } from '../src/dunjia/index.js';
import { palace } from '../src/dunjia/palaces.js';
import { LENS_LAYERS, LINKS, qimenLens } from '../src/dunjia/lens.js';
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

  it('gives each of the eight outer palaces the one facing it, and the centre none', () => {
    const { facing } = qimenLens(cast('2024-06-15', '14:00'));
    expect(facing).toEqual({ 1: 9, 2: 8, 3: 7, 4: 6, 6: 4, 7: 3, 8: 2, 9: 1 });
    expect(facing[5]).toBeUndefined();
  });

  it('pairs the stems 甲己 · 乙庚 · 丙辛 · 丁壬 · 戊癸, each both ways', () => {
    const { wuhe } = qimenLens(cast('2024-06-15', '14:00'));
    const pairs = [
      ['jia', 'ji'],
      ['yi', 'geng'],
      ['bing', 'xin'],
      ['ding', 'ren'],
      ['wu', 'gui'],
    ] as const;
    for (const [a, b] of pairs) {
      expect(wuhe[a]).toBe(b);
      expect(wuhe[b]).toBe(a);
    }
    expect(Object.keys(wuhe)).toHaveLength(STEMS.length);
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
        const seat = contents.palace.number;
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
        things.find((thing) => thing.seat === contents.palace.number && thing.layer === layer)?.element;
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
