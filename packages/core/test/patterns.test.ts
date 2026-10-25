import { beforeAll, describe, expect, it } from 'vitest';
import { computeQimenChart, type QimenChart } from '../src/dunjia/index.js';
import { PATTERN_IDS, VALENCE_IDS, opposite, unmetHour, valenceOf } from '../src/dunjia/patterns.js';
import { PALACES, palace } from '../src/dunjia/palaces.js';
import { GATES } from '../src/dunjia/plates.js';
import { seasonElement, strengthOf } from '../src/dunjia/strength.js';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { BRANCHES, ganzhiFrom, hourGanzhi, STEMS } from '../src/ganzhi.js';
import { resolveMoment } from '../src/pillars.js';
import { DEFAULT_OPTIONS, type ChartOptions, type Place } from '../src/types.js';

let context: EphemerisContext;

beforeAll(() => {
  context = initEphemeris();
});

const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
/**
 * 茅山, because the fixtures below were chosen for the configurations a
 * particular ju lays out, and that ju is the one this engine computed by
 * default while the method was misnamed 拆補. The charts are unchanged; only
 * the name of the school that casts them is.
 * → `docs/history/40-the-default-was-maoshan.md`
 */
const CLOCK: ChartOptions = {
  ...DEFAULT_OPTIONS,
  method: 'maoshan',
  trueSolarTime: false,
  dayBoundary: 'midnight',
};

function cast(date: string, time: string): QimenChart {
  return computeQimenChart(
    resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, CLOCK, context),
    CLOCK,
  );
}

function idsOf(chart: QimenChart, id: string): number[] {
  return chart.patterns.filter((p) => p.id === id).map((p) => p.palace ?? 0).sort((a, b) => a - b);
}

describe('facing palaces', () => {
  it('pairs across the board, and leaves the centre alone', () => {
    expect(opposite(1)).toBe(9);
    expect(opposite(3)).toBe(7);
    expect(opposite(4)).toBe(6);
    expect(opposite(2)).toBe(8);
    expect(opposite(5)).toBeUndefined();
  });

  it('is its own inverse', () => {
    for (const p of PALACES) {
      if (p.number === 5) continue;
      expect(opposite(opposite(p.number) as number)).toBe(p.number);
    }
  });
});

describe('門迫 — the gate oppressed', () => {
  /**
   * Derived from the elements rather than tabulated, so the transmitted list
   * is the test. A gate is oppressed where it controls the palace it stands
   * in: the gates of metal among the palaces of wood, and so on.
   */
  const TRANSMITTED: [string, number[]][] = [
    ['開門', [3, 4]],
    ['驚門', [3, 4]],
    ['休門', [9]],
    ['生門', [1]],
    ['死門', [1]],
    ['傷門', [2, 8]],
    ['杜門', [2, 8]],
    ['景門', [6, 7]],
  ];

  it.each(TRANSMITTED)('%s is oppressed in exactly the published palaces', (hanzi, expected) => {
    const gate = GATES.find((candidate) => candidate.hanzi === hanzi)!;
    const gateElement = palace(gate.home).element;

    const oppressed = PALACES.filter(
      (p) => p.number !== 5 && strengthOf(p.element, gateElement).id === 'si',
    ).map((p) => p.number);

    // "The palace dies against the gate" is the same statement as "the gate
    // controls the palace", read from the other side.
    expect(oppressed.sort((a, b) => a - b)).toEqual(expected);
  });
});

describe('五不遇時 — the hour that does not meet', () => {
  /**
   * The rule is that the hour's stem controls the day's and the two share a
   * polarity. The mnemonic names one hour per day stem, but twelve hours draw
   * their stems from a cycle of ten, so two of them repeat: on a 己 day and
   * on a 庚 day the rule strikes twice, and the mnemonic names only the
   * earlier. The full set is what the rule produces.
   */
  const TRANSMITTED: [string, string[]][] = [
    ['甲', ['庚午']],
    ['乙', ['辛巳']],
    ['丙', ['壬辰']],
    ['丁', ['癸卯']],
    ['戊', ['甲寅']],
    ['己', ['乙丑', '乙亥']],
    ['庚', ['丙子', '丙戌']],
    ['辛', ['丁酉']],
    ['壬', ['戊申']],
    ['癸', ['己未']],
  ];

  it.each(TRANSMITTED)('on a %s day it is %s', (dayHanzi, expected) => {
    const dayStem = STEMS.find((stem) => stem.hanzi === dayHanzi)!;
    const unmet = BRANCHES.map((branch) => hourGanzhi(dayStem.index, branch.index)).filter((hour) =>
      unmetHour(dayStem, hour),
    );

    expect(unmet.map((hour) => hour.hanzi)).toEqual(expected);
  });

  it('strikes twice only where the hour stems wrap', () => {
    // Twelve branches over ten stems: the repeat can only land on the first
    // two hours of the day, which is why it touches exactly two day stems.
    const twice = STEMS.filter(
      (dayStem) =>
        BRANCHES.filter((branch) => unmetHour(dayStem, hourGanzhi(dayStem.index, branch.index)))
          .length === 2,
    );

    expect(twice.map((stem) => stem.hanzi)).toEqual(['己', '庚']);
  });
});

