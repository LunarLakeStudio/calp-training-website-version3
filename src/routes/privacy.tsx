import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — CALP Training Hub" },
      {
        name: "description",
        content:
          "How the CALP Network collects, uses, stores and protects your personal information, and how to access, change or delete it.",
      },
      { property: "og:title", content: "Privacy policy — CALP Training Hub" },
      {
        property: "og:description",
        content:
          "Learn more about how the CALP Network collects and treats your personal information.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPolicy,
});

const MAIL = "info@calpnetwork.org";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 font-display text-2xl font-bold leading-snug text-calp-blue">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-calp-ink">{children}</div>
    </section>
  );
}

function MailLink() {
  return (
    <a
      href={`mailto:${MAIL}`}
      className="text-calp-blue underline-offset-4 hover:underline"
    >
      {MAIL}
    </a>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-calp-blue underline-offset-4 hover:underline"
    >
      {children}
    </a>
  );
}

function PrivacyPolicy() {
  return (
    <div className="pb-20">
      <PageHero
        title="Privacy policy"
        intro="Learn more about how we collect and treat your personal information."
      />

      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm leading-relaxed text-calp-ink">
          According to data protection regulations, we updated our privacy policy about how
          we collect and use personal information about our users and members. We commit to
          using your personal information in accordance with our responsibilities.
        </p>

        <Section title="Who we are and how can you contact us?">
          <p>
            CALP is a global network with staff hosted by three registered charities: Oxfam,
            Action Against Hunger and the Norwegian Refugee Council. CALP catalyses the
            power, knowledge and capacities of its 90+ members in order to shape the future
            direction of humanitarian cash assistance. Our email is: <MailLink />
          </p>
        </Section>

        <Section title="Why do we need your information?">
          <p>
            CALP is a network of organisations and one of its purposes is to keep its members
            and stakeholders informed about events, jobs, news and research about Cash and
            Voucher Assistance (CVA). We collect two types of information:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Anonymous data that is automatically collected from all visitors to our website
              helps us to understand if our content is reaching our audiences. We may obtain
              information about your visit to our site, for which pages you visited, by using
              cookies. Please read our{" "}
              <Ext href="https://www.calpnetwork.org/cookie-policy/">Cookies Policy</Ext> for
              information about this.
            </li>
            <li>
              Personal data that visitors voluntarily submit so that they can add information
              to our website (such as events, jobs or resources) or so that they can receive
              email updates from us.
            </li>
          </ul>
        </Section>

        <Section title="How do we collect your information?">
          <p>
            We will ask for your consent to send you marketing information. We only collect
            personal information (for example, name, email address, organisation, title,
            language, region and other preferences which you may choose to provide to us),
            when you choose to:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Opt-in to subscribe to one or more of our newsletters</li>
            <li>Submit an event</li>
            <li>Post a job</li>
            <li>Submit a resource</li>
            <li>Submit a course to be advertised</li>
            <li>Applying for courses</li>
            <li>Submit news of your ongoing research</li>
          </ul>
          <p>
            When you decide to actively carry out any of these actions, we will ensure your
            data is used only for the purpose it was requested and warrant your data is
            stored securely.
          </p>
        </Section>

        <Section title="How do we use your information?">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              To provide you with services such as advertising and event, job, course or
              others, when you decide to do so.
            </li>
            <li>
              To send you updates, notifications of events, training courses and other news
              related to CALP if you opted-in.
            </li>
            <li>We do not share your data with other organisations for marketing purposes.</li>
            <li>
              To better understand how users interact with our website so that we can improve
              our services in the future.
            </li>
          </ul>
        </Section>

        <Section title="How do we store your information and for how long?">
          <p>
            As we work with different platforms and software the data that we collect from
            you may be transferred to and stored at, a destination outside the European
            Economic Area (“EEA”). When you submit your personal data, you agree to this
            transfer, storing or processing. We make sure to take all steps reasonably
            necessary to ensure that your data is treated securely and in accordance with
            this privacy policy.
          </p>
          <p>
            Your information is kept for no longer than necessary for the purposes for which
            it was collected, taking into account guidance from the Information
            Commissioner’s Office.
          </p>
        </Section>

        <Section title="Do you share my information with anyone else?">
          <p>
            Only CALP will keep your information and it will not be shared with other
            organisations.
          </p>
          <p>
            We may share your personal information with companies that perform services on
            our behalf, for example, web hosting, companies that enable us to provide you
            with online events, email platforms and others.
          </p>
          <p>
            All our providers have contractual obligations to protect the confidentiality of
            the information we share with them and use it only to provide the specific
            services we request.
          </p>
          <p>
            Our website includes links to other sites, not owned or managed by CALP. We
            cannot be held responsible for the privacy of data collected by websites not
            managed by CALP.
          </p>
        </Section>

        <Section title="How can I change, delete or ask to see my information?">
          <p>
            If you want to stop receiving our emails, you can opt out at any time by clicking
            on the unsubscribe button at the bottom of any of our emails.
          </p>
          <p>
            If you think we have personal information that needs to be changed, please
            contact us (<MailLink />) to let us know what you think it is and we will do
            everything we can to rectify it.
          </p>
          <p>
            If you want to know full details of the information we have on record about you,
            do not hesitate to request it.
          </p>
          <p>
            If you would like us to delete all the information we have on record about you,
            please contact us via <MailLink />.
          </p>
        </Section>

        <Section title="How to find out more, or make a complaint about our approach to data protection?">
          <p>
            If you would like to update your details, would like more information or have any
            questions about this policy, please contact our team at <MailLink />. To make a
            formal complaint about the CALP Network’s approach to data protection or raise
            privacy concerns directly with our team, please contact:
          </p>
          <div className="rounded-2xl border border-calp-blue/10 bg-white p-6">
            <p className="font-bold text-calp-blue">Digital Platforms Manager</p>
            <address className="mt-2 not-italic text-sm leading-relaxed text-calp-ink">
              The CALP Network
              <br />
              Oxfam GB
              <br />
              Oxfam House
              <br />
              John Smith Drive
              <br />
              Cowley
              <br />
              Oxford
              <br />
              OX4 2JY
            </address>
            <p className="mt-3 text-sm text-calp-ink">
              Email: <MailLink />
            </p>
          </div>
          <p>
            If you feel that your data has not been handled correctly, or you are unhappy
            with our response to any requests you have made to us regarding the use of your
            personal data, you have the right to lodge a complaint with the Information
            Commissioner’s Office.
          </p>
          <p>
            You can contact them by phone or live chat at{" "}
            <Ext href="https://ico.org.uk/global/contact-us/">
              https://ico.org.uk/global/contact-us/
            </Ext>
          </p>
          <p>
            Or make a complaint here{" "}
            <Ext href="https://ico.org.uk/make-a-complaint/">
              https://ico.org.uk/make-a-complaint/
            </Ext>{" "}
            (external links open in a new window; please note we can’t be responsible for the
            content of external websites).
          </p>
        </Section>
      </div>
    </div>
  );
}
