

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
  
  const showcaseImages = [
    'sofa-1', 'beds-1', 'tables-1', 'chairs-1', 'wardrobes-1', 'dining-1'
  ].map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean) as (typeof PlaceHolderImages[0])[];


  return (
    <div ref={targetRef} className="relative h-[120vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col">
        <div className="absolute inset-0 z-0">
          <motion.div className="absolute inset-0" style={{ y: yBg }}>
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
        </div>

        <motion.div
          className="relative z-10 flex flex-col flex-grow h-full"
          style={{ opacity: opacityHero }}
        >
          <div className="container mx-auto px-4 flex flex-col flex-grow text-white text-center">
            <div className="flex-1 flex flex-col items-center justify-end pb-12">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Style Your Home with
                </h1>
                <h2 className="font-headline mt-2 text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl">
                  Vishwakarma Craftsmanship
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-base text-white/80 md:text-xl">
                  Discover exquisitely crafted furniture that brings elegance, comfort, and personality to your living space.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="font-bold w-full sm:w-auto" data-cursor-interactive>
                    <Link href="/shop">Shop Ready-Made</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold w-full sm:w-auto" data-cursor-interactive>
                    <Link href="/custom-builder">Build Custom Furniture</Link>
                  </Button>
                </div>
            </div>
             <div className="mb-4 w-full max-w-4xl mx-auto h-48 sm:h-56 md:h-64 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full h-full"
                >
                  <CarouselContent className="h-full">
                    {showcaseImages.map((image, index) => (
                      <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 h-full flex items-center justify-center">
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
                                data-cursor-interactive
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
          <Button asChild variant="outline" size="lg" data-cursor-interactive>
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
            <Link key={category.slug} href={`/shop?category=${category.slug}`} data-cursor-interactive>
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
              <Button asChild size="lg" className="mt-8" data-cursor-interactive>
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
        <SectionTitle subtitle="Don't know where to start? Let our AI guide you to the perfect furniture for your home.">
          Take Our Style Quiz
        </SectionTitle>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8 text-center">
            <Lightbulb className="h-12 w-12 mx-auto text-accent mb-4" />
            <h3 className="font-headline text-2xl font-semibold mb-2">Find Your Perfect Match</h3>
            <p className="text-muted-foreground mb-6">Answer a few simple questions and our AI assistant will curate a personalized style profile and furniture recommendations just for you.</p>
            <Button asChild size="lg" variant="default" data-cursor-interactive>
                <Link href="/style-quiz">
                 Start the Quiz
                </Link>
            </Button>
          </CardContent>
        </Card>
      </Section>

    </div>
  );
}
