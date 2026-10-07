import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ganzhiOf } from '../src/ganzhi.js';
import {
  DAY_STARS,
  dayGates,
  dayStars,
  restPalace,
  taiyiPalace,
} from '../src/dunjia/rijia.js';

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
  const gates = dayGates(block.day, block.yang);
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
        const gates = dayGates(index, yang);
        expect(gates[5]).toBeUndefined();
        expect(new Set(Object.values(gates).map((gate) => gate.id)).size).toBe(8);
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
