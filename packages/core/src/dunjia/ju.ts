import { CHART_PARAMETERS, requireImplemented } from '../parameters.js';
import type { Moment } from '../pillars.js';
import { SOLAR_TERMS, type SolarTermId } from '../solar-terms.js';
import type { ChartOptions } from '../types.js';

export type Yuan = 'shang' | 'zhong' | 'xia';

export const YUAN_HANZI: Record<Yuan, string> = {
  shang: '上元',
  zhong: '中元',
  xia: '下元',
};

export const YUAN_PINYIN: Record<Yuan, string> = {
  shang: 'shàngyuán',
  zhong: 'zhōngyuán',
  xia: 'xiàyuán',
};

export interface Ju {
  /** `true` for 陽遁, the half of the year running from the winter solstice. */
  yang: boolean;
  /** 1 to 9. */
  number: number;
  /** The moment's third of its term or, under zhirun, of its block. */
  yuan: Yuan;
  /** Days elapsed since the term began. It fixes the yuan under 茅山. */
  daysIntoTerm: number;
  /**
   * The term whose ju was taken. Under chaibu, always the term in force;
   * under zhirun's 超神 it can be a term that has not yet begun.
   */
  term: { id: SolarTermId; hanzi: string; pinyin: string };
  /** True inside an intercalated block (閏), which repeats 芒種 or 大雪. */
  leap: boolean;
}

/**
 * The ju each term takes in each of its three yuan (陰陽二遁三元定局).
 *
 * The classical mnemonic in table form. Yang runs from the winter solstice to
 * Mangzhong, yin from the summer solstice to Daxue — the two halves of the
 * year, turning at the two solstices and not at the equinoxes.
 *
 * Read down a row and the three numbers step by six, modulo nine; the table
 * could be generated from its first column. It is written out because that is
 * how it is transmitted, and a table that matches the verse can be checked
 * against the verse.
 */
const JU_TABLE: Record<SolarTermId, { yang: boolean; ju: [number, number, number] }> = {
  dongzhi: { yang: true, ju: [1, 7, 4] },
  xiaohan: { yang: true, ju: [2, 8, 5] },
  dahan: { yang: true, ju: [3, 9, 6] },
  lichun: { yang: true, ju: [8, 5, 2] },
  yushui: { yang: true, ju: [9, 6, 3] },
  jingzhe: { yang: true, ju: [1, 7, 4] },
  chunfen: { yang: true, ju: [3, 9, 6] },
  qingming: { yang: true, ju: [4, 1, 7] },
  guyu: { yang: true, ju: [5, 2, 8] },
  lixia: { yang: true, ju: [4, 1, 7] },
  xiaoman: { yang: true, ju: [5, 2, 8] },
  mangzhong: { yang: true, ju: [6, 3, 9] },
  xiazhi: { yang: false, ju: [9, 3, 6] },
  xiaoshu: { yang: false, ju: [8, 2, 5] },
  dashu: { yang: false, ju: [7, 1, 4] },
  liqiu: { yang: false, ju: [2, 5, 8] },
  chushu: { yang: false, ju: [1, 4, 7] },
  bailu: { yang: false, ju: [9, 3, 6] },
  qiufen: { yang: false, ju: [7, 1, 4] },
  hanlu: { yang: false, ju: [6, 9, 3] },
  shuangjiang: { yang: false, ju: [5, 8, 2] },
  lidong: { yang: false, ju: [6, 9, 3] },
  xiaoxue: { yang: false, ju: [5, 8, 2] },
  daxue: { yang: false, ju: [4, 7, 1] },
};

const YUAN_ORDER: Yuan[] = ['shang', 'zhong', 'xia'];

/**
 * Three five-day stretches, each headed by a 甲 or 己 day.
 *
 * Fifteen divides sixty, so the cycle of the days carries the three yuan
 * round exactly four times and a day's place in it is a fact about the day
 * pillar alone.
 */
const FUTOU_CYCLE = 15;

