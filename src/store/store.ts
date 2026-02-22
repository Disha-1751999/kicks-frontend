import  cartReducer  from '@/features/cart/cartSlice';
import productReducer from "@/features/products/productSlice";
import productsReducer from "@/features/products/productsSlice";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
      products: productsReducer,
      product: productReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;