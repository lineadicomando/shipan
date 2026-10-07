import { WITNESSES, combinationOf, type Witness, type WitnessId } from '@shipan/core';
import type { LaidBy, LaidWitness } from '$lib/laid';

/**
 * Who lays the combination, for an answer.
 *
 * Every endpoint that lays a board carries this beside it and never inside:
 * the board is a function of its options and says what they were, and this is
 * a statement about the shelf, which moves when a text is read and must not
 * move a saved board with it.
 *
 * `null` for a board with no parameter of its own, so the field is always
 * there to be read.
 */
export function laidBy(board: string, options: object): LaidBy | null {
  const combination = combinationOf(board, options);
  if (combination === undefined) return null;

  const written = (ids: readonly WitnessId[]): LaidWitness[] =>
    ids.map((id) => ({ id, ...(WITNESSES[id] as Witness) }));

  switch (combination.state) {
    case 'together':
      return { state: 'together', by: written(combination.by) };
    case 'apart':
      return { state: 'apart', by: [] };
    case 'unattributed':
      return {
        state: 'unattributed',
        attributed: combination.attributed,
        by: written(combination.together),
      };
  }
}
