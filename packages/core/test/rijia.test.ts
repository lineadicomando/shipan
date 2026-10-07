import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ganzhiOf } from '../src/ganzhi.js';
import {
  DAY_STARS,
  computeDayChart,
  dayStars,
  flownDayGates,
  restPalace,
  taiyiPalace,
  turnedDayGates,
} from '../src/dunjia/rijia.js';
import {
  DEFAULT_OPTIONS,
  computeQimenChart,
  initEphemeris,
  resolveMoment,
  type ChartOptions,
  type Place,
} from '../src/index.js';

/**
 * The day family, held to the one table on the shelf that lays it day by day.
 *
 * 《日家奇門》 (鮮紅草, 1998) prints the sixty days in each half of the year.
 * `rijia/table.tsv` is every block of it that comes back whole from its text
 * layer, kept or dropped on that ground alone, in the table's own simplified
 * characters and its own order of columns.
 */
const COLUMNS = [1, 8, 3, 4, 9, 2, 7, 6];
const SIXTY = Array.from({ length: 60 }, (_, index) => ganzhiOf(index).hanzi);
const GATE_OF: Record<string, string> = {
  休: '休門', 生: '生門', 伤: '傷門', 杜: '杜門', 景: '景門', 死: '死門', 惊: '驚門', 开: '開門',
};
const STAR_OF: Record<string, string> = {
  太乙: '太乙', 摄提: '攝提', 轩辕: '軒轅', 招摇: '招搖', 天符: '天符',
  青龙: '青龍', 咸池: '咸池', 太阴: '太陰', 天乙: '天乙',
};

interface Block {
  label: string;
  yang: boolean;
  day: number;
  gates: string[];
  stars: string[];
}

const BLOCKS: Block[] = readFileSync(new URL('./rijia/table.tsv', import.meta.url), 'utf8')
  .split('\n')
  .filter((line) => line !== '' && !line.startsWith('#'))
  .map((line) => {
    const [label, gates, stars] = line.split('\t') as [string, string, string];
    const day = SIXTY.indexOf(label.slice(1));
    return {
      label,
      yang: label.startsWith('阳'),
      day,
      gates: [...gates].map((gate) => GATE_OF[gate] as string),
      stars: stars.split(' ').map((star) => STAR_OF[star] as string),
    };
  });

const laidGates = (block: Block) => {
  const gates = turnedDayGates(restPalace(block.day, block.yang), block.day);
  return COLUMNS.map((number) => gates[number]?.hanzi);
};
const laidStars = (block: Block) => {
  const stars = dayStars(block.day, block.yang);
  return COLUMNS.map((number) => stars[number]?.hanzi);
};

/**
 * Where the table and the rule part, each read against its neighbours.
 *
 * The three gate blocks are one slip three times: 傷 and 杜 exchanged in the
 * yin blocks of three 辰 days twenty-four days apart, which is one palace's
 * turn copied forward. The three star blocks each have two or four stars out
 * of a series that the block before and the block after both keep.
 */
const GATE_SLIPS = ['阴戊辰', '阴壬辰', '阴丙辰'];
const STAR_SLIPS = ['阴庚辰', '阳癸巳', '阳庚申'];

describe('the day family, against the table of its 120 days', () => {
  it('reads enough of the table to be worth holding to', () => {
    expect(BLOCKS.every((block) => block.day >= 0)).toBe(true);
    expect(BLOCKS.length).toBeGreaterThan(90);
    expect(BLOCKS.filter((block) => block.yang).length).toBeGreaterThan(40);
    expect(BLOCKS.filter((block) => !block.yang).length).toBeGreaterThan(40);
  });

  it('lays the eight gates as every block prints them, three slips apart', () => {
    for (const block of BLOCKS) {
      if (GATE_SLIPS.includes(block.label)) continue;
      expect(laidGates(block), block.label).toEqual(block.gates);
    }
  });

  it('lays the nine stars as every block prints them, three slips apart', () => {
    for (const block of BLOCKS) {
      if (STAR_SLIPS.includes(block.label)) continue;
      expect(laidStars(block), block.label).toEqual(block.stars);
    }
  });

  it('parts from the slips, so that a slip is not quietly a block that agrees', () => {
    for (const block of BLOCKS) {
      if (GATE_SLIPS.includes(block.label)) expect(laidGates(block)).not.toEqual(block.gates);
      if (STAR_SLIPS.includes(block.label)) expect(laidStars(block)).not.toEqual(block.stars);
    }
    // And a gate slip puts 休門 where the rule does: what is out is two cells.
    for (const block of BLOCKS.filter((b) => GATE_SLIPS.includes(b.label))) {
      const printed = COLUMNS[block.gates.indexOf('休門')];
      expect(printed).toBe(restPalace(block.day, block.yang));
    }
  });
});

