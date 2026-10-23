# 七政四餘 qīzhèng sìyú — the board `qizheng`

Written 2026-10-23. Rules of the project are in `CLAUDE.md`; the parameters in
`docs/parameters.md` and `packages/core/src/parameters.ts`; what is established
on the plate in `docs/sources.md` § "七政四餘 — the board whose numbers come
from the sky" and its rows in `docs/sources.tsv`. This file does not restate
them. Every quotation marked *(web transcription)* is a finding aid taken from
a web text (mostly zh.wikisource's 四庫 and 集成 transcriptions); it locates a
passage and moves no rung.

## 1. What the art is

A natal astrology on the real sky. It places the seven governors 七政 (太陽
tàiyáng, 太陰 tàiyīn, 水 金 火 木 土) and four remainders 四餘 (羅睺 luóhóu,
計都 jìdū, 月孛 yuèbèi, 紫氣 zǐqì) in two frames at once — the twenty-eight
lodges 二十八宿 èrshíbā xiù with their degrees 宿度 xiùdù, and the twelve
palaces 宮 gōng / stations 次 cì — finds the life palace 命宮 mìnggōng from
the Sun and the birth hour, numbers the twelve 人事宮 rénshìgōng from it, and
reads a life and its periods 限 xiàn. Its question is **a birth** (命 in
`instruments.ts`'s terms); the same apparatus was also used for 擇日 (天星擇日)
and for a year's 流年, which the engine does not lay.

History, attributed:

- c. 785–805: 李彌乾 Lǐ Míqián, «from 西天竺», brings the 都利聿斯經
  dūlì yùsī jīng; 璩公 Qú Gōng translates it (新唐書 藝文志, via Kotyk SPP 282
  p. 18). Mak 2014 and Kotyk identify it as Dorotheus of Sidon, probably by a
  Pahlavi recension. Kotyk: the eleven bodies arrived *with* this
  transmission, 紫氣 and 月孛 included; Mak: the four 餘 were a later
  development on the 聿斯 basis. Two readings, unsettled.
- c. 806: 曹士蔿 Cáo Shìwèi's 符天曆 and 羅計二隱曜立成曆; per Kotyk (after
  Yano 1986) 曹 reassigns 計都 to the lunar apogee in a navagraha context,
  which is why the 七曜攘災決 qīyào rǎngzāi jué (T 1308, 806–865) gives 計都
  the apogee's 62 years / 7 revolutions.
- 852: 杜牧 Dù Mù's self-written epitaph reads his own chart in palaces
  (§ 3.5). 975: Dunhuang P.4071, a horoscope by 康遵 Kāng Zūn (Niu Weixing
  2016; Kotyk) — 羅睺 already at the descending node, 身 at the descendant.
- Song: 沈括 夢溪筆談 卷七 and 洪邁 容齋五筆 卷二 equate 羅睺 with 交初 and
  計都 with 交中. 元: 鄭希誠 Zhèng Xīchéng of 安固 (Wenzhou), whose 星案 are
  printed in 張果星宗 (陸位's preface: 「至元時，浙溫之安固鄭希誠氏…」, 集成
  卷584, *web transcription*).
- 1563: 萬民英 Wàn Mínyīng's 星學大成; Ming 陸位 Lù Wèi's 張果星宗; Ming
  official 七政曆 printed the four 餘 (楊慎 丹鉛總錄 卷一: 「今七政厯亦有四餘
  躔度」, *web transcription*).
- 1645–1670: 湯若望 Tāng Ruòwàng's reform swaps 羅計 and drops 紫炁;
  吳明炫 Wú Míngxuàn and 楊光先 Yáng Guāngxiān attack it; 南懷仁 Nán Huáirén
  has 紫炁 removed from the 七政曆 from 康熙九年 (1670) (清史稿 卷45, 卷272,
  *web transcription*). The 星命家 kept the old law.
- 1941: 曹仁麟 Cáo Rénlín's 星度指南, with a worked 1886 board — the engine's
  anchor for 紫氣 and its holder for `luohou: descending`.

## 2. Texts and lineages

★ on the shelf (`texts/README.md`); ☆ wanted and not held (`TODO.md`, or the
"Still missing" list of `texts/README.md`).

**Primary compilations**
- ★ 《星學大成》, 明 萬民英, preface 1563, 三十卷; SKQS vol. 809 from p. 285
  (`bazi/siku-quanshu-809-mingshu-xiangshu.djvu`, djvu page = volume page +
  5). Read in part (register § 《星學大成》…). Its juan map, from the
  zh.wikisource 四庫 text (*web transcription*, a finding aid for the plate):
  卷一 frame, 化曜 (十干變曜), 廟旺, 祿勳/貴人/文星/魁星; 卷二–三 神煞 and
  運限起例; 卷四 星盤或問 and 琴堂五星總斷 with 看星節要八十一條; 卷五 宮度主用,
  陳都憲十二宮安命論, 二十八宿坐命; 卷六 安命論, 身命宮, the twelve palaces,
  三日宮, 胎元宮; 卷七 the limits (百六, 洞微, 竹羅三限, 童限) and the
  versified 西天聿斯經; 卷八–九 指金虛實五星; 卷十 耶律 星命秘訣, 高麗國師賦;
  卷十四–二十二 三辰通載; 卷二十六 碧玉真經; 卷三十 論身宮, 起太陽法. The 提要
  records 書目 attributing it to 陸位 and settles on 萬民英.
- ★ 《張果星宗》 (also 《果老星宗》 guǒlǎo xīngzōng; separately printed as
  《新編評註通玄先生張果星宗大全》, 明 陸位 編), as 古今圖書集成 藝術典 星命部
  彙考三–二十 (卷567–584ff.), five DjVu volumes 第468–472冊. Contents by the
  集成's 卷目錄 (*web transcription*): 卷567 張果星宗一 入門起例 (安命度法,
  十二宮例, 定限度法, 小限, 童限, 宮主/度主, 強弱宮, 度數所在過宮圖, 諸曆黃道
  宿度圖); 卷568 二 變曜 and the 天干化曜星例 table; 卷569 三 行限度法 and
  **欽天監校正授時過宮度圖**; 卷570–577 doctrine (通元賦, 觀星要訣, 宮度主論,
  身度主論, 星盤或問); 卷578–581 三辰通載 and the eleven 算法; 卷582 洞微百六
  限; 卷583 倒限, 流年, 命身/命度/身度/限度; **卷584ff. 鄭氏星案**, worked
  boards with commentary. Read on the plate so far: the three 卷目錄 and the
  算法 leaves (register § 四餘).