describe('旺相休囚死 — how a thing stands to the season', () => {
  it('reads the season from the month branch', () => {
    expect(seasonElement(BRANCHES[2]!).valueOf()).toBe('mu'); // 寅
    expect(seasonElement(BRANCHES[6]!).valueOf()).toBe('huo'); // 午
    expect(seasonElement(BRANCHES[9]!).valueOf()).toBe('jin'); // 酉
    expect(seasonElement(BRANCHES[0]!).valueOf()).toBe('shui'); // 子
    // The four that close a season belong to earth.
    for (const index of [4, 7, 10, 1]) {
      expect(seasonElement(BRANCHES[index]!).valueOf()).toBe('tu');
    }
  });

  it('gives each of the five states to exactly one element', () => {
    for (const season of ['mu', 'huo', 'tu', 'jin', 'shui'] as const) {
      const states = (['mu', 'huo', 'tu', 'jin', 'shui'] as const).map(
        (element) => strengthOf(element, season).id,
      );
      expect(new Set(states).size).toBe(5);
    }
  });

  it('prospers what rules the season and kills what the season controls', () => {
    // Summer is fire: fire prospers, earth is supported, wood rests, water is
    // imprisoned, metal dies.
    expect(strengthOf('huo', 'huo').hanzi).toBe('旺');
    expect(strengthOf('tu', 'huo').hanzi).toBe('相');
    expect(strengthOf('mu', 'huo').hanzi).toBe('休');
    expect(strengthOf('shui', 'huo').hanzi).toBe('囚');
    expect(strengthOf('jin', 'huo').hanzi).toBe('死');
  });
});

describe('a chart with configurations', () => {
  // 2024-06-15 14:00 in Beijing: the hour is 癸未, in the decade of 甲戌.
  let chart: QimenChart;

  beforeAll(() => {
    chart = cast('2024-06-15', '14:00');
  });

  it('finds the void palaces from the hour decade', () => {
    // The decade of 甲戌 leaves out 申 and 酉, which sit in Kun and Dui.
    expect(idsOf(chart, 'kongwang')).toEqual([2, 7]);
  });

  it('finds the instrument struck', () => {
    // 壬 heads the decade of 甲辰, and 辰 punishes itself in Xun.
    expect(idsOf(chart, 'jixing')).toEqual([4]);
    expect(chart.palaces.find((p) => p.palace.number === 4)?.earth.hanzi).toBe('壬');
  });

  it('sees the whole board come home', () => {
    const fuyin = chart.patterns.find((p) => p.id === 'fuyin');

    expect(fuyin?.layer).toBe('gate');
    // And that is checkable: every gate is standing where it belongs.
    for (const cell of chart.palaces) {
      if (cell.gate) expect(cell.gate.home).toBe(cell.palace.number);
    }
  });

  it('weighs the stars against the season', () => {
    // The month is 庚午, so the season is fire.
    expect(chart.season).toBe('huo');

    const byNumber = new Map(chart.palaces.map((p) => [p.palace.number, p]));
    expect(byNumber.get(8)?.star.hanzi).toBe('天英'); // fire
    expect(byNumber.get(8)?.starStrength.hanzi).toBe('旺');
    expect(byNumber.get(2)?.star.hanzi).toBe('天蓬'); // water
    expect(byNumber.get(2)?.starStrength.hanzi).toBe('囚');
  });

  it('gives the centre a star strength and no gate strength', () => {
    const centre = chart.palaces.find((p) => p.palace.number === 5)!;

    expect(centre.starStrength).toBeTruthy();
    expect(centre.gateStrength).toBeUndefined();
  });
});

