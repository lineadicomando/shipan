# What stands open

The questions a reading or a build would answer. **The state of what is
unanswered**: a commit that settles a line removes it and adds what it leaves
open. Read a section, not the file. Order is `TODO.md`; what is established,
`docs/sources.md`; each file on the shelf, `texts/README.md`. Two files beside
this one hold what a next step seldom needs: `docs/open-recorded.md`, the
divergences the register carries with no parameter, and `docs/open-errands.md`,
the small errands. Backticked names in all three are held to the code by
`node texts/todo-check.mjs`. What was dropped is in
`docs/history/roadmap-2026-11-06-phase97.md` and the roadmaps before it.

## What each refused value waits on

The values are listed in `TODO.md` § 1, which a test holds to the engine. The
row is the query to put to an arriving text; the argument is in
`docs/sources.md` § "Whose each value of a … board is", one section an art.
What a value must show is attribution and transcription, and another copy of
a work already held is not a witness.

| | waits on |
|---|---|
| `system: yuejia` | **commissioned on the user's word, 2026-11-02**: the steps are § "年家 and 月家, commissioned" below |
| `strengths: star` | which of two arrangements from the star it is — 《金鏡寶鑑》卷之四's, or the 《三元經》's that the 符應經, 紀大奎 and the 探索錄 carry — and whether it reaches past the nine stars |
| `yuejiang: jieqi`, `yuejiang: true` | a text stating either as its own. None found, on the plate or in the extracts |
| `zhouye: solar` | which rising, and how. One sentence of 《大六壬精解》 and the 協紀's 日出入, neither with a procedure |
| `xiudu: shixian` | a table with an epoch that can be cited |
| `gong: ci` | the user's word. The second copy is read (2026-11-06): the 《張果星宗》's 度數所在過宮圖 gives 女, 井 and 張 as the symmetry bounded them, and both works cast the limits by these boundaries. What is left is a decision on what the value computes under the default frame |
| `minggong: ascendant` | a holder. A second method and not a second reading |
| `epoch: taojin` | 《太乙淘金歌》, not held; known through 盧央, who sets evidence against it |
| `ji: yueji` | the user's word, «wait» (`TODO.md`, "Decisions held open"); read as a procedure. A board that takes an instant |
| `ji: riji` | which anchor: the 《統宗》's count puts 25 February 1510 on 局 25 and its dated note on 局 1, a 盈差 of 120 or 240 apart. A dated 日計 board, in any work. `docs/sources.md` § "《太乙數統宗大全》卷二 again" |
| `ji: shiji` | the user's word, «wait» (`TODO.md`, "Decisions held open"). The hours run from the epoch and the 盈差 does not reach them; whether a day's hours open at 子初 or 子正 is asked first |
| `yearBoundary: chunjie` | a holder. The default has none either |
| `geChong: chong` | the rule as a sentence. 盧央's board for 940 shows it of 始擊; the 《統宗》卷七 states 格 by the facing palace alone, and on its 589 board adds a 格 of the 太歲, p. 69 |
| `leapMonth: current`, `leapMonth: split` | a manual stating either. A program computes one |

## 年家 and 月家, commissioned

On the user's word, 2026-11-02: both are built as values of the `qimen` board's
`system`, beside `shijia` and `rijia`, **the year first**. The 統宗's 按
disowning the families (「諸說紛紜……非奇門所急也」) does not block them.
Holders: 《遁甲演義》卷一 and 《奇門遁甲統宗》卷二, both already in `heldBy`.
**The year is built** (`system: nianjia`, `yearYuan`, 2026-11-05, phase 89).
What is left is the month, and the section goes when it is built.

1. **The board.** `layOnPillar` in `packages/core/src/dunjia/nianjia.ts`, on
   the month pillar cut at the 節: 陰遁, the 旬首 of the month pillar for
   直符 and 直使, 「逐地下月干轉」 and 「隨月支飛泊」. The 元 is the five-year
   span opened by a 甲 or 己 year, by that year's branch.
