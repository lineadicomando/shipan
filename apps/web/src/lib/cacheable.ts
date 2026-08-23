import { LOCALES, DEFAULT_LOCALE, type Locale } from '@shipan/i18n';

/**
 * What a service worker is allowed to keep, decided here rather than in it.
 *
 * **The rule this file exists for: nothing anybody asked for is written to
 * disk.** A chart is a date, a time and a place — a date of *birth*, where
 * somebody gave one — and on this site all three are in the address. The
 * endpoints know it and mark their answers `private`; a cache that ignored
 * that would put a stranger's birth in a browser's storage where nothing on
 * this site ever puts anything, and it would do it silently and permanently.
 *
 * The privacy note makes a promise in the reader's own language about exactly
 * this. A promise kept by remembering to keep it is a promise that breaks the
 * first time somebody adds a caching branch in a hurry, so the decision is a
 * function with a test on it instead of a comment in a fetch handler.
 *
 * It lives in `lib` and not in `service-worker.ts` because a service worker
 * is a module no test can import: it is compiled against a worker global
 * scope, registers listeners at the top level, and has no exports. The worker
 * asks these questions; this file answers them.
 */

/** The prefix every endpoint hangs off. See `docs/architecture.md`. */
const API = '/api';

/**
 * Whether a request is for something that belongs to whoever asked for it.
 *
 * Every endpoint under `/api` is, without exception, and it is the whole
 * prefix rather than a list of the six boards: a seventh board added later
 * must be covered by this the day it lands, not the day somebody remembers.
 * `/api/terms` and `/api/locations` are `public` and would be harmless to
 * keep, which is not a good enough reason to write a rule with a hole in it —
 * a solar term costs one request a year and a location search is already
 * cached by the browser's own HTTP cache.
 */
export function isPrivateRequest(url: URL): boolean {
  return url.pathname === API || url.pathname.startsWith(`${API}/`);
}

/**
 * Whether a response may be written to the cache.
 *
 * Two refusals, and they are different refusals.
 *
 * `/api` is somebody's chart as data. **A page is somebody's chart as a
 * page**: `/en/qimen?date=…&locationId=…` renders the board into the HTML,
 * and the address it was fetched at is the cache key, so keeping one stores
 * the date and the place twice over. That is why navigations are served
 * network-first and never written back — the offline page is the only HTML in
 * the cache, and it was put there at build time.
 *
 * What is left is what the build produced: hashed assets and the files in
 * `static/`. Those are the site, identical for every reader, and they are
 * what an installed copy needs in order to start.
 */
export function mayCache(url: URL, isNavigation: boolean): boolean {
  if (isNavigation) return false;
  return !isPrivateRequest(url);
}

/** The address of the page served when a navigation cannot reach the network. */
export function offlinePage(locale: Locale): string {
  return `/${locale}/offline`;
}

/**
 * Which language to answer a failed navigation in.
 *
 * The address is asked first, because it is what the reader was actually
 * going to: every page of this site is under `/en` or `/it`, so a navigation
 * that failed almost always names its own language. `/`, an unknown prefix,
 * or a language this site does not speak fall through to what the browser
 * says it prefers — the same order `resolveLocale` follows everywhere else,
 * most explicit source first.
 *
 * `preferred` is passed in rather than read off `navigator` so that this
 * stays a function of its arguments.
 */
export function localeOf(url: URL, preferred?: string | null): Locale {
  const [, first] = url.pathname.split('/');
  if (isSpoken(first)) return first;

  // `navigator.language` is a full tag: `it-CH` means Italian here, as it does
  // in the header `parseLocale` reads.
  const primary = preferred?.split(/[-_]/)[0]?.toLowerCase();
  return isSpoken(primary) ? primary : DEFAULT_LOCALE;
}

function isSpoken(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}
