<!--
  The index: what this section is, and the way to the rest.

  It is the one page here that is prose alone, and the only one of the section
  a reader can arrive at from the footer — so it has to say what the section
  claims and then get out of the way. What each page answers is read off
  `NOTE_PAGES`, and so is whether it is derived, because that division is the
  section's own subject and not a note about its plumbing: a derived page
  cannot fall behind the engine, and a written one can, which is why it is the
  written ones that carry a date. Only the first half is labelled here — the
  date on a written page is the mark of the other half, and it stands where a
  reader is actually reading the prose it dates.

  **This page flows through two columns, as the privacy note does, and it is
  the second of the two places here where `column-count` is right.** The rest
  of the section opens on `NoteLeads` — a grid of two paragraphs answering each
  other — because what follows them is a table, a register or a set of headed
  entries, each with a measure of its own. Here there is nothing under the
  leads but six ways out of the page, so a grid gave two tracks of prose for
  four lines and then one narrow column of links against a great deal of
  nothing: a block that changes shape halfway down for no reason a reader can
  see. The whole of it is one short document — an opening claim and the doors
  — and a flow says the same thing at every height.

  So `NoteLeads` is not used here and its two paragraphs are set directly,
  which is what lets them flow: a grid dropped into a column is one
  unbreakable item, and the arrangement would be a component's shape fighting
  the page's. `Named` stays on both — these are still the paragraphs most
  likely to open on a glyph.
-->
<script lang="ts">
  import { NOTE_PAGES } from '$lib/notes';
  import Named from '$lib/components/Named.svelte';
  import PageHead from '$lib/components/PageHead.svelte';

  let { data } = $props();
  const t = $derived(data.t);

  /** Every page but this one: the index does not lead to itself. */
  const rest = NOTE_PAGES.filter((note) => note.slug);
</script>

<PageHead {t} />

<article>
  <!-- Outside the flow, so that it is the title of both columns rather than
       the first thing in the left one. -->
  <h1>{t('notes.title')}</h1>

  <div class="columns">
    <p class="lead"><Named text={t('notes.lead')} /></p>
    <p class="lead"><Named text={t('notes.claim')} /></p>

    <ul>
      {#each rest as note (note.slug)}
        <li>
          <a href="/{t.locale}/notes/{note.slug}">{t(note.title)}</a>
          {#if note.kind === 'derived'}<span class="kind">{t('notes.kind.derived')}</span>{/if}
          {#if note.answers}<span class="answers">{t(note.answers)}</span>{/if}
        </li>
      {/each}
    </ul>
  </div>
</article>

<style>
  /*
   * Two columns wide and no wider, on the privacy note's numbers: 24rem a
   * column and 1.6rem between them are what `NoteLeads` and `WrittenNotes`
   * use, so the measure is the site's — about fifty characters — and 50rem is
   * the width at which exactly two of them fit. Given the whole shell the
   * columns would simply grow, `column-width` being a minimum and not a cap.
   */
  article { max-width: 50rem; }
  h1 { margin-bottom: 1.4rem; font-size: 1.25rem; font-weight: 500; }

  /*
   * The flow, and the hairline in its gutter. A rule down the full height,
   * where `NoteLeads` draws a short centred mark instead: that is a grid, and
   * a reader stays inside a track. This is a flow, and a flow crosses the
   * gutter — the claim broken at the foot of the left column continues at the
   * head of the right one, and the mark is what says so at a glance. `--rule`
   * and not `--edge`: it divides two columns of a page and is not the boundary
   * of anything a reader clicks into.
   *
   * It collapses to one column by itself, at the same width every other pair
   * on this site collapses at, which is why a phone needs no rule saying so.
   */
  .columns {
    column-width: 24rem;
    column-gap: 1.6rem;
    column-rule: 1px solid var(--rule);
  }

  p { margin: 1rem 0; }

  /*
   * The list keeps the band it had around it and loses the measure it carried:
   * 40rem was a cap against the full width of the shell, and inside a 24rem
   * track there is nothing left for it to do.
   */
  ul { margin: 1.6rem 0 0; padding: 0; list-style: none; }
  li { margin: 0 0 1.1rem; }
  a { font-weight: 500; }
  .kind {
    margin-left: 0.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--faint);
  }
  .answers { display: block; margin-top: 0.15rem; color: var(--faint); font-size: 0.9rem; }

  /*
   * Where the flow may not break. An entry is a link and the sentence saying
   * what it answers, and the two parted by a column boundary are a door in one
   * place and its label in another.
   */
  li { break-inside: avoid; }
  p { orphans: 2; widows: 2; }

  /*
   * The head of the flow. A column that begins mid-document begins flush,
   * because a break carries no margin across it; the first column would
   * otherwise begin a line below the second. The heading above has already
   * said how far the text sits under it.
   */
  .columns > :first-child { margin-top: 0; }

  @media print {
    .kind, .answers { color: var(--ink); }
  }
</style>
