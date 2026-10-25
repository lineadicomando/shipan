import {
  ChartError,
  currentMoment,
  initEphemeris,
  nianmingOf,
  refuseOtherFamily,
  resolveMoment,
  systemTimezone,
  yearsLived,
  zoneMeridian,
  type ChartOptions,
  type EphemerisContext,
  type LocalMoment,
  type Moment,
  type Nianming,
  type NianmingOptions,
  type Place,
  type QimenChart,
} from '@shipan/core';
import { DEFAULT_OPTIONS } from '@shipan/core';
import { GeoError, getLocation } from '@shipan/geo';
import {
  DEFAULT_LOCALE,
  createTranslator,
  resolveLocale,
  translate,
  type MessageKey,
  type MessageParams,
  type Translator,
} from '@shipan/i18n';
import { z } from 'zod';

export interface ToolContext {
  /** Where the GeoNames database lives, when it is not in the default place. */
  databasePath?: string;
  /** Where the ephemeris files live, when they are not in the default place. */
  ephemerisPath?: string;
}

/**
 * What a tool hands back.
 *
 * The index signature is what the SDK's handler type asks for — it allows a
 * result to carry fields this server does not use — and without it the
 * narrower shape is rejected.
 */
export interface ToolResult {
  [key: string]: unknown;
  content: { type: 'text'; text: string }[];
  isError?: boolean;
}

export function ok(text: string): ToolResult {
  return { content: [{ type: 'text', text }] };
}

export function fail(text: string): ToolResult {
  return { content: [{ type: 'text', text }], isError: true };
}

export type McpErrorCode = 'UNKNOWN_LOCATION' | 'INCOMPLETE_COORDINATES';

/**
 * A usage error of this server's own: input that never reaches an engine, so
 * no engine can name what is wrong with it.
 *
 * It carries a `code` and the `params` that describe the failure, never a
 * sentence chosen for one language. `message` is an English rendering meant
 * for logs and stack traces; `describeError` translates `messageKey` with
 * `params` in the locale the agent asked for.
 */
export class McpError extends Error {
  readonly code: McpErrorCode;
  readonly params: MessageParams;
  readonly messageKey: MessageKey;

  constructor(code: McpErrorCode, params: MessageParams = {}) {
    const messageKey = `mcp.error.${code}` as MessageKey;
    super(translate(DEFAULT_LOCALE, messageKey, params));
    this.name = 'McpError';
    this.code = code;
    this.params = params;
    this.messageKey = messageKey;
  }
}

/**
 * Turns whatever went wrong into something an agent can act on.
 *
 * Domain errors are translated from their code, so the sentence an agent
 * reads is the same one a person would. Anything else is passed through
 * rather than dressed up: an agent that is told a plausible story about an
 * unexpected failure will retry forever.
 */
export function describeError(error: unknown, t: Translator): string {
  if (error instanceof ChartError || error instanceof GeoError || error instanceof McpError) {
    return t(error.messageKey, error.params);
  }
  return error instanceof Error ? error.message : String(error);
}

/** The locale an agent asked for, if it asked. */
export function translatorFor(lang: string | undefined): Translator {
  return createTranslator(resolveLocale(lang));
}

export const langSchema = z
  .enum(['en', 'it'])
  .optional()
  .describe(
    'Language of the readable labels. Default en. Never changes the hanzi, the pinyin or the numbers.',
  );

export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .describe(
    'Local date, YYYY-MM-DD. OMIT THIS for the present moment: the server supplies the current date, and you do not know it. Only pass it when the user named a date.',
  );

export const timeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}(:\d{2})?$/)
  .optional()
  .describe(
    'Local clock time, HH:mm. As it was read on a clock at the place; the conversion to Universal Time is done here, using the historical rules of the zone. Do not convert it yourself. Omit for the present moment; omitted beside a date, it is noon on that date.',
  );

