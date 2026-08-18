import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedPageHero } from "@/components/site/AnimatedPageHero";
import {
  ShapeClusterCool,
  ShapeClusterWarm,
} from "@/components/site/BrandShapes";
import {
  ScrollReveal,
  ScrollRevealGrid,
  ScrollRevealGridItem,
} from "@/components/site/ScrollReveal";
import { APPLY_NOTE, APPLY_STEPS } from "@/data/apply-steps";

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

const STEPS = APPLY_STEPS;


function HowToApplyPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <ShapeClusterCool className="-left-52 -top-24 h-[135%] w-[24rem] opacity-60" />
        <ShapeClusterWarm className="-right-44 -bottom-20 h-[130%] w-[24rem] opacity-70" />
        <AnimatedPageHero
          className="relative z-10"
          eyebrow="Applications"
          title="How to apply for a CALP Network CVA training"
          intro="Everything you need to know before submitting an application."
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="bg-subtle-pattern pointer-events-none absolute inset-x-0 top-0 -z-10 h-full" />

        <ScrollRevealGrid className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <ScrollRevealGridItem key={step.title} className="h-full">
              <div className="h-full min-w-0 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_10px_30px_-14px_rgba(6,91,130,0.45)]">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-calp-blue text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h2 className="mt-4 font-display text-xl font-bold text-calp-blue">
                  {step.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-calp-ink">
                  {step.full}
                </p>
              </div>
            </ScrollRevealGridItem>
          ))}
        </ScrollRevealGrid>

        <ScrollReveal>
          <div className="mt-8 min-w-0 rounded-2xl border border-calp-blue/10 bg-muted p-6">
            <h2 className="font-display text-xl font-bold text-calp-blue">
              {APPLY_NOTE.title}
            </h2>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-calp-ink">
              {APPLY_NOTE.body}
            </p>
          </div>
        </ScrollReveal>


        <ScrollReveal>
          <div className="relative mt-8">
            <ShapeClusterCool className="-bottom-12 -left-20 h-56 w-56 opacity-60" />
            <ShapeClusterWarm className="-bottom-14 -right-24 h-60 w-60 opacity-70" />
            <div className="relative z-10 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm">
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
                className="rounded-md bg-calp-red px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                Find a Training
              </Link>
              <Link
                to="/courses"
                className="rounded-md border border-calp-blue px-6 py-3 text-base font-bold text-calp-blue transition-colors hover:bg-calp-canvas"
              >
                Browse courses
              </Link>
            </div>
            </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
