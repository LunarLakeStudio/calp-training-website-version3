import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";


// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/courses", "/trainers", "/trainings", "/calendar", "/apply", "/contact"];
        const { fetchCourses, fetchTrainings } = await import("@/lib/content.server");
        const [courseList, trainingList] = await Promise.all([
          fetchCourses().catch(() => []),
          fetchTrainings().catch(() => []),
        ]);
        const coursePaths = courseList.map((c) => `/courses/${c.slug}`);
        const trainingPaths = trainingList.map((t) => `/trainings/${t.id}`);
        const all = [...staticPaths, ...coursePaths, ...trainingPaths];

        const urls = all
          .map(
            (p) =>
              `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
