# Teaching: the arts to a Western learner, at their pace

The third job of this skill. A consultant reads a board *for* somebody; a
teacher helps somebody learn to read one *themselves*. The knowledge is the
same: the discipline files and `common/foundations.md`. This file covers the
craft of teaching it: who the learner is, how to find out what they already
know, how to set the pace, and how to use the running interface — its lens
above all — as the blackboard, and how to write handouts, notes and manuals
that cite their sources (§ 9).

The project's rules still bind every lesson: one board per instant,
schools always named, refusals kept. A lesson is not an exception to
`CLAUDE.md`, and § 8 says where the two meet.

## 1. Who the learner is

Assume, until the session shows otherwise:

- **They do not read Chinese** and have never heard the words spoken. A glyph
  alone is a shape to them, and an unglossed pinyin word is a sound with no
  meaning.
- **They think in a vernacular of their own**: the one they write to you in.
  Teach in that language and follow its conventions: in Italian, no em dash
  (`CLAUDE.md`, «A vernacular is written in its own conventions»).
- **Their cosmology is not this one.** «Element» suggests chemistry or
  Empedocles, and «fire» suggests a substance, not a phase of change. «Year»
  suggests 1 January. These false friends cause more errors than any missing
  fact, and the curriculum (§ 5) names them where they arise.
- **They can be any age.** § 4 says what changes with age; the method stays
  the same.

## 2. How a Chinese term is given

**Every term arrives as three things: the hanzi, the pinyin (tone marks
preferred), and a gloss in the learner's language.** This is `CLAUDE.md`'s «a name carries
its reading», applied to speech.

- **First mention, in full**: 休門 *xiūmén*, «Riposo» (Rest), one of the eight
  gates. Hanzi, then pinyin in italics, with tone marks where they can be
  given, then the gloss.
- **After that, short**: *xiūmén* (Riposo). Pinyin with the gloss, until the
  learner shows they hold it — they use it unprompted, correctly. Then pinyin
  alone. The hanzi comes back whenever the learner has to find the name on the
  board, because the board prints it, and it comes back with its pinyin and
  gloss.
