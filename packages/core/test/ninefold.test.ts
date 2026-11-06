import { describe, expect, it } from 'vitest';
import { ganzhiOf } from '../src/ganzhi.js';
import {
  carriedPlates,
  decadeInstrument,
  earthPlate,
  ninefoldChiefGate,
  ninefoldGatePalace,
  ninefoldGatePlate,
  ninefoldSpiritPlate,
  palaceOf,
} from '../src/dunjia/plates.js';
import {
  DEFAULT_OPTIONS,
  computeQimenChart,
  divergencesInForce,
  initEphemeris,
  resolveMoment,
  type ChartOptions,
  type Place,
} from '../src/index.js';

/**
 * The second 飛盤, held to what its two texts lay: `gateSeats: nine` and
 * `spiritRing: nine`.
 *
 * `docs/sources.md` § "《奇門遁甲鳴法》" and § "《奇門旨歸》" are where each case
 * was read: the 鳴法's worked 陰遁二局 and 陽遁二局 丙午 with their two drawings
 * (遼圖 manuscript, the file's opening 8), and boards of the 旨歸's 卷十四–三十一,
 * one 丙戌 of every 局 and four hours chosen for where the 使 stands. A board is
 * laid off the step functions for a 局 and an hour, as `feipan.test.ts` lays the
 * 法竅's.
 */
const HOUR = (hanzi: string): number => {
  for (let index = 0; index < 60; index += 1) if (ganzhiOf(index).hanzi === hanzi) return index;
  throw new Error(hanzi);
};

/**
 * The one character a print abbreviates each spirit by. 玄武 is printed 元
 * in the 旨歸, the Kangxi taboo on 玄.
 */
const PRINTED: Record<string, string> = {
  zhifu: '符', tengshe: '蛇', taiyin: '陰', liuhe: '合', gouchen: '勾', taichang: '常',
  zhuque: '朱', jiudi: '地', jiutian: '天', baihu: '白', xuanwu: '元',
};

function lay(yang: boolean, ju: number, hour: string, naming: ChartOptions['spirits'] = 'dun') {
  const hourGanzhi = ganzhiOf(HOUR(hour));
  const earth = earthPlate(yang, ju);
  const instrument = decadeInstrument(hourGanzhi);
  const hourStem = hourGanzhi.stem.id === 'jia' ? instrument : hourGanzhi.stem;
  const { heaven, stars } = carriedPlates(earth, instrument, hourStem);
  const chief = ninefoldChiefGate(earth, instrument);
  const seat = ninefoldGatePalace(earth, instrument, hourGanzhi, yang);
  const gates = ninefoldGatePlate(chief, seat);
  const spirits = ninefoldSpiritPlate(palaceOf(earth, hourStem), yang, naming);
  return { heaven, stars, gates, spirits, seat };
}

describe('the 鳴法 flies the gates and the spirits through nine', () => {
  it('lays its worked 陰遁二局 丙午 as it is drawn, 驚門 the 直使 in the centre', () => {
    // 「再自地盤七宮甲辰壬逆巳午時，午字在五中宮，即將驚門加之」. Star, its stem, gate,
    // spirit, 坎一 to 離九. The drawing names 勾陳 and 朱雀 under 陰, which is `fixed`.
    const board = lay(false, 2, '丙午', 'fixed');
    expect(board.seat).toBe(5);
    expect(board.gates[5]!.hanzi).toBe('驚門');
    const drawn = ['輔丙傷合', '禽丁杜陰', '心癸中蛇', '柱壬開符', '任辛驚勾', '英庚生地', '蓬己景朱', '芮戊休常', '沖乙死勾'];
    // The drawing leaves the centre's star, stem and spirit out: its middle is the earth plate.
    const row = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) =>
      `${board.stars[n]!.hanzi[1]}${board.heaven[n]!.hanzi}${board.gates[n]!.hanzi[0]}${PRINTED[board.spirits[n]!.id]}`,
    );
    for (const n of [1, 2, 3, 4, 6, 7, 8, 9]) expect(row[n - 1]).toBe(drawn[n - 1]);
  });

  it('lays its 陽遁二局 丙午 twin, 開門 the 直使 on 艮八 and 太常 in the centre', () => {
    // 「若陽遁二局則不然，而以甲辰壬加地盤九宮丙上，開加地盤八宮」.
    const board = lay(true, 2, '丙午', 'fixed');
    expect(board.seat).toBe(8);
    const row = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) =>
      `${board.stars[n]!.hanzi[1]}${board.heaven[n]!.hanzi}${board.gates[n]!.hanzi[0]}${PRINTED[board.spirits[n]!.id]}`,
    );
    expect(row).toEqual(['柱癸生蛇', '任丁景陰', '英丙休合', '蓬乙死勾', '芮戊傷常', '沖己杜朱', '輔庚中地', '禽辛開天', '心壬驚符']);
    expect(board.spirits[5]!.hanzi).toBe('太常');
  });
});

