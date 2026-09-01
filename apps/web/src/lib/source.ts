import { env } from '$env/dynamic/public';

/**
 * Where the source of *this copy* is.
 *
 * The footer has always said the code is AGPL-3.0. Saying so is half of what
 * that licence asks for: §13 owes anybody who interacts with this over a
 * network the Corresponding Source of the copy they are talking to, and a
 * sentence naming the licence without naming an address is the half that
 * costs nothing to state and everything to leave out. The line is therefore
 * a link, and this is the only place the address is written.
 *
 * **Read per request rather than baked in at build.** The failure worth
 * guarding against is a fork whose footer points at somebody else's
 * repository — a host in violation until the address is right, and right by
 * setting `PUBLIC_SOURCE_URL` rather than by rebuilding. Nothing here is
 * prerendered under the footer, which is what makes a per-request read
 * available at all: `[lang]/offline` is the one page built ahead of time and
 * it wears no footer.
 *
 * **The fallback is this project's own repository**, which is the true answer
 * for every unmodified copy. An offer that disappears when a variable is
 * unset is the one outcome the licence does not allow, so there is no branch
 * here where the reader is shown nothing.
 */
export const SOURCE_URL = env.PUBLIC_SOURCE_URL || 'https://github.com/lineadicomando/shipan';

/**
 * Where an error in this copy is reported.
 *
 * Derived from the address above rather than written beside it, for the
 * reason that address is read per request: a fork whose footer points at its
 * own repository would otherwise send its readers' bug reports to somebody
 * else's issue tracker. One address, one home, and the tracker follows
 * whichever repository the copy belongs to.
 *
 * The `/issues` path is GitHub's, which is where this project is hosted and
 * what `PUBLIC_SOURCE_URL` is expected to point at. A fork elsewhere sets the
 * variable and gets a link that is wrong in its last segment rather than one
 * that is wrong entirely — and the notes page names GitHub in the label, so
 * nothing here promises a tracker the address cannot reach.
 */
export const ISSUES_URL = `${SOURCE_URL.replace(/\/+$/, '')}/issues`;
