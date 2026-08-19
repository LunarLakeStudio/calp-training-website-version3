import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ClipboardList, Info, MailCheck, Search } from "lucide-react";
import heroAsset from "@/assets/how-to-apply-hero.png.asset.json";
import {
  ShapeClusterCool,
  ShapeClusterWarm,
} from "@/components/site/BrandShapes";
import {
  ScrollReveal,
  ScrollRevealGrid,
  ScrollRevealGridItem,
} from "@/components/site/ScrollReveal";
import { APPLY_CHECKLIST, APPLY_NOTE, APPLY_STEPS } from "@/data/apply-steps";

export const Route = createFileRoute("/how-to-apply")({
  head: () => ({
    meta: [
      { title: "How to apply — CALP Training Hub" },
      {
        name: "description",
        content:
          "Step-by-step guidance on applying for a CALP Network CVA training: choosing a training, completing the application form and what happens after you apply.",
      },
      { property: "og:title", content: "How to apply — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "How to browse trainings, submit your application before the deadline and what happens once the CALP training team reviews it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/how-to-apply" }],
  }),
  component: HowToApplyPage,
});

const STEP_ICONS = [Search, ClipboardList, MailCheck];

function HowToApplyPage() {
  return (
    <>
      {/* Split hero */}
      <section className="relative overflow-hidden">
        <ShapeClusterCool className="-left-44 top-[42%] h-[85%] w-[38%] opacity-60" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-14 pb-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-calp-pale-red-soft px-3 py-1 text-sm font-bold text-calp-blue">
              Applications
            </div>
            <h1 className="mb-5 max-w-xl font-display text-4xl font-bold leading-snug text-balance text-calp-blue md:text-5xl">
              How to apply for a CALP Network training
            </h1>
            <p className="mb-8 max-w-md text-base leading-relaxed text-calp-ink">
              Find the right training, complete your application and receive a
              decision from the CALP Network training team.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/trainings"
                className="w-full rounded-md bg-calp-red px-7 py-3 text-center font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
              >
                Find a Training
              </Link>
              <Link
                to="/courses"
                className="w-full rounded-md border border-calp-blue bg-transparent px-7 py-3 text-center font-medium text-calp-blue transition-colors hover:bg-calp-blue hover:text-white sm:w-auto"
              >
                Browse courses
              </Link>
            </div>
          </div>

          <div className="relative">
            <ShapeClusterCool className="-left-24 -top-24 -z-10 h-[125%] w-[55%] opacity-70" />
            <ShapeClusterWarm className="-bottom-24 -right-24 -z-10 h-[90%] w-[55%] opacity-70" />
            <img
              src={heroAsset.url}
              alt="A training participant completing an online application form on a laptop"
              className="relative z-10 aspect-[4/3] w-full rounded-2xl object-cover object-[70%_center]"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20">
        <div className="bg-subtle-pattern pointer-events-none absolute inset-x-0 top-0 -z-10 h-full" />
        <ShapeClusterWarm className="-right-40 top-4 -z-10 h-[60%] w-[18rem] opacity-55" />
        <ShapeClusterCool className="-left-44 bottom-0 -z-10 h-[55%] w-[18rem] opacity-50" />

        <ScrollReveal>
          <h2 className="mb-10 font-display text-3xl font-bold text-calp-blue">
            Your application in three simple steps
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* connector line, desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16%] right-[16%] top-[3.25rem] hidden h-px bg-calp-blue/15 md:block"
          />
          <ScrollRevealGrid className="relative grid gap-8 md:grid-cols-3">
            {APPLY_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Search;
              return (
                <ScrollRevealGridItem key={step.title} className="h-full">
                  <div className="flex h-full min-w-0 flex-col rounded-2xl border border-calp-blue/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-[0_10px_30px_-14px_rgba(6,91,130,0.45)]">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-calp-blue text-lg font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-calp-red">
                        <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-calp-blue">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-calp-ink">
                      {step.full}
                    </p>
                  </div>
                </ScrollRevealGridItem>
              );
            })}
          </ScrollRevealGrid>
        </div>

        {/* Information panel */}
        <ScrollReveal>
          <div className="relative mt-12 grid gap-10 overflow-hidden rounded-2xl bg-calp-pale-blue-soft p-8 md:grid-cols-2 md:p-10">
            <ShapeClusterCool className="-right-16 -bottom-16 h-[85%] w-[14rem] opacity-50" />
            <div className="relative z-10 min-w-0">
              <h2 className="font-display text-xl font-bold text-calp-blue">
                Before you apply
              </h2>
              <ul className="mt-4 space-y-3">
                {APPLY_CHECKLIST.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-calp-red"
                      strokeWidth={3}
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-calp-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-calp-blue">
                <Info className="h-5 w-5 text-calp-blue" aria-hidden />
                {APPLY_NOTE.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-calp-ink">
                {APPLY_NOTE.body}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-calp-pale-red-soft py-10">
        <ShapeClusterCool className="-left-40 -top-16 h-[130%] w-[16rem] opacity-60" />
        <ShapeClusterWarm className="-right-32 -bottom-20 h-[130%] w-[16rem] opacity-70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-bold text-calp-blue">
                  Ready to apply?
                </h2>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-calp-ink">
                  Find an upcoming training that fits your needs, or explore the
                  full course catalogue first.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/trainings"
                  className="rounded-md bg-calp-red px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
                >
                  Find a Training
                </Link>
                <Link
                  to="/courses"
                  className="rounded-md border border-calp-blue px-6 py-3 text-base font-medium text-calp-blue transition-colors hover:bg-calp-canvas"
                >
                  Browse courses
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
