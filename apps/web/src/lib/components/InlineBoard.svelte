<!--
  A drawn board set in the page itself, so the page can tell what is under a
  pointer.

  An `<img>` is a picture and nothing more: the drawing inside it marks every
  seat and every name (`spotOf` in `$lib/board`), and none of it reaches
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
  is pressed.

  **`tip` is the one thing it shows of its own**: a short line set over the
  spot, in words the caller chose. A mouse shows it by resting and hides it by
  leaving; a finger has no resting, so a tap shows it and a tap anywhere else,
  or Escape, puts it away. Nothing else on the page moves for it. A page whose
  board already answers a press with something else says `pin={false}`, and
  then a tap is the caller's alone and only a mouse is told the layer.

  `ondrawn` reports the size of what is on screen, the picture's or the
  drawing's, and whether it is the drawing yet: a page laying anything over
  the board measures it from there rather than assuming it.

  Hidden from assistive technology, as the picture was with `alt=""`, and the
  tip with it: the board is said in full in the table under it, and a tip
  read aloud would be the sixth time a reader heard which column a name is in.

  **`lens` is what the reader asked to see** (`$lib/lens`): what it keeps
  stays as drawn and everything else in a seat recedes, the ground of the
  seat excepted, and the relations of a focus are laid over the drawing by
  `LensLinks`. Both are applied to the drawing once it is here and to nothing
  before: the picture is the whole board, which is also what a reader who
  runs no script is owed. Paper always gets the whole board.
