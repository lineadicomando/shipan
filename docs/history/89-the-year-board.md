# Phase 89 — the board of a year, `system: nianjia`

2026-11-05, the same session as phase 88, on the user's word («procedi») after
the plate checks. Three surface decisions were put to the user first and
answered the recommended way: the board is `private` in a cache, the
consultation does not offer it yet, and it is drawn on the hour board's grid.

## What was built

`packages/core/src/dunjia/nianjia.ts`: `computeYearChart` and `layOnPillar`,
which call the hour board's step functions with the year pillar where the hour
stood, 陰遁 always. The 元 is counted from a 上元 opened in 1684; `yearYuan`
lays the three 元 on 一四七 (`yisiqi`, the 演義 and the 統宗, the default) or on
一七四 (`yiqisi`, the 集成's 年家奇門定局 and the 大全's 奇門古本). A witness,
`nianjiadingju`, names the tables.

Neither holder says where the centre lodges on a year board, or how its
spirits are named, so the board reads four of the hour board's parameters:
`centreLodging`, `centreTravel`, `centreStem` and `spirits`. `family` on a
parameter became a list to say so, with `readsOn` as the one test, in the
engine and its copy in the web. `centreLodging: bajie` and `siyu` lodge by a
term and are refused on the year board, and the form does not offer them
there (`refusedOn`). The board carries no strengths, configurations, horses or
hexagrams: its holders lay none.

## What it was held to

`test/nianjia.test.ts`: the 統宗's 上元 甲子 and 乙丑 (天蓬 to 坤二, 休門 to
離九, the spirits back from 天蓬), the 演義's 杜門 in 1564 and 休門 in 1594,
the 奇門古本's 1648 under `yiqisi` (死門 at 兌七, 天芮 at 巽四), the epoch, the
pillar's year across 立春, and a centre decade under two lodgings. The
集成 tables, pp. 1160–1216, are not yet a bench.

## Surfaces

The CLI (`shipan qimen --system nianjia`), `/api/qimen`, `/text` and `/plate`,
`compute_qimen_chart` and `draw_qimen_chart` with `year_yuan`, the 奇門 section
with `YearReading` under the hour's drawing, and both catalogs. The drawing's
`starStrength` and `patterns` became optional in `packages/plate`. The prompt,
the scan and the 年命 refuse the family by name, as they refuse the day's.

## The version

The canonical 奇門 boards gained `yearYuan` in their options, and
`system=nianjia` answered `OPTION_NOT_IMPLEMENTED` before: the second term
moves, 0.45.0. Not tagged and not deployed.
