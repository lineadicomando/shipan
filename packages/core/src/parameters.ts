import type { MessageKey } from '@shipan/i18n';
import { ChartError } from './errors.js';
import type { LiurenOptions } from './liuren.js';
import type { BaziOptions } from './bazi/index.js';
import type { NianmingOptions } from './nianming.js';
import type { QizhengOptions } from './qizheng.js';
import type { TaiyiOptions } from './taiyi.js';
import type { ChartOptions } from './types.js';
import { holdingOf, type WitnessId } from './witnesses.js';
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
  /** 八字, which shares the pillars' three and decides one thing for itself. */
  | 'bazi'
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
   * The three methods carry one between them, because which of them is in
   * force moves the ju on most days and a reader weighing a board needs that
   * said wherever the board is. Most values need none: the words above say
   * what was followed, and what a school *means* is doctrine this engine does
   * not hold.
   */
  readonly note?: MessageKey;
  readonly name?: { readonly hanzi: string; readonly pinyin: string };
  /**
   * Whether the engine computes it.
   *
   * `false` is not a promise that it one day will, and `true` is not always
   * a promise kept the way the entry reads. A refused value is here for the
   * reason every other one is: the parameter has to exist before there is a
   * second value, or adding it breaks the API, the MCP tools, the CLI and
   * every shared URL at once.
   *
   * **`maoshan` is the value that shows what this flag cannot catch.** It sat
   * here `false`, refused as having no reference in the world, while the
   * engine computed it by default under another value's name — because the
   * rule was shipped as `yuan: 'term'`, a divergence supposedly inside 拆補.
   * This table says which values are *offered*; nothing in it can say that
   * two entries name one rule. What caught it was a year of hours run against
   * an outside implementation: 100 % against 茅山, 47.66 % against 拆補.
   * → `docs/history/40-the-default-was-maoshan.md`
   */
  readonly implemented: boolean;
  /**
   * The witnesses that hold this value, by their key in `WITNESSES`.
   *
   * Absent says «not yet attributed», which is a state and not a blank:
   * `holdingOf` reads it, and a board laid on such a value says so rather
   * than passing for one some text lays. It is filled an art at a time, as
   * each is read for who holds what — `docs/sources.md` § "What a value named
   * for a school must show" is what an attribution has to show first.
   *
   * It is not `name`: a value is named for its rule, so that a second line
   * found holding the same reading does not find it named for the first.
   */
  readonly heldBy?: readonly WitnessId[];
  /**
   * The witnesses that state this value and reject it, where none holds it.
   *
   * A reading its only witnesses argue against is declarable when what they
   * report is enough to reconstruct it without contradiction. A holder found
   * later goes in `heldBy`, and `holdingOf` then reads that instead.
   */
  readonly reportedBy?: readonly WitnessId[];
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
   * One parameter uses it and it is doctrine rather than presentation:
   * `leap` divides 置閏, so under 拆補 or 茅山 nothing is repeated and where
   * the repetition goes decides nothing. Reported beside those boards it
   * would name a choice the method never had to make.
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
        heldBy: ['shenqi'],
      },
      {
        id: 'zhirun',
        name: { hanzi: '置閏', pinyin: 'zhìrùn' },
        says: 'form.qimen.method.zhirun',
        note: 'cli.note.method',
        implemented: true,
        heldBy: ['tongzong'],
      },
      {
        id: 'maoshan',
        name: { hanzi: '茅山', pinyin: 'máoshān' },
        says: 'form.qimen.method.maoshan',
        note: 'cli.note.method',
        implemented: true,
        heldBy: ['qiwu', 'tujie'],
      },
    ],
    default: 'chaibu',
    refusal: 'METHOD_NOT_IMPLEMENTED',
  },
  plate: {
    board: 'qimen',
    values: [
      {
        id: 'zhuan',
        name: { hanzi: '轉盤', pinyin: 'zhuànpán' },
        implemented: true,
        heldBy: ['tongzong'],
      },
      { id: 'fei', name: { hanzi: '飛盤', pinyin: 'fēipán' }, implemented: false },
      // The stars and the 儀 flown, the gates turned: the 折衷's, argued from
      // 《極深研幾賦》. Declared, and refused until the flight is reconstructed.
      {
        id: 'xingfei',
        name: { hanzi: '星飛門轉', pinyin: 'xīngfēiménzhuàn' },
        implemented: false,
        heldBy: ['zhezhong'],
      },
    ],
    default: 'zhuan',
  },
  centreLodging: {
    board: 'qimen',
    // Five readings of which palace the centre is read in. Two are held and
    // three are known only from a text that sets the reading out and argues
    // it down, which `reportedBy` says and a board laid on one of them repeats.
    // See `docs/sources.md` § "The 折衷 on the plate, chapter by chapter".
    label: 'form.qimen.centreLodging',
    values: [
      {
        id: 'kun',
        says: 'form.qimen.centreLodging.kun',
        note: 'form.qimen.centreLodging.note',
        implemented: true,
        heldBy: ['tongzong'],
      },
      // Yang to 坤, yin to 艮: the imperial print's 一本.
      {
        id: 'dun',
        says: 'form.qimen.centreLodging.dun',
        note: 'form.qimen.centreLodging.note',
        implemented: true,
        reportedBy: ['baojian'],
      },
      // Yang to 艮, yin to 坤: 「元經又謂陽遁寄艮，陰遁寄坤」, as the 折衷 quotes.
      {
        id: 'dunni',
        says: 'form.qimen.centreLodging.dunni',
        note: 'form.qimen.centreLodging.note',
        implemented: true,
        reportedBy: ['zhezhong'],
      },
      // Through the eight palaces with the eight 節, three terms to each.
      {
        id: 'bajie',
        name: { hanzi: '八節', pinyin: 'bājié' },
        says: 'form.qimen.centreLodging.bajie',
        note: 'form.qimen.centreLodging.note',
        implemented: true,
        heldBy: ['zhezhong'],
      },
      // Through the four corners with the four seasons: 耕山陳氏's, which the
      // 折衷 sets out and finds too narrow.
      {
        id: 'siyu',
        name: { hanzi: '四隅', pinyin: 'sìyú' },
        says: 'form.qimen.centreLodging.siyu',
        note: 'form.qimen.centreLodging.note',
        implemented: true,
        reportedBy: ['zhezhong'],
      },
    ],
    default: 'kun',
  },
  earthPlate: {
    board: 'qimen',
    // One plate a 元, or one a decade — 六戊還原. The 折衷 states the second
    // twice, agreeing palace for palace, and says it is its own reasoning from
    // a phrase of 豫章張氏.
    label: 'form.qimen.earthPlate',
    values: [
      {
        id: 'yuan',
        name: { hanzi: '元', pinyin: 'yuán' },
        says: 'form.qimen.earthPlate.yuan',
        note: 'form.qimen.earthPlate.note',
        implemented: true,
        heldBy: ['tongzong'],
      },
      {
        id: 'xun',
        name: { hanzi: '旬', pinyin: 'xún' },
        says: 'form.qimen.earthPlate.xun',
        note: 'form.qimen.earthPlate.note',
        implemented: true,
        heldBy: ['zhezhong'],
      },
    ],
    default: 'yuan',
  },
  system: {
    board: 'qimen',
    values: [
      {
        id: 'shijia',
        name: { hanzi: '時家', pinyin: 'shíjiā' },
        implemented: true,
        heldBy: ['tongzong'],
      },
      {
        id: 'rijia',
        name: { hanzi: '日家', pinyin: 'rìjiā' },
        implemented: false,
        heldBy: ['yanyi', 'tongzong'],
      },
      {
        id: 'yuejia',
        name: { hanzi: '月家', pinyin: 'yuèjiā' },
        implemented: false,
        heldBy: ['yanyi', 'tongzong'],
      },
      {
        id: 'nianjia',
        name: { hanzi: '年家', pinyin: 'niánjiā' },
        implemented: false,
        heldBy: ['yanyi', 'tongzong'],
      },
    ],
    default: 'shijia',
  },
  trueSolarTime: {
    board: 'pillars',
    // The one parameter here whose values are not identifiers. They carry no
    // name, a correction being applied or not; that one of them is taught is
    // said by who holds it.
    values: [
      // 「定時應以出生地點的真正太陽時為準」, 《命理新論》 第九章.
      { id: true, implemented: true, heldBy: ['xinlun'] },
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
      // 「以半夜正子為前後兩日的交換點」, 《命理新論》 第九章: the day turns at
      // midnight and the hour before it is the 夜子 of the day that is ending.
      {
        id: 'midnight',
        says: 'form.pillars.dayBoundary.midnight',
        implemented: true,
        heldBy: ['xinlun'],
      },
    ],
    default: 'zishi',
  },
  spirits: {
    board: 'qimen',
    // Three readings of one ring, parting at two seats and only in the name.
    // What is *not* a value here is the fourth answer — the names following
    // what is being divined — which is a licence to read: see
    // `docs/refusals.md` § "The middle pair named by the matter".
    label: 'form.qimen.spirits',
    values: [
      {
        id: 'dun',
        name: { hanzi: '陰陽異名', pinyin: 'yīnyángyìmíng' },
        says: 'form.qimen.spirits.dun',
        implemented: true,
        // Sheet 79 of the 折衷, citing 來子授書: 勾陳 and 朱雀 walking forward
        // under yang, 白虎 and 玄武 walking back under yin.
        heldBy: ['zhezhong'],
      },
      { id: 'fixed', says: 'form.qimen.spirits.fixed', implemented: true, heldBy: ['baojian'] },
      {
        id: 'baihu',
        name: { hanzi: '白虎', pinyin: 'báihǔ' },
        says: 'form.qimen.spirits.baihu',
        implemented: true,
        heldBy: ['quanju'],
      },
    ],
    default: 'dun',
  },
  leap: {
    board: 'qimen',
    values: [
      { id: 'solstice', implemented: true, heldBy: ['tongzong'] },
      {
        id: 'runyue',
        name: { hanzi: '閏月', pinyin: 'rùnyuè' },
        implemented: false,
        heldBy: ['jinjingbaojian'],
      },
    ],
    default: 'solstice',
    // Inside 置閏, and the one parameter that passes that test: under 拆補 and
    // under 茅山 nothing is repeated, so there is no block to place and this
    // decides nothing.
    inside: { id: 'method', value: 'zhirun' },
  },
  strengths: {
    board: 'qimen',
    values: [
      // Sheets 72–73 of the 折衷 tabulate the nine stars by the season against
      // each star's own phase, under two other names: 廢 for 囚, 沒 for 死.
      { id: 'season', implemented: true, heldBy: ['zhezhong'] },
      { id: 'star', implemented: false, heldBy: ['jinjingbaojian'] },
    ],
    default: 'season',
  },
  earth: {
    board: 'qimen',
    // Where earth's season begins. The default has no text named for it; the
    // other reading is a 六壬 manual's statement about the phases, which
    // counts here because the 三式 stand on one doctrine of them.
    label: 'form.qimen.earth',
    values: [
      {
        id: 'quarters',
        says: 'form.qimen.earth.quarters',
        note: 'form.qimen.earth.note',
        implemented: true,
      },
      // 「惟土守中宫，分旺四季，每季前各旺十八日」, 《大六壬精解》 p. 214.
      {
        id: 'eighteen',
        says: 'form.qimen.earth.eighteen',
        note: 'form.qimen.earth.note',
        implemented: true,
        heldBy: ['jingjie'],
      },
    ],
    default: 'quarters',
  },
  centreTravel: {
    board: 'qimen',
    // Where the 值符 and the 值使 are read when the count puts them on the
    // centre, and nothing else: 《金鏡寶鑑》 states the pair apart from the
    // star in one clause — 其星寄 against 符使不必寄於二 — so neither value
    // moves a plate. See `docs/sources.md`.
    label: 'form.qimen.centreTravel',
    values: [
      {
        id: 'stay',
        says: 'form.qimen.centreTravel.stay',
        implemented: true,
        // The 統宗 states it as well: 「甲辰在中宮，寄於坤二，天禽為符，死門為使」.
        heldBy: ['baojian', 'tongzong'],
      },
      {
        id: 'travel',
        says: 'form.qimen.centreTravel.travel',
        implemented: true,
        heldBy: ['jinjingbaojian'],
      },
    ],
    default: 'stay',
  },
  shensha: {
    board: 'almanac',
    values: [
      {
        id: 'xieji',
        name: { hanzi: '協紀辨方書', pinyin: 'xiéjìbiànfāngshū' },
        implemented: true,
        heldBy: ['xieji'],
      },
    ],
    default: 'xieji',
  },
};