describe('what the configurations are, and are not', () => {
  it('reports only facts checkable off the plates', () => {
    // Every pattern found must be re-derivable from the palace it names.
    for (const date of ['2001-03-07', '2011-09-23', '2023-12-11']) {
      for (const hour of ['03:00', '11:00', '21:00']) {
        const chart = cast(date, hour);
        const byNumber = new Map(chart.palaces.map((p) => [p.palace.number, p]));

        for (const pattern of chart.patterns) {
          if (pattern.palace === undefined) continue;
          const cell = byNumber.get(pattern.palace);
          expect(cell, `${date} ${hour} ${pattern.id}`).toBeTruthy();
          if (pattern.id === 'menpo') expect(cell?.gate).toBeTruthy();
          if (pattern.id === 'qinglongfanshou') {
            expect(cell?.heaven.hanzi).toBe('戊');
            expect(cell?.earth.hanzi).toBe('丙');
          }
          if (pattern.id === 'feiniaodiexue') {
            expect(cell?.heaven.hanzi).toBe('丙');
            expect(cell?.earth.hanzi).toBe('戊');
          }
        }
      }
    }
  });

  it('says the fortune of every configuration it reports, bar two cells no line weighs', () => {
    // 青龍入雲格 and 青龍華蓋 are laid by the default and every line that
    // names them hands the verdict to the gate, so they carry none.
    const unweighed = new Set(['qinglongruyunge', 'qinglonghuagai']);
    for (const date of ['2005-05-05', '2015-08-08', '2022-02-22', '2024-06-15']) {
      for (const pattern of cast(date, '14:00').patterns) {
        if (pattern.valence === undefined) {
          expect(unweighed.has(pattern.id), pattern.id).toBe(true);
          continue;
        }
        expect(['ji', 'xiong', 'jixiong']).toContain(pattern.valence.id);
        expect(pattern.valence.hanzi).toBeTruthy();
      }
    }
  });

  it('gives each configuration the fortune the sources hand it', () => {
    // Stated against the table rather than against occurrences: 青龍返首 wants
    // heaven's 戊 over earth's 丙 and is rare enough that any sample of charts
    // small enough to run here can miss it entirely — which it did.
    //
    // 空亡 is the only one of the nine that takes both, and that is transmitted
    // rather than hedged: the void withholds, which is a loss or a reprieve
    // according to what fell into it, and the engine does not decide which.
    expect(valenceOf('kongwang')).toEqual({ id: 'jixiong', hanzi: '吉凶', pinyin: 'jíxiōng' });
    expect(valenceOf('qinglongfanshou')).toEqual({ id: 'ji', hanzi: '吉', pinyin: 'jí' });
    expect(valenceOf('feiniaodiexue')).toEqual({ id: 'ji', hanzi: '吉', pinyin: 'jí' });
    for (const id of ['rumu', 'menpo', 'jixing', 'fuyin', 'fanyin', 'wubuyu'] as const) {
      expect(valenceOf(id)).toEqual({ id: 'xiong', hanzi: '凶', pinyin: 'xiōng' });
    }

    // Total: a configuration added without a fortune must not slip through.
    // The one exception is 《金函玉鏡》's table under `stemPairs: jinhan`, which
    // carries a fortune only where that text states one, and is held to that
    // cell by cell in `stem-pairs.test.ts`.
    const own = PATTERN_IDS.slice(0, PATTERN_IDS.indexOf('qinglongheling'));
    expect(own).toContain('riqiruwu');
    for (const id of own) expect(VALENCE_IDS).toContain(valenceOf(id)?.id);
  });

  it('reports each occurrence with the fortune its name carries', () => {
    for (const date of ['2005-05-05', '2015-08-08', '2022-02-22', '2024-06-15']) {
      for (const hour of ['01:00', '14:00', '23:30']) {
        for (const pattern of cast(date, hour).patterns) {
          expect(pattern.valence).toEqual(valenceOf(pattern.id));
        }
      }
    }
  });

  it('carries the fortune as an identifier and a glyph, never as a sentence', () => {
    // The whole of the restated boundary in one assertion. A fortune is an
    // attribute of an arrangement and travels as data, so the engine's output
    // stays free of any language at all — the gloss is the surface's business,
    // exactly as it is for a gate or a star. What must never appear is the
    // vocabulary of advice and ranking, in any locale: that would mean the
    // engine had heard a question, and it never does.
    const serialised = JSON.stringify(cast('2024-06-15', '14:00').patterns).toLowerCase();

    for (const word of ['auspicious', 'inauspicious', 'fausto', 'infausto']) {
      expect(serialised).not.toContain(word);
    }
    for (const word of ['lucky', 'best', 'worst', 'avoid', 'should', 'recommend', 'score']) {
      expect(serialised).not.toContain(word);
    }
  });

  it('cannot report both a board come home and one turned about on the same layer', () => {
    for (const date of ['2005-05-05', '2015-08-08', '2022-02-22']) {
      for (const hour of ['01:00', '13:00']) {
        const chart = cast(date, hour);
        const fuyin = chart.patterns.find((p) => p.id === 'fuyin');
        const fanyin = chart.patterns.find((p) => p.id === 'fanyin');
        if (fuyin && fanyin) expect(fuyin.layer).not.toBe(fanyin.layer);
      }
    }
  });
});

