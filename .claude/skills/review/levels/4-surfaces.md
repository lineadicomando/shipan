# Level 4 — the surfaces

**What it owns.** `apps/web` (the interface, `/api`, the service worker, the
manifest, `robots.txt`, `sitemap.xml`), `packages/mcp`, `packages/plate`, and
the `shipan` CLI in `packages/core/src/cli.ts`.

**Why it is fourth.** A surface tells the engine. Almost nothing found here
changes anything below it — which is exactly why reviewing it before levels 1–3
wastes the pass.

## Read before judging

- `docs/architecture.md` — most of this level's rules are argued there:
  § "The surfaces", § "Two measures on a section page, and no more", § "Paper is
  the fourth appearance", § "Found by a search, and what may never be found",
  § "Installed, and what an installed copy cannot do", § "The licence asks for an
  address, not a sentence", § "A link that leaves", § "The version, and the tag
  that repeats it"
- `docs/i18n.md` § "What leads, and what stands beside" and its bounding
  subsection, before judging any control whose face is a glyph
- `docs/refusals.md` § "A place from a name" and § "The latitude, in any
  calculation"

## Already asserted by a test

Under `apps/web/test/`: `cacheable`, `indexable`, `crawl`, `meta`, `external`,
`source`, `version`, `manifest`, `service-worker`, `structured`, `navigation`,
`headings`, `glyphs`, `names`, `vocabulary`, `interval`, `step`, `load`, `api`,
`catalog-keys`, `docs`, `notes`, `parameters`, `references`. Under
`packages/mcp/test/`: `server`, `docs`. Under `packages/plate/test/`: one a
drawing, plus `types` for the redeclared shapes.

Between them these cover: what may be cached and that nothing under `/api` is,
what may be indexed and that a board's address is not, that `robots.txt`
forbids the endpoints and leaves the chart addresses crawlable so the refusal
can be read, that every indexable address has a `meta.ts` entry and no other
does, that a link leaving carries no referrer, that the version is one number
across every manifest, that the service worker keeps no chart and says nothing
unprompted, that the nav carries the sex only to the boards it is a parameter
of and no birth into another board, that a section's heading is written once
from the registry, and that a form offers the identifiers the engine knows.

**That is most of the mechanical half of this level.** Do not re-derive it.

## The passes only a reading can make

**A control whose face is a glyph.** Walk the components a reader *operates* —
buttons, options, toggles, table headers that sort. Everything operated or
decided from leads in the reader's language; a `title` does not rescue it. The
bound matters as much as the rule: an arrow, a printer or a circle names nothing
and carries its word as an accessible name only. Findings here are per control,
with the file and the line.

**A parameter in force that the board does not say.** For each board with more
than one implemented value, check that the page, the drawing's caption, the
prompt and the MCP output all say which school laid it — moved or not. This is
the level-2 rule read on five surfaces.

**A third left margin.** A section page has two measures: `--board` for the
drawing and its caption, `.reading` for everything read off it. A table or a
note that invents its own width is the finding, and slack in a table goes to one
column rather than being shared out.

**Paper.** Print the section — every component says whether it belongs on a
sheet, and the drawn board is the exception CSS cannot reach. Check that the
footer's address is set after the anchor, where an anchor offers nothing.

**A place read as a name.** `readPlace`, `resolvePlace`,
`LocationSearch.svelte`, and the MCP tools: an identifier, or coordinates, or an
identifier refined by coordinates. Half a pair is refused rather than half-read,
and the answer says both halves. `refines` in `lib/moment.ts` carries what
departs from the chosen place.

**The latitude in a form.** It is carried and printed and enters no calculation.
It is said in the documentation and **not** in the form; a form that explains it
is the finding, and so is a calculation that reads it.

**Prose crossing HTTP.** An endpoint returning a sentence instead of `code` +
`messageKey` + `params`, or a surface parsing one. `lib/server/errors.ts` is the
shape.

**An address that is not the art's.** `/api/qimen` answers a `qimen`; the
consultation is the exception and `/[lang]/consult` is its name, not a second
address. A new endpoint or section that broke the correspondence is the finding.

**What the MCP server tells a model it can do.** Its instructions and its tool
descriptions are a surface with no test for their *truth*: read them against the
engine's current boards, parameters and refusals.

**A drawing that says more than the engine does.** `packages/plate` redeclares
its own types, so it can drift into asserting something the board does not
carry — a colour standing for a phase nobody registered, a label the engine
does not produce.

## What a finding here invalidates

Usually nothing below. A drawing or an endpoint found to assert something
uncomputed is a level-2 or level-3 finding, and belongs there.
