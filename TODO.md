# What is not built yet

What a session needs to resume, and nothing more. What holds is
[`docs/`](docs/README.md). The open questions are [`docs/open.md`](docs/open.md),
with [`docs/open-recorded.md`](docs/open-recorded.md) and
[`docs/open-errands.md`](docs/open-errands.md) beside it. The past is
[`docs/history/`](docs/history/README.md), and none of it is normative. This
file has been cut nine times, each time archived whole to a roadmap there; the
last is
[`docs/history/roadmap-2026-11-06-phase101.md`](docs/history/roadmap-2026-11-06-phase101.md).

## Resuming cold

**Nothing is in progress.** Start at item 1 below unless the user says
otherwise, and read a section of `docs/open.md`, not the whole file.

- **A reading**: the file's row in `texts/README.md` (grep the filename), the
  work's section in `docs/sources.md` (grep its title), and the question's
  line in `docs/open.md`. Read `docs/scans.md` for the method, and the
  `shushu` skill's `common/development.md` for what a reading owes and the
  tools on the shelf.
- **A build**: the `new-feature` skill, § "A value of a parameter, built on a
  reading". Surface work starts from `docs/architecture.md` § "A board the
  page can point into". Put a new parameter's shape to the user first.
- **Version and release**: `docs/architecture.md` § "Which term moves" and §
  "Releasing". Tag, push and deploy only on the user's word.
- **Do not open** `docs/sources.tsv` (grep a row, edit in place),
  `docs/history/`, `texts/rules/`, `texts/crosswalk.tsv`, `texts/manifest.json`.
- **Checks**: `npm ci` if there is no `node_modules`. `npm run build` first,
  because the MCP and web suites and the shelf's scripts import
  `packages/core/dist`. Then `npm test`, `npm run typecheck` and
  `node texts/todo-check.mjs`, which holds every backticked name here and in
  the three open-question files to the code. Before ending, sweep
  `docs/sources.md`, `texts/README.md`, the open-question files and this file
  for sentences the session outlived («unread», «not built», «not tagged»…).

## Where it stands, 2026-11-08, end of phase 102

**0.50.0** on `main`, tagged `v0.50.0`, pushed and deployed: https://shipan.it
runs 0.50.0. No branch is open, and build, typecheck and every suite pass.
Phases 98 to 101 read the limits of a 七政四餘 life and built `gong: ci`, the
命度 and the 大限 with `qixian`. Phase 102 read the 量天尺 of the 《張果星宗》
as a ruler by fraction and, on the user's word, lays both under `gong: ci`
with `qixian: du` counting thirtieths of the 命宮; `qixian: ri` leaves the
limits null there. 0.51.0, on `main`, not tagged.

## What to do next, in the order the user has been taking it

1. **月家, `system: yuejia`**, commissioned 2026-11-02: the year board
   (phase 89) laid on the month pillar, sharing `layOnPillar`. Steps, sources
   and the 法竅's evidence: `docs/open.md` § "月家, commissioned".
2. **The scan form's two silent criteria**: `gongpo` is offered always and
   found only under `menpo: gongzhimen`, and the gate 中 is laid under
   `gateSeats: nine` and cannot be asked for. `docs/open.md` § "Surfaces and
   code".
3. **The shelf**, two named sections of files held: `docs/open.md` § "The
   shelf".
4. **Two leads**, neither file held: `docs/open.md` § "Leads from the `shushu`
   skill".
5. **The review of 2026-10-23**: `docs/open-errands.md` § "The review of
   2026-10-23". Several lines are a missing row in `docs/sources.tsv`,
   writable from what is already read.
6. **The lens, when it moves again**: the month board is designed with its
   lens; 八字 last, and only if the user wants it. `docs/open-errands.md` §
   "When the lens moves again".

## Decisions held open, by the user's word

- **六壬's lessons and transmissions in the bare drawing** (2026-10-25): kept,
  being 7 of the 19 seats `liurenLens` presses; removing them needs a ruling
  on what the lens does with those seats.
- **太乙's 月計 · 日計 · 時計: wait, all three** (2026-10-11). Each is a second
  input type, a `dayBoundary` under the board's name, a ruling on `gate`,
  `sanji`, `wufu`, `dayou` and `ding`, and a line in `lib/cacheable.ts`.
- **囚 and 格 on the dated boards of 卷七: rung 5** (2026-10-14).
- **The test of a count by its digits: not built** (2026-10-15).
- **截路空亡 on a 戊 or 癸 day: wait** (2026-10-26).

**Standing answers, applied rather than asked again**:
- A run of worked cases unanimous on a question makes a holder (2026-10-30);
  a study describing a count does not (2026-10-31).
- A compiler's note disowning a layer his own juan states does not block a
  value whose text is attributed and transcribed (2026-11-02).
- A parameter has one default for every board it reads on, and a form may
  fill a field from a value (`fills`, 2026-11-05).
- Two schools parting on two things are two axes, and a name follows the
  print that carries it (`gateSeats`, `spiritRing`, 中, 2026-11-06).
- A quantity derivable under the default and blocked under another value is
  built under the default and left null under the other, saying why (the
  命度 and the 大限 under `gong: ci`, 2026-11-06).

## 1. Parameters that are declared and refused

Each throws `OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED`.
`apps/web/test/docs.test.ts` holds this table to `parameters.ts` both ways.
What each waits on: `docs/open.md` § "What each refused value waits on".

| Board | Refused today |
|---|---|
| 奇門 | `system: yuejia`, `strengths: star` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `minggong: ascendant` |
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split` |

## 2. What stays out

Spanish waits until the engine stops moving (`docs/i18n.md`). The 用神 and
everything beside it stay refused (`docs/refusals.md`).
