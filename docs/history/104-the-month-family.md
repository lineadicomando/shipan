# Phase 104: the month family

2026-11-08, on the user's word («passa alla famiglia dei mesi»), taking item 1
of `TODO.md`: the 月家, commissioned 2026-11-02. The shape of `monthYuan` and
its default were put to the user before anything was built.

## What was read

- 《奇門遁甲統宗》卷二, 故宮 series pp. 20–21, on the native images, for the
  third month rule the commission named: under a heading printed
  「又法日奇門起例」 a second time, 「甲己加四仲月為上元，加四孟月為中元，加四季月
  為下元，亦冬至用陽遁，夏至用陰遁」. It takes the 元 from the month pillar, uses
  both 遁, and names no 局.

## What was built

- `system: yuejia`, `computeMonthChart`: `layOnPillar` on the month pillar,
  cut at the 節, 陰遁 always, on the 局 of the five years the month falls in,
  opened by a 甲 or 己 year.
- `monthYuan`, named for the branches of the opening year, so that the
  法竅's swapped labels cannot decide it: `ziwu` (the 統宗 and the 法竅, the
  default, on the user's word), `yinshen` (the 演義), and `yuejian`
  (the 統宗's third rule) declared and refused.
- `test/yuejia.test.ts` holds the sixty years to both enumerations and lays
  the 統宗's 甲子 and 乙丑, 「與年奇門同」, on the months 甲子 and 乙丑 of
  1988–89.
- The CLI, the three 奇門 endpoints, the section's board select and reading,
  the drawing, and the MCP schema carry it, as they carry the year. Both
  catalogs gain the value, the board, the period and the notes.

## What it left

The 演義's 「三箇月一移」 layer, the month laid flown as the 法竅 lays it, a
canonical month board, the 遁甲集成 第三冊's 月家 tables, and the lens the
errands had planned for the month and that was not built. The canonical
hour board gains `monthYuan` among its options, so the second term moves, to
0.52.0.
