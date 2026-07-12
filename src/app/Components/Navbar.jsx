"use client"
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"
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

import { User, LogOut, ClipboardList } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession();

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
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex cursor-pointer">
                <Avatar className="h-10 w-10 border border-orange-500 cursor-pointer  transition">
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback className="bg-orange-500 text-white font-bold">
                    {session.user?.name?.charAt(0).toUpperCase()}
                    {session.user?.name?.charAt(1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64 mr-4">

              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {session.user?.name}
                  </span>

                  <span className="text-xs text-gray-500">
                    {session.user?.email}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

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
          {session ? (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setIsOpen(false);
              }}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer w-full text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer w-full"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}