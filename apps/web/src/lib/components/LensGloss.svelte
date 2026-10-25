<!--
  The names the lens keeps lit, each with its word and its reading.

  The whole key to a board's names stands under the board; this is the part of
  it the reader is looking at, under the circle, and nothing else. It follows
  what the reader pressed — a name, a pair, a kind, a phase — and says only
  what each lit name is called: no relation is glossed here, since the circle
  and the words under the board already name those, and a name is not a
  consequence.

  **A fixed height, scrolled inside.** The mode and the lens's controls stand
  under it, and a list that grew with every press would move the button the
  reader was about to press. Empty, it says what will appear in it.

  The focus first, where there is one, then the rest in the order the lens
  lit them; a name lit twice is said once.
-->
<script lang="ts">
  import type { Translator } from '@shipan/i18n';
  import { spotOfKey } from '$lib/lens';
  import type { HeldLens } from '$lib/held-lens.svelte';
  import Named from './Named.svelte';

  let { t, held }: { t: Translator; held: HeldLens } = $props();

  const names = $derived.by(() => {
    const view = held.view;
    const lens = held.lens;
    if (!view.active || !lens) return [];
    const keys = view.focus ? [view.focus, ...[...view.lit].filter((key) => key !== view.focus)] : [...view.lit];
    const said = new Set<string>();
    for (const key of keys) {
      const { seat, layer, id } = spotOfKey(key);
      // A key without an identifier is a whole layer of a seat: every name
      // standing there, or the one name the layer holds.
      const ids = id
        ? [id]
        : lens.things.filter((thing) => thing.seat === seat && thing.layer === layer).map((thing) => thing.id);
      for (const one of ids.length > 0 ? ids : [undefined]) {
        const name = held.nameAt(seat, layer, one);
        if (name) said.add(name);
      }
    }
    return [...said];
  });
</script>

{#if held.lens}
  <section class="gloss" aria-label={t('lens.gloss.heading')} aria-live="polite">
    <p class="heading">{t('lens.gloss.heading')}</p>
    {#if names.length > 0}
      <ul>
        {#each names as name (name)}
          <li><Named text={name} /></li>
        {/each}
      </ul>
    {:else}
      <p class="empty">{t('lens.gloss.empty')}</p>
    {/if}
  </section>
{/if}

<style>
  .gloss {
    font-size: 0.85rem;
    block-size: 9.5rem;
    overflow-y: auto;
    overscroll-behavior: contain;
    border-block: 1px solid var(--rule);
    padding-block: 0.4rem;
  }
  .heading { margin: 0 0 0.3rem; color: var(--faint); }
  .empty { margin: 0; color: var(--faint); }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.15rem; }
  li :global(.glyph) { color: var(--faint); }
</style>
