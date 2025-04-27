import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { Review } from '../../types';
import RatingStars from '../product/RatingStars';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [isHelpful, setIsHelpful] = React.useState(false);
  const [helpfulCount, setHelpfulCount] = React.useState(review.helpful);
  
  const handleHelpfulClick = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(prev => prev + 1);
    } else {
      setIsHelpful(false);
      setHelpfulCount(prev => prev - 1);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="border-b border-gray-200 py-4 animate-fade-in">
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <RatingStars rating={review.rating} size="sm" />
            <h4 className="ml-2 text-sm font-semibold">{review.title}</h4>
          </div>
          
          <div className="text-sm text-gray-500 mb-2">
            By {review.username} on {formatDate(review.date)}
          </div>
          
          <p className="text-gray-700 text-sm mb-3">{review.comment}</p>
          
          <button 
            onClick={handleHelpfulClick}
            className={`flex items-center text-xs ${
              isHelpful ? 'text-primary-500' : 'text-gray-500'
            } hover:text-primary-500 transition-colors`}
          >
            <ThumbsUp size={14} className="mr-1" />
            {helpfulCount} {helpfulCount === 1 ? 'person' : 'people'} found this helpful
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;