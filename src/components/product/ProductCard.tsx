import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-yellow-400' 
                : i < rating 
                  ? 'text-yellow-400 fill-yellow-400 opacity-50'
                  : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({product.rating.count})</span>
      </div>
    );
  };

  return (
    <div 
      className={`group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
        featured ? 'border border-gray-200' : ''
      }`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          {/* Product image */}
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Discount badge */}
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-error-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </div>
          )}

          {/* Free shipping badge */}
          {product.freeShipping && (
            <div className="absolute top-2 right-2 bg-success-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Free Shipping
            </div>
          )}

          {/* Quick actions overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Button 
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                className="flex items-center"
              >
                <ShoppingCart size={16} className="mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 h-10">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="mt-1">
            {renderStars(product.rating.rate)}
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;