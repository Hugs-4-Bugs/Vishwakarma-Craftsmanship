'use server';

/**
 * @fileOverview Implements the AR preview feature to visualize furniture in a user's room.
 *
 * - getARPreview - A function that generates an AR preview link for a given furniture item and room image.
 * - ARPreviewInput - The input type for the getARPreview function.
 * - ARPreviewOutput - The return type for the getARPreview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ARPreviewInputSchema = z.object({
  furnitureDataUri: z
    .string()
    .describe(
      "A data URI of the 3D furniture model (e.g., glTF, USDZ) that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  roomPhotoDataUri: z
    .string()
    .describe(
      "A photo of the user's room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ARPreviewInput = z.infer<typeof ARPreviewInputSchema>;

const ARPreviewOutputSchema = z.object({
  arPreviewUrl: z.string().describe('The URL to the AR preview of the furniture in the room.'),
});
export type ARPreviewOutput = z.infer<typeof ARPreviewOutputSchema>;

export async function getARPreview(input: ARPreviewInput): Promise<ARPreviewOutput> {
  return arPreviewFlow(input);
}

const generateARPreviewUrl = ai.defineTool({
  name: 'generateARPreviewUrl',
  description: 'Generates a URL that previews the provided 3D furniture model in the provided room image, using AR.',
  inputSchema: z.object({
    furnitureDataUri: z
      .string()
      .describe(
        "A data URI of the 3D furniture model (e.g., glTF, USDZ) that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      ),
    roomPhotoDataUri: z
      .string()
      .describe(
        "A photo of the user's room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      ),
  }),
  outputSchema: z.string().describe('The AR preview URL.'),
},
async (input) => {
  // TODO: Replace with actual AR URL generation logic.
  // This placeholder simply returns a dummy URL based on the inputs.
  // In a real implementation, this would call an AR service/library to generate the AR preview URL.
  return `https://example.com/ar-preview?furniture=${encodeURIComponent(input.furnitureDataUri)}&room=${encodeURIComponent(input.roomPhotoDataUri)}`;
});

const arPreviewPrompt = ai.definePrompt({
  name: 'arPreviewPrompt',
  tools: [generateARPreviewUrl],
  input: {schema: ARPreviewInputSchema},
  output: {schema: ARPreviewOutputSchema},
  prompt: `You are an assistant that provides AR previews of furniture in a user's room.

  The user will provide a 3D furniture model and a photo of their room. Use the generateARPreviewUrl tool to generate an AR preview URL of the furniture in the room.

  Input Furniture: {{furnitureDataUri}}
  Input Room Image: {{roomPhotoDataUri}}

  Return the AR preview URL.`,
});

const arPreviewFlow = ai.defineFlow(
  {
    name: 'arPreviewFlow',
    inputSchema: ARPreviewInputSchema,
    outputSchema: ARPreviewOutputSchema,
  },
  async input => {
    const {output} = await arPreviewPrompt(input);
    return output!;
  }
);
