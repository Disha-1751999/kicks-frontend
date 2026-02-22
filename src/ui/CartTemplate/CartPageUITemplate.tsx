import CartTemplate from "./CartTemplate";
import ProductList from "../LandingPageTemplates/ProductList";

const CartPageUITemplate = () => {
  return (
    <div className="min-h-screen overflow-x-hidden mx-5 sm:default-margin md:mx-10 lg:mx-15 mt-8">
      <CartTemplate />
      <ProductList title="You may also like" variant="carousel" />
    </div>
  );
};

export default CartPageUITemplate;
