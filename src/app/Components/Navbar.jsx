
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-orange-400">
        Eateny
      </h1>

      {/* Nav Links */}
      <div className="flex gap-6 text-sm md:text-base">
        <Link href="/" className="hover:text-orange-400 transition">Home</Link>
        <Link href="/menu" className="hover:text-orange-400 transitio">Menu</Link>
        <Link href="/about" className="hover:text-orange-400 transition">About</Link>
        <Link href="/contact" className="hover:text-orange-400 transition">Contact</Link>
      </div>

      {/* Button */}
      <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer
      ">
        Book Table
      </button>

    </nav>
  );
}