---
name: reader-copy
description: Use when WRITING or REVISING prose a reader reads — a string in the en/it catalogs, a section lead or intro paragraph, a meta title or description, the offline page, README. Diagnoses the compression that makes house prose unreadable on one pass (headless lists, dropped verbs, unnamed things, closing reversals) and gives the fix for each. Triggers: section copy, catalog string, lead paragraph, meta description, intro, rewrite this text, make this clearer, README prose.
---

# Prose a reader reads

This governs the strings somebody reads on a page: the two catalogs
(`packages/i18n/src/catalogs/en.ts`, `it.ts`), the titles, descriptions and
intro paragraphs `apps/web/src/lib/meta.ts` holds, the notes leads, the
offline page, `README.md`.

It does **not** govern `CLAUDE.md`, `docs/`, catalog comments, code comments
or commit messages. Those are written for somebody who is arguing about the
project, and their compressed register is deliberate.

## The standard

**One pass.** The reader gets the sentence on the first reading, without
going back to the start of it to place a pronoun, supply a missing verb, or
work out which of two things "the other" is.

That standard costs words. The corrected version of a paragraph is typically
20–30% longer than the compressed one, and that is the price. The one place
it cannot be paid is `meta.description`, budgeted at 90–155 characters by
`apps/web/test/meta.test.ts`: there, **drop a claim rather than compress a
sentence**.

## The seven moves that break it

Each is drawn from copy that shipped. The «before» lines are real.

### 1. The headless list

A sentence made of indirect questions with no main clause, so the reader has
to supply the verb before they can start.

- before — «Che cosa calcola questo motore, su che cosa si regge ogni numero,
  e con quanta forza.»
- after — «Questa sezione descrive che cosa calcola il motore, su quali
  elementi si basa ciascun numero e quale grado di solidità ha il relativo
  riferimento.»

Give the list a subject and a verb to hang from.

### 2. The dropped verb

Ellipsis in the second half of a coordination. Elegant, and it makes the
reader reconstruct the clause.

- before — «ma non tutte su qualcosa di ugualmente solido»
- after — «ma non tutti i riferimenti hanno lo stesso grado di solidità»

**Repetition is cheaper than reconstruction.** Repeat the noun, repeat the
verb.

### 3. The unnamed thing

An indefinite or a pronoun standing where a noun would do: «qualcosa di
esterno a sé», «le une e le altre», «qui dentro», *what each number stands
on*.

- before — «verificata su qualcosa di esterno a sé»
- after — «verificata attraverso un riferimento esterno»

If the sentence introduces two classes, name them before referring back to
them. «Le une e le altre» is only readable if both were nouns first.

### 4. The metaphor doing a definition's work

`reggersi su`, *to stand on*, *how strongly* — a verb carrying a concept the
reader has to unpack before the sentence resolves.

Keep the house term where it **is** the term: a board is *posata* or *stesa*,
never «generata»; a source sits on a *rung* of the evidence ladder. Replace
the metaphor where it is only ornament: `si basa su` and `grado di solidità`
cost nothing and are read at once.

### 5. The silent subject change across a colon

- before — «Niente in questa sezione è una lettura: è il resoconto dello
  strumento.»
- after — «Non contiene interpretazioni o letture: riporta esclusivamente il
  funzionamento dello strumento.»

The colon may stay. Both sides must read as complete statements, and the
subject must not change under it — in the «before», it goes from *niente* to
an unwritten *questa sezione*.

### 6. The buried main clause

A long left-branching subject the reader has to hold before the verb arrives.

- before — «Dire quali sono le une e quali le altre è il compito di questa
  sezione»
- after — «Questa sezione serve a distinguerli.»

### 7. The closing reversal

The point delivered as an antithesis or a chiasmus the reader must resolve.
This is the most seductive one, because the reversed sentence is usually the
best-sounding line in the paragraph.

- before — «un lettore che non riesca a distinguerli è stato fuorviato dalla
  presentazione, non dai dati»
- after — «Rendere chiara questa distinzione è necessario per evitare che la
  presentazione dello strumento faccia apparire come equivalenti dati che non
  lo sono.»

State the consequence forward. One aphorism in a section is a voice; three is
a wall.

## Two supporting rules

- **One sentence, one claim.** A 60-word sentence carrying three claims
  becomes three sentences. The paragraph above splits into: what the section
  does · the references differ · that difference matters, and why.
- **Mark an example as an example.** «Un termine solare e una tavola
  tramandata, **per esempio**, appartengono a…» — without the marker the
  reader spends a clause deciding whether this is the general rule.

## Both catalogs, twice

`en.ts` and `it.ts` are argued separately in the language of each — the same
compression is usually present in both, because the English was written first
and the Italian followed its shape. Fix the English sentence, then write the
Italian one; do not translate the fix. → [`docs/i18n.md`](../../../docs/i18n.md)

## What does not relax

Fluency is not a licence over anything else the copy is held to:

- the refusals — no copy promises a reading, a ranking, or an outcome
  → [`docs/refusals.md`](../../../docs/refusals.md)
- the words `apps/web/test/meta.test.ts` forbids: `oracle`/`oracolo`,
  `fortune`, `predict`/`predice`, `destiny`/`destino`, `responso`
- house vocabulary — *carta*, *quadro*, *tavola*, *lezioni* and not *colonne*,
  *dimore* and not *mansioni*
- glyphs beside a reading beside a gloss, never a glyph alone
- the title budget and the 90–155 description budget

## Before finishing

1. Read the draft once, at speed. Mark every point where you went back.
   Each mark is one of the seven moves; find which.
2. Check each sentence has a subject and a finite verb.
3. Check every pronoun and every «l'altro / the other» has a noun behind it,
   in the same sentence or the one before.
4. Count aphorisms. More than one per section is the wall.
5. `npm test -w @shipan/web` — meta budgets, vocabulary and forbidden words
   are all asserted there.
