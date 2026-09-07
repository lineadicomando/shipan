<script lang="ts">
  import { glyph } from '$lib/glyph';
  import type { MessageKey, Translator } from '@shipan/i18n';

  /**
   * The gate over the palace, named.
   *
   * Takes the palaces rather than the chart, as `PalaceTable` does and for the
   * same reason. The rows are the eight that have a gate: the centre is a seat
   * and not a trigram, so it makes no hexagram, and a row saying so would be a
   * row about nothing.
   *
   * **The name and no more.** What the chapter this comes from reads in each
   * hexagram is declined entire, and `docs/refusals.md` § "The hexagram over a
   * palace" says which refusals it would cross.
   */
  let { palaces, t }: { palaces: readonly any[]; t: Translator } = $props();

  const gloss = (prefix: string, id: string): string => t(`label.${prefix}.${id}` as MessageKey);
</script>

<table class="hexagrams">
  <thead>
    <tr>
      <th scope="col">{t('cli.column.palace')}</th>
      <th scope="col">{t('cli.column.gate')}</th>
      <th scope="col">{t('cli.column.trigrams')}</th>
      <th scope="col">{t('cli.column.hexagram')}</th>
    </tr>
  </thead>
  <tbody>
    {#each palaces.filter((cell) => cell.hexagram) as cell (cell.palace.number)}
      <tr>
        <th scope="row">
          <span>{cell.palace.number} {gloss('palace', cell.palace.id)}</span>
          <span class="glyph">{glyph(cell.palace)}</span>
        </th>
        <td>
          <span>{gloss('gate', cell.gate.id)}</span>
          <span class="glyph">{glyph(cell.gate)}</span>
        </td>
        <!-- The rule in the act of being applied, which is why the column is
             here at all: the note under the table names it, and this shows it
             on the row the reader is looking at. -->
        <td class="pair">{cell.hexagram.upper.symbol} {cell.hexagram.lower.symbol}</td>
        <td>
          <!--
            The figure led out of the name and set large, which is the one
            place on the page it is treated as the subject rather than as a
            mnemonic beside one: it is what this column is about. So `glyph`
            is handed the name without it, rather than the pairing rule being
            written out here a second time and left to drift.
          -->
          <span class="figure">{cell.hexagram.symbol}</span>
          <span>{t(`label.hexagram.${cell.hexagram.number}` as MessageKey)}</span>
          <span class="glyph"
            >{glyph({ hanzi: cell.hexagram.hanzi, pinyin: cell.hexagram.pinyin })}</span
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  /*
   * Four columns and not six, so the slack `app.css` gives the last one is
   * enough to squeeze the other three to their minimum: at four columns that
   * minimum is a name broken over four lines, where at six it was a name over
   * two. The three that are names keep theirs on one line and the slack still
   * lands where nothing is read, which is what that rule was after.
   */
  .hexagrams :is(th, td):not(:last-child) { white-space: nowrap; }
  /*
   * The two trigrams set apart from the words, because they are the one column
   * here that is read as a picture: side by side they say «this over that» at
   * a glance, and a reader who takes nothing else from the column has still
   * seen the rule work.
   */
  .pair { letter-spacing: 0.1em; }
  /*
   * The figure larger than the text beside it. Six lines at the size of a word
   * are a smudge, and this is the one mark on the page a person can read
   * without knowing anything at all.
   */
  .figure { font-size: 1.7em; line-height: 1; vertical-align: -0.15em; }
</style>
