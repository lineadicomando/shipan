<!--
  The controls of a lens: what to keep, and what a pressed name is related to.

  **Every control is something the reader does, and none is done for them.**
  Nothing here is on when the page opens, and nothing suggests where to start:
  the board is whole until somebody keeps a kind, keeps a phase, or presses a
  name on it (`docs/refusals.md` § "Where to look first"). Each button is a
  toggle and says so with `aria-pressed`; what it keeps leads in the reader's
  language, and a phase carries its hanzi and its reading beside the word.

  The key to the strokes is here and not on the board, for the reason the
  strengths have theirs beside it: the page can say it in the reader's own
  words, and the drawing would have to spend room on every chart to say it.
-->
<script lang="ts">
  import type { MessageKey, Translator } from '@shipan/i18n';
  import type { QimenLens } from '@shipan/core';
  import { glyph } from '$lib/glyph';
  import {
    BOARD_LAYERS,
    DRAWINGS,
    ELEMENTS,
    LINK_IDS,
    PHASE_LAYERS,
    WHOLE,
    type Drawing,
    type LensState,
    type ShownRelation,
  } from '$lib/lens';
  import { dashOf } from './LensLinks.svelte';

  let {
    t,
    lens,
    state,
    focusName,
    drawing,
    onchange,
    ondraw,
  }: {
    t: Translator;
    lens: QimenLens;
    state: LensState;
    /** The pressed name in words, where one is pressed and on this board. */
    focusName: string | undefined;
    drawing: Drawing;
    onchange: (next: LensState) => void;
    ondraw: (next: Drawing) => void;
  } = $props();

  const layerWord = (layer: string): string => t(`label.register.qimen.${layer}` as MessageKey);

  function toggle<T>(list: readonly T[], value: T): T[] {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  /** The relations the key shows: the five, and the two others. */
  const KEYED: readonly ShownRelation[] = ['wosheng', 'shengwo', 'woke', 'kewo', 'bihe', 'duigong', 'wuhe'];
</script>

<section class="lens" aria-label={t('lens.title')}>
  <p class="hint">{t('lens.hint')}</p>

  {#if state.focus && focusName}
    <div class="row">
      <span class="lead">{t('lens.focus', { thing: focusName })}</span>
      <button type="button" onclick={() => onchange({ ...state, focus: undefined })}>{t('lens.release')}</button>
    </div>
    <div class="row" role="group" aria-label={t('lens.toward')}>
      <span class="lead">{t('lens.toward')}</span>
      {#each PHASE_LAYERS as layer (layer)}
        <button
          type="button"
          aria-pressed={state.toward.includes(layer)}
          onclick={() => onchange({ ...state, toward: toggle(state.toward, layer) })}
        >{layerWord(layer)}</button>
      {/each}
    </div>
    <div class="row" role="group" aria-label={t('lens.kinds')}>
      <span class="lead">{t('lens.kinds')}</span>
      <button
        type="button"
        aria-pressed={state.shengke}
        onclick={() => onchange({ ...state, shengke: !state.shengke })}
      >{t('lens.shengke')}</button>
      {#each LINK_IDS as link (link)}
        <button
          type="button"
          aria-pressed={state.links.includes(link)}
          onclick={() => onchange({ ...state, links: toggle(state.links, link) })}
        >{t(`label.relation.${link}` as MessageKey)} <span class="glyph">{glyph(lens.names.relations[link])}</span></button>
      {/each}
    </div>
  {:else}
    <div class="row" role="group" aria-label={t('lens.layers')}>
      <span class="lead">{t('lens.layers')}</span>
      {#each BOARD_LAYERS as layer (layer)}
        <button
          type="button"
          aria-pressed={state.layers.includes(layer)}
          onclick={() => onchange({ ...state, layers: toggle(state.layers, layer) })}
        >{layerWord(layer)}</button>
      {/each}
    </div>
  {/if}

  <div class="row" role="group" aria-label={t('lens.phases')}>
    <span class="lead">{t('lens.phases')}</span>
    {#each ELEMENTS as element (element)}
      <button
        type="button"
        aria-pressed={state.phases.includes(element)}
        onclick={() => onchange({ ...state, phases: toggle(state.phases, element) })}
      >{t(`label.element.${element}` as MessageKey)} <span class="glyph">{glyph(lens.names.elements[element])}</span></button>
    {/each}
  </div>

  {#if state.focus && focusName}
    <div class="row" role="group" aria-label={t('lens.drawing')}>
      <span class="lead">{t('lens.drawing')}</span>
      {#each DRAWINGS as way (way)}
        <button type="button" aria-pressed={drawing === way} onclick={() => ondraw(way)}>
          {t(`lens.drawing.${way}` as MessageKey)}
        </button>
      {/each}
    </div>
    <div class="key">
      <p>{t('lens.key')}</p>
      <ul>
        {#each KEYED as relation (relation)}
          <li>
            <svg width="44" height="10" aria-hidden="true">
              <line x1="2" y1="5" x2="36" y2="5" stroke-dasharray={dashOf(relation)} />
              {#if relation === 'wosheng' || relation === 'woke'}<path d="M 36 1 L 43 5 L 36 9 Z" />{/if}
              {#if relation === 'shengwo' || relation === 'kewo'}<path d="M 9 1 L 2 5 L 9 9 Z" />{/if}
            </svg>
            {t(`label.relation.${relation}` as MessageKey)}
            <span class="glyph">{glyph(lens.names.relations[relation])}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if state.focus || state.layers.length > 0 || state.phases.length > 0}
    <div class="row">
      <button type="button" onclick={() => onchange(WHOLE)}>{t('lens.whole')}</button>
    </div>
  {/if}
</section>

<style>
  .lens {
    margin: 0 auto 1rem;
    inline-size: var(--board);
    max-inline-size: 100%;
    font-size: 0.9rem;
    display: grid;
    gap: 0.45rem;
  }
  .hint { margin: 0; color: var(--faint); }
  .row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; }
  .lead { margin-inline-end: 0.35rem; }
  button {
    font: inherit;
    font-size: 0.85rem;
    padding: 0.15rem 0.55rem;
    border: 1px solid var(--rule, currentColor);
    border-radius: 999px;
    background: none;
    color: var(--ink);
    cursor: pointer;
  }
  /* Pressed is said by the fill, which is the control's and not the board's. */
  button[aria-pressed='true'] { background: var(--ink); color: var(--ground); }
  button[aria-pressed='true'] .glyph { color: inherit; }
  .glyph { color: var(--faint); font-size: 0.85em; }
  .key p { margin: 0 0 0.2rem; color: var(--faint); }
  .key ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.2rem 1rem; }
  .key svg { vertical-align: middle; color: var(--ink); }
  .key line { stroke: currentColor; stroke-width: 1.6; }
  .key path { fill: currentColor; }
  @media print {
    .lens { display: none; }
  }
</style>
