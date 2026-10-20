/**
 * The texts a value is held by, declared once.
 *
 * `docs/sources.md` § "The standard, stated once" is the rule this serves: a
 * transmitted quantity says who carries it, so who carries it has to be
 * something a surface can read and not a clause in an argument. Works were
 * named in prose — in a board's own comments, in the register's `stands_on` —
 * and a name in prose can be neither listed nor joined: nothing could say of a
 * board which of its values one text lays together and which no text does.
 *
 * **A witness is whoever teaches a reading, and its age is not a criterion.**
 * `kind` says which of three things it is, because a reader weighing a value
 * is owed the difference and a year alone does not give it: a work handed
 * down, a manual of a line printed in modern type, or this engine's own
 * construction — which is a holder like the others and the honest name for a
 * value no text lays. A program that runs is none of the three: it checks a
 * transcription and declares nothing.
 *
 * **It is not the register.** What a quantity stands on, and how well that was
 * checked, is `docs/sources.tsv`; this says only whose a declared value is,
 * and `apps/web/test/docs.test.ts` holds every witness here to an argument in
 * `docs/sources.md`.
 */
export type WitnessKind = 'transmitted' | 'modern' | 'engine';

export interface Witness {
  readonly kind: WitnessKind;
  /**
   * The title as it is written and as it is said.
   *
   * A pair and never a glyph alone, for the reason every named thing here has
   * one. Absent on the engine's own entry, which is not a book.
   */
  readonly name?: { readonly hanzi: string; readonly pinyin: string };
  /**
   * The author and title of a work published in Latin script.
   *
   * One manual on the shelf is written in English and its hanzi title is the
   * name of the art, which would tell a reader nothing about which book it
   * is. A proper name, carried as it is printed and never translated.
   */
  readonly latin?: string;
  /**
   * The year the witness is dated to, where the register states one.
   *
   * Absent rather than recalled: a date this file supplied from memory would
   * be the one thing in it nobody had read.
   */
  readonly year?: number;
}

