import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'u1',
    username: 'Michael T.',
    rating: 5,
    title: 'Best headphones I\'ve ever owned',
    comment: 'The sound quality is amazing and the noise cancellation works perfectly. Battery life is impressive too - easily lasts for my long flights.',
    date: '2023-04-15',
    helpful: 24
  },
  {
    id: 'r2',
    productId: '1',
    userId: 'u2',
    username: 'Sarah J.',
    rating: 4,
    title: 'Great sound, slightly uncomfortable after long use',
    comment: 'Sound quality is outstanding and noise cancellation works well. My only complaint is that they get a bit uncomfortable after wearing them for 3+ hours.',
    date: '2023-05-22',
    helpful: 18
  },
  {
    id: 'r3',
    productId: '1',
    userId: 'u3',
    username: 'David L.',
    rating: 5,
    title: 'Perfect for working from home',
    comment: 'These headphones have been a lifesaver while working from home. They block out all the household noise and the microphone quality for calls is excellent.',
    date: '2023-06-10',
    helpful: 15
  },
  {
    id: 'r4',
    productId: '2',
    userId: 'u4',
    username: 'Emma W.',
    rating: 5,
    title: 'Excellent smartphone, great value',
    comment: 'This phone exceeds my expectations in every way. The camera takes beautiful photos, battery lasts all day, and the screen is crystal clear.',
    date: '2023-03-18',
    helpful: 42
  },
  {
    id: 'r5',
    productId: '2',
    userId: 'u5',
    username: 'Robert K.',
    rating: 4,
    title: 'Solid performance, minor software issues',
    comment: 'Overall a great phone with excellent performance. Camera and display are top-notch. Only giving 4 stars because of occasional software glitches that I hope will be fixed in updates.',
    date: '2023-04-02',
    helpful: 31
  }
];

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(review => review.productId === productId);
};