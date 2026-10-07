import { describe, expect, it } from 'vitest';
import {
  DEFAULT_OPTIONS,
  centreHost,
  computeQimenChart,
  initEphemeris,
  resolveMoment,
  type ChartOptions,
  type Place,
  type QimenChart,
} from '../src/index.js';

const context = initEphemeris();
const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
/** Clock time, so that an hour named here is the hour the board is laid on. */
const CLOCK: ChartOptions = { ...DEFAULT_OPTIONS, trueSolarTime: false, dayBoundary: 'midnight' };

function chart(date: string, time: string, options: Partial<ChartOptions> = {}): QimenChart {
  const laid = { ...CLOCK, ...options };
  return computeQimenChart(
    resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, laid, context),
    laid,
  );
}

const earthOf = (c: QimenChart) =>
  Object.fromEntries(c.palaces.map((p) => [p.palace.number, p.earth.hanzi]));

/**
 * Where the centre lodges, and how often the earth plate is laid.
 *
 * `docs/sources.md` § "The 折衷 on the plate, chapter by chapter" is where
 * each reading below was read; what is asserted is what a text prints. The
 * instants were chosen to land on the boards those texts speak of.
 */
describe('where the centre lodges', () => {
  it('names the palace each reading sends it to', () => {
    // 「陽局中五寄於二，陰局中五合於八」, the imperial print's variant copy.
    expect([centreHost('dun', true, 'dongzhi'), centreHost('dun', false, 'xiazhi')]).toEqual([2, 8]);
    // 「元經又謂陽遁寄艮，陰遁寄坤」, as the 折衷 quotes it.
    expect([centreHost('dunni', true, 'dongzhi'), centreHost('dunni', false, 'xiazhi')]).toEqual([
      8, 2,
    ]);
    // 「冬至三氣皆寄坎，立春三氣皆寄艮，春分三氣皆寄震，立夏三氣皆寄巽，夏至三氣
    // 皆寄離，立秋三氣皆寄坤，秋分三氣皆寄兌，立冬三氣皆寄乾」.
    const jie = ['dongzhi', 'lichun', 'chunfen', 'lixia', 'xiazhi', 'liqiu', 'qiufen', 'lidong'];
    expect(jie.map((term) => centreHost('bajie', true, term as never))).toEqual([
      1, 8, 3, 4, 9, 2, 7, 6,
    ]);
    expect(centreHost('bajie', true, 'dahan')).toBe(1);
    expect(centreHost('bajie', false, 'daxue')).toBe(6);
    // 「寄宮於巽，以春土旺於辰…於坤，以夏土旺於未…於乾，以秋土旺於戌…於艮，以冬
    // 土旺於丑」.
    expect(
      ['yushui', 'mangzhong', 'hanlu', 'dahan'].map((term) =>
        centreHost('siyu', true, term as never),
      ),
    ).toEqual([4, 2, 6, 8]);
    // And 坤 always, whatever the dun or the term.
    expect(centreHost('kun', false, 'xiazhi')).toBe(2);
  });

  it('gives the centre the gate of the palace it lodges in', () => {
    // 甲辰 in 陽遁一局, at 冬至: the decade's 儀 stands in the centre, so the
    // chief gate is the host's. 「如在冬至、小寒、大寒三氣則寄休門」.
    const winter = (centreLodging: ChartOptions['centreLodging']) =>
      chart('2024-01-04', '08:30', { centreLodging });
    expect(winter('kun').chief.star.hanzi).toBe('天禽');
    expect(winter('kun').chiefGate.gate.hanzi).toBe('死門');
    expect(winter('bajie').chiefGate.gate.hanzi).toBe('休門');
    expect(winter('dun').chiefGate.gate.hanzi).toBe('死門');
    expect(winter('dunni').chiefGate.gate.hanzi).toBe('生門');
    expect(winter('siyu').chiefGate.gate.hanzi).toBe('生門');

    // 甲戌 in 陰遁六局, at 夏至. 「夏至、小暑、大暑三氣則寄景門」.
    const summer = (centreLodging: ChartOptions['centreLodging']) =>
      chart('2024-06-24', '20:30', { centreLodging });
    expect(summer('bajie').chiefGate.gate.hanzi).toBe('景門');
    expect(summer('dun').chiefGate.gate.hanzi).toBe('生門');
    expect(summer('dunni').chiefGate.gate.hanzi).toBe('死門');
    expect(summer('siyu').chiefGate.gate.hanzi).toBe('死門');
  });

  it('keeps 《金鏡寶鑑》’s yin board under the lodging in 坤, and moves it under the other', () => {
    // 陰遁一局, 甲寅: 「死門 甲寅五」, which is the witness the register has for
    // 坤 on the half of the year the variant would change.
    expect(chart('2024-07-23', '04:30').chiefGate.gate.hanzi).toBe('死門');
    expect(chart('2024-07-23', '04:30', { centreLodging: 'dun' }).chiefGate.gate.hanzi).toBe(
      '生門',
    );
  });

  it('says where the centre’s stem is read, and reads it nowhere else', () => {
    for (const [centreLodging, host] of [
      ['kun', 2],
      ['bajie', 1],
      ['siyu', 8],
    ] as const) {
      const lodged = chart('2024-01-04', '08:30', { centreLodging }).palaces.filter(
        (p) => p.lodged !== undefined,
      );
      expect(lodged.map((p) => p.palace.number)).toEqual([host]);
    }
  });
});

