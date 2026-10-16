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
table already held. **A table too long for one reading** — a 立成, a run of
drawn boards — is transcribed by readers working to a written brief, a page
range each, into TSV; the cells that disagree with the engine are then
looked at on the plate before anything is written up. Three precedents, each
with its brief and its comparison script: `texts/taiyi/tongzong-juan31-notes/`,
`texts/taiyi/tongzong-juan32-35-boards/` and, for prose rather than cells,
`texts/qimen/daquan-juan05-10-hours/` — whose `engine.mjs` lays all 1080 hours
of the 時家 board off the engine's step functions under several parameter
values, and is the generator to reuse for any table of 局 and hours. A transcriber normalises
titles it believes misprinted, so a title out of sequence is checked on the
plate too.

**Before the session ends, sweep** `docs/sources.md`, `texts/README.md`,
`docs/provenance.tsv` and this file for sentences the session outlived: «not
yet read», «unread», «still missing», «none opened», «nobody has», «stays
refused», «this list is empty».

### Where it stands, 2026-10-16

Version 0.25.0, on the branch `board-pointer`, which is checked out and
ahead of `main` (`git log main..board-pointer`). Its first two commits are
of 2026-10-15 and are surface work: the Qi Men section holds its board in
the page (`InlineBoard.svelte`, `spotOf` in `lib/board.ts`) and says which
register a name stands in while a pointer rests on it; no other section
holds its board that way yet. The rest are of 2026-10-16: the 大全's 局 tables
read, then `spirits: huwu` and `centreStem` built, then this file brought up
to date, then the 大全's 遁甲通明鈐 read, then the 大全 named a holder of
置閏.
`main` is 79 commits ahead of `origin/main`, whose last commit is
of 2026-10-06. Nothing since that day is pushed and the branch is not
merged; both are the user's call. `npm test`, `npm run typecheck` and `npm
run build` pass on 2026-10-16, after a full build. One test is skipped in a
tree that was never built, the installed bin run through its symlink, and it
is not a failure.

**What to do next, in the order the user has been taking it:**

1. **Build the eye of 大遊 as a parameter** — decided on 2026-10-14 and not
   yet built; the paragraph below says what it asks. It is the one decided
   thing left undone.
2. **Or read on**: § 2 line 3, the 大全's 奇門仙機 from sheet 347. Lines 1
   and 2 have nothing left on this shelf.

What `board-pointer` does next is not decided: whether the other sections
hold their boards the way the Qi Men section does, and whether a pointer does
more than name the register.

**Decided on 2026-10-14, by the user's word, and not yet built**: the eye of
大遊, `dayou.wenchang`, becomes a parameter under the board's name, with the
金鏡's count as the default. The engine runs the 金鏡's today, 卷五
推大遊天目所在法: 積年 by 七十二, then by 十八 — `dayouOf` in
`packages/core/src/taiyi.ts`. The 《統宗》卷十一 p. 110 states the other
count whole: 積年 plus a 盈差 of 216, by 188, then by 18. Both walk from 天道
with 乾 and 坤 counted twice, and they agree in about one year in eight.
Neither work dates a seat. The second value has attribution and
transcription, so it is implemented and not refused. Its 1520 figure is the
one numeral to hold it to, and it is held by its residue on 188 against the
金鏡's 積年, not by a seat. The name is settled when it is built, after
`epoch: jinjing`, the board's one implemented value named for a work so far. It goes in
with the `new-feature` skill: `packages/core/src/parameters.ts` declares it,
the MCP schemas and `apps/web/src/lib/parameters.ts` list it, the
canonical 太乙 fixture moves only if the default does, and it lands in § 1
only if a value is left refused.

**Decisions held open, by the user's word, until there is more to decide on:**

- **太乙's 月計 · 日計 · 時計: wait, all three** — the user's word of
  2026-10-11, with the options set out and none taken. The 《統宗》 states
  each as a procedure and the three stand unalike. The hour's count is read
  and would build: from the epoch, the 局 following from the 干支 of the day
  and of the hour, 陰局 after 夏至. It was reached by argument and by eight
  undated boards agreeing, which is why it waits too. The day's does not
  build: the 甲子 the work dates as 上元第一紀 stands 120 days, or 240, from
  where its own count puts it. The month's was read as a procedure and no
  further. Building any of them is a second input type — an instant and a
  zone where `taiyiBoard` takes a year — a `dayBoundary` under the board's
  name, a ruling on `gate`, `sanji`, `wufu`, `dayou` and `ding`, which have
  counts of the year only, and a line in `lib/cacheable.ts`.
- **`gong: ci`.** The table is read, with three cells of twelve miscopied.
  Not built until a second copy gives those three.
- **囚 and 格 on the dated boards of 卷七: the row stays on rung 5** — the
  user's word of 2026-10-14. Four boards name 囚 where the engine names it
  and one names 格, and the dispute that holds the row there is about subjects
  those cases do not reach. Reopened only by a source that moves it, not by
  the same boards read again. `docs/sources.md` § "Whose each value of a 太乙
  board is", under "The rest of 卷七".
- **The test of a count by its digits: not built** — the user's word of
  2026-10-15. The 《統宗》卷三十一 立成 labels every count by it and the 金鏡
  quotes it as 王希明's lists, so it would be a value of a parameter beside
  the eye's test that `accord` computes; but the labels are a practice
  induced from a table, and the lists are three prints three ways. It waits
  on a sentence stating the rule, in any work.

**Done between 2026-10-11 and 2026-10-16, and nothing is half done.** Each
reading and each build has its section in `docs/sources.md`, its row in
`docs/sources.tsv` and its line in `texts/README.md`; phases 51 to 53 in
`docs/history/` are the record.

- 2026-10-11: `yearBoundary: dongzhi` of 太乙 computed; `host.accord` and
  `guest.accord` carry 和, 重陽 or 重陰; 八門直使 and 大遊 on rung 2;
  `wenchangTaiyi: guan` held by the 《統宗》.
- 2026-10-13: the rest of the 《統宗》卷七 read; three of its dated boards in
  `test/taiyi.test.ts`.
- 2026-10-14: the ten 精 of 卷三十六 and 大遊's 天目, 卷十一 p. 110, read to
  the numeral; nothing built.
- 2026-10-15: the 《統宗》卷三十一 立成 read whole with every note, and the
  144 drawn boards of 卷三十二–三十五 read for their counts, 定目 and six
  generals. 陰局 46 of the 金鏡's 立成 settled from a second work, and four
  cells both tables get wrong printed right on the boards. **Built**: 杜 as
  the eighth 太乙 condition, with no fortune (0.22.0); `ding`, the 定目 and
  定算 by 卷四's 淘金訣 rule, on rung 4 (0.23.0), and its two generals as
  the boards draw them (0.24.0). The transcriptions behind these are in
  `texts/taiyi/tongzong-juan31-notes/` and
  `texts/taiyi/tongzong-juan32-35-boards/`, each with the brief its readers
  worked to and the script that compares it to the engine.
- 2026-10-16: the 《御定奇門大全》卷五–十 read whole, the eighteen 局 hour by
  hour, transcribed by eight readers into `texts/qimen/daquan-juan05-10-hours/`
  and held to the engine's step functions under every value a table keyed by
  局 can tell apart: `centreLodging: kun` and `earthPlate: yuan` hold, and
  two recorded divergences are named by a text. **Built** on the user's word
  of the same day: `spirits: huwu` and `centreStem`, with `heavenLodged` on
  the palace the centre's stem rides to, held by `qimendaquan` (0.25.0).
  Then the 大全's 卷十一–十三, 遁甲通明鈐, read for its 起例: 置閏 with the
  block before the solstices, the leap month refused in words, 淳祐六年
  reproduced block for block, and a 卷十二 that intercalates at ten where its
  卷十三 does at nine. No rung moved. **Declared** on the user's word of the
  same day: the 大全 beside the 統宗 in `heldBy` for `method: zhirun` and
  `leap: solstice`, which no surface prints and no answer changes for.

**Owed a look by the user, and not blocking**: catalog strings written
without the `reader-copy` skill. On 2026-10-15: `label.taiyipattern.du`,
«shutting in» and «chiusura»; `label.taiyi.dingEye` and `dingCount`, «the
fixed eye / count» and «l’occhio / il conto fisso»; `cli.field.taiyiCounts`
shortened to «the counts» and «i conti»; and the sentences on 杜 and on the
定算 added to `prompt.taiyi.conditions` and `prompt.taiyi.counts`. On
2026-10-11: `form.taiyi.yearBoundary` and its three, `label.taiyi.accord`,
`label.taiyiaccord.*`, the sentence on 和 in `prompt.taiyi.counts`, and the
two `form.taiyi.wenchangTaiyi` lines reworded.

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
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: chunjie` |
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
| `yearBoundary: chunjie` | a holder. The default has none either |
| `geChong: chong` | the rule as a sentence. 盧央's board for 940 shows it of 始擊; the 《統宗》卷七 states 格 by the facing palace alone, and on its 589 board adds a 格 of the 太歲, p. 69 |
| `leapMonth: current`, `leapMonth: split` | a manual stating either. A program computes one |

