# shipan 式盤

`shipan` is the identifier, 式盤 is the name, shìpán is the reading — the same
three-part shape every named thing in the engine has. A **pure engine**
(`packages/core`) and **adapters** that expose it on different surfaces.

**This file is the rules, one line each.** Where a rule has an argument behind
it, the argument is in `docs/` and the line points there. Read the pointer
before changing anything the rule covers — the reasoning is what stops a
correct-looking fix from being wrong.

| | |
|---|---|
| `CLAUDE.md` | the rules that bind any change. Here |
| [`docs/`](docs/README.md) | **the project as it is now**: architecture, parameters, sources, refusals, readings, i18n, what is claimed |
| [`docs/history/`](docs/history/README.md) | **how it got here.** Never normative. Never rewritten to match the present |
| [`ROADMAP.md`](ROADMAP.md) | what is not built yet |
| [`README.md`](README.md) | what this is, for somebody arriving |
| [`design/logo/`](design/logo/README.md) | the name, why it was cut, and the marks that carry it |

## Map

| | |
|---|---|
| `packages/i18n` | message catalogs and locale negotiation. A leaf: depends on nothing |
| `packages/geo` | location lookup over a local GeoNames dataset (SQLite) |
| `packages/core` | the engine and the `shipan` CLI: solar terms, lunar calendar, sexagenary cycles, 八字, 奇門, 六壬, 紫微斗數, 太乙, 曆注, scanning an interval |
| `packages/plate` | the drawings: SVG, and PNG at a separate entry point |
| `packages/mcp` | MCP server, stdio transport |
| `apps/web` | SvelteKit: the interface at `/en` and `/it`, and the REST API under `/api` |

npm workspaces monorepo, Node ≥ 22, ESM, TypeScript. Details, and the three
package boundaries that are load-bearing, in [`docs/architecture.md`](docs/architecture.md).

## Commands

```sh
npm test                                # every workspace (vitest)
npm run test:watch -w @shipan/geo
npm run typecheck
npm run build
npm run cli -w @shipan/core -- qimen   # or `shipan qimen` once built
npm run dev -w @shipan/web             # http://localhost:5173
npm start -w @shipan/web               # http://localhost:3000, after build
```

`npm run geo:import -w @shipan/geo` downloads **~215 MB**: run it once,
when location search does not work. Not something to run out of habit.
`npm run geo:fixture -w @shipan/geo` writes a four-place stand-in
instead — enough for every test suite, refused if a database already exists.
`npm run ephe:download -w @shipan/core` (~2 MB) is optional — without it
the engine falls back to Moshier, which needs no files.

## The rules

### The engine

- **English is the language of the source, and a catalog argues a wording in
  the language of that wording.** Code, comments, identifiers, error codes,
  documentation and commit messages are English; a vernacular exists in the
  catalogs and nowhere else. The one exception is a comment defending the word
  it sits above — an argument about an Italian word conducted in English
  quotes its own subject at every mention. Anything else a catalog comment
  says is English. → [`docs/i18n.md`](docs/i18n.md)
- **The engine does not localise, and rendering is not localising.** A
  calculation in `core` returns identifiers, hanzi, pinyin and numbers; the
  printers beside it — `labels.ts`, `format.ts`, `prompt.ts` — are handed a
  `Translator` and never choose one. A function in `core` that picks a
  language is the design error; the CLI may, being a surface that happens to
  live there. → [`docs/i18n.md`](docs/i18n.md)
- **Hanzi are not a locale, and a name carries its reading.** 休門 is the name
  of the gate, not its Chinese rendering, and it is xiūmén to every reader.
  Both travel in the engine's output at all times bar one — a `prompt.`
  message, whose reader is a model; the catalog supplies only the gloss.
  Identifiers are toneless pinyin, tone-numbered only where they would collide
  (`jing1men`, `jing3men`). → [`docs/i18n.md`](docs/i18n.md)