describe('入墓 — where 丁 is buried', () => {
  const laid = (date: string, time: string, dingTomb: ChartOptions['dingTomb']): QimenChart => {
    const options: ChartOptions = { ...CLOCK, method: 'chaibu', dingTomb };
    return computeQimenChart(
      resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, options, context),
      options,
    );
  };
  const heavenOf = (chart: QimenChart, stem: string): number | undefined =>
    chart.palaces.find((cell) => cell.heaven.hanzi === stem)?.palace.number;

  it('marks 丁 over 乾 under the 符應經 and leaves it unmarked under the 統宗', () => {
    // 陽遁一局, 甲己日丙寅時: 乙 is carried to 坤 and 丁 to 乾.
    // 「六乙日奇臨二宮，六丙月奇、六丁星奇在六宮」.
    const gen = laid('2020-03-07', '04:00', 'gen');
    const qian = laid('2020-03-07', '04:00', 'qian');
    expect([heavenOf(gen, '乙'), heavenOf(gen, '丁')]).toEqual([2, 6]);
    expect(idsOf(gen, 'rumu')).toEqual([2]);
    expect(idsOf(qian, 'rumu').sort()).toEqual([2, 6]);
    expect(qian.options.dingTomb).toBe('qian');
  });

  it('parts from the default on 丁 alone, over 艮 and over 乾', () => {
    let overGen = 0;
    let overQian = 0;
    for (let day = 1; day <= 20; day += 1) {
      for (let hour = 0; hour < 24; hour += 2) {
        const date = `2021-05-${String(day).padStart(2, '0')}`;
        const time = `${String(hour).padStart(2, '0')}:30`;
        const gen = laid(date, time, 'gen');
        const qian = laid(date, time, 'qian');
        const ding = heavenOf(gen, '丁');
        const expected = new Set(idsOf(gen, 'rumu'));
        if (ding === 8) {
          expected.delete(8);
          overGen += 1;
        }
        if (ding === 6) {
          expected.add(6);
          overQian += 1;
        }
        expect(new Set(idsOf(qian, 'rumu'))).toEqual(expected);
        expect(qian.palaces.map((cell) => cell.heaven.hanzi)).toEqual(
          gen.palaces.map((cell) => cell.heaven.hanzi),
        );
      }
    }
    expect(overGen).toBeGreaterThan(0);
    expect(overQian).toBeGreaterThan(0);
  });
});

describe('入墓 — where 乙 is buried', () => {
  const laid = (date: string, time: string, yiTomb: ChartOptions['yiTomb']): QimenChart => {
    const options: ChartOptions = { ...CLOCK, method: 'chaibu', yiTomb };
    return computeQimenChart(
      resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, options, context),
      options,
    );
  };
  const heavenOf = (chart: QimenChart, stem: string): number | undefined =>
    chart.palaces.find((cell) => cell.heaven.hanzi === stem)?.palace.number;

  it('marks 乙 over 坤 under the 統宗 and over 乾 under the 秘笈大全, and nothing else moves', () => {
    // 「六乙臨坤請避之」 against 「乙丙臨乾請避之」.
    let overKun = 0;
    let overQian = 0;
    for (let day = 1; day <= 20; day += 1) {
      for (let hour = 0; hour < 24; hour += 2) {
        const date = `2021-05-${String(day).padStart(2, '0')}`;
        const time = `${String(hour).padStart(2, '0')}:30`;
        const kun = laid(date, time, 'kun');
        const qian = laid(date, time, 'qian');
        const yi = heavenOf(kun, '乙');
        const expected = idsOf(kun, 'rumu');
        if (yi === 2) {
          expected.splice(expected.indexOf(2), 1);
          overKun += 1;
        }
        if (yi === 6) {
          expected.push(6);
          overQian += 1;
        }
        expect(idsOf(qian, 'rumu').sort()).toEqual(expected.sort());
        expect(qian.palaces.map((cell) => cell.heaven.hanzi)).toEqual(
          kun.palaces.map((cell) => cell.heaven.hanzi),
        );
      }
    }
    expect(overKun).toBeGreaterThan(0);
    expect(overQian).toBeGreaterThan(0);
  });
});

