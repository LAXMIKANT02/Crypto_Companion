'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { caesarCipher, vigenereCipher } from '@/lib/crypto';
import { handleGenerateKey } from '@/app/actions';

const CryptoFormSchema = z
  .object({
    algorithm: z.enum(['caesar', 'vigenere'], {
      required_error: 'Please select an algorithm.',
    }),
    inputText: z.string().min(1, {
      message: 'Input text cannot be empty.',
    }),
    key: z.string().min(1, {
      message: 'Key cannot be empty.',
    }),
  })
  .refine(
    data => {
      if (data.algorithm === 'caesar' && isNaN(Number(data.key))) {
        return false;
      }
      return true;
    },
    {
      message: 'Key must be a number for Caesar cipher.',
      path: ['key'],
    }
  )
  .refine(
    data => {
      if (data.algorithm === 'vigenere' && !/^[a-zA-Z]+$/.test(data.key)) {
        return false;
      }
      return true;
    },
    {
      message: 'Key must only contain letters for Vigenere cipher.',
      path: ['key'],
    }
  );

type CryptoFormValues = z.infer<typeof CryptoFormSchema>;

export function CryptoTool() {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [outputText, setOutputText] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<CryptoFormValues>({
    resolver: zodResolver(CryptoFormSchema),
    defaultValues: {
      algorithm: 'caesar',
      inputText: '',
      key: '',
    },
    mode: 'onChange',
  });

  const algorithm = form.watch('algorithm');

  function onSubmit(data: CryptoFormValues) {
    let result = '';
    const isEncrypt = mode === 'encrypt';

    if (data.algorithm === 'caesar') {
      result = caesarCipher(data.inputText, parseInt(data.key, 10), isEncrypt);
    } else if (data.algorithm === 'vigenere') {
      result = vigenereCipher(data.inputText, data.key, isEncrypt);
    }
    setOutputText(result);
  }

  const onGenerateKey = () => {
    startTransition(async () => {
      const { key, error } = await handleGenerateKey({
        algorithm,
        keyLength: algorithm === 'vigenere' ? 10 : undefined,
      });
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error Generating Key',
          description: error,
        });
      }
      if (key) {
        form.setValue('key', key, { shouldValidate: true });
        toast({
          title: 'Key Generated',
          description: 'A new key has been successfully generated.',
        });
      }
    });
  };

  const getPlaceholderText = () => {
    if (mode === 'encrypt') {
      return 'Enter your plaintext here...';
    }
    return 'Enter your ciphertext here...';
  };

  const getKeyLabel = () => {
    if (algorithm === 'caesar') {
      return 'Shift (e.g., 3)';
    }
    return "Keyword (e.g., 'SECRET')";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-border">
      <CardHeader>
        <CardTitle>Cryptography Tool</CardTitle>
        <CardDescription>Encrypt or decrypt text using classical ciphers.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={mode} onValueChange={value => setMode(value as 'encrypt' | 'decrypt')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
            <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
          </TabsList>
          <div className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="inputText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={getPlaceholderText()}
                          className="min-h-[120px] font-code resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="algorithm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Algorithm</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an algorithm" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="caesar">Caesar Cipher</SelectItem>
                            <SelectItem value="vigenere">Vigenere Cipher</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input placeholder={getKeyLabel()} {...field} className="font-code" />
                          </FormControl>
                          <Button type="button" variant="outline" size="icon" onClick={onGenerateKey} disabled={isPending} aria-label="Generate Key">
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Wand2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormDescription>The secret key for the cipher.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full capitalize">
                  {mode} Text
                </Button>

                <FormItem>
                  <FormLabel>Output</FormLabel>
                  <Textarea
                    readOnly
                    placeholder="Your result will appear here..."
                    className="min-h-[120px] font-code resize-y bg-muted/50"
                    value={outputText}
                  />
                </FormItem>
              </form>
            </Form>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
