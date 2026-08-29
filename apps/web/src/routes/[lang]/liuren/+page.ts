import { lookupPlace, momentQuery, readMoment, type Failure } from '$lib/moment';
import type { PageLoad } from './$types';

/**
 * Laying is loading, as casting is for the chart.
 *
 * The board answers the same shape of question the chart does — one asked
 * now — so an empty address is the present moment here too, and not an empty
 * page. The pillars are the section that cannot do this: a chart of birth for
 * whoever opened the page is a wrong answer rather than a lesser one, where a
 * board of this minute is exactly what a 六壬 reader wants most often.
 */
export const load: PageLoad = async ({ url, fetch, parent }) => {
  const { locale } = await parent();
  const { input, locationId } = readMoment(url, 'liuren');
  const { place, failure: unknownPlace } = await lookupPlace(fetch, locationId, locale);
  const moment = { ...input, place };

  if (unknownPlace) return { moment, result: undefined, failure: unknownPlace };

  const response = await fetch(`/api/liuren?${momentQuery(moment, { lang: locale })}`);
  const body = await response.json();

  return response.ok
    ? { moment, result: body, failure: undefined }
    : { moment, result: undefined, failure: body as Failure };
};
