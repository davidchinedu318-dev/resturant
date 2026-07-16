"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  ClipboardList,
  Heart,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-black text-white px-6 py-4">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-400">
          Eateny
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm md:text-base">
          <Link href="/" className="hover:text-orange-400 transition">
            Home
          </Link>

          <Link href="/menu" className="hover:text-orange-400 transition">
            Menu
          </Link>

          <Link href="/about" className="hover:text-orange-400 transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-orange-400 transition">
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Avatar (Desktop + Mobile) */}
          {session ? (
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer">
                  <Avatar className="h-10 w-10 border border-orange-500">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback className="bg-orange-500 text-white font-bold">
                      {session.user?.name?.charAt(0).toUpperCase()}
                      {session.user?.name?.charAt(1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64 mr-2">

                <DropdownMenuLabel asChild>
                  <Link
                    href="/me"
                    className="block px-4 py-3 hover:bg-gray-100 rounded-md transition"
                  >
                    <p className="font-semibold">
                      {session.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {session.user?.email}
                    </p>
                  </Link>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/me">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/favorites">
                    <Heart className="mr-2 h-4 w-4 text-orange-500 fill-orange-500" />
                    Favorites
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/orders">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-500 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="hidden md:block bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-5 border-t border-gray-700 pt-5 flex flex-col gap-4">

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-orange-400 transition"
          >
            Home
          </Link>

          <Link
            href="/menu"
            onClick={() => setIsOpen(false)}
            className="hover:text-orange-400 transition"
          >
            Menu
          </Link>

          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-orange-400 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-orange-400 transition"
          >
            Contact
          </Link>

          {!session && (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="bg-orange-500 px-4 py-2 rounded-lg text-center hover:bg-orange-600 transition"
            >
              Login
            </Link>
          )}

        </div>
      )}
    </nav>
  );
}