"use client"
import { useState, useEffect } from 'react'
import Hero from './Components/Hero'
import MenuCard from './Components/menucard'
import WhyEateny from './Components/WhyEateny'
import AboutPreview from './Components/AboutPreview'

const Page = () => {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)  

useEffect(() => {
  fetch('https://resturant-dzac.onrender.com/api/foods')
    .then(res => res.json())
    .then(data => setFoods(data.slice(0, 6)))
}, [])

 
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