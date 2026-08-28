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
  slip on top of it. See § 2 phase 1 and `docs/sources.md`.

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

The largest block — eleven files, some three and a half thousand pages, of
which one is extracted and **all are now surveyed**. Two passes changed what
this section is: the extent pass found 御定奇門寶鑑 to be one 冊 of eight and the
third 遁甲演義 to be 卷一 alone, and the survey that followed it read the three
故宮 volumes' 新編目錄 off their last leaves and took a contact sheet across the
three 遁甲集成 volumes.

**And it answered the `system` question on the way, and the answer has since
turned negative.** 《遁甲演義》卷一 states 年家, 月家 and 日家 entire — see
`docs/sources.md` § 年命 — so what those three values waited on was a second
witness and not a text. It also showed that they cannot move alone: those
boards are flown where the 時家 is turned, so `plate: fei` and `system` are one
errand.

**A second work has since turned up and it is not a second witness.**
《奇門闡秘前編》卷之三, in 第六冊, says 「凡年月日家各有奇門」 and prints a
年家八節三奇定局 — but its chapter is titled 選擇, and the table gives eight
settings to a year, one per 節, where 遁甲演義 lays one board a year off a 三元
division. A table of where 乙丙丁 stand is not a rule for laying a board, so
the two cannot confirm or contradict each other. What it witnesses is that the
four-fold division is transmitted and used.

**The witness to the procedure has since arrived, and it contradicts the
first.** 第三冊 carries 上元·中元·下元 年家奇門定局 laying one board to an 元 of
sixty years in 陰遁 — the same object 遁甲演義 lays — and puts the three 元 on
palaces 一, 七 and 四 where 遁甲演義 puts them on 一, 四 and 七. Two witnesses
disagreeing is neither of the two things the standard accepts, so `system`
stays refused; what has changed is that it is refused for a reason that is
written down. The argument is in `docs/sources.md` § 年命.

What is left of this phase is 飛盤 proper. **The searchable face of it exists
and the rest is plates**, which is a shorter list than the one this section
used to carry and a slower one:

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
   commentary on the verse the 十干克應 table is pinned to — **and 十八活盤詳注,
   which this section used to call the ground `plate: fei` stands on and which
   is not.** Surveyed by contact sheet: 奇門占驗 ends at its sheet 70,
   陰陽二十四氣三元總圖 opens what follows, the plates are octagonal 全卦圖 in
   the 八卦 arrangement and the tables assign the 局 by term and 元. 活盤 is the
   *turning* plate — 排宮法又稱轉盤 against 飛宮法又稱飛盤, in the manual read
   above — so reading 活 as 飛 is what put the section under this parameter.
   **第三冊 is the volume that paid**, and it is two book-pages to the sheet
   where the other two are one: 《遁甲符應經》 from its p. 1136, whose 九星所直
   lodges the centre in 坤 with no condition on it, and 年家 · 月家 · 日家
   tables from p. 1160 that contradict 遁甲演義 on the 年家's three 元. Both
   are written up in `docs/sources.md`. Its 版心 carries no printed running
   title, so the method that named 第六冊's works cannot be run here.
3. 《御定奇門寶鑑》 and 《奇門遁甲統宗》 — clean Qing printing, read by plate.
   **A third edition of the 統宗 turned out to be 第六冊's first work**, by its
   own running title, and its 卷一 supplies the whole of what the 故宮 print
   loses with its missing leaf: 奇門四十格 entire at p. 2821, with 大格 and
   刑格 in it, and the conspectus at p. 2822 with 小格, 太白入熒 and 火入金鄉.
   Every T reading in the 十干克應 table has been checked against it and they
   agree. See `docs/sources.md` § 十干克應.
4. The three 故宮珍本叢刊 volumes — colour, but about 1000×1500 pixels to the
   book-page, which is the low end for dense block printing. Read by plate,
   for confirmation of a passage already located elsewhere rather than for
   searching. **Their 新編目錄 have been read and they name eleven works between
   them**, one of which the shelf had not recorded: 《諸葛武侯行兵遁甲金函玉鏡》,
   六卷, filling the second third of 第427冊. Its nine stars are 太乙 · 攝提 ·
   軒轅 · 招搖 · 咸池 and not 天蓬 through 天英, so it is another art under this
   art's name and not the flying board — the entry is in `docs/sources.md`.
   第429冊's 奇門遁甲全局 is the eighteen 局 written out, about eighteen pages to
   each, and this line used to call it the place a 轉盤 arrangement could be
   checked wholesale. **It is not**: its rings give a character about fifteen
   pixels and the check the line promised is not something that file can
   support. 第426冊's 金鏡寶鑑 is where that check lives instead — see below.

**What has been covered, so the next pass does not repeat it.** The extent
pass took page counts and pixel metrics for all eleven, the closing leaf of ten
— 圖解 is a modern book and has none — and 卷一 of the 四庫 遁甲演義. Since
then: 圖解 is extracted and read for both values; 第二冊 is surveyed by contact
sheet between its sheets 40 and 115, which located 奇門占驗's end and the work
after it; and 第六冊 is surveyed across its whole extent, which is what turned
up the 統宗 and 闡秘前編 inside it, its 四十格 at sheets 9–10, its 歌註 around
sheet 131 and its 格局 at sheet 142; and 第三冊 is surveyed across its whole
extent at twenty-sheet intervals, then narrowed twice, which found 符應經, the
centre's lodging and the 年家 tables, and four pages of it are read whole.

