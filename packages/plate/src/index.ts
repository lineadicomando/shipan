/**
 * @shipan/plate — the drawing.
 *
 * Given a chart, it produces a picture of it. It does not know how to compute
 * one, and by design it cannot: it declares the shape it needs in `types.ts`
 * rather than importing the engine's, so nothing here can reach back into a
 * calculation.
 *
 * Very nearly locale-independent, because the palaces carry hanzi — the names
 * of the gates and stars, not a rendering of them. Only the captions around
 * the grid are text in a language, and the caller supplies those already
 * translated.
 *
 * PNG lives at `@shipan/plate/png`, which pulls a native module.
 */

export {
  cells,
  layout,
  origin,
  COMPASS_READINGS,
  CORNERS,
  EDGES,
  WRITTEN_ORDER,
  type Aloud,
  type Cell,
  type Corner,
  type DirectionId,
  type Edge,
  type Layout,
} from './geometry.js';
export { type Said } from './readings.js';
export { FONT_STACK, PALETTES, styleSheet, type Palette, type Scheme } from './palette.js';
export { renderChartSvg, renderDaySvg, STRENGTH_MARKS } from './svg.js';
export {
  LAYERS,
  UNITS,
  type BoardLayer,
  type BoardUnit,
  type MarkedBoard,
} from './marks.js';
export { renderLiurenSvg, liurenReadings, DEFAULT_LIUREN_SIZE } from './liuren-svg.js';
export { renderQizhengSvg, qizhengKey, DEFAULT_QIZHENG_SIZE } from './qizheng-svg.js';
export { renderTaiyiSvg, taiyiKey, DEFAULT_TAIYI_SIZE } from './taiyi-svg.js';
export {
  renderZiweiSvg,
  ziweiSeatBoxes,
  DEFAULT_ZIWEI_SIZE,
  type ZiweiSeatBox,
  ziweiKey,
} from './ziwei-svg.js';
export type {
  Named,
  PlateCaptions,
  PlateCourse,
  PlateLiuren,
  PlateLiurenLabels,
  PlateLiurenOptions,
  PlatePlacement,
  PlateQizheng,
  PlateQizhengLabels,
  PlateQizhengOptions,
  PlateTaiyi,
  PlateTaiyiGod,
  PlateTaiyiLabels,
  PlateTaiyiOptions,
  PlateTaiyiPalace,
  PlateTaiyiSide,
  PlateTransmission,
  PlateZiwei,
  PlateZiweiLabels,
  PlateZiweiOptions,
  PlateZiweiPalace,
  PlateZiweiSeat,
  PlateChart,
  PlateDay,
  PlateDayPalace,
  PlateDirections,
  PlateLabels,
  PlateOptions,
  PlatePalace,
  PlatePattern,
} from './types.js';
