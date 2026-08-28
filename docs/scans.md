# Reading a scan

Most of what this engine stands on was read off a photograph of a page. The
photographs are not here — `texts/` is excluded, and `docs/sources.md` cites by
title and never by path — but **the method is, because a method is the part of
a shelf that is worth sharing.** Somebody who assembles the same files from
`docs/provenance.tsv` gets the paper and would otherwise have to learn all of
this again.

This page owns the procedure. What a particular file turned out to be worth —
this scan is a hundred dots to the inch, this extract loses its branches — is a
fact about that paper and lives beside it, in the shelf's own register. The
split is the one `docs/sources.md` already keeps: the argument here, the
provenance there.

## Two ways in, and a third axis

**A typeset page goes through OCR. A woodblock does not.** That is the whole
first decision and it is not about the language, the century or the direction
of the lines:

- **Typeset, horizontal, simplified** — `ocrmypdf -l chi_sim`. The
  《協紀辨方書》 modern edition and the 《大六壬精解》 both go straight through.
- **Typeset, vertical, traditional** — `ocrmypdf -l chi_tra_vert+chi_tra`.
  This works. Over 311 pages of 1934 movable type it returns about three
  hundred CJK characters to the page with the vocabulary intact, and it is
  what located a lodge table nobody had opened.
- **Woodblock, any direction** — do not run it. The `_vert` models over a
  block-printed 四庫 page return so little that a search against the result is
  evidence of nothing: 觜 was found on no page of a document where it is
  legible by eye on many.
- **More than one book-page to the sheet** — they have to be cut apart first,
  or the reading order is lost: four to the sheet and the two columns of
  book-pages interleave line by line, two to the sheet and a column of one
  lands in the middle of the other. The shelf carries a script for each.

**And the cut is `unpaper`'s, not a line down the middle.** A half sheet
carries the gutter, the facing page's edge and the black band a photocopier
leaves down the fold, and the layout analysis reads all three as columns.
`unpaper --layout double` cuts to the printed frame, deskews and drops the
band: on one page of 中國絕學 第六冊 that is the difference between about half
the characters and about nine in ten. It earns none of that where there is no
band to drop — over 大六壬指南, whose two book-pages are stacked rather than
side by side, its border detection ate the outermost columns and the same page
fell from 330 characters to 110. So: `unpaper` where the sheet was
photographed open, a plain cut where it was not.

**Resolution is a separate axis and it decides what the first choice is
worth.** A page can have the easiest layout on the shelf and still yield an
extract that cannot be quoted. What matters is not the nominal dpi but **how
many pixels a character gets**, since page sizes differ:

| | pixels to a character | what the extract is |
|---|---|---|
| a 1-bit stencil at ~100 dpi | ~25 | four characters in five, and clauses go missing |
| movable type at 300 dpi | ~70 | a usable index; the tables still come out as noise |

Two measurements do not fix a boundary, and the boundary is somewhere between
them. What they do fix is the shape: **below about forty pixels a character the
extract is a finding aid at best, and it can fail in a way the character rate
does not predict.**

Oversampling does not help. `--oversample 300` and `600` on the hundred-dot
scan moved the density of expected terms from 5.6 % to 5.3 % to 5.0 %:
upsampling adds no information the file does not hold.

## An extract locates a passage. It never quotes one.

This is the rule the rest of the page serves. Every line this project has
quoted out of a scan was read off the plate afterwards, including the lines
that were found by searching an extract, and including the ones the extract
appeared to render correctly.

The reason is not the character rate but **where the errors fall**. On the
hundred-dot scan they concentrate on the branches — 巳 · 己 · 已 read for each
other, 亥 as 玄 or 诡, 丑 as 开 or 恬, 辰 as 诬 — and on 占 read as 点, 凶 as 内.
Those are the characters a 六壬 rule is made of. An eighty-per-cent extract of
a domain whose vocabulary lives in the missing fifth is not eighty per cent of
a source.

Recurring confusions to search around, from the shelf's own runs: **孛 reads as
李**, 躔 as 嘿 or 蛀, 戌 as 成 or 皮, 寅 as 賓 or 宇. Search both forms.

**A character can go missing everywhere at once, and 遁 is the case.** In
274 000 characters off 《圖解奇門遁甲大全》, which is printed in simplified
characters, 遁 appears zero times: 通甲 stands where 遁甲 should 560 times and
奇门适甲 105 more, 阴通 216 and 阳通 313 where 阴遁 and 阳遁 should. A search
for the word on the cover of the book returns nothing. The character rate says
nothing about this — the extract is a good one — so the check is to search the
term and then search what it could have become.

