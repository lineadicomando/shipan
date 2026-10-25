/**
 * A lens held by a section: the state, the fragment it lives in, and what a
 * press on the board, on the page or on Escape does to it.
 *
 * Every section that lays a board with a lens holds one of these, so the
 * wiring is written once: the board answers through `pick` and `tip`, the
 * column beside it through `LensSide`, what is read under it through
 * `LensReading`, and the page through `pressedOutside` and `escaped` on its
 * window. Which board it is on is the descriptor's business (`Lens` in
 * `core`) and the section's, which says a name in words (`nameAt`) and a seat
 * (`seatName`).
 *
 * Nothing is on when the page opens. The lens is kept across a step of the
 * moment — a focus is a thing and follows it to wherever the turn carries it
 * — and written into the address's fragment, which no request carries, so a
 * link can be sent with it and the server never learns of it.
 *
 * Constructed while a component is being set up, since it holds effects.
 */
import { replaceState } from '$app/navigation';
import { page } from '$app/state';
import { untrack } from 'svelte';
import type { Lens } from '@shipan/core';
import type { MessageKey, Translator } from '@shipan/i18n';
import { sayLayer, type BoardSpot } from './board';
import { glyph } from './glyph';
import {
  WHOLE,
  inPair,
  keyOf,
  pressed,
  pressedInPair,
  pressedSeat,
  readLens,
  spotOfKey,
  viewOf,
  wayOf,
  writeLens,
  type LensState,
  type LensView,
  type Way,
} from './lens';

export interface HeldLensOptions {
  /** The board's lens, where the answer carried one. */
  lens: () => Lens | undefined;
  t: () => Translator;
  /** A name on the board in words — its gloss, its hanzi and its reading — from where the drawing marks it. */
  nameAt: (seat: string, layer: string) => string | undefined;
  /** A seat in words, as a pair is said: on 奇門, its number and its palace. */
  seatName: (seat: string) => string;
}

/**
 * A press on the page's own ground puts the lens away — and only there. Not
 * in the bar the moment is stepped from, since a lens is kept across a step;
 * not in the column of controls, nor in what is read off the board, where a
 * press selects text; not on anything that does something of its own. The
 * board answers for itself through `pick`.
 */
const KEEP =
  '.screen, .bench > .side, .panel, .reading, header, footer, a, button, input, select, textarea, label, summary, [role="dialog"]';

export class HeldLens {
  state = $state<LensState>(WHOLE);
  /** The way the reader chose to lay the lens, where one was chosen. */
  way = $state<Way | undefined>();

  readonly #options: HeldLensOptions;
  readonly view: LensView;
  /** Whether a lens is laid at all, so there is something to put away. */
  readonly laid: boolean;
  /** The pressed name in words, where one is pressed and on this board. */
  readonly focusName: string | undefined;
  /** The seats of a pair in words, where one or two are pressed. */
  readonly pairSaid: string | undefined;

