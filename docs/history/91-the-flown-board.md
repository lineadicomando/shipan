# Phase 91 — the flown hour board, `plate: fei`

2026-11-05, the session of phase 90, on the user's word («1. ok 2. ok»): build
`plate: fei` on 《奇門法竅》, and add that work to the holders of the lodgings
it was found to hold.

## What was built

`packages/core/src/dunjia/plates.ts`: `carriedPlates`, the earth plate carried
whole to the hour stem, the same shift for every star in both dun;
`carriedGatePalace`, the 值使 counted through the nine and waiting on the
palace before 五, with a 旬首 in 五 standing at the host and stepping out to 六
or 四; `carriedGatePlate`, the eight gates carried along the outer palaces.
`computeQimenChart` takes them under `fei`. A witness, `faqiao`, names the work.

`centreTravel` is now in force only under `zhuan` and `xingfei`: under `fei`
the 值符 stands in the centre as a star among nine and the 值使 never comes
there, so a board laid on it no longer names a choice it was not laid by.
`inside` in the declaration, and its copy in the web, takes a list of values
to say so.

## What it was held to

`test/feipan.test.ts`: the seven 乙丑 drawings read in phase 90, palace by
palace — star, stem, gate and spirit; the five hours the 圖說 works; and table
hours of 卷七–八 by their 門伏 and 門反 — 陽遁一局 戊辰 and 陽遁四局 丙寅,
陰遁五局 庚午, 壬申 and 癸酉 — with the 值使 of a 旬首 in 五 under 陽 and 陰. The
three tests that used `fei` as their refused value now use `strengths: star`.

## What phase 90 got wrong, and this one corrects

Phase 90 called the 法竅's 論寄宮 a holder of `centreLodging: siyu`, and the
user agreed to add it on that ground. Checked against `HOST_BY_SEASON` before
the holder was written, `siyu` is 《三才發秘》's corners — spring 巽, summer 坤,
autumn 乾, winter 艮 — and the 法竅's go round the same four a season on, 立春
艮, 立夏 巽, 立秋 坤, 立冬 乾. So the work holds `dunni` alone, and its own
reading is recorded in `docs/open.md` § "Recorded, with no parameter". The
register's paragraph and row were corrected to say what holds.

## What moved

Both catalogs name the third reading and the label now says the gates move
too; the web declaration, the MCP schema, `docs/parameters.md`,
`docs/agent-prompt.md` and README.md describe it; `TODO.md` § 1 no longer lists
it. An address asking for `qimen.plate=fei` answered 501 and now lays a board,
and a board laid with `dunni` now names a holder, so the second term moves, to
0.46.0.
