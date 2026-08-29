# Phase 35 — a school can be chosen

Phase 33 narrowed «every divergence is a parameter» to divergences *between
practitioners*. Phase 34 answered what an agreement between two witnesses to
one text is worth. Both were about what the register may say. This one is about
what the reader may do: **the engine will carry elements specific to different
schools, and whoever is holding the board has to be able to see which school
laid it and to choose another.**

It opened with a review rather than a feature. The instructions had grown to
`CLAUDE.md` plus nine pages of `docs/`, and the question asked was whether they
still agreed with each other and with the code.

## What the review found

Two kinds of thing, and the second is why this phase exists.

**Facts that had drifted.** `architecture.md` said `core` depends on `geo` and
that the CLI draws; it depends on neither. The 年神 had grown from six to
twenty-six and three sentences stayed behind, one of them the heading the
register's `section` column points at. 紫微斗數 landed as the sixth board and
six enumerations went on counting five — the contract's `asked` paragraph, its
address list, the one-board rule, the CLI's help for `--prompt` and `--ask`, the
comment explaining why `gender` divides the table, and the one saying where a
moment comes from. Every one of those sentences was true when it was written.

**Rules stated wider than the code they govern.** «A function in `core` that
returns a translated string is a design error» condemned `format.ts`,
`prompt.ts` and `labels.ts`, which are the design; what the rule bounds is
choosing a language, not rendering one. Two evidence scales — the rungs and the
three tiers — used overlapping numbers running opposite ways, and the contract
asked a reader to «say which of these three it is» under a list of nine. The
latitude bound named «七政四餘's 宮 division by houses», which was unambiguous
until a parameter called `gong` arrived and fitted the words better than the
value that actually reads the latitude, `minggong: ascendant`.

Those landed on `main` in one commit, with two tests: every endpoint is named in
`docs/agent-prompt.md`, every tool the MCP server offers is described there, and
the pages whose pointers are checked are derived from `docs/` rather than
listed. The four documents that were checked before were the four a reader
arrives through; the pages that link *inside* `docs/` were the ones nothing read.

## The direction, and the nine decisions it forced

The engine has eight parameters with more than one implemented value today —
nine counting `trueSolarTime`, which is a boolean and a preference rather than a
school — so a reader can already choose in eight places. The count was put at
seven while this was being planned, and the row that was missed is the one the
naming rule turns on: 紫微斗數 declares a `yearBoundary` of its own, both values
computed, defaulting to 正月初一 where the pillars' defaults to 立春. What is coming is
more of them — including elements a school brings that another does not — and
the premise is that the choice must be **explicit and conscious** at every
surface.

**The evidential standard could not accommodate it.** `ROADMAP.md` § 1 says a
refused value lands when it finds two transmitted witnesses agreeing or one text
that checks itself. A school has one witness by construction: itself. The answer
is that a value named for a school makes a *different claim* — attribution and
transcription, not doctrine — and that the two ways it fails, a lineage misnamed
and a table miscopied, want no second tradition to catch. Attribution is
therefore not a rung, for the same reason a collation is not one: filed as a
rung it would claim a kind of independence it does not have. It travels declared
beside the quantity.

**The criterion in use was completeness, and the criterion written down was the
three questions.** `sihua` was refused a second value because 中州派's ten stems
are not on the shelf as a table of their own — but that lineage moves 壬's 科 to
左輔, the board changes, and two practitioners hold opposite sides. The three
questions admit it. The size of a disagreement is not one of them.

**A school is axes and never a bundle.** The convenient shape is one
`school:` value presetting five others; it is refused inside `core`, because a
preset is a table that can be edited and a chart carrying the bundle's name
rather than its expansion would reproduce differently the day the table moved,
without its own output saying so. A bundle that fills the fields may live at a
surface, where what leaves it is still the fields.

**The wire has a flat namespace and the collision is already latent.**
`yearBoundary` is declared three times with three different sets of values; only
the pillars' is settable over HTTP, which is the only reason nothing has broken.
So a board's parameter is written prefixed with the board — `qimen.method` — and
what stays bare is what belongs to a layer rather than a board: the pillars'
three, and the almanac's `shensha`, which is the register of a page every chart
is read against. A CLI command and an MCP tool need no prefix, each naming one
board already; the rule was first written as though it covered them, and it
covers the query string and the addresses built from one. It makes what a section
carries to the next section derivable instead of listed. There is no
compatibility to keep: nothing is in production.

**The choice was not legible in what leaves the machine.** Only 奇門 names its
method in a transcript; the other six axes come out silent, in the printing, the
prompt, the clipboard and the sheet. The state of every axis with more than one
implemented value now travels — **the default included**, because a default
nobody moved is still the school the board was laid by — derived from the
declaration rather than written per board.

**A default that says nothing is the implicit school the first line of
`parameters.md` refuses.** The form counts only what departs from the default,
which was right when a divergence meant a technical preference and is wrong for
a school. Where that landed is not where it was aimed: the controls stayed
under the disclosure — four `select`s in front of somebody who came to ask a
question is a charge every reader pays for the one who moves them — and what
came into the open is the *statement*, under the board, in words. Which is the
better answer to the same requirement, because the board is what a reader
reads.

**Doctrine may travel, quoted.** A school teaches what an arrangement is for,
and 太乙's conditions are the precedent: the source's own words, a clause and not
a paragraph, glossed, and attached to something computed. What that costs is one
catalog key per vernacular per quotation, which is the reason the bound is
written before the field exists.

**Two schools of one art are not two witnesses**, and this is the sharper form
of the one-board rule: two arts share the pillars, two schools of one art share
nearly everything, so their agreement is the part neither disputed. Comparing
them is done by laying each.

**And how many schools there are is a state and not a design** — the twin of
what `i18n.md` says about the vernaculars.

## What this phase does not settle

The divergences 奇門 owes — the naming of the 八神, where the 置閏 leap block
goes, which way the five seasonal relations are read, where earth's season
begins, whether the lodged stem and star travel — want a field apiece on one
input type, and `ROADMAP.md` § 1 argues they are paid in one movement. They are
the first large use of everything above and they are not in this phase. Phase 36
is that movement.

## What landed

`sihua: zuofu`, on the last step, which is the whole errand tested on one cell.
《全書》 gives 壬 its 科 to 天府 in both editions and the Ming recension agrees;
the 中州派 manual prints 左輔 and a 北派 manual draws it twice, one of the two
worked examples decidable on that reading alone. The register had all of that
and had written «not a value to declare», on a completeness test standing in
for the one this project states. The evidence did not move. The criterion did.

Two things it settled that no smaller case would have. It is **named for the
cell** — `zuofu` — because two schools hold the reading and neither's ten stems
are on the shelf, which is `yuan: futou` again: a value may name the rule that
parts two schools rather than one of them. And the seat it lands on is **marked
on both sides**: under `quanshu` it is 天府 that carries a contested 科 at 壬,
under `zuofu` it is 左輔, and a mark on the moved one alone would have been this
engine calling its own default the plain reading.

## The order

The doctrine first, because the instructions are what this phase is for. Then
the register's column. Then the wire, which is the decision with the shortest
window, since the first shared address with a prefixed parameter in it fixes the
spelling. Then the form built from the declaration, before any axis is added to
it, because that is the only work that grows more expensive with every school.
Then the state travelling — transcript and prompt, the drawing, the interface
and the agent surfaces. Then the notes page that says all of this to a reader
who came to check. Last, the first school value: `sihua`, one cell, which is
small enough to be a test of the chain and real enough to be worth having.
