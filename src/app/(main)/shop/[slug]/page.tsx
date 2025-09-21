
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { products, carpenters } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StarRating } from '@/components/shared/star-rating';
import { ProductCard } from '@/components/shared/product-card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

import { CheckCircle, ShoppingCart, Share2, Heart, AlertTriangle, X } from 'lucide-react';

function ARViewerModal({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: "destructive",
          title: "AR Not Supported",
          description: "Your browser does not support the necessary features for AR.",
        });
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };
    
    // Only request permission when the dialog is likely to be opened.
    // A better implementation might tie this to the Dialog's onOpenChange.
    if(hasCameraPermission === null) {
        getCameraPermission();
    }
  }, [hasCameraPermission, toast]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl h-4/5 flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>AR Preview</DialogTitle>
          <DialogDescription>
            Position the furniture in your room. You can move, scale, and rotate the object.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            {hasCameraPermission === null && <p className="text-white">Requesting camera access...</p>}
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
          </div>

          {/* Placeholder for 3D model */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-1/2 h-1/2 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center pointer-events-auto">
                <p className="text-white font-bold text-2xl">[3D Model Here]</p>
             </div>
          </div>
           
          {hasCameraPermission === false && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <Alert variant="destructive" className="max-w-md">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access in your browser settings to use this feature.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        const foundProduct = products.find(p => p.slug === params.slug);
        if (!foundProduct) {
            // Using a timeout to avoid immediate notFound call during render
            // This is a common pattern for client components that need to handle not found cases
            const timer = setTimeout(() => {
                if (!products.find(p => p.slug === params.slug)) {
                   // notFound(); This causes issues in some Next.js versions with client components
                   // For now, we will just show a message.
                }
            }, 0);
            return () => clearTimeout(timer);
        }
        setProduct(foundProduct);
    }, [params.slug]);


  if (product === undefined) {
    return (
      <div className="container mx-auto px-4 py-48 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="text-muted-foreground mt-4">We couldn't find the product you're looking for.</p>
      </div>
    );
  }

  const placeholder = PlaceHolderImages.find(p => p.id === product.image);
  const imageUrl = placeholder?.imageUrl ?? "https://picsum.photos/seed/placeholder/800/600";
  const imageHint = placeholder?.imageHint ?? "furniture piece";

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Gallery */}
          <div>
            <div className="aspect-square bg-card rounded-lg flex items-center justify-center mb-4 shadow-lg">
                {/* This would be a 3D viewer component */}
                 <Image
                    src={imageUrl}
                    alt={product.name}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-lg"
                    data-ai-hint={imageHint}
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => {
                 const thumbPlaceholder = PlaceHolderImages.find(p => p.id === product.image.replace(/-\d/,'-' + ((parseInt(product.image.slice(-1)) + i) % 5 + 1)));
                 return (
                    <div key={i} className="aspect-square bg-card rounded-lg flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer">
                        <Image
                            src={thumbPlaceholder?.imageUrl ?? `https://picsum.photos/seed/${params.slug}${i}/200/200`}
                            alt={`Thumbnail ${i}`}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                            data-ai-hint={thumbPlaceholder?.imageHint}
                        />
                    </div>
                 )
              })}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-sm font-medium text-primary">{product.category}</span>
            <h1 className="font-headline text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
            <div className="flex items-center gap-4 mt-4">
              <StarRating rating={4.5} />
              <span className="text-sm text-muted-foreground">(125 reviews)</span>
            </div>
            <Separator className="my-6" />
            <p className="text-muted-foreground mb-6">{product.description}</p>
            
            <ul className="space-y-3 text-sm mb-8">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-3" /><span>Dimensions: <strong>{product.dimensions}</strong></span></li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-3" /><span>Material: <strong>{product.name.split(' ')[0]} {product.name.split(' ')[1]}</strong></span></li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-3" /><span>Warranty: <strong>2 Years</strong></span></li>
            </ul>

            <div className="bg-card p-6 rounded-lg mb-8 shadow-sm">
                <p className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</p>
                <p className="text-xs text-muted-foreground mt-1">+ Additional taxes and shipping</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <ARViewerModal>
                    <Button size="lg" variant="outline" className="flex-1">
                        Try in AR
                    </Button>
                </ARViewerModal>
            </div>
             <div className="flex items-center justify-center gap-4 mt-6">
                <Button variant="ghost" size="sm"><Heart className="mr-2 h-4 w-4"/> Wishlist</Button>
                <Button variant="ghost" size="sm"><Share2 className="mr-2 h-4 w-4"/> Share</Button>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-24">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((related, index) => (
                    <ProductCard key={related.id} product={related} index={index} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

    