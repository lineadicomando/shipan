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
-->
<script lang="ts">
  import { NOTE_PAGES } from '$lib/notes';
  import NoteLeads from '$lib/components/NoteLeads.svelte';
  import PageHead from '$lib/components/PageHead.svelte';

  let { data } = $props();
  const t = $derived(data.t);

  /** Every page but this one: the index does not lead to itself. */
  const rest = NOTE_PAGES.filter((note) => note.slug);
</script>

<PageHead {t} />

<article>
  <h1>{t('notes.title')}</h1>
  <NoteLeads {t} leads={['notes.lead', 'notes.claim']} />

  <ul>
    {#each rest as note (note.slug)}
      <li>
        <a href="/{t.locale}/notes/{note.slug}">{t(note.title)}</a>
        {#if note.kind === 'derived'}<span class="kind">{t('notes.kind.derived')}</span>{/if}
        {#if note.answers}<span class="answers">{t(note.answers)}</span>{/if}
      </li>
    {/each}
  </ul>
</article>

<style>
  /*
   * Wide enough for the two opening paragraphs to stand side by side, which
   * is 49.6rem — see `NoteLeads`. Everything under them keeps a measure of
   * its own: the list is four lines and a sentence apiece, and a sentence set
   * to the width two columns of prose need is the shape those two columns
   * exist to avoid.
   */
  article { max-width: 50rem; }
  h1 { font-size: 1.25rem; font-weight: 500; }

  ul { margin: 1.6rem 0; padding: 0; list-style: none; max-width: 40rem; }
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

  @media print {
    .kind, .answers { color: var(--ink); }
  }
</style>
