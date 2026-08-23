import { everyPage, alternates } from '$lib/indexable';
import type { RequestHandler } from './$types';

/**
 * `GET /sitemap.xml` — every page of this site, in every language it speaks.
 *
 * **Derived, never written.** The list comes from `SECTIONS` and `NOTE_PAGES`
 * by way of `lib/indexable.ts`, which is the same pair of registries the nav
 * and the footer are built from: a board that lands in the interface is in
 * this file the same day, and a hand-kept list of addresses is the thing
 * `docs/notes.md` says not to build. Nothing here counts anything either — the
 * count is the length of a list a test already holds against the registries.
 *
 * **Every entry carries the whole set of languages, and that is what the file
 * is really for here.** A sitemap that only listed sixteen addresses would
 * add little to a site whose nav links to all of them; what it adds is the
 * `xhtml:link` block on each one, which is the second place a search engine
 * accepts an `hreflang` declaration and the place it is hardest to get wrong.
 * The pages carry the same declaration in their heads — see `PageHead` — and
 * the two agreeing is not redundancy: an engine that finds one and not the
 * other still learns that `/en/qimen` and `/it/qimen` are one page.
 *
 * **No `lastmod`, and its absence is a decision.** A date here is a claim
 * about when a page's content changed, and nothing in this repository knows
 * that: the build date would say every page changed at once whenever any file
 * did, which is a claim that is false sixteen times out of sixteen and that
 * teaches a crawler to stop believing the field. `CLAUDE.md` forbids counts
 * written by hand for the same reason — a number nobody derives is a number
 * that drifts. No `changefreq` and no `priority` either: both are hints the
 * major engines have said for years that they ignore.
 *
 * It sits at the root and not under a language, because it is about all of
 * them, and not under `/api`, because it answers no art — the same reasoning
 * `manifest.webmanifest` is placed by, arriving at the opposite address for
 * the opposite reason.
 */
export const GET: RequestHandler = ({ url, setHeaders }) => {
  setHeaders({
    'content-type': 'application/xml; charset=utf-8',
    // The shape of the site, identical for every reader. Nobody's chart is
    // in it, by construction: `mayIndex` refuses every address that carries
    // one, and this list is built out of the addresses that survive it.
    'cache-control': 'public, max-age=3600',
  });

  const entries = everyPage().map((path) => {
    const page = new URL(path, url.origin);
    const links = alternates(page)
      .map(
        ({ hreflang, href }) =>
          `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escape(href)}" />`,
      )
      .join('\n');

    return `  <url>\n    <loc>${escape(page.href)}</loc>\n${links}\n  </url>`;
  });

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
      ...entries,
      '</urlset>',
      '',
    ].join('\n'),
  );
};

/**
 * An address is XML text, and the five characters that would end it early.
 *
 * Every URL here is built from a fixed path and the request's own origin, so
 * nothing a reader typed reaches this. That is an argument for it never
 * mattering, not an argument for leaving it out: a host name is the one part
 * of these strings this file does not choose, and a document that produces
 * XML should be unable to produce broken XML.
 */
function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
