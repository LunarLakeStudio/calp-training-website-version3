// React Query hooks wrapping the server functions that read the shared
// database. The database is only reachable from the server.
import { useQuery } from "@tanstack/react-query";
import type { Course } from "@/data/courses";
import { courses as fallbackCourses } from "@/data/courses";
import type { Trainer } from "@/data/trainers";
import { trainers as fallbackTrainers } from "@/data/trainers";
import type { Training } from "@/data/trainings";
import { upcomingTrainings as fallbackUpcoming } from "@/data/trainings";
import {
  getCourses,
  getCourseBySlug,
  getTrainers,
  getTrainings,
  getTrainingById,
} from "@/lib/content.functions";

// Until the Training Hub database is connected, the site falls back to the
// canonical 10-course catalogue in src/data/courses.ts.
export function useCourses() {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const rows = (await getCourses()) as Course[];
        return rows?.length ? rows : fallbackCourses;
      } catch {
        return fallbackCourses;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCourse(slug: string) {
  return useQuery<Course | null>({
    queryKey: ["course", slug],
    queryFn: async () => {
      try {
        const row = (await getCourseBySlug({ data: { slug } })) as Course | null;
        return row ?? fallbackCourses.find((c) => c.slug === slug) ?? null;
      } catch {
        return fallbackCourses.find((c) => c.slug === slug) ?? null;
      }
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrainers() {
  return useQuery<Trainer[]>({
    queryKey: ["trainers"],
    queryFn: async () => {
      try {
        const rows = (await getTrainers()) as Trainer[];
        return rows?.length ? rows : fallbackTrainers;
      } catch {
        return fallbackTrainers;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrainings() {
  return useQuery<Training[]>({
    queryKey: ["trainings"],
    queryFn: async () => {
      try {
        const rows = (await getTrainings()) as Training[];
        return rows?.length ? rows : fallbackUpcoming();
      } catch {
        return fallbackUpcoming();
      }
    },
    staleTime: 60 * 1000,
  });
}

export function useTraining(id: string) {
  return useQuery<Training | null>({
    queryKey: ["training", id],
    queryFn: async () => {
      try {
        return (await getTrainingById({ data: { id } })) as Training | null;
      } catch {
        return fallbackUpcoming().find((t) => t.id === id) ?? null;
      }
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}
