# What is not computed here, and why

**The engine answers no question, which is not the same as saying nothing.**

It carries an attribute of a configuration when the sources hand it down
concordantly *and* it belongs to the configuration rather than to somebody's
situation. That is why `Pattern` has a `valence`: 門迫 *is* oppression and 擊刑
*is* punishment, named and weighed in one line of one text, and a table that
split them would report half of what it read. Carrying it is reporting; an
engine that dropped it would be editing its sources into glosses like "gate
oppressed", where nothing could test it.

It stops at everything that needs a question to have been asked. Where such an
attribute travels at all it travels as **an identifier and a glyph, never as
prose** — a verdict arriving inside an English gloss is a verdict nothing can
test.

What follows is one entry per refusal: what is refused, who asks for it, and
why it is not here. **A refusal is one of the few things in this project that
can be written once and stay true.**

---

## The 用神

*Asked by:* everyone who casts a chart for a question.

Which palace bears on what is being asked is chosen by the reader, for the
question asked. Without one the board is a map with no pin — and choosing it
is the first interpretive act, not a lookup. The prompt builders commission
the choice and require it declared; `prompt.yongshen` is the shape that takes.

## 格局, and any ranking of palaces

*Asked by:* anyone wanting to know which palace is best.

Named configurations travel — that is the `valence` rule above. An *order* over
them does not. A chart holding four 凶 configurations is not a bad time to do
anything: bad is a word about an undertaking, and no undertaking is known here.

## Ordering two hours, and dating an outcome

*Asked by:* anyone choosing a time, and anyone who wants to know when.

`scan` walks an interval and reports where in it a thing stands, against
criteria the caller states. It does not rank the results, and its answers
carry a **direction as well as an hour** — the direction is half of the
answer and must never be reported alone. Dating an outcome is refused
outright: it is the prediction this project does not make.

## Advice

*Asked by:* almost everybody, eventually.

No reading here gives medical, psychiatric, legal or financial counsel, lucky
numbers, gambling picks, a partner judged or a compatibility settled. Under 命
the verbs stay conditional — «tends to», never «you will». See
`docs/readings.md`, and `prompt.ming.limits`.

**The surface says what the refusal leaves the reader with, and it is the
footer's line given room.** `footer.disclaimer` carries the claim in one
sentence on every page — a space for reflection, and in no case a substitute
for a professional — and `notes.refusals.advice.body` is where that sentence
is long enough to be read for something rather than past. It adds no second
claim: a board is looked at and weighed by the person looking, a question
about a symptom, a contract or a sum of money belongs to somebody qualified to
answer it, and nothing here is a reason to put off asking them. The two are
one fact with two amounts of room, and the footer is where the wording is
settled.

## Which palace stands for which part of a life

*Asked by:* readers of modern 年命 material, and models, very confidently.

Refused **wherever a 年命 appears** — the prompt, the MCP tool and the
interface all say so. `purposes.ts` declines the doctrine and names the sources
it found unusable. This is where a model invents most freely, which is why the
refusal is stated at every surface rather than once.

What *is* carried: 本命 (the year pillar of the birth) and 行年 (the year being
lived) looked up **inside the chart of the moment**, the palaces the two pairs
fall in, the mooring of the branch, and the 納音 weighed against that ground.
Then it stops: 生旺 and 囚死 are the text's own verdicts and they need a
question to have been asked.

## A natal Qi Men chart

*Asked by:* the modern natal-Qimen literature.

**A birth enters a chart, never the other way about.** There is one frame and
it is divination. 《遁甲演義》 puts the person's year *inside* the chart of the
moment; the chart does not move for the birth. A chart cast on a birth and
read as a chart of a life was offered here once and is not any more — what
that frame could honestly hand a model was a warning, where the present one
hands two pairs and two palaces.

The error is worth naming because it recurs: **the Western natal chart is one
instance of a class the tradition already fills several ways.** Calling that
class "the natal chart" sends people looking for the missing Chinese one and
grafting it onto whatever board is at hand. An art that is natively about a
life gets **a board of its own** — 八字, 七政四餘, 紫微斗數 — never dunjia's.

`docs/sources.md` records the natal text that does exist, 《奇門遁甲統宗》
卷十二, and why nothing imports it.

## The received readings of 太乙

*Asked by:* anyone who opens the text.

Two refusals, and both are the point.

**The doctrine is dynastic** — which state falls, which year an army breaks —
dated, falsifiable by nobody, travelling as commentary on real events. It
stays out.

