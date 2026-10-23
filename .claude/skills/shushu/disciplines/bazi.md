# 八字 bāzì · 子平 zǐpíng · 年命 niánmìng

Engine boards: `bazi` (its own option `luckGranularity`), `pillars` (the
layer under every board: `trueSolarTime`, `yearBoundary`, `dayBoundary`),
`nianming` (`count`). The rules that bind this file are in `CLAUDE.md`, the
values and their holders in `docs/parameters.md` and
`packages/core/src/parameters.ts`, and the register in `docs/sources.md`
§ "Whose each value of the calendrical layer is" and § "五行 of the eight
characters". This file does not restate them.

Marks: ★ on this project's shelf (`texts/bazi/`, `texts/README.md`);
☆ wanted and not held (`TODO.md` § 2). `(web transcription)` = read off a web
page during research, a lead and never a witness. `(shelf typesetting)` = read
in a modern searchable typesetting held on the shelf: also a finding aid. The
plate has not been consulted for anything quoted here unless the register
already says so.

---

## 1. What the art is

- **Scope.** A *birth* read as eight characters: the 干支 gānzhī of the year,
  month, day and double hour 時辰 shíchén. The question is a life and not an
  event. The subject is the day stem, 日主 rìzhǔ / 日元 rìyuán. No question is
  asked of the board. Time enters through the 大運 dàyùn decades and the 流年
  liúnián year pillars, read against the natal eight.
- **Two arts under one name** (`texts/rules/BZ-09.md`). The **古法 三命 gǔfǎ
  sānmìng** reads from the **year** (年為主) and uses the 納音 nàyīn, 神煞
  shénshà, 胎元 tāiyuán and 命宮. The **今法 子平** reads from the **day stem**
  and uses the 十神 shíshén. 《三命通會》 still mixes the two.
- **History.**
  - 韓愈 Hán Yù's epitaph for 李虛中 Lǐ Xūzhōng (d. 813) has him read 「以人之始生年、月、日、所直日辰支幹，相生勝衰死相王斟酌，推人壽夭、貴賤、利不利」
    (web transcription, zh.wikisource). The common account says 李 used three
    pillars and 徐子平 added the hour. The 引 of the 淵海子平 ★ tells it
    differently: 李 read 「以人生年月日時」, and 徐升 「復以人生日主分作六事議論」.
    So in that account the Song change was **the pivot moving from the year to
    the day**, and not the addition of a fourth pillar (BZ-09).
  - The 四庫提要 of 《李虛中命書》 ★ accepts the 年月日 of the epitaph and says
    the book's 「後半乃多稱四柱，其說實起於宋時」 (web transcription). That
    makes the received text a Song layering under a Tang name.
  - 徐子平 Xú Zǐpíng (Five Dynasties to early Song) is known through his
    commentary on 《珞琭子三命消息賦》 ★. 徐大升 Xú Dàshēng (Southern Song)
    compiled the 淵海子平 material. 萬民英 Wàn Mínyīng's 《三命通會》 (Ming,
    preface 1578 by most accounts) is, per its 四庫提要, the 總匯 of 星命 since
    the Ming. The Qing produced the doctrinal works: 陳素庵, 沈孝瞻 and 任鐵樵.
    Republican editors (徐樂吾, 袁樹珊, 韋千里) fixed the modern canon of
    commentaries.

## 2. Texts and lineages

### Transmitted works

- ★ **《李虛中命書》** — 舊題 周 鬼谷子撰, 唐 李虛中注, 三卷, 永樂大典本. SKQS
  vol. 809 p. 1 (`bazi/siku-quanshu-809-…djvu`). Use: the year-based 祿命
  before 子平. The 提要 judges it Tang–Song layered.
- ★ **《珞琭子三命消息賦注》** — 宋 徐子平 (vol. 809 p. 157). There are
  commentaries by four hands: 王廷光, 李仝, 釋曇瑩 and 徐子平. 釋曇瑩's is in
  vol. 809 p. 105. Use: the earliest named 子平 layer.
- ★ **《玉照定真經》**, **《三命指迷賦》**, **《星命總括》** — vol. 809. Use:
  the 三命 layer, with 納音 and 神煞.
- **《五行精紀》** — 廖中, 南宋. The largest Song compendium of 祿命 sayings
  and the source many 神煞 are cited from. Not held and not on the wanted list.
- ★ **《淵海子平》** — 徐升 (徐大升) 編, 明 楊淙 增校. The shelf has the
  《新刊合併官板音義評註淵海子平》 (`yuanhai-ziping-shenxiang-jiyao-gugong.pdf`,
  故宮珍本叢刊 第422冊, reprint 崇禎七年 1634, `W02261`). The excerpt file is
  front matter only. Use: the ten-god tables (BZ-03), 天乙貴人, 納音, the
  four-pillar procedure. The edition calls itself an emended text
  (「板籍有亥豕魯魚之謬」): read it as already corrected. Another Ming title is
  《京臺增補淵海子平大全》.
- ★ **《三命通會》** — 萬民英 (育吾山人), 十二卷. Two copies are held:
  - SKQS vol. 810 pp. 1–692, on the plate. 卷二 論大運 was read 2026-10-07.
  - A modern abridged simplified typesetting (`sanming-tonghui.pdf`). It
    **diverges from the plate in wording**, so a negative found in it is no
    negative.

  Use: the encyclopaedic 三命 + 子平 compendium: 起運 (holder of
  `luckGranularity: shichen`), 小運, 胎元, 命宮, 太歲, the 神煞 one by one,
  空亡, and the 六十 日時 judgements of 卷八–九. The 提要 faults it for
  favouring 正官/正印/正財 over the 偏 (web transcription of the 提要).
- **《星平會海》**, **《神峰通考》** (張楠 Zhāng Nán, 明; the **病藥 bìngyào**
  doctrine is conventionally his), **《命理正宗》** — none is held.
