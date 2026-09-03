import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LIUREN_OPTIONS,
  DEFAULT_OPTIONS,
  DEFAULT_QIZHENG_OPTIONS,
  DEFAULT_TAIYI_OPTIONS,
  DEFAULT_ZIWEI_OPTIONS,
  PARAMETERS,
  computeBazi,
  computeQimenChart,
  computeZiwei,
  initEphemeris,
  liurenBoard,
  qizhengBoard,
  resolveMoment,
  taiyiBoard,
} from '@shipan/core';
import { LOCALES } from '@shipan/i18n';
import { INSTRUMENTS } from '../src/lib/instruments';
import { NOTE_PAGES } from '../src/lib/notes';
import { SECTIONS } from '../src/lib/navigation';

/**
 * The documents count things, and a count written by hand drifts.
 *
 * `README.md` said «eleven tools» while the server registered twelve, and
 * nothing anywhere could have noticed: the sentence was true when it was
 * written and no test read it. So the counts a document states are asserted
 * here against the code that produces them, and a phase that adds an endpoint
 * fails this suite until the sentence is corrected.
 *
 * The rule the documents follow — `docs/README.md` § "One fact, one home" —
 * is that a number belongs in one page. `docs/architecture.md` is that page
 * for the surfaces; `README.md` says how many boards there are because that
 * is what somebody arriving counts. Nothing else states a number, and nothing
 * else should.
 *
 * The MCP half of the same check lives in `packages/mcp/test/docs.test.ts`,
 * where a real client can be asked what it was offered.
 */
const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

const read = (path: string): string => readFileSync(join(ROOT, path), 'utf8');

/**
 * The documents spell small numbers out, as prose does. The test therefore
 * has to know both faces of a count rather than forcing the prose into
 * digits — a page that read "9 commands" would be a page written for its
 * test.
 */
const WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
];

const spelled = (n: number): string => (n < WORDS.length ? WORDS[n] : String(n));

/** `<count> <noun>`, in whichever face the prose uses, anywhere in the file. */
function expectCount(path: string, count: number, noun: string): void {
  const document = read(path);
  const faces = [`${spelled(count)} ${noun}`, `${count} ${noun}`];
  const found = faces.some((face) => document.toLowerCase().includes(face.toLowerCase()));

  expect(
    found,
    `${path} should say "${faces[0]}" — the code has ${count} ${noun}. ` +
      `Whichever sentence states it is now wrong.`,
  ).toBe(true);
}

/** Every `+server.ts` under `src/routes/api`, at any depth. */
function endpoints(directory: string): number {
  let total = 0;
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) total += endpoints(path);
    else if (entry === '+server.ts') total += 1;
  }
  return total;
}

/** Every source file of every workspace, for the tests that read the source. */
function sources(directory: string, found: string[] = []): string[] {
  for (const entry of readdirSync(directory)) {
    if (['node_modules', 'dist', '.svelte-kit', 'coverage'].includes(entry)) continue;
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) sources(path, found);
    else if (/\.(ts|svelte)$/.test(path)) found.push(path);
  }
  return found;
}

/** The `COMMANDS` tuple of the CLI, read as text: the test must not import it. */
function cliCommands(): number {
  const source = read('packages/core/src/cli.ts');
  const declaration = /const COMMANDS = \[([^\]]*)\] as const;/.exec(source);
  expect(declaration, 'cli.ts should declare COMMANDS as an array literal').not.toBeNull();
  return (declaration?.[1].match(/'[a-z]+'/g) ?? []).length;
}