-->
<script lang="ts">
  import { sameSpot, spotOf, type BoardSpot } from '$lib/board';
  import { spotOfKey, type LensView, type ShownRelation, type SpotKey } from '$lib/lens';
  import LensLinks from './LensLinks.svelte';

  let {
    src,
    width,
    height,
    tip,
    pin = true,
    onhover,
    onpick,
    ondrawn,
    lens,
  }: {
    src: string;
    width: number;
    height: number;
    tip?: (spot: BoardSpot) => string | undefined;
    pin?: boolean;
    onhover?: (spot: BoardSpot | undefined) => void;
    onpick?: (spot: BoardSpot | undefined) => void;
    ondrawn?: (drawing: { width: number; height: number; inline: boolean }) => void;
    lens?: LensView;
  } = $props();

  /**
   * The drawing fills its box, and the box is the page's to size. The
   * drawing's own `width` and `height` are its intrinsic size and would
   * otherwise win over the box.
   *
   * Where something is said about a name, the cursor says so before anything
   * is: that is the whole of how a reader learns there is something to find.
   */
  const sheet = $derived(
    ':host { display: block; } svg { display: block; width: 100%; height: auto; }' +
      (tip ? ' [data-layer] { cursor: help; }' : '') +
      // What a lens leaves out recedes, and nothing is made heavier: the
      // ground of each seat stays, so the board keeps its shape.
      ' [data-seat] > * { transition: opacity 0.15s ease-out; }' +
      ' svg.lensed [data-seat] > :not(rect):not([data-lens="lit"]) { opacity: 0.16; }' +
      ' @media (prefers-reduced-motion: reduce) { [data-seat] > * { transition: none; } }' +
      ' @media print { svg.lensed [data-seat] > * { opacity: 1; } }',
  );

  let frame: HTMLDivElement | undefined = $state();
  let host: HTMLDivElement | undefined = $state();
  let root: ShadowRoot | undefined;
  /** Whether the shadow root holds a drawing yet. Until it does, the picture shows. */
  let inline = $state(false);
  /** The address of what is on screen now, in either form. */
  let drawn = $state<string>();

  $effect(() => {
    const wanted = src;
    const target = host;
    const style = sheet;
    if (!target) return;

    const controller = new AbortController();
    fetch(wanted, { signal: controller.signal })
      .then((response) => (response.ok ? response.text() : Promise.reject(response.status)))
      .then((svg) => {
        root ??= target.attachShadow({ mode: 'open' });
        // The drawing is this site's own, from its own endpoint, and holds no
        // script: it is set as markup the way the picture was set as pixels.
        root.innerHTML = `<style>${style}</style>${svg}`;
        inline = true;
        drawn = wanted;
        const drawing = root.querySelector('svg');
        if (drawing) {
          ondrawn?.({
            width: Number(drawing.getAttribute('width')),
            height: Number(drawing.getAttribute('height')),
            inline: true,
          });
        }
        // A tip over a name that was on the last board is a tip over nothing.
        over = picked = undefined;
      })
      .catch(() => {});
    return () => controller.abort();
  });

  /**
   * The lens, set on the drawing as one attribute per name: `lit` or nothing.
   * Re-applied whenever a new drawing arrives, since the marks are new.
   */
  $effect(() => {
    const view = lens;
    void drawn;
    if (!inline || !root) return;
    const drawing = root.querySelector('svg');
    if (!drawing) return;
    drawing.classList.toggle('lensed', view?.active ?? false);
    for (const seat of root.querySelectorAll('[data-seat]')) {
      const number = seat.getAttribute('data-seat');
      for (const name of seat.querySelectorAll(':scope > [data-layer]')) {
        const key = `${number}:${name.getAttribute('data-layer')}` as SpotKey;
        if (view?.active && view.lit.has(key)) name.setAttribute('data-lens', 'lit');
        else name.removeAttribute('data-lens');
      }
    }
  });

  /** The box of a name on the drawing, in the frame's own pixels. */
  function boxOf(key: SpotKey, origin: DOMRect) {
    const { seat, layer } = spotOfKey(key);
    const name = root?.querySelector(`[data-seat="${seat}"] > [data-layer="${layer}"]`);
    if (!name) return undefined;
    const box = name.getBoundingClientRect();
    return { x: box.left - origin.left, y: box.top - origin.top, width: box.width, height: box.height };
  }

  /** The frame's size, kept so that the relations follow the board when it is resized. */
  let size = $state({ width: 0, height: 0 });
  $effect(() => {
    const target = frame;
    if (!target) return;
    const watcher = new ResizeObserver(() => {
      size = { width: target.clientWidth, height: target.clientHeight };
    });
    watcher.observe(target);
    return () => watcher.disconnect();
  });

  /** The box of a whole palace, for framing the palaces of a pair. */
  function seatBox(seat: string, origin: DOMRect) {
    const group = root?.querySelector(`[data-seat="${seat}"] > rect`);
    if (!group) return undefined;
    const box = group.getBoundingClientRect();
    return { x: box.left - origin.left, y: box.top - origin.top, width: box.width, height: box.height };
  }

  /** The relations of the focus or of the pair, placed. */
  const laid = $derived.by(() => {
    void size;
    void drawn;
    if (!lens?.active || !inline || !frame) return undefined;
    if (lens.links.length === 0 && lens.seats.length === 0) return undefined;
    const origin = frame.getBoundingClientRect();
    const focus = lens.focus ? boxOf(lens.focus, origin) : undefined;
    const seats = lens.seats
      .map((seat) => seatBox(seat, origin))
      .filter((box): box is NonNullable<typeof box> => box !== undefined);
    type Box = NonNullable<ReturnType<typeof boxOf>>;
    const links: { from: Box; box: Box; relation: ShownRelation }[] = [];
    for (const link of lens.links) {
      const from = boxOf(link.from, origin);
      const box = boxOf(link.to, origin);
      if (from && box) links.push({ from, box, relation: link.relation });
    }
    return { focus, seats, links };
  });

  /** What the mouse rests on, and what a finger last tapped. */
  let over = $state<BoardSpot>();
  let picked = $state<BoardSpot>();

  function moved(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const spot = spotOf(event);
    if (sameSpot(spot, over)) return;
    over = spot;
    onhover?.(spot);
  }

  function left(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || over === undefined) return;
    over = undefined;
    onhover?.(undefined);
  }

  function pressed(event: MouseEvent): void {
    const spot = spotOf(event);
    onpick?.(spot);
    // A mouse has its tip already; a click is not asked to pin it.
    if (!pin || (event as PointerEvent).pointerType === 'mouse') return;
    picked = sameSpot(spot, picked) ? undefined : spot;
  }

  /**
   * Listened for on the box itself and not through attributes.
   *
   * An `onclick` attribute is delegated: Svelte listens at the root and walks
   * the event's path back to the handler. With the drawing in a shadow root
   * the handler was reached twice for one press, so a tap pinned its tip and
   * took it away again before it was ever drawn.
   */
  $effect(() => {
    const target = host;
    if (!target) return;
    target.addEventListener('pointermove', moved);
    target.addEventListener('pointerleave', left);
    target.addEventListener('click', pressed);
    return () => {
      target.removeEventListener('pointermove', moved);
      target.removeEventListener('pointerleave', left);
      target.removeEventListener('click', pressed);
    };
  });

  /** The tip shown, and where: over the middle of the name it is about. */
  const shown = $derived.by(() => {
    const spot = over ?? picked;
    if (!spot || !tip || !frame) return undefined;
    const words = tip(spot);
    if (!words) return undefined;
    const box = spot.element.getBoundingClientRect();
    const origin = frame.getBoundingClientRect();
    return {
      words,
      x: box.left + box.width / 2 - origin.left,
      y: box.top - origin.top,
    };
  });

  /**
   * How far the tip is pushed back inside the board.
   *
   * Centred over a name in a cell on the edge, a tip of six words runs off
   * the board and, on a phone, off the screen. Its width is known only once
   * it is set, so it is measured then and moved in by what it overran.
   */
  let tipped: HTMLSpanElement | undefined = $state();
  let nudge = $state(0);
  $effect(() => {
    if (!shown || !tipped || !frame) return;
    const half = tipped.offsetWidth / 2;
    const room = frame.clientWidth;
    nudge = Math.min(0, room - (shown.x + half)) + Math.max(0, half - shown.x);
  });
