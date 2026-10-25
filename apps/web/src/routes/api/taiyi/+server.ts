import { taiyiBoard, taiyiLens } from '@shipan/core';
import { json } from '@sveltejs/kit';
import { readTaiyiOptions, readTaiyiYear, taiyiCacheControl } from '$lib/server/params';
import { isHttpError, toHttpError } from '$lib/server/errors';
import { laidBy } from '$lib/server/laid';
import type { RequestHandler } from './$types';

/**
 * `GET /api/taiyi?year=2026`
 *
 * The 太乙 board of a year in the 歲計: 太乙 itself walking eight palaces and
 * never the centre, the two eyes, the 計神 and 合神, the two counts and the
 * generals they seat, the 八門直使, the 三基, 五福 and 大遊, and the conditions
 * 卷三 of 《太乙金鏡式經》 names.
 *
 * **The one board here that is cacheable `public`**, and that is a property of
 * the board rather than a staging decision. Every other endpoint is a pure
 * function of its URL too, but the key of a shared cache would hold somebody's
 * date, time and place of birth. A 歲計 board holds nobody's data: it is a
 * function of the year, like the solar terms and for the same reason — it is
 * about something everyone is standing in. It can be linked, shared and
 * indexed, and it is the first thing on this site that can be.
 */
export const GET: RequestHandler = ({ url, setHeaders }) => {
  try {
    // Bounded, and defaulted at 立春 rather than at New Year: see
    // `readTaiyiYear`, which is where every surface here asks what year is
    // being lived so that they all answer the same.
    const { year, named } = readTaiyiYear(url.searchParams);

    setHeaders({ 'cache-control': taiyiCacheControl(named) });
    const taiyi = taiyiBoard({ year }, readTaiyiOptions(url.searchParams));
    // `lens` is every relation a reader may ask the board to show, in no
    // language and about nobody, so it is as public as the board.
    return json({ taiyi, laidBy: laidBy('taiyi', taiyi.options), lens: taiyiLens(taiyi) });
  } catch (cause) {
    if (isHttpError(cause)) throw cause;
    toHttpError(cause);
  }
};
