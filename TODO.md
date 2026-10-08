# What is not built yet

**The engine is built; the open edge is the paper.** The boards, the almanac
layer and the calendrical layer under them are computed, checked and
documented. What is unfinished is the shelf: sections nobody has read, files
nobody has measured, and a handful of parameters waiting on a text that is not
here. A third vernacular waits on the engine rather than on any of that.

What holds today is in [`docs/`](docs/README.md); how it got here is in
[`docs/history/`](docs/history/README.md), and nothing there is normative.

## Resuming cold

**Read this section and § 2. That is enough to start.** The rest of this
file is reference for when a particular value or a particular constraint comes
up, and the pages it points at are large — opening one whole to find one fact is
the expensive mistake here.

**Pick a line from § 2, then read exactly three things.**

| | | how |
|---|---|---|
| 1 | what the file *is* | `texts/README.md`, **one row** — grep the filename or the title. It carries the extent, the pixels, the way in and the leaf anchors |
| 2 | what is already established about it | `docs/sources.md` runs to thousands of lines. **Grep it**, for the work's title or the quantity's name; read the section the hit is in and no more |
| 3 | what the value would need | § 1 below, the clause under the value's name. That clause *is* the query to put to the text |

**What not to open.** `docs/sources.tsv` is read by a test and by a surface, not
by a planner. `docs/history/` is never normative — go there to find out why
something was decided, never to find out what holds. `texts/rules/`,
`texts/crosswalk.tsv` and `texts/manifest.json` are the corpus's own state and
nothing in `docs/` leans on them.

**What a reading costs, so a session can be sized.** A plate is read at two to
four pages a minute and that is the bottleneck; a contact sheet of eight to
twelve pages costs one look and locates approximately. Extracting is unattended
and twenty-five to fifty times faster per page, and it *cannot* establish a
negative. [`docs/scans.md`](docs/scans.md) owns all of that and is the page to
read before a first survey — once, not every session.

```sh
texts/shelf.py crosswalk --moves   # quantities whose rule gained a witness
texts/shelf.py crosswalk --gaps    # registered quantities no passage reaches
texts/bench/run.mjs                # the worked examples the sources print
texts/bench/run.mjs --uncovered    # the shapes still without an adapter
```

**Before the session ends, sweep for sentences it outlived** — not at the start
of the next one. An audit found a value shipped in the morning leaving three
sentences behind that still called it unshipped, and a book read at noon still
«held and not yet read» at four. Grep `docs/sources.md`, `texts/README.md` and
this file for the phrases that assert a state — «not yet read», «still
missing», «none opened», «nobody has», «unsettled», «this list is empty» — and
read each hit against what the code and the register now say.

## 1. Parameters that are declared and refused

Every one already exists in an input type, is validated, and throws
`OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED` rather than falling back.
That is the point: **the API does not break when one lands.**
`docs/parameters.md` argues what each value names and deliberately does not say
which side of this line it is on; `packages/core/src/parameters.ts` declares it.

Implementing one is a matter of a witness and not of writing code: a text of
the line that holds it, of whatever age, attributed, and giving a procedure
that can be reconstructed without contradiction. `docs/sources.md` § "What a
value named for a school must show" says what makes a text that witness and
names the three states a divergence can be in — computed, declared and
refused, recorded with no parameter. **Another copy of a work already held is
not a witness**, however well edited: it collates the text and adds none to
the doctrine, so no value below is waiting on one. `docs/sources.md` § "What a
second copy of one text buys".

| Board | Refused today |
|---|---|
| 奇門 | `plate: fei`, `system: yuejia`, `system: nianjia`, `dayDun: liushi`, `leap: runyue`, `strengths: star` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `minggong: ascendant`, `gong: ci` |
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: dongzhi`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split` |

`apps/web/test/docs.test.ts` holds this table to the engine both ways: a value
the engine starts computing and this table still calls refused fails that suite,
and so does a refusal the engine gains and this table does not name.

**紫氣 left this table on 2026-09-01** and is the case a reader will look here
for. It is computed and it is the default: the value places the fourth 餘 to a
palace and never to a degree. Both halves of that placement rest on a single
text, which is a rung and not a refusal, and what would strengthen them — a
second dated chart with 炁 on it — is stated where the placement is argued, in
[`docs/refusals.md`](docs/refusals.md).

**One parameter carries one value and no second one to refuse**, which is a
different state and not a lesser one: the divergence is declared, the engine
says which reckoning it computes, and what the type lacks is a *name* for the
alternative. Declaring one belongs to the same errand as implementing it.

