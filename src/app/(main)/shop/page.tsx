import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/shared/product-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

export default function ShopPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Collection</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our curated selection of fine furniture, designed to bring life and luxury to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-24 p-6 bg-card rounded-lg shadow-sm">
              <h2 className="font-headline text-2xl font-semibold mb-6 flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                     <Input placeholder="Search products..." />
                     <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="text-sm font-medium mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                   <label className="text-sm font-medium mb-2 block">Price Range</label>
                   <Slider defaultValue={[50000]} max={150000} step={1000} />
                   <div className="flex justify-between text-xs text-muted-foreground mt-2">
                       <span>₹0</span>
                       <span>₹1,50,000+</span>
                   </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
              {/* Add more products to show pagination or infinite scroll in future */}
              {products.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={{...product, id: `${product.id}-${index}`}} index={index + products.length} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
