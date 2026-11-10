import { lookupPlace, momentQuery, readMoment, type Failure } from '$lib/moment';
import { carried } from '$lib/parameters';
import type { Bazi } from '@shipan/core';
import type { PageLoad } from './$types';

/**
 * Casting is loading, because the address is the chart.
 *
 * The alternative — holding the moment in the component and fetching on
 * submit — has the page show one thing while its address says another, so a
 * link is not the chart the person was looking at and a reload loses it.
 * Reading the address instead gives the link, the reload, and the moment
 * carried from one section to the next, all from the same code.
 *
 * An empty address is not an empty page: it is the present moment, which is
 * the chart a Qi Men reader wants most often and the one every other is
 * stepped away from. The pillars cannot do the same — see `bazi/+page.ts`.
 */
export const load: PageLoad = async ({ url, fetch, parent }) => {
  const { locale } = await parent();
  // The one section that lays more than one family of its art.
  const { input, locationId } = readMoment(url, 'qimen', true);
  const { place, failure: unknownPlace } = await lookupPlace(fetch, locationId, locale);
  const moment = { ...input, place };

  // A place that could not be found stops it here. Casting for the server's
  // own zone instead would answer a question nobody asked, and the answer
  // would look like the right one.
  if (unknownPlace) return { moment, chart: undefined, laidBy: undefined, lens: undefined, failure: unknownPlace };

  const response = await fetch(`/api/qimen?${momentQuery(moment, { lang: locale })}`);
  const body = await response.json();

  // A failure is data, not a page: the form has to stay on screen, because
  // what needs correcting is in it.
  // `body.qimen` on the wire, `chart` on the page: the endpoint is named for
  // the art it lays out, and what it hands back is a chart. Only the address
  // and the payload took the art's name — see `lib/instruments.ts`.
  // The Four Pillars of the instant the chart was cast for, set over the
  // board. Pinned to that instant, so that «now» is the same now for both,
  // and asked under the layers the two boards share — the year and day
  // boundaries and the solar correction — so the pillars over the board are
  // the pillars it was cast from. Nothing of 八字's own travels: its one
  // option turns the decades, which this page does not show.
  let bazi: Bazi | undefined;
  if (response.ok) {
    const { date, time } = body.qimen.moment.input;
    const pillars = await fetch(
      `/api/bazi?${momentQuery({ ...moment, date, time, chosen: carried(moment.chosen, 'bazi') }, { lang: locale })}`,
    );
    if (pillars.ok) bazi = (await pillars.json()).bazi;
  }

  return response.ok
    ? { moment, chart: body.qimen, bazi, laidBy: body.laidBy, lens: body.lens, failure: undefined }
    : { moment, chart: undefined, lens: undefined, failure: body as Failure };
};
