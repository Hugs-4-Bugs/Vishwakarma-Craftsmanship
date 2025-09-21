
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { customBuilderOptions } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Layers, Palette, Ruler, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Config = {
  type: string;
  wood: string;
  finish: string;
};

export default function CustomBuilderPage() {
  const [config, setConfig] = useState<Config>({
    type: customBuilderOptions.types[0].name,
    wood: customBuilderOptions.woods[0].name,
    finish: customBuilderOptions.finishes[0].name,
  });
  
  const [key, setKey] = useState(0);

  const selectedType = useMemo(() => customBuilderOptions.types.find(t => t.name === config.type)!, [config.type]);
  const selectedWood = useMemo(() => customBuilderOptions.woods.find(w => w.name === config.wood)!, [config.wood]);
  const selectedFinish = useMemo(() => customBuilderOptions.finishes.find(f => f.name === config.finish)!, [config.finish]);

  const estimatedPrice = useMemo(() => {
    return selectedType.basePrice * selectedWood.priceMultiplier * selectedFinish.priceMultiplier;
  }, [selectedType, selectedWood, selectedFinish]);
  
  const handleSelectChange = (field: keyof Config, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };
  
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [config])

  const previewImage = PlaceHolderImages.find(p => p.id === selectedType.image);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Assemble Your Own Furniture</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Bring your vision to life. Choose your furniture type, materials, and finishes to create a piece that's uniquely yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ----- Configuration Panel ----- */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Hammer className="h-6 w-6"/> Configuration</CardTitle>
              <CardDescription>Select options to build your custom piece.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Furniture Type */}
              <div className="space-y-3">
                <Label htmlFor="type" className="font-semibold flex items-center gap-2 text-lg"><Layers /> Furniture Type</Label>
                <Select value={config.type} onValueChange={(v) => handleSelectChange('type', v)}>
                  <SelectTrigger id="type" className="text-base">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customBuilderOptions.types.map(type => (
                      <SelectItem key={type.name} value={type.name}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Wood Type */}
              <div className="space-y-3">
                <Label className="font-semibold flex items-center gap-2 text-lg"><Ruler /> Wood Type</Label>
                 <RadioGroup value={config.wood} onValueChange={(v) => handleSelectChange('wood', v)} className="grid sm:grid-cols-2 gap-2">
                    {customBuilderOptions.woods.map(wood => (
                        <Label key={wood.name} htmlFor={wood.name} className="flex items-center gap-2 p-3 border rounded-md cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all">
                           <RadioGroupItem value={wood.name} id={wood.name} />
                           {wood.name}
                        </Label>
                    ))}
                 </RadioGroup>
                 {config.wood === 'Other' && (
                     <p className="text-xs text-muted-foreground pt-1">Selecting "Other" will require a consultation. The price shown is an estimate.</p>
                 )}
              </div>

              {/* Finish */}
              <div className="space-y-3">
                 <Label className="font-semibold flex items-center gap-2 text-lg"><Palette /> Finish</Label>
                 <RadioGroup value={config.finish} onValueChange={(v) => handleSelectChange('finish', v)} className="grid sm:grid-cols-2 gap-2">
                    {customBuilderOptions.finishes.map(finish => (
                        <Label key={finish.name} htmlFor={finish.name} className="flex items-center gap-2 p-3 border rounded-md cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all">
                           <RadioGroupItem value={finish.name} id={finish.name} />
                           {finish.name}
                        </Label>
                    ))}
                 </RadioGroup>
              </div>

            </CardContent>
          </Card>
          
          {/* ----- Preview and Price Panel ----- */}
          <div className="md:col-span-1 lg:col-span-2 sticky top-24 h-fit">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Your Custom Piece</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-card rounded-lg flex items-center justify-center p-4 border aspect-square relative overflow-hidden">
                           <AnimatePresence mode="wait">
                               <motion.div
                                 key={key}
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.9 }}
                                 transition={{ duration: 0.3 }}
                                 className="w-full h-full"
                               >
                                {previewImage && (
                                    <Image 
                                        src={previewImage.imageUrl}
                                        alt={config.type}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-contain"
                                        data-ai-hint={previewImage.imageHint}
                                    />
                                )}
                                </motion.div>
                           </AnimatePresence>
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <p className="text-white font-semibold">3D Preview Coming Soon</p>
                           </div>
                        </div>

                        <div className="flex flex-col">
                            <h2 className="font-headline text-2xl font-bold">{config.type}</h2>
                            <p className="text-muted-foreground">Custom Build</p>
                            <Separator className="my-4" />
                            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                                <li><strong>Wood:</strong> {config.wood}</li>
                                <li><strong>Finish:</strong> {config.finish}</li>
                            </ul>
                            
                            <div className="mt-auto">
                                <div className="bg-secondary/30 p-4 rounded-lg text-center mb-6">
                                    <p className="text-sm text-muted-foreground">Estimated Price</p>
                                    <AnimatePresence mode="wait">
                                        <motion.p 
                                            key={estimatedPrice}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10}}
                                            transition={{ duration: 0.2 }}
                                            className="font-headline text-4xl font-bold text-primary"
                                        >
                                            ₹{Math.floor(estimatedPrice).toLocaleString('en-IN')}
                                        </motion.p>
                                    </AnimatePresence>
                                     <p className="text-xs text-muted-foreground mt-1">Final price subject to consultation.</p>
                                </div>

                                <Button size="lg" className="w-full">Request Custom Assembly</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
