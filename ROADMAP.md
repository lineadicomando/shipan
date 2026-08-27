# What is not built yet

Two kinds of open work, open for different reasons, and a third list that is
not work at all. The record of how everything else got here is in
[`docs/history/`](docs/history/README.md); what holds today is in
[`docs/`](docs/README.md).

**The open edge of this project is the shelf, not the code.** The boards, the
almanac layer and the calendrical layer under them are built, checked and
documented, and the section of notes that accounts for them is written. What
is left below is a list of values waiting on a source and a third language
waiting for the engine to stop moving. Neither is blocked on architecture.
What will change this engine from here is a **text** — one that adds a
quantity, confirms one already shipped, or contradicts it — and that is an
ordinary change with a stated procedure: `docs/sources.md`
§ "When a source arrives later" says what moves and in what order. Reading the
shelf is therefore the work, and writing code is what happens afterwards.

## 1. Parameters that are declared and refused

Every one of these already exists in an input type, is validated, and throws
`OPTION_NOT_IMPLEMENTED` or `METHOD_NOT_IMPLEMENTED` rather than falling back.
That is the whole point: **the API does not break when one lands.** See
`docs/parameters.md` for the values and what each names.

Implementing one is a matter of finding a source that meets the standard —
two transmitted witnesses agreeing, or one text that checks itself — not of
writing code. In rough order of how well the ground is prepared:

- 奇門: `plate: fei` (飛盤), `centreLodging: dun`, `system` beyond 時家.
- 六壬: `yuejiang: jieqi` and `true`, `guiren: wei`, `zhouye: solar`.
- 七政四餘: `xiudu` from a 曆 table (時憲曆, 授時曆), `luohou: ascending`,
  `minggong: ascendant`, `gong: ci`.
- 太乙: `ji` beyond 年計 — 月計, 日計, 時計.
- 曆注: `shensha` from a named lineage rather than only what 《協紀辨方書》
  ratifies.

`method: maoshan` is in the same list and is not expected to leave it: there
is no reference against which a 茅山 chart could be falsified. See
`docs/refusals.md`.

`ziqi: yinianyisu` is the one waiting on a single citable fact — an epoch. See
the 紫氣 entry in `docs/refusals.md`. The research behind it is on the local
shelf, in `texts/`, which `.gitignore` excludes — so a clone does not have it,
and nothing here depends on it: what a source establishes is in
`docs/sources.md`, cited by title and never by path. See `docs/README.md`
§ "The sources themselves are not here".

## 2. Spanish, once the engine has stopped moving

The interface is read in a vernacular and there are two of them, which is a
state and not a design — `docs/i18n.md` § "Who is reading" is where that is
argued. **Spanish is the third**, and it is deliberately not third *yet*: the
catalogs still gain a family of messages with every board, and a language
added now would be a language re-translated at each of them, by somebody who
has to follow the argument rather than look a word up.

So the condition is the engine's and not the catalogs': when the boards have
stopped arriving and the section of notes is written, the whole message set is
translated once. Nothing has to be prepared for it — `LOCALES` is a list,
`Record<MessageKey, string>` makes a missing key a compile error, and the
locale is negotiated the same way on all four surfaces. What has to be
*watched* is the ratio the notes section is built around: what is derived from
the engine costs a third language nothing, and what is written costs it a
paragraph. A page that grows written prose is a page that grows the price of
this.

The one thing that would change the design rather than the catalogs is a
language needing plural rules, gender agreement or message syntax — see
`docs/i18n.md` § "The catalog". Spanish needs none of the three.

## 3. What is refused and stays refused

Not roadmap, and listed here only so nobody mistakes silence for an omission:
the 用神, 格局, ranking, dating, advice, the 年命 purposes doctrine, a natal
Qi Men chart, 太乙's dynastic readings, and the 十八飛星 placements grafted onto
a 《全書》 board. Each has an entry in [`docs/refusals.md`](docs/refusals.md)
saying who asks for it and why it is not here.
