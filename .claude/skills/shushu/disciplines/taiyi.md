# 太乙神數 tàiyǐ shénshù — the board of a year (`taiyi`)

Researched 2026-10-23. The register is `docs/sources.md` § "太乙 — the board
whose epoch survives being unsettled" through § "The per-palace readings of
卷二 — declined". This file points into it and does not restate it. Anything
marked *(web transcription)* is a finding aid: it says where to look on the
plate and moves no rung.

## 1. What the art is

- **Scope.** The first and largest of the 三式 sānshì, the three "cosmic
  boards", beside 奇門遁甲 and 大六壬. A board is laid on a **count of
  elapsed units from an epoch**: years (歲計 suìjì), months (月計 yuèjì),
  days (日計 rìjì) or hours (時計 shíjì). 《太乙金鏡式經》卷二 sorts them by
  who uses each: 「王者用嵗計，卿士惟月計，師尹惟日計」. The engine lays the
  歲計 only.
- **The question it answers.** It was asked about states and armies: which
  side, 主 zhǔ (host) or 客 kè (guest), the configuration favours, whether to
  move or hold, and what will befall a reign. In the 歲計 nobody is on the
  board. The 四庫 提要 summarises the received use: 「以八將推其掩迫囚擊關格之類，
  占內外災福。又推四神所臨分野，占水旱兵喪饑饉疾疫。又推三基五福、大小游二限易卦
  大運，占古今治亂」.
