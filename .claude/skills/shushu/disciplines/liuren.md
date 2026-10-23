# 大六壬 dà liùrén — board `liuren`

Researched 2026-10-23. Everything quoted from a web page is marked
`(web transcription)`: it locates a passage for the shelf and moves no rung.
Where this file and `docs/sources.md` differ, the register stands and the
difference is listed in § 8. The project's rules are in `CLAUDE.md`, and are
not repeated here.

Marks: ★ on this project's shelf (`texts/README.md` § liuren and around it);
☆ wanted by `TODO.md` or proposed here and not held.

---

## 1. What the art is

- **Scope.** One of the 三式 sānshì, with 奇門 and 太乙. A question is asked
  at an instant (占時 zhānshí). The board is cast for that instant and read for
  that question. 卜 is the kind of instrument (`needs` in `instruments.ts`).
  It is not a natal art; the 年命 niánmìng (本命 běnmìng, 行年 xíngnián) of
  the person asking enters only as one place on the board.
- **The object.** A 天地盤 tiāndìpán of twelve branches, with the 天盤 turned
  so that the 月將 yuèjiàng (the Sun's palace) stands on the hour. From that
  plate come four 課 kè (lessons) and three 傳 chuán (transmissions), and
  twelve 天將 tiānjiàng are seated round the plate.
- **History, in outline:**
  - **Early Han.** The excavated 式盤 shìpán: 阜陽 雙古堆 (汝陰侯 夏侯竈, sealed
    165 BCE) and later boards from 武威 磨嘴子 and 樂浪. They show the 地盤 and a
    turning 天盤 with the twelve 月將 names.
  - **Received tradition.** It cites 《吳越春秋》 (伍子胥 and 范蠡 laying 時加雞鳴
    and 日出 boards) and 《越絕書》 (「今日壬午時加南方」). The 四庫 提要 to
    《六壬大全》 calls these 似出依托 and dates the method to the Han. ★
    (精校本 reprints the 提要.)
  - **Han to Six Dynasties.** The 道藏 classics 《黃帝龍首經》 and 《黃帝金匱玉衡經》.
    盧央 shows that the 龍首經 does not yet separate a day noble from a night
    noble ★ (`texts/rules/LR-05.md`).
  - **Tang.** 《六壬心鏡》, 徐道符 Xú Dàofú (不欲子), an eight-juan verse that
    became canonical.
  - **Song.** 《景祐六壬神定經》, 楊惟德 Yáng Wéidé and others, written for
    仁宗 (c. 1034, 崇天曆 era). 凌福之's 《畢法賦》 bìfǎfù, a hundred rules.
    邵彥和's 《六壬斷案》, worked cases.
  - **Ming.** 《六壬大全》 (郭載騋, whom 精解 and others call 郭御青), the 四庫
    compendium. 陳公獻 Chén Gōngxiàn's 《大六壬指南》 (序 順治壬辰 1652).
  - **Qing.** Imperial: 《御定六壬直指》 and the 天乙 doctrine of 《星曆考原》 and
    《協紀辨方書》. Private: 《六壬粹言》 (1826), 程樹勳 Chéng Shùxūn's
    《壬學瑣記》 (光緒七年 1881), 《六壬視斯》, 紀大奎's 《六壬類聚》.
  - **Japan.** In the Heian period the art passed into 陰陽道 (安倍晴明's
    《占事略決》). That line is not researched here.

## 2. Texts and lineages

**Classical (Chinese)**

| Work | Date / author | What it is used for |
|---|---|---|
| 《黃帝龍首經》, 《黃帝金匱玉衡經》 ☆ | 道藏; pre-Tang | Oldest procedure. 金匱玉衡經 counts 涉害 on a worked board, counts the 寄干, and splits 晝/夜 nobles; 龍首經 does not split them (via 盧央 ★) |
| 《六壬元女經》 (玄女經) ☆ | Sui, per 程樹勳 | Oldest stated 貴人 table (旦/夕), identical to `guiren: chou` |
| 《六壬心鏡》 ☆ | Tang, 徐道符 | Verse canon. The 1814 鄭天民 collation (with 程偉堂's 輯本 and 郇應清's notes) survives; its `涉害第三` reads depth only, ties to 日上/辰上 (web transcription). Its 「天將順逆」 and 「月將起例」 verses are flagged by the collator as possibly not 徐's |
| 《景祐六壬神定經》 ☆ | Song, 楊惟德 等; 2 juan survive of 10 (四庫 子部) | 月將 by the Sun's 宿度 per 崇天曆, a sunrise/sunset table, the twelve generals with 家 and phase, and the whole 九宗 procedure quoted from 《金匱經》 (web transcription, simplelits) |
| 《夢溪筆談》 卷七 | 沈括, 1088 | The 合神 / 太陽過宮 split of the 月將, and an argument for the Sun. Generals as five fore (木火), five aft (金水), and 天空 as no general (web transcription; via 盧央 ★ in LR-01) |
| 《畢法賦》 | Southern Song, 凌福之 | The hundred 法 of judgement. In 《六壬大全》 卷十一–十二 ★ and 《課經集》 卷一 ★ |
| 《六壬斷案》 ☆ | Southern Song, 邵彥和 | Worked cases. The model of 占驗 for later authors |
| 《六壬大全》 ★ | Ming; 四庫本 12 juan | 卷一 入手法 (the nine rules in verse, which the engine stands on), 貴神, the 64 課目. 卷二 天將, each with 家 and phase. 卷五 課經 with 訂訛, the 課體 defined with worked boards. 卷十一–十二 畢法 |
| 《大六壬指南》 ★ | 陳公獻, 序 1652 | 卷一 心印賦 增注, 卷二 指掌賦, 卷三 占驗, 卷四 莊公遠's 神煞指南. The 增注 is a 月將 witness in the register |
| 《大六壬課經集》 ★ | 郭御青 彙輯 | A book of judgement: 畢法賦 with charts, 課格, 物類. It presumes the board |
| 《官板大六壬神課金口訣》 ★ | 1596 | **A different art.** 四位, not 四課三傳. Held as a boundary marker |
| 《御定六壬直指》 (+ 析義) ★ | Qing, imperial | `guiren: wei` in two verses; `zhouye: branch`; the 月將 by 中氣 |
| 《六壬經緯》 ★ | 毛志道 (京江鐵甕子) | 卷一 演法, 卷二 定式, 卷三 格局. Holds `zhongqi`, `chou` and `branch` |
| 《六壬粹言》 ★ | 劉赤江 輯, 1826 | 卷首 寄宮 and 月將 by 中氣, and the 宗門九式. The held copy ends mid-case |
| 《六壬類聚》 ★ | 紀大奎 (attribution via 精解) | Repertory by subject: 類神, 遁干, 旬空, 應期 |
| 《御定星曆考原》 卷五 ☆ (only 卷一 ★) | 1713 | 天乙貴人: quotes 曹震圭 and the 通書, then rules for the 先天/後天 derivation (`wei`). Wikisource 四庫本 |
| 《協紀辨方書》 卷七 ★ | 1740 | The same twenty seats, derived from the 干德 and its 合 |
| 《易學象數論》 卷六 | 黃宗羲 | Critiques 沈括 and 周述學 on 月將 and precession (web transcription) |
| 《壬學瑣記》 ☆ | 程樹勳, 1881 | Practitioner's notes: the 月將 against 平氣/定氣, the 貴人 derivations, 旦暮 by sunrise, 銀河棹 criticised, a lineage of teachers (web transcription) |
| 《六壬視斯》, 《大六壬易簡》, 《六壬銀河棹》 ☆ | Qing | Reached through 精解 and 程樹勳 only. 銀河棹 (張松源 注) has a 月將 and 貴人 起例 of its own |

**Modern (Chinese).** 《大六壬精解》 ★, 曹福倞・張月明 1995: a punctuated
anthology that names the edition of each work it uses, and the project's most
used 六壬 file. 盧央 《中國古代星占學》 ★, 2007, for the old layer (龍首經,
金匱玉衡經). 袁樹珊's 《大六壬探原》 (Republican) ☆, unverified beyond a
bookseller's note. Of present-day lineages in the 大陸, 香港 and 台灣 practice,
none could be verified in this session, and none is named here.

**English and French scholarship**

- Donald Harper, "The Han Cosmic Board (Shih)", *Early China* 4 (1978–79).
  Christopher Cullen's reply, "Some Further Points on the Shih", *Early China*
  6 (1980–81). Harper's response, same volume, and Cullen's rejoinder,
  *Early China* 7. These are about the instrument.
- Marc Kalinowski, "Les instruments astro-calendériques des Han et la méthode
  liu ren", *BEFEO* (1983; volume 72 by the EFEO listing, unconfirmed). It
  ties the 式盤 to the 六壬 procedure. Also by Kalinowski, an *Early China*
  article on the notion of 式 in Qin–Han calendrical astrology.
- Ho Peng Yoke, *Chinese Mathematical Astrology: Reaching Out to the Stars*
  (RoutledgeCurzon / Needham Research Institute, 2003), ch. 5 "Liuren". This
  is the only English book-length treatment of the procedure found.
- No serious English practitioner manual was found in this session.

## 3. How a board is laid (起例)

Each step gives the readings and the engine parameter, or says *not
modelled*.

**3.1 The 占時.** Two practices:
- **正時 zhèngshí**: the hour at which the question is asked. This is what the
  classics work, and it is the engine's practice.
- **活時 huóshí**: a branch drawn or chosen. Modern teaching (zh.wikipedia)
  records this, and 程樹勳 records drawing a branch with twelve 雷擊棗木
  pellets.
- 盧央 explains why the hour is a 時辰 and not an observed time: the 報時制
  (LR-05).
- *Not modelled.* The engine takes the clock instant through `trueSolarTime`
  and `dayBoundary` (the pillars layer). Whether the 占時 is the true-solar
  時辰 is the pillars' question, not 六壬's.

**3.2 The 月將 (Sun's palace).** The twelve run 亥 登明 dēngmíng, 戌 河魁
hékuí, 酉 從魁, 申 傳送, 未 小吉, 午 勝光, 巳 太乙, 辰 天罡, 卯 太沖, 寅 功曹,
丑 大吉, 子 神后. The change point is a live divergence with three positions.

- **At the 中氣** (`yuejiang: zhongqi`, implemented, the default). Holders:
  - 《六壬大全》, 精解, 經緯 and 直指 ★.
  - 陳公獻's 增注 ★: 「正月雨水後日躔娵訾之次入亥宮」.
  - 沈括: 「今太陽至雨水後方躔諏訾」, and in his own day he treats 雨水 as
    the 太陽過宮.
  - 程樹勳: under the 時憲 定氣 the Sun 「即於交中氣日時過宮」, so the
    中氣 is exact.
- **At the 節** (`yuejiang: jieqi`, refused). 沈括 states this as one of two
  practices current in his time: the 合神 reading, which 「須自立春日便用亥將，驚蟄便用戌將」.
  He rejects it on the ground that the board lays the general on the true
  hour, so the general must be the true Sun. 黃宗羲 (《易學象數論》 卷六)
  disputes what 合神 meant and rejects both reformers. Modern 精解 prints the
  節 beside the 氣 in every row and endorses only the 氣.
- **By the Sun's actual 宿度** (`yuejiang: true`, refused).
  - 《景祐六壬神定經》 釋日度 (web transcription):
    > 「臣等今依大宋《崇天曆》…二十四氣、日宿次合、分璧度數，以定月將」
  - It tabulates the 次 boundaries by 宿度 (e.g. 「自畢宿十二度至東井十五度為傳送於辰在申」)
    and the Sun at each term. It then works a case:
    > 「假令十一月十五日冬至，在南斗六度。至二十一日，在南斗十二度。於辰在丑方，用大吉為月將。若二十日以前…猶用功曹」
  - So the general changes about six days *after* the 中氣.
  - 程樹勳: 「交月將之法，古書間有異同，然總在中氣之後，或一日二日，或三日五日不等」,
    because the Sun's 過宮 was fixed 「於某宿某度」 while the terms were 恆氣
    (mean).
  - 周述學 (雲淵) went further and wanted to rename the generals for
    precession, per 黃宗羲, who refutes him.

**3.3 天地盤: 月將加時 yuèjiàng jiā shí.** The general is set on the 地盤
palace of the hour and the 天盤 turns with it. No divergence inside 六壬 (LR-02).
Two degenerate plates matter later:
- 伏吟 fúyín: the general equals the hour.
- 返吟 fǎnyín: the general stands opposite the hour.

**3.4 寄宮 jìgōng (stem lodging).** 「甲課寅兮乙課辰，丙戊課巳…丁己課未，庚申，辛戌，壬亥，癸課原來丑宮坐，分明不用四正神」
(《六壬大全》卷一 ★). The 四庫 text writes 己 and 巳 for each other; the register
settles this. 陳公獻's gloss: 「陽干居祿神所在，而陰干居祿神前一位」.

**Not dunjia's 寄宮.** 盧央 (LR-03) lists three lodgings: 五行家 戊巳·己午,
六壬家 戊巳·己未, and 遁甲/素問 戊戌·己辰. *Not a parameter*; it is a
boundary between arts.

**3.5 四課 sìkè (four lessons).**
- 一課: the 天盤 over the stem's lodging.
- 二課: the 天盤 over 一課's upper.
- 三課 and 四課: the same from the day branch.

No divergence. Engine: `courses`, verified 17 280/17 280 against `kinliuren`.

**3.6 三傳 sānchuán (three transmissions) by the 九宗門 jiǔzōngmén.** The
engine follows 《六壬大全》卷一 入手法 line by line (`docs/sources.md` § 六壬).
Where other witnesses part from it:

1. **賊剋 zéikè**: a single 下賊上 is taken first (重審 zhòngshěn); failing
   that, a single 上剋下 (元首 yuánshǒu). The 中傳 and 末傳 follow by 相因
   (the upper over each). The witnesses agree. 《金匱經》 (via 神定經) states
   the same precedence.
2. **比用 bǐyòng / 知一 zhīyī**: several of a kind; take the one matching the
   day stem's polarity.
   - 《六壬大全》卷五's 比用格 note uses 比 for *element harmony with the day
     stem* (「用神畏日干所勝以比和者為用」) on six named days. That is a
     different test.
   - *Not modelled*; recorded in § 7.
3. **涉害 shèhài**: several candidates, all or none matching. Three sub-questions,
   each with witnesses:
   - **(a) The order.**
     - *Depth alone, ties to 日上 on a 剛日 and 辰上 on a 柔日*: 《金匱經》
       quoted in 神定經 (「俱比俱不比，以涉害深者為用。涉害復等…剛日用日上神…柔日用辰上神」),
       and 《心鏡》 涉害第三 (web transcriptions).
     - *Depth, then 孟, then 仲, then 日上 or 辰上*: 《六壬大全》卷五 訂訛
       (見機 「渉害俱深則取四孟上神」, 察微, 綴瑕 亦名復等), and 精解 ★, OCR
       lines 1018–1136.
     - *孟 then 仲, no count*: 陳公獻's 增注 ★ (web transcription; the shelf
       OCR is unreadable there): 「先以寅申巳亥上乘之神為用…若孟神上無克賊則以子午卯酉上乘之神為用」.
     - *Palace first, depth inside the group*: the engine and both runnable
       references. "Recorded" in the register.
   - **(b) What is counted.**
     - 精解 and 大全卷五 count the **starting palace** and the **寄干**
       lodged along the way. Example: 亥 on 丑 takes 丑, 辰, 巳's 戊, 未, 未's
       己 and 戌, six in all.
     - 金匱玉衡經 does the same, via 盧央 (LR-04).
     - `liuren.ts`'s `shehai` counts only the branches *after* the start and
       no lodged stems.
   - **(c) The 上剋下 case.** 精解's 今按 (OCR, garbled) appears to count what
     the upper *controls* for 上剋下 and what *controls it* for 下賊上. To be
     read on the plate.
   - All three: *not modelled*.
4. **遙剋 yáokè**: no control in the four. 神遙剋日 is 蒿矢 hāoshǐ, and comes
   first; 日遙剋神 is 彈射 tánshè. Ties go by 比. The witnesses agree.
5. **昴星 mǎoxīng**: 剛日 仰, the upper over 酉 (虎視 hǔshì); 柔日 俯, the
   palace under 天盤 酉 (冬蛇掩目 dōngshéyǎnmù). For the 中傳 and 末傳: 剛日
   辰上 then 日上, 柔日 the reverse. 神定經 and 大全 agree. 盧央 notes that in
   the old layer 昴星 「不傳終也」, with the 中/末 「後世」 (LR-04).
6. **別責 biézé**: three distinct courses, no control. 剛日: the 寄宮 of the
   stem's 干合 partner. 柔日: the 三合 ahead of the branch. Nine boards in
   all, and 大全 and 神定經 agree on the day list. 神定經's 柔日 wording
   differs (「支合上神本位所得之神」, web transcription, possibly corrupt);
   unresolved.
7. **八專 bāzhuān**: the stem and branch share a palace, so there are two
   courses. 「論尅不論遙」. 陽日: three forward from 日上 counting itself.
   陰日: three back from the 辰上 陰神. The 中傳 and 末傳 are 日上. The
   witnesses agree. 獨足 dúzú, where all three are one branch, is a named
   sub-case (大全卷五).
8. **伏吟 fúyín**: 「伏吟有尅還為用」. Without a control: 剛日 日上 (自任
   zìrèn), 柔日 辰上 (自信 zìxìn), then punished onward. Where it punishes
   itself, cross to the other seat (杜傳 dùchuán). Where the second
   transmission punishes itself, take the 冲 for the 末傳. The engine extends
   the 冲 to a punishment returning to the *opening*; that clause is its own
   (register).
9. **返吟 fǎnyín**: a control is answered by the ordinary rule. Without one,
   井欄 jǐnglán: 丑 days open on 亥, 未 days on 巳, then 辰上, then 日上.
   - 大全卷一 ★ says six days.
   - 大全卷五 and 《金匱經》 (神定經) say **four**: 丁未 and 己未 「猶屬八專」.
     The transmissions come out the same (巳丑丑 either way, run 2026-10-23);
     only the name differs.

**3.7 十二天將 and the 貴人 guìrén.** The order is 貴人, 螣蛇, 朱雀, 六合, 勾陳,
青龍, 天空, 白虎, 太常, 玄武, 太陰, 天后 (神定經: 前一 to 前五, 後一 to 後六).

**Which branch seats the noble: `guiren`.**
- **`chou`** (default): 甲戊庚 丑/未, 乙己 子/申, 丙丁 亥/酉, 壬癸 巳/卯, 辛 午/寅.
  Holders:
  - 《元女經》 and its line (徐道符, 凌福之, 元軫, 劉日新, 苗公達, per 程樹勳).
  - 神定經 (旦/暮), 大全, 精解 and 經緯.
  - The 四庫 提要 calls it the book's 「俗例」.
  - 曹震圭 derives it by laying 甲 on 丑 and running backward.
- **`wei`**: 甲 未/丑, 乙 申/子, 丙 酉/亥, 丁 亥/酉, 戊庚 丑/未, 己 子/申, 辛 寅/午,
  壬 卯/巳, 癸 巳/卯. Holders:
  - 直指 and 協紀 (register).
  - 星曆考原 卷五, which rules that 曹 「以陽為陰以陰為陽」.
  - 程樹勳, by the 先天坤 子 / 後天坤 申 derivation, citing 吳越春秋 and
    晉書·戴洋傳.
  - The 提要, citing 吳越春秋.
  - 《六壬大全》卷一 itself sets out this derivation (晝貴甲從子起) and says
    「其說甚有理而近不用」.
- **Not modelled**:
  - 王牧夫 (via 程樹勳) uses 壬 晝卯 夜巳 with the rest as standard.
  - The 子平 verse 「庚辛逢馬虎」 seats 庚 with 辛. It is TODO's "noble of 庚
    seated with 辛's", and is not found in a 六壬 text.
  - 銀河棹 has an 起例 of its own (程樹勳: 子–巳 陽 uses 陰貴).
- `guiren` moves the generals and never the 三傳.

**Day or night half: `zhouye`.**
- **`branch`** (卯–申 晝, 酉–寅 夜; implemented): 精解, 經緯 and 直指.
- **`solar`** (refused): 精解 「古來亦有…准星之出沒或日之出沒而分晝夜者」. 程樹勳:
  「貴人治旦暮，或以日出為旦，用陽貴；日入為暮，用陰貴。或以卯至申…」, quoting
  《六壬心鏡注》 「用晝夜長短分旦暮」. 神定經 釋日出沒 tabulates sunrise and
  sunset per term on the 崇天曆, in a 六壬 book.
- The 通書, as quoted in 星曆考原 卷五, attaches the 陽貴 to 「旦晝於冬至後」
  and the 陰貴 to 「暮夜於夏至後」. That may be a seasonal divider. Unclear; § 7.

**Direction of the other eleven.**
- Engine: forward when the noble stands on 地盤 亥 to 辰, backward on 巳 to 戌.
- 精解 pp. 26–27 (LR-05) and 陳公獻's 增注: 「在天門之前、地戶之後則順行；若居地戶之前、天門之後則逆行」.
- 神定經: 「天乙常背天門向地戶而行」.
- **Caution.** 「晝順夜逆」 in 大全卷一 and 「晝用順貴，夜用逆貴」 on the 金口訣
  volvella name the derivation of the day and night *seat* (順布 from 子,
  逆布 from 申). They are not the direction of the generals.
- *Not modelled*, and **no row in `docs/sources.tsv`** (§ 8).

**Where the noble may not sit.** 「貴人天空不乘辰戌」 (大全卷一 l.463; 程樹勳).
The seat tables already avoid 辰 and 戌.

**3.8 遁干 dùngān and 空亡 kōngwáng.**
- Engine: the stem covering each transmission in the day's 旬, and the two
  void branches of that 旬.
- Variants, *not modelled*:
  - A 五子遁 from the day stem, used in 大全's weather 占 and in 金口訣's 人元.
  - 銀河棹's 天/地/人 遁 (程樹勳: 「節外生枝」).
- Only the transmissions carry 遁干; the courses do not.

**3.9 年命 niánmìng.**
- 本命 (birth-year 干支) and 行年 (男 from 丙寅 forward, 女 from 壬申 back).
- 盧央 shows an older 旬-dependent start counted on twelve branches (LR-07).
- *The 六壬 board carries none today*; § 7.

## 4. How a board is read

The engine stops at the shape; this section is what a consultant gives, each
line attributed.

**4.1 Order of attention.** 精解 斷要 (p. 295, from 《大六壬類聚》; LR-08):
1. From the question, name the 類神 lèishén.
2. Find it in the six places: 日, 辰, 初傳, 中傳, 末傳, 年命. The 年命
   counts twice (本命 and 行年), 「實是七處」.
3. See which palace it stands in and which general rides it.
4. Apply 刑沖破害 and 旺相休囚死.
5. Check 當令, 有氣 and 空亡.

《斷徑了了歌》 reads six *different* places, and 《直啟通神集》 reads eight
(LR-08). Say which set is used.

**4.2 The two sides.**
- 日 (the stem's 一課 and 二課) is the asker, 我. 辰 (三課 and 四課) is the
  other party, the matter, or the house.
- 陳公獻: 「日干為己，支辰為他人；貴神在上尊，月將在下卑」.
- 畢法 23/24: 「彼求我事支傳干，我求彼事干傳支」.
- The prompt already tells a model this (`prompt.liuren.yongshen`).

**4.3 The three transmissions.**
- 初傳 is 發端/發用, the onset; 中傳 is 移易, the turn; 末傳 is 歸計, the
  outcome (zh.wikipedia summarising common teaching).
- 陳公獻: 「賊克為初用之始，相因作中末之身」.
- 末 helping 初, a chain generating toward the day (亨通, 三傳遞生人舉荐 法31),
  and 三傳互克 (法32) are read as the course of events.

**4.4 六親 relative to the day stem.**
- What generates the stem: 父母. What it generates: 子孫. What it controls:
  妻財. What controls it: 官鬼. The same element: 兄弟.
- Each transmission is named by this. 大全卷二: the element is the branch the
  general rides, not the general's own: 「如貴人屬土若乘亥子則屬水矣」.

**4.5 類神 by matter.** Common teaching across 大全卷二, 心鏡 and 類聚:
- **Office or lawsuit**: 官鬼, 貴人 (the judge), 朱雀 (documents), 勾陳
  (litigation).
- **Wealth**: 妻財, 青龍.
- **Marriage**: 青龍 for the man, 天后 for the woman, 六合 for the go-between.
  法40 「後合占婚豈用媒」.
- **Illness**: 白虎, the 官鬼; 法67 「受虎克神為病症」, 法68 「制鬼之位乃良醫」.
- **Theft or flight**: 玄武. 心鏡 閉口: 「捕逃在元武方，捉盜在陰神方」.
- **Travellers**: 驛馬, 遊神, and 行年 (心鏡 行人).
- **Pregnancy**: 胎神 and 天后 (法19/20).
- **Rain**: 大全's 天文 sections.

**4.6 The generals' character.**
- 神定經 (web transcription) gives each its rank under 天乙 and its home:
  貴人 己丑 土, 螣蛇 丁巳 火, 朱雀 丙午 火, 六合 乙卯 木, 勾陳 戊辰 土, 青龍
  甲寅 木, 天后 壬子 水, 太陰 辛酉 金, 玄武 癸亥 水, 太常 己未 土, 白虎 庚申
  金, 天空 戊戌 土.
- Each is then read in 旺/相/死/囚/休. For example 貴人 「在旺有貴人召命印信事…在休上有貴人憂疾病」.
- 《玄女》 in 神定經 gives the twelve one-line meanings (天乙 詔命, 朱雀 文書口舌,
  六合 婚姻, 勾陳 鬥訟田土, 青龍 財喜, 天后 婦女, 太陰 陰私, 玄武 盜賊, 太常 冠帶,
  白虎 死喪, 天空 欺詒, 螣蛇 驚恐).
- 大全卷一 gives each general's meaning by the branch it stands on
  (「貴人…辰戌入獄」, 「螣蛇 不臨戌亥」).

**4.7 The noble's direction as a reading.**
- 心鏡 / 陳公獻: 「天乙順則凡事順，逆則凡事逆。順貴雖凶將降禍必輕；逆貴雖吉將賜福不重」.
- 神定經 (靈轄經): a course in front of 天一 means the matter is quick;
  behind, slow.
- 大全卷五 (重審): 「天乙在亥順行猶輕，天乙臨戌逆行猶重」.

**4.8 課體 kètǐ.**
- 大全卷一 課目 lists sixty-four. Nos. 1–10 are the 九宗門 shapes. Then:
  - Auspicious: 三光, 三陽, 三奇, 六儀, 時泰, 龍德, 官爵, 富貴, 軒蓋, 鑄印,
    斫輪, 引從, 亨通, 繁昌, 榮華, 德慶, 合歡, 和美.
  - Movement: 斬關, 閉口, 遊子, 三交, 亂首, 贅壻, 衝破.
  - Persons: 淫泆, 蕪淫, 解離, 孤寡, 度厄, 無祿, 絕嗣, 迍福.
  - Harms: 侵害, 刑傷, 二煩, 天禍, 天獄, 天寇, 天網, 魄化, 三陰, 龍戰, 死奇,
    災厄, 殃咎, 九醜, 鬼墓, 勵德.
  - Shape: 盤珠, 全局, 玄胎, 連珠, 六純, 物類 (whose own note says
    「三課之說最紛紜」).
- 大全卷五 attaches to each a 象曰, a hexagram, and worked boards: 涉害 →
  坎, 元首 → 乾, 返吟 → 震.
- Readings are attributed, never verdicts. 精解 and 大全 call 元首 「天地得位品物亨」
  and 重審 「以臣諍君詳審行」. 上剋下 means 憂輕, the matter rises from a man
  or from outside; 下賊上 means 憂重, from a woman or from inside (神定經
  靈轄經).
- 伏吟 is still, things hidden or unmoving (「行人立至」 for 自任, 「難期」 for
  自信). 返吟 is coming and going, gain reversed, 「來者思去」.
- 涉害 is hardship, delay, 「苦盡甘來」.

**4.9 畢法賦.** A hundred heuristics, applied after the board. Commonly cited
ones (精校本 卷十一):
- 1 「前後引從升遷吉」.
- 16 「空上乘空事莫追」.
- 36 「干支皆敗勢傾頹」.
- 45 「晝夜貴加求兩貴」.
- 83/84 「萬事喜忻三六合 / 合中犯殺蜜中砒」.
- 94/96 on 空亡.
- 97 「所筮不入仍憑類」.

Quote them as 凌福之's, not as the art's.

**4.10 Timing (應期).** Common teaching: the 類神's or 初傳's branch as a day
or month, delayed by 空亡 until filled (出空) or struck (沖). 程樹勳 dates
outcomes from the transmissions repeatedly (his 庚申 shipwreck case). 心鏡 行人
gives a 孟/仲/季 rule of distance: 孟 not yet left, 仲 on the road, 季
arriving. The engine refuses timing (`docs/refusals.md`).

**4.11 Strength.** 旺相休囚死 by season (大全卷五 opening). The `earth`
convention matters: 大全卷二 gives 太常 「旺四季各十八日」, which is
`earth: eighteen` in dunjia's terms. This is not exposed for 六壬.

## 5. Pitfalls

- **金口訣 is not 六壬.** It shares 月將加時 and the generals' ring and reads
  四位. Never take a rule from it into `liuren.ts` (register; LR-09).
- **寄宮 differs by art.** 六壬 lodges 戊 in 巳 and 己 in 未; 遁甲 lodges 戊 in
  戌 and 己 in 辰; 五行家 lodges 己 in 午 (LR-03). A shared engine table is a
  silent error.
- **月將 against the 節 month.**
  - 月建 changes at the 節, and the 月將 at the 中氣 (or later).
  - Under the 節 month 寅, the general is 子 until 雨水 and 亥 after it.
  - Software that keys the general off the lunar or 節 month gets half of
    every month wrong.
  - 程樹勳 notes some books read 「步戌成歲」 as the Sun in 戌 in 正月: wrong.
- **平氣 against 定氣.** Before 1645 terms were mean (恆氣), and books set the
  過宮 1–5 days after the 中氣. A 時憲-era rule applied to a Ming worked
  example can move the general.
- **Day boundary.** The 日 of the four courses follows `dayBoundary`
  (子時 23:00 by default). A question at 23:30 is the next day's board.
- **True solar time.** The 占時 branch moves with `trueSolarTime`. For a
  place far from its zone meridian the hour can change, and with it the whole
  plate.
- **Lunar date.** It is never an input; the 月將 is solar.
- **Term changes.** The 月將 changes at the 中氣 *instant* (經緯: 「當按曆家中氣交節時刻換之」),
  not at the civil day.
- **「晝順夜逆」 and 順貴/逆貴** name the derivation of the 陽 and 陰 noble.
  They are not the direction the generals are laid. Do not lay the generals
  forward by day and backward by night.
- **辰/日 naming.** In 六壬 「日」 is the day stem and 「辰」 is the day
  *branch*, not the 天罡 辰. 「辰上神」 means the upper over the day branch.
- **涉害 counts.** Manuals differ on whether the starting palace and the
  lodged stems count. Two programs agree with each other on only 82.4 % of
  boards (register). Never report a 涉害 opening as "the" answer without
  naming the rule.
- **返吟 on 丁未 and 己未.** One source names these boards 井欄 and another
  八專; the transmissions are the same.
- **Names that vary.**
  - 井欄射 has the alternative names 無親 and 無依 (大全卷五).
  - 昴星's 剛 case is 虎視 or 轉蓬.
  - 綴瑕 is 復等.
  - 太乙 is a 月將 name here (巳), not the 太乙 of 太乙神數.
  - 天罡 is 辰 here, and the 斗罡 elsewhere.
- **次客 (several askers in one hour).** 神定經 gives the 玄女 rule:
  「陽將臨正時，先用後三，次用前五」. 邵彥和 (via 程樹勳) found it unreliable
  and changed the hour, not the general, or read each asker's 年命. The engine
  gives everyone in one hour the same board. That is a fact to tell the
  consultant, not a fault.

## 6. The engine and this art

**What it computes.** `liurenBoard` (`packages/core/src/liuren.ts`), with
`compute_liuren` and `draw_liuren` (MCP), the CLI `liuren`, and `/[lang]/liuren`.

| Field | Doctrine (§) |
|---|---|
| `yuejiang` (id, hanzi, branch, the seating 中氣) | 3.2 |
| `heaven[i]` (天盤 over 地盤 palace i); the 地盤 is implicit | 3.3 |
| `courses[4]` (`upper`, `lower`, `lowerIsStem`, `general`) | 3.4–3.5, 4.2 |
| `transmissions[3]` (`branch`, `general`, `hiddenStem`, `empty`) | 3.6, 3.8, 4.3 |
| `rule` (one of nine `LiurenRuleId`) | 3.6 |
| `keti` (15 ids: yuanshou, zhongshen, zhiyi, shehai, haoshi, tanshe, hushi, dongshe, bieze, bazhuan, ziren, zixin, duchuan, wuyi, jinglan) | 4.8, the 九宗門 shapes only |
| `generals[12]`, `half: day/night` | 3.7, 4.6–4.7 |
| `unverified` (返吟 only: checked against a text, not a program) | 3.6 (9) |
| `options` {`yuejiang`, `guiren`, `zhouye`} | 3.2, 3.7 |

**Refused, and why.**
- `yuejiang: jieqi` and `true`, and `zhouye: solar`, each want a holder with a
  procedure (`TODO.md` § 1). § 8 lists the leads.
- Interpretation is refused: the 用神, ranking, timing, advice
  (`docs/refusals.md`, `purposes.ts`). The 課體 travel as names only.
- The 十二天將 carry no phase and are drawn in neutral ink. The register has
  no source for them; § 8 gives one.
- No 年命 on this board. No 神煞 (類聚 卷一 and 大全卷一 carry hundreds).
- No 課體 beyond the nine shapes.

**For the consultant.**
- Read `rule` and `keti` as the shape, then apply § 4.
- Name `guiren` as the school that laid the board (the divergences block),
  and say the other exists. The block prints only a parameter with more than
  one implemented value, so it does not carry `yuejiang`; name that from
  `options` where the reading turns on it.
- Never re-derive the transmissions (`prompt.liuren.drawn`).
- Never lay a 奇門 chart of the same instant beside it as corroboration: they
  share the day pillar, the 旬, the void and the generals' names.

## 7. Open questions and candidate TODOs

Each line gives what, why, what would settle it, and whether that is on the
shelf.

1. **`yuejiang: true` — a holder with a procedure.**
   - 《景祐六壬神定經》 釋月將 and 釋日度 (崇天曆 宿度 boundaries, a worked
     case at 冬至 + 6 days). ☆ 四庫 子部, not held.
   - Also 程樹勳 「總在中氣之後」. ☆
   - The engine's `qizheng` `gong: ci` (次 as stretches of 宿度) is the same
     computation, so one implementation could serve both.
2. **`yuejiang: jieqi` — whether 沈括's report of the 合神 practice counts as
   attribution.**
   - 《夢溪筆談》 卷七 describes it and rejects it.
   - It is held through 盧央 ★ (LR-01); the full text ☆.
   - A practitioner text using the 節 as its own rule is still wanted.
3. **`zhouye: solar` — a procedure.**
   - 神定經 釋日出沒 (a 崇天曆 sunrise/sunset table by term).
   - 程樹勳 quoting 《六壬心鏡注》.
   - Both ☆. Decide 日出入 against 「星之出沒」 (精解).
4. **Order of 涉害.**
   - 精解 ★ (its 涉害 section, worked case 正月丁卯日 丑時 亥將 → 亥) and
     大全卷五 訂訛 ★ (both typesettings) hold depth first.
   - 陳公獻's 增注 ★ holds palace first.
   - Read both on the plate. If confirmed this becomes a school parameter
     (e.g. `shehai: depth | palace`), not "recorded".
   - A rough re-implementation (mine, not the engine) parts the two orders on
     roughly 150–200 of the 1 380 涉害 boards.
5. **涉害 count.**
   - Starting palace and 寄干 included (精解 ★, 大全卷五 ★, 金匱玉衡經 via 盧央 ★)
     against excluded (engine).
   - On my rough script it moves nothing under the palace-first order and
     about a dozen boards under depth-first. Verify with the engine's own
     harness.
6. **Direction of the generals.** The rule has witnesses (精解 ★, 增注 ★,
   神定經 ☆) and no row in `docs/sources.tsv`. Add one.
7. **The 通書 clause 「冬至後用之 / 夏至後用之」** on 陽/陰貴 (星曆考原 卷五 ☆,
   協紀 卷七 ★). Read 卷七 to see whether it repeats the clause and whether it
   is a seasonal divider (a candidate `zhouye` value).
8. **The 比用 by element harmony** in 大全卷五 (六 named days). Check on the
   plate whether it is a doctrine or a gloss; a possible divergence of 比.
9. **課體 beyond the nine.** 大全卷一 課目 (64) and 卷五's definitions ★, and
   心鏡 ☆. Each 課體 is a `Pattern`-like shape. Some definitions disagree
   between sources (三奇: 子戌 vs 旬奇), and those owe silence.
10. **年命 on the 六壬 board.** LR-07 has two constructions, modern fixed
    丙寅/壬申 against the old 旬-dependent one. That is a divergence to
    declare before building.
11. **占時: 正時 against 活時.** Probably out of scope (the engine is an
    instant); say so in `docs/refusals.md` if a surface ever offers a drawn
    branch.
12. **遁干: 旬遁 against 五子遁.** No 六壬 witness for 五子遁 on the 三傳 yet,
    beyond 大全's weather use ★. Low priority.
13. **Works to acquire** ☆:
    - 《景祐六壬神定經》 (四庫).
    - 《六壬心鏡》 (嘉慶 鄭天民 校本).
    - 《壬學瑣記》 and its companion 《畢法集覽》.
    - 《黃帝金匱玉衡經》 and 《龍首經》 (道藏).
    - 《六壬斷案》 (邵彥和).
    - 《六壬視斯》.
    - 《御定星曆考原》 卷五.
    - 《夢溪筆談》 (any critical edition).
    - Ho Peng Yoke 2003 ch. 5; Kalinowski BEFEO 1983.

## 8. Leads against the register

1. **The five phases of the 十二天將 — "a file not held" (`TODO.md`,
   `sources.tsv` row 41).**
   - 《六壬大全》 卷二 ★ (論天將) gives each general's 家 and phase:
     「朱雀…位居前二家丙午火」, 「青龍…位居前五家甲寅木」, 「天空…後六家戊戌土」,
     「太常…後四家己未土旺四季各十八日」. Wikisource 四庫本 卷02; the 精校本 ★
     carries it.
   - 神定經 釋天乙 and 心鏡's 天將 list give the same twelve.
   - The ring may be coloured once 卷二 is read on the plate.
2. **「無親, which no source consulted carries」.**
   - 精解 ★ names it: 「名无亲，即所谓井栏格也」 (`texts/rules/LR-04.md`,
     W02243 p. 21).
   - 大全卷五 訂訛 ★ heads 「井欄射亦名無親」, glossed 「全是冲開渙散不屬故又名無親」.
   - It also heads 「返吟亦名無依」, which supports the engine's `wuyi` for
     返吟 with a control.
   - 陳公獻's 增注 (web transcription): 「乃名無依（無親、井欄）」.
3. **"The order of 涉害: a text holding either reading by name" (TODO).**
   - 精解 ★ and 大全卷五 ★ hold depth first, with worked boards the engine
     contradicts:
     - 正月丁卯日 亥將 丑時: 精解 and 大全 open 亥, the engine opens 丑
       (run 2026-10-23).
     - 甲辰日 亥將 卯時 (觀月經 note): 「當以神后發用…用戌者非也」, but the
       engine opens 戌.
   - 增注 ★ holds palace first. 《金匱經》 and 心鏡 ☆ hold depth with no
     palace step.
   - The row reads `recorded` and should become a parameter with holders.
   - **The 丁卯 case is probably the bench's failing 涉害.**
4. **The 涉害 count.** The register describes the count as walking "forward
   to the home palace" and is silent on the starting palace and the 寄干,
   which 精解 ★ and 大全卷五 ★ both count.
5. **`guiren: wei` holders.**
   - 《六壬大全》卷一 ★ (the 貴神 passage after the 課目) carries the
     derivation and calls it 「其說甚有理而近不用」. That is the 大全
     attesting the reading as known and set aside, which is attribution of a
     practice.
   - 星曆考原 卷五 ☆ rules for it explicitly against 曹震圭 (Wikisource; the
     shelf holds 卷一 only, so not yet a held witness).
   - Neither is in row 44.
6. **`zhouye: solar` — "neither with a procedure".** See § 7.3.
   神定經's sunrise table is a procedure printed in a 六壬 work.
7. **`yuejiang: true` — "no text states the second at all".** 神定經 states it
   and works it (§ 3.2). `yuejiang: jieqi` — "None found". 沈括 describes it
   as a current practice (LR-01 already quotes this; the register's row does
   not).
8. **返吟 「六日」.** The register checks the engine against 卷一's six days.
   大全卷五 and 《金匱經》 say four, with 丁未 and 己未 as 八專. Transmissions
   are identical, so the effect is on the name only.
9. **The direction of the generals has no register row** (§ 7.6).

## 9. Bibliography

**Chinese — primary, online (all web transcriptions)**
- 《六壬大全》 四庫全書本, 卷01–08, zh.wikisource:
  https://zh.wikisource.org/wiki/六壬大全_(四庫全書本)/卷01 (and /卷02, /卷05).
  - 卷01: 入手法, 課目, the 貴神 derivation.
  - 卷02: the generals' 家 and phases.
  - 卷05: 課經 with 訂訛 (涉害 order, 無依/無親, 返吟 four days).
- 《六壬指南》 卷一 注釋心印賦, zh.wikisource:
  https://zh.wikisource.org/wiki/六壬指南/1 — 月將 by 中氣, 涉害 孟→仲,
  the generals' direction, 無依/無親/井欄.
- 《壬學瑣記》, 程樹勳, zh.wikisource: https://zh.wikisource.org/wiki/壬学琐记
  — 月將 after the 中氣, 貴人 derivations and lineage, 旦暮, 銀河棹, 王牧夫.
- 《易學象數論》 卷六 六壬一/二, 黃宗羲:
  https://zh.wikisource.org/wiki/易學象數論/六壬一 — 沈括 and 周述學 on the
  月將, and 冷州鳩.
- 《夢溪筆談》 卷七, 沈括: https://zh.wikisource.org/wiki/夢溪筆談/卷07 — 合神
  against 太陽過宮; the generals as 11.
- 《御定星曆考原》 卷五 四庫本:
  https://zh.wikisource.org/wiki/御定星厯考原_(四庫全書本)/卷5 — 天乙 by
  曹震圭 against the 通書; the 冬至/夏至 clause.
- 《景祐六壬神定經》, simplelits:
  https://simplelits.com/books/classical/classical-08345-景祐六壬神定经 (/2, /3)
  — 月將 by 宿度, 日出沒, the generals, the 金匱經 procedure, 次客.
- 《大六壬心鏡》 (鄭天民 校), simplelits:
  https://simplelits.com/books/classical/classical-08196-大六壬心镜 — 涉害,
  the generals with 家, 行人.
- 《注解大六壬指南》 catalogue, simplelits:
  https://simplelits.com/books/classical/classical-06985-注解大六壬指南 — the
  book's structure.
- zh.wikipedia 大六壬: https://zh.wikipedia.org/wiki/大六壬 — 正時/活時,
  the canonical-work list (tertiary).

**Chinese — on the shelf ★** (read for this file through their text layers in
`texts/liuren/.txt/`)
- 精校本六壬大全: 提要 (俗例, 曹震圭, 吳越春秋) and 畢法 list.
- 大六壬精解: 涉害 section with worked cases.
- 大六壬指南 (OCR unreadable at the 增注).
- `texts/rules/LR-01`–`LR-09` (finding aids over 精解, 盧央, 金口訣).

**English / French**
- Harper, "The Han Cosmic Board (Shih)", *Early China* 4 (1978–79); and the
  reply in *Early China* 6.
  https://resolve.cambridge.org/core/journals/early-china/article/han-cosmic-board-shih/2F2DFDBE0194DAA0FB4D16E9A06812B7
- Cullen, "Some Further Points on the Shih", *Early China* 6 (1980–81).
  https://resolve.cambridge.org/core/journals/early-china/article/some-further-points-on-the-shih/51924983EEEA581F317FF2833A9FFC4A
- Kalinowski, "Les instruments astro-calendériques des Han et la méthode liu
  ren", *BEFEO*, 1983 (volume per EFEO listing; not confirmed):
  https://ikgf.fau.de/people/index.shtml/marc-kalinowski.shtml
- Kalinowski, *Early China* article on 式 in Qin–Han calendrical astrology:
  https://cambridge.org/core/journals/early-china/article/notion-of-shi-and-some-related-terms-in-qinhan-calendrical-astrology/9902CD3C342AB764ACA286971C80B09C
- Ho Peng Yoke, *Chinese Mathematical Astrology* (2003), ch. 5 "Liuren":
  https://www.routledge.com/Chinese-Mathematical-Astrology-Reaching-Out-to-the-Stars/Yoke/p/book/9780415863100
- Wikipedia, "Shuanggudui" (the 165 BCE 式盤): https://en.wikipedia.org/wiki/Shuanggudui

**Not verified this session.** The web-search budget ran out. Not confirmed:
- 嚴敦傑 「式盤綜述」 (考古學報, 1985).
- 李零 《中國方術考》 on the 式.
- Modern 六壬 authors after 1995.
- Kalinowski's exact volume numbers.
