import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCourses } from "@/hooks/useData";
import { allTopics, allCourseLanguages } from "@/lib/derive";
import { CourseCard } from "@/components/site/CourseCard";
import { FilterChip } from "@/components/site/FilterChip";
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
  const [topic, setTopic] = useState<string | null>(null);
  const [lang, setLangFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");

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

  return (
    <>
      <AnimatedPageHero
        eyebrow={
          <>
            <AnimatedCounter value={courses.length} /> Courses
          </>
        }
        title="The full CALP catalogue"
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
              className="w-full rounded-lg border border-calp-blue/10 bg-calp-canvas px-4 py-3 text-sm outline-none placeholder:text-calp-ink focus:border-calp-red"
            />
            <div className="flex flex-col gap-3">
              <FilterGroup label="Topic">
                <FilterChip active={topic === null} onClick={() => setTopic(null)}>
                  All
                </FilterChip>
                {topics.map((tp) => (
                  <FilterChip
                    key={tp}
                    active={topic === tp}
                    onClick={() => setTopic(tp)}
                  >
                    {tp}
                  </FilterChip>
                ))}
              </FilterGroup>
              <FilterGroup label="Language">
                <FilterChip active={lang === null} onClick={() => setLangFilter(null)}>
                  All
                </FilterChip>
                {languages.map((lg) => (
                  <FilterChip
                    key={lg}
                    active={lang === lg}
                    onClick={() => setLangFilter(lg)}
                  >
                    {lg}
                  </FilterChip>
                ))}
              </FilterGroup>
            </div>
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
              <AnimatedGridItem key={c.id} id={c.id}>
                <CourseCard course={c} />
              </AnimatedGridItem>
            ))}
          </AnimatedGrid>
        )}
      </section>
    </>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-xs font-bold text-calp-ink">
        {label}
      </span>
      {children}
    </div>
  );
}
