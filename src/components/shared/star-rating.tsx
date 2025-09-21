import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  className?: string;
};

export function StarRating({ rating, maxRating = 5, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 text-accent fill-accent" />
      ))}
      {halfStar && (
         <div className="relative">
            <Star key="half" className="h-4 w-4 text-accent" />
            <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
                <Star className="h-4 w-4 text-accent fill-accent" />
            </div>
         </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-accent" />
      ))}
    </div>
  );
}
