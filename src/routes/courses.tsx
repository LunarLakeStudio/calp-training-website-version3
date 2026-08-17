import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useCourses } from "@/hooks/useData";
import { allTopics, allCourseLanguages } from "@/lib/derive";
import { CourseCard } from "@/components/site/CourseCard";
import { FilterSelect } from "@/components/site/FilterSelect";
import { RotateCcw } from "lucide-react";
import { AnimatedPageHero } from "@/components/site/AnimatedPageHero";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { AnimatedGrid, AnimatedGridItem } from "@/components/site/AnimatedGrid";


export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Course Catalogue — CALP Training Hub" },
      {
        name: "description",
        content:
          "Browse the full CALP catalogue of cash and voucher assistance courses. Filter by topic, language and level.",
      },
      { property: "og:title", content: "Course Catalogue — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Multilingual, expert-led courses in Cash and Voucher Assistance for humanitarian practitioners.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { data: courses = [], isLoading } = useCourses();
  const { hash } = useLocation();
  const [topic, setTopic] = useState<string | null>(null);
  const [lang, setLangFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  const targetSlug = (hash ?? "").replace(/^#/, "");

  useEffect(() => {
    if (!targetSlug || isLoading) return;
    if (!courses.some((c) => c.slug === targetSlug)) return;
    setTopic(null);
    setLangFilter(null);
    setQuery("");
    setHighlightedSlug(targetSlug);
    const raf = requestAnimationFrame(() => {
      document
        .getElementById(targetSlug)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const timer = window.setTimeout(() => setHighlightedSlug(null), 4000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [targetSlug, isLoading, courses]);


  const topics = useMemo(() => allTopics(courses), [courses]);
  const languages = useMemo(() => allCourseLanguages(courses), [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses
      .filter((c) => (topic ? c.topics.includes(topic) : true))
      .filter((c) => (lang ? c.languages.includes(lang) : true))
      .filter((c) =>
        q
          ? c.title.toLowerCase().includes(q) ||
            c.summary.toLowerCase().includes(q)
          : true,
      );
  }, [courses, topic, lang, query]);

  const hasFilters = !!(topic || lang || query.trim());
  const resetFilters = () => {
    setTopic(null);
    setLangFilter(null);
    setQuery("");
  };

  return (
    <>
      <AnimatedPageHero
        eyebrow={
          <>
            <AnimatedCounter value={courses.length} /> Courses
          </>
        }
        title="CALP Courses Catalogue"
        intro="Every course is developed with practitioners, delivered by accredited facilitators, and offered across multiple languages and regions."
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="bg-subtle-pattern pointer-events-none absolute inset-x-0 top-0 -z-10 h-full" />
        <ScrollReveal>
          <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="w-full rounded-lg border border-calp-blue/10 bg-calp-canvas px-4 py-3 text-base outline-none placeholder:text-calp-blue-75 focus:border-calp-blue"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FilterSelect
                label="Topic"
                placeholder="All Topics"
                value={topic}
                onChange={setTopic}
                options={topics.map((tp) => ({ value: tp, label: tp }))}
              />
              <FilterSelect
                label="Language"
                placeholder="All Languages"
                value={lang}
                onChange={setLangFilter}
                options={languages.map((lg) => ({ value: lg, label: lg }))}
              />
            </div>
            {hasFilters && (
              <div className="flex">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-calp-blue/15 px-3 py-2 text-sm font-bold text-calp-blue transition-colors hover:border-calp-blue"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        {isLoading ? (
          <p className="py-16 text-calp-ink">Loading courses…</p>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-calp-ink">
            No courses match those filters yet.
          </p>
        ) : (
          <AnimatedGrid className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <AnimatedGridItem key={c.id} id={c.id} className="h-full">
                <div id={c.slug} className="h-full scroll-mt-28">
                  <CourseCard course={c} highlighted={highlightedSlug === c.slug} />
                </div>

              </AnimatedGridItem>
            ))}

          </AnimatedGrid>
        )}
      </section>
    </>
  );
}
