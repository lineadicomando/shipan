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

## What it moved

Nothing a reader sees. The answer of `/api/qimen` does move — its `lens`
carries `seats`, `layers`, `phased`, `linkIds` and `links` where it carried
`facing` and `wuhe`, and a seat is a string — so it is 0.34.0 by the first
of the three questions. The roadmap had said this step would move no version,
reasoning from the page and not from the answer.

The relations are the ones phase 71 registered, and no row of the register
moves.
