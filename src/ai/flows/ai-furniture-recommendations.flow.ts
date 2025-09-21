'use server';

/**
 * @fileOverview An AI agent that provides personalized furniture recommendations.
 *
 * - getFurnitureRecommendations - A function that returns furniture recommendations.
 * - FurnitureRecommendationsInput - The input type for the getFurnitureRecommendations function.
 * - FurnitureRecommendationsOutput - The return type for the getFurnitureRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FurnitureRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('The user browsing history on the furniture website.'),
  stylePreferences: z
    .string()
    .describe('The user style preferences for furniture.'),
  roomCharacteristics: z
    .string()
    .describe('The characteristics of the room where the furniture will be placed.'),
});
export type FurnitureRecommendationsInput = z.infer<
  typeof FurnitureRecommendationsInputSchema
>;

const FurnitureRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of furniture recommendations based on the user input.'),
});
export type FurnitureRecommendationsOutput = z.infer<
  typeof FurnitureRecommendationsOutputSchema
>;

export async function getFurnitureRecommendations(
  input: FurnitureRecommendationsInput
): Promise<FurnitureRecommendationsOutput> {
  return getFurnitureRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'furnitureRecommendationsPrompt',
  input: {schema: FurnitureRecommendationsInputSchema},
  output: {schema: FurnitureRecommendationsOutputSchema},
  prompt: `You are an AI furniture recommender. You will provide furniture recommendations based on the user's browsing history, style preferences, and room characteristics.

Browsing History: {{{browsingHistory}}}
Style Preferences: {{{stylePreferences}}}
Room Characteristics: {{{roomCharacteristics}}}

Provide a list of furniture recommendations that are suitable for the user.`,
});

const getFurnitureRecommendationsFlow = ai.defineFlow(
  {
    name: 'getFurnitureRecommendationsFlow',
    inputSchema: FurnitureRecommendationsInputSchema,
    outputSchema: FurnitureRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
