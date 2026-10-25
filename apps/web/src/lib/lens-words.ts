/**
 * How a lens says what it shows, board by board: a name, a seat, and where a
 * name stands.
 *
 * A lens knows no board (`lib/lens.ts`), and what it hands a reader is keys —
 * a seat, a layer, an identifier. Saying them is the board's: which catalog a
 * name's word is in, what a seat is called, whether a seat is a palace, a
 * lesson or a seat of a rim. Written once here so that a section and the
 * consultation, which lays the same boards, say them alike.
 *
 * Every name is said with its gloss first, then its hanzi and its reading —
 * the order the rest of the page says names in (`glyph`).
 */
import type {
  DayChart,
  LiurenBoard,
  QimenChart,
  QizhengBoard,
  TaiyiBoard,
  ZiweiBoard,
} from '@shipan/core';
import type { MessageKey, Translator } from '@shipan/i18n';
import { glyph } from './glyph';

/** What a section holding a lens gives `HeldLens`, besides the lens. */
export interface LensWords {
  /** A name on the board in words, from where the drawing marks it. */
  nameAt: (seat: string, layer: string, id?: string) => string | undefined;
  /** A seat as a pair says it. */
  seatName: (seat: string) => string;
  /**
   * Where a name stands, said after its layer. The layer is given because a
   * seat's name may be shared by two kinds of seat — a corner of the 太乙 rim
   * and a palace — whose layers do not meet.
   */
  seatPlace: (seat: string, layer?: string) => string;
  /**
   * The hanzi of a name on the board, from where the drawing marks it — what
   * the key under the board is matched on, so a name the lens keeps in view
   * is the entry that stays in view there.
   */
  hanziAt: (seat: string, layer: string, id?: string) => string | undefined;
}

type Named = { id: string; hanzi: string; pinyin?: string };

/** A name in words: its gloss from the catalog, then its hanzi and reading. */
const said = (t: Translator, key: string, thing: Named): string => `${t(key as MessageKey)} ${glyph(thing)}`;

/** The 奇門 board of an hour or of a day: nine palaces by their Luoshu number. */
export function qimenWords(chart: QimenChart | DayChart | undefined, t: Translator): LensWords {
  const ofTheDay = chart?.options.system === 'rijia';
  const PREFIX: Record<string, string> = {
    heaven: 'stem',
    earth: 'stem',
    palace: 'palace',
    // The day's nine stars are not the hour's, and have words of their own.
    star: ofTheDay ? 'dayStar' : 'star',
    gate: 'gate',
    spirit: 'spirit',
  };
  const at = (seat: string) =>
    (chart?.palaces as readonly { palace: { number: number } }[] | undefined)?.find(
      (cell) => String(cell.palace.number) === seat,
    ) as Record<string, Named | undefined> | undefined;
  const nameAt = (seat: string, layer: string): string | undefined => {
    const thing = at(seat)?.[layer];
    return thing && said(t, `label.${PREFIX[layer] ?? layer}.${thing.id}`, thing);
  };
  return {
    nameAt,
    hanziAt: (seat, layer) => at(seat)?.[layer]?.hanzi,
    seatName: (seat) => `${seat} ${nameAt(seat, 'palace') ?? ''}`,
    seatPlace: (seat) => t('lens.where.palace', { palace: seat }),
  };
}

/**
 * The 六壬 board: the twelve palaces of the ring by their branch, the lessons
 * by number, the transmissions by position. The heaven plate holds all twelve
 * branches, so a palace's own branch is found among them.
 */
