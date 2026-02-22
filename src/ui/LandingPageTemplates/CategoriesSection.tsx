import { fetchCategories } from "@/services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

export default function CategoriesSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const pageSize = 2;
  const [page, setPage] = useState(0);

  const categories = data ?? [];

  const totalPages = Math.max(1, Math.ceil(categories.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);

  const visible = useMemo(() => {
    const start = safePage * pageSize;
    return categories.slice(start, start + pageSize);
  }, [categories, safePage]);

  const canPrev = safePage > 0;
  const canNext = safePage < totalPages - 1;

  const onPrev = () => {
    if (!canPrev) return;
    setPage((p) => p - 1);
  };

  const onNext = () => {
    if (!canNext) return;
    setPage((p) => p + 1);
  };
  if (isLoading) {
    return (
      <section className="w-full py-12 bg-linear-to-b from-[#1f1f1f] to-[#2a2a2a]">
        <div className="mx-auto ps-6">
          <div className="rounded-[32px] ps-10 relative">
            <div className="flex justify-between items-center mb-10">
              <div className="h-12 w-72 bg-white/10 rounded animate-pulse" />
              <div className="flex gap-3 mr-8">
                <div className="w-9 h-9 bg-white/10 rounded-md animate-pulse" />
                <div className="w-9 h-9 bg-white/10 rounded-md animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-0">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="min-h-95 bg-white/10 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="w-full py-12 bg-linear-to-b from-[#1f1f1f] to-[#2a2a2a] text-center">
        <h2 className="text-white text-5xl font-extrabold tracking-wide mb-6">
          CATEGORIES
        </h2>
        <p className="text-white/70">
          Failed to load categories. Please try again.
        </p>
      </section>
    );
  }
  if (!categories.length) {
    return (
      <section className="w-full py-12 bg-linear-to-b from-[#1f1f1f] to-[#2a2a2a] text-center">
        <h2 className="text-white text-5xl font-extrabold tracking-wide mb-6">
          CATEGORIES
        </h2>
        <p className="text-white/70">No categories available.</p>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-linear-to-b from-[#1f1f1f] to-[#2a2a2a]">
      <div className="mx-auto ps-0 sm:ps-6">
        <div className="rounded-[32px] ps-10 relative">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-white text-5xl font-extrabold tracking-wide">
              CATEGORIES
            </h2>

            <div className="flex gap-3 mr-8">
              <button
                onClick={onPrev}
                disabled={!canPrev}
                className={`w-9 h-9 bg-gray-400 rounded-md flex items-center justify-center transition
                  ${canPrev ? "bg-white" : " cursor-not-allowed"}`}
              >
                <ChevronLeft size={18} className="text-black" />
              </button>

              <button
                onClick={onNext}
                disabled={!canNext}
                className={`w-9 h-9 bg-gray-400 rounded-md flex items-center justify-center transition
                  ${canNext ? "bg-white" : " cursor-not-allowed"}`}
              >
                <ChevronRight size={18} className="text-black" />
              </button>
            </div>
          </div>
          <div className="bg-[#e9e9e9] rounded-tl-[28px] overflow-hidden grid grid-cols-1 sm:grid-cols-2">
            {visible.map((category, index) => (
              <div
                key={category.id ?? `${safePage}-${index}`}
                className="relative first:bg-[#efefef] bg-white flex flex-col justify-between min-h-95"
              >
                <div className="flex justify-center items-center flex-1">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-contain"
                  />
                </div>

                <div className="absolute bottom-5 flex justify-between items-end gap-3 px-8 mt-6 w-full">
                  <h3 className="text-2xl font-bold text-[#1f1f1f] leading-tight">
                    {category.name}
                  </h3>

                  <button className="w-10 h-10 bg-black rounded-md flex items-center justify-center hover:scale-105 transition">
                    <ArrowUpRight size={18} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
            {visible.length === 1 && <div className="bg-white min-h-95" />}
          </div>
        </div>
      </div>
    </section>
  );
}
