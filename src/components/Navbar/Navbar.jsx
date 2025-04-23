import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaRegHeart, FaCaretDown, FaRegUser } from "react-icons/fa6";
import { FiMenu, FiX, FiSearch, FiHeart, FiUser, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import CartDrawer from "../Cart/CartDrawer";
import DarkMode from "./DarkMode";

const Categories = [
  {
    id: 1,
    name: "Electronics",
    link: "/category/electronics",
    submenu: [
      { name: "Mobiles", link: "/category/electronics/mobiles" },
      { name: "Laptops", link: "/category/electronics/laptops" },
      { name: "Audio", link: "/category/electronics/audio" },
      { name: "Cameras", link: "/category/electronics/cameras" },
    ],
  },
  {
    id: 2,
    name: "Fashion",
    link: "/category/fashion",
    submenu: [
      { name: "Men's Fashion", link: "/category/fashion/mens" },
      { name: "Women's Fashion", link: "/category/fashion/womens" },
      { name: "Kids' Fashion", link: "/category/fashion/kids" },
      { name: "Accessories", link: "/category/fashion/accessories" },
    ],
  },
  {
    id: 3,
    name: "Home & Living",
    link: "/category/home-living",
    submenu: [
      { name: "Furniture", link: "/category/home-living/furniture" },
      { name: "Decor", link: "/category/home-living/decor" },
      { name: "Kitchen", link: "/category/home-living/kitchen" },
      { name: "Bath", link: "/category/home-living/bath" },
    ],
  },
  {
    id: 4,
    name: "Beauty",
    link: "/category/beauty",
    submenu: [
      { name: "Makeup", link: "/category/beauty/makeup" },
      { name: "Skincare", link: "/category/beauty/skincare" },
      { name: "Haircare", link: "/category/beauty/haircare" },
      { name: "Fragrances", link: "/category/beauty/fragrances" },
    ],
  },
];

const TopLinks = [
  {
    id: 1,
    name: "Today's Deals",
    link: "/deals",
  },
  {
    id: 2,
    name: "New Releases",
    link: "/new-releases",
  },
  {
    id: 3,
    name: "Best Sellers",
    link: "/best-sellers",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleCart, getCartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="sticky top-0 shadow-lg bg-white dark:bg-slate-800 dark:text-white transition-all duration-200 relative z-40">
      {/* Top Bar */}
      <div className="bg-primary/5 dark:bg-slate-900 py-1.5 border-b border-gray-200 dark:border-gray-800">
        <div className="container flex justify-between items-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">Free shipping on orders over $50</p>
          <div className="flex items-center gap-4">
            {TopLinks.map((link) => (
              <a key={link.id} href={link.link} className="hover:text-primary transition-colors">{link.name}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white dark:bg-slate-800 py-4">
        <div className="container flex justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-2xl hover:text-primary transition-colors"
            >
              <FiMenu />
            </button>
            <a href="/" className="font-bold text-xl items-center flex gap-2 hover:text-primary transition-colors">
              <FiShoppingCart className="text-3xl" />
              ShopMe
            </a>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands and categories"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full transition-all duration-300 rounded-full border border-gray-300 py-2.5 px-4 pl-12
                text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:border-gray-700 dark:bg-slate-800/50
                placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="absolute left-0 top-0 h-full px-4 flex items-center text-gray-400 hover:text-primary transition-colors"
              >
                <IoMdSearch className="text-xl" />
              </button>
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <a href="/wishlist" className="text-2xl hover:text-primary transition-colors">
              <FaRegHeart />
            </a>
            <button className="text-2xl hover:text-primary transition-colors">
              <FaRegUser />
            </button>
            <button
              onClick={toggleCart}
              className="relative hover:text-primary transition-colors text-2xl"
            >
              <FaCartShopping />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
            <DarkMode />
          </div>
        </div>
      </div>
      {/* Categories Navigation */}
      <nav className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-800">
        <div className="container">
          <ul className="hidden lg:flex items-center gap-8 py-3">
            {Categories.map((category) => (
              <li key={category.id} className="group relative">
                <a
                  href={category.link}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors py-1"
                >
                  {category.name}
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </a>
                <div className="absolute z-50 hidden group-hover:block w-[280px] rounded-lg bg-white dark:bg-slate-700 p-4 text-black dark:text-white shadow-xl ring-1 ring-black/5 dark:ring-white/5 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 mt-0.5">
                  <ul className="grid gap-2">
                    {category.submenu.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.link}
                          className="block rounded-md p-2 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-[280px] h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="font-semibold">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl hover:text-primary transition-colors"
              >
                ×
              </button>
            </div>
            <nav className="p-4">
              <ul className="grid gap-2">
                {Categories.map((category) => (
                  <li key={category.id} className="grid gap-1">
                    <a
                      href={category.link}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {category.name}
                    </a>
                    <ul className="grid gap-1 ml-4 text-sm text-gray-600 dark:text-gray-400">
                      {category.submenu.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.link}
                            className="hover:text-primary transition-colors block py-1"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
      <CartDrawer />
    </div>
  );
};

export default Navbar;
