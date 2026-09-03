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

### What each named one waits on

Most of the table waits on a source and nothing more particular. These clauses
are the query to put to an arriving text.

- **`plate: fei`** — a text flying the **hour** board. Both imperial prints turn
  it and say so; 《金鏡寶鑑》 spends 飛 five times on other things, including the
  flying-palace operation itself on 八宅. The last unread 起例 on this shelf was
  read on 2026-08-31 and turns it too. Not expected to move from the shelf as it
  stands. `plate: fei` and `system` are one errand.
- **`centreLodging: dun`** — a **school** holding 艮, not another copy reading
  it. 《御定奇門寶鑑》 knows both readings, derives the refused one from the
  先天 trigrams in its 卷一 釋虛中合宮, judges it the sounder — and declines it
  on manuscript majority: 「其說於理尤為周備，但本多從前說，故遵之」. 本 is an
  edition, and an edition can only be preferred.
- **`system: rijia · yuejia · nianjia`** — a **lineage holding one reading**.
  Three witnesses state the families entire and disagree; the fullest prints
  three competing day methods and its compiler calls the whole layer 後人附會
  穿鑿. That pairing with `plate: fei` is now stated in a text rather than
  inferred.
- **`leap: runyue`** — attribution. 《金鏡寶鑑》 states the leap-month placement,
  works it twice by date and rejects the solstitial one outright; what it does
  not do is name a lineage. `docs/parameters.md` § "What a school value must
  show" asks for attribution and transcription, and only the second is here.
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

## 6. Small debts in the code

**Low.** Neither is wrong and neither blocks anything; both are what a session
left when the thing it was doing was something else.

**The 元 does not leave the engine.** Both witnesses address a 太乙 board as
「第五壬子元 58 局」 — five 元 of seventy-two to a 周紀 — and `TaiyiBoard` hands
over the 紀 and the 局 while computing the 元 and never naming it. What it costs:
a field beside `liuji`, a label pair in both catalogs, a line in the transcript
and on the section, and no register row, since the count it is cut from is
already weighed under the epoch. It moves the second term of the version, an
existing answer gaining a field.

**About forty comments still call the register 年計.** The parameter's name is
now 歲計, which is what both witnesses call it, and the identifier stays
`nianji`; the prose around the code kept the name in modern circulation. The
sweep is mechanical and touches no behaviour — and, shipping nothing, moves no
term.

## 7. What is refused and stays refused

Not roadmap, and here only so nobody mistakes silence for an omission: the 用神,
格局, ranking, dating, advice, the 年命 purposes doctrine, who is 主 and who is
客, a day master called strong or weak, a natal Qi Men chart, 太乙's dynastic
readings, and the 十八飛星 placements grafted onto a 《全書》 board. Each has an
entry in [`docs/refusals.md`](docs/refusals.md) saying who asks for it and why
it is not here — and that file carries more than this list does, several of its
entries being rules about a surface rather than doctrine somebody asks for.