- **The engine answers no question, which is not the same as saying nothing.**
  It carries an attribute the sources hand down concordantly when it belongs
  to the configuration rather than to somebody's situation — which is why
  `Pattern` has a `valence`. It stops at the 用神, ranking, ordering hours,
  dating an outcome, advising. Such an attribute travels as an identifier and
  a glyph, **never as prose**. → [`docs/refusals.md`](docs/refusals.md)
- **No school is implicit, and a chart carries the options that produced it.**
  Every divergence *between practitioners* is an explicit parameter with a
  declared default, present in the input type from the start; an unimplemented
  value is refused, never substituted. **A disagreement between witnesses to
  one text is not one of those** — which reading the engine follows is settled
  once in the register, and no value is ever named for a recension. **A school
  can be followed; an edition can only be preferred.** No function in `core`
  reads a global default. → [`docs/parameters.md`](docs/parameters.md)
- **A school is axes and never a bundle, and a declared default is not a hidden
  school.** Where a parameter has more than one implemented value, what is in
  force is stated wherever the board is — moved or not. A preset may fill a
  form's fields and never travel. → [`docs/parameters.md`](docs/parameters.md)
- **How many schools there are is a state and not a design**, as with the
  vernaculars. What a school value must show is **attribution and
  transcription**, not two agreeing witnesses, and attribution is not a rung.
  → [`docs/parameters.md`](docs/parameters.md), [`docs/notes.md`](docs/notes.md)
- **A board's parameter travels under the board's name** — `qimen.method`,
  `ziwei.yearBoundary` — and only a layer's is bare. A name is unique inside a
  type and not on a wire. → [`docs/parameters.md`](docs/parameters.md)
- **A school's doctrine travels quoted or not at all**: the source's own words,
  a clause, glossed, attached to something computed.
  → [`docs/refusals.md`](docs/refusals.md)
- **An art natively about a life gets a board of its own, never dunjia's**, and
  **a birth enters a chart, never the other way about.** Both are the same
  refusal: the natal-Qimen graft. Each board arrives with its own input type,
  output and sources. → [`docs/refusals.md`](docs/refusals.md)
- **The five elements arrive counted, and the count is not a verdict.** Zeroes
  included: an absence weighs as much as an abundance. Strong or weak, and
  what compensates, are method steps that travel signed in a prompt.
- **Errors carry a `code` and `params`, never a sentence.** `message` is an
  English rendering for logs; a surface translates `messageKey` with `params`.
  See `GeoError`. → [`docs/i18n.md`](docs/i18n.md)
- **The lunar calendar is reckoned on 120°E, never on the chart's zone.** It is
  a published artefact: the same instant carries the same lunar date in Rome
  and in Beijing, and Chinese wartime clocks do not move it. The *civil* day,
  which the day pillar reads, does follow the chart's zone.
- **Verify against an independent implementation, not against memory.** Every
  pillar in the tests was checked against `lunar-javascript` over two
  centuries. Recalled almanac values were wrong more often than not. →
  [`docs/sources.md`](docs/sources.md)
- **An extract locates a passage and never quotes one, and a search returning
  nothing is not a negative.** Text recovered from a photograph is a finding
  aid: it fails hardest on the characters a rule is made of, and it can lose a
  clause whole, so a negative is established on the plate or not at all. What a
  file *is* — how many juan, what the pixels are — is settled before anything
  is planned around it. → [`docs/scans.md`](docs/scans.md)
- **A quantity added without an entry in `docs/sources.md` is a quantity
  nobody can weigh, and a row in `docs/sources.tsv` is the other half of the
  entry.** The prose argues it; the row says which rung it stands on, so that
  a surface can weigh it against its neighbours without reading the argument.
  That register is not optional bookkeeping. → [`docs/notes.md`](docs/notes.md)
- **A source arriving later is an ordinary change, and it moves four things at
  once**: the argument, the row and its rung — which may fall as well as rise
  — the `implemented` flag where it unlocks a refused value, and the date a
  written entry shows. Confirming counts as much as contradicting, and nothing
  is quietly rewritten. → [`docs/sources.md`](docs/sources.md)
