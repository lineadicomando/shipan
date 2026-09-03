import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { computeBazi } from '../src/bazi/index.js';
import { computeQimenChart } from '../src/dunjia/index.js';
import { initEphemeris, resetEphemerisCache, type EphemerisContext } from '../src/ephemeris.js';
import { liurenBoard, DEFAULT_LIUREN_OPTIONS } from '../src/liuren.js';
import { resolveMoment, type Moment } from '../src/pillars.js';
import { qizhengBoard, DEFAULT_QIZHENG_OPTIONS } from '../src/qizheng.js';
import { taiyiBoard, DEFAULT_TAIYI_OPTIONS } from '../src/taiyi.js';
import { DEFAULT_OPTIONS, type Place } from '../src/types.js';
import { computeZiwei, DEFAULT_ZIWEI_OPTIONS } from '../src/ziwei/index.js';

/**
 * The six canonical boards — the fascicle the version convention rests on.
 *
 * `docs/architecture.md` § "The version, and the tag that repeats it" asks one
 * question first: **does an address that answered before answer differently
 * now?** That is a question about values and not about code, and no suite here
 * could answer it — each of the others asserts the thing it was written to
 * assert, and a board can change in a place nobody thought to assert. So this
 * one asserts a whole answer: six arts, two inputs apiece, the output entire.
 *
 * **A diff to a file under `canonical/` is the answer, printed rather than
 * judged.** It says the second term of the version moves. A run that changes
 * nothing here changes no existing answer, whatever else it changed.
 *
 * What this is not: a domain sweep. Two boards an art cannot stand for every
 * board that art lays, and the suites beside this one are where a rule is
 * checked over its domain — 太乙 against 864 printed cells, the pillars against
 * two centuries. This is a net under the *answers*, and it catches the change
 * nobody predicted, which is the kind a version has to name.
 *
 * **The second input of each pair is chosen, not arbitrary.** Each sits on the
 * branch its own art turns on and the canonical moment does not reach: the
 * other 遁, the night 貴人, a count that seats both generals in the centre, a
 * birth between New Year and 立春, two bodies retrograde, a birth in an
 * intercalary month. One board apiece would have left every one of those
 * un-netted, and today's 參將 is exactly such a case.
 */

/**
 * Moshier, always, and the fixtures are its answers.
 *
 * The engine runs on Swiss Ephemeris where the `.se1` files are present and on
 * Moshier where they are not, and a fixture pinned to whichever the machine
 * happened to hold would diff on a download. Moshier needs no file and is the
 * one both a fresh clone and this repository can compute, so the fascicle is
 * its answers exactly, at full precision, and the agreement between the two
 * ephemerides is asserted separately below rather than rounded away here.
 */
const NO_EPHEMERIS = '/canonical-boards-no-ephemeris';

let context: EphemerisContext;

beforeAll(() => {
  resetEphemerisCache();
  context = initEphemeris(NO_EPHEMERIS);
  expect(context.mode, 'the fascicle is computed in Moshier mode').toBe('moshier');
});

// The path above is bogus on purpose, and the cache is keyed by it. Left in
// place it would hand the following suite an ephemeris it did not ask for.
afterAll(() => {
  resetEphemerisCache();
});

/** 上海, and the place every canonical board is laid at. */
const PLACE: Place = { latitude: 31.23, longitude: 121.47, timezone: 'Asia/Shanghai' };

/** The instant this repository already casts its examples on. */
const CANONICAL = { date: '1968-03-12', time: '14:30' };

function moment(date: string, time: string): Moment {
  return resolveMoment({ date, time, timezone: PLACE.timezone }, PLACE, DEFAULT_OPTIONS, context);
}

/**
 * The boards, in the order `docs/architecture.md` lists the sections.
 *
 * Each entry is a name a diff can be read by — the file says which of the two
 * boards moved without anybody counting braces.
 */