- ★ 《三辰通載》: inside both of the above (星學大成 卷十四–二十二; 張果星宗
  十二–十五). 張果星宗 introduces it as a book with 「各卷經義，乃入門淺近之書，
  於果老有發明」 — an incorporated work, but one text in two compilations.
- ★ 《星度指南》, 曹仁麟, preface 1941 (`qizheng/xingdu-zhinan.pdf`; with
  plates in `xingdu-zhinan-guolao-xingzong-hebian.pdf`). 第七篇's 1886 board;
  the 同治甲子黃道新尺歌 (epoch 1864).
- ★ 《御定五星精義》 and 《星平集腋統宗》 (1832), 故宮珍本叢刊 第423冊
  (`wuxing-jingyi-xingping-jiye-gugong.pdf`).
- ★ 《星命溯源》 (不著撰人, p. 45) and 《星命總括》 (舊題 遼 耶律純, p. 191) —
  in the same SKQS vol. 809, filed under `bazi/`; not yet read for this board.
- ★ 古今圖書集成 星命部 also carries 琴堂指金歌 (卷590) and 三命通會 (卷593ff.).
- 《星平會海》 xīngpíng huìhǎi, ten juan, 五星 in 卷一–五 and 子平 in 卷六–十;
  千頃堂書目 records a self-title 「武當山玉虛宮三逢甲子日金山人編集」; modern
  reprints credit 水中龍. Not held; a modern article reconstructs its charts
  (翁正春, 李廷機 …) under several frames.
- 《靈臺經》 (DZ 288, Tang–Song) — 東出 for the ascendant, 飛配 for lots, 行年
  profections; 《七曜攘災決》 (T 1308); 《梵天火羅九曜》 (T 1311); 《宿曜經》.
  Not held; reached through Kotyk.
- ☆ 《元史·曆志》 (授時曆經: 黃道宿度 and 黃道十二次宿度); ☆ 劉定之 《雜志》;
  ☆ 《儀象考成》 卷十七–三十; ☆ 《清史稿·時憲志》 (named in the "Still missing"
  entry for the 時憲 table).

**The frame's sources** — ★ 《授時曆故》 黃宗羲; ★ 《欽定儀象考成》 卷一–十六;
★ 《曆法通志》 朱文鑫 1934; ★ 《中國恆星觀測史》 潘鼐; ★ 《中國古代天文與
曆法》 陳久金·楊怡. All in `lifa/`.

**Modern manuals** — ★ 楊國正 《七政四餘論命術講義》 (reprints the 集成's
wording); ★ 飛朱 course notes (2016); ★ 天星擇日 notes (daily rates for all
eleven); ★ 《七政四余（全）》 (a documented negative, garbles 月孛 and the
nodes). Software: MOIRA, which offers 黃道今制, 黃道古宿, 調整歲差後宿 and an
赤道恆星制 it names 鄭氏恆星制 (sohu 2015, *web article*).

**English scholarship** — Kotyk, SPP 282 (2018), the best single survey, with
dissertation (Leiden 2017), *Asia Major* 30 (2017), *JCBS* 30 (2017); Mak,
SCIAMVS 15 (2014) on 聿斯經 and its versified 西天聿斯經; Niu Weixing (Brill
2016) on P.4071; Yano, *Centaurus* 29 (1986) on the 攘災決's ephemerides, and
Kūšyār's *Introduction* (1997) behind the 明譯天文書. Ho Peng Yoke's *Chinese
Mathematical Astrology* (2003) treats the 三式 and **not** 七政四餘. Chinese:
饒宗頤 「論七曜與十一曜」 (1984); 鈕衛星 on the 十一曜 cult (世界宗教研究 2012);
余欣 on 羅睺·計都 in Dunhuang (2011); 廖暘 on the 四餘 in 熾盛光 iconography
(敦煌研究 2004); 陳萬成 「杜牧與星命」; 葛曄婧 on P.4071 (敦煌研究 2025).

## 3. How a board is laid (起例)

### 3.1 The bodies

Seven governors from the ephemeris. Remainders:

- **羅睺 / 計都** — the two lunar nodes, mean. Which is which:
  - descending = 羅睺 (火餘), ascending = 計都 (土餘): the 星命家 from the
    late Tang. P.4071 (975) already so (Niu; Kotyk calls it anomalous). 沈括:
    「西天法羅睺、計都，皆逆步之…交初謂之羅睺，交中謂之計都」; 洪邁:
    「交初者，星家以為羅睺。交中者，計都也」; 宋濂 鑾坡集 「蝕神首尾也，又謂之
    交初、交中」 (all *web transcription*). 星度指南 1886 board (register).
  - ascending = 羅睺: India (Rāhu = north node), and 湯若望's 時憲:
    清史稿 卷45 「四餘刪改，羅睺即白道之正交，計都即中交，月孛乃月行極高之點。
    至紫炁一餘，無數可定…今俱改刪」; 吳明炫's charge 「顛倒羅計」 (卷272);
    集成 曆法典 卷55 「正交亦曰羅睺，亦曰天首…西曆謂之龍頭」 (*web
    transcription*).
  - Engine: `qizheng.luohou: descending` (default) | `ascending`.