- 曆注 `shensha` — what 《協紀辨方書》 ratifies, until a named lineage has been.

**And one divergence carries no parameter at all**, which is the state `leap`
was in until 《金鏡寶鑑》 arrived. Under the centre lodging this engine computes, the palace of 坤
holds two stems — its own and the centre's, lodged there — and which of the two
a star carries off it when the plate turns is read both ways. 《奇門探索錄》
卷三 p. 22 has 天芮 carry the centre's 乙 out to 兌; this engine leaves 乙 in the
fifth and carries 坤's own 庚. One heaven-plate cell, and the text's own 夾注
disputes which star does the carrying rather than whether one does, so it is one
work quarrelling with itself and not yet a school. Naming it wants a second
witness. → `docs/sources.md` § "《奇門探索錄》, which derives the pin the 統宗
only asserts". 《遁甲符應經》 has the earth plate's side of it, a 格 marked by
the centre's stem at 坤 and not by 坤's own, which is a neighbour and not that
witness → `docs/sources.md` § "《遁甲符應經》 from 三甲 to its 後序".

### The state of each divergence, art by art

`docs/sources.md` § "What a value named for a school must show" names three
states. The table above is the second of them; this says, for each art that
has been read for it, what each refused value has behind it and which
divergences stand in the third. An art not listed here has not had the pass.

**紫微斗數** — argued in `docs/sources.md` § "Whose each value on this board
is".

| | State | What it has, and what it waits on |
|---|---|---|
| `leapMonth: current`, `leapMonth: split` | declared and refused | no text; a program computes one of them. Waits on a manual that states either |
| the star modern boards call 解神, placed off the month | recorded | a second star and not a second reading: the book's 解神 is their 年解, 366 births of 366 against a reference that carries both. Stated whole by 《中國絕學》第六冊 p. 399. It enters with the other stars 卷二 does not place, if the board is ever to carry them |
| the stars 卷二 does not place | recorded | the same |
| 王亭之's table at 戊, 庚 and 壬 | recorded | named, unread |

**奇門** — argued in `docs/sources.md` § "Whose each value of a 奇門 board
is". The clauses under "What each named one waits on" below are the readings
as they were made; where one ends on a second witness being wanted, this table
is what holds.

| | State | What it has, and what it waits on |
|---|---|---|
| `strengths: star` | declared and refused | held by 《奇門遁甲金鏡寶鑑》卷之四; the 折衷 argues against the same reading and puts it on a 《三元經》. Waits on reading whether its rule reaches the gates and the spirits or the nine stars alone |
| `leap: runyue` | declared and refused | held by 《奇門遁甲金鏡寶鑑》. Waits on 《金函玉鏡》's rule that contains both placements: one rule or two |
| `system: yuejia`, `system: nianjia` | declared and refused | held by 《遁甲演義》 and the 統宗; the 年家's two readings are two values. Each waits on being built as the day family was: a board of its own, with its own stars and no table on the shelf to hold it to |
| the board of a day | computed | gates and stars, under two readings of the gates. The twelve hours of the day stand beside them, read off the almanac. Waits on a prompt of its own, and on the scan and the 年命, which are written against a plate of stems |
| `dayDun: liushi` | declared and refused | sixty days to a 局, the 統宗's. Waits on its rule being read on the plate |
| the gates' year in six blocks of four terms | recorded | the 金函玉鏡's 大八門逐日出行訣, read for its starts and not verse by verse |
| `plate: fei` | declared and refused | no text flies the hour board's own 起例. Arrives with a family of `system` |
| the stars and the 儀 flown, the gates turned | computed | held by the 折衷, which works two hours of a yang board. Waits on a yin hour worked in any text, and on whether its spirits are flown |
| the 值使 from the earth plate or the heaven plate | recorded | chosen by the matter asked |
| the leap block at any of the eight 節 | recorded | asks for a judgement |
| which stem a star carries off 坤 | recorded | one work quarrelling with itself |
| which stem a stem coming to 坤 stands over | recorded | 《遁甲符應經》 marks 太白入熒惑 by the centre's 丙 lodged there, on a board where this engine marks 刑格 by 坤's own 己. One case, corrupt in one copy and whole in the other |
| the tomb of 丁 | recorded | 艮 in the 統宗's 四十格, which `TOMB` follows; 乾 with 丙 in 《遁甲符應經》, under 璋曰, in both copies. One cell of four |
| 三奇入墓 and 六儀擊刑 read off the hour | recorded | 乙未 and 丙戌, and the hour whose branch the decade's punishes: 《遁甲符應經》 states each beside the palace reading this engine computes |
| 三奇得使 | recorded | 葛洪's pairing in 《遁甲符應經》, with four boards worked of which one lays. Stays out of `findPatterns` |

