import { describe, expect, it } from 'vitest';
import { ganzhiOf } from '../src/ganzhi.js';
import { centreHost } from '../src/dunjia/palaces.js';
import {
  carriedGatePalace,
  carriedGatePlate,
  carriedPlates,
  chiefGate,
  decadeInstrument,
  earthPlate,
  flownPlates,
  palaceOf,
  spiritPlate,
} from '../src/dunjia/plates.js';
import {
  DEFAULT_OPTIONS,
  computeQimenChart,
  initEphemeris,
  divergencesInForce,
  resolveMoment,
  type ChartOptions,
  type Place,
} from '../src/index.js';

/**
 * 《奇門法竅》's 飛盤, held to what the work itself lays.
 *
 * `docs/sources.md` § "《奇門法竅》: the hour board flown whole, stated, drawn
 * and tabulated" is where each case was read: the 乙丑 drawings of 卷五 (華齡
 * 2011, pp. 108–143), the worked hours of its 奇儀符使行宮圖說 (pp. 103–104),
 * and hours of the tables of 卷七–八 (pp. 184–292). A board is laid off the
 * step functions for a 局 and an hour, so that what is asserted is the work's
 * own 局 and not an instant chosen to land on it.
 */
const HOUR = (hanzi: string): number => {
  for (let index = 0; index < 60; index += 1) if (ganzhiOf(index).hanzi === hanzi) return index;
  throw new Error(hanzi);
};

function lay(yang: boolean, ju: number, hour: string) {
  const hourGanzhi = ganzhiOf(HOUR(hour));
  const earth = earthPlate(yang, ju);
  const instrument = decadeInstrument(hourGanzhi);
  const hourStem = hourGanzhi.stem.id === 'jia' ? instrument : hourGanzhi.stem;
  // Every board the work prints lodges the centre by the solstice: 「中五寄艮」, 「中五寄坤」.
  const host = centreHost('dunni', yang, yang ? 'dongzhi' : 'xiazhi');
  const { heaven, stars } = carriedPlates(earth, instrument, hourStem);
  const chief = chiefGate(earth, instrument, host);
  const seat = carriedGatePalace(earth, instrument, hourGanzhi, yang, host);
  const gates = carriedGatePlate(chief, seat);
  const landing = palaceOf(earth, hourStem);
  const spirits = spiritPlate(landing, yang, 'fixed', host);
  const cell = (n: number) =>
    `${stars[n]!.hanzi[1]}${heaven[n]!.hanzi}${gates[n]?.hanzi[0] ?? ''}${spirits[n]?.hanzi[0] ?? ''}`;
  return { heaven, stars, gates, spirits, seat, chief, row: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(cell) };
}

/** Every gate at its own palace: what the tables mark 門伏. */
const atHome = (gates: ReturnType<typeof lay>['gates']) =>
  Object.entries(gates).every(([at, gate]) => Number(at) === gate.home);
/** The palaces holding the gate of the palace opposite: what the tables mark 門反. */
const opposed = (gates: ReturnType<typeof lay>['gates']) =>
  Object.entries(gates)
    .filter(([at, gate]) => Number(at) + gate.home === 10)
    .map(([at]) => Number(at))
    .sort();

