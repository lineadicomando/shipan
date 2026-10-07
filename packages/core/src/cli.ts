#!/usr/bin/env node
/**
 * `shipan` — the engine on the command line.
 *
 * The cheapest surface there is, and the first one built: it exercises every
 * calculation before an API or an interface exists to get in the way. It is
 * also a real surface, so it obeys the same rules as the others — it resolves
 * a locale, it translates by code, and it never interprets.
 */
import { realpathSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import {
  DEFAULT_LOCALE,
  createTranslator,
  resolveLocale,
  translate,
  type Locale,
  type MessageKey,
  type MessageParams,
} from '@shipan/i18n';
import { computeBazi, type Gender } from './bazi/index.js';
import { computeDayChart } from './dunjia/rijia.js';
import {
  GATES,
  PATTERN_IDS,
  SPIRIT_IDS,
  STARS,
  computeQimenChart,
  type Direction,
  type QimenChart,
  type GateId,
  type PatternId,
  type SpiritId,
  type StarId,
  type StrengthId,
} from './dunjia/index.js';
import { initEphemeris, type EphemerisContext } from './ephemeris.js';
import { ChartError } from './errors.js';
import { PARAMETERS, implementedValues, type ParameterEntry } from './parameters.js';
import { STEMS, type StemId } from './ganzhi.js';
import {
  formatBazi,
  formatAlmanac,
  formatMoment,
  formatLiuren,
  formatQizheng,
  formatNianming,
  formatZiwei,
  formatScan,
  formatSolarTerms,
  formatTaiyi,
  formatWarnings,
} from './format.js';
import { lunarDate } from './lunar.js';
import {
  DEFAULT_LIUREN_OPTIONS,
  liurenBoard,
} from './liuren.js';
import {
  DEFAULT_QIZHENG_OPTIONS,
  qizhengBoard,
} from './qizheng.js';
import { nianmingOf, yearsLived, type Nianming, type NianmingOptions } from './nianming.js';
import { DEFAULT_ZIWEI_OPTIONS, computeZiwei } from './ziwei/index.js';
import { resolveMoment, type Moment } from './pillars.js';
import {
  baziReadingPrompt,
  chartTranscript,
  dayTranscript,
  liurenReadingPrompt,
  qizhengReadingPrompt,
  readingPrompt,
  ziweiReadingPrompt,
  taiyiReadingPrompt,
} from './prompt.js';
import { PURPOSES, purposeCriteria, type PurposeId } from './purposes.js';
import { matchRuns, scanCharts, type ScanCriteria } from './scan.js';
import { solarTermsOfYear } from './solar-terms.js';
import {
  DEFAULT_TAIYI_OPTIONS,
  taiyiBoard,
  taiyiYearAt,
} from './taiyi.js';
import {
  currentMoment,
  fromJulianDay,
  resolveTime,
  systemTimezone,
  zoneMeridian,
  type LocalMoment,
} from './time.js';
import { DEFAULT_OPTIONS, type ChartOptions, type Place } from './types.js';

/**
 * A mistake in how the command was called.
 *
 * It carries a catalog key and its params rather than a sentence, exactly as
 * `ChartError` does: `run` renders it in the locale it resolved and stops.
 * `message` is the English rendering, for tests and for whatever logs a
 * throw. Anything else thrown out of `execute` is a fault in the engine, and
 * a fault deserves its stack trace.
 */
class UsageError extends Error {
  readonly messageKey: MessageKey;
  readonly params: MessageParams;

  constructor(messageKey: MessageKey, params: MessageParams = {}) {
    super(translate(DEFAULT_LOCALE, messageKey, params));
    this.name = 'UsageError';
    this.messageKey = messageKey;
    this.params = params;
  }
}

const COMMANDS = [
  'qimen',
  'liuren',
  'qizheng',
  'taiyi',
  'bazi',
  'ziwei',
  'terms',
  'calendar',
  'scan',
] as const;
type Command = (typeof COMMANDS)[number];

interface Options {
  date?: string;
  time?: string;
  timezone?: string;
  latitude?: string;
  longitude?: string;
  year?: string;
  gender?: string;
  lang?: string;
  json: boolean;
  help: boolean;
  prompt: boolean;
  ask?: string;
  /**
   * The matter a 太乙 board is read for — a field of view, never a question.
   *
   * Its own flag rather than a second meaning for `--ask`, because the whole
   * of this board's admission to a prompt rests on the two being different
   * things: a question asks what will happen and puts the person asking inside
   * a figure they are not in; a matter names what is being looked at and is
   * what the assignment of 主 and 客 has to be made for. Folding them would
   * put one word on the distinction the design stands on.
   */
  about?: string;
  trueSolar?: boolean;
  /**
   * Every school option asked for, by the flag it was asked with.
   *
   * One bag and not a field a parameter: which flags exist is read off the
   * engine's declaration — `DECLARED_FLAGS` — so a divergence landing in
   * `parameters.ts` can be asked for here the same day and nothing in this
   * file learns its name.
   */
  declared: Record<string, string>;
  until?: string;
  gate?: string;
  star?: string;
  spirit?: string;
  stem?: string;
  towards?: string;
  minStrength?: string;
  without?: string;
  for?: string;
  born?: string;
  bornTime?: string;
  bornTz?: string;
}

/** camelCase to the words of a flag: `centreLodging` is `centre-lodging`. */
const kebab = (id: string): string => id.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/** The names a layer's parameters carry, which a board's may not share bare. */
const LAYER_IDS = new Set(
  PARAMETERS.filter((parameter) => parameter.board === 'pillars').map((parameter) => parameter.id),
);

/**
 * The flag a declared parameter is asked for by.
 *
 * `docs/parameters.md` § "A board's parameters travel under the board's name"
 * is the whole rule: a command lays one board, so a board's parameter is bare
 * — `--guiren`, `--centre-lodging` — and a layer's is bare because it is under
 * all of them. The one a board shares a name with a layer's takes its board's
 * name, since the layer is under that board while it is being laid:
 * `--ziwei-year-boundary`.
 *
 * One name is not derived. 年命's `count` is asked for as `--years`, after
 * what it counts: a `--count` beside `--born` would say nothing of whose.
 */
export function flagOf(parameter: ParameterEntry): string {
  if (parameter.board === 'nianming' && parameter.id === 'count') return '--years';
  const bare = kebab(parameter.id);
  return parameter.board !== 'pillars' && LAYER_IDS.has(parameter.id)
    ? `--${parameter.board}-${bare}`
    : `--${bare}`;
}

/**
 * Every school option the command line can be asked for, off the declaration.
 *
 * All of them, the ones with a single computed value included: a flag asking
 * for a value the engine declares and refuses is answered with that refusal by
 * name, which is the true statement about it, where no flag at all would leave
 * a caller unable to find out the value exists. `trueSolarTime` is the one
 * parameter with no entry: it is a boolean, and `--true-solar` and
 * `--no-true-solar` are its two words.
 */
export const DECLARED_FLAGS: ReadonlyMap<string, ParameterEntry> = new Map(
  PARAMETERS.filter((parameter) =>
    parameter.values.every((value) => typeof value.id === 'string'),
  ).map((parameter) => [flagOf(parameter), parameter]),
);

/** The boards a command reads options for, beside the layers under all of them. */
const COMMAND_BOARDS: Partial<Record<Command, readonly string[]>> = {
  qimen: ['nianming'],
  liuren: ['liuren'],
  qizheng: ['qizheng'],
  taiyi: ['taiyi'],
  ziwei: ['ziwei'],
  bazi: ['bazi'],
};

/**
 * Refuses a school option the command in hand does not lay.
 *
 * `--guiren` beside `qimen` used to be dropped in silence, and a board that
 * ignores what it was asked for looks exactly like one that honoured it. The
 * chart's own options and the layers' are read by every command, as they were.
 */
function refuseStrays(command: Command, options: Options): void {
  const read = ['pillars', 'qimen', 'almanac', ...(COMMAND_BOARDS[command] ?? [])];
  for (const flag of Object.keys(options.declared)) {
    const parameter = DECLARED_FLAGS.get(flag) as ParameterEntry;
    if (!read.includes(parameter.board)) {
      throw new UsageError('cli.error.optionNotRead', { option: flag, command });
    }
  }
}

/**
 * Sets on a board's options every declared value asked for on the command line.
 *
 * Strict about the value: nothing in a printed board says which reading of a
 * divergence was meant, so a misspelling that fell back to the default would
 * move the board with no visible symptom. A value the engine declares and does
 * not compute passes here and is refused by the engine, by name.
 */
function declared<O extends object>(boards: readonly string[], target: O, options: Options): O {
  for (const [flag, parameter] of DECLARED_FLAGS) {
    const value = options.declared[flag];
    if (value === undefined || !boards.includes(parameter.board)) continue;
    if (!parameter.values.some((candidate) => candidate.id === value)) {
      throw new UsageError('cli.error.unknownValue', { option: flag, value });
    }
    (target as Record<string, unknown>)[parameter.id] = value;
  }
  return target;
}

/** A sentence set under its flag, at the measure the rest of the help keeps. */
function folded(sentence: string): string[] {
  const margin = ' '.repeat(25);
  const lines: string[] = [];
  let line = '';
  for (const word of sentence.split(' ')) {
    if (line && line.length + 1 + word.length > 54) {
      lines.push(margin + line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(margin + line);
  return lines;
}

/**
 * The lines of the help that name the school options, off the same declaration.
 *
 * After each flag, what the engine **computes** — a flag offering 飛盤 would be
 * offering an error — and under it the gloss the notes page prints for that
 * parameter, the default, and the values declared and refused, so that a
 * reader weighing a school knows the others exist.
 */
function declaredHelp(): string {
  const lines: string[] = [];
  for (const [flag, parameter] of DECLARED_FLAGS) {
    const computed = implementedValues(parameter).map(String);
    const refused = parameter.values
      .filter((value) => !value.implemented)
      .map((value) => String(value.id));
    const whose =
      parameter.board === 'pillars' || parameter.board === 'almanac'
        ? 'every board'
        : `\`${parameter.board === 'nianming' ? 'qimen --born' : parameter.board}\``;
    const gloss = translate('en', `notes.parameter.${parameter.id}` as MessageKey);
    lines.push(`  ${flag} ${computed.join('|')}`);
    lines.push(...folded(`for ${whose}: ${gloss} Default: ${String(parameter.default)}`));
    if (refused.length > 0) {
      lines.push(...folded(`declared and refused: ${refused.join(', ')}`));
    }
  }
  return lines.join('\n');
}

export const HELP = `shipan 式盤 — the boards, on the command line

Usage
  shipan qimen     [options]     the 奇門遁甲 nine palaces for a moment
  shipan liuren    [options]     the 大六壬 board for a moment
  shipan qizheng   [options]     the 七政四餘 board for a moment
  shipan taiyi     [--year N]    the 太乙 board of a year — 歲計
  shipan bazi      [options]     the four pillars, read out
  shipan ziwei     [options]     the 紫微斗數 board for a birth
  shipan terms     [options]     the twenty-four solar terms of a year
  shipan calendar  [options]     the lunar date of a moment
  shipan scan      [options]     every 奇門 chart between two moments

Options
  --date YYYY-MM-DD      default: today
  --time HH:mm[:ss]      default: now
  --tz  IANA-zone        default: the system zone
  --lat, --lon degrees   default: the meridian the zone is named for
  --year N               for \`terms\` and \`taiyi\`; default: the year of
                         --date. Under \`taiyi\` that year is the whole input:
                         the board is a function of a year and takes no place
                         and no hour
  --gender male|female   for \`bazi\`, where the luck cycles need it, for
                         \`ziwei\`, where the limits and the two rings do, and
                         for the 行年 of \`qimen --born\`. In all three it is
                         read for the traditional rule and for nothing else

Narrowing a scan
  --until YYYY-MM-DD     the end of the interval; --date opens it
  --for opening|meeting|wealth|documents|concealment|pursuit|ending|dispute
                         the errand, which stands for a gate and says which
  --gate, --star, --spirit, --stem   by identifier, e.g. kaimen, tianxin
  --towards n,ne,e,se,s,sw,w,nw      one or more; the centre faces none
  --min-strength wang|xiang|xiu|qiu|si   the weakest state admitted
  --without id,id        configurations that rule a palace out, e.g. kongwang
  --born YYYY-MM-DD      only the palaces the 本命 stands on — the year pillar
                         of that birth, on either plate. The other criteria
                         say what makes a palace worth standing in; this one
                         says which palaces are the person's
  --true-solar, --no-true-solar   default: on
${declaredHelp()}
  --lang en|it           default: the environment, then English
  --json                 the data, unformatted and untranslated. Not with
                         --ask or --about: there is nowhere in it for a
                         question or a matter to be printed, and one handed
                         to it was silently thrown away
  --help

Handing a board to a model
  --prompt               for any of the six boards: it wrapped in the
                         instructions for reading it, to paste into an
                         assistant that has no connection to this engine
  --ask "…"              the question it is to be read for; implies --prompt.
                         Without one the prompt says none was asked, which is
                         not the same as choosing a 用神 on nobody's behalf.
                         For \`qimen\` and \`liuren\` only: \`bazi\`,
                         \`qizheng\` and \`ziwei\` are laid on a birth,
                         \`taiyi\` on a year, all four are asked nothing, and
                         they refuse it rather than dropping it
  --about "…"            for \`taiyi\` only: the matter the year is read for,
                         and **not** a question — a field of view with two
                         parties in it, which is what tells a reader which side
                         is 主 and which is 客. Implies --prompt, and every
                         other command refuses it rather than dropping it.
                         Without one the prompt reads the figure and says the
                         assignment was never made
  --born, with --prompt  the 年命 travels inside the prompt with the chart,
                         and the prompt says what it is not: not a chart of a
                         birth, and no palace standing for a part of a life

Placing a birth in the chart (年命)
  --born YYYY-MM-DD      for \`qimen\`: look the birth up inside the chart —
                         本命, the year pillar of the birth, and with --gender
                         also 行年, the year being lived. The chart stays the
                         chart of its own moment: this is the classical
                         direction, and it is not a chart of a birth
  --born-time HH:mm      default: 12:00. It bears on nothing but a birth
                         within hours of 立春, where it decides the year
  --born-tz IANA-zone    default: the chart's zone, for the same reason

A note on what this prints
  The engine reports arrangements — which gate stands over which palace, how
  a stem stands to the day master. What they mean belongs to whoever reads
  them, and nothing here will tell you. A scan is the same: it answers the
  question you asked it, and calls no hour good.
`;

export async function run(argv: string[]): Promise<number> {
  // The locale is read off the raw arguments, before anything can fail: a
  // command too malformed to parse is still refused in the language it asked
  // for. A `--lang` token can only be the flag itself, since a flag's value
  // is refused when it starts with `--`.
  const flag = argv.lastIndexOf('--lang');
  const locale = resolveLocale(
    flag >= 0 ? argv[flag + 1] : undefined,
    process.env['LC_ALL'],
    process.env['LANG'],
  );
  const t = createTranslator(locale);

  let command: Command | undefined;
  let options: Options;

  try {
    ({ command, options } = parse(argv));
  } catch (error) {
    if (error instanceof UsageError) {
      process.stderr.write(`${t(error.messageKey, error.params)}\n`);
      return 2;
    }
    throw error;
  }

  if (options.help || !command) {
    process.stdout.write(HELP);
    return command ? 0 : options.help ? 0 : 2;
  }

  try {
    refuseStrays(command, options);
    process.stdout.write(`${await execute(command, options, locale)}\n`);
    return 0;
  } catch (error) {
    if (error instanceof ChartError) {
      process.stderr.write(`${t(error.messageKey, error.params)}\n`);
      return 1;
    }
    if (error instanceof UsageError) {
      process.stderr.write(`${t(error.messageKey, error.params)}\n`);
      return 2;
    }
    throw error;
  }
}

async function execute(command: Command, options: Options, locale: Locale): Promise<string> {
  const t = createTranslator(locale);
  // Before the ephemeris is opened and before any board is laid: what a
  // command does not carry it refuses, and it refuses it whatever the output
  // was going to be. See `refuseUncarried`.
  refuseUncarried(command, options);
  const context = initEphemeris();
  const timezone = options.timezone ?? systemTimezone();
  const now = currentMoment(timezone);

  const input = {
    date: options.date ?? now.date,
    time: options.time ?? now.time,
    timezone,
  };

  if (command === 'terms') {
    // Strict, like --method and --day-boundary: `Number` alone would read a mistyped
    // year as NaN and hand it to the calendar, which answers with a stack
    // trace addressed to nobody.
    if (options.year !== undefined && !/^-?\d+$/.test(options.year)) {
      throw new UsageError('cli.error.numberRequired', { option: '--year', value: options.year });
    }
    // The year of the resolved date, never a slice of the string: an ISO year
    // runs to six digits and a sign either side of our era, and `-000044`
    // sliced to four characters reads as the year zero.
    const year =
      options.year !== undefined
        ? Number(options.year)
        : fromJulianDay(resolveTime(input).time.julianDayUT, timezone).year;
    const terms = solarTermsOfYear(year, timezone, context);
    if (options.json) {
      return JSON.stringify({ year, timezone, terms }, null, 2);
    }
    return formatSolarTerms(terms, year, timezone, t);
  }

  if (command === 'taiyi') {
    // Beside `terms`, and for the same reason: this board is a function of a
    // year and of nothing else. No place is resolved, no hour is read, and
    // nobody's date of birth can enter it — which is what makes the section
    // that shows it the one page here that can be cached in public.
    if (options.year !== undefined && !/^-?\d+$/.test(options.year)) {
      throw new UsageError('cli.error.numberRequired', { option: '--year', value: options.year });
    }
    const taiyiOptions = declared(['taiyi'], { ...DEFAULT_TAIYI_OPTIONS }, options);
    // Without `--year` the board is the one being stood in, which is a
    // question about where the year was cut — so 立春 answers it rather than
    // the calendar. Asked of the sky and not of a resolved moment: a moment
    // brings a place, an hour and four pillars, and this board takes none of
    // them. See `taiyiYearAt`, which is what every surface here answers «now»
    // with.
    const year =
      options.year !== undefined
        ? Number(options.year)
        : taiyiYearAt(resolveTime(input).time.julianDayUT, taiyiOptions, context);
    const board = taiyiBoard({ year }, taiyiOptions);
    if (options.json) return JSON.stringify(board, null, 2);
    // `--about` implies `--prompt`, as `--ask` does on the two boards of 卜 and
    // for the same reason: a matter named is a matter meant to be read for, and
    // a flag that printed a bare transcript with it would be a flag that did
    // nothing. It cannot be lost to the line above either — a matter and
    // `--json` are refused together, before anything is cast.
    if (options.prompt || options.about !== undefined) {
      return taiyiReadingPrompt(board, t, {
        ...(options.about !== undefined ? { matter: options.about } : {}),
      });
    }
    return formatTaiyi(board, t);
  }

  const place = resolvePlace(options, input);
  const chartOptions = resolveOptions(options);
  const moment = resolveMoment(input, place, chartOptions, context);

  if (command === 'scan') {
    if (!options.until) throw new UsageError('cli.error.missingValue', { option: '--until' });

    // `--date 2026-09-01 --until 2026-09-03` names two days and means all of
    // them: the interval closes where the day after `--until` opens, so the
    // named day is scanned whole. Falling back to the present hour, as a
    // single chart does, would open the interval wherever the command
    // happened to be typed.
    const opens = { ...input, time: options.time ?? '00:00' };
    const closes = { ...opens, time: '00:00', date: dayAfter(options.until) };
    const runs = scanCharts(opens, closes, place, chartOptions, context);
    const criteria = resolveCriteria(options);
    // 本命 as a criterion like the others, which is what 《遁甲演義》 asks a
    // scan for: the hours in which the person's own year stands somewhere
    // worth standing. It narrows the palaces; what makes one worth standing
    // in is the rest of the criteria, set by whoever is asking.
    if (options.born) {
      criteria.benming = birthMoment(options, chartOptions, context).pillars.year;
    }
    const matches = matchRuns(runs, criteria);

    if (options.json) return JSON.stringify({ criteria, matches, options: chartOptions }, null, 2);
    return [
      `${t('cli.heading.scan', { from: input.date, to: options.until })}`,
      // What an errand expanded into, said out loud. A shorthand that worked
      // silently would leave the reader unable to check it or to vary it.
      expansionOf(options, t),
      '',
      formatScan(matches, t, chartOptions),
      warningsOf(moment, t),
    ]
      .filter((part) => part !== '')
      .join('\n');
  }

  if (command === 'calendar') {
    const date = lunarDate(moment.julianDayUT, context);
    if (options.json) return JSON.stringify({ moment, lunar: date }, null, 2);
    return [
      formatMoment(moment, t),
      '',
      `${t('cli.heading.calendar')}`,
      `  ${date.year} · ${date.leap ? `${t('cli.value.leapMonth')} ` : ''}${date.month}/${date.day}`,
      warningsOf(moment, t),
    ].join('\n');
  }

  if (command === 'bazi') {
    const gender = options.gender as Gender | undefined;
    if (gender && gender !== 'male' && gender !== 'female') {
      throw new UsageError('cli.error.unknownValue', { option: '--gender', value: gender });
    }
    const bazi = computeBazi(
      moment,
      declared(['bazi'], gender ? { gender } : {}, options),
      context,
    );
    if (options.json) return JSON.stringify({ moment, bazi }, null, 2);

    // Unlike `qimen` and `liuren`, `--ask` does not imply `--prompt` here: it
    // was refused before anything was cast. See `refuseUncarried`.
    if (options.prompt) return baziReadingPrompt(moment, bazi, t);

    return [
      // The one command that prints pillars and leaves the almanac's line out.
      // It printed it until now by the default of `formatMoment` rather than
      // by a decision, and the decision goes the other way: this is the moment
      // read as a person, and 曆注 weighs a day as the occasion of an
      // undertaking. See `formatMoment` for the three reasons and
      // `docs/history/` phase 15. The JSON above still carries it,
      // because a caller who
      // wants the layer for this instant is asking, not being shown.
      formatMoment(moment, t, {
        almanac: false,
        divergences: { board: 'bazi', options: bazi.options },
      }),
      '',
      formatBazi(bazi, t),
      gender ? '' : `\n  ${t('cli.error.genderRequired')}`,
      warningsOf(moment, t),
    ].join('\n');
  }

  if (command === 'liuren') {
    const board = liurenBoard(
      {
        term: moment.solarTerm.term,
        day: moment.pillars.day,
        hour: moment.hourBranch,
      },
      declared(['liuren'], { ...DEFAULT_LIUREN_OPTIONS }, options),
    );
    if (options.json) return JSON.stringify({ moment, liuren: board }, null, 2);

    // As for the chart: a question asked is a question meant to be carried,
    // so `--ask` turns the plain printing into the prompt by itself.
    if (options.prompt || options.ask !== undefined) {
      return liurenReadingPrompt(moment, board, t, {
        ...(options.ask !== undefined ? { question: options.ask } : {}),
      });
    }

    const parts = [
      formatMoment(moment, t, { divergences: { board: 'liuren', options: board.options } }),
      '',
      formatLiuren(board, t),
    ];
    const warnings = warningsOf(moment, t);
    if (warnings !== '') parts.push(warnings);
    return parts.join('\n');
  }

  if (command === 'ziwei') {
    const gender = options.gender as Gender | undefined;
    if (gender && gender !== 'male' && gender !== 'female') {
      throw new UsageError('cli.error.unknownValue', { option: '--gender', value: gender });
    }
    const board = computeZiwei(
      moment,
      declared(['ziwei'], { ...DEFAULT_ZIWEI_OPTIONS, ...(gender ? { gender } : {}) }, options),
    );
    if (options.json) return JSON.stringify({ moment, ziwei: board }, null, 2);

    if (options.prompt) return ziweiReadingPrompt(moment, board, t);

    // The almanac's line is left out for the reason `bazi` leaves it out: this
    // is the moment read as a person, and 曆注 weighs a day as the occasion of
    // an undertaking.
    const parts = [
      formatMoment(moment, t, {
        almanac: false,
        divergences: { board: 'ziwei', options: board.options },
      }),
      '',
      formatZiwei(board, t),
    ];
    const warnings = warningsOf(moment, t);
    if (warnings !== '') parts.push(warnings);
    return parts.join('\n');
  }

  if (command === 'qizheng') {
    // The one board here that asks the sky rather than a cycle, so the
    // ephemeris goes in where the other two take pillars.
    const board = qizhengBoard(
      { julianDay: moment.julianDayUT, hour: moment.hourBranch },
      declared(['qizheng'], { ...DEFAULT_QIZHENG_OPTIONS }, options),
      context,
    );
    if (options.json) return JSON.stringify({ moment, qizheng: board }, null, 2);

    if (options.prompt) return qizhengReadingPrompt(moment, board, t);

    const parts = [
      formatMoment(moment, t, { divergences: { board: 'qizheng', options: board.options } }),
      '',
      formatQizheng(board, t),
    ];
    const warnings = warningsOf(moment, t);
    if (warnings !== '') parts.push(warnings);
    return parts.join('\n');
  }

  // A family is a board of its own. The day's is laid and printed; a birth, a
  // question and a prompt are the hour board's, whose function refuses the
  // family by name when one of them is asked of it.
  if (
    chartOptions.system === 'rijia' &&
    !options.born &&
    !options.prompt &&
    options.ask === undefined
  ) {
    const day = computeDayChart(moment, chartOptions);
    if (options.json) return JSON.stringify(day, null, 2);
    return [dayTranscript(moment, day, t), '', formatAlmanac(moment.almanac, t)].join('\n');
  }

  const chart = computeQimenChart(moment, chartOptions);
  // The birth is looked up inside the chart, which does not move: 年命 is the
  // classical direction, and the chart stays the chart of its own moment.
  const nianming = options.born
    ? placeBirth(options, chart, chartOptions, context)
    : undefined;
  if (options.json) {
    return JSON.stringify(nianming ? { ...chart, nianming } : chart, null, 2);
  }

  // A question asked is a question meant to be carried, so it turns the plain
  // printing into the prompt by itself: `--ask` without `--prompt` that
  // printed a chart and dropped the question would be a flag that did nothing.
  if (options.prompt || options.ask !== undefined) {
    return readingPrompt(moment, chart, t, {
      ...(options.ask !== undefined ? { question: options.ask } : {}),
      // A 年命 travels inside the prompt's fence when one was asked for: it
      // is part of the chart that was laid, not a remark about it.
      ...(nianming ? { nianming } : {}),
    });
  }
  // The almanac's line stands *beside* the transcript and never inside it: the
  // transcript is what goes in a prompt's fence, and the officer is derived
  // from two pillars printed there already. A terminal is an address, so here
  // it is shown. See `chartTranscript`.
  return [
    chartTranscript(moment, chart, t),
    ...(nianming ? ['', formatNianming(nianming, t)] : []),
    '',
    formatAlmanac(moment.almanac, t),
  ].join('\n');
}

/**
 * The moment a birth was, resolved with the chart's own options.
 *
 * The pillars a birth is read for are the same pillars: a year that turned at
 * 立春 for the chart turned at 立春 for the birth. What is not shared is the
 * instant — the hour of the birth is nobody's business here, only its year.
 */
function birthMoment(
  options: Options,
  chartOptions: ChartOptions,
  context: EphemerisContext,
): Moment {
  const born = {
    date: options.born as string,
    // Noon, so that a date given alone lands in the middle of its day. It
    // decides nothing but a birth within hours of 立春, and there the hour
    // has to be given.
    time: options.bornTime ?? '12:00',
    timezone: options.bornTz ?? options.timezone ?? systemTimezone(),
  };
  return resolveMoment(born, resolvePlace(options, born), chartOptions, context);
}

/**
 * Resolves the birth and places it on the chart.
 *
 * The birth is resolved with the chart's own options, because the pillars it
 * is read for are the same pillars — a year that turned at 立春 for the chart
 * turned at 立春 for the birth. What it does not share is the moment: the
 * hour of the birth is nobody's here, only its year.
 */
function placeBirth(
  options: Options,
  chart: QimenChart,
  chartOptions: ChartOptions,
  context: EphemerisContext,
): Nianming {
  const nianmingOptions = declared(['nianming'], { count: 'sui' } as NianmingOptions, options);

  const gender = options.gender as Gender | undefined;
  if (gender && gender !== 'male' && gender !== 'female') {
    throw new UsageError('cli.error.unknownValue', { option: '--gender', value: gender });
  }

  const birth = birthMoment(
    { ...options, bornTz: options.bornTz ?? chart.moment.input.timezone },
    chartOptions,
    context,
  );
  return nianmingOf(
    chart,
    {
      birthYear: birth.pillars.year,
      // 行年 needs the direction of the count as much as the count itself,
      // and there is no reading of the rule that does without it.
      ...(gender
        ? { years: yearsLived(birth, chart.moment, nianmingOptions), gender }
        : {}),
    },
    nianmingOptions,
  );
}

function warningsOf(moment: Parameters<typeof formatWarnings>[0], t: Parameters<typeof formatWarnings>[1]): string {
  const text = formatWarnings(moment, t);
  return text ? `\n${text}` : '';
}

/**
 * Which command carries a question and which a matter.
 *
 * `--ask` names what a board is cast **for** and `--about` what a board is read
 * **about**, and which of the two a command takes is decided by the kind of
 * board it lays: an instrument of 卜 is cast for a question, an instrument of
 * 天 is read about a matter, and an instrument of 命 is laid on a person and
 * takes neither. On `qimen` and `liuren` a question implies `--prompt`, and on
 * `taiyi` a matter does, because one named is one meant to be carried.
 *
 * A table rather than a check inside each branch, because the failure this
 * prevents is a branch that never wrote one: `--about` reached every command
 * here and was read by exactly one, so on the other seven it was the flag that
 * did nothing — silent, and silent precisely where it cost most, since the
 * matter was the whole reason for the run. A flag that some commands take is a
 * question about the whole table, and it is answered in one place.
 */
const CARRIES: Record<Command, readonly ('ask' | 'about')[]> = {
  qimen: ['ask'],
  liuren: ['ask'],
  qizheng: [],
  taiyi: ['about'],
  bazi: [],
  ziwei: [],
  terms: [],
  calendar: [],
  scan: [],
};

/**
 * Why a question is refused, where the refusal is about the board.
 *
 * Under a board of 命 a question names one of the seats the board already
 * prints — «what about my career» *is* 官祿宮 — and a reading that starts from
 * it has arrived at a seat without choosing one. Under a board of 天 there is
 * **nobody to ask on behalf of**: the subject is a year, the reader is not on
 * the board, and a question is how they would get put there. The rest take the
 * plain refusal, because there the flag is not a design decision but simply
 * not that command's. See `prompt.ts` and `docs/history/` phases 18 and 21.
 */
const NOT_ASKED: Partial<Record<Command, 'cli.error.notAsked' | 'cli.error.notAskedYear'>> = {
  bazi: 'cli.error.notAsked',
  qizheng: 'cli.error.notAsked',
  ziwei: 'cli.error.notAsked',
  taiyi: 'cli.error.notAskedYear',
};

/**
 * The refusals, made before anything is cast.
 *
 * Two of them, and the second is the same failure by a different road. A
 * command that does not carry the flag refuses it; and **so does `--json`**,
 * on every command, because a question or a matter handed to a machine-readable
 * output has nowhere to be printed and was silently thrown away — which is the
 * one thing these two flags exist to make impossible. `--prompt` beside
 * `--json` is not that: it loses a choice of rendering rather than a sentence
 * somebody wrote.
 */
function refuseUncarried(command: Command, options: Options): void {
  if (options.ask !== undefined && !CARRIES[command].includes('ask')) {
    throw new UsageError(NOT_ASKED[command] ?? 'cli.error.notCarried', {
      command,
      option: '--ask',
    });
  }
  if (options.about !== undefined && !CARRIES[command].includes('about')) {
    throw new UsageError('cli.error.notAbout', { command, option: '--about' });
  }
  for (const option of ['--ask', '--about'] as const) {
    const given = option === '--ask' ? options.ask : options.about;
    if (options.json && given !== undefined) {
      throw new UsageError('cli.error.exclusive', { option, other: '--json' });
    }
  }
}

/**
 * Where the chart is cast from.
 *
 * With no coordinates the place is taken to sit on the meridian the zone's
 * clock keeps at the chart's moment. That makes the longitude correction
 * exactly zero and leaves only the equation of time — the least wrong
 * assumption available, and one that never silently moves an hour pillar by
 * half an hour. The moment matters: today's offset would put a winter chart
 * an hour of summer time off its own zone.
 */
function resolvePlace(options: Options, input: LocalMoment): Place {
  if (options.longitude !== undefined) {
    return {
      latitude: Number(options.latitude ?? 0),
      longitude: Number(options.longitude),
      timezone: input.timezone,
    };
  }

  return {
    latitude: Number(options.latitude ?? 0),
    longitude: zoneMeridian(input),
    timezone: input.timezone,
  };
}

/** `Asked for  Opening, starting … → Open 開門 kāimén`, or nothing if no errand. */
function expansionOf(options: Options, t: ReturnType<typeof createTranslator>): string {
  if (!options.for) return '';
  const gate = purposeCriteria(options.for as PurposeId).gate as string;
  const named = GATES.find((candidate) => candidate.id === gate) as (typeof GATES)[number];

  return `  ${t('cli.heading.criteria')}: ${t(`label.purpose.${options.for}` as MessageKey)} → ${t(`label.gate.${gate}` as MessageKey)} ${named.hanzi} ${named.pinyin}`;
}

/** The civil day after an ISO date. Set, not constructed: `Date.UTC` reads a
 * year under 100 as one under 2000, and the engine admits any year. */
function dayAfter(date: string): string {
  // The shape the engine itself asks of a date, checked here so that what a
  // mistyped `--until` is refused by is the value typed, not its arithmetic.
  const parts = /^(-?\d{4,})-(\d{2})-(\d{2})$/.exec(date);
  if (!parts) throw new ChartError('INVALID_DATE', { date });
  const [year, month, day] = parts.slice(1).map(Number) as [number, number, number];
  const next = new Date(0);
  next.setUTCFullYear(year, month - 1, day + 1);
  const sign = next.getUTCFullYear() < 0 ? '-' : '';
  return [
    sign + String(Math.abs(next.getUTCFullYear())).padStart(4, '0'),
    String(next.getUTCMonth() + 1).padStart(2, '0'),
    String(next.getUTCDate()).padStart(2, '0'),
  ].join('-');
}

const DIRECTIONS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'] as const;
const STRENGTHS = ['wang', 'xiang', 'xiu', 'qiu', 'si'] as const;

/**
 * What the scan was asked for.
 *
 * Every value is checked against the identifiers the engine actually knows.
 * An unchecked one would not fail: it would match nothing, and the scan would
 * report that the arrangement never occurred — which is the same answer a
 * correct question can get, and indistinguishable from it.
 */
function resolveCriteria(options: Options): ScanCriteria {
  const one = <T extends string>(
    value: string | undefined,
    known: readonly { id: string }[] | readonly string[],
    flag: string,
  ): T | undefined => {
    if (value === undefined) return undefined;
    const ids = known.map((entry) => (typeof entry === 'string' ? entry : entry.id));
    if (!ids.includes(value)) {
      throw new UsageError('cli.error.unknownValue', { option: flag, value });
    }
    return value as T;
  };

  const many = <T extends string>(
    value: string | undefined,
    known: readonly string[],
    flag: string,
  ): T[] | undefined =>
    value
      ?.split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => one<T>(entry, known, flag) as T);

  const criteria: ScanCriteria = {};

  // An errand stands for a gate, so naming both is either a repetition or a
  // contradiction. Neither is worth guessing at.
  const errand = one<PurposeId>(options.for, PURPOSES, '--for');
  const fromErrand = errand ? purposeCriteria(errand).gate : undefined;
  if (fromErrand && options.gate && options.gate !== fromErrand) {
    throw new UsageError('cli.error.contradiction', { option: '--for', other: '--gate' });
  }

  const gate = one<GateId>(options.gate ?? fromErrand, GATES, '--gate');
  const star = one<StarId>(options.star, STARS, '--star');
  // The full list of ten, not either dun's eight: a scan crosses terms, and
  // 白虎 is unaskable for half the charts of the year on the yang list alone.
  const spirit = one<SpiritId>(options.spirit, SPIRIT_IDS, '--spirit');
  const stem = one<StemId>(options.stem, STEMS, '--stem');
  const directions = many<Direction>(options.towards, DIRECTIONS, '--towards');
  const minStrength = one<StrengthId>(options.minStrength, STRENGTHS, '--min-strength');
  const excludes = many<PatternId>(options.without, PATTERN_IDS, '--without');

  if (gate) criteria.gate = gate;
  if (star) criteria.star = star;
  if (spirit) criteria.spirit = spirit;
  if (stem) criteria.stem = stem;
  if (directions?.length) criteria.directions = directions;
  if (minStrength) criteria.minStrength = minStrength;
  if (excludes?.length) criteria.excludes = excludes;

  return criteria;
}

function resolveOptions(options: Options): ChartOptions {
  const chartOptions: ChartOptions = { ...DEFAULT_OPTIONS };
  if (options.trueSolar !== undefined) chartOptions.trueSolarTime = options.trueSolar;
  // The layers under every board and dunjia's own, which share one type: how
  // an instant is read into pillars, which register the almanac line carries,
  // and the school a chart is cast by.
  return declared(['pillars', 'qimen', 'almanac'], chartOptions, options);
}

const FLAGS: Record<string, keyof Options> = {
  '--date': 'date',
  '--time': 'time',
  '--tz': 'timezone',
  '--timezone': 'timezone',
  '--lat': 'latitude',
  '--lon': 'longitude',
  '--year': 'year',
  '--gender': 'gender',
  '--lang': 'lang',
  '--until': 'until',
  '--gate': 'gate',
  '--star': 'star',
  '--spirit': 'spirit',
  '--stem': 'stem',
  '--towards': 'towards',
  '--min-strength': 'minStrength',
  '--without': 'without',
  '--for': 'for',
  '--ask': 'ask',
  '--about': 'about',
  '--born': 'born',
  '--born-time': 'bornTime',
  '--born-tz': 'bornTz',
};

function parse(argv: string[]): { command?: Command; options: Options } {
  const options: Options = { json: false, help: false, prompt: false, declared: {} };
  let command: Command | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const argument = argv[i] as string;

    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }
    if (argument === '--json') {
      options.json = true;
      continue;
    }
    if (argument === '--prompt') {
      options.prompt = true;
      continue;
    }
    if (argument === '--true-solar') {
      options.trueSolar = true;
      continue;
    }
    if (argument === '--no-true-solar') {
      options.trueSolar = false;
      continue;
    }

    if (DECLARED_FLAGS.has(argument)) {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) {
        throw new UsageError('cli.error.missingValue', { option: argument });
      }
      options.declared[argument] = value;
      i += 1;
      continue;
    }

    const key = FLAGS[argument];
    if (key) {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) {
        throw new UsageError('cli.error.missingValue', { option: argument });
      }
      (options as unknown as Record<string, string>)[key] = value;
      i += 1;
      continue;
    }

    if (argument.startsWith('-')) {
      throw new UsageError('cli.error.unknownOption', { option: argument });
    }
    if (!command && (COMMANDS as readonly string[]).includes(argument)) {
      command = argument as Command;
      continue;
    }
    throw new UsageError('cli.error.unknownCommand', { command: argument });
  }

  return { command, options };
}

// Only when run as a program, never when imported by a test. Compared as
// URLs, not sniffed by name: the installed bin is a symlink without an
// extension, and a guard that looked for `cli.js` in the path left `shipan`
// a silent no-op. The realpath resolves the symlink back to this file.
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  process.exitCode = await run(process.argv.slice(2));
}
