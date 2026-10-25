<!--
  The relations a lens draws, said in words.

  The drawing and the lines over it are hidden from assistive technology, so
  this is where a reader who does not see the board is told the same thing —
  and where anybody can read it at leisure, since a line crossing three
  palaces is quicker seen than followed. One item per relation, in the order
  of the palaces and with no other order: the list ranks nothing.

  Announced politely when it changes, which is when somebody pressed a name.
  On paper it does not appear: a sheet carries the whole board.
-->
<script lang="ts">
  import type { MessageKey, Translator } from '@shipan/i18n';
  import type { Lens } from '@shipan/core';
  import { spotOfKey, type LensView } from '$lib/lens';

  let {
    t,
    lens,
    view,
    focusName,
    nameAt,
    seatPlace,
  }: {
    t: Translator;
    lens: Lens;
    view: LensView;
    focusName: string | undefined;
    /** A name on the board in words, from where the drawing marks it. */
    nameAt: (seat: string, layer: string, id?: string) => string | undefined;
    /** Where a name stands, in words: «palace 4», «first lesson». */
    seatPlace: (seat: string, layer?: string) => string;
  } = $props();

  const items = $derived(
    [...view.links]
      .map((link) => ({ ...spotOfKey(link.to), relation: link.relation }))
      .sort((a, b) => lens.seats.indexOf(a.seat) - lens.seats.indexOf(b.seat)),
  );
</script>

<div class="relations" aria-live="polite">
  {#if focusName && view.focus}
    <p class="heading">{t('lens.heading', { thing: focusName })}</p>
    {#if items.length === 0}
      <p>{t('lens.empty')}</p>
    {:else}
      <ul>
        {#each items as item (`${item.seat}:${item.layer}:${item.id ?? ''}:${item.relation}`)}
          <li>
            {nameAt(item.seat, item.layer, item.id)}
            <span class="where">({t('lens.at', {
              layer: t(`label.register.${lens.board}.${item.layer}` as MessageKey),
              where: seatPlace(item.seat, item.layer),
            })})</span>:
            {t(`lens.relation.${item.relation}` as MessageKey, { thing: focusName })}
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>

<style>
  .relations { font-size: 0.9rem; }
  .heading { margin: 0.5rem 0 0.3rem; }
  ul { margin: 0; padding-inline-start: 1.1rem; columns: 2 16rem; }
  .where { color: var(--faint); }
  @media print { .relations { display: none; } }
</style>
