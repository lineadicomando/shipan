import { describe, expect, it } from 'vitest';
import { computeMonthChart, layOnPillar, monthYuanOf } from '../src/dunjia/nianjia.js';
import { ganzhiOf } from '../src/ganzhi.js';
import {
  DEFAULT_OPTIONS,
  initEphemeris,
  resolveMoment,
  type ChartOptions,
  type Place,
} from '../src/index.js';

/**
 * The month family, held to what its sources state.
 *
 * Neither holder works a month board through. The 統宗卷二 附月奇門起例 lists the
 * twenty years of each 元 and closes 「看月建之支臨於地盤何宮，即以天盤值使加之，看月建
 * 之干臨於地盤何宮，即以天盤直符加之，與年奇門同」, so its own 甲子 and 乙丑 of the year
 * are the month's as well; 《遁甲演義》卷一 states its three 元 by 孟, 仲 and 季.
 * Both read on the plate: `docs/sources.md` § "年家 and 月家 on the plate: the
 * heaven plate is turned". The 演義's 「嘉靖四十二年十一月甲子起休門在坎」 is a
 * second layer and not this board, and is not held to it.
 */
const context = initEphemeris();
const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
const MONTH: ChartOptions = { ...DEFAULT_OPTIONS, system: 'yuejia' };

const lay = (date: string, moved: Partial<ChartOptions> = {}) => {
  const options = { ...MONTH, ...moved };
  return computeMonthChart(
    resolveMoment({ date, time: '12:00', timezone: 'Asia/Shanghai' }, BEIJING, options, context),
    options,
  );
};

const starAt = (board: ReturnType<typeof lay>, id: string) =>
  board.palaces.find((seat) => seat.star.id === id)?.palace.number;
const gateAt = (board: ReturnType<typeof lay>, id: string) =>
  board.palaces.find((seat) => seat.gate?.id === id)?.palace.number;

describe('the 元 of a month', () => {
  // 「甲子至戊辰　己卯至癸未　甲午至戊戌　己酉至癸丑　為上[元]二十年用陰遁一局　己巳至
  // 癸酉　甲申至戊子　己亥至癸卯　甲寅至戊午　為中元二十年用陰遁四局　甲戌至戊寅　己丑至
  // 癸巳　甲辰至戊申　己未至癸亥　為下元二十年用陰遁七局」.
  const TONGZONG: Record<string, [string, number]> = {
    甲子: ['shang', 1], 己卯: ['shang', 1], 甲午: ['shang', 1], 己酉: ['shang', 1],
    己巳: ['zhong', 4], 甲申: ['zhong', 4], 己亥: ['zhong', 4], 甲寅: ['zhong', 4],
    甲戌: ['xia', 7], 己丑: ['xia', 7], 甲辰: ['xia', 7], 己未: ['xia', 7],
  };
  // 「甲己遇四孟為上元。在一宮起甲子。甲己遇四仲為中元。在七宮起甲子。甲己遇四季為下元。
  // 在四宮起甲子」.
  const YANYI: Record<string, [string, number]> = {
    己巳: ['shang', 1], 甲申: ['shang', 1], 己亥: ['shang', 1], 甲寅: ['shang', 1],
    甲子: ['zhong', 7], 己卯: ['zhong', 7], 甲午: ['zhong', 7], 己酉: ['zhong', 7],
    甲戌: ['xia', 4], 己丑: ['xia', 4], 甲辰: ['xia', 4], 己未: ['xia', 4],
  };

  it.each([
    ['ziwu', TONGZONG],
    ['yinshen', YANYI],
  ] as const)('gives every year of the sixty the 元 and the 局 of its five under %s', (rule, table) => {
    for (let index = 0; index < 60; index += 1) {
      const pillar = ganzhiOf(index);
      const { id, ju, opener } = monthYuanOf(2000, pillar, rule);
      expect(opener.index).toBe(index - (index % 5));
      expect([id, ju]).toEqual(table[opener.hanzi]);
    }
  });

  it('dates the five by the year that opened them', () => {
    // 2026 is 丙午, two years into the five 甲辰 opened in 2024.
    expect(monthYuanOf(2026, ganzhiOf(42), 'ziwu')).toMatchObject({ id: 'xia', opened: 2024, ju: 7 });
  });
});

describe('the board of a month', () => {
  // 1988 is 戊辰, in the five 甲子 opened: 上元 一局 under the 統宗. Its 子 month
  // is 甲子 and the 丑 month after it 乙丑, still in 戊辰 before 立春 1989.
  it('lays the 統宗’s 甲子 and 乙丑, 「與年奇門同」, on the month pillar', () => {
    const jiazi = lay('1988-12-15');
    const yichou = lay('1989-01-15');
    expect(jiazi.month.hanzi).toBe('甲子');
    expect(jiazi.year.hanzi).toBe('戊辰');
    expect(jiazi.yuan).toMatchObject({ id: 'shang', opened: 1984 });
    expect(jiazi.yuan.opener.hanzi).toBe('甲子');
    expect(jiazi.ju).toEqual({ yang: false, number: 1 });
    expect(jiazi.chief.star.id).toBe('tianpeng');
    expect(jiazi.chiefGate.gate.id).toBe('xiumen');
    expect([starAt(jiazi, 'tianpeng'), gateAt(jiazi, 'xiumen')]).toEqual([1, 1]);

    // 「乙在坤二，丑在離九，即以天盤休門加離九，天蓬加坤二」.
    expect(yichou.month.hanzi).toBe('乙丑');
    expect(yichou.year.hanzi).toBe('戊辰');
    expect(starAt(yichou, 'tianpeng')).toBe(2);
    expect(gateAt(yichou, 'xiumen')).toBe(9);
  });

  it('is the year’s procedure on the month pillar, and moves with nothing else', () => {
    const board = lay('2026-11-20');
    const same = lay('2026-12-01');
    expect(board.month.hanzi).toBe('己亥');
    expect(same.month.hanzi).toBe('己亥');
    const { stem, ...laid } = layOnPillar(board.month, board.ju.number, MONTH);
    expect(board.monthStem).toEqual(stem);
    expect(board.palaces).toEqual(laid.palaces);
    expect(same.palaces).toEqual(board.palaces);
  });

  it('parts under yinshen on the same month', () => {
    const ziwu = lay('1988-12-15');
    const yinshen = lay('1988-12-15', { monthYuan: 'yinshen' });
    expect(yinshen.yuan.id).toBe('zhong');
    expect(yinshen.ju.number).toBe(7);
    expect(yinshen.palaces).not.toEqual(ziwu.palaces);
  });

  it('refuses the 元 by the month, which names no 局, and a lodging by the term', () => {
    expect(() => lay('2026-11-20', { monthYuan: 'yuejian' })).toThrow(
      expect.objectContaining({ code: 'OPTION_NOT_IMPLEMENTED' }),
    );
    expect(() => lay('2026-11-20', { centreLodging: 'bajie' })).toThrow(
      expect.objectContaining({ code: 'OPTION_NOT_IMPLEMENTED' }),
    );
  });
});
