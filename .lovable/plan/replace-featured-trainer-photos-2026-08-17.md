# Replace featured trainer photos

Swap the three low-resolution headshots extracted from the PDF for the new high-quality grey-background portraits.

## Mapping

- Mohammad Aslam Khatti — `Aslam_grey.png`
- Ebtihal Ghanem — `Ebithal_grey.png`
- Dr Daud Abdi Ismail — `Daud_grey.png`

All three are already square and sharp, so they drop straight into the existing square rounded portrait cards with no cropping.

## Changes

- Upload the three uploaded images as new CDN assets and point `src/assets/trainers/featured-aslam-khatti`, `featured-ebtihal-ghanem`, `featured-daud-abdi-ismail` pointers at them.
- `src/data/trainers.ts` keeps the same import names, so no other code changes are needed.
- Remove the old asset pointers/objects that are no longer referenced.

Nothing else changes: names, bios, languages, locations, ordering, card design and both the homepage and Trainers page stay exactly as they are.
