# Phase 101: the limits of a life

2026-11-06, on the user's word («ok, accetto la tua raccomandazione,
procedi»), after phase 100 found the 量天尺 derived under the 中氣 cut. The
recommendation accepted was to build the 命度 and the 大限 under `gong:
zhongqi` alone, with the start a parameter defaulting to degrees.

## What was built

- `qixian` (`du` | `ri`), a parameter of the 七政四餘 board, default `du`.
  `du` is held by 《張果星宗》, 《御定五星精義》 (a new witness,
  `wuxingjingyi`) and 《星學大成》, and `ri` by 《星度指南》.
- `QizhengBoard.mingdu`, the point as far into the 命宮 as the Sun is into
  its own palace, and `limitStart`. `HouseSeat.limit` gives ages from the
  birth for the 命宮 and for 相貌 to 夫妻, at 10, 11, 15, 8, 7 and 11 years
  (`LIMIT_YEARS`). The other five seats are null, because the witnesses part
  on their years. All of it is null under `gong: ci`.
- `test/limits.test.ts` holds it to 《星度指南》's 丙戌 case, 1886-11-06 寅時:
  the 命度 at 軫四, thirteen days and four 時 to 霜降, and the entries into
  巳, 午, 未 and 申 in the sixteenth, twenty-sixth, thirty-seventh and
  fifty-second year. It also holds the count by degrees to eleven and twenty
  at the two ends of a palace.
- The transcript prints the 命度 under the palace of the life, a column of
  ages beside the twelve, and a line on where the limits open and why they
  stop. The web reading does the same, and the prompt explains the limits
  where a board carries them. The form, the MCP schema (`qixian`) and the
  tool's description follow. Both catalogs, README.md, `docs/parameters.md`,
  `docs/agent-prompt.md` and the register follow too, with three rows in
  `sources.tsv`.

## What moved

The canonical 七政四餘 board gains `mingdu`, `limitStart` and a `limit` on
each seat, and its options gain `qixian`. An address answers differently, so
the second term moves, to 0.50.0.
