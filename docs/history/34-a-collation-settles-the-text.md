# Phase 34 — a collation settles the text, and not the doctrine

Phase 33 answered what a disagreement between two witnesses to one text
becomes: never a parameter, always an entry in the register. It left the
opposite question unasked, and somebody asked it — what is an *agreement*
between them worth?

The occasion was an observation from outside this project: a later edition of a
text, carrying commentary and small corrections, confirming the earlier one
without departing from it. That is not a copy. Somebody compared witnesses and
left the work visible. So does it count?

## The two risks the standard was answering with one sentence

«For anything that cannot be derived, two such sources must agree» retires one
risk: that a rule is the idiosyncrasy of the one lineage transmitting it. It
does nothing about the other — that the copy in hand is corrupt, or misread at
the character the rule turns on — and no number of *independent* works can,
because none of them is a witness to this text.

That risk is not hypothetical here. The 六壬大全 writes 己 and 巳 for each other.
The 庚 line of the 四化 has three readings across three recensions. The 火鈴 seats
read 丑卯 in one edition and 午卯 in another. 身主 reads 火玲星 for 火鈴星. A 坤 in
the 金鏡寶鑑's 三元訣 sits under a cut slip. Each of those was settled, and the
register had no column and no word in which to say it had been.

## The answer, and why it is narrower than the question

A collation establishes the **text**. It never establishes the **doctrine**, so
it cannot make two agreeing sources out of one, and a quantity standing on a
single work stays on rung 4 or rung 5 however many copies of that work have been
compared. What it moves is three things and not four: the argument, the
`checked_against` and the date, never the rung.

The three conditions on an edited edition were not invented for this phase. They
were read back out of what `sources.md` already argued about 周宣屹's 整編 — the
base must not be the other witness's lineage and that must be argued rather than
assumed; the intervention must be inspectable; the reading leaned on must be
named as that edition's. Its 166 emendation notes satisfy the second, its 卷四
satisfies the first, and its unnamed base is why the third has to be done by hand
every time.

**One thing is admitted that the standard did not admit.** A lone reading of
such an edition may be followed. That is not «resolving a divergence by
preference», which stays forbidden: it is preferring the copy whose editor did
the collating over the copy that dropped what he prints.

## What the sweep found, which is why this was worth a phase

Five rows of the register have «both editions» as their whole check, and they
stood on three different rungs — 2, 4, 4, 5, 5. The last two are right: editions
agreeing on a defect resolve nothing, and editions disagreeing are not an
agreement. The middle two are right for reasons that have nothing to do with the
editions. The first is the only row in the register whose rung rests on two
copies of one work, and under the rule this phase writes it is a rung 4.

**It was not moved.** The rung stays where it is and the row says it is
disputed, in the register and in the argument. A colour on every 紫微斗數 sheet
is not a thing to restate in the same commit that changes the rule by which it is
weighed, and the reader this register exists for is better served by a rung
marked contested than by one quietly corrected. Phase 33's own finding applies:
a debt named is a step of its own.

**And something already shipped stopped being unjustified.** 左輔 and 右弼 carry
土 in `stars.ts` because the second edition prints 輔弼二星屬土 where the
Wikisource text prints the line without it. Two names are inked on every sheet on
the authority of one edited edition, and until this phase the written standard
did not cover it. It does now, by name.

## What did not move

No parameter. No rung. No line of `core`. The six values refused in
`ROADMAP.md` § 1 are all waiting on a different *work*, not another copy of one
they have — so the amendment unlocks nothing, and that was checked before it was
written rather than hoped for afterwards.

The cost was chosen for the same reason. A new rung, or a seventh column, would
have cost four catalog strings in every vernacular and a hardcoded list in two
files, for a distinction forty rows of forty-nine will never use. The register's
prose column is quoted rather than translated, which is where a per-row fact of
this kind belongs.
