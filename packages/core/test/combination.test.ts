import { describe, expect, it } from 'vitest';
import { createTranslator } from '@shipan/i18n';
import {
  DEFAULT_LIUREN_OPTIONS,
  DEFAULT_OPTIONS,
  DEFAULT_ZIWEI_OPTIONS,
  combinationOf,
  divergenceLines,
  saidCombination,
} from '../src/index.js';

/**
 * Who lays the combination a board stands on.
 *
 * `docs/parameters.md` § "A declared default is not a hidden school": axes are
 * independent in the engine and lines hold them together, so every board says
 * whether a text lays its combination. These pin the three answers and the
 * rules of the count, on boards whose attributions the register argues.
 */
describe('the combination a board stands on', () => {
  it('names the text that holds every value in force', () => {
    // Three texts hold the 中氣, the verse's seats and the branch division.
    expect(combinationOf('liuren', DEFAULT_LIUREN_OPTIONS)).toEqual({
      state: 'together',
      by: ['jingjie', 'jingwei', 'zhizhi'],
    });
  });

  it('narrows to the one text that holds a value once it is moved', () => {
    // The table that stands 甲 apart is the 直指's two verses and no other
    // text's, so a board laid on it is that work's alone.
    expect(combinationOf('liuren', { ...DEFAULT_LIUREN_OPTIONS, guiren: 'wei' })).toEqual({
      state: 'together',
      by: ['zhizhi'],
    });
  });

  it('counts a parameter nobody could have moved', () => {
    // 紫微斗數's 大限 has one computed value and no line in the block, and it
    // is 《全書》's like the three beside it: the year boundary alone is not.
    expect(combinationOf('ziwei', DEFAULT_ZIWEI_OPTIONS)).toEqual({
      state: 'unattributed',
      attributed: true,
      together: ['quanshu'],
    });
    // Move the one cell two modern schools hold, and no text holds the rest
    // with it.
    expect(combinationOf('ziwei', { ...DEFAULT_ZIWEI_OPTIONS, sihua: 'zuofu' })).toEqual({
      state: 'unattributed',
      attributed: true,
      together: [],
    });
  });

  it('answers nothing for a board with no parameter of its own', () => {
    expect(combinationOf('nothing', {})).toBeUndefined();
  });

  it('says it in a sentence, with the title written and said', () => {
    const t = createTranslator('en');
    expect(saidCombination('liuren', DEFAULT_LIUREN_OPTIONS, t)).toBe(
      'This combination of values is laid as one by 大六壬精解 dàliùrénjīngjiě (1995) and 六壬經緯 liùrénjīngwěi and 御定六壬直指 yùdìngliùrénzhízhǐ.',
    );
  });

  it('closes the lines a drawing writes', () => {
    const t = createTranslator('en');
    const lines = divergenceLines('liuren', DEFAULT_LIUREN_OPTIONS, DEFAULT_OPTIONS, t);
    expect(lines.at(-1)).toBe(saidCombination('liuren', DEFAULT_LIUREN_OPTIONS, t));
  });

  it('joins a label to its value with the vernacular’s own mark', () => {
    // The em dash is English punctuation: an Italian label opens the sentence its value closes.
    const moved = { ...DEFAULT_OPTIONS, method: 'zhirun' } as const;
    const en = divergenceLines('qimen', moved, moved, createTranslator('en'));
    const it = divergenceLines('qimen', moved, moved, createTranslator('it'));
    expect(en.some((line) => line.includes(' — '))).toBe(true);
    expect(it.join('\n')).not.toMatch(/[—–]/);
    expect(it.some((line) => line.startsWith('Il ju si determina per blocchi interi'))).toBe(true);
  });
});
