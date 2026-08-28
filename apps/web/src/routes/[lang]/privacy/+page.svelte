<!--
  The privacy note: the one page here that is written to be checked rather
  than read.

  Numbered sections and headed pairs, because that is the shape somebody
  verifying a GDPR obligation arrives looking for — and the arrangement is
  markup rather than typography: a labelled point is a `<dl>`, so the label a
  reader scans for is the term of its own definition and a screen reader says
  which answer belongs to which heading. The three points that carry no label
  are a plain list, which is what they are.

  **The whole of it flows through two columns, which is the one place on this
  site where `column-count` is right.** Everywhere else two columns are a grid:
  a pair of paragraphs answering each other, or two headed halves, each read
  straight down its own track. This is neither — it is one document of five
  numbered sections, read in the passages somebody came for rather than
  through, and the shape it is checked against is a contract. Laid out as a
  grid it was two columns where a section happened to have two halves and one
  column where it did not, which is an arrangement that says nothing and looks
  like an accident. A flow says the same thing at every height.

  **The two links leave the site and both go to the same address**, read from
  `PUBLIC_SOURCE_URL` through `lib/source.ts` so that a fork points at itself.
  That matters more here than in the footer: this page names a data controller
  and then says where to find them, and an address baked in at build would
  send a fork's readers to somebody who does not run the copy they are
  talking to. `EXTERNAL` is spread onto both, like every other link that
  leaves.
-->
<script lang="ts">
  import { COLOR_SCHEME_KEY } from '$lib/color-scheme';
  import { EXTERNAL } from '$lib/external';
  import { SOURCE_URL } from '$lib/source';
  import PageHead from '$lib/components/PageHead.svelte';
  let { data } = $props();
  const t = $derived(data.t);
</script>

<PageHead {t} />

<article>
  <!-- Outside the flow, so that it is the title of both columns rather than
       the first thing in the left one. -->
  <h1>{t('privacy.title')}</h1>

  <div class="columns">
    <p class="lead">{t('privacy.gdpr')}</p>
    <p class="lead">{t('privacy.summary')}</p>

    <section>
      <h2>{t('privacy.controller.title')}</h2>
      <p>
        {t('privacy.controller.who')}
        <a href={SOURCE_URL} {...EXTERNAL}>{t('privacy.controller.repository')}</a>
      </p>
    </section>

    <section>
      <h2>{t('privacy.data.title')}</h2>

      <h3>{t('privacy.inputs.title')}</h3>
      <p>{t('privacy.inputs.lead')}</p>
      <!-- The first of the three is the one a form of words could easily make
           untrue. The engine is on the server, the parameters reach it in the
           query string, and the claim being made is that none of it is kept —
           not that none of it is sent. See the catalogs. -->
      <dl>
        <dt>{t('privacy.inputs.local')}</dt>
        <dd>{t('privacy.inputs.local.means')}</dd>
        <dt>{t('privacy.inputs.stored')}</dt>
        <dd>{t('privacy.inputs.stored.means')}</dd>
        <dt>{t('privacy.inputs.address')}</dt>
        <dd>{t('privacy.inputs.address.means')}</dd>
      </dl>

      <h3>{t('privacy.prompt.title')}</h3>
      <ul>
        <li>{t('privacy.prompt.device')}</li>
        <li>{t('privacy.prompt.server')}</li>
        <li>{t('privacy.prompt.thirdParty')}</li>
      </ul>
    </section>

    <section>
      <h2>{t('privacy.browser.title')}</h2>

      <h3>{t('privacy.cookies.title')}</h3>
      <dl>
        <dt>{t('privacy.cookies.none')}</dt>
        <dd>{t('privacy.cookies.none.means')}</dd>
        <dt>{t('privacy.cookies.analytics')}</dt>
        <dd>{t('privacy.cookies.analytics.means')}</dd>
      </dl>

      <h3>{t('privacy.storage.title')}</h3>
      <!-- Two things are kept, and they are kept for different reasons: the
           first because the reader asked for it, the second because the site
           can be installed. The second is mostly a list of what is *not* in
           it, which is the half a reader actually wants. -->
      <p>{t('privacy.storage.lead')}</p>
      <dl>
        <dt>{t('privacy.storage.scheme')}</dt>
        <dd>{t('privacy.storage.scheme.means', { key: COLOR_SCHEME_KEY })}</dd>
        <dt>{t('privacy.storage.offline')}</dt>
        <dd>{t('privacy.storage.offline.means')}</dd>
      </dl>
      <p>{t('privacy.storage.clearing')}</p>
    </section>

    <section>
      <h2>{t('privacy.rights.title')}</h2>
      <p>{t('privacy.rights.none')}</p>
      <p>{t('privacy.rights.exercise')}</p>
    </section>

    <section>
      <h2>{t('privacy.licence.title')}</h2>
      <p>
        {t('privacy.licence.body')}
        <a href={SOURCE_URL} {...EXTERNAL}>{t('privacy.licence.source')}</a>
      </p>
    </section>
  </div>
