import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const OrderConfirmation: React.FC = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <CheckCircle size={64} className="text-success-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase. Your order has been received.</p>
        <p className="text-gray-900 font-medium mb-8">Order Number: {orderNumber}</p>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8 text-left">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping Information</h3>
              <p className="text-gray-600">
                You will receive an email confirmation with tracking information when your order ships.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Information</h3>
              <p className="text-gray-600">
                Your payment has been processed successfully.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Need Help?</h3>
              <p className="text-gray-600">
                If you have any questions about your order, please contact our customer support team.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Button variant="primary">
            <Link to="/orders">View My Orders</Link>
          </Button>
          <Button variant="outline">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;