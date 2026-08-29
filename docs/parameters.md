# No school is implicit

Different schools produce different charts from identical input. The engine
cannot have an implicit "correct" behaviour, so **every divergence is an
explicit parameter with a declared default, present in the input type from the
start**. Adding one later breaks the API, MCP, the CLI and every shared URL at
once.

A parameter may ship with a single implemented value, provided the parameter
already exists in the type and an unimplemented value is **refused rather than
silently substituted** — `METHOD_NOT_IMPLEMENTED` exists because a chart cast
by the wrong method looks right and is not.

## What is not a parameter, which the rule above used not to say

«Every divergence» was too wide, and the practice was always narrower. Two
copies of one work disagree at a character, an editor emends and prints the
original beside it, a Ming block reads 同相 where a transcription reads 陰同 —
those are divergences and none of them is a parameter. The engine settles them
once, argues the settlement in `docs/sources.md`, and hands the caller a chart.
The 六壬 case is the plain one: the 四庫 text writes 己 and 巳 for each other,
this engine reads there as the sense requires, and no option was ever offered
for it.

**The test is whether somebody could hold the other side.** A school can be
followed — a person says «I cast by 拆補», «I follow 中州派», and means it as a
commitment they could defend. An edition can only be preferred, and preferring
one is the work of whoever assembled the shelf. That is why **no value here is
ever named for a recension**: a caller has no ground to choose between two
witnesses to one text, and offering the choice would be the engine declining a
job that is its own.

**A value named for a work is not a counter-example.** `sihua: quanshu` names
《紫微斗數全書》 and `xiudu` names two 曆, because in those places the work *is*
the method — a 七政四餘 practitioner really does cast by 授時 degrees or by
時憲 ones. What the name never means is «this copy rather than that copy of the
same work».

**Narrowing the rule makes its first half bite harder, and that is the point.**
Once an editorial settlement is named as the thing that is *not* a parameter, a
convention this engine follows and another living tradition does not stops
being able to hide behind the same word. If two practitioners would draw
different boards, the divergence owes a parameter, whatever else is true about
it. `ROADMAP.md` § 1 carries what that costs today.

**This section settles what a disagreement between witnesses becomes, and the
other half of the question is not here.** What an *agreement* between them is
worth — a collation establishes the text and never the doctrine, so it moves no
rung — belongs to the register, and
[`sources.md`](sources.md) § "What a second copy of one text buys" states it.

## Three questions, which is how a divergence is tested

The audit that followed the narrowing put every admission of divergence in
`core` and in the register through the same three:

1. **Does it change what the chart shows?** A difference in derivation that
   lands on the same cells is not one a caller can see, and a difference in a
   *name* — 上格 against 小格 for one pairing of 十干克應 — is a variant the
   register records rather than an option.
2. **Could two practitioners hold opposite sides?** Not two libraries: two
   people, each able to say which they follow and why. This is what parts a
   school from an implementation detail, and it is why two candidates the audit
   met are named and not claimed — a witness is owed first.
3. **Is it exposed, and is it registered?** Those are two questions and the
   second is easy to fail: an option can sit on a board's input type with a
   declared default and still be absent from `PARAMETERS`, in which case the
   chart can say what produced it and nothing a surface builds can.

Most of what the audit met was the rule already working. The 用神 mapping is
refused in `scan.ts` in as many words; 六壬's 課體 reports nothing where the
sources disagree; `leapMonth`, `huoling` and `centreLodging` each carry their
alternatives declared and refused. What it found is in `ROADMAP.md` § 1.

## What a school value must show

The three questions say *whether* a divergence owes a value. This says what has
to be true before one can be declared — and it is a lower bar than the one in
`docs/sources.md`, on purpose.

**A value named for a school claims attribution, not doctrine.** It does not
assert that the school is right; it asserts that this is what the school
teaches and that the engine transcribes it. That claim fails in two ways only,
the lineage misnamed and the table miscopied, and neither wants a second
tradition to catch it — so the standard's demand for two agreeing witnesses is
the demand on a quantity the engine presents as the answer, and it is not the
demand here. `docs/sources.md` § "What a value named for a school must show"
states what stands in its place, and `docs/notes.md` says why attribution is
not a rung.

