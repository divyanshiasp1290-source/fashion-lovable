import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist, toggleWishlist } = useStore();
  const liked = wishlist.includes(product.slug);
  const secondary = product.gallery[1] ?? product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className="group"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
          <img
            src={secondary}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-[1200ms] group-hover:opacity-100 group-hover:scale-100"
          />
          {(product.isNew || product.bestSeller) && (
            <span className="absolute left-4 top-4 eyebrow bg-ivory/85 px-2 py-1 text-ink backdrop-blur">
              {product.isNew ? "New" : "Icon"}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.slug);
            }}
            aria-label="Add to wishlist"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center bg-ivory/85 text-ink backdrop-blur transition hover:bg-ivory"
          >
            <Heart className="h-4 w-4" strokeWidth={1} fill={liked ? "currentColor" : "none"} />
          </button>
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ivory/95 px-4 py-3 text-center eyebrow text-ink backdrop-blur transition-transform duration-500 group-hover:translate-y-0">
            Quick View
          </div>
        </div>
      </Link>
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
