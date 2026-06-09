"use client"
import { useState } from 'react'
import Hero from './Components/Hero'
import MenuCard from './Components/menucard'
import SearchBar from './Components/SearchBar'
import WhyEateny from './Components/WhyEateny'
import AboutPreview from './Components/AboutPreview'

const foods = [
  { id: 1, name: "Jollof Rice", price: 2500, image: "/images/jellof-rice.jpg" },
  { id: 3, name: "Pounded Yam & Egusi", price: 4000, image: "/images/yam.jpg" },
  { id: 4, name: "Pepperoni Pizza", price: 5500, image: "/images/pizza.jpg" },
  { id: 5, name: "Beef Burger", price: 3200, image: "/images/burger.jpg" },
  { id: 6, name: "Pasta Alfredo", price: 4500, image: "/images/pasta alfredo.jpg" },
  { id: 7, name: "Egusi Soup", price: 3800, image: "/images/egusi.jpg" },
  { id: 8, name: "Suya Platter", price: 4200, image: "/images/suya.jpg" },
  { id: 9, name: "Margherita Pizza", price: 5000, image: "/images/margherita.jpg" },
  { id: 10, name: "Grilled Salmon", price: 7500, image: "/images/salmon.jpg" },
  { id: 11, name: "Vegetable Fried Rice", price: 2800, image: "/images/vegetable-rice.jpg" },
  { id: 12, name: "Chocolate Lava Cake", price: 3000, image: "/images/lava-cake.jpg" },
  { id: 13, name: "Ofe Akwu & Rice", price: 3200, image: "/images/ofe-akwu.jpg" },
  { id: 14, name: "Shawarma Wrap", price: 2800, image: "/images/shawarma.jpg" },
  { id: 15, name: "Seafood Pasta", price: 6500, image: "/images/seafood-pasta.jpg" },
  { id: 16, name: "Chicken Stir Fry", price: 4100, image: "/images/chicken-stir.jpg" },
  { id: 17, name: "Moi Moi & Ogi", price: 1800, image: "/images/moi-moi.jpg" },
]

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <Hero />
      <section className='bg-gray-100 px-4 md:px-8 lg:px-12 py-12'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Featured Menu</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {foods.slice(0, 6).map(food => (
            <MenuCard key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} />
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/menu" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition cursor-pointer">
            View Full Menu
          </a>
        </div>
      </section>
      <WhyEateny />
      <AboutPreview/>
    </div>
  )
}

export default Page