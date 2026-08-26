<script lang="ts">
  import { page } from '$app/state';
  import type { Translator } from '@shipan/i18n';
  import { metaOf } from '$lib/meta';
  import { SECTIONS } from '$lib/navigation';
  import { layerOfSection } from '$lib/notes';
  import { saidApart } from '$lib/said';

  /**
   * What a section opens with: its heading, and the two paragraphs under it.
   *
   * **The heading is here because this is where a section begins.** It used
   * to be `offscreen` on each page, on the argument that the nav already said
   * which section this was — and the nav paid for that by growing the current
   * item out to the full name, which made the one row on this site that
   * changes width as a reader moves along it. Said once, at the top of the
   * page, it costs the bar nothing and is legible without being aimed at.
   *
   * **It is the same size as the paragraphs under it, and bold.** A section
   * page is a form and a board; a heading set at heading size would be the
   * loudest thing above the fold and would be announcing what the reader
   * chose one click ago. What it has to do is name the art whole — `Zi Wei
   * Dou Shu — i dodici seggi di una nascita`, where the bar could only say
   * `Zi Wei` — and weight does that at any size.
   *
   * **What it buys is the paragraph under it.** An introduction may now open
   * on 紫微斗數 zǐwēi dǒushù, glyph first, because the reader has just been
   * told in their own language what this page is: the name arrives as the
   * name of something already named, rather than as the first thing they meet
   * on a page whose language they cannot yet see. That is the one rule this
   * arrangement is here to keep — see `docs/i18n.md`.
   *
   * **The paragraphs say what the heading cannot.** Somebody who has met 六壬
   * knows what they are looking at; somebody who has not has arrived at a
   * date field and a place field and no account of what will happen when they
   * press. These are that account.
   *
   * **Two columns, and the shape is the argument.** Set as one column across
   * a 72rem shell these would run to a single line of enormous measure, which
   * is the hardest thing on this page to read; set as one column at a
   * readable measure they would be a narrow strip of prose beside a great
   * deal of nothing. Two columns give each paragraph a measure of about
   * fifty characters and halve the height, which is the whole cost: what is
   * above the form has to stay short enough that the form is still the thing
   * the page is about.
   *
   * **The columns are a grid and not `column-count`, which would have been
   * the obvious reading of "two columns" and the wrong one.** A count flows
   * one body of text through two boxes: the first paragraph would end
   * halfway down the left column and the second would begin under it and
   * continue on the right, so a reader following either has to cross the
   * gutter mid-sentence. What is wanted is one paragraph per column — two
   * things said side by side, each read straight down — and that is a grid
   * of two tracks. It also collapses by itself: below the width at which two
   * readable measures fit, the tracks become one and the paragraphs stack in
   * the order they are written.
   *
   * **The heading goes on paper and the rest does not.** A printed sheet is a
   * chart somebody is handing on, and what has to travel with it is the
   * board, the moment it was cast at and the disclaimer. An introduction is
   * written for a reader deciding whether to use the section, which is a
   * decision already taken by the time anything is printed — but a sheet with
   * no line saying which art drew it is a sheet the person receiving it has
   * to identify from the drawing.
   */
  let { t }: { t: Translator } = $props();

  const intro = $derived(metaOf(page.url.pathname)?.intro);

  /**
   * The section being read, said the way `meta.ts` says it: the language is
   * cut off the front and what is left is the slug, so nothing here has to
   * know how many vernaculars there are.
   */
  const slug = $derived(
    page.url.pathname
      .replace(/\/$/, '')
      .split('/')
      .slice(2)
      .join('/'),
  );

  /**
   * Where the account of this art is, and what to call it on the way.
   *
   * **The link is the third thing in the block and it is not a third
   * paragraph.** What the two paragraphs do is say what the art is and what
   * this page will not do; both raise questions they are the wrong length to
   * answer — what 拆補 is, why the latitude is refused, what else could have
   * been asked for — and the register that answers them was, until now,
   * reachable only through the word «Notes» in the footer. A reader who has
   * just read that the ju is by 拆補 is the one reader on this site who will
   * follow a link to the page that lists it beside the value it was chosen
   * over.
   *
   * **The anchor text says the errand and leaves the name to the heading.**
   * It used to carry the art — «How Qi Men Dun Jia is computed» — written
   * when the heading was `offscreen` and a link was met with none of the
   * prose around it, which is the case that makes «read more» useless: eight
   * sections sharing one line say it eight times to nobody. The heading is
   * now four lines above this and inside the same block, so a reader passes
   * the name on the way to the link whether they are looking at the page or
   * running a screen reader down it. Said twice that close, it stopped being
   * anchor text and became a repetition.
   *
   * The consultation still gets a wording of its own, and a fragment is the
   * one thing it does not get: the whole register is what it is laid on, and
   * «how each of these boards is computed» is a different sentence from «how
   * this one is».
   */
  const layer = $derived(layerOfSection(slug));

  /** The section this is, for the heading it wears. */
  const here = $derived(SECTIONS.find((section) => section.slug === slug));
