import { BRANCHES } from '../ganzhi.js';
import { lensNames, phaseTable, type Lens, type LensThing } from '../lens.js';
import type { ZiweiBoard } from './index.js';

/**
 * What a reader may ask a 紫微斗數 board to show them: the board's `Lens`.
 *
 * **Between stars, by the phases the board is inked by.** 卷二 gives a phase
 * to every star it places bar thirteen (`ZiweiStar.elements`, and its row in
 * `docs/sources.tsv`), so a lens shows the five relations between any two
 * stars that have one. **Three stars have two** — 天同屬水金, 貪狼屬水木,
 * 七殺屬火金 — and the book means both: a relation needs one phase at each
 * end, so a lens keeps them by their kind rather than pick one, which is the
 * same thing the drawing does when it inks a star in one colour. The thirteen
 * the book passes over are kept by kind too.
 *
 * **The palaces have no phase here.** What the art reads between a star and
 * its palace is the grade (廟旺利陷), which the board already carries, and
 * not 生剋 between two phases; a lens relates the stars and nothing else.
 *
 * **No relation of the board's own yet.** 對宮 and 三方四正 are what the art
 * reads across — 「分對宮之體用，定三合之源流」 — and the passages that say so
 * are located in a transcription and not read on the plate. A lens draws a
 * relation after its row and not before.
 *
 * A palace holds many stars, so the two layers of stars are `crowded` and a
 * name is told apart by its star. A pair is laid on two palaces.
 */

/** The layers of a 紫微斗數 board, as the drawing marks them. */
export type ZiweiLayer = 'rings' | 'star' | 'minor' | 'ground' | 'house';

export const ZIWEI_LAYERS: readonly ZiweiLayer[] = ['rings', 'star', 'minor', 'ground', 'house'];

/** The layers whose names may have a phase: the fourteen and the rest of the stars. */
export const ZIWEI_LENS_LAYERS: readonly ZiweiLayer[] = ['star', 'minor'];

export type ZiweiLens = Lens<ZiweiLayer, never>;

const RING: readonly string[] = BRANCHES.map((branch) => branch.id);

/** What a lens may show on this board: every star with one phase, where it stands. */
export function ziweiLens(board: ZiweiBoard): ZiweiLens {
  const things: LensThing<ZiweiLayer>[] = [];
  for (const palace of board.palaces) {
    for (const { star } of palace.stars) {
      const [element, ...more] = star.elements;
      if (!element || more.length > 0) continue;
      things.push({
        seat: palace.branch.id,
        layer: star.starClass === 'main' ? 'star' : 'minor',
        id: star.id,
        element,
      });
    }
  }
  return {
    board: 'ziwei',
    seats: RING,
    pairSeats: RING,
    layers: ZIWEI_LAYERS,
    phased: ZIWEI_LENS_LAYERS,
    crowded: ZIWEI_LENS_LAYERS,
    things,
    phases: phaseTable(),
    linkIds: [],
    links: [],
    names: lensNames<never>({}),
  };
}
