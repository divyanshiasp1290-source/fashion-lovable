import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      {/* Newsletter */}
      <div className="border-b border-ivory/15">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <div className="eyebrow text-ivory/60">The House Letter</div>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] lg:text-7xl">
              Private notes from the atelier, four times a year.
            </h2>
          </div>
          <div className="flex items-end">
            <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-xl">
              <div className="flex items-end gap-6 border-b border-ivory/30 pb-3">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="flex-1 bg-transparent text-lg placeholder:text-ivory/40 focus:outline-none"
                />
                <button type="submit" className="eyebrow link-underline shrink-0">
                  Subscribe
                </button>
              </div>
              <p className="mt-4 text-xs text-ivory/50">
                By subscribing you agree to receive marketing from Maison Makeeva. Unsubscribe at
                any time.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-2">
          <div className="font-display text-3xl tracking-[0.18em]">MAISON MAKEEVA</div>
          <p className="mt-6 max-w-sm text-sm text-ivory/65 leading-relaxed">
            An independent fashion house dedicated to considered design and quiet craftsmanship.
            Designed in Dubai, made in Italy.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-ivory/70 hover:text-ivory"
            >
              <Instagram className="h-4 w-4" strokeWidth={1} />
            </a>
          </div>
        </div>

        <FooterCol
          title="Maison"
          items={[
            { label: "The House", to: "/about" },
            { label: "Lookbook", to: "/lookbook" },
            { label: "Contact", to: "/contact" },
            { label: "Boutiques", to: "/contact" },
          ]}
        />
        <FooterCol
          title="Client Care"
          items={[
            { label: "My Account", to: "/account" },
            { label: "Wishlist", to: "/wishlist" },
            { label: "Cart", to: "/cart" },
            { label: "Size Guide", to: "/about" },
          ]}
        />
        <FooterCol
          title="Legal"
          items={[
            { label: "Shipping", to: "/about" },
            { label: "Returns", to: "/about" },
            { label: "Privacy", to: "/about" },
            { label: "Terms", to: "/about" },
          ]}
        />
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-6 py-8 text-xs text-ivory/50 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>© {new Date().getFullYear()} Maison Makeeva. All rights reserved.</div>
          <div className="eyebrow">Designed in Dubai · Made in Italy</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="eyebrow text-ivory/55">{title}</div>
      <ul className="mt-6 space-y-3 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} className="link-underline text-ivory/85">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
