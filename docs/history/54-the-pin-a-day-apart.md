# Phase 54 — 遁甲通明鈐, and the pin a day apart inside one compilation

The third line of the shelf was still the 《御定奇門大全》, which was bought for
a 起例 variant. The next of its works was 遁甲通明鈐, 卷十一–十三. This is
2026-10-16, the same day as phase 53: the three juan read for their 起例, and
nothing built.

## What the question was, and what answered it

**The extent came first.** The 版心 put 卷之十一 on the left page of sheet 269,
a sheet earlier than the line on the shelf had it, and 卷十三終 on 345. 卷十四,
奇門仙機, follows from 347. Two contact sheets of the 版心 strips settled this
before any page was read.

**The 起例 is in three places, and two of them are 置閏.** 卷十一 opens on the
符頭 table and a board laid on the palm. 卷十二, from sheet 305, states 置閏 as
arithmetic and works it. 卷十三 opens on 奇門超接正閏秘旨 with 淳祐 cases. The
rest of the three juan is omens, 路應, the 格 and the 直使. Contact sheets were
enough to show that, and none of it was read.

**The dated case reproduces.** The 淳祐六年 leap at 芒種 runs block for block
as `method: zhirun` lays 1246, with the head nine days before the 夏至. So the
engine's `MAX_CHAOSHEN` = 8 has a thirteenth-century case behind it. The same
juan says in words that the leap month does not place the block.

**The undated cases were dated by searching.** 卷十二's 「如某年」 cases give a
lunar date and a day pillar for a solstice and for a 大雪. The engine was asked
every year from 400 to 1912. The only pair of consecutive years is 1265 and
1266, nineteen years after the 淳祐 cases. 1265 agrees. In 1266 the case
lets nine days pass at the summer solstice and intercalates at eleven in the
winter. That is 卷十二's own rule, 「凡過超十日則閏」. The summer of 1266 is the
summer of 1246 to the day, and 卷十三 intercalated there.

## What it moved

The register and nothing else. `docs/sources.md` has a section of its own, the
置閏 row in `sources.tsv` names a fifth work, and the rung does not move. The
work's two juan part on the pin, and its 淳祐 cases share two events with the
符應經's copy in the same compilation, so whether they share a source is open.
The pin at ten is recorded in `TODO.md` with no parameter. Whether the 大全
joins the 統宗 in `heldBy` for `method: zhirun` and `leap: solstice` is left
to the user, because it changes what a 置閏 board says of itself.

## What was not done

No test holds the 1246 case, as none holds the 1589 or 1717 ones: they are in
the register. The 1266 reading rests on a year found by search and on a
calendar of the day the search only approximates, which `docs/sources.md`
says. Nine works of the 大全 are unread, the next of them 奇門仙機.

## Then, on the user's word

The same day the user named the 大全 beside the 統宗 in `heldBy` for `method:
zhirun` and `leap: solstice`. Its 卷十三 has what a holder needs, attribution
to the work that prints it and a case transcribed. The attribution is data in
`parameters.ts` and nothing prints it: the line naming the schools writes its
holders in the catalogs, and 置閏's names none. The sentence on whether a text
lays a board's whole combination cannot change either, since the 統宗 holds
both values already and the 大全 does not hold `centreTravel` or `dingTomb`.

## The version

Unchanged. Nothing ships that an address answers for, and no address answers
differently.
