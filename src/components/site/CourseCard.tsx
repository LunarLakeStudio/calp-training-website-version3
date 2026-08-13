import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to="/courses/$courseId"
      params={{ courseId: course.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-calp-blue/10 bg-white transition-shadow hover:shadow-lg hover:shadow-calp-blue/10"
    >
      <div className="aspect-[16/10] w-full overflow-hidden rounded-t-xl">
        <img
          src={course.cover}
          alt=""
          loading="lazy"
          width={1200}
          height={750}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-3 font-display text-base font-bold leading-snug text-calp-blue transition-colors group-hover:opacity-80">
          {course.title}
        </h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-calp-ink">
          {course.summary}
        </p>
        <div className="flex items-end justify-between gap-3">
          <span className="min-w-0 text-sm text-calp-ink">
            {course.duration}
            <br />
            {course.languages.join(", ")}
          </span>
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-calp-blue/30 text-calp-blue transition-colors group-hover:border-calp-blue group-hover:opacity-80"
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
