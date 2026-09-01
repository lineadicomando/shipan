import { version } from '../../package.json';

/**
 * What copy of this the reader is talking to.
 *
 * **The number is read from `package.json` rather than written here.** A
 * version is already a fact npm keeps, and a constant typed out beside it is
 * a second copy of that fact which nothing prevents from drifting — the MCP
 * server carried `SERVER_VERSION = '0.0.0'` through every change this project
 * has had, and it was wrong the day after it was written. The import is
 * resolved at build time, so what ships to the browser is the string and not
 * the file.
 *
 * **The tag repeats the number, and the number is not read from the tag.** A
 * release is `v` followed by this — `v0.1.0` — because a checkout is a thing
 * that happens without tags, in a tarball, in a container image, in a fork:
 * a footer that derived its version from `git describe` would say nothing at
 * all in exactly the copies a reader is most likely to be talking to.
 * `apps/web/test/version.test.ts` holds every workspace to the one number.
 *
 * **`PRERELEASE` is derived and not declared.** Semantic versioning already
 * says what a leading zero means — the interface may change, and one release
 * is not obliged to the one before it — so a second flag saying «alpha» would
 * be a fact that can disagree with the number beside it. The notes page shows
 * its release paragraph while this is true, and stops showing it at 1.0.0
 * without anybody remembering to take it down.
 */
export const VERSION = version;

/** The name, spent twice: on the mark in the header and beside the version in
 * the footer. A name is not translated and takes no article — `author.ts`
 * argues that about the handle, and it holds here for the same reason, which
 * is why the catalogs hold the sentence around it and never the word itself. */
export const NAME = 'shipan';

/** Whether this copy is before 1.0.0, where nothing is promised to the next one. */
export const PRERELEASE = /^0\./.test(VERSION);
