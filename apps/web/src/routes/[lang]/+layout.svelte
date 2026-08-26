<script lang="ts">
  import { AUTHOR } from '$lib/author';
  import ColorSchemeToggle from '$lib/components/ColorSchemeToggle.svelte';
  import GlyphRain from '$lib/components/GlyphRain.svelte';
  import LanguageSwitch from '$lib/components/LanguageSwitch.svelte';
  import RainToggle from '$lib/components/RainToggle.svelte';
  import SectionsNav from '$lib/components/SectionsNav.svelte';
  import { EXTERNAL } from '$lib/external';
  import { rain } from '$lib/rain.svelte';
  import { SOURCE_URL } from '$lib/source';

  let { data, children } = $props();
  const t = $derived(data.t);
</script>

<!--
  The manifest is per language, so it is linked from under the language and
  not from `app.html`.

  It could nearly have gone there — `hooks.server.ts` already substitutes the
  locale into that file — except that it does so with `replace`, which takes
  the first `%lang%` and leaves a second standing as literal text. Linking it
  here also puts it exactly where it is true: every page a reader could
  install from is under this layout, and the pages that are not (the root
  redirect, an error before a language is known) have no language to name.
-->
<svelte:head>
  <link rel="manifest" href="/{t.locale}/manifest.webmanifest" />
</svelte:head>

