import type { MessageKey } from '@shipan/i18n';
import { ChartError } from './errors.js';
import type { LiurenOptions } from './liuren.js';
import type { NianmingOptions } from './nianming.js';
import type { QizhengOptions } from './qizheng.js';
import type { TaiyiOptions } from './taiyi.js';
import type { ChartOptions } from './types.js';
import type { ZiweiOptions } from './ziwei/index.js';

/**
 * Every school divergence, declared once: its values, which of them this
 * engine computes, and what it assumes when a caller says nothing.
 *
 * `docs/parameters.md` states the rule this file serves — no school is
 * implicit, so every divergence is a parameter with a declared default,
 * present in the input type from the start, and a value the engine has not
 * implemented is **refused rather than substituted**. What the rule did not
 * say is where the answer to «which values are implemented» is kept, and the
 * answer was: in five places at once. Each board spelled it out at its own
 * `throw` — `implemented: 'zhongqi'` — the table in `docs/parameters.md` said
 * it again in prose, `apps/web/src/lib/vocabulary.ts` said it a third time as
 * the list a form may offer, the CLI's help a fourth as the words after a
 * flag, and the MCP tool schema a fifth as an enum an agent is handed. The
 * only one of the five the compiler could see was the literal inside the
 * throw, which is the copy nobody reads. `docs/parameters.md` had already
 * drifted by a whole board.
 *
 * **A value moving from refused to implemented is one fact and is now one
 * edit here.** The refusals read this table, so a `false` turned `true`
 * without the code behind it fails the board's own tests rather than
 * answering with the wrong chart. The four surfaces above keep lists of their
 * own, because what each *offers* is a choice — a form and a tool schema name
 * only what can be computed, since an option that can only come back as an
 * error is not a choice, while the page names every declared value because a
 * reader weighing a school needs to know the others exist. What they no
 * longer keep is the fact: each is asserted against this table by a test, so
 * a list that falls behind fails rather than misinforms.
 *
 * **It is a description and not a validator.** Nothing here checks that a
 * caller's string is one of the declared values: TypeScript does that for a
 * caller in this repository, and a surface taking a value off a URL refuses
 * an unknown one with `UNKNOWN_IDENTIFIER` before the engine is reached —
 * which is a different error, meaning «no school is called that» rather than
 * «that school is not computed here». Both survive: an undeclared value
 * reaches `requireImplemented` as a value no entry matches, and is refused as
 * unimplemented, which is the true statement about it.
 */

/** Which layer of the engine a divergence belongs to. */
export type ParameterBoard =
  | 'qimen'
  | 'liuren'
  | 'qizheng'
  | 'taiyi'
  | 'ziwei'
  | 'almanac'
  | 'nianming'
  /**
   * The calendrical layer under every board, which is why it is a board here
   * and is not one anywhere else.
   *
   * `trueSolarTime`, `yearBoundary` and `dayBoundary` are declared in
   * `ChartOptions` beside dunjia's own, because that is the type a chart
   * carries, and they are not dunjia's: they say how an *instant* is read
   * into pillars, and 八字, 六壬 and every board built on those pillars
   * inherits the answer. Filed under `qimen` they would make 八字 a board
   * with no divergences at all, which is false — it has three and shares
   * every one of them.
   */
  | 'pillars';

/**
 * One value a parameter can take.
 *
 * `name` is present where the value **names** something — a method, a
 * register, a book, a boundary — and absent where the identifier is already
 * an English word for a rule (`midnight`, `ascendant`, `off`).
 *
 * **It is a pair and never a glyph alone.** The identifier is not the
 * reading, however often it looks like one: `xieji` is 協紀辨方書 and says
 * two of its five syllables, `quanshu` is 紫微斗數全書 and says two of six,
 * `zhuan` is 轉盤 and says one of two. A reader who does not read Chinese
 * meets a shape they cannot pronounce, look up, or ask anybody about —
 * which is precisely the reader every surface here is built for. So the
 * reading travels with the glyph as it does for every other named thing in
 * this engine, and `pinyin.test.ts` holds these to the same structural check
 * as the gates and the stars: one toned syllable per character, one word,
 * lower case.
 */
