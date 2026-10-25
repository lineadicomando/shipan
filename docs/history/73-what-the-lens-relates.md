# Phase 73 — what the lens relates

Surface work and three readings on 2026-10-25, on the branch
`lens-relations`, from the user's answers to the five questions phase 72 left:
the 七政 Moon, 歸垣, 三方 and 對宮, the elements of the 五將, and the
consultation. All five were answered yes.

## What was read

Two readings ran beside the surface work, each by a reader working to a
written brief into a directory of its own, the findings integrated after.

- **三方 and 對宮, on the Ming 南陽堂 woodblock of the 全書**
  (`texts/ziwei/quanshu-nanyang-sanfang/`). The book never defines the
  geometry by branches; it gives it by palace name in 譚星要論 and by
  branches in a worked case under 安流祿流羊流陀訣, and the two agree. No
  passage reads phases between stars of two palaces. The transcription had
  two faults on exactly these lines: 財帛宮祿 for 財帛官祿, and a dropped
  clause that is the worked case itself. The passages the transcription
  placed in the 太微賦 are the 斗數發微論's.
- **The 五將, on the 金鏡 and the 統宗** (`texts/taiyi/wujiang-elements/`).
  Both give 始擊 火 熒惑 and 文昌 土 鎮星. The register had them the other way
  round, after 盧央, who cites a 《淘金》 not held.

## What was built

- **七政四餘**: the Moon related as water in the lens alone, on the
  五星精義's 論恩難仇用 row (rung 5); the 十二宮所屬 and 七政歸垣 registered
  (rung 4, the two tables of one page giving every palace the same owner);
  歸垣 drawn as a link from each governor with a phase to its home palaces.
- **紫微斗數**: 三方 and 對宮 drawn as links between palaces, tested against
  both of the 全書's statements.
- **太乙**: 太乙 and the four generals related, with the phases of their
  stars; the lens reads a camel-cased identifier from the fragment, which it
  had dropped.
- **The consultation**: every drawing asked `bare`, laid on the bench with the
  lens and the key to its names beside it, and the lens opening whole when a
  different instrument is cast. How a name and a seat are said moved to
  `lib/lens-words.ts`, shared with the sections, and where a name stands is
  said by its layer as well as its seat, a corner of the 太乙 rim sharing its
  name with a palace.

## What it moved

0.35.0: `/api/qizheng`, `/api/ziwei` and `/api/taiyi` answer a `lens` with
links and things they did not carry.
