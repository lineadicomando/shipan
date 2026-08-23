import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { LOCALES, createTranslator } from '@shipan/i18n';
import { CARD, OG_LOCALES, SITE, TITLE_SEPARATOR, PAGES, metaOf, trailOf } from '../src/lib/meta';
import { pagesOf } from '../src/lib/indexable';

/**
 * What every page says it is, held to the pages that exist.
 *
 * **The failure this guards against is a page nobody described.** A section
 * that lands in the nav is in the sitemap the same day, because the sitemap
 * is derived; its title and its description are written, so nothing but this
 * makes them arrive with it. The result of forgetting is not a broken page —
 * it is a page that works, and a search result that has to guess what the
 * page is for from a title reading `shipan 式盤` and nothing else.
 *
 * The other direction is checked too: an entry for an address that no longer
 * exists is prose being translated into two languages for nobody.
 */
const TAIL = (path: string) => path.split('/').slice(2).join('/');

describe('every page is described, and nothing else is', () => {
  it('has an entry for every address that may be indexed', () => {
    for (const path of pagesOf('en')) {
      expect(metaOf(path), path).toBeDefined();
    }
  });

  it('has no entry for an address that is not a page', () => {
    const pages = new Set(pagesOf('en').map(TAIL));
    for (const key of Object.keys(PAGES)) {
      expect(pages.has(key), `PAGES has "${key}", which is nowhere in the site`).toBe(true);
    }
  });

  it('finds a page whether or not the address ends in a slash', () => {
    expect(metaOf('/en/qimen')).toBe(metaOf('/en/qimen/'));
    expect(metaOf('/it/notes/sources')).toBeDefined();
  });

  it('describes nothing a board was cast at', () => {
    // `PageHead` asks `mayIndex` before it prints a description, so this is
    // belt and braces — but the shape of the key is the address, and an
    // address with a question in it must not resolve to one.
    expect(metaOf('/en/qimen?date=1984-03-11')).toBeUndefined();
    expect(metaOf('/en/offline')).toBeUndefined();
  });
});

describe('what a section opens with', () => {
  const sections = pagesOf('en').filter((path) => !TAIL(path).startsWith('notes') && TAIL(path) !== 'privacy');

  it('gives every section two paragraphs', () => {
    for (const path of sections) {
      expect(metaOf(path)?.intro, path).toHaveLength(2);
    }
  });

  it('gives the notes and the privacy note none', () => {
    // Both carry a visible heading and their own opening line. A page that is
    // already prose does not want a preface to its preface.
    for (const path of pagesOf('en').filter((page) => !sections.includes(page))) {
      expect(metaOf(path)?.intro, path).toBeUndefined();
    }
  });
});

describe('in every vernacular', () => {
  for (const locale of LOCALES) {
    describe(locale, () => {
      const t = createTranslator(locale);
      const every = pagesOf(locale).map((path) => ({ path, meta: metaOf(path)! }));

      it('says something in every field', () => {
        for (const { path, meta } of every) {
          for (const key of [meta.title, meta.description, ...(meta.intro ?? [])]) {
            expect(t(key).trim(), `${path} · ${key}`).not.toBe('');
            // `translate` falls back to the key itself when a catalog is
            // missing one, which reads as a sentence to nobody.
            expect(t(key), `${path} · ${key}`).not.toBe(key);
          }
        }
      });

      it('keeps a title short enough to survive the cut', () => {
        /**
         * A search result shows about sixty characters and a tab far fewer.
         * The site's name and its separator take a fixed share of that, so
         * what a page may spend on saying which page it is is the rest — and
         * a bound here is the only thing that notices when a translation runs
         * long. Not a style rule: past the cut the words are not shown.
         */
        const budget = 60 - (SITE.length + TITLE_SEPARATOR.length);
        for (const { path, meta } of every) {
          expect(t(meta.title).length, `${path}: "${t(meta.title)}"`).toBeLessThanOrEqual(budget);
        }
      });

      it('keeps a description inside what is shown', () => {
        // Google shows around 155 characters and truncates the rest mid-word.
        // The floor is the other half of the same claim: a description of
        // forty characters is a field that was filled in rather than written.
        for (const { path, meta } of every) {
          const said = t(meta.description);
          expect(said.length, `${path}: "${said}"`).toBeGreaterThan(90);
          expect(said.length, `${path}: "${said}"`).toBeLessThanOrEqual(160);
        }
      });

      it('promises no reading anywhere in the head', () => {
        /**
         * These are the sentences most likely to be read by somebody who
         * never opens the site, which makes them the worst place to imply the
         * one thing this project declines to do — see `docs/refusals.md`. The
         * footer says on every page that no reading is given; a description
         * that said otherwise would reach further than the footer does.
         */
        const forbidden =
          /\b(oracle|oracolo|fortune|fortuna teller|predict|predice|prevede|destiny|destino|foretell|responso)\b/i;
        for (const { path, meta } of every) {
          for (const key of [meta.title, meta.description, ...(meta.intro ?? [])]) {
            expect(t(key), `${path} · ${key}`).not.toMatch(forbidden);
          }
        }
      });
    });
  }
});

describe('the trail a page sits on', () => {
  it('gives the root of a language a trail of one', () => {
    // Which is not a trail, and is why `PageHead` declares the site there
    // instead of a breadcrumb.
    expect(trailOf('/en')).toHaveLength(1);
  });

  it('gives a section the root and itself', () => {
    expect(trailOf('/it/liuren').map((step) => step.tail)).toEqual(['', 'liuren']);
  });

  it('walks the one place this site is two deep', () => {
    expect(trailOf('/en/notes/sources').map((step) => step.tail)).toEqual([
      '',
      'notes',
      'notes/sources',
    ]);
  });

  it('stops at the pages that exist', () => {
    // The trail is the address walked, and a segment that is not a page of
    // this site contributes no step rather than an invented one.
    expect(trailOf('/en/notes/parameters').map((step) => step.tail)).toEqual(['', 'notes']);
  });
});

describe('the card a pasted link is shown as', () => {
  it('exists at the address the head gives out', () => {
    const file = fileURLToPath(new URL(`../static${CARD.src}`, import.meta.url));
    expect(existsSync(file), `${CARD.src} should be in static/ — run \`npm run card\``).toBe(true);
  });

  it('is the shape every consumer of one agrees on', () => {
    // 1200×630. Anything else is cropped by somebody, and never the same way
    // twice. See `design/logo/make-card.ts`.
    expect([CARD.width, CARD.height]).toEqual([1200, 630]);
  });

  it('names a territory for every vernacular', () => {
    // `og:locale` will not read a bare `it`, and the tempting one-liner gives
    // `en_EN`, which is not a territory.
    for (const locale of LOCALES) {
      expect(OG_LOCALES[locale], locale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    }
  });
});
