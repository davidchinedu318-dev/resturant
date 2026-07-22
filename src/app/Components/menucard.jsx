"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

export default function MenuCard({
  id,
  name,
  price,
  image,
  description,
  status,
  category,
  favorites = [],
  setFavorites = () => {},
  removeFavoriteCard = () => {},
}) {
  const { data: session } = useSession();
  const { addToCart } = useCart();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const isFavorite = favorites.some((fav) =>
    typeof fav === "object" ? fav.id === id : fav === id
  );

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
    });

    setToastMessage(`${name} added to cart`);
    setShowToast(true);
  };

  const handleFavorite = async () => {
    if (!session) {
      setToastMessage("Please login first");
      setShowToast(true);
      return;
    }

    // REMOVE FAVORITE
    if (isFavorite) {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavorites((prev) =>
          prev.filter((fav) =>
            typeof fav === "object" ? fav.id !== id : fav !== id
          )
        );

        removeFavoriteCard(id);

        setToastMessage(`${name} removed from favorites`);
        setShowToast(true);
      }

      return;
    }

    // ADD FAVORITE
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodId: id,
      }),
    });

    if (response.ok) {
      setFavorites((prev) => [
        ...prev,
        {
          id,
          name,
          price,
          image,
          description,
          status,
          category,
        },
      ]);

      setToastMessage(`${name} added to favorites`);
      setShowToast(true);
    }
  };

  return (
    <>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">

        <div className="relative">
          <img
            src={image || "/images/placeholder.jpg"}
            alt={name}
            className="w-full h-56 object-cover"
          />

          {status && (
            <span
              className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                status === "Available"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {status}
            </span>
          )}
        </div>

        <div className="p-5">

          <h2 className="text-lg font-bold text-gray-800">
            {name}
          </h2>

          {description && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {description}
            </p>
          )}

          <p className="text-2xl font-bold text-orange-500 mt-4">
            ₦{Number(price).toLocaleString()}
          </p>

          <div className="flex items-center justify-between mt-6">

            <button
              onClick={handleAddToCart}
              disabled={status === "Unavailable"}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                status === "Unavailable"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 hover:scale-110 active:scale-95 text-white cursor-pointer"
              }`}
            >
              <Plus size={24} strokeWidth={3} />
            </button>

            <button
              onClick={handleFavorite}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              <Heart
                size={23}
                className={`transition-all duration-300 ${
                  isFavorite
                    ? "fill-orange-500 text-orange-500 scale-110"
                    : "text-gray-500"
                }`}
              />
            </button>

          </div>

        </div>
      </div>
    </>
  );
}