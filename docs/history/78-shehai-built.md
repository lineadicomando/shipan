# Phase 78 — 涉害 as a school

A session on 2026-10-30, on `main`, straight after phase 77, which had read
the order of 涉害 on the plate and put a parameter to the user. The user
approved the recommendation and asked for it to be built.

## What was built

`liuren.shehai`: `palace`, the default, grades the candidates by the earth
palace they stand on and lets depth decide inside the grade; `depth` counts
first and lets the palaces break a tie. Inside `depth`, `liuren.shehaiFrom`:
`next`, the default, starts the count one palace on, as the 大全卷五 does;
`seat` counts the palace the candidate stands on, as the 視斯 does. The count
the texts agree on became the engine's under both values: the lodged stems,
and the control by the kind of the candidate's course. Two witnesses arrived,
`shisi` for 《六壬視斯》 and `zhinan` for 陳公獻's 《大六壬指南》, and both are
now among the holders of `yuejiang: zhongqi`, which each states.

## How it was checked

Before the parameter, the engine's answers on the 1 380 涉害 boards were
saved from the phase-77 script. After it, `engine-check.mjs` laid every one
under each value and held it to the script's independent readings. Under
`palace` it matched the old engine on all 1 380, and under `depth` with `next`
or `seat` it matched the readings of the 大全 and the 視斯 on all 1 380. The
six canonical boards changed only by the two new fields in `options`. The
tests lay the 丁卯, 甲辰 and 庚子 cases the sources work.

## What it changed that was not asked

A default 六壬 board said that 《大六壬精解》, 《六壬經緯》 and 《御定六壬直指》
laid its combination whole. The 精解 grades 涉害 by depth, so that sentence
was false on every 涉害 board. It now says that no named text lays the
default combination whole. Under `depth` with `seat` the board is the 精解's.
The bench lays the 精解's cases by that school, and its 涉害 case agrees.

0.41.0, since the default board answers with two more options and another
closing sentence. Phase 77's register row, which shipped a sentence and moved
no version, rides in the same bump.
