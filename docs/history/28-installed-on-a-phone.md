# Phase 28 — The site installs, and refuses to pretend it computes

The site becomes installable: a manifest, an icon of its own, a window of its
own, and a service worker underneath. What it does **not** become is available
offline, and most of this phase was about making that refusal legible instead
of letting it be discovered.

## What was asked for, and the first thing that had to be said back

The request was PWA support without notifications. The notifications half was
easy and stayed easy — there are none, deliberately, and a test reads the
worker's source to keep it that way.

The other half needed an answer before any code: **this engine cannot run in a
browser and never will.** A chart is computed from the Swiss Ephemeris, a
native N-API module and ninety megabytes of place names in SQLite;
`vite.config.ts` marks `@shipan/core`, `@shipan/geo` and `@shipan/plate` as
`ssr.external` precisely so that none of it reaches the client, and the client
imports only types. So an installed copy is the way in — it starts from disk, it survives a bad connection on the way to a chart, and when
there is no connection it says so. A "works offline" badge on this site would
be a lie with an install prompt attached.

That is the whole design. Everything below follows from it.

## Four decisions that were the reader's and not the code's

**`display: standalone`**, chosen over `minimal-ui`, which is what was
recommended. The argument for the other one was real and is recorded here
because it will come back: phase 12 made the address *be* the chart —
«casting is loading» — and an installed window has no address bar, so sharing
the board in front of you means going through a system menu. The choice was
made knowingly. If it ever costs enough to fix, the fix is an affordance on the
page, not a weaker display mode; `CopyText.svelte` already exists.

**The precache is everything the build produced**, rather than the icons and
the offline page alone. Measured before committing to it: 175 KiB brotli for
the client bundle, 39 KiB of icons, two small HTML pages — about 215 KiB, which
buys a first launch after install that is correct even if the reader has never
navigated anywhere.

**No install button.** The header's three controls are argued at length in
`[lang]/+layout.svelte`, a fourth would need catalog strings and a rule for
when it appears, and Safari never fires `beforeinstallprompt` at all. The
browser's own invitation does the job.

**The name in the manifest is `shipan` and nothing else**, which arrived after
seeing it installed: `shipan 式盤 shìpán` in a title bar reads as the same word
three times, twice in the same alphabet. The rule it bends is a real one and it
is bent in exactly one place — see `docs/i18n.md`, which now says where and
why. The reasoning that carries the reading everywhere else is that a glyph
alone is unsayable; here the sayable part is what survives the cut, and the
glyph is on the icon a centimetre to the left.

## What the code had to be told twice

**The manifest is a route, not a file.** It carries a name, a description and a
`lang`, and `docs/i18n.md` says a vernacular exists in the catalogs and nowhere
else — so a single `static/manifest.webmanifest` would have had to keep a copy
of two strings outside them, or install in English for an Italian reader. Per
language, read off the catalog, and a third language costs nothing.

Its **scope is `/`**, which was the one thing in it that could have been got
wrong silently. The language switch is in the header of every page; a scope of
`/en` would have thrown the reader out of the installed application into a
browser tab the first time they pressed `IT`, and it would have looked like a
browser bug rather than a manifest field.

**The offline page had to leave the language layout, and the build said so.**
The first attempt prerendered it under `[lang]` as it stood, and prerendering
failed: `SectionsNav` reads `page.url.search`, because the header carries the
moment from one section to the next, and a prerendered page has no query string
to read. The instinct was to bend the nav. The right answer was that this page
should never have had one — a header of links to charts that cannot load, over
a footer of the same, is a worse reply to «there is no network» than a page
with one live sentence on it. `+page@.svelte` resets it to the root layout: the
stylesheet, the wordmark it draws itself, and nothing else.

**The cache rule went where a test could read it.** A service worker cannot be
imported by a test — worker globals, listeners at the top level, no exports —
and the rule it obeys is the one thing here that must never quietly change.
`lib/cacheable.ts` holds it: nothing under `/api`, by prefix rather than by a
list of the six boards, and no page ever written back. Both are somebody's
date, time and place of birth, which on this site are in the address; the
endpoints have marked them `private` since phase 6 and a cache that ignored
that would have stored a stranger's birth on disk, silently and permanently.

In the end the worker writes exactly once, at install, which is the strongest
form the rule can take: a cache that only ever holds what the build put in it
cannot come to hold anybody's chart.

## The privacy note had said «one thing»

It had, in two languages, since the appearance was the only thing stored — and
the rain's entry in `docs/architecture.md` leaned on the count as an argument
for not remembering itself. A service worker makes it two. Both catalogs were rewritten, and the new paragraph is
mostly a list of what is *not* kept: no date, no time, no place, no question,
no picture of a board. Somebody who reads that a site can be installed and
works without a connection reasonably assumes it took a copy of what they did
there, and the place to answer that assumption is where it is made.

## Checked against a running build

Not only against tests. A production build was served, a chart cast, the server
stopped, and a chart address never visited before was opened: the offline page
answered, in the language of the address. The cache stood at 104 entries
throughout — no query string, no `/api`, and the only HTML in it the two pages
the build had put there.

Worth recording for whoever tries this next: **Chrome's offline emulation does
not reach a service worker's own fetches.** The worker is a separate target and
goes on reaching the network while the page cannot. Stopping the server is the
only honest test.

## What this did not touch

The engine, the boards, the prompts, the register. No source arrived, no
quantity moved, and `docs/sources.md` is untouched — this phase is entirely on
the surface, which is why it fits in one branch and why nothing in `docs/`
about what is computed had to change.
