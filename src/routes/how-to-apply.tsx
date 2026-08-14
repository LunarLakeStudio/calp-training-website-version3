import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/how-to-apply")({
  head: () => ({
    meta: [
      { title: "How to apply — CALP Training Hub" },
      {
        name: "description",
        content:
          "Step-by-step guidance on applying for a CALP Network CVA training: choosing a training, completing the application form and what happens after you apply.",
      },
      { property: "og:title", content: "How to apply — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "How to browse trainings, submit your application before the deadline and what happens once the CALP training team reviews it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/how-to-apply" }],
  }),
  component: HowToApplyPage,
});

function HowToApplyPage() {
  return (
    <div className="pb-20">
      <PageHero
        title="How to apply for a CALP Network CVA training"
        intro="Everything you need to know before submitting an application."
      />

      <div className="mx-auto max-w-3xl space-y-6 px-6 text-base leading-relaxed text-calp-ink">
        <p>
          Browse the available trainings and select the one you are interested in.
          Review the training details, including the course, dates, location,
          language and eligibility requirements.
        </p>
        <p>
          Click the Apply button to open the online application form. Complete all
          required fields, check that the information you have provided is correct
          and submit your application before the stated deadline.
        </p>
        <p>
          Your application will then be reviewed by the CALP Network training team.
          Once a decision has been made, you will receive an email confirming
          whether your application has been accepted or declined.
        </p>
        <p>
          Submitting an application does not guarantee a place. Please check your
          email regularly, including your spam or junk folder, so you do not miss
          any updates about your application.
        </p>
      </div>
    </div>
  );
}
