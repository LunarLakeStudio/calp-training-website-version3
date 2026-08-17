# Solid CALP red course icon badges

Make the course icon boxes in "Explore our Courses" use the same red as the Apply CTA buttons, with white icons.

## Change

In `src/components/site/CourseAccordionList.tsx`, the icon badge currently switches between white and pale soft red backgrounds. Replace that with a single solid fill in every state:

- Background: `bg-calp-red` (the existing token used by Apply buttons — no new shade)
- Icon glyph: `text-white`
- Border: `border-calp-red` (no pale outline)
- Remove the open/closed background switch so default, hover and active look identical

No other colours, spacing or layout change.
