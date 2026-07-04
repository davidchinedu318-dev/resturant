"use client"
import { useState, useEffect } from "react"
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Users, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Admin Header */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-orange-400">Eateny Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Welcome, Admin</span>
          <button onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg cursor-pointer transition flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
            { id: "foods", label: "Manage Foods", icon: <UtensilsCrossed size={16} /> },
            { id: "orders", label: "Manage Orders", icon: <ShoppingBag size={16} /> },
            { id: "users", label: "Manage Users", icon: <Users size={16} /> },
            { id: "settings", label: "Settings", icon: <Settings size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition cursor-pointer whitespace-nowrap ${activeTab === tab.id
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-500 hover:text-gray-800"
                }`}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "foods" && <FoodsTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>

    </div>
  )
}

// Overview Tab 
function OverviewTab() {
  //  fetch real stats from backend
  const stats = [
    { label: "Total Orders", value: "128", color: "bg-orange-500" },
    { label: "Total Foods", value: "17", color: "bg-black" },
    { label: "Total Users", value: "340", color: "bg-green-500" },
    { label: "Revenue", value: "₦482,000", color: "bg-purple-500" },
  ]

  // TODO: fetch recent orders from backend
  const recentOrders = [
    { id: "#001", customer: "Tunde Adeyemi", items: "Jollof Rice x2", total: "₦5,000", status: "Delivered" },
    { id: "#002", customer: "Amaka Okonkwo", items: "Pounded Yam x1", total: "₦4,000", status: "Pending" },
    { id: "#003", customer: "Chidi Eze", items: "Beef Burger x3", total: "₦9,600", status: "Processing" },
    { id: "#004", customer: "Ngozi Dike", items: "Suya Platter x1", total: "₦4,200", status: "Delivered" },
    { id: "#005", customer: "Emeka Nwosu", items: "Pasta Alfredo x2", total: "₦9,000", status: "Pending" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className={`${stat.color} w-10 h-10 rounded-xl mb-4`} />
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="text-left py-3 font-semibold">Order ID</th>
                <th className="text-left py-3 font-semibold">Customer</th>
                <th className="text-left py-3 font-semibold">Items</th>
                <th className="text-left py-3 font-semibold">Total</th>
                <th className="text-left py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 font-bold text-orange-500">{order.id}</td>
                  <td className="py-3 text-gray-700">{order.customer}</td>
                  <td className="py-3 text-gray-500">{order.items}</td>
                  <td className="py-3 font-bold text-gray-800">{order.total}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "Delivered" ? "bg-green-100 text-green-600" :
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-600" :
                        "bg-blue-100 text-blue-600"
                      }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

//  Foods Tab
function FoodsTab() {
  const [showForm, setShowForm] = useState(false)
  const [editFood, setEditFood] = useState(null)
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    name: "", price: "", category: "Nigerian", status: "Available", description: "", image: ""
  })

  // fetch all foods from backend
  useEffect(() => {
    fetchFoods()
  }, [])

  const fetchFoods = async () => {
    try {
      const res = await fetch('https://resturant-dzac.onrender.com/api/foods')
      const data = await res.json()
      setFoods(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching foods:', error)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = async () => {
    if (!form.name || !form.price) return
    try {
      const res = await fetch('https://resturant-dzac.onrender.com/api/foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const newFood = await res.json()
      setFoods([newFood, ...foods])
      setForm({ name: "", price: "", category: "Nigerian", status: "Available", description: "", image: "" })
      setShowForm(false)
    } catch (error) {
      console.error('Error adding food:', error)
    }
  }

  const handleEdit = (food) => {
    setEditFood(food)
    setForm({ name: food.name, price: food.price, category: food.category, status: food.status, description: food.description || "", image: food.image || "" })
    setShowForm(true)
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://resturant-dzac.onrender.com/api/foods/${editFood.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const updatedFood = await res.json()
      setFoods(foods.map(f => f.id === editFood.id ? updatedFood : f))
      setEditFood(null)
      setForm({ name: "", price: "", category: "Nigerian", status: "Available", description: "", image: "" })
      setShowForm(false)
    } catch (error) {
      console.error('Error updating food:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`https://resturant-dzac.onrender.com/api/foods/${id}`, { method: 'DELETE' })
      setFoods(foods.filter(f => f.id !== id))
    } catch (error) {
      console.error('Error deleting food:', error)
    }
  }

  if (loading) return <p className="text-gray-400 text-center py-10">Loading foods...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Foods</h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditFood(null); setForm({ name: "", price: "", category: "Nigerian", status: "Available", description: "", image: "" }) }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl cursor-pointer transition text-sm">
          {showForm ? "Cancel" : "+ Add New Food"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {editFood ? "Edit Food" : "Add New Food"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Food Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Jollof Rice"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Price (₦)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 2500"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm">
                <option>Nigerian</option>
                <option>Continental</option>
                <option>Fast Food</option>
                <option>Protein</option>
                <option>Dessert</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm">
                <option>Available</option>
                <option>Unavailable</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Food Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0]
                  if (!file) return
                  const formData = new FormData()
                  formData.append('image', file)
                  const res = await fetch('https://resturant-dzac.onrender.com/api/upload', {
                    method: 'POST',
                    body: formData
                  })
                  const data = await res.json()
                  setForm({ ...form, image: data.imageUrl })
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
              {form.image && (
                <img src={form.image} alt="preview" className="mt-2 h-20 w-20 object-cover rounded-lg" />
              )}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Description</label>
              <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Short description"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm" />
            </div>
          </div>
          <button onClick={editFood ? handleUpdate : handleAdd}
            className="mt-4 bg-black hover:bg-gray-900 text-white font-bold px-6 py-3 rounded-xl cursor-pointer transition text-sm">
            {editFood ? "Update Food" : "Save Food"}
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="text-left py-3 font-semibold">ID</th>
                <th className="text-left py-3 font-semibold">Food Name</th>
                <th className="text-left py-3 font-semibold">Price</th>
                <th className="text-left py-3 font-semibold">Category</th>
                <th className="text-left py-3 font-semibold">Status</th>
                <th className="text-left py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 text-gray-400">#{food.id}</td>
                  <td className="py-3 font-bold text-gray-800">{food.name}</td>
                  <td className="py-3 text-orange-500 font-semibold">₦{Number(food.price).toLocaleString()}</td>
                  <td className="py-3 text-gray-500">{food.category}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${food.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                      }`}>
                      {food.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(food)}
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 text-xs font-bold px-3 py-1 rounded-lg cursor-pointer transition">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(food.id)}
                        className="bg-red-100 text-red-500 hover:bg-red-200 text-xs font-bold px-3 py-1 rounded-lg cursor-pointer transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Orders Tab
function OrdersTab() {
  // TODO: fetch all orders from backend/database
  const orders = [
    { id: "#001", customer: "Tunde Adeyemi", phone: "+234 801 234 5678", items: "Jollof Rice x2", total: "₦5,000", address: "12 Lagos Street", status: "Delivered", date: "20 Jun 2025" },
    { id: "#002", customer: "Amaka Okonkwo", phone: "+234 802 234 5678", items: "Pounded Yam x1", total: "₦4,000", address: "5 Abuja Road", status: "Pending", date: "20 Jun 2025" },
    { id: "#003", customer: "Chidi Eze", phone: "+234 803 234 5678", items: "Beef Burger x3", total: "₦9,600", address: "8 PH Avenue", status: "Processing", date: "19 Jun 2025" },
    { id: "#004", customer: "Ngozi Dike", phone: "+234 804 234 5678", items: "Suya Platter x1", total: "₦4,200", address: "3 Uyo Close", status: "Delivered", date: "19 Jun 2025" },
    { id: "#005", customer: "Emeka Nwosu", phone: "+234 805 234 5678", items: "Pasta Alfredo x2", total: "₦9,000", address: "7 Aba Road", status: "Pending", date: "18 Jun 2025" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h2>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="text-left py-3 font-semibold">Order ID</th>
                <th className="text-left py-3 font-semibold">Customer</th>
                <th className="text-left py-3 font-semibold">Phone</th>
                <th className="text-left py-3 font-semibold">Items</th>
                <th className="text-left py-3 font-semibold">Total</th>
                <th className="text-left py-3 font-semibold">Address</th>
                <th className="text-left py-3 font-semibold">Date</th>
                <th className="text-left py-3 font-semibold">Status</th>
                <th className="text-left py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 font-bold text-orange-500">{order.id}</td>
                  <td className="py-3 text-gray-700">{order.customer}</td>
                  <td className="py-3 text-gray-500">{order.phone}</td>
                  <td className="py-3 text-gray-500">{order.items}</td>
                  <td className="py-3 font-bold text-gray-800">{order.total}</td>
                  <td className="py-3 text-gray-500">{order.address}</td>
                  <td className="py-3 text-gray-400">{order.date}</td>
                  <td className="py-3">
                    {/* TODO: connect to PATCH /api/orders/:id endpoint */}
                    <select className={`text-xs font-bold px-2 py-1 rounded-lg border-none outline-none cursor-pointer ${order.status === "Delivered" ? "bg-green-100 text-green-600" :
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-600" :
                        "bg-blue-100 text-blue-600"
                      }`}>
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3">
                    <button className="bg-red-100 text-red-500 hover:bg-red-200 text-xs font-bold px-3 py-1 rounded-lg cursor-pointer transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Users Tab
function UsersTab() {
  // TODO: fetch all users from backend/database
  const users = [
    { id: 1, name: "Tunde Adeyemi", email: "tunde@gmail.com", phone: "+234 801 234 5678", orders: 5, joined: "Jan 2025" },
    { id: 2, name: "Amaka Okonkwo", email: "amaka@gmail.com", phone: "+234 802 234 5678", orders: 3, joined: "Feb 2025" },
    { id: 3, name: "Chidi Eze", email: "chidi@gmail.com", phone: "+234 803 234 5678", orders: 8, joined: "Mar 2025" },
    { id: 4, name: "Ngozi Dike", email: "ngozi@gmail.com", phone: "+234 804 234 5678", orders: 2, joined: "Apr 2025" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100">
                <th className="text-left py-3 font-semibold">ID</th>
                <th className="text-left py-3 font-semibold">Name</th>
                <th className="text-left py-3 font-semibold">Email</th>
                <th className="text-left py-3 font-semibold">Phone</th>
                <th className="text-left py-3 font-semibold">Orders</th>
                <th className="text-left py-3 font-semibold">Joined</th>
                <th className="text-left py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 text-gray-400">#{user.id}</td>
                  <td className="py-3 font-bold text-gray-800">{user.name}</td>
                  <td className="py-3 text-gray-500">{user.email}</td>
                  <td className="py-3 text-gray-500">{user.phone}</td>
                  <td className="py-3 text-orange-500 font-bold">{user.orders}</td>
                  <td className="py-3 text-gray-400">{user.joined}</td>
                  <td className="py-3">
                    {/* TODO: connect to DELETE /api/users/:id endpoint */}
                    <button className="bg-red-100 text-red-500 hover:bg-red-200 text-xs font-bold px-3 py-1 rounded-lg cursor-pointer transition">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

//  Settings Tab 
function SettingsTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Restaurant Info</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Restaurant Name</label>
              <input
                type="text"
                defaultValue="Eateny"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Contact Email</label>
              <input
                type="email"
                defaultValue="hello@eateny.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
              <input
                type="tel"
                defaultValue="+234 801 234 5678"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
            </div>
            {/* TODO: connect to PUT /api/settings endpoint */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl cursor-pointer transition text-sm">
              Save Changes
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Change Password</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-gray-50 text-sm"
              />
            </div>
            {/* TODO: connect to PUT /api/admin/password endpoint */}
            <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 rounded-xl cursor-pointer transition text-sm">
              Update Password
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}