"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ChefHat,
  XCircle,
  MapPin,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/my-orders");

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={18} />;

      case "preparing":
        return <ChefHat size={18} />;

      case "out_for_delivery":
        return <Truck size={18} />;

      case "delivered":
        return <CheckCircle size={18} />;

      case "cancelled":
        return <XCircle size={18} />;

      default:
        return <Clock size={18} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";

      case "preparing":
        return "Preparing";

      case "out_for_delivery":
        return "Out for delivery";

      case "delivered":
        return "Delivered";

      case "cancelled":
        return "Cancelled";

      default:
        return "Pending";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800">
            My Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Track your Eateny orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm">

            <Package
              size={48}
              className="mx-auto text-orange-400 mb-4"
            />

            <h2 className="text-xl font-bold text-gray-800">
              No orders yet
            </h2>

            <p className="text-gray-500 mt-2">
              Your orders will appear here after checkout.
            </p>

            <Link
              href="/menu"
              className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Browse Menu
            </Link>

          </div>
        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-sm p-6"
              >

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div>
                    <p className="text-sm text-gray-400">
                      Order #{order.id}
                    </p>

                    <p className="text-xl font-bold text-gray-800">
                      ₦{Number(order.amount).toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold w-fit ${order.order_status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.order_status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-600"
                      }`}
                  >
                    {getStatusIcon(order.order_status)}

                    {getStatusText(order.order_status)}
                  </div>

                </div>

                <div className="border-t my-5" />

                <div className="flex items-start gap-3">

                  <MapPin
                    size={20}
                    className="text-orange-500 mt-1"
                  />

                  <div className="text-sm text-gray-600">

                    <p className="font-semibold text-gray-800">
                      Delivery Address
                    </p>

                    <p>
                      {order.house_address}
                    </p>

                    <p>
                      {order.street || order.manual_street},{" "}
                      {order.road || order.manual_road}
                    </p>

                    <p>
                      {order.city}
                    </p>

                  </div>

                </div>

                <div className="mt-5 text-sm">

                  <span
                    className={
                      order.payment_status === "paid"
                        ? "text-green-600 font-semibold flex items-center gap-1"
                        : "text-orange-500 font-semibold"
                    }
                  >
                    {order.payment_status === "paid" ? (
                      <>
                        <  CheckCircle size={20} />
                        Payment confirmed
                      </>
                    ) : (
                      "Payment pending"
                    )}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}