# What stands open

The questions a reading or a build would answer, kept so that `TODO.md` can
stay short. **This is the state of what is unanswered, and changes as
readings land**: a reading that settles a line here removes it in the same
commit, and adds what it leaves open. What to do next, in order, is
`TODO.md`; what is established is `docs/sources.md`; what each file on the
shelf is, `texts/README.md`. Every name in backticks is held to the code by
`node texts/todo-check.mjs`, as `TODO.md`'s are.

## What each refused value waits on

The values are listed in `TODO.md` § 1, which a test holds to the engine. The
row is the query to put to an arriving text; the argument is in
`docs/sources.md` § "Whose each value of a … board is", one section an art.
What a value must show is attribution and transcription, and another copy of
a work already held is not a witness.

| | waits on |
|---|---|
| `plate: fei` | **the user's word, and no longer a text.** 《奇門法竅》 (錫孟樨, 1870) states the board, draws 36 boards on it and tabulates its 1080 hours, read on the plate 2026-11-05: the earth plate carried whole to the hour stem in both 遁, the gates carried over the eight with the 直使 counted through the nine and halting before 五, a 旬首 in 五 taking the lodging's gate, the centre lodged 艮 under 陽 and 坤 under 陰 on every printed board, the spirits `fixed`'s eight round the 卦 (`docs/sources.md` § "《奇門法竅》: the hour board flown whole, stated, drawn and tabulated"). One witness on rung 4. Building it wants a ruling on what `centreLodging` means on a flown board, since the work prints `dunni` and argues `siyu`. The 折衷's stars-flown, gates-turned board is computed as `xingfei`. `system: nianjia` and `yuejia` do not need it: both holders turn the heaven plate there, read on the plate 2026-11-05 (`docs/sources.md` § "年家 and 月家 on the plate: the heaven plate is turned") |
| `system: yuejia` | **commissioned on the user's word, 2026-11-02**: § "年家 and 月家, commissioned" below carries the steps. 《遁甲演義》 and the 統宗 state it, and both turn the heaven plate. The month's three 元 are 孟 一 · 仲 七 · 季 四 for the 演義 and 仲 一 · 孟 四 · 季 七 for the 統宗 (read on the plate 2026-11-05). The board is `layOnPillar` in `packages/core/src/dunjia/nianjia.ts` called on the month pillar |
| `strengths: star` | which of two arrangements from the star it is — 《金鏡寶鑑》卷之四's, or the 《三元經》's that the 符應經, 紀大奎 and the 探索錄 carry — and whether it reaches past the nine stars |
| `yuejiang: jieqi`, `yuejiang: true` | a text stating either as its own. None found, on the plate or in the extracts |
| `zhouye: solar` | which rising, and how. One sentence of 《大六壬精解》 and the 協紀's 日出入, neither with a procedure |
| `xiudu: shixian` | a table with an epoch that can be cited |
| `gong: ci` | a second copy for 女, 井 and 張 of 《星學大成》卷一's 宿度過宮之圖 — the 《元史·曆志》 has the 曆's own — and a decision on what it computes under the default frame |
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
   遁甲釋要 section). The family list of `centreLodging`, `centreTravel`,
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

## Recorded, with no parameter

A divergence the register carries and nothing exposes. Only those with
something to wait on.

