# What is not built yet

Three kinds of open work, open for different reasons, and a fourth list that
is not work at all. The record of how everything else got here is in
[`docs/history/`](docs/history/README.md); what holds today is in
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

**But an audit on 2026-08-28 found divergences the engine decides in silence,
and those are not waiting on a source.** They are in § 1 under the parameters,
they have their witnesses already, and what they want is a field in an input
type and the decision to break an API once rather than three times. That is
code work with nothing to read first, and it is the one part of this file where
«read the shelf, then write the code» is the wrong order.

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

- 紫微斗數 `sihua` — 《紫微斗數全書》's own table. **The errand this was waiting
  on is finished and it did not produce a second value**: two modern schools on
  the shelf, the 中州派 manual and 北派, each move a single cell — 壬's 科 to
  左輔 — and agree with the received table everywhere else. A lineage's own ten
  stems is not what is there, so what would declare a second value is a
  different find from the one that was being looked for.
  **A third table has since been read and it does not change that shape**: the
  Ming 南陽堂 recension moves one cell too, a different one, giving 庚's 科 to
  天同 and its 忌 to 天相. Single cells moving is what this shelf keeps finding.
  It raised the question of what a second value would be *named* for, and that
  question is now answered: a school, never a recension — so the 南陽堂's 庚 is
  a reading of 《全書》 that the register settles and not a value this parameter
  will ever carry. See `docs/parameters.md` § "What is not a parameter".
- 曆注 `shensha` — what 《協紀辨方書》 ratifies, until a named lineage has been.

**And one divergence owes a parameter it does not have.** That is a third state
and the worst of the three, because nothing refuses it by name: the chart comes
back without saying which convention drew it.

`CLAUDE.md`'s rule was narrowed on 2026-08-28 — every divergence *between
practitioners* is a parameter, a disagreement between witnesses to one text is
not — and the narrowing is what makes this visible. See `docs/parameters.md`
§ "What is not a parameter".

The audit that followed the narrowing swept every module of `core` and the
register for admissions of divergence, and passed each through three questions:
does it change what the chart shows, could two practitioners hold opposite
sides, and is it exposed. Most of what it found was the rule already working —
the 用神 mapping refused in `scan.ts` because «putting one of them here would
make a school implicit», the 課體 that names nothing where the sources disagree,
`leapMonth` and `huoling` and `centreLodging` each declared with their
alternatives refused. Three things were not.

**Two are divergences nothing exposes, and the 金鏡寶鑑 sweep added two more.**
The audit's two need a field in a board's input type, which is the breaking
change `docs/parameters.md` opens by saying not to make late — so they are named
here and paid together, not one at a time. Of the two the sweep added, 置閏 is
cheaper, having a parameter to land on already; the seasonal relations are a
field like the first two and are paid with them.

- 奇門, the **八神's naming**. This engine follows the 陰陽異名 convention and
  renames the middle pair in a yang chart, 白虎 → 勾陳 and 玄武 → 朱雀;
  `plates.ts` says so above `SPIRITS_YANG` and said, before this was written,
  that it is «a divergence this engine does not yet expose». Other traditions
  keep one pair in both dun, and 《奇門遁甲全局》 — read on the plate, see
  `docs/sources.md` — is a third: 白虎 at the fifth seat and 勾陳 at the sixth.
  **《奇門遁甲金鏡寶鑑》 was read as a fourth and the sweep reversed it.** Its
  目錄 allots a juan each to 直符 螣蛇 太陰 六合 勾陳 朱雀 九地 九天 with 白虎 and
  玄武 in no heading, which invited «the work names the pair nowhere» — and that
  was written down as not established, because a negative is established on the
  plate. The plate has now been swept, 卷一~卷三 entire, and **it names them**:
  「如占病、占賊，則勾、雀二神可換虎、武用」, said once for each dun. The pairing
  is this engine's; what differs is that the choice between the two names of a
  seat is keyed to **the matter asked** and not to the dun. So the parameter
  this owes is not a roster of eight names — it is a field saying *what decides
  the middle pair*, and there are now four answers to that. See
  `docs/sources.md`.
- 奇門, **where the 置閏 leap block goes**, found by the same sweep and new to
  this list. `method` carries 拆補, 置閏 and 茅山, and 置閏 silently means the
  《統宗》's placement: the repeated block is 芒種 or 大雪. 《奇門遁甲金鏡寶鑑》
  卷之一 repeats instead whichever term the year's leap month falls under, works
  it twice by date — 1678 閏三月 and 1691 閏七月, both confirmed against this
  engine's lunar calendar — and rejects the solstice placement as a convenience,
  「於理法都不是」. Two practitioners, opposite sides, and the chart does not say
  which it followed. Unlike the two above it needs no new field: it is a value
  on `method`, or a modifier of `zhirun`, and that is the one design question to
  settle before it is declared.
