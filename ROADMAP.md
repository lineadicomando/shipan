# What is not built yet

Three sections of open work — the paper to read, the parameters waiting on a
source, the arrivals not yet weighed — then a language that waits on the
engine, then a list that is not work at all. **§ "What is actually open" says
what all of it reduces to**, which is the thing a reader wants first. What
holds today is in [`docs/`](docs/README.md); how it got here is in
[`docs/history/`](docs/history/README.md).

**The open edge of this project is the shelf.** The boards, the almanac layer
and the calendrical layer under them are built, checked and documented, and the
section of notes that accounts for them is written; what is unfinished is the
paper. Every photographic file held on 2026-08-30 has been opened far enough to
say what it is, and **almost none of it has been read** — which is the
distinction § 2 is built on and the reason that section is a task and not a
record. The four phases that did the opening closed and are in
`docs/history/38-reading-the-scans-on-the-shelf.md`.

**The shelf grew on 2026-08-31, and that is § 3.** Thirty-seven files arrived
out of the archive the older 故宮 and 遁甲集成 volumes came from — fourteen works
this shelf did not have, and three more of works it held in part — together
with a body of passages transcribed out of them and filed by the question they
answer. Ten of the files were surveyed that day and most were not. What that
costs is not a new kind of work: it is the procedure `docs/sources.md`
§ "When a source arrives later" already states, run over more texts than usual
and in two directions at once.

**What moves a refusal is still a text**, one that adds a quantity, confirms
one already shipped or contradicts it, and that is an ordinary change with a
stated procedure. What has changed since 2026-08-30 is that such a text is
again something to *read* and not only something to acquire. A third language
waits on the engine rather than on anything below.

## What is actually open

Three buckets, and the sections below expand them.

| | | |
|---|---|---|
| **A section on this shelf that nobody has read** | the shortest way to move something, and the only bucket with named objects in it. Seven of them, each a section of a surveyed file and not a book | § 2 |
| **A file on this shelf that nobody has measured** | most of the 2026-08-31 arrivals, the largest being 故宮 第420冊 at 440 pages — which two 太乙 refusals wait on. **Whether any stands under a value in § 1 is unknown**, and a survey is what makes that answerable | § 2, § 3 |
| **A source that is not on this shelf** | every value in § 1's table that the first two buckets do not reach. Two are acquisitions with a named object: a 授時 lodge table that prints 參, and an epoch for 紫氣 | § 1 |

**The first bucket is new and it is the change worth seeing.** Until
2026-08-31 the open edge was «a file nobody has opened», which is not work a
plan can be made of — a file might hold anything. A survey converts it into
«a section nobody has read», which can be scheduled, ordered by what it would
move, and finished. That conversion is what § 2's table is.

**The phases that opened the shelf are closed and have left the roadmap.** All
four of them finished by 2026-08-30, and the record of what they read and what
it cost is `docs/history/38-reading-the-scans-on-the-shelf.md`. What replaced
them in § 2 is the task they made possible: reading the sections a question has
been put to.

**They closed against a shelf, which is a state and not a finish.** Every
negative in that record — «no file left on this shelf», «this list is empty» —
is a statement about the files held on 2026-08-30 and about nothing else. A
file arriving reopens the part of it that named that file's class or its text;
`docs/sources.md` § "What an arrival reopens" says which part and how far. Which
is why «where the state is kept» in § 2 is still the operative paragraph and
the history file is not.

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

### What the named ones wait on

Most of the table waits on a source and nothing more particular than that.
Four rows have an object with a name, and those are worth stating so that a
file arriving can be put to them.

**Three dunjia values, and what each now waits on.**

- **`plate: fei`** — a documented negative wherever it has been asked. Both
  imperial prints lay the *hour* board by turning and say so; 《金鏡寶鑑》 uses
  飛 five times for other things, including the flying-palace operation itself
  spent on 八宅, which is as strong as the negative gets short of a denial.
  What would move it is a text flying the **hour** board. **One place left on
  this shelf is now a likely one**: 遁甲集成 第四冊's 《奇門寶鑑》 六卷 carries a
  遁甲起例 and a 釋虛中 under headings of their own, found by the survey of
  2026-08-31 and read by nobody. It is the first line of § 2's table.
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

**`xiudu: shoushi` waits on one lodge and a decision about the parameter.**

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

## 2. Reading what the shelf holds

**Everything photographic here has been opened far enough to say what it is,
and almost none of it has been read.** The two are different work and the
distinction is the whole of this section: a survey says how many juan a file
has, what its pixels are and which of the two ways in it takes, and it settles
nothing at all about doctrine. **How the shelf came to be opened is not a plan
and is no longer here** — the four phases that did it closed on 2026-08-30 and
are in
[`docs/history/38-reading-the-scans-on-the-shelf.md`](docs/history/38-reading-the-scans-on-the-shelf.md),
with the negatives they established still standing against the files held that
day. `docs/scans.md` owns the method and the toolchain.

**A reading is finished by the register, not by the extract.** An OCR run that
leaves a `.txt` nobody has read moves nothing: a file is not a source until
what it establishes is written up in `docs/sources.md` with its row in
`docs/sources.tsv` saying which rung it stands on. A reading that ends in a
documented negative — the table is there and it is the wrong table, the manual
prints the position and never the rule — **is a finished reading**, and the
negative is only re-checkable while the paper is still on the shelf.

### The task — read the sections a question has been put to

