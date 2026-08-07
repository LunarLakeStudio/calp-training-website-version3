import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-7xl px-6 pt-16 pb-12">
      {eyebrow ? (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-calp-red/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-calp-red">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="mb-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
        {title}
      </h1>
      {intro ? (
        <p className="max-w-2xl text-lg leading-relaxed text-calp-ink">{intro}</p>
      ) : null}
      {children}
    </header>
  );
}
