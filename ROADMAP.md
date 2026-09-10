# What is not built yet

**The engine is built; the open edge is the paper.** The boards, the almanac
layer and the calendrical layer under them are computed, checked and
documented. What is unfinished is the shelf: sections nobody has read, files
nobody has measured, and a handful of parameters waiting on a text that is not
here. A third vernacular waits on the engine rather than on any of that.

What holds today is in [`docs/`](docs/README.md); how it got here is in
[`docs/history/`](docs/history/README.md), and nothing there is normative.

## Resuming cold

**Read this section and § 2's table. That is enough to start.** The rest of this
file is reference for when a particular value or a particular constraint comes
up, and the pages it points at are large — opening one whole to find one fact is
the expensive mistake here.

**Pick a line from § 2's table, then read exactly three things.**

| | | how |
|---|---|---|
| 1 | what the file *is* | `texts/README.md`, **one row** — grep the filename or the title. It carries the extent, the pixels, the way in and the leaf anchors |
| 2 | what is already established about it | `docs/sources.md` is ~5 000 lines. **Grep it**, for the work's title or the quantity's name; read the section the hit is in and no more |
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
texts/bench/run.mjs                # the 147 worked examples the sources print
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

Implementing one is a matter of finding a source that meets the standard — two
transmitted witnesses agreeing, or one text that checks itself — not of writing
code. **Another copy of a work already held is not that**, however well edited:
it collates the text and adds no witness to the doctrine, so no value below is
waiting on one. `docs/sources.md` § "What a second copy of one text buys".

