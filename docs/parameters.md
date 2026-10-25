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

**Two works are not two copies.** Where 《太乙金鏡式經》 and 太乙's 《統宗》
part, somebody casts by each, and the divergence owes what any other does. The
test is the one above and it is applied to the witnesses as they are: one text
in two states, or two texts.

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
it. `TODO.md` § 1 carries what that costs today.

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
alternatives declared and refused. What it found is in `TODO.md` § 1.

## What a school value must show

The three questions say *whether* a divergence owes a value. This says what has
to be true before one can be declared.

**A value named for a school claims attribution, not doctrine.** It does not
assert that the school is right; it asserts that this is what the school
teaches and that the engine transcribes it. That claim fails in two ways only,
the lineage misnamed and the table miscopied, and neither wants a second
tradition to catch it — so two agreeing witnesses are a check on a
transcription and never the condition for a value. `docs/sources.md` § "What a
value named for a school must show" states what the shelf owes one, what makes
a text a line's witness whatever its age, and the three states a divergence
can be in; `docs/notes.md` says why attribution is not a rung.

**A value is named for the rule it follows**, or for a work where the work is
the method. Who holds it is the entry's business and not the name's, because
a second line found holding the same reading must not find it already named
for the first. The warning two sections down stands: before a name is fixed,
the entry says whether the rule sits inside a method or is the boundary
between two.

**Who holds a value is declared beside it, and is a list.**
`packages/core/src/witnesses.ts` registers the texts — a work handed down, a
line's modern manual, or the engine's own construction, which is the honest
name for a value no text lays — and each value in
`packages/core/src/parameters.ts` names the ones that hold it. A value with no
list is *not yet attributed*, which is a state and not a blank: it is what a
default laid by convention is until somebody reads whose it is.

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

**A default is a convention and not the reading the art hands down.** It says
what an address answers when it names nothing, and it stays where it is so
that a saved address goes on answering the same. It claims no priority for
its line, and a value does not become the default by being better attested.

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
four sets of radios in front of somebody who came to ask a question would be
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
second one, which is `TODO.md` § 1's business.

**And the board says who lays the combination it stands on.** Axes are
independent in the engine and lines hold them together, so every parameter
added multiplies the boards no text ever laid, and such a board looks exactly
like one a school teaches. `combinationOf` in
`packages/core/src/parameters.ts` reads the answer off the declaration: every
parameter of the board counts, a single-valued one included, and the layers
under the board do not. Three answers — one text holds every value in force;
each has a text and none holds them all, so the combination is the engine's;
or a value is a convention with no text named for it yet, in which case what
holds all the others is said beside it. It closes the block of schools in a
transcript, in a prompt's fence and on a drawing, and travels as `laidBy`
*beside* the board over REST: it is a statement about the shelf, and a saved
board must not move when a text is read. It is never a refusal and never a
verdict on the board.

**Each board carries its own input type. None inherits a default from
dunjia's.**

## The Qi Men chart

