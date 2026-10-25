# What is not built yet

**The engine is built; the open edge is the paper.** What holds is in
[`docs/`](docs/README.md); how it got here is in
[`docs/history/`](docs/history/README.md), never normative. This file was cut
down on 2026-10-08, and what it carried before is in
[`docs/history/roadmap-2026-10-08.md`](docs/history/roadmap-2026-10-08.md).

## Resuming cold

**Surface work comes first, by the user's word of 2026-10-25: § "First: the
lens on every board", below, carries everything needed to take it up.** For a
reading, **read this section, then pick an item of "What to do next" below, or
a line of § 2.** For it read three things and no more:

1. **what the file is** — `texts/README.md`, one row: grep the filename. It
   has the extent, the page offsets, the way in and what is already read;
2. **what is established** — `docs/sources.md` is thousands of lines: grep the
   work's title, read the section the hit is in;
3. **what the value needs** — § 1, the row under the value's name.

**Do not open** `docs/sources.tsv` (a test and a surface read it),
`docs/history/` (why, never what), `texts/rules/`, `texts/crosswalk.tsv`,
`texts/manifest.json`. [`docs/scans.md`](docs/scans.md) is the method: read it
once before a first survey.

**A reading is owed four things**: the argument in `docs/sources.md` with its
date, the row in `docs/sources.tsv` and its rung (found by grep and edited in
place, never read through), the row of `texts/README.md`, and this file.
**A reading that moves the code owes more**: the declaration in
`packages/core/src/parameters.ts` (`heldBy`, a value, its `implemented`), a
new witness in `packages/core/src/witnesses.ts`, the row in the table of
holders in `docs/sources.md` § "Whose each value of a 奇門 board is" and its
siblings, a test (`packages/core/test/witnesses.test.ts` for a holder); the
version in every manifest and `package-lock.json`, by the three questions of
`docs/architecture.md` § "Which term moves": an address that answers
differently moves the second term, something shipping that none answered for
the third, a session that ships nothing neither; a phase in `docs/history/`
with its line in that directory's README; and one commit on `main`. A value
added to the engine also fails the MCP and web suites until § 5's two lists
carry it, and its strings go into both catalogs under the `reader-copy`
skill. `node texts/todo-check.mjs`, after a build, holds every parameter,
value and path this file names to the code.

A plate reads at two to four pages a
minute. A woodblock with no 目錄 is found on tiles of six pages rendered
small, then read on the page; `texts/contact.py` and `texts/banxin.py` do the
tiling, and a digit is read beside whatever checks it — a sum, a rate, a
table already held. **A table too long for one reading** — a 立成, a run of
drawn boards — is transcribed by readers working to a written brief, a page
range each, into TSV; the cells that disagree with the engine are then
looked at on the plate before anything is written up. Five precedents, each
with its brief and its comparison script: `texts/taiyi/tongzong-juan31-notes/`,
`texts/taiyi/tongzong-juan32-35-boards/`, for prose rather than cells
`texts/qimen/daquan-juan05-10-hours/` — whose `engine.mjs` lays all 1080 hours
of the 時家 board off the engine's step functions under several parameter
values, and is the generator to reuse for any table of 局 and hours — and, for
one table set against another, `texts/qimen/daquan-juan14-16-stems/`; for
drawn diagrams, `texts/qimen/daquan-juan60-baojing/`, whose `scripts/` find
the drawings by their ink (`wheels.py`), cut each to a disc (`disc.py`), lay
the engine beside the transcription (`compare.mjs`) and find the day a
drawing fits when it is not its own (`lag.mjs`). Each
directory has a README or a brief saying what its files are. A transcriber
normalises titles it believes misprinted, so a title out of sequence is
checked on the plate too. **The 大全 is surveyed with three scripts** in
`texts/qimen/daquan-tools/` (its README says how): `blanks.py` brackets
juan by their blank half-pages, `edges.py` reads the 版心 to confirm each
bracket, `tile.py` lays eight sheets to a look for the headings. A passage
that might hold a 起例 is then read at 170–220 dpi, and a doubtful character
at 400–500. **A date the engine can find** — a solstice on a
named day pillar and lunar date — is searched rather than guessed:
`texts/qimen/daquan-juan11-13-zhirun/` has the scripts, run against the built
engine. `texts/qimen/daquan-juan43-48-mijue/` does the same through the CLI
for an undated case, and holds a rule read in prose to the 大全's 101 spirit
claims of 卷五–十: the pattern for testing a commentator's rule against the
compilation's own tables. **A run of worked cases** — 假如 … 局 … 時, then
where things stand — is transcribed to `texts/qimen/daquan-juan49-baojian/cases/BRIEF.md`
and each case laid with `check/board.mjs <陽|陰><局> <hour>` beside it, which
prints the board off the engine's step functions with the spirits under both
seats, `HOST=8` lodging the centre in 艮; read every case by eye against it,
and each one that bears on a value again on the plate. **Keep scratch scripts in `texts/` from the
start**: `/tmp` was emptied once in the middle of the session of 2026-10-19,
and the renders and a script with it.

**Before the session ends, sweep** `docs/sources.md`, `texts/README.md`,
`docs/provenance.tsv` and this file for sentences the session outlived: «not
yet read», «unread», «still missing», «none opened», «nobody has», «stays
refused», «this list is empty».

### Where it stands, 2026-10-25

**Version 0.34.0** on the branch `lens-generic`, open since 2026-10-25 and
carrying the lens to every board a step at a time; `main` is at 0.33.0. The
branch «lenses» landed on 2026-10-25 and was deleted, as `board-pointer` was
on 2026-10-18. What `main` carries since 2026-10-15 is of eleven days:

- 2026-10-15, surface work: the Qi Men section holds its board in the page
  (`InlineBoard.svelte`, `spotOf` in `lib/board.ts`) and says which register a
  name stands in while a pointer rests on it.
- 2026-10-16, the shelf and what it built: the 大全's eighteen 局 tables read,
  then `spirits: huwu` and `centreStem` (0.25.0); its 遁甲通明鈐 read, and the
  大全 named a holder of 置閏; `dayouEye` (0.26.0); its 奇門仙機 surveyed and
  its two stem tables read against 十干克應; the sixty-seven cells reviewed
  and `stemPairs` built (0.27.0).
- 2026-10-17, the shelf: the rest of the 大全's 先天要論, 卷十七–二十四, and
  its 奇門古本, 卷二十八–三十二, and its 乾坤變異錄, 卷三十三–三十八,
  surveyed for a 起例 and none found; the 古本 carries the 年家 on 一七四.
  `blanks.py` added to the 大全's tools. No version moved, and no code.
- 2026-10-18, the shelf: the 大全's 禽遁秘訣陰符經, 卷三十九–四十二,
  surveyed for a 起例 and none found; its 遁甲 run in 卷四十 is the ordinary
  起例, and one worked hour agrees with the engine. No version moved, and no
  code.
- 2026-10-18, surface work: every drawing marks its seats and names in one
  vocabulary (`marks.ts` in `@shipan/plate`: `data-board`, `data-unit`,
  `data-seat`, `data-layer`), and every board on the site — the five
  sections, the consultation and the scan's dialog — is held in the page and
  says the layer of a name a pointer rests on, from
  `label.register.<board>.<layer>`. Zi Wei keeps a press for going to the row
  (`pin={false}`). `LayerLegend` prints a key to the seats of each board.
  `apps/web/test/marks.test.ts` holds every mark to `LAYERS` and to a word in
  each catalog. No version moved for the marks: the drawings look as they
  did. Beside it, on `main`: the four other sections printed no board in the
  light scheme, and now hide the board on screen only where a copy for paper
  is there to swap in.
- 2026-10-18, after the landing (0.28.0): `schoolDepth` counted the lines
  naming the schools before the fold, so the 六壬, 七政四餘, 太乙 and 紫微斗數
  sheets came out too short for a folded line — the Zi Wei board set its last
  lines below its foot, and 太乙's note on its numbering was printed over the
  last of them. It counts after the fold now, and a test sets lines long
  enough to fold on every one of the four. The Zi Wei board prints centred.