export const placeSchema = {
  location_id: z
    .number()
    .int()
    .optional()
    .describe('GeoNames identifier from search_location. Preferred over raw coordinates.'),
  latitude: z
    .number()
    .min(-90)
    .max(90)
    .optional()
    .describe(
      'Degrees, positive north. Given beside a location_id it refines it: the coordinates replace the ones GeoNames holds and the zone stays the named place’s.',
    ),
  longitude: z
    .number()
    .min(-180)
    .max(180)
    .optional()
    .describe('Degrees, positive east. Refines a location_id in the same way as latitude.'),
  timezone: z
    .string()
    .optional()
    .describe(
      'IANA identifier, e.g. Asia/Shanghai. Required with raw coordinates, ignored beside a location_id, which already carries its own.',
    ),
};

/**
 * 年命 — the birth to be looked up inside the chart, when one is wanted.
 *
 * The classical direction and the reverse of a natal chart: the chart stays
 * the chart of its moment, and the birth is placed in it. Only the year
 * pillar is read from the date given.
 */
export const birthSchema = {
  born: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .describe(
      'Date of birth, YYYY-MM-DD, to place a 年命 inside the chart: 本命, the year pillar of the birth. The chart itself does not move — this is not a chart of a birth, and nothing in the answer says which palace stands for which part of a life.',
    ),
  born_time: z
    .string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/)
    .optional()
    .describe(
      'Clock time of the birth. Default noon, and it decides nothing except for a birth within hours of 立春, where it decides which year pillar the birth belongs to.',
    ),
  born_timezone: z
    .string()
    .optional()
    .describe('IANA zone of the birth. Default the chart\'s own, and it matters for the same reason born_time does.'),
  gender: z
    .enum(['male', 'female'])
    .optional()
    .describe(
      'Read for the direction of the 行年 count and for nothing else: the traditional rule runs forward from 寅 for a man and back from 申 for a woman. Without it only the 本命 is placed, and the year being lived is left out rather than guessed.',
    ),
  years_count: z
    .enum(['sui', 'turns'])
    .optional()
    .describe(
      'How the years are counted for the 行年: sui is 虛歲, counting the year of the birth itself, and is the count the rule was written for; turns counts the turns of the year pillar and is one less. Default sui.',
    ),
};

export const optionSchema = {
  true_solar_time: z
    .boolean()
    .optional()
    .describe(
      'Correct clock time to true solar time at the place. Default true. Turning it off is a school\'s choice, not a simplification.',
    ),
  day_boundary: z
    .enum(['zishi', 'midnight'])
    .optional()
    .describe(
      'Where the day pillar turns over: at 23:00 with the hour of the Rat, or at midnight. Default zishi. The two disagree only for that one hour, and there about a quarter of the chart.',
    ),
  year_boundary: z
    .enum(['lichun', 'chunjie', 'dongzhi'])
    .optional()
    .describe(
      'Where the year of the pillars begins. Default lichun. chunjie turns it at the first day of the lunar year. dongzhi turns the year pillar at the winter solstice and leaves the month pillar where it was, as the modern treatise Mingli Xinlun works it; it moves one pillar for the weeks between the solstice and lichun.',
    ),
  shensha: z
    .enum(['xieji'])
    .optional()
    .describe(
      'Which register of shensha the almanac line carries. Only xieji exists: what the Xieji Bianfang Shu ratifies, cut to what bears on the quality of a day and the bearing of a direction. There are hundreds of shensha and they diverge by lineage far more than the schools of Qi Men do, so the parameter is here before there is a second register to choose. Affects only the almanac line, never the chart or the pillars.',
    ),
};

/**
 * The divergences of 奇門 itself, for the tools that lay one of its charts.
 *
 * Apart from the bundle above because that one is the *layers* — how an
 * instant is read into the four pillars every board stands on, and which
 * register the almanac line carries — and 奇門's own belong to 奇門. `method`
 * sat in it and was therefore offered on `compute_bazi`, with a description
 * ending «Does not affect the Four Pillars»: the prose patch for a schema that
 * offered a school where it did nothing.
 * → `docs/history/43-the-layer-under-the-board.md`
 */
