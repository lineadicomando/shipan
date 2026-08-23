/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />
import { base, build, files, prerendered, version } from '$service-worker';
import { localeOf, mayCache, offlinePage } from '$lib/cacheable';

/**
 * What an installed copy of this site keeps, which is the site and nothing
 * that was asked of it.
 *
 * **No board can be laid without a network, and this worker does not pretend
 * otherwise.** A chart is computed from an ephemeris, a native module and
 * ninety megabytes of place names, all of them on the server; nothing here
 * could cast one, and nothing here tries. What it does is make the site start
 * from disk, survive a bad connection on the way to a chart, and say
 * something true when there is no connection at all.
 *
 * **What it may keep is decided in `lib/cacheable.ts`, not here.** A service
 * worker is a module no test can import — worker globals, listeners at the
 * top level, no exports — so the one rule that must never quietly change
 * lives where a test can read it. The rule: nothing under `/api`, and no page
 * ever written back. Both are somebody's date, time and place of birth, and
 * the privacy note promises in two languages that this browser holds neither.
 *
 * **There is no notification of any kind, and that is a decision.** No push
 * subscription, no `showNotification`, no background sync, no periodic sync.
 * This site is asked a question when somebody has one; it has nothing to tell
 * anybody unprompted, and a permission prompt for something it would never
 * use is a prompt asked in bad faith. `test/service-worker.test.ts` holds
 * that.
 */

// The worker's own global scope, which TypeScript will otherwise read as a
// window's.
const worker = self as unknown as ServiceWorkerGlobalScope;

/**
 * One cache per build, and the name is the build.
 *
 * `version` changes with every deployment, so a new worker fills a new cache
 * and the old one is dropped whole at activation. Nothing is ever updated in
 * place: the assets are content-hashed, so an asset that changed has a
 * different address and an asset that did not is byte-identical.
 */
const CACHE = `shipan-${version}`;

/**
 * Everything the build produced: hashed assets, the files in `static/`, and
 * the pages that were rendered at build time — which is the offline page in
 * each language and nothing else.
 *
 * **Precached whole rather than filled as the reader goes.** The alternative
 * saves bytes at install and costs the one thing an installed copy is for: a
 * reader who installs from the front page and opens the application on a
 * train would otherwise find the offline page unstyled, its stylesheet never
 * having been asked for. The whole of it is the client bundle and four icons.
 */
const PRECACHE = [...build, ...files, ...prerendered];

/**
 * The same list as a set, for the question the fetch handler asks of every
 * request: is this one of ours?
 *
 * Anything answering no is left alone entirely — handed to the network with
 * no cache read and no cache write, exactly as if nothing were installed.
 * **Nothing is ever added to the cache after the install**, which is the
 * simplest form the privacy rule can take: a cache that only ever holds what
 * the build put in it cannot come to hold anybody's chart.
 */
const PRECACHED = new Set(PRECACHE.map((path) => new URL(path, worker.location.origin).pathname));

worker.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      // Ready as soon as it is filled. The alternative leaves the first
      // install waiting for every tab to close before it does anything, which
      // on a first visit means the worker does nothing at all.
      .then(() => worker.skipWaiting()),
  );
});

worker.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => worker.clients.claim()),
  );
});

worker.addEventListener('fetch', (event) => {
  const request = event.request;

  // A worker answers reads. Anything else — and there is nothing else on this
  // site, every endpoint being a GET — goes straight past.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Another origin's response is not this site's to keep, and it is not this
  // worker's to serve either.
  if (url.origin !== worker.location.origin) return;

  // A page: the network, or the truth about there being none. Never the
  // cache — see `navigate`.
  if (request.mode === 'navigate') {
    event.respondWith(navigate(request, url));
    return;
  }

  /**
   * Everything else is left alone unless the build put it in the cache.
   *
   * `mayCache` is asked as well as `PRECACHED`, and the redundancy is the
   * point: the set says what happens to be there, the rule says what is
   * allowed to be, and a build that ever emitted something under `/api` would
   * be caught by the second rather than served by the first.
   */
  if (!PRECACHED.has(url.pathname) || !mayCache(url, false)) return;

  event.respondWith(asset(request));
});

/**
 * A page: the network, or the truth about there being none.
 *
 * Network-first and never written back. Every page here is rendered from an
 * address that may hold a date, a time and a place of birth, so the response
 * is somebody's chart and the request is the key it would be filed under.
 *
 * The fallback is the prerendered offline page in the language of the address
 * the reader was going to. If even that is missing — a first navigation
 * racing the install — the error stands, because a browser's own «cannot
 * reach this site» is a better answer than a blank page.
 */
async function navigate(request: Request, url: URL): Promise<Response> {
  try {
    return await fetch(request);
  } catch (offline) {
    const cache = await caches.open(CACHE);
    const page = await cache.match(base + offlinePage(localeOf(url, navigator.language)));
    if (page) return page;
    throw offline;
  }
}

/**
 * An asset: the cache, or the network.
 *
 * Cache-first without revalidation, which is safe here for one reason: every
 * address in the precache is content-hashed or is a file whose whole cache is
 * thrown away and refilled when `version` changes. An asset found under its
 * own address cannot be a stale version of itself.
 *
 * The network is still the fallback, for the one case where a hashed asset is
 * in the build list and not in the cache: an install that was interrupted.
 * Nothing is written back — a cache that grows entries nobody enumerated is a
 * cache nobody can account for.
 */
async function asset(request: Request): Promise<Response> {
  const cache = await caches.open(CACHE);
  const kept = await cache.match(request);
  return kept ?? fetch(request);
}