**Recorded, with no parameter** — a divergence the register carries and
nothing exposes. Only those with something to wait on:

- **奇門.** The 置閏 pin at ten days: the 大全's 遁甲通明鈐 卷十二 states
  「凡過超十日則閏」 and works a case dated here to 1265–66 that lets nine
  pass, where its 卷十三 and `MAX_CHAOSHEN` intercalate at nine. A text
  stating ten as its own rule, with nothing against it inside the same juan.
  Which of the two stems in 坤 a stem coming to it stands over:
  the 符應經 marks a 格 by the centre's, one case, and a second witness names
  it. The heaven plate's side of the same question is `centreStem` since
  2026-10-16. 三奇得使: the
  符應經 has a rule and three cases of four that do not lay. The half-flown
  board wants a yin hour worked in any text. The board of a day wants a prompt
  of its own, the scan and the 年命.
- **六壬.** The order of 涉害: a text holding either reading by name. The five
  phases of the 十二天將: a file not held.
- **七政四餘.** The 身 as the Moon or as the degree facing the 命; the 命宮 to
  a lodge and a degree by a 量天尺; the 距星 of 觜 and 參. Which node 羅睺 is:
  《星學大成》 names 天首 and 天尾 and does not say.
- **太乙.** Two of the three tests of 陰陽和不和: 太乙's palace against a
  count, where no count is named, and 王希明's lists, which three prints give
  three ways. The eye's test is computed. The 太歲 as a body of 格, on the
  《統宗》's 589 board. A fortune or a sentence for 杜, which is computed
  since 2026-10-15 on the word of the 立成 of 卷三十一 and carries neither.
  Whether the 計大將 of the 定算 is read off the tens, as 卷四's one case
  reads 三十二, or off the units, as 133 of the 144 boards draw it: the
  engine follows the boards. 陰局 after 夏至 as the hour's alone or the
  day's as well: the 《統宗》 prints both.
