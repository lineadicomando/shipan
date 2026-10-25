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

export const rain = $state<{ mode: RainMode }>({ mode: 'off' });

export function isPhase(mode: RainMode): mode is Phase {
  return (PHASES as readonly string[]).includes(mode);
}

export function nextRainMode(mode: RainMode): RainMode {
  return ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length] as RainMode;
}

export function cycleRain(): void {
  rain.mode = nextRainMode(rain.mode);
}
