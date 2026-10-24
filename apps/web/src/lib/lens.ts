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
  /**
   * The palaces pressed by their ground, one or two, by Luoshu number. Never
   * at the same time as a focus: a name pressed starts from the name, a
   * ground pressed starts a pair.
   */
  pair?: readonly number[];
  /**
   * The kinds of thing related: those a focus is related to, or those
   * compared between the two palaces of a pair. Nothing is related until
   * the reader keeps a kind here.
   */
  toward: readonly LensLayer[];
  /** Whether a focus shows the five relations of the phases. */
  shengke: boolean;
  /** Which of the other relations a focus shows. */
  links: readonly LinkId[];
  /**
   * Whether every control is offered at once. Without it the lens is laid one
   * way at a time — two palaces, one name, or one phase — with one kind or
   * one phase chosen at a time, and the circle of the five phases beside it.
   * It is in the fragment with the rest and kept nowhere else: a reader who
   * never switches leaves nothing behind.
   */
  expert: boolean;
}

/** The three ways a lens is laid when it is laid one at a time. */
export type Way = 'pair' | 'focus' | 'phase';
export const WAYS: readonly Way[] = ['pair', 'focus', 'phase'];

/** Which way the state is laid, where it says. */
export function wayOf(state: LensState): Way | undefined {
  if (state.pair) return 'pair';
  if (state.focus) return 'focus';
  if (state.phases.length > 0) return 'phase';
  return undefined;
}

/**
 * The same state, reduced to what is laid one way at a time: one kind, one
 * phase, and the five relations of the phases without the other two.
 */
export function oneAtATime(state: LensState): LensState {
  return {
    ...state,
    layers: [],
    phases: state.phases.slice(0, 1),
    toward: state.toward.slice(0, 1),
    shengke: true,
    links: [],
    expert: false,
  };
}

/** No lens: the whole board, alike. */
export const WHOLE: LensState = { layers: [], phases: [], toward: [], shengke: true, links: [], expert: false };

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
  /** The palaces of a pair, in Luoshu order, where a pair is being laid. */
  seats: readonly number[];
  links: readonly ShownLink[];
}

const INACTIVE: LensView = { active: false, lit: new Set(), seats: [], links: [] };

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
    return {
      active: true,
      lit: new Set([from, ...links.map((link) => link.to)]),
      focus: from,
      seats: [],
      links,
    };
  }

  if (state.pair && state.pair.length > 0) return pairView(lens, state);

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
  return { active: true, lit, seats: [], links: [] };
}

/**
 * Two palaces, and how what stands in one stands to what stands in the other.
 *
 * **Neither palace is the reader's.** The relations are drawn as a flow, from
 * the thing that generates or controls to the thing that is generated or
 * controlled, so one line says the relation both ways round; and the two are
 * held in Luoshu order, never in the order they were pressed. Which of two
 * palaces is the asker and which the matter is a reading, and the engine
 * names neither (`docs/refusals.md` § "Who is 主 and who is 客").
 *
 * **Only what the reader keeps is compared**: the kinds in `toward`, every
 * one of them in one palace against every one in the other, and nothing
 * until a kind is kept. 對宮 and 五合 are added where they are asked for and
 * hold. The same relations are tabulated by `pairTable` and said in words
 * under the board.
 */
function pairView(lens: QimenLens, state: LensState): LensView {
  const seats = [...new Set(state.pair)].sort((a, b) => a - b);
  // The two palaces whole until a kind is kept, and then what is compared.
  const kept: readonly string[] = state.toward.length > 0 ? state.toward : BOARD_LAYERS;
  const lit = new Set<SpotKey>();
  for (const seat of seats) for (const layer of kept) lit.add(keyOf(seat, layer));
  if (seats.length < 2) return { active: true, lit, seats, links: [] };

  const [a, b] = seats as [number, number];
  const at = (seat: number, layer: string) =>
    lens.things.find((thing) => thing.seat === seat && thing.layer === layer);
  const links: ShownLink[] = [];

  if (state.shengke) {
    for (const row of state.toward) {
      for (const column of state.toward) {
        const one = at(a, row);
        const other = at(b, column);
        if (one && other) {
          links.push(flow(keyOf(a, row), keyOf(b, column), lens.phases[one.element][other.element]));
        }
      }
    }
  }
  if (state.links.includes('duigong') && lens.facing[a] === b) {
    links.push({ from: keyOf(a, 'palace'), to: keyOf(b, 'palace'), relation: 'duigong' });
  }
  if (state.links.includes('wuhe')) {
    const stems = (['heaven', 'earth'] as const).filter((layer) => state.toward.includes(layer));
    for (const mine of stems) {
      for (const theirs of stems) {
        const one = at(a, mine);
        const other = at(b, theirs);
        if (one && other && lens.wuhe[one.id as keyof QimenLens['wuhe']] === other.id) {
          links.push({ from: keyOf(a, mine), to: keyOf(b, theirs), relation: 'wuhe' });
        }
      }
    }
  }
  return { active: true, lit, seats, links };
}

