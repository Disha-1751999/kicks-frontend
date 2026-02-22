"use client";

import ProductDetails from "./ProductDetails";
import ProductList from "../LandingPageTemplates/ProductList";

export default function ProductDetailsPageTemplate() {

  return (
    <div className="min-h-screen overflow-x-hidden mx-5 sm:default-margin md:mx-10 lg:mx-15">
      <ProductDetails />
      <ProductList
        title="You may also like"
        variant="carousel"
      />
    </div>
  );
}
