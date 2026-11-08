# Errands

Small doubts the readings left, cells and characters to look at again, what
the review of 2026-10-23 found and did not fix, the lens's leads, and strings
for the user to read. None blocks anything; a session with time to spare takes
one. Part of [`docs/open.md`](open.md), held to the code with it by
`node texts/todo-check.mjs`.

## Left open by the readings

Each reading's errands, newest first, from phase 94. Those of phases 86 to 93
are in `docs/history/roadmap-2026-11-06-phase101.md`, and the earlier ones in
`docs/history/roadmap-2026-11-05.md` and `docs/history/roadmap-2026-10-30.md`.

- **Phase 103**, the shelf's last two lines. Where a 日家 count running at a
  solstice ends, finished at its 癸亥 or dropped on the solstice day as
  `dayDun: solstice` drops it: the 金函玉鏡's 卷二十 p. 413 states the anchor
  and not the boundary, and no other held text has been named for it. 潘鼐's
  report that the Ming 《三垣列舍入宿去極集》 opens on the 授時曆經's
  黃道十二次宿度, in a manuscript not held.

- **Phases 98–100**, inside 《星學大成》 and the 集成's 《張果星宗》:
  whether 《星學大成》卷三 起大限's case (福德 10, 遷移 9, opening at 13) is two
  numerals miscopied or another table, which its 洞微限 and 百六限 (卷八–十三)
  may settle; 《星學大成》's verse 約二十八宿過宮度數歌, reported as 「張十四巳」,
  against its own wheel's miscopy, on the plate; 定限度法's 「以量天尺九難」 as
  printed; the 張果星宗's 年分訣 「共六六」, not construed.

