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

## What this phase did not decide

Whether to pay the debt now. The 全局 reading is a day old and rests on one
print; the roadmap holds the errand and the next session can weigh it against
carrying on with the shelf.
