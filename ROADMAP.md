# What is not built yet

Three kinds of open work, open for different reasons, and a fourth list that
is not work at all. The record of how everything else got here is in
[`docs/history/`](docs/history/README.md); what holds today is in
[`docs/`](docs/README.md).

**The open edge of this project is the shelf, not the code.** The boards, the
almanac layer and the calendrical layer under them are built, checked and
documented, and the section of notes that accounts for them is written. What
is left below is a list of values waiting on a source and a third language
waiting for the engine to stop moving. Neither is blocked on architecture.
What will change this engine from here is a **text** — one that adds a
quantity, confirms one already shipped, or contradicts it — and that is an
ordinary change with a stated procedure: `docs/sources.md`
§ "When a source arrives later" says what moves and in what order. Reading the
shelf is therefore the work, and writing code is what happens afterwards. § 2
is that reading, cut into pieces that can be put down.

## 1. Parameters that are declared and refused

Every one of these already exists in an input type, is validated, and throws
`OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED` rather than falling back.
That is the whole point: **the API does not break when one lands.**
`docs/parameters.md` argues what each value names and deliberately does not
say which side of this line it is on, because that is the one fact there that
moves; `packages/core/src/parameters.ts` is where it is declared.

Implementing one is a matter of finding a source that meets the standard —
two transmitted witnesses agreeing, or one text that checks itself — not of
writing code.