- ★ **《滴天髓》** — the attribution is disputed: 京圖 (Song, per the 闡微
  tradition) or 劉基 (Ming, per the 輯要 and Wikisource). Recensions:
  - 陳素庵 (陳之遴, 1605–1666)'s **《滴天髓輯要》**.
  - 任鐵樵 Rèn Tiěqiáo (Qing, 嘉慶–道光)'s commentary, printed by 袁樹珊 as
    **《滴天髓闡微》** (★ `ditiansui-chanwei.pdf`, 上海大東書局 1947, with
    李雨田's 初學捷徑) and by 徐樂吾 as **《滴天髓徵義》**.
  - 徐樂吾's **《滴天髓補註》** on the 輯要 text.
  - 《祕授命理須知滴天髓》, 程芝雲 校, 文選樓叢書 1824.

  A Korean study of the editions exists (koreascience
  JAKO202123861767325). Held: `ditiansui-yuanwen.pdf`, two pages of verses
  only. Use: 衰旺, 中和, 源流, 通關 (its heading is 通隔), 寒暖, 燥濕, 從化,
  歲運. The whole text is doctrine.
- ★ **《子平真詮》** — 沈孝瞻 Shěn Xiàozhān (沈燡燔, 乾隆 進士). Printed 1776
  from his 手錄 by 胡焜倬; one web source gives the name as 胡空甫, unresolved.
  Held:
  - the 民國十二年 1923 珍藏版 (`ziping-zhenquan-minguo12.pdf`, scan);
  - 徐樂吾's **《子平真詮評註》** (1936, on 趙展如's 光緒 text, modern
    typesetting `ziping-zhenquan-pingzhu.pdf`).

  Use: **格局 from the 月令**, 相神, 成敗救應, 行運, 六親. It is the strict
  structural school.
- **《窮通寶鑑》** — its core is the anonymous Ming **《欄江網》**. A Qing 司天
  official recast it as **《造化元鑰》**. 余春台 re-edited it under the title
  窮通寶鑑, and 徐樂吾 annotated it as 《造化元鑰評註》. Not held. Use: **調候
  tiáohòu**, month by month for each of the ten stems: 「正月甲木，初春尚有餘寒，得丙癸逢，富貴雙全」
  (web transcription, zh.wikisource; another copy reads 得丙癸透).
- **《命理約言》** — 陳素庵. Not held. Known through 中国古代算命术 p. 96
  (BZ-08). Use: the critique of 神煞 as 「神煞誕妄」.
- ☆ **《星平大成》** — 沈義方. It is the lead for the 夜子 day division, quoted
  in 《命理新論》 第四節: 「夜子者，今日之夜，非今日之早也」.

### Modern Chinese lineages and manuals

- **徐樂吾** Xú Lèwú (1886–1949, 上海): 子平真詮評註, 滴天髓徵義, 滴天髓補註,
  造化元鑰評註, 子平粹言. He systematised the **five ways of taking the 用神**
  (§ 4.4) and denies separate yin-stem 長生 (§ 3.6).
- **袁樹珊** Yuán Shùshān (1881–1968, 鎮江): 命理探原, 命譜, and the publisher
  of the 闡微.
- **韋千里** Wéi Qiānlǐ (1911–1988, 上海 then 香港): 千里命稿, 八字提要, 命學講義.
  A practitioner's 扶抑 + 格局 synthesis.
- **吳俊民** Wú Jùnmín (若萍, 福建晉江): ★ **《命理新論》**, three volumes
  (`mingli-xinlun-*.pdf`, `W06133`). It began as a correspondence course. It
  holds `trueSolarTime: true`, `dayBoundary: midnight` and
  `yearBoundary: dongzhi`, all on the plate (register, 2026-10-07).
- **梁湘潤** Liáng Xiāngrùn (Taiwan): 子平母法總則, 流年法典, 細說子平六十年, and
  大流年批導法 with 陳毅青 (per the NCCU bibliography). He is the 流年 and
  行運 specialist of Taiwanese 子平.
- **何建忠** (Taiwan): 八字心理推命學. A psychological reading of the ten gods.
- **盲派 mángpài** ("blind school"). It is traced to 郝金陽 and taught publicly
  by 段建業 (2000s). Its vocabulary: **做功 zuògōng** (what the chart *does*:
  制, 化, 生, 合, 墓), **賓主 bīnzhǔ** (host and guest pillars), **體用 tǐyòng**,
  功神/廢神, 象法. It rejects 旺衰-based 用神. The attribution to persons was
  not confirmed online this session; the concepts were (bilibili course
  syllabus).
- **新派 xīnpài** ("new school", 2000s). It is commonly tied to 李涵辰; that
  attribution was not confirmed this session. It reads 六親 by the stems,
  simplifies the branches, and judges 歲運 by whether they help the 用神
  (bilibili, web).
- **洪丕謨 · 姜玉珍** 《中国古代算命术》 (revised 1991) is the corpus's
  BZ-01…BZ-08 witness (`W02243`). It is a modern secondary survey: three
  numbered steps for 身強/身弱, the 天乙 divergence, and three methods of 小運.

### English

- **Scholarship.**
  - Richard J. Smith, *Fortune-tellers and Philosophers* (Westview 1991):
    算命 in Qing society.
  - Marc Kalinowski, "Divination and Astrology" in Lagerwey & Kalinowski eds.,
    *Early Chinese Religion I* (Brill 2010), and *Divination et société dans
    la Chine médiévale* (BnF 2003): the 祿命 and 日書 precursors (cited from
    memory; not checked this session).
  - Michael Lackner ed., *Fate and Prognostication in the Chinese Literary
    Imagination* (Brill 2020).
  - **Ho Peng Yoke, *Chinese Mathematical Astrology* (2003) treats the 三式
    only and not 子平**, although Wikipedia's Four Pillars article cites it.
