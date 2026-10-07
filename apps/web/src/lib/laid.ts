import type { MessageKey, Translator } from '@shipan/i18n';

/**
 * Who lays the combination a board stands on, as an answer carries it.
 *
 * The engine's `combinationOf` with its witnesses written out, because the
 * page imports only types from `core` and cannot look a title up: what crosses
 * is the fact and the names, and the sentence is made here from the same
 * catalog keys the transcript uses, so a page and a transcript of one board
 * cannot say two things.
 *
 * `docs/parameters.md` § "A declared default is not a hidden school".
 */
export interface LaidBy {
  /**
   * `together` where one text holds every value in force, `apart` where each
   * has a text and none holds them all, `unattributed` where a value is a
   * convention with no text named for it yet.
   */
  state: 'together' | 'apart' | 'unattributed';
  /** Under `unattributed`: whether any of the other values has a text. */
  attributed?: boolean;
  /** The texts that hold the whole, or under `unattributed` all the others. */
  by: readonly LaidWitness[];
}

export interface LaidWitness {
  id: string;
  kind: 'transmitted' | 'modern' | 'engine';
  name?: { hanzi: string; pinyin: string };
  latin?: string;
  year?: number;
}

function sayWitness(witness: LaidWitness, t: Translator): string {
  const title =
    witness.name !== undefined
      ? `${witness.name.hanzi} ${witness.name.pinyin}`
      : (witness.latin ?? t('label.witness.engine'));
  return witness.year === undefined ? title : `${title} (${witness.year})`;
}

/** The sentence under the schools followed, word for word the transcript's. */
export function sayLaidBy(laid: LaidBy, t: Translator): string {
  const witnesses = laid.by.map((witness) => sayWitness(witness, t)).join(t('cli.combination.and'));
  const key: MessageKey =
    laid.state === 'together'
      ? 'cli.combination.together'
      : laid.state === 'apart'
        ? 'cli.combination.apart'
        : laid.by.length > 0
          ? 'cli.combination.unattributedBeside'
          : laid.attributed
            ? 'cli.combination.unattributedApart'
            : 'cli.combination.unattributed';
  return t(key, { witnesses });
}
