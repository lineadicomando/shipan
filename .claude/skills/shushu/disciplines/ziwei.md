# 紫微斗數 zǐwēi dǒushù — board `ziwei`

Researched 2026-10-23. Rules are in [`CLAUDE.md`](../../../../CLAUDE.md); the
register is [`docs/sources.md`](../../../../docs/sources.md) § "紫微斗數 — a
board with no sky"; the parameters are
[`docs/parameters.md`](../../../../docs/parameters.md) and `ZIWEI_PARAMETERS`
in `packages/core/src/parameters.ts`. This file does not restate them. Anything
marked **(web transcription)** is a lead for the shelf and nothing the engine
may stand on.

## 1. What the art is

A 命 mìng art: its subject is a **birth**, and it answers what a life is
inclined to and how its stretches run. No question is asked of it and no year
is its subject. A board is twelve palaces 宮 gōng on the twelve branches,
with up to a hundred named «stars» 星曜 xīngyào counted into them by
arithmetic on the lunar month, the lunar day, the hour branch and the year
pillar. **Nothing on the board is astronomical**: 紫微 is a name, not a body
(Ho Peng Yoke calls it a quadrate horoscope that «operates completely on
numerological principle», *Chinese Mathematical Astrology*, 2003, pp. 74–77).

History, as far as the texts reach:

- Attributed to 陳摶 Chén Tuán (希夷 Xīyí, d. 989); the attribution is the
  books' own and has no earlier witness.
- **1550**: the 羅洪先 Luó Hóngxiān preface to 《紫微斗數全書》 is dated 嘉靖庚戌,
  but 陳昭吟 (《成大中文學報》 75, 2021, pp. 33–74) judges it not his, and a web
  survey reports it first appears in late-Qing/Republican Shanghai lithographs
  (web transcription).
- **1581**: 《新鍥纂集紫微斗數捷覽》, Ming print — the earliest dated use of the
  name, and already 《全書》's fourteen-star board.
- **1607**: 《萬曆續道藏》 includes a three-juan 《紫微斗數》 (CRTA lists it as
  DZ 1485). It is the **other board** of that name, the 十八飛星 shíbā fēixīng.
- Late Ming: the 南陽堂 Nányángtáng seven-juan 《新鐫希夷陳先生紫微斗數全書》,
  題 陳摶, 潘希尹 Pān Xīyǐn 補輯. Late Ming/early Qing: a 文光堂 woodblock
  (虛白廬 collection, reproduced by 心一堂).