- **月孛** — lunar apogee, mean. Before 曹士蔿's reassignment the apogee was
  計都 (攘災決). Engine: fixed, `SE_MEAN_APOG`; no parameter.
- **紫氣** — no referent (「在天無象」, 張果星宗's own 總論). Rate: 一年一宿
  (28 yr) in the 算法 of 張果星宗/三辰通載 (大數 10228); 29 yr in the 星曜行度
  table (張果星宗一, 卷567; 集成 卷565–577 leaf; **星學大成 卷一 「炁曜二十九年
  一周天」**, where 「一年一宿，二十八年一周天」 is said of **土星**; *web
  transcription*). Rationale: 「炁生於閏，二十八年十閏而炁行一周天」 (楊慎;
  章潢 圖書編 卷21; 邢雲路 古今律曆考 卷28); 新法算書 卷31 objects that ten
  intercalations take under twenty-seven years. Engine: `qizheng.ziqi:
  yinianyisu` (palace only) | `off`.
- Mean vs true: the texts transmit mean motions (天星擇日's daily rates;
  三辰通載 平行). Not modelled — the engine is mean by design.

### 3.2 The frame: 宿 and 宿度

A 宿 begins at its 距星 jùxīng. Who lays which frame:
- the stars at the instant — the engine's own, `xiudu: juxing` (default;
  `heldBy: engine`);
- 授時 黃道宿度 at 至元辛巳 (1281) carried by 授時曆故's method —
  `xiudu: shoushi`; the table is also in 元史 卷54 (*web transcription*,
  「右黃道宿度，依今曆所測赤道准冬至歲差所在算定…據歲差每移一度，依術推變，
  各得當時宿度」), with **參 十度二十八分**;
- 時憲/崇禎 table — `xiudu: shixian`, refused. 明史 卷25 天文志 prints the
  崇禎 黃道宿度 in 360° and 60′ — with 參 before 觜 — and 黃道交宮宿度 for
  **崇禎元年 (1628)**, an epoch (*web transcription*);
- the 星命 manuals' own rulers: 星學大成 卷一 約二十八宿度數歌 (rounded,
  equatorial-looking widths), 星度指南's 同治甲子 新尺 (1864), 張果星宗一's
  諸曆黃道宿度圖. Modern software: 黃道今制 / 黃道古宿 / 赤道恆星制.

觜 zī and 參 shēn: 距星 φ¹/δ Ori (Song 天文志, 潘鼐) or λ/ζ Ori (儀象考成
1752, the engine). Precession put φ¹ east of δ after the 13th c.; the
Jesuits printed 參 before 觜 (明史 卷25 still does); 吳明炫 counted 「顛倒觜參」
among 湯若望's errors. Recorded, no parameter.

### 3.3 The twelve palaces and the 次

Branch, 次 and Western sign: 子 玄枵 xuánxiāo (寶瓶), 丑 星紀 xīngjì (摩羯),
寅 析木 xīmù (人馬), 卯 大火 dàhuǒ (天蠍), 辰 壽星 shòuxīng (天秤), 巳 鶉尾
chúnwěi (雙女), 午 鶉火 chúnhuǒ (獅子), 未 鶉首 chúnshǒu (巨蟹), 申 實沈 shíchén
(陰陽), 酉 大梁 dàliáng (金牛), 戌 降婁 jiànglóu (白羊), 亥 娵訾 jūzī (雙魚)
(星學大成 卷一 定十二宮次舍). Where a palace begins:
- at the 中氣 zhōngqì (春分 opens 降婁): `gong: zhongqi`, default. 明史 卷25
  names this the **西洋之法**: 「西洋之法，以中氣過宮…於是宮無定宿…此變古法
  之大端也」; before it 「宮有一定之宿，宿有常居之宮…宮與星仍舊不易」 (*web
  transcription*). Kotyk (SPP 282 p. 24) instead dates a 中氣-cut tropical
  zodiac to c. 806. The two disagree.
- at fixed lodge degrees: `gong: ci`, refused. 授時 黃道十二次宿度 — 星學大成
  卷一 宿度過宮之圖 (nine cells read, three bounded) and its verse 約二十八宿
  過宮度數歌 (「氐一過卯尾三寅…張十四巳軫九辰」, rounded); 元史 卷54; 張果星宗
  三's 欽天監校正授時過宮度圖 (an image; plate only).
- modern 赤道恆星制: palaces fixed to the stars, equinox drifting into 亥.
  Not modelled; it is the `ci` idea under a modern frame.

### 3.4 The 命宮

- **立命 by 加時** — the birth hour laid on the Sun's palace, counted to 卯:
  星學大成 卷三 起立命; **張果星宗一 安命度法** 「以生時加太陽宮，順數遇卯，即是
  命宮也。如太陽在子宮，酉時生人，以酉時加在子宮，順數到午遇卯即是命宮也。蓋日出
  在卯」 (集成 卷567, *web transcription*). Engine: `minggong: yuejiang`
  (`heldBy: xingxuedacheng, santong`). 星學大成 卷四 看星節要 writes 「以生時
  加在太陽度上**逆數**至卯」 for the same act — the wording differs, the count
  does not; do not read it as a second rule.
- **命度** — a degree for the 命: the Sun's degree read across the 量天尺
  liàngtiānchǐ: 「以太陽之度對著命宮之度，即是命度也。如太陽躔子宮虛六度，對著
  午宮星五度」 (張果星宗一); 星學大成 卷三 「以量天尺對立命躔何宿第幾度」; 臺曆
  「立命專考對度…余命太陽在斗十九對度是張一」 (卷六). Not modelled
  (recorded with no parameter).
- **by the actual sunrise** — 萬民英 卷六 安命論: the Sun rises at 卯 only
  roughly; 「冬至後十九日…出辰初初刻，夏至後十五日…出寅正四刻」, so 「凡日出
  卯時則立命在卯，若出寅辰則立命當在寅辰」 (*web transcription*). The nearest
  text on the shelf to `minggong: ascendant` (refused, "a holder").
