<!--
  What is deliberately not computed, one entry each.

  Written and not derived, which is the honest side of the line here: none of
  this moves when a board lands. A refusal is one of the few things in this
  project that can be written once and stay true — which is what makes it the
  right tenant of a page somebody has to keep.

  It is `docs/refusals.md` condensed and not copied. That file argues each
  refusal for a reader of the repository, with the sources it declines and the
  code that enforces it; this says what is refused, who wants it, and why it is
  not here, to somebody who has just met a board and is looking for the thing
  that is missing from it.

  **The index is the point of the block it opens.** A reader arrives holding
  one board with one thing missing from it, and seventeen entries answered by
  eight screens of scrolling is the page failing at the one errand it has.
-->
<script lang="ts">
  import NoteColumns from '$lib/components/NoteColumns.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import WrittenNotes from '$lib/components/WrittenNotes.svelte';
  import { REFUSALS } from '$lib/notes';

  let { data } = $props();
  const t = $derived(data.t);
</script>

<PageHead {t} />

<article>
  <h1>{t('notes.refusals.title')}</h1>

  <!-- The second of the two is the distinction the whole page rests on: an
       attribute of a configuration travels, an answer to somebody's situation
       does not. -->
  <NoteColumns
    {t}
    leads={['notes.refusals.lead', 'notes.refusals.carries']}
    label="notes.refusals.title"
    anchors={REFUSALS.map((refusal) => ({ id: refusal.id, title: refusal.title }))}
  />

  <WrittenNotes {t} entries={REFUSALS} />
</article>

<style>
  /* An entry of `WrittenNotes` caps itself at 40rem inside a track of its
     own, so this width is spent on the block above and on nothing else. */
  article { max-width: 50rem; }
  h1 { margin-bottom: 1.4rem; font-size: 1.25rem; font-weight: 500; }
</style>
