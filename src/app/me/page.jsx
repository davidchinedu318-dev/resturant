export default function UserDashboard() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-500">Eateny</h1>

        <div className="flex items-center gap-6">
          <button className="text-2xl">🔔</button>

          <div className="flex items-center gap-3">
            <img
              src="https://placehold.co/45x45"
              alt="Profile"
              className="w-11 h-11 rounded-full"
            />
            <div>
              <p className="font-semibold">David</p>
              <p className="text-sm text-gray-500">Customer</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">

        {/* Welcome Section */}
        <section className="bg-orange-500 text-white rounded-3xl p-8 flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-orange-100">
              Ready to enjoy your favorite meals today?
            </p>

            <button className="mt-6 bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold">
              Order Now
            </button>
          </div>

          <div className="text-8xl">
            🍔
          </div>
        </section>

        {/* Statistics Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-500">Orders</h3>
            <p className="text-3xl font-bold mt-2">18</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-500">Favorites</h3>
            <p className="text-3xl font-bold mt-2">7</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-500">Active Orders</h3>
            <p className="text-3xl font-bold mt-2">1</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-gray-500">Points</h3>
            <p className="text-3xl font-bold mt-2">350</p>
          </div>

        </section>

        {/* Current Order Section */}
        <section className="bg-white rounded-3xl shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Current Order
          </h2>

          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-xl font-semibold">
                Double Cheeseburger
              </h3>

              <p className="text-gray-500">
                Fries + Coke
              </p>

              <span className="inline-block mt-4 bg-orange-100 text-orange-500 px-4 py-2 rounded-full">
                Preparing
              </span>
            </div>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl">
              Track Order
            </button>

          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-8">

          <button className="bg-white shadow rounded-2xl p-6 font-semibold">
            👤 <br /> Profile
          </button>

          <button className="bg-white shadow rounded-2xl p-6 font-semibold">
            📦 <br /> Orders
          </button>

          <button className="bg-white shadow rounded-2xl p-6 font-semibold">
            ❤️ <br /> Favorites
          </button>

          <button className="bg-white shadow rounded-2xl p-6 font-semibold">
            📍 <br /> Address
          </button>

          <button className="bg-white shadow rounded-2xl p-6 font-semibold text-red-500">
            🚪 <br /> Logout
          </button>

        </section>

        {/* Recent Orders Section */}
        <section className="bg-white rounded-3xl shadow p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-4">
              <span>Burger Combo</span>
              <span className="text-green-600">Delivered</span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span>Chicken Pizza</span>
              <span className="text-orange-500">Preparing</span>
            </div>

            <div className="flex justify-between">
              <span>Shawarma Combo</span>
              <span className="text-red-500">Cancelled</span>
            </div>

          </div>

        </section>

        {/* Recommended Foods Section */}
        <section className="mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Recommended For You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[1,2,3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl shadow overflow-hidden"
              >
                <img
                  src="https://placehold.co/400x220"
                  alt="Food"
                  className="w-full"
                />

                <div className="p-5">
                  <h3 className="font-bold text-lg">
                    Pepperoni Pizza
                  </h3>

                  <p className="text-orange-500 font-semibold mt-2">
                    ₦8,500
                  </p>

                  <button className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-xl">
                    Add To Cart
                  </button>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* Footer Section */}
        <footer className="text-center text-gray-500 py-8">
          © 2026 Eateny. All Rights Reserved.
        </footer>

      </div>

    </main>
  );
}