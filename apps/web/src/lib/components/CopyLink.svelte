<!--
  The address of what is on screen, into the clipboard.

  Its own component beside `CopyText` rather than a fourth mode of it, because
  the two differ in the one thing that component is built around: `CopyText`
  fetches, and everything in it — the wait, the word that says it, the failure
  of a request — exists because the text it copies is the server's to make.
  A link is already here. There is nothing to wait for and nothing that can go
  unread, so the only way this fails is the way every clipboard fails, and
  `Copier` already answers for that.

  What it hands over is `pageLink`'s answer and not `page.url`: the address in
  the bar says «now» wherever the reader arrived without a date on it, and a
  link to whichever hour it happens to be when somebody follows it is not a
  link to the board they were sent.
-->
<script lang="ts">
  import { page } from '$app/state';
  import { Copier } from '$lib/copy.svelte';
  import { pageLink } from '$lib/navigation';
  import Icon from './Icon.svelte';
  import type { Translator } from '@shipan/i18n';

  interface Props {
    t: Translator;
    /** What the board is a function of, as its own section reads it. */
    address: string;
  }

  let { t, address }: Props = $props();

  const copier = new Copier();
  const link = $derived(pageLink(page.url, address));
</script>

<div class="copy">
  <!-- `aria-live` on the button itself, as on the one beside it: the
       confirmation is the button changing its word, and whoever cannot see it
       has to be told. -->
  <button
    type="button"
    class="quiet-button"
    onclick={() => copier.run(async () => link)}
    aria-live="polite"
  >
    <Icon name={copier.copied ? 'copied' : 'link'} />
    {copier.copied ? t('form.copied') : t('form.copyLink')}
  </button>

  {#if copier.fallback}
    <p class="note">{t('form.copyFailed')}</p>
    <!-- One line, so one field: an address is not a paragraph, and a box
         eight rows deep around it would be furniture. -->
    <input readonly value={copier.fallback} aria-label={t('form.copyFallback')} />
  {/if}
</div>

<style>
  /* The mark sits with the word rather than above it: a button is one line. */
  button { display: inline-flex; align-items: baseline; gap: 0.4em; font: inherit; }
  .copy { display: grid; justify-items: start; gap: 0.4rem; }
  .note { margin: 0; font-size: 0.8rem; color: var(--faint); max-width: 62ch; }
  input {
    width: 100%;
    padding: 0.4rem 0.5rem;
    background: var(--tint);
    color: var(--ink);
    border: 1px solid var(--rule);
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
  }

  /* A clipboard is a thing screens have, and an address is a thing a screen
     follows. The sheet says where the board is in its own way. */
  @media print {
    .copy { display: none; }
  }
</style>