**The per-palace readings of 卷二 are declined entirely**, because they are a
Tang province and a dynastic omen and there is no third thing behind them.
What a palace hands down is those two and nothing else, and `docs/sources.md`
says so as a refusal rather than by omission — where it also names the one part
of this art that is read for something other than reigns, the 十精, which are
read for the weather and are not computed here either.

What does travel: 卷三 states each of the seven conditions three times over — a
trigger, a 之義 saying what the shape *is*, then 若… and 嵗計遇之… saying what
will befall the realm. **Only the middle one is carried**, as
`PATTERNS[id].meaning`, for the reason `Pattern.valence` is carried. 對 has no
such sentence and carries none: where the sources say nothing, the silence
travels, and a seventh line invented so the table looked even would be this
engine founding a school.

**And nobody is on this board.** The reader is not in it, no seat here stands
for a part of their life, and a forecast for them is the natal-Qimen error
arriving in a new register. Nothing is asked of it anywhere: no question box,
no `asked` on `/api/taiyi/prompt`, and `--ask` refused by the CLI with a
message of its own.

## Who is 主 and who is 客

*Asked by:* every reader of a 太乙 board, immediately.

The engine names two counts and stops. That is the first interpretive act the
system asks for and it is the reader's, exactly as the 用神 is. The prompt
commissions it and requires it signed. Assigning it upstream would be
answering the question this project does not ask.

## A strong or weak day master, and the favourable element

*Asked by:* every 八字 reader.

`bazi/distribution.ts` counts the eight characters — each stem by its element,
each branch by its own — zeroes included, because an absence weighs as much as
an abundance. The count is printed so that a model never recounts. **Declaring
the day master strong or weak from it, and choosing what compensates an
absence, are method steps**: the schools divide on how it is chosen, so the
choice is made aloud in the reading, together with the method
(`prompt.bazi.noScore`, `prompt.bazi.distribution`, `prompt.bazi.yongshen`).

This engine computes no 用神 and no 格局.

## 紫氣

*Asked by:* readers expecting four 餘 on a 七政四餘 board.

Three of the four are placed by ephemeris and the fourth is placed by rule,
under `ziqi: yinianyisu`, which is the default. What is refused is narrower than
the body and it is the thing a reader would most like to have: **a degree for
it**.

The rule gives a palace. Its rate is 《張果星宗》's 大數 10228, one circuit in
twenty-eight years — a figure that work's own 總論 contradicts two columns
later, 「凡二十九年行一周」 — and its dated position is 《星度指南》's 1886 board,
which prints 炁 in 巳宮 and no finer. A 宿 is a stretch of some thirteen degrees
inside a palace of thirty, so a board known to the palace is not known to the
lodge, and a `巳 12.40°` printed beside a measured 入宿度 would be this engine
inventing the one number nobody handed it. The type says so rather than the
documentation: 紫氣 arrives as a `PalacePlacement`, and a surface that reaches
for its degree does not compile.

**And what is weak about it is published rather than withheld.** Each half of
the placement rests on a single text, which is rung 5 twice over — the grade
年命, the 年神 bearings and 太乙's 大遊 already ship at. This project's
rule for such a quantity is that its rung is written down, not that the quantity
is dropped: the art is 七政四餘, and a board printing three by default answered
to a name it did not carry. So the fourth is on the board, at the resolution its
rule gives, with the line under the board saying what it stands on. `ziqi: off`
lays it without, and the board then says it carries three.

What would strengthen it is ordinary: a second dated chart with 炁 on it, a
century or more from 1886, which makes the anchor two witnesses and decides
twenty-eight against twenty-nine at the same time, the two parting by 44° a
century.

## The 十八飛星 placements

*Asked by:* anyone holding both 紫微斗數 books.

**紫微斗數 names two boards and this engine computes one of them**: 《全書》's
fourteen 正曜, cut by a 五行局 and a lunar day. The other transmission — the
十八飛星 of 《全集》 and 《捷覽》 — has eighteen stars counted off the **year
branch**, no 五行局, no 天府, no mirrored second file, and not one of the
fourteen on it.

Both are on the shelf, and the shelf is the trap: 天貴, 天福 and 天壽 have no
rule in 卷二 and a rule in the other book, and what 《全書》 calls 天空 is what
that book calls 地空. **A placement carried across is a graft and not a gap
being filled** — the natal-Qimen error, made smaller and between two books
that share a title.

## A place from a name

*Asked by:* every convenience API.

