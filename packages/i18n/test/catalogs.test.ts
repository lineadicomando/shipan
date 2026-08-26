import { describe, expect, it } from 'vitest';
import { en } from '../src/catalogs/en.js';
import { loadCatalog, translatorOver } from '../src/translate.js';
import { it as italian } from '../src/catalogs/it.js';
import { LOCALES, catalogs, type MessageKey } from '../src/index.js';

/**
 * The typing already makes a missing Italian key a compilation error. These
 * tests cover what types cannot: a key left behind after an English one is
 * renamed, and a translation whose placeholders no longer match the original.
 */
describe('catalog parity', () => {
  it('covers every locale', () => {
    expect(Object.keys(catalogs).sort()).toEqual([...LOCALES].sort());
  });

  it('has the same keys in both directions', () => {
    expect(Object.keys(italian).sort()).toEqual(Object.keys(en).sort());
  });

  it('has no empty message', () => {
    for (const [locale, catalog] of Object.entries(catalogs)) {
      for (const [key, message] of Object.entries(catalog)) {
        expect(message.trim(), `${locale} / ${key}`).not.toBe('');
      }
    }
  });

  /**
   * A dash does not stand next to a glyph.
   *
   * **一 is a character, and a dash is the shape of it.** U+4E00 is `yī`,
   * one, a single horizontal stroke — and this engine prints it: 知一 is one
   * of the nine rules that draw the transmissions of 六壬. Beside hanzi, at
   * the size a browser falls back to for CJK, `—` and `–` are read as members
   * of the run rather than as punctuation, so «命 mìng — 八字, 七政四餘,
   * 紫微斗數 — takes a birth» arrives as a line of characters with two of them
   * unfamiliar.
   *
   * The reader this is for does not read Chinese and is meeting the names for
   * the first time, which is what makes it worse rather than better: somebody
   * fluent would know 一 does not belong there, and somebody learning the
   * shapes has no way to tell which of them are words.
   *
   * **This is about the writing system and not about a language**, so it
   * holds in both catalogs. Where the two met, an inciso became a pair of
   * parentheses and an introducing dash became a colon — neither of which
   * resembles anything in either script.
   *
   * Eight characters, not ten. Every one of the forty-nine that had to be
   * changed sat within eight; the nearest line that legitimately keeps a dash
   * is eleven away, `七政四餘 per case –`, where a Latin word stands between.
   * A bound at ten would pass today with one character of clearance, which is
   * not a bound, it is a coincidence waiting to be edited into a failure.
   *
   * What this cannot reach is the markup: `ChartReading` joins a name to its
   * palace and the mark there is a middle dot, argued where it is written.
   */
  it('keeps a dash away from a glyph', () => {
    const hanzi = /[㐀-鿿]/;
    for (const [locale, catalog] of Object.entries(catalogs)) {
      for (const [key, message] of Object.entries(catalog)) {
        for (const dash of message.matchAll(/[—–]/g)) {
          const around = message.slice(Math.max(0, dash.index - 8), dash.index + 9);
          expect(hanzi.test(around), `${locale} / ${key}: …${around}…`).toBe(false);
        }
      }
    }
  });

  /**
   * One apostrophe, and it is the one an apostrophe is.
   *
   * **The split this closes was visible and nobody could see it.** The notes
   * were written with `’` and everything else with `'`, so a reader crossing
   * from a section's introduction to the register that explains it — which is
   * the path `SectionIntro` now puts a link on — watched the apostrophe change
   * shape halfway. Neither half was wrong on its own, which is why it lasted:
   * a page is consistent with itself and a site is not.
   *
   * `’` U+2019 is the apostrophe; `'` U+0027 is the typewriter's stand-in for
   * it, and in a serif face at a reading size the difference is not subtle.
   * Italian spends one every few words, so the choice is made several hundred
   * times a page.
   *
   * It also takes the escapes out. In a single-quoted TypeScript string `'`
   * arrives written `\'`, and 175 Italian messages carried them; none of the
   * ones written with `’` did. The right character is the one the source is
   * easier to read in, which is a coincidence worth banking.
   *
   * Values only. A key is an identifier, and a comment is not read by anybody
   * the interface is for.
   */
  it('spells an apostrophe as an apostrophe', () => {
    for (const [locale, catalog] of Object.entries(catalogs)) {
      for (const [key, message] of Object.entries(catalog)) {
        expect(message, `${locale} / ${key}`).not.toContain("'");
      }
    }
  });

  /**
   * A reading of 命 is addressed to the person the board was laid on, and the
   * board is told their gender. The prompt must not presume it instead.
   *
   * This began as a real report: an Italian reading addressed a man in the
   * feminine throughout. The English rule says «address them»; the Italian
   * rendered it «rivolgiti a lei», whose antecedent is «chi legge», which
   * takes masculine agreement — so there was no feminine antecedent and the
   * line simply read «address her». One mistranslated pronoun in an operative
   * rule, and every reading in the language obeyed it.
   *
   * The two other «lei» in this block are correct and stay: they agree with
   * «la persona», feminine in Italian whatever the person's sex.
   */
  it('never tells the reading which gender to address', () => {
    for (const [locale, catalog] of Object.entries(catalogs)) {
      const register = catalog['prompt.ming.register' as keyof typeof en];
      for (const presumed of [' a lei', ' a lui', ' her,', ' him,']) {
        expect(register, `${locale} / prompt.ming.register`).not.toContain(presumed);
      }
    }
  });

  it('uses the same placeholders in every translation', () => {
    for (const [key, original] of Object.entries(en)) {
      const expected = placeholders(original);
      for (const [locale, catalog] of Object.entries(catalogs)) {
        expect(placeholders(catalog[key as keyof typeof en]), `${locale} / ${key}`).toEqual(
          expected,
        );
      }
    }
  });
});

function placeholders(message: string): string[] {
  return [...message.matchAll(/\{(\w+)\}/g)].map((match) => match[1] as string).sort();
}

/**
 * The split that keeps one reader from paying for the other's catalog.
 *
 * `catalogs` reaches both, which is what a bundler follows; these two reach
 * one. The saving is real only if what comes back is the same catalog the
 * static path holds, and only if a translator over it renders what the
 * translator over both does — so both halves are asserted rather than the
 * mechanism.
 */
describe('one catalog at a time', () => {
  it('loads the same catalog the static path holds', async () => {
    for (const locale of LOCALES) {
      expect(await loadCatalog(locale)).toBe(catalogs[locale]);
    }
  });

  it('renders what a translator over both renders', async () => {
    for (const locale of LOCALES) {
      const over = translatorOver(locale, await loadCatalog(locale));
      expect(over.locale).toBe(locale);
      for (const key of Object.keys(en) as (keyof typeof en)[]) {
        expect(over(key), `${locale} / ${key}`).toBe(catalogs[locale][key]);
      }
    }
  });

  /**
   * The one behaviour given up with the second catalog, asserted so that it is
   * a decision on the record rather than a surprise.
   *
   * `translate` falls back to English before it falls back to the key. Over a
   * single catalog there is no English to reach, so a key it lacks degrades
   * straight to the key — which the type system does not permit and
   * `catalogs.test.ts` asserts against besides. What must not happen is the
   * word `undefined` appearing in the middle of a board.
   */
  it('degrades a key it has no message for to the key, never to undefined', () => {
    const over = translatorOver('it', {} as Record<MessageKey, string>);
    expect(over('cli.heading.warnings')).toBe('cli.heading.warnings');
  });
});