- **紫微斗數.** The stars 卷二 does not place, 解神 off the month among them;
  王亭之's table at 戊, 庚 and 壬, named and unread.
- **Not yet attributed.** The default of `earth`; who turns the year at 立春
  or at 正月初一 and the day at the 子 hour; the 大運 to the minute; the years
  lived by turns; a second value of `shensha`; the noble of 庚 seated with
  辛's.

**Asked and not found, so not asked of the same works again**: a 日計 or
時計 board with a date on it, of 《太乙金鏡式經》卷六 and 卷九 and of the
《統宗》卷四, 卷十八 and 卷三十六; the holders of
the day and year boundaries, of 《三命通會》卷二 and 《命理新論》; the five phases
of the 十二天將 and a general turned at the 節, of 《御定六壬直指》卷上 and
《六壬經緯》卷一–三; a rule for which node 羅睺 is and an epoch for the 積日, of
《星學大成》. The extracts returned nothing for a leap month split at its
middle or for 羅睺 as the ascending node, which is a date and not a negative.

## 2. The shelf

**In order.** Each is a named section; nothing here is a sweep of a book.
Lines 1 and 2 are 太乙 and three files, each with its own offset: the
《統宗》, `taiyi/taiyi-shu-tongzong-daquan-gugong.pdf`, PDF page = series
page + 4, every juan opening on a 目錄 of its own; the 金鏡,
`taiyi/taiyi-jinjing-shijing-skqs.pdf`, PDF page = 四庫 printed page − 854;
盧央's 《中國古代星占學》, `shushu/zhongguo-gudai-xingzhanxue.pdf`, PDF page =
printed page + 18. Lines 1 and 2 have nothing left to read on this shelf and
stand first because a decision waits on each.

