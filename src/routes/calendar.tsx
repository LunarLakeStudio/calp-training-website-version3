import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCourses, useTrainings } from "@/hooks/useData";
import {
  allCountries,
  allTrainingLanguages,
  filterTrainings,
} from "@/lib/derive";
import { TrainingRow } from "@/components/site/TrainingRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
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

  const hasFilters = !!(country || courseId || language || month);
  const resetFilters = () => {
    setCountry(null);
    setCourseId(null);
    setLanguage(null);
    setMonth(null);
  };


  return (
    <>
      <PageHero
        eyebrow="Global schedule"
        title="Training Calendar"
        intro="Every upcoming CALP training across all courses and countries. Dates populate automatically the moment a trainer publishes a session."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              label="Location"
              placeholder="All Locations"
              value={country}
              onChange={setCountry}
              options={allCountries(trainings).map((c) => ({ value: c, label: c }))}
            />
            <FilterSelect
              label="Course"
              placeholder="All Courses"
              value={courseId}
              onChange={setCourseId}
              options={courses.map((c) => ({
                value: c.id,
                label: c.title.length > 32 ? c.title.slice(0, 30) + "…" : c.title,
              }))}
            />
            <FilterSelect
              label="Language"
              placeholder="All Languages"
              value={language}
              onChange={setLanguage}
              options={allTrainingLanguages(trainings).map((l) => ({
                value: l,
                label: l,
              }))}
            />
            <FilterSelect
              label="Month"
              placeholder="All Months"
              value={month}
              onChange={setMonth}
              options={months.map((m) => {
                const [y, mm] = m.split("-");
                return {
                  value: m,
                  label: `${MONTH_LABELS[parseInt(mm, 10) - 1]} ${y}`,
                };
              })}
            />
          </div>
          {hasFilters && (
            <div className="mt-4 flex">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-lg border border-calp-blue/15 px-3 py-2 text-xs font-bold text-calp-blue transition-colors hover:border-calp-blue"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset filters
              </button>
            </div>
          )}
        </div>


        {isLoading ? (
          <p className="py-16 text-calp-ink">Loading calendar…</p>
        ) : results.length === 0 ? (
          <p className="py-16 text-calp-ink">
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

function FilterSelect({
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  label: string;
  placeholder: string;
  value: string | null;
  onChange: (v: string | null) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-bold text-calp-blue">{label}</span>
      <Select
        value={value ?? "all"}
        onValueChange={(v) => onChange(v === "all" ? null : v)}
      >
        <SelectTrigger className="h-10 w-full border-calp-blue/15 bg-white text-xs font-medium text-calp-ink focus:ring-calp-blue">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          <SelectItem value="all" className="text-xs">
            {placeholder}
          </SelectItem>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
