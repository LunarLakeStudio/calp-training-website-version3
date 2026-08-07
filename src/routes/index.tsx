import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/hero-workshop.png.asset.json";
const heroImg = heroAsset.url;
import { useCourses, useTrainings } from "@/hooks/useData";
import { CourseCard } from "@/components/site/CourseCard";
import { TrainingRow } from "@/components/site/TrainingRow";
import { RedBlob, BlueBlob, RedCircle } from "@/components/site/BrandBlobs";
import { useLang } from "@/i18n/LanguageContext";
import { courses as fallbackCourses } from "@/data/courses";
import { upcomingTrainings as fallbackUpcoming } from "@/data/trainings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CALP Training Hub — Precision in Humanitarian Action" },
      {
        name: "description",
        content:
          "Explore multilingual training courses and upcoming trainings in Cash and Voucher Assistance, delivered by the CALP Network worldwide.",
      },
      { property: "og:title", content: "CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Multilingual, expert-led CVA training for the humanitarian sector — browse the catalogue and apply.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  const coursesQuery = useCourses();
  const trainingsQuery = useTrainings();
  const allCourses = coursesQuery.data ?? fallbackCourses;
  const featured = allCourses.slice(0, 3);
  const upcoming = trainingsQuery.data?.slice(0, 3) ?? fallbackUpcoming(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <header className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-2 lg:pt-20">
          <div className="relative z-10">

            <h1 className="mb-6 font-display text-6xl font-extrabold leading-[1.02] tracking-tight text-calp-blue md:text-7xl">
              Precision in <br />
              Humanitarian <br />
              <span className="italic text-calp-red">Action.</span>
            </h1>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-calp-ink">
              Advanced Cash and Voucher Assistance (CVA) training for the modern
              humanitarian sector. Multilingual, expert-led, and field-ready.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="rounded-md bg-calp-red px-8 py-4 font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              >
                {t("cta.explore")}
              </Link>
              <Link
                to="/calendar"
                className="rounded-md border-2 border-calp-red bg-white px-8 py-4 font-semibold text-calp-red transition-colors hover:bg-calp-red hover:text-white"
              >
                {t("cta.calendar")}
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Humanitarian workers in a training workshop"
              width={1600}
              height={1200}
              className="relative z-10 aspect-[4/3] w-full object-cover"
            />
          </div>
        </header>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <h2 className="mb-2 font-display text-4xl font-bold text-calp-blue">
              Featured Courses
            </h2>
            <p className="text-calp-ink">
              Certified pathways for every stage of your career.
            </p>
          </div>
          <Link
            to="/courses"
            className="whitespace-nowrap text-sm font-semibold text-calp-red hover:underline"
          >
            View all {allCourses.length} courses →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* Calendar preview */}
      <section className="relative overflow-hidden bg-calp-blue py-24 text-white">
        <BlueBlob className="-top-16 -left-16 h-[240px] w-[240px] opacity-10" />
        <RedBlob className="-right-24 top-6 h-[220px] w-[220px] opacity-80" />
        <RedCircle className="right-16 bottom-10 h-[80px] w-[80px] opacity-60" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="mb-6 font-display text-5xl font-bold leading-tight">
                Training <br /> Calendar
              </h2>
              <p className="mb-8 text-white/60">
                Join upcoming live and facilitated sessions across the globe. Dates
                populate automatically as trainers publish new sessions.
              </p>
              <Link
                to="/calendar"
                className="inline-block rounded-md border border-white/30 px-8 py-3 text-sm font-semibold transition-all hover:bg-white hover:text-calp-blue"
              >
                View full schedule
              </Link>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              {upcoming.map((tr) => (
                <TrainingRow key={tr.id} training={tr} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden">
        <BlueBlob className="-left-24 bottom-16 h-[240px] w-[240px] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-widest text-calp-red">
              Our Mission
            </h3>
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-calp-blue md:text-5xl">
              Choice &amp; dignity <br /> for people in crisis
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-calp-ink">
              We empower the humanitarian community to deliver high-quality CVA
              at scale, ensuring aid is effective, dignified, and responsive to
              local markets.
            </p>
            <div className="mt-10 flex gap-10">
              <Stat value="90+" label="Member Organisations" />
              <Stat value="42" label="Countries" />
              <Stat value="4" label="Languages" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="mb-2 block font-display text-5xl font-extrabold text-calp-red">
        {value}
      </span>
      <span className="text-xs font-medium text-calp-ink">{label}</span>
    </div>
  );
}
