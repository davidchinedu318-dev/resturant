"use client"
import { useState, useEffect } from 'react'
import MenuCard from '../Components/menucard'
import SearchBar from '../Components/SearchBar'

const categories = ["All", "Nigerian", "Continental", "Fast Food", "Protein", "Dessert"]

export default function MenuPage() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    fetch('http://localhost:5000/api/foods')
      .then(res => res.json())
      .then(data => {
        setFoods(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching foods:', err)
        setLoading(false)
      })
  }, [])

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "All" || food.category === activeCategory
    return matchesSearch && matchesCategory
  })

  if (loading) return <p className="text-center text-gray-400 py-20">Loading menu...</p>

  return (
    <div style={{ backgroundColor: "#FDF6EC" }} className="min-h-screen px-4 md:px-8 lg:px-12 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Full Menu</h1>
        <p className="text-gray-500">Explore all our dishes — local, continental and more</p>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFoods.map(food => (
          <MenuCard key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} description={food.description} status={food.status} />
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <p className="text-center text-gray-400 mt-20 text-lg">No dishes found.</p>
      )}
    </div>
  )
}