describe('the counts the documents state', () => {
  it('names as many REST endpoints as there are', () => {
    const count = endpoints(join(ROOT, 'apps/web/src/routes/api'));
    expect(count).toBeGreaterThan(0);
    expectCount('docs/architecture.md', count, 'GET endpoints');
  });

  it('names as many sections as the nav lists', () => {
    expectCount('docs/architecture.md', SECTIONS.length, 'sections');
  });

  it('names as many CLI commands as the CLI takes', () => {
    expectCount('docs/architecture.md', cliCommands(), 'commands');
  });

  it('names as many boards as the consultation offers', () => {
    expectCount('README.md', INSTRUMENTS.length, 'boards');
  });

  it('names as many notes pages as the section has', () => {
    // They are under the footer and are not sections, so the count sits
    // beside the sections' rather than inside it — and it is asserted for the
    // same reason theirs is.
    expectCount('docs/architecture.md', NOTE_PAGES.length, 'notes pages');
  });

  /**
   * `docs/agent-prompt.md` is the one document written *to* a caller, and it
   * had gone stale in the way a hand-kept list goes stale: 紫微斗數 landed, and
   * the page went on naming `bazi/prompt`, `qizheng/prompt` and
   * `taiyi/prompt` as the boards that take no question, with no `/api/ziwei`
   * anywhere in it. Nothing could have noticed — every sentence was true when
   * it was written.
   *
   * So the address list is asserted rather than trusted. What is checked is
   * that each endpoint is *named*, not the shape of the example around it: a
   * page free to explain an endpoint however it likes, and not free to leave
   * one out.
   */
  it('names every endpoint an agent can call', () => {
    const document = read('docs/agent-prompt.md');
    const root = join(ROOT, 'apps/web/src/routes/api');

    const paths = (directory: string, prefix = '/api'): string[] =>
      readdirSync(directory).flatMap((entry) => {
        const path = join(directory, entry);
        if (statSync(path).isDirectory()) return paths(path, `${prefix}/${entry}`);
        return entry === '+server.ts' ? [prefix] : [];
      });

    const named = paths(root);
    expect(named.length).toBeGreaterThan(0);
    expect(
      named.filter((endpoint) => !document.includes(endpoint)),
      'docs/agent-prompt.md does not name these endpoints.',
    ).toEqual([]);
  });

  it('lists the languages the project actually speaks', () => {
    /**
     * `docs/i18n.md` prints `LOCALES` in a code block, and how many there are
     * is a state rather than a design: Spanish is on the roadmap and the page
     * says so. A page that went on printing two after a third landed would be
     * wrong about the one thing it is the home of — and the same page tells
     * the reader this test holds it, so the claim has to be true.
     */
    const page = read('docs/i18n.md');
    const declaration = /export const LOCALES = \[([^\]]*)\] as const;/.exec(page);
    expect(declaration, 'docs/i18n.md should print the LOCALES declaration').not.toBeNull();
    expect((declaration?.[1].match(/'([a-z]+)'/g) ?? []).map((tag) => tag.slice(1, -1))).toEqual([
      ...LOCALES,
    ]);
  });
});