**Completeness is not the test, and it was being used as one.** A lineage that
moves a single cell and keeps the rest was read, for a while, as not having a
table of its own, and no value was declared for it. But a moved cell changes
what the board shows and two practitioners hold opposite sides of it: the three
questions admit it, and the size of a disagreement is not one of them. What a
school owes is a witness saying what it teaches, not a whole apparatus rebuilt
from nothing.

## How many schools there are is a state and not a design

The twin of what [`i18n.md`](i18n.md) says about the vernaculars, and for the
same reason. Nothing here may be written as though a board had one method, and
a sentence saying «the engine computes X» where X is one of several is a
sentence that goes false the day the second lands rather than one that is wrong
today.

What a school costs to add is the honest measure of anything built around the
parameters: a value in `parameters.ts`, a gloss in every catalog, a row in the
register, an argument in `docs/sources.md` — and no control, because the form
is built from the declaration. A school that would need a paragraph written by
hand is a school whose descriptor is missing a field, which is
[`notes.md`](notes.md) § "Derived beats written" arriving here.

## A school is axes, never a bundle

A school usually touches more than one row at once, and the convenient shape is
a single `school:` value presetting the rest. Inside `core` it is refused.

A preset is a table and a table can be edited. A chart carrying the name of a
bundle rather than the values it expanded to would reproduce differently the
day the bundle changed, and its own output would not say so — which is the
guarantee this page exists for: a chart is a pure function of its input and of
the options that produced it, and no function in `core` reads a global default.
What travels is always the expanded values.

**A bundle at a surface is a different thing and is allowed.** A form may offer
«as such-and-such a school casts it» and fill the fields with it, because what
leaves the form is still the fields: the reader sees what was set and can move
any one of them afterwards. Nothing downstream of the form ever receives the
name of the bundle.

## A declared default is not a hidden school

Every row here has a default and has to: an address naming no method still
answers, and so do a tool call, a command and a bare section. What does not
follow is that the default may be silent.

**Where a parameter has more than one implemented value, the value in force
travels — always, and whether or not anybody moved it.** It is stated under the
board in the interface, under the pillars of every transcript and inside a
prompt's fence, and under the grid of every drawing; over the REST API and MCP
it is in the answer, and the instructions tell a caller to report it. A reader
who did not choose is exactly the reader who has to be told, and «no school is
implicit» is a claim about what the software does *for* them and not only about
what the type declares.

**Stated where the board is read, and moved where the options are.** The
controls stay under the disclosure a reader opens on purpose — a form that put
four `select`s in front of somebody who came to ask a question would be
charging every reader for the one who changes them — and what stands in the
open is the statement, beside the board it is about. The two are not the same
surface and the requirement is only on one of them: it is the reading that must
not be able to pass for schoolless, not the form.

**And the picture is not enough, wherever there is one.** A board on a page is
an `<img>` with `alt=""`: uncopyable, unreadable to a screen reader, gone when
pictures are off. The drawing carries the block because it travels alone; the
page carries the same block in words because the reader is there.

Where a parameter has one implemented value there is nothing to be aware of and
nothing is said: what would be reported is not a school but the absence of a
second one, which is `ROADMAP.md` § 1's business.

**Each board carries its own input type. None inherits a default from
dunjia's.**

## The Qi Men chart

| Parameter | Values | Default |
|---|---|---|
| `method` | `chaibu` (拆補 chāibǔ), `zhirun` (置閏 zhìrùn), `maoshan` (茅山 máoshān) | `chaibu` |
| `yuan` | `term`, `futou` (符頭 fútóu) — inside 拆補 | `term` |
| `plate` | `zhuan` (轉盤 zhuànpán), `fei` (飛盤 fēipán) | `zhuan` |
| `centreLodging` | `kun` (寄坤二), `dun` (陽遁寄二 · 陰遁寄八) | `kun` |
| `system` | `shijia` (時家 shíjiā), later `rijia` (日家 rìjiā), `yuejia` (月家 yuèjiā), `nianjia` (年家 niánjiā) | `shijia` |

`method` and `yuan` are the two most divisive and neither is optional. 茅山 has
no reference at all and is refused.

## The calendrical layer under every board

These three are declared in `ChartOptions` beside dunjia's own, because that
is the type a chart carries, and they are not dunjia's. They say how an
*instant* is read into pillars, and every board built on those pillars
inherits the answer: 八字 has no divergence of its own and stands on these,
奇門 and 六壬 are cast at an hour these decide the stem of, and a board that
read the day differently from the pillars printed beside it would be two
calendars in one output.

