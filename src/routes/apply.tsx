import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useCourses, useTrainings, useTrainers } from "@/hooks/useData";
import { submitApplication } from "@/lib/submissions.functions";
import { ORGANISATION_TYPES } from "@/lib/submissions.schema";
import { courses as fallbackCourses } from "@/data/courses";
import { trainers as fallbackTrainers } from "@/data/trainers";
import { upcomingTrainings as fallbackUpcoming } from "@/data/trainings";
import { formatDate } from "@/lib/format";
import calpLogo from "@/assets/calp-logo-official.png.asset.json";

const searchSchema = z.object({
  training: fallback(z.string(), "").default(""),
  course: fallback(z.string(), "").default(""),
  trainer: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/apply")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Apply for a training — CALP Training Hub" },
      {
        name: "description",
        content:
          "Apply for an upcoming CALP training. Select a course, training and preferred trainer, then complete the CALP application form.",
      },
      { property: "og:title", content: "Apply for a training — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Select a course, training and trainer, then complete the CALP application form.",
      },
    ],
  }),
  component: ApplyPage,
});

const GENDER = [
  "Female",
  "Male",
  "Prefer not to say",
  "Prefer to self-describe",
  "Other",
] as const;

const ORG_TYPES = [
  "International Non-Governmental Organisation (INGO)",
  "National Non-Governmental Organisation (NNGO)",
  "Red Cross / Red Crescent Movement",
  "United Nations Agency (UN)",
  "Donor",
  "Private Sector Organisation",
  "Independent Consultant / Individual",
  "Other",
] as const;

const HEARD_ABOUT = [
  "Cash Learning Hub / Kaya",
  "CALP Website",
  "D Groups",
  "CALP Newsletter",
  "Referral from line manager",
  "Cash Working Group",
  "Communication with colleagues",
  "Other",
] as const;

const YEARS_CVA = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "More than 5 years",
  "Never",
] as const;

const YES_NO = ["Yes", "No"] as const;

const CONSENT_FOLLOWUP = [
  "Yes, I consent (12 months)",
  "No, thank you",
] as const;

const applicationSchema = z
  .object({
    course: z.string().min(1, "Please select a course"),
    training: z.string().min(1, "Please select a training"),
    trainer: z.string().optional().default(""),

    fullName: z.string().trim().min(2, "Please enter your name").max(160),
    gender: z.string().optional().default(""),
    genderSelfDescribe: z.string().optional().default(""),
    orgType: z.string().optional().default(""),
    organisation: z.string().trim().min(2, "Organisation required").max(200),
    position: z.string().trim().min(2, "Position required").max(160),
    placeOfWork: z.string().trim().min(2, "Place of work required").max(200),
    email: z.string().trim().email("Please enter a valid email").max(255),
    altEmail: z
      .string()
      .trim()
      .max(255)
      .optional()
      .refine((v) => !v || /.+@.+\..+/.test(v), "Please enter a valid email"),
    phone: z.string().trim().max(40).optional().default(""),

    lmApproved: z.enum(YES_NO, { message: "Please confirm" }),
    lmContact: z.string().trim().max(300).optional().default(""),

    heardAbout: z.string().optional().default(""),
    heardAboutOther: z.string().trim().max(200).optional().default(""),

    cvaFundamentals: z.enum(YES_NO, { message: "Please answer" }),
    mbpModule1: z.enum(YES_NO, { message: "Please answer" }),
    yearsCVA: z.enum(YEARS_CVA, { message: "Please select" }),
    cvaInRole: z
      .string()
      .trim()
      .min(20, "Please share at least a couple of sentences")
      .max(1500),
    motivation: z
      .string()
      .trim()
      .min(20, "Please share at least a couple of sentences")
      .max(1500),

    newsletterOptIn: z.string().optional().default(""),
    followUpConsent: z.string().optional().default(""),
  })
  .refine(
    (d) =>
      d.gender !== "Prefer to self-describe" ||
      (d.genderSelfDescribe && d.genderSelfDescribe.trim().length > 0),
    { message: "Please self-describe", path: ["genderSelfDescribe"] },
  )
  .refine(
    (d) => d.lmApproved !== "Yes" || (d.lmContact && d.lmContact.trim().length > 0),
    { message: "Please provide line manager name and email", path: ["lmContact"] },
  );