- **Practitioners.**
  - Joey Yap, *BaZi: The Destiny Code* (2004/05) and *…Revealed*. These are
    modern Malaysian 扶抑 + 十神 manuals, with a percentage weighting of
    hidden stems.
  - Jerry King: Four Pillars courses and books; titles not verified here.
  - Derek Walters, *Chinese Astrology* (1987) and *The Chinese Astrology
    Workbook*. These are the 三命/納音 side as much as 子平.
  - Raymond Lo, *Four Pillars of Destiny* (1990s).
  - Lily Chung, *The Path to Good Fortune* (1997).

  None is a witness. They are useful for knowing what an English-reading
  client has been told.

## 3. How a board is laid (起例)

Each step names the witness for each reading and the engine parameter, or says
"not modelled".

1. **The instant.** The civil clock time goes to UT and then, under
   `trueSolarTime: true` (the default), to local apparent solar time: the
   longitude correction plus the equation of time. 《命理新論》 第九章 works
   exactly this, with a summer-time step first. The opposing practice reads
   the zone clock as it stands (`trueSolarTime: false`, unattributed). A
   middle practice uses mean local time (longitude only, no 均時差). 《命理新論》
   第五章's table is headed 「平均太陽時」, so the manual itself states both
   levels. **Not modelled** as a third value. Latitude enters nothing.
2. **The year pillar.** Three values of `yearBoundary`:
   - `lichun`, the default. Unattributed in the register; the corpus's 推年法
     (中国古代算命术 p. 59) says 「必须严格划定以农历的立春作为一年的界限」.
   - `chunjie`. Folk and almanac practice; no 子平 text holds it.
   - `dongzhi`. 《命理新論》 第九章, worked: 民國十七年十一月二十日 → 己巳 year,
     with the month pillar left at 甲子.

   立春 is an instant and not a date.
3. **The month pillar.** The branch is taken from the **節 jié** in force
   (立春 opens 寅). It is never taken from the lunar month and never from a
   中氣. The stem comes from 五虎遁 wǔhǔdùn (「甲己之年丙作首…」; witnessed
   by 淵海子平 卷一 f. 10 and 中国古代算命术 with metrical variants, CAL-04).
   Under `dongzhi` the stem comes from 立春's year. Under `chunjie` the engine
   takes it from the 春節 year (`pillars.ts`), which no witness states; see § 7.
4. **The day pillar.** The sexagenary day is counted continuously (CAL-01). It
   follows the chart's zone. Two values of `dayBoundary`:
   - `zishi`, the default: the day turns at 23:00. Unattributed.
   - `midnight`: the day turns at 00:00, and the 23–24 h 夜子 yèzǐ takes the
     **next** day's 子-hour stem. 《命理新論》 第九章 holds this:
     「早子應用本日子時的天干，夜子應用明日子時的天干」. It also works an 夜子
     board, 丁亥 甲辰 甲寅 丙子, which under `zishi` gives 乙卯 for the day.

   Some web sources describe practitioners who keep both the day *and* the
   夜子's hour stem on the ending day. That would be a third reading; it is
   **not modelled** and is unwitnessed here (§ 7).
5. **The hour pillar.** The branch is the 時辰 (子 = 23–01). The stem comes
   from 五鼠遁 wǔshǔdùn (「甲己還加甲」, CAL-05). Read by true solar time when
   that is in force.
6. **The display order.** The old manuals print 時日月年, right to left; the
   corpus (BZ-01) warns that this is the reverse of the order of computation.
   The engine emits 年月日時.
7. **藏干 cánggān** (`bazi/hidden-stems.ts`). The engine's sets: 子癸; 丑己癸辛;
   寅甲丙戊; 卯乙; 辰戊乙癸; 巳丙庚戊; 午丁己; 未己丁乙; 申庚壬戊; 酉辛;
   戌戊辛丁; 亥壬甲. That is twenty-eight stems, with **亥 without 戊** and
   **午 with 己**. It matches 李雨田's 1947 table (闡微 初學捷徑) and is **not
   modelled** as a parameter. Divergences:
   - **The sets.** 《子平真詮》's 「十二月令人元司令分野表」 (shelf
     typesetting) puts **戊 in 亥** (戊7 甲5 壬18), **丙 in 午** (丙10 己9
     丁11), **甲 in 卯** (甲10 乙20) and **壬 in 子** (壬10 癸20). 《三命通會》
     卷二 論人元司事 (shelf typesetting, not checked on the plate) has the
     **yang** stem as the tomb guest: 辰 乙7 **壬**5 戊18; 未 丁7 **甲**5 己18;
     戌 辛7 **丙**5 戊18; 丑 癸7 **庚**5 己18. It also has 寅 艮土5 丙5 甲20 and
     亥 戊5 甲5 壬20. Three tables, three sets.
   - **The ranks.** The engine labels 辰's 乙 as `zhong` and 癸 as `yu`, which
     is the common modern labelling (「生本氣者為中氣」, web). BZ-02 instead
     derives 中氣 from the 三合 (辰 → 申子辰 → 癸) and 餘氣 from the previous
     month (乙). The 人元司令 order (乙 first) agrees with BZ-02. The two
     labellings are swapped for **all four 庫 branches** (辰, 戌, 丑, 未).
   - **The weights.** No classical work gives fractions. 任鐵樵: 「以本氣為主…須看他氣乘權得勢」.
     徐樂吾 on the day-count table: 「虽未可执着」. Percentages in modern and
     English manuals (Joey Yap and others) belong to those manuals.
8. **十神** (`bazi/relations.ts`). Two questions decide a god: which of the
   five relations, and the same or opposite polarity. Undisputed in the
   arithmetic.
   - The **names** vary. The 淵海 tables have 偏官/七殺, 印綬 for 正印, and
     倒食/梟神 for 偏印. For a yin day stem they print 敗財 where a yang one
     has 劫財, so there are twenty labels and not ten (BZ-03).
   - The engine's ids are `bijian … zhengyin`.
