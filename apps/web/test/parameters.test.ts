import { describe, expect, it } from 'vitest';
import { PARAMETERS } from '@shipan/core';
import {
  DIVERGENCES,
  belongsTo,
  carried,
  chosenFields,
  named,
  offered,
  readChosen,
  shown,
  wire,
} from '../src/lib/parameters';

/**
 * The client's copy of the school divergences, held to the engine's.
 *
 * `vocabulary.ts` has the same bargain for the gates and the stars, and for
 * the same reason: the client imports only types from `core`, so the lists a
 * form offers are written out again, and a test is what keeps the copy from
 * becoming a second opinion. What would go wrong quietly is a value the engine
 * gained and the copy did not — an option nobody can choose — or one the
 * engine dropped and the copy kept, which is an option that comes back a 501.
 */
const engine = PARAMETERS.filter((parameter) =>
  parameter.values.every((value) => typeof value.id === 'string'),
);

/**
 * The one parameter that is not in the copy, named here so that its absence is
 * a decision rather than an oversight: a boolean is a checkbox, it has no list
 * of values to offer, and it is written `trueSolarTime=false` or not at all.
 */
const BOOLEAN = 'trueSolarTime';

describe('the divergences the client redeclares', () => {
  it('names every one the engine declares, and no other', () => {
    const key = (board: string, id: string): string => `${board}.${id}`;
    expect(new Set(DIVERGENCES.map((row) => key(row.board, row.id)))).toEqual(
      new Set(engine.map((parameter) => key(parameter.board, parameter.id))),
    );
    expect(PARAMETERS.map((parameter) => parameter.id)).toContain(BOOLEAN);
    expect(DIVERGENCES.map((row) => row.id)).not.toContain(BOOLEAN);
  });

  it('carries the same values, in the same order', () => {
    for (const parameter of engine) {
      const row = DIVERGENCES.find(
        (candidate) => candidate.id === parameter.id && candidate.board === parameter.board,
      );
      expect(row, `${parameter.board}.${parameter.id}`).toBeDefined();
      expect(row?.values, `${parameter.board}.${parameter.id}`).toEqual(
        parameter.values.map((value) => String(value.id)),
      );
    }
  });

  it('says which of them the engine computes', () => {
    for (const parameter of engine) {
      const row = DIVERGENCES.find(
        (candidate) => candidate.id === parameter.id && candidate.board === parameter.board,
      );
      expect(row?.implemented, `${parameter.board}.${parameter.id}`).toEqual(
        parameter.values.filter((value) => value.implemented).map((value) => String(value.id)),
      );
      expect(row?.fallback, `${parameter.board}.${parameter.id}`).toBe(String(parameter.default));
    }
  });

  it('assumes what the engine assumes', () => {
    for (const row of DIVERGENCES) {
      expect(row.implemented, `${row.board}.${row.id}`).toContain(row.fallback);
      expect(row.values, `${row.board}.${row.id}`).toContain(row.fallback);
    }
  });
});

