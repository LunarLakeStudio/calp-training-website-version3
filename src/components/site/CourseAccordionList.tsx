import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import {
  BarChart3,
  BookOpen,
  ClipboardList,
  Coins,
  Globe,
  Plus,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import type { Course } from "@/data/courses";

const ICONS = [
  BookOpen,
  Coins,
  Users,
  ShieldCheck,
  BarChart3,
  Globe,
  ClipboardList,
  Workflow,
];

function iconFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) % 100000;
  return ICONS[hash % ICONS.length];
}

export function CourseAccordionList({ courses }: { courses: Course[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const navigate = useNavigate();


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
        const CourseIcon = iconFor(course.slug);
        return (
          <li
            key={course.id}
            onMouseEnter={canHover ? () => setOpenId(course.id) : undefined}
            onMouseLeave={canHover ? () => setOpenId((id) => (id === course.id ? null : id)) : undefined}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("a,button")) return;
              navigate({ to: "/courses", hash: course.slug });
            }}
            className={`cursor-pointer overflow-hidden rounded-xl border transition-colors ${

              open
                ? "border-calp-blue/40 bg-calp-pale-red-soft"
                : "border-calp-blue/10 bg-white hover:border-calp-blue/30"
            }`}
          >
            <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
              <span
                aria-hidden
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-calp-red/30 text-calp-red transition-colors sm:h-9 sm:w-9 ${
                  open ? "bg-white" : "bg-calp-pale-red-soft"
                }`}
              >
                <CourseIcon className="h-4 w-4" />
              </span>
              <Link
                to="/courses"
                hash={course.slug}
                onFocus={() => setOpenId(course.id)}
                className="min-w-0 font-display text-base font-bold leading-snug text-calp-blue underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-calp-blue"
              >
                {course.title}
              </Link>
              <button
                type="button"
                aria-expanded={open}
                aria-label={open ? `Hide details for ${course.title}` : `Show details for ${course.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenId((id) => (id === course.id ? null : course.id));
                }}
                className="justify-self-end focus:outline-none focus-visible:ring-2 focus-visible:ring-calp-blue rounded-md"
              >
                <span
                  aria-hidden
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border border-calp-blue/30 text-calp-blue transition-transform duration-300 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>

            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4">
                  <p className="mb-2 text-base leading-relaxed text-calp-ink">{course.summary}</p>
                  <Link
                    to="/courses/$courseId"
                    params={{ courseId: course.slug }}
                    tabIndex={open ? 0 : -1}
                    className="text-base font-medium text-calp-blue underline-offset-4 hover:underline"
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
