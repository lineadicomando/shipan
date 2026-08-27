import { describe, expect, it } from 'vitest';
import { carriedSearch, href, isCurrent, pageLink, SECTIONS } from '../src/lib/navigation';
import { INSTRUMENTS } from '../src/lib/instruments';

/**
 * What a header link carries from the section being read to the one being
 * clicked, which is not one answer but one per destination.
 *
 * The moment travels: somebody who has just laid a board and wants another of
 * the same instant should not type the date, the time and the place again. A
 * birth does not, and the reason is `pageAddress`'s: it belongs to the section
 * that asked for it, and a nav that hauled it along would write it into the
 * address of every section visited after a consultation.
 *
 * `gender` sits across that line and is the reason this file exists. It is
 * half of a 年命 under 奇門 and a parameter of the board itself under 八字 and
 * 紫微斗數 — one name, two readings, and a single answer for both is wrong for
 * one of them whichever it is.
 */
describe('what a section link carries across', () => {
  const SETUP = '?date=1968-03-12&time=14:30&locationId=3169070&gender=male';

  it('carries the moment to every section', () => {
    for (const section of SECTIONS) {
      const carried = new URLSearchParams(carriedSearch(SETUP, section.slug));

      expect(carried.get('date'), section.slug).toBe('1968-03-12');
      expect(carried.get('locationId'), section.slug).toBe('3169070');
    }
  });

  it('carries the sex to the boards it is a parameter of, and nowhere else', () => {
    // 八字 and 紫微斗數 run the 大運 and the 大限 off it: dropped, the link
    // opens a smaller board than the one the reader is standing in front of.
    for (const slug of ['bazi', 'ziwei']) {
      expect(new URLSearchParams(carriedSearch(SETUP, slug)).get('gender'), slug).toBe('male');
    }

    // Everywhere else it is either half of a birth — 奇門's 年命, which travels
    // with `born` or not at all — or a parameter nothing there reads.
    for (const slug of ['qimen', 'liuren', 'taiyi', 'qizheng', 'moments', '']) {
      expect(new URLSearchParams(carriedSearch(SETUP, slug)).get('gender'), slug).toBeNull();
    }
  });

  it('carries no birth put inside another board, wherever it goes', () => {
    const setup = `${SETUP}&born=1990-06-01&bornTime=03:15&bornTz=Europe/Rome&years=turns`;

    for (const section of SECTIONS) {
      const carried = carriedSearch(setup, section.slug);

      for (const kept of ['born=', 'bornTime=', 'bornTz=', 'years=']) {
        expect(carried, `${section.slug} carries ${kept}`).not.toContain(kept);
      }
    }
  });

  it('carries no instrument: a section is one board already', () => {
    for (const section of SECTIONS) {
      expect(carriedSearch(`${SETUP}&instrument=liuren`, section.slug)).not.toContain('instrument');
    }
  });

  it('has a section for every instrument the consultation offers', () => {
    // The nav and the registry are two lists of the same six arts, and the
    // slug is what joins them: `carriedSearch` reads one by the other.
    for (const instrument of INSTRUMENTS) {
      expect(
        SECTIONS.some((section) => section.slug === instrument.id),
        instrument.id,
      ).toBe(true);
    }
  });

  it('marks the consultation current at the root and nowhere below it', () => {
    expect(isCurrent('it', '', '/it')).toBe(true);
    expect(isCurrent('it', '', '/it/bazi')).toBe(false);
    expect(isCurrent('it', 'bazi', '/it/bazi')).toBe(true);
    expect(href('it', '', '?date=2024-06-15')).toBe('/it?date=2024-06-15');
  });
});

/**
 * The link a reader hands on, which has to lay the board they were looking at.
 *
 * `pageAddress` makes the same promise on the server and is tested through the
 * endpoints that call it; this is the browser's half, and the failure it exists
 * to catch is the tempting one — copying `page.url`, which on a board of the
 * present says nothing about the instant and therefore means whenever.
 */
describe('the link that carries a board', () => {
  const HERE = new URL('https://shipan.example/it/qimen');

  it('says the instant the address in the bar left open', () => {
    const link = new URL(pageLink(HERE, 'date=2026-08-27&time=10:28&locationId=3169070&lang=it'));

    expect(link.pathname).toBe('/it/qimen');
    expect(link.searchParams.get('date')).toBe('2026-08-27');
    expect(link.searchParams.get('time')).toBe('10:28');
    expect(link.searchParams.get('locationId')).toBe('3169070');
  });

  it('leaves the language to the path, which already says it', () => {
    expect(pageLink(HERE, 'year=2026&lang=it')).toBe('https://shipan.example/it/qimen?year=2026');
  });

  it('replaces whatever the bar was showing rather than adding to it', () => {
    // The address a reader arrived at and the one the board was cast for are
    // two different things whenever a step has moved: `replaceState` keeps the
    // bar in step, but the board's own query string is the one that answers.
    const stale = new URL('https://shipan.example/it/taiyi?year=1984');

    expect(pageLink(stale, 'year=2026&lang=en')).toBe('https://shipan.example/it/taiyi?year=2026');
  });
});