describe('what a form offers', () => {
  /**
   * The sections a board's divergences can be offered on, which is every
   * instrument plus the two acts. `undefined` is the scan and the pillars,
   * where only the layers' are asked.
   */
  const SECTIONS = [undefined, 'qimen', 'liuren', 'qizheng', 'ziwei', 'bazi', 'taiyi'];

  it('offers a choice only where the engine computes one', () => {
    for (const section of SECTIONS)
      for (const row of offered(section)) {
        expect(row.implemented.length, `${row.board}.${row.id}`).toBeGreaterThan(1);
        expect(['pillars', 'almanac', section]).toContain(row.board);
      }
  });

  it('offers the layers everywhere and a board only on its own section', () => {
    expect(offered('liuren').map((row) => `${row.board}.${row.id}`)).toEqual([
      'pillars.yearBoundary',
      'pillars.dayBoundary',
      'liuren.guiren',
    ]);
    expect(offered(undefined).map((row) => row.board)).toEqual(['pillars', 'pillars']);
  });

  /**
   * Every control has words, in both vernaculars, for the label and for each
   * option it can show. The types already say the keys exist; what this says
   * is that the row carries one per implemented value, since a `select` with a
   * value it cannot name is a `select` with a blank line in it.
   */
  it('has words for every choice it offers', () => {
    for (const section of SECTIONS)
      for (const row of offered(section)) {
        expect(row.label, `${row.board}.${row.id}`).toBeDefined();
        expect(Object.keys(row.says ?? {}).sort(), `${row.board}.${row.id}`).toEqual(
          [...row.implemented].sort(),
        );
      }
  });

  /**
   * The dependency between two of them, which is doctrine and not layout: the
   * yuan is a divergence inside 拆補, and under 置閏 there is nothing left to
   * choose.
   */
  it('hides a divergence whose method has been left behind', () => {
    const yuan = DIVERGENCES.find((row) => row.id === 'yuan');
    expect(yuan?.inside).toEqual({ id: 'method', value: 'chaibu' });
    expect(shown(yuan!, { 'qimen.method': 'chaibu' })).toBe(true);
    expect(shown(yuan!, { 'qimen.method': 'zhirun' })).toBe(false);
  });

  /**
   * The words, held to the engine's copy of them.
   *
   * `parameters.ts` in `core` carries the same three fields now, because the
   * transcript prints the block too and the two surfaces must not name one
   * divergence two ways. This is the same bargain the values already have: the
   * client keeps a copy because it cannot import one, and a test is what stops
   * the copy from becoming a second opinion.
   */
  it('says each divergence in the words the engine declares', () => {
    for (const row of DIVERGENCES) {
      const parameter = PARAMETERS.find(
        (candidate) => candidate.id === row.id && candidate.board === row.board,
      );
      const where = `${row.board}.${row.id}`;

      expect(row.label, where).toBe(parameter?.label);
      expect(row.inside, where).toEqual(parameter?.inside);

      const says = Object.fromEntries(
        (parameter?.values ?? [])
          .filter((value) => value.says !== undefined)
          .map((value) => [String(value.id), value.says]),
      );
      expect(row.says ?? {}, where).toEqual(says);

      const notes = Object.fromEntries(
        (parameter?.values ?? [])
          .filter((value) => value.note !== undefined)
          .map((value) => [String(value.id), value.note]),
      );
      expect(row.notes ?? {}, where).toEqual(notes);
    }
  });

  it('reads what an address says and writes back only what was moved', () => {
    const asked = new URLSearchParams('qimen.yuan=futou&dayBoundary=midnight');
    const chosen = readChosen(asked, 'qimen');

    expect(chosen['qimen.yuan']).toBe('futou');
    expect(chosen['qimen.method']).toBe('chaibu');
    expect(chosen['dayBoundary']).toBe('midnight');

    // The engine's own answers stay out of the address, as every other field
    // here does: the plainest question keeps the plainest address.
    expect(chosenFields(chosen)).toEqual({ 'qimen.yuan': 'futou', dayBoundary: 'midnight' });
  });

  it('leaves a board’s own behind when the reader crosses to another', () => {
    const chosen = { 'qimen.method': 'zhirun', dayBoundary: 'midnight' };

    expect(carried(chosen, 'bazi')).toEqual({ dayBoundary: 'midnight' });
    expect(carried(chosen, 'qimen')).toEqual(chosen);
  });
});

describe('the name a divergence travels under', () => {
  it('leaves the layers bare and prefixes the boards', () => {
    const names = Object.fromEntries(DIVERGENCES.map((row) => [`${row.board}.${row.id}`, wire(row)]));
    expect(names['pillars.dayBoundary']).toBe('dayBoundary');
    expect(names['almanac.shensha']).toBe('shensha');
    expect(names['qimen.method']).toBe('qimen.method');
    expect(names['nianming.count']).toBe('nianming.count');
    expect(named('qizheng', 'luohou')).toBe('qizheng.luohou');
    expect(named('pillars', 'yearBoundary')).toBe('yearBoundary');
  });

  /**
   * The collision the rule exists for. Three boards cut a year and disagree
   * about where, and two of the three answer to it today.
   */
  it('parts the three yearBoundaries', () => {
    const cutting = DIVERGENCES.filter((row) => row.id === 'yearBoundary');
    expect(cutting.length).toBeGreaterThan(2);
    expect(new Set(cutting.map(wire)).size).toBe(cutting.length);
    const defaults = new Set(cutting.map((row) => row.fallback));
    expect(defaults.size, 'they would not need parting if they agreed').toBeGreaterThan(1);
  });

  it('gives every divergence a name of its own', () => {
    const names = DIVERGENCES.map(wire);
    expect(new Set(names).size).toBe(names.length);
  });

  it('says which section a name in an address belongs to', () => {
    expect(belongsTo('qimen.method', 'qimen')).toBe(true);
    expect(belongsTo('qimen.method', 'liuren')).toBe(false);
    // Bare names belong to every board: the layers stand under all of them.
    expect(belongsTo('dayBoundary', 'ziwei')).toBe(true);
    expect(belongsTo('shensha', 'taiyi')).toBe(true);
    // And the birth put inside somebody else's board belongs to no section.
    expect(belongsTo('nianming.count', 'qimen')).toBe(false);
  });
});