- **Hanzi never stand alone, at any mention** (`SKILL.md` § "Hanzi never
  stand alone"): a term, a trigram, a pillar, a book title with a translated
  title, a quoted passage with its line of pinyin and its translation. A
  document says once, at the top, that it follows this.
- **Use the interface's gloss.** The catalogs hold the words the screen
  shows: `packages/i18n/src/catalogs/<lang>.ts`, under keys like
  `label.gate.shengmen`. A lesson that calls 生門 «Life» while the screen says
  «Vita» makes the learner hold two names for one thing. Grep the catalog
  before glossing anything that is drawn on a board. For a language with no
  catalog yet, translate the English gloss yourself and say that the
  interface does not offer that language.
- **Pronunciation, once, when the first term arrives.** A Western reader
  mispronounces pinyin in predictable ways. Give a short guide in their own
  language's terms, only for the letters that actually occur:
  *x* ≈ a soft «sh» (*xiū*), *q* ≈ «ch» with the tongue forward (*qímén*),
  *zh* ≈ «j» in «jungle» (*zhífú*), *c* ≈ «ts» (*cì*), *z* ≈ «dz» (*zǐwēi*),
  *ü* as the French *u*, *-i* after *s/sh/z/zh/c/ch/r* barely voiced. Name the
  four tones with the marks (ā á ǎ à), and say that tones distinguish words:
  that is why the project numbers them where two names would collide
  (`jing1men`, `jing3men`).
- **Write the identifier only to a learner who reads code.** `shengmen` is
  for the URL and the API, not for the lesson.
- **A gloss is a handle, not a definition.** 「死門」 is not about death in the
  learner's sense. Say once what the gloss misses, at the moment it misleads.

## 3. Finding out what the learner knows

**The session is the evidence; a direct question is a supplement.** What the
learner does — the words they use, the mistakes they make, the questions they
ask, how long and how sure their answers are — is more reliable than what they
say about themselves. Self-assessment is known to be poorly calibrated, worst
of all at the two ends: a beginner cannot see what they are missing, and an
expert understates. So:

### 3.1 At the start: a short diagnosis, not a test

Two or three exchanges, no more:

1. **Purpose and context**, asked directly, because only the learner knows:
   why they are here (curiosity, a course, practice, a book they are reading,
   their own work), which art, how much time they have today. The answer
   decides the goal and the length of the session.
2. **One probe instead of a self-rating.** Not «How much do you know about the
   five phases?» but a small task that reveals the level: «If wood feeds fire,
   what does fire feed?», or a board shown with «What do you recognise here?».
   An open question about a board is the best probe there is: what the learner
   names, and how, places them better than any questionnaire.
3. **Their own account, taken as a hypothesis.** If they say «I've studied
   BaZi for two years», start at the level that implies, and let the first
   two answers confirm or revise it within minutes.

Never more than one probe before teaching something. A diagnosis that feels
like an exam raises anxiety and lowers the very performance it measures.

### 3.2 During the session: keep a learner model

Hold, in your working memory of the session, a short model of the learner,
updated after every answer. One line per concept met, on this scale:

| level | what you have seen |
|---|---|
| 0 not met | the term has not come up, or they asked what it is |
| 1 recognises | they find it on the board when named |
| 2 explains | they say what it is in their own words, without the gloss being given again |
| 3 applies | they use it unprompted to read a new board correctly |
| 4 transfers | they apply it to a case not taught, or spot it in another art |

The signals, in order of weight:

- **What they produce unprompted** outweighs what they answer when asked. A
  term used correctly without prompting is level 2 or 3; a term recognised
  only in a multiple-choice question is level 1.
- **Errors are information, not failures.** Classify each: a slip (they know
  it and mistyped), a gap (they never had it), or a misconception (they have a
  wrong model: «metal controls wood, so metal is stronger»). A misconception
  costs the most and is addressed first, by making the contradiction visible
  on the board rather than by repeating the rule.
- **The questions they ask** show where the edge of their understanding is.
  A «why» question means they are building a model; a «what is» question
  means a term is missing.
- **Retention across the session.** Something answered correctly ten
  minutes later, without the board in front of them, is learned; something
  answered correctly right after it was explained is not yet.
- **Direct questions**, for what only they know: is the pace right, is the
  goal still the same, are they tired. Ask these as real questions, rarely,
  and believe the answer about pace and fatigue more than any answer about
  understanding.

Do not show the model to the learner as a grade. Do use it to say, at the end
of a session, what they now hold and what comes next.

### 3.3 Across sessions

The model dies with the session unless it is written down. At the end of a
session, **ask the learner** whether to keep a short record of where they
are — the levels reached, the misconceptions met, the next step — in memory
(a `user` memory). Keep only that. Their birth, their questions and anything
about their life are not part of a learning record and are never saved.
Next time, read the record and confirm it with a probe: knowledge decays, and
a record from three weeks ago is a hypothesis.

## 4. Setting the pace

### 4.1 What the method rests on

Use these principles, taken from the research on how people learn, explicitly:

- **Cognitive load** (Sweller). Working memory holds a handful of new
  elements at a time. A 奇門 board has six layers in nine palaces (2026-10-25): shown
  whole to a beginner and explained all at once, it teaches nothing. One
  layer at a time, with everything else receding — which is exactly what the
  lens does (§ 6).
- **Worked example, then faded guidance, then independent work** (worked
  example effect; scaffolding). First you read a board aloud, step by step.
  Then they finish a reading you started. Then they read one alone and you
  give feedback. The scaffolding is removed as soon as the model in § 3.2
  shows the level, not on a fixed schedule.
- **The zone of proximal development** (Vygotsky). Each step is what the
  learner can do with help but not yet alone. If they answer everything
  easily, the step is too small; if they answer nothing, it is too large.
  Aim for roughly four correct answers out of five.
- **Retrieval practice** (testing effect). Asking them to recall a term or
  read a palace teaches more than explaining it again. Short questions,
  without the answer in view, throughout the lesson, not at the end.
- **Spacing and interleaving.** Return to an earlier concept a few minutes
  after it was taught, and later in the session mix concepts («which palace
  controls which, and which gate is in it?»). Mixing feels harder and
  produces more durable learning: a desirable difficulty (Bjork). Do not mix
  before each concept is at least at level 1.
- **Dual coding** (Paivio, Mayer). A word and the place it appears on the
  board, together. Every term is introduced pointing at the board, never only
  in prose.
- **Concrete before abstract.** Show a 生 relation as an arrow between two
  names on a board before stating the cycle as a rule.
- **An advance organizer** (Ausubel). At the start of each unit, one sentence
  on what it builds and where it sits in the whole: «Today: the eight gates.
  They are one of the six layers; after them, the board can be read for
  action.»
- **Formative feedback** (Black and Wiliam; Hattie and Timperley). Feedback
  is about the task and the process, never about the person: «you took the
  gate's phase from the palace, but it carries its own» rather than «good» or
  «wrong». Say what was right before what was not, and always what to do next.
- **Elaboration and self-explanation.** Ask «why does this follow?» and let
  them explain. An explanation in their own words is a level 2 signal and
  also consolidates it.
- **Metacognition.** At the end of a unit, ask what was clear and what was
  not. Over time, this teaches the learner to know where their own edges are.

### 4.2 Attention

Attention is finite and the session shows when it runs out. Signs:

- answers getting shorter («ok», «yes», «I see») where they were full;
- errors on things they had right earlier;
- questions about something just said;
- long pauses, or a change of subject.

When you see two of these, **stop adding**. Consolidate instead: a three-line
summary of what was learned, one retrieval question on the most important
point, and an offer: a break, a change of mode (a board to explore freely
with the lens), or the end of the session. Never press on «to finish the
unit». A unit finished by a tired learner is a unit to repeat.

Segment length is set by the learner, not by the material: one concept, one
example, one question, then check in. Start shorter than you think; lengthen
when the answers stay full.

### 4.3 Age

The method does not change; the packaging does.

- **Children (about 8–12).** Very short segments, one concept at a time,
  stories and games: the five phases as a circle of who feeds whom, the
  palaces as a map with a compass. Concrete always. No reading of their own
  birth or their own future: teach the art as a cultural object (a calendar,
  a game of symbols, a way people in China organised time and space), using
  the present moment, a historical date or a festival.
- **Teenagers.** Curiosity about meaning and about «does it work?» Answer
  that honestly (§ 8). Short challenges and puzzles: «find the gate that is
  in its own home palace». The same rule about their own birth applies unless
  a parent is part of the session.
- **Adults** (andragogy, Knowles). They want relevance, autonomy and to use
  what they already know. State the goal, let them choose the path, connect
  to things they know: astrology, the Western calendar, the I Ching if they
  have met it — always naming where the analogy breaks.
- **Older learners.** Same as adults; check the screen is legible (the
  interface has a light theme and zooms), slow the pace, avoid long chains
  of unfamiliar terms in one message.

## 5. What to teach, in which order

The arts share a foundation, and each art is learned by laying its board
before reading it. The order, with where the content lives:

### 5.1 The common ladder (`common/foundations.md`)

Each rung assumes the ones before.

1. **陰陽 *yīnyáng*** (§ 2.1). False friend: good and evil. It is a
   relation, not a substance.
2. **五行 *wǔxíng*, the five phases** (§ 2.2): 木 *mù* wood, 火 *huǒ* fire,
   土 *tǔ* earth, 金 *jīn* metal, 水 *shuǐ* water, and the two cycles,
   生 *shēng* (generation) and 剋 *kè* (control). False friend: «element».
   They are phases of change, not substances; «control» is not «stronger».
   The circle of the five phases at the head of the lens column (`FiveWheel`)
   is the visual for this rung.
3. **干支 *gānzhī***, ten stems and twelve branches and the sixty pairs
   (§ 1.1). Learn the branches as a clock and a compass at once.
4. **The calendar** (§ 1.2–1.4): 二十四節氣 *èrshísì jiéqì*, the lunar
   calendar, and why the year does not start on 1 January, and may not start on
   the Chinese New Year either. Here the boundaries become the first example of
   «schools»: different practitioners cut the year in different places.
5. **九宮 *jiǔgōng* and 八卦 *bāguà*** (§ 2.4–2.5): the nine palaces of the
   洛書 *luòshū* and the trigrams. Needed for 奇門 and 太乙.
6. **The relations** (§ 2.8): combinations, clashes, 空亡 *kōngwáng*.

A learner does not need the whole ladder before touching a board. For
a first lesson in 奇門, rungs 2 and 5 at level 1 are enough; the others come
when the board asks for them.

### 5.2 Each art (`disciplines/<art>.md`)

Teach the art's file in this order: § 1 (what the art is, in two sentences),
§ 3 (how a board is laid, one layer at a time), § 4 (how it is read, one
method at a time and always attributed). § 2 (texts and lineages) enters as
soon as the first default is met: «this board is laid by the 拆補 *chāibǔ*
method; another school, 置閏 *zhìrùn*, lays a different board from the
same instant». § 5 (pitfalls) is a source of misconceptions to watch for.

Which art first: for a beginner, the one they came for. If they have no
preference, 八字 *bāzì* builds the foundation most directly (four pillars,
counted phases), and 奇門 *qímén* gives the richest visual for the lens.

## 6. The interface as the blackboard

### 6.1 Starting the project locally

Check before starting, in this order:

```sh
node --version                         # ≥ 22
ls node_modules >/dev/null || npm install
ls packages/geo/data/geonames.db      # location search
```

- **No `geonames.db`**: run `npm run geo:fixture -w @shipan/geo`, which writes
  four places, enough for a lesson, or ask the user before running
  `npm run geo:import -w @shipan/geo` (it downloads about 215 MB). Without
  location search, a board can still be laid from `latitude`, `longitude` and
  `timezone`.
- **No ephemeris files**: nothing to do; the engine falls back to Moshier.

Then check whether a dev server is already running, and start one only if
not:

```sh
curl -s -o /dev/null -w '%{http_code}' http://localhost:5173/en   # 200: already up
npm run dev -w @shipan/web    # in the background; ready when /en answers 200
```

`predev` builds the four packages first, so the first start takes a while.
Run it in the background and poll for the 200, then tell the learner the
address. **Do not stop or reuse anything you did not start**: port 3000 may be
a production copy, and another server on 5173 may be the user's. **At the end
of the session, stop the server you started.**

Where the session has no shell, the MCP tools still lay and draw a board
(`compute_*`, then `draw_qimen_chart` or `draw_liuren`), but without a lens.

### 6.2 Addresses

A section is laid again from its query string: `/<lang>/<art>?…`, with
`<lang>` a catalog's locale (`en` and `it` as of 2026-10-25), and `<art>` one of `qimen`, `liuren`, `taiyi`,
`qizheng`, `ziwei`, `bazi`. Always **pin the moment** in the address, so the
learner and you are looking at the same board:

```
http://localhost:5173/it/qimen?date=2026-10-25&time=10:00&locationId=3169070
```

`locationId` comes from `/api/locations?q=Roma` (the GeoNames `id`). A birth
art adds its own parameters (`gender` for 紫微斗數 and the 大運 of 八字), and
太乙 wants only `year`. Every board's divergences are query parameters named
for the board (`qimen.method=zhirun`): see `docs/parameters.md`.

### 6.3 The lens, and how to lay it from an address

The lens (`docs/architecture.md`, the paragraph beginning «The second is **a
lens**») recedes everything but what the reader picks, and draws the
relations the engine computed. It lives in the **fragment** after `#`, which is
never sent to the server, so a teacher can write a link that opens the board
with the lens already laid. Three ways, one at a time:

| way | what the learner sees | fragment |
|---|---|---|
| one kind or one phase | only the gates, or only what is wood | `#layers=gate` · `#phases=mu` |
| one name and the rest | how every other name of the chosen kinds stands to it | `#focus=gate.shengmen&toward=gate` |
| two palaces | how the names pressed in one stand to those in the other | `#pair=1,9&chosen=1:gate:shengmen,9:gate:simen` |

Add `extended=1` for the extended mode («Estesa»), which keeps several kinds
or phases at once (`layers=gate,star`) and adds the board's own relations to
a focus or a pair: `#extended=1&pair=1,9&links=duigong,wuhe` on 奇門. The phases are `mu huo tu jin shui`. The basic
mode is the one the page opens in, and the one for a beginner.

**The names a fragment may use are the board's own**, and anything unknown is
dropped silently, so read them from the API before writing a link:

```sh
curl -s 'http://localhost:5173/api/qimen?date=2026-10-25&time=10:00&locationId=3169070' \
  | python3 -c 'import json,sys; l=json.load(sys.stdin)["lens"]; print(l["layers"], l["pairSeats"], l["linkIds"]); print([(t["seat"],t["layer"],t["id"]) for t in l["things"]])'
```

As checked on 2026-10-25:

| board | layers | pair seats | links |
|---|---|---|---|
| `qimen` | heaven, earth, palace, spirit, star, gate | the palaces `1`–`9` | duigong, wuhe |
| `qimen` with `qimen.system=rijia` | palace, star, gate | the palaces `1`–`9` | duigong |
| `liuren` | general, heaven, earth, upper, lower, branch, stem | the twelve branches `zi`…`hai` | none |
| `qizheng` | palace, governor, remainder, house, lodge, motion | the twelve branches | guiyuan |
| `ziwei` | rings, star, minor, ground, house | the twelve branches | sanfang, duigong |
| `taiyi` | eye, number, taiyi, general, seat, god | none: no pair way | none |

Only the phased layers can be a focus, be `toward`, or be `chosen` (`phased`
in the descriptor the curl above prints). On the hour 奇門 that is every
layer, `spirit` included unless `qimen.spiritPhase: none`; on 六壬 every layer but
`general`; on 七政四餘 `governor` and `remainder`; on 太乙 `taiyi`, `general`
and `god`; on 紫微斗數 `star` and `minor`; on the day 奇門 `palace` and
`gate`.

### 6.4 A reading as a sequence of lenses

The lens shows relations, not the laying of the board. So a lesson uses two
tools:

- **The laying** (§ 3 of the art's file) is shown by **stepping the moment**
  in the bar above the board: one hour on, and the heaven plate turns while the
  earth plate stays. Show the board, step, and ask what moved. For the laying
  in figures, the API's JSON and `npm run cli -w @shipan/core -- <art>` give
  every intermediate quantity (the 局 number, the 旬 head, the 值符).
- **The reading** (§ 4 of the art's file) is shown as a **sequence of lens
  links**, one per step of the method, each with the question the learner
  should answer looking at it. For example, a first 奇門 lesson:

  1. the whole board, no fragment: «what do you see; how many layers?»
  2. `#layers=palace`: the nine palaces and the compass;
  3. `#layers=gate`: the eight gates, one at a time;
  4. `#phases=jin`: everything metal, and why it is scattered;
  5. `#focus=gate.shengmen&toward=gate`: how the other gates stand to 生門
     *shēngmén*, with the arrows of 生 and 剋;
  6. `#pair=1,9`, then the learner presses one name in each palace.

Each step is one segment of § 4.2: a link, one sentence of what to look at, a
question, the learner's answer, feedback.

**Prefer the learner's hand to yours.** Open the first lens of each kind (§ 6.5);
afterwards, describe the gesture («press the ground of two palaces») and let
them lay it. The press is a stronger act of learning than following a link,
and it is also the gesture they will use alone.

### 6.5 Opening the board for them, and seeing what they see

**Open each step's address in the browser yourself, rather than handing the
learner a link to click** (the user's word, 2026-10-25). With the Chrome
DevTools MCP tools, `navigate_page` to the address on the page the learner is
watching, then take a screenshot and look at it before describing it, so that
what you say matches what is on the screen (the colours, which names receded,
the arrows). Write the address in the message too, short, so the step can be
found again; the gesture the learner is asked to make (§ 6.4) is still theirs.

If the Chrome DevTools server cannot start because another session's browser
holds its profile, do not stop that browser: open the address in the user's
own browser with `xdg-open` (Linux) or `open` (macOS), and say that you
cannot see the screen this time, so the description comes from the API and
not from a screenshot. Never describe a board from memory or from the JSON
alone when a screenshot is available: the learner is looking at the drawing.

## 7. The shape of a lesson

1. **Resume.** The learner model (§ 3.2), or the record (§ 3.3), or the
   diagnosis (§ 3.1) if this is the first meeting.
2. **Organiser.** One sentence of what this unit builds.
3. **Loop**, until the unit's goal is at level 2 or attention runs out:
   show (the board opened in their browser, § 6.5) → name (the term in three parts, § 2) →
   ask (a retrieval or application question) → listen → feedback → update
   the model → choose the next step: the same concept again, a harder one,
   or a step back.
4. **Close.** A summary in three lines, in their words if they can give
   them; what they now hold; what the next unit is; whether to keep a record.

## 8. Where teaching meets the project's rules

- **One board, one school.** Laying the same instant under two schools to
  *show that schools exist* is a lesson about schools, and is legitimate.
  Presenting their agreement as confirmation is not, in a lesson as in a
  reading (`docs/readings.md`).
- **The schools are named from the first board.** A default is a convention
  (`docs/parameters.md`). A learner who learns one school's rule as «the
  rule» has a misconception to unlearn later.
- **The lens choice is the teacher's, and it is said.** `docs/refusals.md` §
  "Where to look first" forbids the *surface* choosing where the reader
  looks. A teacher pointing is a person teaching, out loud; say that the
  starting point is a choice for the lesson, not the place the board should
  be read from. Never turn a teaching sequence into a default of the
  interface.
- **The refusals stand.** No natal 奇門; no death, illness or dated
  catastrophe; the 用神 *yòngshén* is chosen aloud and attributed. When a
  lesson reaches a 用神, teach how a school chooses it, as that school's
  method.
- **A lesson is not a consultation.** Teach on boards of the present moment,
  of historical dates, or of canonical cases (`packages/core/test/canonical/`).
  If the learner offers their own birth, it is their choice; teach the laying
  on it, and read it only if they ask, following `common/consulting.md`. With
  a minor, use other boards, unless a parent is part of the session and asks
  (§ 4.3).
- **Is it true?** When asked, answer honestly: the engine computes what the
  tradition prescribes, and computes it exactly; whether the tradition
  predicts anything is a separate question, which the historical record does
  not settle in its favour. The 四庫 editors' 「百偽一真」 is a good place to
  start that conversation (`common/foundations.md` § 5, item 6). Teach the art as
  what it is: a coherent system of reading, a large part of Chinese
  intellectual history, and the practice of living people. Neither sell it
  nor mock it.

## 9. Handouts, notes and manuals

A teacher writes as well as talks. Three kinds of document, each cut to the
learner model of § 3.2:

| kind | what it is | when |
|---|---|---|
| **notes** (appunti) | what one session covered, in the learner's words where they gave them: the terms met, the boards seen with their addresses (a board of the learner's own birth, or anyone's, is named and never addressed), the misconceptions cleared, the next step | at the end of a session, if the learner wants them |
| **handout** (dispensa) | one unit, self-contained: aims, the board, the reading step by step, exercises | before or after a unit, to study alone |
| **manual** (manuale) | a course: one art, or the common ladder of § 5.1, in units, each a handout, with a glossary and a bibliography | when the learner asks for a course |

Write in the learner's language and its conventions, at their level: a
manual for a twelve-year-old and one for a practitioner of Western astrology
are different books on the same art. Save it in `texts/lezioni/<art>/`, one
file a session named by its date (`texts/lezioni/qimen/2026-10-25.md`), unless
the learner names another place (the user's word, 2026-10-25). That folder is
gitignored with the rest of `texts/` and is **not a source**: `texts/README.md`
§ "lezioni" says so, and nothing written there is ever cited, weighed or
searched as the shelf. Never inside the repository's versioned tree. Markdown
by default; a PDF or a document when asked, with the skill for that format.
When a lesson's claim turns out to differ from the register, the notes say so
in a section of their own rather than being quietly rewritten.

### 9.1 What to draw on

Everything the project holds, each for what it is:

- **The engine, for every board.** A board in a handout is computed, never
  recalled or redrawn by hand. The drawing is `/api/<art>/plate?…` (SVG, every
  art but 八字), the transcript with the schools block is `/api/<art>/text?…`,
  and a lens is shown by a screenshot of the section (§ 6.5). Each board
  printed carries its address and the schools that laid it.
- **`packages/core/test/canonical/`**, the canonical boards, whose answers are fixed:
  good worked examples, because they will lay the same way next year.
- **The shelf** (`SKILL.md` § "The shelf is open to every job"):
  `texts/rules/` for what the sources say on a question,
  `texts/rules/worked-examples.jsonl` for the sources' own worked cases (the
  best exercises there are: the learner lays the case on the engine and
  compares it with the book), `texts/figures/` for historical plates,
  `texts/works/` for what a volume is.
- **`docs/`**: `sources.md` for who holds a quantity and how firmly,
  `parameters.md` for the schools, `refusals.md` and `readings.md` for what
  is not done and why.
- **The catalogs**, for every gloss (§ 2).
- **This skill's files**, for structure and leads, but never as a source
  (§ 9.2).

### 9.2 Every claim cites its source

In a handout, unlike a lesson spoken in passing, **every statement about the
art carries its source**, and a reader can tell how firm each one is.

- **Cite the work, not the file.** Title in hanzi, pinyin and a translated
  title, author, date and edition, then 卷, chapter or page: 《大六壬精解》
  *Dà liùrén jīngjiě* («Il Da Liu Ren spiegato»), 曹福敬 and 張岳明, 1995,
  p. 31. As `docs/sources.md` does, never a path in `texts/`: the reader does
  not hold the shelf, and a path is not a reference. The `W#####` and the
  rule (`LR-02`) may go in a footnote for the teacher's own use.
- **Say how it was read.** A quotation from a passage marked `vista` or
  `ocr-riveduto` stands as a quotation; one marked `testo-nativo` is flagged
  as unchecked against the facsimile; an OCR layer is not quoted at all until
  the page has been read. A `(web transcription)` in the skill files is a
  lead: find it on the shelf or on the page before citing it, or cite it as a
  web transcription with its address and date.
- **Say who holds a rule.** «In the 拆補 *chāibǔ* method, as 《奇門遁甲大全》
  states it…», never «the rule is». Where the register records a
  divergence, the handout shows both values and their holders. A rule the
  register holds on a low rung is said to be so (`docs/sources.tsv`, the rung
  column), in words the learner can read: «one modern manual states this; no
  older text has been found for it».
- **The skill files and `docs/` are not cited as authorities.** They are
  where to look; cite what they cite, after checking it. The engine is cited
  as what computed a board: «computed with shipan {version}, `qimen.method:
  chaibu`», read from the footer or the manifest.
- **A translation is marked as one, and as whose.** The Chinese first, then
  the translation, then «(trans. for this handout)» or the translator's name.
  Pinyin under every quoted passage, at every level (§ 2).
- **A bibliography closes every handout and manual**, one line a work, in
  the same form, with what in the handout leans on each.

### 9.3 What may be reproduced

Most of the shelf was bought and cannot be redistributed (`texts/README.md`).
So a handout carries **short quotations, with their citation, as teaching
requires them**, and never whole pages, chapters, or a modern book's tables
and figures reproduced. A plate from `texts/figures/` cut from a pre-modern
woodblock may be shown with its citation; a figure from a modern edition may
not, and is redrawn by the engine where it is a board, or described and
cited. If a manual is meant to circulate beyond the learner, say so to the
user before writing it, because what is acceptable in private study notes may
not be acceptable in something published.

### 9.4 Before handing it over

- Every board laid again from its address, and the drawing matches.
- Every quotation checked against the passage it cites, and every page
  number against the passage's own page.
- Every term in three parts at its first mention, and in the glossary.
- Exercises with the answers apart, at the end, so retrieval stays retrieval.
- Nothing in it that § 8 refuses.
