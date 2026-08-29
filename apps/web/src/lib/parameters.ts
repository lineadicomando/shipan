/**
 * The school divergences as an address writes them, redeclared for the client.
 *
 * The engine declares them once, in `packages/core/src/parameters.ts`, and
 * that declaration is a **value**: importing it here would drag the
 * ephemerides and a native module into the browser bundle to name the choices
 * in a `select`. So they are written out again, exactly as `vocabulary.ts`
 * writes out the gates and `@shipan/plate` writes out the shape of a chart,
 * and `test/parameters.test.ts` asserts that this and the engine's still
 * agree — values, defaults, and which of them are computed.
 *
 * What this adds, and the engine has no use for, is **the name each one
 * travels under**. A parameter is a field in a type, where its name is unique
 * because the type is one board's; in a query string it is one name among
 * everybody's, and `yearBoundary` is declared three times — by the pillars, by
 * 太乙 and by 紫微斗數 — with three sets of values and two different defaults.
 * See `docs/parameters.md` § "A board's parameters travel under the board's
 * name".
 */

/** The layers that stand under or beside every board, whose names are bare. */
const LAYERS = ["pillars", "almanac"];

export interface Divergence {
  /** The field, as the input type and the engine's declaration name it. */
  readonly id: string;
  /** `ParameterBoard`: a board, or a layer under or beside all of them. */
  readonly board: string;
  /** Every declared value, in the engine's order. */
  readonly values: readonly string[];
  /** Those the engine computes. The rest are refused by name. */
  readonly implemented: readonly string[];
  /** What the engine assumes when nobody says. */
  readonly fallback: string;
}

/**
 * Every divergence that travels as a named value.
 *
 * `trueSolarTime` is the one that does not and is absent: it is a boolean, it
 * is a checkbox rather than a list, and it is written `trueSolarTime=false`
 * when it is written at all. The test knows it is the exception.
 */