export const WITNESSES = {
  /** A value this engine constructs and no text on the shelf lays. */
  engine: { kind: 'engine' },
  quanshu: {
    kind: 'transmitted',
    name: { hanzi: '紫微斗數全書', pinyin: 'zǐwēidǒushùquánshū' },
  },
  xieji: {
    kind: 'transmitted',
    name: { hanzi: '協紀辨方書', pinyin: 'xiéjìbiànfāngshū' },
  },
  jinjing: {
    kind: 'transmitted',
    name: { hanzi: '太乙金鏡式經', pinyin: 'tàiyǐjīnjìngshìjīng' },
  },
  /** 《張果星宗》, whose 算法 gives 紫氣 its rate. */
  xingzong: {
    kind: 'transmitted',
    name: { hanzi: '張果星宗', pinyin: 'zhāngguǒxīngzōng' },
  },
  /** 《星度指南》, whose one dated board anchors 紫氣 and shows which node is 羅睺. */
  xingduzhinan: {
    kind: 'transmitted',
    name: { hanzi: '星度指南', pinyin: 'xīngdùzhǐnán' },
  },
  /** 黃宗羲's 《授時曆故》, which carries the 授時 lodges at 至元辛巳. */
  shoushiligu: {
    kind: 'transmitted',
    name: { hanzi: '授時曆故', pinyin: 'shòushílìgù' },
  },
  /** 太乙's 《統宗》, a second work and not a second copy of the 金鏡. */
  taiyitongzong: {
    kind: 'transmitted',
    name: { hanzi: '太乙統宗寶鑑', pinyin: 'tàiyǐtǒngzōngbǎojiàn' },
  },
  /** 《太乙淘金歌》, known to this register through 盧央's study and not on the shelf. */
  taojin: {
    kind: 'transmitted',
    name: { hanzi: '太乙淘金歌', pinyin: 'tàiyǐtáojīngē' },
  },
  /** 《新鍥纂集紫微斗數捷覽》, the Ming print that works the 大限 from the 命宮. */
  jielan: {
    kind: 'transmitted',
    name: { hanzi: '紫微斗數捷覽', pinyin: 'zǐwēidǒushùjiélǎn' },
    year: 1581,
  },
  /** The sixth volume of 方外人's anthology: 闡微, 析論 and 特例命譜. */
  juexue6: {
    kind: 'modern',
    name: { hanzi: '中國絕學第六冊', pinyin: 'zhōngguójuéxuédìliùcè' },
    year: 1986,
  },
  /** 恭鑑老人's part of the anthology's seventh volume, on a title page of its own. */
  beipai: {
    kind: 'modern',
    name: { hanzi: '紫微斗數北派', pinyin: 'zǐwēidǒushùběipài' },
    year: 1986,
  },
  /** 《奇門遁甲統宗》, the line the turning plate and the lodging in 坤 descend in. */
  tongzong: {
    kind: 'transmitted',
    name: { hanzi: '奇門遁甲統宗', pinyin: 'qíméndùnjiǎtǒngzōng' },
  },
  /** 《御定奇門寶鑑》, the imperial print that stands the eight spirits in both dun. */
  baojian: {
    kind: 'transmitted',
    name: { hanzi: '御定奇門寶鑑', pinyin: 'yùdìngqíménbǎojiàn' },
  },
  /** 《奇門遁甲金鏡寶鑑》, which argues the leap month and reads the states from the star. */
  jinjingbaojian: {
    kind: 'transmitted',
    name: { hanzi: '奇門遁甲金鏡寶鑑', pinyin: 'qíméndùnjiǎjīnjìngbǎojiàn' },
  },
  /** 《金函玉鏡奇門遁甲秘笈全書》, whose 卷十八 enumerates the day family's gates and stars. */
  jinhan: {
    kind: 'transmitted',
    name: { hanzi: '金函玉鏡奇門遁甲秘笈全書', pinyin: 'jīnhányùjìngqíméndùnjiǎmìjíquánshū' },
  },
  /** 《日家奇門》, 鮮紅草's table of the sixty days in each half of the year. */
  rijiaqimen: {
    kind: 'modern',
    name: { hanzi: '日家奇門', pinyin: 'rìjiāqímén' },
    year: 1998,
  },
  /** 《遁甲演義》, which states the year, month and day families entire. */
  yanyi: {
    kind: 'transmitted',
    name: { hanzi: '遁甲演義', pinyin: 'dùnjiǎyǎnyì' },
  },
  /** 楊維德's 《遁甲符應經》, which works the lodging at 坤 in both dun and buries 丁 with 丙. */
  fuyingjing: {
    kind: 'transmitted',
    name: { hanzi: '遁甲符應經', pinyin: 'dùnjiǎfúyìngjīng' },
  },
  /**
   * 《御定奇門大全》, whose 卷五–十, headed 奇門秘纂, lay the eighteen 局 hour by
   * hour: the centre's stem carried off with 坤's, 白虎 and 玄武 in both dun.
   * Its 卷十一–十三, 遁甲通明鈐, state 置閏 with the block before the solstices
   * and work 淳祐六年 through it.
   */
  qimendaquan: {
    kind: 'transmitted',
    name: { hanzi: '御定奇門大全', pinyin: 'yùdìngqíméndàquán' },
  },
  /**
   * 《奇門秘訣》, 卷四十三–四十八 of 《御定奇門大全》 and a work of its own on the
   * 版心: a commentary on the 煙波釣叟歌 that seats the spirits from the earth
   * plate at a 己 to 癸 hour, where the compilation's hour tables do not.
   * Named apart from `qimendaquan` because the two hold opposite values of
   * one parameter.
   */
  qimenmijue: {
    kind: 'transmitted',
    name: { hanzi: '奇門秘訣', pinyin: 'qíménmìjué' },
  },
  /** 《奇門遁甲全局》, the circular plates that keep 白虎 at the fifth seat. */
  quanju: {
    kind: 'transmitted',
    name: { hanzi: '奇門遁甲全局', pinyin: 'qíméndùnjiǎquánjú' },
  },
  /** 甘國壁's manuscript, which sets the middle pair of spirits out by the dun. */
  zhezhong: {
    kind: 'transmitted',
    name: { hanzi: '奇門遁甲折衷', pinyin: 'qíméndùnjiǎzhézhōng' },
  },
  /** 張志春, who defines 拆補 by the term and the 符頭 at once. */
  shenqi: {
    kind: 'modern',
    name: { hanzi: '神奇之門', pinyin: 'shénqízhīmén' },
  },
  /** 劉文元, the first text on the shelf to state 茅山 complete. */
  qiwu: {
    kind: 'modern',
    name: { hanzi: '奇門啟悟', pinyin: 'qíménqǐwù' },
    year: 2008,
  },
  /** 唐頤, who states the same rule a year later and cites nobody for it. */
  tujie: {
    kind: 'modern',
    name: { hanzi: '圖解奇門遁甲大全', pinyin: 'tújiěqíméndùnjiǎdàquán' },
    year: 2009,
  },
  /** 萬民英's 《星學大成》, whose 起立命 lays the hour on the Sun's palace and counts to 卯. */
  xingxuedacheng: {
    kind: 'transmitted',
    name: { hanzi: '星學大成', pinyin: 'xīngxuédàchéng' },
    year: 1563,
  },
  /** 萬民英's 《三命通會》, whose 論大運 works the opening of the cycles by the 時辰. */
  santong: {
    kind: 'transmitted',
    name: { hanzi: '三命通會', pinyin: 'sānmìngtōnghuì' },
  },
  /** 吳俊民's modern 子平 treatise, which casts by true solar time and turns the day at midnight. */
  xinlun: {
    kind: 'modern',
    name: { hanzi: '命理新論', pinyin: 'mìnglǐxīnlùn' },
  },
  /** 《六壬大全》, whose verse turns the general at the 中氣 and seats the noble. */
  liurendaquan: {
    kind: 'transmitted',
    name: { hanzi: '六壬大全', pinyin: 'liùréndàquán' },
  },
  /** 毛志道's 《六壬經緯》, whose first 卷 lays the board a section a leaf. */
  jingwei: {
    kind: 'transmitted',
    name: { hanzi: '六壬經緯', pinyin: 'liùrénjīngwěi' },
  },
  /** 《御定六壬直指》, which seats the noble by two verses, one for day and one for night. */
  zhizhi: {
    kind: 'transmitted',
    name: { hanzi: '御定六壬直指', pinyin: 'yùdìngliùrénzhízhǐ' },
  },
  /** 曹福倞 and 張月明's compilation, which names the edition of every work it draws on. */
  jingjie: {
    kind: 'modern',
    name: { hanzi: '大六壬精解', pinyin: 'dàliùrénjīngjiě' },
    year: 1995,
  },
  /** The plain-numbered part of the anthology's seventh volume, headed 占驗派. */
  juexue7: {
    kind: 'modern',
    name: { hanzi: '中國絕學第七冊', pinyin: 'zhōngguójuéxuédìqīcè' },
    year: 1986,
  },
  /** A manual of declared 中州派 lineage, which prints its 四化 table whole. */
  han: { kind: 'modern', latin: 'Aloysius Han, Zi Wei Dou Shu', year: 2014 },
} as const satisfies Record<string, Witness>;

