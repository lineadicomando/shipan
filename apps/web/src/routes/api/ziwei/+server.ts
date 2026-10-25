import { computeZiwei, ziweiLabels } from '@shipan/core';
import { createTranslator } from '@shipan/i18n';
import { ziweiKey } from '@shipan/plate';
import { json } from '@sveltejs/kit';
import { momentIsFixed, readLocale, readMoment, readZiweiOptions } from '$lib/server/params';
import { isHttpError, toHttpError } from '$lib/server/errors';
import { laidBy } from '$lib/server/laid';
import type { RequestHandler } from './$types';

/**
 * `GET /api/ziwei?date=1968-03-12&time=14:30&locationId=3169070&gender=male`
 *
 * The twelve seats of a 紫微斗數 board, counted from a birth.
 *
 * No ephemeris is passed, and that is not an omission: this board reads a
 * lunar date, an hour branch and a year pillar, all of which the moment
 * already carries. Nothing on it is a position.
 *
 * `gender` is optional and only the 大限, the 小限 and the two rings of twelve
 * depend on it. Without it the seats are complete and those four are absent,
 * which is the correct answer rather than a degraded one — the same bargain
 * `/api/bazi` makes with its luck cycles.
 *
 * `private` in a cache, never `public`: the address holds somebody's date,
 * time and place of birth.
 */
export const GET: RequestHandler = ({ url, request, setHeaders }) => {
  try {
    const { moment, label } = readMoment(url.searchParams);

    const options = readZiweiOptions(url.searchParams);

    const ziwei = computeZiwei(moment, options);

    setHeaders({
      'cache-control': momentIsFixed(url.searchParams) ? 'private, max-age=86400' : 'no-store',
      vary: 'Accept-Language',
    });
    const t = createTranslator(readLocale(url.searchParams, request.headers.get('accept-language')));
    return json({
      moment,
      ziwei,
      place: label ?? null,
      laidBy: laidBy('ziwei', ziwei.options),
      // The key to the numerals on the board, in the reader's language, for
      // the page that sets it beside a board drawn without its band.
      key: ziweiKey(ziwei, ziweiLabels(t)),
    });
  } catch (cause) {
    if (isHttpError(cause)) throw cause;
    toHttpError(cause);
  }
};