- 2026-10-19, the shelf: the 大全's 奇門秘訣, 卷四十三–四十八, surveyed for a
  起例. It is six juan, not seven, and a commentary on the 煙波釣叟歌 that
  states the ordinary 局 and 置閏 at nine. Two readings are recorded: the
  spirits seated from the earth plate at a 己 to 癸 hour, which the 大全's
  own hour tables do not lay, and 乙 buried in 乾. No version moved, and no
  code. The scripts that dated a case and tested the spirits are in
  `texts/qimen/daquan-juan43-48-mijue/`.
- 2026-10-20, the shelf and what it built (0.29.0): the seat of the spirits
  put to the user on 2026-10-19 is `spiritSeat`, on their word: `tianpan`, the
  default, held by the hour tables of 卷五–十, and `yinshi`, computed, held by
  the 奇門秘訣 as the witness `qimenmijue`. Checked on the plate first: the
  rest of sheets 1085–1086, which move the seat and not the direction, and
  陽遁五局 癸卯 on sheet 154, the one agreeing hour of the tables, which is the
  print's 太陰 for 六合 a third time. Renders and notes in
  `texts/qimen/daquan-juan47-seat/`.
- 2026-10-20, the shelf (0.29.1): the 大全's 寶鑑摘要, 卷四十九–五十七,
  surveyed and its 32 worked cases laid against the engine. 卷四十九 is the
  統宗's 起例 again, and its 小直符加大直符 puts the 統宗 among the holders of
  `spiritSeat: tianpan`; the 漢陰居士歌 of 卷五十三 states 陽二陰八 as its own
  rule and works a board on it, so `centreLodging: dun` is held and no longer
  only reported; four cases at a 己 to 癸 hour split two and two on the seat
  of the spirits. No value moved. Scripts and transcriptions in
  `texts/qimen/daquan-juan49-baojian/`.
- 2026-10-22, the shelf (0.29.2): the 大全's 吉凶格解, 卷五十八–五十九,
  surveyed. It defines the 格 and lays no board, and nearly every 格 the
  engine names it defines alike. Its 入墓 verse holds `dingTomb: gen`, as the
  witness `jixionggejie`. Two readings were found and put to the user, and
  built the same day (next item): 門迫 named for the gate that suffers
  (宮制門), and 乙 buried in 乾, which 《奇門遁甲秘笈大全》卷十五 states in
  another recension of the same verse, read on the 省思堂 plate. Renders in
  `texts/qimen/daquan-juan58-jixiong/`.
- 2026-10-22, what it built (0.30.0): both readings, on the user's word, as
  `menpo` (`menzhigong`, the default, and `gongzhimen`, which also marks
  宮迫) and `yiTomb` (`kun`, the default, and `qian`), with the 秘笈大全 a
  witness as `mijidaquan`. Then the refusal of 三奇得使 re-read on the plate:
  the pairing is transmitted alike by five works, the 演義's copy of the 葛洪
  cases lays, and the dispute is a modern second rule and the fortune of three
  cells. Renders in `texts/qimen/daquan-juan58-jixiong/deshi/`.
- 2026-10-22, last (0.31.0): 三奇得使 built on the user's word as `deshi`,
  `liuyi` by default and `zhishi` beside it, both 吉. Its refusal is gone. The
  canonical 奇門 board now carries four marks of it, checked cell by cell.
- 2026-10-22, the shelf: the 大全's 寶鏡圖, 卷六十–六十四, surveyed and its
  sixty day wheels transcribed by four readers and laid against the engine.
  The wheels are the 日家 board: the stars the yang count every day of the
  cycle, no yin half, and the gates turned with the sun every day. Twenty
  wheels, 己亥 to 戊午, print the day before's rings. Two readings put to the
  user and built the same day (next item). The 大全 is surveyed to its end
  bar 景祐秘纂 卷二–四.
  Scripts and transcriptions in `texts/qimen/daquan-juan60-baojing/`.
- 2026-10-22, what it built (0.31.1): both, on the user's word, as
  `dayGates: shun` and `dayDun: yang`, held by 寶鏡圖 as `baojingtu`; the
  forty wheels of their own day are a test fixture.
- 2026-10-23, the documents: the roadmap and `texts/README.md` reviewed
  against the code under the `review` skill, every file of the shelf named in
  a row of its own, and § 2 says what is left to read. No code, no version.
- 2026-10-23, the review (0.32.0): levels 1 and 2 of the `review` skill, art
  by art, with the `shushu` files as the lens. What was fixed: 紫微's
  旬中空亡 follows `ziwei.yearBoundary`; the 七政 prompt follows `luohou` and
  `xiudu` and cites 星學大成 卷三 for the direction of the twelve; the 紫微
  prompt names the 四化 table in force; the `compute_ziwei`,
  `compute_qizheng` and `scan_moments` descriptions stop stating a default as
  the rule; 太乙's «a whole 元» is 盧央's word and not the engine's; stale
  comments and the `shushu` files corrected. What it found and left is item 5
  below.
- 2026-10-23 and 2026-10-24, the shelf (0.32.1): 景祐秘纂 卷二–四 surveyed,
  its cases laid, the last of the 大全. 卷二 is the 符應經's 卷中 in 第一冊's
  recension, and three of its cases, with the 演義's own copies of two, lay
  only under `centreStem: host`: the 演義 enters its holders and the row
  rises to rung 2. 卷之二下 states the ordinary 起例 in verse, names 折補
  without a rule, and lists the engine's thirteen 門迫 cells as 宮迫 with no
  converse, which is recorded. 卷三–四 work no case that names a 局, and 卷四's
  局 table is printed with slips. Work directory
  `texts/qimen/daquan-juan02-04-jingyou/`.
- 2026-10-24 and 2026-10-25, surface work (0.33.0): the lens on the 奇門
  board and the bench under every drawn board, on the branch «lenses», phase
  71. The rule it carries out went to `main` first, on its own: a reading
  arises in the person looking, and the surface never chooses where they look
  (`docs/refusals.md` § "Where to look first"). Carrying the lens to the other
  boards is the first item of "What to do next".
- 2026-10-25, on the branch `lens-generic` (0.34.0): item 1 of § "First: the
  lens on every board" — the lens a descriptor every board fills (`Lens` in
  `core`), `qimenLens` its first instance, and the page's lens and its
  wiring knowing no board. Then item 2: the board of a day has its lens
  (`dayLens`), its nine stars kept by kind for want of a registered phase.
  Phase 72. The `lens` that `routes/api/qimen/+server.ts` answers changed shape,
  which is what moved the version.

`main` is pushed to `origin/main` as of 2026-10-18; the commits of
2026-10-19, 2026-10-20, 2026-10-22, 2026-10-23, 2026-10-24 and 2026-10-25 are
not pushed, and pushing is the user's call.
`npm test`, `npm run typecheck` and `npm run build` pass on 2026-10-20 with no
test skipped, and again on 2026-10-22, 2026-10-23, 2026-10-24 and 2026-10-25,
on `main` and on `lens-generic`. **Run `npm run build` before `npm test`** in
a fresh tree: the MCP and web suites and the shelf's scripts import
`packages/core/dist`, and a stale `dist` fails them on whatever changed.

### First: the lens on every board

**The user's priority, set on 2026-10-25.** The 奇門 board of an hour has a
lens and a bench, and the concepts and ways of working settled on it are to be
carried to every other board: the 奇門 board of a day (日家), the month board
once there is one, 六壬, 七政四餘, 紫微斗數 and 太乙. Surface work, so the
procedure is the `new-feature` skill, a branch, one commit a step, and the user
looking at each step in the browser before the next — every one of the
decisions below was a correction made that way.

**Read before starting, and nothing else:** `docs/refusals.md` § "Where to look
first" (the rule); `docs/architecture.md` § "A board the page can point into"
(the lens, from «The second is a lens») and § "The bench" (the layout and the
measure); `docs/history/71-the-lens.md` (what was decided and reversed, and
why). The code to copy from is the 奇門 hour board:

