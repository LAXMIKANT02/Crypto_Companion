'use server';

import { generateEncryptionKey } from '@/ai/flows/generate-encryption-key';
import type { GenerateEncryptionKeyInput } from '@/ai/flows/generate-encryption-key';

export async function handleGenerateKey(
  input: GenerateEncryptionKeyInput
): Promise<{ key?: string; error?: string }> {
  try {
    const result = await generateEncryptionKey(input);
    if (result.key) {
      // For Caesar, we need a number. The model might return a string representation.
      if (input.algorithm === 'caesar') {
         const numericKey = parseInt(result.key.replace(/[^0-9]/g, ''), 10);
         if (!isNaN(numericKey)) {
            return { key: (numericKey % 26).toString() };
         }
      }
      // For Vigenere, we need letters.
      if (input.algorithm === 'vigenere') {
        const lettersOnlyKey = result.key.replace(/[^a-zA-Z]/g, '').toUpperCase();
        if (lettersOnlyKey) {
            return { key: lettersOnlyKey };
        }
      }
      return { key: result.key };
    }
    return { error: 'Failed to generate a valid key.' };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while generating the key.' };
  }
}