describe('the documents point where they say they point', () => {
  /**
   * The reorganisation traded length for links, which trades one failure for
   * another: a rule in `CLAUDE.md` is now a line and a pointer, and a pointer
   * to a file that does not exist is worse than the paragraph it replaced.
   */
  const linked = (path: string): string[] => {
    const document = read(path);
    return [...document.matchAll(/\]\(([^)#]+\.(?:md|tsv))(?:#[^)]*)?\)/g)]
      .map((match) => match[1])
      .filter((target) => !target.startsWith('http'));
  };

  /**
   * `docs/README.md` is the index, and an index that misses a page is worse
   * than none: the page it misses is the one nobody finds and everybody
   * duplicates. The link check below says the table points at files that
   * exist; this says the files that exist are in the table.
   */
  it('docs/README.md lists every page in docs/', () => {
    const index = read('docs/README.md');
    for (const entry of readdirSync(join(ROOT, 'docs'))) {
      if (entry === 'README.md' || entry === 'history') continue;
      if (!/\.(md|tsv)$/.test(entry)) continue;
      expect(index.includes(`(${entry})`), `docs/README.md does not list ${entry}`).toBe(true);
    }
  });

  /**
   * Every page that links, and not the four that were listed here.
   *
   * The check began at the files a reader arrives through, which is where the
   * pointers were being added at the time. But `docs/` links inside itself —
   * `notes.md` sends a reader to `sources.md` for what an agreement is worth,
   * `parameters.md` sends them there for what a second copy of a text buys —
   * and those were the pointers nothing read. The list is now derived, so a
   * page added to `docs/` is covered the day it lands.
   */
  const linking = [
    'CLAUDE.md',
    'README.md',
    'ROADMAP.md',
    ...readdirSync(join(ROOT, 'docs'))
      .filter((entry) => entry.endsWith('.md'))
      .map((entry) => `docs/${entry}`),
  ];

  for (const source of linking) {
    it(`${source} links only to files that exist`, () => {
      for (const target of linked(source)) {
        const base = source.includes('/') ? source.slice(0, source.lastIndexOf('/') + 1) : '';
        expect(() => statSync(join(ROOT, base, target)), `${source} → ${target}`).not.toThrow();
      }
    });
  }

  /**
   * The phases the source cites are phases that exist.
   *
   * A comment saying «see `docs/history/` phase 21» is a pointer no tool can
   * follow: it is not a path, deliberately — `docs/` owns what binds and a
   * rule may not link into a phase — so nothing checks it, and thirty-odd of
   * them point wherever the numbering last left them. Renumber a phase and the
   * citations go on naming a file that has moved, in silence.
   *
   * The number is what is checked and not the shape of the sentence: whatever
   * a comment says around it, the phase it names has a file.
   */
  it('cites only phases that exist', () => {
    const phases = new Set(
      readdirSync(join(ROOT, 'docs/history'))
        .map((entry) => /^(\d+)-/.exec(entry)?.[1])
        .filter(Boolean)
        .map((number) => Number(number)),
    );
    expect(phases.size).toBeGreaterThan(0);

    const cited = new Map<number, string[]>();
    for (const path of sources(join(ROOT, 'packages')).concat(sources(join(ROOT, 'apps')))) {
      const text = readFileSync(path, 'utf8');
      for (const match of text.matchAll(/docs\/history\/`?\s*phases?\s+(\d+)(?:\s+and\s+(\d+))?/g)) {
        for (const number of [match[1], match[2]].filter(Boolean)) {
          const at = Number(number);
          cited.set(at, [...(cited.get(at) ?? []), path.slice(ROOT.length)]);
        }
      }
    }
    expect(cited.size, 'the source should cite some phases').toBeGreaterThan(0);

    const missing = [...cited].filter(([number]) => !phases.has(number));
    expect(
      missing.map(([number, where]) => `phase ${number} (${where.join(', ')})`),
      'A source comment names a phase file that is not in docs/history/.',
    ).toEqual([]);
  });

  it('keeps the history out of the rules', () => {
    /**
     * `docs/history/` is never normative, so nothing that binds a change may
     * cite it as the reason for anything. `CLAUDE.md` may name the directory
     * — it has to, to say what it is for — but may not link into a phase.
     */
    const rules = read('CLAUDE.md');
    const intoAPhase = /docs\/history\/[0-9]/.exec(rules);
    expect(
      intoAPhase,
      'CLAUDE.md cites a phase file. A rule stands on docs/, not on how it came about.',
    ).toBeNull();
  });
});

/**
 * The register of quantities, against the page that says how to read it and
 * the page it indexes.
 *
 * `docs/sources.tsv` is four columns of prose and two of vocabulary, and both
 * of the second kind can go quietly wrong: a `rung` outside the ladder means
 * nothing, and a `section` naming an argument that has been renamed is a row
 * a reader cannot follow. Neither is visible by eye in a register this long.
 *
 * The allowed rungs are read out of `docs/notes.md` rather than written here,
 * for the reason the counts above are read out of the code: that page is where
 * the ladder is defined, and a test carrying its own copy would be a second
 * definition free to disagree with the first.
 */
describe('docs/sources.tsv', () => {
  /**
   * The columns are read out of `docs/notes.md`, for the reason the rungs are:
   * that page defines the register and a test carrying its own copy would be a
   * second definition free to disagree with the first. The table there is one
   * row a column, the name in backticks in the first cell.
   */
  const COLUMNS = [...read('docs/notes.md').matchAll(/^\| `([a-z_]+)` \| /gm)].map(
    (match) => match[1] as string,
  );

  const register = (): Record<string, string>[] => {
    const [header, ...lines] = read('docs/sources.tsv').trim().split('\n');
    expect(header?.split('\t'), 'the register should carry the columns docs/notes.md lists').toEqual(
      COLUMNS,
    );
    return lines.map((line) => {
      const cells = line.split('\t');
      expect(cells.length, line.slice(0, 60)).toBe(COLUMNS.length);
      return Object.fromEntries(COLUMNS.map((column, index) => [column, cells[index] as string]));
    });
  };

  it('fills every cell of every row', () => {
    const rows = register();
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      for (const column of COLUMNS) {
        expect(row[column]?.trim(), `${row.quantity} · ${column}`).toBeTruthy();
      }
    }
  });

  it('weighs each quantity on a rung docs/notes.md declares', () => {
    // The ladder's own table: `| **0** | **Measured…` and the dash beneath it.
    const ladder = read('docs/notes.md');
    const declared = new Set(
      [...ladder.matchAll(/^\| \*\*([0-9])\*\* \|/gm)].map((match) => match[1] as string),
    );
    expect(declared.size, 'docs/notes.md should declare the rungs in a table').toBeGreaterThan(1);
    // The row that is not a number: a quantity the engine carries with nothing
    // registered behind it. It is a claim like any other and has to be one of
    // the values, or a blank cell would pass for it.
    declared.add('-');
    expect(ladder).toContain('**Nothing registered.**');

    for (const row of register()) {
      expect(declared.has(row.rung as string), `${row.quantity} is on rung ${row.rung}`).toBe(true);
    }
  });

  /**
   * Attribution travels in a column and the column has to be readable.
   *
   * `school` says which declared value a quantity stands under — `huoling:
   * fixed`, `yuan: futou` — in the grammar a caller passes, which is the same
   * grammar `ROADMAP.md` § 1 is held to. Written in prose it would be a second
   * name for a commitment the engine already names, and the two would part:
   * a value renamed in `parameters.ts` would leave the register pointing at a
   * school nothing computes, silently, in a file nobody reads end to end.
   *
   * `—` is the other legal cell and means the quantity is carried as the
   * tradition's own. It is a claim, which is why a blank does not pass for it.
   */
  it('attributes each quantity to a value the engine declares', () => {
    const declared = new Map<string, string>(
      PARAMETERS.flatMap((parameter) =>
        parameter.values
          .filter((value) => typeof value.id === 'string')
          .map((value): [string, string] => [
            `${parameter.id}: ${String(value.id)}`,
            parameter.board,
          ]),
      ),
    );

    for (const row of register()) {
      const school = row.school as string;
      if (school === '—') continue;
      expect(
        declared.has(school),
        `docs/sources.tsv attributes "${row.quantity}" to ${school}, which ` +
          `packages/core/src/parameters.ts does not declare.`,
      ).toBe(true);
      expect(
        declared.get(school),
        `docs/sources.tsv puts ${school} on a ${row.board} row`,
      ).toBe(row.board);
    }
  });

  it('points at arguments docs/sources.md actually makes', () => {
    const headings = new Set(
      [...read('docs/sources.md').matchAll(/^#{2,4} (.+)$/gm)].map((match) =>
        (match[1] as string).trim(),
      ),
    );
    for (const row of register()) {
      expect(
        headings.has(row.section as string),
        `docs/sources.tsv sends "${row.quantity}" to a section docs/sources.md does not have: ` +
          `"${row.section}".`,
      ).toBe(true);
    }
  });

  it('weighs something on every layer the engine declares a parameter for', () => {
    // A board that has a school divergence and no quantity in the register is
    // a board somebody can configure and nobody can weigh — which is the state
    // `CLAUDE.md` says the register exists to prevent.
    const weighed = new Set(register().map((row) => row.board));
    for (const board of new Set(PARAMETERS.map((parameter) => parameter.board))) {
      expect(weighed.has(board), `nothing in docs/sources.tsv stands for ${board}`).toBe(true);
    }
  });
});

/**
 * `ROADMAP.md` § 1 names what the engine refuses, and the engine is what says.
 *
 * This is the counts rule applied to a list: a table of what the code does,
 * kept by hand, drifts the moment the code moves, and it drifted — two values
 * were still listed as open after they had landed. So the table is asserted
 * both ways. A value's name is written there as `` `parameter: value` ``,
 * which is how a caller passes it, and that is the whole grammar this reads.
 *
 * An `id` is unique only within its board, so a pair that is refused on one
 * board and computed on another says nothing on its own and is skipped for
 * the second assertion — `yearBoundary: chunjie` is 太乙's refusal and the
 * pillars' default at once.
 */
describe('ROADMAP.md says what the engine refuses', () => {
  const SECTION = /^## 1\..*?$([\s\S]*?)^## /m;

  const section = (): string => {
    const found = SECTION.exec(read('ROADMAP.md'));
    expect(found, 'ROADMAP.md has no § 1 to read').not.toBeNull();
    return (found as RegExpExecArray)[1] as string;
  };

  /** Every declared value as the pair a caller would pass, with its verdict. */
  const pairs = (): Map<string, Set<boolean>> => {
    const verdicts = new Map<string, Set<boolean>>();
    for (const parameter of PARAMETERS) {
      for (const value of parameter.values) {
        if (typeof value.id !== 'string') continue;
        const pair = `${parameter.id}: ${value.id}`;
        const seen = verdicts.get(pair) ?? new Set<boolean>();
        seen.add(value.implemented);
        verdicts.set(pair, seen);
      }
    }
    return verdicts;
  };

  it('names every value the engine refuses', () => {
    const open = section();
    for (const [pair, verdicts] of pairs()) {
      if (verdicts.has(true)) continue;
      expect(open.includes(`\`${pair}\``), `ROADMAP.md § 1 does not name ${pair}`).toBe(true);
    }
  });

  it('names nothing the engine has started computing', () => {
    const open = section();
    for (const [pair, verdicts] of pairs()) {
      if (verdicts.has(false)) continue;
      expect(
        open.includes(`\`${pair}\``),
        `ROADMAP.md § 1 still calls ${pair} refused, and the engine computes it`,
      ).toBe(false);
    }
  });
});

/**
 * Every field a board hands out, against the row of the register that weighs
 * it.
 *
 * **What this catches, and what it does not.** A field added to a board's
 * output fails here until somebody says which quantity of `docs/sources.tsv`
 * stands behind it, or states in the waiver below why it is not a quantity at
 * all — which is how 三基, 五福, 大遊, 八門直使 and 合神 came to be computed and
 * printed for a year with no row anywhere. What it cannot see is a **new member
 * of a list that already has a field**: 紫氣 arrived inside `remainders` and
 * this test would have watched it go by. That half stays procedural, and
 * `CLAUDE.md`'s rule — a quantity added without an entry is a quantity nobody
 * can weigh — is where it lives.
 *
 * The map is written out and the completeness is derived, which is the same
 * bargain `DIVERGENCES` makes: the link between an identifier and a quantity
 * argued in prose cannot be computed, but nothing can quietly fall outside it.
 */
describe('the register weighs what a board hands out', () => {
  /** Weighed: the field, and the `quantity` of every row that stands behind it. */
  const WEIGHED: Record<string, Record<string, readonly string[]>> = {
    qimen: {
      ju: ['the ju under 拆補, the yuan from the 符頭'],
      instrument: ['the heaven plate, the nine stars, the eight gates, the eight spirits, 值符, 值使, 旬首, 空亡, 驛馬'],
      chief: ['the heaven plate, the nine stars, the eight gates, the eight spirits, 值符, 值使, 旬首, 空亡, 驛馬'],
      chiefGate: ['the heaven plate, the nine stars, the eight gates, the eight spirits, 值符, 值使, 旬首, 空亡, 驛馬'],
      palaces: ['the earth plate', 'the heaven plate, the nine stars, the eight gates, the eight spirits, 值符, 值使, 旬首, 空亡, 驛馬'],
      season: ['旺相休囚死, 門宮, 星宮'],
      horses: ['驛馬'],
      patterns: ['門迫', '五不遇時', '入墓 and 六儀擊刑', '十干克應 — the twelve pairings shipped'],
    },
    bazi: {
      pillars: ['the four pillars'],
      emptyBranches: ['納音, hidden stems, ten gods, twelve stages, void branches, the luck cycles'],
      distribution: ['the count of the five elements'],
    },
    ziwei: {
      lunar: ['the lunar date'],
      countedMonth: ['the twelve palaces, the bureau, 紫微 and the fourteen main stars'],
      yearPillar: ['the four pillars'],
      minggongPillar: ['the twelve palaces, the bureau, 紫微 and the fourteen main stars'],
      nayin: ['納音, hidden stems, ten gods, twelve stages, void branches, the luck cycles'],
      bureau: ['the twelve palaces, the bureau, 紫微 and the fourteen main stars'],
      palaces: [
        'the twelve palaces, the bureau, 紫微 and the fourteen main stars',
        'the brightness grades',
        '天刑 and 天姚',
        '火星 and 鈴星',
        '解神',
        'the 四化 at 庚',
        'the 四化 at 壬, the reading two schools move',
        'the five phases the board is inked by',
      ],
      bodyBranch: ['the twelve palaces, the bureau, 紫微 and the fourteen main stars'],
      lifeMaster: ['the twelve palaces, the bureau, 紫微 and the fourteen main stars'],
      bodyMaster: ['身主'],
    },
    taiyi: {
      year: ['the 太歲 the count yields'],
      sui: ['the 太歲 the count yields'],
      accumulated: ['the epoch — 上元積年'],
      liuji: ['the epoch — 上元積年'],
      ju: ['the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神'],
      taiyi: [
        'the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神',
        'the nine palaces, numbered one seat off the 洛書',
      ],
      gods: [
        'the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神',
        'the nine palaces, numbered one seat off the 洛書',
        'the element of each of the sixteen seats',
      ],
      yang: ['the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神'],
      wenchang: ['the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神'],
      shiji: ['the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神'],
      jishen: ['the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神'],
      heshen: ['合神 — the 六合 of the 太歲'],
      host: ['the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神', '大將 and 參將'],
      guest: ['the placements — 太乙宮, 天目, 主算, 客目, 客算, 計神', '大將 and 參將'],
      patterns: [
        'the conditions of 卷三 — 掩, 擊, 迫, 關',
        'the conditions of 卷三 — 囚, 格, 對, whose subjects two lineages dispute',
      ],
      gate: ['八門直使 — one gate every thirty years'],
      sanji: ['三基 — 君基, 臣基, 民基'],
      wufu: ['五福太乙'],
      dayou: ['大遊太乙'],
    },
    liuren: {
      yuejiang: ['the four courses, 月將加時 and the 寄宮 table'],
      heaven: ['the four courses, 月將加時 and the 寄宮 table'],
      courses: ['the four courses, 月將加時 and the 寄宮 table'],
      generals: ['the 貴人 seat, by day and by night', 'the five-phase assignments of the 十二天將'],
      half: ['which hours are 晝 and which 夜'],
      transmissions: ['the three transmissions and the 九宗門', '返吟'],
      rule: ['the three transmissions and the 九宗門'],
      keti: ['the three transmissions and the 九宗門'],
    },
    qizheng: {
      governors: ['the places of the seven governors'],
      remainders: ['四餘 — 羅睺, 計都, 月孛', '紫氣 — the fourth 餘, placed to a palace and to no degree'],
      minggong: ['命宮 by 立命 加時'],
      houses: ['the twelve 人事宮'],
    },
  };

  /** Not a quantity, and why. A blank does not pass for a reason. */
  const NOT_WEIGHED: Record<string, string> = {
    moment: 'the instant, whose own readings are weighed under the pillars',
    options: 'the divergences that produced the board, weighed as schools and not as quantities',
    dayMaster: "the day pillar's stem, read off a pillar the register weighs",
    hourStem: "the hour pillar's stem, read off a pillar the register weighs",
    hourBranch: 'the hour of the moment, which the pillars carry',
    day: 'the day pillar, weighed under the pillars',
    hour: 'the hour branch, weighed under the pillars',
    julianDay: 'the instant itself, in the scale the ephemeris answers in',
  };

  const laid = (): Record<string, object> => {
    const ephemeris = initEphemeris();
    const moment = resolveMoment(
      { date: '1968-03-12', time: '14:30', timezone: 'Asia/Shanghai' },
      { latitude: 31.23, longitude: 121.47, timezone: 'Asia/Shanghai' } as never,
      DEFAULT_OPTIONS,
      ephemeris,
    );
    return {
      qimen: computeQimenChart(moment, moment.options),
      bazi: computeBazi(moment, {}, ephemeris),
      ziwei: computeZiwei(moment, DEFAULT_ZIWEI_OPTIONS),
      taiyi: taiyiBoard({ year: 2026 }, DEFAULT_TAIYI_OPTIONS),
      liuren: liurenBoard(
        { term: moment.solarTerm.term, day: moment.pillars.day, hour: moment.hourBranch },
        DEFAULT_LIUREN_OPTIONS,
      ),
      qizheng: qizhengBoard(
        { julianDay: moment.julianDayUT, hour: moment.hourBranch },
        DEFAULT_QIZHENG_OPTIONS,
        ephemeris,
      ),
    };
  };

  const boards = laid();

  it.each(Object.keys(boards))('%s hands out nothing the register has not heard of', (board) => {
    const weighed = WEIGHED[board] ?? {};
    for (const field of Object.keys(boards[board] as object)) {
      const stated = field in weighed || field in NOT_WEIGHED;
      expect(
        stated,
        `${board}.${field} is handed out and docs/sources.tsv weighs nothing for it. ` +
          'Give it the quantity that stands behind it, or say in NOT_WEIGHED why it is not one.',
      ).toBe(true);
    }
  });

  it('names quantities the register actually carries', () => {
    const quantities = new Set(
      readFileSync(join(ROOT, 'docs/sources.tsv'), 'utf8')
        .trim()
        .split('\n')
        .slice(1)
        .map((line) => line.split('\t')[1] as string),
    );

    for (const [board, fields] of Object.entries(WEIGHED)) {
      for (const [field, named] of Object.entries(fields)) {
        expect(named.length, `${board}.${field} names no quantity`).toBeGreaterThan(0);
        for (const quantity of named) {
          expect(
            quantities.has(quantity),
            `${board}.${field} is weighed by "${quantity}", which docs/sources.tsv does not carry`,
          ).toBe(true);
        }
      }
    }
  });

  it('gives a reason for every field it calls not a quantity', () => {
    for (const [field, reason] of Object.entries(NOT_WEIGHED)) {
      expect(reason.trim(), field).toBeTruthy();
    }
  });
});