2. **Parameters, under the board's name, each value named for its rule.**
   The month's three 元: 孟 一 · 仲 七 · 季 四 (演義) and 仲 一 · 孟 四 · 季 七
   (統宗). The 統宗's 又法月奇門起例 is a third (甲己加四仲月為上元…, 陽 after
   冬至 and 陰 after 夏至): declare it, and refuse it unless step 1 also covers
   it. The month is 陰: 徐昂's 陽 is a lone parenthesis (`docs/sources.md`, the
   遁甲釋要 section). **《奇門法竅》's 論月奇法 states the 統宗's order** and
   enumerates its twenty years an 元, calling 子午卯酉 「四孟」 where its own
   卷七 calls them 四仲: name the values by their branches, so `faqiao` can
   join `tongzong` without the labels deciding. It lays the month flown,
   「與年奇同」, which is `plate: fei` and not the turned board step 1 builds
   (`docs/sources.md` § "《奇門法竅》 again"). The family list of `centreLodging`, `centreTravel`,
   `centreStem` and `spirits` gains `yuejia`.
3. **Tests from the sources' own cases.** The 統宗's 附月 起例 works none.
   The 演義's two dates, the 十一月 of 1563 and of 1613 (both 甲子 months,
   休門 at 坎), **do not fit the 三元 board**: they fall in different 元.
   They fit 「三箇月一移」, on the 四庫 plate as transcribed: a gate three
   months to a palace (600 months is 25 rounds of eight), a second month layer
   beside the board, as the 日家 has two. Neither date tests the board.
4. **Surfaces**, as the year's: the same section, `private`, not offered by
   the consultation, the hour's drawing with nothing weighed.

**Left open by the year, for when it moves again**: a bench of the
遁甲集成 第三冊 tables, pp. 1160–1216, against `yearYuan: yiqisi`, cell by
cell; a canonical year board in `packages/core/test/canonical/`; and a lens.

## The shelf

**In order.** Each is a named section of a held file; nothing here is a
sweep of a book. A file's offsets and map are its row in `texts/README.md`.

| | what would move | where |
|---|---|---|
| 1 | the 量天尺 itself, which the 命度, the 對度 and the age a limit opens at are read off, and whether 《星學大成》's worked 大限 (13, 23, 33, 48 …) is a miscopy or a second table of years | 《張果星宗》 in the 集成, `qizheng/gujin-tushu-jicheng-xingmingbu-468.djvu`, 卷569, djvu p. 45: 授時過宮度, a row of thirty degrees for each palace, and 逐年行限度法 beside it, some four hundred cells for a reader's brief. 《星學大成》's own limits, 洞微限 and 百六限 in 卷八–十三, would answer the second half. Read so far: `docs/sources.md` § "《星學大成》卷三 起大限's figures, and the 張果星宗's tables of the limits and the 量天尺" |
| 2 | 郭守敬's lost star catalogue | 《中國恆星觀測史》 第七章第一節二 (二), from p. 274, unread past p. 275; a stencil at 92 dpi |
| 3 | where a 日家 count running at a solstice ends: finished at its 癸亥, or dropped on the solstice day as `dayDun: solstice` drops it | 《金函玉鏡》下冊, `qimen/jinhan-yujing-2.pdf`, 卷二十 p. 413, 「冬至艮宮夏坤地，命起甲子順逆行」 and the lines around it; read so far for the anchor only |

**Wanted and not held**: the 《元史·曆志》; 《太乙淘金歌》; 沈義方's
《星平大成》, a lead for the day turned at midnight; a second dated chart with
炁 on it. Judged worth having on guoxueziyuan.com and not bought: 《宮藏奇門
大全》, 《遁甲奇門秘傳要旨》, 《明抄奇門陰遁書》 and 《李衛公奇門心法》, the last
with a Tang attribution. None of that platform's files states a provenance.

**What is left to read**: lines 1–3 above, and the errands in
`docs/open-errands.md`. No page is owed a reading; the tools are in the
`shushu` skill's `common/development.md`.

**Where the state is kept**: `docs/sources.md` what is read,
`docs/provenance.tsv` what is held, `texts/README.md` what each file is.

## The review of 2026-10-23, what it found and did not fix

Each wants a plate or the user's word; rechecked against the code and the
register 2026-10-31 and 2026-11-05.

- 六壬: 無親, which the 精解 names, closed as unnamed; no row for the
  direction of the generals, the 遁干, or 無依, 自任, 自信, 虎視, 冬蛇掩目.
- 曆注: 臨日 carried `xiong`, where the 協紀 overrules the 《樞要歷》 and
  calls it 吉 (華齡 OCR pdf p. 160, memorial p. 13); 十二神 at rung 4 on a
  7 300-day check; the 神煞 row still says seven; 宜忌 refused with no
  entry in `docs/refusals.md`; a second 喜神 rule in 卷七 leaf 47.
