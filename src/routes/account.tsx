import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Maison Makeeva" },
      {
        name: "description",
        content: "Sign in to your private Maison Makeeva account.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [mode, setMode] = useState<"signin" | "register">("signin");

  if (signedIn) return <Dashboard onSignOut={() => setSignedIn(false)} />;

  return (
    <SiteLayout>
      <section className="px-6 pt-40 pb-20 lg:px-10">
        <div className="mx-auto max-w-md">
          <div className="eyebrow text-center text-muted-foreground">— Client Account</div>
          <h1 className="mt-6 text-center font-display text-5xl">
            {mode === "signin" ? "Welcome back." : "Create your account."}
          </h1>
          <p className="mt-4 text-center text-muted-foreground">
            {mode === "signin"
              ? "Sign in to view orders, addresses and your edit."
              : "Join the Maison — private previews and seasonal letters."}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSignedIn(true);
            }}
            className="mt-12 space-y-6"
          >
            {mode === "register" && <Field label="Full Name" type="text" />}
            <Field label="Email" type="email" />
            <Field label="Password" type="password" />
            <button type="submit" className="w-full bg-ink py-4 eyebrow text-ivory hover:bg-shadow">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center eyebrow">
            <button
              onClick={() => setMode(mode === "signin" ? "register" : "signin")}
              className="link-underline"
            >
              {mode === "signin" ? "Create an account" : "Already have an account? Sign in"}
            </button>
          </div>
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
        className="mt-2 w-full border-b border-border bg-transparent pb-3 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<"orders" | "profile" | "addresses">("orders");
  return (
    <SiteLayout>
      <section className="px-6 pt-36 pb-12 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="eyebrow text-muted-foreground">— Madame</div>
          <h1 className="mt-4 font-display text-5xl lg:text-7xl">Anna's Maison</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 pb-32 lg:grid-cols-12 lg:px-10">
        <aside className="lg:col-span-3">
          <nav className="space-y-3 eyebrow border-t border-border pt-6">
            {(
              [
                ["orders", "Orders"],
                ["profile", "Profile"],
                ["addresses", "Addresses"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`block w-full text-left py-2 link-underline ${tab === k ? "text-ink" : "text-muted-foreground"}`}
              >
                {l}
              </button>
            ))}
            <button
              onClick={onSignOut}
              className="block w-full pt-6 text-left text-muted-foreground link-underline"
            >
              Sign Out
            </button>
          </nav>
        </aside>
        <div className="lg:col-span-9">
          {tab === "orders" && (
            <div>
              <div className="eyebrow text-muted-foreground">— Recent Orders</div>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {[
                  { id: "MM-208411", date: "12 May 2026", total: "€ 3,150", status: "Delivered" },
                  { id: "MM-204092", date: "02 March 2026", total: "€ 1,290", status: "Delivered" },
                ].map((o) => (
                  <div key={o.id} className="grid grid-cols-4 items-center py-6">
                    <div className="font-display text-xl">{o.id}</div>
                    <div className="text-muted-foreground">{o.date}</div>
                    <div>{o.total}</div>
                    <div className="text-right eyebrow">{o.status}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "profile" && (
            <div>
              <div className="eyebrow text-muted-foreground">— Profile</div>
              <div className="mt-6 space-y-6">
                <Field label="Full Name" type="text" />
                <Field label="Email" type="email" />
                <Field label="Phone" type="tel" />
                <button className="bg-ink px-10 py-4 eyebrow text-ivory">Save Changes</button>
              </div>
            </div>
          )}
          {tab === "addresses" && (
            <div>
              <div className="eyebrow text-muted-foreground">— Addresses</div>
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="border border-border p-6">
                  <div className="eyebrow">Primary · Dubai</div>
                  <p className="mt-3 leading-relaxed">
                    Anna Makeeva
                    <br />
                    Boulevard, Downtown
                    <br />
                    Dubai, UAE
                  </p>
                </div>
                <button className="border border-dashed border-border p-6 eyebrow text-muted-foreground hover:border-ink hover:text-ink">
                  + Add new address
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
