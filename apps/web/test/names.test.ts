import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LOCALES, createTranslator, type MessageKey } from '@shipan/i18n';
import { PAGES } from '../src/lib/meta';
import { namesApart } from '../src/lib/names';

/**
 * The readings set apart from the sentences they stand in.
 *
 * **The rule in `said.ts` finds rather than is told**, which is the only way
 * to keep markup out of the catalogs and is also the way to get it wrong
 * quietly: a reading is a run of romanised syllables carrying tone marks, and
 * Italian is a language of accented vowels. «è» stands directly behind 式盤
 * shìpán in the consultation's opening line, and there is nothing in its shape
 * that says it is not a third syllable of the name.
 *
 * So the guard is here rather than in a list of words in the module. Every
 * name either catalog prints in an introduction is held to the reading this
 * project gives it: too little marked fails, too much marked fails, and a
 * paragraph that puts a reading somewhere other than behind its glyphs fails.
 * A third vernacular is covered by the same list, since a name does not
 * translate — see `docs/i18n.md`.
 */

/**
 * Every name that appears in an introduction, and how it is read.
 *
 * Written out, and it is the one list in this file that is: what a test of
 * *finding* cannot do is derive the answer from the same rule it is checking.
 * Ten names, and each is a fact about the language rather than about the code
 * — 拆補 is chāibǔ whatever this repository does next.
 */
const READINGS: Readonly<Record<string, string>> = {
  式盤: 'shìpán',
  奇門遁甲: 'qímén dùnjiǎ',
  大六壬: 'dà liùrén',
  太乙神數: 'tàiyǐ shénshù',
  七政四餘: 'qīzhèng sìyú',
  紫微斗數: 'zǐwēi dǒushù',
  八字: 'bāzì',
  拆補: 'chāibǔ',
  洛書: 'luòshū',
  納音: 'nàyīn',
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
        const expected = Object.entries(READINGS)
          .filter(([glyphs]) => text.includes(glyphs))
          .sort(([, a], [, b]) => text.indexOf(a) - text.indexOf(b))
          .map(([, reading]) => reading);
        expect(marked, `${locale} · ${key}`).toEqual(expected);
      }
    }
  });

  it('cuts a name into its two halves and the space between them', () => {
    // The case the rule is narrow for — «è» stands behind the reading and is
    // an Italian word, not a third syllable — kept as its own line so that
    // what fails when it breaks says which part of it went.
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
