import { BRANCHES } from './ganzhi.js';
import { lensNames, phaseTable, type Lens, type LensLink, type LensThing } from './lens.js';
import { QIZHENG_BODIES, type GovernorId, type QizhengBoard } from './qizheng.js';
import type { Element } from './types.js';

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
 * **太陽 has no phase, and 太陰 takes water's in a lens alone.** The two
 * stand outside the five as 陰陽 and the engine gives them none
 * (`QizhengBody`), which the drawing's ink follows. But the same 論恩難仇用
 * reads the Moon with water's four relations — 「月以金為恩。以水孛為次恩。以土
 * 計為難。以火羅為仇。以木炁為用」 — so a lens relates it as water, on that one
 * row and on the user's word, with its own row in the register. The Sun's row
 * fits no phase, and a lens keeps it by its kind.
 *
 * **歸垣, whose palace a governor is at home in**, is the one relation of the
 * art's own a lens draws here: 七政歸垣 — 「木躔寅亥二宮。火躔卯戌二宮。金躔辰酉
 * 二宮。水躔巳申二宮。土躔子丑二宮。日躔午宮。月躔未宮」 — a link from each
 * governor with a phase to the palace or palaces it is at home in, wherever it
 * stands. The 十二宮所屬 on the same page gives the palaces the same owners,
 * which is the check. The remainders have no 垣; the Sun has one and, having
 * no phase, cannot be started from.
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

/** The relation of the art's own a lens draws on this board. */
export type QizhengLinkId = 'guiyuan';

export type QizhengLens = Lens<QizhengLayer, QizhengLinkId>;

/**
 * The phase a lens gives the Moon, which the engine's body does not carry:
 * water, as 論恩難仇用 reads it. The Sun gets none.
 */
export const MOON_LENS_PHASE: Element = 'shui';

/** 七政歸垣: the palaces, by branch, each governor is at home in. */
export const GUIYUAN: Readonly<Record<GovernorId, readonly string[]>> = {
  muxing: ['yin', 'hai'],
  huoxing: ['mao', 'xu'],
  jinxing: ['chen', 'you'],
  shuixing: ['si', 'shen'],
  tuxing: ['zi', 'chou'],
  taiyang: ['wu'],
  taiyin: ['wei'],
};

const RING: readonly string[] = BRANCHES.map((branch) => branch.id);

/** What a lens may show on this board: the bodies with a phase, where they stand on the ring. */
export function qizhengLens(board: QizhengBoard): QizhengLens {
  const things: LensThing<QizhengLayer>[] = [];
  const add = (layer: QizhengLayer, placed: QizhengBoard['governors']): void => {
    for (const one of placed) {
      const element = one.body.element ?? (one.body.id === 'taiyin' ? MOON_LENS_PHASE : undefined);
      if (!element) continue;
      things.push({ seat: one.palace.id, layer, id: one.body.id, element });
    }
  };
  add('governor', board.governors);
  add('remainder', board.remainders);

  // 歸垣: from each governor a lens can start from to its home palaces.
  const links: LensLink<QizhengLayer, QizhengLinkId>[] = [];
  for (const thing of things) {
    if (thing.layer !== 'governor') continue;
    for (const home of GUIYUAN[thing.id as GovernorId] ?? []) {
      links.push({
        relation: 'guiyuan',
        between: 'things',
        a: { seat: thing.seat, layer: 'governor', id: thing.id },
        b: { seat: home, layer: 'palace' },
      });
    }
  }
  return {
    board: 'qizheng',
    seats: [...RING, ...QIZHENG_BODIES.map((body) => body.id)],
    pairSeats: RING,
    layers: QIZHENG_LAYERS,
    phased: QIZHENG_LENS_LAYERS,
    crowded: QIZHENG_LENS_LAYERS,
    things,
    phases: phaseTable(),
    linkIds: ['guiyuan'],
    links,
    names: lensNames<QizhengLinkId>({ guiyuan: { hanzi: '歸垣', pinyin: 'guīyuán' } }),
  };
}
