import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/services/ProductService";

interface CartItem extends Product {
  quantity: number,
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

addToCart: (state, action: PayloadAction<any>) => {
  const existing = state.items.find(
    (item) => item.id === action.payload.id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    state.items.push({
      ...action.payload,
      quantity: 1,
    });
  }
},

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

       updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id
      );
      if (item) item.quantity = action.payload.quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;