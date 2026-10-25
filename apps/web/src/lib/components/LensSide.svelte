<!--
  What a lens puts in the column beside a board: the circle of the five
  phases, the mode with «whole board» under it, then the lens's controls.

  The circle and the mode at the head of the column, in both modes, where
  nothing that grows below them can move them. Held by every section whose
  board has a lens, from the `HeldLens` the section holds; on a board whose
  answer carries no lens, nothing.
-->
<script lang="ts">
  import type { Translator } from '@shipan/i18n';
  import { activePhases } from '$lib/lens';
  import type { HeldLens } from '$lib/held-lens.svelte';
  import FiveWheel from './FiveWheel.svelte';
  import LensBar from './LensBar.svelte';
  import LensMode from './LensMode.svelte';

  let { t, held }: { t: Translator; held: HeldLens } = $props();
</script>

{#if held.lens}
  {@const lens = held.lens}
  <div class="held">
    <FiveWheel {t} {lens} active={activePhases(lens, held.state)} />
    <LensMode {t} state={held.state} onchange={(next) => (held.state = next)} />
  </div>
  <LensBar
    {t}
    {lens}
    state={held.state}
    focusName={held.focusName}
    pairSaid={held.pairSaid}
    way={held.way}
    onchange={(next) => (held.state = next)}
    onway={(next) => (held.way = next)}
  />
{/if}

<style>
  .held { display: grid; gap: 0.75rem; }
  @media print { .held { display: none; } }
</style>
