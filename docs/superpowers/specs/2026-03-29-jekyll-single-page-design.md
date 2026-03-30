# Jekyll Single-Page Portfolio Migration Design

**Date:** 2026-03-29

**Goal**

Convert the current Vite/React single-page portfolio into a single-page Jekyll site that preserves the existing visual design and section flow as closely as practical, while replacing React with native Jekyll templates, Sass, and a small vanilla JavaScript layer.

## Current Project Context

The current site is a one-page portfolio assembled from React components:

- `src/app/App.tsx` composes `Header`, `Hero`, `About`, `Skills`, `Projects`, `Contact`, and `Footer`
- navigation is anchor-based and scrolls to in-page sections
- the mobile menu state is managed in React
- the contact form is demo-only and does not submit anywhere
- most UI behavior is lightweight and does not require a frontend framework
- the dependency graph is much larger than the actual site needs

This makes the site a good fit for a native Jekyll rebuild rather than a hybrid framework setup.

## Recommended Approach

Rebuild the site as a native Jekyll single-page site with:

- one main page at `index.html`
- one layout in `_layouts/default.html`
- one include per visible section in `_includes/`
- structured site content in `_data/`
- Sass in `assets/css/main.scss`
- light client-side behavior in `assets/js/site.js`

This keeps the final site aligned with Jekyll conventions, makes the content editable without touching template markup, and removes the React runtime entirely.

## Alternatives Considered

### 1. Native Jekyll rebuild with Sass and light JavaScript

This is the recommended option. It produces a maintainable Jekyll site with clear separation between layout, content, styles, and behavior.

### 2. Partial port that keeps generated React-style markup

This would be faster in the short term but would preserve implementation noise from the old stack and make the Jekyll version harder to maintain.

### 3. Static build handoff from Vite into Jekyll

This would be the lowest-effort migration but would leave the old app as the real source of truth. That would defeat the point of moving to Jekyll.

## Target Architecture

### Page structure

The site remains a single page with these sections, in order:

1. Header
2. Hero
3. About
4. Skills
5. Projects
6. Contact
7. Footer

The top-level `index.html` page should only orchestrate the section includes and front matter. The page itself should contain little to no repeated HTML.

### Templates

Use a `default` layout that contains:

- HTML document shell
- head metadata
- stylesheet and script references
- JSON-LD or other homepage metadata already needed by the current site
- a main content outlet

Use include files for each section:

- `_includes/header.html`
- `_includes/hero.html`
- `_includes/about.html`
- `_includes/skills.html`
- `_includes/projects.html`
- `_includes/contact.html`
- `_includes/footer.html`

### Content model

Move repeated content into `_data/` files so the page becomes editable as content instead of hard-coded markup.

Expected data files:

- `_data/site.yml` for brand name, subtitle, contact details, hero copy, and social links
- `_data/navigation.yml` for header links
- `_data/skills.yml` for skill groups or skill cards
- `_data/projects.yml` for featured projects

If an existing section’s content is simple enough, it can remain directly in an include. Repeated list-driven content should live in data files.

### Assets

Use a Jekyll-friendly asset pipeline:

- `assets/css/main.scss` as the main Sass entry
- optional Sass partials in `assets/css/partials/`
- `assets/js/site.js` for mobile navigation toggle, smooth-scroll enhancement, and any other lightweight interactions
- static icons, favicons, and manifest files under a Jekyll-served asset or public path

The visual system should preserve:

- section ordering and rhythm
- gradient treatments
- card styling
- responsive breakpoints
- mobile navigation behavior
- project card hover treatment where practical without React

## Design Translation Rules

### Preserve closely

- layout proportions
- copy hierarchy
- color palette and gradients
- section spacing
- button styles
- project card treatment
- responsive mobile/desktop navigation behavior

### Simplify where justified

- replace component-library abstractions with plain semantic HTML
- replace icon components with inline SVG, sprite usage, or a minimal icon strategy
- remove unused UI library code entirely
- keep the contact form static or mailto-based unless the user later requests real form handling

The goal is visual parity, not framework parity.

## Behavior Design

The current site has only a small amount of behavior:

- smooth scrolling to sections
- mobile menu open/close
- contact form demo interaction

In Jekyll:

- section links should work as plain anchor links without JavaScript
- JavaScript should progressively enhance scrolling and menu behavior
- the contact form should degrade cleanly if JavaScript is unavailable

Because the current form is demo-only, the initial Jekyll migration should not introduce backend form handling. It should either:

- remain a non-submitting demo with explicit placeholder behavior, or
- convert to a mailto/contact-details presentation if that is cleaner during implementation

The first option is safer for parity unless implementation friction suggests otherwise.

## File Boundaries

Planned file responsibilities:

- `index.html`: single-page assembly using front matter and includes
- `_layouts/default.html`: document shell and global metadata
- `_includes/*.html`: one concern per section
- `_data/*.yml`: editable structured content
- `assets/css/main.scss`: compile target for all styles
- `assets/js/site.js`: lightweight behavior only
- `_config.yml`: Jekyll configuration and plugin setup required for Sass/build
- `Gemfile`: Jekyll dependencies for local development and deployment

## Migration Strategy

Implementation should proceed in these phases:

1. Establish Jekyll scaffolding and build configuration
2. Create the default layout and single-page entrypoint
3. Port section markup into includes
4. Move repeated content into data files
5. Rebuild styles in Sass to match the current design
6. Recreate lightweight interactions in vanilla JavaScript
7. Verify the rendered page visually and functionally
8. Remove obsolete Vite/React application files once parity is confirmed

This order limits risk by getting the Jekyll skeleton rendering early, then layering in content, styling, and behavior.

## Error Handling And Risk Notes

Primary migration risks:

- CSS parity may drift if utility-class behavior is translated too loosely
- icons and minor visual details may differ if not deliberately preserved
- deleting old app files too early could remove source reference material before parity is reached
- the current repo already contains unrelated local changes, so migration work must avoid disturbing them

Mitigations:

- keep the old source files in place until the Jekyll page is fully verified
- port one section at a time, preserving IDs and anchor targets
- verify the mobile menu and responsive layout early
- isolate edits to new Jekyll paths first, then remove obsolete files only after confirmation

## Testing Strategy

The migration needs lightweight but explicit verification:

- run the Jekyll build locally without errors
- verify navigation anchors and mobile menu behavior
- verify the page renders correctly on desktop and mobile widths
- verify assets resolve correctly, including favicons and images
- verify the single-page structure remains intact after removing the React app

If automated tests are not practical, document the manual verification steps clearly in the implementation plan.

## Success Criteria

The migration is complete when:

- the repo builds and serves as a Jekyll site
- the homepage is a single-page portfolio with the same section flow as the current site
- the design is materially consistent with the current site
- content lists are editable through Jekyll data files where appropriate
- lightweight interactions work without React
- obsolete Vite/React code is removed or clearly retired from the default build path
