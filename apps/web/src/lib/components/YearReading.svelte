<!--
  A board of the year or of the month said in full: the pillar it was laid on,
  the period that gave its 局, the 局, the chief and its gate, and the nine
  palaces.

  The words under the drawing, as `ChartReading` is to the hour board's. One
  table where the hour board's has several: the year board carries what its
  holders lay — two plates of stems, nine stars, eight gates and eight spirits —
  and nothing weighed against a season, which a year has none of.
-->
<script lang="ts">
  import { glyph } from '$lib/glyph';
  import type { MessageKey, Translator } from '@shipan/i18n';
  import type { MonthChart, YearChart } from '@shipan/core';

  /** The board as data, not as a type: see `ChartReading`. */
  let { chart, t }: { chart: YearChart | MonthChart; t: Translator } = $props();

  const gloss = (prefix: string, id: string): string => t(`label.${prefix}.${id}` as MessageKey);
  /** The palace the centre lodges in, where its stem is read. */
  const host = $derived(chart.palaces.find((cell) => cell.lodged));
</script>

<!-- What the board was laid off, as the caption the ju is to an hour board. -->
<div class="cast">
  {#if 'month' in chart}
    <p class="year">
      {t('cli.field.monthPillar')}
      <span class="glyph">{glyph(chart.month)}</span>
      · {t('cli.field.yearPillar')}
      <span class="glyph">{glyph(chart.year)}</span>
      · {t('cli.value.yinDun')} {chart.ju.number}
    </p>
    <p class="period">
      {t('cli.value.monthPeriod', {
        yuan: `${gloss('yuan', chart.yuan.id)} ${glyph(chart.yuan)}`,
        opener: glyph(chart.yuan.opener),
        year: String(chart.yuan.opened),
      })}
    </p>
  {:else}
    <p class="year">
      {t('cli.field.yearPillar')}
      <span class="glyph">{glyph(chart.year)}</span>
      · {t('cli.value.yinDun')} {chart.ju.number}
    </p>
    <p class="period">
      {t('cli.value.yearPeriod', {
        yuan: `${gloss('yuan', chart.yuan.id)} ${glyph(chart.yuan)}`,
        year: String(chart.yuan.opened),
      })}
    </p>
  {/if}
</div>

<dl class="anchors">
  <div>
    <dt>{t('cli.field.chief')}</dt>
    <dd>
      {gloss('star', chart.chief.star.id)} <span class="glyph">{glyph(chart.chief.star)}</span>
      → {gloss('palace', chart.chief.palace.id)}
      <span class="glyph">{glyph(chart.chief.palace)}</span>
    </dd>
  </div>
  <div>
    <dt>{t('cli.field.chiefGate')}</dt>
    <dd>
      {gloss('gate', chart.chiefGate.gate.id)} <span class="glyph">{glyph(chart.chiefGate.gate)}</span>
      → {gloss('palace', chart.chiefGate.palace.id)}
      <span class="glyph">{glyph(chart.chiefGate.palace)}</span>
    </dd>
  </div>
</dl>

<table class="palaces">
  <thead>
    <tr>
      <th scope="col">{t('cli.column.palace')}</th>
      <th scope="col">{t('cli.column.earth')}</th>
      <th scope="col">{t('cli.column.heaven')}</th>
      <th scope="col">{t('cli.column.star')}</th>
      <th scope="col">{t('cli.column.gate')}</th>
      <th scope="col">{t('cli.column.spirit')}</th>
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
          <span>{gloss('stem', cell.earth.id)}</span>
          <span class="glyph">{glyph(cell.earth)}</span>
        </td>
        <td>
          <span>{gloss('stem', cell.heaven.id)}</span>
          <span class="glyph">{glyph(cell.heaven)}</span>
        </td>
        <td>
          <span>{gloss('star', cell.star.id)}</span>
          <span class="glyph">{glyph(cell.star)}</span>
        </td>
        <td>
          {#if cell.gate}
            <span>{gloss('gate', cell.gate.id)}</span>
            <span class="glyph">{glyph(cell.gate)}</span>
          {:else}<span class="glyph">{t('cli.none')}</span>{/if}
        </td>
        <td>
          {#if cell.spirit}
            <span>{gloss('spirit', cell.spirit.id)}</span>
            <span class="glyph">{glyph(cell.spirit)}</span>
          {:else}<span class="glyph">{t('cli.none')}</span>{/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
{#if host?.lodged}
  <p class="lodged">
    {t('cli.field.lodged', {
      palace: `${host.palace.number} ${gloss('palace', host.palace.id)} ${glyph(host.palace)}`,
      stem: `${gloss('stem', host.lodged.id)} ${glyph(host.lodged)}`,
    })}
  </p>
{/if}

<style>
  /* The caption's measure is the board's, as under a drawing. */
  .cast { inline-size: var(--board); margin-inline: auto; text-align: center; }
  .year { font-size: 1.1em; margin: 0 0 0.25rem; }
  .period { margin: 0 0 0.35rem; color: var(--faint); }
  .cast .glyph { display: inline; margin-inline: 0.35rem; }
  .anchors { display: flex; flex-wrap: wrap; gap: 0.25rem 2rem; margin: 1rem 0 0.75rem; }
  .anchors div { display: flex; gap: 0.5rem; align-items: baseline; }
  .anchors dt { color: var(--faint); }
  .anchors dd { margin: 0; }
  .anchors .glyph { display: inline; margin-inline: 0.35rem; }
  /* A name is kept on its line, and the slack goes to the last column as
     `.reading` has it. */
  .palaces :is(th, td):not(:last-child) { white-space: nowrap; }
  @media (max-width: 34rem) {
    .palaces td { white-space: normal; }
  }
  /* The word leads; the name it renders sits under it, small. */
  th span:not(.glyph), td span:not(.glyph) { display: block; }
  .glyph { display: block; color: var(--faint); font-size: 0.8em; }
  .lodged { color: var(--faint); }
  @media print {
    .cast { inline-size: min(100%, 17cm); break-inside: avoid; }
    tr { break-inside: avoid; }
  }
</style>
