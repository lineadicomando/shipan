# Common foundations — the calendar, the vocabulary, the 式, the shelf

What every art this engine lays stands on, written once so that the files for
each art need not repeat it. Researched 2026-10-23.

**What this file is not.** It is not the register. `docs/sources.md` says what
the project has established on the plate and at which rung; `docs/parameters.md`
and `packages/core/src/parameters.ts` say which divergences are modelled and who
holds each value; `CLAUDE.md` holds the rules. This file points at all four and
restates none of them. What it adds is the background a practitioner would bring
and the leads a researcher would follow. A passage marked *(web transcription)*
is a finding aid and nothing more: it says where to look, and nothing in it
moves a rung. Where this file and the register disagree, the register stands
and the disagreement is listed in § 7.

Marks: ★ is on this project's shelf (`texts/README.md`), ☆ is wanted and not
held (`TODO.md` § 2). The transcribed corpus `texts/rules/CAL-01` to `CAL-13`
(in Italian, imported 2026-08-31) is the project's own finding aid for most of
§§ 1–2, and is cited by rule number.

---

## 1. The calendrical layer

### 1.1 The sexagenary cycle — 干支 gānzhī

- **十天干 shítiāngān**, the ten stems: 甲 jiǎ 乙 yǐ 丙 bǐng 丁 dīng 戊 wù 己 jǐ 庚 gēng 辛 xīn 壬 rén 癸 guǐ. Odd places are 陽 yáng, even 陰 yīn; in pairs they are 木 mù, 火 huǒ, 土 tǔ, 金 jīn, 水 shuǐ.
- **十二地支 shí'èrdìzhī**, the twelve branches: 子 zǐ 丑 chǒu 寅 yín 卯 mǎo 辰 chén 巳 sì 午 wǔ 未 wèi 申 shēn 酉 yǒu 戌 xū 亥 hài.
- **六十甲子 liùshíjiǎzǐ**: stem and branch advance together, so only same-parity pairs occur, and the cycle closes at sixty. It splits into six **旬 xún** of ten, each headed by a 甲 (甲子, 甲戌, 甲申, 甲午, 甲辰, 甲寅). Each 旬 leaves two branches out, and those two are its **空亡 kōngwáng** (§ 2.8). In 奇門 the six 甲 hide under the six 儀 (戊己庚辛壬癸) — 遁甲 dùnjiǎ is that hiding — and that is why the 旬 is load-bearing in that art.

**Days.** The day count runs without a break and is a function of the Julian
Day. Its phase is anchored twice on the shelf: GB/T 33661-2017 §6.3.2 sets
1949-10-01 as 甲子日 in normative form ★, and 盧央 《中國古代星占學》 p. 668 ★
dates five days of 1996 inside a worked 超神接氣 example. The two agree
(`texts/rules/CAL-01`). The continuity of the count back through the
Han is a historical thesis: it is usually dated to the 春秋 day records from
魯隱公三年 (720 BCE). The project accepts it and has not re-verified it.

**Years.** Naming years by 干支 continuously is generally dated from 東漢
元和二年 (85 CE), when the 四分曆 was adopted. Before that, years were reckoned
by 歲星 Jupiter and 太歲 tàisuì, with jumps (超辰 chāochén). A 干支 year
earlier than that is a back-projection, which matters to 太乙, where the
上元積年 is counted from an epoch thousands of years back.

**Months.** The branch of a month is fixed: 寅 for the first month, 建寅
jiànyín. Its stem comes from the year stem by the **五虎遁 wǔhǔdùn**:
「甲己之年丙作首，乙庚之歲戊為頭，丙辛之歲尋庚上，丁壬壬位順行流，若言戊癸何方發，甲寅之上好追求」
(評註淵海子平 卷一, 故宮珍本叢刊 vol. 422 ★, `CAL-04`, which notes metrical
variants in lines 3 and 5). In 八字 bāzì and on the engine's month pillar, a
month starts at a 節 (§ 1.2), not at a new moon.

**Hours.** There are twelve double hours, the 時辰 shíchén, with 子 from 23:00
to 01:00 local time. The stem comes from the day stem by the **五鼠遁 wǔshǔdùn**:
「甲己還加甲，乙庚丙作初，丙辛從戊起，丁壬庚子居，戊癸何方發，壬子是真途」
(`CAL-05`). 盧央 p. 24 dates hours named by 干支 to 「唐代星命家之言」. Twelve
branch-named hours are attested from about the 南齊 (《南齊書·天文志》). Earlier
hour systems, such as the sixteen-part day of the Qin daybooks, are another
matter (Harper & Kalinowski 2017).

The five-step rule behind 五虎遁, 五鼠遁, the 五合 of the stems and the 歲德
family is a single generator; `texts/rules/synonyms.json` calls it `piu-cinque`.

### 1.2 The twenty-four terms — 二十四節氣 èrshísì jiéqì

A term is the instant the Sun's apparent ecliptic longitude crosses a multiple
of 15°. It is an instant and not a day, so two births on the same civil day
can fall in different months and different years.

| λ☉ | 節 jié (opens a month) | month branch | λ☉ | 中氣 zhōngqì | 六壬 月將 after it |
|---|---|---|---|---|---|
| 315 | 立春 lìchūn | 寅 | 330 | 雨水 yǔshuǐ | 亥 登明 |
| 345 | 驚蟄 jīngzhé | 卯 | 0 | 春分 chūnfēn | 戌 河魁 |
| 15 | 清明 qīngmíng | 辰 | 30 | 穀雨 gǔyǔ | 酉 從魁 |
| 45 | 立夏 lìxià | 巳 | 60 | 小滿 xiǎomǎn | 申 傳送 |
| 75 | 芒種 mángzhòng | 午 | 90 | 夏至 xiàzhì | 未 小吉 |
| 105 | 小暑 xiǎoshǔ | 未 | 120 | 大暑 dàshǔ | 午 勝光 |
| 135 | 立秋 lìqiū | 申 | 150 | 處暑 chǔshǔ | 巳 太乙 |
| 165 | 白露 báilù | 酉 | 180 | 秋分 qiūfēn | 辰 天罡 |
| 195 | 寒露 hánlù | 戌 | 210 | 霜降 shuāngjiàng | 卯 太衝 |
| 225 | 立冬 lìdōng | 亥 | 240 | 小雪 xiǎoxuě | 寅 功曹 |
| 255 | 大雪 dàxuě | 子 | 270 | 冬至 dōngzhì | 丑 大吉 |
| 285 | 小寒 xiǎohán | 丑 | 300 | 大寒 dàhán | 子 神后 |

The 月將 column follows 《大六壬精解》 p. 4 ★ (`CAL-02`). Note that 太乙
names a 月將 here and is also the name of a 式: one name, two objects.

