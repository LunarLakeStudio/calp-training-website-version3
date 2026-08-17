# Course icons in CALP Red

Make the course icon badges in the homepage "Explore our courses" accordion CALP Red instead of Dark Blue, matching the buttons.

## What changes

- Icon glyph colour: `text-calp-blue` becomes `text-calp-red` (`#ca2128`).
- Badge border: `border-calp-blue/30` becomes `border-calp-red/30` so the badge reads as one red element.
- Badge background keeps its existing behaviour (white when open, pale soft red when closed).

Unchanged: course titles, the "+" toggle, row borders, hover/open surfaces, accordion behaviour and links.

## Technical notes

- Only `src/components/site/CourseAccordionList.tsx` is touched (the icon badge `<span>` classes).
- Uses the existing `calp-red` token; no new colours.
