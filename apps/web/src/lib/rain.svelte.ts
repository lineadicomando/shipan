/**
 * Whether the rain is falling, shared across the page.
 *
 * Nothing is written to storage and nothing is written to the address, and a
 * reload puts the page back the way it is shipped. The appearance is
 * remembered because a reader who wants a dark page wants it before the first
 * paint, and paying for that costs the one line in the privacy note about
 * what is kept in the browser. This is a button anyone can find in the
 * header — one press away on any page, and never the same cost. **The
 * privacy note says one thing is kept in the browser, and it stays one.**
 */
export const rain = $state<{ falling: boolean }>({ falling: false });

export function toggleRain(): void {
  rain.falling = !rain.falling;
}
