"use client"
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 bg-black text-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-400">
          Eateny
        </h1>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-sm md:text-base">
          <Link href="/" className="hover:text-orange-400 transition">Home</Link>
          <Link href="/menu" className="hover:text-orange-400 transitio">Menu</Link>
          <Link href="/about" className="hover:text-orange-400 transition">About</Link>
          <Link href="/contact" className="hover:text-orange-400 transition">Contact</Link>
        </div>

        {/* Button */}
        <Link href="/login" className="hidden md:block bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer
      ">
          Book Table
        </Link>
        {/* mobile harmburger */}
        <button className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}

        </button>
      </div>


      {/* mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
          <Link href="/" className="hover:text-orange-400 transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/menu" className="hover:text-orange-400 transition" onClick={() => setIsOpen(false)}>Menu</Link>
          <Link href="/about" className="hover:text-orange-400 transition" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className="hover:text-orange-400 transition" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/login"
            className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer w-full">
            Book Table
          </Link>
        </div>
      )}
    </nav>
  );
}