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

import type { MessageKey } from '@shipan/i18n';

/** The layers that stand under or beside every board, whose names are bare. */
const LAYERS = ['pillars', 'almanac'];

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
  /**
   * What the control is called, and what each value it offers is called.
   *
   * **Written out rather than built from the row**, which is the one thing
   * here that costs a line per school. A component composing
   * `` `form.${board}.${id}` `` would hide the whole `form.` family from
   * `catalog-keys.test.ts`, which finds a templated key live by the literal
   * prefix in front of the interpolation — the trap `notes.ts` names in as
   * many words. So the keys stand where they can be read, and a value with no
   * gloss does not compile.
   *
   * `says` carries the implemented values only: what a form offers is a
   * choice, and an option that can only come back a 501 is not one.
   */
  readonly label?: MessageKey;
  readonly says?: Readonly<Record<string, MessageKey>>;
  /**
   * A line under the control, per value, saying what standing there does.
   *
   * Keyed by value because that is how the engine declares it: 符頭 has a
   * consequence worth stating where the term has none, and the two methods
   * point at one caution between them.
   */
  readonly notes?: Readonly<Record<string, MessageKey>>;
  /**
   * A divergence *inside* another one, shown only where that one stands on a
   * value — the engine's `inside`, and doctrine rather than layout: the yuan
   * divides 拆補, so under 置閏 the third of the term is the 符頭's because
   * that is what the method is, and a control that changed nothing would read
   * as a choice where none is left.
   */
  readonly inside?: { readonly id: string; readonly value: string };
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
    id: 'method',
    board: 'qimen',
    values: ['chaibu', 'zhirun', 'maoshan'],
    implemented: ['chaibu', 'zhirun'],
    fallback: 'chaibu',
    label: 'form.qimen.method',
    says: { chaibu: 'form.qimen.method.chaibu', zhirun: 'form.qimen.method.zhirun' },
    notes: { chaibu: 'cli.note.method', zhirun: 'cli.note.method' },
  },
  {
    id: 'yuan',
    board: 'qimen',
    values: ['term', 'futou'],
    implemented: ['term', 'futou'],
    fallback: 'term',
    label: 'form.qimen.yuan',
    says: { term: 'form.qimen.yuan.term', futou: 'form.qimen.yuan.futou' },
    notes: { futou: 'cli.note.yuanFutou' },
    inside: { id: 'method', value: 'chaibu' },
  },
  {
    id: 'plate',
    board: 'qimen',
    values: ['zhuan', 'fei'],
    implemented: ['zhuan'],
    fallback: 'zhuan',
  },
  {
    id: 'centreLodging',
    board: 'qimen',
    values: ['kun', 'dun'],
    implemented: ['kun'],
    fallback: 'kun',
  },
  {
    id: 'system',
    board: 'qimen',
    values: ['shijia', 'rijia', 'yuejia', 'nianjia'],
    implemented: ['shijia'],
    fallback: 'shijia',
  },
  {
    id: 'spirits',
    board: 'qimen',
    values: ['dun', 'fixed', 'baihu'],
    implemented: ['dun'],
    fallback: 'dun',
  },
  {
    id: 'leap',
    board: 'qimen',
    values: ['solstice', 'runyue'],
    implemented: ['solstice'],
    fallback: 'solstice',
    inside: { id: 'method', value: 'zhirun' },
  },
  {
    id: 'strengths',
    board: 'qimen',
    values: ['season', 'star'],
    implemented: ['season'],
    fallback: 'season',
  },
  {
    id: 'earth',
    board: 'qimen',
    values: ['quarters', 'eighteen'],
    implemented: ['quarters'],
    fallback: 'quarters',
  },
  {
    id: 'centreTravel',
    board: 'qimen',
    values: ['stay', 'travel'],
    implemented: ['stay'],
    fallback: 'stay',
  },
  {
    id: 'yearBoundary',
    board: 'pillars',
    values: ['lichun', 'chunjie'],
    implemented: ['lichun', 'chunjie'],
    fallback: 'lichun',
    label: 'form.pillars.yearBoundary',
    says: {
      lichun: 'form.pillars.yearBoundary.lichun',
      chunjie: 'form.pillars.yearBoundary.chunjie',
    },
  },
  {
    id: 'dayBoundary',
    board: 'pillars',
    values: ['zishi', 'midnight'],
    implemented: ['zishi', 'midnight'],
    fallback: 'zishi',
    label: 'form.pillars.dayBoundary',
    says: {
      zishi: 'form.pillars.dayBoundary.zishi',
      midnight: 'form.pillars.dayBoundary.midnight',
    },
  },
  {
    id: 'shensha',
    board: 'almanac',
    values: ['xieji'],
    implemented: ['xieji'],
    fallback: 'xieji',
  },
  {
    id: 'yuejiang',
    board: 'liuren',
    values: ['zhongqi', 'jieqi', 'true'],
    implemented: ['zhongqi'],
    fallback: 'zhongqi',
  },
  {
    id: 'guiren',
    board: 'liuren',
    values: ['chou', 'wei'],
    implemented: ['chou', 'wei'],
    fallback: 'chou',
    label: 'form.liuren.guiren',
    says: { chou: 'form.liuren.guiren.chou', wei: 'form.liuren.guiren.wei' },
    notes: { chou: 'form.liuren.guiren.note', wei: 'form.liuren.guiren.note' },
  },
  {
    id: 'zhouye',
    board: 'liuren',
    values: ['branch', 'solar'],
    implemented: ['branch'],
    fallback: 'branch',
  },
  {
    id: 'xiudu',
    board: 'qizheng',
    values: ['juxing', 'shixian', 'shoushi'],
    implemented: ['juxing'],
    fallback: 'juxing',
  },
  {
    id: 'ziqi',
    board: 'qizheng',
    values: ['off', 'yinianyisu'],
    implemented: ['off'],
    fallback: 'off',
  },
  {
    id: 'luohou',
    board: 'qizheng',
    values: ['descending', 'ascending'],
    implemented: ['descending', 'ascending'],
    fallback: 'descending',
    label: 'form.qizheng.luohou',
    says: {
      descending: 'form.qizheng.luohou.descending',
      ascending: 'form.qizheng.luohou.ascending',
    },
    notes: {
      descending: 'form.qizheng.luohou.note',
      ascending: 'form.qizheng.luohou.note',
    },
  },
  {
    id: 'minggong',
    board: 'qizheng',
    values: ['yuejiang', 'ascendant'],
    implemented: ['yuejiang'],
    fallback: 'yuejiang',
  },
  {
    id: 'gong',
    board: 'qizheng',
    values: ['zhongqi', 'ci'],
    implemented: ['zhongqi'],
    fallback: 'zhongqi',
  },
  {
    id: 'epoch',
    board: 'taiyi',
    values: ['jinjing'],
    implemented: ['jinjing'],
    fallback: 'jinjing',
  },
  {
    id: 'ji',
    board: 'taiyi',
    values: ['nianji', 'yueji', 'riji', 'shiji'],
    implemented: ['nianji'],
    fallback: 'nianji',
  },
  {
    id: 'yearBoundary',
    board: 'taiyi',
    values: ['lichun', 'dongzhi', 'chunjie'],
    implemented: ['lichun'],
    fallback: 'lichun',
  },
  {
    id: 'leapMonth',
    board: 'ziwei',
    values: ['following', 'current', 'split'],
    implemented: ['following'],
    fallback: 'following',
  },
  {
    id: 'sihua',
    board: 'ziwei',
    values: ['quanshu', 'zuofu'],
    implemented: ['quanshu', 'zuofu'],
    fallback: 'quanshu',
    label: 'form.ziwei.sihua',
    says: {
      quanshu: 'form.ziwei.sihua.quanshu',
      zuofu: 'form.ziwei.sihua.zuofu',
    },
    notes: { zuofu: 'form.ziwei.sihua.note' },
  },
  {
    id: 'huoling',
    board: 'ziwei',
    values: ['fixed', 'hour'],
    implemented: ['fixed'],
    fallback: 'fixed',
  },
  {
    id: 'daxian',
    board: 'ziwei',
    values: ['adjacent', 'ming'],
    implemented: ['adjacent'],
    fallback: 'adjacent',
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
    id: 'yearBoundary',
    board: 'ziwei',
    values: ['lichun', 'chunjie'],
    implemented: ['lichun', 'chunjie'],
    fallback: 'chunjie',
    label: 'form.ziwei.yearBoundary',
    says: {
      lichun: 'form.ziwei.yearBoundary.lichun',
      chunjie: 'form.ziwei.yearBoundary.chunjie',
    },
    notes: {
      lichun: 'form.ziwei.yearBoundary.note',
      chunjie: 'form.ziwei.yearBoundary.note',
    },
  },
  {
    id: 'luckGranularity',
    board: 'bazi',
    values: ['shichen', 'minute'],
    implemented: ['shichen', 'minute'],
    fallback: 'shichen',
    label: 'form.bazi.luckGranularity',
    says: {
      shichen: 'form.bazi.luckGranularity.shichen',
      minute: 'form.bazi.luckGranularity.minute',
    },
    notes: { minute: 'form.bazi.luckGranularity.note' },
  },
  {
    id: 'count',
    board: 'nianming',
    values: ['sui', 'turns'],
    implemented: ['sui', 'turns'],
    fallback: 'sui',
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
  const dot = name.indexOf('.');
  return dot < 0 || name.slice(0, dot) === section;
}

