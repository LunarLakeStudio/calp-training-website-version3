import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCourses, useTrainings } from "@/hooks/useData";
import {
  allCountries,
  allTrainingLanguages,
  filterTrainings,
} from "@/lib/derive";
import { TrainingRow } from "@/components/site/TrainingRow";
import { FilterChip } from "@/components/site/FilterChip";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Training Calendar — CALP Training Hub" },
      {
        name: "description",
        content:
          "Public, filterable calendar of every upcoming CALP training across all courses, countries and languages.",
      },
      { property: "og:title", content: "Training Calendar — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Browse all upcoming CALP trainings by country, course, month or language.",
      },
    ],
  }),
  component: CalendarPage,
});

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function CalendarPage() {
  const { data: courses = [] } = useCourses();
  const { data: trainings = [], isLoading } = useTrainings();
  const [country, setCountry] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  const results = useMemo(
    () =>
      filterTrainings(trainings, {
        country: country ?? undefined,
        courseId: courseId ?? undefined,
        language: language ?? undefined,
        month: month ?? undefined,
      }),
    [trainings, country, courseId, language, month],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>();
    for (const t of results) {
      const key = t.startDate.slice(0, 7);
      const arr = map.get(key) ?? [];
      arr.push(t);
      map.set(key, arr);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [results]);

  const months = useMemo(
    () => Array.from(new Set(filterTrainings(trainings, {}).map((t) => t.startDate.slice(0, 7)))).sort(),
    [trainings],
  );

  return (
    <>
      <PageHero
        eyebrow="Global schedule"
        title="Training calendar"
        intro="Every upcoming CALP training across all courses and countries. Dates populate automatically the moment a trainer publishes a session."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm">
          <FilterGroup label="Country">
            <FilterChip active={country === null} onClick={() => setCountry(null)}>
              All
            </FilterChip>
            {allCountries(trainings).map((c) => (
              <FilterChip key={c} active={country === c} onClick={() => setCountry(c)}>
                {c}
              </FilterChip>
            ))}
          </FilterGroup>
          <FilterGroup label="Course">
            <FilterChip active={courseId === null} onClick={() => setCourseId(null)}>
              All
            </FilterChip>
            {courses.map((c) => (
              <FilterChip
                key={c.id}
                active={courseId === c.id}
                onClick={() => setCourseId(c.id)}
              >
                {c.title.length > 32 ? c.title.slice(0, 30) + "…" : c.title}
              </FilterChip>
            ))}
          </FilterGroup>
          <FilterGroup label="Language">
            <FilterChip active={language === null} onClick={() => setLanguage(null)}>
              All
            </FilterChip>
            {allTrainingLanguages(trainings).map((l) => (
              <FilterChip
                key={l}
                active={language === l}
                onClick={() => setLanguage(l)}
              >
                {l}
              </FilterChip>
            ))}
          </FilterGroup>
          <FilterGroup label="Month">
            <FilterChip active={month === null} onClick={() => setMonth(null)}>
              All
            </FilterChip>
            {months.map((m) => {
              const [y, mm] = m.split("-");
              return (
                <FilterChip key={m} active={month === m} onClick={() => setMonth(m)}>
                  {MONTH_LABELS[parseInt(mm, 10) - 1].slice(0, 3)} {y}
                </FilterChip>
              );
            })}
          </FilterGroup>
        </div>

        {isLoading ? (
          <p className="py-16 text-center text-calp-ink">Loading calendar…</p>
        ) : results.length === 0 ? (
          <p className="py-16 text-center text-calp-ink">
            No trainings match those filters.
          </p>
        ) : (
          <div className="space-y-12">
            {grouped.map(([key, items]) => {
              const [y, mm] = key.split("-");
              return (
                <div key={key}>
                  <h2 className="mb-6 flex items-baseline gap-3 font-display text-2xl font-bold">
                    <span>{MONTH_LABELS[parseInt(mm, 10) - 1]}</span>
                    <span className="text-calp-ink">{y}</span>
                    <span className="ml-auto text-xs font-medium text-calp-ink">
                      {items.length} training{items.length > 1 ? "s" : ""}
                    </span>
                  </h2>
                  <div className="space-y-3">
                    {items.map((t) => {
                      const course = courses.find((c) => c.id === t.courseId);
                      return (
                        <TrainingRow
                          key={t.id}
                          training={t}
                          course={course}
                          variant="light"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 w-20 shrink-0 text-[10px] font-bold text-calp-ink">
        {label}
      </span>
      {children}
    </div>
  );
}