| Board | Refused today |
|---|---|
| 奇門 | `method: maoshan`, `plate: fei`, `centreLodging: dun`, `system: rijia`, `system: yuejia`, `system: nianjia` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `xiudu: shoushi`, `ziqi: yinianyisu`, `minggong: ascendant`, `gong: ci` |
| 太乙 | `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: dongzhi`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split`, `huoling: hour`, `daxian: ming` |

`apps/web/test/docs.test.ts` holds this table to the engine, both ways: a
value the engine starts computing and this table still calls refused fails
that suite, and so does a refusal the engine gains and this table does not
name. It is checked for the reason the counts are — a hand-kept list of what
the code does is a list that drifts.

**Two parameters carry one value and no second one to refuse.** That is a
different state and not a lesser one: the divergence is declared, the engine
says which reckoning it computes, and what the type does not yet carry is a
*name* for the alternative. Declaring one belongs to the same errand as
implementing it, since a value is declared when the engine is ready to refuse
it by name — which is what 太乙's `ji` did when 卷一 was read.

- 紫微斗數 `sihua` — 《紫微斗數全書》's own table, until a lineage has been read.
- 曆注 `shensha` — what 《協紀辨方書》 ratifies, until a named lineage has been.

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

Forty of the seventy PDFs in `texts/` are photographic and carry no text
layer, and most of them have never been turned into an extract — on the order
of ten thousand unread pages. Several of the values
in § 1 are waiting on some of them, and nothing else about this section is
urgent — an unread scan costs nothing until somebody claims it says something.

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
how the next phase finds its starting point.

**How a scan is read is not decided here.** `docs/scans.md` owns it: which of
the two ways in a file takes, what an extract is for, why a search returning
nothing is not a negative, and why what a file *is* — how many juan, what the
pixels are — is settled before a phase is planned around it. Every phase below
assumes that page.

The toolchain the phases below assume: tesseract 5.5.3 with `chi_sim`,
`chi_tra` and the two `_vert` models, `ocrmypdf` 16, `unpaper` 7 and Pillow for
cutting a sheet into its book-pages, and `pdftoppm`, `pdfimages`, `qpdf` and
`gs` for rendering a plate and taking a file apart.

### Phase 1 — the dunjia scans, for `plate`, `centreLodging` and `system`

The largest block and the least prepared — eleven files, some three and a half
thousand pages. **The extent pass is done and it changed the block**: 御定奇門
寶鑑 is one 冊 of eight, the third 遁甲演義 is 卷一 alone, and the three 故宮
volumes carry a 新編目錄 on their last leaves, which is how to survey them
cheaply.

**And it answered the `system` question on the way.** 《遁甲演義》卷一 states
年家, 月家 and 日家 entire — see `docs/sources.md` § 年命 — so what those three
values wait on is a second witness and no longer a text. It also showed that
they cannot move alone: those boards are flown where the 時家 is turned, so
`plate: fei` and `system` are one errand.

What is left of this phase is 飛盤 proper and `centreLodging`. **The searchable
face of it exists and the rest is plates**, which is a shorter list than the
one this section used to carry and a slower one:

1. 《圖解奇門遁甲大全》 — 598 pages, extracted and **read for both values**,
   which is what makes it a finished piece rather than a download: it carries
   neither. It names the 轉盤/飛盤 division in a classification and prints no
   procedure, and it states the centre's lodging as 坤二 with no condition on
   it, applying that inside 陰遁 in a passage it quotes. Both negatives are
   written up in `docs/sources.md`, which is where a phase is finished.
   Divulgation, so a lead and never a witness, and still the place a passage
   is located before it is read anywhere else — 值符 802 times, 值使 316,
   超神 37, 接氣 23. Search 通 for 遁, which the extract loses entire, and
   read 飛宮 twice: twenty-eight of its thirty-one hits are 天乙飛宮格.
2. 《遁甲集成》 第二・三・六冊 — **block-printed facsimile and not the modern
   typesetting this section claimed**, which is what opening them settled: the
   廣陵古籍刻印社 series photographs its originals, and only stretches of 第二冊
   are movable type. Read by plate. 第二冊 carries 煙波釣叟歌直辨, the Qing
   commentary on the verse the 十干克應 table is pinned to, and 十八活盤詳注,
   which is the moving-plate ground `plate: fei` stands on.
3. 《御定奇門寶鑑》 and 《奇門遁甲統宗》 — clean Qing printing, read by plate.
4. The three 故宮珍本叢刊 volumes — colour, but about 1000×1500 pixels to the
   book-page, which is the low end for dense block printing. Read by plate,
   for confirmation of a passage already located elsewhere rather than for
   searching.

**What the extent pass covered, so the next one does not repeat it**: page
counts and pixel metrics for all eleven, the closing leaf of ten — 圖解 is a
modern book and has none — and 卷一 of the 四庫 遁甲演義. The sections of the
nine unopened files have not been surveyed; the three 故宮 volumes' 新編目錄
is where that starts.

### Phase 2 — 《中國絕學》, for a school's name

Eleven volumes, 方外人, 臺北金林文化 1986, about four thousand one hundred
pages, image-only, twentieth-century school teaching. **Supporting a refusal is
a first-class outcome of reading it**, not a consolation: the register already
uses volume five's 《十八飛星策天紫微斗數全集》 to make the `daxian: ming`
refusal firmer, and that is the shape the rest of the set is expected to take.
Where it does not refuse, it names — 紫微斗數 `sihua` is waiting on a lineage
that has been read, and a school manual is where a school's name lives.

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

**第七冊 has been searched and three of its pages read, and it moved `sihua`
without settling it.** It uses 庚's 忌 on 天相 in one part and on 天同 — the
received value — in another, which is what an anthology of three schools does,
and it puts 壬's 科 on 左輔 in a worked example that is decidable only on that
reading. So the second value is closer and still not liftable: it would have to
come from a named school inside the volume, which means reading which part
belongs to whom. The argument, with the pages, is in `docs/sources.md`. What
is left of this phase is 第一冊, 第六冊 and 第十冊 — and 第十冊's extract is
the weak one, so it is a plate errand whatever else happens.

### Phase 3 — 紫微斗數全書, 明南陽堂 woodblock

528 pages, one book-page to the page, high-contrast block printing: legible by
eye, hopeless for OCR. `docs/sources.md` calls it the adjudicator between the
transcriptions and has already read it in places. This phase is the rest of
it — collation, against the copies already held, of the passages the two
transcriptions disagree on.

### Phase 4 — the remainder, read behind no citation

《協紀辨方書》 卷七~卷八 四庫 woodblock, the third 遁甲演義 scan, 大六壬指南 —
which is not a woodblock facsimile but a 1990 typesetting in simplified
characters, and therefore easier than the shelf's own README says — 大六壬課經
集, 大六壬神課金口訣, 中國古代天文與曆法, and 祖傳年家太乙神數. None of them
is under a value in § 1. They are read when a phase above sends somebody to
them, or not at all.

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
the 用神, 格局, ranking, dating, advice, the 年命 purposes doctrine, a natal
Qi Men chart, 太乙's dynastic readings, and the 十八飛星 placements grafted onto
a 《全書》 board. Each has an entry in [`docs/refusals.md`](docs/refusals.md)
saying who asks for it and why it is not here.
