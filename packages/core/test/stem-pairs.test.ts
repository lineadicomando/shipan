import { beforeAll, describe, expect, it } from 'vitest';
import { computeQimenChart, type QimenChart } from '../src/dunjia/index.js';
import { PATTERN_IDS, valenceOf } from '../src/dunjia/patterns.js';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { resolveMoment } from '../src/pillars.js';
import { DEFAULT_OPTIONS, type ChartOptions, type Place } from '../src/types.js';

let context: EphemerisContext;
/** Filled by `beforeAll`: the sample cannot be cast before the ephemeris is up. */
let found: Map<string, { above: string; below: string }>;

beforeAll(() => {
  context = initEphemeris();
  found = everyPairingFound();
});

const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
/**
 * 茅山, for the reason `patterns.test.ts` gives: the fixture was picked for
 * the pairing a particular ju puts on the board.
 * → `docs/history/40-the-default-was-maoshan.md`
 */
const CLOCK: ChartOptions = {
  ...DEFAULT_OPTIONS,
  method: 'maoshan',
  trueSolarTime: false,
  dayBoundary: 'midnight',
};

function cast(date: string, time: string): QimenChart {
  return computeQimenChart(
    resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, CLOCK, context),
    CLOCK,
  );
}

/**
 * A spread wide enough to meet every pairing the table holds. Two years of
 * charts at four hours a day is some three thousand boards, which is far more
 * than enough: each of the eleven pairings needs only one palace, anywhere,
 * on any of them.
 */
function everyPairingFound(): Map<string, { above: string; below: string }> {
  const seen = new Map<string, { above: string; below: string }>();
  for (const year of [2024, 2025]) {
    for (let month = 1; month <= 12; month += 1) {
      for (const day of [3, 11, 19, 27]) {
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        for (const hour of ['01:00', '07:00', '13:00', '19:00', '23:30']) {
          const chart = cast(date, hour);
          for (const pattern of chart.patterns) {
            if (pattern.palace === undefined) continue;
            const cell = chart.palaces.find((one) => one.palace.number === pattern.palace);
            if (cell) seen.set(pattern.id, { above: cell.heaven.id, below: cell.earth.id });
          }
        }
      }
    }
  }
  return seen;
}

// Some five hundred charts are cast to meet every pairing, which is quick but
// not instant, and the suite has been bitten twice by the five-second default.
describe('十干克應 — the stem above over the stem below', { timeout: 30_000 }, () => {
  /**
   * The couplets of the 煙波釣叟歌, verbatim from the Wikisource text — see
   * `docs/sources.md`. This is the data; `patterns.ts` holds the pairings and
   * the names, and the two have to agree.
   *
   * 甲 never stands on a plate, so the song's 丙加甲 and 甲加丙 are read as
   * 丙 over 戊 and 戊 over 丙, 戊 being the instrument concealing 甲子.
   */
  const VERSE: [string, string, string, string][] = [
    ['六庚加丙白入熒', 'geng', 'bing', 'taibairuying'],
    ['六丙加庚熒入白', 'bing', 'geng', 'yingrutaibai'],
    ['庚加癸兮為大格', 'geng', 'gui', 'dage'],
    ['加己為刑最不宜', 'geng', 'ji', 'xingge'],
    // The one line the recensions divide over: 上格 here and in the Qing
    // engraving of 《奇門闡秘前編》, 小格 where 《統宗》 quotes it. See
    // `docs/sources.md`; the pairing is agreed and only the name is not.
    ['加壬之時為上格', 'geng', 'ren', 'shangge'],
    ['六癸加丁蛇夭矯', 'gui', 'ding', 'tengsheyaojiao'],
    ['六丁加癸雀投江', 'ding', 'gui', 'zhuquetoujiang'],
    ['六乙加辛龍逃走', 'yi', 'xin', 'qinglongtaozou'],
    ['六辛加乙虎猖狂', 'xin', 'yi', 'baihuchangkuang'],
    ['丙加甲兮鳥跌穴', 'bing', 'wu', 'feiniaodiexue'],
    ['甲加丙兮龍返首', 'wu', 'bing', 'qinglongfanshou'],
  ];

  for (const [line, above, below, id] of VERSE) {
    it(`${line} — ${id}`, () => {
      const where = found.get(id);
      expect(where, `${id} never occurred in the sample`).toBeDefined();
      expect(where).toEqual({ above, below });
    });
  }

  it('reports 青龍耀明 where 戊 stands over 丁, and 日奇入霧 where 乙 stands over 己', () => {
    // Neither is in the couplets above: each is named alike by two lines that
    // never met, and each is given a fortune of its own by both — see
    // `docs/sources.md`. They are here rather than with the verse so that the
    // tier they belong to is visible in the test file too.
    expect(found.get('qinglongyaoming')).toEqual({ above: 'wu', below: 'ding' });
    expect(found.get('riqiruwu')).toEqual({ above: 'yi', below: 'ji' });
  });

  it('reports 太白同宮 where 庚 stands over 庚', () => {
    // Not in the couplets above: the tables name it and the verse does not —
    // see `docs/sources.md`. 戰格 is its 又名 and used to be what shipped. It
    // is here rather than with the verse so that the tier it belongs to is
    // visible in the test file too.
    expect(found.get('taibaitonggong')).toEqual({ above: 'geng', below: 'geng' });
  });

  it('never reports a pairing in the centre, where nothing was brought', () => {
    // The turn neither moves the centre nor reaches it, so its heaven stem is
    // its earth stem by construction: a ju seating 庚 there would otherwise
    // carry 太白同宮 in the centre every hour of the term. Yang ju 3 is such a ju.
    for (const hour of ['01:00', '07:00', '13:00', '19:00']) {
      const chart = cast('2024-03-21', hour);
      const centre = chart.palaces.find((cell) => cell.palace.number === 5);
      expect(centre?.earth.id).toBe('geng');
      for (const pattern of chart.patterns) {
        if (PAIR_IDS.includes(pattern.id)) expect(pattern.palace).not.toBe(5);
      }
    }
  });

  it('gives every pairing of the table a fortune, and every one of them 凶 but three', () => {
    // 三奇得使 is a marvel over a decade's instrument and not a cell of the
    // table, though the same pair of stems can make both.
    const pairings = PATTERN_IDS.filter((id) => found.has(id) && id !== 'sanqideshi');
    // Two of the three were the two the verse itself marks 吉; 青龍耀明 is the
    // third and came in with the printed table, which grades it 吉 in its own
    // words and is seconded there. Everything the cross-check added is 凶.
    const auspicious = pairings.filter((id) => valenceOf(id)?.id === 'ji');
    expect([...auspicious].sort()).toEqual(['feiniaodiexue', 'qinglongfanshou', 'qinglongyaoming']);
  });

  it('never reports two names for one palace’s pair of stems', () => {
    // The table is a function of the pair, so a palace cannot fall into two of
    // these at once. A duplicated row would make it, and nothing else would.
    for (const date of ['2024-03-11', '2025-07-19']) {
      for (const hour of ['07:00', '19:00']) {
        const chart = cast(date, hour);
        const byPalace = new Map<number, number>();
        for (const pattern of chart.patterns) {
          if (!PAIR_IDS.includes(pattern.id) || pattern.palace === undefined) continue;
          byPalace.set(pattern.palace, (byPalace.get(pattern.palace) ?? 0) + 1);
        }
        for (const count of byPalace.values()) expect(count).toBe(1);
      }
    }
  });
});

