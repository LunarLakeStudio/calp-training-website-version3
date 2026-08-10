import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  ShapeClusterCool,
  ShapeClusterWarm,
} from "@/components/site/BrandShapes";


const STEPS = [
  {
    title: "Find a training",
    body: "Browse our calendar and find a course that fits your needs.",
  },
  {
    title: "Complete the application",
    body: "Fill out the online application and submit the required information.",
  },
  {
    title: "Receive confirmation",
    body: "We'll review your application and get back to you soon.",
  },
];

export function HowToApply() {
  return (
    <section className="relative overflow-hidden bg-calp-pale-red py-14">
      <PaleTealCircle className="-left-10 top-0 h-40 w-40 opacity-70" />
      <PaleTealCircle className="-right-16 bottom-0 h-48 w-48 opacity-70" />
      <RedCircle className="-right-6 -bottom-10 h-36 w-36 opacity-90" />
      <TealCircle className="right-40 -top-12 h-24 w-24 opacity-40" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[200px_minmax(0,1fr)_auto] lg:items-center">
        <h2 className="font-display text-2xl font-bold text-calp-red">
          How to apply
        </h2>

        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative flex min-w-0 gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-calp-red text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-bold text-calp-blue">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-calp-ink">
                  {s.body}
                </p>
              </div>
              {i < STEPS.length - 1 ? (
                <ChevronRight
                  aria-hidden
                  className="absolute -right-4 top-1 hidden h-4 w-4 text-calp-blue-75 md:block"
                />
              ) : null}
            </li>
          ))}
        </ol>

        <Link
          to="/apply"
          className="justify-self-start rounded-md bg-calp-blue px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          See application guidance
        </Link>
      </div>
    </section>
  );
}
