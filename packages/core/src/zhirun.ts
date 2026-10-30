import { sunCrossing, sunLongitude, type EphemerisContext } from './ephemeris.js';
import { dayGanzhi } from './ganzhi.js';
import { leapMonthsBetween } from './lunar.js';
import { SOLAR_TERMS, type SolarTermId } from './solar-terms.js';

/**
 * Where a day stands in the bookkeeping of the 置閏 method.
 *
 * Under zhirun the ju does not follow the term the Sun is actually in: it
 * follows the day's place in the sexagenary cycle. Days run in five-day
 * stretches headed by a 甲 or 己 day (the 符頭), and three stretches — always
 * upper, middle, lower in that order — make a fifteen-day block headed by
 * 甲子, 甲午, 己卯 or 己酉. Each block serves one term and takes that term's
 * three ju numbers; because a block is 15 days and a term averages a little
 * more, the blocks drift ahead of the terms (超神), and the drift is paid
 * off by an intercalated block (閏) that repeats 芒種 or 大雪, after which
 * the blocks trail the terms instead (接氣).
 */
export interface ZhirunAssignment {
  /**
   * The term whose ju the day's block serves. Under 超神 it can be a term
   * that has not yet begun; it is not the term in force at the instant.
   */
  term: SolarTermId;
  /** 0 upper, 1 middle, 2 lower — the stretch's place in its block. */
  yuanIndex: 0 | 1 | 2;
  /**
   * True inside an intercalated block: 芒種 or 大雪 under `leap: solstice`,
   * the term the leap month falls under under `leap: runyue`.
   */
  leap: boolean;
}

/**
 * The heads of the fifteen-day blocks are the four 上元 futou — 甲子 (0),
 * 己卯 (15), 甲午 (30), 己酉 (45) — which is to say the days whose sexagenary
 * index is a multiple of fifteen. The sixty-day cycle is exactly four blocks.
 */
const BLOCK = 15;

/**
 * How many whole days the block head may precede the solstice's civil day.
 *
 * This is the contested pin of the whole method. The classical rule says to
 * intercalate when the 超神 has grown to nine days or more, which is read here
 * as a gap of nine, bounding the head to at most eight days before the
 * solstice and, the blocks being fifteen days apart, to at most six after it —
 * a window of exactly one block, so the head a solstice takes is never
 * ambiguous. Sources that say "ten" instead of "nine" shift the window by one
 * day, and a Japanese tradition that says "the futou nearest the solstice"
 * shifts it the other way; the three coincide except when the head falls
 * exactly at the edge. `kinqimen`, the one runnable reference, intercalates at
 * nine that way, and so does this table.
 *
 * **《奇門遁甲統宗》卷一 置閏法 counts its nine inclusively**, which makes it a
 * gap of eight, and its dated worked example over 1717–1719 intercalates one
 * day earlier than this. Every day pillar in that example is reproduced here
 * and the two part in exactly one cell — a solstice at position 8. The value
 * is left at 8 because one text against one runnable reference is one against
 * one; `docs/sources.md` § 置閏 has the whole of it, and this is the first
 * thing to reopen if a second witness turns up.
 */
const MAX_CHAOSHEN = 8;

/**
 * Assigns a day to its term under the 置閏 method.
 *
 * `day` is the Julian Day Number the day pillar was read from — the futou is
 * a fact about the day pillar, so it follows the same reckoning, whatever
 * `dayBoundary` and `trueSolarTime` made of it. The solstices are placed on
 * civil days through `dayOf`, in the chart's own zone: the bookkeeping runs
 * on the chart's calendar exactly as the day pillar does, which keeps the
 * chart consistent with itself and means a chart far from 120°E can turn a
 * page one civil day away from the Chinese almanac.
 *
 * The assignment needs no history. Pinning each solstice's block inside its
 * one-block window fixes every block between two consecutive solstices:
 * twelve blocks serve the twelve terms in order, and a thirteenth, when the
 * window forces one, is the intercalation — it repeats the term before the
 * solstice, 芒種 or 大雪.
 *
 * This is `leap: solstice`, the 統宗's placement, worked by date in its 卷一.
 * The other value, 《奇門遁甲金鏡寶鑑》's, is `runyueAssignment` below.
 */
