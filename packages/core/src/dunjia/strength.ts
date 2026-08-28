import type { Branch } from '../ganzhi.js';
import { CONTROLS, GENERATES } from '../bazi/relations.js';
import type { Element } from '../types.js';

export type StrengthId = 'wang' | 'xiang' | 'xiu' | 'qiu' | 'si';

export interface Strength {
  id: StrengthId;
  hanzi: string;
  /** The state said aloud, e.g. `wàng`. */
  pinyin: string;
}

// 相 is xiàng in this list — the supported state, not the xiāng of "each
// other". The identifier drops the tone and cannot say which; this can.
const STRENGTH: Record<StrengthId, { hanzi: string; pinyin: string }> = {
  wang: { hanzi: '旺', pinyin: 'wàng' },
  xiang: { hanzi: '相', pinyin: 'xiàng' },
  xiu: { hanzi: '休', pinyin: 'xiū' },
  qiu: { hanzi: '囚', pinyin: 'qiú' },
  si: { hanzi: '死', pinyin: 'sǐ' },
};

/**
 * The element a season belongs to, from the branch of the month.
 *
 * The four seasons take the four cardinal phases, and the four months that
 * close them — the branches of the tombs — are given to earth.
 *
 * **Other schools give earth only the last eighteen days of each season, and
 * that is a divergence between practitioners, so it owes a parameter it does
 * not have.** It moves the boundary and not the idea, but the boundary is what
 * this function returns: `strengthOf` reads it, so the choice decides
 * 旺相休囚死 for every star and every gate on the board, and the two readings
 * part for the first two-thirds of each of 辰, 未, 戌 and 丑. A caller cannot
 * see which one drew the chart. `ROADMAP.md` § 1 carries the debt.
 */
export function seasonElement(monthBranch: Branch): Element {
  switch (monthBranch.index) {
    case 2:
    case 3:
      return 'mu';
    case 5:
    case 6:
      return 'huo';
    case 8:
    case 9:
      return 'jin';
    case 11:
    case 0:
      return 'shui';
    default:
      // 辰, 未, 戌, 丑 — the four that close a season.
      return 'tu';
  }
}

/**
 * How an element stands to the season (旺相休囚死).
 *
 * The classical five-phase reckoning, and the whole of it: what rules the
 * season prospers, what the season generates is supported, what generates the
 * season rests, what controls the season is imprisoned, and what the season
 * controls dies.
 *
 * Some Qi Men schools assign the nine stars a different set of states from
 * the one their element would take. This engine reports the five-phase
 * reckoning, which is stateable in a sentence and checkable against it.
 *
 * **And which way the sentence points is itself contested.** The relations
 * here are read *from the season*, which is the ordinary five-phase statement.
 * 《奇門遁甲金鏡寶鑑》卷之四 reads them from the **star** — 「旺于同類月，相于
 * 我生月，休于生我月，囚于官鬼月，死于妻財月」 — and tabulates all nine stars
 * that way, which transposes 相 with 休 and 囚 with 死 and agrees only on 旺.
 * One text against the ordinary reading is not a reason to move, and its own
 * table confirms its rule rather than the rule's truth; `docs/sources.md` has
 * the argument and `ROADMAP.md` § 1 carries it as a divergence nothing exposes.
 * The same passage reads the states off the day and the hour as well as the
 * month — 「日時皆同」 — where `dunjia` passes the month branch alone.
 */
export function strengthOf(element: Element, season: Element): Strength {
  const id = idOf(element, season);
  return { id, ...STRENGTH[id] };
}

function idOf(element: Element, season: Element): StrengthId {
  if (element === season) return 'wang';
  if (element === GENERATES[season]) return 'xiang';
  if (GENERATES[element] === season) return 'xiu';
  if (CONTROLS[element] === season) return 'qiu';
  return 'si';
}