export const DIVERGENCES: readonly Divergence[] = [
  {
    id: "method",
    board: "qimen",
    values: ["chaibu", "zhirun", "maoshan"],
    implemented: ["chaibu", "zhirun"],
    fallback: "chaibu",
  },
  {
    id: "yuan",
    board: "qimen",
    values: ["term", "futou"],
    implemented: ["term", "futou"],
    fallback: "term",
  },
  {
    id: "plate",
    board: "qimen",
    values: ["zhuan", "fei"],
    implemented: ["zhuan"],
    fallback: "zhuan",
  },
  {
    id: "centreLodging",
    board: "qimen",
    values: ["kun", "dun"],
    implemented: ["kun"],
    fallback: "kun",
  },
  {
    id: "system",
    board: "qimen",
    values: ["shijia", "rijia", "yuejia", "nianjia"],
    implemented: ["shijia"],
    fallback: "shijia",
  },
  {
    id: "yearBoundary",
    board: "pillars",
    values: ["lichun", "chunjie"],
    implemented: ["lichun", "chunjie"],
    fallback: "lichun",
  },
  {
    id: "dayBoundary",
    board: "pillars",
    values: ["zishi", "midnight"],
    implemented: ["zishi", "midnight"],
    fallback: "zishi",
  },
  {
    id: "shensha",
    board: "almanac",
    values: ["xieji"],
    implemented: ["xieji"],
    fallback: "xieji",
  },
  {
    id: "yuejiang",
    board: "liuren",
    values: ["zhongqi", "jieqi", "true"],
    implemented: ["zhongqi"],
    fallback: "zhongqi",
  },
  {
    id: "guiren",
    board: "liuren",
    values: ["chou", "wei"],
    implemented: ["chou", "wei"],
    fallback: "chou",
  },
  {
    id: "zhouye",
    board: "liuren",
    values: ["branch", "solar"],
    implemented: ["branch"],
    fallback: "branch",
  },
  {
    id: "xiudu",
    board: "qizheng",
    values: ["juxing", "shixian", "shoushi"],
    implemented: ["juxing"],
    fallback: "juxing",
  },
  {
    id: "ziqi",
    board: "qizheng",
    values: ["off", "yinianyisu"],
    implemented: ["off"],
    fallback: "off",
  },
  {
    id: "luohou",
    board: "qizheng",
    values: ["descending", "ascending"],
    implemented: ["descending", "ascending"],
    fallback: "descending",
  },
  {
    id: "minggong",
    board: "qizheng",
    values: ["yuejiang", "ascendant"],
    implemented: ["yuejiang"],
    fallback: "yuejiang",
  },
  {
    id: "gong",
    board: "qizheng",
    values: ["zhongqi", "ci"],
    implemented: ["zhongqi"],
    fallback: "zhongqi",
  },
  {
    id: "epoch",
    board: "taiyi",
    values: ["jinjing"],
    implemented: ["jinjing"],
    fallback: "jinjing",
  },
  {
    id: "ji",
    board: "taiyi",
    values: ["nianji", "yueji", "riji", "shiji"],
    implemented: ["nianji"],
    fallback: "nianji",
  },
  {
    id: "yearBoundary",
    board: "taiyi",
    values: ["lichun", "dongzhi", "chunjie"],
    implemented: ["lichun"],
    fallback: "lichun",
  },
  {
    id: "leapMonth",
    board: "ziwei",
    values: ["following", "current", "split"],
    implemented: ["following"],
    fallback: "following",
  },
  {
    id: "sihua",
    board: "ziwei",
    values: ["quanshu"],
    implemented: ["quanshu"],
    fallback: "quanshu",
  },
  {
    id: "huoling",
    board: "ziwei",
    values: ["fixed", "hour"],
    implemented: ["fixed"],
    fallback: "fixed",
  },
  {
    id: "daxian",
    board: "ziwei",
    values: ["adjacent", "ming"],
    implemented: ["adjacent"],
    fallback: "adjacent",
  },
  /**
   * The second `yearBoundary`, and the reason this file has a naming rule.
   *
   * 紫微斗數 counts its month and its day on the lunar calendar, so the year
   * that opened at 正月初一 is the reckoning coherent with the rest of it,
   * where the pillars are cut at 立春 because that is what an almanac printing
   * four pillars does. Two questions, two answers, two defaults — and one
   * word. Written bare in an address, `ziwei.yearBoundary=lichun` and the
   * pillars' would be the same parameter.
   */
  {
    id: "yearBoundary",
    board: "ziwei",
    values: ["lichun", "chunjie"],
    implemented: ["lichun", "chunjie"],
    fallback: "chunjie",
  },
  {
    id: "count",
    board: "nianming",
    values: ["sui", "turns"],
    implemented: ["sui", "turns"],
    fallback: "sui",
  },
];

/**
 * The name a divergence travels under, in a query string and in every address
 * built from one.
 *
 * Bare for the layers, because they stand under or beside every board and
 * their names collide with nothing: the pillars say how an instant is read
 * into the four, and the almanac is a page a chart is read against. Prefixed
 * for everything else, because a board's name is what parts two parameters
 * spelt the same.
 */
export function wire(divergence: Divergence): string {
  return LAYERS.includes(divergence.board)
    ? divergence.id
    : `${divergence.board}.${divergence.id}`;
}

/** The wire name of one board's parameter, without looking the row up. */
export function named(board: string, id: string): string {
  return LAYERS.includes(board) ? id : `${board}.${id}`;
}

/**
 * Whether a parameter written in an address is one the section reading it
 * answers to.
 *
 * The rule the prefix buys, and the reason `carriedSearch` and `pageAddress`
 * no longer keep a list: a bare name belongs to every board, a prefixed one to
 * exactly the board it names. `nianming.count` therefore belongs to no section
 * at all, which is right — it is half of a birth put inside somebody else's
 * board, and it leaves a shareable address with the rest of that birth.
 */
export function belongsTo(name: string, section: string): boolean {
  const dot = name.indexOf(".");
  return dot < 0 || name.slice(0, dot) === section;
}
