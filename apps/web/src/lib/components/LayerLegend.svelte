<!--
  What stands where in a palace — on paper.

  The drawing says which layer a name belongs to by where it stands and in no
  other way: colour is the phase's, and the word under a name glosses the name
  and not its kind. On screen a pointer resting on a name is told which it is
  (`InlineBoard`). A sheet has no pointer, so there the same six words are
  printed once, as a palace drawn empty with its six places named: the
  arrangement is the same in all nine, and saying it once is enough.

  On paper only, and that is the whole reason it exists. Nothing on it ranks:
  the six are set alike, because a gate in bold reads as the thing that
  matters most.

  It takes `t` and nothing else. A day board lays its palace out otherwise and
  is not given this.
-->
<script lang="ts">
  import { REGISTERS } from '$lib/board';
  import type { MessageKey, Translator } from '@shipan/i18n';

  let { t }: { t: Translator } = $props();
</script>

<figure class="legend">
  <figcaption>{t('form.layerLegend')}</figcaption>
  <!-- A list in reading order, laid out as the palace is. -->
  <ul>
    {#each REGISTERS as register (register)}
      <li style:grid-area={register}>{t(`label.register.${register}` as MessageKey)}</li>
    {/each}
  </ul>
</figure>

<style>
  .legend { display: none; }

  @media print {
    .legend {
      font-size: 0.8rem;
      color: var(--faint);
      margin: 0.6rem auto 0;
      display: grid;
      justify-items: center;
      gap: 0.3rem;
      break-inside: avoid;
      break-before: avoid;
    }
    figcaption { margin: 0; }
    /* The palace in miniature: two columns of three, as on the board. */
    ul {
      list-style: none;
      padding: 0.4rem 0.8rem;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-areas:
        'heaven spirit'
        'earth  star'
        'palace gate';
      gap: 0.2rem 1.6rem;
      border: 1px solid var(--rule);
    }
    li { text-align: center; }
  }
</style>