- 1870 (同治九年) reprint of 《十八飛星策天紫微斗數全集》 in six juan (web
  transcription, booksellers' notes). Republican lithographs of 《全書》 are the
  ancestor of most modern 坊本 and of the Wikisource text.
- 1960s–1990s: the revival in Taiwan and Hong Kong, the split into 三合,
  四化/飛星 and 中州 lines (§ 2), and the software era.

## 2. Texts and lineages

★ on this project's shelf (`texts/README.md` § ziwei, § juexue). ☆ named in
`TODO.md` as wanted or unread. Unmarked: found in research, not held.

### The fourteen-star board (what the engine computes)

- ★ **《紫微斗數全書》, Wikisource recension, three juan** (`oldid`s in
  `docs/provenance.tsv`). 卷一 fu and verdict doctrine (太微賦, 形性賦, 斗數準繩,
  骨髓賦, 諸星問答論, 定富局 / 定貴局 / 定貧賤局 / 定雜局); **卷二 the whole
  placement layer** and the per-palace readings; 卷三 judgement of limits and
  years (論大限十年禍福, 論二限太歲吉凶, 論行限分南北斗, 論流年太歲吉凶星殺).
  Descends from the Republican lithograph. The engine's default line.
- ★ **《紫微斗數全書》(前三卷), 周宣屹 整編**, simplified, 166 marked emendations,
  undeclared base. Second edition; settled 魁鉞 at 丙丁 and 辛.
- ★ **南陽堂 woodblock, seven juan** (內閣文庫 copy via shuge.org). The
  adjudicator: every question opened against it is closed (`docs/sources.md`).
- ★ **《紫微斗數捷覽》 (1581)**, 心一堂 facsimile + 點校本. Fourteen-star; works
  `daxian: ming` both ways off one birth.
- 文光堂 woodblock of 《全書》 (心一堂, 虛白廬藏) and **潘國森 Pān Guósēn**'s
  collation of it against the 坊本 (title unconfirmed; bookseller blurb). A
  further recension, not held.
- 葆和堂 (建陽) Wanli edition, named by a web survey; unverified.

### The other transmission (not computed; `docs/refusals.md` § 十八飛星)

- ★ **《萬曆續道藏》《紫微斗數》**, three juan, GBK text. Eighteen stars off the
  year branch, no 五行局, no 天府.
- ★ **《十八飛星策天紫微斗數全集》**, 題 陳摶, 徐良弼 校正, 金陵益軒唐謙 鏤梓, in
  《中國絕學》第五冊 pp. 240–305. Booksellers describe a six-juan work whose
  **卷一–二 are the 道藏 text and 卷三–六 fourteen-star material** that modern
  practice is built on (web transcription). Whether the shelf's 66 sheets carry
  卷三–六 is open: see § 7 and § 8.

### Modern lineages

Lineage claims below are mostly the schools' own accounts; a web survey
(lius.cc) rightly says so.

- **三合派 sānhépài** («南派» in one usage): reads star groups across the 三方四正
  and the 格局 of 卷一; many 雜曜 and 流曜. Taiwanese popularisers: 了無居士
  《紫微斗數新詮》, 紫雲 Zǐyún 《斗數論命》, 梁湘潤 《紫微斗數講義》 (1985),
  慧心齋主.
- **中州派 zhōngzhōupài**: 陸斌兆 Lù Bīnzhào's Hong Kong lecture notes, annotated
  and published by **王亭之 Wáng Tíngzhī** (談錫永, 1935–2024): 《王亭之談斗數》
  (1985), 《安星法及推斷實例》 (1986), 陸斌兆 《紫微斗數講義》 評註 (1986),
  《王亭之談星》 (1988), 《斗數古賦今註》 (1994), 《紫微斗數古訣今註》 (2009), the
  初級 and 深造 講義. Wikipedia names 劉惠蒼 as his teacher. Doctrine: 星系
  (the star groups fixed by 紫微's seat), 借星安宮 (an empty palace reads the
  opposite one), 輔曜 vs 佐曜, 流曜, 斗君. ★ Aloysius Han, *Zi Wei Dou Shu*, 5th
  rev. (2014), English, declared 中州派, prints a whole 四化 table and **no
  plotting rule**. ☆ 王亭之's own table, named and unread.
- **四化派 / 飛星派 fēixīngpài**: 周清河 → 徐靜觀 → **梁若瑜 Liáng Ruòyú**,
  《飛星紫微斗數：專論四化》 (2000) (web transcription). Reads the palace stems'
  四化 flying between palaces.
- **欽天門 / 洛陽易源**: **蔡明宏 Cài Mínghóng**, 《華山欽天四化紫微斗數飛星秘儀》
  (from 1985). ★ 《中國絕學》第五冊 carries two works of this line
  (洛陽易源獨步四化紫微斗數飛星步天通會一四四訣; 欽天四化…河洛仙機一百問).
- **河洛派**: 方外人 Fāngwàirén (曾國雄), compiler of ★ 《中國絕學》 (1986);
  ★ 第一冊 carries 河洛紫微斗數歸元 and 四化斷訣.
- **北派 běipài**: ★ 《紫微斗數 北派》, 恭鑑老人, in 《中國絕學》第七冊, with the
  ★ 占驗派 and 南派 material. The label has three uses — see § 5.
- **閩派 mǐnpài**: 天同 never takes 化忌 (王亭之談斗數, web transcription).
- **透派** (明澄派): 張耀文 Zhāng Yàowén, with 佐藤六龍 《中國正統五術命佔大全》
  (1973 Japanese, 1983 Chinese) (web transcription).
- ★ 《中國絕學》第六冊 (闡微, 析論, 特例命譜): holds `huoling: hour` and
  `daxian: ming` in its plotting chapters, and 解神 off the month.

### English

- ★ Aloysius Han (above). Ho Peng Yoke, *Chinese Mathematical Astrology*
  (Routledge 2003), the only academic treatment found, brief. Practitioner
  books — Calvin Yap, *Introduction to Zi Wei Dou Shu – Si Hua Lineage* (2020);
  Y.M. Lim, *The Empyrean Matrix* (2013); Hieu Nguyen Minh, *Unlocking the
  Secrets of Purple Star Astrology* (Vietnamese line) — none is a witness to a
  placement and none translates 《全書》.

## 3. How a board is laid (起例)

Each step: what 《全書》 卷二 does, who departs, and the parameter.

**0. The inputs.** Lunar year, month, day (reckoned on 120°E —
`CLAUDE.md`), the hour branch, the year pillar, and the sex for the
directional rings. Year boundary: `ziwei.yearBoundary: chunjie` (default) or
`lichun`; 《全書》 is silent. Most modern software counts from 正月初一 (iztro
`yearDivide: 'normal'`); 八字 practice cuts at 立春. The year stem carries the
四化, 祿存, 魁鉞, so the weeks between the two dates lay two boards. The 子 hour
and the day: the pillars' `dayBoundary` layer; 卷三's 子時 passage is corrupt at
the character that matters and is not used.

**1. The leap month.** 《全書》: 「又若閏正月生者要在二月內起安身命，凡有閏月俱要
依此為例」 → `leapMonth: following` (default). **Split at the 15th** — first
half as the month repeated, second half as the next — is what 王亭之 «habitually»
does and what a 中州派 初級講義 prints (web transcriptions, xuanmen.com.cn and
a pixnet copy), and is iztro's `fixLeap` default. `leapMonth: split` and
`current` are refused, waiting on a text (`TODO.md` § 1).

**2. 命宮 mìnggōng and 身宮 shēngōng.** From 寅 count forward to the birth month;
from there back by the hour for 命, forward for 身: 「大抵人命俱從寅上起正月…逆至
本生時安命，順至本生時安身」. No divergence found. The twelve palaces run
backwards from 命: 命, 兄弟, 妻妾, 子女, 財帛, 疾厄, 遷移, 奴僕, 官祿, 田宅, 福德,
父母 (modern boards rename 妻妾 夫妻, 奴僕 交友/僕役, 官祿 事業).

**3. Palace stems** by 五虎遁 off the year stem (起五行寅例), dealt forward from 寅
— taken mod 12 before mod 10, so 子 and 丑 get the stems after 亥 (the bug a
reference run caught, `docs/sources.md`).

**4. 五行局 wǔxíngjú.** The 納音 of the 命宮's stem-branch: 水二, 木三, 金四, 土五,
火六. No divergence among fourteen-star schools. (中州派's 地盤/人盤, as iztro
implements them, recompute the bureau from the 身宮 or 福德宮 pillar taken as 命
— a further board, not a variant.)

**5. 紫微 by bureau and lunar day.** 《全書》 prints five grids; the engine ships
them as `ZIWEI_BY_DAY`, all 150 cells collated against the 南陽堂 block and the
捷覽. The arithmetic carried beside the grids (q = ⌈day/局⌉, r = q·局 − day,
±r by parity) is a check, not the text.

**6. The thirteen others.** 紫微 series counter-clockwise (天機 −1, 太陽 −3, 武曲 −4,
天同 −5, 廉貞 −8); 天府 mirrored across the 寅–申 axis, then 太陰, 貪狼, 巨門,
天相, 天梁, 七殺 forward and 破軍 at +10. Universal.

**7. 六吉 and 六煞.**
- 文昌 / 文曲 by hour (from 戌 back, from 辰 forward); 左輔 / 右弼 by month (辰
  forward, 戌 back). Universal in the fourteen-star line. (The 十八飛星 places
  文昌 by year — another board.)
- 天魁 / 天鉞 by year stem: 「甲戊庚牛羊，乙己鼠猴鄉，丙丁豬雞位，壬癸兔蛇藏，六辛逢
  馬虎」. Wikisource's 豬狗 and 虎馬 are transcription errors (settled). The
  八字 noble verse variant «庚辛逢馬虎» (庚 to 寅午) is not found in any 紫微
  manual consulted. **Not modelled**, no divergence attested.
- 祿存 by year stem, 擎羊 +1, 陀羅 −1. Universal.
- 火星 / 鈴星: seats by the year's triplicity (寅午戌 丑卯, 申子辰 寅戌, 巳酉丑 卯戌,
  亥卯未 酉戌). 《全書》 (three recensions) and the verse stop at the seats →
  `huoling: fixed` (default). Counting on from the seats by the hour is held by
  ★ 《中國絕學》第六冊 pp. 405–408 → `huoling: hour`; also printed by the
  中州派 初級講義 and coded by iztro (web transcription / program). The second
  edition's 午卯 for 寅午戌 is that edition's own.