**The survey is now complete for all eleven**, and the last two pieces of it
were 第二冊 beyond sheet 115 — 奇門秘要 to the end, whose 剋應 answers a gate over
a palace and is not the table of that name — and the three 故宮 volumes' 新編目錄.
A contact sheet of the top strip of both book-pages, ten to sixteen sheets
sampled, is what these passes were made of. **The running title decided most of
them and cannot always be relied on**: it named 第六冊's and 第二冊's works, and
第三冊's 版心 carries no printed title at all, so there the heading of the first
table on a leaf is the only thing that says what section it is.

What is left of this phase is not a survey. It is 飛盤, and **the volume that
looked likeliest has been asked and does not answer.** 遁甲演義 names the flight
three times and a second witness to it would move `plate: fei` on its own; 第三冊
lays all three boards and never says how — the 局 by 元 or by term, an octagonal
diagram, an enumeration, and 「以陰遁一局而推」 for the manner. The one word in
that stretch that could have borne on it, 輪, names the printed round and not a
turning plate. So the places left to look are the ones the list above names.

**第429冊's 奇門遁甲全局 was the shortest of them and it has been opened.** It is
the eighteen 局 written out, four charts to the page, each with its nine palaces
in prose beside a circular plate — the first printed board this project has
collated cell by cell, and it carries no 飛盤 procedure either. What it produced
instead is a dissent on a shipped name: the yin board agrees with this engine on
all eight spirits, and the yang board keeps 白虎 where this engine renames it
勾陳 and writes 勾陳 where this engine writes 朱雀. **And its rings cannot be
read** — a character in them gets about fifteen pixels where `docs/scans.md`
sets forty as the floor — so the wholesale check this line used to promise is
not something the file can support. Both are in `docs/sources.md`.

**And the biggest of them has been opened, which is where this phase now
stands.** 《奇門遁甲金鏡寶鑑》, 十六卷, 郁離子伯溫 輯, in 故宮 第426冊 from its
p. 259 — the one a 飛盤 procedure was likeliest to be in. **It states the
turning instead**, in so many words: 卷之三 has 「以星為直符加時干而轉天盤九星…
隨時轉運變化無窮」, 轉 twice and 飛 nowhere. So the value's likeliest
volume is a documented negative and a witness for what this engine does.
**And the prose sweep that followed made the negative as strong as it can
get**: 飛 is in the work five times over — a rhyme, a heaven-plate stem, two
格 names against their 伏 twins, the eight spirits' direction, and 「八宅弔星…
以次順飛」, which is the flying-palace operation itself, named 飛 and spent on
八宅. A work that lacks the vocabulary proves little; one that has it, uses it,
and still turns the board proves as much as a text can without saying so.

**What it paid instead is the palace-5 value, and it paid it in the coin that
was asked for.** 卷五 to 卷八 tabulate all eighteen 局 as a 起星訣 and a 起門訣 —
each decade's 直符 star or 直使 gate by name, then the ten hours with the palace
each stands in — and 陽遁一局 was read whole and run against the engine: all six
stars and all six gates agree by name, **and all twenty palace disagreements are
one fact**, one of them with a cut slip on top of it. This print counts the centre as a station a moving
plate can stand in. The 直符 star goes to 五 when the hour's stem is the one the
ju puts there, the 直使 gate lands on 五 when its count reaches it, and 天禽
**leaves** the centre and travels the whole 甲辰壬 decade with the hour's stem.
That last is the 元靈經 reading, and this line used to say a print was wanted
before the value was implemented. This is that print — a Qing imperial
woodblock, stating as a table for every hour of every 局 what 元靈經 assumes in
two worked examples. The value is still declared and refused, for the reason it
always was: it is a field in 奇門's input type, and it is paid with the other
two and not alone.

**And three more things came off it, two of them confirmations.** Its eighteen
局 headings each name the four term-and-yuan slots that take that 局, so the
eighteen are the whole 三元定局 printed inside out — seventy-two cells, all read
and all agreeing with the table `ju.ts` ships. Its 陰遁 boards give the centre's
decade 坤二's 死門, which is the first witness for `centreLodging: kun` that is a
yin board rather than a rule stated without a condition, and `dun` is still what
nobody states. And its 卷之五 opens on a 三元訣 whose first line is cut 坤 where
the parallel with 仲 and 季 wants 孟 — on the only reading that parses it gives
the yuan the anchor 遁甲演義 assigns to its 月家 and not the one that book gives
its 時家, which is what this engine computes. **Nothing moves on the third**: it
is one leaf against a prose statement and two implementations, and it is written
down so that a second witness has somewhere to arrive.

