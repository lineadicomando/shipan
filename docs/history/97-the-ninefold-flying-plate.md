# Phase 97 — the ninefold 飛盤

2026-11-06, on the user's word («prima leggiamo lo 旨歸, poi si costruisce»),
after phases 95 and 96 read the 鳴法 and the 旨歸. The design was put to the
user first and settled in their words: two axes and not a bundle, and the
ninth gate named 中 zhōng, as the 旨歸 prints it.

## What was built

- `gateSeats` (`eight` | `nine`) and `spiritRing` (`eight` | `nine`), read
  under `plate: fei` alone, defaulting to the 法竅's `eight`, so no board laid
  before moves. `nine` is held by `mingfa` and `zhigui`, two new witnesses.
- In `plates.ts`: `CENTRE_GATE` (中), `TAICHANG` (太常), and
  `ninefoldGatePalace`, `ninefoldChiefGate`, `ninefoldGatePlate` and
  `ninefoldSpiritPlate`. The nine gate seats are carried by the 直使 counted
  through nine, and the nine spirits fly from the 直符. Under both at `nine`
  no palace is marked as the host. 中 makes no hexagram, and 太常 has no phase
  in either `spiritPhase`, so a lens that phases the spirits leaves it out.
- `test/ninefold.test.ts` holds both values to the 鳴法's two drawn hours and
  to twenty-two 旨歸 boards. The CLI's board for 2024-01-01 02:30 is the
  旨歸's 陽一局 乙丑, cell for cell, 直使 included.
- Both catalogs gain the questions, the two names and the parameter glosses.
  The labels that counted «the eight spirits» now count the spirits. The web
  form, the MCP schema (`gate_seats`, `spirit_ring`), the scan's list of
  eleven spirits, the README, `docs/parameters.md`, `docs/agent-prompt.md` and
  the register follow.

## What moved

The canonical 奇門 fascicle carries the two new options in every answer, so
an address answers differently and the second term moves, to 0.48.0.
`docs/open-recorded.md` loses the line the build settles.