Four readings of where the centre lodges and the earth plate laid by the
decade left this table on 2026-10-07 and are computed; `docs/sources.md`
§ "The 折衷 on the plate, chapter by chapter" is where each is read.

The default of `earth` is not yet attributed: no text is named for it. The
defaults of `spirits` and `strengths` are the 折衷's, read on the plate.

**六壬** — argued in `docs/sources.md` § "Whose each value of a 六壬 board
is".

| | State | What it has, and what it waits on |
|---|---|---|
| `yuejiang: jieqi`, `yuejiang: true` | declared and refused | no holder. 《大六壬精解》 prints the 節 beside the 氣 and endorses neither. Waits on a text stating either as its own |
| `zhouye: solar` | declared and refused | named in one sentence of the 精解, with no procedure and two risings joined; 《協紀辨方書》卷七 holds 日出入 for the noble of an almanac, again with no procedure. Waits on a text saying which rising, and how |
| the order of 涉害 | recorded | a verse read one way and two programs grouping another. Waits on a text or a manual holding either by name |
| the 末傳 of a 伏吟 by 冲 | recorded | the engine's own clause |

The second table of `guiren`, which stands 甲 apart, is 《御定六壬直指》's two
verses and 《協紀辨方書》卷七's two tables, each read on the plate. The five phases of the 十二天將 have nothing
registered: the two sections located for them were read and carry none, and
《六壬經緯》 has no juan of 神煞.

**太乙** — argued in `docs/sources.md` § "Whose each value of a 太乙 board
is".

| | State | What it has, and what it waits on |
|---|---|---|
| `epoch: taojin` | declared and refused | held by 《太乙淘金歌》, which reaches the register through 盧央 and is not on the shelf. Waits on the text, and travels with the evidence 盧央 sets against it |
| `ji: yueji`, `ji: riji`, `ji: shiji` | declared and refused | the 金鏡 states all three and its constants fail its own check; the 統宗 carries another system's. Waits on the 統宗's being read, as that work's |
| `yearBoundary: dongzhi`, `yearBoundary: chunjie` | declared and refused | no holder, and the default has none either |
| `geChong: chong` | declared and refused | a 格 made by a 沖 of branches: the 統宗, on one board 盧央 reproduces, 始擊 in 辰 against a 太乙 in 乾. Waits on the rule being stated — which seats and which bodies it reaches — and one board is not that |
| 陰陽和不和 in two accounts | recorded | one work carrying both |

Whose bodies 格 is marked for, and what 文昌 in 太乙's own palace is called,
left this table on 2026-10-07 and are computed.

**七政四餘** — argued in `docs/sources.md` § "Whose each value of a 七政四餘
board is". The default frame is the engine's own construction; the 授時
frame, the first a line holds, is computed since 2026-10-07 by the method of
《授時曆故》.

| | State | What it has, and what it waits on |
|---|---|---|
| `xiudu: shixian` | declared and refused | a table with no epoch that can be cited. Waits on one |
| `gong: ci` | declared and refused | no holder named. Waits on the same table |
| `minggong: ascendant` | declared and refused | no holder named; a second method and not a second reading |
| the 距星 of 觜 and of 參 | recorded | four assignments across the Tang, the Song, the Jesuit order and the 《儀象考成》; the engine takes the last |

**曆注, and the layers under every board** — argued in `docs/sources.md`
§ "Whose each value of the almanac's page is" and § "Whose each value of the
calendrical layer is". Nothing here is refused, so this is all in the third
state or short of an attribution.

