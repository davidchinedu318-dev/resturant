export default function AboutPage() {
    return (
        <div className="min-h-screen bg-orange-50">

            {/* Hero Banner */}
            <div className="bg-black text-white text-center py-20 px-6">
                <h1 className="text-5xl font-bold mb-4">About <span className="text-orange-400">Eateny</span></h1>
                <p className="text-gray-300 text-lg max-w-xl mx-auto">We are more than a food platform — we are your daily dining companion.</p>
            </div>

            {/* Our Story */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    Eateny was born out of a simple frustration.......great food was everywhere but getting it delivered fast and fresh was a challenge. We set out to change that.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Starting from a small kitchen in Nigeria, we have grown into a platform that connects food lovers with the best local and international cuisine. Every meal tells a story and we are here to deliver yours.
                </p>
            </section>

            {/* Divider */}
            <div className="border-t border-orange-100 max-w-4xl mx-auto" />

            {/* Our Mission */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Mission</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="bg-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Quality First</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Every dish on Eateny meets a high standard of freshness, taste and presentation before it reaches you.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="bg-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Fast & Reliable</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">We know hunger does not wait. Our delivery system is built to get your food to you hot and on time, every time.</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="bg-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Community Driven</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">We support local chefs and restaurants, helping them reach more customers while keeping Nigerian food culture alive.</p>
                    </div>

                </div>
            </section>

            {/* Stats */}
            <section className="bg-black text-white py-16 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-orange-400">500+</h3>
                        <p className="text-gray-400 mt-1">Dishes Available</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-orange-400">10k+</h3>
                        <p className="text-gray-400 mt-1">Happy Customers</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-orange-400">30min</h3>
                        <p className="text-gray-400 mt-1">Delivery Within Branch</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-orange-400">5★</h3>
                        <p className="text-gray-400 mt-1">Average Rating</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                    <div className="flex flex-col items-center">
                        <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-2xl">1</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Browse Menu</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Explore our wide variety of local and international dishes. Filter by category or search for your favourite meal.</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-2xl">2</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Add to Cart</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Select your meals, adjust quantities and add them to your cart. Review your order before checking out.</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <span className="text-white font-bold text-2xl">3</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Get Delivered</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Place your order and sit back. We deliver fresh hot meals straight to your door within 30 minutes in Lagos.</p>
                    </div>

                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-orange-50 rounded-2xl p-6">
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">"Best jollof rice delivery in Lagos. Always hot, always fresh. Eateny never disappoints!"</p>
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">T</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Tunde Adeyemi</h4>
                                    <p className="text-gray-400 text-xs">Lagos</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-2xl p-6">
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">"I ordered pounded yam and egusi at 8pm and it arrived in 25 minutes. Absolutely incredible service."</p>
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">A</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Amaka Okonkwo</h4>
                                    <p className="text-gray-400 text-xs">Abuja</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-2xl p-6">
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">"The variety is unmatched. From suya to pizza, everything tastes like it was made just for me."</p>
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">C</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Chidi Eze</h4>
                                    <p className="text-gray-400 text-xs">Port Harcourt</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* Branches */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Branches</h2>
                <p className="text-gray-500 text-center mb-10">Find an Eateny near you across Nigeria</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-orange-500 text-white rounded-2xl p-6 shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold">Aba</h3>
                            <span className="bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-full">HQ</span>
                        </div>
                        <p className="text-orange-100 text-sm">12 Ikot Ekpene Road, Aba, Abia State</p>
                        <p className="text-orange-100 text-sm mt-1">+234 801 234 5678</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Lagos</h3>
                        <p className="text-gray-500 text-sm">14 Victoria Island, Lagos State</p>
                        <p className="text-gray-500 text-sm mt-1">+234 802 234 5678</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Abuja</h3>
                        <p className="text-gray-500 text-sm">5 Wuse Zone 4, Abuja FCT</p>
                        <p className="text-gray-500 text-sm mt-1">+234 803 234 5678</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Port Harcourt</h3>
                        <p className="text-gray-500 text-sm">8 Trans Amadi Road, Port Harcourt, Rivers State</p>
                        <p className="text-gray-500 text-sm mt-1">+234 804 234 5678</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Uyo</h3>
                        <p className="text-gray-500 text-sm">3 Oron Road, Uyo, Akwa Ibom State</p>
                        <p className="text-gray-500 text-sm mt-1">+234 805 234 5678</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Umuahia</h3>
                        <p className="text-gray-500 text-sm">7 Library Avenue, Umuahia, Abia State</p>
                        <p className="text-gray-500 text-sm mt-1">+234 806 234 5678</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Calabar</h3>
                        <p className="text-gray-500 text-sm">11 Marian Road, Calabar, Cross River State</p>
                        <p className="text-gray-500 text-sm mt-1">+234 807 234 5678</p>
                    </div>

                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-orange-500 py-16 px-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Ready to Eat?</h2>
                <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">Order your favourite meal now and get it delivered fresh to your door.</p>
                <a href="/menu" className="bg-white text-orange-500 font-bold px-8 py-3 rounded-xl hover:bg-orange-100 transition cursor-pointer">
                    Order Now
                </a>
            </section>


        </div>
    )
}