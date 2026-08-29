<!--
  A mark for what a control does, and never a name.

  **These are not glyphs, and the rule about glyphs does not reach them.**
  That rule is about a name printed as a shape — 時辰 on a button is unsayable,
  unsearchable and unaskable to the reader this is built for, and so is `zishi`
  in a list of options. An arrow, a printer, two links of a chain and a folded
  menu name nothing. Nobody pronounces them, nobody looks them up, and the
  reader has met all of them in every interface they have ever used.
  `docs/i18n.md` states the bound; this file only has to stay inside it.

  What is asked of a mark instead is that it be recognisable and that it carry
  its word where somebody who cannot see it will get it. Every one of these is
  `aria-hidden`: to a screen reader the button is its accessible name and this
  is nothing at all. That name is never optional.

  **Where a word stands beside the mark, it is because the control is one a
  reader has to weigh rather than one they look for.** Copy, copied, link,
  print and the sections fold all sit in the flow of a page among things being
  read, and there a mark alone would be a decision offered as a shape. `up`
  does not: in Zi Wei's table it is chrome beside a row that already names the
  seat in the reader's language, and in the corner of a long page it is the
  return to the top, which is a movement and not a decision. Both carry the
  word as `aria-label` and `title`.
-->
<script lang="ts">
  let { name }: { name: 'copy' | 'copied' | 'link' | 'print' | 'menu' | 'up' } = $props();
</script>

<svg
  viewBox="0 0 16 16"
  width="1em"
  height="1em"
  fill="none"
  stroke="currentColor"
  stroke-width="1.3"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
>
  {#if name === 'copy'}
    <rect x="5.5" y="5.5" width="8" height="9" rx="1.3" />
    <path d="M10.5 5.5V3A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v6A1.5 1.5 0 0 0 4 10.5h1.5" />
  {:else if name === 'copied'}
    <path d="M2.5 8.5 6 12l7.5-8" />
  {:else if name === 'up'}
    <!-- Up, which is the whole of what it does in both places it is drawn:
         the board is above the table, and the top of the page is above the
         page. -->
    <path d="M8 13.5V3.5M3.5 8 8 3.5 12.5 8" />
  {:else if name === 'link'}
    <!-- Two halves of a chain, which is the shape an address has been drawn
         as for as long as there have been addresses to copy. The bar between
         them is what makes it a chain and not two brackets. -->
    <path d="M6.6 9.4 9.4 6.6" />
    <path d="M9.1 4.9 10.6 3.4a2.6 2.6 0 0 1 3.7 3.7l-1.5 1.5" />
    <path d="M6.9 11.1 5.4 12.6a2.6 2.6 0 0 1-3.7-3.7l1.5-1.5" />
  {:else if name === 'print'}
    <path d="M4.5 6.5v-5h7v5" />
    <rect x="1.5" y="6.5" width="13" height="5.5" rx="1.3" />
    <path d="M4.5 10h7v4.5h-7z" />
  {:else}
    <!-- Three rules the width of the box, which is the shape every browser,
         phone and application has taught the same thing to mean. It is here
         to be recognised, not to be read: the word travels beside it. -->
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
  {/if}
</svg>

<style>
  svg {
    /* On the baseline of the word beside it, not hanging under it. */
    vertical-align: -0.12em;
    flex: none;
  }
</style>
