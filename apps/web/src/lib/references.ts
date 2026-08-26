/**
 * The runnable references the register was checked on, and where to find them.
 *
 * **A page that says «checked against X» owes the reader X.** The sources page
 * is the strongest thing on this site — every quantity, what it stands on, and
 * the rung it was weighed at — and until now it named nine programs and led to
 * none of them. A reader who wants to know what agreeing with `liuren-ts-lib`
 * is worth has to be able to go and look at `liuren-ts-lib`; without that, the
 * column is a claim about a check that only its author can repeat.
 *
 * **The runnable ones, and not the texts.** 《統宗》卷一, 儀象考成 and their
 * neighbours are cited in the register too, and they are deliberately absent
 * here: a link to a text is a claim about *which edition*, and this project
 * spends whole sections of `docs/sources.md` on exactly that question. An
 * address that answered it in passing, in a list, would be the sloppiest
 * statement of a fact the register is careful about everywhere else. A program
 * has one address and one name, and the registry that holds it settles both.
 *
 * **A registry rather than a package page for the two websites.** Seven of the
 * nine are published on npm or PyPI, where the address is canonical, the name
 * is the identifier and the version history outlives any one release. The two
 * that are not are web tools, and they get the page that computes the chart —
 * which is the thing that was actually run.
 *
 * Not dependencies of anything here. These were run once, against this engine,
 * over the spans the register states; `docs/sources.md` argues each comparison
 * at length and this is only the way back to what was compared.
 */

/** A program the register names, and the address it is published at. */
export interface Reference {
  /**
   * As `docs/sources.tsv` writes it, which is what holds the two together.
   *
   * `test/references.test.ts` reads the register and fails on a name nothing
   * there says any more — a link to a program this engine has stopped
   * comparing itself to is a link to somebody else's work under a claim that
   * has been withdrawn.
   */
  readonly name: string;
  readonly where: string;
}

/**
 * In the order the register meets them: the calendrical layer first, then the
 * boards in the order the consultation offers them.
 */
export const REFERENCES: readonly Reference[] = [
  { name: 'lunar-javascript', where: 'https://www.npmjs.com/package/lunar-javascript' },
  { name: 'qimen-dunjia', where: 'https://www.npmjs.com/package/qimen-dunjia' },
  { name: 'kinqimen', where: 'https://pypi.org/project/kinqimen/' },
  { name: 'fengshui-hacks', where: 'https://fengshui-hacks.com/cgi-bin/plotChart.pl' },
  { name: 'ktonko.com', where: 'https://ktonko.com/' },
  { name: 'kinliuren', where: 'https://pypi.org/project/kinliuren/' },
  { name: 'liuren-ts-lib', where: 'https://www.npmjs.com/package/liuren-ts-lib' },
  { name: 'iztro', where: 'https://www.npmjs.com/package/iztro' },
  { name: 'fortel-ziweidoushu', where: 'https://www.npmjs.com/package/fortel-ziweidoushu' },
];
