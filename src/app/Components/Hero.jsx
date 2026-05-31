export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('/image/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <p className="text-orange-400 text-sm uppercase tracking-widest mb-4">Fresh & Fast Delivery</p>
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Eat Good. <br /> Feel Good.
        </h1>
        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
          From local favourites to international cuisine — order fresh meals delivered straight to your door.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-orange-500 hover:bg-orange-600 transition cursor-pointer px-8 py-3 rounded-lg font-bold text-white">
            Order Now
          </button>
          <button className="border border-white hover:bg-white hover:text-black transition cursor-pointer px-8 py-3 rounded-lg font-bold">
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
}