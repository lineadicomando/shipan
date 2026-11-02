# What is not built yet

**The engine is built; the open edge is the paper.** This file is what a
session needs to resume and nothing more. What holds is in
[`docs/`](docs/README.md); every question standing open, with what would
answer it, is [`docs/open.md`](docs/open.md); how it got here is
[`docs/history/`](docs/history/README.md), never normative. This file was cut
on 2026-10-08, 10-25, 10-30 and 10-31; each time the whole of it went to
docs/history/roadmap-*date*.md, the last
[`docs/history/roadmap-2026-10-31.md`](docs/history/roadmap-2026-10-31.md).

## Resuming cold

**Nothing is in progress.** Start at item 1 of "What to do next" unless the
user says otherwise. For a reading, read three things and no more:

1. **what the file is**: its row in `texts/README.md` (grep the filename):
   extent, page offset, way in, what is already read;
2. **what is established**: grep the work's title in `docs/sources.md`, and
   read the section the hit is in. The file is thousands of lines;
3. **what the question needs**: its line in `docs/open.md`.

**Do not open** `docs/sources.tsv` (grep a row and edit it in place),
`docs/history/`, `texts/rules/`, `texts/crosswalk.tsv`, `texts/manifest.json`.
**How to read**: `docs/scans.md` once before a first survey, and the `shushu`
skill's `common/development.md`, whose § "Tools on the shelf, by the shape of
what is read" names the script for each shape. **Surface work** starts from
`docs/architecture.md` § "A board the page can point into" and the
`new-feature` skill.

