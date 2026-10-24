<!--
  The relations of a focus, laid over the board it is on.

  The page's and not the drawing's, for the reason the lens is: the drawing
  is made on the server, and where a reader looked never goes there. So this
  is a layer of its own set over the drawing, in the page's ink and never in a
  phase's colour — the colours on the board are the phases', and a line in
  one of them would read as a sixth thing in the palace.

  **Two ways of drawing the same relations, to be compared.** `arrows` runs a
  line from the focus to each thing; `marks` draws a ring round each thing
  with a notch on the side toward the focus. Either way the stroke says the
  cycle — whole for 生, dashed for 剋, dotted for 比和, broken twice for
  對宮 and doubled for 五合 — and the head or the notch says which way it
  runs. Nothing among them is heavier than the rest but the focus itself,
  which is the reader's own choice and is ringed as such.

  Hidden from assistive technology and from paper. The same relations are
  said in words under the board (`LensRelations`), and a sheet carries the
  whole board, as it was laid.
-->
<script lang="ts" module>
  import type { ShownRelation } from '$lib/lens';

  /** The stroke each relation is drawn with. Shared with the key to them. */
  export function dashOf(relation: ShownRelation): string | undefined {
    switch (relation) {
      case 'wosheng':
      case 'shengwo':
        return undefined;
      case 'woke':
      case 'kewo':
        return '7 4';
      case 'bihe':
        return '1.5 3.5';
      case 'duigong':
        return '10 3 2 3';
      case 'wuhe':
        return undefined;
    }
  }
</script>

<script lang="ts">
  import { direction, type Drawing } from '$lib/lens';

  interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  let {
    width,
    height,
    focus,
    links,
    drawing,
  }: {
    width: number;
    height: number;
    focus: Box | undefined;
    links: readonly { box: Box; relation: ShownRelation }[];
    drawing: Drawing;
  } = $props();

  const centre = (box: Box) => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
  const radius = (box: Box) => Math.max(box.width, box.height) / 2 + 3;

  /** A line from one box to another, stopping short of both. */
  function between(a: Box, b: Box) {
    const from = centre(a);
    const to = centre(b);
    const length = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    const ux = (to.x - from.x) / length;
    const uy = (to.y - from.y) / length;
    const start = radius(a);
    const end = radius(b);
    return {
      x1: from.x + ux * start,
      y1: from.y + uy * start,
      x2: to.x - ux * end,
      y2: to.y - uy * end,
    };
  }

  /** The notch on a ring, on the side facing the focus, pointing the way the relation runs. */
  function notch(target: Box, origin: Box, relation: ShownRelation): string | undefined {
    const way = direction(relation);
    if (way === 'none') return undefined;
    const to = centre(target);
    const from = centre(origin);
    const length = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    const ux = (to.x - from.x) / length;
    const uy = (to.y - from.y) / length;
    const r = radius(target);
    // The point on the ring nearest the focus.
    const px = to.x - ux * r;
    const py = to.y - uy * r;
    const size = 9;
    // Outwards from the focus: the tip points into the thing. Inwards: away
    // from it, toward the focus.
    const sign = way === 'out' ? 1 : -1;
    const tipX = px + ux * size * sign;
    const tipY = py + uy * size * sign;
    const baseX = px - ux * size * 0.2 * sign;
    const baseY = py - uy * size * 0.2 * sign;
    const nx = -uy * size * 0.7;
    const ny = ux * size * 0.7;
    return `M ${tipX} ${tipY} L ${baseX + nx} ${baseY + ny} L ${baseX - nx} ${baseY - ny} Z`;
  }
</script>

<svg class="links" {width} {height} viewBox="0 0 {width} {height}" aria-hidden="true">
  <defs>
    <marker id="lens-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>

  {#if focus}
    <rect
      class="focus"
      x={focus.x - 4}
      y={focus.y - 4}
      width={focus.width + 8}
      height={focus.height + 8}
      rx="6"
    />
  {/if}

  {#each links as link, index (index)}
    {@const dash = dashOf(link.relation)}
    {@const way = direction(link.relation)}
    {#if drawing === 'arrows' && focus}
      {@const line = between(focus, link.box)}
      <line class="halo" {...line} />
      <line
        {...line}
        stroke-dasharray={dash}
        marker-end={way === 'out' ? 'url(#lens-head)' : undefined}
        marker-start={way === 'in' ? 'url(#lens-head)' : undefined}
      />
      {#if link.relation === 'wuhe'}
        <line {...line} class="inner" />
      {/if}
    {:else}
      {@const ring = { x: link.box.x - 3, y: link.box.y - 3, width: link.box.width + 6, height: link.box.height + 6 }}
      <rect class="halo" {...ring} rx="5" />
      <rect {...ring} rx="5" stroke-dasharray={dash} />
      {#if link.relation === 'wuhe'}
        <rect class="inner" x={ring.x + 3} y={ring.y + 3} width={ring.width - 6} height={ring.height - 6} rx="3" />
      {/if}
      {#if focus}
        {@const path = notch(link.box, focus, link.relation)}
        {#if path}<path d={path} class="notch" />{/if}
      {/if}
    {/if}
  {/each}
</svg>

<style>
  .links {
    position: absolute;
    inset: 0;
    pointer-events: none;
    color: var(--ink);
    overflow: visible;
  }
  line,
  rect {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    stroke-linecap: round;
  }
  /* A wider stroke in the page's ground under each line, so it reads over the
     names it crosses rather than through them. */
  .halo {
    stroke: var(--ground);
    stroke-width: 4.5;
    stroke-dasharray: none;
    opacity: 0.85;
  }
  /* 五合's second line: the one relation drawn double, as a pair is. */
  .inner {
    stroke: var(--ground);
    stroke-width: 0.8;
  }
  .focus {
    stroke-width: 2.4;
  }
  .notch {
    fill: currentColor;
    stroke: var(--ground);
    stroke-width: 0.8;
  }
  @media print {
    .links { display: none; }
  }
</style>
