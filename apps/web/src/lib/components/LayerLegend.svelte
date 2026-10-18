<!--
  What stands where in a seat of a board — on paper.

  A drawing says which layer a name belongs to by where it stands and in no
  other way: colour is the phase's, and the word under a name glosses the name
  and not its kind. On screen a pointer resting on a name is told which it is
  (`InlineBoard`). A sheet has no pointer, so there the same words are printed
  once, as a seat drawn empty with its places named: the arrangement is the
  same in every seat of a board, and saying it once is enough.

  One figure for each kind of seat whose places are told apart by position
  alone. What stands outside the seats — the lessons and transmissions of 六壬,
  the listing over 七政四餘's ring, 太乙's two eyes — carries its own word on
  the sheet already. 太乙 has two kinds of seat, and so two figures.

  On paper only, and that is the whole reason it exists. Nothing on it ranks:
  the places are set alike, because a gate in bold reads as the thing that
  matters most.

  A Qi Men day board lays its palace out otherwise and is not given this.
-->
<script lang="ts" module>
  import type { BoardLayer, MarkedBoard } from '@shipan/plate';

  /** One seat in miniature: its places as rows of a grid, and its caption. */
  interface Figure<B extends MarkedBoard> {
    readonly caption: 'form.layerLegend' | 'form.layerLegend.seat' | 'form.layerLegend.rim';
    /** Rows of the seat, each a row of `grid-template-areas`, top to bottom. */
    readonly rows: readonly (readonly BoardLayer<B>[])[];
  }

  /**
   * Each board's seats as the drawing lays them out, by the layers marked in
   * them. Every row of a figure is as wide as the others, a place written
   * twice where it spans the seat.
   */
  const FIGURES: { readonly [B in MarkedBoard]: readonly Figure<B>[] } = {
    qimen: [
      {
        caption: 'form.layerLegend',
        rows: [
          ['heaven', 'spirit'],
          ['earth', 'star'],
          ['palace', 'gate'],
        ],
      },
    ],
    liuren: [{ caption: 'form.layerLegend', rows: [['general'], ['heaven'], ['earth']] }],
    qizheng: [{ caption: 'form.layerLegend', rows: [['palace'], ['governor'], ['remainder'], ['house']] }],
    taiyi: [
      { caption: 'form.layerLegend', rows: [['number'], ['taiyi'], ['general']] },
      { caption: 'form.layerLegend.rim', rows: [['seat'], ['god']] },
    ],
    ziwei: [
      {
        caption: 'form.layerLegend.seat',
        rows: [['rings', 'rings'], ['star', 'star'], ['minor', 'minor'], ['ground', 'house']],
      },
    ],
  };

  /** The places of a figure once each, in reading order. */
  function places(rows: readonly (readonly string[])[]): string[] {
    return [...new Set(rows.flat())];
  }

  /** The figure's rows as `grid-template-areas`, and how many columns it has. */
  function areas(rows: readonly (readonly string[])[]): { template: string; columns: number } {
    return { template: rows.map((row) => `'${row.join(' ')}'`).join(' '), columns: rows[0]?.length ?? 1 };
  }
</script>

<script lang="ts">
  import { layerKey } from '$lib/board';
  import type { Translator } from '@shipan/i18n';

  let { t, board }: { t: Translator; board: MarkedBoard } = $props();
</script>

{#each FIGURES[board] as figure (figure.caption)}
  {@const grid = areas(figure.rows)}
  <figure class="legend">
    <figcaption>{t(figure.caption)}</figcaption>
    <!-- A list in reading order, laid out as the seat is. -->
    <ul style:grid-template-areas={grid.template} style:--columns={grid.columns}>
      {#each places(figure.rows) as place (place)}
        <li style:grid-area={place}>{t(layerKey(board, place))}</li>
      {/each}
    </ul>
  </figure>
{/each}

<style>
  .legend { display: none; }

  @media print {
    .legend {
      font-size: 0.8rem;
      color: var(--faint);
      margin: 0.6rem auto 0;
      display: grid;
      justify-items: center;
      gap: 0.3rem;
      /* Kept whole, and never kept with the board: a board as tall as a
         page would otherwise be carried to the next one to stay beside its
         key, and leave the first sheet blank under the heading. */
      break-inside: avoid;
    }
    figcaption { margin: 0; }
    /* The seat in miniature, as on the board. */
    ul {
      list-style: none;
      padding: 0.4rem 0.8rem;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
      gap: 0.2rem 1.6rem;
      border: 1px solid var(--rule);
    }
    li { text-align: center; }
  }
</style>
