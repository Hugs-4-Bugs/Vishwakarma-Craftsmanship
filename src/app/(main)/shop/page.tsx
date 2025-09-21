
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
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function FilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceValue,
  setPriceValue,
  maxPrice,
  selectedMaterials,
  handleMaterialChange,
  selectedColor,
  setSelectedColor,
  handleReset,
  applyFilters,
  closeSheet
} : {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  priceValue: number[];
  setPriceValue: (p: number[]) => void;
  maxPrice: number;
  selectedMaterials: string[];
  handleMaterialChange: (m: string) => void;
  selectedColor: string | null;
  setSelectedColor: (c: string | null) => void;
  handleReset: () => void;
  applyFilters: () => void;
  closeSheet: () => void;
}) {
  return (
    <>
      <SheetHeader className="pr-12">
        <SheetTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
        </SheetTitle>
      </SheetHeader>

      <div className="space-y-8 py-6 pr-6 overflow-y-auto">
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
      
      <SheetFooter className="p-4 border-t border-border">
        <Button onClick={handleReset} variant="outline" className="w-full">
            <X className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button onClick={() => { applyFilters(); closeSheet(); }} className="w-full">Apply Filters</Button>
      </SheetFooter>
    </>
  );
}


export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // States for filters that are staged/pending until 'Apply' is clicked
  const [stagedSearchQuery, setStagedSearchQuery] = useState('');
  const [stagedCategory, setStagedCategory] = useState(initialCategory);
  const [stagedPrice, setStagedPrice] = useState([150000]);
  const [stagedMaterials, setStagedMaterials] = useState<string[]>([]);
  const [stagedColor, setStagedColor] = useState<string | null>(null);

  // Active filter states
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: '',
    category: initialCategory,
    price: 150000,
    materials: [] as string[],
    color: null as string | null
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price), 150000), []);
  
  // Set initial max price for slider
  useEffect(() => {
    setStagedPrice([maxPrice]);
    setActiveFilters(prev => ({...prev, price: maxPrice}));
  }, [maxPrice]);
  
  // Sync URL category with filter state
  useEffect(() => {
    setStagedCategory(initialCategory);
    setActiveFilters(prev => ({ ...prev, category: initialCategory }));
  }, [initialCategory]);

  const handleMaterialChange = (material: string) => {
    setStagedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };
  
  const applyFilters = () => {
    setActiveFilters({
      searchQuery: stagedSearchQuery,
      category: stagedCategory,
      price: stagedPrice[0],
      materials: stagedMaterials,
      color: stagedColor
    });
  };

  const handleReset = () => {
    setStagedSearchQuery('');
    setStagedCategory('all');
    setStagedPrice([maxPrice]);
    setStagedMaterials([]);
    setStagedColor(null);
    setActiveFilters({
      searchQuery: '',
      category: 'all',
      price: maxPrice,
      materials: [],
      color: null
    });
  };
  
  useEffect(() => {
    let tempProducts = [...products];
    const { searchQuery, category, price, materials, color } = activeFilters;

    if (searchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category && category !== 'all') {
      tempProducts = tempProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    tempProducts = tempProducts.filter(product => product.price <= price);
    if (materials.length > 0) {
      tempProducts = tempProducts.filter(product =>
        materials.includes(product.material)
      );
    }
    if (color) {
      tempProducts = tempProducts.filter(product => product.color.name === color);
    }

    setFilteredProducts(tempProducts);
  }, [activeFilters]);


  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Collection</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our curated selection of fine furniture, designed to bring life and luxury to your home.
          </p>
        </div>

        <div className="mb-8 flex justify-end">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col p-0" side="left">
                    <FilterSidebar 
                        searchQuery={stagedSearchQuery}
                        setSearchQuery={setStagedSearchQuery}
                        selectedCategory={stagedCategory}
                        setSelectedCategory={setStagedCategory}
                        priceValue={stagedPrice}
                        setPriceValue={setStagedPrice}
                        maxPrice={maxPrice}
                        selectedMaterials={stagedMaterials}
                        handleMaterialChange={handleMaterialChange}
                        selectedColor={stagedColor}
                        setSelectedColor={setStagedColor}
                        handleReset={handleReset}
                        applyFilters={applyFilters}
                        closeSheet={() => setIsSheetOpen(false)}
                    />
                </SheetContent>
            </Sheet>
        </div>

        <main>
          {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
  );
}
