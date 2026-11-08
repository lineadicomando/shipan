import { ganzhiOf, type Ganzhi, type Stem } from '../ganzhi.js';
import type { Moment } from '../pillars.js';
import type { ChartOptions } from '../types.js';
import { CHART_PARAMETERS, requireImplemented } from '../parameters.js';
import { ChartError } from '../errors.js';
import { YUAN_HANZI, YUAN_PINYIN, type Yuan } from './ju.js';
import { PALACES, lodge, palace, type ByPalace, type Palace } from './palaces.js';
import {
  chiefGate,
  chiefGatePalace,
  chiefStar,
  decadeInstrument,
  earthPlate,
  gatePlate,
  heavenPlate,
  hostLanding,
  palaceOf,
  spiritPlate,
  starPlate,
  type Gate,
  type Spirit,
  type Star,
} from './plates.js';

/**
 * The year family, 年家奇門: the hour board's procedure laid on the year pillar.
 *
 * Both holders give it in the hour board's own steps. 《遁甲演義》卷一:
 * 「上元一宮起甲子，中元四宮起甲子，下元七宮起甲子。俱逆飛六儀，順布三奇……以其
 * 甲頭為直符，符上之門為直使，將甲頭直符之星逐年干轉，直使隨年支逆飛」. The 統宗卷二
 * 附年奇門起例: 「看其年支臨於地盤何宮，即以天盤直使加之。看其年干臨於地盤何宮，
 * 即以天盤直符加之」, and the spirits 「以八神之直符加於天蓬逆轉」. The heaven
 * plate is turned and not flown, read on both plates. → `docs/sources.md`
 * § "年家 and 月家 on the plate: the heaven plate is turned"
 *
 * So it is a calculation beside `computeQimenChart` that calls the same steps
 * with the year where the hour stood, and carries nothing the holders do not
 * lay: no season, no strengths, no configurations, no post horses. A year has
 * no term to weigh a star against, and the configurations are the hour
 * board's, named of hours.
 */

/** The 元 a year stands in: sixty years each, a hundred and eighty to the round. */
export interface YearYuan {
  id: Yuan;
  hanzi: string;
  pinyin: string;
  /** The 甲子 year that opened it, as a proleptic Gregorian year. */
  opened: number;
}

/**
 * A 上元 opens in 1684: 「今康熙二十三年交上元甲子起」, 遁甲集成 第三冊, whose
 * chain of epochs walks back one 甲子 at a time to 元泰定元年 (1324). The
 * 演義's own date agrees, 1564 being two 甲子 on and the 中元 its 杜門 needs.
 */
const UPPER_EPOCH = 1684;

/** The 局 of each 元, by `yearYuan`. Always 陰遁. */
const YEAR_JU: Record<ChartOptions['yearYuan'], readonly [number, number, number]> = {
  yisiqi: [1, 4, 7],
  yiqisi: [1, 7, 4],
};

const YUAN_ORDER: readonly Yuan[] = ['shang', 'zhong', 'xia'];

const wrap = (value: number, modulus: number): number => ((value % modulus) + modulus) % modulus;

/**
 * The Gregorian year a year pillar is named for.
 *
 * The pillar is cut by `yearBoundary`, so the civil year it falls in can be one
 * on either side of the instant's: January before 立春 stands in the last
 * year, late December under `dongzhi` in the next. Of three consecutive years
 * exactly one carries the pillar's place in the sixty.
 */
export function pillarYear(moment: Moment): number {
  const civil = Number.parseInt(moment.local.slice(0, moment.local.indexOf('-', 1)), 10);
  const index = moment.pillars.year.index;
  for (const candidate of [civil, civil - 1, civil + 1]) {
    if (wrap(candidate - 4, 60) === index) return candidate;
  }
  throw new Error(`no year beside ${civil} carries the year pillar ${moment.pillars.year.hanzi}`);
}