/**
 * The divergences a section offers, and the reason a form has no markup of its
 * own for any of them.
 *
 * Two conditions. It has to be **the reader's board's, or a layer's** — the
 * pillars stand under every board and their two are asked wherever an instant
 * is; a board's own belong to its section and to the consultation while that
 * instrument is chosen. And it has to have **more than one implemented value**,
 * because everything else is a divergence the engine declares and refuses, and
 * a control offering one option is a control that decides nothing.
 *
 * `docs/parameters.md` § "A declared default is not a hidden school" is what
 * this list is for: an axis with a real choice on it is one the reader has to
 * be able to see and to move.
 */
export function offered(board?: string): readonly Divergence[] {
  return DIVERGENCES.filter(
    (row) =>
      row.implemented.length > 1 && (LAYERS.includes(row.board) || row.board === board),
  );
}

/** What a reader has chosen, keyed by the name each one travels under. */
export type Chosen = Readonly<Record<string, string>>;

/**
 * The divergences an address states, with the engine's own answer for the rest.
 *
 * **Carried verbatim**, misspellings included: the server refuses a value it
 * does not know, where a silent fallback would cast a chaibu chart under
 * whatever name the address had misspelt.
 */
export function readChosen(params: URLSearchParams, board?: string): Chosen {
  const chosen: Record<string, string> = {};
  for (const row of offered(board)) {
    chosen[wire(row)] = params.get(wire(row)) ?? row.fallback;
  }
  return chosen;
}

