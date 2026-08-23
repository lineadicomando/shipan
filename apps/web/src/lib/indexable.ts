import { LOCALES, type Locale } from '@shipan/i18n';
import { SECTIONS, href } from './navigation';
import { NOTE_PAGES } from './notes';

/**
 * What a search engine is allowed to keep, decided here rather than in a
 * `<meta>` tag somewhere down a page.
 *
 * **This is `cacheable.ts` again, against a different keeper.** That file
 * answers «may this browser write this to disk»; this one answers «may this
 * crawler put this in an index», and the thing being protected is identical:
 * `/en/qimen?date=1984-03-11&time=07:20&locationId=…` is somebody's date,
 * time and place of birth, written into an address. A `Cache-Control:
 * private` header says nothing at all to a crawler — it governs stores along
 * the way, not indexes at the end — so a chart address that was shared once
 * and found once would sit in a public index with the birth still in it.
 *
 * **The rule is an allowlist, and that is the opposite shape from
 * `cacheable.ts` on purpose.** There the danger was a *hole*: a seventh board
 * added under `/api` had to be refused the day it landed, so the rule is the
 * prefix and nothing is enumerated. Here the danger is a *leak*, and the two
 * want opposite defaults. An address is indexable when it is one of the pages
 * this site actually has and carries no question — anything else, including a
 * route nobody thought about when writing this, is refused by saying nothing.
 * Both files fail closed; what «closed» means is not the same word.
 *
 * The list is derived and not written: `SECTIONS` and `NOTE_PAGES` are the
 * registries that already say what pages exist, so a board that lands in the
 * nav lands in the sitemap and in the alternates the same day. See
 * `docs/notes.md` — a page that says what the engine holds should read it.
 */

/** The prefix every endpoint hangs off. See `docs/architecture.md`. */
const API = '/api';

/**
 * Every page of one language, in the order a reader meets them.
 *
 * The sections first, in the nav's own order — which is the order the
 * consultation offers the instruments in, and there is no second arrangement
 * here to keep in step with it. Then the notes, which are under the footer
 * rather than in the nav, and then the privacy note, which is the one page of
 * this site that belongs to no registry: it is a single written page and has
 * nowhere else to be declared.
 *
 * The offline page is deliberately absent, and it is the one page that is
 * prerendered. It is an answer to a failed navigation — a sentence saying
 * that a board needs a network — and a reader arriving at it from a search
 * result would have been sent to an apology for a page they never asked for.
 */
export function pagesOf(locale: Locale): string[] {
  return [
    ...SECTIONS.map((section) => href(locale, section.slug)),
    ...NOTE_PAGES.map((page) => href(locale, page.slug ? `notes/${page.slug}` : 'notes')),
    href(locale, 'privacy'),
  ];
}

/** Every page of every language, which is what the sitemap lists. */
export function everyPage(): string[] {
  return LOCALES.flatMap((locale) => pagesOf(locale));
}

/**
 * Whether an address may be indexed.
 *
 * Two refusals, and they are the two halves of the allowlist.
 *
 * **A question, of any shape, refuses the page.** Not `date` and `locationId`
 * by name: the parameters differ by section — a scan carries `from` and `to`,
 * a consultation carries `born` and `gender`, 太乙 carries a year — and a
 * list of the private ones would be a list somebody has to remember to extend.
 * What every one of them has in common is that it is an *answer*, and an
 * answer here is a board cast for somebody. The bare section address is the
 * page; everything hanging off it is one reader's copy of it.
 *
 * **An address this site does not have refuses itself.** `/api`, a manifest,
 * a mistyped language, a route added later and not declared: none of them are
 * in `pagesOf`, so none of them are indexable, and nothing had to be written
 * to refuse them.
 */
export function mayIndex(url: URL): boolean {
  if (url.pathname === API || url.pathname.startsWith(`${API}/`)) return false;
  if (url.search) return false;
  return everyPage().includes(withoutTrailingSlash(url.pathname));
}

/**
 * The address a page says it is at, and `undefined` where it says nothing.
 *
 * **A page that may not be indexed carries no canonical and no alternates.**
 * That is not an omission, it is what the two mean together: a canonical
 * pointing away from a `noindex` page is a contradiction a search engine
 * resolves by guessing, and guessing is exactly what must not happen over an
 * address with a birth in it. So a chart address says one thing — do not
 * index this — and the bare section address, which is the page, carries the
 * canonical and the whole set of languages.
 *
 * Absolute, because a canonical has to be: what it exists to settle is which
 * of several *origins* is the page, and a relative one cannot say. The origin
 * is the request's own, so nothing here holds a domain — see the sitemap.
 */
export function canonical(url: URL): string | undefined {
  return mayIndex(url) ? new URL(withoutTrailingSlash(url.pathname), url.origin).href : undefined;
}

/**
 * The same page in every language this site speaks, for `rel="alternate"`.
 *
 * **A bilingual site without these is two sites competing with each other.**
 * `/en/qimen` and `/it/qimen` are one page in two vernaculars, and nothing in
 * either of them says so: a crawler reading them separately sees two pages
 * about the same subject, splits whatever either has earned between them, and
 * may serve an Italian reader the English one. The pair has to be declared,
 * on both, and each must name itself as well as the other — a set where one
 * member omits itself is a set search engines discard whole.
 *
 * `x-default` is the language-less root, which is the one address here that
 * negotiates: `/` redirects to whichever vernacular the reader's own browser
 * asks for. That is precisely what `x-default` means, so this site can answer
 * it truthfully rather than nominating one of the two and calling it the
 * fallback for everybody else.
 *
 * How many there are is a state and not a design — `docs/i18n.md`. A third
 * vernacular is a third entry here and no edit at all.
 */
export function alternates(url: URL): { hreflang: string; href: string }[] {
  if (!mayIndex(url)) return [];

  const path = withoutTrailingSlash(url.pathname);
  const [, , ...rest] = path.split('/');
  const tail = rest.join('/');

  return [
    ...LOCALES.map((locale) => ({
      hreflang: locale,
      href: new URL(href(locale, tail), url.origin).href,
    })),
    { hreflang: 'x-default', href: new URL('/', url.origin).href },
  ];
}

/**
 * `/en/` and `/en` are one page, and the pages here are written without the
 * slash.
 *
 * A server that answers both — and SvelteKit does — is a server serving one
 * page at two addresses, which is the duplicate a canonical exists to settle.
 * Settled here instead, before anything is compared or emitted, so that every
 * answer below is about the same string. The root is left alone: `/` without
 * its slash is the empty string, which is not an address.
 */
function withoutTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}
