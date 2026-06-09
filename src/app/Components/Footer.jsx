import Link from "next/link"
import { MapPin, Phone, Mail, } from "lucide-react"
import { FaFacebook, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-black text-white px-4 md:px-8 lg:px-12 py-16">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">


        <div>
          <h2 className="text-2xl font-bold text-orange-400 mb-3">Eateny</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Fresh meals, fast delivery. From local favourites to international cuisine — delivered straight to your door.
          </p>
        </div>

        {/*  Links */}
        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="/" className="text-gray-400 text-sm hover:text-orange-400 transition">Home</Link></li>
            <li><Link href="/menu" className="text-gray-400 text-sm hover:text-orange-400 transition">Menu</Link></li>
            <li><Link href="/about" className="text-gray-400 text-sm hover:text-orange-400 transition">About</Link></li>
            <li><Link href="/contact" className="text-gray-400 text-sm hover:text-orange-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold mb-4">Contact Us</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin size={16} className="text-orange-400 mt-0.5 shrink-0" />
              12 Ikot Ekpene Road, Aba, Abia State
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <Phone size={16} className="text-orange-400 shrink-0" />
              +234 801 234 5678
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <Mail size={16} className="text-orange-400 shrink-0" />
              hello@eateny.com
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-bold mb-4">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">Subscribe for weekly deals and new menu updates.</p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-400 bg-gray-900 text-white text-sm"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition cursor-pointer text-sm">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">© 2026 Eateny. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-400 hover:text-orange-400 transition cursor-pointer">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-400 transition cursor-pointer">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-400 transition cursor-pointer">
            <FaXTwitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-orange-400 transition cursor-pointer">
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>

    </footer>
  )
}