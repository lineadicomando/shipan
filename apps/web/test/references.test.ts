import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { REFERENCES } from '../src/lib/references';

/**
 * The links out of the sources page, held to the register they come from.
 *
 * **A link to somebody else's work stands on a claim, and the claim is in the
 * register.** Every name in `references.ts` is there because a row of
 * `docs/sources.tsv` says a quantity was checked on it; if a comparison is
 * dropped — because it was superseded, or because the reference turned out
 * not to be independent, both of which have happened here — the row goes and
 * the link must go with it. Left behind, it points a reader at a program
 * under a claim this project has withdrawn.
 *
 * The other direction is not checked and cannot be. What in that column is a
 * runnable program and what is a text is a distinction a reader makes and a
 * regular expression does not: `《統宗》卷一` and `qimen-dunjia` are both
 * things a quantity was held against, and only one of them has an address
 * that means anything.
 */
const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

/** The column of the register that says what a quantity was checked on. */
const CHECKED = readFileSync(join(ROOT, 'docs/sources.tsv'), 'utf8')
  .split('\n')
  .slice(1)
  .map((line) => line.split('\t')[4] ?? '')
  .join('\n');

describe('the programs the sources page links to', () => {
  it('names each one the way the register names it', () => {
    for (const { name } of REFERENCES) {
      expect(CHECKED, `nothing in docs/sources.tsv is checked on ${name}`).toContain(name);
    }
  });

  it('gives each one address, and an absolute one', () => {
    for (const { name, where } of REFERENCES) {
      expect(where, name).toMatch(/^https:\/\/[^\s]+$/);
    }
  });

  it('names none of them twice', () => {
    expect(new Set(REFERENCES.map((reference) => reference.name)).size).toBe(REFERENCES.length);
    expect(new Set(REFERENCES.map((reference) => reference.where)).size).toBe(REFERENCES.length);
  });

  it('leads away from this site and nowhere near it', () => {
    // `external.ts` is what makes these open beside the page and carry no
    // referrer; what this adds is that they are somebody else's site at all.
    // A relative address here would be a link the rule does not cover.
    for (const { name, where } of REFERENCES) {
      expect(new URL(where).hostname, name).not.toContain('shipan');
    }
  });
});
