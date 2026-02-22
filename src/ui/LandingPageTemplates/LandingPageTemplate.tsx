"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/ProductService";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import CategoriesSection from "./CategoriesSection";
import ReviewsSectionTemplates from "./ReviewSectionTemplate";
import HeroSectionTemplate from "./HeroSectionTemplate";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setProducts,
  setLoading,
  setError,
} from "@/features/products/productsSlice";

export default function LandingPageTemplate() {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setError("Failed to load products"));
    }
  }, [error, dispatch]);

  const router = useRouter();

  const heroProduct = data && data.length > 0 ? data[0] : null;

  return (
    <>
      <div className="min-h-screen overflow-x-hidden mx-5 sm:default-margin md:mx-10 lg:mx-15">
        <HeroSectionTemplate
          heroProduct={heroProduct || { images: [] }}
          loading={isLoading}
          error={error}
        />

        <ProductList
          title={`DON'T MISS OUT\nNEW DROPS`}
          variant="grid"
          ctaLabel="SHOP NEW DROPS"
          onCtaClick={() => router.push("/shop")}
        />
      </div>
      <CategoriesSection />
      <div className="min-h-screen overflow-x-hidden mx-5 sm:default-margin md:mx-10 lg:mx-15">
        <ReviewsSectionTemplates />
      </div>
    </>
  );
}
