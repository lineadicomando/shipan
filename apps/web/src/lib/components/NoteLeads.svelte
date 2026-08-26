<!--
  The two paragraphs a page of the notes opens with, side by side.

  **The shape is `SectionIntro`'s, and the argument for it is there.** Two
  paragraphs across this shell are either one line of enormous measure, which
  is the hardest thing on the page to read, or a narrow strip of prose beside a
  great deal of nothing. Two tracks give each a measure of about fifty
  characters and halve the height of the block standing above what the reader
  came down the page for.

  **What is borrowed is the shape and not the register.** A section's
  introduction is set quiet and small over a form, because the form is what the
  page is about; these are the opening prose of a page whose whole content is
  prose, and they stay the size the rest of it is set in. The same arrangement,
  spent on a different kind of page, is why this is a second component rather
  than a flag on that one.

  **A grid of two tracks and not `column-count`.** A count flows one body of
  text through two boxes: the first paragraph would end halfway down the left
  and the second would begin under it and finish on the right, so a reader
  following either has to cross the gutter mid-sentence. One paragraph a track,
  each read straight down, is a grid — which also collapses by itself below the
  width at which two readable measures fit. That is what happens on a sheet,
  and it is why there is no print rule here.

  **Two, and the type says so.** The tuple is `PageMeta.intro`'s and is here
  for the same reason: this is a pair answering two questions, not a list that
  happens to hold two entries today. The sources page opens on a single
  paragraph and so cannot take this component — the check working, rather than
  a page left out.
-->
<script lang="ts">
  import type { MessageKey, Translator } from '@shipan/i18n';
  import Named from './Named.svelte';

  interface Props {
    t: Translator;
    leads: readonly [MessageKey, MessageKey];
  }

  let { t, leads }: Props = $props();
</script>

<div class="leads">
  {#each leads as lead (lead)}
    <!-- The names in them set apart, as everywhere else: these are the
         paragraphs most likely to open on a glyph, standing as they do under a
         heading that has just said in the reader's own language what the page
         is. -->
    <p><Named text={t(lead)} /></p>
  {/each}
</div>

<style>
  /*
   * `auto-fit` with a minimum rather than two fixed tracks and a media query:
   * the breakpoint is then the measure itself — a second track appears exactly
   * when two of them can hold a readable line — and the same rule serves a
   * phone, a window dragged to half a screen and a sheet of paper.
   *
   * 24rem is `SectionIntro`'s minimum and is not the same number of characters
   * here: these are set at the page's own size rather than at 0.9rem, so the
   * low end of the measure is about forty-eight characters instead of fifty.
   * Both are inside a comfortable measure, and one number kept across the two
   * blocks is what makes them read as the same arrangement.
   */
  .leads {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    /*
     * The row gap is what the paragraphs had between them as margins, kept for
     * the collapsed case where they stack. The column gap stays its own
     * number: at the row's distance the two would read as one block with an
     * accidental break in it.
     */
    gap: 1rem 1.6rem;
    /* The band around the block is the one the paragraphs carried themselves,
       so nothing above or below them moves. */
    margin: 1rem 0;
    /* A container, so the gutter's mark can be asked for at exactly the width
       the second track appears at — see below. */
    container-type: inline-size;
  }

  /*
   * A measure inside the track as well as around it: at the widest this block
   * is given, two tracks are wider than a line ought to be, and 40rem is what
   * these paragraphs were capped at before they were laid side by side.
   */
  .leads p {
    margin: 0;
    max-width: 40rem;
  }

  /*
   * The gutter, said with a mark rather than with distance — `SectionIntro`
   * argues it, and it is the same mark for the same reason: 1.6rem alone is
   * close enough that the two columns start to read as one paragraph broken
   * mid-line, and a hairline buys the separation back for a tenth of the width.
   * `--rule` and not `--edge`: this divides two columns of a page and is not
   * the boundary of anything a reader clicks into.
   *
   * Short and centred rather than as tall as the taller paragraph, which would
   * draw a box — and the two are of different lengths in every vernacular, so
   * a full-height rule would be a different mark in English and in Italian.
   * 1.5rem is the same fraction of the line here that 1.375rem is of the
   * smaller one there.
   *
   * The condition is the grid's own arithmetic and not a guessed breakpoint:
   * `auto-fit` gives a second track when the content box holds two 24rem
   * minimums and the 1.6rem between them, which is 49.6rem. Below it the
   * paragraphs stack, there is no gutter, and there is nothing to draw in it.
   */
  @container (min-width: 49.6rem) {
    .leads p + p {
      position: relative;
    }

    .leads p + p::before {
      content: '';
      position: absolute;
      left: -0.8rem;
      top: 50%;
      width: 1px;
      height: 1.5rem;
      margin-top: -0.75rem;
      background: var(--rule);
    }
  }
</style>
