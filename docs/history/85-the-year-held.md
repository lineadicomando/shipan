# Phase 85 — 洪丕謨 holds the year turned at 立春

A session on 2026-10-31, on `main`, straight after phase 84, which put two
works to the user. The user accepted both recommendations.

## What was decided

洪丕謨 and 姜玉珍's 《中國古代算命術》 holds `yearBoundary: lichun`: its
推年法 is the procedure of a chapter that lays the pillars and closes on a
whole board. 盧央's 《中國古代星占學》 is recorded and holds nothing: it
describes the count as a historian, which CLAUDE.md calls a summary, so
`dayBoundary: zishi` stays the one value in force with no text named.

## What moved

`suanmingshu` in `packages/core/src/witnesses.ts`, a `modern` witness dated
1991, and in `heldBy` of `yearBoundary: lichun`. `combinationOf('pillars', …)`
on the defaults stays `unattributed` and its `together` empties, since no text
holds both the year at 立春 and the true solar time: the pillars' block closes
on a different sentence, and `packages/core/test/combination.test.ts` pins it.
`docs/sources.md`, the pillars' row of `docs/sources.tsv` and the `shushu`
skill's `common/foundations.md` say the decision. The version stays 0.43.0,
which had not been released: the questions in `docs/architecture.md` are asked
against what was deployed. Tagged `v0.43.0` and deployed.
