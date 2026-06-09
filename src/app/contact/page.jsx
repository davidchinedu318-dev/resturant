export default function ContactPage() {
    return (
        <div className="min-h-screen bg-orange-50">

            {/* Hero Banner */}
            <div className="bg-black text-white text-center py-20 px-6">
                <h1 className="text-5xl font-bold mb-4">Contact <span className="text-orange-400">Us</span></h1>
                <p className="text-gray-300 text-lg max-w-xl mx-auto">Have a question, complaint or suggestion? We are always here to help.</p>
            </div>

            <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Form */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1 block">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-1 block">Message</label>
                            <textarea
                                rows={5}
                                placeholder="Write your message here..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-white resize-none"
                            />
                        </div>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition cursor-pointer">
                            Send Message
                        </button>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Us</h2>
                    <div className="flex flex-col gap-5">
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                            <p className="text-gray-500 text-sm">12 Ikot Ekpene Road, Aba, Abia State</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                            <p className="text-gray-500 text-sm">+234 801 234 5678</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                            <p className="text-gray-500 text-sm">hello@eateny.com</p>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-1">Working Hours</h3>
                            <p className="text-gray-500 text-sm">Monday - Sunday: 8am - 10pm</p>
                        </div>
                    </div>
                </div>

            </section>
            
        </div>
    )
}