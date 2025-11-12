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
import * as forge from 'node-forge';

const GenerateEncryptionKeyInputSchema = z.object({
  algorithm: z
    .string()
    .describe('The encryption algorithm for which the key will be generated (e.g., Caesar, Vigenere, Hill, Playfair, RSA, DES).'),
  keyLength: z
    .number()
    .optional()
    .describe('The desired length of the encryption key. Leave empty for algorithm default.'),
});
export type GenerateEncryptionKeyInput = z.infer<typeof GenerateEncryptionKeyInputSchema>;

const GenerateEncryptionKeyOutputSchema = z.object({
  key: z.string().describe('The generated encryption key.'),
  publicKey: z.string().optional().describe('The public part of the key pair (for asymmetric algorithms).'),
  privateKey: z.string().optional().describe('The private part of the key pair (for asymmetric algorithms).'),
});
export type GenerateEncryptionKeyOutput = z.infer<typeof GenerateEncryptionKeyOutputSchema>;

function generateRsaKeys() {
  const keys = forge.pki.rsa.generateKeyPair({ bits: 512 }); // Use 512 for faster generation in this demo
  const n = keys.publicKey.n.toString();
  const e = keys.publicKey.e.toString();
  const d = keys.privateKey.d.toString();
  return {
    publicKey: `${n},${e}`,
    privateKey: `${n},${d}`,
  };
}

const generateEncryptionKeyFlow = ai.defineFlow(
  {
    name: 'generateEncryptionKeyFlow',
    inputSchema: GenerateEncryptionKeyInputSchema,
    outputSchema: GenerateEncryptionKeyOutputSchema,
  },
  async (input) => {
    if (input.algorithm === 'rsa') {
      const keys = generateRsaKeys();
      return { 
        key: `Public: ${keys.publicKey}\nPrivate: ${keys.privateKey}`,
        publicKey: keys.publicKey,
        privateKey: keys.privateKey,
      };
    }
    
    // For other algorithms, use the LLM
    const {output} = await ai.run('generateEncryptionKeyPrompt', input);
    return { key: output!.key };
  }
);

// We keep the original export for other flows to call.
export async function generateEncryptionKey(
  input: GenerateEncryptionKeyInput
): Promise<GenerateEncryptionKeyOutput> {
  return generateEncryptionKeyFlow(input);
}


ai.definePrompt({
  name: 'generateEncryptionKeyPrompt',
  input: {schema: GenerateEncryptionKeyInputSchema},
  output: {schema: z.object({key: z.string()})},
  prompt: `You are a security expert. Generate a secure encryption key for the {{{algorithm}}} algorithm.
- For Caesar, provide a random number between 1 and 25.
- For Vigenere, provide a random word of {{{keyLength}}} letters.
- For Playfair, provide a random keyword (one word, all caps).
- For Hill, provide a 2x2 matrix of 4 numbers (e.g., "5 17 4 15") whose determinant is coprime to 26.
- For DES, provide a random 8-character ASCII string.
Return only the key in the output.`,
});
