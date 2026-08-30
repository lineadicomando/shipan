import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as engine from '@shipan/core';
import { LOCALES, catalogs, createTranslator, type MessageKey } from '@shipan/i18n';
import { PAGES } from '../src/lib/meta';
import { namesApart } from '../src/lib/names';

/**
 * The readings set apart from the sentences they stand in.
 *
 * **The rule in `said.ts` finds rather than is told**, which is the only way
 * to keep markup out of the catalogs and is also the way to get it wrong
 * quietly: a reading is a run of romanised syllables carrying tone marks, and
 * Italian is a language of accented vowels. «Lo 式盤 shìpán è la tavola del
 * divinatore» opened the consultation for as long as it did, and there is
 * nothing in the shape of «è» that says it is not a third syllable of the
 * name.
 *
 * So the guard is here rather than in a list of words in the module. Every
 * name either catalog prints in an introduction is held to the reading this
 * project gives it: too little marked fails, too much marked fails, and a
 * paragraph that puts a reading somewhere other than behind its glyphs fails.
 * A third vernacular is covered by the same list, since a name does not
 * translate — see `docs/i18n.md`.
 */

/**
 * The names a catalog prints that no board of this engine ever places, and how
 * they are read.
 *
 * Written out, and it is the one list in this file that is: what a test of
 * *finding* cannot do is derive the answer from the same rule it is checking.
 * Each is a fact about the language rather than about the code — 拆補 is chāibǔ
 * whatever this repository does next.
 *
 * **What is here is what the engine cannot say.** A gate, a lodge, a star, a
 * stem and a parameter's value all travel with their reading on them, so
 * `SAID` below takes those from the engine and this list stays at what prose
 * names and no board seats: the arts said in short (奇門, 六壬, 太乙) and the
 * three of them taken together (三式), the discipline a section performs
 * (擇日), the things this project refuses to compute (用神, 年命, 主, 客), the
 * three kinds of instrument (卜, 命, 天), two books, one man, and the
 * collective names of two almanac layers whose *members* the engine knows one
 * by one.
 */
const READINGS: Readonly<Record<string, string>> = {
  式盤: 'shìpán',
  式: 'shì',
  三式: 'sānshì',
  擇日: 'zérì',
  奇門遁甲: 'qímén dùnjiǎ',
  奇門: 'qímén',
  遁甲演義: 'dùnjiǎ yǎnyì',
  大六壬: 'dà liùrén',
  六壬: 'liùrén',
  太乙神數: 'tàiyǐ shénshù',
  太乙: 'tàiyǐ',
  七政四餘: 'qīzhèng sìyú',
  紫微斗數: 'zǐwēi dǒushù',
  八字: 'bāzì',
  拆補: 'chāibǔ',
  洛書: 'luòshū',
  納音: 'nàyīn',
  年命: 'niánmìng',
  用神: 'yòngshén',
  門迫: 'ménpò',
  // The chief gate. The engine seats 值符 as a spirit and so can say it; its
  // twin is a compound prose names and no board carries.
  值使: 'zhíshǐ',
  上元積年: 'shàngyuánjīnián',
  十八飛星: 'shíbāfēixīng',
  宿: 'xiù',
  宿度: 'xiùdù',
  建除: 'jiànchú',
  神煞: 'shénshà',
  一宮: 'yīgōng',
  卷二: 'juàn èr',
  湯若望: 'Tāng Ruòwàng',
  全集: 'quánjí',
  全書: 'quánshū',
  // The two prints a value of `spirits` is named against, said where the form
  // offers the choice. Neither is a board this engine seats.
  御定奇門寶鑑: 'yùdìngqíménbǎojiàn',
  奇門遁甲全局: 'qíméndùnjiǎquánjú',
  // And the print the far side of `centreTravel` is named against. 御定奇門寶鑑
  // above stands on the near side of that one too.
  奇門遁甲金鏡寶鑑: 'qíméndùnjiǎjīnjìngbǎojiàn',
  捷覽: 'jiélǎn',
  // The two lineages that move 壬's 科 to 左輔, named where a value of `sihua`
  // is argued. Neither is a board this engine seats, so neither can be dug
  // out of it — and a school named in prose is exactly what this list is for.
  中州派: 'zhōngzhōupài',
  北派: 'běipài',
  科: 'kē',
  餘: 'yú',
  卜: 'bǔ',
  命: 'mìng',
  天: 'tiān',
  主: 'zhǔ',
  客: 'kè',
};

