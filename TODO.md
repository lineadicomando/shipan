# What is not built yet

What a session needs to resume, and nothing more. What holds is
[`docs/`](docs/README.md); every open question is
[`docs/open.md`](docs/open.md); the past is
[`docs/history/`](docs/history/README.md), never normative. Cut six times,
each time whole to a roadmap file in `docs/history/`, the last
[`docs/history/roadmap-2026-11-05.md`](docs/history/roadmap-2026-11-05.md).

## Resuming cold

**Nothing is in progress.** Start at item 1 below unless the user says
otherwise.

- **A reading**: the file's row in `texts/README.md` (grep the filename), the
  work's section in `docs/sources.md` (grep its title; thousands of lines),
  the question's line in `docs/open.md`. Method: `docs/scans.md` once, and the
  `shushu` skill's `common/development.md`, which lists what a reading owes.
- **A build**: the `new-feature` skill, § "A value of a parameter, built on a
  reading" for a value; surface work starts from `docs/architecture.md` § "A
  board the page can point into".
- **Version and release**: `docs/architecture.md` § "Which term moves" and §
  "Releasing". Tag, push and deploy on the user's word only.
- **Do not open** `docs/sources.tsv` (grep a row, edit in place),
  `docs/history/`, `texts/rules/`, `texts/crosswalk.tsv`, `texts/manifest.json`.
- **Checks**: `npm ci` if there is no `node_modules`; then `npm run build`
  (the MCP and web suites and the shelf's scripts import `packages/core/dist`),
  `npm test`, `npm run typecheck`, and `node texts/todo-check.mjs`, which holds
  every backticked name here and in `docs/open.md` to the files git tracks.
  Before ending, sweep `docs/sources.md`, `texts/README.md`, `docs/open.md`
  and this file for sentences the session outlived («unread», «stays
  refused»…).

## Where it stands, 2026-11-05, end of phase 92

**0.46.1**, tagged `v0.46.1` and deployed at https://shipan.it (footer
checked). `main` pushed, no branch open; build, typecheck and every suite
pass. Phases: `docs/history/README.md`.

## What to do next, in the order the user has been taking it

1. **月家, `system: yuejia`**, commissioned 2026-11-02: the year board
   (phase 89) on the month pillar, `layOnPillar` shared. Steps and sources:
   `docs/open.md` § "年家 and 月家, commissioned".
2. **The rest of the 飛盤 works**: `plate: fei` is built on 《奇門法竅》 (phase
   91). Left: that work's 超接 and 拆補 and its tables' 格 against the
   engine; the 鳴法; the 旨歸 — lines 7–9 of `docs/open.md` § "The shelf".
3. **The scan form's `gongpo`**: offered always, found only under
   `menpo: gongzhimen`, so a scan under the default finds nothing and says
   nothing. A filter like `layableUnder`'s, keyed on `qimen.menpo`.
4. **Two leads from the `shushu` skill**, neither file held: 截路空亡 in
   《星曆考原》卷五, the 楊公忌 check in the 華齡 協紀's 下 volume.
5. **The review of 2026-10-23**, a line an art (`docs/open.md`); several are a
   missing row in `docs/sources.tsv`, writable from what is read.
6. **The lens, when it moves again**: the month board designed with its lens;
   八字 last and only if the user wants it.

## Decisions held open, by the user's word

- **六壬's lessons and transmissions in the bare drawing** (2026-10-25): kept,
  being 7 of the 19 seats `liurenLens` presses; removing them needs a ruling
  on what the lens does with those seats.
- **太乙's 月計 · 日計 · 時計: wait, all three** (2026-10-11). Each is a second
  input type, a `dayBoundary` under the board's name, a ruling on `gate`,
  `sanji`, `wufu`, `dayou` and `ding`, and a line in `lib/cacheable.ts`.
- **`gong: ci`**: not until a second copy gives the three miscopied cells.
- **囚 and 格 on the dated boards of 卷七: rung 5** (2026-10-14).
- **The test of a count by its digits: not built** (2026-10-15).
- **截路空亡 on a 戊 or 癸 day: wait** (2026-10-26).

**Standing answers, applied rather than asked again**: a run of worked cases
unanimous on a question makes a holder (2026-10-30); a study describing a
count does not (2026-10-31); a compiler's note disowning a layer his own juan
states does not block a value whose text is attributed and transcribed
(2026-11-02); a parameter has one default for every board it reads on, and a
form may fill a field from a value (`fills`, 2026-11-05).

## 1. Parameters that are declared and refused

Each throws `OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED`;
`apps/web/test/docs.test.ts` holds this table to `parameters.ts` both ways.
What each waits on: `docs/open.md` § "What each refused value waits on".

| Board | Refused today |
|---|---|
| 奇門 | `system: yuejia`, `strengths: star` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `minggong: ascendant`, `gong: ci` |
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split` |

## 2. What stays out

Spanish waits until the engine stops moving (`docs/i18n.md`). The 用神 and
everything beside it stay refused (`docs/refusals.md`).
