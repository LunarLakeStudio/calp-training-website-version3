import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCourses, useTrainings } from "@/hooks/useData";
import {
  allCountries,
  allTrainingLanguages,
  filterTrainings,
  getCourseForTraining,
  allTopics,
} from "@/lib/derive";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedPageHero } from "@/components/site/AnimatedPageHero";
import { AnimatedGrid } from "@/components/site/AnimatedGrid";
import { CalendarDays, MapPin, Languages, Clock, RotateCcw } from "lucide-react";
import { formatDate } from "@/lib/format";


export const Route = createFileRoute("/trainings")({
  head: () => ({
    meta: [
      { title: "Trainings — CALP Training Hub" },
      {
        name: "description",
        content:
          "Browse and filter upcoming CALP trainings by topic, country, language and format. Apply directly to any session.",
      },
      { property: "og:title", content: "Trainings — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Filter upcoming CALP trainings by topic and apply for the session that fits you.",
      },
    ],
  }),
  component: TrainingsPage,
});

function TrainingsPage() {
  const { data: courses = [] } = useCourses();
  const { data: trainings = [], isLoading } = useTrainings();
  const [topic, setTopic] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>(null);

  const topics = useMemo(() => allTopics(courses), [courses]);

  const results = useMemo(() => {
    const list = filterTrainings(trainings, {
      country: country ?? undefined,
      courseId: courseId ?? undefined,
      language: language ?? undefined,
    });
    return list
      .filter((t) => (format ? t.format === format : true))
      .filter((t) => {
        if (!topic) return true;
        const c = getCourseForTraining(courses, t);
        return c?.topics.includes(topic) ?? false;
      });
  }, [trainings, courses, topic, country, courseId, language, format]);

  const filterKey = `${topic}-${country}-${courseId}-${language}-${format}`;

  return (
    <>
      <AnimatedPageHero
        eyebrow="Upcoming sessions"
        title="Find a Training"
        intro="Filter by topic to find the right CALP training, then apply in one click."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <FilterSelect
              label="Topic"
              placeholder="All Topics"
              value={topic}
              onChange={setTopic}
              options={topics.map((tp) => ({ value: tp, label: tp }))}
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
              label="Location"
              placeholder="All Locations"
              value={country}
              onChange={setCountry}
              options={allCountries(trainings).map((c) => ({ value: c, label: c }))}
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
              label="Training type"
              placeholder="All Training Types"
              value={format}
              onChange={setFormat}
              options={["Face-to-Face", "Online", "Hybrid"].map((f) => ({
                value: f,
                label: f,
              }))}
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


        <p className="mb-6 text-xs font-bold text-calp-ink">
          {results.length} training{results.length === 1 ? "" : "s"} match
        </p>

        {isLoading ? (
          <p className="py-16 text-calp-ink">Loading trainings…</p>
        ) : results.length === 0 ? (
          <p className="py-16 text-calp-ink">
            No trainings match those filters. Try broadening your topic or country.
          </p>
        ) : (
          <AnimatedGrid
            key={filterKey}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {results.map((t) => {
              const course = getCourseForTraining(courses, t);
              return (
                <article
                  key={t.id}
                  className="group flex flex-col rounded-2xl border border-calp-blue/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-calp-red/40 hover:shadow-lg"
                >
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded bg-calp-blue px-2 py-1 text-xs font-bold text-white">
                      {t.format}
                    </span>
                    <span className="rounded bg-calp-pale-teal px-2 py-1 text-xs font-bold">
                      {t.language}
                    </span>
                    {course?.topics.slice(0, 1).map((tp) => (
                      <span
                        key={tp}
                        className="rounded bg-calp-pale-red px-2 py-1 text-xs font-bold text-calp-red"
                      >
                        {tp}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-3 font-display text-lg font-bold leading-snug text-calp-blue">
                    {course?.title ?? "Training"}
                  </h3>
                  <ul className="mb-6 space-y-2 text-sm text-calp-ink">
                    <li className="flex items-start gap-2">
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-calp-red" />
                      <span>
                        {formatDate(t.startDate)} – {formatDate(t.endDate)}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-calp-red" />
                      <span>
                        {t.city}, {t.country}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Languages className="mt-0.5 h-4 w-4 shrink-0 text-calp-red" />
                      <span>{t.trainer}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-calp-red" />
                      <span>Apply by {formatDate(t.deadline)}</span>
                    </li>
                  </ul>
                  <div className="mt-auto flex gap-2">
                    <Link
                      to="/trainings/$trainingId"
                      params={{ trainingId: t.id }}
                      className="flex-1 rounded-lg border border-calp-blue/15 px-4 py-2 text-center text-xs font-bold text-calp-blue transition-colors hover:border-calp-blue"
                    >
                      Details
                    </Link>
                    <Link
                      to="/apply"
                      search={{ training: t.id }}
                      className="flex-1 rounded-lg bg-calp-blue px-4 py-2 text-center text-xs font-bold text-white transition-colors group-hover:bg-calp-red"
                    >
                      Apply
                    </Link>
                  </div>
                </article>
              );
            })}
          </AnimatedGrid>
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

