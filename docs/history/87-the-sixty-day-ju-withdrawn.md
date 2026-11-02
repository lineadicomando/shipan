# Phase 87 — `dayDun: liushi` withdrawn, and the 統宗 holding `yang`

The same session as phase 86, 2026-11-02, on the user's word. Before
deciding, the user asked how the value had entered and for a review of
whether it could be built at all.

## How it had entered

In three steps, none of them a reading of the rule. On 2026-08-28 (`910e366`)
卷二 of the 統宗 was read on the 寶鑑's plate for whether the families fly. The
leap clause of 又法日奇門起例 was quoted, but not its 局 or 「法亦同於年奇」,
and the juan's three day methods were written of as one family. On 2026-09-09
(`c4b9038`), writing up 《日家奇門》, the 太乙 board's solstice boundary was set
against 「the 統宗's sixty-days-to-a-局」 as a rival anchor for the same board.
On 2026-10-07 (`6907ad7`), building `rijia`, that contrast became a declared
and refused value of `dayDun` held by the 統宗. And the quotation of the
juan's first method, the one that is `rijia`'s, had cut with an ellipsis the
sentence that settles it.

## The review

Three senses of the value, checked on the plate and against `rijia.ts`.

- The 統宗's rule applied to `rijia`: no. Its first method says
  「其起九星八門之法，不必復分陰遁陽遁」, read on the 故宮 plate p. 20 and the
  寶鑑's p. 43: the 統宗 holds `dayDun: yang`.
- The half turning at a 甲子 and not on the solstice day: simple to compute,
  and no holder. The 金函玉鏡's 「命起甲子順逆行」 is ambiguous; it is line 6 of
  `docs/open.md` § "The shelf".
- The day board with a plate of stems: it has holders, and it is a family of
  its own, not a value of `dayDun`. Recorded.

## What moved

`liushi` leaves the `dayDun` type, its declaration, `apps/web/src/lib/parameters.ts`,
the MCP description, `docs/parameters.md` and `TODO.md` § 1. `tongzong`
joins `heldBy` of `yang`, and both catalogs name it in that value's line.
`test/rijia.test.ts` holds `yang` to the 統宗's 甲子 at 艮八, 乙丑 at 離九 and
休門 at 坎一 on a day of the yin half, in place of the test that refused
`liushi`. `docs/sources.md` gains the first method's reading and a holders'
row, and `docs/sources.tsv` a row for `yang` at rung 2. `docs/open.md`
records the stems day board and opens line 6 of the shelf. An address that
named `liushi` now answers differently, and the schools printed under `yang`
name a second work: 0.44.0, not tagged and not deployed.
