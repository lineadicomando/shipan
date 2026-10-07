import { describe, expect, it } from 'vitest';
import { PARAMETERS } from '../src/parameters.js';
import { WITNESSES, holdingOf } from '../src/witnesses.js';

/**
 * Whose a declared value is.
 *
 * `docs/sources.md` § "The standard, stated once": a transmitted quantity says
 * who carries it. The declaration is where that is said for a school value,
 * and these hold it to the registry it names.
 */
describe('the witnesses a value is held by', () => {
  it('names only witnesses the registry declares', () => {
    for (const parameter of PARAMETERS) {
      for (const value of parameter.values) {
        for (const id of [...(value.heldBy ?? []), ...(value.reportedBy ?? [])]) {
          expect(
            Object.hasOwn(WITNESSES, id),
            `${parameter.board} ${parameter.id}: ${String(value.id)} is held by "${id}", which is not a witness`,
          ).toBe(true);
        }
      }
    }
  });

  it('reads an absent list as not yet attributed, and never as held by nobody', () => {
    expect(holdingOf({})).toEqual({ state: 'unattributed' });
    expect(holdingOf({ heldBy: [] })).toEqual({ state: 'unattributed' });
    expect(holdingOf({ heldBy: ['engine'] })).toEqual({ state: 'held', by: ['engine'] });
  });

  // A reading stated only by texts that argue it down: who reports it is said,
  // and a holder found later is read instead of them.
  it('tells a reading reported from one that is held', () => {
    expect(holdingOf({ reportedBy: ['zhezhong'] })).toEqual({ state: 'reported', by: ['zhezhong'] });
    expect(holdingOf({ heldBy: ['tongzong'], reportedBy: ['zhezhong'] })).toEqual({
      state: 'held',
      by: ['tongzong'],
    });
  });

  // A registry entry no value names is a title waiting for an attribution
  // that was never written, and it would pass for one that was.
  it('carries no witness that holds nothing', () => {
    const named = new Set(
      PARAMETERS.flatMap((parameter) =>
        parameter.values.flatMap((value) => [...(value.heldBy ?? []), ...(value.reportedBy ?? [])]),
      ),
    );
    for (const id of Object.keys(WITNESSES)) {
      expect(named.has(id as keyof typeof WITNESSES), `no value is held by "${id}"`).toBe(true);
    }
  });

  // What the register already says in as many words, and the four the
  // registry opened with.
  it.each([
    ['ziwei', 'sihua', 'quanshu', 'quanshu'],
    ['almanac', 'shensha', 'xieji', 'xieji'],
    ['taiyi', 'epoch', 'jinjing', 'jinjing'],
    ['qizheng', 'xiudu', 'juxing', 'engine'],
  ])('holds %s %s: %s by %s', (board, id, value, witness) => {
    const parameter = PARAMETERS.find((entry) => entry.board === board && entry.id === id);
    const declared = parameter?.values.find((candidate) => candidate.id === value);
    // Among others, where a second work lays the same board.
    expect(declared?.heldBy).toContain(witness);
  });
});