**A reading owes**: the argument in `docs/sources.md`, dated; its row in
`docs/sources.tsv` with the rung (`docs/notes.md` § "The ladder of
evidence"); the row of `texts/README.md`; the lines it settles or opens in
`docs/open.md`, and this file; the `shushu` art file where it says otherwise
(its sections 3, 6, 7, 8); a phase in `docs/history/` with its line in that
README; one commit on `main`.

**A build owes more**: the declaration in `packages/core/src/parameters.ts`
(value, `implemented`, `heldBy`, `label`, `says`, `note`); a witness in
`packages/core/src/witnesses.ts` if new; the holders' table in
`docs/sources.md` (§ "Whose each value of a … board is"); both catalogs under
the `reader-copy` skill; `apps/web/src/lib/parameters.ts` and the MCP schema
in `packages/mcp/src/` (both fail their suites until they carry the value);
`docs/parameters.md`, and `docs/agent-prompt.md` where a model reads it; a
test holding the value to the source's own cases; the version.

**The version** moves by `docs/architecture.md` § "Which term moves", asked
against what is deployed: an address answering differently moves the second
term, something shipping that none answered for the third, nothing shipping
neither. The number goes into every `package.json` and `package-lock.json`
(eight places in the lock) in the commit that earns it. **On the user's word
only**: the annotated tag `v<version>`, message `shipan <version> — <commit
subject>`; `git push origin main` and the tag; `ssh -tt shipan.deploy`, which
deploys `origin/main` and nothing local; then the footer of
https://shipan.it.

**Checks.** In a fresh tree `npm run build` before `npm test` (the MCP and
web suites and the shelf's scripts import `packages/core/dist`); then
`npm run typecheck` and `node texts/todo-check.mjs`, which holds every name in
backticks here and in `docs/open.md` to the code. **Before the session ends**,
sweep `docs/sources.md`, `texts/README.md`, `docs/provenance.tsv`,
`docs/open.md` and this file for sentences the session outlived: «not yet
read», «unread», «still missing», «none opened», «nobody has», «stays
refused», «stays unattributed», «not yet in», «this list is empty».

## Where it stands, 2026-11-02, end of phase 86

**Version 0.43.0**, in every manifest, tagged `v0.43.0` and deployed at
https://shipan.it (footer checked 2026-10-31). `main` is checked out, no
branch is open, and `origin/main` is the release commit; `main` may be ahead
of it by commits that change documents only (`git log origin/main..`). Build,
typecheck and every suite pass, no test skipped.

| | |
|---|---|
| phases 51–70, 2026-10-11 to 24 | the 《統宗》 of 太乙 by its juan, 《御定奇門大全》 卷一 to 卷六十四 for a 起例; ten 奇門 and 太乙 values built on them |
| phases 71–75, 2026-10-24 to 25 | the lens on every drawn board, the bench, `spiritPhase`, `stemPairs: xianji` |
| phases 76–80, 2026-10-26 to 30 | 寶鏡圖's hours; `liuren.shehai` (0.41.0); 陳公獻's 125 cases; the phases of the 十二天將 |
| phases 81–82, 2026-10-30 | 《金函玉鏡》's leap-month 訣例; `leap: runyue` (0.42.0) |
| phases 83–85, 2026-10-31 | 陳公獻 holds `guiren: chou` and `zhouye: branch`, so a default 六壬 board names the 指南 whole; 洪丕謨 holds `yearBoundary: lichun`; 盧央 read and holding nothing (0.43.0) |
| phase 86, 2026-11-02 | the 統宗's sixty-day 局 read on the plate in three copies: it lays a day board with a plate of stems, not `rijia`'s; put to the user, no code moved |

## What to do next, in the order the user has been taking it

1. **`dayDun: liushi`, on the user's word** (phase 86). The 統宗's rule lays a
   day board with a plate of stems, 「法亦同於年奇」, and `liushi` is declared
   on `rijia`'s board, which the rule does not divide. Recommended: withdraw
   the value from `dayDun`, and record the stems day board in `docs/open.md`
   § "Recorded, with no parameter" with its two readings, the 統宗's and the
   古本's. That removes one refused value and moves `parameters.ts`, both
   catalogs, `apps/web/src/lib/parameters.ts`, the MCP schema,
   `test/rijia.test.ts` and `docs/parameters.md`. The alternative is keeping
   it refused with its ground restated.
2. **The scan form's `gongpo`**: offered always, found only under
   `menpo: gongzhimen`, so a scan under the default finds nothing and does
   not say why. A filter like `layableUnder`'s for `stemPairs`, keyed on
   `qimen.menpo`, would fix it (`docs/open.md` § "Surfaces and code").
3. **A lead from the `shushu` skill** (`docs/open.md` § "Leads from the
   `shushu` skill"): 截路空亡 in 《星曆考原》卷五, and the 楊公忌 check in the
   華齡 協紀's 下 volume. Neither file is held.
4. **The review of 2026-10-23**, a line an art, each wanting a plate or the
   user's word (`docs/open.md` § "The review of 2026-10-23"). Several are a
   missing row in `docs/sources.tsv` and can be written from what is read.
5. **The lens, when it moves again**: the month board, designed with its
   lens; 八字 last and only if the user wants it (`docs/open.md` § "The lens,
   when it moves again").

## Decisions held open, by the user's word

- **六壬's lessons and transmissions in the bare drawing** (2026-10-25): the
  user asked for them out; they were kept, being 7 of the 19 seats
  `liurenLens` presses. Unanswered; taking them out needs a decision on what
  the lens does with those seats.
- **太乙's 月計 · 日計 · 時計: wait, all three** (2026-10-11). Any of them is a
  second input type (an instant and a zone where `taiyiBoard` takes a year), a
  `dayBoundary` under the board's name, a ruling on `gate`, `sanji`, `wufu`,
  `dayou` and `ding`, and a line in `lib/cacheable.ts`. What each lacks is in
  `docs/open.md`.
- **`gong: ci`**: read, three cells of twelve miscopied; not built until a
  second copy gives those three.
- **囚 and 格 on the dated boards of 卷七: rung 5** (2026-10-14), reopened only
  by a source that moves it.
- **The test of a count by its digits: not built** (2026-10-15), until a
  sentence in any work states the rule.
- **截路空亡 on a 戊 or 癸 day: wait** (2026-10-26).

**Standing answers, to apply rather than ask again**: a run of worked cases
unanimous on a question makes a holder (2026-10-30, 陳公獻); a study
describing a count does not (2026-10-31, 盧央).

## 1. Parameters that are declared and refused

Each throws `OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED`;
`apps/web/test/docs.test.ts` holds this table to `parameters.ts` both ways.
What each waits on is `docs/open.md` § "What each refused value waits on".

| Board | Refused today |
|---|---|
| 奇門 | `plate: fei`, `system: yuejia`, `system: nianjia`, `dayDun: liushi`, `strengths: star` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `minggong: ascendant`, `gong: ci` |
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split` |

## 2. What stays out

Spanish waits until the engine stops moving (`docs/i18n.md`). The 用神 and
everything beside it stay refused (`docs/refusals.md`). What a reading may not
claim is CLAUDE.md's and `docs/scans.md`'s.
