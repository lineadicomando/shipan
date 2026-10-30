# Phase 82 — `leap: runyue` built

A session on 2026-10-30, on `main`, after phase 81, which put the value to the
user. The user said build.

## How it was read

《奇門遁甲金鏡寶鑑》卷之一, series pp. 264–265, was read on the plate again
for the procedure rather than the placement. The blocks are counted from the
符頭 one after another, 「起元只從符頭，不從節氣，局局挨來」; 超神 is the usual
state, 「符頭自合超局多，接局正授少」; the repeat goes wherever the leap month
is, 「閏居何氣重三局，不拘芒種與大雪」, worked for 1678 and 1691.

## What was decided

A count 局局挨來 needs an anchor and the text names none, and a running count
from either worked year falls a block behind the Sun every half century,
because the leap months come more often than the drift asks to be paid.
`runyueAssignment` pins each leap month's term (the 中氣 of the month it
follows) to the 符頭 at or before its day, and runs the blocks one a term
between two pins. `texts/qimen/jinjing-runyue/segments.mjs` measured that
over 1600–2100: 174 of 183 stretches hold exactly one repeat and 9 hold none.
Those nine were put to the user with three choices — refuse them, lay them
without the repeat, or wait — and the user chose to lay them without it until
a text covers the case.

## What moved

`packages/core/src/zhirun.ts` (`runyueAssignment`, a cache of leap months by
context), `lunar.ts` (`leapMonthsBetween`), the moment's deferred `runyue`,
`dunjia/ju.ts`, the declaration with its label and words, both catalogs, the
form, the MCP schema, `docs/parameters.md`, `docs/agent-prompt.md`,
`docs/sources.md` and a row of `docs/sources.tsv` at rung 5, the `shushu`
奇門 file, `TODO.md`. Tests hold the text's two years, the 2017–2020 stretch
and the one-term-a-block structure. An address asking `qimen.leap=runyue`
answered a refusal and now answers a board, and a 置閏 board names `leap` in
force, so the second term moved: 0.42.0.
