import { STEMS, type StemId } from '../ganzhi.js';
import type { Element } from '../types.js';
import type { QimenChart } from './index.js';
import { palace } from './palaces.js';
import { opposite } from './patterns.js';
import { RELATION_IDS, relationOf, type RelationId } from './relation.js';

/**
 * What a reader may ask a 奇門 board to show them, handed over as data.
 *
 * A lens is the reader's: they pick a thing on the board, or a kind of thing,
 * and the page recedes the rest and shows the relations of what they picked
 * (`docs/refusals.md` § "Where to look first"). This module decides none of
 * that. It states, for one chart, **every relation a lens may show**, so the
 * page that draws one looks a relation up and works none out — the client
 * imports only types from `core`, and a relation worked out in the browser
 * would be doctrine without a register.
 *
 * Three relations, each with its row in `docs/sources.tsv`:
 *
 * - **the five relations of the phases** between any two things that have a
 *   phase: the same `relationOf` that gives 門宮 and 星宮, read here between
 *   a thing and something in another palace as well as its own;
 * - **對宮**, the palace facing another across the board, which is the palace
 *   反吟 is read on (`opposite`);
 * - **五合** between stems, 甲己 · 乙庚 · 丙辛 · 丁壬 · 戊癸.
 *
 * Nothing here orders them, and nothing picks one: the table is whole, the
 * same size whichever thing a reader starts from.
 */

/**
 * The layers of a 奇門 board whose things have a phase, named as the drawing
 * marks them. The eight spirits are not among them: the engine carries no
 * phase for a spirit, and a lens that gave one would be asserting a table
 * nobody has registered — the drawing leaves them uncoloured for the same
 * reason.
 */
export type LensLayer = 'palace' | 'earth' | 'heaven' | 'star' | 'gate';

export const LENS_LAYERS: readonly LensLayer[] = ['heaven', 'earth', 'palace', 'star', 'gate'];

/** One thing on the board with a phase, addressed as the drawing marks it. */
export interface LensThing {
  /** The Luoshu number of the palace it stands in. */
  seat: number;
  layer: LensLayer;
  /** What stands there: a stem, star, gate or palace identifier. */
  id: string;
  element: Element;
}

/** A relation between two things that is not one of the five of the phases. */
export type LinkId = 'duigong' | 'wuhe';

export interface LinkName {
  id: LinkId;
  hanzi: string;
  /** The relation said aloud, e.g. `duìgōng`. */
  pinyin: string;
}

export const LINKS: Record<LinkId, LinkName> = {
  duigong: { id: 'duigong', hanzi: '對宮', pinyin: 'duìgōng' },
  wuhe: { id: 'wuhe', hanzi: '五合', pinyin: 'wǔhé' },
};

export interface QimenLens {
  /** Every thing on the board that has a phase, palace by palace. */
  things: LensThing[];
  /**
   * How one phase stands to another, named from the first: `phases.jin.mu`
   * is 我剋, metal controlling wood. Twenty-five cells, the whole of the
   * five relations, so that any two things on the board are one lookup.
   */
  phases: Record<Element, Record<Element, RelationId>>;
  /** The palace each faces across the board. The centre faces none. */
  facing: Record<number, number>;
  /** The 五合 partner of each stem. */
  wuhe: Record<StemId, StemId>;
}

const ELEMENTS: readonly Element[] = ['mu', 'huo', 'tu', 'jin', 'shui'];

/** The five relations, laid out once for every pair of phases. */
function phaseTable(): Record<Element, Record<Element, RelationId>> {
  const table = {} as Record<Element, Record<Element, RelationId>>;
  for (const mine of ELEMENTS) {
    table[mine] = {} as Record<Element, RelationId>;
    for (const other of ELEMENTS) table[mine][other] = relationOf(mine, other).id;
  }
  return table;
}

/** The palace facing each of the eight around the centre. */
function facingTable(): Record<number, number> {
  const table: Record<number, number> = {};
  for (let number = 1; number <= 9; number++) {
    const across = opposite(number);
    if (across !== undefined) table[number] = across;
  }
  return table;
}

/**
 * The 五合 partner of each stem: the stem five places on, 甲 with 己, 乙 with
 * 庚. The same pairing `almanac.ts` reads the 德合 by, where the 四德 confirm
 * it cell by cell.
 */
function wuheTable(): Record<StemId, StemId> {
  const table = {} as Record<StemId, StemId>;
  for (const stem of STEMS) table[stem.id] = (STEMS[(stem.index + 5) % 10] as (typeof STEMS)[number]).id;
  return table;
}

/** What a lens may show on this chart: its things, and the three tables. */
export function qimenLens(chart: QimenChart): QimenLens {
  const things: LensThing[] = [];
  for (const contents of chart.palaces) {
    const seat = contents.palace.number;
    const add = (layer: LensLayer, thing: { id: string; element: Element } | undefined): void => {
      if (thing) things.push({ seat, layer, id: thing.id, element: thing.element });
    };
    add('heaven', contents.heaven);
    add('earth', contents.earth);
    add('palace', contents.palace);
    // A star and a gate take the phase of the palace they belong to at rest,
    // as they do for 門宮, 星宮 and the strength.
    add('star', { id: contents.star.id, element: palace(contents.star.home).element });
    if (contents.gate) add('gate', { id: contents.gate.id, element: palace(contents.gate.home).element });
  }
  return { things, phases: phaseTable(), facing: facingTable(), wuhe: wuheTable() };
}

/** Every relation a lens may name, for a surface that has to offer them all. */
export const LENS_RELATION_IDS: readonly (RelationId | LinkId)[] = [
  ...RELATION_IDS,
  ...(Object.keys(LINKS) as LinkId[]),
];
