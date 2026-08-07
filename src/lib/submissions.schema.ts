// Client-safe validation schemas shared by the submission server functions
// and the forms that call them.
import { z } from "zod";

export const ORGANISATION_TYPES = [
  "NNGO",
  "INGO",
  "UN Agency",
  "RCRC Society",
  "Government",
  "Donor",
  "Independent Consultant",
  "Private Sector",
  "Civil Society",
  "Other",
] as const;

export const applicationSchema = z.object({
  training_id: z.string().min(1).max(200),
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(200),
  gender: z.enum(["Male", "Female"]).nullable().optional(),
  country: z.string().trim().max(200).nullable().optional(),
  organisation: z.string().trim().max(300).nullable().optional(),
  organisation_type: z.enum(ORGANISATION_TYPES).nullable().optional(),
  position: z.string().trim().max(300).nullable().optional(),
  role: z.string().trim().max(300).nullable().optional(),
  language: z.string().trim().max(50).nullable().optional(),
  // Course-specific answers (Q1–Q19 and any per-course questions).
  answers: z.record(z.string(), z.unknown()).optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(2).max(300),
  message: z.string().trim().min(5).max(5000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