/**
 * The chosen values as address fields, defaults left out.
 *
 * The rule every other field here keeps: what the engine would have done
 * anyway is not written into an address, so the plainest question keeps the
 * plainest address. What the reader is told is a separate question and a
 * separate surface — a board says which school laid it whether or not the
 * address had to say so.
 */
export function chosenFields(chosen: Chosen): Record<string, string | undefined> {
  const fields: Record<string, string | undefined> = {};
  for (const row of DIVERGENCES) {
    const value = chosen[wire(row)];
    if (value && value !== row.fallback) fields[wire(row)] = value;
  }
  return fields;
}

/** Whether a divergence is shown at all, given what else is set. */
export function shown(row: Divergence, chosen: Chosen): boolean {
  if (!row.inside) return true;
  return chosen[named(row.board, row.inside.id)] === row.inside.value;
}

/**
 * What a set of chosen values carries into another section.
 *
 * The same rule `carriedSearch` applies to an address, applied to the record
 * before there is an address: the layers' divergences cross — both sections
 * reckon the same day from the same boundary — and a board's own stay behind,
 * since a link that took `qimen.method` to the pillars would put a setting in
 * an address that never reads it.
 */
export function carried(chosen: Chosen, board?: string): Chosen {
  const kept: Record<string, string> = {};
  for (const [name, value] of Object.entries(chosen)) {
    if (belongsTo(name, board ?? '')) kept[name] = value;
  }
  return kept;
}

/**
 * The divergences a laid board stands on, for the page that shows it.
 *
 * The engine's `divergencesInForce` said in the browser, and it is here for
 * the reason the rows are: the client imports only types from `core`, so a
 * value it needs it redeclares, and `test/parameters.test.ts` holds the two
 * together over every board and every value.
 *
 * **Two bags and never one.** A board carries its own options and stands on
 * the pillars', and 紫微斗數 has a `yearBoundary` of its own — merged, the
 * board's would answer for the layer's, which is the collision the names on
 * the wire exist to part.
 *
 * **No layers at all is a board that stands on no instant**, which is 太乙 and
 * nothing else here: its subject is a year, no hour is read into pillars for
 * it, and a block telling its reader where the day begins would be answering
 * about a calendar this board never opened.
 */
export function inForce(
  board: string,
  options: object,
  layers?: object,
): readonly { row: Divergence; value: string }[] {
  // Two casts, here, for the reason the engine's has one: an options type is
  // keyed to its own board so that a declaration cannot drift, and reading it
  // back by the parameter's name is the one place that precision cannot be
  // carried through.
  const own = options as Record<string, unknown>;
  const under = layers as Record<string, unknown> | undefined;

  const standing: { row: Divergence; value: string }[] = [];
  for (const row of DIVERGENCES) {
    if (row.label === undefined) continue;
    if (row.board !== board && !LAYERS.includes(row.board)) continue;
    if (LAYERS.includes(row.board) && under === undefined) continue;
    if (row.implemented.length < 2) continue;
    const bag = row.board === 'pillars' ? (under ?? {}) : own;
    if (row.inside && bag[row.inside.id] !== row.inside.value) continue;

    const from = LAYERS.includes(row.board) ? (under ?? {}) : own;
    const value = String(from[row.id] ?? row.fallback);
    if (row.says?.[value]) standing.push({ row, value });
  }
  return standing;
}
