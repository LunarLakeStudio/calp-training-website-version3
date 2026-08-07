// Server-only writers for public form submissions.
import { getSharedDb } from "@/integrations/supabase/shared.server";
import type { ApplicationInput, EnquiryInput } from "./submissions.schema";

export type SubmitResult = { ok: boolean; error?: string };

export async function insertApplication(
  input: ApplicationInput,
): Promise<SubmitResult> {
  const db = getSharedDb();

  // The training must exist before we accept an application for it.
  const { data: training, error: lookupError } = await db
    .from("trainings")
    .select("id,status")
    .eq("id", input.training_id)
    .maybeSingle();

  if (lookupError) {
    console.error("application: training lookup failed", lookupError);
    return { ok: false, error: "Could not verify the selected training." };
  }
  if (!training) {
    return { ok: false, error: "The selected training is no longer available." };
  }

  const base: Record<string, unknown> = {
    training_id: input.training_id,
    name: input.name,
    email: input.email,
    gender: input.gender ?? null,
    country: input.country ?? null,
    organisation: input.organisation ?? null,
    organisation_type: input.organisation_type ?? null,
    position: input.position ?? null,
    role: input.role ?? null,
    language: input.language ?? null,
    status: "applied",
  };

  const withAnswers = input.answers
    ? { ...base, answers: input.answers }
    : base;

  let { error } = await db.from("participants").insert(withAnswers as never);

  // The shared database may not have the `answers` jsonb column yet.
  if (error && /answers/i.test(error.message)) {
    ({ error } = await db.from("participants").insert(base as never));
  }

  if (error) {
    console.error("application: insert failed", error);
    return { ok: false, error: "Your application could not be saved." };
  }
  return { ok: true };
}

export async function insertEnquiry(input: EnquiryInput): Promise<SubmitResult> {
  const { error } = await getSharedDb()
    .from("contact_enquiries")
    .insert({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
    } as never);

  if (error) {
    console.error("enquiry: insert failed", error);
    return { ok: false, error: "Your message could not be sent." };
  }
  return { ok: true };
}
