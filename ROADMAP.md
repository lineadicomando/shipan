# What is not built yet

One kind of open work; a second section that is a closed record and not a
plan; and a third list that is not work at all. **§ "What is actually open"
below says what the first is waiting on**, which is the thing a reader wants
first and the section itself is too long to give. The record of how everything else got here is in
[`docs/history/`](docs/history/README.md); what holds today is in
[`docs/`](docs/README.md).

**The open edge of this project was the shelf, and on 2026-08-30 the shelf had
been read.** The boards, the almanac layer and the calendrical layer under them
are built, checked and documented; the section of notes that accounts for them
is written; and every photographic file held that day had been opened and said
what it is. § 2 is the record of that reading rather than a plan for it.

**The shelf grew the next day, and that is § 3.** Thirty-seven files arrived on
2026-08-31 out of the archive the older 故宮 and 遁甲集成 volumes came from —
fourteen works this shelf did not have, and three more of works it held in
part — together with a body of passages transcribed out of them and filed by
the question they answer. Twenty-three of the files have been opened by
nobody. What that costs is not a new kind of work — it is the
procedure `docs/sources.md` § "When a source arrives later" already states, run
over more texts than usual and in two directions at once.

What is left is still mostly a **text** — one that adds a quantity, confirms one
already shipped, or contradicts it — and that is an ordinary change with a
stated procedure: `docs/sources.md` § "When a source arrives later" says what
moves and in what order. What has changed is that such a text is now something
to **acquire** and no longer something to open, since nothing here is waiting to
be read. A third language waits on the engine rather than on anything below.

**An audit on 2026-08-28 found divergences the engine was deciding in silence,
and the field they wanted has since been added.** 奇門's input type carries all
five, each with the engine's own answer as its declared default and the other
side refused by name; `docs/history/36-the-five-qimen-owed.md` is the record,
and the API break was paid once rather than five times. So that errand is
closed, and what those values wait on now is what everything in § 1 waits on:
a source. The one that wanted a shape instead has it — see
`docs/history/37-the-pair-and-the-plate.md`.

## What is actually open

One bucket now, and § 1 expands it.

| | | |
|---|---|---|
| **A source that is not on this shelf** | every other value in the table below. Each is written against in § 1 or `docs/refusals.md`. Two are acquisitions with a named object: a 授時 lodge table that prints 參, and an epoch for 紫氣 | § 1 |
| **A file on this shelf that nobody has opened** | twenty-three of them, arrived 2026-08-31. **Whether any stands under a value in § 1 is unknown**, which is the plain difference between this table today and the same table on 2026-08-30: the second bucket was empty then and is not now | § 3 |

**The second bucket had been emptied once and has refilled.** The two plates
nobody had read were read on 2026-08-30: 第一冊 confirms the 庚 line a fourth
time and states nothing this engine did not already carry, and 第十冊 turned
out not to be a 紫微斗數 book at all. Neither stood under a value in § 1 and
neither does now — and that emptying is what the arrival of the next day
undid.

**§ 2 is closed.** All four phases are, and the reading it describes is
finished: every photographic file on the shelf has been opened and said what it
is. What that leaves § 2 as is a record of how the shelf was read and what the
reading cost, which is why it is still here.

**Closed against a shelf, which is a state and not a finish.** Every negative
in it — «no file left on this shelf», «this list is empty» — is a statement
about the files held on 2026-08-30 and about nothing else. A file arriving
reopens the part of it that named that file's class or its text;
`docs/sources.md` § "What an arrival reopens" says which part and how far. So
§ 2 stays as a record *and* as where a re-reading starts, which is why "where
the state is kept" below is still the operative paragraph.

## 1. Parameters that are declared and refused

Every one of these already exists in an input type, is validated, and throws
`OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED` rather than falling back.
That is the whole point: **the API does not break when one lands.**
`docs/parameters.md` argues what each value names and deliberately does not
say which side of this line it is on, because that is the one fact there that
moves; `packages/core/src/parameters.ts` is where it is declared.

Implementing one is a matter of finding a source that meets the standard —
two transmitted witnesses agreeing, or one text that checks itself — not of
writing code. **Another copy of a work already held is not that**, however well
edited: it collates the text and adds no witness to the doctrine, so no value
below is waiting on one. `docs/sources.md` § "What a second copy of one text
buys".

**There was a bucket above this one and it is empty.** `centreTravel`'s second
value was in it: the one refusal that had its witnesses and was held up by a
shape rather than by a text. It is computed, and what the shape turned out to
be is the finding — see `docs/history/37-the-pair-and-the-plate.md`.

