import { Link } from "@tanstack/react-router";
import type { Course } from "@/data/courses";
import { useLang } from "@/i18n/LanguageContext";

export function CourseCard({ course }: { course: Course }) {
  const { t } = useLang();
  return (
    <Link
      to="/courses/$courseId"
      params={{ courseId: course.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-calp-navy/5 bg-white transition-all hover:shadow-2xl hover:shadow-calp-navy/5"
    >
      <div className="aspect-[16/10] w-full overflow-hidden bg-calp-canvas">
        <img
          src={course.cover}
          alt=""
          loading="lazy"
          width={1200}
          height={750}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-6 flex items-start justify-between">
          <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-calp-navy">
            {course.level} Level
          </span>
          <span className="text-xs text-calp-slate">{course.duration}</span>
        </div>
        <h3 className="mb-4 font-display text-xl font-bold leading-tight text-balance transition-colors group-hover:text-calp-red">
          {course.title}
        </h3>
        <p className="mb-6 line-clamp-3 flex-1 text-sm text-calp-slate">
          {course.summary}
        </p>
        <div className="flex items-center justify-between border-t border-calp-navy/5 pt-6">
          <span className="text-xs font-medium text-calp-navy">
            {course.languages.join(", ")}
          </span>
          <span className="text-sm font-bold text-calp-red">
            {t("cta.learnMore")} →
          </span>
        </div>
      </div>
    </Link>
  );
}
