// Pure helpers operating on already-fetched arrays, mirroring the helpers
// previously exported from @/data/* but decoupled from static demo data.
import type { Course } from "@/data/courses";
import type { Trainer } from "@/data/trainers";
import type { Training } from "@/data/trainings";

export type TrainingFilter = {
  country?: string;
  courseId?: string;
  language?: string;
  month?: string; // YYYY-MM
};

export function allTopics(courses: Course[]): string[] {
  return Array.from(new Set(courses.flatMap((c) => c.topics))).sort();
}

export function allCourseLanguages(courses: Course[]): string[] {
  return Array.from(new Set(courses.flatMap((c) => c.languages))).sort();
}

export function getCourseForTraining(
  courses: Course[],
  training: Training,
): Course | undefined {
  return courses.find((c) => c.id === training.courseId);
}

export function getTrainingsForCourse(
  trainings: Training[],
  courseId: string,
): Training[] {
  return trainings
    .filter((t) => t.courseId === courseId)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function filterTrainings(
  trainings: Training[],
  f: TrainingFilter,
): Training[] {
  return trainings
    .filter((t) => (f.country ? t.country === f.country : true))
    .filter((t) => (f.courseId ? t.courseId === f.courseId : true))
    .filter((t) => (f.language ? t.language === f.language : true))
    .filter((t) => (f.month ? t.startDate.startsWith(f.month) : true))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function allCountries(trainings: Training[]): string[] {
  return Array.from(new Set(trainings.map((t) => t.country))).sort();
}

export function allTrainingLanguages(trainings: Training[]): string[] {
  return Array.from(new Set(trainings.map((t) => t.language))).sort();
}

export function upcomingTrainings(
  trainings: Training[],
  limit?: number,
): Training[] {
  const now = new Date().toISOString().slice(0, 10);
  const list = trainings
    .filter((t) => t.startDate >= now)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  return limit ? list.slice(0, limit) : list;
}

export function allTrainerLanguages(trainers: Trainer[]): string[] {
  return Array.from(new Set(trainers.flatMap((t) => t.languages))).sort();
}

export function allTrainerCountries(trainers: Trainer[]): string[] {
  return Array.from(
    new Set(trainers.map((t) => t.location.split(",").pop()!.trim())),
  ).sort();
}
