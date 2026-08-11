"use client";

import { useCart } from "../context/CartContext";
import { Truck } from "lucide-react"

export default function OrderSummary() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 lg:sticky lg:top-24">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Order Summary
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-4 max-h-72 overflow-y-auto">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-orange-500">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}

          </div>

          <div className="border-t mt-6 pt-6 space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-semibold">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Delivery Fee
              </span>

              <span className="font-semibold">
                ₦{deliveryFee.toLocaleString()}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-xl font-bold text-orange-500">
                ₦{total.toLocaleString()}
              </span>

            </div>

          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-2xl">

            <p className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="text-orange-500\\" size={20}/> Estimated Delivery
            </p>

            <p className="font-semibold text-orange-600">
              30 - 45 Minutes
            </p>

          </div>
        </>
      )}
    </div>
  );
}