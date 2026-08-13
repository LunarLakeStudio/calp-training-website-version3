import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCourses, useTrainings } from "@/hooks/useData";
import {
  allCountries,
  allTrainingLanguages,
  filterTrainings,
  getCourseForTraining,
  allTopics,
} from "@/lib/derive";
import { FilterSelect } from "@/components/site/FilterSelect";
import { AnimatedPageHero } from "@/components/site/AnimatedPageHero";
import { AnimatedGrid } from "@/components/site/AnimatedGrid";
import { RotateCcw } from "lucide-react";
import { TrainingCard } from "@/components/site/TrainingCard";


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
  const hasFilters = !!(topic || country || courseId || language || format);
  const resetFilters = () => {
    setTopic(null);
    setCountry(null);
    setCourseId(null);
    setLanguage(null);
    setFormat(null);
  };

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
            {results.map((t) => (
              <TrainingCard
                key={t.id}
                training={t}
                course={getCourseForTraining(courses, t)}
              />
            ))}
          </AnimatedGrid>
        )}
      </section>
    </>
  );
}
