<!--
  What happens when a board is handed to a model.

  The second written page, and the one whose subject is not the engine but what
  leaves it. `docs/readings.md` is where the argument lives; this is what a
  reader who has just pressed a button that fills their clipboard is owed —
  what the prompt commissions, what it forbids, and what never left their
  browser at all.
-->
<script lang="ts">
  import NoteColumns from '$lib/components/NoteColumns.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import WrittenNotes from '$lib/components/WrittenNotes.svelte';
  import { READINGS } from '$lib/notes';

  let { data } = $props();
  const t = $derived(data.t);
</script>

<PageHead {t} />

<article>
  <h1>{t('notes.readings.title')}</h1>

  <NoteColumns
    {t}
    leads={['notes.readings.lead', 'notes.readings.computed']}
    label="notes.readings.title"
    anchors={READINGS.map((entry) => ({ id: entry.id, title: entry.title }))}
  />

  <WrittenNotes {t} entries={READINGS} />
</article>

<style>
  /* An entry of `WrittenNotes` caps itself at 40rem inside a track of its
     own, so this width is spent on the block above and on nothing else. */
  article { max-width: 50rem; }
  h1 { margin-bottom: 1.4rem; font-size: 1.25rem; font-weight: 500; }
</style>
