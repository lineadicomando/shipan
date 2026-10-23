# Consulting: reading a board for somebody

What a consultant does with this project, in order. The contract a model
calling the engine reads first is [`docs/agent-prompt.md`](../../../../docs/agent-prompt.md);
this file is how to work inside it, and it does not restate it. Where a step
says «read», read it: the rule lives there.

## 1. Choose the instrument before casting

The kind of matter decides the art, and the art is chosen once:

| the person brings | kind | arts | engine |
|---|---|---|---|
| a question asked now, or at a remembered instant | 卜 | 奇門遁甲, 大六壬 | `qimen`, `liuren` |
| a birth | 命 | 八字, 紫微斗數, 七政四餘 | `bazi`, `ziwei`, `qizheng` |
| a year and a matter | 天 | 太乙神數 | `taiyi` |

`needs` in `apps/web/src/lib/instruments.ts` is the same table as code. **One
board, one school, one instant**: read `docs/readings.md` § "One board, never two of one
instant" before ever reaching for a second art «to confirm». Two boards of one
instant share most of what they are made of, and their agreement is one fact
printed twice.

Choosing between the two 卜 arts: 奇門 reads space and action — where to go,
when to move, what stands in which direction — and 六壬 reads the development
of an affair through its three transmissions and the people in it. The
discipline files say more; neither is «more accurate».

## 2. Get the board computed, never recalled

- MCP tools: `search_location` for a place, then `compute_qimen_chart`,
  `compute_liuren`, `compute_bazi`, `compute_ziwei`, `compute_qizheng`,
  `compute_taiyi` (a year and nothing else), `lunar_date`, `solar_terms`,
  `scan_moments` to choose a time, `draw_*` only after a compute call.
- CLI in the repository: `npm run cli -w @shipan/core -- <board> --help`, or
  `node packages/core/dist/cli.js` after `npm run build`.
- REST: `/api/<board>` with the query a section page uses.

For the present moment omit the date and time. Times are local clock times at
the place. A birth wants date, time, place, and — for 紫微斗數 and the 大運 of
八字 — the gender the art reads. If the time of birth is uncertain, say which
pillars and seats it can move, by laying the board at both edges, not by
guessing one.

## 3. Say whose board it is

Every answer carries the schools it was laid by and a sentence saying whether a
named text lays that whole combination. Report it in a clause. If the person
follows a school whose value the engine has, lay the board under that value
(the discipline file maps schools to parameters); if the engine refuses it, say
so and lay nothing in its place.

## 4. Read it

The doctrine is in the discipline file, section «How a board is read», and it
is always **somebody's**: give the reading as the school's that teaches it.

A reading, whatever the art, goes:

1. **The subject.** What in the board stands for the matter and for the person
   (用神, 類神, 命宮, 日主). Name the choice aloud and why; another school may
   choose otherwise.
2. **What the board says about it**, in the art's own terms, each claim tied to
   a cell of the board the person can see.
3. **Where it is strong and where weak**, by the art's own measures (旺相休囚,
   廟旺, 和/不和), never by counting 吉 against 凶 — `docs/agent-prompt.md`
   says why the valences are not a score.
4. **What the tradition advises**, attributed, and the person's own judgement
   left as theirs.

The engine refuses the 用神, the ranking, the dating and the advice
([`docs/refusals.md`](../../../../docs/refusals.md)). A consultant may give
them — as a reading, attributed, owned — and never as something the engine
computed.

## 5. What a consultant does not do

- Date a death, an illness, an accident; diagnose; give legal or financial
  instruction presented as the art's.
- Read a birth into a 奇門 board (the natal-Qimen graft is refused; see
  `CLAUDE.md` and `docs/refusals.md`). 年命 places a birth *inside* a board of
  a moment, which is a different thing.
- Present one school as «the» art, or a modern manual's rule as classical.
- Repeat to the person what the engine will not do, as a preamble. Say what the
  board shows.

## 6. When the board looks wrong

It is rarely the engine and often the input: the zone, a daylight-saving
clock, the day boundary (23:00 or midnight), the year boundary, a time given in
Beijing time for a birth abroad. Check the moment block of the answer first.
If it still looks wrong against a printed example, that is a development
question: see [`development.md`](development.md), and run the case through
`texts/bench/run.mjs` if it is a worked example from a source.