| Parameter | Values | Default |
|---|---|---|
| `trueSolarTime` | `true`, `false` — the one boolean here | `true` |
| `yearBoundary` | `lichun` (立春 lìchūn), `chunjie` (正月初一 zhēngyuèchūyī) | `lichun` |
| `dayBoundary` | `zishi` (子時 zǐshí, 23:00 → next day), `midnight` | `zishi` |

太乙 and 紫微斗數 cut the counted year by a boundary of their own, and the
almanac takes none of these at all. Both are below.

## The other boards

| Board | Parameter | Values | Default |
|---|---|---|---|
| 六壬 | `yuejiang` | `zhongqi` (太陽過宮 at the 中氣 zhōngqì), `jieqi` (節氣 jiéqì, half a term earlier), `true` (太陽實躔 tàiyángshíchán) | `zhongqi` |
| 六壬 | `guiren` | `chou` (丑 chǒu and 未, which 甲 shares with 戊庚), `wei` (未 wèi and 丑, with 甲 standing alone) | `chou` |
| 六壬 | `zhouye` | `branch` (晝 from 卯 to 申), `solar` (actual sunrise and sunset) | `branch` |
| 曆注 | `shensha` | `xieji` (only those 《協紀辨方書》 xiéjìbiànfāngshū ratifies, cut to the day and the direction), later a named lineage | `xieji` |
| 七政四餘 | `xiudu` | where the 宿 begin: `juxing` (at the 距星 jùxīng, placed at the instant), or a 曆's table — `shixian` (時憲曆 shíxiànlì), `shoushi` (授時曆 shòushílì) | `juxing` |
| 七政四餘 | `ziqi` | `off`, or `yinianyisu` (一年一宿 yīniányīxiù), once an epoch can be cited | `off` |
| 七政四餘 | `luohou` | which node is 羅睺: `descending` (the 星命 law), `ascending` (湯若望 and the 時憲曆) | `descending` |
| 七政四餘 | `minggong` | `yuejiang` (立命 by 加時, the hour laid on the palace of the 月將 yuèjiàng), `ascendant` (the true rising degree) | `yuejiang` |
| 七政四餘 | `gong` | where the twelve 宮 are cut: `zhongqi` (太陽過宮 at the 中氣 zhōngqì), `ci` (the 次 cì as stretches of 宿度) | `zhongqi` |
| 太乙 | `epoch` | which 上元積年 the count runs from: `jinjing` (《太乙金鏡式經》 tàiyǐjīnjìngshìjīng) | `jinjing` |
| 太乙 | `ji` | which register the board is laid in: `nianji` (年計 niánjì), `yueji` (月計 yuèjì), `riji` (日計 rìjì), `shiji` (時計 shíjì) | `nianji` |
| 太乙 | `yearBoundary` | where the counted year begins: `lichun` (立春 lìchūn), `dongzhi` (冬至 dōngzhì), `chunjie` (正月初一 zhēngyuèchūyī) | `lichun` |
| 紫微斗數 | `leapMonth` | what a birth in an intercalary month counts as: `following` (the month after it, which is the book's), `current`, `split` | `following` |
| 紫微斗數 | `sihua` | which table of the 四化: `quanshu` (《紫微斗數全書》 zǐwēidǒushùquánshū's own), later a lineage that has been read | `quanshu` |
| 紫微斗數 | `huoling` | how 火星 and 鈴星 are placed: `fixed` (a seat apiece from the year's triplicity, which is all 卷二 states), `hour` | `fixed` |
| 紫微斗數 | `daxian` | where the first decade opens: `adjacent` (the palace beside the 命宮), `ming` (命宮 mìnggōng itself) | `adjacent` |
| 紫微斗數 | `yearBoundary` | which reckoning gives the year its stem and branch: `lichun` (立春 lìchūn), `chunjie` (正月初一 zhēngyuèchūyī) | `chunjie` |
| 年命 | `count` | how the years lived are counted: `sui` (虛歲 xūsuì), `turns` (the turns of the year pillar alone) | `sui` |

**The 曆注 are not a board**, and take nothing from the layer above: the
almanac is a page of a published book, a pure function of the civil date
reckoned as the lunar date is, and an almanac belongs to a date — the same
date is the same page for everybody who opens it. Its one divergence is which
神煞 enter, which says not how an instant was read but which book was copied
out.

**年命 is the last row and is not a board either.** It is a birth placed
inside a chart of a moment — 本命 and 行年 — and it has one divergence because
the sources count the years lived two ways. It is in this table rather than in
a section of its own because it is a parameter with a declared default like
every other row, and a reader looking one up should find them in one place.

## Rows that are not like the others

**`epoch` is upstream of every placement on a 太乙 board**, where every other
row here is a method with branches whose output a reader could be told the
shape of. A wrong epoch rotates the whole figure silently and nothing in the
output disagrees. It ships with one value because a branch nobody has read is
worse than a branch that does not exist — the load-bearing quantity turned out
to be an *anchor* the text states in datable form and checks four ways, not
the magnitude the three chapters disagree about. See the 太乙 section of
`docs/sources.md`.

**紫微斗數's `yearBoundary` defaults to `chunjie` where the pillars' defaults
to `lichun`**, and the two are not in disagreement: they are different
questions. The pillars are cut at 立春 because that is what every almanac
printing four pillars does. This board counts its month and its day on the
lunar calendar, so the year that opened at 正月初一 is the reckoning coherent
with the rest of it. 《紫微斗數全書》 says nothing either way, which is
precisely why it is a parameter — the year stem carries the 四化, 祿存, 天魁
and 天鉞, so a birth in the weeks between the two lays out two different
boards and only one of them can be printed.

**`xiudu` gained `juxing`, and `gong` did not exist until the board was
written.** Both are the same discovery arriving twice: the 宿度 and the 十二次
are one question and the sources answer it in two frames. `juxing` is the
answer that commits to no epoch, which is why it is the default and why the
two 曆 tables can wait. `gong` had to exist because the palaces can be cut by
the seasons or by the stars and precession has parted the two by weeks — which
is exactly the breakage this page opens by describing.

## A board's parameters travel under the board's name

**A parameter of a board travels prefixed with it** — `qimen.method`,
`qizheng.luohou`, `ziwei.leapMonth` — and a parameter of a *layer* travels bare.
The layers are two: the pillars, whose `trueSolarTime`, `yearBoundary` and
`dayBoundary` say how an instant is read into the four that every board stands
on, and the 曆注, whose `shensha` names the register of a page every chart is
read against. Neither is a board, both are under or beside all of them, and
their names collide with nothing.

A name is unique inside a type and not on a wire. `yearBoundary` is declared
three times on this page with three different sets of values and two different
defaults, because the pillars, 太乙 and 紫微斗數 each cut a year and disagree
about where; the types keep them apart because each board carries its own, and a
flat query string does not. Written bare, `?yearBoundary=chunjie` would mean two
things on two pages, and the setup a reader carries from one section to the next
would write one board's answer into another's.

**Where the board is already named, the prefix is not.** A CLI command lays one
board and an MCP tool answers for one, so `shipan ziwei --year-boundary lichun`
and a `compute_ziwei` argument are unambiguous by construction; it is the query
string, and every address built from one, where all the boards share a
namespace. `apps/web/src/lib/parameters.ts` is the one place the naming is
written, `wire` and `named` are how it is asked for, and
`apps/web/test/parameters.test.ts` holds the client's copy of these rows to the
engine's declaration.

It also makes the carrying derivable rather than listed: a parameter prefixed
with a board is dropped when the reader leaves that board, and nothing has to
remember which ones those were.

## The derived constraint

**No function in `core` reads a global default.** Options arrive as arguments,
and a chart carries them in its own output. A saved chart must reproduce
identically.

## This page is checked against the engine

Every parameter above is declared as data in `packages/core/src/parameters.ts`
— its values, which of them the engine computes, and what it assumes when
nobody says — and the refusals inside the engine read that declaration instead
of restating it. `packages/core/test/parameters.test.ts` holds this page to
it: a row whose values or whose default have drifted from the code fails that
suite, and a parameter added to an input type without an entry does not
compile.

What lives here and cannot live there is the argument — why a divergence
exists, what the schools disagree about, and which of them a value names. What
lives there and is deliberately not written here is **which values are
implemented**, because that is the one fact on this page that moves.
