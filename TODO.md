# What is not built yet

**The engine is built; the open edge is the paper.** What holds is in
[`docs/`](docs/README.md); how it got here is in
[`docs/history/`](docs/history/README.md), never normative. This file was cut
down on 2026-10-08, and what it carried before is in
[`docs/history/roadmap-2026-10-08.md`](docs/history/roadmap-2026-10-08.md).

## Resuming cold

**Read this section and § 2, then pick a line from § 2.** For that line read
three things and no more:

1. **what the file is** — `texts/README.md`, one row: grep the filename. It
   has the extent, the page offsets, the way in and what is already read;
2. **what is established** — `docs/sources.md` is thousands of lines: grep the
   work's title, read the section the hit is in;
3. **what the value needs** — § 1, the row under the value's name.

**Do not open** `docs/sources.tsv` (a test and a surface read it),
`docs/history/` (why, never what), `texts/rules/`, `texts/crosswalk.tsv`,
`texts/manifest.json`. [`docs/scans.md`](docs/scans.md) is the method: read it
once before a first survey.

**A reading is owed four things**: the argument in `docs/sources.md` with its
date, the row in `docs/sources.tsv` and its rung, the row of
`texts/README.md`, and this file. A plate reads at two to four pages a
minute. A woodblock with no 目錄 is found on tiles of six pages rendered
small, then read on the page; `texts/contact.py` and `texts/banxin.py` do the
tiling, and a digit is read beside whatever checks it — a sum, a rate, a
table already held.

**Before the session ends, sweep** `docs/sources.md`, `texts/README.md`,
`docs/provenance.tsv` and this file for sentences the session outlived: «not
yet read», «unread», «still missing», «none opened», «nobody has», «stays
refused», «this list is empty».

### Where it stands, 2026-10-11

Version 0.20.0. `npm test`, `npm run typecheck` and `npm run build` passed on
2026-10-08, and nothing but `docs/` and this file has changed since.

**Decisions held open, by the user's word, until there is more to decide on:**

- **太乙's 月計 · 日計 · 時計.** The 《統宗》 states all three as procedures. Not
  built: it needs a board that takes an instant. Read on 2026-10-11: the
  hour's count is settled, from the epoch and by the 干支 of day and hour.
  The day's is not: the 甲子 the work dates as 上元第一紀 stands 120 days,
  or 240, from where its own count puts it, and the three places asked for
  a dated board have none. Held, by the user's word of 2026-10-11.
- **`yearBoundary: dongzhi` of 太乙.** The 《統宗》 turns the year at 子, 卷二十
  pp. 193–194, and counts it solstice to solstice, 卷二 pp. 19–21. A work and
  a rule; not built, and no dated board to hold it to.
- **`gong: ci`.** The table is read, with three cells of twelve miscopied.
  Not built until a second copy gives those three.

- **陰陽和不和 of 太乙.** No longer two accounts that disagree. Whether 和 and
  不和 travel as an attribute of the board, as a `Pattern`'s `valence` does,
  was held by the user's word of 2026-10-11 until 卷二 of the 金鏡 was read,
  and it was, the same day. The eyes' test names its count; 太乙's does not;
  the lists of 上和 · 次和 · 下和 differ in all three prints. The user's to
  say.

**Declared this session**: nothing. Nothing is half done.

## 1. Parameters that are declared and refused

Each exists in an input type and throws `OPTION_NOT_IMPLEMENTED` or
`METHOD_NOT_IMPLEMENTED`, so the API does not break when one lands.
`packages/core/src/parameters.ts` declares them and
`apps/web/test/docs.test.ts` holds this table to it both ways. What a value
must show is attribution and transcription — `docs/sources.md` § "What a value
named for a school must show" — and **another copy of a work already held is
not a witness**.

| Board | Refused today |
|---|---|
| 奇門 | `plate: fei`, `system: yuejia`, `system: nianjia`, `dayDun: liushi`, `leap: runyue`, `strengths: star` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `minggong: ascendant`, `gong: ci` |
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: dongzhi`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split` |

**What each waits on.** The row is the query to put to an arriving text. The
argument is in `docs/sources.md` § "Whose each value of a … board is", one
section an art.

