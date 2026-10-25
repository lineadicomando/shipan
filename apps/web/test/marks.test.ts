import { LOCALES, catalogs } from '@shipan/i18n';
import { DAY_LAYERS, LIUREN_LAYERS, QIMEN_LAYERS, QIZHENG_LAYERS } from '@shipan/core';
import { LAYERS, UNITS, type MarkedBoard } from '@shipan/plate';
import { describe, expect, it } from 'vitest';
import { GET as qimen } from '../src/routes/api/qimen/plate/+server';
import { GET as liuren } from '../src/routes/api/liuren/plate/+server';
import { GET as qizheng } from '../src/routes/api/qizheng/plate/+server';
import { GET as taiyi } from '../src/routes/api/taiyi/plate/+server';
import { GET as ziwei } from '../src/routes/api/ziwei/plate/+server';
import { layerKey } from '../src/lib/board';

/**
 * What a drawing marks is what the site can say, and the other way about.
 *
 * The layers are listed once, in `LAYERS` (`@shipan/plate`), and the words
 * for them are in the catalogs. Neither list is read off the other: so the
 * drawings are laid here, as the site lays them, and every mark they carry is
 * held to the list and to a word in each catalog — and every entry in the
 * list to a mark that some drawing carries. A layer added to a drawing
 * without its word fails here, and so does a word for a layer no drawing
 * draws any more.
 */
type Handler = (event: never) => Response | Promise<Response>;

async function draw(handler: Handler, query: string): Promise<string> {
  const url = new URL(`http://localhost/api?${query}`);
  const event = {
    url,
    request: new Request(url, { headers: { 'accept-language': 'en' } }),
    setHeaders: () => {},
  };
  const response = await handler(event as never);
  return response.text();
}

const MOMENT = 'date=2024-06-15&time=14:00&timezone=Asia/Shanghai&trueSolarTime=false&dayBoundary=midnight';

/** Every board that marks, and the drawings that between them carry its marks. */
const DRAWN: Record<MarkedBoard, readonly (() => Promise<string>)[]> = {
  qimen: [
    () => draw(qimen, MOMENT),
    () => draw(qimen, `${MOMENT}&qimen.system=rijia`),
  ],
  liuren: [() => draw(liuren, MOMENT)],
  qizheng: [() => draw(qizheng, MOMENT)],
  taiyi: [() => draw(taiyi, 'year=724')],
  ziwei: [() => draw(ziwei, `${MOMENT}&gender=female`)],
};

function marked(svg: string, attribute: string): Set<string> {
  return new Set([...svg.matchAll(new RegExp(`${attribute}="([^"]*)"`, 'g'))].map((m) => m[1] as string));
}

describe('the marks on the drawings', () => {
  for (const board of Object.keys(DRAWN) as MarkedBoard[]) {
    it(`holds ${board}'s marks to its layers, its units and its words`, async () => {
      const drawings = await Promise.all(DRAWN[board].map((drawing) => drawing()));
      const layers = new Set<string>();
      const units = new Set<string>();

      for (const svg of drawings) {
        expect(svg).toMatch(new RegExp(`<svg [^>]*data-board="${board}"`));
        for (const layer of marked(svg, 'data-layer')) layers.add(layer);
        for (const unit of marked(svg, 'data-unit')) units.add(unit);
      }

      expect([...layers].sort()).toEqual([...LAYERS[board]].sort());
      expect([...units].sort()).toEqual([...UNITS[board]].sort());

      for (const layer of LAYERS[board]) {
        const key = layerKey(board, layer);
        for (const locale of LOCALES) expect(catalogs[locale][key], `${locale} ${key}`).toBeTruthy();
      }
    });
  }
});

describe('the lens on a drawing', () => {
  it('names the layers of a 奇門 board as the drawing marks them, in the same order', () => {
    // A lens reads its layers off the engine's descriptor and the drawing
    // marks its own; a layer the two named differently would be a name the
    // lens could never light.
    expect(QIMEN_LAYERS).toEqual(LAYERS.qimen);
  });

  it('names the layers of a 六壬 board as the drawing marks them, in the same order', () => {
    expect(LIUREN_LAYERS).toEqual(LAYERS.liuren);
  });

  it('names the layers of a 七政四餘 board as the drawing marks them, in the same order', () => {
    expect(QIZHENG_LAYERS).toEqual(LAYERS.qizheng);
  });

  it('names the layers of a board of the day as its drawing marks them', async () => {
    const svg = await draw(qimen, `${MOMENT}&qimen.system=rijia`);
    expect([...marked(svg, 'data-layer')].sort()).toEqual([...DAY_LAYERS].sort());
  });
});
