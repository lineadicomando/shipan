<!--
  How a long page of the notes opens: the prose, and then the way into it.

  **One flow of two columns, and not a grid.** `NoteLeads` is the grid — one
  paragraph a track, each read straight down — and it is right where the two
  paragraphs are the whole of the block. Here they are followed by an index,
  and a grid cannot hold both: a grid dropped into a column is one unbreakable
  item, so the leads have to flow if the list is to come up beside them. What
  a flow buys is what the privacy note argues for the same arrangement — the
  block says the same thing at every height — and the hairline down the full
  gutter is what says a flow crosses it.

  **The index starts the second column rather than balancing into it.**
  Balanced, three entries sat under the paragraphs and the rest stood alone on
  the right, which reads as two lists: nothing carries the eye across a gutter
  between two short entries the way a sentence does. Forced, the block is
  prose on the left and doors on the right in every vernacular, and not only
  where the Italian happened to fall. A forced break is ignored where there is
  one column, so a phone is unaffected.

  **Nothing here is written.** An anchor wears the name its section wears —
  the pinyin and the glyph where the section is a named art, the section's own
  title otherwise — and it points at the identifier that section is already
  keyed by. A page adding a layer or a refusal adds an entry by adding it.

  It does not print. The section's own nav on a sheet is the list of what else
  was checked, and a reader needs that; this is anchors to headings printed
  under them, which a reader reaches by turning the page.
-->
<script lang="ts">
  import type { MessageKey, Translator } from '@shipan/i18n';
  import Named from './Named.svelte';

  /** A section of the page this block opens, as the index has to name it. */
  export interface NoteAnchor {
    /** The `id` the section carries, and the fragment the entry points at. */
    id: string;
    /** A named art: the pinyin leads and the glyph stands beside it. */
    name?: { hanzi: string; pinyin: string };
    /** Anything else — a heading in the reader's own language. */
    title?: MessageKey;
  }

  interface Props {
    t: Translator;
    /**
     * One or two, and the type says so for `PageMeta.intro`'s reason: these
     * are the paragraphs a page opens on, not a list that happens to hold two
     * today. The register opens on one and every other page on two.
     */
    leads: readonly [MessageKey] | readonly [MessageKey, MessageKey];
    anchors: readonly NoteAnchor[];
    /** What the index is, said to a screen reader: the page's own title. */
    label: MessageKey;
  }

  let { t, leads, anchors, label }: Props = $props();
</script>

<div class="columns">
  {#each leads as lead (lead)}
    <!-- The names in them set apart, as everywhere else: these are the
         paragraphs most likely to open on a glyph. -->
    <p class="lead"><Named text={t(lead)} /></p>
  {/each}

  <nav aria-label={t(label)}>
    <ul class="contents">
      {#each anchors as anchor (anchor.id)}
        <li>
          <a href="#{anchor.id}">
            {#if anchor.name}
              <span class="said">{anchor.name.pinyin}</span>
              <span class="glyph">{anchor.name.hanzi}</span>
            {:else if anchor.title}
              <Named text={t(anchor.title)} />
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style>
  /*
   * 24rem a column and 1.6rem between them are the numbers `NoteLeads`,
   * `WrittenNotes` and the privacy note use, so this keeps the site's measure
   * — about fifty characters — and 50rem is the width at which exactly two of
   * them fit. Capped here rather than on the page, because two of the pages
   * that use this are wider than 50rem for a table's sake and the prose does
   * not want that width.
   */
  .columns {
    max-width: 50rem;
    column-width: 24rem;
    column-gap: 1.6rem;
    column-rule: 1px solid var(--rule);
  }

  .lead { margin: 1rem 0; orphans: 2; widows: 2; }
  /* A column that begins mid-flow begins flush: a break carries no margin
     across it, and the two would otherwise start a line apart. */
  .columns > :first-child { margin-top: 0; }

  .contents { break-before: column; margin: 1.6rem 0 0; padding: 0; list-style: none; }
  /* An entry is one line, and half of it at the foot of a column is a door in
     one place and its label in another. */
  .contents li { margin: 0 0 0.55rem; break-inside: avoid; }
  .contents a { font-weight: 500; }

  /* The name said aloud leads and the glyph stands beside it, which is the
     order the heading it points at keeps. */
  .glyph { font-size: 0.85rem; color: var(--faint); font-weight: 400; }
  .said { letter-spacing: 0.01em; }

  @media print {
    nav { display: none; }
  }
</style>
