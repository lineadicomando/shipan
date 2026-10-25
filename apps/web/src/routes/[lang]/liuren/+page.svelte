<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { appearance } from '$lib/appearance.svelte';
  import { glyph } from '$lib/glyph';
  import { HeldLens } from '$lib/held-lens.svelte';
  import type { LiurenBoard, LiurenLens } from '@shipan/core';
  import type { MessageKey } from '@shipan/i18n';
  import LensReading from '$lib/components/LensReading.svelte';
  import LensSide from '$lib/components/LensSide.svelte';
  import { momentQuery, sayFailure, sayPlace, type MomentInput } from '$lib/moment';
  import FormPanel from '$lib/components/FormPanel.svelte';
  import InlineBoard from '$lib/components/InlineBoard.svelte';
  import LayerLegend from '$lib/components/LayerLegend.svelte';
  import NameKey from '$lib/components/NameKey.svelte';
  import MomentForm from '$lib/components/MomentForm.svelte';
  import LiurenReading from '$lib/components/LiurenReading.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import Schools from '$lib/components/Schools.svelte';
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
  let aspect = $state(1379 / 900);
  const t = $derived(data.t);

  // svelte-ignore state_referenced_locally
  let asked = $state<MomentInput>({ ...data.moment });
  // svelte-ignore state_referenced_locally
  $effect(() => {
    asked = { ...data.moment };
  });

  const board = $derived(data.result?.liuren);
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

  /**
   * The lens: what the reader asked to see on the board, if anything. The
   * state, its fragment and what a press does are `HeldLens`'s; what is this
   * section's is how a name and a seat are said.
   */
  const lens = $derived<LiurenLens | undefined>(data.result?.lens);

  type Named = { id: string; hanzi: string; pinyin?: string };

  /**
   * What stands at a seat in a layer, and the catalog its word is in. A
   * palace of the ring is its branch: the heaven plate holds all twelve
   * branches, so the ground is found among them by its identifier.
   */
  function standing(seat: string, layer: string): { thing: Named; prefix: string } | undefined {
    const laid = board as LiurenBoard | undefined;
    if (!laid || !lens) return undefined;
    const ring = lens.pairSeats.indexOf(seat);
    if (ring !== -1) {
      if (layer === 'general') return { thing: laid.generals[ring] as Named, prefix: 'general' };
      if (layer === 'heaven') return { thing: laid.heaven[ring] as Named, prefix: 'branch' };
      if (layer === 'earth') {
        const ground = laid.heaven.find((branch) => branch.id === seat);
        return ground && { thing: ground, prefix: 'branch' };
      }
      return undefined;
    }
    const course = laid.courses.find((one) => String(one.number) === seat);
    if (course) {
      if (layer === 'upper') return { thing: course.upper, prefix: 'branch' };
      if (layer === 'lower') return { thing: course.lower, prefix: course.lowerIsStem ? 'stem' : 'branch' };
      return undefined;
    }
    const transmission = laid.transmissions.find((one) => one.position === seat);
    if (!transmission) return undefined;
    if (layer === 'branch') return { thing: transmission.branch, prefix: 'branch' };
    if (layer === 'general') return { thing: transmission.general, prefix: 'general' };
    if (layer === 'stem' && transmission.hiddenStem) return { thing: transmission.hiddenStem, prefix: 'stem' };
    return undefined;
  }

  /** A name on the board in words: its gloss, its hanzi and its reading. */
  function nameAt(seat: string, layer: string): string | undefined {
    const at = standing(seat, layer);
    if (!at) return undefined;
    return `${t(`label.${at.prefix}.${at.thing.id}` as MessageKey)} ${glyph(at.thing)}`;
  }

  /** A palace of the ring as a pair says it: its branch. */
  const seatName = (seat: string): string => nameAt(seat, 'earth') ?? seat;

  /** Where a name stands, after its layer: a palace, a lesson, a transmission. */
  function seatPlace(seat: string): string {
    if (lens?.pairSeats.includes(seat)) return t('lens.where.palace', { palace: seatName(seat) });
    if (['1', '2', '3', '4'].includes(seat)) return t(`label.course.${seat}` as MessageKey);
    return t(`lens.where.transmission.${seat}` as MessageKey);
  }

  const held = new HeldLens({ lens: () => lens, t: () => t, nameAt, seatName, seatPlace });

  let busy = $state(false);
  let panel: FormPanel | undefined = $state();

  // The address the answer was laid for, so the picture and the words agree.
  const address = $derived(
    momentQuery(
      { ...data.moment, date: moment?.input.date ?? data.moment.date, time: moment?.input.time ?? data.moment.time },
      { lang: t.locale },
    ),
  );

  const plate = $derived(`/api/liuren/plate?${address}&scheme=${appearance.current}&bare=true`);

  /**
   * The same board, drawn for paper.
   *
   * An `<img>` carries its colours in its address, so no stylesheet here can
   * turn a dark board light on its way to a printer. A second copy in the
   * light scheme, hidden on screen, warmed as soon as the board is laid —
   * `beforeprint` is synchronous and cannot wait for a picture. Exactly the
   * pair the chart draws, for exactly the reason set out there.
   */
  const onPaper = $derived(appearance.current !== 'light');
  const paper = $derived(`/api/liuren/plate?${address}&scheme=light&bare=true`);
  $effect(() => {
    if (!board || !onPaper) return;
    const warm = new Image();
    warm.src = paper;
    void warm.decode().catch(() => {});
  });

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
      board="liuren"
    />
    <SubmitButton {t} label="cli.heading.liuren" {busy} />
  {/snippet}
  {#snippet controls()}
    {#if board}
      <Takeaway {t} copyLabel="form.copyBoard" copyUrl="/api/liuren/text?{address}" {address} />
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
            height={1379}
            tip={held.tip}
            onpick={held.pick}
            lens={held.view}
            ondrawn={(drawing) => (aspect = drawing.height / drawing.width)}
          />
        </div>
        {#if onPaper}<img src={paper} alt="" width="900" height="1379" class="paper" />{/if}
        <LayerLegend {t} board="liuren" />
      </div>
      <div class="side">
        <!-- The circle, the mode and the lens, then the key to the names. -->
        <LensSide {t} {held} />
        <NameKey {t} groups={data.result?.readings ?? []} />
      </div>
    </div>

    <!-- What the lens draws, said in words, at the page's measure. -->
    <LensReading {t} {held} {seatName} />

    <div>
      <LiurenReading {board} {t} {moment} />
      <Schools
        {t}
        board="liuren"
        options={board.options}
        layers={moment.options}
        laidBy={data.result?.laidBy}
      />

    </div>
  </div>
{/if}

<style>

  /* One column with a floor of zero, so that the table under the board
     scrolls inside its own frame instead of widening the page. The same rule
     the 七政四餘 board carries, and written out where that one is: this board
     has the narrower tables and only broke at about 360px, which is a phone
     rather than a corner case. */
  .result {
    transition: opacity 0.15s ease-out;
    display: grid;
    gap: 2rem;
    grid-template-columns: minmax(0, 1fr);
  }
  .stale { opacity: 0.5; }

  /* Centred, as the chart's board is, and now at the chart's measure as well:
     `--board` in `app.css`. An earlier version pushed the picture to the
     margin so that it shared a left edge with the reading; sharing an **axis**
     is the same fix made on the right half — the words are centred as a block
     under it and stay left-aligned inside themselves, because a centred line
     of prose is a line nobody can come back to. */
  .board img, .screen { width: 100%; inline-size: var(--board); height: auto; display: block; margin-inline: auto; }
  .board .paper { display: none; }

  .failure { color: var(--alarm); }

  @media (prefers-reduced-motion: reduce) {
    .result { transition: none; }
  }

  /**
   * On paper.
   *
   * The picture swaps for the copy drawn in the colours of a sheet, and the
   * button that started the printing does not print itself. What the table
   * under it owes a printer is settled in `LiurenReading`, where the table is.
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
