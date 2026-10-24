/**
 * A lens on a board: what the reader asked to see, and what that leaves lit.
 *
 * **The reader picks, and this module only carries the pick out.** A board
 * opens whole and alike; a lens is switched on by somebody — a kind of thing
 * kept, a phase kept, a name pressed — and what it does is recede the rest.
 * Within what is kept everything stands alike, with no order among it. See
 * `docs/refusals.md` § "Where to look first", which is the rule this is.
 *
 * **Every relation is looked up, none is worked out.** The engine hands the
 * page a `QimenLens` beside the chart: every thing with a phase, the five
 * relations for every pair of phases, the facing palaces and the 五合. This
 * reads those tables and computes nothing a source would have to stand
 * behind; the client imports only types from `core`.
 *
 * **Where the reader looked is theirs.** The state lives in the page and in
 * the address's fragment, which no request carries: it never reaches the
 * server, a prompt, or the address the board is shared at.
 */
import type { Element, LensLayer, LinkId, QimenLens, RelationId } from '@shipan/core';

/** The layers of a 奇門 board the drawing marks, spirits included. */
export const BOARD_LAYERS = ['heaven', 'earth', 'palace', 'spirit', 'star', 'gate'] as const;
export type BoardLayer = (typeof BOARD_LAYERS)[number];

/** The layers whose things have a phase, and can stand in a relation. */
export const PHASE_LAYERS: readonly LensLayer[] = ['heaven', 'earth', 'palace', 'star', 'gate'];

export const ELEMENTS: readonly Element[] = ['mu', 'huo', 'tu', 'jin', 'shui'];
export const LINK_IDS: readonly LinkId[] = ['duigong', 'wuhe'];

/** How the relations of a focus are drawn over the board. */
export type Drawing = 'arrows' | 'marks';
export const DRAWINGS: readonly Drawing[] = ['arrows', 'marks'];

/**
 * A thing the reader started from, named by what it is and not where it
 * stands: stepped to the next hour, 丙 on the heaven plate is still 丙 on the
 * heaven plate, wherever the turn has carried it.
 */
export interface Focus {
  layer: LensLayer;
  id: string;
}

export interface LensState {
  /** The kinds of thing kept. Empty keeps every kind. */
  layers: readonly BoardLayer[];
  /** The phases kept. Empty keeps every phase. */
  phases: readonly Element[];
  /** What the reader started from, if they pressed something. */
  focus?: Focus;
  /** The kinds of thing a focus is related to. */
  toward: readonly LensLayer[];
  /** Whether a focus shows the five relations of the phases. */
  shengke: boolean;
  /** Which of the other relations a focus shows. */
  links: readonly LinkId[];
}

/** No lens: the whole board, alike. */
export const WHOLE: LensState = { layers: [], phases: [], toward: [], shengke: true, links: [] };

/** Where a thing is on the drawing: the seat and the layer, as the marks say. */
export type SpotKey = `${number}:${string}`;
export const keyOf = (seat: number, layer: string): SpotKey => `${seat}:${layer}`;

export type ShownRelation = RelationId | LinkId;

/** One relation drawn, always from the focus to the thing it names. */
export interface ShownLink {
  from: SpotKey;
  to: SpotKey;
  relation: ShownRelation;
}

/** What a lens leaves on the board. */
export interface LensView {
  /** Whether anything is receded at all. With no lens, nothing is. */
  active: boolean;
  /** The things kept. Everything else on the board recedes. */
  lit: ReadonlySet<SpotKey>;
  /** The focus, where there is one on this board. */
  focus?: SpotKey;
  links: readonly ShownLink[];
}

const INACTIVE: LensView = { active: false, lit: new Set(), links: [] };

/**
 * Whether a relation is read from the focus outwards: the focus generates or
 * controls the other. The converse two run inwards, and the three left have
 * no direction.
 */
export function direction(relation: ShownRelation): 'out' | 'in' | 'none' {
  if (relation === 'wosheng' || relation === 'woke') return 'out';
  if (relation === 'shengwo' || relation === 'kewo') return 'in';
  return 'none';
}

/** The things a focus is, on this board: none if it is not on it. */
function find(lens: QimenLens, focus: Focus | undefined) {
  if (!focus) return undefined;
  return lens.things.find((thing) => thing.layer === focus.layer && thing.id === focus.id);
}

