# Phase 72 — one lens for every board

Surface work on 2026-10-25, on the branch `lens-generic`: the first item of
`TODO.md` § "First: the lens on every board". The lens of phase 71 was built
on the 奇門 board of an hour and knew it was there — Luoshu numbers for
seats, the six layers of that board written into the page, 對宮 and 五合 as
two tables of their own. Before a second board takes it, it is made to know
nothing of which board it is on.

## What was built

- **A descriptor in `core`** (`Lens`, `packages/core/src/lens.ts`): the
  board's seats in its own terms and in its order, its layers as the drawing
  marks them and those of them with a phase, every thing with a phase, the
  twenty-five cells of the five relations, and the board's own relations as a
  list of links, each between two seats or two things. `qimenLens` is its
  first instance: 對宮 is a link between the two palaces, 五合 a link between
  two stems wherever they stand.
- **The page's lens reads the descriptor** (`lib/lens.ts`): a seat is a
  string, a key is `${seat}:${layer}`, the layers and the order of a pair are
  the descriptor's, and the board's links are looked up rather than named.
  A fragment read where there is no descriptor keeps what has the right shape,
  so a link survives a board that cannot read it yet.
- **The wiring is held once** (`HeldLens` in `lib/held-lens.svelte.ts`): the
  fragment, a press on the board, on the page, Escape and the tip, with
  `LensSide` for the column and `LensReading` for what is said under the
  board. A section says how a name and a seat are said, and holds nothing
  else of the lens.

## The board of a day

The second step, the same day: `dayLens` beside `qimenLens`, answered by
`/api/qimen` for a day board where it had answered nothing. The roadmap had
assumed the day's gates and stars took their home palaces' phases as on the
hour board. The gates do — they are the same eight. **The stars do not**:
太乙 through 天乙 have no home on the board and no phase in the engine or the
register, which holds only a fortune for each. They are kept by kind and
related to nothing, as the 八神 are. Two rows in the register say so.

## 六壬

The third step: `liurenLens`, answered by `/api/liuren`. The lens is the
art's own relation here — the lessons and the transmissions are found by
生剋 — so it shows the five relations between the two plates, the lessons
and the transmissions; the twelve generals have no phase registered and are
kept by kind. Two things the first step had not foreseen: names stand in
seats that are not palaces, so the descriptor says which seats a pair may be
laid on (`pairSeats`), and the list and the table under the board said
«palace N» of every name, so a section now says where a name stands
(`seatPlace`). On 奇門 the pair's table heads its rows «Heaven plate ·
palace 9» where it said «· 9». The seats' names do not collide on 六壬, and
no `unit` was added.

## What it moved

The first step moved nothing a reader sees; the second and third gave the
board of a day and 六壬 a lens they had not had. The answer of `/api/qimen` moved with the first — its `lens`
carries `seats`, `layers`, `phased`, `linkIds` and `links` where it carried
`facing` and `wuhe`, and a seat is a string — so it is 0.34.0 by the first
of the three questions. The roadmap had said this step would move no version,
reasoning from the page and not from the answer.

The day's lens and 六壬's ride in the same version: 0.34.0 has not left the branch,
and a version is about what an answer has stopped being since the last one
shipped. Their three rows are new; the rows phase 71 registered do not move.
