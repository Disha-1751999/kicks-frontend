"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { fetchProductById } from "@/services/ProductService";
import { Skeleton } from "@/components/Skeleton";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  if (isLoading) {
    return (
      <section className="w-full bg-[#E7E7E3] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton
                  key={item}
                  className="aspect-square rounded-2xl bg-[#D9D9D6]"
                />
              ))}
            </div>

            <div className="flex flex-col space-y-6 max-w-lg w-full">
              <Skeleton className="h-6 w-24 rounded-full bg-[#D9D9D6]" />
              <Skeleton className="h-8 w-full bg-[#D9D9D6]" />
              <Skeleton className="h-6 w-28 bg-[#D9D9D6]" />
              <Skeleton className="h-12 w-full bg-[#D9D9D6]" />
              <Skeleton className="h-12 w-full bg-[#D9D9D6]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <div className="p-10 text-center bg-[#E7E7E3]">
        Failed to load product.
      </div>
    );
  }

  return (
    <section className="bg-[#E7E7E3] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="lg:hidden">
          <div className="bg-[#F3F3F1] rounded-3xl p-6">
            <div className="relative aspect-square">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {product.images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className="relative w-20 h-20 rounded-xl bg-[#F3F3F1] flex-shrink-0 overflow-hidden"
              >
                <Image
                  src={img}
                  alt={product.title}
                  fill
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>

          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-20">
          <div className="grid grid-cols-2 gap-2">
            {product.images.map((img: string, index: number) => (
              <div key={index} className="relative bg-[#F3F3F1] aspect-square">
                <Image
                  src={img}
                  alt={product.title}
                  fill
                  className="object-contain p-10"
                />
              </div>
            ))}
          </div>

          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
      </div>
    </section>
  );
}

function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}: any) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images,
        quantity: 1,
      }),
    );

    toast.success("Added to cart!");
  };
  return (
    <div className="flex flex-col space-y-6  w-full">
      <span className="bg-[#4D7CF3] text-white text-xs px-3 py-1 rounded-md w-fit">
        New Release
      </span>

      <h1 className="text-3xl font-extrabold uppercase leading-tight">
        {product.title}
      </h1>

      <p className="text-xl font-bold text-[#4D7CF3]">
        ${product.price.toFixed(2)}
      </p>

      {product.colors && (
        <div>
          <p className="text-xs font-semibold mb-3 tracking-wide">COLOR</p>
          <div className="flex gap-3">
            {product.colors.map((color: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {product.sizes && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold tracking-wide">SIZE</p>
            <span className="text-xs underline cursor-pointer">SIZE CHART</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size: number) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-10 text-sm rounded-md border font-medium ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-[#F3F3F1] text-black border-[#E0E0DC]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleAddToCart}
          className="flex-1 h-12 bg-black text-white hover:bg-black/90 rounded-md"
        >
          ADD TO CART
        </Button>

        <Button className="h-12 w-12 bg-black text-white hover:bg-black/90 rounded-md">
          <Heart size={18} />
        </Button>
      </div>

      <Button className="w-full h-12 bg-[#4D7CF3] hover:bg-[#2f63e6] text-white rounded-md">
        BUY IT NOW
      </Button>

      <div className="pt-6 space-y-4 text-sm">
        <h3 className="font-bold uppercase border-b pb-1 w-fit">
          About the product
        </h3>

        <p className="text-gray-600">{product.description}</p>

        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Pay over time in interest-free installments.</li>
          <li>Free standard shipping, returns & exchanges.</li>
        </ul>
      </div>
    </div>
  );
}