| | |
|---|---|
| `packages/core/src/lens.ts` | `Lens`, the descriptor every board fills: `board`, `seats` (strings, in the board's order), `layers`, `phased`, `things` (`seat`, `layer`, `id`, `element`), `phases`, `linkIds`, `links` (each `between: 'seats'` or `'things'`), `names`; `phaseTable` and `lensNames` to fill it |
| `packages/core/src/dunjia/lens.ts` | `qimenLens(chart)`, the first instance: 對宮 as links between palaces, 五合 between stems. Test: `packages/core/test/lens.test.ts`; `apps/web/test/marks.test.ts` holds `QIMEN_LAYERS` to the drawing's |
| `docs/sources.md` Tier 3, `docs/sources.tsv` | three rows «a lens: …» beside 門宮 · 星宮. **A relation a lens draws is a quantity**: it needs its row and rung before it is drawn |
| `apps/web/src/routes/api/qimen/+server.ts` | answers `lens` beside the chart; the client imports only types from `core` |
| `apps/web/src/lib/lens.ts` | the state (`LensState`: `layers`, `phases`, `focus`, `pair`, `chosen`, `toward`, `shengke`, `links`, `extended`), `viewOf`, `pairTable`, `pressed`, `pressedSeat`, `pressedInPair`, `oneAtATime`, `wayOf`, `activePhases`, and the fragment (`writeLens`, `readLens(fragment, lens)`). Board-agnostic: seats, layers and links are the descriptor's, `SpotKey` is `${string}:${string}` |
| `apps/web/src/lib/held-lens.svelte.ts` | `HeldLens`: the fragment ⇄ state, `pick`, `putAway`, `pressedOutside`, `escaped`, `tip`, `focusName`, `pairSaid`. A section gives it `lens`, `t`, `nameAt(seat, layer)` and `seatName(seat)` |
| `apps/web/src/lib/arrows.ts` | `layArrows`: straight where clear, bent where an arrow would cross a name or lie on another. Board-agnostic |
| components | `LensSide` (the column: circle, mode, controls) and `LensReading` (what is said under the board), which hold the rest: `LensBar` (ways and controls), `LensMode` (mode and «whole board»), `LensLinks` (the arrows over the drawing), `LensRelations` and `LensPair` (the same in words, under the bench), `FiveWheel` (the circle), `NameKey` (the key to a bare drawing's numerals), and `InlineBoard`'s `lens` prop (receding, by `data-lens` on the marks) |
| `apps/web/src/routes/[lang]/qimen/+page.svelte` | a section holding a lens: `nameAt`, `seatName`, `new HeldLens(…)`, and `held.pick`, `held.tip`, `held.view` on `InlineBoard` |
| `apps/web/src/app.css` | `--board` (a height: the window less `--above`, over `--aspect`), `--above`, `--side`, `.bench`, `--lens-sheng`, `--lens-ke` |
| catalogs | `lens.*`, `label.relation.duigong`, `label.relation.wuhe`; the copy was reread under the `reader-copy` skill |

**What was decided, and holds on every board:**

- Nothing is lit when a page opens; a lens is an act of the reader's. Kept
  things stay as drawn and the rest recedes; nothing is made heavier but what
  the reader pressed, which is framed as theirs.
- The page computes no relation: it looks each up in what the engine handed
  over. A thing with no registered phase takes no part in a relation and can
  only be kept by its kind (the 八神 on 奇門).
- The lens lives in the fragment, never in the query, a prompt, storage or a
  request. The mode is in the fragment too, and the privacy note's inventory
  of what the browser keeps does not move.
- Arrows only, violet for 生 and magenta for 剋 and each with its stroke, the
  other relations in ink; curved by `layArrows` where a straight one is not
  clear. A pair draws every relation as a flow, from what acts to what is
  acted on, and holds its two seats in the board's order, never the order
  pressed, so neither is the asker's.
- A pair compares only the names pressed inside its two seats. A seat's
  ground selects it; a name inside a complete pair is put into or taken out of
  the comparison.
- Two modes, «Base» by default and «Estesa», named for what each offers and
  never for who might use it. Both choose a way first — «due palazzi · un
  nome e il resto · una fase» (the extended mode's third is «tipi e fasi») —
  and the extended adds multiple choice, kinds of name, 對宮 and 五合. No paragraph of
  instructions: each way says what to press.
- «Tavola intera» beside the mode, always in its place and disabled when
  nothing is laid; also a press on the board outside its seats, a press on the
  page's ground, and Escape. Not the bar, the column, the readings or any
  control.
- The bench: the board whole in the window under the bar, the column beside
  it scrolling with the page (not sticky), the circle of the five phases at
  its head, the mode under it, then the lens. The steps of the moment stay in
  the bar. The key to the marks of strength sits under the board.
- The tip over a name is 0.95rem, a step over the board's own words.

**The items, in the order proposed**, each a step of its own on the branch:

1. **Done on 2026-10-25** (phase 72): the lens board-generic, as the table
   above now describes it. Seats on the ring boards may need the `unit`
   beside the seat (`marks.ts` says one identifier can name two kinds of seat
   on one board); the descriptor carries none yet, and the first ring board
   decides it.
2. **Done on 2026-10-25** (phase 72): the 奇門 board of a day has its lens,
   `dayLens(day)` beside `qimenLens`. Its palaces and gates have a phase, a
   gate its home palace's as on the hour board; **its nine stars have none
   registered** and are kept by kind only, as the 八神 are, until a text
   giving them one is read. 對宮 carries over and 五合 does not. Two rows in
   the register.
3. **六壬.** The relation the art is made of is 生剋 between branches and
   stems — the 四課 and the 三傳 are found by it — so the lens is native here:
   the branches of the two plates, the 四課, the 三傳. **The 十二天將 have no
   registered phase** (`docs/notes.md`, the rung «—», and the drawing leaves
   them uncoloured), so they are kept by kind and never related until the
   lead in `.claude/skills/shushu/disciplines/liuren.md` (《六壬大全》卷二) is read and
   registered. A pair is two palaces of the ring. The ring's seats are branch
   identifiers.
4. **七政四餘.** The seven governors have the phases of their planets; the
   four remainders' phases and the ownership of each 宮 by a governor are
   transmitted, not derived, and each wants its row before it is drawn. Which
   relation the art reads between a body and the 宮 it stands in is a reading
   to locate first (`.claude/skills/shushu/disciplines/qizheng.md`).
5. **紫微斗數.** Every star's 五行 is transmitted (陰陽五行 in 全書's tables)
   and some are disputed: register before drawing. 三方四正 is the art's own
   structural relation, derived from the twelve seats, and is the obvious
   second link kind beside 對宮; the 四化 flights from a seat are a third.
   The page already holds the board in the page with a press going to the row
   (`pin={false}`): the lens has to share the press with that.
6. **太乙.** The sixteen gods carry `element` in the drawing's type; whether
   each is registered is to be checked (`.claude/skills/shushu/disciplines/taiyi.md`, «the
   elements of 文昌 and 始擊 in the 金鏡 against the register's»). The nine
   palaces are numbered one seat off the 洛書, and every surface says so: a
   pair's order must follow 太乙's numbering and the page must keep saying it.
   Its endpoint is told no language, and stays so: the key is built in the
   page (`lib/key.ts`) and a lens's names must be too.
7. **The month board**, when there is one: designed with its lens from the
   start, by the descriptor of item 1.
8. **八字**, last and only if the user wants it: the four pillars are a grid in
   the page's type, not a drawing, and the relations a reader would ask for
   there (合, 沖, the ten gods) are a different lens.

**Owed before the next landing, left from this one:** a printed sheet of each
of the five boards on paper, which was reasoned from the stylesheets and not
printed; and a look at the consultation, which still shows the full drawings,
band and all, and takes the new measure.

**What to do next, in the order the user has been taking it.** Nothing
decided is left unbuilt.

1. **The 十干克應 cells two lines name alike** beyond the fourteen, which
   the review of 2026-10-16 found and did not take into `shared`: § 1,
   "Recorded, with no parameter", under 奇門.
2. **Or `stemPairs: xianji`**: six cells of the 仙機's 干論 read again on the
   plate, § 1. Its transcription is held, so this is an errand of six looks.
3. **Or two errands left by 2026-10-22.** 截路空亡 on 寶鏡圖's other
   fifty-nine leaves: 癸未's gives it at 子 and 丑 only, where the engine
   marks the 壬 and 癸 hours, four on a 戊 or 癸 day; the hour lines are on
   the leaf after each wheel,
   `texts/qimen/daquan-juan60-baojing/order.txt` gives the sheets. And the scan
   form's `gongpo`, § 5.
4. **Or a lead from the `shushu` skill.** Each art's file in
   `.claude/skills/shushu/disciplines/` ends on «Leads against the register»:
   passages located on the web or in a shelf transcription that bear on a row,
   none read on a plate. The ones that touch a standing question: the order of
   涉害, where 《大六壬精解》 and 《六壬大全》卷五 hold depth first with a worked
   board the engine opens otherwise, likely the bench's failing 涉害
   (`liuren.md`); the five phases of the 十二天將 in 《六壬大全》卷二, held
   (`liuren.md`); 截路空亡 at two hours in 《星曆考原》卷五, beside 寶鏡圖's
   (`almanac.md`); the 楊公忌 check, which the 協紀 says is not the 值日 count
   (`almanac.md`); the elements of 文昌 and 始擊 in the 金鏡 against the
   register's (`taiyi.md`); 洪丕謨 and 盧央 on the shelf for the year and day
   boundaries no text holds yet (`common/foundations.md`). Each is a reading
   of a file held, bar two: the 楊公忌 passage is in the 華齡 協紀's (下) and
   《星曆考原》卷五 is not on the shelf either.
5. **Or what the review of 2026-10-23 found and did not fix**, each wanting a
   plate or the user's word:
   - 六壬: 涉害 palace-first against 精解 pp. 10–11 (`texts/rules/LR-04.md`),
     which also counts the starting palace and the 寄干; 無親, which 精解
     names, closed as unnamed; no row for the direction of the generals, the
     遁干, or 無依, 自任, 自信, 虎視, 冬蛇掩目.
   - 曆注: 臨日 carried `xiong`, where the 協紀 overrules the 《樞要歷》 and
     calls it 吉 (華齡 OCR pdf p. 160, memorial p. 13); 十二神 at rung 4 on a
     7 300-day check; the 神煞 row still says seven; 宜忌 refused with no
     entry in `docs/refusals.md`; a second 喜神 rule in 卷七 leaf 47.
   - 八字: yin-stem 長生 is a school (任鐵樵) the prompt does not sign;
     `dongzhi` turns the 大運 for six weeks with no witness; no row for
     `dayBoundary: midnight`.
   - 奇門: no row for `spirits: fixed`, `spirits: baihu`,
     `centreTravel: travel`; the 入墓 row's rung against its now-split axis;
     the 統宗's and the 秘笈大全 卷一's copies of the 入墓 歌 on the plate;
     the 飛盤 and 日家 refusal rows and the 十干克應 one (a second witness
     asked for, 70 for 67).
   - 七政: `luohou: ascending` with no `heldBy` and no row; the 三辰通載
     described two ways; `minggong: yuejiang`'s 三命通會 lays on the month's
     palace and would part from the Sun's under `gong: ci`.
   - 太乙: no row for 陽宮/陰宮; the roles' elements carried by nobody;
     《齊書》 likely 《南齊書》; kintaiyi (MIT) exists against «nothing open
     computes this board»; `ji: yueji`/`shiji` «being built» against «wait».
   - 紫微: no row for `yearBoundary: lichun`; the five phases row's rung;
     「辨生剋制化以定窮通」 is 斗數準繩's and not the 太微賦's; 第五冊 of the
     絕學 holds three works; the `sihua` refusal row unmarked.

**On the surface, nothing is owed and nothing is decided next.** What a
pointer does beyond naming the layer is open; the em dash of § 5 is the one
known fault. Not looked at in a browser: choosing another hour while the
scan's dialog is open. To take surface work up again, read
`docs/architecture.md` § "A board the page can point into", then `marks.ts`
in `packages/plate/src` and `lib/board.ts`; a layer added to a drawing goes
into `LAYERS` and both catalogs, and `apps/web/test/marks.test.ts` says what
is missing. Three things learnt checking it by hand: `npm run dev -w
@shipan/web` serves the built `dist` of the packages and does not see a new
export until it is restarted; a board's SVG is cached `private` for a day, so
a page reloaded normally can show a drawing from before the change; and a
page is checked on paper with `google-chrome --headless=new
--no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=out.pdf`
against the dev server, which is how the blank first sheet and the sheets
cut short were found.

**Decisions held open, by the user's word, until there is more to decide on:**

- **太乙's 月計 · 日計 · 時計: wait, all three** — the user's word of
  2026-10-11, with the options set out and none taken. The 《統宗》 states
  each as a procedure and the three stand unalike. The hour's count is read
  and would build: from the epoch, the 局 following from the 干支 of the day
  and of the hour, 陰局 after 夏至. It was reached by argument and by eight
  undated boards agreeing, which is why it waits too. The day's does not
  build: the 甲子 the work dates as 上元第一紀 stands 120 days, or 240, from
  where its own count puts it. The month's was read as a procedure and no
  further. Building any of them is a second input type — an instant and a
  zone where `taiyiBoard` takes a year — a `dayBoundary` under the board's
  name, a ruling on `gate`, `sanji`, `wufu`, `dayou` and `ding`, which have
  counts of the year only, and a line in `lib/cacheable.ts`.
- **`gong: ci`.** The table is read, with three cells of twelve miscopied.
  Not built until a second copy gives those three.
- **囚 and 格 on the dated boards of 卷七: the row stays on rung 5** — the
  user's word of 2026-10-14. Four boards name 囚 where the engine names it
  and one names 格, and the dispute that holds the row there is about subjects
  those cases do not reach. Reopened only by a source that moves it, not by
  the same boards read again. `docs/sources.md` § "Whose each value of a 太乙
  board is", under "The rest of 卷七".
- **The test of a count by its digits: not built** — the user's word of
  2026-10-15. The 《統宗》卷三十一 立成 labels every count by it and the 金鏡
  quotes it as 王希明's lists, so it would be a value of a parameter beside
  the eye's test that `accord` computes; but the labels are a practice
  induced from a table, and the lists are three prints three ways. It waits
  on a sentence stating the rule, in any work.

**Done between 2026-10-11 and 2026-10-24, and nothing is half done.** Each
reading and each build of the engine has its section in `docs/sources.md`,
its row in `docs/sources.tsv` and its line in `texts/README.md`; phases 51 to
70 in `docs/history/` are the record. The surface work of 2026-10-15 and
2026-10-18, and the review and the documents of 2026-10-23, have no phase:
"Where it stands" above and the commits say it.

- 2026-10-11: `yearBoundary: dongzhi` of 太乙 computed; `host.accord` and
  `guest.accord` carry 和, 重陽 or 重陰; 八門直使 and 大遊 on rung 2;
  `wenchangTaiyi: guan` held by the 《統宗》.
- 2026-10-13: the rest of the 《統宗》卷七 read; three of its dated boards in
  `test/taiyi.test.ts`.
- 2026-10-14: the ten 精 of 卷三十六 and 大遊's 天目, 卷十一 p. 110, read to
  the numeral; nothing built.
- 2026-10-15: the 《統宗》卷三十一 立成 read whole with every note, and the
  144 drawn boards of 卷三十二–三十五 read for their counts, 定目 and six
  generals. 陰局 46 of the 金鏡's 立成 settled from a second work, and four
  cells both tables get wrong printed right on the boards. **Built**: 杜 as
  the eighth 太乙 condition, with no fortune (0.22.0); `ding`, the 定目 and
  定算 by 卷四's 淘金訣 rule, on rung 4 (0.23.0), and its two generals as
  the boards draw them (0.24.0). The transcriptions behind these are in
  `texts/taiyi/tongzong-juan31-notes/` and
  `texts/taiyi/tongzong-juan32-35-boards/`, each with the brief its readers
  worked to and the script that compares it to the engine.
- 2026-10-16: the 《御定奇門大全》卷五–十 read whole, the eighteen 局 hour by
  hour, transcribed by eight readers into `texts/qimen/daquan-juan05-10-hours/`
  and held to the engine's step functions under every value a table keyed by
  局 can tell apart: `centreLodging: kun` and `earthPlate: yuan` hold, and
  two recorded divergences are named by a text. **Built** on the user's word
  of the same day: `spirits: huwu` and `centreStem`, with `heavenLodged` on
  the palace the centre's stem rides to, held by `qimendaquan` (0.25.0).
  Then the 大全's 卷十一–十三, 遁甲通明鈐, read for its 起例: 置閏 with the
  block before the solstices, the leap month refused in words, 淳祐六年
  reproduced block for block, and a 卷十二 that intercalates at ten where its
  卷十三 does at nine. No rung moved. **Declared** on the user's word of the
  same day: the 大全 beside the 統宗 in `heldBy` for `method: zhirun` and
  `leap: solstice`, which no surface prints and no answer changes for.
  **Built** on the user's word of 2026-10-14, named on theirs of 2026-10-16:
  `dayouEye`, the eye of the 大遊 counted by the 金鏡, `jinjing`, the default,
  or by the 《統宗》, `tongzong`, which its 1520 figure holds. The two agree
  in one year in nine, measured over the 3384 years in which 72 and 188 meet,
  where the register had said one in eight. 0.26.0: every 太乙 board carries
  the option.
  Then the 仙機's two stem tables read against 十干克應, and on the user's
  word the sixty-seven reviewed: `stemPairs`, `shared` by default, `jinhan`
  laying 《金函玉鏡》's table with its fortune where it states one, `xianji`
  declared and refused (0.27.0).
- 2026-10-17: the rest of the 大全's 先天要論, 卷十七–二十四, surveyed on the
  版心 and read on the plate where a 起例 could stand. 卷十七 carries the
  探索錄's 符經 and settles its 輔甲 as the 2012 print's; 卷二十–二十一 are
  the ordinary 局 and agree with the engine. Then 奇門古本, 卷二十八–三十二:
  its 卷二十九 prints the 年家 on 一七四 with 遁甲集成 第三冊's epoch chain and
  a case at 1648, a second copy of that line older than the first, and a
  日家 of six sixty-day 局. Then 乾坤變異錄, 卷三十三–三十八: omens of the
  sky and the ground, and 卷三十九 is 禽遁 already. Nothing built.
- 2026-10-18: 禽遁秘訣陰符經, 卷三十九–四十二, surveyed and its 遁甲 run read
  on the plate: 演禽, and a 遁甲歌 stating the ordinary 起例. Its 五不擊 works
  陽遁八局 辛卯 on five palaces, which the engine lays under `earthPlate:
  yuan` and not under `xun`. Nothing built.
- 2026-10-19: 奇門秘訣, 卷四十三–四十八, surveyed and the 歌's commentary
  read on the plate where it lays a 局. Its 局 table prints 芒種 as 夏至's row
  against its own verse; it states 置閏 at nine; a case in 卷四十五 names
  小暑中局 and walks 陰遁八局. It seats the spirits from the earth-plate 直符
  at a 己 to 癸 hour, and 卷五–十 lay 38 of 39 such claims where the engine
  does. Nothing built.
- 2026-10-20: that seat built as `spiritSeat: yinshi`, the user's word on the
  question of 2026-10-19: two works and not one, so two readings. The rest of
  sheets 1085–1086 and 陽遁五局 癸卯 read on the plate first (0.29.0).
- 2026-10-20: 寶鑑摘要, 卷四十九–五十七, surveyed; three readers transcribed
  its worked cases. The 統宗 holds `spiritSeat: tianpan` and 漢陰居士歌
  holds `centreLodging: dun`; four cases split on the seat (0.29.1).
- 2026-10-22: 吉凶格解, 卷五十八–五十九, surveyed and the 格 the engine
  computes read on the plate. Its 入墓 verse holds `dingTomb: gen`; its 門迫
  is the converse of the engine's, and the 秘笈大全's recension of the same
  入墓 verse puts 乙 in 乾. 寶鏡圖 bracketed (0.29.2). Both readings built
  the same day as `menpo` and `yiTomb`, and 三奇得使's refusal re-read (0.30.0).
- 2026-10-22: 三奇得使 built as `deshi` (0.31.0), on the user's three words:
  the transmitted pairing by default, 開悟之門's 值使 rule beside it, 吉 under
  both. Then 寶鏡圖, 卷六十–六十四, surveyed; its sixty day wheels transcribed
  by four readers and laid against the engine; `dayGates: shun` and `dayDun:
  yang` built on them (0.31.1). The board of 癸未 under both, seen in the dev
  server, is the wheel of sheet 1420 cell for cell.
- 2026-10-24: 景祐秘纂 卷二–四, the last of the 大全, written up after the
  survey of 2026-10-23; sheets 47–64 transcribed again by two readers. The
  演義 holds `centreStem: host` beside the hour tables, on rung 2 (0.32.1).

**Left open by the reading of 2026-10-24**, each small and none blocking. In
景祐秘纂 卷二: whether 遁甲集成 第一冊 carries the 38L case, 伏干格 陽五局
壬申, which marks 庚 over the centre's stem in 坤 — the 演義 works its 伏干格
on a 甲申 day and reads otherwise, p. 951; the cases of 33L and 35L, which name
景門 the 直使 where the engine has 生門 and 傷門, garbled round it; and whether
卷之二下's 諸凶格 list is 吉凶格解's closing summary copied, which its 奇墓 and
天網四張 suggest and nobody set side by side. Not transcribed: the wheels of 46L
and 47R. In 卷四: five passages naming an hour and where its 直符 stands, with
no 局 to lay them from, `cases/83-98.tsv`. Everything is in
`texts/qimen/daquan-juan02-04-jingyou/`.

**Left open by the reading of 2026-10-22**, each small and none blocking:
吉凶格解's 釋吉格 — the 九遁, 三詐, 五假, 玉女守門 — seen at 50 dpi and not
read, since the engine computes none of them; 三奇受制 printed 「丙丁臨一」 in
吉凶格解 and 「丙丁臨九」 in the 秘笈大全's verse, not weighed; and the
handwritten slip photographed over sheet 1389. In 寶鏡圖: 截路空亡 at two
hours only, 子 and 丑, on 癸未's leaf, where the engine marks the 壬 and 癸 hours, and
the other fifty-nine leaves not read for it; the six wheels whose stars part
in a cell or three, re-read on the plate only for 壬午; 卷六十's almanac.

**Left open by the readings of 2026-10-17**, each small and none blocking:
in 先天要論, the terms 穀雨 and 霜降, whose 局 numbers fall on another
sheet from their heading and were not looked for, and 陽遁二局's 值符歌
sending 辛 to 巽 and the centre in one line; in 奇門古本, the 雜占's worked
hours, not held to the engine; and which of the 大全 and 《奇門探索錄》
carries the other, since the 大全 holds two of the 探索錄卷三's chapters.

**Left open by the reading of 2026-10-19**, each small and none blocking:
in 奇門秘訣, 卷四十三's opening 奇門大小將辨, which names the 起例 of 奇門 and
六壬 in its first line and was seen only at 50 dpi — it reads as the 大將 and
副將 of an army, not as a board; 卷四十六's leaves on 直使 and on laying the
六儀 and 三奇, sheets 1064–1069, seen at 50 dpi and not read; and the
commentary under 「甲乙丙丁戊陽時」, sheet 1103, read at 120 dpi only.

**Left open by the readings of 2026-10-20**, each small and none blocking:
in 寶鑑摘要, the case 陽二局 丙午 on sheet 1269L, 「六庚加地盤九宮」, which no
value lays (庚 stands over 坎); the four cases that split on the seat of the
spirits fall 庚 and 辛 for `tianpan`, 壬 and 癸 for `yinshi`, too few for a
rule and recorded as they fall; 卷五十四's 出兵方 divides the hours the
奇門秘訣's way, 「陽時宜從天盤直符下出兵，陰時宜從地盤直符下出兵」, for a
direction and not a seat; the 漢陰居士歌's 置閏 「凡遁九日或十日」, the count
unsaid; a cursive note beside 占援兵 on sheet 1299L, too small at 170 dpi; and
whether `baojian` holds `spiritSeat: tianpan` beside `tongzong`, since
《御定奇門寶鑑》卷二 is the 統宗's 卷二 and was not read there for this rule.
None of the 32 cases was found in another work's extract, which locates
nothing either way.

**Owed a look by the user, and not blocking**: on 2026-10-22, glosses
invented for names no catalog had — `label.pattern.gongpo` «palace oppressed»
· «palazzo oppresso», `label.pattern.sanqideshi` «a marvel finds its envoy» ·
«la meraviglia trova il suo messo» — and the strings of `form.qimen.menpo`,
`yiTomb`, `deshi`, `dayDun` and `dayGates.shun` with the reworded
`dayGates.note`, written under the `reader-copy` skill and read by nobody
else. And catalog strings written
without the `reader-copy` skill. On 2026-10-20: `form.qimen.spiritSeat`, its
two values, its note and `notes.parameter.spiritSeat`, and the reworded
`form.qimen.centreLodging.dun` and `form.qimen.centreLodging.note` («Two of
the five», «Due delle cinque»), in both catalogs. On 2026-10-18: the words a tip and the
printed key say for each layer, `label.register.liuren.*`, `.qizheng.*`,
`.taiyi.*` and `.ziwei.*` — the longest are «Ciò di cui il palazzo è
interrogato» and «Numero del palazzo, nel conto di questa tavola» — and the
captions `form.layerLegend.seat` and `form.layerLegend.rim`, in both
catalogs. On 2026-10-16: `form.taiyi.dayouEye`, its
two values and its note, and `notes.parameter.dayouEye`, in both catalogs;
`form.qimen.stemPairs`, its two values, its note and `notes.parameter.stemPairs`;
and the sixty-five glosses `label.pattern.*` of 《金函玉鏡》's names, where 華蓋
is «the parasol» because 天蓬 is already the Canopy.
On 2026-10-15: `label.taiyipattern.du`,
«shutting in» and «chiusura»; `label.taiyi.dingEye` and `dingCount`, «the
fixed eye / count» and «l’occhio / il conto fisso»; `cli.field.taiyiCounts`
shortened to «the counts» and «i conti»; and the sentences on 杜 and on the
定算 added to `prompt.taiyi.conditions` and `prompt.taiyi.counts`. On
2026-10-11: `form.taiyi.yearBoundary` and its three, `label.taiyi.accord`,
`label.taiyiaccord.*`, the sentence on 和 in `prompt.taiyi.counts`, and the
two `form.taiyi.wenchangTaiyi` lines reworded.

## 1. Parameters that are declared and refused

Each exists in an input type and throws `OPTION_NOT_IMPLEMENTED` or
`METHOD_NOT_IMPLEMENTED`, so the API does not break when one lands.
`packages/core/src/parameters.ts` declares them and
`apps/web/test/docs.test.ts` holds this table to it both ways. What a value
must show is attribution and transcription — `docs/sources.md` § "What a value
named for a school must show" — and **another copy of a work already held is
not a witness**.

| Board | Refused today |
|---|---|
| 奇門 | `plate: fei`, `system: yuejia`, `system: nianjia`, `dayDun: liushi`, `leap: runyue`, `strengths: star`, `stemPairs: xianji` |
| 六壬 | `yuejiang: jieqi`, `yuejiang: true`, `zhouye: solar` |
| 七政四餘 | `xiudu: shixian`, `minggong: ascendant`, `gong: ci` |
| 太乙 | `geChong: chong`, `epoch: taojin`, `ji: yueji`, `ji: riji`, `ji: shiji`, `yearBoundary: chunjie` |
| 紫微斗數 | `leapMonth: current`, `leapMonth: split` |

**What each waits on.** The row is the query to put to an arriving text. The
argument is in `docs/sources.md` § "Whose each value of a … board is", one
section an art.

| | waits on |
|---|---|
| `plate: fei` | a text flying the 時家 board's own 起例. None held does; the 折衷 flies the stars and the 儀 and turns the gates, which is computed as a third arrangement. Arrives with a family of `system` |
| `system: yuejia`, `system: nianjia` | being built as the day family was. 《遁甲演義》 and the 統宗 state both; on the year they read 一四七 against 遁甲集成 第三冊's 一七四, which will be two values. The 一七四 line has a second copy in 《御定奇門大全》卷二十九, worked for 1648. No table on the shelf to hold either to |
| `dayDun: liushi` | the 統宗's rule read on the plate for how a 局 is begun. 《御定奇門大全》卷二十九 begins a sixty-day 局 on a 甲 or 己 day, four terms to it, on a 日家 with a plate of stems, which is not the board `rijia` lays: recorded, not weighed |
| `leap: runyue` | a lineage named for it. 《金鏡寶鑑》 holds it; 《金函玉鏡》 上冊 p. 87 and 下冊 p. 425 print a rule containing both placements, so one rule or two is asked first |
| `stemPairs: xianji` | the cells the 干論 of 《御定奇門大全》卷十四–十六 prints garbled, read on the plate: 庚加丙 twice and no 庚加丁, 庚加辛 with no name, 丁加巳 where 乙 is wanted, 丙加戊 with a rule in place of a name, 己加乙 printed 己甲乙. Its transcription is in `texts/qimen/daquan-juan14-16-stems/` |
| `strengths: star` | which of two arrangements from the star it is — 《金鏡寶鑑》卷之四's, or the 《三元經》's that the 符應經, 紀大奎 and the 探索錄 carry — and whether it reaches past the nine stars |
| `yuejiang: jieqi`, `yuejiang: true` | a text stating either as its own. None found, on the plate or in the extracts |
| `zhouye: solar` | which rising, and how. One sentence of 《大六壬精解》 and the 協紀's 日出入, neither with a procedure |
| `xiudu: shixian` | a table with an epoch that can be cited |
| `gong: ci` | a second copy for 女, 井 and 張 of 《星學大成》卷一's 宿度過宮之圖 — the 《元史·曆志》 has the 曆's own — and a decision on what it computes under the default frame |
| `minggong: ascendant` | a holder. A second method and not a second reading |
| `epoch: taojin` | 《太乙淘金歌》, not held; known through 盧央, who sets evidence against it |
| `ji: yueji` | being built: a board that takes an instant |
| `ji: riji` | which anchor: the 《統宗》's count puts 25 February 1510 on 局 25 and its dated note on 局 1, a 盈差 of 120 or 240 apart. A dated 日計 board, in any work. `docs/sources.md` § "《太乙數統宗大全》卷二 again" |
| `ji: shiji` | being built. The hours run from the epoch and the 盈差 does not reach them; whether a day's hours open at 子初 or 子正 is asked first |
| `yearBoundary: chunjie` | a holder. The default has none either |
| `geChong: chong` | the rule as a sentence. 盧央's board for 940 shows it of 始擊; the 《統宗》卷七 states 格 by the facing palace alone, and on its 589 board adds a 格 of the 太歲, p. 69 |
| `leapMonth: current`, `leapMonth: split` | a manual stating either. A program computes one |

**Recorded, with no parameter** — a divergence the register carries and
nothing exposes. Only those with something to wait on:

- **奇門.** **十干克應 beyond the fourteen**: about a dozen cells two lines
  name alike, or nearly, were found by the review of 2026-10-16 and not taken
  into `shared` — 奇儀順遂 and 日奇被刑 in J and 《元靈經》, 火入勾陳, 朱雀入獄,
  人遁 and 奇入太陰 in J and the block of 《元靈經》 read as the 丁 row, whose
  heading is in doubt, and 青龍入雲 at 戊 over 乙 in the 干論 and 《元靈經》
  against J's 青龍合靈. Several differ by a word, and each would need its
  fortune argued. `texts/qimen/daquan-juan14-16-stems/compare.tsv` sets the
  lines side by side. **日奇入霧**, shipped on J and 《元靈經》, is 奇入墓 in J's
  own line as the 仙機 versifies it. **青龍華蓋** is still the cell for a fourth
  valence. The 置閏 pin at ten days: the 大全's 遁甲通明鈐 卷十二 states
  「凡過超十日則閏」 and works a case dated here to 1265–66 that lets nine
  pass, where its 卷十三, its 奇門秘訣 卷四十六 and `MAX_CHAOSHEN` intercalate
  at nine. A text stating ten as its own rule, with nothing against it
  inside the same juan. **乙 buried in 乾**, which the same commentary
  quotes from 三璋 and the 符應經 gives under 璋曰 in 坤: computed since
  2026-10-22 as the 乾 value of `yiTomb`, on 《奇門遁甲秘笈大全》卷十五's verse.
  Which of the two stems in 坤 a stem coming to it stands over:
  the 符應經 marks a 格 by the centre's, one case, and 景祐秘纂 卷二 a second,
  伏干格 陽五局 壬申 on 38L, in the same line of copies; a second witness
  names it. The heaven plate's side of the same question is `centreStem` since
  2026-10-16. 三奇得使 is `deshi` since 2026-10-22. The 演義's condition on
  three of its cells, 「如遇本旬直符同臨其上，方可用之而吉也」, is recorded and
  not computed. 宮迫 without 門迫: 景祐秘纂 卷之二下 names the engine's
  thirteen cells 宮迫, gives no converse, and its verse denies the converse is
  迫 — the default's cells of `menpo` under the other value's name, one list
  and one line; and its 奇墓 gives 乙 both 二 and 六, as 吉凶格解's summary
  does. The half-flown board wants a yin hour worked in any text. The board of a day wants a prompt
  of its own, the scan and the 年命.
- **六壬.** The order of 涉害: a text holding either reading by name. The five
  phases of the 十二天將: a file not held.
- **七政四餘.** The 身 as the Moon or as the degree facing the 命; the 命宮 to
  a lodge and a degree by a 量天尺; the 距星 of 觜 and 參. Which node 羅睺 is:
  《星學大成》 names 天首 and 天尾 and does not say.
- **太乙.** Two of the three tests of 陰陽和不和: 太乙's palace against a
  count, where no count is named, and 王希明's lists, which three prints give
  three ways. The eye's test is computed. The 太歲 as a body of 格, on the
  《統宗》's 589 board. A fortune or a sentence for 杜, which is computed
  since 2026-10-15 on the word of the 立成 of 卷三十一 and carries neither.
  Whether the 計大將 of the 定算 is read off the tens, as 卷四's one case
  reads 三十二, or off the units, as 133 of the 144 boards draw it: the
  engine follows the boards. 陰局 after 夏至 as the hour's alone or the
  day's as well: the 《統宗》 prints both.
- **紫微斗數.** The stars 卷二 does not place, 解神 off the month among them;
  王亭之's table at 戊, 庚 and 壬, named and unread.
- **Not yet attributed.** The default of `earth`; who turns the year at 立春
  or at 正月初一 and the day at the 子 hour; the 大運 to the minute; the years
  lived by turns; a second value of `shensha`; the noble of 庚 seated with
  辛's.

**Asked and not found, so not asked of the same works again**: a 日計 or
時計 board with a date on it, of 《太乙金鏡式經》卷六 and 卷九 and of the
《統宗》卷四, 卷十八 and 卷三十六; the holders of
the day and year boundaries, of 《三命通會》卷二 and 《命理新論》; the five phases
of the 十二天將 and a general turned at the 節, of 《御定六壬直指》卷上 and
《六壬經緯》卷一–三; a rule for which node 羅睺 is and an epoch for the 積日, of
《星學大成》. The extracts returned nothing for a leap month split at its
middle or for 羅睺 as the ascending node, which is a date and not a negative.

## 2. The shelf

**In order.** Each is a named section; nothing here is a sweep of a book.
Lines 1 and 2 are 太乙 and three files, each with its own offset: the
《統宗》, `taiyi/taiyi-shu-tongzong-daquan-gugong.pdf`, PDF page = series
page + 4, every juan opening on a 目錄 of its own; the 金鏡,
`taiyi/taiyi-jinjing-shijing-skqs.pdf`, PDF page = 四庫 printed page − 854;
盧央's 《中國古代星占學》, `shushu/zhongguo-gudai-xingzhanxue.pdf`, PDF page =
printed page + 18. Lines 1 and 2 have nothing left to read on this shelf and
stand first because a decision waits on each. Line 3 has nothing left to read
for a 起例 either, and stays as the map of the file for a question put to it
later.

| | what would move | where |
|---|---|---|
| 1 | **A dated 日計 board, or the 盈差 of the day explained**: what `ji: riji` waits on | not in the 《統宗》 where it was looked for: 卷三十六 to p. 392, 卷四 p. 41 and 卷十八 whole were read on 2026-10-11 and every board is entered by its 局, and the 144 drawn boards of 卷三十二–三十五, read on 2026-10-15, are entered by their 局 and five 干支 with no year. Left in that work: the 命法 of 卷三十七–四十, which takes a birth. Otherwise a work not held |
| 2 | the lists of 上和 · 次和 · 下和, which three prints give three ways, and which count is read against 太乙's palace | the notes of the 《統宗》卷三十一 立成 were read on 2026-10-15: its table labels every count by its digits, ungraded, and none against 太乙's palace — so it answers neither question. A copy of the 金鏡 that is not the 四庫's, or a work quoting 王希明's lists: none held. The 金鏡 卷二 leaves 9–10, the 《統宗》卷六 pp. 54–56 and 盧央 pp. 477–479 were read on 2026-10-11 |
| 3 | a 起例 variant | 《御定奇門大全》, `qimen/yuding-qimen-daquan.pdf`, 1485 sheets at 600 dpi, two book-pages to a sheet, right one first, each juan opening on a left page and located by the 版心 (`texts/qimen/daquan-tools/`). **Read for a 起例, and one found that the engine did not compute, `spiritSeat: yinshi` since 2026-10-20**: the 目錄; 卷一 of 景祐秘纂; 卷五–十, the eighteen 局 hour by hour (sheets 114–268); 卷十一–十三, 遁甲通明鈐, which states 置閏 at two pins (269–345); 卷十四–十六, 奇門仙機, omens and two stem tables, the tables transcribed (346–416); 卷十七–二十四, 先天要論, which states 置閏 and the ordinary 局 and carries the 探索錄's 符經 (417–588); 卷二十五 of the 符應經, with 卷二十六–二十七 only at sheets 607, 615–620, 631, 637; 卷二十八–三十二, 奇門古本, whose 卷二十九 states the 年家 on 一七四 with the 集成's epoch chain (659–759); 卷三十三–三十八, 乾坤變異錄, omens of the sky and the ground (760–893); 卷三十九–四十二, 禽遁秘訣陰符經, a juan earlier than the 目錄 has it, which is 演禽 and whose 遁甲 run in 卷四十 states the ordinary 起例 (894–982); 卷四十三–四十八, 奇門秘訣, a juan shorter than the 目錄 has it, whose commentary on the 煙波釣叟歌 states the ordinary 局 and 置閏 at nine, and seats the eight spirits from the earth-plate 直符 at a 己 to 癸 hour, which the 大全's own 卷五–十 do not follow and the engine computes as `spiritSeat: yinshi` (983–1116); 卷四十九–五十七, 寶鑑摘要, the 統宗's 起例 again and a book of 占 whose 32 cases the engine lays, with 漢陰居士歌 holding `centreLodging: dun` (1117–1302); 卷五十八–五十九, 吉凶格解, the 格 one by one and no 起例, whose 入墓 verse holds `dingTomb: gen` and whose 門迫 names the converse relation (1303–1364); 卷六十–六十四, 寶鏡圖, a day almanac and sixty day boards that lay the 日家's yang count every day and turn the gates with the sun (1365–1485); 景祐秘纂 卷二–四, the 符應經's 卷中 and verse, whose cases put the 演義 among the holders of `centreStem: host` (31–113). `docs/sources.md` has a section for each, titled by the juan. **The 大全 is read for a 起例 from 卷一 to 卷六十四**, and has nothing left to read for one. The 目錄's juan numbers have been wrong four times, so each work is bracketed on the 版心 before it is read |
| 4 | the limits of a 七政四餘 life, and the 量天尺 | 《星學大成》, SKQS vol. 809: read are 卷一 leaves 1–8, 卷三's 運限起例, 卷四 leaves 1–7 and the four 算法 of the 餘. The juan are mapped in `docs/sources.md` § "《星學大成》卷四 星盤或問, and the map of the other juan" |
| 5 | 郭守敬's lost star catalogue | 《中國恆星觀測史》 第七章第一節二 (二), from p. 274, unread past p. 275; a stencil at 92 dpi |

**Small and left open**: in the 符應經, the note in small characters under
the title at 遁甲集成 第三冊 p. 1136, and 玉女守門 as two tables in two
copies; in 《星學大成》, the figures of 起大限. In the 《統宗》: the lunar
constants of 卷二, one damaged, and its 朓朒 leaves pp. 22–27, seen and not
read; the rest of 推四神太乙立成歷, p. 108, to collate; the reign printed
for 1444 in the list of gates; two characters of the note under the heading
at p. 193; the case of 釋提執, which breaks off at the foot of p. 70, and
the board under 釋擊, p. 68, which is another 局's; 者 or 考 closing a column at p. 29; the
character lost before 天時's 申 at p. 395, and which text 盧央 followed for
his 寅; what the 甲寅 heading the 天目's two figures at p. 110 is; and whether that work and the
《太乙統宗寶鑑》 the engine names its witness for are one recension —
`taiyitongzong` in `packages/core/src/witnesses.ts`, and the catalogs with
it, carry the second title and the file on the shelf the first.

**Wanted and not held**: the 《元史·曆志》; 《太乙淘金歌》; 沈義方's
《星平大成》, a lead for the day turned at midnight; a second dated chart with
炁 on it. Judged worth having on guoxueziyuan.com and not bought: 《宮藏奇門
大全》, 《遁甲奇門秘傳要旨》, 《明抄奇門陰遁書》 and 《李衛公奇門心法》, the last
with a Tang attribution. None of that platform's files states a provenance.

**What is left to read, measured 2026-10-24.** Every file on the shelf has
been opened far enough to say what it is, and `texts/README.md` has a row
naming each: 134 files, about 33 700 pages. Most pages have never been read
on the plate, and none is owed a reading: the shelf is read by question. The
questions standing ask for **six readings** of files held — the 統宗's rule for `dayDun: liushi`, the 金函玉鏡's
two pages for `leap: runyue`, the 仙機's six cells for `stemPairs: xianji`,
《星學大成》's limits and 量天尺 (line 4), 《中國恆星觀測史》 from p. 274
(line 5), and 截路空亡 on 寶鏡圖's other leaves — and about thirty small
errands under "Left open" and "Small and left open". About ten refused values
wait on files not held (§ 1, "Wanted and not held"), which no reading here
moves. A new file is identified with the four commands of `docs/scans.md`
§ "What a file is, before what it says", and gets its row before anything
else.

**Ask.** `texts/bench/run.mjs` runs the worked examples the sources print;
two 六壬 cases disagree, a 涉害 and a 返吟, and each is settled by reading the
passage its citation names. `--uncovered` lists the shapes with no adapter.
`texts/shelf.py crosswalk --moves` and `--gaps` are leads, never findings.
《御定奇門真詮》 is 1080 hour boards with no 起例: a bench, if anything, and
the 大全's `engine.mjs` already lays the 1080 it would be held to.

**Where the state is kept**: `docs/sources.md` what is read,
`docs/provenance.tsv` what is held, `texts/README.md` what each file is.

## 3. What a reading may not claim

- An extract locates and never quotes; nothing found is not a negative. A
  negative is established on the plate. → `docs/scans.md`
- A transcription is not a plate, and nothing at that mark closes a question.
- A second copy settles the text and never the doctrine: no rung moves.
- A print can be one work at its frame and another at its filling: grep the
  transcriptions held before writing a passage up as the work's own.
- A divergence in the corpus is not a parameter.
- A negative is about the shelf that was asked; an arrival reopens it,
  bounded. → `docs/sources.md` § "What an arrival reopens"
- A digit read alone is a digit unread. 月孛's 大數 stood misread for five
  weeks and the rate printed beside it was the check.

## 4. Spanish, once the engine has stopped moving

The third vernacular, and deliberately not yet: every board still adds a
family of messages. Nothing has to be prepared. What is watched is written
prose, which a third language pays for and derived text does not. →
`docs/i18n.md` § "Who is reading"

## 5. Surfaces and code

- **Two lists are written a parameter at a time** and held to the declaration
  by tests: the MCP schemas in `packages/mcp/src/` and
  `apps/web/src/lib/parameters.ts`. A value added to the engine fails those
  suites until it is added there. **So is the list of configurations**,
  `PATTERN_IDS` in `apps/web/src/lib/vocabulary.ts`, and the scan form's
  `JINHAN_PATTERN_IDS` is read off it by position, from `qinglongheling` on:
  a configuration added after 《金函玉鏡》's would be offered only under
  `stemPairs: jinhan` until that slice is changed. `gongpo` and `sanqideshi`
  sit before it and are offered always, though `gongpo` occurs only under
  `menpo: gongzhimen`: a scan asked for it under the default finds nothing
  and does not say why. The same filter, keyed on `qimen.menpo`, would fix it.
- **A configuration may carry no fortune**, since `stemPairs: jinhan`:
  `Pattern.valence` and `valenceOf` are optional, and every surface prints the
  mark without one. A surface added later has to do the same.
- **`lodged` and `heavenLodged` are not on the drawing**, which shows one
  stem to a plate in each palace. The transcript prints both as a line under
  the plates and the table of palaces in its cell; a reader of the drawing
  alone does not see that 坤 hosts the centre, or that under
  `centreStem: host` the centre's stem rides to a second palace.
- **`accord` and `ding` are not on the drawing.** The transcript and the
  section print both; `packages/plate` was left as it was, its
  `PlateTaiyiSide` without `accord` and its `PlateTaiyi` without `ding`. 杜
  is drawn, among the conditions, with no fortune beside it.
- **No seat of the eye of 太乙's 大遊 is dated**, in either work. `dayouEye`
  computes both counts; `tongzong` is held by a printed count and `jinjing`
  by nothing past its transcription.
- **`taiyiYearOf` is exported and no surface calls it.** Every surface asks
  `taiyiYearAt`. Under `dongzhi` it reads a pillar that must have been cut
  at the solstice too, which nothing checks.
- **A rasterised board sets its Latin in resvg's fallback face** on any line
  that also holds a hanzi, so two registers of one drawing are set unalike.
  It wants a text engine, or a resvg resolving a font stack a character at a
  time. No surface asks for a PNG. `familiesByScript` in `png.ts`.
- **An em dash reaches the Italian drawings and transcripts from the code.**
  `divergenceLines` in `packages/core/src/format.ts` joins a school's label to
  its value with a fixed `' — '`, and `BETWEEN` in `packages/plate/src/svg.ts`
  separates the Qi Men captions the same way, so «L’anno di questa tavola
  comincia — a 立春» is set in Italian. The separator wants a catalog key,
  the dash in `en.ts` and a colon in `it.ts`; the tests that look for the dash
  move with it. Seen on 2026-10-18 and older than that day.

## 6. What is refused and stays refused

The 用神, 格局, ranking, dating, advice, the 年命 purposes doctrine, who is 主
and who is 客, a day master called strong or weak, a natal Qi Men chart,
太乙's dynastic readings, what 卷十一 of the 探索錄 reads in the hexagram of a
palace, and the 十八飛星 placements grafted onto a 《全書》 board. Each has
its entry in [`docs/refusals.md`](docs/refusals.md).
