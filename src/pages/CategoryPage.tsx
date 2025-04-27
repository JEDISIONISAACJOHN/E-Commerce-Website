import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sliders, ArrowUpDown, Check } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import { getProductsByCategory } from '../data/products';
import { getCategoryById } from '../data/categories';
import { Product } from '../types';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const category = getCategoryById(id || '');
  const allProducts = getProductsByCategory(id || '');
  
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [sortOption, setSortOption] = useState('featured');
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Sorting function
  const handleSort = (option: string) => {
    setSortOption(option);
    let sortedProducts = [...allProducts];
    
    switch (option) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // Default is 'featured', no specific sort
        break;
    }
    
    setProducts(sortedProducts);
  };
  
  // Price filtering
  const handlePriceFilter = (range: string | null) => {
    setPriceFilter(range);
    
    if (!range) {
      setProducts(allProducts);
      return;
    }
    
    let filteredProducts = [...allProducts];
    
    switch (range) {
      case 'under-100':
        filteredProducts = filteredProducts.filter(p => p.price < 100);
        break;
      case '100-200':
        filteredProducts = filteredProducts.filter(p => p.price >= 100 && p.price <= 200);
        break;
      case '200-500':
        filteredProducts = filteredProducts.filter(p => p.price > 200 && p.price <= 500);
        break;
      case '500-plus':
        filteredProducts = filteredProducts.filter(p => p.price > 500);
        break;
    }
    
    setProducts(filteredProducts);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6">
          <ol className="flex items-center space-x-1 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary-500">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-medium">
              {category ? category.name : 'Category Not Found'}
            </li>
          </ol>
        </nav>
        
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category ? category.name : 'Category Not Found'}
          </h1>
          <p className="text-gray-600">
            {products.length} products
          </p>
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-700 hover:text-primary-500 sm:hidden"
          >
            <Sliders size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="appearance-none rounded-md border border-gray-300 py-2 pl-3 pr-10 bg-white text-sm font-medium text-gray-700 hover:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
            <ArrowUpDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Sidebar */}
          <div className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Price</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    checked={priceFilter === null}
                    onChange={() => handlePriceFilter(null)}
                  />
                  <span className="ml-2 text-gray-700">All Prices</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    checked={priceFilter === 'under-100'}
                    onChange={() => handlePriceFilter('under-100')}
                  />
                  <span className="ml-2 text-gray-700">Under $100</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    checked={priceFilter === '100-200'}
                    onChange={() => handlePriceFilter('100-200')}
                  />
                  <span className="ml-2 text-gray-700">$100 to $200</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    checked={priceFilter === '200-500'}
                    onChange={() => handlePriceFilter('200-500')}
                  />
                  <span className="ml-2 text-gray-700">$200 to $500</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    checked={priceFilter === '500-plus'}
                    onChange={() => handlePriceFilter('500-plus')}
                  />
                  <span className="ml-2 text-gray-700">$500 & Above</span>
                </label>
              </div>
              
              {/* More filter options would go here in a real app */}
              <h3 className="font-medium text-gray-900 mt-6 mb-4">Customer Reviews</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">{stars}+ Stars</span>
                  </label>
                ))}
              </div>
              
              <h3 className="font-medium text-gray-900 mt-6 mb-4">Shipping</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">Free Shipping</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <ProductGrid products={products} columns={3} />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;