<!--
  A board of the day said in full: what it was laid off, and the nine palaces.

  The whole board and not the words under a drawing of one: a day board has no
  picture yet, so the table is the board. It is a table of three columns where
  the hour board's has six — there is no plate of stems under these gates and
  no spirit over them — and the centre holds a star and no gate.
-->
<script lang="ts">
  import { glyph } from '$lib/glyph';
  import type { MessageKey, Translator } from '@shipan/i18n';
  import type { DayChart } from '@shipan/core';
  import CalendarAndAlmanac from './CalendarAndAlmanac.svelte';
  import PillarPlate from './PillarPlate.svelte';

  /** The board as data, not as a type: see `ChartReading`. */
  let { chart, t }: { chart: DayChart; t: Translator } = $props();

  const PILLARS = ['year', 'month', 'day', 'hour'] as const;
  const squares = $derived(
    PILLARS.map((position) => ({ position, ganzhi: chart.moment.pillars[position] })),
  );
  const gloss = (prefix: string, id: string): string => t(`label.${prefix}.${id}` as MessageKey);
  /** The two that move, found where the board put them: a name carries its reading. */
  const rest = $derived(chart.palaces.find((cell) => cell.palace.number === chart.rest.number)?.gate);
  const taiyi = $derived(
    chart.palaces.find((cell) => cell.palace.number === chart.taiyi.number)?.star,
  );
</script>

<!-- What the board was laid off, as the caption the ju is to an hour board. -->
<div class="cast">
  <p class="half">
    {chart.yang ? t('cli.value.yangDun') : t('cli.value.yinDun')} ·
    {gloss('term', chart.term.id)}
    <span class="glyph">{chart.term.hanzi} {chart.term.pinyin}</span>
  </p>
  <PillarPlate pillars={squares} {t} wide />
  <CalendarAndAlmanac moment={chart.moment} {t} />
</div>

<!-- The two things that move, each said once before the table shows where
     everything else stands behind it. -->
<dl class="anchors">
  <div>
    <dt>{t('cli.field.dayGate')}</dt>
    <dd>
      {#if rest}{gloss('gate', rest.id)} <span class="glyph">{glyph(rest)}</span>{/if}
      → {gloss('palace', chart.rest.id)}
      <span class="glyph">{glyph(chart.rest)}</span>
    </dd>
  </div>
  <div>
    <dt>{t('cli.field.dayStar')}</dt>
    <dd>
      {#if taiyi}{gloss('dayStar', taiyi.id)} <span class="glyph">{glyph(taiyi)}</span>{/if}
      → {gloss('palace', chart.taiyi.id)}
      <span class="glyph">{glyph(chart.taiyi)}</span>
    </dd>
  </div>
</dl>

<table class="palaces">
  <thead>
    <tr>
      <th scope="col">{t('cli.column.palace')}</th>
      <th scope="col">{t('cli.column.gate')}</th>
      <th scope="col">{t('cli.column.star')}</th>
    </tr>
  </thead>
  <tbody>
    {#each chart.palaces as cell (cell.palace.number)}
      <tr>
        <th scope="row">
          <span>{cell.palace.number} {gloss('palace', cell.palace.id)}</span>
          <span class="glyph">{glyph(cell.palace)}</span>
        </th>
        <td>
          {#if cell.gate}
            <span>{gloss('gate', cell.gate.id)}</span>
            <span class="glyph">{glyph(cell.gate)}</span>
          {:else}<span class="glyph">{t('cli.none')}</span>{/if}
        </td>
        <td>
          <span>{gloss('dayStar', cell.star.id)}</span>
          <span class="glyph">{glyph(cell.star)}</span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  /* The caption's measure is the board's, as under a drawing. */
  .cast { inline-size: var(--board); margin-inline: auto; }
  .half { font-size: 1.1em; margin: 0 0 0.35rem; text-align: center; }
  .half .glyph { display: inline; margin-left: 0.5rem; }
  .anchors { display: flex; flex-wrap: wrap; gap: 0.25rem 2rem; margin: 1rem 0 0.75rem; }
  .anchors div { display: flex; gap: 0.5rem; align-items: baseline; }
  .anchors dt { color: var(--faint); }
  .anchors dd { margin: 0; }
  .anchors .glyph { display: inline; margin-inline: 0.35rem; }
  /* The word leads; the name it renders sits under it, small. */
  th span:first-child, td span:first-child { display: block; }
  .glyph { display: block; color: var(--faint); font-size: 0.8em; }
  @media print {
    .cast { inline-size: min(100%, 17cm); break-inside: avoid; }
    tr { break-inside: avoid; }
  }
</style>
