import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTrainers } from "@/hooks/useData";
import { allTrainerLanguages, allTrainerCountries } from "@/lib/derive";
import { TrainerCard } from "@/components/site/TrainerCard";
import { FilterChip } from "@/components/site/FilterChip";
import { AnimatedPageHero } from "@/components/site/AnimatedPageHero";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { AnimatedGrid, AnimatedGridItem } from "@/components/site/AnimatedGrid";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Find a Trainer — CALP Training Hub" },
      {
        name: "description",
        content:
          "Identify a qualified CALP trainer who can meet your CVA-related training needs. Filter by language and country to find the right match.",
      },
      { property: "og:title", content: "Find a Trainer — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Identify a qualified CALP trainer who can meet your CVA-related training needs. Filter by language and country to find the right match.",
      },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  const { data: trainers = [], isLoading } = useTrainers();
  const [lang, setLang] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const languages = useMemo(() => allTrainerLanguages(trainers), [trainers]);
  const countries = useMemo(() => allTrainerCountries(trainers), [trainers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return trainers
      .filter((t) => (lang ? t.languages.includes(lang) : true))
      .filter((t) => (country ? t.location.endsWith(country) : true))
      .filter((t) =>
        q
          ? t.name.toLowerCase().includes(q) ||
            t.location.toLowerCase().includes(q)
          : true,
      );
  }, [trainers, lang, country, query]);

  return (
    <>
      <AnimatedPageHero
        eyebrow={
          <>
            <AnimatedCounter value={trainers.length} /> Certified Trainers
          </>
        }
        title="Find a trainer"
        intro={
          <>
            Identify a qualified trainer who can meet your CVA-related training
            needs. Use the filters to find trainers in your region—or beyond if
            needed—who can deliver a course in your preferred language. If you
            can’t find a suitable trainer, please contact{" "}
            <a
              href="mailto:training@calpnetwork.org"
              className="text-calp-red underline underline-offset-2 transition-colors hover:text-calp-red/80"
            >
              training@calpnetwork.org
            </a>
            , or{" "}
            <Link
              to="/courses"
              className="text-calp-red underline underline-offset-2 transition-colors hover:text-calp-red/80"
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
          <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-calp-navy/5 bg-white p-6 shadow-sm">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or location…"
              className="w-full rounded-lg border border-calp-navy/10 bg-calp-canvas px-4 py-3 text-sm outline-none placeholder:text-calp-slate focus:border-calp-red"
            />
            <div className="flex flex-col gap-3">
              <FilterGroup label="Language">
                <FilterChip active={lang === null} onClick={() => setLang(null)}>
                  All
                </FilterChip>
                {languages.map((lg) => (
                  <FilterChip
                    key={lg}
                    active={lang === lg}
                    onClick={() => setLang(lg)}
                  >
                    {lg}
                  </FilterChip>
                ))}
              </FilterGroup>
              <FilterGroup label="Country">
                <FilterChip active={country === null} onClick={() => setCountry(null)}>
                  All
                </FilterChip>
                {countries.map((c) => (
                  <FilterChip
                    key={c}
                    active={country === c}
                    onClick={() => setCountry(c)}
                  >
                    {c}
                  </FilterChip>
                ))}
              </FilterGroup>
            </div>
          </div>
        </ScrollReveal>

        <p className="mb-6 text-xs font-bold uppercase tracking-widest text-calp-slate">
          Showing {filtered.length} of {trainers.length}
        </p>

        {isLoading ? (
          <p className="py-16 text-center text-calp-slate">Loading trainers…</p>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-calp-slate">
            No trainers match those filters yet.
          </p>
        ) : (
          <AnimatedGrid className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((t) => (
              <AnimatedGridItem key={t.id} id={t.id}>
                <TrainerCard trainer={t} />
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
      <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-calp-slate">
        {label}
      </span>
      {children}
    </div>
  );
}
