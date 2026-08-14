import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { submitEnquiry } from "@/lib/submissions.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CALP Training Hub" },
      {
        name: "description",
        content:
          "Get in touch with the CALP Training team for general enquiries, trainer accreditation and partnership.",
      },
      { property: "og:title", content: "Contact — CALP Training Hub" },
      {
        property: "og:description",
        content: "Send us a message about training, partnerships or general enquiries.",
      },
    ],
  }),
  component: Contact,
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(2, "Please add a short subject").max(160),
  message: z.string().trim().min(10, "Please share a bit more detail").max(2000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as string;
        if (!flat[k]) flat[k] = issue.message;
      }
      setErrors(flat);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const result = await submitEnquiry({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    }).catch(() => ({ ok: false as const }));
    setSubmitting(false);
    if (!result.ok) {
      toast.error("Could not send", {
        description:
          "Something went wrong. Please email training@calpnetwork.org instead.",
      });
      return;
    }
    toast.success("Message sent", {
      description: "We'll get back to you within two working days.",
    });
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Send us a message."
        intro="For general enquiries, partnership, and trainer accreditation."
      />
      <section className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 md:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-8">
          <div>
            <p className="mb-1 text-sm font-bold text-calp-ink">
              Training team
            </p>
            <a
              href="mailto:training@calpnetwork.org"
              className="text-lg font-medium text-calp-blue hover:text-calp-blue"
            >
              training@calpnetwork.org
            </a>
          </div>
          <div>
            <p className="mb-1 text-sm font-bold text-calp-ink">
              Partnerships
            </p>
            <a
              href="mailto:partnerships@calpnetwork.org"
              className="text-lg font-medium text-calp-blue hover:text-calp-blue"
            >
              partnerships@calpnetwork.org
            </a>
          </div>
          <div>
            <p className="mb-1 text-sm font-bold text-calp-ink">
              Main network
            </p>
            <a
              href="https://www.calpnetwork.org"
              target="_blank"
              rel="noreferrer"
              className="text-lg font-medium text-calp-blue hover:text-calp-blue"
            >
              calpnetwork.org
            </a>
          </div>
        </aside>
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" name="name" error={errors.name} />
            <Field label="Email" name="email" type="email" error={errors.email} />
          </div>
          <Field label="Subject" name="subject" error={errors.subject} />
          <div>
            <label className="mb-2 block text-sm font-bold text-calp-ink">
              Message
            </label>
            <textarea
              name="message"
              rows={6}
              maxLength={2000}
              className="w-full rounded-lg border border-calp-blue/10 bg-white px-4 py-3 text-base outline-none focus:border-calp-blue"
            />
            {errors.message ? (
              <p className="mt-1 text-sm text-calp-blue">{errors.message}</p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-calp-red px-8 py-4 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      </section>
    </>
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
      <label className="mb-2 block text-sm font-bold text-calp-ink">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="w-full rounded-lg border border-calp-blue/10 bg-white px-4 py-3 text-base outline-none focus:border-calp-blue"
      />
      {error ? <p className="mt-1 text-sm text-calp-blue">{error}</p> : null}
    </div>
  );
}
