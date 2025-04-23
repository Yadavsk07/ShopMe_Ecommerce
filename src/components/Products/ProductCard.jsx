import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const {
    id,
    title,
    description,
    price,
    originalPrice,
    rating,
    reviewCount,
    image,
    badges,
  } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div
      className="group relative bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-4 right-4 z-10 bg-white dark:bg-slate-700 rounded-full p-2 shadow-md hover:scale-110 transition-transform duration-200"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
        )}
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  backgroundColor: badge.bgColor || "#4263eb",
                  color: badge.textColor || "white",
                }}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center text-yellow-400">
            <FaStar />
          </div>
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => {
          addToCart(product);
          // Optional: Show a toast notification
        }}
        className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white py-2 px-4 rounded-full font-medium transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
      >
        <FiShoppingCart className="text-lg" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
