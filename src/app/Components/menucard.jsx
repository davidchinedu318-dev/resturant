export default function MenuCard({name, price, image , alt}) {
  return (
    <div className="bg-white rounded-xl p-4">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg"
      />
      
      <div className="mt-3">
        <h2 className="text-ig font-bold text-grey-800">{name}</h2>
      <p className="text-orange-500 font-semibold mt-1">₦{price}</p>
      <button className="mt-3 w-full bg-orange-500 font-semibold text-white py-2 cursor-pointer hover:bg-orange-600 transition rounded-lg">Add to Cart</button>
      </div>
    </div>
  )
}