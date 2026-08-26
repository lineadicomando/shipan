/**
 * A name found inside a sentence, so that each half of it can be set in the
 * face its own script asks for.
 *
 * **A name here is three things and the prose carries all three.** 紫微斗數
 * zǐwēi dǒushù is the glyphs, the reading and — in the clause around it — the
 * gloss, and `docs/i18n.md` is why: hanzi are not a locale, a name carries its
 * reading, and neither travels without the other. What that leaves is a
 * paragraph with two alphabets and a romanisation in it, all set in one face,
 * where a reader who does not read Chinese meets `zǐwēi dǒushù` as two Italian
 * words that have gone wrong. Italic says what it is: not a word of the
 * sentence, a word being *quoted* into it, which is what italic has said in
 * Italian typography since it existed.
 *
 * **And the glyphs want the face they have everywhere else.** A Latin serif
 * holds no hanzi, so inside a paragraph they fell to whatever the system
 * offered — a different face from the `.glyph` this site sets them in on
 * every board and in every table, and at the same `font-size` a visibly
 * larger one, which is how 紫微斗數 came to loom over the sentence it was in.
 * One character, one face, wherever it stands.
 *
 * **Found rather than written, because writing it would put markup in the
 * catalogs.** A message is a sentence a translator can rewrite; the moment it
 * holds a `<i>` it is a sentence a translator can break, and the one thing
 * the catalogs may not become is a template language. So the reading is
 * located in the finished string, at the surface, where it is a matter of
 * setting and not of wording.
 *
 * **What reads this is `Named.svelte` and nothing else.** What comes back is
 * data, never markup, so a second reader building its own spans is the way two
 * paragraphs on one site start disagreeing. A control's label is the one place
 * this cannot reach: an `<option>` is text and holds no elements, so the names
 * in `form.method.chaibu` and its neighbours stay as they are.
 *
 * **What is located is narrow on purpose.** A reading here always stands
 * immediately after the glyphs it reads — that is the house rule, kept on
 * every surface — so nothing is searched for on its own: a run of hanzi is
 * found first, and what may follow it is the words that could be its reading
 * and nothing beyond them. `test/names.test.ts` holds every name in both
 * catalogs to that, so a paragraph that puts a reading somewhere else fails a
 * test rather than shipping with an Italian word in italic.
 */

/** The glyphs, as a name is written. */
const HANZI = '\\u3400-\\u9FFF';

/**
 * The marked vowels a reading is spelled with.
 *
 * Grave and acute are shared with Italian, which is the whole of the
 * difficulty: `shìpán è la tavola` puts «è» directly behind a reading, and
 * nothing in its shape says it is not a third syllable of one. What settles it
 * is length — see `looksSaid`.
 */
const TONES = 'āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹḿ';

/** A run of glyphs, and the lowercase words that may be reading it. */
const NAMED = new RegExp(`([${HANZI}]+)((?:\\s+[a-z${TONES}]+)*)`, 'gu');

const TONED = new RegExp(`[${TONES}]`, 'u');

/**
 * Whether a word can be a syllable of a reading rather than one of the
 * sentence.
 *
 * Two conditions and the second is doing the work no dictionary would do
 * better. A syllable of pinyin carries a tone mark here, and every reading
 * this project prints is written with them. That alone would take «è», «già»
 * and «più» along with it, which are Italian words that happen to be spelled
 * out of the same letters — so a word of one character is refused, and that
 * is exactly the case that occurs: «è» stands behind 式盤 shìpán in the
 * consultation's opening line and is the only collision either catalog has.
 *
 * The rest of the guard is the test, and deliberately so. `names.test.ts` reads
 * every message with a name in it and holds the readings found to the readings
 * this project uses, in both vernaculars, so a longer Italian word arriving
 * behind a name — «così», «perché» — fails there rather than being defended
 * against here by a list of words that would have to grow with every
 * vernacular. See `docs/i18n.md`: what a third language costs is the measure
 * of anything added, and a stop-list of accented words is a cost per language.
 */
const looksSaid = (word: string): boolean => word.length > 1 && TONED.test(word);

/**
 * Which of three things a stretch of a sentence is.
 *
 * `glyph` and `said` are the two halves of a name and `plain` is the sentence
 * around them. Three and not two because the glyphs want a face of their own
 * as much as the reading wants a slope: a Latin serif has no hanzi in it, so
 * left alone they fall to whatever the system offers, which is a different
 * face from the one this site sets them in everywhere else — and, at the same
 * `font-size`, a visibly larger one.
 */
export type Part = 'plain' | 'glyph' | 'said';

/** A stretch of a sentence, and what it is. */
export interface Segment {
  readonly text: string;
  readonly part: Part;
}

/**
 * A sentence cut into the readings inside it and everything else.
 *
 * Returned as a list rather than as marked-up text: what comes back is data a
 * component renders, so nothing here builds HTML and nothing downstream has to
 * trust a string. Adjacent stretches are not merged — a caller renders them in
 * order and the result is the sentence it was given.
 */
export function namesApart(text: string): Segment[] {
  const segments: Segment[] = [];
  let at = 0;

  for (const match of text.matchAll(NAMED)) {
    const [, glyphs = '', following = ''] = match;
    const start = match.index ?? 0;

    // Each part is the space in front of a word and the word: kept together so
    // that what is consumed is measured off the sentence rather than rebuilt
    // from its pieces, which is how a second space would go missing.
    let said = '';
    for (const part of following.match(/\s+\S+/g) ?? []) {
      if (!looksSaid(part.trim())) break;
      said += part;
    }

    if (start > at) segments.push({ text: text.slice(at, start), part: 'plain' });
    segments.push({ text: glyphs, part: 'glyph' });
    // The space between the glyphs and the reading belongs to neither: an
    // italic space is a space that leans, and a space in a CJK face is a space
    // the width of a character.
    const lead = said.match(/^\s+/)?.[0] ?? '';
    if (lead) segments.push({ text: lead, part: 'plain' });
    if (said) segments.push({ text: said.slice(lead.length), part: 'said' });

    at = start + glyphs.length + said.length;
  }

  if (at < text.length) segments.push({ text: text.slice(at), part: 'plain' });
  return segments;
}
