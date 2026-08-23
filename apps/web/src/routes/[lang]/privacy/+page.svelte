<script lang="ts">
  import { COLOR_SCHEME_KEY } from '$lib/color-scheme';
  let { data } = $props();
  const t = $derived(data.t);
</script>

<svelte:head><title>{t('privacy.title')}</title></svelte:head>

<article>
  <h1>{t('privacy.title')}</h1>
  <p>{t('privacy.nothing')}</p>
  <p>{t('privacy.address')}</p>
  <p>{t('privacy.prompt')}</p>
  <!-- Two things are kept, and they are kept for different reasons: the first
       because the reader asked for it, the second because the site can be
       installed. The second paragraph is mostly a list of what is *not* in
       it, which is the half a reader actually wants. -->
  <p>{t('privacy.storage', { key: COLOR_SCHEME_KEY })}</p>
  <p>{t('privacy.offline')}</p>
  <p>{t('privacy.cookies')}</p>
</article>

<style>
  article { max-width: 38rem; }
  h1 { font-size: 1.25rem; font-weight: 500; }
  p { margin: 1rem 0; }
</style>
