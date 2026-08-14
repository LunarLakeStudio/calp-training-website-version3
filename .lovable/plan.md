# Make the "How to apply" page more engaging

Same content, richer CALP-branded layout. Only `src/routes/how-to-apply.tsx` changes (plus the shared shapes/hero components it reuses). All colours come from tokens already defined in `src/styles.css` — no new palette values needed:

| Role | Colour | Token |
| --- | --- | --- |
| Main | `#065b82` Dark Blue | `calp-blue` |
| Secondary | `#ca2128` CALP Red | `calp-red` |
| Secondary | `#00b0bf` Teal | `calp-teal` |
| Accent | `#82adc0` Dark Blue 50% | `calp-blue-50` |
| Accent | `#f0cdbf` Pale Red | `calp-pale-red` |
| Accent | `#9cd1da` Pale Teal | `calp-pale-teal` |

## New page structure

1. **Hero band** — keeps the current H1 "How to apply for a CALP Network CVA training" in Dark Blue with the intro line, but sits on a soft tinted band with the existing CALP organic shape cluster (teal / pale teal / red) bleeding off the right edge, so the page opens with visual interest instead of bare text.

2. **Four numbered step cards** (replacing the four plain paragraphs, wording unchanged):
   - Step 1 Choose a training — accent bar / number circle in Teal
   - Step 2 Complete the form — Dark Blue
   - Step 3 Review and decision — CALP Red
   - Step 4 Good to know — Dark Blue 50%
   Each card: white surface, rounded corners, hairline Dark Blue 50% border, large numeral in a filled circle, Bold Dark Blue sub-heading, black body copy, subtle hover lift. Two columns on desktop, one on mobile.

3. **Connector rhythm** — a thin Pale Teal / Pale Red vertical or horizontal connector between steps on desktop so the four cards read as a sequence, decorative only.

4. **Closing call-to-action band** — Pale Red (`#f0cdbf`) full-width band with an organic shape, Dark Blue heading "Ready to apply?", and two buttons: red primary "Find a Training" → `/trainings`, Dark Blue outlined secondary "Browse courses" → `/courses`. This gives the page an exit path it currently lacks.

## Notes

- Sentence case, left-aligned text, 16px body / bold headings — consistent with the rest of the site.
- The final paragraph ("Submitting an application does not guarantee a place…") becomes the Step 4 "Good to know" card so no copy is lost.
- Contrast: black and Dark Blue on white/pale tints, white on red — all pass AA. Teal and the 50% tints are used for shapes, numerals background and borders only, never for body text.
- Head metadata on the route stays as is.
