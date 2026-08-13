// Server functions exposing shared-database content to the site.
// The database itself stays private; only these read endpoints are public.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getCourses = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchCourses } = await import("./content.server");
  return fetchCourses();
});

export const getCourseBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { fetchCourseBySlug } = await import("./content.server");
    return (await fetchCourseBySlug(data.slug)) ?? null;
  });

export const getCourseById = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ id: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { fetchCourseById } = await import("./content.server");
    return (await fetchCourseById(data.id)) ?? null;
  });

export const getTrainers = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchTrainers } = await import("./content.server");
  return fetchTrainers();
});

export const getTrainings = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchTrainings } = await import("./content.server");
  return fetchTrainings();
});

export const getTrainingById = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ id: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { fetchTraining } = await import("./content.server");
    return (await fetchTraining(data.id)) ?? null;
  });

export const getTrainingWithCourse = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ id: z.string().min(1).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const { fetchTraining, fetchCourseById } = await import("./content.server");
    const training = await fetchTraining(data.id);
    if (!training) return { training: null, course: null };
    const course = (await fetchCourseById(training.courseId)) ?? null;
    return { training, course };
  });

export const getTrainersPage = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z
      .object({
        country: z.string().max(120).nullish(),
        region: z.string().max(60).nullish(),
        language: z.string().max(20).nullish(),
        courseId: z.string().max(200).nullish(),
        query: z.string().max(120).nullish(),
        offset: z.number().int().min(0).max(100000).default(0),
        limit: z.number().int().min(1).max(48).default(12),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { fetchTrainersPage } = await import("./content.server");
    return fetchTrainersPage(data);
  });

export const getTrainerFacets = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchTrainerFacets } = await import("./content.server");
  return fetchTrainerFacets();
});
