<script lang="ts">
  import { page } from '$app/state';
  import { LOCALES, type Translator } from '@shipan/i18n';
  import { alternates, canonical, mayIndex } from '$lib/indexable';
  import { CARD, OG_LOCALES, SITE, TITLE_SEPARATOR, crumbOf, metaOf, trailOf } from '$lib/meta';
  import { structuredFor } from '$lib/structured';

  /**
   * The head of a page: what it is called, what it says it holds, where it
   * says it lives, how it looks when somebody pastes the address, and whether
   * it may be indexed at all.
   *
   * **One component and not five lines on each of fourteen pages.** Every
   * page here already carried a `<title>` of its own, which is how the site
   * arrived at fourteen titles and no descriptions: a `<svelte:head>` written
   * out per page is a list nobody reads as a list, and what is missing from
   * one of them is invisible from the others. Gathered here, the head is one
   * decision, taken once, and a page that forgets to make it gets the safe
   * answer rather than nothing.
   *
   * **The safe answer is a refusal.** A page whose address `lib/indexable.ts`
   * does not allow — a chart carrying somebody's birth, a route added later
   * and not declared — gets `noindex` and nothing else: no canonical, no
   * alternates, no description, no card and no structured data. That is not
   * an oversight path, it is the path most of the addresses of this site are
   * actually on: `/en/qimen` is one page and `/en/qimen?date=…&locationId=…`
   * is an unbounded number of them, each holding a date, a time and a place
   * of birth. A preview of one of those, unfurled in a group chat by the act
   * of pasting it, would show a stranger's birth to a room.
   *
   * It takes no props but the translator. What a page is called and what it
   * says it holds are properties of the address, so they are read off it —
   * a page that could pass its own title could pass a different one on the
   * second render, and the address is the one thing that cannot disagree with
   * where the reader is.
   */
  let { t }: { t: Translator } = $props();

  const meta = $derived(metaOf(page.url.pathname));
  const indexed = $derived(mayIndex(page.url));
  const here = $derived(canonical(page.url));

  /**
   * The page's own name, then the site's.
   *
   * That order and not the reverse: a search result, a tab strip and a
   * bookmark list all cut from the right, so what survives the cut has to be
   * the half that tells one page from another. Fourteen tabs beginning
   * `shipan 式盤 — ` are fourteen tabs a reader cannot tell apart.
   *
   * An address with no entry falls back to the site's name alone. It is a
   * chart, a wrong path or something not yet declared, and inventing a title
   * for it out of the URL would put a birth date in a tab.
   */
  const title = $derived(meta ? `${t(meta.title)}${TITLE_SEPARATOR}${SITE}` : SITE);

  /**
   * The card carries the page's own title and not the compound one: the site
   * has a field of its own here — `og:site_name` — and a preview that printed
   * the name twice would spend a line of a card saying it.
   */
  const shared = $derived(
    meta && indexed && here
      ? {
          title: t(meta.title),
          description: t(meta.description),
          image: new URL(CARD.src, page.url.origin).href,
          url: here,
        }
      : undefined,
  );

  /**
   * What this page is, said to a machine rather than to a reader.
   *
   * The rule is `lib/structured.ts` and a test reads it; what is here is the
   * head printing what that returns. Nothing in it is a second copy of
   * anything — the name, the description and the language are the ones above,
   * and the trail is the address walked.
   */
  const trail = $derived(trailOf(page.url.pathname));

  const structured = $derived.by(() =>
    meta && indexed && here
      ? structuredFor({
          t,
          meta,
          here,
          origin: page.url.origin,
          trail,
          crumb: crumbOf,
        })
      : undefined,
  );
</script>

<svelte:head>
  <title>{title}</title>

  {#if indexed && shared}
    <meta name="description" content={shared.description} />

    <!--
      Absolute, and on the origin the request arrived at. What a canonical
      exists to settle is which of several origins is the page, and a relative
      one cannot say it. Nothing in this project holds a domain — see
      `lib/indexable.ts`.
    -->
    <link rel="canonical" href={here} />

    <!--
      The same page in every vernacular, declared on each of them.

      Without this, `/en/qimen` and `/it/qimen` are two pages about one
      subject as far as a search engine can tell: whatever either earns is
      split between them, and an Italian reader may be handed the English
      one. Each names itself as well as the others, because a set with a
      member missing from its own list is a set that is discarded whole. The
      sitemap carries the identical declaration, which is the second of the
      two places one is accepted.
    -->
    {#each alternates(page.url) as { hreflang, href } (hreflang)}
      <link rel="alternate" {hreflang} {href} />
    {/each}

    <!--
      What a link to this page looks like when it is pasted somewhere.

      `og:` and `twitter:` both, and the second is three tags rather than a
      second set: everything but the card's shape is read off the Open Graph
      tags by every consumer that reads either. `summary_large_image` is what
      makes a 1200×630 card show at its size instead of as a thumbnail beside
      the text.

      The image is the same on every page and in every language, and
      `design/logo/make-card.ts` argues why: a sentence on a card is a
      sentence living outside the catalogs.
    -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE} />
    <meta property="og:title" content={shared.title} />
    <meta property="og:description" content={shared.description} />
    <meta property="og:url" content={shared.url} />
    <meta property="og:image" content={shared.image} />
    <meta property="og:image:width" content={String(CARD.width)} />
    <meta property="og:image:height" content={String(CARD.height)} />
    <meta property="og:image:alt" content={t('meta.card.alt')} />
    <!-- `language_TERRITORY`, which is the one place this project spells a
         vernacular that way. See `OG_LOCALES`. -->
    <meta property="og:locale" content={OG_LOCALES[t.locale]} />
    {#each LOCALES.filter((locale) => locale !== t.locale) as locale (locale)}
      <meta property="og:locale:alternate" content={OG_LOCALES[locale]} />
    {/each}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={shared.title} />
    <meta name="twitter:description" content={shared.description} />
    <meta name="twitter:image" content={shared.image} />

    {#if structured}
      <!-- Svelte cannot hold a `<script>` in a component's markup, so the tag
           is written out. The content is `JSON.stringify` of an object built
           above and never of anything a reader typed. -->
      {@html `<script type="application/ld+json">${JSON.stringify(structured)}<\/script>`}
    {/if}
  {:else}
    <!--
      `noindex, follow`: do not keep this address, do follow what it links to.

      The address is a board cast for somebody — the date, the time and the
      place are in it — and this is the only thing that can refuse it an
      index. `robots.txt` deliberately leaves these addresses crawlable so
      that this line can be read; a `Disallow` there would hide the refusal
      behind the rule meant to enforce it.

      `follow` because the links out of a chart page are the section pages,
      which are exactly what should be indexed instead.
    -->
    <meta name="robots" content="noindex, follow" />
  {/if}
</svelte:head>
