# Phase 92 — choosing 飛盤 fills the lodging its work prints

2026-11-05, the session of phases 90–91, on the user's word («si, mi pare una
buona idea, procedi»). `plate: fei` was built with `centreLodging` left at its
default, `kun`, since a parameter has one default for every plate; a 飛盤 board
laid from a bare address is therefore a combination no text lays, and the line
under it says so.

## What was built

`fills` on a row of the web declaration says what choosing a value fills in
elsewhere on the form, and `choose` applies it; `MomentForm.svelte` calls it.
The plate row fills `centreLodging: dunni` when `fei` is chosen. It fills once
and undoes nothing when another plate is chosen: the reader sees the lodging
and can move it. Nothing reaches `core`, and what leaves the form is the two
fields, each in the address — `docs/parameters.md` § "A school is axes, never
a bundle", which this is the first case of.

## What it was held to

`test/parameters.test.ts`: choosing `fei` fills `dunni` and writes it into the
fields, choosing `zhuan` after leaves it, every filled value is one the engine
computes, and `centreTravel` is not offered under `fei`. Checked in the
running site: the 奇門 section's form, `fei` chosen, sent
`qimen.plate=fei&qimen.centreLodging=dunni` and named 《奇門法竅》 under the
board.

Something ships that no address answered for, and no address answers
differently: the third term moves, to 0.46.1.
