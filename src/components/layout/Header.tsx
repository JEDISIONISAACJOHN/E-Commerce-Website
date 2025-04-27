import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../data/categories';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-primary-500'}`}>
      {/* Top navigation bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-primary-500' : 'text-white'}`}>ShopHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-md border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-primary-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Right navigation items */}
          <div className="flex items-center">
            {/* Account */}
            <div className="relative group">
              <Link 
                to={isAuthenticated ? "/account" : "/login"} 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isScrolled ? 'text-gray-700 hover:text-primary-500' : 'text-white hover:bg-primary-600'}`}
              >
                <User size={20} className="mr-1" />
                <span className="hidden lg:inline">
                  {isAuthenticated ? user?.name.split(' ')[0] : 'Account'}
                </span>
              </Link>
              {isAuthenticated && (
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Account</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Orders</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link 
              to="/cart" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ml-2 ${isScrolled ? 'text-gray-700 hover:text-primary-500' : 'text-white hover:bg-primary-600'}`}
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline ml-1">Cart</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className={`ml-2 inline-flex items-center justify-center p-2 rounded-md md:hidden ${isScrolled ? 'text-gray-700 hover:text-primary-500' : 'text-white hover:bg-primary-600'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className={`bg-gray-100 border-b border-gray-200 ${isScrolled ? '' : 'bg-primary-600'}`}>
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-1 overflow-x-auto scrollbar-hide py-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.id}`}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium ${
                    isScrolled 
                      ? 'text-gray-700 hover:bg-gray-200'
                      : 'text-white hover:bg-primary-700'
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-4">
            {/* Search - Mobile */}
            <form onSubmit={handleSearch} className="mt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-md border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-primary-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Categories */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Categories
              </p>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;