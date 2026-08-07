# Clean up course topics

The current topic tags mix three different things: subject matter ("Markets", "M&E"), delivery format ("Face-to-Face", "Online") and audience ("Donors", "Management"). That makes the Topic filter on the Courses page noisy — 20+ chips, several of which appear on only one course, and format chips that duplicate information already shown in the duration/description.

## New topic set

Topics become subject-only, drawn from a fixed list of 8:

- CVA Fundamentals
- Programme Design & Implementation
- Markets & Assessment
- Response Analysis
- Monitoring & Evaluation
- Operations (Supply Chain, Finance, ICT)
- Leadership & Strategy
- Social Protection

Delivery format and audience are no longer topics; they already appear in each course's title, duration and description.

## Per-course assignment

1. CVA – The Fundamentals → CVA Fundamentals
2. Core CVA Skills for Programme Staff (F2F) → CVA Fundamentals, Programme Design & Implementation
3. Core CVA Skills for Programme Staff (Online) → CVA Fundamentals, Programme Design & Implementation
4. Core CVA Skills for Supply Chain, Finance and ICT → CVA Fundamentals, Operations (Supply Chain, Finance, ICT)
5. Core CVA Skills for Managers → Leadership & Strategy
6. Core CVA Skills for Donors → Leadership & Strategy
7. Market Assessment Tools Training → Markets & Assessment
8. Linking Humanitarian CVA with Social Protection → Social Protection
9. Monitoring 4 CVA → Monitoring & Evaluation
10. Response Analysis → Response Analysis, Markets & Assessment

## Technical notes

- Only the `topics` arrays in `src/data/courses.ts` change; titles, descriptions, levels, durations and images stay as they are.
- The Courses page filter builds its chips from the data (`allTopics`), so it picks up the new set automatically — no filter code changes.