describe('the 旨歸 draws the same board for all 1080 hours', () => {
  it('lays its boards as they are printed, stem, gate, 使 and spirit', () => {
    // Heaven stem, gate (with * where the print sets 使 beside it), spirit, 坎一 to 離九.
    const printed: Array<[boolean, number, string, string, string]> = [
      [true, 1, '戊辰', 'PDF 71a', '戊開符 己驚蛇 庚生陰 辛景合 壬休*勾 癸死常 丁傷朱 丙杜地 乙中天'],
      [true, 1, '丙戌', 'PDF 73a', '壬生陰 癸景合 丁休勾 丙死常 乙傷*朱 戊杜地 己中天 庚開符 辛驚蛇'],
      [true, 2, '丙戌', 'PDF 81a', '辛生蛇 壬景陰 癸休合 丁死勾 丙傷常 乙杜*朱 戊中地 己開天 庚驚符'],
      [true, 3, '丙戌', 'PDF 89a', '庚生符 辛景蛇 壬休陰 癸死合 丁傷勾 丙杜常 乙中*朱 戊開地 己驚天'],
      [true, 4, '丙戌', 'PDF 97a', '己生天 庚景符 辛休蛇 壬死陰 癸傷合 丁杜勾 丙中常 乙開*朱 戊驚地'],
      [true, 5, '丙戌', 'PDF 105a', '戊生地 己景天 庚休符 辛死蛇 壬傷陰 癸杜合 丁中勾 丙開常 乙驚*朱'],
      [true, 6, '丙戌', 'PDF 113a', '乙生*朱 戊景地 己休天 庚死符 辛傷蛇 壬杜陰 癸中合 丁開勾 丙驚常'],
      [true, 7, '丙戌', 'PDF 121a', '丙生常 乙景*朱 戊休地 己死天 庚傷符 辛杜蛇 壬中陰 癸開合 丁驚勾'],
      [true, 8, '丙戌', 'PDF 129a', '丁生勾 丙景常 乙休*朱 戊死地 己傷天 庚杜符 辛中蛇 壬開陰 癸驚合'],
      [true, 9, '丙戌', 'PDF 137a', '癸生合 丁景勾 丙休常 乙死*朱 戊傷地 己杜天 庚中符 辛開蛇 壬驚陰'],
      [false, 9, '甲子', 'PDF 142b', '乙休天 丙死地 丁傷元 癸杜常 壬中白 辛開合 庚驚陰 己生蛇 戊景*符'],
      [false, 9, '丙戌', 'PDF 145a', '辛傷蛇 庚杜符 己中天 戊開地 乙驚*元 丙生常 丁景白 癸休合 壬死陰'],
      [false, 8, '丙戌', 'PDF 153a', '庚傷符 己杜天 戊中地 乙開*元 丙驚常 丁生白 癸景合 壬休陰 辛死蛇'],
      [false, 7, '丙戌', 'PDF 161a', '己傷天 戊杜地 乙中*元 丙開常 丁驚白 癸生合 壬景陰 辛休蛇 庚死符'],
      [false, 6, '丙戌', 'PDF 169a', '戊傷地 乙杜*元 丙中常 丁開白 癸驚合 壬生陰 辛景蛇 庚休符 己死天'],
      [false, 5, '丙戌', 'PDF 177a', '乙傷*元 丙杜常 丁中白 癸開合 壬驚陰 辛生蛇 庚景符 己休天 戊死地'],
      [false, 4, '丙戌', 'PDF 185a', '丙傷常 丁杜白 癸中合 壬開陰 辛驚蛇 庚生符 己景天 戊休地 乙死*元'],
      [false, 4, '戊申', 'PDF 188a', '丙中合 丁開陰 癸驚蛇 壬生符 辛景*天 庚休地 己死元 戊傷常 乙杜白'],
      [false, 3, '丙戌', 'PDF 193a', '丁傷白 癸杜合 壬中陰 辛開蛇 庚驚符 己生天 戊景地 乙休*元 丙死常'],
      [false, 2, '丙戌', 'PDF 201a', '癸傷合 壬杜陰 辛中蛇 庚開符 己驚天 戊生地 乙景*元 丙休常 丁死白'],
      [false, 1, '丙戌', 'PDF 209a', '壬傷陰 辛杜蛇 庚中符 己開天 戊驚地 乙生*元 丙景常 丁休白 癸死合'],
      [false, 1, '甲寅', 'PDF 212b', '戊休白 乙死合 丙傷陰 丁杜蛇 癸中*符 壬開天 辛驚地 庚生元 己景常'],
    ];
    for (const [yang, ju, hour, where, cells] of printed) {
      const board = lay(yang, ju, hour);
      cells.split(' ').forEach((cell, i) => {
        const n = i + 1;
        const shi = cell.includes('*');
        const [stem, gate, spirit] = [...cell.replace('*', '')];
        expect(board.heaven[n]!.hanzi, `${where} ${hour} p${n}`).toBe(stem);
        expect(board.gates[n]!.hanzi[0], `${where} ${hour} p${n}`).toBe(gate);
        expect(PRINTED[board.spirits[n]!.id], `${where} ${hour} p${n}`).toBe(spirit);
        if (shi) expect(board.seat, `${where} ${hour}`).toBe(n);
      });
    }
  });

  it('names the centre gate 中 and makes it the 直使 when the decade heads from the centre', () => {
    // 陰一局's 甲寅 decade: 癸 on 五, and every board of PDF 213 sets 使 beside 中.
    const board = lay(false, 1, '甲寅');
    expect(board.gates[5]).toMatchObject({ id: 'zhong', hanzi: '中', pinyin: 'zhōng' });
    expect(board.seat).toBe(5);
  });
});

