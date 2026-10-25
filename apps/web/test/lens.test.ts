import { describe, expect, it } from 'vitest';
import type { Lens, QimenLens } from '@shipan/core';
import { WHOLE, activePhases, inPair, keyOf, oneAtATime, pairTable, pressedInPair, wayOf, pressed, pressedSeat, readLens, viewOf, writeLens, type LensState } from '../src/lib/lens';

/**
 * A lens is the reader's: these hold that it does nothing until somebody
 * asks, keeps everything it was asked for alike, and puts what it was asked
 * into a fragment that no request carries. See `docs/refusals.md` § "Where
 * to look first".
 *
 * The lens below is written out by hand rather than cast, so that the page's
 * logic is tested apart from the engine's: two palaces, five things, and the
 * tables the engine would hand over for them.
 */
const LENS: QimenLens = {
  board: 'qimen',
  seats: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  pairSeats: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  layers: ['heaven', 'earth', 'palace', 'spirit', 'star', 'gate'],
  phased: ['heaven', 'earth', 'palace', 'star', 'gate'],
  crowded: [],
  things: [
    { seat: '1', layer: 'heaven', id: 'bing', element: 'huo' },
    { seat: '1', layer: 'palace', id: 'kan', element: 'shui' },
    { seat: '1', layer: 'gate', id: 'kaimen', element: 'jin' },
    { seat: '9', layer: 'heaven', id: 'xin', element: 'jin' },
    { seat: '9', layer: 'palace', id: 'li', element: 'huo' },
  ],
  phases: {
    mu: { mu: 'bihe', huo: 'wosheng', tu: 'woke', jin: 'kewo', shui: 'shengwo' },
    huo: { mu: 'shengwo', huo: 'bihe', tu: 'wosheng', jin: 'woke', shui: 'kewo' },
    tu: { mu: 'kewo', huo: 'shengwo', tu: 'bihe', jin: 'wosheng', shui: 'woke' },
    jin: { mu: 'woke', huo: 'kewo', tu: 'shengwo', jin: 'bihe', shui: 'wosheng' },
    shui: { mu: 'wosheng', huo: 'woke', tu: 'kewo', jin: 'shengwo', shui: 'bihe' },
  },
  linkIds: ['duigong', 'wuhe'],
  links: [
    ...(
      [
        ['1', '9'],
        ['2', '8'],
        ['3', '7'],
        ['4', '6'],
      ] as const
    ).map(([a, b]) => ({
      relation: 'duigong' as const,
      between: 'seats' as const,
      a: { seat: a, layer: 'palace' as const },
      b: { seat: b, layer: 'palace' as const },
    })),
    { relation: 'wuhe', between: 'things', a: { seat: '1', layer: 'heaven' }, b: { seat: '9', layer: 'heaven' } },
  ],
  names: { relations: {} as QimenLens['names']['relations'], elements: {} as QimenLens['names']['elements'] },
};

