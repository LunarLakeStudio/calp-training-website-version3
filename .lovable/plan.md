# Privacy Policy page

Add a real Privacy policy page containing the text from the uploaded document, and link the footer "Privacy policy" button to it.

## What the user sees

- New page at `/privacy` titled "Privacy policy", using the standard page hero and brand styling (Dark Blue headings, black body text, left-aligned, sentence case, generous white space).
- Content sections from the uploaded document, in order:
  - Intro (how we collect and treat your personal information)
  - Who we are and how can you contact us?
  - Why do we need your information?
  - How do we collect your information?
  - How do we use your information?
  - How do we store your information and for how long?
  - Do you share my information with anyone else?
  - How can I change, delete or ask to see my information?
  - How to find out more, or make a complaint about our approach to data protection?
  - Digital Platforms Manager postal address block
- Working links: `info@calpnetwork.org` as mailto, CALP cookie policy, and the two ICO links (external links open in a new tab).
- The footer "Privacy policy" link (currently `href="#"`) points to the new page. Cookie policy and Terms of use are left as they are.

## Technical notes

- New route file `src/routes/privacy.tsx` with `createFileRoute("/privacy")`, its own `head()` (unique title, description, og:title, og:description, canonical `/privacy`), reusing `PageHero`.
- Content is static JSX in that route file — no database work.
- `src/components/site/SiteFooter.tsx`: replace the Privacy policy anchor with a TanStack `<Link to="/privacy">`.
- Route tree regenerates automatically.
