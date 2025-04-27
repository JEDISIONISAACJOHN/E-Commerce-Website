import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Wireless Noise Cancelling Headphones',
    price: 129.99,
    originalPrice: 199.99,
    description: 'Experience premium sound quality with these wireless noise cancelling headphones. Features include 30-hour battery life, quick charge, and comfortable over-ear design.',
    category: 'electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: {
      rate: 4.6,
      count: 457
    },
    features: [
      '30-hour battery life',
      'Active noise cancellation',
      'Built-in microphone for calls',
      'Bluetooth 5.0 connectivity',
      'Foldable design for easy storage'
    ],
    inStock: true,
    freeShipping: true
  },
  {
    id: '2',
    title: 'Smartphone 128GB Unlocked',
    price: 549.99,
    description: 'Latest model smartphone with 128GB storage, 6.5" OLED display, and triple camera system. Unlocked for all carriers.',
    category: 'electronics',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: {
      rate: 4.8,
      count: 1203
    },
    features: [
      '128GB storage',
      '6.5" OLED display',
      'Triple camera system',
      'All-day battery life',
      'Water and dust resistant'
    ],
    inStock: true,
    freeShipping: true
  },
  {
    id: '3',
    title: 'Ultra HD 4K Smart TV - 55"',
    price: 499.99,
    originalPrice: 649.99,
    description: 'Immerse yourself in stunning 4K resolution with this 55" smart TV. Features include built-in streaming apps, voice control, and HDR for vibrant colors.',
    category: 'electronics',
    image: 'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: {
      rate: 4.5,
      count: 872
    },
    features: [
      '4K Ultra HD resolution',
      'Built-in streaming apps',
      'Voice control capability',
      'HDR for enhanced colors',
      'Multiple HDMI ports'
    ],
    inStock: true,
    freeShipping: false
  },
  {
    id: '4',
    title: 'Lightweight Laptop 15.6"',
    price: 799.99,
    description: 'Powerful yet lightweight laptop with 15.6" display, 16GB RAM, 512GB SSD, and all-day battery life. Perfect for work and entertainment.',
    category: 'electronics',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: {
      rate: 4.7,
      count: 659
    },
    features: [
      '15.6" Full HD display',
      '16GB RAM',
      '512GB SSD storage',
      '10-hour battery life',
      'Backlit keyboard'
    ],
    inStock: true,
    freeShipping: true
  },
  {
    id: '5',
    title: 'Ergonomic Office Chair',
    price: 189.99,
    originalPrice: 249.99,
    description: 'Stay comfortable during long work sessions with this ergonomic office chair featuring adjustable height, lumbar support, and breathable mesh material.',
    category: 'furniture',
    image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: {
      rate: 4.4,
      count: 312
    },
    features: [
      'Adjustable height',
      'Lumbar support',
      'Breathable mesh material',
      '360° swivel',
      'Heavy-duty casters'
    ],
    inStock: true,
    freeShipping: false
  },
  {
    id: '6',
    title: 'Smart Watch with Health Monitoring',
    price: 159.99,
    description: 'Track your fitness and stay connected with this smart watch featuring heart rate monitoring, sleep tracking, and smartphone notifications.',
    category: 'electronics',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: {
      rate: 4.3,
      count: 528
    },
    features: [
      'Heart rate monitoring',
      'Sleep tracking',
      'Water resistant',
      'Smartphone notifications',
      '7-day battery life'
    ],
    inStock: true,
    freeShipping: true
  },
  {
    id: '7',
    title: 'Coffee Maker with Grinder',
    price: 129.99,
    description: 'Brew fresh coffee at home with this coffee maker featuring a built-in grinder, programmable timer, and thermal carafe to keep your coffee hot.',
    category: 'home',
    image: 'https://images.pexels.com/photos/6316049/pexels-photo-6316049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: {
      rate: 4.5,
      count: 217
    },
    features: [
      'Built-in grinder',
      'Programmable timer',
      'Thermal carafe',
      '10-cup capacity',
      'Automatic shut-off'
    ],
    inStock: true,
    freeShipping: false
  },
  {
    id: '8',
    title: 'Portable Bluetooth Speaker',
    price: 79.99,
    originalPrice: 99.99,
    description: 'Take your music anywhere with this portable Bluetooth speaker featuring 24-hour battery life, waterproof design, and powerful sound.',
    category: 'electronics',
    image: 'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: {
      rate: 4.6,
      count: 436
    },
    features: [
      '24-hour battery life',
      'Waterproof design',
      'Bluetooth 5.0 connectivity',
      'Built-in microphone',
      'Compact and portable'
    ],
    inStock: true,
    freeShipping: true
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product, index) => index < 4);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};