<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { appearance } from '$lib/appearance.svelte';
  import { HeldLens } from '$lib/held-lens.svelte';
  import { qizhengWords } from '$lib/lens-words';
  import type { QizhengBoard, QizhengLens } from '@shipan/core';
  import LensReading from '$lib/components/LensReading.svelte';
  import LensSide from '$lib/components/LensSide.svelte';
  import { momentQuery, sayFailure, sayPlace, type MomentInput } from '$lib/moment';
  import FormPanel from '$lib/components/FormPanel.svelte';
  import InlineBoard from '$lib/components/InlineBoard.svelte';
  import LayerLegend from '$lib/components/LayerLegend.svelte';
  import NameKey from '$lib/components/NameKey.svelte';
  import MomentForm from '$lib/components/MomentForm.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import Schools from '$lib/components/Schools.svelte';
  import QizhengReading from '$lib/components/QizhengReading.svelte';
  import SectionIntro from '$lib/components/SectionIntro.svelte';
  import Takeaway from '$lib/components/Takeaway.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';

  let { data } = $props();

  /**
   * How much taller than wide the drawing is, read off the drawing when it
   * arrives: what a board holds under its ring moves its height, so the
   * figure written on the picture is a placeholder. `--board` is worked out
   * from it, so the whole board stands in the window under the bar.
   */
  let aspect = $state(1450 / 900);
  const t = $derived(data.t);

  // svelte-ignore state_referenced_locally
  let asked = $state<MomentInput>({ ...data.moment });
  // svelte-ignore state_referenced_locally
  $effect(() => {
    asked = { ...data.moment };
  });

  const board = $derived(data.result?.qizheng);
  const moment = $derived(data.result?.moment);
  const failure = $derived(data.failure ? sayFailure(t, data.failure) : '');

  /**
   * Where the answer says it was cast, on the bar and on paper.
   *
   * The place if that is all there is, and the coordinates with it when they
   * were given: a line saying only «Roma» over a board laid at a pair of
   * degrees somebody typed would be claiming a place that was refined away.
   */
  const where = $derived(sayPlace(data.moment));

  let busy = $state(false);
  let panel: FormPanel | undefined = $state();

  // The address the answer was placed for, so the picture and the words agree.
  const address = $derived(
    momentQuery(
      {
        ...data.moment,
        date: moment?.input.date ?? data.moment.date,
        time: moment?.input.time ?? data.moment.time,
      },
      { lang: t.locale },
    ),
  );

  const plate = $derived(`/api/qizheng/plate?${address}&scheme=${appearance.current}&bare=true`);

  /**
   * The same board, drawn for paper.
   *
   * An `<img>` carries its colours in its address, so no stylesheet here can
   * turn a dark board light on its way to a printer. A second copy in the
   * light scheme, hidden on screen, warmed as soon as the board is placed —
   * `beforeprint` is synchronous and cannot wait for a picture. The same pair
   * both other boards draw, for the same reason.
   */
  const onPaper = $derived(appearance.current !== 'light');
  const paper = $derived(`/api/qizheng/plate?${address}&scheme=light&bare=true`);
  $effect(() => {
    if (!board || !onPaper) return;
    const warm = new Image();
    warm.src = paper;
    void warm.decode().catch(() => {});
  });

  /**
   * The lens: what the reader asked to see on the board, if anything. The
   * state, its fragment and what a press does are `HeldLens`'s; what is this
   * section's is how a name and a palace are said.
   */
  const lens = $derived<QizhengLens | undefined>(data.result?.lens);

  /** How the board's names and seats are said, shared with the consultation. */
  const words = $derived(qizhengWords(board as QizhengBoard | undefined, t));

  const held = new HeldLens({ lens: () => lens, t: () => t, words: () => words });

  async function submit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    busy = true;
    try {
      const query = momentQuery(asked);
      // The lens goes with it: it is in the fragment, and a new board is
      // looked at the same way.
      const fragment = held.fragment;
      await goto(`${page.url.pathname}${query ? `?${query}` : ''}${fragment ? `#${fragment}` : ''}`, {
        replaceState: true,
        noScroll: true,
        keepFocus: true,
      });
    } finally {
      busy = false;
    }
    if (!data.failure && data.result) await panel?.close();
  }
</script>

<svelte:window onclick={held.pressedOutside} onkeydown={held.escaped} />

<PageHead {t} />

<!-- The heading, and under it what this section is, said to somebody who has
     not met the art. Two paragraphs, two columns: see `SectionIntro`. -->
<SectionIntro {t} />

