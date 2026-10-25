# Phase 71 — the lens, and the bench

Surface work on 2026-10-24 and 2026-10-25, on the branch `lenses`, from the
user's proposal of «attenzione selettiva»: a way of reading a board that helps
both a practitioner lost in a dense one and a newcomer put off by it. Built on
the 奇門 board of an hour; carried to the other boards by the items the
roadmap lists after it.

## The rule came first

Before anything was built the user asked whether the project already said that
a reading arises in the person consulting, and that the instrument must favour
it and not orient it. It did not: the refusals barred the engine from *saying*
a reading, and said nothing about where a surface *leads the eye*. The rule was
written into `docs/refusals.md` § "Where to look first" and a line of
`CLAUDE.md`, and committed to `main` on its own, before the branch opened. It
governs everything below: the board opens whole, emphasis follows an act of the
reader's and recedes the rest rather than weighting one thing, a relation shown
is one the engine computed and registered, and where somebody looked travels
nowhere.

## What was built

- **The relations, in the engine** (`qimenLens`, `dunjia/lens.ts`): every thing
  with a phase on the board, the five relations for every pair of phases, the
  facing palace and the 五合 partner, handed over beside the chart by
  `/api/qimen`, since the client imports only types from `core`. Three rows in
  the register: 生剋 between any two things and 對宮 at rung 3, 五合 at rung 4,
  the last attested on a 奇門 board for two pairs of five only.
- **The lens, in the page** (`lib/lens.ts`): kinds and phases kept, a name
  pressed and the rest related to it, or two palaces pressed by their ground
  and the names pressed inside them compared. State in the address's fragment.
- **Two modes**, beginner by default and expert, both laying the lens one way
  at a time; the circle of the five phases over the controls; «whole board»
  beside the mode, a press outside the palaces, Escape.
- **The bench**: every drawn board whole in the window under its bar, and a
  column beside it for what is used on it. `--board` became a height, the
  drawings of 六壬, 太乙, 七政四餘 and 紫微斗數 are asked for `bare` and their
  key to the names is set in the column.

## What was decided along the way, and reversed

The user saw each step in the browser and redirected several; each reversal is
a step of the branch.

- **Arrows or outlines** were both built to be compared. Arrows stayed; the
  user asked for them coloured, and they bend where a straight one would cross
  a name or another arrow.
- **A pair compared every layer** against every layer at first, then the kinds
  kept above it, then — the user's word — only the names pressed inside the two
  palaces. Neither palace is the asker's: a pair is held in Luoshu order and
  every relation is drawn as a flow.
- **The bench widened the shell** to 100rem at first. The user's correction was
  that the board was too large, not the page too narrow, and the shell went back
  to 72rem with the board measured by the window's height.
- **The steps of the moment** moved into the column and came back to the bar:
  they choose which board is laid, the column how it is looked at.
- **The column was sticky** and scrolled inside itself, then stood beside the
  board and scrolled with the page, again at the user's word.

## What was wrong first

- The heights the pages wrote on their pictures were placeholders: the four
  tall drawings were half again taller than written, and the measure has to be
  read off the drawing when it arrives.
- A tall bar was not counted: `--above` grew from 6.5rem to 8.5rem when 太乙's
  bar, the tallest, put the foot of its board under the fold.
- Every arrow of a pressed name bent at first, because arrows leaving one name
  meet at it; meeting near an end is no longer counted as crowding.

## What it moved

0.33.0: `/api/qimen` answers with `lens`, and `/api/liuren`, `/api/qizheng`
and `/api/ziwei` with the key to their names, so an address that answered
before answers differently.