export type WitnessId = keyof typeof WITNESSES;

/**
 * Whose a value is, as far as the shelf has said.
 *
 * Three answers and not two, because «nobody has attributed this yet» and
 * «this is the engine's own» are different facts and a list that was merely
 * empty would say neither. A default laid by convention with no text named
 * for it is `unattributed`, and a surface says so.
 */
export type Holding =
  | { readonly state: 'held'; readonly by: readonly WitnessId[] }
  /**
   * Stated by texts that reject it, and held by none on the shelf.
   *
   * `docs/sources.md` admits such a reading where the reports are enough to
   * reconstruct it. It is a different fact from being held, and a board laid
   * on it says who reports the reading rather than who teaches it.
   */
  | { readonly state: 'reported'; readonly by: readonly WitnessId[] }
  | { readonly state: 'unattributed' };

/** Reads a value's holders off its declaration: a holder outranks a reporter. */
export function holdingOf(value: {
  readonly heldBy?: readonly WitnessId[];
  readonly reportedBy?: readonly WitnessId[];
}): Holding {
  if (value.heldBy !== undefined && value.heldBy.length > 0) {
    return { state: 'held', by: value.heldBy };
  }
  if (value.reportedBy !== undefined && value.reportedBy.length > 0) {
    return { state: 'reported', by: value.reportedBy };
  }
  return { state: 'unattributed' };
}
