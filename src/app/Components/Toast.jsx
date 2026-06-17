"use client"
import { useEffect } from "react"
import { CheckCircle } from "lucide-react"

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <div className={`fixed top-30 right-6 z-[100] bg-black text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
      <CheckCircle size={20} className="text-orange-500" />
      <span className="text-sm font-semibold">{message}</span>
    </div>
  )
}