- **ascendant degree** — modern practice; `minggong: ascendant`, refused.
  Kotyk: Chinese horoscopy never used ascensional times; 靈臺經 has 東出 for
  the ascendant without a computing rule.

### 3.5 The twelve 人事宮

命宮, 財帛 cáibó, 兄弟 xiōngdì, 田宅 tiánzhái, 男女 nánnǚ, 奴僕 núpú, 妻妾
qīqiè (夫妻 fūqī in the engine), 疾厄 jíè, 遷移 qiānyí, 官祿 guānlù, 福德
fúdé, 相貌 xiàngmào — counted against the branches. Stated: 星學大成 卷三
「逆數右轉」; **張果星宗一 十二宮例** 「凡定十二宮者，逆數輪轉。如命宮在寅，財帛在
丑，兄弟在子，田宅在亥…」 (集成 卷567); and **杜牧 自撰墓誌銘** (852):
「予生於角，星昴畢於角為第八宮，曰病厄宮，亦曰八殺宮…木在張於角為第十一福德宮」
(*web transcription*) — 角 in 辰, 昴畢 in 酉: 辰→酉 is eighth only counting
against the branches. Engine: fixed, `HOUSES`. 強宮 (命 財 田 男女 妻 官 福,
seven) and 弱宮 (兄 奴 疾 遷 貌, five) per 琴堂/張果星宗.

### 3.6 身宮 shēngōng

Not modelled; recorded in `TODO.md` with two readings, and there are four:
- the Moon's palace: 張果星宗一 「月為身星…月躔某度即身之度主也」; 「諸星家
  俱以太陰為身」 (星學大成 卷四); 星學大成 卷三十 論身宮;
- the degree facing the 命: 萬民英 in 星盤或問 (卷四; the same dialogue is
  張果星宗十一, 集成 卷577 — one text twice);
- 太陰數至酉, the hour laid on the Moon's palace counted to 酉: 星學大成 卷六
  論身宮主星歌 and note, 「余世家之學每每頼此」;
- the descendant, in P.4071 (Kotyk p. 81); 萬民英 records Sun/Moon vs
  ascendant/descendant conventions (SKQS 809: 398b, Kotyk).

### 3.7 Rulers: 宮主, 度主

宮主 gōngzhǔ (the Hellenistic domiciles): 子丑 土, 寅亥 木, 卯戌 火, 辰酉 金,
巳申 水, 午 日, 未 月. 度主 dùzhǔ, by the lodge's 禽星 day: 角斗奎井 木, 亢牛
婁鬼 金, 氐女胃柳 土, 房虛昴星 日, 心危畢張 月, 尾室觜翼 火, 箕壁參軫 水
(張果星宗一 入門看法, *web transcription*; neither table has a register
entry). 星學大成 卷四: 「須是以度主為要，
宮主次之。葢宮主者州郡也，度主者縣令也」. 命主 = 宮主 of the 命宮; 命度主 =
度主 of the 命度; 身主 likewise. Not computed by the engine; derivable from
`palace` and `lodge`.

### 3.8 化曜 huàyào (十干變曜)

By the year stem. 星學大成 卷一 變曜歌訣 and 張果星宗二 (identical; *web
transcription*, no register entry — a lead to read on the plate):
「祿暗福耗蔭貴刑印囚權」 against 「火孛木金土月水炁計羅」, the stem 甲 starting
at 火, 乙 at 孛, and so on:

| 年干 | 祿 | 暗 | 福 | 耗 | 蔭 | 貴 | 刑 | 印 | 囚 | 權 |
|---|---|---|---|---|---|---|---|---|---|---|
| 甲 | 火 | 孛 | 木 | 金 | 土 | 月 | 水 | 炁 | 計 | 羅 |
| 乙 | 孛 | 木 | 金 | 土 | 月 | 水 | 炁 | 計 | 羅 | 火 |
| 丙 | 木 | 金 | 土 | 月 | 水 | 炁 | 計 | 羅 | 火 | 孛 |
| 丁 | 金 | 土 | 月 | 水 | 炁 | 計 | 羅 | 火 | 孛 | 木 |
| 戊 | 土 | 月 | 水 | 炁 | 計 | 羅 | 火 | 孛 | 木 | 金 |
| 己 | 月 | 水 | 炁 | 計 | 羅 | 火 | 孛 | 木 | 金 | 土 |
| 庚 | 水 | 炁 | 計 | 羅 | 火 | 孛 | 木 | 金 | 土 | 月 |
| 辛 | 炁 | 計 | 羅 | 火 | 孛 | 木 | 金 | 土 | 月 | 水 |
| 壬 | 計 | 羅 | 火 | 孛 | 木 | 金 | 土 | 月 | 水 | 炁 |
| 癸 | 羅 | 火 | 孛 | 木 | 金 | 土 | 月 | 水 | 炁 | 計 |

The Sun takes no 化曜. Each 化 «belongs» to a palace (管庫星): 祿→官祿,
暗→相貌, 福→財帛·福德·遷移, 耗→兄弟, 蔭→妻妾, 貴→男女, 刑→奴僕, 印→田宅,
囚→疾厄, 權→命宮. 萬民英 explains the cycle as 十神 (化福 = 食神, 化刑 = 七煞,
化囚 = 梟印 …), «余故作此圖» — his own rationale. Also stem-indexed: 天元祿
(化祿 of the 五虎遁 stem on the 命宮), 地元祿, 人元祿, 天經地緯, 文星, 魁星,
官星, 印星, 催官, 祿神 … (張果星宗二). Not modelled. Year boundary for these:
星學大成 卷四 「凡大小限以生日後交，神煞祿貴以冬至日後交」; whether a stem
turns at 立春 or 冬至 is a divergence nobody declares.

### 3.9 Dignities

