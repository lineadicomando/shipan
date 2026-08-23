import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * The worker read as text, because it cannot be read any other way.
 *
 * A service worker compiles against a worker global scope, registers its
 * listeners at the top level and exports nothing, so no test can import it
 * and call it. That is why the rule it obeys lives in `lib/cacheable.ts`,
 * where `cacheable.test.ts` exercises it properly.
 *
 * What is left for this file is the half a unit test cannot reach, and it is
 * the half that would be added in a hurry six months from now: a caching
 * branch that writes a page back, or a notification API arriving with a
 * feature nobody asked for. Reading the source is a blunt instrument and it
 * is the only one there is — and blunt is acceptable here, because both
 * things it looks for are things somebody would have to type on purpose.
 */
const SOURCE = readFileSync(
  fileURLToPath(new URL('../src/service-worker.ts', import.meta.url)),
  'utf8',
);

/** The source with its comments taken out: this file is prose-heavy on purpose. */
const CODE = SOURCE.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

describe('the service worker', () => {
  describe('has nothing to tell anybody unprompted', () => {
    /**
     * No notification of any kind, and it is a decision rather than an
     * omission. This site is asked a question when somebody has one; it never
     * has anything to say first, and a permission prompt for a capability it
     * would never use is a prompt asked in bad faith.
     */
    for (const forbidden of [
      'showNotification',
      'Notification',
      'pushManager',
      'PushSubscription',
      'periodicsync',
      'notificationclick',
      'notificationclose',
    ]) {
      it(`does not reach for ${forbidden}`, () => {
        expect(CODE).not.toContain(forbidden);
      });
    }

    it('listens for nothing but install, activate and fetch', () => {
      const listened = [...CODE.matchAll(/addEventListener\(\s*'([a-z]+)'/g)].map((m) => m[1]);
      expect(listened.length).toBeGreaterThan(0);
      expect(new Set(listened)).toEqual(new Set(['install', 'activate', 'fetch']));
    });
  });

  describe('keeps no chart of anybody’s', () => {
    it('writes to the cache in one place, and that place is the install', () => {
      /**
       * `addAll` at install is the only write there is, so the cache can only
       * ever hold what the build put in it. Any second write — a `cache.put`,
       * an `addAll` in a fetch handler — is the change that would quietly
       * start storing somebody's date of birth, and it fails here.
       */
      const writes = [...CODE.matchAll(/cache\.(put|add|addAll)\(/g)].map((m) => m[1]);
      expect(writes).toEqual(['addAll']);

      const install = CODE.slice(CODE.indexOf("addEventListener('install'"), CODE.indexOf("addEventListener('activate'"));
      expect(install).toContain('cache.addAll');
    });

    it('asks the rule rather than restating it', () => {
      // The decision lives in `lib/cacheable.ts` and has its own test. A
      // worker that grew its own copy of it would be a worker whose copy
      // drifts.
      expect(CODE).toContain("from '$lib/cacheable'");
      expect(CODE).toContain('mayCache(');
      // And it does not carry a second, hand-written idea of what `/api` is.
      expect(CODE).not.toContain("'/api");
    });
  });

  it('precaches what the build produced and nothing it invented', () => {
    // `$service-worker` is the only source of what exists. A path typed into
    // this file by hand is a path that goes stale at the next build.
    expect(CODE).toContain("from '$service-worker'");
    const precache = /const PRECACHE = \[([^\]]*)\]/.exec(CODE);
    expect(precache, 'the worker should declare PRECACHE as an array literal').not.toBeNull();
    expect(precache?.[1]).toBe('...build, ...files, ...prerendered');
  });
});
