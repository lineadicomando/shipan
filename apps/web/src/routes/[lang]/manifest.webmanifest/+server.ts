import { createTranslator, isLocale } from '@shipan/i18n';
import { error } from '@sveltejs/kit';
import { SECTIONS, href } from '$lib/navigation';
import type { RequestHandler } from './$types';

/**
 * `GET /en/manifest.webmanifest`, and one for every other language.
 *
 * **A manifest holds a name, a description and a language, so there is one per
 * vernacular and it is served rather than shipped.** A single file in
 * `static/` would have had to choose — an Italian reader installing an app
 * whose description is in English, or a hand-written second copy of strings
 * that live in the catalogs and nowhere else. `docs/i18n.md` forbids the
 * second outright. Served from a route, the whole thing is read off the
 * catalog the reader is already reading, and a third language costs the lines
 * it costs everywhere else: none here.
 *
 * It is not under `/api`, and that is deliberate rather than an oversight.
 * `docs/architecture.md` says a section is addressed by the art it lays out
 * and so is its endpoint; this answers no art and belongs to a language, so
 * it hangs off the language the way the pages do.
 */
export const GET: RequestHandler = ({ params, setHeaders }) => {
  // The same refusal `[lang]/+layout.ts` makes, for the same reason: a
  // fallback would make /fr and /en the same manifest under two names.
  if (!isLocale(params.lang)) error(404, { message: `No such language: ${params.lang}` });
  const t = createTranslator(params.lang);

  setHeaders({
    'content-type': 'application/manifest+json; charset=utf-8',
    // Nothing in it is anybody's: it is the name of a site and a list of
    // icons, identical for every reader of that language.
    'cache-control': 'public, max-age=3600',
  });

  return new Response(
    JSON.stringify(
      {
        /**
         * `id` is what tells two installs apart, and the two here are two
         * languages of one site. Without it a browser derives the identity
         * from `start_url`, which would make an Italian install and an
         * English one the same application under whichever name arrived
         * first.
         */
        id: href(t.locale, ''),
        /**
         * The identifier alone, and this is the one place in the project
         * where the name arrives without its reading.
         *
         * The three-part shape — `shipan`, 式盤, shìpán — is how every named
         * thing here travels, and the reason is that a glyph alone is
         * unsayable to the reader this is built for. In a launcher that
         * reasoning inverts. `shipan` and `shìpán` are the same word twice,
         * one of them with accents; the glyph beside them is already on the
         * icon; and the whole string sits in a title bar that truncates. What
         * the rule exists to prevent — a shape the reader cannot say — cannot
         * happen here, because the sayable part is what is left.
         *
         * `name` and `short_name` are therefore the same string. A name does
         * not translate either, which is the rule `navigation.ts` states for
         * the sections that carry one; what changes with the language is the
         * description under it.
         */
        name: 'shipan',
        short_name: 'shipan',
        description: t('manifest.description'),
        lang: t.locale,
        dir: 'ltr',
        start_url: href(t.locale, ''),
        /**
         * **The scope is the site and not the language.** The language switch
         * is in the header of every page, and a scope of `/en` would make
         * pressing `IT` throw the reader out of the installed application and
         * into a browser tab. Which language was installed is said by `id`,
         * `lang` and `start_url`; the scope says where the application may go,
         * and it may go everywhere this site is.
         */
        scope: '/',
        display: 'standalone',
        /**
         * The light ground, and it is the only one a manifest can hold. A
         * reader on a dark page is not left with a pale bar for it: the two
         * `theme-color` metas in `app.html` answer a media query apiece and
         * take precedence over this once the page is up. What this colours is
         * the splash screen, which is shown before there is a page to ask.
         */
        theme_color: '#fdfcfa',
        background_color: '#fdfcfa',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          // Cut for the circle a launcher may mask to. Shown unmasked it is a
          // small glyph in a large field, which is why the plain pair above
          // is declared as well rather than replaced. See `design/logo/`.
          {
            src: '/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          // The mark is a drawing and scales to any size a browser wants it
          // at — a tab, a bookmark, a list of applications.
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
        /**
         * A long press on the icon opens one of these, and they are the acts
         * rather than the instruments.
         *
         * `SECTIONS` is already ordered acts first — a consultation and the
         * choosing of a time are things a reader *does*, and a shortcut is a
         * thing to do. The boards are what those two are read through and are
         * one press further in, which is also as many as a launcher shows.
         */
        shortcuts: SECTIONS.filter((section) => section.group === 'act').map((section) => ({
          name: t(section.label),
          url: href(t.locale, section.slug),
        })),
      },
      null,
      2,
    ),
  );
};
