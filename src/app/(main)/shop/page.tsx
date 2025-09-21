"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories, materials, colors } from '@/lib/data';
import { ProductCard } from '@/components/shared/product-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, Filter, X, Check } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceValue, setPriceValue] = useState([150000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 150000), []);

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };
  
  const handleFilter = () => {
    let tempProducts = [...products];

    // Filter by search query
    if (searchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(
        product => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price
    tempProducts = tempProducts.filter(product => product.price <= priceValue[0]);

    // Filter by materials
    if (selectedMaterials.length > 0) {
      tempProducts = tempProducts.filter(product =>
        selectedMaterials.includes(product.material)
      );
    }

    // Filter by color
    if (selectedColor) {
      tempProducts = tempProducts.filter(product => product.color.name === selectedColor);
    }


    setFilteredProducts(tempProducts);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceValue([maxPrice]);
    setSelectedMaterials([]);
    setSelectedColor(null);
    setFilteredProducts(products);
  };
  
  useEffect(() => {
    handleFilter();
  }, [selectedCategory, selectedMaterials, selectedColor, priceValue, searchQuery]);
  
  // Set initial max price for slider
  useEffect(() => {
    setPriceValue([maxPrice]);
  }, [maxPrice]);


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
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-2xl font-semibold flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                <Button onClick={handleReset} variant="ghost" size="sm" className="text-xs">
                    <X className="mr-1 h-3 w-3" /> Reset
                </Button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                     <Input 
                       placeholder="Search products..." 
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                     />
                     <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                   <label className="text-sm font-medium mb-4 block">Price Range</label>
                   <Slider 
                     value={priceValue} 
                     onValueChange={setPriceValue}
                     max={maxPrice} 
                     step={1000} 
                    />
                   <div className="flex justify-between text-xs text-muted-foreground mt-2">
                       <span>₹0</span>
                       <span>₹{priceValue[0].toLocaleString('en-IN')}+</span>
                   </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Material</label>
                  <div className="space-y-2">
                    {materials.map(material => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => handleMaterialChange(material)}
                        />
                        <label
                          htmlFor={`material-${material}`}
                          className="text-sm font-normal text-muted-foreground"
                        >
                          {material}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Color</label>
                  <TooltipProvider>
                    <div className="flex flex-wrap gap-2">
                      {colors.map(color => (
                        <Tooltip key={color.name}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setSelectedColor(color.name === selectedColor ? null : color.name)}
                              className={cn(
                                "w-7 h-7 rounded-full border-2 transition-all",
                                selectedColor === color.name ? 'border-primary scale-110' : 'border-transparent'
                              )}
                              style={{ backgroundColor: color.hex }}
                            >
                              {selectedColor === color.name && <Check className="w-4 h-4 text-white m-auto" />}
                              <span className="sr-only">{color.name}</span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="md:col-span-3">
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                    <ProductCard key={`${product.id}-${index}`} product={product} index={index} />
                ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center h-full min-h-[40vh] bg-card rounded-lg p-8">
                    <h3 className="text-xl font-semibold">No Products Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
