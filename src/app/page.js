"use client"
import { useState, useEffect } from 'react'
import Hero from './Components/Hero'
import MenuCard from './Components/menucard'
import WhyEateny from './Components/WhyEateny'
import AboutPreview from './Components/AboutPreview'

const hardcodedFoods = [
  { id: 1, name: "Jollof Rice", price: 2500, image: "/images/jellof-rice.jpg" },
  { id: 2, name: "Fried Chicken", price: 3500, image: "/images/fried-chicken.jpg" },
  { id: 3, name: "Pounded Yam & Egusi", price: 4000, image: "/images/yam.jpg" },
  { id: 4, name: "Pepperoni Pizza", price: 5500, image: "/images/pizza.jpg" },
  { id: 5, name: "Beef Burger", price: 3200, image: "/images/burger.jpg" },
  { id: 6, name: "Pasta Alfredo", price: 4500, image: "/images/pasta-alfredo.jpg" },
]

const Page = () => {
  const [dbFoods, setDbFoods] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/foods')
      .then(res => res.json())
      .then(data => setDbFoods(data))
      .catch(err => console.error(err))
  }, [])

  // cross check each hardcoded food against database
  const foods = hardcodedFoods.map(food => {
    const dbFood = dbFoods.find(f => f.id === food.id)
    if (!dbFood) return { ...food, status: "Unavailable" }
    return {
      ...food,
      status: dbFood.status,
      price: dbFood.price,
      description: dbFood.description,
      image: dbFood.image
    }
  })
  return (
    <div>
      <Hero />
      <section className='bg-gray-100 px-4 md:px-8 lg:px-12 py-12'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Our Menu</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {foods.slice(0, 6).map(food => (
            <MenuCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              image={food.image}
              description={food.description}
              status={food.status}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/menu" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition cursor-pointer">
            View Full Menu
          </a>
        </div>
      </section>
      <WhyEateny />
      <AboutPreview />
    </div>
  )
}

export default Page