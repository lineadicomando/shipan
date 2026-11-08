# Roadmap snapshot, 2026-11-08, end of phase 104

`TODO.md`, `docs/open.md`, `docs/open-recorded.md` and `docs/open-errands.md` whole as they stood after 0.52.0 was committed, before `TODO.md` was cut a tenth time, the lens of the year and month boards put first, and `docs/open-errands.md` shortened. Never normative.

---

## TODO.md

## What is not built yet

What a session needs to resume, and nothing more. What holds is
[`docs/`](docs/README.md). The open questions are [`docs/open.md`](docs/open.md),
with [`docs/open-recorded.md`](docs/open-recorded.md) and
[`docs/open-errands.md`](docs/open-errands.md) beside it. The past is
[`docs/history/`](docs/history/README.md), and none of it is normative. This
file has been cut nine times, each time archived whole to a roadmap there; the
last is
[`docs/history/roadmap-2026-11-06-phase101.md`](docs/history/roadmap-2026-11-06-phase101.md).

### Resuming cold

**Nothing is in progress.** Start at item 1 below unless the user says
otherwise, and read a section of `docs/open.md`, not the whole file.

- **A reading**: the file's row in `texts/README.md` (grep the filename), the
  work's section in `docs/sources.md` (grep its title), and the question's
  line in `docs/open.md`. Read `docs/scans.md` for the method, and the
  `shushu` skill's `common/development.md` for what a reading owes and the
  tools on the shelf.
- **A build**: the `new-feature` skill, § "A value of a parameter, built on a
  reading". Surface work starts from `docs/architecture.md` § "A board the
  page can point into". Put a new parameter's shape to the user first.
- **Version and release**: `docs/architecture.md` § "Which term moves" and §
  "Releasing". Tag, push and deploy only on the user's word.
- **Do not open** `docs/sources.tsv` (grep a row, edit in place),
  `docs/history/`, `texts/rules/`, `texts/crosswalk.tsv`, `texts/manifest.json`.
- **Checks**: `npm ci` if there is no `node_modules`. `npm run build` first,
  because the MCP and web suites and the shelf's scripts import
  `packages/core/dist`. Then `npm test`, `npm run typecheck` and
  `node texts/todo-check.mjs`, which holds every backticked name here and in
  the three open-question files to the code. Before ending, sweep
  `docs/sources.md`, `texts/README.md`, the open-question files and this file
  for sentences the session outlived («unread», «not built», «not tagged»…).

### Where it stands, 2026-11-08, end of phase 104

**0.50.0** on `main`, tagged `v0.50.0`, pushed and deployed: https://shipan.it
runs 0.50.0. No branch is open, and build, typecheck and every suite pass.
Phases 98 to 101 read the limits of a 七政四餘 life and built `gong: ci`, the
命度 and the 大限 with `qixian`. Phase 102 read the 量天尺 of the 《張果星宗》
as a ruler by fraction and, on the user's word, lays both under `gong: ci`
with `qixian: du` counting thirtieths of the 命宮; `qixian: ri` leaves the
limits null there. Phase 103 read the shelf's last two lines, and nothing
moved in the engine. Phase 104 built the 月家, `system: yuejia`, with
`monthYuan`. 0.52.0, on `main`, not tagged; 0.51.0 was never tagged either.

### What to do next, in the order the user has been taking it

1. **The scan form's two silent criteria**: `gongpo` is offered always and
   found only under `menpo: gongzhimen`, and the gate 中 is laid under
   `gateSeats: nine` and cannot be asked for. `docs/open.md` § "Surfaces and
   code".
2. **The shelf** holds no named section today (phase 103 read the last two);
   what a reading left is `docs/open-errands.md` § "Left open by the
   readings", and the files wanted are `docs/open.md` § "The shelf".
3. **Two leads**, neither file held: `docs/open.md` § "Leads from the `shushu`
   skill".
4. **The review of 2026-10-23**: `docs/open-errands.md` § "The review of
   2026-10-23". Several lines are a missing row in `docs/sources.tsv`,
   writable from what is already read.
5. **The lens, when it moves again**: the year and month boards have none,
   and the month was built without the one planned for it; 八字 last, and
   only if the user wants it. `docs/open-errands.md` §
   "When the lens moves again".

### Decisions held open, by the user's word

- **六壬's lessons and transmissions in the bare drawing** (2026-10-25): kept,
  being 7 of the 19 seats `liurenLens` presses; removing them needs a ruling
  on what the lens does with those seats.
