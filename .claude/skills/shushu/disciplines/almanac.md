# 曆注 lìzhù and 擇日 zérì / 擇時 zéshí — the almanac's page and the choosing of a time

Engine boards: `almanac` (parameter `shensha: xieji`, the one value), the twelve
hours carried on a `system: rijia` day board, and the scan `scan_moments` /
`/api/moments` / `/[lang]/moments`. Calendar mechanics shared with every art
(the 節, 立春, the 子 hour, 120°E) are in `common/foundations.md` § 1 and are
not repeated here. Anything marked *(web transcription)* is a lead for the
shelf, never a witness.

---

## 1. What the art is

**Two objects, one tradition.** The 曆注 is what a printed almanac sets under a
date: the day's officer, its lodge, the gods of the year, month, day and hour,
and — in every printed copy, though not in this engine — the 宜忌 yíjì, what the
day suits and forbids. It belongs to the date, and so to everybody who opens the
same page. 擇日 / 擇時 is the use made of it: **an undertaking is fixed first
(marrying, moving house, breaking ground, burying, setting out), and a day, an
hour and a direction are then sought for it.** The question is neither asked at
an instant (卜) nor about a birth (命) nor about a year (天): it is a choice
among instants not yet arrived. A birth enters only as a filter — the person's
year must not clash with the day (日沖 rìchōng), or must ride a good palace of
a 奇門 board (§ 4.5).

**History in ten lines.**

- **Warring States–Han: the 日書 rìshū (daybooks).** 九店 jiǔdiàn (楚, 3rd c. BCE) and
  睡虎地 shuìhǔdì (秦, before 217 BCE) already carry 建除 jiànchú — 睡虎地 in two
  systems, a 秦除 qínchú and a 楚除 chǔchú (李家浩 1999) — and 叢辰 cóngchén /
  稷辰 jìchén. Kalinowski (1986; Harper & Kalinowski 2017) is the standard
  account in a Western language.
- **The art was plural from its first datable report.** 《史記·日者列傳》, in
  褚少孫 Chǔ Shàosūn's supplement: Han 武帝 asked whether a given day suited
  taking a wife; 「五行家曰可，堪輿家曰不可，建除家曰不吉，叢辰家曰大凶，歷家曰小凶，
  天人家曰小吉，太一家曰大吉。辯訟不決……制曰：『避諸死忌，以五行為主』」
  *(web transcription, zh.wikisource 史記/卷127)*. Seven schools, seven verdicts,
  and an edict that picked one.
- **Tang–Song: the 具注曆 jùzhù lì**, the annotated calendar — Turfan 658 is the
  oldest, Dunhuang holds some fifty of the 9th–10th c. (Arrault 2003, 2020),
  already with the 28 lodges counted through seven sexagenary cycles.
  南宋 《三曆撮要》 lists 22 undertakings by month.
- **Yuan–Ming: the 通書 tōngshū**, the private selection book: 《新刊陰陽寶鑑剋擇
  通書》 (Yuan), 熊宗立 Xióng Zōnglì's 《類編曆法通書大全》 and 《鰲頭通書》 (15th c.),
  and 《玉匣記》 Yùxiá jì, fathered on 許真君 (preface dated 1433; 道藏 DZ1480,
  1607).
- **Qing: the state adjudicates.** 康熙二十二年 (1683) a 選擇通書 and 萬年書 were
  issued and did not agree; 《御定星歷考原》 Xīnglì kǎoyuán (李光地 Lǐ Guāngdì et
  al., 1713, 6 juan) recompiled them on 曹震圭 Cáo Zhènguī's 《曆事明原》; then the
  欽天監 head 進愛 Jìn Ài memorialised for a revision and 《欽定協紀辨方書》
  Xiéjì biànfāng shū (允祿 Yǔnlù et al., 乾隆四年 1739, 36 juan) became the
  standard behind the official 時憲書 shíxiàn shū. From 1751 private almanacs
  could be printed if set from the official base text (Hiroshima paper, *web*).