| | waits on |
|---|---|
| `plate: fei` | a text flying the 時家 board's own 起例. None held does; the 折衷 flies the stars and the 儀 and turns the gates, which is computed as a third arrangement. Arrives with a family of `system` |
| `system: yuejia`, `system: nianjia` | being built as the day family was. 《遁甲演義》 and the 統宗 state both; on the year they read 一四七 against 遁甲集成 第三冊's 一七四, which will be two values. No table on the shelf to hold either to |
| `dayDun: liushi` | the 統宗's rule read on the plate for how a 局 is begun |
| `leap: runyue` | a lineage named for it. 《金鏡寶鑑》 holds it; 《金函玉鏡》 上冊 p. 87 and 下冊 p. 425 print a rule containing both placements, so one rule or two is asked first |
| `strengths: star` | which of two arrangements from the star it is — 《金鏡寶鑑》卷之四's, or the 《三元經》's that the 符應經, 紀大奎 and the 探索錄 carry — and whether it reaches past the nine stars |
| `yuejiang: jieqi`, `yuejiang: true` | a text stating either as its own. None found, on the plate or in the extracts |
| `zhouye: solar` | which rising, and how. One sentence of 《大六壬精解》 and the 協紀's 日出入, neither with a procedure |
| `xiudu: shixian` | a table with an epoch that can be cited |
| `gong: ci` | a second copy for 女, 井 and 張 of 《星學大成》卷一's 宿度過宮之圖 — the 《元史·曆志》 has the 曆's own — and a decision on what it computes under the default frame |
| `minggong: ascendant` | a holder. A second method and not a second reading |
| `epoch: taojin` | 《太乙淘金歌》, not held; known through 盧央, who sets evidence against it |
| `ji: yueji` | being built: a board that takes an instant |
| `ji: riji` | which anchor: the 《統宗》's count puts 25 February 1510 on 局 25 and its dated note on 局 1, a 盈差 of 120 or 240 apart. A dated 日計 board, in any work. `docs/sources.md` § "《太乙數統宗大全》卷二 again" |
| `ji: shiji` | being built. The hours run from the epoch and the 盈差 does not reach them; whether a day's hours open at 子初 or 子正 is asked first |
| `yearBoundary: dongzhi` | being built: the year runs from one 天正冬至 to the next. No board dated between a solstice and 立春 to hold it to |
| `yearBoundary: chunjie` | a holder. The default has none either |
| `geChong: chong` | the rule as a sentence. 盧央's board for 940 shows it of 始擊; the 《統宗》卷七 states 格 by the facing palace alone, and on its 589 board adds a 格 of the 太歲, p. 69 |
| `leapMonth: current`, `leapMonth: split` | a manual stating either. A program computes one |

**Recorded, with no parameter** — a divergence the register carries and
nothing exposes. Only those with something to wait on:

- **奇門.** Which of the two stems in 坤 is read — the one a star carries off
  it (《探索錄》卷三 p. 22) and the one a stem coming to it stands over (the
  符應經): each is one case, and a second witness names it. 三奇得使: the
  符應經 has a rule and three cases of four that do not lay. The half-flown
  board wants a yin hour worked in any text. The board of a day wants a prompt
  of its own, the scan and the 年命.
- **六壬.** The order of 涉害: a text holding either reading by name. The five
  phases of the 十二天將: a file not held.
- **七政四餘.** The 身 as the Moon or as the degree facing the 命; the 命宮 to
  a lodge and a degree by a 量天尺; the 距星 of 觜 and 參. Which node 羅睺 is:
  《星學大成》 names 天首 and 天尾 and does not say.
- **太乙.** 陰陽和不和, three tests the 《統宗》 and 盧央 give alike: 太乙's
  palace against a count, an eye's seat against its count, the count by its
  digits. The first two are 張良經's and the third 王希明's. Which count the
  first reads is not said, and the third's lists are not settled. The 定算 and its 定計目 · 計大將 ·
  計參, a third count the 《統宗》 lays on every board. 陰局 after 夏至 as the
  hour's alone or the day's as well: the 《統宗》 prints both.
- **紫微斗數.** The stars 卷二 does not place, 解神 off the month among them;
  王亭之's table at 戊, 庚 and 壬, named and unread.
- **Not yet attributed.** The default of `earth`; who turns the year at 立春
  or at 正月初一 and the day at the 子 hour; the 大運 to the minute; the years
  lived by turns; a second value of `shensha`; the noble of 庚 seated with
  辛's.

**Asked and not found, so not asked of the same works again**: the holders of
the day and year boundaries, of 《三命通會》卷二 and 《命理新論》; the five phases
of the 十二天將 and a general turned at the 節, of 《御定六壬直指》卷上 and
《六壬經緯》卷一–三; a rule for which node 羅睺 is and an epoch for the 積日, of
《星學大成》. The extracts returned nothing for a leap month split at its
middle or for 羅睺 as the ascending node, which is a date and not a negative.

## 2. The shelf

**In order.** Each is a named section; nothing here is a sweep of a book.

