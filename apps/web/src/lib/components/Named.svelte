<!--
  A sentence with names in it, each half set in the face its script asks for.

  **One component, because a name is set the same way wherever it is said.**
  `$lib/names` finds them and returns data; this is the only thing that turns
  that data into elements, so an introduction, a refusal and a note under a
  board cannot drift apart in how they draw 紫微斗數 zǐwēi dǒushù.

  **It takes the finished string and not a key.** A caller has the translator
  and frequently a parameter to interpolate — `notes.checked` wants a date —
  and a component that took a key would have to take the parameters with it.
  What it needs is prose, so prose is what it asks for.

  **Written without a break anywhere inside.** Whitespace between these tags
  is whitespace in the sentence, and the segments are one sentence cut up
  rather than a list of things.
-->
<script lang="ts">
  import { namesApart } from '$lib/names';

  let { text }: { text: string } = $props();
</script>

{#each namesApart(text) as segment, index (index)}{#if segment.part === 'glyph'}<span class="glyph">{segment.text}</span>{:else if segment.part === 'said'}<i>{segment.text}</i>{:else}{segment.text}{/if}{/each}

<style>
  /*
   * The face is the site's, and the size is a correction.
   *
   * `.glyph` in `app.css` says which family draws these and nothing about how
   * big: everywhere else on this site the glyphs stand in a board or a table,
   * where they are the content and their own size is the right one. Inside a
   * sentence they are not the content, and a CJK face set at the same
   * `font-size` as a Latin serif draws visibly larger — the em is filled where
   * a Latin lowercase leaves two thirds of it empty. 0.92 is what puts a
   * character on the same optical line as the words either side of it.
   *
   * Not `--faint`, which is what a glyph beside a gloss is given in a table.
   * Here the glyph *is* part of the sentence, and a name greyed out inside
   * running prose reads as an aside the reader may skip.
   */
  .glyph {
    font-size: 0.92em;
  }

  /*
   * The reading leans and keeps its spacing.
   *
   * A romanisation set in italic in a serif face tightens, and `zǐwēi dǒushù`
   * has tone marks stacked over half its vowels: a hair of tracking keeps the
   * diacritics off each other's stems without the word reading as spaced out.
   */
  i {
    letter-spacing: 0.01em;
  }
</style>