廟 miào, 旺 wàng, 樂 lè, 喜, 垣 yuán, 殿 diàn, 入垣·升殿·廟旺·喜樂·貴格·賤格
charts (星學大成 卷一 leaves 5–8; 張果星宗一). 七政旺宮星度歌: 日 白羊十九
(婁八), 月 金牛三, 土 天秤二十一, 火 磨羯四與七, 水 雙女三與五, 金 雙魚 (室七,
十三), 木 巨蟹初 (鬼) — Hellenistic exaltations for three, displaced for four.
Exaltations and falls are mostly stated in **lodge degrees** (Kotyk p. 53).
Not modelled.

### 3.10 神煞

Three families (張果星宗一 入門看法): 天星 星 (化曜, 文魁, 祿元 …), 地曜 煞
(祿勳, 歲駕, 天乙, 玉堂, 陽刃, 劫殺 …, by year stem or branch), 流年 變曜 (星學
大成 卷三 流年十二變曜: each year the five planets and Sun/Moon take 太歲,
喪門, 白虎 … by the year branch, **changing at 冬至**). 空亡 by the 旬 of the
pillars, 實 by the four branches 填 into palaces — the 琴堂 method reads the
board through the pillars. Not modelled.

### 3.11 限 xiàn and 度主 of the limit

- 大限: from the 命宮 through 相貌, 福德, 官祿, 遷移, 疾厄, 妻妾, 奴僕, 男女,
  田宅, 兄弟, 財帛 (順數左旋), holding 15, 10, 11, 15, 8, 7, 11, 4½, 4½, 4½,
  5, 5 years = 100½, 「百六」 (星學大成 卷三, 卷七; 張果星宗一 年分訣). Start
  age set by the 命度's place in its palace — 11 to 20 (張果星宗一 定限度法;
  星學大成 「交三度起一歲」, 「九歲以前在童限」). 「命宮十五年者乃古之法，則不可
  拘執」 (張果星宗). 洞微限, 竹羅三限 and 百六 variants: 卷七.
- 限度: the lodge the limit is passing through; its 度主 is the limit's ruler
  (張果星宗十六 限度主論; 卷583 限度).
- 小限: one palace a year against the branches, from the 命宮 at the birth
  year (星學大成 卷三; 張果星宗一 「以生年支加在命宮，逆數至太歲宮」), turning
  at the birthday. 月限 from the 小限. 童限 before the 大限 (張果星宗 says the
  小限 and 童限 「未聞果老言也，惟鄭希誠…」).
- Engine: none of it. The order is the check on the 人事宮 direction.

## 4. How a board is read

Attribute every step: «by 星學大成's 看星節要», «as the 琴堂 reads it».

**The order of inspection (星學大成 卷四 看星節要, with 琴堂五星總斷):**
1. Day or night birth. 晝 births dread 火 金 月 孛 羅 on the 命; 夜 births
   日 木 土 炁 計 — 「五殘星」. Sect from the 都利聿斯經 as quoted by 萬民英:
   「夜生忌土，晝忌火」 (SKQS 809: 569, via Kotyk).
2. The 命: palace, 命度, 度主 before 宮主; what stands in it, then 三方四正
   (三合 trine, 對照 opposition, 四正照 square, 夾 flanking, 拱).
3. The 身 and the 身主; 晝 births weigh the 命度主, 夜 births the 身度主
   (看星節要).
4. 福德 first among the others, then 財帛, then 田宅 (看星節要).
5. 天元祿主 and the 化曜 for 官·福·田·財; 祿勳, 貴人, 驛馬 in the pillars.
6. 空亡 and the pillars' 實 (琴堂: 「其玄妙只在空實二字，其禍福只在夾拱二字」).
7. The limits and the 流年: 「命好不如限好」; 命 魂, 身 魄, 限 血氣. A limit
   is good when 向明 (夜 births with 火 金 月 on it, 晝 births 日 木 土 水 炁).
8. 得令: 春木 夏火 秋金 冬水, 土 寄旺四季 — a ruler in season is strong.

**The 琴堂 ladder (括蒼 季宗舒):** 身命二主 → 人品; 福祿恩官田財六主 →
貴賤貧富; the eleven and the 神煞 守命安身 → 性行; 大小二限, 太歲, 流旬 →
timing. Its twenty words: 恩 (生), 煞 (剋), 制, 化, 氣, 體 (原守), 用 (流行),
星, 曜, 原, 流, 強, 弱, 空, 實, 拱, 夾, 衝, 合, 貼.

**Strength.** 廟旺 and 入垣/升殿; 順 against 逆/留/伏 (「五星留逆最不祥」,
卷一); 強宮 vs 弱宮; in season; 生 by the palace (樂鄉) vs 剋 by it (刑傷)
(卷一 論廟旺尅忌歌). 恩·用·仇·難 are the house terms for the stars that
generate, serve, oppose and attack the 命主; the precise definitions differ
by text — read 張果星宗十 宮度主論 / 生殺星論 (集成 卷576, on the shelf)
before stating them, and say whose.

