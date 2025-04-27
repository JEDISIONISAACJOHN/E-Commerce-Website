import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-40 w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base font-medium text-gray-900 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;