describe('the earth plate laid anew at every decade', () => {
  it('lays the second decade of 陽遁一局 as the 折衷 enumerates it', () => {
    // 「如陽遁一局第二旬首甲戌在坤二宮，即從坤二上起甲，逆宮而佈：乙奇在坎一，
    // 丙奇在離九，丁奇在艮八，癸在兌七，壬在乾六，辛在中五，庚在巽四，己在震三，
    // 戊又在坤二宮矣」.
    const decade = chart('2024-01-01', '20:30', { earthPlate: 'xun' });
    expect(decade.ju).toMatchObject({ yang: true, number: 1 });
    expect(decade.moment.pillars.hour.hanzi).toBe('甲戌');
    expect(earthOf(decade)).toEqual({
      1: '乙', 2: '戊', 3: '己', 4: '庚', 5: '辛', 6: '壬', 7: '癸', 8: '丁', 9: '丙',
    });
    // 六戊還原: the decade's 甲 is concealed under 戊, where the 元's plate pins
    // 甲戌 to 己.
    expect(decade.instrument.hanzi).toBe('戊');
    expect(chart('2024-01-01', '20:30').instrument.hanzi).toBe('己');
  });

  it('leaves the first decade of a 元 as every text has it', () => {
    // 「除甲子一旬，諸書皆同」.
    const one = chart('2024-01-01', '00:30');
    const other = chart('2024-01-01', '00:30', { earthPlate: 'xun' });
    expect(other.palaces).toEqual(one.palaces);
  });

  it('keeps the chief star and the chief gate, and moves where the chief lands', () => {
    // 「仍照常例，惟不分貼六儀耳」. 乙亥 in the same decade: the star of 坤 is
    // the chief under both, and it goes to the palace of 乙 — 離九 on the 元's
    // plate, 坎一 on the decade's.
    const one = chart('2024-01-01', '22:30');
    const other = chart('2024-01-01', '22:30', { earthPlate: 'xun' });
    expect(one.moment.pillars.hour.hanzi).toBe('乙亥');
    expect(other.chief.star.hanzi).toBe(one.chief.star.hanzi);
    expect(other.chiefGate.gate.hanzi).toBe(one.chiefGate.gate.hanzi);
    expect(one.chief.palace.number).toBe(9);
    expect(other.chief.palace.number).toBe(1);
  });
});