- **A negative is a negative about the shelf that was asked, so a file arriving
  reopens more than its own entry.** What the register closed for want of a text
  was closed against the files held that day: an arrival is put to the questions
  already standing, and the negatives already closed are put back to the
  arrival. Bounded to those two, never a re-reading of everything. →
  [`docs/sources.md`](docs/sources.md)
- **A second copy of one text settles the text and never the doctrine.** A
  collation retires one risk — the copy is corrupt, the character misread — and
  no other: it moves three things instead of four, never the rung. What an
  edited edition must show to count as that witness, and when a lone reading of
  one may be followed, is settled once. → [`docs/sources.md`](docs/sources.md)
- **A transcribed corpus is a finding aid, and a rung moves only when the
  register moves.** Passages filed by the question they answer say where to
  look and how firmly each was established; a divergence they record is not yet
  a parameter, and a witness located is not a witness weighed. Nothing in
  `docs/` leans on a shelf a reader may not hold. →
  [`docs/notes.md`](docs/notes.md)
- **What changes when a board lands is not written, it is derived.** Wanting to
  hand-write a paragraph about a new board is the signal that a descriptor is
  missing a field, and the fix is upstream of the page. Where a paragraph is
  unavoidable it carries, shown, the date it was last checked against the
  engine. → [`docs/notes.md`](docs/notes.md)

### The surfaces

- **The interface is read by someone who does not read Chinese, in a
  vernacular of their own**, and must be usable without a glossary. Hanzi
  accompany the output, always beside a gloss and always beside the reading;
  everything the reader *operates* or *decides from* leads in their language.
  A `title` attribute does not rescue a control whose face is a glyph, or an
  option that reads `zishi`. **The harm is a name printed as a shape, and a
  face that names nothing is not one** — an arrow, a printer, a circle carry
  their word as an accessible name and no more. → [`docs/i18n.md`](docs/i18n.md)
- **Copy a reader reads is read once**, and the compressed register this file
  is written in is not that. A headless list, a dropped verb, an unnamed
  «l'altro» or a point delivered as a closing reversal all make the reader
  start the sentence again. The diagnosis and the fix for each are in the
  `reader-copy` skill; it governs the catalogs, `lib/meta.ts` and `README.md`,
  and nothing in `docs/`.
- **A limit is a property of the instrument, and copy names it as one.** What
  the engine stops short of is stated plainly — it is half of what this project
  claims — but the subject of the sentence is what the engine has, does or
  hands over, and a negation follows as evidence rather than leading. «What is
  missing», «what is not computed», «what you failed to enter»: each is read as
  an apology for a fault the reader had not suspected, which is a
  metacommunicative effect and survives every hedge. **It is a rule about a
  sentence a person reads**, so a `prompt.` message keeps its prohibitions —
  its reader is a model, being given directives — and what carries over there
  is only that the reading a model writes must not recite them. The two
  exceptions on a page are the privacy inventory and a legal notice. The
  diagnosis and the fix are in the `reader-copy` skill, and this binds what
  that skill binds.
- **How many vernaculars there are is a state and not a design.** English and
  Italian today, Spanish when the engine has stopped moving; nothing may be
  written as though the set were closed at two, and what a third would cost is
  the measure of anything added to the catalogs. →
  [`docs/i18n.md`](docs/i18n.md)
- **A place is an identifier, or coordinates, or an identifier refined by
  coordinates — and never a name.** Half a pair is refused rather than
  half-read, and the answer says both halves. In the forms, what travels is
  what *departs* from the chosen place (`refines` in `lib/moment.ts`). One
  rule on every surface: `readPlace`, `resolvePlace`, `LocationSearch.svelte`.
  → [`docs/refusals.md`](docs/refusals.md)
- **The longitude moves a board; the latitude enters no calculation.** It is
  carried and printed. 七政四餘's `minggong: ascendant` — the 命宮 taken at the
  degree actually rising — is the one method that would read it, and
  `qizheng.ts` declares and refuses that value. Say so in the documentation and
  **not in the form**.
- **Errors cross HTTP as `code` + `messageKey` + `params`.** The surface
  translates; nobody parses prose. See `lib/server/errors.ts`.
