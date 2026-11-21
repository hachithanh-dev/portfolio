# Hà Chí Thanh — Portfolio

> Backend Engineer · Java 21 & Spring Boot · PostgreSQL analytics · AI systems

Personal portfolio built with Next.js 16, in English and Vietnamese. It presents a production case study (an
e-commerce analytics backend, client under NDA), a technical article, personal AI/backend projects, skills and
experience.

## Pages

| English | Vietnamese | Content |
| --- | --- | --- |
| `/` | `/vi` | Home |
| `/work/command-center` | `/vi/work/command-center` | Case study: context, architecture, decisions and trade-offs |
| `/writing/load-limits-before-cache` | `/vi/writing/load-limits-before-cache` | Article: admission control, shared reads and caching |

Every page is prerendered, has `hreflang` alternates and its own Open Graph image.

## Tech stack

- **Framework**: Next.js 16 (App Router, all routes static)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion, CSS keyframes, Canvas 2D
- **Smooth scroll**: Lenis
- **Icons**: lucide-react, react-icons (Simple Icons)
- **Social images**: `next/og` (`opengraph-image.tsx` per route)

## Interaction & motion

- Interactive particle network in the hero (canvas, links to the cursor, pauses off-screen)
- Letter-by-letter name reveal, rotating role line, live-typing Java code window with 3D tilt
- Magnetic call-to-action buttons and a custom spring cursor
- Cursor-tracked glowing borders and an orbiting "border beam" on featured cards
- Animated data-flow architecture diagram for the case study
- Scroll progress bar, scroll-linked timeline, count-up statistics, logo marquees
- `prefers-reduced-motion` respected: particles, marquees, typing and beams fall back to static
- The hero introduction paragraph is visible from the first paint (it is the LCP element)

## Languages

English and Vietnamese use separate root layouts (`src/app/(en)` and `src/app/(vi)`), so each page ships the right
`<html lang>`. Components read the language from the URL (`useLang()` in `src/lib/use-lang.ts`); the EN/VI switch
keeps you on the same page. Fonts load the `vietnamese` subset.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL used for canonical links and Open Graph images (e.g. `https://hachithanh.dev`). On Vercel the production domain is used automatically when it is not set. |

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Structure

```text
src/
  app/
    (en)/              English root layout and routes
    (vi)/vi/           Vietnamese routes (root layout in (vi)/)
    globals.css        theme, motion utilities, article typography
  components/
    article/           ArticleLayout (sticky table of contents), prose blocks
    hero/              ParticleNetwork, TerminalCard
    projects/          CaseStudy card, PipelineDiagram
    ui/                GlowCard, Magnetic, SectionHeading, LangSwitch
    *Section.tsx       home page sections
  content/             case study and article pages, post metadata
  lib/                 i18n helpers, metadata, OG renderer, site constants
```

## License

MIT
