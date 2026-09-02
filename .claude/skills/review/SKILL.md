---
name: review
description: Use when AUDITING what is already there rather than changing it — checking one aspect of shipan against its own rules, or the whole project. Five levels ordered by what each invalidates downstream (register, parameters and refusals, engine, surfaces, copy and prompts), each invocable alone. Says for each what the tests already assert, what only a reading can catch, and what to re-check below when something moves. Triggers: review, audit, check the project, is this still true, verify the docs against the code, review the sources, review the surfaces, review the copy, drift.
---

# Reviewing shipan

`CLAUDE.md` binds a **change**: it is read while writing, and the rules apply
to what is being added. This governs the other operation — auditing what is
already there, cold, without having written it.

## What this file is not

**It carries no rule.** Every check below is a pointer to the page that owns
the subject and a statement of what counts as evidence. A checklist that
paraphrases «the engine does not localise» is a third copy of that rule which
ages on its own, and this project's own standard — one fact, one home — forbids
it. If a check here and `docs/` disagree, `docs/` is right and this file is the
bug.

So: **read the pointer before judging the code.** A violation you can recognise
without opening the page is usually a rule you half-remember.

## The order, and why it is this one

The levels are not the package graph — `core → surfaces` is already in
`CLAUDE.md`, and it orders the code's dependencies rather than the truth's.
These are ordered by **how much a finding invalidates below it**:

| | | owns | a finding here invalidates |
|---|---|---|---|
| 1 | [the register](levels/1-register.md) | `docs/sources.md`, both `.tsv`, the ladder | a rung moves ⇒ 2, and every surface that prints the rung |
| 2 | [what may exist](levels/2-parameters.md) | `docs/parameters.md`, `docs/refusals.md` | a value's status moves ⇒ 3, 4, 5 |
| 3 | [the engine](levels/3-engine.md) | `packages/core`, `packages/geo` | a number moves ⇒ 4, 5, and possibly a row at 1 |
| 4 | [the surfaces](levels/4-surfaces.md) | web, API, MCP, CLI, plate | rarely anything below |
| 5 | [copy and prompts](levels/5-copy.md) | catalogs, `meta.ts`, README, `prompt.` | nothing |

Reviewing a section page before the register means reviewing it twice: a
quantity that drops a rung changes what that page is allowed to claim. Reviewing
the register costs one pass whatever happens next.

## Invoking

`/review` with the level, or a word that names one:

- `1`, `register`, `sources`, `provenance`, `evidence`
- `2`, `parameters`, `refusals`, `schools`
- `3`, `engine`, `core`, `calculations`, `geo`
- `4`, `surfaces`, `web`, `api`, `mcp`, `cli`, `plate`
- `5`, `copy`, `prose`, `catalogs`, `prompts`, `readings`

`/review all` runs the five in order. It is a long pass: **stop at the first
level that produces a finding heavy enough to move something below it**, report,
and let the fix land before continuing. Carrying on down while level 1 is known
to be wrong manufactures findings that the fix would have removed.

Given a path or a board instead — `/review qimen`, `/review lib/meta.ts` — take
every level that touches it, still in order, and say which ones you took.

**The words above are the levels' identifiers, not the phrasing of a request.**
The ask arrives in whatever language the person is writing in, and it is matched
by what it means: «rivedi le fonti» is level 1, and it is level 1 without
«rivedi» appearing anywhere here. Nothing about this file is translated for that
to work — how many vernaculars there are is a state, and a list of triggers in
each is the one cost `docs/i18n.md` measures everything against. **Answer in the
language the request was made in**; the findings name files, rules and sections,
and those keep the names they have.

## Run the machine first

Much of what a review would check is asserted by a test, and re-checking it by
reading is the wasted pass. **Begin every level by running the suite**, and take
its silence as the answer for everything it covers:

```sh
npm test
npm run typecheck
```

Each level file names the tests that cover it, so that its own passes can be
about what no test can reach: whether an argument still holds, whether a rung is
still the strongest check actually run, whether a sentence is still true of the
engine. If a level's pass duplicates a named test, delete the pass — or, if the
test is the thing that is missing, that is itself the finding.

## What a review produces

**Findings, or nothing.** A finding is:

- `file:line`
- the rule it violates, named by its page and section — `docs/parameters.md`
  § "What a school value must show"
- what was observed, and how it was established

Nothing else. No narrative report, no summary of what was healthy, no score.
The same reason `docs/` derives what it can rather than writing it: a prose
account of a pass is stale the moment anything lands, and nobody diffs it.

**A level that finds nothing says so in one line.** That is a real outcome and
the common one.

**A finding is not a fix.** Report first. Fixing as you go turns one audit into
a diff nobody asked for, and a level-1 finding usually changes what the fix at
level 4 should be.

## When a review wants to write a document

It does not. What a pass discovered belongs in exactly one of three places:
`docs/` if it is a fact about the present that was wrong or missing,
`docs/history/` if it is the record of a decision this pass forced, `ROADMAP.md`
if it is not built yet. A file called `review-2026-09.md` is none of those and
is where findings go to be forgotten.
