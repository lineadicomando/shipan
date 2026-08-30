<!--
  Which schools laid the board, in words, under it.

  **The picture says this already and that is not enough.** The drawing carries
  the same lines — see `packages/plate/src/schools.ts` — but it is an `<img>`
  with `alt=""`: uncopyable, unreadable to a screen reader, and gone the moment
  a reader turns pictures off. The pillars were moved out of the picture for
  exactly that reason and this follows them.

  **The default is in here.** A reader who moved nothing is the one who does not
  know a choice was made for them, which is `docs/parameters.md` § "A declared
  default is not a hidden school", and the reason this is not a list of what was
  changed.

  Derived from `$lib/parameters`, so a school landing in the engine is a line
  here the same day and this file never learns what a school is.
-->
<script lang="ts">
  import type { Translator } from '@shipan/i18n';
  import { inForce } from '$lib/parameters';
  import Named from './Named.svelte';

  let {
    t,
    board,
    options = {},
    layers = undefined,
  }: {
    t: Translator;
    /** The section's own board, whose divergences are asked for beside the layers'. */
    board: string;
    /** The board's own options, as it came back carrying them. */
    options?: object;
    /**
     * The moment's, which is where the pillars' three are.
     *
     * Left out by a board that stands on no instant — 太乙, whose subject is a
     * year — and then the layers are not named at all: where the day begins is
     * an answer about a calendar that board never opened.
     */
    layers?: object | undefined;
  } = $props();

  const standing = $derived(inForce(board, options, layers));
</script>

{#if standing.length > 0}
  <section class="schools">
    <h2>{t('cli.heading.divergences')}</h2>
    <dl>
      {#each standing as { row, value } (row.board + row.id)}
        <dt><Named text={t(row.label!)} /></dt>
        <dd><Named text={t(row.says![value]!)} /></dd>
      {/each}
    </dl>
  </section>
{/if}

<style>
  /*
   * Small and quiet, and never absent. It is not a finding — nothing here was
   * read off the board — so it is set like the note under a drawing rather
   * than like a table of what fell where.
   */
  .schools { margin-top: 1.4rem; font-size: 0.85rem; color: var(--faint); }
  h2 { margin: 0 0 0.4rem; font-size: 0.85rem; font-weight: 500; }
  /*
   * A rule under each pair, because the two columns are far apart.
   *
   * The first column is as wide as the longest question in it, and one of them
   * is a whole clause — «when the chief and the chief's gate fall on the
   * central palace, they are read» — so the short questions ended a third of
   * the page short of their answers. Nothing but distance said which answer
   * belonged to which, and there are six of them stacked.
   *
   * The calendar and the almanac beside this are the same two columns and get
   * no rule: their terms are a word or two apiece, so the gap is a dozen pixels
   * and the eye crosses it unaided. A rule is drawn where it is needed and not
   * wherever the shape recurs.
   *
   * The cell is the tables' — `.reading` in `app.css` — so this reads as the
   * last of the page's rows rather than as a different kind of object, and the
   * column gap goes into that padding: two borders with a gap between them are
   * two rules, and what is wanted here is one that crosses.
   */
  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    margin: 0;
  }
  dt, dd {
    margin: 0;
    padding: 0.35rem 0.6rem;
    border-bottom: 1px solid var(--rule);
  }

  /* It belongs on a sheet: the paper copy travels furthest from the page. */
  @media print {
    .schools { color: var(--ink); }
  }
</style>
