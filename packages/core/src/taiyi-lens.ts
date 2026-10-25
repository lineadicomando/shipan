import { lensNames, phaseTable, type Lens, type LensThing } from './lens.js';
import type { TaiyiBoard, TaiyiGod } from './taiyi.js';

/**
 * What a reader may ask a 太乙 board to show them: the board's `Lens`.
 *
 * **Between the sixteen gods of the rim, by the phase of each seat.** 卷六
 * gives the phase for thirteen of the sixteen and the other three follow
 * (`TaiyiGod.element`, and its row in `docs/sources.tsv`); and in the same
 * passage it reads the five relations between them — 「假今髙叢木，以吕申、大炅
 * 同類為旺；以大義、地主為相；武徳、太蔟為死；和徳、大武、太陽、天道為囚；大神、
 * 大威為休」, each god named by how its phase stands to 高叢's. That sentence is
 * what a test holds the lens to.
 *
 * **What stands in the palaces has no phase here.** 太乙 and the four
 * generals are roles and carry none — the register holds no phase for a role
 * — and the palaces are numbered one seat off the 洛書, a numbering a lens
 * has no reason to lean on. They are kept by their kind and related to
 * nothing, and no pair is laid on this board: each seat of the rim holds one
 * god, so a pair would say again what a god pressed says.
 *
 * A seat of the rim is named as the drawing names it, by its branch or its
 * corner trigram; the four corners share their names with four palaces, and
 * the layers of the two kinds of seat do not meet, so a seat and a layer still
 * name one place.
 */

/** The layers of a 太乙 board, as the drawing marks them. */
export type TaiyiLayer = 'eye' | 'number' | 'taiyi' | 'general' | 'seat' | 'god';

export const TAIYI_LAYERS: readonly TaiyiLayer[] = ['eye', 'number', 'taiyi', 'general', 'seat', 'god'];

/** The one layer whose names have a phase: the sixteen gods. */
export const TAIYI_LENS_LAYERS: readonly TaiyiLayer[] = ['god'];

export type TaiyiLens = Lens<TaiyiLayer, never>;

/** The seat of the rim a god stands on, as the drawing names it. */
export const rimSeatOf = (god: TaiyiGod): string => (god.seat.kind === 'branch' ? god.seat.branch.id : god.seat.palace.id);

/** What a lens may show on this board: the sixteen gods, and the five relations. */
export function taiyiLens(board: TaiyiBoard): TaiyiLens {
  const things: LensThing<TaiyiLayer>[] = board.gods.map((god) => ({
    seat: rimSeatOf(god),
    layer: 'god',
    id: god.id,
    element: god.element,
  }));
  const palaces = ['qian', 'li', 'gen', 'zhen', 'zhong', 'dui', 'kun', 'kan', 'xun'];
  const rim = things.map((thing) => thing.seat);
  return {
    board: 'taiyi',
    // The palaces too, so a kind kept lights what stands in them; four of
    // their names are four corners of the rim as well, and listed once.
    seats: [...rim, ...palaces.filter((palace) => !rim.includes(palace))],
    pairSeats: [],
    layers: TAIYI_LAYERS,
    phased: TAIYI_LENS_LAYERS,
    crowded: [],
    things,
    phases: phaseTable(),
    linkIds: [],
    links: [],
    names: lensNames<never>({}),
  };
}