| | State | What it has, and what it waits on |
|---|---|---|
| a second value of `shensha` | recorded | 曹震圭's and 邵泰衢's accounts of the 十二神, 《萬全廣濟》's table for 蠶命, the fixed-date list of 楊公忌: known through the 《協紀辨方書》 that rejects them. Waits on a witness of their own |
| the noble of 庚 seated with 辛's, on 寅 and 午 | recorded | 「庚辛逢馬虎」, which 《日家奇門》's column follows and no manual held states. Waits on one |
| 五不遇時 read off the day's branch | recorded | the 《遁甲隱公歌註》's, known through the 《協紀辨方書》 that sets it aside |
| who holds the year turned at 立春 or at 正月初一, the day turned at the 子 hour, and the clock left uncorrected | not yet attributed | every reading is computed. 《三命通會》's 論年月日時 is silent on the boundaries. 《命理新論》 holds true solar time, the day turned at midnight and the year turned at 冬至, and none of these four. Asked 2026-10-07; a lead for the day at midnight in 沈義方's 《星平大成》, not held |
| the hour laid on the month's palace rather than the Sun's, for the 命宮 | recorded | 《三命通會》卷二: 正月 on 子 and back a palace a month, where a 七政四餘 board changes palace at the 中氣. They part in the second half of every month |
| who holds the 大運 counted to the minute | not yet attributed | the count by the 時辰 is 《三命通會》's, which knows the 刻 is finer and counts by the 時 |
| who holds the count of years lived by turns | not yet attributed | the other count is 《遁甲演義》's |

### What was asked of the extracts, 2026-10-07

One search a value, the question written first, over the text extracted from
the shelf. **An extract locates and cannot establish a negative**, so «nothing
found» below means the question is still open and now has a date; nothing here
is «not expected» on this evidence.

| The question | What came back |
|---|---|
| a 奇門 text giving earth the last eighteen days of a season, for the second reading of `earth` | nothing in the 奇門 extracts. 《大六壬精解》 has the general statement, since read on the plate at its p. 214 and admitted as a witness: the three 式 stand on one doctrine of the phases. The value is computed since |
| a 六壬 text seating the noble with 甲 standing alone, for the second table of `guiren` | nothing in the 六壬 extracts; an almanac has it — 《協紀辨方書》卷七's 起例, since read on the plate |
| a 六壬 text cutting day from night at a rising, for `zhouye: solar` | only the sentence of the 精解 the register already quotes |
| a 六壬 text turning the general at the 節, for `yuejiang: jieqi` | nothing found |
| a 紫微斗數 text splitting a leap month at its middle, for `leapMonth: split` | nothing found |
| a 七政四餘 text making 羅睺 the ascending node | nothing found; one set of lecture notes names 羅睺 天首星 and says nothing of which node |
| a manual placing 解神 off the month | 《中國絕學》第六冊 p. 399, since read on the plate: stated whole, with a diagram |

### What was asked of the plates and not found, 2026-10-07

Each of these was put to the works named and the works were read on the
plate. A negative here is about those works and no others.

| The question | Asked of | Outcome |
|---|---|---|
| who turns the day when the 子 hour opens, the default | 《三命通會》卷二, 《命理新論》 第五章 and 第九章 | not found. The second argues against it and names nobody for it |
| who turns the pillars' year at 立春, the default, or at 正月初一 | the same | not found. 《命理新論》 turns it at 冬至 |
| the five phases of the 十二天將 | 《御定六壬直指》卷上, 《六壬經緯》卷一 to 卷三 by their 目錄 | not found, and the second has no juan of 神煞 |
| a 六壬 text turning the general at the 節, or cutting day from night at a rising | the same two | not found: both turn at the 中氣 and cut by the branches |
| who holds the year boundaries of 太乙 and of 紫微斗數, the ascending node as 羅睺, the palaces cut at the 中氣 | nothing: no lead on the shelf | not asked |

### What each named one waits on

Most of the table waits on a source and nothing more particular. These clauses
are the query to put to an arriving text.

- **`plate: fei`** — a text flying the **hour** board. Both imperial prints turn
  it and say so; 《金鏡寶鑑》 spends 飛 five times on other things, including the
  flying-palace operation itself on 八宅. The last unread 起例 on this shelf was
  read on 2026-08-31 and turns it too. **The one passage that put 飛 and the nine stars
  in an hour context has now been read whole, and it does not lay a board**:
  《奇門探索錄》卷三 pp. 33–35, 2026-09-10. Its 九星轉運歌 closes on 換星不換時,
  and the 按 on p. 35 says what the method is for — 「不過看日前日後於何年月值吉
  凶生旺者，與都天輔甲不同，不可錯用」 — so it reads a year and a month off a
  chart already standing. **What the same chapter does carry is a laying
  procedure that flies, on the hour**: 起訣, p. 35,
  「十二時支干飛布九宮……自中宮起，飛布九星於各宮」 — a 符經 hand-reckoning with
  六親, a 身位 and twelve 青龍, which its own 按 measures against 太乙 rather than
  against this board. A flying hour system, and not this board's 起例. So «not
  expected to move» can be written with a reason: what is missing is not a text
  spending 飛 near the nine stars, which this shelf now has twice, but one flying
  the 時家 board's own 起例.
  `plate: fei` and `system` are one errand. **And a second text has since been
  read that flies half the hour board.** 《奇門遁甲折衷》 devotes a 論 to each
  half — 九星飛布不用旋轉 and 八門旋轉不用飛布 — quotes a named 傳本 for
  「地盤星儀是飛，天盤何得用旋？地盤八門用旋，天盤安可用飛？」, and names
  顧陵岡池本理 for the turn — the 統宗 line, on the text's word and not on a
  title page. It flies the stars and the 儀 and turns the gates,
  which is a **third** arrangement rather than this value, and it is one work.
  What the clause can now say is that the hour board is flown somewhere, which
  is more than it could say before.
