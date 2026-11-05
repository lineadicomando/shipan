# What is not built yet

What a session needs to resume, and nothing more. What holds is
[`docs/`](docs/README.md); every open question, with what would answer it, is
[`docs/open.md`](docs/open.md); how it got here is
[`docs/history/`](docs/history/README.md), never normative. Cut five times,
each time whole to a roadmap file in `docs/history/`, the last
[`docs/history/roadmap-2026-11-02.md`](docs/history/roadmap-2026-11-02.md).

## Resuming cold

**Nothing is in progress.** Start at item 1 of "What to do next" unless the
user says otherwise.

- **A reading**: the file's row in `texts/README.md` (grep the filename), the
  work's section in `docs/sources.md` (grep its title; the file is thousands
  of lines), the question's line in `docs/open.md`. Method: `docs/scans.md`
  once, and the `shushu` skill's `common/development.md`, which also lists
  what a reading owes.
- **A build**: the `new-feature` skill, whose § "A value of a parameter,
  built on a reading" lists what a built value owes; surface work starts from
  `docs/architecture.md` § "A board the page can point into".
- **The version and a release**: `docs/architecture.md` § "Which term moves"
  and § "Releasing". Tag, push and deploy on the user's word only.
- **Do not open** `docs/sources.tsv` (grep a row, edit it in place),
  `docs/history/`, `texts/rules/`, `texts/crosswalk.tsv`,
  `texts/manifest.json`.
- **Checks**: with no `node_modules`, `npm ci`, which keeps the lockfile.
  Then `npm run build` (the MCP and web suites and the shelf's scripts import
  `packages/core/dist`), `npm test`, `npm run typecheck`, and
  `node texts/todo-check.mjs`, which holds every backticked name here and in
  `docs/open.md` to the code and sees only files git tracks. Before ending, sweep
  `docs/sources.md`, `texts/README.md`, `docs/open.md` and this file for
  sentences the session outlived («unread», «still missing», «stays refused»…).

## Where it stands, 2026-11-05, end of phase 92

**0.46.1**, tagged `v0.46.1` and deployed at https://shipan.it (footer
checked 2026-11-05). `main` checked out and pushed, no branch open. Build,
typecheck and every suite pass. The phases are listed in
`docs/history/README.md`.

## What to do next, in the order the user has been taking it

1. **月家, `system: yuejia`**: commissioned on the user's word, 2026-11-02,
   with the year, which is built (phase 89). The month is the same board on
   the month pillar, `layOnPillar` already shared. Four steps, each with its
   sources, in `docs/open.md` § "年家 and 月家, commissioned".
2. **The rest of the three 飛盤 works**: `plate: fei` is built on 《奇門法竅》
   (phase 91). What is left of that work — its 超接 and 拆補 against `method`
   and `leap`, its tables' 格 against the engine's board — and the 鳴法 and
   the 旨歸 are lines 7–9 of `docs/open.md` § "The shelf". The 法竅's lodging
   by the four 立 is recorded with no parameter there.
3. **The scan form's `gongpo`**: offered always, found only under
   `menpo: gongzhimen`, so a scan under the default finds nothing and says
   nothing. A filter like `layableUnder`'s for `stemPairs`, keyed on
   `qimen.menpo` (`docs/open.md` § "Surfaces and code").
4. **A lead from the `shushu` skill** (`docs/open.md` § "Leads from the
   `shushu` skill"): 截路空亡 in 《星曆考原》卷五, the 楊公忌 check in the 華齡
   協紀's 下 volume. Neither file is held.
5. **The review of 2026-10-23**, a line an art, each wanting a plate or the
   user's word (`docs/open.md` § "The review of 2026-10-23"). Several are a
   missing row in `docs/sources.tsv`, writable from what is read.
6. **The lens, when it moves again**: the month board, designed with its
   lens; 八字 last and only if the user wants it (`docs/open.md` § "The lens,
   when it moves again").

## Decisions held open, by the user's word

- **六壬's lessons and transmissions in the bare drawing** (2026-10-25): asked
  out, kept, being 7 of the 19 seats `liurenLens` presses. Taking them out
  needs a decision on what the lens does with those seats.
- **太乙's 月計 · 日計 · 時計: wait, all three** (2026-10-11). Each is a second
  input type, a `dayBoundary` under the board's name, a ruling on `gate`,
  `sanji`, `wufu`, `dayou` and `ding`, and a line in `lib/cacheable.ts`.
- **`gong: ci`**: not built until a second copy gives the three miscopied cells.
- **囚 and 格 on the dated boards of 卷七: rung 5** (2026-10-14), until a source
  moves it.
- **The test of a count by its digits: not built** (2026-10-15), until a work
  states the rule.
- **截路空亡 on a 戊 or 癸 day: wait** (2026-10-26).

**Standing answers, to apply rather than ask again**: a run of worked cases
unanimous on a question makes a holder (2026-10-30, 陳公獻); a study
describing a count does not (2026-10-31, 盧央); a compiler's note disowning a
layer his own juan states does not block a value whose text is attributed and
transcribed (2026-11-02, the 統宗's 按).

## 1. Parameters that are declared and refused

Each throws `OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED`;
`apps/web/test/docs.test.ts` holds this table to `parameters.ts` both ways.
What each waits on is `docs/open.md` § "What each refused value waits on".

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
