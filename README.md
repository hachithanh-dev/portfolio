# Hà Chí Thanh — Portfolio

> Backend Engineer · Java 21 & Spring Boot · PostgreSQL analytics · AI systems

Personal portfolio built with Next.js 16. It presents a production case study (an e-commerce analytics
backend, client under NDA), personal AI/backend projects, skills and experience.

## Tech stack

- **Framework**: Next.js 16 (App Router, static export of `/`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion, CSS keyframes, Canvas 2D
- **Smooth scroll**: Lenis
- **Icons**: lucide-react, react-icons (Simple Icons)

## Interaction & motion

- Interactive particle network in the hero (canvas, links to the cursor, pauses off-screen)
- Letter-by-letter name reveal, rotating role line, live-typing Java code window with 3D tilt
- Magnetic call-to-action buttons and a custom spring cursor
- Cursor-tracked glowing borders and an orbiting "border beam" on featured cards
- Animated data-flow architecture diagram for the case study
- Scroll progress bar, scroll-linked timeline, count-up statistics, logo marquees
- `prefers-reduced-motion` respected: particles, marquees, typing and beams fall back to static

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
  app/                 layout, global styles
  components/
    hero/              ParticleNetwork, TerminalCard
    projects/          CaseStudy
    ui/                GlowCard, Magnetic, SectionHeading
    *Section.tsx       page sections
  lib/cn.ts            className helper
```

## License

MIT