/**
 * A relation between two things written as a flow: from the one that acts to
 * the one acted on. 生我 and 剋我 are the same two relations seen from the
 * other end, so they are turned round rather than drawn as a second kind.
 */
function flow(from: SpotKey, to: SpotKey, relation: RelationId): ShownLink {
  if (relation === 'shengwo') return { from: to, to: from, relation: 'wosheng' };
  if (relation === 'kewo') return { from: to, to: from, relation: 'woke' };
  return { from, to, relation };
}

/** One cell of the table between two palaces. */
export interface PairCell {
  /** The layer of the thing in the row's palace, and of the column's. */
  row: LensLayer;
  column: LensLayer;
  /** Which way the relation runs: from the row to the column, the other way, or neither. */
  way: 'out' | 'in' | 'none';
  /** The relation, named as the flow: 我生 or 我剋 where it runs, 比和 where it does not. */
  relation: RelationId;
}

/**
 * Every kind kept in the lower-numbered palace against every kind kept in the
 * other, as a flow. Rows are the first palace's, in the order of
 * `PHASE_LAYERS`; a layer a palace has nothing on — the centre's gate — has
 * no row or column.
 */
export function pairTable(lens: QimenLens, seats: readonly number[], kept: readonly LensLayer[]): PairCell[] {
  if (seats.length < 2) return [];
  const [a, b] = [...seats].sort((x, y) => x - y) as [number, number];
  const layers = PHASE_LAYERS.filter((layer) => kept.includes(layer));
  const cells: PairCell[] = [];
  for (const row of layers) {
    const one = lens.things.find((thing) => thing.seat === a && thing.layer === row);
    if (!one) continue;
    for (const column of layers) {
      const other = lens.things.find((thing) => thing.seat === b && thing.layer === column);
      if (!other) continue;
      const relation = lens.phases[one.element][other.element];
      if (relation === 'shengwo') cells.push({ row, column, way: 'in', relation: 'wosheng' });
      else if (relation === 'kewo') cells.push({ row, column, way: 'in', relation: 'woke' });
      else cells.push({ row, column, way: direction(relation), relation });
    }
  }
  return cells;
}

/**
 * Pressing the ground of a palace: the first starts a pair, the second
 * completes it, and pressing a palace already in the pair lets go of it. A
 * third palace starts a new pair. A focus is let go of: a name and a pair
 * are two different questions put to the board.
 */
export function pressedSeat(state: LensState, seat: number): LensState {
  const pair = state.pair ?? [];
  let next: number[];
  if (pair.includes(seat)) next = pair.filter((other) => other !== seat);
  else if (pair.length >= 2) next = [seat];
  else next = [...pair, seat];
  // A pair begins with nothing compared: what is, is the reader's to keep.
  const toward = state.pair ? state.toward : [];
  return { ...state, focus: undefined, toward, pair: next.length > 0 ? next : undefined };
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
  if (state.expert) parts.push('expert=1');
  if (state.layers.length > 0) parts.push(`layers=${state.layers.join(',')}`);
  if (state.phases.length > 0) parts.push(`phases=${state.phases.join(',')}`);
  if (state.focus) {
    parts.push(`focus=${state.focus.layer}.${state.focus.id}`);
    parts.push(`toward=${state.toward.join(',')}`);
    if (!state.shengke) parts.push('shengke=0');
    if (state.links.length > 0) parts.push(`links=${state.links.join(',')}`);
  } else if (state.pair && state.pair.length > 0) {
    parts.push(`pair=${state.pair.join(',')}`);
    if (state.toward.length > 0) parts.push(`toward=${state.toward.join(',')}`);
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
    expert: fields.get('expert') === '1',
  };
  const [layer, id] = (fields.get('focus') ?? '').split('.');
  if (layer && id && (PHASE_LAYERS as readonly string[]).includes(layer) && /^[a-z0-9]+$/.test(id)) {
    state.focus = { layer: layer as LensLayer, id };
  } else {
    const pair = [...new Set((fields.get('pair') ?? '').split(',').map(Number))]
      .filter((seat) => Number.isInteger(seat) && seat >= 1 && seat <= 9)
      .slice(0, 2);
    if (pair.length > 0) state.pair = pair;
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
  return { ...state, focus: thing, toward, pair: undefined };
}