9. **納音** (`bazi/nayin.ts`). The thirty images, as in 淵海子平 卷一 論六十花甲子納音
   (BZ-09, CAL-10). In the 三命 it is the year's element; in 子平 it is a
   colour.
10. **十二長生 shí'èr chángshēng** (`twelveStage`). The engine follows the
    doctrine that **yang stems run forward and yin stems backward** (陽生陰死),
    with **戊 born in 寅 like 丙** (火土同宮) and 己 born in 酉 like 丁.
    Divergences, none modelled:
    - 任鐵樵 rejects yin-stem 長生: 「古法只有四長生」, 陰陽同生同死 (BZ-05,
      via 中国古代算命术 pp. 46–47). 徐樂吾 agrees: 「生旺墓絕者，五行之生旺墓絕，非十干之旺墓絕也」
      (評註, shelf typesetting).
    - 沈孝瞻's own text keeps 陰長生 but weaker: 「陽長生有力，而陰長生不甚有力」.
    - 《三命通會》 卷二 論天干陰陽生死 argues 陽生陰死 at length.
    - 《滴天髓》: 「陰陽順逆之說…其理信有之也，其法不可執一」.
    - **土**: 火土同宮 (寅) is the 子平 default. 水土同宮 (申) is the 納音
      practice, and 邵彥和's 六壬 by web report. 徐樂吾 notes both and keeps
      寅 「在申亥，寒湿虚浮…無可用」.
    - The engine applies the stage to the **day master** against each branch;
      other practice also reads each pillar's stem against its own branch
      (自坐). Not computed.
11. **空亡 kōngwáng** (`emptyBranches`). The two branches missing from the
    **day** pillar's 旬. 《三命通會》 論空亡: 「空亡不言太歲，見生日旬中空亡極緊」,
    and 「若無衝無合無刑，謂真空亡」 (web transcription, 識典古籍 SK1610).
    - The year 旬 (古法) is also read by some. **Not modelled.**
    - 截路空亡 (from the day to the hour) and 四大空亡 (納音-based) are
      separate 神煞. Not computed.
12. **大運** (`bazi/luck.ts`).
    - **Direction.** 陽男陰女 run forward to the next 節; 陰男陽女 run back to
      the 節 that opened the month. 《三命通會》 論大運:
      「陽男陰女，大運以生日後未來節氣日時為數，順而行之…」 (web
      transcription, consistent with the plate reading in the register).
    - **Start.** Three days are one year. One day is four months. One 時辰 is
      ten days.
    - **Granularity.** `luckGranularity: shichen` counts whole days and whole
      時辰 and drops the remainder. It is held by 《三命通會》 卷二 on the plate
      (「實歷過六十三時折除，計六百三十日」), which also condemns 約法, rounding
      to whole years. `luckGranularity: minute` is unattributed. A third
      practice, «more than 12 hours counts as a day» (web, zhihu/kknews), is
      **not modelled**.
    - **The 運.** The cycles step from the month pillar in the run's direction.
    - **Stem and branch inside a decade.** Four readings, none modelled (the
      engine reports the decade whole):
      - five years each to the stem and the branch: the 中国古代算命术 p. 65
        「每個干各支各管五年」; 沈孝瞻 by web report;
      - the decade whole: 《滴天髓》 「一運看十年，切勿上下截看」 (web
        transcription);
      - **the branch weighs more**: 《三命通會》 「在支則棄天干之物。蓋大運重地支」,
        and 徐樂吾 「運以方為重」;
      - the 淵海 by web report: 「大運看支，歲君看干」.
    - **The reported age.** It is in years from birth. Many practitioners
      report a 虛歲 (§ 5).
13. **小運 xiǎoyùn**. Not computed. Three methods (中国古代算命术 p. 66;
    《三命通會》 卷二 論小運, shelf typesetting):
    - 「古人以男起丙寅順行，女起壬申逆行」;
    - an opening by the 旬 of birth (甲子旬 丙寅/壬申, 甲申旬 丙戌/壬辰,
      甲午旬 丙申/壬寅, 甲辰旬 丙午/壬子, 甲寅旬 丙辰/壬戌);
    - 醉醒子's: from the hour pillar, one pair a year, with the direction by
      year polarity and sex.

    《三命通會》: **「此小運又名行年」**. See § 7: this is the 年命 rule's
    other home.
14. **流年 liúnián**. The year pillar of each year, turning at 立春 (under
    whatever `yearBoundary` the reader uses). `annualPillars` is exported and
    **no surface calls it**.
15. **胎元 tāiyuán** (the month of conception; 《三命通會》 論胎元 counts 300
    days back) and **命宮** (the 子平 命宮 by 加時 to 卯; see the register's
    note on 論坐命宮). Neither is computed.
16. **神煞**. Not computed on the bazi board. The phase-15 refusal keeps the
    almanac's 神煞 off the pillars page because 八字 derives the same names
    differently.
    - Most 子平 神煞 are positions in the 三合 or the 祿 (BZ-08): 將星 is the
      仲; 華蓋 the 墓; 驛馬 the 沖 of the 長生; 桃花/咸池 the 沐浴; 羊刃 the
      next branch after the 祿; 文昌 the 祿 of the 食神.
    - **The entry pillar varies**: usually the day, sometimes the year.
    - **天乙貴人 diverges.** 淵海 卷一 f. 11: 「甲戊兼牛羊…庚辛逢馬虎」. The
      中国古代算命术 and 《三命通會》 論天乙貴人 have 甲戊庚 丑未 and 辛 寅午,
      which is also the 六壬 verse.
    - 《三命通會》 records three readings of day versus night 貴人: the noon
      split, sunrise and sunset, and 壺中子's split at the solstices
      (「冬至後用陽貴，夏至後陰貴」), calling the first two 臆說. Compare
      `liuren.guiren` and `liuren.zhouye`, which are 六壬's.