export interface ParameterValue<V> {
  readonly id: V;
  /**
   * What this value is called, where the parameter carries a `label`.
   *
   * One per implemented value: what a surface offers is a choice, and a value
   * that can only come back a 501 is not one.
   */
  readonly says?: MessageKey;
  /**
   * A line printed under the block when this value is the one in force.
   *
   * 符頭 has one — it is a divergence inside 拆補 and it moves the ju on most
   * days — and the two methods carry the general caution between them. Most
   * values need none: the words above say what was followed, and what a school
   * *means* is doctrine this engine does not hold.
   */
  readonly note?: MessageKey;
  readonly name?: { readonly hanzi: string; readonly pinyin: string };
  /**
   * Whether the engine computes it.
   *
   * `false` is not a promise that it one day will. `maoshan` is declared and
   * expected never to be implemented — there is no reference against which a
   * 茅山 chart could be falsified — and it is here for the reason every other
   * refused value is: the parameter has to exist before there is a second
   * value, or adding it breaks the API, the MCP tools, the CLI and every
   * shared URL at once.
   */
  readonly implemented: boolean;
}

export interface Parameter<V> {
  readonly board: ParameterBoard;
  /**
   * What the divergence is called, where a reader can be offered a choice.
   *
   * Present on the parameters the engine computes **more than one** value of,
   * and absent on the rest: a divergence declared and refused is not a choice,
   * and a word for it would be a word nobody is shown. `docs/parameters.md`
   * § "A declared default is not a hidden school" is why it is here at all —
   * the value in force travels on every surface, so the words for it belong to
   * the declaration and not to one of them.
   *
   * A key and not a string, because the engine does not localise: the catalogs
   * hold the wording and this holds which wording. `trueSolarTime` is the one
   * contested parameter with no words here — it is a boolean, and what it
   * moves is already said in the correction printed under the hour.
   */
  readonly label?: MessageKey;
  /**
   * A divergence *inside* another one, in force only where that one stands on
   * a value.
   *
   * One parameter uses it and it is doctrine rather than presentation: the
   * yuan divides 拆補, so under 置閏 the third of the term is the 符頭's
   * because that is what the method is. Reported beside a zhirun chart it
   * would name a choice the method had already made.
   */
  readonly inside?: { readonly id: string; readonly value: string };
  readonly values: readonly ParameterValue<V>[];
  /** What the engine assumes when a caller says nothing. */
  readonly default: V;
  /**
   * The code a refusal carries, where it is not `OPTION_NOT_IMPLEMENTED`.
   *
   * One parameter has its own, and it is the ju's `method`:
   * `METHOD_NOT_IMPLEMENTED` shipped before any other divergence had been
   * declared, it is part of the API a caller reads and a surface translates,
   * and folding it into the general code to tidy this table would change
   * what every existing client sees for the most divisive option here. It is
   * a fact about the parameter, so it is recorded on the parameter.
   */
  readonly refusal?: 'METHOD_NOT_IMPLEMENTED';
}

/**
 * The parameters of one options type, keyed by the option itself.
 *
 * Mapped over `keyof O` rather than written as a list, and that is the whole
 * guard: an option added to an interface without an entry here does not
 * compile. A registry that could silently miss a divergence would be worse
 * than no registry, because it would be read as complete.
 */
export type ParameterSet<O> = { readonly [K in keyof O]-?: Parameter<O[K]> };

