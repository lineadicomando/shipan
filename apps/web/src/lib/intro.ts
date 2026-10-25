/**
 * Which sections a reader has folded the introduction of.
 *
 * Open is the state the page ships in, and the absence of a choice: a section
 * nobody has folded leaves nothing behind, and unfolding the last one removes
 * the key. What is kept is a list of section names and nothing else — never a
 * date, a place or anything a board was laid from.
 *
 * **Per section, not once for the site.** The two paragraphs are written for
 * somebody who has not met the art, and a reader who has met 奇門 and not
 * 太乙 is the ordinary case: folding one is not a verdict on the others.
 */

/**
 * The key in `localStorage`, named in the privacy note: if it changes here it
 * changes there too, and in `app.html`, which reads it before the paint.
 */
export const INTRO_KEY = 'shipan:intro-folded';

/**
 * The attribute `app.html` sets on `<html>` when the page being opened is a
 * section whose introduction is folded, so that the paragraphs are gone before
 * the first paint rather than collapsing under the reader after hydration.
 */
export const INTRO_ATTRIBUTE = 'data-intro-folded';

/**
 * The name a section is kept under. The consultation's slug is empty, and an
 * empty word cannot stand in a list of words. `app.html` repeats this.
 */
export function introToken(slug: string): string {
  return slug || 'consult';
}

/** Outside a browser, or with storage refused, nothing is folded. */
export function readFolded(): Set<string> {
  try {
    const kept = localStorage.getItem(INTRO_KEY);
    return new Set((kept ?? '').split(' ').filter(Boolean));
  } catch {
    return new Set();
  }
}

export function isFolded(slug: string): boolean {
  return readFolded().has(introToken(slug));
}

/** Says on `<html>` whether the page in front of the reader is folded. */
export function markFolded(folded: boolean): void {
  if (typeof document === 'undefined') return;
  if (folded) document.documentElement.setAttribute(INTRO_ATTRIBUTE, '');
  else document.documentElement.removeAttribute(INTRO_ATTRIBUTE);
}

export function setFolded(slug: string, folded: boolean): void {
  markFolded(folded);

  const all = readFolded();
  if (folded) all.add(introToken(slug));
  else all.delete(introToken(slug));

  try {
    if (all.size === 0) localStorage.removeItem(INTRO_KEY);
    else localStorage.setItem(INTRO_KEY, [...all].join(' '));
  } catch {
    // The fold still holds on this page: not being able to remember it is no
    // reason not to apply it.
  }
}