export function zhirunAssignment(args: {
  /** Julian Day Number the day pillar was read from. */
  day: number;
  /** The instant, used only to find the solstices around it. */
  julianDayUT: number;
  /** An instant's civil day, in the same reckoning as `day`. */
  dayOf: (julianDayUT: number) => number;
  context: EphemerisContext;
}): ZhirunAssignment {
  const { day, julianDayUT, dayOf, context } = args;

  const cyclePosition = dayGanzhi(day).index % BLOCK;
  const blockHead = day - cyclePosition;
  const yuanIndex = Math.floor(cyclePosition / 5) as 0 | 1 | 2;

  // The solstices bracketing the block, each pinned to its own block head.
  // The one to anchor on is the latest whose head is not after this block's:
  // under 超神 that can be a solstice that has not happened yet.
  const solstices = solsticesAround(julianDayUT, context).map((solstice) => ({
    ...solstice,
    head: pinnedHead(dayOf(solstice.julianDayUT)),
  }));

  const anchorAt = solstices.findLastIndex((s) => s.head <= blockHead);
  const anchor = solstices[anchorAt];
  const next = solstices[anchorAt + 1];
  // Unreachable: the search spans more than a year back and a year forward,
  // so a solstice head on either side of any block in between is guaranteed.
  if (!anchor || !next) throw new Error('no solstice found around the moment');

  const blocksIn = (span: number): number => {
    // Block heads all lie on the multiples of fifteen in the day cycle, so a
    // span between two of them is always a whole number of blocks.
    if (span % BLOCK !== 0) throw new Error(`blocks out of step by ${span % BLOCK} days`);
    return span / BLOCK;
  };

  const n = blocksIn(blockHead - anchor.head);
  const between = blocksIn(next.head - anchor.head);

  // Twelve blocks carry the twelve terms from one solstice to the other.
  // A thirteenth is the intercalation: it repeats the twelfth term — 芒種
  // before 夏至, 大雪 before 冬至 — rather than reaching the solstice early.
  const leap = between === 13 && n === 12;
  const termIndex = (anchor.termIndex + (leap ? 11 : n)) % SOLAR_TERMS.length;
  const term = SOLAR_TERMS[termIndex]?.id as SolarTermId;

  return { term, yuanIndex, leap };
}

/** The solstice's block head: the one 上元 futou inside its one-block window. */
function pinnedHead(solsticeDay: number): number {
  const position = dayGanzhi(solsticeDay).index % BLOCK;
  // A head up to MAX_CHAOSHEN days back keeps the 超神 under the classical
  // bound; further back than that, the intercalation has already pushed the
  // assignment on, and the head lands after the solstice instead (接氣).
  return position <= MAX_CHAOSHEN
    ? solsticeDay - position
    : solsticeDay - position + BLOCK;
}

interface Solstice {
  julianDayUT: number;
  /** Index into SOLAR_TERMS: 夏至 or 冬至. */
  termIndex: number;
}

const XIAZHI_INDEX = SOLAR_TERMS.findIndex((t) => t.id === 'xiazhi');
const DONGZHI_INDEX = SOLAR_TERMS.findIndex((t) => t.id === 'dongzhi');

/**
 * Every solstice from over a year before an instant to over a year after,
 * in chronological order.
 *
 * The reach is deliberate: the anchoring solstice can stand almost half a
 * year before the moment, or — when the moment's block already serves a
 * coming solstice — some days after it, and the solstice after the anchor is
 * needed too, another half year on.
 */
function solsticesAround(julianDayUT: number, context: EphemerisContext): Solstice[] {
  const found: Solstice[] = [];
  for (const [longitude, termIndex] of [
    [90, XIAZHI_INDEX],
    [270, DONGZHI_INDEX],
  ] as const) {
    let cursor = julianDayUT - 400;
    for (;;) {
      const crossing = sunCrossing(longitude, cursor, context);
      if (crossing > julianDayUT + 400) break;
      found.push({ julianDayUT: crossing, termIndex });
      cursor = crossing + 1;
    }
  }
  return found.sort((a, b) => a.julianDayUT - b.julianDayUT);
}

