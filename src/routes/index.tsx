import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/calp-hero.png.asset.json";
import { useCourses, useTrainings, useTrainers } from "@/hooks/useData";
import { CourseCard } from "@/components/site/CourseCard";
import { TrainingRow } from "@/components/site/TrainingRow";
import { TrainerCard } from "@/components/site/TrainerCard";
import { HowToApply } from "@/components/site/HowToApply";
import {
  TealCircle,
  PaleTealCircle,
  RedCircle,
} from "@/components/site/BrandBlobs";
import { courses as fallbackCourses } from "@/data/courses";
import { trainers as fallbackTrainers } from "@/data/trainers";
import { upcomingTrainings as fallbackUpcoming } from "@/data/trainings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CALP Training Hub — build the skills to deliver better CVA" },
      {
        name: "description",
        content:
          "Practical, expert-led courses and training in Cash and Voucher Assistance for humanitarian professionals, delivered by the CALP Network worldwide.",
      },
      { property: "og:title", content: "CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Practical, expert-led CVA courses and training for humanitarian professionals — browse the catalogue and apply.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const coursesQuery = useCourses();
  const trainingsQuery = useTrainings();
  const trainersQuery = useTrainers();

  const allCourses = coursesQuery.data ?? fallbackCourses;
  const featured = allCourses.slice(0, 3);
  const upcoming = trainingsQuery.data?.slice(0, 3) ?? fallbackUpcoming(3);
  const trainers = (trainersQuery.data ?? fallbackTrainers).slice(0, 3);
  const courseById = new Map(allCourses.map((c) => [c.id, c]));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-10 pb-14 lg:grid-cols-2">
          <div className="relative z-10">
            <h1 className="mb-5 font-display text-4xl font-bold leading-tight text-calp-red md:text-5xl">
              Build the skills
              <br />
              to deliver better CVA.
            </h1>
            <p className="mb-8 max-w-md text-base leading-relaxed text-calp-ink">
              Practical, expert-led courses and training for humanitarian
              professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="rounded-md bg-calp-red px-7 py-3 font-medium text-white transition-opacity hover:opacity-90"
              >
                Explore courses
              </Link>
              <Link
                to="/calendar"
                className="rounded-md border border-calp-blue px-7 py-3 font-medium text-calp-blue transition-colors hover:bg-calp-blue hover:text-white"
              >
                Find a training
              </Link>
            </div>
          </div>

          <div className="relative">
            <TealCircle className="-left-10 -top-8 h-40 w-40 opacity-90" />
            <PaleTealCircle className="-right-8 -top-10 h-36 w-36" />
            <RedCircle className="-right-6 -bottom-8 h-32 w-32" />
            <img
              src={heroAsset.url}
              alt="Humanitarian professionals in a CALP training workshop"
              width={1600}
              height={600}
              className="relative z-10 aspect-[16/9] w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Courses / trainings / trainers */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 lg:grid-cols-3">
        <div className="min-w-0">
          <SectionHead
            title="Explore our courses"
            linkLabel="View all courses"
            to="/courses"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {featured.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <SectionHead
            title="Upcoming trainings"
            linkLabel="View full calendar"
            to="/calendar"
          />
          <div>
            {upcoming.map((tr) => (
              <TrainingRow
                key={tr.id}
                training={tr}
                course={courseById.get(tr.courseId)}
              />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <SectionHead
            title="Meet our trainers"
            linkLabel="View all trainers"
            to="/trainers"
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {trainers.map((tr) => (
              <TrainerCard key={tr.id} trainer={tr} />
            ))}
          </div>
        </div>
      </section>

      <HowToApply />
    </>
  );
}

function SectionHead({
  title,
  linkLabel,
  to,
}: {
  title: string;
  linkLabel: string;
  to: string;
}) {
  return (
    <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
      <h2 className="min-w-0 font-display text-xl font-bold text-calp-red">
        {title}
      </h2>
      <Link
        to={to}
        className="shrink-0 text-sm font-medium text-calp-blue underline-offset-4 hover:underline"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}
