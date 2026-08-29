# What is not built yet

Three kinds of open work, open for different reasons, and a fourth list that
is not work at all. **§ "What is actually open" below sorts them by what they
are waiting on**, which is the thing a reader wants first and the sections
themselves are too long to give. The record of how everything else got here is
in [`docs/history/`](docs/history/README.md); what holds today is in
[`docs/`](docs/README.md).

**The open edge of this project was the shelf and is now two things.** The
boards, the almanac layer and the calendrical layer under them are built,
checked and documented, and the section of notes that accounts for them is
written.

Most of what is left is still a **text** — one that adds a quantity, confirms
one already shipped, or contradicts it — and that is an ordinary change with a
stated procedure: `docs/sources.md` § "When a source arrives later" says what
moves and in what order. § 2 is that reading, cut into pieces that can be put
down, and a third language waits on the engine rather than on anything below.

**An audit on 2026-08-28 found divergences the engine was deciding in silence,
and the field they wanted has since been added.** 奇門's input type carries all
five, each with the engine's own answer as its declared default and the other
side refused by name; `docs/history/36-the-five-qimen-owed.md` is the record,
and the API break was paid once rather than five times. So that errand is
closed, and what those values wait on now is what everything in § 1 waits on —
a source, or in one case a shape.

## What is actually open

Three buckets, and they are not the same kind of work. Everything below expands
one of them.

| | | |
|---|---|---|
| **A shape in the engine** | `centreTravel: travel` — the only refused value not short of a witness. Both sides are in Qing print and the 金鏡寶鑑 side checks itself over 120 collated cells; what it asks is that a palace be able to carry two stems and two stars, since a centre that travels arrives somewhere already occupied | § 1 |
| **A source that is not on this shelf** | every other value in the table below. Each is written against in § 1 or `docs/refusals.md`, and none of them is waiting on a file somebody could open today. Two are acquisitions with a named object: a 授時 lodge table that prints 參, and an epoch for 紫氣 | § 1, and phase 4 of § 2 |
| **Two plates nobody has read** | 中國絕學 第一冊, which is handwriting and can only be read by eye, and 第十冊, whose extract is too weak to search. **Neither stands under a value in § 1**, which is why they are last | phase 2 of § 2 |

**Nothing in § 2 is blocking anything.** Phases 1 and 3 are closed, phase 2 has
landed its errand, and phase 4 is read on demand. An unread scan costs nothing
until somebody claims it says something.

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

**One value is the exception and it is worth naming here**, since the sentence
above would otherwise send somebody looking for a text that has already
arrived: `centreTravel: travel` has its witness and wants a shape instead. Its
entry below says what shape.

| Board | Refused today |
|---|---|
| 奇門 | `method: maoshan`, `plate: fei`, `centreLodging: dun`, `system: rijia`, `system: yuejia`, `system: nianjia`, `leap: runyue`, `strengths: star`, `earth: eighteen`, `centreTravel: travel` |
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
whether the lodged stem and star travel. **That movement has landed** —
`docs/history/36-the-five-qimen-owed.md` is the record — and one of the five
came out of it with nothing left to refuse: `spirits` computes all three of its
readings, the two alternatives having turned out to be waiting on the laying
and not on a text. The four below are what is left of it.

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
- 奇門, `centreTravel: travel`. One divergence, not two: a
  board whose centre empties and whose host palace carries a second stem and a
  second star is the same board seen from outside as «天禽 merged with 天芮 and
  the centre starless». `PalaceContents.lodged` had already written the
  divergence down and said this field does not decide it; what is new is
  somebody stating the other side in a worked example rather than an
  implementation choosing it silently. The witness is a transcription of
  unstated provenance and the register weighs it accordingly — but it checks
  itself, which is the second thing the standard accepts. A print is wanted
  before the value is implemented; the parameter can be declared and refused
  before that, and it was declared with the four above it.
  **The print has arrived.** 《奇門遁甲金鏡寶鑑》 — 故宮 第426冊, Qing imperial
  woodblock, opened for a different errand — tabulates all eighteen 局 as a
  起星訣 and a 起門訣, and states the same side as a rule for every hour rather
  than as an assumption in a worked chart: the 直符 star stands at 五 when the
  hour's stem is the centre's, the 直使 gate lands on 五, and 天禽 leaves the
  centre and travels the whole 甲辰壬 decade. 陽遁一局 was read whole and run
  against the engine — all six stars and all six gates agree by name, and all
  twenty palace disagreements are that one fact, one of them carrying a cut
  slip on top of it. **And the other side is in print too**, in the second
  imperial volume: 《御定奇門寶鑑》 lodges the centre's decade out — 「甲辰在中宮，
  寄於坤二」 — so the divergence has a Qing woodblock on each side and this
  engine's behaviour is one of them. `docs/sources.md` has both.