export const qimenSchema = {
  method: z
    .enum(['chaibu', 'zhirun', 'maoshan'])
    .optional()
    .describe(
      'How the ju of a Qi Men chart is determined, and the most divisive choice in the art. Default chaibu, which reads the ju off the term in force and the yuan off the day: the days run in five-day stretches headed by Jia or Ji (the futou), and where the day pillar stands in that fifteen-day cycle is the yuan. maoshan does not read the day at all — it counts sixty shichen from the instant the term began, then sixty more, and gives the rest of the term to the third yuan. zhirun follows the day\'s futou through whole fifteen-day blocks and pays the drift off with an intercalated Mangzhong or Daxue; its ju can belong to a term the Sun has not reached yet, and the answer says which. Three different schools, not three approximations of one another: chaibu and maoshan disagree about three hours in five.',
    ),
  spirits: z
    .enum(['dun', 'fixed', 'baihu', 'huwu'])
    .optional()
    .describe(
      'What names the fifth and sixth of the eight spirits. Default dun: the pair is named by the half of the year, gouchen and zhuque in a yang chart, baihu and xuanwu in a yin one. fixed keeps the same eight names in both dun, as the Yuding Qimen Baojian has them. baihu keeps the naming by half-year but leaves baihu at the fifth seat of a yang chart, which is the board of the Qimen Dunjia Quanju. huwu keeps the names of a yin chart in both dun, baihu fifth and xuanwu sixth, as the hour tables of the Yuding Qimen Daquan name them. Four readings of one ring, parting at two seats and only in the name — but the name is what a spirit criterion matches on.',
    ),
  spirit_seat: z
    .enum(['tianpan', 'yinshi'])
    .optional()
    .describe(
      'Where the first of the eight spirits, the zhifu spirit, is seated; the other seven follow it round in the order spirits names. Default tianpan: where the chief stands on the heaven plate, at every hour, as the hour tables of the Yuding Qimen Daquan lay it. yinshi does the same at an hour whose stem is jia to wu, and at an hour whose stem is ji, geng, xin, ren or gui seats it where the chief stands on the earth plate, and does so too whenever the chief falls on the central palace: the commentary on the Yanbo Diaosou Ge in the Qimen Mijue, juan 47 of the Daquan. Where the two places differ every spirit stands in another palace. Both values are computed and the chart says which it stands on.',
    ),
  spirit_phase: z
    .enum(['none', 'branch', 'huaqi'])
    .optional()
    .describe(
      'Whether the eight spirits have a phase of the five, and which. It moves nothing on the board — no seat, no name — and only says whether a spirit can be related to the rest by generation and control. Default none: the spirits stand in no relation, as Yao Xuesheng\'s Qimen Dunjia Xiandai Yingyong Jishu teaches, giving each a phase and refusing it any part in generation and control. branch gives each spirit the phase of the branch or trigram it is identified with, as the Qimen Mijue in juan 47 of the Yuding Qimen Daquan lists them: zhifu earth, tengshe fire, taiyin metal, liuhe wood, baihu metal, xuanwu water, jiudi earth, jiutian metal, gouchen earth, zhuque fire. huaqi is the Qimen Dunjia Miji Daquan\'s, juan 6, which agrees on eight and makes zhifu fire and tengshe earth. The chart says which it stands on.',
    ),
  plate: z
    .enum(['zhuan', 'xingfei'])
    .optional()
    .describe(
      'How the stars and the heaven stems are moved. Default zhuan: turned round the eight outer palaces, the centre left where it is, as the Qimen Dunjia Tongzong has it. xingfei: flown through all nine palaces in Luoshu order, forward in a yang chart and back in a yin one, while the gates still turn, as the Qimen Dunjia Zhezhong holds. Under both the chief star is set on the palace of the hour stem; every other star and stem above the palaces can stand somewhere else.',
    ),
  system: z
    .enum(['shijia', 'rijia'])
    .optional()
    .describe(
      'Which family of Qi Men board, and each is a board of its own. Default shijia, the board of the hour: a plate of stems, nine stars, eight gates and eight spirits, and everything else this tool describes. rijia is the board of the day: eight gates and nine stars of its own, the first of them taiyi, with no stems, no chief and no spirits. It is laid off the day pillar and the season alone, so every hour of one day has the same one; beside it come the twelve hours of that day, each with the god it treads and what the stem of the day puts on it — the Heavenly Noble, the road cut off, the hour that does not meet, the spirit of joy and its bearing — which are names from the almanac and order no hour above another. The board reads day_gates and day_dun and none of method, plate, spirits, spirit_seat, spirit_phase, centre_lodging, earth, earth_plate, centre_travel or centre_stem. The answer has a different shape under each.',
    ),
  day_gates: z
    .enum(['fei', 'zhuan', 'shun'])
    .optional()
    .describe(
      'Under system rijia only: how the seven other gates follow xiumen on a board of the day. Both readings keep xiumen three days on a palace and move it through the eight outer palaces. Default fei: all eight gates are counted on together through the palaces in the order of their numbers, the same way all year, as the Jinhan Yujing Qimen Dunjia Miji Quanshu enumerates. zhuan: the seven are carried round the ring behind xiumen, one way on the day of a yang stem and the other on the day of a yin stem, and from the summer solstice the count begins at the opposite palace and runs back, as the table Rijia Qimen (1998) lays them. shun: the seven are carried round the ring behind xiumen with the sun on every day, as the sixty day boards of the Baojing Tu (Yuding Qimen Daquan, juan 61-64) lay them, mirrored in the yin half as zhuan is.',
    ),
  day_dun: z
    .enum(['solstice', 'yang'])
    .optional()
    .describe(
      'Under system rijia only: where the year of a board of the day divides into its yang and yin halves. Default solstice: at the winter and summer solstices, and the yin half counts the stars (and the turned gates) the other way. yang: the year is not divided, and every day is laid with the yang count, one board to each day of the sixty all year, as the Baojing Tu prints them. A third reading, sixty days to a ju, is declared and refused.',
    ),
  centre_lodging: z
    .enum(['kun', 'dun', 'dunni', 'bajie', 'siyu'])
    .optional()
    .describe(
      'Which palace the central palace is read in, and whose gate it takes. Default kun: always the palace of kun, as the Qimen Dunjia Tongzong has it. dun: kun in a yang chart and gen in a yin one, as the Hanyin Jushi Ge has it, a verse printed in the Yuding Qimen Daquan, and as the Yuding Qimen Baojian reports of a variant copy. dunni: the other way round, gen under yang and kun under yin, which the Qimen Dunjia Zhezhong reports an older text as saying. bajie: the palace of the trigram governing the season, through all eight in a year, which the Zhezhong holds. siyu: one of the four corners, a corner a season, which the Zhezhong reports of another teacher. Two of the five are known only from a text that sets them out and argues against them, and the answer says which were laid.',
    ),
  earth: z
    .enum(['quarters', 'eighteen'])
    .optional()
    .describe(
      'Where earth\'s season begins, which every star and gate on the board is weighed against. Default quarters: the whole of each month that closes a season. eighteen: only the eighteen days before each season opens, the rest of that month staying with the season it closes, as the Da Liuren Jingjie states of the five phases. The two part for about twelve days in each of four months.',
    ),
  earth_plate: z
    .enum(['yuan', 'xun'])
    .optional()
    .describe(
      'How often the earth plate is laid anew. Default yuan: one plate for the sixty hours of a yuan, as every text on the shelf but one has it. xun: a new plate at the head of every decade of hours, begun from the palace that decade starts in, as the Qimen Dunjia Zhezhong holds. The first ten hours of a yuan are the same plate under both; the other fifty are not.',
    ),
  centre_travel: z
    .enum(['stay', 'travel'])
    .optional()
    .describe(
      'Where the chief (zhifu) and the chief gate (zhishi) are read when the count puts them on the central palace. Default stay: in the palace the centre lodges in, as the Yuding Qimen Baojian has it. travel reads them in the fifth palace itself, as the Qimen Dunjia Jinjing Baojian does. Neither moves a plate; both values are computed and the chart says which it stands on.',
    ),
  centre_stem: z
    .enum(['centre', 'host'])
    .optional()
    .describe(
      'Where the stem of the central palace stands once the plate has turned, on the turned plate (plate zhuan) only. The palace the centre lodges in holds two stems on the earth plate, its own and the centre\'s, and the turn carries its own to another palace. Default centre: the centre\'s stem stays in the fifth palace. host: it moves with its host\'s stem and stands above the palace that stem arrives at, as the hour tables of the Yuding Qimen Daquan read it; the configurations it makes over the stem below are read there too, and the palace reports it as heavenLodged. Both values are computed and the chart says which it stands on.',
    ),
  ding_tomb: z
    .enum(['gen', 'qian'])
    .optional()
    .describe(
      'Which palace the stem ding is buried in (rumu). Default gen: the palace of gen, as the Qimen Dunjia Tongzong has it. qian: the palace of qian, where bing is buried too, as the Dunjia Fuyingjing has it. The two texts agree on yi and on bing. It moves that one mark and no plate; both values are computed and the chart says which it stands on.',
    ),
  yi_tomb: z
    .enum(['kun', 'qian'])
    .optional()
    .describe(
      'Which palace the stem yi is buried in (rumu). Default kun: the palace of kun, as the Qimen Dunjia Tongzong, the Dunjia Fuyingjing and the Jixiong Gejie of the Yuding Qimen Daquan have it. qian: the palace of qian, beside bing, as the verse in the Qimen Dunjia Miji Daquan has it and the commentary in the Qimen Mijue argues. It moves that one mark and no plate, apart from ding_tomb; both values are computed and the chart says which it stands on.',
    ),
  menpo: z
    .enum(['menzhigong', 'gongzhimen'])
    .optional()
    .describe(
      'Which relation of a gate to its palace carries the name menpo, marked inauspicious. Default menzhigong: a gate whose element controls its palace\'s, as the Qimen Dunjia Tongzong, the cells of the Dunjia Fuyingjing and the Qimen Dunjia Miji Daquan have it. gongzhimen: a gate whose palace controls it, as the Jixiong Gejie of the Yuding Qimen Daquan has it; under it a gate controlling its palace is marked gongpo, inauspicious too. The relation each palace reports is the same under both; only the marks move. Both values are computed and the chart says which it stands on.',
    ),
  deshi: z
    .enum(['liuyi', 'zhishi'])
    .optional()
    .describe(
      'What makes one of the three marvels (yi, bing, ding) sanqi deshi, marked auspicious under both rules. Default liuyi: the marvel on the heaven plate over the instrument of one of its two decades on the earth plate (yi over ji or xin, bing over wu or geng, ding over ren or gui), as the Qimen Dunjia Tongzong, the Dunjia Fuyingjing, the Dunjia Yanyi and the Jixiong Gejie pair them. zhishi: the marvel on the heaven plate in the palace the chief gate (zhishi) stands in, whatever is below it, as the Qimen Dunjia Kaiwu zhi Men has it and calls a provisional opinion. Three of the six liuyi cells are also inauspicious stem pairs, and the board marks both. Both values are computed and the chart says which it stands on.',
    ),
  stem_pairs: z
    .enum(['shared', 'jinhan'])
    .optional()
    .describe(
      'Which table of shigan keying (the stem of the heaven plate over the stem below it) names the marks. Default shared: the fourteen cells the texts name alike, which is a convention of this engine and no text\'s table. jinhan: the whole table of the Jinhan Yujing, eighty of its eighty-one cells (the one it calls fuyin is left out, since the board already reports a different fuyin), with a fortune only where that text states one without a condition, so most of its marks carry no fortune. A third table, the Qimen Xianji\'s, is declared and refused. It moves marks and no plate. The lines name most cells differently, so a mark under jinhan is that text\'s name and not the art\'s.',
    ),
};

