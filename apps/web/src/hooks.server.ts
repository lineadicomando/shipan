import { resolveLocale } from '@shipan/i18n';
import type { Handle } from '@sveltejs/kit';

/**
 * Puts the page's language in the document, and keeps every endpoint out of
 * an index.
 *
 * `lang` on `<html>` is what a screen reader pronounces from and what a
 * browser offers to translate from; a page that lies about it is worse than
 * one that says nothing.
 *
 * The second job is here rather than in the twenty-six endpoints because it
 * is one rule about a prefix, and a rule repeated twenty-six times is a rule
 * the twenty-seventh endpoint will not have. `X-Robots-Tag` is the only way
 * an answer that is not HTML can refuse an index — a JSON board and a PNG
 * plate have no `<head>` to carry a `<meta>` — and every one of them is a
 * board cast for somebody, with the date, the time and the place in the
 * address. `robots.txt` already declines the crawl; this declines the index
 * for whatever arrives by a link instead. `lib/indexable.ts` is where the
 * same refusal is argued and tested.
 */
export const handle: Handle = async ({ event, resolve }) => {
  const locale = resolveLocale(
    event.params['lang'],
    event.request.headers.get('accept-language'),
  );

  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', locale),
  });

  const path = event.url.pathname;
  if (path === '/api' || path.startsWith('/api/')) {
    // `noindex` and not `noindex, nofollow`: what is being refused is a
    // place in an index, not the crawl of whatever an answer happens to
    // mention. These answers link to nothing anyway.
    response.headers.set('x-robots-tag', 'noindex');
  }

  return response;
};