type ApplicationForm = z.infer<typeof applicationSchema>;

function ApplyPage() {
  const {
    training: preselectedTrainingId,
    course: preselectedCourseId,
    trainer: preselectedTrainerId,
  } = Route.useSearch();

  const coursesQuery = useCourses();
  const trainingsQuery = useTrainings();
  const trainersQuery = useTrainers();

  const allUpcoming = trainingsQuery.data ?? fallbackUpcoming();
  const sortedCourses = useMemo(
    () =>
      [...(coursesQuery.data ?? fallbackCourses)].sort((a, b) =>
        a.title.localeCompare(b.title),
      ),
    [coursesQuery.data],
  );
  const sortedTrainers = useMemo(
    () =>
      [...(trainersQuery.data ?? fallbackTrainers)].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [trainersQuery.data],
  );

  const trainingMap = useMemo(() => {
    const m = new Map(allUpcoming.map((t) => [t.id, t]));
    return m;
  }, [allUpcoming]);
  const preselectedTraining = preselectedTrainingId
    ? trainingMap.get(preselectedTrainingId)
    : undefined;

  const [course, setCourse] = useState<string>(
    preselectedTraining?.courseId || preselectedCourseId || "",
  );
  const [training, setTraining] = useState<string>(
    preselectedTraining?.id ?? "",
  );
  const [trainer, setTrainer] = useState<string>(preselectedTrainerId ?? "");
  const [gender, setGender] = useState<string>("");
  const [lmApproved, setLmApproved] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const availableTrainings = useMemo(
    () => (course ? allUpcoming.filter((t) => t.courseId === course) : []),
    [course, allUpcoming],
  );

  const activeTraining = training ? trainingMap.get(training) : undefined;
  const activeCourse = course
    ? sortedCourses.find((c) => c.id === course)
    : undefined;
  const trainingLang = activeTraining?.language;
  const languageMatchedTrainers = useMemo(() => {
    if (!trainingLang) return [];
    return sortedTrainers.filter((t) => t.languages.includes(trainingLang));
  }, [sortedTrainers, trainingLang]);
  const noLanguageMatch = !!training && languageMatchedTrainers.length === 0;
  const trainerOptions = noLanguageMatch
    ? sortedTrainers
    : languageMatchedTrainers;

  function onCourseChange(next: string) {
    setCourse(next);
    if (training) {
      const t = trainingMap.get(training);
      if (!t || t.courseId !== next) {
        setTraining("");
        setTrainer("");
      }
    }
  }

  function onTrainingChange(next: string) {
    setTraining(next);
    setTrainer("");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = applicationSchema.safeParse(raw);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0] ?? "");
        if (k && !flat[k]) flat[k] = issue.message;
      }
      setErrors(flat);
      const firstKey = Object.keys(flat)[0];
      if (firstKey) {
        const el = document.querySelector(`[name="${firstKey}"]`);
        (el as HTMLElement | null)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }
    const t = trainingMap.get(parsed.data.training);
    if (!t || t.courseId !== parsed.data.course) {
      setErrors({ training: "Selected training does not match the course" });
      return;
    }
    setErrors({});
    setSubmitting(true);

    const ORG_MAP: Record<string, string> = {
      "International Non-Governmental Organisation (INGO)": "INGO",
      "National Non-Governmental Organisation (NNGO)": "NNGO",
      "Red Cross / Red Crescent Movement": "RCRC Society",
      "United Nations Agency (UN)": "UN Agency",
      Donor: "Donor",
      "Private Sector Organisation": "Private Sector",
      "Independent Consultant / Individual": "Independent Consultant",
      Other: "Other",
    };
    const genderVal =
      parsed.data.gender === "Female" || parsed.data.gender === "Male"
        ? (parsed.data.gender as "Female" | "Male")
        : null;

    const orgType = ORGANISATION_TYPES.includes(
      (ORG_MAP[parsed.data.orgType] ?? "Other") as (typeof ORGANISATION_TYPES)[number],
    )
      ? ((ORG_MAP[parsed.data.orgType] ?? "Other") as (typeof ORGANISATION_TYPES)[number])
      : ("Other" as const);

    const result = await submitApplication({
      data: {
        training_id: parsed.data.training,
        name: parsed.data.fullName,
        email: parsed.data.email,
        gender: genderVal,
        country: parsed.data.placeOfWork,
        organisation: parsed.data.organisation,
        organisation_type: orgType,
        position: parsed.data.position,
        language: t.language,
        // Full course-specific questionnaire (Q1–Q19 and any extras).
        answers: { ...parsed.data, trainer: parsed.data.trainer },
      },
    }).catch(() => ({ ok: false as const, error: undefined }));
    setSubmitting(false);
    if (!result.ok) {
      toast.error("Could not submit", {
        description:
          "Applications aren't open for this session yet. Please try again later or email training@calpnetwork.org.",
      });
      return;
    }
    toast.success("Application received", {
      description: `We'll email ${parsed.data.email} within five working days.`,
    });
    (e.target as HTMLFormElement).reset();
    setCourse("");
    setTraining("");
    setTrainer("");
    setGender("");
    setLmApproved("");
  }

  const courseTitle = activeCourse?.title ?? "Core CVA Skills for Programme Staff";
  const trainingLocation = activeTraining
    ? `${activeTraining.city}, ${activeTraining.country}`
    : "XXX";
  const trainingDates = activeTraining
    ? `${formatDate(activeTraining.startDate)} – ${formatDate(activeTraining.endDate)}`
    : "the scheduled dates";
  const trainingLanguage = activeTraining?.language ?? "English";

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Curved red banner */}
      <div className="relative h-[180px] w-full">
        <div
          aria-hidden
          className="absolute inset-0 bg-calp-red"
          style={{
            clipPath:
              "path('M0,0 L1600,0 L1600,110 C1200,190 800,190 400,140 C260,120 120,140 0,170 Z')",
          }}
        />
        <div className="absolute right-6 top-6 flex items-center gap-2.5 rounded-md bg-white/95 px-3 py-2 shadow-sm">
          <img src={calpLogo.url} alt="CALP Network" className="h-10 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-extrabold tracking-tight text-calp-red">
              CALP NETWORK
            </span>
            <span className="mt-1 text-[8px] font-semibold tracking-[0.14em] text-calp-red/80">
              Choice &amp; dignity for people in crisis
            </span>
          </span>
        </div>
      </div>

      {/* Decorative blob cluster bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64"
      >
        <div className="absolute bottom-16 left-6 h-24 w-24 rounded-full bg-calp-blue/80" />
        <div className="absolute bottom-6 left-24 h-20 w-20 rounded-full bg-calp-red" />
        <div className="absolute bottom-0 left-0 h-16 w-16 rounded-full bg-calp-blue/60" />
        <div className="absolute bottom-20 left-40 h-10 w-10 rounded-full bg-calp-red/70" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pb-32 pt-8">
        {/* Title + course intro */}
        <h1 className="font-display text-3xl font-extrabold leading-tight text-calp-red md:text-4xl">
          Application form for {courseTitle}
          {activeTraining ? ` in ${trainingLocation}` : null}
        </h1>

        <div className="mt-6 rounded-md bg-calp-red/10 px-5 py-4 text-sm text-calp-blue">
          Please note that this is a {activeCourse?.duration ?? "5 day"} course, which will be delivered in{" "}
          <strong>{trainingLocation}</strong>
          {activeTraining ? " from " : ""}
          {activeTraining ? <strong>{trainingDates}</strong> : null}. This course
          will be conducted in <strong>{trainingLanguage}</strong>.
        </div>

        <p className="mt-4 text-sm italic text-calp-ink">Donor acknowledgement</p>

        <IntroSection title="About the Course">
          <p>
            The aim of the course is to develop the knowledge, skills and
            confidence of humanitarian practitioners for cash and voucher
            assistance (CVA) technical design and quality.
          </p>
          <p className="mt-2">
            {activeCourse?.description ??
              "This is a fully interactive course; participants must attend all sessions. There are breaks during the day for individuals to carry out their own work-related activities, should they need to."}
          </p>
        </IntroSection>

        <IntroSection title="Objectives">
          <p className="mb-3">By the end of this course, you will be able to:</p>
          <ol className="grid list-decimal gap-2 pl-5 md:grid-cols-2 md:gap-x-8">
            <li>Discuss opportunities and challenges to delivering high-quality CVA as part of a humanitarian response.</li>
            <li>Use various assessments, including market assessment tools, to inform CVA appropriateness.</li>
            <li>Analyse assessment data to choose modality, delivery mechanism and transfer value.</li>
            <li>Ensure accountability towards affected populations during CVA design and implementation.</li>
            <li>Incorporate CVA and markets in monitoring frameworks.</li>
            <li>Identify best practices for CVA quality and sustainability.</li>
            <li>Navigate existing tools, guidance, case studies and research to find the most relevant and up-to-date information on CVA.</li>
          </ol>
        </IntroSection>

        <IntroSection title="Who is this course for?">
          <p>
            This course is suitable for programme staff responsible for
            designing, implementing and monitoring cash transfer programmes.
            If you do not have any programme experience, it is highly unlikely
            you will be selected. If you have more than 5 years' experience,
            you may find the course does not go into the depth you would like —
            please review the course objectives to make sure this course is for
            you.
          </p>
        </IntroSection>

        <IntroSection title="Who to contact?">
          <p>
            If you have any questions about the training please contact{" "}
            <a href="mailto:training@calpnetwork.org" className="text-calp-red underline">
              training@calpnetwork.org
            </a>
            .
          </p>
        </IntroSection>

        <p className="mb-6 mt-8 text-sm font-semibold text-calp-red">* Required</p>

        {preselectedTraining ? (
          <div className="mb-8 rounded-md border-l-4 border-calp-red bg-calp-red/5 p-5">
            <p className="text-[10px] font-bold text-calp-red">
              Applying for
            </p>
            <p className="mt-1 font-display text-lg font-bold text-calp-blue">
              {sortedCourses.find((c) => c.id === preselectedTraining.courseId)?.title ?? "Training"}
            </p>
            <p className="text-sm text-calp-ink">
              {preselectedTraining.city}, {preselectedTraining.country} ·{" "}
              {formatDate(preselectedTraining.startDate)} →{" "}
              {formatDate(preselectedTraining.endDate)} ·{" "}
              {preselectedTraining.language}
            </p>
          </div>
        ) : null}

        <form onSubmit={onSubmit} noValidate className="space-y-8">
          {/* Selectors */}
          <FormSection title="Your training">
            <SelectField
              label="Course"
              name="course"
              required
              value={course}
              onChange={(v) => onCourseChange(v)}
              error={errors.course}
            >
              <option value="">— Select a course —</option>
              {sortedCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Training"
              name="training"
              required
              value={training}
              onChange={onTrainingChange}
              disabled={!course}
              error={errors.training}
            >
              <option value="">
                {course
                  ? availableTrainings.length
                    ? "— Select a training —"
                    : "No upcoming trainings for this course"
                  : "— Select a course first —"}
              </option>
              {availableTrainings.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.city}, {t.country} · {formatDate(t.startDate)} · {t.language}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Preferred trainer"
              name="trainer"
              value={trainer}
              onChange={setTrainer}
              disabled={!training}
              help={
                noLanguageMatch
                  ? `No trainers listed as delivering in ${trainingLang}. Showing all 200 certified trainers.`
                  : training
                  ? `Showing trainers who deliver in ${trainingLang}.`
                  : undefined
              }
            >
              <option value="">
                {training ? "No preference" : "— Select a training first —"}
              </option>
              {trainerOptions.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.location}
                </option>
              ))}
            </SelectField>
          </FormSection>

          <Field
            label="1. Full name (as you would want printed on the training certificate)?"
            name="fullName"
            required
            error={errors.fullName}
          />

          <RadioGroup
            label="2. Gender"
            name="gender"
            options={GENDER}
            value={gender}
            onChange={setGender}
            error={errors.gender}
          />
          {gender === "Prefer to self-describe" ? (
            <Field
              label="Please self-describe"
              name="genderSelfDescribe"
              error={errors.genderSelfDescribe}
            />
          ) : null}

          <RadioGroup
            label="3. What type of organisation do you work for?"
            name="orgType"
            options={ORG_TYPES}
            error={errors.orgType}
          />

          <Field
            label="4. What is the name of your organisation?"
            name="organisation"
            required
            error={errors.organisation}
          />

          <Field
            label="5. What is your position within the organisation? (e.g. Programme Coordinator, Programme Officer, Finance Officer)"
            name="position"
            required
            error={errors.position}
          />

          <Field
            label="6. Where is your place of work? (City, State/Province and Country)"
            name="placeOfWork"
            required
            error={errors.placeOfWork}
          />

          <Field
            label="7. What is your preferred contact email address?"
            name="email"
            type="email"
            required
            error={errors.email}
          />

          <Field
            label="8. Please provide an alternative email address."
            name="altEmail"
            type="email"
            error={errors.altEmail}
          />

          <Field
            label="9. What is your preferred telephone number (with country code +)?"
            name="phone"
            error={errors.phone}
          />

          <RadioGroup
            label="10. Has your line manager approved your application for this training?"
            name="lmApproved"
            required
            options={YES_NO}
            value={lmApproved}
            onChange={setLmApproved}
            error={errors.lmApproved}
          />

          <Field
            label="11. Please provide the name and contact email address of your line manager."
            name="lmContact"
            error={errors.lmContact}
            help={
              lmApproved === "Yes"
                ? "Required — we may contact them to confirm."
                : undefined
            }
          />

          <RadioGroup
            label="12. Where did you hear about this course?"
            name="heardAbout"
            options={HEARD_ABOUT}
          />
          <Field
            label="If Other, please specify"
            name="heardAboutOther"
            error={errors.heardAboutOther}
          />

          <SubHeading>Knowledge of Cash and Voucher Assistance</SubHeading>

          <RadioGroup
            label="13. Have you already completed the CVA Fundamentals e-learning course, or taken the quiz as an alternative?"
            name="cvaFundamentals"
            required
            options={YES_NO}
            error={errors.cvaFundamentals}
            help={
              <>
                If not, you will be required to complete it before the training begins. Available on{" "}
                <a
                  href="https://kayaconnect.org/course/info.php?id=496"
                  target="_blank"
                  rel="noreferrer"
                  className="text-calp-red underline"
                >
                  Kaya
                </a>
                .
              </>
            }
          />

          <RadioGroup
            label="14. Have you already completed the Introduction to Market-Based Programming e-learning module (Module 1)?"
            name="mbpModule1"
            required
            options={YES_NO}
            error={errors.mbpModule1}
            help={
              <>
                If not, you will be required to complete it before the training begins. Available on{" "}
                <a
                  href="https://kayaconnect.org/course/view.php?id=4684"
                  target="_blank"
                  rel="noreferrer"
                  className="text-calp-red underline"
                >
                  Kaya
                </a>
                .
              </>
            }
          />

          <RadioGroup
            label="15. How many years have you been implementing or supporting the implementation of CVA?"
            name="yearsCVA"
            required
            options={YEARS_CVA}
            error={errors.yearsCVA}
          />

          <TextArea
            label="16. How does CVA apply to your current role? Please provide a short brief on your experience in CVA and what kind of work you have done."
            name="cvaInRole"
            required
            error={errors.cvaInRole}
          />

          <TextArea
            label="17. What are your main motivation(s) for attending this training and how will this training help you in your current role?"
            name="motivation"
            required
            error={errors.motivation}
          />

          <RadioGroup
            label="18. Would you like to stay informed by receiving our regional newsletter?"
            name="newsletterOptIn"
            options={YES_NO}
          />

          <RadioGroup
            label="19. If you are successful and attend the training, CALP may wish to reach out in the future to understand the impact of the course on your work. Do you consent?"
            name="followUpConsent"
            options={CONSENT_FOLLOWUP}
          />

          <div className="pt-4 text-right">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-calp-red px-10 py-3.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-calp-red/90 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit application"}
            </button>
          </div>

          <p className="text-sm text-calp-ink">
            Thank you very much for your interest and for completing this
            application form. We will let you know about the outcome of your
            application and next steps as soon as possible after the deadline.
            <br />
            <br />
            Many thanks,
            <br />
            CALP
          </p>
        </form>
      </div>
    </div>
  );
}

