import { describe, expect, it } from 'vitest';
import { computeYearChart, pillarYear, yearYuanOf } from '../src/dunjia/nianjia.js';
import {
  DEFAULT_OPTIONS,
  computeQimenChart,
  initEphemeris,
  resolveMoment,
  type ChartOptions,
  type Place,
} from '../src/index.js';

/**
 * The year family, held to the cases its sources work.
 *
 * 《遁甲演義》卷一 dates its 年家 by a gate, 「自嘉靖四十三年甲子起杜門，十年一移，萬曆
 * 甲午年移休」; 《奇門遁甲統宗》卷二's 附年奇門起例 works 上元's 甲子 and 乙丑; and
 * 《御定奇門大全》卷二十九's 奇門古本 works 順治五年 戊子 under 一七四. All were read
 * on the plate: `docs/sources.md` § "年家 and 月家 on the plate: the heaven
 * plate is turned", and the 古本 under § "《御定奇門大全》卷二十八–三十二".
 */
const context = initEphemeris();
const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
const YEAR: ChartOptions = { ...DEFAULT_OPTIONS, system: 'nianjia' };

const lay = (date: string, moved: Partial<ChartOptions> = {}, time = '12:00') => {
  const options = { ...YEAR, ...moved };
  return computeYearChart(
    resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, options, context),
    options,
  );
};

const at = (board: ReturnType<typeof lay>, number: number) =>
  board.palaces.find((seat) => seat.palace.number === number);
const starAt = (board: ReturnType<typeof lay>, id: string) =>
  board.palaces.find((seat) => seat.star.id === id)?.palace.number;
const gateAt = (board: ReturnType<typeof lay>, id: string) =>
  board.palaces.find((seat) => seat.gate?.id === id)?.palace.number;

describe('the 元 of a year', () => {
  it('opens a 上元 in 1684 and counts sixty years to an 元', () => {
    expect(yearYuanOf(1684, 0).id).toBe('shang');
    expect(yearYuanOf(1864, 0).id).toBe('shang');
    expect(yearYuanOf(1924, 0).id).toBe('zhong');
    // 張志春: 1984 opens a 下元.
    expect(yearYuanOf(1984, 0).id).toBe('xia');
    expect(yearYuanOf(2043, 59)).toMatchObject({ id: 'xia', opened: 1984 });
    expect(yearYuanOf(1564, 0).id).toBe('zhong');
  });

  it('reads the year the pillar is named for, across 立春', () => {
    // 立春 falls on 2024-02-04: the day before stands in 癸卯.
    const before = lay('2024-02-03');
    const after = lay('2024-02-05');
    expect(before.year.hanzi).toBe('癸卯');
    expect(pillarYear(before.moment)).toBe(2023);
    expect(after.year.hanzi).toBe('甲辰');
    expect(pillarYear(after.moment)).toBe(2024);
  });
});

