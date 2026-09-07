# Phase 45 — the hexagram of a palace, and a refusal that was drawn in the wrong place

Phase 44 drew the trigram of each palace. This one takes the gate standing over
it, sets the gate's trigram above and the palace's below, and names the
hexagram: eight per board, sixty-four in all, the centre having no gate.

## The refusal this reverses, and why it was wrong

It was written one commit earlier, in `docs/refusals.md`, and it declined the
name along with the reading. The argument was that «a name without its rooms is
worse than neither» — that printing 渙 over the north and stopping would invite
a reader, or a model, to furnish the rooms from the 易經.

**That argument proves too much.** This board prints 天蓬 and does not say what
天蓬 means. It prints 休門 and hands the errand to the one table the manuals do
not dispute. It prints 空亡 with a fortune and no prose at all. Naming a
configuration and declining what a school reads in it is not an exception here,
it is the method — and a refusal that would have been fatal to 門迫 had it been
applied to 門迫 is a refusal aimed at the wrong thing.

**What survived the re-reading is the risk, not the conclusion.** 渙 does have a
second life in a far more famous book, and that is a real difference from 天蓬.
The answer to it is provenance, not silence: the note under the table names the
work and the chapter, and `docs/agent-prompt.md` tells a model in the imperative
to name the hexagram, say who names it that way, and stop. Declining to print
something the engine computes correctly would not have made anybody safer.

The other half of the refusal stands unchanged and is now stated on its own
terms: the 《象》, the 卦辭, whether the hour favours 主 or 客, the 類神 and the
克應 are the 用神 chosen, the palace ranked and the outcome dated.

## What the register had to say

Almost nothing about the sixty-four themselves. Their arrangement is the
周易's, closed and self-checking — each name once, the eight doubled trigrams
where they belong, every figure the one its number gives at U+4DC0 — and it is
not a fact about 奇門 at all.

**What the register weighs is the orientation**: which trigram goes above. That
is this chapter's contribution and it rests on eight cells read on the plate,
agreeing with each other and with nothing else, no second work on this shelf
pairing the gates this way. Rung 4, and the eight cells are asserted in
`test/hexagram.test.ts` so that a wrong orientation fails rather than prints.

## The identifier, which is the first of its kind here

Toneless pinyin, tone-numbered where two names collide, cannot reach this set.
Six of the sixty-four collide; five come apart under a tone number; 履 and 旅 do
not, being both lǚ in the same tone, and no suffix built out of the reading ever
will. The tradition indexes them by the King Wen ordinal, so the ordinal is the
identifier and `label.hexagram.44` is the key. Each of the sixty-four catalog
lines carries the name and the reading in a comment, because a key made of
digits is otherwise unreadable to whoever edits the line under it.

## Where it is written

`hexagram.ts` in `dunjia/`, with the received table and the eight names; a
`hexagram` field on `PalaceContents`, absent with the gate. The CLI grows a
fourth palace table and the section a second one, under the palaces and above
the configurations.

**The note goes under the table and not over it.** Eight rows with a column of
paired trigrams say what the pairing is before any sentence could; a heading
would announce a table that announces itself, and a reader who has followed the
rows arrives at the note wanting the source rather than the instruction.

## A rule that came out of writing the Italian

`docs/i18n.md` now says a vernacular is punctuated in its own conventions rather
than translated through another's: the em dash is English, and Italian makes the
same turn with a comma, a colon, a semicolon or parentheses. It is distinct from
the older rule that keeps a dash away from a glyph, which binds both catalogs
because 一 is a character. The ninety-six dashes already in `it.ts` are a debt in
`ROADMAP.md` § 6 and no test asserts the rule until they are swept: a guard that
fails ninety-six times the day it lands tells nobody anything.

## And the block naming the schools, which nobody could read

A separate change, in its own commit. The lines under the drawing that say
which school laid the board were set at the readings' size and *shrunk* to one
line each where they would not fit. Two of them are long — the pair of spirits a
yin board renames, and the palace the 值符 and the 值使 are read at when the
count puts them in the centre — so the two most consequential sentences on the
sheet were the two nobody could read.

They are now folded rather than shrunk, at the configurations' size and rhythm
rather than the readings'. The argument for the readings' rhythm had been that
both are lists of the same kind; they are not, and the difference is how each is
used. A reading is consulted one name at a time and can be the smallest thing on
the paper that is still meant to be read. A school is a sentence read through
once, and 「A declared default is not a hidden school」 is the whole reason the
block is on the drawing at all.

`fit.ts` already had `folded` for this, written for the 太乙 note, and its own
comment states the case: «shrinking a sentence to fit a sheet makes it a
sentence nobody reads». What was missing was that the block's depth has to be
known before the layout is settled, so the fold now happens against the
provisional geometry, which is the same two-pass shape the readings band uses.

**One Italian em dash is left standing.** `divergenceLines` joins a label to its
value with `—`, and by the rule added above it should not, in Italian. It is not
a catalog string but a separator in `format.ts`, and what replaces it is a real
choice rather than a substitution: a colon collides with the colon several of
the glosses already carry. Left for the sweep, and named here so it is not
mistaken for an oversight.