const PAIR_IDS: string[] = [
  'qinglongfanshou', 'feiniaodiexue', 'taibairuying', 'yingrutaibai', 'dage',
  'xingge', 'taibaitonggong', 'tengsheyaojiao', 'zhuquetoujiang', 'qinglongtaozou',
  'baihuchangkuang', 'qinglongyaoming', 'riqiruwu',
];

/**
 * 《金函玉鏡》卷二 十干克應訣, cell by cell: the stem above, the stem below,
 * and the name the text gives that pairing, as `stemPairs: jinhan` lays it.
 * Transcribed from the 1996 print, pp. 30–32, simplified type read into the
 * traditional the engine prints. The fourteen of the shared table are not
 * repeated here, and 戊 over 戊 is not here at all: the text's 伏吟 would
 * collide with the board's own.
 */
const JINHAN: readonly [string, string][] = [
  ['戊乙', 'qinglongheling'],
  ['戊己', 'guirenruyu'],
  ['戊庚', 'zhifufeigong'],
  ['戊辛', 'qinglongzhezu'],
  ['戊壬', 'qinglongrutianlao'],
  ['戊癸', 'qinglonghuagai'],
  ['乙戊', 'liyinhaiyang'],
  ['乙乙', 'riqifuyin'],
  ['乙丙', 'qiyishunsui'],
  ['乙丁', 'qiyixiangzuo'],
  ['乙庚', 'riqibeixing'],
  ['乙壬', 'riqirudi'],
  ['乙癸', 'huagaifengxingguan'],
  ['丙乙', 'riyuebingxing'],
  ['丙丙', 'yueqibeishi'],
  ['丙丁', 'yueqizhuque'],
  ['丙己', 'dabeiruxing'],
  ['丙辛', 'moushijiucheng'],
  ['丙壬', 'huorutianluo'],
  ['丙癸', 'huagaibeishi'],
  ['丁戊', 'qinglongzhuanguang'],
  ['丁乙', 'rendunjige'],
  ['丁丙', 'xingsuiyuezhuan'],
  ['丁丁', 'qirutaiyin'],
  ['丁己', 'huorugouchen'],
  ['丁庚', 'nianyuerishige'],
  ['丁辛', 'zhuqueruyu'],
  ['丁壬', 'wushenhuhe'],
  ['己戊', 'quanyuqinglong'],
  ['己乙', 'mushen'],
  ['己丙', 'huobeidihu'],
  ['己丁', 'zhuquerumu'],
  ['己己', 'dihufenggui'],
  ['己庚', 'ligefanming'],
  ['己辛', 'youhunrumu'],
  ['己壬', 'diwanggaozhang'],
  ['己癸', 'dixingxuanwu'],
  ['庚戊', 'taibaitianyifugong'],
  ['庚乙', 'taibaipengxing'],
  ['庚丁', 'tingtingzhige'],
  ['庚辛', 'baihugange'],
  ['辛戊', 'kunlongbeishang'],
  ['辛丙', 'ganhebeishi'],
  ['辛丁', 'yushendeqi'],
  ['辛己', 'ruyuzixing'],
  ['辛庚', 'baihuchuli'],
  ['辛辛', 'fuyintianting'],
  ['辛壬', 'xiongsheruyu'],
  ['辛癸', 'tianlaohuagai'],
  ['壬戊', 'xiaoshehualong'],
  ['壬乙', 'xiaosheriqi'],
  ['壬丙', 'shuisheruhuo'],
  ['壬丁', 'ganheshexing'],
  ['壬己', 'xiongsherumu'],
  ['壬庚', 'taibaiqinshe'],
  ['壬辛', 'tengshexiangchan'],
  ['壬壬', 'sherudiluo'],
  ['壬癸', 'younvjianyin'],
  ['癸戊', 'tianyihuihe'],
  ['癸乙', 'huagaifengxing'],
  ['癸丙', 'huagaibeishi'],
  ['癸己', 'huagaidihu'],
  ['癸庚', 'taibairuwang'],
  ['癸辛', 'wanggaitianlao'],
  ['癸壬', 'fujiantengshe'],
  ['癸癸', 'tianwangsizhang'],
];