describe('a ninefold 飛盤 board through the engine', () => {
  const context = initEphemeris();
  const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
  const CLOCK: ChartOptions = { ...DEFAULT_OPTIONS, trueSolarTime: false, dayBoundary: 'midnight' };
  const chart = (options: Partial<ChartOptions>) => {
    const laid = { ...CLOCK, ...options };
    return computeQimenChart(
      resolveMoment({ date: '2024-01-01', time: '02:30', timezone: 'Asia/Shanghai' }, BEIJING, laid, context),
      laid,
    );
  };

  it('puts a gate and a spirit in every palace and reads nothing at a host', () => {
    const board = chart({ plate: 'fei', gateSeats: 'nine', spiritRing: 'nine' });
    expect(board.palaces.every((p) => p.gate && p.spirit)).toBe(true);
    expect(board.palaces.some((p) => p.lodged)).toBe(false);
    expect(board.palaces.filter((p) => p.spirit!.id === 'taichang')).toHaveLength(1);
    expect(board.palaces.filter((p) => p.gate!.id === 'zhong')).toHaveLength(1);
  });

  it('leaves the 法竅 board as it was under the defaults', () => {
    const before = chart({ plate: 'fei' });
    const named = chart({ plate: 'fei', gateSeats: 'eight', spiritRing: 'eight' });
    expect(named.palaces).toEqual(before.palaces);
    expect(before.palaces.find((p) => p.palace.number === 5)!.gate).toBeUndefined();
  });

  it('asks both questions under 飛盤 and neither elsewhere', () => {
    const named = (board: ReturnType<typeof chart>) =>
      divergencesInForce('qimen', board.options).map((s) => s.parameter.id);
    expect(named(chart({ plate: 'fei' }))).toEqual(expect.arrayContaining(['gateSeats', 'spiritRing']));
    expect(named(chart({}))).not.toContain('gateSeats');
    expect(named(chart({ plate: 'xingfei' }))).not.toContain('spiritRing');
  });
});
