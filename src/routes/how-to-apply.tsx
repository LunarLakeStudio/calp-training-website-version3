import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShapeClusterCool,
  ShapeClusterWarm,
} from "@/components/site/BrandShapes";

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
    <div>
      <section className="relative overflow-hidden bg-calp-pale-red-soft-soft">
        <ShapeClusterCool className="-right-24 -top-24 h-[150%] w-[26rem] opacity-70" />
        <header className="relative mx-auto max-w-7xl px-6 pt-16 pb-14">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-calp-blue">
            Applications
          </div>
          <h1 className="mb-6 max-w-3xl font-display text-4xl font-bold leading-snug text-balance text-calp-blue md:text-5xl">
            How to apply for a CALP Network CVA training
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-calp-ink">
            Everything you need to know before submitting an application.
          </p>
        </header>
      </section>

      <div className="mx-auto max-w-5xl px-6 pt-14">
        <ol className="grid gap-6 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative min-w-0 rounded-2xl border border-calp-blue-50 bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_-14px_rgba(6,91,130,0.45)]"
            >
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
              {i < 2 ? (
                <span
                  aria-hidden
                  className={`absolute -bottom-4 left-10 hidden h-4 w-0.5 md:block ${
                    i % 2 === 0 ? "bg-calp-pale-teal" : "bg-calp-pale-red-soft"
                  }`}
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <section className="relative mt-16 overflow-hidden bg-calp-pale-red-soft py-14">
        <ShapeClusterWarm className="-right-28 -top-16 h-[150%] w-[22rem] opacity-60" />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold text-calp-blue">
              Ready to apply?
            </h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-calp-ink">
              Find an upcoming training that fits your needs, or explore the full
              course catalogue first.
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
              className="rounded-md border border-calp-blue px-6 py-3 text-base font-bold text-calp-blue transition-colors hover:bg-white"
            >
              Browse courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
