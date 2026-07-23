import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

export default function CheckoutPage() {
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
          <div className="lg:col-span-2">
            <CheckoutForm />

            {/* Desktop only */}
            <div className="hidden lg:block mt-6">
              <PaymentMethod />
            </div>
          </div>

          {/* Right */}
          <div>
            <OrderSummary />
          </div>

        </div>

        {/* Mobile only */}
        <div className="block lg:hidden mt-6">
          <PaymentMethod />
        </div>

      </div>
    </div>
  );
}