export interface ResolvedInput {
  moment: Moment;
  place: Place;
  label: string;
}

interface RawInput {
  date?: string | undefined;
  time?: string | undefined;
  location_id?: number | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  timezone?: string | undefined;
  true_solar_time?: boolean | undefined;
  day_boundary?: 'zishi' | 'midnight' | undefined;
  year_boundary?: 'lichun' | 'chunjie' | 'dongzhi' | undefined;
  method?: 'chaibu' | 'zhirun' | 'maoshan' | undefined;
  spirits?: 'dun' | 'fixed' | 'baihu' | 'huwu' | undefined;
  spirit_seat?: 'tianpan' | 'yinshi' | undefined;
  spirit_phase?: 'none' | 'branch' | 'huaqi' | undefined;
  plate?: 'zhuan' | 'xingfei' | undefined;
  system?: 'shijia' | 'rijia' | undefined;
  day_gates?: 'fei' | 'zhuan' | 'shun' | undefined;
  day_dun?: 'solstice' | 'yang' | undefined;
  centre_lodging?: 'kun' | 'dun' | 'dunni' | 'bajie' | 'siyu' | undefined;
  earth?: 'quarters' | 'eighteen' | undefined;
  earth_plate?: 'yuan' | 'xun' | undefined;
  centre_travel?: 'stay' | 'travel' | undefined;
  centre_stem?: 'centre' | 'host' | undefined;
  yi_tomb?: 'kun' | 'qian' | undefined;
  menpo?: 'menzhigong' | 'gongzhimen' | undefined;
  deshi?: 'liuyi' | 'zhishi' | undefined;
  ding_tomb?: 'gen' | 'qian' | undefined;
  stem_pairs?: 'shared' | 'jinhan' | undefined;
  shensha?: 'xieji' | undefined;
  born?: string | undefined;
  born_time?: string | undefined;
  born_timezone?: string | undefined;
  gender?: 'male' | 'female' | undefined;
  years_count?: 'sui' | 'turns' | undefined;
}

