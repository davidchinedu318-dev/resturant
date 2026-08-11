"use client";

import { CreditCard, Wallet, Lock } from "lucide-react";
import { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useSession } from "next-auth/react";
import { useCart } from "../context/CartContext";
import Toast from "../Components/Toast";

export default function PaymentMethod({ deliveryData }) {
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [error, setError] = useState("");


  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const { data: session } = useSession();
  const { cartItems, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    setError("");

    // Required checkout information
    if (!deliveryData.phone) {
      setError("Please enter your phone number.");
      return;
    }

    if (!deliveryData.city) {
      setError("Please select your city.");
      return;
    }

    if (!deliveryData.road && !deliveryData.manualRoad) {
      setError("Please select a major road or enter it manually.");
      return;
    }


    if (!deliveryData.street && !deliveryData.manualStreet) {
      setError("Please select a street or enter it manually.");
      return;
    }


    if (!deliveryData.houseAddress.trim()) {
      setError("Please enter your house number, apartment, or landmark.");
      return;
    }



    if (paymentMethod === "cash") {
      showToastMessage("Order placed with Cash on Delivery.");
      return;
    }

    // Paystack
    const popup = new PaystackPop();

    popup.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,

      email: session?.user?.email || "customer@example.com",

      amount: total * 100,

      currency: "NGN",

      firstname: session?.user?.name?.split(" ")[0] || "",

      metadata: {
        custom_fields: [
          {
            display_name: "Restaurant",
            variable_name: "restaurant",
            value: "Eateny",
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: deliveryData.phone,
          },
          {
            display_name: "City",
            variable_name: "city",
            value: deliveryData.city,
          },
          {
            display_name: "Road",
            variable_name: "road",
            value:
              deliveryData.road || deliveryData.manualRoad,
          },
          {
            display_name: "Street",
            variable_name: "street",
            value:
              deliveryData.street ||
              deliveryData.manualStreet,
          },
          {
            display_name: "House Address",
            variable_name: "house_address",
            value: deliveryData.houseAddress,
          },
          {
            display_name: "Delivery Note",
            variable_name: "delivery_note",
            value: deliveryData.deliveryNote || "",
          },
        ],
      },

     //verify
     //create order
     //clear cart

onSuccess: async (transaction) => {
  try {
    //  Create order
    const orderResponse = await fetch("/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: session?.user?.name || "",
        user_email: session?.user?.email || "",

        phone: deliveryData.phone,
        city: deliveryData.city,

        road: deliveryData.road || "",
        street: deliveryData.street || "",

        manual_road: deliveryData.manualRoad || "",
        manual_street: deliveryData.manualStreet || "",

        house_address: deliveryData.houseAddress,
        delivery_note: deliveryData.deliveryNote || "",

        amount: total,

        cartItems,
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok || !orderData.success) {
      showToastMessage("Payment received, but we couldn't create your order.");
      return;
    }

    // Verify the Paystack payment
    const paymentResponse = await fetch(
      "/api/orders/update-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
          paymentReference: transaction.reference,
        }),
      }
    );

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok || !paymentData.success) {
      showToastMessage(
        "Payment was received but verification failed."
      );
      return;
    }

    
    showToastMessage(
      `Order placed successfully! Reference: ${transaction.reference}`
    );

    // Clear cart
    

  } catch (error) {
    console.error("Order processing error:", error);

    showToastMessage(
      "Something went wrong while processing your order."
    );
  }
},

      onCancel() {
        showToastMessage("Payment cancelled");
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        {/* Paystack */}
        <label
          className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition ${paymentMethod === "paystack"
            ? "border-orange-500 bg-orange-50"
            : "border-gray-200"
            }`}
        >
          <div className="flex items-center gap-3">
            <CreditCard className="text-orange-500" />

            <div>
              <p className="font-semibold">
                Paystack
              </p>

              <p className="text-sm text-gray-500">
                Secure online payment
              </p>
            </div>
          </div>

          <input
            type="radio"
            checked={paymentMethod === "paystack"}
            onChange={() => {
              setPaymentMethod("paystack");
              setError("");
            }}
          />
        </label>

        {/* Cash */}
        <label
          className={`flex items-center justify-between border rounded-2xl p-4 cursor-pointer transition ${paymentMethod === "cash"
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
            onChange={() => {
              setPaymentMethod("cash");
              setError("");
            }}
          />
        </label>

      </div>

      {/* Validation error */}
      {error && (
        <div className="mt-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        className="w-full mt-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition"
      >
        {paymentMethod === "paystack"
          ? "Proceed to Payment"
          : "Place Order"}
      </button>

      <p className="flex items-center justify-center text-center text-gray-500 text-sm mt-4 gap-2">
        <Lock
          className="text-orange-500"
          size={20}
        />

        Secure payments powered by Paystack
      </p>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}