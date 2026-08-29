<!--
  A written page of the notes: entries somebody keeps, each showing the day it
  was last held against the engine.

  The two written pages differ in one thing only — whether an entry names who
  asks for it — so they are one component and a flag rather than two files that
  would drift apart in their spacing and agree in nothing else. A refusal is
  worth stating together with who wants it, because a reader who came looking
  for the thing that is missing should meet themselves in the entry; a rule
  about handing a board to a model is nobody's request.

  **The date is the point of the whole arrangement.** It is shown, not filed:
  a paragraph carrying the day it was last checked is a weaker claim than one
  that does not, and weaker is what a written page should be beside the two
  derived ones. See `docs/notes.md`.

  **Two at a time, in the tracks the page opened in.** These are not one text
  to be read through: they are fifteen entries and nine, each answering its own
  question and each finished at its own heading — which is what makes a second
  column safe here and would not make it safe in a running argument. The page
  is halved in height, a reader scanning for the one refusal they came for
  passes twice as many headings a screen, and the measure inside a track is the
  measure `NoteLeads` set two blocks above.
-->
<script lang="ts">
  import Named from './Named.svelte';
  import type { Translator } from '@shipan/i18n';
  import type { WrittenEntry } from '$lib/notes';

  interface Props {
    t: Translator;
    entries: readonly WrittenEntry[];
  }

  let { t, entries }: Props = $props();

  /**
   * The day, in the reader's own calendar conventions.
   *
   * `dateStyle: 'long'` rather than a bare ISO string: the date is addressed
   * to a person weighing how stale a paragraph is, and `2026-08-22` is a
   * format for a machine. `T00:00` keeps it on the day it says — a bare
   * `new Date('2026-08-22')` is midnight UTC, which is the day before in every
   * zone west of Greenwich.
   */
  const said = (iso: string): string =>
    new Intl.DateTimeFormat(t.locale, { dateStyle: 'long' }).format(new Date(`${iso}T00:00`));
</script>

<div class="entries">
  {#each entries as entry (entry.id)}
    <!-- The entry's own identifier is the anchor, so a page opening on an
         index of these can send a reader to the one they came for. It is the
         same string `REFUSALS` and `SCHOOLS` are written with, which is why
         none is written here. -->
    <section id={entry.id}>
      <h2>{t(entry.title)}</h2>
      {#if entry.asks}
        <p class="asked">
          <span class="label">{t('notes.askedBy')}</span>
          <Named text={t(entry.asks)} />
        </p>
      {/if}
      <p><Named text={t(entry.body)} /></p>
      <p class="checked">{t('notes.checked', { date: said(entry.checked) })}</p>
    </section>
  {/each}
</div>

<style>
  /*
   * The same grid as `NoteLeads`, and deliberately the same numbers: 24rem a
   * track and 1.6rem between them, so the entries stand in the columns the
   * page's opening pair stood in rather than in a second arrangement that
   * happens to also be two of something. It collapses at the same width for
   * the same reason, which is why a sheet gets one column and needs no rule
   * saying so.
   *
   * `align-items: start` and not the default stretch. A row is as tall as its
   * longer entry and these are of every length; stretched, a two-line refusal
   * would carry its date eight lines below itself, at the foot of a box drawn
   * around nothing. Started, the white is simply where the shorter entry
   * stopped — which is what it is.
   *
   * No hairline in the gutter, and that is the difference from the opening
   * pair. There it divides two paragraphs that would otherwise read as one
   * broken mid-line; here every entry begins with a heading and ends with a
   * date, and a mark between two things already that clearly separated would
   * be drawing a table.
   *
   * The row gap is what stood between the entries when they were stacked, so
   * nothing about the vertical rhythm of the page moves.
   */
  .entries {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    gap: 2.2rem 1.6rem;
    align-items: start;
    margin-top: 2.2rem;
  }

  /* Binding only where the tracks have collapsed to one: inside a track the
     measure is the track's, and this is what it was before there were two.
     The band above is what a jump from the page's index has to clear — a
     heading against the top of the window reads as an entry that began
     mid-air. */
  section { max-width: 40rem; scroll-margin-top: 2.2rem; }
  h2 { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 500; }
  p { margin: 0.6rem 0; }
  .asked { color: var(--faint); font-size: 0.9rem; }
  .label { text-transform: lowercase; }
  /*
   * Quiet, and under the paragraph it qualifies rather than beside the
   * heading: it is not what the entry is about, it is how much of it to
   * believe today.
   */
  .checked { color: var(--faint); font-size: 0.8rem; }

  @media print {
    section { break-inside: avoid; }
    .asked, .checked { color: var(--ink); }
  }
</style>
