'use server';

/**
 * @fileOverview Key generation flow for encryption algorithms.
 *
 * - generateEncryptionKey - A function that handles the key generation process.
 * - GenerateEncryptionKeyInput - The input type for the generateEncryptionKey function.
 * - GenerateEncryptionKeyOutput - The return type for the generateEncryptionKey function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEncryptionKeyInputSchema = z.object({
  algorithm: z
    .string()
    .describe('The encryption algorithm for which the key will be generated (e.g., Caesar, Vigenere).'),
  keyLength: z
    .number()
    .optional()
    .describe('The desired length of the encryption key. Leave empty for algorithm default.'),
});
export type GenerateEncryptionKeyInput = z.infer<typeof GenerateEncryptionKeyInputSchema>;

const GenerateEncryptionKeyOutputSchema = z.object({
  key: z.string().describe('The generated encryption key.'),
});
export type GenerateEncryptionKeyOutput = z.infer<typeof GenerateEncryptionKeyOutputSchema>;

export async function generateEncryptionKey(
  input: GenerateEncryptionKeyInput
): Promise<GenerateEncryptionKeyOutput> {
  return generateEncryptionKeyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEncryptionKeyPrompt',
  input: {schema: GenerateEncryptionKeyInputSchema},
  output: {schema: GenerateEncryptionKeyOutputSchema},
  prompt: `You are a security expert. Generate a secure encryption key for the {{{algorithm}}} algorithm.{{#if keyLength}} The key should be {{{keyLength}}} characters long.{{/if}} The key must be cryptographically secure and suitable for use with the specified algorithm. Return only the key in the output.`,
});

const generateEncryptionKeyFlow = ai.defineFlow(
  {
    name: 'generateEncryptionKeyFlow',
    inputSchema: GenerateEncryptionKeyInputSchema,
    outputSchema: GenerateEncryptionKeyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
