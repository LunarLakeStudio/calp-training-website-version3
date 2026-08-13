import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Loader2, RotateCcw } from "lucide-react";
import type { Trainer } from "@/data/trainers";
import { TrainerCard } from "@/components/site/TrainerCard";
import { FilterSelect } from "@/components/site/FilterSelect";
import { AnimatedPageHero } from "@/components/site/AnimatedPageHero";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { AnimatedGrid, AnimatedGridItem } from "@/components/site/AnimatedGrid";
import { getTrainersPage, getTrainerFacets } from "@/lib/content.functions";
import { useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 12;

const searchSchema = z.object({
  country: fallback(z.string(), "").default(""),
  region: fallback(z.string(), "").default(""),
  language: fallback(z.string(), "").default(""),
  course: fallback(z.string(), "").default(""),
  q: fallback(z.string(), "").default(""),
});

const LANG_LABELS: Record<string, string> = {
  EN: "English",
  FR: "French",
  ES: "Spanish",
  AR: "Arabic",
  PT: "Portuguese",
  SW: "Swahili",
  HI: "Hindi",
  UR: "Urdu",
  BN: "Bengali",
  TR: "Turkish",
};

const REGION_LABELS: Record<string, string> = {
  WCAF: "West & Central Africa",
  ESAF: "East & Southern Africa",
  MENA: "Middle East & North Africa",
  Asia: "Asia",
  LAC: "Latin America & Caribbean",
  Europe: "Europe",
  Global: "Global",
};

export const Route = createFileRoute("/trainers")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Find a Trainer — CALP Training Hub" },
      {
        name: "description",
        content:
          "Identify a qualified CALP trainer who can meet your CVA-related training needs. Filter by country, region, language and certified course.",
      },
      { property: "og:title", content: "Find a Trainer — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Identify a qualified CALP trainer who can meet your CVA-related training needs. Filter by country, region, language and certified course.",
      },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  const { country, region, language, course, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/trainers" });

  const setParam = (key: "country" | "region" | "language" | "course" | "q", value: string) =>
    navigate({ search: (prev) => ({ ...prev, [key]: value }) });

  const resetFilters = () =>
    navigate({ search: { country: "", region: "", language: "", course: "", q: "" } });

  const hasFilters = Boolean(country || region || language || course || q);

  const { data: facets } = useQuery({
    queryKey: ["trainer-facets"],
    queryFn: () => getTrainerFacets(),
    staleTime: 10 * 60 * 1000,
  });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["trainers-page", { country, region, language, course, q }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getTrainersPage({
        data: {
          country: country || null,
          region: region || null,
          language: language || null,
          courseId: course || null,
          query: q || null,
          offset: pageParam,
          limit: PAGE_SIZE,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((n, p) => n + p.trainers.length, 0);
      return loaded < lastPage.total ? loaded : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const trainers: Trainer[] = data?.pages.flatMap((p) => p.trainers) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  return (
    <>
      <AnimatedPageHero
        eyebrow="Certified Trainers"
        title="Find a trainer"
        intro={
          <>
            Identify a qualified trainer who can meet your CVA-related training
            needs. Use the filters to find trainers in your region—or beyond if
            needed—who can deliver a course in your preferred language. If you
            can’t find a suitable trainer, please contact{" "}
            <a
              href="mailto:training@calpnetwork.org"
              className="text-calp-blue underline-offset-4 hover:underline transition-colors hover:opacity-80"
            >
              training@calpnetwork.org
            </a>
            , or{" "}
            <Link
              to="/courses"
              className="text-calp-blue underline-offset-4 hover:underline transition-colors hover:opacity-80"
            >
              find out about other ways to access CALP training
            </Link>
            .
          </>
        }
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="bg-subtle-pattern pointer-events-none absolute inset-x-0 top-0 -z-10 h-full" />
        <ScrollReveal>
          <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm">
            <input
              type="search"
              value={q}
              onChange={(e) => setParam("q", e.target.value)}
              placeholder="Search by name or location…"
              className="w-full rounded-lg border border-calp-blue/10 bg-calp-canvas px-4 py-3 text-sm outline-none placeholder:text-calp-ink focus:border-calp-blue"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FilterSelect
                label="Country"
                placeholder="All Countries"
                value={country || null}
                onChange={(v) => setParam("country", v ?? "")}
                options={(facets?.countries ?? []).map((c) => ({ value: c, label: c }))}
              />
              <FilterSelect
                label="Region"
                placeholder="All Regions"
                value={region || null}
                onChange={(v) => setParam("region", v ?? "")}
                options={(facets?.regions ?? []).map((r) => ({
                  value: r,
                  label: REGION_LABELS[r] ?? r,
                }))}
              />
              <FilterSelect
                label="Language"
                placeholder="All Languages"
                value={language || null}
                onChange={(v) => setParam("language", v ?? "")}
                options={(facets?.languages ?? []).map((l) => ({
                  value: l,
                  label: LANG_LABELS[l] ?? l,
                }))}
              />
              <FilterSelect
                label="Certified course"
                placeholder="All Certified Courses"
                value={course || null}
                onChange={(v) => setParam("course", v ?? "")}
                options={(facets?.courses ?? []).map((c) => ({
                  value: c.id,
                  label: c.title,
                }))}
              />
            </div>
            {hasFilters && (
              <div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-calp-red/30 px-3 py-2 text-xs font-bold text-calp-red transition-colors hover:bg-calp-red/5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        <p className="mb-6 text-xs font-bold text-calp-ink">
          Showing {trainers.length} of {total}
        </p>

        {isLoading ? (
          <p className="flex items-center gap-2 py-16 text-sm text-calp-ink">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading trainers…
          </p>
        ) : trainers.length === 0 ? (
          <p className="py-16 text-calp-ink">
            No trainers match those filters yet.
          </p>
        ) : (
          <>
            <AnimatedGrid className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {trainers.map((t) => (
                <AnimatedGridItem key={t.id} id={t.id}>
                  <TrainerCard trainer={t} />
                </AnimatedGridItem>
              ))}
            </AnimatedGrid>

            {hasNextPage && (
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="inline-flex items-center gap-2 rounded-lg bg-calp-red px-5 py-3 text-sm font-bold text-white transition-colors hover:opacity-90 disabled:opacity-70"
                >
                  {isFetchingNextPage && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isFetchingNextPage ? "Loading trainers…" : "Load More Trainers"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
