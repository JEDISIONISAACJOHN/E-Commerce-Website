import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../product/ProductGrid';
import { Product } from '../../types';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  link?: {
    text: string;
    url: string;
  };
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title, 
  products,
  link 
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          
          {link && (
            <Link 
              to={link.url}
              className="text-primary-500 hover:text-primary-600 font-medium flex items-center"
            >
              {link.text}
              <ArrowRight size={16} className="ml-1" />
            </Link>
          )}
        </div>
        
        <ProductGrid products={products} featured={true} />
      </div>
    </section>
  );
};

export default FeaturedProducts;