import { BRANCHES } from '../ganzhi.js';
import { lensNames, phaseTable, type Lens, type LensLink, type LensThing } from '../lens.js';
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
 * **The art's own relations between palaces: 三方 and 對宮, which together
 * are the 三方四正.** Read on the Ming 南陽堂 woodblock of the 全書: 卷五 譚星
 * 要論 names the 三方 of the life palace — 「三看遷移財帛官祿三方星辰」 — and a
 * facing pair, 「以福德對財帛宮也」; 卷三's worked case under 安流祿流羊流陀訣
 * puts a 小限 in 亥 and calls 卯, 未 and 巳 「三方四正」, the triad of 亥 and the
 * palace facing it. So `sanfang` links each palace to the two of its branch's
 * triad (三合, four apart), and `duigong` to the palace six away. Each is a
 * link between palaces, drawn between their names, and neither says how a
 * star stands to another across it: the 全書 reads phases between a star and
 * the palace it sits in, and no passage read reads them across palaces.
 *
 * A palace holds many stars, so the two layers of stars are `crowded` and a
 * name is told apart by its star. A pair is laid on two palaces.
 */

/** The layers of a 紫微斗數 board, as the drawing marks them. */
export type ZiweiLayer = 'rings' | 'star' | 'minor' | 'ground' | 'house';

export const ZIWEI_LAYERS: readonly ZiweiLayer[] = ['rings', 'star', 'minor', 'ground', 'house'];

/** The layers whose names may have a phase: the fourteen and the rest of the stars. */
export const ZIWEI_LENS_LAYERS: readonly ZiweiLayer[] = ['star', 'minor'];

/** The relations between palaces the art reads across. */
export type ZiweiLinkId = 'sanfang' | 'duigong';

export type ZiweiLens = Lens<ZiweiLayer, ZiweiLinkId>;

/** 三方 and 對宮 between the twelve palaces, each pair once, drawn between the palaces' names. */
function palaceLinks(): LensLink<ZiweiLayer, ZiweiLinkId>[] {
  const links: LensLink<ZiweiLayer, ZiweiLinkId>[] = [];
  const at = (index: number) => ({ seat: RING[index % 12] as string, layer: 'house' as const });
  for (let index = 0; index < 12; index++) {
    // The triad: four branches on, each pair once.
    links.push({ relation: 'sanfang', between: 'seats', a: at(index), b: at(index + 4) });
  }
  for (let index = 0; index < 6; index++) {
    links.push({ relation: 'duigong', between: 'seats', a: at(index), b: at(index + 6) });
  }
  return links;
}

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
    linkIds: ['sanfang', 'duigong'],
    links: palaceLinks(),
    names: lensNames<ZiweiLinkId>({
      sanfang: { hanzi: '三方', pinyin: 'sānfāng' },
      duigong: { hanzi: '對宮', pinyin: 'duìgōng' },
    }),
  };
}
