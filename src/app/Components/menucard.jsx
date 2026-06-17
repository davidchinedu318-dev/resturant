"use client"
import {useState} from "react"
import { useCart } from "../context/CartContext"
import Toast from "./Toast"


export default function MenuCard({ id, name, price, image }) {
  const { addToCart } = useCart()
  const [showToast, setShowToast ] = useState(false)

  const handleAddToCart = () => {
    addToCart({id, name, price, image})
    setShowToast(true)
  }

  return (
    <>
    <Toast message={`${name} added to cart`} show={showToast} onClose={() => setShowToast(false)} />
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-orange-500 font-semibold mt-1 text-base">₦{price.toLocaleString()}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-orange-500 font-semibold text-white py-2 cursor-pointer hover:bg-orange-600 transition rounded-xl">
          Add to Cart
        </button>
      </div>
    </div>
    </>
  )
}