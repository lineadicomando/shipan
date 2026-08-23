<script lang="ts">
  import type { Translator } from '@shipan/i18n';
  import { rain, toggleRain } from '$lib/rain.svelte';

  let { t }: { t: Translator } = $props();
</script>

<!--
  雨, and the glyph is the whole face of the button.

  Everywhere else here a hanzi arrives with a gloss and a reading, because it
  is a *name* the engine computed with and the reader has to be able to say
  it. This one is not a name — it is a mark for what the button does, chosen
  the way the circle beside it was chosen: rain, for the thing that falls
  behind the page. So no gloss and no pinyin. What a reader operates it from
  is the label, which is in their own language on the tooltip and to a screen
  reader, and `aria-pressed` says which way it is set.
-->
<button
  type="button"
  onclick={toggleRain}
  aria-pressed={rain.falling}
  aria-label={t('rain.label')}
  title={t('rain.label')}
>
  <span aria-hidden="true">雨</span>
</button>

<style>
  /* The appearance button's own metrics, so the two sit as a pair: same
     colour, same quiet, and the glyph optically the size of the circle
     rather than the size of a line of text. */
  button {
    display: inline-flex;
    padding: 0.25rem;
    border: 0;
    background: none;
    color: var(--faint);
    cursor: pointer;
    line-height: 1;
    font-size: 1.05rem;
  }
  button:hover, button:focus-visible { color: var(--ink); background: none; }
  /* Set, once it is on, in the ink the page is read in — the same way the
     current language and the filled circle say where a switch stands. */
  button[aria-pressed='true'] { color: var(--ink); }
</style>
