import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  count,
  size = 'md',
  interactive = false,
  onRatingChange
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const starSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const currentRating = hoverRating || rating;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          className={interactive ? 'cursor-pointer' : ''}
        >
          <Star
            size={starSizes[size]}
            className={`${
              i < Math.floor(currentRating) 
                ? 'text-yellow-400 fill-yellow-400' 
                : i < currentRating 
                  ? 'text-yellow-400 fill-yellow-400 opacity-50'
                  : 'text-gray-300'
            } ${interactive ? 'transition-colors' : ''}`}
          />
        </span>
      ))}
      
      {count !== undefined && (
        <span className={`ml-1 ${textSizes[size]} text-gray-600`}>
          ({count})
        </span>
      )}
    </div>
  );
};

export default RatingStars;