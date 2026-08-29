import { lookupPlace, momentQuery, readMoment, type Failure } from '$lib/moment';
import type { PageLoad } from './$types';

/**
 * Placing is loading, as laying is for the 六壬 board.
 *
 * An empty address is the present sky, which is a reasonable page for this
 * section in a way it is not for the pillars: where a chart of birth for
 * whoever opened the page is a wrong answer, the seven governors *now* is a
 * real thing to look at — it is where they are, and it is the same for
 * everybody. That this board is a 命 art does not make it a form: a birth
 * goes in the address like any other instant.
 */
export const load: PageLoad = async ({ url, fetch, parent }) => {
  const { locale } = await parent();
  const { input, locationId } = readMoment(url, 'qizheng');
  const { place, failure: unknownPlace } = await lookupPlace(fetch, locationId, locale);
  const moment = { ...input, place };


  if (unknownPlace) return { moment, result: undefined, failure: unknownPlace };

  const response = await fetch(`/api/qizheng?${momentQuery(moment, { lang: locale })}`);
  const body = await response.json();

  return response.ok
    ? { moment, result: body, failure: undefined }
    : { moment, result: undefined, failure: body as Failure };
};
