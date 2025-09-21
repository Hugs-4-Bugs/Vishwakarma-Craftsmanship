import Link from 'next/link';
import { products, categories, carpenters } from '@/lib/data';
import { ProductCard } from '@/components/shared/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench, Lightbulb, Users } from 'lucide-react';
import { CarpenterCard } from '@/components/shared/carpenter-card';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function AnimatedHero() {
  return (
    <div className="relative pt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      <Image 
        src={PlaceHolderImages.find(p => p.id === 'hero-bg')?.imageUrl ?? ''}
        alt="Abstract background"
        fill
        className="object-cover"
        quality={80}
        priority
        data-ai-hint="abstract background"
      />
      <div className="container mx-auto px-4 relative z-20">
        <div className="min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center items-center text-center">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground bg-primary/70 p-4 md:p-6 rounded-lg shadow-xl">
              Furniture for Every Home,
            </h1>
            <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4">
              from Roots to Luxury
            </h2>

            <p className="mt-8 max-w-2xl text-lg md:text-xl text-foreground/80">
              Discover exquisitely crafted furniture that brings elegance, comfort, and personality to your living space.
            </p>
            <div className="mt-10 flex gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/shop">Shop Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link href="/carpenters">Book a Carpenter</Link>
              </Button>
            </div>
        </div>
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
    <div>
      <AnimatedHero />

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
                  {/* Placeholder for icon */}
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
