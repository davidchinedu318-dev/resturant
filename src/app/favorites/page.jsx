"use client";

import { useEffect, useState } from "react";
import MenuCard from "../Components/menucard";

export default function FavoritesPage() {
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/favorites").then((res) => res.json()),
      fetch("https://resturant-dzac.onrender.com/api/foods").then((res) =>
        res.json()
      ),
    ]).then(([favoriteFoods, allFoods]) => {
      setFavoriteFoods(favoriteFoods);
      setFavoriteIds(favoriteFoods.map((food) => food.id));
      setFoods(allFoods);
      setLoading(false);
    });
  }, []);

  const recommendedFoods = foods
    .filter((food) => !favoriteIds.includes(food.id))
    .slice(0, 5);

  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Loading...
      </p>
    );
  }

  return (
    <div
      className="min-h-screen px-4 md:px-8 lg:px-12 py-12"
      style={{ backgroundColor: "#FDF6EC" }}
    >
      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Favorites
      </h1>

      {favoriteFoods.length === 0 ? (
        <p className="text-gray-500 text-lg">
          You haven't added any favorites yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteFoods.map((food) => (
            <MenuCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              image={food.image}
              description={food.description}
              status={food.status}
              category={food.category}
              favorites={favoriteIds}
              setFavorites={setFavoriteIds}
              removeFavoriteCard={(id) => {
                setFavoriteFoods((prev) =>
                  prev.filter((food) => food.id !== id)
                );

                setFavoriteIds((prev) =>
                  prev.filter((favId) => favId !== id)
                );
              }}
            />
          ))}
        </div>
      )}

      <h2 className="text-3xl font-bold mt-20 mb-8">
        🍽️ You May Also Like
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {recommendedFoods.map((food) => (
          <MenuCard
            key={food.id}
            id={food.id}
            name={food.name}
            price={food.price}
            image={food.image}
            description={food.description}
            status={food.status}
            category={food.category}
            favorites={favoriteIds}
            setFavorites={(updater) => {
              setFavoriteIds(updater);

              if (typeof updater === "function") {
                const newIds = updater(favoriteIds);

                const addedFood = foods.find(
                  (f) =>
                    newIds.includes(f.id) &&
                    !favoriteIds.includes(f.id)
                );

                if (addedFood) {
                  setFavoriteFoods((prev) => [...prev, addedFood]);
                }
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}