<FormPanel {t} bind:this={panel} closable={board !== undefined} onsubmit={submit}>
  {#snippet fields()}
    <MomentForm
      {t}
      bind:date={asked.date}
      bind:time={asked.time}
      bind:place={asked.place}
      bind:latitude={asked.latitude}
      bind:longitude={asked.longitude}
      bind:timezone={asked.timezone}
      bind:trueSolarTime={asked.trueSolarTime}
      bind:chosen={asked.chosen}
      board="qizheng"
    />
    <SubmitButton {t} label="cli.heading.qizheng" {busy} />
  {/snippet}
  {#snippet controls()}
    {#if board}
      <Takeaway {t} copyLabel="form.copyStars" copyUrl="/api/qizheng/text?{address}" {address} />
    {/if}
  {/snippet}

  {#snippet summary()}
    {data.moment.date || '—'}
    {data.moment.time}
    {where ? `· ${where}` : ''}
  {/snippet}
</FormPanel>

{#if failure}<p class="failure" role="alert">{failure}</p>{/if}

{#if board}
  <div class="result board-measure" class:stale={busy} aria-busy={busy} style:--aspect={aspect}>
    <!-- The bench: the board, and beside it the key to its names. See
         `docs/architecture.md` § "The bench". -->
    <div class="bench">
      <div class="board" class:swapped={onPaper}>
        <div class="screen">
          <InlineBoard
            src={plate}
            width={900}
            height={1450}
            tip={held.tip}
            onpick={held.pick}
            lens={held.view}
            ondrawn={(drawing) => (aspect = drawing.height / drawing.width)}
          />
        </div>
        {#if onPaper}<img src={paper} alt="" width="900" height="1450" class="paper" />{/if}
        <LayerLegend {t} board="qizheng" />
      </div>
      <div class="side">
        <!-- The circle, the names in view, the mode and the lens. -->
        <LensSide {t} {held} />
      </div>
      <!-- The key to the names, under the board and outside the column: what
           grows in the column as the lens is used must move nothing under it. -->
      <div class="under"><NameKey {t} groups={data.result?.key ?? []} /></div>
    </div>

    <!-- What the lens draws, said in words, at the page's measure. -->
    <LensReading {t} {held} />

    <div>
      <QizhengReading {board} {t} {moment} />
      <Schools
        {t}
        board="qizheng"
        options={board.options}
        layers={moment.options}
        laidBy={data.result?.laidBy}
      />
    </div>
  </div>
{/if}

<style>
  /*
   * One column, and what matters about it is that its floor is zero.
   *
   * The tables under the board ask for `min-width: max-content`: every cell
   * holds one short thing, and squashing them is worse than scrolling them,
   * which is why each of them sits in a frame of its own that scrolls. But an
   * `auto` track is at least as wide as what stands in it asks to be, and a
   * scrolling frame around a table asking for 44rem asks for 44rem all the
   * same — so on a narrow screen the column grew past the page and the *page*
   * scrolled sideways, which is the one thing the frames were there to
   * prevent. This board showed it first because its tables are the widest on
   * the site, but nothing about it was this board's.
   *
   * `minmax(0, 1fr)` is leave for the track to be narrower than its contents,
   * and it is what makes the frames work at all. The consultation has said it
   * since it was written.
   */
  .result {
    transition: opacity 0.15s ease-out;
    display: grid;
    gap: 2rem;
    grid-template-columns: minmax(0, 1fr);
  }
  .stale { opacity: 0.5; }

  /* Centred, at the measure every board on this site is drawn at: see
     `--board` in `app.css`. This one had 44rem of its own — wider than the
     other three because it carries a listing of eleven and a band of readings
     on top of the ring, and at their width the cells came out a third of the
     size and the listing smaller than the page's own smallest type. That
     argument was for a floor and it is answered by any measure above it; what
     it never argued for was a width no other board shares. */
  .board img, .screen { width: 100%; inline-size: var(--board); height: auto; display: block; margin-inline: auto; }
  .board .paper { display: none; }

  .failure { color: var(--alarm); }

  @media (prefers-reduced-motion: reduce) {
    .result { transition: none; }
  }

  /**
   * On paper.
   *
   * The picture swaps for the copy drawn in the colours of a sheet. What the
   * two tables under it owe a printer is settled in `QizhengReading`, where
   * the tables are.
   */
  @media print {
    .result { display: block; }
    /* Only where there is a copy to swap in: in the light scheme there is
       none, and hiding the board would print a sheet with a hole in it. */
    .swapped .screen { display: none; }
    .board .paper { display: block; }
    .board img, .screen { max-width: 26rem; }
  }
</style>
