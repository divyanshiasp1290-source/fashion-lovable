import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ImagePlate } from "@/components/site/ImagePlate";
import { markForKey } from "@/lib/marks";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWishlist } = useStore();
  const liked = wishlist.includes(product.slug);
  const secondary = product.gallery[1] ?? product.image;
  const mark = markForKey(product.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative"
    >
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block focus-visible:outline-none"
        data-cursor="piece"
      >
        <div className="relative bg-bone">
          <ImagePlate
            src={product.image}
            secondarySrc={secondary}
            alt={product.name}
            interaction="product"
            mark={mark}
            priority={index < 2}
            className="group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-offset-2 group-focus-visible:outline-ink"
          />
          {(product.isNew || product.bestSeller) && (
            <span
              className="pointer-events-none absolute left-4 top-4 z-[1] eyebrow bg-ivory/85 px-2 py-1 text-ink"
              aria-hidden
            >
              {product.isNew ? "New" : "Icon"}
            </span>
          )}
        </div>
      </Link>
      <button
        type="button"
        onClick={() => toggleWishlist(product.slug)}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={liked}
        className="absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center bg-ivory/85 text-ink transition hover:bg-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Heart className="h-4 w-4" strokeWidth={1} fill={liked ? "currentColor" : "none"} />
      </button>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="eyebrow text-muted-foreground">{product.collection}</div>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="mt-1 inline-block font-display text-xl leading-tight link-underline"
          >
            {product.name}
          </Link>
        </div>
        <div className="font-display text-lg">{formatPrice(product.price)}</div>
      </div>
    </motion.div>
  );
}