| Board | Refused today |
|---|---|
| 奇門 | `plate: fei`, `centreLodging: dun`, `system: rijia`, `system: yuejia`, `system: nianjia`, `leap: runyue`, `strengths: star`, `earth: eighteen` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `xiudu: shoushi`, `minggong: ascendant`, `gong: ci` |
| 太乙 | `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: dongzhi`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split`, `huoling: hour`, `daxian: ming` |

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
only asserts".

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
- **`centreLodging: dun`** — a **school** holding 艮, not another copy reading
  it. 《御定奇門寶鑑》 knows both readings, derives the refused one from the
  先天 trigrams in its 卷一 釋虛中合宮, judges it the sounder — and declines it
  on manuscript majority: 「其說於理尤為周備，但本多從前說，故遵之」. 本 is an
  edition, and an edition can only be preferred. **A second work now states the
  value and holds it no more than the first did.** 《奇門遁甲折衷》 prints both
  declared values in one sentence with their derivations and rejects the pair,
  for a lodging that walks all eight palaces three terms at a time; it also names
  顧陵岡池本理 for the 坤 this engine lodges in, which is the first attribution
  the shipped value has. What is still missing is somebody who *holds* 艮.
- **`system: rijia · yuejia · nianjia`** — a **lineage holding one reading**.
  Two works state the families entire and disagree; the fuller prints three
  competing day methods and its compiler calls the whole layer 後人附會穿鑿.
  Two, not three: the juan counted as a third witness is 《奇門遁甲統宗》卷二,
  which this shelf holds four times over. On the year the count is 遁甲演義 and
  the 統宗 for 一四七 against 遁甲集成 第三冊's 一七四, with 《遁甲釋要》 (1939)
  checking the older recension and printing 「分值一四七諸局」. The day family has
  a second divergence of its own — where its cycle restarts, on which 遁甲釋要 and
  《奇門探索錄》 part — so a lineage would have to hold a reading of that too.
  Two lineages are on the shelf, both 張志春's, and they disagree with each
  other on the month. That pairing with `plate: fei` is stated in a text rather
  than inferred, and a family costs more than the pairing suggests: its own
  ring of nine stars, its own leap count, and layers the hour board has not.
  **The day family's tables are no longer part of that cost.** 《日家奇門》
  (鮮紅草, 1998) gives all sixty 干支 in both 遁 — gates three days to a palace
  without the centre, the 太乙 nine one palace a day through it — which is 120
  charts to check an implementation against, one block of them a known misprint.
  A bench is not a lineage and nothing here moves; what it removes is the need to
  derive the tables before being able to test them. **And the work that table
  names as its source is now read**: 《金函玉鏡》下冊 prints the 九星 訣 with six
  decade anchors that check its motion (p. 372) and states the anchor in verse
  (p. 413), 「冬至艮宮夏坤地，命起甲子順逆行」. What still blocks the value is the
  anchor divergence, two branches to one, and the lineage. 年家 and 月家 keep
  the cost whole.
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
  rather than the rule.
- **`earth: eighteen`** — a text giving earth only the last eighteen days of
  each season. It feeds the states above, so it decides 旺相休囚死 for every
  cell, and the two answers part for two-thirds of four months a year.
- **`xiudu: shoushi`** — **參, and a decision about the parameter's shape.**
  《授時曆故》卷二 carries the whole 授時 黃道宿次 at 至元辛巳 and the table checks
  itself: each quadrant closes on its own seven entries and the four on
  365.2575, the 曆's own 周天分. Twenty-seven of twenty-eight lodges are read off
  the plate; 參 is not printed, and subtraction is a derivation and not a
  witness. 《中國恆星觀測史》's 第七章第一節二 studies that same epoch's
  observations and is § 2's fourth line. Separately, **the option would have to
  carry an epoch as well as a table** — 「各得當時宿度」 — which is the only part
  of this that touches code.

## 2. The shelf

### Read first — what is left of the 2026-09 arrivals

**Everything here is ahead of the table in the next section.** The chapter that
stood at its head — 《奇門探索錄》卷三 pp. 33–35, the only thing in sight capable
of moving a refused value — was read on 2026-09-10 and moved none: what it
establishes is under `plate: fei` in § 1. **The two files that arrived first are
now done** (2026-09-10): the 克應 was surveyed and turns out to be none of the
three things this shelf calls 克應, and the 捷覽 was read whole. What is left in
this section is the two of the four bought against § 1's clauses that are
surveyed and not yet read for the clause each was bought to answer. What
follows is the six files that reached the shelf on 2026-09-09 —
`docs/provenance.tsv` has nine such files in all, but three of them
(`jinhan-yujing-1.pdf`, `jinhan-yujing-2.pdf`, `rijia-qimen.pdf`) were already
read for other rows before this section was written and sit outside it. **A
file nobody has read is not evidence**, and a file nobody has read that the
register already has sentences about is worse. **That was the 捷覽 and it has now
been paid for**: every sentence about it had been written from a 39-page teaser,
and reading the book put it in the other transmission from the one those
sentences put it in.

**The order inside this section is: the two that arrived first, then the four
bought against § 1's clauses.** The first two are done and are kept here for
what they establish. Nothing below this section is owed a reading until the two
still standing are.

| | what would move | where |
|---|---|---|
| **《奇門克應》** | **surveyed 2026-09-10, and it is none of the three.** A colour facsimile of a manuscript in a running hand, 34 sheets, two book-pages to each, no title leaf, no colophon, no 版心. Most of it is an eight-trigram 萬物類象-style correspondence table (乾坎艮震巽離坤兌, each with categorised lists), bracketed by a grave/missing-person location formula; no eighty-one-cell grid, no gate-over-palace layout, no ten-stem structure. It does not touch `docs/sources.tsv`'s 十干克應 row. Full detail in `texts/README.md`'s row | `texts/qimen/qimen-keying.pdf`; `docs/scans.md` § "More than one book-page to the sheet" |
| **《紫微斗數捷覽》 明刊孤本 1581, 心一堂 facsimile** | **read 2026-09-10, and it was filed on the wrong side.** Not the 十八飛星 transmission this file and `docs/refusals.md` both called it: its 目錄 gives 北斗, 南斗, 中天, a 五行局圖 in five grids and 安紫微天府訣, so it is 《全書》's fourteen-star board — the one computed here — in a block-printed Ming witness that transmission had none of. It moves no value and it takes an argument away from one: 定大限訣 states `daxian: ming` **with the bureau's age**, on a board that has a 五行局, worked both ways off one birth, which is the pair this register had been calling a graft. Still refused, now on the count of witnesses. Its five grids also print both cells 《全書》's page lost. → `docs/sources.md` § "《紫微斗數捷覽》, which was filed on the wrong side" | `texts/ziwei/ziwei-doushu-jielan-mingkan.pdf`, 1279 × 1735 rgb at 192 dpi |

**Four more were bought on 2026-09-09**, chosen against the
clauses in § 1 rather than by title, and each was owed the same first pass — what
the file *is*, before what it says. **《奇門遁甲折衷》 was the first of them and is
read** (2026-09-10): it is the one work on this shelf that carries attribution and
transcription at once, it names 顧陵岡池本理 for the plate this engine turns and
the 坤 it lodges the centre in, and it moves no value — `docs/sources.md`
§ "《奇門遁甲折衷》, which names the school this engine follows". Its
transcription companion, `qimen-zhezhong-chaolu.pdf`, was measured the same
day — a finding aid, not a witness. **The other two are now surveyed**
(2026-09-10), not read for the clause each was bought to answer.

| | what it was bought to answer | where |
|---|---|---|
| **景佑《御定奇門大全》** | a **起例 variant**, which is where every divergence on this shelf has come from. **Surveyed, not read for the variant**: the plate disagrees with itself on the title — 景祐奇門大全 in its own preface (dated 永樂十二年), 御製奇門大全 at its first section heading, 御定奇門大全 in its 目錄 and at its closing colophon — three headings for one compilation running to 卷六十四, consistent with (not counted against) the seller's claimed thirteen works. Full detail in `texts/README.md`'s row | `yuding-qimen-daquan.pdf`, 1485 sheets two-up at **600 dpi**, the sharpest scan here — and 8-bit grayscale on inspection, not the 1-bit this row once said |
| **《紀氏奇門秘書仕學備餘》** | **`strengths: star`.** 紀氏 is a commentator this shelf already meets — 《奇門探索錄》 carries 「紀氏云：此或九星如此推，八門、九神不能照此也」, disputing whether the nine stars' rule reaches the gates and the spirits, which is that value's whole question. **Surveyed, not read for the value**: a printed edition whose later juan carry gate/star/stem judgements in the right register, closing with an appendix, 附甘氏克應, naming a fourth and narrower 克應 — six-gate correspondences — distinct from the other three this shelf already has. Full detail in `texts/README.md`'s row | `jishi-qimen-mishu.pdf`, one-up at about 367 dpi |

**None of the four states a provenance**, the one now read included, and that one
turned out to carry a second watermark under the first. guoxueziyuan.com says only
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
the three above have been read**: a shelf grows by what has been weighed, not by
what has been fetched.

**All were bought from guoxueziyuan.com**, which is the watermark they carry;
`docs/provenance.tsv` has every address. The 捷覽 is no longer named for the
Scribd upload whose teaser it replaced, those bytes not being from it.

### Read — sections a question has already been put to

**Nothing here is a sweep of a book.** Every line is a named section of a
surveyed file, reached by the anchors its row in `texts/README.md` records, and
each is owed the ordinary thing: the argument in `docs/sources.md`, the row in
`docs/sources.tsv`, the rung — which may fall as well as rise — and the date the
entry shows. Ordered by what a reading would move.

| | what would move | where |
|---|---|---|
| 遁甲集成 第一冊, 《遁甲符應經》 三卷 | closes the volume attribution the register carries open, and 二遁直符合於中宮 is a second reading of the centre | series pp. 385–490; 目錄 at 389–393 |
| 《六壬經緯》's 神煞 juan | the five phases of the 十二天將, which the drawing leaves in neutral ink for want of a source | series pp. 1–92, one juan of six |
| 《御定六壬直指》 卷上 起例 | 起貴人定十二天將法 and 十二月將名號 — the same question, second place | series pp. 5–33 |
| 《中國恆星觀測史》 第七章第一節二 | the 授時 lodge values, if a modern reconstruction can stand where the 曆's own table would | printed p. 272 |
| SKQS vol. 809, 《星學大成》 | what 七政四餘's neighbours have wanted; unweighed until read | volume pp. 285–870, 三十卷, both ends read on the plate |
| 《太乙數統宗大全》, 故宮 第420冊 | the 闕 of 卷一 read against a second hand; its own constants answered the other half and did not lift the refusal, being another calendar's | four leaves of 440 read — 卷二's calendrical apparatus and 卷三's 起例 |
| 《中國古代星占學》 第五章 · 太乙式數占 | 陰陽和不和, refused because two accounts of it do not line up; this chapter's eight principles open on the parity of a 算, which is what they disagree about | printed pp. 492–499, of which only the closing summary is read |
| 《中國古代星占學》 第五章 · 太乙十神 · 十精太乙 | the four bodies that walk twelve palaces, and the one layer of this art read for weather rather than for reigns — named in the register and not computed | printed pp. 505–511 and 512–519 |

**The two 六壬 lines are one question from two sides** and are the cheapest pair
here: 神煞 is a juan of its own and 卷上's 目錄 names 起貴人定十二天將法, so both
are reached by arithmetic rather than by sweeping.

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

**`texts/bench/`** runs the 147 worked examples the sources print for
themselves. **Two disagree**, both 六壬 and both on rules the corpus marks
divergent: a 涉害 whose 三傳 come out differently, and a 返吟 whose four courses
are displaced in a way that points at the 日干寄宮. Each is a question and
neither is a verdict — settling one means reading the passage its citation
names, and the passage is on the shelf. A hundred and twenty-four examples have
no adapter yet.

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

**Three negatives stand reopened and unanswered**, each dated in the register
and each naming the volume that would answer it: 太乙's 卷一 constants and its
月計 · 日計 · 時計, both waiting on § 2's sixth line, and the five phases of the
十二天將, waiting on its second and third. That is the register's side of the
same table.

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

**Medium.** Nothing here is wrong: no value is accepted and dropped, and the
block naming the schools in force says the truth on every surface. What is
missing is reach — a school the engine computes that one surface cannot be
asked for.

**The CLI is the poorest of the three today.** It offers `--method`,
`--guiren`, `--luohou`, `--ziqi`, `--year-boundary`, `--ziwei-year-boundary`,
`--taiyi-year-boundary`, `--day-boundary`, `--true-solar` and `--shensha`, and
not these four:

| | |
|---|---|
| `qimen.spirits` | three implemented values, and it decides which names the middle pair of the eight carries |
| `qimen.centreTravel` | two, and it decides which palace the 值符 and the 值使 are read from when the count puts them on the centre |
| `ziwei.sihua` | two, one cell of the table apart, and the cell seats a transformation |
| `bazi.luckGranularity` | two, parting by up to ten days on when the first decade opens |

All four are offered by MCP and by the REST API. The CLI's own stated policy
implies they are owed a flag: a flag over a parameter with **one** implemented
value could only offer a refusal, which is why `epoch` and `ji` have none —
these have two or three.

What each costs: a row in `FLAGS`, a field on `Options`, a clause in the usage
text, a validated read beside `ziweiOptionsFrom` and `qizhengOptionsFrom`, and
a test that the board moves rather than that the flag parses. No engine change,
no register row, no new prose in `docs/`.

## 6. Debts in the code

**One is high and the rest are low**, which is new: this section used to hold
only what a session left behind when the thing it was doing was something else.

### High — the PNG drops names, and the probe written to catch that passes

**A rasterised board prints a box where some of its hanzi should be**, in the
band of readings under the grid: 癸 guǐ, 乙 yǐ, 己 jǐ and 景門 jǐngmén come out
as tofu where 辛 xīn, 坎 kǎn and 天蓬 tiānpéng beside them come out whole. The
SVG is sound — a browser draws every glyph — so it is the rasteriser and
nothing above it.

**It is not coverage.** `fc-list` gives the same families for the characters
that draw and the characters that do not, and the two sit in the same `<text>`
element at the same size with the same class. Reduced to four lines of markup
lifted out of a real board, with the drawing's own stylesheet, two draw and two
box.

**And the probe cannot see it, which is the part that matters.**
`assertGlyphsRender` in `png.ts` writes `FONT_STACK` inline on the element it
tests; the drawing takes the same stack from a class in the stylesheet. Under
the inline form 癸 draws, so the probe answers a question the picture is not
asking. Two guards exist there precisely against *silent* loss in this band —
«the picture still looks like a chart, and the half of it that exists for the
reader with no Chinese is gone» — and this is that failure, arriving past both.

**Why it is high.** It is the register that carries the readings, which is the
half of the drawing built for a reader who cannot read the glyphs; the loss is
per-name and partial, so a chart looks right; and a PNG is the copy that
travels furthest from the page that could have corrected it.

**What it needs first is the cause, not a patch.** The next step is to find
which family resvg resolves the class to and what it holds — a stack whose
early faces carry a partial CJK set would explain a per-character split exactly
— and only then to decide between naming a family the way the drawing means it,
narrowing the stack, or probing the way the drawing actually resolves. Reported
2026-09-08; nothing about it is guessed above, and the four-line reduction is
what each claim rests on.

### Low

Neither is wrong and neither blocks anything; both are what a session left when
the thing it was doing was something else.

**The 元 does not leave the engine.** Both witnesses address a 太乙 board as
「第五壬子元 58 局」 — five 元 of seventy-two to a 周紀 — and `TaiyiBoard` hands
over the 紀 and the 局 while computing the 元 and never naming it. What it costs:
a field beside `liuji`, a label pair in both catalogs, a line in the transcript
and on the section, and no register row, since the count it is cut from is
already weighed under the epoch. It moves the second term of the version, an
existing answer gaining a field.

**The Italian catalog still carries ninety-six em dashes.** `docs/i18n.md` says
a vernacular is punctuated in its own conventions and that `—` is English; what
is written today predates the rule, and the sweep is a reading of every line
rather than a substitution, since each dash becomes a comma, a colon, a
semicolon or a parenthesis depending on the turn it was making. Nothing is
asserted by a test until the sweep has run, because a test that fails
ninety-six times on the day it lands tells nobody anything. Shipping nothing,
it moves no term.

**About forty comments still call the register 年計.** The parameter's name is
now 歲計, which is what both witnesses call it, and the identifier stays
`nianji`; the prose around the code kept the name in modern circulation. The
sweep is mechanical and touches no behaviour — and, shipping nothing, moves no
term.

## 7. What is refused and stays refused

Not roadmap, and here only so nobody mistakes silence for an omission: the 用神,
格局, ranking, dating, advice, the 年命 purposes doctrine, who is 主 and who is
客, a day master called strong or weak, a natal Qi Men chart, 太乙's dynastic
readings, what 卷十一 of the 探索錄 reads in the hexagram of a palace, and the
十八飛星 placements grafted onto a 《全書》 board. Each has an
entry in [`docs/refusals.md`](docs/refusals.md) saying who asks for it and why
it is not here — and that file carries more than this list does, several of its
entries being rules about a surface rather than doctrine somebody asks for.
