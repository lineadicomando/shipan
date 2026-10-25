# Developing: deciding what to read, what it means, and what to build

How an expert in these arts takes the development decisions of this project.
Every rule this file applies lives in `CLAUDE.md` or `docs/`, and the file
points there instead of repeating it. What it adds is **the order of
questions** and **the judgement of a practitioner** at each.

## Who decides what

The project's history is a series of readings each «put to the user» and built
«on the user's word». Keep that division:

| decide alone, and say what was decided | recommend, and wait for the user's word |
|---|---|
| which reading to take next from `TODO.md`, unless the user named one | a new value of a parameter, a new default, a new parameter |
| how to read a file: survey, resolution, transcription brief, readers | lifting or adding a refusal (`docs/refusals.md`) |
| whether a passage is a copy, a witness or neither | anything under «Decisions held open, by the user's word» in `TODO.md` |
| the rung a reading stands on (`docs/notes.md` § "The ladder of evidence") | pushing, tagging, opening or landing a branch |
| what goes in `docs/sources.md`, `sources.tsv`, `texts/README.md`, `TODO.md` | buying a file |
| the version term a commit earns (`docs/architecture.md` § "Which term moves") | changing a catalog gloss the user wrote |
| proposing a TODO, and where it goes | |
| in a lesson: the sequence of boards and lenses, starting and stopping the dev server it started, where a handout is saved unless the learner names a place | running `geo:import` (about 215 MB) |
| | keeping a learning record in memory (the learner's word), and a manual meant to circulate (`common/teaching.md` § 9.3) |

A recommendation is one sentence of what to do and why, the alternatives in a
line each, and the cost: «yes builds `x: y` held by Z; it moves these marks and
no plate».

## Before anything: where the work stands

`TODO.md` § "Resuming cold", then § 2. That section says what to read and
what not to open. Do not start from `docs/history/`.

## Taking up a reading

1. **Which.** The order in `TODO.md` ("What to do next"), then § 2. A reading
   is worth taking when it can move something: a refused value in § 1, a
   recorded divergence, a rung. A sweep of a book for its own sake is not
   one (§ 2: «nothing here is a sweep of a book»).
2. **What the file is** before what it says: its row in `texts/README.md`; for
   a new file, the four commands of `docs/scans.md` § "What a file is, before
   what it says".
3. **How to read it**: `docs/scans.md` owns the method. The precedents in
   `TODO.md` § "Resuming cold" say which tool fits which shape: a table, a run
   of worked cases, a run of drawn boards, prose with a 起例.
4. **What it is owed when done**: the four things of `TODO.md` § "Resuming
   cold" — argument with date, register row and rung, shelf row, roadmap — and
   a phase in `docs/history/`, and one commit.

## Weighing what was read

The questions, in this order. Each points at the section that answers it.

1. **Is it the text at all?** An extract or a web transcription locates and
   never quotes (`CLAUDE.md`; `docs/scans.md`). Read the cell on the plate. The
   characters that decide a rule are the ones transcription loses: 太 against
   天 by one dot, 乙 against 己, 戊 against 戌, a palace number.
2. **Is it a copy of something held?** Grep the transcriptions on the shelf
   before calling it a new witness (`docs/scans.md`, «a print can be one work at
   its frame and another at its filling»). A second copy settles the text and
   moves no rung (`docs/sources.md` § "What a second copy of one text buys").
3. **Is it a witness?** Attribution and transcription, at any age
   (`docs/sources.md` § "What a value named for a school must show"). A
   commentator quoting a name is a reporter, not a holder.
4. **Is the disagreement between practitioners or between witnesses?** The
   first is a parameter; the second is settled once in the register and never
   becomes a value (`docs/parameters.md`).
5. **Does it lay a board, or state a rule, or both?** A rule stated and boards
   drawn by another rule in the same work make it a witness to neither.
   Worked cases are laid with the engine's step functions before anything is
   claimed about them.
6. **What moves.** `docs/sources.md` § "When a source arrives later": the
   argument, the row and its rung, the `implemented` flag, the date. And §
   "What an arrival reopens": the questions standing are put to the arrival,
   and the negatives already closed are put back to it.

### What a practitioner sees that the rules do not

- **Every school is somebody's.** A modern manual stating a rule as «the» rule
  is a holder of one value, at its date. A manual calling its own rule a
  provisional opinion is still a holder, and says so.
- **Before refusing on a disagreement, name the source that disagrees.** 三奇得使
  stood refused on a disagreement nobody had located; re-read, five
  works paired it alike.
- **A table drawn by a cutter can shift.** 寶鏡圖 prints twenty wheels with the
  day before's rings around the right centre. Before reading a run of
  mismatches as a rule, test whether they fit a neighbouring entry
  (`texts/qimen/daquan-juan60-baojing/scripts/lag.mjs`).
- **A recension can move one stem.** The same 入墓 verse puts 乙 in 坤 in one
  print and in 乾 in another; both are attributed, and the engine carries both.
- **A 目錄 can be wrong about its own book.** The 大全's juan numbers were wrong
  four times; bracket on the 版心.
- **Names are not cells.** One pairing can carry two names in one juan (庚加壬
  as 小格 and 上格), and one name two pairings (天網四張). The engine carries
  the cell and records the names.

## Reviewing

The `review` skill owns the procedure: five levels, run the suite first,
findings and not prose. An expert's contribution is at levels 1 and 2 —
whether an argument still holds, whether a rung is still the strongest check
run, whether a divergence is really between practitioners.

## Building

The `new-feature` skill owns the surfaces to cross. A value built on a reading
always carries: the type and its doc comment saying who holds it; the
declaration in `packages/core/src/parameters.ts` with `heldBy`; a witness in
`packages/core/src/witnesses.ts` if new; both catalogs (the `reader-copy`
skill); `apps/web/src/lib/parameters.ts`; the MCP schema; `docs/parameters.md`;
`docs/agent-prompt.md` where a model reads it; the register; a test holding
the value to the source's own cases where it has any.

## Proposing a TODO

A TODO earns its line when it names **the question, the source that would
settle it, and whether that source is on the shelf**. Where it goes:

| it is | it goes in `TODO.md` |
|---|---|
| a refused value and what it waits on | § 1, both tables |
| a divergence the register records and nothing exposes | § 1, "Recorded, with no parameter" |
| a named section of a held file to read | § 2, the shelf table |
| a small doubt a reading left | "Left open by the reading of …" |
| a file wanted | § 2, "Wanted and not held" |
| a surface or code fault | § 5 |
| something to stay refused | § 6, with its entry in `docs/refusals.md` |

Proposals a practitioner should look for: a doctrine the arts teach that the
engine neither computes nor refuses (each discipline file's section 7 lists
candidates); a worked example in a held text that the bench does not run; a
value held by one witness whose second could be on the shelf already.