describe('a lens on a 奇門 board', () => {
  it('does nothing until the reader asks', () => {
    // The board opens whole and alike: no state the page opens in sets
    // anything apart.
    const view = viewOf(LENS, WHOLE);
    expect(view.active).toBe(false);
    expect(view.lit.size).toBe(0);
    expect(view.links).toEqual([]);
    expect(viewOf(LENS, readLens(''))).toEqual(view);
  });

  it('keeps a kind of thing whole, on every palace', () => {
    const view = viewOf(LENS, { ...WHOLE, layers: ['heaven'] });
    expect(view.active).toBe(true);
    expect([...view.lit].sort()).toEqual(
      Array.from({ length: 9 }, (_, index) => keyOf(String(index + 1), 'heaven')).sort(),
    );
  });

  it('keeps a phase by what has one, and a spirit never', () => {
    const view = viewOf(LENS, { ...WHOLE, phases: ['jin'] });
    expect([...view.lit].sort()).toEqual([keyOf('1', 'gate'), keyOf('9', 'heaven')].sort());
    const spirits = viewOf(LENS, { ...WHOLE, layers: ['spirit'], phases: ['jin'] });
    expect(spirits.lit.size).toBe(0);
  });

  it('relates a pressed name to every thing of the kinds asked, by lookup and with no order', () => {
    const state = pressed(WHOLE, { layer: 'heaven', id: 'bing' });
    // Its own kind first, and only that: the rest are the reader's to add.
    expect(state.toward).toEqual(['heaven']);
    const view = viewOf(LENS, { ...state, toward: ['heaven', 'palace', 'gate'] });
    expect(view.focus).toBe(keyOf('1', 'heaven'));
    expect(view.links).toEqual([
      { from: '1:heaven', to: '1:palace', relation: 'kewo' },
      { from: '1:heaven', to: '1:gate', relation: 'woke' },
      { from: '1:heaven', to: '9:heaven', relation: 'woke' },
      { from: '1:heaven', to: '9:palace', relation: 'bihe' },
    ]);
    expect(view.lit).toEqual(new Set(['1:heaven', '1:palace', '1:gate', '9:heaven', '9:palace']));
  });

  it('draws 對宮 to the facing palace and 五合 to the partner stem, and only when asked', () => {
    const state: LensState = { ...pressed(WHOLE, { layer: 'heaven', id: 'bing' }), shengke: false };
    expect(viewOf(LENS, state).links).toEqual([]);
    const view = viewOf(LENS, { ...state, links: ['duigong', 'wuhe'] });
    expect(view.links).toEqual([
      { from: '1:heaven', to: '9:palace', relation: 'duigong' },
      { from: '1:heaven', to: '9:heaven', relation: 'wuhe' },
    ]);
  });

  it('lets go of a name pressed twice, and of one that is not on the board', () => {
    const once = pressed(WHOLE, { layer: 'gate', id: 'kaimen' });
    expect(pressed(once, { layer: 'gate', id: 'kaimen' }).focus).toBeUndefined();
    expect(viewOf(LENS, { ...once, focus: { layer: 'gate', id: 'xiumen' } }).active).toBe(false);
  });

  it('writes the lens into a fragment and reads back only what it knows', () => {
    const state: LensState = {
      layers: [],
      phases: ['huo'],
      focus: { layer: 'heaven', id: 'bing' },
      toward: ['heaven', 'gate'],
      shengke: false,
      links: ['wuhe'],
      extended: true,
    };
    const fragment = writeLens(state);
    expect(fragment).toBe('extended=1&phases=huo&focus=heaven.bing&toward=heaven,gate&shengke=0&links=wuhe');
    expect(readLens(`#${fragment}`, LENS)).toEqual(state);
    expect(writeLens(WHOLE)).toBe('');
    // What is not a known value is dropped, never guessed at.
    expect(readLens('#layers=heaven,nonsense&focus=spirit.zhifu&links=chong', LENS)).toEqual({
      ...WHOLE,
      layers: ['heaven'],
    });
  });

  it('keeps a fragment whole when the board it arrived on has no lens to read it against', () => {
    // A link to an hour's lens opened on a day board: nothing on it is known,
    // and nothing is dropped, so the lens is still there a step later.
    const fragment = 'pair=3,6&chosen=3:heaven,6:gate&links=duigong';
    expect(writeLens(readLens(`#${fragment}`))).toBe(fragment);
    expect(readLens('#pair=3,6&chosen=3:Heaven;drop').chosen).toBeUndefined();
  });

  it("lays a pair by the ground of two palaces, and neither is the reader's", () => {
    const one = pressedSeat(WHOLE, '9');
    expect(viewOf(LENS, one).seats).toEqual(['9']);
    expect(viewOf(LENS, one).links).toEqual([]);

    // Pressed nine first and one second: held in Luoshu order all the same.
    // Nothing is compared until a name is pressed inside each palace.
    const both = pressedSeat(one, '1');
    expect(viewOf(LENS, both).seats).toEqual(['1', '9']);
    expect(viewOf(LENS, both).links).toEqual([]);
    expect(viewOf(LENS, both).lit.has('1:spirit')).toBe(true);
    expect(inPair(both, '9')).toBe(true);
    expect(inPair(both, '4')).toBe(false);

    // One name pressed in palace one: palace nine stays whole until a name
    // is pressed there too.
    const half = pressedInPair(LENS, both, '1', 'heaven');
    expect(viewOf(LENS, half).links).toEqual([]);
    expect(viewOf(LENS, half).lit.has('1:spirit')).toBe(false);
    expect(viewOf(LENS, half).lit.has('9:spirit')).toBe(true);

    // 丙 and 坎 in one, 辛 and 離 in nine: each pressed name against each.
    // Every relation is a flow, from what generates or controls to what is
    // generated or controlled — 辛 metal in nine feeds 坎 water in one.
    const view = viewOf(LENS, pressedInPair(LENS, pressedInPair(LENS, pressedInPair(LENS, half, '9', 'heaven'), '1', 'palace'), '9', 'palace'));
    expect(view.links).toEqual([
      { from: '1:heaven', to: '9:heaven', relation: 'woke' },
      { from: '1:heaven', to: '9:palace', relation: 'bihe' },
      { from: '9:heaven', to: '1:palace', relation: 'wosheng' },
      { from: '1:palace', to: '9:palace', relation: 'woke' },
    ]);
    // A spirit has no phase, and a press on one changes nothing.
    expect(pressedInPair(LENS, both, '1', 'spirit')).toEqual(both);
    // Pressed again, a name is taken out of the comparison.
    expect(pressedInPair(LENS, half, '1', 'heaven').chosen).toBeUndefined();
    // A palace let go of takes what was pressed in it with it.
    expect(pressedSeat(half, '1').chosen).toBeUndefined();
    expect(pressedSeat(both, '4').pair).toEqual(['4']);
  });

  it('turns the converse relations round in a pair rather than drawing them as a kind', () => {
    const chosen = ['1:heaven', '1:palace', '1:gate', '9:heaven', '9:palace'] as const;
    const view = viewOf(LENS, { ...WHOLE, pair: ['1', '9'], chosen: [...chosen], links: ['duigong', 'wuhe'] });
    expect(view.links.map((link) => link.relation)).not.toContain('shengwo');
    expect(view.links.map((link) => link.relation)).not.toContain('kewo');
    expect(view.links).toContainEqual({ from: '1:palace', to: '9:palace', relation: 'duigong' });
    expect(view.links).toContainEqual({ from: '1:heaven', to: '9:heaven', relation: 'wuhe' });
  });

  it('tabulates every name pressed in one palace against every one in the other, as a flow', () => {
    expect(pairTable(LENS, { ...WHOLE, pair: ['9', '1'] })).toEqual([]);
    const cells = pairTable(LENS, {
      ...WHOLE,
      pair: ['9', '1'],
      chosen: ['9:palace', '1:gate', '9:heaven', '1:heaven', '1:palace'],
    });
    // Rows are palace one's — heaven, palace, gate — and columns nine's.
    expect(cells).toHaveLength(6);
    expect(cells[0]).toEqual({ row: '1:heaven', column: '9:heaven', way: 'out', relation: 'woke' });
    expect(cells).toContainEqual({ row: '1:gate', column: '9:palace', way: 'in', relation: 'woke' });
    expect(cells).toContainEqual({ row: '1:gate', column: '9:heaven', way: 'none', relation: 'bihe' });
    // 辛 metal in nine generates 坎 water in one: the flow runs from the column.
    expect(cells).toContainEqual({ row: '1:palace', column: '9:heaven', way: 'in', relation: 'wosheng' });
  });

  it('lets a pressed name and a pair stand in for each other, never together', () => {
    const named = pressed(pressedSeat(WHOLE, '1'), { layer: 'gate', id: 'kaimen' });
    expect(named.pair).toBeUndefined();
    expect(pressedSeat(named, '1').focus).toBeUndefined();
    expect(readLens(`#${writeLens({ ...WHOLE, pair: ['9', '1'] })}`, LENS).pair).toEqual(['9', '1']);
    expect(readLens('#pair=0,12,3,3,4', LENS).pair).toEqual(['3', '4']);
    const pair: LensState = { ...WHOLE, pair: ['3', '6'], chosen: ['3:heaven', '6:gate'] };
    expect(writeLens(pair)).toBe('pair=3,6&chosen=3:heaven,6:gate');
    expect(readLens(`#${writeLens(pair)}`, LENS)).toEqual(pair);
    // A name outside the pair, or with no phase, is dropped on the way in.
    expect(readLens('#pair=3,6&chosen=3:heaven,4:gate,6:spirit', LENS).chosen).toEqual(['3:heaven']);
  });

  it('lays a lens one way at a time for a basic mode, and keeps nothing behind for either mode', () => {
    // The basic mode's is the mode a page opens in, and it writes nothing: a
    // reader who never switches leaves no trace in the address either.
    expect(WHOLE.extended).toBe(false);
    expect(writeLens(WHOLE)).toBe('');
    const many: LensState = {
      ...WHOLE,
      extended: true,
      layers: ['gate'],
      phases: ['mu', 'huo'],
      toward: ['heaven', 'gate'],
      shengke: false,
      links: ['duigong'],
    };
    expect(oneAtATime(many)).toEqual({
      ...WHOLE,
      phases: ['mu'],
      toward: ['heaven'],
    });
    expect(wayOf(WHOLE)).toBeUndefined();
    expect(wayOf({ ...WHOLE, pair: ['2'] })).toBe('pair');
    expect(wayOf({ ...WHOLE, focus: { layer: 'gate', id: 'kaimen' } })).toBe('focus');
    expect(wayOf({ ...WHOLE, phases: ['jin'] })).toBe('phase');
    expect(wayOf({ ...WHOLE, extended: true, layers: ['gate'] })).toBe('phase');
  });

  it('lights on the circle the phases of what the lens has in it, and nothing else', () => {
    expect(activePhases(LENS, WHOLE)).toEqual([]);
    expect(activePhases(LENS, { ...WHOLE, focus: { layer: 'gate', id: 'kaimen' } })).toEqual(['jin']);
    expect(activePhases(LENS, { ...WHOLE, pair: ['1', '9'], chosen: ['1:heaven', '9:palace', '9:heaven'] })).toEqual(['huo', 'jin']);
    expect(activePhases(LENS, { ...WHOLE, phases: ['shui'] })).toEqual(['shui']);
    expect(activePhases(undefined, { ...WHOLE, phases: ['shui'] })).toEqual([]);
  });
});