/**
 * Turns what an agent passed into a moment the engine can use.
 *
 * Two things are deliberately not guessed. A place is never inferred from a
 * name — that is what `search_location` is for, and choosing among the dozens
 * of Romes would produce a chart that is plausible and wrong. And the current
 * date is supplied here rather than by the agent, which does not know it.
 *
 * **A date without a time is noon on that date, not the hour it is asked in.**
 * Falling back to the clock would make the same call return a different chart
 * every time it ran, which is the one thing a chart may never do: it is a pure
 * function of its input, and a saved one has to reproduce. Noon is the
 * convention `born_time` already declares. Omitting *both* is the other case
 * entirely — there the instant of asking is the instant that is cast.
 */
export function resolveInput(raw: RawInput, context: ToolContext): ResolvedInput {
  const { place, meridianAssumed } = resolvePlace(raw, context);
  const now = currentMoment(place.timezone);
  const input: LocalMoment = {
    date: raw.date ?? now.date,
    time: raw.time ?? (raw.date === undefined ? now.time : '12:00'),
    timezone: place.timezone,
  };
  if (meridianAssumed) place.longitude = zoneMeridian(input);

  // A family of 奇門 is a board of its own, so an option of the other one is
  // refused by the name this tool takes it under rather than laid without.
  refuseOtherFamily(
    {
      method: raw.method,
      spirits: raw.spirits,
      spiritSeat: raw.spirit_seat,
      spiritPhase: raw.spirit_phase,
      plate: raw.plate,
      system: raw.system,
      dayGates: raw.day_gates,
      dayDun: raw.day_dun,
      centreLodging: raw.centre_lodging,
      earth: raw.earth,
      earthPlate: raw.earth_plate,
      centreTravel: raw.centre_travel,
      centreStem: raw.centre_stem,
      dingTomb: raw.ding_tomb,
      yiTomb: raw.yi_tomb,
      menpo: raw.menpo,
      deshi: raw.deshi,
      stemPairs: raw.stem_pairs,
    },
    (parameter) => parameter.id.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
  );

  const options: ChartOptions = { ...DEFAULT_OPTIONS };
  if (raw.true_solar_time !== undefined) options.trueSolarTime = raw.true_solar_time;
  if (raw.day_boundary) options.dayBoundary = raw.day_boundary;
  if (raw.year_boundary) options.yearBoundary = raw.year_boundary;
  if (raw.method) options.method = raw.method;
  if (raw.spirits) options.spirits = raw.spirits;
  if (raw.spirit_seat) options.spiritSeat = raw.spirit_seat;
  if (raw.spirit_phase) options.spiritPhase = raw.spirit_phase;
  if (raw.plate) options.plate = raw.plate;
  if (raw.system) options.system = raw.system;
  if (raw.day_gates) options.dayGates = raw.day_gates;
  if (raw.day_dun) options.dayDun = raw.day_dun;
  if (raw.centre_lodging) options.centreLodging = raw.centre_lodging;
  if (raw.earth) options.earth = raw.earth;
  if (raw.earth_plate) options.earthPlate = raw.earth_plate;
  if (raw.centre_travel) options.centreTravel = raw.centre_travel;
  if (raw.centre_stem) options.centreStem = raw.centre_stem;
  if (raw.ding_tomb) options.dingTomb = raw.ding_tomb;
  if (raw.yi_tomb) options.yiTomb = raw.yi_tomb;
  if (raw.menpo) options.menpo = raw.menpo;
  if (raw.deshi) options.deshi = raw.deshi;
  if (raw.stem_pairs) options.stemPairs = raw.stem_pairs;
  if (raw.shensha) options.shensha = raw.shensha;

  const ephemeris: EphemerisContext = initEphemeris(context.ephemerisPath);
  return {
    moment: resolveMoment(input, place, options, ephemeris),
    place,
    label: labelFor(raw, place, context),
  };
}

