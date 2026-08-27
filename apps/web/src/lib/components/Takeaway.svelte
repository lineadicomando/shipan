<!--
  What there is to do with an answer, on the bar the fields leave behind.

  One component for the sections that have anything: the chart, the board, and
  the consultation. Kept together and kept in one place because a row of
  buttons duplicated across seven pages is seven things to hold in step, and
  because where they *are* is part of what they are — top right of the bar,
  the same corner in every section, so that finding them once is finding them
  everywhere.

  Three errands and not one, because a reader who has a board in front of them
  wants one of three different things with it: the board itself in words, the
  address it can be laid at again, or a sheet. The middle one is the only one
  that is worth nothing to whoever pressed it and everything to whoever they
  send it to.

  Each carries a mark and its word. The mark is what makes the row findable
  at a glance; the word is what makes it usable by somebody who has not
  learned the mark yet. See `Icon.svelte` for why neither travels alone.
-->
<script lang="ts">
  import type { MessageKey, Translator } from '@shipan/i18n';
  import CopyLink from './CopyLink.svelte';
  import CopyText from './CopyText.svelte';
  import PrintButton from './PrintButton.svelte';

  interface Props {
    t: Translator;
    /** What the copy button offers, and where it fetches from. */
    copyLabel?: MessageKey;
    copyUrl?: string;
    /** Appended in the browser, because a question must not travel. */
    copySuffix?: string;
    /** Whether copying is the one thing anybody came to press. */
    lead?: boolean;
    /**
     * What the board is a function of, which is what makes this page a link
     * to *this* board rather than to the section it stands in.
     *
     * Given by the six sections and by nothing else. The consultation lays no
     * board at an address of its own — its address is a form, and a link to it
     * is a link to a consultation standing uncast — so what it has to hand
     * over is the section of the instrument it chose, written into the prompt
     * by `pageAddress` where it can travel with the board it names.
     */
    address?: string;
    print?: boolean;
  }

  let {
    t,
    copyLabel,
    copyUrl,
    copySuffix,
    lead = false,
    address,
    print = true,
  }: Props = $props();
</script>

<div class="takeaway">
  {#if copyLabel && copyUrl}
    <CopyText {t} label={copyLabel} url={copyUrl} suffix={copySuffix} {lead} />
  {/if}
  <!-- The two clipboards together and the sheet after them: what leaves by
       wire is one gesture with two answers, and what leaves on paper is
       another. -->
  {#if address}<CopyLink {t} {address} />{/if}
  {#if print}<PrintButton {t} />{/if}
</div>

<style>
  .takeaway {
    display: flex;
    align-items: baseline;
    gap: 0.2rem 0.8rem;
    flex-wrap: wrap;
    /* Pushed to the far end of the bar it is handed to, which is the corner
       it keeps in every section. */
    margin-inline-start: auto;
  }
  /* The pair does not print itself: a sheet with a print button on it is a
     sheet that was made by pressing one. */
  @media print {
    .takeaway { display: none; }
  }
</style>
