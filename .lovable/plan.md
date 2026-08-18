# Match the footer CALP Network link to the header button

## What changes

In the footer, the plain "Visit the CALP Network website" text link becomes the same
prominent red button used in the header:

- Label: **Visit CALP Network** with the same ↗ (ArrowUpRight) icon
- Solid CALP Red background, white medium-weight text, rounded corners, same padding
  and hover (slight opacity fade) as the header button
- Opens the CALP Network site in a new tab, same accessible label
  ("Visit CALP Network (opens in a new tab)")

Everything else in the footer stays as it is: the divider, "Training Hub Login" with its
lock icon, the policy links, the wordmark and the copyright line.

## Technical notes

- `src/components/site/SiteFooter.tsx`: replace the underlined anchor with the header's
  button markup — `inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-calp-red
  px-6 py-2.5 text-base font-medium text-white transition-opacity hover:opacity-90` plus
  `<ArrowUpRight className="h-4 w-4" />` imported from lucide-react.
- Destination keeps reading `CALP_NETWORK_URL` from `src/config/site.ts`.
- No new colour tokens or fonts.