/**
 * Assigns a day to its term under 置閏 with `leap: runyue`.
 *
 * 《奇門遁甲金鏡寶鑑》卷之一 counts the blocks one after another from the 符頭
 * — 「起元只從符頭，不從節氣，局局挨來」 — and repeats a block wherever the
 * year's leap month falls: 「按是年閏月在何節氣下，即於其節氣中重用三局。如今
 * 戊午年閏三月，當重用穀雨閏三局」. The term a leap month falls under is the
 * 中氣 of the month it follows, which is the last 中氣 before it opens:
 * 閏三月 repeats 穀雨, 閏七月 處暑.
 *
 * The count needs an anchor and the text gives none, so each such term is
 * pinned to the 符頭 at or before its civil day — 超神 of nought to fourteen
 * days, which the text calls the usual state, 「符頭自合超局多，接局正授少」,
 * and which both its worked years show. Between two pinned terms the blocks
 * run one a term, and the first term is served twice.
 *
 * **Where the two pins leave no room for the repeat, nothing is repeated.**
 * The leap months come a little more often than the drift asks to be paid —
 * 184 against 175 blocks over 1600–2100 — so about once in fifty years a
 * leap month opens a stretch one block too short for its own repeat: the
 * last was 閏六月 of 2017, the next 閏六月 of 2074. The text says nothing of
 * the case, and the engine lays those stretches without the repetition, on
 * the user's word of 2026-10-30, until a text does; the board carries no
 * `leap` block there. `docs/sources.md` § 置閏 has the measurement.
 */
export function runyueAssignment(args: {
  /** Julian Day Number the day pillar was read from. */
  day: number;
  /** The instant, used only to find the leap months around it. */
  julianDayUT: number;
  /** An instant's civil day, in the same reckoning as `day`. */
  dayOf: (julianDayUT: number) => number;
  context: EphemerisContext;
}): ZhirunAssignment {
  const { day, julianDayUT, dayOf, context } = args;

  const cyclePosition = dayGanzhi(day).index % BLOCK;
  const blockHead = day - cyclePosition;
  const yuanIndex = Math.floor(cyclePosition / 5) as 0 | 1 | 2;

  // Leap months come at most 33 lunations apart, so 1300 days on either
  // side always holds a pin before this block and one after it.
  const pins = leapMonthsNear(julianDayUT, context).map(
    (opens) => {
      // The 中氣 the leap month falls under: the last multiple of 30° the Sun
      // reached before the month opened.
      const longitude = Math.floor(sunLongitude(opens, context) / 30) * 30;
      const instant = sunCrossing(longitude, opens - 40, context);
      const termDay = dayOf(instant);
      return {
        instant,
        termIndex: SOLAR_TERMS.findIndex((t) => t.longitude === longitude),
        head: termDay - (dayGanzhi(termDay).index % BLOCK),
      };
    },
  );

  const at = pins.findLastIndex((pin) => pin.head <= blockHead);
  const pin = pins[at];
  const next = pins[at + 1];
  // Unreachable: see the reach above.
  if (!pin || !next) throw new Error('no leap month found around the moment');

  const n = (blockHead - pin.head) / BLOCK;
  const blocks = (next.head - pin.head) / BLOCK;
  // A term lasts 15.22 days on average and never strays far from it, so the
  // terms between the two pins are their distance over that, rounded.
  const terms = Math.round((next.instant - pin.instant) / (365.2422 / 24));
  const repeat = blocks - terms;
  // The heads sit nought to fourteen days before their terms, and a stretch
  // gains at most fifteen days on the Sun, so the difference is 0 or 1.
  if (repeat !== 0 && repeat !== 1) throw new Error(`blocks out of step by ${repeat}`);

  const leap = repeat === 1 && n === 1;
  const step = repeat === 1 && n >= 1 ? n - 1 : n;
  const term = SOLAR_TERMS[(pin.termIndex + step) % SOLAR_TERMS.length]?.id as SolarTermId;
  return { term, yuanIndex, leap };
}

/** Days to a bucket of the cache below. */
const BUCKET = 1000;

/** The leap months found so far, by context and by bucket of days. */
const leapMonthCache = new WeakMap<EphemerisContext, Map<number, number[]>>();

/**
 * The new moons opening the leap months within 1300 days of an instant.
 *
 * Cached by the thousand days, for each ephemeris context: a scan lays a
 * board an hour, and each would otherwise search seven years of new moons
 * for the same four or five leap months.
 */
function leapMonthsNear(julianDayUT: number, context: EphemerisContext): number[] {
  let buckets = leapMonthCache.get(context);
  if (!buckets) leapMonthCache.set(context, (buckets = new Map()));
  const found: number[] = [];
  const first = Math.floor((julianDayUT - 1300) / BUCKET);
  const last = Math.floor((julianDayUT + 1300) / BUCKET);
  for (let bucket = first; bucket <= last; bucket += 1) {
    let opens = buckets.get(bucket);
    if (!opens) {
      const from = bucket * BUCKET;
      opens = leapMonthsBetween(from, from + BUCKET, context).filter(
        (jd) => jd >= from && jd < from + BUCKET,
      );
      buckets.set(bucket, opens);
    }
    found.push(...opens);
  }
  return found;
}
