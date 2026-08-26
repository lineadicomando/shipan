import type { MessageKey } from '@shipan/i18n';
import { genderBelongsToBoard } from '$lib/instruments';

/**
 * The sections, in the order the header lists them, and in two kinds.
 *
 * **Acts first, instruments after.** A consultation and the choosing of a
 * time are things a reader *does*: one asks a question at an instant, the
 * other looks through a stretch of them for an hour. The three that follow
 * are boards they *look at*. That division is the one this site is arranged
 * by, and the consultation leads because the classical use of these methods
 * is a question put at an instant.
 *
 * It was written here before and stated as «the consultation, and the three
 * sections after it are the instruments that use serves itself with» — which
 * stopped being true when the 六壬 board made them four, one of which was an
 * act. The order now says what the sentence always meant.
 *
 * **The division governs the labels too, and that is easy to get wrong.** An
 * act is *described*, in the reader's own language, so `nav.consult` and
 * `nav.moments` differ between the catalogs. An instrument is *named*, and a
 * name does not translate: `Qi Men`, `Liu Ren`, `Qi Zheng` and `Ba Zi`
 * are identical in both. The 七政四餘 section arrived as «Seven Governors»
 * and «Sette governatori» — a gloss where the other three had names, and the
 * only instrument label in the two catalogs that was not the same string,
 * which is what gave it away. The heading is where the gloss belongs: a
 * reader who clicks a name they do not know lands on a page that says what it
 * is, and a nav item has no room to.
 *
 * **The six instruments are in the order the consultation offers them**, and
 * that is one order rather than two lists that happen to agree. It is the span
 * of what each board is about: 奇門 and 六壬 are put at an instant, 太乙 is
 * laid on a year, and the three of 命 are laid on a life — and within those,
 * the widest frame first, the sky a birth happened under before the seats it
 * is counted in before what it is made of. See `INSTRUMENTS` in
 * `instruments.ts`, which is where the argument is written out. A reader meets
 * these arts here, and the select they open afterwards should not make them
 * learn the row a second time.
 *
 * **What the grouping does not say is which art a section uses.** Choosing a
 * time walks Qi Men charts and only those, and no arrangement of a flat list
 * can carry that: a nav says where things are, not what they are made of. It
 * is said on that section's own page, in its title and in its opening line,
 * which is where somebody reading results needs it.
 *
 * The cost of the order is paid knowingly and it is the chart's address.
 * `/[lang]` was the chart of now and is now a form: a link to a chart is
 * `/[lang]/qimen` with the moment in it.
 *
 * **A slug is the name of what the section holds, and `chart` was not one.**
 * Every other instrument here is addressed by the art it lays out, and that
 * one was addressed by the shape its answer comes out in — which reads as a
 * generic where the neighbours read as names, and stops saying anything at
 * all now that six sections draw a board apiece. The label above it never
 * said `Chart`: it has said `Qi Men` since there was a nav, so the rename
 * moved the address to where the word already was rather than changing what
 * a reader sees.
 */
export const SECTIONS: readonly {
  slug: string;
  label: MessageKey;
  /**
   * The heading the section is met by: the name at full length, and what the
   * page lays out under it.
   *
   * **Two names and not three.** A label has a bar eight items wide to fit
   * into and is cut to fit it; this is the line at the top of the page, which
   * has to stand alone and so is the one that carries a gloss. `Ba Zi` in the
   * bar, `Ba Zi — una nascita in quattro pilastri` over the form.
   *
   * There was a third — the name at full length and nothing else, `Qi Men Dun
   * Jia` — worn by whichever item the bar was currently on and then spent on
   * the link into the notes. Both readers went: the bar because a row that
   * changes width moves what a reader is aiming at, and the link because it
   * sits four lines under this heading, where saying the name a second time
   * is a repetition rather than anchor text. A name at full length is not a
   * register this site has a use for; it is the opening of a heading.
   *
   * Listed here rather than built as `` `h1.${slug}` `` where it is read:
   * `catalog-keys.test.ts` finds a templated key live by the prefix in front
   * of the interpolation, so a component composing this from a slug would
   * hide sixteen messages from the one test that notices when a message has
   * gone dead.
   */
  heading: MessageKey;
  /** Which of the two kinds it is, for the break the header sets between them. */
  group: 'act' | 'instrument';
}[] = [
  { slug: '', label: 'nav.consult', heading: 'h1.consult', group: 'act' },
  { slug: 'moments', label: 'nav.moments', heading: 'h1.moments', group: 'act' },
  { slug: 'qimen', label: 'nav.qimen', heading: 'h1.qimen', group: 'instrument' },
  { slug: 'liuren', label: 'nav.liuren', heading: 'h1.liuren', group: 'instrument' },
  { slug: 'taiyi', label: 'nav.taiyi', heading: 'h1.taiyi', group: 'instrument' },
  { slug: 'qizheng', label: 'nav.qizheng', heading: 'h1.qizheng', group: 'instrument' },
  { slug: 'ziwei', label: 'nav.ziwei', heading: 'h1.ziwei', group: 'instrument' },
  { slug: 'bazi', label: 'nav.bazi', heading: 'h1.bazi', group: 'instrument' },
];

