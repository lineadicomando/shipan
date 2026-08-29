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
| `packages/core` | `i18n` | the calculation engine and the `shipan` command |
| `packages/plate` | nothing | the drawings: SVG, and PNG at a separate entry point |
| `packages/mcp` | `core`, `geo`, `i18n`, `plate` | MCP server, stdio transport |
| `apps/web` | all of them | SvelteKit: the interface and the REST API |

Four of the edges above are absences, and each is load-bearing.

**`core` does not depend on `geo`.** The engine is handed a place already
resolved — coordinates, a zone, and the options that were chosen — and never
looks one up: turning a name into a place is a decision with a person in it,
which is why it belongs to a surface and to `docs/refusals.md`. The CLI takes
`--lat`, `--lon` and `--tz` for the same reason, and the ninety megabytes of
place names stay where only the surfaces that offer a search can reach them.

**`plate` imports nothing from `core`, not even types.** It redeclares the
shape it needs — of a chart, of a 六壬 board, of a 太乙 grid alike — and
`packages/plate/test/types.test.ts` asserts the copies still agree. A drawing
package that could reach the engine would end up computing; and the absence is
what keeps the natural direction available, since the day the CLI prints a
drawing it is `core` that imports `plate` and nothing has to be untangled
first.

**The PNG lives at `@shipan/plate/png`**, a separate entry point, because
it pulls a native module that must never reach the browser. It also needs a
CJK font *and* `fontconfig` — the glyphs are the content, and without either
the drawing comes out an empty grid, silently. `png.ts` refuses to draw when
it detects it, and the runtime image installs both.

**The client imports only types from `core`.** A value import would drag the
ephemerides and a native module into the browser bundle.

### What the dev server is looking at

Every package above resolves to its `dist/`, and `vite dev` does not build
them. So a message edited in `packages/i18n/src` does not reach
`http://localhost:5173` until somebody compiles it, and what stands on the
screen in the meantime is the last build — which looks exactly like a change
that did not work. It cost an afternoon once: a catalog was edited, the page
was reloaded, the old string came back, and the edit was hunted for in the
component that prints it.

`npm run dev -w @shipan/web` therefore runs `predev` first and builds the four
packages the app depends on. Two and a half seconds, and the dev server is
never showing yesterday's output. Two things it does not do, both on purpose:
it does not watch, so a package edited *during* a session still wants a build
or a restart; and it does not alias the packages to their sources, which
would fix the watching and open a worse hole — the browser bundle would read
`src` while `core`, which is external to the SSR bundle and resolves through
node, would go on reading `dist`, so the two halves of one page could print
two versions of the same message.

The tests are not affected: `npm test` builds along the way, and every test
that reads a catalog reads the source.

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
| Web | eight sections at `/en` and `/it`: two acts, six instruments. See `apps/web/src/lib/navigation.ts`. Under the footer, six notes pages and a privacy page, which are not sections and are not addressed by an art; and a page nothing links to, `/[lang]/offline` |
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

## Found by a search, and what may never be found

The interface is public and meant to be found. What is on it is not: an
address here is frequently a board cast for somebody, with the date, the time
and the place of birth written into the query string.

**Two rules, in two files, failing closed in opposite directions.**
`lib/cacheable.ts` decides what a browser may write to disk and its guard is a
*prefix* — nothing under `/api`, ever, so a seventh board is refused the day it
lands rather than the day somebody remembers. `lib/indexable.ts` decides what a
crawler may put in an index and its guard is an *allowlist*: an address is
indexable only when it is a page the registries declare and carries no query at
all. There the danger was a hole; here it is a leak, and «closed» is not the
same word.

| | |
|---|---|
| a section, a note, the privacy page | canonical, the full set of `hreflang`, a description, a card, one piece of structured data |
| the same address carrying a question | `noindex, follow`, and none of the above |
| anything under `/api` | `Disallow` in `robots.txt`, and `X-Robots-Tag: noindex` from `hooks.server.ts` |
| `/[lang]/offline` | absent from the sitemap: an apology for a page nobody asked for is not a destination |

