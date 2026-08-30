# Phase 37 — the pair and the plate

`centreTravel` was the last refused value that was not short of a witness. Both
sides are in Qing imperial print, and `ROADMAP.md` § 1 had it in a bucket of its
own: **a shape in the engine**, waiting on a change to `PalaceContents` rather
than on a text. What it was written down as wanting was a palace able to carry
two stems and two stars, «since a centre that travels arrives somewhere already
occupied».

It wanted nothing of the kind. This is the record of that, because the way the
entry came to be wrong is worth more than the change it asked for.

## What the entry had read

The print that states the far side, 《奇門遁甲金鏡寶鑑》, also *draws* its board
with 天禽 and 天芮 in one cell and the centre starless. `docs/sources.md` had
already filed that under the three conventions the work does not share with this
engine — a way of presenting a board, listed beside its writing 白虎 in both dun
and its correcting no clock to the Sun. The ROADMAP entry took it for the
doctrine instead, and a presentation convention read as doctrine is a shape
inferred from a picture.

**The doctrine is a clause, and it is on the leaf before the tables.** 卷之一,
series p. 266:

> 天符廉貞五黃，其星寄。二五同宮，其志不同。行活局，符使不必寄於二，徑排入中宮。

It separates in one sentence what the entry had merged. 其星寄 — the fifth
palace's star is lodged, and stays lodged. 符使不必寄於二 — the *moving* 符 and
使 need not lodge at 坤二 and go into the fifth palace itself. 「二五同宮，其志
不同」 is the two coming apart, said outright. And 「不必寄於二」 presupposes the
other answer, which the second imperial print gives in the same words:
「甲辰在中宮，寄於坤二」.

So the divergence is where the 值符 and the 值使 are **read**, and it touches no
plate. Neither value moves the heaven plate, the star plate, the nine stars, the
eight gates or the eight spirits. A test asserts that rather than trusting it.

## What was found on the way

Three answers to «where is the 值符» were live in one chart object, and only two
of them were known about.

- **The star plate** carries the named star to a palace, lodging the centre out
  because the ring of eight has no seat for it.
- **The `chief` field** named a palace of its own, unlodged, and therefore
  disagreed with the plate under it on **116 charts of 732** sampled across
  2024. The CLI printed that disagreement as two adjacent lines: `chief 天輔 →
  中五` above a grid showing 天禽 at 中五 and 天輔 at 坤二. So did the drawing's
  foot caption.
- **The doctrine** is neither: it is about the designation, and the clause above
  says the plate is not part of the question.

The collation recorded in `docs/sources.md` — twenty palace disagreements over
陽遁一局's 120 cells — had been counted against the star plate. That is a fair
comparison and it is not this parameter's; the same is true of the 666-chart run
against `qimen-dunjia`, which asked two implementations a question neither side
of the divergence puts to a plate. Both entries are corrected there. **No rung
moves, because no source arrived** — what arrived was a reading of one already
held.

## What it cost

One `lodge()` call moved out of `chiefGatePalace` and into its caller, so that
the ring the eight gates are laid round and the seat the 值使 is reported at stop
being one number. Then two lines choosing between the raw landing and the lodged
one. No field, no API break, no cell in the drawing, and the form gained a choice
with two sentences under it.

`stay` stayed the default and its behaviour changed on the 116: it now reads
值符 天禽 → 坤二 where it used to name a palace its own board denied, which is
《御定奇門寶鑑》's sentence rather than a straddle.

## What to carry

**A picture of a board is not a statement about it.** The register already knew
this print draws its centre differently and had said so under the right heading;
the ROADMAP entry, written from the same reading, treated the drawing as the
rule. The entry that names a convention and the entry that names a doctrine have
to be the same entry, or the second one gets written from the first.

**A field that answers a question the plates also answer will drift from them.**
`chief` did, for as long as the board has existed, and nothing failed — because
no test compared the two. The test that now does is worth more than the fix.