/**
 * `search` carries the moment across.
 *
 * The chart and the pillars ask different questions of the same instant, and
 * someone who has just cast a chart and wants the pillars of it should not
 * have to type the date, the time and the place again. Parameters the other
 * section has no use for are harmless: an endpoint reads what it knows.
 *
 * The scan is the exception, and it costs nothing. It takes an interval where
 * those two take an instant, so `date` and `time` mean nothing to it and
 * `from` and `to` mean nothing to them; the place, which all three share,
 * still travels. What the scan hands back is a link the other way — a row of
 * its answer opens the whole board for that hour in the chart section.
 */
export function href(locale: string, slug: string, search = ''): string {
  return `${slug ? `/${locale}/${slug}` : `/${locale}`}${search}`;
}

/**
 * The search string a section link may carry across, which turns on where the
 * link goes.
 *
 * The moment travels — that is what carrying `search` is for — and the birth
 * does not. `born` and its companions are the parameters `pageAddress` keeps
 * out of every shareable address for the same reason: they are somebody's
 * birth, they belong to the section that asked for them, and a header link
 * that hauled them along would write them into the address of every section
 * visited after a consultation.
 *
 * `gender` is the one that reads differently by destination, which is why this
 * takes one. Under 八字 and 紫微斗數 it is a parameter of the board, so a
 * reader who set it in one and clicks the other meets the board they asked for
 * instead of an empty field they already filled; under 奇門 it is the
 * direction a 年命's 行年 counts and travels only with the birth it is half
 * of. `genderBelongsToBoard` settles it, and settles it for `pageAddress` in
 * the same words — one parameter, one reading, both surfaces.
 *
 * `instrument` is dropped for a different reason and the same effect: which
 * board a question is put to is the consultation's own setup and means
 * nothing in a section that is one board already. Carried, it would write a
 * parameter into every address that reads it that nothing there reads.
 */
export function carriedSearch(search: string, section: string): string {
  const params = new URLSearchParams(search);
  const dropped = ['born', 'bornTime', 'bornTz', 'years', 'instrument'];
  if (!genderBelongsToBoard(section)) dropped.push('gender');
  for (const only of dropped) {
    params.delete(only);
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

/**
 * Whether a click on a link meant *here*, or meant *somewhere else*.
 *
 * A modifier, or any button but the first, is how a person says "open this
 * apart from what I am reading". A script that takes a link over must let
 * those through: preventing them would be taking away the one thing that was
 * asked for.
 *
 * Which is why what a script takes over stays a link. `href` remains what a
 * middle click, a new tab, a saved bookmark and a page without scripts all
 * get; only the plain click is answered here, and a button in its place would
 * have thrown all four away to gain nothing.
 */
export function isPlainClick(event: MouseEvent): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

/**
 * Whether a section is the one being read.
 *
 * The consultation lives at the root of a language, so a plain `startsWith`
 * would mark it current on every page of the site.
 */
export function isCurrent(locale: string, slug: string, pathname: string): boolean {
  const target = href(locale, slug);
  return slug ? pathname === target || pathname.startsWith(`${target}/`) : pathname === target;
}
