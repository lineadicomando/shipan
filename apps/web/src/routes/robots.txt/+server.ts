import type { RequestHandler } from './$types';

/**
 * `GET /robots.txt`.
 *
 * A route rather than a file in `static/`, for the one line that has to know
 * where it is standing: a `Sitemap:` directive is required to be absolute,
 * and this project holds no domain anywhere. The origin arrives with the
 * request, so the same file is correct on `localhost:3000`, behind a reverse
 * proxy and wherever it is finally served, with nothing to configure and
 * nothing to forget when it moves.
 *
 * **What it forbids is `/api`, and nothing else.** Not the chart addresses —
 * and that is the part worth writing down, because forbidding them is the
 * obvious move and it is exactly wrong. A crawler that is told not to fetch
 * `/en/qimen?date=…` never fetches it, therefore never sees the `noindex` it
 * carries, and is left free to index the address on the strength of a link
 * alone: robots.txt governs crawling, and only the page itself can refuse
 * indexing. The address stays reachable so that it can say no. See
 * `lib/indexable.ts`, where the refusal actually lives.
 *
 * `/api` is a different case and takes the blunt instrument, because there is
 * nothing there for a reader: JSON and PNG, answering a question somebody
 * asked, at addresses that are not pages. Those are refused twice over —
 * crawling here, indexing by the `X-Robots-Tag` that `hooks.server.ts` puts
 * on every one of them.
 *
 * There is no `Crawl-delay` and no list of agents. This site has one server
 * doing arithmetic, no advertising to protect and nothing to hide from a
 * particular company; a directive naming agents would be a policy nobody here
 * has, written in the one file that is read as one.
 */
export const GET: RequestHandler = ({ url, setHeaders }) => {
  setHeaders({
    'content-type': 'text/plain; charset=utf-8',
    // Nobody's: it is the same three lines for every reader of the site.
    'cache-control': 'public, max-age=3600',
  });

  return new Response(
    [
      'User-agent: *',
      'Disallow: /api/',
      '',
      `Sitemap: ${new URL('/sitemap.xml', url.origin).href}`,
      '',
    ].join('\n'),
  );
};
