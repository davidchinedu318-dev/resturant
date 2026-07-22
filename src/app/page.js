"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react'
import Hero from './Components/Hero'
import MenuCard from './Components/menucard'
import WhyEateny from './Components/WhyEateny'
import AboutPreview from './Components/AboutPreview'


function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-64 bg-gray-200" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    </div>
  )
}

const Page = () => {

  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);

  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1000))
    const fetchFoods = fetch('https://resturant-dzac.onrender.com/api/foods')
      .then(res => res.json())

    Promise.all([minLoadTime, fetchFoods])
      .then(([_, data]) => {
        setFoods(data.slice(0, 6))
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!session) return;

    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
      })
      .catch((err) => console.error(err));
  }, [session]);

  return (
    <div>
      <Hero />
      <section className='bg-gray-100 px-4 md:px-8 lg:px-12 py-12'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Our Menu</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            foods.map(food => (
              <MenuCard
                key={food.id}
                id={food.id}
                name={food.name}
                price={food.price}
                image={food.image}
                description={food.description}
                status={food.status}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))
          )}
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