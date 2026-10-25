import { RELATION_IDS, relationName, relationOf, type RelationId } from './dunjia/relation.js';
import { ELEMENT_HANZI, ELEMENT_PINYIN, type Element } from './types.js';

/**
 * What a reader may ask a board to show them, handed over as data: the shape
 * every board's lens takes.
 *
 * A lens is the reader's: they pick a thing on the board, or a kind of thing,
 * and the page recedes the rest and shows the relations of what they picked
 * (`docs/refusals.md` § "Where to look first"). Nothing here decides that. A
 * `Lens` states, for one board, **every relation a lens may show**, so the
 * page that draws one looks a relation up and works none out — the client
 * imports only types from `core`, and a relation worked out in the browser
 * would be doctrine without a register.
 *
 * Every board fills the same descriptor, and only the board knows how:
 *
 * - **its seats**, named in its own terms and in the board's order — a Qi Men
 *   palace by its Luoshu number, a seat of a ring by a branch identifier —
 *   the same names the drawing marks its seats with (`data-seat`), and among
 *   them the ones a pair may be laid on. A seat's name is unique on its board
 *   whatever kind of seat it is; a board whose kinds of seat shared a name
 *   would have to tell them apart here first;
 * - **its layers**, as the drawing marks them, and among them the ones whose
 *   things have a phase;
 * - **every thing with a phase**, by seat, layer and identifier;
 * - **the five relations of the phases** for every pair of phases, which are
 *   the same on every board;
 * - **the board's own relations**, each a named link between two seats or
 *   between two things, listed once per pair.
 *
 * Nothing here orders them, and nothing picks one: the tables are whole, the
 * same size whichever thing a reader starts from. Each relation a board lists
 * is a quantity, with its row in `docs/sources.tsv` before it is listed.
 */

/** A name said: hanzi and its reading. */
export interface LensName {
  hanzi: string;
  /** Said aloud, e.g. `duìgōng`. */
  pinyin: string;
}

/** Where a name is on the board: its seat and its layer, as the marks say. */
export interface LensSpot<Layer extends string = string> {
  /** The seat in the board's own terms, as `data-seat` names it. */
  seat: string;
  layer: Layer;
  /** What stands there, where the layer is one a seat holds several names in (`crowded`). */
  id?: string;
}

/** One thing on the board with a phase, addressed as the drawing marks it. */
export interface LensThing<Layer extends string = string> extends LensSpot<Layer> {
  /** What stands there: a stem, star, gate, palace, branch, body identifier. */
  id: string;
  element: Element;
}

/**
 * A relation of the board's own, between two seats or two things.
 *
 * - `seats`: the relation holds between the two seats themselves — 對宮 — and
 *   `a` and `b` are the names standing for each seat, where it is drawn to.
 *   A name pressed anywhere in one seat reaches the other.
 * - `things`: it holds between those two names only — 五合.
 *
 * Listed once per pair, in either order: a link has no direction.
 */
export interface LensLink<Layer extends string = string, Link extends string = string> {
  relation: Link;
  between: 'seats' | 'things';
  a: LensSpot<Layer>;
  b: LensSpot<Layer>;
}

export interface Lens<Layer extends string = string, Link extends string = string> {
  /** The board, as the drawing names itself (`data-board`). */
  board: string;
  /** Every seat a name stands in, in the board's order: the order a pair is held in. */
  seats: readonly string[];
  /**
   * The seats a pair may be laid on, by pressing their ground: on 奇門 all
   * nine palaces, on 六壬 the twelve of the ring and not the lessons or the
   * transmissions, which are rows read off it.
   */
  pairSeats: readonly string[];
  /** Every layer the drawing marks, in the order the board is read. */
  layers: readonly Layer[];
  /** The layers whose things have a phase, and can stand in a relation. */
  phased: readonly Layer[];
  /**
   * The layers a seat may hold several names in — the governors in one
   * palace of a 七政四餘 ring — where a name is told apart by its identifier
   * as well as its seat and layer. Empty on a board with one name to a layer
   * in every seat.
   */
  crowded: readonly Layer[];
  /** Every thing on the board that has a phase, seat by seat. */
  things: LensThing<Layer>[];
  /**
   * How one phase stands to another, named from the first: `phases.jin.mu`
   * is 我剋, metal controlling wood. Twenty-five cells, the whole of the
   * five relations, so that any two things on the board are one lookup.
   */
  phases: Record<Element, Record<Element, RelationId>>;
  /** The board's own relations, in the order a surface offers them. */
  linkIds: readonly Link[];
  /** Every pair those relations hold between on this board. */
  links: LensLink<Layer, Link>[];
  /**
   * The names a lens says its relations and phases by. Carried here because
   * a page holding the lens imports no values from the engine, and a name is
   * never the page's to write.
   */
  names: {
    relations: Record<RelationId | Link, LensName>;
    elements: Record<Element, LensName>;
  };
}

const ELEMENTS: readonly Element[] = ['mu', 'huo', 'tu', 'jin', 'shui'];

/** The five relations, laid out once for every pair of phases. */
export function phaseTable(): Record<Element, Record<Element, RelationId>> {
  const table = {} as Record<Element, Record<Element, RelationId>>;
  for (const mine of ELEMENTS) {
    table[mine] = {} as Record<Element, RelationId>;
    for (const other of ELEMENTS) table[mine][other] = relationOf(mine, other).id;
  }
  return table;
}

/** Every relation a board's lens can show, and every phase, by hanzi and reading. */
export function lensNames<Link extends string>(links: Record<Link, LensName>): Lens<string, Link>['names'] {
  const relations = {} as Record<RelationId | Link, LensName>;
  for (const id of RELATION_IDS) relations[id] = relationName(id);
  for (const id of Object.keys(links) as Link[]) relations[id] = { hanzi: links[id].hanzi, pinyin: links[id].pinyin };
  const elements = {} as Record<Element, LensName>;
  for (const element of ELEMENTS) {
    elements[element] = { hanzi: ELEMENT_HANZI[element], pinyin: ELEMENT_PINYIN[element] };
  }
  return { relations, elements };
}