/** The 元 of a year pillar, by the 甲子 year that opened its sixty. */
export function yearYuanOf(year: number, index: number): YearYuan {
  const opened = year - index;
  const id = YUAN_ORDER[wrap((opened - UPPER_EPOCH) / 60, 3)] as Yuan;
  return { id, hanzi: YUAN_HANZI[id], pinyin: YUAN_PINYIN[id], opened };
}

/** Everything standing over one palace of a year board. */
export interface YearPalace {
  palace: Palace;
  earth: Stem;
  heaven: Stem;
  star: Star;
  /** Absent in the centre, which has no gate. */
  gate?: Gate;
  /** Absent in the centre, which has no spirit. */
  spirit?: Spirit;
  /** The centre's stem, on the palace it lodges in. As on the hour board. */
  lodged?: Stem;
  /** The centre's stem riding with its host's, under `centreStem: host`. */
  heavenLodged?: Stem;
}

/** A board of the year family. */
export interface YearChart {
  moment: Moment;
  /** The year pillar the board is laid on. */
  year: Ganzhi;
  /** The 元 of sixty years it stands in. */
  yuan: YearYuan;
  /** Always 陰遁, whatever the half of the year: both holders lay it so. */
  ju: { yang: false; number: number };
  /** The instrument concealing 甲 for the year's decade (符首). */
  instrument: Stem;
  /** The year's stem, or the instrument standing in for it when it is 甲. */
  yearStem: Stem;
  /** The chief and its palace (值符), reported as `centreTravel` says. */
  chief: { star: Star; palace: Palace };
  /** The chief gate and where it came to rest (值使). */
  chiefGate: { gate: Gate; palace: Palace };
  /** The nine palaces, in Luoshu order. */
  palaces: YearPalace[];
  /** The options this board was laid with. */
  options: ChartOptions;
}

/**
 * Where the centre lodges on a board that is always 陰遁, as `centreHost` has
 * it for the yin half. The lodgings that read a term have none to read here, a
 * year having no 氣; `requireOnPillar` refuses them before this runs.
 */
function hostOnPillar(lodging: ChartOptions['centreLodging']): number {
  switch (lodging) {
    case 'kun':
      return 2;
    case 'dun':
      return 8;
    case 'dunni':
      return 2;
    default:
      throw new ChartError('OPTION_NOT_IMPLEMENTED', {
        option: 'centreLodging',
        value: lodging,
        implemented: 'kun, dun, dunni',
      });
  }
}

/**
 * Lays a board on a pillar, as the hour board is laid on the hour.
 *
 * What the year family and the month family share: a 局 of the 陰遁, the
 * pillar's decade for the 直符 and 直使, its stem for the turn and its place in
 * the decade for the 直使's count. The month calls it with the month pillar.
 */
export function layOnPillar(
  pillar: Ganzhi,
  number: number,
  options: ChartOptions,
): Omit<YearChart, 'moment' | 'year' | 'yuan' | 'yearStem' | 'options'> & { stem: Stem } {
  const yang = false;
  const earth = earthPlate(yang, number);
  const instrument = decadeInstrument(pillar);
  const stem = pillar.stem.id === 'jia' ? instrument : pillar.stem;
  const host = hostOnPillar(options.centreLodging);

  const heaven = heavenPlate(earth, instrument, stem, host);
  const stars = starPlate(earth, instrument, stem, host);
  const rides = options.centreStem === 'host' ? hostLanding(earth, instrument, stem, host) : undefined;

  const chief = chiefStar(earth, instrument);
  const chiefLanding = palaceOf(earth, stem);
  const gate = chiefGate(earth, instrument, host);
  // 「直使隨年支逆飛」: counted back through the nine from the decade's palace,
  // one palace a pillar, as the hour board counts its 直使 by the hour.
  const gateLanding = chiefGatePalace(earth, instrument, pillar, yang);
  const gates = gatePlate(gate, lodge(gateLanding, host));
  // 「以八神之直符加於天蓬逆轉」: from where the heaven-plate 值符 lands, back.
  const spirits = spiritPlate(chiefLanding, yang, options.spirits, host);

  const travels = options.centreTravel === 'travel';
  const palaces = PALACES.map((seat): YearPalace => {
    const contents: YearPalace = {
      palace: seat,
      earth: earth[seat.number] as Stem,
      heaven: heaven[seat.number] as Stem,
      star: (stars as ByPalace<Star>)[seat.number] as Star,
    };
    const gateHere = gates[seat.number];
    const spiritHere = spirits[seat.number];
    if (gateHere) contents.gate = gateHere;
    if (spiritHere) contents.spirit = spiritHere;
    if (seat.number !== 5 && host === seat.number) contents.lodged = earth[5] as Stem;
    if (rides === seat.number) contents.heavenLodged = earth[5] as Stem;
    return contents;
  });

  return {
    ju: { yang, number },
    instrument,
    stem,
    chief: { star: chief, palace: palace(travels ? chiefLanding : lodge(chiefLanding, host)) },
    chiefGate: { gate, palace: palace(travels ? gateLanding : lodge(gateLanding, host)) },
    palaces,
  };
}

