import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { LOCALES } from '@shipan/i18n';
import { run } from '../src/cli.js';

/**
 * No dash stands next to a glyph in anything this engine prints.
 *
 * **The rule exists and this is the half of it nothing was checking.** 一 is
 * `yī`, one, a single horizontal stroke, and it is a character this engine
 * prints — 知一 is one of the nine rules that draw the transmissions of 六壬.
 * Beside hanzi a dash is read as one of them, so `catalogs.test.ts` in
 * `packages/i18n` forbids one within eight characters of a glyph in any
 * message.
 *
 * That test can only see the catalogs. What a reader and a model are handed is
 * a *transcript*, assembled here out of catalog strings, engine data and
 * separators written into `format.ts` — and the separators are exactly what
 * the other test cannot reach. Three of them had a dash against a glyph: a
 * 太乙 god and its seat, the month general and its term, and a sentence of
 * 卷三 beside its translation. None was in a catalog and none could have been
 * caught there.
 *
 * **The board is walked rather than the source read**, because what matters is
 * what comes out. A separator that is fine in the file and lands against a
 * name after padding is a separator this notices and a grep does not.
 *
 * **A dash between digits is an interval and stays one.** `113–122` is the
 * span of a decade in 紫微斗數 and the en dash is the right mark for it; the
 * hanzi that make this look like a hit are in the column before, put there by
 * the table's own padding. Reading order is what decides, and between two
 * numbers there is nothing to misread.
 */
let out: string;
let write: typeof process.stdout.write;

beforeEach(() => {
  out = '';
  write = process.stdout.write.bind(process.stdout);
  process.stdout.write = ((chunk: string) => {
    out += chunk;
    return true;
  }) as typeof process.stdout.write;
});

afterEach(() => {
  process.stdout.write = write;
});

/** Fixed input, so that nothing here depends on the day it runs. */
const MOMENT = [
  '--date', '2024-06-15',
  '--time', '14:00',
  '--tz', 'Asia/Shanghai',
  '--lon', '116.4',
  '--no-true-solar',
];

const BIRTH = ['--born', '1984-03-11', '--born-time', '09:00', '--born-tz', 'Europe/Rome'];

/**
 * Every command, and the almanac with them.
 *
 * `qimen` earns its place twice: the terminal is the only surface that prints
 * `formatAlmanac`, which the HTTP transcript leaves out — so the year's pillar
 * standing against a dash was a line no endpoint would ever have shown, and a
 * check that walked the web alone would have missed it.
 */
const BOARDS: readonly (readonly string[])[] = [
  ['qimen', ...MOMENT],
  ['liuren', ...MOMENT],
  ['taiyi', '--year', '2024'],
  ['bazi', ...MOMENT, ...BIRTH],
  ['ziwei', ...MOMENT, ...BIRTH, '--gender', 'female'],
  ['qizheng', ...MOMENT, ...BIRTH],
  ['terms', '--year', '2024'],
  ['calendar', ...MOMENT],
  ['scan', ...MOMENT, '--until', '2024-06-17'],
];

const HANZI = /[㐀-鿿]/;

/** Where a dash stands with a glyph close enough to be read as one. */
function against(printed: string): string[] {
  const found: string[] = [];
  for (const dash of printed.matchAll(/[—–]/g)) {
    const at = dash.index;
    const between = /\d/.test(printed.slice(at - 1, at)) && /\d/.test(printed.slice(at + 1, at + 2));
    if (between) continue;
    const window = printed.slice(Math.max(0, at - 8), at + 9);
    if (HANZI.test(window)) found.push(window.replaceAll('\n', '⏎'));
  }
  return found;
}

describe('what the engine prints', () => {
  for (const locale of LOCALES) {
    for (const board of BOARDS) {
      it(`keeps a dash off a glyph: ${board[0]} in ${locale}`, async () => {
        await run([...board, '--lang', locale]);
        expect(out.length, `${board[0]} printed nothing`).toBeGreaterThan(0);
        expect(against(out), `${locale} · ${board[0]}`).toEqual([]);
      });
    }
  }

  it('is looking at something, and lets an interval alone', () => {
    // The guard against a test that passes because it found no dashes at all,
    // and the one case the window is wrong about, kept where it can be read.
    expect(against('休門 — xiūmén')).toHaveLength(1);
    expect(against('喜神   113–122')).toEqual([]);
  });
});
