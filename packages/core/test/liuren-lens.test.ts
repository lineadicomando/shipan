import { describe, expect, it } from 'vitest';
import { BRANCHES, ganzhiOf } from '../src/ganzhi.js';
import { DEFAULT_LIUREN_OPTIONS, liurenBoard, type LiurenBoard } from '../src/liuren.js';
import { LIUREN_LAYERS, LIUREN_LENS_LAYERS, liurenLens } from '../src/liuren-lens.js';
import { SOLAR_TERMS } from '../src/solar-terms.js';

/** Every board of a term's sixty days and twelve hours. */
function* boards(): Generator<LiurenBoard> {
  const term = SOLAR_TERMS.find((one) => one.id === 'chunfen');
  if (!term) throw new Error('no 春分');
  for (let day = 0; day < 60; day += 1) {
    for (const hour of BRANCHES) yield liurenBoard({ term, day: ganzhiOf(day), hour }, DEFAULT_LIUREN_OPTIONS);
  }
}

describe('the relations a lens may show on a 六壬 board', () => {
  it('describes the board as the drawing marks it, and lays a pair on the ring alone', () => {
    const lens = liurenLens(boards().next().value as LiurenBoard);
    expect(lens.board).toBe('liuren');
    expect(lens.layers).toEqual(LIUREN_LAYERS);
    expect(lens.phased).toEqual(LIUREN_LENS_LAYERS);
    expect(lens.pairSeats).toEqual(BRANCHES.map((branch) => branch.id));
    expect(lens.seats).toEqual([...lens.pairSeats, '1', '2', '3', '4', 'chu', 'zhong', 'mo']);
    // No relation of the board's own has a row yet.
    expect(lens.linkIds).toEqual([]);
    expect(Object.keys(lens.names.relations)).toHaveLength(5);
  });

  it('lists every name with a phase as the board places it, and no general', () => {
    for (const board of boards()) {
      const { things } = liurenLens(board);
      expect(things.some((thing) => (thing.layer as string) === 'general')).toBe(false);
      const at = (seat: string, layer: string) => things.find((thing) => thing.seat === seat && thing.layer === layer);
      BRANCHES.forEach((ground, index) => {
        expect(at(ground.id, 'earth')).toMatchObject({ id: ground.id, element: ground.element });
        expect(at(ground.id, 'heaven')).toMatchObject({ id: board.heaven[index]?.id, element: board.heaven[index]?.element });
      });
      for (const course of board.courses) {
        expect(at(String(course.number), 'upper')).toMatchObject({ id: course.upper.id, element: course.upper.element });
        expect(at(String(course.number), 'lower')).toMatchObject({ id: course.lower.id, element: course.lower.element });
      }
      for (const transmission of board.transmissions) {
        expect(at(transmission.position, 'branch')?.id).toBe(transmission.branch.id);
        // An empty branch has no stem covering it, and nothing is invented.
        expect(at(transmission.position, 'stem')?.id).toBe(transmission.hiddenStem?.id);
      }
    }
  });

  it('reads between a lesson and its ground the control the board was drawn by', () => {
    // Under 賊剋 the first transmission is the branch over a lesson whose two
    // halves stand in control: the lens names that relation on the same pair.
    let checked = 0;
    for (const board of boards()) {
      if (board.rule !== 'zeike') continue;
      const lens = liurenLens(board);
      const first = board.transmissions[0].branch.id;
      const controlled = board.courses.some((course) => {
        if (course.upper.id !== first) return false;
        const relation = lens.phases[course.upper.element][course.lower.element];
        return relation === 'woke' || relation === 'kewo';
      });
      expect(controlled).toBe(true);
      checked += 1;
    }
    expect(checked).toBeGreaterThan(100);
  });
});