describe('the board of a year', () => {
  it('lays the 統宗’s 上元 甲子 and 乙丑 on 陰遁一局', () => {
    // 「如上元甲子年用陰遁一局，甲子即為旬首，休門為直使，天蓬為直符，因甲子在坎，
    // 即以天盤休門加坎，天蓬亦加坎。若乙丑年，乙在坤二，丑在離九，即以天盤休門加離九，
    // 天蓬加坤二。又以八神之直符加於天蓬逆轉」.
    const jiazi = lay('1864-06-01');
    const yichou = lay('1865-06-01');
    expect(jiazi.year.hanzi).toBe('甲子');
    expect(jiazi.yuan.id).toBe('shang');
    expect(jiazi.ju).toEqual({ yang: false, number: 1 });
    expect(jiazi.chief.star.id).toBe('tianpeng');
    expect(jiazi.chiefGate.gate.id).toBe('xiumen');
    expect([starAt(jiazi, 'tianpeng'), gateAt(jiazi, 'xiumen')]).toEqual([1, 1]);

    expect(yichou.year.hanzi).toBe('乙丑');
    expect(starAt(yichou, 'tianpeng')).toBe(2);
    expect(gateAt(yichou, 'xiumen')).toBe(9);
    expect([yichou.chief.palace.number, yichou.chiefGate.palace.number]).toEqual([2, 9]);
    // The spirits from 天蓬, back round the ring.
    expect(at(yichou, 2)?.spirit?.id).toBe('zhifu');
    expect(at(yichou, 9)?.spirit?.id).toBe('tengshe');
  });

  it('dates the 演義’s gates: 杜門 in 1564, 休門 in 1594', () => {
    // 1564 opens a 中元 on 陰遁四局: 甲子戊 at 巽四, 杜門 the 直使. In 1594 the
    // decade is 甲午辛, at 坎一, and the 直使 is 休門. 「十年一移」 is the decade.
    const jiajing = lay('1564-06-01');
    const wanli = lay('1594-06-01');
    expect(jiajing.year.hanzi).toBe('甲子');
    expect(jiajing.yuan.id).toBe('zhong');
    expect(jiajing.ju.number).toBe(4);
    expect(jiajing.chiefGate.gate.id).toBe('dumen');
    expect(wanli.year.hanzi).toBe('甲午');
    expect(wanli.chiefGate.gate.id).toBe('xiumen');
    expect(wanli.chiefGate.palace.number).toBe(1);
  });

  it('lays the 奇門古本’s 順治五年 under yearYuan: yiqisi', () => {
    // 「天啟四年甲子為下元陰四局…推至順治五年戊子，死門在兌七宮，天芮加四宮」.
    const shunzhi = lay('1648-06-01', { yearYuan: 'yiqisi' });
    expect(shunzhi.year.hanzi).toBe('戊子');
    expect(shunzhi.yuan.id).toBe('xia');
    expect(shunzhi.ju.number).toBe(4);
    expect(gateAt(shunzhi, 'simen')).toBe(7);
    expect(starAt(shunzhi, 'tianrui')).toBe(4);
    // The same year under 一四七 is 下元's 七局, another board.
    expect(lay('1648-06-01').ju.number).toBe(7);
  });

  it('is laid off the year, and the month, the day and the hour move nothing', () => {
    const seats = (board: ReturnType<typeof lay>) =>
      board.palaces.map((seat) => [seat.heaven.id, seat.star.id, seat.gate?.id, seat.spirit?.id]);
    expect(seats(lay('2026-03-01', {}, '01:00'))).toEqual(seats(lay('2026-11-05', {}, '18:00')));
  });

  it('lodges a centre decade where centreLodging says, the yin half’s palace', () => {
    // 1914 is 甲寅 in a 上元: 陰遁一局 puts 甲寅癸 in the centre.
    const kun = lay('1914-06-01');
    const dun = lay('1914-06-01', { centreLodging: 'dun' });
    expect(kun.chief.star.id).toBe('tianqin');
    expect(kun.chiefGate).toMatchObject({ gate: { id: 'simen' }, palace: { number: 2 } });
    expect(dun.chiefGate).toMatchObject({ gate: { id: 'shengmen' }, palace: { number: 8 } });
    expect(at(dun, 8)?.lodged?.id).toBe('gui');
  });

  it('carries the options that laid it', () => {
    expect(lay('2026-06-01').options).toMatchObject({ system: 'nianjia', yearYuan: 'yisiqi' });
  });

  it('refuses a lodging read off a term, which a year has none of', () => {
    expect(() => lay('2026-06-01', { centreLodging: 'bajie' })).toThrowError(
      expect.objectContaining({ code: 'OPTION_NOT_IMPLEMENTED' }),
    );
  });

  it('is not what the hour board’s function answers, nor the other way about', () => {
    const moment = resolveMoment(
      { date: '2026-06-01', time: '12:00', timezone: 'Asia/Shanghai' },
      BEIJING,
      YEAR,
      context,
    );
    expect(() => computeQimenChart(moment, YEAR)).toThrowError(
      expect.objectContaining({ code: 'OPTION_NOT_IMPLEMENTED' }),
    );
    expect(() => computeYearChart(moment, DEFAULT_OPTIONS)).toThrowError(
      expect.objectContaining({ code: 'OPTION_NOT_IMPLEMENTED' }),
    );
  });
});