/**
 * Determines the dun and the ju number.
 *
 * This is the most divisive step in the whole art, and the parameter that
 * governs it is `method`.
 *
 * All three read the ju off a table that is the same table. What they part
 * over is which term's row to read and which of its three cells.
 *
 * Under `chaibu` (拆補) the ju is read off the term in force and the yuan off
 * the **day**: the days run in five-day stretches headed by a 甲 or a 己 (the
 * 符頭), and where the day pillar stands in that fifteen-day cycle is the
 * yuan, whatever the term is doing. The name means "split and patch", and
 * both halves of it are consequences of that — the fifteen days of a term and
 * the sixty-day cycle of the days do not divide into one another, so a term
 * opens on a part-spent yuan (拆) and closes with days over to make it up
 * (補). **Read the yuan anywhere but off the 符頭 and there is nothing to
 * split and nothing to patch**, which is why 拆補 has no second reading here.
 *
 * Under `maoshan` (茅山) the 符頭 is not read at all. The cut is made from the
 * exact instant the term began: sixty 時辰 upper, sixty middle, and the rest
 * of the term lower. Its two edge cases both fall out of that sentence and
 * need no branch — a term running longer than 180 時辰 keeps its 下元 to the
 * end (劉文元's case 1, 唐頤's 取), and one running shorter has its 下元 cut
 * where the next term opens (case 2, 舍). Nothing is repeated and nothing is
 * skipped, which is the property the method was made for: 劉文元 gives the
 * motive, and it is order rather than truth — the 拆補 「使人感到很零亂，十分
 * 煩瑣」.
 *
 * Under `zhirun` (置閏) the drift is neither re-divided nor absorbed but
 * carried: the yuan follows the day's futou through the sexagenary cycle,
 * whole fifteen-day blocks serve one term each, and the accumulated drift is
 * paid off by a repeated 芒種 or 大雪 block. The bookkeeping lives in
 * `zhirun.ts`; the moment carries it, and this function only reads the table
 * with it. So it can disagree with the other two not only about the yuan of a
 * day but, around a term's edges, about which term's ju the day takes at all.
 *
 * **茅山 was this engine's default for a whole phase, under the name 拆補.**
 * It shipped as `yuan: 'term'`, declared a divergence inside 拆補; it is not
 * one, and the parameter is gone. Over a tropical year of 時辰 the old default
 * agrees with an outside 茅山 implementation 100 % of the time and with an
 * outside 拆補 47.66 %. → `docs/history/40-the-default-was-maoshan.md`
 */
export function determineJu(moment: Moment, options: ChartOptions): Ju {
  // Before any branch. Each is read below by asking whether the value is the
  // one this engine has a branch for, and a value it has never heard of would
  // otherwise take another branch rather than an error — which is how the
  // retired `yuan` came to answer an unrecognised reading with the term's,
  // silently. The method keeps its own error code, which `CHART_PARAMETERS`
  // records and this call honours.
  requireImplemented(CHART_PARAMETERS, options, 'method', 'leap');

  const daysIntoTerm = moment.julianDayUT - moment.solarTerm.julianDayUT;

  if (options.method === 'zhirun') {
    const assignment = moment.zhirun;
    const entry = JU_TABLE[assignment.term];
    const definition = SOLAR_TERMS.find((candidate) => candidate.id === assignment.term);
    return {
      yang: entry.yang,
      number: entry.ju[assignment.yuanIndex] as number,
      yuan: YUAN_ORDER[assignment.yuanIndex] as Yuan,
      daysIntoTerm,
      term: {
        id: assignment.term,
        hanzi: definition?.hanzi as string,
        pinyin: definition?.pinyin as string,
      },
      leap: assignment.leap,
    };
  }

  // Two methods left, and the term in force is the same under both: only
  // where the yuan is read from differs. 拆補 needs nothing but the day
  // pillar's place in the sexagenary cycle, which the moment already carries
  // — the same number `zhirun.ts` heads its blocks by, read the same way and
  // for the same reason, so the two cannot drift apart.
  //
  // 茅山 needs the term's instant and the moment's and nothing else: no day
  // pillar, no 符頭, no sexagenary cycle. Sixty 時辰 is five days exactly, so
  // the block index is the elapsed days over five, and the `min` is the whole
  // of both edge cases — it holds the 下元 open to the end of a long term, and
  // the reset of `daysIntoTerm` at the next term cuts a short one's.
  const index =
    options.method === 'maoshan'
      ? Math.min(2, Math.max(0, Math.floor(daysIntoTerm / 5)))
      : Math.floor((moment.pillars.day.index % FUTOU_CYCLE) / 5);
  const entry = JU_TABLE[moment.solarTerm.term.id];

  return {
    yang: entry.yang,
    number: entry.ju[index] as number,
    yuan: YUAN_ORDER[index] as Yuan,
    daysIntoTerm,
    term: {
      id: moment.solarTerm.term.id,
      hanzi: moment.solarTerm.term.hanzi,
      pinyin: moment.solarTerm.term.pinyin,
    },
    leap: false,
  };
}
