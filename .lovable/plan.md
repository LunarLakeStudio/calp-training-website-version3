# Course icons in "Explore our courses"

Add a small icon placeholder to the left of every course title in the homepage
accordion list, so each row reads as a distinct item.

## What changes

- Each collapsed row gets a 36x36 rounded square badge on the left, before the title:
  thin dark-blue border, pale surface, with a Lucide icon centred in dark blue.
- Icons are assigned per course from a small fixed set (deterministic, based on the
  course's position/slug) so the same course always shows the same icon — a genuine
  placeholder until real per-course icons are supplied.
- Row layout becomes: icon badge, title, "+" toggle on the far right. Title stays
  left-aligned and truncation/wrapping behaviour is unchanged.
- On open/hover the badge surface shifts with the row (matching the existing colour
  transition), and the badge is `aria-hidden` so screen readers are unaffected.
- Mobile: badge shrinks slightly (32px) and the title keeps its full remaining width.

Unchanged: accordion open/close behaviour, hover-on-desktop / tap-on-mobile logic,
deep links to `/courses#slug`, "Learn more" links, colours and fonts (existing
tokens only).

## Technical notes

- Only `src/components/site/CourseAccordionList.tsx` is touched.
- Add a local `ICONS` array of Lucide icons (e.g. `BookOpen`, `Coins`, `Users`,
  `ShieldCheck`, `BarChart3`, `Globe`, `ClipboardList`, `Workflow`) and pick one per
  course via a stable hash of `course.slug`.
- Header grid changes from `[minmax(0,1fr)_auto]` to `[auto_minmax(0,1fr)_auto]`.
- Colours from existing tokens: `border-calp-blue/30`, `text-calp-blue`,
  `bg-calp-pale-red-soft` / `bg-white` following the row state.
