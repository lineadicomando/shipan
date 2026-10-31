# Phase 83 — 陳公獻 holds the noble's verse and the day's cut

A session on 2026-10-31, on `main`, after phase 82. It builds what phase 79
put to the user and the user decided on 2026-10-30: a run of worked cases
unanimous on a question makes its author a holder.

## What was decided

Nothing new. 陳公獻's 《大六壬指南》 states neither the noble's verse nor
the cut of the day, and its 125 cases in 卷四 follow both: `guiren: chou` on
every day-hour case that can tell, `zhouye: branch` by day without exception
and two nights in three. The register records the minority of nights read by
the day seat, which no value names, beside the attribution.

## What moved

`zhinan` joins `heldBy` of `guiren: chou` and `zhouye: branch` in
`packages/core/src/parameters.ts`. The 指南 already held `yuejiang: zhongqi`
and `shehai: palace`, so `combinationOf('liuren', DEFAULT_LIUREN_OPTIONS)` is
`together` by `zhinan`, and a default 六壬 board closes its block of schools on
«laid as one by 大六壬指南» where it said no text laid it. The core and web
tests that pinned `apart` on the default now pin it on `guiren: wei` with
`shehai: depth`, which no text holds whole. `docs/sources.md` gains the holder
in the table of § "Whose each value of a 六壬 board is" and loses the sentence
saying the build waited; the two rows of `docs/sources.tsv` carry the cases
in `stands_on` and stay at rung 2. A default 六壬 answer closes on a different
sentence, so the second term moved: 0.43.0.
