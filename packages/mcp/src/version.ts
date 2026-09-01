import { readFileSync } from 'node:fs';

/**
 * The version this server announces in its handshake.
 *
 * **Read from `package.json` rather than typed out.** The constant that used
 * to sit here said `0.0.0`, and it said it through every change the project
 * has had: a version written twice is a version that is right in one of the
 * two places. The file is beside `src` and beside `dist` alike, so the same
 * relative address answers whether this runs from TypeScript or from the
 * build.
 *
 * The whole repository moves as one number — `apps/web/test/version.test.ts`
 * holds every workspace to it — and a release tag is `v` followed by it.
 */
const manifest = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as { version: string };

export const SERVER_VERSION: string = manifest.version;
