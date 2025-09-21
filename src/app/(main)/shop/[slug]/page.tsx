
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import { motion, useDragControls } from "framer-motion";

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

import { CheckCircle, ShoppingCart, Share2, Heart, AlertTriangle, X, CameraOff, Move, ZoomIn, ZoomOut, RotateCcw, RotateCw } from 'lucide-react';

function ARViewerModal({ children, product }: { children: React.ReactNode, product: Product }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const controls = useDragControls();
  const { toast } = useToast();

  const resetTransform = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  }

  useEffect(() => {
    if (!isDialogOpen) return;

    let stream: MediaStream | null = null;
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
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings.",
        });
      }
    };
    
    getCameraPermission();
    resetTransform();

    return () => {
      // Stop the camera stream when the dialog closes
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [isDialogOpen, toast]);

  const productPlaceholder = PlaceHolderImages.find(p => p.id === product.image);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>AR Preview</DialogTitle>
          <DialogDescription>
            Move, scale, and rotate the <span className="font-semibold">{product.name}</span> to see how it fits in your space.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-secondary flex items-center justify-center">
            {hasCameraPermission === null && (
              <div className="text-center text-secondary-foreground">
                <p>Requesting camera access...</p>
              </div>
            )}
            <video ref={videoRef} className={`w-full h-full object-cover transition-opacity ${hasCameraPermission ? 'opacity-100' : 'opacity-0'}`} autoPlay muted playsInline />
          </div>

          {/* Draggable & Scalable 3D model placeholder */}
          {productPlaceholder && hasCameraPermission && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              drag
              dragListener={false}
              dragControls={controls}
              dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
              dragElastic={0.2}
              style={{ x: position.x, y: position.y, scale, rotate: rotation }}
              animate={{ x: position.x, y: position.y, scale, rotate: rotation }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={productPlaceholder.imageUrl}
                alt={product.name}
                width={300}
                height={300}
                className="w-auto h-auto max-w-[50%] max-h-[50%] object-contain pointer-events-none drop-shadow-2xl"
                data-ai-hint={productPlaceholder.imageHint}
                draggable={false}
              />
            </motion.div>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/50 backdrop-blur-md p-2 rounded-full shadow-lg">
             <Button variant="ghost" size="icon" onPointerDown={(e) => controls.start(e)} className="cursor-grab active:cursor-grabbing touch-none"><Move className="h-5 w-5"/></Button>
             <Separator orientation="vertical" className="h-6" />
             <Button variant="ghost" size="icon" onClick={() => setScale(s => s * 1.1)}><ZoomIn className="h-5 w-5"/></Button>
             <Button variant="ghost" size="icon" onClick={() => setScale(s => s * 0.9)}><ZoomOut className="h-5 w-5"/></Button>
             <Separator orientation="vertical" className="h-6" />
             <Button variant="ghost" size="icon" onClick={() => setRotation(r => r - 30)}><RotateCcw className="h-5 w-5"/></Button>
             <Button variant="ghost" size="icon" onClick={() => setRotation(r => r + 30)}><RotateCw className="h-5 w-5"/></Button>
             <Separator orientation="vertical" className="h-6" />
             <Button variant="ghost" size="icon" onClick={resetTransform}><X className="h-5 w-5"/></Button>
          </div>
           
          {hasCameraPermission === false && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
              <Alert variant="destructive" className="max-w-md">
                <CameraOff className="h-4 w-4" />
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  To view this item in your room, please allow camera access in your browser settings.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        const slug = params.slug;
        if (typeof slug !== 'string') return;
        
        const foundProduct = products.find(p => p.slug === slug);
        setProduct(foundProduct);
    }, [params.slug]);


  if (!product) {
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
            <div className="group relative aspect-square bg-card rounded-lg flex items-center justify-center mb-4 shadow-lg overflow-hidden">
                 <Image
                    src={imageUrl}
                    alt={product.name}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={imageHint}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">3D View Placeholder</p>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => {
                 const thumbPlaceholder = PlaceHolderImages.find(p => p.id === product.image.replace(/-\d/, '-' + ((parseInt(product.image.slice(-1)) || 1) + i) % 5 + 1));
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
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-accent mr-3" /><span>Material: <strong>{product.material}</strong></span></li>
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
                <ARViewerModal product={product}>
                    <Button size="lg" variant="outline" className="flex-1">
                        View in My Room
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