- 地劫 / 天空 from 亥 by hour, forward and back. **《全書》's 天空 is the star
  other boards call 地空**; their 天空 is 「駕前一位」, one past the year branch.
  The engine keeps the book's name (`docs/sources.md`).

**8. 四化 sìhuà** by the birth-year stem — `sihua`. The ten lines of 《全書》:
甲廉破武陽 · 乙機梁紫陰 · 丙同機昌廉 · 丁陰同機巨 · 戊貪陰弼機 · 己武貪梁曲 ·
庚陽武陰同 · 辛巨陽曲昌 · 壬梁紫府武 · 癸破巨陰貪 (祿 權 科 忌). Every school
agrees on 甲乙丙丁己辛癸. The contested cells:

| stem | reading | held by |
|---|---|---|
| 壬 科 | 天府 → `quanshu` | 《全書》 all three recensions; 王亭之 (web) |
| 壬 科 | 左輔 → `zuofu` | ★ Han (中州派), ★ 北派 (worked examples); 陸斌兆, 欽天門, iztro, the 《全集》 per zh.wikipedia (web) |
| 庚 科·忌 | 太陰·天同 (陰同) → `quanshu` | Wikisource 《全書》, ★ Han, ★ 第一冊; 陸斌兆, iztro (web) |
| 庚 科·忌 | 天同·太陰 (同陰) | 周宣屹 edition; «通行», 閩派 (天同不化忌) (web). A recension variant, settled in the register — **no value** |
| 庚 科·忌 | 太陰·天相 (陰相) → `tianxiang` | ★ 第七冊 占驗派, for the 忌 only — the passage states no 科, and the 太陰 科 is 《全書》's cell kept. 天同 takes no transform |
| 庚 科·忌 | 天同·天相 (同相) | 南陽堂 block; 吳師青's 鐵版神算 manuscript, and «北派» per web tables (web). **No value** — `tianxiang` moves the 忌 alone |
| 庚 科 | 天府 (陽武府同) | 王亭之's transmission (web); his teacher also left 陽武府相 |
| 戊 科 | 右弼 | 《全書》 and everyone but 王亭之 |
| 戊 科 | 太陽 | 王亭之 (web): 左輔 and 右弼, being 輔曜, never transform |

