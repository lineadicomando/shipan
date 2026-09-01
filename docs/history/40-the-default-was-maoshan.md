# Phase 40 — the default was 茅山

*Done. Revises phase 3, which shipped `yuan` as a divergence inside 拆補, and
the register entries that were written to it.*

The engine computed 茅山 by default, under the name 拆補, from the day dunjia
was first cast until this phase. It refused `method: maoshan` at the same time,
with a message saying no reference to 茅山 existed anywhere in the world.

## What the search was for, and what it found instead

The question put to the shelf was whether any held text states the 茅山 rule,
after `qimen/qimen-qiwu.pdf` — 劉文元《奇門啟悟》 2008 — turned up stating it.
Three answers came back and the third was not about the shelf.

**唐頤《圖解中國傳統決策學·奇門遁甲大全》** (西安: 陝西師範大學出版社, 2009.9,
ISBN 978-7-5613-4832-1) states it complete, with both edge cases, and had been
on the shelf since 2026-08-13 catalogued as «a modern manual». Its p. 127
carries the branch under its name in a 白話圖解 box — 不置閏 splitting into 拆補法
and 茅山道人法 — and p. 128 carries the rule in the body, with the two cases
named 取 and 舍. So the register's claim that 奇門啟悟 was «the only text on this
shelf that states the 茅山 method» was false the day it was written.

**`shenqi-zhimen-paiyin`** appeared to be a third statement and is not one. It
was catalogued as 神奇之門 «retyped entire», bought so the plate transcription of
pp. 73–81 could be collated. Its own contents leaf has 上篇/下篇 where the book
has 上編/中編/下編; 无闰派, the term 張志春 uses for the pair of branches, occurs
zero times in it; 拆补 occurs twice against a chapter devoted to it; and none of
the sentences the plate carries at pp. 73–74 are in it. It is an abridgement
circulating under the book's name, so its 茅山 sentence is not 張志春's — and the
plate confirms he does not state the rule there, only dismisses it.

**`kaiwu-zhimen`** — 《奇門遁甲開悟之門》, the same author's second book, held on
the guess that he would expound it there — was OCR'd whole and does not. It
names the method once, at p. 70, to say he does not deny its accuracy and that
students of his cast by it.

## The finding that was not on the shelf

Writing the rule out as a function to implement it made it the same function
the engine already had. 茅山 is `min(2, ⌊days since the term ÷ 5⌋)`; `yuan:
'term'`, the shipped default inside 拆補, was `Math.min(2, Math.max(0,
Math.floor(daysIntoTerm / 5)))`.

Run against an outside implementation over the 4368 時辰 of a tropical year:

| the engine, cast as | vs 茅山 | vs 拆補 |
|---|---|---|
| `chaibu` + `yuan: term` — **the default** | **100.00 %** | 47.66 % |
| `chaibu` + `yuan: futou` | 47.66 % | **100.00 %** |

The sources put the boundary in exactly that place, and all three of them put
it there in the same words. 劉文元 parts 茅山 from 拆補 on one point — 「根本不去
考慮日支的子午卯酉為上元」 — 唐頤 says the method 「打破了根據日干支符頭確定三元的
規律」, and 神奇之門 p. 74 defines 拆補 by two conditions at once, the three yuan
inside each term **and** the 甲己 cycle. Read the yuan anywhere but off the 符頭
and there is no 拆 and no 補 left; the name stops describing anything.

## What was wrong, precisely

Not the charts. Every chart the engine ever cast was a correct chart of some
school, and the references it was checked against — `qimen-dunjia` over 160
charts, the eighteen published earth plates — check what they always checked.
What was wrong was the name on them, and the four things that followed from it:

- `docs/parameters.md` and `ROADMAP.md` said 茅山 had no reference in the world
  while the default computed it;
- `docs/sources.tsv` filed the quantity under `yuan: term`, so a surface
  weighing it read the wrong school off the register;
- `docs/sources.md` called `qimen-dunjia` a 拆補 reference and called the
  kinqimen divergence «a school divergence *inside* 拆補»;
- and a reader who chose the default because the sources argue for 拆補 — which
  they do, and which this project says it follows — got the other one.

**Nothing in the design could have caught it.** `CHART_PARAMETERS` says which
values are offered and cannot say that two entries name one rule.
`requireImplemented` refused `maoshan` correctly and the refusal was true of
the value and false of the engine. The tests compared the engine against
references that agreed with it, and they agreed because they implemented the
same method under the same wrong name. What caught it was writing out a rule
found in a book and recognising the code.

## What moved

`yuan` is gone rather than aliased. Its two values are two `method` values, and
keeping it as a second way of naming one would preserve the condition the
mistake grew in. An address carrying `qimen.yuan` is refused by name —
`UNKNOWN_IDENTIFIER` — rather than dropped in silence and answered under a
school it did not choose, which is why `readOptions` now refuses any `qimen.`
name the declaration does not carry.

The default stays `chaibu` and now computes 拆補. **Every default chart the
engine answers has changed**, which is the correction and not a side effect.

`method: maoshan` is implemented and stands on the runnable rung: an
independent implementation run over a year, plus two printed statements a year
and a jurisdiction apart. What it does not stand on is the attribution — the
歌訣 劉文元 credits to the 茅山道士 has no edition, no manuscript and no second
witness. The rule is attested from 2008; who used it is not attested at all.

## What this phase says about the rules

`CLAUDE.md` says a school is axes and never a bundle, and that no school is
implicit. Both held here and neither helped, because the failure was upstream
of them: a divergence was declared **inside** the wrong parameter, and once it
was there every rule about declaring it was satisfied. The test a parameter has
to pass to be *inside* another is now stated where `leap` uses it — both values
must still be the same method by every other measure — and `yuan` failed it.

The register keeps `futou` as a precedent, with the sign reversed. It used to
be cited as the good case of a value named for a rule rather than for a school;
it is now the case that shows how a school gets filed as a rule.