/**
 * A board whose seats hold several names in one layer, as a 七政四餘 palace
 * holds several bodies: two with a phase and the Sun, which has none, in 子,
 * and one in 午.
 */
const CROWDED: Lens = {
  board: 'qizheng',
  seats: ['zi', 'wu'],
  pairSeats: ['zi', 'wu'],
  layers: ['palace', 'governor'],
  phased: ['governor'],
  crowded: ['governor'],
  things: [
    { seat: 'zi', layer: 'governor', id: 'muxing', element: 'mu' },
    { seat: 'zi', layer: 'governor', id: 'jinxing', element: 'jin' },
    { seat: 'wu', layer: 'governor', id: 'tuxing', element: 'tu' },
  ],
  phases: LENS.phases,
  linkIds: [],
  links: [],
  names: { relations: {} as Lens['names']['relations'], elements: {} as Lens['names']['elements'] },
};

describe('a lens on a board whose seats hold several names in one layer', () => {
  it('tells two names of one layer and one seat apart by what they are', () => {
    const view = viewOf(CROWDED, { ...pressed(WHOLE, { layer: 'governor', id: 'muxing' }), toward: ['governor'] });
    expect(view.focus).toBe('zi:governor:muxing');
    expect(view.links).toEqual([
      { from: 'zi:governor:muxing', to: 'zi:governor:jinxing', relation: 'kewo' },
      { from: 'zi:governor:muxing', to: 'wu:governor:tuxing', relation: 'woke' },
    ]);
  });

  it('keeps a phase by the names that have it, and a kind by the whole layer of every seat', () => {
    expect([...viewOf(CROWDED, { ...WHOLE, phases: ['jin'] }).lit]).toEqual(['zi:governor:jinxing']);
    expect([...viewOf(CROWDED, { ...WHOLE, layers: ['governor'] }).lit].sort()).toEqual(['wu:governor', 'zi:governor']);
  });

  it('compares in a pair the names pressed, each by itself, and nothing with no phase', () => {
    const both = pressedSeat(pressedSeat(WHOLE, 'wu'), 'zi');
    // The Sun is in 子 and has no phase: a press on it changes nothing.
    expect(pressedInPair(CROWDED, both, 'zi', 'governor', 'taiyang')).toEqual(both);
    // A crowded layer with no name said cannot be pressed into a comparison.
    expect(pressedInPair(CROWDED, both, 'zi', 'governor')).toEqual(both);
    const chosen = pressedInPair(CROWDED, pressedInPair(CROWDED, both, 'zi', 'governor', 'jinxing'), 'wu', 'governor', 'tuxing');
    expect(chosen.chosen).toEqual(['zi:governor:jinxing', 'wu:governor:tuxing']);
    expect(pairTable(CROWDED, chosen)).toEqual([
      { row: 'zi:governor:jinxing', column: 'wu:governor:tuxing', way: 'in', relation: 'wosheng' },
    ]);
    expect(readLens(`#${writeLens(chosen)}`, CROWDED)).toEqual(chosen);
  });
});
