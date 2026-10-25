import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PALETTES, type Scheme } from '@shipan/plate';
import { describe, expect, it } from 'vitest';

/*
 * The page repeats the plate's five phases rather than importing them (the
 * reason is at the head of `app.css`), and a copy is something that drifts.
 * Each block that declares a phase is held to the palette of its appearance.
 */
const css = readFileSync(fileURLToPath(new URL('../src/app.css', import.meta.url)), 'utf8');

const PHASES = ['mu', 'huo', 'tu', 'jin', 'shui'] as const;

/** The declarations of the first block opened by `opening`, up to its brace. */
function block(opening: string): Map<string, string> {
  const start = css.indexOf(opening);
  if (start < 0) throw new Error(`no block opens with ${opening}`);
  const body = css.slice(start + opening.length, css.indexOf('}', start));
  const declared = new Map<string, string>();
  for (const [, name, value] of body.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    declared.set(name as string, (value as string).trim());
  }
  return declared;
}

const BLOCKS: [string, string, Scheme][] = [
  ['the default', ':root {', 'light'],
  ['the system dark', '@media (prefers-color-scheme: dark) {\n  :root {', 'dark'],
  ['the chosen light', ":root[data-color-scheme='light'] {", 'light'],
  ['the chosen dark', ":root[data-color-scheme='dark'] {", 'dark'],
];

describe('the page carries the plate’s phases', () => {
  for (const [name, opening, scheme] of BLOCKS) {
    it(`in ${name} appearance`, () => {
      const declared = block(opening);
      for (const phase of PHASES) {
        expect(declared.get(`--element-${phase}`)).toBe(PALETTES[scheme].element[phase]);
        expect(declared.get(`--element-ink-${phase}`)).toBe(PALETTES[scheme].elementInk[phase]);
      }
    });
  }
});