const FASCICLE: Record<string, () => Record<string, unknown>> = {
  qimen: () => {
    const yang = moment(CANONICAL.date, CANONICAL.time);
    // 大暑, which is 陰遁: the canonical moment is 驚蟄 and 陽遁, and the two
    // halves of the year lay the plates in opposite directions.
    const yin = moment('2026-08-01', '12:00');
    return {
      'the canonical moment, 陽遁': computeQimenChart(yang, yang.options),
      '2026-08-01, 陰遁': computeQimenChart(yin, yin.options),
    };
  },
  liuren: () => {
    const day = moment(CANONICAL.date, CANONICAL.time);
    // The same day at 02:00: the 貴人 sits on its night seat, which turns the
    // twelve generals round the board.
    const night = moment(CANONICAL.date, '02:00');
    const lay = (one: Moment) =>
      liurenBoard(
        { term: one.solarTerm.term, day: one.pillars.day, hour: one.hourBranch },
        DEFAULT_LIUREN_OPTIONS,
      );
    return { 'the canonical moment, 晝': lay(day), '02:00, 夜': lay(night) };
  },
  taiyi: () => ({
    // A year with both generals on the ring, and one with a 客算 of 25, which
    // seats the guest's two in 五宮 — 杜塞, and the case a single board misses.
    '2026': taiyiBoard({ year: 2026 }, DEFAULT_TAIYI_OPTIONS),
    '940, 杜塞': taiyiBoard({ year: 940 }, DEFAULT_TAIYI_OPTIONS),
  }),
  bazi: () => {
    const birth = moment(CANONICAL.date, CANONICAL.time);
    // 20 January 2026 is after New Year and before 立春, so the year pillar is
    // 乙巳 and not 丙午: the boundary every board over this layer inherits.
    const boundary = moment('2026-01-20', '08:00');
    return {
      'the canonical birth': computeBazi(birth, {}, context),
      '2026-01-20, before 立春': computeBazi(boundary, {}, context),
    };
  },
  qizheng: () => {
    const canonical = moment(CANONICAL.date, CANONICAL.time);
    // 金星 and 土星 both 逆行 on this date, which is the one thing on this
    // board a fixture of a single instant is unlikely to carry.
    const retrograde = moment('2026-10-15', '12:00');
    const lay = (one: Moment) =>
      qizhengBoard(
        { julianDay: one.julianDayUT, hour: one.hourBranch },
        DEFAULT_QIZHENG_OPTIONS,
        context,
      );
    return { 'the canonical moment': lay(canonical), '2026-10-15, two 逆行': lay(retrograde) };
  },
  ziwei: () => {
    const birth = moment(CANONICAL.date, CANONICAL.time);
    // 閏二月 of 癸卯: `leapMonth: following` is a declared divergence, and a
    // fascicle that never lands in an intercalary month never exercises it.
    const leap = moment('2023-03-25', '12:00');
    return {
      'the canonical birth': computeZiwei(birth, DEFAULT_ZIWEI_OPTIONS),
      '2023-03-25, 閏二月': computeZiwei(leap, DEFAULT_ZIWEI_OPTIONS),
    };
  },
};

/**
 * What is left out of a fixture, and why it is the only thing left out.
 *
 * `warnings` on a `Moment` says which ephemeris answered, which is a fact about
 * the files the machine holds rather than about the board — and here it would
 * say the same thing in every file, since the fascicle pins the mode. Nothing
 * else is filtered: a fixture that quietly dropped a field would be a net with
 * a hole in exactly the shape of whatever somebody found inconvenient.
 */
function serialise(boards: Record<string, unknown>): string {
  return `${JSON.stringify(boards, (key, value) => (key === 'warnings' ? undefined : value), 2)}\n`;
}

describe('the six canonical boards', () => {
  for (const [art, lay] of Object.entries(FASCICLE)) {
    it(`lays ${art} as the fascicle has it`, async () => {
      await expect(serialise(lay())).toMatchFileSnapshot(`./canonical/${art}.json`);
    });
  }
});

/**
 * The two ephemerides, on the boards the fascicle pins.
 *
 * The fascicle is Moshier's answers, so this is what says the other mode is not
 * a different engine: over every number on every canonical board the two agree
 * to under an arc-second, which is far below anything either the boards or
 * their sources resolve — a solar term moves by under a second of time, and no
 * pillar, palace or lodge turns on that.
 *
 * Skipped where the `.se1` files are absent, which is a clone that has not run
 * `npm run ephe:download`: there is only one mode there and nothing to compare.
 */
describe('the two ephemerides on those boards', () => {
  it('agree to within an arc-second, so the fascicle is not a fact about one', () => {
    resetEphemerisCache();
    const swiss = initEphemeris();
    if (swiss.mode !== 'swisseph') {
      resetEphemerisCache();
      return;
    }

    const withSwiss = laid(swiss);
    resetEphemerisCache();
    const withMoshier = laid(initEphemeris(NO_EPHEMERIS));
    resetEphemerisCache();
    context = initEphemeris(NO_EPHEMERIS);

    // One arc-second, in degrees. Measured rather than chosen: the widest gap
    // on these boards is the Moon's longitude on 2026-10-15, at 1.8e-4 — two
    // thirds of an arc-second — and every other number agrees far closer.
    const bound = 1 / 3600;
    const measured = gaps(withSwiss, withMoshier);
    expect(measured.length, 'the boards carry numbers to compare').toBeGreaterThan(100);
    for (const [path, gap] of measured) {
      expect(gap, path).toBeLessThan(bound);
    }
  });

  function laid(one: EphemerisContext): Record<string, unknown> {
    context = one;
    return Object.fromEntries(Object.entries(FASCICLE).map(([art, lay]) => [art, lay()]));
  }

  /** Every number the two modes answer differently, by the path it sits at. */
  function gaps(swiss: unknown, moshier: unknown, path = ''): [string, number][] {
    if (typeof swiss === 'number' && typeof moshier === 'number') {
      return [[path, Math.abs(swiss - moshier)]];
    }
    if (swiss === null || moshier === null) return [];
    if (typeof swiss !== 'object' || typeof moshier !== 'object') return [];
    const keys = new Set([...Object.keys(swiss), ...Object.keys(moshier)]);
    return [...keys]
      .filter((key) => key !== 'warnings')
      .flatMap((key) =>
        gaps(
          (swiss as Record<string, unknown>)[key],
          (moshier as Record<string, unknown>)[key],
          `${path}.${key}`,
        ),
      );
  }
});
