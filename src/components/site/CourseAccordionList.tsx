import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Course } from "@/data/courses";

export function CourseAccordionList({ courses }: { courses: Course[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <ul className="flex flex-col gap-2">
      {courses.map((course) => {
        const open = openId === course.id;
        return (
          <li
            key={course.id}
            onMouseEnter={canHover ? () => setOpenId(course.id) : undefined}
            onMouseLeave={canHover ? () => setOpenId((id) => (id === course.id ? null : id)) : undefined}
            className={`overflow-hidden rounded-xl border transition-colors ${
              open
                ? "border-calp-blue/40 bg-calp-pale-red-soft"
                : "border-calp-blue/10 bg-white hover:border-calp-blue/30"
            }`}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId((id) => (id === course.id ? null : course.id))}
              onFocus={() => setOpenId(course.id)}
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-calp-blue"
            >
              <span className="min-w-0 font-display text-sm font-medium leading-snug text-calp-blue">
                {course.title}
              </span>
              <span
                aria-hidden
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border border-calp-blue/30 text-calp-blue transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4">
                  <p className="mb-2 text-sm leading-relaxed text-calp-ink">{course.summary}</p>
                  <Link
                    to="/courses/$courseId"
                    params={{ courseId: course.slug }}
                    tabIndex={open ? 0 : -1}
                    className="text-sm font-medium text-calp-blue underline-offset-4 hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
