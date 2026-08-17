import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/calp-hero.png.asset.json";
import { useCourses, useTrainings, useTrainers } from "@/hooks/useData";
import { CourseAccordionList } from "@/components/site/CourseAccordionList";
import { TrainingRow } from "@/components/site/TrainingRow";
import { TrainerCard } from "@/components/site/TrainerCard";
import { HowToApply } from "@/components/site/HowToApply";
import {
  ShapeClusterCool,
  ShapeClusterWarm,
} from "@/components/site/BrandShapes";

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
  
  const upcoming = trainingsQuery.data?.slice(0, 6) ?? fallbackUpcoming(6);
  const trainers = (trainersQuery.data ?? fallbackTrainers).slice(0, 6);
  const courseById = new Map(allCourses.map((c) => [c.id, c]));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <ShapeClusterCool className="-left-44 top-[42%] h-[85%] w-[38%] opacity-60" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10">
            <h1 className="mb-5 font-display text-4xl font-bold leading-snug text-calp-blue md:text-5xl">
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
                className="w-full rounded-md bg-calp-red px-7 py-3 text-center font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
              >
                Explore courses
              </Link>
              <a
                href="https://www.calpnetwork.org"
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-md bg-calp-red px-7 py-3 text-center font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
              >
                Visit the CALP Network website
              </a>
              <Link
                to="/calendar"
                className="w-full rounded-md border border-calp-red bg-transparent px-7 py-3 text-center font-medium text-calp-red transition-colors hover:bg-calp-red hover:text-white sm:w-auto"
              >
                Find a training
              </Link>
            </div>
          </div>

          <div className="relative">
            <ShapeClusterCool className="-left-16 -top-24 h-[140%] w-[105%]" />
            <ShapeClusterWarm className="-bottom-24 -right-24 h-[90%] w-[65%]" />
            <img
              src={heroAsset.url}
              alt="Humanitarian professionals in a CALP training workshop"
              width={1600}
              height={1100}
              className="relative z-10 aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>

        </div>
      </section>

      {/* Courses / trainings / trainers */}
      <section className="mx-auto grid max-w-7xl items-start gap-10 px-6 pb-16 lg:grid-cols-[1.7fr_1.1fr_1fr]">
        <div className="min-w-0">
          <SectionHead
            title="Explore our courses"
            linkLabel="View all courses"
            to="/courses"
          />
          <CourseAccordionList courses={allCourses} />
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
          <div className="grid grid-cols-3 gap-4">
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
      <h2 className="min-w-0 font-display text-xl font-bold text-calp-blue">
        {title}
      </h2>
      <Link
        to={to}
        className="shrink-0 text-base font-bold text-calp-blue underline-offset-4 hover:underline"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}
