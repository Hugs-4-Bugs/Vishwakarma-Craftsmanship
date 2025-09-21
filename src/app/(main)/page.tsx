
'use client';

import Link from 'next/link';
import { products, categories, carpenters } from '@/lib/data';
import { ProductCard } from '@/components/shared/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench, Lightbulb, Users } from 'lucide-react';
import { CarpenterCard } from '@/components/shared/carpenter-card';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLiquidCursor } from '@/hooks/use-liquid-cursor';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  const bgImage = PlaceHolderImages.find(p => p.id === 'hero-bg');
  
  useLiquidCursor();

  const showcaseImages = [
    'sofa-1', 'beds-1', 'tables-1', 'chairs-1', 'wardrobes-1', 'dining-1'
  ].map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean) as (typeof PlaceHolderImages[0])[];


  return (
    <div ref={targetRef} className="relative h-[120vh] -mt-20">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
          {bgImage && (
            <Image
              src={bgImage.imageUrl}
              alt="Carpentry background"
              fill
              className="object-cover"
              quality={90}
              priority
              data-ai-hint={bgImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white"
          style={{ opacity: opacityHero }}
        >
          <div className="container mx-auto px-4">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Style Your Home with
            </h1>
            <h2 className="font-headline mt-4 text-5xl font-bold tracking-tight text-primary md:text-7xl lg:text-8xl">
              Vishwakarma Craftsmanship
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-lg text-white/80 md:text-xl">
              Discover exquisitely crafted furniture that brings elegance, comfort, and personality to your living space.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="font-bold" data-cursor-size="80" data-cursor-text="Shop">
                <Link href="/shop">Shop Ready-Made</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold" data-cursor-size="80" data-cursor-text="Build">
                <Link href="/custom-builder">Build Custom Furniture</Link>
              </Button>
            </div>
             <div className="mt-16 w-full max-w-4xl h-64 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full h-full"
                >
                  <CarouselContent className="h-full">
                    {showcaseImages.map((image, index) => (
                      <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 h-full flex items-center justify-center">
                        <div className="p-1 h-full w-full">
                           <Card className="h-full w-full overflow-hidden bg-transparent border-none">
                            <CardContent className="relative flex h-full w-full items-center justify-center p-0">
                              <Image
                                src={image.imageUrl}
                                alt={image.imageHint}
                                width={300}
                                height={200}
                                className="object-contain h-auto w-full transition-transform duration-300 hover:scale-105"
                                data-ai-hint={image.imageHint}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-headline text-3xl md:text-4xl font-bold">{children}</h2>
      {subtitle && <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-background">
      <Hero />

      <Section>
        <SectionTitle subtitle="Handpicked for you, these pieces represent the pinnacle of our craftsmanship and design.">
          Featured Products
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">Explore All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      <Section className="bg-secondary">
        <SectionTitle subtitle="Find the perfect piece for any room with our diverse range of categories.">
          Browse by Category
        </SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 8).map((category) => (
            <Link key={category.slug} href={`/shop?category=${category.slug}`}>
              <Card className="h-full text-center group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-card">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-headline text-lg font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Need a Professional Hand?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our marketplace connects you with skilled and verified carpenters for custom projects, repairs, and assembly.
              </p>
              <Button asChild size="lg" className="mt-8">
                  <Link href="/carpenters">Find a Carpenter <Wrench className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="space-y-6">
                {carpenters.slice(0, 2).map((carpenter, index) => (
                    <CarpenterCard key={carpenter.id} carpenter={carpenter} />
                ))}
            </div>
        </div>
      </Section>

       <Section className="bg-secondary">
        <SectionTitle subtitle="Get personalized furniture suggestions based on your unique style and needs.">
          AI-Powered Recommendations
        </SectionTitle>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8 text-center">
            <Lightbulb className="h-12 w-12 mx-auto text-accent mb-4" />
            <h3 className="font-headline text-2xl font-semibold mb-2">Find Your Perfect Match</h3>
            <p className="text-muted-foreground mb-6">Let our AI assistant curate a list of furniture that perfectly fits your space and taste. It's like having a personal interior designer.</p>
            <Button size="lg" variant="default">
                Get Recommendations
            </Button>
          </CardContent>
        </Card>
      </Section>

    </div>
  );
}