- **Phase 96**, inside 《奇門旨歸》: 超神接氣折補閏局法, read once and not
  reconciled clause by clause before `method: chaibu` names it; 陽七局 丁卯's
  plate (乙丑's, PDF 118) and 陰九局 戊辰's stars (four palaces on, PDF 143);
  the stars of the other boards, not transcribed; the single cells cut twice
  (`texts/qimen/zhigui/scripts/check.mjs --list`).

- **Phase 95**, inside 《奇門遁甲鳴法》: the 認局 passage's example, 「如乙丑日亥時交節…
  為中局」, against the 拆補 the same passage states, before `method: chaibu`
  names the work; the 陰 diagram's centre, not drawn; 第一章's 日課 · 月法 · 年依運
  · 世從會, a family read only far enough to name it.

- **Phase 94**, inside 《奇門法竅》's 排宮 figures: 陰遁一局 乙丑's 景 for 英 on 坎一.

## Small, inside works already read

In the 符應經, the note in small characters under
the title at 遁甲集成 第三冊 p. 1136, and 玉女守門 as two tables in two
copies; in the 集成's 度數所在過宮圖, 井's 分 and 畢's 秒, at the limit of
the scan. In the 《統宗》: the lunar
constants of 卷二, one damaged, and its 朓朒 leaves pp. 22–27, seen and not
read; the rest of 推四神太乙立成歷, p. 108, to collate; the reign printed
for 1444 in the list of gates; two characters of the note under the heading
at p. 193; the case of 釋提執, which breaks off at the foot of p. 70, and
the board under 釋擊, p. 68, which is another 局's; 者 or 考 closing a column at p. 29; the
character lost before 天時's 申 at p. 395, and which text 盧央 followed for
his 寅; what the 甲寅 heading the 天目's two figures at p. 110 is; and whether that work and the
《太乙統宗寶鑑》 the engine names its witness for are one recension —
`taiyitongzong` in `packages/core/src/witnesses.ts`, and the catalogs with
it, carry the second title and the file on the shelf the first.

## The review of 2026-10-23

Each wants a plate or the user's word; rechecked against the code and the
register 2026-10-31, 2026-11-05 and 2026-11-06.

- 六壬: 無親, which the 精解 names, closed as unnamed; no row for the
  direction of the generals, the 遁干, or 無依, 自任, 自信, 虎視, 冬蛇掩目.
- 曆注: 臨日 carried `xiong`, where the 協紀 overrules the 《樞要歷》 and
  calls it 吉 (華齡 OCR pdf p. 160, memorial p. 13); 十二神 at rung 4 on a
  7 300-day check; the 神煞 row still says seven; 宜忌 refused with no
  entry in `docs/refusals.md`; a second 喜神 rule in 卷七 leaf 47.
- 八字: yin-stem 長生 is a school (任鐵樵) the prompt does not sign;
  `dongzhi` turns the 大運 for six weeks with no witness; no row for
  `dayBoundary: midnight`.
- 奇門: no row for `spirits: fixed`, `spirits: baihu`,
  `centreTravel: travel`; the 入墓 row (rung 4 since 2026-11-05) carrying
  two axes that each part; the 統宗's and the 秘笈大全 卷一's copies of the
  入墓 歌 on the plate; the 日家 refusal row, and the 飛盤 one in
  `docs/sources.md`'s table, which `plate: fei`, `gateSeats` and `spiritRing`
  now compute; the 十干克應 row (a second witness asked for, 70 for
  67).
- 七政: `luohou: ascending` with no `heldBy` and no row; the 三辰通載
  described two ways; `minggong: yuejiang`'s 三命通會 lays on the month's
  palace and would part from the Sun's under `gong: ci`.
- 太乙: no row for 陽宮/陰宮; 《齊書》 likely 《南齊書》; kintaiyi (MIT)
  exists against `docs/agent-prompt.md`'s «nothing open computes this
  board».
- 紫微: no row for `yearBoundary: lichun`; the five phases row's rung;
  「辨生剋制化以定窮通」 is 斗數準繩's and not the 太微賦's; 第五冊 of the
  絕學 holds three works; the `sihua` refusal row unmarked.

## When the lens moves again

The year board has no lens (the 奇門 endpoint answers it with none), and the month
board is to be designed with its lens from the start; 八字 last and only if the user wants it, the relations
there (合, 沖, the ten gods) being a different lens. Leads, none decided:
論星辰生尅制化 (全書 卷之三, PDF 162–163) gives a 紫微 palace's ground its
branch's phase, rung 4, its last clause odd on the plate (「土入金鄉」, the
transcription 木鄉); a pair on 太乙's palaces, in 太乙's numbering; 六壬's
六沖 and 六合, a general by its own phase ("Recorded, with no parameter"), the 日家's nine stars and
the 紫微 四化 flights, each once it has its row; a phase for 太常, which
`spiritRing: nine` lays and a phased lens leaves out — 《奇門旨歸》卷一's
九神五行 (PDF 18) gives one to each of the nine, not read for this; 太乙's answer is cached
`public` for a week, so a change to its shape reaches a returning reader
late. On the 奇門 section the family selector pushes the moment's steps to
a second line of the bar at 1920 wide; not looked at narrower, nor choosing
another hour with the scan's dialog open.

## Catalog strings owed a look by the user

Read by nobody but their writer, both catalogs, newest first, none blocking
(glosses in `docs/history/roadmap-2026-10-30.md`; strings before
2026-10-30 in `docs/history/roadmap-2026-11-06-phase101.md`). 2026-11-06,
phases 99 and 101: `form.qizheng.gong` and its values and note,
`form.qizheng.qixian` and its values and note, `notes.parameter.qixian`,
`cli.field.mingdu`, `cli.field.limits`, `cli.value.limitYears`,
`cli.value.noLimits`, `cli.column.qizhengLimit`, `prompt.qizheng.gong.ci`,
`prompt.qizheng.limits`. 2026-11-06, phase 97:
`form.qimen.gateSeats` and its values and note, `form.qimen.spiritRing` and
its values, `notes.parameter.gateSeats` and `.spiritRing`, `label.gate.zhong`,
`label.spirit.taichang`, and the counts of spirits taken out of
`form.qimen.spiritSeat`, `form.qimen.spiritPhase`, `form.qimen.system.shijia`
and their `notes.parameter.*`. 2026-11-05:
`form.qimen.plate` and its values and note, `notes.parameter.plate`.
2026-10-30: `form.qimen.leap` and its values and note, *reader-copy*.
