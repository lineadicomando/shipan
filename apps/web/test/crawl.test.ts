import { describe, expect, it } from 'vitest';
import { LOCALES } from '@shipan/i18n';
import { GET as robots } from '../src/routes/robots.txt/+server';
import { GET as sitemap } from '../src/routes/sitemap.xml/+server';
import { everyPage } from '../src/lib/indexable';

/**
 * The two files a crawler asks for before it asks for anything else.
 *
 * Both are read by nobody and fetched by everybody, which is the kind of file
 * that stays wrong for months. What is asserted is what would break in
 * silence: an absolute address that hardcoded a host would point at the wrong
 * site the day this moves, and a `Disallow` over the chart addresses would
 * stop a crawler reaching the very `noindex` that protects them.
 */
type Handler = (event: never) => Response | Promise<Response>;

async function call(handler: Handler, address: string) {
  const url = new URL(address);
  const headers: Record<string, string> = {};
  const response = await handler({
    url,
    setHeaders: (set: Record<string, string>) => Object.assign(headers, set),
  } as never);

  // `setHeaders` wins, as it does in SvelteKit: what a route declares there
  // is applied to the response on its way out, over whatever `new Response`
  // guessed from the body.
  return { headers, text: await response.text() };
}

describe('robots.txt', () => {
  it('points at the sitemap on the origin it was asked at', async () => {
    const { text } = await call(robots, 'https://shipan.example/robots.txt');
    expect(text).toContain('Sitemap: https://shipan.example/sitemap.xml');

    // The same file, correct on a laptop. Nothing here holds a domain.
    const local = await call(robots, 'http://localhost:3000/robots.txt');
    expect(local.text).toContain('Sitemap: http://localhost:3000/sitemap.xml');
  });

  it('forbids the endpoints', async () => {
    const { text } = await call(robots, 'https://shipan.example/robots.txt');
    expect(text).toContain('User-agent: *');
    expect(text).toContain('Disallow: /api/');
  });

  it('leaves the chart addresses crawlable, so that they can refuse the index', async () => {
    /**
     * The obvious move and the wrong one. A crawler told not to fetch
     * `/en/qimen?date=…` never sees the `noindex` on it and stays free to
     * index the address from a link alone — which would put somebody's date
     * of birth in a search result, with the refusal sitting unread behind a
     * rule meant to protect it. `lib/indexable.ts` does the refusing.
     */
    const { text } = await call(robots, 'https://shipan.example/robots.txt');
    const disallowed = text.match(/^Disallow: .*$/gm) ?? [];
    expect(disallowed).toEqual(['Disallow: /api/']);
  });

  it('is served as plain text, and holds nobody', async () => {
    const { headers } = await call(robots, 'https://shipan.example/robots.txt');
    expect(headers['content-type']).toContain('text/plain');
    expect(headers['cache-control']).toContain('public');
  });
});

describe('sitemap.xml', () => {
  const asked = () => call(sitemap, 'https://shipan.example/sitemap.xml');

  it('lists every page of every language, and nothing else', async () => {
    const { text } = await asked();
    const locations = [...text.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) => match[1]);

    expect(locations).toEqual(everyPage().map((path) => `https://shipan.example${path}`));
  });

  it('carries no address anybody cast a board at', async () => {
    // By construction rather than by filtering: the list is built out of the
    // addresses `mayIndex` allows, and it allows none that carry a question.
    const { text } = await asked();
    const inside = [...text.matchAll(/href="([^"]*)"|<loc>([^<]*)<\/loc>/g)].map(
      (match) => match[1] ?? match[2],
    );

    expect(inside.length).toBeGreaterThan(0);
    for (const address of inside) {
      expect(address, address).not.toContain('?');
      expect(address, address).not.toContain('/api');
    }
  });

  it('gives every entry the whole set of languages, and an x-default', async () => {
    const { text } = await asked();
    const entries = text.split('<url>').slice(1);

    expect(entries).toHaveLength(everyPage().length);
    for (const entry of entries) {
      for (const locale of LOCALES) {
        expect(entry).toContain(`hreflang="${locale}"`);
      }
      expect(entry).toContain('hreflang="x-default" href="https://shipan.example/"');
    }
  });

  it('claims no lastmod, changefreq or priority', async () => {
    // A date here would be a claim about when a page's content changed, and
    // nothing in this repository knows that. See the route.
    const { text } = await asked();
    for (const field of ['lastmod', 'changefreq', 'priority']) {
      expect(text, field).not.toContain(field);
    }
  });

  it('declares both namespaces it uses', async () => {
    const { text } = await asked();
    expect(text).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(text).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  });

  it('is served as XML', async () => {
    const { headers } = await asked();
    expect(headers['content-type']).toContain('application/xml');
    expect(headers['cache-control']).toContain('public');
  });
});