Not modelled: 王亭之's table (戊 and 庚), ☆ in `TODO.md`. The engine marks the
cell the declared tables part over (`ZiweiSeat.contested`) on whichever side is
in force.

**9. Minor stars (雜曜 záyào).** 《全書》 卷二 places: 天傷 (奴僕) and 天使 (疾厄);
天刑 (酉 by month) and 天姚 (丑 by month) — the only two rules the 十八飛星 shares,
word for word; 三台 / 八座 off 左輔 / 右弼 by day; 天哭 / 天虛 from 午 by year;
龍池 / 鳳閣 by year; 台輔 / 封誥 by hour; 紅鸞 / 天喜 by year; 解神 off the birth
year (= modern 年解); 截路空亡 by year stem; 旬中空亡 by the year's decade; the
博士 ring from 祿存; the 長生 ring by bureau; 命主 by 命宮 branch, 身主 by year
branch. Divergences found, none modelled:
- **天傷 / 天使** swap for 陰男陽女 in 中州派 (初級講義, web; iztro
  `algorithm: 'zhongzhou'`).
- **命主** off the year branch in iztro's 中州派 mode (program only; no text
  seen).
- **解神 off the month** (第六冊 p. 399) — a second star, not a reading of
  this one (decided 2026-10-07).
- **截空 / 旬空 正空 vs 傍空** by the polarity of the year (中州派, web).
- Stars 卷二 does not place — 恩光, 天貴, 天官, 天福, 天廚, 咸池, 孤辰, 寡宿, 華蓋,
  破碎, 天才, 天壽, 龍德, 天巫, 天月, 陰煞, 年支大耗, a separate 地空 — are what
  modern boards add; the 中州派 list runs to them and the 將前 / 歲前 rings.

**10. Brightness 廟旺 miàowàng.** 《全書》 卷二 closes on a seven-grade table:
廟, 旺, 得地, 利益, 平和, 不得地, 落陷; 21 stars graded, 18 in all twelve
branches, 祿存 / 擎羊 / 陀羅 in eight (they never reach the 四墓, or flank one
that does not). 卷三's coarse lists agree with it. Other schools use other grade
sets and tables (iztro ships its own and makes it configurable); none is
modelled, and a reader holding a modern table will see different grades.

**11. 大限 dàxiàn.** Age = the bureau's number; ten years a palace; 陽男陰女
forward, 陰男陽女 back. **Where it opens** → `daxian`:
- `adjacent` (default): 《全書》 「陽男陰女從命前一宮起…是父母宮，陰男陽女從命後
  一宮起…是兄弟宮」, three recensions.
- `ming`: ★ 捷覽 (1581, worked both ways), ★ 第六冊 p. 437. Also 中州派 —
  「大限由命宮起」 in the 初級講義, and 王亭之 calls the 「命前一宮…起大限」 of
  the «北派全書» a deliberate corruption that puts the limits ten years out
  (web transcriptions) — and iztro's code.
- The starting **age** is nowhere a sentence in 《全書》: it is induced from the
  bureau verses (二歲行 · 三歲遊 · 四歲花 · 五歲居 · 六歲奇), five of five on the
  南陽堂 block. The 捷覽 states it.

