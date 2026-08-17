// Server-only data access layer for the shared CALP Training Hub database.
// Maps the shared Supabase schema to the site UI types
// (Course / Trainer / Training). Never imported by client code — routes reach
// this through the server functions in src/lib/content.functions.ts.
import { getSharedDb, isSharedDbConfigured } from "@/integrations/supabase/shared.server";
import type { Database } from "@/integrations/supabase/db-types";
import { courses as localCourses, type Course } from "@/data/courses";
import {
  trainers as localTrainers,
  featuredTrainers,
  type Trainer,
} from "@/data/trainers";
import { trainings as localTrainings, type Training } from "@/data/trainings";

import shape1 from "@/assets/course-shape-1.png.asset.json";
import shape2 from "@/assets/course-shape-2.png.asset.json";
import shape3 from "@/assets/course-shape-3.png.asset.json";
import p01 from "@/assets/trainers/portrait-01.jpg";
import p02 from "@/assets/trainers/portrait-02.jpg";
import p03 from "@/assets/trainers/portrait-03.jpg";
import p04 from "@/assets/trainers/portrait-04.jpg";
import p05 from "@/assets/trainers/portrait-05.jpg";
import p06 from "@/assets/trainers/portrait-06.jpg";
import p07 from "@/assets/trainers/portrait-07.jpg";
import p08 from "@/assets/trainers/portrait-08.jpg";
import p09 from "@/assets/trainers/portrait-09.jpg";
import p10 from "@/assets/trainers/portrait-10.jpg";
import p11 from "@/assets/trainers/portrait-11.jpg";
import p12 from "@/assets/trainers/portrait-12.jpg";

const COURSE_COVERS = [shape1.url, shape2.url, shape3.url];
const PORTRAITS = [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12];

const LANG_TO_CODE: Record<string, string> = {
  english: "EN",
  french: "FR",
  spanish: "ES",
  arabic: "AR",
  portuguese: "PT",
  swahili: "SW",
  hindi: "HI",
  urdu: "UR",
  bengali: "BN",
  turkish: "TR",
};

export function langToCode(raw: string | null | undefined): string {
  if (!raw) return "EN";
  const v = raw.trim();
  if (v.length <= 3) return v.toUpperCase();
  return LANG_TO_CODE[v.toLowerCase()] ?? v.toUpperCase().slice(0, 2);
}

function modalityToFormat(modality: string | null | undefined): Training["format"] {
  if (!modality) return "Face-to-Face";
  const m = modality.trim().toLowerCase();
  if (m === "f2f" || m.includes("face")) return "Face-to-Face";
  if (m === "online" || m.includes("virtual")) return "Online";
  if (m === "hybrid" || m === "blended") return "Hybrid";
  return "Face-to-Face";
}

function deriveLevel(tags: string[]): Course["level"] {
  const t = tags.map((x) => x.toLowerCase());
  if (t.some((x) => x.includes("advanced"))) return "Advanced";
  if (t.some((x) => x.includes("specialist") || x.includes("specialized")))
    return "Specialized";
  return "Core";
}

function summaryOf(description: string | null): string {
  if (!description) return "CALP Network training course in Cash and Voucher Assistance.";
  const text = description.replace(/\s+/g, " ").trim();
  return text.length > 160 ? text.slice(0, 157).trim() + "…" : text;
}

function downloadKind(url: string): "PDF" | "Guide" | "Video" {
  const u = url.toLowerCase();
  if (u.endsWith(".pdf")) return "PDF";
  if (/\.(mp4|mov|webm|m4v)$/.test(u) || u.includes("video")) return "Video";
  return "Guide";
}

type CourseRow = Database["public"]["Tables"]["courses"]["Row"] & {
  course_languages?: { language: Database["public"]["Tables"]["course_languages"]["Row"]["language"] }[];
  course_formats?: Database["public"]["Tables"]["course_formats"]["Row"][];
  course_materials?: Database["public"]["Tables"]["course_materials"]["Row"][];
};

