# Phase 105: the lens of the year and month boards

2026-11-08, on the user's word («procedi con l'implementazione delle lenti
nelle carte qimen a cui mancano»), taking item 1 of `TODO.md`. The one
question it left open was put to the user first: whether the spirits of these
boards take a phase, and which. The answer: `spiritPhase` reads on them as on
the hour board, same three values, same default.

## What was built

- `qimenLens` takes a `YearChart` or a `MonthChart` as it takes a
  `QimenChart`: it reads only what stands in each palace, never a strength or
  a configuration, so the same six layers, 對宮 and 五合 come out of it.
- `spiritPhase` names `shijia`, `yuejia` and `nianjia` in its `family`, in
  `core` and in the web's table, so the form offers it on the two boards and
  the line of schools names it. The combination stays the engine's own, as
  it was.
- `/api/qimen` answers both boards with that lens where it answered `null`,
  and the section's bench, which already held whatever lens the answer
  carried, lays it on them.
- `test/lens.test.ts` lays both boards through the lens; `api.test.ts`
  checks the answer.

## What it left

Nothing new: what the year and month boards left is `TODO.md`'s next item.
An address that answered `lens: null` answers a lens, so the second term
moves, to 0.53.0.
