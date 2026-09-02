# Level 3 — the engine

**What it owns.** `packages/core`, `packages/geo`, and the boundary rules that
keep them pure: no localisation, no global default, no answer to a question.

**Why it is third.** By now what may exist is settled. This level asks whether
what exists is right, and whether it stayed inside the boundary.

## Read before judging

- `docs/architecture.md` § "Inside `core`" and § "The packages"
- `docs/i18n.md` § "The engine does not localise"
- `docs/sources.md` for the board under review — grep, do not open
- `docs/refusals.md` for what this board must stop short of

## Already asserted by a test

One suite a subject, under `packages/core/test/`: the four pillars and their
boundaries, the sexagenary cycles, the solar terms, the lunar calendar, the
dunjia plates and their patterns, 六壬, 太乙 against its 立成 and its worked
boards, 紫微斗數 against the text and the arithmetic, 七政四餘's ring, the almanac,
年命, the scan, the transliteration, the CLI, the prompt, and the dashes the
engine prints. `packages/geo/test/search.test.ts` covers the lookup.

**Verification against an independent implementation is a test's job, never a
review's.** `CLAUDE.md` is explicit that recalled almanac values were wrong more
often than not. A review that checks a pillar from memory produces false
findings; if a quantity is unverified, the finding is «no test covers it», not a
number.

## The passes only a reading can make

**A function in `core` that picks a language.** Grep the package for locale
identifiers, for `en`/`it` as values, for any `Translator` that is constructed
rather than received. `labels.ts`, `format.ts` and `prompt.ts` are handed one.
The CLI may choose; it is a surface that happens to live there.

**A name that lost its reading.** The engine's output carries hanzi *and*
toneless pinyin at all times bar one — a `prompt.` message. A board's output
type that dropped the reading, or an identifier that collided without being
tone-numbered, is the finding.

**A global default.** Any `core` function reading module state, an environment
variable, or a constant that stands in for an option. The test for whether it
matters: a saved chart must reproduce identically from its own carried options.

**A quantity the engine carries that no test and no register row reaches.**
Cross the board's output fields against its suite and against `sources.tsv`.
This is the pass that finds the field somebody added while doing something else.

**The two calendars confused.** The lunar calendar is reckoned on 120°E; the
civil day the day pillar reads follows the chart's zone. A function taking the
chart's zone into a lunar computation, or the reverse, is the finding — and it
is invisible until a chart is cast in Rome.

**A verdict where a count belongs.** The five elements arrive counted, zeroes
included. Strong, weak, favourable, compensating: those are method steps that
travel signed in a prompt, and an engine function computing one is the finding.

**An error carrying a sentence.** Every error carries `code` and `params`;
`message` is English for logs. Grep for thrown strings and for interpolated
prose. `GeoError` is the shape.

**A number that moved without its row.** `git log -p` over the board's source
since the last review: a changed constant, table or rounding is a level-1
finding wearing level-3 clothes.

## What a finding here invalidates

A number ⇒ levels 4 and 5 for that board, and a row at level 1. A boundary
violation ⇒ nothing below, but it is the kind that spreads if left.
