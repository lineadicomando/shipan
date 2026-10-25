import { BRANCHES } from './ganzhi.js';
import { lensNames, phaseTable, type Lens, type LensThing } from './lens.js';
import { QIZHENG_BODIES, type QizhengBoard } from './qizheng.js';

/**
 * What a reader may ask a 七政四餘 board to show them: the board's `Lens`.
 *
 * **Between bodies, and only between bodies.** The five planets carry the
 * phase their names say, and the four remainders the phase of the planet each
 * is the remainder of — 「紫炁為木之餘。月孛為水之餘。羅睺為火之餘。計都為土之餘」,
 * 《御定五星精義》's 四餘所屬 — so a lens shows the five relations between any
 * two of the nine. The same work reads its 論恩難仇用 between the bodies by
 * these relations and these phases, a remainder always beside its planet;
 * that table is what a test holds the lens to. Two rows in `docs/sources.tsv`.
 *
 * **太陽 and 太陰 have no phase.** They stand outside the five as 陰陽, and
 * the engine gives them none (`QizhengBody`); a lens keeps them by their kind.
 *
 * **The palaces of the ring have no phase here.** What the art reads between
 * a body and the palace it stands in is 歸垣 and 廟旺 — whose palace it is,
 * and how the body fares there — and not 生剋 between two phases; the same
 * work states the palaces' owners (十二宮所屬) and the homes (七政歸垣). A
 * lens that gave a palace its owner's phase and drew 生剋 to it would be
 * reading the board in a way the art does not, so it keeps the palaces by
 * their kind and relates them to nothing.
 *
 * A palace of the ring may hold several bodies, so the governors and the
 * remainders are `crowded` and a name is told apart by its body. The rows
 * under the ring are seats as well, one a body, and are kept by kind; a lens
 * relates the bodies where they stand on the ring.
 */

/** The layers of a 七政四餘 board, as the drawing marks them. */
export type QizhengLayer = 'palace' | 'governor' | 'remainder' | 'house' | 'lodge' | 'motion';

export const QIZHENG_LAYERS: readonly QizhengLayer[] = ['palace', 'governor', 'remainder', 'house', 'lodge', 'motion'];

/** The layers whose names have a phase: the bodies. */
export const QIZHENG_LENS_LAYERS: readonly QizhengLayer[] = ['governor', 'remainder'];

export type QizhengLens = Lens<QizhengLayer, never>;

const RING: readonly string[] = BRANCHES.map((branch) => branch.id);

/** What a lens may show on this board: the bodies with a phase, where they stand on the ring. */
export function qizhengLens(board: QizhengBoard): QizhengLens {
  const things: LensThing<QizhengLayer>[] = [];
  const add = (layer: QizhengLayer, placed: QizhengBoard['governors']): void => {
    for (const one of placed) {
      if (!one.body.element) continue;
      things.push({ seat: one.palace.id, layer, id: one.body.id, element: one.body.element });
    }
  };
  add('governor', board.governors);
  add('remainder', board.remainders);
  return {
    board: 'qizheng',
    seats: [...RING, ...QIZHENG_BODIES.map((body) => body.id)],
    pairSeats: RING,
    layers: QIZHENG_LAYERS,
    phased: QIZHENG_LENS_LAYERS,
    crowded: QIZHENG_LENS_LAYERS,
    things,
    phases: phaseTable(),
    linkIds: [],
    links: [],
    names: lensNames<never>({}),
  };
}