/**
 * Every name the engine carries, taken from the engine.
 *
 * **The half of `SAID` that is derived, and it is much the larger half.**
 * `core` gives every named thing a `hanzi` and a `pinyin` beside it and
 * `packages/core/test/pinyin.test.ts` holds the lot to one toned syllable a
 * character, so the reading of a gate, a lodge, a star, a stem or a
 * parameter's value is already a decided fact — writing it out a second time
 * here would be a copy to keep, and a board landing with names of its own
 * would leave them out of this test in silence.
 *
 * Dug out rather than listed registry by registry for the same reason.
 * `test/glyphs.test.ts` names two dozen registries and exists to keep a
 * *copy* honest; this needs no copy, and an enumeration here would be one more
 * list going stale the day `PARAMETERS` gains an entry. Finding more names
 * than a catalog uses costs nothing: what is built is a dictionary to look
 * readings up in, not a roster to exhaust.
 */
const engineReadings = (): Map<string, string> => {
  const found = new Map<string, string>();
  const seen = new WeakSet<object>();

  const dig = (value: unknown, depth: number): void => {
    if (typeof value !== 'object' || value === null || depth > 6 || seen.has(value)) return;
    seen.add(value);

    const named = value as { hanzi?: unknown; pinyin?: unknown };
    if (typeof named.hanzi === 'string' && typeof named.pinyin === 'string')
      found.set(named.hanzi, named.pinyin);

    for (const child of Object.values(value)) dig(child, depth + 1);
  };

  for (const exported of Object.values(engine)) dig(exported, 0);
  return found;
};

/** How every glyph either catalog prints is said: the engine's, then the written. */
const SAID = new Map<string, string>([...engineReadings(), ...Object.entries(READINGS)]);

/**
 * A name without the brackets a book wears.
 *
 * `namesApart` keeps 《》 with the glyphs, because they are set in the same
 * face; a reading is looked up under the name itself.
 */
const bare = (glyphs: string): string => glyphs.replace(/^[《〈]|[》〉]$/gu, '');

/** Whether a run of glyphs stands on its own rather than inside a longer name. */
const standsAlone = (glyphs: string, text: string): boolean =>
  new RegExp(`(?<!\\p{Script=Han})${glyphs}(?!\\p{Script=Han})`, 'u').test(text);

/**
 * Every message a *person* reads, in one vernacular.
 *
 * **The prompts are excluded, and by prefix rather than by judgement.** The
 * reader of a `prompt.` message is a model, and a model does not need to
 * pronounce 命宮 to work with it: a reading there would lengthen a prompt
 * without adding anything read off it. Everything else in the catalogs is
 * addressed to somebody — a form, an error, a note, a line of `--help` — and
 * that is the whole of the distinction.
 */
const readByAPerson = (locale: (typeof LOCALES)[number]): { key: MessageKey; text: string }[] =>
  Object.entries(catalogs[locale])
    .filter(([key]) => !key.startsWith('prompt.'))
    .map(([key, text]) => ({ key: key as MessageKey, text }));

/** The glyphs in a message that the message does not say. */
const unsaid = (text: string): string[] => {
  const segments = namesApart(text);
  const runs = new Map<string, boolean>();

  for (const [at, segment] of segments.entries()) {
    if (segment.part !== 'glyph') continue;
    // What may follow a name is the space between the halves and then the
    // reading; anything else and this occurrence goes unread.
    const reading = segments.slice(at + 1, at + 3).find((next) => next.part === 'said');
    const said = reading !== undefined && reading.text === SAID.get(bare(segment.text));
    runs.set(segment.text, (runs.get(segment.text) ?? false) || said);
  }

  return [...runs].filter(([, said]) => !said).map(([run]) => run);
};

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.svelte') ? [path] : [];
  });

/** Every paragraph a section opens with, in one vernacular. */
const introsOf = (locale: (typeof LOCALES)[number]): { key: MessageKey; text: string }[] => {
  const t = createTranslator(locale);
  return Object.values(PAGES)
    .flatMap((meta) => meta.intro ?? [])
    .map((key) => ({ key, text: t(key) }));
};

