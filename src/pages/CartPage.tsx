import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const shippingEstimate = 0; // Free shipping for this example
  const taxEstimate = subtotal * 0.08; // Example tax rate of 8%
  const orderTotal = subtotal + shippingEstimate + taxEstimate;
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              {cartItems.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
              
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Link to="/" className="text-primary-500 hover:text-primary-600 font-medium flex items-center">
                  Continue Shopping
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">{shippingEstimate === 0 ? 'Free' : `$${shippingEstimate.toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between text-base">
                  <p className="text-gray-600">Tax</p>
                  <p className="font-medium">${taxEstimate.toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                  <p className="text-gray-900">Order Total</p>
                  <p className="text-gray-900">${orderTotal.toFixed(2)}</p>
                </div>
              </div>
              
              <Button 
                variant="primary"
                fullWidth
                className="mt-6"
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              
              <div className="mt-4">
                <p className="text-xs text-gray-500 text-center">
                  By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;