| Board | Refused today |
|---|---|
| 奇門 | `method: maoshan`, `plate: fei`, `centreLodging: dun`, `system: rijia`, `system: yuejia`, `system: nianjia`, `leap: runyue`, `strengths: star`, `earth: eighteen` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `xiudu: shoushi`, `ziqi: yinianyisu`, `minggong: ascendant`, `gong: ci` |
| 太乙 | `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: dongzhi`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split`, `huoling: hour`, `daxian: ming` |

`apps/web/test/docs.test.ts` holds this table to the engine, both ways: a
value the engine starts computing and this table still calls refused fails
that suite, and so does a refusal the engine gains and this table does not
name. It is checked for the reason the counts are — a hand-kept list of what
the code does is a list that drifts.

**One parameter carries one value and no second one to refuse.** That is a
different state and not a lesser one: the divergence is declared, the engine
says which reckoning it computes, and what the type does not yet carry is a
*name* for the alternative. Declaring one belongs to the same errand as
implementing it, since a value is declared when the engine is ready to refuse
it by name — which is what 太乙's `ji` did when 卷一 was read.

- 曆注 `shensha` — what 《協紀辨方書》 ratifies, until a named lineage has been.

**Five more are declared and refused on 奇門's input type**, paid in one
movement because a field added late breaks the API, MCP, the CLI and every
shared URL at once: what names the middle pair, where 置閏 repeats its block,
what the five seasonal states are read from, where earth's season begins, and
where the 值符 and the 值使 are read when the count puts them on the centre.
**That movement has landed** — `docs/history/36-the-five-qimen-owed.md` is the
record — and two of the five have since come out of it with nothing left to
refuse: `spirits` computes all three of its readings and `centreTravel` both of
its two, neither having been waiting on a text. The three below are what is
left of it.

- 奇門, `leap: runyue`. 置閏 has meant 《統宗》's placement — the block repeated
  is 芒種 or 大雪. 《奇門遁甲金鏡寶鑑》 卷之一 repeats whichever term the
  year's leap month falls under, works it twice by date — 1678 閏三月 and 1691
  閏七月, both confirmed against this engine's lunar calendar — and rejects the
  solstice placement as a convenience, 「於理法都不是」. Declared **inside**
  置閏, as `yuan` is inside 拆補: under 拆補 nothing is repeated.
- 奇門, `strengths: star`. `strengthOf` reads 旺相休囚死 from the season, which
  is the ordinary 五行 statement. 卷之四 of that work reads the same four from
  the **star** and tabulates all nine that way, swapping 相 with 休 and 囚 with
  死 and leaving only 旺 in common. One text whose table checks its own rule
  rather than the rule, so it waits — and it is reported for every star and
  every gate on every board, which is why it could not wait undeclared.
- 奇門, `earth: eighteen`. `seasonElement` gives the four months that close the
  seasons to earth entire; other schools give earth only their last eighteen
  days. It feeds the states above, so it decides 旺相休囚死 for every cell, and
  the two answers part for two-thirds of each of those four months.
**The fourth of them has landed, and the shape it wanted was smaller than the
shape it was written down as.** `centreTravel` computes both values.
`docs/history/37-the-pair-and-the-plate.md` is the record and
`docs/sources.md` the argument; what is worth carrying here is why this file
had it wrong. The entry used to say the value needed a palace able to hold two
stems and two stars, because the print that states it also *draws* its board
with 天禽 and 天芮 in one cell and the centre empty. That is how 《金鏡寶鑑》
presents a board, and the register had already filed it under the conventions
that work does not share. The doctrine is a clause on the leaf before the
tables — 「行活局，符使不必寄於二，徑排入中宮」 — and it moves the 值符 and the
值使 alone, the same sentence lodging the star in the words 其星寄. So no plate
moves under either value, no field was added, and the two sides differ in one
palace number apiece.

**What the collation had been comparing was a third thing.** The twenty
disagreements were counted against the palace this engine's *star plate*
carries the named star to, and the engine also had a `chief` field answering
the same question its own plates contradicted on 116 charts of 732 sampled.
Reading the clause settled which of the two was the parameter's business. That
correction is in `docs/sources.md`; the register's rung does not move, because
no source arrived.

`method: maoshan` is in the table and is not expected to leave it: there is no
reference against which a 茅山 chart could be falsified. See
`docs/refusals.md`.

`ziqi: yinianyisu` is the one waiting on a single citable fact — an epoch. See
the 紫氣 entry in `docs/refusals.md`. The research behind it is on the local
shelf, in `texts/`, which `.gitignore` excludes — so a clone does not have it,
and nothing here depends on it: what a source establishes is in
`docs/sources.md`, cited by title and never by path. See `docs/README.md`
§ "The sources themselves are not here".

## 2. Reading the scans on the shelf

Rather more than half the PDFs on the shelf are photographic and carry no text
layer, and rather less than half of *those* have been through OCR. **What is
left unextracted is mostly what should be**, being woodblock or handwriting,
where the models return so little that a search against the result is evidence
of nothing — mostly, because a file can change hand partway and 中國絕學 第一冊
did, its typeset eighth having been filed as unreadable along with the rest
until 2026-08-30. `docs/scans.md` carries what that cost. Nothing in § 1 is
waiting on an extract that could be made today.

**The numbers are deliberately not written here.** `texts/` is excluded from
the repository, so no test can hold a count of it to anything and a figure in
this file is a figure that drifts — which is what happened: this paragraph said
«forty of the seventy, sixteen extracted» for long enough that all three were
wrong. What the shelf holds is counted by looking at the shelf. As of
2026-08-30 that was 71 files, 39 of them photographic and 20 through OCR — one
of the twenty partly, that being 第一冊 — and the only reason to write it down
is to date it.

**An extract is not a reading and the two are counted separately here.** The
OCR pass made something over ten thousand book-pages searchable — the sheet
count is lower, since several of those files carry two book-pages to the sheet.
A handful have since been read, and the register says which. The rest is a way
of finding a page and nothing more.

**All four phases are finished, and the last file was opened on 2026-08-30.**
What that means is narrow and worth stating plainly: every photographic file
here has been opened far enough to say what it is, and what each establishes —
including the ones that establish nothing — is written up. It does not mean the
shelf has been *read*: most of these books are hundreds of woodblock pages and
what has been read of them is the sections a question was put to.

**A phase is finished by the register, not by the extract.** An OCR run that
leaves a `.txt` nobody has read moves nothing: a file is not a source until
what it establishes is written up in `docs/sources.md` with its row in
`docs/sources.tsv` saying which rung it stands on. A phase that ends in a
documented negative — the table is there and it is the wrong table, the manual
prints the position and never the rule — **is a finished phase**, and the
negative is only re-checkable while the paper is still on the shelf.

**Where the state is kept, so a phase can be resumed cold.** Not in this
file, which would need maintaining and would drift: `texts/<art>/.txt/` says
what has been extracted, `docs/sources.md` says what has been read, and
`docs/provenance.tsv` says what is held and what it is. Reading those three is
how the next phase finds its starting point. `texts/README.md` holds the
per-file measurements — what a given extract turned out to be worth, which
characters it loses, and which leaf a section was found on — and is the fourth
thing to read before planning around a file.

**Those four drift inside a session and not only between them**, which is what
an audit at the end of one found: a value shipped in the morning left three
sentences behind that still called it unshipped, and a book read at noon was
still «held and not yet read» at four. The check is cheap and mechanical —
sweep the four for the phrases that assert a state («not yet read», «still
missing», «none opened») and read each hit against what the code and the
register now say. Do it before the session ends, not at the start of the next
one.

**How a scan is read is not decided here.** `docs/scans.md` owns it: which of
the two ways in a file takes, what an extract is for, why a search returning
nothing is not a negative, and why what a file *is* — how many juan, what the
pixels are — is settled before a phase is planned around it. Every phase below
assumes that page.

The toolchain the phases below assume: tesseract 5.5.3 with `chi_sim`,
`chi_tra` and the two `_vert` models, `ocrmypdf` 16, `unpaper` 7 and Pillow for
cutting a sheet into its book-pages, and `pdftoppm`, `pdfimages`, `qpdf` and
`gs` for rendering a plate and taking a file apart. All of it was present on
the machine this was last run on, `qpdf` included — it was the one gap and it
has since been filled.

**Three scripts at the top of `texts/` do the extracting**, one for each shape
of sheet: `ocr-1up.sh` takes a language and a psm and goes through poppler,
`ocr-2up.sh` takes two book-pages — `lr` for side by side, `tb` for stacked —
and `ocr-4up.sh` takes four. Each writes a `.nospace.txt` beside the extract,
which is the one to grep.

**A fourth does the surveying, which is what the woodblocks need instead.**
`contact.py` tiles a strip of each of a list of pages into one image, and has
three strips because a survey asks three questions: `top` for the head of the
printed block, where a section heading sits; `margin` for both outer edges,
where a 版心 carries the running title and the juan — **which assumes one
book-page to the sheet**, and returns blank strips where a reprint stacks two;
`full` for when the layout itself is the question. It crops from the ink
bounding box rather than fixed coordinates, because a facsimile's block wanders
on the sheet and on some volumes alternates sides. Every survey in
`docs/history/` phases 30 to 32 was made of it, and every one in phases 2, 3 and
4 below.

### Phase 1 — the dunjia scans, for `plate`, and what `centreLodging` and `system` cost

Eleven files, some three and a half thousand pages. **All eleven are surveyed
and their sections named**, one is extracted, and six works inside them have
been read on the plate. What each turned out to say is in `docs/sources.md` —
this section says only what state the phase is in and what is left.

**The three values this phase exists for, and what each now waits on.**

- **`plate: fei`** — a documented negative wherever it has been asked. Both
  imperial prints lay the *hour* board by turning and say so; 《金鏡寶鑑》 uses
  飛 five times for other things, including the flying-palace operation itself
  spent on 八宅, which is as strong as the negative gets short of a denial.
  What would move it is a text flying the **hour** board. **One place left on
  this shelf is now a likely one**: 遁甲集成 第四冊's 《奇門寶鑑》 六卷 carries a
  遁甲起例 and a 釋虛中 under headings of their own, which the § 3 survey found
  on 2026-08-31 and nobody has read. Its neighbours in that list are not.
- **`centreLodging: dun`** — no longer what nobody states. 《御定奇門寶鑑》
  prints 「陽遁陰遁俱寄坤宮。一本陰遁寄艮」, which names both readings and flags
  the second as a variant copy. An edition can only be preferred, so what would
  move it is a school holding 艮, not another copy reading it. 遁甲集成 第四冊's
  釋虛中 is the one unread section on this shelf headed for the question, and
  whether that volume's 奇門寶鑑 六卷 is this same imperial work — which would
  make it a copy and not a school — is itself unsettled.
- **`system: rijia · yuejia · nianjia`** — three witnesses now state the
  families entire and they do not agree; the fullest of them prints three
  competing day methods and a compiler's note calling the whole layer 後人附會
  穿鑿. What would move it is a lineage holding one reading. `plate: fei` and
  `system` remain one errand, and that pairing is now stated in a text rather
  than inferred.

**What has been read, so «opened» is not confused with «read».** Page numbers
are each volume's own; `texts/README.md` holds the PDF offsets, the block
layouts and the pixel metrics.

| | |
|---|---|
| 《圖解奇門遁甲大全》 | extracted and read for both values; carries neither. Divulgation, so a lead and never a witness — but the place a passage is located before it is read elsewhere |
| 《奇門遁甲金鏡寶鑑》, 故宮 第426冊 | **all four juan of prose read whole** (卷一~二 辯釋口訣, 卷三~四 撮要), the eighteen 局 headings read, 陽遁一局 collated at 120 cells. 卷九~十六 are 斷 material and stay unread |
| 《御定奇門寶鑑》, 故宮 第431冊 | 卷一 and the whole of 卷二's 起例 read. 卷三~卷六 are 斷 material by their headings; the 局 tables from p. 187 are the object 《金鏡寶鑑》 already supplied |
| 《遁甲集成》 第二・三・六冊 | surveyed entire. 第三冊 paid — 符應經's centre, the 年家 tables — and four of its pages are read whole; 第六冊 yielded the 統宗 and 闡秘前編 inside it; 第二冊's 活盤詳注 is *turning*-plate material and never belonged under this parameter |
| 《奇門遁甲統宗》, three editions | 卷一 read for 置閏 and 四十格; every 十干克應 reading checked against 第六冊's copy |
| 第429冊's 奇門遁甲全局 | opened and collated as far as the file allows — about fifteen pixels to a character in its rings, so no wholesale check is possible on it |

**What is unopened, so the next pass starts rather than reconstructs**, largest
first — and none of it is a likely place for what § 1 still wants:

- 第429冊's other three: 奇門遁甲 十卷 (to its p. 128), 奇門遁甲備覽, 奇門遁甲
  捷要. Their neighbour 全局 was read and carries no procedure, which is weak
  evidence about them and not none.
- 《大統皇曆經世》, 三卷, in 第426冊 — calendrical rather than dunjia, named here
  only so the volume's contents are accounted for.
- 《御定奇門寶鑑》 第二冊 is **not held**: it carries twelve of the eighteen 局
  tables and no prose, so nothing above waits on it.

第427冊's 秘笈大全 is a photographic edition of a text held here as a
transcription, so opening it is collation and not discovery; its 金函玉鏡 is
another art under this art's name and is not a place to look.

**So this phase is finished except for acquisitions.** Everything on the shelf
that could bear on its three values has been asked, and each value is now
refused for a written reason rather than for want of a text. The two prints
read this session are the reason § 1 grew instead of shrinking: reading a shelf
finds divergences at least as often as it settles them.


### Phase 2 — 《中國絕學》, for a school's name

Eleven volumes, 方外人, 臺北金林文化 1986, four and a half thousand pages
between them, image-only, twentieth-century school teaching. **Ten of the
volumes sit in `texts/juexue/`; 第五冊 is filed under `texts/ziwei/`** for what
it carries, which is why a page count taken off the one directory comes up a
volume short. **Supporting a refusal is
a first-class outcome of reading it**, not a consolation: the register already
uses volume five's 《十八飛星策天紫微斗數全集》 to make the `daxian: ming`
refusal firmer, and that is the shape the rest of the set is expected to take.
Where it does not refuse, it names — which is how 紫微斗數 `sihua` came by its
second value, since a school manual is where a school's reading lives.

The volumes that carry 紫微斗數 are the first, sixth and seventh. The tenth was
expected to be a fourth and is not: it is 邵子's 易數, which is one of the arts
this project does not compute, along with 鐵版神數, 奇門易數, 皇極天書 and
玄空金口訣 — read only far enough to say so.

**All eleven are extracted now, and the eleventh only in part.** 第一冊 was
filed as a manuscript, and its first 103 printed pages are movable type —
searchable, and now searched — while the remaining 787 are handwriting on
squared paper over a printed 太極 that eats what crosses it. What the other
nine cost is in the shelf's register; what they are worth is **that they can be
searched at all**, which is what a set nobody had opened was missing. Search
around 祿, which these scans lose without collapsing onto anything: it scores
zero in 30 953 characters off 第一冊's typeset eighth, on pages printing 化祿,
祿存 and 官祿宮 throughout, where 忌 scores 237 beside it.

**The errand this phase was opened for landed**, and not as it was aimed. It
was waiting on a lineage carrying its own ten stems; what the set holds is one
cell, moved by two modern schools, and the criterion was corrected rather than
the reading — `sihua: zuofu` is computed. `docs/sources.md` § 紫微斗數 carries
the plates and the pages, and `docs/history/35-a-school-can-be-chosen.md` the
decision.

**第六冊 answered two of the other refusals and neither answer lands.** It
prints `huoling: hour` whole at its p. 406 and `daxian: ming` whole at its
p. 437, each as a procedure and a diagram, so both stop being things nobody
states and become things one modern school manual states — one witness where
the standard asks for two transmitted ones, against a received book that says
otherwise. The `huoling` pair turns out to share every seat and to part only on
whether the hour is counted on, which is a narrower divergence than the
parameter's shape suggested.

**第一冊 argues at 庚, and it argues for the reading that shipped.** It prints
no ten-stem 四化 table — the doctrine is 生年四化 flying into the twelve palaces
— but nine cells over seven stems can be read out of it and every one is
《全書》's, including the two the line at 庚 is disputed over. Two of them are
typeset and therefore quotable: 「命宮庚使天同化忌入官祿沖夫妻（死亡點）」 under
a chart at p. 103, and the 目錄's heading for p. 821, 「庚陽武陰同，癸破巨陰貪，
兩個化科，如何區別?」 — a section that exists only because 庚 and 癸 both put 科
on 太陰. A fourth voice on a line with three readings, and a second school
agreeing rather than a witness, so the rung does not move. It says nothing
about 壬's 科, which is the cell still open.

**And its 目錄 says there is no point asking it three other questions.**
Typeset, complete and in section order across all four works, it carries no
安星 section, no 起大限訣 and no 閏月 rule, because a 斷訣 manual presumes the
board and teaches judgement from it. So `huoling: hour`, `daxian: ming` and
`leapMonth` gain nothing here, and not for want of the volume being read.

**第十冊 is not a 紫微斗數 book.** Recorded as three works, one of them
逍遙子紫微郎秘訣, it is 《邵子易數講義》, 郭懿雲 講演, in eleven chapters and an
附錄 of 元會運世 tables — established on its own typeset 目錄 and on contact
sheets across all 145 leaves. The two occurrences of the name in its weak
extract are a list of arts in a Q&A and a paragraph on where 鐵版神數 came
from. The set's own 目錄, not just the record page, was wrong about a volume.

Every argument above, with its pages, is in `docs/sources.md`. **This phase is
closed.**

### Phase 3 — 紫微斗數全書, 明南陽堂 woodblock

528 pages, one book-page to the page, high-contrast block printing: legible by
eye, hopeless for OCR. `docs/sources.md` calls it the adjudicator between the
transcriptions. This phase is collation, against the copies already held, of
the passages the two transcriptions disagree on. **All of them are answered,
and the phase is closed.**

The 四化 verse is at 卷之三 leaf 151. Nine of its ten lines are the table this
engine ships, character for character; 壬 gives 科 to 天府, confirming the
shipped reading against two modern schools; and 庚 prints a **third** form,
庚日武同相為者 — 科 天同, 忌 天相 — where the two transcriptions read 陰同 and
同陰. Nothing moved: three readings each with something behind them is a
divergence, and the shipped one is the only one two voices agree on. See
`docs/sources.md`.

**It is cheaper to work than the estimate feared**, and that is the finding to
carry into what is left: this book meets all three of the conditions
`docs/scans.md` now names for reaching a section without sweeping, so a line is
located by margin and heading. Leaf 151 was found in four passes.

The same leaf carries 安火鈴二星訣, and leaf 160 carries 安身主. The first is a
heading and four half-lines of seats with **no clause counting on by the hour**,
which is what the shipped default rests on, and it reads 寅午戌人**丑**卯方 —
closing the variant the second edition opened. The second prints the same
defective line both transcriptions do, 子午人火鈴星 in a slot every other line
fills with one star, so the adjudicator cannot settle it; it does correct the
graph to 鈴.

**The last three were asked on 2026-08-29 and the list is now empty.** 解神 is
at leaf 157 and reads 「解神從戌上起子逆數至當生年太歲上是也」, the shipped line
character for character — and its section places 天德 and 月德 off the 流年
three lines above, so the block distinguishes the two years rather than leaving
a reader to. The two grid cells are printed whole among the five 紫微 grids at
leaves 167–171, and all 150 cells collate against the engine's table, which
retires the arithmetic that had been standing in for a page. The 大限's
starting age is a **documented negative**: 安大限訣 at leaf 158 is two lines
long, gives the palace the run opens in and stops — so the age is still carried
only by the bureau verses' opening words, which this block is the first witness
to print as a complete series (二歲行 · 三歲遊 · 四歲花 · 五歲居 · 六歲奇, where
both transcriptions break it at 土五). Every argument is in `docs/sources.md`.

**So this phase is finished, and what it cost is the finding to keep.** All
three questions were located off a single 目錄 leaf, bracketed with three
contact sheets, and read on seven plates. That is the second time this book has
been reached that way and the third time the three conditions `docs/scans.md`
names have paid, and it is why the estimate that opened this phase — 528 pages
of woodblock to adjudicate eight lines — was wrong by an order of magnitude in
the cheap direction.

### Phase 4 — the remainder, and what it turned out to hold

**This list is empty.** It held six files read behind no citation; all six
have now been opened, and what each turned out to be is below. The rule it was
written for stands — an unread scan costs nothing until somebody claims it says
something — and the shelf simply no longer has one that nobody has looked at.

**Two of them stopped belonging here, which is what this list is for.**

《大六壬指南》 is a 1990 typesetting in simplified characters and not the
woodblock facsimile it was filed as, it stacks its two book-pages rather than
setting them side by side, and **it opens on another work**: 《大六壬心印賦》
with 陳良謨公獻's 增注, which is one of the two witnesses `docs/sources.md`
counts for the 月將 turning at the 中氣. That witness had been cited from
elsewhere as a phrase; here it is a complete procedure, twelve months with
their 中氣, their 次, their palace and their general's name. It is extracted —
55 344 characters, 三傳 47, 貴人 33 — and confirming a shipped default is all
it does, which is a finished outcome and not a lesser one.

《授時曆故》 carries the whole 授時 黃道宿次 in its 卷二 with the epoch the
`xiudu: shoushi` refusal had been waiting on, 至元辛巳, and **the table checks
itself**: each quadrant sum closes on its own seven entries, and the four close
on 365.2575, the 曆's own 周天分. Twenty-seven of the twenty-eight lodges are
read off the plate. What stands between it and the value is two things and
neither is research:

- **參 is not printed.** The western group carries six lodges where its own sum
  counts seven, and the missing 10.28 can be had by subtraction, which is a
  derivation and not a witness. The other copy this shelf holds cannot supply
  it: 《曆法通志》's comparative table has no 授時 column, only a 紀元 one
  standing in for it under an identification 授時曆故 undercuts. **So this
  wants a copy of the 授時 table that is not here** — an acquisition, not a
  reading.
- **The option would have to carry an epoch as well as a table**, because the
  source makes its own numbers a function of the 歲差 at a chosen moment —
  「各得當時宿度」. That is a decision about the parameter's shape and the only
  part of this that touches code.

The argument for both is in `docs/sources.md`, in the frame section.

**And two more have been asked and answered nothing, which is the other way off
this list and the commoner one.**

大六壬課經集 was asked for the 晝夜 division — `zhouye`'s open question, and the
one place a second witness would take a shipped quantity from rung 5 to rung 2.
It is 《大六壬課經集》, 郭御青 彙輯, 五雲齋藏板, four juan over 254 woodblock
pages: 卷一 the 畢法賦 in a hundred numbered rules, 卷二 a catalogue of 課格,
卷三 the same, 卷四 the 物類. It uses 晝貴 and 夜貴 on every other leaf and
defines neither, because **it is a book of judgement and presumes the board** —
the shape 中國絕學 第一冊 also turned out to have, and the shape most of what is
left unread here has. A refusal that wants a *procedure* will not be answered by
this class of book, and that is worth knowing before the next one is opened.

中國古代天文與曆法 was asked for the 授時 黃道宿次 table and the 參 it is short
of. It is a 155-page popular survey in the 中國讀本 series, seventeen chapters,
58 千字 by its own colophon, arguing 距度 and 歲差 in prose and printing no lodge
table of any kind. The acquisition § 1 names stays an acquisition.

**And a third turned out to hold something, which is a boundary and not a
source.** 《協紀辨方書》卷七~卷八 was opened against `shensha`, the one
parameter carrying a value and no second one to refuse. It is 義例五 and
義例六 — the last two juan of the source's own 義例 — and the 曆注 layer reads
one section of the first and none of the second. 卷七 beyond the 十二神 is
mostly *hours*, which the parameter's words already exclude; 卷八 is
twenty-four bearings and no days, and the first of them, 歲祿, is stated
exactly the way the twenty-six the engine does carry are stated. So the layer's
boundary is 卷三 and 卷七 rather than «what the 協紀 ratifies», the parameter now
says so in its own words, and what would carry 卷八 is entering twenty-four
tables and their tests — work, not a text, and owed to no refusal.
`docs/sources.md` § 義例五 and 義例六 is the argument.

**The last three were opened on 2026-08-30 and none of them is a source.**

《祖傳年家太乙神數》 is not the manuscript it was filed as: it is
《祖傳年家太乙神數教材》, a teaching handout printed by 高俊波 off an
「阴阳先生祖传手抄本」, thirty numbered pages in simplified characters, naming no
text and no lineage. It cannot be the second witness 大將 and 參將 want, and
they stay at rung 5. **What it is good for is one piece of arithmetic**: its
積年 differs from 《太乙金鏡式經》's by 8 217 360, an exact multiple of both 360
and 24, so its worked 2044 board — 「則太乙就在乾宮為1」 — is `compute_taiyi`'s
乾 1 · 1/3 exactly. A different 上元 is not a different board. Where it parts is
the counting, and it parts as a different school: 主算 32 and 客算 32 for 2010
against 35 and 34, with a vocabulary the 金鏡 does not use.

《官板大六壬神課金口訣》 is the boundary marker the shelf holds it as, and now
the boundary can be shown instead of asserted. Its 入式訣歌 reads 「入式之法妙通
玄，月將加時方上傳。更看何神同一位，日干須用五子元」 — the 月將 on the hour is
shared with 六壬 and everything after it is not: the reading is taken off the
**方**, the direction, and completed by a 人元 遁 from the day stem, giving
四位 and not 四課三傳.

The third 遁甲演義 scan is the 《四庫全書珍本初集》 reprint of the 四庫 recension,
卷一 alone — a copy and not a witness, as the register already said. It does the
one thing a copy can: its 年家 leaf reads 一 · 四 · 七 at 600 dpi with each
numeral cropped, so the 四 that the 遁甲集成 divergence turns on is now read on
two plates and one transcription.

## 3. The sources that arrived, and the two readings they owe

Thirty-seven files reached the shelf on 2026-08-31 out of the same archive of
術數 texts the 故宮珍本叢刊 and 遁甲集成 volumes came from: fourteen works this
shelf did not have, and three more files of works it held in part. With them
came a body of passages already transcribed out of them and filed by the
question each answers — somebody else's work, at a declared reliability, and a
finding aid rather than a register. `docs/notes.md` § "The corpus, which
is not the register" is that boundary, and `texts/README.md` says what is where.

**This is one errand in two movements, and the order matters.** The first puts
the arrivals to questions this project has already asked and answered; the
second asks what the new texts say on their own account. Doing the second first
would be reading four hundred pages without knowing which page was wanted.

### The first movement — what the arrival reopens

`docs/sources.md` § "What an arrival reopens" is the rule and it is bounded: an
arrival is put to the questions already standing, and the negatives already
closed are put back to the arrival. Not a re-reading of everything.

**Three negatives in the register have already been reopened and none has been
answered.** Each carries the date it was last checked and says plainly that the
volume is on the shelf and unread for it:

- **太乙's 卷一 constants**, which `yueji`, `riji` and `shiji` are refused for
  want of. 《太乙數統宗大全》 (故宮珍本叢刊 第420冊, 440 pages) is the first 太乙
  witness here besides the 金鏡式經. Whether it carries them is the question.
- **太乙's 月計 · 日計 · 時計**, where 卷一's 日計 arithmetic is damaged in the
  edition held. The same volume would answer both halves — a second count and a
  second reading of the 闕.
- **The five phases of the 十二天將**, which the drawing leaves in neutral ink
  because no source is registered. 故宮珍本叢刊 第417冊 and 第419冊 bring four
  六壬 volumes and none has been read for it.

**And there is a list of where else a rung could move.** `texts/crosswalk.tsv`
joins the corpus to `docs/sources.tsv`; `texts/shelf.py crosswalk --moves`
prints the quantities standing at rung 4, 5 or — whose rule has gained a
witness among the arrivals, and `--gaps` the registered quantities no
transcribed passage reaches at all. Neither is a finding. **A witness located
is not a witness weighed**, and what moves a rung is the argument written into
`docs/sources.md` and the row added beside it.

**The instrument that asks a text to contradict the engine is
`texts/bench/`**, which runs the 147 worked examples the sources print for
themselves. Two disagree today, both 六壬 and both on rules the corpus marks
divergent: a 涉害 whose 三傳 come out differently, and a 返吟 whose four courses
are displaced in a way that points at the 日干寄宮. **Each is a question and
neither is a verdict** — settling one means reading the passage its citation
names, and the passage is on the shelf. A hundred and twenty-four of the
examples have no adapter yet; `bench/run.mjs --uncovered` prints the shapes
still waiting, commonest first, and each line is one adapter's worth of work.

### The second movement — what the new texts say

Eleven of the twenty-four works are cited without a passage transcribed out of
them. The procedure is § 2's: say what a file *is* — how many juan, what the
pixels are, which of the two ways in it takes — before planning anything around
it. `docs/scans.md` is unchanged and still the rule.

**The survey was run on 2026-08-31 and the ten files nobody had opened now have
their measurements**, in `texts/README.md` where per-file measurements live:
《御定奇門真詮》 (故宮 第430冊), 《御定六壬直指》 with its 析義 (第417冊), the
three 六壬 works of 第419冊, 遁甲集成 第一 · 第四 · 第五冊, the 四庫全書 volume
of the 命書 group (vol. 809) and 《中國恆星觀測史》. Surveying is not reading and
none of them is a source yet; what it bought is that the reading can now be
planned instead of reconstructed. Four things it settled are worth carrying
here, because each changes what is worth opening next:

- **《御定奇門真詮》 carries no rule at all.** Its 新編目錄 is its whole contents
  list and names the eighteen 局 and nothing else, thirty pages each: 1080 hour
  boards, no 起例, no prose juan. So the largest unopened dunjia file on the
  shelf cannot move `plate: fei`, `centreLodging` or `system`, and it is ruled
  out by its own contents leaf rather than by a sweep of it. It is a collation
  object instead — and only off the prose,
  since at 982 × 1452 in one bit its plates give a ring character twelve to
  fifteen pixels, as 第429冊's 全局 does.
- **遁甲集成 第四冊 has a 起例, which is what § 1 wants.** 《奇門寶鑑》 六卷,
  series pp. 1627–2329, and its 目錄 names 遁甲起例, 三奇趨神接氣秘訣 and 釋虛中
  — the 中宮, the 符頭 and the 超神接氣 each under a heading of their own. That
  is the shape that has paid before. Whether its 六卷 奇門寶鑑 is 故宮 第431冊's
  《御定奇門寶鑑》 六卷 is unsettled, and it decides whether reading it is a
  collation or a second witness.
- **《星學大成》 is in SKQS vol. 809**, from the volume's p. 285 to its end, read
  off the 本册目次 on the plate as this section said it would have to be. The
  volume is 4185 × 5976 to the page, so it is the cheapest plate here to read.
- **遁甲集成 第一冊 carries the typeset 總目錄 of all six volumes**, and it
  places 《遁甲符應經》 三卷 in 第一冊 at series p. 385, where this shelf reads it
  in 第三冊 at p. 1136. 第一冊's leaves are not in doubt — the 四庫未收書提要,
  宋仁宗's 御製序 and the work's own 目錄 are all there. `docs/sources.md` leans
  on the 第三冊 attribution for `寄宮`'s 洛書 clause and already carried that
  volume open for want of a running title. **The survey opened this and did not
  close it**; closing it is a collation and the 目錄 says where to look.

Two standing negatives also gained a place to look rather than an answer.
《六壬經緯》 is complete in six juan and one of them is 神煞 — the best-placed
section here for the five phases of the 十二天將 — and 《中國恆星觀測史》's
第七章第一節二 at its p. 272 is 至元年間的二十八宿觀測, which is the 授時 epoch
the `xiudu` refusal wants. **A witness located is not a witness weighed**, and
neither has been read.

### What this movement may not do

**A transcription is not a plate.** Of the passages that arrived, most were read
on the facsimile character by character and a minority were not: twenty-two are
the archive's own digital text, which nobody has read against an image. Nothing
at that mark may close a question or establish a negative — `docs/scans.md` §
"A search returning nothing is not a negative" is unchanged, and it was written
for exactly this. The reliability mark travels with every passage and
`texts/rules/README.md` says what each one means.

**A divergence in the corpus is not a parameter.** The corpus flags a rule
where two readings were found, which is a fact about texts;
`docs/parameters.md` asks for a divergence *between practitioners*, with
attribution and transcription, and its criterion is unchanged. Between them lie
the species a flag cannot tell apart, and § 1 is where a value earns its name.

### Where the state is kept

On the shelf, because that is where the paper is: `texts/works/` for what each
volume is and where its files sit, `texts/rules/` for what the passages answer,
`texts/crosswalk.tsv` for the join to the register, `texts/manifest.json` for
the coverage computed rather than written. **None of it is versioned**, and
nothing in `docs/` leans on it. What this section owes the repository is the
ordinary thing a source owes: the argument in `docs/sources.md`, the row in
`docs/sources.tsv`, the rung that may fall as well as rise, and the date the
entry was last checked.

## 4. Spanish, once the engine has stopped moving

The interface is read in a vernacular and there are two of them, which is a
state and not a design — `docs/i18n.md` § "Who is reading" is where that is
argued. **Spanish is the third**, and it is deliberately not third *yet*: the
catalogs still gain a family of messages with every board, and a language
added now would be a language re-translated at each of them, by somebody who
has to follow the argument rather than look a word up.

So the condition is the engine's and not the catalogs': when the boards have
stopped arriving and the section of notes is written, the whole message set is
translated once. Nothing has to be prepared for it — `LOCALES` is a list,
`Record<MessageKey, string>` makes a missing key a compile error, and the
locale is negotiated the same way on all four surfaces. What has to be
*watched* is the ratio the notes section is built around: what is derived from
the engine costs a third language nothing, and what is written costs it a
paragraph. A page that grows written prose is a page that grows the price of
this.

The one thing that would change the design rather than the catalogs is a
language needing plural rules, gender agreement or message syntax — see
`docs/i18n.md` § "The catalog". Spanish needs none of the three.

## 5. What is refused and stays refused

Not roadmap, and listed here only so nobody mistakes silence for an omission:
the 用神, 格局, ranking, dating, advice, the 年命 purposes doctrine, who is 主
and who is 客, a day master called strong or weak, a natal Qi Men chart, 太乙's
dynastic readings, and the 十八飛星 placements grafted onto a 《全書》 board.
Each has an entry in [`docs/refusals.md`](docs/refusals.md) saying who asks for
it and why it is not here — and that file carries more than this list does,
since several of its entries are rules about a surface rather than doctrine
somebody asks for.
