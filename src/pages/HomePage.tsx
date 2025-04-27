import React from 'react';
import Layout from '../components/layout/Layout';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import { getFeaturedProducts } from '../data/products';
import { getFeaturedCategories } from '../data/categories';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const featuredCategories = getFeaturedCategories();

  return (
    <Layout>
      <HeroBanner />
      
      <CategorySection categories={featuredCategories} />
      
      <FeaturedProducts
        title="Featured Products"
        products={featuredProducts}
        link={{
          text: "View All Products",
          url: "/products"
        }}
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Get Free Shipping on Orders Over $50</h2>
                <p className="text-gray-600 mb-6">
                  Join our loyalty program today and enjoy exclusive benefits, including free shipping, special discounts, and early access to new products.
                </p>
                <div>
                  <a
                    href="#"
                    className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
                  >
                    Join Now
                  </a>
                </div>
              </div>
              <div className="aspect-w-16 aspect-h-9 md:aspect-auto">
                <img
                  src="https://images.pexels.com/photos/6214478/pexels-photo-6214478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Free shipping promotion"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;