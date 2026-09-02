# Phase 42 — four by default

*Done. Revises phase 41, which shipped `ziqi: yinianyisu` implemented and
switched off, one commit earlier.*

Phase 41 implemented the fourth 餘 and left `off` as the default, on the
argument that a quantity resting on a single text for each of its two halves is
rung 5 twice over and should not be switched on for somebody unasked. The
default is now `yinianyisu`: a 七政四餘 board carries four remainders, and
`ziqi: off` lays one that carries three and says so.

## Why the argument was the wrong way round

**This project's rule for a weak quantity is that its rung is written down, not
that the quantity is withheld.** `docs/notes.md` says so, and the engine
already ships 年命, the 年神 bearings and 太乙's 大將 and 參將 at rung 5, each
with its grade recorded and readable. Refusing 紫氣 by default applied a
stricter standard to one quantity than to the several already carried at the
same grade — which is the objection the working note of 2026-09-01 raised
before the implementation and which phase 41 then reproduced in a milder form.

**And the art is named for four.** 紫氣 is the only body on this board whose
absence a reader can see, because the output has to say 三餘 to stay honest. A
board printing three by default answered to a name it did not carry.

## What keeps it honest instead

The resolution, which is a property of the type rather than of the prose.
紫氣 arrives as a `PalacePlacement`: no longitude, no lodge, no 入宿度, no 宮度,
so no surface can print a degree for it whatever anybody writes. Beside that,
the line under every board says the fourth remainder's rate rests on one work
and its position on one plate, where the other three are read off the sky, and
the prompt tells a model the same before it reads a placement.

That is the trade this phase makes: the body travels, and what it is worth
travels with it, in a form nothing downstream can drop.

## What moved

`DEFAULT_QIZHENG_OPTIONS`, the parameter's declared default and the form's
fallback. The MCP tool now warns that the fourth remainder is not measured like
the other three rather than that the board omits it; the CLI's `--ziqi` help,
the register, the parameters table, the refusals entry — whose subject was
already the degree and not the body — the agent prompt, the README and
`ROADMAP.md` § 1's note follow. The option note that explained why the default
left it out is gone, having nothing left to explain.

The tests moved with it and are the record of what changed: a default board is
asserted to carry four remainders and four phases (火餘, 土餘, 水餘, 木餘), and a
board laid with `ziqi: off` is asserted to drop that one and no other.
