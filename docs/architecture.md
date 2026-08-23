# The shape of the thing

One **pure engine** and the **adapters** that expose it. The engine computes;
it does not localise, does not interpret, and does not know it is being called
over HTTP. Everything a surface adds — a language, a picture, a route, a
prompt — is added outside it.

npm workspaces monorepo, npm scope `@shipan/*`, Node ≥ 22, ESM,
TypeScript, AGPL-3.0-or-later.

## The packages

| | Depends on | |
|---|---|---|
| `packages/i18n` | nothing | message catalogs and locale negotiation. A leaf |
| `packages/geo` | `i18n` | location lookup over a local GeoNames dataset (SQLite) |
| `packages/core` | `i18n`, `geo` | the calculation engine and the `shipan` command |
| `packages/plate` | nothing | the drawings: SVG, and PNG at a separate entry point |
| `packages/mcp` | `core`, `geo`, `i18n` | MCP server, stdio transport |
| `apps/web` | all of them | SvelteKit: the interface and the REST API |

Three of the edges above are absences, and each is load-bearing.

**`plate` imports nothing from `core`, not even types.** It redeclares the
shape it needs — of a chart, of a 六壬 board, of a 太乙 grid alike — and
`packages/plate/test/types.test.ts` asserts the copies still agree. The CLI
lives in `core` and draws, so the other direction would close a cycle; and a
drawing package that could reach the engine would end up computing.

**The PNG lives at `@shipan/plate/png`**, a separate entry point, because
it pulls a native module that must never reach the browser. It also needs a
CJK font *and* `fontconfig` — the glyphs are the content, and without either
the drawing comes out an empty grid, silently. `png.ts` refuses to draw when
it detects it, and the runtime image installs both.

**The client imports only types from `core`.** A value import would drag the
ephemerides and a native module into the browser bundle.

## Inside `core`

```
packages/core/src/
├── time.ts             local → UT (luxon + IANA)
├── true-solar.ts       equation of time and the longitude correction
├── solar-terms.ts      the 24 節氣, from sweph.solcross_ut
├── lunar.ts            new moons, lunar months, the intercalary month
├── ganzhi.ts           the sexagenary cycles of year, month, day, hour
├── pillars.ts          the four pillars, the substrate of everything else
├── zhirun.ts           the 置閏 term drift, kept apart from the layout
├── bazi/               八字: hidden stems, 納音, relations, luck, distribution
├── dunjia/             the Qi Men chart: ju, palaces, plates, patterns, …
├── liuren.ts           大六壬
├── qizheng.ts          七政四餘
├── ziwei.ts, ziwei/    紫微斗數
├── taiyi.ts            太乙神數
├── almanac.ts          曆注, beside a chart rather than inside one
├── nianming.ts         年命: a birth placed inside a chart of a moment
├── scan.ts             every chart over an interval
├── purposes.ts         what each gate is chosen for — and what it refuses
├── format.ts           the dense rendering, for the CLI and for agents
├── prompt.ts           the prompt builders, one per board
├── labels.ts           identifier → hanzi → pinyin
├── types.ts            the options, and every board's input type
└── cli.ts              the `shipan` command
```

`solar-terms.ts` is the pivot. The 24 terms are the instants at which the
Sun's apparent longitude crosses a multiple of 15°; from them follow the year
boundary, the month pillar, the ju number and the luck cycles. New moons have
no dedicated function in `sweph` and are found by iterative search on
Sun–Moon elongation.

**The calendrical layer is where nearly all the technical risk sits**, and it
is why `docs/sources.md` exists. See it before touching any of the four files
above the boards.

## The surfaces