function mapCourse(row: CourseRow, index: number): Course {
  const langs = (row.course_languages ?? [])
    .map((cl) => langToCode(cl.language))
    .filter((v, i, a) => a.indexOf(v) === i);
  const fmt = (row.course_formats ?? [])[0];
  const duration = fmt?.duration_days
    ? `${fmt.duration_days} Day${fmt.duration_days === 1 ? "" : "s"}`
    : "Self-Paced";

  const materials = (row.course_materials ?? []).filter((m) => m.url);
  const downloads = materials.length
    ? materials.map((m) => ({
        label: m.material_type,
        kind: downloadKind(m.url!),
      }))
    : [{ label: "Course Overview", kind: "PDF" as const }];

  return {
    id: row.id,
    slug: row.short_code || row.id,
    title: row.title,
    summary: summaryOf(row.description),
    description: row.description ?? row.objectives ?? "",
    topics: row.tags ?? [],
    languages: langs.length ? langs : ["EN"],
    level: deriveLevel(row.tags ?? []),
    duration,
    cover: COURSE_COVERS[index % COURSE_COVERS.length],
    downloads,
  };
}

// Only the public subset of the Hub's trainers table — email, assessment
// flags, comments, user_id etc. are never selected.
type TrainerRow = {
  id: string;
  first_name: string;
  last_name: string;
  country: string;
  region?: string | null;
  organisation: string | null;
  photo_path: string | null;
  lang_english: boolean;
  lang_french: boolean;
  lang_spanish: boolean;
  lang_arabic: boolean;
  other_language: string | null;
  share_on_website: boolean;
  trainer_courses?: { course_id: string }[] | null;
};

function mapTrainer(row: TrainerRow, index: number): Trainer {
  const langs: string[] = [];
  if (row.lang_english) langs.push("EN");
  if (row.lang_french) langs.push("FR");
  if (row.lang_spanish) langs.push("ES");
  if (row.lang_arabic) langs.push("AR");
  if (row.other_language) {
    const code = langToCode(row.other_language);
    if (!langs.includes(code)) langs.push(code);
  }
  if (!langs.length) langs.push("EN");

  const photo =
    row.photo_path && /^https?:\/\//.test(row.photo_path)
      ? row.photo_path
      : PORTRAITS[index % PORTRAITS.length];

  return {
    id: row.id,
    name: `${row.first_name} ${row.last_name}`.trim(),
    location: row.country || "—",
    languages: langs,
    photo,
    region: row.region ?? null,
    courseIds: (row.trainer_courses ?? []).map((c) => c.course_id),
  };
}


// Public subset of the Hub's trainings table — application_token, created_by,
// ref and other internal columns are never selected.
type TrainingRow = {
  id: string;
  course_id: string;
  co_trainer_name: string | null;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  duration_days: number | null;
  language: string;
  modality: string;
  application_deadline: string | null;
  status: string;
  trainers?: { first_name: string; last_name: string } | null;
};

