import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison Makeeva" },
      {
        name: "description",
        content:
          "Reach the Maison Makeeva client services team — by appointment, in writing or in boutique.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="px-6 pt-40 pb-20 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="eyebrow text-muted-foreground">— Client Services</div>
          <h1 className="mt-6 font-display text-6xl leading-[0.98] lg:text-[8rem]">Be in touch.</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-20 px-6 pb-32 lg:grid-cols-2 lg:px-10">
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-8"
        >
          {sent ? (
            <div className="border border-ink p-12 text-center">
              <div className="eyebrow text-muted-foreground">— Sent</div>
              <p className="mt-6 font-display text-3xl">
                Thank you. A client advisor will write back shortly.
              </p>
            </div>
          ) : (
            <>
              <Field label="Name" type="text" />
              <Field label="Email" type="email" />
              <Field label="Subject" type="text" />
              <div>
                <label className="eyebrow text-muted-foreground">Message</label>
                <textarea
                  rows={6}
                  required
                  className="mt-3 w-full border-b border-border bg-transparent pb-3 text-lg focus:border-ink focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-ink py-5 eyebrow text-ivory hover:bg-shadow"
              >
                Send Message
              </button>
            </>
          )}
        </form>

        {/* Info */}
        <div className="space-y-12">
          <Block title="Client Advisors">
            Monday – Saturday, 09:00 – 19:00 (GMT+4)
            <br />
            +971 4 000 0000
            <br />
            <a className="link-underline" href="mailto:clients@maisonmakeeva.com">
              clients@maisonmakeeva.com
            </a>
          </Block>
          <Block title="Flagship Boutique — Dubai">
            Maison Makeeva
            <br />
            Boulevard, Downtown
            <br />
            Dubai, United Arab Emirates
            <br />
            <span className="eyebrow link-underline">Book an appointment</span>
          </Block>
          <Block title="Atelier — Como">
            Via Volta 14
            <br />
            22100 Como, Italia
            <br />
            By appointment only.
          </Block>
          <Block title="WhatsApp">
            For immediate styling assistance —
            <br />
            <a className="link-underline" href="https://wa.me/971400000000">
              +971 4 000 0000
            </a>
          </Block>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-ink">
        <div className="relative aspect-[16/6] w-full">
          <iframe
            title="Maison Makeeva location"
            src="https://www.google.com/maps?q=Dubai&output=embed"
            className="h-full w-full grayscale-[60%] opacity-90"
            loading="lazy"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground">{label}</label>
      <input
        type={type}
        required
        className="mt-3 w-full border-b border-border bg-transparent pb-3 text-lg focus:border-ink focus:outline-none"
      />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-6">
      <div className="eyebrow text-muted-foreground">{title}</div>
      <div className="mt-4 text-lg leading-relaxed">{children}</div>
    </div>
  );
}