- **太乙's 月計 · 日計 · 時計: wait, all three** (2026-10-11). Each is a second
  input type, a `dayBoundary` under the board's name, a ruling on `gate`,
  `sanji`, `wufu`, `dayou` and `ding`, and a line in `lib/cacheable.ts`.
- **囚 and 格 on the dated boards of 卷七: rung 5** (2026-10-14).
- **The test of a count by its digits: not built** (2026-10-15).
- **截路空亡 on a 戊 or 癸 day: wait** (2026-10-26).

**Standing answers, applied rather than asked again**:
- A run of worked cases unanimous on a question makes a holder (2026-10-30);
  a study describing a count does not (2026-10-31).
- A compiler's note disowning a layer his own juan states does not block a
  value whose text is attributed and transcribed (2026-11-02).
- A parameter has one default for every board it reads on, and a form may
  fill a field from a value (`fills`, 2026-11-05).
- Two schools parting on two things are two axes, and a name follows the
  print that carries it (`gateSeats`, `spiritRing`, 中, 2026-11-06).
- A quantity derivable under the default and blocked under another value is
  built under the default and left null under the other, saying why (the
  命度 and the 大限 under `gong: ci`, 2026-11-06).

### 1. Parameters that are declared and refused

Each throws `OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED`.
`apps/web/test/docs.test.ts` holds this table to `parameters.ts` both ways.
What each waits on: `docs/open.md` § "What each refused value waits on".

