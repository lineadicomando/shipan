# Phase 44 — the trigram drawn as well as written

The nine palaces were already trigrams and always had been: `id` is the
trigram's toneless pinyin, `hanzi` is 坎, `element` is what the trigram is made
of. What the board printed was the name. This phase prints the figure beside
it — ☵ 坎 — everywhere the palace is already printed.

## Why it is worth a field

**The board has one thing on it a person can read off the shape.** Everything
else in a palace is a name: 天蓬 is a name, 休門 is a name, 空亡 is a name, and
a reader with no Chinese meets each of them as a shape to be looked up in the
band under the drawing. A trigram is not like that — three lines, broken or
whole — and the figure is the tradition's own second way of writing it, not a
gloss this project invented.

**And the centre is not one.** 中 written in hanzi sits in a row with 坎 and 離
and reads as the ninth of a set of eight. It is a seat and has no lines, and
the field's absence there says so on the paper for the first time. That is the
half of this change that is not decoration.

## Where it went

`Palace` in `dunjia/palaces.ts` gains `symbol`, optional, written out for the
eight and absent for the fifth. `TAIYI_PALACES` takes it by destructuring, as
it already takes the hanzi, the reading and the direction — 太乙 numbers its
palaces one seat off the 洛書 and calls the trigrams the same things.

The two shared renderers do the rest: `glyph()` in `core/format.ts` and
`glyph()` in `apps/web/src/lib/glyph.ts` put the figure ahead of the name, so
every table on every surface that already printed a palace prints it now
without being edited one at a time. In the drawing, `register()` sets it at
`SYMBOL_SCALE` ahead of the hanzi and in the palace's own phase colour: it is
the name in the other hand, not a qualifier of the name.

**Not in the band of readings.** That band answers how a name is *said*, and a
figure adds nothing to that. The palace register carries it and the band is
unchanged.

## What the fonts made of it

**`fonts-noto-cjk` does not cover U+2630, and neither does any Noto CJK or
DejaVu Serif face.** The image built here installed that package and nothing
else, so the first PNG with a trigram in it would have come out with eight
blanks or eight boxes. Two things follow.

The image now installs `fonts-dejavu-core` beside it, which covers the block.
And `png.ts` gains a third probe — but the third one **reports where the first
two throw**, and that difference is the argument. A palace with no hanzi is an
empty palace and a band with no tone marks is half a drawing; both stop the
render and name the package to install. ☴ is 巽 in the other hand and 巽 is
still there, so `undrawn()` drops the symbols and draws the chart. Refusing to
draw a board at all over a lost mnemonic would be the graver answer to the
smaller fault, and nothing goes silently missing: the palace reads exactly as
it read before the field existed.

## The version

The fascicle answered question 1 without being asked: `canonical/qimen.json`
and `canonical/taiyi.json` diff by a field that appeared, which is the second
term. 0.2.1 becomes 0.3.0.