function mapTraining(row: TrainingRow): Training {
  const trainerName = row.trainers
    ? `${row.trainers.first_name} ${row.trainers.last_name}`.trim()
    : row.co_trainer_name ?? "To be confirmed";

  return {
    id: row.id,
    courseId: row.course_id,
    city: row.city || "Online",
    country: row.country || "Global",
    startDate: row.start_date,
    endDate: row.end_date,
    language: langToCode(row.language),
    trainer: trainerName,
    venue:
      row.modality && modalityToFormat(row.modality) === "Online"
        ? "Virtual cohort"
        : `${row.city}, ${row.country}`,
    deadline: row.application_deadline ?? row.start_date,
    format: modalityToFormat(row.modality),
  };
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ---- Fetchers (server-side only) -------------------------------------------

const COURSE_SELECT =
  "id, short_code, title, description, objectives, tags, course_languages(language), course_formats(format_type,duration_days), course_materials(material_type,url,language)";

export async function fetchCourses(): Promise<Course[]> {
  if (!isSharedDbConfigured()) return localCourses;
  const { data, error } = await getSharedDb()
    .from("courses")
    .select(COURSE_SELECT)
    .order("title");
  if (error) throw error;
  return ((data ?? []) as unknown as CourseRow[]).map((r, i) => mapCourse(r, i));
}

export async function fetchCourseBySlug(slug: string): Promise<Course | undefined> {
  if (!isSharedDbConfigured()) return localCourses.find((c) => c.slug === slug);
  const { data, error } = await getSharedDb()
    .from("courses")
    .select(COURSE_SELECT)
    .eq("short_code", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapCourse(data as unknown as CourseRow, 0) : undefined;
}

export async function fetchCourseById(id: string): Promise<Course | undefined> {
  if (!isSharedDbConfigured()) return localCourses.find((c) => c.id === id);
  const { data, error } = await getSharedDb()
    .from("courses")
    .select(COURSE_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapCourse(data as unknown as CourseRow, 0) : undefined;
}

const sel = (s: string): string => s;

const TRAINER_SELECT =
  "id, first_name, last_name, country, region, organisation, photo_path, lang_english, lang_french, lang_spanish, lang_arabic, other_language, share_on_website, trainer_courses(course_id)";

const LANG_COLUMN: Record<string, "lang_english" | "lang_french" | "lang_spanish" | "lang_arabic"> = {
  EN: "lang_english",
  FR: "lang_french",
  ES: "lang_spanish",
  AR: "lang_arabic",
};

export async function fetchTrainers(): Promise<Trainer[]> {
  if (!isSharedDbConfigured()) return localTrainers;
  const { data, error } = await getSharedDb()
    .from("trainers")
    .select(sel(TRAINER_SELECT))
    .eq("share_on_website", true)
    .order("first_name");
  if (error) throw error;
  return [
    ...featuredTrainers,
    ...((data ?? []) as unknown as TrainerRow[]).map((r, i) => mapTrainer(r, i)),
  ];
}


export type TrainerQuery = {
  country?: string | null;
  region?: string | null;
  language?: string | null;
  courseId?: string | null;
  query?: string | null;
  offset: number;
  limit: number;
};

export type TrainerPage = { trainers: Trainer[]; total: number };

function matchesLocal(t: Trainer, f: TrainerQuery): boolean {
  const country = t.location.split(",").pop()!.trim();
  if (f.country && country !== f.country) return false;
  if (f.region && (t.region ?? "") !== f.region) return false;
  if (f.language && !t.languages.includes(f.language)) return false;
  if (f.courseId && !(t.courseIds ?? []).includes(f.courseId)) return false;
  const q = (f.query ?? "").trim().toLowerCase();
  if (q && !t.name.toLowerCase().includes(q) && !t.location.toLowerCase().includes(q))
    return false;
  return true;
}

export async function fetchTrainersPage(f: TrainerQuery): Promise<TrainerPage> {
  if (!isSharedDbConfigured()) {
    const matched = localTrainers.filter((t) => matchesLocal(t, f));
    return {
      trainers: matched.slice(f.offset, f.offset + f.limit),
      total: matched.length,
    };
  }

  const db = getSharedDb();

  let allowedIds: string[] | null = null;
  if (f.courseId) {
    const { data, error } = await db
      .from("trainer_courses")
      .select(sel("trainer_id"))
      .eq("course_id", f.courseId)
      .returns<{ trainer_id: string }[]>();
    if (error) throw error;
    allowedIds = (data ?? []).map((r) => r.trainer_id);
    if (!allowedIds.length) return { trainers: [], total: 0 };
  }

  let q = db
    .from("trainers")
    .select(sel(TRAINER_SELECT), { count: "exact" })
    .eq("share_on_website", true);

  if (f.country) q = q.eq("country", f.country);
  if (f.region) q = q.eq("region", f.region as never);
  if (allowedIds) q = q.in("id", allowedIds);
  if (f.language) {
    const col = LANG_COLUMN[f.language];
    if (col) q = q.eq(col, true);
    else q = q.ilike("other_language", `%${f.language}%`);
  }
  const search = (f.query ?? "").trim().replace(/[%,()]/g, "");
  if (search) {
    q = q.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,country.ilike.%${search}%`,
    );
  }

  const { data, error, count } = await q
    .order("first_name")
    .order("id")
    .range(f.offset, f.offset + f.limit - 1);
  if (error) throw error;

  return {
    trainers: ((data ?? []) as unknown as TrainerRow[]).map((r, i) =>
      mapTrainer(r, f.offset + i),
    ),
    total: count ?? 0,
  };
}

export type TrainerFacets = {
  countries: string[];
  regions: string[];
  languages: string[];
  courses: { id: string; title: string }[];
};

function localFacets(): TrainerFacets {
  return {
    countries: Array.from(
      new Set(localTrainers.map((t) => t.location.split(",").pop()!.trim())),
    ).sort(),
    regions: Array.from(
      new Set(localTrainers.map((t) => t.region).filter(Boolean) as string[]),
    ).sort(),
    languages: Array.from(new Set(localTrainers.flatMap((t) => t.languages))).sort(),
    courses: localCourses.map((c) => ({ id: c.id, title: c.title })),
  };
}

export async function fetchTrainerFacets(): Promise<TrainerFacets> {
  if (!isSharedDbConfigured()) return localFacets();
  const db = getSharedDb();

  const { data, error } = await db
    .from("trainers")
    .select(
      sel(
        "country, region, lang_english, lang_french, lang_spanish, lang_arabic, other_language, trainer_courses(course_id)",
      ),
    )
    .eq("share_on_website", true)
    .returns<
      {
        country: string | null;
        region: string | null;
        lang_english: boolean;
        lang_french: boolean;
        lang_spanish: boolean;
        lang_arabic: boolean;
        other_language: string | null;
        trainer_courses: { course_id: string }[] | null;
      }[]
    >();
  if (error) throw error;

  const rows = data ?? [];
  const countries = new Set<string>();
  const regions = new Set<string>();
  const languages = new Set<string>();
  const courseIds = new Set<string>();
  for (const r of rows) {
    if (r.country) countries.add(r.country);
    if (r.region) regions.add(r.region);
    if (r.lang_english) languages.add("EN");
    if (r.lang_french) languages.add("FR");
    if (r.lang_spanish) languages.add("ES");
    if (r.lang_arabic) languages.add("AR");
    if (r.other_language) languages.add(langToCode(r.other_language));
    for (const c of r.trainer_courses ?? []) courseIds.add(c.course_id);
  }

  let courses: { id: string; title: string }[] = [];
  if (courseIds.size) {
    const { data: cData, error: cError } = await db
      .from("courses")
      .select(sel("id, title"))
      .in("id", Array.from(courseIds))
      .order("title")
      .returns<{ id: string; title: string }[]>();
    if (cError) throw cError;
    courses = cData ?? [];
  }

  return {
    countries: Array.from(countries).sort(),
    regions: Array.from(regions).sort(),
    languages: Array.from(languages).sort(),
    courses,
  };
}


export async function fetchTrainings(): Promise<Training[]> {
  if (!isSharedDbConfigured()) return localTrainings;
  const { data, error } = await getSharedDb()
    .from("trainings")
    .select(
      "id, course_id, co_trainer_name, city, country, start_date, end_date, duration_days, language, modality, application_deadline, status, trainers(first_name,last_name)",
    )
    .neq("status", "cancelled")
    .gte("end_date", todayISO())
    .order("start_date");
  if (error) throw error;
  return ((data ?? []) as unknown as TrainingRow[]).map((r) => mapTraining(r));
}

export async function fetchTraining(id: string): Promise<Training | undefined> {
  if (!isSharedDbConfigured()) return localTrainings.find((t) => t.id === id);
  const { data, error } = await getSharedDb()
    .from("trainings")
    .select(
      "id, course_id, co_trainer_name, city, country, start_date, end_date, duration_days, language, modality, application_deadline, status, trainers(first_name,last_name)",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapTraining(data as unknown as TrainingRow) : undefined;
}