</script>

<svelte:window
  onkeydown={(event) => {
    if (event.key === 'Escape') over = picked = undefined;
  }}
  onpointerdown={(event) => {
    // A tap anywhere off the board puts a pinned tip away.
    if (picked && frame && !event.composedPath().includes(frame)) picked = undefined;
  }}
/>

<div class="frame" bind:this={frame}>
  <!-- Presses are read for the tip and for the caller, and the board is
       hidden from assistive technology: there is nothing here a keyboard was
       promised, and the table under it says every name in words. -->
  <div
    bind:this={host}
    class="board"
    class:settling={inline && drawn !== src}
    aria-hidden="true"
  >
    {#if !inline}
      <img
        {src}
        alt=""
        {width}
        {height}
        class:settling={drawn !== src}
        onload={(event) => {
          drawn = src;
          const picture = event.currentTarget as HTMLImageElement;
          ondrawn?.({ width: picture.naturalWidth, height: picture.naturalHeight, inline: false });
        }}
      />
    {/if}
  </div>
  {#if laid}
    <LensLinks width={size.width} height={size.height} focus={laid.focus} seats={laid.seats} links={laid.links} />
  {/if}
  {#if shown}
    <span
      class="tip"
      aria-hidden="true"
      bind:this={tipped}
      style:left="{shown.x + nudge}px"
      style:top="{shown.y}px"
    >
      {shown.words}
    </span>
  {/if}
</div>

<style>
  .frame { position: relative; }
  .board, img { transition: opacity 0.15s ease-out; }
  img { display: block; width: 100%; height: auto; }
  .settling { opacity: 0.35; }
  /*
   * Small, and set off the name rather than on it: over the top edge of the
   * register, so the name it is about stays readable under it. The colours
   * are the page's ink reversed, so it reads as the page's and not the
   * drawing's — a seventh thing in the palace is exactly what it must not
   * look like.
   */
  .tip {
    position: absolute;
    transform: translate(-50%, calc(-100% - 0.2rem));
    padding: 0.25rem 0.55rem;
    border-radius: 0.25rem;
    /* A step over the words the drawing sets under its names, so that what is
       said over a name reads as the page speaking and not as one more label
       of the board's — at the board's measure those are a little under 0.8rem. */
    font-size: 0.95rem;
    line-height: 1.3;
    /* One line where it fits, and wrapped where the board is narrower than
       the words: `max-content` is as wide as the line, and no wider than the
       board. */
    inline-size: max-content;
    max-inline-size: 100%;
    text-align: center;
    background: var(--ink);
    color: var(--ground);
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .board, img { transition: none; }
  }
  @media print {
    .settling { opacity: 1; }
    .tip { display: none; }
  }
</style>