- **`system: yuejia · nianjia`** — a board built, as the day's was. Two works
  state the families entire: 遁甲演義 and the 統宗, whose 卷二 this shelf holds
  four times over. On the year they give 一四七 against 遁甲集成 第三冊's 一七四,
  with 《遁甲釋要》 (1939) checking the older recension and printing 「分值一四七
  諸局」; those are two readings and will be two values. Two modern lines are on
  the shelf for the month, both 張志春's, and they part on it. A family is a
  board of its own — its own ring of nine stars, its own count, and layers the
  hour board has not — and for these two the sources give the point of entry
  and the step, where the day family had a table of a hundred and twenty
  charts to be held to. `plate: fei` arrives with them: both are flown.
- **`dayDun: liushi`** — the rule. The 統宗 gives the day family sixty days to a
  局 and lets the half follow the 局; it is declared on the register's word and
  has not been read on the plate for how a 局 is begun.
- **`leap: runyue`** — attribution. 《金鏡寶鑑》 states the leap-month placement,
  works it twice by date and rejects the solstitial one outright; what it does
  not do is name a lineage. **Neither does the second work to go looking**:
  《奇門遁甲折衷》 calls the solstitial rule 諸書's, puts the block at any of the
  eight 節 instead — a third placement — and quotes a 耕山陳氏 who denies there is
  a leap at all. Four readings inside one work quoting three others. `docs/parameters.md` § "What a school value must
  show" asks for attribution and transcription, and only the second is here.
  **And a third text prints a rule that contains both values**: 《金函玉鏡》上冊
  p. 87 keeps the two solstitial terms and lets the year's leap month choose
  between them, while its 下冊 p. 425 states the placement — 冬夏二至前起閏 —
  and the nine-day pin outright, and derives the intercalation from the length
  of a solar month. One work, so nothing is declared on it; what it says is that
  the two values as written may be one rule with a different half suppressed in
  each, which is the shape of the question before the attribution is even asked
  for. See `docs/sources.md` § "A third text, and the two placements turn out to
  be one rule".
- **`strengths: star`** — a second witness, or one text checking itself. 卷之四
  of 《金鏡寶鑑》 reads 旺相休囚死 outward from the star and tabulates all nine
  that way, swapping 相 with 休 and 囚 with 死. Its table checks its own rule
  rather than the rule. **The work bought to answer it carries a different
  reading from the star, and it is not alone in that**: the 煙波釣叟歌 as 紀大奎 copies it,
  with its 舊註, has the star 旺 in the months it generates and 相 in its own,
  and 《奇門探索錄》 prints the same; 《遁甲符應經》 gives it as a rule and puts
  it on a 《三元經》. That is a neighbour and not a witness, so
  the clause stands as written; what a text would also have to say now is which
  of the two it is. 紀 keeps it to the nine stars — 「八門干支之類，或不當以此例論
  也」. See `docs/sources.md` § "《紀氏奇門秘書仕學備餘》, where the states read
  from the star are a second arrangement".

## 2. The shelf

### Read first — what is left of the 2026-09 arrivals

**Everything here is ahead of the rest of this section.** Of the files that
reached the shelf on 2026-09-09, one is surveyed and not yet read past its
first juan. The others are done, and what each established is in
`docs/sources.md`: 《紀氏奇門秘書仕學備餘》 (the states read from the star in a
second arrangement, and 紀大奎 limiting it to the nine stars), 《奇門克應》 (none of the three things this
shelf calls 克應), 《紫微斗數捷覽》 (the 《全書》 board, not the 十八飛星 one),
《奇門遁甲折衷》 (it names the school this engine follows) and its 抄錄 companion
(a finding aid). **A file nobody has read is not evidence**, and a file nobody
has read that the register already has sentences about is worse: the 捷覽 had
been written up from a 39-page teaser, and reading the book moved it to the
other transmission.

