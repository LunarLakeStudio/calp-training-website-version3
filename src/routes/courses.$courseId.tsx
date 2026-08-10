import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Course } from "@/data/courses";
import { getCourseBySlug } from "@/lib/content.functions";
import { useTrainings } from "@/hooks/useData";
import { getTrainingsForCourse } from "@/lib/derive";
import { TrainingRow } from "@/components/site/TrainingRow";
import { FileText, BookOpen, PlayCircle, Download } from "lucide-react";

export const Route = createFileRoute("/courses/$courseId")({
  loader: async ({ params }): Promise<{ course: Course }> => {
    const course = (await getCourseBySlug({
      data: { slug: params.courseId },
    })) as Course | null;
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.course.title} — CALP Training Hub` },
            { name: "description", content: loaderData.course.summary },
            {
              property: "og:title",
              content: `${loaderData.course.title} — CALP Training Hub`,
            },
            { property: "og:description", content: loaderData.course.summary },
            { property: "og:image", content: loaderData.course.cover },
          ],
        }
      : {},
  component: CourseDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-6 py-24 text-center">
      <h1 className="mb-4 font-display text-3xl font-bold">Course not found</h1>
      <Link to="/courses" className="text-calp-red">
        ← Back to catalogue
      </Link>
    </div>
  ),
});

const KIND_ICON = { PDF: FileText, Guide: BookOpen, Video: PlayCircle };

function CourseDetail() {
  const { course } = Route.useLoaderData() as { course: Course };
  const { data: trainings = [] } = useTrainings();
  const upcoming = getTrainingsForCourse(trainings, course.id);

  return (
    <>
      <header className="border-b border-calp-blue/5 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Link
              to="/courses"
              className="mb-6 inline-block text-xs font-bold text-calp-red"
            >
              ← Catalogue
            </Link>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="rounded bg-calp-pale-teal px-2 py-1 text-[10px] font-bold">
                {course.level} Level
              </span>
              <span className="rounded bg-calp-pale-teal px-2 py-1 text-[10px] font-bold">
                {course.duration}
              </span>
              {course.languages.map((l) => (
                <span
                  key={l}
                  className="rounded bg-calp-blue px-2 py-1 text-[10px] font-bold text-white"
                >
                  {l}
                </span>
              ))}
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-balance text-calp-red md:text-5xl">
              {course.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-calp-ink">
              {course.summary}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-calp-blue/5 shadow-xl">
            <img
              src={course.cover}
              alt=""
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-6 font-display text-sm font-bold text-calp-red">
            About this course
          </h2>
          <p className="text-lg leading-relaxed text-calp-blue/90">
            {course.description || course.summary}
          </p>

          <h2 className="mt-16 mb-6 font-display text-sm font-bold text-calp-red">
            Topics covered
          </h2>
          {course.topics.length === 0 ? (
            <p className="text-sm text-calp-ink">Topics to be announced.</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {course.topics.map((tp) => (
                <li
                  key={tp}
                  className="rounded-full border border-calp-blue/15 px-3 py-1.5 text-xs font-semibold text-calp-blue"
                >
                  {tp}
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside>
          <h2 className="mb-6 font-display text-sm font-bold text-calp-red">
            Free materials
          </h2>
          <ul className="space-y-3">
            {course.downloads.map((d) => {
              const Icon = KIND_ICON[d.kind];
              return (
                <li
                  key={d.label}
                  className="group flex items-center gap-4 rounded-xl border border-calp-blue/5 bg-white p-4 transition-colors hover:border-calp-red/40"
                >
                  <Icon className="h-5 w-5 shrink-0 text-calp-red" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-calp-blue">
                      {d.label}
                    </p>
                    <p className="text-xs text-calp-ink">
                      {d.kind}
                      {d.size ? ` · ${d.size}` : ""}
                    </p>
                  </div>
                  <Download className="h-4 w-4 text-calp-ink transition-colors group-hover:text-calp-red" />
                </li>
              );
            })}
          </ul>
        </aside>
      </section>

      <section className="bg-calp-blue py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 font-display text-3xl font-bold">
                Upcoming trainings
              </h2>
              <p className="text-white/60">
                Live sessions currently open for this course.
              </p>
            </div>
            <Link
              to="/calendar"
              className="whitespace-nowrap text-xs font-bold text-white/80 hover:text-white"
            >
              Full calendar →
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
              No upcoming trainings scheduled yet. Check back soon — dates populate
              automatically when trainers publish new sessions.
            </p>
          ) : (
            <div className="grid gap-4">
              {upcoming.map((tr) => (
                <TrainingRow key={tr.id} training={tr} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
