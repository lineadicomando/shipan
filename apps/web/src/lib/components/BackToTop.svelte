<!--
  The way back up, on every page that is long enough to have lost its top.

  **One control rather than a return at the foot of each section.** The notes
  are five long pages, the register of sources is longer than any of them, and
  a reading of a chart runs to a screenful a theme; a link written into each
  of those is the same sentence repeated as many times as the page has parts,
  and a page that derives everything else from the engine has no business
  hand-writing nine of them. `docs/architecture.md`'s pattern holds here too:
  one rule, one home.

  **It scrolls and does not navigate.** An `<a href="#">` would put a fragment
  in the address bar, and an address here is frequently somebody's date, time
  and place of birth — a chart that was shared or bookmarked from this page
  would carry a stray `#` for the rest of its life. A button touches nothing.

  **It appears only once the top is gone**, a screenful down, so that its
  arrival means something. A control permanently in the corner is furniture,
  and the reader stops seeing it.

  Focus is left where the press left it. The button hides itself on arrival,
  which drops focus to the document body, and the next Tab therefore starts
  from the top of the page — which is where the reader has just asked to be.

  **An arrow and no word.** The rule about a control whose face is a glyph is
  about hanzi, and its whole errand is that a reader who does not read Chinese
  cannot say, search or ask about a name printed as a shape. An arrow is not a
  name: it names nothing, nobody has to pronounce it, and up is what it means
  in every interface this reader has ever used. The word is in the accessible
  name, which is where a reader who cannot see the arrow needs it.
  → `docs/i18n.md`
-->
<script lang="ts">
  import type { Translator } from '@shipan/i18n';
  import Icon from './Icon.svelte';

  let { t }: { t: Translator } = $props();

  let scrollY = $state(0);
  let innerHeight = $state(0);

  /** A screenful. Below it the top of the page is still on the page. */
  const far = $derived(scrollY > innerHeight);

  const toTop = () => {
    /* The one animation on this control, and it is refused where the reader
       has said they do not want one — a page that jumps is the accessible
       behaviour there, not the degraded one. */
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
  };
</script>

<svelte:window bind:scrollY bind:innerHeight />

{#if far}
  <button
    type="button"
    class="quiet-button"
    aria-label={t('nav.top')}
    title={t('nav.top')}
    onclick={toTop}
  >
    <Icon name="up" />
  </button>
{/if}

<style>
  /*
   * In the corner the reader's thumb is already in, and clear of the shell's
   * edge by the shell's own gutter — the same `clamp` the layout spends on
   * its padding, so the button sits over the margin rather than over the text
   * wherever there is a margin to sit in.
   */
  button {
    position: fixed;
    right: clamp(0.75rem, 4vw, 1.25rem);
    bottom: clamp(0.75rem, 4vw, 1.25rem);
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    /* The arrow alone, so the box is square and the size is the mark's rather
       than a line of text's: 1rem draws a target of about 34px a side, which
       is what a thumb wants and what the word used to buy on its own. */
    font-size: 1rem;
    line-height: 1;
    padding: 0.5rem;
    /*
     * A ground under it, where `.quiet-button` is transparent everywhere else.
     * The others sit in the page's own background; this one sits over
     * whatever it has scrolled past, and a bordered box with text showing
     * through is the one thing on this site nobody could read.
     */
    background: var(--ground);
  }

  /* A sheet does not scroll, and there is nothing on it to return to. */
  @media print {
    button { display: none; }
  }
</style>