/** The parameters `ChartOptions` carries: dunjia's five, the pillars' three, the almanac's one. */
export const CHART_PARAMETERS: ParameterSet<ChartOptions> = {
  method: {
    board: 'qimen',
    label: 'form.qimen.method',
    values: [
      {
        id: 'chaibu',
        name: { hanzi: '拆補', pinyin: 'chāibǔ' },
        says: 'form.qimen.method.chaibu',
        note: 'cli.note.method',
        implemented: true,
      },
      {
        id: 'zhirun',
        name: { hanzi: '置閏', pinyin: 'zhìrùn' },
        says: 'form.qimen.method.zhirun',
        note: 'cli.note.method',
        implemented: true,
      },
      { id: 'maoshan', name: { hanzi: '茅山', pinyin: 'máoshān' }, implemented: false },
    ],
    default: 'chaibu',
    refusal: 'METHOD_NOT_IMPLEMENTED',
  },
  yuan: {
    board: 'qimen',
    label: 'form.qimen.yuan',
    inside: { id: 'method', value: 'chaibu' },
    values: [
      { id: 'term', says: 'form.qimen.yuan.term', implemented: true },
      {
        id: 'futou',
        name: { hanzi: '符頭', pinyin: 'fútóu' },
        says: 'form.qimen.yuan.futou',
        note: 'cli.note.yuanFutou',
        implemented: true,
      },
    ],
    default: 'term',
  },
  plate: {
    board: 'qimen',
    values: [
      { id: 'zhuan', name: { hanzi: '轉盤', pinyin: 'zhuànpán' }, implemented: true },
      { id: 'fei', name: { hanzi: '飛盤', pinyin: 'fēipán' }, implemented: false },
    ],
    default: 'zhuan',
  },
  centreLodging: {
    board: 'qimen',
    values: [
      { id: 'kun', implemented: true },
      { id: 'dun', implemented: false },
    ],
    default: 'kun',
  },
  system: {
    board: 'qimen',
    values: [
      { id: 'shijia', name: { hanzi: '時家', pinyin: 'shíjiā' }, implemented: true },
      { id: 'rijia', name: { hanzi: '日家', pinyin: 'rìjiā' }, implemented: false },
      { id: 'yuejia', name: { hanzi: '月家', pinyin: 'yuèjiā' }, implemented: false },
      { id: 'nianjia', name: { hanzi: '年家', pinyin: 'niánjiā' }, implemented: false },
    ],
    default: 'shijia',
  },
  trueSolarTime: {
    board: 'pillars',
    // The one parameter here whose values are not identifiers, and their
    // having no name is not an omission: a correction applied or not applied
    // names no school.
    values: [
      { id: true, implemented: true },
      { id: false, implemented: true },
    ],
    default: true,
  },
  yearBoundary: {
    board: 'pillars',
    label: 'form.pillars.yearBoundary',
    values: [
      {
        id: 'lichun',
        name: { hanzi: '立春', pinyin: 'lìchūn' },
        says: 'form.pillars.yearBoundary.lichun',
        implemented: true,
      },
      {
        id: 'chunjie',
        name: { hanzi: '正月初一', pinyin: 'zhēngyuèchūyī' },
        says: 'form.pillars.yearBoundary.chunjie',
        implemented: true,
      },
    ],
    default: 'lichun',
  },
  dayBoundary: {
    board: 'pillars',
    label: 'form.pillars.dayBoundary',
    values: [
      {
        id: 'zishi',
        name: { hanzi: '子時', pinyin: 'zǐshí' },
        says: 'form.pillars.dayBoundary.zishi',
        implemented: true,
      },
      { id: 'midnight', says: 'form.pillars.dayBoundary.midnight', implemented: true },
    ],
    default: 'zishi',
  },
  shensha: {
    board: 'almanac',
    values: [
      { id: 'xieji', name: { hanzi: '協紀辨方書', pinyin: 'xiéjìbiànfāngshū' }, implemented: true },
    ],
    default: 'xieji',
  },
};

export const LIUREN_PARAMETERS: ParameterSet<LiurenOptions> = {
  yuejiang: {
    board: 'liuren',
    values: [
      { id: 'zhongqi', name: { hanzi: '中氣', pinyin: 'zhōngqì' }, implemented: true },
      { id: 'jieqi', name: { hanzi: '節氣', pinyin: 'jiéqì' }, implemented: false },
      { id: 'true', name: { hanzi: '太陽實躔', pinyin: 'tàiyángshíchán' }, implemented: false },
    ],
    default: 'zhongqi',
  },
  guiren: {
    board: 'liuren',
    label: 'form.liuren.guiren',
    values: [
      {
        id: 'chou',
        name: { hanzi: '丑', pinyin: 'chǒu' },
        says: 'form.liuren.guiren.chou',
        note: 'form.liuren.guiren.note',
        implemented: true,
      },
      {
        id: 'wei',
        name: { hanzi: '未', pinyin: 'wèi' },
        says: 'form.liuren.guiren.wei',
        note: 'form.liuren.guiren.note',
        implemented: true,
      },
    ],
    default: 'chou',
  },
  zhouye: {
    board: 'liuren',
    values: [
      { id: 'branch', implemented: true },
      { id: 'solar', implemented: false },
    ],
    default: 'branch',
  },
};

