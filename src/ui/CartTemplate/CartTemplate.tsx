"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function CartTemplate() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const delivery = cartItems.length > 0 ? 6.99 : 0;
  const total = subtotal + delivery;

  const handleRemoveItemFromCart = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="bg-[#E7E7E3] min-h-screen pt-24 pb-4  sm:pb-10">
      <h1 className="text-3xl font-bold mb-3">Saving to celebrate</h1>
      <p className=" text-gray-600 mb-10 max-w-2xl">
        Enjoy up to 60% off thousands of styles during the End of Year sale -
        while suppiles last. No code needed.
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Your Bag</h2>
            <p className="text-sm text-gray-500 mt-1">
              Items in your bag not reserved - check out now to make them yours.
            </p>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 border-b pb-6">
                <div className="w-32 h-32 bg-[#F3F3F1] rounded-xl relative">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-contain p-3"
                  />
                </div>
                <div className="flex flex-col flex-1 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-[#4D7CF3] font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value),
                          }),
                        )
                      }
                      className="border rounded-md px-3 py-1"
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>
                          Qty {q}
                        </option>
                      ))}
                    </select>

                    <button>
                      <Heart size={18} />
                    </button>

                    <button onClick={() => handleRemoveItemFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bg-white rounded-2xl p-6 space-y-6 h-fit">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{cartItems.length} ITEM</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>${delivery.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span>-</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button className="w-full bg-black text-white h-12">CHECKOUT</Button>

          <button className="text-sm underline text-gray-600">
            Use a promo code
          </button>
        </div>
      </div>
    </section>
  );
}
