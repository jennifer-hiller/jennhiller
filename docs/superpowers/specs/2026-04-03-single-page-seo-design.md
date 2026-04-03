# Single-Page Portfolio SEO Design

**Date:** 2026-04-03

**Goal**

Improve the existing Jekyll single-page portfolio so the homepage is technically and semantically optimized for the localized service phrase `Web Developer in Los Angeles`, with the primary conversion focused on contact form submissions.

## Current Project Context

The current repo already contains the source for a Jekyll-based single-page portfolio:

- `index.html` assembles the homepage from section includes
- `_layouts/default.html` renders the document shell and a minimal SEO baseline
- `_data/site.yml` stores core site content and contact details
- `public/` contains favicon and manifest assets, but also still contains a Firebase placeholder `public/index.html`

The main gaps are not structural complexity. They are SEO completeness and deployment consistency:

- the homepage metadata is minimal and not localized to the target phrase
- there is no canonical URL strategy
- social metadata is incomplete
- there is no structured data describing the owner and service offering
- there is no clear crawl/indexing support such as `robots.txt` and sitemap configuration
- the built/deployed output appears out of sync with the actual Jekyll source because `public/index.html` is not the portfolio page

This makes the work a focused SEO and publishing pass, not a content model or routing rewrite.

## Recommended Approach

Strengthen the existing single-page Jekyll site as the source of truth and add a full baseline SEO layer to that source, then rebuild the deploy output so `public/` reflects the actual homepage.

This approach keeps the architecture intact, avoids unnecessary page sprawl, and puts all SEO logic where it belongs: in layout templates, configuration, and homepage content.

## Alternatives Considered

### 1. Enhance the existing single-page Jekyll site

This is the recommended option. It fits the user goal, keeps maintenance simple, and adds the missing SEO layers without changing the site model.

### 2. Expand the single page with heavier SEO content blocks

This could add more ranking surface through longer copy, FAQ sections, and more local detail. It may help later, but it is not required for the first pass and risks making the portfolio feel more like a landing page than a portfolio.

### 3. Patch the built output only

This would be fragile because the repo source is the Jekyll site, not the generated `public/index.html` that currently contains Firebase placeholder content. Any direct output-only changes would drift immediately.

## Target SEO Architecture

### Page targeting

The site remains a single-page portfolio with one canonical SEO target:

- `/` is the only indexed page target in this pass
- the primary keyword theme is `Web Developer in Los Angeles`
- the conversion target is the contact form section

Secondary themes can be supported naturally in copy, such as portfolio work, responsive websites, and frontend/web development services, but the page should not dilute its primary target.

### Metadata system

The default layout should become the central source for homepage metadata and social previews. It should render:

- localized `<title>`
- localized meta description
- canonical URL
- Open Graph title, description, URL, type, and image
- Twitter card metadata
- theme/favicons/manifest tags already present

Metadata should pull from page front matter and site configuration so the homepage remains editable without duplicating head tags in the page itself.

### Structured data

The homepage should include JSON-LD that describes both the person and the offered service. The exact type can be finalized during implementation based on what fits the content most honestly, but the schema should cover:

- name
- role/service context as a web developer
- Los Angeles locality
- website URL
- sameAs links for existing social profiles
- contact point or email where appropriate

The schema should support local-service relevance without exaggerating business details that are not actually present on the page.

### Crawl and index support

The site should expose the standard crawl/indexing files expected for a production homepage:

- `robots.txt`
- sitemap generation or a static sitemap for the single page

These files should point crawlers to the real public homepage and avoid the current ambiguity caused by the placeholder `public/index.html`.

### On-page SEO

The content structure should reinforce the target phrase and conversion path:

- one clear H1 aligned to the local service phrase
- supporting hero/body copy that mentions Los Angeles naturally
- contact section copy that reinforces inquiry intent
- semantic section structure with stable IDs for in-page navigation

This should be done with measured editorial changes. The page should still read like a professional portfolio, not a keyword-stuffed local landing page.

## Content And Data Design

### Source of truth

Site-wide SEO values should live in configuration or `_data/site.yml`, depending on how reusable they are:

- site title / brand
- site description
- production URL
- default social image
- locality
- social profile URLs

Homepage-specific overrides can remain in `index.html` front matter if needed.

### Contact relevance

Because the primary conversion is contact form submissions, the contact section should become more explicit about the desired action:

- invite project inquiries
- connect the service offering to the form
- avoid placeholder contact details where they would weaken credibility

If current placeholder fields are still present, implementation should either replace them with real values already available in repo data or avoid over-exposing obviously fake details.

## Deployment Consistency

The repo currently has a mismatch between the Jekyll source homepage and `public/index.html`.

The implementation should resolve this by making the generated/deployed output consistent with the Jekyll source. The exact mechanics depend on the existing build/deploy workflow, but the final state should be:

- the portfolio homepage is what gets served from `public/`
- the Firebase placeholder page no longer represents the deploy output

This is not just a polish issue. If the wrong HTML is deployed, the SEO work does not exist from a crawler’s perspective.

## File Boundaries

Expected file responsibilities after the SEO pass:

- `index.html`: homepage front matter and top-level assembly
- `_layouts/default.html`: canonical metadata, social tags, and JSON-LD output
- `_data/site.yml`: reusable site identity, locality, social, and contact values
- `_config.yml`: site URL, plugin/config support for sitemap or other SEO-related generation
- `robots.txt` or equivalent template file: crawler directives
- `public/`: generated deploy output and existing static favicon assets

## Implementation Strategy

Implementation should proceed in this order:

1. Confirm the production URL and current deploy behavior
2. Move reusable SEO values into config/data
3. Upgrade the layout head tags and add canonical/social metadata
4. Add JSON-LD for person/service identity
5. Add crawl/index support with robots and sitemap
6. Tighten homepage copy for the target phrase and contact conversion
7. Rebuild the site so `public/` reflects the Jekyll homepage
8. Verify generated HTML contains the expected metadata and crawl assets

This order limits risk by establishing source values first, then rendering metadata, then syncing deploy output last.

## Risks And Constraints

Primary risks:

- over-optimizing the copy could make the portfolio feel unnatural
- schema may become misleading if it claims business details not supported by the page
- the deploy workflow may still serve the wrong output if `public/` is not regenerated correctly
- placeholder contact data may undermine trust if left visible

Mitigations:

- keep the keyword targeting focused and natural
- only emit truthful structured data
- verify the generated `public/index.html` directly after the build
- prefer real contact/form paths already in the repo over placeholders

## Testing Strategy

The SEO pass needs explicit verification rather than assumption:

- build the Jekyll site successfully
- inspect generated homepage HTML for title, description, canonical, Open Graph, Twitter, and JSON-LD tags
- confirm `robots.txt` and sitemap exist in the build output
- confirm the rendered homepage still works as a single-page portfolio
- confirm the contact section remains usable and visually intact
- confirm `public/index.html` is no longer the Firebase placeholder

## Success Criteria

The SEO pass is complete when:

- the homepage is optimized around `Web Developer in Los Angeles`
- the page exposes complete baseline metadata for search and social sharing
- JSON-LD accurately describes the page owner and service context
- crawl/index support files exist and point to the correct site URL
- the contact form remains the primary conversion path
- the generated deploy output matches the Jekyll source instead of the Firebase placeholder page