const STEM_ID: Record<string, string> = {
  乙: 'yi', 丙: 'bing', 丁: 'ding', 戊: 'wu', 己: 'ji', 庚: 'geng', 辛: 'xin', 壬: 'ren', 癸: 'gui',
};

describe('the table of 《金函玉鏡》, under stemPairs: jinhan', { timeout: 60_000 }, () => {
  const JINHAN_CLOCK: ChartOptions = { ...CLOCK, stemPairs: 'jinhan' };

  /** Every stem-pair mark found, keyed by the pair of stems it stood on. */
  function sweep(options: ChartOptions): Map<string, Set<string>> {
    const seen = new Map<string, Set<string>>();
    for (const year of [2024, 2025]) {
      for (let month = 1; month <= 12; month += 1) {
        for (const day of [3, 11, 19, 27]) {
          const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          for (const hour of ['01:00', '07:00', '13:00', '19:00', '23:30']) {
            const chart = computeQimenChart(
              resolveMoment({ date, time: hour, timezone: 'Asia/Shanghai' }, BEIJING, options, context),
              options,
            );
            for (const pattern of chart.patterns) {
              if (pattern.palace === undefined || !STEM_PAIR_IDS.has(pattern.id)) continue;
              const cell = chart.palaces.find((one) => one.palace.number === pattern.palace);
              if (!cell) continue;
              const key = `${cell.heaven.id}/${cell.earth.id}`;
              seen.set(key, (seen.get(key) ?? new Set()).add(pattern.id));
            }
          }
        }
      }
    }
    return seen;
  }

  const STEM_PAIR_IDS = new Set<string>([...PAIR_IDS, 'shangge', ...JINHAN.map(([, id]) => id)]);

  it('names every cell of the eighty it lays as the text names it, and nothing else', () => {
    const found = sweep(JINHAN_CLOCK);
    for (const [pair, id] of JINHAN) {
      const key = `${STEM_ID[[...pair][0] as string]}/${STEM_ID[[...pair][1] as string]}`;
      expect([...(found.get(key) ?? [])], pair).toEqual([id]);
    }
    // And the shared fourteen stand under it unchanged.
    expect([...(found.get('geng/gui') ?? [])]).toEqual(['dage']);
    expect([...(found.get('wu/ding') ?? [])]).toEqual(['qinglongyaoming']);
    // 戊 over 戊 carries no stem-pair mark: the board's 伏吟 is another thing.
    expect(found.get('wu/wu')).toBeUndefined();
    expect(found.size).toBe(80);
  });

  it('lays none of them under the default', () => {
    const jinhanOnly = new Set(JINHAN.map(([, id]) => id));
    for (const ids of sweep(CLOCK).values()) {
      for (const id of ids) expect(jinhanOnly.has(id), id).toBe(false);
    }
  });

  it('gives a fortune only where the text states one outright', () => {
    // 「公謀私為皆吉」, 「文書事吉，百事皆可為」, 「吉格」 twice; and 「公私皆不利」,
    // 「吉事不吉，凶事更凶」, 「凡陰陽皆不吉利」, 「百事不可謀，為凶」.
    const weighed = [...new Set(JINHAN.map(([, id]) => id))].filter((id) => valenceOf(id as never));
    const by = (v: string) => weighed.filter((id) => valenceOf(id as never)?.id === v).sort();
    expect(by('ji')).toEqual(['qiyixiangzuo', 'rendunjige', 'riyuebingxing', 'tianyihuihe']);
    expect(by('xiong')).toEqual(['guirenruyu', 'qinglongrutianlao', 'taibaitianyifugong', 'zhifufeigong']);
    expect(weighed).toHaveLength(8);
  });
});
