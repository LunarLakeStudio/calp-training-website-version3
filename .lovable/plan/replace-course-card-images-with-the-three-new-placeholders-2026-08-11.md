# Replace course card images with the three new placeholders

The three uploaded organic-shape graphics become the new course cover images, replacing the current workshop photos (`course-fundamentals.jpg`, `course-strategic.jpg`, `course-digital.jpg`).

## What changes

- Course cards and course detail pages show the new shape placeholders instead of photos.
- The three images rotate across the 10 courses exactly as today (same assignment order), so every course keeps a cover.
- Applies to both the local catalogue and courses loaded from the Training Hub database, since both draw from the same cover list.

## Technical notes

- Upload the three uploads to CDN assets as `course-shape-1/2/3.png` pointer files in `src/assets/`.
- `src/data/courses.ts`: swap the three image imports for the asset pointers and use their `.url`; per-course `cover` assignments stay as they are.
- `src/lib/content.server.ts`: update the `COURSE_COVERS` list to the new asset URLs.
- Delete the three now-unused JPGs from `src/assets/`.
- Card framing keeps the existing 16/10 aspect ratio and rounded corners; the shapes are cropped to fit, no layout change.
