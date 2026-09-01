# Phase 41 — the fourth remainder, and the witness that was counted twice

*Done. Revises phase 16, which shipped 紫氣 as refused for want of an epoch,
and the register entry that was written to it.*

The 七政四餘 board carried three remainders from the day it was first laid.
`ziqi: yinianyisu` was declared and refused, and the reason given moved twice
in the same file without either version being retired: `docs/refusals.md` said
a citable epoch was missing, which is a gap an acquisition closes, and
`docs/sources.md` said the error was **unbounded in principle** and that no
source could ever close it. Only one of those can be the policy.

## What the plates said

《古今圖書集成》 藝術典 星命部, 卷565–630, arrived on 2026-09-01 as five DjVu
volumes — the primary witness of a 定度法 known here until then from a modern
vernacular abridgement photographed with a phone. All 623 plates were run
through OCR as a finding aid and every citation below was then read on the
plate at 300 dpi.

**The procedure is there and stands as quoted.** 第469冊 leaf 24, 卷580:
「紫氣筭法　炁星篇。置積日減一千二百八十八。以一萬二百二十八大數除之…平行：
一日行三分五十七秒」, with 月孛's 大數 3225 on the same leaf and 羅睺's 6794 on
leaf 30.

**And the register had been counting one witness twice.** The 卷目錄 of that
same 卷 reads 星命部彙考十六 · 張果星宗十四: the eleven 算法 in the 集成 *are*
《張果星宗》, and 三辰通載 is that work's opening section at 卷578 rather than a
second work standing beside it. The entry's «two witnesses, which is the count
this file asks for everywhere else» was false when it was written. Both halves
of what would place 紫氣 — the rate and 《星度指南》's 1886 anchor — fell to
rung 5.

**The same work says twenty-eight and twenty-nine, two columns apart.** The
紫炁總論 beside the procedure closes 「凡二十九年行一周」. That is not two
schools: it is the round-number 星曜行度 layer, where 月孛 is «nine» for 8.85
and the nodes «eighteen» for 18.6, printed next to the computational one. The
layer is gradeable, because two of the four remainders have a referent, and
`test/qizheng.test.ts` runs the grading rather than asserting it — propagated
from 1886 to 2026 the round numbers miss by most of a quadrant on both bodies
where the 大數 hold to within a palace.

**And the 總論 says 在天無象 of 紫氣 — and the 月孛總論 says it of the apogee**,
which this engine has always placed. «No referent» was this project's
distinction, correctly drawn, and had been written as though it were the
tradition's.

## Why it ships now, and why it ships off

The «unbounded in principle» reading was an arithmetic error rather than a
judgement about evidence. Drift is a rate error times the circuits run since
the anchor: 0.20 % is 69° over the 726 years from 1300 and 3.6° over the 4.97
circuits from 1886. Bounded at both ends. And a dated position *is* an epoch
for a body with a known rate — the 積日 origin was what the printed procedure
needed, never what the placement needed.

So the value is implemented, and `off` stays the default, because what actually
holds it back is that each half rests on a single text. That is rung 5 twice
over, which the engine ships elsewhere — 年命, the 年神 bearings, 太乙's 大將 and
參將 — and does not switch on for somebody unasked.

## What it cost, which was the type

`Placement` was `Standing` plus a body, and `Standing` required a longitude, a
lodge, a 入宿度 and a 宮度. 紫氣 has a palace and no degree: its anchor prints
巳宮 and no finer, so any degree computed from it would be a figure the engine
invented. The type is now a union discriminated on `resolution`, and the
compiler named every surface that had to change — the CLI table, the drawing's
listing, the reading's two degree cells. `minggong`, which has had exactly this
contract since phase 16, took the extracted `PalaceStanding` and stopped being
a special case.

The five self-checks the working note proposed are all tests, and the one that
carries the argument is the layer grading. The 1886 regression checks all four
remainders against 《星度指南》's board; three of them were already true and
free.
