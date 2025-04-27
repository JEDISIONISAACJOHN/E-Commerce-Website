import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  featured?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products,
  columns = 4,
  featured = false
}) => {
  const gridColumns = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid ${gridColumns[columns]} gap-4 md:gap-6`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          featured={featured}
        />
      ))}
    </div>
  );
};

export default ProductGrid;