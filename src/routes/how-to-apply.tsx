import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedPageHero } from "@/components/site/AnimatedPageHero";
import {
  ScrollReveal,
  ScrollRevealGrid,
  ScrollRevealGridItem,
} from "@/components/site/ScrollReveal";

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

const STEPS = [
  {
    title: "Choose a training",
    body: "Browse the available trainings and select the one you are interested in. Review the training details, including the course, dates, location, language and eligibility requirements.",
    circle: "bg-calp-teal",
  },
  {
    title: "Complete the form",
    body: "Click the Apply button to open the online application form. Complete all required fields, check that the information you have provided is correct and submit your application before the stated deadline.",
    circle: "bg-calp-blue",
  },
  {
    title: "Review and decision",
    body: "Your application will then be reviewed by the CALP Network training team. Once a decision has been made, you will receive an email confirming whether your application has been accepted or declined.",
    circle: "bg-calp-red",
  },
  {
    title: "Good to know",
    body: "Submitting an application does not guarantee a place. Please check your email regularly, including your spam or junk folder, so you do not miss any updates about your application.",
    circle: "bg-calp-blue-50",
  },
];

function HowToApplyPage() {
  return (
    <>
      <AnimatedPageHero
        eyebrow="Applications"
        title="How to apply for a CALP Network CVA training"
        intro="Everything you need to know before submitting an application."
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="bg-subtle-pattern pointer-events-none absolute inset-x-0 top-0 -z-10 h-full" />

        <ScrollRevealGrid className="grid gap-8 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <ScrollRevealGridItem key={step.title} className="h-full">
              <div className="h-full min-w-0 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_10px_30px_-14px_rgba(6,91,130,0.45)]">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full text-lg font-bold text-white ${step.circle}`}
                >
                  {i + 1}
                </span>
                <h2 className="mt-4 font-display text-xl font-bold text-calp-blue">
                  {step.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-calp-ink">
                  {step.body}
                </p>
              </div>
            </ScrollRevealGridItem>
          ))}
        </ScrollRevealGrid>

        <ScrollReveal>
          <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
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
        </ScrollReveal>
      </section>
    </>
  );
}
