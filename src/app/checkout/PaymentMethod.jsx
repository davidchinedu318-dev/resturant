"use client";

import { CreditCard, Wallet } from "lucide-react";
import { useState } from "react";

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("paystack");

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        {/* Paystack */}
        <label
          className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition ${
            paymentMethod === "paystack"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <CreditCard className="text-orange-500" />

            <div>
              <p className="font-semibold">Paystack</p>
              <p className="text-sm text-gray-500">
                Secure online payment
              </p>
            </div>
          </div>

          <input
            type="radio"
            checked={paymentMethod === "paystack"}
            onChange={() => setPaymentMethod("paystack")}
          />
        </label>

        {/* Cash */}
        <label
          className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition ${
            paymentMethod === "cash"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Wallet className="text-orange-500" />

            <div>
              <p className="font-semibold">
                Cash on Delivery
              </p>

              <p className="text-sm text-gray-500">
                Pay when your order arrives
              </p>
            </div>
          </div>

          <input
            type="radio"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
        </label>

      </div>

      <button className="w-full mt-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition">
        Proceed to Payment
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        🔒 Secure payments powered by Paystack
      </p>

    </div>
  );
}