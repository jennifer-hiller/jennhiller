# Single-Page Portfolio SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full SEO baseline to the single-page Jekyll portfolio for `Web Developer in Los Angeles`, with contact form submissions as the primary conversion target, and ensure the built `public/` output reflects the real site.

**Architecture:** Keep the site as a single Jekyll homepage and strengthen the existing source of truth rather than adding routes. Store reusable SEO values in config/data, render metadata and JSON-LD from the default layout, add crawl files, then build the site into `public/` so deployment matches the source.

**Tech Stack:** Jekyll, Liquid, YAML data files, HTML metadata tags, JSON-LD, Ruby Bundler

---

### Task 1: Establish SEO Source Values

**Files:**
- Modify: `_config.yml`
- Modify: `_data/site.yml`
- Modify: `index.html`

- [ ] **Step 1: Write the failing build-output checks**

Run:

```bash
bundle exec jekyll build
rg -n "Web Developer in Los Angeles|rel=\"canonical\"|twitter:card|application/ld\\+json" public/index.html
```

Expected:

- `bundle exec jekyll build` succeeds or reveals a build prerequisite to fix first
- `rg` returns missing or incomplete SEO output for the target phrase and tags

- [ ] **Step 2: Add site-level SEO settings to `_config.yml`**

Include real production-oriented values and build settings needed for:

- `title`
- `description`
- `url`
- `baseurl`
- optional plugins such as sitemap generation if supported by the current gem setup
- destination set to `public` only if that matches the intended deploy workflow cleanly

- [ ] **Step 3: Extend `_data/site.yml` with reusable SEO fields**

Add structured values for:

- localized service phrase
- locality
- site URL
- social preview image
- social usernames/URLs already present
- contact/conversion context that is truthful

- [ ] **Step 4: Update `index.html` front matter for homepage-specific SEO copy**

Set homepage values so the page targets the localized service phrase and contact intent without stuffing.

- [ ] **Step 5: Re-run the build and inspect generated output**

Run:

```bash
bundle exec jekyll build
sed -n '1,220p' public/index.html
```

Expected:

- the build succeeds
- homepage front matter values appear in the generated HTML title/description surface where applicable

### Task 2: Upgrade Head Metadata And Structured Data

**Files:**
- Modify: `_layouts/default.html`

- [ ] **Step 1: Write the failing metadata checks**

Run:

```bash
rg -n "rel=\"canonical\"|property=\"og:url\"|name=\"twitter:card\"|application/ld\\+json" _layouts/default.html
```

Expected: missing or incomplete matches for the full metadata set

- [ ] **Step 2: Implement canonical, Open Graph, and Twitter metadata**

Render:

- canonical URL
- localized title and description
- `og:title`
- `og:description`
- `og:type`
- `og:url`
- `og:image`
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

- [ ] **Step 3: Add JSON-LD for person and service identity**

Emit truthful structured data covering:

- person name
- web developer role/service context
- Los Angeles location
- site URL
- sameAs links
- contact point if supported by real data

- [ ] **Step 4: Re-run the build and inspect generated head output**

Run:

```bash
bundle exec jekyll build
rg -n "rel=\"canonical\"|property=\"og:url\"|name=\"twitter:card\"|application/ld\\+json|Web Developer in Los Angeles" public/index.html
```

Expected: all required tags appear in generated HTML

### Task 3: Improve On-Page SEO And Contact Conversion Copy

**Files:**
- Modify: `_includes/hero.html`
- Modify: `_includes/contact.html`
- Modify: `_data/site.yml`

- [ ] **Step 1: Write the failing content checks**

Run:

```bash
bundle exec jekyll build
rg -n "Los Angeles|project|contact|Get in Touch" public/index.html
```

Expected: copy is present but does not yet clearly support the localized service phrase and contact-form conversion

- [ ] **Step 2: Update hero copy and supporting content**

Adjust the H1/subtitle/description data and template text so the page naturally targets `Web Developer in Los Angeles`.

- [ ] **Step 3: Strengthen contact-section conversion copy**

Make the contact section explicitly invite project inquiries and contact form submissions while keeping the design intact.

- [ ] **Step 4: Re-run the build and inspect rendered content**

Run:

```bash
bundle exec jekyll build
rg -n "Web Developer in Los Angeles|contact form|project inquiry|Los Angeles" public/index.html
```

Expected: the generated homepage contains localized and conversion-oriented copy

### Task 4: Add Crawl Files And Sync Deploy Output

**Files:**
- Create: `robots.txt`
- Create or enable: sitemap output
- Modify: `_config.yml`
- Modify or replace generated output in: `public/index.html`

- [ ] **Step 1: Write the failing crawl/deploy checks**

Run:

```bash
test -f public/robots.txt && echo robots-present || echo robots-missing
test -f public/sitemap.xml && echo sitemap-present || echo sitemap-missing
rg -n "Firebase Hosting Setup Complete" public/index.html
```

Expected:

- robots and sitemap are missing
- `public/index.html` still contains the Firebase placeholder or otherwise does not reflect the Jekyll homepage

- [ ] **Step 2: Add `robots.txt` and sitemap support**

Implement crawl files so they reference the real production homepage.

- [ ] **Step 3: Build the site into `public/`**

Run:

```bash
bundle exec jekyll build
```

If needed, update the Jekyll destination so the output goes to `public/` consistently.

- [ ] **Step 4: Verify the generated deploy artifacts**

Run:

```bash
test -f public/robots.txt && echo robots-present
test -f public/sitemap.xml && echo sitemap-present
rg -n "Firebase Hosting Setup Complete" public/index.html
rg -n "Web Developer in Los Angeles|rel=\"canonical\"|application/ld\\+json" public/index.html
```

Expected:

- `robots.txt` exists
- `sitemap.xml` exists
- no Firebase placeholder match remains
- SEO tags and localized phrase appear in `public/index.html`
