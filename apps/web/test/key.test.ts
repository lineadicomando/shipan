import { describe, expect, it } from 'vitest';
import { DEFAULT_TAIYI_OPTIONS, taiyiBoard, taiyiLabels } from '@shipan/core';
import { LOCALES, createTranslator } from '@shipan/i18n';
import { taiyiKey } from '@shipan/plate';
import { taiyiKeyOf } from '../src/lib/key';

/**
 * The 太乙 page numbers its own board and words the key from the catalog,
 * because its endpoint is told no language (see `lib/key.ts`). The drawing
 * beside it is labelled by the engine's `taiyiLabels`. This holds the two to
 * each other in every language, over years that seat the gods differently.
 */
describe('the key beside a 太乙 board', () => {
  it('is the key the drawing would have drawn, word for word', () => {
    for (const locale of LOCALES) {
      const t = createTranslator(locale);
      for (const year of [-72, 724, 1984, 2026]) {
        const board = taiyiBoard({ year }, DEFAULT_TAIYI_OPTIONS);
        expect(taiyiKeyOf(board, t), `${locale} ${year}`).toEqual(taiyiKey(board, taiyiLabels(t)));
      }
    }
  });
});
