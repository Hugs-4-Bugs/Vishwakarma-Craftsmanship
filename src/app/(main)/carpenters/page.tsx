
'use client';

import { useState, useMemo } from 'react';
import { CarpenterCard } from "@/components/shared/carpenter-card";
import { carpenters } from "@/lib/data";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Wrench } from 'lucide-react';
import type { Carpenter } from '@/lib/types';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const allSpecialties = Array.from(new Set(carpenters.flatMap(c => c.specialty)));
const maxExperience = Math.max(...carpenters.map(c => c.experience), 30);

export default function CarpentersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [experienceRange, setExperienceRange] = useState([0, maxExperience]);

    const handleSpecialtyToggle = (specialty: string) => {
        setSelectedSpecialties(prev => 
            prev.includes(specialty)
                ? prev.filter(s => s !== specialty)
                : [...prev, specialty]
        );
    };

    const filteredCarpenters = useMemo(() => {
        return carpenters.filter(carpenter => {
            const matchesQuery = carpenter.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSpecialty = selectedSpecialties.length === 0 || selectedSpecialties.every(spec => carpenter.specialty.includes(spec));
            const matchesExperience = carpenter.experience >= experienceRange[0] && carpenter.experience <= experienceRange[1];
            return matchesQuery && matchesSpecialty && matchesExperience;
        });
    }, [searchQuery, selectedSpecialties, experienceRange]);

    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-24 sm:py-32">
                <div className="text-center mb-12">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Find a Professional Carpenter</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Book skilled and reliable carpenters for everything from custom furniture to home repairs.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-8 p-6 bg-card rounded-lg shadow-sm">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="search" className="font-medium">Search by Name</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    id="search"
                                    placeholder="e.g., Ramesh Kumar"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                           <Label className="font-medium">Filter by Experience (Years)</Label>
                           <Slider 
                             value={experienceRange} 
                             onValueChange={setExperienceRange}
                             max={maxExperience} 
                             step={1}
                           />
                           <div className="flex justify-between text-xs text-muted-foreground">
                               <span>{experienceRange[0]} yrs</span>
                               <span>{experienceRange[1]} yrs</span>
                           </div>
                        </div>
                        
                        <div className="space-y-2">
                             <Label className="font-medium">Filter by Skill</Label>
                             <div className="flex flex-wrap gap-2">
                                {allSpecialties.map(spec => (
                                    <button key={spec} onClick={() => handleSpecialtyToggle(spec)}>
                                        <Badge
                                            variant={selectedSpecialties.includes(spec) ? 'default' : 'secondary'}
                                            className="cursor-pointer transition-all hover:shadow-md"
                                        >
                                            {spec}
                                        </Badge>
                                    </button>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {filteredCarpenters.length > 0 ? (
                        filteredCarpenters.map(carpenter => (
                            <CarpenterCard key={carpenter.id} carpenter={carpenter} />
                        ))
                    ) : (
                        <div className="text-center py-16 bg-card rounded-lg">
                            <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-xl font-semibold">No Carpenters Found</h3>
                            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