describe('a reading standing inside a sentence', () => {
  it('gives back the sentence it was given', () => {
    for (const locale of LOCALES) {
      for (const { key, text } of introsOf(locale)) {
        expect(
          namesApart(text)
            .map((segment) => segment.text)
            .join(''),
          `${locale} · ${key}`,
        ).toBe(text);
      }
    }
  });

  it('marks the reading of every name, and marks nothing else', () => {
    for (const locale of LOCALES) {
      for (const { key, text } of introsOf(locale)) {
        const marked = namesApart(text)
          .filter((segment) => segment.part === 'said')
          .map((segment) => segment.text);
        // A name has to stand on its own to be one: 太乙 is inside 太乙神數 and
        // 六壬 inside 大六壬, and a plain `includes` would expect a second
        // reading behind glyphs that are part of a longer name.
        const expected = Object.entries(READINGS)
          .filter(([glyphs]) => standsAlone(glyphs, text))
          .sort(([, a], [, b]) => text.indexOf(a) - text.indexOf(b))
          .map(([, reading]) => reading);
        expect(marked, `${locale} · ${key}`).toEqual(expected);
      }
    }
  });

  it('cuts a name into its two halves and the space between them', () => {
    // The case the rule is narrow for — «è» stands behind the reading and is
    // an Italian word, not a third syllable — kept as its own line so that
    // what fails when it breaks says which part of it went. Written out here
    // rather than read off a catalog: the sentence it was found in has since
    // been rewritten, and the collision it stands for has not gone anywhere.
    expect(namesApart('式盤 shìpán è la tavola del divinatore')).toEqual([
      { text: '式盤', part: 'glyph' },
      { text: ' ', part: 'plain' },
      { text: 'shìpán', part: 'said' },
      { text: ' è la tavola del divinatore', part: 'plain' },
    ]);
  });

  it('marks glyphs standing without a reading beside them', () => {
    // A name is not always read out in the clause it appears in, and the
    // glyphs want their face either way.
    expect(namesApart('sul 洛書 e basta')).toEqual([
      { text: 'sul ', part: 'plain' },
      { text: '洛書', part: 'glyph' },
      { text: ' e basta', part: 'plain' },
    ]);
  });

  it('finds nothing in a sentence with no name in it', () => {
    const plain = 'Criteri, non raccomandazioni: e questo è tutto.';
    expect(namesApart(plain)).toEqual([{ text: plain, part: 'plain' }]);
  });

  it('invents no reading where the sentence gives none', () => {
    expect(namesApart('sul 洛書 e basta').filter((segment) => segment.part === 'said')).toEqual([]);
  });
});

/**
 * The rule the whole project states and nothing used to enforce.
 *
 * A glyph shown to a person carries its reading, because a glyph alone is —
 * to the reader this is built for, who does not read Chinese — a shape with no
 * sound: unsayable, unsearchable, unaskable. `docs/i18n.md` § "A name carries
 * its reading" is the argument, `pinyin.test.ts` keeps the engine to it, and
 * for the length of this project's life the catalogs were kept to it by
 * nobody. Thirty-seven messages a vernacular had gone without.
 *
 * **This is the half that lasts.** The messages were a morning's work and
 * would have drifted back by the third board; what does not drift is a test
 * that fails the day somebody adds the thirty-eighth.
 */
describe('every glyph a person reads', () => {
  it('has a reading on file', () => {
    // The failure that keeps this test alive: a name nobody has declared how
    // to say. Any new glyph is one, since what the engine seats is derived and
    // what prose names is written down — so arriving here means neither
    // happened.
    const undeclared = new Set<string>();
    for (const locale of LOCALES)
      for (const { text } of readByAPerson(locale))
        for (const segment of namesApart(text))
          if (segment.part === 'glyph' && !SAID.has(bare(segment.text)))
            undeclared.add(segment.text);

    expect([...undeclared]).toEqual([]);
  });

  it('is said in the message that prints it', () => {
    // Once in a message and not once an occurrence: a note that names 年命
    // three times reads it the first time and is prose thereafter.
    const silent: string[] = [];
    for (const locale of LOCALES)
      for (const { key, text } of readByAPerson(locale)) {
        const runs = unsaid(text);
        if (runs.length) silent.push(`${locale} · ${key}: ${runs.join(' ')}`);
      }

    expect(silent).toEqual([]);
  });

  it('is read the same way in both vernaculars', () => {
    // A name does not translate, so a reading that differed between the two
    // catalogs would be one of them wrong. This is what caught 七政四餘 as
    // qīzhèng sìyú in an introduction and qīzhèngsìyú in a note.
    for (const [glyphs, reading] of SAID)
      for (const locale of LOCALES)
        for (const { key, text } of readByAPerson(locale)) {
          if (!standsAlone(glyphs, text)) continue;
          const found = namesApart(text)
            .filter((segment) => segment.part === 'said')
            .map((segment) => segment.text);
          const other = found.find(
            (word) => word !== reading && word.toLowerCase() === reading.toLowerCase().replace(/ /g, ''),
          );
          expect(other, `${locale} · ${key} · ${glyphs}`).toBeUndefined();
        }
  });
});

describe('the component that sets them apart', () => {
  const src = fileURLToPath(new URL('../src/', import.meta.url));
  const named = readFileSync(`${src}lib/components/Named.svelte`, 'utf8');

  it('draws both halves of a name', () => {
    expect(named).toContain('<span class="glyph">{segment.text}</span>');
    expect(named).toContain('<i>{segment.text}</i>');
  });

  it('is the only reader of the rule', () => {
    // `names.ts` returns data and never markup, so a second component building
    // its own spans is how two paragraphs on one site start disagreeing.
    const others = walk(`${src}lib`)
      .concat(walk(`${src}routes`))
      .filter((file) => !file.endsWith('Named.svelte'))
      .filter((file) => readFileSync(file, 'utf8').includes('namesApart'));
    expect(others).toEqual([]);
  });
});
