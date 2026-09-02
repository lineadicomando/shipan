# Level 2 — what may exist

**What it owns.** `docs/parameters.md`, `docs/refusals.md`, and their one
declaration in code, `packages/core/src/parameters.ts`.

**Why it is second.** This level says which values a board may carry and which
questions the engine will not answer. A value moving between refused and
implemented changes an input type, an endpoint, a form, a prompt and a page —
so it is settled before any of those are read.

## Read before judging

- `docs/parameters.md` § "Three questions, which is how a divergence is tested",
  § "What a school value must show", § "A declared default is not a hidden
  school", § "A board's parameters travel under the board's name"
- `docs/refusals.md`, whichever sections name the boards under review
- `packages/core/src/parameters.ts` — the declaration itself, including its
  comments, which argue the `implemented` flag

## Already asserted by a test

- `packages/core/test/parameters.test.ts` — `docs/parameters.md` against the
  declaration: values, defaults, what the engine computes, and that a parameter
  added to an input type without an entry does not compile
- `packages/core/test/divergences.test.ts` — the divergences in force, and that
  a transcript says which school laid the board
- `apps/web/test/parameters.test.ts` — that the client redeclares every
  divergence the engine declares, in the same order, with the same assumptions
- `apps/web/test/vocabulary.test.ts` — that the identifiers a form offers are
  the ones the engine knows

The table's shape is therefore not a review pass. What follows is.

## The passes only a reading can make

**A divergence that is not one.** Put the three questions in
`docs/parameters.md` § "Three questions" to each declared parameter. The one
that fails quietly: a disagreement between witnesses to one text, declared as a
parameter. `CLAUDE.md` — a school can be followed, an edition can only be
preferred. A value named for a recension is the finding, and so is a parameter
whose two values are two readings of one passage.

**A school value with no attribution or no transcription.** Not two agreeing
witnesses — that is the register's standard and a different one. For each value
named for a school: is the lineage named, and is the table it turns on
transcribed somewhere a reader can check? `docs/notes.md` § the ladder's closing
paragraphs say why attribution is not a rung.

**A default that is a hidden school.** Where a parameter has more than one
implemented value, what is in force must be stated wherever the board is, moved
or not. Check the board's own surfaces at level 4 against this; the finding
belongs here because the rule is here.

**A refusal that has quietly become computable.** For each section of
`docs/refusals.md`, ask whether anything since — a source at level 1, a
calculation at level 3 — now supplies what it said was missing. A refusal
outliving its reason is as much a finding as one that leaked.

**A refusal that leaked.** The opposite: something the engine now returns that
`docs/refusals.md` says it does not. The ones to probe are the ones that leak as
*prose* rather than as data — `valence` is allowed to travel as an identifier
and a glyph, and the finding is a sentence.

**An unimplemented value substituted rather than refused.** Grep for the
parameter's values at their use sites and check the path taken when the value is
not implemented. A silent fallback is the finding; a `throw` reading the
declaration is correct.

**A parameter travelling bare that should carry its board's name.**
`qimen.method`, `ziwei.yearBoundary`; only a layer's is bare. Check the input
types, the query strings and the MCP schemas together — a name is unique inside
a type and not on a wire.

## What a finding here invalidates

A value moving between refused and implemented ⇒ levels 3, 4 and 5 for that
board, plus the row at level 1 that the unlock depended on. A default changing ⇒
level 4 everywhere that board appears.
