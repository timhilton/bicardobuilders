# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # local dev server (HTTPS via basicSsl plugin)
npm run build     # production build
npm run preview   # preview the production build locally
```

Set `STORYBLOK_TOKEN` in a `.env` file for CMS data. The site builds and runs without it — pages fall back to hardcoded placeholder content.

## Architecture

**SSR Astro site** deployed on Netlify (`output: 'server'`, `@astrojs/netlify` adapter). All pages are server-rendered on request (`prerender = false` is the default); there is no static pre-rendering.

### Layout hierarchy

```
Layout.astro          ← HTML shell: <head>, fonts, CSS custom properties, ClientRouter (view transitions), global image-reveal script
  └─ PageLayout.astro ← 12-column CSS grid wrapper; adds Navigation + Footer around a <slot />
       └─ page files  ← each page uses PageLayout and fills the slot
```

`src/pages/index.astro` uses `Layout.astro` directly (not `PageLayout`) because the home page has its own full-bleed layout via `home.astro`.

### Storyblok

`src/lib/storyblok.ts` exposes three helpers that call the Storyblok REST API directly (not the SDK client):

- `getStory(slug)` — fetches a single story; returns `null` on error or missing token
- `getStories(options)` — fetches multiple stories with optional query params
- `getStoriesStatic()` — fetches all `portfolio/` stories (used for the portfolio index)
- `sbImage(url, width?, quality?)` — appends Storyblok image transform params

`version` is `'draft'` in development and `'published'` in production.

**Storyblok config** (`astro.config.mjs`): region `eu`, `bridge: true`.

### Portfolio case studies (`src/pages/portfolio/[slug].astro`)

Each project story has a `body` array. The page finds the block with `component === 'project'` and renders its `images` array. Two image block types are supported:

- `photo_row_pair` — two images side by side; `layout[0] === '2-3'` controls which is wider
- `photo_row_feature` — one large image + a stacked pair; `layout[0] === 'feature-right'` reverses order

The page includes a client-side lightbox (keyboard nav, overlay dismiss, prev/next) initialized on `astro:page-load` to survive view transitions.

### CSS design tokens

All tokens are CSS custom properties defined in `Layout.astro`'s `:root` block. Key values:

| Token | Value |
|---|---|
| `--color-brand-primary` | `rgb(43, 94, 186)` |
| `--color-brand-secondary` | `rgb(72, 146, 190)` |
| `--color-text-primary` | `rgb(46, 46, 47)` |
| `--color-surface-background` | `rgb(245, 245, 247)` |

Global utility class `.btn-pill` (defined in `Layout.astro`) is the shared button style.

### Animations

- **View transitions**: `ClientRouter` from `astro:transitions` is active. The `page-heading` named transition animates `<h1>` elements across navigations.
- **Image reveal**: images (excluding `.nav-logo`, `.content__arrow`, `.hero__img`) start at `opacity: 0` and animate in via `IntersectionObserver`. The script in `Layout.astro` re-runs on every `astro:page-load` event. Images on `/` skip the animation entirely.