**節 and 中氣 serve different arts.** The 節 opens the month pillar (八字, and
every board's month stem) and starts the luck-cycle count (大運 dàyùn). The
中氣 decides the lunar leap month (§ 1.3), the 太陽過宮 that turns 六壬's 月將
(`liuren.yuejiang: zhongqi`, with `jieqi` and `true` as the alternatives) and
the cut of 七政四餘's twelve 宮 (`qizheng.gong: zhongqi`). 奇門 reads all
twenty-four. Each term has three 候 hòu of five days, which are 奇門's 上中下元
(《煙波釣叟奇門定局》 p. 340 ★ writes 上候 中候 下候, `CAL-02`).

**定氣 dìngqì against 平氣 píngqì.** 平氣, also called 恆氣, divides the
tropical year into twenty-four equal spans of about 15.22 days each. 定氣
places each term at the Sun's true longitude, so the spans run from about
14.7 days near perihelion to about 15.7 near aphelion. Astronomers had known
the Sun's unequal motion since 張子信 (Northern Qi) and 劉焯 (皇極曆, 600),
but the published almanacs kept 平氣 terms until the **時憲曆 shíxiànlì of
1645** (順治二年), which 湯若望 Adam Schall built from the 崇禎曆書. Every
almanac since uses 定氣 (zdic, *web*; Needham vol. 3; 陳遵媯). The two
reckonings can put a term as much as two days apart. **The engine uses 定氣
for every date** (`ephemeris.ts`, `solar-terms.ts`). For a Ming or earlier
birth, then, its terms are not the ones the almanac of that time printed (§ 6).

**What the engine computes.** Swiss Ephemeris, or Moshier as the fallback,
gives the apparent longitude, and a solver finds each crossing.
`docs/sources.md` § "Tier 1" records the check against `lunar-javascript`
over 1902–2098. GB/T 33661-2017 table A.1 and §3.14 give the same definition
in normative form ★.

### 1.3 The lunisolar calendar — 農曆 nónglì

The project's source is GB/T 33661-2017 《農曆的編算和頒行》 ★, §4
(transcribed in `CAL-07`):

1. Beijing time, 東經120° (§4.1, and §3.16 for the meridian).
2. The day of the true new moon (朔 shuò) is the first of the month.
3. The month containing 冬至 is the eleventh.
4. If there are thirteen new moons from one eleventh month up to the next, one month is intercalary (閏月 rùnyuè): **the first** month in that span with no 中氣. The popular wording, «the month with no 中氣», is too loose. When two months in the span lack a 中氣, it intercalates the wrong one and gives no sign of the error.
5. The year begins at the second month after the eleventh, leap months not counted.

`lunar.ts` implements exactly these rules, rule 4 included.

**Reckoned on 120°E, and why that is a rule** (CLAUDE.md, and the comment on
`CALENDAR_OFFSET_DAYS` in `lunar.ts`). The same instant has the same lunar
date in Rome and in Beijing, and China's wartime clocks (1942–45) and summer
time (1986–91) do not move it. `docs/sources.md` § 紫微斗數 records what this
costs: a birth at 00:30 on a Chinese summer-time clock falls on the previous
day at 120°E. `iztro` and `lunar-typescript` take the civil date there, so they
disagree with the engine on DST-era births.

**The meridian has a history.** The 時憲曆 was computed for Beijing. From 1914
to 1928 the calendar used Beijing mean solar time (116°25′E, UTC+7:45:40), and
only from 1929 did it use 120°E (IANA tz list, 2018, and the
`calendrical_calculations` crate's `UTC_OFFSET_PRE_1929`, both *web*). A new
moon in the 15 minutes either side of midnight therefore falls on different
days under the two meridians. Before 1929, the engine's 120°E months can
differ by a day from the almanac that was actually printed (§ 6).

**Leap-month checks worth knowing.** Under the 1645 rules, a leap eleventh
month is rare. **2033** is the known test case. The traditional
almanac-makers' rules put the leap after the seventh month; the GB/T rules put
it after the eleventh (Aslaksen, *The Mathematics of the Chinese Calendar*,
*web*). The engine gives **閏十一月** for 2033: on 2033-12-25 it returns «leap
month 11/4», checked 2026-10-23 through the `lunar_date` tool. That agrees with
the standard. Taiwanese, Hong Kong and folk almanacs for 2033 may print
otherwise, and a practitioner's software may follow them.

**How a leap month counts on a board.** The pillars never see it: months are
cut by 節. It matters only where a board takes the lunar month as input.
`ziwei.leapMonth` names three readings: `following` (《紫微斗數全書》 卷二
「若閏月正月生者要在二月內起安身命，凡有閏月具要依此為例」 ★), `current`, and
`split`, which divides the month at its fifteenth day as `iztro` and many modern
manuals do. 奇門's `qimen.leap: runyue` uses the leap month for something
else: where 置閏 repeats its block.

### 1.4 The boundaries every art has to choose

These boundaries are where schools disagree and almanacs do not. The engine
reads them as the layer parameters `yearBoundary`, `dayBoundary` and
`trueSolarTime`, which travel bare. Boards that cut a year of their own carry
the board prefix: `ziwei.yearBoundary`, `taiyi.yearBoundary`. See
`docs/parameters.md` § "The calendrical layer under every board" and
§ "A board's parameters travel under the board's name".

#### The year: 立春, 春節, or 冬至

**Background.** Classical China knew three year-heads, the 三正 sānzhèng:
周正 建子 (the 冬至 month), 殷正 建丑 and 夏正 建寅. The 太初曆 of 104 BCE
settled on 夏正, so the civil year starts near 立春. The *astronomical*
epoch, though, was always 冬至: the 曆元 is 「甲子夜半朔旦冬至」, and 太乙's
上元積年 is counted to it. So each of the three heads has a real lineage
behind it.

| Value | Who holds it | Where it applies |
|---|---|---|
| `lichun` — at the instant λ☉ = 315° | Every almanac that prints four pillars (`docs/parameters.md`); 洪丕謨 《中國古代算命術》 p. 59 ★ explicitly: 「推年不管用什么方法，都必須嚴格劃定以農曆的立春作為一年的界限」, with both directions worked (`CAL-03`). The register still lists it as *unattributed*; see § 7 | the pillars' default |
| `chunjie` — at 正月初一 | The civil convention: GB/T 33661 §6.1.1 ties the year's 干支 to the 農曆年 (1984-02-02 to 1985-02-19 is 甲子年) ★, `CAL-03`; and the reckoning that fits a board counted on lunar months | `ziwei.yearBoundary` defaults to it, and `docs/parameters.md` § "Rows that are not like the others" argues why |
| `dongzhi` — at the winter solstice | 《命理新論》 第九章 ★, with a worked chart: the year pillar alone moves and the month pillar stays (`docs/sources.md` § Tier 1). For 太乙, 《太乙數統宗大全》 counts its year from one 冬至 to the next (`taiyi.yearBoundary: dongzhi`) | pillars and 太乙 |

A warning from the register applies here. 《命理新論》 says spring opens at
立春 「命理學向來…均是以立春為春首」 and then turns the year at 冬至, so a
sentence about the *season* is not a sentence about the *year*.

The two-way error the 算命術 spells out is the most common wrong chart. A
birth in 正月 before 立春 belongs to the previous year, and a birth in 臘月
after 立春 belongs to the next. A program that takes the year from the lunar
new year gets both wrong.

#### The month: 節, lunar month, or 中氣

This divergence is between arts, not schools. The engine models each one where
it lives.

- **八字 and every month pillar**: 節 to 節. No school on the shelf disputes it.
- **紫微斗數 zǐwēidǒushù**: the lunar month, with `ziwei.leapMonth`.
- **六壬 月將**: the 中氣 (`liuren.yuejiang`). **七政四餘's 宮**: the 中氣 or the 次 (`qizheng.gong`). The register records a third reading with no parameter: 《三命通會》's 論坐命宮 lays the hour on the *month's* palace, which agrees with laying it on the Sun's palace for the first half of each month only (`docs/sources.md` § Tier 1, last paragraphs).
- **奇門**: the term and its three 元. That is not a boundary choice; `qimen.method` settles it.

#### The day: 子初 (23:00) or midnight — 早子時 zǎozǐshí and 晚子時 wǎnzǐshí

| Value | What it does | Who holds it |
|---|---|---|
| `zishi` | The day pillar turns at 23:00 local, the start of the 子 hour. The whole 子 hour belongs to the coming day | The register lists it as *unattributed*. 盧央 pp. 23–24 ★ works six days in a row with the 干支 day turning at 23:00 (`CAL-06`); § 7. Most modern Taiwanese and mainland 子平 practice (*web*, unweighed) |
| `midnight` | The day turns at 00:00. From 23:00 to 24:00 is the **夜子 yèzǐ** (晚子): its day pillar is the day that is ending, and its hour stem is read from the coming day. From 00:00 to 01:00 is the **早子** | 《命理新論》 第九章 ★: 「早子應用本日子時的天干，夜子應用明日子時的天干…以半夜正子…為前後兩日的交換點」, with worked charts for both halves. The engine's `midnight` computes the hour stem exactly this way |

**Older evidence, unweighed.** The calendar's own day, as opposed to the 干支
day of a 命 chart, has begun at **midnight** since at least the Tang. 李淳風's
memorial of 貞觀十四年 (640) states 「古曆分日，起於子半」 (新唐書 卷25 曆志,
資治通鑑 卷195, and some twenty other places on zh.wikisource, *web*). The
曆元 formula 「夜半朔旦冬至」 says the same. A Joseon record of 正祖二十四年
(1800) notes that the Qing almanac put 霜降 on 九月初六 at 夜子時 while the
Korean one put it on 初七 at 子正. That is the Qing official day ending at
子正 (Daum café transcription of 《正祖實錄》, *web*). 王逵 《蠡海集》 (Ming,
四庫 子部雜家類) is quoted online as giving the 子初 half to yesterday and the
子正 half to today, but only in a modern paraphrase (*web*). 沈義方 《星平大成》
☆ is what 《命理新論》 itself quotes for 夜子 「今日之夜」. Princeton's Gest
library holds a 康熙 懷德堂 print in seven 卷 (catalogue, *web*). None of this
is a 子平 witness for the *day pillar* yet. That the almanac's day began at
midnight is a fact about the 曆. Whether a 命 practitioner turns the pillar
there is the question, and it is a separate one.

`docs/sources.md` notes that the two values agree on the hour stem's
derivation in the 早子 half and part only in the 夜子. 《命理新論》's 夜子
chart (丁亥 甲辰 甲寅 丙子) is the case that tells them apart.

#### The hour: clock time or true solar time — 真太陽時 zhēntàiyángshí

| Value | What it does | Who holds it |
|---|---|---|
| `true` | Clock time → local mean time (four minutes per degree from the zone meridian) → apparent solar time (equation of time, up to about 16 minutes either way) | 《命理新論》 第五章 and 第九章 ★: 「定時應以出生地點的真正太陽時為準」, worked in three steps for 臺北 under summer time. `docs/sources.md` § Tier 1 |
| `false` | The clock time as read | Not yet attributed. Much almanac 擇日 practice works by the printed hour (*unweighed*) |

`true-solar.ts` applies the correction. Across China's single zone it can
exceed an hour, which is the half-width of a 時辰. China's five zones before
1949 (中原 120°, 隴蜀 105°, 新藏 90°, 崑崙 82.5°, 長白 127.5°) are a separate
matter: they are civil time, and the tz database handles them through the
location's zone. `docs/agent-prompt.md` tells a caller never to convert by
hand, and IANA's merging of pre-1970 Chinese zones is a trap for anyone who
does (§ 5, item 3).

**Two units that mislead a reader of old texts.** Before 1670 the day had 100
**刻 kè**, so a 時辰 held 8⅓ 刻 and the text writes 「時有八刻」 (三命通會).
From 康熙九年 (1670) it had 96, eight 刻 to a 時辰. And 子初 and 子正 name the
two halves of the 子 hour, not two hours.

#### The luck cycle and the age

`bazi.luckGranularity` (`shichen`, held by 《三命通會》 論大運 ★, which counts
three days of the calendar to a year of life; `minute`, not yet attributed) and
年命's `count` (`sui`, held by 《遁甲演義》; `turns`) are the remaining cuts.
`docs/sources.md` § Tier 1 gives the argument for each.

---

## 2. The cosmological vocabulary

Each term is defined once here, with the places where the arts use it
differently. `texts/rules/synonyms.json` tells *synonyms* (one object, several
names) from *homonyms* (one name, several objects), and the homonyms are the
dangerous ones.

### 2.1 陰陽 yīnyáng

The stems alternate yang and yin. For the **branches** there are three
divisions, and 《滴天髓闡微》 卷一 ★ names all three (`CAL-09`):

- by the solstices: 子 to 巳 yang, 午 to 亥 yin;
- by element: 寅 to 未 yang, 申 to 丑 yin;
- by the 命家's parity: 子寅辰午申戌 yang.

The engine uses the third. The text also distinguishes 體 tǐ from 用 yòng:
「子從癸…是體陽而用陰也」. A branch's own parity and that of its main hidden
stem are two fields. 遁甲 also divides the year into 陽遁 (冬至 to 夏至) and
陰遁, which is yinyang applied to the year, not to a sign.

### 2.2 五行 wǔxíng and their cycles

- **相生 xiāngshēng**, generation: 木→火→土→金→水→木. **相剋 xiāngkè**, control: 木→土→水→火→金→木. 《大六壬精解》 p. 3 ★ gives the minimal form: 生 to the next, 剋 skipping one.
- **六親 liùqīn**, the kin roles from the day stem's element and parity: 父母 (what generates me), 子孫 (what I generate), 官鬼 (what controls me), 妻財 (what I control), 兄弟 (same element). 八字's 十神 shíshén split each of these by parity.
- **The count, and the rule against weighing it.** CLAUDE.md: the elements arrive counted, zeroes included, and strong or weak is a method step. See `docs/sources.md` § "五行 of the eight characters" and `docs/refusals.md` § "A strong or weak day master".

### 2.3 旺相休囚死 wàng xiàng xiū qiú sǐ, and the competing tables

**The common rule** is 「當令的旺，我生的相，生我的休，克我的囚，我克的死」
(洪丕謨 pp. 43–44 ★, `CAL-08`). The reason behind each name is a kinship
relation (盧央 pp. 61–62 ★).

**Where the texts part:**

| Question | Readings | Engine |
|---|---|---|
| When earth rules | 《五行大義》 卷二 論四時休王: 「凡五行之王，各七十二日，土居四季，季十八日」, yet its table names only 「六月則土王」 and says positions are fixed 「皆以季夏六月爲土王之時」 (zh.wikisource, *web*). So one work gives three answers: the last 18 days of each season; the whole of 季夏; the four closing months (辰未戌丑) entire | `qimen.earth`: `quarters` (the four closing months) or `eighteen` (held by 《大六壬精解》) |
| What the states are read from | The month's season, or the star or palace | `qimen.strengths`: `season`, or `star`, which is refused and held by 《金函玉鏡》寶鑑 |
| Five states or eight | 《五行大義》's **八卦休王**, from 立春: 「艮王，震相，巽胎，離没，坤死，兌囚，乾廢，坎休」. Eight states of 45 days each, rotating one trigram per 節 (*web*; 盧央 pp. 61–62 ★, `CAL-08`). This grid does not overlay the five-state one: 45 days against 72 | not modelled |
| Stems and branches | 《五行大義》's 支干休王 runs parallel to the element table: in spring 「甲乙寅卯王…戊己辰戌丑未死」 | follows from the element |

Older names exist as well. 《淮南子》 uses 壯 老 生 囚 死 and 《白虎通》 uses 王
相 休 囚 死 (secondary report, *web*). A modern manual's «table of seasonal
strength» is one of these, and a consultant should say which.

**The twelve stages, 十二長生 shí'èr chángshēng** (長生 沐浴 冠帶 臨官 帝旺 衰
病 死 墓 絕 胎 養), are a different object from 旺相休囚死. The well-known
divergence is how they run for the **yin stems**. 《三命通會》 卷二 論天干陰陽生死
argues 「陽生陰死，陽死陰生，迴環逆順」, so a yin stem runs backward from its
own birth branch. The engine does this (`bazi/hidden-stems.ts`). The other
reading, 陰陽同生同死, gives a yin stem its yang partner's stages. The register
does not model it and no witness on the shelf is attributed to it (§ 6).
`synonyms.json` `dodici-fasi` lists four names for the cycle.

### 2.4 八卦 bāguà — 先天 xiāntiān and 後天 hòutiān

| | 乾 | 兌 | 離 | 震 | 巽 | 坎 | 艮 | 坤 |
|---|---|---|---|---|---|---|---|---|
| 先天 (伏羲, via 邵雍) number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| 先天 direction | S | SE | E | NE | SW | W | NW | N |
| 後天 (文王, 《說卦》「帝出乎震」) direction | NW | W | S | E | SE | N | NE | SW |
| 洛書 number on 後天 | 6 | 7 | 9 | 3 | 4 | 1 | 8 | 2 |

奇門, 太乙 and the almanac's bearings use the 後天 arrangement. The 先天
numbers belong to 梅花易數 ★ and the Song 數學 tradition, not to these boards.
奇門 makes its hexagrams by stacking palace trigrams (`dunjia/hexagram.ts`);
for what the engine declines to read in them, see `docs/refusals.md`
§ "What 卷十一 reads in the hexagram of a palace".

### 2.5 洛書 luòshū, 河圖 hétú, and the nine palaces

- **洛書**: the magic square 戴九履一，左三右七，二四為肩，六八為足，五居中. Laid on 後天: 坎1 坤2 震3 巽4 中5 乾6 兌7 艮8 離9.
- **河圖**: the ten numbers in five generating pairs, 一六 水, 二七 火, 三八 木, 四九 金, 五十 土. `CAL-09` derives the stems' 五合 from it as one of three independent routes.
- **Which figure carries which name was disputed.** 劉牧 (Northern Song, 《易數鉤隱圖》) called the nine-figure 河圖 and the ten-figure 洛書. 朱熹 and 蔡元定's 《易學啟蒙》 reversed this, and their usage became standard. A Song or early-Ming 圖說 may use either.
- **九宮 jiǔgōng numbering differs between arts.** 奇門 numbers by the 洛書. **太乙 numbers 乾1 離2 艮3 震4 中5 兌6 坤7 坎8 巽9**, one seat off (《太乙金鏡式經》 卷二 「所以差一宫以就乾位」; `docs/sources.md` § "The nine palaces, which are not the nine palaces"; CLAUDE.md requires every surface to say so). Only the centre coincides, so «palace four» is 巽 in one art and 震 in the other. 盧央 warns his own reader: 「在八卦九宮中（注意不是太乙九宮）」 (`CAL-12`). The 靈樞·九宮八風 numbering, where 冬至 is 1 at 叶蟄 and 立秋 is 2 at 玄委 and so on, is the 洛書 laid on the calendar, and the 雙古堆 太一九宮占盤 carries it.
- **Centre lodging (寄宮 jìgōng)** is another homonym. 奇門 lodges palace 5 in a corner (`qimen.centreLodging`, five values). 六壬 lodges the *stems* on branches: 甲寄寅, 乙寄辰, 丙戊寄巳, 丁己寄未, 庚寄申, 辛寄戌, 壬寄亥, 癸寄丑. 遁甲 also puts 六戊 at 天門 戌亥 and 六己 at 地戶 辰巳 (盧央 p. 759 ★). Same signs, different seats, and no error raised (`CAL-12`).

### 2.6 二十八宿 èrshíbā xiù, 十二辰 shí'èr chén, 十二次 shí'èr cì

- **The lodges**, by quarter. East 蒼龍: 角 亢 氐 房 心 尾 箕. North 玄武: 斗 牛 女 虛 危 室 壁. West 白虎: 奎 婁 胃 昴 畢 觜 參. South 朱雀: 井 鬼 柳 星 張 翼 軫. They are unequal in width. Their degrees (宿度 xiùdù) depend on the determinative star (距星 jùxīng) and the epoch, and precession moves them (`qizheng.xiudu`, and `docs/sources.md` § 七政四餘 including «觜 and 參, which is the finding»). The almanac uses the lodges differently: as a day count (二十八宿值日), keyed to the seven luminaries, and with no degree at all (`docs/sources.md` § 曆注).
- **十二辰** are the twelve branches as directions on the horizon. **十二次** are the twelve Jupiter stations along the equator: 星紀 丑, 玄枵 子, 娵訾 亥, 降婁 戌, 大梁 酉, 實沈 申, 鶉首 未, 鶉火 午, 鶉尾 巳, 壽星 辰, 大火 卯, 析木 寅. The 次 run opposite to the 辰. A 次 is where the Sun stands, and the *opposite-handed* branch names it. That is why the 月將 of 寅 month is 亥: the 斗建 and the 太陽過宮 are paired.
- **六合 is that pairing frozen at the epoch of the 古四分曆.** Precession has since moved the Sun about a month's worth (50.3″ a year; `CAL-09`, citing 盧央 pp. 73–74). Texts still teach 子丑, 寅亥 and the rest as a table, and the 月將 is recomputed from the sky (`yuejiang: true`). So a 六壬 general turned by the true Sun and a 六合 relation can no longer coincide. This is a known disjunction, not a bug.
- **分野 fēnyě**, the assignment of lodges and 次 to states and provinces, belongs to state astrology (占候), and the engine does not use it.

### 2.7 納音 nàyīn

The sixty 甲子 in thirty pairs, each with an element image: 海中金, 爐中火, 大林木
and so on. 《評註淵海子平》 卷一 ff. 5–7 ★ gives the full table, read leaf by
leaf in `CAL-10`. 沈括 《夢溪筆談》 卷五 explains the derivation through the
sixty pitches, each moving to the one eight places on (六十律旋相為宮, 隔八相生);
see the 中研院 數學傳播 article, *web*. Users: 紫微斗數's 五行局, the older
三命 practice of reading the year's 納音, and the 八字 reading layer, which the
engine checked against `lunar-javascript`. A chart's 納音 element and its
stem's element are two different facts. Manuals sometimes blur them.

### 2.8 Combinations and clashes, 空亡, 驛馬, 貴人

`CAL-09` derives every one of these relations except the 六合, and shows how.

- **天干五合 wǔhé**: 甲己, 乙庚, 丙辛, 丁壬, 戊癸. The 化氣 (transformed element) is 土 金 水 木 火, which is the stem 五虎遁 puts on the 辰 month. A line of 揚雄 that assigns elements to the same pairs is *not* the 化氣 (`CAL-09`, `falsi_amici`).
- **三合 sānhé**: 申子辰 水, 亥卯未 木, 寅午戌 火, 巳酉丑 金, read as 生 旺 墓 of the element. It generates 將星, 華蓋, 驛馬 and 咸池, and supplies the middle term of the hidden stems (`synonyms.json` `tre-合`). **三會 sānhuì**: 寅卯辰, 巳午未, 申酉戌, 亥子丑. **六合 liùhé**: 子丑, 寅亥, 卯戌, 辰酉, 巳申, 午未 (§ 2.6).
- **沖 chōng**: the six opposites. **破 pò**: 子酉, 卯午, 辰丑, 未戌, 寅亥, 巳申. `CAL-09` reads 沖 and 破 as one axis named by which side is stronger (「死氣重能破，生氣輕故只相沖」). **害 hài**: 子未, 丑午, 寅巳, 卯辰, 申亥, 酉戌, where A harms B when A's 合 is B's 沖. **刑 xíng**: 寅巳申 and 丑戌未 in chains, 子卯 reciprocal, and 辰午酉亥 自刑. A 刑 never leaves its class (孟, 仲 or 季). 六壬 uses it to generate the 三傳 of 伏吟. 《五行大義》's reading rule: 「凶則視其所救，吉則觀其所害」. No relation is read alone.
- **空亡**: the two branches a 旬 leaves out (`ganzhi.ts` `decade`). **Which 旬 counts differs by art**: 六壬 and 子平 read the *day's*, and 奇門 the *hour's* (`CAL-13`, QM-09). 截路空亡, keyed to the hour stem 壬 or 癸, is a different object with the same last two characters (`almanac.ts`, `ziwei`). 六甲孤虛 is the same structure: 孤 is 空亡, and the 戌亥/辰巳/子丑/午未 of the four 門 are the 孤 of the 旬 (`CAL-12`).
- **驛馬 yìmǎ**: the branch that clashes with the 三合's first member, so 申子辰 has its horse at 寅, 寅午戌 at 申, 巳酉丑 at 亥, 亥卯未 at 巳. **Which pillar it is taken from** varies: year or day in 子平, day or hour in 奇門 (`dunjia/horse.ts` reports both), the day in 六壬 (`liuren.ts`).
- **天乙貴人 tiānyǐ guìrén**. The common verse is 「甲戊庚牛羊，乙己鼠猴鄉， 丙丁豬雞位，壬癸兔蛇藏，六辛逢馬虎」 (*web*). The variants are where 甲 and 庚 sit, and whether a day noble and a night noble are split, and at which hour. 六壬 models two of them: `liuren.guiren` (`chou`, 甲 with 戊庚; `wei`, 甲 alone) and `liuren.zhouye` (`branch`, `solar`). TODO lists «the noble of 庚 seated with 辛's» as unattributed. 《協紀辨方書》 卷七 ★ has a section on 天乙貴人 that argues these questions (`texts/README.md`, almanac row).
- **神煞 shénshà in general.** The full list cannot be compiled, and 盧央 says so (「不可能全部介紹」). What is fixed is the *method* and the *column*: 「擇日加月建，擇時則加日建」 (`CAL-13`). The sources mostly do not compute different seats. **They judge the same seat in opposite ways.** One cell is called 厭對, 六儀, 招搖 and 天罡: to the 堪輿家 it is inauspicious, and to the 叢辰家 a monthly good spirit. Mixing two manuals therefore produces no numeric conflict, only two opposite verdicts. The defence is the source printed beside each line, which is `almanac.shensha` and the per-entry holders in `docs/sources.md` § 曆注. 子平 derives 天德, 月德, 劫煞 and others differently from the almanac (`texts/README.md`, bazi row: 三命通會 ★).

---

## 3. The three 式 and how the arts relate

**What 式 shì means.** A 式 is a cosmic board, the 式盤 shìpán this project is
named for. It has a round heaven-plate (天盤) that turns over a square
earth-plate (地盤). The heaven-plate carries the Dipper and the twelve 月將;
the earth-plate carries the stems, branches and twenty-eight lodges. Turning
the heaven-plate to the instant lays the configuration. The earliest specimens
are Western Han. From the tomb of 汝陰侯 夏侯竈 at 雙古堆, 阜陽 (sealed about
165 BCE, excavated 1977) come a 六壬-type board and a 太一九宮占盤, the latter
numbered like 《靈樞·九宮八風》. A 六壬 board was also found at 武威 磨咀子.
See Harper 1978–79, Cullen 1980–81, Kalinowski 1983, 李零 《中國方術考》, and
the Shuanggudui entry (*web*), which reports re-identifications of some of
these discs as astronomical instruments.

**Which three.** 《唐六典》 卷十四 太卜署 lists the diviner's four methods as
「一曰龜，二曰兆，三曰易，四曰式」 and the three 式 as
**「一曰雷公式，二曰太一式，並禁私家畜，三曰六壬式，士庶通用之」**
(zh.wikisource, *web*). In the Tang, then, the three were 雷公, 太一 and 六壬,
and only 六壬 was open to private hands. The classical triad of later sources,
**太乙 tàiyǐ, 奇門遁甲 qímén dùnjiǎ and 六壬 liùrén**, is Song. Its monument is
the 景祐 compilations under 楊惟德 (1034–38): 《景祐太乙福應經》,
《景祐遁甲符應經》 ★ (as 《遁甲符應經》 in three copies) and 《景祐六壬神定經》.
Whether 雷公式 is an ancestor of 遁甲 is argued in modern scholarship and not
settled here.

**What each one is about**, which is also why the consultation asks for
different inputs (`docs/readings.md` § "Three kinds"):

- **太乙 is about a year**, the state and the sky. Its count is the 上元積年 and its palaces are numbered its own way. No person is on the board.
- **奇門 is about an instant and a direction**: the board of an hour (or day, month or year: `qimen.system`) on the 洛書, read for action and position.
- **六壬 is about an instant and a question**: the 月將 laid on the hour, four lessons, three transmissions. Of the three it is the most purely temporal.

**What they share** is the reason the project forbids reading two boards of
one instant together (`docs/readings.md` § "One board, never two of one
instant"; `docs/refusals.md` § "Two boards of one instant, in one prompt").
奇門 and 六壬 share the day pillar, the 旬 and its 空亡, the 遁干 and five of
the eight spirits. The 月將 ring of 六壬 is the twelve 宮 of 七政四餘. 八字 is
the four pillars every other board is built on. 太乙 overlaps none of them,
and the rule still holds, on different grounds. Where two boards agree, the
agreement is often one fact printed twice. **No transmitted rule combines the
三式.** The texts were read separately and compared by people. 《御定奇門大全》's
own 景祐秘纂 sits beside the 六壬 and 太乙 works and does not merge them.

**What each owns.** Each has its own input type and its own parameters
(CLAUDE.md: «An art natively about a life gets a board of its own, never
dunjia's»). 八字, 紫微斗數 and 七政四餘 are 命 arts, not 式, and the natal-奇門
graft is refused (`docs/refusals.md` § "A natal Qi Men chart"). The 曆注 is a
page of a published book and not a board (`docs/parameters.md`).

---

## 4. The source landscape

### 4.1 The collections

- **《四庫全書》 (1773–82) and its 《總目提要》.** 術數 sits in 子部 (卷108–111 of the 總目). Its preface sets the frame and the prejudice: 「術數之興，多在秦、漢以後。要其旨，不出乎陰陽五行，生克制化，實皆《易》之支派， 傅以雜說耳」, and the verdict 「中惟數學一家為《易》外別傳…其餘則皆百偽一真」, softened by 「其可通者存其理，其不可通者姑存其說可也」 (zh.wikisource 四庫全書總目提要/卷108, *web*). The subdivisions are 數學, 占候, 相宅相墓, 占卜, 命書相書, 陰陽五行, and 雜技術 attached. The 提要 is the first place to settle an attribution: it settled 《星學大成》 for 萬民英 (`texts/README.md`). The 文淵閣 景印 (臺灣商務, 1983–86) is the citable facsimile. Vols. 809 and 810 ★ hold the 命書 and 陰陽五行 groups, and 《太乙金鏡式經》 ★ and 《協紀辨方書》 卷七–八 ★ are on the shelf from it. **Limits**: 四庫 copies are manuscripts, edited, sometimes cut, and taboo-altered (§ 4.3). Many 奇門 manuals were never admitted.
- **《續修四庫全書》** (上海古籍, 1995–2002), 子部 術數類: Ming and Qing manuals the 四庫 excluded, in facsimile of good editions. Check its 總目 for volume numbers. This file does not give them, having not verified them.
- **《故宮珍本叢刊》** (海南出版社, 2000–01): the Palace Museum's rare holdings in facsimile, including palace manuscripts of 術數. The shelf holds vol. 415 (梅花易數, with two 六壬 works) and vol. 422 (淵海子平) ★. The 《統宗》 太乙 file is likely from it too (`texts/README.md`). A separate series, 《故宮博物院藏術數類稀見叢刊》 (故宮出版社, 2015), prints works such as 《奇門遁甲備覽》 (Princeton catalogue, *web*).
- **《道藏》.** The 正統道藏 (1445) and 萬曆續道藏 (1607), organised as 三洞四輔, each 洞 with twelve 類. 術數 material sits mostly in the 眾術類. One example is 《黃帝太一八門逆順生死訣》 and 《入式秘訣》 in 洞玄部 眾術類 ★, held as a digital text and not yet collated with a leaf. Use 《道藏提要》 (任繼愈 ed.) or Schipper & Verellen, *The Taoist Canon* (2004), for dating.
- **《古今圖書集成》** (1726): 博物彙編 藝術典 has 卜筮部, 星命部 (卷565–630, five DjVu volumes ★) and 術數部, and 曆象彙編 曆法典 has the calendrical debates (李淳風's 640 memorial included). It excerpts rather than prints whole works, so it is a finding aid with dates attached.
- **The almanac standard**: 《欽定協紀辨方書》 (1739, 36 卷) ★, in part. Its predecessor 《御定星歷考原》 (1713) ★ has 卷一 only, and 卷二–六 ☆ are the most wanted item on `texts/README.md`'s missing list.
- **Modern reprint houses** such as 華齡, 九州, 心一堂 (Hong Kong) and 武陵 (Taipei) typeset, punctuate and simplify. They are finding aids, not witnesses (`docs/sources.md` § "What a second copy of one text buys").

### 4.2 Online corpora — what each is good for

| Corpus | Good for | Watch |
|---|---|---|
| **ctext.org** — 中國哲學書電子化計劃 (one site under two names) | full-text search across pre-Qin to Qing works; linked page images for many; its wiki texts are OCR | the wiki layer is uncorrected OCR. Go to the image |
| **zh.wikisource.org** | 四庫全書本 transcriptions (《太乙金鏡式經》, 《協紀辨方書》, 《唐六典》, 《五行大義》); whole-site search found every witness of 「分日起於子半」 in one query | transcriptions, often unproofed; taboo forms kept or silently restored |
| **國學大師 guoxuedashi** | 四庫 and 續修 catalogue lookup, dictionaries, scans of reprints | provenance often unstated |
| **書格 shuge.org** | high-resolution scans of rare editions, many from Japanese and Western libraries, with provenance | small 術數 holding |
| **中華古籍資源庫**, National Library of China (read.nlc.cn; index at `/thematDataSearch/toGujiIndex`) | 善本 images, over 100 000 items, no login since 2021 | search by title. Chrome recommended |
| **Waseda 古典籍總合データベース** (wul.waseda.ac.jp/kotenseki) | full colour scans of Japanese-held Ming and Qing prints, including 術數 and 曆 | Japanese catalogue conventions |
| **Harvard-Yenching** (HOLLIS, CURIOSity) | the Chinese rare book collection, fully digitised with the NLC | search by title in HOLLIS; images via IIIF |
| **HathiTrust** | 20th-century reprints and scholarship, full view for public domain | many 20th-c Chinese books search-only |
| **archive.org** | the CADAL scans (identifiers `0605xxxx.cn`, `0606xxxx.cn`; the 儀象考成 and 星歷考原 volumes here came that way) | file metadata is thin. Identify the 冊 from the 版心 |
| **Princeton East Asian Library** (Gest) catalogue | edition data for rare 術數 prints (星平大成 康熙 懷德堂) | catalogue, not images |

### 4.3 Editions, recensions, and reign taboos

- **A work and an edition are different things.** The rule against naming a value for a recension and the test for an edited edition are in `docs/parameters.md` § "What is not a parameter" and `docs/sources.md` § "What a second copy of one text buys". Do not restate them. Apply them.
- **Qing taboo forms date a copy.** 玄 (康熙 玄燁) is written 元 or with the last stroke missing, 弘 (乾隆 弘曆) as 宏, 胤 (雍正) without its last stroke, 丘 (孔子, enforced from 雍正) as 邱, 曆 itself often as 歷 or 厤 under 乾隆. So 玄武 appears as 元武, and 天玄 as 天元. In a 奇門 text 元武 is the spirit 玄武, not a «primal» anything. Libraries date prints by these forms. Princeton dates a 康熙 print by its avoided 玄, and notes a supposed 康熙 manuscript of 《遁甲奇門》 that avoids neither 玄 nor 弘 (catalogue, *web*). One avoided character does not date a book: check 刻工, format, 序 and seals as well.
- **四庫 alterations go beyond taboo.** Passages offensive to the Manchus were changed (胡, 虜, 夷), and 術數 works were sometimes abridged. A 四庫 reading against a Ming print is a two-witness question, not a settled one.
- **Two copies are one text.** A 故宮 palace manuscript and a 四庫 copy of the same work collate one text. Two works are two readings (`docs/parameters.md` § "What is not a parameter", «Two works are not two copies»).

### 4.4 Reading a woodblock

`docs/scans.md` owns the method: what a file is before what it says, an
extract that locates and never quotes, a negative established on the plate.
Two additions specific to 術數: the 版心 (centre fold) names work, 卷 and
leaf, and is how a loose scan is located; and tables in small double-column
annotation (雙行小注) are where OCR loses a cell, and where a rule's
character usually sits.

### 4.5 Scholarship worth reading first

**Chinese**:

- 陳遵媯 《中國天文學史》 for the 曆 and their constants.
- 張培瑜 《三千五百年曆日天象》 (1990) for converting historical dates.
- 江曉原 《天學真原》 (1991), on astronomy as a political art, and his 《歷史上的星占學》.
- 黃一農 《社會天文學史十講》 (2004): 擇日, the 時憲曆 controversies, 湯若望.
- 李零 《中國方術考》 and 《中國方術續考》: the 式, 日書 and excavated 術數.
- 劉樂賢 《睡虎地秦簡日書研究》 (1994) and 《簡帛數術文獻探論》.
- 盧央 《中國古代星占學》 (2007) ★, the most used single volume in `texts/rules`.
- 洪丕謨 · 姜玉珍 《中國古代算命術》 (1991) ★.
- 陳維輝 《中國術數學綱要》 (1994) ★.
- 嚴敦傑's papers on the 式盤 (*Kaogu xuebao* 1985, unverified here).

**English and French**:

- Needham, *SCC* vol. 3 (1959).
- Ho Peng Yoke, *Chinese Mathematical Astrology* (2003): 太乙, 奇門 and 六壬 described from the texts.
- Kalinowski, *Cosmologie et divination dans la Chine ancienne* (EFEO 166, 1991), a full annotated 《五行大義》; and his BEFEO 1983 article on the Han boards and 六壬.
- Harper & Kalinowski eds., *Books of Fate and Popular Culture in Early China* (Brill 2017): the 日書.
- Smith, *Fortune-tellers and Philosophers* (1991), *Chinese Almanacs* (1992) and *Mapping China and Managing the World* (2013).
- Sivin, *Granting the Seasons* (2009), on the 授時曆.
- Cullen, *Astronomy and Mathematics in Ancient China* (1996) and *Heavenly Numbers* (2017).
- Morgan, *Astral Sciences in Early Imperial China* (2017).
- Lackner ed., *Coping with the Future* (Brill 2017/18).
- Raphals, *Divination and Prediction in Early China and Ancient Greece* (2013).
- Aslaksen on the calendar.

---

## 5. Consulting ethically and well

What a consultant owes the person, in the order it comes up:

1. **Whose reading it is.** Every board is laid by a school and every reading follows one. Name the school and say that another exists (`docs/readings.md` § "The school travels with the board"; `docs/parameters.md` § "A declared default is not a hidden school"). A default is a convention, not the art's verdict.
2. **The art is not one of its schools.** Do not present 中州派's 四化, 拆補's 元 or the 子平 立春 as «the» rule. Where this file says «X holds», keep the attribution when speaking.
3. **The input before the reading.** Ask which clock the time was read on, and where. Ask whether the person knows if a 子-hour birth fell before or after midnight. A birth near 立春, near a 節, near 23:00 or near a 中氣 sits on a boundary, and saying so is part of the reading: it is the evidence that a choice was made.
4. **No death, no illness, no dated catastrophe.** Classical texts date these freely (應期, 壽元). A consultant does not repeat them as forecasts. The project's refusals on dating and advice, and what its prompts forbid, are in `docs/refusals.md` § "Ordering two hours, and dating an outcome" and § "Advice", and in `docs/readings.md` § "What stays out of a prompt". Read them and do not paraphrase them to the person.
5. **The 用神, strength, and every judgement are yours and are said aloud.** The engine stops short of them (`docs/refusals.md`). A reading supplies them attributed: «by 《子平真詮》's method…».
6. **Cultural context.** These arts grew up in a society where the diviner advised on marriage, burial, office and war. 太乙 is about the state, not a person. The 四庫 editors already called most 術數 「百偽一真」, while also refusing to call it baseless. A consultant can present the art as a tradition of reading without either selling it as prediction or mocking it.
7. **Two boards, two schools.** Never offer the agreement of two boards of one instant, or of two schools, as confirmation (`docs/readings.md`).

---

## 6. Open questions and candidate TODOs — the calendrical layer

Each line gives what is open, why it matters, which source would settle it,
and whether that source is on the shelf.

- **`yearBoundary: lichun` unattributed.** It is the default and has no holder. 洪丕謨 p. 59 states it outright (`CAL-03`). **On the shelf** (★ `shushu/zhongguo-gudai-suanmingshu.pdf`); it needs reading on the plate and entering. A classical 子平 sentence would be stronger: 《淵海子平》's 論年上起月例 ★ is the place to look.
- **`yearBoundary: chunjie` unattributed for the pillars.** GB/T 33661 §6.1.1 ★ holds it as the civil convention. Whether a 子平 practitioner holds it is a separate question. A modern 紫微 or 八字 manual that casts the year pillar by the new year is wanted: none is located.
- **`dayBoundary: zishi` unattributed.** 盧央 pp. 23–24 ★ works it over six days (`CAL-06`). On the shelf. Read on the plate and enter it, as a modern study.
- **`dayBoundary: midnight` older witness.** 沈義方 《星平大成》 ☆: Princeton holds a 康熙 懷德堂 print in seven 卷. Also 王逵 《蠡海集》 (四庫 子部雜家類, probably on wikisource or ctext), not on the shelf; read it in a 四庫 image rather than a paraphrase.
- **The 曆's midnight day is not the 子平 day.** 李淳風 640 「古曆分日，起於子半」 and the 1800 Joseon record are evidence about the *calendar*. If a surface ever explains `dayBoundary`, it should not cite them as a 子平 holder. They argue only that `midnight` is the almanac's convention.
- **`trueSolarTime: false` unattributed.** A dated manual that states clock-time casting is wanted. None is located.
- **`luckGranularity: minute` unattributed.** Look in modern Hong Kong and Taiwan software manuals and 梁湘潤's works (梁湘潤 萬年曆 ★ is an instrument, not a doctrine).
- **Pre-1645 terms (平氣).** The engine's 定氣 terms and lunar months for a Ming birth differ, near boundaries, from what the almanac of the time printed. 三命通會's and 星學大成's worked charts were cast on 大統曆 平氣 terms. This is not a school divergence. The 大統曆 almanac is a published fact. Candidate: a warning (like `MOSHIER_FALLBACK`) on dates before 1645, and a check of the shelf's dated Ming charts against 張培瑜's tables (not on the shelf). The 太乙 register already meets Ming dates (1510).
- **Pre-1929 meridian.** The 1645–1928 almanacs were reckoned at Beijing (116°25′E). For new moons within about 15 minutes of midnight, the engine's 120°E month start differs by a day. Candidate: a listing of affected months from 1645 to 1928, checked against 鄭鶴聲 or 張培瑜 (not held) or the paper 萬年曆 ★ (on the shelf; its coverage before 1929 is unread).
- **Julian-calendar dates.** `toJulianDay` is proleptic Gregorian. A pre-1582 date written in the Julian calendar is ten days off. Say so in documentation where 太乙's historical boards are discussed. Not a parameter.
- **2033.** The engine gives 閏十一月, which is the GB/T reading. Worth a test in `packages/core/test/`, if none exists, since this is the case almanacs famously got wrong.
- **十二長生 for yin stems.** 陰陽同生 against 陽生陰死: if a 子平 lineage holds 同生 and two practitioners would draw different stages, the three-question test admits a parameter. A witness is needed first, perhaps 任鐵樵's commentary in 《滴天髓闡微》 ★ (on the shelf, unread for this).
- **八卦休王, eight states.** Recorded in 《五行大義》, and `CAL-08` notes it. No board reads it. Not a TODO unless a 奇門 text uses it on a palace.
- **土's season in 《五行大義》 itself** gives both 季夏 and 季十八日. If a board's `earth` ever wants a third value (`jixia`, 季夏 only), the witness is there. 《五行大義》 is not on the shelf; a 四庫 or 知不足齋 copy would be wanted.

---

## 7. Leads against the register

None of these corrects the register. Each is a located witness that has not yet
been weighed, which CLAUDE.md says is not the same as a weighed one.

1. **`yearBoundary: lichun`.** The register: «stay unattributed» (`docs/sources.md` § "Whose each value of the calendrical layer is"), and `TODO.md` § 1 «who turns the year at 立春». The shelf's own transcription `texts/rules/CAL-03`, marked LETTA (read), quotes 洪丕謨 《中國古代算命術》 p. 59 ★ stating it with both directions worked. The register already treats modern manuals (《命理新論》) as holders, so this one would likely qualify the same way once read on the plate.
2. **`dayBoundary: zishi`.** The register: «stays unattributed». `CAL-06` says 盧央 pp. 23–24 ★ demonstrates the 干支 day turning at 23:00 over six consecutive days. It is a modern study rather than a manual, so the attribution would be weaker; it is still a located witness.
3. **`yearBoundary: chunjie`.** The register: unattributed. GB/T 33661-2017 §6.1.1 ★ (`CAL-03`) ties the civil year's 干支 to the lunar year. It is a national standard, not a 命 practitioner, so it would be attributed as the civil convention. `CAL-03` goes as far as arguing that offering 立春 runs against the official convention.
4. **The register's "Asked and not found" in `TODO.md` § 1** lists 《三命通會》卷二 and 《命理新論》 for the day and year boundaries. 《淵海子平》 (故宮 422 ★) and 洪丕謨 were not in that list. By the rule that an arrival is put to the questions already standing, they were never asked.

---

## 8. Bibliography

Grouped Chinese and English. ★ on the shelf, ☆ wanted, *web* for a page used
as a finding aid only.

**Chinese — primary and standards**

- GB/T 33661-2017 《農曆的編算和頒行》 ★: the leap-month rule, the 120°E meridian, the year's 干支, the day anchor (via `CAL-01/02/03/06/07`).
- 《命理新論》, 吳俊民 ★: `trueSolarTime: true`, `dayBoundary: midnight`, `yearBoundary: dongzhi` (via `docs/sources.md`).
- 《三命通會》, 萬民英, SKQS vol. 810 ★: `luckGranularity: shichen`, 論坐命宮; 陽生陰死 (卷二, as quoted at blog.udn.com/DejaVu/3146036, *web*).
- 《新刊合併官板音義評註淵海子平》, 故宮珍本叢刊 422 ★: 五虎遁, 五鼠遁, 納音 (`CAL-04/05/10`).
- 《滴天髓闡微》, 1947 ★: the three yin-yang divisions of the branches (`CAL-09`).
- 《紫微斗數全書》 卷二 ★: the leap month counted with the following month.
- 《欽定協紀辨方書》 ★ (卷七–八 四庫, 卷一–八 華齡) and 《御定星歷考原》 卷一 ★ / 卷二–六 ☆: the almanac's 神煞 and 天乙貴人.
- 《五行大義》, 蕭吉 (隋), 卷二 論四時休王 — https://zh.wikisource.org/wiki/五行大義/2 *web*: the 旺相休囚死 tables, earth's season, 八卦休王.
- 《唐六典》 卷十四 太卜署 — https://zh.wikisource.org/wiki/唐六典/卷14 *web*: the Tang 三式.
- 《四庫全書總目提要》 卷108 — https://zh.wikisource.org/wiki/四庫全書總目提要/卷108 *web*: the 術數類 preface and subdivisions.
- 李淳風's memorial of 640, 「古曆分日，起於子半」 — 新唐書 卷25, 資治通鑑 卷195 (zh.wikisource search, *web*): the calendar day at midnight.
- 《正祖實錄》 二十四年 (1800), quoted at https://m.cafe.daum.net/2040/MsI/66603 *web*: the Qing almanac's 夜子 on the earlier date.
- 王逵 《蠡海集》, paraphrased at https://m.cafe.daum.net/2040/MsI/66590 *web*: the 子 hour split between two days.
- 沈義方 《星平大成》 ☆ — Princeton catalogue record, 康熙 懷德堂 seven 卷 (https://catalog.princeton.edu/catalog/9940468523506421, *web*).
- 沈括 《夢溪筆談》 卷五 — https://zh.wikisource.org/wiki/夢溪筆談_(四庫全書本)/卷05 *web*: the derivation of 納音.
- 《太乙金鏡式經》 卷二 ★: 太乙's nine-palace numbering (via `docs/sources.md`).
- 《古今圖書集成》 星命部 ★: the collection, located.

**Chinese — modern scholarship**

- 盧央 《中國古代星占學》 (2007) ★: the day at 23:00, 六合 and precession, 神煞 method, the two numberings (via `CAL-01/06/08/09/12/13`).
- 洪丕謨 · 姜玉珍 《中國古代算命術》 (1991) ★: the year at 立春, 旺相休囚死's rule.
- 《大六壬精解》 ★: 生剋, the 月將 table, earth's eighteen days.
- 梁湘潤 《萬年曆 中西對照》 ★: a paper check of the calendar.
- 陳遵媯 《中國天文學史》; 張培瑜 《三千五百年曆日天象》; 鄭鶴聲 《近世中西史日對照表》: historical dates (not held).
- 江曉原 《天學真原》; 黃一農 《社會天文學史十講》; 李零 《中國方術考》 and 《續考》; 劉樂賢 《睡虎地秦簡日書研究》: background, not held.
- 漢典 「時憲曆」 — https://www.zdic.net/hant/時憲曆 *web*: 定氣 from 1645.
- 中研院 數學傳播 on 沈括's 納音 — https://www.math.sinica.edu.tw/mathmedia/journals/4479 *web*.
- 國家圖書館 中華古籍資源庫 — http://read.nlc.cn/thematDataSearch/toGujiIndex (IT之家 report https://www.ithome.com/0/592/095.htm, *web*).

**English and other**

- Aslaksen, H., *The Mathematics of the Chinese Calendar* — https://www.herongyang.com/Chinese/Archive/999998868.html, https://www.gwern.net/doc/science/2010-aslaksen.pdf *web*: 2033, leap-month rules since 1645.
- IANA tz mailing list, «Timezone for East Asian traditional calendar» (2018) — https://lists.iana.org/hyperkitty/list/tz@iana.org/thread/44534K4MZ5HIVIBV5YSSN7EXO4VL2D3F/ *web*: Beijing mean time 1914–28, 120°E from 1929.
- `calendrical_calculations` docs, `UTC_OFFSET_PRE_1929` — https://doc.servo.org/calendrical_calculations/chinese_based/constant.UTC_OFFSET_PRE_1929.html *web*: the same.
- IMCCE, article on the Chinese calendar — https://www.imcce.fr/newsletter/docs/article_chinois.pdf *web*: the 1645 reform.
- Harper, D., «The Han Cosmic Board (Shih 式)», *Early China* 4 (1978–79); Cullen, C., «Some Further Points on the Shih», *Early China* 6 (1980–81) (https://resolve.cambridge.org/core/journals/early-china/article/han-cosmic-board-shih/2F2DFDBE0194DAA0FB4D16E9A06812B7): the 式盤.
- Kalinowski, M., «Les instruments astro-calendériques des Han et la méthode liu ren», *BEFEO* 72 (1983); *Cosmologie et divination dans la Chine ancienne* (EFEO 166, 1991) — https://publications.efeo.fr/fr/livre-pdf/148_cosmologie-et-divination-dans-la-chine-ancienne-le-compendium-des-cinq-agents-wuxing-dayi-vie-siecle
- Harper, D. & Kalinowski, M., eds., *Books of Fate and Popular Culture in Early China* (Brill 2017) — https://cris.fau.de/publications/203923362: the 日書, early hour systems.
- Lackner, M., ed., *Coping with the Future* (Brill, Sinica Leidensia 138, 2017/18) — https://search.worldcat.org/oclc/1001862390.
- Ho Peng Yoke, *Chinese Mathematical Astrology* (Routledge 2003): the 三式 from the texts.
- Needham, J., *Science and Civilisation in China* vol. 3 (1959); Sivin, N., *Granting the Seasons* (2009); Cullen, C., *Heavenly Numbers* (2017); Morgan, D. P., *Astral Sciences in Early Imperial China* (2017); Smith, R. J., *Fortune-tellers and Philosophers* (1991), *Chinese Almanacs* (1992): the background named in § 4.5.
- Shuanggudui — https://en.wikipedia.org/wiki/Shuanggudui *web*: the 165 BCE tomb and its boards.
- Princeton catalogue notes on taboo-dated prints, via search results (*web*): dating by 玄 and 弘.
- Harvard-Yenching special collections — https://library.harvard.edu/libraries/yenching/special-collections; Waseda https://www.wul.waseda.ac.jp/kotenseki/; 書格 https://www.shuge.org/; ctext https://ctext.org/; 國學大師 https://www.guoxuedashi.net/.
