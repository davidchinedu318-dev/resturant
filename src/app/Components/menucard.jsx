"use client"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import Toast from "./Toast"

export default function MenuCard({ id, name, price, image, description, status }) {
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)

  const handleAddToCart = () => {
    addToCart({ id, name, price, image })
    setShowToast(true)
  }

  return (
    <>
      <Toast message={`${name} added to cart`} show={showToast} onClose={() => setShowToast(false)} />
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
        
        {/* Image */}
        <div className="relative">
          <img
            src={image || '/images/placeholder.jpg'}
            alt={name}
            className="w-full h-56 object-cover"
          />
          {/* Status badge */}
          {status && (
            <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${
              status === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}>
              {status}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          {description && (
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>
          )}
          <p className="text-orange-500 font-semibold mt-2 text-base">₦{Number(price).toLocaleString()}</p>
          <button
            onClick={handleAddToCart}
            disabled={status === "Unavailable"}
            className={`mt-4 w-full font-semibold text-white py-2 cursor-pointer transition rounded-xl ${
              status === "Unavailable"
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}>
            {status === "Unavailable" ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  )
}