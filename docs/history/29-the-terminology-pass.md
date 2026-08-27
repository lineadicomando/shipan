# Phase 29 — Every glyph a person reads is said

`ROADMAP.md` had carried this since the notes were built: **a rule this
project already states and nothing enforces.** The engine keeps it — every
named thing travels as an identifier, its hanzi and its reading, and
`pinyin.test.ts` holds the lot to one toned syllable a character. The
catalogs, where prose is written by hand, kept it wherever somebody had
happened to remember.

This phase closes that, and the deliverable was always going to be the test
rather than the fix.

## The measurement was wrong the first time, in the interesting way

The roadmap's own estimate — «perhaps a dozen strings per language» — came
from a count taken in August 2026 by asking which messages carrying hanzi
carried no tone-marked vowel anywhere in them. That returned 41 English
messages and 17 Italian ones, and the asymmetry was the tell: **the two
catalogs say the same things, so they cannot disagree by a factor of two.**

They do not. Italian is a language of accented vowels, and `à`, `è`, `ì`, `ò`,
`ù` are the same codepoints a reading is spelled with. «lo 行年 avanza da una
nascita e non si può chiedere prima di essa» has an `ò` in it, three words
after the name and belonging to `può`, and a search for a tone mark anywhere
in the message finds it and calls the name read.

Measured properly — each run of glyphs against the word standing immediately
behind it — the two catalogs agreed: 37 messages in English, 33 in Italian,
about three times the roadmap's estimate. **The fix ended up touching 42 in
each**, the extra ones being places where a name was already half-said or said
in the wrong order.

That collision is not a footnote. It is why the guard that shipped is a test
holding names to a *list of the readings this project uses*, and not a rule
that looks for tone marks and hopes.

## What was already there, and what was missing

`names.ts` existed, from the phase immediately before this one: it finds a
reading inside a finished sentence so that `Named.svelte` can set the glyphs
in the CJK face and the reading in italic, without putting markup in the
catalogs. Finding rather than marking was the right call and this phase did
not revisit it.

What was missing is that its test read **the introductions only** — a dozen
messages, the ones the typography phase had touched. The rule it was checking
was «a reading found is a reading this project uses». The rule nobody was
checking is the other direction: **a glyph shown is a glyph said.**

So `names.test.ts` grew the second direction, over every message in both
catalogs, and the shape of it is half derived and half written:

- **`engineReadings()` digs every `{hanzi, pinyin}` pair out of `@shipan/core`**
  — gates, lodges, stars, stems, branches, parameters' values. Those readings
  are already decided facts held by `pinyin.test.ts`, and copying them here
  would be a copy to keep. A board landing with names of its own is covered
  the day it lands, which an enumeration would not have been.
- **`READINGS` is written out, and is the smaller half**: what prose names and
  no board seats. The arts said in short (奇門, 六壬, 太乙), the things this
  project refuses to compute (用神, 年命, 主, 客), the three kinds of
  instrument (卜, 命, 天), two books, one man, and the collective names of two
  almanac layers whose members the engine knows one by one. Each is a fact
  about the language, not about the code: 拆補 is chāibǔ whatever this
  repository does next.

## Four kinds of miss, and only the first was simple

**A name inside a sentence** — 行年 in an error, 子時 in a form, 用神 in a
note, 貴人 in a label. The reading goes behind the glyphs and the sentence is
otherwise untouched. About half of the 42.

**Stems and branches enumerated.** «甲 con 戊 e 庚, a 丑 e 未» is five names in
nine words, and reading all five makes a line nobody finishes. It was done
anyway — «甲 jiǎ con 戊 wù e 庚 gēng, a 丑 chǒu e 未 wèi» — because the
alternative is the rule holding except where it is inconvenient, and because
the reader who cannot say 丑 is exactly the reader that option is for. If the
density is ever judged too high the answer is fewer names in the sentence, not
unsaid ones.

**Titles and a person.** 《紫微斗數全書》, 《全集》, 《捷覽》, 《遁甲演義》,
《太乙金鏡式經》, and 湯若望 — Johann Adam Schall von Bell, who has a Chinese
name because he took one. Two consequences for `names.ts`, and both are one
line each: the brackets a book wears belong to the glyphs and not to the
sentence, so they travel with them into the CJK face; and a reading may carry
a capital, because a man's name is capitalised in the alphabet it is written
into and nothing else this project prints is.

**A name not shown at all**, which the measurement could not see. The notes
described 宿 as «the twenty-eight lodges» and 建除 as «the officer of the
day», with no name beside either, where every other surface pairs them — and
`shensha` appeared as bare pinyin with neither glyph nor gloss, which is the
worst of the three shapes, since it is unsayable *and* unlookupable. Named
now: 宿 xiù, 建除 jiànchú, 神煞 shénshà.

## One rewrite was caught by a test that predates it

`cli.value.ziweiSource` is the line that says where every star on a 紫微斗數
board comes from, and it had eleven runs of glyphs in it — a title, two rival
books, two stars, a pair, a god, a stem, a transformation. Reading all eleven
would have doubled a line already at the limit, so it was rewritten to name
the divergences in words instead: «two stars taken off the hour, a pair seated
off the stem, a god taken off the year, and one of the four transformations».

That is a better sentence and it dropped 卷二 with the rest. Two tests — one
in `core`, one over the HTTP surface — assert that the output contains it,
because **the roll is half the citation**: 《紫微斗數全書》 without it names a
book, and the book is not where a reading is checked. The tests were right and
the rewrite was wrong; 卷二 juàn èr went back in.

Worth recording because the instinct in that moment is to fix the assertion.

## What this did not touch

The engine, the boards, the register, the sources. No quantity moved and
`docs/sources.md` is untouched. The prompts are untouched too, and that is a
decision rather than an omission: they are excluded from the test **by
prefix** — the reader of a `prompt.` message is a model, which does not need
to pronounce 命宮 to work with it, and a reading there would lengthen a prompt
without adding anything read off it.

`docs/i18n.md` gains the rule, since it owns the subject. `ROADMAP.md` loses
the entry.

## What this leaves for the glossary

Nothing, and that was the second half of the roadmap's argument: the glossary
was on probation behind this pass, because most of what would send a reader to
one is a name shown without its reading — a bug where it appears, not a gap in
a list. The pass is done and the entry was already gone before it: the
glossary was struck from `ROADMAP.md` in this same session, on the rule in
`CLAUDE.md` that the interface must be usable without one.