/** What the lens leaves lit, and which relations it draws. */
export function viewOf(lens: QimenLens | undefined, state: LensState): LensView {
  if (!lens) return INACTIVE;

  const start = find(lens, state.focus);
  if (start) {
    const from = keyOf(start.seat, start.layer);
    const links: ShownLink[] = [];
    const kept = (element: Element): boolean => state.phases.length === 0 || state.phases.includes(element);

    if (state.shengke) {
      for (const thing of lens.things) {
        if (thing === start || !state.toward.includes(thing.layer) || !kept(thing.element)) continue;
        links.push({
          from,
          to: keyOf(thing.seat, thing.layer),
          relation: lens.phases[start.element][thing.element],
        });
      }
    }
    if (state.links.includes('duigong')) {
      const across = lens.facing[start.seat];
      if (across !== undefined) links.push({ from, to: keyOf(across, 'palace'), relation: 'duigong' });
    }
    if (state.links.includes('wuhe') && (start.layer === 'heaven' || start.layer === 'earth')) {
      const partner = lens.wuhe[start.id as keyof QimenLens['wuhe']];
      for (const thing of lens.things) {
        if ((thing.layer === 'heaven' || thing.layer === 'earth') && thing.id === partner) {
          links.push({ from, to: keyOf(thing.seat, thing.layer), relation: 'wuhe' });
        }
      }
    }
    return { active: true, lit: new Set([from, ...links.map((link) => link.to)]), focus: from, links };
  }

  if (state.layers.length === 0 && state.phases.length === 0) return INACTIVE;

  // A filter by kind, by phase, or both. A thing with no phase — a spirit —
  // is kept by its kind alone and never by a phase.
  const element = new Map(lens.things.map((thing) => [keyOf(thing.seat, thing.layer), thing.element]));
  const lit = new Set<SpotKey>();
  for (let seat = 1; seat <= 9; seat++) {
    for (const layer of BOARD_LAYERS) {
      if (state.layers.length > 0 && !state.layers.includes(layer)) continue;
      const key = keyOf(seat, layer);
      if (state.phases.length > 0) {
        const phase = element.get(key);
        if (!phase || !state.phases.includes(phase)) continue;
      }
      lit.add(key);
    }
  }
  return { active: true, lit, links: [] };
}

/**
 * The state written into the address's fragment, and read back from it.
 *
 * A fragment and not the query: the query is what the board is a function of,
 * and a lens is not — two readers looking at one board in two ways are
 * looking at one board. A fragment is also never sent with a request.
 * Anything it holds that is not a known value is dropped rather than guessed.
 */
export function writeLens(state: LensState): string {
  const parts: string[] = [];
  if (state.layers.length > 0) parts.push(`layers=${state.layers.join(',')}`);
  if (state.phases.length > 0) parts.push(`phases=${state.phases.join(',')}`);
  if (state.focus) {
    parts.push(`focus=${state.focus.layer}.${state.focus.id}`);
    parts.push(`toward=${state.toward.join(',')}`);
    if (!state.shengke) parts.push('shengke=0');
    if (state.links.length > 0) parts.push(`links=${state.links.join(',')}`);
  }
  return parts.join('&');
}

export function readLens(fragment: string): LensState {
  const fields = new URLSearchParams(fragment.replace(/^#/, ''));
  const list = <T extends string>(name: string, allowed: readonly T[]): T[] =>
    (fields.get(name) ?? '')
      .split(',')
      .filter((value): value is T => (allowed as readonly string[]).includes(value));

  const state: LensState = {
    layers: list('layers', BOARD_LAYERS),
    phases: list('phases', ELEMENTS),
    toward: list('toward', PHASE_LAYERS),
    shengke: fields.get('shengke') !== '0',
    links: list('links', LINK_IDS),
  };
  const [layer, id] = (fields.get('focus') ?? '').split('.');
  if (layer && id && (PHASE_LAYERS as readonly string[]).includes(layer) && /^[a-z0-9]+$/.test(id)) {
    state.focus = { layer: layer as LensLayer, id };
  }
  return state;
}

/**
 * Pressing a thing on the board: it becomes the focus, and pressing it again
 * puts the lens away. The kinds it is related to start as its own kind — the
 * gates against the gates — and are the reader's to widen; nothing else is
 * chosen for them.
 */
export function pressed(state: LensState, thing: Focus): LensState {
  if (state.focus?.layer === thing.layer && state.focus.id === thing.id) {
    return { ...state, focus: undefined };
  }
  const toward = state.focus ? state.toward : [thing.layer];
  return { ...state, focus: thing, toward };
}
