# Phase 102: the ruler transcribed

2026-11-08, on the user's word («Riprendi la lettura dello scaffale»),
taking line 1 of `docs/open.md` § "The shelf": the 量天尺 of the
《張果星宗》 for `gong: ci`; then, on the user's word («consiglio accettato…
procedi»), the build it allowed. This phase revises phase 100 on one point:
what the table's first column is.

## What was read

- 《古今圖書集成》 第468冊, 卷569, djvu p. 45, everything below 定行限度法,
  at the page's full resolution. Four readers each took one block and
  worked blind to the others from a written brief
  (`texts/qizheng/ltc/BRIEF.md`). The blocks were: 授時過宮度 (360 cells and
  the small characters beside them), the twelve lodge rows of the table
  headed 欽天監校正 (360), its nine rows of ages (90 printed, in every third
  column), and the calendar 逐年行限度法 (210). The cells where the two
  copies of the ruler part were read again on the plate.

## What it found

- **The page prints one ruler twice**, as 授時過宮度 and as the lodge rows of
  the table with the ages, and the two copies part only by a neighbouring
  degree.
- **A row walks a palace from its far end.** Phase 100 read the first column
  as the palaces' openings carried back by precession. It is the far end of
  each 授時 palace, and column 30 is the 授時 opening taken down to the 度.
- **The ruler is by fraction.** A column is a thirtieth of the palace. In
  331 of 355 legible cells the whole degree printed overlaps the thirtieth
  it stands for, and no cell is more than 0.86 of a degree from it. Counting
  by whole degrees fits about 240 cells and strays up to 2.4 degrees.
- **The ages count columns**, three to a year, from twenty to eleven, the
  same for every palace. That is `qixian: du` with the degree being a
  thirtieth of the 命宮.
- **After 夫妻 the work parts from itself.** The ages give 奴僕 5 and 男女
  4, the 精義's figures, where the calendar on the same page and 年分訣 say
  four and a half.

## What moved

The register gains § "The 量天尺 of the 張果星宗, transcribed", and the
earlier section marks its first-column reading as wrong. The 大限 row in
`docs/sources.tsv` records the ages as a check. `docs/open.md` drops shelf
line 1 and gains § "The 量天尺 under `gong: ci`", where laying the 命度 and
the 大限 under `gong: ci` is put to the user. The sentences saying the rule is
given by no text are corrected in `qizheng.ts`, `docs/agent-prompt.md` and
`docs/open-recorded.md`.

## What was built, the same day

The user accepted the recommendation and asked where `qixian: ri` under
`gong: ci` would come from. The answer was that no text gives it, because
《星度指南》 cuts its palaces at the 中氣, and the user agreed to leave it
null. Under `gong: ci` the board now lays the 命度 at the Sun's fraction of
its palace, and `qixian: du` counts thirtieths of the 命宮. `mingdu` is no
longer nullable. `limits.test.ts` holds the 授時 palaces to the 357 cells
read and the board's 命度 and opening age to the table's columns and ages.
Both catalogs' `form.qizheng.qixian.note` and `prompt.qizheng.limits`, the
MCP schema, `docs/parameters.md` and `docs/agent-prompt.md` say so, and the
prompt explains the 命度 on every board. An address with `gong=ci` now answers
with a 命度 and limits where it answered null, so the second term moves, to
0.51.0. `docs/open.md` § "The 量天尺 under `gong: ci`" goes with it.
