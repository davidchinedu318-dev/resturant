"use client"
import { useState } from 'react'
import MenuCard from '../Components/menucard'
import SearchBar from '../Components/SearchBar'

const foods = [
  { id: 1, name: "Jollof Rice", price: 2500, image: "/images/jellof-rice.jpg", category: "Nigerian" },
  { id: 2, name: "Fried Chicken", price: 3500, image: "/images/fried-chicken.jpg", category: "Protein" },
  { id: 3, name: "Pounded Yam & Egusi", price: 4000, image: "/images/yam.jpg", category: "Nigerian" },
  { id: 4, name: "Pepperoni Pizza", price: 5500, image: "/images/pizza.jpg", category: "Continental" },
  { id: 5, name: "Beef Burger", price: 3200, image: "/images/burger.jpg", category: "Fast Food" },
  { id: 6, name: "Pasta Alfredo", price: 4500, image: "/images/pasta-alfredo.jpg", category: "Continental" },
  { id: 7, name: "Egusi Soup", price: 3800, image: "/images/egusi.jpg", category: "Nigerian" },
  { id: 8, name: "Suya Platter", price: 4200, image: "/images/suya.jpg", category: "Protein" },
  { id: 9, name: "Margherita Pizza", price: 5000, image: "/images/margherita.jpg", category: "Continental" },
  { id: 10, name: "Grilled Salmon", price: 7500, image: "/images/salmon.jpg", category: "Protein" },
  { id: 11, name: "Vegetable Fried Rice", price: 2800, image: "/images/vegetable-rice.jpg", category: "Nigerian" },
  { id: 12, name: "Chocolate Lava Cake", price: 3000, image: "/images/lava-cake.jpg", category: "Dessert" },
  { id: 13, name: "Ofe Akwu & Rice", price: 3200, image: "/images/ofe-akwu.jpg", category: "Nigerian" },
  { id: 14, name: "Shawarma Wrap", price: 2800, image: "/images/shawarma.jpg", category: "Fast Food" },
  { id: 15, name: "Seafood Pasta", price: 6500, image: "/images/seafood-pasta.jpg", category: "Continental" },
  { id: 16, name: "Chicken Stir Fry", price: 4100, image: "/images/chicken-stir.jpg", category: "Protein" },
  { id: 17, name: "Moi Moi & Ogi", price: 1800, image: "/images/moi-moi.jpg", category: "Nigerian" },
]

const categories = ["All", "Nigerian", "Continental", "Fast Food", "Protein", "Dessert"]

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || food.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ backgroundColor: "#FDF6EC" }} className="min-h-screen px-4 md:px-8 lg:px-12 py-12">
      
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2"> Full Menu</h1>
        <p className="text-gray-500">Explore all our dishes — local, continental and more</p>
      </div>

      {/* Search */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Category Filter */}
      <div className="flex gap-3 justify-center flex-wrap mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold cursor-pointer transition text-sm ${
              activeCategory === category
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-orange-100 border border-gray-200"
            }`}>
            {category}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFoods.map(food => (
          <MenuCard key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} />
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="text-center text-gray-400 mt-20 text-lg">No dishes found.</p>
      )}
    </div>
  )
}