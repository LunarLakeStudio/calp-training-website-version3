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
    full: "Browse the available trainings and select the one you are interested in. Review the training details, including the course, dates, location, language and eligibility requirements.",
  },
  {
    title: "Complete the form",
    short: "Fill in the online application and submit before the deadline.",
    full: "Click the Apply button to open the online application form. Complete all required fields, check that the information you have provided is correct and submit your application before the stated deadline.",
  },
  {
    title: "Review and decision",
    short: "The CALP training team reviews it and emails you the outcome.",
    full: "Your application will then be reviewed by the CALP Network training team. Once a decision has been made, you will receive an email confirming whether your application has been accepted or declined.",
  },
];

/** Not a step — a caveat shown only on the How to apply page. */
export const APPLY_NOTE = {
  title: "Good to know",
  body: "Submitting an application does not guarantee a place. Please check your email regularly, including your spam or junk folder, so you do not miss any updates about your application.",
};
