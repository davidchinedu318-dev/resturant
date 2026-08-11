"use client";

import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

export default function CheckoutPage() {
  const [deliveryData, setDeliveryData] = useState({
    phone: "",
    city: "",
    road: "",
    street: "",
    manualRoad: "",
    manualStreet: "",
    houseAddress: "",
    deliveryNote: "",
  });

  return (
    <div
      className="min-h-screen px-4 md:px-8 lg:px-12 py-12"
      style={{ backgroundColor: "#FDF6EC" }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your order securely.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            <CheckoutForm
              deliveryData={deliveryData}
              setDeliveryData={setDeliveryData}
            />

            <PaymentMethod
              deliveryData={deliveryData}
            />

          </div>

          {/* Right */}
          <div>
            <OrderSummary />
          </div>

        </div>

      </div>
    </div>
  );
}