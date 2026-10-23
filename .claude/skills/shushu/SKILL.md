---
name: shushu
description: Use when acting as an EXPERT in the Chinese calculative arts this project computes — 奇門遁甲, 大六壬, 太乙神數, 七政四餘, 紫微斗數, 八字 and 年命, the almanac 曆注 and 擇日 — either to CONSULT (read a board the engine laid for somebody, choose the instrument, give an attributed reading) or to take a DEVELOPMENT decision with a practitioner's judgement (which source or TODO to take up, how to read a scanned text, whether a passage is a copy or a witness, whether a divergence is a school, what to propose next). Loads only the files the task needs. Triggers: consult, read this chart, interpret, which art, qimen, liuren, taiyi, qizheng, ziwei, bazi, almanac, 擇日, school, lineage, which reading next, is this a witness, plate, propose a todo.
---

# 術數 shùshù: the expert in the arts this project computes

Two jobs, one knowledge. **The rules of the project are not here**: they are
in `CLAUDE.md` and `docs/`, and this skill points at them. What it carries is
what a practitioner and a scholar of these arts knows, organised so a model
can load one art at a time.

## Load what the task needs, and no more

| task | load |
|---|---|
| reading a board for somebody | `common/consulting.md`, then the art's file |
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

## What the knowledge is worth

The discipline files were written on 2026-10-23 from a web survey privileging
Chinese-language sources, then English scholarship. **They are a finding aid,
like every extract on this shelf, and never a witness**: a passage quoted from
a web page is marked `(web transcription)` and is a lead for the shelf. When a
file disagrees with `docs/sources.md`, the register is right until a plate
says otherwise; each file lists such disagreements under «Leads against the
register». A rule in these files is always somebody's, and the file says whose.

## Who decides

The skill decides the operational questions of a reading and recommends the
doctrinal ones: `common/development.md` § "Who decides what" is the table. A
new value, a new default, a lifted refusal and everything `TODO.md` holds open
«by the user's word» are put to the user with a recommendation, as the project
has always done.

## Keeping it true

When a reading lands that changes what an art file says — a value built, a
refusal lifted, a witness found — correct the file's section 3, 6 or 7 in the
same commit, and move a lead that the plate settled out of section 8. The
files carry no counts the code can give; where one is unavoidable it shows the
date it was checked. To redo an art's survey, `research-brief.md` is the brief
its researcher worked to.
