import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Maison Makeeva" },
      { name: "description", content: "Your private edit." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));

  return (
    <SiteLayout>
      <section className="border-b border-border px-6 pt-40 pb-16 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="eyebrow text-muted-foreground">— Your Edit</div>
          <h1 className="mt-6 font-display text-6xl lg:text-8xl">Wishlist</h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-4xl">Your wishlist is empty.</p>
            <p className="mx-auto mt-6 max-w-md text-shadow">
              Save the pieces you love — they'll wait for you here.
            </p>
            <Link
              to="/collection/$slug"
              params={{ slug: "atelier-ss26" }}
              className="mt-10 inline-flex items-center bg-ink px-10 py-4 eyebrow text-ivory hover:bg-shadow"
            >
              Discover Atelier SS26
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
