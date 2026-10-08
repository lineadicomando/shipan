<!--
  A board of the day said in full: what it was laid off, the nine palaces, and
  the twelve hours the day has in place of one.

  The words under the drawing, as `ChartReading` is to the hour board's. The
  table has three columns where the hour board's has six — there is no plate of stems under these gates and
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
  <!-- Guarded, as the hours below are: a board cached before the engine
       carried them comes back without. -->
  {#if chart.xishen}
    <div>
      <dt>{t('cli.field.xishen')} <span class="glyph">{glyph(chart.xishen)}</span></dt>
      <dd>
        {t('cli.value.xishenHour', {
          palace: `${gloss('palace', chart.xishen.palace.id)} ${glyph(chart.xishen.palace)}`,
          hour: `${gloss('branch', chart.xishen.hour.id)} ${glyph(chart.xishen.hour)}`,
        })}
      </dd>
    </div>
  {/if}
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

{#if chart.hours}
  <h2>{t('cli.heading.dayHours')}</h2>
  <table class="hours">
    <thead>
      <tr>
        <th scope="col">{t('cli.column.hour')}</th>
        <th scope="col">{t('cli.column.hourGod')}</th>
        <th scope="col">{t('cli.column.hourMarks')}</th>
      </tr>
    </thead>
    <tbody>
      {#each chart.hours as hour (hour.ganzhi.branch.id)}
        <tr>
          <th scope="row">
            <span>{gloss('branch', hour.ganzhi.branch.id)}</span>
            <span class="glyph">{glyph(hour.ganzhi)}</span>
          </th>
          <td>
            <span>{gloss('daygod', hour.god.id)}</span>
            <!-- The fortune is held to the reading, never left on a line alone. -->
            <span class="glyph">{glyph(hour.god)}{'\u00a0'}{hour.god.valence.hanzi}</span>
          </td>
          <td>
            {#each hour.marks as mark (mark.id)}
              <span>{gloss('hourmark', mark.id)}</span>
              <span class="glyph">{glyph(mark)}{mark.valence ? `\u00a0${mark.valence.hanzi}` : ''}</span>
            {:else}<span class="glyph">{t('cli.none')}</span>{/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

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
  /* Three short columns in a page's width: a name is kept on its line, and
     the slack goes to the last column as `.reading` has it. The last one
     wraps, as `HexagramTable`'s does; on a phone so does the god an hour
     treads, or the hours run 433px into 345 and the whole page scrolls
     sideways. Above a phone it may not, since the last column's slack would
     squeeze it to a word a line. */
  :is(.palaces, .hours) :is(th, td):not(:last-child) { white-space: nowrap; }
  @media (max-width: 34rem) {
    .hours td:not(:last-child) { white-space: normal; }
  }
  /* The word leads; the name it renders sits under it, small. */
  th span:not(.glyph), td span:not(.glyph) { display: block; }
  .glyph { display: block; color: var(--faint); font-size: 0.8em; }
  @media print {
    .cast { inline-size: min(100%, 17cm); break-inside: avoid; }
    tr { break-inside: avoid; }
  }
</style>