</article>

<style>
  /*
   * Two columns wide and no wider. 24rem a column and 1.6rem between them are
   * the numbers `NoteLeads` and `WrittenNotes` use, so this page keeps the
   * site's measure — about fifty characters — and 50rem is the width at which
   * exactly two of them fit. Given the whole shell the columns would simply
   * grow: `column-width` is a minimum, not a cap, and two tracks of 35rem are
   * two lines nobody can follow to the end.
   */
  article { max-width: 50rem; }
  h1 { margin-bottom: 1.4rem; font-size: 1.25rem; font-weight: 500; }

  /*
   * The flow, and the hairline in its gutter.
   *
   * A rule down the full height here, where `NoteLeads` refuses one and
   * `WrittenNotes` refuses one. Both are grids: a reader stays inside a track
   * and the white between two tracks is already a boundary. This is a flow,
   * and a flow crosses the gutter — a sentence broken at the foot of the left
   * column continues at the head of the right one, and the mark is what says
   * so at a glance. `--rule` and not `--edge`: it divides two columns of a
   * page and is not the boundary of anything a reader clicks into.
   *
   * It collapses to one column by itself, at the same width every other pair
   * on this site collapses at, which is why a phone needs no rule saying so.
   */
  .columns {
    column-width: 24rem;
    column-gap: 1.6rem;
    column-rule: 1px solid var(--rule);
  }

  /*
   * The two the page opens on stay the size they were — the note's own claim,
   * and what it comes to — and everything under them is set a step below, at
   * the size this stylesheet already spends on prose that is not the point of
   * its page. In a flow that reads as a document opening on its recital, which
   * is what the two paragraphs are.
   */
  .lead { font-size: 1rem; }
  section { font-size: 0.9rem; }

  h2 { margin: 2.4rem 0 0.8rem; font-size: 1.05rem; font-weight: 500; }
  /*
   * The third level is the same size as the page's prose and quieter, not
   * smaller. Below `h2` there is nowhere left to go before the type is
   * smaller than the text under it, which would put the heading below what it
   * heads.
   */
  h3 { margin: 1.8rem 0 0.6rem; font-size: 1rem; font-weight: 500; color: var(--faint); }

  p { margin: 1rem 0; }

  /*
   * A labelled point: the term on its own line, its answer indented under it.
   * The indent is what makes the pair readable at a glance without a bullet —
   * a `<dl>` has no marker of its own, and the alignment is the marker.
   */
  dl { margin: 1rem 0; }
  dt { font-weight: 500; }
  dd { margin: 0.3rem 0 1rem 1.2rem; }

  ul { margin: 1rem 0; padding-left: 1.2rem; }
  li { margin: 0 0 0.8rem; }

  /*
   * Where the flow may not break. A section may — that is what lets the two
   * columns come out the same height — but nothing may be cut from the thing
   * it introduces: a heading stranded at the foot of a column heads the white
   * under it, and a term parted from its definition is a label for whatever
   * the next column starts with. The head and foot rules are the same
   * arithmetic said the other way, for the breaks a browser chooses inside a
   * paragraph.
   */
  h2, h3, dt { break-after: avoid; }
  dd, li { break-inside: avoid; }
  p { orphans: 2; widows: 2; }

  /*
   * A heading that lands at the head of a column keeps the space it was given
   * above it, which on a sheet or in the right-hand column reads as a gap
   * nobody asked for. Its own band is the one below it, and that is kept.
   */
  h2:first-child, h3:first-child { margin-top: 0; }

  /*
   * And the head of the flow itself. A column that begins mid-document begins
   * flush, because a break carries no margin across it; the first column
   * begins on whatever the first element brought with it, and the two would
   * then start a line apart from each other. The heading above has already
   * said how far the text sits below it.
   */
  .columns > :first-child { margin-top: 0; }

  @media print {
    h3 { color: var(--ink); }
  }
</style>
