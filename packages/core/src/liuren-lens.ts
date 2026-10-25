import { BRANCHES } from './ganzhi.js';
import { lensNames, phaseTable, type Lens, type LensThing } from './lens.js';
import type { LiurenBoard } from './liuren.js';

/**
 * What a reader may ask a 六壬 board to show them: the board's `Lens`.
 *
 * **The relation the art is made of.** The four lessons and the three
 * transmissions are found by 生剋 between a branch and what it stands on, so
 * a lens here shows the same five relations the board was drawn by, between
 * any two names that have a phase: the branches of the two plates, the
 * branch over and the ground under each lesson — the first lesson's ground is
 * the day stem — and the branch of each transmission with the stem covering
 * it. One row in `docs/sources.tsv`.
 *
 * **The twelve generals have no phase registered** (`docs/notes.md`, the
 * rung «—»), and the drawing leaves them uncoloured for that reason. A lens
 * keeps them by their kind and relates them to nothing until a text giving
 * their phases is read and registered.
 *
 * **No relation of the board's own yet.** 六沖 and 六合 between branches are
 * the art's, and neither has a row in the register: a lens draws a relation
 * after its row and not before.
 *
 * Three kinds of seat, as the drawing marks them, and no two share a name:
 * the twelve palaces of the ring by their branch, the lessons by number, the
 * transmissions by position. A pair is laid on two palaces of the ring.
 */

/** The layers of a 六壬 board, as the drawing marks them. */
export type LiurenLayer = 'general' | 'heaven' | 'earth' | 'upper' | 'lower' | 'branch' | 'stem';

export const LIUREN_LAYERS: readonly LiurenLayer[] = ['general', 'heaven', 'earth', 'upper', 'lower', 'branch', 'stem'];

/** Every layer but the generals', which have no phase. */
export const LIUREN_LENS_LAYERS: readonly LiurenLayer[] = ['heaven', 'earth', 'upper', 'lower', 'branch', 'stem'];

export type LiurenLens = Lens<LiurenLayer, never>;

const RING: readonly string[] = BRANCHES.map((branch) => branch.id);

/** What a lens may show on this board: every name with a phase, and the five relations. */
export function liurenLens(board: LiurenBoard): LiurenLens {
  const things: LensThing<LiurenLayer>[] = [];
  BRANCHES.forEach((ground, index) => {
    const over = board.heaven[index];
    if (over) things.push({ seat: ground.id, layer: 'heaven', id: over.id, element: over.element });
    things.push({ seat: ground.id, layer: 'earth', id: ground.id, element: ground.element });
  });
  for (const course of board.courses) {
    const seat = String(course.number);
    things.push({ seat, layer: 'upper', id: course.upper.id, element: course.upper.element });
    things.push({ seat, layer: 'lower', id: course.lower.id, element: course.lower.element });
  }
  for (const transmission of board.transmissions) {
    const seat = transmission.position;
    things.push({ seat, layer: 'branch', id: transmission.branch.id, element: transmission.branch.element });
    if (transmission.hiddenStem) {
      things.push({ seat, layer: 'stem', id: transmission.hiddenStem.id, element: transmission.hiddenStem.element });
    }
  }
  return {
    board: 'liuren',
    seats: [...RING, '1', '2', '3', '4', 'chu', 'zhong', 'mo'],
    pairSeats: RING,
    layers: LIUREN_LAYERS,
    phased: LIUREN_LENS_LAYERS,
    crowded: [],
    things,
    phases: phaseTable(),
    linkIds: [],
    links: [],
    names: lensNames<never>({}),
  };
}
