import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200 animate-fade-in">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 sm:ml-6 flex flex-col sm:flex-row justify-between">
        <div className="flex-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-medium text-gray-900 hover:text-primary-500 transition-colors">
              {product.title}
            </h3>
          </Link>
          
          {product.inStock ? (
            <p className="mt-1 text-sm text-success-600 font-medium">In Stock</p>
          ) : (
            <p className="mt-1 text-sm text-error-500 font-medium">Out of Stock</p>
          )}
          
          {product.freeShipping && (
            <p className="mt-1 text-sm text-success-600">Eligible for Free Shipping</p>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center mt-2">
            <button 
              onClick={handleDecrease} 
              className="p-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="mx-2 w-8 text-center">{quantity}</span>
            <button 
              onClick={handleIncrease} 
              className="p-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Plus size={16} />
            </button>
            <button 
              onClick={handleRemove} 
              className="ml-4 p-1 text-gray-500 hover:text-error-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
          <div className="flex items-end">
            <span className="text-base font-medium text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${(product.originalPrice * quantity).toFixed(2)}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-sm text-success-600 font-medium">
              Save ${((product.originalPrice - product.price) * quantity).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;