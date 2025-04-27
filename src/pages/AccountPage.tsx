import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, CreditCard, Heart, LogOut } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock order data
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      total: 129.99,
      status: 'Delivered'
    },
    {
      id: 'ORD-12346',
      date: '2023-06-22',
      total: 79.99,
      status: 'Shipped'
    },
    {
      id: 'ORD-12347',
      date: '2023-07-10',
      total: 249.99,
      status: 'Processing'
    }
  ];
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'orders'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'payment'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === 'wishlist'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </button>
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-error-600 rounded-md w-full"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              {/* Profile */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          defaultValue={user.name.split(' ')[0]}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          defaultValue={user.name.split(' ')[1] || ''}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          defaultValue={user.email}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-5">
                      <div className="flex justify-end">
                        <Button variant="secondary" className="mr-3">
                          Cancel
                        </Button>
                        <Button variant="primary">
                          Save
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Orders */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Your Orders</h2>
                  
                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'Delivered'
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === 'Shipped'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${order.total.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-primary-500 hover:text-primary-600">
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                  )}
                </div>
              )}
              
              {/* Payment Methods */}
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Methods</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-gray-500 mb-4">You don't have any saved payment methods yet.</p>
                    <Button variant="primary">Add Payment Method</Button>
                  </div>
                </div>
              )}
              
              {/* Wishlist */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Your Wishlist</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                    <Button variant="primary">Browse Products</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;