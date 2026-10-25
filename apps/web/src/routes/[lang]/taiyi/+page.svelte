<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { appearance } from '$lib/appearance.svelte';
  import { HeldLens } from '$lib/held-lens.svelte';
  import { taiyiWords } from '$lib/lens-words';
  import type { TaiyiBoard, TaiyiLens } from '@shipan/core';
  import LensReading from '$lib/components/LensReading.svelte';
  import LensSide from '$lib/components/LensSide.svelte';
  import { sayFailure } from '$lib/moment';
  import type { Unit } from '$lib/step';
  import InlineBoard from '$lib/components/InlineBoard.svelte';
  import LayerLegend from '$lib/components/LayerLegend.svelte';
  import NameKey from '$lib/components/NameKey.svelte';
  import { taiyiKeyOf } from '$lib/key';
  import MomentSteps from '$lib/components/MomentSteps.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import Schools from '$lib/components/Schools.svelte';
  import SectionIntro from '$lib/components/SectionIntro.svelte';
  import Takeaway from '$lib/components/Takeaway.svelte';
  import TaiyiReading from '$lib/components/TaiyiReading.svelte';

  /**
   * The 太乙 board of a year, which is the only page here with no form to
   * speak of.
   *
   * Every other section asks for an instant and most of them for a place. This
   * board is 太乙主天 and its subject is the year the world is standing in, so
   * the whole of the input is a number — and the whole of the address is that
   * number, which is why this is the first page on this site that can be
   * linked, shared, indexed and cached in public.
   *
   * That is why the fields never open into a panel. Everywhere else the
   * instant, the place and the school are a page of controls that withdraws
   * once it has answered; here there is one number, so what the other sections
   * are left with *after* they withdraw is the whole of it — a bar over the
   * board carrying the year, the two steps that move it, the way back to the
   * year being lived, and what can be done with the answer. A disclosure over
   * a single field is a door in front of a doorway.
   *
   * There is no prompt **here**, and that is now the ordinary rule rather than
   * a decision about this board. `/[lang]` is the only surface that builds one,
   * and since phase 21 this board is one of its instruments: a reader who wants
   * to hand a year to a model goes there, as they do for the other four. What
   * this section keeps is what every section that is an address keeps — the
   * board, its transcript, and the two ways out that do not involve asking
   * anything. See `docs/history/` phases 20 and 21.
   */
  let { data } = $props();

  /**
   * How much taller than wide the drawing is, read off the drawing when it
   * arrives: what a board holds under its ring moves its height, so the
   * figure written on the picture is a placeholder. `--board` is worked out
   * from it, so the whole board stands in the window under the bar.
   */
  let aspect = $state(1360 / 900);
  const t = $derived(data.t);

  const board = $derived(data.result?.taiyi);
  const failure = $derived(data.failure ? sayFailure(t, data.failure) : '');

  let busy = $state(false);

  /**
   * The year the drawing and the transcript are asked for.
   *
   * Read off the board rather than off the address, so that the picture beside
   * the reading is a picture of the reading: where the address names no year,
   * what «now» means was settled by the endpoint at 立春, and an address
   * repeated back here would ask the other endpoints the same open question
   * and could get a different answer across the boundary.
   */
  const address = $derived(`year=${board?.year}&lang=${t.locale}`);
  const plate = $derived(`/api/taiyi/plate?${address}&scheme=${appearance.current}&bare=true`);

  /**
   * The same board, drawn for paper.
   *
   * An `<img>` carries its colours in its address, so no stylesheet here can
   * turn a dark board light on its way to a printer. A second copy in the
   * light scheme, hidden on screen, warmed as soon as the board arrives —
   * `beforeprint` is synchronous and cannot wait for a picture. The same pair
   * every other board draws, for the same reason.
   */
  const onPaper = $derived(appearance.current !== 'light');
  const paper = $derived(`/api/taiyi/plate?${address}&scheme=light&bare=true`);
  $effect(() => {
    if (!board || !onPaper) return;
    const warm = new Image();
    warm.src = paper;
    void warm.decode().catch(() => {});
  });

  /**
   * The lens: what the reader asked to see on the board, if anything. The
   * state, its fragment and what a press does are `HeldLens`'s; what is this
   * section's is how a god and its seat are said. The words are the page's,
   * as the key's are (`lib/key.ts`): the endpoint is told no language.
   */
  const lens = $derived<TaiyiLens | undefined>(data.result?.lens);

  /** How the board's names and seats are said, shared with the consultation. */
  const words = $derived(taiyiWords(board as TaiyiBoard | undefined, t));

  const held = new HeldLens({ lens: () => lens, t: () => t, words: () => words });

  /**
   * Asking is navigating, and the answer arrives as the page's own data.
   *
   * `replaceState`, as on the chart: a year gets stepped a dozen times in a
   * row, and a back button that has to walk back through every one of them is
   * a back button nobody can use.
   */
  async function show(year: number | ''): Promise<void> {
    busy = true;
    try {
      // The lens goes with it: it is in the fragment, and a step of the year
      // is a new board looked at the same way.
      const fragment = held.fragment;
      await goto(`${page.url.pathname}${year === '' ? '' : `?year=${year}`}${fragment ? `#${fragment}` : ''}`, {
        replaceState: true,
        noScroll: true,
        keepFocus: true,
      });
    } finally {
      busy = false;
    }
  }

  /**
   * The year, typed rather than stepped.
   *
   * It stays a field beside the steps for the reason the day does on the
   * chart: the board of 1644 is one gesture away here and three hundred and
   * eighty presses away there. Nothing is submitted — the field *is* the form,
   * so changing it asks.
   */
  function jump(value: string): void {
    const year = Number(value);
    if (Number.isInteger(year) && year >= 1 && year <= 9999) void show(year);
  }

  function moved(_unit: Unit, by: number): void {
    // Stepped from the board on the page, so there is nothing to step from
    // when the year in the address was refused: the field and the way back to
    // the year being lived are how that gets corrected.
    if (board === undefined) return;
    const year = board.year + by;
    if (year >= 1 && year <= 9999) void show(year);
  }

  /** The year being lived, which the address says by saying nothing. */
  function now(): void {
    void show('');
  }
