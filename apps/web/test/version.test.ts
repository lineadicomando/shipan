import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { NAME, PRERELEASE, VERSION } from '../src/lib/version';

/**
 * One number for the whole repository, and the surfaces that spend it.
 *
 * The version is a fact npm already keeps, so nothing here writes it out a
 * second time: `lib/version.ts` imports it, the MCP server reads it from its
 * own manifest, and a release tag is `v` followed by it. What that leaves is
 * the failure a monorepo actually has — six manifests drifting apart, one
 * bumped and five forgotten — and it is the kind of thing only a test
 * notices, since every package builds and every page renders either way.
 *
 * It lives here for the reason `docs.test.ts` and `catalog-keys.test.ts` do:
 * answering the question means reading every workspace, and the packages
 * below are leaves that may not reach sideways into each other.
 */
const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

/** A module with its comments taken out: this project argues in them, and
 *  every argument here quotes the very constant it is arguing against. */
const code = (path: string): string =>
  readFileSync(join(ROOT, path), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

const manifest = (path: string): { name?: string; version?: string } =>
  JSON.parse(readFileSync(join(ROOT, path, 'package.json'), 'utf8'));

/** Every workspace, read off the directories the root manifest declares. */
const WORKSPACES = ['packages', 'apps'].flatMap((group) =>
  readdirSync(join(ROOT, group)).map((entry) => `${group}/${entry}`),
);

describe('the version', () => {
  it('is one number across every workspace', () => {
    for (const workspace of WORKSPACES) {
      expect(manifest(workspace).version, workspace).toBe(VERSION);
    }
    expect(manifest('.').version).toBe(VERSION);
  });

  it('is semantic, so that a leading zero means what it says', () => {
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  /**
   * The alpha state is derived from the number and declared nowhere. A second
   * flag saying «alpha» could disagree with the version standing beside it,
   * and the two would be read by the same person in the same footer.
   */
  it('says it is before 1.0.0 by being before 1.0.0', () => {
    const [major] = VERSION.split('.');
    expect(PRERELEASE).toBe(major === '0');
  });

  it('is read from the manifest rather than typed out', () => {
    const source = code('apps/web/src/lib/version.ts');
    expect(readFileSync(join(ROOT, 'apps/web/src/lib/version.ts'), 'utf8')).toContain(
      "from '../../package.json'",
    );
    expect(source).not.toMatch(/VERSION\s*=\s*'/);
  });

  /** The MCP server announced `0.0.0` through every change this project had. */
  it('is what the MCP server announces', () => {
    const source = code('packages/mcp/src/version.ts');
    expect(source).toContain("'../package.json'");
    expect(source).not.toMatch(/SERVER_VERSION[^=]*=\s*'/);
  });
});

describe('the footer and the notes agree about the copy', () => {
  const layout = readFileSync(join(ROOT, 'apps/web/src/routes/[lang]/+layout.svelte'), 'utf8');
  const page = readFileSync(join(ROOT, 'apps/web/src/routes/[lang]/notes/+page.svelte'), 'utf8');

  it('names the project once, where the version is', () => {
    expect(NAME).toBe('shipan');
    expect(layout).toContain("from '$lib/version'");
    expect(page).toContain("from '$lib/version'");
  });

  /** A number alone is a fact the reader can do nothing with. */
  it('links the footer to the paragraph that says what the number means', () => {
    expect(layout).toContain('/notes#release');
    expect(page).toContain('id="release"');
  });
});
