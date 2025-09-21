"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type ProductCardProps = {
  product: Product;
  index: number;
};

export function ProductCard({ product, index }: ProductCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === product.image);
  const imageUrl = placeholder?.imageUrl ?? "https://picsum.photos/seed/placeholder/600/400";
  const imageHint = placeholder?.imageHint ?? "furniture piece";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <Link href={`/shop/${product.slug}`}>
          <div className="overflow-hidden relative">
            <Image
              src={imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint={imageHint}
            />
             <Badge variant="secondary" className="absolute top-3 right-3">{product.category}</Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="font-headline text-xl font-semibold mb-2 truncate">{product.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
