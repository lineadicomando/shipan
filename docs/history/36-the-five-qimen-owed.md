# Phase 36 — the five 奇門 owed

Phase 33's audit swept `core` for divergences the engine decides in silence and
found three; a sweep of 《奇門遁甲金鏡寶鑑》 added two more. They were named in
`ROADMAP.md` § 1 and left there together on purpose: four of the five want a
field in 奇門's input type, and `docs/parameters.md` opens by saying that a
field added late breaks the API, MCP, the CLI and every shared URL at once. One
movement or none.

This is the movement. Nothing new is computed: each ships with what the engine
already did as its default and the other side declared and refused **by name**,
which is the whole of what a declaration buys — a value this engine does not
compute comes back a 501 that names itself instead of a chart cast by the
nearest rule it does have.

| | what the engine had decided | what else is held |
|---|---|---|
| `spirits` | 陰陽異名: the dun names the middle pair | the eight fixed in both dun; 白虎 at the fifth seat |
| `leap` | 置閏 repeats 芒種 or 大雪 | it repeats the term the year's leap month falls under |
| `strengths` | 旺相休囚死 read from the season | read from the star |
| `earth` | the four closing months are earth entire | earth has their last eighteen days |
| `centreTravel` | the lodged stem and star stay | they go with their host |

Three of them — the states, the earth under them, and the travelling centre —
reach every cell of the answer. That is what made them expensive to leave
unsaid: a reader comparing this engine's board with another school's would have
found nearly every strength different and nothing anywhere saying why.

## The one that is not a value

《奇門遁甲金鏡寶鑑》 gives a fourth answer to what names the middle pair: what is
being divined. 「如占病、占賊，則勾、雀二神可換虎、武用」, said once for each dun.

It is refused, and not for want of a witness — the witness is a Qing imperial
print. **It is refused because it is a licence to read and not a rule for
laying.** The clause is permissive and its object is use, 可換…用; the two rings
differ at two seats and only in the name, with the same star, gate, stem and
palace under either; and in this art the board is a function of the instant
while the question enters at the 用神. A parameter that let the matter select a
name would be that first interpretive act computed, and two boards of one hour
would differ because somebody classified their own question — before seeing
anything, where the tradition classifies after the board is up.

There is a second missing thing behind the first, and it outlives it. The text
names two matters as examples, introduced by 如, and nothing read here closes
the list or rules on a matter it does not name. So the categories such a
parameter would range over do not exist to be shipped. `purposes.ts` is not
them: those eight are the gates read from the other side, a bijection over
擇時, and neither 占病 nor 占賊 resolves onto one of them — the tradition puts
medicine under a star and the thief under two gates.

What travels instead is what travels for every other school's reading: the
licence, named as that school's, where a reading is commissioned rather than
computed. `docs/refusals.md` § "The middle pair named by the matter".

## And the one that was exposed and unregistered

八字's `luckGranularity` was on `BaziOptions` with a declared default and both
readings computed, and absent from `PARAMETERS` because there was no
`BAZI_PARAMETERS` — the third of the three questions, which is the easy one to
fail. It has a set of its own now, and the board carries the option it is a
function of, which it did not: the value was read inside `luckCycles` and never
came back out.

## And two of them landed the same day

`spirits: fixed` and `spirits: baihu` were not waiting on anything but the
laying. Both were already collated cell by cell — 《御定奇門寶鑑》卷二
enumerates its eight twice and reverses the count and not the names, and
《奇門遁甲全局》's yang board keeps 白虎 at the fifth seat across three charts
with the 直符 in three different palaces — so what the declaration exposed was
that the engine could already have offered them.

They part at two seats and only in the name, which is what makes them cheap and
what makes them worth having: the ring, the star, the gate, the stem and the
palace are the same under all three, and a reader who has met a board drawn one
way can now draw it the other and see exactly what a school changes.

## What is left

Implementing the other three, which is a second witness apiece and is written
against each in `ROADMAP.md` § 1 — and `centreTravel: travel`, which is not
short of witnesses but of a shape. Both sides are in Qing print; what it asks
of the engine is that a palace carry two stems and two stars, since a centre
that travels arrives somewhere already occupied. That is a change to what a
board *is*, and it crosses `plate`, the components and the transcript rather
than sitting inside `plates.ts`. It wants its own errand.