describe('the day family, against what the texts say', () => {
  const day = (hanzi: string) => SIXTY.indexOf(hanzi);

  it('sets 休門 on 坎 for three days and on 坤 for the next three', () => {
    // 「如甲子乙丑丙寅三日于坎宮起休門，丁卯戊辰己巳三日于坤宮起休門」.
    for (const hanzi of ['甲子', '乙丑', '丙寅']) expect(restPalace(day(hanzi), true)).toBe(1);
    for (const hanzi of ['丁卯', '戊辰', '己巳']) expect(restPalace(day(hanzi), true)).toBe(2);
  });

  it('never sets a gate on the centre, and sets all eight', () => {
    for (let index = 0; index < 60; index++) {
      for (const yang of [true, false]) {
        const rest = restPalace(index, yang);
        for (const gates of [flownDayGates(rest), turnedDayGates(rest, index)]) {
          expect(gates[5]).toBeUndefined();
          expect(gates[rest]?.hanzi).toBe('休門');
          expect(new Set(Object.values(gates).map((gate) => gate.id)).size).toBe(8);
        }
      }
    }
  });

  it('sets 太乙 on the six palaces the 訣 names for the six 甲', () => {
    // 「如甲子日，以太乙加艮宮順行；甲戌加離；甲申加坎；甲午加坤；甲辰加震；
    // 甲寅日以太乙加巽宮」.
    const named = { 甲子: 8, 甲戌: 9, 甲申: 1, 甲午: 2, 甲辰: 3, 甲寅: 4 };
    for (const [hanzi, number] of Object.entries(named)) {
      expect(taiyiPalace(day(hanzi), true), hanzi).toBe(number);
    }
  });

  it('begins the yin half at 坤 and runs it back', () => {
    // 「冬至艮宮夏坤地，命起甲子順逆行」.
    expect(taiyiPalace(day('甲子'), false)).toBe(2);
    expect(taiyiPalace(day('乙丑'), false)).toBe(1);
    expect(taiyiPalace(day('丙寅'), false)).toBe(9);
  });

  it('lays nine stars on nine palaces, the centre one of them', () => {
    for (let index = 0; index < 60; index++) {
      for (const yang of [true, false]) {
        const stars = dayStars(index, yang);
        expect(new Set(Object.values(stars).map((star) => star.id)).size).toBe(DAY_STARS.length);
        expect(stars[5]).toBeDefined();
      }
    }
  });

  it('mirrors the two halves of the year: a day’s two palaces sum to ten', () => {
    for (let index = 0; index < 60; index++) {
      expect(restPalace(index, true) + restPalace(index, false)).toBe(10);
      expect(taiyiPalace(index, true) + taiyiPalace(index, false)).toBe(10);
    }
  });
});

/**
 * 八門三奇出行定局, 《金函玉鏡》卷十八 p. 370, read on the plate: a row to each
 * palace 休門 stands in, the days that row serves and where every gate is.
 *
 * Where the gates stand is the plate's, row for row. The days are the count's:
 * the plate's own lists carry five slips — 癸巳 for 癸丑, 辛巳 for 辛卯, 乙卯 for
 * 己卯 among them — which `docs/sources.md` names one by one.
 */
const DINGJU: [string[], string][] = [
  [['甲子', '乙丑', '丙寅', '戊子', '己丑', '庚寅', '壬子', '癸丑', '甲寅'], '休坎死坤傷震杜巽開乾驚兌生艮景離'],
  [['丁卯', '戊辰', '己巳', '辛卯', '壬辰', '癸巳', '乙卯', '丙辰', '丁巳'], '休坤死震傷巽杜乾開兌驚艮生離景坎'],
  [['庚午', '辛未', '壬申', '甲午', '乙未', '丙申', '戊午', '己未', '庚申'], '休震死巽傷乾杜兌開艮驚離生坎景坤'],
  [['癸酉', '甲戌', '乙亥', '丁酉', '戊戌', '己亥', '辛酉', '壬戌', '癸亥'], '休巽死乾傷兌杜艮開離驚坎生坤景震'],
  [['丙子', '丁丑', '戊寅', '庚子', '辛丑', '壬寅'], '休乾死兌傷艮杜離開坎驚坤生震景巽'],
  [['己卯', '庚辰', '辛巳', '癸卯', '甲辰', '乙巳'], '休兌死艮傷離杜坎開坤驚震生巽景乾'],
  [['壬午', '癸未', '甲申', '丙午', '丁未', '戊申'], '休艮死離傷坎杜坤開震驚巽生乾景兌'],
  [['乙酉', '丙戌', '丁亥', '己酉', '庚戌', '辛亥'], '休離死坎傷坤杜震開巽驚乾生兌景艮'],
];
const TRIGRAM: Record<string, number> = { 坎: 1, 坤: 2, 震: 3, 巽: 4, 乾: 6, 兌: 7, 艮: 8, 離: 9 };