- **奇門.** **A day board laid with a plate of stems**, sixty days to a 局,
  陽遁 一 · 七 · 四 and 陰遁 九 · 三 · 六, laid 「法亦同於年奇」. Two readings:
  the 統宗's 又法日奇門起例 begins each 局 on a 甲子 with 超接 and a leap past
  thirty-odd days, and the 大全's 奇門古本 on a 甲 or 己 day by the terms.
  Building it is a family of its own, as `system: yuejia` would be; it waits on
  the user's wish for one, and on where the 統宗's leap goes, which 「如時奇」
  implies and does not say (`docs/sources.md` § "The 統宗's sixty-day 局, read
  on the plate, which lays another board"). **擊刑 by the clock**, the hour whose branch its decade's head
  punishes, built 2026-10-25 on one witness: 《遁甲符應經》's case at
  遁甲集成 第一冊 p. 430, 「以日出時六儀擊刑也」. The 統宗's and the 大全's
  lists give the palace alone and say nothing against the hour; a second text
  striking by the hour moves the row. **十干克應 beyond the sixteen**: 火入勾陳, 朱雀入獄, 人遁 and
  奇入太陰, named alike by J and the block of 《元靈經》 read as the 丁 row,
  wait on a print of 《元靈經》 giving that block's heading; 奇儀順遂 and
  日奇被刑, which J and 《元靈經》 name a word or a character apart, on a
  third line naming either. `texts/qimen/daquan-juan14-16-stems/compare.tsv`
  sets the lines side by side. **日奇入霧**, shipped on J and 《元靈經》, is
  奇入墓 in J's own line as the 仙機 versifies it. **The 干論 under
  `xianji`**: its fortunes, unread cell by cell; 庚 over 丁 and 丁 over 乙, which
  a second copy of the 仙機 could name; and 庚入太白 and 地戶理光, laid as
  printed. The 置閏 pin at ten days: the 大全's 遁甲通明鈐 卷十二 states
  「凡過超十日則閏」 and works a case dated here to 1265–66 that lets nine
  pass, where its 卷十三, its 奇門秘訣 卷四十六 and `MAX_CHAOSHEN` intercalate
  at nine. A text stating ten as its own rule, with nothing against it
  inside the same juan. **乙 buried in 乾**, which the same commentary
  quotes from 三璋 and the 符應經 gives under 璋曰 in 坤: computed since
  2026-10-22 as the 乾 value of `yiTomb`, on 《奇門遁甲秘笈大全》卷十五's verse.
  Which of the two stems in 坤 a stem coming to it stands over:
  the 符應經 marks a 格 by the centre's, one case, and 景祐秘纂 卷二 a second,
  伏干格 陽五局 壬申 on 38L, in the same line of copies; a second witness
  names it. The heaven plate's side of the same question is `centreStem` since
  2026-10-16. 三奇得使 is `deshi` since 2026-10-22. The 演義's condition on
  three of its cells, 「如遇本旬直符同臨其上，方可用之而吉也」, is recorded and
  not computed. 宮迫 without 門迫: 景祐秘纂 卷之二下 names the engine's
  thirteen cells 宮迫, gives no converse, and its verse denies the converse is
  迫 — the default's cells of `menpo` under the other value's name, one list
  and one line; and its 奇墓 gives 乙 both 二 and 六, as 吉凶格解's summary
  does. The half-flown board wants a yin hour worked in any text. The board of a day wants a prompt
  of its own, the scan and the 年命.
- **六壬.** A general related to the day by its own phase, the 家's that
  《六壬大全》卷二 gives it, read on 2026-10-30: the same juan's 總論 takes the
  生剋 from the branch a general rides, which the lens computes, and no text
  read relates by the general's own. A text doing so names a value beside it.
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
- **曆注.** 截路空亡 on a 戊 or 癸 day: the 歷例 the 協紀 quotes gives every
  壬 and 癸 hour, 子 丑 戌 亥, which the engine marks; 寶鏡圖 gives 子 and 丑 on
  all twelve such leaves, read 2026-10-26. A parameter on the user's word;
  《星曆考原》卷五, reported to read 子 and 丑 too, would be a second holder and
  is not held.
- **Not yet attributed.** The default of `earth`; who turns the year at
  正月初一 and the day at the 子 hour (盧央 describes it and holds nothing); the 大運 to the minute; the years
  lived by turns; a second value of `shensha`; the noble of 庚 seated with
  辛's.

**Asked and not found, so not asked of the same works again**: a 日計 or
時計 board with a date on it, of 《太乙金鏡式經》卷六 and 卷九 and of the
《統宗》卷四, 卷十八 and 卷三十六; the holders of
the day and year boundaries, of 《三命通會》卷二 and 《命理新論》, of
《淵海子平》卷一's 起例, and the day's of 洪丕謨's 第三章; the five phases
of the 十二天將 and a general turned at the 節, of 《御定六壬直指》卷上 and
《六壬經緯》卷一–三; a rule for which node 羅睺 is and an epoch for the 積日, of
《星學大成》. The extracts returned nothing for a leap month split at its
middle or for 羅睺 as the ascending node, which is a date and not a negative.

## The shelf

**In order.** Each is a named section; nothing here is a sweep of a book.
Lines 1 and 2 are 太乙 and three files, each with its own offset: the
《統宗》, `taiyi/taiyi-shu-tongzong-daquan-gugong.pdf`, PDF page = series
page + 4, every juan opening on a 目錄 of its own; the 金鏡,
`taiyi/taiyi-jinjing-shijing-skqs.pdf`, PDF page = 四庫 printed page − 854;
盧央's 《中國古代星占學》, `shushu/zhongguo-gudai-xingzhanxue.pdf`, PDF page =
printed page + 18. Lines 1 and 2 have nothing left to read on this shelf and
stand first because a decision waits on each. Line 3 has nothing left to read
for a 起例 either, and stays as the map of the file for a question put to it
later.

| | what would move | where |
|---|---|---|
| 1 | **A dated 日計 board, or the 盈差 of the day explained**: what `ji: riji` waits on | not in the 《統宗》 where it was looked for: 卷三十六 to p. 392, 卷四 p. 41 and 卷十八 whole were read on 2026-10-11 and every board is entered by its 局, and the 144 drawn boards of 卷三十二–三十五, read on 2026-10-15, are entered by their 局 and five 干支 with no year. Left in that work: the 命法 of 卷三十七–四十, which takes a birth. Otherwise a work not held |
| 2 | the lists of 上和 · 次和 · 下和, which three prints give three ways, and which count is read against 太乙's palace | the notes of the 《統宗》卷三十一 立成 were read on 2026-10-15: its table labels every count by its digits, ungraded, and none against 太乙's palace — so it answers neither question. A copy of the 金鏡 that is not the 四庫's, or a work quoting 王希明's lists: none held. The 金鏡 卷二 leaves 9–10, the 《統宗》卷六 pp. 54–56 and 盧央 pp. 477–479 were read on 2026-10-11 |
| 3 | a 起例 variant | 《御定奇門大全》, `qimen/yuding-qimen-daquan.pdf`, 1485 sheets: **read for a 起例 from 卷一 to 卷六十四**, with nothing left to read for one; it found `spiritSeat: yinshi`. Each work in it has a section of `docs/sources.md` titled by its juan, and the sheet ranges are its row in `texts/README.md`. Its 目錄's juan numbers were wrong four times, so a work is bracketed on the 版心 before it is read. Kept as the map of the file for a question put to it later |
| 4 | the limits of a 七政四餘 life, and the 量天尺 | 《星學大成》, SKQS vol. 809: read are 卷一 leaves 1–8, 卷三's 運限起例, 卷四 leaves 1–7 and the four 算法 of the 餘. The juan are mapped in `docs/sources.md` § "《星學大成》卷四 星盤或問, and the map of the other juan" |
| 5 | 郭守敬's lost star catalogue | 《中國恆星觀測史》 第七章第一節二 (二), from p. 274, unread past p. 275; a stencil at 92 dpi |
| 6 | where a 日家 count running at a solstice ends: finished at its 癸亥, or dropped on the solstice day as `dayDun: solstice` drops it | 《金函玉鏡》下冊, `qimen/jinhan-yujing-2.pdf`, 卷二十 p. 413, 「冬至艮宮夏坤地，命起甲子順逆行」 and the lines around it; read so far for the anchor only |
| 7 | **the rest of 《奇門法竅》**, read for `plate: fei` on 2026-11-05: 論超接置閏 and 論拆局補局 against `method` and `leap`; 論中五's gate by the eight 節 against `centreLodging: bajie`; the eleven 乙丑 drawings and the 排宮 figures not read; the 格 of the 1080 hours of 卷七–八 against a board laid by the engine, once `fei` is built | 《奇門法竅》, `qimen/qimen-faqiao-hualing.pdf` (華齡 2011, 點校; printed page = PDF − 21), checked where doubtful against the 抄本 reprint `qimen/qimen-faqiao-chaoben.pdf`; located through `qimen/qimen-faqiao.utf8.txt`; tools in `qimen/faqiao-juan2/` |
| 8 | the 鳴法's flight, which the web reports as gates 「休死傷杜中開驚生景」 with 「中五無門」 and nine spirits; a second holder for `plate: fei`, or a second reading of it | `qimen/qimen-mingfa-liaotu.pdf`, photographs of the 遼圖 manuscript |
| 9 | the 旨歸's board, sold as 「布門輪宮，飛星定局」: a second holder for `plate: xingfei`, and its 24 worked cases | `qimen/qimen-zhigui-siku-weishou.pdf`, 匯源堂 1893 in the 四庫未收書輯刊 |

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

**What is left to read.** Every file on the shelf has a row in
`texts/README.md`, and the shelf is read by question: no page is owed a
reading. The readings standing are lines 4–9 above, and the small errands
are "Left open by the readings" and "Small and left open". The refused values
that wait on files not held are in "What each refused value waits on" and
"Wanted and not held". A new file gets its row first, by the four commands of
`docs/scans.md` § "What a file is, before what it says". The tools (the
bench, the crosswalk, the 1080-hour `engine.mjs`) are in the `shushu` skill's
`common/development.md`; a disagreement is read on the plate before it is
called one.

**Where the state is kept**: `docs/sources.md` what is read,
`docs/provenance.tsv` what is held, `texts/README.md` what each file is.

## The review of 2026-10-23, what it found and did not fix

Each wants a plate or the user's word; rechecked against the code and the
register 2026-10-31.

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
  `centreTravel: travel`; the 入墓 row's rung against its split axis; the
  統宗's and the 秘笈大全 卷一's copies of the 入墓 歌 on the plate; the 飛盤
  and 日家 refusal rows and the 十干克應 one (a second witness asked for,
  70 for 67).
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

## Left open by the readings, small and blocking nothing

Each reading's errands, newest first; the full wording of those before phase
83 is in `docs/history/roadmap-2026-10-30.md`.

- **Phase 90**: 《奇門法竅》's drawings fly the yin heaven plate as a
  translation, every star one way with its stem, where `flownPlates` reverses
  the order under 陰 for `xingfei`; the 折衷 works no yin hour, so its sheet 67
  「陰遁逆飛」 wants re-reading against the arrangement the 法竅 draws. Inside
  the 法竅: 陰遁九局 丙子's 生門 on 坤二 (rule: 乾六), 陽遁五局 庚寅's 星門伏,
  陰遁五局 戊辰 and 陰遁七局 戊子 · 庚寅's 門反, 陽遁四局 乙丑's 「門休」 in both
  copies and 壬辰's 「巽離 伏門」 (華齡 p. 198, not seen on the 抄本); the 直符
  of a 旬首 in 五 named 禽 on the drawings and the lodging's star in the tables.

- **Phases 88–89**: the 統宗's 附月奇門起例 prints 「年以月建」 where 「皆以」,
  as in its year's sentence, is what the sense wants, and its 上元's 元 is
  broken on the print (故宮 p. 20). The year board's 「審其方向，得奇門到者吉」
  is recorded and not computed.

- **Phase 86**: the 寶鑑's 三 against the 統宗's 二 for the second 甲子 of
  夏至, preferred and not settled by a fourth copy.
- **Phases 84–85**: 洪丕謨 turns the year at 立春 without saying whether at
  the term's day or its instant; 《淵海子平》 was asked in 卷一's 起例 only;
  `dayBoundary: zishi` has no holder, 盧央 describing it and 沈義方's
  《星平大成》, a lead for `midnight`, not held.
- **Phase 80**: the 總論 of 《六壬大全》卷二 calls the five generals before the
  noble 「水、火、土之神」 where their lines give 火 火 木 土 木; the 景祐神定經
  is not on the shelf.
- **Phases 77–79**: 「先以寅申巳亥上乘之神為用」, quoted by the `shushu` skill
  for 陳公獻 from the web, not found on sheets 14 and 18 of the 指南; the
  大全卷五's 比用 by element harmony, pdf 130, not weighed; 尉山人's
  「上克下，取天盤孟仲為驗」; the 精解's 察微 and 綴瑕 at p. 14, not re-read on
  the plate; the ten nights 陳公獻 reads by the day seat, recorded with no
  value; 50T1, 59B1 and the 39T2 square.
- **2026-10-26**, 寶鏡圖's hours (`texts/qimen/daquan-juan60-baojing/hours/`):
  五不遇 on 26 hours of 20 days, 23 of them by the hour's branch against the
  day's stem; 丁酉's leaf; the noble, 喜神 and 旬空 marked on some days only.
- **2026-10-24**, 景祐秘纂 (`texts/qimen/daquan-juan02-04-jingyou/`): the 38L
  case against 遁甲集成 第一冊; 33L and 35L's 直使; whether 卷之二下's 諸凶格 is
  吉凶格解's summary copied; the wheels of 46L and 47R; 卷四's five undated
  直符 passages.
- **2026-10-22**: 吉凶格解's 釋吉格, seen at 50 dpi; 三奇受制 「丙丁臨一」
  against the 秘笈大全's 「臨九」; the slip over sheet 1389; 寶鏡圖's six wheels
  parting in a cell or three, and 卷六十's almanac.
- **2026-10-17 to 20**, the 大全: 先天要論's 穀雨 and 霜降 局 and 陽遁二局's
  值符歌; 奇門古本's 雜占 hours; which of the 大全 and 《奇門探索錄》 carries the
  other; 奇門秘訣's 卷四十三 opening and 卷四十六 sheets 1064–1069, seen at 50
  dpi; the commentary at sheet 1103; 寶鑑摘要's 陽二局 丙午 case, the four
  cases splitting on the spirits' seat, the note at sheet 1299L, and whether
  `baojian` holds `spiritSeat: tianpan`.

## Catalog strings owed a look by the user

Catalog strings nobody but their writer has read, in both catalogs, newest
first, none blocking; `docs/history/roadmap-2026-10-30.md` lists them with
their glosses. 2026-10-30: `form.qimen.leap` and its values and note,
*reader-copy*. Phase 78: `form.liuren.shehai`, `form.liuren.shehaiFrom`,
`notes.parameter.shehai`. 0.38.0: the privacy note's storage lines, the
glyph rain's, and the Italian renamings (five 八神 after the 六壬 generals,
驚門 «Spavento», 六儀 «insegna», the two plates, 剋 «domina»). Phase 75: the
sixty-eight `label.pattern.*` of the 干論, *reader-copy*. Phases 72–74: the
lens's strings, `lens.where.*`, `label.relation.*`, `web.note.qizheng*` and
`.taiyiPalaces`, `form.qimen.spiritPhase`, `form.qimen.system.bar`.
2026-10-11 to 22: `form.qimen.menpo`, `yiTomb`, `deshi`, `dayDun`,
`dayGates`, `spiritSeat`, `centreLodging`, `stemPairs`; `form.taiyi.*`;
`label.register.*`; `label.pattern.*` of 《金函玉鏡》.

## The lens, when it moves again

The year board has no lens (the 奇門 endpoint answers it with none), and the month
board is to be designed with its lens from the start; 八字 last and only if the user wants it, the relations
there (合, 沖, the ten gods) being a different lens. Leads, none decided:
論星辰生尅制化 (全書 卷之三, PDF 162–163) gives a 紫微 palace's ground its
branch's phase, rung 4, its last clause odd on the plate (「土入金鄉」, the
transcription 木鄉); a pair on 太乙's palaces, in 太乙's numbering; 六壬's
六沖 and 六合, a general by its own phase ("Recorded, with no parameter"), the 日家's nine stars and
the 紫微 四化 flights, each once it has its row; 太乙's answer is cached
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