/**
 * The 年命 an agent asked for, placed on a chart already cast.
 *
 * Nothing is inferred: without `born` there is no 年命, and without `gender`
 * there is no 行年 — the count runs one way from 寅 and the other from 申, and
 * a direction guessed is a pair placed in the wrong palace.
 */
export function resolveNianming(
  raw: RawInput,
  chart: QimenChart,
  context: ToolContext,
): Nianming | undefined {
  if (!raw.born) return undefined;

  const options: NianmingOptions = { count: raw.years_count ?? 'sui' };
  const birth = resolveBirth(raw, chart.moment.input.timezone, chart.moment.options, context);

  return nianmingOf(
    chart,
    {
      birthYear: birth.pillars.year,
      ...(raw.gender ? { years: yearsLived(birth, chart.moment, options), gender: raw.gender } : {}),
    },
    options,
  );
}

/**
 * The moment of a birth, read on its own clock.
 *
 * The zone is the birth's own when given, the fallback's otherwise — and it
 * wins over whatever `resolvePlace` answers, because a `location_id` names
 * where the question is asked, not where the birth was. The place is then
 * pinned to the zone's meridian so the true-solar correction is exactly
 * zero: a birth is a calendar fact, and the calendar runs on the clock.
 * Noon for a date given alone; it decides nothing but a birth within hours
 * of 立春, and there the hour has to be given.
 */
