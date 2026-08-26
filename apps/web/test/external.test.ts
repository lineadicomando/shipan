import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * Every link that leaves the site, held to `lib/external.ts`.
 *
 * The list is derived rather than written: an address that leaves this site
 * is a constant in `lib/` holding an absolute `http(s)` address, and this
 * file goes looking for those and then for the anchors that name them. A
 * second external link therefore arrives already covered — which is the point,
 * since a hand-kept list of links is a list that is right until somebody adds
 * the twelfth one.
 */
const SRC = fileURLToPath(new URL('../src/', import.meta.url));

const walk = (dir: string, ext: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return walk(path, ext);
    return path.endsWith(ext) ? [path] : [];
  });

/** Markup only: this project argues at length in its comments. */
const markup = (path: string): string =>
  readFileSync(path, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');

const COMPONENTS = walk(SRC, '.svelte').map((path) => ({ path, code: markup(path) }));

/**
 * The names of the constants that hold an address off this site. `SOURCE_URL`
 * is the only one today; `env.PUBLIC_SOURCE_URL || 'https://…'` is why the
 * pattern reads to the end of the statement rather than to the first quote.
 */
const ADDRESSES = walk(join(SRC, 'lib'), '.ts')
  .map((path) => readFileSync(path, 'utf8'))
  .flatMap((code) => [...code.matchAll(/export const (\w+)[^=]*=[^;]*'https?:\/\//g)])
  .map((match) => match[1]);

/** Every `<a …>` opening tag in a component, with the file it came from. */
const ANCHORS = COMPONENTS.flatMap(({ path, code }) =>
  [...code.matchAll(/<a\s[^>]*>/g)].map((match) => ({ path, tag: match[0] })),
);

describe('a link that leaves the site', () => {
  it('is described in one place', () => {
    const rule = readFileSync(join(SRC, 'lib/external.ts'), 'utf8');
    expect(rule).toContain("target: '_blank'");
    expect(rule).toMatch(/rel: '[^']*\bnoopener\b[^']*'/);
    // The address a referrer would carry is frequently somebody's birth.
    expect(rule).toMatch(/rel: '[^']*\bnoreferrer\b[^']*'/);
  });

  it('has an address that is not written into the markup', () => {
    for (const { path, tag } of ANCHORS) {
      expect(tag, path).not.toMatch(/href="https?:/);
    }
  });

  it('is found at all, so that the rest of this file means something', () => {
    expect(ADDRESSES.length).toBeGreaterThan(0);
    expect(ANCHORS.length).toBeGreaterThan(0);
  });

  it('opens beside the page and carries no referrer', () => {
    const leaving = ANCHORS.filter(({ tag }) => ADDRESSES.some((name) => tag.includes(name)));
    expect(leaving.length).toBe(ADDRESSES.length);
    for (const { path, tag } of leaving) {
      expect(tag, path).toContain('{...EXTERNAL}');
    }
  });

  /** Nobody restates the rule beside the constant that carries it. */
  it('spells neither attribute out by hand', () => {
    for (const { path, code } of COMPONENTS) {
      expect(code, path).not.toContain('target="_blank"');
      expect(code, path).not.toContain('rel="noopener');
    }
  });
});
