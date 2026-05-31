import Hero from './Components/Hero'
import MenuCard from './Components/menucard'

const Page = () => {
  return (
    <div>
      <Hero />
      <section className='bg-gray-100 px-6 py-12'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Our Menu</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>

          <MenuCard name="Jollof Rice" price={2500} image="image/jellof-rice.jpg" />
          <MenuCard name="Fried Chicken" price={3500} image="image/chicken-stir.jpg" />
          <MenuCard name="Pounded Yam & Egusi" price={4000} image="imag/yam.jpg" />
          <MenuCard name="Pepperoni Pizza" price={5500} image="image/pizza.jpg" />
          <MenuCard name="Beef Burger" price={3200} image="image/burger.jpg" />
          <MenuCard name="Pasta Alfredo" price={4500} image="image/pasta alfredo.jpg" />
          <MenuCard name="Egusi Soup" price={3800} image="image/egusi.jpg" />
          <MenuCard name="Suya Platter" price={4200} image="image/suya.jpg" />
          <MenuCard name="Margherita Pizza" price={5000} image="image/margherita.jpg" />
          <MenuCard name="Grilled Salmon" price={7500} image="image/salmon.jpg" />
          <MenuCard name="Vegetable Fried Rice" price={2800} image="image/vegetable-rice.jpg" />
          <MenuCard name="Chocolate Lava Cake" price={3000} image="image/lava-cake.jpg" />
          <MenuCard name="Ofe Akwu & Rice" price={3200} image="image/ofe-akwu.jpg" />
          <MenuCard name="Shawarma Wrap" price={2800} image="image/...jpg" />
          <MenuCard name="Seafood Pasta" price={6500} image="image/seafood-pasta.jpg" />
          <MenuCard name="Chicken Stir Fry" price={4100} image="image/chicken-stir.jpg" />
          <MenuCard name="Moi Moi & Ogi" price={1800} image="image/moi-moi.jpg" />
        </div>
      </section>

    </div>
  )
}

export default Page