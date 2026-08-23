<!--
  What there is to say when there is no network, which is not «try again».

  **No board can be laid here, and this page says so rather than implying a
  delay.** A chart is a pure function of an instant and a place, and computing
  it takes the ephemerides, a native module and ninety megabytes of place
  names — all of them on the server, none of them in a browser, and none of
  them about to be. An installed copy of this site is a way into the work; it
  is not the work carried offline, and a page that said «you are offline» and
  left it there would let a reader wait for a reconnection to give them
  something the reconnection is the whole of.

  The second paragraph is the one that is actually reassuring, and it is
  reassuring about the opposite thing: nothing was kept here. The privacy note
  says what the browser holds — the appearance, and the code of the site — and
  what it does not, which is every chart, date and place that has ever crossed
  it. This page is where a reader is most likely to wonder, having just been
  told the site is on a server somewhere.

  **It wears no header and no footer**, which is what the `@` in the filename
  buys: the nav leads to charts that cannot load and the footer to notes that
  cannot either, and a page offering a dozen dead links is a worse answer than
  a page offering one live sentence. The wordmark comes with them, so this
  page says the site's name itself. It is prerendered, one file per language,
  and `+page.ts` argues both decisions.
-->
<script lang="ts">
  let { data } = $props();
  const t = $derived(data.t);
</script>

<svelte:head>
  <title>{t('offline.title')}</title>
  <!-- Nothing to index: it is a page about a browser's own state. -->
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="shell">
  <!-- The mark, because the header that usually carries it is not here and a
       page has to say what site it belongs to. Not a link: everywhere it
       points is unreachable. It keeps its reading, as it does in the
       header. -->
  <p class="mark">
    <img src="/seal.svg" alt="" />
    <span class="name">
      <span class="word">shipan</span>
      <span class="reading">式盤 · shìpán</span>
    </span>
  </p>

  <article>
    <h1>{t('offline.title')}</h1>
    <p>{t('offline.lead')}</p>
    <p>{t('offline.why')}</p>
    <p class="kept">{t('offline.kept')}</p>

    <!--
      A button and not a link. In `standalone` there is no address bar and no
      reload, so the one thing to do here has to be on the page — and it is
      `location.reload()` rather than a link to the front, because what failed
      was a navigation and what is wanted is the same one again.
    -->
    <p><button type="button" onclick={() => location.reload()}>{t('offline.retry')}</button></p>
  </article>
</div>

<style>
  /* The shell's own measure and gutter, repeated rather than inherited: this
     page stands outside the layout that owns them. */
  .shell { max-width: 72rem; margin: 0 auto; padding: 1rem clamp(0.75rem, 4vw, 1.25rem) 3rem; }

  .mark {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    width: fit-content;
    margin: 0 auto 2.5rem;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
    color: var(--ink);
  }
  .mark img { display: block; height: 34px; width: auto; }
  .name { display: flex; flex-direction: column; line-height: 1.15; }
  .reading { font-size: 0.68rem; color: var(--faint); letter-spacing: 0.01em; }

  article { max-width: 38rem; }
  h1 { font-size: 1.25rem; font-weight: 500; }
  p { margin: 1rem 0; }
  .kept { color: var(--faint); }

  /* The site's one button shape, which lives on the submit control; this is
     the only other place a press is the whole of what a page offers. */
  button {
    padding: 0.45rem 1.1rem;
    border: 1px solid var(--edge);
    border-radius: 2px;
    background: var(--tint);
    color: var(--ink);
    font: inherit;
    cursor: pointer;
  }
  button:hover { background: var(--ground); }

  /* A sheet cannot be reloaded, and this page is not one to print anyway —
     but it can be reached and printed, and a dead control on paper is worse
     than no control. */
  @media print {
    button { display: none; }
    .kept { color: var(--ink); }
  }
</style>
