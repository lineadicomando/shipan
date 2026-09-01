/**
 * The options that make a chart reproducible.
 *
 * Different schools produce different charts from identical input. Every such
 * divergence is a parameter here, with a declared default, and it is present
 * from the first release even where only one value is implemented yet:
 * adding one later would break the API, the MCP tools, the CLI and every
 * shared URL at once.
 *
 * No function in the engine reads a global default. Options travel as
 * arguments and a chart carries them in its own output, so that a chart saved
 * today reproduces identically tomorrow.
 */
export interface ChartOptions {
  /**
   * How the ju number is established: 拆補, 置閏 or 茅山.
   *
   * The most divisive parameter of the whole engine. Two practitioners of
   * different schools, given the same instant, will lay out different plates
   * and neither is making a mistake.
   *
   * **It used to have a `yuan` beside it, and that parameter was the seam
   * between two of these three.** `yuan` offered `term` — cut the term into
   * three fives from the instant it began — as a divergence *inside* 拆補,
   * and it was the default. It is not inside 拆補: it is 茅山, which is what
   * 拆補 stops being the moment the 符頭 is not read. 劉文元 parts the two on
   * exactly that point (「其與拆補法不同的是……根本不去考慮日支的子午卯酉為
   * 上元」), 唐頤 says the method 「打破了根據日干支符頭確定三元的規律」, and
   * 神奇之門 defines 拆補 by both conditions at once — the three yuan inside
   * the term *and* the 甲己 cycle. A 拆補 with no 符頭 has nothing to split
   * and nothing to patch. So the seam is a method boundary, the two values
   * are two methods, and `yuan` is gone rather than kept as a second way of
   * saying `method`. → `docs/parameters.md`, `docs/history/40-the-default-was-maoshan.md`
   */
  method: 'chaibu' | 'zhirun' | 'maoshan';

  /**
   * How the heaven plate is derived: rotating (轉盤) or flying (飛盤).
   */
  plate: 'zhuan' | 'fei';

  /**
   * Whether to correct clock time to true solar time at the place.
   *
   * The correction has two parts: the longitude's offset from the meridian
   * that defines the zone, and the equation of time. Together they reach a
   * little over an hour, which is more than the width of an hour pillar.
   */
  trueSolarTime: boolean;

  /**
   * Where the year of the pillars begins: at Lichun (立春) or at the lunar
   * new year (正月初一).
   *
   * Lichun is the near-universal choice for the Four Pillars. The lunar new
   * year exists here because some almanac traditions count by it, and because
   * a chart cast between the two dates differs by a full year pillar.
   *
   * **It moves the month pillar with it, and that is not a second decision.**
   * The month branch is the solar term's in either case, but its *stem* comes
   * from the year stem by 五虎遁, so a year pillar that turned at a different
   * instant hands the mnemonic a different stem. Between the two dates
   * `chunjie` therefore reports a month pillar no lichun almanac prints —
   * 2024-02-06 is 癸卯年甲寅月 under it and 甲辰年丙寅月 under lichun.
   * Which of the two an almanac counting by the lunar new year would itself
   * print is a question no source consulted here answers, so the rule is
   * applied as stated rather than special-cased. See `docs/sources.md`.
   */
  yearBoundary: 'lichun' | 'chunjie';

  /**
   * Where the day pillar turns over.
   *
   * `zishi` turns it at 23:00, when the hour of the Rat opens; `midnight`
   * holds it to the civil date. They disagree only for births in that one
   * hour, and there they disagree about the day pillar — a quarter of the
   * chart, changing nothing else.
   *
   * The hour pillar is *not* in dispute: from 23:00 its stem is read from the
   * day the hour of the Rat opens, under either setting. That is what the
   * doctrine of the late hour of the Rat says, and it is why `midnight` is
   * not simply "everything stays put".
   */
  dayBoundary: 'zishi' | 'midnight';

  /**
   * Which family of Qi Men chart: hour, day, month or year.
   */
  system: 'shijia' | 'rijia' | 'yuejia' | 'nianjia';

  /**
   * Where the centre lodges (寄宮).
   *
   * The centre has no direction, no gate and no spirit, so whatever the ju
   * puts there has to be read somewhere else. `kun` sends it to the palace of
   * Kun always, which is the common choice and the one implemented; `dun`
   * sends it to Kun in a yang chart and to Gen in a yin one, which other
   * schools hold to.
   *
   * It is a parameter and not a constant for the reason every divergence here
   * is one: the palace the centre lodges in decides which palace the chief and
   * the chief gate are read from, so two schools cast measurably different
   * charts from it. It was a hardcoded 2 until the parameter existed, which
   * made this engine's school implicit — the one thing this project says it
   * will not do.
   */
  centreLodging: 'kun' | 'dun';

  /**
   * What decides the two names the fifth and sixth spirits wear.
   *
   * The ring is the same ring under every answer: eight seats, and the middle
   * pair differs in the **name** and in nothing else — same star, same gate,
   * same stem, same palace. What the schools part over is which fact selects
   * the name.
   *
   * `dun` is the 陰陽異名 convention this engine follows: 勾陳 and 朱雀
   * preside while the yang half of the year runs, 白虎 and 玄武 while the yin
   * half does. `fixed` is 《御定奇門寶鑑》's — the eight names stand in both
   * dun and only the order they are counted in reverses. `baihu` is the
   * seating 《奇門遁甲全局》 holds, 白虎 at the fifth seat and 勾陳 at the
   * sixth.
   *
   * **A fourth answer exists and is deliberately not a value here.**
   * 《奇門遁甲金鏡寶鑑》 keys the choice to what is being divined —
   * 「如占病、占賊，則勾、雀二神可換虎、武用」 — which is a licence granted to
   * the reader at the moment of reading and not a rule that lays a different
   * board. `docs/refusals.md` § "The middle pair named by the matter" argues
   * it: a chart is a function of its instant, the question enters at the 用神,
   * and a parameter here would be that first interpretive act computed.
   */
  spirits: 'dun' | 'fixed' | 'baihu';