export const QIZHENG_PARAMETERS: ParameterSet<QizhengOptions> = {
  xiudu: {
    board: 'qizheng',
    values: [
      { id: 'juxing', name: { hanzi: '距星', pinyin: 'jùxīng' }, implemented: true },
      { id: 'shixian', name: { hanzi: '時憲曆', pinyin: 'shíxiànlì' }, implemented: false },
      { id: 'shoushi', name: { hanzi: '授時曆', pinyin: 'shòushílì' }, implemented: false },
    ],
    default: 'juxing',
  },
  ziqi: {
    board: 'qizheng',
    values: [
      { id: 'off', implemented: true },
      { id: 'yinianyisu', name: { hanzi: '一年一宿', pinyin: 'yīniányīxiù' }, implemented: false },
    ],
    default: 'off',
  },
  luohou: {
    board: 'qizheng',
    label: 'form.qizheng.luohou',
    values: [
      {
        id: 'descending',
        says: 'form.qizheng.luohou.descending',
        note: 'form.qizheng.luohou.note',
        implemented: true,
      },
      {
        id: 'ascending',
        says: 'form.qizheng.luohou.ascending',
        note: 'form.qizheng.luohou.note',
        implemented: true,
      },
    ],
    default: 'descending',
  },
  minggong: {
    board: 'qizheng',
    values: [
      { id: 'yuejiang', name: { hanzi: '月將', pinyin: 'yuèjiàng' }, implemented: true },
      { id: 'ascendant', implemented: false },
    ],
    default: 'yuejiang',
  },
  gong: {
    board: 'qizheng',
    values: [
      { id: 'zhongqi', name: { hanzi: '中氣', pinyin: 'zhōngqì' }, implemented: true },
      { id: 'ci', name: { hanzi: '次', pinyin: 'cì' }, implemented: false },
    ],
    default: 'zhongqi',
  },
};

export const TAIYI_PARAMETERS: ParameterSet<TaiyiOptions> = {
  epoch: {
    board: 'taiyi',
    values: [
      {
        id: 'jinjing',
        name: { hanzi: '太乙金鏡式經', pinyin: 'tàiyǐjīnjìngshìjīng' },
        implemented: true,
      },
    ],
    default: 'jinjing',
  },
  // 月計, 日計 and 時計 are the registers this one is the first of, and the
  // engine is now ready to refuse them by name: 太乙金鏡式經 卷一 prints all
  // three procedures, so what they are is no longer a guess, and what stops
  // each of them is a constant that fails a check the text itself supplies.
  // A value is declared when the engine can refuse it by name, not when it
  // can compute it. See `docs/sources.md` § 太乙.
  ji: {
    board: 'taiyi',
    values: [
      { id: 'nianji', name: { hanzi: '年計', pinyin: 'niánjì' }, implemented: true },
      { id: 'yueji', name: { hanzi: '月計', pinyin: 'yuèjì' }, implemented: false },
      { id: 'riji', name: { hanzi: '日計', pinyin: 'rìjì' }, implemented: false },
      { id: 'shiji', name: { hanzi: '時計', pinyin: 'shíjì' }, implemented: false },
    ],
    default: 'nianji',
  },
  yearBoundary: {
    board: 'taiyi',
    values: [
      { id: 'lichun', name: { hanzi: '立春', pinyin: 'lìchūn' }, implemented: true },
      { id: 'dongzhi', name: { hanzi: '冬至', pinyin: 'dōngzhì' }, implemented: false },
      { id: 'chunjie', name: { hanzi: '正月初一', pinyin: 'zhēngyuèchūyī' }, implemented: false },
    ],
    default: 'lichun',
  },
};

