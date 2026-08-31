# Phase 39 — the 寶鑑, and what it was made of

**A record, not a plan.** On 2026-08-31 the survey of ten arrivals ran and the
first line of `ROADMAP.md` § 2's table was read to the end. Both are finished,
so both left that file; this is where they went. Nothing below is normative and
nothing has been rewritten to match the present — the register carries what the
reading established, and `docs/sources.md` is where it is argued.

---

## The survey of ten arrivals

**The shelf had grown that morning.** Thirty-seven files reached it out of the
archive the older 故宮珍本叢刊 and 遁甲集成 volumes came from — fourteen works it
did not have and three more files of works it held in part — together with a
body of passages already transcribed out of them and filed by the question each
answers. `docs/provenance.tsv` carries the rows and the six that have none;
`docs/notes.md` § "The corpus, which is not the register" carries the boundary.
What the arrival reopened in the register was written the same day. What it left
was ten files nobody had measured.

Those ten were 《御定奇門真詮》 (故宮 第430冊), 《御定六壬直指》 with its 析義
(第417冊), the three 六壬 works of 第419冊, 遁甲集成 第一 · 第四 · 第五冊, the
四庫全書 volume of the 命書 group (vol. 809) and 《中國恆星觀測史》. `docs/scans.md` owns the procedure and it was
followed: what a file *is* before anything is planned around it. The
measurements went to `texts/README.md`, one row a file, and four of them decided
whether a line existed in the roadmap's table at all.

- **《御定奇門真詮》 carries no rule.** Its 新編目錄 is the whole contents list
  and names the eighteen 局 and nothing else, thirty pages each: 1080 hour
  boards, no 起例, no prose juan. The largest unopened dunjia file on the shelf
  was ruled out by its own contents leaf rather than by a sweep of 545 pages.
- **遁甲集成 第四冊 has a 起例**, which is what the refused dunjia values wanted
  and what the shelf had no unread instance of. It became the table's first
  line, and the rest of this file is what happened to it.
- **《星學大成》 is in SKQS vol. 809**, from the volume's p. 285 to its end, read
  off the 本册目次 on the plate as the entry had said it would have to be.
- **遁甲集成 第一冊 carries the typeset 總目錄 of all six volumes**, and it puts
  《遁甲符應經》 三卷 in 第一冊 at series p. 385 where this shelf reads it in
  第三冊 at p. 1136. Two records say so and not one: the archive of provenance
  names the same two files 第一冊 …`DunJiaFuYingJing` and 第三冊 `QiMenDunJia`.
  第一冊's leaves are not in doubt — the 四庫未收書提要, 宋仁宗's 御製序 and the
  work's own 目錄 are all there. But a 總目錄 is a good witness to where a work
  starts and a poor one to what it is called: its page numbers check against the
  transcribed corpus's facsimile citations exactly, and it misreads a title two
  lines above 符應經. **The survey opened this and did not close it**, and
  closing it is still a line in the roadmap.

**A survey answers a question nobody had asked of the file and raises the ones
worth asking.** None of the four moved a rung and every one changed what was
worth opening next, which is the whole of what the procedure claims.

## The 寶鑑 read to the end

《遁甲集成》第四冊's 《奇門寶鑑》 六卷 headed the table because it carried the
only unread 起例 on the shelf and a section headed at the centre's lodging.
Whether it was 故宮 第431冊's 《御定奇門寶鑑》 was open, and that decided whether
reading it was a collation or a second witness.

**It is both works and neither answer.** Both prints open 卷一 on 奇門源流 and
run word for word, so the frame is 御定奇門寶鑑's: 奇門源流, 遁甲總論, 凡例十則,
the 釋義四十四則, 卷三 to 卷六. But the 遁甲起例, 三奇趨神接氣秘訣 and
奇門四十格 its 卷一 carries where the imperial copy has none, and the 置閏法 of
its 卷二, are **《奇門遁甲統宗》卷一 reprinted** — in 統宗's own order and word for
word, down to the 「去符頭甲午日共超七日」 slip the register already records as the
compiler's. A print can be one work at its frame and another at its filling, and
no contents leaf says so. That case is now in `docs/scans.md` with the check
that caught it.

**What it established.** 釋虛中合宮, a section of the frame that both copies
carry and nobody had opened — 御定's 目錄 names 釋義四十四則 and not its items —
derives the centre's lodging at 坤二 and then prints the refused reading with a
derivation of its own from the 先天 trigrams, and the compiler decides between
them: 「其說於理尤為周備，但本多從前說，故遵之」. He judges the two-board lodging
sounder and keeps 坤 for both dun because more copies read that way. 本 is an
edition. And 卷二's 九星 entry prints the centre's annotation longer here than
there — 「陽遁陰遁俱寄坤宮。一本陰遁寄艮，陽遁寄坤」 against 御定's
「一本陰遁寄艮」 — so the variant's yang board is stated rather than left to a
reader, and the note agrees with 釋虛中合宮.

**What it took back.** The 超接 and 置閏法 leaves were first written up as this
work's own second statement of the solstitial placement, which would have made
the shipped placement two prints against 《金鏡寶鑑》's one. They are 統宗's. The
entry was withdrawn the same day and the count is one against one, as before.

**What caught it was a grep.** The 置閏法 leaf was put to a transcription
already on the shelf before the finding was trusted. It cost minutes; not doing
it would have cost the register a false second witness to a rule it carries. The
lesson went to `docs/scans.md`, where the procedure lives, and it is cheapest
exactly on the section a file was opened *for* — that being the section somebody
will quote.

## What the two together are worth

Three commits, no rung moved, and one refusal better argued than it was:
`centreLodging: dun` is no longer «what nobody states» nor «what a compiler
chose against», but what a compiler stated, judged sounder, and declined on
manuscript majority. The reusable finding is smaller and more useful than
either: **a second copy whose contents leaf itemises what the first groups is a
finding aid for the first**, and it is the only reason 釋虛中合宮 was ever
looked for.
