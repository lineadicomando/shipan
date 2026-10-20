# Phase 64 — the seat of the spirits

Phase 63 recorded a reading of the 奇門秘訣 with no parameter: the eight
spirits seated from the earth-plate 直符 at a 己 to 癸 hour. The roadmap put
it to the user as a question, with three things against it: one commentator,
no worked board, and the compilation's own hour tables against it 38 times in
39. This is 2026-10-20.

## Why the three did not hold

Each was a threshold the register says it does not keep. A line with one
witness is the ordinary case. A worked example makes a witness better and is
not the condition for one. And 38 claims of 卷五–十 against the commentary is
two works parting, not a vote: 卷五–十 run under the 版心 奇門秘纂 and the
commentary under 奇門秘訣. Two works parting, each attributable, is a parameter.
Keeping the reading out because the tables outnumber it would have been
settling a divergence by preference.

What could still have stopped it was whether the two are one line, since two
texts of one line that contradict each other leave a value refused. The 版心
answered that before anything was planned.

## What was checked on the plate first

- **The rest of sheets 1085–1086.** The rule moves the seat alone. The
  sentence before it gives the order and the direction, 「陽符順…陰符逆布」,
  and 陽符 and 陰符 are the 符 of the two dun, as 《遁甲演義》 uses the words.
  So the ring turns as the engine turns it under both seats.
- **陽遁五局 癸卯, sheet 154**, the one hour of the tables that agrees with
  the commentary. It reads as transcribed, 「乙傷在巽合太陰」, where the
  engine's seat gives 六合. The print names 太陰 for 六合 twice more, at hours
  where neither seat gives 太陰, so the one agreement is a slip and not a board
  drawn by the rule.

## What it moved

`spiritSeat`, a 時家 parameter: `tianpan`, the default and what the engine
laid before, held by `qimendaquan` for the hour tables; `yinshi`, computed,
held by `qimenmijue`, which enters the witnesses as a work of its own because
the two hold opposite values of one axis. One trap is written into the code:
the commentary's yin hours are the five stems after 戊, and 庚 and 壬 are yang
stems, so the test is the stem's index and not its polarity.

Both catalogs, the MCP argument `spirit_seat`, the form and the CLI, which
derive from the declaration. A row in `docs/parameters.md` and a rung-5 row in
`docs/sources.tsv`, the layout row naming the default, the entry in
`docs/sources.md` rewritten, and a line in `docs/agent-prompt.md`. Version
0.29.0: every 奇門 board answers with an option it did not carry before, and
the canonical fascicle moved with it.
