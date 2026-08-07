// Server functions for public form submissions (applications + enquiries).
// Writes happen server-side with the shared database's secret key, so the
// database needs no anonymous insert policies.
import { createServerFn } from "@tanstack/react-start";
import {
  applicationSchema,
  enquirySchema,
} from "./submissions.schema";

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { insertApplication } = await import("./submissions.server");
    return insertApplication(data);
  });

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { insertEnquiry } = await import("./submissions.server");
    return insertEnquiry(data);
  });
