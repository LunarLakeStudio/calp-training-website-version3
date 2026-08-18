import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  ShapeClusterCool,
  ShapeClusterWarm,
} from "@/components/site/BrandShapes";
import { APPLY_STEPS } from "@/data/apply-steps";

const STEPS = APPLY_STEPS.map((s) => ({ title: s.title, body: s.short }));


export function HowToApply() {
  return (
    <section className="relative overflow-hidden bg-calp-pale-red-soft py-14">
      <ShapeClusterCool className="-left-40 -top-16 h-[130%] w-[18rem] opacity-60" />
      <ShapeClusterWarm className="-right-32 -bottom-20 h-[130%] w-[18rem] opacity-70" />



      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[200px_minmax(0,1fr)_auto] lg:items-center">
        <h2 className="font-display text-2xl font-bold text-calp-blue">
          How to apply
        </h2>

        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative flex min-w-0 gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-calp-blue text-base font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold text-calp-blue">
                  {s.title}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-calp-ink">
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
          to="/how-to-apply"
          className="justify-self-start rounded-md bg-calp-red px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
        >
          See application guidance
        </Link>
      </div>
    </section>
  );
}
