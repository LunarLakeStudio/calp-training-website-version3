import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Languages, Clock } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Training } from "@/data/trainings";
import type { Course } from "@/data/courses";

export function TrainingCard({
  training: t,
  course,
  applyLabel = "Apply",
}: {
  training: Training;
  course?: Course;
  applyLabel?: string;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-calp-blue/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-calp-blue/40 hover:shadow-lg">
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded bg-calp-blue px-2 py-1 text-sm font-bold text-white">
          {t.format}
        </span>
        <span className="rounded bg-calp-pale-teal px-2 py-1 text-sm font-bold">
          {t.language}
        </span>
        {course?.topics.slice(0, 1).map((tp) => (
          <span
            key={tp}
            className="rounded bg-calp-pale-red-soft px-2 py-1 text-sm font-bold text-calp-blue"
          >
            {tp}
          </span>
        ))}
      </div>
      <h3 className="mb-3 font-display text-lg font-bold leading-snug text-calp-blue">
        {course?.title ?? "Training"}
      </h3>
      <ul className="mb-6 space-y-2 text-base text-calp-ink">
        <li className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-calp-blue" />
          <span>
            {formatDate(t.startDate)} – {formatDate(t.endDate)}
          </span>
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-calp-blue" />
          <span>
            {t.city}, {t.country}
          </span>
        </li>
        {t.trainer ? (
          <li className="flex items-start gap-2">
            <Languages className="mt-0.5 h-4 w-4 shrink-0 text-calp-blue" />
            <span>{t.trainer}</span>
          </li>
        ) : null}
        {t.deadline ? (
          <li className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-calp-blue" />
            <span>Apply by {formatDate(t.deadline)}</span>
          </li>
        ) : null}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2">
        <Link
          to="/trainings/$trainingId"
          params={{ trainingId: t.id }}
          className="flex-1 rounded-lg border border-calp-blue/15 px-4 py-2 text-center text-sm font-bold text-calp-blue transition-colors hover:border-calp-blue"
        >
          Details
        </Link>
        <Link
          to="/apply"
          search={{ training: t.id }}
          className="flex-1 rounded-lg bg-calp-red px-4 py-2 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          {applyLabel}
        </Link>
      </div>
    </article>
  );
}
