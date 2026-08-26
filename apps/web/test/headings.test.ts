import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LOCALES, createTranslator, type MessageKey } from '@shipan/i18n';
import { SECTIONS } from '../src/lib/navigation';

/**
 * The one first-level heading a section carries, held to the section.
 *
 * **What this guards against is a heading borrowed from somewhere else.**
 * Five of the eight sections used to set their `h1` from `cli.heading.*` —
 * the strings the terminal prints over a board — and «Four Pillars» is right
 * over four columns of a CLI and wrong as the whole of what the 八字 page
 * calls itself. It went unnoticed for as long as it did because the heading
 * is `offscreen` by design: the nav says which section this is, so nobody
 * reading the page with their eyes ever saw the line that was wrong.
 *
 * That is also what makes it worth a test rather than a look. The readers
 * this line is set offscreen *for* — a screen reader, a crawler, a model
 * handed the page — are exactly the readers nobody checks by opening the
 * site, and a heading that drifts back to a borrowed string would look no
 * different in a browser than a heading that did not.
 *
 * Derived from `SECTIONS` in both directions: a ninth section arrives already
 * covered, and a key for a section that no longer exists fails here.
 */
const ROUTES = fileURLToPath(new URL('../src/routes/[lang]/', import.meta.url));

/** The page of a section. The consultation is the root of a vernacular. */
const pageOf = (slug: string): string =>
  readFileSync(`${ROUTES}${slug ? `${slug}/` : ''}+page.svelte`, 'utf8');

/** Every `<h1 …>…</h1>` on a page, comments stripped — this project argues in them. */
const headings = (source: string): string[] =>
  [...source.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(
    (match) => match[1] as string,
  );

describe('the heading a section carries', () => {
  it('gives every section exactly one', () => {
    for (const { slug } of SECTIONS) {
      expect(headings(pageOf(slug)), slug || '(the consultation)').toHaveLength(1);
    }
  });

  it('sets it from the key named for the section', () => {
    for (const { slug } of SECTIONS) {
      const [heading] = headings(pageOf(slug));
      expect(heading?.trim(), slug || '(the consultation)').toBe(
        `{t('h1.${slug || 'consult'}')}`,
      );
    }
  });

  it('keeps it out of sight', () => {
    // The nav already says which section this is, and a line of ink repeating
    // it says nothing. `SectionIntro` is what stands where a heading would.
    for (const { slug } of SECTIONS) {
      const source = pageOf(slug).replace(/<!--[\s\S]*?-->/g, '');
      expect(/<h1 class="offscreen">/.test(source), slug || '(the consultation)').toBe(true);
    }
  });

  for (const locale of LOCALES) {
    describe(locale, () => {
      const t = createTranslator(locale);
      const key = (slug: string) => `h1.${slug || 'consult'}` as MessageKey;

      it('says something under every section', () => {
        for (const { slug } of SECTIONS) {
          // `translate` falls back to the key itself when a catalog is missing
          // one, which is a heading that names a variable.
          expect(t(key(slug)), slug || '(the consultation)').not.toBe(key(slug));
          expect(t(key(slug)).trim(), slug || '(the consultation)').not.toBe('');
        }
      });

      it('names the art the section lays out', () => {
        /**
         * The whole of the change this file was written for. An instrument is
         * *named*, the nav keeps the name at full length for the section being
         * read, and the heading is where a reader who cannot see the nav is
         * told which art this is. The two acts are exempt for the reason they
         * are acts: a consultation has no art of its own, and choosing a time
         * is named by what a reader does — it says «Qi Men Dun Jia» all the
         * same, because it walks those charts and only those, but it says it
         * as a section of prose rather than as a name this test can look up.
         */
        for (const { slug, label, full, group } of SECTIONS) {
          if (group !== 'instrument') continue;
          expect(t(key(slug)), slug).toContain(t(full ?? label));
        }
      });
    });
  }
});
