import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: true
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image: 'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: true
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: true
  },
  {
    id: 'books',
    name: 'Books',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: false
  },
  {
    id: 'furniture',
    name: 'Furniture',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: true
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    image: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: false
  }
];

export const getFeaturedCategories = (): Category[] => {
  return categories.filter(category => category.featured);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};