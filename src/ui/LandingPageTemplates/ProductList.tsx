"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts, Product } from "@/services/ProductService";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import {
  setError,
  setLoading,
  setProducts,
} from "@/features/products/productsSlice";

type Variant = "grid" | "carousel";

interface ProductSectionProps {
  title: string;
  variant?: Variant;
  ctaLabel?: string;
  onCtaClick?: () => void;
  bgColor?: string;
  carouselItemsPerPage?: number;
}

export default function ProductList({
  title = "You may also like",
  variant = "carousel",
  ctaLabel,
  onCtaClick,
  bgColor = "#E7E7E3",
  carouselItemsPerPage = 4,
}: ProductSectionProps) {
  const products = useSelector((state: RootState) => state.products.items);

  const loading = useSelector((state: RootState) => state.products.loading);

  const error = useSelector((state: RootState) => state.products.error);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (variant !== "carousel") return 1;
    return Math.ceil(products.length / carouselItemsPerPage);
  }, [products.length, carouselItemsPerPage, variant]);

  const paginatedProducts = useMemo(() => {
    if (variant !== "carousel") return [];

    const start = (currentPage - 1) * carouselItemsPerPage;
    const end = start + carouselItemsPerPage;
    return products.slice(start, end);
  }, [products, currentPage, carouselItemsPerPage, variant]);

  useEffect(() => {
    setCurrentPage(1);
  }, [products, variant]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      const fetchProductsdata = async () => {
        try {
          dispatch(setLoading(true));

          const res = await fetchProducts();

          dispatch(setProducts(res || []));
        } catch (err) {
          dispatch(setError("Failed to load products"));
        }
      };

      fetchProductsdata();
    }
  }, [products.length, dispatch]);

  if (loading || error || !products.length) return null;

  return (
    <section className="w-full py-16 px-4" style={{ backgroundColor: bgColor }}>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-1/2">
          {title}
        </h2>

        {variant === "grid" && ctaLabel && (
          <Button
            onClick={onCtaClick}
            className="bg-[#4D7CF3] hover:bg-[#2f63e6] text-white px-6 py-3 rounded-lg text-sm font-medium"
          >
            {ctaLabel}
          </Button>
        )}

        {variant === "carousel" && (
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </Button>

            <Button
              size="icon"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
      {variant === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex gap-6 justify-center">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="min-w-65">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  return (
    <Card
      className="rounded-2xl bg-transparent p-4 shadow-none border-none"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <CardContent className="p-0">
        {" "}
        <div className="relative w-full mb-4 overflow-hidden rounded-3xl bg-[#F5F5F4] flex justify-center items-center [&>img]:rounded-4xl [&>img]:overflow-hidde">
          <span className="absolute top-2 left-2 bg-[#4D7CF3] text-white text-xs px-3 py-1 rounded-tl-xl rounded-br-xl">
            New
          </span>
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.title}
            width={300}
            height={300}
            className="object-cover p-2"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />
        </div>
        <h3 className="text-sm uppercase font-bold text-black mb-4 leading-tight">
          {" "}
          {product.title}{" "}
        </h3>
        <Button className="w-full bg-black text-white hover:bg-gray-900 text-xs py-3 rounded-lg">
          {" "}
          VIEW PRODUCT -{" "}
          <span className="text-[#FFD86C] ml-1">${product.price}</span>
        </Button>
      </CardContent>
    </Card>
  );
}
