import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LOCALES, createTranslator, type MessageKey } from '@shipan/i18n';
import { PAGES } from '../src/lib/meta';
import { saidApart } from '../src/lib/said';

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
          saidApart(text)
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
        const marked = saidApart(text)
          .filter((segment) => segment.said)
          .map((segment) => segment.text);
        const expected = Object.entries(READINGS)
          .filter(([glyphs]) => text.includes(glyphs))
          .sort(([, a], [, b]) => text.indexOf(a) - text.indexOf(b))
          .map(([, reading]) => reading);
        expect(marked, `${locale} · ${key}`).toEqual(expected);
      }
    }
  });

  it('leaves an Italian word behind a name alone', () => {
    // The case the rule is narrow for, kept as its own line so that what fails
    // when it breaks says which of the two it was.
    const [glyphs, said, rest] = saidApart('式盤 shìpán è la tavola del divinatore');
    expect(glyphs?.text).toBe('式盤 ');
    expect(said).toEqual({ text: 'shìpán', said: true });
    expect(rest?.text).toBe(' è la tavola del divinatore');
  });

  it('finds nothing in a sentence with no name in it', () => {
    const plain = 'Criteri, non raccomandazioni: e questo è tutto.';
    expect(saidApart(plain)).toEqual([{ text: plain, said: false }]);
  });

  it('leaves glyphs with no reading beside them unmarked', () => {
    // 120°E and the glyphs in `intro.b` that stand alone: a name is not always
    // followed by its reading in the same clause, and nothing may be invented.
    expect(saidApart('sul 洛書 e basta').filter((segment) => segment.said)).toEqual([]);
  });
});

describe('the component that sets them apart', () => {
  it('is the only place the rule is spread', () => {
    // `said.ts` returns data and never markup; a second reader of it building
    // its own `<i>` is how two paragraphs on one site start disagreeing.
    const src = fileURLToPath(new URL('../src/', import.meta.url));
    const intro = readFileSync(`${src}lib/components/SectionIntro.svelte`, 'utf8');
    expect(intro).toContain('<i>{segment.text}</i>');
  });
});
