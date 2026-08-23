import type { Locale, MessageKey } from '@shipan/i18n';
import { SECTIONS } from './navigation';
import { NOTE_PAGES } from './notes';

/**
 * What each page says it is — to a reader who has not arrived yet, and to the
 * search result that is deciding whether to send them.
 *
 * **This is a third thing about the pages, and it is not the other two.**
 * `navigation.ts` says where a section is and what to call it in a bar eight
 * items wide; `indexable.ts` says whether an address may be indexed at all.
 * Neither of them can hold a sentence: a nav label is two words by
 * construction, and a rule about crawling has no language. What is here is the
 * prose a page is met by — a title, a description, and the two paragraphs that
 * open the section — which is a subject of its own and gets a file of its own.
 *
 * **It is written and not derived, and that is the exception `docs/notes.md`
 * allows rather than a hole in the rule.** What must never be written is what
 * *changes when a board lands* — the list of boards, the parameters, the
 * counts, the spans: all of that is declared by the engine and a page that
 * says it should read it. A description of what 六壬 is for, addressed to
 * somebody who has never heard of it, is not derivable from any descriptor
 * because it is not a fact about the computation. It is the other half:
 * writing that does not move when a board lands, kept short for exactly the
 * reason that half is always kept short — every line here doubles with every
 * vernacular. See `docs/i18n.md` § "Who is reading".
 *
 * **What keeps it from drifting is that it is held to the addresses.**
 * `test/meta.test.ts` asserts an entry for every page `indexable.ts` allows
 * and no entry for anything else, so a section that lands in the nav without
 * a description fails a test rather than shipping a page a search engine has
 * to guess the purpose of.
 */

/**
 * The site's name, appended to every title, and a name does not translate.
 *
 * The three-part shape — `shipan`, 式盤, shìpán — is how every named thing
 * here travels, and this is the second place it arrives cut. The manifest
 * gives the reasoning for the first: in a launcher, `shipan` and `shìpán` are
 * the same word twice and the glyph is already on the icon. A search result
 * is the same situation and resolves the other way round, because the two
 * halves that survive are not the same ones. The reading is what goes: a title
 * has about sixty characters before it is cut for the reader, `shìpán` spends
 * six of them saying `shipan` again, and 式盤 spends two being the one form
 * somebody searching for this project in Chinese would type.
 */
export const SITE = 'shipan 式盤';

/**
 * The separator between a page's title and the site's.
 *
 * A middle dot rather than an em dash or a pipe: the em dash is already at
 * work inside several of the titles themselves, where it joins a name to its
 * gloss, and a title with two of them reads as one long phrase instead of a
 * page and the site it is on. The footer separates its links with the same
 * mark.
 */
export const TITLE_SEPARATOR = ' · ';

export interface PageMeta {
  /**
   * The title, without the site's name — that is appended by `PageHead`, so
   * that no catalog holds fourteen copies of it.
   *
   * Short on purpose. A search result cuts at about sixty characters and the
   * separator and the name take fourteen of them, so what is left is the
   * length of a heading rather than the length of a sentence.
   */
  readonly title: MessageKey;
  /**
   * The description a search engine may show under the title, and the one a
   * messaging application shows when somebody pastes the address.
   *
   * **It says what the page holds and stops there.** Every page of this site
   * has a `<meta>` version of the same problem the footer's disclaimer has:
   * a description that promised a reading would promise the one thing this
   * project refuses, in the single line most likely to be read by somebody
   * who never opens the page. See `docs/refusals.md`.
   */
  readonly description: MessageKey;
  /**
   * The two paragraphs that open a section, set in two columns above the form.
   *
   * **Two and not one, because they answer two different questions**, and
   * that is the shape rather than a length: the first says what the art is
   * and what the board is made of, the second says what this section wants
   * from the reader and what it will not do with it. A reader who has never
   * met 六壬 needs the first; a reader who came expecting an answer needs the
   * second, and needs it before they type rather than after.
   *
   * Absent on the notes and on the privacy note, which are read rather than
   * operated: those pages carry a visible `h1` and their own opening line,
   * and a second introduction over a page that is already prose would be a
   * preface to a preface.
   */
  readonly intro?: readonly [MessageKey, MessageKey];
}

/**
 * Every page, by the address it sits at under a language.
 *
 * The empty key is the consultation, which is the root of a vernacular — the
 * one section of this site whose answer is not in its address, and so the one
 * whose address is the language itself.
 */