describe('the day family’s gates flown, against the 定局', () => {
  it('serves all sixty days, each once', () => {
    const days = DINGJU.flatMap(([served]) => served);
    expect(new Set(days).size).toBe(60);
    expect(days.every((hanzi) => SIXTY.includes(hanzi))).toBe(true);
  });

  it('puts every gate where its row does, on every day the row serves', () => {
    for (const [served, row] of DINGJU) {
      const printed = Object.fromEntries(
        (row.match(/../g) as string[]).map((pair) => [TRIGRAM[pair[1] as string], `${pair[0]}門`]),
      );
      for (const hanzi of served) {
        const gates = flownDayGates(restPalace(SIXTY.indexOf(hanzi), true));
        const laid = Object.fromEntries(Object.entries(gates).map(([n, gate]) => [n, gate.hanzi]));
        expect(laid, hanzi).toEqual(printed);
      }
    }
  });

  it('parts from the table on the first day both lay with 休門 off 坎', () => {
    const day = SIXTY.indexOf('丁卯');
    const rest = restPalace(day, true);
    expect(flownDayGates(rest)[3]?.hanzi).toBe('死門');
    expect(turnedDayGates(rest, day)[3]?.hanzi).not.toBe('死門');
  });
});

describe('the board of a day', () => {
  const context = initEphemeris();
  const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
  const DAY: ChartOptions = {
    ...DEFAULT_OPTIONS,
    system: 'rijia',
    trueSolarTime: false,
    dayBoundary: 'midnight',
  };
  const lay = (date: string, time: string, moved: Partial<ChartOptions> = {}) => {
    const options = { ...DAY, ...moved };
    return computeDayChart(
      resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, options, context),
      options,
    );
  };

  it('is laid off the day and the term, and the hour moves nothing', () => {
    const morning = lay('2024-01-01', '04:30');
    const evening = lay('2024-01-01', '20:30');
    expect(morning.moment.pillars.day.hanzi).toBe('甲子');
    expect(morning.yang).toBe(true);
    expect(morning.rest.number).toBe(1);
    expect(morning.taiyi.number).toBe(8);
    const seats = (board: typeof morning) =>
      board.palaces.map((seat) => [seat.gate?.id, seat.star.id]);
    expect(seats(evening)).toEqual(seats(morning));
  });

  it('gives the centre a star and no gate', () => {
    const board = lay('2024-01-01', '12:00');
    expect(board.palaces).toHaveLength(9);
    const centre = board.palaces.find((seat) => seat.palace.number === 5)!;
    expect(centre.gate).toBeUndefined();
    expect(centre.star.hanzi).toBe('咸池');
  });

  it('runs the stars back after 夏至 and leaves the flown gates as they were', () => {
    const board = lay('2024-08-28', '12:00');
    expect(board.moment.pillars.day.hanzi).toBe('甲子');
    expect(board.yang).toBe(false);
    expect(board.taiyi.number).toBe(2);
    expect(board.rest.number).toBe(1);
    // The table's reading mirrors the gates as well.
    expect(lay('2024-08-28', '12:00', { dayGates: 'zhuan' }).rest.number).toBe(9);
  });

  it('carries the options that laid it, and refuses the half it does not compute', () => {
    expect(lay('2024-01-01', '12:00').options).toMatchObject({ system: 'rijia', dayGates: 'fei' });
    expect(() => lay('2024-01-01', '12:00', { dayDun: 'liushi' })).toThrowError(
      expect.objectContaining({ code: 'OPTION_NOT_IMPLEMENTED' }),
    );
  });

  it('is not what the hour board’s function answers, nor the other way about', () => {
    const moment = resolveMoment(
      { date: '2024-01-01', time: '12:00', timezone: 'Asia/Shanghai' },
      BEIJING,
      DAY,
      context,
    );
    expect(() => computeQimenChart(moment, DAY)).toThrowError(
      expect.objectContaining({ code: 'OPTION_NOT_IMPLEMENTED' }),
    );
    expect(() => computeDayChart(moment, { ...DAY, system: 'shijia' })).toThrowError(
      expect.objectContaining({ code: 'OPTION_NOT_IMPLEMENTED' }),
    );
  });
});