| Board | Refused today |
|---|---|
| 奇門 | `monthYuan: yuejian`, `strengths: star` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `minggong: ascendant` |
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split` |

### 2. What stays out

Spanish waits until the engine stops moving (`docs/i18n.md`). The 用神 and
everything beside it stay refused (`docs/refusals.md`).

---

## docs/open.md

## What stands open

The questions a reading or a build would answer. A commit that settles a line
removes it and adds what it leaves open. Read a section, not the file. The
order is `TODO.md`; what is established is `docs/sources.md`; each file on the
shelf is `texts/README.md`. Beside this file, `docs/open-recorded.md` holds
the divergences the register carries with no parameter, and
`docs/open-errands.md` the small errands, the review of 2026-10-23 and the
lens's leads. `node texts/todo-check.mjs` holds the backticked names in all
three to the code. What was dropped is in
`docs/history/roadmap-2026-11-06-phase101.md` and the roadmaps before it.

### What each refused value waits on

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

### The shelf

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

### Leads from the `shushu` skill

Each art's file in `.claude/skills/shushu/disciplines/` ends on «Leads against
the register», none read on a plate. Those touching a standing question: 截路空亡 at two
hours in 《星曆考原》卷五, beside 寶鏡圖's (`almanac.md`, file not held); the
楊公忌 check, which the 協紀 says is not the 值日 count (`almanac.md`, in the
華齡 協紀's 下 volume).

### Surfaces and code

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

---

## docs/open-recorded.md

## Recorded, with no parameter

A divergence the register carries and nothing exposes, only those with
something to wait on; then what was asked of a work and not found there. Part
of [`docs/open.md`](open.md), and held to the code with it by
`node texts/todo-check.mjs`. A commit that settles a line removes it.

- **奇門.**
  - **The centre lodged at the corner its season begins in**: 立春 艮, 立夏 巽,
    立秋 坤, 立冬 乾, 《奇門法竅》's 論寄宮, which its 例言 says it did not print.
    Not `centreLodging: siyu`, whose corners are 《三才發秘》's a season off.
    One statement and no board; a value wants the user's word.
  - **A day board laid with a plate of stems**, sixty days to a 局, 陽遁 一 · 七
    · 四 and 陰遁 九 · 三 · 六, 「法亦同於年奇」: the 統宗's 又法日奇門起例 (each 局
    on a 甲子, 超接 and a leap past thirty-odd days) against the 大全's 奇門古本
    (a 甲 or 己 day by the terms). 《奇門法竅》's 論日奇法 is a third statement,
    flown, 「或超或接，或拆或補」, with two days worked, and puts its gates in a
    《選擇金鏡》 not held. A family of its own; waits on the user's wish
    and on where the 統宗's leap goes (`docs/sources.md` § "The 統宗's sixty-day
    局, read on the plate, which lays another board").
  - **The yin flight of `xingfei`**: `flownPlates` reverses the stars under 陰,
    and the 法竅 draws them carried as one, as do the 鳴法's 陰遁二局 丙午 and
    the 旨歸's 540 yin boards
    (「八門九星無分陰陽皆要須順去」); the 折衷 works no yin hour, so its sheet 67
    「陰遁逆飛」 wants re-reading, or a yin hour worked in a text of its line.
  - **擊刑 by the clock** stands on one witness, the 符應經's case at 遁甲集成
    第一冊 p. 430; a second text striking by the hour moves the row.
  - **十干克應 beyond the sixteen**: 火入勾陳, 朱雀入獄, 人遁 and 奇入太陰, named
    alike by J and the block of 《元靈經》 read as the 丁 row, wait on a print
    giving that block's heading; 奇儀順遂 and 日奇被刑, a word or a character
    apart, on a third line (`texts/qimen/daquan-juan14-16-stems/compare.tsv`).
    日奇入霧 is 奇入墓 in J's own line as the 仙機 versifies it.
  - **The 干論 under `xianji`**: its fortunes, unread cell by cell; 庚 over 丁 and
    丁 over 乙, which a second copy could name; 庚入太白 and 地戶理光, as printed.
  - **The 置閏 pin at ten days**: the 大全's 遁甲通明鈐 卷十二 states 「凡過超十日則
    閏」 and works a case (1265–66) letting nine pass, where its 卷十三, 奇門秘訣
    卷四十六 and `MAX_CHAOSHEN` intercalate at nine. Waits on a text stating ten
    as its own rule.
  - **Which of the two stems in 坤 a stem coming to it stands over**: the
    符應經 marks a 格 by the centre's, and 景祐秘纂 卷二's 伏干格 陽五局 壬申 (38L)
    is the same line of copies; a second witness names it.
  - **Recorded and not computed**: the 演義's condition 「如遇本旬直符同臨其上，
    方可用之而吉也」; 宮迫 without 門迫 in 景祐秘纂 卷之二下 (the default's cells of
    `menpo` under the other value's name) and its 奇墓 giving 乙 both 二 and 六.
  - **The board of a day** wants a prompt of its own, the scan and the 年命.
- **六壬.** A general related to the day by its own phase, the 家's that
  《六壬大全》卷二 gives it, read on 2026-10-30: the same juan's 總論 takes the
  生剋 from the branch a general rides, which the lens computes, and no text
  read relates by the general's own. A text doing so names a value beside it.
- **七政四餘.** The 身 as the Moon or as the degree facing the 命; the 大限 under
  `gong: ci` with `qixian: ri`, which no text counts across the 次; the 大限 past 夫妻, where 《張果星宗》 gives 奴僕, 男女 and 田宅
  four and a half years each in words and in its calendar, and five and four
  for the first two in its table of ages, and 《御定五星精義》 five, four and
  four; the 小限, 月限 and 童限; the 距星 of 觜 and 參. Which node 羅睺 is:
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
《統宗》卷四, 卷十八, 卷三十六 and the 144 boards of 卷三十二–三十五, whose only
part left unread, the 命法 of 卷三十七–四十, takes a birth; the lists of 上和 ·
次和 · 下和 and the count read against 太乙's palace, of 金鏡 卷二, 《統宗》卷六
and 卷三十一 and 盧央 pp. 477–479, which want a 金鏡 not the 四庫's or a work
quoting 王希明's lists; a 起例 variant, of 《御定奇門大全》卷一–六十四, which
found `spiritSeat: yinshi`; the holders of
the day and year boundaries, of 《三命通會》卷二 and 《命理新論》, of
《淵海子平》卷一's 起例, and the day's of 洪丕謨's 第三章; the five phases
of the 十二天將 and a general turned at the 節, of 《御定六壬直指》卷上 and
《六壬經緯》卷一–三; a rule for which node 羅睺 is and an epoch for the 積日, of
《星學大成》. The extracts returned nothing for a leap month split at its
middle or for 羅睺 as the ascending node, which is a date and not a negative.


---

## docs/open-errands.md

## Errands

Small doubts the readings left, cells and characters to look at again, what
the review of 2026-10-23 found and did not fix, the lens's leads, and strings
for the user to read. None blocks anything; a session with time to spare takes
one. Part of [`docs/open.md`](open.md), held to the code with it by
`node texts/todo-check.mjs`.

### Left open by the readings

Each reading's errands, newest first, from phase 94. Those of phases 86 to 93
are in `docs/history/roadmap-2026-11-06-phase101.md`, and the earlier ones in
`docs/history/roadmap-2026-11-05.md` and `docs/history/roadmap-2026-10-30.md`.

- **Phase 104**, the month built (`system: yuejia`). Left by the month: the
  演義's 「自嘉靖四十二年十一月甲子起休門在坎三箇月一移」, a second month layer
  of a gate three months to a palace, not laid; the month laid flown, which
  《奇門法竅》's 論月奇法 does (「其飛布天地二盤之法與年奇同」), if `plate` is ever
  offered on a board on a pillar; a canonical month board; a lens. Left by the
  year, carried over: a bench of the 遁甲集成 第三冊 tables, pp. 1160–1216,
  against `yearYuan: yiqisi`, cell by cell; a canonical year board in
  `packages/core/test/canonical/`; and a lens.

- **Phase 103**, the shelf's last two lines. Where a 日家 count running at a
  solstice ends, finished at its 癸亥 or dropped on the solstice day as
  `dayDun: solstice` drops it: the 金函玉鏡's 卷二十 p. 413 states the anchor
  and not the boundary, and no other held text has been named for it. 潘鼐's
  report that the Ming 《三垣列舍入宿去極集》 opens on the 授時曆經's
  黃道十二次宿度, in a manuscript not held.

- **Phases 98–100**, inside 《星學大成》 and the 集成's 《張果星宗》:
  whether 《星學大成》卷三 起大限's case (福德 10, 遷移 9, opening at 13) is two
  numerals miscopied or another table, which its 洞微限 and 百六限 (卷八–十三)
  may settle; 《星學大成》's verse 約二十八宿過宮度數歌, reported as 「張十四巳」,
  against its own wheel's miscopy, on the plate; 定限度法's 「以量天尺九難」 as
  printed; the 張果星宗's 年分訣 「共六六」, not construed.

- **Phase 96**, inside 《奇門旨歸》: 超神接氣折補閏局法, read once and not
  reconciled clause by clause before `method: chaibu` names it; 陽七局 丁卯's
  plate (乙丑's, PDF 118) and 陰九局 戊辰's stars (four palaces on, PDF 143);
  the stars of the other boards, not transcribed; the single cells cut twice
  (`texts/qimen/zhigui/scripts/check.mjs --list`).

- **Phase 95**, inside 《奇門遁甲鳴法》: the 認局 passage's example, 「如乙丑日亥時交節…
  為中局」, against the 拆補 the same passage states, before `method: chaibu`
  names the work; the 陰 diagram's centre, not drawn; 第一章's 日課 · 月法 · 年依運
  · 世從會, a family read only far enough to name it.

- **Phase 94**, inside 《奇門法竅》's 排宮 figures: 陰遁一局 乙丑's 景 for 英 on 坎一.

### Small, inside works already read

In the 符應經, the note in small characters under
the title at 遁甲集成 第三冊 p. 1136, and 玉女守門 as two tables in two
copies; in the 集成's 度數所在過宮圖, 井's 分 and 畢's 秒, at the limit of
the scan. In the 《統宗》: the lunar
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

### The review of 2026-10-23

Each wants a plate or the user's word; rechecked against the code and the
register 2026-10-31, 2026-11-05 and 2026-11-06.

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

### When the lens moves again

The year and month boards have no lens (the 奇門 endpoint answers both with
none); the month was built on 2026-11-08 without the lens this page had
planned for it, which is the first thing to put to the user when the lens
moves again. 八字 last and only if the user wants it, the relations
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

### Catalog strings owed a look by the user

Read by nobody but their writer, both catalogs, newest first, none blocking
(glosses in `docs/history/roadmap-2026-10-30.md`; strings before
2026-10-30 in `docs/history/roadmap-2026-11-06-phase101.md`). 2026-11-06,
phases 99 and 101: `form.qizheng.gong` and its values and note,
`form.qizheng.qixian` and its values and note, `notes.parameter.qixian`,
`cli.field.mingdu`, `cli.field.limits`, `cli.value.limitYears`,
`cli.value.noLimits`, `cli.column.qizhengLimit`, `prompt.qizheng.gong.ci`,
`prompt.qizheng.limits`. 2026-11-06, phase 97:
`form.qimen.gateSeats` and its values and note, `form.qimen.spiritRing` and
its values, `notes.parameter.gateSeats` and `.spiritRing`, `label.gate.zhong`,
`label.spirit.taichang`, and the counts of spirits taken out of
`form.qimen.spiritSeat`, `form.qimen.spiritPhase`, `form.qimen.system.shijia`
and their `notes.parameter.*`. 2026-11-05:
`form.qimen.plate` and its values and note, `notes.parameter.plate`.
2026-10-30: `form.qimen.leap` and its values and note, *reader-copy*.