**And it dissents on the 八神 too, differently from 第429冊 and differently from
what its 目錄 suggested.** That 目錄 gives a juan each to eight spirits — 直符
螣蛇 太陰 六合 勾陳 朱雀 九地 九天 — with 白虎 and 玄武 in no heading, and the
chapters are written for a spirit over a gate with no clause about which dun the
board is; read alone it says one set of eight, used in both dun. **The prose
says otherwise and the prose has now been read**: 卷之二 offers 虎 and 武 as
alternates for 勾 and 雀 when the matter asked is 占病 or 占賊, once for each dun.
So what is held is not a fourth roster but a fourth rule for choosing between two
names of one seat — and it is the only one keyed to the question rather than to
the board. Everything above is in `docs/sources.md`.

**What is read inside the 金鏡寶鑑 and what is not**, because «opened» is not
«read» and the next pass should not have to find this out again. Series page
numbers, which is what the volume prints; the shelf's own register holds the
PDF offset and the block layout.

- **卷之一~卷之二 奇門辯釋口訣 and 卷之三 奇門撮要. Swept whole, and the errand
  that sent somebody there is finished.** Note the correction while reading the
  rest of this section: the works divide 卷一~二 and 卷三~四, not 卷一~三 and
  卷四~五 — the 目錄 and every section heading say so, and the earlier boundary
  came off a contact sheet. Forty-three sheets, eighty-six leaves, read on the
  plate at 300 dpi with fourteen crops at 600. It answered both open questions
  and produced a third finding nobody was looking for:
  - **The 八神.** The work names 白虎 and 玄武 — 「如占病、占賊，則勾、雀二神可換
    虎、武用」 and 「雀、勾可換武、虎」, pp. 286 and 287 — so the negative § 1 left
    open is closed the other way. See § 1.
  - **The centre.** Stated as a rule and not only tabulated: 「二五同宮，其志不同。
    行活局，符使不必寄於二，徑排入中宮」 (p. 266) and 「只順宮不隨干行，亦入中五」
    (p. 267). It also carries the condition — 行活局 — and separates the star's
    lodging from the moving 符 and 使. The turn is nowhere qualified; what
    qualifies the centre is a valence, 「直使加中五宮為死」 and 「符入中宮不可用」,
    which is the reading layer.
  - **置閏**, which nobody asked for. p. 265 repeats the term the year's leap
    month falls under and rejects the solstice placement. New entry in § 1.
  - **And 飛 is in the work, five times, never for this board** — including
    「八宅弔星…以次順飛」 at p. 290, which is the flying-palace operation named and
    spent on 八宅. That is as strong as the `plate: fei` negative can get without
    the work saying so.
- **卷之四 奇門撮要. Read whole**, ten sheets, twenty leaves, pp. 306–315. **The
  prose of this work is now finished.** It is where the book states its own
  五行 bookkeeping, and that is the one thing in it that moves anything:
  「九星休旺者，旺于同類月，相于我生月，休于生我月，囚于官鬼月，死于妻財月。
  日時皆同」, with a nine-star table consistent with it. 我 is the star, so the
  reading is transposed from the season-centric one `strength.ts` computes; new
  entry in § 1. Everything else in the juan confirms or repeats — 六儀擊刑 for
  all six decades cell for cell with `patterns.ts`, 五不遇時 stated with its
  polarity condition, the 格 defined a second time 天盤 against 地盤 — except one
  worked case worth the reading on its own: 「甲子帶戊在中，寄坤。此方出行舉事
  乃吉」, which is 在中 and 寄坤 in one breath and a third kind of witness for
  `centreLodging: kun`.
- **卷之五~卷之八, the eighteen 局.** All eighteen headings read — that is the
  三元定局 and it is finished. **陽遁一局 alone is collated**, 120 cells; the
  other seventeen are about 2040 cells and the file supports reading them, which
  第429冊's could not. Two cut slips in the 120 is the rate a wholesale pass
  would be read against. Nothing is waiting on it: the divergence it would
  measure is already stated and already paid for.
- **卷之九~卷之十六, the 八神加八門斷章.** The 目錄 and 卷之九's opening read. The
  rest is 斷 material — what a spirit over a gate means for 天時, 地利, 人和, a
  campaign, a journey — which is the reading layer this project refuses. Not an
  errand except for the 八神 sweep named above.

**What is unopened, so the next pass starts rather than reconstructs.** Every
volume above has been surveyed and its sections named; these are the works
inside them that nobody has read a page of, largest first:

- 《御定奇門寶鑑》 第一冊, 373 pages of Qing imperial woodblock — one 冊 of
  eight, so a procedure that runs across the set may not be in the part held.
- 第429冊's other three: 奇門遁甲 十卷 (to its p. 128), 奇門遁甲備覽, 奇門遁甲
  捷要. The 全局 in the same volume was read and carries no procedure, which is
  weak evidence about its neighbours and not none.
- 《大統皇曆經世》, 三卷, in 第426冊 — calendrical rather than dunjia, and named
  here only so the volume's contents are accounted for.

第427冊's 秘笈大全 is a photographic edition of a text this shelf already has as
a transcription, so opening it is collation and not discovery; its 金函玉鏡 is
another art under this art's name and is not a place to look.

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
