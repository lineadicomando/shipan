<!--
  A question with two or three answers, and the one in force among them.

  **One component, because a choice is asked the same way wherever it stands.**
  A school's divergence under the options, the sex a run of decades reads —
  they are the same object to whoever is answering, and they were three
  different controls in four files. `$lib/parameters` says which choices there
  are; this is the only thing that turns one into elements.

  **Radios and not a list to drop down.** What a value says here runs to a
  clause of doctrine with a book's title in it, and a `select` shows one at a
  time cut at the width of the control: the reader was choosing between two
  sentences of which forty characters were visible. Set out, all of them are
  readable before anything is moved, and the one in force is readable without
  opening a menu. The instrument chooser on `/[lang]` is the same move argued
  at length, and cards are what six of them wanted; two or three stay plain.

  **The question is the `legend` and the values finish it.** «The ju is
  determined» + «by thirds of the term» is one sentence cut in two, and a
  `legend` is what a screen reader says before every radio under it, so it
  arrives whole either way. A `fieldset` is also what carries `disabled` to
  the whole group at once, which is what a birth nobody has typed yet needs.

  **It takes finished prose and not keys**, for the reason `Named` does: the
  caller has the translator and frequently a parameter to interpolate.
-->
<script lang="ts">
  import Named from './Named.svelte';

  let {
    ask,
    values,
    chosen,
    onchoose,
    note = undefined,
    disabled = false,
  }: {
    /** The question, said in the reader's language. */
    ask: string;
    /** What may be answered: the value that travels, and what it says. */
    values: readonly { value: string; said: string }[];
    /** Which of them is in force. */
    chosen: string;
    /** Called with the value chosen. The caller owns where it is written. */
    onchoose: (value: string) => void;
    /** What standing on the value in force does, where there is anything. */
    note?: string | undefined;
    /** The whole group at once — a field that has nothing to answer about. */
    disabled?: boolean;
  } = $props();

  /**
   * Unique within the page, which is what parts one group of radios from the
   * next: two of these stand on every form and a shared `name` would make
   * them one choice.
   */
  const uid = $props.id();

  /**
   * A line where the answers are words, a column where they are sentences.
   *
   * Read off the values rather than set by the caller, so nothing has to
   * remember which kind a question is: «male» and «not given» sit side by side
   * the way a reader scans three words, and «at the hour of the Rat 子時
   * zǐshí, 23:00» does not fit beside its neighbour at any width worth having.
   * The bound is where a value stops being a word and starts being a clause.
   */
  const inline = $derived(values.every((one) => one.said.length <= 24));
</script>

<fieldset class="choice" {disabled}>
  <legend class="asks"><Named text={ask} /></legend>
  <div class="choices" class:inline>
    {#each values as one (one.value)}
      <label class="check">
        <input
          type="radio"
          name={uid}
          value={one.value}
          checked={chosen === one.value}
          onchange={() => onchoose(one.value)}
          aria-describedby={note ? `${uid}-note` : undefined}
        />
        <!-- A span, because a sentence with a name in it is several elements
             once each half is set in the face its script asks for, and the
             flex box around this would lay every one of them out as a column
             of its own. That is the bug this component was written over. -->
        <span><Named text={one.said} /></span>
      </label>
    {/each}
  </div>
  <!-- Tied to the radios rather than left standing beside them: it is about
       the value in force, and it is read out with it. -->
  {#if note}
    <p class="note" id="{uid}-note"><Named text={note} /></p>
  {/if}
</fieldset>

<style>
  /*
   * Bounded at a measure a sentence can be read at: these run to a clause of
   * doctrine and a book's title, and every panel they stand in is wider than
   * any of them wants.
   */
  .choice { border: 0; margin: 0; padding: 0; min-inline-size: 0; max-width: 38rem; }
  /* The question, set like the label it replaced and not like the name of a
     group: it is one line inside a group that already has a name. */
  .asks {
    padding: 0 0 0.3rem;
    font-size: 0.9em;
    font-weight: normal;
    color: var(--faint);
  }
  .choices { display: grid; gap: 0.35rem; }
  /* Wrapping, not a row that runs off: three words fit on a phone and four
     would not, and the answers are what the reader is scanning. */
  .inline { display: flex; flex-wrap: wrap; gap: 0.35rem 1.1rem; }
  /*
   * A control and the words beside it, on one line where they fit and wrapped
   * under themselves where they do not.
   *
   * `start` rather than `center`, which is what an answer of three lines asks
   * for: centred against a paragraph the radio floats to the middle of it and
   * stops reading as the mark of the line it opens. The nudge under it is the
   * difference between the top of a box and the top of a lowercase letter
   * beside it.
   */
  .check {
    display: flex;
    gap: 0.45rem;
    align-items: start;
    font-size: 0.9em;
    color: var(--ink);
  }
  .check input { margin-block-start: 0.2em; }
  /* Under the values it belongs to and indented past the radios: a paragraph
     starting where the answers start reads as another answer. */
  .note {
    margin: 0.35rem 0 0 1.4rem;
    color: var(--faint);
    font-size: 0.8em;
    max-width: 42rem;
  }
  /* Nothing to answer about yet. The words stay legible — they say what the
     field will ask once there is something to ask it of. */
  .choice:disabled .check { color: var(--faint); }
</style>
