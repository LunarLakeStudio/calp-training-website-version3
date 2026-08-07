// Server-only data access layer for the shared CALP Training Hub database.
// Maps the shared Supabase schema to the site UI types
// (Course / Trainer / Training). Never imported by client code — routes reach
// this through the server functions in src/lib/content.functions.ts.
import { getSharedDb } from "@/integrations/supabase/shared.server";
import type { Database } from "@/integrations/supabase/db-types";
import type { Course } from "@/data/courses";
import type { Trainer } from "@/data/trainers";
import type { Training } from "@/data/trainings";

import fundamentalsImg from "@/assets/course-fundamentals.jpg";
import strategicImg from "@/assets/course-strategic.jpg";
import digitalImg from "@/assets/course-digital.jpg";
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

const COURSE_COVERS = [fundamentalsImg, strategicImg, digitalImg];
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
  organisation: string | null;
  photo_path: string | null;
  lang_english: boolean;
  lang_french: boolean;
  lang_spanish: boolean;
  lang_arabic: boolean;
  other_language: string | null;
  share_on_website: boolean;
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
  const { data, error } = await getSharedDb()
    .from("courses")
    .select(COURSE_SELECT)
    .order("title");
  if (error) throw error;
  return ((data ?? []) as unknown as CourseRow[]).map((r, i) => mapCourse(r, i));
}

export async function fetchCourseBySlug(slug: string): Promise<Course | undefined> {
  const { data, error } = await getSharedDb()
    .from("courses")
    .select(COURSE_SELECT)
    .eq("short_code", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapCourse(data as unknown as CourseRow, 0) : undefined;
}

export async function fetchCourseById(id: string): Promise<Course | undefined> {
  const { data, error } = await getSharedDb()
    .from("courses")
    .select(COURSE_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapCourse(data as unknown as CourseRow, 0) : undefined;
}

export async function fetchTrainers(): Promise<Trainer[]> {
  const { data, error } = await getSharedDb()
    .from("trainers")
    .select(
      "id, first_name, last_name, country, organisation, photo_path, lang_english, lang_french, lang_spanish, lang_arabic, other_language, share_on_website",
    )
    .eq("share_on_website", true)
    .order("first_name");
  if (error) throw error;
  return ((data ?? []) as unknown as TrainerRow[]).map((r, i) => mapTrainer(r, i));
}

export async function fetchTrainings(): Promise<Training[]> {
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

