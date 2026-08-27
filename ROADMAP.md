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
layer. Four of those have been turned into an extract; thirty-six have not,
which is on the order of eleven thousand unread pages. Several of the values
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

**Two ways in, and the choice is made per file.** A horizontal simplified
typesetting goes through `ocrmypdf -l chi_sim` and comes out searchable. A
vertical woodblock does not — the `_vert` models read those poorly enough that
a grep against the result is evidence of nothing, which the 儀象考成 attempt
already established — so what a woodblock is read by is the plate, page by
page, and the extract that comes out of it is a quotation and not a file. The
scans that need cutting into quadrants first have `texts/qizheng/ocr-4up.sh`.

**And a third consideration that outranks both: the scan's own resolution.**
`ocrmypdf` on the right layout at the wrong resolution produces a file that
looks like an extract and is not one. What the run is worth is measured on the
file before anything is quoted out of it — `texts/README.md` § "`.txt/` and
OCR" is where the measurements and the confusion classes are kept.

The toolchain the phases below assume: tesseract 5.5.3 with `chi_sim`,
`chi_tra` and the two `_vert` models, `ocrmypdf` 16, Pillow for the quadrant
cutting, and `pdftoppm`, `pdfimages` and `gs` for rendering a plate.

### Phase 1 — 大六壬精解, for 六壬's three refusals

753 pages, modern horizontal simplified typesetting, one page to the page:
the easiest layout on the shelf, `ocrmypdf -l chi_sim` straight through, the
way the 協紀辨方書 modern edition went. It is the only extended 六壬 manual
held and nothing in `liuren.ts` stands on it.

**The easy layout sits on a hundred-dpi scan, and the extract is a finding aid
and not a text.** Measured, it comes out around four characters in five, and
the fifth is disproportionately a branch — 巳 for 己 for 已, 亥, 丑, 辰 — which
is the class of character a 六壬 rule is made of. Oversampling does not help,
because the information is not in the file. So the run is worth making and
what it buys is a way to *find* the passage; the passage itself is read off
the plate, and every line quoted says so.

Read for `yuejiang: jieqi` and `true`, and `zhouye: solar`. A modern manual is
not a witness on its own — it is where the divergence gets named and the older
text it cites gets found.

### Phase 2 — 御定星歷考原, for the 神煞

184 sheets of 四庫 woodblock at 600 dpi, read by plate. It is the work
《協紀辨方書》 was commissioned to revise and quotes by name throughout, and the
layer's ~70 quantities have one witness each. Where the two agree a 神煞 has
two; where they disagree the disagreement is the finding, and both directions
move `docs/sources.tsv`.

It also touches 六壬 from the side: the 提要 to 六壬大全 credits it with
correcting 曹震圭 on the 天乙貴神, which is `guiren`'s ground.

Ends in: rows moved for what it confirms or contradicts, and — if a lineage is
named cleanly enough to be followed — the second value of `shensha`.

### Phase 3 — the 曆 substrate, for `xiudu`

《曆法通志》 (1934, 311 pages, vertical traditional but *movable type*, which
`chi_tra_vert` handles far better than a block) and 《授時曆故》 (174 sheets,
woodblock, numerical tables). Both are read for one thing: a 黃道宿度 table
with a citable epoch. 《萬年曆 中西對照》 is in this phase as an instrument
rather than a doctrine — a third leg under the pillars, beside
`lunar-javascript`.

The likeliest outcome is another documented negative, and the register already
holds one: the only 授時 lodge table on the shelf is the 赤道 one, which is the
wrong frame. Say so again rather than quietly not looking.

### Phase 4 — the dunjia scans, for `plate`, `centreLodging` and `system`

The largest block and the least prepared — eleven files, some three and a half
thousand pages — so it is ordered by what reads easiest:

1. 《遁甲集成》 第二・三・六冊 — modern typeset traditional, 2-up. 第二冊 carries
   煙波釣叟歌直辨, the Qing commentary on the verse the 十干克應 table is pinned
   to, and 十八活盤詳注, which is the moving-plate ground `plate: fei` stands on.
2. 《圖解奇門遁甲大全》 — 598 pages, modern horizontal simplified, trivial OCR.
   Divulgation, so a lead and never a witness: it is the searchable face.
3. 《御定奇門寶鑑》 and 《奇門遁甲統宗》 — clean Qing printing, read by plate.
4. The three 故宮珍本叢刊 volumes — colour, but about 1000×1500 pixels to the
   book-page, which is the low end for dense block printing. Read by plate,
   for confirmation of a passage already located elsewhere rather than for
   searching.

Ends in whatever it ends in. 年家, 月家 and 日家 奇門 are three systems and not
one, and a source for one of them lands one value.

### Phase 5 — 《中國絕學》, for a school's name

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

### Phase 6 — 紫微斗數全書, 明南陽堂 woodblock

528 pages, one book-page to the page, high-contrast block printing: legible by
eye, hopeless for OCR. `docs/sources.md` calls it the adjudicator between the
transcriptions and has already read it in places. This phase is the rest of
it — collation, against the copies already held, of the passages the two
transcriptions disagree on.

### Phase 7 — the remainder, read behind no citation

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
