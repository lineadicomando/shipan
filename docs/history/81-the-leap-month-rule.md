# Phase 81 — the leap-month rule of the 金函玉鏡

A session on 2026-10-30, on `main`, after phase 80. The user asked to resume
reading the shelf. Item 1 of "What to do next" is a build, so the reading went
to the row of § 1 that asked a question of a file held: `leap: runyue`, whose
entry said 《金函玉鏡》 上冊 p. 87 and 下冊 p. 425 print a rule containing both
placements, «so one rule or two is asked first».

## How it was read

Pages 87–88 of the 上冊 (pdf 116–117) were re-read on the page at 300 dpi.
The sentence — 「若其年閏正、二、三、四月者，必閏大雪一氣之候；如閏五、六、七、
八、九月者，必閏芒種一氣之候」 — was then set against the engine rather than
argued: `texts/qimen/jinhan-leap/measure.mjs` walks every day of 1600–2100
through `zhirunAssignment`, records where `leap: solstice` repeats a block and
where a leap month begins, and `analyse.mjs` asks, for each leap month, whether
a block of the term the sentence names stands within a year before it or after
it. The page does not say which, so both were counted.

## What it found

The two series run at different rates, 184 leap months against 175 blocks, and
the named term stands within a year of the leap month on 55 of the 179 the
sentence covers: 27 before, 28 after. 120 blocks fall where no leap month calls
them. That is what two independent series give. So the sentence is not a
description of where the drift puts the block, which is what p. 425 states and
the engine computes: it is a third placement, a solstitial term in every year
with a leap month, reported among the page's 「各有訣例」 and attributed to
nobody. The register's reading of 2026-09-09, one rule under which each value
is half right, was wrong, and `docs/sources.md` says so where it made it.

## What moved

`docs/sources.md`, the section on the work's 超神接氣法 and the paragraph on
p. 425; one row of `docs/sources.tsv`, its rung unchanged; the work's row in
`texts/README.md`; `TODO.md`, whose row for `leap: runyue` now asks for the
user's word. No code moved and the version did not. Put to the user: whether
《金鏡寶鑑》 alone, attributed, transcribed and worked over two dated years,
holds `runyue` well enough to build it.
