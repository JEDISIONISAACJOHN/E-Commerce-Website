import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Hero background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-xl">
          Shop the Best Deals Online
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-xl">
          Discover amazing products at unbeatable prices. Free shipping on qualified orders.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button size="lg">
            <Link to="/category/electronics">Shop Electronics</Link>
          </Button>
          <Button variant="outline" size="lg" className="bg-white/20 text-white border-white hover:bg-white/30">
            <Link to="/deals">Today's Deals</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;