**A `.nospace` companion is the one to search.** tesseract puts a space between
Chinese characters often enough that 二十八宿 matches zero times in the raw
extract and twelve times with the spaces stripped.

## A search returning nothing is not a negative

**The failure that matters is silent.** An extract can lose a whole clause, not
merely garble it, and a search that comes back empty then reads as «the text
does not say this» — which is a finished phase, wrongly.

It has happened here, on the sentence a whole phase existed to find.
《大六壬精解》 p. 26 prints 「古來亦有更嚴格地准星之出沒或日之出沒而分晝夜者」,
which is the only attestation on this shelf that the day-and-night division has
a second school. The extract of that page does not contain the clause at all:
`日之出没` scores zero against a page that prints it, on a run whose measured
character rate was four in five.

So a negative result taken from an extract is not a result. **A negative is
established on the plate**, by looking at the pages the search should have
found, or by establishing that the section is not in the file at all — which is
what the next rule is for.

**And a plate can be searched for a character it was forbidden to print.** A
Qing imperial edition observes the reign taboos, so 玄 is set 元 throughout:
《奇門遁甲金鏡寶鑑》 writes 元女 for 玄女, and a sweep of it looking for 玄武 is
looking for a character the block does not carry. The pair was found under the
one-character abbreviation 武 and would have been found in full as 元武. This
costs nothing to check — one known taboo character, read on any leaf — and it
is the difference between a negative and a missed passage, which is the same
failure the rest of this section is about arriving by a different road.

## Reading a plate

Rendering is cheap: `pdftoppm` at 300 dpi runs at about two pages a second,
which is the same order as OCR. **What costs is the reading**, one page to one
look, so the method is about spending those looks well.

**A resolution ladder, because one setting does not do both jobs.** At 110–150
dpi prose is reliable and numerals are not. Twice in four readings this project
has turned on a single character — 七 against 一 in a calendrical constant, 壬
against 辛 in a verse — and both were settled only at **400 dpi with the region
cropped and enlarged threefold**. Prose at 130, numbers at 400, and a crop
whenever one character decides something.

**A contact sheet is what makes a woodblock affordable.** Eight to twelve pages
rendered small, the heading corner of each cropped, tiled into one image: one
look covers ten pages and answers «what section is this», which is the question
a survey asks. It is how two documented negatives on this shelf were
established. Its limit is exactly its purpose — **it locates approximately**;
a section attributed to a page from a contact sheet was twenty pages out, and
the error appeared the moment the real page was rendered. Locate on the
contact, read on the page.

**A contact sheet is not always the cheapest way in, and three things decide
it.** Where a book has a 目錄 at the front *in section order*, a 版心 naming the
juan on every leaf, and a block clean enough that the top of it reads at a
hundred dots to the inch, a named section is reached by arithmetic and one
contact sheet rather than by sweeping. The Ming 南陽堂 《紫微斗數全書》 is the
case: 528 pages, and a named verse was landed on in four passes — the 目錄, one
margin crop to fix the juan, one sheet of eight leaves to bracket it, one of
four to land. Check for the three before planning a sweep, because the sweep is
what costs.

**The second case cost less still, and it is why the three are worth checking
first.** 《奇門遁甲金鏡寶鑑》 has all three, and one 目錄 leaf plus five
contact sheets located every section of sixteen juan across 211 pages — the
three-page rhythm of its 局 sections being readable off a full-page contact,
which is what made eighteen headings one errand instead of eighteen.

**And a running title is not something a facsimile owes you.** 遁甲集成 第三冊's
版心 carries only modern hand numbering, so the method that named two works
inside 第六冊 by their running titles cannot be run on it at all. There a
section is identified by the heading of the first table on the leaf — which
names a table and not a work, and is why one finding off that volume carries
its attribution open.

**And where a facsimile does carry one, it need not carry the title on the
title page.** 《奇門遁甲金鏡寶鑑》's 版心 reads 奇門大全 and the juan, on every
leaf of all sixteen. That is what a survey navigates by and it is not what the
work is catalogued as, so a search of the shelf's register for the running
title finds nothing and a reader who trusts the 版心 names the wrong book.
Read both, and let the title page settle what the work is.

## What a file is, before what it says

**A shelf's description of a file is not evidence about the file.** This is the
rule the four readings behind this page produced most expensively, because
checking it costs seconds and not checking it cost a phase its purpose.

The works opened so far that turned out not to be what the shelf recorded, the
first six of them while this page was being written:

