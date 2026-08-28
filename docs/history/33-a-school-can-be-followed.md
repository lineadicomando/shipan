# Phase 33 — a school can be followed, an edition can only be preferred

Phase 32 ended with a question it could not file. The Ming 南陽堂 recension
prints a third 四化 reading at 庚, and `sihua`'s one value is `quanshu`, named
for the work — so did a second value name a school, or an edition?

Answering it turned out to be a question about a rule rather than about a
parameter, and the rule was half-written.

## What the parameter set already said

`sihua: quanshu` carries the work's title as its own hanzi, and
`docs/parameters.md` had already declared the intended second value: «later a
lineage that has been read». So the scheme was (the book, a school that departs
from it), and the finding did not fit — 南陽堂 is not a lineage, it is the same
title in another recension.

The sweep of every declared value settled which way to go. **No value names a
recension, and the ones that name a work name it because the work is the
method**: `xiudu: shixian` and `shoushi` are two 曆, and a 七政四餘 practitioner
really does cast by one set of lodge degrees or the other. What no value has
ever meant is «this copy rather than that copy of the same book».

And there was a precedent for the other side, sitting in the register
unremarked: the 四庫 六壬大全 writes 己 and 巳 for each other, this engine reads
there as the sense requires, and no option was ever offered. An editorial
settlement, made once and argued.

## The test

> A school can be followed; an edition can only be preferred.

A person says «I cast by 拆補» or «I follow 中州派» and means a commitment they
could defend. Nobody says «I follow the 南陽堂 recension». Preferring one
witness over another is the work of whoever assembled the shelf, and offering
that choice to a caller would be the engine declining a job that is its own.

So the 庚 goes to the register, `sihua`'s second value will name a lineage when
one is read to the standard, and `CLAUDE.md` gains the half it never had.

## The amendment, and why it is not a loosening

The rule said **every** divergence is an explicit parameter. Taken literally
that was already false and rightly so — the 己/巳 emendation is a divergence
and has no parameter — and the falseness was silent, which is what made phase
32's question feel unanswerable. There was no sentence saying where the other
kind of divergence goes.

It now reads: every divergence *between practitioners* is a parameter; a
disagreement between witnesses to one text is not one of those, and is settled
once in the register.

**Narrowing it makes the first half bite harder**, which is the part worth
recording. While «every divergence» stood, a convention this engine follows and
another tradition does not could shelter under the same word as an editorial
choice. It cannot now: if two practitioners would draw different boards, the
divergence owes a parameter, whatever else is true about it.

## The debt that fell out

Applied in the other direction, the sharpened rule immediately found something,
and the code had already confessed it. Above `SPIRITS_YANG`, `plates.ts` read:
«Other traditions use one pair throughout, which is a divergence this engine
does not yet expose.»

The 八神's naming. This engine follows 陰陽異名 and renames the middle pair in a
yang chart, 白虎 → 勾陳 and 玄武 → 朱雀. Other traditions keep one pair in both
dun. And 《奇門遁甲全局》, read on the plate in phase 31, is a third: 白虎 at the
fifth seat, 勾陳 at the sixth. **Two conventions could be called one
implementation's preference; three cannot.** A chart from this engine says 勾陳
where that print says 白虎, and nothing in the output says which convention drew
it — which is exactly what «a chart carries the options that produced it»
forbids.

It is declared as a debt in `ROADMAP.md` § 1 rather than paid here, because
paying it means a field in 奇門's input type, and that touches the API, MCP, the
CLI and every shared URL — the thing `docs/parameters.md` opens by saying not to
do late. A debt named is a step of its own; a debt discharged in passing is how
input types grow badly.

Two further candidates are listed and deliberately not claimed: whether 天禽
stands at the centre or rides merged with 天芮, and whether the lodged stem
turns with its host on the heaven plate. The second may be one library's choice
rather than a school's, and establishing which is reading and not code.

## The audit, run in the same session

Declaring one debt is not evidence about how many there are, so the sharpened
rule was turned on the whole engine before the session ended: every admission of
divergence in `core` and in the register, through three questions — does it
change what the chart shows, could two practitioners hold opposite sides, is it
exposed and is it registered. `docs/parameters.md` now states those three.

Most of what it met was the rule already working, and that is worth recording
too: the 用神 mapping refused in `scan.ts` because «putting one of them here
would make a school implicit in the engine», 六壬's 課體 reporting nothing where
the sources disagree, `leapMonth` and `huoling` and `centreLodging` each carrying
their alternatives declared and refused. The engine was not sloppy; it had one
blind spot and the rule had been written wide enough to cover it.

**A second unexposed divergence, in a place nobody was looking.**
`dunjia/strength.ts` gives the four months that close the seasons — 辰, 未, 戌,
丑 — to earth entire, and records that other schools give earth only the last
eighteen days of each. The comment called that «the boundary and not the idea»,
which was true and beside the point: `seasonElement` feeds `strengthOf`, so the
choice decides 旺相休囚死 for every star and every gate, and the two readings
part for the first two-thirds of each of those four months. Nothing in a chart
says which drew it.