- **A chart is cacheable `private`, never `public`.** Its URL holds somebody's
  date, time and place of birth. The solar terms are `public`, and so is a
  太乙 年計 board and its prompt — they are about the sky and a year, and hold
  nobody's data. → [`docs/readings.md`](docs/readings.md)
- **The site installs, and an installed copy keeps the site and nothing that
  was asked of it.** No board can be laid without a network — the engine is on
  the server and the offline page says so, in the reader's language. The
  service worker never touches `/api` and never writes a page back: both are
  somebody's date, time and place of birth. The rule is
  `lib/cacheable.ts`, where a test reads it, and there is no notification of
  any kind. → [`docs/architecture.md`](docs/architecture.md)
- **An address that carries somebody's board is refused an index, and the
  refusal has to be readable to be obeyed.** A section address is the page and
  carries the canonical, the alternates and a card; the same address with a
  question on it carries `noindex` and nothing else, since a canonical over a
  `noindex` is a contradiction resolved by guessing. `robots.txt` therefore
  forbids `/api` and *not* the chart addresses: a crawler told not to fetch one
  never reads the refusal. The rule is `lib/cacheable.ts`'s twin,
  `lib/indexable.ts`, and a test reads it. → [`docs/architecture.md`](docs/architecture.md)
- **A page says what it is, and `lib/meta.ts` is the one place it is said.**
  The title, the description and the two paragraphs a section opens with — in
  two columns, above the form, where the heading is spoken and not seen. It is
  the written half and stays short for the reason that half always does: every
  line doubles with every vernacular. Held to the addresses in both directions
  by a test. → [`docs/architecture.md`](docs/architecture.md)
- **A section page has two measures: the board's and the page's.** The drawing
  is centred at `--board`, and its caption with it; everything read off it —
  the tables, the notes, the line naming the schools — runs wall to wall at the
  page's own, which is `.reading` in `app.css` and carries the dressing of
  those tables with it. A reading that invents a measure of its own is a fourth
  left margin nobody can line anything up against. Slack in a table goes to one
  column and is never shared out among them. →
  [`docs/architecture.md`](docs/architecture.md)
- **A chart prints, and paper is the fourth appearance** — not light, which is
  a paper-*coloured* screen. Each component says whether it belongs on a
  sheet, and the drawn board is the exception CSS cannot reach. →
  [`docs/architecture.md`](docs/architecture.md)
- **Licence AGPL-3.0-or-later**, imposed by Swiss Ephemeris. Every new
  dependency must be compatible with it.
- **A licence that obliges an offer obliges an address, and the footer carries
  it.** §13 owes a reader the source of the copy they are talking to, so the
  line naming AGPL-3.0 links to it; the address is written once, in
  `lib/source.ts`, read from `PUBLIC_SOURCE_URL` so a fork points at itself,
  and set after the anchor on paper, where an anchor offers nothing. →
  [`docs/architecture.md`](docs/architecture.md)
- **A link that leaves opens beside the page and carries no referrer.**
  `lib/external.ts` is the whole rule, spread onto the anchor: the page a
  reader is on is a board they are reading, and the address of it is
  frequently somebody's birth. A test derives the links rather than listing
  them. → [`docs/architecture.md`](docs/architecture.md)

### Handing a board over

Every line here has its argument in [`docs/readings.md`](docs/readings.md);
read it before changing a prompt.

- **A board handed to a model travels computed, and never as a date.** A model
  given a date and a place casts the chart from memory and gets it wrong, and
  a wrong chart read well is unfalsifiable.
- **One board goes into a prompt, never two of one instant.** Where two boards
  agree it is frequently one fact printed twice, and a model reads that as
  corroboration. The instrument is chosen before the press and at no point
  after it.
- **And one school, which is the sharper form of the same rule.** Two schools of
  one art share nearly everything they are made of, so their agreement is the
  part neither disputed. A board is read as the school's that cast it, and the
  transcript says which — derived from the declaration, never written per
  board. Comparing two is done by laying each.
