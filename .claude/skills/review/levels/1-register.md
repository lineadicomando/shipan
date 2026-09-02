# Level 1 — the register

**What it owns.** `docs/sources.md`, `docs/sources.tsv`, `docs/provenance.tsv`,
the ladder and the register's description in `docs/notes.md`, and `texts/`
insofar as `docs/` leans on it (`docs/scans.md`).

**Why it is first.** A rung is the reading of today's evidence. When one moves,
a parameter may become arguable, a page's claim may become too strong, and a
surface that prints the rung prints a stale one. Everything below inherits it.

## Read before judging

- `docs/notes.md` § "The ladder of evidence" — what a rung is, and the three
  things it deliberately does not carry
- `docs/notes.md` § "The register" — the seven columns
- `docs/sources.md` § "The standard, stated once", § "When a source arrives
  later", § "What a second copy of one text buys"
- `docs/scans.md` § "A search returning nothing is not a negative" and § "What a
  file is, before what it says", if anything on the shelf is in question

`docs/sources.md` is ~5 000 lines. **Grep it for the quantity or the title; read
the section the hit is in and no more.** Opening it whole to check one row is
the expensive mistake.

## Already asserted by a test

- `apps/web/test/docs.test.ts` — the counts the documents state, against the code
- `apps/web/test/notes.test.ts` — that the notes section covers every board the
  register weighs a quantity for, and every board the engine declares a
  parameter for
- `apps/web/test/references.test.ts` — that every program the sources page links
  to is named as the register names it, and addressed absolutely
- `packages/mcp/test/docs.test.ts` — the counts `docs/architecture.md` states
  about MCP

Do not re-read for those.

## The passes only a reading can make

**A quantity with no row.** Take the engine's declared quantities and find each
in `sources.tsv`. A quantity the engine carries and the register does not weigh
is the finding `CLAUDE.md` calls «a quantity nobody can weigh» — and note that
`docs/notes.md`'s ladder has a rung for exactly that case, so the finding is a
missing row, not necessarily a missing source.

**A rung that is not the strongest check actually run.** For each row, compare
`rung` against what `checked_against` says was run, and against the argument in
the section the last column names. Two failures to look for, and they fail in
opposite directions: a rung claiming an independent implementation where the
comparison was one author's reading of a contested tradition, and a rung left
low after a confirmation that would have raised it.

**A rung that moved and dragged nothing with it.** `docs/sources.md` § "When a
source arrives later" says an arrival moves four things at once. Take the most
recent arrivals — `git log` over `docs/sources.md` and `texts/` — and check that
each moved the argument, the row, the `implemented` flag where it unlocks a
refused value, and the date a written entry shows.

**A collation filed as a rung.** A second copy of one text moves three things
and never the rung. A row whose `checked_against` reads like a collation and
whose rung rose with it is the finding.

**A negative that a later arrival reopened.** `CLAUDE.md`: a negative is about
the shelf that was asked. For each file added to `texts/` since a negative was
closed, put the standing question to the arrival and the closed negative back to
it. Bounded to those two — this is not a re-reading of the register.

**Provenance that cannot be reproduced.** Every row of `provenance.tsv` carries
a URL, a revision, a date and a sha256. Spot-check that files on the shelf still
hash to what the row says; a mismatch is a finding whether or not the content
looks right.

**A claim `docs/sources.md` makes about a text nobody can hold.** The scans are
not in the repository, so every claim has to stand for a reader who has only the
citation. A sentence that only makes sense with the plate in front of you is a
finding.

## What a finding here invalidates

A rung that moves ⇒ level 2 (whether a value is still refusable on that
evidence), and every surface that prints the rung — `apps/web/src/lib/server/register.ts`,
the sources page. A row added or removed ⇒ `docs.test.ts` will say so.