Nothing here turns a name into a place. There are dozens of towns called Rome,
and picking the most populous for somebody produces a chart that looks right
and is wrong. What the surfaces take is a `locationId` out of `/api/locations`,
or a `latitude` and a `longitude` with a `timezone`, or both together — the
third being a refinement, not a contradiction.

Half a pair is **refused rather than half-read**: a latitude alone would be
answered on the meridian of Greenwich and look exactly like the chart that was
asked for.

## The latitude, in any calculation

*Asked by:* anyone who assumes a chart uses both coordinates.

In this engine **the longitude is what moves a board**. The latitude is
carried and printed and enters no calculation. `minggong: ascendant` is the one
method that would read it — the 命宮 taken at the degree actually rising, where
`yuejiang` lays the hour on the palace of the 月將 — and `qizheng.ts` declares
that value and refuses it. It is not `gong`, which cuts the twelve palaces by
the 中氣 or by the 次 and reads no latitude either way: two parameters about the
palaces, one of them about the sky over a place.

This bound is stated here and in the README and **not in the form**: nothing
under that fold explains itself, on the ground that a control somebody opens
on purpose to type a longitude into is opened by somebody who knows what one
is. The place to widen is the documentation.

## Two boards of one instant, in one prompt

*Asked by:* the obvious feature request.

A consultation takes **one** instrument, chosen before the press and at no
point after it. See `docs/readings.md`, which is where the argument lives:
where two boards agree it is frequently one fact printed twice, and a model
reading that as corroboration counts one datum as two with complete
confidence.

## The middle pair named by the matter

*Asked by:* the school that says the names follow what is being divined.

《奇門遁甲金鏡寶鑑》 pairs the fifth and sixth seats exactly as this engine does
— 勾陳 with 白虎, 朱雀 with 玄武 — and then decides which of the two names a
seat wears by **what is being asked**: 「如占病、占賊，則勾、雀二神可換虎、武用」,
said once for each dun. It is on the shelf, it is in print, and it is not a
value of `spirits`.

**Because it is a licence to read and not a rule for laying.** The clause is
permissive and its object is use — 可換…用 — and what it moves is a *name*: the
two rings differ at two seats and in nothing else, same star, same gate, same
stem, same palace. In this art the board is a function of the instant and the
question enters at the 用神; a parameter that let the matter select a name would
be that first interpretive act computed, and two boards of one hour would
differ because somebody classified their own question.

**And it would ask a reader to classify before seeing anything.** The tradition
classifies after the board is up. The text names two matters as examples — 占病,
占賊, introduced by 如 — and no source read here closes that list or gives a rule
for a matter it does not name, so the categories such a parameter would range
over do not exist to be shipped. `purposes.ts` is not them: those eight are the
gates read from the other side, a bijection over 擇時 and not a taxonomy of what
is being divined, and neither of the two attested matters resolves onto one of
them.

What travels instead is what travels for every other school's reading: the
licence, named as that school's, where a reading is commissioned rather than
computed. See `docs/readings.md`.

## Two schools of one art, in one reading

*Asked by:* anyone who has just been given the choice.

The twin of the entry above, and the direction it guards is the same. Two
schools of one art laid on one instant are not two witnesses: they share the
pillars, the ju or the seats, and nearly everything they are made of — what
they differ about is the cell somebody wrote a parameter for. Where they agree
it is not corroboration, it is the part neither school ever disputed, printed
twice, and the sharing is heavier here than between two arts.

So a board is cast by one school and read as that school's. Comparing two is a
legitimate thing to do — it is the reason the choice exists — and it is done by
laying each and reading each, in the sections that are addresses, where nothing
is being asked. What must not happen is one reading built on two, or an
agreement between them offered as evidence.

## A school's doctrine, in this engine's own voice

*Asked by:* every reader who wants to know what the board they chose means.

A school is not only a way of computing: it teaches what an arrangement is for,
and the temptation is to ship that beside the values it moved. What may travel
is what already travels for 太乙's conditions, under the same four bounds —
**the source's own words**, a clause and not a paragraph, always glossed, and
always attached to something the engine computed. Free-standing doctrine, a
summary in this project's voice, and an inference from one school about a board
cast by another all stay out.

The reason is the rule at the top of this page. A verdict in this engine's
prose is a verdict nothing can test, where a quotation is testable twice over:
it is in the text or it is not, and it is that school's or it is not. So what
is quoted is named for whoever holds it, in the register as well as on the
page — `docs/sources.md` § "What a value named for a school must show".

---

Every refusal above is enforced somewhere that runs. There is a test that
greps the engine's output for words like "auspicious"; keep it passing.
