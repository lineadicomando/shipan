# Phase 66 — 吉凶格解

The next work in the 大全, read for the same question as phases 61 to 65.
This is 2026-10-22.

## How it was read

`blanks.py` bracketed the last seven juan of the compilation, and the 版心
confirmed each bracket: 吉凶格解 is 卷五十八–五十九 and 寶鏡圖 卷六十–六十四,
as the 目錄 says. Contact sheets at 50 dpi covered 吉凶格解 whole. The entries
that bear on something the engine computes were read on the plate at 170 dpi,
and the summary's dense small print at 400. Two of them sent the reading to a
file already on the shelf, the 省思堂 print of 《奇門遁甲秘笈大全》, whose
卷十五 carries the same two verses. That file's juan were found by
`banxin.py`, and its p. 223 was read at 300 dpi.

## What it found

**No 起例.** The work defines the 格 on a board already laid. Its 擊刑, 五不遇時,
伏吟, 返吟 and most of its stem pairs are the engine's.

**門迫 named the other way round.** 宮迫制格 lists the engine's thirteen cells
and 門迫 lists the converse thirteen, and the closing summary says
「門迫宮制門，宮迫門制宮」. The 符應經 states that in a sentence and lays the
opposite cells under it. Here a work lays its cells on it. The 秘笈大全's verse
names the engine's cells 被迫.

**入墓 in two recensions of one verse.** 吉凶格解's verse buries 乙 in 坤, 丙 in
乾 and 丁 in 艮, which is `TOMB` with `dingTomb: gen`. The 秘笈大全's verse
buries 乙 and 丙 in 乾 and 丁 in 艮, which are the three cells 奇門秘訣 quotes
from 三璋. The simplified transcription of the 秘笈大全 garbled that line, and
the plate was what settled it.

**三奇得使** is stated as the 符應經's 葛洪 states it, with no case.

## What it moved

One holder, `jixionggejie` on `dingTomb: gen`, with a test; a section in
`docs/sources.md`; two rows of `docs/sources.tsv` extended with no rung moved;
two entries under "Recorded, with no parameter"; the shelf's line in `TODO.md`
and two file rows in `texts/README.md`. 0.29.2: a holder a reader sees on the
notes page, and no answer moves. 門迫 and 乙's tomb were put to the user and
nothing was built on either.
