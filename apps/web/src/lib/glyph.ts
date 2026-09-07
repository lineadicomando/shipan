/**
 * A name in its script and said aloud: `休門 xiūmén`.
 *
 * The interface is read by someone who does not read Chinese. For them a
 * glyph alone is a shape with no sound — it cannot be pronounced, looked up,
 * or asked about — so the transliteration travels beside it everywhere the
 * hanzi does. It is not a locale and does not vary with one: 休門 is xiūmén on
 * `/it` and on `/en`, and only the gloss beside it changes.
 *
 * `pinyin` is optional for the same reason `starRelation` is guarded where it
 * is read: a chart is cacheable `private` for a day, so a field added to the
 * engine meets charts cast before it existed. Those come back with the hanzi
 * alone rather than with the word `undefined` printed after it. `symbol` is
 * optional twice over — for that reason, and because only a trigram has one.
 *
 * **The trigram is drawn as well as written**: `☵ 坎 kǎn`. It costs the reader
 * who has no Chinese nothing to learn — three lines, broken or whole — and it
 * is the one thing on the board that a person can read off the shape. The
 * centre carries none, because 中 is a seat and not a trigram.
 */
export function glyph(entity: { hanzi: string; pinyin?: string; symbol?: string }): string {
  const written = entity.symbol ? `${entity.symbol} ${entity.hanzi}` : entity.hanzi;
  return entity.pinyin ? `${written} ${entity.pinyin}` : written;
}
