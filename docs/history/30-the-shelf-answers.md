# Phase 30 — the shelf answers

The plan for this phase was one line long: check that the machine could run
the extraction the roadmap assumes, and install what was missing. Nothing was
missing but `qpdf`. What followed came out of the reading that became possible
once the scans were searchable, and it moved four refused values, one shipped
table and five entries in the manifest.

## What was extracted

Sixteen files, 2.7 million Han characters, where the shelf had none. 《圖解奇門
遁甲大全》, nine volumes of 《中國絕學》, 《十八飛星策天紫微斗數全集》, 《大六壬
指南》, 《授時曆故》, 《萬年曆中西對照》, 《中國古代天文與曆法》, and the English
中州派 manual off its own text layer.

Three shapes of sheet needed three scripts, and the shelf carries them:
`ocr-1up.sh`, `ocr-2up.sh` with `lr` and `tb`, and the `ocr-4up.sh` that
already existed. Two method facts came out of building them and are in
`docs/scans.md`: the cut between two book-pages is `unpaper`'s and not a line
down the middle, worth about half the characters on one measured page; and
`ocrmypdf` sizes its raster from what a PDF says its images are, so over a
JPEG 2000 scan it announced forty-eight dpi and returned thirty characters a
page for 598 pages, reporting nothing wrong.

## What the reading found, and what it cost to find

**Seven files were not what they were catalogued as.** 遁甲集成 第二・三・六冊
are block-printed facsimile and not the modern typesetting the roadmap
planned around. 《中國絕學》第一冊 is handwriting on squared paper. 第七冊 is
four works whose parts number their own pages, one of them 《紫微斗數 北派》,
恭鑑老人. 《大六壬指南》 opens on 《大六壬心印賦》. And 第六冊's first work is
**奇門遁甲統宗, 卷一 through 卷十二** — a third edition of a text the register
already leaned on, sitting unopened under another name.

That last one paid for the phase. The 故宮 print of the 統宗 carries its own
defect — 「卷一原書缺第10面」 — and the leaf it lost is the one bearing 大格,
刑格, 小格, 太白入熒 and 火入金鄉, which is to say every 十干克應 cell the
survey leaned on that the verse does not also carry. Those five stood on a
transcription. 第六冊's 卷一 prints the 四十格 entire at p. 2821 and a 格
conspectus at p. 2822, and every T reading in the table checks against them.

## What moved, and what did not

`plate: fei` and `centreLodging: dun` gained documented negatives: the
searchable manual names the 轉盤/飛盤 division and prints no procedure, and it
states the centre's lodging as 坤二 with no condition, applying that inside
陰遁 in a passage it quotes. 十八活盤詳注 was written down here as the ground
`plate: fei` stands on and is not — 活盤 is the *turning* plate, and reading
活 as 飛 is what put it there.

`huoling: hour` and `daxian: ming` gained a witness apiece, printed whole in
《中國絕學》第六冊 as a procedure and a diagram. Both stay refused: one modern
school manual is one witness where the standard asks for two transmitted ones.
What changed is that neither is any longer a thing nobody states, and the
`huoling` pair turns out to share every seat and part only on the count.

`xiudu: shoushi` had been refused for want of an epoch that could be cited.
《授時曆故》 states one — 至元辛巳 — carries the whole 黃道宿次 in its 卷二, and
**checks itself twice**: each quadrant sum closes on its own seven entries, and
the four close on 365.2575, the 曆's own 周天分. It stays refused for reasons
nobody had reached: this print omits 參 while its sum counts it, and the source
makes its own table a function of a moment, so the option cannot be a table
without also being an epoch.

`sihua` closed rather than advanced. The second value was conceived as a
lineage's own ten stems; what the shelf carries is two modern schools moving
**one cell each** — 壬's 科 to 左輔 — and agreeing with the received table
everywhere else. That is a smaller claim than the parameter was shaped for.

## The twelfth pairing, and where a rule ran out

庚 over 壬 had been held out of 十干克應 for two reasons: it stood on the leaf
the shelf's print was missing, and its 凶 had never been read off a source.
Both fell. 《奇門闡秘前編》卷之二 格局, bound after the 統宗 in the same volume,
grades what it lists and prints 「上格○天盤庚加地盤壬也，一名小隔，不宜出師」.

Then the naming rule met its first case. This project settles a disputed name
by the classical verse, on the ground that it is the text the others descend
from. Here **the verse is transmitted two ways**: 加壬之時為上格 in the
Wikisource recension and in the Qing engraving of 闡秘前編's 歌註, 加壬之時為
小格 where the 統宗 and the 秘笈大全 quote the same couplet. Four namings for
one condition, two of them two readings of one line.

The table ships it as **上格**, which is the reading of the verse this shelf
holds in print and the one the work that grades the pairing uses. The three
namings it does not carry are recorded in `docs/sources.md` rather than
dropped, and the rule's own statement now says where it stops.

## What this phase is a case of

Twice the 版心 of a woodblock decided a question that looked like it needed
reading: 「卷之三 選擇」 established that a 年家 table and a 年家 board are
different objects, and 「奇門遁甲統宗卷之一」 opened an edition that had been on
the shelf for years under the wrong title. A running title costs one look.

And once the register recorded a sum that did not close when the reading was
what had not closed: 虛 reads 九七一 at 400 dpi and 九　七十五秒 at 600, seven
tenths of a degree and the difference between a quadrant that checks and one
that does not. `docs/scans.md` already said to crop when one character decides
something. It did not say to distrust a number that fails to add up before
distrusting the arithmetic, and now the entry does.