**12. 小限 xiǎoxiàn.** Age one at 辰 (寅午戌), 戌 (申子辰), 未 (巳酉丑), 丑
(亥卯未); men forward, women back, polarity ignored. 童限 for ages one to six on
命, 財, 疾, 妻, 福, 官. Universal as far as found.

**13. 流年 liúnián and below.** The year's 太歲 palace serves as that year's
命; 流祿, 流羊, 流陀, 流昌, 流曲, 流魁鉞, 喪門 / 白虎 / 吊客 / 官符, 斗君 dǒujūn
(from the 太歲 palace back by birth month, forward by hour → 正月 of the year)
for the months. 《全書》 卷二 places most of this; the engine **postpones** it
(`docs/sources.md` § "What is not here"). Whether 大限 / 小限 / 流年 change at
立春 or 正月初一 (iztro `horoscopeDivide`), and whether the 小限 turns at the
birthday (`ageDivide`), are further divergences nobody on the shelf states.

## 4. How a board is read

The engine stops at the board. What follows is what the sources teach; give it
**as theirs**.

### 《全書》 (and the 三合 line that keeps it)

- **身命 first.** 太微賦: 「大抵以身命為福德之本，加以根源為窮通之資」. The 命宮's
  stars and the 身宮's are the subject; 「身命最嫌羊陀七殺」.
- **三方四正.** A palace is read with its two trines and its opposite (命 with
  財帛, 官祿, 遷移): 「三方四正嫌逢殺」. An empty palace is read through the
  opposite (三合 and 中州 alike; 中州 calls it 借星安宮).
- **Seat and grade.** 「入廟為奇，失度為虛」. A 廟旺 star does its work; a 落陷
  one does it poorly or turns: 斗數準繩 「貪狼為善宿入廟不凶，巨門為惡曜得垣尤美」.
- **生剋.** The star's phase against the palace's branch phase:
  「辨生剋制化以定窮通，看好惡正偏以言禍福」 (斗數準繩), 卷二's 「金入火鄉…俱為
  受制」.
- **格局 géjú.** 卷一 defines them in one clause each. 富: 財蔭夾印, 日月夾財,
  財祿夾馬, 日月照璧, 金燦光輝. 貴: 日月夾命, 日出扶桑, 月朗天門, 輔弼拱主, 君臣慶會
  (紫微 with 左右 on 命), 府相朝垣, 紫府朝垣, 七殺朝斗, 日月並明, 明珠出海, 貪火相逢,
  科權祿拱, 坐貴向貴, 金輿扶駕. 貧賤: 生不逢時, 祿逢兩殺, 馬落空亡, 日月藏輝, 君子在野.
  Modern 三合 manuals add the star-group names: 殺破狼, 機月同梁, 紫府, 巨日, 火貪 /
  鈴貪, 羊陀夾忌, 石中隱玉.
- **The 四化 as qualities.** 祿 abundance, 權 command, 科 repute, 忌 obstruction;
  卷一's 「祿逢沖破，吉處藏凶」. 化忌 on 命 or its 三方 is the classic warning.
- **Limits.** 卷三: 「大小二限合身命逢殺，雖帝制也無功」; a weak 命 with good limits
  is 枯木逢春, a strong one with bad limits fades. 雜局 風雲際會: 「身命雖弱二限逢
  祿馬」. 論行限分南北斗: 北斗 stars weigh the first half of a limit, 南斗 the second
  (as 卷三 teaches; check the passage before quoting).

### 中州派 (王亭之)

- **星系**: the 144 combinations fixed by where 紫微 falls (紫微在子 … 在亥) are
  read as wholes, not star by star — «星系互涉».
- **輔佐**: 左輔, 右弼, 天魁, 天鉞 are 輔曜 (help from others) and 文昌, 文曲 佐曜;
  this is why, for 王亭之, the first group never transforms.
- **Layers**: 原局, then 大限 laid over it (the 大限 palace as 命, its 三方),
  then 流年 with 流曜, 斗君 for the month. A 吉 natal configuration is «triggered»
  by limits and years.
- 地盤 / 人盤 (iztro: 身宮, 福德宮 taken as 命) for further questions.

### 四化 / 飛星 lines (梁若瑜, 欽天門 蔡明宏, 河洛 方外人)

