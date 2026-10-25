<!--
  What a lens draws, said in words, at the page's measure: the relations of a
  pressed name, or the table between the two seats of a pair.

  Only while there is something to say: a name pressed, or a pair laid. Set
  in `.reading`, the measure everything read off a board is set at.
-->
<script lang="ts">
  import type { Translator } from '@shipan/i18n';
  import type { HeldLens } from '$lib/held-lens.svelte';
  import LensPair from './LensPair.svelte';
  import LensRelations from './LensRelations.svelte';

  let {
    t,
    held,
    seatName,
  }: {
    t: Translator;
    held: HeldLens;
    /** A seat in words, as the pair's heading says it. */
    seatName: (seat: string) => string;
  } = $props();
</script>

{#if held.lens && (held.view.focus || held.view.seats.length === 2)}
  <div class="reading">
    <LensRelations {t} lens={held.lens} view={held.view} focusName={held.focusName} nameAt={held.nameAt} seatPlace={held.seatPlace} />
    <LensPair {t} lens={held.lens} view={held.view} state={held.state} nameAt={held.nameAt} {seatName} seatPlace={held.seatPlace} />
  </div>
{/if}