| Parameter | Values | Default |
|---|---|---|
| `method` | `chaibu` (拆補 chāibǔ), `zhirun` (置閏 zhìrùn), `maoshan` (茅山 máoshān) | `chaibu` |
| `plate` | `zhuan` (轉盤 zhuànpán), `fei` (飛盤 fēipán), `xingfei` (星飛門轉 xīngfēiménzhuàn — the stars and the 儀 flown, the gates turned) | `zhuan` |
| `centreLodging` | where the centre is read: `kun` (寄坤二 always), `dun` (陽遁寄二 · 陰遁寄八), `dunni` (陽遁寄八 · 陰遁寄二), `bajie` (八節 bājié — through all eight palaces, three terms to each), `siyu` (四隅 sìyú — through the four corners, six terms to each) | `kun` |
| `earthPlate` | how often the earth plate is laid: `yuan` (元 yuán — once for sixty hours), `xun` (旬 xún — anew at every decade, 六戊還原) | `yuan` |
| `system` | which family, each a board of its own: `shijia` (時家 shíjiā), `rijia` (日家 rìjiā), later `yuejia` (月家 yuèjiā), `nianjia` (年家 niánjiā) | `shijia` |
| `dayGates` | how the seven other gates follow 休門 on a day board — under `system: rijia`: `fei` (飛 fēi — flown through the eight in the order of their numbers), `zhuan` (轉 zhuàn — turned round the eight, the way changing with the day's stem), `shun` (順 shùn — turned round the eight with the sun every day, as 《寶鏡圖》 lays them) | `fei` |
| `dayDun` | where a day board's year divides — under `system: rijia`: `solstice` (二至 èrzhì), `liushi` (六十日一局 liùshírìyījú — sixty days to a 局), `yang` (陽遁 yángdùn — not at all, every day laid as yang, as 《寶鏡圖》 prints its sixty) | `solstice` |
| `spirits` | what names the middle pair: `dun` (陰陽異名 yīnyángyìmíng — the half of the year), `fixed` (the eight stand in both dun), `baihu` (白虎 báihǔ at the fifth seat), `huwu` (虎武 hǔwǔ — 白虎 fifth and 玄武 sixth in both dun, as 《御定奇門大全》's hour tables name them) | `dun` |
| `spiritSeat` | where the first spirit is seated, which the other seven follow round: `tianpan` (天盤 tiānpán — where the heaven-plate 值符 lands, at every hour, as 《御定奇門大全》's hour tables lay it), `yinshi` (陰時 yīnshí — from the earth-plate 值符 at a 己 to 癸 hour, and whenever the 值符 lands in the centre, as the 奇門秘訣's commentary has it) | `tianpan` |
| `spiritPhase` | whether the eight spirits have a phase, which only a lens reads — no seat or name moves: `none` (the spirits stand in no relation, as 幺學聲's 《奇門遁甲現代應用技術》 teaches), `branch` (所屬 suǒshǔ — each the phase of the branch or trigram it is identified with, as the 奇門秘訣 lists them), `huaqi` (化氣 huàqì — the 秘笈大全's 九神主論章, which makes 值符 fire and 螣蛇 earth and agrees on the other eight) | `branch` |
| `leap` | where 置閏 repeats its block — inside 置閏: `solstice` (芒種 or 大雪), `runyue` (閏月 rùnyuè, the term the year's leap month falls under) | `solstice` |
| `strengths` | what 旺相休囚死 are read from: `season`, `star` | `season` |
| `earth` | where earth's season begins: `quarters` (the four closing months entire), `eighteen` (their last eighteen days, as 《大六壬精解》 states of the phases) | `quarters` |
| `centreTravel` | where the 值符 zhífú and the 值使 zhíshǐ are read when the count puts them on the centre: `stay` (lodged out to 坤, as 《御定奇門寶鑑》 has it), `travel` (in the fifth palace, as 《奇門遁甲金鏡寶鑑》 has it) | `stay` |
| `centreStem` | where the centre's stem stands on the heaven plate once the plate has turned, on the turned plate only: `centre` (in the fifth palace), `host` (with the stem of the palace the centre lodges in, wherever that stem goes, as 《御定奇門大全》's hour tables read it) | `centre` |
| `dingTomb` | the palace 丁 is buried in, for 入墓: `gen` (艮 gèn, as 《奇門遁甲統宗》 has it), `qian` (乾 qián, with 丙, as 《遁甲符應經》 and 《奇門遁甲金鏡寶鑑》 have it) | `gen` |
| `yiTomb` | the palace 乙 is buried in, for 入墓: `kun` (坤 kūn, as 《奇門遁甲統宗》, 《遁甲符應經》, 《吉凶格解》 and 《奇門遁甲金鏡寶鑑》 have it), `qian` (乾 qián, with 丙, as the verse in 《奇門遁甲秘笈大全》 has it and 奇門秘訣's 三璋 argues) | `kun` |
| `deshi` | what makes a 奇 得使: `liuyi` (六儀 liùyí — over the 儀 of one of its two decades, as 《奇門遁甲統宗》's 四十格, 《遁甲符應經》, 《遁甲演義》 and 《吉凶格解》 pair them), `zhishi` (值使 zhíshǐ — in the palace of the 值使 gate, as 《奇門遁甲開悟之門》 has it) | `liuyi` |
| `menpo` | which relation of a gate to its palace is named 門迫: `menzhigong` (門制宮 ménzhìgōng — the gate controlling its palace, as 《奇門遁甲統宗》 and 《遁甲符應經》's cells have it), `gongzhimen` (宮制門 gōngzhìmén — the palace controlling its gate, as 《吉凶格解》 has it, which marks the converse 宮迫) | `menzhigong` |
| `stemPairs` | which table of 十干克應 names a stem over the stem below: `shared` (the sixteen cells two lines name alike, a convention with no holder), `jinhan` (金函 jīnhán — 《金函玉鏡》卷二's table, eighty of its eighty-one cells, with its fortune only where it states one outright), `xianji` (仙機 xiānjī — 《奇門仙機》's 干論, the seventy-seven cells its print names, with no fortune of its own). It moves marks and no plate | `shared` |

`method` is the most divisive parameter in the engine and it is not optional.
All three values are computed, and 拆補 and 茅山 — which read the same term and
part only over where the yuan is taken from — disagree about three hours in
five.

**There was a `yuan` beside it, and it was a method wearing another name.** It
offered `term`, cutting the term into three fives from the instant it began,
as a divergence *inside* 拆補; `term` was the default. It is not inside 拆補: it
is 茅山, and 拆補 is what stops being itself the moment the 符頭 goes unread —
劉文元 parts the two on that point and no other, 唐頤 says the method
「打破了根據日干支符頭確定三元的規律」, and 神奇之門 defines 拆補 by both
conditions at once, the three yuan inside the term *and* the 甲己 cycle. A 拆補
with no 符頭 has nothing to split and nothing to patch. So the seam was a
method boundary, the two values are two methods, and the parameter is gone
rather than kept as a second way of saying `method`: an address carrying
`qimen.yuan` is refused by name rather than answered under a school it did not
choose. → [`docs/history/40-the-default-was-maoshan.md`](history/40-the-default-was-maoshan.md)

**`centreLodging` has five values and two of them are reported, not held.**
Each is what one text says the lodging is, and the two that divide it by the
dun divide it the opposite way round: 《漢陰居士歌》 sends yang to 坤 and yin to
艮 as its own rule and works a board on it, which 《御定奇門寶鑑》 reports of a
variant copy; the 《元經》 the 折衷 quotes sends yang to 艮 and yin to 坤.
They were one refused value until the two quotations were set side by side;
they are two readings and two values. `earthPlate` is the 折衷's own, and with
the lodging by the eight 節 it belongs to a board that work lays whole — stars
flown, gates turned, `plate: xingfei`. Each of the three is computed, and the
line under a board laid with all of them names that work for the combination.

**`plate: xingfei` flies nine and turns eight, and the eight spirits stay a
ring of eight.** The 值符 is set on the palace of the hour's stem as on a
turning plate; the other eight stars follow it through the nine palaces in the
order of their own, forward under yang and back under yin, each carrying the
stem its own palace holds on the earth plate. Nothing lodges, so
`centreLodging` reaches the stars and the stems no longer and still says where
a gate or a spirit is read when its count falls on the centre.

**A family is a board and not a setting of the hour board.** `system: rijia`
is answered by `computeDayChart` with a type of its own: eight gates, nine
stars named from 太乙, no plate of stems, no 值符 and no spirits. It reads
`dayGates` and `dayDun` and none of the hour board's parameters, and the hour
board reads neither of those; `family` in the declaration says which is whose,
so that a board is never told of a choice it was not laid by. **A parameter of
the other family is refused, never dropped**: `refuseOtherFamily` reads what a
surface was given, not the options with their defaults filled in, and throws
`OPTION_NOT_READ` under the name it was asked by — `--method` on the command
line, `qimen.method` in an address, `method` on the MCP tool. The layers under
both are the same pillars. `dayGates` has three values because three works lay
the gates and part: the 金函玉鏡's 定局 flies them and names no half of the
year, 《日家奇門》, which says it is drawn from that work, turns them and
mirrors the count after 夏至, and 《寶鏡圖》 turns them with the sun every day
on sixty boards that have no yin half, which is `dayDun: yang`. The twelve hours it hands over are no part of the family: they
are read off the day pillar under `shensha`, and stand on this board because
every hour of the day shares it.

**年命 does not follow `earthPlate`, and that is a limit stated rather than a
choice made.** A birth in a 甲 year is looked up under the 儀 its decade pins —
甲子戊, 甲戌己 — which is 《遁甲演義》's rule and the only one this engine has
for it. On a chart laid with `earthPlate: xun` the hours conceal every 甲 under
戊, and the 折衷 says nothing of how a birth is to be placed on such a plate.
Until a text does, the 本命 on that chart is read by one work's rule on
another work's plate.

**`system` is four values because four are transmitted, not because the set is
closed.** A modern lineage on the shelf adds 分家 fēnjiā, a board of the minute;
nothing here is written as though four were the end of it, for the reason the
vernaculars are not written as two.

**And a value of it is not the hour board reground.** The three refused families
are flown where the 時家 is turned, which is why `system` and `plate` move
together — and each also carries **its own ring of nine stars**: 天蓬 through
天英 for the hour, the 太乙 nine (太乙, 攝提, 軒轅, 招搖, 天符, 青龍, 咸池,
太陰, 天乙) for the day in the witnesses that print any, the 紫白 for the year
and the month in the one exposition that tabulates them. **And the day family's
ring does not move with its gates**: the gates hold three days to a palace and
skip the centre, the nine stars take one palace a day and go through it, so one
board there is two motions. It carries layers the hour family has not, and
intercalates on a different count. The table above has one column of values and
the cost is not one column wide. →
[`docs/sources.md`](sources.md) § "What implementing a family would cost"

## The calendrical layer under every board

These three are declared in `ChartOptions` beside dunjia's own, because that
is the type a chart carries, and they are not dunjia's. They say how an
*instant* is read into pillars, and every board built on those pillars
inherits the answer: 八字 stands on these and adds one of its own,
奇門 and 六壬 are cast at an hour these decide the stem of, and a board that
read the day differently from the pillars printed beside it would be two
calendars in one output.

| Parameter | Values | Default |
|---|---|---|
| `trueSolarTime` | `true`, `false` — the one boolean here | `true` |
| `yearBoundary` | `lichun` (立春 lìchūn), `chunjie` (正月初一 zhēngyuèchūyī), `dongzhi` (冬至 dōngzhì — the year pillar alone, the month pillar staying) | `lichun` |
| `dayBoundary` | `zishi` (子時 zǐshí, 23:00 → next day), `midnight` | `zishi` |

太乙 and 紫微斗數 cut the counted year by a boundary of their own, and the
almanac takes none of these at all. Both are below.

## The other boards

| Board | Parameter | Values | Default |
|---|---|---|---|
| 六壬 | `yuejiang` | `zhongqi` (太陽過宮 at the 中氣 zhōngqì), `jieqi` (節氣 jiéqì, half a term earlier), `true` (太陽實躔 tàiyángshíchán) | `zhongqi` |
| 六壬 | `guiren` | `chou` (丑 chǒu and 未, which 甲 shares with 戊庚), `wei` (未 wèi and 丑, with 甲 standing alone) | `chou` |
| 六壬 | `zhouye` | `branch` (晝 from 卯 to 申), `solar` (actual sunrise and sunset) | `branch` |
| 曆注 | `shensha` | `xieji` (what 《協紀辨方書》 xiéjìbiànfāngshū ratifies in its 卷三 to 卷七, cut to the day and the direction, and to the twelve hours where a board is a day's), later a named lineage | `xieji` |
| 七政四餘 | `xiudu` | where the 宿 begin: `juxing` (at the 距星 jùxīng, placed at the instant), or a 曆's frame — `shixian` (時憲曆 shíxiànlì), `shoushi` (授時曆 shòushílì, carried from 1281 by that 曆's own method) | `juxing` |
| 七政四餘 | `ziqi` | whether 紫氣 enters as a fourth 餘: `yinianyisu` (一年一宿 yīniányīxiù), which places it **to a palace and to no degree**, or `off` | `yinianyisu` |
| 七政四餘 | `luohou` | which node is 羅睺: `descending` (the 星命 law), `ascending` (湯若望 and the 時憲曆) | `descending` |
| 七政四餘 | `minggong` | `yuejiang` (立命 by 加時, the hour laid on the palace of the 月將 yuèjiàng), `ascendant` (the true rising degree) | `yuejiang` |
| 七政四餘 | `gong` | where the twelve 宮 are cut: `zhongqi` (太陽過宮 at the 中氣 zhōngqì), `ci` (the 次 cì as stretches of 宿度) | `zhongqi` |
| 太乙 | `epoch` | which 上元積年 the count runs from: `jinjing` (《太乙金鏡式經》 tàiyǐjīnjìngshìjīng), `taojin` (《太乙淘金歌》 tàiyǐtáojīngē, which puts 太乙 in another palace, and refused) | `jinjing` |
| 太乙 | `ji` | which register the board is laid in: `nianji` (歲計 suìjì, which is what both witnesses call it), `yueji` (月計 yuèjì), `riji` (日計 rìjì), `shiji` (時計 shíjì) | `nianji` |
| 太乙 | `geHost` | whose bodies the condition 格 is marked for: `ke` (客 kè — the guest's eye and generals alone, as 《太乙金鏡式經》 has it), `zhuke` (主客 zhǔkè — the host's generals as well, as the 《統宗》 has it) | `ke` |
| 太乙 | `geChong` | what makes a 格: `gong` (對宮 duìgōng — the palace facing 太乙), `chong` (沖 chōng — a clash of branches as well) | `gong` |
| 太乙 | `wenchangTaiyi` | what 文昌 in 太乙's own palace is called: `qiu` (囚 qiú, the 金鏡's, and the 統宗's for 文昌 and the four generals together), `guan` (關 guān, 樂產's, and where the 統宗's own list files it), `yan` (掩 yǎn, the 統宗's under 釋掩) | `qiu` |
| 太乙 | `dayouEye` | how the eye of the 大遊 is counted before it walks from 天道: `jinjing` (元法 yuánfǎ, the 金鏡's — the 大遊's 積年 by seventy-two, then eighteen), `tongzong` (盈差 yíngchā, the 《統宗》's — the 積年 太乙 is counted on, with 216 added, by 188, then eighteen). The two agree in one year in nine, and neither work dates a seat | `jinjing` |
| 太乙 | `yearBoundary` | where the counted year begins: `lichun` (立春 lìchūn, a convention with no text behind it), `dongzhi` (冬至 dōngzhì, the 《統宗》's: its year runs from one winter solstice to the next), `chunjie` (正月初一 zhēngyuèchūyī, refused). A board laid on a named year is the same under any; the value decides which year an instant falls in | `lichun` |
| 紫微斗數 | `leapMonth` | what a birth in an intercalary month counts as: `following` (the month after it, which is the book's), `current`, `split` | `following` |
| 紫微斗數 | `sihua` | which table of the 四化: `quanshu` (《紫微斗數全書》 zǐwēidǒushùquánshū's own), `zuofu` (左輔 zuǒfǔ — that table with 壬's 科 moved, as two modern schools read it), `tianxiang` (天相 tiānxiàng — that table with 庚's 忌 moved, as the 占驗派 reads it) | `quanshu` |
| 紫微斗數 | `huoling` | how 火星 and 鈴星 are placed: `fixed` (a seat apiece from the year's triplicity, which is all 卷二 states), `hour` (counted on from those seats to the hour of birth, as a manual of 1986 prints it) | `fixed` |
| 紫微斗數 | `daxian` | where the first decade opens: `adjacent` (the palace beside the 命宮, which is the book's), `ming` (命宮 mìnggōng itself, as 《紫微斗數捷覽》 zǐwēidǒushùjiélǎn works it) | `adjacent` |
| 紫微斗數 | `yearBoundary` | which reckoning gives the year its stem and branch: `lichun` (立春 lìchūn), `chunjie` (正月初一 zhēngyuèchūyī) | `chunjie` |
| 八字 | `luckGranularity` | how finely the distance to the 節 is measured when the 大運 are placed: `shichen` (時辰 shíchén, whole days and whole double hours), `minute` | `shichen` |
| 年命 | `count` | how the years lived are counted: `sui` (虛歲 xūsuì), `turns` (the turns of the year pillar alone) | `sui` |

**八字's one row is the board's own, and the three above it are not.** The
pillars' `trueSolarTime`, `yearBoundary` and `dayBoundary` say how an instant
is read into the four, and this says how the distance to the 節 is counted when
the decades are placed — three days of the calendar to a year lived, and the
two readings part on where to stop, by up to ten days on when the first cycle
opens. It was on `BaziOptions` with a declared default and both readings
computed long before it was here; what it was missing is the third of the three
questions, which is the easy one to fail.

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

**奇門 owes five and they were paid together.** `spirits`, `leap`, `strengths`,
`earth` and `centreTravel` were divergences the engine decided in silence: the
naming of the middle pair, where 置閏 repeats its block, what the five states
are read from, where earth's season begins, and where the 值符 and the 值使 are
read when the count puts them on the centre. Four of them want a field in this
board's input type, which is the breaking change this page opens by saying not
to make late — so they were made in one movement rather than one at a time,
each shipping with what the engine already computed and the other side declared
and refused by name. Two of them — the states and the earth — reach every cell
of the answer, which is why they were the most expensive to leave unsaid.
`centreTravel` was expected to be a third and is not: it moves two palace
numbers and no cell, which is the finding of
`docs/history/37-the-pair-and-the-plate.md`.

**`sihua` is the first value declared under the standard rather than under a
reading of it.** What the shelf carries is one cell: 《紫微斗數全書》 gives 壬 its
科 to 天府 in both editions and the Ming recension agrees, where the 中州派
manual prints 左輔 and a 北派 manual draws 左輔 twice in worked examples, one of
them decidable on that reading alone. A lineage's whole ten stems was being
asked for, and that is a completeness test rather than the one this page
states: the board changes, two practitioners hold opposite sides, and the size
of the disagreement is not a question. **It is named for the cell and not for
either school**, because two of them hold it and neither's table is here.

`futou` used to be cited here as the precedent for that — a value named for
the rule rather than for a school. It is a precedent for the opposite lesson
and is kept as one: naming a value after the rule that parts two schools is
how a school comes to be filed as a divergence inside another, which is what
happened to 茅山 and lasted a phase. Where the rule *is* the boundary, the
value belongs to `method`.

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

**Where the board is already named, the prefix is not — and what the naming
settles is which board, not which bag.** A CLI command lays one board and an
MCP tool answers for one, so nothing there has to say whose a `sihua` or a
`guiren` is; it is the query string, and every address built from one, where
all the boards share a namespace.

**A layer stands under the board wherever the board is, so naming the board
settles nothing between the two.** `shipan ziwei` carries a `yearBoundary`
twice over — the pillars are read into an instant before that board counts
anything off them — and one of the two can have the bare name. The layer keeps
it, on every surface, because a layer is under all of them and collides with
nothing; **a board's parameter that shares a name with a layer's takes its
board's name everywhere**: `ziwei.yearBoundary` in an address,
`--ziwei-year-boundary` at a command, `ziwei_year_boundary` at a tool. Two rows
answer to this: 紫微斗數's and 太乙's, which is `taiyi.yearBoundary`,
`--taiyi-year-boundary` and `taiyi_year_boundary`.

**On the command line the flag is derived from the declaration** — `flagOf` in
`packages/core/src/cli.ts` — by this same rule, so no divergence is named there
by hand: `--centre-lodging`, `--guiren`, `--year-boundary` for the layer and
`--ziwei-year-boundary` for the board. One name is kept: 年命's `count` is
asked for as `--years`, after what it counts.

`apps/web/src/lib/parameters.ts` is the one place the naming is
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
