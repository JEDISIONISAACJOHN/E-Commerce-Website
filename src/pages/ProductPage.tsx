import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import RatingStars from '../components/product/RatingStars';
import ReviewItem from '../components/review/ReviewItem';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';
import { getProductById, getRelatedProducts } from '../data/products';
import { getReviewsByProductId } from '../data/reviews';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart } = useCart();
  
  // Get product details
  const product = getProductById(id || '');
  const reviews = getReviewsByProductId(id || '');
  const relatedProducts = getRelatedProducts(id || '');
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Create an array of images (in a real app, product would have multiple images)
  const images = [product.image];
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
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
            <li>
              <Link to={`/category/${product.category}`} className="hover:text-primary-500">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-medium truncate">{product.title}</li>
          </ol>
        </nav>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <div className="mb-8 lg:mb-0">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={images[activeImageIndex]}
                alt={product.title}
                className="w-full h-full object-center object-contain"
              />
            </div>
            
            {/* Thumbnail Images (would display more in a real app) */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`border rounded-md overflow-hidden ${
                      index === activeImageIndex ? 'ring-2 ring-primary-500' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-center object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.title}</h1>
            
            <div className="mt-3">
              <div className="flex items-center">
                <RatingStars rating={product.rating.rate} count={product.rating.count} />
              </div>
            </div>
            
            <div className="mt-5">
              <div className="flex items-end">
                <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                {product.originalPrice && (
                  <p className="ml-3 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                )}
              </div>
              {product.originalPrice && (
                <p className="mt-1 text-sm text-success-600 font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round((1 - product.price / product.originalPrice) * 100)}% off)
                </p>
              )}
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>
            
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Features</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 text-primary-500 mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-6">
              <div className="text-sm font-medium text-gray-900 mb-2">
                Availability: 
                <span className={product.inStock ? 'text-success-600 ml-1' : 'text-error-500 ml-1'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {product.freeShipping && (
                <div className="text-sm font-medium text-success-600">
                  Eligible for FREE Shipping
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <div className="flex items-center">
                <div className="mr-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex-1">
                  <Button 
                    onClick={handleAddToCart} 
                    fullWidth
                    variant="primary"
                    size="lg"
                    className="group"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-2 group-hover:animate-bounce" size={20} />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-4">
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-500">
                  <Heart className="mr-1" size={18} />
                  Add to Wishlist
                </button>
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-500">
                  <Share2 className="mr-1" size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet for this product.</p>
          )}
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;