- 生年四化 is the 先天 frame; **each palace's stem flies its own 四化** into
  other palaces (宮干四化), and the reading is the traffic: which palace sends
  祿 or 忌 to which. 自化 (a palace's stem transforming a star in itself) is read
  as leaking. 化忌 is the axis: where it lands and what it 沖.
- ★ 中國絕學第五冊 (sheet 9, finding aid): 「南派重星之本質，北派重星之化氣」 —
  the 北派 counts about twenty-five stars, 「以主星為體，以化星為用」, against a 南派
  of 112.
- Timing: the 大限 palace's stem flies its 四化 over the natal board; a 流年 is
  read the same way. This is a modern school's method, and it should be named
  as such.

### For a consultant

Choose and say: the 命宮 and 身宮 first, then the theme's palace with its
三方四正, then the 四化, then the limits. The engine names no 用神-like focus
palace; choosing one is the reading's act (`docs/refusals.md` § 用神). Never date
an event from a 大限 or a 小限: the engine refuses it, and a consultant who does
it does it on their own account, naming the school.

## 5. Pitfalls

- **Reading it as a sky.** No planets, aspects or transits. 紫微 is not
  Polaris on this board.
- **«北派» means three things**: 王亭之 calls the 《全書》 line «北派全書» (web);
  方外人's circle calls the 四化 school 北派 and the star school 南派 (★ 第五冊
  sheet 9); 恭鑑老人's ★ 《紫微斗數 北派》 is a book. Web tables also give «北派» 庚
  同相, where the register reads that book as 陰同 — check which 北派 a source
  means before using it.
- **«全集» means two things.** The register uses it for the 十八飛星 work;
  Taiwanese usage and zh.wikipedia use it for a fourteen-star text whose
  四化訣 gives 壬 to 左輔 — plausibly 卷三–六 of the same six-juan book.
- **Two stars per name**: 《全書》's 解神 is modern 年解; its 天空 is the others'
  地空. Comparing against software without this produces false errors.
- **魁鉞 and 火鈴 transcription errors** in the Wikisource text (豬狗, 虎馬) and
  the 周宣屹 edition (午卯) are settled — do not «fix» the engine back.
- **Year boundary**: 紫微 software counts the lunar year; a 八字 board beside it
  counts from 立春. The two year stems differ for births between the dates.
- **Leap month**: three readings (§ 3.1); iztro splits by default, so a
  comparison against it must exclude leap months or set `fixLeap: false`.
- **Lunar date at 120°E**: a DST or wartime-clock birth near midnight moves the
  lunar day, and so 紫微 itself, against software that takes the civil date.
- **True solar time** moves the hour branch near a boundary; most Chinese
  software uses clock time. Say which was used.
- **Stems at 子 and 丑**: mod 12 then mod 10, never «two steps back».
- **Polarity of the year** decides 大限 direction; iztro reads the branch, the
  engine the stem — equivalent, but a hand calculation from the 立春 year under
  a 正月初一 board is not.
- **«The» 四化 table** does not exist: say whose. The prompt text currently
  says 《全書》's table regardless of `sihua` (§ 7).
- **Brightness tables** differ by school; quoting a modern grade against the
  engine's is comparing two books.

## 6. The engine and this art

`computeZiwei` in `packages/core/src/ziwei/index.ts`; tables in `tables.ts`,
names in `stars.ts`. Surfaces: `shipan ziwei`, `compute_ziwei` (MCP),
`/api/ziwei`, `/api/ziwei/{text,plate,prompt}`. A 命 instrument: `needs` asks
for a birth, no question.

| output field | doctrine (§ 4) |
|---|---|
| `lunar`, `countedMonth`, `hourBranch`, `yearPillar` | the inputs, with the leap month as counted |
| `minggongPillar`, `nayin`, `bureau` | 五行局 and the 大限's opening age |
| `palaces[].house / branch / stem` | the twelve palaces; the stem is what 飛星 lines fly — the engine does not fly it |
| `palaces[].stars[].star` (`elements`, `zhengyao`) | the fourteen, 六吉六煞, 卷二's 雜曜; phase per 卷二's list |
| `.brightness` | 卷二's seven grades, 21 stars |
| `.transform`, `.contested` | 生年四化 under `sihua`; `contested` marks the cell the declared tables part over |
| `palaces[].body`, `bodyBranch` | 身宮 |
| `lifeMaster`, `bodyMaster` | 命主 (命宮 branch), 身主 (year branch) |
| `majorLimit`, `minorLimitAge`, `childLimit` | 大限 under `daxian`, 小限, 童限 — only with `gender` |
| `changsheng`, `boshi` | the 長生 and 博士 rings — only with `gender` |
| `options` | the five parameters in force; the schools block derives from it |

Refused or not done, and where it is argued:
- 用神-like choice of palace, 格局 ranking, dating, advice — `docs/refusals.md`.
- 卷一's 格局 are computable and not yet computed (`docs/sources.md` § "What is
  not here").