export function liurenWords(board: LiurenBoard | undefined, t: Translator): LensWords {
  const onTheRing = (seat: string) => board?.heaven.some((branch) => branch.id === seat) ?? false;
  const standing = (seat: string, layer: string): { thing: Named; prefix: string } | undefined => {
    if (!board) return undefined;
    const ground = board.heaven.find((branch) => branch.id === seat);
    if (ground) {
      // The ring's palaces are numbered by their own branch: palace `i` is branch `i`.
      const index = ['zi', 'chou', 'yin', 'mao', 'chen', 'si', 'wu', 'wei', 'shen', 'you', 'xu', 'hai'].indexOf(seat);
      if (layer === 'general') return { thing: board.generals[index] as Named, prefix: 'general' };
      if (layer === 'heaven') return { thing: board.heaven[index] as Named, prefix: 'branch' };
      if (layer === 'earth') return { thing: ground, prefix: 'branch' };
      return undefined;
    }
    const course = board.courses.find((one) => String(one.number) === seat);
    if (course) {
      if (layer === 'upper') return { thing: course.upper, prefix: 'branch' };
      if (layer === 'lower') return { thing: course.lower, prefix: course.lowerIsStem ? 'stem' : 'branch' };
      return undefined;
    }
    const transmission = board.transmissions.find((one) => one.position === seat);
    if (!transmission) return undefined;
    if (layer === 'branch') return { thing: transmission.branch, prefix: 'branch' };
    if (layer === 'general') return { thing: transmission.general, prefix: 'general' };
    if (layer === 'stem' && transmission.hiddenStem) return { thing: transmission.hiddenStem, prefix: 'stem' };
    return undefined;
  };
  const nameAt = (seat: string, layer: string): string | undefined => {
    const at = standing(seat, layer);
    return at && said(t, `label.${at.prefix}.${at.thing.id}`, at.thing);
  };
  const seatName = (seat: string): string => nameAt(seat, 'earth') ?? seat;
  return {
    nameAt,
    hanziAt: (seat, layer) => standing(seat, layer)?.thing.hanzi,
    seatName,
    seatPlace: (seat) => {
      if (onTheRing(seat)) return t('lens.where.palace', { palace: seatName(seat) });
      if (['1', '2', '3', '4'].includes(seat)) return t(`label.course.${seat}` as MessageKey);
      return t(`lens.where.transmission.${seat}` as MessageKey);
    },
  };
}

/** The 七政四餘 board: the bodies by their identifier, the palaces of the ring by their 次. */
export function qizhengWords(board: QizhengBoard | undefined, t: Translator): LensWords {
  const thingAt = (seat: string, layer: string, id?: string): { thing: Named; prefix: string } | undefined => {
    if (!board) return undefined;
    if (layer === 'governor' || layer === 'remainder') {
      const body = [...board.governors, ...board.remainders].find((one) => one.body.id === id)?.body;
      return body && { thing: body, prefix: 'qizheng' };
    }
    const house = board.houses.find((one) => one.palace.id === seat);
    if (!house) return undefined;
    if (layer === 'palace') return { thing: house.ci, prefix: 'ci' };
    if (layer === 'house') return { thing: house.house, prefix: 'house' };
    return undefined;
  };
  const nameAt = (seat: string, layer: string, id?: string): string | undefined => {
    const at = thingAt(seat, layer, id);
    return at && said(t, `label.${at.prefix}.${at.thing.id}`, at.thing);
  };
  const seatName = (seat: string): string => nameAt(seat, 'palace') ?? seat;
  return {
    nameAt,
    hanziAt: (seat, layer, id) => thingAt(seat, layer, id)?.thing.hanzi,
    seatName,
    seatPlace: (seat) => t('lens.where.palace', { palace: seatName(seat) }),
  };
}

