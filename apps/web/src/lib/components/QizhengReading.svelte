<script lang="ts">
  import Named from './Named.svelte';
  import type { MessageKey, Translator } from '@shipan/i18n';
  import type { Moment, QizhengBoard } from '@shipan/core';
  import CalendarAndAlmanac from './CalendarAndAlmanac.svelte';
  import { glyph } from '$lib/glyph';

  /**
   * A 七政四餘 board said in words, under the picture of it.
   *
   * Two tables and not one, because the board holds two frames at once and
   * neither is the other's approximation. The first is the eleven, each with
   * the 宿 it fell in and the degrees past that 宿's determinative star; the
   * second is the twelve palaces, each with the 人事宮 it took and whatever
   * came to stand there. A single table would have to choose which of the two
   * is the index, and both are.
   *
   * It takes the board as the API returns it. The client imports only types
   * from `core`, so the two standing notes and the phases are read off what
   * arrives rather than looked up: a value import would drag the ephemerides
   * and a native module into the browser bundle.
   */
  let { board, t, moment = null }: { board: QizhengBoard; t: Translator; moment?: Moment | null } = $props();

  const placed = $derived([...board.governors, ...board.remainders]);

  /** What stands in each palace, by the palace's index on the ring. */
  const standing = $derived(
    board.houses.map((seat) =>
      placed.filter((one) => one.palace.index === seat.palace.index),
    ),
  );

  const degrees = (value: number): string => `${value.toFixed(2)}°`;
</script>

<div class="reading">
  <p class="caption">
    {t('cli.field.minggong')}:
    <strong>{t(`label.ci.${board.minggong.ci.id}` as MessageKey)}</strong>
    <span class="glyph">{glyph(board.minggong.palace)} · {glyph(board.minggong.ci)}</span>
  </p>

  <h2>{t('cli.field.governors')}</h2>
  <div class="scroller">
    <table>
      <thead>
        <tr>
          <th scope="col">{t('cli.column.body')}</th>
          <th scope="col">{t('cli.column.inLodge')}</th>
          <th scope="col">{t('cli.column.inPalace')}</th>
          <th scope="col">{t('cli.column.motion')}</th>
        </tr>
      </thead>
      <tbody>
        {#each placed as one}
          <tr>
            <th scope="row">
              {t(`label.qizheng.${one.body.id}` as MessageKey)}
              <span class="glyph">{glyph(one.body)}</span>
            </th>
            <td>{glyph(one.lodge)} <span class="deg">{degrees(one.lodgeDegree)}</span></td>
            <td>{glyph(one.ci)} <span class="deg">{degrees(one.palaceDegree)}</span></td>
            <td class="way">
              {t(`label.motion.${one.motion}` as MessageKey)}
              <span class="glyph">{one.motion === 'ni' ? '逆 nì' : '順 shùn'}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <h2>{t('cli.field.houses')}</h2>
  <div class="scroller">
    <table class="palaces">
      <thead>
        <tr>
          <th scope="col">{t('cli.column.palace')}</th>
          <th scope="col">{t('cli.column.house')}</th>
          <th scope="col">{t('cli.column.standing')}</th>
        </tr>
      </thead>
      <tbody>
        {#each board.houses as seat, index}
          <tr>
            <th scope="row">
              {t(`label.ci.${seat.ci.id}` as MessageKey)}
              <span class="glyph">{glyph(seat.ci)}</span>
            </th>
            <td>
              {t(`label.house.${seat.house.id}` as MessageKey)}
              <span class="glyph">{glyph(seat.house)}</span>
            </td>
            <td class="standing">
              <!-- Most palaces hold nothing, which is what a sky looks like.
                   An empty cell says that better than a word for it would. -->
              {#each standing[index] as one, position}
                {position > 0 ? ' · ' : ''}<span class="glyph">{glyph(one.body)}</span>
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- The calendar this board was laid from and the almanac page it is read
       beside, named apart. One component with the chart's and the 六壬
       board's, so the three cannot drift. -->
  <CalendarAndAlmanac {moment} {t} />

  <!-- Both said where a reader is counting, and never in a footnote. The
       first answers whoever counted three names and expected four; the
       second answers whoever is holding an almanac open beside this and is
       about to conclude the degrees are wrong. -->
  <p class="note"><Named text={t('cli.value.threeRemainders')} /></p>
  <p class="note"><Named text={t('cli.value.qizhengFrame')} /></p>
</div>

<style>
  /* The reading's measure, the cells, the heading, the caption and the note are
     `.reading` in `app.css`, and the frame a wide table slides in is `.scroller`
     beside it. What is here is this board's own. */
  .glyph { color: var(--faint); font-size: 0.85em; }
  .deg { font-variant-numeric: tabular-nums; }
  .way { color: var(--faint); }
  /* Every cell holds one short thing and does not wrap, which is also what
     keeps the table from being squeezed under its own content. */
  th, td { white-space: nowrap; }

  /* The one column that wraps, and the one table that lets it.
     Every other cell here holds one short thing and says so by not wrapping,
     which is what keeps it from being squashed on a narrow screen. But a
     crowded palace holds four bodies, and a cell that cannot wrap is measured
     as though it never would — so the table went to its scrolling frame for the
     sake of the one row in twelve that needed the room. This column takes the
     lines it takes, and being the last one it takes the page's slack with them. */
  .palaces .standing { white-space: normal; min-inline-size: 10rem; }
</style>
