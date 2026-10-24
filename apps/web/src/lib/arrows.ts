/**
 * Where the arrows of a lens run, so that no two lie on each other.
 *
 * Laid straight wherever a straight line is clear, and bent only where it is
 * not: an arrow that would cross a name another arrow points at, or run along
 * an arrow already laid, is tried as a curve to one side and then the other,
 * a little further each time, and the gentlest curve that is clear is kept.
 * The shortest arrows are laid first, since a short arrow has the least room
 * to bend and a long one the most.
 *
 * Pure geometry, in the pixels of whatever holds the board: it knows boxes
 * and nothing of what is in them, so it can be tested apart from the page.
 */

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Arrow {
  from: Box;
  to: Box;
}

/** A quadratic curve from one box to another, stopping short of both. */
export interface Laid {
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  x2: number;
  y2: number;
  /** How far it was bent, in steps to one side or the other; 0 is straight. */
  bend: number;
}

/** The bends tried, gentlest first: straight, then each side in turn. */
const BENDS = [0, 1, -1, 2, -2, 3, -3] as const;

/** How many points along a curve are checked. */
const SAMPLES = 14;

/** Closer than this to an arrow already laid, and two arrows read as one. */
const CROWD = 9;

/**
 * How near its own ends a point of an arrow may crowd another freely. Arrows
 * that leave one name all meet at it, and a fan reads as a fan: counting that
 * meeting as crowding bent every arrow of a pressed name for nothing.
 */
const NEAR_END = 40;

const centre = (box: Box) => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
const radius = (box: Box) => Math.max(box.width, box.height) / 2 + 3;

/** The path of a laid arrow, for the `d` of an SVG `<path>`. */
export function pathOf(laid: Laid): string {
  const r = (value: number) => Math.round(value * 10) / 10;
  return `M ${r(laid.x1)} ${r(laid.y1)} Q ${r(laid.cx)} ${r(laid.cy)} ${r(laid.x2)} ${r(laid.y2)}`;
}

/** The curve from `from` to `to` bent by `bend` steps, ends trimmed to the boxes. */
function curve(arrow: Arrow, bend: number): Laid {
  const a = centre(arrow.from);
  const b = centre(arrow.to);
  const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const ux = (b.x - a.x) / length;
  const uy = (b.y - a.y) / length;
  // A step grows with the arrow, so a long arrow bends as visibly as a short
  // one, and never less than enough to clear a line of type.
  const step = Math.max(18, length * 0.12);
  const cx = (a.x + b.x) / 2 - uy * step * bend;
  const cy = (a.y + b.y) / 2 + ux * step * bend;
  // Each end leaves its box in the direction the curve leaves it, toward the
  // control point, so the head sits on the box's edge and points into it.
  const toward = (from: { x: number; y: number }, box: Box) => {
    const dx = cx - from.x;
    const dy = cy - from.y;
    const d = Math.hypot(dx, dy) || 1;
    const r = radius(box);
    return { x: from.x + (dx / d) * r, y: from.y + (dy / d) * r };
  };
  const start = toward(a, arrow.from);
  const end = toward(b, arrow.to);
  return { x1: start.x, y1: start.y, cx, cy, x2: end.x, y2: end.y, bend };
}

/** Points along a curve, its ends left out: they sit on boxes by design. */
function sample(laid: Laid): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 1; i < SAMPLES; i++) {
    const t = i / SAMPLES;
    const u = 1 - t;
    points.push({
      x: u * u * laid.x1 + 2 * u * t * laid.cx + t * t * laid.x2,
      y: u * u * laid.y1 + 2 * u * t * laid.cy + t * t * laid.y2,
    });
  }
  return points;
}

const inside = (point: { x: number; y: number }, box: Box, pad: number) =>
  point.x > box.x - pad &&
  point.x < box.x + box.width + pad &&
  point.y > box.y - pad &&
  point.y < box.y + box.height + pad;

/**
 * Every arrow laid, in the order given.
 *
 * `obstacles` are the boxes an arrow must not cross — every name the lens has
 * drawn an arrow to or from. An arrow's own two ends are never in its way.
 */
export function layArrows(arrows: readonly Arrow[], obstacles: readonly Box[]): Laid[] {
  const order = arrows
    .map((arrow, index) => ({ arrow, index, length: Math.hypot(...delta(arrow)) }))
    .sort((a, b) => a.length - b.length);

  const laid: Laid[] = new Array(arrows.length);
  const taken: { x: number; y: number }[] = [];

  for (const { arrow, index } of order) {
    let best: { laid: Laid; cost: number } | undefined;
    for (const bend of BENDS) {
      const candidate = curve(arrow, bend);
      const points = sample(candidate);
      // The bend itself costs a little, so straight wins wherever it is clear.
      let cost = Math.abs(bend);
      for (const box of obstacles) {
        if (box === arrow.from || box === arrow.to) continue;
        for (const point of points) if (inside(point, box, 2)) cost += 50;
      }
      const a = centre(arrow.from);
      const b = centre(arrow.to);
      for (const point of points) {
        if (Math.hypot(point.x - a.x, point.y - a.y) < NEAR_END) continue;
        if (Math.hypot(point.x - b.x, point.y - b.y) < NEAR_END) continue;
        for (const other of taken) {
          if (Math.hypot(point.x - other.x, point.y - other.y) < CROWD) {
            cost += 5;
            break;
          }
        }
      }
      if (!best || cost < best.cost) best = { laid: candidate, cost };
      if (cost === 0) break;
    }
    const chosen = (best as { laid: Laid }).laid;
    laid[index] = chosen;
    taken.push(...sample(chosen));
  }
  return laid;
}

function delta(arrow: Arrow): [number, number] {
  const a = centre(arrow.from);
  const b = centre(arrow.to);
  return [b.x - a.x, b.y - a.y];
}
