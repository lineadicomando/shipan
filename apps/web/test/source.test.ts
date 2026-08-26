import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * The offer the licence makes, read as text.
 *
 * `lib/source.ts` imports `$env/dynamic/public`, which resolves inside a
 * SvelteKit build and nowhere else, so no test here can import it and read
 * the value. What is left is the blunt instrument `service-worker.test.ts`
 * uses for the same reason — and blunt is enough, because every way of
 * breaking this is a thing somebody would have to type on purpose: dropping
 * the anchor back to a bare sentence, hard-coding an address at the surface,
 * or leaving the variable with no answer when it is unset.
 */
const read = (path: string): string =>
  readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8');

const SOURCE = read('../src/lib/source.ts');
const LAYOUT = read('../src/routes/[lang]/+layout.svelte');

/** The layout with its comments taken out: this project argues in them. */
const MARKUP = LAYOUT.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

describe('the address of the source', () => {
  it('is read from the environment', () => {
    expect(SOURCE).toContain("from '$env/dynamic/public'");
    expect(SOURCE).toContain('env.PUBLIC_SOURCE_URL');
  });

  /**
   * A fork sets `PUBLIC_SOURCE_URL` to its own repository. One that has not
   * set it yet still owes its readers an address, and an unset variable that
   * rendered an empty `href` would take the offer away exactly when nobody
   * is watching. So the fallback is absolute and it is this repository.
   */
  it('falls back to a repository that can be reached', () => {
    const fallback = SOURCE.match(/env\.PUBLIC_SOURCE_URL \|\| '([^']+)'/);
    expect(fallback?.[1]).toMatch(/^https:\/\/\S+$/);
  });

  it('is written in one place', () => {
    const elsewhere = MARKUP.match(/https:\/\/github\.com/g) ?? [];
    expect(elsewhere).toHaveLength(0);
  });
});

describe('the footer', () => {
  /**
   * AGPL-3.0 §13. The sentence naming the licence is the label of the link
   * that answers it; a footer that says the code is free and does not say
   * where it is has stated half an obligation.
   */
  it('carries the licence line as a link to the source', () => {
    expect(MARKUP).toMatch(
      /<a class="source" href=\{SOURCE_URL\}[^>]*>\{t\('footer\.licence'\)\}<\/a>/,
    );
    expect(LAYOUT).toContain("import { SOURCE_URL } from '$lib/source'");
  });

  /**
   * Paper is the fourth appearance, and it is the appearance where an anchor
   * stops being an offer. See `docs/architecture.md`.
   */
  it('prints the address it cannot be pressed for', () => {
    const print = LAYOUT.slice(LAYOUT.indexOf('@media print'));
    expect(print).toMatch(/\.source::after\s*\{\s*content:[^}]*attr\(href\)/);
  });
});
