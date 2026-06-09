import Link from "next/link"

export default function AboutPreview() {
  return (
    <section className="bg-black text-white px-4 md:px-8 lg:px-12 py-16">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Text */}
        <div className="flex-1">
          <p className="text-orange-400 text-sm uppercase tracking-widest mb-3">Who We Are</p>
          <h2 className="text-4xl font-bold mb-4">We Deliver More Than Just Food</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Eateny was born out of a simple frustration — great food was everywhere but getting it delivered fast and fresh was a challenge. We set out to change that.
          </p>
          <Link href="/about" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition cursor-pointer">
            Read Our Story
          </Link>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"
            alt="Eateny kitchen"
            className="rounded-2xl w-full h-72 object-cover"
          />
        </div>

      </div>
    </section>
  )
}