import { STEMS, type StemId } from '../ganzhi.js';
import { lensNames, phaseTable, type Lens, type LensLink, type LensName, type LensThing } from '../lens.js';
import type { Element } from '../types.js';
import type { QimenChart } from './index.js';
import type { DayChart } from './rijia.js';
import { palace } from './palaces.js';
import type { SpiritId } from './plates.js';
import { opposite } from './patterns.js';
import { RELATION_IDS, type RelationId } from './relation.js';

/**
 * What a reader may ask a 奇門 board to show them: the board's `Lens`.
 *
 * Three relations, each with its row in `docs/sources.tsv`:
 *
 * - **the five relations of the phases** between any two things that have a
 *   phase: the same `relationOf` that gives 門宮 and 星宮, read here between
 *   a thing and something in another palace as well as its own;
 * - **對宮**, the palace facing another across the board, which is the palace
 *   反吟 is read on (`opposite`): a link between seats, drawn between the two
 *   palaces' names;
 * - **五合** between stems, 甲己 · 乙庚 · 丙辛 · 丁壬 · 戊癸: a link between
 *   two stems of either plate, wherever they stand.
 *
 * A seat is a palace by its Luoshu number, as the drawing marks it.
 */

/**
 * The layers of a 奇門 board, as the drawing marks them, in the order the
 * board is read.
 */
export type QimenLayer = 'heaven' | 'earth' | 'palace' | 'spirit' | 'star' | 'gate';

export const QIMEN_LAYERS: readonly QimenLayer[] = ['heaven', 'earth', 'palace', 'spirit', 'star', 'gate'];

/**
 * The layers whose things always have a phase. The eight spirits are not
 * among them: whether they have one, and which, is `spiritPhase`, and under
 * its default they have none — a lens keeps them by their kind and relates
 * them to nothing. The drawing leaves them uncoloured under every value: what
 * the parameter gives is a relation to read, not a fact about the board.
 */
export type LensLayer = Exclude<QimenLayer, 'spirit'>;

export const LENS_LAYERS: readonly LensLayer[] = ['heaven', 'earth', 'palace', 'star', 'gate'];

/** The phased layers when the spirits have a phase, in the board's order. */
const LENS_LAYERS_WITH_SPIRITS: readonly QimenLayer[] = ['heaven', 'earth', 'palace', 'spirit', 'star', 'gate'];

/**
 * The phase of each spirit under the two values of `spiritPhase` that give
 * one. `docs/sources.md` § "The phases of the eight spirits" carries both
 * readings, read on the plate.
 *
 * `branch` is the 奇門秘訣's, each spirit taking the phase of the branch or
 * trigram it is identified with, 勾陳 and 朱雀 from its edition's note;
 * `huaqi` is the 秘笈大全's 九神主論章, which parts from it at 值符 and 螣蛇.
 */
export const SPIRIT_PHASES: Record<'branch' | 'huaqi', Record<SpiritId, Element>> = {
  branch: {
    zhifu: 'tu',
    tengshe: 'huo',
    taiyin: 'jin',
    liuhe: 'mu',
    gouchen: 'tu',
    baihu: 'jin',
    zhuque: 'huo',
    xuanwu: 'shui',
    jiudi: 'tu',
    jiutian: 'jin',
  },
  huaqi: {
    zhifu: 'huo',
    tengshe: 'tu',
    taiyin: 'jin',
    liuhe: 'mu',
    gouchen: 'tu',
    baihu: 'jin',
    zhuque: 'huo',
    xuanwu: 'shui',
    jiudi: 'tu',
    jiutian: 'jin',
  },
};

/** A relation between two things that is not one of the five of the phases. */
export type LinkId = 'duigong' | 'wuhe';

export interface LinkName extends LensName {
  id: LinkId;
}

export const LINKS: Record<LinkId, LinkName> = {
  duigong: { id: 'duigong', hanzi: '對宮', pinyin: 'duìgōng' },
  wuhe: { id: 'wuhe', hanzi: '五合', pinyin: 'wǔhé' },
};

const LINK_IDS: readonly LinkId[] = ['duigong', 'wuhe'];

export type QimenLens = Lens<QimenLayer, LinkId>;

/** The nine palaces, by Luoshu number, as the drawing names its seats. */
const SEATS: readonly string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** The two palaces of each pair facing each other across the centre, once. */
function facingLinks(): LensLink<QimenLayer, LinkId>[] {
  const links: LensLink<QimenLayer, LinkId>[] = [];
  for (let number = 1; number <= 9; number++) {
    const across = opposite(number);
    if (across === undefined || across < number) continue;
    links.push({
      relation: 'duigong',
      between: 'seats',
      a: { seat: String(number), layer: 'palace' },
      b: { seat: String(across), layer: 'palace' },
    });
  }
  return links;
}

/**
 * The 五合 partner of each stem: the stem five places on, 甲 with 己, 乙 with
 * 庚. The same pairing `almanac.ts` reads the 德合 by, where the 四德 confirm
 * it cell by cell.
 */
