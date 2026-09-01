import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LOCALES, createTranslator } from '@shipan/i18n';
import { AUTHOR } from '../src/lib/author';
import { crumbOf, metaOf, trailOf } from '../src/lib/meta';
import { NOTE_PAGES, READINGS, REFUSALS } from '../src/lib/notes';
import { REFERENCES } from '../src/lib/references';
import { structuredFor } from '../src/lib/structured';
import { pagesOf } from '../src/lib/indexable';

/**
 * What every page declares itself to be, held to the pages that exist.
 *
 * **The failure this guards against is a page that describes itself as less
 * than it is.** The root of a language declared the site and everything under
 * it declared its breadcrumbs, which are alternatives — so the four pages
 * carrying the most content on this site were the ones saying least about
 * what that content was. A page of the notes is both a step in a trail and a
 * document, and both are now said.
 *
 * Derived from the same registries the pages are built from, in both
 * directions: a fifth note arrives already declared, and a type claimed for an
 * address that is not one fails here.
 */
const ORIGIN = 'https://example.test';

const t = (locale: (typeof LOCALES)[number]) => createTranslator(locale);

const nodesAt = (path: string, locale: (typeof LOCALES)[number]) => {
  const meta = metaOf(path);
  if (!meta) return [];
  return structuredFor({
    t: createTranslator(locale),
    meta,
    here: new URL(path, ORIGIN).href,
    origin: ORIGIN,
    trail: trailOf(path),
    crumb: crumbOf,
  }) as Record<string, unknown>[];
};

const typesAt = (path: string, locale: (typeof LOCALES)[number]) =>
  nodesAt(path, locale).map((node) => node['@type']);

/** Every address of the notes, the index included. */
const NOTES = NOTE_PAGES.map((note) => `notes${note.slug ? `/${note.slug}` : ''}`);

describe('what a page declares itself to be', () => {
  for (const locale of LOCALES) {
    describe(locale, () => {
      it('declares the site at the root of a vernacular, and only there', () => {
        expect(typesAt(`/${locale}`, locale)).toEqual(['WebSite']);
        for (const path of pagesOf(locale).filter((page) => page !== `/${locale}`)) {
          expect(typesAt(path, locale), path).not.toContain('WebSite');
        }
      });

      it('walks a trail on every page under it', () => {
        for (const path of pagesOf(locale).filter((page) => page !== `/${locale}`)) {
          expect(typesAt(path, locale), path).toContain('BreadcrumbList');
        }
      });

      it('declares a document on the notes and nowhere else', () => {
        for (const path of pagesOf(locale)) {
          const tail = path.split('/').slice(2).join('/');
          const expected = NOTES.includes(tail);
          expect(typesAt(path, locale).includes('TechArticle'), path).toBe(expected);
        }
      });

      it('signs what somebody wrote, and invents no publisher', () => {
        // The name is `author.ts`'s and the footer prints the same constant, so
        // a byline cannot come out one way for a reader and another for a
        // crawler. `publisher` stays empty everywhere: a publisher is an
        // organisation, there is none, and a field filled to satisfy a
        // validator is a claim nobody made.
        //
        // A trail is nobody's work. `BreadcrumbList` says where an address
        // sits, which is a fact about the site's shape rather than a document
        // with an author, and signing it would put a name on the arrangement
        // of a nav.
        for (const path of pagesOf(locale)) {
          for (const node of nodesAt(path, locale)) {
            const signed = node['@type'] !== 'BreadcrumbList';
            expect(node.author, `${path} · ${String(node['@type'])}`).toEqual(
              signed ? { '@type': 'Person', name: AUTHOR } : undefined,
            );
            expect(node.publisher, path).toBeUndefined();
          }
        }
      });

      it('says the name to a reader as well as to a machine', () => {
        // The half of a byline that answers the question it was asked. The
        // handle stands on its own in the footer now, beside the version, so
        // what is checked is that the line a reader sees carries it — the
        // catalogs hold the version label and never the name.
        const footer = readFileSync(
          new URL('../src/routes/[lang]/+layout.svelte', import.meta.url),
          'utf8',
        );
        expect(footer).toContain('{AUTHOR} ·');
        expect(t(locale)('footer.version', { name: 'shipan', version: '1.2.3' })).toContain('1.2.3');
      });

      it('dates a written page and never a derived one', () => {
        // The date is the freshest paragraph's, read off the registry the page
        // prints it from. A derived page is a function of the engine and a
        // date on it would be a claim about prose that nobody keeps.
        const dated = (tail: string) =>
          nodesAt(`/${locale}/${tail}`, locale).find((node) => node['@type'] === 'TechArticle')
            ?.dateModified;

        expect(dated('notes/refusals')).toBe([...REFUSALS.map((e) => e.checked)].sort().at(-1));
        expect(dated('notes/readings')).toBe([...READINGS.map((e) => e.checked)].sort().at(-1));
        expect(dated('notes/sources')).toBeUndefined();
        expect(dated('notes/instruments')).toBeUndefined();
      });

      it('cites the programs on the page that was checked on them', () => {
        const cited = (tail: string) =>
          nodesAt(`/${locale}/${tail}`, locale).find((node) => node['@type'] === 'TechArticle')
            ?.citation;

        expect(cited('notes/sources')).toEqual(REFERENCES.map((reference) => reference.where));
        for (const tail of NOTES.filter((note) => note !== 'notes/sources')) {
          expect(cited(tail), tail).toBeUndefined();
        }
      });

      it('gives every node a context and an address on this origin', () => {
        for (const path of pagesOf(locale)) {
          for (const node of nodesAt(path, locale)) {
            expect(node['@context'], path).toBe('https://schema.org');
            if (typeof node.url === 'string') expect(node.url, path).toContain(ORIGIN);
          }
        }
      });
    });
  }

  it('declares nothing at an address a board was cast at', () => {
    // `PageHead` asks `mayIndex` before it builds any of this, so a chart
    // carrying somebody's birth never reaches here — belt and braces, since
    // the shape of the key is the address.
    expect(nodesAt('/en/qimen?date=1984-03-11', 'en')).toEqual([]);
  });
});
