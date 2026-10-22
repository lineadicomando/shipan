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
   * It is doctrine rather than presentation: `leap` divides 置閏, so under
   * 拆補 or 茅山 nothing is repeated and where the repetition goes decides
   * nothing. Reported beside those boards it would name a choice the method
   * never had to make. `centreStem` divides the turned plate the same way,
   * since nothing lodges on the flown one.
   */
  readonly inside?: { readonly id: string; readonly value: string };
  /**
   * The family of 奇門 a parameter belongs to, where it belongs to one.
   *
   * A family is a board of its own: a day board has no plate of stems to turn
   * and no centre to lodge, and the hour board has no gates of a day. Naming
   * the hour board's method beside a day board would report a choice that
   * board was never laid by. Absent on `system` itself and on every other
   * art's parameters.
   */
  readonly family?: 'shijia' | 'rijia';
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
    family: 'shijia',
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
        heldBy: ['tongzong', 'qimendaquan'],
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
    family: 'shijia',
    // How what stands over the palaces is moved. Two readings are computed and
    // each is a board somebody lays whole; 飛盤, where the gates fly as well,
    // waits on a text flying the hour board's own 起例.
    label: 'form.qimen.plate',
    values: [
      {
        id: 'zhuan',
        name: { hanzi: '轉盤', pinyin: 'zhuànpán' },
        says: 'form.qimen.plate.zhuan',
        note: 'form.qimen.plate.note',
        implemented: true,
        // 《御定奇門大全》卷五–十 turns it in every one of its 1080 hours.
        heldBy: ['tongzong', 'qimendaquan'],
      },
      { id: 'fei', name: { hanzi: '飛盤', pinyin: 'fēipán' }, implemented: false },
      // The stars and the 儀 flown, the gates turned: the 折衷's, argued from
      // 《極深研幾賦》 and worked hour by hour in its own pages.
      {
        id: 'xingfei',
        name: { hanzi: '星飛門轉', pinyin: 'xīngfēiménzhuàn' },
        says: 'form.qimen.plate.xingfei',
        note: 'form.qimen.plate.note',
        implemented: true,
        heldBy: ['zhezhong'],
      },
    ],
    default: 'zhuan',
  },
  centreLodging: {
    board: 'qimen',
    family: 'shijia',
    // Five readings of which palace the centre is read in. Three are held and
    // two are known only from a text that sets the reading out and argues
    // it down, which `reportedBy` says and a board laid on one of them repeats.
    // See `docs/sources.md` § "The 折衷 on the plate, chapter by chapter".
    label: 'form.qimen.centreLodging',
    values: [
      {
        id: 'kun',
        says: 'form.qimen.centreLodging.kun',
        note: 'form.qimen.centreLodging.note',
        implemented: true,
        // The 符應經 works it in both dun: 「六戊在五宮，寄坤二」 on a yang board
        // and 「直使在五宮，寄坤二西南」 on a yin one. 《御定奇門大全》卷五–十
        // lays all eighteen 局 on it, hour by hour.
        heldBy: ['tongzong', 'fuyingjing', 'qimendaquan'],
      },
      // Yang to 坤, yin to 艮: the imperial print's 一本, and the 《漢陰居士歌》's
      // own rule — 「任生艮土寄陰禽…坤寄陽禽」 — with a 陰遁三局 board worked on it.
      {
        id: 'dun',
        says: 'form.qimen.centreLodging.dun',
        note: 'form.qimen.centreLodging.note',
        implemented: true,
        heldBy: ['hanyinjushi'],
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
    family: 'shijia',
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
        heldBy: ['tongzong', 'qimendaquan'],
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
    // What the board is laid off: the hour, or the day. Each is a board of its
    // own with its own stars, and they share the eight gates and nothing else.
    label: 'form.qimen.system',
    values: [
      {
        id: 'shijia',
        name: { hanzi: '時家', pinyin: 'shíjiā' },
        says: 'form.qimen.system.shijia',
        note: 'form.qimen.system.note',
        implemented: true,
        heldBy: ['tongzong'],
      },
      {
        id: 'rijia',
        name: { hanzi: '日家', pinyin: 'rìjiā' },
        says: 'form.qimen.system.rijia',
        note: 'form.qimen.system.note',
        implemented: true,
        heldBy: ['yanyi', 'tongzong', 'jinhan'],
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
  dayGates: {
    board: 'qimen',
    family: 'rijia',
    // How the seven other gates follow 休門 on a day board. Two works lay it
    // and they part; the second says it is drawn from the first.
    label: 'form.qimen.dayGates',
    values: [
      {
        id: 'fei',
        name: { hanzi: '飛', pinyin: 'fēi' },
        says: 'form.qimen.dayGates.fei',
        note: 'form.qimen.dayGates.note',
        implemented: true,
        // 八門三奇出行定局, 卷十八: eight rows, every gate in every one.
        heldBy: ['jinhan'],
      },
      {
        id: 'zhuan',
        name: { hanzi: '轉', pinyin: 'zhuàn' },
        says: 'form.qimen.dayGates.zhuan',
        note: 'form.qimen.dayGates.note',
        implemented: true,
        heldBy: ['rijiaqimen'],
      },
      // 寶鏡圖's sixty wheels: the seven with the sun on every day.
      {
        id: 'shun',
        name: { hanzi: '順', pinyin: 'shùn' },
        says: 'form.qimen.dayGates.shun',
        note: 'form.qimen.dayGates.note',
        implemented: true,
        heldBy: ['baojingtu'],
      },
    ],
    default: 'fei',
  },
  dayDun: {
    board: 'qimen',
    family: 'rijia',
    label: 'form.qimen.dayDun',
    values: [
      {
        id: 'solstice',
        name: { hanzi: '二至', pinyin: 'èrzhì' },
        says: 'form.qimen.dayDun.solstice',
        note: 'form.qimen.dayDun.note',
        implemented: true,
        // 「冬至艮宮夏坤地」, 卷二十; 「每年從冬至節開始，到翌年交夏至節止，為陽」.
        heldBy: ['jinhan', 'rijiaqimen'],
      },
      // Sixty days to a 局, the half following the 局 and not the term.
      {
        id: 'liushi',
        name: { hanzi: '六十日一局', pinyin: 'liùshírìyījú' },
        implemented: false,
        heldBy: ['tongzong'],
      },
      // One board to a day all year, every one the yang count: 寶鏡圖.
      {
        id: 'yang',
        name: { hanzi: '陽遁', pinyin: 'yángdùn' },
        says: 'form.qimen.dayDun.yang',
        note: 'form.qimen.dayDun.note',
        implemented: true,
        heldBy: ['baojingtu'],
      },
    ],
    default: 'solstice',
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
      // 《命理新論》 第九章: a birth after 冬至 takes the next year's pillar,
      // and the month pillar stays.
      {
        id: 'dongzhi',
        name: { hanzi: '冬至', pinyin: 'dōngzhì' },
        says: 'form.pillars.yearBoundary.dongzhi',
        implemented: true,
        heldBy: ['xinlun'],
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
    family: 'shijia',
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
      // The yin names in both dun: 「乙休雖在乾會白虎」 and 「乙休在兌…會玄武」 on
      // the yang boards of 《御定奇門大全》卷五–十, which name 勾陳 and 朱雀 nowhere.
      // Named after the pair 《金鏡寶鑑》 calls them by, 「換虎、武用」.
      {
        id: 'huwu',
        name: { hanzi: '虎武', pinyin: 'hǔwǔ' },
        says: 'form.qimen.spirits.huwu',
        implemented: true,
        heldBy: ['qimendaquan'],
      },
    ],
    default: 'dun',
  },
  spiritSeat: {
    board: 'qimen',
    family: 'shijia',
    // Where the ring of the eight spirits starts, and nothing else: the order,
    // the direction and the names are `spirits` and the dun under both values.
    // See `docs/sources.md` § "《御定奇門大全》卷四十三–四十八".
    label: 'form.qimen.spiritSeat',
    values: [
      {
        id: 'tianpan',
        name: { hanzi: '天盤', pinyin: 'tiānpán' },
        says: 'form.qimen.spiritSeat.tianpan',
        note: 'form.qimen.spiritSeat.note',
        implemented: true,
        // 「小值符加大值符法：以最上盤之值符加於九星值符所臨之宮，次即騰蛇以至
        // 九天，陽順陰逆」, 《奇門遁甲統宗》卷二, printed again in 《御定奇門大全》
        // 卷四十九; and the same compilation's 卷五–十 lay 38 of the 39 spirit
        // claims that tell the two seats apart, at a 己 to 癸 hour.
        heldBy: ['tongzong', 'qimendaquan'],
      },
      // 「如遇己庚辛壬癸五時為陰者，看地盤直符坐何宮，即於何宮起直符」, the
      // 奇門秘訣's commentary on the 釣叟歌, 《御定奇門大全》卷四十七.
      {
        id: 'yinshi',
        name: { hanzi: '陰時', pinyin: 'yīnshí' },
        says: 'form.qimen.spiritSeat.yinshi',
        note: 'form.qimen.spiritSeat.note',
        implemented: true,
        heldBy: ['qimenmijue'],
      },
    ],
    default: 'tianpan',
  },
  leap: {
    board: 'qimen',
    family: 'shijia',
    values: [
      { id: 'solstice', implemented: true, heldBy: ['tongzong', 'qimendaquan'] },
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
    family: 'shijia',
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
    family: 'shijia',
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
    family: 'shijia',
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
        // The 統宗 states it as well: 「甲辰在中宮，寄於坤二，天禽為符，死門為使」,
        // and the 符應經 reads the 值使 of a yin board there: 「直使在五宮，寄坤二」.
        heldBy: ['baojian', 'tongzong', 'fuyingjing'],
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
  centreStem: {
    board: 'qimen',
    family: 'shijia',
    // Whether the centre's stem rides the heaven plate with its host's. Nothing
    // lodges on the flown plate, so this divides the turned one alone. See
    // `docs/sources.md` § "《御定奇門大全》卷五–十, the eighteen 局 hour by hour".
    label: 'form.qimen.centreStem',
    inside: { id: 'plate', value: 'zhuan' },
    values: [
      {
        id: 'centre',
        says: 'form.qimen.centreStem.centre',
        note: 'form.qimen.centreStem.note',
        implemented: true,
        // Argued, not held: the 《奇門探索錄》's 夾注 puts the centre's 乙 in the
        // centre against its own text — 「中宮天禽帶乙奇，此云天芮帶到，於理不合」.
      },
      {
        id: 'host',
        says: 'form.qimen.centreStem.host',
        note: 'form.qimen.centreStem.note',
        implemented: true,
        heldBy: ['qimendaquan'],
      },
    ],
    default: 'centre',
  },
  dingTomb: {
    board: 'qimen',
    family: 'shijia',
    // One cell of 入墓, and two works that part on it: 丁 in 艮, or in 乾 with
    // 丙. See `docs/sources.md` § "《遁甲符應經》 from 三甲 to its 後序".
    label: 'form.qimen.dingTomb',
    values: [
      {
        id: 'gen',
        name: { hanzi: '艮', pinyin: 'gèn' },
        says: 'form.qimen.dingTomb.gen',
        note: 'form.qimen.dingTomb.note',
        implemented: true,
        // The 統宗's 四十格, 「丁奇艮宮」; the 吉凶格解's verse, 「更忌丁奇居艮上」,
        // 《御定奇門大全》卷五十八; the same verse in the 秘笈大全, 「丁奇一位臨艮
        // 上」; and 奇門秘訣's 三璋, 「六丁星奇下臨八宮」.
        heldBy: ['tongzong', 'jixionggejie', 'mijidaquan', 'qimenmijue'],
      },
      {
        id: 'qian',
        name: { hanzi: '乾', pinyin: 'qián' },
        says: 'form.qimen.dingTomb.qian',
        note: 'form.qimen.dingTomb.note',
        implemented: true,
        heldBy: ['fuyingjing'],
      },
    ],
    default: 'gen',
  },
  yiTomb: {
    board: 'qimen',
    family: 'shijia',
    // The other cell of 入墓 texts part on: 乙 in 坤, against the twelve
    // stages, or in 乾 with 丙. An axis apart from `dingTomb`, since each text
    // names each 奇. See `docs/sources.md` § "《御定奇門大全》卷五十八–五十九".
    label: 'form.qimen.yiTomb',
    values: [
      {
        id: 'kun',
        name: { hanzi: '坤', pinyin: 'kūn' },
        says: 'form.qimen.yiTomb.kun',
        note: 'form.qimen.yiTomb.note',
        implemented: true,
        // 「乙奇坤宮」, 「六乙日奇臨二宮」 under 璋曰, 「六乙臨坤請避之」.
        heldBy: ['tongzong', 'fuyingjing', 'jixionggejie'],
      },
      {
        id: 'qian',
        name: { hanzi: '乾', pinyin: 'qián' },
        says: 'form.qimen.yiTomb.qian',
        note: 'form.qimen.yiTomb.note',
        implemented: true,
        // 「乙丙臨乾請避之」, 《奇門遁甲秘笈大全》卷十五; and 「三璋謂六乙日奇下臨
        // 六宮…以二為墓者，非」, 奇門秘訣, 《御定奇門大全》卷四十七.
        heldBy: ['mijidaquan', 'qimenmijue'],
      },
    ],
    default: 'kun',
  },
  menpo: {
    board: 'qimen',
    family: 'shijia',
    // Which relation of control carries the name 門迫: the cells and the
    // relation each palace reports are the same under both. See
    // `docs/sources.md` § "《御定奇門大全》卷五十八–五十九".
    label: 'form.qimen.menpo',
    values: [
      {
        id: 'menzhigong',
        name: { hanzi: '門制宮', pinyin: 'ménzhìgōng' },
        says: 'form.qimen.menpo.menzhigong',
        note: 'form.qimen.menpo.note',
        implemented: true,
        // The 統宗卷一's 迫, eleven of the thirteen; the 符應經's cells, all
        // thirteen; 「驚開三四休臨九…吉門被迫吉不就」, 秘笈大全卷十五.
        heldBy: ['tongzong', 'fuyingjing', 'mijidaquan'],
      },
      // 「門迫宮制門，宮迫門制宮」, and thirteen cells on each, 《吉凶格解》.
      {
        id: 'gongzhimen',
        name: { hanzi: '宮制門', pinyin: 'gōngzhìmén' },
        says: 'form.qimen.menpo.gongzhimen',
        note: 'form.qimen.menpo.note',
        implemented: true,
        heldBy: ['jixionggejie'],
      },
    ],
    default: 'menzhigong',
  },
  deshi: {
    board: 'qimen',
    family: 'shijia',
    // What makes a 奇 得使: the transmitted pairing with the decades, or the
    // 值使 gate. See `docs/sources.md` § "三奇得使 re-read".
    label: 'form.qimen.deshi',
    values: [
      {
        id: 'liuyi',
        name: { hanzi: '六儀', pinyin: 'liùyí' },
        says: 'form.qimen.deshi.liuyi',
        note: 'form.qimen.deshi.note',
        implemented: true,
        // 「乙奇加甲午甲戌　丙奇加甲子甲申　丁奇加甲寅甲辰」, the 統宗's 四十格;
        // 「甲戌甲午乙為使…」 under 葛洪 in the 符應經 and in the 演義, which
        // works three cases the engine lays; 「乙奇臨甲午甲戌…」, 吉凶格解.
        heldBy: ['tongzong', 'fuyingjing', 'yanyi', 'jixionggejie'],
      },
      // 「乙、丙、丁三奇在天盤，無論地盤六儀如何，只要門盤是值使門，就為三奇
      // 得使」, 《奇門遁甲開悟之門》 p. 120.
      {
        id: 'zhishi',
        name: { hanzi: '值使', pinyin: 'zhíshǐ' },
        says: 'form.qimen.deshi.zhishi',
        note: 'form.qimen.deshi.note',
        implemented: true,
        heldBy: ['kaiwuzhimen'],
      },
    ],
    default: 'liuyi',
  },
  // 十干克應, the stem above over the stem below. Three lines carry the
  // eighty-one, and they name them differently: a whole table is a line's, and
  // which one a board lays is a choice. The default is the cells they name
  // alike, which nobody's table is. See `docs/sources.md` § 十干克應.
  stemPairs: {
    board: 'qimen',
    family: 'shijia',
    label: 'form.qimen.stemPairs',
    values: [
      {
        id: 'shared',
        says: 'form.qimen.stemPairs.shared',
        note: 'form.qimen.stemPairs.note',
        implemented: true,
      },
      {
        id: 'jinhan',
        name: { hanzi: '金函', pinyin: 'jīnhán' },
        says: 'form.qimen.stemPairs.jinhan',
        note: 'form.qimen.stemPairs.note',
        implemented: true,
        heldBy: ['jinhan'],
      },
      {
        id: 'xianji',
        name: { hanzi: '仙機', pinyin: 'xiānjī' },
        implemented: false,
        heldBy: ['qimendaquan'],
      },
    ],
    default: 'shared',
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
    // The frame every body on this board is stood against. The default takes
    // it from the stars and is the engine's own; `shoushi` is the first a
    // line holds, laid by the 《授時曆故》's method from its equatorial widths.
    label: 'form.qizheng.xiudu',
    values: [
      {
        id: 'juxing',
        name: { hanzi: '距星', pinyin: 'jùxīng' },
        says: 'form.qizheng.xiudu.juxing',
        note: 'form.qizheng.xiudu.note',
        implemented: true,
        heldBy: ['engine'],
      },
      { id: 'shixian', name: { hanzi: '時憲曆', pinyin: 'shíxiànlì' }, implemented: false },
      {
        id: 'shoushi',
        name: { hanzi: '授時曆', pinyin: 'shòushílì' },
        says: 'form.qizheng.xiudu.shoushi',
        note: 'form.qizheng.xiudu.note',
        implemented: true,
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
      // 《三命通會》卷二 論坐命宮: 「將所生之時加於所生之月，順行十二位，逢卯即
      // 安命宮」 — the hour laid on the month's palace and counted to 卯.
      {
        id: 'yuejiang',
        name: { hanzi: '月將', pinyin: 'yuèjiàng' },
        implemented: true,
        heldBy: ['xingxuedacheng', 'santong'],
      },
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
        // The 統宗 has it too, as the name of the whole: 「文昌主客四將與太乙同宮
        // 總名曰囚」, 卷七 釋囚.
        heldBy: ['jinjing', 'taiyitongzong'],
      },
      // 樂產's word. The 統宗 quotes it as his in 釋囚 and files 文昌 under it
      // in its own list of the conditions, 卷七: 「文昌與太乙同宮為關」.
      {
        id: 'guan',
        name: { hanzi: '關', pinyin: 'guān' },
        says: 'form.taiyi.wenchangTaiyi.guan',
        note: 'form.taiyi.wenchangTaiyi.note',
        implemented: true,
        heldBy: ['taiyitongzong'],
      },
      // The same work under 釋掩: 「文昌加太乙為掩，始擊加太乙宮亦為掩」.
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
  // The eye of the 大遊 walks the same ring in both works and is counted two
  // ways before it walks. The values are named for the works, as `epoch` is;
  // the name beside each is the word its count turns on. Neither work dates a
  // seat. See `docs/sources.md` § "What is not here", under 大遊.
  dayouEye: {
    board: 'taiyi',
    label: 'form.taiyi.dayouEye',
    values: [
      {
        id: 'jinjing',
        name: { hanzi: '元法', pinyin: 'yuánfǎ' },
        says: 'form.taiyi.dayouEye.jinjing',
        note: 'form.taiyi.dayouEye.note',
        implemented: true,
        heldBy: ['jinjing'],
      },
      {
        id: 'tongzong',
        name: { hanzi: '盈差', pinyin: 'yíngchā' },
        says: 'form.taiyi.dayouEye.tongzong',
        note: 'form.taiyi.dayouEye.note',
        implemented: true,
        heldBy: ['taiyitongzong'],
      },
    ],
    default: 'jinjing',
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
  // The default has no holder and is a convention: the pillars beside the
  // board turn at 立春 and the 金鏡 names no boundary. `dongzhi` has one — the
  // 《統宗》, 卷二十 「今年子月自當為明年」 and 卷二's count from one 天正冬至 to
  // the next. See `docs/sources.md` § "《太乙數統宗大全》卷二 again".
  yearBoundary: {
    board: 'taiyi',
    label: 'form.taiyi.yearBoundary',
    values: [
      {
        id: 'lichun',
        name: { hanzi: '立春', pinyin: 'lìchūn' },
        says: 'form.taiyi.yearBoundary.lichun',
        note: 'form.taiyi.yearBoundary.note',
        implemented: true,
      },
      {
        id: 'dongzhi',
        name: { hanzi: '冬至', pinyin: 'dōngzhì' },
        says: 'form.taiyi.yearBoundary.dongzhi',
        note: 'form.taiyi.yearBoundary.note',
        implemented: true,
        heldBy: ['taiyitongzong'],
      },
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
 * Refuses a 奇門 option given beside a family that does not read it.
 *
 * A family is a board of its own, and the hour board's options and the day
 * board's travel in one type: `method` beside `system: rijia` was accepted and
 * laid without, and a board that ignores what it was asked for looks exactly
 * like one that honoured it. So this reads **what the caller gave**, never the
 * options with the defaults filled in — a default nobody moved was not asked
 * for — keyed by the parameter's own name. `name` is the word the surface asked
 * for it by, which is the word the refusal has to say.
 *
 * A `system` the engine does not compute is left to `requireImplemented`, which
 * names that refusal; reading the family of a board that is not laid would be
 * answering a question nobody can ask yet.
 */
export function refuseOtherFamily(
  given: Readonly<Record<string, unknown>>,
  name: (parameter: ParameterEntry) => string = (parameter) => parameter.id,
): void {
  const system = String(given.system ?? CHART_PARAMETERS.system.default);
  const families = new Set(PARAMETERS.map((parameter) => parameter.family));
  if (!families.has(system as ParameterEntry['family'])) return;

  for (const parameter of PARAMETERS) {
    if (parameter.board !== 'qimen' || parameter.family === undefined) continue;
    if (parameter.family === system || given[parameter.id] === undefined) continue;
    throw new ChartError('OPTION_NOT_READ', { option: name(parameter), system });
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
    if (parameter.family && (bag.system ?? 'shijia') !== parameter.family) continue;

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
    if (parameter.family && (bag.system ?? 'shijia') !== parameter.family) continue;

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
