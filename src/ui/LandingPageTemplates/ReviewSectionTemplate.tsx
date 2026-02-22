import { Star } from "lucide-react";

function Stars({ value = 5 }) {
  const full = Math.floor(value);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < full ? "fill-[#F6A21A] text-[#F6A21A]" : "text-[#D6D6D6]"
            }
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-[#1b1b1b]">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

interface ReviewCardProps {
  title: string;
  subtitle: string;
  rating: number;
  avatar: string;
  image: string;
  highlight?: boolean;
}

function ReviewCard({
  title,
  subtitle,
  rating,
  avatar,
  image,
  highlight = false,
}: ReviewCardProps) {
  return (
    <div className="bg-white rounded-[22px] shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 relative">
        <div className="font-extrabold text-[18px] text-[#1b1b1b] leading-none">
          {title}
        </div>
        <div className="mt-2 text-[13px] text-[#7b7b7b] leading-snug max-w-55">
          {subtitle}
        </div>

        <div className="mt-3">
          <Stars value={rating} />
        </div>

        <img
          src={avatar}
          alt=""
          className="absolute right-5 top-5 w-11 h-11 rounded-full object-cover"
        />
      </div>

      <div className={`rounded-t-2xl overflow-hidden `}>
        <img src={image || "/placeholder.jpg"} alt="" className="w-full h-[215px] object-cover" />
      </div>
    </div>
  );
}

export default function ReviewsSectionTemplates() {
  const reviews = [
    {
      title: "Good Quality",
      subtitle: "I highly recommend shopping from kicks",
      rating: 5.0,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80",
      image: "/065dfae6a3a6b036c2db9b25cb7d96ae493a5677.png",
      highlight: true,
    },
    {
      title: "Good Quality",
      subtitle: "I highly recommend shopping from kicks",
      rating: 5.0,
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=96&q=80",
      image: "/2acfd7ea94280be066acbb4390d7dded8bfa9e67.png",
    },
    {
      title: "Good Quality",
      subtitle: "I highly recommend shopping from kicks",
      rating: 5.0,
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&q=80",
      image: "/eaeaba74c0e72d29eeed3df06ea071eaaeb0e410.png",
    },
  ];

  return (
    <section className="w-full bg-[#E9E7E2] py-12">
      <div className="mx-auto px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[#1b1b1b] text-[52px] font-extrabold tracking-wide">
            REVIEWS
          </h2>

          <button className="h-10 px-5 rounded-md cursor-pointer bg-[#4E67FF] text-white text-xs font-semibold tracking-wide">
            SEE ALL
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <ReviewCard key={idx} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