| | what it was bought to answer | where |
|---|---|---|
| **景佑《御定奇門大全》** | a **起例 variant**, which is where every divergence on this shelf has come from. **Its 目錄 is now read whole and its 卷一 opened** (2026-09-10), and the variant is not there: 卷一–四 are 景祐秘纂, whose opening chapter 超神接氣直指 is 《奇門探索錄》卷三's chapter on a plate — the same headings, the same 芒種大雪 placement, the same derivation of `MAX_CHAOSHEN`, the same 萬曆己丑 worked examples. That is a second copy of a chapter this register has already weighed, so it moves no rung; what it does is put the derivation on a woodblock instead of on one Republican typesetting, and it obliges the count behind `leap: solstice` to be looked at again, two works agreeing possibly being one work in two compilations. **What is left unread is eleven of the other twelve works**, of which 卷五–十's eighteen 局 tables are a bench. 卷二十五, the 卷上 of its 遁甲符應經, was read on 2026-10-08 against the copy in 遁甲集成 第一冊: one text, with a 超接 and 置閏 passage dated 淳祐 that the other copy lacks → `docs/sources.md` § "《遁甲符應經》 in three copies, and what its 卷上 says". The rest of that work was read whole in 第一冊 the same day, and in this file only where a passage was set against it — sheets 607, 615–620, 631 and 637 of 599 to about 657: from 卷中 on it is another recension, with a 奇門四十格 list where the other copy has its sections → `docs/sources.md` § "《遁甲符應經》 from 三甲 to its 後序". → `docs/sources.md` § "《奇門探索錄》, which derives the pin the 統宗 only asserts". Earlier: the plate disagrees with itself on the title — 景祐奇門大全 in its own preface (dated 永樂十二年), 御製奇門大全 at its first section heading, 御定奇門大全 in its 目錄 and at its closing colophon — three headings for one compilation running to 卷六十四, consistent with (not counted against) the seller's claimed thirteen works. Full detail in `texts/README.md`'s row | `yuding-qimen-daquan.pdf`, 1485 sheets two-up at **600 dpi**, the sharpest scan here — and 8-bit grayscale on inspection, not the 1-bit this row once said |

**None of the four bought on 2026-09-09 states a provenance**, and the 折衷
carries a second watermark under the first. guoxueziyuan.com says only
「資源來源於網絡公開發表文件」, so no 叢刊, no library, no edition — and this register's
recurring discovery is that two differently-titled files are one text: 遁甲集成
第四冊 turned out to be the 御定寶鑑, the 秘笈大全 the 金函玉鏡. **Identifying the
recension therefore comes before weighing anything off any of them**, and that
pass has now run for all four: none of them names a 叢刊, a library or an
edition, so the recension stays unidentified even where the title on the plate
is now legible.

**Four more titles on that platform were judged worth having and were not
bought**, and they are recorded so the judgement does not have to be made twice:
《宮藏奇門大全》 (622 pp.), 《遁甲奇門秘傳要旨》 (661 pp.), 《明抄奇門陰遁書》
(326 pp.) — three large unattributed manuscripts — and 《李衛公奇門心法》, which
carries a **Tang attribution** and would stand beside 《太乙金鏡式經》 under the
八門 row, that row's only Tang witness. **Nothing is owed on any of them until
the one above has been read**: a shelf grows by what has been weighed, not by
what has been fetched.

**All were bought from guoxueziyuan.com**, which is the watermark they carry;
`docs/provenance.tsv` has every address.

### Read — sections a question has already been put to

**Nothing here is a sweep of a book.** Every line is a named section of a
surveyed file, reached by the anchors its row in `texts/README.md` records, and
each is owed the ordinary thing: the argument in `docs/sources.md`, the row in
`docs/sources.tsv`, the rung — which may fall as well as rise — and the date the
entry shows. Ordered by what a reading would move.

