# Brief for the researchers writing the `shushu` skill

You are writing one knowledge file of a Claude Code skill for **shipan 式盤**,
a project in this repository that computes the boards of the Chinese
calculative arts (奇門遁甲, 大六壬, 太乙神數, 七政四餘, 紫微斗數, 八字, the
almanac 曆注) and hands them to people and to models. The skill will be used
by a model acting as an expert in these arts, for two jobs:

1. **Consulting**: reading a board the engine has laid, for somebody who asked.
2. **Developing**: deciding how to read a scanned source, what a divergence
   between texts means for the engine, which TODO to take up, what new TODO to
   propose, how to review what is there.

## Read first, in the repository (do not skip)

- `CLAUDE.md` — the project's rules. **Do not restate them** in your file: the
  skill points at `CLAUDE.md` and `docs/` instead. One fact, one home.
- `docs/parameters.md` — your art's rows: every school divergence the engine
  models, by parameter name.
- `packages/core/src/parameters.ts` — the same, as code, with who holds each
  value (`heldBy`) and which are refused (`implemented: false`).
- `docs/sources.md` — grep your art's name; read the sections on it, at least
  the one titled "Whose each value of a … board is". This is the register: what
  the project has established on the plate.
- `TODO.md` — the lines on your art (§ 1 refused values, "Recorded, with no
  parameter", § 2 the shelf).
- `texts/README.md` — grep for your art's works: which files are on the shelf.
- `docs/refusals.md` — what the engine refuses to compute, and why.

## Then research

Use WebSearch and WebFetch (load them with ToolSearch: `select:WebSearch,WebFetch`).
**Privilege Chinese-language sources**: primary texts on ctext.org, zh.wikisource,
國學大師 / guoxuedashi, 中國哲學書電子化計劃, 四庫全書 entries, 故宮珍本叢刊
catalogues, Taiwanese and mainland academic papers (CNKI abstracts, 台灣博碩士
論文, journal articles), established practitioners' manuals. **Then English
scholarship**: e.g. Ho Peng Yoke, Marc Kalinowski, Richard J. Smith, Donald
Harper, Joseph Needham, Stephen Field, Yoke Ho, Paul Kalinowski — whoever is
actually relevant to your art — and serious English practitioner literature.
Search in Chinese terms (traditional and simplified) as well as English.

Run enough searches to be genuinely thorough — dozens, not a handful. Follow
citations. Prefer a primary text over a summary of it.

## The epistemic rules of this project, which your file must keep

- **A transmitted quantity says who carries it, never what the art's rule
  is.** Write «《奇門遁甲統宗》 puts 丁's tomb in 艮; 《遁甲符應經》 in 乾», never
  «丁's tomb is in 艮». Where practitioners disagree, say who holds each side.
- **A web transcription is a finding aid, not a witness.** Anything you quote
  from a web page is marked `(web transcription)` and is a lead for the shelf,
  not a fact the engine may stand on. Nothing you find moves a rung in the
  register; it can only say where to look.
- **Where your research disagrees with `docs/sources.md`**, do not correct
  the register in your file. List it under "Leads against the register", with
  the source and why it might matter.
- Hanzi are **traditional**, and every name carries its pinyin with tone marks
  at first mention: 休門 xiūmén. Identifiers in code font use the engine's
  names (`qimen.method`, `zhirun`).
- Interpretation (用神, judging an outcome, timing) is **refused by the
  engine** but is exactly what a consultant gives. Write it, attributed to the
  work or school that teaches it, so the consultant can say whose reading it
  gives.

## The file you write

English. Markdown. **300–600 lines.** Dense, no padding, no motivational
prose. Write it to the path you were given, and nothing else in the
repository. Sections, in this order:

1. **What the art is** — its scope, the question it answers (a question asked
   at an instant, a birth, a year), its history in five to ten lines with
   dates and attributions.
2. **Texts and lineages** — the works that matter, each with dynasty or date,
   attributed author, editions, and what it is used for; modern lineages and
   manuals in Chinese and in English. Mark with ★ the ones on this project's
   shelf (from `texts/README.md`), and with ☆ the ones the project wants and
   does not hold (from `TODO.md`).
3. **How a board is laid (起例)** — step by step, and at every step where
   practitioners diverge: who holds which reading, and **the engine parameter
   that models it** (`qimen.centreLodging: dun`), or "not modelled" if none.
4. **How a board is read** — the interpretive doctrine as the major schools
   teach it, attributed: what is looked at first, how the subject of a
   question is chosen, how strength and timing are judged, common patterns
   and what they are said to mean. Enough for a consultant to give a competent,
   attributed reading.
5. **Pitfalls** — errors common in modern manuals and software, calendar
   traps (boundaries of the day, the year, the solar terms, true solar time),
   and confusions of terminology.
6. **The engine and this art** — what the engine computes, what it refuses and
   why (pointing to `docs/refusals.md`), and how the board's output fields map
   to the doctrine of section 4.
7. **Open questions and candidate TODOs** — divergences your research found
   that the engine does not model; sources that would answer a refused value in
   `TODO.md` § 1; works worth acquiring. Each as one line: what, why, which
   source would settle it, and whether that source is on the shelf.
8. **Leads against the register** — see above. Empty if none.
9. **Bibliography** — every source you used, with URL where online, grouped
   Chinese / English, one line each saying what it supports.

Report, at the end, the path you wrote, how many searches you ran, and the
three findings you think matter most to the project.
