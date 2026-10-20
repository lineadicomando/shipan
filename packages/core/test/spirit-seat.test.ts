import { describe, expect, it } from 'vitest';
import {
  CHART_PARAMETERS,
  DEFAULT_OPTIONS,
  computeQimenChart,
  initEphemeris,
  resolveMoment,
  type ChartOptions,
  type Place,
  type QimenChart,
} from '../src/index.js';

const context = initEphemeris();
const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
/** Clock time, so that an hour named here is the hour the board is laid on. */
const CLOCK: ChartOptions = { ...DEFAULT_OPTIONS, trueSolarTime: false, dayBoundary: 'midnight' };

function chart(date: string, time: string, options: Partial<ChartOptions> = {}): QimenChart {
  const laid = { ...CLOCK, ...options };
  return computeQimenChart(
    resolveMoment({ date, time, timezone: 'Asia/Shanghai' }, BEIJING, laid, context),
    laid,
  );
}

const spiritsOf = (c: QimenChart) =>
  Object.fromEntries(c.palaces.flatMap((p) => (p.spirit ? [[p.palace.number, p.spirit.id]] : [])));
const seatOf = (c: QimenChart) =>
  c.palaces.find((p) => p.spirit?.id === 'zhifu')?.palace.number as number;
/** Where the instrument stands on the earth plate, lodged out of the centre. */
const restOf = (c: QimenChart) => {
  const at = c.palaces.find((p) => p.earth.id === c.instrument.id)?.palace.number as number;
  return at === 5 ? (c.palaces.find((p) => p.lodged)?.palace.number as number) : at;
};
/** Where the hour's stem stands on the earth plate, lodged the same way. */
const landingOf = (c: QimenChart) => {
  const at = c.palaces.find((p) => p.earth.id === c.hourStem.id)?.palace.number as number;
  return at === 5 ? (c.palaces.find((p) => p.lodged)?.palace.number as number) : at;
};

// Two days of every hour, one in each dun, at clock time in Beijing.
const HOURS = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];
const DAYS = ['2026-01-30', '2026-07-14'];
const BOARDS = DAYS.flatMap((date) => HOURS.map((hour) => ({ date, time: `${hour}:30` })));

/**
 * Where the first spirit is seated. `docs/sources.md` § "《御定奇門大全》
 * 卷四十三–四十八" is where the commentary was read.
 */
describe('spiritSeat — where the ring of the eight starts', () => {
  it('declares both values computed, the heaven plate by default', () => {
    expect(CHART_PARAMETERS.spiritSeat.default).toBe('tianpan');
    expect(CHART_PARAMETERS.spiritSeat.values.map((value) => [value.id, value.implemented])).toEqual([
      ['tianpan', true],
      ['yinshi', true],
    ]);
  });

  it('seats it where the chief lands, at every hour, by default', () => {
    for (const { date, time } of BOARDS) {
      const board = chart(date, time);
      expect(seatOf(board), `${date} ${time}`).toBe(landingOf(board));
    }
  });

  it('seats it from the earth plate at a 己 to 癸 hour under yinshi, and from the heaven plate before', () => {
    let moved = 0;
    for (const { date, time } of BOARDS) {
      const heaven = chart(date, time);
      const board = chart(date, time, { spiritSeat: 'yinshi' });
      const stem = board.moment.pillars.hour.stem;
      // 「如遇甲乙丙丁戊五時為陽者，天盤直符在何宮，即於何宮起直符」: 庚 and 壬
      // count with the yin five, whatever their own polarity.
      const yin = stem.index >= 5;
      const centre = board.palaces.find((p) => p.earth.id === board.hourStem.id)?.palace.number === 5;
      const expected = yin || centre ? restOf(board) : landingOf(board);
      expect(seatOf(board), `${date} ${time}`).toBe(expected);
      if (!yin && !centre) expect(spiritsOf(board)).toEqual(spiritsOf(heaven));
      if (seatOf(board) !== seatOf(heaven)) moved += 1;
    }
    // Not a tautology: the two seats part on these days.
    expect(moved).toBeGreaterThan(0);
  });

  it('moves the spirits and nothing else', () => {
    for (const { date, time } of BOARDS) {
      const heaven = chart(date, time);
      const board = chart(date, time, { spiritSeat: 'yinshi' });
      const rest = (c: QimenChart) =>
        c.palaces.map((p) => [p.earth.id, p.heaven.id, p.star.id, p.gate?.id]);
      expect(rest(board)).toEqual(rest(heaven));
      // The same ring, in the same order: one seat moved, never one name.
      expect(Object.values(spiritsOf(board)).sort()).toEqual(Object.values(spiritsOf(heaven)).sort());
    }
  });

  it('says which it stands on', () => {
    expect(chart('2026-01-30', '02:30', { spiritSeat: 'yinshi' }).options.spiritSeat).toBe('yinshi');
    expect(chart('2026-01-30', '02:30').options.spiritSeat).toBe('tianpan');
  });
});
