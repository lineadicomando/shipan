import { describe, expect, it } from 'vitest';
import { layArrows, pathOf, type Box } from '../src/lib/arrows';

/**
 * The arrows of a lens are straight wherever a straight line is clear, and
 * bent only so that no arrow crosses a name another points at, or lies on an
 * arrow already laid.
 */
const box = (x: number, y: number): Box => ({ x, y, width: 30, height: 20 });

describe('laying the arrows of a lens', () => {
  it('leaves an arrow straight where nothing is in its way', () => {
    const from = box(0, 0);
    const to = box(300, 0);
    const [laid] = layArrows([{ from, to }], [from, to]);
    expect(laid?.bend).toBe(0);
    expect(pathOf(laid!)).toMatch(/^M [\d.-]+ [\d.-]+ Q [\d.-]+ [\d.-]+ [\d.-]+ [\d.-]+$/);
  });

  it('bends a long arrow round a nearer name in the same direction', () => {
    // Three names in a row: the arrow to the far one would run through the
    // near one, and an arrow through a name reads as pointing at it.
    const from = box(0, 0);
    const near = box(150, 0);
    const far = box(300, 0);
    const [short, long] = layArrows(
      [
        { from, to: near },
        { from, to: far },
      ],
      [from, near, far],
    );
    expect(short?.bend).toBe(0);
    expect(long?.bend).not.toBe(0);
  });

  it('parts two arrows that would lie on each other', () => {
    // Two names almost on one bearing from the start: straight, the two
    // arrows would share most of their length.
    const from = box(0, 0);
    const one = box(200, 4);
    const two = box(204, 40);
    const [a, b] = layArrows(
      [
        { from, to: one },
        { from, to: two },
      ],
      [from, one, two],
    );
    expect([a?.bend, b?.bend]).toContain(0);
    expect(a?.bend === 0 && b?.bend === 0).toBe(false);
  });

  it('keeps the order it was given, whatever order it laid them in', () => {
    const from = box(0, 0);
    const far = box(400, 0);
    const near = box(100, 100);
    const laid = layArrows(
      [
        { from, to: far },
        { from, to: near },
      ],
      [from, far, near],
    );
    // The first arrow given ends at the far box, the second at the near one.
    expect(laid[0]!.x2).toBeGreaterThan(laid[1]!.x2);
  });
});
