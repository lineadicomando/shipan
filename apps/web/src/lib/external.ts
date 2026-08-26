/**
 * What every link that leaves this site carries.
 *
 * **It opens beside the page rather than over it.** A reader here is looking
 * at a board cast for a moment they chose, and on the consultation at a
 * prompt they are part-way through assembling; a link that replaced it would
 * cost them the page and, on the back button, the scroll position they left.
 * Nothing here is a step in a flow somebody should be taken out of.
 *
 * **`noreferrer` is not politeness, it is the same rule the rest of the site
 * obeys.** An address in this interface is frequently somebody's date, time
 * and place of birth, written into the query string — which is why a chart is
 * cacheable `private` and refused an index. A referrer would hand that whole
 * address to whoever is at the other end of the link. Browsers today send
 * only the origin across sites, and «today» is exactly the kind of default
 * this project does not leave a person's birth resting on.
 *
 * **`noopener` with it**, for the window handle. Also implied by `_blank` in
 * current browsers, and stated for the reason above.
 *
 * Spread onto the anchor — `<a href={…} {...EXTERNAL}>` — so that the rule is
 * in one place and a second external link inherits it by construction.
 * `apps/web/test/external.test.ts` holds every link to it.
 */
export const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const;