/**
 * The options a board on a pillar reads, refused where the engine has no value
 * for them on such a board.
 *
 * `bajie` and `siyu` lodge the centre by the term, and a year has none; laying
 * the year under either would be choosing a term for it.
 */
export function requireOnPillar(options: ChartOptions, own: 'yearYuan' | 'monthYuan' = 'yearYuan'): void {
  requireImplemented(CHART_PARAMETERS, options, 'system', 'centreLodging', 'spirits', 'centreTravel', 'centreStem', own);
  if (options.centreLodging === 'bajie' || options.centreLodging === 'siyu') {
    throw new ChartError('OPTION_NOT_IMPLEMENTED', {
      option: 'centreLodging',
      value: options.centreLodging,
      implemented: 'kun, dun, dunni',
    });
  }
}

/**
 * Lays the board of a year.
 *
 * Off the year pillar and the 元 it stands in, and off nothing else the moment
 * carries: the month, the day and the hour move nothing here.
 */
export function computeYearChart(moment: Moment, options: ChartOptions): YearChart {
  if (options.system !== 'nianjia') {
    throw new ChartError('OPTION_NOT_IMPLEMENTED', {
      option: 'system',
      value: options.system,
      implemented: 'nianjia',
    });
  }
  requireOnPillar(options);

  const year = moment.pillars.year;
  const yuan = yearYuanOf(pillarYear(moment), year.index);
  const number = YEAR_JU[options.yearYuan][YUAN_ORDER.indexOf(yuan.id)] as number;
  const { stem, ...board } = layOnPillar(year, number, options);

  return { moment, year, yuan, yearStem: stem, ...board, options };
}

/**
 * The month family, 月家奇門: the same procedure laid on the month pillar.
 *
 * 《遁甲演義》卷一: 「凡推月奇門先審其年在何一元內　依前布門飛奇　次就其年遁月建係某
 * 甲頭直符逐地下月干轉　符上之門為直使　隨月支飛泊」. The 統宗卷二 附月奇門起例 closes
 * on the year's sentence, 「看月建之支臨於地盤何宮　即以天盤值使加之　看月建之干臨於
 * 地盤何宮　即以天盤直符加之　與年奇門同」. So `layOnPillar` with the month pillar,
 * on a 局 of the 陰遁 the five years decide. → `docs/sources.md` § "年家 and 月家
 * on the plate: the heaven plate is turned"
 *
 * The 演義's clause 「自嘉靖四十二年十一月甲子起休門在坎三箇月一移」 is not this
 * board: its two dates fall in different 元, and fit a gate moved three months
 * to a palace, a second layer the engine does not lay.
 */

