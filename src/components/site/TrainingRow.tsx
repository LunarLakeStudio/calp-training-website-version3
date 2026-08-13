import { Link } from "@tanstack/react-router";
import type { Training } from "@/data/trainings";
import type { Course } from "@/data/courses";
import { useLang } from "@/i18n/LanguageContext";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function TrainingRow({
  training,
  course,
}: {
  training: Training;
  course?: Course;
  variant?: "dark" | "light";
}) {
  const { t } = useLang();
  const date = new Date(training.startDate);
  const isOnline = training.format === "Online";

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-b border-calp-blue/10 py-4 sm:flex">
      <div className="flex w-12 shrink-0 flex-col items-start">
        <span className="font-display text-2xl font-bold leading-snug text-calp-blue">
          {String(date.getUTCDate()).padStart(2, "0")}
        </span>
        <span className="mt-1 text-xs font-medium text-calp-blue">
          {MONTHS[date.getUTCMonth()]}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <Link
          to="/trainings/$trainingId"
          params={{ trainingId: training.id }}
          className="block truncate font-display text-sm font-bold text-calp-blue underline-offset-4 hover:underline"
        >
          {course?.title ?? `${training.city}, ${training.country}`}
        </Link>
        <p className="mt-1 truncate text-sm text-calp-ink">
          {isOnline ? "Online" : `${training.city}, ${training.country}`}
          {" • "}
          {isOnline ? "Virtual" : "In-person"}
          {" • "}
          {training.language}
        </p>
      </div>

      <Link
        to="/apply"
        search={{ training: training.id }}
        className="col-span-2 justify-self-start rounded-md bg-calp-red px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:col-span-1 sm:justify-self-auto"
      >
        {t("cta.apply")}
      </Link>
    </div>
  );
}