- The flow-year layer (流曜, 斗君, 流年) — postponed, not refused.
- The 十八飛星 board, and any placement carried from it — `docs/refusals.md`.
- Per-palace and per-star verdict prose of 卷一–三 — declined.
- Reading: `docs/readings.md`, `docs/agent-prompt.md` (the 紫微斗數 bullet).

## 7. Open questions and candidate TODOs

- **王亭之's table** (戊 科 太陽, 庚 科 天府 · 忌 天同, 壬 科 天府; 輔弼 never
  transform). The web says it agrees with `quanshu` at 壬, which turns «named
  and unread» into one value moving 戊 and 庚. Settles: his 《安星法及推斷實例》
  (1986) or 中州派 初級講義. ☆ not on the shelf.
- **`leapMonth: split`**. 王亭之 and a 中州派 講義 hold it (web). Settles: the
  same 講義 — the one text that could lift a refused value in `TODO.md` § 1. Not
  on the shelf.
- **`leapMonth: current`**. No text found holding it. iztro's `fixLeap: false`
  is a program.
- **A third holder of `daxian: ming`** and a second of `huoling: hour`: the
  中州派 講義, `大限由命宮起` (web). Would add 中州派 to `heldBy`. Not on the
  shelf.
- **Is 《全集》 卷三–六 on the shelf?** Read the 全集's own 目錄 in
  `ziwei/shiba-feixing-…-juexue05.pdf` (pp. 240–305). If the fourteen-star
  juan are there with 「壬梁紫輔武」, `sihua: zuofu` gains a **transmitted**
  witness (a Qing block) where it now has two modern schools; if not, buy the
  集文書局 (1999) or 大元書局 (2012, 630 pp.) reprint. On the shelf, unread for
  this question.
- **★ 第五冊 sheet 14** prints 洛陽易源's 「本門正宗四化」 as a table and lists
  other schools' variants (戊 太陽化科, 庚 天府化科, 庚 天同化科 太陰化忌, 庚
  天相化忌, …; OCR, finding aid). Read on the plate: it names the holders of each
  cell. On the shelf.
- **天傷 / 天使 swap** for 陰男陽女 (中州派). A divergence between practitioners
  that changes two seats; needs the 講義's text, then a parameter. Not on the
  shelf.
- **命主 off the year branch** (iztro 中州 mode). Needs any text; likely a
  program's reading.
- **Flow-year boundaries** (大限 / 流年 at 立春 or 正月初一; 小限 at the birthday)
  — to declare when the flow layer is built, not before.
- **文光堂 recension** (心一堂) and 潘國森's collation: a fourth recension of
  《全書》. Worth buying only if a 《全書》 reading reopens.

## 8. Leads against the register

- **«《全集》» is filed as the 十八飛星 work only.** zh.wikipedia, a pixnet table
  and a bookseller-quoted survey treat 《紫微斗數全集》 as a fourteen-star text
  (四化 「壬梁紫輔武」, 「庚陽武陰同」), and describe the six-juan
  《十八飛星策天紫微斗數全集》 as 道藏 text in 卷一–二 plus fourteen-star material
  in 卷三–六. If so, Han's 「『全書』和『全集』」 pairing, read in the register as
  confirming the two classics, refers to that second half, and `sihua: zuofu`
  may stand on a block rather than on two modern schools.
- **Which recension reads 陰同 at 庚.** zh.wikipedia and the pixnet table give
  《全書》 同陰 and 《全集》 陰同; the register has the Wikisource 《全書》 reading
  陰同 and the 周宣屹 edition 同陰. The web's «全書» may be the 坊本 lineage the
  周宣屹 edition shares; worth one sentence in the register on which 全書 the
  web means.
- **北派 at 庚.** Web tables (pixnet, lius.cc) give 北派 「陽武同相」; the register
  reads 恭鑑老人's 北派 as 太陰 科 · 天同 忌 and gives 天相 to the 占驗派 of the
  same volume. Either the web conflates the two parts of 第七冊, or another 北派
  exists; check before `tianxiang`'s `heldBy` is cited outside the register.
- **王亭之 at 壬.** The register and `TODO.md` file 王亭之's departures at «戊,
  庚 and 壬» (from Han). Two web sources give his 壬 as 天府 — the 《全書》
  reading — so he would be a holder of `quanshu`'s contested cell, departing
  from 陸斌兆's table at 壬 rather than from 《全書》.
- **A second named holder for 同相**: 吳師青's 鐵版神算 manuscript, 「陽武同相」,
  per the xuanmen.com.cn 王亭之 article (web). That is the 南陽堂 reading (科
  天同), not `tianxiang` (科 太陰): it would hold `tianxiang`'s 忌 cell only.
