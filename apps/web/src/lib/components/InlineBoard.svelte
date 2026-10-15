<!--
  A drawn board set in the page itself, so the page can tell what is under a
  pointer.

  An `<img>` is a picture and nothing more: the drawing inside it marks every
  palace and every name (`spotOf` in `$lib/board`), and none of it reaches
  the page. So the same address is fetched as text and set in a shadow root —
  a root of its own because the drawing's sheet would otherwise reach every
  other drawing on the page, and a board on screen and its copy for paper are
  two schemes of one sheet.

  **The picture first, and the drawing over it once it is here.** What the
  server sends is the `<img>`, so the board is on the page before any script
  runs and stays there for a reader who runs none; the fetch then finds it in
  the cache it was just put in. Where the fetch fails the picture simply
  stays, and nothing answers a pointer.

  It reports what is under the pointer and decides nothing about it: `onhover`
  as the pointer moves from one marked thing to another, and `onpick` when one
  is pressed — which on a screen with no pointer is the only one of the two
  that happens.

  Hidden from assistive technology, as the picture was with `alt=""`: the
  board is said in full in the table under it.
-->
<script lang="ts">
  import { sameSpot, spotOf, type BoardSpot } from '$lib/board';

  let {
    src,
    width,
    height,
    onhover,
    onpick,
  }: {
    src: string;
    width: number;
    height: number;
    onhover?: (spot: BoardSpot | undefined) => void;
    onpick?: (spot: BoardSpot | undefined) => void;
  } = $props();

  /**
   * The drawing fills its box, and the box is the page's to size. The
   * drawing's own `width` and `height` are its intrinsic size and would
   * otherwise win over the box.
   */
  const SHEET = ':host { display: block; } svg { display: block; width: 100%; height: auto; }';

  let host: HTMLDivElement | undefined = $state();
  let root: ShadowRoot | undefined;
  /** Whether the shadow root holds a drawing yet. Until it does, the picture shows. */
  let inline = $state(false);
  /** The address of what is on screen now, in either form. */
  let drawn = $state<string>();

  $effect(() => {
    const wanted = src;
    const target = host;
    if (!target) return;

    const controller = new AbortController();
    fetch(wanted, { signal: controller.signal })
      .then((response) => (response.ok ? response.text() : Promise.reject(response.status)))
      .then((svg) => {
        root ??= target.attachShadow({ mode: 'open' });
        // The drawing is this site's own, from its own endpoint, and holds no
        // script: it is set as markup the way the picture was set as pixels.
        root.innerHTML = `<style>${SHEET}</style>${svg}`;
        inline = true;
        drawn = wanted;
      })
      .catch(() => {});
    return () => controller.abort();
  });

  /** The last spot reported, so that a move inside one name reports nothing. */
  let over: BoardSpot | undefined;

  function moved(event: PointerEvent): void {
    const spot = spotOf(event);
    if (sameSpot(spot, over)) return;
    over = spot;
    onhover?.(spot);
  }

  function left(): void {
    if (over === undefined) return;
    over = undefined;
    onhover?.(undefined);
  }
</script>

<div
  bind:this={host}
  class="board"
  class:settling={inline && drawn !== src}
  aria-hidden="true"
  onpointermove={moved}
  onpointerleave={left}
  onclick={(event) => onpick?.(spotOf(event))}
>
  {#if !inline}
    <img
      {src}
      alt=""
      {width}
      {height}
      class:settling={drawn !== src}
      onload={() => (drawn = src)}
    />
  {/if}
</div>

<style>
  .board, img { transition: opacity 0.15s ease-out; }
  img { display: block; width: 100%; height: auto; }
  .settling { opacity: 0.35; }
  @media (prefers-reduced-motion: reduce) {
    .board, img { transition: none; }
  }
  @media print {
    .settling { opacity: 1; }
  }
</style>