| | |
|---|---|
| CLI | `shipan`, nine commands: `qimen` `liuren` `qizheng` `taiyi` `bazi` `ziwei` `terms` `calendar` `scan` |
| REST | 26 GET endpoints under `/api`. Six boards × (board, `plate`, `text`, `prompt`), plus `/api/locations`, `/api/terms`, `/api/moments` — and `/api/bazi` has no `plate` |
| Web | eight sections at `/en` and `/it`: two acts, six instruments. See `apps/web/src/lib/navigation.ts`. Under the footer, five notes pages and a privacy page, which are not sections and are not addressed by an art; and a page nothing links to, `/[lang]/offline` |
| MCP | 12 tools and 4 reference resources, stdio. See `packages/mcp/src/server.ts` |

Those four counts are asserted against the code by
`apps/web/test/docs.test.ts`, because a number written by hand in a document
drifts and the last one did.

**A section is addressed by the art it lays out, and so is its endpoint.**
`/api/qimen` answers a `qimen`, `/api/liuren` a `liuren`. The one exception is
the consultation, which has no art of its own because it takes any of them,
and therefore keeps `/[lang]` — the root of a language. `/[lang]/consult` is
the *name* of that section rather than a second address for it, and redirects
there carrying the setup.

## Paper is the fourth appearance

Not light: light is a paper-*coloured* screen, set against a lit surface.
Paper is its own target.

`@media print` in `app.css` resets the properties for white, **at the
specificity of `[data-color-scheme='dark']`**, so a reader who picked dark does
not print a page of toner. Each component says whether it belongs on a sheet,
and the table of palaces drops its scrolling frame — a frame that still clips
on paper prints three palaces of nine and gives no sign of the other six.

The board is the exception the CSS cannot reach: an `<img>` carries its
colours in its address, so both pages draw a second copy at `scheme=light`,
hidden on screen and warmed as soon as the chart is cast, since `beforeprint`
cannot wait for a picture.

**The consultation prints from the page and never from a route of its own**,
because a route would have to be told the question. See `docs/readings.md`.

## Installed, and what an installed copy cannot do

The site can be installed: a manifest, an icon, its own window. **It is not the
work carried offline, and nothing here is arranged as though it could be.**

**No board can be laid without a network, and that is architecture rather than
an omission.** A chart is computed from the Swiss Ephemeris, a native module
and ninety megabytes of place names — the three things `vite.config.ts` marks
`ssr.external` precisely so that they never reach a browser. The client imports
only types from `core`. An installed copy is therefore the way in: it starts
from disk, it survives a bad connection on the way to a chart, and when there
is no connection it says so.

**`/[lang]/offline` is where it says so, and it says the true thing.** One
prerendered page per language — the only prerendered pages here, everything
else being a chart of somebody's instant — telling the reader that a chart is
computed elsewhere and that no wait will bring it here. It stands outside the
language layout, because `SectionsNav` reads `page.url.search` to carry the
moment between sections and a prerendered page has no query string; that
collision arrived as a build error and was the right answer, a header of links
to charts that cannot load being a worse page than one live sentence.

**The manifest is served per language and is not under `/api`.** It holds a
name, a description and a language, and the vernacular in it lives in the
catalogs like every other; a file in `static/` would have had to keep a second
copy of two strings somewhere `docs/i18n.md` forbids. Its **scope is `/` and
not the language** — the switch is in the header of every page, and a narrower
scope would put the reader in a browser tab the first time they pressed `IT`.
Which language was installed is said by `id`, `lang` and `start_url`.

**`display: standalone`, and the cost is paid knowingly.** In an installed
window there is no address bar, and on this site the address *is* the chart:
somebody who wants to share the board in front of them has to go through the
system menu to reach its URL. The remedy, if it ever becomes one, is an
affordance on the page rather than a weaker display mode.

**The service worker keeps the site and nothing that was asked of it.** It
precaches what the build produced — the client bundle, the icons and the two
offline pages, about 215 KiB over the wire — and `addAll` at install is the
only write it ever makes. Nothing under `/api` is touched, and no page is ever
written back: both are somebody's date, time and place of birth, which on this
site are in the address. **That rule lives in `lib/cacheable.ts` and not in the
worker**, because a service worker is a module no test can import — worker
globals, listeners at the top level, no exports — and the privacy note makes a
promise in two languages that must not depend on somebody remembering it.

