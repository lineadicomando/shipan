import { describe, expect, it } from 'vitest';
import { LOCALES } from '@shipan/i18n';
import { SECTIONS } from '../src/lib/navigation';
import { NOTE_PAGES } from '../src/lib/notes';
import { alternates, canonical, everyPage, mayIndex, pagesOf } from '../src/lib/indexable';

/**
 * The privacy note promises that no chart is kept in the reader's browser.
 * This is the other keeper: a public index, which keeps things for longer and
 * shows them to strangers.
 *
 * The failure is silent in the same way the cache's was. A chart address that
 * a crawler was allowed to index works perfectly, looks like a page, and has
 * somebody's date of birth in the address bar of the search result. So the
 * addresses are enumerated — including the ones a later board would use —
 * rather than sampled, exactly as `cacheable.test.ts` enumerates them.
 */
const at = (address: string): URL => new URL(address, 'https://shipan.example');

/** A chart of somebody's birth, in the shape the pages actually ask for it. */
const A_BIRTH = 'date=1984-03-11&time=07:20&locationId=geonames:3169070';

describe('what may be indexed', () => {
  describe('the pages of the site, and only those', () => {
    it('indexes every section in every language', () => {
      for (const locale of LOCALES) {
        for (const section of SECTIONS) {
          const address = section.slug ? `/${locale}/${section.slug}` : `/${locale}`;
          expect(mayIndex(at(address)), address).toBe(true);
        }
      }
    });

    it('indexes every page of the notes, and the privacy note', () => {
      for (const locale of LOCALES) {
        for (const page of NOTE_PAGES) {
          const address = `/${locale}/notes${page.slug ? `/${page.slug}` : ''}`;
          expect(mayIndex(at(address)), address).toBe(true);
        }
        expect(mayIndex(at(`/${locale}/privacy`))).toBe(true);
      }
    });

    it('refuses the offline page, which is an apology and not a destination', () => {
      for (const locale of LOCALES) {
        expect(mayIndex(at(`/${locale}/offline`)), locale).toBe(false);
      }
    });

    it('refuses a language this site does not speak', () => {
      expect(mayIndex(at('/fr/qimen'))).toBe(false);
      expect(mayIndex(at('/en-GB'))).toBe(false);
    });

    it('refuses a page nobody has written', () => {
      expect(mayIndex(at('/en/liuyao'))).toBe(false);
      expect(mayIndex(at('/en/notes/parameters'))).toBe(false);
    });
  });

  describe('never a board somebody cast', () => {
    // Every section that takes a moment, asked the way the forms ask it.
    for (const section of SECTIONS) {
      const bare = section.slug ? `/en/${section.slug}` : '/en';
      it(`refuses ${bare} once it carries an answer`, () => {
        expect(mayIndex(at(`${bare}?${A_BIRTH}`)), bare).toBe(false);
      });
    }

    it('refuses a question of any shape, not a list of parameters', () => {
      // The private parameters differ by section — a scan carries an
      // interval, a consultation carries a birth and a sex, 太乙 carries a
      // year. The rule is that there is a question at all, so a parameter
      // nobody has invented yet is refused with the rest.
      for (const query of [
        'from=2026-01-01&to=2026-02-01&place=Roma',
        'born=1984-03-11&bornTime=07:20&gender=f',
        'year=2026&about=true',
        'whatever=1',
      ]) {
        expect(mayIndex(at(`/en/qimen?${query}`)), query).toBe(false);
      }
    });

    it('refuses everything under /api, board or not', () => {
      for (const address of [
        `/api/qimen?${A_BIRTH}`,
        `/api/bazi/prompt?${A_BIRTH}`,
        '/api/terms?year=2026',
        '/api',
      ]) {
        expect(mayIndex(at(address)), address).toBe(false);
      }
    });
  });

  it('reads /en and /en/ as one page', () => {
    expect(mayIndex(at('/en/'))).toBe(true);
    expect(canonical(at('/en/qimen/'))).toBe('https://shipan.example/en/qimen');
  });
});

describe('what a page says it is', () => {
  it('gives an absolute canonical on the origin it was asked at', () => {
    expect(canonical(at('/it/liuren'))).toBe('https://shipan.example/it/liuren');
    expect(canonical(new URL('http://localhost:3000/en'))).toBe('http://localhost:3000/en');
  });

  it('says nothing at all where it may not be indexed', () => {
    // A canonical pointing away from a `noindex` page is a contradiction
    // resolved by guessing, and what would be guessed about is an address
    // with a birth in it.
    expect(canonical(at(`/en/qimen?${A_BIRTH}`))).toBeUndefined();
    expect(alternates(at(`/en/qimen?${A_BIRTH}`))).toEqual([]);
  });
});

describe('the same page in every language', () => {
  it('names itself as well as the others', () => {
    // A set where one member omits itself is a set search engines discard
    // whole, so the page's own language has to be in its own list.
    const found = alternates(at('/en/qimen'));
    for (const locale of LOCALES) {
      expect(found).toContainEqual({
        hreflang: locale,
        href: `https://shipan.example/${locale}/qimen`,
      });
    }
  });

  it('says the same set on both sides of the pair', () => {
    expect(alternates(at('/en/notes/sources'))).toEqual(alternates(at('/it/notes/sources')));
  });

  it('answers x-default with the root, which is the address that negotiates', () => {
    expect(alternates(at('/en')).at(-1)).toEqual({
      hreflang: 'x-default',
      href: 'https://shipan.example/',
    });
  });

  it('carries the whole depth of an address across', () => {
    expect(alternates(at('/it/notes/refusals'))).toContainEqual({
      hreflang: 'en',
      href: 'https://shipan.example/en/notes/refusals',
    });
  });
});

describe('the list the sitemap is built from', () => {
  it('holds every language once', () => {
    expect(everyPage()).toHaveLength(LOCALES.length * pagesOf('en').length);
    expect(new Set(everyPage()).size).toBe(everyPage().length);
  });

  it('grows with the registries rather than by hand', () => {
    // The count is asserted against the registries and not written down: a
    // section that lands in the nav lands here the same day. See
    // `docs/notes.md` — derived beats written.
    expect(pagesOf('en')).toHaveLength(SECTIONS.length + NOTE_PAGES.length + 1);
  });
});