</script>

<svelte:window onclick={held.pressedOutside} onkeydown={held.escaped} />

<PageHead {t} />

<!-- The heading, and under it what this section is, said to somebody who has
     not met the art. Two paragraphs, two columns: see `SectionIntro`. -->
<SectionIntro {t} />

<!--
  The whole of the form, dressed and laid out as what the other sections leave
  behind: the field at the near end of the row, what moves it at the far end,
  and the clipboard and the printer on a line of their own under them.

  Not a `FormPanel`: there is nothing here to fold away, and a panel would put
  a «change the year» link in front of the one field it holds. But the shape
  of a closed one is what a reader arrives here already knowing, and a bar
  that dealt its three controls out differently because it had fewer of them
  would make somebody look for the printer twice.
-->
<div class="bar">
  <div class="row">
    <input
      type="number"
      class="year"
      inputmode="numeric"
      min="1"
      max="9999"
      value={data.asked ?? board?.year ?? ''}
      aria-label={t('form.year')}
      disabled={busy}
      onchange={(event) => jump(event.currentTarget.value)}
    />
    <MomentSteps
      {t}
      units={['year']}
      nowTitle="step.now.year"
      disabled={busy}
      values={{ year: String(board?.year ?? '') }}
      onstep={moved}
      onnow={now}
    />
  </div>
  <!-- The same corner in every section: finding them once is finding them
       everywhere. Only where there is something to take away. -->
  {#if board}
    <Takeaway {t} copyLabel="form.copyTaiyi" copyUrl="/api/taiyi/text?{address}" {address} />
  {/if}
</div>

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
            height={1360}
            tip={held.tip}
            onpick={held.pick}
            lens={held.view}
            ondrawn={(drawing) => (aspect = drawing.height / drawing.width)}
          />
        </div>
        {#if onPaper}<img src={paper} alt="" width="900" height="1360" class="paper" />{/if}
        <LayerLegend {t} board="taiyi" />
      </div>
      <div class="side">
        <!-- The circle, the mode and the lens. -->
        <LensSide {t} {held} />
      </div>
      <!-- The key to the names, under the board and outside the column: what
           grows in the column as the lens is used must move nothing under it. -->
      <div class="under"><NameKey {t} groups={data.result ? taiyiKeyOf(data.result.taiyi, t) : []} inView={held.inView} /></div>
    </div>

    <!-- What the lens draws, said in words, at the page's measure. -->
    <LensReading {t} {held} />

    <div>
      <TaiyiReading {board} {t} />
      <!-- Nothing to say today, and the mechanism saying it: 太乙's three
           parameters have one implemented value apiece, and a board of a year
           stands on no pillars. It is here so that the day 月計 lands the
           reader is told which register they are looking at. -->
      <Schools {t} board="taiyi" options={board.options} laidBy={data.result?.laidBy} />
    </div>
  </div>
{/if}

<style>
  /* The closed bar of a `FormPanel`, in the one section that never opens one:
     the box has to read as the same object here as it does everywhere else,
     because it is doing the same job. Its measurements are that panel's, and
     changing one of them here is how two boxes stop being one thing. */
  .bar {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border: 1px solid var(--rule);
    border-radius: 8px;
    background: var(--tint);
    padding: 0.5rem 0.8rem;
    margin-bottom: 2rem;
  }
  /*
   * The field at one end and what moves it at the other, as on the chart.
   *
   * `space-between` and not a row that fills from the left: on the chart the
   * fields sit at the near end and the steps at the far one, and it is the
   * ends that make the two bars the same bar — a stepper tucked against its
   * field here would read as a different control from the one over there.
   * `baseline`, so the year in the field and the year in the steps sit on one
   * line rather than on two that nearly agree. Takeaway keeps the corner it
   * keeps everywhere: in a column its own auto margin sends it to the end.
   */
  .row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.4rem 1rem;
    flex-wrap: wrap;
  }
  /* Dressed as the day is on the chart's bar: a field among text, not a form. */
  .year {
    width: 6rem;
    font-size: 0.9rem;
    padding: 0.15rem 0.35rem;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
  }

  /* `minmax(0, 1fr)` is leave for the track to be narrower than its contents,
     which is what makes the scrolling frames under the board work at all. See
     the same note on every other board's page. */
  .result {
    transition: opacity 0.15s ease-out;
    display: grid;
    gap: 2rem;
    grid-template-columns: minmax(0, 1fr);
  }
  .stale { opacity: 0.5; }

  .board img, .screen { width: 100%; inline-size: var(--board); height: auto; display: block; margin-inline: auto; }
  .board .paper { display: none; }

  .failure { color: var(--alarm); }

  @media (prefers-reduced-motion: reduce) {
    .result { transition: none; }
  }

  /* On a narrow screen the bar is most of the page, as the panel is: the rule
     and the inset cost more width than they are worth. */
  @media (max-width: 30rem) {
    .bar { padding: 0.5rem 0.6rem; margin-bottom: 1.4rem; }
  }

  /*
   * On paper.
   *
   * The picture swaps for the copy drawn in the colours of a sheet, and the
   * bar goes: a printed board is a board, and a control on it is furniture
   * nobody can use.
   */
  @media print {
    .bar { display: none; }
    .result { display: block; }
    /* Only where there is a copy to swap in: in the light scheme there is
       none, and hiding the board would print a sheet with a hole in it. */
    .swapped .screen { display: none; }
    .board .paper { display: block; }
    .board img, .screen { max-width: 26rem; }
  }
</style>