/* ---------- Local UI helpers ---------- */

function IntroSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 font-display text-xl font-bold text-calp-red underline decoration-2 underline-offset-4">
        {title}
      </h2>
      <div className="text-sm leading-relaxed text-calp-blue">{children}</div>
    </section>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5">
      <h2 className="font-display text-xl font-bold text-calp-red underline decoration-2 underline-offset-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-4 font-display text-lg font-bold text-calp-red underline decoration-2 underline-offset-4">
      {children}
    </h3>
  );
}

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-semibold text-calp-red">
      {children}
      {required ? <span className="text-calp-red"> *</span> : null}
    </label>
  );
}

const inputCls =
  "w-full rounded-md border border-calp-red/30 bg-white px-4 py-3 text-sm text-calp-blue outline-none transition-colors focus:border-calp-red focus:ring-2 focus:ring-calp-red/20 disabled:cursor-not-allowed disabled:bg-calp-canvas disabled:text-calp-ink";

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  help,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  help?: React.ReactNode;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input name={name} type={type} className={inputCls} />
      {help ? <p className="mt-1 text-xs text-calp-ink">{help}</p> : null}
      {error ? <p className="mt-1 text-xs text-calp-red">{error}</p> : null}
    </div>
  );
}

function TextArea({
  label,
  name,
  required,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <textarea name={name} rows={6} maxLength={1500} className={inputCls} />
      {error ? <p className="mt-1 text-xs text-calp-red">{error}</p> : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  disabled,
  required,
  error,
  help,
  children,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  help?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={inputCls}
      >
        {children}
      </select>
      {help ? <p className="mt-1 text-xs text-calp-ink">{help}</p> : null}
      {error ? <p className="mt-1 text-xs text-calp-red">{error}</p> : null}
    </div>
  );
}

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required,
  error,
  help,
}: {
  label?: string;
  name: string;
  options: readonly string[];
  value?: string;
  onChange?: (v: string) => void;
  required?: boolean;
  error?: string;
  help?: React.ReactNode;
}) {
  const controlled = value !== undefined && onChange !== undefined;
  return (
    <div role="radiogroup" aria-label={label}>
      {label ? <Label required={required}>{label}</Label> : null}
      {help ? <p className="mb-2 text-xs text-calp-ink">{help}</p> : null}
      <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
        {options.map((opt) => {
          const checked = controlled ? value === opt : undefined;
          return (
            <label
              key={opt}
              className="group flex cursor-pointer items-center gap-3 py-1 text-sm text-calp-blue"
            >
              <span
                className={`relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  controlled && checked
                    ? "border-calp-red"
                    : "border-calp-red/50 group-hover:border-calp-red"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full bg-calp-red transition-opacity ${
                    controlled && checked ? "opacity-100" : "opacity-0"
                  }`}
                />
              </span>
              <input
                type="radio"
                name={name}
                value={opt}
                className="sr-only"
                {...(controlled
                  ? { checked, onChange: () => onChange!(opt) }
                  : {})}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {error ? <p className="mt-1 text-xs text-calp-red">{error}</p> : null}
    </div>
  );
}