  constructor(options: HeldLensOptions) {
    this.#options = options;
    this.view = $derived(viewOf(options.lens(), this.state));
    this.laid = $derived(
      Boolean(this.state.focus || this.state.pair || this.state.layers.length > 0 || this.state.phases.length > 0),
    );
    this.focusName = $derived.by(() => {
      if (!this.view.focus) return undefined;
      const { seat, layer } = spotOfKey(this.view.focus);
      return options.nameAt(seat, layer);
    });
    this.pairSaid = $derived.by(() => {
      const seats = this.view.seats;
      const t = options.t();
      if (seats.length === 1) return t('lens.pairOne', { a: options.seatName(seats[0] as string) });
      if (seats.length === 2) {
        return t('lens.pair', { a: options.seatName(seats[0] as string), b: options.seatName(seats[1] as string) });
      }
      return undefined;
    });
    /**
     * The fragment and the state follow each other. An address arriving with
     * a fragment of its own — a link pasted over this page, a step back — is
     * read; a change made here is written. Each side compares before it
     * moves, and the reading side does not watch the state, so neither undoes
     * the other.
     */
    let read = $state(false);
    $effect(() => {
      const hash = page.url.hash.replace(/^#/, '');
      if (hash !== untrack(() => writeLens(this.state))) {
        this.state = readLens(hash, untrack(() => this.#options.lens()));
        this.way = wayOf(this.state) ?? untrack(() => this.way);
      }
      read = true;
    });
    $effect(() => {
      const fragment = writeLens(this.state);
      if (!read || fragment === untrack(() => page.url.hash.replace(/^#/, ''))) return;
      replaceState(`${page.url.pathname}${page.url.search}${fragment ? `#${fragment}` : ''}`, page.state);
    });
  }

  get lens(): Lens | undefined {
    return this.#options.lens();
  }

  /** The state as the fragment carries it, for an address that keeps it across a step. */
  get fragment(): string {
    return writeLens(this.state);
  }

  nameAt = (seat: string, layer: string): string | undefined => this.#options.nameAt(seat, layer);

  /**
   * Pressing a name with a phase starts from it, and pressing it again lets
   * go. Pressing the ground of a seat, where no name is, lays it in a pair.
   */
  pick = (spot: BoardSpot | undefined): void => {
    const lens = this.lens;
    if (!lens) return;
    // Outside the seats — on the frame, the compass, the branches — a press
    // puts the lens away.
    if (!spot?.unit) {
      this.putAway();
      return;
    }
    const seat = spot.seat !== undefined && lens.seats.includes(spot.seat) ? spot.seat : undefined;
    // Inside the two seats of a pair, a name is pressed to be compared and
    // the ground lets the seat go — in either mode.
    if (seat && inPair(this.state, seat)) {
      this.state = spot.layer ? pressedInPair(lens, this.state, seat, spot.layer) : pressedSeat(this.state, seat);
      return;
    }
    // Laid one way at a time, a press does what that way does: in a pair, a
    // press anywhere in a seat is the seat; with a phase, nothing.
    const guided = !this.state.extended ? this.way : undefined;
    if (guided === 'phase') return;
    if (guided === 'pair' || (!spot.layer && seat)) {
      if (guided === 'focus' || !seat) return;
      this.state = pressedSeat(this.state, seat);
      this.way = 'pair';
      return;
    }
    if (!spot.layer || !spot.id) return;
    if (!lens.phased.includes(spot.layer)) return;
    this.state = pressed(this.state, { layer: spot.layer, id: spot.id });
    this.way = 'focus';
  };

  /** The whole board again, in the mode the reader was in. */
  putAway = (): void => {
    if (!this.laid) return;
    this.state = { ...WHOLE, extended: this.state.extended };
    this.way = undefined;
  };

  pressedOutside = (event: MouseEvent): void => {
    if (!this.laid) return;
    const kept = event.composedPath().some((node) => node instanceof Element && node.matches(KEEP));
    if (!kept) this.putAway();
  };

  /** Escape puts the lens away, unless it is being typed into something. */
  escaped = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || !this.laid) return;
    const target = event.target;
    if (target instanceof Element && target.closest('input, select, textarea, [role="dialog"]')) return;
    this.putAway();
  };

  /** Over a name a relation is drawn to, the relation; over any other, its layer. */
  tip = (spot: BoardSpot): string | undefined => {
    const t = this.#options.t();
    const view = this.view;
    const lens = this.lens;
    if (lens && view.seats.length === 2 && spot.seat && spot.layer) {
      const key = keyOf(spot.seat, spot.layer);
      const name = (at: typeof key) => {
        const { seat, layer } = spotOfKey(at);
        return this.#options.nameAt(seat, layer) ?? '';
      };
      const said = view.links
        .filter((link) => link.to === key || link.from === key)
        .map((link) =>
          link.relation === 'wosheng' || link.relation === 'woke' || link.relation === 'bihe'
            ? t(`lens.flow.${link.relation}.said` as MessageKey, { from: name(link.from), to: name(link.to) })
            : `${t(`label.relation.${link.relation}` as MessageKey)} ${glyph(lens.names.relations[link.relation] as { hanzi: string; pinyin: string })}`,
        );
      if (said.length > 0) return said.join(' · ');
    }
    const focusName = this.focusName;
    if (view.focus && focusName && spot.seat && spot.layer) {
      const key = keyOf(spot.seat, spot.layer);
      const said = view.links
        .filter((link) => link.to === key)
        .map((link) => t(`lens.relation.${link.relation}` as MessageKey, { thing: focusName }));
      if (said.length > 0) return said.join(' · ');
    }
    return sayLayer(spot, t);
  };
}
