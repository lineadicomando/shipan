import { createTranslator } from '@shipan/i18n';
import { beforeAll, describe, expect, it } from 'vitest';
import { computeQimenChart } from '../src/dunjia/index.js';
import { computeZiwei, DEFAULT_ZIWEI_OPTIONS } from '../src/ziwei/index.js';
import { initEphemeris, type EphemerisContext } from '../src/ephemeris.js';
import { liurenBoard, DEFAULT_LIUREN_OPTIONS } from '../src/liuren.js';
import { resolveMoment, type Moment } from '../src/pillars.js';
import { chartTranscript, liurenTranscript, ziweiTranscript } from '../src/prompt.js';
import { divergencesInForce, PARAMETERS } from '../src/parameters.js';
import { DEFAULT_OPTIONS, type ChartOptions, type Place } from '../src/types.js';

/**
 * Which school laid the board, said with the board.
 *
 * `docs/parameters.md` § "A declared default is not a hidden school" is the
 * rule and this is where it bites: a board handed over without this reads as
 * *the* board of its instant, and the reader who moved nothing is exactly the
 * one who does not know a choice was made for them. So what is asserted here
 * is that the default is in the block, not merely that a moved value is.
 *
 * The wording is not asserted — that is a catalog and it moves. What is
 * asserted is which divergences the block holds, which is derived from
 * `parameters.ts` and must not be derivable from anything else.
 */
let context: EphemerisContext;

beforeAll(() => {
  context = initEphemeris();
});

const BEIJING: Place = { latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai' };
const t = createTranslator('en');

function moment(options: ChartOptions = DEFAULT_OPTIONS): Moment {
  return resolveMoment(
    { date: '2024-06-15', time: '14:00', timezone: 'Asia/Shanghai' },
    BEIJING,
    options,
    context,
  );
}

/** The label of a parameter, as the block prints it. */
const label = (board: string, id: string): string => {
  const parameter = PARAMETERS.find((row) => row.board === board && row.id === id);
  return t(parameter?.label ?? 'cli.heading.moment');
};

describe('the divergences in force', () => {
  it('are the ones the engine computes more than one value of', () => {
    for (const board of ['qimen', 'liuren', 'qizheng', 'ziwei', 'bazi']) {
      for (const { parameter } of divergencesInForce(board, DEFAULT_OPTIONS)) {
        expect(parameter.values.filter((value) => value.implemented).length).toBeGreaterThan(1);
        expect(['pillars', board]).toContain(parameter.board);
      }
    }
  });

  it('leave out a divergence declared and refused', () => {
    // `plate`, `centreLodging` and `system` are dunjia's and each has one
    // value the engine computes. What would be reported is not a school but
    // the absence of a second one.
    const named = divergencesInForce('qimen', DEFAULT_OPTIONS).map((row) => row.parameter.id);

    expect(named).toContain('method');
    expect(named).not.toContain('plate');
    expect(named).not.toContain('centreLodging');
    expect(named).not.toContain('system');
  });

  it('leave out the yuan where the method has already decided it', () => {
    const chaibu = divergencesInForce('qimen', DEFAULT_OPTIONS).map((row) => row.parameter.id);
    const zhirun = divergencesInForce('qimen', { ...DEFAULT_OPTIONS, method: 'zhirun' }).map(
      (row) => row.parameter.id,
    );

    expect(chaibu).toContain('yuan');
    expect(zhirun).not.toContain('yuan');
  });

  it('carry no other board\'s parameters, only its own and the layers\'', () => {
    const named = divergencesInForce('liuren', DEFAULT_LIUREN_OPTIONS).map(
      (row) => `${row.parameter.board}.${row.parameter.id}`,
    );

    expect(named).toEqual(['pillars.yearBoundary', 'pillars.dayBoundary', 'liuren.guiren']);
  });
});

describe('a transcript says which school laid the board', () => {
  it('names the default nobody moved', () => {
    const at = moment();
    const chart = computeQimenChart(at, DEFAULT_OPTIONS, context);
    const said = chartTranscript(at, chart, t);

    expect(said).toContain(t('cli.heading.divergences'));
    expect(said).toContain(label('qimen', 'method'));
    expect(said).toContain(t('form.qimen.method.chaibu'));
    expect(said).toContain(label('pillars', 'dayBoundary'));
  });

  it('names the value a reader moved', () => {
    const options: ChartOptions = { ...DEFAULT_OPTIONS, method: 'zhirun' };
    const at = moment(options);
    const said = chartTranscript(at, computeQimenChart(at, options, context), t);

    expect(said).toContain(t('form.qimen.method.zhirun'));
    expect(said).not.toContain(t('form.qimen.method.chaibu'));
  });

  it('says it on a board that is not dunjia\'s', () => {
    const at = moment();
    const board = liurenBoard(
      { term: at.solarTerm.term, day: at.pillars.day, hour: at.pillars.hour.branch },
      { ...DEFAULT_LIUREN_OPTIONS, guiren: 'wei' },
    );
    const said = liurenTranscript(at, board, t);

    expect(said).toContain(label('liuren', 'guiren'));
    expect(said).toContain(t('form.liuren.guiren.wei'));
  });

  it('reads each year out of the bag it belongs to', () => {
    // The two cannot be merged into one record: 紫微斗數 carries a
    // `yearBoundary` of its own, and under a spread the board's would answer
    // for the pillars' — which printed 正月初一 under «the year of the
    // pillars» on a board whose pillars turn at 立春.
    const named = divergencesInForce('ziwei', DEFAULT_ZIWEI_OPTIONS, DEFAULT_OPTIONS);
    const cutting = named.filter((row) => row.parameter.id === 'yearBoundary');

    expect(cutting).toHaveLength(2);
    expect(cutting.map((row) => `${row.parameter.board}:${String(row.value.id)}`)).toEqual([
      'pillars:lichun',
      'ziwei:chunjie',
    ]);
  });

  it('tells the two years apart on a board that cuts its own', () => {
    // The collision the naming rule exists for, printed: 紫微斗數 cuts its year
    // at 正月初一 and the pillars beside it at 立春, and a block that named
    // one «the year» would be describing two answers with one word.
    const at = moment();
    const said = ziweiTranscript(at, computeZiwei(at, DEFAULT_ZIWEI_OPTIONS), t);

    expect(said).toContain(label('pillars', 'yearBoundary'));
    expect(said).toContain(label('ziwei', 'yearBoundary'));
    expect(label('pillars', 'yearBoundary')).not.toBe(label('ziwei', 'yearBoundary'));
  });
});
