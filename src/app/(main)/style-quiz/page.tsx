
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LoaderCircle, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getStyleRecommendations, StyleQuizOutput } from '@/ai/flows/style-quiz.flow';
import { ProductCard } from '@/components/shared/product-card';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';


const quizSteps = [
  {
    id: 'room',
    title: 'Which room are you styling?',
    options: ['Living Room', 'Bedroom', 'Dining Room', 'Home Office', 'Outdoor'],
  },
  {
    id: 'style',
    title: 'Which of these styles speaks to you?',
    subtitle: 'Select up to 3 images that you feel drawn to.',
    multiple: true,
    limit: 3,
    options: [
      { value: 'modern', label: 'Modern & Clean', image: 'https://picsum.photos/seed/quiz-modern/400/300' },
      { value: 'bohemian', label: 'Bohemian & Eclectic', image: 'https://picsum.photos/seed/quiz-boho/400/300' },
      { value: 'minimalist', label: 'Minimalist & Simple', image: 'https://picsum.photos/seed/quiz-minimal/400/300' },
      { value: 'traditional', label: 'Traditional & Classic', image: 'https://picsum.photos/seed/quiz-trad/400/300' },
      { value: 'industrial', label: 'Industrial & Edgy', image: 'https://picsum.photos/seed/quiz-industrial/400/300' },
      { value: 'coastal', label: 'Coastal & Breezy', image: 'https://picsum.photos/seed/quiz-coastal/400/300' },
    ],
  },
  {
    id: 'color',
    title: 'What colors do you prefer?',
    subtitle: 'Choose your favorite color palette.',
    options: [
      { value: 'neutrals', label: 'Earthy Neutrals', colors: ['#F5F5DC', '#D2B48C', '#A0522D'] },
      { value: 'cool', label: 'Cool Tones', colors: ['#B0C4DE', '#778899', '#4682B4'] },
      { value: 'warm', label: 'Warm Hues', colors: ['#FFDAB9', '#FFA07A', '#CD5C5C'] },
      { value: 'monochromatic', label: 'Monochromatic', colors: ['#2F4F4F', '#708090', '#C0C0C0'] },
    ],
  },
];

type QuizAnswers = {
  room: string;
  styleImages: string[];
  colors: string[];
};

export default function StyleQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<StyleQuizOutput | null>(null);

  const currentStep = quizSteps[step];
  const isLastStep = step === quizSteps.length - 1;

  const handleSelect = (value: string) => {
    if (currentStep.multiple) {
      const currentValues = (answers[currentStep.id as keyof QuizAnswers] as string[] || []);
      if (currentValues.includes(value)) {
        setAnswers({ ...answers, [currentStep.id]: currentValues.filter(v => v !== value) });
      } else if (currentValues.length < (currentStep.limit || 3)) {
        setAnswers({ ...answers, [currentStep.id]: [...currentValues, value] });
      }
    } else {
      setAnswers({ ...answers, [currentStep.id]: value });
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const finalAnswers = {
        room: answers.room || '',
        styleImages: answers.styleImages || [],
        colors: answers.colors || [],
      };
      const response = await getStyleRecommendations(finalAnswers);
      setResults(response);
    } catch (error) {
      console.error('Error getting style recommendations:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendedProducts = () => {
    if (!results) return [];
    
    let recommendedProducts: Product[] = [];
    const addedProductIds = new Set();

    results.recommendations.forEach(rec => {
      const categoryProducts = products
        .filter(p => p.category.toLowerCase() === rec.category.toLowerCase())
        .filter(p => !addedProductIds.has(p.id));

      if (categoryProducts.length > 0) {
        const productToAdd = categoryProducts[0];
        recommendedProducts.push(productToAdd);
        addedProductIds.add(productToAdd.id);
      }
    });

    return recommendedProducts.slice(0, 4);
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Find Your Perfect Style</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Answer a few questions and let our AI create a personalized design profile just for you.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto min-h-[500px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full min-h-[500px] p-8"
              >
                <LoaderCircle className="h-12 w-12 animate-spin text-primary mb-4" />
                <h2 className="font-headline text-2xl font-semibold">Analyzing Your Style...</h2>
                <p className="text-muted-foreground mt-2">Our AI is crafting your personalized recommendations.</p>
              </motion.div>
            ) : results ? (
               <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8"
              >
                <div className="text-center mb-12">
                   <Sparkles className="h-12 w-12 mx-auto text-accent mb-4" />
                   <h2 className="font-headline text-3xl font-bold text-primary">{results.styleName}</h2>
                   <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{results.styleDescription}</p>
                </div>

                <div>
                    <h3 className="font-headline text-2xl font-bold text-center mb-8">Your Recommended Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                       {getRecommendedProducts().map((product, index) => (
                          <ProductCard key={product.id} product={product} index={index} />
                       ))}
                    </div>
                     <div className="text-center mt-12">
                         <Button onClick={() => { setResults(null); setStep(0); setAnswers({}) }}>
                             Start Over
                         </Button>
                     </div>
                </div>
               </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{currentStep.title}</CardTitle>
                  {currentStep.subtitle && <CardDescription>{currentStep.subtitle}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "grid gap-4",
                    currentStep.id === 'style' ? "grid-cols-2 sm:grid-cols-3" :
                    currentStep.id === 'color' ? "grid-cols-1 sm:grid-cols-2" :
                    "grid-cols-2 sm:grid-cols-3"
                  )}>
                    {currentStep.options.map((option, index) => {
                      const value = typeof option === 'string' ? option : option.value;
                      const isSelected = (answers[currentStep.id as keyof QuizAnswers] as any)?.includes(value);

                      return (
                        <div
                          key={index}
                          onClick={() => handleSelect(value)}
                          className={cn(
                            "p-4 border-2 rounded-lg cursor-pointer transition-all duration-200",
                            isSelected ? 'border-primary shadow-lg scale-105' : 'border-border hover:border-primary/50'
                          )}
                        >
                          {currentStep.id === 'style' && typeof option !== 'string' && (
                             <div>
                               <img src={option.image} alt={option.label} className="w-full h-32 object-cover rounded-md mb-2" />
                               <p className="font-semibold text-center">{option.label}</p>
                             </div>
                          )}
                          {currentStep.id === 'color' && typeof option !== 'string' && (
                              <div className="flex items-center">
                                 <div className="flex -space-x-2 mr-4">
                                     {option.colors.map(c => <div key={c} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: c }}></div>)}
                                 </div>
                                 <p className="font-semibold">{option.label}</p>
                              </div>
                          )}
                          {currentStep.id === 'room' && (
                            <p className="font-semibold text-center py-8">{option as string}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-8 text-right">
                    <Button onClick={handleNext} disabled={!answers[currentStep.id as keyof QuizAnswers] || (Array.isArray(answers[currentStep.id as keyof QuizAnswers]) && (answers[currentStep.id as keyof QuizAnswers] as string[]).length === 0)}>
                      {isLastStep ? 'Get My Style' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}