describe('門迫 — which relation carries the name', () => {
  const laid = (date: string, time: string, menpo: ChartOptions['menpo']): QimenChart => {
    const options: ChartOptions = { ...CLOCK, method: 'chaibu', menpo };
    return computeQimenChart(
      resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, options, context),
      options,
    );
  };

  it('names the palace controlling its gate 門迫 and the converse 宮迫 under 吉凶格解', () => {
    // 「門迫宮制門，宮迫門制宮」.
    let seen = 0;
    for (const date of ['2005-05-05', '2015-08-08', '2022-02-22', '2024-06-15']) {
      for (const hour of ['01:00', '09:00', '14:00', '23:30']) {
        const ming = laid(date, hour, 'menzhigong');
        const gong = laid(date, hour, 'gongzhimen');
        expect(idsOf(ming, 'gongpo')).toEqual([]);
        expect(gong.palaces.map((cell) => cell.gateRelation?.id)).toEqual(
          ming.palaces.map((cell) => cell.gateRelation?.id),
        );
        for (const cell of gong.palaces) {
          if (!cell.gate) continue;
          const at = cell.palace.number;
          expect(idsOf(gong, 'menpo').includes(at)).toBe(cell.gateRelation?.id === 'kewo');
          expect(idsOf(gong, 'gongpo').includes(at)).toBe(cell.gateRelation?.id === 'woke');
          expect(idsOf(gong, 'gongpo').includes(at)).toBe(idsOf(ming, 'menpo').includes(at));
          if (cell.gateRelation?.id === 'kewo') seen += 1;
        }
      }
    }
    expect(seen).toBeGreaterThan(0);
  });
});

describe('三奇得使 — a marvel with its envoy', () => {
  const laid = (date: string, time: string, deshi: ChartOptions['deshi']): QimenChart => {
    const options: ChartOptions = { ...CLOCK, method: 'chaibu', deshi };
    return computeQimenChart(
      resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, options, context),
      options,
    );
  };
  // 「乙奇加甲午甲戌　丙奇加甲子甲申　丁奇加甲寅甲辰」: each decade by its instrument.
  const PAIRED: Record<string, string> = { 乙: '己辛', 丙: '戊庚', 丁: '壬癸' };

  it('marks a marvel over an instrument of its decades, and one with the chief gate', () => {
    let liuyi = 0;
    let zhishi = 0;
    for (let day = 1; day <= 20; day += 1) {
      for (let hour = 0; hour < 24; hour += 2) {
        const date = `2021-05-${String(day).padStart(2, '0')}`;
        const time = `${String(hour).padStart(2, '0')}:30`;
        const byPair = laid(date, time, 'liuyi');
        const byGate = laid(date, time, 'zhishi');
        const expectPair: number[] = [];
        const expectGate: number[] = [];
        for (const cell of byPair.palaces) {
          const at = cell.palace.number;
          if (at === 5) continue;
          const above = cell.heaven.hanzi;
          if (PAIRED[above]?.includes(cell.earth.hanzi)) expectPair.push(at);
          if (PAIRED[above] && cell.gate?.id === byPair.chiefGate.gate.id) expectGate.push(at);
        }
        expect(idsOf(byPair, 'sanqideshi')).toEqual(expectPair.sort());
        expect(idsOf(byGate, 'sanqideshi')).toEqual(expectGate.sort());
        liuyi += expectPair.length;
        zhishi += expectGate.length;
        expect(byGate.palaces.map((cell) => cell.heaven.hanzi)).toEqual(
          byPair.palaces.map((cell) => cell.heaven.hanzi),
        );
      }
    }
    expect(liuyi).toBeGreaterThan(0);
    expect(zhishi).toBeGreaterThan(0);
  });
});

describe('ganzhiFrom', () => {
  it('is the inverse of the pair it names', () => {
    // Used by the unmet-hour table above; worth its own line.
    expect(ganzhiFrom(6, 6).hanzi).toBe('庚午');
    expect(ganzhiFrom(9, 7).hanzi).toBe('癸未');
  });
});