- **「辨生剋制化以定窮通」**: the register's five-phases section gives it to the
  太微賦; the Wikisource 卷一 prints it in 斗數準繩 (太微賦 has 「須明其生剋之要」).
  A one-word attribution fix, if the plate agrees.

## 9. Bibliography

### Chinese

- 《紫微斗數全書》, Wikisource, https://zh.wikisource.org/wiki/紫微斗數全書 —
  juan structure, 卷一 fu, 格局 definitions quoted in § 4.
- ★ The shelf's 《全書》 recensions, 捷覽, 續道藏, 全集 and 中國絕學 volumes — via
  `docs/sources.md` and `texts/README.md`, which this file follows.
- ★ 《中國絕學》第五冊, OCR extract `texts/ziwei/.txt/shiba-feixing-…-juexue05.txt`,
  sheets 9 and 14 — 南派/北派 definition, 洛陽易源's other-schools list (finding
  aid only).
- 紫微斗數, zh.wikipedia, https://zh.wikipedia.org/zh-tw/紫微斗數 — dates
  (1550 preface, 1581, 1607), schools, 四化 by 全集 vs 全書.
- 王亭之, zh.wikipedia, https://zh.wikipedia.org/wiki/王亭之 — dates,
  bibliography, teacher.
- 「王亭之谈星（03）」, xuanmen.com.cn, https://www.xuanmen.com.cn/archives/1105.html
  — 庚 readings by holder, 輔弼 不化, 閏月 split, «北派全書» 大限 (web).
- 中洲派初階講義（四）, pixnet, https://vlee0610.pixnet.net/blog/posts/3036341986
  — 中州派 plotting: 大限 from 命宮, 火鈴 by hour, 四化, 閏月, 天傷天使 swap (web).
- 紫微斗數 不同版本的四化表, https://abonk68.pixnet.net/blog/posts/11401252024 —
  四化 by 全集/陸斌兆/欽天, 全書/閩派, 王亭之, 北派 (web).
- 紫微斗數源流考, 鼎稔道學館, https://lius.cc/n/custom/紫微斗數源流考_… — editions,
  preface forgery, schools and lineages, caveats on self-accounts (web).
- 紫微斗數源流考, starkami.com, https://starkami.com/articles/history-of-ziwei —
  modern bibliography (梁湘潤, 紫雲, 陸斌兆, 王亭之) (web).
- 王亭之谈斗数, dushu.com, https://www.dushu.com/guoxue/105517/1146555.html —
  閩派 天同不化忌; 中州派 vs 閩派 (web).
- 陳昭吟, 〈道經中署名羅洪先之著作考辨〉, 《成大中文學報》75 (2021): 33–74,
  https://lawdata.com.tw/tw/detail.aspx?no=459393 — the 全書 preface not 羅洪先's.
- 廖維駿, Fo Guang University thesis on Tang–Song sources of 《全書》,
  https://ndltd.ncl.edu.tw/r/5eq57j — 羅洪先 preface under 陳摶's name (abstract).
- 潘國森 on the 文光堂 woodblock, eslite listing
  https://www.eslite.com/product/1001265462788357 — a further recension (blurb).
- 十八飛星策天紫微斗數全集精鈔本 listings (books.com.tw 0010538169, sanmin) —
  six juan, 同治九年 base (blurb).
- iztro 2.6.3 (npm, MIT), `lib/data/types/astro.d.ts`, `star/location.js`,
  `astro/palace.js`, `astro/astro.js` — its options (`yearDivide`,
  `horoscopeDivide`, `ageDivide`, `fixLeap`, `algorithm: 'zhongzhou'`), 大限
  from 命宮, 天傷天使 swap, 命主 by year, 地盤/人盤. A program, not a witness.

### English

- Ho Peng Yoke, *Chinese Mathematical Astrology* (Routledge 2003), pp. 74–77,
  as cited in *Mediterranean Archaeology and Archaeometry* 16.4 (2016),
  https://www.maajournal.com/index.php/maa/article/download/743/670/1302 — the
  board as numerological, not astronomical.
- ★ Aloysius Han, *Zi Wei Dou Shu*, 5th rev. (2014) — via `docs/sources.md`.
- Zi Wei Dou Shu, en.wikipedia, https://en.wikipedia.org/wiki/Zi_Wei_Dou_Shu —
  general; attribution to 陳摶 unverifiable.
- Calvin Yap (2020), Y.M. Lim (2013), Hieu Nguyen Minh — practitioner books,
  listings on goodreads / MIT Press bookstore; not read.