/**
 * 紫微斗數's divergences, `gender` apart.
 *
 * `gender` is declared in `ZiweiOptions` beside these and is not one of them:
 * it is input, not a school — what a board is laid *for*, the way a date is,
 * and a board laid without it is the same board with four rings left out
 * rather than a different school's board. Omitted from the type this set is
 * mapped over so that the omission is stated once and checked, rather than
 * being an entry here explaining that it does not belong.
 */
export const ZIWEI_PARAMETERS: ParameterSet<Omit<ZiweiOptions, 'gender'>> = {
  leapMonth: {
    board: 'ziwei',
    values: [
      { id: 'following', implemented: true },
      { id: 'current', implemented: false },
      { id: 'split', implemented: false },
    ],
    default: 'following',
  },
  sihua: {
    board: 'ziwei',
    values: [
      { id: 'quanshu', name: { hanzi: '紫微斗數全書', pinyin: 'zǐwēidǒushùquánshū' }, implemented: true },
    ],
    default: 'quanshu',
  },
  huoling: {
    board: 'ziwei',
    values: [
      { id: 'fixed', implemented: true },
      { id: 'hour', implemented: false },
    ],
    default: 'fixed',
  },
  daxian: {
    board: 'ziwei',
    values: [
      { id: 'adjacent', implemented: true },
      { id: 'ming', name: { hanzi: '命宮', pinyin: 'mìnggōng' }, implemented: false },
    ],
    default: 'adjacent',
  },
  yearBoundary: {
    board: 'ziwei',
    // Two implemented values, where every other parameter on this board has
    // one. The book says nothing either way and the two lay different boards
    // for a birth in the weeks between them, so neither could be chosen on
    // its behalf.
    label: 'form.ziwei.yearBoundary',
    values: [
      {
        id: 'lichun',
        name: { hanzi: '立春', pinyin: 'lìchūn' },
        says: 'form.ziwei.yearBoundary.lichun',
        note: 'form.ziwei.yearBoundary.note',
        implemented: true,
      },
      {
        id: 'chunjie',
        name: { hanzi: '正月初一', pinyin: 'zhēngyuèchūyī' },
        says: 'form.ziwei.yearBoundary.chunjie',
        note: 'form.ziwei.yearBoundary.note',
        implemented: true,
      },
    ],
    default: 'chunjie',
  },
};

export const NIANMING_PARAMETERS: ParameterSet<NianmingOptions> = {
  count: {
    board: 'nianming',
    values: [
      { id: 'sui', name: { hanzi: '虛歲', pinyin: 'xūsuì' }, implemented: true },
      { id: 'turns', implemented: true },
    ],
    default: 'sui',
  },
};

/** A parameter with its own name on it, for a caller reading the lot. */
export interface ParameterEntry extends Parameter<string | boolean> {
  /** The key it is passed under, which is its name everywhere it is written. */
  readonly id: string;
}

const entriesOf = <O>(set: ParameterSet<O>): ParameterEntry[] =>
  Object.entries(set).map(([id, parameter]) => ({
    ...(parameter as Parameter<string | boolean>),
    id,
  }));

/**
 * Every parameter of every board, flat.
 *
 * The six sets above are keyed by option because that is how a refusal
 * reaches one; this is the same table as a list, because that is how a
 * surface prints one. Neither is the copy: both are the sets, and this is
 * built from them.
 *
 * An `id` is unique only within its board — `yearBoundary` is three
 * parameters here, one of the pillars and one apiece on 太乙 and 紫微斗數,
 * with different values and different defaults. Anything keying on the name
 * alone is keying on half of it.
 */
export const PARAMETERS: readonly ParameterEntry[] = [
  ...entriesOf(CHART_PARAMETERS),
  ...entriesOf(LIUREN_PARAMETERS),
  ...entriesOf(QIZHENG_PARAMETERS),
  ...entriesOf(TAIYI_PARAMETERS),
  ...entriesOf(ZIWEI_PARAMETERS),
  ...entriesOf(NIANMING_PARAMETERS),
];