- 奇門, **which way the five seasonal relations are read**, found in the
  金鏡寶鑑 sweep. `strengthOf` reads them from the season, which is the ordinary
  五行 statement: what the season generates is 相, what generates it 休, what
  controls it 囚, what it controls 死. 卷之四 of that work reads the same four
  from the **star** and tabulates all nine that way, which swaps 相 with 休 and
  囚 with 死 and leaves only 旺 in common. It is one text and its table checks
  its own rule rather than the rule, so nothing moves — but 旺相休囚死 is
  reported for every star and every gate on every board, and no chart says which
  way it was read. The same passage reads the states off the day and the hour
  too, 「日時皆同」, where this engine passes the month branch alone; that is a
  narrowing rather than a divergence and is recorded with it.
- 奇門, **where earth's season begins**. `seasonElement` gives the four months
  that close the seasons — 辰, 未, 戌, 丑 — to earth entire, and `strength.ts`
  records that other schools give earth only the last eighteen days of each
  instead. That is not a gloss: `seasonElement` feeds `strengthOf`, so the
  reading decides 旺相休囚死 for every star and every gate on the board, and the
  two answers part for the first two-thirds of each of those four months.

**One is exposed and unregistered, which is a smaller fault and a different
one.** 八字's `luckGranularity` — `shichen` against `minute`, «they disagree by
up to ten days on when the first cycle opens» — is an option on `BaziOptions`
with a declared default, so no chart is cast without the caller being able to
say which reading produced it. But there is no `BAZI_PARAMETERS`, so it is
absent from `PARAMETERS`, from `docs/parameters.md` and from anything a surface
builds out of them. The divergence is honoured and the registry does not know
it. Fixing it is additive rather than breaking: a registry entry, a row in the
parameters page, and a label in each catalog.

**And the two candidates are claimed, and turn out to be one.** They were listed
apart — whether **天禽 stands at the centre** or rides merged with 天芮, and
whether the **lodged stem turns with its host** on the heaven plate — and each
was to wait for a witness. 《奇門遁甲元靈經》 supplies it in two complete worked
examples, run against the engine cell for cell: the earth plates agree palace
for palace, the 值符 star and the 值使 gate and its palace agree in both, and the
two part at one thing only. Where the 符頭 stands in the centre, the text
carries the centre's stem and star to the hour's palace with their host; this
engine leaves them at the centre. The outer eight agree either way.

- 奇門, **whether the lodged stem and star travel**. One divergence, not two: a
  board whose centre empties and whose host palace carries a second stem and a
  second star is the same board seen from outside as «天禽 merged with 天芮 and
  the centre starless». `PalaceContents.lodged` had already written the
  divergence down and said this field does not decide it; what is new is
  somebody stating the other side in a worked example rather than an
  implementation choosing it silently. The witness is a transcription of
  unstated provenance and the register weighs it accordingly — but it checks
  itself, which is the second thing the standard accepts. A print is wanted
  before the value is implemented; the parameter can be declared and refused
  before that, and it shares 奇門's input type with the two above.
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

Forty of the seventy PDFs in `texts/` are photographic and carry no text
layer. **Sixteen of them were extracted in one pass and the shelf's register
records what each is worth**; what is left unextracted is what should be, being
woodblock or handwriting. Several of the values in § 1 are waiting on some of
them, and nothing else about this section is urgent — an unread scan costs
nothing until somebody claims it says something.

**An extract is not a reading and the two are counted separately here.** The
pass above made about ten thousand pages searchable; a handful of them have
since been read, and the register says which. The rest is a way of finding a
page and nothing more.

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
`gs` for rendering a plate and taking a file apart. All of it was present on the
machine this was last run on bar `qpdf`.

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
volumes alternates sides. Every survey in phases 30 to 32 was made of it.

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

**The errand this phase was opened for is finished, and it closed rather than
landed.** 紫微斗數 `sihua` was waiting on a lineage carrying its own ten stems.
That is not what the set holds. 第七冊's parts number their own pages, so which
stretch belongs to which school is a thing the plates say: 庚's 忌 stands on
天相 under a 【占驗派】 heading and on 天同 in a part opening on 《紫微斗數
北派》, 恭鑑老人 著. 北派's table has then been read across six stems, eleven
cells, and every one of them is 《全書》's **except 壬's 科, which it puts on
左輔** — the same single cell the 中州派 manual moves. Two modern schools moving
one cell each is a smaller thing than a second table, and what would declare a
second value is now a different find from the one that was being looked for.

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
the passages the two transcriptions disagree on. **Most of them are answered.**

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

What is left: 解神 off the year, the two repaired grid cells, and the starting
age of the 大限. The 目錄 names a section for the first only.

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
the 用神, 格局, ranking, dating, advice, the 年命 purposes doctrine, a natal
Qi Men chart, 太乙's dynastic readings, and the 十八飛星 placements grafted onto
a 《全書》 board. Each has an entry in [`docs/refusals.md`](docs/refusals.md)
saying who asks for it and why it is not here.
