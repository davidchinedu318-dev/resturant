import { Truck, Leaf, UtensilsCrossed, Smartphone } from "lucide-react"

export default function WhyEateny() {
  const features = [
    { icon: <Truck size={32} />,  title: "Fast Delivery", description: "Get your food delivered to your door in 30 minutes or less." },
    { icon: <Leaf size={32} />,  title: "Fresh Ingredients", description: "Every meal is prepared with the freshest local and imported ingredients." },
    { icon: <UtensilsCrossed size={32} />,  title: "Wide Variety", description: "From Nigerian classics to international cuisine, we have it all." },
    { icon: <Smartphone size={32} />,  title: "Easy Ordering", description: "Order in seconds from your phone or computer. No stress." },
  ]

  return (
    <section className="bg-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Eateny?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
          <div className="text-orange-500 flex justify-center mb-4">
            {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}