**Nothing below is a sweep of a book.** Every item is a named section of a
surveyed file, reached by the arithmetic its row in `texts/README.md` records,
and each is owed the ordinary thing: the argument in `docs/sources.md`, the row
in `docs/sources.tsv`, the rung that may fall as well as rise, and the date the
entry shows. Ordered by what a reading would move, not by size.

| | what would move | where |
|---|---|---|
| 遁甲集成 第四冊, 《奇門寶鑑》 六卷 | `plate: fei`, `centreLodging: dun` — the only unread 起例 on this shelf | 遁甲起例, 釋虛中, 釋符頭, 三奇趨神接氣秘訣, at series pp. 1627–2329 |
| 遁甲集成 第一冊, 《遁甲符應經》 三卷 | closes the volume attribution the register carries open, and 二遁直符合於中宮 is a second reading of the centre | series pp. 385–490; 目錄 at 389–393 |
| 《六壬經緯》's 神煞 juan | the five phases of the 十二天將, which the drawing leaves in neutral ink for want of a source | series pp. 1–92, one juan of six |
| 《太乙數統宗大全》, 故宮 第420冊 | 太乙's 卷一 constants, and the 月計 · 日計 · 時計 whose arithmetic is damaged in the edition held | **440 pages and no survey yet** — this one is measured before it is planned around |
| 《中國恆星觀測史》 第七章第一節二 | the 授時 lodge values, if a modern reconstruction can stand where the 曆's own table would | printed p. 272 |
| 《御定六壬直指》 卷上 起例 | 起貴人定十二天將法 and 十二月將名號, a second place for the 天將 question | series pp. 5–33 |
| SKQS vol. 809, 《星學大成》 | what 七政四餘's neighbours have wanted; unweighed until read | volume pp. 285 to the end |

**《御定奇門真詮》 is on no line above and that is the survey's answer**, not an
omission: 545 pages of it are 1080 hour boards with no 起例 in them. What it
could be is a bench of worked examples, and `texts/bench/` is where that would
go rather than the register.

**The count of what is unsurveyed is not written here**, for the reason no
count of `texts/` is: it drifts and no test can hold it. As of 2026-08-31 ten
of the 2026-08-31 arrivals had been surveyed and most had not, the largest
unmeasured being 第420冊 above. `texts/README.md` says which is which, one row
to a file.

**Where the state is kept, so the work can be resumed cold.** Not in this
file, which would need maintaining and would drift: `texts/<art>/.txt/` says
what has been extracted, `docs/sources.md` says what has been read, and
`docs/provenance.tsv` says what is held and what it is. Reading those three is
how the next session finds its starting point. `texts/README.md` holds the
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
them. The procedure is `docs/scans.md`'s: say what a file *is* — how many juan, what the
pixels are, which of the two ways in it takes — before planning anything around
it. `docs/scans.md` is unchanged and still the rule.

**The survey was run on 2026-08-31**, over the ten arrivals that had no
measurement: 《御定奇門真詮》 (故宮 第430冊), 《御定六壬直指》 with its 析義
(第417冊), the three 六壬 works of 第419冊, 遁甲集成 第一 · 第四 · 第五冊, the
四庫全書 volume of the 命書 group (vol. 809) and 《中國恆星觀測史》. Their
measurements are in `texts/README.md` and the reading it made schedulable is
§ 2's table. What the survey *settled* is here, because each of these is a
reason a line in that table exists or does not:

- **《御定奇門真詮》 carries no rule at all.** Its 新編目錄 is its whole contents
  list and names the eighteen 局 and nothing else, thirty pages each: 1080 hour
  boards, no 起例, no prose juan. The largest unopened dunjia file on the shelf
  is ruled out by its own contents leaf rather than by a sweep of it.
- **遁甲集成 第四冊 has a 起例**, which is what § 1 wants and what the shelf had
  no unread instance of. Whether its 《奇門寶鑑》 六卷 is 故宮 第431冊's
  《御定奇門寶鑑》 六卷 is unsettled, and it decides whether reading it is a
  collation or a second witness.
- **《星學大成》 is in SKQS vol. 809**, from the volume's p. 285 to its end, read
  off the 本册目次 on the plate as this section said it would have to be.
- **遁甲集成 第一冊 carries the typeset 總目錄 of all six volumes**, and it
  places 《遁甲符應經》 三卷 in 第一冊 at series p. 385, where this shelf reads it
  in 第三冊 at p. 1136. **Two records say so and not one**: the archive of
  provenance names the same two files 第一冊 …`DunJiaFuYingJing` and 第三冊
  `QiMenDunJia`, which `texts/works/` had held all along under both names. And
  第一冊's leaves are not in doubt — the 四庫未收書提要, 宋仁宗's 御製序 and the
  work's own 目錄 are all there. The 總目錄 itself is a good witness to where a
  work starts and a poor one to what it is called: its page numbers check
  against the transcribed corpus's own facsimile citations exactly, and it
  misreads a title two lines above 符應經. The corpus is silent on the question,
  having transcribed nothing from 第三冊. `docs/sources.md` leans on the 第三冊
  attribution for `寄宮`'s 洛書 clause and already carried that volume open for
  want of a running title. **The survey opened this and did not close it**;
  closing it is a collation and the 目錄 says where to look.

**A survey answers a question nobody had asked of the file and raises the ones
worth asking**, which is the shape all four have: none of them moved a rung and
every one of them changed what is worth opening next.

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

### Where the corpus keeps its state

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
