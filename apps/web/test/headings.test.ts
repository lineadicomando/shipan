import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LOCALES, createTranslator } from '@shipan/i18n';
import { SECTIONS } from '../src/lib/navigation';

/**
 * The one first-level heading a section carries, held to the section.
 *
 * **What this guards against is a heading borrowed from somewhere else.**
 * Five of the eight sections set their `h1` from `cli.heading.*` — the strings
 * the terminal prints over a board — and «Four Pillars» is right over four
 * columns of a CLI and wrong as the whole of what the 八字 page calls itself.
 * It went unnoticed for as long as it did because the heading was `offscreen`:
 * the nav said which section this was, so nobody reading the page with their
 * eyes ever met the line that was wrong.
 *
 * **And against a second one arriving.** The heading now lives in
 * `SectionIntro`, which every section renders once, so an `h1` written into a
 * page would be a second first-level heading on that page — the outline says
 * two things are the subject and neither is. The pages are read here for that,
 * and it is the reason this file reads files at all rather than only the
 * registry.
 *
 * Derived from `SECTIONS` in both directions: a ninth section arrives already
 * covered, and a heading for a section that no longer exists fails here.
 */
const SRC = fileURLToPath(new URL('../src/', import.meta.url));
const ROUTES = join(SRC, 'routes/[lang]/');

/** The page of a section. The consultation is the root of a vernacular. */
const pageOf = (slug: string): string =>
  readFileSync(join(ROUTES, slug, '+page.svelte'), 'utf8');

/** Markup only: this project argues at length in its comments. */
const markup = (source: string): string => source.replace(/<!--[\s\S]*?-->/g, '');

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.svelte') ? [path] : [];
  });

describe('the heading a section carries', () => {
  it('writes it in one place, from the registry', () => {
    const intro = markup(readFileSync(join(SRC, 'lib/components/SectionIntro.svelte'), 'utf8'));
    expect(intro).toContain('<h1>{t(here.heading)}</h1>');
  });

  it('leaves none on the pages themselves', () => {
    for (const { slug } of SECTIONS) {
      expect(markup(pageOf(slug)).match(/<h1[\s>]/g) ?? [], slug || '(the consultation)').toEqual(
        [],
      );
    }
  });

  it('keeps the headings written for the terminal out of the interface', () => {
    // `cli.heading.*` still prints charts, and a form's submit button still
    // reads one — «Cast a Qi Men chart» is the button's own words. What must
    // not come back is one of them standing as a heading.
    for (const path of walk(SRC)) {
      const code = markup(readFileSync(path, 'utf8'));
      for (const match of code.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)) {
        expect(match[1], path).not.toContain('cli.heading');
      }
    }
  });

  for (const locale of LOCALES) {
    describe(locale, () => {
      const t = createTranslator(locale);

      it('says something under every section', () => {
        for (const { slug, heading } of SECTIONS) {
          // `translate` falls back to the key itself when a catalog is missing
          // one, which is a heading that names a variable.
          expect(t(heading), slug || '(the consultation)').not.toBe(heading);
          expect(t(heading).trim(), slug || '(the consultation)').not.toBe('');
        }
      });

      it('names the art the section lays out', () => {
        /**
         * The whole of what this file was written for. An instrument is
         * *named*, and the heading is the line that tells a reader which art
         * they are looking at now that the bar no longer grows to say it: it
         * opens on the name the bar cuts — `Zi Wei` in the row, `Zi Wei Dou
         * Shu` here — so the label is what it must contain. The two acts are
         * exempt for the reason they are acts: a consultation has no art of
         * its own, and
         * choosing a time is named by what a reader does — it says «Qi Men Dun
         * Jia» all the same, because it walks those charts and only those, but
         * it says it as a section of prose rather than as a name this test can
         * look up.
         */
        for (const { slug, label, heading, group } of SECTIONS) {
          if (group !== 'instrument') continue;
          expect(t(heading), slug).toContain(t(label));
        }
      });

      it('says more than the bar does', () => {
        // The heading exists because the label cannot carry the name: if the
        // two ever came out the same string, the line at the top of the page
        // would be the nav item printed twice.
        for (const { slug, label, heading } of SECTIONS) {
          expect(t(heading), slug || '(the consultation)').not.toBe(t(label));
        }
      });
    });
  }
});
