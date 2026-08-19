/**
 * Single source of truth for the CALP application process.
 *
 * Used by BOTH the homepage "How to apply" band (short copy) and the
 * /how-to-apply page (full copy), so the two can never drift apart again.
 */

export type ApplyStep = {
  title: string;
  /** One-line summary for the compact homepage band. */
  short: string;
  /** Full guidance paragraph for the How to apply page. */
  full: string;
};

export const APPLY_STEPS: ApplyStep[] = [
  {
    title: "Choose a training",
    short: "Browse the calendar and pick a training that fits your needs.",
    full: "Browse available trainings and select the one that matches your needs. Check the course, dates, location, language and eligibility requirements.",
  },
  {
    title: "Complete the form",
    short: "Fill in the online application and submit before the deadline.",
    full: "Open the application form, complete all required fields and submit it before the stated deadline.",
  },
  {
    title: "Review and decision",
    short: "The CALP training team reviews it and emails you the outcome.",
    full: "The CALP Network training team will review your application and email you to confirm whether it has been accepted or declined.",
  },
];

/** Checklist shown before the steps on the How to apply page. */
export const APPLY_CHECKLIST = [
  "Review the training details and eligibility requirements",
  "Check the dates, format, location and language",
  "Use an email address you check regularly",
  "Submit your application before the deadline",
];

/** Not a step — a caveat shown only on the How to apply page. */
export const APPLY_NOTE = {
  title: "Good to know",
  body: "Submitting an application does not guarantee a place. Please check your inbox and spam or junk folder regularly so you do not miss an update.",
};
