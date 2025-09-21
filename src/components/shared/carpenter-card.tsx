
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Carpenter } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from './star-rating';
import { Wrench } from 'lucide-react';
import { BookingModal } from './booking-modal';

type CarpenterCardProps = {
  carpenter: Carpenter;
};

export function CarpenterCard({ carpenter }: CarpenterCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const placeholder = PlaceHolderImages.find(p => p.id === carpenter.image);
  const imageUrl = placeholder?.imageUrl ?? "https://picsum.photos/seed/carp-placeholder/400/400";
  const imageHint = placeholder?.imageHint ?? "carpenter portrait";

  return (
    <>
      <Card className="group transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative h-28 w-28 shrink-0">
            <Image
              src={imageUrl}
              alt={carpenter.name}
              width={112}
              height={112}
              className="rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
              data-ai-hint={imageHint}
            />
          </div>
          <div className="flex-grow text-center sm:text-left">
            <h3 className="font-headline text-xl font-semibold">{carpenter.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{carpenter.experience} years of experience</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <StarRating rating={carpenter.rating} />
              <span className="text-xs font-medium text-muted-foreground">({carpenter.rating})</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
              {carpenter.specialty.slice(0, 2).map(spec => (
                <Badge key={spec} variant="secondary">{spec}</Badge>
              ))}
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center sm:items-end gap-2">
              <p className="font-bold text-lg text-primary">₹{carpenter.hourlyRate}/hr</p>
              <Button onClick={() => setIsBookingOpen(true)}>
                  Book Now
                  <Wrench className="ml-2 h-4 w-4" />
              </Button>
          </div>
        </CardContent>
      </Card>
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        carpenter={carpenter} 
      />
    </>
  );
}
