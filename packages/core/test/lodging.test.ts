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

/**
 * Where earth's season begins.
 *
 * 「惟土守中宫，分旺四季，每季前各旺十八日，總七十二日，合而成歲」, 《大六壬
 * 精解》 p. 214: a 六壬 text speaking of the phases, which counts for a 奇門
 * chart because the 三式 stand on one doctrine of them.
 */
describe('earth holding the eighteen days before a season opens', () => {
  // 2024: 清明 on 4 April, 立夏 on 5 May. 辰 is the month between them.
  const season = (date: string, earth: ChartOptions['earth']) =>
    chart(date, '12:30', { earth }).season;

  it('leaves the head of a closing month to the season it closes', () => {
    expect(chart('2024-04-07', '12:30').moment.pillars.month.branch.hanzi).toBe('辰');
    expect(season('2024-04-07', 'quarters')).toBe('tu');
    expect(season('2024-04-07', 'eighteen')).toBe('mu');
  });

  it('gives earth the eighteen days at its foot under both readings', () => {
    expect(season('2024-05-01', 'quarters')).toBe('tu');
    expect(season('2024-05-01', 'eighteen')).toBe('tu');
  });

  it('turns to earth eighteen days before the 節 that closes the month, to the instant', () => {
    // 立夏 2024 strikes on the morning of 5 May in Beijing, so eighteen days
    // before it falls on the morning of 17 April, between these two hours.
    const at = (time: string) => chart('2024-04-17', time, { earth: 'eighteen' }).season;
    expect(at('06:30')).toBe('mu');
    expect(at('10:30')).toBe('tu');
  });

  it('does the same at the foot of every season, and nothing in the months between', () => {
    // 未 closes summer, 戌 autumn, 丑 winter; 午 is no closing month.
    expect(season('2024-07-10', 'eighteen')).toBe('huo');
    expect(season('2024-10-10', 'eighteen')).toBe('jin');
    expect(season('2024-01-08', 'eighteen')).toBe('shui');
    expect(season('2024-06-15', 'eighteen')).toBe(season('2024-06-15', 'quarters'));
  });

  it('weighs the board against the season it names', () => {
    const quarters = chart('2024-04-07', '12:30');
    const eighteen = chart('2024-04-07', '12:30', { earth: 'eighteen' });
    const strengths = (c: QimenChart) => c.palaces.map((p) => p.starStrength.id).join(' ');
    expect(strengths(eighteen)).not.toBe(strengths(quarters));
    // The plates are the same plates: only what they are weighed against moved.
    expect(eighteen.palaces.map((p) => p.heaven.id)).toEqual(quarters.palaces.map((p) => p.heaven.id));
  });
});

/**
 * The stars and the stems flown, the gates turned.
 *
 * 《奇門遁甲折衷》 argues it at length and works two hours of 陽遁一局 in its
 * chapter on stems and branches, sheet 22: those are the test. What flying
 * back means it shows where it flies a 值符 both ways, sheet 24.
 */
describe('the plate flown, as the 折衷 lays it', () => {
  const fly = (date: string, time: string, moved: Partial<ChartOptions> = {}) =>
    chart(date, time, { plate: 'xingfei', ...moved });
  const at = (c: QimenChart, number: number) => c.palaces.find((p) => p.palace.number === number)!;

  it('sets the 值符 on 艮八 at 丙寅 of 陽遁一局, 龍返首', () => {
    // 「如陽遁第一局甲子日丙寅時，直符加艮八宮為龍返首」.
    const board = fly('2024-01-01', '04:30');
    expect(board.ju).toMatchObject({ yang: true, number: 1 });
    expect(board.moment.pillars.hour.hanzi).toBe('丙寅');
    expect(board.chief.star.hanzi).toBe('天蓬');
    expect(board.chief.palace.number).toBe(8);
    expect(`${at(board, 8).heaven.hanzi}加${at(board, 8).earth.hanzi}`).toBe('戊加丙');
    expect(board.patterns.map((pattern) => pattern.hanzi)).toContain('青龍返首');
  });

  it('puts 丁 over 癸 in 乾六 at 乙丑, 雀投江', () => {
    // 「又如乙丑時乾六宮丁加癸為雀投江」.
    const board = fly('2024-01-01', '02:30');
    expect(board.moment.pillars.hour.hanzi).toBe('乙丑');
    expect(`${at(board, 6).heaven.hanzi}加${at(board, 6).earth.hanzi}`).toBe('丁加癸');
    expect(board.patterns.map((pattern) => pattern.hanzi)).toContain('朱雀投江');
    // The turning plate has neither over that palace at that hour.
    const turned = chart('2024-01-01', '02:30');
    expect(at(turned, 6).heaven.hanzi).not.toBe('丁');
  });

  it('flies all nine through all nine, each star with the stem of its own palace', () => {
    for (const [date, time] of [['2024-01-01', '04:30'], ['2024-06-24', '22:30']] as const) {
      const board = fly(date, time);
      // Nothing lodges and nothing is left behind: nine stars, nine palaces.
      expect(new Set(board.palaces.map((p) => p.star.hanzi)).size).toBe(9);
      for (const p of board.palaces) {
        expect(p.heaven.hanzi).toBe(at(board, p.star.home).earth.hanzi);
      }
    }
  });

  it('counts forward under yang and back under yin, in the order of the stars’ own palaces', () => {
    // 「一加五、二加六、三加七」 forward; 「九加五、一加四、二加三、三加二」 back.
    const step = (board: QimenChart) => {
      const home = board.chief.star.home;
      const next = board.palaces.find((p) => p.star.home === (home % 9) + 1)!.palace.number;
      return (((next - board.chief.palace.number) % 9) + 9) % 9;
    };
    const yang = fly('2024-01-01', '04:30');
    const yin = fly('2024-06-24', '22:30');
    expect(yang.ju.yang).toBe(true);
    expect(yin.ju.yang).toBe(false);
    expect(step(yang)).toBe(1);
    expect(step(yin)).toBe(8);
  });

  it('leaves the earth plate and the gates as the turning plate has them', () => {
    const flown = fly('2024-01-01', '04:30');
    const turned = chart('2024-01-01', '04:30');
    expect(flown.palaces.map((p) => p.earth.id)).toEqual(turned.palaces.map((p) => p.earth.id));
    expect(flown.palaces.map((p) => p.gate?.id)).toEqual(turned.palaces.map((p) => p.gate?.id));
    expect(flown.chiefGate).toEqual(turned.chiefGate);
    // And both set the same star on the same palace: they part over the rest.
    expect(flown.chief.palace.number).toBe(turned.chief.palace.number);
    expect(flown.palaces.map((p) => p.star.id)).not.toEqual(turned.palaces.map((p) => p.star.id));
  });

  it('is the whole board the 折衷 lays, with its own earth plate and lodging', () => {
    const board = fly('2024-01-01', '20:30', { earthPlate: 'xun', centreLodging: 'bajie' });
    expect(board.options).toMatchObject({ plate: 'xingfei', earthPlate: 'xun', centreLodging: 'bajie' });
    expect(new Set(board.palaces.map((p) => p.star.hanzi)).size).toBe(9);
  });
});