17. **五行 count** (`distribution`). Eight characters, each branch by its 本氣,
    zeroes included. Nothing else is done to it (CLAUDE.md).
18. **年命 (`nianming`)**. It is not a 八字 step. A birth's year pillar 本命
    běnmìng and the year being lived 行年 xíngnián are placed on a **奇門**
    board of a moment.
    - The witness is 《遁甲演義》 卷一 ★ (「男順寅，女逆申，皆起五虎」).
    - `count: sui` (虛歲, held by the 演義's pairs 一歲丙寅, 十一歲丙子) or
      `count: turns`.
    - The pair is moored at its branch's palace. The count «數至泊宮 by the
      ju» is refused as unreadable.

## 4. How a board is read

The engine stops at § 3. Everything here is a consultant's, given **as the
named school's**.

### 4.1 Order of inspection (common to 子平 manuals)

1. The 日主 and its **season**. 旺相休囚死 is derived from the 月令:
   「當令的旺，我生的相，生我的休，克我的囚，我克的死」 (中国古代算命术 p. 43,
   CAL-08; here 我 is the ruling element).
2. **Roots** 通根 tōnggēn and **transparency** 透出 tòuchū. 沈孝瞻:
   「干以通根為美，支以透出為貴」. 長生, 祿, 旺, 餘氣 and 墓庫 all count as
   roots, and 「逢庫必沖之說，謬誤可嗤」 (徐樂吾).
3. **Combinations and clashes**: 合, 會, 沖, 刑, 害, and 合化 with its
   conditions. 任鐵樵 on 寅申沖: all six hidden stems strike each other, 兩敗俱傷,
   so 「金水能沖木火，木火不能沖金水」 holds for stems and not for branches
   (BZ-02).
4. The **structure** 格局, then the **用神** and its 相神, then the **decades**
   and **years**.

### 4.2 Strength of the day master (旺衰 wàngshuāi)

- **The three steps** (中国古代算命术 p. 90; BZ-06):
  1. the day stem against the month;
  2. the support of the other stems and branches (印, 比劫);
  3. the 長生 stage of the day stem in each branch.

  The third step inherits the 陰長生 dispute (§ 3.10), so state which reading
  you use.
- 沈孝瞻 論十干得時不旺失時不弱: 「得時俱為旺論，失時便作衰看，雖是至理，亦死法也」.
  Out of season, a day stem with roots is not weak.
- 《滴天髓》: 「能知衰旺之真機，其於立命之奧，思過半矣」. 任鐵樵 reads 真衰
  and 假旺 (weakness and strength that are not what they look like).
- **The 盲派 rejects the strength step** and reads instead what the chart
  does: 做功, 賓主, efficiency.

### 4.3 Structure (格局 géjú) — 《子平真詮》

- **「八字用神，專求月令，以日干配月令地支，而生剋不同，格局分焉。」** In
  沈孝瞻 the **用神 is the god of the month**. That is the structure. It is
  *not* the favourable element (see § 5).
- **The eight regular 格**: 正官, 財, 印綬, 食神, 偏官/七殺, 傷官, 陽刃, 建祿/月劫.
  - 「財官印食，此用神之善而順用之者也；煞傷劫刃，用神之不善而逆用之者也。」
    The good ones are protected; the bad ones are controlled (官煞 by 食 or
    印, 傷官 by 印, 劫刃 by 官煞).
  - 雜氣 (the 庫 months) take what is transparent.
- **相神 xiàngshén**: 「官逢財生，則官為用，財為相」. **成敗救應**: a
  structure can be made, broken and rescued, and the positions decide which;
  counting does not (BZ-07).
- **外格 wàigé** only 「因月令無用，權而用之」. 沈 attacks 拱祿, 拱貴 and
  鼠貴 as 以訛傳訛, and 論星辰無關格局 excludes 神煞 from structure.
- 外格 elsewhere (滴天髓, 三命通會, modern manuals):
  - 從格: 從財, 從殺, 從兒, 從勢. 《滴天髓》: 「從得真者只論從」.
  - 化氣格: 「化得真者只論化」.
  - 專旺: 曲直, 炎上, 稼穡, 從革, 潤下.

### 4.4 The favourable element (用神 / 喜用神) — competing methods

徐樂吾's 評註 論用神 (shelf typesetting) lists **five**, 「皆從月令推定」:

1. **扶抑 fúyì**: 「日元強者抑之，日元弱者扶之」. This is the modern default
   (韋千里, Joey Yap, most software). 沈孝瞻 himself warns against
   「以傷旺扶弱為定法」 (論時說以訛傳訛, BZ-04).
2. **病藥 bìngyào**: the 病 is what spoils the favoured; the 藥 removes it.
   Conventionally 張楠's 《神峰通考》: 「有病方為貴，無傷不是奇」.
3. **調候 tiáohòu**: 「金水生於冬令，木火生於夏令，氣候太寒太燥，以調和氣候為急」.
   The month-by-month tables are 《窮通寶鑑》's. 沈孝瞻 論用神配氣候得失 ends
   「此類甚多，不能悉述」.
4. **專旺 zhuānwàng** (從, 化, one-sided): follow the momentum.
5. **通關 tōngguān**: 「兩神對峙，強弱均平」. A mediating element. 《滴天髓》
   通隔: 「兩意本相通，中間有關隔」.

Also met:

- 《滴天髓》's **中和** and **源流** (follow the flow from root to outlet).
- 「體用」 「扶之抑之得其宜」 and 「損之益之得其中」.
- 新派's 用神 by stems.
- 盲派's 功神 versus 廢神 in place of a 用神.

**Say which method you used, and that another would choose differently.**
The corpus records the source's own warning that the choice is not an
algorithm (BZ-06).

### 4.5 Relatives (六親 liùqīn) — two systems

- **By ten god** (沈孝瞻 論宮分用神配六親; male chart): 正印 mother, 偏財
  father (「偏財者，母之正夫也」), 正財 wife, 官煞 children, 比肩 brothers.
  - 任鐵樵 (徵義) instead takes 印 for parents and **食傷 for children**.
  - For a female chart, 官 is the husband and 食傷 the children (common
    practice).
- **By palace** (宮分): year = ancestors, month = parents, day branch =
  spouse, hour = children. 徐樂吾: 喜用 gathered in the year and month mean
  ancestral support; in the hour, the late years.
- 新派 reads relatives by the stems only.

### 4.6 Timing (歲運 suìyùn)

- 沈孝瞻 論行運: 「論運與看命無二法也…取運則又以運之干支，配八字之喜忌」.
  A decade that helps the 喜用 is good and one that helps the 忌 is bad.
  徐樂吾: 「命如植物之種子，而運則開落之時節也」.
- 《滴天髓》 歲運: 「休咎係乎運，尤係乎歲，衝戰視其孰降，和好視其孰切」.
- 《三命通會》 論太歲: the year is the ruler and the decade the minister.
  「歲傷日干，有禍必輕；日犯歲君，災殃必重」, with 救 and 情 as mitigation.
- **The engine refuses to date events**, and so does the prompt. A
  consultant may describe a decade's direction as the school reads it, and
  attribute it.

### 4.7 The ten gods toward a life (common to the manuals; attribute when used)

| God | Usual reading |
|---|---|
| 正官 | order, office, reputation |
| 七殺 | pressure, command, risk |
| 正印/偏印 | protection, learning; the 偏 unorthodox, and 梟 when it strikes the 食神 |
| 食神 | ease, expression |
| 傷官 | talent against authority |
| 正財/偏財 | earned versus windfall resources |
| 比劫 | peers, rivalry |

These are teachings and never transcript facts (`prompt.bazi.gods`).

## 5. Pitfalls

- **用神 means two things.** In 《子平真詮》 the 用神 is the month's god, that
  is, the structure. In 徐樂吾 and every modern manual it is the favourable
  element. A reader quoting 「八字用神，專求月令」 for 扶抑 has crossed them.
- **立春 versus 春節.** A birth in the weeks between gets two different year
  pillars and, through the direction rule, possibly **reversed decades**.
  This is the most common software and almanac error (corpus 推年法).
- **The month by the 節 and not the lunar month.** A lunar 正月 birth before
  驚蟄 is still in the 寅 month, and a 臘月 birth after 立春 is in the 寅
  month of the next year. Intercalary months are irrelevant to the pillars.
- **The 節 is an instant.** Two births on one date can sit in two months. The
  engine's `moment.jie` shows the boundary.
- **The 子 hour.** 23:00 to 01:00 straddles the date. Under `zishi` the day
  moves at 23:00; under `midnight` it moves at 00:00, with the hour stem from
  the next day. A chart reported as «born 23:30» is ambiguous until the
  boundary is stated.
- **True solar time near a boundary.** The longitude offset inside one zone
  reaches about two hours in western China (Urumqi on UTC+8), and the
  equation of time adds up to ±16 min.
- **Clocks.** Daylight saving time: China 1986–1991, Taiwan and Hong Kong in
  various years, Europe and the US. The Chinese 1912–1949 multiple zones and
  wartime clocks: the register records eleven disagreements with
  `lunar-javascript`, all inside them. Local mean time before standard time.
  The Julian calendar before 1582 in Europe.
- **The lunar calendar is on 120°E** (CLAUDE.md), but the pillars are not
  lunar. Do not «correct» a day pillar to Beijing time.
- **Age.** The 大運 start is in years after birth. Many Chinese practitioners
  quote 虛歲, one or two more. 行年 counts `sui` by default.
- **大運 change date.** Some practitioners change the decade at the exact
  交運 instant, some at the 立春 of that year, and some on the birthday. The
  engine gives the instant (`startJD`).
- **Hidden-stem tables differ** (§ 3.7). A chart «with 戊 in 亥» or «丙 in 午»
  is not an error; it is another table.
- **The 天乙 table differs** between the 淵海 and the 三命/六壬 verse at 庚/辛.
  Do not cross-check one art's 貴人 against another's.
- **The yin-stem 長生.** 乙 at 午 is 長生 under 陽生陰死 and only 食神-ground
  under 任鐵樵. Do not read 「乙木長生」 as support without naming the
  doctrine.
- **神煞 names collide** with the almanac's (天德, 月德, 驛馬, 劫煞): two arts
  derive them differently (phase 15). 陳素庵 and 沈孝瞻 deny them a role in
  structure.
- **The 納音 element is not the stem element.** 甲子 is 海中金 and still 甲木
  for 十神.
- **The modern abridged 三命通會** is not the 四庫 text. A phrase absent there
  is no evidence (`texts/README.md`).
- **Percentages.** Element «scores» and hidden-stem weights in apps are a
  manual's method and not the texts'. Ho Peng Yoke is not a 子平 source.
- **The board order.** Classical charts are printed 時日月年 right to left.

## 6. The engine and this art

- **Computes** (`packages/core/src/bazi/`):
  - `dayMaster`;
  - `pillars[]` with `ganzhi`, `stemGod`, `hidden[{stem, rank, god}]`,
    `nayin`, `stage` (the 日主's 長生 stage at that branch) and `empty`;
  - `emptyBranches`;
  - `distribution` (the 五行 count);
  - `luck` (`gender`, `forward`, `start{years,months,days}`, `startJD`,
    `cycles[{ganzhi,startAge,startJD}]`), only when a gender is given;
  - `options.luckGranularity`.

  The pillars' own options travel on the moment, and the divergence block
  under every transcript names them. `annualPillars` exists without a
  surface. `nianming` places 本命 and 行年 on a 奇門 chart.
- **Refuses** (`docs/refusals.md`): a strong or weak day master; the 用神; the
  格局; any ranking of pillars or decades; dated events; the 年命 purposes
  doctrine; and the natal 奇門 graft. The reason is that the schools part
  exactly there, and a choice shipped would be a school chosen silently. The
  prompt (`prompt.bazi.yongshen`, `noScore`, `distribution`) commissions the
  choice **signed**.
- **Mapping to § 4:**

  | § 4 step | Output it reads |
  |---|---|
  | 4.1 step 1 | `dayMaster` and the month pillar; derive 旺相休囚死 yourself |
  | 4.1 step 2 (roots) | `hidden` across the four branches |
  | 4.2 step 3 | `stage` |
  | 4.3 | the month's `hidden` and `stemGod`s |
  | 4.4 | `distribution` plus everything above, method named |
  | 4.5 | `stemGod` and `hidden.god` with the pillar `position` |
  | 4.6 | `luck.cycles` (`annualPillars` where a caller has it) |
  | 空亡 doctrine | `empty` |
  | 三命 reading | `nayin` |

  Nothing for 合/沖/刑/害, 神煞, 胎元, 命宮 or 小運 is in the output. Derive
  them aloud and say so.

## 7. Open questions and candidate TODOs

- **小運 = 行年 in 《三命通會》 卷二 論小運** (「此小運又名行年」; 「古人以男起丙寅順行，女起壬申逆行」).
  - Why: it would be a second witness, from another art, to the openings
    `nianming` derives from the 演義.
  - The 醉醒子 example (birth at 甲子, then 乙丑 at one 歲) bears on
    `count: sui`.
  - Settle on SKQS vol. 810 ★ (plate), the leaf after 論大運.
- **A 旬-dependent 行年/小運 opening** (甲申旬 丙戌/壬辰, …), quoted by
  中国古代算命术 p. 66.
  - It is a divergence `nianming` does not model.
  - Settle on the original it quotes (unnamed). Locate it in 《三命通會》 ★
    or the 淵海 ★ first.
- **The hidden-stem table as a parameter.** The engine's table is 李雨田's
  (1947). 《子平真詮》's 司令 table (★ 1923 scan) and 《三命通會》's 人元司事
  (★ vol. 810) give other sets (戊 in 亥, 丙 in 午, yang tomb guests).
  - Why: 十神 under `hidden`, and the root analysis, change.
  - Read both on the plate before anything moves. The question may be a
    recension question, not a school one.
- **The rank labels of the four 庫 branches** (中/餘 swapped against the 三合
  derivation and the 司令 order).
  - Why: `rank` is exported and reads as doctrine.
  - Settle on any classical work naming 中氣/餘氣 per branch. 闡微 卷一 地支
    (★) is the first place to look.
- **The yin-stem 長生** (陽生陰死 against 同生同死) and **土 at 寅 against
  申**.
  - Why: `stage` is computed under one doctrine without saying so. It would
    be a `bazi` parameter.
  - Holders on the shelf: 《三命通會》 卷二 ★ (陽生陰死), 闡微 ★ (任鐵樵
    against it), 《子平真詮》 ★ (沈 for; 徐樂吾 against).
- **`dayBoundary: zishi` and `yearBoundary: lichun` are still unattributed.**
  - The corpus's 推年法 (中国古代算命术 p. 59, `W02243`) states 立春 「必须严格」.
    That is a modern witness to `lichun`; it is not yet in the register.
  - ☆ 《星平大成》 for `midnight`.
- **A third 夜子 reading** (the day *and* the hour stem kept on the ending
  day), seen only on web pages. Locate a manual holding it before naming a
  value.
- **The month stem under `chunjie`.** The engine takes it from the 春節 year.
  No witness states it. Same for the **大運 direction** under `chunjie` or
  `dongzhi` (the year stem has moved). Ask 《命理新論》 ★ 第九章: does its
  冬至 example run the decades from the new year stem?
- **大運 rounding at 12 hours** (a third granularity) and **the change date
  of a decade**. Both are web reports. Need a manual on the shelf; 《命理新論》
  ★ is the first to ask.
- **Stem and branch inside a decade** (five plus five, whole, or branch-heavy).
  - It is not a computation but a reading parameter the prompt could state.
  - Holders: 《三命通會》 ★ (branch), 《滴天髓》 (whole), 子平真詮 ★.
- **Surface `annualPillars`** (流年) with the 立春 boundary stated. It is
  engine-ready.
- **The wanted list:**
  - 《窮通寶鑑》/《造化元鑰》 (調候; any print);
  - 《滴天髓徵義》 and 《滴天髓輯要》 (the two other recensions);
  - 《神峰通考》 (病藥);
  - 《命理約言》 (陳素庵);
  - 《五行精紀》 (Song 神煞 sources).

## 8. Leads against the register

- **The register's 八字 sections name no witness for the hidden-stem table**,
  and `hidden-stems.ts` calls its list «the common 人元司令 one». Two works on
  the shelf print **人元司令 tables that differ from it**:
  - 《子平真詮》's 分野表 (戊 in 亥, 丙 in 午, 甲 in 卯, 壬 in 子);
  - 《三命通會》 論人元司事 (壬/甲/丙/庚 as tomb guests).

  Both were read in shelf typesettings only. The comment may be mislabelling
  李雨田's 1947 圖 as the 司令 table. If so, the table is a modern convention
  with one modern witness.
- **`luckGranularity: shichen`** is attributed to 《三命通會》 卷二. The same
  chapter also states **「蓋大運重地支」 / 「在支則棄天干之物」**. That is a
  reading doctrine the prompt does not carry, and it contradicts the five-plus-
  five teaching the corpus's BZ-04 records from 中国古代算命术. Not a rung
  change; a missing line.
- **`count: sui` has one holder (the 演義).** 《三命通會》 論小運 appears to
  state the same openings for 小運 and calls 小運 行年. If the plate confirms
  it, a transmitted second text exists, from 祿命 and not from 遁甲. Because
  it is another art, it would be another holding and not a collation.

## 9. Bibliography

### Chinese

- 韓愈《殿中侍御史李君墓誌銘》, zh.wikisource.org/zh-hant/殿中侍御史李君墓誌銘
  (web): 李虛中's method in the epitaph.
- 《四庫全書總目提要》卷109, zh.wikisource.org/wiki/四庫全書總目提要/卷109
  (web): the 提要 of 三命通會, 李虛中命書, 珞琭子 and 星學大成.
- 《李虛中命書》提要 excerpt, simplelits.com/books/classical/classical-08966-李虚中命书
  (web): 「四柱，其說實起於宋時」.
- 《三命通會》 論大運, shidianguji.com/zh/book/SK1610/chapter/1kf5v6ol1vhnp
  (web, 四庫 base): direction, 一辰十歲, 約法, 大運重地支.
- 《三命通會》 論空亡, shidianguji.com/zh/book/SK1610/chapter/1kutiho2qv2fn
  (web): the day 旬, 真空亡, 截路, 四大空亡.
- ★ 《三命通會》 modern typesetting, `texts/bazi/sanming-tonghui.pdf` (finding
  aid): 論天干陰陽生死, 論人元司事, 論胎元, 論坐命宮, 論小運, 論太歲,
  論天乙貴人.
- ★ 《三命通會》 SKQS vol. 810 (plate, register 2026-10-07):
  `luckGranularity: shichen`.
- ★ 《子平真詮評註》 modern typesetting, `texts/bazi/ziping-zhenquan-pingzhu.pdf`
  (finding aid): 論用神 (five methods), 相神, 行運, 六親, 陰陽生死, the
  人元司令 table, 得時不旺.
- 《子平真詮》 論用神 / 論行運, ykzhong.substack.com, blog.udn.com/DejaVu
  (web): the 「專求月令」 wording and its variants.
- ★ 《滴天髓》原文, `texts/bazi/ditiansui-yuanwen.pdf`, and
  zh.wikisource.org/wiki/滴天髓 (web): 衰旺, 中和, 通隔, 寒暖, 月令, 歲運,
  體用, 從化, 陰陽順逆.
- ★ 《滴天髓闡微》 1947 via `texts/rules/BZ-02.md`: hidden stems, 本氣為主,
  寅申沖.
- 《窮通寶鑑》, zh.wikisource.org/zh-hant/穷通宝鉴 (web): 正月甲木 and 論木.
- `texts/rules/BZ-01…BZ-09.md` and `texts/localcat/bazi.md`: the corpus (淵海
  子平 ★, 中国古代算命术, 子平真詮 ★, 闡微 ★).
- ★ 《命理新論》 via `docs/sources.md` § calendrical layer: true solar time,
  midnight, dongzhi.
- ★ 《遁甲演義》 via `docs/sources.md` § 年命: 本命 and 行年.
- Korean edition study of 滴天髓, koreascience.or.kr/article/JAKO202123861767325.do
  (web): the recensions and their reprints.
- NCCU repository bibliography, nccur.lib.nccu.edu.tw/ir/handle/140.119/95588
  (web, abstract only): 梁湘潤's titles and 窮通寶鑑 editions.
- 子時 debate pages: uptogo.com.tw, vocus.cc (web): reports of three 子-hour
  practices.
- 大運 pages: lius.cc/n/concept/da_yun, zhuanlan.zhihu.com/p/620756670,
  kknews.cc/astrology/bn38o.html (web): 三日一歲 and the 12-hour rounding.
- 干支各管五年 pages: sohu.com/a/480626923_120557164,
  zhuanlan.zhihu.com/p/683069960 (web): positions attributed to 沈孝瞻,
  任鐵樵, 萬民英 and 邵偉華.
- 土長生 pages: k.sina.cn/article_2983961700_b1dba46402700goh2.html,
  bilibili opus 568152034992880192 (web): 火土 against 水土 同宮.
- 人元司令 pages: zhuanlan.zhihu.com/p/641890940, 64gua.com (web): day
  tables and their variants.
- 藏干 rank pages: zhuanlan.zhihu.com/p/672997915 (web): 「生本氣者為中氣」.
- True-solar-time pages: zhuanlan.zhihu.com/p/629095631, vocus.cc (web): the
  practitioners' dispute and DST 1986–91.
- 盲派 syllabus: bilibili.com/cheese/play/ss677106968 (web): 賓主, 體用, 功神,
  廢神.
- 新派 note: bilibili.com/opus/495680144121178678 (web): stems for 六親.

### English

- Wikipedia, "Four Pillars of Destiny" (web): the received three-to-four-
  pillar story and its sources.
- Richard J. Smith, *Fortune-tellers and Philosophers* (Westview 1991): social
  history of 算命.
- Ho Peng Yoke, *Chinese Mathematical Astrology* (Routledge 2003; TOC checked
  online): the 三式 only, with no 子平.
- Marc Kalinowski in Lagerwey & Kalinowski eds., *Early Chinese Religion I*
  (Brill 2010): the precursors (not re-checked this session).
- Michael Lackner ed., *Fate and Prognostication in the Chinese Literary
  Imagination* (Brill 2020): fate as a cultural notion.
- Joey Yap, *BaZi: The Destiny Code* (2004/05; goodreads, abebooks): the
  modern 扶抑 manual.
- Derek Walters, *Chinese Astrology* (1987); Raymond Lo, *Four Pillars of
  Destiny*; Lily Chung, *The Path to Good Fortune* (1997); Jerry King (titles
  unverified): practitioner literature, no witness value.