describe('the 法竅 flies the hour board whole', () => {
  it('lays the 乙丑 boards of 卷五 as they are drawn, palace by palace', () => {
    // Star, its stem, gate, spirit, from 坎一 to 離九; the centre has no gate
    // and no spirit. Read off the drawings, the centre lodged 艮 or 坤.
    const drawn: Array<[boolean, number, string[]]> = [
      [true, 1, ['芮己景勾', '沖庚休螣', '輔辛死九', '禽壬傷九', '心癸', '柱丁杜六', '任丙開太', '英乙驚朱', '蓬戊生值']],
      [true, 4, ['芮丙休九', '沖乙死六', '輔戊傷值', '禽己杜螣', '心庚', '柱辛開朱', '任壬驚勾', '英癸生九', '蓬丁景太']],
      [true, 5, ['芮丁傷朱', '沖丙杜太', '輔乙開九', '禽戊驚值', '心己', '柱庚生勾', '任辛景六', '英壬休九', '蓬癸死螣']],
      [true, 6, ['芮癸景九', '沖丁休勾', '輔丙死螣', '禽乙傷太', '心戊', '柱己杜九', '任庚開朱', '英辛驚值', '蓬壬生六']],
      [false, 4, ['英壬死朱', '蓬辛傷值', '芮庚杜六', '沖己開太', '輔戊', '禽乙驚九', '心丙生九', '柱丁景勾', '任癸休螣']],
      [false, 5, ['英癸生九', '蓬壬景太', '芮辛休朱', '沖庚死勾', '輔己', '禽戊傷值', '心乙杜螣', '柱丙開九', '任丁驚六']],
      [false, 6, ['英丁休九', '蓬癸死螣', '芮壬傷勾', '沖辛杜六', '輔庚', '禽己開九', '心戊驚值', '柱乙生朱', '任丙景太']],
    ];
    for (const [yang, ju, row] of drawn) {
      expect(lay(yang, ju, '乙丑').row, `${yang ? '陽' : '陰'}${ju}`).toEqual(row);
    }
  });

  it('carries the earth plate the same way in a yin board, where the 折衷 reverses it', () => {
    // 陰遁五局 乙丑: every star one palace on, with its stem.
    const earth = earthPlate(false, 5);
    const wu = decadeInstrument(ganzhiOf(0));
    const yi = ganzhiOf(1).stem;
    const carried = carriedPlates(earth, wu, yi);
    const flown = flownPlates(earth, wu, yi, false);
    expect(carried.stars[1]!.hanzi).toBe('天英');
    expect(flown.stars[1]!.hanzi).not.toBe('天英');
    // Under yang the two are one arrangement.
    const yang = earthPlate(true, 3);
    expect(carriedPlates(yang, wu, yi)).toEqual(flownPlates(yang, wu, yi, true));
  });

  it('lays the hours its 圖說 works', () => {
    // 「乙丑時，即將天盤甲子直符、蓬星加於離九宮乙干之上，其人盤直使以休門加於坤二宮之上」.
    const yichou = lay(true, 1, '乙丑');
    expect(yichou.stars[9]!.hanzi).toBe('天蓬');
    expect(yichou.gates[2]!.hanzi).toBe('休門');
    // 「丙子時，則以天盤甲戌直符加於艮八宮地盤丙干之上，其人盤直使，即以死門加於巽四宮之上」.
    const bingzi = lay(true, 1, '丙子');
    expect(bingzi.stars[8]!.hanzi).toBe('天芮');
    expect(bingzi.gates[4]!.hanzi).toBe('死門');
    // 「如乙丑時，即以天盤甲子直符芮星加於地盤坎一宮乙干之上，其人盤直使以死門加於震三宮之上」.
    const two = lay(true, 2, '乙丑');
    expect([two.stars[1]!.hanzi, two.gates[3]!.hanzi]).toEqual(['天芮', '死門']);
    // 「乙丑時，即將天盤甲子直符英星加於坎一宮乙干之上，其人盤直使以景門加於艮八宮之上」.
    const nine = lay(false, 9, '乙丑');
    expect([nine.stars[1]!.hanzi, nine.gates[8]!.hanzi]).toEqual(['天英', '景門']);
    // 「如乙丑時，即將天盤甲子直符任星，加於離九宮地盤乙干之上，其人盤直使，即以生門加於兌七宮之上」.
    const eight = lay(false, 8, '乙丑');
    expect([eight.stars[9]!.hanzi, eight.gates[7]!.hanzi]).toEqual(['天任', '生門']);
  });

  it('keeps the 直使 out of the centre, waiting on the palace before', () => {
    // 陽遁一局 戊辰: the count from 坎 would reach 五, so 休門 stays on 巽四,
    // and the table marks 「星符伏 兌坤 反門」 (p. 184).
    const wuchen = lay(true, 1, '戊辰');
    expect(wuchen.seat).toBe(4);
    expect(atHome(wuchen.gates)).toBe(false);
    expect(opposed(wuchen.gates)).toEqual([2, 7]);
    // 陽遁四局 and 陰遁六局 乙丑 are drawn with every gate at home.
    expect(atHome(lay(true, 4, '乙丑').gates)).toBe(true);
    expect(atHome(lay(false, 6, '乙丑').gates)).toBe(true);
    // And it moves on the next hour: 陽遁四局 丙寅, 「乾坎 反門」 (p. 196).
    expect(opposed(lay(true, 4, '丙寅').gates)).toEqual([1, 6]);
  });

  it('gives a 旬首 in the centre the host gate, and steps it out to 六 or 四', () => {
    // 「甲子旬甲子天芮直符死門直使，中五寄坤」 (陰遁五局, p. 268).
    const yin = lay(false, 5, '甲子');
    expect(yin.chief.hanzi).toBe('死門');
    expect(yin.gates[2]!.hanzi).toBe('死門');
    // 庚午 「艮震 反門」, 壬申 「坤兌 反門」, 癸酉 「八門伏」.
    expect(opposed(lay(false, 5, '庚午').gates)).toEqual([3, 8]);
    expect(opposed(lay(false, 5, '壬申').gates)).toEqual([2, 7]);
    expect(atHome(lay(false, 5, '癸酉').gates)).toBe(true);
    // 陽遁五局: 「生門直使」, and at 乙丑 生門 on 乾六.
    expect(lay(true, 5, '甲子').chief.hanzi).toBe('生門');
    expect(lay(true, 5, '乙丑').gates[6]!.hanzi).toBe('生門');
  });
});

describe('a 飛盤 board through the engine', () => {
  const context = initEphemeris();
  const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
  const CLOCK: ChartOptions = { ...DEFAULT_OPTIONS, trueSolarTime: false, dayBoundary: 'midnight' };
  const chart = (date: string, time: string, options: Partial<ChartOptions>) => {
    const laid = { ...CLOCK, ...options };
    return computeQimenChart(
      resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, laid, context),
      laid,
    );
  };

  it('lays the 法竅 board at 乙丑 of 陽遁一局, gates carried and none in the centre', () => {
    const board = chart('2024-01-01', '02:30', {
      plate: 'fei',
      centreLodging: 'dunni',
      spirits: 'fixed',
    });
    expect(board.ju).toMatchObject({ yang: true, number: 1 });
    const at = (n: number) => board.palaces.find((p) => p.palace.number === n)!;
    expect(at(9).star.hanzi).toBe('天蓬');
    expect(at(5).gate).toBeUndefined();
    expect(board.chiefGate).toMatchObject({ gate: { hanzi: '休門' }, palace: { number: 2 } });
    expect([1, 2, 3, 4, 6, 7, 8, 9].map((n) => at(n).gate!.hanzi[0]).join('')).toBe('景休死傷杜開驚生');
  });

  it('does not report where the centre is read, which nothing reaches under 飛盤', () => {
    const fei = chart('2024-01-01', '02:30', { plate: 'fei', centreLodging: 'dunni' });
    const named = (board: typeof fei) =>
      divergencesInForce('qimen', board.options).map((s) => s.parameter.id);
    expect(named(fei)).not.toContain('centreTravel');
    expect(named(chart('2024-01-01', '02:30', {}))).toContain('centreTravel');
    expect(named(chart('2024-01-01', '02:30', { plate: 'xingfei' }))).toContain('centreTravel');
  });
});
