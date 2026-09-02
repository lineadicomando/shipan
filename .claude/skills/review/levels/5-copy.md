# Level 5 — copy and prompts

**What it owns.** The two catalogs (`packages/i18n/src/catalogs/en.ts`,
`it.ts`), `apps/web/src/lib/meta.ts`, the notes leads, the offline page,
`README.md` — and, separately, the `prompt.` messages and everything
`docs/readings.md` binds.

**Why it is last.** It moves the most and constrains the least. Copy written
before the levels above have settled is copy rewritten.

**Two readers, two standards.** A page is read by a person; a prompt is read by
a model. The rules diverge on exactly this, so the two halves below never share
a pass.

## Read before judging

- the `reader-copy` skill — it owns the diagnosis and the fix for prose a
  reader reads, and this level does not restate them
- `docs/i18n.md` § "Four kinds of string, four treatments" and § "Who is
  reading"
- `docs/readings.md`, all of it, before touching a prompt

## Already asserted by a test

- `packages/i18n/test/catalogs.test.ts` — catalog parity
- `apps/web/test/catalog-keys.test.ts` — that the catalogs carry nothing nobody
  reads, and that every key has a reader
- `apps/web/test/meta.test.ts` — an entry for every indexable address, none for
  anything else, and the description budget
- `apps/web/test/docs.test.ts` — the counts the prose states
- `apps/web/test/names.test.ts` — that every name's reading is marked, and
  glyphs standing without one are found
- `packages/core/test/prompt.test.ts` — the transcript and the prompt

## The passes a reading makes — prose a reader reads

**One pass.** The standard and the seven moves that break it are in
`reader-copy`. Findings are per string, quoted, with the move named.

**A limit stated as a fault.** The subject of the sentence is what the engine
has, does or hands over; a negation follows as evidence rather than leading.
«What is missing», «what you failed to enter» — each reads as an apology for a
fault the reader had not suspected, and the effect survives every hedge. The two
exceptions on a page are the privacy inventory and a legal notice.

**A name printed as a shape.** Level 4 catches the control; this catches the
string — an option reading `zishi`, a hanzi with no gloss and no reading beside
it.

**A sentence that is no longer true of the engine.** The written half is small
deliberately, and every written entry shows the date it was last checked. Take
the paragraphs whose date is oldest and read them against what levels 1–3 just
established. A paragraph that should have been derived — the list of boards, the
parameters, the counts, the spans — is the finding `docs/notes.md` § "Derived
beats written" describes, and the fix is upstream of the page.

**A vernacular written as though the set were closed at two.** «Both
languages», a component branching on `en`/`it`, a layout that assumes two
columns of catalog. What a third would cost is the measure.

**An Italian catalog string argued in Italian.** A comment defending the word it
sits above quotes its own subject; everything else a catalog comment says is
English.

## The passes a reading makes — a prompt

**A board travelling as a date.** A prompt that hands a model an instant and a
place instead of a computed board is the finding, and it is the one that makes
everything downstream unfalsifiable.

**Two boards, or two schools, of one instant.** One board goes into a prompt.
Two schools of one art is the sharper form: their agreement is the part neither
disputed.

**The question reaching the server.** A prompt endpoint is told `asked=true`
and nothing more; the browser appends the text. `about=true` for a 太乙 matter
travels the same way. Check the endpoint's signature, its logs and its cache
key.

**A prompt built outside the consultation.** `/[lang]` is the only surface that
builds one.

**An address that leaves the instant unsaid.** What is handed over says where
the board is: the section of its own art, with everything the board is a
function of written into it. `pageAddress` on the server, `pageLink` in the
browser, and neither reads the address bar. A birth put inside somebody else's
board leaves it; a parameter the board is a function of does not, and `gender`
is both depending on the art — `genderBelongsToBoard`.

**Somebody on a 太乙 board.** Its subject is a year. No question, no person,
`--ask` refused with a message of its own, and every surface printing its nine
palaces says they are numbered one seat off the 洛書.

**A prohibition recited back.** A `prompt.` message keeps its prohibitions — its
reader is a model being given directives. What carries over from the copy rules
is only that the reading a model writes must not recite them.

**A bound on certainty pasted into a prompt.** How sure the numbers are stays in
`docs/agent-prompt.md`, unless it is a bound on a quantity the prompt is already
telling a model how to read.

## What a finding here invalidates

Nothing. It is the floor.
