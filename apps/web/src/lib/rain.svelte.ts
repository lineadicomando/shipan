/**
 * How the rain is falling, shared across the page: not at all, in the page's
 * own ink, or in the ink of one of the five phases.
 *
 * Nothing is written to storage and nothing is written to the address, and a
 * reload puts the page back the way it is shipped. The appearance is
 * remembered because a reader who wants a dark page wants it before the first
 * paint, and a folded introduction because it would otherwise have to be
 * folded again on every visit; each costs a line in the privacy note about
 * what is kept in the browser. This is a button anyone can find in the
 * header — one press away on any page, and never the same cost. **The
 * privacy note enumerates what is kept in the browser, and this does not
 * join the list.**
 */
export const PHASES = ['mu', 'huo', 'tu', 'jin', 'shui'] as const;
export type Phase = (typeof PHASES)[number];

export type RainMode = 'off' | 'ink' | Phase;

/** Off, the page's ink, then the phases in their generating order. */
const ORDER: readonly RainMode[] = ['off', 'ink', ...PHASES];

/**
 * `turning` is the setting nobody is shown: pressed with Ctrl (or ⌘) while
 * the rain is off, the rain starts in the page's ink and moves on to the next
 * of the six lit colours every `TURN` milliseconds, until a press puts it
 * away. It is found by accident or not at all, and the label says only which
 * colour is falling and that a press turns it off.
 */
export const rain = $state<{ mode: RainMode; turning: boolean }>({ mode: 'off', turning: false });

const TURN = 7000;

/** The six lit settings, in the order the turning rain goes through them. */
const LIT: readonly RainMode[] = ['ink', ...PHASES];

let timer: ReturnType<typeof setInterval> | null = null;

function stopTurning(): void {
  if (timer) clearInterval(timer);
  timer = null;
  rain.turning = false;
}

export function isPhase(mode: RainMode): mode is Phase {
  return (PHASES as readonly string[]).includes(mode);
}

/** Where a plain press takes the rain: out of the turning one, always off. */
export function nextRainMode(mode: RainMode, turning = false): RainMode {
  if (turning) return 'off';
  return ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length] as RainMode;
}

/** A press on the button; `turn` is whether Ctrl or ⌘ was held. */
export function cycleRain(turn = false): void {
  if (rain.turning) {
    stopTurning();
    rain.mode = 'off';
    return;
  }
  if (turn && rain.mode === 'off') {
    rain.mode = 'ink';
    rain.turning = true;
    timer = setInterval(() => {
      rain.mode = LIT[(LIT.indexOf(rain.mode) + 1) % LIT.length] as RainMode;
    }, TURN);
    return;
  }
  rain.mode = nextRainMode(rain.mode);
}