<!-- Mounted only while it falls, so that the page ships with no canvas, no
     loop and no listeners until somebody presses for them. -->
{#if rain.falling}
  <GlyphRain />
{/if}

<div class="shell" class:veiled={rain.falling}>
  <header>
    <!-- The wordmark is not the page's title: each section carries its own
         `h1`, so the mark can stay the same on all of them. -->
    <a class="mark" href="/{t.locale}" aria-label="shipan 式盤 shìpán">
      <img src="/seal.svg" alt="" />
      <span class="name">
        <span class="word">shipan</span>
        <!-- A name carries its reading, on the mark as everywhere else. -->
        <span class="reading">式盤 · shìpán</span>
      </span>
    </a>

    <!-- One line for both: where the reader can go, and the three settings
         that say how they are reading it. The switches earn the end of that
         line rather than a row of their own, being two letters, a glyph and a
         circle — and they keep it on a phone, where the sections fold and they
         do not: three small marks cost the line almost nothing, and an
         appearance buried behind a press is harder to reach than it is now.

         The rain sits between the language and the appearance, on the side
         the appearance button used to hide it behind. -->
    <div class="bar">
      <SectionsNav {t} />

      <div class="controls">
        <LanguageSwitch {t} />
        <div class="switches">
          <RainToggle {t} />
          <ColorSchemeToggle {t} />
        </div>
      </div>
    </div>
  </header>

  <main>{@render children()}</main>

  <footer>
    <!-- First of the three, and not in the small print at the end of them:
         it is the one line here that is about what to do with any of this. -->
    <p class="disclaimer">{t('footer.disclaimer')}</p>
    <p>
      {t('footer.data', { ephemeris: 'Swiss Ephemeris', geonames: 'GeoNames' })}
    </p>
    <!-- Who made it, on the page and not only in the structured data. The
         first question the helpful-content guide asks is who wrote this, and
         a byline a crawler can read and a reader cannot is that question
         answered to the wrong party. `author.ts` is the one place the name
         is written. -->
    <p>{t('footer.author', { author: AUTHOR })}</p>
    <!-- The third of them is the only link here that leaves the site, and it
         leaves it because the licence says it must: the line already named
         AGPL-3.0, and a licence that obliges an offer of the source obliges
         an address to collect it at. The catalogs are untouched — the
         sentence they hold is already the name of what it now points to.

         Leaving is what `EXTERNAL` describes: beside the page and carrying no
         referrer, since the address it would carry is somebody's birth. -->
    <p>
      <a href="/{t.locale}/notes">{t('footer.notes')}</a> ·
      <a href="/{t.locale}/privacy">{t('footer.privacy')}</a> ·
      <a class="source" href={SOURCE_URL} {...EXTERNAL}>{t('footer.licence')}</a>
    </p>
  </footer>
</div>

<style>
  /* The gutter narrows with the screen: at 1.25rem a side, a phone spends a
     tenth of its width on margins. */
  .shell { max-width: 72rem; margin: 0 auto; padding: 1rem clamp(0.75rem, 4vw, 1.25rem) 3rem; }

  /*
   * What the page is read off while the rain falls behind it.
   *
   * Not a panel with an edge — a ground laid over the weather, twenty per cent
   * short of opaque, so the glyphs are perceptible under the text without
   * competing with it. The measure of it is the disclaimer: the quietest
   * thing in the shell is `--faint` on `--ground`, and a veil thin enough to
   * put that below the contrast the rest of the stylesheet argues for would
   * be a veil that costs somebody the one line they must be able to read.
   *
   * Only the shell takes it. Outside 72rem the margins are bare, which is
   * where the rain is actually visible — and where nothing is being read.
   */
  .veiled {
    background: color-mix(in srgb, var(--ground) 80%, transparent);
  }

  header { margin-bottom: 2rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--rule); }
  /*
   * The mark sits above the line, centred, where the page has no margin to
   * put it in. Fitted to its content rather than stretched: an `<a>` as wide
   * as the header would be a click target the width of the page.
   */
  .mark { margin: 0 auto 1.1rem; width: fit-content; }

  /*
   * Where the reader can go, and how they are reading it, on one line.
   *
   * On the nav's own baseline rather than floating above its underline — and
   * said as the baseline rather than as the foot, which is what it used to
   * say. A foot is the same thing as a baseline only while the nav is one
   * line: folded open on a phone the nav is eight, its foot is under `Ba Zi`,
   * and the switches went down there with it. The baseline is the first
   * one either way, which is the button when there is a button and the first
   * section when there is not.
   */
  .bar {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem 1.5rem;
    flex-wrap: wrap;
  }
  .mark {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: var(--ink);
  }
  /* Height, never width: a seal is as wide as the name in it. One character
     stands upright at about 1:1.6 and two side by side run wider than tall,
     so a square box here would squash whichever the project ends up called. */
  .mark img { display: block; height: 34px; width: auto; }
  .name { display: flex; flex-direction: column; line-height: 1.15; }
  .reading { font-size: 0.68rem; color: var(--faint); letter-spacing: 0.01em; }

  /*
   * Wide enough for a margin, and the seal goes and sits in it.
   *
   * Where a 印 belongs on a scroll: outside the field that is read, not inside
   * it — and it stays put while the page moves under it, which is the same
   * relation a stamp has to a scroll being unrolled. The threshold is the
   * shell (72rem) plus room on both sides for the mark and its gap; below it
   * there is no margin to move into and a fixed element would sit on top of
   * the text instead of beside it, so the header keeps it inline.
   *
   * The name travels with the seal. A glyph alone is unsayable to the reader
   * this is built for — the mark would become a shape nobody can search.
   */
  @media (min-width: 88rem) {
    .mark {
      position: fixed;
      /* The shell's own top padding: the seal starts where the nav's line
         starts, rather than hanging below it. */
      top: 1rem;
      /* 6.5rem wide, half a rem clear of the shell's edge — which also leaves
         a rem of air outside it at exactly 88rem, where the margin is 8. */
      left: calc(50% - 36rem - 7rem);
      margin: 0;
      width: 6.5rem;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;
    }
    .mark img { height: 76px; }
    .name { align-items: center; }
  }

  /* A sheet does not scroll, and a fixed element on one either repeats on
     every page or lands off it. */
  @media print {
    .mark { position: static; width: fit-content; flex-direction: row; margin: 0 auto 0.6rem; }
    .mark img { height: 34px; }
  }
  /*
   * Two groups, spaced as two.
   *
   * A language is chosen once and an appearance is chosen once, but they are
   * not the same kind of thing: the codes are words to read, the other two are
   * marks to press. Set at one even gap the row read as four items at random
   * distances from each other. The two marks close up into a pair — near
   * enough to be one control with two faces — and the air goes where the
   * change of kind is.
   */
  .controls { display: flex; align-items: center; gap: 1.75rem; flex-wrap: wrap; }
  /* Each button carries 0.25rem of its own padding, so the gap here is half
     of what stands between the glyph and the circle. */
  .switches { display: flex; align-items: center; gap: 0.15rem; }

  /*
   * Centred, and across the whole shell.
   *
   * Three short lines set flush left under a page of tables read as a fourth
   * column of it. Centred they read as what they are — the foot of the page,
   * and not the last thing the chart had to say.
   *
   * No measure on them either. A `max-width` here is the width of a paragraph
   * somebody reads through, and these are not that: bounded to 62ch the
   * disclaimer broke into three ragged lines in the middle of a shell twice
   * as wide, which is a line break the reader has to account for and cannot.
   */
  footer {
    margin-top: 4rem;
    padding-top: 1rem;
    border-top: 1px solid var(--rule);
    color: var(--faint);
    font-size: 0.85em;
    text-align: center;
  }
  /* Darker than the two lines under it. A disclaimer set in the same grey as
     a licence notice is a disclaimer nobody reads, and this one is the reason
     the other two are allowed to be quiet. */
  .disclaimer { color: var(--ink); }
  footer p { margin: 0.3rem 0; }

  /*
   * On paper the shell keeps two of its three parts.
   *
   * The nav and the two switches are ways of going somewhere else, and a
   * sheet has nowhere else. What stays is the wordmark, because a printed
   * chart handed on should say where it was cast, and the whole footer,
   * because the disclaimer is the one line that must never be separated from
   * a chart — least of all on the copy that travels furthest from the page
   * carrying it.
   */
  @media print {
    .shell { max-width: none; padding: 0; }
    /* The nav hides itself: a scoped selector here no longer reaches a
       `<nav>` that is rendered in a component of its own. */
    .controls { display: none; }
    .mark { text-decoration: none; }
    header { margin-bottom: 1rem; }
    /* Close under what it qualifies, and never split: the disclaimer is two
       lines and half a disclaimer is worse than none. Tight, because it is
       what decides whether a report runs to one sheet more than it needs. */
    footer { margin-top: 0.8rem; break-inside: avoid; }
    /* The one link on the sheet that has to survive not being a link. A
       printed chart travels furthest from the page that cast it, and «source
       code under AGPL-3.0» with nowhere to go is exactly the offer the
       licence is not satisfied by. So the address is set, once, after it. */
    .source::after { content: ' — ' attr(href); }
  }
</style>