- 八字: yin-stem 長生 is a school (任鐵樵) the prompt does not sign;
  `dongzhi` turns the 大運 for six weeks with no witness; no row for
  `dayBoundary: midnight`.
- 奇門: no row for `spirits: fixed`, `spirits: baihu`,
  `centreTravel: travel`; the 入墓 row (rung 4 since 2026-11-05) carrying
  two axes that each part; the 統宗's and the 秘笈大全 卷一's copies of the
  入墓 歌 on the plate; the 日家 refusal row, and the 飛盤 one in
  `docs/sources.md`'s table, which `plate: fei`, `gateSeats` and `spiritRing`
  now compute; the 十干克應 row (a second witness asked for, 70 for
  67).
- 七政: `luohou: ascending` with no `heldBy` and no row; the 三辰通載
  described two ways; `minggong: yuejiang`'s 三命通會 lays on the month's
  palace and would part from the Sun's under `gong: ci`.
- 太乙: no row for 陽宮/陰宮; 《齊書》 likely 《南齊書》; kintaiyi (MIT)
  exists against `docs/agent-prompt.md`'s «nothing open computes this
  board».
- 紫微: no row for `yearBoundary: lichun`; the five phases row's rung;
  「辨生剋制化以定窮通」 is 斗數準繩's and not the 太微賦's; 第五冊 of the
  絕學 holds three works; the `sihua` refusal row unmarked.

## Leads from the `shushu` skill

Each art's file in `.claude/skills/shushu/disciplines/` ends on «Leads against
the register», none read on a plate. Those touching a standing question: 截路空亡 at two
hours in 《星曆考原》卷五, beside 寶鏡圖's (`almanac.md`, file not held); the
楊公忌 check, which the 協紀 says is not the 值日 count (`almanac.md`, in the
華齡 協紀's 下 volume).

## The lens, when it moves again

The year board has no lens (the 奇門 endpoint answers it with none), and the month
board is to be designed with its lens from the start; 八字 last and only if the user wants it, the relations
there (合, 沖, the ten gods) being a different lens. Leads, none decided:
論星辰生尅制化 (全書 卷之三, PDF 162–163) gives a 紫微 palace's ground its
branch's phase, rung 4, its last clause odd on the plate (「土入金鄉」, the
transcription 木鄉); a pair on 太乙's palaces, in 太乙's numbering; 六壬's
六沖 and 六合, a general by its own phase ("Recorded, with no parameter"), the 日家's nine stars and
the 紫微 四化 flights, each once it has its row; a phase for 太常, which
`spiritRing: nine` lays and a phased lens leaves out — 《奇門旨歸》卷一's
九神五行 (PDF 18) gives one to each of the nine, not read for this; 太乙's answer is cached
`public` for a week, so a change to its shape reaches a returning reader
late. On the 奇門 section the family selector pushes the moment's steps to
a second line of the bar at 1920 wide; not looked at narrower, nor choosing
another hour with the scan's dialog open.

## Surfaces and code

- **Two lists are written a parameter at a time** and held to the declaration
  by tests: the MCP schemas in `packages/mcp/src/` and
  `apps/web/src/lib/parameters.ts`. A value added to the engine fails those
  suites until it is added there. **So is the list of configurations**,
  `PATTERN_IDS` in `apps/web/src/lib/vocabulary.ts`, and beside it
  `STEM_PAIR_TABLES`, the names each value of `stemPairs` lays, which the
  scan form reads through `layableUnder` and a test holds to `stemPairIds`.
  `gongpo` and `sanqideshi` are no stem pair and are offered always, though `gongpo` occurs only under
  `menpo: gongzhimen`: a scan asked for it under the default finds nothing
  and does not say why. The same filter, keyed on `qimen.menpo`, would fix it.
  **The gate 中 is the other way about**: `GATE_IDS` mirrors the engine's
  eight `GATES`, and `CENTRE_GATE` stands outside them, so a scan under
  `gateSeats: nine` cannot ask for it. 太常 is offered (`SPIRIT_IDS`, eleven)
  and found only under `spiritRing: nine`, silently otherwise, as `gongpo`.
- **`heldBy` for `minggong: yuejiang` does not name the 《張果星宗》**, whose
  安命度法 states it on the Sun's palace with a worked case, read on
  2026-11-06. Adding it changes what the declaration block says about the
  canonical 七政四餘 board, so it rides with the next commit that ships.
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
