# Make the two "How to apply" bands consistent

The homepage band and the "Ready to apply?" band on the How to apply page use the same pale soft red background (#f7e4db) and the same decorative shape clusters, but the How to apply page wraps its content in an extra white rounded card. That white box is the visual mismatch.

## Change

Remove the white card from the "Ready to apply?" band on `/how-to-apply` so the heading, text and buttons sit directly on the pale red background with the shapes behind them — exactly like the homepage band.

- Drop the `rounded-2xl border bg-white p-6 shadow-sm` wrapper; keep the inner flex row (text left, buttons right) and its spacing.
- Keep the same section padding (`py-14`), max width, shape clusters and z-index layering.
- Keep heading in Dark Blue, body in black, primary button CALP Red with white text, secondary outlined Dark Blue.
- Match button weight/style with the homepage band's "See application guidance" button so both bands read the same.

No other page, colour, font or content changes.

## Technical detail

Single file: `src/routes/how-to-apply.tsx` — edit the final section only.
