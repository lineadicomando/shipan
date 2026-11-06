# Phase 99: the palaces in the lodges

2026-11-06, on the user's word («sblocca "gong: ci". Per il resto, aspettiamo
la trascrizione del 量天尺»), after phase 98 found the second copy of the 授時
宿度過宮 wheel. The limits and the 命度 wait for the 量天尺's transcription.

## What was built

- `gong: ci` is computed. `SHOUSHI_CI_ENTRY` in `shoushi.ts` carries the
  twelve openings as the two copies read: eight cells agreeing to the 秒, 畢
  to the 分, and 女, 井 and 張 from the 《張果星宗》's copy. `ciEntries` in
  `qizheng.ts` lays each palace's opening at its lodge's opening in whichever
  frame `xiudu` lays, plus the table's 度 turned into degrees of 360.
  `standingOf` takes the openings and stands a body in the one nearest behind
  it, so 宮度 runs to the palace's own width. 紫氣, a palace counted from a
  palace, does not move with the cut, and the 命宮 follows the Sun's palace.
- The design question phase 98 left, what the value computes when the lodges
  are the stars, was settled in the reading the register already held: the
  次 ride the lodges.
- `heldBy` is `xingxuedacheng` and `xingzong`, and `minggong: yuejiang` gains
  `xingzong`, the errand phase 98 recorded.
- `test/ci.test.ts` holds the value to the table at its epoch: the facing
  palaces equal to 0.02°, each opening on its lodge and degree, 子 opened at
  女二 as 起大限 counts, and 星五 and 張十一 to 十三 in 午 as 定限度法 casts.
- Both catalogs gain the form's question, its two answers and a note, and a
  prompt line said only on a board laid with `ci`. The web form and the MCP
  schema (`gong`) carry it. README.md, `docs/parameters.md`,
  `docs/agent-prompt.md` and the register follow, and `sources.tsv` gains the
  row at rung 4. The agent prompt's sentence calling both 曆 frames refused,
  stale since `xiudu: shoushi`, is corrected.

## What moved

The block of schools on every 七政四餘 board now names where the palaces are
cut, since the parameter has two values, and `laidBy` in the API answer with
it. An address answers differently, so the second term moves, to 0.49.0.