| | what would move | where |
|---|---|---|
| 《中國恆星觀測史》 第七章第一節二 | the 授時 lodge values, if a modern reconstruction can stand where the 曆's own table would | printed p. 272 |
| SKQS vol. 809, 《星學大成》 | what 七政四餘's neighbours have wanted; unweighed until read | volume pp. 285–870, 三十卷, both ends read on the plate |
| 《太乙數統宗大全》, 故宮 第420冊 | the 闕 of 卷一 read against a second hand; its own constants answered the other half and did not lift the refusal, being another calendar's | four leaves of 440 read — 卷二's calendrical apparatus and 卷三's 起例 |
| 《中國古代星占學》 第五章 · 太乙式數占 | 陰陽和不和, refused because two accounts of it do not line up; this chapter's eight principles open on the parity of a 算, which is what they disagree about | printed pp. 492–499, of which only the closing summary is read |
| 《中國古代星占學》 第五章 · 太乙十神 · 十精太乙 | the four bodies that walk twelve palaces, and the one layer of this art read for weather rather than for reigns — named in the register and not computed | printed pp. 505–511 and 512–519 |

**《御定奇門真詮》 is on no line and that is an answer**, not an omission: 545
pages of it are 1080 hour boards with no 起例. What it could be is a bench of
worked examples, and `texts/bench/` is where that would go.

### Measure — files nobody has opened far enough to describe

Most of the 2026-08-31 arrivals. `texts/README.md` says which, one row a file;
the count is not written here because it drifts and no test can hold it. **What
they cost is unknown by construction** — whether any stands under a value in § 1
is exactly what a survey makes answerable, and `docs/scans.md` § "What a file is,
before what it says" is the four commands it takes.

### Ask — the two instruments that already have questions open

**`texts/bench/`** runs the worked examples the sources print for
themselves. **Two disagree**, both 六壬 and both on rules the corpus marks
divergent: a 涉害 whose 三傳 come out differently, and a 返吟 whose four courses
are displaced in a way that points at the 日干寄宮. Each is a question and
neither is a verdict — settling one means reading the passage its citation
names, and the passage is on the shelf. Most examples have no adapter yet;
`--uncovered` lists the shapes.

**`texts/crosswalk.tsv`** joins the transcribed corpus to `docs/sources.tsv`.
Its two reports are leads and not findings: **a witness located is not a witness
weighed**, and what moves a rung is the argument written into `docs/sources.md`
and the row added beside it. `docs/notes.md` § "The corpus, which is not the
register" is that boundary.

### Where the state is kept

Not in this file, which would need maintaining and would drift.
`docs/sources.md` says what has been **read**, `docs/provenance.tsv` what is
**held** and what it is, `texts/README.md` what each file **is**, one row
apiece, and `texts/<art>/.txt/` what has been **extracted**. Those four are the
answer to «where was I», and the sweep at the top of this file is what keeps
them from outliving the shelf they describe.

## 3. What a reading may not claim

Binding, and the place where an honest session and a wasted one part.

- **An extract locates a passage and never quotes one, and a search returning
  nothing is not a negative.** A negative is established on the plate.
  `docs/scans.md` owns this and it has been paid for twice.
- **A transcription is not a plate.** Of the passages that arrived with the
  corpus, twenty-two are the archive's own digital text that nobody has read
  against an image. Nothing at that mark may close a question. The reliability
  mark travels with every passage; `texts/rules/README.md` says what each means.
- **A second copy settles the text and never the doctrine.** It retires one risk
  — the copy is corrupt, the character misread — and moves three things instead
  of four, never the rung.
- **A print can be one work at its frame and another at its filling**, and no
  contents leaf says so. So a passage that reads as the work's own is put to the
  transcriptions already held before it is written up — a grep, not a reading,
  and cheapest on the section a file was opened *for*. See
  [`docs/history/39-the-baojian-and-what-it-was-made-of.md`](docs/history/39-the-baojian-and-what-it-was-made-of.md)
  for the case that bought it.
- **A divergence in the corpus is not a parameter.** The corpus flags a rule
  where two readings were found, which is a fact about texts;
  `docs/parameters.md` asks for a divergence *between practitioners*.
- **A negative is a negative about the shelf that was asked.** Every closure in
  `docs/history/` is a statement about the files held that day. A file arriving
  reopens the part of it that named that file's class or its text, bounded:
  `docs/sources.md` § "What an arrival reopens" says how far.

**Two negatives stand reopened and unanswered**, each dated in the register
and each naming the volume that would answer it: 太乙's 卷一 constants and its
月計 · 日計 · 時計, both waiting on 《太乙數統宗大全》 in § 2. That is the
register's side of the same table. The five phases of the 十二天將 were the
third: both sections located for them have been read and carry none, so that
question waits on a file this shelf does not hold.

## 4. Spanish, once the engine has stopped moving