export function resolveBirth(
  raw: RawInput,
  timezone: string,
  options: ChartOptions,
  context: ToolContext,
): Moment {
  const input: LocalMoment = {
    date: raw.born as string,
    time: raw.born_time ?? '12:00',
    timezone: raw.born_timezone ?? timezone,
  };
  const { place } = resolvePlace({ ...raw, timezone: input.timezone }, context);
  return resolveMoment(
    input,
    { ...place, timezone: input.timezone, longitude: zoneMeridian(input) },
    options,
    initEphemeris(context.ephemerisPath),
  );
}

/**
 * A place is an identifier, or coordinates, or an identifier refined by them.
 *
 * The third reads the same way it does over HTTP, and it has to: the tool and
 * the endpoint take one query string, and a rule that held on one of the two
 * would make the README's promise false. Given both, the coordinates replace
 * the ones GeoNames holds — which is what somebody who knows the hamlet and
 * not just the town is saying — and the zone stays the identifier's, since
 * that is the thing the coordinates cannot carry.
 */
function resolvePlace(
  raw: RawInput,
  context: ToolContext,
): { place: Place; meridianAssumed?: boolean } {
  if (raw.location_id !== undefined) {
    const found = getLocation(
      raw.location_id,
      context.databasePath ? { databasePath: context.databasePath } : {},
    );
    if (!found) {
      throw new McpError('UNKNOWN_LOCATION', { id: raw.location_id });
    }
    if (raw.latitude !== undefined || raw.longitude !== undefined) {
      if (raw.latitude === undefined || raw.longitude === undefined) {
        throw new McpError('INCOMPLETE_COORDINATES');
      }
      return {
        place: { latitude: raw.latitude, longitude: raw.longitude, timezone: found.timezone },
      };
    }
    return {
      place: { latitude: found.latitude, longitude: found.longitude, timezone: found.timezone },
    };
  }

  if (raw.latitude !== undefined && raw.longitude !== undefined && raw.timezone) {
    return { place: { latitude: raw.latitude, longitude: raw.longitude, timezone: raw.timezone } };
  }

  if (raw.latitude !== undefined || raw.longitude !== undefined) {
    throw new McpError('INCOMPLETE_COORDINATES');
  }

  // A timezone on its own is a complete answer for the calendar and the
  // terms, which do not depend on where they are read. For anything that does
  // — the correction to true solar time — the place is taken to sit on the
  // meridian the zone's clock keeps at the chart's moment, which makes that
  // correction exactly zero rather than wrong by half an hour. The moment is
  // not known yet, so the longitude is a stand-in that `resolveInput` fills.
  const timezone = raw.timezone ?? systemTimezone();
  return { place: { latitude: 0, longitude: 0, timezone }, meridianAssumed: true };
}

/**
 * What the answer says it was cast at.
 *
 * A refined identifier carries both halves: the name says which town's clock
 * the hour was read on and the coordinates say where the board was actually
 * laid, and a name alone beside coordinates somebody supplied would be the
 * answer quietly dropping what it was told.
 */
function labelFor(raw: RawInput, place: Place, context: ToolContext): string {
  const coordinates = `${place.latitude.toFixed(4)}, ${place.longitude.toFixed(4)}`;
  if (raw.location_id !== undefined) {
    const found = getLocation(
      raw.location_id,
      context.databasePath ? { databasePath: context.databasePath } : {},
    );
    if (found) {
      const name = [found.name, found.region, found.country].filter(Boolean).join(', ');
      return raw.latitude !== undefined && raw.longitude !== undefined
        ? `${name} · ${coordinates}`
        : name;
    }
  }
  return `${coordinates} (${place.timezone})`;
}

export function ephemerisOf(context: ToolContext): EphemerisContext {
  return initEphemeris(context.ephemerisPath);
}