  /**
   * Where the repeated block goes under 置閏.
   *
   * `solstice` is 《奇門遁甲統宗》's placement, which this engine computes: the
   * block repeated to pay off the drift is 芒種 or 大雪. `runyue` is
   * 《奇門遁甲金鏡寶鑑》's, which repeats instead whichever term the year's
   * leap month falls under and rejects the solstice placement as a
   * convenience — 「於理法都不是」.
   *
   * A divergence genuinely **inside** 置閏, and declared as one rather than as
   * a fourth `method`: what parts these two is not how the ju is established
   * but where one method puts its own repetition — both read the yuan from the
   * 符頭 and both carry the drift, which is what makes them one method. That
   * test is worth stating because `yuan` failed it and was a `method`
   * boundary written as a divergence for a whole phase.
   */
  leap: 'solstice' | 'runyue';

  /**
   * What the five seasonal states are read from.
   *
   * `season` is the ordinary 五行 statement and what this engine computes:
   * what the season generates is 相, what generates it 休, what controls it
   * 囚, what it controls 死. `star` is 《奇門遁甲金鏡寶鑑》卷之四's, which reads
   * the same four from the star instead and tabulates all nine that way —
   * swapping 相 with 休 and 囚 with 死, and leaving only 旺 in common.
   *
   * It is reported for every star and every gate on every board, so the two
   * readings part on nearly every cell of the answer.
   */
  strengths: 'season' | 'star';

  /**
   * Where earth's season begins.
   *
   * `quarters` gives the four months that close the seasons — 辰, 未, 戌, 丑 —
   * to earth entire, which is what `seasonElement` computes. `eighteen` gives
   * earth only the last eighteen days of each and leaves the first two-thirds
   * to the season that is ending.
   *
   * It feeds the states above, so it decides 旺相休囚死 for every star and
   * every gate on the board, and the two answers part for two-thirds of each
   * of those four months.
   */
  earth: 'quarters' | 'eighteen';

  /**
   * Whether the lodged stem and star travel with their host.
   *
   * Where the 符頭 stands in the centre, `stay` leaves the centre's stem and
   * star where they are and `travel` carries them to the hour's palace with
   * the host — which is the same board seen from outside as «天禽 merged with
   * 天芮 and the centre starless». The outer eight agree either way.
   *
   * Both sides are in print. 《奇門遁甲金鏡寶鑑》 tabulates all eighteen 局
   * with the centre travelling; 《御定奇門寶鑑》 lodges the centre's decade out
   * — 「甲辰在中宮，寄於坤二」. This engine computes the second and declares
   * the first.
   */
  centreTravel: 'stay' | 'travel';

  /**
   * Which register of 神煞 the almanac's page carries (曆注).
   *
   * `xieji` is the only value implemented: what 《協紀辨方書》 ratifies, cut to
   * what bears on the quality of a day and the bearing of a direction. There
   * are hundreds of 神煞 and they diverge by lineage far more than the schools
   * of dunjia do, so a second register must be able to arrive without breaking
   * a shared link — which is why this exists before there is anything to
   * choose.
   *
   * **It is the one option the page reads, and the exception proves the rule
   * it lives by.** `dayBoundary` and `trueSolarTime` say how an *instant* is
   * read and never reach the almanac, because a page belongs to a date and the
   * same date is the same page for everybody. This says which *book* was
   * copied out, which is a fact about the page itself — the parallel of
   * `method` in dunjia, not of `dayBoundary`.
   */
  shensha: 'xieji';
}

/**
 * What the engine assumes when a surface says nothing.
 *
 * Read this only where a surface builds its own defaults. Passing it into the
 * engine is the caller's job, never the engine's. Frozen, because a surface
 * that could write to it would change what "default" means for every caller
 * after it: spread it and set the copy.
 */
export const DEFAULT_OPTIONS: ChartOptions = Object.freeze({
  method: 'chaibu',
  plate: 'zhuan',
  trueSolarTime: true,
  yearBoundary: 'lichun',
  dayBoundary: 'zishi',
  system: 'shijia',
  centreLodging: 'kun',
  spirits: 'dun',
  leap: 'solstice',
  strengths: 'season',
  earth: 'quarters',
  centreTravel: 'stay',
  shensha: 'xieji',
});

/** Where on Earth the chart is cast. */
export interface Place {
  /** Decimal degrees, positive north. */
  latitude: number;
  /** Decimal degrees, positive east. */
  longitude: number;
  /** IANA identifier, e.g. `Asia/Shanghai`. */
  timezone: string;
}

/** The five phases. Toneless pinyin, as everywhere the domain is Chinese. */
export type Element = 'mu' | 'huo' | 'tu' | 'jin' | 'shui';

export const ELEMENT_HANZI: Record<Element, string> = {
  mu: '木',
  huo: '火',
  tu: '土',
  jin: '金',
  shui: '水',
};
