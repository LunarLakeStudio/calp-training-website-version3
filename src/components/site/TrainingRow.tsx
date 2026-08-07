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
  variant = "dark",
}: {
  training: Training;
  course?: Course;
  variant?: "dark" | "light";
}) {
  const { t } = useLang();
  const date = new Date(training.startDate);
  const isDark = variant === "dark";

  return (
    <Link
      to="/trainings/$trainingId"
      params={{ trainingId: training.id }}
      className={
        "group flex items-center gap-6 rounded-xl border p-6 transition-colors " +
        (isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-calp-navy/10 bg-white hover:border-calp-red/40 hover:shadow-lg hover:shadow-calp-navy/5")
      }
    >
      <div className="flex min-w-[60px] flex-col items-center">
        <span className="text-[10px] font-bold uppercase text-calp-red">
          {MONTHS[date.getUTCMonth()]}
        </span>
        <span className="font-display text-2xl font-bold">
          {String(date.getUTCDate()).padStart(2, "0")}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className={"truncate text-lg font-semibold " + (isDark ? "text-white" : "text-calp-navy")}>
          {training.city}, {training.country} · {training.format}
        </h4>
        <p className={"truncate text-sm " + (isDark ? "text-white/50" : "text-calp-slate")}>
          {course?.title ?? "Training"}
          <span className="ml-2 rounded bg-black/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            {training.language}
          </span>
        </p>
      </div>
      <span className="rounded-md bg-calp-red px-5 py-2.5 text-sm font-semibold text-white transition-transform group-hover:-translate-y-0.5">
        {t("cta.apply")}
      </span>
    </Link>
  );
}
