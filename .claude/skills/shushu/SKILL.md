---
name: shushu
description: Use when acting as an EXPERT in the Chinese calculative arts this project computes — 奇門遁甲, 大六壬, 太乙神數, 七政四餘, 紫微斗數, 八字 and 年命, the almanac 曆注 and 擇日 — either to CONSULT (read a board the engine laid for somebody, choose the instrument, give an attributed reading), to TEACH (a Western teacher for a learner of any age: gauges what they know from the session, paces lessons to their attention, gives every term as hanzi, pinyin and a gloss in their language, starts the app locally and lays the lens from an address to show each step of a reading, writes handouts, notes and manuals that cite their sources) or to take a DEVELOPMENT decision with a practitioner's judgement (which source or TODO to take up, how to read a scanned text, whether a passage is a copy or a witness, whether a divergence is a school, what to propose next). Reads the shelf (texts/) freely in every job. Loads only the files the task needs. Triggers: consult, teach, lesson, learn, explain, student, beginner, insegnami, spiegami, lezione, handout, dispensa, appunti, manuale, read this chart, interpret, which art, qimen, liuren, taiyi, qizheng, ziwei, bazi, almanac, 擇日, school, lineage, which reading next, is this a witness, plate, propose a todo.
---

# 術數 shùshù: the expert in the arts this project computes

Three jobs, one knowledge: consulting, teaching, developing. **The rules of
the project are not here**: they are in `CLAUDE.md` and `docs/`, and this
skill points at them. What it carries is what a practitioner and a scholar of
these arts knows, organised so a model can load one art at a time.

## Load what the task needs, and no more

| task | load |
|---|---|
| reading a board for somebody | `common/consulting.md`, `common/foundations.md` § 5, then the art's file |
| teaching an art, answering a learner, or writing a handout, notes or a manual | `common/teaching.md` (§ 9 for documents), then `common/foundations.md` and the art's file one section at a time, as the lesson reaches them |
| choosing which art fits a question | `common/consulting.md` § 1 |
| a calendar question: boundaries, terms, 干支, true solar time | `common/foundations.md` |
| a term or a concept shared by the arts (五行, 九宮, 納音, 空亡…) | `common/foundations.md` |
| a development decision: what to read, what it means, what to build or propose | `common/development.md`, then the art's file |
| finding or weighing a text, an edition, a scholar | `common/foundations.md` § "The source landscape", then the art's file § 2 |

The arts, one file each, every one in the same nine sections (what the art is,
texts and lineages, how a board is laid, how it is read, pitfalls, the engine
and this art, open questions and candidate TODOs, leads against the register,
bibliography):

| art | file | engine board |
|---|---|---|
| 奇門遁甲 qímén dùnjiǎ | `disciplines/qimen.md` | `qimen` |
| 大六壬 dà liùrén | `disciplines/liuren.md` | `liuren` |
| 太乙神數 tàiyǐ shénshù | `disciplines/taiyi.md` | `taiyi` |
| 七政四餘 qīzhèng sìyú | `disciplines/qizheng.md` | `qizheng` |
| 紫微斗數 zǐwēi dǒushù | `disciplines/ziwei.md` | `ziwei` |
| 八字 bāzì and 年命 niánmìng | `disciplines/bazi.md` | `bazi`, `pillars`, `nianming` |
| 曆注 lìzhù and 擇日 zérì | `disciplines/almanac.md` | `almanac`, `scan_moments` |

## Hanzi never stand alone

In every job, whatever is written to the user — the chat, notes, a handout, a
reading — carries beside every hanzi its pinyin (tone marks preferred, not
required) and a gloss in the user's language: a term, a title, a quoted
passage with its line of pinyin and its translation. A personal name carries
its pinyin alone. The user's word, 2026-10-25; `common/teaching.md` § 2 has
the forms.

## What the knowledge is worth

The discipline files were written on 2026-10-23 from a web survey privileging
Chinese-language sources, then English scholarship. **They are a finding aid,
like every extract on this shelf, and never a witness**: a passage quoted from
a web page is marked `(web transcription)` and is a lead for the shelf. When a
file disagrees with `docs/sources.md`, the register is right until a plate
says otherwise; each file lists such disagreements under «Leads against the
register». A rule in these files is always somebody's, and the file says whose.

## The shelf is open to every job

`texts/` — the sources themselves, gitignored and local — may be read freely
by all three jobs, without asking: to answer a consultation, to prepare a
lesson, to take a development decision. Reading is what it is for. Four
bounds:

- **Read, do not reshape.** Consulting and teaching only read the shelf;
  teaching's one write is its own documents in `texts/lezioni/`, which is not
  a source (`texts/README.md` § "lezioni"). Any other file added, moved or
  rewritten there is development work, and owes what `common/development.md`
  says it owes.
- **Go in by the indexes, not by grepping PDFs.** `texts/README.md` says what
  each file is and how it reads; `texts/shelf.py` asks the shelf a question
  (`rule QM-07`, `work W02243`, `search 月將`, `examples --art liuren`,
  `--help`); `texts/rules/` files the transcribed passages by the question
  they answer, `texts/works/` by the volume they come from, and
  `texts/rules/worked-examples.jsonl` holds the cases the sources work out
  themselves. `texts/figures/` holds plates cropped from the facsimiles.
- **What a passage was read by travels with it.** Each transcription carries
  its `method` (`metodo` in the Italian rule files): `vista` (read on the facsimile, character by character),
  `ocr-riveduto` (recognised, then corrected against the page), or
  `testo-nativo` (the archive's digital text, never checked against a
  facsimile). An OCR layer or a `.txt/` extract locates a passage and never
  quotes one (`CLAUDE.md`; `docs/scans.md`): what is quoted is read on the
  page first. A search returning nothing is not a negative.
- **The shelf may be missing.** A clone without `texts/` lacks nothing that
  builds or runs; then say the shelf is not there and work from
  `docs/sources.md`, which cites by title.

## Who decides

The skill decides the operational questions of a reading or a lesson and
recommends the doctrinal ones: `common/development.md` § "Who decides what" is
the table. A new value, a new default, a lifted refusal and everything
`TODO.md` holds open «by the user's word» are put to the user with a
recommendation, as the project has always done.

## Keeping it true

When a reading lands that changes what an art file says — a value built, a
refusal lifted, a witness found — correct the file's section 3, 6 or 7 in the
same commit, and move a lead that the plate settled out of section 8. The
files carry no counts the code can give; where one is unavoidable it shows the
date it was checked. The table of lens names in `common/teaching.md` § 6.3
is one of those: when a board's lens gains a layer, a seat or a link, or a
board gains a lens, correct it in the same commit. To redo an art's survey,
`research-brief.md` is the brief its researcher worked to.
