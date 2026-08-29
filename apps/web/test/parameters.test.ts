import { describe, expect, it } from 'vitest';
import { PARAMETERS } from '@shipan/core';
import { DIVERGENCES, belongsTo, named, wire } from '../src/lib/parameters';

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
