# What is not built yet

What a session needs to resume, and nothing more. What holds is
[`docs/`](docs/README.md); the open questions are [`docs/open.md`](docs/open.md),
[`docs/open-recorded.md`](docs/open-recorded.md) and
[`docs/open-errands.md`](docs/open-errands.md); the past is
[`docs/history/`](docs/history/README.md), never normative. Each cut of this
file is archived whole there, the last in
[`docs/history/roadmap-2026-11-08-phase105.md`](docs/history/roadmap-2026-11-08-phase105.md).

## Resuming cold

**Nothing is in progress.** Start at item 1 below unless the user says
otherwise. Read a section of a file, not the file.

- **A build**: the `new-feature` skill; surface work starts from
  `docs/architecture.md` § "A board the page can point into". Put a new
  parameter's or a lens's shape to the user first.
- **A reading**: the file's row in `texts/README.md` (grep the filename), the
  work's section in `docs/sources.md` (grep its title), `docs/scans.md`, and
  the `shushu` skill's `common/development.md`.
- **Version and release**: `docs/architecture.md` § "Which term moves" and §
  "Releasing". Tag, push and deploy only on the user's word.
- **Do not open** `docs/sources.tsv` (grep a row, edit in place),
  `docs/history/`, `texts/rules/`, `texts/crosswalk.tsv`, `texts/manifest.json`.
- **Checks**: `npm ci` if there is no `node_modules`; `npm run build` first
  (the MCP and web suites and the shelf's scripts import `dist`); then
  `npm test`, `npm run typecheck` and `node texts/todo-check.mjs`, which holds
  every backticked name here and in the three open-question files to the
  code. Before ending, sweep `docs/sources.md`, `texts/README.md`, the
  open-question files and this file for sentences the session outlived.

## Where it stands, 2026-11-08, end of phase 105

**0.53.0**, tagged `v0.53.0`, pushed and deployed: https://shipan.it reads
`shipan 0.53.0 (alpha)`. Nothing is committed past it. Build, typecheck and
every suite pass.

## What to do next, in the user's order

1. **What the year and month boards left**:
   - a canonical board of each in `packages/core/test/canonical/` (the
     fascicle holds the hour board only);
   - the 遁甲集成 第三冊's 年家 and 月家 tables, pp. 1160–1216, set against
     `yearYuan: yiqisi` and `monthYuan` cell by cell (a bench, as
     `texts/qimen/daquan-juan05-10-hours/` did for the hours);
   - the 演義's month layer, 「三箇月一移」, a gate three months to a palace,
     not laid: a reading, then a question for the user;
   - the month laid flown, as 《奇門法竅》's 論月奇法 lays it, only if `plate`
     is ever offered on a board on a pillar.
2. **The scan form's silent criteria**: `docs/open.md` § "Surfaces and code",
   first line.
3. **The shelf** names no section today: `docs/open.md` § "The shelf", and
   `docs/open-errands.md` § "Left open by the readings".
4. **Two leads**, neither file held: `docs/open.md` § "Leads from the
   `shushu` skill".
5. **The review of 2026-10-23**: `docs/open-errands.md` § "The review of
   2026-10-23"; several lines are a missing row in `docs/sources.tsv`.
6. **The lens elsewhere**: `docs/open-errands.md` § "The lens elsewhere";
   八字 last, and only if the user wants it.

## Decisions held open, by the user's word

- **六壬's lessons and transmissions in the bare drawing** (2026-10-25): kept,
  being 7 of the 19 seats `liurenLens` presses.
- **太乙's 月計 · 日計 · 時計: wait, all three** (2026-10-11).
- **囚 and 格 on the dated boards of 卷七: rung 5** (2026-10-14).
- **The test of a count by its digits: not built** (2026-10-15).
- **截路空亡 on a 戊 or 癸 day: wait** (2026-10-26).

**Standing answers, applied rather than asked again**:
- A run of worked cases unanimous on a question makes a holder (2026-10-30);
  a study describing a count does not (2026-10-31).
- A compiler's note disowning a layer his own juan states does not block a
  value whose text is attributed and transcribed (2026-11-02).
- A parameter has one default for every board it reads on, and a form may
  fill a field from a value (`fills`, 2026-11-05); a parameter about a thing
  reads wherever that thing is laid (`spiritPhase` on the year and month
  boards, 2026-11-08).
- Two schools parting on two things are two axes, and a name follows the
  print that carries it (2026-11-06); a value is named for its rule and not
  for a label a holder swaps (`monthYuan`, 2026-11-08).
- A quantity derivable under one value and not under another is built where
  it can be and left null where it cannot, saying why (the 大限 under
  `gong: ci` with `qixian: ri`, 2026-11-08).

## 1. Parameters that are declared and refused

Each throws `OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED`;
`apps/web/test/docs.test.ts` holds this table to `parameters.ts` both ways.
What each waits on: `docs/open.md` § "What each refused value waits on".

| Board | Refused today |
|---|---|
| 奇門 | `monthYuan: yuejian`, `strengths: star` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `minggong: ascendant` |
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split` |

## 2. What stays out

Spanish waits until the engine stops moving (`docs/i18n.md`). The 用神 and
everything beside it stay refused (`docs/refusals.md`).
