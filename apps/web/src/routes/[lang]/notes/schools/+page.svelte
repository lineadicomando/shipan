<!--
  What a school is here, and what it takes to name one.

  **The written half of a subject whose other half is derived, and the smaller
  half.** Which divergences exist, what values each has, which of them are
  computed and which is assumed — all of that is declared in the engine and
  shown on the instruments page, board by board; a school that lands appears
  there the day it lands. What no descriptor can carry is what a value named
  for a school *claims*, what the shelf owes before one may be declared, and
  why the count of them is a state rather than a design.

  It is `docs/parameters.md` condensed and not copied, as the refusals page is
  to `docs/refusals.md`: that file argues the rule for somebody changing the
  code, this says what it means for somebody reading a board that was laid one
  way and could have been laid another.
-->
<script lang="ts">
  import NoteColumns from '$lib/components/NoteColumns.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import WrittenNotes from '$lib/components/WrittenNotes.svelte';
  import { SCHOOLS } from '$lib/notes';

  let { data } = $props();
  const t = $derived(data.t);
</script>

<PageHead {t} />

<article>
  <h1>{t('notes.schools.title')}</h1>

  <!-- The second lead is the one the page rests on: a board is always laid by
       a school, and the reader who chose nothing is the one who has to be
       told which. -->
  <NoteColumns
    {t}
    leads={['notes.schools.lead', 'notes.schools.implicit']}
    label="notes.schools.title"
    anchors={SCHOOLS.map((entry) => ({ id: entry.id, title: entry.title }))}
  />

  <WrittenNotes {t} entries={SCHOOLS} />
</article>

<style>
  /* An entry of `WrittenNotes` caps itself at 40rem inside a track of its
     own, so this width is spent on the block above and on nothing else. */
  article { max-width: 50rem; }
  h1 { margin-bottom: 1.4rem; font-size: 1.25rem; font-weight: 500; }
</style>