- **After 1739** the private 通書 either abridge the 協紀 (《諏吉便覽》, 姚承輿
  《擇吉會要》 1849) or argue with it (李奉來 《崇正闢謬永吉通書》 1771, 胡暉
  《選擇求真》 1809, 魏明遠 《象吉通書》 1721 before it); 洪潮和 Hóng Cháohé's
  繼成堂 almanac (from 1797) dominated the south-east coast. The Hong Kong
  通勝 tōngshèng («通書» renamed, 書 sounding like «lose») is today compiled by
  one house, 蔡真步堂 (蔡伯勵 Cài Bólì's line) — and some ten variant 通勝 circulate
  in Hong Kong and Taiwan with differing data.

---

## 2. Texts and lineages

★ on this project's shelf (`texts/README.md` § almanac and § qimen); ☆ wanted
and not held (`TODO.md`, `texts/README.md` § Still missing).

**The standard and its predecessor**

- **《欽定協紀辨方書》**, 36 juan, 1739. ★ (上) in the 華齡 2009 typesetting
  (`xieji-bianfang-hualing-shang`, 卷一–八 at least, OCR'd: search here) and ★
  卷七–八 on the 四庫 woodblock (`xieji-bianfang-skqs-juan07-08`: cite here).
  ☆ (下). Structure *(web transcription, Wikisource 目錄; agrees with 黃啟書
  2003)*: 本原 二 · **義例 六 (卷三–八)** · 立成 · **宜忌 (卷十)** · **用事 (卷十一)** ·
  公規 二 · 年表 六 · 月表 十二 · 日表 · **利用 二 (卷三十三–四, 造命 for building and
  burial)** · 附錄 · **辨訛 (卷三十六)**. Its stated aim: 「盡破世俗術家選擇附會不經
  拘忌鮮當之說而正之以干支生尅衰旺之理」 *(web)*. It struck 合婚, 大小利月 and
  everything resting on 《玉匣記》. It quotes 《神樞經》, 《萬全廣濟》, 曹震圭,
  邵泰衢, the 歷例 and the 考原 — the first two survive only there.
- **《御定星歷考原》**, 6 juan, 1713. ★ 卷一 only (`xingli-kaoyuan-skqs`); ☆
  卷二–六, the most wanted item on the shelf. **The whole work is transcribed on
  zh.wikisource** as 「御定星厯考原 (四庫全書本)」 卷1–6 *(web transcription)*:
  卷二 年神方位, 卷三 月事吉神, 卷四 月事凶神, 卷五 日時總類 (十二神, 黃黑二道,
  天乙貴人, 喜神, 二十八宿配日, 旬中空亡, 截路空亡, 日遊神, 四煞沒時 …), 卷六
  用事宜忌. A finding aid that says exactly which leaf to look for (§ 7).
- 曹震圭 《曆事明原》 (Yuan): reached only through the 考原 and the 協紀.

**The 通書 line** (none held; all ☆ in the sense of § 7, none yet in `TODO.md`)

- 《三曆撮要》 (南宋, anon.); 《新刊陰陽寶鑑剋擇通書》 (Yuan, 前集五卷 後集五卷 —
  建除 宜忌 in 後集卷三); 熊宗立 《類編曆法通書大全》 30 juan (adds 叢辰), 《鰲頭通書》;
  林紹周 《三台便覽通書正宗》 (萬曆); 汪三益 《參籌秘書》 (崇禎; military selection
  by 太乙, 六壬, 奇門, 禽遁); 朱權 《臞仙肘後神樞》 and 《肘後經》 (in 古今圖書集成
  選擇部); 魏明遠 《新增象吉通書大全》 29 juan (1721: 時憲 calendar, lodges, 奇門,
  禽遁, the 二十四山); 李奉來 《崇正闢謬永吉通書》 14 juan (1771: opens on 楊筠松's
  造命千金歌); 胡暉 《精訂選擇求真》 10 juan (1809, on the 協紀's stars); 洪潮和
  繼成堂 通書 and 《剋擇講義》 (嘉慶); 俞榮寬 《參星祕要諏吉便覽》; 姚承輿
  《擇吉會要》 (1849). All from 黃啟書's survey (2003), which ranks the 協紀 「最為
  體大思精」.
- 《玉匣記》 (許真君, Ming; DZ1480; endless 增補 editions): what the 協紀 struck.
- **The 時憲書** (official annual almanac, Qing): copies digitised at 史語所
  (光緒 issues). **The Hong Kong 通勝** (蔡真步堂; 永經堂 prints): 春牛圖, 地母經,
  each day's 宜忌, 沖煞, 胎神占方, 彭祖百忌, 吉神方 (喜神, 財神, 福神, 貴神), hour
  吉凶 — the page a modern reader holds.

**The 奇門 side of choosing** (all ★ on the qimen shelf)

- 《御定奇門大全》 卷六十 (an almanac: 二十八宿值日, 十二神, 十二時 黃黑道, 天赦,
  百忌, 太白逐日遊方, 嫁娶周堂 — located, not read) and 卷六十一–六十四 **寶鏡圖**:
  a 日家 board, a direction to leave by and twelve hours with their gods on each
  of the sixty days (`docs/sources.md` § 「《御定奇門大全》卷六十–六十四」).
- 《日家奇門》 (鮮紅草, 1998): 120 day blocks with 黃黑道 hours, 貴人, 截空,
  五不遇, 喜神方 and a 「大吉時」 column — a bench, not a lineage.
- 《遁甲演義》 (程道生, 明), the 本命 criterion of the scan; 《遁甲集成》 第二冊's
  奇門秘要 has a 選擇用法 section (located, not read); the 煙波釣叟歌 in the
  秘笈大全 and the 統宗.

**Other ★ used for this art**: 《三命通會》, to document that 子平 derives
天德, 月德, 劫煞 and the rest *otherwise* (`texts/README.md` bazi row).

**Modern practice and English**

- Lineages a consultant will meet: **正五行擇日** (the 協紀's 干支生剋衰旺 and the
  造命 of 卷三十三: 補龍 bǔlóng, 扶山 fúshān, 相主 xiàngzhǔ), **董公擇日** (a
  stand-alone table of the 建除 by month), **天星擇日** (七政 positions; see
  `disciplines/qizheng.md`; `qizheng-siyu-tianxing-zeri` ★ lecture notes),
  **奇門擇日**, **玄空 / 紫白** (the 三元九星 flying stars). None of these is a
  parameter here; they are named so a reading can say whose it is.
- English: Smith, *Fortune-tellers and Philosophers* (1991) and *Chinese
  Almanacs* (1992); Palmer et al., *T'ung Shu* (1986, a translated Hong Kong
  almanac); Harper & Kalinowski eds., *Books of Fate and Popular Culture in
  Early China* (2017); Kalinowski, T'oung Pao 72 (1986); Poo Mu-chou, T'oung
  Pao 79 (1993); Arrault on Dunhuang (2003, 2020). Chinese scholarship: 劉樂賢
  《睡虎地秦簡日書研究》 (1994), 李家浩 on 楚除 (1999), 黃一農 on 尹灣 selection
  (1999) and 《社會天文學史十講》, 黃啟書's 日書–通書 comparison (2003).

---

## 3. How the page is laid (起例)

Every step below is 《協紀辨方書》's unless said; the engine value is
`shensha: xieji` throughout, and the date grain is fixed (no `dayBoundary`, no
`trueSolarTime`, no `yearBoundary` reaches it — `docs/parameters.md` § 曆注).

1. **The date, on 120°E.** The page is a published artefact: the civil day at
   120°E, not the chart's zone. *Divergence:* none among almanacs; software
   that reckons in local time prints a different page near midnight. Not
   modelled (deliberately).
2. **The month, by the date of the 節.** The whole of a 節's day belongs to the
   new month; a pillar turns at the instant. *Divergence:* `lunar-javascript`
   exposes three «sects» for 年神/太歲 — 立春's day (its default), 正月初一, the
   立春 instant (6tail docs, *web*). The engine is the first. Not modelled.
3. **建除十二神**: 建 on the day whose branch is the month's, 「順行十二辰」, and
   「每月交節則疊兩值日」 (卷四, quoting the 厯書). The doubling falls out of the
   date grain (`doubled`). *Divergence:* 睡虎地's two 除 tables (秦除, 楚除) part
   from each other and from the received one (李家浩; Kalinowski). Not
   modelled — no living lineage holds them.
4. **二十八宿值日**: one unbroken count of days, `(dayNumber + 11) % 28`, 井 on
   2026-01-01, each lodge tied to a 七政 and so to a weekday. The 考原 卷五
   *(web transcription)* states the frame: 「日有六十，宿有二十八，四百二十日而一週
   ……故有七元之說：一元甲子日起虛……二元甲子起奎，三元甲子起畢，四元甲子起鬼，五元
   甲子起翼，六元甲子起氐，七元甲子起箕」 — and adds 「一元起於何年月日則不可得而
   考矣」 — with the 七曜 「虛昴星房為太陽……危畢張心為太隂……奎井角斗屬木」.
   *Divergence:* the folk 楊公忌 restarts the count at 角 on each 元旦, which the
   協紀 卷三十六 rejects (§ 8). The 禽象 (鬼金羊) are left out as late
   (卷一 「近代方有之」). Not a parameter.
5. **十二神 (黃道 / 黑道) of the day**: 司命 子 · 勾陳 丑 · 青龍 寅 · 明堂 卯 · 天刑 辰
   · 朱雀 巳 · 金匱 午 · 天德 未 · 白虎 申 · 玉堂 酉 · 天牢 戌 · 玄武 亥, turned
   「以天罡加於建上」 (卷七). The 考原 卷五 gives the same as a table by month
   pairs — 「寅申青龍起子，卯酉起寅，辰戌起辰，巳亥起午，子午起申，丑未起戌」
   *(web)* — which the engine's `dayGodOf` reproduces. 吉: 司命 青龍 明堂 金匱 天德
   玉堂; 凶: the other six. *Divergence:* 曹震圭's 納甲 derivation and 邵泰衢's
   pairing with 建除, both rejected in 卷七 and neither enumerated there. Not
   modelled.
6. **The hours' god**: the same rule one cycle down — 「視其日、其時所履之神」 —
   the 天罡 laid on the *day's* branch. Same twelve, same valence.
7. **年神 (from the year's branch or stem, turned at 立春's date)**: 26 from
   卷三 — 太歲, 歲破, 大將軍, 太陰, 黃幡, 豹尾, 喪門, 弔客, 白虎, 病符, 死符, 大煞,
   劫煞 · 災煞 · 歲煞 (the 三煞 sānshà, one rule: 絕 胎 養 of the triad), 大耗, 小耗,
   歲枝德, 歲德 and 歲德合 (stems), 破敗五鬼 (a trigram), 奏書 · 博士 · 力士 · 蠶室
   (corner trigrams), 金神 (several branches). Seats are shared on purpose
   (「美惡不嫌同位」). *Not carried:* 日遊神 (read, a fifth seat kind — a room
   quarter), 蠶室's divination and 蠶命 (disowned by the source), 三元九星 / 紫白
   (考原 卷二, 協紀 卷八), the 24 bearings of 卷八 (歲祿 …). Not parameters.
8. **四德 of the month**: 月德 (the yang stem of the month's triad phase: 丙 甲 壬
   庚), 月德合, 天德 (堪輿經: 「正月丁，二月坤，三月壬，四月辛，五月乾，六月甲，七月癸，
   八月艮，九月丙，十月乙，十一月巽，十二月庚」), 天德合 (none in the four 仲 months —
   a trigram has no 五合). A day carries one only when its stem is the seat.
   *Divergence:* the pre-1739 通書 put 天德 on days in the 子 and 巳 months
   (進愛's memorial, § 7). Not modelled.
9. **神煞 of the day**: 天赦, 四相, 解神, 九空, 五虛, 五合 · 五離, 三合, 臨日, 六合,
   天倉, 大時, 遊禍, 歸忌, 陰德, 要安 · 金堂 · 普護 · 聖心 · 續世, 陽德 · 天馬 · 兵禁, 土符,
   月煞, 地囊, 月害, 天吏, 四絕, 四離 (卷五–六). *Out:* 母倉 (needs 土王用事,
   not computed), 大敗, the other four of the 九神, most of 卷五–六. *Divergence:*
   the old 通書's 九空 and 大敗 (§ 7). Not modelled.
10. **The hour marks, off the day's stem** (卷七; on the day board only):
    - **天乙貴人**: both seats of the stem, neither named 陽 or 陰. *Divergence
      on which is 陽*: `liuren.guiren` (`chou`: 甲戊庚 牛羊 with 丑 the 陽貴;
      `wei`: the 協紀's 起例 read seat for seat). The 考原 卷五 reports 曹震圭
      (陽貴 「以甲加丑逆行」, 陰貴 「以甲加未順行」) and a 通書 reading (陽貴 from
      子 by the 先天坤, 陰貴 from 申) and rules 「當以起未而順者為陽，起丑而逆者為
      隂方是」 *(web)*. *Divergence on 庚*: 「六辛逢馬虎」 against 「庚辛逢馬虎」;
      `lunar-javascript`'s 陰貴神 follows the second *(6tail docs, web)*.
      *Divergence on day and night*: 「或以卯酉為限，或以日出入為限……自當以日出入
      為定」 (卷七), and a solstice rule the 考原 attributes to the 通書 —
      「旦晝於冬至後用之……暮夜於夏至後用之」 *(web, unread on a plate)*. The almanac
      flags both seats and models none of this; `liuren.zhouye` models the first
      two for 六壬.
    - **喜神**: 「甲己日艮方寅時，乙庚日乾方戌時，丙辛日坤方申時，丁壬日離方午時，
      戊癸日巽方辰時」, the hour of 丙 by 五虎元. *Divergence:* the old 通書 also
      made 甲日丑時 a 喜神 hour, 「以丑寅皆屬艮」, corrected in 1739 (memorial,
      *web*). A second, hour-wise 喜神 — every 丙丁 hour by 五鼠遁 — is quoted from
      the 神煞起例 inside the 截路 entry (§ 8). Not modelled.
    - **截路空亡**: the 壬 and 癸 hours, by the 考原's rule 「遇壬癸也」, which on
      a 戊 or 癸 day is four (子丑戌亥) — the 協紀 quotes the 歷例's list with all
      four. **The engine marks four.** *Divergence:* the 考原 卷五's own list
      reads 「戊癸日子丑時」 *(web transcription)*; 寶鏡圖's 癸未 leaf ★ gives
      子丑 only; the folk verse 「戊癸子丑高聲叫」 *(web)*. Not modelled (§ 7).
    - **五不遇時**: 時干尅日干, same polarity (神煞起例), which strikes twice on
      己 days (乙丑, 乙亥) and 庚 days (丙子, 丙戌); the mnemonic names the first.
      **The engine marks both** (`unmetHour`, `patterns.test.ts`). The 遁甲隱公歌註's
      reading by the branch as well (「時支尅日支名為損明」) is recorded and set
      aside by the 協紀's own 按. Not modelled.
    - *Not carried from 卷七*: 天官貴人 (「日隨干官星」), 福星貴人 (「日干生時干」),
      八祿, 日建 · 日破 · 日合 · 日害 · 日刑, 四大吉時 (the 四煞 sunk in the four
      corners by the 月將), 貴登天門時 (the noble on 乾亥), 九醜, 旬中空亡.
11. **宜忌**: refused (`docs/sources.md` § 曆注, "What is not here", and the
    header of `packages/core/src/almanac.ts`; `docs/refusals.md` § "Ordering
    two hours").
    The consultant supplies it, attributed (§ 4).

---

## 4. How a page is read, and a time chosen

The engine stops at § 3. Everything here is a reading, and each is somebody's.

### 4.1 The 協紀's own method: grade, then weigh

- **Undertaking first, gods second.** 卷十一 用事: 「以事為經以神為緯」 — the
  almanac is organised by undertaking, each with the gods that permit and
  forbid it, over three lists: 御用六十七事, 民用三十七事, 通書選擇六十事 *(web)*.
  Ask what the person is doing before reading a single god.
- **The six grades of 卷十 宜忌等第表** *(web transcription)* decide what a day
  carrying both good and bad gods is worth:
  - 上: 「吉足勝凶，從宜不從忌」;
  - 上次: 「吉足抵凶，遇德從宜不從忌，不遇從宜亦從忌」;
  - 中: 「吉不抵凶，遇德則吉勝，從宜不從忌，不遇從忌不從宜」;
  - 中次: 「凶勝於吉，遇德始相抵，從宜亦從忌，不遇從忌不從宜」;
  - 下: 「凶又逢凶，遇德從忌不從宜，不遇諸事皆忌」;
  - 最下: 「凶叠大凶，遇德仍諸事皆忌」.
  «德» here is the 四德 (and 天赦, 天願, 月恩 in the same family): **the 四德 the
  engine reports with `onDay` are the hinge of the whole grading.** And
  「有其情即有其力，力有相勝則其情隨之而變」: a god's power is relative.
- **The scale of time** (a 通書 quoted in 卷七, under 貴登天門): 「年之善不如月之善，
  月之善不如日之善，日之善不如時之善」 — and yet in practice the year's 歲破
  direction and the month's 月破 day are cleared first, because they veto.

### 4.2 The common order a practitioner follows (attributable to the 通書 line and the Hong Kong 通勝 practice; *unweighed against a single text*)

1. **The year's bearings** for anything that moves earth or faces a direction:
   太歲 (do not break ground at it — 「太歲頭上動土」), 歲破 opposite it, the
   三煞, 五黃 (紫白, not computed here). The engine's `yearGods` give the first
   two and the 三煞.
2. **The month's virtues and the day's officer.** 建除 in popular 通書 use: 成,
   開, 定 (and 除 for clearing, 滿 for receiving) are generally taken as
   favourable; 破 (the day facing the month — 月破, everywhere avoided), 危 and
   閉 as unfavourable for most acts; 建 is the month's own branch and its use is
   debated. The 協紀 gives each officer its own 宜忌 in 卷十 — quote that, not a
   gloss.
3. **The day's gods and its 十二神**: a 黃道 day (司命 青龍 明堂 金匱 天德 玉堂) is
   preferred by popular practice; the 協紀 says the pair 黃道/黑道 is only 吉/凶 by
   another name (卷七), so a consultant should not make it mean more.
4. **The person.** The day's branch must not clash with the person's year branch
   (the 通勝's 「沖X」 line), and for marriage, building and burial the 正五行 school
   requires the day's pillars to support the person's (造命, 卷三十三: 補龍, 扶山,
   相主). This is where a birth enters 擇日, and it is a filter, never a reading
   of the person.
5. **The hour**: a 黃道 hour of the day, a noble's hour (天乙), the 喜神 hour; and
   none of 截路空亡, 五不遇時, 旬空 (the 協紀 卷七 gives 「貴人登天門乃時之最善」;
   《日家奇門》 orders its 「大吉時」 by such flags — that ordering is refused here).
6. **The direction**: leave toward 喜神 (marriage, setting out), 財神 for trade,
   the noble's bearing for petitions — Hong Kong 通勝 practice; `lunar-javascript`
   prints 喜神, 福神 (two schools, its default «流派2»), 財神, 陽貴, 陰貴 *(web)*.
   The 協紀 warns against using 喜神 alone: 「亦須與其他神煞參論……又不得以其為喜神
   而用之也」 (卷七 按, *web*).

### 4.3 What each god is said to mean (attributed; give it as the source's)

- **截路空亡**: the 考原 「行路而遇水則不可行也」 — avoid for travel. The 協紀's 按
  disarms it: 「若以行路遇水為截，則方之舟之可矣，何截之有」, and explains it two
  other ways — the ten stems exhausted, so the next two branches are the 旬空
  (「十干至此而極其下二支即是旬空」), and 奇門's reverence for 丙丁, which 壬癸
  control (「竒門最重丙丁故忌壬癸尅之」).
- **五不遇時**: 「時干尅日干……名為辱損明，舉事遙遙終不定，朝行暮敗損精兵」
  (遁甲隱公歌, quoted in 卷七, *web*). The 煙波釣叟歌 calls it the hour when 「龍不
  精」.
- **天赦**: the one day a year per season on which faults are «pardoned»; it
  ranks with the 四德 in rescuing a day (卷十 grading).
- **四絕 · 四離**: the eves of the 立 and of the 分至 — transitions; most 通書 forbid
  starting anything.
- **年神**: almost every 卷三 entry is a ban on building, moving, marrying or
  travelling *toward* the bearing — 「其地不可興造移徙嫁娶遠行」. Read the bearing
  as «don't move earth or set out *that way*», which is what the source says.

### 4.4 Choosing by the 奇門 board (擇時擇方)

The scan's premise (`scan.ts`): 擇時擇方 is what 遁甲 was for before it answered
questions, and **the answer is an hour and a direction together**.

- **The gate is the undertaking's** (`purposes.ts`, three concordant witnesses):
  開門 for opening and office, 休門 for meeting a superior and marriage, 生門 for
  money, 景門 for documents, 杜門 for hiding, 傷門 for pursuing a debt, 死門 for
  burial, 驚門 for catching a thief. Leave toward the palace where it stands.
- **The three 奇 on a good gate.** The 煙波釣叟歌: 「吉門偶爾合三奇，值此須云百
  事宜」, and check the palaces beside it — 「更合從旁加檢點，餘宮不可有微疵」
  *(web transcription; the 秘笈大全 ★ carries the verse)*. 三奇得使 is `deshi`.
- **Avoid**: 五不遇時, 三奇入墓 / 時干入墓, 六儀擊刑, 門迫, 伏吟 and 反吟 of the whole
  board; 庚 (太白) against the direction, 太白入熒 for an army.
- **The person**: 《遁甲演義》 「必人生年命乘本局吉星奇門生旺之方」 — the birth
  year's stem should ride a palace with a good star and gate in strength. That
  is `benming` in `ScanCriteria`.
- **Day boards for a day's choice**: the 日家 board (`system: rijia`), with
  寶鏡圖's 「遇急可選吉時出正北坎方開門吉」 — a direction to leave by and the hours
  that day.
- **The almanac beside it.** The tradition printed both: 寶鏡圖 puts the 十二神
  and 截路空亡 under every day board. A competent reading clears the almanac's
  vetoes (歲破 bearing, 月破 day, 截路 for travel) before praising a 奇門 palace.

### 4.5 Strength and timing

擇日 dates nothing: it does not predict when an outcome arrives, and neither
does this engine (`docs/refusals.md`). Strength in the 協紀 is 生剋衰旺 of the
day's pillars against the undertaking's and the person's — and on a 奇門 board
旺相休囚死 of gate and star against the season (`minStrength`).

---

## 5. Pitfalls

- **Instant against date.** A chart cast before a 節 strikes on its own day
  carries the old month pillar and the new month's officer. Both are right.
  Never «correct» the page to the pillar or the reverse.
- **120°E.** In Rome the page for a late-evening instant may already be
  tomorrow's in Beijing; the page prints its own ganzhi so the difference is
  visible.
- **The 子 hour.** The day board's hours run from 子 as the day opens; under
  `dayBoundary: zishi` 23:00 already belongs to the next day's pillars. Say
  which day an hour of 23:xx belongs to before reading its marks.
- **«黃道吉日»** in popular speech means any day an almanac marks good; in the
  協紀 it is the 十二神 alone, and an empty name for 吉.
- **楊公忌 is not the 室 day of the lodge count.** The 協紀 says so (§ 8).
- **天德 in the 仲 months is a trigram** (巽 乾 艮 坤): a bearing, never a day.
- **陽貴 and 陰貴 are swapped between schools** (曹震圭 against the 考原 and the
  協紀). Hour-flag both, and name whose split a reading uses.
- **截路空亡 is not 旬空.** Web pages conflate them (戌亥 is the 甲子旬's 旬空).
  And on 戊 and 癸 days the books give two or four hours.
- **五不遇時 strikes twice on 己 and 庚 days**; the mnemonic shows one.
- **土王用事** (the 18 days before each 立) is reckoned by days before the term or
  by the Sun at 297°, 27°, 117°, 207° depending on the calendar; anything keyed to
  it (母倉, 土府) moves with that choice. The engine computes none of it.
- **子平 神煞 share names and not derivations** (天德, 月德, 天乙, 驛馬, 劫煞):
  《三命通會》 ★. Never cross a 八字 神煞 into the almanac's page.
- **The 二十八宿 animals** (禽, 演禽) are another art and late; the 七曜 are
  the check.
- **Apps and 通勝 houses differ**: `lunar-javascript` has «sects» for the year
  of the 太歲 and two schools of 福神; Hong Kong and Taiwan print some ten
  variant 通勝. An almanac value without its book is unweighable.
- **Pre-1739 tables live on in software and print**: the old 九空 (by triads of
  days), 大敗 (春卯夏午秋酉冬子), 喜神 on 甲日丑時 — all listed as errors in
  進愛's memorial.

---

## 6. The engine and this art

**What is computed** — `packages/core/src/almanac.ts`, `almanacAt(julianDayUT,
{ shensha }, context)`, read off `moment.almanac` (lazy) on every resolved
moment:

| field | doctrine (§ 3 / § 4) |
|---|---|
| `officer`, `doubled`, `monthBranch`, `jie` | 建除 and the 交節 doubling (§ 3.3); grading (§ 4.1–4.2) |
| `day` | the page's own ganzhi at 120°E — compare with the chart's day pillar |
| `lodge` (with its 七政) | 二十八宿值日 (§ 3.4); shipped without 宜忌 or 禽 |
| `god` (`valence`) | 十二神 (§ 3.5); valence travels, the words 黃道/黑道 do not |
| `year`, `yearGods[]` (`seat`: branch, stem, trigram, branches) | 年神 (§ 3.7); bearings to avoid (§ 4.2.1, § 4.3) |
| `monthGods[]` (`seat`, `onDay`) | 四德 (§ 3.8); the «遇德» of the grading (§ 4.1) |
| `shensha[]` (`valence`, `onDay`) | the day's 神煞 (§ 3.9) |

On a `system: rijia` board (`computeDayChart`): `hours[]` (`ganzhi`, `god`,
`marks`: `guiren`, `jielu`, `wubuyu`, `xishen`) and `xishen` (`palace`, `hour`)
— § 3.6 and § 3.10.

**Where it appears**: as the almanac line beside 奇門, 六壬 and 七政四餘
(`CalendarAndAlmanac.svelte`, `formatAlmanac` in the CLI), left off under 八字
and 紫微 (a moment read as a person). There is no MCP tool of its own; `shensha`
is declared on the MCP schema and affects only that line. It never enters a
prompt.

**The scan** — `scanCharts` / `matchRuns` in `scan.ts`, `purposeCriteria` in
`purposes.ts`; surfaces `scan_moments`, `/api/moments`, `/[lang]/moments`. It
walks up to 366 days of **hour boards** (`system: rijia` is refused), bisects
every change of hour, day, month or 局 to the minute, and returns runs with the
palaces that answer `gate`, `star`, `spirit`, `stem`, `directions`,
`minStrength`, `benming`, `requires`, `excludes`. A purpose expands to a gate,
visibly. **It does not consult the almanac**: no criterion names a 年神, an
officer or an hour mark.

**What is refused, and where it is argued**: 宜忌 and every verdict built from
them (`docs/sources.md` § 曆注, "What is not here", and the header of
`packages/core/src/almanac.ts`); ordering hours or days, the 「大吉時」 column,
dating an outcome (§ "Ordering two hours, and dating an outcome"); the day
board in prompts, scan and 年命 (§ "A board of the day, anywhere but on its own
page"); the 禽象 and the words 黃道/黑道 (`docs/sources.md` § 曆注). The
consultant may give §§ 4.1–4.3 aloud, attributed; the engine's fields are the
facts it rests on.

**The register's rungs** (`docs/sources.tsv`, `almanac` rows): 建除 and the
lodge at 1 (checked 14 600/14 600 against `lunar-javascript`); 十二神, 四德, the
god each hour treads, 截路空亡 and 喜神 at 4; 年神 and the 神煞 at 5 (one text,
quoted); 天乙 on hours at 2. 五不遇時 has no almanac row: it is weighed only
under the `qimen` row, at 3.

---

## 7. Open questions and candidate TODOs

Each: what · why · what would settle it · on the shelf or not.

- **截路空亡 on 戊 and 癸 days, two hours or four.** The engine follows the
  協紀's 歷例 list and the 考原's rule (four). The 考原's own 卷五 list *(web)*,
  寶鏡圖's 癸未 leaf and the folk verse give 子丑 only. Two works part, which
  under `docs/parameters.md` is two readings and not an edition question. And
  the parallel with 五不遇 is exact: in both the «one per day, the first in the
  run of ten» transmission meets «every hour the rule strikes», and the engine
  chose the rule both times. Settle: 寶鏡圖's other 59 leaves ★ (already
  `TODO.md` § «two errands»), the 考原 卷五 on a plate ☆, the 協紀's 截路 entry
  on the 四庫 plate ★ (卷七 leaf 四十七, done). For the user: a value, or a
  recorded variant.
- **《星歷考原》 卷二–六 are transcribed on zh.wikisource** *(web)*. They are not a
  witness, but they say exactly which leaf of a facsimile to look for, and they
  answer leads already open: 天乙's 陽/陰 (`liuren.guiren`, the one thing
  `texts/README.md` says the shelf lacks), the 截路 list, 喜神, 日遊神, 二十八宿配日.
  Settle: the archive.org neighbours of `06067676.cn` ☆, or a 四庫 vol. 811
  facsimile. Most wanted already; now locatable.
- **A second `shensha` value from the pre-1739 通書.** 進愛's memorial, printed
  in the 協紀's front matter, enumerates what the 康熙 選擇通書 had: 九空 as
  「寅午戌月辰卯寅日，卯未亥月丑子亥日，辰申子月戌酉申日，巳酉丑月未午巳日」, 大敗
  「春卯夏午秋酉冬子」, 喜神 also on 甲日丑時, 天德 in the 子 and 巳 months, 月恩
  on 五月丙戌 and 十二月甲子, 復日 on 正月庚 and 七月甲 *(web transcription)*.
  A report by an opponent which may suffice where it reconstructs the reading
  without contradiction (`docs/sources.md` standard) — but it is a handful of
  cells, not a register. Settle: the memorial on the 華齡 (上) ★ (check that it
  carries the 奏議) and a surviving 選擇通書 or 時憲書 of before 1739 ☆.
- **The day and night of the noble, a third rule.** The 考原 reports a 通書
  rule tied to the solstices (「旦晝於冬至後用之……暮夜於夏至後用之」 *(web)*),
  beside 卯酉 and 日出入. It bears on `liuren.zhouye` and on the hour marks.
  Settle: the 考原 卷五 on a plate ☆.
- **A textual check on the lodge epoch.** The 考原's 七元 (甲子 days only on 虛
  奎 畢 鬼 翼 氐 箕) plus its 七曜 names pin the count modulo 4 against the
  sexagenary day and modulo 7 against the weekday — modulo 28 together, with no
  implementation. Checked by hand on 2026-10-23: the engine's 甲子 days fall on
  exactly those seven. A test asserting it would move the lodge's warrant off
  `lunar-javascript`. Settle: the 考原 卷五 leaf ☆ before citing it.
- **A second runnable reference for the 神煞**: `lunisolar` (waterbeside,
  GPL-3.0, *web*) says its `theGods` plugin is built on the 協紀 卷九–十一.
  Unlike `lunar-javascript` it names its source. Worth running against the
  residuals: 地囊 94.85 %, the 四德's unexplained misses, and 兵禁 · 四絕 · 四離,
  which have no figure. Not on the shelf (`texts/README.md` § references).
- **卷七's other hour entries**: 天官貴人, 福星貴人, 八祿, 日建/破/合/害/刑, 九醜,
  旬中空亡 are rules of the day's stem or branch, stated in a clause, on the
  plate ★. 四大吉時 and 貴登天門時 need the 月將 — which is `liuren.yuejiang`'s
  question — and the latter a day/night rule; they are also the entries closest
  to «ordering hours», so they need the user's word. Settle: no source wanted;
  work and a decision.
- **母倉 and the rest of 土王**: blocked on computing 土王用事, which itself
  parts (days before the 立 against solar longitude). Settle: the 協紀 卷一 本原
  ★ (華齡) for which rule it uses.
- **日遊神**: read whole in the 華齡 edition, refused for want of a seat kind
  and for being 宜忌-bound. The 考原 卷五 has it too *(web)*, with 「其義未明」.
  A decision, not a source.
- **紫白 三元九星** of year and month (考原 卷二 *(web)*, 協紀 卷八 ★): what a 通勝
  reader looks for first, and an almanac staple. Not computed; 卷八 is on the
  shelf.
- **The scan cannot see the almanac.** A criterion excluding hours marked
  截路空亡 or 五不遇時, or a bearing under 歲破, would be a filter and not an
  ordering — the same shape as `excludes`. A design question for the user;
  `docs/refusals.md` § "Ordering two hours" is the line to keep.
- **《御定奇門大全》卷六十**, an almanac inside the 奇門 compilation ★: located,
  not read. A third witness for the 十二神 of hours and for 天赦.
- **Works worth acquiring** ☆, none on the shelf: 《陰陽寶鑑剋擇通書》 (Yuan),
  熊宗立 《類編曆法通書大全》, 魏明遠 《象吉通書》 (1721), 李奉來 《永吉通書》 (1771),
  胡暉 《選擇求真》 (1809), a 時憲書 (史語所 has 光緒 issues digitised), 《玉匣記》
  (DZ1480), a 蔡真步堂 通勝. Each would make a second register attributable —
  `shensha`'s «later a named lineage».

---

## 8. Leads against the register

- **楊公忌.** `docs/sources.md` § 二十八宿值日 records «a check the source
  suggests, which fails»: the 楊公忌 as «the days the count gives 室», laid against
  the engine's 室 days, 2 of 78. The 協紀 卷三十六 *(web transcription)* says the
  folk rule is **not** the 值日 count: 「其術元旦起角宿，依二十八宿次序順數，值室
  宿之日即為楊公忌」 and then 「今並非值日之宿，而强以角宿起元旦，每年另起，不能輪
  轉，固不通矣」. 2 of 78 is what that predicts; the comparison measures a claim the
  source did not make. Worth re-reading on a print before the paragraph stands: 卷三十六 is in the
  華齡 (下), which is not held (the shelf has the (上), 卷一~八).
- **The 協紀 on the lodge count is softer than «It does not [stand behind
  it]».** The same 楊公忌 entry: 「夫以宿值日，亦如用甲子紀日，雖未必始於大撓，
  而其來已久，每日一宿，自然順序，不用安排，以論趨避猶可說也」 *(web)*. What
  卷三十六 rejects as 「來自西域」 is filed under 伏斷日 · 密日 · 裁衣日. The
  engine's position (the count travels, its 宜忌 does not) is unaffected; the
  register's characterisation of the source may be.
- **截路空亡 in the 考原.** The register presents the 考原 as stating «the rule
  the list is an enumeration of», through the 協紀's quotation. In the 考原's own
  卷五 *(web)* the list beside that rule reads 「戊癸日子丑時」 — two hours, not
  four. The 協紀 kept the 歷例's four.
- **喜神 by 五鼠遁.** The register says 喜神's 丙 is counted 「by the month's rule
  and not from 子 by the hour's», so a day has one 喜神 hour. The 協紀's own 截路
  按 quotes the 神煞起例 counting by 五鼠遁: 「以五䑕遁取日干遁支……得丙丁則為喜神，
  得戊己則為五鬼，得庚辛則為金神，得壬癸則為截路空亡」 *(web)* — an hour-wise
  喜神 (and 五鬼, 金神) on every 丙丁 hour, of which 「通書惟取截路空亡一種」. Two
  喜神 rules inside one work; the register knows one.
- **The 考原's title for 卷一.** A Wikisource fetch reported 「象數本要」; 黃啟書
  (from the 提要) and the register have 象數考原. Probably the fetch; check on the
  plate held ★.

---

## 9. Bibliography

**Chinese — primary (all web transcriptions are finding aids)**

- 《欽定協紀辨方書》 (四庫全書本), zh.wikisource, https://zh.wikisource.org/wiki/欽定協紀辨方書_(四庫全書本) — 目錄, 提要, 進愛's memorial with the pre-1739 errors.
- — 卷07, https://zh.wikisource.org/wiki/欽定協紀辨方書_(四庫全書本)/卷07 — 截路空亡 entry and 按, 五不遇時, 天乙 晝夜, 貴登天門, 九醜, 旬空, 天官 · 福星.
- — 卷10, …/卷10 — 宜忌等第表, the six grades.
- — 卷11, …/卷11 — 用事: 御用六十七事, 民用三十七事, 通書六十事, 「以事為經以神為緯」.
- — 卷33, …/卷33 — 利用: 造命, 補龍, 扶山, 相主, 三奇 and 太陽到山 as factors.
- — 卷36, …/卷36 — 辨訛: 楊公忌, 五合五離, 伏斷日密日裁衣日, 合婚.
- 《御定星厯考原》 (四庫全書本), zh.wikisource, https://zh.wikisource.org/wiki/御定星厯考原_(四庫全書本)/全覽 — the six juan and their sections.
- — 卷5, https://zh.wikisource.org/wiki/御定星厯考原_(四庫全書本)/卷5 — 截路 (子丑), 天乙 (曹震圭, 通書, 按), 喜神, 黃黑二道 table, 四煞沒時, 二十八宿配日 and 七元, 日遊神.
- 《史記·日者列傳》 卷127, zh.wikisource, https://zh.wikisource.org/wiki/史記/卷127 — the seven schools before 武帝.
- 煙波釣叟歌, zh.wikisource, https://zh.wikisource.org/wiki/煙波釣叟歌 — 吉門合三奇, 五不遇, 三奇入墓 (paraphrased by the fetch).
- On the shelf ★: the 協紀 (上) 華齡 and 卷七–八 四庫; 考原 卷一; 大全 卷六十–六十四; 日家奇門; 遁甲演義; 遁甲集成 第二冊; 三命通會 (`texts/README.md`).

**Chinese — scholarship and practice**

- 黃啟書, 《出土日書資料與現存元明清通書內容比較研究》, NSC91-2411-H-002-056, 臺大, 2003, https://scholars.lib.ntu.edu.tw/bitstream/123456789/17336/1/912411H002056.pdf — the 17 通書 with dates and authors; the 考原's six 目; 睡虎地 秦除/楚除.
- 李家浩, 〈睡虎地秦簡《日書》「楚除」的性質及其他〉, 史語所集刊 70.4 (1999) 883–903, https://www.ihp.sinica.edu.tw/~bihp/70/70.4/lee.html — 楚除 as 建除 fused with 叢辰.
- 黃一農, on 尹灣 selection, 史語所集刊 70.3 (1999) 589–626; 《社會天文學史十講》 (2004) — 擇日 as social astronomy (abstracts only seen).
- 劉樂賢, 《睡虎地秦簡日書研究》 (文津, 1994) — cited by Kalinowski and 黃啟書; not seen.
- 6tail, lunar-javascript docs: 吉神方位 https://6tail.cn/calendar/lunar.jishen.html and 太歲 https://6tail.cn/calendar/lunar.taisui.html — 喜神/福神 (two schools)/財神/貴神 tables, 庚辛 寅午, year «sects».
- lunisolar, theGods plugin, https://lunisolar.js.org/guide/plugins/theGods.html; https://github.com/waterbeside/lunisolar — a 協紀-based implementation, GPL-3.0.
- CRTA: 許真君玉匣記 DZ1480 https://crta.info/wiki/許真君玉匣記_-_DZ1480; 玉匣記 H178 https://crta.info/wiki/玉匣記_-_H178 — dating of 《玉匣記》.
- 搜狐, 截路空亡 article, https://www.sohu.com/a/236139323_500086 — the folk verse and the 戊癸 子丑 reading (low weight).
- Tohoku Univ. Library, 《象吉備要通書大全》 (魏鑑, Kyoto 1684 print) https://touda.tohoku.ac.jp/portal/en/item/10010000026050 — a 象吉 edition earlier than 1721.

**English and French**

- Richard J. Smith, *Fortune-tellers and Philosophers: Divination in Traditional Chinese Society* (Westview, 1991) — almanac use in Qing society.
- Richard J. Smith, *Chinese Almanacs* (Oxford UP, Images of Asia, 1992), WorldCat https://search.worldcat.org/title/25832973 — history from the Tang.
- Martin Palmer et al., *T'ung Shu: The Ancient Chinese Almanac* (Shambhala/Rider, 1986) — a Hong Kong 通勝 translated.
- Donald Harper & Marc Kalinowski eds., *Books of Fate and Popular Culture in Early China* (Brill, 2017) — the 日書 and hemerology, 453 BCE–220 CE.
- Marc Kalinowski, «Les traités de Shuihudi et l'hémérologie chinoise à la fin des Royaumes-Combattants», *T'oung Pao* 72 (1986) 175–228 — 建除 and 叢辰 in 睡虎地.
- Poo Mu-chou, on the Shuihudi almanacs, *T'oung Pao* 79 (1993) — cited with the above.
- Alain Arrault (with J.-C. Martzloff), notices on the Dunhuang calendars, in Kalinowski ed., *Divination et société dans la Chine médiévale* (BnF, 2003), https://halshs.archives-ouvertes.fr/halshs-00959729v1/file/04_cal_dunhuang_fr_2-1.pdf — the 具注曆.
- Alain Arrault, «A Brief Study of the 28 Lunar Lodges Annotated Calendar», *Central Asiatic Journal* 63 (2020) 153–172, https://caj.harrassowitz-library.com/article/CAJ/2020/1-2/9 — lodges through seven sexagenary cycles at Dunhuang.
- Wikipedia, «Tung Shing», https://en.wikipedia.org/wiki/Tung_Shing — 通勝 contents and naming (low weight).