A `noindex` page carries **no** canonical and no alternates. The two together
are a contradiction a search engine resolves by guessing, and what it would be
guessing about is an address with a birth in it. For the same reason
`robots.txt` deliberately leaves those addresses crawlable: a crawler told not
to fetch one never reads the refusal on it, and stays free to index the address
from a link alone.

**`/robots.txt` and `/sitemap.xml` are routes and not files in `static/`.**
Both have to name an absolute address, and this project holds no domain
anywhere — the origin arrives with the request. In production that means
`ORIGIN` must be set, which is what `adapter-node` builds `event.url` from
behind a proxy; `compose.yaml` sets it. Set it wrong and the canonical points
at the wrong site, which is the one failure here that is invisible from the
inside.

The sitemap is derived from `SECTIONS` and `NOTE_PAGES`, so a board that lands
in the nav is listed the same day. It carries no `lastmod`, `changefreq` or
`priority`: nothing in this repository knows when a page's content changed, and
the other two are ignored.

**What a page says it is lives in `lib/meta.ts`** — a title, a description, and
the two paragraphs a section opens with, set in two columns above the form
where the heading is not. That file is *written* rather than derived, which is
the exception `docs/notes.md` allows: what may never be written is what changes
when a board lands, and an account of what 六壬 is for, addressed to somebody
who has never heard of it, is not a fact about the computation.
`apps/web/test/meta.test.ts` holds it to the addresses in both directions.

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
own — and the shell takes a ground twenty per cent short of opaque while it
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

## The licence asks for an address, not a sentence

AGPL-3.0-or-later, imposed by Swiss Ephemeris, and §13 is the clause a website
answers to: somebody who interacts with this over a network is owed the
Corresponding Source of **the copy they are talking to**. That is more than
naming the licence. The footer's third line names it and links it, on every
page under `[lang]`, and the sentence the catalogs already held — «Source code
under AGPL-3.0», «Codice sorgente sotto licenza AGPL-3.0» — is the label of
the link rather than a new string, so a third vernacular costs nothing here.

The address is written once, in `apps/web/src/lib/source.ts`, and read from
`PUBLIC_SOURCE_URL` per request. **Per request because of forks.** A copy
deployed with changes owes its readers *its own* source, and a footer pointing
at this repository is a host in violation until it is corrected — which should
be a variable to set, not a build to redo. Unset, it falls back to this
project's repository, the true answer for every unmodified copy: an offer that
vanishes when a variable is missing is the outcome the licence does not allow.
Nothing carrying the footer is prerendered, which is what leaves a per-request
read available at all — `[lang]/offline` is built ahead of time and wears none.

**On paper the anchor stops being an offer**, so the print rules set the
address after it. A printed chart travels furthest from the page that cast it,
and it is the copy most likely to be read by somebody who never had the site.

`apps/web/test/source.test.ts` holds all of it: the variable, the fallback,
the anchor, and the address appearing in no second place.

## A link that leaves

Only one does today — the source in the footer — and the rule is written once,
in `apps/web/src/lib/external.ts`, so that the second one inherits it rather
than repeating it. `EXTERNAL` is spread onto the anchor: `target="_blank"` and
`rel="noopener noreferrer"`.

**Beside the page and not over it.** A reader here is looking at a board cast
for a moment they chose, or at a prompt they are part-way through assembling.
Nothing on this site is a step in a flow somebody should be taken out of, and
what a replaced page costs on the way back is the scroll position they left.

**`noreferrer` is the rule the rest of the site already obeys, applied on the
way out.** An address in this interface is frequently somebody's date, time and
place of birth in a query string — the reason a chart is cacheable `private`
and refused an index. A referrer hands that whole address to whoever is at the
other end of the link. Browsers today send only the origin across sites, and
«today» is not what a person's birth should rest on.

`apps/web/test/external.test.ts` derives the list rather than keeping one: an
external address is a constant in `lib/` holding an absolute `http(s)` address,
and every anchor naming one is held to the spread. A hand-kept list of links is
right until somebody adds the twelfth.
