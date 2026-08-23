import { isLocale, loadCatalog, translatorOver, LOCALES } from '@shipan/i18n';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

/**
 * The one page here that is built rather than served, and the one that stands
 * outside the shell the rest of the site is read in.
 *
 * **It is a file because it has to be in the cache before it is wanted.** A
 * service worker hands it back when a navigation cannot reach the network, so
 * it cannot be rendered per request the way everything else here is —
 * everything else here being a chart of somebody's instant, which this has
 * none of and never will.
 *
 * **It leaves the language layout, and the collision that forced that is
 * worth keeping written down.** `SectionsNav` reads `page.url.search`,
 * because the header carries the moment from one section to the next; a
 * prerendered page has no query string to read and SvelteKit refuses the
 * access outright. The fix is not to bend the nav — the fix is that this page
 * should never have had one. A header full of links to charts that cannot
 * load, over a footer of the same, is a worse answer to "there is no network"
 * than a page with nothing on it but the sentence. So `+page@.svelte` resets
 * to the root layout: the stylesheet, and nothing else.
 *
 * The cost of leaving is that the catalog has to be loaded here, the layout
 * that used to do it being skipped along with the rest. It is the same two
 * lines, and it makes the page self-contained — which is the property that
 * actually matters in something served when nothing else can be fetched.
 *
 * `entries` is what lets a route under `[lang]` be prerendered at all: a
 * dynamic segment has no pages to build until something says which. There are
 * exactly as many as there are vernaculars, and that is a state — a third
 * language builds a third file by joining `LOCALES`, and nothing here says
 * two.
 */
export const prerender = true;

export const entries: EntryGenerator = () => LOCALES.map((lang) => ({ lang }));

export const load: PageLoad = async ({ params }) => {
  // The refusal the language layout would have made, made here instead: a
  // fallback would put an English page at every address somebody mistyped.
  if (!isLocale(params.lang)) error(404, { message: `No such language: ${params.lang}` });

  return { locale: params.lang, t: translatorOver(params.lang, await loadCatalog(params.lang)) };
};