export function wuhePartner(stem: StemId): StemId {
  const index = STEMS.findIndex((one) => one.id === stem);
  return (STEMS[(index + 5) % 10] as (typeof STEMS)[number]).id;
}

/** Every pair of stems on the two plates that are each other's 五合, once. */
function wuheLinks(things: readonly LensThing<QimenLayer>[]): LensLink<QimenLayer, LinkId>[] {
  const stems = things.filter((thing) => thing.layer === 'heaven' || thing.layer === 'earth');
  const links: LensLink<QimenLayer, LinkId>[] = [];
  for (let i = 0; i < stems.length; i++) {
    const one = stems[i] as LensThing<QimenLayer>;
    for (let j = i + 1; j < stems.length; j++) {
      const other = stems[j] as LensThing<QimenLayer>;
      if (wuhePartner(one.id as StemId) !== other.id) continue;
      links.push({
        relation: 'wuhe',
        between: 'things',
        a: { seat: one.seat, layer: one.layer },
        b: { seat: other.seat, layer: other.layer },
      });
    }
  }
  return links;
}

/**
 * What a lens may show on this chart: its things, and its relations.
 *
 * The spirits are things of the lens only where the chart was cast with a
 * `spiritPhase` that gives them a phase; under `none` they are a kind the
 * lens keeps and never relates.
 */
export function qimenLens(chart: QimenChart): QimenLens {
  const things: LensThing<QimenLayer>[] = [];
  const spiritPhase = chart.options.spiritPhase ?? 'none';
  const phasedSpirits = spiritPhase === 'none' ? undefined : SPIRIT_PHASES[spiritPhase];
  for (const contents of chart.palaces) {
    const seat = String(contents.palace.number);
    const add = (layer: QimenLayer, thing: { id: string; element: Element } | undefined): void => {
      if (thing) things.push({ seat, layer, id: thing.id, element: thing.element });
    };
    add('heaven', contents.heaven);
    add('earth', contents.earth);
    add('palace', contents.palace);
    if (phasedSpirits && contents.spirit) {
      add('spirit', { id: contents.spirit.id, element: phasedSpirits[contents.spirit.id] });
    }
    // A star and a gate take the phase of the palace they belong to at rest,
    // as they do for 門宮, 星宮 and the strength.
    add('star', { id: contents.star.id, element: palace(contents.star.home).element });
    if (contents.gate) add('gate', { id: contents.gate.id, element: palace(contents.gate.home).element });
  }
  return {
    board: 'qimen',
    seats: SEATS,
    pairSeats: SEATS,
    layers: QIMEN_LAYERS,
    phased: phasedSpirits ? LENS_LAYERS_WITH_SPIRITS : LENS_LAYERS,
    crowded: [],
    things,
    phases: phaseTable(),
    linkIds: LINK_IDS,
    links: [...facingLinks(), ...wuheLinks(things)],
    names: lensNames(LINKS),
  };
}

/**
 * The layers of a board of the day, in the order the hour board reads them:
 * a palace, a star of the day's own nine, a gate. No plate of stems, and so
 * no 五合.
 */
export const DAY_LAYERS: readonly QimenLayer[] = ['palace', 'star', 'gate'];

/**
 * The layers of a day board whose things have a phase: the palace, and the
 * gate, which is one of the hour board's eight and takes its home palace's
 * phase as it does there. **The nine stars of a day have none registered** —
 * 太乙 through 天乙 are not 天蓬 through 天英, no text read here gives them a
 * phase, and the register holds only a fortune for each, on which the texts
 * part — so they are kept by their kind and never related, as the 八神 are.
 */
export const DAY_LENS_LAYERS: readonly LensLayer[] = ['palace', 'gate'];

const DAY_LINK_IDS: readonly 'duigong'[] = ['duigong'];

export type DayLens = Lens<QimenLayer, 'duigong'>;

/** What a lens may show on a board of the day: its palaces and gates, and 對宮. */
export function dayLens(day: DayChart): DayLens {
  const things: LensThing<QimenLayer>[] = [];
  const links = facingLinks() as LensLink<QimenLayer, 'duigong'>[];
  for (const contents of day.palaces) {
    const seat = String(contents.palace.number);
    things.push({ seat, layer: 'palace', id: contents.palace.id, element: contents.palace.element });
    if (contents.gate) {
      things.push({ seat, layer: 'gate', id: contents.gate.id, element: palace(contents.gate.home).element });
    }
  }
  return {
    board: 'qimen',
    seats: SEATS,
    pairSeats: SEATS,
    layers: DAY_LAYERS,
    phased: DAY_LENS_LAYERS,
    crowded: [],
    things,
    phases: phaseTable(),
    linkIds: DAY_LINK_IDS,
    links,
    names: lensNames({ duigong: LINKS.duigong }),
  };
}

/** Every relation a lens may name, for a surface that has to offer them all. */
export const LENS_RELATION_IDS: readonly (RelationId | LinkId)[] = [...RELATION_IDS, ...LINK_IDS];
