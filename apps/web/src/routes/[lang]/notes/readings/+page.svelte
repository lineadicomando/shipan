<!--
  What happens when a board is handed to a model.

  The second written page, and the one whose subject is not the engine but what
  leaves it. `docs/readings.md` is where the argument lives; this is what a
  reader who has just pressed a button that fills their clipboard is owed —
  what the prompt commissions, what it forbids, and what never left their
  browser at all.
-->
<script lang="ts">
  import NoteLeads from '$lib/components/NoteLeads.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import WrittenNotes from '$lib/components/WrittenNotes.svelte';
  import { READINGS } from '$lib/notes';

  let { data } = $props();
  const t = $derived(data.t);
</script>

<PageHead {t} />

<article>
  <h1>{t('notes.readings.title')}</h1>
  <NoteLeads {t} leads={['notes.readings.lead', 'notes.readings.computed']} />

  <WrittenNotes {t} entries={READINGS} />
</article>

<style>
  /*
   * Wide enough for the two opening paragraphs to stand side by side, which
   * is 49.6rem — see `NoteLeads`. What follows them keeps the measure it had:
   * an entry of `WrittenNotes` caps itself at 40rem, so this width is spent
   * on the block above and on nothing else.
   */
  article { max-width: 50rem; }
  h1 { font-size: 1.25rem; font-weight: 500; }
</style>
