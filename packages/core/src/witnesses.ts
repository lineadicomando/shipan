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
  | { readonly state: 'unattributed' };

/** Reads a value's holders off its declaration. */
export function holdingOf(value: { readonly heldBy?: readonly WitnessId[] }): Holding {
  return value.heldBy === undefined || value.heldBy.length === 0
    ? { state: 'unattributed' }
    : { state: 'held', by: value.heldBy };
}