**Bodies, as the compilations give them** (Kotyk's survey of 星學大成): 太陽
father, 太陰 mother and the 身; 金 wife (男命), 木 sons, 土 and 火 the
malefics by sect; 紫氣 「天乙…吉曜」, the chief benefic, wood's remainder;
月孛 「少與人福，多與人禍」, harm to sons, promiscuity in women's charts;
羅睺 「元是貴權星」, 天首, 蝕神 — fortunate in 寅卯午 (卷二十一); 計都 天尾,
like 羅 variable; 計孛 together on the 身 「切忌行船渡水」 (卷二十六); 羅/計 on
日月 「損尅父母」 (卷六). 日月 with 羅計 at 朔望 are 「蝕神」 configurations.

**Timing.** 大限 by palace and 限度主; 小限 and 月限; 太歲 «吊起» its
三合 (看星節要: 「太歲能吊起三方之星」); 流年 變曜 from 冬至; 流星 (the
transiting eleven) against the natal. Outcome dating (death year from a
malefic in the eleventh by sect, 卷七 p. 417) is doctrine to quote, never to
compute.

**What the engine refuses and the consultant may give, signed**: the 用神
of a board, a ranking of palaces, an outcome date. Say which text and that
the engine laid only the geometry (`docs/refusals.md`).

## 5. Pitfalls

- **羅睺 from Rahu.** Indian Rāhu is the north node; the 星命 羅睺 is the south
  (`luohou: descending`). Modern dictionaries (漢典) assert «印度天文學把降交點
  叫做羅睺» — wrong for India and right only for the Chinese 星家.
- **正交 changed meaning.** In the 授時曆 the 交周 opens on 陽曆 (陽曆食限 6度,
  陰曆 8度 shows 陰曆 = north, by parallax), so 授時's 正交/交初 is the moon
  going south — the descending node — and 星家 羅睺 = 交初. The Qing 曆象考成
  makes 正交 the 龍頭, ascending. «羅睺即正交» therefore names opposite nodes
  in Yuan and Qing usage. (Derivation here, from the eclipse limits; not a
  quoted gloss.) 天首/天尾 moved with the names too, so 星學大成's «羅㬋號天首»
  settles nothing.
- **The 度 is ¹⁄₃₆₅.₂₅**, the 宮 three-hundred-and-sixtieth only after the
  Jesuits; 明史's 崇禎 table is in 360° and 60′, the 授時's in 365.2575 度 and
  100 分. Mixing them made 紫氣 look like two rates (register § 四餘).
- **Mnemonic layers are not ephemerides.** 「九年一周天」, 「十八年」, 「二十九
  年」 are the 星曜行度 table; the 算法 大數 are the working constants. One
  work carries both.
- **一年一宿** in 星學大成 卷一 is Saturn's, not 紫氣's.
- **Two lodge orders.** Jesuit and 明史 tables print 參 before 觜.
- **Equatorial vs ecliptic widths.** A table of 赤道 widths (the 果老 vendor
  article, 潘鼐 表71, 約二十八宿度數歌) is not a 黃道 frame; up to 9° apart for
  lodges far from the ecliptic.
- **Tropical vs sidereal palaces.** «用制» in modern Chinese practice:
  黃道今制 (中氣, the engine), 黃道古宿 (an old lodge table frozen), 赤道恆星
  制 / 鄭氏恆星制 (palaces fixed to the stars). Ask which a chart from a
  practitioner used before comparing it to this board.
- **The hour.** 加時 assumes 卯 is sunrise. The engine takes the hour branch
  from the pillars, so the layer's `trueSolarTime` decides which 時辰 the 命
  is counted from; at a zone far from the meridian or near a 時辰 boundary the
  命宮 moves a palace. 萬民英 himself corrects 卯 by season.
- **The year of a 化曜 or 神煞** turns at 冬至 in 星學大成 卷四 and 卷三, not at
  立春; the 限 at the birthday. The engine's `yearBoundary` is the pillars'.
- **The 命宮 direction words.** 「順數至卯」 (卷三, 張果星宗) and 「逆數至卯」
  (卷四) describe one act; 「逆數右轉」 numbers the twelve 人事宮.
- **紫微斗數's twelve are another list in another order**; never borrow its
  names for this board (`docs/refusals.md`).
- **A Western horoscope it is not, yet it carries Hellenistic parts**: 宮主 are
  the domiciles, 照 are whole-sign aspects, 福德 is a lot in 靈臺經. Use them
  as the texts state them, not as Western technique (orbs, house systems,
  modern rulers).
- **OCR of 四庫 hands is worthless** (register); the wikisource 四庫 text is a
  typed transcription with its own slips — 新元史 prints 張十五度三十六分 and
  斗二度, 高麗史 女一度, where 元史 has 張 15.2606, 斗 3.7685, 女 2.0638.

## 6. The engine and this art

What `qizhengBoard` returns (`packages/core/src/qizheng.ts`):
- `governors`, `remainders`: each with `longitude`, `lodge` + `lodgeDegree`
  (入宿度), `palace` (branch) + `ci` + `palaceDegree` (宮度), `speed`,
  `motion` (順/逆). 紫氣 is a `PalacePlacement`: palace only.
- `minggong`: a palace and no degree (`minggong: yuejiang`).
- `houses`: the twelve 人事宮 on their palaces.
- `options`; the surfaces add the pillars and the block of schools.

Mapping to § 4: 命 palace → `minggong`; what stands in it → bodies whose
`palace` equals it; 三方四正 → palaces 4, 8 and 6 apart (compute); 宮主 →
from `palace`; 度主 → from `lodge`; 命度 and 身 → not given
(say so, or derive the Moon's palace for the 身 and name the reading); 化曜
→ from the year stem in the pillars. The tables of §§ 3.7–3.8 are web
transcriptions with no register entry: leads to read on the plate, not
quantities to compute and sign as 星學大成/張果星宗's;
順逆 → `motion`, and 留 is refused (no threshold; `speed` travels); 限 → not
computed, derivable from `houses` and the table § 3.11, start age unknown
without a 命度.

Refused, and why (`docs/refusals.md`, `TODO.md` § 1): `xiudu: shixian`
(a table with a citable epoch), `minggong: ascendant` (a holder), `gong: ci`
(a second copy of three cells, and a decision on its frame); 紫氣 to a degree;
留; 化曜, 十神, 度主 and the 生剋恩難 layer as doctrine. The prompt
(`prompt.qizheng.*`) forbids importing aspects and rulerships: read that as
Western ones — the art's own 宮主 and 照 are fair to use, attributed.

## 7. Open questions and candidate TODOs

- **`gong: ci`, the three cells.** 元史 卷54 黃道十二次宿度 (*web
  transcription*) gives 女 二度六分三十八秒, 井 八度三十四分九十四秒, 張 十五度
  二十六分六秒 — the three the register bounded by symmetry (女 ≈ 2.06, 井 ≈
  8.34, 張 ≈ 15.26) — and the other nine as the wheel reads them. Settles on
  the plate of 元史 (☆ not held); a second route on the shelf: 張果星宗三's
  欽天監校正授時過宮度圖, 集成 卷569 (第468冊), an image to be read.
- **The 授時 參, a second copy.** 元史 卷54 黃道宿度 prints 參 十度二十八分 (*web
  transcription*); the shelf has it on 星學大成's wheel. 元史, not held.
- **What `gong`'s default stands on.** 明史 卷25 calls 中氣過宮 the 西洋之法
  and says the old 宮 kept their 宿; 星學大成 and 張果星宗 print 授時 過宮
  tables. Question for the register: does any 星命 text cast by 中氣? Sources:
  明史 天文志 (not held), 張果星宗一 度數所在過宮圖 (★ 卷567).
- **`xiudu: shixian` has an epoch in print.** 明史 卷25: 崇禎元年 黃道宿度 and
  交宮宿度. That is the 新法's, not the 時憲's own 1645 table, and is a
  candidate value if a line holds it. Not held.
- **A second 紫氣 anchor.** (a) 鄭氏星案 in 張果星宗十八ff. (集成 卷584ff.,
  ★ 第469–470冊): worked boards with 「炁」 placed and dates given by 流年
  (「今歲丙辰」) and ages — a Yuan/Ming anchor, centuries from 1886, as
  `docs/refusals.md` asks. Read the 圖 on the plate. (b) Ming 七政曆 printed
  紫炁 躔度 until 康熙九年 (清史稿; 丹鉛總錄): any surviving 大統 七政躔度
  for a dated year would give official 炁 positions — not held. (c)
  星平會海's case charts (翁正春 etc.) — not held.
- **28 or 29 inside 星學大成.** 卷一 says 二十九; 卷十九's 論 says 二十八.
  Read 卷一 leaf with 定十一曜周天行度之數 on the plate (★ vol. 809).
- **`luohou: ascending` holder.** 清史稿 卷45 時憲志 and 卷272 (☆ named in
  `texts/README.md`), 集成 曆法典 卷55 (not held: we hold 藝術典 only).
- **`luohou: descending`, earlier witnesses.** 夢溪筆談 卷七, 容齋五筆 卷二,
  宋濂 祿命辯 — each 交初 = 羅睺; needs the 交初 = descending step stated in a
  text, not derived. P.4071 (Niu 2016) — not held.
- **人事宮 direction**: 張果星宗一 十二宮例 (★ 卷567) states it with an example;
  杜牧's epitaph (樊川文集 卷六ff., not held) fixes it in 852. 星學大成 卷三
  already states it (register § 人事十二宮); 張果星宗 would be a second work.
- **`minggong: yuejiang`, a second holder**: 張果星宗一 安命度法 (★). Same
  rule, on the Sun's palace.
- **`minggong` third reading**: 萬民英 卷六 安命論, sunrise corrected by
  season (★ vol. 809, 卷六 first leaf). Decide whether it is a holder for
  `ascendant` or a value of its own.
- **命度 by 量天尺 / 對度**: 星學大成 卷三, 張果星宗一, 臺曆 (卷六). A table of
  對度 is what is missing; TODO § 2 line 4 already names the 量天尺.
- **身宮, four readings** (§ 3.6) — a parameter when a board carries a 身.
- **化曜** — one transmission, identical in two compilations; whose year
  boundary (冬至 per 星學大成) is open.
- **Stale comment**: `ZIQI_ANCHOR`'s doc says the residue «is the reason `off`
  is still the default»; the default is `yinianyisu`.
- **Works worth acquiring**: 元史·曆志 (授時曆經); 明史·天文志/曆志;
  清史稿·時憲志; 星平會海; a Ming 七政曆; P.4071 facsimile; 靈臺經 (DZ 288);
  Mak 2014; Niu 2016; Kotyk SPP 282 (free PDF, sino-platonic.org).

## 8. Leads against the register

- **「In this copy the prose and the reckoning agree」** (§ 《星學大成》卷十四…):
  true of 卷十九; the same work's 卷一 gives 「炁曜二十九年一周天」 and puts
  「一年一宿，二十八年一周天」 under 土星 (*web transcription*). 星學大成, like
  張果星宗, carries both layers. Check 卷一 on the plate.
- **«一年一宿, one lodge a year — the common statement»** for 紫氣 (§ 四餘): in
  星學大成 卷一 the phrase is Saturn's; the 紫氣 rationale the Ming writers give
  is 「炁生於閏，二十八年十閏」 (楊慎, 章潢, 邢雲路). The value's name may
  describe Saturn's mnemonic.
- **«`luohou: ascending` … with no text … named»** (§ Whose each value):
  清史稿 卷45 時憲志 names it as the 時憲's change, with 吳明炫's charge of
  「顛倒羅計」 in 卷272 (*web transcription*). Not held.
- **«`gong: zhongqi` has no text named»**: 明史 卷25 names it the 西洋之法
  (*web transcription*) — a holder, and an argument that the board's default
  palaces are the 時憲's while its other values are pre-Qing lines.
- **«No source consulted states [the direction]…» survives in
  `prompt.qizheng.direction` and the header of `qizheng.ts`**; the register
  itself has 星學大成 卷三. Add 張果星宗一 (on the shelf) and 杜牧 (852).
- **«三辰通載 is not a second work»** (§ 四餘): 張果星宗十二 introduces it as a
  book with 「各卷經義」, an elementary work it draws on (*web transcription*,
  集成 卷578). It is still one text in two compilations, so the count of
  witnesses does not change; the description does.
- **星盤或問 is in 張果星宗十一** (集成 卷577) as well as 星學大成 卷四: the 身 as
  the degree facing the 命 is one text in two compilations, not 萬民英's alone
  in print.
- **Kotyk on the 中氣 cut** (c. 806, tropical signs) against 明史 天文志 (中氣
  過宮 is Jesuit). Neither is on the shelf; the register's «The two were one
  thing once and precession has parted them by weeks» should not assume
  which practice the 星命 texts followed.

## 9. Bibliography

**Chinese (primary, by web transcription unless ★ and read on the plate)**
- 星學大成, 萬民英, SKQS — https://zh.wikisource.org/wiki/星學大成_(四庫全書本)
  — 卷一 frame, 變曜, 七政旺宮, 十一曜周天行度; 卷三 起立命, 起小限, 流年變曜;
  卷四 看星節要, 星盤或問, 琴堂; 卷五–六 安命論, 身宮; 卷二十一, 二十六 羅計.
- 古今圖書集成 藝術典 星命部 卷565–584 — https://zh.wikisource.org/wiki/欽定古今圖書集成/博物彙編/藝術典
  — 張果星宗 一–三 (安命度法, 十二宮例, 限, 化曜, 過宮度圖), 卷目錄 四–十七,
  鄭氏星案 and 陸位's preface.
- 元史 卷54 曆志 (授時曆經) — https://zh.wikisource.org/wiki/元史/卷054 —
  黃道宿度 incl. 參; 黃道十二次宿度. 卷55 步交會 — 陰陽曆 and 正交/中交.
- 新元史 卷36, 高麗史 卷51 — the same tables, with variant cells.
- 明史 卷25 天文志一 — https://zh.wikisource.org/wiki/明史/卷25 — 崇禎 黃道
  宿度, 交宮宿度 for 1628, «西洋之法，以中氣過宮».
- 清史稿 卷45 時憲志, 卷272 湯若望傳 — https://zh.wikisource.org/wiki/清史稿/卷45 —
  四餘刪改; 顛倒羅計·觜參; 紫炁 removed from 1670.
- 新法算書 卷四, 卷三十一 (SKQS) — 「天行無紫炁」; the 十閏 objection.
- 欽定古今圖書集成 曆法典 卷55, 卷58 — 正交 = 羅睺 = 天首 (Qing); 羅計 «疑出於
  九執».
- 夢溪筆談 卷七 (沈括); 容齋五筆 卷二 (洪邁); 宋濂 鑾坡集 卷16 祿命辯 —
  羅睺 = 交初.
- 丹鉛總錄 卷一 (楊慎); 圖書編 卷21 (章潢); 古今律曆考 卷28, 64, 72 (邢雲路)
  — 炁生於閏; 七政曆 with 四餘; 紫炁 as 景星.
- 杜牧 自撰墓誌銘 — https://zh.wikisource.org/wiki/自撰墓誌銘_(杜牧) — 852
  chart in palaces.
- 不得已, 楊光先 — https://zh.wikisource.org/wiki/不得已 — context of the
  1660s dispute (not read for this file).
- ★ shelf works as listed in § 2, through `docs/sources.md`.

**Chinese (secondary and practitioner)**
- 九紫辰, 「七政四余用制问题的统一回答」 and a companion, sohu 2015 —
  https://www.sohu.com/a/31909536_147754 , https://www.sohu.com/a/44495025_147754
  — modern 用制: 黃道今制, 古宿, 赤道恆星制 (鄭氏恆星制, MOIRA).
- 余欣, 「敦煌文獻與圖像中的羅睺、計都釋證」, 敦煌學輯刊 2011 — transmission of
  the nodes (abstract only).
- 廖暘, 熾盛光佛構圖中的四餘, 敦煌研究 2004 (abstract only).
- 鈕衛星, 唐宋之際道教十一曜星神崇拜, 世界宗教研究 2012 (citation only).
- 漢典 羅睺 — https://www.zdic.net/hant/罗睺 — the reversed-India gloss (§ 5).
- 星平會海 bibliographic note, douban — https://book.douban.com/subject/5391056/ .

**English**
- Kotyk, «The Sinicization of Indo-Iranian Astrology in Medieval China»,
  Sino-Platonic Papers 282 (2018) — https://www.sino-platonic.org/complete/spp282_Indo-Iranian_Astrology_China.pdf
  — 聿斯經 history, 曹士蔿, 計都→apogee, 紫氣 and 閏, P.4071, 身 conventions,
  profections, lots, sect, goal-years, 星學大成 citations by SKQS page.
- Kotyk, «Buddhist Astrology and Astral Magic in the Tang Dynasty», PhD
  Leiden 2017 — https://openaccess.leidenuniv.nl/handle/1887/54858 — abstract.
- Kotyk, «Iranian Elements in Late-Tang Buddhist Astrology», Asia Major 30
  (2017); «Astrological Iconography of Planetary Deities», JCBS 30 (2017) —
  四餘 iconography, via the NTU Buddhism library abstract.
- IKGF project page, Kotyk on 星學大成 — https://ikgf.fau.de/research/research-projects/techniques-and-practices/evolution-of-chinese-horoscopy-from-tang-to-ming.shtml
- Mak, «Yusi Jing», SCIAMVS 15 (2014) — cited through Kotyk.
- Niu Weixing, «On the Dunhuang Manuscript P.4071», in Steele (ed.), *The
  Circulation of Astronomical Knowledge in the Ancient World* (Brill 2016) —
  cited through Kotyk and the USTC faculty page.
- Yano, «The Ch'i-yao jang-tsai-chüeh and its Ephemerides», Centaurus 29
  (1986) — 計都 as apogee, cited through Kotyk.
- Ho Peng Yoke, *Chinese Mathematical Astrology* (2003) — Routledge TOC,
  https://www.routledge.com/Chinese-Mathematical-Astrology-Reaching-Out-to-the-Stars/Yoke/p/book/9780415863100
  — covers the 三式 only.
- The Astrology Podcast with Kotyk (2018) —
  https://theastrologypodcast.com/2018/11/19/the-transmission-of-horoscopic-astrology-to-china-japan
  — Dorotheus → Pahlavi → Chinese c. 800.
