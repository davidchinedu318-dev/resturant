'use client';

import { useState } from 'react';
import { Search, Clock, Users, ChefHat } from 'lucide-react';

export default function Body() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Recipes' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'beverages', name: 'Beverages' },
  ];

  const recipes = [
    {
      id: 1,
      title: 'Classic Spaghetti Carbonara',
      category: 'dinner',
      time: 30,
      servings: 4,
      image: '🍝',
      difficulty: 'Medium',
    },
    {
      id: 2,
      title: 'Fluffy Pancakes',
      category: 'breakfast',
      time: 20,
      servings: 4,
      image: '🥞',
      difficulty: 'Easy',
    },
    {
      id: 3,
      title: 'Chocolate Lava Cake',
      category: 'desserts',
      time: 25,
      servings: 2,
      image: '🍰',
      difficulty: 'Medium',
    },
    {
      id: 4,
      title: 'Greek Salad',
      category: 'lunch',
      time: 15,
      servings: 3,
      image: '🥗',
      difficulty: 'Easy',
    },
    {
      id: 5,
      title: 'Homemade Pizza',
      category: 'dinner',
      time: 45,
      servings: 4,
      image: '',
      difficulty: 'Hard',
    },
    {
      id: 6,
      title: 'Smoothie Bowl',
      category: 'breakfast',
      time: 10,
      servings: 1,
      image: '🍓',
      difficulty: 'Easy',
    },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-800">CookingHub</h1>
          </div>
          <ul className="hidden md:flex gap-6 text-gray-700">
            <li><a href="#" className="hover:text-orange-600 transition">Home</a></li>
            <li><a href="./Recipes" className="hover:text-orange-600 transition">Recipes</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Categories</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">About</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Delicious Recipes
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Explore thousands of recipes from around the world
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            FILTER BY CATEGORY
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden"
              >
                {/* Recipe Image */}
                <div className="bg-gradient-to-br from-orange-200 to-yellow-200 h-48 flex items-center justify-center text-6xl">
                  {recipe.image}
                </div>

                {/* Recipe Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {recipe.title}
                  </h3>

                  {/* Recipe Details */}
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        recipe.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : recipe.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                    <button className="text-orange-600 hover:text-orange-700 font-semibold">
                      View Recipe →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No recipes found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">&copy; 2024 CookingHub. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-orange-400">Privacy</a>
            <a href="#" className="hover:text-orange-400">Terms</a>
            <a href="#" className="hover:text-orange-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
