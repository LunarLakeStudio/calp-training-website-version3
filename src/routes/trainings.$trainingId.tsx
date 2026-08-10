import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import type { Course } from "@/data/courses";
import type { Training } from "@/data/trainings";
import { getTrainingWithCourse } from "@/lib/content.functions";
import { submitApplication } from "@/lib/submissions.functions";
import { LANGS } from "@/i18n/dict";
import { CalendarDays, MapPin, Clock, User, Languages } from "lucide-react";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/trainings/$trainingId")({
  loader: async ({ params }) => {
    const result = (await getTrainingWithCourse({
      data: { id: params.trainingId },
    })) as { training: Training | null; course: Course | null };
    if (!result.training) throw notFound();
    return { training: result.training, course: result.course ?? undefined };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            {
              title: `${loaderData.course?.title ?? "Training"} · ${loaderData.training.city} — CALP`,
            },
            {
              name: "description",
              content: `Apply for the ${loaderData.course?.title ?? "training"} in ${loaderData.training.city}, ${loaderData.training.country}. Delivered in ${loaderData.training.language}.`,
            },
            {
              property: "og:title",
              content: `${loaderData.course?.title ?? "Training"} · ${loaderData.training.city}`,
            },
            {
              property: "og:description",
              content: `Delivered in ${loaderData.training.language} · ${loaderData.training.format} · Deadline ${loaderData.training.deadline}`,
            },
            ...(loaderData.course
              ? [{ property: "og:image", content: loaderData.course.cover }]
              : []),
          ],
        }
      : {},
  component: TrainingDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-6 py-24 text-center">
      <h1 className="mb-4 font-display text-3xl font-bold">Training not found</h1>
      <Link to="/calendar" className="text-calp-red">
        ← Back to calendar
      </Link>
    </div>
  ),
});


const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  organization: z.string().trim().min(2, "Organization required").max(160),
  country: z.string().trim().min(2, "Country required").max(80),
  applicationLanguage: z.enum(["en", "fr", "es", "ar"]),
  motivation: z
    .string()
    .trim()
    .min(20, "Please share at least a couple of sentences")
    .max(1500, "Please keep under 1500 characters"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

function TrainingDetail() {
  const { training, course } = Route.useLoaderData();
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const dateRange = `${formatDate(training.startDate)} – ${formatDate(training.endDate)}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = applicationSchema.safeParse(raw);
    if (!parsed.success) {
      const flat: Partial<Record<keyof ApplicationForm, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ApplicationForm;
        if (!flat[k]) flat[k] = issue.message;
      }
      setErrors(flat);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const result = await submitApplication({
      data: {
        training_id: training.id,
        name: parsed.data.fullName,
        email: parsed.data.email,
        organisation: parsed.data.organization,
        country: parsed.data.country,
        language: parsed.data.applicationLanguage,
      },
    }).catch(() => ({ ok: false as const }));
    setSubmitting(false);
    if (!result.ok) {
      toast.error("Could not submit", {
        description: "Applications are not open for this session yet. Please try again later.",
      });
      return;
    }
    toast.success("Application received", {
      description: `We'll email ${parsed.data.email} once your application is reviewed.`,
    });
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <header className="border-b border-calp-blue/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Link
            to="/calendar"
            className="mb-6 inline-block text-xs font-bold text-calp-red"
          >
            ← Calendar
          </Link>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded bg-calp-blue px-2 py-1 text-[10px] font-bold text-white">
              {training.format}
            </span>
            <span className="rounded bg-calp-pale-teal px-2 py-1 text-[10px] font-bold">
              {training.language}
            </span>
          </div>
          <h1 className="mb-4 max-w-3xl font-display text-4xl font-bold leading-tight text-balance text-calp-red md:text-5xl">
            {course?.title ?? "Training"}
          </h1>
          <p className="text-lg text-calp-ink">
            {training.city}, {training.country} · {dateRange}
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1fr_1.2fr]">
        <aside className="space-y-6">
          <h2 className="font-display text-sm font-bold text-calp-red">
            Training details
          </h2>
          <ul className="space-y-4 rounded-2xl border border-calp-blue/5 bg-white p-6 shadow-sm">
            <DetailItem icon={CalendarDays} label="Dates" value={dateRange} />
            <DetailItem icon={MapPin} label="Venue" value={training.venue} />
            <DetailItem
              icon={Clock}
              label="Application deadline"
              value={formatDate(training.deadline)}
            />
            <DetailItem icon={User} label="Lead trainer" value={training.trainer} />
            <DetailItem
              icon={Languages}
              label="Delivered in"
              value={training.language}
            />
          </ul>
          {course ? (
            <Link
              to="/courses/$courseId"
              params={{ courseId: course.slug }}
              className="block rounded-xl border border-calp-blue/10 bg-white p-6 transition-colors hover:border-calp-red/40"
            >
              <p className="mb-1 text-xs font-bold text-calp-ink">
                About the course
              </p>
              <p className="text-sm font-semibold text-calp-blue">{course.title}</p>
              <p className="mt-2 line-clamp-3 text-sm text-calp-ink">
                {course.summary}
              </p>
            </Link>
          ) : null}
        </aside>

        <div>
          <h2 className="mb-2 font-display text-3xl font-bold">Apply for this training</h2>
          <p className="mb-8 text-calp-ink">
            Applications are reviewed on a rolling basis. You'll receive a confirmation
            by email within five working days.
          </p>
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <Field label="Full name" name="fullName" error={errors.fullName} />
            <Field
              label="Email"
              name="email"
              type="email"
              error={errors.email}
            />
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Organization"
                name="organization"
                error={errors.organization}
              />
              <Field label="Country" name="country" error={errors.country} />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-calp-ink">
                Language of application
              </label>
              <select
                name="applicationLanguage"
                defaultValue="en"
                className="w-full rounded-lg border border-calp-blue/10 bg-white px-4 py-3 text-sm outline-none focus:border-calp-red"
              >
                {LANGS.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native}
                  </option>
                ))}
              </select>
              {errors.applicationLanguage ? (
                <p className="mt-1 text-xs text-calp-red">{errors.applicationLanguage}</p>
              ) : null}
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-calp-ink">
                Motivation
              </label>
              <textarea
                name="motivation"
                rows={5}
                maxLength={1500}
                placeholder="Tell us about your current role and what you hope to gain from this training…"
                className="w-full rounded-lg border border-calp-blue/10 bg-white px-4 py-3 text-sm outline-none focus:border-calp-red"
              />
              {errors.motivation ? (
                <p className="mt-1 text-xs text-calp-red">{errors.motivation}</p>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-calp-red px-8 py-4 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit application"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-calp-red" />
      <div>
        <p className="text-[10px] font-bold text-calp-ink">
          {label}
        </p>
        <p className="text-sm font-medium text-calp-blue">{value}</p>
      </div>
    </li>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-calp-ink">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="w-full rounded-lg border border-calp-blue/10 bg-white px-4 py-3 text-sm outline-none focus:border-calp-red"
      />
      {error ? <p className="mt-1 text-xs text-calp-red">{error}</p> : null}
    </div>
  );
}
