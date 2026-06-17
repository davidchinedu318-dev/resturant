"use client"
import { useCart } from "../context/CartContext"
import { Trash2, X } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useState } from "react"
import Toast from "./Toast"


export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, totalItems } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  {/* for checking if user is logged in before allowing them to checkout */ }
  const router = useRouter()

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const handleCheckout = () => {
    const isLoggedIn = false

    if (!isLoggedIn) {
      setToastMessage("Please login to continue")
      setShowToast(true)

      setTimeout(() => {
        onClose()
        router.push("/login")
      }, 2000)

      return
    }

    onClose()
    router.push("/checkout")
  }

  return (
    <>
      {/* Dark overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Your Cart ({totalItems})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 cursor-pointer text-2xl font-bold">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[70vh]">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                  <p className="text-orange-500 text-sm">₦{item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-bold cursor-pointer flex items-center justify-center">
                      -
                    </button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm font-bold cursor-pointer flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 cursor-pointer text-sm font-bold">
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer total and checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-orange-500">₦{total.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg cursor-pointer transition">
              Proceed to Checkout
            </button>
          </div>
        )}


      </div>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}