export const PAGES: Readonly<Record<string, PageMeta>> = {
  '': {
    title: 'meta.title.consult',
    description: 'meta.description.consult',
    intro: ['meta.intro.consult.a', 'meta.intro.consult.b'],
  },
  moments: {
    title: 'meta.title.moments',
    description: 'meta.description.moments',
    intro: ['meta.intro.moments.a', 'meta.intro.moments.b'],
  },
  qimen: {
    title: 'meta.title.qimen',
    description: 'meta.description.qimen',
    intro: ['meta.intro.qimen.a', 'meta.intro.qimen.b'],
  },
  liuren: {
    title: 'meta.title.liuren',
    description: 'meta.description.liuren',
    intro: ['meta.intro.liuren.a', 'meta.intro.liuren.b'],
  },
  taiyi: {
    title: 'meta.title.taiyi',
    description: 'meta.description.taiyi',
    intro: ['meta.intro.taiyi.a', 'meta.intro.taiyi.b'],
  },
  qizheng: {
    title: 'meta.title.qizheng',
    description: 'meta.description.qizheng',
    intro: ['meta.intro.qizheng.a', 'meta.intro.qizheng.b'],
  },
  ziwei: {
    title: 'meta.title.ziwei',
    description: 'meta.description.ziwei',
    intro: ['meta.intro.ziwei.a', 'meta.intro.ziwei.b'],
  },
  bazi: {
    title: 'meta.title.bazi',
    description: 'meta.description.bazi',
    intro: ['meta.intro.bazi.a', 'meta.intro.bazi.b'],
  },
  notes: { title: 'meta.title.notes', description: 'meta.description.notes' },
  'notes/instruments': {
    title: 'meta.title.notes.instruments',
    description: 'meta.description.notes.instruments',
  },
  'notes/sources': {
    title: 'meta.title.notes.sources',
    description: 'meta.description.notes.sources',
  },
  'notes/refusals': {
    title: 'meta.title.notes.refusals',
    description: 'meta.description.notes.refusals',
  },
  'notes/readings': {
    title: 'meta.title.notes.readings',
    description: 'meta.description.notes.readings',
  },
  privacy: { title: 'meta.title.privacy', description: 'meta.description.privacy' },
};

/**
 * The image a link to this site is shown as, and the size every consumer of
 * one agrees on.
 *
 * One card for the whole site, in every language and on every page. A card
 * per section would be six more files to keep in step with six sections, and
 * a card per vernacular would put a sentence outside the catalogs — see
 * `design/logo/make-card.ts`, which cuts it, and argues both.
 */
export const CARD = { src: '/og.png', width: 1200, height: 630 } as const;

/**
 * The vernaculars as Open Graph spells them, which is not how anything else
 * here spells them.
 *
 * `og:locale` wants `language_TERRITORY` and will not read a bare `it`. This
 * project has no regional variants and does not want any — `parseLocale`
 * reads `it-CH` as Italian and is right to — so the territory here is a
 * formality that has to be supplied and means nothing.
 *
 * Written as a table and not as `` `${locale}_${locale.toUpperCase()}` ``,
 * which is the tempting line: it happens to be right for Italian and gives
 * `en_EN`, which is not a territory. Typed by `Locale`, so a third vernacular
 * is a compilation error here rather than a wrong tag nobody sees.
 */
export const OG_LOCALES: Readonly<Record<Locale, string>> = { en: 'en_US', it: 'it_IT' };

/**
 * The pages between the root of a language and this one, this one included.
 *
 * What a breadcrumb is for, and this site has exactly one place that is more
 * than one deep: the notes, which are five pages under a section of their
 * own. Everything else is a section directly under a language, and a trail of
 * one is not a trail — `PageHead` says so by declaring the site instead.
 *
 * Built by walking the address rather than from a `parent` field, because the
 * address is already the hierarchy: `notes/sources` is under `notes` because
 * of where it is, and a field saying so again would be a second copy of that
 * fact, free to disagree with the first.
 */
export function trailOf(pathname: string): { meta: PageMeta; tail: string }[] {
  const [, , ...rest] = pathname.replace(/\/$/, '').split('/');

  const trail: { meta: PageMeta; tail: string }[] = [];
  for (let depth = 0; depth <= rest.length; depth += 1) {
    const tail = rest.slice(0, depth).join('/');
    const meta = PAGES[tail];
    if (meta) trail.push({ meta, tail });
  }
  return trail;
}

/**
 * What a step of a trail is called, which is not what the page is called.
 *
 * A title is written to stand alone in a search result and says what the page
 * is *for* — `Sources — what every number stands on`. A crumb stands in a row
 * of crumbs, where the row is the sentence and each word of it is one step:
 * `shipan 式盤 › Notes › Where the numbers come from`. Set from the titles the
 * trail would read as three headlines with arrows between them.
 *
 * **Derived, and from the registries that already hold a short name.** The
 * nav has to call a section something in eight characters, and the notes have
 * a heading over each page; both are exactly the register a crumb wants, and
 * neither is a string this file has to add. A `crumb` field here would have
 * been fourteen more messages in every vernacular saying what two registries
 * already say.
 */
export function crumbOf(tail: string): MessageKey | undefined {
  const section = SECTIONS.find((entry) => entry.slug === tail);
  if (section) return section.label;

  if (tail === 'notes' || tail.startsWith('notes/')) {
    const slug = tail === 'notes' ? '' : tail.slice('notes/'.length);
    return NOTE_PAGES.find((entry) => entry.slug === slug)?.title;
  }

  return PAGES[tail]?.title;
}

/**
 * What a page says about itself, found by the address it is at.
 *
 * The language is cut off the front and the rest is the key, so nothing here
 * has to know how many vernaculars there are. An address with no entry — a
 * chart carrying a question, a mistyped path — gets `undefined` and a head
 * with nothing in it but a refusal to be indexed, which is the right answer
 * for both.
 */
export function metaOf(pathname: string): PageMeta | undefined {
  const [, , ...rest] = pathname.replace(/\/$/, '').split('/');
  return PAGES[rest.join('/')];
}
