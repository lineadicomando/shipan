/**
 * What a pointer — or a finger, or the focus — is resting on in a drawn board.
 *
 * The drawing marks what it draws and does nothing with the marks (see
 * `marks.ts` in `@shipan/plate`): the `<svg>` carries `data-board`, each seat
 * a group carrying `data-unit` and `data-seat`, and each name in it a group
 * carrying `data-layer` and `data-id`. This reads them back off whatever an
 * event landed on, and is the one place in the site that knows their names.
 * What is done with the answer is the caller's: saying which layer a name
 * belongs to is the first use, not the only one.
 *
 * Read from the event's composed path rather than from `target`, because the
 * board is held in a shadow root and a listener outside it is handed the host.
 */
import { LAYERS, type MarkedBoard } from '@shipan/plate';
import type { MessageKey, Translator } from '@shipan/i18n';

/** A spot on the board, as specific as the event allowed. */
export interface BoardSpot {
  /** Which board the spot is on, as the drawing names itself. */
  readonly board?: string;
  /** What kind of seat the spot is inside — `palace`, `course`, … — where it is inside one. */
  readonly unit?: string;
  /**
   * Which seat, in the board's own terms: a Qi Men palace by its Luoshu
   * number, a seat named by a branch by the branch's identifier. Never read
   * as a number by anybody but the board it belongs to.
   */
  readonly seat?: string;
  /** Which layer the name belongs to — `gate`, `star`, … — where it is on a name. */
  readonly layer?: string;
  /** The identifier of what stands there, beside `layer`. */
  readonly id?: string;
  /** The group carrying the most specific mark, for placing anything beside it. */
  readonly element: Element;
}

export function spotOf(event: Event): BoardSpot | undefined {
  let board: string | undefined;
  let unit: string | undefined;
  let seat: string | undefined;
  let layer: string | undefined;
  let id: string | undefined;
  let element: Element | undefined;

  for (const node of event.composedPath()) {
    if (!(node instanceof Element)) continue;
    if (node.tagName.toLowerCase() === 'svg') {
      board = node.getAttribute('data-board') ?? undefined;
      break;
    }

    const named = node.getAttribute('data-layer');
    if (named && layer === undefined) {
      layer = named;
      id = node.getAttribute('data-id') ?? undefined;
      element ??= node;
    }
    const kind = node.getAttribute('data-unit');
    if (kind && unit === undefined) {
      unit = kind;
      seat = node.getAttribute('data-seat') ?? undefined;
      element ??= node;
    }
  }

  return element ? { board, unit, seat, layer, id, element } : undefined;
}

/** Whether two spots are the same, so a move inside one name is not news. */
export function sameSpot(a: BoardSpot | undefined, b: BoardSpot | undefined): boolean {
  return a?.element === b?.element;
}

/** Whether a board read off a drawing is one that marks its layers. */
function isMarkedBoard(board: string | undefined): board is MarkedBoard {
  return board !== undefined && Object.hasOwn(LAYERS, board);
}

/** Whether a mark read off the drawing is one of its board's layers, and can be said. */
export function isLayer(board: MarkedBoard, layer: string | undefined): boolean {
  return (LAYERS[board] as readonly string[]).includes(layer ?? '');
}

/** The key saying a layer of a board in words: `label.register.<board>.<layer>`. */
export function layerKey(board: MarkedBoard, layer: string): MessageKey {
  return `label.register.${board}.${layer}` as MessageKey;
}

/**
 * Which layer a name on the board is, in words, for saying over it when a
 * pointer rests there. The drawing says it by position alone, and a reader
 * new to the board has no way to read a position as a kind.
 *
 * Nothing where the spot is on no name, or on one this site has no word for.
 */
export function sayLayer(spot: BoardSpot, t: Translator): string | undefined {
  const { board, layer } = spot;
  if (!isMarkedBoard(board) || !layer || !isLayer(board, layer)) return undefined;
  return t(layerKey(board, layer));
}
