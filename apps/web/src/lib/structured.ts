import type { MessageKey, Translator } from '@shipan/i18n';
import { AUTHOR } from './author';
import { SITE, type PageMeta } from './meta';
import { NOTE_PAGES, READINGS, REFUSALS } from './notes';
import { REFERENCES } from './references';

/**
 * What a page says it is to something reading it without a reader.
 *
 * **Three things read this and none of them is a person.** A search engine
 * deciding what kind of thing a page is, a model handed the page as a source,
 * and anything else that would otherwise have to infer all of it from the
 * prose. What they get is the same facts the head already carries — the
 * title, the description, the language, the address — declared rather than
 * parsed, plus the two this site knows and the markup cannot say: that a page
 * of the notes is a piece of technical documentation, and what it was checked
 * on.
 *
 * **It is here and not in `PageHead` because it is a subject and not a
 * fragment of markup.** The head prints it; what goes into it is decided by
 * which registries a page is in, and that is a rule with a test rather than
 * an expression inside a template. `PageHead` gained the whole of this as an
 * inline `$derived.by` and it was already the longest thing in the file.
 *
 * **The author is named, and named where a reader sees it too.** `author.ts`
 * holds the handle and the footer prints it: a byline that exists only in the
 * markup answers the question to a crawler and not to the person who asked
 * it. `publisher` stays empty, and that is the same rule from the other side
 * — a publisher is an organisation, there is none, and filling the field
 * would be inventing one to satisfy a validator.
 *
 * What is claimed beyond the name is what can be checked: a licence, that it
 * is free to read, and for the sources page the nine programs the register
 * was run against.
 */

/** The address of the AGPL, which is the licence every page of this is under. */
const LICENCE = 'https://www.gnu.org/licenses/agpl-3.0.html';

/**
 * A `Person` and not an `Organization`, a handle being what somebody signs
 * with rather than what a body is called. Built once: the same node stands
 * under the site and under each of its documents, which is true.
 */
const BY = { '@type': 'Person', name: AUTHOR } as const;

/** A step of the trail, as `meta.ts` builds it. */
export interface Step {
  readonly meta: PageMeta;
  readonly tail: string;
}

interface Built {
  readonly t: Translator;
  readonly meta: PageMeta;
  /** The canonical, absolute. */
  readonly here: string;
  readonly origin: string;
  readonly trail: readonly Step[];
  /** What each step of the trail is called in a row of crumbs. */
  readonly crumb: (tail: string) => MessageKey | undefined;
}

/**
 * The day a written page was last held against the engine.
 *
 * Read off the same registry the page prints it from, so the date a machine is
 * given and the date a reader sees cannot differ. The most recent wins: a
 * page is as fresh as its freshest paragraph, which is the weaker of the two
 * claims available and the true one.
 *
 * A derived page gets none, and that is the point of the distinction rather
 * than a gap in it — `notes/instruments` is a function of what the engine
 * declares, so a date on it would be a claim about prose that nobody keeps.
 */
function checkedOn(tail: string): string | undefined {
  const entries = tail === 'notes/refusals' ? REFUSALS : tail === 'notes/readings' ? READINGS : [];
  const dates = entries.map((entry) => entry.checked).sort();
  return dates.at(-1);
}

/** Whether an address is one of the pages of the notes. */
const isNote = (tail: string): boolean =>
  NOTE_PAGES.some((note) => `notes${note.slug ? `/${note.slug}` : ''}` === tail);

/**
 * The nodes a page declares, in the order a reader of the graph meets them.
 *
 * An array rather than one object: a page of the notes is *both* a step in a
 * trail and a document, and the two are separate nodes of the same graph.
 * They used to be alternatives — the root of a language declared the site,
 * everything else declared its breadcrumbs — which meant the pages carrying
 * the most content were the ones saying least about what they were.
 */
export function structuredFor({ t, meta, here, origin, trail, crumb }: Built): object[] {
  if (trail.length < 2) {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE,
        author: BY,
        url: here,
        description: t(meta.description),
        inLanguage: t.locale,
        license: LICENCE,
        isAccessibleForFree: true,
      },
    ];
  }

  const nodes: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((step, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        // The root of a language is the site itself, and it is the one step
        // of a trail with no page name at all. The rest are called what the
        // nav and the notes call them: a crumb stands in a row of crumbs,
        // where a title would read as a headline with an arrow after it.
        name: step.tail ? t(crumb(step.tail) ?? step.meta.title) : SITE,
        item: new URL(`/${t.locale}${step.tail ? `/${step.tail}` : ''}`, origin).href,
      })),
    },
  ];

  const tail = trail.at(-1)?.tail ?? '';
  if (!isNote(tail)) return nodes;

  const checked = checkedOn(tail);
  nodes.push({
    '@context': 'https://schema.org',
    // **`TechArticle` and not `Article`.** What these pages are is the
    // documentation of an instrument — what it computes, what each number
    // stands on, what it refuses and what a prompt commissions — and the
    // narrower type is the one that says so. An `Article` is what a site
    // publishing readings would declare, which is the thing this is not.
    '@type': 'TechArticle',
    headline: t(meta.title),
    author: BY,
    description: t(meta.description),
    inLanguage: t.locale,
    mainEntityOfPage: here,
    url: here,
    license: LICENCE,
    isAccessibleForFree: true,
    ...(checked ? { dateModified: checked } : {}),
    // Only where the page is about them. `citation` on the register is the
    // same claim the page makes in prose and in nine anchors, said a third
    // way for something that reads neither.
    ...(tail === 'notes/sources'
      ? { citation: REFERENCES.map((reference) => reference.where) }
      : {}),
  });

  return nodes;
}