So the field 奇門 owes is not one but three values' worth of divergence, and
that is the argument for paying them in one movement.

**One of the three was verified, the verification weakened it, and a print has
since arrived on the other side.** The corroboration pass asked two classical
transcriptions and got the apparatus
confirmed and the divergence untouched — 《統宗》 gives the centre's decade 天禽 as
符 and 坤's 死門 as 使, 《秘笈大全》 says 「惟天禽則無定位，寄西南而屬中宮」, both
engine positions — and it caught `docs/sources.md` claiming a reference had
agreed about «the nine stars» while also recording that the same reference
leaves the centre starless. The nine was an overstatement of the eight and is
corrected there.

So the palace-5 cases were run properly, against `qimen-dunjia` from the shelf:
666 charts, the ju agreeing on all of them, and **complete agreement on the
earth plate, the heaven plate and the nine stars — including all 147 charts
where a stem sits in the centre.** This engine's convention has a runnable
second, tested where the question arises rather than incidentally.

The value is still owed and can still be declared and refused, and what states
the other side is no longer one transmitted worked example: a Qing imperial
print states it as a table. Both sides are now attested by something that is
not an implementation's preference, which is what a parameter is for.

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
left unextracted is what should be**, being woodblock or handwriting, where the
models return so little that a search against the result is evidence of
nothing. Nothing in § 1 is waiting on an extract that could be made today.

**The numbers are deliberately not written here.** `texts/` is excluded from
the repository, so no test can hold a count of it to anything and a figure in
this file is a figure that drifts — which is what happened: this paragraph said
«forty of the seventy, sixteen extracted» for long enough that all three were
wrong. What the shelf holds is counted by looking at the shelf. As of
2026-08-30 that was 71 files, 39 of them photographic and 19 through OCR, and
the only reason to write it down is to date it.

**An extract is not a reading and the two are counted separately here.** The
OCR pass made something over ten thousand book-pages searchable — the sheet
count is lower, since several of those files carry two book-pages to the sheet.
A handful have since been read, and the register says which. The rest is a way
of finding a page and nothing more.

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
where a 版心 carries the running title and the juan; `full` for when the layout
itself is the question. It crops from the ink bounding box rather than fixed
coordinates, because a facsimile's block wanders on the sheet and on some
volumes alternates sides. Every survey in `docs/history/` phases 30 to 32 was
made of it, and every one in phase 3 below.

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
  What would move it is a text flying the **hour** board, and no file left on
  this shelf is a likely place for one.
- **`centreLodging: dun`** — no longer what nobody states. 《御定奇門寶鑑》
  prints 「陽遁陰遁俱寄坤宮。一本陰遁寄艮」, which names both readings and flags
  the second as a variant copy. An edition can only be preferred, so what would
  move it is a school holding 艮, not another copy reading it.
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

The volumes that carry 紫微斗數 are the first, sixth, seventh and tenth. The
rest of the set is 鐵版神數, 奇門易數, 邵子神數, 皇極天書 and 玄空金口訣 —
arts this project does not compute, read only far enough to say so.

**Ten of the eleven are extracted and the eleventh cannot be.** 第一冊 is
handwriting on squared paper, which no model here reads and which the eye reads
easily, so the one volume of the four carrying 紫微斗數 that is a manuscript is
the one that has to be read by plate. What the other nine cost is in the
shelf's register; what they are worth is **that they can be searched at all**,
which is what a set nobody had opened was missing. Search around 祿, which
those scans lose without collapsing onto anything: 化祿 and 祿存 score zero on
volumes that print them constantly.

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

Every argument above, with its pages, is in `docs/sources.md`.

What is left of this phase is 第一冊, which is the manuscript, and 第十冊, whose
extract is the weak one — 96 dpi to the sheet, 紫微 once in the whole volume —
and which is therefore a plate errand whatever else happens. **Neither is under
a value in § 1**, so neither is urgent.

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

### Phase 4 — the remainder, read behind no citation

《協紀辨方書》卷七~卷八 四庫 woodblock, the third 遁甲演義 scan, 大六壬課經集,
大六壬神課金口訣, 中國古代天文與曆法, and 祖傳年家太乙神數. They are read when
a phase above sends somebody to them, or not at all.

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

## 3. Spanish, once the engine has stopped moving

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

## 4. What is refused and stays refused

Not roadmap, and listed here only so nobody mistakes silence for an omission:
the 用神, 格局, ranking, dating, advice, the 年命 purposes doctrine, who is 主
and who is 客, a day master called strong or weak, a natal Qi Men chart, 太乙's
dynastic readings, and the 十八飛星 placements grafted onto a 《全書》 board.
Each has an entry in [`docs/refusals.md`](docs/refusals.md) saying who asks for
it and why it is not here — and that file carries more than this list does,
since several of its entries are rules about a surface rather than doctrine
somebody asks for.