| | what would move | where |
|---|---|---|
| 1 | **A dated 日計 board, or the 盈差 of the day explained**: what `ji: riji` waits on | not in the 《統宗》 where it was looked for: 卷三十六 to p. 392, 卷四 p. 41 and 卷十八 whole were read on 2026-10-11 and every board is entered by its 局, and the 144 drawn boards of 卷三十二–三十五, read on 2026-10-15, are entered by their 局 and five 干支 with no year. Left in that work: the 命法 of 卷三十七–四十, which takes a birth. Otherwise a work not held |
| 2 | the lists of 上和 · 次和 · 下和, which three prints give three ways, and which count is read against 太乙's palace | the notes of the 《統宗》卷三十一 立成 were read on 2026-10-15: its table labels every count by its digits, ungraded, and none against 太乙's palace — so it answers neither question. A copy of the 金鏡 that is not the 四庫's, or a work quoting 王希明's lists: none held. The 金鏡 卷二 leaves 9–10, the 《統宗》卷六 pp. 54–56 and 盧央 pp. 477–479 were read on 2026-10-11 |
| 3 | a 起例 variant | 《御定奇門大全》, `qimen/yuding-qimen-daquan.pdf`, 1485 sheets at 600 dpi, two book-pages to a sheet, located by the 版心: its 目錄, 卷一, 卷五–十 and 卷二十五 are read, 卷二十六–二十七 only at sheets 607, 615–620, 631, 637. **The eighteen 局 tables of 卷五–十 were read whole on 2026-10-16** (sheets 114–268): they state no 起例 beyond the ordinary 三元 table and are a bench for the hour board, `docs/sources.md` § "《御定奇門大全》卷五–十, the eighteen 局 hour by hour". **遁甲通明鈐, 卷十一–十三, was read for its 起例 the same day** (sheets 269–345): it is 置閏, which the engine computes, with two pins a day apart, § "《御定奇門大全》卷十一–十三, 遁甲通明鈐". Nine of its other works are unread; the next is 奇門仙機, 卷十四–十六 from sheet 347 |
| 4 | the limits of a 七政四餘 life, and the 量天尺 | 《星學大成》, SKQS vol. 809: read are 卷一 leaves 1–8, 卷三's 運限起例, 卷四 leaves 1–7 and the four 算法 of the 餘. The juan are mapped in `docs/sources.md` § "《星學大成》卷四 星盤或問, and the map of the other juan" |
| 5 | 郭守敬's lost star catalogue | 《中國恆星觀測史》 第七章第一節二 (二), from p. 274, unread past p. 275; a stencil at 92 dpi |

**Small and left open**: in the 符應經, the note in small characters under
the title at 遁甲集成 第三冊 p. 1136, and 玉女守門 as two tables in two
copies; in 《星學大成》, the figures of 起大限. In the 《統宗》: the lunar
constants of 卷二, one damaged, and its 朓朒 leaves pp. 22–27, seen and not
read; the rest of 推四神太乙立成歷, p. 108, to collate; the reign printed
for 1444 in the list of gates; two characters of the note under the heading
at p. 193; the case of 釋提執, which breaks off at the foot of p. 70, and
the board under 釋擊, p. 68, which is another 局's; 者 or 考 closing a column at p. 29; the
character lost before 天時's 申 at p. 395, and which text 盧央 followed for
his 寅; what the 甲寅 heading the 天目's two figures at p. 110 is; and whether that work and the
《太乙統宗寶鑑》 the engine names its witness for are one recension —
`taiyitongzong` in `packages/core/src/witnesses.ts`, and the catalogs with
it, carry the second title and the file on the shelf the first.

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
《御定奇門真詮》 is 1080 hour boards with no 起例: a bench, if anything, and
the 大全's `engine.mjs` already lays the 1080 it would be held to.

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
- **`lodged` and `heavenLodged` are not on the drawing**, which shows one
  stem to a plate in each palace. The transcript prints both as a line under
  the plates and the table of palaces in its cell; a reader of the drawing
  alone does not see that 坤 hosts the centre, or that under
  `centreStem: host` the centre's stem rides to a second palace.
- **`accord` and `ding` are not on the drawing.** The transcript and the
  section print both; `packages/plate` was left as it was, its
  `PlateTaiyiSide` without `accord` and its `PlateTaiyi` without `ding`. 杜
  is drawn, among the conditions, with no fortune beside it.
- **The eye of 太乙's 大遊 is checked by nothing.** Its row rose on the body,
  dated once in a second work; `dayou.wenchang` rides in that row and the
  row says so. The 《統宗》卷十一 p. 110 counts it another way, read on
  2026-10-14, and nothing dates a seat in either work.
- **`taiyiYearOf` is exported and no surface calls it.** Every surface asks
  `taiyiYearAt`. Under `dongzhi` it reads a pillar that must have been cut
  at the solstice too, which nothing checks.
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
