"use client"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"
import Cart from "./cart"

export default function FloatingCart() {
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <div className="fixed bottom-6 right-4 md:right z-6">
      <button 
        onClick={() => setIsOpen(true)}
        className="relative right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg cursor-pointer transition z-50 e">
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>
</div>
      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}