There are two vernaculars, which is a state and not a design —
`docs/i18n.md` § "Who is reading" argues it. **Spanish is the third**, and
deliberately not third *yet*: the catalogs still gain a family of messages with
every board, and a language added now is a language re-translated at each of
them by somebody who has to follow the argument rather than look a word up.

So the condition is the engine's and not the catalogs'. Nothing has to be
prepared — `LOCALES` is a list, `Record<MessageKey, string>` makes a missing key
a compile error, and the locale is negotiated the same way on all four surfaces.
What has to be *watched* is the ratio: what is derived from the engine costs a
third language nothing, and what is written costs it a paragraph. **A page that
grows written prose grows the price of this.** The one thing that would change
the design rather than the catalogs is a language needing plural rules, gender
agreement or message syntax; Spanish needs none of the three.

## 5. Surfaces that reach less than the engine

**Small.** The block naming the schools in force says the truth on every
surface, and no value is accepted and left unread: an option of the other
family of 奇門 is refused by name on every surface, by `refuseOtherFamily`.

**The command line reads its school options off the declaration.** `flagOf` in `packages/core/src/cli.ts` names a flag for every
parameter `parameters.ts` declares — bare for a board's own and for a layer's,
under the board's name where a layer has the word — and the help lists after
each what the engine computes, its default, and what is declared and refused.
A divergence landing in the engine can be asked for there the same day. An
option the command in hand does not lay is refused instead of dropped.

**Two copies are still written a parameter at a time**, and each is held to the
declaration by a test rather than read off it: the MCP tool schemas in
`packages/mcp/src/`, which carry a paragraph of description apiece that a
derivation would lose, and the page's `apps/web/src/lib/parameters.ts`, which
exists because the client imports only types from `core`. A value added to the
engine fails those suites until it is added there; nothing says it silently.

**The board of a day reaches every surface that lays, prints, draws or copies
a board.** The drawing marks 喜神 on the palace of its bearing and leaves the
twelve hours to the transcript, being a grid of directions with no place for
an hour; `draw_qimen_chart` says so. The section was looked at on 2026-10-08
in a browser, at a desktop width, at 375px and on paper, and every section
was measured at 375px on the same day and holds to the screen's edge.

What the same board waits on that is no surface — a prompt of its own, the
scan and the 年命 — is on its line in § 1.

## 6. Debts in the code

Nothing here is wrong and nothing blocks anything; each is what a session left
when the thing it was doing was something else.

**A rasterised board sets its Latin in whatever face resvg falls back to, on
any line that also holds a hanzi.** `familiesByScript` in `png.ts` sets each
script in a family of its own, because resvg's own fallback loses the hanzi
beside certain letters. Every name draws. What it does not reach is the other
half of that fallback: resvg shapes the whole line for each stretch, and where
the face it falls back to covers the line entire it takes every glyph from that
face, the Latin included. On the runtime image that face is Noto Sans CJK Bold,
so a reading and a caption beside a name come out in a bold sans where a line
of Latin alone — the band's heading — is set in DejaVu Serif. Nothing is lost
and two registers of one drawing are set unalike. Seen 2026-10-06 on a board
rendered inside the deployed container; a machine whose fallback face lacks the
tone marks does not show it, which is why the tests do not.

**What it needs is a line that is one script to a chunk**, since resvg shapes a
chunk at a time: a stretch placed at an `x` of its own starts one. That wants
the width of what stands before it, and this package estimates widths and does
not measure them — `measure` in `readings.ts` — so the remedy is a text engine
or a resvg that resolves a stack a character at a time, which the latest
`@resvg/resvg-js`, 2.6.2, does not.

**The same shaping is what a board costs.** About a second with its readings at
a thousand pixels on the runtime image, about three on a machine holding
several hundred faces. Nothing in this repository asks for a PNG — the entry
point is exported and no surface imports it — so neither moves a term.

## 7. What is refused and stays refused

Not to do, and here only so nobody mistakes silence for an omission: the 用神,
格局, ranking, dating, advice, the 年命 purposes doctrine, who is 主 and who is
客, a day master called strong or weak, a natal Qi Men chart, 太乙's dynastic
readings, what 卷十一 of the 探索錄 reads in the hexagram of a palace, and the
十八飛星 placements grafted onto a 《全書》 board. Each has an
entry in [`docs/refusals.md`](docs/refusals.md) saying who asks for it and why
it is not here — and that file carries more than this list does, several of its
entries being rules about a surface rather than doctrine somebody asks for.
