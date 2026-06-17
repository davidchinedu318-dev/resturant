"use client"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin <span className="text-orange-500">Login</span></h1>
          <p className="text-gray-400 text-sm mt-2">Access the Eateny admin dashboard</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="admin@eateny.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 cursor-pointer">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-3 rounded-xl transition cursor-pointer mt-2">
            Login to Dashboard
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Eateny Admin Panel — Authorized Access Only
        </p>

      </div>
    </div>
  )
}