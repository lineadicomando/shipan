/**
 * What a pointer — or a finger, or the focus — is resting on in a drawn board.
 *
 * The drawing marks what it draws and does nothing with the marks: each
 * palace is a group carrying `data-palace`, and each name in it a group
 * carrying `data-layer` and `data-id` (see `tagged` in `@shipan/plate`). This
 * reads them back off whatever an event landed on, and is the one place that
 * knows their names. What is done with the answer is the caller's: saying
 * which layer a name belongs to is the first use, not the only one.
 *
 * Read from the event's composed path rather than from `target`, because the
 * board is held in a shadow root and a listener outside it is handed the host.
 */

/** A spot on the board, as specific as the event allowed. */
export interface BoardSpot {
  /** The Luoshu number of the palace, where the spot is inside one. */
  readonly palace?: number;
  /** Which layer the name belongs to — `gate`, `star`, … — where it is on a name. */
  readonly layer?: string;
  /** The identifier of what stands there, beside `layer`. */
  readonly id?: string;
  /** The group carrying the most specific mark, for placing anything beside it. */
  readonly element: Element;
}

export function spotOf(event: Event): BoardSpot | undefined {
  let palace: number | undefined;
  let layer: string | undefined;
  let id: string | undefined;
  let element: Element | undefined;

  for (const node of event.composedPath()) {
    if (!(node instanceof Element)) continue;
    if (node.tagName.toLowerCase() === 'svg') break;

    const named = node.getAttribute('data-layer');
    if (named && layer === undefined) {
      layer = named;
      id = node.getAttribute('data-id') ?? undefined;
      element ??= node;
    }
    const number = node.getAttribute('data-palace');
    if (number && palace === undefined) {
      palace = Number(number);
      element ??= node;
    }
  }

  return element ? { palace, layer, id, element } : undefined;
}

/** Whether two spots are the same, so a move inside one name is not news. */
export function sameSpot(a: BoardSpot | undefined, b: BoardSpot | undefined): boolean {
  return a?.element === b?.element;
}

/**
 * The six registers of a palace on an hour board, by the names `data-layer`
 * carries, in the order the board is read: down the left, then down the right.
 *
 * `label.register.*` says each in words. A day board marks three of them.
 */
export const REGISTERS = ['heaven', 'earth', 'palace', 'spirit', 'star', 'gate'] as const;

export type Register = (typeof REGISTERS)[number];

/** Whether a mark read off the drawing is one of the six, and can be said. */
export function isRegister(layer: string | undefined): layer is Register {
  return (REGISTERS as readonly string[]).includes(layer ?? '');
}
