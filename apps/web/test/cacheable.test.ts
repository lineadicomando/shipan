import { describe, expect, it } from 'vitest';
import { LOCALES } from '@shipan/i18n';
import { isPrivateRequest, localeOf, mayCache, offlinePage } from '../src/lib/cacheable';

/**
 * The privacy note promises, in two languages, that no chart is kept in the
 * reader's browser. This is where that promise is held.
 *
 * The failure it guards against is silent in both directions: a cache that
 * kept a chart would work perfectly and store a stranger's date of birth, and
 * nothing on the page would say so. So the addresses are enumerated —
 * including the ones a later board would use — rather than sampled.
 */
const at = (address: string): URL => new URL(address, 'https://shipan.example');

/** Every board the site lays, as `docs/architecture.md` counts them. */
const BOARDS = ['qimen', 'liuren', 'taiyi', 'bazi', 'ziwei', 'qizheng'];

/** A chart of somebody's birth, in the shape the pages actually ask for it. */
const A_BIRTH = 'date=1984-03-11&time=07:20&locationId=geonames:3169070&lang=it';

describe('what may be kept', () => {
  describe('never anything under /api', () => {
    for (const board of BOARDS) {
      it(`refuses /api/${board} and everything under it`, () => {
        for (const shape of ['', '/plate', '/text', '/prompt']) {
          const url = at(`/api/${board}${shape}?${A_BIRTH}`);
          expect(isPrivateRequest(url), url.pathname).toBe(true);
          expect(mayCache(url, false), url.pathname).toBe(false);
        }
      });
    }

    it('refuses the endpoints that are public too', () => {
      // `/api/terms` and `/api/locations` hold nobody's data and would be
      // harmless to keep. The rule is the prefix anyway: a rule with an
      // exception list is a rule that grows a hole the next time a board
      // lands. See `cacheable.ts`.
      for (const address of ['/api/terms?year=2026', '/api/locations?q=roma', '/api/moments']) {
        expect(mayCache(at(address), false), address).toBe(false);
      }
    });

    it('refuses an endpoint nobody has written yet', () => {
      // The guard is the prefix, so a seventh board is covered the day it
      // lands rather than the day somebody remembers this file.
      expect(isPrivateRequest(at('/api/liuyao?date=2026-08-23'))).toBe(true);
      expect(mayCache(at('/api/liuyao?date=2026-08-23'), false)).toBe(false);
    });

    it('does not mistake a page for an endpoint', () => {
      // `/en/api-notes` starts with the same letters and is not the prefix.
      expect(isPrivateRequest(at('/en/api-notes'))).toBe(false);
      expect(isPrivateRequest(at('/apianything'))).toBe(false);
    });
  });

  describe('never a page', () => {
    it('refuses to keep a chart rendered as HTML', () => {
      // The board is in the markup and the birth is in the key. Keeping one
      // stores the date and the place twice over.
      for (const board of BOARDS) {
        const url = at(`/it/${board}?${A_BIRTH}`);
        expect(mayCache(url, true), url.pathname).toBe(false);
      }
    });

    it('refuses to keep even a page that holds nothing', () => {
      // Not because `/it/privacy` is sensitive, but because deciding page by
      // page is how the sensitive one eventually gets through. The only HTML
      // in the cache is the offline page, put there at build time.
      for (const address of ['/it', '/en/privacy', '/en/notes/sources', '/it/offline']) {
        expect(mayCache(at(address), true), address).toBe(false);
      }
    });
  });

  describe('what is left is the site itself', () => {
    it('keeps the build and the static files', () => {
      for (const address of [
        '/_app/immutable/entry/app.Na7jtbWq.js',
        '/_app/immutable/assets/0.CkQTOl3P.css',
        '/favicon.svg',
        '/seal.svg',
        '/icon-192.png',
        '/icon-maskable-512.png',
        '/apple-touch-icon.png',
      ]) {
        expect(mayCache(at(address), false), address).toBe(true);
      }
    });
  });
});

describe('the language a failed navigation is answered in', () => {
  it('takes it from the address the reader was going to', () => {
    expect(localeOf(at('/it/qimen?date=2026-08-23'))).toBe('it');
    expect(localeOf(at('/en/notes'))).toBe('en');
    // Even when the browser says otherwise: the address is the more explicit
    // source, and it is the page the reader asked for.
    expect(localeOf(at('/it/bazi'), 'en-GB')).toBe('it');
  });

  it('falls back to what the browser prefers', () => {
    expect(localeOf(at('/'), 'it-CH')).toBe('it');
    expect(localeOf(at('/manifest.webmanifest'), 'it')).toBe('it');
  });

  it('falls back to English when nothing says anything usable', () => {
    expect(localeOf(at('/'))).toBe('en');
    expect(localeOf(at('/fr/qimen'), 'fr-FR')).toBe('en');
    expect(localeOf(at('/'), null)).toBe('en');
  });

  it('has a page to answer with in every language spoken', () => {
    // The offline pages are prerendered from `LOCALES`, so this holds the two
    // lists to each other: a third language that reached the catalogs without
    // reaching the worker would fall back to English here, silently.
    for (const locale of LOCALES) {
      expect(offlinePage(locale)).toBe(`/${locale}/offline`);
    }
  });
});
