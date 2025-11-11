'use client';

import { useState } from 'react';
import { caesarCipher, vigenereCipher, hillCipher, playfairCipher } from '@/lib/crypto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function CryptoTool() {
  const [algorithm, setAlgorithm] = useState<'caesar' | 'vigenere' | 'hill' | 'playfair'>('caesar');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [key, setKey] = useState('');
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState('');

  const runCipher = () => {
    const encrypt = mode === 'encrypt';
    let result = '';

    try {
      if (algorithm === 'caesar') {
        result = caesarCipher(inputText, parseInt(key || '0', 10), encrypt);
      } else if (algorithm === 'vigenere') {
        result = vigenereCipher(inputText, key, encrypt);
      } else if (algorithm === 'playfair') {
        result = playfairCipher(inputText, key, encrypt);
      } else if (algorithm === 'hill') {
        const hillKey = [
          [3, 2],
          [5, 7],
        ];
        result = hillCipher(inputText, hillKey, encrypt);
      }
      setOutput(result);
    } catch (err) {
      setOutput('⚠️ Invalid key or input.');
    }
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl shadow-md space-y-5">
      <h2 className="text-2xl font-bold text-center mb-2">🔐 Crypto Companion</h2>

      {/* Algorithm */}
      <div>
        <Label>Select Cipher</Label>
        <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as any)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="caesar">Caesar Cipher</SelectItem>
            <SelectItem value="vigenere">Vigenère Cipher</SelectItem>
            <SelectItem value="hill">Hill Cipher</SelectItem>
            <SelectItem value="playfair">Playfair Cipher</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mode */}
      <div>
        <Label>Mode</Label>
        <Select value={mode} onValueChange={(v) => setMode(v as any)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="encrypt">Encrypt</SelectItem>
            <SelectItem value="decrypt">Decrypt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key */}
      <div>
        <Label>Key</Label>
        <Input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder={
            algorithm === 'caesar'
              ? 'Shift (e.g. 3)'
              : algorithm === 'vigenere'
              ? 'Keyword (e.g. SECRET)'
              : algorithm === 'playfair'
              ? 'Key (e.g. MONARCHY)'
              : 'Fixed Matrix Key [[3,2],[5,7]]'
          }
          disabled={algorithm === 'hill'}
        />
      </div>

      {/* Text Input */}
      <div>
        <Label>Input Text</Label>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to encrypt/decrypt..."
          rows={3}
        />
      </div>

      <Button onClick={runCipher} className="w-full mt-2">
        {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
      </Button>

      {/* Output */}
      {output && (
        <div className="mt-4 p-3 rounded-md bg-secondary text-secondary-foreground">
          <Label>Result:</Label>
          <p className="break-words mt-1">{output}</p>
        </div>
      )}
    </div>
  );
}