/** The 元 a month stands in: the five years opened by a 甲 or a 己 year. */
export interface MonthYuan {
  id: Yuan;
  hanzi: string;
  pinyin: string;
  /** The 甲 or 己 year that opened the five, as a proleptic Gregorian year. */
  opened: number;
  /** That year's pillar, whose branch decides the 元. */
  opener: Ganzhi;
}

/**
 * The 元 and the 局 of each branch group, by `monthYuan`, in the order
 * 子午卯酉 · 寅申巳亥 · 辰戌丑未.
 */
const MONTH_YUAN: Record<'ziwu' | 'yinshen', readonly { yuan: Yuan; ju: number }[]> = {
  ziwu: [
    { yuan: 'shang', ju: 1 },
    { yuan: 'zhong', ju: 4 },
    { yuan: 'xia', ju: 7 },
  ],
  yinshen: [
    { yuan: 'zhong', ju: 7 },
    { yuan: 'shang', ju: 1 },
    { yuan: 'xia', ju: 4 },
  ],
};

/**
 * Which of the three groups a branch is in: 子午卯酉 0, 寅申巳亥 1, 辰戌丑未 2.
 * By the branch's index, 子 being 0: the 仲 are the multiples of three, the 孟
 * one short of one, the 季 one past.
 */
const branchGroup = (branchIndex: number): number => [0, 2, 1][branchIndex % 3] as number;

/** A board of the month family. */
export interface MonthChart {
  moment: Moment;
  /** The month pillar the board is laid on, cut at the 節. */
  month: Ganzhi;
  /** The year pillar whose five years decide the 局. */
  year: Ganzhi;
  /** The 元 of five years it stands in. */
  yuan: MonthYuan;
  /** Always 陰遁: the 統宗's 「用陰遁一局」, and the 演義's formula, its 年家's. */
  ju: { yang: false; number: number };
  /** The instrument concealing 甲 for the month's decade (符首). */
  instrument: Stem;
  /** The month's stem, or the instrument standing in for it when it is 甲. */
  monthStem: Stem;
  /** The chief and its palace (值符), reported as `centreTravel` says. */
  chief: { star: Star; palace: Palace };
  /** The chief gate and where it came to rest (值使). */
  chiefGate: { gate: Gate; palace: Palace };
  /** The nine palaces, in Luoshu order. */
  palaces: YearPalace[];
  /** The options this board was laid with. */
  options: ChartOptions;
}

/** The 元 of five years a year pillar stands in, as `monthYuan` names it. */
export function monthYuanOf(
  year: number,
  pillar: Ganzhi,
  rule: 'ziwu' | 'yinshen',
): MonthYuan & { ju: number } {
  const back = pillar.index % 5;
  const openerIndex = pillar.index - back;
  const opener = ganzhiOf(openerIndex);
  const { yuan, ju } = MONTH_YUAN[rule][branchGroup(opener.branch.index)] as { yuan: Yuan; ju: number };
  return { id: yuan, hanzi: YUAN_HANZI[yuan], pinyin: YUAN_PINYIN[yuan], opened: year - back, opener, ju };
}

/**
 * Lays the board of a month.
 *
 * Off the month pillar and the year that places it in five, and off nothing
 * else the moment carries: the day and the hour move nothing here.
 */
export function computeMonthChart(moment: Moment, options: ChartOptions): MonthChart {
  if (options.system !== 'yuejia') {
    throw new ChartError('OPTION_NOT_IMPLEMENTED', {
      option: 'system',
      value: options.system,
      implemented: 'yuejia',
    });
  }
  requireOnPillar(options, 'monthYuan');
  // `requireOnPillar` has refused `yuejian`, which names no 局.
  const rule = options.monthYuan as 'ziwu' | 'yinshen';

  const { month, year } = moment.pillars;
  const { ju: number, ...yuan } = monthYuanOf(pillarYear(moment), year, rule);
  const { stem, ...board } = layOnPillar(month, number, options);

  return { moment, month, year, yuan, monthStem: stem, ...board, options };
}
