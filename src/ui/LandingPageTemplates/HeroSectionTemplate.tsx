import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface HeroSectionTemplateProps {
  heroProduct: { images: string[] };
}

const HeroSectionTemplate = ({
  heroProduct,
  loading,
  error,
}: HeroSectionTemplateProps & { loading?: boolean; error?: any }) => {
  const [selectedHeroImageIndex, setSelectedHeroImageIndex] = useState<
    number | null
  >(null);

  if (loading) {
    return (
      <div className="pt-30">
        <section className="w-full mx-auto animate-pulse">
          {/* Title Skeleton */}
          <div className="h-20 bg-gray-200 rounded-md w-2/3 mx-auto mb-10" />

          {/* Image Skeleton */}
          <div className="mt-10 relative rounded-[40px] overflow-hidden">
            <div className="w-full h-125 bg-gray-300 rounded-[40px]" />
          </div>
        </section>
      </div>
    );
  }

  /* ===================== ERROR STATE ===================== */
  if (error || !heroProduct?.images?.length) {
    return (
      <div className="pt-30">
        <section className="w-full mx-auto text-center py-24">
          <h2 className="text-3xl font-bold text-gray-800">
            Something went wrong
          </h2>
          <p className="mt-4 text-gray-500">
            We couldn’t load the featured product.
          </p>

          <Button className="mt-6 cursor-pointer" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </section>
      </div>
    );
  }
  return (
    <div className="pt-30">
      {/* ================= HERO SECTION ================= */}
      <section className="w-full mx-auto">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[130px] xl:text-[130px]  font-extrabold leading-[0.9] tracking-normal text-center">
          <span className="text-black">DO IT</span>{" "}
          <span className="text-blue-600">RIGHT</span>
        </h1>

        <div className="mt-10 relative rounded-[40px] overflow-hidden">
          <Image
            src={
              selectedHeroImageIndex !== null
                ? (heroProduct?.images[selectedHeroImageIndex] ??
                  "/placeholder.png")
                : (heroProduct?.images?.[0] ?? "/placeholder.jpg")
            }
            alt="Nike Air Max"
            width={1600}
            height={900}
            className="w-full object-cover"
            priority
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />

          {/* Vertical Badge */}
          <div className="absolute left-4 top-1/3 -translate-y-1/2">
            <div className="bg-black text-white text-xs px-4 py-4 rounded-br-lg rounded-bl-lg origin-left -rotate-90">
              Nike product of the year
            </div>
          </div>

          {/* Bottom Left Text */}
          <div className="absolute  bottom-8 text-white  px-4 sm:px-12 md:px-12">
            <h2 className="text-2xl sm:text-5xl font-bold ">NIKE AIR MAX</h2>
            <p className="mt-4 text-sm sm:text-lg opacity-90 w-2/3 max-w-xs sm:max-w-md md:max-w-lg ">
              Nike introducing the new air max for everyone’s comfort
            </p>

            <Button className="mt-6 bg-primary cursor-pointer hover:bg-blue-700 text-white font-bold rounded-lg px-6 py-5">
              SHOP NOW
            </Button>
          </div>

          {/* Right Thumbnails */}
          <div className="absolute right-8 bottom-8 flex flex-col gap-4 cursor-pointer">
            {heroProduct?.images.slice(0, 2).map((img, index) => (
              <div
                className={`w-20 h-20  sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 ${selectedHeroImageIndex === index ? "border-blue-500" : "border-white"} shadow-lg`}
                key={index}
                onClick={() => setSelectedHeroImageIndex(index)}
              >
                <Image
                  src={img || "/placeholder.jpg"}
                  alt="thumb"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSectionTemplate;