- **The question never reaches the server.** A prompt endpoint is told
  `asked=true` and nothing more; the browser appends the text. A matter
  (`about=true`, 太乙's alone) travels the same way.
- **A consultation is where a board is handed over, and it is the only surface
  that builds a prompt.** `/[lang]` is that section — the one place here where
  the answer is not in the address. Three kinds of instrument, and the kind
  decides what the reader is asked for: 卜 a question, 命 a birth, 天 a year
  and a matter. `needs` in `instruments.ts` settles it.
- **A section is addressed by the art it lays out, and so is its endpoint.**
  `/api/qimen` answers a `qimen`. The consultation is the exception, having no
  art of its own; `/[lang]/consult` is its *name*, not a second address.
- **What is handed over says where the board is, and that address is the
  section of its own art — with what the board is a function of written into
  it.** «The board is at {url}» is a claim: a section lays the board again from
  the query string, the consultation lays nothing until somebody presses, and
  an address that leaves the instant unsaid means whenever it is followed.
  `pageAddress` builds it on the server, `pageLink` in the browser where a
  section offers its own, and neither reads the address bar. What leaves it is
  **a birth put inside somebody else's board** — never a parameter the board is
  a function of, and `gender` is both depending on the art
  (`genderBelongsToBoard`, read by the nav in the same words). →
  [`docs/readings.md`](docs/readings.md)
- **A 命 prompt asks for a reading of the person, and every choice travels
  signed.** The themes are commissioned in it, titled for a theme and never a
  factor; a school's method arrives named as that school's; the 用神 stays
  uncomputed and is chosen aloud.
- **Nobody is on a 太乙 board.** Its subject is a year — no question, no
  person, and `--ask` refused with a message of its own. Its nine palaces are
  numbered **one seat off the 洛書**, and every surface printing it says so.
- **How sure the numbers are stays in `docs/agent-prompt.md`**, not in a
  pasted prompt — unless it is a bound on a quantity that prompt is already
  telling a model how to read.

## Style

Commit messages in English, third person present, saying what the code does
rather than what was done. No conventional prefixes. Examples:
«Finds the twenty-four solar terms», «Exposes the chart over HTTP»,
«Determines the dun and the ju number».

**On `main`, one commit a session is enough, however many surfaces it
crossed** — unless the session says otherwise. What a session produces there
is a change to an interface that already works, and splitting it three ways
buys a history nobody reads at the cost of commits that do not stand up alone.
The subject says what the change does; what used to be three subjects becomes
the body, one paragraph a movement.

**On any other branch, one commit a step** — unless the session says
otherwise. A branch is where work is staged, and a step there is a thing that
was decided, done and checked before the next one began: keeping them apart is
what lets one be read, questioned or dropped without the others. The same
subject rule holds, so each still stands alone. What becomes of the series
when the branch lands is the branch's business and not the step's.

Domain identifiers are toneless pinyin where the domain is Chinese (`ganzhi`,
`jieqi`, `zhifu`, `xiumen`); everything else is English.

## Writing documentation

- **One fact, one home.** A rule stated in three places drifts in two of them.
  `docs/` owns the subject; this file carries the imperative and a pointer.
- **`docs/` is the present, `docs/history/` is the past.** A phase file is
  never edited to match what the code does now — a later phase says it revises
  an earlier one, and `docs/` changes. Nothing in `history/` is normative.
- **Do not write counts by hand.** `apps/web/test/docs.test.ts` asserts the
  ones that exist against the code, because the last hand-written count drifted.
- **Say what holds, not what changed.** «It used to be X and now is Y» belongs
  in a phase file, not in `README.md` or in `docs/`.
- **Where a rule points at the code, it names the code.** `minggong: ascendant`
  and not «the 命宮 by the rising degree»: a paraphrase is unambiguous until a
  parameter arrives whose name it fits better, and then it points at the wrong
  one. The paraphrase stands beside the name, never instead of it.

## Adding a feature

A feature crosses several surfaces and has a procedure of its own — see the
`new-feature` skill.
