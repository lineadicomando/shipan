# What stands open

The questions a reading or a build would answer; a commit that settles a line
removes it. The order is `TODO.md`; what is established is `docs/sources.md`;
each file on the shelf is `texts/README.md`. `docs/open-recorded.md` holds the
divergences the register carries with no parameter, `docs/open-errands.md` the
small errands. `node texts/todo-check.mjs` holds the backticked names of all
three to the code. What was dropped is in the roadmaps under `docs/history/`.

## What each refused value waits on

The values are listed in `TODO.md` § 1, which a test holds to the engine. The
row is the query to put to an arriving text; the argument is in
`docs/sources.md` § "Whose each value of a … board is", one section an art.
What a value must show is attribution and transcription, and another copy of
a work already held is not a witness.

| | waits on |
|---|---|
| `monthYuan: yuejian` | the 局 of each 元 under the 統宗's second month rule, 「甲己加四仲月為上元…亦冬至用陽遁，夏至用陰遁」, which names none; a text working a month board by it |
| `strengths: star` | which of two arrangements from the star it is — 《金鏡寶鑑》卷之四's, or the 《三元經》's that the 符應經, 紀大奎 and the 探索錄 carry — and whether it reaches past the nine stars |
| `yuejiang: jieqi`, `yuejiang: true` | a text stating either as its own. None found, on the plate or in the extracts |
| `zhouye: solar` | which rising, and how. One sentence of 《大六壬精解》 and the 協紀's 日出入, neither with a procedure |
| `xiudu: shixian` | a table with an epoch that can be cited |
| `minggong: ascendant` | a holder. A second method and not a second reading |
| `epoch: taojin` | 《太乙淘金歌》, not held; known through 盧央, who sets evidence against it |
| `ji: yueji` | the user's word, «wait» (`TODO.md`, "Decisions held open"); read as a procedure. A board that takes an instant |
| `ji: riji` | which anchor: the 《統宗》's count puts 25 February 1510 on 局 25 and its dated note on 局 1, a 盈差 of 120 or 240 apart. A dated 日計 board, in any work. `docs/sources.md` § "《太乙數統宗大全》卷二 again" |
| `ji: shiji` | the user's word, «wait» (`TODO.md`, "Decisions held open"). The hours run from the epoch and the 盈差 does not reach them; whether a day's hours open at 子初 or 子正 is asked first |
| `yearBoundary: chunjie` | a holder. The default has none either |
| `geChong: chong` | the rule as a sentence. 盧央's board for 940 shows it of 始擊; the 《統宗》卷七 states 格 by the facing palace alone, and on its 589 board adds a 格 of the 太歲, p. 69 |
| `leapMonth: current`, `leapMonth: split` | a manual stating either. A program computes one |

## The shelf

**In order.** Each is a named section of a held file; nothing here is a
sweep of a book. A file's offsets and map are its row in `texts/README.md`.
No line stands today: the last two were read on 2026-11-08 (phase 103).

**Wanted and not held**: the 《元史·曆志》; the Ming manuscript 《三垣列舍入宿去極集》 in the 《天文匯鈔》, 北京圖書館, which 潘鼐 reports opens on the 黃道十二次宿度 as the 授時曆經 gives it (a third copy of the table `gong: ci` stands on, which would settle cells and move no rung); 《太乙淘金歌》; 沈義方's
《星平大成》, a lead for the day turned at midnight; a second dated chart with
炁 on it. Judged worth having on guoxueziyuan.com and not bought: 《宮藏奇門
大全》, 《遁甲奇門秘傳要旨》, 《明抄奇門陰遁書》 and 《李衛公奇門心法》, the last
with a Tang attribution. None of that platform's files states a provenance.

**What is left to read**: the errands in
`docs/open-errands.md`. No page is owed a reading; the tools are in the
`shushu` skill's `common/development.md`.

**Where the state is kept**: `docs/sources.md` what is read,
`docs/provenance.tsv` what is held, `texts/README.md` what each file is.

## Leads from the `shushu` skill

Each art's file in `.claude/skills/shushu/disciplines/` ends on «Leads against
the register», none read on a plate. Those touching a standing question: 截路空亡 at two
hours in 《星曆考原》卷五, beside 寶鏡圖's (`almanac.md`, file not held); the
楊公忌 check, which the 協紀 says is not the 值日 count (`almanac.md`, in the
華齡 協紀's 下 volume).

## Surfaces and code

- **The scan form has silent criteria.** `gongpo` is offered always
  (`PATTERN_IDS` in `apps/web/src/lib/vocabulary.ts`) and occurs only under
  `menpo: gongzhimen`; the filter `layableUnder` applies for `stemPairs`
  (`STEM_PAIR_TABLES`), and the same keyed on `qimen.menpo` would fix it. 太常
  (`SPIRIT_IDS`) is offered and found only under `spiritRing: nine`. The gate
  中 the other way about: `GATE_IDS` mirrors the engine's eight `GATES`, and
  `CENTRE_GATE` stands outside them, so a scan under `gateSeats: nine` cannot
  ask for it.
- **Three lists are written by hand** and held to the declaration by tests:
  the MCP schemas in `packages/mcp/src/`, `apps/web/src/lib/parameters.ts`, and
  `PATTERN_IDS` with `STEM_PAIR_TABLES` (held to `stemPairIds`). A value added
  to the engine fails those suites until it is added there.
- **A configuration may carry no fortune**, since `stemPairs: jinhan`:
  `Pattern.valence` and `valenceOf` are optional, and every surface prints the
  mark without one. A surface added later has to do the same.
- **`lodged` and `heavenLodged` are not on the drawing**, which shows one
  stem to a plate in each palace. The transcript prints both as a line under
  the plates and the table of palaces in its cell; a reader of the drawing
  alone does not see that 坤 hosts the centre, or that under
  `centreStem: host` the centre's stem rides to a second palace.
- **`accord` and `ding` are not on the drawing.** The transcript and the
  section print both; `packages/plate` was left as it was, its
  `PlateTaiyiSide` without `accord` and its `PlateTaiyi` without `ding`. 杜
  is drawn, among the conditions, with no fortune beside it.
- **No seat of the eye of 太乙's 大遊 is dated**, in either work. `dayouEye`
  computes both counts; `tongzong` is held by a printed count and `jinjing`
  by nothing past its transcription.
- **`taiyiYearOf` is exported and no surface calls it.** Every surface asks
  `taiyiYearAt`. Under `dongzhi` it reads a pillar that must have been cut
  at the solstice too, which nothing checks.
- **A rasterised board sets its Latin in resvg's fallback face** on any line
  that also holds a hanzi, so two registers of one drawing are set unalike.
  It wants a text engine, or a resvg resolving a font stack a character at a
  time. No surface asks for a PNG. `familiesByScript` in `png.ts`.
- **The 奇門 section's bar** wraps the moment's steps to a second line at
  1920 wide with the family selector in it; not looked at narrower, nor
  choosing another hour with the scan's dialog open.
- **太乙's answer is cached `public` for a week**, so a change to its shape
  reaches a returning reader late.