/** The 紫微斗數 board: the stars by their identifier, a palace by the seat that fell there. */
export function ziweiWords(board: ZiweiBoard | undefined, t: Translator): LensWords {
  const thingAt = (seat: string, layer: string, id?: string): { thing: Named; prefix: string } | undefined => {
    const palace = board?.palaces.find((one) => one.branch.id === seat);
    if (!palace) return undefined;
    if (layer === 'star' || layer === 'minor') {
      const star = palace.stars.find((one) => one.star.id === id)?.star;
      return star && { thing: star, prefix: 'ziwei' };
    }
    if (layer === 'house') return { thing: palace.house, prefix: 'ziweihouse' };
    if (layer === 'ground') return { thing: palace.branch, prefix: 'branch' };
    return undefined;
  };
  const nameAt = (seat: string, layer: string, id?: string): string | undefined => {
    const at = thingAt(seat, layer, id);
    return at && said(t, `label.${at.prefix}.${at.thing.id}`, at.thing);
  };
  const seatName = (seat: string): string => nameAt(seat, 'house') ?? seat;
  return {
    nameAt,
    hanziAt: (seat, layer, id) => thingAt(seat, layer, id)?.thing.hanzi,
    seatName,
    seatPlace: (seat) => t('lens.where.palace', { palace: seatName(seat) }),
  };
}

/** The roles in 太乙's palaces, as the drawing names them, and their hanzi. */
const ROLE_NAMES: Record<string, Named> = {
  taiyi: { id: 'taiyi', hanzi: '太乙', pinyin: 'tàiyǐ' },
  hostGeneral: { id: 'hostGeneral', hanzi: '主大將', pinyin: 'zhǔdàjiàng' },
  hostAssistant: { id: 'hostAssistant', hanzi: '主參將', pinyin: 'zhǔcānjiàng' },
  guestGeneral: { id: 'guestGeneral', hanzi: '客大將', pinyin: 'kèdàjiàng' },
  guestAssistant: { id: 'guestAssistant', hanzi: '客參將', pinyin: 'kècānjiàng' },
};

/**
 * The 太乙 board: the sixteen gods by the seat of the rim they stand on, and
 * 太乙 and the generals by the palace they stand in. A palace is said by its
 * direction and trigram and never by its number, which is 太乙's own and one
 * seat off the 洛書's; the page says so beside the board.
 */
export function taiyiWords(board: TaiyiBoard | undefined, t: Translator): LensWords {
  const palaces = board
    ? [board.taiyi.palace, board.host.general, board.host.assistant, board.guest.general, board.guest.assistant]
    : [];
  const palaceName = (seat: string): string => {
    const palace = palaces.find((one) => one.id === seat);
    return palace ? said(t, `label.palace.${seat}`, palace) : t(`label.palace.${seat}` as MessageKey);
  };
  const godAt = (seat: string) =>
    board?.gods.find((god) => (god.seat.kind === 'branch' ? god.seat.branch.id === seat : god.seat.palace.id === seat));
  const seatName = (seat: string): string => {
    const god = godAt(seat);
    if (!god) return seat;
    return god.seat.kind === 'branch'
      ? said(t, `label.branch.${god.seat.branch.id}`, god.seat.branch)
      : said(t, `label.palace.${god.seat.palace.id}`, god.seat.palace);
  };
  return {
    hanziAt: (seat, layer, id) => {
      if (layer === 'taiyi' || layer === 'general') return ROLE_NAMES[layer === 'taiyi' ? 'taiyi' : (id ?? '')]?.hanzi;
      return layer === 'god' ? godAt(seat)?.hanzi : undefined;
    },
    nameAt: (seat, layer, id) => {
      if (layer === 'taiyi' || layer === 'general') {
        const role = ROLE_NAMES[layer === 'taiyi' ? 'taiyi' : (id ?? '')];
        return role && said(t, `label.taiyi.${role.id}`, role);
      }
      if (layer !== 'god') return undefined;
      const god = godAt(seat);
      return god && said(t, `label.taiyishen.${god.id}`, god);
    },
    seatName,
    seatPlace: (seat, layer) =>
      layer === 'taiyi' || layer === 'general'
        ? t('lens.where.palace', { palace: palaceName(seat) })
        : t('lens.where.seat', { seat: seatName(seat) }),
  };
}
