<!--
  The five phases as the books draw them: a circle of generation and a star of
  control.

  Beside the board when a lens is laid one way at a time, because it is the
  diagram a reader new to the arts has already met, and the lens is the board
  read through it. Fire at the top and generation clockwise round the circle;
  each phase controls the one two places on, which is the star inside. The
  arrows are the lens's own — violet and whole for generation, magenta and
  dashed for control — so the key under the controls reads both.

  **The arrows are looked up, not drawn from memory.** Which phase generates
  and which controls which is read from the table the engine handed over with
  the board (`QimenLens.phases`); only the places round the circle are this
  file's, and those are a layout.

  **It lights only what the lens has in it.** The phases of what the reader
  pressed or kept stay as drawn, and so do the arrows between them — or, with
  one phase, every arrow touching it; the rest recede. With nothing chosen the
  circle is whole, as the board is.

  Said as an image, its sentence its accessible name and not a caption: a
  reader who sees the circle reads the rule off it, and the relations it
  lights are said in words under the board.
-->
<script lang="ts">
  import type { MessageKey, Translator } from '@shipan/i18n';
  import type { Element, QimenLens } from '@shipan/core';

  let {
    t,
    lens,
    active,
  }: {
    t: Translator;
    lens: QimenLens;
    /** The phases of what the lens has in it: none, one, or several. */
    active: readonly Element[];
  } = $props();

  /** Round the circle in the order of generation, fire at the top. */
  const ORDER: readonly Element[] = ['huo', 'tu', 'jin', 'shui', 'mu'];
  const SIZE = 290;
  const RADIUS = 92;
  const NODE = 25;

  const angleOf = (element: Element) => -Math.PI / 2 + (ORDER.indexOf(element) * 2 * Math.PI) / ORDER.length;
  const place = (element: Element, radius = RADIUS) => {
    const angle = angleOf(element);
    return { x: SIZE / 2 + radius * Math.cos(angle), y: SIZE / 2 + radius * Math.sin(angle) };
  };

  /** Every arrow of the two cycles, read off the engine's table. */
  const arrows = $derived(
    ORDER.flatMap((from) =>
      ORDER.flatMap((to) => {
        const relation = lens.phases[from][to];
        return relation === 'wosheng' || relation === 'woke' ? [{ from, to, relation }] : [];
      }),
    ),
  );

  const lit = (from: Element, to: Element): boolean => {
    if (active.length === 0) return true;
    if (active.length === 1) return active.includes(from) || active.includes(to);
    // Several phases: the arrows among them, and none leading elsewhere.
    return active.includes(from) && active.includes(to);
  };

  /** A chord from one node to another, stopping at both rims. */
  function chord(from: Element, to: Element) {
    const a = place(from);
    const b = place(to);
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    const ux = (b.x - a.x) / length;
    const uy = (b.y - a.y) / length;
    const gap = NODE + 3;
    return { x1: a.x + ux * gap, y1: a.y + uy * gap, x2: b.x - ux * gap, y2: b.y - uy * gap };
  }
</script>

<figure class="wheel">
  <svg width={SIZE} height={SIZE} viewBox="0 0 {SIZE} {SIZE}" role="img" aria-label={t('lens.wheel')}>
    <defs>
      <marker id="wheel-sheng" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" style:fill="var(--lens-sheng)" />
      </marker>
      <marker id="wheel-ke" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" style:fill="var(--lens-ke)" />
      </marker>
    </defs>
    {#each arrows as arrow (`${arrow.from}-${arrow.to}`)}
      <line
        {...chord(arrow.from, arrow.to)}
        class:recede={!lit(arrow.from, arrow.to)}
        style:stroke={arrow.relation === 'wosheng' ? 'var(--lens-sheng)' : 'var(--lens-ke)'}
        stroke-dasharray={arrow.relation === 'woke' ? '7 4' : undefined}
        marker-end={arrow.relation === 'wosheng' ? 'url(#wheel-sheng)' : 'url(#wheel-ke)'}
      />
    {/each}
    {#each ORDER as element (element)}
      {@const at = place(element)}
      {@const out = place(element, RADIUS + NODE + 22)}
      <!-- The name, its reading inside the node, and the word for it outside,
           away from the arrows. -->
      <g class:recede={active.length > 0 && !active.includes(element)}>
        <circle cx={at.x} cy={at.y} r={NODE} style:fill="var(--element-{element})" />
        <text x={at.x} y={at.y - 5} class="hanzi">{lens.names.elements[element].hanzi}</text>
        <text x={at.x} y={at.y + 13} class="said">{lens.names.elements[element].pinyin}</text>
        <text x={out.x} y={out.y} class="word">{t(`label.element.${element}` as MessageKey)}</text>
      </g>
    {/each}
  </svg>
</figure>

<style>
  .wheel { margin: 0; display: grid; justify-items: center; gap: 0.3rem; }
  svg { display: block; max-inline-size: 100%; block-size: auto; }
  line { stroke-width: 1.8; fill: none; transition: opacity 0.15s ease-out; }
  circle { stroke: var(--edge); stroke-width: 1; }
  g { transition: opacity 0.15s ease-out; }
  .recede { opacity: 0.18; }
  text { text-anchor: middle; fill: var(--ink); }
  .hanzi { font-size: 17px; dominant-baseline: middle; }
  .said { font-size: 10px; font-style: italic; fill: var(--faint); }
  .word { font-size: 12px; dominant-baseline: middle; }
  @media (prefers-reduced-motion: reduce) { line, g { transition: none; } }
</style>