**And a third fault of a different kind.** 八字's `luckGranularity` — `shichen`
against `minute`, ten days apart on when the first decade opens — *is* exposed,
on `BaziOptions`, with a default. But there is no `BAZI_PARAMETERS`: it is
absent from `PARAMETERS`, from the parameters page and from anything a surface
builds out of them. The divergence is honoured and the registry does not know
it, which is a smaller fault than the other two and a differently-shaped one.
Fixing it is additive; fixing them is breaking.

## The two candidates, claimed the same day

Phase 33 left two things named and not claimed — whether 天禽 stands at the
centre, and whether the lodged stem turns with its host — each waiting on a
witness. A probe of the searchable dunjia texts found one before the session
ended, and it was cheaper than any plate: 《奇門遁甲元靈經》 works two examples
out in full, with the 局, the whole earth plate, the 值符 and the 值使 for each.

Run against the engine cell for cell, the earth plates agree palace for palace
and both examples agree on the 值符 star and on the 值使 gate and its palace.
The second agrees entirely: 「艮宮戊加中宮辛為值符…又以天任加中」 is this engine's
戊 and 天任 arriving at 坤二 with 辛 lodged there, which is the same board said
the other way round.

The first parts, at one thing. Where the 符頭 stands in the centre — 陽九局,
甲寅癸在中宮 — the text carries the centre's 癸 and its 天禽 to 兌 with their
host, and this engine leaves them at the centre and carries only 坤's own 庚 and
天芮. The outer eight agree either way.

**So it is not a defect**, which was the possibility worth ruling out first: the
engine's behaviour is deliberate, self-consistent and already written down in
`PalaceContents.lodged`, which says in as many words that schools who glue the
lodged stem to its host derive a different plate. What is new is somebody
stating the other side rather than an implementation choosing it.

**And the two candidates are one.** A board whose centre empties and whose host
palace carries a second stem and a second star is what «天芮 and 天禽 merged into
one cell, the centre starless» looks like from outside. One parameter covers
both, and 奇門's owed field now has three values' worth of divergence behind it
— which is the argument for paying them together rather than one at a time.

The witness is a transcription of unstated provenance from a defunct archive,
and the register weighs it as it weighed it before. What raises it here is the
kind of passage rather than the copy: a text checking itself, which is the
second of the two things the standard accepts. A print is still wanted before
the value is implemented.

## The corroboration, and what it found in the register

The witness was a transcription, so two classical ones were asked to stand
beside it. They corroborate everything around the divergence and not the
divergence: 《統宗》 states the lodging twice and gives the centre's decade
「天禽為符，死門為使」, which is what this engine computes; 《秘笈大全》 says
「惟天禽則無定位，寄西南而屬中宮」, which is both of this engine's positions in
one clause. Neither says what the turn does with the centre's occupants.

The fused name settled nothing either, exactly as `docs/scans.md` says an
extract cannot: 芮禽 appears in 元靈經's omen verses as one name for the pair and
in the 圖解 extract as a chart cell, including in a 伏吟 board — and a board
drawn without a separate centre cell shows 芮禽 together under either
convention, because this engine reads the centre at its host too.

**What the pass did find was in `docs/sources.md`.** One reference is recorded
there as agreeing with this engine «cell for cell — the turn of the heaven
plate, the nine stars» over 260 charts, and four paragraphs later as one that
«merges 天芮 and 天禽 into one cell and leaves the centre starless where this
engine keeps 天禽 at the centre». Both cannot be true as written.

Measured across every pairing of a 符頭 with an hour stem, the engine's 值符 star
fails to land on the hour's palace in **192 of 972** — every one of them a
pairing where palace 5 is one end or the other. A 260-chart comparison would
have met that many times over. So either the comparison did not reach the centre
cell, or «the nine stars» meant the eight outer palaces.

That is the audit's most uncomfortable result, and it is not about the shelf. So
the verification was run rather than scheduled.

## The verification, and how it turned out

`qimen-dunjia` is on the shelf as a tarball with a row in `docs/provenance.tsv`,
so it can be run. It was, over 666 charts across 2024 — six hours a day, every
third day — cast on 120°E with no true-solar correction and the day turned at
子時, which is how it reads a time.

The ju agreed on all 666, and the earth plate, the heaven plate and the nine
stars agreed on all 666: 519 where neither stem is in the centre, 64 where the
hour's is, 74 where the 符首's is, 9 where both are. **The 147 charts that put a
stem in the centre are the ones the question is about, and they agree.**

The run also measured the thing that had looked like it might be a rule. Does
the 值符 star land on the hour stem's palace? In the reference it does in 519 of
519 where neither stem is in the centre, in 9 of 9 where both are, and **in none
of the 138 where exactly one is** — which is what this engine does. So the
reading that 值符隨時干 holds unconditionally is what the 元靈經's worked example
assumes and what neither runnable implementation does.

**The verification weakened the case it was run to test, which is the right way
round.** Before it, one worked example stood against an engine whose evidence
was in doubt. After it, the same worked example stands against an engine and a
runnable reference that agree over 147 charts of exactly this case. 元靈經 is not
made wrong by that; the other side is made better attested than the register
could previously say. And the register's overstatement is corrected where it
stood: a reference that leaves the centre starless cannot have agreed about the
ninth star, so what those 260 charts confirm is the eight.

## What this phase did not decide

Whether to pay any of it. The 全局 reading is a day old and rests on one print,
and the two input-type changes want to land together rather than one at a time.
The roadmap holds all three, sorted by what they cost.
