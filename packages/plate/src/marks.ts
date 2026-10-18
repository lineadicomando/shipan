import { escape } from './fit.js';

/**
 * What a drawing marks, so that a surface holding it can tell what is where.
 *
 * A drawing says which kind of thing a name is by where the name stands and in
 * no other way, and a surface that wants to say it in words — or to answer a
 * pointer resting on the name — cannot read a position back out of the ink.
 * So every board marks what it draws, in one vocabulary:
 *
 * - `data-board` on the `<svg>`, naming the board;
 * - `data-unit` and `data-seat` on the group holding one seat — a palace, a
 *   lesson, a row — saying what kind of seat it is and which one;
 * - `data-layer` and `data-id` on the group holding one name, saying which
 *   layer of the board the name belongs to and what stands there.
 *
 * A seat is named in the board's own terms and in no other. A Qi Men palace is
 * its Luoshu number; a board whose palaces are numbered otherwise names them
 * by an identifier rather than lend a number a reader would take for the
 * Luoshu's. That is why the unit travels beside the seat: one identifier can
 * name two kinds of seat on one board.
 *
 * What the marks are *for* is not this package's business: a drawing carries
 * no behaviour, and a renderer that knows nothing of them ignores them, so the
 * PNG and what the MCP server hands over are the same drawing. Hanzi and
 * pinyin never go into a mark — identifiers only.
 */

/** Every board that marks what it draws, by the name it is marked with. */
export type MarkedBoard = keyof typeof LAYERS;

/**
 * The layers of each board, in the order the board is read.
 *
 * The one list of them: a surface that says a layer in words reads it from
 * here, and a test holds every layer a drawing emits to a word in each
 * catalog.
 */
export const LAYERS = {
  qimen: ['heaven', 'earth', 'palace', 'spirit', 'star', 'gate'],
  liuren: ['general', 'heaven', 'earth', 'upper', 'lower', 'branch', 'stem'],
} as const;

/** The kinds of seat each board marks. */
export const UNITS = {
  qimen: ['palace'],
  liuren: ['palace', 'course', 'transmission'],
} as const satisfies Record<MarkedBoard, readonly string[]>;

export type BoardLayer<B extends MarkedBoard> = (typeof LAYERS)[B][number];
export type BoardUnit<B extends MarkedBoard> = (typeof UNITS)[B][number];

/** The marking functions of one board, typed to its layers and units. */
export interface Marks<B extends MarkedBoard> {
  /** The attribute naming the board, for the `<svg>` element. */
  readonly board: string;
  /**
   * A name marked with its layer and the identifier of what stands there. An
   * empty register stays unmarked, since there is nothing in it to point at.
   */
  tagged(layer: BoardLayer<B>, thing: { readonly id: string } | undefined, body: string): string;
  /** A seat's whole group, marked with its kind and its identifier. */
  seated(unit: BoardUnit<B>, seat: string | number, parts: readonly string[]): string;
}

export function marks<B extends MarkedBoard>(board: B): Marks<B> {
  return {
    board: `data-board="${board}"`,
    tagged(layer, thing, body) {
      if (!thing || !body) return body;
      return `<g data-layer="${layer}" data-id="${escape(thing.id)}">\n${body}\n</g>`;
    },
    seated(unit, seat, parts) {
      return `<g data-unit="${unit}" data-seat="${escape(String(seat))}">\n${parts.filter(Boolean).join('\n')}\n</g>`;
    },
  };
}