/** The values of a parameter the engine computes, in the order it declares them. */
export function implementedValues<V>(parameter: Parameter<V>): V[] {
  return parameter.values.filter((value) => value.implemented).map((value) => value.id);
}

/**
 * Refuses an option this engine declares and does not compute.
 *
 * Called at the top of whatever the option reaches first, for every option
 * that function reads — including the ones with nothing refusable in them
 * today. A parameter whose values are all implemented costs one comparison
 * and buys the guarantee the rule asks for: when a value is added to the
 * type, the board that has no branch for it refuses it instead of answering
 * by the nearest rule it does have. `yuan` was exactly that case — an
 * unrecognised value fell through to `term` and produced a chart nobody had
 * asked for.
 *
 * The message says which values *are* computed, joined as the surfaces
 * already printed them, because a refusal that only says no leaves a caller
 * to find the list in a table they may not have.
 */
export function requireImplemented<O extends object, K extends keyof O & string>(
  set: ParameterSet<O>,
  options: Pick<O, K>,
  ...ids: readonly K[]
): void {
  for (const id of ids) {
    // One cast, here: the set is keyed to its own options type so that the
    // declaration cannot drift, and reading it back through a loop is the
    // one place that precision cannot be carried through.
    const parameter = set[id] as unknown as Parameter<string | boolean>;
    const value = options[id] as unknown as string | boolean;
    if (parameter.values.some((candidate) => candidate.id === value && candidate.implemented)) {
      continue;
    }

    if (parameter.refusal === 'METHOD_NOT_IMPLEMENTED') {
      throw new ChartError('METHOD_NOT_IMPLEMENTED', { method: String(value) });
    }
    throw new ChartError('OPTION_NOT_IMPLEMENTED', {
      option: id,
      value: String(value),
      implemented: implementedValues(parameter).map(String).join(', '),
    });
  }
}

/**
 * The divergences in force on a board, in the words a reader is owed.
 *
 * Every parameter of that board and of the layers under it that the engine
 * computes **more than one** value of — which is what makes it a choice
 * somebody made rather than the only thing this engine can do. The value is
 * looked for in the board's own options first and in the moment's after, since
 * a board carries its own and stands on the pillars'.
 *
 * **The board is a string and not a `ParameterBoard`**, because the boards
 * that have divergences and the boards that are laid are two lists that nearly
 * agree: 八字 has no parameter of its own — it *is* the pillars, and it shares
 * all three of theirs — so it is named here and declares nothing, and asking
 * for it returns the layers'.
 *
 * `docs/parameters.md` § "A declared default is not a hidden school" is the
 * rule: what is in force travels whether or not anybody moved it, because a
 * default nobody moved is still the school the board was laid by. What a
 * surface does with the list is the surface's business; that there is one, and
 * that it is derived from the declaration rather than written per board, is
 * how a school landing later gets said without anybody remembering to say it.
 */
export function divergencesInForce(
  board: string,
  options: object,
  layers: object = options,
): readonly { parameter: ParameterEntry; value: ParameterValue<string | boolean> }[] {
  // One cast, here, for the reason `requireImplemented` has one: an options
  // type is keyed to its own board so that a declaration cannot drift, and
  // reading it back by the parameter's name is the one place that precision
  // cannot be carried through.
  const bag = options as Record<string, unknown>;
  const under = layers as Record<string, unknown>;

  const inForce = [];
  for (const parameter of PARAMETERS) {
    if (parameter.label === undefined) continue;
    if (parameter.board !== board && parameter.board !== 'pillars') continue;
    if (implementedValues(parameter).length < 2) continue;
    if (parameter.inside && bag[parameter.inside.id] !== parameter.inside.value) continue;

    // Read out of the bag the parameter belongs to, and never out of both.
    // `yearBoundary` is the pillars' and 紫微斗數's at once, and a board that
    // carries its own would answer for the layer's under a merge — which is
    // the collision the wire names apart, arriving from the inside.
    const from = parameter.board === 'pillars' ? under : bag;
    const chosen = from[parameter.id] ?? parameter.default;
    const value = parameter.values.find((candidate) => candidate.id === chosen);
    if (value?.says !== undefined) inForce.push({ parameter, value });
  }
  return inForce;
}