| recorded as | what it is |
|---|---|
| 《大六壬精解》, a modern manual | an anthology with a declared bibliography, marking its source per section |
| 《御定星歷考原》, and the second witness for the 神煞 | 卷一 of six, carrying no 神煞 at all |
| 《授時曆故》, 黃宗羲 | a 1982 reprint binding that title with three others |
| 《大六壬指南》, a reprint of the woodblock | a modern typesetting in simplified characters |
| 《御定奇門寶鑑》 第一冊 | one 冊 of eight, which its own record page states |
| 《遁甲演義》, a third scanned edition | 卷一 alone, which its closing leaf states |
| 《奇門遁甲秘笈大全》, 故宮珍本叢刊 第427冊 | that work in 二十三卷, and then a second the entry did not name: 《諸葛武侯行兵遁甲金函玉鏡》 in 六卷, a cursive manuscript hand |
| 《遁甲集成》第三冊, «奇門遁甲» | 遁甲符應經 from its p. 1136, and 年家 · 月家 · 日家 tables under no title leaf, dated to the Kangxi reign |

**《御定星歷考原》 is the case that matters**, because the work had been
acquired *in order to* be a second witness for about seventy quantities and the
copy held cannot be one. Nothing about the way it was catalogued would have
revealed that without opening it.

Not every file is wrong: 《曆法通志》 and 《太乙金鏡式經》 were exactly as
catalogued. The point is that which of the two a file is cannot be known from
the entry, and costs a minute to establish.

So, before a file is planned around: **`pdfinfo` for the page count, the last
leaf for the colophon, `pdfimages -list` for what the pixels actually are, and
a contact sheet for what the sections are.** The third of those can lie: on a
file whose pages are JPEG 2000 streams it reported 654×945 at 32 dpi where the
renderer produced 3063×4430, so where it disagrees with the eye, believe the
render. Four commands, under a minute, and
they establish extent — which is the thing a plan is a function of. A work in
six juan and a file with one of them are different objects and only one of them
is on the shelf.

**The printed page numbers say how many book-pages a sheet carries, and the
check is one subtraction.** 遁甲集成 第三冊 shows series page 1019 on its second
sheet and 1626 on its 306th: 304 sheets spanning 607 pages is two book-pages to
the sheet, where its sibling volumes carry one. Getting that backwards halves
the coverage of every contact sheet planned after it.

**Count pixels against what a page holds, not against the page.** The measure
above is pixels to a character, and the sheet's dimensions do not give it: a
故宮 leaf of 983 × 1530 carries *four* complete charts, so a character in their
rings gets about fifteen — under half the floor — while the prose beside them is
legible at the same nominal resolution. What a file can support is a question
about the densest thing on it that has to be read, and that is settled by
cropping one and looking.

**A tool that believes the metadata fails silently, and `ocrmypdf` believes
it.** It sizes its raster from what the PDF says its images are, so over
《圖解奇門遁甲大全》 — the same JPEG 2000 case — it announced «page image will
be rendered at 48.0 DPI» and returned thirty characters a page for 598 pages,
reporting no error of any kind. `--oversample` corrects the size and not the
decode: ghostscript then reports «invalid JPX header» and hands tesseract
noise, where poppler renders the same page clean. **On a JPEG 2000 file, then:
`pdftoppm` and `tesseract`, and no text layer written back into the PDF.**
Through poppler those 598 pages give 274 000 characters — 值符 802 times,
值使 316, 超神 37, 接氣 23.

## What the two cost

Measured on twelve cores, over equal page counts:

| | throughput |
|---|---|
| `ocrmypdf -l chi_sim` | 1.7 pages a second |
| `ocrmypdf -l chi_tra_vert` | 1.35 pages a second |
| `pdftoppm -r 300` | 1.9 pages a second |
| a page read off the plate | two to four a minute |

**The bottleneck is not the paper.** Rendering a plate costs what OCR costs;
what costs is that a plate is read one page at a time while an extract is made
unattended. On raw page throughput the ratio is between twenty-five and fifty
to one.

**Which is why they are a sequence and not a choice.** The reading that
produced the 六壬 entries went: 753 pages to an extract in seven unattended
minutes, the extract narrowed them to four candidate pages, four plates were
read, the finding came off the plates. Without the extract, the same coverage
needs about seventy-five contact sheets. Without the plates, the finding is
wrong or absent — and on one of those four pages, the sentence that mattered
was not in the extract at all.

The two failure modes are not symmetric, and that asymmetry is the reason the
order is fixed rather than a preference. **An extract fails silently**: nothing
found reads as nothing there. **A plate fails loudly**: an illegible crop is
visibly illegible, and the answer is to crop again.
