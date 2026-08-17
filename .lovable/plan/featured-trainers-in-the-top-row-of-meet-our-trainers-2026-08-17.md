# Featured trainers in the top row of "Meet our trainers"

Use the three real trainers from Sokhna's email as the first row on the homepage. The second row keeps the existing generated trainers, and the layout, card design and "View all trainers" link stay exactly as they are.

## The three featured trainers

1. Mohammad Aslam Khatti — Sudan — English, Urdu, Sindhi — Norwegian Refugee Council — certified in CALP Core CVA Skills Training
2. Ebtihal Ghanem — Yemen / Darfur — English, Arabic — IRC — certified in CVA
3. Dr Daud Abdi Ismail — Somalia — English, Somali, Kiswahili, Arabic — Polish Humanitarian Action (PAH) — certified in Core CVA Skills for Programme Staff and CVA – The Fundamentals

Each uses their own headshot from the email attachments, shown in the same square rounded portrait card already used on the homepage: photo, name in dark blue, languages, then location.

## Behaviour

- Featured trainers always appear first, in the order above, followed by three existing trainers to complete the second row (six cards total, unchanged from now).
- The same three also appear at the top of the Trainers page results, so clicking "View all trainers" shows them first.
- Their bios, organisations, contact emails and LinkedIn links from the email are stored with the trainer records so they can be surfaced later (trainer profile pages), but no new visible fields are added to the cards in this change.

## Notes

- The headshots in the email are fairly low resolution (roughly 140–320 px). They will look fine at the current card size; if higher-resolution originals arrive later they can be swapped in without other changes.
- Nothing else on the homepage changes: hero, courses accordion, upcoming trainings, How to apply, header and footer are untouched.

## Technical notes

- Extract the three headshots from the uploaded PDF and publish them as CDN assets (`src/assets/trainers/featured-*.jpg.asset.json`).
- Add a `featuredTrainers` array in `src/data/trainers.ts` typed as `Trainer`, extended with optional `organisation`, `bio`, `email`, `linkedin`, `certifiedCourses` fields; prepend it to the exported `trainers` list so both the homepage and the Trainers page pick them up first.
- Mirror the same three records in `src/lib/content.server.ts` fallback/ordering so the server-fed list also returns them first (ordering only, no schema or query changes).
- `src/routes/index.tsx` and `TrainerCard.tsx` need no visual changes.
