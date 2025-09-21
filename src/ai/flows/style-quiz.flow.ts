'use server';

/**
 * @fileOverview An AI agent that provides personalized style recommendations based on a quiz.
 *
 * - getStyleRecommendations - A function that returns style and furniture recommendations.
 * - StyleQuizInput - The input type for the getStyleRecommendations function.
 * - StyleQuizOutput - The return type for the getStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleQuizInputSchema = z.object({
  room: z.string().describe('The type of room the user is decorating (e.g., Living Room, Bedroom).'),
  styleImages: z.array(z.string()).describe('A list of keywords describing the styles the user likes (e.g., modern, minimalist, bohemian).'),
  colors: z.array(z.string()).describe('A list of colors the user prefers.'),
});
export type StyleQuizInput = z.infer<typeof StyleQuizInputSchema>;

const RecommendedProductSchema = z.object({
    category: z.string().describe("The category of the recommended furniture (e.g., 'Sofa', 'Bed', 'Table')."),
    reasoning: z.string().describe("A brief explanation of why this type of product fits the user's style."),
});

const StyleQuizOutputSchema = z.object({
  styleName: z.string().describe("The name of the user's generated style profile (e.g., 'Modern Minimalist', 'Cozy Bohemian')."),
  styleDescription: z.string().describe("A description of the user's style profile, explaining the key elements."),
  recommendations: z.array(RecommendedProductSchema).describe('A list of recommended furniture categories and a reason for each.'),
});
export type StyleQuizOutput = z.infer<typeof StyleQuizOutputSchema>;


export async function getStyleRecommendations(
  input: StyleQuizInput
): Promise<StyleQuizOutput> {
  return styleQuizFlow(input);
}

const furnitureCategories = ['Sofa', 'Beds', 'Dining', 'Tables', 'Chairs', 'Wardrobes', 'Storage', 'Office'];

const prompt = ai.definePrompt({
  name: 'styleQuizPrompt',
  input: {schema: StyleQuizInputSchema},
  output: {schema: StyleQuizOutputSchema},
  prompt: `You are an expert interior designer AI. Your task is to analyze a user's preferences from a style quiz and generate a personalized style profile and furniture recommendations.

The user is decorating their: {{{room}}}
They like styles described as: {{{styleImages}}}
Their preferred colors are: {{{colors}}}

Based on this, create a style profile for the user. Give it a creative name (e.g., "Urban Modernist", "Earthy Minimalist", "Coastal Comfort").

Then, recommend 3-4 furniture categories from the following list that would fit this style. For each recommendation, provide a brief reasoning.

Available furniture categories: ${furnitureCategories.join(', ')}

Provide the output in the specified JSON format.
`,
});

const styleQuizFlow = ai.defineFlow(
  {
    name: 'styleQuizFlow',
    inputSchema: StyleQuizInputSchema,
    outputSchema: StyleQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
