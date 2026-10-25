import { lensNames, phaseTable, type Lens, type LensThing } from './lens.js';
import type { TaiyiBoard, TaiyiGod } from './taiyi.js';
import type { Element } from './types.js';

/**
 * What a reader may ask a 太乙 board to show them: the board's `Lens`.
 *
 * **Between the sixteen gods of the rim, by the phase of each seat.** 卷六
 * gives the phase for thirteen of the sixteen and the other three follow
 * (`TaiyiGod.element`, and its row in `docs/sources.tsv`); and in the same
 * passage it reads the five relations between them — 「假今髙叢木，以吕申、大炅
 * 同類為旺；以大義、地主為相；武徳、太蔟為死；和徳、大武、太陽、天道為囚；大神、
 * 大威為休」, each god named by how its phase stands to 高叢's. That sentence is
 * what a test holds the lens to.
 *
 * **And the roles in the palaces, by the planet each is the essence of.**
 * 《太乙金鏡式經》卷二 推五將所主法 gives each of the five its star and its phase
 * — 「監將者東方歲星之精受木德之正氣…主大將者西方太白之精受金德之正氣」 — and
 * 《太乙數統宗大全》卷五 明太乙五將分屬五星 repeats them and adds the two 參將,
 * each taking the phase its general generates (`ROLE_PHASES`). 太乙 is the
 * 監將, 木; 主大將 金 and its 參將 水; 客大將 水 and its 參將 木. 文昌 and
 * 始擊 have phases of their own as roles (土 and 火), but on the board they are
 * which god of the rim the count starts from, and that god keeps its seat's
 * phase; the drawing sets them apart from the palaces, and a lens relates
 * the god.
 *
 * No pair is laid on this board. Each seat of the rim holds one god, and the
 * palaces are numbered one seat off the 洛書, an order a pair would have to
 * be held in; a name pressed already relates every role to every other.
 *
 * A seat of the rim is named as the drawing names it, by its branch or its
 * corner trigram; the four corners share their names with four palaces, and
 * the layers of the two kinds of seat do not meet, so a seat and a layer still
 * name one place.
 */

/** The layers of a 太乙 board, as the drawing marks them. */
export type TaiyiLayer = 'eye' | 'number' | 'taiyi' | 'general' | 'seat' | 'god';

export const TAIYI_LAYERS: readonly TaiyiLayer[] = ['eye', 'number', 'taiyi', 'general', 'seat', 'god'];

/** The layers whose names have a phase: the gods of the rim, 太乙 and the generals. */
export const TAIYI_LENS_LAYERS: readonly TaiyiLayer[] = ['taiyi', 'general', 'god'];

/** A role standing in a palace, as the drawing names it. */
export type TaiyiRole = 'taiyi' | 'hostGeneral' | 'hostAssistant' | 'guestGeneral' | 'guestAssistant';

/**
 * The phase of each role in a palace: 卷二 推五將所主法 for 太乙 and the two
 * great generals, the 統宗's 卷五 for the two 參將.
 */
export const ROLE_PHASES: Readonly<Record<TaiyiRole, Element>> = {
  taiyi: 'mu',
  hostGeneral: 'jin',
  hostAssistant: 'shui',
  guestGeneral: 'shui',
  guestAssistant: 'mu',
};

export type TaiyiLens = Lens<TaiyiLayer, never>;

/** The seat of the rim a god stands on, as the drawing names it. */
export const rimSeatOf = (god: TaiyiGod): string => (god.seat.kind === 'branch' ? god.seat.branch.id : god.seat.palace.id);

/** What a lens may show on this board: the sixteen gods, and the five relations. */
export function taiyiLens(board: TaiyiBoard): TaiyiLens {
  const things: LensThing<TaiyiLayer>[] = board.gods.map((god) => ({
    seat: rimSeatOf(god),
    layer: 'god',
    id: god.id,
    element: god.element,
  }));
  const role = (id: TaiyiRole, palace: { id: string } | undefined): void => {
    if (palace) things.push({ seat: palace.id, layer: id === 'taiyi' ? 'taiyi' : 'general', id, element: ROLE_PHASES[id] });
  };
  role('taiyi', board.taiyi.palace);
  role('hostGeneral', board.host.general);
  role('hostAssistant', board.host.assistant);
  role('guestGeneral', board.guest.general);
  role('guestAssistant', board.guest.assistant);
  const rim = board.gods.map(rimSeatOf);
  const palaces = ['qian', 'li', 'gen', 'zhen', 'zhong', 'dui', 'kun', 'kan', 'xun'];
  return {
    board: 'taiyi',
    // The palaces too, so a kind kept lights what stands in them; four of
    // their names are four corners of the rim as well, and listed once.
    seats: [...rim, ...palaces.filter((palace) => !rim.includes(palace))],
    pairSeats: [],
    layers: TAIYI_LAYERS,
    phased: TAIYI_LENS_LAYERS,
    // A palace may hold several generals; 太乙 stands alone in its layer.
    crowded: ['general'],
    things,
    phases: phaseTable(),
    linkIds: [],
    links: [],
    names: lensNames<never>({}),
  };
}