export const LIUREN_PARAMETERS: ParameterSet<LiurenOptions> = {
  yuejiang: {
    board: 'liuren',
    values: [
      {
        id: 'zhongqi',
        name: { hanzi: '中氣', pinyin: 'zhōngqì' },
        implemented: true,
        heldBy: ['liurendaquan', 'jingjie', 'jingwei', 'zhizhi'],
      },
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
        heldBy: ['liurendaquan', 'jingjie', 'jingwei', 'zhizhi'],
      },
      {
        id: 'wei',
        name: { hanzi: '未', pinyin: 'wèi' },
        says: 'form.liuren.guiren.wei',
        note: 'form.liuren.guiren.note',
        implemented: true,
        // 《御定六壬直指》's two verses, 陽貴 and 陰貴: this table cell for cell.
        heldBy: ['zhizhi'],
      },
    ],
    default: 'chou',
  },
  zhouye: {
    board: 'liuren',
    values: [
      { id: 'branch', implemented: true, heldBy: ['jingjie', 'jingwei', 'zhizhi'] },
      { id: 'solar', implemented: false },
    ],
    default: 'branch',
  },
};

export const QIZHENG_PARAMETERS: ParameterSet<QizhengOptions> = {
  xiudu: {
    board: 'qizheng',
    values: [
      {
        id: 'juxing',
        name: { hanzi: '距星', pinyin: 'jùxīng' },
        implemented: true,
        heldBy: ['engine'],
      },
      { id: 'shixian', name: { hanzi: '時憲曆', pinyin: 'shíxiànlì' }, implemented: false },
      {
        id: 'shoushi',
        name: { hanzi: '授時曆', pinyin: 'shòushílì' },
        implemented: false,
        heldBy: ['shoushiligu'],
      },
    ],
    default: 'juxing',
  },
  ziqi: {
    board: 'qizheng',
    label: 'form.qizheng.ziqi',
    values: [
      { id: 'off', says: 'form.qizheng.ziqi.off', implemented: true },
      {
        id: 'yinianyisu',
        name: { hanzi: '一年一宿', pinyin: 'yīniányīxiù' },
        says: 'form.qizheng.ziqi.yinianyisu',
        implemented: true,
        heldBy: ['xingzong', 'xingduzhinan'],
      },
    ],
    default: 'yinianyisu',
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
        heldBy: ['xingduzhinan'],
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
  // Three places where 《太乙金鏡式經》 and the 《統宗》 part on a condition.
  // They are two works and not two copies, so each owes a parameter; the
  // 統宗's readings reach the register through 盧央's study. See
  // `docs/sources.md` § "Whose each value of a 太乙 board is".
  geHost: {
    board: 'taiyi',
    label: 'form.taiyi.geHost',
    values: [
      {
        id: 'ke',
        name: { hanzi: '客', pinyin: 'kè' },
        says: 'form.taiyi.geHost.ke',
        note: 'form.taiyi.geHost.note',
        implemented: true,
        heldBy: ['jinjing'],
      },
      {
        id: 'zhuke',
        name: { hanzi: '主客', pinyin: 'zhǔkè' },
        says: 'form.taiyi.geHost.zhuke',
        note: 'form.taiyi.geHost.note',
        implemented: true,
        heldBy: ['taiyitongzong'],
      },
    ],
    default: 'ke',
  },
  geChong: {
    board: 'taiyi',
    values: [
      { id: 'gong', name: { hanzi: '對宮', pinyin: 'duìgōng' }, implemented: true, heldBy: ['jinjing'] },
      { id: 'chong', name: { hanzi: '沖', pinyin: 'chōng' }, implemented: false, heldBy: ['taiyitongzong'] },
    ],
    default: 'gong',
  },
  wenchangTaiyi: {
    board: 'taiyi',
    label: 'form.taiyi.wenchangTaiyi',
    values: [
      {
        id: 'qiu',
        name: { hanzi: '囚', pinyin: 'qiú' },
        says: 'form.taiyi.wenchangTaiyi.qiu',
        note: 'form.taiyi.wenchangTaiyi.note',
        implemented: true,
        heldBy: ['jinjing'],
      },
      // 樂產's word, which the 統宗 carries as his.
      {
        id: 'guan',
        name: { hanzi: '關', pinyin: 'guān' },
        says: 'form.taiyi.wenchangTaiyi.guan',
        note: 'form.taiyi.wenchangTaiyi.note',
        implemented: true,
        reportedBy: ['taiyitongzong'],
      },
      {
        id: 'yan',
        name: { hanzi: '掩', pinyin: 'yǎn' },
        says: 'form.taiyi.wenchangTaiyi.yan',
        note: 'form.taiyi.wenchangTaiyi.note',
        implemented: true,
        heldBy: ['taiyitongzong'],
      },
    ],
    default: 'qiu',
  },
  // The counts differ by millions and mostly do not differ at all: 《統宗》's
  // is congruent with 《金鏡》's modulo both 360 and 24, so it lays the identical
  // board and is a second witness rather than a second value. 《太乙淘金歌》's is
  // not — it is out by a whole 元 and puts 太乙 in a different palace — which is
  // what makes it the one alternative the engine can be asked for and must
  // refuse by name. 《齊書·武帝紀》's eleven dated positions are what discards it,
  // and a value is declared when the engine can refuse it by name rather than
  // when it can compute it. See `docs/sources.md` § 太乙.
  epoch: {
    board: 'taiyi',
    values: [
      {
        id: 'jinjing',
        name: { hanzi: '太乙金鏡式經', pinyin: 'tàiyǐjīnjìngshìjīng' },
        implemented: true,
        heldBy: ['jinjing', 'taiyitongzong'],
      },
      {
        id: 'taojin',
        name: { hanzi: '太乙淘金歌', pinyin: 'tàiyǐtáojīngē' },
        implemented: false,
        heldBy: ['taojin'],
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
      {
        id: 'nianji',
        name: { hanzi: '歲計', pinyin: 'suìjì' },
        implemented: true,
        heldBy: ['jinjing', 'taiyitongzong'],
      },
      {
        id: 'yueji',
        name: { hanzi: '月計', pinyin: 'yuèjì' },
        implemented: false,
        heldBy: ['jinjing', 'taiyitongzong'],
      },
      {
        id: 'riji',
        name: { hanzi: '日計', pinyin: 'rìjì' },
        implemented: false,
        heldBy: ['jinjing', 'taiyitongzong'],
      },
      {
        id: 'shiji',
        name: { hanzi: '時計', pinyin: 'shíjì' },
        implemented: false,
        heldBy: ['jinjing', 'taiyitongzong'],
      },
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
      { id: 'following', implemented: true, heldBy: ['quanshu'] },
      { id: 'current', implemented: false },
      { id: 'split', implemented: false },
    ],
    default: 'following',
  },
  sihua: {
    board: 'ziwei',
    // The first value named under the standard rather than under the old
    // reading of it: what the shelf carries is one cell, held by two modern
    // schools against a reading both editions and the Ming recension print.
    // A lineage's whole ten stems was being asked for where the test is
    // whether two practitioners would draw different boards. See
    // `docs/parameters.md` § "What a school value must show".
    label: 'form.ziwei.sihua',
    values: [
      {
        id: 'quanshu',
        name: { hanzi: '紫微斗數全書', pinyin: 'zǐwēidǒushùquánshū' },
        says: 'form.ziwei.sihua.quanshu',
        implemented: true,
        heldBy: ['quanshu'],
      },
      {
        id: 'zuofu',
        name: { hanzi: '左輔', pinyin: 'zuǒfǔ' },
        says: 'form.ziwei.sihua.zuofu',
        note: 'form.ziwei.sihua.note',
        implemented: true,
        heldBy: ['han', 'beipai'],
      },
      // 庚's 忌 to 天相: the 占驗派 material of the anthology's seventh volume.
      {
        id: 'tianxiang',
        name: { hanzi: '天相', pinyin: 'tiānxiàng' },
        says: 'form.ziwei.sihua.tianxiang',
        note: 'form.ziwei.sihua.note',
        implemented: true,
        heldBy: ['juexue7'],
      },
    ],
    default: 'quanshu',
  },
  huoling: {
    board: 'ziwei',
    // The same two seats under both values, off the year's triplicity. The
    // book states them and stops; a manual of 1986 takes each as where the 子
    // hour stands and counts on to the hour of birth. See `docs/sources.md`
    // § "Whose each value of a 紫微斗數 board is".
    label: 'form.ziwei.huoling',
    values: [
      {
        id: 'fixed',
        says: 'form.ziwei.huoling.fixed',
        note: 'form.ziwei.huoling.note',
        implemented: true,
        heldBy: ['quanshu'],
      },
      {
        id: 'hour',
        says: 'form.ziwei.huoling.hour',
        note: 'form.ziwei.huoling.note',
        implemented: true,
        heldBy: ['juexue6'],
      },
    ],
    default: 'fixed',
  },
  daxian: {
    board: 'ziwei',
    // Two lines and one palace between them: 《全書》 opens the run beside the
    // 命宮 and the 捷覽 of 1581 opens it in the 命宮, with the same age and the
    // same direction. See `docs/sources.md` § "Whose each value of a 紫微斗數
    // board is".
    label: 'form.ziwei.daxian',
    values: [
      {
        id: 'adjacent',
        says: 'form.ziwei.daxian.adjacent',
        note: 'form.ziwei.daxian.note',
        implemented: true,
        heldBy: ['quanshu'],
      },
      {
        id: 'ming',
        name: { hanzi: '命宮', pinyin: 'mìnggōng' },
        says: 'form.ziwei.daxian.ming',
        note: 'form.ziwei.daxian.note',
        implemented: true,
        heldBy: ['jielan', 'juexue6'],
      },
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

/**
 * 八字's, and the whole of it is one row.
 *
 * **The board with three divergences it shares and one of its own.** The
 * pillars' `trueSolarTime`, `yearBoundary` and `dayBoundary` are declared with
 * `ChartOptions`, where they belong: they say how an instant is read into the
 * four, and every board built on them inherits the answer. What is here is the
 * one thing 八字 decides for itself, which is how the distance to the term is
 * measured when the run of decades is placed.
 *
 * It existed on `BaziOptions` before it existed here, with a declared default
 * and both readings computed, so no chart was ever cast without a caller being
 * able to say which produced it. What it was missing was the second half of
 * the rule — `docs/parameters.md` § "Three questions", the third of them: an
 * option can sit on an input type and still be absent from `PARAMETERS`, and
 * then the chart can say what produced it and nothing a surface builds can.
 */
export const BAZI_PARAMETERS: ParameterSet<Pick<BaziOptions, 'luckGranularity'>> = {
  luckGranularity: {
    board: 'bazi',
    label: 'form.bazi.luckGranularity',
    values: [
      {
        id: 'shichen',
        name: { hanzi: '時辰', pinyin: 'shíchén' },
        says: 'form.bazi.luckGranularity.shichen',
        implemented: true,
        // 《三命通會》卷二 論大運: 「正得五日三時…過六十三時折除，計六百三十日」.
        heldBy: ['santong'],
      },
      {
        id: 'minute',
        says: 'form.bazi.luckGranularity.minute',
        note: 'form.bazi.luckGranularity.note',
        implemented: true,
      },
    ],
    default: 'shichen',
  },
};

export const NIANMING_PARAMETERS: ParameterSet<NianmingOptions> = {
  count: {
    board: 'nianming',
    values: [
      {
        id: 'sui',
        name: { hanzi: '虛歲', pinyin: 'xūsuì' },
        implemented: true,
        heldBy: ['yanyi'],
      },
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
  ...entriesOf(BAZI_PARAMETERS),
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
  // `null` for a board that stands on no instant — 太乙, whose subject is a
  // year: no hour was read into pillars for it, and naming where the day
  // begins would be answering about a calendar that board never opened.
  layers: object | null = options,
): readonly { parameter: ParameterEntry; value: ParameterValue<string | boolean> }[] {
  // One cast, here, for the reason `requireImplemented` has one: an options
  // type is keyed to its own board so that a declaration cannot drift, and
  // reading it back by the parameter's name is the one place that precision
  // cannot be carried through.
  const bag = options as Record<string, unknown>;
  const under = (layers ?? {}) as Record<string, unknown>;

  const inForce = [];
  for (const parameter of PARAMETERS) {
    if (parameter.label === undefined) continue;
    if (parameter.board !== board && parameter.board !== 'pillars') continue;
    if (parameter.board === 'pillars' && layers === null) continue;
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

/**
 * Who lays the combination a board stands on.
 *
 * Axes are independent here and lines hold them together: every parameter
 * added multiplies the boards no text ever laid, and a board cast on such a
 * combination looks exactly like one a school teaches. This reads the answer
 * off the declaration, so that it can be said under every board rather than
 * left for a reader to work out.
 *
 * Three answers, and the third is not a failure of the first two:
 *
 * - `together` — one or more witnesses hold every value in force;
 * - `apart` — every value has a text behind it and none holds them all, so
 *   the combination is this engine's;
 * - `unattributed` — at least one value is a convention with no text named
 *   for it yet. `together` then says who holds all the *others*, which is
 *   usually what a reader wants next, and `attributed` whether there are any
 *   others: an empty `together` beside it means they have texts and no one
 *   text among them.
 *
 * **Every parameter of the board counts, a single-valued one included**: a
 * value nobody could have moved is still somebody's. **The layers under the
 * board do not**: how an instant is cut into pillars is a reckoning shared by
 * every board laid on it, and what is asked here is whose the board is.
 *
 * A value only *reported*, by texts that reject it, has a text behind it and
 * no holder, so it can never be part of `together`.
 *
 * `docs/parameters.md` § "A declared default is not a hidden school".
 */
export type Combination =
  | { readonly state: 'together'; readonly by: readonly WitnessId[] }
  | { readonly state: 'apart' }
  | {
      readonly state: 'unattributed';
      readonly attributed: boolean;
      readonly together: readonly WitnessId[];
    };

export function combinationOf(board: string, options: object): Combination | undefined {
  const bag = options as Record<string, unknown>;

  let shared: WitnessId[] | undefined;
  let unattributed = false;
  let counted = 0;

  for (const parameter of PARAMETERS) {
    if (parameter.board !== board) continue;
    if (parameter.inside && bag[parameter.inside.id] !== parameter.inside.value) continue;

    const chosen = bag[parameter.id] ?? parameter.default;
    const value = parameter.values.find((candidate) => candidate.id === chosen);
    if (value === undefined) continue;
    counted += 1;

    const holding = holdingOf(value);
    if (holding.state === 'unattributed') {
      unattributed = true;
      continue;
    }
    const holders = holding.state === 'held' ? holding.by : [];
    shared = shared === undefined ? [...holders] : shared.filter((id) => holders.includes(id));
  }

  // A board with no parameter of its own has no combination to speak of.
  if (counted === 0) return undefined;
  if (unattributed) {
    return { state: 'unattributed', attributed: shared !== undefined, together: shared ?? [] };
  }
  return shared !== undefined && shared.length > 0
    ? { state: 'together', by: shared }
    : { state: 'apart' };
}