| | what would move | where |
|---|---|---|
| 1 | **A dated 日計 board, or the 盈差 of the day explained**: what `ji: riji` waits on | not in the 《統宗》 where it was looked for: 卷三十六 to p. 392, 卷四 p. 41 and 卷十八 whole were read on 2026-10-11 and every board is entered by its 局. Left in that work: the drawn boards of 卷三十二–三十五 and the 命法 of 卷三十七–四十, which takes a birth. Otherwise a work not held |
| 2 | the lists of 上和 · 次和 · 下和, which three prints give three ways, and which count is read against 太乙's palace | a copy of the 金鏡 that is not the 四庫's, or a work quoting 王希明's lists: none held. The 金鏡 卷二 leaves 9–10, the 《統宗》卷六 pp. 54–56 and 盧央 pp. 477–479 were read on 2026-10-11 |
| 3 | eight of the ten 精 to the numeral, and 大遊's 天目 | the 《統宗》卷三十六 pp. 395–397 cropped at 600 dpi beside 《中國古代星占學》 pp. 513–519 on the plate; 卷十一 p. 110. The ten were read whole on 2026-10-11 and 天皇 and 帝符 are settled in both works |
| 4 | the rest of the 釋: 迫, 關, 擊, 提挾 and 四郭固, as the 《統宗》 states them | 卷七, series pp. 65–72. 釋掩, 釋囚, 釋格, 釋對 and the list on p. 64 were read on 2026-10-11 |
| 5 | a second 立成 to hold the 金鏡's to, and a bench for the 陰局 | the 《統宗》卷三十一, pp. 298–307, read on its first leaf; the drawn boards of 卷三十二–三十五 |
| 6 | a 起例 variant; eighteen 局 tables that would be a bench | 《御定奇門大全》, `yuding-qimen-daquan.pdf`: its 目錄, 卷一 and 卷二十五 are read, 卷二十六–二十七 only at sheets 607, 615–620, 631, 637. Eleven of its other twelve works are unread; 卷五–十 are the tables |
| 7 | the limits of a 七政四餘 life, and the 量天尺 | 《星學大成》, SKQS vol. 809: read are 卷一 leaves 1–8, 卷三's 運限起例, 卷四 leaves 1–7 and the four 算法 of the 餘. The juan are mapped in `docs/sources.md` § "《星學大成》卷四 星盤或問, and the map of the other juan" |
| 8 | 郭守敬's lost star catalogue | 《中國恆星觀測史》 第七章第一節二 (二), from p. 274, unread past p. 275; a stencil at 92 dpi |

**Small and left open by this session**: in the 符應經, the note in small
characters under the title at 遁甲集成 第三冊 p. 1136, and 玉女守門 as two
tables in two copies; in the 《統宗》, the lunar constants of 卷二, one damaged, the twenty-five
years of 求歲計入門略例 owed to `test/taiyi.test.ts` before the 八門直使 row
moves, 大遊 in 七宮 for 930 owed there before its row does, the rest of
推四神太乙立成歷 to collate, and the reign printed for 1444 in that list;
in 《星學大成》, the figures of 起大限.

**Wanted and not held**: the 《元史·曆志》; 《太乙淘金歌》; 沈義方's
《星平大成》, a lead for the day turned at midnight; a second dated chart with
炁 on it. Judged worth having on guoxueziyuan.com and not bought: 《宮藏奇門
大全》, 《遁甲奇門秘傳要旨》, 《明抄奇門陰遁書》 and 《李衛公奇門心法》, the last
with a Tang attribution. None of that platform's files states a provenance.

**Measure.** Most of the 2026-08-31 arrivals are not opened far enough to
describe; `texts/README.md` says which. `docs/scans.md` § "What a file is,
before what it says" is the four commands.

**Ask.** `texts/bench/run.mjs` runs the worked examples the sources print;
two 六壬 cases disagree, a 涉害 and a 返吟, and each is settled by reading the
passage its citation names. `--uncovered` lists the shapes with no adapter.
`texts/shelf.py crosswalk --moves` and `--gaps` are leads, never findings.
《御定奇門真詮》 is 1080 hour boards with no 起例: a bench, if anything.

**Where the state is kept**: `docs/sources.md` what is read,
`docs/provenance.tsv` what is held, `texts/README.md` what each file is.

## 3. What a reading may not claim

- An extract locates and never quotes; nothing found is not a negative. A
  negative is established on the plate. → `docs/scans.md`
- A transcription is not a plate, and nothing at that mark closes a question.
- A second copy settles the text and never the doctrine: no rung moves.
- A print can be one work at its frame and another at its filling: grep the
  transcriptions held before writing a passage up as the work's own.
- A divergence in the corpus is not a parameter.
- A negative is about the shelf that was asked; an arrival reopens it,
  bounded. → `docs/sources.md` § "What an arrival reopens"
- A digit read alone is a digit unread. 月孛's 大數 stood misread for five
  weeks and the rate printed beside it was the check.

## 4. Spanish, once the engine has stopped moving

The third vernacular, and deliberately not yet: every board still adds a
family of messages. Nothing has to be prepared. What is watched is written
prose, which a third language pays for and derived text does not. →
`docs/i18n.md` § "Who is reading"

## 5. Surfaces and code

- **Two lists are written a parameter at a time** and held to the declaration
  by tests: the MCP schemas in `packages/mcp/src/` and
  `apps/web/src/lib/parameters.ts`. A value added to the engine fails those
  suites until it is added there.
- **A rasterised board sets its Latin in resvg's fallback face** on any line
  that also holds a hanzi, so two registers of one drawing are set unalike.
  It wants a text engine, or a resvg resolving a font stack a character at a
  time. No surface asks for a PNG. `familiesByScript` in `png.ts`.

## 6. What is refused and stays refused

The 用神, 格局, ranking, dating, advice, the 年命 purposes doctrine, who is 主
and who is 客, a day master called strong or weak, a natal Qi Men chart,
太乙's dynastic readings, what 卷十一 of the 探索錄 reads in the hexagram of a
palace, and the 十八飛星 placements grafted onto a 《全書》 board. Each has
its entry in [`docs/refusals.md`](docs/refusals.md).
