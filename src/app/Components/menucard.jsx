"use client"

import { useState } from "react"
import { Heart, Plus } from "lucide-react"
import { useCart } from "../context/CartContext"
import Toast from "./Toast"

export default function MenuCard({
  id,
  name,
  price,
  image,
  description,
  status,
}) {
  const { addToCart } = useCart()

  const [showToast, setShowToast] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = () => {
    addToCart({ id, name, price, image })
    setShowToast(true)
  }

  return (
    <>
      <Toast
        message={`${name} added to cart`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">

        {/* Image */}
        <div className="relative">
          <img
            src={image || "/images/placeholder.jpg"}
            alt={name}
            className="w-full h-56 object-cover"
          />

          {/* Status Badge */}
          {status && (
            <span
              className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                status === "Available"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {status}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">

          <h2 className="text-lg font-bold text-gray-800">
            {name}
          </h2>

          {description && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {description}
            </p>
          )}

          <p className="text-2xl font-bold text-orange-500 mt-4">
            ₦{Number(price).toLocaleString()}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6">

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              disabled={status === "Unavailable"}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                status === "Unavailable"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 hover:scale-110 active:scale-95 text-white cursor-pointer"
              }`}
            >
              <Plus size={24} strokeWidth={3} />
            </button>

            {/* Favorite */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <Heart
                size={23}
                className={`transition-all duration-300 ${
                  isFavorite
                    ? "fill-orange-500 text-orange-500 scale-110"
                    : "text-gray-500"
                }`}
              />
            </button>

          </div>

        </div>
      </div>
    </>
  )
}