/**
 * The school divergences as an address writes them, redeclared for the client.
 *
 * The engine declares them once, in `packages/core/src/parameters.ts`, and
 * that declaration is a **value**: importing it here would drag the
 * ephemerides and a native module into the browser bundle to name the choices
 * in a form. So they are written out again, exactly as `vocabulary.ts`
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
   * Keyed by value because that is how the engine declares it: the three
   * methods point at one caution between them, and most values need none.
   */
  readonly notes?: Readonly<Record<string, MessageKey>>;
  /**
   * A divergence *inside* another one, shown only where that one stands on a
   * value — the engine's `inside`, and doctrine rather than layout: `leap`
   * divides 置閏, so under 拆補 and under 茅山 there is no repeated block to
   * place, and a control that changed nothing would read as a choice where
   * none is left.
   */
  readonly inside?: { readonly id: string; readonly value: string };
  /**
   * The family of 奇門 a divergence belongs to — the engine's `family`. A day
   * board has no plate to turn and the hour board no gates of a day, so each
   * is offered, and named under a board, with its own family alone.
   */
  readonly family?: 'shijia' | 'rijia';
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
    family: 'shijia',
    values: ['chaibu', 'zhirun', 'maoshan'],
    implemented: ['chaibu', 'zhirun', 'maoshan'],
    fallback: 'chaibu',
    label: 'form.qimen.method',
    says: {
      chaibu: 'form.qimen.method.chaibu',
      zhirun: 'form.qimen.method.zhirun',
      maoshan: 'form.qimen.method.maoshan',
    },
    notes: { chaibu: 'cli.note.method', zhirun: 'cli.note.method', maoshan: 'cli.note.method' },
  },
  {
    id: 'plate',
    board: 'qimen',
    family: 'shijia',
    values: ['zhuan', 'fei', 'xingfei'],
    implemented: ['zhuan', 'xingfei'],
    fallback: 'zhuan',
    label: 'form.qimen.plate',
    says: { zhuan: 'form.qimen.plate.zhuan', xingfei: 'form.qimen.plate.xingfei' },
    notes: { zhuan: 'form.qimen.plate.note', xingfei: 'form.qimen.plate.note' },
  },
  {
    id: 'centreLodging',
    board: 'qimen',
    family: 'shijia',
    values: ['kun', 'dun', 'dunni', 'bajie', 'siyu'],
    implemented: ['kun', 'dun', 'dunni', 'bajie', 'siyu'],
    fallback: 'kun',
    label: 'form.qimen.centreLodging',
    says: {
      kun: 'form.qimen.centreLodging.kun',
      dun: 'form.qimen.centreLodging.dun',
      dunni: 'form.qimen.centreLodging.dunni',
      bajie: 'form.qimen.centreLodging.bajie',
      siyu: 'form.qimen.centreLodging.siyu',
    },
    notes: {
      kun: 'form.qimen.centreLodging.note',
      dun: 'form.qimen.centreLodging.note',
      dunni: 'form.qimen.centreLodging.note',
      bajie: 'form.qimen.centreLodging.note',
      siyu: 'form.qimen.centreLodging.note',
    },
  },
  {
    id: 'earthPlate',
    board: 'qimen',
    family: 'shijia',
    values: ['yuan', 'xun'],
    implemented: ['yuan', 'xun'],
    fallback: 'yuan',
    label: 'form.qimen.earthPlate',
    says: {
      yuan: 'form.qimen.earthPlate.yuan',
      xun: 'form.qimen.earthPlate.xun',
    },
    notes: { yuan: 'form.qimen.earthPlate.note', xun: 'form.qimen.earthPlate.note' },
  },
  {
    id: 'system',
    board: 'qimen',
    values: ['shijia', 'rijia', 'yuejia', 'nianjia'],
    implemented: ['shijia', 'rijia'],
    fallback: 'shijia',
    label: 'form.qimen.system',
    says: {
      shijia: 'form.qimen.system.shijia',
      rijia: 'form.qimen.system.rijia',
    },
    notes: { shijia: 'form.qimen.system.note', rijia: 'form.qimen.system.note' },
  },
  {
    id: 'dayGates',
    board: 'qimen',
    family: 'rijia',
    values: ['fei', 'zhuan', 'shun'],
    implemented: ['fei', 'zhuan', 'shun'],
    fallback: 'fei',
    label: 'form.qimen.dayGates',
    says: {
      fei: 'form.qimen.dayGates.fei',
      zhuan: 'form.qimen.dayGates.zhuan',
      shun: 'form.qimen.dayGates.shun',
    },
    notes: {
      fei: 'form.qimen.dayGates.note',
      zhuan: 'form.qimen.dayGates.note',
      shun: 'form.qimen.dayGates.note',
    },
  },
  {
    id: 'dayDun',
    board: 'qimen',
    family: 'rijia',
    values: ['solstice', 'liushi', 'yang'],
    implemented: ['solstice', 'yang'],
    fallback: 'solstice',
    label: 'form.qimen.dayDun',
    says: { solstice: 'form.qimen.dayDun.solstice', yang: 'form.qimen.dayDun.yang' },
    notes: { solstice: 'form.qimen.dayDun.note', yang: 'form.qimen.dayDun.note' },
  },
  {
    id: 'yearBoundary',
    board: 'pillars',
    values: ['lichun', 'chunjie', 'dongzhi'],
    implemented: ['lichun', 'chunjie', 'dongzhi'],
    fallback: 'lichun',
    label: 'form.pillars.yearBoundary',
    says: {
      lichun: 'form.pillars.yearBoundary.lichun',
      chunjie: 'form.pillars.yearBoundary.chunjie',
      dongzhi: 'form.pillars.yearBoundary.dongzhi',
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
    id: 'spirits',
    board: 'qimen',
    family: 'shijia',
    values: ['dun', 'fixed', 'baihu', 'huwu'],
    implemented: ['dun', 'fixed', 'baihu', 'huwu'],
    fallback: 'dun',
    label: 'form.qimen.spirits',
    says: {
      dun: 'form.qimen.spirits.dun',
      fixed: 'form.qimen.spirits.fixed',
      baihu: 'form.qimen.spirits.baihu',
      huwu: 'form.qimen.spirits.huwu',
    },
  },
  {
    id: 'spiritSeat',
    board: 'qimen',
    family: 'shijia',
    values: ['tianpan', 'yinshi'],
    implemented: ['tianpan', 'yinshi'],
    fallback: 'tianpan',
    label: 'form.qimen.spiritSeat',
    says: { tianpan: 'form.qimen.spiritSeat.tianpan', yinshi: 'form.qimen.spiritSeat.yinshi' },
    notes: { tianpan: 'form.qimen.spiritSeat.note', yinshi: 'form.qimen.spiritSeat.note' },
  },
  {
    id: 'spiritPhase',
    board: 'qimen',
    family: 'shijia',
    values: ['none', 'branch', 'huaqi'],
    implemented: ['none', 'branch', 'huaqi'],
    fallback: 'branch',
    label: 'form.qimen.spiritPhase',
    says: {
      none: 'form.qimen.spiritPhase.none',
      branch: 'form.qimen.spiritPhase.branch',
      huaqi: 'form.qimen.spiritPhase.huaqi',
    },
    notes: {
      none: 'form.qimen.spiritPhase.note',
      branch: 'form.qimen.spiritPhase.note',
      huaqi: 'form.qimen.spiritPhase.note',
    },
  },
  {
    id: 'leap',
    board: 'qimen',
    family: 'shijia',
    values: ['solstice', 'runyue'],
    implemented: ['solstice'],
    fallback: 'solstice',
    inside: { id: 'method', value: 'zhirun' },
  },
  {
    id: 'strengths',
    board: 'qimen',
    family: 'shijia',
    values: ['season', 'star'],
    implemented: ['season'],
    fallback: 'season',
  },
  {
    id: 'earth',
    board: 'qimen',
    family: 'shijia',
    values: ['quarters', 'eighteen'],
    implemented: ['quarters', 'eighteen'],
    fallback: 'quarters',
    label: 'form.qimen.earth',
    says: { quarters: 'form.qimen.earth.quarters', eighteen: 'form.qimen.earth.eighteen' },
    notes: { quarters: 'form.qimen.earth.note', eighteen: 'form.qimen.earth.note' },
  },
  {
    id: 'centreTravel',
    board: 'qimen',
    family: 'shijia',
    values: ['stay', 'travel'],
    implemented: ['stay', 'travel'],
    fallback: 'stay',
    label: 'form.qimen.centreTravel',
    says: {
      stay: 'form.qimen.centreTravel.stay',
      travel: 'form.qimen.centreTravel.travel',
    },
  },
  {
    id: 'centreStem',
    board: 'qimen',
    family: 'shijia',
    values: ['centre', 'host'],
    implemented: ['centre', 'host'],
    fallback: 'centre',
    inside: { id: 'plate', value: 'zhuan' },
    label: 'form.qimen.centreStem',
    says: { centre: 'form.qimen.centreStem.centre', host: 'form.qimen.centreStem.host' },
    notes: { centre: 'form.qimen.centreStem.note', host: 'form.qimen.centreStem.note' },
  },
  {
    id: 'dingTomb',
    board: 'qimen',
    family: 'shijia',
    values: ['gen', 'qian'],
    implemented: ['gen', 'qian'],
    fallback: 'gen',
    label: 'form.qimen.dingTomb',
    says: { gen: 'form.qimen.dingTomb.gen', qian: 'form.qimen.dingTomb.qian' },
    notes: { gen: 'form.qimen.dingTomb.note', qian: 'form.qimen.dingTomb.note' },
  },
  {
    id: 'yiTomb',
    board: 'qimen',
    family: 'shijia',
    values: ['kun', 'qian'],
    implemented: ['kun', 'qian'],
    fallback: 'kun',
    label: 'form.qimen.yiTomb',
    says: { kun: 'form.qimen.yiTomb.kun', qian: 'form.qimen.yiTomb.qian' },
    notes: { kun: 'form.qimen.yiTomb.note', qian: 'form.qimen.yiTomb.note' },
  },
  {
    id: 'menpo',
    board: 'qimen',
    family: 'shijia',
    values: ['menzhigong', 'gongzhimen'],
    implemented: ['menzhigong', 'gongzhimen'],
    fallback: 'menzhigong',
    label: 'form.qimen.menpo',
    says: { menzhigong: 'form.qimen.menpo.menzhigong', gongzhimen: 'form.qimen.menpo.gongzhimen' },
    notes: { menzhigong: 'form.qimen.menpo.note', gongzhimen: 'form.qimen.menpo.note' },
  },
  {
    id: 'deshi',
    board: 'qimen',
    family: 'shijia',
    values: ['liuyi', 'zhishi'],
    implemented: ['liuyi', 'zhishi'],
    fallback: 'liuyi',
    label: 'form.qimen.deshi',
    says: { liuyi: 'form.qimen.deshi.liuyi', zhishi: 'form.qimen.deshi.zhishi' },
    notes: { liuyi: 'form.qimen.deshi.note', zhishi: 'form.qimen.deshi.note' },
  },
  {
    id: 'stemPairs',
    board: 'qimen',
    family: 'shijia',
    values: ['shared', 'jinhan', 'xianji'],
    implemented: ['shared', 'jinhan', 'xianji'],
    fallback: 'shared',
    label: 'form.qimen.stemPairs',
    says: {
      shared: 'form.qimen.stemPairs.shared',
      jinhan: 'form.qimen.stemPairs.jinhan',
      xianji: 'form.qimen.stemPairs.xianji',
    },
    notes: {
      shared: 'form.qimen.stemPairs.note',
      jinhan: 'form.qimen.stemPairs.note',
      xianji: 'form.qimen.stemPairs.note',
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
    id: 'shehai',
    board: 'liuren',
    values: ['palace', 'depth'],
    implemented: ['palace', 'depth'],
    fallback: 'palace',
    label: 'form.liuren.shehai',
    says: { palace: 'form.liuren.shehai.palace', depth: 'form.liuren.shehai.depth' },
    notes: { palace: 'form.liuren.shehai.note', depth: 'form.liuren.shehai.note' },
  },
  {
    id: 'shehaiFrom',
    board: 'liuren',
    values: ['next', 'seat'],
    implemented: ['next', 'seat'],
    fallback: 'next',
    inside: { id: 'shehai', value: 'depth' },
    label: 'form.liuren.shehaiFrom',
    says: { next: 'form.liuren.shehaiFrom.next', seat: 'form.liuren.shehaiFrom.seat' },
  },
  {
    id: 'xiudu',
    board: 'qizheng',
    values: ['juxing', 'shixian', 'shoushi'],
    implemented: ['juxing', 'shoushi'],
    fallback: 'juxing',
    label: 'form.qizheng.xiudu',
    says: { juxing: 'form.qizheng.xiudu.juxing', shoushi: 'form.qizheng.xiudu.shoushi' },
    notes: { juxing: 'form.qizheng.xiudu.note', shoushi: 'form.qizheng.xiudu.note' },
  },
  {
    id: 'ziqi',
    board: 'qizheng',
    values: ['off', 'yinianyisu'],
    implemented: ['off', 'yinianyisu'],
    fallback: 'yinianyisu',
    label: 'form.qizheng.ziqi',
    says: {
      off: 'form.qizheng.ziqi.off',
      yinianyisu: 'form.qizheng.ziqi.yinianyisu',
    },
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
    id: 'geHost',
    board: 'taiyi',
    values: ['ke', 'zhuke'],
    implemented: ['ke', 'zhuke'],
    fallback: 'ke',
    label: 'form.taiyi.geHost',
    says: { ke: 'form.taiyi.geHost.ke', zhuke: 'form.taiyi.geHost.zhuke' },
    notes: { ke: 'form.taiyi.geHost.note', zhuke: 'form.taiyi.geHost.note' },
  },
  {
    id: 'geChong',
    board: 'taiyi',
    values: ['gong', 'chong'],
    implemented: ['gong'],
    fallback: 'gong',
  },
  {
    id: 'wenchangTaiyi',
    board: 'taiyi',
    values: ['qiu', 'guan', 'yan'],
    implemented: ['qiu', 'guan', 'yan'],
    fallback: 'qiu',
    label: 'form.taiyi.wenchangTaiyi',
    says: {
      qiu: 'form.taiyi.wenchangTaiyi.qiu',
      guan: 'form.taiyi.wenchangTaiyi.guan',
      yan: 'form.taiyi.wenchangTaiyi.yan',
    },
    notes: {
      qiu: 'form.taiyi.wenchangTaiyi.note',
      guan: 'form.taiyi.wenchangTaiyi.note',
      yan: 'form.taiyi.wenchangTaiyi.note',
    },
  },
  {
    id: 'dayouEye',
    board: 'taiyi',
    values: ['jinjing', 'tongzong'],
    implemented: ['jinjing', 'tongzong'],
    fallback: 'jinjing',
    label: 'form.taiyi.dayouEye',
    says: {
      jinjing: 'form.taiyi.dayouEye.jinjing',
      tongzong: 'form.taiyi.dayouEye.tongzong',
    },
    notes: {
      jinjing: 'form.taiyi.dayouEye.note',
      tongzong: 'form.taiyi.dayouEye.note',
    },
  },
  {
    id: 'epoch',
    board: 'taiyi',
    values: ['jinjing', 'taojin'],
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
    implemented: ['lichun', 'dongzhi'],
    fallback: 'lichun',
    label: 'form.taiyi.yearBoundary',
    says: {
      lichun: 'form.taiyi.yearBoundary.lichun',
      dongzhi: 'form.taiyi.yearBoundary.dongzhi',
    },
    notes: {
      lichun: 'form.taiyi.yearBoundary.note',
      dongzhi: 'form.taiyi.yearBoundary.note',
    },
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
    values: ['quanshu', 'zuofu', 'tianxiang'],
    implemented: ['quanshu', 'zuofu', 'tianxiang'],
    fallback: 'quanshu',
    label: 'form.ziwei.sihua',
    says: {
      quanshu: 'form.ziwei.sihua.quanshu',
      zuofu: 'form.ziwei.sihua.zuofu',
      tianxiang: 'form.ziwei.sihua.tianxiang',
    },
    notes: { zuofu: 'form.ziwei.sihua.note', tianxiang: 'form.ziwei.sihua.note' },
  },
  {
    id: 'huoling',
    board: 'ziwei',
    values: ['fixed', 'hour'],
    implemented: ['fixed', 'hour'],
    fallback: 'fixed',
    label: 'form.ziwei.huoling',
    says: {
      fixed: 'form.ziwei.huoling.fixed',
      hour: 'form.ziwei.huoling.hour',
    },
    notes: { fixed: 'form.ziwei.huoling.note', hour: 'form.ziwei.huoling.note' },
  },
  {
    id: 'daxian',
    board: 'ziwei',
    values: ['adjacent', 'ming'],
    implemented: ['adjacent', 'ming'],
    fallback: 'adjacent',
    label: 'form.ziwei.daxian',
    says: {
      adjacent: 'form.ziwei.daxian.adjacent',
      ming: 'form.ziwei.daxian.ming',
    },
    notes: { adjacent: 'form.ziwei.daxian.note', ming: 'form.ziwei.daxian.note' },
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

/**
 * Whether a divergence belongs to a layer rather than to one board.
 *
 * The same line `wire` draws, asked as a question: a layer's parameter says
 * how an instant is read and is asked wherever there is an instant, a board's
 * says how that board is laid and is asked in its section alone. The form
 * reads it to put the two in separate groups, so that a reader opening the
 * options of one art is not handed four things in a row without being told
 * which of them are that art's.
 */
export function ofLayer(divergence: Divergence): boolean {
  return LAYERS.includes(divergence.board);
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
export function offered(board?: string, families = false): readonly Divergence[] {
  return DIVERGENCES.filter(
    (row) =>
      row.implemented.length > 1 &&
      (LAYERS.includes(row.board) || row.board === board) &&
      (families || !ofFamilies(row)),
  );
}

/**
 * Whether a divergence is the choice of a family, or belongs to one that is
 * not the hour's.
 *
 * A family is a board of its own, and one section lays it: 奇門's. The
 * consultation and the scan lay the hour board — a prompt and a criterion are
 * both written against a plate of stems — so they neither offer the family nor
 * read it off an address that carried it there.
 */
function ofFamilies(row: Divergence): boolean {
  return (row.board === 'qimen' && row.id === 'system') || row.family === 'rijia';
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
export function readChosen(params: URLSearchParams, board?: string, families = false): Chosen {
  const chosen: Record<string, string> = {};
  for (const row of offered(board, families)) {
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
    // A value the form hides is one the board laid does not read, and the
    // server refuses a 奇門 option of the other family by name.
    if (!shown(row, chosen)) continue;
    const value = chosen[wire(row)];
    if (value && value !== row.fallback) fields[wire(row)] = value;
  }
  return fields;
}

/** Whether a divergence is shown at all, given what else is set. */
export function shown(row: Divergence, chosen: Chosen): boolean {
  if (row.family && (chosen[named(row.board, 'system')] ?? 'shijia') !== row.family) return false;
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
    if (row.family && (bag.system ?? 'shijia') !== row.family) continue;

    const from = LAYERS.includes(row.board) ? (under ?? {}) : own;
    const value = String(from[row.id] ?? row.fallback);
    if (row.says?.[value]) standing.push({ row, value });
  }
  return standing;
}
