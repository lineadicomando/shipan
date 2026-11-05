# Phase 93 — the rest of 《奇門法竅》

2026-11-05, on the user's word («Procedi con la lettura dello scaffale»): line
7 of `docs/open.md` § "The shelf", what phase 90 left of the work it built
`plate: fei` on. The argument is `docs/sources.md` § "《奇門法竅》 again"; this
records what was done and what it moved.

## What was read, and how

On the plate, in the 華齡 edition: 卷二 pp. 20–25, from 論中宮 to 論時奇法;
卷六's 遁甲論, p. 145; the eleven 乙丑 drawings of 卷五 phase 90 left; one 排宮
figure. The tables of 卷七–八 were held to the engine off the finding aid —
every 格 a palace carries, set beside what the engine's 飛盤 board lays in that
palace at that hour — and the entries that parted were looked at on the plate
where they bore on a cell. The scripts are in `texts/qimen/faqiao-juan2/`.

## What it found

- The 局 is `chaibu`: stated in 論超接置閏, 論拆局補局 and 論時奇法, and worked
  in 論拆局補局 and 卷六. The worked case of 論拆局補局 is two years' days put
  together and fits neither's hours.
- 論中五 is the 南華道人 passage the 折衷 already quotes, in its words: no new
  holder for `bajie`.
- 論年奇法 copies the 演義's 年家 clause. 論月奇法 gives the month's 元 in the
  統宗's order by an enumeration, with the 孟 and 仲 labels swapped against
  the work's own 卷七; it lays the month flown. 論日奇法 is a flown day board of
  sixty days to a 局, the family `docs/open.md` records with no parameter.
- All eighteen 乙丑 drawings agree with the engine, palace by palace.
- The tables' stem-pair 格 agree with the carried heaven plate on 964 of 972
  palace-hours, 482 of 486 under 陰; their 詐, 假 and 擊刑 with the fixed
  spirits and the six decades; their 奇墓 with `yiTomb: kun` and
  `dingTomb: gen`, never once on the other cells.

## What moved

`heldBy` gains `faqiao` under `method: chaibu`, `yiTomb: kun` and
`dingTomb: gen`; the 入墓 row of `docs/sources.tsv` rises to rung 4, and the
rows of `plate: fei` and the other lodgings gain what was checked.
`test/feipan.test.ts` holds all eighteen drawings. `docs/open.md` keeps the
排宮 figures as line 7 and adds the 法竅 to the 月家 steps and to the recorded
day board.

The `laid` block an `/api/qimen` answer carries names who lays the whole
combination, and three values gained a holder: an address answers
differently, and the second term moves, to 0.47.0.
