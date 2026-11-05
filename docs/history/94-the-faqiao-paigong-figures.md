# Phase 94 — the 法竅's 排宮 figures

2026-11-05, on the user's word («Riprendi la lettura dello scaffale»): line 7
of `docs/open.md` § "The shelf", the last part of 《奇門法竅》 phase 93 left. The
argument is `docs/sources.md` § "《奇門法竅》's 排宮 figures"; this records what
was done and what it moved.

## What was read, and how

On the plate, in the 華齡 edition: 卷一's 例言 (PDF 6), 卷五's three 圖說
(PDF 124–128), the eighteen 乙丑 排宮 figures (PDF 138–146, 156–164) cell by
cell, and the headings of the 甲子 figures of the two fifth 局. Each page was
rendered at 300 dpi and each disc cut into its nine palaces, each turned
upright, by `texts/qimen/faqiao-paigong/scripts/sectors.py`. Four discs had to
be centred by hand. The cells are in `paigong-yichou.tsv`, and
`scripts/check.mjs` holds them to the engine's `plate: fei` board.

## What it found

- The 排宮 figure is the flown board made into a volvelle: two paper discs
  to be cut out and turned (「上下二盤剪活輔補用之」), each a cycle of nine
  seats, 休 死 傷 杜 開 驚 生 景 and an empty 間, set one seat apart. The gate
  one disc puts on 五 is read off the other.
- All eighteen agree with the engine: the heaven ring at every palace, and
  every gate on one of the two rings. 陽四 and 陰六 read every gate at home,
  which is the 直使 waiting; 陽五 and 陰五 put 生門 on 六 and 死門 on 四. One
  cell is miscut: 景 for the star 英 on 陰一's 坎.
- 「用法不同」 in the 例言 is a device and not a second rule for the 直使, and
  in this work 排宮 does not mean 轉盤.

## What moved

The register's `plate: fei` row gains the figures; the rung stays at 4, and
nothing is built. `docs/open.md` loses the line, and its 鳴法 line gains the
question the 甲子 disc raises. `texts/README.md` places the 間宮圖說 in 卷五,
not 卷四. An address answers as it did, so no term moves.