</script>

{#if intro}
  <div class="intro">
    {#if here}<h1>{t(here.heading)}</h1>{/if}
    {#each intro as paragraph (paragraph)}
      <!-- The reading beside a name, set apart from the sentence it stands in
           — `$lib/said` is the whole of the rule, and the heading above is
           what makes the glyphs a reasonable thing to open a paragraph on.
           Written without a break anywhere inside: whitespace between these
           tags is whitespace in the sentence, and the segments are the
           sentence cut up rather than a list of things. -->
      <p>{#each saidApart(t(paragraph)) as segment, index (index)}{#if segment.said}<i>{segment.text}</i>{:else}{segment.text}{/if}{/each}</p>
    {/each}
    <a href="/{t.locale}/notes/instruments{layer ? `#${layer.id}` : ''}">
      {layer ? t('intro.computed') : t('intro.computed.all')}
    </a>
  </div>
{/if}

<style>
  /*
   * `auto-fit` with a minimum, rather than `repeat(2, 1fr)` and a media
   * query: the breakpoint is then the measure itself — two tracks appear
   * exactly when two of them can hold a readable line and not at a width
   * somebody guessed — and the same rule serves a phone, a shell narrowed by
   * a sidebar and a window dragged to half a screen.
   *
   * 24rem is about fifty characters at this size, which is the low end of a
   * comfortable measure and the right end to be at: these are two short
   * paragraphs, and a column too narrow to read is worse than a page that
   * stacked them.
   */
  .intro {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    /*
     * The row gap is spent twice and wants the same number both times: under
     * the paragraphs, where the link to the notes stands across both tracks,
     * and between the paragraphs themselves once the tracks have collapsed to
     * one. It used to be spent only in the stacked case — there was one row
     * while there were two columns — and 0.9rem was chosen as what two
     * paragraphs want between them; a paragraph and the line under it want
     * the same, so the link cost the comment and not the value.
     *
     * The column gap stays its own number. At the row's distance the two
     * paragraphs read as one block with an accidental break.
     */
    gap: 0.9rem 1.6rem;
    /*
     * Pulled up into the header's own 2rem, rather than taking that 2rem
     * down: the rule under the nav is the whole site's and pages with no
     * introduction sit against it too. What is tightened here is this block's
     * band and nobody else's.
     */
    margin: -0.4rem 0 1.15rem;
    /*
     * A container so the separator can be asked for at exactly the width the
     * tracks appear at — see it below. `inline-size` contains nothing this
     * block was relying on: a grid of two text columns is as wide as its
     * parent either way.
     */
    container-type: inline-size;
  }

  /*
   * The heading, across both tracks and at the size of what it heads.
   *
   * **The size of the paragraphs, and not a heading size.** The browser's own
   * `h1` is 2em and bold, which on a page whose subject is a form and a board
   * would be the loudest thing above the fold — announcing, at the top of the
   * page, what the reader chose one click ago. Set at 0.9rem it is the same
   * line as the two under it and reads as the first of the three, which is
   * what it is. Weight is what marks it as a heading, and weight does that at
   * any size; `--ink` against the `--faint` of the paragraphs finishes it.
   *
   * The margin under it is its own and pulls against the grid's row gap. A
   * heading belongs to what follows it, and 0.9rem — the distance set between
   * two paragraphs that are read separately — reads as a gap rather than as
   * attachment.
   */
  .intro h1 {
    grid-column: 1 / -1;
    margin: 0 0 -0.25rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--ink);
  }

  /*
   * The register the leads were set in: quiet, but not discardable. Nothing
   * on this site is set in `--faint` that a reader is not meant to read —
   * see the palette — and this is the one block on a section page that a
   * reader who has never met the art has to be able to get through.
   */
  .intro p {
    margin: 0;
    color: var(--faint);
    font-size: 0.9rem;
    line-height: 1.55;
    /* The tracks are already at a measure; this keeps the single-column case
       from stretching to the width of the shell. */
    max-width: 44rem;
  }

  /*
   * Across both tracks, under both paragraphs.
   *
   * Not a third column: `auto-fit` would give it one at the width two
   * paragraphs already fill, and a link set beside prose in a track of its own
   * reads as a third thing the section is about rather than as the way out of
   * the two above it. Spanning, it sits where a reader is when they have
   * finished reading — which is the only place a link forward is any use.
   *
   * `justify-self` keeps it the width of its own words. A grid item stretches
   * by default, and a stretched anchor is a click target as wide as the shell
   * with an underline under one end of it.
   */
  .intro a {
    grid-column: 1 / -1;
    justify-self: start;
    font-size: 0.9rem;
    /* The paragraphs above are `--faint` and this is not: what is quiet here
       is the account, and the way to the rest of it is the one line in the
       block a reader is being asked to act on. */
    text-underline-offset: 0.15em;
  }

  /*
   * The gutter, said with a mark rather than with distance.
   *
   * Closing the columns up to 1.6rem is what makes the two paragraphs read as
   * one block above the form instead of two things adrift in the shell — and
   * at that distance alone they would start to read as one paragraph broken
   * mid-line, which is what the wider gap was buying. A hairline in `--rule`
   * buys it back for a tenth of the width: `--rule` and not `--edge` because
   * this separates two columns of a page and is not the boundary of anything
   * a reader clicks into — see the palette.
   *
   * Fixed at 1.375rem and centred, not stretched to the tracks. A rule as tall
   * as the taller paragraph would draw a box, and the two paragraphs are of
   * different lengths in every vernacular, so a full-height rule is a
   * different mark in English and in Italian. Short and centred is the same
   * mark in both.
   *
   * The condition is the grid's own arithmetic and not a guessed breakpoint:
   * `auto-fit` gives a second track when the content box holds two 24rem
   * minimums and the 1.6rem between them, which is 49.6rem. Below it the
   * paragraphs stack, there is no gutter, and there is nothing to draw in it.
   */
  @container (min-width: 49.6rem) {
    .intro p + p {
      position: relative;
    }

    .intro p + p::before {
      content: '';
      position: absolute;
      left: -0.8rem;
      top: 50%;
      width: 1px;
      height: 1.375rem;
      margin-top: -0.6875rem;
      background: var(--rule);
    }
  }

  /* The heading travels with the sheet and the account does not: what the
     person receiving a printed chart needs is the name of the art that drew
     it, not the case for using the section they were not in. */
  @media print {
    .intro p,
    .intro a { display: none; }
    .intro h1 { margin: 0 0 0.6rem; }
  }
</style>
