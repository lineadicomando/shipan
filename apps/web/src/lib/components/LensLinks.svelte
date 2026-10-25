<!--
  The relations a lens shows, laid over the board as arrows.

  The page's and not the drawing's, for the reason the lens is: the drawing
  is made on the server, and where a reader looked never goes there. So this
  is a layer of its own set over the drawing.

  **Each relation is a line from one end to the other**, with a head where it
  runs: from what generates or controls to what is generated or controlled.
  Straight where a straight line is clear, and curved only where it is not —
  where it would cross a name another arrow points at, or lie on an arrow
  already laid (`layArrows` in `$lib/arrows`).
  The same layer serves a pressed name, every relation starting from it, and a
  pair of palaces, where each runs from whichever thing acts.

  **Two carriers, so that neither is the only one.** The stroke says the kind
  — whole for 生, dashed for 剋, dotted for 比和, broken twice for 對宮 and
  doubled for 五合 — and the two cycles are coloured as well, `--lens-sheng`
  and `--lens-ke`, in hues the phases do not use: colour on a board is the
  phase's, and a line in green or red would read as a sixth thing of wood or
  fire. The other three are in the page's ink. Nothing among them is heavier
  than the rest but what the reader chose, which is framed as theirs.

  Hidden from assistive technology and from paper. The same relations are
  said in words under the board, and a sheet carries the whole board, as it
  was laid.
-->
<script lang="ts" module>
  import type { ShownRelation } from '$lib/lens';

  /** The stroke each relation is drawn with. Shared with the key to them. */
  export function dashOf(relation: ShownRelation): string | undefined {
    switch (relation) {
      case 'woke':
      case 'kewo':
        return '7 4';
      case 'bihe':
        return '1.5 3.5';
      case 'duigong':
        return '10 3 2 3';
      default:
        return undefined;
    }
  }

  /** The colour each relation is drawn in. Shared with the key to them. */
  export function colourOf(relation: ShownRelation): string {
    switch (relation) {
      case 'wosheng':
      case 'shengwo':
        return 'var(--lens-sheng)';
      case 'woke':
      case 'kewo':
        return 'var(--lens-ke)';
      default:
        return 'var(--ink)';
    }
  }
</script>

<script lang="ts">
  import { direction } from '$lib/lens';
  import { layArrows, pathOf } from '$lib/arrows';

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
    seats,
    links,
  }: {
    width: number;
    height: number;
    focus: Box | undefined;
    /** The palaces of a pair, framed: the reader's own choice, like the focus. */
    seats: readonly Box[];
    links: readonly { from: Box; box: Box; relation: ShownRelation }[];
  } = $props();

  /**
   * Every arrow placed, clear of the names the lens points at and of each
   * other. The obstacles are every end of every arrow, the focus with them.
   */
  const paths = $derived.by(() => {
    const obstacles: Box[] = [...(focus ? [focus] : []), ...links.flatMap((link) => [link.from, link.box])];
    return layArrows(
      links.map((link) => ({ from: link.from, to: link.box })),
      obstacles,
    ).map(pathOf);
  });

  /** One head per colour: a marker takes its fill from where it is defined. */
  const HEADS = [
    { id: 'lens-head-sheng', colour: 'var(--lens-sheng)' },
    { id: 'lens-head-ke', colour: 'var(--lens-ke)' },
  ] as const;
  const headOf = (relation: ShownRelation): string =>
    relation === 'wosheng' || relation === 'shengwo' ? 'url(#lens-head-sheng)' : 'url(#lens-head-ke)';
</script>

<svg class="links" {width} {height} viewBox="0 0 {width} {height}" aria-hidden="true">
  <defs>
    {#each HEADS as head (head.id)}
      <marker id={head.id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" style:fill={head.colour} />
      </marker>
    {/each}
  </defs>

  {#if focus}
    <rect class="frame" x={focus.x - 4} y={focus.y - 4} width={focus.width + 8} height={focus.height + 8} rx="6" />
  {/if}
  {#each seats as seat, index (index)}
    <rect class="frame seat" x={seat.x + 2} y={seat.y + 2} width={seat.width - 4} height={seat.height - 4} rx="4" />
  {/each}

  {#each links as link, index (index)}
    {@const d = paths[index]}
    {@const way = direction(link.relation)}
    <path class="halo" {d} />
    <path
      {d}
      style:stroke={colourOf(link.relation)}
      stroke-dasharray={dashOf(link.relation)}
      marker-end={way === 'out' ? headOf(link.relation) : undefined}
      marker-start={way === 'in' ? headOf(link.relation) : undefined}
    />
    {#if link.relation === 'wuhe'}
      <path {d} class="inner" />
    {/if}
  {/each}
</svg>

<style>
  .links {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: visible;
  }
  path,
  rect {
    fill: none;
    stroke: var(--ink);
    stroke-width: 1.8;
    stroke-linecap: round;
  }
  /* A wider stroke in the page's ground under each line, so it reads over the
     names it crosses rather than through them. */
  .halo {
    stroke: var(--ground);
    stroke-width: 5;
    opacity: 0.85;
  }
  /* 五合's second line: the one relation drawn double, as a pair is. */
  .inner {
    stroke: var(--ground);
    stroke-width: 0.8;
  }
  .frame { stroke-width: 2.4; }
  .seat { stroke-width: 3; }
  @media print {
    .links { display: none; }
  }
</style>
