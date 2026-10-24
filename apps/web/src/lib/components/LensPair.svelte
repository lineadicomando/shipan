<!--
  Two palaces, and how what stands in one stands to what stands in the other.

  A table, because it is every thing of one palace against every thing of the
  other: five by five at most, which as lines over the board would be a web
  and as a grid is read in one look. The rows are the lower-numbered palace's
  and the columns the other's — Luoshu order, never the order they were
  pressed in — and each cell is a flow: → from the row to the column, ← the
  other way. So each relation is said once and both ways round, and neither
  palace is made the reader's (`pairTable` in `$lib/lens`).

  Each cell carries its relation as a sentence for a screen reader, since an
  arrow is a shape: «Fire yang 丙 bǐng generates Earth yang 戊 wù».

  Off paper, with the rest of the lens.
-->
<script lang="ts">
  import type { MessageKey, Translator } from '@shipan/i18n';
  import type { QimenLens } from '@shipan/core';
  import { glyph } from '$lib/glyph';
  import { PHASE_LAYERS, pairTable, type LensView } from '$lib/lens';

  let {
    t,
    lens,
    view,
    nameAt,
  }: {
    t: Translator;
    lens: QimenLens;
    view: LensView;
    nameAt: (seat: number, layer: string) => string | undefined;
  } = $props();

  const seats = $derived(view.seats);
  const cells = $derived(pairTable(lens, seats));
  const rows = $derived(PHASE_LAYERS.filter((layer) => cells.some((cell) => cell.row === layer)));
  const columns = $derived(PHASE_LAYERS.filter((layer) => cells.some((cell) => cell.column === layer)));
  const cellOf = (row: string, column: string) => cells.find((cell) => cell.row === row && cell.column === column);

  const palace = (seat: number): string => `${seat} ${nameAt(seat, 'palace') ?? ''}`;
  const layerWord = (layer: string): string => t(`label.register.qimen.${layer}` as MessageKey);

  /** The relations that are not a cell: 對宮 and 五合, where they were drawn. */
  const others = $derived(view.links.filter((link) => link.relation === 'duigong' || link.relation === 'wuhe'));
</script>

<div class="pair" aria-live="polite">
  {#if seats.length === 2}
    {@const [a, b] = seats as [number, number]}
    <p class="heading">{t('lens.pair.heading', { a: palace(a), b: palace(b) })}</p>
    <div class="scroller">
      <table>
        <thead>
          <tr>
            <td></td>
            {#each columns as column (column)}
              <th scope="col">
                <span>{layerWord(column)} · {b}</span>
                <span class="glyph">{nameAt(b, column)}</span>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each rows as row (row)}
            <tr>
              <th scope="row">
                <span>{layerWord(row)} · {a}</span>
                <span class="glyph">{nameAt(a, row)}</span>
              </th>
              {#each columns as column (column)}
                {@const cell = cellOf(row, column)}
                {@const one = nameAt(a, row) ?? ''}
                {@const other = nameAt(b, column) ?? ''}
                <td
                  aria-label={cell
                    ? cell.way === 'in'
                      ? t(`lens.flow.${cell.relation}.said` as MessageKey, { from: other, to: one })
                      : t(`lens.flow.${cell.relation}.said` as MessageKey, { from: one, to: other })
                    : undefined}
                >
                  {#if cell}
                    <span aria-hidden="true">
                      {cell.way === 'out' ? '→' : cell.way === 'in' ? '←' : '='}
                      {t(`lens.flow.${cell.relation}` as MessageKey)}
                    </span>
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="caption">{t('lens.pair.caption')}</p>
    {#if others.length > 0}
      <ul>
        {#each others as link, index (index)}
          {@const [fromSeat, fromLayer] = link.from.split(':') as [string, string]}
          {@const [toSeat, toLayer] = link.to.split(':') as [string, string]}
          <li>
            {nameAt(Number(fromSeat), fromLayer)} · {nameAt(Number(toSeat), toLayer)}:
            {t(`label.relation.${link.relation}` as MessageKey)}
            <span class="glyph">{glyph(lens.names.relations[link.relation])}</span>
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>

<style>
  .pair { margin: 0 auto; inline-size: var(--board); max-inline-size: 100%; font-size: 0.9rem; }
  .heading { margin: 0.5rem 0 0.3rem; }
  .scroller { overflow-x: auto; }
  table { border-collapse: collapse; min-inline-size: max-content; }
  th, td { padding: 0.25rem 0.5rem; text-align: start; vertical-align: top; border-block-end: 1px solid var(--rule, currentColor); }
  th span { display: block; }
  .glyph { color: var(--faint); font-size: 0.85em; }
  .caption { margin: 0.3rem 0 0; color: var(--faint); }
  ul { margin: 0.4rem 0 0; padding-inline-start: 1.1rem; }
  @media print { .pair { display: none; } }
</style>