**There is no notification of any kind**, and that too is a decision: no push,
no `showNotification`, no background sync. This site is asked a question when
somebody has one and has nothing to tell anybody first, so a permission prompt
for a capability it would never use would be asked in bad faith.
`apps/web/test/service-worker.test.ts` holds both halves.

## The one thing here that is not the work

A button in the header — 雨, beside the one for the appearance — and a rain of
glyphs falls behind the page. The same button puts it away, and `aria-pressed`
says which way it is set.

**The glyph is a mark and not a name.** Everywhere else here a hanzi arrives
with a gloss and a reading, because it is something the engine computed with
and the reader has to be able to say it; this one stands for what the button
does, the way the circle beside it stands for how much light the page has.
What a reader operates it from is `rain.label`, in their own language on the
tooltip and to a screen reader.

**It falls in the engine's own vocabulary and in nothing else.** The names are
in `apps/web/src/lib/glyphs.ts` — the stems and branches, the twenty-four
terms, the palaces, gates, stars and spirits, the twelve generals, the stars
of 紫微, the sixteen gods of 太乙, the lodges and officers, the bodies and
stations of 七政四餘 — and `apps/web/test/glyphs.test.ts` holds that list to
the engine's registries, art by art, so a board landing with names of its own
fails the test rather than quietly missing the rain.

**Not read off `texts/`, and it could not be.** That shelf is gitignored, most
of it was bought and cannot be redistributed under this licence, and
`texts/README.md` states that nothing in the repository refers to it by path.
A clone lacks it and must lack nothing. What the names below the rain have in
common is that this project owns them outright, because it computes with them.

Three things it does not do. It does not print — whatever else it is, it is
not something to put on a sheet. It does not move for a reader who asked for
`prefers-reduced-motion`, who gets the picture drawn once and no loop at all.
And it is not remembered: **the privacy note enumerates what is kept in the
browser, and this does not join the list.** The appearance is stored because a
reader who wants a dark page wants it before the first paint; this is one press
away in the header on every page, and a reload puts it back the way the page
ships. The list is two entries long — the appearance, and the site's own code
once it has been installed — and the test of anything proposing to be third is
the one applied here: whether a reader would have to be told.

It draws in `--ink` and `--edge`, read back out of the stylesheet each frame,
so it follows the reader from light to dark without holding a colour of its
own — and the shell takes a ground ten per cent short of opaque while it
falls, which leaves the glyphs perceptible under the text and plainly visible
in the margins outside it.

## `geo`, and the dataset it stands on

Location search matches by **range, never with `LIKE`**: SQLite cannot use an
index for `LIKE 'prefix%'` under the default collation and falls back to
scanning every name in the table. See `prefixUpperBound` in `geo/search.ts`
and the query-plan test that guards it.

Measured from a full `allCountries` import on 2026-08-04, kept so the decision
does not have to be re-measured:

| | `cities500` | `allCountries`, class P |
|---|---|---|
| download | ~215 MB | ~620 MB |
| places | 235 073 | 5 048 805 |
| searchable names | 1 217 417 | 12 404 962 |
| database | 90 MB | 1256 MB |

At the larger size a two-letter prefix matches 334 848 name rows over 192 314
distinct places, and ranking them costs 644 ms because every candidate follows
a rowid into the large table. Copying `population` and `country_code` into
`location_names` fixes it — the index then covers the ranking and only the
surviving rows are read — but that is the cost of entry, not an optional
refinement.

## Reproducibility

A chart is a pure function of its input **and of the options that produced
it**, which it carries in its own output. No function in `core` reads a global
default. `tzdata` is pinned, the GeoNames snapshot is versioned, and a place
is stored resolved — coordinates, timezone, options — rather than as an
identifier alone.

See `docs/parameters.md` for the options themselves, `docs/i18n.md` for what
crosses the language boundary, and `docs/refusals.md` for where the engine
stops.
