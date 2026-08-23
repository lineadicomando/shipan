import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LOCALES } from '@shipan/i18n';
import { GET as manifest } from '../src/routes/[lang]/manifest.webmanifest/+server';

/**
 * The manifest is the one file here a reader never opens and a launcher
 * always does, which is the kind of file that stays wrong for months.
 *
 * What is asserted is what would break in silence: an icon that does not
 * exist draws nothing, a scope narrower than the site throws the reader out
 * of the application the first time they press `IT`, and a manifest that is
 * not per-language installs the site in somebody else's.
 */
const STATIC = fileURLToPath(new URL('../static/', import.meta.url));

type Handler = (event: never) => Response;

interface Manifest {
  id: string;
  name: string;
  short_name: string;
  description: string;
  lang: string;
  start_url: string;
  scope: string;
  display: string;
  icons: { src: string; sizes: string; type: string; purpose: string }[];
  shortcuts: { name: string; url: string }[];
}

interface Called {
  headers: Record<string, string>;
  body: Manifest;
}

/** The endpoint called as SvelteKit calls it: params in, headers collected. */
async function call(lang: string): Promise<Called> {
  const headers: Record<string, string> = {};
  const event = {
    params: { lang },
    setHeaders: (set: Record<string, string>) => Object.assign(headers, set),
  };

  const response = (manifest as Handler)(event as never);
  return { headers, body: (await response.json()) as Manifest };
}

describe('the manifest a launcher installs from', () => {
  for (const locale of LOCALES) {
    describe(locale, () => {
      it('is served as a manifest, in its own language', async () => {
        const { headers, body } = await call(locale);
        expect(headers['content-type']).toContain('application/manifest+json');
        expect(body.lang).toBe(locale);
        expect(body.id).toBe(`/${locale}`);
        expect(body.start_url).toBe(`/${locale}`);
      });

      it('scopes to the site and not to the language', async () => {
        // The language switch is in the header of every page. A scope of
        // `/en` would make pressing `IT` leave the installed application.
        const { body } = await call(locale);
        expect(body.scope).toBe('/');
      });

      it('names the site rather than translating it', async () => {
        const { body } = await call(locale);
        // A name does not translate — the rule `navigation.ts` states for the
        // sections that carry one.
        expect(body.name).toBe('shipan');
        expect(body.short_name).toBe('shipan');
      });

      it('drops the reading here, and only here', async () => {
        /**
         * The one place the three-part name is cut to the identifier. A
         * launcher truncates, the glyph is already on the icon, and `shipan`
         * and `shìpán` are the same word twice — so what the rule guards
         * against, a shape the reader cannot say, is what survives. The
         * argument is in the endpoint; this holds the decision so that
         * restoring the reading has to be done on purpose.
         */
        const { body } = await call(locale);
        for (const string of [body.name, body.short_name]) {
          expect(string, `${string} should carry no hanzi`).not.toMatch(/[一-鿿]/);
          expect(string, `${string} should carry no toned pinyin`).not.toMatch(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/);
        }
      });

      it('describes the site in the language it was installed from', async () => {
        const { body } = await call(locale);
        expect(body.description.length).toBeGreaterThan(0);
      });

      it('points only at icons that exist', async () => {
        const { body } = await call(locale);
        expect(body.icons.length).toBeGreaterThan(0);
        for (const icon of body.icons) {
          expect(icon.src.startsWith('/'), `${icon.src} should be an absolute path`).toBe(true);
          expect(existsSync(STATIC + icon.src.slice(1)), `static${icon.src} is missing`).toBe(true);
        }
      });

      it('declares an icon a launcher may cut, and one it may not', async () => {
        // Without the first, every mask takes the seal's border off and the
        // strokes at its corners; without the second, a tab shows the padded
        // one. See `design/logo/README.md`.
        const { body } = await call(locale);
        expect(body.icons.some((icon) => icon.purpose === 'maskable')).toBe(true);
        expect(body.icons.some((icon) => icon.purpose === 'any')).toBe(true);
      });

      it('offers the acts as shortcuts, under the right language', async () => {
        const { body } = await call(locale);
        expect(body.shortcuts.length).toBeGreaterThan(0);
        for (const shortcut of body.shortcuts) {
          expect(shortcut.url.startsWith(`/${locale}`)).toBe(true);
          expect(shortcut.name.length).toBeGreaterThan(0);
        }
      });
    });
  }

  it('describes the site differently in each language', async () => {
    // One catalog quietly copying the other's string is the failure a pair of
    // per-language manifests exists to prevent, and it is invisible from
    // either one alone.
    const said = await Promise.all(LOCALES.map(async (locale) => (await call(locale)).body.description));
    expect(new Set(said).size).toBe(LOCALES.length);
  });

  it('refuses a language it does not speak', async () => {
    // The same refusal `[lang]/+layout.ts` makes: a fallback would serve the
    // English manifest at every address somebody mistyped.
    await expect(call('fr')).rejects.toThrow();
  });
});
