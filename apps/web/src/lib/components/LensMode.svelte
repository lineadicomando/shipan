<!--
  The two things a reader reaches for most while using a lens: which mode it
  is laid in, and putting it away.

  Held at the top of the column with the circle of the five phases, so both
  are in the same place whatever the panel under them holds. «Whole board» is
  always there and is disabled when there is nothing to put away: a button
  that came and went would be a button nobody can find twice. The board also
  puts the lens away when pressed outside its palaces, and Escape does — the
  page holds those; this is the one that says so.
-->
<script lang="ts">
  import type { Translator } from '@shipan/i18n';
  import { WHOLE, oneAtATime, type LensState } from '$lib/lens';

  let {
    t,
    state,
    onchange,
  }: { t: Translator; state: LensState; onchange: (next: LensState) => void } = $props();

  const laid = $derived(
    Boolean(state.focus || state.pair || state.layers.length > 0 || state.phases.length > 0),
  );
</script>

<div class="mode" role="group" aria-label={t('lens.mode')}>
  <span class="lead">{t('lens.mode')}</span>
  <button type="button" aria-pressed={!state.expert} onclick={() => onchange(oneAtATime(state))}>
    {t('lens.mode.beginner')}
  </button>
  <button type="button" aria-pressed={state.expert} onclick={() => onchange({ ...state, expert: true })}>
    {t('lens.mode.expert')}
  </button>
  <button
    type="button"
    class="whole"
    disabled={!laid}
    onclick={() => onchange({ ...WHOLE, expert: state.expert })}
  >{t('lens.whole')}</button>
</div>

<style>
  .mode { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; font-size: 0.9rem; }
  .lead { margin-inline-end: 0.35rem; }
  button {
    font: inherit;
    font-size: 0.85rem;
    padding: 0.15rem 0.55rem;
    border: 1px solid var(--edge, currentColor);
    border-radius: 999px;
    background: none;
    color: var(--ink);
    cursor: pointer;
  }
  button[aria-pressed='true'] { background: var(--ink); color: var(--ground); }
  /* Set apart from the two modes: it is an act, not a state. */
  .whole { margin-inline-start: auto; }
  .whole:disabled { opacity: 0.45; cursor: default; }
  @media print { .mode { display: none; } }
</style>
