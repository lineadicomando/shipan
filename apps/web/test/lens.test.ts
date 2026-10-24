import { describe, expect, it } from 'vitest';
import type { QimenLens } from '@shipan/core';
import { WHOLE, keyOf, pairTable, pressed, pressedSeat, readLens, viewOf, writeLens, type LensState } from '../src/lib/lens';

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
  things: [
    { seat: 1, layer: 'heaven', id: 'bing', element: 'huo' },
    { seat: 1, layer: 'palace', id: 'kan', element: 'shui' },
    { seat: 1, layer: 'gate', id: 'kaimen', element: 'jin' },
    { seat: 9, layer: 'heaven', id: 'xin', element: 'jin' },
    { seat: 9, layer: 'palace', id: 'li', element: 'huo' },
  ],
  phases: {
    mu: { mu: 'bihe', huo: 'wosheng', tu: 'woke', jin: 'kewo', shui: 'shengwo' },
    huo: { mu: 'shengwo', huo: 'bihe', tu: 'wosheng', jin: 'woke', shui: 'kewo' },
    tu: { mu: 'kewo', huo: 'shengwo', tu: 'bihe', jin: 'wosheng', shui: 'woke' },
    jin: { mu: 'woke', huo: 'kewo', tu: 'shengwo', jin: 'bihe', shui: 'wosheng' },
    shui: { mu: 'wosheng', huo: 'woke', tu: 'kewo', jin: 'shengwo', shui: 'bihe' },
  },
  facing: { 1: 9, 2: 8, 3: 7, 4: 6, 6: 4, 7: 3, 8: 2, 9: 1 },
  wuhe: { jia: 'ji', yi: 'geng', bing: 'xin', ding: 'ren', wu: 'gui', ji: 'jia', geng: 'yi', xin: 'bing', ren: 'ding', gui: 'wu' },
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
      Array.from({ length: 9 }, (_, index) => keyOf(index + 1, 'heaven')).sort(),
    );
  });

  it('keeps a phase by what has one, and a spirit never', () => {
    const view = viewOf(LENS, { ...WHOLE, phases: ['jin'] });
    expect([...view.lit].sort()).toEqual([keyOf(1, 'gate'), keyOf(9, 'heaven')].sort());
    const spirits = viewOf(LENS, { ...WHOLE, layers: ['spirit'], phases: ['jin'] });
    expect(spirits.lit.size).toBe(0);
  });

  it('relates a pressed name to every thing of the kinds asked, by lookup and with no order', () => {
    const state = pressed(WHOLE, { layer: 'heaven', id: 'bing' });
    // Its own kind first, and only that: the rest are the reader's to add.
    expect(state.toward).toEqual(['heaven']);
    const view = viewOf(LENS, { ...state, toward: ['heaven', 'palace', 'gate'] });
    expect(view.focus).toBe(keyOf(1, 'heaven'));
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
    };
    const fragment = writeLens(state);
    expect(fragment).toBe('phases=huo&focus=heaven.bing&toward=heaven,gate&shengke=0&links=wuhe');
    expect(readLens(`#${fragment}`)).toEqual(state);
    expect(writeLens(WHOLE)).toBe('');
    // What is not a known value is dropped, never guessed at.
    expect(readLens('#layers=heaven,nonsense&focus=spirit.zhifu&links=chong')).toEqual({
      ...WHOLE,
      layers: ['heaven'],
    });
  });

  it("lays a pair by the ground of two palaces, and neither is the reader's", () => {
    const one = pressedSeat(WHOLE, 9);
    expect(viewOf(LENS, one).seats).toEqual([9]);
    expect(viewOf(LENS, one).links).toEqual([]);

    // Pressed nine first and one second: held in Luoshu order all the same.
    const both = pressedSeat(one, 1);
    const view = viewOf(LENS, both);
    expect(view.seats).toEqual([1, 9]);
    // Each relation is a flow, from what generates or controls to what is
    // generated or controlled: 辛 metal in nine is controlled by 丙 fire in
    // one, and 坎 water in one controls 離 fire in nine.
    expect(view.links).toEqual([
      { from: '1:heaven', to: '9:heaven', relation: 'woke' },
      { from: '1:palace', to: '9:palace', relation: 'woke' },
    ]);
    expect(viewOf(LENS, pressedSeat(both, 9)).seats).toEqual([1]);
    expect(pressedSeat(both, 4).pair).toEqual([4]);
  });

  it('turns the converse relations round in a pair rather than drawing them as a kind', () => {
    const view = viewOf(LENS, { ...WHOLE, pair: [1, 9], links: ['duigong', 'wuhe'] });
    expect(view.links.map((link) => link.relation)).not.toContain('shengwo');
    expect(view.links.map((link) => link.relation)).not.toContain('kewo');
    expect(view.links).toContainEqual({ from: '1:palace', to: '9:palace', relation: 'duigong' });
    expect(view.links).toContainEqual({ from: '1:heaven', to: '9:heaven', relation: 'wuhe' });
  });

  it('tabulates every thing of one palace against every thing of the other, as a flow', () => {
    const cells = pairTable(LENS, [9, 1]);
    // Rows are palace one's — heaven, palace, gate — and columns nine's.
    expect(cells).toHaveLength(6);
    expect(cells).toContainEqual({ row: 'gate', column: 'palace', way: 'in', relation: 'woke' });
    expect(cells).toContainEqual({ row: 'gate', column: 'heaven', way: 'none', relation: 'bihe' });
    // 辛 metal in nine generates 坎 water in one: the flow runs from the column.
    expect(cells).toContainEqual({ row: 'palace', column: 'heaven', way: 'in', relation: 'wosheng' });
  });

  it('lets a pressed name and a pair stand in for each other, never together', () => {
    const named = pressed(pressedSeat(WHOLE, 1), { layer: 'gate', id: 'kaimen' });
    expect(named.pair).toBeUndefined();
    expect(pressedSeat(named, 1).focus).toBeUndefined();
    expect(readLens(`#${writeLens({ ...WHOLE, pair: [9, 1] })}`).pair).toEqual([9, 1]);
    expect(readLens('#pair=0,12,3,3,4').pair).toEqual([3, 4]);
  });
});