- **History, in brief, with attributions.**
  - 太一 tàiyī as a god and as the pole star: 《史記·天官書》, 《封禪書》 (謬忌,
    under 漢武帝). 《漢書·藝文志》 lists 泰壹陰陽 in 23 篇 under 五行, and it is
    lost. 《易緯·乾鑿度》 has 太一 walking the nine palaces, with 鄭玄's
    commentary. The 汝陰侯 tomb at 雙古堆 Shuānggǔduī (sealed 165 BCE) gave a
    太乙九宮占盤 lacquer board. That is the ancestor of the nine-palace walk.
    It is not this art's 起例.
  - 《南齊書》卷一 高帝紀上, 史臣曰 (蕭子顯, early 6th c.) dates eleven
    positions of 太一 from 漢高五年 to 昇明元年 and reads them politically.
    It is the earliest datable *use*. 何丙郁 Ho Peng Yoke (1996) worked
    backwards from it. He argues that the Tang and Ming procedures were
    already in force in the Southern Dynasties, and that from the texts alone
    the method cannot be traced earlier.
  - 隋 臨孝恭 《太一式經》 (title only; lost).
  - 唐 王希明 Wáng Xīmíng compiled 《太乙金鏡式經》 for 玄宗 by imperial order,
    c. 730 (開元). It is the oldest surviving manual.
  - 宋: 楊惟德 《景祐太乙福應經》 (1030s, court astronomers). 曾公亮 and 丁度
    compiled 《武經總要》 (1044), whose 後集 卷十九–二十 print a full 立成 of
    the 144 局 with verdicts. 王湜 wrote 《太乙肘後備檢》 (lost). The court
    built 太乙宮 temples by the 五福 (984, 1029, 1074; 周琮's memorial, 《宋史·禮志》).
  - 元 曉山老人 wrote 《太乙統宗寶鑑》, preface 大德七年 (1303), 二十卷. This is the
    lineage of the 《統宗》.
  - 明: 丘濬 is the attributed re-editor of 《太乙淘金歌》. The four-juan
    《太乙數統宗大全》 grows out of the 寶鑑 (print after 1684, signed 集福堂).
    《太乙成書》 survives in 存目 only.
  - Modern: 盧央 Lú Yāng, 《中國古代星占學》 (2007), and Ho Peng Yoke,
    *Chinese Mathematical Astrology* (2003).

## 2. Texts and lineages

★ = on this project's shelf (`texts/README.md`, `texts/taiyi/`, `texts/shushu/`).
☆ = wanted and not held (`TODO.md` § 2).

**The two lineages the engine follows.** These are two works, not two copies
(register § "Whose each value of a 太乙 board is"):

- ★ **《太乙金鏡式經》**, 唐 王希明, c. 730, 十卷. The 四庫 copy is
  `taiyi/taiyi-jinjing-shijing-skqs.pdf`, a cut of 四庫 vol. 810 pp. 860–925.
  The 卷二 Wikisource wikitext sits beside it. It is a manuscript hand
  reconstituted from 《永樂大典》, so the large constants are corrupt. It has
  one Song interpolation (景祐元年, 1034). Its juan:
  - 一 counts and the four registers;
  - 二 太乙, the 五將, the nine palaces, the gates, the sixteen gods, 運式,
    和不和, and the reign ladder;
  - 三 the 三門五將立成 and the conditions 掩 擊 迫 囚 關 格 對, 四郭固/杜,
    執提, 提挾, and a 勝敗鈐 table;
  - 四 三門具, 五將發, 主客, 天外/地內, battle formation and 風雲;
  - 五 三基, 五福, 大遊, 小遊, 四神, 天乙, 地乙, 直符;
  - 六 seven 術 boards, then 三才, 長短, 五音, 孤單, 內外, 多少, 陰陽厄會,
    所主: the doctrine of the counts;
  - 七 十精, 陽九, 百六;
  - 八 九宮分野;
  - 九 enemy states, 始擊 on the 28 舍, 太乙 against 太歲;
  - 十 擇日/時 and 雜占.

  This is the engine's default witness. The 四庫 提要 (卷一百九) criticises its
  omens; it cites 劉黻's memorial and 黃宗羲's 「經緯混淆，行度無稽」.
- ★ **《太乙數統宗大全》**, 故宮珍本叢刊 vol. 420, 四十卷 (W02259). Engine
  witness id `taiyitongzong`, named for **《太乙統宗寶鑑》**, 元 曉山老人, 1303.
  The 四庫總目 卷一百十一 (存目) lists the 寶鑑 at **二十卷**. 錢曾's
  《讀書敏求記》 saw two old manuscripts. One had three appended juan, 《起例》,
  《真數》 and **《淘金歌》**; the other had 數林, 籌數, 專徵集略 and 神機三鏡. The
  2025 collation by 魯楠, 葉傑 and 李剛 treats 故宮 vol. 420 as one of three
  versions of the 寶鑑, "essentially the same content". The other two are a
  Ming manuscript in 中國基本古籍庫 and a 20-juan facsimile edited by 謝路軍
  and collated by 李德潤. Whether the shelf copy and the 寶鑑 are one recension
  is still listed as open in `TODO.md` § 2: see § 8.
- ★ **盧央, 《中國古代星占學》**, 中國科學技術出版社 2007, 第五章 太乙式
  (`shushu/zhongguo-gudai-xingzhanxue.pdf`, PDF = print + 18). A historian's
  study, not a manual. It works six dated boards and weighs three 上元積年
  against 《南齊書》. It is the way the 統宗's readings first reached the
  register. Its verdict on the 數占: 「並不是可信的」.

**Other works, with their status.**

- ☆ **《太乙淘金歌》**, a verse 歌訣. The 國家圖書館 holds a late-Qing or
  Republican manuscript in 2 冊, catalogued 「（唐）王希明輯 （明）丘濬重編」
  (guoxuedashi holding record). It was appended to a 寶鑑 manuscript by 錢曾's
  time, and the 上海大成書局 《太乙神數》 (1922) reprints it. `epoch: taojin`
  is named for it and refused. A web transcription is summarised in § 4 and § 8.
- **《武經總要》後集 卷十九–二十**, 太乙定主客勝負陽局立成 / 陰局立成, 1044, on
  Wikisource. **Not on the shelf, and not in `TODO.md`.** It is a third 立成
  of all 144 局, three centuries older than the 統宗 and outside the 大典
  reconstitution of the 金鏡. See § 7 and § 8.
- 《景祐太乙福應經》, 楊惟德, 十卷 (a 北京大學圖書館 copy is digitised). Not held.
- 《太乙秘書》, 宋 王佐 (光緒九年 清隱山房叢書). Not held.
- 《太乙統宗福應紫庭金鏡集成》, 二十四卷, attributed to 曉山老人 (清隱山房叢書).
  Not held.
- 《太乙成書》, 八卷, 四庫存目. The 提要 says it quotes 《淘金歌》, 《金鏡》,
  《福應》, 《紫庭》, 樂產 and 王佐's 《秘珠》 side by side, 「冗雜無緒」.
- Lost Song titles in the bibliographic monographs, which give a sense of the
  shelf that existed: 太一陰陽定計主客決勝法, 胡萬頃 太一遁甲萬勝時定主客立成訣,
  太一時計鈐, 太一陽九百六經, 太一陽局鈐 / 陰局鈐, 太一飛鳥十精曆, and others.
- 《太乙命書》 (attributed to 曉山老人), and the 命法 of the 大全 卷三十七–四十.
  These are 太乙人道命法, a natal use. See § 6 on why it is not grafted.
- ★ 《祖傳年家太乙神數教材》 (高俊波, a handout). It counts from the 統宗's
  base and is **not a witness** (register § "A second 上元").
- ★ 太乙神數排盤入門, thin modern notes.
- Practitioners. 張明澄's 《太乙神數講義》 (Japanese lectures) is often called
  the clearest modern exposition. The open-source program **kintaiyi**
  (kentang2017, GitHub, MIT) lays 年/月/日/時/分計 from four 積年 bases. A
  program is not a witness; see § 8.
- English. Ho Peng Yoke's book chapter "The Taiyi System in the Three Cosmic
  Boards: Method of the Taiyi Deity" (Routledge 2003, 2nd printing 2013) is
  the only sustained English treatment. Its index vocabulary includes
  "Superior Epoch" and "Taiyi Configuration". It was **not read for this
  file**: § 9 says what was seen. His 1996 BIHP article is in Chinese. 曲安京's
  《中國曆法與數學》 (2005) has a chapter on the 太乙 calendar. His 1998
  《清華學報》 article (28.2) reconstructs a 甲寅太乙曆 out of the 大遊 and
  五福 periods.

## 3. How a board is laid (起例), and where readers part

Register sections are cited as §. Parameters are `TaiyiOptions` in
`packages/core/src/taiyi.ts` and `TAIYI_PARAMETERS` in
`packages/core/src/parameters.ts`.

1. **Which year.** A board is a function of a year. Which year an *instant*
   falls in is the parameter `taiyi.yearBoundary`:
   - `lichun`, the default, is a convention with no text behind it;
   - `dongzhi` is the 統宗's: 卷二十 「今年子月自當為明年」, and a 積年 counted
     in 歲實 from one 天正冬至 to the next;
   - `chunjie` is refused, with no holder.

   kintaiyi cuts at the lunar new year. A program is not a holder.
2. **積年 jīnián, the count from 上元甲子.** `epoch`, implemented: `jinjing`;
   refused: `taojin`. Who holds which figure:
   - 金鏡 卷一 gives **1 937 281** at 開元十二年 (724) and **40 801** in the
     same paragraph (anchored on 開元十五年). 卷三 gives **30 001**. All three
     are ≡ 121 (mod 360). § "The epoch".
   - 統宗/寶鑑 gives **10 155 219** at 大德七年 (1303) and 10 155 367 at 景泰二年
     (1451). Its 公元基數 is 10 153 917. It is congruent with the 金鏡 mod 360
     and mod 24, so it lays the same board. 王肯堂 (via the 四庫 提要) showed
     that this count does not return to a 甲子 day at the epoch: 「得氣應三十四萬
     七千八百七十五分，乃戊戌日酉正三刻」. So the 七曜齊元 claim fails
     arithmetically. The board does not care.
   - 淘金歌 is not held. 盧央 says its figure gives 九宮 where 《南齊書》 has
     四宮. Two web figures for it are 10 154 193 (kintaiyi) and 10 153 977 (a
     zhihu article). Either is ≡ 12 (mod 24), four palace-steps off, which is
     consistent with 盧央's 四→九. Its verse opens 「黃帝元年上元頭」
     *(web transcription)*: see § 8.
   - 甲寅 epochs. The 三基 run from 「上元甲寅」 (285 011 at 724). The 金鏡's
     大遊 is also printed 「置上元甲寅所求積年」 *(web transcription, 卷五)*,
     while the engine counts it on the 13 331 count. 曲安京 reconstructs a
     甲寅太乙曆. The heading 甲寅 on 統宗 p. 110 is open (`TODO.md` § 2).
3. **局 jú, 紀 jì, 元 yuán.**
   - 積年 mod 360 is the 周紀. Mod 60 gives the 太歲 and the 紀 (`liuji`).
     Mod 72 gives the 局 (`ju`).
   - The quotient by 72 is the 元, one of the 五子元 (`yuan`).
   - The 金鏡 takes the remainder as the 局. The 統宗 卷二 counts years
     elapsed «from 局 1». Its 卷三十一 counts the year in. One work, two
     conventions, one board.
   - 陽局 is the default for the 歲計. 陰局 after 夏至 is for the 時計: the
     統宗 says so on p. 30, and of the day as well on p. 386. That divergence
     is recorded, with no parameter.
4. **The nine palaces are numbered one seat off the 洛書.** 乾1 離2 艮3 震4
   中5 兌6 坤7 坎8 巽9 (卷二 「九宮皆差一位」, three explanations: 郭璞, 樂產,
   王希明). The 淘金歌 has the same: 「一天二火三為鬼，四木六金坤在七，八水九巽」
   *(web)*. § "The nine palaces". The 提要 calls this 「特右旋，以乾巽為一九」.
5. **太乙 walks** 1 2 3 4 6 7 8 9, three years to a palace, 24 to the
   circuit, never the centre. This is `taiyi` (`TaiyiStation`) and is ≡ 小遊.
   `yang` marks 八三四九 against 二七六一 (卷二, for 和不和).
6. **The sixteen gods** (十六神 shíliù shén): twelve branches and four corner
   trigrams, 地主 at 子 to 大義 at 亥. Each takes the element of its seat
   (卷六). § "The sixteen gods".
   - Variant names: the 武經總要 writes 大族 for 太蔟 and 大昊 for 太炅
     *(web)*.
7. **天目 tiānmù = 文昌 wénchāng, the 下目 and the host's eye.** The 陽局
   opens at 武德 (申), the 陰局 at 呂申 (寅). The eye walks the sixteen with
   two corners held twice, an 18-period. 淘金歌: 「天目上元起于申…陽局天地重留
   算，陰局艮巽亦重輪」 *(web)*. This is `wenchang`.
8. **計神 jìshén** starts at 寅 and runs backwards one branch a year (`jishen`).
   **合神 héshén** is the 六合 of the 太歲 (`heshen`).
9. **始擊 shǐjī, the 上目 and the guest's eye.** Set the 計神 on 和德 (艮),
   then read where 文昌 is carried to (卷二 第五). This is `shiji`.
10. **The counts 主算 zhǔsuàn / 客算 kèsuàn.**
    - Start at the eye's palace number if the eye stands on a 正宮; start at
      1 if it stands between palaces (間神).
    - Walk clockwise, adding the palace numbers passed.
    - Stop before 太乙's palace.
    - The worked example is 「大義一筭地主八筭和徳三髙叢四計得十六」.

    The engine reproduces 850 of the 864 cells of the 金鏡's 立成; § "主算 and
    客算", § "The verification". These are `host.count` and `guest.count`.
11. **大將 dàjiàng** is the count with its tens dropped (10 → 1). The 淘金歌
    says 「十算仍將九去之」 for whole tens *(web)*, which agrees. **參將
    cānjiàng** is the 大將 × 3 mod 10. The 統宗 states it in words, and 盧央
    p. 476 quotes it. The 淘金歌 has 「三因大將滿十去」 *(web)*. A count ending
    in 5 seats both generals in the centre, which is **杜 dù / 杜塞**. These are
    `general` and `assistant`.
12. **定目 dìngmù / 定算 dìngsuàn** is the 統宗 卷四 rule under 「淘金訣法」.
    - Count from 合神 to 文昌, inclusive, on the sixteen.
    - Count that many seats on from the 太歲: that seat is the 定目.
    - Count from it to 太乙 as for the other two counts.

    The 淘金歌 has it: 「為客最難詳定計，便以合神加太歲，文昌臨處審根源」
    *(web)*. The 金鏡 has no third count. The leaf reads the 計大將 off the tens
    in its one worked case. The engine follows the 144 drawn boards, which read
    the units. This is `ding`.
13. **The conditions** (`patterns`). Triggers as in 金鏡 卷三, read off the
    Wikisource text:
    - **掩 yǎn**: 始擊 in 太乙's palace.
    - **擊 jī**: 始擊 one 辰 or one 宮 ahead of or behind 太乙.
    - **迫 pò**: 文昌 and the four generals beside 太乙. 宮迫 is slow, 辰迫 is
      fast, and 「上目無迫」.
    - **囚 qiú**: 文昌 or a general in 太乙's palace.
    - **關 guān**: host and guest generals in one palace, or counts equal
      (「數齊」).
    - **格 gé**: the guest's eye and generals facing 太乙.
    - **對 duì**: 文昌 facing 太乙.

    Parameters:
    - `geHost: ke` (金鏡) or `zhuke` (統宗);
    - `geChong: gong` (implemented) or `chong` (a 沖 of branches; refused);
    - `wenchangTaiyi`: 囚 `qiu` (金鏡) / 關 `guan` (樂產, quoted in the 統宗) /
      掩 `yan` (統宗 釋掩).

    Not computed: 四郭固, 四郭杜, 執提, 提挾. § "Whose bodies enter each condition".
14. **八門直使 bāmén zhíshǐ.** One gate per 30 years from 開, 240 to the round
    (卷四; dated twice in 卷一 and 25 times in the 統宗). The 統宗 refuses a
    門盈差 by name. This is `gate`.
15. **三基 sānjī.** 君 30 years to a fief, 臣 3, 民 1, on the twelve 邦 from 戌.
    This is `sanji`, with `period`. The 淘金歌 starts 君 and 臣 at 午 and 民 at
    戌 *(web)*. That is the 統宗's arrangement, which 盧央 shows lands on the
    same fief.
16. **五福 wǔfú.** 45 years to each of five named palaces, 225 to the round
    (`wufu`). Checked against the Song temples.
17. **大遊 dàyóu.** 36 years to a palace from 七宮, 288 to the round.
    - Direction: the 金鏡 卷五 「命起七宮順行八宮不遊中五」 *(web)* and the
      統宗 say 順. The 淘金歌 says **逆**: 「入宮逆數…七六四三二一九…八是終…
      上元起七逆廻宮」 *(web)*. Not modelled; § 7.
    - Its eye is `dayouEye: jinjing` (元法 72 → 18) or `tongzong` (盈差 216,
      ÷188, → 18).
18. **Not laid.**
    - 四神, 天乙, 地乙, 直符 (twelve palaces, adding 絳宮 明堂 玉堂);
    - the 十精 (weather);
    - 陽九 yángjiǔ / 百六 bǎiliù;
    - 太乙入卦;
    - 分野;
    - 絕陽, 絕陰 and 易氣 palaces;
    - 天外/地內.

    § "What is not here".

## 4. How a board is read: the received doctrine, attributed

The engine names configurations and stops. A consultant may give the doctrine
below, **saying whose it is**. Inside this project the reading of a 太乙 board
is bound by `prompt.taiyi.*` and `docs/refusals.md` § "The received readings of
太乙": no dynastic forecast, no event, no date, and nobody is on the board. Who
is 主 and who is 客 is the reader's choice and is made aloud. Most of what
follows is military doctrine. Transpose it to a matter only as structure,
"what the configuration is", never as outcome.

**A. What is looked at first: the triad of 金鏡 卷四.** 推主客:
「若得三門具五將發陰陽和，稱兵所向必克…若三門不具五將不發陰陽不和，則不利舉兵，
宜固守」.

- **三門具 sānmén jù.** 卷四 推三門具不具: 開, 休 and 生 are the three gates.
  If 太乙's 天目 stands under 開 or 生, two gates are lacking; under 休, all
  three are. The 歲計 reads a province under an auspicious gate as 大吉 and
  under 死 驚 傷 杜 as 大凶. The 淘金歌 has 「常以開門加太乙」
  *(web)*. The engine prints only the 30-year 直使 (`gate`). It does not place
  the eight gates around the ring, so 門具 is not computable from the output.
- **五將發 wǔjiàng fā.** 「始擊將無掩擊，文昌將無囚迫，主客大小將無相關，即門具將發也」.
  This *is* computable from `patterns`: no 掩/擊 on 始擊, no 囚/迫 on 文昌, and
  no 關 among the generals. The 武經總要 立成 writes 「門具將發」 or a general's
  「發」 cell by cell *(web)*.
- **陰陽和.** § C.

**B. 主 and 客.** 金鏡 卷四: 「主客者先後之理動靜之義也…陳兵原野先動者為客後應者
為主；若安居之勢先動者為主後應者為客」. The assignment follows the *situation*
(open field or settled order) and not the counts. In a matter: the side that
initiates is 客 in a contest, and the side established is 主 in a settled order.
The engine refuses to choose (`docs/refusals.md` § "Who is 主 and who is 客").

**C. The counts, in 金鏡 卷六 (8–15) and the 淘金歌.**

- **和 hé / 不和 bùhé.** Three tests on three subjects (§ "陰陽和不和").
  - **The eye's test** is computed (`accord`): an odd count from a 正宮 eye
    is 重陽 chóngyáng, an even count from a 間神 eye is 重陰 chóngyīn, and
    either crossed pairing is 和. 張良經 as quoted in 卷二: 「和則吉」.
  - **The test against 太乙's palace**: 卷二, and 卷六 推陰陽以占厄會, which
    adds 「厄在火…厄在水，若主人得主厄，若客得客厄」 *(web)*. See § 8.
  - **The digit lists** 上和/次和/下和 (王希明), which no two prints give alike.
- **長短 chángduǎn** (卷六 九). 「十一以上為長，單九以下為短。長多利深入，短少利
  淺入，長為勝短為負」. The 淘金歌 has 「算長宜利於深入…算短覷長利短攻」 *(web)*.
- **多少** (卷六 十三). 「客以多筭臨少主人敗，客以少筭臨多主人勝」. 盧央's first
  principle is 「以得算之多少定勝負」. In this project the prompt forbids
  turning the difference into an outcome. Report the asymmetry, attributed.
- **孤單 gūdān** (卷六 十一). 1 3 7 9 are 單陽 and 2 4 6 8 are 單陰. 10 and 30
  are 孤陽, 20 and 40 are 孤陰. 單/孤 together make 重陽/重陰. 「單陰筭…不利客，
  單陽筭不利主人」. The 淘金歌 has 「一三七九屬單陽，不宜出軍可自防；二四六八十
  單陰，伏匿隱藏作主強」 *(web)*.
- **三才 sāncái** (卷六 八). A count with no ten (1–9) is **無天 wútiān**:
  eclipses, 彗孛. A count with no five in its units (units 1–4) is **無地**:
  earthquakes, locusts. A whole ten is **無人**: 口舌, plague, migration. The
  淘金歌 adds 「若得十六二十六，號為三才天地足」 *(web)*.
- **五音** (卷六 十). The units are read as 宮 (1–2: the ruler), 徵 (3–4:
  ancestral temples), 羽 (5–6: consorts), 商 (7–8: heirs), 角 (9–10: illness).
- **所主** (卷六 十五). 「十為將軍，五為吏士，一為兵卒…數得十六以上，將吏卒備，
  百事吉」.
- **內外** (卷六 十二, and 卷三 提挾). 「自一至四為內宮…自九至六為外宮」.
  卷四 has a different list: 「太乙在八三四宮者為地內宮助主人，太乙在九二七六宮
  者為天外宮助於客」 *(web; 一 missing from the 四庫 text)*. One excerpt of Ho
  Peng Yoke reads palaces 1, 3, 4 and 8 as generally favouring the host.

**D. The conditions: what each is said to be.** The engine carries only the
之義 clause (`meaning`), and the valence 凶 for the seven of 卷三. The omens
are refused (§ "What 卷三 says each condition is").

- **掩**: 「掩襲刼殺之義」.
  - 卷三 adds 「掩主大將，主人筭和吉，不和凶」. This is 始擊 sharing the host
    general's palace, a sub-case the engine does not mark.
  - The 武經總要 writes 「始擊將大武掩主大將」 at 陽局 1 *(web)*.
  - 淘金歌: 「客目太乙同為掩，客非利兮…始擊掩主最為凶」.
- **擊**: 「臣凌君，卑凌尊，下凌上，僭也」. The 統宗 cites 「迫灾輕而擊災重」.
- **迫**: 「宮迫災微緩，辰迫災急疾」.
- **囚**: 「簒戮之義」. 「近大將謀在同類，近參將謀在內，筭和者利，不和者謀不成」.
  The 統宗 has 「關囚皆不利為主」.
- **關**: 「但將相怕忌之事，不及於君」 (王希明's voice). 金鏡 卷四 推主客相關:
  「客關得主人則客勝，主人關得客則主勝，皆用日計納音以決之」. The 淘金歌 has
  「主來克客主軍贏」 by the 納音 of the two eyes *(web)*.
- **格**: 「言政事上下格也」. 《南齊書》 has the same words: 「經言格者，已立政事，
  上下格之，不利有為，安居之世，不利舉動」.
- **對**: no 之義, only omens of disloyal ministers.
- **杜**: 「有算無門又無將，名為杜塞不可向」 in the 淘金歌 *(web)*. The 武經總要
  has, of 主算 25, 「八門杜，主大將、參將不出中宮…主人杜塞無門…不利，宜固守」
  *(web)*. The engine carries no valence for it (§ 8).
- **四郭固 / 四郭杜 / 執提 / 提挾** (卷三; 統宗 卷七). 四郭固 favours the
  host's holding position. 四郭杜 is 「閉杜不通，謀諸事不成」. 執提 is 太乙
  facing the 開 or 生 gate. 提挾: 「挾主主敗，挾客客敗」.

**E. 太乙's palace, the 太歲, and the longer circuits.**

- 金鏡 卷五: 「太乙在陽宮遼東不見兵，太乙在陰宮蜀漢可以全身」 *(web)*.
- 卷九 推太乙與太歲格. The 淘金歌 「歲乙相格」 gives cases: 太歲 in 未/坤
  with 太乙 in 三宮, 酉 with 四宮, 午 with 八宮, 戌亥 with 九宮 *(web)*. The
  太歲 as a body of 格 is recorded with no parameter in the register.
- 五福, 大遊 and 三基 are read as epochal: 「占古今治亂」 (四庫 提要). 大遊
  「考較人君善惡」. 陽九 is 4 560 years and 百六 is 4 320 (淘金歌 *(web)*;
  金鏡 卷七). The project refuses all of this.

**F. The worked reading.** 《南齊書》卷一 史臣曰 is the model of how the
tradition read a year:

- 「漢高五年，太一在四宮，主人與客俱得吉，計先舉事者勝」;
- 「元嘉七年，太一在八宮，關囚惡歲，大小將皆不得立…客主俱不利」;
- 「昇明元年…是歲太一在杜門，臨八宮…不利為客，安居之世，舉事為主人，禪代之應也」.

Every element is one of the above: 太乙's palace, the gate, 關/囚, whether the
generals 立, and 主/客 decided by 安居 against 舉事. The 武經總要 立成 gives the
same shape per 局 *(web)*:

> 此局客算長和，門具將發，利為客，見陣利先動…太乙雖助主，主大將為客目掩之，
> 算短不和，不利為主

**Order of looking, synthesised from the above and attributed in a reading.**

1. Decide 主 and 客 for the matter, and say how.
2. 太乙's palace: 內/外 (whom it helps, 卷四), 陽/陰.
3. 三門 and 五將: which conditions fall on which body.
4. The two counts: 和 by `accord`; 長短; 單/孤; 三才.
5. 杜, 關 and 囚 between the parties.
6. The 定算, as a third position (統宗) and not a tiebreak.
7. The circuits, as the frame of decades.

## 5. Pitfalls

- **Reading the palaces on the 洛書.** 一宮 is 乾 here. Every Qi Men habit is
  one seat out. The engine and every surface say so.
- **Two 陰陽 partitions of the palaces.**
  - 八三四九 against 二七六一 (`yang`) is the 陽宮/陰宮 split of 卷二, for 和.
  - 地內 against 天外 is 卷四's, for whom 太乙 helps.
  - 卷三 has a third: 1–4 內, 6–9 外.

  They do not coincide. Do not use one for another.
- **Two eyes, two vocabularies.** 天目 = 文昌 = 下目 = 主目 (地目 in some
  modern texts). 始擊 = 上目 = 客目. Some modern and English texts invert the
  天/地 labels: an excerpt of Ho's book calls 天目 the host's eye and 地目 the
  guest's. Ask which body, not which label.
- **太乙 the god against 太乙 the 六壬 月將 (巳).** They are unrelated (§ "The
  transliteration").
- **The 時計 陰局.** In the 統宗 it starts at 夏至 for hours (and on one leaf
  for days as well). The 歲計 is 陽局 throughout.
- **The year boundary.** 立春, 冬至 or 正月初一. Programs differ: kintaiyi
  reads the lunar year. A board for a date between 冬至 and 立春 can be a year
  apart. Name the boundary.
- **積年 that differ by millions are not different boards.** Test congruence
  mod 360 and mod 24 first (§ "A second 上元"). The 淘金歌's figures are *not*
  congruent.
- **Counting conventions.** "Year counted in" against "years elapsed" shifts
  every 局 by one. Both are in the 統宗. Check against a dated case before
  calling anything an error.
- **The 立成 tables are not independent of each other.** The 金鏡's and the
  統宗's share errors in four cells. The 武經總要's *(web)* has the engine's
  value in all fourteen 金鏡 errata (§ 8).
- **淘金歌 lists of 和.** These are 上和 14 18; 次和 23 29 36 32; 下和 12 16 27 34
  38 *(web)*. They differ from both the 四庫 金鏡 and 盧央's quotation. Treat
  any list of graded 和 as a print, not a rule.
- **Modern manuals present the dynastic layer as personal forecast**, and use
  太乙命法 as natal astrology. Neither enters a 歲計 reading here.
- **Software.** The closed programs disagree. kintaiyi has documented
  ad hoc adjustments: its 日計 count is forced to match the day's 干支. Never
  verify against one without a text.

## 6. The engine and this art

- **Computes:** the 歲計 board of a year, `taiyiBoard({ year }, options)`, on
  the 金鏡's count with the 統宗's additions. MCP `compute_taiyi`; REST
  `/api/taiyi`, `/api/taiyi/text`, `/api/taiyi/plate`, `/api/taiyi/prompt`;
  CLI `taiyi`. It also exposes `taiyiJu(ju, dun, options)` for the 立成 rows.
- **Refuses:**
  - `ji: yueji / riji / shiji`. These wait by the user's decision of
    2026-10-11. The 金鏡's constants are corrupt, the 統宗's day anchor is
    off by a 盈差, and a board of an instant is a second input type.
  - `epoch: taojin`, `geChong: chong`, `yearBoundary: chunjie`.
  - The dynastic and per-palace readings, and the 主/客 assignment
    (`docs/refusals.md`: § "The received readings of 太乙", § "Who is 主 and
    who is 客").
  - Nobody is on the board: `--ask` is refused, and there is no `asked`. A
    matter travels instead as `about=true`, the text appended in the browser.
- **Output fields, mapped to § 4.**
  - `taiyi`, `yang`: the palace and its 陽/陰 class (A, E, C-和).
  - `wenchang`, `shiji`: the two eyes (B, D).
  - `jishen`, `heshen`: 計神 and 合神 (inputs to 始擊 and 定目).
  - `host`, `guest` (`count`, `general`, `assistant`, `accord`): the counts
    and generals (C). `accord` is the eye's test only.
  - `ding`: the 定目, 定算 and its generals (統宗).
  - `patterns`: 掩 擊 迫 囚 關 格 對 杜, each with `subject`, `partner`,
    `palace`, `kind` (前/後 辰/宮) and, for the seven of 卷三, `valence` 凶 and
    the 之義 `meaning` (D). This is the input for 五將發.
  - `gate`: the 30-year 直使. It is not the 三門 of 卷四.
  - `sanji` (with `period`), `wufu`, `dayou`: the circuits (E).
  - `sui`, `liuji`, `yuan`, `ju`, `accumulated`: the reckoning.
  - `options`: the school block (`docs/parameters.md`).
- **Not in the output, though the doctrine needs it:**
  - 門具;
  - 地內/天外;
  - 長短, 三才, 孤單 (all derivable by the reader from `count`);
  - the digit lists;
  - 絕陽 and 絕陰 palaces;
  - 掩 of the host's general by 始擊;
  - the elements of the roles.

  `docs/agent-prompt.md` and `prompt.taiyi.read` say which are the reader's.

## 7. Open questions and candidate TODOs

One line each: what, why, the source that would settle it, and whether it is on
the shelf.

- **Acquire or read 《武經總要》後集 卷十九–二十** on a print: Ming 正德 or 嘉靖
  print, or 四庫 子部兵家. It is a dated (1044) third 立成 with generals,
  conditions, 和/不和 labels and verdicts. It is the external check the 立成
  verification lacks, and a sentence for 杜. **Not on the shelf.**
- **掩 of the host's 大將 by 始擊**, which 金鏡 卷三 states (「掩主大將，主人筭和
  吉不和凶」). Not computed. `TaiyiPatternSubject` has the host's general
  (`hostGeneral`), but 掩 is marked on `shiji` alone, with no `partner`. **On the shelf** (金鏡 卷三); read it on the plate before building.
- **地內/天外 and 內宮/外宮.** 卷四 lists 八三四 / 九二七六, with 一 missing in
  the 四庫. 卷三 lists 1–4 / 6–9. Two partitions in one work: a divergence to
  record and perhaps a parameter. Settle it on the 四庫 plate and the 統宗 卷五
  (絕陰絕陽, 九宮所主). **On the shelf.**
- **大遊 順 or 逆.** The 淘金歌 *(web)* walks 七六四三二一九八. The 金鏡 and the
  統宗 walk 順. Settled by the 淘金歌 itself. ☆ **Not held.**
- **Fetch the 淘金歌's 積年 and procedure** to put flesh on `epoch: taojin`.
  Candidates: the 國家圖書館 manuscript (2 冊), the 1922 大成書局 《太乙神數》,
  or a 寶鑑 manuscript carrying the appended juan. ☆ Wanted; none held.
- **The 寶鑑 in twenty juan** (謝路軍/李德潤 facsimile, or the 基本古籍庫 Ming
  manuscript). It answers "one recension?" and gives a second copy of the
  統宗's damaged cells (lunar constants, 天時's seat, 釋提執's broken case).
  **Not on the shelf.**
- **The 時計 and 日計.** kintaiyi has open code for both on four bases. It is
  not a witness, but it is an independent implementation to diff against once
  `ji: shiji` is built, as `lunar-javascript` is for the pillars.
- **The 五將's elements**: the 金鏡 卷二 推五將所主法 (§ 8). **On the shelf.**
- **《景祐太乙福應經》** (Song, court): a third lineage for the epoch and the
  conditions, and 楊惟德 is already a witness for 奇門. Not held.
- **曲安京 1998, 《清華學報》 28.2**, the 甲寅太乙曆: it may answer what the 甲寅
  heading on 統宗 p. 110 is. A modern study; not held.
- **Ho Peng Yoke 2003, ch. 2**, and 何丙郁 1996 (BIHP 67.2, pp. 383–413): for
  his palace-favour table and his reading of 《南齊書》's 十九年 entry, which
  has no palace. Not held.
- **四郭固 / 四郭杜 / 提挾 / 執提.** The 武經總要's verdict lines name 挾 per 局
  *(web)*, which would let 提挾 be checked as the 囚 and 關 rows were. Not held.

## 8. Leads against the register

None of these is a correction. Each says where a reading would look.

1. **《齊書·武帝紀》 should probably be 《南齊書》卷一 高帝紀上, 史臣曰.** The
   eleven positions (漢高五年 → 昇明元年) stand there on Wikisource. Ho Peng
   Yoke's 1996 title is 〈太乙術數與《南齊書·高帝本紀上》史臣曰章〉. The 四庫
   提要 of the 金鏡 says 「《南齊書·高帝紀贊》」. The register (§ "The witness
   that is not a manual"), the `compute_taiyi` description and possibly
   `docs/agent-prompt.md` say 武帝紀. Check 盧央's page for which he wrote.
2. **The elements and planets of the 五將.** The register (§ "What is not
   here") gives 文昌 火 熒惑 and 始擊 土 填星. 金鏡 卷二 推五將所主法 reads
   *(web)* 「上目者南方熒惑之精，受火德…號始擊將屬客」 and 「下目者中宮鎮星之精，
   受土德…號文昌將屬主」. That is the reverse: 始擊 火, 文昌 土. 監將 is 歲星 木,
   主大將 太白 金 and 客大將 辰星 水, which agree. The register's table may be
   the 統宗's as 盧央 gives it. If so, it is a divergence between the works.
3. **"For 太乙's palace no count is named."** The register (§ "陰陽和不和")
   says this. 金鏡 卷六 推陰陽以占厄會 reads *(web)* 「太乙在陽宮筭得奇為重陽厄在火，
   太乙在陰宮筭得偶為重陰厄在水，若主人得主厄，若客得客厄」. That is each party's
   count against the palace, with the 厄 falling on that party. The register
   read 卷六 leaves 1–6 for the seven 術 boards. This passage (術 15) is
   later in the juan and was apparently not put to the question.
4. **"There is no `lunar-javascript` here. Nothing open computes this board."**
   (§ "The verification"). kintaiyi (GitHub kentang2017/kintaiyi, MIT, since
   2020) does. It offers four bases: 統宗 10 153 917, 金鏡 1 936 557, 淘金歌
   10 154 193 and 太乙局. It is not a witness. It is the independent
   implementation the sentence says does not exist.
5. **"`epoch: taojin` … out by a whole 元."** Both web figures for the 淘金歌
   (10 154 193 and 10 153 977) differ from the 統宗's by 276 and 60 years. In
   each case that is 12 mod 24 (four palace-steps, 四宮 → 九宮, as 盧央 says),
   and neither is 72. 盧央's 元 may mean a sexagenary 元. Check his page; the
   refusal stands either way.
6. **"The tables' trouble is older than either copy"** (§ "卷三十一"). The
   Wikisource 《武經總要》 立成 *(web)*, parsed against `taiyiJu`, agrees on
   主算 in 139 of 144 rows, 客算 in 126, and 太乙's palace in 140. In **all
   fourteen** of the 金鏡's errata cells it agrees with the engine. 陰局 70
   prints 「十」 beside a 大將 in 二宮, so 32 with two numerals lost in the
   transcription. Its 參將 follow ×3 mod 10 in all but a handful of parsed
   cells. It writes 杜 at every count of 25 (about 24 cells), with 「不利，宜固守」.
   That is a fortune `TODO.md` says no source gives. Its 和/不和 labels follow
   none of the three tests cleanly on a first pass. Parsing code and outputs
   were kept outside the repository.
7. **The 統宗's apparatus is 授時 or 庚午元曆.** The register cites 錢大昕
   for 授時. 魯楠, 葉傑 and 李剛 (2025) compare the 寶鑑's three astronomical
   tables to the **庚午元曆** and find them close but differently worded. 王肯堂
   (via the 四庫 提要) gives the 寶鑑's 氣應 as 347 875 分. The register reads
   359 416/446 on pp. 20–21: different quantities, worth putting side by side.
8. **寶鑑 or 大全: one work.** The 四庫 提要 via 王肯堂 quotes the 寶鑑's 積年
   at 大德七年 as **一千零一十五萬五千二百一十九**: the figure the register
   reads on 大全 卷二 p. 19. The 2025 paper treats 故宮 vol. 420 as a version of
   the 寶鑑. This bears on the open line "whether that work and the 《太乙統宗寶
   鑑》 … are one recension".

## 9. Bibliography

**Chinese, primary.**

- 《太乙金鏡式經》, 四庫全書本, Wikisource, 卷一–十:
  https://zh.wikisource.org/wiki/太乙金鏡式經_(四庫全書本). Supports the 起例,
  the triad of 卷四, 卷六's doctrine of counts, the conditions of 卷三, the 五將
  of 卷二, and 大遊 順 in 卷五 (all web transcription).
- 《四庫全書總目提要》卷一百九 (太乙金鏡式經) and 卷一百十一 (太乙統宗寶鑒 二十卷;
  太乙成書; 太乙遁甲專征賦), Wikisource:
  https://zh.wikisource.org/wiki/四庫全書總目提要/卷109 and /卷111. Supports the
  20-juan 寶鑑, 錢曾's appended 淘金歌, 王肯堂's 積年 and 氣應, and the 提要's
  account and critique.
- 《南齊書》卷一 高帝紀上, 史臣曰: https://zh.wikisource.org/wiki/南齊書/卷1.
  Supports the eleven dated positions and the model reading.
- 《武經總要》後集 卷十九–二十: https://zh.wikisource.org/wiki/武經總要/後集/卷十九
  and /卷二十. Supports a third 立成 with verdicts and 杜 (web transcription).
- 《武經總要》 index and 提要: https://zh.wikisource.org/wiki/武經總要. Supports
  the structure of the 後集 (占候, 太乙立成).
- 《太乙淘金歌》, annotated web text by 青羽:
  https://www.guoxueruanjian.com/xuanxue/p/taojinge.html. Supports the verse
  起例, the conditions, 數主陰陽, 三才, 定計, 大遊 逆, 三基 and 陽九 (web
  transcription; the annotations are the poster's).
- 《太乙淘金歌》 holding record, 國家圖書館 抄本:
  https://www.guoxuedashi.com/shumu/714302dl.html. Supports the attribution
  王希明輯 / 丘濬重編.

**Chinese, modern.**

- 何丙郁, 〈太乙術數與《南齊書·高帝本紀上》史臣曰章〉, 《中央研究院歷史語言研究所集刊》
  67.2 (1996): 383–413:
  https://www.ihp.sinica.edu.tw/~bihp/67/67.2/taii.html (abstract seen in
  search results only; the site refused connection). Supports the dating and
  the continuity Tang–Ming.
- 魯楠, 葉傑, 李剛, 〈《太乙統宗寶鑑》中的天文數表校勘〉, 《內蒙古師範大學學報
  (自然科學版)》 54.4 (2025): 427–436:
  https://cjournal.hep.com.cn/1001-8735/CN/10.3969/j.issn.1001-8735.2025.04.014.
  Supports the versions of the 寶鑑 and the 庚午元曆 comparison, and cites
  曲安京 and 邱靖嘉.
- 曲安京, "The First Calendar of Taiyi Method" (甲寅太乙曆), 《清華學報》 28.2
  (1998): https://thjcs.site.nthu.edu.tw/p/16-1452-41436.php?Lang=en (abstract
  only). Supports the 甲寅 epoch and the 大遊 and 五福 periods.
- 盧央, 《中國古代星占學》, 中國科學技術出版社 2007 (★ on the shelf; cited here
  through the register).
- kintaiyi (kentang2017), https://github.com/kentang2017/kintaiyi:
  `src/kintaiyi/kintaiyi.py` (`accnum`) and `docs/guji.md` (a bibliography of
  太乙 titles). Supports the four 積年 bases, the lunar-year cut, and leads on
  extant editions. A program, not a witness.

**English.**

- Ho Peng Yoke, *Chinese Mathematical Astrology: Reaching Out to the Stars*,
  RoutledgeCurzon (Needham Research Institute Series) 2003; Routledge 2013,
  ISBN 9780415863100. Google Books record:
  https://books.google.it/books/about/Chinese_Mathematical_Astrology.html?id=FHBCyHgKkMwC.
  The chapter list and index terms were seen. The text was not read. One
  search-result excerpt gives the host/guest palace favour (1 3 4 8 / 2 6 7 9)
  and the 天目/地目 labels.
- "Taiyi shenshu", English Wikipedia: https://en.wikipedia.org/wiki/Taiyi_shenshu.
  Background only: the 72 + 72 boards and the host, guest and fixed counts.
- Routledge catalogue: https://www.routledge.com/products/9780415297592. The
  table of contents.
