# Phase 43 — the layer under the board

*Done. Narrows the exemption phase 35 wrote into
`docs/parameters.md` § "A board's parameters travel under the board's name".*

The rule said a board's parameter travels prefixed and a layer's travels bare,
and then exempted the surfaces where the board is already named: a CLI command
lays one board and an MCP tool answers for one, so — the argument ran — a bare
name there is unambiguous by construction. It named a worked example,
`shipan ziwei --year-boundary lichun`.

That command did nothing. `--year-boundary` was read in one place,
`taiyiOptionsFrom`, so on every command but 太乙's it was accepted and dropped
in silence; the pillars' own `yearBoundary`, a layer parameter with two
implemented values, could not be set from the CLI at all. The example the rule
carried as proof was the case the rule got wrong.

## What the exemption actually covers

**Naming the board settles which board, not which bag.** Two boards cannot
collide at a command that lays one of them, and that is what the exemption is
for. A layer is a different relation: it is under the board *while the board is
being laid*, so both are present at once and both answer to the same word. The
pillars are read into an instant before 紫微斗數 counts a month off them —
`shipan ziwei` carries two year boundaries, with different values and different
defaults, and one of them can have the bare name.

The layer keeps it. It stands under every board and collides with nothing, and
it is asked for far more often. So a board's parameter that shares a name with
a layer's takes its board's name on every surface, and not only in the query
string where the boards share a namespace.

## Why it was invisible

Nothing lied. The CLI prints the block naming the schools in force, so the
board said it had cut its year at 正月初一; what it did not say is that it had
been asked for 立春 and had not done it. A surface that reports correctly what
it did will not tell you it ignored you, and this is the second time in this
review that a silent drop hid behind an honest report — the first was every
board but 奇門 passing over a value the engine declares and does not compute.

## What moved

`docs/parameters.md`, the CLI's flags and the MCP tool schemas. `method` left
the option bundle every compute tool spread, which is what had put a 奇門
parameter on `compute_bazi` with a description ending «Does not affect the Four
Pillars» — the prose patch for a schema that offered it where it did nothing.
With the bundle split, the tools that lay a board can carry that board's own
divergences, which is what the server instructions had been claiming for them.

## What did not move

No number, no rung, no default. A board cut at 正月初一 before this is cut at
正月初一 after it; what changes is that a reader who asks for the other one is
answered rather than ignored.
