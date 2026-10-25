<!--
  The key to the names on a board, under it in the page's own type.

  The drawings of 太乙, 七政四餘 and 紫微斗數 put a numeral beside each name
  they have no room to gloss, and the band under the figure used to say what
  each numeral is. Drawn in the figure it made the drawing twice as tall as it
  was wide, and a board that does not fit the window under its bar is read by
  scrolling. So the board is drawn without its band and the band is set here,
  under it, outside the column the lens grows in — read off the same numbering
  the drawing used (`taiyiKey`, `qizhengKey`, `ziweiKey` in `@shipan/plate`),
  so the two cannot disagree. 六壬's and 奇門's keys number nothing: they say
  how the names are said, and they are set here for the same reason.

  **The key follows the lens, as the board does.** Where the reader has laid
  one, the entries for the names it keeps in view stay as they are and the
  rest recede — matched on the hanzi, `inView` in `HeldLens`. Nothing is added
  and nothing moves: the key is under the board, and a reader who wants the
  words for what they pressed scrolls to it.

  Each entry leads with its numeral where the board has one, then the word in
  the reader's language, then the name and its reading. One list per group,
  in the drawing's order: nothing here ranks.

  A group with no numerals (六壬's, 奇門's) is a run of short pairs and is set
  as one: several to a line, the name and its reading never parted. Laid out
  like a numbered list it put each entry in the numeral's two-character column,
  and every name and every reading went on a line of its own.

  As wide as the board, a numbered list runs in as many columns as fit. On
  paper as well, under the board: the sheet carries the board drawn the same
  way, so its numerals need the same key.
-->
<script lang="ts">
  import type { Said } from '@shipan/plate';
  import type { Translator } from '@shipan/i18n';

  let {
    t,
    groups,
    inView = new Set<string>(),
  }: { t: Translator; groups: readonly (readonly Said[])[]; inView?: ReadonlySet<string> } = $props();
</script>

{#if groups.length > 0}
  <section class="key" aria-label={t('cli.heading.readings')}>
    <p class="heading">{t('cli.heading.readings')}</p>
    {#each groups as group, index (index)}
      <ul class:plain={group.every((one) => one.index === undefined)}>
        {#each group as one, at (at)}
          <li class:receded={inView.size > 0 && !inView.has(one.hanzi)}>
            {#if one.index !== undefined}<span class="number">{one.index}</span>{/if}
            <span class="entry">
              {#if one.word}<span class="word">{one.word}</span>{/if}
              <span class="glyph">{one.hanzi} <i>{one.pinyin}</i></span>
            </span>
          </li>
        {/each}
      </ul>
    {/each}
  </section>
{/if}

<style>
  .key { font-size: 0.85rem; display: grid; gap: 0.6rem; }
  .heading { margin: 0; color: var(--faint); }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.15rem; }
  li { display: grid; grid-template-columns: 2ch minmax(0, 1fr); gap: 0.5rem; align-items: baseline; }
  .number { text-align: end; color: var(--faint); font-variant-numeric: tabular-nums; }
  .entry { display: flex; flex-wrap: wrap; gap: 0 0.5rem; }
  .glyph { color: var(--faint); }
  i { letter-spacing: 0.01em; }
  li { transition: opacity 0.15s ease-out; }
  /* The board's own recession, so the two read as one act of the reader's. */
  .receded { opacity: 0.3; }
  @media (prefers-reduced-motion: reduce) { li { transition: none; } }
  ul:not(.plain) { display: block; columns: 15rem; column-gap: 1.5rem; }
  ul:not(.plain) li { break-inside: avoid; margin-block-end: 0.15rem; }
  .plain { grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: 0.15rem 1rem; }
  .plain li { display: block; }
  .plain .entry { display: inline; }
  .plain .glyph { white-space: nowrap; }
  @media print {
    .key { break-inside: auto; }
    .receded { opacity: 1; }
    ul { columns: 3; display: block; }
    li { break-inside: avoid; }
  }
</style>
