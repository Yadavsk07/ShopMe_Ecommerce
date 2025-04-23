import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import ProductCard from "./ProductCard";

// Import sample images
import Img1 from "../../assets/women/women.png";
import Img2 from "../../assets/women/women2.jpg";
import Img3 from "../../assets/women/women3.jpg";
import Img4 from "../../assets/women/women4.jpg";

const ProductsData = [
  {
    id: 1,
    image: Img1,
    title: "Women's Summer Dress",
    description: "Elegant floral print dress perfect for summer occasions",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 128,
    category: "women",
    badges: [{ text: "New Arrival", bgColor: "#4263eb" }],
  },
  {
    id: 2,
    image: Img2,
    title: "Casual Denim Jacket",
    description: "Classic denim jacket with modern styling",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.5,
    reviewCount: 96,
    category: "women",
    badges: [{ text: "Trending", bgColor: "#ff6b6b" }],
  },
  {
    id: 3,
    image: Img3,
    title: "Designer Sunglasses",
    description: "UV protected stylish sunglasses",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviewCount: 75,
    category: "accessories",
    badges: [{ text: "Premium", bgColor: "#fab005" }],
  },
  {
    id: 4,
    image: Img4,
    title: "Graphic Print T-Shirt",
    description: "100% cotton comfortable t-shirt with unique design",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.4,
    reviewCount: 214,
    category: "women",
  },
  {
    id: 5,
    image: Img2,
    title: "Summer Collection Top",
    description: "Lightweight and breathable summer top",
    price: 39.99,
    rating: 4.6,
    reviewCount: 167,
    category: "women",
    badges: [{ text: "Best Seller", bgColor: "#40c057" }],
  },
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "women", name: "Women's Fashion" },
  { id: "accessories", name: "Accessories" },
];

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "newest", name: "Newest Arrivals" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = ProductsData.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory
  ).sort((a, b) => {
    switch (selectedSort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm font-medium text-primary dark:text-secondary">
            Discover Our Collection
          </p>
          <h1
            data-aos="fade-up"
            className="text-3xl sm:text-4xl font-bold mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Featured Products
          </h1>
          <p data-aos="fade-up" className="text-sm text-gray-500 dark:text-gray-400">
            Explore our curated collection of trending and most loved products
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort and Filter */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full sm:w-48 appearance-none bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden bg-white dark:bg-slate-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
            >
              <FiFilter className="text-xl" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white py-3 px-8 rounded-full font-medium transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/40">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
